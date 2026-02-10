/**
 * Escrow Service Integration for TrustVerify
 * Implements modular escrow with multiple providers (Mangopay, Stripe Treasury, etc.)
 */

import { storage } from "../storage";
import { trustScoreEngine } from "./trustScore";
import { config } from "../config";
import Stripe from "stripe";

if (!config.STRIPE_SECRET_KEY) {
  throw new Error('STRIPE_SECRET_KEY is required for escrow services');
}

const stripe = new Stripe(config.STRIPE_SECRET_KEY, {
  apiVersion: "2024-11-20.acacia",
});

export interface EscrowProvider {
  name: string;
  createEscrow(amount: number, currency: string, buyerId: number, sellerId: number): Promise<EscrowAccount>;
  confirmPayment(escrowId: string, paymentMethodId?: string): Promise<EscrowAccount>;
  releaseEscrow(escrowId: string, amount?: number): Promise<EscrowTransaction>;
  refundEscrow(escrowId: string, reason?: string): Promise<EscrowTransaction>;
  getEscrowStatus(escrowId: string): Promise<EscrowStatus>;
}

export interface EscrowAccount {
  id: string;
  providerId: string;
  amount: number;
  currency: string;
  status: 'created' | 'funded' | 'held' | 'released' | 'refunded';
  buyerId: number;
  sellerId: number;
  createdAt: Date;
  expiresAt?: Date;
}

export interface EscrowTransaction {
  id: string;
  escrowId: string;
  type: 'release' | 'refund' | 'partial_release';
  amount: number;
  status: 'pending' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
}

export interface EscrowStatus {
  escrowId: string;
  status: string;
  availableAmount: number;
  totalAmount: number;
  transactions: EscrowTransaction[];
}

/**
 * Stripe Treasury Escrow Provider
 * Uses Stripe's financial account capabilities for escrow
 */
export class StripeTreasuryProvider implements EscrowProvider {
  name = 'stripe_treasury';

  async createEscrow(amount: number, currency: string, buyerId: number, sellerId: number): Promise<EscrowAccount> {
    // Create a payment intent for escrow funding
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, // Stripe uses cents
      currency: currency.toLowerCase(),
      capture_method: 'manual', // Don't capture immediately
      automatic_payment_methods: {
        enabled: true,
      },
      metadata: {
        type: 'escrow',
        buyerId: buyerId.toString(),
        sellerId: sellerId.toString(),
      },
    });

    const escrowAccount: EscrowAccount = {
      id: paymentIntent.id,
      providerId: this.name,
      amount,
      currency,
      status: 'created',
      buyerId,
      sellerId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    };

    return escrowAccount;
  }

  async confirmPayment(escrowId: string, paymentMethodId?: string): Promise<EscrowAccount> {
    const paymentIntent = await stripe.paymentIntents.retrieve(escrowId);
    
    if (!paymentIntent) {
      throw new Error('Payment intent not found');
    }

    // Confirm the payment intent (required before capture with manual capture_method)
    const confirmed = await stripe.paymentIntents.confirm(escrowId, {
      payment_method: paymentMethodId,
    });

    return {
      id: confirmed.id,
      providerId: this.name,
      amount: confirmed.amount / 100,
      currency: confirmed.currency,
      status: confirmed.status === 'succeeded' ? 'funded' : confirmed.status === 'requires_capture' ? 'held' : 'created',
      buyerId: parseInt(confirmed.metadata.buyerId || '0'),
      sellerId: parseInt(confirmed.metadata.sellerId || '0'),
      createdAt: new Date(confirmed.created * 1000),
    };
  }

  async releaseEscrow(escrowId: string, amount?: number): Promise<EscrowTransaction> {
    const paymentIntent = await stripe.paymentIntents.retrieve(escrowId);
    
    if (!paymentIntent) {
      throw new Error('Escrow account not found');
    }

    // Check if payment intent is confirmed and ready for capture
    if (paymentIntent.status === 'requires_payment_method' || paymentIntent.status === 'requires_confirmation') {
      throw new Error('Payment intent must be confirmed before capture. Please confirm the payment first.');
    }

    if (paymentIntent.status !== 'requires_capture' && paymentIntent.status !== 'succeeded') {
      throw new Error(`Payment intent is in invalid status for capture: ${paymentIntent.status}. Expected 'requires_capture' or 'succeeded'.`);
    }

    // If already succeeded, no need to capture
    if (paymentIntent.status === 'succeeded') {
      return {
        id: `rel_${Date.now()}`,
        escrowId,
        type: amount ? 'partial_release' : 'release',
        amount: amount || paymentIntent.amount / 100,
        status: 'completed',
        createdAt: new Date(),
        completedAt: new Date(),
      };
    }

    // Capture the payment to release funds
    const captured = await stripe.paymentIntents.capture(escrowId, {
      amount_to_capture: amount ? amount * 100 : undefined,
    });

    return {
      id: `rel_${Date.now()}`,
      escrowId,
      type: amount ? 'partial_release' : 'release',
      amount: amount || paymentIntent.amount / 100,
      status: captured.status === 'succeeded' ? 'completed' : 'pending',
      createdAt: new Date(),
      completedAt: captured.status === 'succeeded' ? new Date() : undefined,
    };
  }

  async refundEscrow(escrowId: string, reason?: string): Promise<EscrowTransaction> {
    const paymentIntent = await stripe.paymentIntents.retrieve(escrowId);
    
    if (!paymentIntent) {
      throw new Error('Escrow account not found');
    }

    // Cancel the payment intent to refund
    const refund = await stripe.paymentIntents.cancel(escrowId);

    return {
      id: `ref_${Date.now()}`,
      escrowId,
      type: 'refund',
      amount: paymentIntent.amount / 100,
      status: refund.status === 'canceled' ? 'completed' : 'pending',
      createdAt: new Date(),
      completedAt: refund.status === 'canceled' ? new Date() : undefined,
    };
  }

  async getEscrowStatus(escrowId: string): Promise<EscrowStatus> {
    const paymentIntent = await stripe.paymentIntents.retrieve(escrowId);
    
    if (!paymentIntent) {
      throw new Error('Escrow account not found');
    }

    return {
      escrowId,
      status: paymentIntent.status,
      availableAmount: paymentIntent.amount / 100,
      totalAmount: paymentIntent.amount / 100,
      transactions: [], // Would fetch from our database
    };
  }
}

/**
 * Escrow.com Provider
 * Integrates with Escrow.com API for escrow services
 */
export class EscrowComProvider implements EscrowProvider {
  name = 'escrow_com';
  private baseUrl = 'https://api.escrow.com/2017-09-01';
  private email: string;
  private apiKey: string;
  private platformAccount: string;

  constructor() {
    // Access config at runtime to avoid circular dependency
    const configValue = config;
    this.email = configValue.ESCROW_COM_EMAIL || '';
    this.apiKey = configValue.ESCROW_COM_API_KEY || '';
    this.platformAccount = configValue.TRUSTVERIFY_ESCROW_ACCOUNT || '';

    if (!this.email || !this.apiKey) {
      console.warn('Escrow.com credentials not configured. Escrow.com provider will not be available.');
    }
  }

  private async makeRequest(endpoint: string, method: string = 'GET', body?: any): Promise<any> {
    if (!this.email || !this.apiKey) {
      throw new Error('Escrow.com credentials not configured. Please set ESCROW_COM_EMAIL and ESCROW_COM_API_KEY environment variables.');
    }

    const auth = Buffer.from(`${this.email}:${this.apiKey}`).toString('base64');
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const response = await fetch(url, {
        method,
        headers: {
          'Authorization': `Basic ${auth}`,
          'Content-Type': 'application/json',
        },
        body: body ? JSON.stringify(body) : undefined,
      });

      if (!response.ok) {
        let errorMessage = `Escrow.com API error: ${response.status}`;
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorData.error || errorMessage;
        } catch {
          const errorText = await response.text();
          if (errorText) {
            errorMessage = errorText;
          }
        }
        
        // Provide more helpful error messages
        if (response.status === 401 || response.status === 403) {
          errorMessage = `Escrow.com authentication failed. Please verify ESCROW_COM_EMAIL and ESCROW_COM_API_KEY are correct. Original error: ${errorMessage}`;
        }
        
        throw new Error(errorMessage);
      }

      return response.json();
    } catch (error: any) {
      // Re-throw with more context if it's not already our formatted error
      if (error.message && error.message.includes('Escrow.com')) {
        throw error;
      }
      throw new Error(`Escrow.com API request failed: ${error.message}`);
    }
  }

  async createEscrow(amount: number, currency: string, buyerId: number, sellerId: number): Promise<EscrowAccount> {
    // Get buyer and seller user details
    const buyer = await storage.getUser(buyerId);
    const seller = await storage.getUser(sellerId);

    if (!buyer || !seller) {
      throw new Error('Buyer or seller not found');
    }

    // Validate emails exist
    if (!buyer.email || !seller.email) {
      throw new Error('Buyer or seller email is missing. Please ensure both users have valid email addresses.');
    }

    // Validate: Platform cannot be buyer or seller
    if (buyer.email === this.platformAccount || seller.email === this.platformAccount) {
      throw new Error('Platform account cannot be buyer or seller');
    }

    // Create transaction in Escrow.com
    const escrowTransaction = await this.makeRequest('/transaction', 'POST', {
      parties: [
        {
          role: 'buyer',
          customer: buyer.email,
        },
        {
          role: 'seller',
          customer: seller.email,
        },
      ],
      currency: currency.toLowerCase(),
      description: 'Transaction facilitated by TrustVerify',
      items: [
        {
          title: 'Service Agreement',
          description: 'Milestone-based transaction facilitated by TrustVerify',
          type: 'general_merchandise',
          inspection_period: 259200, // 3 days in seconds
          quantity: 1,
          schedule: [
            {
              amount: amount,
              payer_customer: buyer.email,
              beneficiary_customer: seller.email,
            },
          ],
          fees: [
            {
              type: 'escrow',
              payer_customer: buyer.email,
              split: 1.0,
            },
          ],
        },
      ],
    });

    return {
      id: escrowTransaction.id || escrowTransaction.transaction_id,
      providerId: this.name,
      amount,
      currency,
      status: 'created',
      buyerId,
      sellerId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
    };
  }

  async confirmPayment(escrowId: string, paymentMethodId?: string): Promise<EscrowAccount> {
    // Escrow.com handles payment confirmation automatically
    // This method retrieves the current status
    const transaction = await this.makeRequest(`/transaction/${escrowId}`, 'GET');

    return {
      id: escrowId,
      providerId: this.name,
      amount: transaction.amount || 0,
      currency: transaction.currency || 'usd',
      status: this.mapEscrowStatus(transaction.status),
      buyerId: 0, // Would need to map from email
      sellerId: 0,
      createdAt: new Date(transaction.created_at || Date.now()),
    };
  }

  async releaseEscrow(escrowId: string, amount?: number): Promise<EscrowTransaction> {
    // Release funds in Escrow.com
    const releaseResult = await this.makeRequest(`/transaction/${escrowId}/release`, 'POST', {
      amount: amount,
    });

    return {
      id: `escrow_rel_${Date.now()}`,
      escrowId,
      type: amount ? 'partial_release' : 'release',
      amount: amount || releaseResult.amount || 0,
      status: releaseResult.status === 'released' ? 'completed' : 'pending',
      createdAt: new Date(),
      completedAt: releaseResult.status === 'released' ? new Date() : undefined,
    };
  }

  async refundEscrow(escrowId: string, reason?: string): Promise<EscrowTransaction> {
    // Cancel/refund transaction in Escrow.com
    const refundResult = await this.makeRequest(`/transaction/${escrowId}/cancel`, 'POST', {
      reason: reason || 'Refund requested',
    });

    return {
      id: `escrow_ref_${Date.now()}`,
      escrowId,
      type: 'refund',
      amount: refundResult.amount || 0,
      status: refundResult.status === 'cancelled' ? 'completed' : 'pending',
      createdAt: new Date(),
      completedAt: refundResult.status === 'cancelled' ? new Date() : undefined,
    };
  }

  async getEscrowStatus(escrowId: string): Promise<EscrowStatus> {
    const transaction = await this.makeRequest(`/transaction/${escrowId}`, 'GET');

    return {
      escrowId,
      status: transaction.status || 'unknown',
      availableAmount: transaction.amount_held || 0,
      totalAmount: transaction.amount || 0,
      transactions: [],
    };
  }

  private mapEscrowStatus(escrowStatus: string): 'created' | 'funded' | 'held' | 'released' | 'refunded' {
    const statusMap: Record<string, 'created' | 'funded' | 'held' | 'released' | 'refunded'> = {
      'pending_acceptance': 'created',
      'funded': 'funded',
      'in_dispute': 'held',
      'released': 'released',
      'cancelled': 'refunded',
      'completed': 'released',
    };

    return statusMap[escrowStatus.toLowerCase()] || 'created';
  }
}

/**
 * Mock Mangopay Provider (placeholder for real integration)
 */
export class MangopayProvider implements EscrowProvider {
  name = 'mangopay';

  async confirmPayment(escrowId: string, paymentMethodId?: string): Promise<EscrowAccount> {
    // Mock implementation
    return {
      id: escrowId,
      providerId: this.name,
      amount: 0,
      currency: 'USD',
      status: 'funded',
      buyerId: 0,
      sellerId: 0,
      createdAt: new Date(),
    };
  }

  async createEscrow(amount: number, currency: string, buyerId: number, sellerId: number): Promise<EscrowAccount> {
    // Mock implementation - would integrate with Mangopay API
    return {
      id: `mango_${Date.now()}`,
      providerId: this.name,
      amount,
      currency,
      status: 'created',
      buyerId,
      sellerId,
      createdAt: new Date(),
      expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    };
  }

  async releaseEscrow(escrowId: string, amount?: number): Promise<EscrowTransaction> {
    return {
      id: `mango_rel_${Date.now()}`,
      escrowId,
      type: amount ? 'partial_release' : 'release',
      amount: amount || 0,
      status: 'completed',
      createdAt: new Date(),
      completedAt: new Date(),
    };
  }

  async refundEscrow(escrowId: string, reason?: string): Promise<EscrowTransaction> {
    return {
      id: `mango_ref_${Date.now()}`,
      escrowId,
      type: 'refund',
      amount: 0,
      status: 'completed',
      createdAt: new Date(),
      completedAt: new Date(),
    };
  }

  async getEscrowStatus(escrowId: string): Promise<EscrowStatus> {
    return {
      escrowId,
      status: 'held',
      availableAmount: 1000,
      totalAmount: 1000,
      transactions: [],
    };
  }
}

/**
 * Escrow Service Manager
 * Manages multiple escrow providers and intelligent routing
 */
export class EscrowService {
  private providers: Map<string, EscrowProvider> = new Map();
  private defaultProvider = 'stripe_treasury';

  constructor() {
    this.providers.set('stripe_treasury', new StripeTreasuryProvider());
    this.providers.set('mangopay', new MangopayProvider());
    
    // Add Escrow.com provider if credentials are configured
    if (config.ESCROW_COM_EMAIL && config.ESCROW_COM_API_KEY) {
      try {
        const escrowComProvider = new EscrowComProvider();
        this.providers.set('escrow_com', escrowComProvider);
        // Set Escrow.com as default if configured
        this.defaultProvider = 'escrow_com';
      } catch (error) {
        console.warn('Escrow.com provider not available:', error);
      }
    }
  }

  async createEscrowTransaction(transactionId: number, providerPreference?: string): Promise<EscrowAccount> {
    const transaction = await storage.getTransaction(transactionId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    // Calculate trust scores to determine escrow requirements
    const buyerTrust = await trustScoreEngine.calculateUserTrustScore(transaction.buyerId);
    const sellerTrust = await trustScoreEngine.calculateUserTrustScore(transaction.sellerId);
    const transactionRisk = await trustScoreEngine.calculateTransactionRiskScore(transactionId);

    // Select optimal escrow provider based on risk and preferences
    let provider = this.selectOptimalProvider(transactionRisk, providerPreference);
    
    // If Escrow.com is selected but fails, fallback to Stripe
    try {
      const escrowAccount = await provider.createEscrow(
        parseFloat(transaction.amount),
        transaction.currency || 'USD',
        transaction.buyerId,
        transaction.sellerId
      );

      // Update transaction with escrow information
      await storage.updateTransactionStatus(transactionId, 'escrow');
      await storage.updateTransactionStripeId(transactionId, escrowAccount.id);

      return escrowAccount;
    } catch (error: any) {
      // If Escrow.com fails and it was the selected provider, fallback to Stripe
      if (provider.name === 'escrow_com' && this.providers.has('stripe_treasury')) {
        console.warn('Escrow.com failed, falling back to Stripe:', error.message);
        provider = this.providers.get('stripe_treasury')!;
        
        const escrowAccount = await provider.createEscrow(
          parseFloat(transaction.amount),
          transaction.currency || 'USD',
          transaction.buyerId,
          transaction.sellerId
        );

        await storage.updateTransactionStatus(transactionId, 'escrow');
        await storage.updateTransactionStripeId(transactionId, escrowAccount.id);

        return escrowAccount;
      }
      throw error;
    }
  }

  async confirmPaymentIntent(transactionId: number, paymentMethodId?: string): Promise<EscrowAccount> {
    const transaction = await storage.getTransaction(transactionId);
    if (!transaction || !transaction.stripePaymentIntentId) {
      throw new Error('Transaction or escrow not found');
    }

    const provider = this.getProviderForTransaction(transaction);
    const confirmed = await provider.confirmPayment(transaction.stripePaymentIntentId, paymentMethodId);

    // Update transaction status if payment is confirmed
    if (confirmed.status === 'funded' || confirmed.status === 'held') {
      await storage.updateTransactionStatus(transactionId, 'escrow');
    }

    return confirmed;
  }

  async releaseEscrowFunds(transactionId: number, amount?: number): Promise<EscrowTransaction> {
    const transaction = await storage.getTransaction(transactionId);
    if (!transaction || !transaction.stripePaymentIntentId) {
      throw new Error('Transaction or escrow not found');
    }

    // Verify transaction is eligible for release
    await this.verifyReleaseEligibility(transaction);

    const provider = this.getProviderForTransaction(transaction);
    const releaseResult = await provider.releaseEscrow(transaction.stripePaymentIntentId, amount);

    // Update transaction status
    if (releaseResult.status === 'completed') {
      await storage.updateTransactionStatus(transactionId, 'completed');
    }

    return releaseResult;
  }

  async refundEscrowFunds(transactionId: number, reason: string): Promise<EscrowTransaction> {
    const transaction = await storage.getTransaction(transactionId);
    if (!transaction || !transaction.stripePaymentIntentId) {
      throw new Error('Transaction or escrow not found');
    }

    const provider = this.getProviderForTransaction(transaction);
    const refundResult = await provider.refundEscrow(transaction.stripePaymentIntentId, reason);

    // Update transaction status
    if (refundResult.status === 'completed') {
      await storage.updateTransactionStatus(transactionId, 'refunded');
    }

    return refundResult;
  }

  async getEscrowStatus(transactionId: number): Promise<EscrowStatus> {
    const transaction = await storage.getTransaction(transactionId);
    if (!transaction || !transaction.stripePaymentIntentId) {
      throw new Error('Transaction or escrow not found');
    }

    const provider = this.getProviderForTransaction(transaction);
    return await provider.getEscrowStatus(transaction.stripePaymentIntentId);
  }

  private selectOptimalProvider(transactionRisk: any, preference?: string): EscrowProvider {
    // If user has preference and it's available, use it
    if (preference && this.providers.has(preference)) {
      return this.providers.get(preference)!;
    }

    // High-risk transactions might benefit from different providers
    if (transactionRisk.riskLevel === 'critical' || transactionRisk.riskLevel === 'high') {
      return this.providers.get('mangopay') || this.providers.get(this.defaultProvider)!;
    }

    // Default to Stripe for most transactions
    return this.providers.get(this.defaultProvider)!;
  }

  private getProviderForTransaction(transaction: any): EscrowProvider {
    // Determine provider based on transaction metadata or escrow ID format
    if (transaction.stripePaymentIntentId?.startsWith('pi_')) {
      return this.providers.get('stripe_treasury')!;
    }
    if (transaction.stripePaymentIntentId?.startsWith('mango_')) {
      return this.providers.get('mangopay')!;
    }
    
    return this.providers.get(this.defaultProvider)!;
  }

  private async verifyReleaseEligibility(transaction: any): Promise<void> {
    // Check if transaction is in correct status
    if (transaction.status !== 'escrow' && transaction.status !== 'active') {
      throw new Error('Transaction not eligible for release');
    }

    // Check for any pending disputes
    const disputes = await storage.getDisputesByTransaction(transaction.id);
    const pendingDisputes = disputes.filter(d => d.status === 'open' || d.status === 'investigating');
    
    if (pendingDisputes.length > 0) {
      throw new Error('Cannot release funds with pending disputes');
    }

    // Check buffer period (if applicable)
    if (transaction.bufferEndTime && new Date() < transaction.bufferEndTime) {
      throw new Error('Cannot release funds during buffer period');
    }
  }

  async isEscrowRecommended(transactionId: number): Promise<{ recommended: boolean; reason: string; riskLevel: string }> {
    const transaction = await storage.getTransaction(transactionId);
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    const riskScore = await trustScoreEngine.calculateTransactionRiskScore(transactionId);
    
    // Escrow recommendations based on risk and amount
    const amount = parseFloat(transaction.amount);
    const isHighValue = amount > 1000;
    const isHighRisk = riskScore.riskLevel === 'high' || riskScore.riskLevel === 'critical';
    const isMediumRisk = riskScore.riskLevel === 'medium';
    
    if (isHighRisk) {
      return {
        recommended: true,
        reason: 'High fraud risk detected - escrow strongly recommended',
        riskLevel: riskScore.riskLevel
      };
    }
    
    if (isHighValue && isMediumRisk) {
      return {
        recommended: true,
        reason: 'High value transaction with moderate risk - escrow recommended',
        riskLevel: riskScore.riskLevel
      };
    }
    
    if (isHighValue) {
      return {
        recommended: true,
        reason: 'High value transaction - escrow recommended for protection',
        riskLevel: riskScore.riskLevel
      };
    }
    
    return {
      recommended: false,
      reason: 'Low risk transaction - escrow optional',
      riskLevel: riskScore.riskLevel
    };
  }
}

export const escrowService = new EscrowService();
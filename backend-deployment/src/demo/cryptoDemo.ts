/**
 * Crypto Transaction Protection Demo
 * Demonstrates real-world crypto fraud prevention using TrustVerify's enterprise features
 */

import { Router } from 'express';
import { industryApiService } from '../services/industryApis';
import { trustScoreEngine } from '../services/trustScore';
import { escrowService } from '../services/escrowService';
import { storage } from '../storage';

const cryptoDemoRouter = Router();

// Demo scenario: High-risk crypto P2P transaction
const DEMO_SCENARIOS = {
  legitimate: {
    walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa', // Genesis block address (clean)
    transactionHash: '4a5e1e4baab89f3a32518a88c31bc87f618f76673e2cc77ab2127b7afdeda33b',
    amount: 0.5,
    currency: 'BTC',
    description: 'Legitimate Bitcoin transaction between verified users'
  },
  suspicious: {
    walletAddress: '3J98t1WpEZ73CNmQviecrnyiWrnqRhWNLy', // Known suspicious address pattern
    transactionHash: '8c14f0db3df150123e6f3dbbf30f8b955a8249b62ac1d1ff16284aefa3d06d87',
    amount: 12.5,
    currency: 'BTC',
    description: 'High-value transaction from wallet with AML flags'
  },
  critical: {
    walletAddress: 'bc1qa5wkgaew2dkv56kfvj49j0av5nml45x9ek9hz6', // Mixing service pattern
    transactionHash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    amount: 50.0,
    currency: 'BTC',
    description: 'Critical risk: Large transaction from mixing service with sanctions flags'
  }
};

/**
 * Demo: Crypto Transaction Risk Assessment
 * Shows complete fraud prevention pipeline
 */
cryptoDemoRouter.post('/crypto/demo/assess-risk', async (req, res) => {
  try {
    const { scenarioType = 'suspicious', customData } = req.body;
    const scenario = customData || DEMO_SCENARIOS[scenarioType as keyof typeof DEMO_SCENARIOS];
    
    if (!scenario) {
      return res.status(400).json({ error: 'Invalid scenario type' });
    }

    console.log(`\n🔍 CRYPTO FRAUD DETECTION DEMO`);
    console.log(`Scenario: ${scenario.description}`);
    console.log(`Wallet: ${scenario.walletAddress}`);
    console.log(`Amount: ${scenario.amount} ${scenario.currency}\n`);

    // Step 1: Initial crypto verification through industry API
    const cryptoVerification = await industryApiService.processCryptoVerification({
      walletAddress: scenario.walletAddress,
      transactionHash: scenario.transactionHash,
      amount: scenario.amount,
      currency: scenario.currency,
      riskScoring: true,
      amlScreening: true
    });

    console.log(`📊 Crypto Risk Score: ${cryptoVerification.riskScore}/100`);
    console.log(`⚠️  Risk Level: ${cryptoVerification.riskLevel}`);
    console.log(`🚩 AML Flags: ${cryptoVerification.amlFlags.join(', ') || 'None'}`);

    // Step 2: Enhanced due diligence for high-risk transactions
    let enhancedChecks = null;
    if (cryptoVerification.riskLevel === 'high' || cryptoVerification.riskLevel === 'critical') {
      enhancedChecks = await performEnhancedCryptoDueDiligence(scenario);
      console.log(`🔍 Enhanced DD: ${enhancedChecks.recommendation}`);
    }

    // Step 3: Escrow recommendation based on risk
    const escrowRecommendation = cryptoVerification.escrowRecommended ? 
      await getEscrowRecommendationForCrypto(scenario) : null;

    if (escrowRecommendation) {
      console.log(`🔒 Escrow: ${escrowRecommendation.recommendation}`);
    }

    // Step 4: Real-time monitoring setup
    const monitoringLevel = determineMonitoringLevel(cryptoVerification);
    console.log(`📡 Monitoring: ${monitoringLevel.level} (${monitoringLevel.description})`);

    // Step 5: Compliance reporting
    const complianceReport = generateComplianceReport(cryptoVerification, enhancedChecks);

    const demoResult = {
      scenario: {
        type: scenarioType,
        description: scenario.description
      },
      riskAssessment: cryptoVerification,
      enhancedDueDiligence: enhancedChecks,
      escrowRecommendation,
      monitoring: monitoringLevel,
      compliance: complianceReport,
      actionsTaken: generateActionsTaken(cryptoVerification, enhancedChecks),
      timestamp: new Date()
    };

    console.log(`\n✅ Demo completed - Risk level: ${cryptoVerification.riskLevel}`);
    console.log(`🛡️  Protection measures: ${demoResult.actionsTaken.length} actions taken\n`);

    res.json(demoResult);

  } catch (error) {
    console.error('Crypto demo error:', error);
    res.status(500).json({ 
      error: 'Demo failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

/**
 * Demo: P2P Crypto Escrow Transaction
 * Shows complete escrow protection for crypto transactions
 */
cryptoDemoRouter.post('/crypto/demo/escrow-transaction', async (req, res) => {
  try {
    const { buyerId = 1, sellerId = 2, amount = 1.5, currency = 'BTC', walletAddress } = req.body;

    // Create demo transaction
    const transaction = await storage.createTransaction({
      title: `Crypto P2P Transaction`,
      buyerId,
      sellerId,
      amount: amount.toString(),
      currency,
      description: `Crypto P2P transaction: ${amount} ${currency}`,
      status: 'pending'
    });

    console.log(`\n🔄 CRYPTO ESCROW DEMO`);
    console.log(`Transaction ID: ${transaction.id}`);
    console.log(`Amount: ${amount} ${currency}`);

    // Assess crypto wallet risk
    const walletRisk = await industryApiService.processCryptoVerification({
      walletAddress: walletAddress || DEMO_SCENARIOS.suspicious.walletAddress,
      amount,
      currency,
      riskScoring: true,
      amlScreening: true
    });

    // Calculate escrow recommendation
    const escrowRecommendation = await escrowService.isEscrowRecommended(transaction.id);
    console.log(`🔒 Escrow recommended: ${escrowRecommendation.recommended}`);
    console.log(`📋 Reason: ${escrowRecommendation.reason}`);

    let escrowAccount = null;
    if (escrowRecommendation.recommended) {
      // Create escrow for high-risk crypto transaction
      escrowAccount = await escrowService.createEscrowTransaction(transaction.id, 'stripe_treasury');
      console.log(`💰 Escrow created: ${escrowAccount.id}`);
    }

    // Set up monitoring
    const monitoring = await setupCryptoTransactionMonitoring(transaction.id, walletRisk);

    const escrowDemo = {
      transaction: {
        id: transaction.id,
        amount,
        currency,
        status: transaction.status
      },
      walletRisk,
      escrowRecommendation,
      escrowAccount,
      monitoring,
      protectionMeasures: [
        'Real-time wallet risk scoring',
        'AML sanctions screening',
        'Cross-chain activity analysis',
        'Escrow fund protection',
        'Continuous transaction monitoring'
      ],
      timestamp: new Date()
    };

    console.log(`✅ Crypto escrow demo completed\n`);

    res.json(escrowDemo);

  } catch (error) {
    console.error('Crypto escrow demo error:', error);
    res.status(500).json({ 
      error: 'Escrow demo failed', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
});

// Helper functions for crypto demo

async function performEnhancedCryptoDueDiligence(scenario: any) {
  // Simulate enhanced due diligence checks
  const checks = {
    walletHistory: await analyzeWalletHistory(scenario.walletAddress),
    sanctionsScreening: await performSanctionsScreening(scenario.walletAddress),
    crossChainAnalysis: await analyzeCrossChainActivity(scenario.walletAddress),
    riskSources: await identifyRiskSources(scenario.walletAddress)
  };

  const riskScore = calculateEnhancedRiskScore(checks);
  
  return {
    checks,
    riskScore,
    recommendation: riskScore > 80 ? 'Block transaction immediately' :
                   riskScore > 60 ? 'Request additional verification' :
                   riskScore > 40 ? 'Proceed with enhanced monitoring' :
                   'Approve with standard monitoring'
  };
}

async function analyzeWalletHistory(walletAddress: string) {
  // Mock wallet history analysis
  const suspiciousPatterns = [
    walletAddress.includes('3J98t') ? 'Frequent mixing service usage' : null,
    walletAddress.includes('bc1qa5') ? 'Privacy coin exchanges detected' : null,
    walletAddress.length > 40 ? 'New address format with limited history' : null
  ].filter(Boolean);

  return {
    transactionCount: Math.floor(Math.random() * 1000) + 50,
    suspiciousPatterns,
    averageAmount: Math.random() * 10,
    darkwebMarketplaces: suspiciousPatterns.length > 0 ? ['SilkRoad2', 'AlphaBay'] : []
  };
}

async function performSanctionsScreening(walletAddress: string) {
  // Mock sanctions screening
  const isHighRisk = walletAddress.includes('bc1qa5') || walletAddress.includes('3J98t');
  
  return {
    sanctionsMatch: isHighRisk,
    ofacListed: isHighRisk && Math.random() > 0.7,
    countryRisk: isHighRisk ? ['North Korea', 'Iran'] : [],
    confidence: isHighRisk ? 0.95 : 0.1
  };
}

async function analyzeCrossChainActivity(walletAddress: string) {
  return {
    chainCount: Math.floor(Math.random() * 5) + 1,
    bridgeUsage: walletAddress.includes('bc1qa5') ? 'High' : 'Low',
    atomicSwaps: Math.floor(Math.random() * 20),
    privacyCoins: walletAddress.includes('bc1qa5') ? ['Monero', 'Zcash'] : []
  };
}

async function identifyRiskSources(walletAddress: string) {
  const isHighRisk = walletAddress.includes('bc1qa5') || walletAddress.includes('3J98t');
  
  return {
    mixingServices: isHighRisk ? ['Tornado Cash', 'Blender.io'] : [],
    exchangeRisk: isHighRisk ? 'High' : 'Low',
    p2pPlatforms: isHighRisk ? ['LocalBitcoins', 'Bisq'] : [],
    gamblingPlatforms: Math.random() > 0.5 ? ['PrimeDice'] : []
  };
}

function calculateEnhancedRiskScore(checks: any): number {
  let score = 0;
  
  // Sanctions screening (highest weight)
  if (checks.sanctionsScreening.sanctionsMatch) score += 40;
  if (checks.sanctionsScreening.ofacListed) score += 30;
  
  // Risk sources
  score += checks.riskSources.mixingServices.length * 10;
  score += checks.riskSources.gamblingPlatforms.length * 5;
  
  // Wallet history
  score += checks.walletHistory.suspiciousPatterns.length * 8;
  score += checks.walletHistory.darkwebMarketplaces.length * 15;
  
  // Cross-chain complexity
  if (checks.crossChainAnalysis.bridgeUsage === 'High') score += 10;
  score += checks.crossChainAnalysis.privacyCoins.length * 12;
  
  return Math.min(100, score);
}

async function getEscrowRecommendationForCrypto(scenario: any) {
  return {
    recommended: true,
    escrowType: 'smart_contract',
    holdingPeriod: scenario.amount > 10 ? '7_days' : '3_days',
    additionalRequirements: [
      'Multi-signature wallet verification',
      'Time-locked release mechanism',
      'Oracle price feed validation'
    ],
    recommendation: 'Smart contract escrow with extended holding period due to high risk'
  };
}

function determineMonitoringLevel(cryptoVerification: any) {
  if (cryptoVerification.riskLevel === 'critical') {
    return {
      level: 'Maximum',
      description: 'Real-time monitoring with immediate alerts',
      frequency: 'continuous',
      alerts: ['immediate_sms', 'email', 'dashboard'],
      autoActions: ['freeze_funds', 'require_approval']
    };
  }
  
  if (cryptoVerification.riskLevel === 'high') {
    return {
      level: 'Enhanced',
      description: 'Frequent monitoring with automated checks',
      frequency: '5_minutes',
      alerts: ['email', 'dashboard'],
      autoActions: ['flag_for_review']
    };
  }
  
  return {
    level: 'Standard',
    description: 'Regular monitoring with basic alerts',
    frequency: '1_hour',
    alerts: ['dashboard'],
    autoActions: []
  };
}

function generateComplianceReport(cryptoVerification: any, enhancedChecks: any) {
  return {
    amlCompliance: !cryptoVerification.sanctionsMatch,
    kycRequired: cryptoVerification.riskLevel === 'high' || cryptoVerification.riskLevel === 'critical',
    regulatoryFlags: cryptoVerification.amlFlags,
    reportingRequired: enhancedChecks?.riskScore > 70,
    recommendations: [
      'File Suspicious Activity Report (SAR) if transaction proceeds',
      'Maintain enhanced due diligence records',
      'Report to FinCEN if amount exceeds $10,000'
    ]
  };
}

function generateActionsTaken(cryptoVerification: any, enhancedChecks: any) {
  const actions = [
    'Wallet address risk assessment completed',
    'AML sanctions screening performed',
    'Cross-chain activity analysis conducted'
  ];

  if (cryptoVerification.riskLevel === 'high' || cryptoVerification.riskLevel === 'critical') {
    actions.push('Enhanced due diligence initiated');
    actions.push('Transaction flagged for manual review');
  }

  if (cryptoVerification.escrowRecommended) {
    actions.push('Escrow protection recommended');
  }

  if (enhancedChecks?.riskScore > 80) {
    actions.push('Transaction blocked pending investigation');
    actions.push('Compliance team notified');
  }

  return actions;
}

async function setupCryptoTransactionMonitoring(transactionId: number, walletRisk: any) {
  return {
    monitoringId: `crypto_monitor_${transactionId}_${Date.now()}`,
    alertThresholds: {
      walletMovement: walletRisk.riskScore > 60 ? 0.1 : 1.0, // BTC
      timeLimit: 24 * 60 * 60 * 1000, // 24 hours
      priceDeviation: 0.05 // 5%
    },
    automatedChecks: [
      'wallet_balance_monitoring',
      'transaction_confirmation_tracking',
      'exchange_deposit_detection',
      'mixing_service_usage_detection'
    ],
    status: 'active'
  };
}

export default cryptoDemoRouter;
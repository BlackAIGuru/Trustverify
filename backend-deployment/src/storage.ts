import { 
  users, 
  kycVerifications, 
  transactions, 
  messages, 
  scamReports, 
  disputes,
  developerAccounts,
  apiKeys,
  apiUsageLogs,
  passwordResets,
  domainTrustScores,
  phoneNumberFlags,
  fraudReports,
  websiteAnalysis,
  sanctions,
  escalationQueue,
  arbitrationCases
} from "./shared/schema.js";

// Import all the types correctly
import type {
  User,
  KycVerification,
  Transaction,
  Message,
  ScamReport,
  Dispute,
  DeveloperAccount,
  ApiKey,
  ApiUsageLog,
  PasswordReset,
  DomainTrustScore,
  PhoneNumberFlag,
  FraudReport,
  WebsiteAnalysis
} from "./shared/schema.js";

// Insert types
type InsertUser = typeof users.$inferInsert;
type InsertKyc = typeof kycVerifications.$inferInsert;
type InsertTransaction = typeof transactions.$inferInsert;
type InsertMessage = typeof messages.$inferInsert;
type InsertScamReport = typeof scamReports.$inferInsert;
type InsertDispute = typeof disputes.$inferInsert;
type InsertDeveloperAccount = typeof developerAccounts.$inferInsert;
type InsertApiKey = typeof apiKeys.$inferInsert;
type InsertApiUsageLog = typeof apiUsageLogs.$inferInsert;
type InsertPasswordReset = typeof passwordResets.$inferInsert;
type InsertDomainTrustScore = typeof domainTrustScores.$inferInsert;
type InsertPhoneNumberFlag = typeof phoneNumberFlags.$inferInsert;
type InsertFraudReport = typeof fraudReports.$inferInsert;
type InsertWebsiteAnalysis = typeof websiteAnalysis.$inferInsert;

import { db } from "./db.js";
import { eq, and, or, ilike, gte, lte, desc, count, sum, avg, lt, sql } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";

const PostgresSessionStore = connectPg(session);

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, updates: Partial<User>): Promise<User | undefined>;
  updateUserTrustScore(id: number, score: string): Promise<User | undefined>;
  updateUserVerificationLevel(id: number, level: string): Promise<User | undefined>;
  updateUserPassword(id: number, hashedPassword: string): Promise<User | undefined>;

  // Password reset methods
  createPasswordReset(userId: number, token: string, expiresAt: Date): Promise<PasswordReset>;
  getPasswordReset(token: string): Promise<PasswordReset | undefined>;
  deletePasswordReset(token: string): Promise<void>;

  // KYC methods
  createKycVerification(kyc: InsertKyc & { userId: number }): Promise<KycVerification>;
  getKycByUserId(userId: number): Promise<KycVerification | undefined>;
  getPendingKycVerifications(): Promise<KycVerification[]>;
  updateKycStatus(id: number, status: string, reviewedBy: number, notes?: string): Promise<KycVerification | undefined>;

  // Transaction methods
  createTransaction(transaction: InsertTransaction & { buyerId: number }): Promise<Transaction>;
  getTransaction(id: number): Promise<Transaction | undefined>;
  getTransactionsByUser(userId: number, limit?: number, offset?: number): Promise<Transaction[]>;
  getTransactionCountByUser(userId: number): Promise<number>;
  updateTransactionStatus(id: number, status: string): Promise<Transaction | undefined>;
  updateTransactionStripeId(id: number, stripePaymentIntentId: string): Promise<Transaction | undefined>;

  // Message methods
  createMessage(message: InsertMessage & { senderId: number }): Promise<Message>;
  getMessagesByTransaction(transactionId: number): Promise<Message[]>;
  flagMessageAsScam(id: number): Promise<Message | undefined>;

  // Scam report methods
  createScamReport(report: InsertScamReport & { reporterId: number }): Promise<ScamReport>;
  getScamReports(): Promise<ScamReport[]>;
  searchScamReports(query: string): Promise<ScamReport[]>;
  updateScamReportStatus(id: number, status: string, reviewedBy: number): Promise<ScamReport | undefined>;

  // Dispute methods
  createDispute(dispute: InsertDispute & { raisedBy: number }): Promise<Dispute>;
  getDisputesByTransaction(transactionId: number): Promise<Dispute[]>;
  getPendingDisputes(): Promise<Dispute[]>;
  updateDisputeStatus(id: number, status: string, resolution?: string, resolvedBy?: number): Promise<Dispute | undefined>;

  // Developer Account methods
  createDeveloperAccount(account: InsertDeveloperAccount & { userId: number }): Promise<DeveloperAccount>;
  getDeveloperAccountByUserId(userId: number): Promise<DeveloperAccount | undefined>;
  getDeveloperAccount(id: number): Promise<DeveloperAccount | undefined>;
  updateDeveloperAccountStatus(id: number, status: string, approvedBy?: number): Promise<DeveloperAccount | undefined>;
  updateDeveloperUsage(id: number, usage: number): Promise<DeveloperAccount | undefined>;

  // API Key methods
  createApiKey(apiKey: { developerId: number; name: string; keyHash: string; keyPrefix: string; permissions?: string[]; expiresAt?: Date }): Promise<ApiKey>;
  getApiKeysByDeveloperId(developerId: number): Promise<ApiKey[]>;
  getApiKeyByHash(keyHash: string): Promise<ApiKey | undefined>;
  revokeApiKey(id: number): Promise<ApiKey | undefined>;
  updateApiKeyLastUsed(id: number): Promise<ApiKey | undefined>;

  // API Usage Log methods
  createApiUsageLog(log: InsertApiUsageLog & { apiKeyId: number; developerId: number }): Promise<ApiUsageLog>;
  getApiUsageByDeveloper(developerId: number, startDate?: Date, endDate?: Date): Promise<ApiUsageLog[]>;
  getApiUsageStats(developerId: number, period: 'day' | 'week' | 'month'): Promise<any>;

  // Fraud Prevention methods
  // Domain Trust Scoring
  createDomainTrustScore(domain: InsertDomainTrustScore): Promise<DomainTrustScore>;
  getDomainTrustScore(domain: string): Promise<DomainTrustScore | undefined>;
  updateDomainTrustScore(domain: string, updates: Partial<DomainTrustScore>): Promise<DomainTrustScore | undefined>;
  searchDomainsByRisk(riskLevel: string): Promise<DomainTrustScore[]>;
  getDomainsByCategory(category: string): Promise<DomainTrustScore[]>;
  
  // Phone Number Flagging
  createPhoneNumberFlag(phone: InsertPhoneNumberFlag): Promise<PhoneNumberFlag>;
  getPhoneNumberFlag(phoneNumber: string): Promise<PhoneNumberFlag | undefined>;
  updatePhoneNumberFlag(phoneNumber: string, updates: Partial<PhoneNumberFlag>): Promise<PhoneNumberFlag | undefined>;
  searchPhoneNumbersByRisk(riskLevel: string): Promise<PhoneNumberFlag[]>;
  getPhoneNumbersByScamType(scamType: string): Promise<PhoneNumberFlag[]>;
  
  // Fraud Reporting
  createFraudReport(report: InsertFraudReport & { reporterId?: number }): Promise<FraudReport>;
  getFraudReport(id: number): Promise<FraudReport | undefined>;
  getFraudReports(limit?: number, offset?: number): Promise<FraudReport[]>;
  getFraudReportsByType(reportType: string): Promise<FraudReport[]>;
  getFraudReportsByTarget(targetType: string, targetValue: string): Promise<FraudReport[]>;
  updateFraudReportStatus(id: number, status: string, assignedTo?: number, resolution?: string): Promise<FraudReport | undefined>;
  searchFraudReports(query: string): Promise<FraudReport[]>;
  
  // Website Analysis
  createWebsiteAnalysis(analysis: InsertWebsiteAnalysis): Promise<WebsiteAnalysis>;
  getWebsiteAnalysis(url: string): Promise<WebsiteAnalysis | undefined>;
  getWebsiteAnalysisByDomain(domain: string): Promise<WebsiteAnalysis[]>;
  updateWebsiteAnalysis(url: string, updates: Partial<WebsiteAnalysis>): Promise<WebsiteAnalysis | undefined>;
  getHighRiskWebsites(minRiskScore: number): Promise<WebsiteAnalysis[]>;

  // Session store
  sessionStore: session.Store;
}

export class DatabaseStorage implements IStorage {
  public sessionStore: session.Store;

  constructor() {
    this.sessionStore = new PostgresSessionStore({
      conString: process.env.DATABASE_URL,
      createTableIfMissing: true,
      ttl: 7 * 24 * 60 * 60, // 7 days
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async updateUser(id: number, updates: Partial<User>): Promise<User | undefined> {
    const [updatedUser] = await db.update(users).set(updates).where(eq(users.id, id)).returning();
    return updatedUser;
  }

  async updateUserTrustScore(id: number, score: string): Promise<User | undefined> {
    const [updatedUser] = await db.update(users).set({ trustScore: score }).where(eq(users.id, id)).returning();
    return updatedUser;
  }

  async updateUserVerificationLevel(id: number, level: string): Promise<User | undefined> {
    const [updatedUser] = await db.update(users).set({ verificationLevel: level }).where(eq(users.id, id)).returning();
    return updatedUser;
  }

  async updateUserPassword(id: number, hashedPassword: string): Promise<User | undefined> {
    const [updatedUser] = await db.update(users).set({ password: hashedPassword }).where(eq(users.id, id)).returning();
    return updatedUser;
  }

  // Password reset methods
  async createPasswordReset(userId: number, token: string, expiresAt: Date): Promise<PasswordReset> {
    const [reset] = await db.insert(passwordResets).values({ userId, token, expiresAt }).returning();
    return reset;
  }

  async getPasswordReset(token: string): Promise<PasswordReset | undefined> {
    const [reset] = await db.select().from(passwordResets).where(eq(passwordResets.token, token));
    return reset;
  }

  async deletePasswordReset(token: string): Promise<void> {
    await db.delete(passwordResets).where(eq(passwordResets.token, token));
  }

  // KYC methods
  async createKycVerification(kyc: InsertKyc & { userId: number }): Promise<KycVerification> {
    const [verification] = await db.insert(kycVerifications).values(kyc).returning();
    return verification;
  }

  async getKycByUserId(userId: number): Promise<KycVerification | undefined> {
    const [kyc] = await db.select().from(kycVerifications).where(eq(kycVerifications.userId, userId));
    return kyc;
  }

  async getPendingKycVerifications(): Promise<KycVerification[]> {
    return await db.select().from(kycVerifications).where(eq(kycVerifications.status, "pending"));
  }

  async updateKycStatus(id: number, status: string, reviewedBy: number, notes?: string): Promise<KycVerification | undefined> {
    const [updatedKyc] = await db.update(kycVerifications)
      .set({ status, reviewedBy, notes, reviewedAt: new Date() })
      .where(eq(kycVerifications.id, id))
      .returning();
    return updatedKyc;
  }

  // Transaction methods
  async createTransaction(transaction: InsertTransaction & { buyerId: number }): Promise<Transaction> {
    const [newTransaction] = await db.insert(transactions).values(transaction).returning();
    return newTransaction;
  }

  async getTransaction(id: number): Promise<Transaction | undefined> {
    const [transaction] = await db.select().from(transactions).where(eq(transactions.id, id));
    return transaction;
  }

  async getTransactionsByUser(userId: number, limit: number = 50, offset: number = 0): Promise<Transaction[]> {
    return await db.select().from(transactions)
      .where(or(eq(transactions.buyerId, userId), eq(transactions.sellerId, userId)))
      .limit(limit)
      .offset(offset)
      .orderBy(desc(transactions.createdAt));
  }

  async getTransactionCountByUser(userId: number): Promise<number> {
    const [result] = await db.select({ count: count() }).from(transactions)
      .where(or(eq(transactions.buyerId, userId), eq(transactions.sellerId, userId)));
    return result.count;
  }

  async updateTransactionStatus(id: number, status: string): Promise<Transaction | undefined> {
    const [updatedTransaction] = await db.update(transactions)
      .set({ status, updatedAt: new Date() })
      .where(eq(transactions.id, id))
      .returning();
    return updatedTransaction;
  }

  async updateTransactionStripeId(id: number, stripePaymentIntentId: string): Promise<Transaction | undefined> {
    const [updatedTransaction] = await db.update(transactions)
      .set({ stripePaymentIntentId })
      .where(eq(transactions.id, id))
      .returning();
    return updatedTransaction;
  }

  // Message methods
  async createMessage(message: InsertMessage & { senderId: number }): Promise<Message> {
    const [newMessage] = await db.insert(messages).values(message).returning();
    return newMessage;
  }

  async getMessagesByTransaction(transactionId: number): Promise<Message[]> {
    return await db.select().from(messages)
      .where(eq(messages.transactionId, transactionId))
      .orderBy(messages.createdAt);
  }

  async flagMessageAsScam(id: number): Promise<Message | undefined> {
    const [flaggedMessage] = await db.update(messages)
      .set({ flaggedAsScam: true })
      .where(eq(messages.id, id))
      .returning();
    return flaggedMessage;
  }

  // Scam report methods
  async createScamReport(report: InsertScamReport & { reporterId: number }): Promise<ScamReport> {
    const [newReport] = await db.insert(scamReports).values(report).returning();
    return newReport;
  }

  async getScamReports(): Promise<ScamReport[]> {
    return await db.select().from(scamReports).orderBy(desc(scamReports.createdAt));
  }

  async searchScamReports(query: string): Promise<ScamReport[]> {
    return await db.select().from(scamReports)
      .where(or(
        ilike(scamReports.scammerInfo, `%${query}%`),
        ilike(scamReports.description, `%${query}%`)
      ));
  }

  async updateScamReportStatus(id: number, status: string, reviewedBy: number): Promise<ScamReport | undefined> {
    const [updatedReport] = await db.update(scamReports)
      .set({ status, reviewedBy, reviewedAt: new Date() })
      .where(eq(scamReports.id, id))
      .returning();
    return updatedReport;
  }

  // Dispute methods
  async createDispute(dispute: InsertDispute & { raisedBy: number }): Promise<Dispute> {
    const [newDispute] = await db.insert(disputes).values(dispute).returning();
    return newDispute;
  }

  async getDisputesByTransaction(transactionId: number): Promise<Dispute[]> {
    return await db.select().from(disputes)
      .where(eq(disputes.transactionId, transactionId))
      .orderBy(desc(disputes.createdAt));
  }

  async getPendingDisputes(): Promise<Dispute[]> {
    return await db.select().from(disputes)
      .where(eq(disputes.status, "open"))
      .orderBy(desc(disputes.createdAt));
  }

  async updateDisputeStatus(id: number, status: string, resolution?: string, resolvedBy?: number): Promise<Dispute | undefined> {
    const updates: any = { status };
    if (resolution) updates.resolution = resolution;
    if (resolvedBy) updates.resolvedBy = resolvedBy;
    if (status === "resolved") updates.resolvedAt = new Date();

    const [updatedDispute] = await db.update(disputes)
      .set(updates)
      .where(eq(disputes.id, id))
      .returning();
    return updatedDispute;
  }

  // Developer Account methods
  async createDeveloperAccount(account: InsertDeveloperAccount & { userId: number }): Promise<DeveloperAccount> {
    const [newAccount] = await db.insert(developerAccounts).values(account).returning();
    return newAccount;
  }

  async getDeveloperAccountByUserId(userId: number): Promise<DeveloperAccount | undefined> {
    const [account] = await db.select().from(developerAccounts).where(eq(developerAccounts.userId, userId));
    return account;
  }

  async getDeveloperAccount(id: number): Promise<DeveloperAccount | undefined> {
    const [account] = await db.select().from(developerAccounts).where(eq(developerAccounts.id, id));
    return account;
  }

  async updateDeveloperAccountStatus(id: number, status: string, approvedBy?: number): Promise<DeveloperAccount | undefined> {
    const updates: any = { status };
    if (approvedBy) {
      updates.approvedBy = approvedBy;
      updates.approvedAt = new Date();
    }

    const [updatedAccount] = await db.update(developerAccounts)
      .set(updates)
      .where(eq(developerAccounts.id, id))
      .returning();
    return updatedAccount;
  }

  async updateDeveloperUsage(id: number, usage: number): Promise<DeveloperAccount | undefined> {
    const [updatedAccount] = await db.update(developerAccounts)
      .set({ currentUsage: usage })
      .where(eq(developerAccounts.id, id))
      .returning();
    return updatedAccount;
  }

  // API Key methods
  async createApiKey(apiKey: { developerId: number; name: string; keyHash: string; keyPrefix: string; permissions?: string[]; expiresAt?: Date }): Promise<ApiKey> {
    const [newKey] = await db.insert(apiKeys).values({
      ...apiKey,
      permissions: apiKey.permissions || []
    }).returning();
    return newKey;
  }

  async getApiKeysByDeveloperId(developerId: number): Promise<ApiKey[]> {
    return await db.select().from(apiKeys)
      .where(eq(apiKeys.developerId, developerId))
      .orderBy(desc(apiKeys.createdAt));
  }

  async getApiKeyByHash(keyHash: string): Promise<ApiKey | undefined> {
    const [key] = await db.select().from(apiKeys).where(eq(apiKeys.keyHash, keyHash));
    return key;
  }

  async revokeApiKey(id: number): Promise<ApiKey | undefined> {
    const [revokedKey] = await db.update(apiKeys)
      .set({ isActive: false, revokedAt: new Date() })
      .where(eq(apiKeys.id, id))
      .returning();
    return revokedKey;
  }

  async updateApiKeyLastUsed(id: number): Promise<ApiKey | undefined> {
    const [updatedKey] = await db.update(apiKeys)
      .set({ lastUsed: new Date() })
      .where(eq(apiKeys.id, id))
      .returning();
    return updatedKey;
  }

  // API Usage Log methods
  async createApiUsageLog(log: InsertApiUsageLog & { apiKeyId: number; developerId: number }): Promise<ApiUsageLog> {
    const [newLog] = await db.insert(apiUsageLogs).values(log).returning();
    return newLog;
  }

  async getApiUsageByDeveloper(developerId: number, startDate?: Date, endDate?: Date): Promise<ApiUsageLog[]> {
    const conditions = [eq(apiUsageLogs.developerId, developerId)];
    
    if (startDate) {
      conditions.push(gte(apiUsageLogs.createdAt, startDate));
    }
    if (endDate) {
      conditions.push(lte(apiUsageLogs.createdAt, endDate));
    }

    return await db.select().from(apiUsageLogs)
      .where(and(...conditions))
      .orderBy(desc(apiUsageLogs.createdAt));
  }

  async getApiUsageStats(developerId: number, period: 'day' | 'week' | 'month'): Promise<any> {
    let dateFilter: Date;
    const now = new Date();
    
    switch (period) {
      case 'day':
        dateFilter = new Date(now.getTime() - 24 * 60 * 60 * 1000);
        break;
      case 'week':
        dateFilter = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'month':
        dateFilter = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
        break;
    }

    const [stats] = await db.select({
      totalRequests: count(),
      avgResponseTime: avg(apiUsageLogs.responseTime),
      totalRequestSize: sum(apiUsageLogs.requestSize),
      totalResponseSize: sum(apiUsageLogs.responseSize)
    }).from(apiUsageLogs)
      .where(and(
        eq(apiUsageLogs.developerId, developerId),
        gte(apiUsageLogs.createdAt, dateFilter)
      ));

    return stats;
  }

  // Domain Trust Scoring methods
  async createDomainTrustScore(domain: InsertDomainTrustScore): Promise<DomainTrustScore> {
    const [newScore] = await db.insert(domainTrustScores).values(domain).returning();
    return newScore;
  }

  async getDomainTrustScore(domain: string): Promise<DomainTrustScore | undefined> {
    const [score] = await db.select().from(domainTrustScores).where(eq(domainTrustScores.domain, domain));
    return score;
  }

  async updateDomainTrustScore(domain: string, updates: Partial<DomainTrustScore>): Promise<DomainTrustScore | undefined> {
    const [updatedScore] = await db.update(domainTrustScores)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(domainTrustScores.domain, domain))
      .returning();
    return updatedScore;
  }

  async searchDomainsByRisk(riskLevel: string): Promise<DomainTrustScore[]> {
    return await db.select().from(domainTrustScores)
      .where(eq(domainTrustScores.riskLevel, riskLevel))
      .orderBy(desc(domainTrustScores.trustScore));
  }

  async getDomainsByCategory(category: string): Promise<DomainTrustScore[]> {
    return await db.select().from(domainTrustScores)
      .where(eq(domainTrustScores.category, category))
      .orderBy(desc(domainTrustScores.trustScore));
  }

  // Phone Number Flagging methods
  async createPhoneNumberFlag(phone: InsertPhoneNumberFlag): Promise<PhoneNumberFlag> {
    const [newFlag] = await db.insert(phoneNumberFlags).values(phone).returning();
    return newFlag;
  }

  async getPhoneNumberFlag(phoneNumber: string): Promise<PhoneNumberFlag | undefined> {
    const [flag] = await db.select().from(phoneNumberFlags).where(eq(phoneNumberFlags.phoneNumber, phoneNumber));
    return flag;
  }

  async updatePhoneNumberFlag(phoneNumber: string, updates: Partial<PhoneNumberFlag>): Promise<PhoneNumberFlag | undefined> {
    const [updatedFlag] = await db.update(phoneNumberFlags)
      .set({ ...updates, updatedAt: new Date() })
      .where(eq(phoneNumberFlags.phoneNumber, phoneNumber))
      .returning();
    return updatedFlag;
  }

  async searchPhoneNumbersByRisk(riskLevel: string): Promise<PhoneNumberFlag[]> {
    return await db.select().from(phoneNumberFlags)
      .where(eq(phoneNumberFlags.riskLevel, riskLevel))
      .orderBy(desc(phoneNumberFlags.fraudScore));
  }

  async getPhoneNumbersByScamType(scamType: string): Promise<PhoneNumberFlag[]> {
    return await db.select().from(phoneNumberFlags)
      .where(sql`${phoneNumberFlags.scamTypes} ? ${scamType}`)
      .orderBy(desc(phoneNumberFlags.fraudScore));
  }

  // Fraud Reporting methods
  async createFraudReport(report: InsertFraudReport & { reporterId?: number }): Promise<FraudReport> {
    const [newReport] = await db.insert(fraudReports).values(report).returning();
    return newReport;
  }

  async getFraudReport(id: number): Promise<FraudReport | undefined> {
    const [report] = await db.select().from(fraudReports).where(eq(fraudReports.id, id));
    return report;
  }

  async getFraudReports(limit: number = 50, offset: number = 0): Promise<FraudReport[]> {
    return await db.select().from(fraudReports)
      .limit(limit)
      .offset(offset)
      .orderBy(desc(fraudReports.createdAt));
  }

  async getFraudReportsByType(reportType: string): Promise<FraudReport[]> {
    return await db.select().from(fraudReports)
      .where(eq(fraudReports.reportType, reportType))
      .orderBy(desc(fraudReports.createdAt));
  }

  async getFraudReportsByTarget(targetType: string, targetValue: string): Promise<FraudReport[]> {
    const conditions = [];
    
    switch (targetType) {
      case 'domain':
        conditions.push(eq(fraudReports.targetDomain, targetValue));
        break;
      case 'phone':
        conditions.push(eq(fraudReports.targetPhoneNumber, targetValue));
        break;
      case 'email':
        conditions.push(eq(fraudReports.targetEmail, targetValue));
        break;
      case 'user':
        conditions.push(eq(fraudReports.targetUserId, parseInt(targetValue)));
        break;
      default:
        conditions.push(eq(fraudReports.targetOther, targetValue));
    }

    return await db.select().from(fraudReports)
      .where(or(...conditions))
      .orderBy(desc(fraudReports.createdAt));
  }

  async updateFraudReportStatus(id: number, status: string, assignedTo?: number, resolution?: string): Promise<FraudReport | undefined> {
    const updates: any = { status, updatedAt: new Date() };
    if (assignedTo) updates.assignedTo = assignedTo;
    if (resolution) updates.resolution = resolution;
    if (status === 'resolved') updates.resolvedAt = new Date();

    const [updatedReport] = await db.update(fraudReports)
      .set(updates)
      .where(eq(fraudReports.id, id))
      .returning();
    return updatedReport;
  }

  async searchFraudReports(query: string): Promise<FraudReport[]> {
    return await db.select().from(fraudReports)
      .where(or(
        ilike(fraudReports.description, `%${query}%`),
        ilike(fraudReports.targetDomain, `%${query}%`),
        ilike(fraudReports.targetPhoneNumber, `%${query}%`),
        ilike(fraudReports.targetEmail, `%${query}%`)
      ))
      .orderBy(desc(fraudReports.createdAt));
  }

  // Website Analysis methods
  async createWebsiteAnalysis(analysis: InsertWebsiteAnalysis): Promise<WebsiteAnalysis> {
    const [newAnalysis] = await db.insert(websiteAnalysis).values(analysis).returning();
    return newAnalysis;
  }

  async getWebsiteAnalysis(url: string): Promise<WebsiteAnalysis | undefined> {
    const [analysis] = await db.select().from(websiteAnalysis).where(eq(websiteAnalysis.url, url));
    return analysis;
  }

  async getWebsiteAnalysisByDomain(domain: string): Promise<WebsiteAnalysis[]> {
    return await db.select().from(websiteAnalysis)
      .where(eq(websiteAnalysis.domain, domain))
      .orderBy(desc(websiteAnalysis.analyzedAt));
  }

  async updateWebsiteAnalysis(url: string, updates: Partial<WebsiteAnalysis>): Promise<WebsiteAnalysis | undefined> {
    const [updatedAnalysis] = await db.update(websiteAnalysis)
      .set(updates)
      .where(eq(websiteAnalysis.url, url))
      .returning();
    return updatedAnalysis;
  }

  async getHighRiskWebsites(minRiskScore: number): Promise<WebsiteAnalysis[]> {
    return await db.select().from(websiteAnalysis)
      .where(gte(websiteAnalysis.riskScore, minRiskScore.toString()))
      .orderBy(desc(websiteAnalysis.riskScore));
  }
}

export const storage = new DatabaseStorage();
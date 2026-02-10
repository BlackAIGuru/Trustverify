import { pgTable, text, serial, integer, boolean, timestamp, decimal, jsonb } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table with enhanced reputation system
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique(),
  email: text("email").notNull().unique(),
  password: text("password"),
  firstName: text("first_name"),
  lastName: text("last_name"),
  profileImage: text("profile_image"),
  authProvider: text("auth_provider").default("local"), // local, google, facebook, github, apple
  googleId: text("google_id").unique(),
  facebookId: text("facebook_id").unique(),
  githubId: text("github_id").unique(),
  appleId: text("apple_id").unique(),
  isVerified: boolean("is_verified").default(false),
  // MFA Enhancement (Rule 1.1)
  mfaEnabled: boolean("mfa_enabled").default(false),
  mfaSecret: text("mfa_secret"), // TOTP secret
  mfaBackupCodes: jsonb("mfa_backup_codes"), // Array of backup codes
  lastMfaUsed: timestamp("last_mfa_used"),
  // Enhanced Role System (Rule 1.3)
  role: text("role").default("user"), // user, client_analyst, client_org_owner, developer, moderator, admin, super_admin
  clientOrgId: text("client_org_id"), // For client org members
  permissionOverrides: jsonb("permission_overrides"), // Custom permissions array
  // Session Security
  sessionCount: integer("session_count").default(0),
  maxSessions: integer("max_sessions").default(3),
  lastLoginAt: timestamp("last_login_at"),
  lastLoginIp: text("last_login_ip"),
  trustScore: decimal("trust_score", { precision: 5, scale: 2 }).default("0.00"),
  verificationLevel: text("verification_level").default("none"), // none, basic, full
  isAdmin: boolean("is_admin").default(false),
  // Tiered Seller Reputation System
  sellerTier: text("seller_tier").default("new"), // new, bronze, silver, gold, platinum
  completedTransactions: integer("completed_transactions").default(0),
  successfulTransactions: integer("successful_transactions").default(0),
  disputesAgainst: integer("disputes_against").default(0),
  validDisputes: integer("valid_disputes").default(0), // Disputes where seller was at fault
  // Auto-Sanctions System
  sanctionLevel: integer("sanction_level").default(0), // 0=none, 1=flagged, 2=restricted, 3=suspended
  sanctionReason: text("sanction_reason"),
  sanctionedUntil: timestamp("sanctioned_until"),
  // Reputation Modifiers
  fastReleaseEligible: boolean("fast_release_eligible").default(false), // Trusted sellers
  requiresExtendedBuffer: boolean("requires_extended_buffer").default(false), // High-risk sellers
  createdAt: timestamp("created_at").defaultNow(),
});

// Password Reset table
export const passwordResets = pgTable("password_resets", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

// KYC Verification table
export const kycVerifications = pgTable("kyc_verifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  documentType: text("document_type").notNull(), // passport, license, id_card
  documentNumber: text("document_number"),
  status: text("status").default("pending"), // pending, approved, rejected
  notes: text("notes"),
  submittedAt: timestamp("submitted_at").defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: integer("reviewed_by").references(() => users.id),
});

// KYC Documents table for storing uploaded files
export const kycDocuments = pgTable("kyc_documents", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  transactionId: integer("transaction_id").references(() => transactions.id),
  documentType: text("document_type").notNull(), // id_front, id_back, selfie, proof_of_address, other
  fileName: text("file_name").notNull(),
  fileUrl: text("file_url").notNull(),
  fileSize: integer("file_size"), // in bytes
  mimeType: text("mime_type"),
  status: text("status").default("pending"), // pending, verified, rejected
  uploadedAt: timestamp("uploaded_at").defaultNow(),
  verifiedAt: timestamp("verified_at"),
  verifiedBy: integer("verified_by").references(() => users.id),
});

// KYB Business Verification table
export const kybVerifications = pgTable("kyb_verifications", {
  id: serial("id").primaryKey(),
  transactionId: integer("transaction_id").references(() => transactions.id).notNull(),
  businessName: text("business_name").notNull(),
  registrationNumber: text("registration_number").notNull(),
  businessType: text("business_type").notNull(), // ltd, llc, sole_trader, partnership
  businessAddress: text("business_address").notNull(),
  website: text("website"),
  industry: text("industry"),
  status: text("status").default("pending"), // pending, approved, rejected
  verificationScore: decimal("verification_score", { precision: 5, scale: 2 }).default("0.00"),
  documentUrl: text("document_url"), // Business registration document
  notes: text("notes"),
  submittedAt: timestamp("submitted_at").defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: integer("reviewed_by").references(() => users.id),
});

// AML (Anti-Money Laundering) Checks table
export const amlChecks = pgTable("aml_checks", {
  id: serial("id").primaryKey(),
  transactionId: integer("transaction_id").references(() => transactions.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  checkType: text("check_type").notNull(), // sanctions, pep, adverse_media
  status: text("status").default("pending"), // pending, clear, flagged, blocked
  riskLevel: text("risk_level").default("low"), // low, medium, high, critical
  riskScore: decimal("risk_score", { precision: 5, scale: 2 }).default("0.00"),
  sanctionsMatch: boolean("sanctions_match").default(false),
  pepMatch: boolean("pep_match").default(false), // Politically Exposed Person
  adverseMediaMatch: boolean("adverse_media_match").default(false),
  matchDetails: jsonb("match_details"), // Details of any matches found
  checkSource: text("check_source"), // API provider used
  notes: text("notes"),
  checkedAt: timestamp("checked_at").defaultNow(),
  reviewedBy: integer("reviewed_by").references(() => users.id),
});

// Transactions table with advanced dispute resolution
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  amount: decimal("amount", { precision: 12, scale: 2 }).notNull(),
  currency: text("currency").default("GBP"),
  status: text("status").default("pending"), // pending, kyc_required, kyb_required, aml_check, verification_approved, escrow, active, service_delivery, buffer_period, completed, disputed, arbitration, cancelled
  buyerId: integer("buyer_id").references(() => users.id).notNull(),
  sellerId: integer("seller_id").references(() => users.id).notNull(),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  milestones: jsonb("milestones"),
  // Verification Status Tracking
  kycStatus: text("kyc_status").default("pending"), // pending, approved, rejected
  kybStatus: text("kyb_status").default("not_required"), // not_required, pending, approved, rejected
  amlStatus: text("aml_status").default("pending"), // pending, clear, flagged, blocked
  verificationCompletedAt: timestamp("verification_completed_at"),
  // Escrow and Fund Management
  escrowAmount: decimal("escrow_amount", { precision: 12, scale: 2 }),
  escrowStatus: text("escrow_status").default("not_initiated"), // not_initiated, pending, held, released, refunded
  escrowDepositedAt: timestamp("escrow_deposited_at"),
  fundsReleasedAt: timestamp("funds_released_at"),
  // Service Delivery Tracking
  serviceStartedAt: timestamp("service_started_at"),
  serviceCompletedAt: timestamp("service_completed_at"),
  deliveryConfirmedBy: integer("delivery_confirmed_by").references(() => users.id),
  // Buffer Period System
  bufferPeriodHours: integer("buffer_period_hours").default(72), // 24-72 hours based on seller reputation
  bufferStartTime: timestamp("buffer_start_time"), // When buffer period began
  bufferEndTime: timestamp("buffer_end_time"), // When funds will be released
  disputeWindowHours: integer("dispute_window_hours").default(72), // 3 days for dispute filing
  disputeDeadline: timestamp("dispute_deadline"), // Deadline for filing disputes
  // Smart Flagging System
  riskScore: decimal("risk_score", { precision: 5, scale: 2 }).default("0.00"), // AI-calculated risk
  fraudFlags: jsonb("fraud_flags"), // Array of detected fraud indicators
  autoSanctioned: boolean("auto_sanctioned").default(false), // Auto-sanctions applied
  escalationLevel: integer("escalation_level").default(0), // 0=normal, 1=flagged, 2=high-risk, 3=critical
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  completedAt: timestamp("completed_at"),
});

// Messages table
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  transactionId: integer("transaction_id").references(() => transactions.id).notNull(),
  senderId: integer("sender_id").references(() => users.id).notNull(),
  content: text("content").notNull(),
  isSystemMessage: boolean("is_system_message").default(false),
  flaggedAsScam: boolean("flagged_as_scam").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// Scam Reports table
export const scamReports = pgTable("scam_reports", {
  id: serial("id").primaryKey(),
  reporterId: integer("reporter_id").references(() => users.id).notNull(),
  scammerInfo: text("scammer_info").notNull(), // username, email, phone
  scamType: text("scam_type").notNull(),
  description: text("description").notNull(),
  evidence: jsonb("evidence"), // file paths, screenshots
  status: text("status").default("pending"), // pending, verified, dismissed
  isPublic: boolean("is_public").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  reviewedAt: timestamp("reviewed_at"),
  reviewedBy: integer("reviewed_by").references(() => users.id),
});

// Enhanced Disputes table with smart flagging
export const disputes = pgTable("disputes", {
  id: serial("id").primaryKey(),
  transactionId: integer("transaction_id").references(() => transactions.id).notNull(),
  raisedBy: integer("raised_by").references(() => users.id).notNull(),
  reason: text("reason").notNull(),
  description: text("description").notNull(),
  status: text("status").default("open"), // open, investigating, resolved, closed
  resolution: text("resolution"),
  resolvedBy: integer("resolved_by").references(() => users.id),
  // Smart Dispute Flagging
  disputeType: text("dispute_type").notNull(), // item_not_received, scam, quality_issue, unauthorized_charge
  aiConfidenceScore: decimal("ai_confidence_score", { precision: 5, scale: 2 }).default("0.00"),
  fraudIndicators: jsonb("fraud_indicators"), // Array of detected patterns
  priorityLevel: text("priority_level").default("normal"), // low, normal, high, critical
  autoFlagged: boolean("auto_flagged").default(false),
  escalatedToHuman: boolean("escalated_to_human").default(false),
  // Escalation Queue Management
  queuePosition: integer("queue_position"),
  assignedAgent: integer("assigned_agent").references(() => users.id),
  slaDeadline: timestamp("sla_deadline"), // Service level agreement deadline
  evidenceSubmitted: jsonb("evidence_submitted"), // Files, screenshots, etc.
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

// Auto-Sanctions Tracking table
export const sanctions = pgTable("sanctions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  sanctionType: text("sanction_type").notNull(), // warning, restriction, suspension, ban
  reason: text("reason").notNull(),
  description: text("description"),
  severity: integer("severity").default(1), // 1-5 scale
  automaticSanction: boolean("automatic_sanction").default(false),
  triggeredBy: text("triggered_by"), // dispute_count, fraud_score, manual_review
  disputeId: integer("dispute_id").references(() => disputes.id), // Related dispute if applicable
  durationHours: integer("duration_hours"), // NULL for permanent
  isActive: boolean("is_active").default(true),
  appliedBy: integer("applied_by").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
  revokedAt: timestamp("revoked_at"),
});

// Escalation Queue table for dispute management
export const escalationQueue = pgTable("escalation_queue", {
  id: serial("id").primaryKey(),
  disputeId: integer("dispute_id").references(() => disputes.id).notNull(),
  queueType: text("queue_type").default("standard"), // standard, priority, critical
  assignedTeam: text("assigned_team"), // fraud_team, dispute_resolution, legal
  position: integer("position").notNull(),
  slaHours: integer("sla_hours").default(24), // Service level agreement
  escalatedAt: timestamp("escalated_at").defaultNow(),
  assignedAt: timestamp("assigned_at"),
  completedAt: timestamp("completed_at"),
});

// Third-party arbitration tracking
export const arbitrationCases = pgTable("arbitration_cases", {
  id: serial("id").primaryKey(),
  disputeId: integer("dispute_id").references(() => disputes.id).notNull(),
  provider: text("provider").notNull(), // external arbitration service
  caseNumber: text("case_number"),
  status: text("status").default("initiated"), // initiated, pending, resolved, failed
  cost: decimal("cost", { precision: 10, scale: 2 }),
  outcome: text("outcome"), // buyer_favor, seller_favor, split_decision
  arbitratorNotes: text("arbitrator_notes"),
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

// Domain Trust Scoring table
export const domainTrustScores = pgTable("domain_trust_scores", {
  id: serial("id").primaryKey(),
  domain: text("domain").notNull().unique(),
  trustScore: decimal("trust_score", { precision: 5, scale: 2 }).notNull(), // 0.00 to 100.00
  riskLevel: text("risk_level").notNull(), // safe, low, medium, high, critical
  category: text("category"), // ecommerce, banking, social, news, etc.
  // Fraud indicators
  isPhishing: boolean("is_phishing").default(false),
  isMalware: boolean("is_malware").default(false),
  isScam: boolean("is_scam").default(false),
  isSuspicious: boolean("is_suspicious").default(false),
  // Technical analysis
  sslStatus: text("ssl_status"), // valid, invalid, expired, none
  domainAge: integer("domain_age"), // in days
  registrarInfo: jsonb("registrar_info"),
  whoisData: jsonb("whois_data"),
  // External sources
  googleSafeBrowsing: text("google_safe_browsing"), // safe, malware, phishing, unwanted
  virusTotalScore: integer("virus_total_score"), // number of engines flagging as malicious
  // User reports and verification
  reportCount: integer("report_count").default(0),
  verifiedLegitimate: boolean("verified_legitimate").default(false),
  verifiedBy: integer("verified_by").references(() => users.id),
  // Analysis metadata
  lastAnalyzed: timestamp("last_analyzed").defaultNow(),
  analysisSource: text("analysis_source"), // automatic, manual, user_report, partnership
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Phone Number Flagging table
export const phoneNumberFlags = pgTable("phone_number_flags", {
  id: serial("id").primaryKey(),
  phoneNumber: text("phone_number").notNull().unique(),
  countryCode: text("country_code"), // +1, +44, etc.
  region: text("region"), // US, UK, etc.
  carrier: text("carrier"),
  // Fraud indicators
  isScam: boolean("is_scam").default(false),
  isSpam: boolean("is_spam").default(false),
  isRobo: boolean("is_robo").default(false),
  isSpoofed: boolean("is_spoofed").default(false),
  // Risk assessment
  riskLevel: text("risk_level").default("unknown"), // safe, low, medium, high, critical
  fraudScore: decimal("fraud_score", { precision: 5, scale: 2 }).default("0.00"),
  // Reported activities
  scamTypes: jsonb("scam_types"), // ["phishing", "fake_support", "investment_scam"]
  reportedActivities: jsonb("reported_activities"),
  // Verification status
  reportCount: integer("report_count").default(0),
  verifiedScam: boolean("verified_scam").default(false),
  verifiedLegitimate: boolean("verified_legitimate").default(false),
  verifiedBy: integer("verified_by").references(() => users.id),
  // Analysis data
  firstReported: timestamp("first_reported").defaultNow(),
  lastReported: timestamp("last_reported").defaultNow(),
  analysisSource: text("analysis_source"), // user_report, telco_data, crowd_source
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Fraud Reports table (consolidated reporting system)
export const fraudReports = pgTable("fraud_reports", {
  id: serial("id").primaryKey(),
  reporterId: integer("reporter_id").references(() => users.id),
  reportType: text("report_type").notNull(), // website, phone, email, transaction, user
  // Target information
  targetDomain: text("target_domain"),
  targetPhoneNumber: text("target_phone_number"),
  targetEmail: text("target_email"),
  targetUserId: integer("target_user_id").references(() => users.id),
  targetOther: text("target_other"), // for other types of fraud targets
  // Fraud details
  fraudType: text("fraud_type").notNull(), // phishing, scam_call, fake_website, investment_scam, etc.
  severity: text("severity").default("medium"), // low, medium, high, critical
  description: text("description").notNull(),
  evidence: jsonb("evidence"), // screenshots, call logs, email headers, etc.
  financialLoss: decimal("financial_loss", { precision: 12, scale: 2 }), // amount lost if any
  // Geographic and temporal data
  reporterLocation: text("reporter_location"),
  incidentDate: timestamp("incident_date"),
  reportSource: text("report_source").default("web"), // web, mobile_app, api, phone, email
  // Processing status
  status: text("status").default("pending"), // pending, investigating, verified, dismissed, resolved
  priority: text("priority").default("normal"), // low, normal, high, urgent
  assignedTo: integer("assigned_to").references(() => users.id),
  resolution: text("resolution"),
  // Actions taken
  actionsTaken: jsonb("actions_taken"), // ["blocked_domain", "flagged_phone", "notified_authorities"]
  followUpRequired: boolean("follow_up_required").default(false),
  // Metadata
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  sessionId: text("session_id"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

// Website Analysis table (for Chrome extension and real-time analysis)
export const websiteAnalysis = pgTable("website_analysis", {
  id: serial("id").primaryKey(),
  url: text("url").notNull(),
  domain: text("domain").notNull(),
  // Real-time analysis results
  riskScore: decimal("risk_score", { precision: 5, scale: 2 }).notNull(),
  riskFactors: jsonb("risk_factors"), // detected suspicious elements
  // Technical indicators
  hasValidSSL: boolean("has_valid_ssl").default(false),
  certificateIssuer: text("certificate_issuer"),
  domainAge: integer("domain_age"), // in days
  pageLoadTime: integer("page_load_time"), // milliseconds
  // Content analysis
  suspiciousKeywords: jsonb("suspicious_keywords"),
  hasPasswordFields: boolean("has_password_fields").default(false),
  hasPaymentForms: boolean("has_payment_forms").default(false),
  externalLinksCount: integer("external_links_count").default(0),
  // Visual analysis
  visualSimilarity: jsonb("visual_similarity"), // similarity to known brands
  logoAnalysis: jsonb("logo_analysis"),
  colorSchemeAnalysis: jsonb("color_scheme_analysis"),
  // Behavioral tracking
  redirectionChain: jsonb("redirection_chain"),
  cookieAnalysis: jsonb("cookie_analysis"),
  trackingScripts: jsonb("tracking_scripts"),
  // Classification
  category: text("category"), // ecommerce, banking, social, news, unknown
  confidence: decimal("confidence", { precision: 5, scale: 2 }).default("0.00"),
  isLegitimate: boolean("is_legitimate"),
  // Analysis metadata
  analysisVersion: text("analysis_version"),
  userAgent: text("user_agent"),
  analyzedAt: timestamp("analyzed_at").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Developer Accounts table
export const developerAccounts = pgTable("developer_accounts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  companyName: text("company_name"),
  website: text("website"),
  description: text("description"),
  status: text("status").default("pending"), // pending, approved, suspended
  monthlyQuota: integer("monthly_quota").default(1000),
  currentUsage: integer("current_usage").default(0),
  isVerified: boolean("is_verified").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  approvedAt: timestamp("approved_at"),
  approvedBy: integer("approved_by").references(() => users.id),
});

// API Keys table with enhanced security (Rule 1.2)
export const apiKeys = pgTable("api_keys", {
  id: serial("id").primaryKey(),
  developerId: integer("developer_id").references(() => developerAccounts.id).notNull(),
  name: text("name").notNull(),
  keyHash: text("key_hash").notNull(),
  keyPrefix: text("key_prefix").notNull(), // First 8 chars for display
  permissions: jsonb("permissions").default('[]'), // Array of endpoint permissions
  environment: text("environment").notNull().default("sandbox"), // sandbox, production (Rule 1.2)
  industry: text("industry"), // banking, fintech, crypto, ecommerce, etc.
  useCase: text("use_case"), // primary use case for the API key
  isActive: boolean("is_active").default(true),
  lastUsedAt: timestamp("last_used_at"),
  expiresAt: timestamp("expires_at").notNull(), // Required 90-day expiry (Rule 1.2)
  rotationDue: timestamp("rotation_due").notNull(), // 90-day rotation reminder
  lastRotated: timestamp("last_rotated").defaultNow(),
  // Rate limiting and quotas (Rule 3.1, 3.3)
  rateLimit: integer("rate_limit").default(100), // requests per second
  monthlyQuota: integer("monthly_quota").default(10000),
  currentMonthUsage: integer("current_month_usage").default(0),
  quotaResetDate: timestamp("quota_reset_date").defaultNow(),
  // Enhanced tracking
  ipWhitelist: jsonb("ip_whitelist"), // Array of allowed IPs
  userAgent: text("user_agent"), // Expected user agent pattern
  createdAt: timestamp("created_at").defaultNow(),
  revokedAt: timestamp("revoked_at"),
});

// API Usage Logs table
export const apiUsageLogs = pgTable("api_usage_logs", {
  id: serial("id").primaryKey(),
  apiKeyId: integer("api_key_id").references(() => apiKeys.id).notNull(),
  developerId: integer("developer_id").references(() => developerAccounts.id).notNull(),
  endpoint: text("endpoint").notNull(),
  method: text("method").notNull(),
  statusCode: integer("status_code").notNull(),
  responseTime: integer("response_time"), // in milliseconds
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  requestSize: integer("request_size"), // in bytes
  responseSize: integer("response_size"), // in bytes
  errorMessage: text("error_message"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Client Organizations table (Rule 1.3)
export const clientOrganizations = pgTable("client_organizations", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  website: text("website"),
  industry: text("industry"), // gambling, crypto, forex, etc. (Rule 7.2)
  riskLevel: text("risk_level").default("low"), // low, medium, high (Rule 7.2)
  kybStatus: text("kyb_status").default("pending"), // pending, approved, rejected (Rule 7.1)
  kybCompletedAt: timestamp("kyb_completed_at"),
  requiresManualApproval: boolean("requires_manual_approval").default(false), // Rule 7.2
  enhancedMonitoring: boolean("enhanced_monitoring").default(false), // Rule 7.2
  productionApproved: boolean("production_approved").default(false), // Rule 7.3
  serviceAgreementSigned: boolean("service_agreement_signed").default(false), // Rule 7.3
  securityChecklistCompleted: boolean("security_checklist_completed").default(false), // Rule 7.3
  monthlyFraudCheckQuota: integer("monthly_fraud_check_quota").default(1000), // Rule 3.1
  currentMonthUsage: integer("current_month_usage").default(0),
  quotaResetDate: timestamp("quota_reset_date").defaultNow(),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// Tamper-proof Audit Logs (Rule 2.3, 5.1)
export const auditLogs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id),
  clientOrgId: integer("client_org_id").references(() => clientOrganizations.id),
  eventType: text("event_type").notNull(), // login, logout, api_call, config_change, etc.
  action: text("action").notNull(),
  resource: text("resource"), // table/endpoint affected
  resourceId: text("resource_id"), // ID of affected resource
  oldValues: jsonb("old_values"), // Previous values
  newValues: jsonb("new_values"), // New values
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  sessionId: text("session_id"),
  riskLevel: text("risk_level").default("low"), // low, medium, high, critical
  // Tamper-proof features
  checksum: text("checksum").notNull(), // SHA-256 hash for integrity
  previousLogId: integer("previous_log_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insurance Coverage Tracking (Rule 4)
export const insuranceCoverage = pgTable("insurance_coverage", {
  id: serial("id").primaryKey(),
  clientOrgId: integer("client_org_id").references(() => clientOrganizations.id).notNull(),
  transactionId: integer("transaction_id").references(() => transactions.id),
  policyNumber: text("policy_number").notNull(),
  coverageType: text("coverage_type").notNull(), // fraud_protection, chargeback_protection
  coverageAmount: decimal("coverage_amount", { precision: 12, scale: 2 }).notNull(),
  isActive: boolean("is_active").default(true),
  // Claim validation requirements (Rule 4.1, 4.2)
  fraudCheckRequired: boolean("fraud_check_required").default(true),
  apiComplianceRequired: boolean("api_compliance_required").default(true),
  fraudCheckCompleted: boolean("fraud_check_completed").default(false),
  apiComplianceVerified: boolean("api_compliance_verified").default(false),
  // Liability caps (Rule 4.3)
  liabilityCap: decimal("liability_cap", { precision: 12, scale: 2 }),
  deductible: decimal("deductible", { precision: 10, scale: 2 }).default("0.00"),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
});

// Insurance Claims (Rule 4.2)
export const insuranceClaims = pgTable("insurance_claims", {
  id: serial("id").primaryKey(),
  coverageId: integer("coverage_id").references(() => insuranceCoverage.id).notNull(),
  transactionId: integer("transaction_id").references(() => transactions.id),
  claimAmount: decimal("claim_amount", { precision: 12, scale: 2 }).notNull(),
  claimType: text("claim_type").notNull(), // fraud_loss, chargeback_loss
  status: text("status").default("submitted"), // submitted, investigating, approved, denied, paid
  // Required documentation (Rule 4.2)
  fraudScoreReports: jsonb("fraud_score_reports"), // Array of fraud reports
  auditLogs: jsonb("audit_logs"), // Related audit log IDs
  complianceReport: text("compliance_report"), // Client compliance report
  claimNotes: text("claim_notes"),
  investigationNotes: text("investigation_notes"),
  approvedAmount: decimal("approved_amount", { precision: 12, scale: 2 }),
  denialReason: text("denial_reason"),
  submittedAt: timestamp("submitted_at").defaultNow(),
  processedAt: timestamp("processed_at"),
  paidAt: timestamp("paid_at"),
});

// Security Incidents (Rule 5.2)
export const securityIncidents = pgTable("security_incidents", {
  id: serial("id").primaryKey(),
  incidentType: text("incident_type").notNull(), // sql_injection, credential_stuffing, ddos, breach_attempt
  severity: text("severity").default("medium"), // low, medium, high, critical
  status: text("status").default("detected"), // detected, investigating, mitigated, resolved
  description: text("description").notNull(),
  affectedSystems: jsonb("affected_systems"), // Array of affected components
  sourceIp: text("source_ip"),
  userAgent: text("user_agent"),
  attackVector: text("attack_vector"),
  // Automatic response (Rule 5.2)
  autoMitigated: boolean("auto_mitigated").default(false),
  ipBlacklisted: boolean("ip_blacklisted").default(false),
  socNotified: boolean("soc_notified").default(false),
  responseTime: integer("response_time"), // seconds to detection
  mitigationTime: integer("mitigation_time"), // seconds to mitigation
  // Incident response tracking
  assignedTo: integer("assigned_to").references(() => users.id),
  escalationLevel: integer("escalation_level").default(1), // 1-5 escalation levels
  playbookExecuted: text("playbook_executed"), // Which incident response playbook was used
  evidence: jsonb("evidence"), // Logs, screenshots, etc.
  resolution: text("resolution"),
  createdAt: timestamp("created_at").defaultNow(),
  resolvedAt: timestamp("resolved_at"),
});

// IP Blacklist (Rule 5.2)
export const ipBlacklist = pgTable("ip_blacklist", {
  id: serial("id").primaryKey(),
  ipAddress: text("ip_address").notNull().unique(),
  reason: text("reason").notNull(),
  severity: text("severity").default("medium"), // low, medium, high, critical
  sourceType: text("source_type").default("automatic"), // automatic, manual, external_feed
  incidentId: integer("incident_id").references(() => securityIncidents.id),
  isActive: boolean("is_active").default(true),
  automaticExpiry: boolean("automatic_expiry").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  expiresAt: timestamp("expires_at"),
  revokedAt: timestamp("revoked_at"),
});

// Penetration Testing (Rule 8.3)
export const penetrationTests = pgTable("penetration_tests", {
  id: serial("id").primaryKey(),
  provider: text("provider").notNull(), // External certified provider name
  testType: text("test_type").notNull(), // quarterly, annual, on_demand
  scope: text("scope").notNull(), // web_app, api, infrastructure, social_engineering
  status: text("status").default("scheduled"), // scheduled, in_progress, completed, failed
  scheduledDate: timestamp("scheduled_date").notNull(),
  startedAt: timestamp("started_at"),
  completedAt: timestamp("completed_at"),
  // Results
  criticalFindings: integer("critical_findings").default(0),
  highFindings: integer("high_findings").default(0),
  mediumFindings: integer("medium_findings").default(0),
  lowFindings: integer("low_findings").default(0),
  overallScore: decimal("overall_score", { precision: 5, scale: 2 }), // 0-100 security score
  reportUrl: text("report_url"), // Location of detailed report
  certificateUrl: text("certificate_url"), // Compliance certificate
  // Remediation tracking
  remediationRequired: boolean("remediation_required").default(false),
  remediationCompleted: boolean("remediation_completed").default(false),
  remediationDueDate: timestamp("remediation_due_date"),
  nextTestDue: timestamp("next_test_due"), // Quarterly schedule
  compliancePassed: boolean("compliance_passed").default(false),
  createdAt: timestamp("created_at").defaultNow(),
});

// LMS (Learning Management System) Tables for TrustVerify Fraud Academy

// LMS Courses table - The 4 main levels
export const lmsCourses = pgTable("lms_courses", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(), // "Foundation", "Intermediate", "Advanced", "Expert"
  description: text("description").notNull(),
  level: integer("level").notNull(), // 1, 2, 3, 4
  trackType: text("track_type").notNull(), // "individual", "business", "both"
  duration: text("duration"), // "4 weeks", "6 weeks", etc.
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  currency: text("currency").default("GBP"),
  isActive: boolean("is_active").default(true),
  completionCertificate: boolean("completion_certificate").default(false),
  prerequisites: jsonb("prerequisites"), // Array of required course IDs
  learningOutcomes: jsonb("learning_outcomes"), // Array of learning outcomes
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// LMS Modules table - The 20 modules across all courses
export const lmsModules = pgTable("lms_modules", {
  id: serial("id").primaryKey(),
  courseId: integer("course_id").references(() => lmsCourses.id).notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  moduleNumber: integer("module_number").notNull(), // 1-20
  estimatedDuration: text("estimated_duration"), // "45 minutes", "1 hour", etc.
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// LMS Content table - Individual content items within modules
export const lmsContent = pgTable("lms_content", {
  id: serial("id").primaryKey(),
  moduleId: integer("module_id").references(() => lmsModules.id).notNull(),
  title: text("title").notNull(),
  contentType: text("content_type").notNull(), // "video", "handout", "quiz", "assignment"
  content: jsonb("content"), // Video URL, PDF path, quiz questions, etc.
  orderIndex: integer("order_index").default(0),
  duration: text("duration"), // "5 minutes", "15 minutes", etc.
  isRequired: boolean("is_required").default(true),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// LMS Enrollments table - User course enrollments
export const lmsEnrollments = pgTable("lms_enrollments", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  courseId: integer("course_id").references(() => lmsCourses.id).notNull(),
  enrollmentType: text("enrollment_type").notNull(), // "individual", "business"
  status: text("status").default("active"), // "active", "completed", "expired", "cancelled"
  progress: decimal("progress", { precision: 5, scale: 2 }).default("0.00"), // 0.00 to 100.00
  startedAt: timestamp("started_at").defaultNow(),
  completedAt: timestamp("completed_at"),
  expiresAt: timestamp("expires_at"),
  certificateEarned: boolean("certificate_earned").default(false),
  certificateIssuedAt: timestamp("certificate_issued_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// LMS Progress table - Track user progress through modules and content
export const lmsProgress = pgTable("lms_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  enrollmentId: integer("enrollment_id").references(() => lmsEnrollments.id).notNull(),
  moduleId: integer("module_id").references(() => lmsModules.id),
  contentId: integer("content_id").references(() => lmsContent.id),
  status: text("status").default("not_started"), // "not_started", "in_progress", "completed"
  timeSpent: integer("time_spent").default(0), // seconds
  completedAt: timestamp("completed_at"),
  score: decimal("score", { precision: 5, scale: 2 }), // For quizzes/assignments
  maxScore: decimal("max_score", { precision: 5, scale: 2 }), // For quizzes/assignments
  attempts: integer("attempts").default(0),
  lastAttemptAt: timestamp("last_attempt_at"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

// LMS Quiz Answers table - Store quiz responses
export const lmsQuizAnswers = pgTable("lms_quiz_answers", {
  id: serial("id").primaryKey(),
  progressId: integer("progress_id").references(() => lmsProgress.id).notNull(),
  questionId: text("question_id").notNull(), // JSON path to question in content
  userAnswer: jsonb("user_answer"), // User's answer(s)
  correctAnswer: jsonb("correct_answer"), // Correct answer(s)
  isCorrect: boolean("is_correct").default(false),
  points: decimal("points", { precision: 5, scale: 2 }).default("0.00"),
  createdAt: timestamp("created_at").defaultNow(),
});

// LMS Certifications table - Track certifications earned
export const lmsCertifications = pgTable("lms_certifications", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => users.id).notNull(),
  courseId: integer("course_id").references(() => lmsCourses.id).notNull(),
  enrollmentId: integer("enrollment_id").references(() => lmsEnrollments.id).notNull(),
  certificateNumber: text("certificate_number").notNull().unique(),
  certificateType: text("certificate_type").notNull(), // "course_completion", "professional_certification"
  title: text("title").notNull(), // "TrustVerify Certified Fraud-Resilient Business Professional"
  finalScore: decimal("final_score", { precision: 5, scale: 2 }),
  passingScore: decimal("passing_score", { precision: 5, scale: 2 }).default("70.00"),
  examAttempts: integer("exam_attempts").default(1),
  issuedAt: timestamp("issued_at").defaultNow(),
  expiresAt: timestamp("expires_at"), // If certificates expire
  verificationUrl: text("verification_url"), // Public verification link
  certificateUrl: text("certificate_url"), // PDF download link
  isRevoked: boolean("is_revoked").default(false),
  revokedAt: timestamp("revoked_at"),
  revokedReason: text("revoked_reason"),
  createdAt: timestamp("created_at").defaultNow(),
});

// LMS Business Plans table - Track business subscriptions for teams
export const lmsBusinessPlans = pgTable("lms_business_plans", {
  id: serial("id").primaryKey(),
  organizationName: text("organization_name").notNull(),
  planType: text("plan_type").notNull(), // "bronze", "silver", "gold"
  maxEmployees: integer("max_employees").notNull(),
  currentEmployees: integer("current_employees").default(0),
  adminUserId: integer("admin_user_id").references(() => users.id).notNull(),
  stripeSubscriptionId: text("stripe_subscription_id"),
  status: text("status").default("active"), // "active", "suspended", "cancelled"
  startedAt: timestamp("started_at").defaultNow(),
  renewsAt: timestamp("renews_at"),
  cancelledAt: timestamp("cancelled_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// LMS Business Enrollments table - Link employees to business plans
export const lmsBusinessEnrollments = pgTable("lms_business_enrollments", {
  id: serial("id").primaryKey(),
  businessPlanId: integer("business_plan_id").references(() => lmsBusinessPlans.id).notNull(),
  userId: integer("user_id").references(() => users.id).notNull(),
  enrollmentId: integer("enrollment_id").references(() => lmsEnrollments.id).notNull(),
  invitedBy: integer("invited_by").references(() => users.id),
  invitedAt: timestamp("invited_at").defaultNow(),
  acceptedAt: timestamp("accepted_at"),
  status: text("status").default("invited"), // "invited", "accepted", "removed"
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  transactions: many(transactions),
  messages: many(messages),
  scamReports: many(scamReports),
  disputes: many(disputes),
  kycVerifications: many(kycVerifications),
  developerAccount: many(developerAccounts),
  passwordResets: many(passwordResets),
  fraudReports: many(fraudReports),
}));

export const passwordResetsRelations = relations(passwordResets, ({ one }) => ({
  user: one(users, {
    fields: [passwordResets.userId],
    references: [users.id],
  }),
}));

export const developerAccountsRelations = relations(developerAccounts, ({ one, many }) => ({
  user: one(users, {
    fields: [developerAccounts.userId],
    references: [users.id],
  }),
  apiKeys: many(apiKeys),
  usageLogs: many(apiUsageLogs),
}));

export const apiKeysRelations = relations(apiKeys, ({ one, many }) => ({
  developer: one(developerAccounts, {
    fields: [apiKeys.developerId],
    references: [developerAccounts.id],
  }),
  usageLogs: many(apiUsageLogs),
}));

export const apiUsageLogsRelations = relations(apiUsageLogs, ({ one }) => ({
  apiKey: one(apiKeys, {
    fields: [apiUsageLogs.apiKeyId],
    references: [apiKeys.id],
  }),
  developer: one(developerAccounts, {
    fields: [apiUsageLogs.developerId],
    references: [developerAccounts.id],
  }),
}));

export const transactionsRelations = relations(transactions, ({ one, many }) => ({
  buyer: one(users, {
    fields: [transactions.buyerId],
    references: [users.id],
  }),
  seller: one(users, {
    fields: [transactions.sellerId],
    references: [users.id],
  }),
  messages: many(messages),
  disputes: many(disputes),
}));

export const messagesRelations = relations(messages, ({ one }) => ({
  transaction: one(transactions, {
    fields: [messages.transactionId],
    references: [transactions.id],
  }),
  sender: one(users, {
    fields: [messages.senderId],
    references: [users.id],
  }),
}));

export const scamReportsRelations = relations(scamReports, ({ one }) => ({
  reporter: one(users, {
    fields: [scamReports.reporterId],
    references: [users.id],
  }),
  reviewer: one(users, {
    fields: [scamReports.reviewedBy],
    references: [users.id],
  }),
}));

export const disputesRelations = relations(disputes, ({ one }) => ({
  transaction: one(transactions, {
    fields: [disputes.transactionId],
    references: [transactions.id],
  }),
  raiser: one(users, {
    fields: [disputes.raisedBy],
    references: [users.id],
  }),
  resolver: one(users, {
    fields: [disputes.resolvedBy],
    references: [users.id],
  }),
}));

export const kycVerificationsRelations = relations(kycVerifications, ({ one }) => ({
  user: one(users, {
    fields: [kycVerifications.userId],
    references: [users.id],
  }),
  reviewer: one(users, {
    fields: [kycVerifications.reviewedBy],
    references: [users.id],
  }),
}));

// Fraud prevention relations
export const fraudReportsRelations = relations(fraudReports, ({ one }) => ({
  reporter: one(users, {
    fields: [fraudReports.reporterId],
    references: [users.id],
  }),
  assignedUser: one(users, {
    fields: [fraudReports.assignedTo],
    references: [users.id],
  }),
  targetUser: one(users, {
    fields: [fraudReports.targetUserId],
    references: [users.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  password: true,
  firstName: true,
  lastName: true,
  profileImage: true,
  authProvider: true,
  googleId: true,
}).extend({
  password: z.string()
    .min(12, "Password must be at least 12 characters long")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/, 
      "Password must contain uppercase, lowercase, number, and special character")
    .optional(),
}).partial({ username: true }).refine((data) => {
  // Either password auth (local) or OAuth
  if (data.authProvider === 'local') {
    return data.password && data.username;
  }
  return true;
}, {
  message: "Username and password required for local authentication",
});

export const insertKycSchema = createInsertSchema(kycVerifications).pick({
  documentType: true,
  documentNumber: true,
});

export const insertKybSchema = createInsertSchema(kybVerifications).pick({
  transactionId: true,
  businessName: true,
  registrationNumber: true,
  businessType: true,
  businessAddress: true,
  website: true,
  industry: true,
});

export const insertAmlCheckSchema = createInsertSchema(amlChecks).pick({
  transactionId: true,
  userId: true,
  checkType: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).pick({
  title: true,
  description: true,
  amount: true,
  sellerId: true,
  milestones: true,
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  transactionId: true,
  content: true,
});

export const insertScamReportSchema = createInsertSchema(scamReports).pick({
  scammerInfo: true,
  scamType: true,
  description: true,
  evidence: true,
});

export const insertDisputeSchema = createInsertSchema(disputes).pick({
  transactionId: true,
  reason: true,
  description: true,
});

// Fraud Prevention schemas
export const insertDomainTrustScoreSchema = createInsertSchema(domainTrustScores).pick({
  domain: true,
  trustScore: true,
  riskLevel: true,
  category: true,
  isPhishing: true,
  isMalware: true,
  isScam: true,
  isSuspicious: true,
});

export const insertPhoneNumberFlagSchema = createInsertSchema(phoneNumberFlags).pick({
  phoneNumber: true,
  countryCode: true,
  region: true,
  carrier: true,
  isScam: true,
  isSpam: true,
  isRobo: true,
  isSpoofed: true,
  riskLevel: true,
  fraudScore: true,
  scamTypes: true,
  reportedActivities: true,
});

export const insertFraudReportSchema = createInsertSchema(fraudReports).pick({
  reportType: true,
  targetDomain: true,
  targetPhoneNumber: true,
  targetEmail: true,
  targetUserId: true,
  targetOther: true,
  fraudType: true,
  severity: true,
  description: true,
  evidence: true,
  financialLoss: true,
  reporterLocation: true,
  incidentDate: true,
  reportSource: true,
});

export const insertWebsiteAnalysisSchema = createInsertSchema(websiteAnalysis).pick({
  url: true,
  domain: true,
  riskScore: true,
  riskFactors: true,
  hasValidSSL: true,
  certificateIssuer: true,
  domainAge: true,
  suspiciousKeywords: true,
  hasPasswordFields: true,
  hasPaymentForms: true,
  category: true,
  confidence: true,
  isLegitimate: true,
});

// Developer Portal schemas
export const insertDeveloperAccountSchema = createInsertSchema(developerAccounts).pick({
  companyName: true,
  website: true,
  description: true,
});

export const insertApiKeySchema = createInsertSchema(apiKeys).pick({
  name: true,
  permissions: true,
}).extend({
  expiresAt: z.date().optional(),
});

export const insertApiUsageLogSchema = createInsertSchema(apiUsageLogs).pick({
  endpoint: true,
  method: true,
  statusCode: true,
  responseTime: true,
  userAgent: true,
  ipAddress: true,
  requestSize: true,
  responseSize: true,
  errorMessage: true,
});

export const insertPasswordResetSchema = createInsertSchema(passwordResets).pick({
  userId: true,
  token: true,
  expiresAt: true,
});

// LMS Insert Schemas
export const insertLmsCourseSchema = createInsertSchema(lmsCourses).pick({
  title: true,
  description: true,
  level: true,
  trackType: true,
  duration: true,
  price: true,
  currency: true,
  completionCertificate: true,
  prerequisites: true,
  learningOutcomes: true,
});

export const insertLmsModuleSchema = createInsertSchema(lmsModules).pick({
  courseId: true,
  title: true,
  description: true,
  moduleNumber: true,
  estimatedDuration: true,
});

export const insertLmsContentSchema = createInsertSchema(lmsContent).pick({
  moduleId: true,
  title: true,
  contentType: true,
  content: true,
  orderIndex: true,
  duration: true,
  isRequired: true,
});

export const insertLmsEnrollmentSchema = createInsertSchema(lmsEnrollments).pick({
  userId: true,
  courseId: true,
  enrollmentType: true,
  expiresAt: true,
});

export const insertLmsProgressSchema = createInsertSchema(lmsProgress).pick({
  userId: true,
  enrollmentId: true,
  moduleId: true,
  contentId: true,
  status: true,
  timeSpent: true,
  score: true,
  maxScore: true,
  attempts: true,
});

export const insertLmsQuizAnswerSchema = createInsertSchema(lmsQuizAnswers).pick({
  progressId: true,
  questionId: true,
  userAnswer: true,
  correctAnswer: true,
  isCorrect: true,
  points: true,
});

export const insertLmsCertificationSchema = createInsertSchema(lmsCertifications).pick({
  userId: true,
  courseId: true,
  enrollmentId: true,
  certificateNumber: true,
  certificateType: true,
  title: true,
  finalScore: true,
  passingScore: true,
  examAttempts: true,
  expiresAt: true,
  verificationUrl: true,
  certificateUrl: true,
});

export const insertLmsBusinessPlanSchema = createInsertSchema(lmsBusinessPlans).pick({
  organizationName: true,
  planType: true,
  maxEmployees: true,
  adminUserId: true,
  stripeSubscriptionId: true,
  renewsAt: true,
});

export const insertLmsBusinessEnrollmentSchema = createInsertSchema(lmsBusinessEnrollments).pick({
  businessPlanId: true,
  userId: true,
  enrollmentId: true,
  invitedBy: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertKyc = z.infer<typeof insertKycSchema>;
export type KycVerification = typeof kycVerifications.$inferSelect;
export type InsertKyb = z.infer<typeof insertKybSchema>;
export type KybVerification = typeof kybVerifications.$inferSelect;
export type InsertAmlCheck = z.infer<typeof insertAmlCheckSchema>;
export type AmlCheck = typeof amlChecks.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;
export type Transaction = typeof transactions.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
export type InsertScamReport = z.infer<typeof insertScamReportSchema>;
export type ScamReport = typeof scamReports.$inferSelect;
export type InsertDispute = z.infer<typeof insertDisputeSchema>;
export type Dispute = typeof disputes.$inferSelect;

// Fraud Prevention types
export type InsertDomainTrustScore = z.infer<typeof insertDomainTrustScoreSchema>;
export type DomainTrustScore = typeof domainTrustScores.$inferSelect;
export type InsertPhoneNumberFlag = z.infer<typeof insertPhoneNumberFlagSchema>;
export type PhoneNumberFlag = typeof phoneNumberFlags.$inferSelect;
export type InsertFraudReport = z.infer<typeof insertFraudReportSchema>;
export type FraudReport = typeof fraudReports.$inferSelect;
export type InsertWebsiteAnalysis = z.infer<typeof insertWebsiteAnalysisSchema>;
export type WebsiteAnalysis = typeof websiteAnalysis.$inferSelect;

// Developer Portal types
export type InsertDeveloperAccount = z.infer<typeof insertDeveloperAccountSchema>;
export type DeveloperAccount = typeof developerAccounts.$inferSelect;
export type InsertApiKey = z.infer<typeof insertApiKeySchema>;
export type ApiKey = typeof apiKeys.$inferSelect;
export type InsertApiUsageLog = z.infer<typeof insertApiUsageLogSchema>;
export type ApiUsageLog = typeof apiUsageLogs.$inferSelect;
export type InsertPasswordReset = z.infer<typeof insertPasswordResetSchema>;
export type PasswordReset = typeof passwordResets.$inferSelect;

// LMS Types
export type InsertLmsCourse = z.infer<typeof insertLmsCourseSchema>;
export type LmsCourse = typeof lmsCourses.$inferSelect;
export type InsertLmsModule = z.infer<typeof insertLmsModuleSchema>;
export type LmsModule = typeof lmsModules.$inferSelect;
export type InsertLmsContent = z.infer<typeof insertLmsContentSchema>;
export type LmsContent = typeof lmsContent.$inferSelect;
export type InsertLmsEnrollment = z.infer<typeof insertLmsEnrollmentSchema>;
export type LmsEnrollment = typeof lmsEnrollments.$inferSelect;
export type InsertLmsProgress = z.infer<typeof insertLmsProgressSchema>;
export type LmsProgress = typeof lmsProgress.$inferSelect;
export type InsertLmsQuizAnswer = z.infer<typeof insertLmsQuizAnswerSchema>;
export type LmsQuizAnswer = typeof lmsQuizAnswers.$inferSelect;
export type InsertLmsCertification = z.infer<typeof insertLmsCertificationSchema>;
export type LmsCertification = typeof lmsCertifications.$inferSelect;
export type InsertLmsBusinessPlan = z.infer<typeof insertLmsBusinessPlanSchema>;
export type LmsBusinessPlan = typeof lmsBusinessPlans.$inferSelect;
export type InsertLmsBusinessEnrollment = z.infer<typeof insertLmsBusinessEnrollmentSchema>;
export type LmsBusinessEnrollment = typeof lmsBusinessEnrollments.$inferSelect;

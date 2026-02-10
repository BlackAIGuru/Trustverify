import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage.js";
import { setupAuth } from "./auth.js";
import { 
  insertTransactionSchema, 
  insertMessageSchema, 
  insertScamReportSchema, 
  insertDisputeSchema,
  insertKycSchema,
  insertDeveloperAccountSchema,
  insertDomainTrustScoreSchema,
  insertPhoneNumberFlagSchema,
  insertFraudReportSchema,
  insertWebsiteAnalysisSchema
} from "./shared/schema.js";
import crypto from 'crypto';
import { validateBody, validateQuery, paginationSchema, idParamSchema } from "./middleware/validation.js";
import developerRoutes from "./routes/developer.js";
import { validateApiKey, logApiUsage } from "./middleware/apiAuth.js";
import { industryApiRoutes } from "./services/industryApis.js";
import enterpriseRouter from "./routes/enterprise.js";
import cryptoDemoRouter from "./demo/cryptoDemo.js";
import supportRoutes from "./routes/support.js";
import { WebsiteSecurityAnalyzer } from "./services/websiteAnalyzer.js";
import multer from "multer";
import path from "path";
import fs from "fs";
import { z } from "zod";

// Set up multer for file uploads
const uploadDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  dest: uploadDir,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only JPEG, PNG, and PDF files are allowed.'));
    }
  }
});

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup authentication routes
  setupAuth(app);
  
  // Security functionality - implemented with try-catch for graceful degradation
  let securityModules;
  try {
    const rbacModule = await import("./security/rbac.js");
    const middlewareModule = await import("./security/security-middleware.js");
    const auditModule = await import("./security/audit-logger.js");
    const pentestModule = await import("./security/penetration-testing.js");
    const configModule = await import("./security/security-config.js");
    
    securityModules = {
      requirePermission: rbacModule.requirePermission,
      requireRole: rbacModule.requireRole,
      Role: rbacModule.Role,
      Permission: rbacModule.Permission,
      strictRateLimit: middlewareModule.strictRateLimit,
      AuditService: auditModule.default,
      AuditEventType: auditModule.AuditEventType,
      PenetrationTestSuite: pentestModule.default,
      calculateSecurityScore: configModule.calculateSecurityScore
    };
  } catch (error) {
    console.warn('Security modules not available, running with basic functionality');
    securityModules = null;
  }
  
  // Security monitoring routes - with graceful fallback
  app.get("/api/security/status", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    // Basic admin check
    if (!req.user?.email?.includes('@trustverify.com')) {
      return res.sendStatus(403);
    }
    
    if (securityModules) {
      try {
        const securityMetrics = securityModules.calculateSecurityScore();
        
        securityModules.AuditService.logAdminAction('security_status_check', req.user, req, {
          metadata: { securityScore: securityMetrics.configurationScore }
        });
        
        res.json({
          ...securityMetrics,
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV
        });
      } catch (error) {
        res.status(500).json({ error: 'Security status unavailable' });
      }
    } else {
      res.json({
        configurationScore: 85,
        criticalIssues: [],
        warnings: ['Security modules not fully loaded'],
        recommendations: ['Complete security module configuration'],
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV
      });
    }
  });
  
  app.post("/api/security/pentest", async (req, res) => {
    if (!req.isAuthenticated()) return res.sendStatus(401);
    
    // Super admin check
    if (req.user?.email !== 'admin@trustverify.com') {
      return res.sendStatus(403);
    }
    
    if (securityModules) {
      try {
        const testSuite = new securityModules.PenetrationTestSuite();
        const results = await testSuite.runAllTests(req);
        
        securityModules.AuditService.logAdminAction('penetration_test_executed', req.user, req, {
          metadata: { 
            totalTests: results.length,
            criticalIssues: testSuite.getCriticalIssues().length
          },
          riskLevel: 'high'
        });
        
        res.json({
          results,
          summary: {
            totalTests: results.length,
            criticalIssues: testSuite.getCriticalIssues(),
            highPriorityIssues: testSuite.getHighPriorityIssues()
          },
          timestamp: new Date().toISOString()
        });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    } else {
      res.status(503).json({ error: 'Penetration testing modules not available' });
    }
  });

  // Middleware to check authentication
  const requireAuth = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Authentication required" });
    }
    next();
  };

  // Middleware to check admin access
  const requireAdmin = (req: any, res: any, next: any) => {
    if (!req.isAuthenticated() || !req.user.isAdmin) {
      return res.status(403).json({ message: "Admin access required" });
    }
    next();
  };

  // KYC Verification Routes
  app.post("/api/kyc/submit", requireAuth, upload.single('document'), async (req, res) => {
    try {
      const { documentType, documentNumber } = req.body;
      
      if (!documentType || !documentNumber) {
        return res.status(400).json({ message: "Document type and number are required" });
      }

      const existingKyc = await storage.getKycByUserId(req.user.id);
      if (existingKyc && existingKyc.status === "approved") {
        return res.status(400).json({ message: "KYC already approved" });
      }

      const kyc = await storage.createKycVerification({
        userId: req.user.id,
        documentType,
        documentNumber,
      });

      res.status(201).json(kyc);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/kyc/status", requireAuth, async (req, res) => {
    try {
      const kyc = await storage.getKycByUserId(req.user.id);
      res.json(kyc || { status: "not_submitted" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Transaction Routes
  app.post("/api/transactions", requireAuth, async (req, res) => {
    try {
      // Security enhancement: log transaction creation
      if (securityModules?.AuditService) {
        securityModules.AuditService.logUserAction('TRANSACTION_CREATED', req.user, req, {
          resourceType: 'transaction',
          metadata: { amount: req.body.amount, title: req.body.title }
        });
      }
      
      const validatedData = insertTransactionSchema.parse(req.body);
      
      // Check if seller exists
      const seller = await storage.getUser(validatedData.sellerId);
      if (!seller) {
        return res.status(400).json({ message: "Seller not found" });
      }

      const transaction = await storage.createTransaction({
        ...validatedData,
        buyerId: req.user.id,
      });

      res.status(201).json(transaction);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/transactions", requireAuth, validateQuery(paginationSchema), async (req, res) => {
    try {
      // Security enhancement: log data access
      if (securityModules?.AuditService) {
        securityModules.AuditService.logUserAction('DATA_EXPORT', req.user, req, {
          resourceType: 'transactions',
          metadata: { page: req.query.page, limit: req.query.limit }
        });
      }
      
      const { page, limit } = req.query;
      const offset = (page! - 1) * limit!;
      
      const transactions = await storage.getTransactionsByUser(req.user!.id, limit, offset);
      const total = await storage.getTransactionCountByUser(req.user!.id);
      
      res.json({
        transactions,
        pagination: {
          page,
          limit,
          total,
          totalPages: Math.ceil(total / limit!),
          hasNext: page! * limit! < total,
          hasPrev: page! > 1,
        },
      });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/transactions/:id", requireAuth, async (req, res) => {
    try {
      const transaction = await storage.getTransaction(parseInt(req.params.id));
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      // Check if user is involved in the transaction
      if (transaction.buyerId !== req.user.id && transaction.sellerId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      res.json(transaction);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/transactions/:id/status", requireAuth, async (req, res) => {
    try {
      const { status } = req.body;
      const transaction = await storage.getTransaction(parseInt(req.params.id));
      
      if (!transaction) {
        return res.status(404).json({ message: "Transaction not found" });
      }

      // Check if user is involved in the transaction
      if (transaction.buyerId !== req.user.id && transaction.sellerId !== req.user.id) {
        return res.status(403).json({ message: "Access denied" });
      }

      const updatedTransaction = await storage.updateTransactionStatus(transaction.id, status);
      res.json(updatedTransaction);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Message Routes
  app.post("/api/messages", requireAuth, async (req, res) => {
    try {
      const validatedData = insertMessageSchema.parse(req.body);
      
      // Check if user is involved in the transaction
      const transaction = await storage.getTransaction(validatedData.transactionId);
      if (!transaction || 
          (transaction.buyerId !== req.user.id && transaction.sellerId !== req.user.id)) {
        return res.status(403).json({ message: "Access denied" });
      }

      const message = await storage.createMessage({
        ...validatedData,
        senderId: req.user.id,
      });

      res.status(201).json(message);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/messages/:transactionId", requireAuth, async (req, res) => {
    try {
      const transactionId = parseInt(req.params.transactionId);
      const transaction = await storage.getTransaction(transactionId);
      
      if (!transaction || 
          (transaction.buyerId !== req.user.id && transaction.sellerId !== req.user.id)) {
        return res.status(403).json({ message: "Access denied" });
      }

      const messages = await storage.getMessagesByTransaction(transactionId);
      res.json(messages);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/messages/:id/flag", requireAuth, async (req, res) => {
    try {
      const message = await storage.flagMessageAsScam(parseInt(req.params.id));
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.json(message);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Scam Report Routes
  app.post("/api/scam-reports", requireAuth, async (req, res) => {
    try {
      const validatedData = insertScamReportSchema.parse(req.body);
      
      const report = await storage.createScamReport({
        ...validatedData,
        reporterId: req.user.id,
      });

      res.status(201).json(report);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/scam-reports", async (req, res) => {
    try {
      const { search } = req.query;
      let reports;
      
      if (search && typeof search === 'string') {
        reports = await storage.searchScamReports(search);
      } else {
        reports = await storage.getScamReports();
      }
      
      res.json(reports);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Dispute Routes
  app.post("/api/disputes", requireAuth, async (req, res) => {
    try {
      const validatedData = insertDisputeSchema.parse(req.body);
      
      // Check if user is involved in the transaction
      const transaction = await storage.getTransaction(validatedData.transactionId);
      if (!transaction || 
          (transaction.buyerId !== req.user.id && transaction.sellerId !== req.user.id)) {
        return res.status(403).json({ message: "Access denied" });
      }

      const dispute = await storage.createDispute({
        ...validatedData,
        raisedBy: req.user.id,
      });

      // Update transaction status to disputed
      await storage.updateTransactionStatus(validatedData.transactionId, "disputed");

      res.status(201).json(dispute);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/disputes/:transactionId", requireAuth, async (req, res) => {
    try {
      const transactionId = parseInt(req.params.transactionId);
      const transaction = await storage.getTransaction(transactionId);
      
      if (!transaction || 
          (transaction.buyerId !== req.user.id && transaction.sellerId !== req.user.id)) {
        return res.status(403).json({ message: "Access denied" });
      }

      const disputes = await storage.getDisputesByTransaction(transactionId);
      res.json(disputes);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Admin Routes
  app.get("/api/admin/kyc-pending", requireAdmin, async (req, res) => {
    try {
      const pendingKyc = await storage.getPendingKycVerifications();
      res.json(pendingKyc);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/admin/kyc/:id", requireAdmin, async (req, res) => {
    try {
      const { status, notes } = req.body;
      const kyc = await storage.updateKycStatus(
        parseInt(req.params.id), 
        status, 
        req.user.id, 
        notes
      );
      
      if (!kyc) {
        return res.status(404).json({ message: "KYC verification not found" });
      }
      
      res.json(kyc);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/admin/disputes-pending", requireAdmin, async (req, res) => {
    try {
      const pendingDisputes = await storage.getPendingDisputes();
      res.json(pendingDisputes);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/admin/disputes/:id", requireAdmin, async (req, res) => {
    try {
      const { status, resolution } = req.body;
      const dispute = await storage.updateDisputeStatus(
        parseInt(req.params.id), 
        status, 
        resolution, 
        req.user.id
      );
      
      if (!dispute) {
        return res.status(404).json({ message: "Dispute not found" });
      }
      
      res.json(dispute);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  app.patch("/api/admin/scam-reports/:id", requireAdmin, async (req, res) => {
    try {
      const { status } = req.body;
      const report = await storage.updateScamReportStatus(
        parseInt(req.params.id), 
        status, 
        req.user.id
      );
      
      if (!report) {
        return res.status(404).json({ message: "Scam report not found" });
      }
      
      res.json(report);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // User search for transaction creation
  app.get("/api/users/search", requireAuth, async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query required" });
      }

      // Simple search by username or email
      const users = Array.from((storage as any).users.values())
        .filter((user: any) => 
          user.username.toLowerCase().includes(q.toLowerCase()) ||
          user.email.toLowerCase().includes(q.toLowerCase())
        )
        .map((user: any) => ({
          id: user.id,
          username: user.username,
          trustScore: user.trustScore,
          verificationLevel: user.verificationLevel
        }))
        .slice(0, 10); // Limit results

      res.json(users);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Developer Portal routes
  app.use("/api/developer", developerRoutes);
  
  // Register industry-specific API routes
  app.use('/api/industry', validateApiKey, logApiUsage, industryApiRoutes);
  
  // Register enterprise dashboard routes
  app.use('/api/enterprise', enterpriseRouter);
  
  // Register crypto demo routes
  app.use('/api/demo', cryptoDemoRouter);
  
  // Register support and Zendesk chat routes
  app.use('/api/support', supportRoutes);

  // Developer resource download endpoints
  app.get('/api/developer/download/postman', (req, res) => {
    const postmanCollection = {
      info: {
        name: "TrustVerify API Collection",
        description: "Complete API collection for TrustVerify fraud prevention platform",
        version: "2.1.0"
      },
      item: [
        {
          name: "Authentication",
          item: [
            {
              name: "Get API Status",
              request: {
                method: "GET",
                header: [{ key: "Authorization", value: "Bearer {{api_key}}" }],
                url: { raw: "{{base_url}}/v1/status", host: ["{{base_url}}"], path: ["v1", "status"] }
              }
            }
          ]
        },
        {
          name: "Transactions",
          item: [
            {
              name: "Create Transaction",
              request: {
                method: "POST",
                header: [
                  { key: "Authorization", value: "Bearer {{api_key}}" },
                  { key: "Content-Type", value: "application/json" }
                ],
                body: {
                  mode: "raw",
                  raw: JSON.stringify({
                    amount: 1000.00,
                    currency: "GBP",
                    recipient: "user@example.com",
                    description: "Service payment"
                  }, null, 2)
                },
                url: { raw: "{{base_url}}/v1/transactions/create", host: ["{{base_url}}"], path: ["v1", "transactions", "create"] }
              }
            }
          ]
        }
      ],
      variable: [
        { key: "base_url", value: "https://api.trustverify.io", type: "string" },
        { key: "api_key", value: "your_api_key_here", type: "string" }
      ]
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="trustverify-api-collection.json"');
    res.send(JSON.stringify(postmanCollection, null, 2));
  });

  app.get('/api/developer/download/openapi', (req, res) => {
    const openApiSpec = {
      openapi: "3.0.0",
      info: {
        title: "TrustVerify API",
        description: "Enterprise-grade transaction security and fraud prevention API",
        version: "2.1.0",
        contact: {
          name: "TrustVerify API Support",
          email: "api-support@trustverify.io",
          url: "https://trustverify.io/support"
        }
      },
      servers: [
        { url: "https://api.trustverify.io/v1", description: "Production server" },
        { url: "https://sandbox-api.trustverify.io/v1", description: "Sandbox server" }
      ],
      paths: {
        "/status": {
          get: {
            summary: "Get API status",
            security: [{"BearerAuth": []}],
            responses: {
              "200": {
                description: "API is operational",
                content: {
                  "application/json": {
                    schema: {
                      type: "object",
                      properties: { status: { type: "string", example: "operational" } }
                    }
                  }
                }
              }
            }
          }
        }
      },
      components: {
        securitySchemes: {
          BearerAuth: { type: "http", scheme: "bearer", bearerFormat: "JWT" }
        }
      }
    };

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename="trustverify-openapi-spec.json"');
    res.send(JSON.stringify(openApiSpec, null, 2));
  });

  app.get('/api/developer/download/integration-guide', (req, res) => {
    const guide = `# TrustVerify Integration Guide\n\n## Quick Start\n1. Sign up at https://trustverify.io/developers\n2. Generate API keys\n3. Install SDK: npm install @trustverify/node-sdk\n4. Start integrating!\n\n## Authentication\nAll requests require Bearer token:\nAuthorization: Bearer YOUR_API_KEY\n\n## Example\nconst client = new TrustVerify({ apiKey: 'your_key' });\nconst transaction = await client.transactions.create({ amount: 100 });`;

    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename="trustverify-integration-guide.md"');
    res.send(guide);
  });

  // API routes with authentication and logging middleware
  app.use("/api/v1", validateApiKey, logApiUsage);

  // Public API endpoints
  app.get("/api/v1/transactions", async (req, res) => {
    try {
      const transactions = await storage.getTransactionsByUser(req.developer!.userId);
      res.json(transactions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/v1/users/:id", async (req, res) => {
    try {
      const user = await storage.getUser(parseInt(req.params.id));
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      
      // Return safe user data
      res.json({
        id: user.id,
        username: user.username,
        trustScore: user.trustScore,
        verificationLevel: user.verificationLevel,
        isVerified: user.isVerified
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Developer Account Management
  app.post("/api/developer/account", requireAuth, async (req, res) => {
    try {
      const validatedData = insertDeveloperAccountSchema.parse(req.body);
      const account = await storage.createDeveloperAccount({
        ...validatedData,
        userId: req.user!.id,
      });
      res.status(201).json(account);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  app.get("/api/developer/account", requireAuth, async (req, res) => {
    try {
      const userId = req.user!.id;
      const account = await storage.getDeveloperAccountByUserId(userId);
      if (!account) {
        return res.status(404).json({ error: "Developer account not found" });
      }
      res.json(account);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch developer account" });
    }
  });

  // API Key management routes
  app.get("/api/developer/api-keys", requireAuth, async (req, res) => {
    try {
      const userId = req.user!.id;
      const account = await storage.getDeveloperAccountByUserId(userId);
      if (!account) {
        return res.status(404).json({ error: "Developer account not found" });
      }
      const keys = await storage.getApiKeysByDeveloperId(account.id);
      res.json(keys);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to fetch API keys" });
    }
  });

  app.post("/api/developer/api-keys", requireAuth, async (req, res) => {
    try {
      const userId = req.user!.id;
      const { name, permissions = [] } = req.body;

      if (!name || typeof name !== 'string' || name.trim().length === 0) {
        return res.status(400).json({ error: "API key name is required" });
      }

      const account = await storage.getDeveloperAccountByUserId(userId);
      if (!account) {
        return res.status(404).json({ error: "Developer account not found" });
      }

      if (account.status !== 'approved') {
        return res.status(403).json({ error: "Developer account must be approved to create API keys" });
      }

      // Generate API key
      const keyPrefix = "tv_";
      const randomBytes = new Uint8Array(32);
      crypto.getRandomValues(randomBytes);
      const keyBody = Array.from(randomBytes, b => b.toString(16).padStart(2, '0')).join('');
      const fullKey = keyPrefix + keyBody;
      
      // Hash the key for storage
      const keyHash = crypto.createHash('sha256').update(fullKey).digest('hex');

      const apiKey = await storage.createApiKey({
        developerId: account.id,
        name: name.trim(),
        keyHash,
        keyPrefix,
        permissions: Array.isArray(permissions) ? permissions : [],
        expiresAt: undefined
      });

      res.status(201).json({
        ...apiKey,
        key: fullKey
      });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to create API key" });
    }
  });

  app.delete("/api/developer/api-keys/:id", requireAuth, async (req, res) => {
    try {
      const userId = req.user!.id;
      const keyId = parseInt(req.params.id);

      if (isNaN(keyId)) {
        return res.status(400).json({ error: "Invalid key ID" });
      }

      const account = await storage.getDeveloperAccountByUserId(userId);
      if (!account) {
        return res.status(404).json({ error: "Developer account not found" });
      }

      const key = await storage.revokeApiKey(keyId);
      if (!key || key.developerId !== account.id) {
        return res.status(404).json({ error: "API key not found" });
      }

      res.json({ message: "API key revoked successfully" });
    } catch (error: any) {
      res.status(500).json({ error: "Failed to revoke API key" });
    }
  });

  // ================================
  // FRAUD PREVENTION API ROUTES
  // ================================

  // 1. DOMAIN TRUST SCORING API
  // Check domain trust score
  app.get("/api/fraud/domain/:domain", validateApiKey, logApiUsage, async (req, res) => {
    try {
      const { domain } = req.params;
      
      if (!domain || domain.length < 3) {
        return res.status(400).json({ error: "Valid domain required" });
      }

      const trustScore = await storage.getDomainTrustScore(domain.toLowerCase());
      
      if (!trustScore) {
        // Create new domain analysis if not found
        const newScore = await storage.createDomainTrustScore({
          domain: domain.toLowerCase(),
          trustScore: "50.00",
          riskLevel: "medium",
          category: "unknown",
          isPhishing: false,
          isMalware: false,
          isScam: false,
          isSuspicious: false
        });
        return res.json(newScore);
      }

      res.json(trustScore);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to get domain trust score" });
    }
  });

  // Create/update domain trust score
  app.post("/api/fraud/domain", validateApiKey, logApiUsage, validateBody(insertDomainTrustScoreSchema), async (req, res) => {
    try {
      const domainData = req.body;
      const existingScore = await storage.getDomainTrustScore(domainData.domain.toLowerCase());
      
      if (existingScore) {
        const updated = await storage.updateDomainTrustScore(domainData.domain.toLowerCase(), domainData);
        return res.json(updated);
      }

      const newScore = await storage.createDomainTrustScore({
        ...domainData,
        domain: domainData.domain.toLowerCase()
      });
      
      res.status(201).json(newScore);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to create domain trust score" });
    }
  });

  // Search domains by risk level
  app.get("/api/fraud/domains/risk/:level", validateApiKey, logApiUsage, async (req, res) => {
    try {
      const { level } = req.params;
      
      if (!['low', 'medium', 'high', 'critical'].includes(level)) {
        return res.status(400).json({ error: "Valid risk level required (low, medium, high, critical)" });
      }

      const domains = await storage.searchDomainsByRisk(level);
      res.json(domains);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to search domains by risk" });
    }
  });

  // 2. PHONE NUMBER VERIFICATION API
  // Check phone number flags
  app.get("/api/fraud/phone/:phoneNumber", validateApiKey, logApiUsage, async (req, res) => {
    try {
      const { phoneNumber } = req.params;
      
      if (!phoneNumber || phoneNumber.length < 8) {
        return res.status(400).json({ error: "Valid phone number required" });
      }

      const phoneFlag = await storage.getPhoneNumberFlag(phoneNumber);
      
      if (!phoneFlag) {
        // Create new phone analysis if not found
        const newFlag = await storage.createPhoneNumberFlag({
          phoneNumber,
          countryCode: "unknown",
          region: "unknown",
          carrier: "unknown",
          isScam: false,
          isSpam: false,
          isRobo: false,
          isSpoofed: false,
          riskLevel: "low",
          fraudScore: "10.00",
          scamTypes: [],
          reportedActivities: []
        });
        return res.json(newFlag);
      }

      res.json(phoneFlag);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to get phone number flag" });
    }
  });

  // Create/update phone number flag
  app.post("/api/fraud/phone", validateApiKey, logApiUsage, validateBody(insertPhoneNumberFlagSchema), async (req, res) => {
    try {
      const phoneData = req.body;
      const existingFlag = await storage.getPhoneNumberFlag(phoneData.phoneNumber);
      
      if (existingFlag) {
        const updated = await storage.updatePhoneNumberFlag(phoneData.phoneNumber, phoneData);
        return res.json(updated);
      }

      const newFlag = await storage.createPhoneNumberFlag(phoneData);
      res.status(201).json(newFlag);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to create phone number flag" });
    }
  });

  // Search phone numbers by scam type
  app.get("/api/fraud/phones/scam/:type", validateApiKey, logApiUsage, async (req, res) => {
    try {
      const { type } = req.params;
      const phones = await storage.getPhoneNumbersByScamType(type);
      res.json(phones);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to search phones by scam type" });
    }
  });

  // 3. USER REPORTING PORTAL API
  // Get fraud reports
  app.get("/api/fraud/reports", validateApiKey, logApiUsage, validateQuery(paginationSchema), async (req, res) => {
    try {
      const { limit = 50, offset = 0 } = req.query;
      const reports = await storage.getFraudReports(Number(limit), Number(offset));
      res.json(reports);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to get fraud reports" });
    }
  });

  // Create fraud report
  app.post("/api/fraud/reports", validateBody(insertFraudReportSchema), async (req, res) => {
    try {
      const reportData = req.body;
      const reporterId = req.isAuthenticated() ? req.user!.id : undefined;
      
      const report = await storage.createFraudReport({
        ...reportData,
        reporterId
      });
      
      res.status(201).json(report);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to create fraud report" });
    }
  });

  // Get fraud report by ID
  app.get("/api/fraud/reports/:id", validateApiKey, logApiUsage, validateQuery(idParamSchema), async (req, res) => {
    try {
      const reportId = parseInt(req.params.id);
      
      if (isNaN(reportId)) {
        return res.status(400).json({ error: "Invalid report ID" });
      }

      const report = await storage.getFraudReport(reportId);
      
      if (!report) {
        return res.status(404).json({ error: "Fraud report not found" });
      }

      res.json(report);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to get fraud report" });
    }
  });

  // Update fraud report status
  app.patch("/api/fraud/reports/:id", requireAuth, async (req, res) => {
    try {
      const reportId = parseInt(req.params.id);
      const { status, assignedTo, resolution } = req.body;
      
      if (isNaN(reportId)) {
        return res.status(400).json({ error: "Invalid report ID" });
      }

      const updatedReport = await storage.updateFraudReportStatus(reportId, status, assignedTo, resolution);
      
      if (!updatedReport) {
        return res.status(404).json({ error: "Fraud report not found" });
      }

      res.json(updatedReport);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to update fraud report" });
    }
  });

  // Search fraud reports by target
  app.get("/api/fraud/reports/target/:type/:value", validateApiKey, logApiUsage, async (req, res) => {
    try {
      const { type, value } = req.params;
      
      const validTypes = ['domain', 'phone', 'email', 'user', 'other'];
      if (!validTypes.includes(type)) {
        return res.status(400).json({ error: "Invalid target type" });
      }

      const reports = await storage.getFraudReportsByTarget(type, value);
      res.json(reports);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to search fraud reports by target" });
    }
  });

  // 4. WEBSITE ANALYSIS API - Real-time Security Analysis
  // Real-time website security analysis
  app.post("/api/fraud/analyze", async (req, res) => {
    try {
      const { url } = req.body;
      
      if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: "Valid URL required" });
      }

      // Validate URL format
      try {
        new URL(url);
      } catch {
        return res.status(400).json({ error: "Invalid URL format" });
      }

      console.log(`Starting real-time analysis for: ${url}`);
      
      // Initialize real-time website analyzer
      const analyzer = new WebsiteSecurityAnalyzer();
      
      // Perform comprehensive real-time analysis
      const analysisResult = await analyzer.analyzeWebsite(url);
      
      // Store the analysis results in database for future reference
      try {
        const storedAnalysis = await storage.createWebsiteAnalysis({
          url: analysisResult.url,
          domain: analysisResult.domain,
          ipAddress: analysisResult.domainInfo.ip,
          country: "Unknown", // Can be enhanced with IP geolocation
          riskScore: (100 - analysisResult.trustScore).toString(),
          fraudFlags: analysisResult.vulnerabilities.map(v => v.type),
          securityHeaders: Object.keys(analysisResult.securityHeaders.headers),
          sslInfo: analysisResult.sslCertificate ? {
            valid: analysisResult.sslCertificate.valid,
            issuer: analysisResult.sslCertificate.issuer,
            expiry: analysisResult.sslCertificate.validTo
          } : null,
          performanceScore: Math.round(100 - (analysisResult.performanceMetrics.loadTime / 100)),
          trustScore: analysisResult.trustScore.toString(),
          lastScanned: new Date()
        });
        
        console.log(`Analysis completed and stored for: ${url}`);
      } catch (storageError) {
        console.warn("Failed to store analysis results:", storageError);
        // Continue with response even if storage fails
      }
      
      // Return comprehensive real-time analysis
      res.json({
        success: true,
        analysis: analysisResult,
        timestamp: new Date().toISOString(),
        analysisType: "real-time-security-scan"
      });
      
    } catch (error: any) {
      console.error("Real-time website analysis failed:", error);
      res.status(500).json({ 
        error: "Website analysis failed", 
        details: error.message,
        fallback: "Using demo data for demonstration purposes"
      });
    }
  });

  // Get website analysis
  app.get("/api/fraud/analyze/:encodedUrl", validateApiKey, logApiUsage, async (req, res) => {
    try {
      const url = decodeURIComponent(req.params.encodedUrl);
      
      if (!url || !url.includes('.')) {
        return res.status(400).json({ error: "Valid URL required" });
      }

      const analysis = await storage.getWebsiteAnalysis(url);
      
      if (!analysis) {
        return res.status(404).json({ error: "Website analysis not found" });
      }

      res.json(analysis);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to get website analysis" });
    }
  });

  // Get high-risk websites
  app.get("/api/fraud/high-risk", validateApiKey, logApiUsage, async (req, res) => {
    try {
      const { minScore = 70 } = req.query;
      const websites = await storage.getHighRiskWebsites(Number(minScore));
      res.json(websites);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to get high-risk websites" });
    }
  });

  // Quick domain security check (faster endpoint for basic checks)
  app.post("/api/fraud/domain-check", async (req, res) => {
    try {
      const { domain } = req.body;
      
      if (!domain || typeof domain !== 'string' || domain.length < 3) {
        return res.status(400).json({ error: "Valid domain required" });
      }

      console.log(`Quick domain check for: ${domain}`);
      
      // Initialize analyzer for quick domain-only check
      const analyzer = new WebsiteSecurityAnalyzer();
      const url = domain.startsWith('http') ? domain : `https://${domain}`;
      
      // Perform quick analysis (domain + basic security headers only)
      const analysisResult = await analyzer.analyzeWebsite(url);
      
      // Return condensed results for quick checks
      res.json({
        success: true,
        domain: analysisResult.domain,
        trustScore: analysisResult.trustScore,
        riskLevel: analysisResult.riskLevel,
        isReachable: analysisResult.domainInfo.isReachable,
        hasHTTPS: analysisResult.securityHeaders.hasHTTPS,
        hasValidSSL: analysisResult.sslCertificate?.valid || false,
        threatFlags: analysisResult.threatIntelligence.threatCategories,
        isBlacklisted: analysisResult.threatIntelligence.isBlacklisted,
        summary: analysisResult.summary,
        quickCheck: true,
        timestamp: new Date().toISOString()
      });
      
    } catch (error: any) {
      console.error("Quick domain check failed:", error);
      res.status(500).json({ 
        error: "Domain check failed", 
        details: error.message
      });
    }
  });

  // Get website analysis by domain
  app.get("/api/fraud/domain-analysis/:domain", validateApiKey, logApiUsage, async (req, res) => {
    try {
      const { domain } = req.params;
      
      if (!domain || domain.length < 3) {
        return res.status(400).json({ error: "Valid domain required" });
      }

      const analyses = await storage.getWebsiteAnalysisByDomain(domain.toLowerCase());
      res.json(analyses);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to get domain analysis" });
    }
  });

  // 5. COMPREHENSIVE FRAUD CHECK API
  // Multi-factor fraud check with real-time analysis
  app.post("/api/fraud/check", async (req, res) => {
    try {
      const { domain, phoneNumber, email, url } = req.body;
      const results: any = {};

      console.log(`Comprehensive fraud check requested for:`, { domain, phoneNumber, email, url });

      // Real-time website analysis if URL provided
      if (url) {
        try {
          const analyzer = new WebsiteSecurityAnalyzer();
          const analysisResult = await analyzer.analyzeWebsite(url);
          
          results.website = {
            url: analysisResult.url,
            domain: analysisResult.domain,
            trustScore: analysisResult.trustScore,
            riskLevel: analysisResult.riskLevel,
            securityAnalysis: {
              hasHTTPS: analysisResult.securityHeaders.hasHTTPS,
              hasValidSSL: analysisResult.sslCertificate?.valid || false,
              securityHeaders: {
                hsts: analysisResult.securityHeaders.hasHSTS,
                csp: analysisResult.securityHeaders.hasCSP,
                xframe: analysisResult.securityHeaders.hasXFrameOptions
              }
            },
            threatIntelligence: {
              isBlacklisted: analysisResult.threatIntelligence.isBlacklisted,
              threatCategories: analysisResult.threatIntelligence.threatCategories,
              reputationScore: analysisResult.threatIntelligence.reputationScore
            },
            vulnerabilities: analysisResult.vulnerabilities,
            summary: analysisResult.summary,
            timestamp: analysisResult.timestamp
          };
          
          console.log(`Real-time website analysis completed for: ${url}`);
        } catch (analysisError) {
          console.warn(`Website analysis failed for ${url}:`, analysisError);
          results.website = {
            url,
            error: "Real-time analysis failed",
            fallback: true
          };
        }
      }

      // Check domain trust score if domain provided separately
      if (domain && !url) {
        try {
          const domainScore = await storage.getDomainTrustScore(domain.toLowerCase());
          results.domain = domainScore;
        } catch (error) {
          console.warn(`Domain check failed for ${domain}:`, error);
          results.domain = { domain, error: "Domain check unavailable" };
        }
      }

      // Check phone if provided
      if (phoneNumber) {
        try {
          const phoneFlag = await storage.getPhoneNumberFlag(phoneNumber);
          results.phone = phoneFlag;
        } catch (error) {
          console.warn(`Phone check failed for ${phoneNumber}:`, error);
          results.phone = { phoneNumber, error: "Phone check unavailable" };
        }
      }

      // Skip fraud reports lookup for faster response - can be added as separate endpoint if needed
      const reports = [];

      results.reports = reports;
      results.checkDate = new Date().toISOString();
      results.realTimeAnalysis = true;

      console.log(`Comprehensive fraud check completed for:`, Object.keys(results));
      res.json(results);
    } catch (error: any) {
      console.error("Comprehensive fraud check failed:", error);
      res.status(500).json({ error: "Failed to perform fraud check", details: error.message });
    }
  });

  // 6. CHROME EXTENSION SUPPORT API
  // Quick domain check for browser extension
  app.get("/api/fraud/quick-check/:domain", validateApiKey, logApiUsage, async (req, res) => {
    try {
      const { domain } = req.params;
      
      if (!domain || domain.length < 3) {
        return res.status(400).json({ error: "Valid domain required" });
      }

      const [trustScore, reports] = await Promise.all([
        storage.getDomainTrustScore(domain.toLowerCase()),
        storage.getFraudReportsByTarget('domain', domain.toLowerCase())
      ]);

      const result = {
        domain: domain.toLowerCase(),
        trustScore: trustScore?.trustScore || "50.00",
        riskLevel: trustScore?.riskLevel || "medium",
        isPhishing: trustScore?.isPhishing || false,
        isMalware: trustScore?.isMalware || false,
        isScam: trustScore?.isScam || false,
        reportCount: reports.length,
        lastUpdated: trustScore?.updatedAt || new Date().toISOString(),
        warning: reports.length > 0 ? "This domain has been reported for fraudulent activity" : null
      };

      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: "Failed to perform quick check" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

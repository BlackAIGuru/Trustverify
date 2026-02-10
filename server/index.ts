import "dotenv/config";
import "express-async-errors";
import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { config } from "./config";
import pino from "pino";
import pinoHttp from "pino-http";
import { 
  securityHeaders, 
  apiRateLimit, 
  preventSqlInjection, 
  preventXSS, 
  securityLogger,
  enhanceSessionSecurity
} from "./security/security-middleware";
import { auditMiddleware } from "./security/audit-logger";
import { complianceMiddleware } from "./security/compliance";
import { securityConfig, calculateSecurityScore } from "./security/security-config";

// Initialize structured logging
const logger = pino({
  level: config.NODE_ENV === "production" ? "info" : "debug",
  transport: config.NODE_ENV === "development" ? {
    target: "pino-pretty",
    options: { colorize: true }
  } : undefined,
});

const app = express();

// Health check endpoint (before security middleware for accessibility)
app.get('/health', (_req, res) => {
  res.send('OK');
});

// Security middleware - must be first
app.use(securityHeaders);
app.use(securityLogger);
app.use(auditMiddleware);
app.use(complianceMiddleware);

// Request logging middleware
app.use(pinoHttp({ logger }));

// Rate limiting for API routes
app.use('/api', apiRateLimit);

// Input sanitization and validation
app.use(preventSqlInjection);
app.use(preventXSS);

// Body parsing with size limits
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));

// Session security enhancement
app.use(enhanceSessionSecurity);

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Log security configuration on startup
  try {
    const securityModule = await import("./security/security-config.js");
    const securityMetrics = securityModule.calculateSecurityScore();
    logger.info({
      securityScore: securityMetrics.configurationScore,
      criticalIssues: securityMetrics.criticalIssues,
      warnings: securityMetrics.warnings,
      environment: config.NODE_ENV
    }, 'Security configuration loaded');

    if (securityMetrics.criticalIssues.length > 0) {
      logger.error({ issues: securityMetrics.criticalIssues }, 'Critical security issues detected');
    }
  } catch (error) {
    logger.warn('Security configuration check failed during startup');
  }

  const server = await registerRoutes(app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (app.get("env") === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  // ALWAYS serve the app on port 5000
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = config.PORT;
  // Use localhost in development to avoid ENOTSUP on Windows when binding to 0.0.0.0
  const host = config.NODE_ENV === "development" ? "127.0.0.1" : "0.0.0.0";
  server.listen({
    port,
    host,
    ...(config.NODE_ENV !== "development" && { reusePort: true }),
  }, () => {
    console.log(`Server running on http://${host}:${port}`);
    console.log(`Health check: http://${host}:${port}/health`);
    console.log(`Environment: ${config.NODE_ENV}`);
    console.log(`Startup time: ${new Date().toISOString()}`);
    
    log(`serving on port ${port}`);
    if (config.NODE_ENV === 'production') {
      logger.info('Production server started with enhanced security');
    }
  });
})();

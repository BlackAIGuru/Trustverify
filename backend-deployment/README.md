# TrustVerify Backend API

This is the backend API server for TrustVerify, a comprehensive fraud prevention platform.

## Features

- **RESTful API** for fraud detection and transaction security
- **PostgreSQL Database** with Drizzle ORM
- **Authentication & Authorization** with session management
- **Rate Limiting & Security** with Helmet.js
- **Comprehensive Fraud Detection APIs** for multiple industries
- **Real-time Analytics** and reporting
- **Stripe Integration** for payments
- **Email Services** with SendGrid

## Quick Start

### Prerequisites

- Node.js 18+ 
- PostgreSQL database (Neon recommended)
- Required environment variables

### Environment Variables

Create a `.env` file with:

```bash
# Database
DATABASE_URL=your_postgresql_connection_string

# Session Security
SESSION_SECRET=your_secure_session_secret

# Email Service
SENDGRID_API_KEY=your_sendgrid_api_key

# Stripe (optional)
STRIPE_SECRET_KEY=your_stripe_secret_key

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Application
NODE_ENV=production
PORT=5000
```

### Installation & Deployment

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Build the application:**
   ```bash
   npm run build
   ```

3. **Push database schema:**
   ```bash
   npm run db:push
   ```

4. **Start the production server:**
   ```bash
   npm start
   ```

### Development

```bash
# Start development server with hot reload
npm run dev

# Generate database migrations
npm run db:generate

# Push schema changes
npm run db:push
```

## API Endpoints

### Core Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/user` - Get current user

### Fraud Detection
- `POST /api/fraud/check-email` - Email fraud verification
- `POST /api/fraud/check-phone` - Phone number verification
- `POST /api/fraud/check-domain` - Domain trust scoring
- `POST /api/fraud/analyze-website` - Website security analysis

### Industry APIs
- `POST /api/crypto/*` - Cryptocurrency fraud detection
- `POST /api/fintech/*` - Financial services protection
- `POST /api/ecommerce/*` - E-commerce security
- `POST /api/gaming/*` - iGaming fraud prevention

### Developer Portal
- `POST /api/developer/register` - Register developer account
- `GET /api/developer/keys` - Manage API keys
- `GET /api/developer/usage` - API usage analytics

## Database Schema

The application uses PostgreSQL with the following main tables:

- `users` - User accounts and trust scores
- `transactions` - Transaction records with escrow
- `kyc_verifications` - KYC verification records
- `fraud_reports` - Fraud detection logs
- `api_keys` - Developer API key management
- `sessions` - User session storage

## Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CSRF Protection**: Secure session management
- **Input Validation**: Zod schema validation
- **SQL Injection Prevention**: Parameterized queries
- **XSS Protection**: Content Security Policy headers
- **Audit Logging**: Comprehensive security event logging

## Deployment Options

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 5000
CMD ["npm", "start"]
```

### Railway/Render Deployment
- Set environment variables in dashboard
- Connect GitHub repository
- Auto-deploy on push to main branch

### Traditional Server Deployment
1. Build application: `npm run build`
2. Copy `dist/` folder to server
3. Run with PM2: `pm2 start dist/index.js`

## Monitoring & Health Checks

- Health endpoint: `GET /health`
- Returns: `{"status": "ok", "timestamp": "..."}`
- Monitor database connectivity and API response times

## Support

For technical support and API documentation:
- Email: support@trustverify.io  
- Documentation: https://docs.trustverify.io
- Status Page: https://status.trustverify.io
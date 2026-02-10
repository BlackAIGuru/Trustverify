# TrustVerify - Secure Transaction Platform

## Overview

TrustVerify is a full-stack web application designed to facilitate secure, transparent transactions with integrated escrow services, KYC verification, and advanced scam prevention features. It acts as a trusted intermediary, ensuring safety for both buyers and sellers in online transactions. The platform's vision is to become a leading solution for secure digital commerce, building trust and mitigating fraud across various industries. It has pivoted from a B2B transaction platform to a B2C consumer fraud protection service, offering various subscription plans. The platform emphasizes end-to-end resolution, global fraud intelligence, and industry-specific APIs.

## User Preferences

Preferred communication style: Simple, everyday language.
Key USP messaging: "Global Transaction Security & Fraud Intelligence"
Target markets: UK-focused operations with comprehensive fraud protection for all payment methods, digital transactions, and emerging worldwide threats
Competitive positioning: Beyond detection to complete resolution vs. detection-only competitors
Industry expansion: Comprehensive crypto/blockchain protection addressing DeFi risks and Web3 fraud patterns
API scope: Industry-specific endpoints with tailored compliance and security features for crypto, fintech, e-commerce, and gaming sectors
Pricing preference: UK pricing as baseline in £ (GBP) with global currency conversion for all countries
Domain branding: Official domain trustverify.io with UK Newcastle headquarters location (15 Grey Street, Newcastle upon Tyne NE1 6EE)
Contact information: UK-only phone support (+44 20 7123 4567) and trustverify.io email addresses across all departments
Company founding: TrustVerify founded in 2025
Platform positioning: Newly launched platform with credible startup metrics rather than unrealistic enterprise figures

## System Architecture

### Frontend
- **Framework**: React 18 with TypeScript, Vite
- **UI/Styling**: Shadcn/ui (Radix UI primitives), Tailwind CSS with a custom design system
- **Routing**: Wouter
- **State Management**: TanStack Query
- **Form Handling**: React Hook Form with Zod validation
- **Design Philosophy**: USP-driven design with a new color palette (Deep Royal Blue #003366, Vibrant Teal #00C2A8, Alert Amber #FFB400, Primary Navy #0A3778, Secondary Teal #1DBF73). Professional spacing, Inter typography, trust-focused components, and glossy design elements with elevation animations. Logo branding uses Navy #0A3778 ("Trust") and Teal #1DBF73 ("Verify").

### Backend
- **Runtime**: Node.js with TypeScript, Express.js (REST API)
- **Authentication**: Passport.js with session-based auth (argon2 hashing), secure cookies, Connect-pg-simple for PostgreSQL session storage. Supports local username/password and OAuth 2.0 social login (Google, Facebook, GitHub, Apple).
- **Email Service**: SendGrid for transactional emails.
- **File Uploads**: Multer for document handling.
- **Security**: Comprehensive middleware including input sanitization, SQL injection/XSS protection, RBAC, audit logging, progressive rate limiting, and Helmet security headers.

### Database
- **Primary Database**: PostgreSQL (Neon serverless)
- **ORM**: Drizzle ORM
- **Schema Management**: Drizzle Kit for migrations
- **Connection**: @neondatabase/serverless with WebSocket support

### Core Features & Competitive Advantages
- **End-to-End Resolution**: 72-hour internal settlement process for dispute handling.
- **Global Fraud Intelligence**: Covers worldwide fraud patterns, all payment methods, digital transactions, social engineering, and emerging threats.
- **Public Trust Pages**: Verified businesses receive trust pages with gamified badges and reputation scoring.
- **2-Click Integration**: WordPress/Shopify plugins and simplified API setup.
- **Escrow + Payment Protection**: Direct payment partner integration to hold funds.
- **Authentication System**: Professional auth with multiple social logins (GitHub, Apple, Facebook, Google).
- **Transaction Management**: Multi-status escrow system with real-time messaging, dispute resolution.
- **KYC Verification System**: Document upload, multi-level verification, admin review, trust score calculation.
- **Industry-Specific APIs**: Tailored APIs for Crypto & Blockchain, Fintech & Banking, E-commerce & Marketplaces, iGaming (with scoped permissions and rate limits).
- **Legal & Compliance**: GDPR/CCPA compliant ToS and Privacy Policy, AI-flagged dispute resolution.
- **Crypto Protection Suite**: Wallet risk scoring, smart contract auditing, rug pull detection, P2P crypto escrow, AML/sanctions screening, cross-chain analysis, and insurance-backed protection.
- **Interactive Live Demo**: Real-time demonstration of fraud prevention and dispute resolution.
- **Consumer Fraud Protection**: Tiered subscription model (Free, Premium, Protect, Total) offering fraud checks, dark web monitoring, ID Vault, credit monitoring, and fraud insurance.
- **Navigation**: Streamlined navigation with a standalone `/menu` page, prominent branding, and a credentials banner (SOC 2 Certified, 256-bit Encryption, 99.99% Uptime).

## External Dependencies

- **@neondatabase/serverless**: PostgreSQL database connectivity.
- **drizzle-orm**: Type-safe database operations.
- **@tanstack/react-query**: Server state management.
- **@radix-ui/***: Accessible UI components.
- **tailwindcss**: Utility-first CSS framework.
- **passport**: Authentication middleware.
- **express-session**: Session management.
- **connect-pg-simple**: PostgreSQL session store.
- **crypto**: Password hashing and token generation.
- **@sendgrid/mail**: Email delivery service.
- **multer**: File upload handling.
- **@stripe/stripe-js**: Payment processing integration.

## Recent Platform Updates

### Enhanced Brand Visibility & Color System (Oct 11, 2025)
- **Logo Updates (Latest)**: 
  - Replaced with new TrustVerify Logo Design (shield icon with blue-to-green gradient text)
  - Clean PNG format with transparent background
  - Positioned on left side of navigation header
  - Simplified sizes: sm: h-12, md: h-14, lg: h-16, xl: h-20
  - Removed all blend modes and filters for clean, crisp display
- **Previous Logo Evolution**:
  - Phase 1: Increased sizes (sm: h-12, md: h-16, lg: h-20, xl: h-28)
  - Phase 2: Further increases (sm: h-16, md: h-20, lg: h-28, xl: h-36)
  - Fixed white background issues with darken blend mode
- **Navigation Updates**: 
  - Navigation height at h-24 for optimal logo display
  - Logo uses xl size for prominent brand presence
- **Teal/Green Color Integration**: Extensive teal (#1DBF73) and navy (#0A3778) color mix:
  - Navigation active states with teal gradients and shadow effects
  - Hero CTA buttons with teal-to-navy gradients and teal shadow glows
  - Stats cards with teal icons and gradient backgrounds
  - Feature cards with teal border accents and hover effects
  - Trust indicators with teal/navy gradient backgrounds

### TrustScore Intelligence Demo (Oct 11, 2025)
- **New Feature Page**: Comprehensive TrustScore demo at `/trustscore-demo`
- **Live Scenario Demonstrations**:
  - Excellent (94 score): Fully verified, low risk business
  - Good (76 score): Standard verification, safe to transact  
  - Medium (58 score): Requires caution, use escrow
  - Critical (32 score): High fraud risk, multiple red flags
- **Trust Factor Analysis**: Real-time display of:
  - KYB verification status
  - Security certificates and ratings
  - Transaction history verification
  - User review scores
  - Payment security compliance (PCI DSS)
  - Fraud incident tracking
- **Educational Content**: "How It Works" section explaining:
  - Real-time analysis of 50+ data points
  - AI-powered risk assessment algorithms
  - Trust verification and badge system
- **Interactive Features**:
  - Live TrustScoreWidget preview with multiple sizes
  - Custom domain analysis tool
  - Embeddable widget code generation
- **Menu Integration**: Added as first item in "Fraud Check Demos" section for easy access

### Pre-Launch Metrics Cleanup (Oct 11, 2025)
- Removed all unrealistic user counts (2.3M+, 1.8M+, 890K+, 1.2M+ users)
- Replaced specific accuracy percentages (96%, 99.8%) with qualitative descriptions
- Removed unrealistic technical specs (10M+ TPS, 500,000+ API calls)
- Updated all "thousands of businesses/customers" claims to "next generation" messaging
- Industries now show "Coming Soon" instead of fake user counts

### OAuth Social Login Integration (Oct 11, 2025)
- **Providers Enabled**: Google, Facebook, GitHub, and Apple authentication fully integrated
- **Database Schema**: Added provider ID fields (googleId, facebookId, githubId, appleId) to users table
- **Implementation Files**:
  - `server/google-auth.ts`: Google OAuth 2.0 strategy
  - `server/facebook-auth.ts`: Facebook OAuth strategy
  - `server/github-auth.ts`: GitHub OAuth strategy
  - `server/apple-auth.ts`: Apple Sign In strategy
- **Authentication Flow**: Each provider checks for existing users by email, creates new users if needed, and automatically verifies accounts
- **Routes Available**:
  - Google: `/auth/google` → `/auth/google/callback`
  - Facebook: `/auth/facebook` → `/auth/facebook/callback`
  - GitHub: `/auth/github` → `/auth/github/callback`
  - Apple: `/auth/apple` → `/auth/apple/callback` (POST)
- **Configuration**: To enable each provider, set the required environment variables (see OAuth Setup Guide below)

## OAuth Setup Guide

To enable social login providers, configure the following environment variables as secrets:

### Google OAuth
1. Create OAuth credentials at Google Cloud Console
2. Set environment variables:
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
3. Configure authorized redirect URI: `https://yourdomain.com/auth/google/callback`

### Facebook OAuth
1. Create an app at Facebook for Developers
2. Set environment variables:
   - `FACEBOOK_APP_ID`: Your Facebook app ID
   - `FACEBOOK_APP_SECRET`: Your Facebook app secret
3. Configure redirect URI: `https://yourdomain.com/auth/facebook/callback`

### GitHub OAuth
1. Register OAuth app at GitHub Developer Settings
2. Set environment variables:
   - `GITHUB_CLIENT_ID`: Your GitHub OAuth client ID
   - `GITHUB_CLIENT_SECRET`: Your GitHub OAuth client secret
3. Configure callback URL: `https://yourdomain.com/auth/github/callback`

### Apple Sign In
1. Configure Sign in with Apple at Apple Developer
2. Set environment variables:
   - `APPLE_CLIENT_ID`: Your Apple service ID
   - `APPLE_TEAM_ID`: Your Apple team ID
   - `APPLE_KEY_ID`: Your Apple key ID
   - `APPLE_PRIVATE_KEY`: Your Apple private key (entire key content)
3. Configure return URL: `https://yourdomain.com/auth/apple/callback`

**Note**: OAuth providers are automatically enabled when their credentials are configured. If credentials are missing, the provider will be skipped gracefully.
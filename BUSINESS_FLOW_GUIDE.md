# TrustVerify Business Transaction Flow Guide

## Overview

The Business Transaction Flow demonstrates TrustVerify's complete end-to-end transaction lifecycle including KYC, KYB, AML checks, escrow management, and dispute resolution.

## Two Versions Available

### 1. **Demo Version (Visual Simulation)**
- **Access:** `/business-flow` or `/dashboard/business-flow`
- **Purpose:** Educational demonstration showing the complete flow
- **How it works:** 
  - Click "Start Business Flow Demo" button
  - Watch automated simulation of all 9 transaction stages
  - No real transaction is created
  - No backend integration required
  - Perfect for presentations, training, and understanding the process

### 2. **Real Implementation (Production)**
- **Access:** When users create actual transactions via `/transactions/new`
- **How it works:** Integrated with your backend transaction system
- **Flow Trigger:** Automatically starts when a real transaction is created

## How The Real Flow Works

### Step 1: Transaction Creation (Frontend)
```
User creates transaction at: /transactions/new
↓
Backend creates transaction with status: 'pending'
↓
Transaction ID returned to user
```

### Step 2: Automatic Flow Progression (Backend)

The backend automatically handles the progression through verification stages:

1. **KYC Verification** (`kyc_required`)
   - Route: `POST /api/kyc/submit`
   - User uploads identity documents
   - System verifies identity
   - On approval → moves to `kyb_required`

2. **KYB Verification** (`kyb_required`) 
   - Route: `POST /api/kyb/submit`
   - Business documents verified
   - Company registration checked
   - On approval → moves to `aml_check`

3. **AML Check** (`aml_check`)
   - Route: `POST /api/aml/check`
   - Sanctions screening
   - Risk scoring
   - On clear → moves to `verification_approved`

4. **Verification Approved** (`verification_approved`)
   - All checks passed
   - Ready for escrow deposit

5. **Escrow Deposit** (`escrow`)
   - Stripe integration holds funds
   - Money secured in escrow
   - Moves to `active`

6. **Service Delivery** (`active`)
   - Seller delivers product/service
   - Buyer confirms receipt
   - Moves to `service_delivery`

7. **Buffer Period** (`buffer_period`)
   - 72-hour dispute window
   - Buyer can raise disputes
   - If no disputes → moves to `completed`

8. **Fund Release** (`completed`)
   - Money released to seller
   - Transaction finalized

### Step 3: Dispute Handling (If Needed)

If disputes arise during buffer period:
- Status changes to `disputed`
- TrustVerify Resolution (0-72 hours)
- If unresolved → Independent Arbitration
- Final decision: `arbitration_seller_wins` or `arbitration_buyer_wins`

## Backend Routes (Already Implemented)

### KYB Routes
- `POST /api/kyb/submit` - Submit business verification
- `GET /api/kyb/:transactionId` - Get KYB status

### AML Routes
- `POST /api/aml/check` - Initiate AML check
- `GET /api/aml/transaction/:transactionId` - Get AML results
- `GET /api/aml/user/:userId` - Get user's AML checks

### Transaction Routes
- `POST /api/transactions` - Create new transaction
- `GET /api/transactions/:id` - Get transaction details
- `PATCH /api/transactions/:id/status` - Update transaction status

## Integration Options

### Option 1: Manual Integration (Current)
Users manually trigger each verification step:
1. Create transaction
2. Upload KYC documents
3. Submit KYB verification  
4. Wait for AML check
5. Deposit to escrow
6. Confirm delivery
7. Release funds

### Option 2: Automated Integration (Recommended)
Backend automatically progresses transaction:
1. User creates transaction
2. System automatically:
   - Requests KYC if not verified
   - Runs KYB for business transactions
   - Triggers AML check
   - Initiates escrow deposit
   - Manages buffer period
   - Releases funds

### Option 3: API Integration (For Developers)
External systems can integrate via API:
```bash
# Create transaction
POST /api/transactions
{
  "amount": 5000.00,
  "currency": "GBP",
  "buyerId": 123,
  "sellerId": 456,
  "description": "Service payment"
}

# System automatically handles verification flow
# Monitor status via webhooks or polling:
GET /api/transactions/{id}
```

## Key Features

### Verification Tracking
Each transaction tracks:
- `kycVerified`: boolean
- `kybVerified`: boolean  
- `amlCheckStatus`: 'pending' | 'clear' | 'flagged'
- `escrowStatus`: 'pending' | 'deposited' | 'released'
- `bufferPeriodStatus`: 'active' | 'completed'

### Dispute Resolution
- **TrustVerify Resolution** (0-72 hours)
  - AI-powered fraud detection
  - Evidence collection
  - Fund hold/release decision
  - 94% resolution success rate

- **Independent Arbitration** (72+ hours)
  - Third-party arbitration service
  - Legally binding decisions
  - Final dispute resolution
  - Average 5-7 days

## Testing the Flow

### Demo Flow (No Backend Required)
1. Visit `/business-flow`
2. Click "Start Business Flow Demo"
3. Watch the simulation

### Real Flow (Backend Integration)
1. Create a transaction at `/transactions/new`
2. Follow the verification steps
3. Monitor transaction status
4. Complete the flow

## Menu Access

Navigate to `/menu` and find:
- **Business Transaction Flow** section (blue)
  - Live Flow Demo
  - Authenticated Flow
  - Create Transaction

## Technical Stack

- **Frontend:** React + TypeScript + Wouter
- **Backend:** Express.js with PostgreSQL
- **Database:** Drizzle ORM
- **Payments:** Stripe (escrow integration)
- **Verification:** KYC/KYB/AML APIs (ready for integration)

## Next Steps

1. **For Demo/Presentation:**
   - Use `/business-flow` to show the process
   
2. **For Real Transactions:**
   - Create transactions via `/transactions/new`
   - Implement KYC/KYB/AML verification UI
   - Connect Stripe for escrow
   
3. **For API Integration:**
   - Use transaction API endpoints
   - Set up webhooks for status updates
   - Implement automated flow progression

## Support

For questions or integration assistance:
- Visit `/support-center`
- Email: support@trustverify.io
- Phone: +44 20 7123 4567

# TrustVerify API Documentation

## Overview
The TrustVerify API provides comprehensive fraud prevention and secure transaction capabilities through RESTful endpoints. All API calls require authentication and are rate-limited for security.

## Base URL
```
Production: https://your-domain.com/api
Development: http://localhost:5000/api
```

## Authentication

### Session-Based Authentication
Most web application endpoints use session-based authentication with secure HTTP-only cookies.

```javascript
// Login request
POST /api/auth/login
{
  "username": "user@example.com",
  "password": "secure_password"
}

// Response
{
  "success": true,
  "user": {
    "id": "123",
    "email": "user@example.com",
    "role": "user",
    "verificationLevel": "basic"
  }
}
```

### API Key Authentication
For developer integrations, use API keys in the Authorization header:

```bash
curl -H "Authorization: Bearer your-api-key" \
     -H "Content-Type: application/json" \
     https://api.trustverify.com/api/transactions
```

## Core Endpoints

### 🔐 Authentication

#### POST /api/auth/login
User authentication with email and password.

**Request:**
```json
{
  "username": "user@example.com",
  "password": "secure_password"
}
```

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "123",
    "email": "user@example.com",
    "role": "user",
    "verificationLevel": "basic",
    "trustScore": 750
  }
}
```

#### POST /api/auth/register
Create new user account.

**Request:**
```json
{
  "username": "newuser@example.com",
  "password": "SecurePassword123!",
  "firstName": "John",
  "lastName": "Doe"
}
```

#### POST /api/auth/logout
End user session.

#### POST /api/auth/password-reset
Initiate password reset flow.

### 💰 Transactions

#### GET /api/transactions
List user transactions with filtering and pagination.

**Query Parameters:**
- `status`: pending, completed, disputed, cancelled
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20)
- `type`: buyer, seller

**Response:**
```json
{
  "transactions": [
    {
      "id": "tx_123",
      "title": "Website Development",
      "amount": 2500.00,
      "currency": "USD",
      "status": "pending",
      "buyer": {
        "id": "user_456",
        "email": "buyer@example.com",
        "trustScore": 820
      },
      "seller": {
        "id": "user_789",
        "email": "seller@example.com",
        "trustScore": 950
      },
      "createdAt": "2025-01-15T10:30:00Z",
      "escrowReleaseDate": "2025-01-22T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 45,
    "totalPages": 3
  }
}
```

#### POST /api/transactions
Create new transaction.

**Request:**
```json
{
  "title": "Logo Design Project",
  "description": "Professional logo design for tech startup",
  "amount": 500.00,
  "currency": "USD",
  "sellerEmail": "designer@example.com",
  "milestones": [
    {
      "title": "Initial Concepts",
      "amount": 200.00,
      "dueDate": "2025-01-20"
    },
    {
      "title": "Final Design",
      "amount": 300.00,
      "dueDate": "2025-01-25"
    }
  ],
  "terms": "Delivery within 10 business days"
}
```

#### GET /api/transactions/:id
Get specific transaction details.

#### PUT /api/transactions/:id/accept
Accept transaction (buyer action).

#### PUT /api/transactions/:id/deliver
Mark transaction as delivered (seller action).

#### PUT /api/transactions/:id/complete
Complete transaction and release escrow (buyer action).

#### POST /api/transactions/:id/dispute
Initiate dispute resolution.

### 🛡️ Fraud Detection

#### POST /api/fraud/check
Perform fraud risk assessment.

**Request:**
```json
{
  "transactionAmount": 1000.00,
  "counterpartyEmail": "unknown@example.com",
  "description": "Cryptocurrency investment opportunity",
  "metadata": {
    "ipAddress": "192.168.1.1",
    "userAgent": "Mozilla/5.0...",
    "deviceFingerprint": "abc123..."
  }
}
```

**Response:**
```json
{
  "riskScore": 85,
  "riskLevel": "high",
  "flags": [
    {
      "type": "suspicious_keywords",
      "severity": "medium",
      "description": "Description contains high-risk terms"
    },
    {
      "type": "new_counterparty",
      "severity": "low",
      "description": "First interaction with this email"
    }
  ],
  "recommendations": [
    "Require additional identity verification",
    "Consider smaller initial transaction amount",
    "Enable enhanced monitoring"
  ]
}
```

### 🔍 Identity Verification

#### POST /api/kyc/upload-documents
Upload identity verification documents.

**Request (multipart/form-data):**
```
document_front: [File] - Front of ID document
document_back: [File] - Back of ID document (optional)
proof_of_address: [File] - Utility bill or bank statement
document_type: "passport" | "drivers_license" | "national_id"
```

**Response:**
```json
{
  "verificationId": "kyc_789",
  "status": "pending_review",
  "estimatedProcessingTime": "2-4 business days",
  "documentsReceived": [
    {
      "type": "document_front",
      "filename": "passport_front.jpg",
      "status": "uploaded"
    }
  ]
}
```

#### GET /api/kyc/status
Get verification status.

**Response:**
```json
{
  "verificationLevel": "basic",
  "status": "verified",
  "verifiedAt": "2025-01-10T15:30:00Z",
  "documentsVerified": ["identity", "address"],
  "trustScore": 850,
  "limits": {
    "transactionLimit": 10000.00,
    "monthlyLimit": 50000.00
  }
}
```

### 🚨 Scam Reports

#### POST /api/reports/scam
Report fraudulent user or transaction.

**Request:**
```json
{
  "reportedEmail": "scammer@example.com",
  "reportType": "fraud_attempt",
  "description": "User attempted to request payment outside of escrow",
  "evidence": {
    "screenshots": ["evidence1.png", "evidence2.png"],
    "communications": "Email conversation showing fraud attempt",
    "transactionId": "tx_456"
  },
  "severity": "high"
}
```

#### GET /api/reports
List scam reports (admin only).

### 👨‍💻 Developer API

#### POST /api/developer/keys
Generate new API key.

**Request:**
```json
{
  "name": "Production Integration",
  "permissions": ["read_transactions", "create_transactions"],
  "rateLimit": 1000,
  "ipWhitelist": ["192.168.1.100", "10.0.0.50"]
}
```

**Response:**
```json
{
  "keyId": "key_123",
  "apiKey": "sk_live_abcdef123456...",
  "name": "Production Integration",
  "permissions": ["read_transactions", "create_transactions"],
  "createdAt": "2025-01-15T10:00:00Z",
  "lastUsed": null,
  "usageCount": 0
}
```

#### GET /api/developer/usage
Get API usage statistics.

**Response:**
```json
{
  "currentPeriod": {
    "requests": 2500,
    "limit": 10000,
    "resetDate": "2025-02-01T00:00:00Z"
  },
  "endpoints": [
    {
      "path": "/api/transactions",
      "method": "GET",
      "count": 1200,
      "avgResponseTime": 150
    }
  ]
}
```

## Webhooks

### Configuration
Configure webhook endpoints to receive real-time notifications:

```json
{
  "url": "https://yoursite.com/webhooks/trustverify",
  "events": ["transaction.completed", "dispute.created"],
  "secret": "whsec_abc123..."
}
```

### Event Types
- `transaction.created`
- `transaction.accepted`
- `transaction.completed`
- `transaction.disputed`
- `verification.completed`
- `fraud.detected`

### Webhook Payload
```json
{
  "id": "evt_123",
  "type": "transaction.completed",
  "data": {
    "object": {
      "id": "tx_456",
      "amount": 1000.00,
      "status": "completed"
    }
  },
  "created": "2025-01-15T12:00:00Z"
}
```

## Rate Limits

### Standard Limits
- **Authentication endpoints**: 5 requests per minute
- **General API**: 100 requests per 15 minutes
- **Developer API**: Based on subscription plan

### Rate Limit Headers
```
X-RateLimit-Limit: 100
X-RateLimit-Remaining: 95
X-RateLimit-Reset: 1642678800
```

### Exceeding Limits
```json
{
  "error": "rate_limit_exceeded",
  "message": "Too many requests. Limit: 100 per 15 minutes",
  "retryAfter": 900
}
```

## Error Handling

### Standard Error Response
```json
{
  "error": "validation_error",
  "message": "Invalid request parameters",
  "details": [
    {
      "field": "amount",
      "message": "Amount must be greater than 0"
    }
  ],
  "requestId": "req_123456"
}
```

### Common Error Codes
- `400`: Bad Request - Invalid parameters
- `401`: Unauthorized - Authentication required
- `403`: Forbidden - Insufficient permissions
- `404`: Not Found - Resource not found
- `409`: Conflict - Resource conflict
- `429`: Too Many Requests - Rate limit exceeded
- `500`: Internal Server Error

## SDKs and Libraries

### Node.js SDK
```bash
npm install @trustverify/sdk
```

```javascript
const TrustVerify = require('@trustverify/sdk');

const client = new TrustVerify({
  apiKey: 'your-api-key',
  environment: 'production' // or 'sandbox'
});

// Create transaction
const transaction = await client.transactions.create({
  amount: 500.00,
  sellerEmail: 'seller@example.com',
  title: 'Web Development'
});
```

### Python SDK
```bash
pip install trustverify
```

```python
import trustverify

client = trustverify.Client(api_key='your-api-key')

# Check fraud risk
risk_assessment = client.fraud.check(
    amount=1000.00,
    counterparty_email='user@example.com'
)
```

### PHP SDK
```bash
composer require trustverify/sdk
```

```php
use TrustVerify\Client;

$client = new Client(['api_key' => 'your-api-key']);

// Get transactions
$transactions = $client->transactions()->list([
    'status' => 'pending',
    'limit' => 10
]);
```

## Testing

### Sandbox Environment
Use sandbox API keys for testing:
```
Base URL: https://api-sandbox.trustverify.com
API Key: sk_test_...
```

### Test Data
Predefined test scenarios available in sandbox:
- `test-fraud@example.com` - Triggers high fraud score
- `test-verified@example.com` - Pre-verified user
- `test-dispute@example.com` - Triggers dispute scenario

### Webhook Testing
Use tools like ngrok for local webhook testing:
```bash
ngrok http 3000
# Use the provided URL as webhook endpoint
```

## Support

### Documentation
- Full API reference: https://docs.trustverify.com
- Integration guides: https://docs.trustverify.com/guides
- Code examples: https://github.com/trustverify/examples

### Support Channels
- Email: developers@trustverify.com
- Slack Community: https://trustverify-dev.slack.com
- GitHub Issues: https://github.com/trustverify/sdk/issues

### Status Page
Monitor API status: https://status.trustverify.com
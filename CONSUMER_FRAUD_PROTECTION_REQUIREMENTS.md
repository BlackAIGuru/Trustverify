# TrustVerify Consumer Fraud Protection - Functional Requirements

## 1. Functional Requirements

### 1.1 Fraud Prevention
**FR-1**: The system **must** allow users to input emails, phone numbers, website URLs, or company names for fraud risk checking.
**FR-2**: The fraud checker **must** cross-reference internal fraud database, partner databases, and third-party APIs.
**FR-3**: The system **must** provide an instant risk score (0–100) and a risk label (Safe, Suspicious, High Risk).
**FR-4**: The platform **must** support a browser extension that warns users when visiting suspicious websites.
**FR-5**: The system **must** allow users to forward scam messages (email, SMS, WhatsApp) to a unique TrustVerify "ScamCheck" inbox.

### 1.2 Fraud Detection & Monitoring
**FR-6**: The system **must** monitor the dark web for user credentials (emails, phone numbers, card numbers, NI numbers).
**FR-7**: The system **must** integrate with UK credit bureau APIs (Experian, Equifax, TransUnion) to detect suspicious identity usage.
**FR-8**: The system **must** support Open Banking API integration for suspicious transaction alerts.
**FR-9**: The system **must** notify users via email, SMS, and in-app push notifications when fraud risk is detected.

### 1.3 Recovery & Support
**FR-10**: The system **must** provide a 24/7 fraud resolution helpline (via partner integration).
**FR-11**: The platform **must** generate pre-filled dispute/chargeback letters for victims of fraud.
**FR-12**: Users **must** be able to purchase cyber-fraud insurance directly through the platform.

### 1.4 Education & Awareness
**FR-13**: The system **must** host a Fraud Awareness Hub with weekly scam alerts and guides.
**FR-14**: The system **must** provide gamified training modules ("spot the scam") with points and badges.
**FR-15**: The system **must** update scam databases weekly with verified new scam patterns.

### 1.5 Trust & Safety
**FR-16**: The system **must** generate a personal fraud risk score for each registered consumer based on exposure to risks.
**FR-17**: The system **must** allow users to store and share personal documents securely in a "Verified ID Vault."
**FR-18**: The ID Vault **must** issue one-time secure links when users share documents with third parties.

## 2. Non-Functional Requirements

**NFR-1 (Scalability)**: The platform **must** support up to 1 million concurrent consumer fraud checks without degradation.

**NFR-2 (Performance)**: Fraud risk queries **must** return results within ≤3 seconds.

**NFR-3 (Security)**:
- All sensitive data **must** be encrypted in transit (TLS 1.3) and at rest (AES-256).
- Dark web monitoring results **must not** expose full leaked data, only indicators.

**NFR-4 (Availability)**: Platform uptime **must** be ≥99.9%.

**NFR-5 (Compliance)**: The system **must** comply with GDPR, UK Data Protection Act 2018, FCA guidance on fraud prevention, and ISO 27001 standards.

**NFR-6 (Privacy)**: Users **must** explicitly opt-in for monitoring services (dark web, credit bureau, open banking).

**NFR-7 (Usability)**: All features **must** be accessible via mobile, web, and browser extension, with a simplified UX for non-tech users.

## 3. Business Logic & Rules

### Fraud Checker
**Rule-1**: A fraud score **must** be generated using a weighted formula:
- Database matches (40%)
- Behavioural analysis (20%)
- Reputation reports (20%)
- Real-time anomaly detection (20%)

**Rule-2**: Scores **must** be bucketed:
- 0–30 = Safe
- 31–60 = Suspicious
- 61–100 = High Risk

### Dark Web Monitoring
**Rule-3**: When leaks are detected, the user **must** receive a masked alert (e.g. jo****@gmail.com found on dark web forum).
**Rule-4**: Alerts **must** include recommended actions (password reset, bank alert, insurance claim).

### Credit & Identity Monitoring
**Rule-5**: If an identity check is triggered, the user **must** be notified within 1 hour.
**Rule-6**: Fraudulent activity **must** be escalated to the fraud resolution concierge automatically.

### Fraud Resolution
**Rule-7**: Only Premium & Total plan users **must** have access to 24/7 concierge support.
**Rule-8**: Standard users **must** be able to download self-service dispute templates.

### Insurance Add-On
**Rule-9**: TrustVerify **must** earn 15–25% referral commission for every fraud insurance policy sold.
**Rule-10**: Insurance claims **must** be routed directly to partner insurer APIs for processing.

### Personal Fraud Score
**Rule-11**: Score **must** be recalculated monthly based on:
- Exposure in dark web leaks
- Number of suspicious checks run
- Fraud alerts from credit bureau or bank feeds

**Rule-12**: Scores below 40 **must** be considered "Low Risk," 41–70 "Medium Risk," and 71–100 "High Risk."

### ID Vault
**Rule-13**: Documents **must** be stored encrypted and accessible only with biometric authentication or multi-factor authentication.
**Rule-14**: Shared links **must** expire within 24 hours and can only be opened once unless renewed.

## 4. Pricing Model

### Free (Basic) - £0/month
- **Cost to TrustVerify**: ~£0.10–£0.30/user/month
- **Target**: Mass adoption & lead generation
- **Features**: 2 fraud checks/month, basic scam alerts, Fraud Awareness Hub access

### Premium - £9.99/month  
- **Cost to TrustVerify**: ~£3–£4/user/month
- **Margin**: £5.99–£6.99 (healthy margin)
- **Features**: Unlimited fraud checks, dark web monitoring, scam message analysis, basic ID Vault

### Protect - £14.99/month
- **Cost to TrustVerify**: ~£6–£7/user/month  
- **Margin**: £7.99–£8.99
- **Features**: Everything in Premium + credit monitoring, advanced ID Vault, priority support

### Total - £19.99/month
- **Cost to TrustVerify**: ~£10–£12/user/month
- **Margin**: £7.99–£9.99
- **Features**: Everything in Protect + fraud insurance (£1,000–£5,000), 24/7 concierge, family coverage (3 members)

## 5. Implementation Priority

**Phase 1 (MVP)**: Basic fraud checker, free plan with 2 checks, browser extension warnings
**Phase 2**: Dark web monitoring, Premium plan features, ID Vault basic
**Phase 3**: Credit bureau integration, Protect plan features, dispute templates  
**Phase 4**: Insurance integration, Total plan features, 24/7 concierge, family coverage

## 6. Success Metrics

- **Free Plan Conversion**: Target 15-25% conversion from free to paid plans
- **Customer Acquisition Cost**: Keep below £25 per customer for sustainable growth
- **Revenue Per User**: Target £12-15 average monthly revenue per user
- **Fraud Detection Accuracy**: Maintain >95% accuracy rate for fraud risk scoring
- **Customer Satisfaction**: Target >4.5/5 satisfaction rating for support services
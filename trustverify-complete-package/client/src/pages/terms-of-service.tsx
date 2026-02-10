import { Navigation } from "@/components/navigation";

export default function TermsOfService() {
  console.log("Terms of Service component rendered");
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms of Service</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-6">
              <strong>Last Updated:</strong> January 8, 2025<br />
              <strong>Effective Date:</strong> January 8, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 mb-4">
                By accessing or using TrustVerify ("Service", "Platform"), operated by TrustVerify Inc. ("Company", "we", "us"), 
                you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, 
                you may not access or use our Service.
              </p>
              <p className="text-gray-700">
                These Terms constitute a legally binding agreement between you and TrustVerify Inc. 
                Your use of the Service confirms your acceptance of these Terms and our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 mb-4">
                TrustVerify provides a fraud prevention and secure transaction platform that includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Escrow services for secure fund holding and release</li>
                <li>Identity verification and KYC/AML compliance tools</li>
                <li>AI-powered fraud detection and risk assessment</li>
                <li>Dispute resolution and arbitration services</li>
                <li>Transaction monitoring and reporting</li>
                <li>Developer API access for third-party integrations</li>
              </ul>
              <p className="text-gray-700">
                The Service is provided on an "as-is" basis and we reserve the right to modify, 
                suspend, or discontinue any aspect of the Service at any time.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Escrow Services and Transaction Processing</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Escrow Process</h3>
              <p className="text-gray-700 mb-4">
                Our escrow service holds funds in trust during transactions. Key features include:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Buffer Period:</strong> Funds are held for 24-72 hours after seller completion to allow dispute filing</li>
                <li><strong>Dispute Window:</strong> Buyers have 3 business days from transaction completion to raise disputes</li>
                <li><strong>Smart Release:</strong> Automated fund release based on transaction completion and dispute status</li>
                <li><strong>Tiered Processing:</strong> Trusted sellers may receive expedited fund release based on reputation scores</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Dispute Resolution</h3>
              <p className="text-gray-700 mb-4">
                Our dispute resolution process includes:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>AI-powered dispute flagging and categorization</li>
                <li>Independent review by certified dispute resolution specialists</li>
                <li>Evidence submission and review periods</li>
                <li>Binding arbitration decisions</li>
                <li>Escalation to third-party arbitration services when necessary</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Sanctions and Account Actions</h3>
              <p className="text-gray-700 mb-4">
                Accounts with multiple valid disputes or fraudulent activity may face:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Temporary or permanent account suspension</li>
                <li>Trust score reduction</li>
                <li>Extended fund holding periods</li>
                <li>Requirement for additional verification</li>
                <li>Termination of Service access</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Accounts and Responsibilities</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Account Registration</h3>
              <p className="text-gray-700 mb-4">
                To use our Service, you must:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and update your account information</li>
                <li>Complete identity verification as required</li>
                <li>Comply with KYC/AML requirements</li>
                <li>Be at least 18 years of age or the age of majority in your jurisdiction</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Account Security</h3>
              <p className="text-gray-700 mb-4">
                You are responsible for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Maintaining the confidentiality of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Immediately notifying us of unauthorized access</li>
                <li>Using strong passwords and enabling two-factor authentication</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Prohibited Activities</h3>
              <p className="text-gray-700 mb-4">
                You agree not to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Use the Service for illegal, fraudulent, or unauthorized purposes</li>
                <li>Manipulate or circumvent fraud detection systems</li>
                <li>Create multiple accounts to evade restrictions</li>
                <li>Engage in money laundering or terrorist financing</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Interfere with or disrupt the Service</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Fees and Payment Terms</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Service Fees</h3>
              <p className="text-gray-700 mb-4">
                TrustVerify charges fees for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Transaction processing (percentage-based)</li>
                <li>Dispute resolution services</li>
                <li>Premium verification services</li>
                <li>API usage (based on volume)</li>
                <li>Express processing services</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Fee Changes</h3>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify our fee structure with 30 days' written notice. 
                Continued use of the Service after fee changes constitutes acceptance of new fees.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Refunds</h3>
              <p className="text-gray-700 mb-4">
                Service fees are generally non-refundable except in cases of proven Service error 
                or as required by applicable law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Privacy and Data Protection</h2>
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Our collection, use, and protection of your personal 
                information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
              </p>
              <p className="text-gray-700 mb-4">
                By using our Service, you consent to the collection, use, and sharing of your information 
                as described in our Privacy Policy and as necessary to provide our fraud prevention 
                and escrow services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Intellectual Property Rights</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">7.1 TrustVerify Property</h3>
              <p className="text-gray-700 mb-4">
                The Service, including all content, features, and functionality, is owned by TrustVerify Inc. 
                and is protected by copyright, trademark, and other intellectual property laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">7.2 User Content</h3>
              <p className="text-gray-700 mb-4">
                You retain ownership of content you submit but grant us a worldwide, royalty-free license 
                to use, process, and analyze such content to provide and improve our Service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Limitation of Liability</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">8.1 Service Availability</h3>
              <p className="text-gray-700 mb-4">
                We strive for high availability but do not guarantee uninterrupted Service. 
                We are not liable for Service interruptions, including scheduled maintenance or technical issues.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">8.2 Transaction Disputes</h3>
              <p className="text-gray-700 mb-4">
                While we provide dispute resolution services, we are not liable for the underlying 
                transaction disputes between users. Our role is limited to facilitating resolution 
                according to our established procedures.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">8.3 Liability Cap</h3>
              <p className="text-gray-700 mb-4">
                To the maximum extent permitted by law, our total liability to you for any claims 
                arising from or related to the Service shall not exceed the amount of fees paid 
                by you to us in the 12 months preceding the claim.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Indemnification</h2>
              <p className="text-gray-700 mb-4">
                You agree to indemnify, defend, and hold harmless TrustVerify Inc., its officers, 
                directors, employees, and agents from any claims, damages, losses, or expenses 
                arising from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Your use of the Service</li>
                <li>Your violation of these Terms</li>
                <li>Your violation of any rights of third parties</li>
                <li>Your breach of any applicable laws or regulations</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Regulatory Compliance</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">10.1 AML/KYC Compliance</h3>
              <p className="text-gray-700 mb-4">
                We comply with anti-money laundering (AML) and know your customer (KYC) regulations. 
                You agree to provide required documentation and information for compliance purposes.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">10.2 Reporting Obligations</h3>
              <p className="text-gray-700 mb-4">
                We may be required to report certain transactions to regulatory authorities. 
                You consent to such reporting as required by applicable law.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Termination</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">11.1 Termination by You</h3>
              <p className="text-gray-700 mb-4">
                You may terminate your account at any time by following our account closure procedures. 
                Termination does not affect pending transactions or outstanding obligations.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">11.2 Termination by Us</h3>
              <p className="text-gray-700 mb-4">
                We may suspend or terminate your account immediately for:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Violation of these Terms</li>
                <li>Suspected fraudulent activity</li>
                <li>Regulatory requirements</li>
                <li>Non-payment of fees</li>
                <li>Inactivity for extended periods</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Dispute Resolution and Governing Law</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">12.1 Governing Law</h3>
              <p className="text-gray-700 mb-4">
                These Terms are governed by the laws of Delaware, United States, without regard 
                to conflict of law principles.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">12.2 Arbitration</h3>
              <p className="text-gray-700 mb-4">
                Any disputes arising from these Terms or the Service shall be resolved through 
                binding arbitration administered by the American Arbitration Association (AAA) 
                under its Commercial Arbitration Rules.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">12.3 Class Action Waiver</h3>
              <p className="text-gray-700 mb-4">
                You agree that any arbitration or court proceeding shall be limited to the dispute 
                between you and TrustVerify Inc. individually. You waive any right to participate 
                in class action lawsuits or class-wide arbitrations.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Force Majeure</h2>
              <p className="text-gray-700 mb-4">
                We shall not be liable for any failure or delay in performance due to circumstances 
                beyond our reasonable control, including but not limited to acts of God, natural disasters, 
                war, terrorism, pandemics, government actions, or technical failures of third-party systems.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Modifications to Terms</h2>
              <p className="text-gray-700 mb-4">
                We reserve the right to modify these Terms at any time. We will provide notice of 
                material changes by posting the updated Terms on our website and notifying users 
                via email or through the Service.
              </p>
              <p className="text-gray-700 mb-4">
                Your continued use of the Service after the effective date of modified Terms 
                constitutes acceptance of the changes.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Severability</h2>
              <p className="text-gray-700 mb-4">
                If any provision of these Terms is found to be unenforceable or invalid, 
                the remaining provisions shall remain in full force and effect.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about these Terms of Service, please contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>TrustVerify Inc.</strong><br />
                  Legal Department<br />
                  Email: legal@trustverify.com<br />
                  Address: 123 Security Boulevard, San Francisco, CA 94105<br />
                  Phone: +1 (555) 123-4567
                </p>
              </div>
            </section>

            <div className="mt-12 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                By using TrustVerify, you acknowledge that you have read, understood, and agree 
                to be bound by these Terms of Service and our Privacy Policy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
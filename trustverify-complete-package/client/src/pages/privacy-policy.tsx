import { Navigation } from "@/components/navigation";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
          
          <div className="prose prose-gray max-w-none">
            <p className="text-sm text-gray-600 mb-6">
              <strong>Last Updated:</strong> January 8, 2025<br />
              <strong>Effective Date:</strong> January 8, 2025
            </p>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Introduction</h2>
              <p className="text-gray-700 mb-4">
                TrustVerify Inc. ("TrustVerify," "we," "us," or "our") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information 
                when you use our fraud prevention and secure transaction platform ("Service").
              </p>
              <p className="text-gray-700">
                This Privacy Policy applies to all users of our Service, including individuals, businesses, 
                and developers using our API. By using TrustVerify, you consent to the data practices 
                described in this policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Information We Collect</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.1 Personal Information</h3>
              <p className="text-gray-700 mb-4">
                We collect personal information that you provide directly to us, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Identity Information:</strong> Full name, date of birth, government-issued ID numbers, passport information</li>
                <li><strong>Contact Information:</strong> Email address, phone number, mailing address</li>
                <li><strong>Financial Information:</strong> Bank account details, payment card information, transaction history</li>
                <li><strong>Business Information:</strong> Company name, business registration details, tax identification numbers</li>
                <li><strong>Verification Documents:</strong> Government IDs, utility bills, business licenses, proof of address</li>
                <li><strong>Biometric Data:</strong> Facial recognition data for identity verification (with your consent)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.2 Transaction Data</h3>
              <p className="text-gray-700 mb-4">
                When you use our escrow and transaction services, we collect:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Transaction amounts, dates, and descriptions</li>
                <li>Counterparty information and relationship details</li>
                <li>Communication records related to transactions</li>
                <li>Dispute information and resolution data</li>
                <li>Risk assessment and fraud detection data</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.3 Technical Information</h3>
              <p className="text-gray-700 mb-4">
                We automatically collect technical information, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>IP addresses and geolocation data</li>
                <li>Device information (type, operating system, browser)</li>
                <li>Usage patterns and interaction data</li>
                <li>Log files and error reports</li>
                <li>API usage and performance metrics</li>
                <li>Security event logs and fraud detection signals</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">2.4 Third-Party Information</h3>
              <p className="text-gray-700 mb-4">
                We may receive information about you from:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Identity verification services and databases</li>
                <li>Credit bureaus and financial institutions</li>
                <li>Government databases and sanctions lists</li>
                <li>Social media platforms (with your permission)</li>
                <li>Business partners and referral sources</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. How We Use Your Information</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.1 Service Provision</h3>
              <p className="text-gray-700 mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Process and facilitate secure transactions</li>
                <li>Provide escrow services and fund management</li>
                <li>Verify your identity and conduct KYC/AML checks</li>
                <li>Assess transaction risk and prevent fraud</li>
                <li>Resolve disputes and provide customer support</li>
                <li>Maintain accurate transaction records</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.2 Fraud Prevention and Security</h3>
              <p className="text-gray-700 mb-4">
                We use advanced analytics and machine learning to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Detect and prevent fraudulent activities</li>
                <li>Monitor suspicious transaction patterns</li>
                <li>Assess user trust scores and reputation</li>
                <li>Identify potential security threats</li>
                <li>Protect against money laundering and terrorist financing</li>
                <li>Comply with sanctions screening requirements</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.3 Legal Compliance</h3>
              <p className="text-gray-700 mb-4">
                We use your information to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Comply with applicable laws and regulations</li>
                <li>Respond to legal requests and court orders</li>
                <li>Report suspicious activities to authorities</li>
                <li>Maintain records as required by law</li>
                <li>Conduct internal compliance audits</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">3.4 Service Improvement</h3>
              <p className="text-gray-700 mb-4">
                We analyze aggregated and anonymized data to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Improve our fraud detection algorithms</li>
                <li>Enhance user experience and platform performance</li>
                <li>Develop new features and services</li>
                <li>Conduct research and analytics</li>
                <li>Generate industry insights and reports</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Information Sharing and Disclosure</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.1 Service Providers</h3>
              <p className="text-gray-700 mb-4">
                We share information with trusted third-party service providers who assist us in:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Identity verification and background checks</li>
                <li>Payment processing and banking services</li>
                <li>Cloud hosting and data storage</li>
                <li>Customer support and communication</li>
                <li>Legal and compliance services</li>
                <li>Security and fraud prevention</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.2 Legal Requirements</h3>
              <p className="text-gray-700 mb-4">
                We may disclose your information when required by law, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Responding to subpoenas, court orders, and legal process</li>
                <li>Reporting suspicious activities to FinCEN and other authorities</li>
                <li>Cooperating with law enforcement investigations</li>
                <li>Complying with tax reporting requirements</li>
                <li>Meeting regulatory examination requests</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.3 Business Transfers</h3>
              <p className="text-gray-700 mb-4">
                In the event of a merger, acquisition, or sale of assets, your information may be 
                transferred to the acquiring entity, subject to the same privacy protections.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">4.4 Fraud Prevention Networks</h3>
              <p className="text-gray-700 mb-4">
                We participate in fraud prevention networks and may share information about 
                fraudulent activities with other financial institutions and security services 
                to protect the broader financial ecosystem.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Data Security and Protection</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.1 Security Measures</h3>
              <p className="text-gray-700 mb-4">
                We implement industry-leading security measures, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>End-to-end encryption for data transmission and storage</li>
                <li>Multi-factor authentication and access controls</li>
                <li>Regular security audits and penetration testing</li>
                <li>SOC 2 Type II compliance and certification</li>
                <li>PCI DSS compliance for payment data</li>
                <li>24/7 security monitoring and incident response</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.2 Data Minimization</h3>
              <p className="text-gray-700 mb-4">
                We collect and retain only the information necessary to provide our services 
                and comply with legal obligations. We regularly review and purge unnecessary data.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">5.3 Employee Access</h3>
              <p className="text-gray-700 mb-4">
                Access to personal information is restricted to authorized employees who need 
                the information to perform their job functions. All employees undergo background 
                checks and privacy training.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Data Retention</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.1 Retention Periods</h3>
              <p className="text-gray-700 mb-4">
                We retain personal information for different periods based on the type of data and legal requirements:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Transaction Records:</strong> 7 years from transaction completion</li>
                <li><strong>Identity Verification:</strong> 5 years after account closure</li>
                <li><strong>Communication Records:</strong> 3 years from last contact</li>
                <li><strong>Fraud Investigation Data:</strong> 10 years or as required by law</li>
                <li><strong>Marketing Data:</strong> Until consent is withdrawn</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">6.2 Secure Deletion</h3>
              <p className="text-gray-700 mb-4">
                When retention periods expire, we securely delete or anonymize personal information 
                using industry-standard data destruction methods.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Your Privacy Rights</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">7.1 Access and Portability</h3>
              <p className="text-gray-700 mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Access your personal information we hold</li>
                <li>Request a copy of your data in a portable format</li>
                <li>Obtain information about how we use your data</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">7.2 Correction and Updates</h3>
              <p className="text-gray-700 mb-4">
                You may request correction of inaccurate or incomplete personal information. 
                You can update most information through your account settings.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">7.3 Deletion Rights</h3>
              <p className="text-gray-700 mb-4">
                You may request deletion of your personal information, subject to:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Legal retention requirements</li>
                <li>Ongoing transaction obligations</li>
                <li>Fraud prevention and security needs</li>
                <li>Legitimate business interests</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">7.4 Marketing Opt-Out</h3>
              <p className="text-gray-700 mb-4">
                You can opt out of marketing communications at any time by:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Clicking unsubscribe links in emails</li>
                <li>Updating your communication preferences</li>
                <li>Contacting our privacy team</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. International Data Transfers</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">8.1 Cross-Border Transfers</h3>
              <p className="text-gray-700 mb-4">
                TrustVerify operates globally and may transfer your personal information to countries 
                outside your residence jurisdiction. We ensure adequate protection through:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>EU-U.S. Data Privacy Framework participation</li>
                <li>Standard Contractual Clauses with service providers</li>
                <li>Adequacy decisions by relevant authorities</li>
                <li>Binding Corporate Rules for internal transfers</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">8.2 Data Localization</h3>
              <p className="text-gray-700 mb-4">
                Where required by local laws, we maintain data within specific jurisdictions 
                and comply with data localization requirements.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Children's Privacy</h2>
              <p className="text-gray-700 mb-4">
                TrustVerify does not knowingly collect personal information from children under 18 
                years of age. If we discover that we have collected information from a child, 
                we will promptly delete such information.
              </p>
              <p className="text-gray-700">
                Parents or guardians who believe their child has provided personal information 
                should contact us immediately.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Cookies and Tracking Technologies</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">10.1 Types of Cookies</h3>
              <p className="text-gray-700 mb-4">
                We use various types of cookies and similar technologies:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li><strong>Essential Cookies:</strong> Required for basic platform functionality</li>
                <li><strong>Security Cookies:</strong> Help detect fraud and abuse</li>
                <li><strong>Analytics Cookies:</strong> Help us understand usage patterns</li>
                <li><strong>Preference Cookies:</strong> Remember your settings and choices</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">10.2 Cookie Management</h3>
              <p className="text-gray-700 mb-4">
                You can control cookies through your browser settings, though disabling certain 
                cookies may affect platform functionality.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Third-Party Services</h2>
              <p className="text-gray-700 mb-4">
                Our platform may contain links to third-party websites or integrate with external services. 
                This Privacy Policy does not apply to third-party services, and we encourage you to 
                review their privacy policies.
              </p>
              <p className="text-gray-700">
                We are not responsible for the privacy practices or content of third-party services.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Privacy Policy Updates</h2>
              <p className="text-gray-700 mb-4">
                We may update this Privacy Policy periodically to reflect changes in our practices, 
                legal requirements, or service offerings. We will notify you of material changes by:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Posting the updated policy on our website</li>
                <li>Sending email notifications to registered users</li>
                <li>Displaying prominent notices on our platform</li>
              </ul>
              <p className="text-gray-700">
                Your continued use of TrustVerify after the effective date constitutes acceptance of the updated policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Contact Information</h2>
              <p className="text-gray-700 mb-4">
                For questions about this Privacy Policy or to exercise your privacy rights, contact us at:
              </p>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-700">
                  <strong>TrustVerify Inc. - Privacy Team</strong><br />
                  Email: privacy@trustverify.com<br />
                  Address: 123 Security Boulevard, San Francisco, CA 94105<br />
                  Phone: +1 (555) 123-4567<br />
                  Privacy Portal: https://trustverify.com/privacy-portal
                </p>
              </div>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Regional Privacy Rights</h2>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-3">14.1 California Residents (CCPA)</h3>
              <p className="text-gray-700 mb-4">
                California residents have additional rights under the California Consumer Privacy Act, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Right to know what personal information is collected and how it's used</li>
                <li>Right to delete personal information (subject to exceptions)</li>
                <li>Right to opt-out of the sale of personal information</li>
                <li>Right to non-discrimination for exercising privacy rights</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 mb-3">14.2 European Residents (GDPR)</h3>
              <p className="text-gray-700 mb-4">
                If you are in the European Economic Area, you have rights under the General Data Protection Regulation, including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 mb-4">
                <li>Right to access, rectify, or erase your personal data</li>
                <li>Right to restrict or object to processing</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent</li>
                <li>Right to lodge a complaint with supervisory authorities</li>
              </ul>
            </section>

            <div className="mt-12 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                This Privacy Policy is effective as of the date listed above and supersedes all previous versions. 
                We encourage you to review this policy regularly to stay informed about how we protect your privacy.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
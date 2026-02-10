import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: July 22, 2025
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">1. Information We Collect</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We collect information you provide directly, information we collect automatically, and information from third parties:
            </p>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Personal Information:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Name, email address, phone number</li>
                  <li>Government-issued ID and verification documents</li>
                  <li>Financial account information for escrow services</li>
                  <li>Business information and tax identification numbers</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold">Technical Information:</h4>
                <ul className="list-disc pl-6 space-y-1">
                  <li>IP address, device information, browser type</li>
                  <li>Usage patterns and platform interactions</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Location data (if permitted)</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">2. How We Use Your Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide and maintain our fraud prevention and escrow services</li>
              <li>Verify your identity and comply with KYC/AML requirements</li>
              <li>Process transactions and manage escrow accounts</li>
              <li>Detect and prevent fraud, money laundering, and other illegal activities</li>
              <li>Communicate with you about your account and our services</li>
              <li>Improve our platform and develop new features</li>
              <li>Comply with legal obligations and regulatory requirements</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">3. Information Sharing</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We may share your information in the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>With your consent:</strong> When you explicitly agree to share information</li>
              <li><strong>Service providers:</strong> Third-party vendors who assist in our operations</li>
              <li><strong>Legal compliance:</strong> When required by law, court order, or regulatory request</li>
              <li><strong>Fraud prevention:</strong> With fraud prevention networks and law enforcement</li>
              <li><strong>Business transfers:</strong> In connection with mergers, acquisitions, or asset sales</li>
              <li><strong>Transaction parties:</strong> Limited information for transaction facilitation</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">4. Data Security</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We implement industry-standard security measures including:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>End-to-end encryption for sensitive data transmission</li>
              <li>AES-256 encryption for data at rest</li>
              <li>Multi-factor authentication for account access</li>
              <li>Regular security audits and penetration testing</li>
              <li>SOC 2 Type II and ISO 27001 compliance</li>
              <li>Secure data centers with 24/7 monitoring</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">5. Data Retention</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We retain your information for as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide our services and maintain your account</li>
              <li>Comply with legal and regulatory obligations</li>
              <li>Resolve disputes and enforce our agreements</li>
              <li>Prevent fraud and maintain security</li>
            </ul>
            <p>
              Specific retention periods vary by data type and are outlined in our Data Retention Schedule available upon request.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">6. Your Rights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>Depending on your location, you may have the following rights:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Access:</strong> Request copies of your personal information</li>
              <li><strong>Correction:</strong> Request correction of inaccurate information</li>
              <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
              <li><strong>Portability:</strong> Request transfer of your data to another service</li>
              <li><strong>Restriction:</strong> Request limitation of processing your information</li>
              <li><strong>Objection:</strong> Object to certain types of processing</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">7. International Transfers</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place for international transfers, including:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Standard contractual clauses approved by relevant authorities</li>
              <li>Adequacy decisions by data protection authorities</li>
              <li>Certification schemes and codes of conduct</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">8. Cookies and Tracking</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Maintain your session and remember your preferences</li>
              <li>Analyze usage patterns and improve our services</li>
              <li>Provide security features and fraud prevention</li>
              <li>Deliver relevant content and advertisements</li>
            </ul>
            <p>You can control cookies through your browser settings, though some features may not function properly if disabled.</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">9. Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              For questions about this Privacy Policy or to exercise your rights, contact us at:
              <br />
              Email: privacy@trustverify.io
              <br />
              Phone: +44 20 7123 4567
              <br />
              Address: TrustVerify Privacy Office, 15 Grey Street, Newcastle upon Tyne NE1 6EE, UK
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
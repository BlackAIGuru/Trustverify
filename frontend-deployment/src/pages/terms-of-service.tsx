import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-lg text-gray-600">
            Last updated: July 22, 2025
          </p>
        </div>

        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl">1. Acceptance of Terms</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              By using TrustVerify (the "Platform"), you agree to these Terms and Conditions. These terms govern your use of our fraud prevention, escrow services, identity verification, and related services. If you do not agree with these terms, please do not use our platform.
            </p>
            <p>
              We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated "last modified" date. Your continued use of the platform after changes are posted constitutes acceptance of the modified terms.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">2. Service Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              TrustVerify provides fraud prevention and verification services including but not limited to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Identity verification and KYC (Know Your Customer) services</li>
              <li>Escrow services for secure transactions</li>
              <li>Trust scoring and reputation management</li>
              <li>Fraud detection and prevention tools</li>
              <li>Dispute resolution services</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">3. User Responsibilities</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              You agree to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain the confidentiality of your account credentials</li>
              <li>Use the platform only for lawful purposes</li>
              <li>Not engage in fraudulent or deceptive activities</li>
              <li>Comply with all applicable laws and regulations</li>
              <li>Report any suspected security breaches or unauthorized access</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">4. Escrow Services</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Our escrow services are designed to protect both buyers and sellers in transactions. Key terms include:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Funds are held in secure, segregated accounts</li>
              <li>Release conditions must be clearly defined and agreed upon</li>
              <li>Disputes will be resolved through our mediation process</li>
              <li>Service fees apply as outlined in our pricing structure</li>
              <li>Transaction limits may apply based on verification level</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">5. Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>IMPORTANT DISCLAIMER:</strong> TrustVerify acts as a facilitator and technology provider. We do not guarantee the authenticity, quality, or legality of items or services traded through our platform.
            </p>
            <p>
              To the maximum extent permitted by law, TrustVerify shall not be liable for:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Direct, indirect, incidental, or consequential damages</li>
              <li>Loss of profits, revenue, or business opportunities</li>
              <li>Data loss or corruption</li>
              <li>Third-party actions or omissions</li>
              <li>Service interruptions or technical failures</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">6. Privacy and Data Protection</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated by reference into these terms.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">7. Dispute Resolution</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              Disputes between users will be handled through our internal dispute resolution process:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Initial mediation through our platform</li>
              <li>Escalation to third-party arbitration if necessary</li>
              <li>Binding arbitration for disputes over $10,000</li>
              <li>Class action waiver applies</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">8. Termination</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We reserve the right to terminate or suspend your account immediately, without prior notice, for conduct that we believe violates these terms or is harmful to other users, us, or third parties.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">9. Contact Information</CardTitle>
          </CardHeader>
          <CardContent>
            <p>
              If you have questions about these Terms of Service, please contact us at:
              <br />
              Email: legal@trustverify.com
              <br />
              Address: TrustVerify Legal Department, 123 Business Ave, Suite 100, City, State 12345
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
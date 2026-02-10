import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Terms of Service
          </h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-red-600">
                Important Legal Notice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                <strong>Effective Date:</strong> January 1, 2025<br />
                <strong>Last Updated:</strong> July 11, 2025<br />
                <strong>Governing Law:</strong> England and Wales
              </p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                By using TrustVerify ("we", "our", "us"), you agree to these Terms and Conditions. 
                These terms govern your access to and use of our platform, services, APIs, and tools. 
                If you do not agree, you must not use TrustVerify.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Acceptance of Terms</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-700">
                  By using TrustVerify ("we", "our", "us"), you agree to these Terms and Conditions. 
                  These terms govern your access to and use of our platform, services, APIs, and tools. 
                  If you do not agree, you must not use TrustVerify.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Nature of Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  TrustVerify provides a verification and scoring service, allowing users to:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>Verify identity via third-party KYC/AML providers</li>
                  <li>Calculate trust scores for transactional safety</li>
                  <li>Optionally process payments or route transactions through external, regulated partners</li>
                </ul>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-6">
                  <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Disclaimer</h4>
                  <p className="text-yellow-700 text-sm">
                    We do not act as a financial intermediary, payment processor, escrow agent, or marketplace. 
                    We provide APIs and tools to integrate fraud and risk mitigation services into external systems.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    <strong>TrustVerify does not endorse, verify, or certify any user or business listed or connected through our system.</strong>
                  </p>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Critical Notice</h4>
                    <ul className="list-disc pl-6 text-red-700 text-sm space-y-1">
                      <li>Users engage with each other at their own risk</li>
                      <li>TrustVerify assumes no liability for loss, fraud, or disputes between transacting parties</li>
                      <li>TrustVerify's services are provided on an "as is" and "as available" basis</li>
                      <li>No warranties or guarantees are made</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Dispute Resolution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    If a buyer or seller raises a dispute within the defined buffer period, TrustVerify will 
                    freeze the release logic if integrated with a payment/escrow provider.
                  </p>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Important Notice</h4>
                    <p className="text-blue-700 text-sm">
                      TrustVerify is not a decision-maker in dispute outcomes. We may assist by collecting 
                      documentation and passing it to the appropriate financial or legal entities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. User Responsibilities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Mandatory Requirements</h4>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>All users must undergo identity verification (KYC) through supported third parties</li>
                    <li>Users are prohibited from misusing the platform for illegal, abusive, or deceptive purposes</li>
                    <li>Any suspicious behavior may result in account restriction, reporting to authorities, or platform bans</li>
                  </ul>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mt-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Verification Requirement</h4>
                    <p className="text-gray-700 text-sm">
                      <strong>All relationships between buyers and sellers must be verified by both parties.</strong> 
                      TrustVerify provides tools but cannot guarantee the authenticity of any business relationship.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Data Protection (UK GDPR / AML)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>We process personal data according to the UK GDPR</li>
                    <li>We only collect the minimum data required for compliance and fraud prevention</li>
                    <li>Data is processed via secure third parties (e.g., Onfido, Sumsub), with appropriate data processing agreements (DPAs) in place</li>
                    <li>Your data may be transferred outside the UK/EU with safeguards such as Standard Contractual Clauses (SCCs)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Termination</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">
                  We reserve the right to terminate or suspend access without notice in case of:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-1">
                  <li>Breach of terms</li>
                  <li>Fraudulent or illegal activity</li>
                  <li>Non-cooperation with investigations</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Governing Law</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  These Terms are governed by the laws of England and Wales. Any disputes arising from 
                  these terms or your use of TrustVerify will be subject to the exclusive jurisdiction 
                  of the courts of England and Wales.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>Legal Department:</strong> legal@trustverify.com
                  </p>
                  <p className="text-gray-700">
                    <strong>Compliance:</strong> compliance@trustverify.com
                  </p>
                  <p className="text-gray-700">
                    <strong>Data Protection Officer:</strong> dpo@trustverify.com
                  </p>
                  <p className="text-gray-700">
                    <strong>Address:</strong> TrustVerify Inc., London, United Kingdom
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
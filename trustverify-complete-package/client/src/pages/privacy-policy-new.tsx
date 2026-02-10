import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Privacy Policy
          </h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-blue-600">
                Data Protection & Privacy Notice
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                <strong>Effective Date:</strong> January 1, 2025<br />
                <strong>Last Updated:</strong> July 11, 2025<br />
                <strong>Data Controller:</strong> TrustVerify Inc., London, United Kingdom
              </p>
              <p className="mt-4 text-gray-700 leading-relaxed">
                This Privacy Policy explains how TrustVerify collects, uses, and protects your personal 
                information in compliance with the UK GDPR, CCPA, and AMLD5 regulations.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Information We Collect</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Personal Information</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Identity verification documents (passport, driver's license, ID cards)</li>
                      <li>Contact information (name, email, phone number, address)</li>
                      <li>Financial information (bank account details, transaction history)</li>
                      <li>Biometric data (facial recognition for verification purposes)</li>
                      <li>Device and usage information (IP address, browser type, session data)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Transaction Data</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Transaction amounts, dates, and descriptions</li>
                      <li>Counterparty information and communication records</li>
                      <li>Risk assessment scores and fraud detection results</li>
                      <li>Dispute records and resolution outcomes</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Legal Basis for Processing</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">UK GDPR Compliance</h4>
                    <p className="text-blue-700 text-sm">
                      We process your data under the following legal bases:
                    </p>
                  </div>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li><strong>Contractual Necessity:</strong> Processing required to provide our verification and fraud prevention services</li>
                    <li><strong>Legal Obligation:</strong> Compliance with AML, KYC, and financial regulation requirements</li>
                    <li><strong>Legitimate Interest:</strong> Fraud prevention, risk assessment, and platform security</li>
                    <li><strong>Consent:</strong> Where you have explicitly agreed to specific processing activities</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. How We Use Your Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Primary Uses</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Identity verification and KYC/AML compliance</li>
                      <li>Trust score calculation and risk assessment</li>
                      <li>Transaction monitoring and fraud detection</li>
                      <li>Dispute resolution and investigation</li>
                      <li>Regulatory reporting and compliance</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Secondary Uses</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Platform improvement and analytics</li>
                      <li>Customer support and service delivery</li>
                      <li>Security monitoring and threat detection</li>
                      <li>Marketing communications (with consent)</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Data Sharing and Third Parties</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">⚠️ Important Notice</h4>
                    <p className="text-yellow-700 text-sm">
                      We share data only as necessary for service delivery and regulatory compliance.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Authorized Third Parties</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li><strong>KYC/AML Providers:</strong> Onfido, Sumsub, Jumio for identity verification</li>
                      <li><strong>Payment Processors:</strong> Licensed financial institutions for transaction processing</li>
                      <li><strong>Cloud Services:</strong> AWS, Google Cloud for secure data storage and processing</li>
                      <li><strong>Regulatory Bodies:</strong> As required by law for compliance reporting</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Data Processing Agreements</h4>
                    <p className="text-gray-700 text-sm">
                      All third-party processors operate under comprehensive Data Processing Agreements (DPAs) 
                      with appropriate technical and organizational safeguards.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. International Data Transfers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    Your data may be transferred outside the UK/EU to provide our services. We ensure adequate 
                    protection through:
                  </p>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
                    <li>Adequacy decisions for countries with equivalent data protection</li>
                    <li>Certification schemes and binding corporate rules</li>
                    <li>Additional safeguards for high-risk transfers</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Data Retention</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Retention Periods</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li><strong>KYC Data:</strong> 7 years after account closure (regulatory requirement)</li>
                      <li><strong>Transaction Records:</strong> 7 years for AML compliance</li>
                      <li><strong>Dispute Records:</strong> 10 years for legal protection</li>
                      <li><strong>Marketing Data:</strong> Until consent is withdrawn</li>
                      <li><strong>Session Data:</strong> 90 days for security monitoring</li>
                    </ul>
                  </div>
                  
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-800 mb-2">Automatic Deletion</h4>
                    <p className="text-gray-700 text-sm">
                      Data is automatically deleted after retention periods expire, unless legal hold requirements apply.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Your Rights (UK GDPR)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Individual Rights</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li><strong>Right of Access:</strong> Request copies of your personal data</li>
                      <li><strong>Right to Rectification:</strong> Correct inaccurate or incomplete data</li>
                      <li><strong>Right to Erasure:</strong> Request deletion of your data (subject to legal obligations)</li>
                      <li><strong>Right to Restrict Processing:</strong> Limit how we use your data</li>
                      <li><strong>Right to Data Portability:</strong> Receive your data in a portable format</li>
                      <li><strong>Right to Object:</strong> Object to processing based on legitimate interests</li>
                      <li><strong>Right to Withdraw Consent:</strong> Withdraw consent for consent-based processing</li>
                    </ul>
                  </div>
                  
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <h4 className="font-semibold text-green-800 mb-2">How to Exercise Your Rights</h4>
                    <p className="text-green-700 text-sm">
                      Contact our Data Protection Officer at <strong>dpo@trustverify.com</strong> or use our 
                      online privacy portal to submit requests.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Security Measures</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Technical Safeguards</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>End-to-end encryption for data in transit and at rest</li>
                      <li>Multi-factor authentication and access controls</li>
                      <li>Regular security audits and penetration testing</li>
                      <li>SOC 2 Type II certification and compliance monitoring</li>
                      <li>Automated threat detection and response systems</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Organizational Measures</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Privacy by design principles</li>
                      <li>Regular staff training on data protection</li>
                      <li>Incident response and breach notification procedures</li>
                      <li>Third-party security assessments and due diligence</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>9. CCPA Rights (California Residents)</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-700">
                    California residents have additional rights under the California Consumer Privacy Act (CCPA):
                  </p>
                  
                  <ul className="list-disc pl-6 text-gray-700 space-y-1">
                    <li>Right to know what personal information is collected</li>
                    <li>Right to delete personal information</li>
                    <li>Right to opt-out of the sale of personal information</li>
                    <li>Right to non-discrimination for exercising CCPA rights</li>
                  </ul>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                    <p className="text-blue-700 text-sm">
                      <strong>Note:</strong> TrustVerify does not sell personal information to third parties.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>10. Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Privacy Contacts</h4>
                    <div className="space-y-2">
                      <p className="text-gray-700">
                        <strong>Data Protection Officer:</strong> dpo@trustverify.com
                      </p>
                      <p className="text-gray-700">
                        <strong>Privacy Team:</strong> privacy@trustverify.com
                      </p>
                      <p className="text-gray-700">
                        <strong>General Inquiries:</strong> support@trustverify.com
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Regulatory Complaints</h4>
                    <p className="text-gray-700 text-sm">
                      You have the right to lodge a complaint with the Information Commissioner's Office (ICO) 
                      in the UK or your local data protection authority.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>11. Changes to This Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">
                  We may update this Privacy Policy to reflect changes in our practices or applicable law. 
                  We will notify you of material changes through email or prominent notice on our platform. 
                  Continued use of our services after changes constitutes acceptance of the updated policy.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
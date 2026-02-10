import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function RegulatoryCompliance() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Regulatory Compliance
          </h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-green-600">
                Compliance Framework
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700 leading-relaxed">
                TrustVerify maintains comprehensive compliance with global financial regulations 
                to ensure the highest standards of security and regulatory adherence.
              </p>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Anti-Money Laundering (AML) Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">AMLD5 (Fifth Anti-Money Laundering Directive)</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Enhanced customer due diligence procedures</li>
                      <li>Real-time transaction monitoring and reporting</li>
                      <li>Beneficial ownership identification and verification</li>
                      <li>Suspicious activity reporting to relevant authorities</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Transaction Monitoring</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Automated screening against global sanctions lists</li>
                      <li>Real-time fraud detection algorithms</li>
                      <li>Risk-based transaction limits and controls</li>
                      <li>Ongoing monitoring of customer relationships</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Know Your Customer (KYC) Standards</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Identity Verification Levels</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li><strong>Basic Verification:</strong> Government-issued ID and proof of address</li>
                      <li><strong>Enhanced Verification:</strong> Biometric verification and source of funds</li>
                      <li><strong>Premium Verification:</strong> Full financial background checks</li>
                    </ul>
                  </div>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Verification Partners</h4>
                    <p className="text-blue-700 text-sm">
                      We partner with industry-leading KYC providers including Onfido, Sumsub, and Jumio 
                      to ensure accurate and compliant identity verification.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. Data Protection Regulations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">UK GDPR Compliance</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Lawful basis for all data processing activities</li>
                      <li>Data minimization and purpose limitation principles</li>
                      <li>Individual rights management and response procedures</li>
                      <li>Data Protection Impact Assessments (DPIAs)</li>
                      <li>Breach notification procedures (72-hour requirement)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">CCPA Compliance</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Transparent data collection and use disclosures</li>
                      <li>Consumer rights implementation and response</li>
                      <li>Opt-out mechanisms for data sale (not applicable - we don't sell data)</li>
                      <li>Non-discrimination policies for rights exercised</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Financial Services Regulations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">FCA Compliance (UK)</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Consumer Duty principles and fair treatment</li>
                      <li>Market conduct and integrity standards</li>
                      <li>Operational resilience requirements</li>
                      <li>Senior Managers & Certification Regime (SM&CR)</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">PCI DSS Compliance</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Secure cardholder data environment</li>
                      <li>Regular vulnerability assessments</li>
                      <li>Access control and authentication measures</li>
                      <li>Network security monitoring</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Security Certifications</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">SOC 2 Type II</h4>
                    <p className="text-gray-700 mb-2">
                      Annual third-party audits of our security, availability, processing integrity, 
                      confidentiality, and privacy controls.
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Continuous monitoring of security controls</li>
                      <li>Incident response and management procedures</li>
                      <li>Change management and system development lifecycle</li>
                      <li>Vendor management and due diligence</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">ISO 27001</h4>
                    <p className="text-gray-700">
                      Information Security Management System certification ensuring systematic 
                      approach to managing sensitive information.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Reporting and Transparency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Regulatory Reporting</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Suspicious Activity Reports (SARs) to National Crime Agency</li>
                      <li>Transaction reports to relevant financial intelligence units</li>
                      <li>Data breach notifications to supervisory authorities</li>
                      <li>Annual compliance attestations and filings</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Transparency Reports</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Annual transparency reports on law enforcement requests</li>
                      <li>Compliance metrics and performance indicators</li>
                      <li>Security incident summaries and lessons learned</li>
                      <li>Third-party audit results and recommendations</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Global Sanctions Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Sanctions Screening</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Real-time screening against OFAC, UN, EU, and HMT sanctions lists</li>
                      <li>Enhanced due diligence for high-risk jurisdictions</li>
                      <li>Ongoing monitoring of existing customers against updated lists</li>
                      <li>Automated blocking and escalation procedures</li>
                    </ul>
                  </div>
                  
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Zero Tolerance Policy</h4>
                    <p className="text-red-700 text-sm">
                      TrustVerify maintains a zero-tolerance policy towards sanctions evasion 
                      and prohibited transactions with sanctioned entities.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>8. Contact Compliance Team</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    <strong>Chief Compliance Officer:</strong> compliance@trustverify.com
                  </p>
                  <p className="text-gray-700">
                    <strong>AML Officer:</strong> aml@trustverify.com
                  </p>
                  <p className="text-gray-700">
                    <strong>Data Protection Officer:</strong> dpo@trustverify.com
                  </p>
                  <p className="text-gray-700">
                    <strong>Regulatory Affairs:</strong> regulatory@trustverify.com
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
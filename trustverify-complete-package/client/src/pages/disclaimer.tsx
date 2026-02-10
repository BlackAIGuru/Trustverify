import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Disclaimer & Regulatory Notice
          </h1>
          
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-yellow-600">
                ⚠️ Important Legal Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <p className="text-gray-800 leading-relaxed text-lg">
                  <strong>TrustVerify is a software platform that facilitates identity verification, trust scoring, and optional transaction protection tools.</strong> 
                  We are not a bank, licensed escrow provider, or financial institution.
                </p>
                
                <p className="text-gray-700 leading-relaxed mt-4">
                  Any financial or identity services offered through our platform are powered by licensed third-party providers, 
                  and we ensure compliance with relevant regulations (e.g., GDPR, CCPA, AMLD5) via our partners.
                </p>
                
                <p className="text-gray-700 leading-relaxed mt-4">
                  By using our services, users acknowledge that TrustVerify acts as a technology facilitator, not as a regulated entity. 
                  For regulated activities, users are bound by the terms of our licensed partners.
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>1. Nature of Our Services</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Technology Facilitation</h4>
                    <p className="text-gray-700">
                      TrustVerify provides technology solutions that connect users with licensed financial service providers. 
                      We do not directly provide financial services, but rather facilitate access to them through our platform.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What We Provide</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Identity verification tools and APIs</li>
                      <li>Trust scoring algorithms and risk assessment</li>
                      <li>Transaction monitoring and fraud detection</li>
                      <li>Integration services with licensed providers</li>
                      <li>Compliance support and reporting tools</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">What We Don't Provide</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Direct banking or financial services</li>
                      <li>Licensed escrow or custody services</li>
                      <li>Investment advice or financial planning</li>
                      <li>Insurance or guarantee of transactions</li>
                      <li>Legal or regulatory advice</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>2. Third-Party Service Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-800 mb-2">Licensed Partner Network</h4>
                    <p className="text-blue-700 text-sm">
                      All regulated financial services are provided by our licensed partners who are authorized 
                      and regulated by appropriate financial authorities.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Partner Categories</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li><strong>Payment Processors:</strong> Licensed Money Services Businesses (MSBs)</li>
                      <li><strong>Banking Partners:</strong> FCA-authorized banks and financial institutions</li>
                      <li><strong>KYC/AML Providers:</strong> Regulated identity verification services</li>
                      <li><strong>Escrow Services:</strong> Licensed escrow agents and trustees</li>
                      <li><strong>Compliance Partners:</strong> Authorized compliance and audit firms</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Partner Responsibilities</h4>
                    <p className="text-gray-700">
                      Our licensed partners are responsible for regulatory compliance, customer funds protection, 
                      dispute resolution, and meeting all applicable financial service requirements.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>3. User Verification Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                    <h4 className="font-semibold text-red-800 mb-2">Critical Verification Notice</h4>
                    <p className="text-red-700 text-sm font-medium">
                      <strong>ALL RELATIONSHIPS BETWEEN BUYERS AND SELLERS MUST BE VERIFIED BY BOTH PARTIES.</strong>
                    </p>
                    <p className="text-red-700 text-sm mt-2">
                      TrustVerify provides verification tools but cannot guarantee the authenticity of any business 
                      relationship or the legitimacy of any individual user.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">User Due Diligence</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>Users must independently verify counterparty identities</li>
                      <li>Conduct appropriate background checks for business relationships</li>
                      <li>Verify business licenses and professional credentials</li>
                      <li>Confirm physical addresses and contact information</li>
                      <li>Obtain references and verify business history</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Platform Limitations</h4>
                    <p className="text-gray-700">
                      While TrustVerify provides trust scores and verification tools, these are indicators only. 
                      Users should not rely solely on our platform for verification and must conduct their own due diligence.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>4. Risk Warnings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Transaction Risks</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>All transactions carry inherent risks of loss</li>
                      <li>Digital transactions may be irreversible</li>
                      <li>Market volatility may affect transaction values</li>
                      <li>Technical failures may impact service availability</li>
                      <li>Regulatory changes may affect service operations</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Fraud Prevention Limitations</h4>
                    <p className="text-gray-700">
                      Despite advanced fraud detection systems, no technology can prevent all fraudulent activities. 
                      Users must remain vigilant and report suspicious activities immediately.
                    </p>
                  </div>
                  
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <h4 className="font-semibold text-yellow-800 mb-2">Investment Warning</h4>
                    <p className="text-yellow-700 text-sm">
                      TrustVerify does not provide investment advice. Any financial decisions made using our platform 
                      are the sole responsibility of the user.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>5. Limitation of Liability</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Service Limitations</h4>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>TrustVerify provides services on an "as is" basis</li>
                      <li>We do not guarantee continuous service availability</li>
                      <li>No warranties are provided regarding service outcomes</li>
                      <li>Technical issues may temporarily affect service quality</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Liability Exclusions</h4>
                    <p className="text-gray-700">
                      TrustVerify is not liable for losses arising from:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>User interactions and business relationships</li>
                      <li>Third-party service provider actions or failures</li>
                      <li>Market conditions or external factors</li>
                      <li>User failure to follow verification procedures</li>
                      <li>Technical failures beyond our reasonable control</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>6. Regulatory Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Compliance Framework</h4>
                    <p className="text-gray-700">
                      TrustVerify operates within a comprehensive compliance framework that includes:
                    </p>
                    <ul className="list-disc pl-6 text-gray-700 space-y-1">
                      <li>GDPR and data protection compliance</li>
                      <li>CCPA privacy protection standards</li>
                      <li>AMLD5 anti-money laundering requirements</li>
                      <li>KYC/AML verification procedures</li>
                      <li>International sanctions compliance</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Regulatory Reporting</h4>
                    <p className="text-gray-700">
                      We may be required to report certain activities to regulatory authorities and 
                      cooperate with lawful investigations and compliance requests.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>7. Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="text-gray-700">
                    For questions about this disclaimer or our services:
                  </p>
                  <div className="mt-4 space-y-2">
                    <p className="text-gray-700">
                      <strong>Legal Department:</strong> legal@trustverify.com
                    </p>
                    <p className="text-gray-700">
                      <strong>Compliance Team:</strong> compliance@trustverify.com
                    </p>
                    <p className="text-gray-700">
                      <strong>Support Team:</strong> support@trustverify.com
                    </p>
                    <p className="text-gray-700">
                      <strong>Address:</strong> TrustVerify Inc., London, United Kingdom
                    </p>
                  </div>
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
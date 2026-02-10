import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function Disclaimer() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <AlertTriangle className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Legal Disclaimer
          </h1>
          <p className="text-lg text-gray-600">
            Important legal information regarding the use of TrustVerify services
          </p>
        </div>

        <Card className="shadow-lg border-yellow-200">
          <CardHeader className="bg-yellow-50">
            <CardTitle className="text-2xl text-yellow-800">General Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 mt-6">
            <p className="text-lg font-semibold">
              PLEASE READ THIS DISCLAIMER CAREFULLY BEFORE USING TRUSTVERIFY SERVICES.
            </p>
            <p>
              TrustVerify provides fraud prevention, identity verification, and escrow services as a technology platform. We act as an intermediary and facilitator, not as a guarantor, insurer, or party to any transactions conducted through our platform.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">No Warranty or Guarantee</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              TrustVerify makes no warranties, representations, or guarantees about:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>The authenticity, quality, safety, or legality of items or services traded</li>
              <li>The accuracy or completeness of user-provided information</li>
              <li>The reliability or trustworthiness of platform users</li>
              <li>The success or completion of any transactions</li>
              <li>The continuous availability or error-free operation of our services</li>
              <li>The prevention of all fraudulent activities or security breaches</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">User Responsibility</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              <strong>YOU ARE SOLELY RESPONSIBLE FOR:</strong>
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Conducting your own due diligence before entering into any transaction</li>
              <li>Verifying the identity, credentials, and legitimacy of other users</li>
              <li>Ensuring compliance with applicable laws and regulations</li>
              <li>Assessing the risks associated with any transaction or service</li>
              <li>Maintaining the security of your account and personal information</li>
              <li>Any losses, damages, or disputes arising from your use of the platform</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Limitation of Liability</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY LAW, TRUSTVERIFY SHALL NOT BE LIABLE FOR:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Any direct, indirect, incidental, special, or consequential damages</li>
              <li>Loss of profits, revenue, business opportunities, or goodwill</li>
              <li>Personal injury or property damage arising from platform use</li>
              <li>Fraudulent activities or misconduct by platform users</li>
              <li>Technical failures, service interruptions, or data loss</li>
              <li>Third-party actions, omissions, or content</li>
            </ul>
            <p className="font-semibold">
              OUR TOTAL LIABILITY SHALL NOT EXCEED THE FEES PAID BY YOU TO TRUSTVERIFY IN THE 12 MONTHS PRECEDING THE CLAIM.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Risk Acknowledgment</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              By using TrustVerify, you acknowledge and accept the following risks:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Online transactions carry inherent risks including fraud and identity theft</li>
              <li>Technology systems may experience failures or security vulnerabilities</li>
              <li>Regulatory changes may affect service availability or functionality</li>
              <li>Third-party service providers may cause service disruptions</li>
              <li>Users may provide false or misleading information</li>
              <li>Dispute resolution processes may not result in satisfactory outcomes</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Investment and Financial Advice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              TrustVerify does not provide investment, financial, legal, or tax advice. Any information provided on our platform is for informational purposes only and should not be construed as professional advice.
            </p>
            <p>
              You should consult with qualified professionals before making any financial or legal decisions.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Regulatory Compliance</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              While TrustVerify strives to comply with applicable regulations, you are responsible for ensuring your use of our services complies with all laws and regulations in your jurisdiction.
            </p>
            <p>
              Some services may not be available in certain jurisdictions due to regulatory restrictions.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8">
          <CardHeader>
            <CardTitle className="text-2xl">Updates to This Disclaimer</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p>
              We reserve the right to update this disclaimer at any time without prior notice. Changes will be effective immediately upon posting. Your continued use of our services after changes constitutes acceptance of the updated disclaimer.
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg mt-8 border-red-200">
          <CardHeader className="bg-red-50">
            <CardTitle className="text-2xl text-red-800">Final Notice</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 mt-6">
            <p className="font-semibold">
              IF YOU DO NOT AGREE WITH ANY PART OF THIS DISCLAIMER, DO NOT USE TRUSTVERIFY SERVICES.
            </p>
            <p>
              For questions about this disclaimer, contact our legal department at legal@trustverify.com.
            </p>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
import { AlertTriangle, Shield, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface LegalDisclaimerProps {
  variant?: 'full' | 'compact' | 'footer';
  className?: string;
}

export function LegalDisclaimer({ variant = 'full', className = '' }: LegalDisclaimerProps) {
  if (variant === 'footer') {
    return (
      <div className={`border-t border-gray-700 pt-4 ${className}`}>
        <p className="text-xs text-gray-400 leading-relaxed mb-2">
          <strong className="text-gray-300">Important Legal Disclaimer:</strong> TrustVerify provides fraud prevention and verification services as a technology platform only. We do not guarantee, warrant, or certify the accuracy, completeness, or reliability of any analysis, verification, or scoring results. All users are solely responsible for conducting their own independent due diligence before making any business, financial, or transaction decisions.
        </p>
        <p className="text-xs text-gray-400 leading-relaxed mb-2">
          <strong className="text-gray-300">No Liability:</strong> TrustVerify, its officers, directors, employees, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from the use of our services, including but not limited to financial losses, business interruption, or reputational damage. Users acknowledge that all transaction decisions are made at their own risk.
        </p>
        <p className="text-xs text-gray-400 leading-relaxed">
          <strong className="text-gray-300">Third-Party Risk:</strong> TrustVerify does not endorse, guarantee, or assume responsibility for any third-party users, businesses, or transactions facilitated through our platform. We strongly recommend independent verification of all parties and terms before proceeding with any transaction or business relationship.
        </p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <Alert className={`border-amber-200 bg-amber-50 ${className}`}>
        <AlertTriangle className="h-4 w-4 text-amber-600" />
        <AlertDescription className="text-sm text-amber-800">
          <strong>Legal Notice:</strong> TrustVerify provides technology services only. We do not guarantee results or assume liability for user decisions. All users must conduct independent due diligence. Use of our platform constitutes acceptance of our Terms of Service and Privacy Policy.
        </AlertDescription>
      </Alert>
    );
  }

  // Full disclaimer
  return (
    <div className={`bg-gray-50 border border-gray-200 rounded-lg p-6 ${className}`}>
      <div className="flex items-start gap-3 mb-4">
        <Shield className="h-6 w-6 text-amber-600 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Legal Disclaimer</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            Please read this disclaimer carefully before using TrustVerify's services. By accessing or using our platform, you acknowledge and agree to these terms.
          </p>
        </div>
      </div>

      <div className="space-y-4 text-sm text-gray-700">
        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Service Limitations</h4>
          <p className="leading-relaxed">
            TrustVerify operates as a technology platform providing fraud prevention, identity verification, and transaction security tools. We do <strong>not</strong> guarantee, warrant, endorse, or certify:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
            <li>The accuracy, completeness, or reliability of any analysis, verification, or scoring results</li>
            <li>The legitimacy, trustworthiness, or financial standing of any users or businesses on our platform</li>
            <li>The successful completion or security of any transactions facilitated through our services</li>
            <li>The prevention of all fraudulent activities or financial losses</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">User Responsibility</h4>
          <p className="leading-relaxed">
            All users are <strong>solely responsible</strong> for:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
            <li>Conducting independent due diligence on all parties, transactions, and business relationships</li>
            <li>Verifying the identity, credentials, and legitimacy of other users independently</li>
            <li>Making informed decisions based on their own research and professional judgment</li>
            <li>Complying with all applicable laws, regulations, and industry standards</li>
            <li>Understanding and accepting the risks associated with their transactions and business activities</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Limitation of Liability</h4>
          <p className="leading-relaxed">
            To the fullest extent permitted by law, TrustVerify, its officers, directors, employees, affiliates, and service providers shall <strong>not be liable</strong> for any:
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1 ml-4">
            <li>Direct, indirect, incidental, special, consequential, or punitive damages</li>
            <li>Financial losses, business interruption, or loss of profits</li>
            <li>Reputational damage or loss of business opportunities</li>
            <li>Data breaches, system failures, or service interruptions</li>
            <li>Actions or omissions of third-party users or service providers</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">No Professional Advice</h4>
          <p className="leading-relaxed">
            TrustVerify does not provide legal, financial, investment, or professional advice. Our services are purely technological tools for risk assessment and verification. Users should consult qualified professionals for advice specific to their circumstances.
          </p>
        </div>

        <div>
          <h4 className="font-semibold text-gray-900 mb-2">Third-Party Disclaimer</h4>
          <p className="leading-relaxed">
            TrustVerify does not endorse, guarantee, or assume responsibility for any third-party users, businesses, products, or services. We are not party to any agreements or transactions between users and do not mediate disputes beyond our standard dispute resolution procedures.
          </p>
        </div>

        <div className="border-t border-gray-200 pt-4">
          <p className="text-xs text-gray-600 leading-relaxed">
            <strong>By using TrustVerify's services, you acknowledge that you have read, understood, and agree to this disclaimer and our full Terms of Service and Privacy Policy. If you do not agree with these terms, please discontinue use of our platform immediately.</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
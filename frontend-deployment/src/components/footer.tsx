import { Link } from "wouter";
import { Shield } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#0F172A] text-gray-300 py-10 px-6 md:px-20">
      <div className="max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Brand and Mission */}
        <div>
          <div className="flex items-center mb-4">
            <Shield className="h-6 w-6 text-white mr-2" />
            <h3 className="text-white text-xl font-semibold">TrustVerify</h3>
          </div>
          <p className="text-sm">
            An innovative fraud prevention and verification platform launching in 2025.
            Helping protect your transactions with identity verification, escrow and trust scoring.
          </p>
        </div>

        {/* Platform Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Platform</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/demo" className="hover:text-white transition-colors">Interactive Demo</Link></li>
            <li><Link href="/developer-portal" className="hover:text-white transition-colors">Developer Portal</Link></li>
            <li><Link href="/api-reference" className="hover:text-white transition-colors">API Reference</Link></li>
            <li><Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link></li>
          </ul>
        </div>

        {/* Company Links */}
        <div>
          <h4 className="text-white font-semibold mb-3">Company</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/about-us" className="hover:text-white transition-colors">About Us</Link></li>
            <li><Link href="/careers" className="hover:text-white transition-colors">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            <li><Link href="/press" className="hover:text-white transition-colors">Press</Link></li>
          </ul>
        </div>

        {/* Legal & Help */}
        <div>
          <h4 className="text-white font-semibold mb-3">Legal & Help</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/help-center" className="hover:text-white transition-colors">Help Center</Link></li>
            <li><Link href="/terms-of-service" className="hover:text-white transition-colors">Terms of Service</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            <li><Link href="/disclaimer" className="hover:text-white transition-colors">Legal Disclaimer</Link></li>
            <li><Link href="/regulatory-compliance" className="hover:text-white transition-colors">Regulatory Compliance</Link></li>
          </ul>
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-gray-700 my-6"></div>

      {/* Disclaimer */}
      <div className="max-w-screen-xl mx-auto text-sm text-gray-400 text-center px-4 leading-relaxed">
        <div className="mb-4">
          <p className="font-semibold text-gray-300 mb-2">
            © 2025 TrustVerify. All rights reserved.
          </p>
          <p className="mb-3">
            TrustVerify is a comprehensive fraud prevention platform that facilitates secure escrow services, 
            advanced identity verification, and AI-powered trust scoring for businesses worldwide.
          </p>
        </div>
        
        <div className="border-t border-gray-700 pt-4">
          <p className="text-xs text-gray-400 leading-relaxed mb-2">
            <strong className="text-gray-300">Important Legal Disclaimer:</strong> TrustVerify provides fraud prevention and verification services as a technology platform only. We do not guarantee, warrant, or certify the accuracy, completeness, or reliability of any analysis, verification, or scoring results. All users are solely responsible for conducting their own independent due diligence before making any business, financial, or transaction decisions.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed mb-2">
            <strong className="text-gray-300">No Liability:</strong> TrustVerify, its officers, directors, employees, and affiliates shall not be liable for any direct, indirect, incidental, special, consequential, or punitive damages arising from the use of our services, including but not limited to financial losses, business interruption, or reputational damage. Users acknowledge that all transaction decisions are made at their own risk.
          </p>
          <p className="text-xs text-gray-400 leading-relaxed mb-3">
            <strong className="text-gray-300">Third-Party Risk:</strong> TrustVerify does not endorse, guarantee, or assume responsibility for any third-party users, businesses, or transactions facilitated through our platform. We strongly recommend independent verification of all parties and terms before proceeding with any transaction or business relationship.
          </p>
          <p className="mb-3">
            TrustVerify provides fraud prevention tools and escrow services but shall not be liable for any losses, 
            fraud, or damages arising from platform usage. Users assume all risks associated with their transactions.
          </p>
          <p>
            By using this platform, you acknowledge and agree to our{" "}
            <Link href="/terms-of-service" className="underline text-blue-300 hover:text-blue-200 font-medium">Terms of Service</Link>
            {", "}
            <Link href="/privacy-policy" className="underline text-blue-300 hover:text-blue-200 font-medium">Privacy Policy</Link>
            {", and "}
            <Link href="/disclaimer" className="underline text-blue-300 hover:text-blue-200 font-medium">Legal Disclaimer</Link>.
          </p>
        </div>
      </div>
    </footer>
  );
}
import { Link, useLocation } from "wouter";
import { Logo } from "./logo";

export function Footer() {
  const [, setLocation] = useLocation();

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Logo className="h-8 w-8" />
              <span className="text-xl font-bold">TrustVerify</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Advanced fraud prevention and secure transaction platform providing 
              enterprise-grade protection for businesses worldwide.
            </p>
            <div className="text-sm text-gray-400">
              <p>© 2025 TrustVerify Inc. All rights reserved.</p>
              <p>Protecting over $2.4B+ in transactions annually</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link 
                  href="/demo" 
                  className="hover:text-white transition-colors cursor-pointer"
                  onClick={() => {
                    console.log('Navigating to Demo');
                    setLocation('/demo');
                  }}
                >
                  Demo
                </Link>
              </li>
              <li>
                <Link 
                  href="/pricing" 
                  className="hover:text-white transition-colors cursor-pointer"
                  onClick={() => {
                    console.log('Navigating to Pricing');
                    setLocation('/pricing');
                  }}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  href="/developer-portal" 
                  className="hover:text-white transition-colors cursor-pointer"
                  onClick={() => {
                    console.log('Navigating to Developer Portal');
                    setLocation('/developer-portal');
                  }}
                >
                  Developer API
                </Link>
              </li>
              <li>
                <Link 
                  href="/security-dashboard" 
                  className="hover:text-white transition-colors cursor-pointer"
                  onClick={() => {
                    console.log('Navigating to Security Dashboard');
                    setLocation('/security-dashboard');
                  }}
                >
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link 
                  href="/terms-of-service"
                  className="hover:text-white transition-colors cursor-pointer block"
                  onClick={() => {
                    console.log('Navigating to Terms of Service');
                    setLocation('/terms-of-service');
                  }}
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link 
                  href="/privacy-policy"
                  className="hover:text-white transition-colors cursor-pointer block"
                  onClick={() => {
                    console.log('Navigating to Privacy Policy');
                    setLocation('/privacy-policy');
                  }}
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link 
                  href="/regulatory-compliance"
                  className="hover:text-white transition-colors cursor-pointer block"
                  onClick={() => {
                    console.log('Navigating to Regulatory Compliance');
                    setLocation('/regulatory-compliance');
                  }}
                >
                  Regulatory Compliance
                </Link>
              </li>
              <li>
                <Link 
                  href="/disclaimer"
                  className="hover:text-white transition-colors cursor-pointer block"
                  onClick={() => {
                    console.log('Navigating to Disclaimer');
                    setLocation('/disclaimer');
                  }}
                >
                  Disclaimer
                </Link>
              </li>
              <li>
                <a href="mailto:legal@trustverify.com" className="hover:text-white transition-colors cursor-pointer">
                  Legal Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          {/* Disclaimer Notice */}
          <div className="mb-6 p-4 bg-gray-800 rounded-lg border border-gray-700">
            <h4 className="text-sm font-semibold text-yellow-400 mb-2">⚠️ Important Disclaimer & Regulatory Notice</h4>
            <p className="text-xs text-gray-300 leading-relaxed">
              TrustVerify is a software platform that facilitates identity verification, trust scoring, and optional transaction protection tools. 
              We are not a bank, licensed escrow provider, or financial institution. Any financial or identity services offered through our platform 
              are powered by licensed third-party providers, and we ensure compliance with relevant regulations (e.g., GDPR, CCPA, AMLD5) via our partners. 
              By using our services, users acknowledge that TrustVerify acts as a technology facilitator, not as a regulated entity. 
              <strong className="text-yellow-300"> All relationships between buyers and sellers must be verified by both parties.</strong> 
              For regulated activities, users are bound by the terms of our licensed partners.
            </p>
          </div>
          
          <div className="text-center text-sm text-gray-400">
            <p>
              TrustVerify is a registered trademark. SOC 2 Type II certified. 
              Licensed Money Services Business (MSB). Member FINRA/SIPC.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
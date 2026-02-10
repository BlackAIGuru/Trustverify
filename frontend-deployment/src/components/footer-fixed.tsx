import { Link } from "wouter";
import { Logo } from "./logo";

export function FooterFixed() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
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

          {/* Company Links - Using href like navigation.tsx */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/about-us" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="hover:text-white transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/help-center" className="hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/developer-portal" className="hover:text-white transition-colors">
                  Developer API
                </Link>
              </li>
              <li>
                <Link href="/demo" className="hover:text-white transition-colors">
                  Demo
                </Link>
              </li>
              <li>
                <Link href="/security-dashboard" className="hover:text-white transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-300">
              <li>
                <Link href="/terms-of-service" className="hover:text-white transition-colors">
                  Terms
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
              </li>
              <li>
                <Link href="/regulatory-compliance" className="hover:text-white transition-colors">
                  Compliance
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-white transition-colors">
                  Disclaimer
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm">
              <p>Enterprise-grade fraud prevention • SOC 2 Type II Certified • GDPR Compliant</p>
            </div>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <Link href="/pricing" className="text-gray-400 hover:text-white transition-colors text-sm">
                Pricing
              </Link>
              <Link href="/api-reference" className="text-gray-400 hover:text-white transition-colors text-sm">
                API Reference
              </Link>
              <a 
                href="mailto:support@trustverify.com" 
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
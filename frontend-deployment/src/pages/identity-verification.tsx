import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, Scan, UserCheck, FileText, Globe, Clock, CheckCircle, Award } from "lucide-react";
import { Navigation } from "@/components/navigation";

export default function IdentityVerification() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <UserCheck className="h-12 w-12 text-green-600" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Identity Verification & KYC
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Comprehensive identity verification solutions that comply with global KYC/AML regulations 
              while providing seamless user experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8 py-4">
                Start Verification
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4">
                View Compliance
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Identity Verification Suite
            </h2>
            <p className="text-lg text-gray-600">
              Multi-layered verification process ensuring compliance and security
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Scan className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Document Verification</CardTitle>
                <CardDescription>
                  Advanced OCR and AI-powered document analysis for government-issued IDs and documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Passport & driver's license scanning</li>
                  <li>• Security feature detection</li>
                  <li>• Document tampering analysis</li>
                  <li>• Global document support</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <UserCheck className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Biometric Matching</CardTitle>
                <CardDescription>
                  Advanced facial recognition and liveness detection to prevent spoofing attempts
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Liveness detection</li>
                  <li>• Face-to-photo matching</li>
                  <li>• Anti-spoofing technology</li>
                  <li>• Real-time verification</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Globe className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Global Compliance</CardTitle>
                <CardDescription>
                  Meet KYC/AML requirements across 195+ countries with automated regulatory compliance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• GDPR, CCPA compliance</li>
                  <li>• AML screening</li>
                  <li>• PEP & sanctions checking</li>
                  <li>• Regulatory reporting</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Clock className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Instant Verification</CardTitle>
                <CardDescription>
                  Complete identity checks in under 60 seconds with automated decision-making
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Sub-minute processing</li>
                  <li>• Real-time API responses</li>
                  <li>• Automated approvals</li>
                  <li>• Exception handling</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <FileText className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Risk Assessment</CardTitle>
                <CardDescription>
                  Comprehensive risk scoring based on multiple data points and behavioral analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Multi-factor risk scoring</li>
                  <li>• Behavioral analysis</li>
                  <li>• Database cross-referencing</li>
                  <li>• Continuous monitoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Award className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Trust Scoring</CardTitle>
                <CardDescription>
                  Dynamic trust scores that evolve based on user behavior and transaction history
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Dynamic scoring algorithms</li>
                  <li>• Historical pattern analysis</li>
                  <li>• Peer comparison metrics</li>
                  <li>• Trust level categorization</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Verification Process */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Simple Three-Step Verification Process
            </h2>
            <p className="text-lg text-gray-600">
              Seamless user experience with enterprise-grade security
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Scan className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">1. Document Upload</h3>
              <p className="text-gray-600 mb-4">
                Users upload government-issued ID documents through our secure, encrypted interface
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <h4 className="font-semibold text-sm mb-2">Supported Documents:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Passport</li>
                  <li>• Driver's License</li>
                  <li>• National ID Card</li>
                  <li>• Residence Permit</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <UserCheck className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">2. Biometric Verification</h3>
              <p className="text-gray-600 mb-4">
                Advanced facial recognition matches the user to their document photo with liveness detection
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <h4 className="font-semibold text-sm mb-2">Security Features:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Liveness Detection</li>
                  <li>• Face Matching</li>
                  <li>• Anti-Spoofing</li>
                  <li>• Quality Assessment</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">3. Instant Results</h3>
              <p className="text-gray-600 mb-4">
                Receive verification results within seconds, with detailed risk assessment and compliance status
              </p>
              <div className="bg-gray-50 p-4 rounded-lg text-left">
                <h4 className="font-semibold text-sm mb-2">Verification Outcomes:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Verified</li>
                  <li>• Under Review</li>
                  <li>• Requires Additional Info</li>
                  <li>• Rejected</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-green-900 to-blue-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Global Regulatory Compliance
            </h2>
            <p className="text-xl text-green-100">
              Meet the highest standards for KYC/AML compliance worldwide
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">Global</div>
              <div className="text-lg font-medium">Platform Ready</div>
              <div className="text-sm text-green-200 mt-1">Worldwide coverage</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">Secure</div>
              <div className="text-lg font-medium">Enterprise-Grade</div>
              <div className="text-sm text-green-200 mt-1">Advanced compliance</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">Fast</div>
              <div className="text-lg font-medium">Quick Verification</div>
              <div className="text-sm text-green-200 mt-1">Rapid processing</div>
            </div>
            
            <div className="text-center">
              <div className="text-3xl font-bold text-green-300 mb-2">24/7</div>
              <div className="text-lg font-medium">Always Available</div>
              <div className="text-sm text-green-200 mt-1">Continuous service</div>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Industry Applications
            </h2>
            <p className="text-lg text-gray-600">
              Trusted across multiple industries for critical identity verification needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-600">Financial Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Meet stringent banking regulations with comprehensive KYC processes for account opening and transactions.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Account opening verification</li>
                  <li>• Transaction monitoring</li>
                  <li>• AML compliance reporting</li>
                  <li>• Risk-based authentication</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-600">E-commerce & Marketplaces</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Verify sellers and high-value buyers to reduce fraud and build marketplace trust.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Seller verification programs</li>
                  <li>• High-value buyer checks</li>
                  <li>• Age verification</li>
                  <li>• Geographic restrictions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-blue-600">Crypto & Digital Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Comply with evolving cryptocurrency regulations and exchange requirements globally.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Exchange onboarding</li>
                  <li>• Wallet verification</li>
                  <li>• Transaction limits</li>
                  <li>• Regulatory reporting</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center text-white">
          <Shield className="h-16 w-16 text-green-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Start Verifying Identities Today
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join leading companies that trust TrustVerify for secure, compliant identity verification.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-green-600 hover:bg-green-700 px-8 py-4">
              Get Started Free
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4">
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
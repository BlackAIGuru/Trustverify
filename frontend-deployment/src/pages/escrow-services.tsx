import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Shield, DollarSign, Clock, Users, CheckCircle, AlertCircle, ArrowRight, Lock } from "lucide-react";
import { Navigation } from "@/components/navigation";

export default function EscrowServices() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-6">
              <div className="bg-yellow-100 p-4 rounded-full">
                <DollarSign className="h-12 w-12 text-yellow-600" />
              </div>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Secure Escrow Services
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Protect your high-value transactions with trusted escrow services that ensure 
              funds are only released when all conditions are met.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 px-8 py-4">
                Create Escrow
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-4">
                View Process
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* How Escrow Works */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How TrustVerify Escrow Works
            </h2>
            <p className="text-lg text-gray-600">
              A simple, secure process that protects both buyers and sellers
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="relative">
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-600">1</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Agreement</h3>
                <p className="text-gray-600 text-sm">
                  Buyer and seller agree on transaction terms, including price, delivery conditions, and timeline
                </p>
              </div>
              {/* Arrow for desktop */}
              <div className="hidden lg:block absolute top-8 -right-4">
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
            </div>
            
            <div className="relative">
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-600">2</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Payment</h3>
                <p className="text-gray-600 text-sm">
                  Buyer deposits funds into secure escrow account, protected by bank-level security
                </p>
              </div>
              <div className="hidden lg:block absolute top-8 -right-4">
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
            </div>
            
            <div className="relative">
              <div className="text-center">
                <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-bold text-yellow-600">3</span>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Delivery</h3>
                <p className="text-gray-600 text-sm">
                  Seller delivers goods/services according to agreed terms with tracking and verification
                </p>
              </div>
              <div className="hidden lg:block absolute top-8 -right-4">
                <ArrowRight className="h-6 w-6 text-gray-400" />
              </div>
            </div>
            
            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">4</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Release</h3>
              <p className="text-gray-600 text-sm">
                Buyer confirms satisfaction and funds are automatically released to the seller
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Complete Transaction Protection
            </h2>
            <p className="text-lg text-gray-600">
              Advanced security features that protect every aspect of your transaction
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Lock className="h-10 w-10 text-yellow-600 mb-4" />
                <CardTitle>Bank-Level Security</CardTitle>
                <CardDescription>
                  Funds protected by enterprise-grade security with multi-signature controls and cold storage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 256-bit SSL encryption</li>
                  <li>• Multi-signature authentication</li>
                  <li>• Cold storage protection</li>
                  <li>• FDIC-insured accounts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Clock className="h-10 w-10 text-yellow-600 mb-4" />
                <CardTitle>Smart Milestones</CardTitle>
                <CardDescription>
                  Break large transactions into milestones with automated release triggers and progress tracking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Milestone-based releases</li>
                  <li>• Automated triggers</li>
                  <li>• Progress tracking</li>
                  <li>• Custom conditions</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Users className="h-10 w-10 text-yellow-600 mb-4" />
                <CardTitle>Dispute Resolution</CardTitle>
                <CardDescription>
                  Professional mediation services with experienced arbitrators for complex disputes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Expert mediators</li>
                  <li>• Evidence collection</li>
                  <li>• Fair arbitration process</li>
                  <li>• Final decision enforcement</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <Shield className="h-10 w-10 text-yellow-600 mb-4" />
                <CardTitle>Fraud Protection</CardTitle>
                <CardDescription>
                  Advanced fraud detection algorithms monitor transactions for suspicious activity
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Real-time monitoring</li>
                  <li>• Pattern recognition</li>
                  <li>• Risk assessment</li>
                  <li>• Automated alerts</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CheckCircle className="h-10 w-10 text-yellow-600 mb-4" />
                <CardTitle>Identity Verification</CardTitle>
                <CardDescription>
                  Comprehensive KYC verification ensures all parties are legitimate and verified
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Document verification</li>
                  <li>• Biometric matching</li>
                  <li>• Background checks</li>
                  <li>• Trust scoring</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <AlertCircle className="h-10 w-10 text-yellow-600 mb-4" />
                <CardTitle>24/7 Monitoring</CardTitle>
                <CardDescription>
                  Round-the-clock transaction monitoring with instant alerts and rapid response team
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• 24/7 surveillance</li>
                  <li>• Instant notifications</li>
                  <li>• Rapid response team</li>
                  <li>• Emergency protocols</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Perfect for High-Value Transactions
            </h2>
            <p className="text-lg text-gray-600">
              Trusted across industries for secure transaction management
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-yellow-600">Real Estate</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Secure property purchases with milestone-based payments and document verification.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Property deed verification</li>
                  <li>• Inspection milestones</li>
                  <li>• Title insurance coordination</li>
                  <li>• Closing cost management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-yellow-600">Business Acquisitions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Complex M&A transactions with due diligence milestones and regulatory compliance.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Due diligence periods</li>
                  <li>• Asset verification</li>
                  <li>• Regulatory approvals</li>
                  <li>• Transfer documentation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-yellow-600">Digital Assets</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Secure trading of NFTs, domains, and intellectual property with authenticity verification.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• NFT authenticity checks</li>
                  <li>• Domain ownership verification</li>
                  <li>• IP rights validation</li>
                  <li>• Blockchain confirmation</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-yellow-600">Freelance & Services</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Large-scale project payments with milestone tracking and deliverable verification.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Project milestone tracking</li>
                  <li>• Deliverable verification</li>
                  <li>• Quality assurance checks</li>
                  <li>• Timeline management</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-yellow-600">International Trade</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Cross-border transactions with customs clearance and shipping verification.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Customs documentation</li>
                  <li>• Shipping verification</li>
                  <li>• Quality inspections</li>
                  <li>• Currency conversion</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-yellow-600">Luxury Goods</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  High-value purchases with authenticity verification and secure delivery tracking.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Authenticity certificates</li>
                  <li>• Secure shipping</li>
                  <li>• Insurance coverage</li>
                  <li>• Condition verification</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-600 to-orange-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Trusted Escrow Performance
            </h2>
            <p className="text-xl text-yellow-100">
              Protecting billions in transactions with industry-leading security
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-200 mb-2">$1.8B+</div>
              <div className="text-lg font-medium">Total Protected</div>
              <div className="text-sm text-yellow-200 mt-1">Cumulative escrow value</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-200 mb-2">99.97%</div>
              <div className="text-lg font-medium">Success Rate</div>
              <div className="text-sm text-yellow-200 mt-1">Completed successfully</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-200 mb-2">4.2</div>
              <div className="text-lg font-medium">Days Average</div>
              <div className="text-sm text-yellow-200 mt-1">Transaction completion</div>
            </div>
            
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-200 mb-2">50K+</div>
              <div className="text-lg font-medium">Transactions</div>
              <div className="text-sm text-yellow-200 mt-1">Successfully processed</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gray-900">
        <div className="max-w-4xl mx-auto text-center text-white">
          <DollarSign className="h-16 w-16 text-yellow-400 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Secure Your Next Transaction
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Experience peace of mind with TrustVerify's secure escrow services. 
            Protect your funds and ensure successful transactions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-600 hover:bg-yellow-700 px-8 py-4">
              Create Escrow Now
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4">
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
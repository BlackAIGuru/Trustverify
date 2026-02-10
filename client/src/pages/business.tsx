import { Navigation } from "@/components/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  Building, 
  Store, 
  CreditCard, 
  Banknote,
  Shield,
  CheckCircle,
  ArrowRight,
  TrendingUp,
  Users,
  Globe,
  Award,
  Star,
  Phone,
  Mail
} from "lucide-react";
import { Link } from "wouter";

export default function BusinessPage() {
  const { user } = useAuth();

  const businessSolutions = [
    {
      id: 'enterprise-fraud-shield',
      name: 'TrustVerify Enterprise Fraud Shield',
      title: 'AI-Powered Fraud Detection for Large Enterprises',
      description: 'Enterprise-scale fraud detection with custom machine learning models and dedicated infrastructure.',
      icon: Building,
      color: 'blue',
      stats: [
        { label: 'AI-Powered', value: 'Detection' },
        { label: 'Low False', value: 'Positives' },
        { label: 'Processing Speed', value: '<50ms' },
        { label: 'High', value: 'Scalability' }
      ],
      features: [
        'Custom ML model training',
        'Dedicated cloud infrastructure',
        'Real-time API integration',
        '24/7 enterprise support',
        'Compliance reporting automation',
        'Multi-region deployment',
        'Advanced analytics dashboard'
      ],
      path: '/enterprise-contact'
    },
    {
      id: 'business-transaction-guard',
      name: 'TrustVerify Business Transaction Guard',
      title: 'Payment Security & Chargeback Protection for SMEs',
      description: 'Comprehensive payment protection designed for small to medium enterprises.',
      icon: CreditCard,
      color: 'green',
      features: [
        'Payment gateway integration',
        'Chargeback prevention system',
        'Risk-based authentication',
        'Transaction monitoring',
        'Dispute management portal',
        'Automated evidence collection',
        'Business analytics dashboard'
      ],
      path: '/fraud-prevention'
    },
    {
      id: 'corporate-identity-vault',
      name: 'TrustVerify Corporate Identity Vault',
      title: 'Business Identity Verification & KYB Compliance',
      description: 'Complete Know Your Business (KYB) solution with automated compliance workflows.',
      icon: Shield,
      color: 'purple',
      features: [
        'Automated KYB verification',
        'Business registry validation',
        'Ultimate Beneficial Owner (UBO) screening',
        'Sanctions & PEP checking',
        'Ongoing monitoring',
        'Compliance workflow automation',
        'Regulatory reporting'
      ],
      path: '/identity-verification'
    },
    {
      id: 'marketplace-trust-platform',
      name: 'TrustVerify Marketplace Trust Platform',
      title: 'End-to-End Trust & Escrow for Digital Marketplaces',
      description: 'Complete marketplace security with escrow services, seller verification, and dispute resolution.',
      icon: Store,
      color: 'yellow',
      features: [
        'Multi-party escrow services',
        'Seller identity verification',
        'Automated dispute resolution',
        'Trust score calculation',
        'Payment orchestration',
        'Fraud pattern detection',
        'Marketplace analytics'
      ],
      path: '/escrow-services'
    },
    {
      id: 'financial-compliance-suite',
      name: 'TrustVerify Financial Compliance Suite',
      title: 'AML/CTF Compliance & Risk Management for Financial Institutions',
      description: 'Comprehensive compliance solution for banks, fintechs, and financial service providers.',
      icon: Banknote,
      color: 'red',
      features: [
        'AML/CTF transaction monitoring',
        'Suspicious activity reporting (SAR)',
        'Customer due diligence (CDD)',
        'Enhanced due diligence (EDD)',
        'Regulatory reporting automation',
        'Risk scoring algorithms',
        'Audit trail management'
      ],
      path: '/regulatory-compliance'
    }
  ];


  const businessBenefits = [
    {
      title: "Reduce Fraud Losses",
      description: "Advanced AI-powered detection to prevent fraudulent transactions",
      icon: Shield,
      stat: "AI-Powered"
    },
    {
      title: "Increase Customer Trust",
      description: "Verified users and secure escrow services build confidence",
      icon: CheckCircle,
      stat: "Trust-First"
    },
    {
      title: "Improve Conversion",
      description: "Reduce false positives while maintaining security",
      icon: TrendingUp,
      stat: "Smart Detection"
    },
    {
      title: "Global Compliance",
      description: "Meet regulatory requirements with enterprise-grade security",
      icon: Globe,
      stat: "Enterprise-Ready"
    }
  ];

  const pricingPlans = [
    {
      name: "Business Essential",
      price: "£499",
      period: "month",
      yearlyPrice: "£4,999",
      description: "For growing businesses starting with fraud protection",
      features: [
        "50,000 API calls per month",
        "Email, phone, domain fraud checks",
        "Basic fraud dashboard",
        "Email + API support",
        "Standard KYC verification",
        "Basic escrow protection",
        "Team management (up to 5 users)",
        "Real-time fraud alerts"
      ],
      popular: false
    },
    {
      name: "Business Professional", 
      price: "£999",
      period: "month",
      yearlyPrice: "£9,999", 
      description: "Advanced fraud protection for established businesses",
      features: [
        "150,000 API calls per month",
        "Advanced fraud scoring dashboard",
        "Access to fraud trend reports",
        "Slack/email support SLA",
        "Advanced KYC & compliance",
        "Priority phone support",
        "Custom integrations",
        "White-label solutions",
        "Team management (unlimited users)"
      ],
      popular: true
    },
    {
      name: "Business Enterprise",
      price: "£1,999+",
      period: "month", 
      yearlyPrice: "£20,000+",
      description: "Bespoke solutions for large-scale operations",
      features: [
        "High-volume API access",
        "Dedicated account manager",
        "Custom integrations (KYC, open banking, insurer tie-ins)",
        "24/7 support SLA",
        "Enterprise fraud detection rules",
        "Volume-based pricing",
        "Tailored compliance packages",
        "On-premise deployment options",
        "Multi-region redundancy"
      ],
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Enterprise Security Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Advanced fraud prevention and enterprise security solutions launching Q4 2025. Comprehensive protection for businesses of all sizes.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">Launching Q4 2025</Badge>
            <Badge className="bg-green-100 text-green-800 px-4 py-2">Enterprise-Grade Security</Badge>
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2">AI-Powered Detection</Badge>
          </div>
        </div>

        {/* Business Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {businessSolutions.map((solution) => {
            const Icon = solution.icon;
            return (
              <Card key={solution.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-lg bg-${solution.color}-100`}>
                      <Icon className={`h-6 w-6 text-${solution.color}-600`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">{solution.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-600">{solution.title}</CardDescription>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{solution.description}</p>
                </CardHeader>
                <CardContent>
                  {solution.stats && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Performance Metrics:</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {solution.stats.map((stat, idx) => (
                          <div key={idx} className="text-center py-2">
                            <div className="text-lg font-bold text-green-600">{stat.value}</div>
                            <div className="text-xs text-gray-600">{stat.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {solution.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={solution.path}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Learn More
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Business Benefits */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Businesses Choose TrustVerify</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Proven results across industries with measurable impact on fraud reduction and business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {businessBenefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="bg-white border border-gray-200 text-center">
                  <CardHeader>
                    <div className="mx-auto w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-lg font-semibold text-gray-900">{benefit.title}</CardTitle>
                    <CardDescription className="text-gray-600">{benefit.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{benefit.stat}</div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Business Success Metrics */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Proven Enterprise Performance</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Industry-leading security metrics and performance benchmarks for enterprise deployments launching Q4 2025.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
              <CardHeader>
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-blue-900">AI-Powered</CardTitle>
                  <CardDescription className="text-blue-700 font-medium">Fraud Detection</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-blue-800 text-center text-sm">
                  Advanced machine learning with minimal false positives for enterprise-scale operations.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <CardHeader>
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-green-900">&lt;50ms</CardTitle>
                  <CardDescription className="text-green-700 font-medium">Real-time Processing</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-green-800 text-center text-sm">
                  Ultra-fast transaction processing designed for high-volume enterprise environments.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <CardHeader>
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Users className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-purple-900">High Volume</CardTitle>
                  <CardDescription className="text-purple-700 font-medium">Transaction Processing</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-purple-800 text-center text-sm">
                  Scalable infrastructure built to handle massive enterprise transaction volumes.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Pricing Preview */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Business Pricing</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Flexible pricing plans designed to scale with your business growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingPlans.map((plan, index) => (
              <Card key={index} className={`bg-white border-2 ${plan.popular ? 'border-blue-500 shadow-lg' : 'border-gray-200'}`}>
                {plan.popular && (
                  <div className="bg-blue-500 text-white text-center py-2 rounded-t-lg">
                    <span className="font-semibold">Most Popular</span>
                  </div>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold text-gray-900">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-600">/{plan.period}</span>
                    {plan.yearlyPrice && (
                      <div className="text-sm text-gray-500 mt-1">
                        or {plan.yearlyPrice}/year
                      </div>
                    )}
                  </div>
                  <CardDescription className="text-gray-600">{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className={`w-full ${plan.popular ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-600 hover:bg-gray-700'} text-white`}
                    onClick={() => plan.name === 'Business Enterprise' ? window.location.href = '/contact' : window.location.href = '/auth'}
                  >
                    {plan.name === 'Business Enterprise' ? 'Contact Sales' : 'Get Started'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link href="/pricing">
              <Button variant="outline" size="lg">
                View Complete Pricing
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Enterprise Security Architecture */}
        <div className="bg-gradient-to-br from-slate-50 to-blue-50 rounded-2xl p-12 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Enterprise Security Architecture</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Advanced security infrastructure designed for large-scale business operations launching Q4 2025</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Enterprise Infrastructure */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Building className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Enterprise Infrastructure</h3>
                  <p className="text-sm text-gray-500">Scalable security platform</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-semibold text-gray-900">Multi-Region Deployment</h4>
                  <p className="text-sm text-gray-600">Global infrastructure with local data residency compliance and sub-50ms latency</p>
                </div>
                <div className="border-l-4 border-green-400 pl-4">
                  <h4 className="font-semibold text-gray-900">Auto-Scaling Architecture</h4>
                  <p className="text-sm text-gray-600">Dynamic scaling to handle peak loads with 99.99% uptime SLA guarantee</p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <h4 className="font-semibold text-gray-900">API-First Design</h4>
                  <p className="text-sm text-gray-600">RESTful and GraphQL APIs with comprehensive SDK support for seamless integration</p>
                </div>
              </div>
            </div>

            {/* Business Intelligence */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Business Intelligence</h3>
                  <p className="text-sm text-gray-500">Advanced analytics & reporting</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-blue-400 pl-4">
                  <h4 className="font-semibold text-gray-900">Real-Time Dashboards</h4>
                  <p className="text-sm text-gray-600">Executive and operational dashboards with customizable KPI tracking</p>
                </div>
                <div className="border-l-4 border-green-400 pl-4">
                  <h4 className="font-semibold text-gray-900">Predictive Analytics</h4>
                  <p className="text-sm text-gray-600">ML-powered fraud trend prediction and business risk forecasting</p>
                </div>
                <div className="border-l-4 border-purple-400 pl-4">
                  <h4 className="font-semibold text-gray-900">Compliance Reporting</h4>
                  <p className="text-sm text-gray-600">Automated regulatory reporting with audit trail management and export capabilities</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full">
              <Award className="h-4 w-4" />
              <span className="font-medium">Enterprise-grade security launching Q4 2025</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900 to-indigo-900 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Enterprise Security Solutions Coming Q4 2025
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Be among the first to experience next-generation enterprise fraud prevention and business security solutions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => window.location.href = '/dashboard'}
              >
                Access Dashboard
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => window.location.href = '/auth'}
                >
                  Start Free Trial
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  onClick={() => window.location.href = '/contact'}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Sales
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
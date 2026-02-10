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

  const industrySolutions = [
    {
      id: 'commerce',
      name: 'TrustVerify CommerceGuard',
      title: 'E-commerce Fraud Prevention & Chargeback Protection',
      description: 'Comprehensive fraud protection for online retailers and e-commerce platforms.',
      icon: ShoppingCart,
      color: 'blue',
      stats: [
        { label: 'Fraud Reduction', value: '99.2%' },
        { label: 'Chargeback Prevention', value: '94.7%' },
        { label: 'False Positive Reduction', value: '87.3%' },
        { label: 'Average ROI', value: '340%' }
      ],
      features: [
        'Real-time transaction scoring',
        'Post-transaction forensic analysis',
        'Chargeback dispute & intelligence service',
        'Evidence collection & bank submission',
        'Networked fraud intelligence',
        'Pre-dispute mediation portal',
        'Customer verification'
      ],
      path: '/fraud-prevention'
    },
    {
      id: 'finsecure',
      name: 'TrustVerify FinSecure',
      title: 'Real-time Transaction Monitoring & Compliance for Banks',
      description: 'Enterprise-grade financial fraud prevention and regulatory compliance.',
      icon: Banknote,
      color: 'green',
      features: [
        'AML compliance monitoring',
        'Transaction risk scoring',
        'Post-transaction forensic analysis',
        'Chargeback evidence formatting',
        'Cross-merchant fraud intelligence',
        'Regulatory reporting',
        'Real-time alerts'
      ],
      path: '/regulatory-compliance'
    },
    {
      id: 'marketsafe',
      name: 'TrustVerify MarketSafe',
      title: 'Marketplace Peer-to-Peer Security with Escrow & Verification',
      description: 'Complete trust and security solution for marketplace platforms.',
      icon: Store,
      color: 'purple',
      features: [
        'Peer-to-peer escrow',
        'User verification',
        'Dispute resolution',
        'Trust scoring'
      ],
      path: '/escrow'
    },
    {
      id: 'cryptoshield',
      name: 'TrustVerify CryptoShield',
      title: 'Blockchain & Digital Asset Monitoring for Exchanges & Wallets',
      description: 'Advanced security for cryptocurrency exchanges and digital asset platforms.',
      icon: CreditCard,
      color: 'yellow',
      features: [
        'Blockchain analysis',
        'Wallet monitoring',
        'Transaction tracking',
        'Risk assessment'
      ],
      path: '/website-integrity'
    },
    {
      id: 'enterprise',
      name: 'TrustVerify Enterprise+',
      title: 'Tailored Fraud Prevention with Dedicated Account Management',
      description: 'Custom enterprise solutions with dedicated support and advanced features.',
      icon: Building,
      color: 'red',
      features: [
        'Custom rule engine',
        'Dedicated support',
        'White-label options',
        'SLA guarantees'
      ],
      path: '/contact'
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Chief Risk Officer",
      company: "FinanceFlow Corp",
      content: "TrustVerify reduced our false positives by 87% while catching 99.8% of actual fraud attempts. ROI was evident within 30 days.",
      rating: 5,
      avatar: "SC",
      industry: "Financial Services"
    },
    {
      name: "Marcus Rodriguez",
      role: "Head of Security",
      company: "GlobalPay Systems",
      content: "The API integration was seamless. Real-time detection has saved us $50M+ in fraud losses this year.",
      rating: 5,
      avatar: "MR",
      industry: "Payment Processing"
    },
    {
      name: "Elena Vasquez",
      role: "VP of Operations",
      company: "MarketPlace Pro",
      content: "TrustVerify's escrow services increased our user trust by 65%. Transaction disputes dropped by 78%.",
      rating: 5,
      avatar: "EV",
      industry: "E-commerce"
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
        "500,000+ API calls per month",
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
            Industry Solutions
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Tailored fraud prevention and trust verification solutions for every industry and business size.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">500+ Enterprise Clients</Badge>
            <Badge className="bg-green-100 text-green-800 px-4 py-2">$2.8B+ Protected</Badge>
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2">99.8% Detection Rate</Badge>
          </div>
        </div>

        {/* Industry Solutions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {industrySolutions.map((solution) => {
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

        {/* Client Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Client Results</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how businesses across industries achieve success with TrustVerify.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-white border border-gray-200">
                <CardHeader>
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">{testimonial.avatar}</span>
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">{testimonial.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-600">
                        {testimonial.role} at {testimonial.company}
                      </CardDescription>
                      <Badge className="bg-gray-100 text-gray-700 mt-1">{testimonial.industry}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.content}"</p>
                </CardContent>
              </Card>
            ))}
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

        {/* Global transaction & Fraud intelligence */}
        <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-12 mb-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Global Transaction & Fraud Intelligence</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">Comprehensive fraud intelligence and protection for worldwide operations</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Global Intelligence */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Globe className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Global Intelligence</h3>
                  <p className="text-sm text-gray-500">Worldwide threat protection</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-red-400 pl-4">
                  <h4 className="font-semibold text-gray-900">Invoice & Payment Fraud</h4>
                  <p className="text-sm text-gray-600">Real-time detection of fake invoices and payment redirection across all markets</p>
                </div>
                <div className="border-l-4 border-orange-400 pl-4">
                  <h4 className="font-semibold text-gray-900">Enterprise Security</h4>
                  <p className="text-sm text-gray-600">Comprehensive protection for businesses of all sizes globally</p>
                </div>
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-semibold text-gray-900">E-commerce Protection</h4>
                  <p className="text-sm text-gray-600">Advanced pattern recognition for global online retail threats</p>
                </div>
              </div>
            </div>

            {/* Multi-Platform Coverage */}
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Multi-Platform Security</h3>
                  <p className="text-sm text-gray-500">Universal fraud prevention</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="border-l-4 border-red-400 pl-4">
                  <h4 className="font-semibold text-gray-900">Digital Payment Security</h4>
                  <p className="text-sm text-gray-600">Protection for all digital payment methods and platforms worldwide</p>
                </div>
                <div className="border-l-4 border-orange-400 pl-4">
                  <h4 className="font-semibold text-gray-900">Cross-Border Protection</h4>
                  <p className="text-sm text-gray-600">Multi-currency and international transaction security</p>
                </div>
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-semibold text-gray-900">Social Engineering Defense</h4>
                  <p className="text-sm text-gray-600">AI-powered detection of relationship-based and social engineering attacks</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-8">
            <div className="inline-flex items-center space-x-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full">
              <Award className="h-4 w-4" />
              <span className="font-medium">Global fraud intelligence for maximum protection</span>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-900 to-teal-700 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Global Transaction Security & Fraud Intelligence
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Protect your business with enterprise-grade fraud prevention, AI-powered trust scoring, and secure escrow services.
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
import { Navigation } from "@/components/navigation";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Eye, 
  UserCheck, 
  CreditCard, 
  BarChart3, 
  Globe,
  CheckCircle,
  ArrowRight,
  Zap,
  TrendingUp,
  Award,
  Building
} from "lucide-react";
import { Link } from "wouter";

export default function PlatformPage() {
  const { user } = useAuth();

  const platformServices = [
    {
      id: 'shield',
      name: 'TrustVerify Shield',
      title: 'Active Fraud Detection Engine',
      description: 'Advanced AI-powered algorithms designed to block suspicious activities in real time.',
      icon: Shield,
      color: 'blue',
      stats: [
        { label: 'E-Commerce Protection', value: 'Platform Ready' },
        { label: 'Banking & Financial Security', value: 'Enterprise-Grade' },
        { label: 'Marketplace Fraud Defense', value: 'AI-Powered' },
        { label: 'Enterprise Protection', value: 'Global Scale' }
      ],
      features: [
        'Real-time threat detection',
        'AI-powered risk scoring',
        'Behavioral pattern analysis',
        'Multi-layer protection'
      ],
      path: '/fraud-prevention'
    },
    {
      id: 'id',
      name: 'TrustVerify ID',
      title: 'Advanced Identity Verification',
      description: 'Next-gen KYC & AML compliance for seamless onboarding and fraud prevention.',
      icon: UserCheck,
      color: 'green',
      features: [
        'Document verification',
        'Biometric authentication',
        'AML compliance checks',
        'Global database screening'
      ],
      path: '/verification'
    },
    {
      id: 'escrow',
      name: 'TrustVerify Escrow',
      title: 'Secure Transaction Holding',
      description: 'Automated escrow services ensuring funds are only released after successful completion.',
      icon: CreditCard,
      color: 'purple',
      features: [
        'Automated fund holding',
        'Smart release conditions',
        'Dispute resolution',
        'Multi-currency support'
      ],
      path: '/escrow'
    },
    {
      id: 'riskintel',
      name: 'TrustVerify RiskIntel',
      title: 'Global Threat & Risk Intelligence',
      description: 'Global fraud and risk intelligence platform for proactive defense worldwide.',
      icon: Globe,
      color: 'red',
      features: [
        'Global threat database',
        'Risk intelligence feeds',
        'Proactive threat alerts',
        'Country-specific insights'
      ],
      path: '/fraud-prevention'
    },
    {
      id: 'score',
      name: 'TrustVerify Score',
      title: 'AI-Powered Trust Scoring',
      description: 'Instantly assess the credibility of users, domains, and businesses.',
      icon: BarChart3,
      color: 'yellow',
      features: [
        'Real-time trust scoring',
        'Domain reputation analysis',
        'User credibility assessment',
        'Business verification'
      ],
      path: '/website-integrity'
    },
    {
      id: 'watchtower',
      name: 'TrustVerify Watchtower',
      title: 'Continuous Transaction Monitoring',
      description: 'Always-on pattern recognition and anomaly alerts.',
      icon: Eye,
      color: 'indigo',
      features: [
        'Continuous monitoring',
        'Pattern recognition',
        'Anomaly detection',
        'Real-time alerts'
      ],
      path: '/security-dashboard'
    }
  ];

  const workflowSteps = [
    {
      step: 1,
      title: 'Threat Detected',
      description: 'AI identifies suspicious behavior instantly',
      icon: Shield,
      color: 'red'
    },
    {
      step: 2,
      title: 'Shield Activated',
      description: 'Multi-layer protection stops fraudulent attempts',
      icon: Zap,
      color: 'yellow'
    },
    {
      step: 3,
      title: 'Transaction Secured',
      description: 'Payment or data transfer is safely completed',
      icon: CheckCircle,
      color: 'green'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            TrustVerify Platform Suite
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            Comprehensive fraud prevention and trust verification tools designed for enterprise-grade security and global scale.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2">SOC 2 Certified</Badge>
            <Badge className="bg-green-100 text-green-800 px-4 py-2">256-bit Encryption</Badge>
            <Badge className="bg-purple-100 text-purple-800 px-4 py-2">99.99% Uptime</Badge>
          </div>
        </div>

        {/* Platform Services */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {platformServices.map((service) => {
            const Icon = service.icon;
            return (
              <Card key={service.id} className="bg-white border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className={`p-3 rounded-lg bg-${service.color}-100`}>
                      <Icon className={`h-6 w-6 text-${service.color}-600`} />
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900">{service.name}</CardTitle>
                      <CardDescription className="text-sm text-gray-600">{service.title}</CardDescription>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                </CardHeader>
                <CardContent>
                  {service.stats && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Protection Stats:</h4>
                      <div className="grid grid-cols-1 gap-2">
                        {service.stats.map((stat, idx) => (
                          <div key={idx} className="flex justify-between items-center py-1">
                            <span className="text-sm text-gray-600">{stat.label}</span>
                            <span className="text-sm font-semibold text-green-600">{stat.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link href={service.path}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                      Explore {service.name}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How TrustVerify Works */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How TrustVerify Works</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our intelligent platform provides seamless protection through advanced AI and real-time monitoring.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workflowSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.step} className="text-center">
                  <div className="relative mb-6">
                    <div className={`mx-auto w-16 h-16 bg-${step.color}-100 rounded-full flex items-center justify-center mb-4`}>
                      <Icon className={`h-8 w-8 text-${step.color}-600`} />
                    </div>
                    <div className={`absolute -top-2 -right-2 w-8 h-8 bg-${step.color}-600 text-white rounded-full flex items-center justify-center text-sm font-bold`}>
                      {step.step}
                    </div>
                    {index < workflowSteps.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-1/2 w-full h-0.5 bg-gray-200 transform translate-x-8"></div>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Protect Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Be among the first to experience enterprise-grade fraud prevention with TrustVerify Platform Suite launching 2025.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {user ? (
              <Button 
                size="lg" 
                className="bg-white text-blue-600 hover:bg-gray-100"
                onClick={() => window.location.href = '/dashboard'}
              >
                Access Platform
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            ) : (
              <>
                <Button 
                  size="lg" 
                  className="bg-white text-blue-600 hover:bg-gray-100"
                  onClick={() => window.location.href = '/auth'}
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600"
                  onClick={() => window.location.href = '/demo'}
                >
                  <Building className="h-4 w-4 mr-2" />
                  Request Demo
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
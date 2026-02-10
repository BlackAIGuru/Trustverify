import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { useLocation } from "wouter";
import { 
  Shield, 
  Globe, 
  Code, 
  FileText, 
  Search, 
  ExternalLink,
  BarChart3,
  Users,
  Lock,
  Eye,
  Download,
  Share2,
  Smartphone,
  Monitor,
  Server,
  Database,
  Settings,
  CheckCircle,
  Play,
  ArrowRight
} from "lucide-react";

interface FeatureCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  features: Feature[];
}

interface Feature {
  title: string;
  description: string;
  path: string;
  badge: string;
  icon: React.ElementType;
  demo?: string;
  actions: string[];
}

export default function FeaturesPage() {
  const [, setLocation] = useLocation();
  const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en');

  const featureCategories: FeatureCategory[] = [
    {
      id: 'security',
      title: 'Security & Analysis',
      description: 'Real-time website security analysis and trust verification',
      icon: Shield,
      features: [
        {
          title: 'Website Integrity Checker',
          description: 'Comprehensive real-time security analysis with SSL validation, security headers check, and threat intelligence scanning',
          path: '/website-integrity',
          badge: 'Live Analysis',
          icon: Shield,
          demo: 'Try with google.com',
          actions: [
            'SSL certificate validation',
            'Security headers analysis', 
            'Threat intelligence scanning',
            'Trust score calculation',
            'Detailed security reports'
          ]
        },
        {
          title: 'Fraud Prevention Dashboard',
          description: 'Multi-layered fraud detection with domain analysis, phone verification, and risk assessment tools',
          path: '/fraud-prevention',
          badge: 'Real-time',
          icon: Search,
          demo: 'Check suspicious domains',
          actions: [
            'Domain trust analysis',
            'Phone number verification',
            'Risk pattern detection',
            'Fraud report generation',
            'Blacklist monitoring'
          ]
        }
      ]
    },
    {
      id: 'widgets',
      title: 'Embeddable Widgets',
      description: 'Business-ready trust widgets for website integration',
      icon: Code,
      features: [
        {
          title: 'TrustVerify Badge',
          description: 'Professional certification badges with color-coded trust levels for business compliance display',
          path: '/website-integrity',
          badge: 'B2B Ready',
          icon: CheckCircle,
          demo: 'See live badges',
          actions: [
            'Enterprise certification display',
            'Color-coded trust levels',
            'Compliance status indicators',
            'Professional branding',
            'Customizable appearances'
          ]
        },
        {
          title: 'TrustScore Widget',
          description: 'Embeddable trust score widgets with iframe and JavaScript integration for business websites',
          path: '/website-integrity',
          badge: 'Embeddable',
          icon: Code,
          demo: 'View embed codes',
          actions: [
            'Iframe embedding support',
            'JavaScript integration',
            'Multiple size options',
            'Multilingual support',
            'Real-time trust scores'
          ]
        }
      ]
    },
    {
      id: 'reports',
      title: 'Trust Reports & SEO',
      description: 'Public trust reports optimized for search engines and business credibility',
      icon: FileText,
      features: [
        {
          title: 'Public Trust Reports',
          description: 'SEO-optimized public trust report pages for Google indexing and business credibility verification',
          path: '/trust-report/google.com',
          badge: 'SEO Indexed',
          icon: FileText,
          demo: 'View sample report',
          actions: [
            'Google indexing optimization',
            'Social media sharing',
            'Comprehensive analysis display',
            'Business credibility proof',
            'Public verification links'
          ]
        },
        {
          title: 'PDF Report Generation',
          description: 'Professional PDF reports with detailed security analysis for compliance and documentation',
          path: '/pdf-report',
          badge: 'Professional',
          icon: Download,
          demo: 'Generate sample PDF',
          actions: [
            'Professional formatting',
            'Compliance documentation',
            'Detailed security metrics',
            'Executive summaries',
            'Branding customization'
          ]
        }
      ]
    },
    {
      id: 'api',
      title: 'Developer APIs',
      description: 'Enterprise-grade APIs with comprehensive documentation and testing tools',
      icon: Server,
      features: [
        {
          title: 'RESTful API Suite',
          description: 'Comprehensive fraud prevention APIs with authentication, rate limiting, and detailed documentation',
          path: '/api-reference',
          badge: 'Enterprise',
          icon: Server,
          demo: 'View API docs',
          actions: [
            'REST API endpoints',
            'API key authentication',
            'Rate limiting controls',
            'Usage analytics',
            'Comprehensive documentation'
          ]
        },
        {
          title: 'Developer Portal',
          description: 'Complete developer experience with API keys, testing sandbox, and usage monitoring',
          path: '/api-reference',
          badge: 'Developer Tools',
          icon: Settings,
          demo: 'Access portal',
          actions: [
            'API key management',
            'Testing sandbox',
            'Usage monitoring',
            'Code examples',
            'Support resources'
          ]
        }
      ]
    },
    {
      id: 'multilingual',
      title: 'Global Reach',
      description: 'Multilingual support and international business features',
      icon: Globe,
      features: [
        {
          title: 'Multilingual Interface',
          description: 'Complete platform support for English, Spanish, and French with cultural adaptation',
          path: '/',
          badge: '3 Languages',
          icon: Globe,
          demo: 'Switch languages',
          actions: [
            'English (EN) support',
            'Spanish (ES) localization',
            'French (FR) translation',
            'Cultural adaptation',
            'Regional compliance'
          ]
        },
        {
          title: 'International Compliance',
          description: 'GDPR, CCPA, and international data protection compliance with regional adaptation',
          path: '/regulatory-compliance',
          badge: 'Compliant',
          icon: Lock,
          demo: 'View compliance',
          actions: [
            'GDPR compliance',
            'CCPA adherence',
            'Data protection',
            'Regional requirements',
            'Privacy controls'
          ]
        }
      ]
    }
  ];

  const handleNavigate = (path: string) => {
    setLocation(path);
  };

  const handleDemo = (demoPath: string) => {
    setLocation(demoPath);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              TrustVerify Features
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
              Comprehensive fraud prevention platform with enterprise-grade security analysis, 
              embeddable widgets, and developer-friendly APIs
            </p>
            
            {/* Language Selector */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-sm rounded-lg p-1">
                {(['en', 'es', 'fr'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-3 py-2 rounded text-sm font-medium transition-colors ${
                      language === lang 
                        ? 'bg-white text-blue-900' 
                        : 'text-white hover:bg-white/20'
                    }`}
                  >
                    {lang === 'en' ? '🇺🇸 English' : lang === 'es' ? '🇪🇸 Español' : '🇫🇷 Français'}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => handleNavigate('/website-integrity')}
                className="bg-white text-blue-900 hover:bg-gray-100"
              >
                <Shield className="h-4 w-4 mr-2" />
                Check Website Security
              </Button>
              <Button
                onClick={() => handleNavigate('/fraud-prevention')}
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Search className="h-4 w-4 mr-2" />
                Fraud Prevention
              </Button>
              <Button
                onClick={() => handleNavigate('/api-reference')}
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Code className="h-4 w-4 mr-2" />
                Developer API
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Categories */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Tabs defaultValue="security" className="w-full">
          <TabsList className="grid w-full grid-cols-5 max-w-4xl mx-auto mb-12">
            {featureCategories.map((category) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  className="flex flex-col items-center gap-2 p-4 data-[state=active]:bg-blue-600 data-[state=active]:text-white"
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-xs font-medium hidden sm:block">{category.title}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          {featureCategories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{category.title}</h2>
                <p className="text-lg text-gray-600">{category.description}</p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {category.features.map((feature, index) => {
                  const IconComponent = feature.icon;
                  return (
                    <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <div className="bg-blue-600 p-3 rounded-lg group-hover:bg-blue-700 transition-colors">
                              <IconComponent className="h-6 w-6 text-white" />
                            </div>
                            <div>
                              <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                                {feature.title}
                              </CardTitle>
                              <Badge variant="secondary" className="mb-2">
                                {feature.badge}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {feature.description}
                        </p>
                      </CardHeader>
                      
                      <CardContent className="space-y-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Key Features:</h4>
                          <ul className="space-y-2">
                            {feature.actions.map((action, actionIndex) => (
                              <li key={actionIndex} className="flex items-center gap-3 text-sm text-gray-600">
                                <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                                {action}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-gray-100">
                          <Button
                            onClick={() => handleNavigate(feature.path)}
                            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                          >
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Access Feature
                          </Button>
                          
                          {feature.demo && (
                            <Button
                              onClick={() => handleDemo(feature.path)}
                              variant="outline"
                              className="flex-1"
                            >
                              <Play className="h-4 w-4 mr-2" />
                              {feature.demo}
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Feature Discovery CTA */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Explore TrustVerify?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Start with our most popular features or dive into the full platform
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button
              onClick={() => handleNavigate('/website-integrity')}
              className="bg-white text-blue-900 hover:bg-gray-100 h-auto py-4 flex flex-col items-center gap-2"
            >
              <Shield className="h-8 w-8" />
              <span className="font-semibold">Security Check</span>
              <span className="text-xs opacity-70">Most Popular</span>
            </Button>
            
            <Button
              onClick={() => handleNavigate('/fraud-prevention')}
              variant="outline"
              className="border-white text-white hover:bg-white/10 h-auto py-4 flex flex-col items-center gap-2"
            >
              <Search className="h-8 w-8" />
              <span className="font-semibold">Fraud Prevention</span>
              <span className="text-xs opacity-70">Comprehensive</span>
            </Button>
            
            <Button
              onClick={() => handleNavigate('/api-reference')}
              variant="outline"
              className="border-white text-white hover:bg-white/10 h-auto py-4 flex flex-col items-center gap-2"
            >
              <Code className="h-8 w-8" />
              <span className="font-semibold">Developer API</span>
              <span className="text-xs opacity-70">Enterprise</span>
            </Button>
            
            <Button
              onClick={() => handleNavigate('/auth')}
              className="bg-green-600 text-white hover:bg-green-700 h-auto py-4 flex flex-col items-center gap-2"
            >
              <ArrowRight className="h-8 w-8" />
              <span className="font-semibold">Get Started</span>
              <span className="text-xs opacity-70">Free Trial</span>
            </Button>
          </div>
        </div>
        
        {/* Legal Disclaimer */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <LegalDisclaimer variant="compact" />
        </div>
      </div>
    </div>
  );
}
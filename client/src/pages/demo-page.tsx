import { useState, useEffect } from "react";
import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Clock, 
  Phone, 
  Mail, 
  Globe, 
  Search,
  CreditCard,
  FileText,
  AlertCircle,
  Lock,
  Smartphone,
  Camera,
  Users
} from "lucide-react";

interface FraudCheckResult {
  entity: string;
  type: 'email' | 'phone' | 'website' | 'company';
  riskScore: number;
  riskLabel: 'Safe' | 'Suspicious' | 'High Risk';
  issues: string[];
  recommendations: string[];
  darkWebFound: boolean;
  sources: string[];
}

export default function DemoPage() {
  const [inputValue, setInputValue] = useState("");
  const [inputType, setInputType] = useState<'email' | 'phone' | 'website' | 'company'>('email');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<FraudCheckResult | null>(null);
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState("");

  // Demo fraud examples with realistic scenarios
  const demoExamples: Record<string, FraudCheckResult> = {
    'john@suspicious-bank.com': {
      entity: 'john@suspicious-bank.com',
      type: 'email',
      riskScore: 75,
      riskLabel: 'High Risk',
      issues: [
        'Domain registered recently (3 days ago)',
        'Similar to legitimate banking domain',
        'No valid business registration found',
        'Multiple fraud reports received'
      ],
      recommendations: [
        'Do not provide personal information',
        'Verify through official banking channels',
        'Report suspicious activity',
        'Enable two-factor authentication'
      ],
      darkWebFound: false,
      sources: ['TrustVerify Database', 'Partner Networks', 'Domain Analysis']
    },
    'support@paypal-security.net': {
      entity: 'support@paypal-security.net',
      type: 'email',
      riskScore: 95,
      riskLabel: 'High Risk',
      issues: [
        'Impersonating PayPal official domain',
        'Known phishing domain',
        'SSL certificate mismatch',
        'Reported in multiple scam databases'
      ],
      recommendations: [
        'Block this sender immediately',
        'Never click links from this email',
        'Report to PayPal security team',
        'Check your PayPal account directly'
      ],
      darkWebFound: true,
      sources: ['PhishTank', 'TrustVerify Database', 'SSL Analysis', 'Dark Web Monitoring']
    },
    '+44 20 1234 5678': {
      entity: '+44 20 1234 5678',
      type: 'phone',
      riskScore: 15,
      riskLabel: 'Safe',
      issues: [],
      recommendations: [
        'Number appears legitimate',
        'Associated with verified business',
        'No fraud reports found'
      ],
      darkWebFound: false,
      sources: ['Phone Registry', 'Business Directory', 'TrustVerify Database']
    },
    'crypto-investment-pro.com': {
      entity: 'crypto-investment-pro.com',
      type: 'website',
      riskScore: 88,
      riskLabel: 'High Risk',
      issues: [
        'Promises unrealistic returns (500% profit)',
        'No regulatory registration',
        'Anonymous domain registration',
        'Multiple user complaints'
      ],
      recommendations: [
        'Avoid any investment',
        'Check FCA regulatory status',
        'Research company background',
        'Consult financial advisor'
      ],
      darkWebFound: false,
      sources: ['FCA Database', 'WHOIS Analysis', 'User Reports', 'Content Analysis']
    }
  };

  const detectInputType = (value: string): 'email' | 'phone' | 'website' | 'company' => {
    if (value.includes('@')) return 'email';
    if (value.match(/^\+?[\d\s\-\(\)]+$/)) return 'phone';
    if (value.includes('.') && !value.includes('@')) return 'website';
    return 'company';
  };

  const simulateCheck = async (input: string) => {
    setIsChecking(true);
    setProgress(0);
    setCurrentStep("Initializing fraud check...");

    const steps = [
      "Checking internal fraud database...",
      "Analyzing domain reputation...",
      "Scanning dark web sources...",
      "Cross-referencing partner networks...",
      "Calculating risk score...",
      "Generating recommendations..."
    ];

    for (let i = 0; i < steps.length; i++) {
      setCurrentStep(steps[i]);
      setProgress((i + 1) * 16.67);
      await new Promise(resolve => setTimeout(resolve, 800));
    }

    const detectedType = detectInputType(input);
    setInputType(detectedType);

    // Check if we have a demo result for this input
    if (demoExamples[input]) {
      setResult(demoExamples[input]);
    } else {
      // Generate a random result for demonstration
      const riskScore = Math.floor(Math.random() * 100);
      const riskLabel: 'Safe' | 'Suspicious' | 'High Risk' = 
        riskScore < 30 ? 'Safe' : riskScore < 60 ? 'Suspicious' : 'High Risk';

      setResult({
        entity: input,
        type: detectedType,
        riskScore,
        riskLabel,
        issues: riskScore > 60 ? ['Potential security concerns detected'] : [],
        recommendations: ['Continue with standard precautions'],
        darkWebFound: riskScore > 80,
        sources: ['TrustVerify Database', 'Partner Networks']
      });
    }

    setIsChecking(false);
  };

  const getRiskColor = (riskLabel: string) => {
    switch (riskLabel) {
      case 'Safe': return 'text-green-600 bg-green-50 border-green-200';
      case 'Suspicious': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'High Risk': return 'text-red-600 bg-red-50 border-red-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="h-5 w-5" />;
      case 'phone': return <Phone className="h-5 w-5" />;
      case 'website': return <Globe className="h-5 w-5" />;
      case 'company': return <Shield className="h-5 w-5" />;
      default: return <Search className="h-5 w-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-green-900 to-teal-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 text-green-300" />
          <h1 className="text-5xl font-bold mb-6">Consumer Protection Demo</h1>
          <p className="text-xl text-green-100 leading-relaxed mb-8">
            Experience our personal security solutions. Safeguard your identity, finances, and digital life with advanced consumer protection tools.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center bg-green-800 px-3 py-1 rounded-full">
              <Eye className="h-4 w-4 mr-2" />
              Identity Monitoring
            </div>
            <div className="flex items-center bg-green-800 px-3 py-1 rounded-full">
              <Shield className="h-4 w-4 mr-2" />
              Personal Protection
            </div>
            <div className="flex items-center bg-green-800 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 mr-2" />
              Real-time Alerts
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Fraud Checker Tool */}
        <Card className="mb-12 shadow-xl border-0">
          <CardHeader className="text-center pb-8">
            <CardTitle className="text-3xl font-bold text-gray-900 mb-4">
              Try Our Consumer Protection Tool
            </CardTitle>
            <CardDescription className="text-lg text-gray-600">
              Enter any email, phone number, website, or company name to check for fraud risks and protect yourself
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Enter email, phone, website, or company name..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="flex-1 h-12 text-lg"
                disabled={isChecking}
              />
              <Button 
                onClick={() => simulateCheck(inputValue)}
                disabled={!inputValue || isChecking}
                className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {isChecking ? "Checking..." : "Check for Fraud"}
              </Button>
            </div>

            {/* Demo Examples */}
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-3">Try these demo examples:</p>
              <div className="flex flex-wrap justify-center gap-2">
                {Object.keys(demoExamples).map((example) => (
                  <Button
                    key={example}
                    variant="outline"
                    size="sm"
                    onClick={() => setInputValue(example)}
                    className="text-xs"
                    disabled={isChecking}
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </div>

            {/* Progress Indicator */}
            {isChecking && (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">{currentStep}</span>
                  <span className="text-blue-600">{Math.round(progress)}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}

            {/* Results */}
            {result && !isChecking && (
              <div className="space-y-6 mt-8 p-6 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getIcon(result.type)}
                    <span className="font-semibold text-gray-900">{result.entity}</span>
                  </div>
                  <Badge className={`${getRiskColor(result.riskLabel)} border font-semibold`}>
                    {result.riskLabel}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Risk Score */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Risk Analysis</h4>
                    <div className="flex items-center space-x-3">
                      <div className="flex-1">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Risk Score</span>
                          <span className="font-semibold">{result.riskScore}/100</span>
                        </div>
                        <Progress 
                          value={result.riskScore} 
                          className={`h-3 ${
                            result.riskScore < 30 ? 'text-green-600' : 
                            result.riskScore < 60 ? 'text-yellow-600' : 'text-red-600'
                          }`}
                        />
                      </div>
                    </div>
                    {result.darkWebFound && (
                      <div className="flex items-center space-x-2 text-red-600 bg-red-50 p-2 rounded">
                        <AlertTriangle className="h-4 w-4" />
                        <span className="text-sm font-medium">Found on dark web</span>
                      </div>
                    )}
                  </div>

                  {/* Sources */}
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">Data Sources</h4>
                    <div className="space-y-1">
                      {result.sources.map((source, idx) => (
                        <div key={idx} className="flex items-center space-x-2 text-sm">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-gray-600">{source}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Issues and Recommendations */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {result.issues.length > 0 && (
                    <div className="space-y-3">
                      <h4 className="font-semibold text-gray-900 flex items-center">
                        <XCircle className="h-4 w-4 text-red-500 mr-2" />
                        Security Issues
                      </h4>
                      <ul className="space-y-2">
                        {result.issues.map((issue, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            {issue}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <Shield className="h-4 w-4 text-blue-500 mr-2" />
                      Recommendations
                    </h4>
                    <ul className="space-y-2">
                      {result.recommendations.map((rec, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start">
                          <span className="text-blue-500 mr-2">•</span>
                          {rec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Consumer Service Offerings */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Personal Security Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Comprehensive personal protection solutions. Advanced security for individuals and families.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-center">TrustVerify Personal Monitor</CardTitle>
                <CardDescription className="text-center">24/7 Identity & Dark Web Surveillance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 text-center mb-4">
                  Continuous monitoring of your personal information across the dark web and breach databases.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Dark web credential monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Data breach alert system
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Social media profile monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Public records surveillance
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CreditCard className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-xl text-center">TrustVerify Credit Guardian</CardTitle>
                <CardDescription className="text-center">Complete Credit & Financial Protection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 text-center mb-4">
                  Advanced credit monitoring with real-time alerts and identity theft protection.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    3-bureau credit monitoring
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Identity theft alerts
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Credit score tracking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Financial account monitoring
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock className="h-8 w-8 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-center">TrustVerify Digital Vault</CardTitle>
                <CardDescription className="text-center">Secure Personal Document Storage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 text-center mb-4">
                  Military-grade encryption for your important documents with biometric access control.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    End-to-end encryption storage
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Biometric authentication
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Secure document sharing
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Emergency access recovery
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-8 w-8 text-red-600" />
                </div>
                <CardTitle className="text-xl text-center">TrustVerify Mobile Shield</CardTitle>
                <CardDescription className="text-center">Smartphone & Device Security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 text-center mb-4">
                  Comprehensive mobile device protection against scams, malware, and privacy threats.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Real-time scam call blocking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    SMS phishing protection
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    App security scanning
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Wi-Fi safety monitoring
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-16 w-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-yellow-600" />
                </div>
                <CardTitle className="text-xl text-center">TrustVerify Web Guardian</CardTitle>
                <CardDescription className="text-center">Browser & Online Shopping Protection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 text-center mb-4">
                  Safe browsing protection with real-time website verification and shopping security.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Malicious website blocking
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Shopping site verification
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Privacy protection tools
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Safe download scanning
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="h-16 w-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-indigo-600" />
                </div>
                <CardTitle className="text-xl text-center">TrustVerify Family Plus</CardTitle>
                <CardDescription className="text-center">Family-Wide Security Protection</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-gray-600 text-center mb-4">
                  Comprehensive family protection plan covering all members with centralized monitoring and control.
                </p>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Up to 6 family members
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Parental monitoring tools
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Centralized security dashboard
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Family emergency response
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
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
  Camera
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

export default function FraudDemo() {
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
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 text-blue-300" />
          <h1 className="text-5xl font-bold mb-6">Consumer Protection Demo</h1>
          <p className="text-xl text-blue-100 leading-relaxed mb-8">
            Experience TrustVerify's consumer fraud protection in action. Test emails, phone numbers, websites, 
            and companies for potential security risks with real-time analysis.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="flex items-center bg-blue-800 px-3 py-1 rounded-full">
              <Eye className="h-4 w-4 mr-2" />
              Dark Web Monitoring
            </div>
            <div className="flex items-center bg-blue-800 px-3 py-1 rounded-full">
              <Shield className="h-4 w-4 mr-2" />
              Real-time Analysis
            </div>
            <div className="flex items-center bg-blue-800 px-3 py-1 rounded-full">
              <Clock className="h-4 w-4 mr-2" />
              Instant Results
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

        {/* Feature Showcase */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="h-16 w-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Eye className="h-8 w-8 text-blue-600" />
              </div>
              <CardTitle className="text-xl">Dark Web Monitoring</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Continuously scan the dark web for compromised credentials and personal information leaks.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CreditCard className="h-8 w-8 text-green-600" />
              </div>
              <CardTitle className="text-xl">Identity Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Monitor credit reports and identity usage across multiple bureaus for suspicious activity.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center border-0 shadow-lg">
            <CardHeader>
              <div className="h-16 w-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-purple-600" />
              </div>
              <CardTitle className="text-xl">ID Vault</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Securely store and share personal documents with biometric protection and time-limited access.
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Browser Extension Demo */}
        <Card className="mb-16 border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center">Browser Extension Protection</CardTitle>
            <CardDescription className="text-center text-lg">
              Real-time warnings when visiting suspicious websites
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-gray-100 p-6 rounded-lg">
              <div className="bg-white rounded border shadow-sm p-4 mb-4">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="h-4 w-4 bg-red-500 rounded-full"></div>
                  <div className="h-4 w-4 bg-yellow-500 rounded-full"></div>
                  <div className="h-4 w-4 bg-green-500 rounded-full"></div>
                  <div className="flex-1 bg-gray-200 rounded px-3 py-1 text-sm">
                    https://suspicious-bank-offers.com/login
                  </div>
                </div>
                <div className="bg-red-50 border border-red-200 rounded p-4">
                  <div className="flex items-center space-x-3">
                    <AlertCircle className="h-6 w-6 text-red-600" />
                    <div>
                      <h4 className="font-semibold text-red-800">⚠️ TrustVerify Warning</h4>
                      <p className="text-sm text-red-700">
                        This website has been flagged as suspicious. Similar domain to legitimate banking sites.
                      </p>
                      <div className="flex space-x-2 mt-2">
                        <Button size="sm" variant="outline" className="text-red-700 border-red-300">
                          Block Site
                        </Button>
                        <Button size="sm" variant="outline" className="text-red-700 border-red-300">
                          Report Fraud
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-12 rounded-xl">
          <h2 className="text-3xl font-bold mb-4">Ready to Protect Yourself?</h2>
          <p className="text-xl mb-8 opacity-90">
            Get started with TrustVerify's comprehensive fraud protection today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 font-semibold"
              onClick={() => window.location.href = '/pricing'}
            >
              View Plans & Pricing
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 font-semibold"
              onClick={() => window.location.href = '/auth'}
            >
              Start Free Trial
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
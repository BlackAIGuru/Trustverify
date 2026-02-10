import { useState } from "react";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { TrustScoreWidget } from "@/components/TrustScoreWidget";
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  TrendingUp,
  Users,
  Lock,
  Zap,
  Target,
  Award,
  FileCheck,
  Activity
} from "lucide-react";

export default function TrustScoreDemo() {
  const [selectedDemo, setSelectedDemo] = useState<'excellent' | 'good' | 'warning' | 'critical'>('excellent');
  const [customDomain, setCustomDomain] = useState("");
  const [analyzing, setAnalyzing] = useState(false);
  const [progress, setProgress] = useState(0);

  const demoScenarios = {
    excellent: {
      domain: "trustverify.io",
      trustScore: 94,
      riskLevel: 'low' as const,
      title: "Excellent Trust Score",
      description: "This business has exceptional security practices and verification",
      factors: [
        { label: "KYB Verified", value: "✓ Complete", status: "success" },
        { label: "Security Certificate", value: "A+ Rating", status: "success" },
        { label: "Transaction History", value: "500+ Verified", status: "success" },
        { label: "User Reviews", value: "4.9/5.0", status: "success" },
        { label: "Payment Security", value: "PCI DSS Level 1", status: "success" },
        { label: "Fraud Incidents", value: "0 in 12 months", status: "success" }
      ],
      recommendation: "Safe to transact with full confidence"
    },
    good: {
      domain: "ecommerce-store.com",
      trustScore: 76,
      riskLevel: 'low' as const,
      title: "Good Trust Score",
      description: "This business meets standard verification requirements",
      factors: [
        { label: "KYB Verified", value: "✓ Basic", status: "success" },
        { label: "Security Certificate", value: "B Rating", status: "success" },
        { label: "Transaction History", value: "150+ Verified", status: "success" },
        { label: "User Reviews", value: "4.2/5.0", status: "success" },
        { label: "Payment Security", value: "PCI DSS Level 2", status: "warning" },
        { label: "Fraud Incidents", value: "1 resolved", status: "warning" }
      ],
      recommendation: "Safe to transact with standard precautions"
    },
    warning: {
      domain: "new-marketplace.com",
      trustScore: 58,
      riskLevel: 'medium' as const,
      title: "Medium Trust Score",
      description: "This business requires additional verification",
      factors: [
        { label: "KYB Verified", value: "Pending", status: "warning" },
        { label: "Security Certificate", value: "C Rating", status: "warning" },
        { label: "Transaction History", value: "25 Verified", status: "warning" },
        { label: "User Reviews", value: "3.8/5.0", status: "warning" },
        { label: "Payment Security", value: "Basic SSL", status: "warning" },
        { label: "Fraud Incidents", value: "2 under review", status: "error" }
      ],
      recommendation: "Exercise caution - Use escrow for transactions"
    },
    critical: {
      domain: "suspicious-site.com",
      trustScore: 32,
      riskLevel: 'critical' as const,
      title: "Critical Risk Score",
      description: "This business shows multiple red flags",
      factors: [
        { label: "KYB Verified", value: "✗ Failed", status: "error" },
        { label: "Security Certificate", value: "F Rating", status: "error" },
        { label: "Transaction History", value: "0 Verified", status: "error" },
        { label: "User Reviews", value: "2.1/5.0", status: "error" },
        { label: "Payment Security", value: "None", status: "error" },
        { label: "Fraud Incidents", value: "5+ reported", status: "error" }
      ],
      recommendation: "⚠️ DO NOT TRANSACT - High fraud risk detected"
    }
  };

  const handleAnalyze = () => {
    if (!customDomain.trim()) return;
    
    setAnalyzing(true);
    setProgress(0);
    
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setAnalyzing(false);
          return 100;
        }
        return prev + 20;
      });
    }, 300);
  };

  const scenario = demoScenarios[selectedDemo];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <div className="p-4 bg-gradient-to-br from-[#1DBF73] to-[#0A3778] rounded-2xl">
              <Shield className="h-12 w-12 text-white" />
            </div>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-[#0A3778] to-[#1DBF73] bg-clip-text text-transparent mb-4">
            TrustScore Intelligence
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real-time business verification and fraud risk assessment powered by AI
          </p>
        </div>

        {/* How It Works */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="border-2 border-[#1DBF73]/20 hover:border-[#1DBF73]/50 transition-all h-full">
            <CardHeader className="pb-6 pt-6 px-6">
              <div className="p-3 bg-gradient-to-br from-[#1DBF73]/10 to-[#0A3778]/10 rounded-xl w-fit mb-3">
                <Activity className="h-8 w-8 text-[#1DBF73]" />
              </div>
              <CardTitle className="text-xl leading-tight mb-2">Real-Time Analysis</CardTitle>
              <CardDescription className="leading-relaxed">
                We analyze 50+ data points in real-time including KYB verification, security certificates, and transaction history
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-2 border-[#1DBF73]/20 hover:border-[#1DBF73]/50 transition-all h-full">
            <CardHeader className="pb-6 pt-6 px-6">
              <div className="p-3 bg-gradient-to-br from-[#1DBF73]/10 to-[#0A3778]/10 rounded-xl w-fit mb-3">
                <Target className="h-8 w-8 text-[#1DBF73]" />
              </div>
              <CardTitle className="text-xl leading-tight mb-2">Risk Assessment</CardTitle>
              <CardDescription className="leading-relaxed">
                AI-powered algorithms calculate precise fraud risk scores from 0-100 based on verified business data
              </CardDescription>
            </CardHeader>
          </Card>
          
          <Card className="border-2 border-[#1DBF73]/20 hover:border-[#1DBF73]/50 transition-all h-full">
            <CardHeader className="pb-6 pt-6 px-6">
              <div className="p-3 bg-gradient-to-br from-[#1DBF73]/10 to-[#0A3778]/10 rounded-xl w-fit mb-3">
                <Award className="h-8 w-8 text-[#1DBF73]" />
              </div>
              <CardTitle className="text-xl leading-tight mb-2">Trust Verification</CardTitle>
              <CardDescription className="leading-relaxed">
                Verified businesses receive public trust badges and higher scores - building customer confidence
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Demo Selector */}
        <Card className="mb-8 border-2 border-[#0A3778]/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Zap className="h-6 w-6 text-[#1DBF73]" />
              Live TrustScore Scenarios
            </CardTitle>
            <CardDescription>
              See how different business profiles receive different trust scores
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Button
                onClick={() => setSelectedDemo('excellent')}
                variant={selectedDemo === 'excellent' ? 'default' : 'outline'}
                className={selectedDemo === 'excellent' ? 'bg-[#1DBF73] hover:bg-[#17A362]' : ''}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Excellent (94)
              </Button>
              <Button
                onClick={() => setSelectedDemo('good')}
                variant={selectedDemo === 'good' ? 'default' : 'outline'}
                className={selectedDemo === 'good' ? 'bg-[#1DBF73] hover:bg-[#17A362]' : ''}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Good (76)
              </Button>
              <Button
                onClick={() => setSelectedDemo('warning')}
                variant={selectedDemo === 'warning' ? 'default' : 'outline'}
                className={selectedDemo === 'warning' ? 'bg-amber-500 hover:bg-amber-600' : ''}
              >
                <AlertTriangle className="mr-2 h-4 w-4" />
                Medium (58)
              </Button>
              <Button
                onClick={() => setSelectedDemo('critical')}
                variant={selectedDemo === 'critical' ? 'default' : 'outline'}
                className={selectedDemo === 'critical' ? 'bg-red-500 hover:bg-red-600' : ''}
              >
                <XCircle className="mr-2 h-4 w-4" />
                Critical (32)
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* TrustScore Widget Preview */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">{scenario.title}</h3>
                <p className="text-gray-600">{scenario.description}</p>
                
                <div className="flex justify-center py-6 bg-gray-50 rounded-lg">
                  <TrustScoreWidget
                    domain={scenario.domain}
                    trustScore={scenario.trustScore}
                    riskLevel={scenario.riskLevel}
                    size="large"
                    showEmbed={true}
                  />
                </div>
              </div>

              {/* Trust Factors */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900">Trust Factors Analysis</h3>
                <div className="space-y-3">
                  {scenario.factors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded-lg border">
                      <div className="flex items-center gap-3">
                        {factor.status === 'success' && <CheckCircle className="h-5 w-5 text-green-500" />}
                        {factor.status === 'warning' && <AlertTriangle className="h-5 w-5 text-amber-500" />}
                        {factor.status === 'error' && <XCircle className="h-5 w-5 text-red-500" />}
                        <span className="font-medium text-gray-700">{factor.label}</span>
                      </div>
                      <Badge variant={factor.status === 'success' ? 'default' : 'destructive'}>
                        {factor.value}
                      </Badge>
                    </div>
                  ))}
                </div>

                <div className={`mt-6 p-4 rounded-lg border-2 ${
                  scenario.riskLevel === 'low' ? 'bg-green-50 border-green-200' :
                  scenario.riskLevel === 'medium' ? 'bg-amber-50 border-amber-200' :
                  'bg-red-50 border-red-200'
                }`}>
                  <p className={`font-bold ${
                    scenario.riskLevel === 'low' ? 'text-green-800' :
                    scenario.riskLevel === 'medium' ? 'text-amber-800' :
                    'text-red-800'
                  }`}>
                    {scenario.recommendation}
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Analysis */}
        <Card className="border-2 border-[#1DBF73]/20">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <FileCheck className="h-6 w-6 text-[#1DBF73]" />
              Try Your Own Domain
            </CardTitle>
            <CardDescription>
              Enter any domain to see a simulated TrustScore analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 mb-4">
              <Input
                placeholder="example.com"
                value={customDomain}
                onChange={(e) => setCustomDomain(e.target.value)}
                className="flex-1"
                data-testid="input-custom-domain"
              />
              <Button 
                onClick={handleAnalyze}
                className="bg-gradient-to-r from-[#1DBF73] to-[#0A3778] hover:from-[#17A362] hover:to-[#0D4594]"
                disabled={analyzing}
                data-testid="button-analyze"
              >
                {analyzing ? 'Analyzing...' : 'Analyze'}
              </Button>
            </div>
            
            {analyzing && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Analyzing domain...</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Key Benefits */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="p-3 bg-[#1DBF73]/10 rounded-full w-fit mx-auto mb-4">
              <Lock className="h-8 w-8 text-[#1DBF73]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Fraud Prevention</h3>
            <p className="text-gray-600">Detect suspicious businesses before any transaction occurs</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="p-3 bg-[#1DBF73]/10 rounded-full w-fit mx-auto mb-4">
              <TrendingUp className="h-8 w-8 text-[#1DBF73]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Build Trust</h3>
            <p className="text-gray-600">Verified businesses see 40% higher conversion rates</p>
          </div>
          
          <div className="text-center p-6 bg-white rounded-xl shadow-sm">
            <div className="p-3 bg-[#1DBF73]/10 rounded-full w-fit mx-auto mb-4">
              <Users className="h-8 w-8 text-[#1DBF73]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Confidence</h3>
            <p className="text-gray-600">Public trust badges increase customer confidence by 85%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

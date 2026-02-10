import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { Link } from "wouter";
import { 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  UserCheck,
  Eye,
  Globe,
  CreditCard,
  AlertTriangle,
  TrendingUp,
  Lock,
  Zap,
  FileCheck,
  Database,
  Network,
  ShoppingCart,
  Banknote,
  Store,
  Briefcase,
  Settings,
  MessageSquare,
  Clock,
  Gavel,
  DollarSign
} from "lucide-react";

interface DemoStep {
  id: number;
  title: string;
  description: string;
  component: React.ReactNode;
  duration: number;
}

export default function DemoPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  const demoSteps: DemoStep[] = [
    {
      id: 1,
      title: "Transaction Initiation",
      description: "A new transaction is created and enters our fraud prevention system",
      duration: 3000,
      component: (
        <div className="space-y-4">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-semibold text-blue-900">New Transaction Request</h4>
              <Badge className="bg-blue-100 text-blue-800">Processing</Badge>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-gray-600 min-w-0">Amount:</span>
                <span className="font-semibold sm:ml-2 truncate">£2,500.00</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-gray-600 min-w-0">Type:</span>
                <span className="font-semibold sm:ml-2 truncate">E-commerce Purchase</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center min-w-0">
                <span className="text-gray-600 flex-shrink-0">Buyer:</span>
                <span className="font-semibold sm:ml-2 truncate text-xs sm:text-sm break-all">john.buyer@email.com</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center min-w-0">
                <span className="text-gray-600 flex-shrink-0">Seller:</span>
                <span className="font-semibold sm:ml-2 truncate text-xs sm:text-sm break-all">secure.store@merchant.com</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-green-50 border border-green-200">
              <div className="flex items-center space-x-2 mb-2">
                <ShoppingCart className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">E-commerce</span>
              </div>
              <div className="text-sm text-green-600">Category: Electronics</div>
            </div>
            <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
              <div className="flex items-center space-x-2 mb-2">
                <CreditCard className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-blue-800">Payment</span>
              </div>
              <div className="text-sm text-blue-600">Method: Credit Card</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: "Identity Verification",
      description: "Advanced KYC/AML checks verify both parties in real-time",
      duration: 4000,
      component: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border-2 border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-green-800">Buyer Identity Verified</span>
                  <div className="text-xs text-green-600">Level 3 KYC Complete</div>
                </div>
              </div>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border-2 border-green-200">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-green-600 flex items-center justify-center">
                  <UserCheck className="h-5 w-5 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-green-800">Seller Identity Verified</span>
                  <div className="text-xs text-green-600">Business License Confirmed</div>
                </div>
              </div>
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-blue-50 text-center">
              <FileCheck className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xs font-medium text-blue-800">Document Scan</div>
              <div className="text-xs text-blue-600">Verified</div>
            </div>
            <div className="p-3 rounded-xl bg-green-50 text-center">
              <Eye className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-xs font-medium text-green-800">Biometric</div>
              <div className="text-xs text-green-600">Matched</div>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 text-center">
              <Database className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-xs font-medium text-purple-800">AML Check</div>
              <div className="text-xs text-purple-600">Clear</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: "Real-Time Fraud Detection",
      description: "AI algorithms analyze transaction patterns for suspicious activity",
      duration: 5000,
      component: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-yellow-50 border-2 border-yellow-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-yellow-600 flex items-center justify-center">
                  <Eye className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-yellow-800">AI Fraud Analysis</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
                <span className="text-sm font-bold text-yellow-600">Analyzing</span>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Device fingerprinting</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Behavioral analysis</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Pattern recognition</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Risk assessment</span>
                <CheckCircle className="h-4 w-4 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-xl bg-green-50 text-center">
              <Zap className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-xs font-medium text-green-800">AI Score</div>
              <div className="text-sm font-bold text-green-600">95/100</div>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 text-center">
              <Network className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xs font-medium text-blue-800">Risk Level</div>
              <div className="text-sm font-bold text-blue-600">Low</div>
            </div>
            <div className="p-3 rounded-xl bg-purple-50 text-center">
              <TrendingUp className="h-6 w-6 text-purple-600 mx-auto mb-2" />
              <div className="text-xs font-medium text-purple-800">Confidence</div>
              <div className="text-sm font-bold text-purple-600">99.8%</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: "Global Risk Intelligence",
      description: "Cross-platform database checks for known fraud indicators",
      duration: 3000,
      component: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-gray-50 border-2 border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-gray-600 flex items-center justify-center">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-gray-800">Global Database Check</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Complete</Badge>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Fraud watchlists</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Blacklist check</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">PEP screening</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Sanctions check</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Cross-reference</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Risk scoring</span>
                  <CheckCircle className="h-4 w-4 text-green-600" />
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center p-4 rounded-xl bg-green-50 border border-green-200">
            <div className="text-2xl font-bold text-green-600 mb-1">Global</div>
            <div className="text-sm text-green-800">Coverage Ready</div>
          </div>
        </div>
      )
    },
    {
      id: 5,
      title: "Escrow Protection",
      description: "Funds are securely held until transaction completion",
      duration: 4000,
      component: (
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-blue-50 border-2 border-blue-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <span className="font-semibold text-blue-800">Escrow Protection Active</span>
              </div>
              <Badge className="bg-blue-100 text-blue-800">Secured</Badge>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white border border-blue-100">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="text-sm font-medium text-gray-800">Funds Secured in Escrow</span>
                <span className="ml-auto font-bold text-blue-600">£2,500.00</span>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-white border border-blue-100">
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <span className="text-sm font-medium text-gray-800">Awaiting Delivery Confirmation</span>
                <div className="ml-auto">
                  <div className="w-4 h-4 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-100">
                <div className="w-3 h-3 rounded-full bg-gray-400"></div>
                <span className="text-sm font-medium text-gray-500">Auto-Release to Seller</span>
                <span className="ml-auto text-sm text-gray-500">Pending</span>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-xl bg-green-50 text-center">
              <Lock className="h-6 w-6 text-green-600 mx-auto mb-2" />
              <div className="text-xs font-medium text-green-800">256-bit Encryption</div>
            </div>
            <div className="p-3 rounded-xl bg-blue-50 text-center">
              <Settings className="h-6 w-6 text-blue-600 mx-auto mb-2" />
              <div className="text-xs font-medium text-blue-800">Auto-Release</div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 6,
      title: "Transaction Approved",
      description: "All security checks passed - transaction is approved and secured",
      duration: 2000,
      component: (
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-green-50 border-2 border-green-200 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-600 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-white" />
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2">Transaction Approved!</h3>
            <p className="text-green-600 mb-4">All fraud prevention checks completed successfully</p>
            <Badge className="bg-green-100 text-green-800 px-4 py-2">Secure & Protected</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl bg-white border border-green-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">99.8%</div>
                <div className="text-sm text-green-800">Detection Rate</div>
              </div>
            </div>
            <div className="p-4 rounded-xl bg-white border border-blue-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">&lt; 3s</div>
                <div className="text-sm text-blue-800">Processing Time</div>
              </div>
            </div>
          </div>
          
          <div className="text-center p-4 rounded-xl bg-blue-50">
            <p className="text-sm text-blue-800">
              <strong>£1.9B+</strong> protected annually through our fraud prevention system
            </p>
          </div>
        </div>
      )
    },
    {
      id: 7,
      title: "Dispute Resolution Process",
      description: "TrustVerify's 72-hour dispute resolution with independent arbitration",
      duration: 5000,
      component: (
        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-orange-50 border-2 border-orange-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-orange-600 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-orange-900">Dispute Initiated</h4>
                  <p className="text-sm text-orange-700">Buyer reported item not received</p>
                </div>
              </div>
              <Badge className="bg-orange-100 text-orange-800">Under Review</Badge>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Dispute ID:</span>
                <span className="font-semibold ml-2">#DR-2025-001</span>
              </div>
              <div>
                <span className="text-gray-600">Resolution Deadline:</span>
                <span className="font-semibold ml-2">72 hours</span>
              </div>
            </div>
          </div>
          
          {/* Resolution Timeline */}
          <div className="space-y-3">
            <h5 className="font-semibold text-gray-900">Resolution Timeline</h5>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-green-50 border border-green-200">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-green-800">Evidence Collection</div>
                  <div className="text-xs text-green-600">Completed - 15 minutes</div>
                </div>
                <div className="text-xs text-green-600">✓ Done</div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
                <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-blue-800">AI Analysis & Verification</div>
                  <div className="text-xs text-blue-600">Analyzing shipping records & communications</div>
                </div>
                <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-600">Fund Resolution</div>
                  <div className="text-xs text-gray-500">Automatic settlement within 72 hours</div>
                </div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 border border-gray-200">
                <div className="w-6 h-6 rounded-full bg-gray-400 flex items-center justify-center">
                  <Gavel className="h-4 w-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="font-medium text-gray-600">Independent Arbitration</div>
                  <div className="text-xs text-gray-500">Expert review if needed - final step</div>
                </div>
                <div className="text-xs text-gray-500">Pending</div>
              </div>
            </div>
          </div>
          
          {/* USP Highlight */}
          <div className="p-4 rounded-xl bg-gradient-to-r from-blue-50 to-teal-50 border-2 border-teal-200">
            <div className="flex items-center space-x-2 mb-2">
              <Shield className="h-5 w-5 text-teal-600" />
              <span className="font-semibold text-teal-800">Complete Resolution Process</span>
            </div>
            <div className="text-sm text-teal-700">
              Unlike competitors who only detect fraud, TrustVerify provides complete dispute resolution with guaranteed settlement.
            </div>
          </div>
        </div>
      )
    }
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = prev + 100;
          const currentStepDuration = demoSteps[currentStep]?.duration || 3000;
          
          if (newProgress >= currentStepDuration) {
            if (currentStep < demoSteps.length - 1) {
              setCurrentStep((prevStep) => prevStep + 1);
              return 0;
            } else {
              setIsPlaying(false);
              return currentStepDuration;
            }
          }
          return newProgress;
        });
      }, 100);
    }
    
    return () => clearInterval(interval);
  }, [isPlaying, currentStep, demoSteps]);

  const resetDemo = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsPlaying(false);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const currentStepData = demoSteps[currentStep];
  const progressPercentage = currentStepData ? (progress / currentStepData.duration) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">TrustVerify Live Demo</h1>
              <p className="text-lg text-gray-600 mt-2">Experience real-time fraud prevention in action</p>
            </div>
            <div className="flex items-center space-x-4">
              <Badge className="bg-green-100 text-green-800 px-4 py-2">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                Live System
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Demo Controls */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Play className="h-5 w-5 text-blue-600" />
                  <span>Demo Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Progress</span>
                    <span className="font-medium">{currentStep + 1} / {demoSteps.length}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-100"
                      style={{ width: `${((currentStep / demoSteps.length) * 100) + (progressPercentage / demoSteps.length)}%` }}
                    ></div>
                  </div>
                </div>

                {/* Control Buttons */}
                <div className="flex space-x-3">
                  <Button 
                    onClick={togglePlayPause}
                    className={`flex-1 ${isPlaying ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-4 w-4 mr-2" />
                        Pause
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Play
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={resetDemo}
                    variant="outline"
                    className="flex-1"
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>

                {/* Step Navigation */}
                <div className="space-y-2">
                  <h4 className="font-medium text-gray-900">Demo Steps</h4>
                  <div className="space-y-1">
                    {demoSteps.map((step, index) => (
                      <button
                        key={step.id}
                        onClick={() => {
                          setCurrentStep(index);
                          setProgress(0);
                          setIsPlaying(false);
                        }}
                        className={`w-full text-left p-3 rounded-lg text-sm transition-colors ${
                          index === currentStep
                            ? 'bg-blue-100 text-blue-800 border border-blue-200'
                            : index < currentStep
                            ? 'bg-green-50 text-green-800 border border-green-200'
                            : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          {index < currentStep ? (
                            <CheckCircle className="h-4 w-4 text-green-600" />
                          ) : index === currentStep ? (
                            <div className="w-4 h-4 rounded-full bg-blue-600"></div>
                          ) : (
                            <div className="w-4 h-4 rounded-full bg-gray-300"></div>
                          )}
                          <span className="font-medium">{step.title}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Demo Content */}
          <div className="lg:col-span-2">
            <Card className="h-full">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-xl text-gray-900">
                      {currentStepData?.title}
                    </CardTitle>
                    <p className="text-gray-600 mt-1">{currentStepData?.description}</p>
                  </div>
                  {isPlaying && (
                    <div className="flex items-center space-x-2 text-blue-600">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Processing</span>
                    </div>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                {currentStepData?.component}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-white rounded-2xl shadow-lg p-8 max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Protect Your Business?
            </h2>
            <p className="text-lg text-gray-600 mb-6">
              Be among the first to experience next-generation fraud prevention with TrustVerify launching 2025.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/auth">
                <Button 
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  Start Free Trial
                  <ArrowRight className="h-5 w-5 ml-2" />
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-green-600 text-green-600 hover:bg-green-50 px-8 py-3"
                >
                  Contact Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
        
        {/* Legal Disclaimer */}
        <div className="mt-12">
          <LegalDisclaimer variant="compact" />
        </div>
      </div>
    </div>
  );
}
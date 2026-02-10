import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Shield, 
  Building2, 
  FileCheck, 
  Lock, 
  Truck, 
  Timer, 
  DollarSign, 
  Scale, 
  Gavel 
} from "lucide-react";

interface FlowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  icon: any;
  details?: string;
  timestamp?: Date;
}

export default function BusinessFlowDemo() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [transactionId, setTransactionId] = useState<number | null>(null);

  const [flowSteps, setFlowSteps] = useState<FlowStep[]>([
    {
      id: 'transaction_creation',
      title: 'Transaction Created',
      description: 'Buyer initiates transaction with seller',
      status: 'pending',
      icon: DollarSign
    },
    {
      id: 'kyc_verification',
      title: 'KYC Verification',
      description: 'Identity verification for both parties',
      status: 'pending',
      icon: Shield
    },
    {
      id: 'kyb_verification',
      title: 'KYB Verification (Business)',
      description: 'Business verification for corporate transactions',
      status: 'pending',
      icon: Building2
    },
    {
      id: 'aml_check',
      title: 'AML Compliance Check',
      description: 'Anti-money laundering screening',
      status: 'pending',
      icon: FileCheck
    },
    {
      id: 'verification_approved',
      title: 'Verification Complete',
      description: 'All verification checks passed',
      status: 'pending',
      icon: CheckCircle
    },
    {
      id: 'escrow_deposit',
      title: 'Escrow Deposit',
      description: 'Funds secured in TrustVerify escrow',
      status: 'pending',
      icon: Lock
    },
    {
      id: 'service_delivery',
      title: 'Service Delivery',
      description: 'Seller delivers product/service',
      status: 'pending',
      icon: Truck
    },
    {
      id: 'buffer_period',
      title: '72-Hour Buffer Period',
      description: 'Dispute window for buyer protection',
      status: 'pending',
      icon: Timer
    },
    {
      id: 'fund_release',
      title: 'Funds Released',
      description: 'Payment released to seller',
      status: 'pending',
      icon: DollarSign
    }
  ]);

  const updateStepStatus = (stepIndex: number, status: FlowStep['status'], details?: string) => {
    setFlowSteps(prev => prev.map((step, idx) => 
      idx === stepIndex 
        ? { ...step, status, details, timestamp: new Date() }
        : step
    ));
  };

  const simulateBusinessFlow = async () => {
    setIsRunning(true);
    setCurrentStep(0);

    try {
      // Step 1: Create Transaction
      updateStepStatus(0, 'in_progress');
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const mockTransactionId = Math.floor(Math.random() * 10000) + 1;
      setTransactionId(mockTransactionId);
      updateStepStatus(0, 'completed', `Transaction ID: ${mockTransactionId} | Amount: £5,000.00`);
      setCurrentStep(1);

      // Step 2: KYC Verification
      await new Promise(resolve => setTimeout(resolve, 500));
      updateStepStatus(1, 'in_progress');
      await new Promise(resolve => setTimeout(resolve, 2000));
      updateStepStatus(1, 'completed', 'Identity verified for buyer and seller');
      setCurrentStep(2);

      // Step 3: KYB Verification
      await new Promise(resolve => setTimeout(resolve, 500));
      updateStepStatus(2, 'in_progress');
      await new Promise(resolve => setTimeout(resolve, 2000));
      updateStepStatus(2, 'completed', 'Business registration verified | Score: 95/100');
      setCurrentStep(3);

      // Step 4: AML Check
      await new Promise(resolve => setTimeout(resolve, 500));
      updateStepStatus(3, 'in_progress');
      await new Promise(resolve => setTimeout(resolve, 2500));
      updateStepStatus(3, 'completed', 'No sanctions match | Risk Level: Low | Score: 8.5/100');
      setCurrentStep(4);

      // Step 5: Verification Approved
      await new Promise(resolve => setTimeout(resolve, 500));
      updateStepStatus(4, 'in_progress');
      await new Promise(resolve => setTimeout(resolve, 1000));
      updateStepStatus(4, 'completed', 'All compliance checks passed');
      setCurrentStep(5);

      // Step 6: Escrow Deposit
      await new Promise(resolve => setTimeout(resolve, 500));
      updateStepStatus(5, 'in_progress');
      await new Promise(resolve => setTimeout(resolve, 2000));
      updateStepStatus(5, 'completed', '£5,000.00 secured in escrow | Stripe Payment Intent: pi_demo123');
      setCurrentStep(6);

      // Step 7: Service Delivery
      await new Promise(resolve => setTimeout(resolve, 500));
      updateStepStatus(6, 'in_progress');
      await new Promise(resolve => setTimeout(resolve, 3000));
      updateStepStatus(6, 'completed', 'Service delivered and confirmed by buyer');
      setCurrentStep(7);

      // Step 8: Buffer Period
      await new Promise(resolve => setTimeout(resolve, 500));
      updateStepStatus(7, 'in_progress');
      await new Promise(resolve => setTimeout(resolve, 2500));
      updateStepStatus(7, 'completed', '72-hour dispute window completed | No disputes raised');
      setCurrentStep(8);

      // Step 9: Fund Release
      await new Promise(resolve => setTimeout(resolve, 500));
      updateStepStatus(8, 'in_progress');
      await new Promise(resolve => setTimeout(resolve, 2000));
      updateStepStatus(8, 'completed', '£5,000.00 released to seller | Transaction complete');

    } catch (error) {
      console.error('Flow simulation error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setTransactionId(null);
    setFlowSteps(prev => prev.map(step => ({
      ...step,
      status: 'pending',
      details: undefined,
      timestamp: undefined
    })));
  };

  const getStepIcon = (step: FlowStep, index: number) => {
    const Icon = step.icon;
    if (step.status === 'completed') {
      return <CheckCircle className="h-5 w-5 text-green-600" />;
    } else if (step.status === 'in_progress') {
      return <Icon className="h-5 w-5 text-blue-600 animate-pulse" />;
    } else if (step.status === 'failed') {
      return <AlertTriangle className="h-5 w-5 text-red-600" />;
    }
    return <Clock className="h-5 w-5 text-gray-400" />;
  };

  const getStatusColor = (status: FlowStep['status']) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const progress = (currentStep / flowSteps.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-2xl font-bold" style={{ color: '#0A3778' }}>Trust</span>
            <span className="text-2xl font-bold" style={{ color: '#1DBF73' }}>Verify</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">Complete Business Transaction Flow</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Watch a real-time demonstration of TrustVerify's end-to-end transaction process including KYB/KYC/AML verification, 
            escrow management, and automated dispute resolution.
          </p>
        </div>

        {/* Control Panel */}
        <Card>
          <CardHeader>
            <CardTitle>Flow Control</CardTitle>
            <CardDescription>
              Simulate the complete transaction lifecycle from creation to fund release
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-4">
              <Button 
                onClick={simulateBusinessFlow} 
                disabled={isRunning}
                className="flex-1"
                data-testid="button-start-flow"
              >
                {isRunning ? 'Flow Running...' : 'Start Business Flow Demo'}
              </Button>
              <Button 
                onClick={resetDemo} 
                variant="outline"
                disabled={isRunning}
                data-testid="button-reset-flow"
              >
                Reset Demo
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
            {transactionId && (
              <div className="p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-900">
                  <strong>Transaction ID:</strong> {transactionId} | <strong>Amount:</strong> £5,000.00 GBP
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Flow Steps */}
        <div className="space-y-4">
          {flowSteps.map((step, index) => (
            <Card 
              key={step.id}
              className={`transition-all duration-300 ${
                step.status === 'in_progress' ? 'ring-2 ring-blue-500 shadow-lg' : ''
              }`}
              data-testid={`card-step-${step.id}`}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 mt-1">
                    {getStepIcon(step, index)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{step.title}</h3>
                        <p className="text-sm text-gray-600">{step.description}</p>
                      </div>
                      <Badge className={getStatusColor(step.status)}>
                        {step.status.replace('_', ' ')}
                      </Badge>
                    </div>
                    {step.details && (
                      <div className="p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-700">{step.details}</p>
                      </div>
                    )}
                    {step.timestamp && (
                      <p className="text-xs text-gray-500">
                        {step.timestamp.toLocaleTimeString()}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Dispute & Arbitration Info */}
        <Card className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Scale className="h-5 w-5 text-amber-600" />
              <CardTitle className="text-amber-900">Dispute Resolution & Arbitration</CardTitle>
            </div>
            <CardDescription className="text-amber-700">
              If disputes arise, TrustVerify provides comprehensive resolution services
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-blue-600" />
                  TrustVerify Resolution (0-72 hours)
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• AI-powered fraud detection</li>
                  <li>• Evidence collection & analysis</li>
                  <li>• Fund hold or release decision</li>
                  <li>• Resolution success rate: 94%</li>
                </ul>
              </div>
              <div className="p-4 bg-white rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                  <Gavel className="h-4 w-4 text-purple-600" />
                  Independent Arbitration (72+ hours)
                </h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Third-party arbitration service</li>
                  <li>• Legally binding decisions</li>
                  <li>• Final dispute resolution</li>
                  <li>• Average resolution: 5-7 days</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Features */}
        <Card>
          <CardHeader>
            <CardTitle>Platform Capabilities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Global Verification</h4>
                <p className="text-sm text-gray-600">
                  KYC, KYB, and AML checks covering 180+ countries with real-time compliance screening
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Secure Escrow</h4>
                <p className="text-sm text-gray-600">
                  Stripe-powered escrow with insurance-backed protection up to £1M per transaction
                </p>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold mb-2">Smart Fraud Prevention</h4>
                <p className="text-sm text-gray-600">
                  AI risk scoring, buffer periods, and automated fraud flagging with 96% accuracy
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code, 
  Download, 
  ExternalLink, 
  Book, 
  Terminal, 
  Zap,
  Shield,
  Globe,
  Copy,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

export default function SdkDocumentation() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const codeExamples = {
    installation: `npm install @trustverify/sdk`,
    initialization: `import { TrustVerify } from '@trustverify/sdk';

const trustVerify = new TrustVerify({
  apiKey: 'your_api_key_here',
  environment: 'production' // or 'sandbox'
});`,
    createTransaction: `const transaction = await trustVerify.transactions.create({
  title: 'Website Development Project',
  description: 'Custom e-commerce website development',
  amount: 2500.00,
  currency: 'USD',
  buyerEmail: 'buyer@example.com',
  sellerEmail: 'seller@example.com',
  category: 'digital_services',
  deliveryTimeframe: '14_days'
});

console.log('Transaction created:', transaction.id);`,
    verifyIdentity: `const verification = await trustVerify.kyc.submitVerification({
  userId: 'user_123',
  documentType: 'passport',
  documentNumber: 'P123456789',
  personalInfo: {
    firstName: 'John',
    lastName: 'Doe',
    dateOfBirth: '1990-01-01',
    address: {
      street: '123 Main St',
      city: 'New York',
      country: 'US',
      postalCode: '10001'
    }
  },
  documents: {
    frontId: 'base64_encoded_image',
    backId: 'base64_encoded_image',
    selfie: 'base64_encoded_image'
  }
});`,
    fraudCheck: `const fraudResult = await trustVerify.fraud.analyze({
  transactionId: 'txn_123',
  userAgent: req.headers['user-agent'],
  ipAddress: req.ip,
  deviceFingerprint: 'device_fingerprint_hash',
  behaviorData: {
    sessionDuration: 120,
    clickPattern: 'normal',
    typingSpeed: 'average'
  }
});

if (fraudResult.riskScore > 0.8) {
  // High risk - requires additional verification
  console.log('High risk transaction detected');
}`
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SDK Documentation</h1>
          <p className="text-gray-600 mt-1">Complete guide to integrating TrustVerify SDK into your applications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white border border-gray-200 shadow-sm sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => document.getElementById('getting-started')?.scrollIntoView()}>
                  <Zap className="h-4 w-4 mr-2" />
                  Getting Started
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => document.getElementById('installation')?.scrollIntoView()}>
                  <Download className="h-4 w-4 mr-2" />
                  Installation
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => document.getElementById('authentication')?.scrollIntoView()}>
                  <Shield className="h-4 w-4 mr-2" />
                  Authentication
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => document.getElementById('transactions')?.scrollIntoView()}>
                  <Globe className="h-4 w-4 mr-2" />
                  Transactions
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => document.getElementById('kyc')?.scrollIntoView()}>
                  <CheckCircle className="h-4 w-4 mr-2" />
                  KYC Verification
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm" onClick={() => document.getElementById('fraud-detection')?.scrollIntoView()}>
                  <Shield className="h-4 w-4 mr-2" />
                  Fraud Detection
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Getting Started */}
            <section id="getting-started">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <Zap className="h-6 w-6 mr-2 text-blue-600" />
                    Getting Started
                  </CardTitle>
                  <CardDescription>
                    Start building secure transactions with TrustVerify SDK in minutes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">Prerequisites</h4>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Node.js 16+ or Python 3.8+</li>
                      <li>• TrustVerify API key (get from Developer Portal)</li>
                      <li>• Basic understanding of REST APIs</li>
                    </ul>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <Terminal className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                      <h4 className="font-medium text-gray-900">Install SDK</h4>
                      <p className="text-sm text-gray-600">npm or pip install</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <Code className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                      <h4 className="font-medium text-gray-900">Initialize</h4>
                      <p className="text-sm text-gray-600">Configure with API key</p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 text-center">
                      <CheckCircle className="h-8 w-8 text-gray-600 mx-auto mb-2" />
                      <h4 className="font-medium text-gray-900">Start Building</h4>
                      <p className="text-sm text-gray-600">Create your first transaction</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Installation */}
            <section id="installation">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <Download className="h-6 w-6 mr-2 text-green-600" />
                    Installation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="nodejs" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="php">PHP</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="nodejs" className="space-y-4">
                      <div className="bg-gray-900 rounded-lg p-4 relative">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="bg-green-100 text-green-800">npm</Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(codeExamples.installation, 'install-npm')}
                            className="text-gray-400 hover:text-white"
                          >
                            {copiedCode === 'install-npm' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <code className="text-green-400 font-mono text-sm">{codeExamples.installation}</code>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-4 relative">
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="secondary" className="bg-blue-100 text-blue-800">Initialize</Badge>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => copyToClipboard(codeExamples.initialization, 'init-js')}
                            className="text-gray-400 hover:text-white"
                          >
                            {copiedCode === 'init-js' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                          </Button>
                        </div>
                        <pre className="text-gray-100 font-mono text-sm overflow-x-auto">{codeExamples.initialization}</pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="python" className="space-y-4">
                      <div className="bg-gray-900 rounded-lg p-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 mb-2">pip</Badge>
                        <code className="text-green-400 font-mono text-sm block">pip install trustverify-python</code>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 mb-2">Initialize</Badge>
                        <pre className="text-gray-100 font-mono text-sm">{`from trustverify import TrustVerify

client = TrustVerify(
    api_key='your_api_key_here',
    environment='production'
)`}</pre>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="php" className="space-y-4">
                      <div className="bg-gray-900 rounded-lg p-4">
                        <Badge variant="secondary" className="bg-green-100 text-green-800 mb-2">composer</Badge>
                        <code className="text-green-400 font-mono text-sm block">composer require trustverify/php-sdk</code>
                      </div>
                      <div className="bg-gray-900 rounded-lg p-4">
                        <Badge variant="secondary" className="bg-blue-100 text-blue-800 mb-2">Initialize</Badge>
                        <pre className="text-gray-100 font-mono text-sm">{`<?php
require_once 'vendor/autoload.php';

use TrustVerify\\Client;

$trustVerify = new Client([
    'api_key' => 'your_api_key_here',
    'environment' => 'production'
]);`}</pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
              </Card>
            </section>

            {/* Transactions */}
            <section id="transactions">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <Globe className="h-6 w-6 mr-2 text-purple-600" />
                    Transaction Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-900 rounded-lg p-4 relative">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-purple-100 text-purple-800">Create Transaction</Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(codeExamples.createTransaction, 'create-txn')}
                        className="text-gray-400 hover:text-white"
                      >
                        {copiedCode === 'create-txn' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <pre className="text-gray-100 font-mono text-sm overflow-x-auto">{codeExamples.createTransaction}</pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* KYC Verification */}
            <section id="kyc">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <CheckCircle className="h-6 w-6 mr-2 text-green-600" />
                    KYC Verification
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-900 rounded-lg p-4 relative">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-green-100 text-green-800">Submit Verification</Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(codeExamples.verifyIdentity, 'verify-kyc')}
                        className="text-gray-400 hover:text-white"
                      >
                        {copiedCode === 'verify-kyc' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <pre className="text-gray-100 font-mono text-sm overflow-x-auto">{codeExamples.verifyIdentity}</pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Fraud Detection */}
            <section id="fraud-detection">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <Shield className="h-6 w-6 mr-2 text-red-600" />
                    Fraud Detection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="bg-gray-900 rounded-lg p-4 relative">
                    <div className="flex items-center justify-between mb-2">
                      <Badge variant="secondary" className="bg-red-100 text-red-800">Analyze Risk</Badge>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => copyToClipboard(codeExamples.fraudCheck, 'fraud-check')}
                        className="text-gray-400 hover:text-white"
                      >
                        {copiedCode === 'fraud-check' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    <pre className="text-gray-100 font-mono text-sm overflow-x-auto">{codeExamples.fraudCheck}</pre>
                  </div>
                </CardContent>
              </Card>
            </section>

            {/* Support */}
            <Card className="bg-blue-50 border border-blue-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Book className="h-8 w-8 text-blue-600" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-900">Need Help?</h3>
                    <p className="text-blue-700">Check out our API reference or contact our developer support team.</p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-100" onClick={() => window.open('/api-reference', '_blank')}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      API Reference
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.open('mailto:support@trustverify.com?subject=SDK Support Request', '_blank')}>
                      Contact Support
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

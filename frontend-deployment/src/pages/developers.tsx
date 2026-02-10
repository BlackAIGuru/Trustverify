import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Code, 
  Key, 
  Book, 
  Download, 
  ExternalLink, 
  Copy, 
  CheckCircle,
  Shield,
  Zap,
  Globe,
  Database,
  FileText,
  Terminal,
  Play,
  Settings
} from "lucide-react";

export default function DevelopersPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [copiedEndpoint, setCopiedEndpoint] = useState("");
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleCopyEndpoint = (endpoint: string) => {
    navigator.clipboard.writeText(endpoint);
    setCopiedEndpoint(endpoint);
    setTimeout(() => setCopiedEndpoint(""), 2000);
  };

  const handleDownload = async (type: string, filename: string) => {
    try {
      const response = await fetch(`/api/developer/download/${type}`);
      if (!response.ok) throw new Error('Download failed');
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      toast({
        title: "Download Started",
        description: `${filename} is being downloaded.`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleGenerateApiKey = () => {
    setLocation('/api-keys');
  };

  const handleViewDocumentation = () => {
    setLocation('/api-docs');
  };

  const handleConfigureWebhooks = () => {
    setLocation('/webhooks');
  };

  const handleSdkDocumentation = (language: string) => {
    setLocation(`/docs/sdk/${language.toLowerCase()}`);
  };

  const handleIntegrationExample = (type: string) => {
    setLocation(`/examples/${type}`);
  };

  const handlePlayground = () => {
    setLocation('/api-playground');
  };

  const apiEndpoints = [
    {
      method: "POST",
      endpoint: "/api/v1/transactions/create",
      description: "Create a new secure transaction",
      params: ["amount", "currency", "recipient", "description"],
      response: "Transaction object with escrow details"
    },
    {
      method: "GET",
      endpoint: "/api/v1/transactions/{id}",
      description: "Get transaction details",
      params: ["id"],
      response: "Complete transaction information"
    },
    {
      method: "POST",
      endpoint: "/api/v1/fraud/check",
      description: "Perform fraud analysis on transaction data",
      params: ["transaction_data", "user_profile"],
      response: "Fraud risk assessment and recommendations"
    },
    {
      method: "POST",
      endpoint: "/api/v1/kyc/verify",
      description: "Initiate KYC verification process",
      params: ["user_id", "document_type", "document_data"],
      response: "Verification status and trust score"
    },
    {
      method: "GET",
      endpoint: "/api/v1/trust-score/{user_id}",
      description: "Get user trust score and factors",
      params: ["user_id"],
      response: "Trust score breakdown and history"
    }
  ];

  const sdkLanguages = [
    {
      name: "Node.js",
      status: "Available",
      version: "v2.1.0",
      installCommand: "npm install @trustverify/node-sdk",
      documentation: "/docs/sdk/nodejs"
    },
    {
      name: "Python",
      status: "Available",
      version: "v2.0.5",
      installCommand: "pip install trustverify-python",
      documentation: "/docs/sdk/python"
    },
    {
      name: "PHP",
      status: "Available",
      version: "v1.8.2",
      installCommand: "composer require trustverify/php-sdk",
      documentation: "/docs/sdk/php"
    },
    {
      name: "Java",
      status: "Beta",
      version: "v1.5.0-beta",
      installCommand: "maven: com.trustverify:java-sdk:1.5.0-beta",
      documentation: "/docs/sdk/java"
    },
    {
      name: "Go",
      status: "Coming Soon",
      version: "TBA",
      installCommand: "Coming Q2 2025",
      documentation: null
    },
    {
      name: "Ruby",
      status: "Coming Soon",
      version: "TBA",
      installCommand: "Coming Q3 2025",
      documentation: null
    }
  ];

  const codeExamples = {
    nodejs: `const TrustVerify = require('@trustverify/node-sdk');

const client = new TrustVerify({
  apiKey: 'your_api_key_here',
  environment: 'sandbox' // or 'production'
});

// Create a secure transaction
const transaction = await client.transactions.create({
  amount: 1000.00,
  currency: 'GBP',
  recipient: 'user@example.com',
  description: 'Service payment',
  escrow: true
});

console.log('Transaction created:', transaction.id);`,
    
    python: `import trustverify

client = trustverify.Client(
    api_key='your_api_key_here',
    environment='sandbox'  # or 'production'
)

# Perform fraud check
fraud_check = client.fraud.check({
    'transaction_data': {
        'amount': 1000.00,
        'currency': 'GBP',
        'payment_method': 'card'
    },
    'user_profile': {
        'user_id': 'user_123',
        'email': 'user@example.com'
    }
})

print(f"Risk score: {fraud_check.risk_score}")`,

    curl: `# Create API Key
curl -X POST https://api.trustverify.io/v1/auth/keys \\
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "Production API Key",
    "permissions": ["transactions", "fraud_detection"]
  }'

# Create Transaction
curl -X POST https://api.trustverify.io/v1/transactions/create \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "amount": 1000.00,
    "currency": "GBP",
    "recipient": "user@example.com",
    "description": "Service payment"
  }'`
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Developer Center</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Build secure transaction systems with our comprehensive API and developer tools
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-6 mb-8">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="api-reference">API Reference</TabsTrigger>
            <TabsTrigger value="sdks">SDKs</TabsTrigger>
            <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            <TabsTrigger value="testing">Testing</TabsTrigger>
            <TabsTrigger value="examples">Examples</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Code className="h-5 w-5" />
                      <span>Getting Started</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-gray-600">
                      TrustVerify API provides enterprise-grade transaction security, fraud detection, 
                      and KYC verification services. Get started in minutes with our comprehensive SDK 
                      and documentation.
                    </p>
                    
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Quick Setup Steps:</h4>
                      <ol className="list-decimal list-inside space-y-1 text-sm text-gray-600">
                        <li>Create your developer account</li>
                        <li>Generate API keys from dashboard</li>
                        <li>Install SDK for your preferred language</li>
                        <li>Make your first API call</li>
                        <li>Configure webhooks for real-time updates</li>
                      </ol>
                    </div>

                    <div className="flex space-x-4">
                      <Button onClick={handleGenerateApiKey}>
                        <Key className="h-4 w-4 mr-2" />
                        Generate API Key
                      </Button>
                      <Button variant="outline" onClick={handleViewDocumentation}>
                        <Book className="h-4 w-4 mr-2" />
                        View Documentation
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Core Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-start space-x-3">
                        <Shield className="h-5 w-5 text-green-500 mt-1" />
                        <div>
                          <div className="font-medium">Fraud Detection</div>
                          <div className="text-sm text-gray-600">AI-powered real-time analysis</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Zap className="h-5 w-5 text-yellow-500 mt-1" />
                        <div>
                          <div className="font-medium">Instant Verification</div>
                          <div className="text-sm text-gray-600">Sub-second response times</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Globe className="h-5 w-5 text-blue-500 mt-1" />
                        <div>
                          <div className="font-medium">Global Coverage</div>
                          <div className="text-sm text-gray-600">195+ countries supported</div>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Database className="h-5 w-5 text-purple-500 mt-1" />
                        <div>
                          <div className="font-medium">Escrow Services</div>
                          <div className="text-sm text-gray-600">Secure payment holding</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Terminal className="h-5 w-5" />
                      <span>Quick Test</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                      <div>$ curl -X GET \</div>
                      <div>  https://api.trustverify.io/v1/status \</div>
                      <div>  -H "Authorization: Bearer YOUR_KEY"</div>
                      <div className="mt-2 text-gray-400"># Response:</div>
                      <div>{"{"} "status": "operational" {"}"}</div>
                    </div>
                    <Button size="sm" className="mt-3 w-full" onClick={handlePlayground}>
                      <Play className="h-4 w-4 mr-2" />
                      Try in Playground
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Rate Limits</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">API Calls</span>
                      <span className="font-medium">1000/hour</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Fraud Checks</span>
                      <span className="font-medium">500/hour</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">KYC Verifications</span>
                      <span className="font-medium">100/hour</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-2">
                      Contact us for higher limits
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* API Reference Tab */}
          <TabsContent value="api-reference">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>API Endpoints</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {apiEndpoints.map((endpoint, index) => (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <Badge variant={endpoint.method === 'GET' ? 'secondary' : 'default'}>
                              {endpoint.method}
                            </Badge>
                            <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                              {endpoint.endpoint}
                            </code>
                          </div>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleCopyEndpoint(endpoint.endpoint)}
                          >
                            {copiedEndpoint === endpoint.endpoint ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Copy className="h-4 w-4" />
                            )}
                          </Button>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{endpoint.description}</p>
                        <div className="text-xs text-gray-500">
                          <strong>Parameters:</strong> {endpoint.params.join(", ")}
                        </div>
                        <div className="text-xs text-gray-500">
                          <strong>Response:</strong> {endpoint.response}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      All API requests require authentication using Bearer tokens. Include your API key 
                      in the Authorization header of every request.
                    </p>
                    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
                      <div>Authorization: Bearer YOUR_API_KEY</div>
                    </div>
                    <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                      <div className="text-yellow-800 text-sm">
                        <strong>Security Note:</strong> Never expose your API keys in client-side code. 
                        Always use them server-side and implement proper key rotation.
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* SDKs Tab */}
          <TabsContent value="sdks">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Official SDKs</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {sdkLanguages.map((sdk, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="font-semibold">{sdk.name}</h3>
                            <Badge variant={
                              sdk.status === 'Available' ? 'default' : 
                              sdk.status === 'Beta' ? 'secondary' : 'outline'
                            }>
                              {sdk.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 mb-3">
                            Version: {sdk.version}
                          </div>
                          <div className="bg-gray-100 p-3 rounded text-xs font-mono mb-3">
                            {sdk.installCommand}
                          </div>
                          {sdk.documentation ? (
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="w-full"
                              onClick={() => handleSdkDocumentation(sdk.name)}
                            >
                              <Book className="h-4 w-4 mr-2" />
                              Documentation
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" className="w-full" disabled>
                              Coming Soon
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Code Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue="nodejs">
                    <TabsList className="mb-4">
                      <TabsTrigger value="nodejs">Node.js</TabsTrigger>
                      <TabsTrigger value="python">Python</TabsTrigger>
                      <TabsTrigger value="curl">cURL</TabsTrigger>
                    </TabsList>
                    
                    {Object.entries(codeExamples).map(([language, code]) => (
                      <TabsContent key={language} value={language}>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="absolute top-2 right-2 text-gray-400 hover:text-white"
                            onClick={() => navigator.clipboard.writeText(code)}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <pre className="text-sm overflow-x-auto">
                            <code>{code}</code>
                          </pre>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Webhooks Tab */}
          <TabsContent value="webhooks">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Webhook Configuration</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-600">
                      Webhooks allow you to receive real-time notifications about events in your TrustVerify account. 
                      Configure endpoint URLs to receive HTTP POST requests when specific events occur.
                    </p>
                    
                    <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                      <h4 className="font-semibold mb-2">Available Webhook Events:</h4>
                      <ul className="text-sm space-y-1">
                        <li>• <code>transaction.created</code> - New transaction initiated</li>
                        <li>• <code>transaction.completed</code> - Transaction successfully completed</li>
                        <li>• <code>fraud.detected</code> - Suspicious activity identified</li>
                        <li>• <code>kyc.verified</code> - KYC verification completed</li>
                        <li>• <code>dispute.raised</code> - New dispute created</li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Webhook URL</label>
                        <Input placeholder="https://your-domain.com/webhooks" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Secret Key</label>
                        <Input placeholder="Auto-generated for security" disabled />
                      </div>
                    </div>

                    <Button onClick={handleConfigureWebhooks}>
                      <Settings className="h-4 w-4 mr-2" />
                      Configure Webhooks
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Webhook Payload Example</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg">
                    <pre className="text-sm overflow-x-auto">
                      <code>{`{
  "event": "transaction.completed",
  "timestamp": "2025-01-19T08:00:00Z",
  "data": {
    "transaction_id": "txn_abc123",
    "amount": 1000.00,
    "currency": "GBP",
    "status": "completed",
    "participants": {
      "sender": "user_123",
      "recipient": "user_456"
    }
  },
  "signature": "sha256=..."
}`}</code>
                    </pre>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Testing Tab */}
          <TabsContent value="testing">
            <Card>
              <CardHeader>
                <CardTitle>Testing Environment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-gray-600">
                    Use our sandbox environment to test your integration without affecting real transactions 
                    or incurring charges.
                  </p>
                  
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Sandbox Features:</h4>
                    <ul className="text-sm space-y-1">
                      <li>• Full API functionality without real money</li>
                      <li>• Test fraud detection scenarios</li>
                      <li>• Simulate KYC verification workflows</li>
                      <li>• Practice webhook integration</li>
                      <li>• No rate limits during testing</li>
                    </ul>
                  </div>

                  <div className="bg-gray-100 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Sandbox Base URL:</h4>
                    <code className="text-sm">https://sandbox-api.trustverify.io/v1</code>
                  </div>

                  <Button>
                    <Play className="h-4 w-4 mr-2" />
                    Access API Playground
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Examples Tab */}
          <TabsContent value="examples">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integration Examples</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded p-3">
                      <div className="font-medium mb-1">E-commerce Integration</div>
                      <div className="text-sm text-gray-600 mb-2">
                        Complete checkout flow with fraud protection
                      </div>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Example
                      </Button>
                    </div>
                    
                    <div className="border rounded p-3">
                      <div className="font-medium mb-1">Marketplace Platform</div>
                      <div className="text-sm text-gray-600 mb-2">
                        Escrow services for buyer-seller transactions
                      </div>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Example
                      </Button>
                    </div>
                    
                    <div className="border rounded p-3">
                      <div className="font-medium mb-1">Crypto Exchange</div>
                      <div className="text-sm text-gray-600 mb-2">
                        KYC verification and transaction monitoring
                      </div>
                      <Button size="sm" variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        View Example
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Download Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="border rounded p-3">
                      <div className="font-medium mb-1">Postman Collection</div>
                      <div className="text-sm text-gray-600 mb-2">
                        Ready-to-use API request collection
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownload('postman', 'trustverify-api-collection.json')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="border rounded p-3">
                      <div className="font-medium mb-1">OpenAPI Specification</div>
                      <div className="text-sm text-gray-600 mb-2">
                        Complete API specification file
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownload('openapi', 'trustverify-openapi-spec.json')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                    
                    <div className="border rounded p-3">
                      <div className="font-medium mb-1">Integration Guide PDF</div>
                      <div className="text-sm text-gray-600 mb-2">
                        Comprehensive setup documentation
                      </div>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleDownload('integration-guide', 'trustverify-integration-guide.md')}
                      >
                        <Download className="h-4 w-4 mr-2" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
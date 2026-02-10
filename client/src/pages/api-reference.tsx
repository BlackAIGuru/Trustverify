
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Book, 
  ExternalLink, 
  Key,
  Globe,
  Shield,
  CreditCard,
  Users,
  AlertTriangle,
  Copy,
  CheckCircle
} from "lucide-react";
import { useState } from "react";

export default function ApiReference() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const endpoints = [
    {
      category: "Authentication",
      icon: Key,
      color: "blue",
      description: "API key management and authentication",
      endpoints: [
        {
          method: "POST",
          path: "/api/auth/validate",
          description: "Validate API key and get permissions",
          example: `curl -X POST https://api.trustverify.com/api/auth/validate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`
        }
      ]
    },
    {
      category: "Transactions",
      icon: CreditCard,
      color: "green",
      description: "Create and manage secure transactions",
      endpoints: [
        {
          method: "POST",
          path: "/api/transactions",
          description: "Create a new transaction",
          example: `curl -X POST https://api.trustverify.com/api/transactions \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Website Development",
    "description": "Custom e-commerce website",
    "amount": 2500.00,
    "currency": "USD",
    "buyerEmail": "buyer@example.com",
    "sellerEmail": "seller@example.com",
    "category": "digital_services",
    "deliveryTimeframe": "14_days"
  }'`
        },
        {
          method: "GET",
          path: "/api/transactions/{id}",
          description: "Get transaction details",
          example: `curl -X GET https://api.trustverify.com/api/transactions/txn_123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`
        },
        {
          method: "PUT",
          path: "/api/transactions/{id}/status",
          description: "Update transaction status",
          example: `curl -X PUT https://api.trustverify.com/api/transactions/txn_123/status \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "status": "completed",
    "completedBy": "buyer",
    "deliveryProof": "Delivery confirmation received"
  }'`
        }
      ]
    },
    {
      category: "KYC Verification",
      icon: Users,
      color: "purple",
      description: "Identity verification and compliance",
      endpoints: [
        {
          method: "POST",
          path: "/api/kyc/submit",
          description: "Submit KYC verification documents",
          example: `curl -X POST https://api.trustverify.com/api/kyc/submit \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "userId": "user_123",
    "documentType": "passport",
    "documentNumber": "P123456789",
    "personalInfo": {
      "firstName": "John",
      "lastName": "Doe",
      "dateOfBirth": "1990-01-01"
    },
    "documents": {
      "frontId": "base64_encoded_image",
      "backId": "base64_encoded_image",
      "selfie": "base64_encoded_image"
    }
  }'`
        },
        {
          method: "GET",
          path: "/api/kyc/status/{userId}",
          description: "Get KYC verification status",
          example: `curl -X GET https://api.trustverify.com/api/kyc/status/user_123 \\
  -H "Authorization: Bearer YOUR_API_KEY"`
        }
      ]
    },
    {
      category: "Fraud Detection",
      icon: Shield,
      color: "red",
      description: "Real-time fraud analysis and risk scoring",
      endpoints: [
        {
          method: "POST",
          path: "/api/fraud/analyze",
          description: "Analyze transaction for fraud risk",
          example: `curl -X POST https://api.trustverify.com/api/fraud/analyze \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "transactionId": "txn_123",
    "userAgent": "Mozilla/5.0...",
    "ipAddress": "192.168.1.1",
    "deviceFingerprint": "device_hash_123",
    "behaviorData": {
      "sessionDuration": 120,
      "clickPattern": "normal",
      "typingSpeed": "average"
    }
  }'`
        }
      ]
    },
    {
      category: "Webhooks",
      icon: Globe,
      color: "orange",
      description: "Real-time event notifications",
      endpoints: [
        {
          method: "POST",
          path: "/api/webhooks",
          description: "Create webhook endpoint",
          example: `curl -X POST https://api.trustverify.com/api/webhooks \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "url": "https://your-app.com/webhooks/trustverify",
    "events": ["transaction.created", "transaction.completed", "kyc.approved"],
    "secret": "your_webhook_secret"
  }'`
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">API Reference</h1>
          <p className="text-gray-600 mt-1">Complete reference for TrustVerify REST API endpoints</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:col-span-1">
            <Card className="bg-white border border-gray-200 shadow-sm sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg text-gray-900">API Endpoints</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {endpoints.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Button 
                      key={category.category}
                      variant="ghost" 
                      className="w-full justify-start text-sm" 
                      onClick={() => document.getElementById(`api-${category.category.toLowerCase().replace(' ', '-')}`)?.scrollIntoView()}
                    >
                      <IconComponent className="h-4 w-4 mr-2" />
                      {category.category}
                    </Button>
                  );
                })}
              </CardContent>
            </Card>

            <Card className="bg-blue-50 border border-blue-200 shadow-sm mt-6">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Key className="h-4 w-4 text-blue-600" />
                  <h4 className="font-medium text-blue-900">Base URL</h4>
                </div>
                <code className="text-sm bg-white px-2 py-1 rounded border text-blue-800">
                  https://api.trustverify.com
                </code>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Quick Start */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900">Quick Start</CardTitle>
                <CardDescription>
                  Get started with the TrustVerify API in minutes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-semibold text-blue-900 mb-2">Authentication</h4>
                  <p className="text-sm text-blue-800 mb-3">
                    Include your API key in the Authorization header for all requests:
                  </p>
                  <div className="bg-gray-900 rounded p-3">
                    <code className="text-green-400 text-sm">Authorization: Bearer YOUR_API_KEY</code>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Content Type</h4>
                    <code className="text-sm text-gray-700">application/json</code>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">Rate Limit</h4>
                    <code className="text-sm text-gray-700">1000 requests/minute</code>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Endpoints */}
            {endpoints.map((category) => {
              const IconComponent = category.icon;
              return (
                <section key={category.category} id={`api-${category.category.toLowerCase().replace(' ', '-')}`}>
                  <Card className="bg-white border border-gray-200 shadow-sm">
                    <CardHeader>
                      <CardTitle className="text-xl text-gray-900 flex items-center">
                        <IconComponent className={`h-6 w-6 mr-2 text-${category.color}-600`} />
                        {category.category}
                      </CardTitle>
                      <CardDescription>{category.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {category.endpoints.map((endpoint, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center space-x-3 mb-3">
                            <Badge 
                              variant="secondary" 
                              className={`
                                ${endpoint.method === 'GET' ? 'bg-green-100 text-green-800' : ''}
                                ${endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' : ''}
                                ${endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' : ''}
                                ${endpoint.method === 'DELETE' ? 'bg-red-100 text-red-800' : ''}
                              `}
                            >
                              {endpoint.method}
                            </Badge>
                            <code className="font-mono text-sm text-gray-900">{endpoint.path}</code>
                          </div>
                          <p className="text-gray-600 mb-4">{endpoint.description}</p>
                          
                          <div className="bg-gray-900 rounded-lg p-4 relative">
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="secondary" className="bg-gray-100 text-gray-800">cURL Example</Badge>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => copyToClipboard(endpoint.example, `${category.category}-${index}`)}
                                className="text-gray-400 hover:text-white"
                              >
                                {copiedCode === `${category.category}-${index}` ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                              </Button>
                            </div>
                            <pre className="text-gray-100 font-mono text-sm overflow-x-auto">{endpoint.example}</pre>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                </section>
              );
            })}

            {/* Error Codes */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 flex items-center">
                  <AlertTriangle className="h-6 w-6 mr-2 text-yellow-600" />
                  Error Codes
                </CardTitle>
                <CardDescription>
                  Common HTTP status codes and error responses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-red-100 text-red-800">400</Badge>
                        <span className="font-medium">Bad Request</span>
                      </div>
                      <p className="text-sm text-gray-600">Invalid request parameters or missing required fields</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-red-100 text-red-800">401</Badge>
                        <span className="font-medium">Unauthorized</span>
                      </div>
                      <p className="text-sm text-gray-600">Invalid or missing API key</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-red-100 text-red-800">403</Badge>
                        <span className="font-medium">Forbidden</span>
                      </div>
                      <p className="text-sm text-gray-600">Insufficient permissions for this operation</p>
                    </div>
                    
                    <div className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge className="bg-red-100 text-red-800">429</Badge>
                        <span className="font-medium">Rate Limited</span>
                      </div>
                      <p className="text-sm text-gray-600">Too many requests, please slow down</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Support */}
            <Card className="bg-blue-50 border border-blue-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <Book className="h-8 w-8 text-blue-600" />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-blue-900">Need Help with Integration?</h3>
                    <p className="text-blue-700">Check out our SDK documentation or contact our API support team.</p>
                  </div>
                  <div className="space-x-2">
                    <Button variant="outline" className="border-blue-300 text-blue-600 hover:bg-blue-100" onClick={() => window.open('/sdk-documentation', '_blank')}>
                      <ExternalLink className="h-4 w-4 mr-2" />
                      SDK Docs
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => window.open('mailto:api-support@trustverify.io?subject=API Support Request', '_blank')}>
                      API Support
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

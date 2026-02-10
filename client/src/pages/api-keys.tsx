import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Eye, EyeOff, Key, Copy, Plus, Trash2, CheckCircle, Building2, Shield, CreditCard, Gamepad2, ShoppingCart, Coins, Landmark, Truck } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  permissions: string[];
  industry: string;
  useCase: string;
  rateLimits: {
    apiCalls: number;
    fraudChecks: number;
    kycVerifications: number;
  };
  created: string;
  lastUsed: string;
  status: 'active' | 'revoked';
}

interface IndustryConfig {
  id: string;
  name: string;
  icon: any;
  description: string;
  useCases: string[];
  permissions: string[];
  rateLimits: {
    apiCalls: number;
    fraudChecks: number;
    kycVerifications: number;
  };
  features: string[];
}

export default function ApiKeysPage() {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  
  const industryConfigs: IndustryConfig[] = [
    {
      id: 'banking',
      name: 'Banking & Financial Services',
      icon: Landmark,
      description: 'Comprehensive fraud protection, AML compliance, and regulatory reporting for traditional banking operations.',
      useCases: [
        'Account opening fraud prevention',
        'Transaction monitoring & AML',
        'Regulatory compliance reporting',
        'Wire transfer verification',
        'Credit application screening'
      ],
      permissions: ['transactions', 'fraud_detection', 'kyc', 'aml_screening', 'regulatory_reporting', 'compliance_monitoring'],
      rateLimits: {
        apiCalls: 5000,
        fraudChecks: 2000,
        kycVerifications: 500
      },
      features: ['Real-time AML screening', 'PEP/Sanctions checking', 'Enhanced due diligence', 'Regulatory reporting dashboard']
    },
    {
      id: 'fintech',
      name: 'Fintech & Digital Payments',
      icon: CreditCard,
      description: 'High-velocity fraud detection and seamless KYC for modern payment platforms and neobanks.',
      useCases: [
        'Real-time payment fraud detection',
        'Digital wallet security',
        'P2P transfer protection',
        'Instant KYC verification',
        'Account takeover prevention'
      ],
      permissions: ['transactions', 'fraud_detection', 'kyc', 'real_time_monitoring', 'device_fingerprinting', 'behavioral_analytics'],
      rateLimits: {
        apiCalls: 10000,
        fraudChecks: 5000,
        kycVerifications: 1000
      },
      features: ['Sub-second verification', 'Device fingerprinting', 'Behavioral analytics', 'Mobile-first KYC']
    },
    {
      id: 'insurance',
      name: 'Insurance',
      icon: Shield,
      description: 'Claims fraud detection, policy verification, and risk assessment for insurance providers.',
      useCases: [
        'Claims fraud detection',
        'Policy application screening',
        'Premium fraud prevention',
        'Identity verification for claims',
        'Staged accident detection'
      ],
      permissions: ['fraud_detection', 'kyc', 'risk_assessment', 'claims_analysis', 'identity_verification'],
      rateLimits: {
        apiCalls: 3000,
        fraudChecks: 1500,
        kycVerifications: 300
      },
      features: ['Claims pattern analysis', 'Medical records verification', 'Vehicle fraud detection', 'Property damage assessment']
    },
    {
      id: 'crypto',
      name: 'Cryptocurrency & Blockchain',
      icon: Coins,
      description: 'Wallet risk scoring, DeFi protection, and crypto-specific fraud prevention.',
      useCases: [
        'Wallet risk assessment',
        'DeFi protocol protection',
        'Exchange fraud prevention',
        'Smart contract auditing',
        'Crypto AML compliance'
      ],
      permissions: ['fraud_detection', 'wallet_analysis', 'blockchain_monitoring', 'smart_contract_audit', 'crypto_aml'],
      rateLimits: {
        apiCalls: 7500,
        fraudChecks: 3000,
        kycVerifications: 750
      },
      features: ['Wallet reputation scoring', 'Cross-chain analysis', 'DeFi risk assessment', 'Token contract verification']
    },
    {
      id: 'ecommerce',
      name: 'E-commerce & Marketplaces',
      icon: ShoppingCart,
      description: 'Checkout fraud prevention, seller verification, and marketplace trust & safety.',
      useCases: [
        'Payment fraud prevention',
        'Account creation abuse',
        'Seller verification',
        'Chargeback protection',
        'Review fraud detection'
      ],
      permissions: ['transactions', 'fraud_detection', 'seller_verification', 'chargeback_protection', 'review_monitoring'],
      rateLimits: {
        apiCalls: 15000,
        fraudChecks: 7500,
        kycVerifications: 1500
      },
      features: ['Real-time checkout protection', 'Seller trust scoring', 'Review authenticity', 'Inventory fraud detection']
    },
    {
      id: 'retail',
      name: 'Retail & Point-of-Sale',
      icon: Building2,
      description: 'In-store and online fraud protection for retail operations and loyalty programs.',
      useCases: [
        'Card-present fraud detection',
        'Loyalty program abuse',
        'Return fraud prevention',
        'Gift card fraud protection',
        'Employee fraud monitoring'
      ],
      permissions: ['transactions', 'fraud_detection', 'loyalty_monitoring', 'return_analysis', 'employee_monitoring'],
      rateLimits: {
        apiCalls: 8000,
        fraudChecks: 4000,
        kycVerifications: 800
      },
      features: ['POS integration', 'Loyalty fraud detection', 'Return pattern analysis', 'Employee activity monitoring']
    },
    {
      id: 'igaming',
      name: 'iGaming & Online Gambling',
      icon: Gamepad2,
      description: 'Player verification, bonus abuse prevention, and regulatory compliance for gaming operators.',
      useCases: [
        'Player age verification',
        'Bonus abuse detection',
        'Multi-account prevention',
        'Responsible gambling controls',
        'Regulatory compliance'
      ],
      permissions: ['fraud_detection', 'kyc', 'age_verification', 'bonus_monitoring', 'gambling_compliance', 'geolocation'],
      rateLimits: {
        apiCalls: 5000,
        fraudChecks: 2500,
        kycVerifications: 1000
      },
      features: ['Age verification', 'Geolocation compliance', 'Bonus abuse detection', 'Responsible gambling tools']
    },
    {
      id: 'logistics',
      name: 'Logistics & Supply Chain',
      icon: Truck,
      description: 'Shipment verification, carrier authentication, and supply chain fraud prevention for logistics operations.',
      useCases: [
        'Shipment tracking verification',
        'Carrier identity validation',
        'Delivery confirmation fraud',
        'Supply chain transparency',
        'Package tampering detection'
      ],
      permissions: ['fraud_detection', 'shipment_tracking', 'carrier_verification', 'delivery_monitoring', 'supply_chain_audit'],
      rateLimits: {
        apiCalls: 6000,
        fraudChecks: 3000,
        kycVerifications: 500
      },
      features: ['Real-time shipment tracking', 'Carrier authentication', 'Delivery fraud detection', 'Supply chain audit trails']
    }
  ];

  
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  const [copiedKey, setCopiedKey] = useState("");
  const [newKeyName, setNewKeyName] = useState("");
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedUseCase, setSelectedUseCase] = useState<string>("");

  const selectedIndustryConfig = industryConfigs.find(config => config.id === selectedIndustry);

  // Fetch API keys from backend
  const { data: apiKeys = [], isLoading, error } = useQuery({
    queryKey: ['/api/api-keys'],
    queryFn: () => fetch('/api/api-keys').then(res => res.json())
  });

  // Create API key mutation
  const createApiKeyMutation = useMutation({
    mutationFn: async (data: { name: string; industry: string; useCase: string; permissions?: string[] }) => {
      const res = await apiRequest("POST", "/api/api-keys", data);
      return await res.json();
    },
    onSuccess: (newApiKey: any) => {
      queryClient.invalidateQueries({ queryKey: ['/api/api-keys'] });
      setNewKeyName("");
      setSelectedIndustry("");
      setSelectedUseCase("");
      toast({
        title: "API Key Generated",
        description: `New ${newApiKey.industry || selectedIndustry} API key "${newApiKey.name || newKeyName}" has been created successfully.`,
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create API key",
        variant: "destructive",
      });
    }
  });

  // Revoke API key mutation
  const revokeApiKeyMutation = useMutation({
    mutationFn: async (keyId: string) => {
      const res = await apiRequest("DELETE", `/api/api-keys/${keyId}`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/api-keys'] });
      toast({
        title: "API Key Revoked",
        description: "The API key has been revoked and is no longer valid.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to revoke API key",
        variant: "destructive",
      });
    }
  });

  const handleToggleKeyVisibility = (keyId: string) => {
    setShowKeys(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const handleCopyKey = (key: string) => {
    navigator.clipboard.writeText(key);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(""), 2000);
    toast({
      title: "API Key Copied",
      description: "The API key has been copied to your clipboard.",
    });
  };

  const handleGenerateKey = () => {
    if (!newKeyName.trim()) {
      toast({
        title: "Key Name Required",
        description: "Please enter a name for your API key.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedIndustry) {
      toast({
        title: "Industry Required",
        description: "Please select an industry for your API key.",
        variant: "destructive",
      });
      return;
    }

    if (!selectedUseCase) {
      toast({
        title: "Use Case Required",
        description: "Please select a use case for your API key.",
        variant: "destructive",
      });
      return;
    }

    const industryConfig = selectedIndustryConfig!;
    
    createApiKeyMutation.mutate({
      name: newKeyName,
      industry: selectedIndustry,
      useCase: selectedUseCase,
      permissions: industryConfig.permissions
    });
  };

  const handleRevokeKey = (keyId: string) => {
    revokeApiKeyMutation.mutate(keyId);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 overflow-visible">
      <div className="max-w-6xl mx-auto overflow-visible">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">API Keys</h1>
          <p className="text-gray-600">
            Manage your TrustVerify API keys for secure access to our services.
          </p>
        </div>

        {/* Generate New Key */}
        <Card className="mb-6 overflow-visible">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Plus className="h-5 w-5 mr-2" />
              Generate New API Key
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 overflow-visible">
            {/* API Key Name */}
            <div className="space-y-2">
              <Label htmlFor="keyName">API Key Name</Label>
              <Input
                id="keyName"
                placeholder="Enter key name (e.g., Production Banking API)"
                value={newKeyName}
                onChange={(e) => setNewKeyName(e.target.value)}
              />
            </div>

            {/* Industry Selection */}
            <div className="space-y-2 relative">
              <Label htmlFor="industry">Industry</Label>
              <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select your industry" />
                </SelectTrigger>
                <SelectContent 
                  position="popper"
                  side="bottom"
                  align="start"
                  sideOffset={8}
                  className="z-[9999] max-h-[300px] min-w-[var(--radix-select-trigger-width)] bg-white border border-gray-200 shadow-lg rounded-md"
                >
                  {industryConfigs.map((industry) => {
                    const IconComponent = industry.icon;
                    return (
                      <SelectItem key={industry.id} value={industry.id} className="cursor-pointer hover:bg-gray-50">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-4 w-4" />
                          <span>{industry.name}</span>
                        </div>
                      </SelectItem>
                    );
                  })}
                </SelectContent>
              </Select>
            </div>

            {/* Industry Description */}
            {selectedIndustryConfig && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-900 mb-2">{selectedIndustryConfig.name}</h4>
                <p className="text-sm text-blue-700 mb-3">{selectedIndustryConfig.description}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h5 className="font-medium text-blue-900 mb-2">Key Features:</h5>
                    <ul className="text-xs text-blue-700 space-y-1">
                      {selectedIndustryConfig.features.map((feature, index) => (
                        <li key={index}>• {feature}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h5 className="font-medium text-blue-900 mb-2">Rate Limits:</h5>
                    <div className="text-xs text-blue-700 space-y-1">
                      <div>API Calls: {selectedIndustryConfig.rateLimits.apiCalls.toLocaleString()}/hour</div>
                      <div>Fraud Checks: {selectedIndustryConfig.rateLimits.fraudChecks.toLocaleString()}/hour</div>
                      <div>KYC Verifications: {selectedIndustryConfig.rateLimits.kycVerifications.toLocaleString()}/hour</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Use Case Selection */}
            {selectedIndustryConfig && (
              <div className="space-y-2 relative">
                <Label htmlFor="useCase">Primary Use Case</Label>
                <Select value={selectedUseCase} onValueChange={setSelectedUseCase}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your primary use case" />
                  </SelectTrigger>
                  <SelectContent 
                    position="popper"
                    side="bottom"
                    align="start"
                    sideOffset={8}
                    className="z-[9999] max-h-[280px] min-w-[var(--radix-select-trigger-width)] bg-white border border-gray-200 shadow-lg rounded-md"
                  >
                    {selectedIndustryConfig.useCases.map((useCase, index) => (
                      <SelectItem key={index} value={useCase} className="cursor-pointer hover:bg-gray-50">
                        {useCase}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Generate Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleGenerateKey}
                disabled={!newKeyName || !selectedIndustry || !selectedUseCase}
                className="min-w-32"
              >
                <Key className="h-4 w-4 mr-2" />
                Generate Key
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Existing Keys */}
        <div className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-gray-500">Loading API keys...</div>
              </CardContent>
            </Card>
          ) : error ? (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-red-500">Failed to load API keys. Please try again.</div>
              </CardContent>
            </Card>
          ) : apiKeys.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-gray-500">No API keys generated yet. Create your first key above.</div>
              </CardContent>
            </Card>
          ) : (
            apiKeys.map((apiKey: any) => {
            const keyIndustryConfig = industryConfigs.find(config => config.id === apiKey.industry);
            const IconComponent = keyIndustryConfig?.icon || Key;
            
            return (
              <Card key={apiKey.id}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <IconComponent className="h-5 w-5 text-gray-600" />
                        <h3 className="text-lg font-semibold">{apiKey.name}</h3>
                      </div>
                      <div className="flex items-center space-x-4 mt-1">
                        <Badge variant={apiKey.status === 'active' ? 'default' : 'destructive'}>
                          {apiKey.status}
                        </Badge>
                        <Badge variant="outline">
                          {keyIndustryConfig?.name || 'General'}
                        </Badge>
                        <span className="text-sm text-gray-500">
                          Created: {apiKey.created}
                        </span>
                        <span className="text-sm text-gray-500">
                          Last used: {apiKey.lastUsed}
                        </span>
                      </div>
                    </div>
                    {apiKey.status === 'active' && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleRevokeKey(apiKey.id)}
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Revoke
                      </Button>
                    )}
                  </div>

                  {/* Use Case */}
                  <div className="mb-4">
                    <span className="text-sm font-medium">Primary Use Case:</span>
                    <p className="text-sm text-gray-600 mt-1">{apiKey.useCase}</p>
                  </div>

                  {/* API Key */}
                  <div className="mb-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-sm font-medium">API Key:</span>
                      <div className="flex items-center space-x-2">
                        <code className="bg-gray-100 px-2 py-1 rounded text-sm">
                          {showKeys[apiKey.id] ? apiKey.key : '•'.repeat(24) + apiKey.key.slice(-8)}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleToggleKeyVisibility(apiKey.id)}
                        >
                          {showKeys[apiKey.id] ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleCopyKey(apiKey.key)}
                        >
                          {copiedKey === apiKey.key ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <Copy className="h-4 w-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Permissions and Rate Limits Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Permissions */}
                    <div>
                      <span className="text-sm font-medium mb-2 block">Permissions:</span>
                      <div className="flex flex-wrap gap-2">
                        {apiKey.permissions.map((permission: string) => (
                          <Badge key={permission} variant="secondary">
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Rate Limits */}
                    <div>
                      <span className="text-sm font-medium mb-2 block">Rate Limits:</span>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <div className="grid grid-cols-1 gap-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">API Calls:</span>
                            <span className="font-medium">{apiKey.rateLimits.apiCalls.toLocaleString()}/hour</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Fraud Checks:</span>
                            <span className="font-medium">{apiKey.rateLimits.fraudChecks.toLocaleString()}/hour</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">KYC Verifications:</span>
                            <span className="font-medium">{apiKey.rateLimits.kycVerifications.toLocaleString()}/hour</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          }))}
        </div>

        {/* Security Guidelines */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Security Best Practices</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* General Security */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">General Security</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Store API keys securely and never expose them in client-side code</li>
                  <li>• Use environment variables to store keys in your applications</li>
                  <li>• Regularly rotate your API keys for enhanced security</li>
                  <li>• Revoke unused or compromised keys immediately</li>
                  <li>• Use different keys for different environments (production, staging, development)</li>
                  <li>• Monitor API key usage and set up alerts for unusual activity</li>
                </ul>
              </div>

              {/* Industry-Specific Considerations */}
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Industry-Specific Considerations</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• <strong>Banking & Fintech:</strong> Implement additional AML monitoring and regulatory compliance logging</li>
                  <li>• <strong>Insurance:</strong> Ensure claims data encryption and fraud pattern analysis auditing</li>
                  <li>• <strong>Crypto:</strong> Use wallet-specific permissions and blockchain monitoring alerts</li>
                  <li>• <strong>E-commerce:</strong> Monitor transaction velocity and implement chargeback protection</li>
                  <li>• <strong>iGaming:</strong> Comply with age verification and responsible gambling regulations</li>
                  <li>• <strong>Retail:</strong> Secure POS integrations and loyalty program fraud monitoring</li>
                </ul>
              </div>
            </div>

            {/* Rate Limit Information */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2">Rate Limit Management</h4>
              <p className="text-sm text-blue-700 mb-2">
                Each industry configuration has tailored rate limits to match typical usage patterns and security requirements.
              </p>
              <div className="text-xs text-blue-600">
                <strong>Contact Support:</strong> If you need higher rate limits for your use case, please reach out to our support team with details about your expected usage patterns.
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
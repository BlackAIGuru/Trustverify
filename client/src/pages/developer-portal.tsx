import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { 
  Key, 
  Code, 
  BarChart3, 
  Globe, 
  Settings, 
  Plus,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  AlertTriangle,
  TrendingUp,
  Activity,
  Clock,
  Shield,
  CheckCircle,
  ExternalLink,
  MessageSquare,
  Beaker,
  Users,
  DollarSign,
  Play,
  Target,
  Calculator,
  Headphones,
  Mail,
  Phone,
  Book,
  Package,
  FileText,
  HelpCircle,
  Landmark,
  CreditCard,
  Gamepad2,
  ShoppingCart,
  Coins,
  Building2,
  Truck
} from "lucide-react";

const createAccountSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  website: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

const createApiKeySchema = z.object({
  name: z.string().min(1, "API key name is required"),
  permissions: z.array(z.string()).default([]),
  expiresAt: z.string().optional(),
});

type CreateAccountForm = z.infer<typeof createAccountSchema>;
type CreateApiKeyForm = z.infer<typeof createApiKeySchema>;

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

function DeveloperPortal() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showApiKey, setShowApiKey] = useState<Record<number, boolean>>({});
  const [newApiKey, setNewApiKey] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string>("");
  const [selectedUseCase, setSelectedUseCase] = useState<string>("");
  const [apiKeyName, setApiKeyName] = useState<string>("");

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

  const selectedIndustryConfig = industryConfigs.find(config => config.id === selectedIndustry);

  // Handle API key generation
  const handleGenerateApiKey = async () => {
    if (!apiKeyName.trim() || !selectedIndustry || !selectedUseCase) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before generating an API key.",
        variant: "destructive",
      });
      return;
    }

    try {
      const keyData = {
        name: apiKeyName.trim(),
        industry: selectedIndustry,
        useCase: selectedUseCase,
        permissions: selectedIndustryConfig?.permissions || [],
        rateLimits: selectedIndustryConfig?.rateLimits || {
          apiCalls: 1000,
          fraudChecks: 500,
          kycVerifications: 100
        }
      };

      const response = await createApiKeyMutation.mutateAsync(keyData);
      
      if (response) {
        setNewApiKey(response.key);
        setApiKeyName("");
        setSelectedIndustry("");
        setSelectedUseCase("");
        
        toast({
          title: "API Key Generated",
          description: `Successfully created ${selectedIndustryConfig?.name} API key: ${apiKeyName}`,
        });
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "Failed to generate API key. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast({
        title: "Copied to clipboard",
        description: "API key has been copied to your clipboard.",
      });
    }).catch(() => {
      toast({
        title: "Failed to copy",
        description: "Could not copy to clipboard. Please copy manually.",
        variant: "destructive",
      });
    });
  };

  // Fetch developer account
  const { data: account, isLoading: accountLoading } = useQuery<any>({
    queryKey: ["/api/developer/account"],
    enabled: !!user,
  });

  // Fetch API keys
  const { data: apiKeys = [], isLoading: keysLoading } = useQuery<any[]>({
    queryKey: ["/api/developer/api-keys"],
    enabled: !!user && !!account,
  });

  // Fetch usage stats
  const { data: usageStats = {} as any } = useQuery<any>({
    queryKey: ["/api/developer/usage/stats"],
    enabled: !!user && !!account,
  });

  // Create account mutation
  const createAccountMutation = useMutation({
    mutationFn: async (data: CreateAccountForm) => {
      const res = await apiRequest("POST", "/api/developer/account", data);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/developer/account"] });
      toast({
        title: "Developer account created",
        description: "Your developer account has been successfully created.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create account",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Create API key mutation
  const createApiKeyMutation = useMutation({
    mutationFn: async (data: CreateApiKeyForm) => {
      const res = await apiRequest("POST", "/api/developer/api-keys", data);
      return await res.json();
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["/api/developer/api-keys"] });
      setNewApiKey(data.key);
      toast({
        title: "API key created",
        description: "Your new API key has been generated. Make sure to copy it now!",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to create API key",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  // Delete API key mutation
  const deleteApiKeyMutation = useMutation({
    mutationFn: async (keyId: number) => {
      const res = await apiRequest("DELETE", `/api/developer/api-keys/${keyId}`);
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/developer/api-keys"] });
      toast({
        title: "API key deleted",
        description: "The API key has been successfully deleted.",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to delete API key",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const {
    register: registerAccount,
    handleSubmit: handleAccountSubmit,
    formState: { errors: accountErrors },
  } = useForm<CreateAccountForm>({
    resolver: zodResolver(createAccountSchema),
  });

  const {
    register: registerApiKey,
    handleSubmit: handleApiKeySubmit,
    formState: { errors: apiKeyErrors },
    reset: resetApiKeyForm,
  } = useForm<CreateApiKeyForm>({
    resolver: zodResolver(createApiKeySchema),
  });

  const onCreateAccount = (data: CreateAccountForm) => {
    createAccountMutation.mutate(data);
  };

  const onCreateApiKey = (data: CreateApiKeyForm) => {
    createApiKeyMutation.mutate(data, {
      onSuccess: () => {
        resetApiKeyForm();
        setActiveTab("api-keys");
      }
    });
  };



  const toggleApiKeyVisibility = (keyId: number) => {
    setShowApiKey(prev => ({
      ...prev,
      [keyId]: !prev[keyId]
    }));
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-green-100 text-green-800", label: "Active" },
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending Review" },
      approved: { color: "bg-blue-100 text-blue-800", label: "Approved" },
      suspended: { color: "bg-red-100 text-red-800", label: "Suspended" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={`${config.color} font-medium`}>{config.label}</Badge>;
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Enhanced Mobile-Responsive Header */}
        <div className="mb-6 sm:mb-8">
          <div className="text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              Developer Portal
            </h1>
            <p className="text-sm sm:text-base text-gray-600 mt-2 sm:mt-3 max-w-2xl mx-auto sm:mx-0">
              Build powerful fraud prevention into your applications with our comprehensive API suite
            </p>
          </div>
          
          {/* Mobile-friendly status indicator */}
          {account && (
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
              <div className="flex items-center justify-center sm:justify-start gap-2">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">API Services Active</span>
              </div>
              <div className="flex items-center justify-center sm:justify-end gap-4 text-xs sm:text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  Last activity: 2 mins ago
                </span>
                <span className="flex items-center gap-1">
                  <Globe className="h-3 w-3" />
                  Global deployment
                </span>
              </div>
            </div>
          )}
        </div>

        {!account && !accountLoading ? (
          /* Create Developer Account */
          <Card className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-lg rounded-xl">
            <CardHeader className="text-center pb-8 pt-8">
              <CardTitle className="text-3xl font-bold text-gray-900 mb-3">Create Developer Account</CardTitle>
              <CardDescription className="text-lg text-gray-600">
                Get started with TrustVerify API integration for fraud prevention and trust scoring
              </CardDescription>
            </CardHeader>
            <CardContent className="px-8 pb-8">
              <form onSubmit={handleAccountSubmit(onCreateAccount)} className="space-y-8">
                <div className="space-y-3">
                  <Label htmlFor="companyName" className="text-sm font-semibold text-gray-800">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Your Company Inc."
                    className="h-14 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-base"
                    {...registerAccount("companyName")}
                  />
                  {accountErrors.companyName && (
                    <p className="text-sm text-red-600 mt-2">{accountErrors.companyName.message}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="website" className="text-sm font-semibold text-gray-800">
                    Website (Optional)
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourcompany.com"
                    className="h-14 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-base"
                    {...registerAccount("website")}
                  />
                  {accountErrors.website && (
                    <p className="text-sm text-red-600 mt-2">{accountErrors.website.message}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <Label htmlFor="description" className="text-sm font-semibold text-gray-800">
                    Project Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe how you plan to use TrustVerify APIs for fraud prevention, trust scoring, and risk assessment..."
                    rows={4}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-base"
                    {...registerAccount("description")}
                  />
                  {accountErrors.description && (
                    <p className="text-sm text-red-600 mt-2">{accountErrors.description.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg text-base shadow-lg transition-all duration-200"
                  disabled={createAccountMutation.isPending}
                >
                  {createAccountMutation.isPending ? "Creating Account..." : "Create Developer Account"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          /* Developer Dashboard */
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
            {/* Enhanced Navigation Tabs */}
            <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 mb-8">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2 bg-gray-50 p-2 rounded-lg h-auto">
                <TabsTrigger 
                  value="dashboard" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md text-xs sm:text-sm px-3 py-3 rounded-lg transition-all duration-200 font-medium hover:bg-gray-100 min-w-0"
                >
                  <span className="hidden lg:inline">Dashboard</span>
                  <span className="lg:hidden">Home</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="api-keys" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md text-xs sm:text-sm px-3 py-3 rounded-lg transition-all duration-200 font-medium hover:bg-gray-100 min-w-0"
                >
                  <span className="hidden sm:inline">API Keys</span>
                  <span className="sm:hidden">Keys</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="usage" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md text-xs sm:text-sm px-3 py-3 rounded-lg transition-all duration-200 font-medium hover:bg-gray-100 min-w-0"
                >
                  <span className="hidden lg:inline">Usage</span>
                  <span className="lg:hidden">Stats</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="docs" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md text-xs sm:text-sm px-3 py-3 rounded-lg transition-all duration-200 font-medium hover:bg-gray-100 min-w-0"
                >
                  <span className="hidden lg:inline">Docs</span>
                  <span className="lg:hidden">Doc</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="sandbox" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md text-xs sm:text-sm px-3 py-3 rounded-lg transition-all duration-200 font-medium hover:bg-gray-100 min-w-0"
                >
                  <span className="hidden lg:inline">Sandbox</span>
                  <span className="lg:hidden">Test</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="trust-score" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md text-xs sm:text-sm px-3 py-3 rounded-lg transition-all duration-200 font-medium hover:bg-gray-100 min-w-0"
                >
                  <span className="hidden lg:inline">TrustScore</span>
                  <span className="lg:hidden">Trust</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="support" 
                  className="data-[state=active]:bg-white data-[state=active]:text-blue-700 data-[state=active]:shadow-md text-xs sm:text-sm px-3 py-3 rounded-lg transition-all duration-200 font-medium hover:bg-gray-100 min-w-0"
                >
                  <span className="hidden lg:inline">Support</span>
                  <span className="lg:hidden">Help</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="dashboard" className="space-y-8">
              {/* Enhanced Account Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <Card className="lg:col-span-2 bg-white border border-gray-200 shadow-lg rounded-xl">
                  <CardHeader className="pb-6 pt-8 px-8">
                    <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-blue-100 rounded-lg">
                        <Settings className="h-6 w-6 text-blue-600" />
                      </div>
                      Account Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6 px-8 pb-8">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="flex flex-col space-y-2">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Status</span>
                        <div className="flex justify-start">
                          {getStatusBadge((account as any)?.status || 'pending')}
                        </div>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Company</span>
                        <span className="text-lg font-semibold text-gray-900">{(account as any)?.companyName}</span>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">API Keys</span>
                        <span className="text-lg font-semibold text-gray-900">{apiKeys?.length || 0} Active</span>
                      </div>
                      <div className="flex flex-col space-y-2">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Monthly Usage</span>
                        <span className="text-lg font-semibold text-gray-900">{(usageStats?.currentMonth || 0).toLocaleString()} calls</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-lg rounded-xl">
                  <CardHeader className="pb-6 pt-8 px-8">
                    <CardTitle className="text-xl font-bold text-gray-900 flex items-center gap-3">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Activity className="h-6 w-6 text-green-600" />
                      </div>
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 px-8 pb-8">
                    <Button 
                      onClick={() => setActiveTab("api-keys")}
                      className="w-full h-12 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-base font-semibold rounded-lg shadow-md transition-all duration-200"
                    >
                      <Key className="h-5 w-5 mr-3" />
                      Manage API Keys
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full h-12 border-2 border-green-300 text-green-700 hover:bg-green-50 hover:border-green-400 text-base font-semibold rounded-lg transition-all duration-200"
                      onClick={() => setActiveTab("docs")}
                    >
                      <Code className="h-5 w-5 mr-3" />
                      View Documentation
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full h-12 border-2 border-purple-300 text-purple-700 hover:bg-purple-50 hover:border-purple-400 text-base font-semibold rounded-lg transition-all duration-200"
                      onClick={() => setActiveTab("trust-score")}
                    >
                      <Shield className="h-5 w-5 mr-3" />
                      Trust Score Simulation
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Usage Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-blue-700 uppercase tracking-wider">Monthly API Calls</p>
                        <p className="text-4xl font-bold text-blue-900">{(usageStats?.currentMonth || 0).toLocaleString()}</p>
                        <p className="text-xs text-blue-600">+12% from last month</p>
                      </div>
                      <div className="p-4 bg-blue-200 rounded-xl">
                        <BarChart3 className="h-8 w-8 text-blue-700" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-green-700 uppercase tracking-wider">Success Rate</p>
                        <p className="text-4xl font-bold text-green-900">99.9%</p>
                        <p className="text-xs text-green-600">Excellent performance</p>
                      </div>
                      <div className="p-4 bg-green-200 rounded-xl">
                        <TrendingUp className="h-8 w-8 text-green-700" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-purple-50 to-indigo-100 border border-purple-200 shadow-lg rounded-xl hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-8">
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <p className="text-sm font-semibold text-purple-700 uppercase tracking-wider">Avg Response Time</p>
                        <p className="text-4xl font-bold text-purple-900">45ms</p>
                        <p className="text-xs text-purple-600">Sub-50ms guaranteed</p>
                      </div>
                      <div className="p-4 bg-purple-200 rounded-xl">
                        <Clock className="h-8 w-8 text-purple-700" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="api-keys" className="space-y-8">
              {/* Header Section */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">API Key Management</h2>
                  <p className="text-lg text-gray-600">Generate and manage secure API keys tailored to your industry needs</p>
                </div>
              </div>

              {/* Create New API Key Section */}
              <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 shadow-lg rounded-xl">
                <CardHeader className="pb-6 pt-8 px-8">
                  <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Plus className="h-6 w-6 text-blue-600" />
                    </div>
                    Generate New API Key
                  </CardTitle>
                  <CardDescription className="text-base text-gray-600">
                    Create industry-specific API keys with tailored fraud prevention and trust scoring capabilities
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-8 px-8 pb-8">
                  {/* API Key Name Input */}
                  <div className="space-y-3">
                    <Label htmlFor="keyName" className="text-base font-semibold text-gray-800">API Key Name</Label>
                    <Input
                      id="keyName"
                      value={apiKeyName}
                      onChange={(e) => setApiKeyName(e.target.value)}
                      placeholder="Enter descriptive name (e.g., Production Banking API, Development E-commerce Key)"
                      className="h-14 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg text-base"
                    />
                    <p className="text-sm text-gray-500">Choose a descriptive name to easily identify this key later</p>
                  </div>

                  {/* Industry Selection */}
                  <div className="space-y-3">
                    <Label htmlFor="industry" className="text-base font-semibold text-gray-900">Select Industry</Label>
                    <Select value={selectedIndustry} onValueChange={setSelectedIndustry}>
                      <SelectTrigger 
                        id="industry"
                        data-testid="select-industry"
                        className="h-14 border border-gray-300 hover:border-blue-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl text-base bg-white shadow-sm transition-all"
                      >
                        <SelectValue placeholder="Choose your industry" />
                      </SelectTrigger>
                      <SelectContent 
                        position="popper"
                        side="bottom"
                        align="start"
                        sideOffset={4}
                        className="z-[999999] max-h-[420px] w-[var(--radix-select-trigger-width)] bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden"
                      >
                        {industryConfigs.map((industry) => {
                          const IconComponent = industry.icon;
                          return (
                            <SelectItem 
                              key={industry.id} 
                              value={industry.id}
                              data-testid={`industry-option-${industry.id}`}
                              className="cursor-pointer hover:bg-blue-50 focus:bg-blue-50 data-[state=checked]:bg-blue-100 px-4 py-3 border-b border-gray-100 last:border-b-0 transition-colors"
                            >
                              <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-50 rounded-lg flex-shrink-0">
                                  <IconComponent className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="font-semibold text-gray-900 text-sm">{industry.name}</div>
                                </div>
                              </div>
                            </SelectItem>
                          );
                        })}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Industry Configuration Display */}
                  {selectedIndustryConfig && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                      <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                        <div className="p-2.5 bg-blue-600 rounded-lg">
                          <selectedIndustryConfig.icon className="h-5 w-5 text-white" />
                        </div>
                        <h4 className="text-lg font-bold text-gray-900">{selectedIndustryConfig.name}</h4>
                      </div>
                      <p className="text-gray-600 text-sm mb-6">{selectedIndustryConfig.description}</p>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Use Cases */}
                        <div className="space-y-3">
                          <h5 className="text-base font-semibold text-gray-900">Primary Use Case</h5>
                          <Select value={selectedUseCase} onValueChange={setSelectedUseCase}>
                            <SelectTrigger 
                              data-testid="select-use-case"
                              className="h-12 border border-gray-300 hover:border-blue-500 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 rounded-xl bg-white shadow-sm transition-all text-sm"
                            >
                              <SelectValue placeholder="Choose your use case" />
                            </SelectTrigger>
                            <SelectContent 
                              position="popper"
                              side="bottom"
                              align="start"
                              sideOffset={4}
                              className="z-[999999] max-h-[320px] w-[var(--radix-select-trigger-width)] bg-white border border-gray-200 shadow-xl rounded-xl overflow-hidden"
                            >
                              {selectedIndustryConfig.useCases.map((useCase, index) => (
                                <SelectItem 
                                  key={index} 
                                  value={useCase}
                                  data-testid={`use-case-option-${index}`}
                                  className="cursor-pointer hover:bg-blue-50 focus:bg-blue-50 data-[state=checked]:bg-blue-100 px-4 py-3 border-b border-gray-100 last:border-b-0 transition-colors text-sm"
                                >
                                  {useCase}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          
                          <div className="space-y-2 mt-4">
                            <h6 className="text-sm font-semibold text-gray-700">Key Features</h6>
                            <ul className="space-y-1.5">
                              {selectedIndustryConfig.features.map((feature, index) => (
                                <li key={index} className="text-sm text-gray-600 flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                                  <span>{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* Rate Limits & Permissions */}
                        <div className="space-y-3">
                          <h5 className="text-base font-semibold text-gray-900">Rate Limits</h5>
                          <div className="bg-gray-50 rounded-lg p-4 space-y-2.5">
                            <div className="flex justify-between items-center">
                              <span className="text-sm text-gray-600">API Calls</span>
                              <span className="font-semibold text-gray-900">{selectedIndustryConfig.rateLimits.apiCalls.toLocaleString()}/hr</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                              <span className="text-sm text-gray-600">Fraud Checks</span>
                              <span className="font-semibold text-gray-900">{selectedIndustryConfig.rateLimits.fraudChecks.toLocaleString()}/hr</span>
                            </div>
                            <div className="flex justify-between items-center border-t border-gray-200 pt-2">
                              <span className="text-sm text-gray-600">KYC Verifications</span>
                              <span className="font-semibold text-gray-900">{selectedIndustryConfig.rateLimits.kycVerifications.toLocaleString()}/hr</span>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <h6 className="text-sm font-semibold text-gray-700">Permissions</h6>
                            <div className="flex flex-wrap gap-1.5">
                              {selectedIndustryConfig.permissions.map((permission) => (
                                <Badge key={permission} variant="secondary" className="text-xs font-normal">
                                  {permission.replace(/_/g, ' ')}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Generate Button */}
                  <div className="flex justify-end pt-4">
                    <Button 
                      onClick={handleGenerateApiKey}
                      className="h-14 px-8 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-lg text-base transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                      disabled={!apiKeyName.trim() || !selectedIndustry || !selectedUseCase || createApiKeyMutation.isPending}
                    >
                      <Key className="h-5 w-5 mr-3" />
                      {createApiKeyMutation.isPending ? "Generating..." : "Generate Industry-Specific API Key"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Existing API Keys List */}
              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Your API Keys</h3>
                {keysLoading ? (
                  <Card className="bg-white border border-gray-200 shadow-sm rounded-xl">
                    <CardContent className="p-12 text-center">
                      <div className="animate-spin w-10 h-10 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
                      <p className="text-gray-600 text-lg">Loading your API keys...</p>
                    </CardContent>
                  </Card>
                ) : Array.isArray(apiKeys) && apiKeys.length > 0 ? (
                  <div className="space-y-6">
                    {apiKeys.map((key: any) => {
                      const keyIndustryConfig = industryConfigs.find(config => config.id === key.industry);
                      const IconComponent = keyIndustryConfig?.icon || Key;
                      
                      return (
                        <Card key={key.id} className="bg-white border border-gray-200 shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300">
                          <CardContent className="p-8">
                            <div className="flex items-start justify-between mb-6">
                              <div className="flex items-center gap-4">
                                <div className="p-3 bg-gray-100 rounded-xl">
                                  <IconComponent className="h-8 w-8 text-gray-600" />
                                </div>
                                <div>
                                  <h4 className="text-xl font-bold text-gray-900">{key.name}</h4>
                                  <div className="flex items-center gap-3 mt-2">
                                    <Badge variant={key.status === 'active' ? 'default' : 'destructive'} className="text-sm">
                                      {key.status}
                                    </Badge>
                                    <Badge variant="outline" className="text-sm">
                                      {keyIndustryConfig?.name || 'General'}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                              {key.status === 'active' && (
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  className="h-10 px-4"
                                  disabled={deleteApiKeyMutation.isPending}
                                  onClick={() => {
                                    if (confirm('Are you sure you want to revoke this API key? This action cannot be undone.')) {
                                      deleteApiKeyMutation.mutate(key.id);
                                    }
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Revoke
                                </Button>
                              )}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                              <div className="space-y-4">
                                <div>
                                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">API Key</span>
                                  <div className="flex items-center space-x-3 mt-2">
                                    <code className="bg-gray-100 px-4 py-2 rounded-lg text-sm font-mono flex-1">
                                      {showApiKey[key.id] ? key.key : '•'.repeat(32) + (key.keyPrefix || key.key?.slice(-8) || '••••••••')}
                                    </code>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => toggleApiKeyVisibility(key.id)}
                                      className="h-10 w-10"
                                    >
                                      {showApiKey[key.id] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => copyToClipboard(key.key)}
                                      className="h-10 w-10"
                                    >
                                      <Copy className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                
                                <div className="space-y-3">
                                  <div>
                                    <span className="text-sm font-medium text-gray-500">Created</span>
                                    <p className="text-gray-900">{new Date(key.createdAt).toLocaleDateString()}</p>
                                  </div>
                                  <div>
                                    <span className="text-sm font-medium text-gray-500">Last Used</span>
                                    <p className="text-gray-900">{key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleDateString() : 'Never'}</p>
                                  </div>
                                </div>
                              </div>

                              <div className="space-y-4">
                                <div>
                                  <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Permissions</span>
                                  <div className="flex flex-wrap gap-2 mt-2">
                                    {(key.permissions || []).map((permission: string) => (
                                      <Badge key={permission} variant="secondary" className="text-xs">
                                        {permission.replace('_', ' ')}
                                      </Badge>
                                    ))}
                                  </div>
                                </div>
                                
                                {key.rateLimits && (
                                  <div>
                                    <span className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Rate Limits</span>
                                    <div className="bg-gray-50 p-3 rounded-lg mt-2 space-y-2">
                                      <div className="flex justify-between text-sm">
                                        <span>API Calls:</span>
                                        <span className="font-medium">{key.rateLimits.apiCalls?.toLocaleString()}/hour</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span>Fraud Checks:</span>
                                        <span className="font-medium">{key.rateLimits.fraudChecks?.toLocaleString()}/hour</span>
                                      </div>
                                      <div className="flex justify-between text-sm">
                                        <span>KYC Verifications:</span>
                                        <span className="font-medium">{key.rateLimits.kycVerifications?.toLocaleString()}/hour</span>
                                      </div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                ) : (
                  <Card className="bg-gradient-to-br from-gray-50 to-blue-50 border border-gray-200 shadow-lg rounded-xl">
                    <CardContent className="p-12 text-center">
                      <div className="p-4 bg-blue-100 rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                        <Key className="h-10 w-10 text-blue-600" />
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-3">No API Keys Yet</h3>
                      <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">Create your first industry-specific API key to start using TrustVerify's fraud prevention and trust scoring services.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </TabsContent>

            <TabsContent value="create-key" className="space-y-6">
              <div className="max-w-2xl">
                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Create New API Key</h2>
                  <p className="text-gray-600">Generate a new API key for secure access to TrustVerify services</p>
                </div>

                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <form onSubmit={handleApiKeySubmit(onCreateApiKey)} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="apiKeyName" className="text-sm font-medium text-gray-700">
                          Key Name
                        </Label>
                        <Input
                          id="apiKeyName"
                          placeholder="e.g., Production API Key, Development Key"
                          className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...registerApiKey("name")}
                        />
                        {apiKeyErrors.name && (
                          <p className="text-sm text-red-600">{apiKeyErrors.name.message}</p>
                        )}
                        <p className="text-sm text-gray-500">
                          Choose a descriptive name to help you identify this key later
                        </p>
                      </div>

                      <div className="flex items-center space-x-4">
                        <Button
                          type="submit"
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                          disabled={createApiKeyMutation.isPending}
                        >
                          {createApiKeyMutation.isPending ? "Creating..." : "Create API Key"}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveTab("api-keys")}
                        >
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="api-keys" className="space-y-6">
              <div className="space-y-6">
                {/* New API Key Alert */}
                {newApiKey && (
                  <Card className="border-green-200 bg-green-50">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                        <div className="flex-1">
                          <h3 className="font-medium text-green-900">API Key Created Successfully</h3>
                          <p className="text-sm text-green-700 mt-1">
                            Copy your API key now. For security reasons, it won't be shown again.
                          </p>
                          <div className="mt-3 flex items-center space-x-2">
                            <code className="bg-white px-3 py-2 rounded border text-sm font-mono">
                              {newApiKey}
                            </code>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => copyToClipboard(newApiKey)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            size="sm"
                            variant="outline"
                            className="mt-3"
                            onClick={() => setNewApiKey(null)}
                          >
                            I've saved my key
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}


              </div>
            </TabsContent>

            <TabsContent value="usage" className="space-y-6">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Usage Analytics</CardTitle>
                  <CardDescription>Track your API usage and performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Usage analytics coming soon</h3>
                    <p className="text-gray-600">Detailed usage charts and analytics will be available in the next update.</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="docs" className="space-y-6">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">Help Center</CardTitle>
                  <CardDescription>Integration guides, documentation, and support resources</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Quick Start</h3>
                      <div className="bg-gray-900 rounded-lg p-4 text-sm text-gray-100 font-mono">
                        <div className="text-green-400"># Install the TrustVerify SDK</div>
                        <div className="text-white">npm install @trustverify/sdk</div>
                        <br />
                        <div className="text-green-400"># Initialize the client</div>
                        <div className="text-white">const trustverify = new TrustVerify(&#123;</div>
                        <div className="text-white ml-4">apiKey: 'your_api_key',</div>
                        <div className="text-white ml-4">environment: 'production'</div>
                        <div className="text-white">&#125;);</div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-semibold text-gray-900">Documentation & Resources</h3>
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50"
                          onClick={() => window.open('/api-reference', '_blank')}
                        >
                          <ExternalLink className="h-4 w-4 mr-2" />
                          API Reference
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-green-200 text-green-600 hover:bg-green-50"
                          onClick={() => window.open('/sdk-documentation', '_blank')}
                        >
                          <Code className="h-4 w-4 mr-2" />
                          SDK Documentation
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-gray-200 text-gray-600 hover:bg-gray-50"
                          onClick={() => window.open('/integration-examples', '_blank')}
                        >
                          <Globe className="h-4 w-4 mr-2" />
                          Integration Examples
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50"
                          onClick={() => window.open('mailto:support@trustverify.com?subject=Developer Support Request', '_blank')}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Contact Support
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Testing Sandbox Tab */}
            <TabsContent value="sandbox" className="space-y-6">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <Beaker className="h-6 w-6 mr-2 text-blue-600" />
                    API Testing Sandbox
                  </CardTitle>
                  <CardDescription>
                    Test your API calls in real-time with our interactive sandbox environment.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* API Endpoint Selection */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Select API Endpoint</h3>
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-blue-200 text-blue-600 hover:bg-blue-50"
                          onClick={() => setActiveTab("sandbox")}
                        >
                          <Shield className="h-4 w-4 mr-2" />
                          POST /api/fraud/analyze
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-green-200 text-green-600 hover:bg-green-50"
                          onClick={() => setActiveTab("sandbox")}
                        >
                          <Users className="h-4 w-4 mr-2" />
                          POST /api/kyc/submit
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start border-purple-200 text-purple-600 hover:bg-purple-50"
                          onClick={() => setActiveTab("sandbox")}
                        >
                          <DollarSign className="h-4 w-4 mr-2" />
                          POST /api/transactions/create
                        </Button>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Request Builder</h3>
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <pre className="text-sm text-gray-700 whitespace-pre-wrap">
{`{
  "transactionId": "txn_test_123",
  "userAgent": "Mozilla/5.0...",
  "ipAddress": "192.168.1.1",
  "amount": 299.99,
  "currency": "USD",
  "deviceFingerprint": "test_device_123"
}`}
                        </pre>
                      </div>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                        <Play className="h-4 w-4 mr-2" />
                        Test API Call
                      </Button>
                    </div>
                  </div>

                  {/* Response Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Response</h3>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                      <pre className="text-sm text-green-800 whitespace-pre-wrap">
{`{
  "riskScore": 23,
  "riskLevel": "low",
  "fraudProbability": 0.08,
  "recommendations": [
    "Allow transaction",
    "No additional verification required"
  ],
  "timestamp": "2025-07-01T19:16:00Z"
}`}
                      </pre>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Trust Score Simulation Tab */}
            <TabsContent value="trust-score" className="space-y-6">
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <Target className="h-6 w-6 mr-2 text-purple-600" />
                    Trust Score Simulation
                  </CardTitle>
                  <CardDescription>
                    Input user data and get real-time trust score calculations to understand our scoring algorithm.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Input Form */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">User Data Input</h3>
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Account Age (days)</Label>
                          <Input 
                            type="number" 
                            placeholder="90"
                            className="mt-1 border-gray-300 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Transaction History</Label>
                          <Input 
                            type="number" 
                            placeholder="15"
                            className="mt-1 border-gray-300 focus:border-purple-500"
                          />
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">KYC Verification Level</Label>
                          <select className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:border-purple-500">
                            <option value="none">None</option>
                            <option value="basic">Basic</option>
                            <option value="full">Full</option>
                          </select>
                        </div>
                        <div>
                          <Label className="text-sm font-medium text-gray-700">Dispute History</Label>
                          <Input 
                            type="number" 
                            placeholder="0"
                            className="mt-1 border-gray-300 focus:border-purple-500"
                          />
                        </div>
                        <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                          <Calculator className="h-4 w-4 mr-2" />
                          Calculate Trust Score
                        </Button>
                      </div>
                    </div>

                    {/* Score Display */}
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900">Trust Score Result</h3>
                      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 p-6 rounded-lg text-center">
                        <div className="text-4xl font-bold text-purple-600 mb-2">87</div>
                        <div className="text-lg font-medium text-purple-800 mb-4">Highly Trusted</div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Account Age:</span>
                            <span className="text-green-600">+25 points</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Transaction History:</span>
                            <span className="text-green-600">+20 points</span>
                          </div>
                          <div className="flex justify-between">
                            <span>KYC Verification:</span>
                            <span className="text-green-600">+30 points</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Clean Record:</span>
                            <span className="text-green-600">+12 points</span>
                          </div>
                        </div>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                        <h4 className="font-medium text-blue-900 mb-2">Recommendations</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Allow high-value transactions</li>
                          <li>• Minimal verification required</li>
                          <li>• Suitable for premium features</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Support Tab */}
            <TabsContent value="support" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Options */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 flex items-center">
                      <Headphones className="h-6 w-6 mr-2 text-green-600" />
                      Get Support
                    </CardTitle>
                    <CardDescription>
                      Multiple ways to get help with your integration and development questions.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700 text-white justify-start"
                      onClick={() => window.open('mailto:api-support@trustverify.com?subject=Developer Support Request', '_blank')}
                    >
                      <Mail className="h-4 w-4 mr-2" />
                      Email Support (api-support@trustverify.com)
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 justify-start"
                      onClick={() => window.open('https://trustverify-community.slack.com', '_blank')}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Join Developer Slack Community
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 justify-start"
                      onClick={() => window.open('/live-chat', '_blank')}
                    >
                      <Phone className="h-4 w-4 mr-2" />
                      Live Chat Support
                    </Button>
                  </CardContent>
                </Card>

                {/* Resources */}
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900 flex items-center">
                      <Book className="h-6 w-6 mr-2 text-blue-600" />
                      Developer Resources
                    </CardTitle>
                    <CardDescription>
                      Documentation, guides, and tools to accelerate your development.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 justify-start"
                      onClick={() => window.open('/api-reference', '_blank')}
                    >
                      <Code className="h-4 w-4 mr-2" />
                      API Reference Documentation
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 justify-start"
                      onClick={() => window.open('/sdk-guides', '_blank')}
                    >
                      <Package className="h-4 w-4 mr-2" />
                      SDK Integration Guides
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 justify-start"
                      onClick={() => window.open('/code-samples', '_blank')}
                    >
                      <FileText className="h-4 w-4 mr-2" />
                      Code Samples & Examples
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full border-gray-200 text-gray-600 hover:bg-gray-50 justify-start"
                      onClick={() => window.open('/status', '_blank')}
                    >
                      <Activity className="h-4 w-4 mr-2" />
                      API Status & Uptime
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* FAQ Section */}
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 flex items-center">
                    <HelpCircle className="h-6 w-6 mr-2 text-orange-600" />
                    Frequently Asked Questions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="font-medium text-gray-900 mb-2">How do I get started with the API?</h4>
                      <p className="text-sm text-gray-600">
                        First, create your developer account and generate an API key. Then check out our quickstart guide in the documentation tab.
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="font-medium text-gray-900 mb-2">What are the rate limits?</h4>
                      <p className="text-sm text-gray-600">
                        Free tier: 1,000 calls/month. Paid plans start at 10,000 calls/month. Enterprise plans have custom limits.
                      </p>
                    </div>
                    <div className="border-b border-gray-200 pb-4">
                      <h4 className="font-medium text-gray-900 mb-2">How accurate is the fraud detection?</h4>
                      <p className="text-sm text-gray-600">
                        Our AI models achieve 99.8% accuracy with less than 0.1% false positive rate across all transaction types.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Do you offer webhooks for real-time notifications?</h4>
                      <p className="text-sm text-gray-600">
                        Yes! We support webhooks for all major events. Check the API reference for webhook configuration details.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        )}
      </div>
    </div>
  );
}

export default DeveloperPortal;
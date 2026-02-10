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
  HelpCircle
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

function DeveloperPortal() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showApiKey, setShowApiKey] = useState<Record<number, boolean>>({});
  const [newApiKey, setNewApiKey] = useState<string | null>(null);

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
  const { data: account, isLoading: accountLoading } = useQuery({
    queryKey: ["/api/developer/account"],
    enabled: !!user,
  });

  // Fetch API keys
  const { data: apiKeys = [], isLoading: keysLoading } = useQuery<any[]>({
    queryKey: ["/api/developer/api-keys"],
    enabled: !!user && !!account,
  });

  // Fetch usage stats
  const { data: usageStats = {} } = useQuery<any>({
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
          <Card className="max-w-2xl mx-auto bg-white border border-gray-200 shadow-sm">
            <CardHeader className="text-center">
              <CardTitle className="text-2xl text-gray-900">Create Developer Account</CardTitle>
              <CardDescription className="text-gray-600">
                Get started with TrustVerify API integration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAccountSubmit(onCreateAccount)} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="companyName" className="text-sm font-medium text-gray-700">
                    Company Name
                  </Label>
                  <Input
                    id="companyName"
                    placeholder="Your Company Inc."
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...registerAccount("companyName")}
                  />
                  {accountErrors.companyName && (
                    <p className="text-sm text-red-600">{accountErrors.companyName.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="text-sm font-medium text-gray-700">
                    Website (Optional)
                  </Label>
                  <Input
                    id="website"
                    type="url"
                    placeholder="https://yourcompany.com"
                    className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...registerAccount("website")}
                  />
                  {accountErrors.website && (
                    <p className="text-sm text-red-600">{accountErrors.website.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-sm font-medium text-gray-700">
                    Project Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe how you plan to use TrustVerify APIs..."
                    rows={4}
                    className="border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                    {...registerAccount("description")}
                  />
                  {accountErrors.description && (
                    <p className="text-sm text-red-600">{accountErrors.description.message}</p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                  disabled={createAccountMutation.isPending}
                >
                  {createAccountMutation.isPending ? "Creating Account..." : "Create Developer Account"}
                </Button>
              </form>
            </CardContent>
          </Card>
        ) : (
          /* Developer Dashboard */
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4 sm:space-y-6">
            {/* Mobile-responsive header with proper spacing */}
            <div className="bg-white border border-gray-200 rounded-lg p-2 sm:p-3">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-1 sm:gap-2 bg-transparent">
                <TabsTrigger 
                  value="dashboard" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-2 rounded-md transition-all duration-200"
                >
                  <span className="hidden sm:inline">Dashboard</span>
                  <span className="sm:hidden">Home</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="api-keys" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-2 rounded-md transition-all duration-200"
                >
                  <span className="hidden sm:inline">API Keys</span>
                  <span className="sm:hidden">Keys</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="usage" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-2 rounded-md transition-all duration-200"
                >
                  <span className="hidden lg:inline">Usage Dashboard</span>
                  <span className="hidden sm:inline lg:hidden">Usage</span>
                  <span className="sm:hidden">Stats</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="docs" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-2 rounded-md transition-all duration-200"
                >
                  <span className="hidden sm:inline">Documentation</span>
                  <span className="sm:hidden">Docs</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="sandbox" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-2 rounded-md transition-all duration-200"
                >
                  <span className="hidden lg:inline">Testing Sandbox</span>
                  <span className="hidden sm:inline lg:hidden">Sandbox</span>
                  <span className="sm:hidden">Test</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="trust-score" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-2 rounded-md transition-all duration-200"
                >
                  <span className="hidden lg:inline">Trust Score Simulation</span>
                  <span className="hidden sm:inline lg:hidden">Trust Score</span>
                  <span className="sm:hidden">Score</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="support" 
                  className="data-[state=active]:bg-blue-50 data-[state=active]:text-blue-700 text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-2 rounded-md transition-all duration-200"
                >
                  Support
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
              {/* Mobile-Enhanced Account Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
                <Card className="lg:col-span-2 bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-lg sm:text-xl text-gray-900 flex items-center gap-2">
                      <Settings className="h-5 w-5 text-blue-600" />
                      Account Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 sm:space-y-4 pt-0">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                      <span className="text-sm sm:text-base text-gray-600">Status</span>
                      <div className="flex justify-start sm:justify-end">
                        {getStatusBadge(account?.status || 'pending')}
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                      <span className="text-sm sm:text-base text-gray-600">Company</span>
                      <span className="text-sm sm:text-base font-medium text-gray-900 break-words">{account?.companyName}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                      <span className="text-sm sm:text-base text-gray-600">API Keys</span>
                      <span className="text-sm sm:text-base font-medium text-gray-900">{apiKeys?.length || 0}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 sm:gap-0">
                      <span className="text-sm sm:text-base text-gray-600">Monthly Usage</span>
                      <span className="text-sm sm:text-base font-medium text-gray-900">{usageStats?.currentMonth || 0} calls</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardHeader className="pb-3 sm:pb-6">
                    <CardTitle className="text-lg text-gray-900 flex items-center gap-2">
                      <Activity className="h-5 w-5 text-green-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 sm:space-y-3 pt-0">
                    <Button 
                      onClick={() => setActiveTab("api-keys")}
                      className="w-full h-10 sm:h-11 bg-blue-600 hover:bg-blue-700 text-white text-sm sm:text-base"
                    >
                      <Key className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">Manage API Keys</span>
                      <span className="sm:hidden">API Keys</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      className="w-full h-10 sm:h-11 border-green-200 text-green-600 hover:bg-green-50 text-sm sm:text-base"
                      onClick={() => setActiveTab("docs")}
                    >
                      <Code className="h-4 w-4 mr-2" />
                      <span className="hidden sm:inline">View Documentation</span>
                      <span className="sm:hidden">Docs</span>
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Usage Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Monthly Calls</p>
                        <p className="text-3xl font-bold text-blue-600">{usageStats?.currentMonth || 0}</p>
                      </div>
                      <div className="p-3 bg-blue-100 rounded-full">
                        <BarChart3 className="h-6 w-6 text-blue-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Success Rate</p>
                        <p className="text-3xl font-bold text-green-600">99.9%</p>
                      </div>
                      <div className="p-3 bg-green-100 rounded-full">
                        <TrendingUp className="h-6 w-6 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600">Avg Response</p>
                        <p className="text-3xl font-bold text-gray-900">45ms</p>
                      </div>
                      <div className="p-3 bg-gray-100 rounded-full">
                        <Clock className="h-6 w-6 text-gray-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="api-keys" className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">API Keys</h2>
                  <p className="text-gray-600">Manage your API keys for secure authentication</p>
                </div>
                <Button 
                  onClick={() => setActiveTab("create-key")}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Key
                </Button>
              </div>
              
              {/* API Keys List */}
              {keysLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
                  <p className="text-gray-600 mt-4">Loading API keys...</p>
                </div>
              ) : Array.isArray(apiKeys) && apiKeys.length > 0 ? (
                <div className="space-y-4">
                  {apiKeys.map((key: any) => (
                    <Card key={key.id} className="bg-white border border-gray-200 shadow-sm">
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h3 className="font-semibold text-gray-900">{key.name}</h3>
                              <Badge className={key.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}>
                                {key.status}
                              </Badge>
                            </div>
                            <div className="space-y-1">
                              <p className="text-sm text-gray-600">
                                Created: {new Date(key.createdAt).toLocaleDateString()}
                              </p>
                              <p className="text-sm text-gray-600">
                                Last used: {key.lastUsedAt ? new Date(key.lastUsedAt).toLocaleDateString() : 'Never'}
                              </p>
                              <div className="flex items-center space-x-2 mt-2">
                                <code className="text-sm bg-gray-100 px-2 py-1 rounded font-mono">
                                  {key.keyPrefix}••••••••••••••••••••••••••••
                                </code>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:text-red-700 hover:bg-red-50"
                              disabled={deleteApiKeyMutation.isPending}
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this API key? This action cannot be undone.')) {
                                  deleteApiKeyMutation.mutate(key.id);
                                }
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white border border-gray-200 shadow-sm">
                  <CardContent className="p-12 text-center">
                    <Key className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No API Keys</h3>
                    <p className="text-gray-600 mb-6">Create your first API key to start using the TrustVerify API.</p>
                    <Button 
                      onClick={() => setActiveTab("create-key")}
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Create Your First Key
                    </Button>
                  </CardContent>
                </Card>
              )}
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
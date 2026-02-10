import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/navigation";
import { KycVerification } from "@/components/kyc-verification";
import { TrustScore } from "@/components/trust-score";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Shield, 
  FileText, 
  CreditCard,
  TrendingUp,
  Users,
  PoundSterling,
  Plus,
  Upload,
  MessageSquare,
  Eye,
  Globe,
  Activity,
  ShoppingCart, // Added ShoppingCart icon
  Settings
} from "lucide-react";

interface DashboardStats {
  activeTransactions: number;
  completedTransactions: number;
  totalEscrow: string;
  pendingDisputes: number;
}

interface Transaction {
  id: number;
  title: string;
  amount: string;
  status: string;
  buyerId: number;
  sellerId: number;
  createdAt: string;
  updatedAt: string;
}

interface KycStatus {
  status: string;
  submittedAt?: string;
}

function Dashboard() {
  const { user } = useAuth();

  // Fetch real transactions from API
  const { data: transactionsData, isLoading: loadingTransactions } = useQuery<{transactions: Transaction[]; pagination: any}>({
    queryKey: ["/api/transactions", { page: 1, limit: 20 }],
    queryFn: async () => {
      const response = await fetch('/api/transactions?page=1&limit=20', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch transactions');
      return response.json();
    },
    enabled: !!user,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });

  const transactions = transactionsData?.transactions || [];

  if (!user) {
    return null;
  }

  // Calculate real stats from actual transactions
  const activeTransactions = transactions.filter(t => 
    ['pending', 'active', 'processing', 'kyc_required', 'kyb_required', 'aml_check', 'verification_approved', 'escrow'].includes(t.status)
  ).length;
  
  const completedTransactions = transactions.filter(t => 
    t.status === 'completed'
  ).length;
  
  const totalEscrowAmount = transactions
    .filter(t => ['escrow', 'active'].includes(t.status))
    .reduce((sum, t) => sum + parseFloat(t.amount || '0'), 0);

  const stats: DashboardStats = {
    activeTransactions,
    completedTransactions,
    totalEscrow: `£${totalEscrowAmount.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
    pendingDisputes: transactions.filter(t => t.status === 'disputed').length
  };

  const recentTransactions = transactions.slice(0, 5);

  const kycStatus: KycStatus = {
    status: user.verificationLevel || "none",
    submittedAt: "2024-01-12T09:00:00Z"
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      processing: { color: "bg-amber-100 text-amber-800 border-amber-200", label: "Processing" },
      active: { color: "bg-[#E8F0FB] text-[#0A3778] border-[#0A3778]/20", label: "Active" },
      completed: { color: "bg-[#E6F9F1] text-[#1DBF73] border-[#1DBF73]/20", label: "Completed" },
      pending: { color: "bg-amber-50 text-amber-700 border-amber-200", label: "Pending" },
      disputed: { color: "bg-red-100 text-red-800 border-red-200", label: "Disputed" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={`${config.color} font-medium border`}>{config.label}</Badge>;
  };

  const getVerificationBadge = (level: string) => {
    const levelConfig = {
      none: { color: "bg-gray-100 text-gray-800 border-gray-200", label: "Not Verified", icon: AlertTriangle },
      basic: { color: "bg-[#E8F0FB] text-[#0A3778] border-[#0A3778]/20", label: "Basic Verified", icon: CheckCircle },
      full: { color: "bg-[#E6F9F1] text-[#1DBF73] border-[#1DBF73]/20", label: "Fully Verified", icon: Shield }
    };

    const config = levelConfig[level as keyof typeof levelConfig] || levelConfig.none;
    const IconComponent = config.icon;

    return (
      <Badge className={`${config.color} font-medium flex items-center gap-1 border`}>
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
        {/* Security Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="securityPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="#0A3778"/>
                <path d="M0,10 L20,10 M10,0 L10,20" stroke="#0A3778" strokeWidth="0.2"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#securityPattern)"/>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">

      <Navigation />

      
        {/* Header */}
        <div className="mb-8 text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#0A3778] to-[#0D4594] flex items-center justify-center shadow-lg shadow-[#0A3778]/20">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Security Dashboard</h1>
            <p className="text-slate-600 text-lg font-medium">Advanced fraud protection and transaction monitoring</p>
          </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Transactions</p>
                  <p className="text-3xl font-bold text-[#0A3778]">{stats.activeTransactions}</p>
                </div>
                <div className="p-3 bg-[#E8F0FB] rounded-full">
                  <Activity className="h-6 w-6 text-[#0A3778]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-[#1DBF73]">{stats.completedTransactions}</p>
                </div>
                <div className="p-3 bg-[#E6F9F1] rounded-full">
                  <CheckCircle className="h-6 w-6 text-[#1DBF73]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total in Escrow</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalEscrow}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  <PoundSterling className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Trust Score</p>
                  <p className="text-3xl font-bold text-[#0A3778]">{user.trustScore}</p>
                </div>
                <div className="p-3 bg-[#E8F0FB] rounded-full">
                  <Shield className="h-6 w-6 text-[#0A3778]" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Transactions */}
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-900">Recent Transactions</CardTitle>
                  <Link href="/transactions">
                    <Button variant="outline" size="sm" className="border-[#0A3778] text-[#0A3778] hover:bg-[#E8F0FB]">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {loadingTransactions ? (
                  <div className="p-12 text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0A3778] mx-auto mb-4"></div>
                    <p className="text-gray-600">Loading transactions...</p>
                  </div>
                ) : recentTransactions.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{transaction.title}</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(transaction.createdAt).toLocaleDateString('en-GB')}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="font-semibold text-gray-900">
                              £{parseFloat(transaction.amount).toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            {getStatusBadge(transaction.status)}
                            <Link href={`/transactions/${transaction.id}`}>
                              <Button variant="ghost" size="sm" className="text-[#0A3778] hover:text-[#0D4594] hover:bg-[#E8F0FB]">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-12 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No transactions yet</h3>
                    <p className="text-gray-600 mb-6">Start your first secure transaction today</p>
                    <Link href="/transactions/new">
                      <Button className="bg-[#0A3778] hover:bg-[#0D4594] text-white shadow-lg hover:shadow-xl transition-all">
                        Create Transaction
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border border-gray-200 shadow-lg">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-xl font-semibold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/transactions/new">
                    <Button className="w-full h-24 flex flex-col items-center justify-center bg-[#E8F0FB] hover:bg-[#0A3778] text-[#0A3778] hover:text-white border-2 border-[#0A3778]/20 hover:border-[#0A3778] transition-all shadow-md hover:shadow-lg">
                      <Plus className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium">New Transaction</span>
                    </Button>
                  </Link>

                  <Link href="/verification">
                    <Button className="w-full h-24 flex flex-col items-center justify-center bg-green-50 hover:bg-green-100 text-green-600 border-2 border-green-200">
                      <Upload className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium">Upload KYC</span>
                    </Button>
                  </Link>

                  <Link href="/messages">
                    <Button className="w-full h-24 flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 border-2 border-gray-200">
                      <MessageSquare className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium">Messages</span>
                    </Button>
                  </Link>

                  <Link href="/report-scam">
                    <Button className="w-full h-24 flex flex-col items-center justify-center bg-red-50 hover:bg-red-100 text-red-600 border-2 border-red-200">
                      <AlertTriangle className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium">Report Scam</span>
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Account Status */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg font-semibold text-gray-900">Account Status</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Verification Level</span>
                    {getVerificationBadge(user.verificationLevel || "none")}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Trust Score</span>
                    <span className="text-lg font-semibold text-blue-600">{user.trustScore}/10.0</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Profile Completion</span>
                      <span className="font-medium text-gray-900">75%</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>
                </div>

                {user.verificationLevel === "none" && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <h4 className="font-medium text-blue-900 mb-2">Verify Your Identity</h4>
                    <p className="text-sm text-blue-700 mb-3">
                      Complete identity verification to unlock higher transaction limits and build trust.
                    </p>
                    <p className="text-xs text-blue-600 mb-3">
                      Transaction limit: £375
                    </p>
                    <Link href="/verification">
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                        Start Verification
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Features */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg font-semibold text-gray-900">Security Features</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <Shield className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Two-Factor Authentication</h4>
                      <p className="text-xs text-gray-600">Enhanced account security</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Globe className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Global Fraud Detection</h4>
                      <p className="text-xs text-gray-600">Real-time protection</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-green-100 rounded-full">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Encrypted Communications</h4>
                      <p className="text-xs text-gray-600">End-to-end security</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* API Keys Section */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg font-semibold text-gray-900">Developer Tools</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-purple-100 rounded-full">
                      <Settings className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">API Integration</h4>
                      <p className="text-xs text-gray-600">Access your API keys and documentation</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 rounded-full">
                      <Activity className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">Usage Analytics</h4>
                      <p className="text-xs text-gray-600">Monitor API usage and performance</p>
                    </div>
                  </div>
                  
                  <Link href="/api-docs">
                    <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                      Get API Keys
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Trust Score Component */}
            <TrustScore 
              score={8.5}
              completedTransactions={stats.completedTransactions}
              verificationLevel={user?.verificationLevel || "none"}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
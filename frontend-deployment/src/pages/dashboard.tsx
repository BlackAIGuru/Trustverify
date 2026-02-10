import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/navigation";
import { KycVerification } from "@/components/kyc-verification";
import { TrustScore } from "@/components/trust-score";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "wouter";
import { 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Shield, 
  FileText, 
  CreditCard,
  TrendingUp,
  Users,
  DollarSign,
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

  if (!user) {
    return null;
  }

  // Mock data - in real app, this would come from API
  const stats: DashboardStats = {
    activeTransactions: 3,
    completedTransactions: 15,
    totalEscrow: "£5,687.50", // Updated to include new £2,500.00 transaction
    pendingDisputes: 0
  };

  const recentTransactions: Transaction[] = [
    {
      id: 1,
      title: "E-commerce Purchase",
      amount: "£2,500.00", // Updated to exactly £2,500
      status: "processing",
      buyerId: 1,
      sellerId: 2,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    },
    {
      id: 2,
      title: "Digital Marketing Services - UK",
      amount: "£1,125.00",
      status: "active",
      buyerId: 1,
      sellerId: 3,
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z"
    },
    {
      id: 3,
      title: "Website Development - London",
      amount: "£2,062.50",
      status: "completed",
      buyerId: 1,
      sellerId: 4,
      createdAt: "2024-01-10T14:00:00Z",
      updatedAt: "2024-01-14T16:00:00Z"
    }
  ];

  const kycStatus: KycStatus = {
    status: user.verificationLevel || "none",
    submittedAt: "2024-01-12T09:00:00Z"
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      processing: { color: "bg-orange-100 text-orange-800", label: "Processing" },
      active: { color: "bg-blue-100 text-blue-800", label: "Active" },
      completed: { color: "bg-green-100 text-green-800", label: "Completed" },
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending" },
      disputed: { color: "bg-red-100 text-red-800", label: "Disputed" }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={`${config.color} font-medium`}>{config.label}</Badge>;
  };

  const getVerificationBadge = (level: string) => {
    const levelConfig = {
      none: { color: "bg-gray-100 text-gray-800", label: "Not Verified", icon: AlertTriangle },
      basic: { color: "bg-blue-100 text-blue-800", label: "Basic Verified", icon: CheckCircle },
      full: { color: "bg-green-100 text-green-800", label: "Fully Verified", icon: Shield }
    };

    const config = levelConfig[level as keyof typeof levelConfig] || levelConfig.none;
    const IconComponent = config.icon;

    return (
      <Badge className={`${config.color} font-medium flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
        {/* Security Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="securityPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                <circle cx="10" cy="10" r="1" fill="#1E3A8A"/>
                <path d="M0,10 L20,10 M10,0 L10,20" stroke="#1E3A8A" strokeWidth="0.2"/>
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
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
                <Shield className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-slate-900 mb-2">Security Dashboard</h1>
            <p className="text-slate-600 text-lg font-medium">Advanced fraud protection and transaction monitoring</p>
          </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Active Transactions</p>
                  <p className="text-3xl font-bold text-blue-600">{stats.activeTransactions}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Activity className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-3xl font-bold text-green-600">{stats.completedTransactions}</p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total in Escrow</p>
                  <p className="text-3xl font-bold text-gray-900">{stats.totalEscrow}</p>
                </div>
                <div className="p-3 bg-gray-100 rounded-full">
                  <DollarSign className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Trust Score</p>
                  <p className="text-3xl font-bold text-blue-600">{user.trustScore}</p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Recent Transactions */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl font-semibold text-gray-900">Recent Transactions</CardTitle>
                  <Link href="/transactions">
                    <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {recentTransactions.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {recentTransactions.map((transaction) => (
                      <div key={transaction.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-1">{transaction.title}</h3>
                            <p className="text-sm text-gray-600">
                              {new Date(transaction.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className="font-semibold text-gray-900">{transaction.amount}</span>
                            {getStatusBadge(transaction.status)}
                            <Link href={`/transactions/${transaction.id}`}>
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
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
                      <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                        Create Transaction
                      </Button>
                    </Link>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-xl font-semibold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Link href="/transactions/new">
                    <Button className="w-full h-24 flex flex-col items-center justify-center bg-blue-50 hover:bg-blue-100 text-blue-600 border-2 border-blue-200">
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
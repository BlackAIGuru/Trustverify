import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Users, 
  Shield, 
  Flag, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Search,
  Eye,
  Edit,
  Ban,
  FileCheck,
  Settings,
  BarChart3,
  TrendingUp,
  UserCheck,
  AlertCircle
} from "lucide-react";

interface KycVerification {
  id: number;
  userId: number;
  userName: string;
  userEmail: string;
  documentType: string;
  documentNumber: string;
  status: string;
  submittedAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
  notes?: string;
}

interface Dispute {
  id: number;
  transactionId: number;
  transactionTitle: string;
  raisedBy: string;
  reason: string;
  description: string;
  status: string;
  createdAt: string;
  amount: string;
}

interface ScamReport {
  id: number;
  reporterId: number;
  reporterName: string;
  scammerInfo: string;
  scamType: string;
  description: string;
  status: string;
  createdAt: string;
  amount?: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  verificationLevel: string;
  trustScore: string;
  status: string;
  joinedAt: string;
  lastActive: string;
}

export default function AdminDashboard() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - in real app, this would come from API
  const kycVerifications: KycVerification[] = [
    {
      id: 1,
      userId: 123,
      userName: "John Smith",
      userEmail: "john@example.com",
      documentType: "passport",
      documentNumber: "P123456789",
      status: "pending",
      submittedAt: "2024-01-15T10:00:00Z",
    },
    {
      id: 2,
      userId: 124,
      userName: "Jane Doe",
      userEmail: "jane@example.com",
      documentType: "driver_license",
      documentNumber: "DL987654321",
      status: "approved",
      submittedAt: "2024-01-14T14:30:00Z",
      reviewedAt: "2024-01-15T09:00:00Z",
      reviewedBy: "admin",
      notes: "All documents verified successfully"
    }
  ];

  const disputes: Dispute[] = [
    {
      id: 1,
      transactionId: 456,
      transactionTitle: "Website Development",
      raisedBy: "buyer@example.com",
      reason: "Service not delivered",
      description: "The seller has not delivered the promised website after 2 weeks",
      status: "investigating",
      createdAt: "2024-01-15T12:00:00Z",
      amount: "$2,500.00"
    }
  ];

  const scamReports: ScamReport[] = [
    {
      id: 1,
      reporterId: 789,
      reporterName: "Alice Johnson",
      scammerInfo: "scammer@fake.com",
      scamType: "payment_fraud",
      description: "Received payment but never delivered goods",
      status: "verified",
      createdAt: "2024-01-15T08:00:00Z",
      amount: "$150.00"
    }
  ];

  const users: User[] = [
    {
      id: 123,
      username: "johnsmith",
      email: "john@example.com",
      verificationLevel: "verified",
      trustScore: "95",
      status: "active",
      joinedAt: "2024-01-01T00:00:00Z",
      lastActive: "2024-01-15T15:30:00Z"
    },
    {
      id: 124,
      username: "janedoe",
      email: "jane@example.com",
      verificationLevel: "basic",
      trustScore: "87",
      status: "active",
      joinedAt: "2024-01-02T00:00:00Z",
      lastActive: "2024-01-15T14:20:00Z"
    }
  ];

  const stats = {
    totalUsers: 47,
    activeUsers: 32,
    pendingKyc: 5,
    activeDisputes: 1,
    verifiedReports: 3,
    totalTransactions: 89,
    totalVolume: "£45,200",
    platformFees: "£1,130"
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
      case "verified":
      case "resolved":
      case "active":
        return "text-[#00B386] bg-[#00B386]/10";
      case "pending":
      case "investigating":
        return "text-[#1F4DD8] bg-[#1F4DD8]/10";
      case "rejected":
      case "disputed":
      case "suspended":
        return "text-[#D72638] bg-[#D72638]/10";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
      case "verified":
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
      case "investigating":
        return <Clock className="h-4 w-4" />;
      case "rejected":
      case "disputed":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const handleKycAction = (id: number, action: string) => {
    console.log(`KYC ${action} for ID: ${id}`);
    // In real app, this would make API call
  };

  const handleDisputeAction = (id: number, action: string) => {
    console.log(`Dispute ${action} for ID: ${id}`);
    // In real app, this would make API call
  };

  const handleUserAction = (id: number, action: string) => {
    console.log(`User ${action} for ID: ${id}`);
    // In real app, this would make API call
  };

  if (!user?.isAdmin) {
    return (
      <div className="min-h-screen bg-[#F4F6FA] flex items-center justify-center">
        <Card className="trustverify-card border-0 p-8">
          <div className="text-center">
            <AlertCircle className="h-12 w-12 text-[#D72638] mx-auto mb-4" />
            <h2 className="text-xl font-bold text-[#2B2E3A] mb-2">Access Denied</h2>
            <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2B2E3A] mb-2">
            Admin Dashboard
          </h1>
          <p className="text-gray-600">
            Manage users, verifications, disputes, and platform operations
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-5 mb-8 bg-white">
            <TabsTrigger value="overview" className="data-[state=active]:bg-[#1F4DD8] data-[state=active]:text-white">
              <BarChart3 className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="kyc" className="data-[state=active]:bg-[#1F4DD8] data-[state=active]:text-white">
              <FileCheck className="h-4 w-4 mr-2" />
              KYC Review
            </TabsTrigger>
            <TabsTrigger value="disputes" className="data-[state=active]:bg-[#1F4DD8] data-[state=active]:text-white">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Disputes
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-[#1F4DD8] data-[state=active]:text-white">
              <Flag className="h-4 w-4 mr-2" />
              Scam Reports
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-[#1F4DD8] data-[state=active]:text-white">
              <Users className="h-4 w-4 mr-2" />
              Users
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="trustverify-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-[#1F4DD8] rounded-xl">
                      <Users className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Total Users</p>
                      <p className="text-2xl font-bold text-[#2B2E3A]">{stats.totalUsers.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="trustverify-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-[#00B386] rounded-xl">
                      <UserCheck className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Users</p>
                      <p className="text-2xl font-bold text-[#2B2E3A]">{stats.activeUsers.toLocaleString()}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="trustverify-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-amber-500 rounded-xl">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Pending KYC</p>
                      <p className="text-2xl font-bold text-[#2B2E3A]">{stats.pendingKyc}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="trustverify-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center">
                    <div className="p-3 bg-[#D72638] rounded-xl">
                      <AlertTriangle className="h-6 w-6 text-white" />
                    </div>
                    <div className="ml-4">
                      <p className="text-sm font-medium text-gray-600">Active Disputes</p>
                      <p className="text-2xl font-bold text-[#2B2E3A]">{stats.activeDisputes}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Platform Metrics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="trustverify-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#2B2E3A]">
                    <TrendingUp className="h-5 w-5 mr-2 text-[#1F4DD8]" />
                    Transaction Volume
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Transactions</span>
                      <span className="font-semibold text-[#2B2E3A]">{stats.totalTransactions.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Volume</span>
                      <span className="font-semibold text-[#2B2E3A]">{stats.totalVolume}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Fees</span>
                      <span className="font-semibold text-[#00B386]">{stats.platformFees}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="trustverify-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#2B2E3A]">
                    <Shield className="h-5 w-5 mr-2 text-[#00B386]" />
                    Security Status
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Verified Reports</span>
                      <span className="font-semibold text-[#00B386]">{stats.verifiedReports}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Open Disputes</span>
                      <span className="font-semibold text-[#D72638]">{stats.activeDisputes}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Safety</span>
                      <span className="font-semibold text-[#00B386]">99.2%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="trustverify-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#2B2E3A]">
                    <Settings className="h-5 w-5 mr-2 text-[#1F4DD8]" />
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full trustverify-button-primary">
                    Export Reports
                  </Button>
                  <Button className="w-full trustverify-button-success">
                    Platform Settings
                  </Button>
                  <Button variant="outline" className="w-full">
                    View Analytics
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="kyc">
            <Card className="trustverify-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-[#2B2E3A]">
                  <FileCheck className="h-6 w-6 mr-3 text-[#1F4DD8]" />
                  KYC Verification Queue
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Review and approve user identity verification submissions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {kycVerifications.map((kyc) => (
                    <div key={kyc.id} className="p-6 border border-gray-200 rounded-xl bg-white">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-[#2B2E3A]">{kyc.userName}</h4>
                          <p className="text-sm text-gray-600">{kyc.userEmail}</p>
                          <p className="text-sm text-gray-500">
                            {kyc.documentType.replace('_', ' ').toUpperCase()}: {kyc.documentNumber}
                          </p>
                        </div>
                        <Badge className={`${getStatusColor(kyc.status)} border-0`}>
                          {getStatusIcon(kyc.status)}
                          <span className="ml-1">{kyc.status}</span>
                        </Badge>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-4">
                        <p>Submitted: {new Date(kyc.submittedAt).toLocaleString()}</p>
                        {kyc.reviewedAt && (
                          <p>Reviewed: {new Date(kyc.reviewedAt).toLocaleString()}</p>
                        )}
                        {kyc.notes && <p>Notes: {kyc.notes}</p>}
                      </div>

                      {kyc.status === "pending" && (
                        <div className="flex space-x-3">
                          <Button 
                            size="sm" 
                            onClick={() => handleKycAction(kyc.id, "approve")}
                            className="trustverify-button-success"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleKycAction(kyc.id, "reject")}
                            className="border-[#D72638] text-[#D72638] hover:bg-[#D72638] hover:text-white"
                          >
                            <AlertTriangle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleKycAction(kyc.id, "view")}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            Review Documents
                          </Button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="disputes">
            <Card className="trustverify-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-[#2B2E3A]">
                  <AlertTriangle className="h-6 w-6 mr-3 text-[#D72638]" />
                  Transaction Disputes
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Review and resolve transaction disputes between users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {disputes.map((dispute) => (
                    <div key={dispute.id} className="p-6 border border-gray-200 rounded-xl bg-white">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-[#2B2E3A]">{dispute.transactionTitle}</h4>
                          <p className="text-sm text-gray-600">Raised by: {dispute.raisedBy}</p>
                          <p className="text-sm text-gray-600">Amount: {dispute.amount}</p>
                          <p className="text-sm font-medium text-[#D72638] mt-1">{dispute.reason}</p>
                        </div>
                        <Badge className={`${getStatusColor(dispute.status)} border-0`}>
                          {getStatusIcon(dispute.status)}
                          <span className="ml-1">{dispute.status}</span>
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-4">{dispute.description}</p>
                      <p className="text-xs text-gray-500 mb-4">
                        Created: {new Date(dispute.createdAt).toLocaleString()}
                      </p>

                      <div className="flex space-x-3">
                        <Button 
                          size="sm" 
                          onClick={() => handleDisputeAction(dispute.id, "resolve")}
                          className="trustverify-button-success"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Resolve
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDisputeAction(dispute.id, "view")}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Details
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleDisputeAction(dispute.id, "escalate")}
                        >
                          <AlertTriangle className="h-4 w-4 mr-1" />
                          Escalate
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports">
            <Card className="trustverify-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-[#2B2E3A]">
                  <Flag className="h-6 w-6 mr-3 text-[#D72638]" />
                  Scam Reports
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Review and verify community-reported scam activities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scamReports.map((report) => (
                    <div key={report.id} className="p-6 border border-gray-200 rounded-xl bg-white">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-[#2B2E3A]">{report.scamType.replace('_', ' ').toUpperCase()}</h4>
                          <p className="text-sm text-gray-600">Reported by: {report.reporterName}</p>
                          <p className="text-sm font-medium text-[#D72638]">Target: {report.scammerInfo}</p>
                          {report.amount && <p className="text-sm text-gray-600">Amount: {report.amount}</p>}
                        </div>
                        <Badge className={`${getStatusColor(report.status)} border-0`}>
                          {getStatusIcon(report.status)}
                          <span className="ml-1">{report.status}</span>
                        </Badge>
                      </div>
                      
                      <p className="text-sm text-gray-700 mb-4">{report.description}</p>
                      <p className="text-xs text-gray-500 mb-4">
                        Reported: {new Date(report.createdAt).toLocaleString()}
                      </p>

                      <div className="flex space-x-3">
                        <Button 
                          size="sm" 
                          onClick={() => handleKycAction(report.id, "verify")}
                          className="trustverify-button-success"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Verify
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleKycAction(report.id, "investigate")}
                        >
                          <Search className="h-4 w-4 mr-1" />
                          Investigate
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleKycAction(report.id, "dismiss")}
                          className="border-[#D72638] text-[#D72638] hover:bg-[#D72638] hover:text-white"
                        >
                          Dismiss
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users">
            <Card className="trustverify-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-[#2B2E3A]">
                  <Users className="h-6 w-6 mr-3 text-[#1F4DD8]" />
                  User Management
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Manage user accounts, verification status, and access controls
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search users by username or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 rounded-xl border-gray-200"
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  {users.map((userData) => (
                    <div key={userData.id} className="p-6 border border-gray-200 rounded-xl bg-white">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h4 className="font-semibold text-[#2B2E3A]">{userData.username}</h4>
                          <p className="text-sm text-gray-600">{userData.email}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-sm text-gray-600">
                              Trust Score: <span className="font-medium text-[#00B386]">{userData.trustScore}</span>
                            </span>
                            <Badge className={`text-xs ${getStatusColor(userData.verificationLevel)} border-0`}>
                              {userData.verificationLevel}
                            </Badge>
                            <Badge className={`text-xs ${getStatusColor(userData.status)} border-0`}>
                              {userData.status}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600 mb-4">
                        <p>Joined: {new Date(userData.joinedAt).toLocaleDateString()}</p>
                        <p>Last Active: {new Date(userData.lastActive).toLocaleString()}</p>
                      </div>

                      <div className="flex space-x-3">
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUserAction(userData.id, "view")}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          View Profile
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUserAction(userData.id, "edit")}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={() => handleUserAction(userData.id, "suspend")}
                          className="border-[#D72638] text-[#D72638] hover:bg-[#D72638] hover:text-white"
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Suspend
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
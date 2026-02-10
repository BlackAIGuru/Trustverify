import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useRoute } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Shield, CheckCircle, AlertTriangle, Clock, User, Building2, DollarSign, Rocket } from "lucide-react";
import { Link } from "wouter";
import type { Transaction } from "@shared/schema";
import { KybUpload } from "@/components/kyb-upload";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function TransactionDetail() {
  const [, params] = useRoute("/transactions/:id");
  const transactionId = params?.id;
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: transaction, isLoading, refetch } = useQuery<Transaction>({
    queryKey: ["/api/transactions", transactionId],
    queryFn: async () => {
      const response = await fetch(`/api/transactions/${transactionId}`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch transaction');
      return response.json();
    },
    enabled: !!transactionId,
  });

  const launchTransactionMutation = useMutation({
    mutationFn: async () => {
      const response = await apiRequest("POST", "/api/escrow/create", {
        transactionId: parseInt(transactionId!),
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions", transactionId] });
      toast({
        title: "Transaction Launched",
        description: "Escrow has been created successfully. Transaction is now active.",
      });
      refetch();
    },
    onError: (error: any) => {
      toast({
        title: "Launch Failed",
        description: error.message || "Failed to launch transaction. Please try again.",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!transaction) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Transaction Not Found</h2>
          <Link href="/transactions">
            <Button>Back to Transactions</Button>
          </Link>
        </div>
      </div>
    );
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: "bg-amber-50 text-amber-700 border-amber-200", label: "Pending" },
      kyc_required: { color: "bg-orange-100 text-orange-800 border-orange-200", label: "KYC Required" },
      kyb_required: { color: "bg-orange-100 text-orange-800 border-orange-200", label: "KYB Required" },
      aml_check: { color: "bg-[#E8F0FB] text-[#0A3778] border-[#0A3778]/20", label: "AML Check" },
      verification_approved: { color: "bg-[#E6F9F1] text-[#1DBF73] border-[#1DBF73]/20", label: "Verification Approved" },
      escrow: { color: "bg-[#E8F0FB] text-[#0A3778] border-[#0A3778]/20", label: "In Escrow" },
      active: { color: "bg-[#E8F0FB] text-[#0A3778] border-[#0A3778]/20", label: "Active" },
      delivered: { color: "bg-[#E6F9F1] text-[#1DBF73] border-[#1DBF73]/20", label: "Delivered" },
      completed: { color: "bg-[#E6F9F1] text-[#1DBF73] border-[#1DBF73]/20", label: "Completed" },
      disputed: { color: "bg-red-100 text-red-800 border-red-200", label: "Disputed" },
      cancelled: { color: "bg-gray-100 text-gray-800 border-gray-200", label: "Cancelled" },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={`${config.color} font-medium border`}>{config.label}</Badge>;
  };

  const getVerificationStatusIcon = (status: string) => {
    if (status === 'approved' || status === 'verified') return <CheckCircle className="h-5 w-5 text-[#1DBF73]" />;
    if (status === 'pending') return <Clock className="h-5 w-5 text-amber-600" />;
    return <AlertTriangle className="h-5 w-5 text-gray-400" />;
  };

  return (
    <div className="min-h-screen bg-[color:var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/transactions">
            <Button variant="ghost" className="mb-4 hover:bg-[#E8F0FB] text-[#0A3778]" data-testid="button-back-to-transactions">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Transactions
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900" data-testid="text-transaction-title">{transaction.title}</h1>
              <p className="text-gray-600 mt-1">Transaction ID: {transaction.id}</p>
            </div>
            {getStatusBadge(transaction.status || 'pending')}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Transaction Overview */}
            <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-xl font-semibold text-gray-900">Transaction Overview</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Amount</span>
                  <span className="text-2xl font-bold text-gray-900" data-testid="text-amount">
                    £{parseFloat(transaction.amount || '0').toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Currency</span>
                  <span className="font-medium text-gray-900">{transaction.currency}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Created</span>
                  <span className="font-medium text-gray-900">
                    {transaction.createdAt ? new Date(transaction.createdAt).toLocaleDateString('en-GB', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    }) : 'N/A'}
                  </span>
                </div>
                {transaction.description && (
                  <div className="pt-4 border-t border-gray-100">
                    <span className="text-gray-600 block mb-2">Description</span>
                    <p className="text-gray-900">{transaction.description}</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* KYB Upload Form - Show when KYB is required or when buyer type is business */}
            {(transaction.status === 'kyb_required' || transaction.status === 'pending') && transaction.kybStatus !== 'approved' && (
              <KybUpload 
                transactionId={transaction.id} 
                onSuccess={() => {
                  refetch();
                }}
              />
            )}

            {/* Verification Status */}
            <Card className="bg-white border border-gray-200 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-xl font-semibold text-gray-900">Verification Status</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getVerificationStatusIcon(transaction.kycStatus || 'pending')}
                    <span className="text-gray-900 font-medium">KYC Status</span>
                  </div>
                  <Badge className={
                    transaction.kycStatus === 'approved' ? 'bg-[#E6F9F1] text-[#1DBF73] border-[#1DBF73]/20' :
                    transaction.kycStatus === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-gray-100 text-gray-800 border-gray-200'
                  } data-testid="badge-kyc-status">
                    {transaction.kycStatus || 'N/A'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getVerificationStatusIcon(transaction.kybStatus || 'pending')}
                    <span className="text-gray-900 font-medium">KYB Status</span>
                  </div>
                  <Badge className={
                    transaction.kybStatus === 'approved' ? 'bg-[#E6F9F1] text-[#1DBF73] border-[#1DBF73]/20' :
                    transaction.kybStatus === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-gray-100 text-gray-800 border-gray-200'
                  } data-testid="badge-kyb-status">
                    {transaction.kybStatus || 'N/A'}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    {getVerificationStatusIcon(transaction.amlStatus || 'pending')}
                    <span className="text-gray-900 font-medium">AML Status</span>
                  </div>
                  <Badge className={
                    transaction.amlStatus === 'clear' ? 'bg-[#E6F9F1] text-[#1DBF73] border-[#1DBF73]/20' :
                    transaction.amlStatus === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                    'bg-gray-100 text-gray-800 border-gray-200'
                  } data-testid="badge-aml-status">
                    {transaction.amlStatus || 'N/A'}
                  </Badge>
                </div>
              </CardContent>
            </Card>

            {/* Escrow Details */}
            {transaction.escrowStatus !== 'not_initiated' && (
              <Card className="bg-white border border-gray-200 shadow-sm">
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-xl font-semibold text-gray-900">Escrow Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Escrow Status</span>
                    <Badge className={
                      transaction.escrowStatus === 'held' ? 'bg-blue-100 text-blue-800' :
                      transaction.escrowStatus === 'released' ? 'bg-green-100 text-green-800' :
                      'bg-gray-100 text-gray-800'
                    } data-testid="badge-escrow-status">
                      {transaction.escrowStatus || 'N/A'}
                    </Badge>
                  </div>
                  {transaction.escrowAmount && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Escrow Amount</span>
                      <span className="font-semibold text-gray-900">
                        £{parseFloat(transaction.escrowAmount || '0').toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  )}
                  {transaction.escrowDepositedAt && (
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">Deposited At</span>
                      <span className="font-medium text-gray-900">
                        {new Date(transaction.escrowDepositedAt).toLocaleDateString('en-GB')}
                      </span>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Parties Involved */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg font-semibold text-gray-900">Parties Involved</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-blue-50 rounded-lg">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Buyer</p>
                    <p className="font-medium text-gray-900">User ID: {transaction.buyerId}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-green-50 rounded-lg">
                    <Building2 className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Seller</p>
                    <p className="font-medium text-gray-900">User ID: {transaction.sellerId}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Risk Assessment */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg font-semibold text-gray-900">Risk Assessment</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-600">Risk Score</span>
                  <span className="text-2xl font-bold text-gray-900" data-testid="text-risk-score">
                    {parseFloat(transaction.riskScore || '0').toFixed(2)}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      parseFloat(transaction.riskScore || '0') < 30 ? 'bg-green-500' :
                      parseFloat(transaction.riskScore || '0') < 70 ? 'bg-yellow-500' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${Math.min(parseFloat(transaction.riskScore || '0'), 100)}%` }}
                  ></div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  {parseFloat(transaction.riskScore || '0') < 30 ? 'Low Risk' :
                   parseFloat(transaction.riskScore || '0') < 70 ? 'Medium Risk' :
                   'High Risk'}
                </p>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg font-semibold text-gray-900">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-3">
                {/* Launch Transaction Button - Show when pending and ready to launch */}
                {(transaction.status === 'pending' || transaction.status === 'verification_approved') && !transaction.stripePaymentIntentId && (
                  <Button 
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white" 
                    onClick={() => launchTransactionMutation.mutate()}
                    disabled={launchTransactionMutation.isPending}
                    data-testid="button-launch-transaction"
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    {launchTransactionMutation.isPending ? "Launching..." : "Launch Transaction"}
                  </Button>
                )}
                <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" data-testid="button-contact-support">
                  <Shield className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
                {transaction.status === 'pending' && (
                  <Button variant="outline" className="w-full border-red-200 text-red-600 hover:bg-red-50" data-testid="button-cancel-transaction">
                    Cancel Transaction
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

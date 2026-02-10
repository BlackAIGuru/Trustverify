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
import { 
  Send, 
  Download, 
  Shield, 
  PoundSterling, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  ArrowRight,
  Lock,
  Eye,
  Users,
  MessageSquare
} from "lucide-react";

const transactionSchema = z.object({
  title: z.string().min(1, "Transaction title is required"),
  description: z.string().min(1, "Description is required"),
  amount: z.string().min(1, "Amount is required"),
  recipientEmail: z.string().email("Valid email is required"),
});

type TransactionForm = z.infer<typeof transactionSchema>;

interface Transaction {
  id: number;
  title: string;
  description: string;
  amount: string;
  status: string;
  buyer: string;
  seller: string;
  createdAt: string;
  escrowId: string;
}

export default function EscrowPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("send");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<TransactionForm>({
    resolver: zodResolver(transactionSchema),
  });

  // Mock transactions data
  const transactions: Transaction[] = [
    {
      id: 1,
      title: "Website Development",
      description: "Custom e-commerce website with payment integration",
      amount: "£2,500.00",
      status: "active",
      buyer: "john@example.com",
      seller: "jane@developer.com",
      createdAt: "2024-01-15T10:00:00Z",
      escrowId: "ESC-001"
    },
    {
      id: 2,
      title: "Logo Design",
      description: "Professional logo design for startup company",
      amount: "£750.00",
      status: "completed",
      buyer: "mike@startup.com",
      seller: "sarah@design.com",
      createdAt: "2024-01-10T14:30:00Z",
      escrowId: "ESC-002"
    },
    {
      id: 3,
      title: "Content Writing",
      description: "SEO-optimized blog posts for 3 months",
      amount: "£1,200.00",
      status: "pending",
      buyer: "alex@business.com",
      seller: "writer@content.com",
      createdAt: "2024-01-12T09:15:00Z",
      escrowId: "ESC-003"
    }
  ];

  const onSubmit = async (data: TransactionForm) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      reset();
      alert("Transaction created successfully!");
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "text-[#00B386] bg-[#00B386]/10";
      case "active":
        return "text-[#1F4DD8] bg-[#1F4DD8]/10";
      case "pending":
        return "text-amber-600 bg-amber-100";
      case "disputed":
        return "text-[#D72638] bg-[#D72638]/10";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4" />;
      case "active":
        return <Clock className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "disputed":
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2B2E3A] mb-2">
            Secure Escrow
          </h1>
          <p className="text-gray-600">
            Send and receive payments securely with our escrow protection
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="trustverify-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-[#1F4DD8] rounded-xl">
                  <PoundSterling className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total in Escrow</p>
                  <p className="text-2xl font-bold text-[#2B2E3A]">£4,450.00</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="trustverify-card border-0">
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-3 bg-[#00B386] rounded-xl">
                  <CheckCircle className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Completed</p>
                  <p className="text-2xl font-bold text-[#2B2E3A]">1</p>
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
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-[#2B2E3A]">2</p>
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
                  <p className="text-sm font-medium text-gray-600">Disputes</p>
                  <p className="text-2xl font-bold text-[#2B2E3A]">0</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Create Transaction */}
          <div className="lg:col-span-2">
            <Card className="trustverify-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-[#2B2E3A]">
                  <Shield className="h-6 w-6 mr-3 text-[#1F4DD8]" />
                  Create Secure Transaction
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Set up a new escrow transaction with built-in protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2 mb-6 bg-[#F4F6FA]">
                    <TabsTrigger 
                      value="send" 
                      className="data-[state=active]:bg-[#1F4DD8] data-[state=active]:text-white"
                    >
                      <Send className="h-4 w-4 mr-2" />
                      Send Payment
                    </TabsTrigger>
                    <TabsTrigger 
                      value="receive"
                      className="data-[state=active]:bg-[#00B386] data-[state=active]:text-white"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Request Payment
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="send" className="space-y-6">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title" className="text-[#2B2E3A]">Transaction Title</Label>
                        <Input
                          id="title"
                          placeholder="e.g., Website Development Services"
                          className="rounded-xl border-gray-200 focus:border-[#1F4DD8]"
                          {...register("title")}
                        />
                        {errors.title && (
                          <p className="text-sm text-[#D72638]">{errors.title.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="description" className="text-[#2B2E3A]">Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe the goods or services being exchanged"
                          className="rounded-xl border-gray-200 focus:border-[#1F4DD8]"
                          {...register("description")}
                        />
                        {errors.description && (
                          <p className="text-sm text-[#D72638]">{errors.description.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2 min-w-0">
                          <Label htmlFor="amount" className="text-[#2B2E3A] block">Amount (USD)</Label>
                          <Input
                            id="amount"
                            placeholder="0.00"
                            className="rounded-xl border-gray-200 focus:border-[#1F4DD8] w-full"
                            {...register("amount")}
                          />
                          {errors.amount && (
                            <p className="text-sm text-[#D72638] break-words">{errors.amount.message}</p>
                          )}
                        </div>

                        <div className="space-y-2 min-w-0">
                          <Label htmlFor="recipientEmail" className="text-[#2B2E3A] block">Recipient Email</Label>
                          <div className="relative">
                            <Input
                              id="recipientEmail"
                              type="email"
                              placeholder="recipient@example.com"
                              className="rounded-xl border-gray-200 focus:border-[#1F4DD8] w-full pr-4 truncate"
                              {...register("recipientEmail")}
                            />
                          </div>
                          {errors.recipientEmail && (
                            <p className="text-sm text-[#D72638] break-words">{errors.recipientEmail.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="bg-[#1F4DD8]/5 p-4 rounded-xl border border-[#1F4DD8]/20">
                        <div className="flex items-start space-x-3">
                          <Lock className="h-5 w-5 text-[#1F4DD8] mt-0.5" />
                          <div>
                            <h4 className="font-medium text-[#2B2E3A]">Escrow Protection</h4>
                            <p className="text-sm text-gray-600">
                              Funds will be held securely until both parties confirm transaction completion. 
                              A 2.5% escrow fee will be applied.
                            </p>
                          </div>
                        </div>
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full trustverify-button-primary"
                      >
                        {isSubmitting ? "Creating..." : "Create Secure Transaction"}
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </form>
                  </TabsContent>

                  <TabsContent value="receive" className="space-y-6">
                    <div className="text-center py-8">
                      <Download className="h-12 w-12 text-[#00B386] mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-[#2B2E3A] mb-2">Request Payment</h3>
                      <p className="text-gray-600 mb-6">
                        Send a secure payment request to a client or customer
                      </p>
                      <Button className="trustverify-button-success">
                        Create Payment Request
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Transaction List */}
          <div>
            <Card className="trustverify-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-[#2B2E3A]">
                  <Eye className="h-5 w-5 mr-2 text-[#1F4DD8]" />
                  Recent Transactions
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Your latest escrow transactions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="p-4 border border-gray-200 rounded-xl bg-white">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-[#2B2E3A]">{transaction.title}</h4>
                        <Badge className={`text-xs ${getStatusColor(transaction.status)} border-0`}>
                          {getStatusIcon(transaction.status)}
                          <span className="ml-1">{transaction.status}</span>
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">{transaction.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-[#2B2E3A]">{transaction.amount}</span>
                        <span className="text-xs text-gray-500">{transaction.escrowId}</span>
                      </div>
                      <div className="mt-3 flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button size="sm" variant="outline" className="flex-1">
                          <MessageSquare className="h-3 w-3 mr-1" />
                          Chat
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* How It Works */}
            <Card className="trustverify-card border-0 mt-6">
              <CardHeader>
                <CardTitle className="flex items-center text-[#2B2E3A]">
                  <Users className="h-5 w-5 mr-2 text-[#00B386]" />
                  How Escrow Works
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#1F4DD8] text-white rounded-full flex items-center justify-center text-sm font-medium">1</div>
                  <div>
                    <p className="text-sm font-medium text-[#2B2E3A]">Create Transaction</p>
                    <p className="text-xs text-gray-600">Buyer creates and funds escrow</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#1F4DD8] text-white rounded-full flex items-center justify-center text-sm font-medium">2</div>
                  <div>
                    <p className="text-sm font-medium text-[#2B2E3A]">Seller Delivers</p>
                    <p className="text-xs text-gray-600">Seller completes the work/service</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-[#00B386] text-white rounded-full flex items-center justify-center text-sm font-medium">3</div>
                  <div>
                    <p className="text-sm font-medium text-[#2B2E3A]">Release Funds</p>
                    <p className="text-xs text-gray-600">Buyer approves and funds are released</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
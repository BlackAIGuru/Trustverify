import { useState } from "react";
import React from "react";
import { Link } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  MessageSquare, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  DollarSign,
  Calendar,
  User,
  CreditCard
} from "lucide-react";
import { TransactionCard } from "@/components/transaction-card";
import { Shield } from 'lucide-react';



interface Transaction {
  id: number;
  title: string;
  description: string;
  amount: string;
  status: string;
  buyer: string;
  seller: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

export default function TransactionsPage() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Mock transactions data
  const allTransactions: Transaction[] = [
    {
      id: 1,
      title: "Website Development",
      description: "Custom e-commerce website with payment integration",
      amount: "$2,500.00",
      status: "active",
      buyer: "john@example.com",
      seller: "jane@developer.com",
      category: "Web Development",
      createdAt: "2024-01-15T10:00:00Z",
      updatedAt: "2024-01-15T10:00:00Z"
    },
    {
      id: 2,
      title: "Mobile App Design",
      description: "UI/UX design for iOS and Android application",
      amount: "$1,800.00",
      status: "completed",
      buyer: "sarah@startup.com",
      seller: "mike@design.com",
      category: "Design",
      createdAt: "2024-01-10T14:00:00Z",
      updatedAt: "2024-01-14T16:00:00Z"
    },
    {
      id: 3,
      title: "Content Writing",
      description: "Blog posts and marketing copy for 3 months",
      amount: "$750.00",
      status: "pending",
      buyer: "alex@marketing.com",
      seller: "writer@freelance.com",
      category: "Content",
      createdAt: "2024-01-12T09:00:00Z",
      updatedAt: "2024-01-12T09:00:00Z"
    }
  ];

  const filteredTransactions = allTransactions.filter(transaction => {
    const matchesSearch = transaction.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         transaction.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: "bg-blue-100 text-blue-800", label: "Active", icon: Clock },
      completed: { color: "bg-green-100 text-green-800", label: "Completed", icon: CheckCircle },
      pending: { color: "bg-yellow-100 text-yellow-800", label: "Pending", icon: Clock },
      disputed: { color: "bg-red-100 text-red-800", label: "Disputed", icon: AlertTriangle }
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    const IconComponent = config.icon;

    return (
      <Badge className={`${config.color} font-medium flex items-center gap-1`}>
        <IconComponent className="h-3 w-3" />
        {config.label}
      </Badge>
    );
  };

  const onSubmit = async (data: TransactionForm) => {
    setIsSubmitting(true);
    try {
      // Create transaction via API
      const response = await fetch('/api/transactions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          amount: parseFloat(data.amount.replace(/[$,]/g, '')),
          recipientEmail: data.recipientEmail,
          category: data.category,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create transaction');
      }

      const newTransaction = await response.json();
      console.log("Transaction created successfully:", newTransaction);

      // Reset form and close modal
      reset();
      setShowCreateForm(false);

      // Show success message (you might want to add a toast here)
      alert('Transaction created successfully!');

    } catch (error) {
      console.error("Error creating transaction:", error);
      alert('Failed to create transaction. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const categories = [
    "Web Development",
    "Mobile Development",
    "Design",
    "Content Writing",
    "Digital Marketing",
    "Consulting",
    "Other"
  ];

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* Transaction Security Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="transactionPattern" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <rect x="15" y="15" width="10" height="10" fill="#1E3A8A" opacity="0.3"/>
              <circle cx="20" cy="20" r="8" fill="none" stroke="#1E3A8A" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#transactionPattern)"/>
        </svg>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
              <CreditCard className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-2">Secure Transactions</h1>
          <p className="text-slate-600 text-lg font-medium">Monitor and manage your protected transactions</p>
        </div>




        {/* Filters and Search */}
        <Card className="mb-6 bg-white border border-gray-200 shadow-sm overflow-hidden">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 min-w-0">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search transactions..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500 w-full"
                  />
                  {/* Security indicator */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="flex items-center space-x-1">
                      <Shield className="h-4 w-4 text-green-500" />
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 flex-shrink-0">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-48 h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent 
                    className="z-50 min-w-[200px]"
                    align="end"
                    side="bottom"
                    sideOffset={4}
                  >
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="disputed">Disputed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transactions List */}
        <div className="space-y-4">
          {filteredTransactions.map((transaction) => (
            <Card key={transaction.id} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden card-content-safe">
              <CardContent className="p-6 overflow-hidden">
                <div className="flex items-start justify-between gap-4 min-w-0">
                  <div className="flex-item-grow">
                    <div className="flex items-center space-x-4 mb-3 gap-4 min-w-0">
                      <h3 className="text-lg font-semibold text-gray-900 text-truncate flex-1 min-w-0">{transaction.title}</h3>
                      <div className="flex-item-shrink">
                        {getStatusBadge(transaction.status)}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 line-clamp-2">{transaction.description}</p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center space-x-2 min-w-0">
                        <DollarSign className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-gray-600 flex-shrink-0">Amount:</span>
                        <span className="font-semibold text-gray-900 text-truncate">{transaction.amount}</span>
                      </div>
                      <div className="flex items-center space-x-2 min-w-0">
                        <User className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        <span className="text-gray-600 flex-shrink-0">Recipient:</span>
                        <span className="font-medium text-gray-900 email-container mobile-email-container">{transaction.seller}</span>
                      </div>
                      <div className="flex items-center space-x-2 min-w-0">
                        <Calendar className="h-4 w-4 text-gray-600 flex-shrink-0" />
                        <span className="text-gray-600 flex-shrink-0">Created:</span>
                        <span className="font-medium text-gray-900 text-truncate">
                          {new Date(transaction.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50 hidden sm:flex">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      <span className="button-text-safe">Messages</span>
                    </Button>
                    <Button variant="outline" size="sm" className="border-blue-200 text-blue-600 hover:bg-blue-50 sm:hidden">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-50 hidden sm:flex">
                      <Eye className="h-4 w-4 mr-1" />
                      <span className="button-text-safe">Details</span>
                    </Button>
                    <Button variant="outline" size="sm" className="border-gray-200 text-gray-600 hover:bg-gray-50 sm:hidden">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {filteredTransactions.length === 0 && (
            <Card className="bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-12 text-center">
                <DollarSign className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {searchQuery || statusFilter !== "all" ? "No transactions found" : "No transactions yet"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {searchQuery || statusFilter !== "all" 
                    ? "Try adjusting your search criteria or filters"
                    : "Create your first secure transaction to get started"
                  }
                </p>
                {!searchQuery && statusFilter === "all" && (
                  <Link href="/transactions/new">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Transaction
                    </Button>
                  </Link>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
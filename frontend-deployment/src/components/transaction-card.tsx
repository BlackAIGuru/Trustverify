import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  DollarSign, 
  MoreHorizontal,
  MessageSquare,
  Flag
} from "lucide-react";

interface Transaction {
  id: number;
  title: string;
  description?: string;
  amount: string;
  status: string;
  buyerId: number;
  sellerId: number;
  createdAt: string;
  updatedAt: string;
}

interface TransactionCardProps {
  transaction: Transaction;
  currentUserId: number;
  showActions?: boolean;
}

export function TransactionCard({ transaction, currentUserId, showActions = false }: TransactionCardProps) {
  const { toast } = useToast();

  const updateStatusMutation = useMutation({
    mutationFn: async (status: string) => {
      const response = await apiRequest("PATCH", `/api/transactions/${transaction.id}/status`, { status });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      toast({
        title: "Transaction Updated",
        description: "Transaction status has been updated successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update transaction status",
        variant: "destructive",
      });
    },
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "disputed":
        return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case "escrow":
      case "active":
        return <Clock className="h-4 w-4 text-blue-600" />;
      default:
        return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "disputed":
        return "bg-red-100 text-red-800";
      case "escrow":
        return "bg-yellow-100 text-yellow-800";
      case "active":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));

    if (diffInDays === 0) return "Today";
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays} days ago`;

    return date.toLocaleDateString();
  };

  const isUserBuyer = transaction.buyerId === currentUserId;
  const otherPartyId = isUserBuyer ? transaction.sellerId : transaction.buyerId;
  const userRole = isUserBuyer ? "Buyer" : "Seller";

  const canComplete = transaction.status === "active" || transaction.status === "escrow";
  const canDispute = transaction.status === "active" || transaction.status === "escrow";

  return (
    <Card className="hover:shadow-md transition-shadow duration-200 overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3 sm:gap-4">
          <div className="flex items-center space-x-3 min-w-0 flex-1">
            <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center flex-shrink-0">
              <DollarSign className="h-5 w-5 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="font-medium text-gray-900 truncate">{transaction.title}</h3>
              <p className="text-sm text-gray-600 truncate">
                {userRole} • with User #{otherPartyId}
              </p>
            </div>
          </div>
          <div className="flex items-center justify-between sm:block sm:text-right sm:flex-shrink-0">
            <p className="font-semibold text-gray-900 text-lg sm:text-base">${transaction.amount}</p>
            <Badge className={`text-xs ${getStatusColor(transaction.status)} flex items-center`}>
              {getStatusIcon(transaction.status)}
              <span className="ml-1 capitalize">{transaction.status}</span>
            </Badge>
          </div>
        </div>

        {transaction.description && (
          <p className="text-sm text-gray-600 mb-4 line-clamp-2">
            {transaction.description}
          </p>
        )}

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4">
          <span className="text-xs text-gray-500 flex items-center">
            <Clock className="h-3 w-3 mr-1 flex-shrink-0" />
            <span className="truncate">Updated {formatDate(transaction.updatedAt)}</span>
          </span>

          <div className="flex items-center space-x-2 sm:flex-shrink-0">
            <Button variant="outline" size="sm" asChild className="flex-1 sm:flex-none">
              <a href={`/messages?transaction=${transaction.id}`} className="flex items-center justify-center">
                <MessageSquare className="h-3 w-3 mr-1" />
                <span className="hidden xs:inline">Message</span>
                <span className="xs:hidden">Chat</span>
              </a>
            </Button>

            {showActions && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="px-2">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent 
                  align="end" 
                  className="z-50 min-w-[160px]"
                  side="bottom"
                  sideOffset={4}
                >
                  {canComplete && (
                    <DropdownMenuItem 
                      onClick={() => updateStatusMutation.mutate("completed")}
                      disabled={updateStatusMutation.isPending}
                    >
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Mark Complete
                    </DropdownMenuItem>
                  )}
                  {canDispute && (
                    <DropdownMenuItem 
                      onClick={() => updateStatusMutation.mutate("disputed")}
                      disabled={updateStatusMutation.isPending}
                      className="text-red-600"
                    >
                      <Flag className="mr-2 h-4 w-4" />
                      Raise Dispute
                    </DropdownMenuItem>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
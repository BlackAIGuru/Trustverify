import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "outline";
  className?: string;
}

export function StatusBadge({ status, variant = "default", className }: StatusBadgeProps) {
  const getStatusStyles = (status: string) => {
    const lowerStatus = status.toLowerCase();
    
    switch (lowerStatus) {
      case "completed":
      case "success":
      case "active":
      case "verified":
      case "approved":
        return "bg-green-50 text-green-700 border-green-200 hover:bg-green-100";
      
      case "pending":
      case "in_progress":
      case "reviewing":
      case "processing":
        return "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100";
      
      case "cancelled":
      case "rejected":
      case "failed":
      case "error":
      case "disputed":
        return "bg-red-50 text-red-700 border-red-200 hover:bg-red-100";
      
      case "draft":
      case "created":
      case "initiated":
        return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";
      
      case "warning":
      case "partial":
      case "limited":
        return "bg-orange-50 text-orange-700 border-orange-200 hover:bg-orange-100";
      
      default:
        return "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100";
    }
  };

  const formatStatus = (status: string) => {
    return status
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  };

  return (
    <Badge
      variant={variant}
      className={cn(
        "text-xs font-medium px-2.5 py-1 rounded-full border transition-colors duration-200",
        getStatusStyles(status),
        className
      )}
    >
      {formatStatus(status)}
    </Badge>
  );
}
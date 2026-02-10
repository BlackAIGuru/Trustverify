import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ReactNode } from "react";

interface ProfessionalCardProps {
  title?: string;
  children: ReactNode;
  className?: string;
  variant?: "default" | "elevated" | "glass" | "gradient";
  size?: "sm" | "md" | "lg";
  hover?: boolean;
}

export function ProfessionalCard({ 
  title, 
  children, 
  className, 
  variant = "default",
  size = "md",
  hover = true
}: ProfessionalCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "elevated":
        return "bg-white border-slate-200/60 shadow-elevated hover:shadow-xl";
      case "glass":
        return "bg-white/90 backdrop-blur-sm border-white/20 shadow-lg";
      case "gradient":
        return "bg-gradient-to-br from-white to-slate-50 border-slate-200/60 shadow-professional";
      default:
        return "bg-white border-slate-200/60 shadow-card";
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case "sm":
        return "p-4";
      case "lg":
        return "p-8";
      default:
        return "p-6";
    }
  };

  const hoverStyles = hover ? "transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5" : "";

  return (
    <Card className={cn(
      "border rounded-xl overflow-hidden",
      getVariantStyles(),
      hoverStyles,
      className
    )}>
      {title && (
        <CardHeader className={cn("border-b border-slate-100", size === "sm" ? "pb-3 px-4 pt-4" : "pb-4")}>
          <CardTitle className="text-lg font-semibold text-slate-900">{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={cn("relative", getSizeStyles())}>
        {children}
      </CardContent>
    </Card>
  );
}
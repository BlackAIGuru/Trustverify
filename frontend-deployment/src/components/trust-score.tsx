import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Shield, Star } from "lucide-react";

interface TrustScoreProps {
  score: number;
  completedTransactions: number;
  verificationLevel: string;
}

export function TrustScore({ score, completedTransactions, verificationLevel }: TrustScoreProps) {
  // Provide default values to prevent undefined errors
  const safeScore = score || 0;
  const safeTransactions = completedTransactions || 0;
  const safeVerificationLevel = verificationLevel || "none";

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 5) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 9) return "Excellent";
    if (score >= 7) return "Very Good";
    if (score >= 5) return "Good";
    if (score >= 3) return "Fair";
    return "Poor";
  };

  const getVerificationIcon = () => {
    switch (safeVerificationLevel) {
      case "full":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "basic":
        return <Shield className="h-4 w-4 text-yellow-600" />;
      default:
        return <Shield className="h-4 w-4 text-gray-400" />;
    }
  };

  const getVerificationLabel = () => {
    switch (safeVerificationLevel) {
      case "full":
        return "Fully Verified";
      case "basic":
        return "Basic Verification";
      default:
        return "Not Verified";
    }
  };

  const progressPercentage = Math.min((safeScore / 10) * 100, 100);

  return (
    <Card>
      <CardHeader className="text-center pb-2">
        <CardTitle className="font-inter text-lg">Your Trust Score</CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        {/* Trust Score Circle */}
        <div className="relative w-24 h-24 mx-auto mb-4">
          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke="#e5e7eb"
              strokeWidth="2"
            />
            <path
              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              fill="none"
              stroke={safeScore >= 8 ? "#16a34a" : safeScore >= 5 ? "#eab308" : "#dc2626"}
              strokeWidth="2"
              strokeDasharray={`${progressPercentage}, 100`}
              className="trust-score-circle"
              style={{ "--score": progressPercentage } as any}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className={`text-2xl font-bold ${getScoreColor(safeScore)}`}>
              {safeScore.toFixed(1)}
            </span>
          </div>
        </div>

        {/* Score Label */}
        <Badge 
          variant="outline" 
          className={`mb-4 ${getScoreColor(safeScore)} border-current`}
        >
          {getScoreLabel(safeScore)}
        </Badge>

        {/* Score Details */}
        <div className="space-y-3 text-sm text-gray-600">
          <div className="flex items-center justify-center space-x-2">
            <Star className="h-4 w-4" />
            <span>{safeTransactions} completed transactions</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            {getVerificationIcon()}
            <span>{getVerificationLabel()}</span>
          </div>
          
          <div className="flex items-center justify-center space-x-2">
            <CheckCircle className="h-4 w-4 text-blue-600" />
            <span>Member since 2024</span>
          </div>
        </div>

        {/* Progress to Next Level */}
        {safeScore < 10 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-500 mb-2">
              Progress to next level
            </div>
            <Progress value={progressPercentage} className="h-2" />
            <div className="text-xs text-gray-500 mt-1">
              Complete {Math.ceil((10 - safeScore) / 0.1)} more transactions
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, CheckCircle, AlertTriangle, XCircle, Award } from "lucide-react";

interface TrustVerifyBadgeProps {
  domain: string;
  trustScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  variant?: 'compact' | 'detailed' | 'embeddable';
  certificationLevel?: 'basic' | 'standard' | 'enterprise';
}

export function TrustVerifyBadge({ 
  domain, 
  trustScore, 
  riskLevel, 
  variant = 'compact',
  certificationLevel = 'standard'
}: TrustVerifyBadgeProps) {
  
  // B2B Compliance Color Scheme
  const getBadgeConfig = () => {
    switch (riskLevel) {
      case 'low':
        return {
          color: 'bg-emerald-500',
          icon: CheckCircle,
          label: 'BUSINESS CERTIFIED',
          textColor: 'text-emerald-700',
          borderColor: 'border-emerald-200',
          bgColor: 'bg-emerald-50'
        };
      case 'medium':
        return {
          color: 'bg-amber-500',
          icon: AlertTriangle,
          label: 'MONITORED USE',
          textColor: 'text-amber-700',
          borderColor: 'border-amber-200',
          bgColor: 'bg-amber-50'
        };
      case 'high':
        return {
          color: 'bg-orange-500',
          icon: AlertTriangle,
          label: 'REQUIRES REVIEW',
          textColor: 'text-orange-700',
          borderColor: 'border-orange-200',
          bgColor: 'bg-orange-50'
        };
      case 'critical':
        return {
          color: 'bg-red-500',
          icon: XCircle,
          label: 'NOT CERTIFIED',
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          bgColor: 'bg-red-50'
        };
    }
  };

  const config = getBadgeConfig();
  const IconComponent = config.icon;

  if (variant === 'embeddable') {
    return (
      <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${config.borderColor} ${config.bgColor}`}>
        <Shield className={`h-4 w-4 ${config.color.replace('bg-', 'text-')}`} />
        <span className={`text-sm font-medium ${config.textColor}`}>
          TrustVerify {config.label}
        </span>
        <span className="text-xs text-gray-500">{trustScore}%</span>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`flex items-center gap-3 p-3 rounded-lg border ${config.borderColor} ${config.bgColor}`}>
        <div className={`p-2 rounded-full ${config.color}`}>
          <IconComponent className="h-4 w-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className={`font-medium text-sm ${config.textColor}`}>
            {config.label}
          </div>
          <div className="text-xs text-gray-600 truncate">
            {domain} • Score: {trustScore}%
          </div>
        </div>
        <Badge variant="outline" className="text-xs">
          {certificationLevel.toUpperCase()}
        </Badge>
      </div>
    );
  }

  // Detailed variant for B2B certification dashboard
  return (
    <Card className={`${config.borderColor} ${config.bgColor} border-2`}>
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-full ${config.color}`}>
            <Shield className="h-6 w-6 text-white" />
          </div>
          
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className={`font-bold text-lg ${config.textColor}`}>
                TrustVerify {config.label}
              </h3>
              <Badge 
                variant={riskLevel === 'low' ? 'default' : 'destructive'}
                className="text-xs"
              >
                {certificationLevel.toUpperCase()} TIER
              </Badge>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Domain:</span>
                <span className="text-sm text-gray-900 font-mono">{domain}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Trust Score:</span>
                <div className="flex items-center gap-2">
                  <div className="w-20 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${config.color}`}
                      style={{ width: `${Math.min(trustScore, 100)}%` }}
                    />
                  </div>
                  <span className={`text-lg font-bold ${config.textColor}`}>
                    {trustScore}%
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Risk Level:</span>
                <div className="flex items-center gap-2">
                  <IconComponent className={`h-4 w-4 ${config.textColor}`} />
                  <span className={`text-sm font-medium ${config.textColor}`}>
                    {riskLevel.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-gray-200">
                <span className="text-sm font-medium text-gray-700">Valid Until:</span>
                <span className="text-sm text-gray-900">
                  {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>

            {riskLevel === 'low' && (
              <div className="mt-4 p-3 bg-emerald-100 rounded-lg border border-emerald-200">
                <div className="flex items-center gap-2 mb-1">
                  <Award className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800">
                    Enterprise Certification Benefits
                  </span>
                </div>
                <ul className="text-xs text-emerald-700 space-y-1">
                  <li>✓ Suitable for B2B transactions</li>
                  <li>✓ Insurance underwriting support</li>
                  <li>✓ Compliance framework verified</li>
                  <li>✓ Reduced due diligence requirements</li>
                </ul>
              </div>
            )}
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Verified by TrustVerify Enterprise</span>
            <span>Cert ID: TV-{Date.now().toString(36).toUpperCase()}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
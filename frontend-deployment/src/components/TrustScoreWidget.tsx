import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, CheckCircle, AlertTriangle, XCircle, ExternalLink, Copy, Code } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface TrustScoreWidgetProps {
  domain: string;
  trustScore: number;
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  language?: 'en' | 'es' | 'fr';
  size?: 'small' | 'medium' | 'large';
  showEmbed?: boolean;
}

const translations = {
  en: {
    verified: "Verified by TrustVerify",
    trustScore: "Trust Score",
    viewReport: "View Full Report",
    embed: "Embed Widget",
    copyCode: "Copy Embed Code",
    businessCertified: "Business Certified",
    monitoredUse: "Monitored Use", 
    requiresReview: "Requires Review",
    notCertified: "Not Certified",
    riskLevels: {
      low: "Low Risk",
      medium: "Medium Risk", 
      high: "High Risk",
      critical: "Critical Risk"
    }
  },
  es: {
    verified: "Verificado por TrustVerify",
    trustScore: "Puntuación de Confianza",
    viewReport: "Ver Informe Completo",
    embed: "Insertar Widget",
    copyCode: "Copiar Código",
    businessCertified: "Certificado Empresarial",
    monitoredUse: "Uso Monitoreado",
    requiresReview: "Requiere Revisión", 
    notCertified: "No Certificado",
    riskLevels: {
      low: "Riesgo Bajo",
      medium: "Riesgo Medio",
      high: "Riesgo Alto", 
      critical: "Riesgo Crítico"
    }
  },
  fr: {
    verified: "Vérifié par TrustVerify",
    trustScore: "Score de Confiance",
    viewReport: "Voir le Rapport Complet",
    embed: "Intégrer Widget",
    copyCode: "Copier le Code",
    businessCertified: "Certifié Entreprise",
    monitoredUse: "Utilisation Surveillée",
    requiresReview: "Nécessite Révision",
    notCertified: "Non Certifié", 
    riskLevels: {
      low: "Risque Faible",
      medium: "Risque Moyen",
      high: "Risque Élevé",
      critical: "Risque Critique"
    }
  }
};

export function TrustScoreWidget({ 
  domain, 
  trustScore, 
  riskLevel, 
  language = 'en',
  size = 'medium',
  showEmbed = false 
}: TrustScoreWidgetProps) {
  const [embedOpen, setEmbedOpen] = useState(false);
  const { toast } = useToast();
  const t = translations[language];

  const getBadgeConfig = () => {
    switch (riskLevel) {
      case 'low':
        return {
          color: 'bg-emerald-500',
          icon: CheckCircle,
          label: t.businessCertified,
          textColor: 'text-emerald-700',
          borderColor: 'border-emerald-200',
          bgColor: 'bg-emerald-50'
        };
      case 'medium':
        return {
          color: 'bg-amber-500',
          icon: AlertTriangle,
          label: t.monitoredUse,
          textColor: 'text-amber-700',
          borderColor: 'border-amber-200',
          bgColor: 'bg-amber-50'
        };
      case 'high':
        return {
          color: 'bg-orange-500',
          icon: AlertTriangle,
          label: t.requiresReview,
          textColor: 'text-orange-700',
          borderColor: 'border-orange-200',
          bgColor: 'bg-orange-50'
        };
      case 'critical':
        return {
          color: 'bg-red-500',
          icon: XCircle,
          label: t.notCertified,
          textColor: 'text-red-700',
          borderColor: 'border-red-200',
          bgColor: 'bg-red-50'
        };
    }
  };

  const config = getBadgeConfig();
  const IconComponent = config.icon;

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return {
          container: 'p-3',
          icon: 'h-4 w-4',
          title: 'text-sm font-semibold',
          score: 'text-lg font-bold',
          subtitle: 'text-xs'
        };
      case 'large':
        return {
          container: 'p-6',
          icon: 'h-6 w-6', 
          title: 'text-lg font-bold',
          score: 'text-2xl font-bold',
          subtitle: 'text-sm'
        };
      default:
        return {
          container: 'p-4',
          icon: 'h-5 w-5',
          title: 'text-base font-semibold', 
          score: 'text-xl font-bold',
          subtitle: 'text-xs'
        };
    }
  };

  const sizeClasses = getSizeClasses();

  const generateEmbedCode = () => {
    const baseUrl = window.location.origin;
    return `<iframe 
  src="${baseUrl}/widget/trust-score?domain=${encodeURIComponent(domain)}&lang=${language}&size=${size}" 
  width="${size === 'small' ? '280' : size === 'large' ? '400' : '320'}" 
  height="${size === 'small' ? '120' : size === 'large' ? '180' : '140'}"
  frameborder="0" 
  style="border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
</iframe>

<!-- Alternative: Direct embed script -->
<script>
  (function() {
    var tv = document.createElement('div');
    tv.innerHTML = '<div id="trustverify-widget-${domain.replace(/[^a-zA-Z0-9]/g, '')}"></div>';
    document.currentScript.parentNode.insertBefore(tv, document.currentScript);
    var script = document.createElement('script');
    script.src = '${baseUrl}/js/trustverify-widget.js?domain=${encodeURIComponent(domain)}&lang=${language}&size=${size}';
    document.head.appendChild(script);
  })();
</script>`;
  };

  const copyEmbedCode = () => {
    navigator.clipboard.writeText(generateEmbedCode());
    toast({
      title: "Embed code copied!",
      description: "Widget code has been copied to your clipboard",
      variant: "default",
    });
  };

  const viewFullReport = () => {
    window.open(`/trust-report/${encodeURIComponent(domain)}`, '_blank');
  };

  return (
    <Card className={`${config.borderColor} ${config.bgColor} border-2 max-w-sm`}>
      <CardContent className={sizeClasses.container}>
        <div className="flex items-start gap-3">
          <div className={`${config.color} p-2 rounded-full flex-shrink-0`}>
            <Shield className={`${sizeClasses.icon} text-white`} />
          </div>
          
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className={`${config.textColor} ${sizeClasses.title} truncate`}>
                TrustVerify
              </h3>
              <Badge 
                variant={riskLevel === 'low' ? 'default' : 'destructive'}
                className="text-xs px-1 py-0"
              >
                {config.label}
              </Badge>
            </div>
            
            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <span className={`${sizeClasses.subtitle} font-medium text-gray-600`}>
                  {t.trustScore}
                </span>
                <span className={`${config.textColor} ${sizeClasses.score}`}>
                  {trustScore}%
                </span>
              </div>
              
              <div className="flex items-center justify-between">
                <span className={`${sizeClasses.subtitle} text-gray-500 truncate`}>
                  {domain}
                </span>
                <div className="flex items-center gap-1">
                  <IconComponent className={`h-3 w-3 ${config.textColor}`} />
                  <span className={`${sizeClasses.subtitle} ${config.textColor}`}>
                    {t.riskLevels[riskLevel]}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-1 mt-2">
              <Button
                onClick={viewFullReport}
                variant="outline"
                size="sm"
                className={`${sizeClasses.subtitle} h-6`}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                {t.viewReport}
              </Button>
              
              {showEmbed && (
                <Dialog open={embedOpen} onOpenChange={setEmbedOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className={`${sizeClasses.subtitle} h-6`}
                    >
                      <Code className="h-3 w-3 mr-1" />
                      {t.embed}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{t.embed} - {domain}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Preview:</h4>
                        <div className="border rounded-lg p-4 bg-gray-50">
                          <TrustScoreWidget
                            domain={domain}
                            trustScore={trustScore}
                            riskLevel={riskLevel}
                            language={language}
                            size={size}
                            showEmbed={false}
                          />
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">Embed Code:</h4>
                          <Button onClick={copyEmbedCode} size="sm">
                            <Copy className="h-4 w-4 mr-1" />
                            {t.copyCode}
                          </Button>
                        </div>
                        <Textarea
                          value={generateEmbedCode()}
                          readOnly
                          className="font-mono text-xs h-32"
                        />
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              )}
            </div>

            <div className={`${sizeClasses.subtitle} text-gray-400 mt-1 text-center`}>
              {t.verified}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
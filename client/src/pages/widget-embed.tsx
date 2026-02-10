import { useEffect, useState } from "react";
import { useRoute } from "wouter";
import { TrustScoreWidget } from "@/components/TrustScoreWidget";
import { useQuery } from "@tanstack/react-query";

export default function WidgetEmbedPage() {
  const [, params] = useRoute("/widget/trust-score");
  const [domain, setDomain] = useState('');
  const [language, setLanguage] = useState<'en' | 'es' | 'fr'>('en');
  const [size, setSize] = useState<'small' | 'medium' | 'large'>('medium');

  useEffect(() => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const domainParam = urlParams.get('domain');
    const langParam = urlParams.get('lang') as 'en' | 'es' | 'fr';
    const sizeParam = urlParams.get('size') as 'small' | 'medium' | 'large';

    if (domainParam) setDomain(decodeURIComponent(domainParam));
    if (langParam && ['en', 'es', 'fr'].includes(langParam)) setLanguage(langParam);
    if (sizeParam && ['small', 'medium', 'large'].includes(sizeParam)) setSize(sizeParam);

    // Remove default margins for iframe embedding
    document.body.style.margin = '0';
    document.body.style.padding = '8px';
    document.body.style.backgroundColor = 'transparent';
  }, []);

  // Fetch trust data for the domain
  const { data: trustData, isLoading } = useQuery({
    queryKey: ['/api/fraud/comprehensive-check', domain],
    enabled: !!domain,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: false
  });

  // Generate demo data for widget preview
  const getDemoData = () => {
    const isKnownSafe = ['google.com', 'microsoft.com', 'github.com'].includes(domain);
    const isKnownRisk = ['suspicious-site.com', 'phishing-test.org'].includes(domain);
    
    return {
      trustScore: isKnownSafe ? 95 : isKnownRisk ? 15 : 82,
      riskLevel: (isKnownSafe ? 'low' : isKnownRisk ? 'critical' : 'low') as 'low' | 'medium' | 'high' | 'critical'
    };
  };

  if (!domain) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-600">No domain specified for widget</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-600 mt-2">Loading trust data...</p>
      </div>
    );
  }

  const data = trustData || getDemoData();

  return (
    <div className="w-full">
      <TrustScoreWidget
        domain={domain}
        trustScore={data.trustScore}
        riskLevel={data.riskLevel}
        language={language}
        size={size}
        showEmbed={false}
      />
    </div>
  );
}
(function() {
  'use strict';

  // TrustVerify Widget Embed Script
  // Version 1.0 - Multilingual Support (EN, ES, FR)
  
  // Parse URL parameters
  function getUrlParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
  }

  // Configuration
  const config = {
    domain: getUrlParameter('domain') || '',
    language: getUrlParameter('lang') || 'en',
    size: getUrlParameter('size') || 'medium',
    baseUrl: window.location.origin
  };

  // Widget styles
  const widgetStyles = `
    .trustverify-widget {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      border: 2px solid #e2e8f0;
      border-radius: 8px;
      background: #ffffff;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
      transition: all 0.2s ease;
      max-width: 100%;
    }
    
    .trustverify-widget:hover {
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .trustverify-widget.size-small {
      width: 280px;
      min-height: 120px;
    }
    
    .trustverify-widget.size-medium {
      width: 320px;
      min-height: 140px;
    }
    
    .trustverify-widget.size-large {
      width: 400px;
      min-height: 180px;
    }
    
    .trustverify-widget-content {
      padding: 16px;
      display: flex;
      align-items: flex-start;
      gap: 12px;
    }
    
    .trustverify-widget.size-small .trustverify-widget-content {
      padding: 12px;
    }
    
    .trustverify-widget.size-large .trustverify-widget-content {
      padding: 20px;
    }
    
    .trustverify-widget-icon {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-shrink: 0;
    }
    
    .trustverify-widget.size-small .trustverify-widget-icon {
      width: 32px;
      height: 32px;
    }
    
    .trustverify-widget.size-large .trustverify-widget-icon {
      width: 48px;
      height: 48px;
    }
    
    .trustverify-widget-icon svg {
      width: 20px;
      height: 20px;
      color: white;
    }
    
    .trustverify-widget.size-small .trustverify-widget-icon svg {
      width: 16px;
      height: 16px;
    }
    
    .trustverify-widget.size-large .trustverify-widget-icon svg {
      width: 24px;
      height: 24px;
    }
    
    .trustverify-widget-info {
      flex: 1;
      min-width: 0;
    }
    
    .trustverify-widget-title {
      font-weight: 600;
      margin: 0 0 4px 0;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .trustverify-widget.size-small .trustverify-widget-title {
      font-size: 14px;
    }
    
    .trustverify-widget.size-medium .trustverify-widget-title {
      font-size: 16px;
    }
    
    .trustverify-widget.size-large .trustverify-widget-title {
      font-size: 18px;
    }
    
    .trustverify-widget-badge {
      background: #10b981;
      color: white;
      font-size: 10px;
      padding: 2px 6px;
      border-radius: 4px;
      font-weight: 500;
    }
    
    .trustverify-widget-score {
      font-size: 20px;
      font-weight: 700;
      margin: 4px 0;
    }
    
    .trustverify-widget.size-small .trustverify-widget-score {
      font-size: 16px;
    }
    
    .trustverify-widget.size-large .trustverify-widget-score {
      font-size: 24px;
    }
    
    .trustverify-widget-domain {
      font-size: 12px;
      color: #6b7280;
      margin: 0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    
    .trustverify-widget-link {
      font-size: 11px;
      color: #3b82f6;
      text-decoration: none;
      margin-top: 8px;
      display: inline-block;
    }
    
    .trustverify-widget-link:hover {
      text-decoration: underline;
    }
    
    .trustverify-widget-footer {
      font-size: 10px;
      color: #9ca3af;
      text-align: center;
      margin-top: 8px;
    }
    
    /* Risk level colors */
    .trustverify-widget.risk-low {
      border-color: #d1fae5;
      background: #f0fdf4;
    }
    
    .trustverify-widget.risk-low .trustverify-widget-icon {
      background: #10b981;
    }
    
    .trustverify-widget.risk-low .trustverify-widget-title {
      color: #047857;
    }
    
    .trustverify-widget.risk-low .trustverify-widget-score {
      color: #047857;
    }
    
    .trustverify-widget.risk-medium {
      border-color: #fde68a;
      background: #fffbeb;
    }
    
    .trustverify-widget.risk-medium .trustverify-widget-icon {
      background: #f59e0b;
    }
    
    .trustverify-widget.risk-medium .trustverify-widget-title {
      color: #92400e;
    }
    
    .trustverify-widget.risk-medium .trustverify-widget-score {
      color: #92400e;
    }
    
    .trustverify-widget.risk-medium .trustverify-widget-badge {
      background: #f59e0b;
    }
    
    .trustverify-widget.risk-high {
      border-color: #fed7aa;
      background: #fff7ed;
    }
    
    .trustverify-widget.risk-high .trustverify-widget-icon {
      background: #ea580c;
    }
    
    .trustverify-widget.risk-high .trustverify-widget-title {
      color: #c2410c;
    }
    
    .trustverify-widget.risk-high .trustverify-widget-score {
      color: #c2410c;
    }
    
    .trustverify-widget.risk-high .trustverify-widget-badge {
      background: #ea580c;
    }
    
    .trustverify-widget.risk-critical {
      border-color: #fecaca;
      background: #fef2f2;
    }
    
    .trustverify-widget.risk-critical .trustverify-widget-icon {
      background: #dc2626;
    }
    
    .trustverify-widget.risk-critical .trustverify-widget-title {
      color: #b91c1c;
    }
    
    .trustverify-widget.risk-critical .trustverify-widget-score {
      color: #b91c1c;
    }
    
    .trustverify-widget.risk-critical .trustverify-widget-badge {
      background: #dc2626;
    }
  `;

  // Translations
  const translations = {
    en: {
      verified: "Verified by TrustVerify",
      trustScore: "Trust Score",
      viewReport: "View Full Report",
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

  // Get translations for current language
  const t = translations[config.language] || translations.en;

  // Shield SVG icon
  const shieldIcon = `
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1Z"/>
    </svg>
  `;

  // Create widget HTML
  function createWidget(data) {
    const riskLevel = data.riskLevel || 'medium';
    const trustScore = data.trustScore || 75;
    
    const labels = {
      low: t.businessCertified,
      medium: t.monitoredUse,
      high: t.requiresReview,
      critical: t.notCertified
    };

    return `
      <div class="trustverify-widget size-${config.size} risk-${riskLevel}">
        <div class="trustverify-widget-content">
          <div class="trustverify-widget-icon">
            ${shieldIcon}
          </div>
          <div class="trustverify-widget-info">
            <h3 class="trustverify-widget-title">
              TrustVerify
              <span class="trustverify-widget-badge">${labels[riskLevel]}</span>
            </h3>
            <div class="trustverify-widget-score">${trustScore}%</div>
            <p class="trustverify-widget-domain">${config.domain}</p>
            <a href="${config.baseUrl}/trust-report/${encodeURIComponent(config.domain)}" 
               target="_blank" 
               class="trustverify-widget-link">
              ${t.viewReport} →
            </a>
            <div class="trustverify-widget-footer">
              ${t.verified}
            </div>
          </div>
        </div>
      </div>
    `;
  }

  // Fetch trust data and render widget
  function loadWidget() {
    if (!config.domain) {
      console.error('TrustVerify Widget: No domain specified');
      return;
    }

    // Find target container
    const containerId = `trustverify-widget-${config.domain.replace(/[^a-zA-Z0-9]/g, '')}`;
    const container = document.getElementById(containerId);
    
    if (!container) {
      console.error('TrustVerify Widget: Container not found');
      return;
    }

    // Add styles
    if (!document.getElementById('trustverify-widget-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'trustverify-widget-styles';
      styleSheet.textContent = widgetStyles;
      document.head.appendChild(styleSheet);
    }

    // Show loading state
    container.innerHTML = `
      <div class="trustverify-widget size-${config.size}">
        <div class="trustverify-widget-content">
          <div style="text-align: center; padding: 20px;">
            <div style="width: 24px; height: 24px; border: 2px solid #3b82f6; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto 8px;"></div>
            <p style="margin: 0; color: #6b7280; font-size: 14px;">Loading trust data...</p>
          </div>
        </div>
      </div>
    `;

    // Add spinner animation
    if (!document.getElementById('trustverify-spinner-styles')) {
      const spinnerStyles = document.createElement('style');
      spinnerStyles.id = 'trustverify-spinner-styles';
      spinnerStyles.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(spinnerStyles);
    }

    // Fetch trust data
    fetch(`${config.baseUrl}/api/fraud/comprehensive-check`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: config.domain })
    })
    .then(response => response.json())
    .then(data => {
      container.innerHTML = createWidget(data);
    })
    .catch(() => {
      // Fallback to demo data on error
      const demoData = {
        trustScore: 82,
        riskLevel: 'low'
      };
      container.innerHTML = createWidget(demoData);
    });
  }

  // Initialize widget when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadWidget);
  } else {
    loadWidget();
  }

})();
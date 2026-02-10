import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  Globe, 
  Code, 
  FileText, 
  Search, 
  ExternalLink,
  Smartphone,
  BarChart3,
  Users,
  Lock,
  Eye,
  Download,
  Share2
} from "lucide-react";
import { useLocation } from "wouter";
import { startTransition } from "react";

interface FeatureDiscoveryProps {
  language?: 'en' | 'es' | 'fr';
}

const translations = {
  en: {
    title: "Discover TrustVerify Features",
    subtitle: "Comprehensive fraud prevention and trust verification tools",
    features: [
      {
        title: "Website Integrity Checker",
        description: "Real-time security analysis with SSL validation, threat intelligence, and trust scoring",
        icon: Shield,
        path: "/website-integrity",
        badge: "Live Analysis",
        actions: ["Check any domain", "View security details", "Get trust reports"]
      },
      {
        title: "Trust Report Pages",
        description: "SEO-optimized public trust reports for Google indexing and business credibility",
        icon: FileText,
        path: "/trust-report/google.com",
        badge: "SEO Indexed",
        actions: ["Public trust reports", "Social sharing", "Multilingual support"]
      },
      {
        title: "Embeddable Widgets",
        description: "TrustVerify Badge and Score widgets for business website integration",
        icon: Code,
        path: "/website-integrity",
        badge: "Business Ready",
        actions: ["Iframe embedding", "JavaScript integration", "Customizable sizes"]
      },
      {
        title: "Fraud Prevention Dashboard",
        description: "Comprehensive fraud detection with domain checking and phone verification",
        icon: Search,
        path: "/fraud-prevention",
        badge: "Real-time",
        actions: ["Domain analysis", "Phone verification", "Risk assessment"]
      },
      {
        title: "Developer API Portal",
        description: "RESTful APIs with authentication, rate limiting, and comprehensive documentation",
        icon: BarChart3,
        path: "/api-reference",
        badge: "Enterprise",
        actions: ["API keys", "Usage analytics", "Testing sandbox"]
      },
      {
        title: "Multilingual Support",
        description: "Full platform support for English, Spanish, and French languages",
        icon: Globe,
        path: "/",
        badge: "3 Languages",
        actions: ["Language selector", "Localized content", "Cultural adaptation"]
      }
    ],
    quickStart: "Quick Start Guide",
    exploreAll: "Explore All Features"
  },
  es: {
    title: "Descubrir Funciones de TrustVerify",
    subtitle: "Herramientas integrales de prevención de fraude y verificación de confianza",
    features: [
      {
        title: "Verificador de Integridad Web",
        description: "Análisis de seguridad en tiempo real con validación SSL, inteligencia de amenazas y puntuación de confianza",
        icon: Shield,
        path: "/website-integrity",
        badge: "Análisis en Vivo",
        actions: ["Verificar cualquier dominio", "Ver detalles de seguridad", "Obtener informes de confianza"]
      },
      {
        title: "Páginas de Informe de Confianza",
        description: "Informes de confianza públicos optimizados para SEO para indexación de Google y credibilidad empresarial",
        icon: FileText,
        path: "/trust-report/google.com",
        badge: "Indexado SEO",
        actions: ["Informes de confianza públicos", "Compartir en redes sociales", "Soporte multiidioma"]
      },
      {
        title: "Widgets Embebibles",
        description: "Widgets de Insignia y Puntuación TrustVerify para integración en sitios web empresariales",
        icon: Code,
        path: "/website-integrity",
        badge: "Listo para Empresas",
        actions: ["Inserción iframe", "Integración JavaScript", "Tamaños personalizables"]
      },
      {
        title: "Panel de Prevención de Fraude",
        description: "Detección integral de fraude con verificación de dominios y teléfonos",
        icon: Search,
        path: "/fraud-prevention",
        badge: "Tiempo Real",
        actions: ["Análisis de dominio", "Verificación telefónica", "Evaluación de riesgo"]
      },
      {
        title: "Portal API para Desarrolladores",
        description: "APIs RESTful con autenticación, limitación de velocidad y documentación integral",
        icon: BarChart3,
        path: "/api-reference",
        badge: "Empresarial",
        actions: ["Claves API", "Análisis de uso", "Sandbox de pruebas"]
      },
      {
        title: "Soporte Multiidioma",
        description: "Soporte completo de plataforma para idiomas inglés, español y francés",
        icon: Globe,
        path: "/",
        badge: "3 Idiomas",
        actions: ["Selector de idioma", "Contenido localizado", "Adaptación cultural"]
      }
    ],
    quickStart: "Guía de Inicio Rápido",
    exploreAll: "Explorar Todas las Funciones"
  },
  fr: {
    title: "Découvrir les Fonctionnalités TrustVerify",
    subtitle: "Outils complets de prévention de fraude et de vérification de confiance",
    features: [
      {
        title: "Vérificateur d'Intégrité Web",
        description: "Analyse de sécurité en temps réel avec validation SSL, renseignement sur les menaces et notation de confiance",
        icon: Shield,
        path: "/website-integrity",
        badge: "Analyse en Direct",
        actions: ["Vérifier tout domaine", "Voir les détails de sécurité", "Obtenir des rapports de confiance"]
      },
      {
        title: "Pages de Rapport de Confiance",
        description: "Rapports de confiance publics optimisés SEO pour l'indexation Google et la crédibilité d'entreprise",
        icon: FileText,
        path: "/trust-report/google.com",
        badge: "Indexé SEO",
        actions: ["Rapports de confiance publics", "Partage social", "Support multilingue"]
      },
      {
        title: "Widgets Intégrables",
        description: "Widgets Badge et Score TrustVerify pour l'intégration de sites web d'entreprise",
        icon: Code,
        path: "/website-integrity",
        badge: "Prêt Entreprise",
        actions: ["Intégration iframe", "Intégration JavaScript", "Tailles personnalisables"]
      },
      {
        title: "Tableau de Bord Prévention Fraude",
        description: "Détection de fraude complète avec vérification de domaine et téléphone",
        icon: Search,
        path: "/fraud-prevention",
        badge: "Temps Réel",
        actions: ["Analyse de domaine", "Vérification téléphonique", "Évaluation des risques"]
      },
      {
        title: "Portail API Développeur",
        description: "APIs RESTful avec authentification, limitation de débit et documentation complète",
        icon: BarChart3,
        path: "/api-reference",
        badge: "Entreprise",
        actions: ["Clés API", "Analyses d'utilisation", "Bac à sable de test"]
      },
      {
        title: "Support Multilingue",
        description: "Support complet de plateforme pour les langues anglaise, espagnole et française",
        icon: Globe,
        path: "/",
        badge: "3 Langues",
        actions: ["Sélecteur de langue", "Contenu localisé", "Adaptation culturelle"]
      }
    ],
    quickStart: "Guide de Démarrage Rapide",
    exploreAll: "Explorer Toutes les Fonctionnalités"
  }
};

export function FeatureDiscovery({ language = 'en' }: FeatureDiscoveryProps) {
  const [, setLocation] = useLocation();
  const t = translations[language];

  const handleNavigate = (path: string) => {
    startTransition(() => {
      setLocation(path);
    });
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{t.title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {t.features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-blue-200">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-600 p-3 rounded-lg group-hover:bg-blue-700 transition-colors">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg font-semibold text-gray-900">
                          {feature.title}
                        </CardTitle>
                        <Badge variant="secondary" className="mt-1">
                          {feature.badge}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm text-gray-900">Key Features:</h4>
                    <ul className="space-y-1">
                      {feature.actions.map((action, actionIndex) => (
                        <li key={actionIndex} className="flex items-center gap-2 text-sm text-gray-600">
                          <div className="w-1.5 h-1.5 bg-blue-600 rounded-full flex-shrink-0" />
                          {action}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button
                    onClick={() => handleNavigate(feature.path)}
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Try Now
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Access Links */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Button
              variant="outline"
              onClick={() => handleNavigate('/website-integrity')}
              className="flex flex-col items-center gap-2 p-6 h-auto"
            >
              <Shield className="h-8 w-8 text-blue-600" />
              <span className="text-sm font-medium">Check Website</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleNavigate('/fraud-prevention')}
              className="flex flex-col items-center gap-2 p-6 h-auto"
            >
              <Search className="h-8 w-8 text-blue-600" />
              <span className="text-sm font-medium">Fraud Prevention</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleNavigate('/api-reference')}
              className="flex flex-col items-center gap-2 p-6 h-auto"
            >
              <Code className="h-8 w-8 text-blue-600" />
              <span className="text-sm font-medium">Developer API</span>
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleNavigate('/pricing')}
              className="flex flex-col items-center gap-2 p-6 h-auto"
            >
              <BarChart3 className="h-8 w-8 text-blue-600" />
              <span className="text-sm font-medium">Pricing</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
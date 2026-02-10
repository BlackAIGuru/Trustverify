import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Users, BarChart3, Eye, Globe, Lock } from "lucide-react";

interface BrandValuesProps {
  language?: 'en' | 'es' | 'fr';
  variant?: 'default' | 'compact' | 'hero';
}

const translations = {
  en: {
    neutral: {
      title: "Evidence-Driven Analysis",
      description: "Objective security assessments based on verified data sources, technical analysis, and industry standards—not opinions or assumptions.",
      icon: BarChart3
    },
    userFirst: {
      title: "User-First Security & Privacy",
      description: "Your data privacy is paramount. We use minimal data collection, transparent processes, and secure handling of all information.",
      icon: Lock
    },
    transparency: {
      title: "Transparency & Community",
      description: "Open methodology, public documentation, and community-driven insights ensure accountability and continuous improvement.",
      icon: Users
    },
    tagline: "Launching in 2025 to deliver unbiased security intelligence"
  },
  es: {
    neutral: {
      title: "Análisis Basado en Evidencia",
      description: "Evaluaciones de seguridad objetivas basadas en fuentes de datos verificadas, análisis técnico y estándares de la industria—no opiniones o suposiciones.",
      icon: BarChart3
    },
    userFirst: {
      title: "Seguridad y Privacidad del Usuario Primero",
      description: "Su privacidad de datos es primordial. Usamos recopilación mínima de datos, procesos transparentes y manejo seguro de toda la información.",
      icon: Lock
    },
    transparency: {
      title: "Transparencia y Comunidad",
      description: "Metodología abierta, documentación pública e insights impulsados por la comunidad garantizan responsabilidad y mejora continua.",
      icon: Users
    },
    tagline: "Lanzando en 2025 para ofrecer inteligencia de seguridad imparcial"
  },
  fr: {
    neutral: {
      title: "Analyse Basée sur les Preuves",
      description: "Évaluations de sécurité objectives basées sur des sources de données vérifiées, une analyse technique et des normes industrielles—pas d'opinions ou d'hypothèses.",
      icon: BarChart3
    },
    userFirst: {
      title: "Sécurité et Confidentialité d'Abord",
      description: "Votre confidentialité des données est primordiale. Nous utilisons une collecte minimale de données, des processus transparents et une gestion sécurisée de toutes les informations.",
      icon: Lock
    },
    transparency: {
      title: "Transparence et Communauté",
      description: "Méthodologie ouverte, documentation publique et insights communautaires garantissent la responsabilité et l'amélioration continue.",
      icon: Users
    },
    tagline: "Lancement en 2025 pour livrer une intelligence de sécurité impartiale"
  }
};

export function BrandValues({ language = 'en', variant = 'default' }: BrandValuesProps) {
  const t = translations[language];
  const values = [t.neutral, t.userFirst, t.transparency];

  if (variant === 'hero') {
    return (
      <div className="text-center space-y-6">
        <div className="flex items-center justify-center gap-6 text-blue-50/80">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            <span className="text-sm font-medium">Evidence-Driven</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            <span className="text-sm font-medium">Privacy-First</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <span className="text-sm font-medium">Community-Backed</span>
          </div>
        </div>
        <p className="text-blue-100/70 text-sm">
          {t.tagline}
        </p>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {values.map((value, index) => {
          const IconComponent = value.icon;
          return (
            <div key={index} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
              <div className="bg-blue-600 p-2 rounded-lg flex-shrink-0">
                <IconComponent className="h-4 w-4 text-white" />
              </div>
              <div>
                <h4 className="font-semibold text-sm mb-1">{value.title}</h4>
                <p className="text-xs text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Values</h2>
        <p className="text-gray-600">{t.tagline}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((value, index) => {
          const IconComponent = value.icon;
          return (
            <Card key={index} className="border-2 hover:border-blue-200 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="bg-blue-600 p-3 rounded-lg">
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-lg">{value.title}</h3>
                </div>
                <p className="text-gray-600 leading-relaxed">
                  {value.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
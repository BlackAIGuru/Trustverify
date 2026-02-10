import { 
  Shield, 
  Eye, 
  CreditCard, 
  Users, 
  AlertTriangle, 
  DollarSign, 
  FileText, 
  Smartphone, 
  Globe, 
  Database, 
  Zap, 
  UserCheck, 
  Lock, 
  Activity, 
  TrendingUp, 
  Building, 
  Code, 
  BarChart3, 
  Phone, 
  Mail, 
  Briefcase,
  PiggyBank,
  Headphones,
  FileCheck,
  Gavel,
  Star
} from "lucide-react";

export interface Product {
  id: string;
  name: string;
  description: string;
  icon: any;
  features: string[];
  pricing?: {
    tier?: string;
    price?: string;
    period?: string;
  };
  cta: {
    text: string;
    href: string;
  };
  category: string;
  popular?: boolean;
  new?: boolean;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  icon: any;
  products: Product[];
}

export const productCategories: ProductCategory[] = [
  {
    id: "identity-protection",
    name: "Identity Protection",
    description: "Comprehensive personal data and credit monitoring solutions",
    icon: Shield,
    products: [
      {
        id: "credit-monitoring",
        name: "Credit Monitoring",
        description: "Real-time credit score tracking with instant alerts for changes and suspicious activity",
        icon: TrendingUp,
        features: [
          "Real-time credit score updates",
          "Dark web monitoring",
          "Identity theft alerts",
          "Credit report analysis"
        ],
        pricing: {
          tier: "Premium",
          price: "£9.99",
          period: "month"
        },
        cta: {
          text: "Start Monitoring",
          href: "/pricing"
        },
        category: "identity-protection",
        popular: true
      },
      {
        id: "id-vault",
        name: "ID Vault",
        description: "Secure digital wallet for storing and managing personal identification documents",
        icon: Lock,
        features: [
          "Encrypted document storage",
          "Biometric access control",
          "Secure sharing capabilities",
          "Automatic expiry alerts"
        ],
        pricing: {
          tier: "Protect",
          price: "£14.99",
          period: "month"
        },
        cta: {
          text: "Secure Your ID",
          href: "/pricing"
        },
        category: "identity-protection"
      },
      {
        id: "open-banking-alerts",
        name: "Open Banking Alerts",
        description: "Monitor bank account activity and receive instant notifications for unusual transactions",
        icon: Activity,
        features: [
          "Real-time transaction monitoring",
          "Unusual spending alerts",
          "Account takeover protection",
          "Multi-bank integration"
        ],
        pricing: {
          tier: "Total",
          price: "£19.99",
          period: "month"
        },
        cta: {
          text: "Connect Banks",
          href: "/pricing"
        },
        category: "identity-protection",
        new: true
      }
    ]
  },
  {
    id: "fraud-prevention",
    name: "Fraud Prevention",
    description: "Advanced fraud detection and prevention for individuals and businesses",
    icon: Eye,
    products: [
      {
        id: "business-account-protection",
        name: "Business Account Protection",
        description: "Enterprise-grade fraud protection for business accounts and transactions",
        icon: Building,
        features: [
          "Multi-layered fraud detection",
          "Employee access monitoring",
          "Transaction verification",
          "Real-time risk scoring"
        ],
        pricing: {
          tier: "Essential",
          price: "£499",
          period: "month"
        },
        cta: {
          text: "Protect Business",
          href: "/business"
        },
        category: "fraud-prevention"
      },
      {
        id: "risk-scoring",
        name: "Risk Scoring Engine",
        description: "AI-powered risk assessment for transactions, users, and business relationships",
        icon: BarChart3,
        features: [
          "Machine learning algorithms",
          "Custom risk parameters",
          "Real-time scoring",
          "Historical analysis"
        ],
        pricing: {
          tier: "Professional",
          price: "£999",
          period: "month"
        },
        cta: {
          text: "Get API Access",
          href: "/developers"
        },
        category: "fraud-prevention"
      },
      {
        id: "api-verification",
        name: "API Verification Suite",
        description: "Comprehensive API endpoints for email, phone, and identity verification",
        icon: Code,
        features: [
          "Email validation API",
          "Phone verification API",
          "Document verification",
          "Biometric authentication"
        ],
        pricing: {
          tier: "Enterprise",
          price: "£1,999+",
          period: "month"
        },
        cta: {
          text: "View Documentation",
          href: "/api-docs"
        },
        category: "fraud-prevention",
        popular: true
      },
      {
        id: "website-scanner",
        name: "Website Security Scanner",
        description: "Automated security scanning and fraud detection for websites and domains",
        icon: Globe,
        features: [
          "Malware detection",
          "Phishing identification",
          "SSL certificate monitoring",
          "Domain reputation scoring"
        ],
        pricing: {
          tier: "Premium",
          price: "£9.99",
          period: "month"
        },
        cta: {
          text: "Scan Website",
          href: "/demo"
        },
        category: "fraud-prevention"
      }
    ]
  },
  {
    id: "recovery-insurance",
    name: "Recovery & Insurance",
    description: "Comprehensive fraud recovery and insurance protection services",
    icon: PiggyBank,
    products: [
      {
        id: "fraud-insurance",
        name: "Fraud Insurance",
        description: "Financial protection against fraud losses with up to £5,000 coverage",
        icon: DollarSign,
        features: [
          "Up to £5,000 fraud coverage",
          "Identity theft reimbursement",
          "Legal expense coverage",
          "24/7 claims support"
        ],
        pricing: {
          tier: "Total",
          price: "£19.99",
          period: "month"
        },
        cta: {
          text: "Get Coverage",
          href: "/pricing"
        },
        category: "recovery-insurance",
        popular: true
      },
      {
        id: "dispute-support",
        name: "Dispute Resolution Support",
        description: "Expert assistance with fraud disputes and financial recovery processes",
        icon: Gavel,
        features: [
          "Expert dispute management",
          "Legal document preparation",
          "Bank communication support",
          "72-hour resolution process"
        ],
        pricing: {
          tier: "Protect",
          price: "£14.99",
          period: "month"
        },
        cta: {
          text: "Get Support",
          href: "/pricing"
        },
        category: "recovery-insurance"
      },
      {
        id: "white-glove-recovery",
        name: "White-Glove Recovery",
        description: "Premium recovery service with dedicated fraud specialists and concierge support",
        icon: Headphones,
        features: [
          "Dedicated fraud specialist",
          "24/7 concierge support",
          "Full recovery management",
          "Priority processing"
        ],
        pricing: {
          tier: "Total",
          price: "£19.99",
          period: "month"
        },
        cta: {
          text: "Premium Support",
          href: "/pricing"
        },
        category: "recovery-insurance",
        new: true
      }
    ]
  },
  {
    id: "business-services",
    name: "Business Services",
    description: "Enterprise-grade fraud protection and compliance solutions for businesses",
    icon: Briefcase,
    products: [
      {
        id: "api-integrations",
        name: "API Integration Suite",
        description: "Complete fraud prevention APIs for seamless business integration",
        icon: Zap,
        features: [
          "RESTful API endpoints",
          "Webhook notifications",
          "Custom integration support",
          "99.99% uptime SLA"
        ],
        pricing: {
          tier: "Essential",
          price: "£499",
          period: "month"
        },
        cta: {
          text: "View API Docs",
          href: "/api-docs"
        },
        category: "business-services"
      },
      {
        id: "compliance-scoring",
        name: "Compliance Scoring",
        description: "Automated compliance scoring and regulatory reporting for financial institutions",
        icon: FileCheck,
        features: [
          "Automated compliance checks",
          "Regulatory reporting",
          "Risk assessment scoring",
          "Audit trail generation"
        ],
        pricing: {
          tier: "Professional",
          price: "£999",
          period: "month"
        },
        cta: {
          text: "Compliance Demo",
          href: "/demo"
        },
        category: "business-services"
      },
      {
        id: "b2b-fraud-protection",
        name: "B2B Fraud Protection",
        description: "Enterprise fraud protection for business-to-business transactions and partnerships",
        icon: Users,
        features: [
          "Transaction monitoring",
          "Partner verification",
          "Supply chain security",
          "Risk assessment tools"
        ],
        pricing: {
          tier: "Enterprise",
          price: "£1,999+",
          period: "month"
        },
        cta: {
          text: "Enterprise Demo",
          href: "/enterprise-contact"
        },
        category: "business-services",
        popular: true
      },
      {
        id: "custom-solutions",
        name: "Custom Solutions",
        description: "Tailored fraud prevention solutions designed for specific industry requirements",
        icon: Star,
        features: [
          "Custom algorithm development",
          "Industry-specific rules",
          "Dedicated support team",
          "White-label options"
        ],
        pricing: {
          tier: "Custom",
          price: "Contact Sales",
          period: ""
        },
        cta: {
          text: "Contact Sales",
          href: "/enterprise-contact"
        },
        category: "business-services"
      }
    ]
  }
];

export const getAllProducts = (): Product[] => {
  return productCategories.flatMap(category => category.products);
};

export const getProductsByCategory = (categoryId: string): Product[] => {
  const category = productCategories.find(cat => cat.id === categoryId);
  return category ? category.products : [];
};

export const getProductById = (productId: string): Product | undefined => {
  return getAllProducts().find(product => product.id === productId);
};

export const getCategoryById = (categoryId: string): ProductCategory | undefined => {
  return productCategories.find(category => category.id === categoryId);
};
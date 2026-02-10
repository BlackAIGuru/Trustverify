import { Link } from "wouter";
import { Navigation } from "@/components/navigation";
import { 
  Home, 
  Shield, 
  Users, 
  Briefcase, 
  Code, 
  GraduationCap, 
  HelpCircle,
  CheckCircle,
  AlertTriangle,
  Key,
  FileText,
  Lock,
  Mail,
  Phone,
  Globe,
  CreditCard,
  Database,
  Webhook,
  ArrowRightLeft,
  Play
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function MenuPage() {
  const menuSections = [
    {
      title: "Main Pages",
      icon: Home,
      color: "bg-[#0A3778]",
      items: [
        { href: "/", label: "Home", icon: Home, description: "Return to homepage" },
        { href: "/pricing", label: "Consumer Plans", icon: Users, description: "Personal fraud protection" },
        { href: "/business", label: "Business Solutions", icon: Briefcase, description: "Enterprise fraud prevention" },
      ]
    },
    {
      title: "Fraud Check Demos",
      icon: Shield,
      color: "bg-[#1DBF73]",
      items: [
        { href: "/trustscore-demo", label: "TrustScore Intelligence", icon: Shield, description: "See how TrustScore works - Live demo" },
        { href: "/complete-demo", label: "Complete Fraud Demo", icon: CheckCircle, description: "Check websites, emails, phone numbers" },
        { href: "/website-integrity", label: "Website Scanner", icon: Globe, description: "Verify website safety" },
        { href: "/fraud-demo", label: "Quick Fraud Check", icon: AlertTriangle, description: "Fast fraud detection" },
      ]
    },
    {
      title: "Business Transaction Flow",
      icon: ArrowRightLeft,
      color: "bg-blue-600",
      items: [
        { href: "/business-flow", label: "Live Flow Demo", icon: Play, description: "See complete transaction lifecycle" },
        { href: "/dashboard/business-flow", label: "Authenticated Flow", icon: Lock, description: "Full transaction flow (login required)" },
        { href: "/transactions/new", label: "Create Transaction", icon: CreditCard, description: "Start a real transaction" },
      ]
    },
    {
      title: "Developer Portal",
      icon: Code,
      color: "bg-purple-600",
      items: [
        { href: "/developers", label: "Developer Hub", icon: Code, description: "API documentation & guides" },
        { href: "/api-keys", label: "API Keys", icon: Key, description: "Generate & manage API keys" },
        { href: "/api-docs", label: "API Documentation", icon: FileText, description: "Complete API reference" },
        { href: "/webhooks", label: "Webhooks", icon: Webhook, description: "Setup event notifications" },
      ]
    },
    {
      title: "Training & Support",
      icon: GraduationCap,
      color: "bg-orange-600",
      items: [
        { href: "/fraud-academy", label: "Fraud Academy", icon: GraduationCap, description: "Learn fraud prevention" },
        { href: "/support-center", label: "Support Center", icon: HelpCircle, description: "Get help & contact us" },
        { href: "/user-guide", label: "User Guide", icon: FileText, description: "Platform documentation" },
      ]
    },
    {
      title: "Resources",
      icon: Database,
      color: "bg-indigo-600",
      items: [
        { href: "/about-us", label: "About Us", icon: Briefcase, description: "Our story & mission" },
        { href: "/contact", label: "Contact", icon: Mail, description: "Get in touch" },
        { href: "/security-dashboard", label: "Security", icon: Lock, description: "Security features" },
        { href: "/regulatory-compliance", label: "Compliance", icon: FileText, description: "Legal & compliance" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#0A3778] mb-4">
            Platform Menu
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access all TrustVerify features and tools in one place
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {menuSections.map((section) => {
            const SectionIcon = section.icon;
            return (
              <Card key={section.title} className="overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className={`${section.color} p-4 text-white`}>
                  <div className="flex items-center space-x-3">
                    <SectionIcon className="h-6 w-6" />
                    <h2 className="text-xl font-bold">{section.title}</h2>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="space-y-4">
                    {section.items.map((item) => {
                      const ItemIcon = item.icon;
                      return (
                        <Link key={item.href} href={item.href}>
                          <div 
                            className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                            data-testid={`menu-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <ItemIcon className="h-5 w-5 text-gray-400 group-hover:text-[#1DBF73] transition-colors mt-0.5" />
                            <div className="flex-1">
                              <div className="font-semibold text-gray-900 group-hover:text-[#0A3778] transition-colors">
                                {item.label}
                              </div>
                              <div className="text-sm text-gray-500">
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="text-center p-6">
            <Shield className="h-8 w-8 text-[#1DBF73] mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">15+</div>
            <div className="text-sm text-gray-600">Security Features</div>
          </Card>
          <Card className="text-center p-6">
            <Code className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">7</div>
            <div className="text-sm text-gray-600">Industry APIs</div>
          </Card>
          <Card className="text-center p-6">
            <GraduationCap className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">25+</div>
            <div className="text-sm text-gray-600">Training Modules</div>
          </Card>
          <Card className="text-center p-6">
            <Users className="h-8 w-8 text-[#0A3778] mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">24/7</div>
            <div className="text-sm text-gray-600">Support Available</div>
          </Card>
        </div>
      </div>
    </div>
  );
}

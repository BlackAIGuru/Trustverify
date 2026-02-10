import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Navigation } from "@/components/navigation";
import { Footer } from '@/components/footer';

import { 
  Shield, 
  CheckCircle, 
  Star, 
  ArrowRight,
  Play,
  Globe,
  Zap,
  Lock,
  BarChart3,
  Eye,
  Building2,
  TrendingUp,
  Award,
  Clock,
  Target,
  Brain,
  Users,
  CreditCard,
  Activity,
  Briefcase
} from "lucide-react";

export default function HomePage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();

  const handleGetStarted = () => {
    if (user) {
      setLocation('/dashboard');
    } else {
      setLocation('/auth');
    }
  };

  const stats = [
    { value: "AI-Powered", label: "Detection System", icon: Target },
    { value: "72hrs", label: "Resolution Time", icon: Clock },
    { value: "Global", label: "Threat Intelligence", icon: Globe },
    { value: "24/7", label: "Security Monitoring", icon: Shield },
  ];

  const features = [
    {
      icon: Shield,
      title: "Advanced Fraud Detection",
      description: "AI-powered real-time detection across all payment methods and digital transactions with industry-leading accuracy.",
    },
    {
      icon: Zap,
      title: "Instant Resolution",
      description: "Complete fraud resolution within 72 hours, from detection to funds settlement.",
    },
    {
      icon: Globe,
      title: "Global Intelligence",
      description: "Worldwide fraud patterns and threat intelligence covering emerging global risks.",
    },
    {
      icon: Eye,
      title: "End-to-End Protection",
      description: "Beyond detection - complete transaction resolution with escrow and dispute handling.",
    },
  ];

  const industries = [
    { icon: Building2, name: "Banking & Fintech" },
    { icon: CreditCard, name: "E-commerce" },
    { icon: Briefcase, name: "Insurance" },
    { icon: TrendingUp, name: "Trading & Crypto" },
  ];


  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-blue-50/50">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, hsl(var(--secondary)) 0%, transparent 50%), 
                            radial-gradient(circle at 75% 75%, hsl(var(--primary)) 0%, transparent 50%)`,
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="space-y-8">
            <Badge className="bg-blue-100 text-blue-800 px-4 py-2 text-sm font-medium">
              Industry-Leading Fraud Prevention Platform
            </Badge>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white">
              <span className="block">Global Transaction</span>
              <span className="block bg-gradient-to-r from-blue-400 to-teal-400 bg-clip-text text-transparent">
                Security & Intelligence
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
              Advanced fraud detection with 72-hour resolution and complete transaction protection. 
              Beyond detection—full resolution.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-8">
              <Button 
                onClick={handleGetStarted}
                size="lg" 
                className="bg-gradient-to-r from-[#1DBF73] to-[#0A3778] hover:from-[#17A362] hover:to-[#0D4594] text-white px-10 py-7 text-xl font-bold rounded-xl shadow-xl shadow-[#1DBF73]/40 hover:shadow-2xl hover:shadow-[#1DBF73]/50 transition-all duration-300"
              >
                Start Free Trial
                <ArrowRight className="ml-2 h-6 w-6" />
              </Button>
              
              <Button 
                onClick={() => setLocation('/complete-demo')}
                variant="outline" 
                size="lg"
                className="border-[#1DBF73] border-2 text-[#1DBF73] hover:bg-[#1DBF73] hover:text-white px-10 py-7 text-xl font-bold rounded-xl transition-all duration-300"
              >
                <Play className="mr-2 h-6 w-6" />
                Watch Demo
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 pt-12">
              {[
                { icon: Shield, label: "SOC 2 Certified" },
                { icon: Lock, label: "Bank-Grade Security" },
                { icon: Globe, label: "Global Coverage" }
              ].map((indicator, index) => (
                <div key={index} className="flex items-center space-x-2 bg-gradient-to-r from-[#1DBF73]/20 to-[#0A3778]/20 backdrop-blur-sm rounded-full px-5 py-2.5 border border-[#1DBF73]/30">
                  <indicator.icon className="h-6 w-6 text-[#1DBF73]" />
                  <span className="text-base font-bold text-white">{indicator.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              Enterprise-grade fraud protection designed for global scale
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="flex justify-center mb-4">
                  <div className="p-5 bg-gradient-to-br from-[#1DBF73]/10 to-[#0A3778]/10 rounded-2xl group-hover:from-[#1DBF73]/20 group-hover:to-[#0A3778]/20 transition-all duration-300">
                    <stat.icon className="h-10 w-10 text-[#1DBF73]" />
                  </div>
                </div>
                <div className="text-4xl font-bold bg-gradient-to-r from-[#1DBF73] to-[#0A3778] bg-clip-text text-transparent mb-2">{stat.value}</div>
                <div className="text-base font-semibold text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Complete Fraud Protection Platform
            </h2>
            <p className="text-xl text-gray-600">
              From detection to resolution—everything you need to protect your business
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center border-2 border-[#1DBF73]/20 hover:border-[#1DBF73]/50 shadow-lg hover:shadow-2xl hover:shadow-[#1DBF73]/20 transition-all duration-300 group h-full">
                <CardContent className="pt-8 pb-6 px-6 flex flex-col h-full">
                  <div className="flex justify-center mb-4">
                    <div className="p-5 bg-gradient-to-br from-[#1DBF73]/10 to-[#0A3778]/10 rounded-2xl group-hover:from-[#1DBF73]/20 group-hover:to-[#0A3778]/20 transition-all duration-300">
                      <feature.icon className="h-10 w-10 text-[#1DBF73]" />
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 leading-tight">{feature.title}</h3>
                  <p className="text-gray-600 text-base leading-relaxed flex-1">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Industry Solutions
            </h2>
            <p className="text-xl text-gray-600">
              Tailored fraud protection for every industry
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="text-center border border-gray-200 hover:border-blue-300 transition-all duration-300 cursor-pointer h-full">
                <CardContent className="pt-8 pb-6 px-6">
                  <div className="flex justify-center mb-4">
                    <div className="p-4 bg-gray-100 rounded-2xl">
                      <industry.icon className="h-8 w-8 text-gray-700" />
                    </div>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight">{industry.name}</h3>
                  <p className="text-sm text-gray-500">Coming Soon</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Secure Your Business?
          </h2>
          <p className="text-xl text-blue-100 mb-8 leading-relaxed">
            Join the next generation of secure transactions with TrustVerify's comprehensive fraud prevention platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Start Free Trial
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            
            <Button 
              onClick={() => setLocation('/contact')}
              variant="outline" 
              size="lg"
              className="border-blue-300 text-blue-100 hover:bg-blue-100 hover:text-blue-900 px-8 py-6 text-lg font-semibold rounded-xl transition-all duration-300"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
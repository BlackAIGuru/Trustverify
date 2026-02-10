import { useAuth } from "@/hooks/use-auth";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Footer } from "@/components/footer";
import { 
  Shield, 
  CheckCircle, 
  Star, 
  ArrowRight,
  Play,
  Menu,
  X,
  Code,
  CreditCard,
  UserCheck,
  MessageSquare,
  Flag,
  Settings,
  Users, 
  TrendingUp, 
  Award,
  Globe,
  Zap,
  Lock,
  BarChart3,
  Eye,
  Briefcase,
  Building,
  ShoppingCart,
  Banknote,
  FileCheck,
  Store,
  Network,
  Database,
} from "lucide-react";
import { Logo } from '@/components/logo';
import { useState } from "react";

export default function HomePage() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showDemo, setShowDemo] = useState(false);

  const handleGetStarted = () => {
    if (user) {
      setLocation('/dashboard');
    } else {
      setLocation('/auth');
    }
  };

  const handleExploreAPI = () => {
    setLocation('/developer-portal');
  };

  const handleContactSales = () => {
    window.open('mailto:sales@trustverify.com?subject=TrustVerify Sales Inquiry&body=Hi, I would like to learn more about TrustVerify enterprise solutions.', '_blank');
  };

  const handleNavigateToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavigateToPage = (path: string) => {
    setLocation(path);
  };

  const handleWatchDemo = () => {
    setLocation('/demo');
  };

  const stats = [
    { label: "Fraud Prevented", value: "$2.8B+", icon: Shield },
    { label: "Enterprise Clients", value: "500+", icon: Briefcase },
    { label: "Detection Accuracy", value: "99.7%", icon: Eye },
    { label: "API Calls/Month", value: "1.2B+", icon: BarChart3 },
  ];

  const benefits = [
    {
      title: "Escrow Protection",
      description: "Secure transactions with automated escrow services that hold funds until completion.",
      icon: Shield,
    },
    {
      title: "Identity Verification",
      description: "Advanced KYC processes ensuring you transact with verified, trusted individuals.",
      icon: CheckCircle,
    },
    {
      title: "Real-time Fraud Detection",
      description: "AI-powered algorithms detect suspicious activities instantly, preventing losses.",
      icon: Eye,
    },
    {
      title: "Global Risk Intelligence",
      description: "Comprehensive threat data from 195+ countries to protect your business.",
      icon: Globe,
    }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Chief Risk Officer",
      company: "FinanceFlow Corp",
      content: "TrustVerify reduced our false positives by 87% while catching 99.8% of actual fraud attempts. The ROI was evident within 30 days.",
      rating: 5,
      avatar: "SC"
    },
    {
      name: "Marcus Rodriguez", 
      role: "Head of Security",
      company: "GlobalPay Systems",
      content: "The API integration was seamless, and their real-time detection has prevented over $50M in fraudulent transactions this year alone.",
      rating: 5,
      avatar: "MR"
    },
    {
      name: "Jennifer Liu",
      role: "VP of Operations", 
      company: "SecureCommerce Inc",
      content: "TrustVerify's platform has become essential to our operations. The comprehensive reporting and analytics have transformed our risk management.",
      rating: 5,
      avatar: "JL"
    }
  ];

  const clientLogos = [
    "FinanceFlow", "GlobalPay", "SecureCommerce", "TechCorp", "DataSafe", "CyberGuard"
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-blue-600 mr-3" />
              <span className="text-xl font-bold text-gray-900">TrustVerify</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => handleNavigateToSection('platform')} 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Platform
              </button>
              <button 
                onClick={() => handleNavigateToSection('solutions')} 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Solutions
              </button>
              <button 
                onClick={() => handleNavigateToSection('enterprise')} 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Enterprise
              </button>
              <button 
                onClick={() => handleNavigateToPage('/developer-portal')} 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Developers
              </button>
              <button 
                onClick={() => handleNavigateToPage('/pricing')} 
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
              >
                Pricing
              </button>
            </div>

            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <Button 
                  onClick={() => setLocation('/dashboard')}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Dashboard
                </Button>
              ) : (
                <>
                  <Button 
                    onClick={() => setLocation('/auth')}
                    variant="ghost"
                    className="text-gray-600 hover:text-blue-600 font-medium transition-colors"
                  >
                    Sign In
                  </Button>
                  <Button 
                    onClick={handleGetStarted}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                  >
                    Get Started Free
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="text-gray-600 hover:text-blue-600 p-2"
              >
                {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden border-t border-gray-100">
              <div className="px-2 pt-2 pb-3 space-y-1">
                <button 
                  onClick={() => {
                    handleNavigateToSection('platform');
                    setMobileMenuOpen(false);
                  }} 
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 font-medium"
                >
                  Platform
                </button>
                <button 
                  onClick={() => {
                    handleNavigateToSection('solutions');
                    setMobileMenuOpen(false);
                  }} 
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 font-medium"
                >
                  Solutions
                </button>
                <button 
                  onClick={() => {
                    handleNavigateToSection('enterprise');
                    setMobileMenuOpen(false);
                  }} 
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 font-medium"
                >
                  Enterprise
                </button>
                <button 
                  onClick={() => {
                    handleNavigateToPage('/developer-portal');
                    setMobileMenuOpen(false);
                  }} 
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 font-medium"
                >
                  Developers
                </button>
                <button 
                  onClick={() => {
                    handleNavigateToPage('/pricing');
                    setMobileMenuOpen(false);
                  }} 
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-blue-600 font-medium"
                >
                  Pricing
                </button>
                <div className="pt-4 border-t border-gray-100">
                  {user ? (
                    <Button 
                      onClick={() => {
                        setLocation('/dashboard');
                        setMobileMenuOpen(false);
                      }}
                      className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                    >
                      Dashboard
                    </Button>
                  ) : (
                    <div className="space-y-2">
                      <Button 
                        onClick={() => {
                          setLocation('/auth');
                          setMobileMenuOpen(false);
                        }}
                        variant="ghost"
                        className="w-full text-gray-600 hover:text-blue-600 font-medium py-2"
                      >
                        Sign In
                      </Button>
                      <Button 
                        onClick={() => {
                          handleGetStarted();
                          setMobileMenuOpen(false);
                        }}
                        className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                      >
                        Get Started Free
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Navy Gradient Background with Security Theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"></div>
          
          {/* Animated Security Network Background */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <pattern id="securityGrid" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                  <circle cx="50" cy="50" r="2" fill="#00D4FF" opacity="0.6">
                    <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite"/>
                  </circle>
                  <path d="M50,0 L50,100 M0,50 L100,50" stroke="#00D4FF" strokeWidth="0.5" opacity="0.3"/>
                </pattern>
                <radialGradient id="shieldGlow" cx="50%" cy="50%">
                  <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.8"/>
                  <stop offset="100%" stopColor="#0084FF" stopOpacity="0.2"/>
                </radialGradient>
              </defs>
              
              <rect width="100%" height="100%" fill="url(#securityGrid)"/>
              
              {/* Central Security Hub */}
              <g transform="translate(960,540)">
                <circle cx="0" cy="0" r="100" fill="url(#shieldGlow)" opacity="0.6">
                  <animate attributeName="r" values="100;120;100" dur="4s" repeatCount="indefinite"/>
                </circle>
                <path d="M0,-60 L45,-30 L45,30 L0,60 L-45,30 L-45,-30 Z" fill="#00FF88" opacity="0.8"/>
                
                {/* Security Connections */}
                {[...Array(8)].map((_, i) => {
                  const angle = (i * 45) * Math.PI / 180;
                  const x = 200 * Math.cos(angle);
                  const y = 200 * Math.sin(angle);
                  return (
                    <g key={i}>
                      <line x1="0" y1="0" x2={x} y2={y} stroke="#00D4FF" strokeWidth="2" opacity="0.4">
                        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="2s" repeatCount="indefinite" begin={`${i * 0.25}s`}/>
                      </line>
                      <circle cx={x} cy={y} r="8" fill="#FF6B6B" opacity="0.7">
                        <animate attributeName="r" values="8;12;8" dur="2s" repeatCount="indefinite" begin={`${i * 0.25}s`}/>
                      </circle>
                    </g>
                  );
                })}
              </g>
              
              {/* Threat Detection Waves */}
              {[...Array(4)].map((_, i) => (
                <circle key={i} cx="960" cy="540" r={300 + i * 100} fill="none" stroke="#FF4444" strokeWidth="1" opacity="0.3">
                  <animate attributeName="r" values={`${300 + i * 100};${350 + i * 100};${300 + i * 100}`} dur="6s" repeatCount="indefinite" begin={`${i * 1.5}s`}/>
                  <animate attributeName="opacity" values="0.3;0.1;0.3" dur="6s" repeatCount="indefinite" begin={`${i * 1.5}s`}/>
                </circle>
              ))}
            </svg>
          </div>
          
          {/* Floating Security Elements */}
          <div className="absolute top-20 left-20 w-16 h-16 rounded-full bg-blue-500/20 flex items-center justify-center animate-bounce">
            <Shield className="h-8 w-8 text-blue-300" />
          </div>
          <div className="absolute top-40 right-32 w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center animate-pulse">
            <Lock className="h-6 w-6 text-green-300" />
          </div>
          <div className="absolute bottom-32 left-32 w-14 h-14 rounded-full bg-yellow-500/20 flex items-center justify-center animate-ping">
            <Eye className="h-7 w-7 text-yellow-300" />
          </div>
          <div className="absolute bottom-20 right-20 w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center animate-bounce">
            <Flag className="h-5 w-5 text-red-300" />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-6">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  <span className="block text-white drop-shadow-lg font-extrabold">Fraud Prevention</span>
                  <span className="block text-blue-200 drop-shadow-lg font-extrabold">Platform</span>
                </h1>
                <p className="text-xl text-blue-50 leading-relaxed max-w-2xl drop-shadow-md font-medium">
                  Protect your business with enterprise-grade fraud detection, identity verification, 
                  and secure escrow services. Trusted by 500+ companies worldwide.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={handleGetStarted}
                  className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-600/30"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  onClick={handleExploreAPI}
                  variant="outline"
                  className="border-2 border-blue-200/80 text-blue-100 px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-200/20 hover:border-blue-200 transition-all duration-300 backdrop-blur-sm"
                >
                  Explore API
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-8 pt-8">
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-sm font-medium text-gray-100">SOC 2 Certified</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <Lock className="h-5 w-5 text-cyan-400" />
                  <span className="text-sm font-medium text-gray-100">256-bit Encryption</span>
                </div>
                <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  <span className="text-sm font-medium text-gray-100">99.99% Uptime</span>
                </div>
              </div>
            </div>

            {/* Enhanced Fraud Prevention Dashboard */}
            <div className="relative">
              <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-2xl p-8 relative overflow-hidden border border-white/20">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full -translate-y-16 translate-x-16 opacity-60"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full translate-y-12 -translate-x-12 opacity-60"></div>

                {/* Fraud Prevention Story Illustration */}
                <div className="absolute inset-0 pointer-events-none">
                  <svg className="w-full h-full opacity-5" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
                    {/* Network of protection */}
                    <defs>
                      <pattern id="protectionGrid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="2" fill="#1F4DD8" opacity="0.3"/>
                        <path d="M20,0 L20,40 M0,20 L40,20" stroke="#1F4DD8" strokeWidth="0.5" opacity="0.2"/>
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#protectionGrid)"/>
                    
                    {/* Central shield */}
                    <g transform="translate(200,150)">
                      <path d="M0,-40 L30,-20 L30,20 L0,40 L-30,20 L-30,-20 Z" fill="#00B386" opacity="0.8"/>
                      <circle cx="0" cy="0" r="35" fill="none" stroke="#1F4DD8" strokeWidth="2" strokeDasharray="5,5">
                        <animateTransform attributeName="transform" type="rotate" values="0;360" dur="20s" repeatCount="indefinite"/>
                      </circle>
                    </g>
                    
                    {/* Threat detection waves */}
                    <g transform="translate(200,150)">
                      {[...Array(3)].map((_, i) => (
                        <circle key={i} cx="0" cy="0" r={60 + i * 20} fill="none" stroke="#D72638" strokeWidth="1" opacity="0.4">
                          <animate attributeName="r" values={`${60 + i * 20};${80 + i * 20};${60 + i * 20}`} dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`}/>
                          <animate attributeName="opacity" values="0.4;0.1;0.4" dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`}/>
                        </circle>
                      ))}
                    </g>
                  </svg>
                </div>

                <div className="relative z-10 space-y-6">
                  {/* Header with Fraud Prevention Indicators */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                        <Shield className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <span className="font-semibold text-sm text-gray-900">Fraud Prevention Suite</span>
                        <div className="flex items-center space-x-2 mt-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span className="text-xs text-green-600">Active Protection</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">99.8%</div>
                      <div className="text-xs text-gray-500">Detection Rate</div>
                    </div>
                  </div>
                  
                  {/* Multi-Industry Protection Indicators */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-xl bg-green-50 border border-green-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-green-600 flex items-center justify-center">
                          <ShoppingCart className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-gray-900">E-commerce</span>
                      </div>
                      <div className="text-xs text-green-600">Protected: $2.1M</div>
                    </div>
                    
                    <div className="p-3 rounded-xl bg-blue-50 border border-blue-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center">
                          <Banknote className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-gray-900">Banking</span>
                      </div>
                      <div className="text-xs text-blue-600">Protected: $5.7M</div>
                    </div>
                    
                    <div className="p-3 rounded-xl bg-yellow-50 border border-yellow-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-yellow-600 flex items-center justify-center">
                          <Store className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-gray-900">Marketplace</span>
                      </div>
                      <div className="text-xs text-yellow-600">Protected: $1.8M</div>
                    </div>
                    
                    <div className="p-3 rounded-xl bg-gray-50 border border-gray-200">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-6 h-6 rounded-lg bg-gray-600 flex items-center justify-center">
                          <Briefcase className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-xs font-semibold text-gray-900">Enterprise</span>
                      </div>
                      <div className="text-xs text-gray-600">Protected: $3.4M</div>
                    </div>
                  </div>

                  {/* Real-Time Threat Detection */}
                  <div className="p-4 rounded-xl bg-gray-50 border border-gray-200">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-6 h-6 rounded-lg bg-red-600 flex items-center justify-center">
                          <Eye className="h-3 w-3 text-white" />
                        </div>
                        <span className="text-sm font-medium text-gray-900">Threat Detection</span>
                      </div>
                      <div className="text-sm font-bold text-red-600">Live</div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Suspicious pattern blocked</span>
                        <div className="flex items-center">
                          <div className="w-2 h-2 bg-red-400 rounded-full mr-2 animate-pulse"></div>
                          <span className="text-xs font-semibold text-red-600">Now</span>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Identity verification passed</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-gray-600">Global risk check complete</span>
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-center pt-4">
                    <Button 
                      onClick={handleWatchDemo}
                      variant="ghost"
                      className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <Play className="h-6 w-6" />
                      <span>Watch Demo</span>
                    </Button>
                  </div>
                </div>
                
                {/* Floating Security Elements */}
                <div className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-green-600 flex items-center justify-center shadow-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-lg">
                  <Lock className="h-4 w-4 text-white" />
                </div>
                <div className="absolute top-1/2 -left-6 w-6 h-6 rounded-full bg-yellow-600 flex items-center justify-center shadow-lg">
                  <Eye className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Visual Elements */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center relative">
                {/* Background illustration for each stat */}
                <div className="absolute inset-0 pointer-events-none opacity-5">
                  <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    {index === 0 && (
                      // Fraud Prevention - Money with shield
                      <g>
                        <rect x="60" y="80" width="80" height="40" rx="20" fill="currentColor"/>
                        <text x="100" y="105" textAnchor="middle" fontSize="16" fill="white">$</text>
                        <path d="M100,60 L120,70 L120,90 C120,100 100,110 100,110 C100,110 80,100 80,90 L80,70 Z" fill="currentColor" opacity="0.6"/>
                      </g>
                    )}
                    {index === 1 && (
                      // Enterprise Clients - Building network
                      <g>
                        {[...Array(3)].map((_, i) => (
                          <rect key={i} x={50 + i * 30} y={120 - i * 20} width="20" height={60 + i * 20} fill="currentColor" opacity={0.7 - i * 0.1}/>
                        ))}
                        <circle cx="100" cy="60" r="15" fill="currentColor"/>
                        {[...Array(3)].map((_, i) => (
                          <path key={i} d={`M100,75 L${60 + i * 30},${120 - i * 20}`} stroke="currentColor" strokeWidth="2" opacity="0.5"/>
                        ))}
                      </g>
                    )}
                    {index === 2 && (
                      // Detection Accuracy - Target with bullseye
                      <g>
                        {[...Array(4)].map((_, i) => (
                          <circle key={i} cx="100" cy="100" r={60 - i * 15} fill="none" stroke="currentColor" strokeWidth="2" opacity={0.8 - i * 0.1}/>
                        ))}
                        <circle cx="100" cy="100" r="8" fill="currentColor"/>
                        <path d="M90,100 L95,100 M105,100 L110,100 M100,90 L100,95 M100,105 L100,110" stroke="currentColor" strokeWidth="3"/>
                      </g>
                    )}
                    {index === 3 && (
                      // API Calls - Data streams
                      <g>
                        {[...Array(5)].map((_, i) => (
                          <g key={i}>
                            <path d={`M20,${60 + i * 20} Q100,${40 + i * 20} 180,${60 + i * 20}`} fill="none" stroke="currentColor" strokeWidth="2" opacity={0.6 - i * 0.1}/>
                            <circle cx="20" cy={60 + i * 20} r="3" fill="currentColor"/>
                            <circle cx="180" cy={60 + i * 20} r="3" fill="currentColor"/>
                          </g>
                        ))}
                      </g>
                    )}
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-blue-100 rounded-full relative">
                      <stat.icon className="h-8 w-8 text-blue-600" />
                      {/* Pulse effect for active protection */}
                      {index === 0 && (
                        <div className="absolute inset-0 bg-blue-600 rounded-full animate-ping opacity-20"></div>
                      )}
                    </div>
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Fraud Prevention Story Section */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              The Fraud Prevention Story
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how TrustVerify protects your transactions at every step
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            {/* Step 1: Threat Detection */}
            <div className="text-center">
              <div className="relative mx-auto w-32 h-32 mb-6">
                <svg className="w-full h-full" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <radialGradient id="threatGradient" cx="50%" cy="50%">
                      <stop offset="0%" stopColor="#DC2626" stopOpacity="0.8"/>
                      <stop offset="100%" stopColor="#DC2626" stopOpacity="0.2"/>
                    </radialGradient>
                  </defs>
                  
                  {/* Threat waves */}
                  {[...Array(4)].map((_, i) => (
                    <circle key={i} cx="64" cy="64" r={20 + i * 12} fill="none" stroke="#DC2626" strokeWidth="2" opacity="0.6">
                      <animate attributeName="r" values={`${20 + i * 12};${30 + i * 12};${20 + i * 12}`} dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`}/>
                      <animate attributeName="opacity" values="0.6;0.2;0.6" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`}/>
                    </circle>
                  ))}
                  
                  {/* Central threat indicator */}
                  <circle cx="64" cy="64" r="16" fill="url(#threatGradient)"/>
                  <path d="M64,52 L64,68 M58,64 L70,64" stroke="#FFF" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">1. Threat Detected</h3>
              <p className="text-gray-600">Suspicious activity is identified using AI-powered analysis</p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex justify-center">
              <ArrowRight className="h-8 w-8 text-gray-400" />
            </div>

            {/* Step 2: Shield Protection */}
            <div className="text-center">
              <div className="relative mx-auto w-32 h-32 mb-6">
                <svg className="w-full h-full" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="shieldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#00B386"/>
                      <stop offset="100%" stopColor="#1F4DD8"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Protection field */}
                  <circle cx="64" cy="64" r="50" fill="url(#shieldGradient)" opacity="0.1"/>
                  <circle cx="64" cy="64" r="45" fill="none" stroke="url(#shieldGradient)" strokeWidth="2" strokeDasharray="5,5">
                    <animateTransform attributeName="transform" type="rotate" values="0 64 64;360 64 64" dur="10s" repeatCount="indefinite"/>
                  </circle>
                  
                  {/* Central shield */}
                  <path d="M64,24 L86,36 L86,64 C86,78 64,92 64,92 C64,92 42,78 42,64 L42,36 Z" fill="url(#shieldGradient)"/>
                  <path d="M54,52 L60,58 L74,44" stroke="#FFF" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">2. Shield Activated</h3>
              <p className="text-gray-600">Multi-layer protection blocks fraudulent attempts</p>
            </div>

            {/* Arrow */}
            <div className="hidden lg:flex justify-center">
              <ArrowRight className="h-8 w-8 text-gray-400" />
            </div>

            {/* Step 3: Secure Transaction */}
            <div className="text-center">
              <div className="relative mx-auto w-32 h-32 mb-6">
                <svg className="w-full h-full" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
                  <defs>
                    <linearGradient id="secureGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#10B981"/>
                      <stop offset="100%" stopColor="#059669"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Success waves */}
                  {[...Array(3)].map((_, i) => (
                    <circle key={i} cx="64" cy="64" r={30 + i * 10} fill="none" stroke="#10B981" strokeWidth="1" opacity="0.4">
                      <animate attributeName="r" values={`${30 + i * 10};${40 + i * 10};${30 + i * 10}`} dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`}/>
                    </circle>
                  ))}
                  
                  {/* Central success indicator */}
                  <circle cx="64" cy="64" r="24" fill="url(#secureGradient)"/>
                  <path d="M54,64 L60,70 L74,56" stroke="#FFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">3. Transaction Secured</h3>
              <p className="text-gray-600">Your transaction completes safely and securely</p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="platform" className="py-20 relative overflow-hidden">
        {/* Navy Gradient Background with Security Theme */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-indigo-900/80"></div>
          
          {/* Industry Visual Elements */}
          <div className="absolute inset-0 opacity-10">
            <svg className="w-full h-full" viewBox="0 0 1920 1080" xmlns="http://www.w3.org/2000/svg">
              {/* E-commerce Shopping Cart Network */}
              <g transform="translate(300,200)">
                <rect x="0" y="20" width="80" height="60" rx="8" fill="#10B981" opacity="0.8"/>
                <circle cx="20" cy="100" r="8" fill="#10B981"/>
                <circle cx="60" cy="100" r="8" fill="#10B981"/>
                <path d="M10,30 L15,50 L65,50 L70,30" stroke="#10B981" strokeWidth="3" fill="none"/>
                {[...Array(5)].map((_, i) => (
                  <circle key={i} cx={40 + i * 30} cy={150 + i * 20} r="4" fill="#10B981" opacity={0.6 - i * 0.1}>
                    <animate attributeName="opacity" values="0.6;0.2;0.6" dur="3s" repeatCount="indefinite" begin={`${i * 0.5}s`}/>
                  </circle>
                ))}
              </g>
              
              {/* Banking/Financial Towers */}
              <g transform="translate(600,150)">
                {[...Array(4)].map((_, i) => (
                  <rect key={i} x={i * 25} y={200 - i * 30} width="20" height={50 + i * 30} fill="#3B82F6" opacity={0.8 - i * 0.1}/>
                ))}
                <circle cx="50" cy="100" r="25" fill="#3B82F6" opacity="0.6"/>
                <path d="M35,100 L50,85 L65,100" stroke="white" strokeWidth="3" fill="none"/>
                {[...Array(3)].map((_, i) => (
                  <path key={i} d={`M50,125 Q${75 + i * 25},${140 + i * 10} ${100 + i * 40},${150 + i * 15}`} stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.5"/>
                ))}
              </g>
              
              {/* Marketplace Network Hub */}
              <g transform="translate(1000,250)">
                <rect x="30" y="30" width="40" height="40" fill="#F59E0B" opacity="0.8"/>
                <path d="M35,50 L45,40 L55,40 L65,50 L55,60 L45,60 Z" fill="white"/>
                {[...Array(6)].map((_, i) => {
                  const angle = i * 60;
                  const x = 80 * Math.cos(angle * Math.PI / 180);
                  const y = 80 * Math.sin(angle * Math.PI / 180);
                  return (
                    <g key={i}>
                      <line x1="50" y1="50" x2={50 + x} y2={50 + y} stroke="#F59E0B" strokeWidth="2" opacity="0.4"/>
                      <rect x={45 + x} y={45 + y} width="10" height="10" fill="#F59E0B" opacity="0.7"/>
                    </g>
                  );
                })}
              </g>
              
              {/* Enterprise Security Grid */}
              <g transform="translate(1300,180)">
                {[...Array(4)].map((_, row) => 
                  [...Array(4)].map((_, col) => (
                    <rect key={`${row}-${col}`} 
                          x={col * 30} y={row * 30} 
                          width="20" height="20" 
                          fill="#6366F1" 
                          opacity={0.6 - (row + col) * 0.05}>
                      <animate attributeName="opacity" 
                               values="0.6;0.3;0.6" 
                               dur="4s" 
                               repeatCount="indefinite" 
                               begin={`${(row + col) * 0.2}s`}/>
                    </rect>
                  ))
                )}
                <circle cx="45" cy="45" r="35" fill="none" stroke="#6366F1" strokeWidth="2" opacity="0.5"/>
                <path d="M45,20 L60,35 L45,50 L30,35 Z" fill="#6366F1" opacity="0.8"/>
              </g>
            </svg>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4 drop-shadow-lg font-extrabold">
              Complete Fraud Prevention Suite
            </h2>
            <p className="text-xl text-blue-50 leading-relaxed max-w-3xl mx-auto drop-shadow-md font-medium">
              Protect your business with our comprehensive platform that combines 
              advanced technology with human expertise across all industries.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 relative overflow-hidden border border-white/20 hover:bg-white/15">
                {/* Enhanced Background illustration for each benefit */}
                <div className="absolute inset-0 pointer-events-none opacity-5">
                  <svg className="w-full h-full" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    {index === 0 && (
                      // Enhanced Escrow Protection with vault and security
                      <g>
                        <rect x="60" y="80" width="80" height="60" rx="4" fill="currentColor"/>
                        <circle cx="100" cy="110" r="12" fill="white"/>
                        <path d="M95,110 L98,113 L105,106" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <rect x="50" y="70" width="100" height="80" rx="8" fill="none" stroke="currentColor" strokeWidth="3"/>
                        {/* Security locks around */}
                        {[...Array(4)].map((_, i) => (
                          <circle key={i} cx={70 + i * 20} cy={60} r="3" fill="currentColor"/>
                        ))}
                        {/* Money symbols */}
                        <text x="100" y="130" textAnchor="middle" fontSize="16" fill="currentColor">$</text>
                      </g>
                    )}
                    {index === 1 && (
                      // Enhanced Identity Verification with biometric elements
                      <g>
                        <rect x="40" y="60" width="120" height="80" rx="8" fill="currentColor"/>
                        <circle cx="80" cy="90" r="12" fill="white"/>
                        <rect x="100" y="80" width="40" height="6" rx="3" fill="white"/>
                        <rect x="100" y="90" width="30" height="6" rx="3" fill="white"/>
                        <rect x="100" y="100" width="35" height="6" rx="3" fill="white"/>
                        {/* Biometric scanner lines */}
                        {[...Array(5)].map((_, i) => (
                          <line key={i} x1="65" y1={75 + i * 3} x2="95" y2={75 + i * 3} stroke="currentColor" strokeWidth="0.5"/>
                        ))}
                        {/* Verification checkmark */}
                        <circle cx="140" cy="70" r="8" fill="white"/>
                        <path d="M136,70 L139,73 L144,68" stroke="currentColor" strokeWidth="2" fill="none"/>
                      </g>
                    )}
                    {index === 2 && (
                      // Enhanced Fraud Detection with AI patterns
                      <g>
                        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1"/>
                        <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1"/>
                        <path d="M100,100 L100,40" stroke="currentColor" strokeWidth="3"/>
                        <path d="M100,100 L140,60" stroke="currentColor" strokeWidth="2" opacity="0.7">
                          <animateTransform attributeName="transform" type="rotate" values="0 100 100;360 100 100" dur="4s" repeatCount="indefinite"/>
                        </path>
                        {/* Threat indicators */}
                        {[...Array(6)].map((_, i) => {
                          const angle = i * 60;
                          const x = 50 * Math.cos(angle * Math.PI / 180);
                          const y = 50 * Math.sin(angle * Math.PI / 180);
                          return (
                            <circle key={i} cx={100 + x} cy={100 + y} r="3" fill="currentColor" opacity="0.6">
                              <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin={`${i * 0.3}s`}/>
                            </circle>
                          );
                        })}
                      </g>
                    )}
                    {index === 3 && (
                      // Enhanced Global Intelligence with data streams
                      <g>
                        <circle cx="100" cy="100" r="50" fill="none" stroke="currentColor" strokeWidth="2"/>
                        <ellipse cx="100" cy="100" rx="50" ry="25" fill="none" stroke="currentColor" strokeWidth="1"/>
                        <ellipse cx="100" cy="100" rx="25" ry="50" fill="none" stroke="currentColor" strokeWidth="1"/>
                        <path d="M50,100 L150,100 M100,50 L100,150" stroke="currentColor" strokeWidth="1"/>
                        {/* Global connection points */}
                        {[...Array(8)].map((_, i) => (
                          <circle key={i} cx={100 + 35 * Math.cos(i * Math.PI / 4)} cy={100 + 35 * Math.sin(i * Math.PI / 4)} r="3" fill="currentColor"/>
                        ))}
                        {/* Data flow lines */}
                        {[...Array(4)].map((_, i) => (
                          <path key={i} d={`M100,100 Q${120 + i * 10},${80 - i * 5} ${140 + i * 15},${90 + i * 10}`} stroke="currentColor" strokeWidth="1" fill="none" opacity="0.4">
                            <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" begin={`${i * 0.7}s`}/>
                          </path>
                        ))}
                      </g>
                    )}
                  </svg>
                </div>
                
                <div className="relative z-10">
                  <div className="flex justify-center mb-4">
                    <div className="p-3 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-full border border-cyan-300/30">
                      <benefit.icon className="h-8 w-8 text-cyan-300" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 text-center drop-shadow-md">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-200 text-center text-sm leading-relaxed">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-20 bg-white relative overflow-hidden">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-5">
          <svg className="w-full h-full" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <pattern id="industryPattern" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="10" cy="10" r="1" fill="#3B82F6"/>
              <path d="M0,10 L20,10 M10,0 L10,20" stroke="#3B82F6" strokeWidth="0.2"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#industryPattern)"/>
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Industry Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored fraud prevention solutions for every industry with stunning visual protection
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* E-commerce Solution */}
            <div className="group bg-gradient-to-br from-green-50 to-emerald-100 rounded-xl p-8 text-center relative overflow-hidden hover:shadow-xl transition-all duration-300 border border-green-200/50">
              <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/10 group-hover:from-green-500/10 group-hover:to-emerald-500/20 transition-all duration-300"></div>
              
              {/* E-commerce Visual Background */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg className="w-full h-full" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                  {/* Shopping cart and products */}
                  <rect x="50" y="80" width="60" height="40" rx="8" fill="#10B981"/>
                  <circle x="70" y="140" r="6" fill="#10B981"/>
                  <circle x="90" y="140" r="6" fill="#10B981"/>
                  <path d="M55,85 L60,105 L100,105 L105,85" stroke="#10B981" strokeWidth="3" fill="none"/>
                  
                  {/* Product boxes */}
                  {[...Array(4)].map((_, i) => (
                    <rect key={i} x={130 + i * 25} y={90 - i * 5} width="20" height="20" fill="#10B981" opacity={0.7 - i * 0.1}/>
                  ))}
                  
                  {/* Security shield overlay */}
                  <path d="M150,50 L170,60 L170,80 C170,90 150,100 150,100 C150,100 130,90 130,80 L130,60 Z" fill="#059669" opacity="0.8"/>
                  <path d="M140,70 L145,75 L160,60" stroke="white" strokeWidth="2" fill="none"/>
                  
                  {/* Transaction flow */}
                  {[...Array(3)].map((_, i) => (
                    <circle key={i} cx={200 + i * 20} cy={100 + i * 10} r="3" fill="#10B981" opacity={0.6}>
                      <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin={`${i * 0.5}s`}/>
                    </circle>
                  ))}
                </svg>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <ShoppingCart className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">E-commerce Protection</h3>
                <p className="text-gray-600 mb-4">Protect online transactions, prevent chargebacks, and secure customer data with AI-powered fraud detection</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full">$2.1M Protected</span>
                  <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded-full">99.7% Accuracy</span>
                </div>
              </div>
            </div>

            {/* Banking/Financial Services Solution */}
            <div className="group bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-8 text-center relative overflow-hidden hover:shadow-xl transition-all duration-300 border border-blue-200/50">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/10 group-hover:from-blue-500/10 group-hover:to-indigo-500/20 transition-all duration-300"></div>
              
              {/* Banking Visual Background */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg className="w-full h-full" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                  {/* Bank building */}
                  {[...Array(5)].map((_, i) => (
                    <rect key={i} x={80 + i * 20} y={120 - i * 15} width="15" height={60 + i * 15} fill="#3B82F6" opacity={0.8 - i * 0.1}/>
                  ))}
                  
                  {/* Central vault */}
                  <circle cx="150" cy="100" r="30" fill="#1D4ED8" opacity="0.8"/>
                  <circle cx="150" cy="100" r="20" fill="white" opacity="0.9"/>
                  <path d="M145,100 L148,103 L155,96" stroke="#1D4ED8" strokeWidth="3" fill="none"/>
                  
                  {/* Money flow lines */}
                  {[...Array(4)].map((_, i) => (
                    <path key={i} d={`M150,130 Q${180 + i * 15},${145 + i * 5} ${210 + i * 20},${150 + i * 10}`} stroke="#3B82F6" strokeWidth="2" fill="none" opacity="0.6">
                      <animate attributeName="opacity" values="0.6;1;0.6" dur="3s" repeatCount="indefinite" begin={`${i * 0.7}s`}/>
                    </path>
                  ))}
                  
                  {/* KYC verification icons */}
                  <rect x="50" y="60" width="40" height="25" rx="3" fill="#1D4ED8" opacity="0.7"/>
                  <circle cx="60" cy="70" r="4" fill="white"/>
                  <rect x="68" y="65" width="15" height="2" fill="white"/>
                  <rect x="68" y="70" width="12" height="2" fill="white"/>
                  <rect x="68" y="75" width="18" height="2" fill="white"/>
                </svg>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Banknote className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Banking & Financial</h3>
                <p className="text-gray-600 mb-4">Advanced KYC/AML compliance, regulatory reporting, and real-time transaction monitoring for financial institutions</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full">$5.7M Secured</span>
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full">SOC 2 Certified</span>
                </div>
              </div>
            </div>

            {/* Marketplace Solution */}
            <div className="group bg-gradient-to-br from-yellow-50 to-orange-100 rounded-xl p-8 text-center relative overflow-hidden hover:shadow-xl transition-all duration-300 border border-yellow-200/50">
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-orange-500/10 group-hover:from-yellow-500/10 group-hover:to-orange-500/20 transition-all duration-300"></div>
              
              {/* Marketplace Visual Background */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg className="w-full h-full" viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
                  {/* Central marketplace hub */}
                  <rect x="130" y="80" width="40" height="40" fill="#F59E0B" opacity="0.8"/>
                  <path d="M135,100 L145,90 L155,90 L165,100 L155,110 L145,110 Z" fill="white"/>
                  
                  {/* Connected vendors/buyers */}
                  {[...Array(6)].map((_, i) => {
                    const angle = i * 60;
                    const x = 70 * Math.cos(angle * Math.PI / 180);
                    const y = 70 * Math.sin(angle * Math.PI / 180);
                    return (
                      <g key={i}>
                        <line x1="150" y1="100" x2={150 + x} y2={100 + y} stroke="#F59E0B" strokeWidth="2" opacity="0.5"/>
                        <rect x={145 + x} y={95 + y} width="10" height="10" fill="#F59E0B" opacity="0.8"/>
                        {/* User icons */}
                        <circle cx={150 + x} cy={90 + y} r="3" fill="#D97706"/>
                      </g>
                    );
                  })}
                  
                  {/* Transaction arrows */}
                  {[...Array(3)].map((_, i) => (
                    <path key={i} d={`M${100 + i * 30},150 Q150,${130 - i * 5} ${200 - i * 30},150`} stroke="#F59E0B" strokeWidth="2" fill="none" opacity="0.6" markerEnd="url(#arrowhead)">
                      <animate attributeName="opacity" values="0.6;1;0.6" dur="2.5s" repeatCount="indefinite" begin={`${i * 0.8}s`}/>
                    </path>
                  ))}
                  
                  <defs>
                    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                      <polygon points="0 0, 10 3.5, 0 7" fill="#F59E0B"/>
                    </marker>
                  </defs>
                </svg>
              </div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-yellow-500 to-orange-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Store className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Marketplace Security</h3>
                <p className="text-gray-600 mb-4">Secure peer-to-peer transactions with automated escrow, seller verification, and dispute resolution</p>
                <div className="flex justify-center space-x-4 text-sm">
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">$1.8M Volume</span>
                  <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full">24/7 Monitoring</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Industry Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            {/* Enterprise Solution */}
            <div className="group bg-gradient-to-br from-purple-50 to-violet-100 rounded-xl p-8 relative overflow-hidden hover:shadow-xl transition-all duration-300 border border-purple-200/50">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-violet-500/10 group-hover:from-purple-500/10 group-hover:to-violet-500/20 transition-all duration-300"></div>
              
              {/* Enterprise Visual Background */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                  {/* Enterprise network grid */}
                  {[...Array(5)].map((_, row) => 
                    [...Array(6)].map((_, col) => (
                      <rect key={`${row}-${col}`} 
                            x={60 + col * 40} y={50 + row * 25} 
                            width="25" height="15" 
                            fill="#8B5CF6" 
                            opacity={0.6 - (row + col) * 0.03}>
                        <animate attributeName="opacity" 
                                 values="0.6;0.3;0.6" 
                                 dur="4s" 
                                 repeatCount="indefinite" 
                                 begin={`${(row + col) * 0.2}s`}/>
                      </rect>
                    ))
                  )}
                  
                  {/* Central command center */}
                  <circle cx="200" cy="100" r="40" fill="#7C3AED" opacity="0.8"/>
                  <circle cx="200" cy="100" r="25" fill="white" opacity="0.9"/>
                  <path d="M190,100 L195,105 L210,90" stroke="#7C3AED" strokeWidth="3" fill="none"/>
                  
                  {/* Security connections */}
                  {[...Array(8)].map((_, i) => {
                    const angle = i * 45;
                    const x = 60 * Math.cos(angle * Math.PI / 180);
                    const y = 60 * Math.sin(angle * Math.PI / 180);
                    return (
                      <line key={i} x1="200" y1="100" x2={200 + x} y2={100 + y} stroke="#8B5CF6" strokeWidth="2" opacity="0.4">
                        <animate attributeName="opacity" values="0.4;0.8;0.4" dur="3s" repeatCount="indefinite" begin={`${i * 0.3}s`}/>
                      </line>
                    );
                  })}
                </svg>
              </div>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-purple-500 to-violet-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Building className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Enterprise Solutions</h3>
                  <p className="text-gray-600 mb-4">Custom fraud prevention for large organizations with dedicated support and tailored integrations</p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full">$3.4M Protected</span>
                    <span className="bg-violet-100 text-violet-800 px-3 py-1 rounded-full">Custom API</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Users className="h-4 w-4 text-purple-500" />
                    <span>Dedicated Account Manager</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Settings className="h-4 w-4 text-purple-500" />
                    <span>Custom Integration</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Award className="h-4 w-4 text-purple-500" />
                    <span>SLA Guarantees</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Cryptocurrency/Digital Assets */}
            <div className="group bg-gradient-to-br from-cyan-50 to-teal-100 rounded-xl p-8 relative overflow-hidden hover:shadow-xl transition-all duration-300 border border-cyan-200/50">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-teal-500/10 group-hover:from-cyan-500/10 group-hover:to-teal-500/20 transition-all duration-300"></div>
              
              {/* Crypto Visual Background */}
              <div className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                <svg className="w-full h-full" viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
                  {/* Blockchain visualization */}
                  {[...Array(4)].map((_, i) => (
                    <rect key={i} x={80 + i * 60} y="80" width="40" height="40" fill="#06B6D4" opacity={0.8 - i * 0.1}/>
                  ))}
                  
                  {/* Connecting lines */}
                  {[...Array(3)].map((_, i) => (
                    <line key={i} x1={120 + i * 60} y1="100" x2={140 + i * 60} y2="100" stroke="#0891B2" strokeWidth="3"/>
                  ))}
                  
                  {/* Digital currency symbols */}
                  {[...Array(4)].map((_, i) => (
                    <circle key={i} cx={100 + i * 60} cy="100" r="12" fill="white" opacity="0.9"/>
                  ))}
                  
                  {/* Security verification checkmarks */}
                  {[...Array(4)].map((_, i) => (
                    <path key={i} d={`M${95 + i * 60},100 L${100 + i * 60},105 L${105 + i * 60},95`} stroke="#0891B2" strokeWidth="2" fill="none"/>
                  ))}
                  
                  {/* Data streams */}
                  {[...Array(3)].map((_, i) => (
                    <path key={i} d={`M100,${130 + i * 15} Q200,${140 + i * 10} 300,${130 + i * 15}`} stroke="#06B6D4" strokeWidth="1.5" fill="none" opacity="0.6">
                      <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite" begin={`${i * 0.6}s`}/>
                    </path>
                  ))}
                </svg>
              </div>
              
              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div>
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-cyan-500 to-teal-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Network className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Digital Assets</h3>
                  <p className="text-gray-600 mb-4">Blockchain transaction monitoring, cryptocurrency fraud detection, and digital wallet security</p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="bg-cyan-100 text-cyan-800 px-3 py-1 rounded-full">$8.2M Monitored</span>
                    <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full">Multi-Chain</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Database className="h-4 w-4 text-cyan-500" />
                    <span>Blockchain Analysis</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Eye className="h-4 w-4 text-cyan-500" />
                    <span>Wallet Monitoring</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Flag className="h-4 w-4 text-cyan-500" />
                    <span>Suspicious Pattern Detection</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section id="enterprise" className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise Solutions
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Custom fraud prevention solutions for large organizations
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Enterprise Security</h3>
                  <p className="text-gray-600">Bank-grade security with custom compliance requirements</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Dedicated Support</h3>
                  <p className="text-gray-600">24/7 dedicated account management and technical support</p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900">Custom Integration</h3>
                  <p className="text-gray-600">Tailored API integration with your existing systems</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-8 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Ready to discuss enterprise needs?</h3>
              <p className="text-gray-600 mb-6">Get a custom quote and implementation plan for your organization.</p>
              <Button 
                onClick={() => window.open('mailto:enterprise@trustverify.com?subject=Enterprise Inquiry', '_blank')}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white"
              >
                Contact Enterprise Sales
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Client Logos */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-lg font-semibold text-gray-600 mb-8">
              Trusted by leading companies worldwide
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
              {clientLogos.map((logo, index) => (
                <div key={index} className="flex justify-center">
                  <div className="text-2xl font-bold text-gray-400 hover:text-gray-600 transition-colors">
                    {logo}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <p className="text-xl text-gray-600">
              Real results from real businesses
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-blue-600 font-semibold">{testimonial.avatar}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                    <div className="text-sm text-gray-500">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 to-indigo-900/80"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-4xl font-extrabold text-blue-50 mb-4">
            Ready to Protect Your Business?
          </h2>
          <p className="text-xl text-blue-50 font-medium mb-8 max-w-2xl mx-auto">
            Join thousands of companies that trust TrustVerify to secure their transactions 
            and prevent fraud.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={handleGetStarted}
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors"
            >
              Start Free Trial
            </Button>
            <Button
              onClick={handleExploreAPI}
              variant="outline"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
            >
              View Documentation
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 relative overflow-hidden">
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="space-y-4">
                <div className="flex items-center">
                  <Shield className="h-8 w-8 text-white mr-3" />
                  <span className="text-xl font-bold text-white">TrustVerify</span>
                </div>
                <p className="text-gray-300">
                  Fraud prevention and verification platform trusted by enterprises globally.
                </p>
                <div className="flex space-x-4">
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-xs">T</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-xs">L</span>
                  </div>
                  <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-xs">G</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-white">Platform</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white transition-colors">Fraud Detection</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Identity Verification</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Escrow Services</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">API Documentation</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-white">Company</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Press</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold mb-4 text-white">Resources</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="#" className="hover:text-white transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-white transition-colors">Security</a></li>
                </ul>
              </div>
            </div>

            <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-300">
                © 2025 TrustVerify. All rights reserved.
              </p>
              <div className="flex items-center space-x-4 mt-4 md:mt-0">
                <span className="text-gray-300 text-sm">Powered by enterprise security</span>
                <div className="flex items-center space-x-2">
                  <Shield className="h-4 w-4 text-gray-300" />
                  <Lock className="h-4 w-4 text-gray-300" />
                  <Award className="h-4 w-4 text-gray-300" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Demo Modal */}
      {showDemo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 overflow-y-auto">
          <Card className="w-full max-w-4xl bg-white border border-gray-200 shadow-xl max-h-[95vh] overflow-y-auto my-4">
            <CardHeader className="border-b border-gray-100 sticky top-0 bg-white z-10">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl sm:text-2xl text-gray-900">TrustVerify Live Demo</CardTitle>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => setShowDemo(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6">
              <DemoExperience />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

// Interactive Demo Component
function DemoExperience() {
  const [currentStep, setCurrentStep] = useState(1);
  const [simulatedTransaction, setSimulatedTransaction] = useState({
    amount: "$2,500.00",
    buyer: "john.doe@example.com",
    seller: "jane.smith@developer.com",
    status: "pending"
  });

  const demoSteps = [
    {
      title: "Transaction Creation",
      description: "Watch how TrustVerify secures a new transaction",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">New Transaction Request</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-gray-600 min-w-0">Amount:</span>
                <span className="font-semibold sm:ml-2 truncate">{simulatedTransaction.amount}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center">
                <span className="text-gray-600 min-w-0">Service:</span>
                <span className="font-semibold sm:ml-2 truncate">Website Development</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center min-w-0">
                <span className="text-gray-600 flex-shrink-0">Buyer:</span>
                <span className="font-semibold sm:ml-2 truncate text-xs sm:text-sm break-all">{simulatedTransaction.buyer}</span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center min-w-0">
                <span className="text-gray-600 flex-shrink-0">Seller:</span>
                <span className="font-semibold sm:ml-2 truncate text-xs sm:text-sm break-all">{simulatedTransaction.seller}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Transaction created successfully</span>
          </div>
        </div>
      )
    },
    {
      title: "Identity Verification",
      description: "Real-time identity checks for both parties",
      content: (
        <div className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <UserCheck className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Buyer Identity Verified</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Verified</Badge>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <UserCheck className="h-5 w-5 text-green-600" />
                <span className="font-medium text-green-800">Seller Identity Verified</span>
              </div>
              <Badge className="bg-green-100 text-green-800">Verified</Badge>
            </div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h5 className="font-medium text-gray-900 mb-2">Verification Details</h5>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Document verification completed</li>
              <li>• Biometric matching confirmed</li>
              <li>• Risk assessment: Low</li>
              <li>• Trust score: 95/100</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "Fraud Detection",
      description: "AI-powered fraud prevention in action",
      content: (
        <div className="space-y-4">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Shield className="h-6 w-6 text-red-600" />
              <h4 className="font-semibold text-red-900">Suspicious Activity Detected</h4>
            </div>
            <div className="space-y-2 text-sm text-red-800">
              <p>• Unusual login pattern detected from buyer account</p>
              <p>• IP address flagged in our threat database</p>
              <p>• Transaction amount exceeds user's typical range</p>
            </div>
          </div>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-2">
              <Eye className="h-5 w-5 text-yellow-600" />
              <span className="font-semibold text-yellow-900">Additional Verification Required</span>
            </div>
            <p className="text-sm text-yellow-800">Enhanced security measures applied automatically</p>
          </div>
        </div>
      )
    },
    {
      title: "Secure Escrow",
      description: "Funds held safely until completion",
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <Lock className="h-6 w-6 text-blue-600" />
              <h4 className="font-semibold text-blue-900">Funds Secured in Escrow</h4>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Escrow Amount:</span>
                <span className="font-semibold ml-2 text-blue-900">{simulatedTransaction.amount}</span>
              </div>
              <div>
                <span className="text-gray-600">Release Condition:</span>
                <span className="font-semibold ml-2 text-blue-900">Work Completion</span>
              </div>
              <div>
                <span className="text-gray-600">Protection:</span>
                <span className="font-semibold ml-2 text-blue-900">Full Coverage</span>
              </div>
              <div>
                <span className="text-gray-600">Dispute Window:</span>
                <span className="font-semibold ml-2 text-blue-900">7 Days</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Buyer and seller protected by escrow</span>
          </div>
        </div>
      )
    },
    {
      title: "Transaction Complete",
      description: "Successful completion with full protection",
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h4 className="font-semibold text-green-900">Transaction Completed Successfully</h4>
            </div>
            <div className="space-y-2 text-sm text-green-800">
              <p>• Work delivered and approved by buyer</p>
              <p>• Funds released to seller automatically</p>
              <p>•Funds released to seller automatically</p>
              <p>• Trust scores updated for both parties</p>
              <p>• Transaction archived with full audit trail</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="bg-white p-3 rounded-lg border">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-xs text-gray-600">Fraud Attempts</div>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <div className="text-2xl font-bold text-green-600">100%</div>
              <div className="text-xs text-gray-600">Funds Protected</div>
            </div>
            <div className="bg-white p-3 rounded-lg border">
              <div className="text-2xl font-bold text-gray-900">24s</div>
              <div className="text-xs text-gray-600">Processing Time</div>
            </div>
          </div>
        </div>
      )
    }
  ];

  const nextStep = () => {
    if (currentStep < demoSteps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const restartDemo = () => {
    setCurrentStep(1);
  };

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Step {currentStep} of {demoSteps.length}
        </h3>
        <div className="flex space-x-2">
          {demoSteps.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index + 1 <= currentStep ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Current Step Content */}
      <div className="bg-gray-50 rounded-lg p-4 sm:p-6">
        <div className="mb-4">
          <h4 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
            {demoSteps[currentStep - 1].title}
          </h4>
          <p className="text-sm sm:text-base text-gray-600">
            {demoSteps[currentStep - 1].description}
          </p>
        </div>
        {demoSteps[currentStep - 1].content}
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <Button
          onClick={prevStep}
          disabled={currentStep === 1}
          variant="outline"
          className="flex items-center space-x-2 w-full sm:w-auto"
        >
          <ArrowRight className="h-4 w-4 rotate-180" />
          <span>Previous</span>
        </Button>

        <div className="flex space-x-2 w-full sm:w-auto">
          {currentStep === demoSteps.length ? (
            <Button
              onClick={restartDemo}
              className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto"
            >
              Restart Demo
            </Button>
          ) : (
            <Button
              onClick={nextStep}
              className="bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-2 w-full sm:w-auto"
            >
              <span>Next</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      {/* Try It Yourself */}
      <div className="border-t pt-6">
        <div className="text-center space-y-4">
          <h4 className="text-lg font-semibold text-gray-900">Ready to try TrustVerify?</h4>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button 
              onClick={() => window.location.href = '/auth'}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Start Free Trial
            </Button>
            <Button 
              onClick={() => window.open('mailto:sales@trustverify.com?subject=Sales Inquiry', '_blank')}
              variant="outline" 
              className="border-green-600 text-green-600 hover:bg-green-50"
            >
              Contact Sales
            </Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
}
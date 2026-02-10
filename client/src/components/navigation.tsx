import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Menu, 
  X,
  User,
  Settings,
  LogOut,
  Bell,
  LayoutDashboard,
  CreditCard,
  MessageSquare,
  Flag,
  Code,
  Lock,
  Activity,
  Users,
  BarChart3,
  Key,
  Home,
  Briefcase,
  DollarSign,
  GraduationCap,
  HelpCircle
} from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "./logo";

export function Navigation() {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();

  const isActive = (path: string) => location === path;

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const mainNavLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/complete-demo", label: "Fraud Demo", icon: Shield },
    { href: "/business", label: "Business", icon: Briefcase },
    { href: "/developers", label: "Developer Portal", icon: Code },
    { href: "/menu", label: "All Features", icon: Menu },
  ];

  return (
    <>
      <nav className="bg-[#0A3778] shadow-lg sticky top-0 z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Top Credentials Banner - Desktop Only */}
          <div className="hidden lg:flex items-center justify-center py-2.5 border-b border-white/10">
            <div className="flex items-center space-x-8 text-xs text-white/80">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-[#1DBF73] rounded-full animate-pulse"></div>
                <span className="font-semibold">TrustVerify Platform Suite</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Shield className="h-3.5 w-3.5" />
                <span>SOC 2 Certified</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Lock className="h-3.5 w-3.5" />
                <span>256-bit Encryption</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Activity className="h-3.5 w-3.5 text-[#1DBF73]" />
                <span>99.99% Uptime</span>
              </div>
            </div>
          </div>
          
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/">
                <div className="cursor-pointer">
                  <Logo size="xl" />
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              {mainNavLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div className={`px-5 py-2.5 rounded-lg text-base font-bold transition-all duration-200 ${
                    isActive(link.href)
                      ? 'bg-gradient-to-r from-[#1DBF73] to-[#17A362] text-white shadow-lg shadow-[#1DBF73]/30'
                      : 'text-white/90 hover:bg-[#1DBF73]/20 hover:text-white'
                  }`}>
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>

            {/* Desktop User Actions */}
            <div className="hidden lg:flex items-center space-x-3">
              {user ? (
                <>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="relative p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-lg"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-xs font-bold flex items-center justify-center bg-red-500 text-white">
                      3
                    </span>
                  </Button>

                  <Link href="/dashboard">
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-white/90 hover:text-white hover:bg-white/10"
                    >
                      <LayoutDashboard className="h-4 w-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>

                  <div className="flex items-center space-x-3 px-3 py-1.5 rounded-lg bg-white/10">
                    <div className="text-right">
                      <p className="text-sm font-semibold text-white">{user?.username}</p>
                      <p className="text-xs text-white/70">Score: {user?.trustScore}</p>
                    </div>
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-[#1DBF73]">
                      <User className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    size="sm"
                    className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg"
                    disabled={logoutMutation.isPending}
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/auth">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      className="text-white/90 hover:text-white hover:bg-white/10"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/auth">
                    <Button 
                      size="sm"
                      className="bg-[#1DBF73] text-white hover:bg-[#17A362] shadow-lg font-bold"
                    >
                      Get Started
                    </Button>
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center space-x-2">
              {user ? (
                <>
                  <Link href="/dashboard">
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-white/90 hover:text-white hover:bg-white/10"
                      data-testid="button-mobile-dashboard"
                    >
                      <LayoutDashboard className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/menu">
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-white/90 hover:text-white hover:bg-white/10"
                      data-testid="button-mobile-menu"
                    >
                      <Menu className="h-5 w-5 mr-1" />
                      Menu
                    </Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/auth">
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-white/90 hover:text-white hover:bg-white/10"
                      data-testid="button-mobile-signin"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/menu">
                    <Button 
                      variant="ghost"
                      size="sm"
                      className="text-white/90 hover:text-white hover:bg-white/10"
                      data-testid="button-mobile-menu"
                    >
                      <Menu className="h-5 w-5 mr-1" />
                      Menu
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navigation;

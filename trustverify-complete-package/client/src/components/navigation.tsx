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
  Search,
  LayoutDashboard,
  CreditCard,
  MessageSquare,
  Flag,
  Code
} from "lucide-react";
import { useState } from "react";
import { Logo } from "./logo";

export function Navigation() {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  const navItems = [
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
    { href: "/transactions", label: "Transactions", icon: CreditCard },
    { href: "/messages", label: "Messages", icon: MessageSquare },
    { href: "/scam-reports", label: "Scam Reports", icon: Flag },
    { href: "/developer-portal", label: "Developer", icon: Code },
  ];

  if (user?.isAdmin) {
    navItems.push({ href: "/admin-dashboard", label: "Admin", icon: Settings });
  }

  return (
    
<nav className="bg-gradient-to-br from-slate-900 via-blue-900 to-blue-800 backdrop-blur-md border-b sticky top-0 shadow-sm" style={{ borderColor: 'var(--border-light)', height: '80px', zIndex: 'var(--z-navigation)' }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-full">
          {/* Logo and brand */}
          <div className="flex items-center">
            <Link href="/">
              <div className="cursor-pointer flex items-center transition-all duration-200 hover:opacity-80">
                <Shield className="h-10 w-10 mr-4 text-blue-50" />
                <span className="text-2xl font-bold text-blue-50">TrustVerify</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${
                      isActive(item.href)
                        ? "text-white shadow-md"
                        : "hover:shadow-sm"
                    }`}
                    style={isActive(item.href) ? {
                      background: 'var(--gradient-primary)',
                      color: 'var(--text-inverse)'
                    } : {
                      color: '#cbd5e1'
                    }}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </div>
                </Link>
              );
            })}
          </div>

          {/* User Menu */}
          <div className="hidden lg:flex items-center space-x-6">
            <Button 
              variant="ghost" 
              className="relative p-3 rounded-xl transition-all duration-200 hover:shadow-md"
              style={{ color: '#cbd5e1' }}
            >
              <Bell className="h-5 w-5" />
              <span 
                className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-xs font-bold flex items-center justify-center"
                style={{ 
                  backgroundColor: 'var(--error)',
                  color: 'var(--text-inverse)'
                }}
              >
                3
              </span>
            </Button>

            <div className="flex items-center space-x-4 px-4 py-2 rounded-xl" style={{ backgroundColor: 'var(--primary-subtle)' }}>
              <div className="text-right">
                <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{user?.username}</p>
                <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>Trust Score: {user?.trustScore}</p>
              </div>
              <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ backgroundColor: 'var(--primary-light)' }}>
                <User className="h-6 w-6" style={{ color: 'var(--primary)' }} />
              </div>
            </div>

            <Button
              onClick={handleLogout}
              variant="ghost"
              className="p-3 rounded-xl transition-all duration-200 hover:shadow-md text-red-600 hover:text-red-700 hover:bg-red-50"
              disabled={logoutMutation.isPending}
            >
              <LogOut className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation - Professional Overlay */}
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-black/60 backdrop-blur-sm lg:hidden"
              style={{ zIndex: 'calc(var(--z-navigation) + 1)' }}
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Mobile Menu */}
            <div 
              className="lg:hidden fixed left-0 right-0 top-20 bg-white shadow-2xl" 
              style={{ 
                borderColor: 'var(--border-light)',
                zIndex: 'calc(var(--z-navigation) + 2)'
              }}
            >
              <div className="max-w-7xl mx-auto px-8 py-8">
                <div className="space-y-4">
                  {navItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link key={item.href} href={item.href}>
                        
<div
                          className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  location === "/dashboard" 
                    ? "bg-blue-100 text-blue-800 font-semibold" 
                    : "text-slate-600 hover:text-blue-700 hover:bg-slate-50"
                }`}
                        >
                          <Icon className="h-6 w-6" />
                          <span>{item.label}</span>
                        </div>
                      </Link>
                    );
                  })}

                  <div className="border-t pt-8 mt-8" style={{ borderColor: 'var(--border-light)' }}>
                    <div className="flex items-center space-x-5 px-6 py-5 rounded-2xl" style={{ backgroundColor: 'var(--primary-subtle)' }}>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ backgroundColor: 'var(--primary-light)' }}>
                        <User className="h-7 w-7" style={{ color: 'var(--primary)' }} />
                      </div>
                      <div>
                        <p className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{user?.username}</p>
                        <p className="text-base" style={{ color: 'var(--text-secondary)' }}>Trust Score: {user?.trustScore}</p>
                      </div>
                    </div>

                    <Button
                      onClick={() => {
                        handleLogout();
                        setIsMobileMenuOpen(false);
                      }}
                      variant="ghost"
                      className="w-full justify-start px-6 py-5 mt-4 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-2xl font-medium text-lg"
                      disabled={logoutMutation.isPending}
                    >
                      <LogOut className="h-6 w-6 mr-4" />
                      Sign Out
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}
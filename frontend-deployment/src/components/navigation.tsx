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
  Key,
  BarChart3
} from "lucide-react";
import { useState, useEffect } from "react";
import { Logo } from "./logo";

export function Navigation() {
  const { user, logoutMutation } = useAuth();
  const [location] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location === path;

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

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
    <nav className="bg-gradient-to-r from-[#0A3778] to-[#0D4594] shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="hidden lg:flex items-center justify-center py-2 border-b border-white/10">
          <div className="flex items-center space-x-8 text-xs text-white/80">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-[#1DBF73] rounded-full animate-pulse"></div>
              <span className="font-medium">TrustVerify Platform Suite</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="h-3 w-3" />
              <span>SOC 2 Certified</span>
            </div>
            <div className="flex items-center space-x-2">
              <Lock className="h-3 w-3" />
              <span>256-bit Encryption</span>
            </div>
            <div className="flex items-center space-x-2">
              <Activity className="h-3 w-3" />
              <span>99.99% Uptime</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-4">
            <Link href="/">
              <div className="group cursor-pointer">
                <Logo size="lg" />
              </div>
            </Link>
          </div>

          <div className="hidden lg:flex items-center space-x-6">
            <div className="flex items-center space-x-1">
              <Link href="/platform">
                <div className={`px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium ${isActive('/platform') ? 'bg-white/20 text-white' : ''}`}>
                  Platform
                </div>
              </Link>
              <Link href="/demo">
                <div className={`px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium ${isActive('/demo') ? 'bg-white/20 text-white' : ''}`}>
                  Demo
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-1">
              <Link href="/pricing">
                <div className={`px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium ${isActive('/pricing') ? 'bg-white/20 text-white' : ''}`}>
                  Consumer
                </div>
              </Link>
              <Link href="/business">
                <div className={`px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium ${isActive('/business') ? 'bg-white/20 text-white' : ''}`}>
                  Business
                </div>
              </Link>
              <Link href="/developers">
                <div className={`px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium ${isActive('/developers') ? 'bg-white/20 text-white' : ''}`}>
                  Developers
                </div>
              </Link>
            </div>

            <div className="flex items-center space-x-1">
              <Link href="/support-center">
                <div className={`px-3 py-2 rounded-lg text-white/90 hover:text-white hover:bg-white/10 transition-all duration-200 font-medium ${isActive('/support-center') ? 'bg-white/20 text-white' : ''}`}>
                  Support
                </div>
              </Link>
            </div>
          </div>

          <div className="hidden lg:flex items-center space-x-4">
            {user ? (
              <>
                <div className="flex items-center space-x-6">
                  <Button 
                    variant="ghost" 
                    className="relative p-3 rounded-xl transition-all duration-200 hover:shadow-md text-white/80 hover:text-white"
                  >
                    <Bell className="h-5 w-5" />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full text-xs font-bold flex items-center justify-center bg-red-500 text-white">
                      3
                    </span>
                  </Button>

                  <div className="flex items-center space-x-4 px-4 py-2 rounded-xl bg-white/10">
                    <div className="text-right">
                      <p className="text-base font-semibold text-white">{user?.username}</p>
                      <p className="text-sm text-white/80">Trust Score: {user?.trustScore}</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-white/20">
                      <User className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <Button
                    onClick={handleLogout}
                    variant="ghost"
                    className="p-3 rounded-xl transition-all duration-200 hover:shadow-md text-red-400 hover:text-red-300 hover:bg-red-500/20"
                    disabled={logoutMutation.isPending}
                  >
                    <LogOut className="h-5 w-5" />
                  </Button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link href="/auth">
                  <Button variant="ghost" className="text-white/90 hover:text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button className="bg-gradient-to-r from-[#1DBF73] to-[#17A362] text-white hover:from-[#17A362] hover:to-[#1DBF73]">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>

          <div className="lg:hidden flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white/80 hover:text-white p-3 touch-manipulation"
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <>
            <div 
              className="fixed inset-0 bg-black/60 lg:hidden z-[10001]"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            <div className="lg:hidden fixed left-0 right-0 top-[72px] bg-white shadow-2xl z-[10002] max-h-[calc(100vh-72px)] overflow-y-auto"
                 style={{ WebkitFontSmoothing: 'antialiased', backfaceVisibility: 'hidden' }}>
              <div className="px-5 py-6 safe-area-inset-bottom">
                <div className="bg-gradient-to-r from-[#E8F0FB] to-[#E6F9F1] rounded-xl p-4 mb-6 border border-[#1DBF73]/20"
                     style={{ WebkitFontSmoothing: 'antialiased', backfaceVisibility: 'hidden' }}>
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-[#1DBF73] rounded-full animate-pulse"></div>
                    <span className="text-sm font-bold text-[#0A3778]" style={{ WebkitFontSmoothing: 'antialiased' }}>TrustVerify Platform Suite</span>
                  </div>
                  <div className="flex items-center justify-center space-x-6 text-xs text-gray-700">
                    <div className="flex items-center space-x-1">
                      <Shield className="h-4 w-4 text-[#0A3778]" />
                      <span className="font-bold">SOC 2</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Lock className="h-4 w-4 text-[#0A3778]" />
                      <span className="font-bold">256-bit</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Activity className="h-4 w-4 text-[#1DBF73]" />
                      <span className="font-bold">99.99%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="space-y-2 mb-4">
                    <div className="px-2 py-1.5 text-xs font-bold text-[#0A3778] uppercase tracking-wider">
                      Core Platform
                    </div>
                    <Link href="/platform">
                      <div className="flex items-center px-4 py-3 rounded-xl bg-gray-50 hover:bg-[#E8F0FB] text-gray-900 font-semibold transition-all touch-manipulation border border-gray-200 hover:border-[#1DBF73]/30" onClick={() => setIsMobileMenuOpen(false)}>
                        <Shield className="h-5 w-5 mr-3 text-[#0A3778]" />
                        Platform
                      </div>
                    </Link>
                    <Link href="/demo">
                      <div className="flex items-center px-4 py-3 rounded-xl bg-gray-50 hover:bg-[#E8F0FB] text-gray-900 font-semibold transition-all touch-manipulation border border-gray-200 hover:border-[#1DBF73]/30" onClick={() => setIsMobileMenuOpen(false)}>
                        <Code className="h-5 w-5 mr-3 text-[#0A3778]" />
                        Demo
                      </div>
                    </Link>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="px-2 py-1.5 text-xs font-bold text-[#0A3778] uppercase tracking-wider">
                      Markets
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Link href="/pricing">
                        <div className="flex flex-col items-center px-4 py-4 rounded-xl bg-gradient-to-br from-[#E8F0FB] to-white hover:from-[#E8F0FB] hover:to-[#E6F9F1] text-gray-900 font-semibold transition-all touch-manipulation border border-gray-200 hover:border-[#1DBF73]/30" onClick={() => setIsMobileMenuOpen(false)}>
                          <User className="h-6 w-6 mb-2 text-[#0A3778]" />
                          <span className="text-sm">Consumer</span>
                        </div>
                      </Link>
                      <Link href="/business">
                        <div className="flex flex-col items-center px-4 py-4 rounded-xl bg-gradient-to-br from-[#E8F0FB] to-white hover:from-[#E8F0FB] hover:to-[#E6F9F1] text-gray-900 font-semibold transition-all touch-manipulation border border-gray-200 hover:border-[#1DBF73]/30" onClick={() => setIsMobileMenuOpen(false)}>
                          <CreditCard className="h-6 w-6 mb-2 text-[#0A3778]" />
                          <span className="text-sm">Business</span>
                        </div>
                      </Link>
                      <Link href="/developers">
                        <div className="flex flex-col items-center px-4 py-4 rounded-xl bg-gradient-to-br from-[#E8F0FB] to-white hover:from-[#E8F0FB] hover:to-[#E6F9F1] text-gray-900 font-semibold transition-all touch-manipulation border border-gray-200 hover:border-[#1DBF73]/30" onClick={() => setIsMobileMenuOpen(false)}>
                          <Code className="h-6 w-6 mb-2 text-[#0A3778]" />
                          <span className="text-sm">API</span>
                        </div>
                      </Link>
                      <Link href="/developer-portal">
                        <div className="flex flex-col items-center px-4 py-4 rounded-xl bg-gradient-to-br from-[#E8F0FB] to-white hover:from-[#E8F0FB] hover:to-[#E6F9F1] text-gray-900 font-semibold transition-all touch-manipulation border border-gray-200 hover:border-[#1DBF73]/30" onClick={() => setIsMobileMenuOpen(false)}>
                          <Key className="h-6 w-6 mb-2 text-[#0A3778]" />
                          <span className="text-sm">Portal</span>
                        </div>
                      </Link>
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="px-2 py-1.5 text-xs font-bold text-[#0A3778] uppercase tracking-wider">
                      Resources
                    </div>
                    <Link href="/support-center">
                      <div className="flex items-center px-4 py-3 rounded-xl bg-gradient-to-br from-[#E6F9F1] to-white hover:from-[#E6F9F1] hover:to-[#E8F0FB] text-gray-900 font-semibold transition-all touch-manipulation border border-gray-200 hover:border-[#0A3778]/30" onClick={() => setIsMobileMenuOpen(false)}>
                        <MessageSquare className="h-5 w-5 mr-3 text-[#1DBF73]" />
                        Support
                      </div>
                    </Link>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-200">
                  {user ? (
                    <div className="space-y-2">
                      <div className="px-4 py-4 bg-gradient-to-r from-[#E8F0FB] to-[#E6F9F1] rounded-xl border border-[#1DBF73]/20">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0A3778] to-[#1DBF73] flex items-center justify-center shadow-md">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <p className="font-bold text-gray-900">{user?.username}</p>
                            <p className="text-sm text-gray-600">Trust Score: <span className="font-semibold text-[#1DBF73]">{user?.trustScore}</span></p>
                          </div>
                        </div>
                      </div>
                      <Link href="/dashboard">
                        <div className="flex items-center px-4 py-3 rounded-xl bg-[#0A3778] hover:bg-[#0D4594] text-white font-semibold transition-all touch-manipulation shadow-md" onClick={() => setIsMobileMenuOpen(false)}>
                          <BarChart3 className="h-5 w-5 mr-3" />
                          Dashboard
                        </div>
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMobileMenuOpen(false);
                        }}
                        className="w-full flex items-center px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 border border-red-200 hover:border-red-300 font-semibold transition-all touch-manipulation"
                        disabled={logoutMutation.isPending}
                      >
                        <LogOut className="h-5 w-5 mr-3" />
                        Sign Out
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link href="/auth">
                        <div className="flex items-center justify-center px-4 py-3 rounded-xl bg-white border-2 border-[#0A3778] text-[#0A3778] hover:bg-[#0A3778] hover:text-white font-bold transition-all touch-manipulation" onClick={() => setIsMobileMenuOpen(false)}>
                          Sign In
                        </div>
                      </Link>
                      <Link href="/auth">
                        <div className="flex items-center justify-center px-4 py-3 rounded-xl bg-gradient-to-r from-[#0A3778] to-[#1DBF73] text-white hover:from-[#0D4594] hover:to-[#17A362] font-bold transition-all touch-manipulation shadow-lg" onClick={() => setIsMobileMenuOpen(false)}>
                          Get Started
                        </div>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}

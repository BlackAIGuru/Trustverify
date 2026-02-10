import React, { useState } from 'react';
import { Link, useLocation } from 'wouter';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/use-auth";
import { useLanguage, LanguageSelector } from "@/hooks/use-language";
import { 
  Menu,
  X,
  Shield,
  Home,
  BookOpen,
  Award,
  Users,
  LayoutDashboard,
  User,
  LogOut,
  Settings,
  HelpCircle,
  ChevronRight
} from "lucide-react";

export function MobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [location] = useLocation();
  const { user, logoutMutation } = useAuth();
  const { t } = useLanguage();

  const navigationItems = [
    {
      label: t('nav.home'),
      href: '/',
      icon: Home,
      description: 'Return to homepage'
    },
    {
      label: t('nav.academy'),
      href: '/fraud-academy',
      icon: BookOpen,
      description: 'Browse courses and training'
    },
    ...(user ? [
      {
        label: t('nav.dashboard'),
        href: '/lms/dashboard',
        icon: LayoutDashboard,
        description: 'View your learning progress'
      },
      {
        label: t('nav.certificates'),
        href: '/certificates',
        icon: Award,
        description: 'Manage your certificates'
      },
      {
        label: 'Community',
        href: '/community',
        icon: Users,
        description: 'Connect with learners'
      }
    ] : [])
  ];

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    // Prevent body scroll when menu is open
    document.body.style.overflow = isOpen ? 'auto' : 'hidden';
  };

  const closeMenu = () => {
    setIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const handleLogout = () => {
    logoutMutation.mutate();
    closeMenu();
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMenu}
          className="p-2"
          aria-label={isOpen ? t('a11y.closeMenu') : t('a11y.openMenu')}
        >
          {isOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </Button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            onClick={closeMenu}
          />
          
          {/* Menu Panel */}
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b bg-blue-600">
                <Link href="/" onClick={closeMenu}>
                  <div className="flex items-center space-x-3">
                    <Shield className="h-8 w-8 text-white" />
                    <div>
                      <h1 className="text-lg font-bold text-white">TrustVerify</h1>
                      <p className="text-xs text-blue-100">Academy</p>
                    </div>
                  </div>
                </Link>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={closeMenu}
                  className="text-white hover:bg-blue-700 p-2"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>

              {/* User Section */}
              {user && (
                <div className="p-4 bg-gray-50 border-b">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <User className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {user.username}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      Foundation
                    </Badge>
                  </div>
                </div>
              )}

              {/* Navigation Items */}
              <div className="flex-1 overflow-y-auto">
                <nav className="p-4 space-y-2">
                  {navigationItems.map((item) => {
                    const isActive = location === item.href || 
                      (item.href !== '/' && location.startsWith(item.href));
                    
                    return (
                      <Link key={item.href} href={item.href} onClick={closeMenu}>
                        <div className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                          isActive 
                            ? 'bg-blue-100 text-blue-700 border border-blue-200' 
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <item.icon className="h-5 w-5" />
                            <div>
                              <p className="font-medium">{item.label}</p>
                              <p className="text-xs text-gray-500">{item.description}</p>
                            </div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </Link>
                    );
                  })}
                </nav>

                {/* Quick Actions */}
                {user && (
                  <div className="p-4 border-t border-gray-200">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">Quick Actions</h3>
                    <div className="space-y-2">
                      <Link href="/course/foundation" onClick={closeMenu}>
                        <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                          <span className="text-sm text-gray-700">Continue Learning</span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </Link>
                      <Link href="/certificates" onClick={closeMenu}>
                        <div className="flex items-center justify-between p-2 rounded-md hover:bg-gray-100">
                          <span className="text-sm text-gray-700">View Certificates</span>
                          <ChevronRight className="h-4 w-4 text-gray-400" />
                        </div>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="border-t bg-gray-50 p-4 space-y-4">
                {/* Language Selector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <LanguageSelector />
                </div>

                {/* Help and Settings */}
                <div className="flex space-x-2">
                  <Link href="/help-center" onClick={closeMenu} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <HelpCircle className="h-4 w-4 mr-2" />
                      Help
                    </Button>
                  </Link>
                  <Link href="/settings" onClick={closeMenu} className="flex-1">
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <Settings className="h-4 w-4 mr-2" />
                      Settings
                    </Button>
                  </Link>
                </div>

                {/* Auth Actions */}
                {user ? (
                  <Button 
                    onClick={handleLogout}
                    variant="outline"
                    className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('nav.signout')}
                  </Button>
                ) : (
                  <Link href="/auth" onClick={closeMenu}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      {t('nav.signin')}
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Mobile-optimized course progress component
export function MobileCourseProgress({ 
  courseName, 
  progress, 
  nextLesson 
}: { 
  courseName: string; 
  progress: number; 
  nextLesson?: string; 
}) {
  const { t } = useLanguage();

  return (
    <div className="bg-white rounded-lg shadow-sm border p-4 mb-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-sm truncate">{courseName}</h3>
        <Badge variant="outline" className="text-xs">
          {progress}%
        </Badge>
      </div>
      
      <div className="space-y-3">
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {nextLesson && (
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-600">Next: {nextLesson}</span>
            <Button size="sm" className="text-xs px-3 py-1">
              {t('action.continue')}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Mobile-optimized stats grid
export function MobileStatsGrid({ stats }: { stats: Array<{ label: string; value: string; icon: React.ComponentType }> }) {
  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-lg shadow-sm border p-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
              <p className="text-lg font-bold text-gray-900">{stat.value}</p>
            </div>
            <stat.icon className="h-6 w-6 text-blue-600" />
          </div>
        </div>
      ))}
    </div>
  );
}
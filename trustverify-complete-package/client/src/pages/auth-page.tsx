import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Shield, Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle, Award, Globe } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const loginSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required"),
});

const registerSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(1, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

export default function AuthPage() {
  const { user, loginMutation, registerMutation } = useAuth();
  const [, setLocation] = useLocation();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { toast } = useToast();

  const loginForm = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const registerForm = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  // Redirect if already logged in
  useEffect(() => {
    if (user) {
      setLocation('/dashboard');
    }
  }, [user, setLocation]);

  const onLogin = async (data: LoginForm) => {
    try {
      await loginMutation.mutateAsync(data);
      setLocation('/dashboard');
    } catch (error: any) {
      toast({
        title: "Login Failed",
        description: error.message || "Please check your credentials",
        variant: "destructive",
      });
    }
  };

  const onRegister = async (data: RegisterForm) => {
    try {
      const { confirmPassword, ...registerData } = data;
      await registerMutation.mutateAsync(registerData);
      setLocation('/dashboard');
    } catch (error: any) {
      toast({
        title: "Registration Failed",
        description: error.message || "Please try again",
        variant: "destructive",
      });
    }
  };

  const benefits = [
    {
      title: "Enterprise Security",
      description: "Bank-grade encryption and SOC 2 compliance",
      icon: Shield,
    },
    {
      title: "Global Reach",
      description: "Fraud protection across 195+ countries",
      icon: Globe,
    },
    {
      title: "Trusted Platform",
      description: "Protecting $2.8B+ in transactions annually",
      icon: Award,
    }
  ];

  if (user) {
    return null;
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: 'var(--background)' }}>
      <div className="tv-container">
        <div className="tv-grid tv-grid-2 min-h-screen items-center" style={{ gap: 'var(--spacing-3xl)' }}>
          {/* Left Column - Authentication Form */}
          <div className="py-12">
            <div 
              className="tv-card max-w-md mx-auto"
              style={{ 
                padding: 'var(--spacing-xl)',
                boxShadow: 'var(--shadow-xl)'
              }}
            >
              <CardHeader className="text-center space-y-6 pb-8">
                <div className="flex justify-center">
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{ backgroundColor: 'var(--primary-light)' }}
                  >
                    <Shield className="h-8 w-8" style={{ color: 'var(--primary)' }} />
                  </div>
                </div>
                <div>
                  <CardTitle className="tv-heading-3" style={{ color: 'var(--text-primary)' }}>
                    {isLogin ? "Welcome Back" : "Create Account"}
                  </CardTitle>
                  <CardDescription className="tv-body mt-3" style={{ color: 'var(--text-secondary)' }}>
                    {isLogin 
                      ? "Sign in to your TrustVerify account"
                      : "Join the world's most trusted fraud prevention platform"
                    }
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-8">
                {/* Google OAuth Button */}
                <Button
                  type="button"
                  onClick={() => window.location.href = '/auth/google'}
                  className="w-full h-14 border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium rounded-xl transition-all duration-200 flex items-center justify-center gap-3 shadow-sm hover:shadow-md"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </Button>

                <div className="flex items-center gap-4 my-6">
                  <div className="flex-1 h-px bg-gray-300"></div>
                  <span className="text-gray-500 text-sm font-medium">OR</span>
                  <div className="flex-1 h-px bg-gray-300"></div>
                </div>

                {isLogin ? (
                  <form onSubmit={loginForm.handleSubmit(onLogin)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Username
                      </Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                        <Input
                          id="username"
                          {...loginForm.register("username")}
                          className="pl-12 h-14 text-base border-2 rounded-xl transition-all duration-200 focus:shadow-lg"
                          style={{
                            borderColor: loginForm.formState.errors.username ? '#EF4444' : 'var(--border)',
                            backgroundColor: 'var(--surface)'
                          }}
                          placeholder="Enter your username"
                        />
                      </div>
                      {loginForm.formState.errors.username && (
                        <p className="text-red-600 text-sm">{loginForm.formState.errors.username.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          {...loginForm.register("password")}
                          className="pl-12 pr-12 h-14 text-base border-2 rounded-xl transition-all duration-200 focus:shadow-lg"
                          style={{
                            borderColor: loginForm.formState.errors.password ? '#EF4444' : 'var(--border)',
                            backgroundColor: 'var(--surface)'
                          }}
                          placeholder="Enter your password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                          ) : (
                            <Eye className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                          )}
                        </Button>
                      </div>
                      {loginForm.formState.errors.password && (
                        <p className="text-red-600 text-sm">{loginForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={loginMutation.isPending}
                      className="w-full h-16 text-lg font-bold rounded-xl bg-gradient-to-r from-blue-900 via-slate-900 to-blue-800 hover:from-blue-800 hover:via-slate-800 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loginMutation.isPending ? "Signing In..." : "Sign In"}
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </form>
                ) : (
                  <form onSubmit={registerForm.handleSubmit(onRegister)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="reg-username" className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Username
                      </Label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                        <Input
                          id="reg-username"
                          {...registerForm.register("username")}
                          className="pl-12 h-14 text-base border-2 rounded-xl transition-all duration-200 focus:shadow-lg"
                          style={{
                            borderColor: registerForm.formState.errors.username ? '#EF4444' : 'var(--border)',
                            backgroundColor: 'var(--surface)'
                          }}
                          placeholder="Choose a username"
                        />
                      </div>
                      {registerForm.formState.errors.username && (
                        <p className="text-red-600 text-sm">{registerForm.formState.errors.username.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-email" className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Email
                      </Label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                        <Input
                          id="reg-email"
                          type="email"
                          {...registerForm.register("email")}
                          className="pl-12 h-14 text-base border-2 rounded-xl transition-all duration-200 focus:shadow-lg"
                          style={{
                            borderColor: registerForm.formState.errors.email ? '#EF4444' : 'var(--border)',
                            backgroundColor: 'var(--surface)'
                          }}
                          placeholder="Enter your email"
                        />
                      </div>
                      {registerForm.formState.errors.email && (
                        <p className="text-red-600 text-sm">{registerForm.formState.errors.email.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="reg-password" className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                        <Input
                          id="reg-password"
                          type={showPassword ? "text" : "password"}
                          {...registerForm.register("password")}
                          className="pl-12 pr-12 h-14 text-base border-2 rounded-xl transition-all duration-200 focus:shadow-lg"
                          style={{
                            borderColor: registerForm.formState.errors.password ? '#EF4444' : 'var(--border)',
                            backgroundColor: 'var(--surface)'
                          }}
                          placeholder="Create a password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                          ) : (
                            <Eye className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                          )}
                        </Button>
                      </div>
                      {registerForm.formState.errors.password && (
                        <p className="text-red-600 text-sm">{registerForm.formState.errors.password.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="confirm-password" className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Confirm Password
                      </Label>
                      <div className="relative">
                        <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                        <Input
                          id="confirm-password"
                          type={showConfirmPassword ? "text" : "password"}
                          {...registerForm.register("confirmPassword")}
                          className="pl-12 pr-12 h-14 text-base border-2 rounded-xl transition-all duration-200 focus:shadow-lg"
                          style={{
                            borderColor: registerForm.formState.errors.confirmPassword ? '#EF4444' : 'var(--border)',
                            backgroundColor: 'var(--surface)'
                          }}
                          placeholder="Confirm your password"
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2"
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                          ) : (
                            <Eye className="h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                          )}
                        </Button>
                      </div>
                      {registerForm.formState.errors.confirmPassword && (
                        <p className="text-red-600 text-sm">{registerForm.formState.errors.confirmPassword.message}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={registerMutation.isPending}
                      className="w-full h-16 text-lg font-bold rounded-xl bg-gradient-to-r from-blue-900 via-slate-900 to-blue-800 hover:from-blue-800 hover:via-slate-800 hover:to-blue-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {registerMutation.isPending ? "Creating Account..." : "Create Account"}
                      <ArrowRight className="h-5 w-5 ml-2" />
                    </Button>
                  </form>
                )}

                <div className="text-center pt-4">
                  <p className="tv-body-small" style={{ color: 'var(--text-muted)' }}>
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                  </p>
                  <Button
                    variant="ghost"
                    onClick={() => setIsLogin(!isLogin)}
                    className="text-base font-semibold mt-2 p-2 rounded-xl transition-colors duration-200"
                    style={{ color: 'var(--primary)' }}
                  >
                    {isLogin ? "Create Account" : "Sign In"}
                  </Button>
                </div>
              </CardContent>
            </div>
          </div>

          {/* Right Column - Hero Content */}
          <div className="hidden lg:block py-12">
            <div className="space-y-12">
              <div className="text-center space-y-6">
                <h2 className="tv-heading-2" style={{ color: 'var(--text-primary)' }}>
                  Join the World's Most
                  <span 
                    className="block bg-gradient-to-r bg-clip-text text-transparent mt-2"
                    style={{ backgroundImage: 'var(--gradient-hero)' }}
                  >
                    Trusted Platform
                  </span>
                </h2>
                <p className="tv-body-large max-w-lg mx-auto">
                  Protecting businesses worldwide with enterprise-grade fraud prevention and secure transaction processing.
                </p>
              </div>

              <div className="space-y-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div 
                      key={index}
                      className="flex items-start space-x-6 p-6 rounded-2xl transition-all duration-200 hover:shadow-lg"
                      style={{ backgroundColor: 'var(--surface)' }}
                    >
                      <div 
                        className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: 'var(--primary-light)' }}
                      >
                        <Icon className="h-8 w-8" style={{ color: 'var(--primary)' }} />
                      </div>
                      <div className="space-y-2">
                        <h3 className="tv-heading-5" style={{ color: 'var(--text-primary)' }}>
                          {benefit.title}
                        </h3>
                        <p className="tv-body" style={{ color: 'var(--text-secondary)' }}>
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div 
                className="text-center p-8 rounded-2xl"
                style={{ backgroundColor: 'var(--accent-subtle)' }}
              >
                <div className="flex justify-center items-center space-x-2 mb-4">
                  <CheckCircle className="h-6 w-6" style={{ color: 'var(--success)' }} />
                  <span className="tv-heading-5" style={{ color: 'var(--success)' }}>
                    Trusted by 500+ Enterprise Clients
                  </span>
                </div>
                <p className="tv-body" style={{ color: 'var(--text-secondary)' }}>
                  Join companies like PayFlow, SecureBank, and TechCorp in building a fraud-free future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
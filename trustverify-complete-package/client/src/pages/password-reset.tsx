import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Logo } from "@/components/logo";
import { Shield, Mail, Lock, CheckCircle, AlertTriangle, ArrowLeft } from "lucide-react";
import { apiRequest } from "@/lib/queryClient";
import { useMutation } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";

const emailSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

const resetSchema = z.object({
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type EmailForm = z.infer<typeof emailSchema>;
type ResetForm = z.infer<typeof resetSchema>;

export default function PasswordResetPage() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [step, setStep] = useState<"email" | "reset">("email");
  const [resetToken, setResetToken] = useState("");

  // Check for token in URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    if (token) {
      setResetToken(token);
      setStep("reset");
    }
  }, []);

  const emailForm = useForm<EmailForm>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const resetForm = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const requestResetMutation = useMutation({
    mutationFn: async (data: EmailForm) => {
      const response = await apiRequest("POST", "/api/reset-password", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Reset email sent",
        description: "Check your email for the reset link",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Request failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const confirmResetMutation = useMutation({
    mutationFn: async (data: ResetForm) => {
      const response = await apiRequest("POST", "/api/reset-password/confirm", {
        token: resetToken,
        newPassword: data.newPassword,
      });
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Password reset successful",
        description: "Your password has been updated. You can now sign in.",
      });
      setLocation("/auth");
    },
    onError: (error: Error) => {
      toast({
        title: "Reset failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const onEmailSubmit = (data: EmailForm) => {
    requestResetMutation.mutate(data);
  };

  const onResetSubmit = (data: ResetForm) => {
    confirmResetMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Logo size="lg" className="justify-center mb-6" />
          <Button
            variant="ghost"
            onClick={() => setLocation("/auth")}
            className="mb-4 text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Sign In
          </Button>
        </div>

        <Card className="border border-slate-200 shadow-lg bg-white">
          <CardHeader className="text-center pb-4 pt-6">
            <div className="flex items-center justify-center space-x-2 mb-3">
              <Shield className="h-5 w-5 text-blue-600" />
              <span className="text-sm font-semibold text-slate-700">Secure Password Reset</span>
            </div>
            <CardTitle className="text-xl text-slate-900 font-bold">
              {step === "email" ? "Reset Your Password" : "Create New Password"}
            </CardTitle>
            <CardDescription className="text-slate-600 text-sm mt-1">
              {step === "email" 
                ? "Enter your email address to receive a reset link"
                : "Enter your new password below"
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="px-6 pb-6">
            {step === "email" ? (
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-semibold text-slate-800 block">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-lg text-base text-blue-600 placeholder:text-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    {...emailForm.register("email")}
                  />
                  {emailForm.formState.errors.email && (
                    <p className="text-sm text-red-600 flex items-center space-x-1 mt-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{emailForm.formState.errors.email.message}</span>
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-bold"
                  style={{ backgroundColor: '#1e60f3', color: '#ffffff' }}
                  disabled={requestResetMutation.isPending}
                >
                  {requestResetMutation.isPending ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Sending Reset Link...</span>
                    </div>
                  ) : (
                    "Send Reset Link"
                  )}
                </Button>

                <div className="text-center text-xs text-slate-500 mt-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Mail className="h-3 w-3" />
                    <span>We'll send you a secure reset link</span>
                  </div>
                </div>
              </form>
            ) : (
              <form onSubmit={resetForm.handleSubmit(onResetSubmit)} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="new-password" className="text-sm font-semibold text-slate-800 block">
                    New Password
                  </Label>
                  <Input
                    id="new-password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-lg text-base text-blue-600 placeholder:text-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    {...resetForm.register("newPassword")}
                  />
                  {resetForm.formState.errors.newPassword && (
                    <p className="text-sm text-red-600 flex items-center space-x-1 mt-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{resetForm.formState.errors.newPassword.message}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="text-sm font-semibold text-slate-800 block">
                    Confirm New Password
                  </Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    placeholder="••••••••"
                    className="w-full h-12 px-4 bg-white border border-slate-300 rounded-lg text-base text-blue-600 placeholder:text-blue-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all"
                    {...resetForm.register("confirmPassword")}
                  />
                  {resetForm.formState.errors.confirmPassword && (
                    <p className="text-sm text-red-600 flex items-center space-x-1 mt-1">
                      <AlertTriangle className="h-4 w-4" />
                      <span>{resetForm.formState.errors.confirmPassword.message}</span>
                    </p>
                  )}
                </div>

                <Button
                  type="submit"
                  className="w-full h-14 text-lg font-bold"
                  style={{ backgroundColor: '#1e60f3', color: '#ffffff' }}
                  disabled={confirmResetMutation.isPending}
                >
                  {confirmResetMutation.isPending ? (
                    <div className="flex items-center justify-center space-x-2">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                      <span>Updating Password...</span>
                    </div>
                  ) : (
                    "Update Password"
                  )}
                </Button>

                <div className="text-center text-xs text-slate-500 mt-4">
                  <div className="flex items-center justify-center space-x-1">
                    <Lock className="h-3 w-3" />
                    <span>Your new password will be encrypted and secure</span>
                  </div>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
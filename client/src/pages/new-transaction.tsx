import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useLocation } from "wouter";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { 
  Shield, 
  PoundSterling, 
  FileText, 
  Clock, 
  Users, 
  AlertCircle,
  CheckCircle,
  ArrowLeft,
  Eye,
  Lock,
  CreditCard,
  Upload,
  X,
  File
} from "lucide-react";

const transactionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters").max(100, "Title must be less than 100 characters"),
  description: z.string().min(20, "Description must be at least 20 characters").max(1000, "Description must be less than 1000 characters"),
  amount: z.string().min(1, "Amount is required").refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num > 0;
  }, "Amount must be a valid positive number"),
  category: z.string().min(1, "Please select a category"),
  buyerEmail: z.string().email("Please enter a valid buyer email address"),
  deliveryTimeframe: z.string().min(1, "Please select a delivery timeframe"),
});

type TransactionForm = z.infer<typeof transactionSchema>;

const categories = [
  { value: "digital_services", label: "Digital Services" },
  { value: "physical_goods", label: "Physical Goods" },
  { value: "software", label: "Software & Licenses" },
  { value: "consulting", label: "Consulting & Advisory" },
  { value: "creative", label: "Creative & Design" },
  { value: "marketing", label: "Marketing & Advertising" },
  { value: "other", label: "Other" }
];

const timeframes = [
  { value: "1_day", label: "1 Day" },
  { value: "3_days", label: "3 Days" },
  { value: "1_week", label: "1 Week" },
  { value: "2_weeks", label: "2 Weeks" },
  { value: "1_month", label: "1 Month" },
  { value: "custom", label: "Custom Timeframe" }
];

export default function NewTransaction() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [step, setStep] = useState(1); // 1: Details, 2: KYC, 3: Review & Terms
  const [kycFiles, setKycFiles] = useState<{
    idFront: File | null;
    idBack: File | null;
    selfie: File | null;
  }>({
    idFront: null,
    idBack: null,
    selfie: null,
  });
  const [termsAccepted, setTermsAccepted] = useState(false);

  const form = useForm<TransactionForm>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      category: "",
      buyerEmail: "",
      deliveryTimeframe: "",
    },
  });

  const createTransactionMutation = useMutation({
    mutationFn: async (data: TransactionForm) => {
      const response = await apiRequest("POST", "/api/transactions", {
        title: data.title,
        description: data.description,
        amount: data.amount,
        sellerId: user?.id,
      });
      return response.json();
    },
    onSuccess: (transaction) => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions"] });
      toast({
        title: "Transaction Created",
        description: "Your secure transaction has been created successfully.",
      });
      // Redirect to transaction detail page for review and launch
      setLocation(`/transactions/${transaction.id}`);
    },
    onError: (error: any) => {
      toast({
        title: "Creation Failed",
        description: error.message || "Failed to create transaction. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (type: 'idFront' | 'idBack' | 'selfie') => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setKycFiles(prev => ({ ...prev, [type]: file }));
      toast({
        title: "File Selected",
        description: `${file.name} selected successfully`,
      });
    }
  };

  const removeFile = (type: 'idFront' | 'idBack' | 'selfie') => {
    setKycFiles(prev => ({ ...prev, [type]: null }));
  };

  const onSubmit = async (data: TransactionForm) => {
    await createTransactionMutation.mutateAsync(data);
  };

  const handleCreateTransaction = async () => {
    const formData = form.getValues();
    await createTransactionMutation.mutateAsync(formData);
  };

  const calculateFees = (amount: string) => {
    const num = parseFloat(amount) || 0;
    const trustVerifyFee = num * 0.025; // 2.5%
    const paymentFee = num * 0.029 + 0.30; // 2.9% + $0.30
    const totalFees = trustVerifyFee + paymentFee;
    const totalAmount = num + totalFees;

    return {
      subtotal: num,
      trustVerifyFee,
      paymentFee,
      totalFees,
      totalAmount,
    };
  };

  const fees = calculateFees(form.watch("amount"));

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* Transaction Creation Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="createTransactionPattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <rect x="30" y="30" width="20" height="20" fill="#1E3A8A" opacity="0.2"/>
              <circle cx="40" cy="40" r="25" fill="none" stroke="#1E3A8A" strokeWidth="0.5"/>
              <path d="M40,20 L50,30 L50,50 C50,55 40,60 40,60 C40,60 30,55 30,50 L30,30 Z" fill="#1E3A8A" opacity="0.15"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#createTransactionPattern)"/>
        </svg>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
              <Shield className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Create Secure Transaction</h1>
          <p className="text-slate-600 text-lg font-medium">Protected escrow transaction with advanced fraud detection</p>
        </div>
        
      <Navigation />

      <div className="tv-page-wrapper">
        <div className="tv-container">
          <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
              <Button
                onClick={() => setLocation('/dashboard')}
                variant="ghost"
                className="mb-4 p-2"
                style={{ color: 'var(--text-secondary)' }}
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>

              <h1 className="tv-heading-2" style={{ color: 'var(--text-primary)' }}>
                Create New Transaction
              </h1>
              <p className="tv-body-large mt-2" style={{ color: 'var(--text-secondary)' }}>
                Set up a secure escrow transaction with built-in fraud protection
              </p>
            </div>

            {/* Progress Steps - 3 Step Flow */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {/* Step 1 */}
                <div className="flex items-center space-x-3">
                  <div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold ${
                      step >= 1 ? 'text-white' : 'text-gray-400'
                    }`}
                    style={{ 
                      backgroundColor: step >= 1 ? 'var(--primary)' : 'var(--border)'
                    }}
                  >
                    1
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Details</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Transaction info</span>
                  </div>
                </div>

                <div 
                  className="h-1 flex-1 mx-3 rounded"
                  style={{ backgroundColor: step >= 2 ? 'var(--primary)' : 'var(--border)' }}
                />

                {/* Step 2 */}
                <div className="flex items-center space-x-3">
                  <div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold ${
                      step >= 2 ? 'text-white' : 'text-gray-400'
                    }`}
                    style={{ 
                      backgroundColor: step >= 2 ? 'var(--primary)' : 'var(--border)'
                    }}
                  >
                    2
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>KYC</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Verification</span>
                  </div>
                </div>

                <div 
                  className="h-1 flex-1 mx-3 rounded"
                  style={{ backgroundColor: step >= 3 ? 'var(--primary)' : 'var(--border)' }}
                />

                {/* Step 3 */}
                <div className="flex items-center space-x-3">
                  <div 
                    className={`w-10 h-10 rounded-xl flex items-center justify-center font-semibold ${
                      step >= 3 ? 'text-white' : 'text-gray-400'
                    }`}
                    style={{ 
                      backgroundColor: step >= 3 ? 'var(--primary)' : 'var(--border)'
                    }}
                  >
                    3
                  </div>
                  <div className="flex flex-col">
                    <span className="font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>Review</span>
                    <span className="text-xs" style={{ color: 'var(--text-muted)' }}>Terms & Submit</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Main Form */}
              <div className="lg:col-span-2">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  {step === 1 && (
                    <Card className="tv-card">
                      <CardHeader>
                        <CardTitle className="tv-heading-4" style={{ color: 'var(--text-primary)' }}>
                          Transaction Information
                        </CardTitle>
                        <CardDescription className="tv-body" style={{ color: 'var(--text-secondary)' }}>
                          Provide details about what you're selling or the service you're offering
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-2">
                          <Label htmlFor="title" className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                            Transaction Title *
                          </Label>
                          <Input
                            id="title"
                            {...form.register("title")}
                            className="h-12 text-base border-2 rounded-xl"
                            style={{
                              borderColor: form.formState.errors.title ? 'var(--error)' : 'var(--border)',
                              backgroundColor: 'var(--surface)'
                            }}
                            placeholder="e.g., Website Development Project"
                            data-testid="input-title"
                          />
                          {form.formState.errors.title && (
                            <p className="text-sm" style={{ color: 'var(--error)' }}>
                              {form.formState.errors.title.message}
                            </p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="description" className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                            Description *
                          </Label>
                          <Textarea
                            id="description"
                            {...form.register("description")}
                            className="min-h-32 text-base border-2 rounded-xl resize-none"
                            style={{
                              borderColor: form.formState.errors.description ? 'var(--error)' : 'var(--border)',
                              backgroundColor: 'var(--surface)'
                            }}
                            placeholder="Provide detailed description of what you're offering, deliverables, requirements, etc."
                            data-testid="input-description"
                          />
                          {form.formState.errors.description && (
                            <p className="text-sm" style={{ color: 'var(--error)' }}>
                              {form.formState.errors.description.message}
                            </p>
                          )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <Label htmlFor="amount" className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                              Amount (GBP) *
                            </Label>
                            <div className="relative">
                              <PoundSterling className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5" style={{ color: 'var(--text-muted)' }} />
                              <Input
                                id="amount"
                                type="text"
                                {...form.register("amount")}
                                className="pl-12 h-12 text-base border-2 rounded-xl"
                                style={{
                                  borderColor: form.formState.errors.amount ? 'var(--error)' : 'var(--border)',
                                  backgroundColor: 'var(--surface)'
                                }}
                                placeholder="0.00"
                                data-testid="input-amount"
                              />
                            </div>
                            {form.formState.errors.amount && (
                              <p className="text-sm" style={{ color: 'var(--error)' }}>
                                {form.formState.errors.amount.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                              Category *
                            </Label>
                            <Select onValueChange={(value) => {
                              form.setValue("category", value, { shouldValidate: true });
                            }}>
                              <SelectTrigger 
                                className="h-12 text-base border-2 rounded-xl"
                                style={{
                                  borderColor: form.formState.errors.category ? 'var(--error)' : 'var(--border)',
                                  backgroundColor: 'var(--surface)'
                                }}
                                data-testid="select-category"
                              >
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                              <SelectContent>
                                {categories.map((category) => (
                                  <SelectItem key={category.value} value={category.value}>
                                    {category.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {form.formState.errors.category && (
                              <p className="text-sm" style={{ color: 'var(--error)' }}>
                                {form.formState.errors.category.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="space-y-6">
                          <div className="space-y-2">
                            <Label htmlFor="buyerEmail" className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                              Buyer Email *
                            </Label>
                            <Input
                              id="buyerEmail"
                              type="email"
                              {...form.register("buyerEmail")}
                              className="h-12 text-base border-2 rounded-xl w-full truncate"
                              style={{
                                borderColor: form.formState.errors.buyerEmail ? 'var(--error)' : 'var(--border)',
                                backgroundColor: 'var(--surface)'
                              }}
                              placeholder="buyer@example.com"
                              data-testid="input-buyer-email"
                            />
                            {form.formState.errors.buyerEmail && (
                              <p className="text-sm" style={{ color: 'var(--error)' }}>
                                {form.formState.errors.buyerEmail.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>
                              Delivery Timeframe *
                            </Label>
                            <Select onValueChange={(value) => {
                              form.setValue("deliveryTimeframe", value, { shouldValidate: true });
                            }}>
                              <SelectTrigger 
                                className="h-12 text-base border-2 rounded-xl"
                                style={{
                                  borderColor: form.formState.errors.deliveryTimeframe ? 'var(--error)' : 'var(--border)',
                                  backgroundColor: 'var(--surface)'
                                }}
                                data-testid="select-timeframe"
                              >
                                <SelectValue placeholder="Select timeframe" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeframes.map((timeframe) => (
                                  <SelectItem key={timeframe.value} value={timeframe.value}>
                                    {timeframe.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                            {form.formState.errors.deliveryTimeframe && (
                              <p className="text-sm" style={{ color: 'var(--error)' }}>
                                {form.formState.errors.deliveryTimeframe.message}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <Button
                            type="button"
                            onClick={() => setStep(2)}
                            className="tv-btn-large"
                            style={{
                              background: 'var(--gradient-primary)',
                              border: 'none',
                              color: 'var(--text-inverse)'
                            }}
                            disabled={
                              !form.watch("title") ||
                              !form.watch("description") ||
                              !form.watch("amount") ||
                              !form.watch("category") ||
                              !form.watch("buyerEmail") ||
                              !form.watch("deliveryTimeframe") ||
                              !!form.formState.errors.title ||
                              !!form.formState.errors.description ||
                              !!form.formState.errors.amount ||
                              !!form.formState.errors.category ||
                              !!form.formState.errors.buyerEmail ||
                              !!form.formState.errors.deliveryTimeframe
                            }
                            data-testid="button-continue-step1"
                          >
                            Continue to KYC
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 2: KYC Verification */}
                  {step === 2 && (
                    <Card className="tv-card">
                      <CardHeader>
                        <CardTitle className="tv-heading-4 flex items-center gap-2" style={{ color: 'var(--text-primary)' }}>
                          <Shield className="h-6 w-6" style={{ color: 'var(--error)' }} />
                          KYC Verification
                        </CardTitle>
                        <CardDescription className="tv-body" style={{ color: 'var(--text-secondary)' }}>
                          Upload your identity documents for verification. All 3 documents are required to proceed.
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* KYC Document Upload Section - MANDATORY */}
                        <div className="space-y-4 p-6 rounded-xl border-2" style={{ borderColor: 'var(--error)', backgroundColor: 'var(--error-subtle)' }}>
                          <div className="grid md:grid-cols-3 gap-4">
                            <div className="space-y-2">
                              <Label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                ID Front (Required) *
                              </Label>
                              {!kycFiles.idFront ? (
                                <div className="border-2 border-dashed rounded-xl p-4 text-center hover:bg-blue-50 transition-colors cursor-pointer" style={{ borderColor: 'var(--border)' }}>
                                  <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    className="hidden"
                                    id="kycIdFront"
                                    data-testid="upload-id-front"
                                    onChange={handleFileChange('idFront')}
                                  />
                                  <label htmlFor="kycIdFront" className="cursor-pointer">
                                    <Upload className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
                                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                      Upload ID Front
                                    </p>
                                  </label>
                                </div>
                              ) : (
                                <div className="border-2 rounded-xl p-3 bg-green-50" style={{ borderColor: 'var(--success)' }}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <File className="h-4 w-4" style={{ color: 'var(--success)' }} />
                                      <span className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                                        {kycFiles.idFront.name}
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeFile('idFront')}
                                      className="hover:bg-red-100 rounded p-1"
                                      data-testid="remove-id-front"
                                    >
                                      <X className="h-4 w-4 text-red-500" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                ID Back (Required) *
                              </Label>
                              {!kycFiles.idBack ? (
                                <div className="border-2 border-dashed rounded-xl p-4 text-center hover:bg-blue-50 transition-colors cursor-pointer" style={{ borderColor: 'var(--border)' }}>
                                  <input
                                    type="file"
                                    accept="image/*,.pdf"
                                    className="hidden"
                                    id="kycIdBack"
                                    data-testid="upload-id-back"
                                    onChange={handleFileChange('idBack')}
                                  />
                                  <label htmlFor="kycIdBack" className="cursor-pointer">
                                    <Upload className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
                                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                      Upload ID Back
                                    </p>
                                  </label>
                                </div>
                              ) : (
                                <div className="border-2 rounded-xl p-3 bg-green-50" style={{ borderColor: 'var(--success)' }}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <File className="h-4 w-4" style={{ color: 'var(--success)' }} />
                                      <span className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                                        {kycFiles.idBack.name}
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeFile('idBack')}
                                      className="hover:bg-red-100 rounded p-1"
                                      data-testid="remove-id-back"
                                    >
                                      <X className="h-4 w-4 text-red-500" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

                            <div className="space-y-2">
                              <Label className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                                Selfie (Required) *
                              </Label>
                              {!kycFiles.selfie ? (
                                <div className="border-2 border-dashed rounded-xl p-4 text-center hover:bg-blue-50 transition-colors cursor-pointer" style={{ borderColor: 'var(--border)' }}>
                                  <input
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    id="kycSelfie"
                                    data-testid="upload-selfie"
                                    onChange={handleFileChange('selfie')}
                                  />
                                  <label htmlFor="kycSelfie" className="cursor-pointer">
                                    <Upload className="h-8 w-8 mx-auto mb-2" style={{ color: 'var(--text-muted)' }} />
                                    <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                                      Upload Selfie
                                    </p>
                                  </label>
                                </div>
                              ) : (
                                <div className="border-2 rounded-xl p-3 bg-green-50" style={{ borderColor: 'var(--success)' }}>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                      <File className="h-4 w-4" style={{ color: 'var(--success)' }} />
                                      <span className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>
                                        {kycFiles.selfie.name}
                                      </span>
                                    </div>
                                    <button
                                      type="button"
                                      onClick={() => removeFile('selfie')}
                                      className="hover:bg-red-100 rounded p-1"
                                      data-testid="remove-selfie"
                                    >
                                      <X className="h-4 w-4 text-red-500" />
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>

                          {(!kycFiles.idFront || !kycFiles.idBack || !kycFiles.selfie) && (
                            <div className="flex items-start gap-2 p-3 rounded-lg" style={{ backgroundColor: 'var(--error-subtle)' }}>
                              <AlertCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--error)' }} />
                              <p className="text-xs font-medium" style={{ color: 'var(--error)' }}>
                                All 3 documents are required to continue. Please upload ID Front, ID Back, and Selfie to proceed.
                              </p>
                            </div>
                          )}

                          <div className="flex items-start gap-2 p-3 rounded-lg" style={{ backgroundColor: 'var(--info-subtle)' }}>
                            <CheckCircle className="h-4 w-4 mt-0.5 flex-shrink-0" style={{ color: 'var(--info)' }} />
                            <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                              All KYC documents are securely encrypted and stored. This verification is required to ensure transaction security.
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button
                            type="button"
                            onClick={() => setStep(1)}
                            variant="outline"
                            className="tv-btn-large border-2"
                            style={{
                              borderColor: 'var(--border)',
                              color: 'var(--text-secondary)'
                            }}
                            data-testid="button-back-step2"
                          >
                            Back
                          </Button>

                          <Button
                            type="button"
                            onClick={() => setStep(3)}
                            className="tv-btn-large"
                            style={{
                              background: 'var(--gradient-primary)',
                              border: 'none',
                              color: 'var(--text-inverse)'
                            }}
                            disabled={!kycFiles.idFront || !kycFiles.idBack || !kycFiles.selfie}
                            data-testid="button-continue-step2"
                          >
                            Continue to Review
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Step 3: Terms & Review */}
                  {step === 3 && (
                    <Card className="tv-card">
                      <CardHeader>
                        <CardTitle className="tv-heading-4" style={{ color: 'var(--text-primary)' }}>
                          Review & Terms
                        </CardTitle>
                        <CardDescription className="tv-body" style={{ color: 'var(--text-secondary)' }}>
                          Review your transaction details and accept the terms to complete
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {/* Transaction Summary */}
                        <div className="space-y-4 p-6 rounded-xl border-2" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                          <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>Transaction Summary</h3>
                          <div className="space-y-3">
                            <div className="flex justify-between">
                              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Title:</span>
                              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{form.watch("title")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Amount:</span>
                              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>£{form.watch("amount")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Buyer:</span>
                              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>{form.watch("buyerEmail")}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>KYC Status:</span>
                              <span className="text-sm font-medium flex items-center gap-1" style={{ color: 'var(--success)' }}>
                                <CheckCircle className="h-4 w-4" />
                                Verified ({kycFiles.idFront && kycFiles.idBack && kycFiles.selfie ? '3/3 documents' : 'Incomplete'})
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Terms Acceptance Checkbox */}
                        <div className="flex items-start gap-3 p-4 rounded-xl border-2" style={{ borderColor: termsAccepted ? 'var(--success)' : 'var(--border)', backgroundColor: 'var(--surface)' }}>
                          <Checkbox
                            id="accept-terms"
                            checked={termsAccepted}
                            onCheckedChange={(checked) => setTermsAccepted(checked as boolean)}
                            className="mt-1"
                            data-testid="checkbox-accept-terms"
                          />
                          <div className="flex-1">
                            <Label 
                              htmlFor="accept-terms" 
                              className="text-sm font-medium cursor-pointer" 
                              style={{ color: 'var(--text-primary)' }}
                            >
                              I accept the TrustVerify terms and conditions *
                            </Label>
                            <p className="text-xs mt-1" style={{ color: 'var(--text-secondary)' }}>
                              By checking this box, you agree to TrustVerify's terms and conditions and confirm that all transaction details and KYC documents are accurate.
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-between">
                          <Button
                            type="button"
                            onClick={() => setStep(2)}
                            variant="outline"
                            className="tv-btn-large border-2"
                            style={{
                              borderColor: 'var(--border)',
                              color: 'var(--text-secondary)'
                            }}
                            data-testid="button-back-step3"
                          >
                            Back
                          </Button>

                          <Button
                            type="button"
                            onClick={handleCreateTransaction}
                            disabled={createTransactionMutation.isPending || !termsAccepted}
                            className="tv-btn-large"
                            style={{
                              background: 'var(--gradient-success)',
                              border: 'none',
                              color: 'var(--text-inverse)'
                            }}
                            data-testid="button-create-transaction"
                          >
                            {createTransactionMutation.isPending ? "Creating..." : "Create Transaction"}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </form>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                {/* Cost Breakdown */}
                <Card className="tv-card">
                  <CardHeader>
                    <CardTitle className="tv-heading-5 flex items-center" style={{ color: 'var(--text-primary)' }}>
                      <CreditCard className="h-5 w-5 mr-2" />
                      Cost Breakdown
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--text-secondary)' }}>Subtotal</span>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          ${fees.subtotal.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--text-secondary)' }}>TrustVerify Fee (2.5%)</span>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          ${fees.trustVerifyFee.toFixed(2)}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--text-secondary)' }}>Payment Processing</span>
                        <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                          ${fees.paymentFee.toFixed(2)}
                        </span>
                      </div>
                      <div className="border-t pt-3" style={{ borderColor: 'var(--border)' }}>
                        <div className="flex justify-between">
                          <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>Total</span>
                          <span className="font-bold text-lg" style={{ color: 'var(--primary)' }}>
                            ${fees.totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Security Features */}
                <Card className="tv-card">
                  <CardHeader>
                    <CardTitle className="tv-heading-5 flex items-center" style={{ color: 'var(--text-primary)' }}>
                      <Shield className="h-5 w-5 mr-2" />
                      Security Features
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: 'var(--success-light)' }}
                        >
                          <CheckCircle className="h-4 w-4" style={{ color: 'var(--success)' }} />
                        </div>
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          Secure escrow protection
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: 'var(--success-light)' }}
                        >
                          <Lock className="h-4 w-4" style={{ color: 'var(--success)' }} />
                        </div>
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          End-to-end encryption
                        </span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-8 h-8 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: 'var(--success-light)' }}
                        >
                          <Eye className="h-4 w-4" style={{ color: 'var(--success)' }} />
                        </div>
                        <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                          Real-time fraud monitoring
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Help */}
                <Card 
                  className="tv-card border-2"
                  style={{ 
                    borderColor: 'var(--primary)',
                    backgroundColor: 'var(--primary-subtle)'
                  }}
                >
                  <CardContent className="pt-6">
                    <div className="text-center space-y-3">
                      <div 
                        className="w-12 h-12 mx-auto rounded-xl flex items-center justify-center"
                        style={{ backgroundColor: 'var(--primary-light)' }}
                      >
                        <AlertCircle className="h-6 w-6" style={{ color: 'var(--primary)' }} />
                      </div>
                      <h3 className="font-semibold" style={{ color: 'var(--text-primary)' }}>
                        Need Help?
                      </h3>
                      <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Our support team is available 24/7 to help you create secure transactions.
                      </p>
                      <Button 
                        variant="outline"
                        className="w-full border-2"
                        style={{
                          borderColor: 'var(--primary)',
                          color: 'var(--primary)'
                        }}
                        onClick={() => window.open('mailto:support@trustverify.com?subject=Need Help with Transaction Creation', '_blank')}
                      >
                        Contact Support
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}
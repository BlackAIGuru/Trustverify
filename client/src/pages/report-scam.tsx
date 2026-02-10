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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  AlertTriangle, 
  Upload, 
  Shield, 
  CheckCircle, 
  Clock, 
  Flag,
  FileText,
  Camera,
  MessageSquare,
  Search,
  Eye
} from "lucide-react";

const scamReportSchema = z.object({
  scamType: z.string().min(1, "Scam type is required"),
  scammerInfo: z.string().min(1, "Scammer information is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  amount: z.string().optional(),
  dateOccurred: z.string().min(1, "Date is required"),
  evidenceDescription: z.string().optional(),
});

type ScamReportForm = z.infer<typeof scamReportSchema>;

interface ScamReport {
  id: number;
  scamType: string;
  scammerInfo: string;
  description: string;
  amount?: string;
  status: string;
  dateReported: string;
  reportedBy: string;
}

export default function ReportScamPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [evidenceFiles, setEvidenceFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset
  } = useForm<ScamReportForm>({
    resolver: zodResolver(scamReportSchema),
  });

  // Sample scam reports data
  const scamReports: ScamReport[] = [
    {
      id: 1,
      scamType: "Payment Fraud",
      scammerInfo: "fake.seller@email.com",
      description: "Received payment but never delivered the promised digital goods. Communication stopped after payment.",
      amount: "$250.00",
      status: "verified",
      dateReported: "2024-01-15T10:00:00Z",
      reportedBy: "user123"
    },
    {
      id: 2,
      scamType: "Identity Theft",
      scammerInfo: "Phone: +1-555-0123",
      description: "Attempted to steal personal information by impersonating TrustVerify support staff.",
      status: "investigating",
      dateReported: "2024-01-14T14:30:00Z",
      reportedBy: "user456"
    },
    {
      id: 3,
      scamType: "Fake Verification",
      scammerInfo: "scammer.profile@domain.com",
      description: "Using fake verification documents and stolen identity to appear legitimate.",
      amount: "$1,500.00",
      status: "resolved",
      dateReported: "2024-01-12T09:15:00Z",
      reportedBy: "user789"
    }
  ];

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;
    
    const newFiles = Array.from(files).filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }
      return true;
    });

    setEvidenceFiles(prev => [...prev, ...newFiles]);
  };

  const removeFile = (index: number) => {
    setEvidenceFiles(prev => prev.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ScamReportForm) => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      reset();
      setEvidenceFiles([]);
      setStep(3); // Success step
    }, 2000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "text-[#00B386] bg-[#00B386]/10";
      case "investigating":
        return "text-[#1F4DD8] bg-[#1F4DD8]/10";
      case "resolved":
        return "text-gray-600 bg-gray-100";
      case "pending":
        return "text-amber-600 bg-amber-100";
      default:
        return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "verified":
        return <CheckCircle className="h-4 w-4" />;
      case "investigating":
        return <Clock className="h-4 w-4" />;
      case "resolved":
        return <CheckCircle className="h-4 w-4" />;
      case "pending":
        return <Clock className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const filteredReports = scamReports.filter(report =>
    report.scammerInfo.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    report.scamType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#F4F6FA]">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#2B2E3A] mb-2">
            Report Scam
          </h1>
          <p className="text-gray-600">
            Help protect the community by reporting fraudulent activities
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Report Form */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <Card className="trustverify-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#2B2E3A]">
                    <Flag className="h-6 w-6 mr-3 text-[#D72638]" />
                    Report Fraudulent Activity
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Provide detailed information about the scam or fraudulent behavior
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="scamType" className="text-[#2B2E3A]">Type of Scam</Label>
                      <Select onValueChange={(value) => setValue("scamType", value)}>
                        <SelectTrigger className="rounded-xl border-gray-200">
                          <SelectValue placeholder="Select scam type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="payment_fraud">Payment Fraud</SelectItem>
                          <SelectItem value="identity_theft">Identity Theft</SelectItem>
                          <SelectItem value="fake_verification">Fake Verification</SelectItem>
                          <SelectItem value="phishing">Phishing</SelectItem>
                          <SelectItem value="fake_goods">Fake Goods/Services</SelectItem>
                          <SelectItem value="advance_fee">Advance Fee Fraud</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      {errors.scamType && (
                        <p className="text-sm text-[#D72638]">{errors.scamType.message}</p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="scammerInfo" className="text-[#2B2E3A]">Scammer Information</Label>
                      <Input
                        id="scammerInfo"
                        placeholder="Email, phone, username, or any identifying information"
                        className="rounded-xl border-gray-200 focus:border-[#1F4DD8]"
                        {...register("scammerInfo")}
                      />
                      {errors.scammerInfo && (
                        <p className="text-sm text-[#D72638]">{errors.scammerInfo.message}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="amount" className="text-[#2B2E3A]">Amount Lost (Optional)</Label>
                        <Input
                          id="amount"
                          placeholder="$0.00"
                          className="rounded-xl border-gray-200 focus:border-[#1F4DD8]"
                          {...register("amount")}
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="dateOccurred" className="text-[#2B2E3A]">Date Occurred</Label>
                        <Input
                          id="dateOccurred"
                          type="date"
                          className="rounded-xl border-gray-200 focus:border-[#1F4DD8]"
                          {...register("dateOccurred")}
                        />
                        {errors.dateOccurred && (
                          <p className="text-sm text-[#D72638]">{errors.dateOccurred.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-[#2B2E3A]">Detailed Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide a detailed description of what happened, including timeline, communications, and any other relevant information"
                        rows={6}
                        className="rounded-xl border-gray-200 focus:border-[#1F4DD8]"
                        {...register("description")}
                      />
                      {errors.description && (
                        <p className="text-sm text-[#D72638]">{errors.description.message}</p>
                      )}
                    </div>

                    <div className="flex justify-end">
                      <Button 
                        type="button"
                        onClick={() => setStep(2)}
                        className="trustverify-button-primary"
                      >
                        Continue to Evidence
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}

            {step === 2 && (
              <Card className="trustverify-card border-0">
                <CardHeader>
                  <CardTitle className="flex items-center text-[#2B2E3A]">
                    <Camera className="h-6 w-6 mr-3 text-[#1F4DD8]" />
                    Upload Evidence
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Upload screenshots, emails, or other evidence to support your report
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert className="border-[#D72638]/20 bg-[#D72638]/5">
                    <AlertTriangle className="h-4 w-4 text-[#D72638]" />
                    <AlertDescription className="text-[#2B2E3A]">
                      Only upload evidence that you have the right to share. Remove any personal information from others before uploading.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <Label className="text-[#2B2E3A]">Evidence Files</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-[#1F4DD8] transition-colors">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-4">
                        Drag and drop files here, or click to browse
                      </p>
                      <input
                        type="file"
                        multiple
                        accept="image/*,.pdf,.doc,.docx,.txt"
                        className="hidden"
                        id="evidence-upload"
                        onChange={(e) => handleFileUpload(e.target.files)}
                      />
                      <label htmlFor="evidence-upload">
                        <Button type="button" className="trustverify-button-primary">
                          Upload Files
                        </Button>
                      </label>
                      <p className="text-xs text-gray-500 mt-2">
                        Supported: Images, PDF, DOC, TXT (max 10MB each)
                      </p>
                    </div>
                  </div>

                  {evidenceFiles.length > 0 && (
                    <div className="space-y-2">
                      <Label className="text-[#2B2E3A]">Uploaded Files</Label>
                      <div className="space-y-2">
                        {evidenceFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-xl bg-white">
                            <div className="flex items-center space-x-3">
                              <FileText className="h-4 w-4 text-[#1F4DD8]" />
                              <span className="text-sm text-[#2B2E3A]">{file.name}</span>
                              <span className="text-xs text-gray-500">
                                ({(file.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeFile(index)}
                              className="text-[#D72638] border-[#D72638] hover:bg-[#D72638] hover:text-white"
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="evidenceDescription" className="text-[#2B2E3A]">Evidence Description (Optional)</Label>
                    <Textarea
                      id="evidenceDescription"
                      placeholder="Describe what the uploaded files show or contain"
                      className="rounded-xl border-gray-200 focus:border-[#1F4DD8]"
                      {...register("evidenceDescription")}
                    />
                  </div>

                  <div className="flex justify-between">
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={() => setStep(1)}
                      className="border-gray-300"
                    >
                      Back
                    </Button>
                    <Button 
                      type="submit"
                      disabled={isSubmitting}
                      className="trustverify-button-primary"
                    >
                      {isSubmitting ? "Submitting..." : "Submit Report"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {step === 3 && (
              <Card className="trustverify-card border-0">
                <CardContent className="text-center py-12">
                  <CheckCircle className="h-16 w-16 text-[#00B386] mx-auto mb-4" />
                  <h2 className="text-2xl font-bold text-[#2B2E3A] mb-2">Report Submitted Successfully</h2>
                  <p className="text-gray-600 mb-6">
                    Thank you for helping protect our community. We'll investigate this report and take appropriate action.
                  </p>
                  <div className="space-y-3">
                    <Button 
                      onClick={() => {
                        setStep(1);
                        reset();
                        setEvidenceFiles([]);
                      }}
                      className="trustverify-button-primary mr-3"
                    >
                      Submit Another Report
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => window.location.href = '/dashboard'}
                    >
                      Return to Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right Column - Recent Reports */}
          <div>
            <Card className="trustverify-card border-0">
              <CardHeader>
                <CardTitle className="flex items-center text-[#2B2E3A]">
                  <Search className="h-5 w-5 mr-2 text-[#1F4DD8]" />
                  Community Reports
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Recent scam reports from the community
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search reports..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 rounded-xl border-gray-200"
                    />
                  </div>

                  <div className="space-y-3 max-h-96 overflow-y-auto">
                    {filteredReports.map((report) => (
                      <div key={report.id} className="p-4 border border-gray-200 rounded-xl bg-white">
                        <div className="flex items-start justify-between mb-2">
                          <Badge className={`text-xs ${getStatusColor(report.status)} border-0`}>
                            {getStatusIcon(report.status)}
                            <span className="ml-1">{report.status}</span>
                          </Badge>
                          <span className="text-xs text-gray-500">
                            {new Date(report.dateReported).toLocaleDateString()}
                          </span>
                        </div>
                        <h4 className="font-medium text-[#2B2E3A] mb-1">{report.scamType}</h4>
                        <p className="text-sm text-gray-600 mb-2 line-clamp-2">{report.description}</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-[#D72638] font-medium">
                            {report.scammerInfo}
                          </span>
                          {report.amount && (
                            <span className="text-xs font-medium text-[#2B2E3A]">{report.amount}</span>
                          )}
                        </div>
                        <Button size="sm" variant="outline" className="w-full mt-3">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Safety Tips */}
            <Card className="trustverify-card border-0 mt-6">
              <CardHeader>
                <CardTitle className="flex items-center text-[#2B2E3A]">
                  <Shield className="h-5 w-5 mr-2 text-[#00B386]" />
                  Safety Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-[#2B2E3A] mb-1">• Verify identities</p>
                  <p className="mb-2">Always check verification status before transacting</p>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-[#2B2E3A] mb-1">• Use escrow protection</p>
                  <p className="mb-2">Never send payments outside our secure system</p>
                </div>
                <div className="text-sm text-gray-600">
                  <p className="font-medium text-[#2B2E3A] mb-1">• Report suspicious behavior</p>
                  <p>Help keep our community safe by reporting scams</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  Upload, 
  FileText, 
  AlertCircle,
  Shield,
  Phone,
  Mail
} from "lucide-react";

interface KycStatus {
  status: string;
  submittedAt?: string;
  notes?: string;
}

interface KycVerificationProps {
  kycStatus: KycStatus | null;
}

export function KycVerification({ kycStatus }: KycVerificationProps) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    documentType: "",
    documentNumber: "",
  });

  const submitKycMutation = useMutation({
    mutationFn: async (data: { documentType: string; documentNumber: string }) => {
      const formData = new FormData();
      formData.append("documentType", data.documentType);
      formData.append("documentNumber", data.documentNumber);
      
      const response = await fetch("/api/kyc/submit", {
        method: "POST",
        body: formData,
        credentials: "include",
      });
      
      if (!response.ok) {
        const error = await response.text();
        throw new Error(error || "Failed to submit KYC");
      }
      
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/kyc/status"] });
      toast({
        title: "KYC Submitted",
        description: "Your identity verification has been submitted for review.",
      });
      setFormData({ documentType: "", documentNumber: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit KYC verification",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.documentType || !formData.documentNumber) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    submitKycMutation.mutate(formData);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case "rejected":
        return <XCircle className="h-5 w-5 text-red-600" />;
      case "pending":
        return <Clock className="h-5 w-5 text-yellow-600" />;
      default:
        return <AlertCircle className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (!kycStatus || kycStatus.status === "not_submitted") {
    return (
      <div className="space-y-6">
        <div className="text-center p-6 bg-blue-50 rounded-lg">
          <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
          <h3 className="font-semibold text-lg text-gray-900 mb-2">Identity Verification</h3>
          <p className="text-gray-600 mb-4">
            Complete KYC verification to increase your trust score and unlock all features.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="documentType">Document Type</Label>
            <Select 
              value={formData.documentType} 
              onValueChange={(value) => setFormData({ ...formData, documentType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="passport">Passport</SelectItem>
                <SelectItem value="license">Driver's License</SelectItem>
                <SelectItem value="id_card">National ID Card</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="documentNumber">Document Number</Label>
            <Input
              id="documentNumber"
              value={formData.documentNumber}
              onChange={(e) => setFormData({ ...formData, documentNumber: e.target.value })}
              placeholder="Enter document number"
              required
            />
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Document Upload Required</p>
                <p className="text-yellow-700 mt-1">
                  After submitting this form, you'll need to upload a clear photo of your document 
                  and take a selfie for verification.
                </p>
              </div>
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full" 
            disabled={submitKycMutation.isPending}
          >
            <FileText className="mr-2 h-4 w-4" />
            {submitKycMutation.isPending ? "Submitting..." : "Submit KYC Application"}
          </Button>
        </form>

        {/* Verification Checklist */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-900">Verification Requirements:</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
              <span className="text-gray-600">Government-issued photo ID</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
              <span className="text-gray-600">Clear, readable document image</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full border-2 border-gray-300"></div>
              <span className="text-gray-600">Facial verification selfie</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Status Overview */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {getStatusIcon(kycStatus.status)}
          <div>
            <h3 className="font-medium text-gray-900">Identity Verification</h3>
            <p className="text-sm text-gray-600">
              {kycStatus.submittedAt && `Submitted ${new Date(kycStatus.submittedAt).toLocaleDateString()}`}
            </p>
          </div>
        </div>
        <Badge className={getStatusColor(kycStatus.status)}>
          {kycStatus.status === "approved" ? "Verified" : 
           kycStatus.status === "pending" ? "Under Review" : 
           "Rejected"}
        </Badge>
      </div>

      {/* Status Details */}
      {kycStatus.status === "pending" && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <Clock className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-yellow-800">Verification in Progress</p>
              <p className="text-yellow-700 text-sm mt-1">
                Our team is reviewing your documents. This typically takes 1-2 business days.
              </p>
            </div>
          </div>
        </div>
      )}

      {kycStatus.status === "approved" && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-green-800">Identity Verified</p>
              <p className="text-green-700 text-sm mt-1">
                Your identity has been successfully verified. You now have full access to all platform features.
              </p>
            </div>
          </div>
        </div>
      )}

      {kycStatus.status === "rejected" && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <XCircle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-red-800">Verification Rejected</p>
              <p className="text-red-700 text-sm mt-1">
                {kycStatus.notes || "Your verification was rejected. Please contact support for more information."}
              </p>
              <Button variant="outline" size="sm" className="mt-3">
                Resubmit Documents
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Verification Steps */}
      <div className="space-y-3">
        <h4 className="font-medium text-gray-900">Verification Status:</h4>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <FileText className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Document Submitted</span>
            </div>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="h-5 w-5 text-green-600" />
              <span className="text-sm font-medium">Email Verified</span>
            </div>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </div>
          
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Phone className="h-5 w-5 text-yellow-600" />
              <span className="text-sm font-medium">Phone Verification</span>
            </div>
            {kycStatus.status === "approved" ? (
              <CheckCircle className="h-4 w-4 text-green-600" />
            ) : (
              <Button variant="outline" size="sm">
                Verify Now
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, File, X, Building2, AlertCircle, CheckCircle } from "lucide-react";

interface KybUploadProps {
  transactionId: number;
  onSuccess?: () => void;
}

export function KybUpload({ transactionId, onSuccess }: KybUploadProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [files, setFiles] = useState<{
    companyRegistration: File | null;
    boardOfDirectors: File | null;
    businessLicense: File | null;
    taxDocument: File | null;
    otherDocuments: File[];
  }>({
    companyRegistration: null,
    boardOfDirectors: null,
    businessLicense: null,
    taxDocument: null,
    otherDocuments: [],
  });
  const [formData, setFormData] = useState({
    businessName: "",
    registrationNumber: "",
    businessType: "",
    businessAddress: "",
    website: "",
    industry: "",
  });

  const kybSubmissionMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const formDataToSend = new FormData();
      formDataToSend.append("transactionId", transactionId.toString());
      formDataToSend.append("businessName", data.businessName);
      formDataToSend.append("registrationNumber", data.registrationNumber);
      formDataToSend.append("businessType", data.businessType);
      formDataToSend.append("businessAddress", data.businessAddress);
      formDataToSend.append("website", data.website || "");
      formDataToSend.append("industry", data.industry || "");

      if (files.companyRegistration) {
        formDataToSend.append("companyRegistration", files.companyRegistration);
      }
      if (files.boardOfDirectors) {
        formDataToSend.append("boardOfDirectors", files.boardOfDirectors);
      }
      if (files.businessLicense) {
        formDataToSend.append("businessLicense", files.businessLicense);
      }
      if (files.taxDocument) {
        formDataToSend.append("taxDocument", files.taxDocument);
      }
      files.otherDocuments.forEach((file, index) => {
        formDataToSend.append("otherDocument", file);
      });

      const response = await fetch("/api/kyb/submit", {
        method: "POST",
        body: formDataToSend,
        credentials: "include",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Failed to submit KYB");
      }

      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/transactions", transactionId.toString()] });
      queryClient.invalidateQueries({ queryKey: ["/api/kyb", transactionId.toString()] });
      toast({
        title: "KYB Submitted",
        description: "Your business verification has been submitted for review.",
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit KYB verification",
        variant: "destructive",
      });
    },
  });

  const handleFileChange = (field: keyof typeof files, index?: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "File size must be less than 10MB",
        variant: "destructive",
      });
      return;
    }

    if (field === "otherDocuments") {
      setFiles((prev) => ({
        ...prev,
        otherDocuments: [...prev.otherDocuments, file],
      }));
    } else {
      setFiles((prev) => ({
        ...prev,
        [field]: file,
      }));
    }
  };

  const removeFile = (field: keyof typeof files, index?: number) => {
    if (field === "otherDocuments" && index !== undefined) {
      setFiles((prev) => ({
        ...prev,
        otherDocuments: prev.otherDocuments.filter((_, i) => i !== index),
      }));
    } else {
      setFiles((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!files.companyRegistration) {
      toast({
        title: "Missing Document",
        description: "Company registration document is required",
        variant: "destructive",
      });
      return;
    }

    if (!formData.businessName || !formData.registrationNumber || !formData.businessType || !formData.businessAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    kybSubmissionMutation.mutate(formData);
  };

  return (
    <Card className="bg-white border border-gray-200 shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-semibold text-gray-900 flex items-center gap-2">
          <Building2 className="h-6 w-6 text-blue-600" />
          KYB Business Verification
        </CardTitle>
        <CardDescription>
          Upload your business documents for verification. Company registration is required.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Business Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="businessName">Business Name *</Label>
                <Input
                  id="businessName"
                  value={formData.businessName}
                  onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                  required
                  placeholder="Enter business name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="registrationNumber">Registration Number *</Label>
                <Input
                  id="registrationNumber"
                  value={formData.registrationNumber}
                  onChange={(e) => setFormData({ ...formData, registrationNumber: e.target.value })}
                  required
                  placeholder="Enter registration number"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="businessType">Business Type *</Label>
                <Input
                  id="businessType"
                  value={formData.businessType}
                  onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                  required
                  placeholder="e.g., LLC, Corporation, Partnership"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry">Industry</Label>
                <Input
                  id="industry"
                  value={formData.industry}
                  onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  placeholder="Enter industry"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="businessAddress">Business Address *</Label>
              <Input
                id="businessAddress"
                value={formData.businessAddress}
                onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                required
                placeholder="Enter full business address"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                type="url"
                value={formData.website}
                onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                placeholder="https://example.com"
              />
            </div>
          </div>

          {/* Document Uploads */}
          <div className="space-y-4">
            <h3 className="font-semibold text-gray-900">Business Documents</h3>
            
            {/* Company Registration - Required */}
            <div className="space-y-2">
              <Label>Company Registration Document *</Label>
              {!files.companyRegistration ? (
                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-blue-50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="companyRegistration"
                    onChange={handleFileChange("companyRegistration")}
                  />
                  <label htmlFor="companyRegistration" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Upload Company Registration</p>
                  </label>
                </div>
              ) : (
                <div className="border-2 rounded-lg p-3 bg-green-50 border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {files.companyRegistration.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile("companyRegistration")}
                      className="hover:bg-red-100 rounded p-1"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Board of Directors */}
            <div className="space-y-2">
              <Label>Board of Directors Document</Label>
              {!files.boardOfDirectors ? (
                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-blue-50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="boardOfDirectors"
                    onChange={handleFileChange("boardOfDirectors")}
                  />
                  <label htmlFor="boardOfDirectors" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Upload Board of Directors</p>
                  </label>
                </div>
              ) : (
                <div className="border-2 rounded-lg p-3 bg-green-50 border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {files.boardOfDirectors.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile("boardOfDirectors")}
                      className="hover:bg-red-100 rounded p-1"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Business License */}
            <div className="space-y-2">
              <Label>Business License</Label>
              {!files.businessLicense ? (
                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-blue-50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="businessLicense"
                    onChange={handleFileChange("businessLicense")}
                  />
                  <label htmlFor="businessLicense" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Upload Business License</p>
                  </label>
                </div>
              ) : (
                <div className="border-2 rounded-lg p-3 bg-green-50 border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {files.businessLicense.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile("businessLicense")}
                      className="hover:bg-red-100 rounded p-1"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Tax Document */}
            <div className="space-y-2">
              <Label>Tax Document</Label>
              {!files.taxDocument ? (
                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-blue-50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="taxDocument"
                    onChange={handleFileChange("taxDocument")}
                  />
                  <label htmlFor="taxDocument" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Upload Tax Document</p>
                  </label>
                </div>
              ) : (
                <div className="border-2 rounded-lg p-3 bg-green-50 border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {files.taxDocument.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile("taxDocument")}
                      className="hover:bg-red-100 rounded p-1"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Other Documents */}
            <div className="space-y-2">
              <Label>Other Documents (Optional, up to 5)</Label>
              {files.otherDocuments.map((file, index) => (
                <div key={index} className="border-2 rounded-lg p-3 bg-green-50 border-green-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <File className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-gray-900 truncate">
                        {file.name}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFile("otherDocuments", index)}
                      className="hover:bg-red-100 rounded p-1"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              ))}
              {files.otherDocuments.length < 5 && (
                <div className="border-2 border-dashed rounded-lg p-4 text-center hover:bg-blue-50 transition-colors cursor-pointer">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    id="otherDocument"
                    onChange={handleFileChange("otherDocuments")}
                  />
                  <label htmlFor="otherDocument" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Upload Additional Document</p>
                  </label>
                </div>
              )}
            </div>
          </div>

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div className="text-sm">
                <p className="font-medium text-yellow-800">Document Requirements</p>
                <p className="text-yellow-700 mt-1">
                  Company registration document is required. Other documents are optional but recommended for faster verification.
                </p>
              </div>
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            disabled={kybSubmissionMutation.isPending}
          >
            {kybSubmissionMutation.isPending ? "Submitting..." : "Submit KYB Verification"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

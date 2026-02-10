import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Camera,
  CreditCard,
  Shield,
  User,
  MapPin,
  ArrowRight,
  ArrowLeft,
  Image,
  UserCheck
} from "lucide-react";

const verificationSchema = z.object({
  documentType: z.string().min(1, "Document type is required"),
  documentNumber: z.string().min(1, "Document number is required"),
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  country: z.string().min(1, "Country is required"),
  postalCode: z.string().min(1, "Postal code is required"),
});

type VerificationForm = z.infer<typeof verificationSchema>;

export default function VerificationPage() {
  const { user } = useAuth();
  const [step, setStep] = useState(1);
  const [frontIdFile, setFrontIdFile] = useState<File | null>(null);
  const [backIdFile, setBackIdFile] = useState<File | null>(null);
  const [selfieFile, setSelfieFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<VerificationForm>({
    resolver: zodResolver(verificationSchema),
  });

  const documentType = watch("documentType");

  const handleFileUpload = (file: File, type: 'front' | 'back' | 'selfie') => {
    if (file.size > 10 * 1024 * 1024) {
      alert("File size must be less than 10MB");
      return;
    }

    if (!file.type.startsWith('image/')) {
      alert("Please upload an image file");
      return;
    }

    switch (type) {
      case 'front':
        setFrontIdFile(file);
        break;
      case 'back':
        setBackIdFile(file);
        break;
      case 'selfie':
        setSelfieFile(file);
        break;
    }
  };

  const onSubmit = async (data: VerificationForm) => {
    setUploading(true);
    try {
      // Simulate verification submission
      await new Promise(resolve => setTimeout(resolve, 3000));
      console.log("Verification submitted:", data);
      setStep(4); // Success step
    } catch (error) {
      console.error("Error submitting verification:", error);
    } finally {
      setUploading(false);
    }
  };

  const getVerificationLevelInfo = () => {
    const currentLevel = user?.verificationLevel || "none";

    const levels = {
      none: {
        color: "bg-gray-100 text-gray-800",
        label: "Not Verified",
        description: "Complete identity verification to unlock higher transaction limits and build trust.",
        limits: "Transaction limit: $500"
      },
      basic: {
        color: "bg-blue-100 text-blue-800",
        label: "Basic Verified",
        description: "Basic verification completed. Upgrade to full verification for maximum benefits.",
        limits: "Transaction limit: $5,000"
      },
      full: {
        color: "bg-green-100 text-green-800",
        label: "Fully Verified",
        description: "Full verification completed. Enjoy unlimited transactions and maximum trust.",
        limits: "Transaction limit: Unlimited"
      }
    };

    return levels[currentLevel as keyof typeof levels] || levels.none;
  };

  const verificationInfo = getVerificationLevelInfo();

  const steps = [
    { number: 1, title: "Personal Information", description: "Provide your basic details" },
    { number: 2, title: "Document Upload", description: "Upload your ID documents" },
    { number: 3, title: "Identity Verification", description: "Take a verification selfie" },
    { number: 4, title: "Review & Submit", description: "Confirm your information" }
  ];

  const FileUploadCard = ({ 
    title, 
    description, 
    file, 
    onFileChange, 
    icon: Icon 
  }: {
    title: string;
    description: string;
    file: File | null;
    onFileChange: (file: File) => void;
    icon: any;
  }) => (
    <Card className="border-2 border-dashed border-gray-300 hover:border-blue-400 transition-colors">
      <CardContent className="p-6">
        <div className="text-center">
          {file ? (
            <div className="space-y-3">
              <CheckCircle className="h-12 w-12 text-green-500 mx-auto" />
              <div>
                <p className="font-medium text-gray-900">{file.name}</p>
                <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const newFile = (e.target as HTMLInputElement).files?.[0];
                    if (newFile) onFileChange(newFile);
                  };
                  input.click();
                }}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                Replace File
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              <Icon className="h-12 w-12 text-gray-400 mx-auto" />
              <div>
                <h3 className="font-medium text-gray-900">{title}</h3>
                <p className="text-sm text-gray-600">{description}</p>
              </div>
              <Button
                variant="outline"
                onClick={() => {
                  const input = document.createElement('input');
                  input.type = 'file';
                  input.accept = 'image/*';
                  input.onchange = (e) => {
                    const file = (e.target as HTMLInputElement).files?.[0];
                    if (file) onFileChange(file);
                  };
                  input.click();
                }}
                className="border-blue-200 text-blue-600 hover:bg-blue-50"
              >
                <Upload className="h-4 w-4 mr-2" />
                Upload Image
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 relative">
      {/* Identity Verification Background */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="verificationPattern" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <rect x="20" y="20" width="20" height="20" fill="#1E3A8A" opacity="0.2"/>
              <circle cx="30" cy="30" r="15" fill="none" stroke="#1E3A8A" strokeWidth="0.5"/>
              <path d="M25,30 L28,33 L35,26" stroke="#1E3A8A" strokeWidth="1" fill="none"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#verificationPattern)"/>
        </svg>
      </div>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center shadow-lg">
              <UserCheck className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">Identity Verification</h1>
          <p className="text-slate-600 text-lg font-medium">Secure your account with advanced identity verification</p>
        </div>

        {/* Current Status */}
        <Card className="mb-8 bg-white border border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-full">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-gray-600">Current Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${verificationInfo.color}`}>
                      {verificationInfo.label}
                    </span>
                  </div>
                  <p className="text-gray-600">{verificationInfo.description}</p>
                  <p className="text-sm text-gray-500 mt-1">{verificationInfo.limits}</p>
                </div>
              </div>
              {user.verificationLevel !== "full" && (
                <Button 
                  onClick={() => setStep(1)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {user.verificationLevel === "none" ? "Start Verification" : "Upgrade Verification"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {(step > 0 && step < 5) && (
          <>
            {/* Progress Steps */}
            <Card className="mb-8 bg-white border border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  {steps.map((stepInfo, index) => (
                    <div key={stepInfo.number} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          step >= stepInfo.number 
                            ? "bg-blue-600 text-white" 
                            : "bg-gray-200 text-gray-600"
                        }`}>
                          {step > stepInfo.number ? (
                            <CheckCircle className="h-5 w-5" />
                          ) : (
                            stepInfo.number
                          )}
                        </div>
                        <div className="mt-2 text-center">
                          <p className="text-sm font-medium text-gray-900">{stepInfo.title}</p>
                          <p className="text-xs text-gray-500">{stepInfo.description}</p>
                        </div>
                      </div>
                      {index < steps.length - 1 && (
                        <div className={`flex-1 h-0.5 mx-4 ${
                          step > stepInfo.number ? "bg-blue-600" : "bg-gray-200"
                        }`} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Verification Form */}
            <Card className="bg-white border border-gray-200 shadow-sm">
              {step === 1 && (
                <>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Personal Information</CardTitle>
                    <CardDescription className="text-gray-600">
                      Please provide accurate information as it appears on your ID document
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <form className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                            First Name
                          </Label>
                          <Input
                            id="firstName"
                            placeholder="John"
                            className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...register("firstName")}
                          />
                          {errors.firstName && (
                            <p className="text-sm text-red-600">{errors.firstName.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                            Last Name
                          </Label>
                          <Input
                            id="lastName"
                            placeholder="Doe"
                            className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...register("lastName")}
                          />
                          {errors.lastName && (
                            <p className="text-sm text-red-600">{errors.lastName.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="dateOfBirth" className="text-sm font-medium text-gray-700">
                            Date of Birth
                          </Label>
                          <Input
                            id="dateOfBirth"
                            type="date"
                            className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...register("dateOfBirth")}
                          />
                          {errors.dateOfBirth && (
                            <p className="text-sm text-red-600">{errors.dateOfBirth.message}</p>
                          )}
                        </div>

                        <div className="space-y-2 relative">
                          <Label htmlFor="documentType" className="text-sm font-medium text-gray-700">
                            Document Type
                          </Label>
                          <Select onValueChange={(value) => setValue("documentType", value)}>
                            <SelectTrigger className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500">
                              <SelectValue placeholder="Select document type" />
                            </SelectTrigger>
                            <SelectContent 
                              position="popper"
                              side="bottom"
                              align="start"
                              sideOffset={8}
                              className="z-50"
                            >
                              <SelectItem value="passport">Passport</SelectItem>
                              <SelectItem value="drivers_license">Driver's License</SelectItem>
                              <SelectItem value="national_id">National ID Card</SelectItem>
                            </SelectContent>
                          </Select>
                          {errors.documentType && (
                            <p className="text-sm text-red-600">{errors.documentType.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="documentNumber" className="text-sm font-medium text-gray-700">
                          Document Number
                        </Label>
                        <Input
                          id="documentNumber"
                          placeholder="Enter your document number"
                          className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...register("documentNumber")}
                        />
                        {errors.documentNumber && (
                          <p className="text-sm text-red-600">{errors.documentNumber.message}</p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="address" className="text-sm font-medium text-gray-700">
                          Address
                        </Label>
                        <Input
                          id="address"
                          placeholder="123 Main Street"
                          className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                          {...register("address")}
                        />
                        {errors.address && (
                          <p className="text-sm text-red-600">{errors.address.message}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                            City
                          </Label>
                          <Input
                            id="city"
                            placeholder="New York"
                            className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...register("city")}
                          />
                          {errors.city && (
                            <p className="text-sm text-red-600">{errors.city.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country" className="text-sm font-medium text-gray-700">
                            Country
                          </Label>
                          <Input
                            id="country"
                            placeholder="United States"
                            className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...register("country")}
                          />
                          {errors.country && (
                            <p className="text-sm text-red-600">{errors.country.message}</p>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="postalCode" className="text-sm font-medium text-gray-700">
                            Postal Code
                          </Label>
                          <Input
                            id="postalCode"
                            placeholder="10001"
                            className="h-12 border-gray-300 focus:border-blue-500 focus:ring-blue-500"
                            {...register("postalCode")}
                          />
                          {errors.postalCode && (
                            <p className="text-sm text-red-600">{errors.postalCode.message}</p>
                          )}
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button 
                          onClick={() => setStep(2)}
                          className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                          Continue
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </>
              )}

              {step === 2 && (
                <>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Document Upload</CardTitle>
                    <CardDescription className="text-gray-600">
                      Upload clear photos of your {documentType || "identification document"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                      <FileUploadCard
                        title="Front of Document"
                        description="Clear photo of the front side"
                        file={frontIdFile}
                        onFileChange={(file) => handleFileUpload(file, 'front')}
                        icon={CreditCard}
                      />

                      {documentType !== "passport" && (
                        <FileUploadCard
                          title="Back of Document"
                          description="Clear photo of the back side"
                          file={backIdFile}
                          onFileChange={(file) => handleFileUpload(file, 'back')}
                          icon={CreditCard}
                        />
                      )}
                    </div>

                    <Alert className="mb-6">
                      <AlertTriangle className="h-4 w-4" />
                      <AlertDescription>
                        Ensure your documents are clearly visible, well-lit, and all corners are in frame. 
                        Blurry or cropped images may delay verification.
                      </AlertDescription>
                    </Alert>

                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setStep(1)}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                      <Button 
                        onClick={() => setStep(3)}
                        disabled={!frontIdFile || (documentType !== "passport" && !backIdFile)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        Continue
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}

              {step === 3 && (
                <>
                  <CardHeader>
                    <CardTitle className="text-xl text-gray-900">Identity Verification</CardTitle>
                    <CardDescription className="text-gray-600">
                      Take a selfie to verify your identity matches your documents
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="max-w-md mx-auto mb-6">
                      <FileUploadCard
                        title="Verification Selfie"
                        description="Clear photo of your face"
                        file={selfieFile}
                        onFileChange={(file) => handleFileUpload(file, 'selfie')}
                        icon={Camera}
                      />
                    </div>

                    <Alert className="mb-6">
                      <Shield className="h-4 w-4" />
                      <AlertDescription>
                        Look directly at the camera, ensure good lighting, and remove any sunglasses or hats. 
                        Your face should match the photo on your ID document.
                      </AlertDescription>
                    </Alert>

                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={() => setStep(2)}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back
                      </Button>
                      <Button 
                        onClick={handleSubmit(onSubmit)}
                        disabled={!selfieFile || uploading}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        {uploading ? "Submitting..." : "Submit Verification"}
                        <CheckCircle className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </>
              )}

              {step === 4 && (
                <CardContent className="p-12 text-center">
                  <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-6" />
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Verification Submitted</h2>
                  <p className="text-gray-600 mb-6">
                    Your identity verification has been submitted successfully. Our team will review your 
                    documents within 24-48 hours and notify you of the result.
                  </p>
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                    <h3 className="font-medium text-blue-900 mb-2">What happens next?</h3>
                    <ul className="text-sm text-blue-700 space-y-1 text-left">
                      <li>• Our verification team will review your documents</li>
                      <li>• You'll receive an email notification with the results</li>
                      <li>• Upon approval, your transaction limits will be increased</li>
                      <li>• Your trust score will be updated automatically</li>
                    </ul>
                  </div>
                  <Button 
                    onClick={() => window.location.href = '/dashboard'}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Return to Dashboard
                  </Button>
                </CardContent>
              )}
            </Card>
          </>
        )}
      </div>
    </div>
  );
}
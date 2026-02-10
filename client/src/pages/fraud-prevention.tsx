import { useState } from "react";
import { useLocation } from "wouter";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Shield, Search, Phone, Globe, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

export default function FraudPreventionPage() {
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  const [domainInput, setDomainInput] = useState("");
  const [phoneInput, setPhoneInput] = useState("");
  const [urlInput, setUrlInput] = useState("");
  const [reportForm, setReportForm] = useState({
    reportType: "",
    targetDomain: "",
    targetPhoneNumber: "",
    targetEmail: "",
    fraudType: "",
    severity: "",
    description: "",
    evidence: ""
  });

  // Domain Trust Score Check
  const domainCheckMutation = useMutation({
    mutationFn: async (domain: string) => {
      return await apiRequest(`/api/fraud/domain/${domain}`);
    },
    onSuccess: (data) => {
      toast({
        title: "Domain Analysis Complete",
        description: `Trust Score: ${data.trustScore}% - Risk Level: ${data.riskLevel}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze domain. Please check your API key.",
        variant: "destructive",
      });
    },
  });

  // Phone Number Verification
  const phoneCheckMutation = useMutation({
    mutationFn: async (phoneNumber: string) => {
      return await apiRequest(`/api/fraud/phone/${phoneNumber}`);
    },
    onSuccess: (data) => {
      toast({
        title: "Phone Analysis Complete",
        description: `Risk Level: ${data.riskLevel} - Fraud Score: ${data.fraudScore}%`,
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze phone number. Please check your API key.",
        variant: "destructive",
      });
    },
  });

  // Website Analysis
  const websiteAnalysisMutation = useMutation({
    mutationFn: async (url: string) => {
      const encodedUrl = encodeURIComponent(url);
      return await apiRequest(`/api/fraud/analyze/${encodedUrl}`);
    },
    onSuccess: (data) => {
      toast({
        title: "Website Analysis Complete",
        description: `Risk Score: ${data.riskScore}% - Category: ${data.category}`,
      });
    },
    onError: (error) => {
      toast({
        title: "Analysis Failed",
        description: "Unable to analyze website. Please check your API key.",
        variant: "destructive",
      });
    },
  });

  // Submit Fraud Report
  const reportMutation = useMutation({
    mutationFn: async (reportData: any) => {
      return await apiRequest("/api/fraud/reports", {
        method: "POST",
        body: JSON.stringify(reportData),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Report Submitted",
        description: "Your fraud report has been submitted successfully.",
      });
      setReportForm({
        reportType: "",
        targetDomain: "",
        targetPhoneNumber: "",
        targetEmail: "",
        fraudType: "",
        severity: "",
        description: "",
        evidence: ""
      });
    },
    onError: (error) => {
      toast({
        title: "Submission Failed",
        description: "Unable to submit report. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Comprehensive Fraud Check
  const comprehensiveCheckMutation = useMutation({
    mutationFn: async (data: { domain?: string; phoneNumber?: string; email?: string; url?: string }) => {
      return await apiRequest("/api/fraud/check", {
        method: "POST",
        body: JSON.stringify(data),
        headers: { "Content-Type": "application/json" },
      });
    },
    onSuccess: (data) => {
      toast({
        title: "Comprehensive Check Complete",
        description: `Found ${data.reports?.length || 0} related fraud reports`,
      });
    },
  });

  const handleDomainCheck = () => {
    if (!domainInput.trim()) {
      toast({
        title: "Missing Domain",
        description: "Please enter a domain to check",
        variant: "destructive",
      });
      return;
    }
    
    // Navigate to website integrity checker
    const domain = domainInput.trim();
    const url = domain.startsWith('http') ? domain : `https://${domain}`;
    setLocation(`/website-integrity?url=${encodeURIComponent(url)}`);
  };

  const handlePhoneCheck = () => {
    if (!phoneInput.trim()) return;
    phoneCheckMutation.mutate(phoneInput.trim());
  };

  const handleWebsiteAnalysis = () => {
    if (!urlInput.trim()) return;
    websiteAnalysisMutation.mutate(urlInput.trim());
  };

  const handleReportSubmit = () => {
    if (!reportForm.reportType || !reportForm.description) {
      toast({
        title: "Missing Information",
        description: "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }
    reportMutation.mutate(reportForm);
  };

  const handleComprehensiveCheck = () => {
    const data: any = {};
    if (domainInput) data.domain = domainInput;
    if (phoneInput) data.phoneNumber = phoneInput;
    if (urlInput) data.url = urlInput;
    
    if (Object.keys(data).length === 0) {
      toast({
        title: "No Data Provided",
        description: "Please enter at least one item to check",
        variant: "destructive",
      });
      return;
    }
    
    comprehensiveCheckMutation.mutate(data);
  };

  const getRiskBadgeColor = (riskLevel: string) => {
    switch (riskLevel?.toLowerCase()) {
      case 'low': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Fraud Prevention Dashboard</h1>
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive fraud detection and prevention tools. Check domains, verify phone numbers, 
            analyze websites, and report fraudulent activities.
          </p>
        </div>

        <Tabs defaultValue="domain-check" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="domain-check">Domain Trust</TabsTrigger>
            <TabsTrigger value="phone-check">Phone Verify</TabsTrigger>
            <TabsTrigger value="website-analysis">Website Analysis</TabsTrigger>
            <TabsTrigger value="fraud-report">Report Fraud</TabsTrigger>
            <TabsTrigger value="comprehensive">Multi-Check</TabsTrigger>
          </TabsList>

          {/* Domain Trust Score Tab */}
          <TabsContent value="domain-check">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2" />
                  Domain Trust Score API
                </CardTitle>
                <CardDescription>
                  Check domain trust scores and risk levels for fraud prevention
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="domain">Domain to Check</Label>
                    <Input
                      id="domain"
                      placeholder="example.com"
                      value={domainInput}
                      onChange={(e) => setDomainInput(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={handleDomainCheck}
                      disabled={domainCheckMutation.isPending}
                      className="w-full"
                    >
                      {domainCheckMutation.isPending ? "Checking..." : "Check Domain"}
                    </Button>
                  </div>
                </div>

                {domainCheckMutation.data && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Trust Score:</span>
                          <Badge variant="outline">{domainCheckMutation.data.trustScore}%</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Risk Level:</span>
                          <Badge className={getRiskBadgeColor(domainCheckMutation.data.riskLevel)}>
                            {domainCheckMutation.data.riskLevel}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Category:</span>
                          <Badge variant="secondary">{domainCheckMutation.data.category}</Badge>
                        </div>
                        {(domainCheckMutation.data.isPhishing || domainCheckMutation.data.isMalware || domainCheckMutation.data.isScam) && (
                          <div className="flex items-center space-x-2 text-red-600">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="font-medium">Security Warnings Detected</span>
                          </div>
                        )}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Phone Number Verification Tab */}
          <TabsContent value="phone-check">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Phone className="h-5 w-5 mr-2" />
                  Phone Number Verification API
                </CardTitle>
                <CardDescription>
                  Verify phone numbers and check for scam/spam indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      placeholder="+1234567890"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={handlePhoneCheck}
                      disabled={phoneCheckMutation.isPending}
                      className="w-full"
                    >
                      {phoneCheckMutation.isPending ? "Verifying..." : "Verify Phone"}
                    </Button>
                  </div>
                </div>

                {phoneCheckMutation.data && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Fraud Score:</span>
                          <Badge variant="outline">{phoneCheckMutation.data.fraudScore}%</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Risk Level:</span>
                          <Badge className={getRiskBadgeColor(phoneCheckMutation.data.riskLevel)}>
                            {phoneCheckMutation.data.riskLevel}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Carrier:</span>
                          <Badge variant="secondary">{phoneCheckMutation.data.carrier}</Badge>
                        </div>
                        {(phoneCheckMutation.data.isScam || phoneCheckMutation.data.isSpam || phoneCheckMutation.data.isRobo) && (
                          <div className="flex items-center space-x-2 text-red-600">
                            <AlertTriangle className="h-4 w-4" />
                            <span className="font-medium">Fraud Indicators Detected</span>
                          </div>
                        )}
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Website Analysis Tab */}
          <TabsContent value="website-analysis">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Search className="h-5 w-5 mr-2" />
                  Website Analysis API
                </CardTitle>
                <CardDescription>
                  Comprehensive website security and fraud analysis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="url">Website URL</Label>
                    <Input
                      id="url"
                      placeholder="https://example.com"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                    />
                  </div>
                  <div className="flex items-end">
                    <Button 
                      onClick={handleWebsiteAnalysis}
                      disabled={websiteAnalysisMutation.isPending}
                      className="w-full"
                    >
                      {websiteAnalysisMutation.isPending ? "Analyzing..." : "Analyze Website"}
                    </Button>
                  </div>
                </div>

                {websiteAnalysisMutation.data && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Risk Score:</span>
                          <Badge variant="outline">{websiteAnalysisMutation.data.riskScore}%</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Category:</span>
                          <Badge variant="secondary">{websiteAnalysisMutation.data.category}</Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">SSL Valid:</span>
                          <Badge className={websiteAnalysisMutation.data.hasValidSSL ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {websiteAnalysisMutation.data.hasValidSSL ? 'Yes' : 'No'}
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">Confidence:</span>
                          <Badge variant="outline">{websiteAnalysisMutation.data.confidence}%</Badge>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Fraud Report Tab */}
          <TabsContent value="fraud-report">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlertTriangle className="h-5 w-5 mr-2" />
                  Submit Fraud Report
                </CardTitle>
                <CardDescription>
                  Report fraudulent websites, phone numbers, or suspicious activities
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reportType">Report Type *</Label>
                    <Select value={reportForm.reportType} onValueChange={(value) => setReportForm({...reportForm, reportType: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="website">Fraudulent Website</SelectItem>
                        <SelectItem value="phone">Scam Phone Number</SelectItem>
                        <SelectItem value="email">Phishing Email</SelectItem>
                        <SelectItem value="user">Suspicious User</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="severity">Severity *</Label>
                    <Select value={reportForm.severity} onValueChange={(value) => setReportForm({...reportForm, severity: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select severity" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="critical">Critical</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="targetDomain">Target Domain</Label>
                    <Input
                      id="targetDomain"
                      placeholder="fraudulent-site.com"
                      value={reportForm.targetDomain}
                      onChange={(e) => setReportForm({...reportForm, targetDomain: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetPhone">Target Phone</Label>
                    <Input
                      id="targetPhone"
                      placeholder="+1234567890"
                      value={reportForm.targetPhoneNumber}
                      onChange={(e) => setReportForm({...reportForm, targetPhoneNumber: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="targetEmail">Target Email</Label>
                    <Input
                      id="targetEmail"
                      placeholder="scam@example.com"
                      value={reportForm.targetEmail}
                      onChange={(e) => setReportForm({...reportForm, targetEmail: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the fraudulent activity in detail..."
                    value={reportForm.description}
                    onChange={(e) => setReportForm({...reportForm, description: e.target.value})}
                    rows={4}
                  />
                </div>

                <div>
                  <Label htmlFor="evidence">Evidence/Supporting Information</Label>
                  <Textarea
                    id="evidence"
                    placeholder="Any evidence, URLs, screenshots descriptions, etc."
                    value={reportForm.evidence}
                    onChange={(e) => setReportForm({...reportForm, evidence: e.target.value})}
                    rows={3}
                  />
                </div>

                <Button 
                  onClick={handleReportSubmit}
                  disabled={reportMutation.isPending}
                  className="w-full"
                >
                  {reportMutation.isPending ? "Submitting..." : "Submit Fraud Report"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Comprehensive Check Tab */}
          <TabsContent value="comprehensive">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2" />
                  Comprehensive Fraud Check
                </CardTitle>
                <CardDescription>
                  Run multiple fraud checks simultaneously and get comprehensive results
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="multiDomain">Domain</Label>
                    <Input
                      id="multiDomain"
                      placeholder="example.com"
                      value={domainInput}
                      onChange={(e) => setDomainInput(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="multiPhone">Phone Number</Label>
                    <Input
                      id="multiPhone"
                      placeholder="+1234567890"
                      value={phoneInput}
                      onChange={(e) => setPhoneInput(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="multiUrl">Website URL</Label>
                    <Input
                      id="multiUrl"
                      placeholder="https://example.com"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                    />
                  </div>
                </div>

                <Button 
                  onClick={handleComprehensiveCheck}
                  disabled={comprehensiveCheckMutation.isPending}
                  className="w-full"
                  size="lg"
                >
                  {comprehensiveCheckMutation.isPending ? "Running Comprehensive Check..." : "Run Comprehensive Fraud Check"}
                </Button>

                {comprehensiveCheckMutation.data && (
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-3">
                        <h4 className="font-medium">Comprehensive Check Results:</h4>
                        
                        {comprehensiveCheckMutation.data.domain && (
                          <div className="border-l-4 border-blue-500 pl-4">
                            <h5 className="font-medium text-blue-700">Domain Analysis</h5>
                            <p>Trust Score: {comprehensiveCheckMutation.data.domain.trustScore}% | Risk: {comprehensiveCheckMutation.data.domain.riskLevel}</p>
                          </div>
                        )}
                        
                        {comprehensiveCheckMutation.data.phone && (
                          <div className="border-l-4 border-green-500 pl-4">
                            <h5 className="font-medium text-green-700">Phone Analysis</h5>
                            <p>Fraud Score: {comprehensiveCheckMutation.data.phone.fraudScore}% | Risk: {comprehensiveCheckMutation.data.phone.riskLevel}</p>
                          </div>
                        )}
                        
                        {comprehensiveCheckMutation.data.website && (
                          <div className="border-l-4 border-purple-500 pl-4">
                            <h5 className="font-medium text-purple-700">Website Analysis</h5>
                            <p>Risk Score: {comprehensiveCheckMutation.data.website.riskScore}% | Category: {comprehensiveCheckMutation.data.website.category}</p>
                          </div>
                        )}
                        
                        <div className="border-l-4 border-orange-500 pl-4">
                          <h5 className="font-medium text-orange-700">Related Reports</h5>
                          <p>{comprehensiveCheckMutation.data.reports?.length || 0} fraud reports found</p>
                        </div>
                      </div>
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* API Information Card */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>API Integration Information</CardTitle>
            <CardDescription>
              Use these endpoints to integrate fraud prevention into your applications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900">Domain Trust API</h4>
                <code className="text-sm text-blue-700">GET /api/fraud/domain/[domain]</code>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-medium text-green-900">Phone Verify API</h4>
                <code className="text-sm text-green-700">GET /api/fraud/phone/[phone]</code>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-medium text-purple-900">Website Analysis</h4>
                <code className="text-sm text-purple-700">POST /api/fraud/analyze</code>
              </div>
              <div className="p-4 bg-orange-50 rounded-lg">
                <h4 className="font-medium text-orange-900">Fraud Reports</h4>
                <code className="text-sm text-orange-700">POST /api/fraud/reports</code>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
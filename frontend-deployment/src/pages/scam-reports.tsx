import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useAuth } from "@/hooks/use-auth";
import { Navigation } from "@/components/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Search, Flag, Plus, AlertTriangle, Calendar, User, Shield } from "lucide-react";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface ScamReport {
  id: number;
  reporterId: number;
  scammerInfo: string;
  scamType: string;
  description: string;
  status: string;
  isPublic: boolean;
  createdAt: string;
}

export default function ScamReports() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [isReportDialogOpen, setIsReportDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [newReport, setNewReport] = useState({
    scammerInfo: "",
    scamType: "",
    description: "",
  });

  const { data: scamReports = [], isLoading: reportsLoading } = useQuery<ScamReport[]>({
    queryKey: ["/api/scam-reports", searchQuery],
    queryFn: async () => {
      const url = searchQuery 
        ? `/api/scam-reports?search=${encodeURIComponent(searchQuery)}`
        : "/api/scam-reports";
      
      const response = await fetch(url, {
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch scam reports");
      return response.json();
    },
  });

  const createReportMutation = useMutation({
    mutationFn: async (reportData: any) => {
      const response = await apiRequest("POST", "/api/scam-reports", reportData);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/scam-reports"] });
      setIsReportDialogOpen(false);
      setNewReport({ scammerInfo: "", scamType: "", description: "" });
      toast({
        title: "Report Submitted",
        description: "Your scam report has been submitted successfully.",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to submit scam report",
        variant: "destructive",
      });
    },
  });

  if (!user) {
    return null;
  }

  const handleSubmitReport = (e: React.FormEvent) => {
    e.preventDefault();
    createReportMutation.mutate(newReport);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getScamTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "payment fraud":
        return "bg-red-100 text-red-800";
      case "fake products":
        return "bg-blue-100 text-blue-800";
      case "identity theft":
        return "bg-blue-200 text-blue-900";
      case "phishing attempt":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "verified":
        return "bg-emerald-100 text-emerald-800";
      case "dismissed":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h1 className="font-inter text-3xl font-bold text-neutral-900">Scam Reports</h1>
            <p className="text-neutral-600">Community-driven fraud prevention database</p>
          </div>
          
          <Dialog open={isReportDialogOpen} onOpenChange={setIsReportDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                <Flag className="mr-2 h-4 w-4" />
                Report Scam
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>Report a Scam</DialogTitle>
                <DialogDescription>
                  Help protect the community by reporting fraudulent activities
                </DialogDescription>
              </DialogHeader>
              
              <form onSubmit={handleSubmitReport} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="scamType">Scam Type</Label>
                  <Select 
                    value={newReport.scamType} 
                    onValueChange={(value) => setNewReport({ ...newReport, scamType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select scam type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Payment Fraud">Payment Fraud</SelectItem>
                      <SelectItem value="Fake Products">Fake Products</SelectItem>
                      <SelectItem value="Identity Theft">Identity Theft</SelectItem>
                      <SelectItem value="Phishing Attempt">Phishing Attempt</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="scammerInfo">Scammer Information</Label>
                  <Input
                    id="scammerInfo"
                    value={newReport.scammerInfo}
                    onChange={(e) => setNewReport({ ...newReport, scammerInfo: e.target.value })}
                    placeholder="Username, email, phone number, etc."
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={newReport.description}
                    onChange={(e) => setNewReport({ ...newReport, description: e.target.value })}
                    placeholder="Describe the scam attempt in detail..."
                    rows={4}
                    required
                  />
                </div>
                
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                  <div className="flex items-start space-x-2">
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5 flex-shrink-0" />
                    <div className="text-sm">
                      <p className="font-medium text-yellow-800">Important</p>
                      <p className="text-yellow-700">
                        Only report genuine scam attempts. False reports may result in account restrictions.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsReportDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit" 
                    disabled={createReportMutation.isPending}
                    className="bg-red-600 hover:bg-red-700"
                  >
                    {createReportMutation.isPending ? "Submitting..." : "Submit Report"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 h-4 w-4" />
              <Input
                placeholder="Search by scammer info, description, or scam type..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Flag className="h-6 w-6 text-red-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-neutral-600">Total Reports</p>
                  <p className="text-2xl font-bold text-neutral-900">{scamReports.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <Shield className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-neutral-600">Verified Reports</p>
                  <p className="text-2xl font-bold text-neutral-900">
                    {scamReports.filter(r => r.status === "verified").length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <User className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-neutral-600">Community Protected</p>
                  <p className="text-2xl font-bold text-neutral-900">
                    {new Set(scamReports.map(r => r.scammerInfo)).size}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Reports List */}
        <div className="space-y-4">
          {reportsLoading ? (
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="animate-pulse space-y-3">
                      <div className="h-4 bg-neutral-200 rounded w-3/4"></div>
                      <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
                      <div className="h-4 bg-neutral-200 rounded w-full"></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : scamReports.length > 0 ? (
            scamReports.map((report) => (
              <Card key={report.id} className="hover:shadow-md transition-shadow duration-200">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Flag className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <Badge className={getScamTypeColor(report.scamType)}>
                            {report.scamType}
                          </Badge>
                          <Badge className={getStatusColor(report.status)}>
                            {report.status}
                          </Badge>
                        </div>
                        <h3 className="font-medium text-gray-900 mb-1">
                          Scammer: {report.scammerInfo}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {report.description}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-3 w-3" />
                        <span>Reported {formatDate(report.createdAt)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <User className="h-3 w-3" />
                        <span>Reporter ID: {report.reporterId}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <Flag className="h-12 w-12 text-neutral-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                  {searchQuery ? "No Reports Found" : "No Scam Reports Yet"}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {searchQuery 
                    ? "Try adjusting your search terms or clear the search to see all reports."
                    : "Be the first to help protect the community by reporting fraudulent activities."
                  }
                </p>
                {!searchQuery && (
                  <Button onClick={() => setIsReportDialogOpen(true)} className="bg-red-600 hover:bg-red-700">
                    <Plus className="mr-2 h-4 w-4" />
                    Submit First Report
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

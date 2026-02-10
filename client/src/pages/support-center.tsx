import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { LiveChat } from "@/components/LiveChat";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  FileText, 
  Shield, 
  AlertTriangle, 
  Users, 
  Clock,
  CheckCircle,
  ExternalLink,
  BookOpen
} from "lucide-react";

export default function SupportCenter() {
  const { toast } = useToast();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    subject: '',
    description: '',
    priority: 'medium',
    category: 'general'
  });

  const createTicketMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      const response = await apiRequest('POST', '/api/support/tickets', data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Support Ticket Created",
        description: `Your ticket ${data.ticket.id} has been created successfully. We'll respond within 24 hours.`,
      });
      setFormData({
        email: '',
        subject: '',
        description: '',
        priority: 'medium',
        category: 'general'
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create support ticket",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.subject || !formData.description) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    createTicketMutation.mutate(formData);
  };

  const supportOptions = [
    {
      title: "Live Chat Support",
      description: "Chat with our support team in real-time",
      icon: MessageCircle,
      action: "Start Chat",
      available: "24/7",
      color: "bg-green-500",
      onClick: () => setIsChatOpen(true)
    },
    {
      title: "Phone Support",
      description: "Speak directly with our UK support team",
      icon: Phone,
      contact: "+44 20 7123 4567",
      available: "Mon-Fri 9AM-6PM GMT",
      color: "bg-blue-500"
    },
    {
      title: "Email Support",
      description: "Send us a detailed message",
      icon: Mail,
      contact: "support@trustverify.io",
      available: "24-48h response",
      color: "bg-purple-500"
    }
  ];

  const quickActions = [
    {
      title: "User Guide",
      description: "Complete platform training manual",
      icon: BookOpen,
      link: "/user-guide",
      color: "bg-teal-500"
    },
    {
      title: "API Documentation",
      description: "Developer integration resources",
      icon: FileText,
      link: "/developers",
      color: "bg-indigo-500"
    },
    {
      title: "Security Center",
      description: "Learn about our security measures",
      icon: Shield,
      link: "/security",
      color: "bg-red-500"
    },
    {
      title: "Status Page",
      description: "Check platform status and uptime",
      icon: CheckCircle,
      link: "https://status.trustverify.io",
      external: true,
      color: "bg-green-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">TrustVerify Support Center</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Get the help you need to secure your transactions and protect your business
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Contact Options */}
          <div className="lg:col-span-2 space-y-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Support</h2>
              <div className="grid gap-6">
                {supportOptions.map((option, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-full ${option.color} text-white`}>
                          <option.icon className="h-6 w-6" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{option.title}</h3>
                          <p className="text-gray-600 text-sm">{option.description}</p>
                          {option.contact && (
                            <p className="font-mono text-sm text-blue-600 mt-1">{option.contact}</p>
                          )}
                        </div>
                        <div className="text-right">
                          <Badge variant="outline" className="mb-2">
                            {option.available}
                          </Badge>
                          {option.action && (
                            <Button 
                              size="sm" 
                              className="block"
                              onClick={option.onClick}
                            >
                              {option.action}
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Support Ticket Form */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>Create Support Ticket</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your.email@company.com"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Category
                      </label>
                      <Select 
                        value={formData.category} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="technical">Technical Support</SelectItem>
                          <SelectItem value="billing">Billing & Account</SelectItem>
                          <SelectItem value="fraud-report">Fraud Report</SelectItem>
                          <SelectItem value="integration">API Integration</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Subject *
                      </label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Brief description of your issue"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Priority
                      </label>
                      <Select 
                        value={formData.priority} 
                        onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                          <SelectItem value="urgent">Urgent</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Please provide detailed information about your issue..."
                      rows={4}
                      required
                    />
                  </div>

                  <Button 
                    type="submit" 
                    className="w-full"
                    disabled={createTicketMutation.isPending}
                  >
                    {createTicketMutation.isPending ? "Creating Ticket..." : "Create Support Ticket"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {quickActions.map((action, index) => (
                  <a
                    key={index}
                    href={action.link}
                    target={action.external ? "_blank" : "_self"}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                  >
                    <div className={`p-2 rounded ${action.color} text-white`}>
                      <action.icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900 group-hover:text-blue-600">
                        {action.title}
                      </div>
                      <div className="text-xs text-gray-500">{action.description}</div>
                    </div>
                    {action.external && <ExternalLink className="h-4 w-4 text-gray-400" />}
                  </a>
                ))}
              </CardContent>
            </Card>

            {/* Support Hours */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5" />
                  <span>Support Hours</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Live Chat</span>
                    <span className="font-medium">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Phone Support</span>
                    <span className="font-medium">Mon-Fri 9AM-6PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Email Support</span>
                    <span className="font-medium">24-48h response</span>
                  </div>
                  <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                    <div className="text-blue-800 font-medium text-xs">All times in GMT</div>
                    <div className="text-blue-600 text-xs">UK-based support team</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-red-800">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Emergency Contact</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-red-700 mb-3">
                  For critical security incidents or urgent fraud reports:
                </p>
                <div className="space-y-2">
                  <div className="font-mono text-sm text-red-800">
                    emergency@trustverify.io
                  </div>
                  <div className="font-mono text-sm text-red-800">
                    +44 20 7123 4567 (24/7)
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Live Chat Component */}
      <LiveChat 
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
        onMinimize={() => setIsChatOpen(false)}
      />
    </div>
  );
}
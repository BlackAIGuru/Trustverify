import { useState } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BookOpen, 
  Users, 
  Shield, 
  CreditCard, 
  MessageSquare, 
  Settings, 
  ChevronRight,
  PlayCircle,
  FileText,
  CheckCircle,
  AlertCircle,
  Star,
  Clock,
  Download,
  Video,
  ExternalLink
} from "lucide-react";

export default function UserGuide() {
  const [activeSection, setActiveSection] = useState("getting-started");

  const guideCategories = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: PlayCircle,
      lessons: [
        { title: "Account Setup & Verification", duration: "5 min", completed: true },
        { title: "Understanding Trust Scores", duration: "3 min", completed: true },
        { title: "Navigation & Dashboard Overview", duration: "4 min", completed: false },
        { title: "Security Settings", duration: "6 min", completed: false }
      ]
    },
    {
      id: "transactions",
      title: "Transaction Management",
      icon: CreditCard,
      lessons: [
        { title: "Creating Secure Transactions", duration: "8 min", completed: false },
        { title: "Escrow Process Explained", duration: "10 min", completed: false },
        { title: "Payment Protection", duration: "7 min", completed: false },
        { title: "Dispute Resolution", duration: "12 min", completed: false }
      ]
    },
    {
      id: "fraud-protection",
      title: "Fraud Protection",
      icon: Shield,
      lessons: [
        { title: "Recognizing Fraud Patterns", duration: "15 min", completed: false },
        { title: "AI Detection Features", duration: "8 min", completed: false },
        { title: "Reporting Suspicious Activity", duration: "5 min", completed: false },
        { title: "Global Intelligence Network", duration: "10 min", completed: false }
      ]
    },
    {
      id: "communication",
      title: "Communication Tools",
      icon: MessageSquare,
      lessons: [
        { title: "In-Platform Messaging", duration: "6 min", completed: false },
        { title: "Document Sharing", duration: "4 min", completed: false },
        { title: "Real-time Notifications", duration: "3 min", completed: false }
      ]
    },
    {
      id: "admin-tools",
      title: "Admin Management",
      icon: Settings,
      lessons: [
        { title: "User Management", duration: "12 min", completed: false },
        { title: "Platform Analytics", duration: "10 min", completed: false },
        { title: "Security Monitoring", duration: "15 min", completed: false },
        { title: "Custom Reporting", duration: "8 min", completed: false }
      ]
    }
  ];

  const quickStartSteps = [
    {
      step: 1,
      title: "Create Your Account",
      description: "Sign up with email or social login and complete basic verification",
      action: "Complete verification process",
      status: "completed"
    },
    {
      step: 2,
      title: "Complete KYC Verification",
      description: "Upload required documents for enhanced trust score",
      action: "Upload documents",
      status: "in-progress"
    },
    {
      step: 3,
      title: "Explore the Dashboard",
      description: "Familiarize yourself with key features and navigation",
      action: "Take platform tour",
      status: "pending"
    },
    {
      step: 4,
      title: "Make Your First Transaction",
      description: "Create a secure transaction with built-in protection",
      action: "Start transaction",
      status: "pending"
    }
  ];

  const resources = [
    {
      title: "API Documentation",
      description: "Complete developer integration guide",
      type: "documentation",
      link: "/developers",
      icon: FileText
    },
    {
      title: "Video Tutorials",
      description: "Step-by-step visual guides",
      type: "video",
      link: "https://youtube.com/trustverify",
      icon: Video,
      external: true
    },
    {
      title: "PDF User Manual",
      description: "Comprehensive offline reference",
      type: "download",
      link: "/assets/trustverify-user-manual.pdf",
      icon: Download
    },
    {
      title: "Community Forum",
      description: "Connect with other users",
      type: "community",
      link: "https://community.trustverify.io",
      icon: Users,
      external: true
    }
  ];

  const faqs = [
    {
      question: "How long does verification take?",
      answer: "Basic verification is instant. Enhanced KYC verification typically takes 24-48 hours during business days."
    },
    {
      question: "What affects my trust score?",
      answer: "Trust scores are calculated based on transaction history, verification level, user feedback, and compliance with platform guidelines."
    },
    {
      question: "How secure are my transactions?",
      answer: "All transactions use end-to-end encryption, escrow protection, and AI-powered fraud detection. We maintain 99.9% security success rate."
    },
    {
      question: "Can I dispute a transaction?",
      answer: "Yes, you can raise disputes within 30 days. Our resolution team provides mediation with final decisions within 72 hours."
    },
    {
      question: "What payment methods are supported?",
      answer: "We support bank transfers, credit/debit cards, digital wallets, and cryptocurrency payments with full fraud protection."
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">TrustVerify User Guide</h1>
            <p className="text-xl opacity-90 max-w-3xl mx-auto">
              Master the platform with comprehensive training materials for users and administrators
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <Tabs value={activeSection} onValueChange={setActiveSection}>
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
            <TabsTrigger value="training">Training Modules</TabsTrigger>
            <TabsTrigger value="quick-start">Quick Start</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
            <TabsTrigger value="faq">FAQ</TabsTrigger>
          </TabsList>

          {/* Getting Started Tab */}
          <TabsContent value="getting-started">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BookOpen className="h-5 w-5" />
                      <span>Welcome to TrustVerify</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <h3 className="font-semibold text-lg mb-3">Platform Overview</h3>
                      <p className="text-gray-600 mb-4">
                        TrustVerify is a comprehensive transaction security platform that provides end-to-end protection 
                        for digital commerce. Our platform combines AI-powered fraud detection, secure escrow services, 
                        and global intelligence to ensure safe transactions.
                      </p>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">Key Features</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-start space-x-3">
                          <Shield className="h-5 w-5 text-green-500 mt-1" />
                          <div>
                            <div className="font-medium">AI Fraud Detection</div>
                            <div className="text-sm text-gray-600">Real-time threat analysis</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <CreditCard className="h-5 w-5 text-blue-500 mt-1" />
                          <div>
                            <div className="font-medium">Secure Escrow</div>
                            <div className="text-sm text-gray-600">Protected payment holding</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <MessageSquare className="h-5 w-5 text-purple-500 mt-1" />
                          <div>
                            <div className="font-medium">Dispute Resolution</div>
                            <div className="text-sm text-gray-600">72-hour resolution process</div>
                          </div>
                        </div>
                        <div className="flex items-start space-x-3">
                          <Star className="h-5 w-5 text-yellow-500 mt-1" />
                          <div>
                            <div className="font-medium">Trust Scoring</div>
                            <div className="text-sm text-gray-600">Dynamic reputation system</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold text-lg mb-3">User Types</h3>
                      <div className="space-y-3">
                        <div className="p-4 border rounded-lg">
                          <div className="font-medium">Individual Users</div>
                          <div className="text-sm text-gray-600">Personal transaction protection and fraud prevention</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="font-medium">Business Users</div>
                          <div className="text-sm text-gray-600">Enterprise-grade security with custom compliance features</div>
                        </div>
                        <div className="p-4 border rounded-lg">
                          <div className="font-medium">Developers</div>
                          <div className="text-sm text-gray-600">API access and integration tools for custom implementations</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Progress Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Course Completion</span>
                        <span className="font-semibold">15%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                      <div className="text-xs text-gray-500">2 of 13 lessons completed</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Next Steps</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start" variant="outline">
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Continue Dashboard Tour
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <FileText className="h-4 w-4 mr-2" />
                      Complete Profile Setup
                    </Button>
                    <Button className="w-full justify-start" variant="outline">
                      <Shield className="h-4 w-4 mr-2" />
                      Enable Security Features
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Training Modules Tab */}
          <TabsContent value="training">
            <div className="space-y-6">
              {guideCategories.map((category) => (
                <Card key={category.id}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <category.icon className="h-5 w-5" />
                      <span>{category.title}</span>
                      <Badge variant="outline">
                        {category.lessons.filter(l => l.completed).length}/{category.lessons.length}
                      </Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-3">
                      {category.lessons.map((lesson, index) => (
                        <div key={index} className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition-colors">
                          <div className="flex items-center space-x-3">
                            {lesson.completed ? (
                              <CheckCircle className="h-5 w-5 text-green-500" />
                            ) : (
                              <PlayCircle className="h-5 w-5 text-gray-400" />
                            )}
                            <div>
                              <div className="font-medium">{lesson.title}</div>
                              <div className="text-sm text-gray-500 flex items-center space-x-2">
                                <Clock className="h-3 w-3" />
                                <span>{lesson.duration}</span>
                              </div>
                            </div>
                          </div>
                          <Button size="sm" variant={lesson.completed ? "outline" : "default"}>
                            {lesson.completed ? "Review" : "Start"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Quick Start Tab */}
          <TabsContent value="quick-start">
            <Card>
              <CardHeader>
                <CardTitle>Quick Start Guide</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {quickStartSteps.map((step) => (
                    <div key={step.step} className="flex items-start space-x-4">
                      <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                        step.status === 'completed' ? 'bg-green-500 text-white' :
                        step.status === 'in-progress' ? 'bg-blue-500 text-white' :
                        'bg-gray-200 text-gray-600'
                      }`}>
                        {step.status === 'completed' ? <CheckCircle className="h-4 w-4" /> : step.step}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{step.title}</h3>
                          <Badge variant={
                            step.status === 'completed' ? 'default' :
                            step.status === 'in-progress' ? 'secondary' :
                            'outline'
                          }>
                            {step.status === 'completed' ? 'Completed' :
                             step.status === 'in-progress' ? 'In Progress' :
                             'Pending'}
                          </Badge>
                        </div>
                        <p className="text-gray-600 mt-1">{step.description}</p>
                        <Button size="sm" className="mt-2" disabled={step.status === 'completed'}>
                          {step.action}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Resources Tab */}
          <TabsContent value="resources">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {resources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <resource.icon className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-semibold">{resource.title}</h3>
                          {resource.external && <ExternalLink className="h-4 w-4 text-gray-400" />}
                        </div>
                        <p className="text-gray-600 text-sm mt-1">{resource.description}</p>
                        {resource.external ? (
                          <a 
                            href={resource.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                          >
                            <Button size="sm" className="mt-3" variant="outline">
                              {resource.type === 'download' ? 'Download' : 'Open'}
                            </Button>
                          </a>
                        ) : (
                          <Link to={resource.link}>
                            <Button size="sm" className="mt-3" variant="outline">
                              {resource.type === 'download' ? 'Download' : 'Open'}
                            </Button>
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* FAQ Tab */}
          <TabsContent value="faq">
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="space-y-3">
                      <h3 className="font-semibold text-lg">{faq.question}</h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
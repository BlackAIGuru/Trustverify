import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { HelpCircle, Search, Book, MessageCircle, Shield, Users, Zap, Phone } from "lucide-react";

export default function HelpCenter() {
  const faqCategories = [
    {
      category: "Getting Started",
      icon: Book,
      questions: [
        {
          question: "How do I create a TrustVerify account?",
          answer: "Creating an account is simple. Click 'Sign Up' and provide your email, create a password, and verify your email address. You can then complete your profile and start using our fraud prevention services."
        },
        {
          question: "What verification levels are available?",
          answer: "We offer three verification levels: Basic (email verification), Enhanced (phone + ID verification), and Full (Enhanced plus financial verification). Higher levels unlock increased transaction limits and enhanced features."
        },
        {
          question: "How long does identity verification take?",
          answer: "Basic verification is instant. Enhanced verification typically takes 5-10 minutes, while Full verification can take up to 24 hours for manual review of documents."
        }
      ]
    },
    {
      category: "Fraud Prevention",
      icon: Shield,
      questions: [
        {
          question: "How does TrustVerify detect fraud?",
          answer: "Our AI-powered system analyzes multiple data points including user behavior, transaction patterns, device fingerprinting, and risk signals from our global network to identify potential fraud in real-time."
        },
        {
          question: "What happens when fraud is detected?",
          answer: "When potential fraud is detected, the transaction is flagged for review. Depending on the risk level, it may be automatically blocked, require additional verification, or be referred to our fraud team for manual review."
        },
        {
          question: "Can I appeal a fraud decision?",
          answer: "Yes, if you believe a transaction was incorrectly flagged, you can submit an appeal through your dashboard. Our team will review your case within 24 hours and provide a detailed explanation."
        }
      ]
    },
    {
      category: "Escrow Services",
      icon: Zap,
      questions: [
        {
          question: "How does the escrow process work?",
          answer: "The buyer sends funds to our secure escrow account. The seller delivers the goods/services. The buyer confirms receipt and satisfaction. We then release the funds to the seller. If there's a dispute, our mediation team intervenes."
        },
        {
          question: "What are the escrow fees?",
          answer: "Escrow fees start at 2.9% + $0.30 per transaction for basic users. Verified users receive reduced rates: Enhanced verification gets 2.5% + $0.25, and Full verification gets 2.0% + $0.20."
        },
        {
          question: "How long are funds held in escrow?",
          answer: "Standard escrow period is 7 days from delivery confirmation. This can be extended by mutual agreement or shortened if both parties agree to early release. Dispute cases may extend the hold period."
        }
      ]
    },
    {
      category: "Security & Privacy",
      icon: Shield,
      questions: [
        {
          question: "How is my data protected?",
          answer: "We use bank-level encryption (AES-256) for all data, maintain SOC 2 Type II compliance, and follow strict data protection protocols. Your personal information is never sold to third parties."
        },
        {
          question: "Where is my data stored?",
          answer: "Data is stored in secure, certified data centers in the US, EU, and Asia-Pacific regions. We ensure compliance with local data protection regulations including GDPR and CCPA."
        },
        {
          question: "Can I delete my account and data?",
          answer: "Yes, you can request account deletion at any time. We'll permanently delete your personal data within 30 days, except for information required for legal or regulatory compliance."
        }
      ]
    }
  ];

  const quickActions = [
    {
      title: "Contact Support",
      description: "Get help from our expert team",
      icon: MessageCircle,
      action: "Start Chat"
    },
    {
      title: "Report an Issue",
      description: "Report technical problems or bugs",
      icon: HelpCircle,
      action: "Report Issue"
    },
    {
      title: "Request Feature",
      description: "Suggest new features or improvements",
      icon: Users,
      action: "Submit Request"
    },
    {
      title: "Security Concern",
      description: "Report security vulnerabilities",
      icon: Shield,
      action: "Report Security"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section with Search */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <HelpCircle className="h-16 w-16 mx-auto mb-6 text-blue-300" />
          <h1 className="text-5xl font-bold mb-6">Help Center</h1>
          <p className="text-xl text-blue-100 leading-relaxed mb-8">
            Find answers to your questions and get help with TrustVerify's fraud prevention platform.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                placeholder="Search for help articles, FAQs, or topics..."
                className="pl-12 py-4 text-lg bg-white text-gray-900 border-0 focus:ring-4 focus:ring-blue-300"
              />
              <Button className="absolute right-2 top-2 bg-blue-600 hover:bg-blue-700">
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {quickActions.map((action, index) => (
            <Card key={index} className="shadow-lg text-center hover:shadow-xl transition-shadow cursor-pointer">
              <CardHeader>
                <action.icon className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <CardTitle className="text-lg">{action.title}</CardTitle>
                <CardDescription>{action.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  {action.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Popular Articles */}
        <Card className="shadow-lg mb-16">
          <CardHeader>
            <CardTitle className="text-2xl">Popular Articles</CardTitle>
            <CardDescription>Most frequently accessed help topics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">1</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">How to verify your identity</h3>
                    <p className="text-sm text-gray-500">Complete guide to KYC verification</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">2</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Setting up escrow transactions</h3>
                    <p className="text-sm text-gray-500">Step-by-step escrow setup guide</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">3</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Understanding fraud alerts</h3>
                    <p className="text-sm text-gray-500">What fraud alerts mean and how to respond</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">4</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">API integration guide</h3>
                    <p className="text-sm text-gray-500">Connect TrustVerify to your platform</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">5</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Dispute resolution process</h3>
                    <p className="text-sm text-gray-500">How disputes are handled and resolved</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold text-sm">6</span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">Account security best practices</h3>
                    <p className="text-sm text-gray-500">Keep your account safe and secure</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Categories */}
        <div className="space-y-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
            <p className="text-lg text-gray-600">Find quick answers to common questions about TrustVerify</p>
          </div>
          
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center">
                  <category.icon className="h-6 w-6 mr-3 text-blue-600" />
                  {category.category}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                      <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact Support */}
        <Card className="shadow-lg mt-16 bg-blue-50">
          <CardContent className="p-8">
            <div className="text-center mb-8">
              <Phone className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Still Need Help?</h2>
              <p className="text-gray-600 mb-6">
                Can't find the answer you're looking for? Our support team is here to help you 24/7.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <MessageCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Live Chat</h3>
                <p className="text-sm text-gray-600 mb-3">Get instant help from our team</p>
                <Button variant="outline" size="sm">Start Chat</Button>
              </div>
              
              <div className="text-center">
                <Phone className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Phone Support</h3>
                <p className="text-sm text-gray-600 mb-3">+44 20 7123 4567</p>
                <Button variant="outline" size="sm">Call Now</Button>
              </div>
              
              <div className="text-center">
                <HelpCircle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h3 className="font-semibold text-gray-900 mb-1">Submit Ticket</h3>
                <p className="text-sm text-gray-600 mb-3">Get detailed written support</p>
                <Button variant="outline" size="sm">Create Ticket</Button>
              </div>
            </div>

            <div className="text-center">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Contact Support Team
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
          <Card className="shadow-lg">
            <CardHeader>
              <Book className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">Documentation</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Comprehensive guides and technical documentation for developers and users.
              </p>
              <Button variant="outline" className="w-full">Browse Docs</Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <Users className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">Community Forum</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Connect with other users, share experiences, and get peer-to-peer support.
              </p>
              <Button variant="outline" className="w-full">Join Forum</Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <Zap className="h-8 w-8 text-blue-600 mb-2" />
              <CardTitle className="text-lg">Status Page</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Check real-time system status, scheduled maintenance, and service updates.
              </p>
              <Button variant="outline" className="w-full">View Status</Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
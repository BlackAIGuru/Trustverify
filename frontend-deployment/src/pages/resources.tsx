import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { 
  BookOpen, 
  Code, 
  FileText, 
  Video, 
  Download, 
  ExternalLink, 
  Search,
  Lightbulb,
  Users,
  MessageSquare,
  Shield
} from "lucide-react";

export default function Resources() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-purple-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <BookOpen className="h-16 w-16 mx-auto mb-6 text-purple-300" />
          <h1 className="text-5xl font-bold mb-6">Developer Resources</h1>
          <p className="text-xl text-purple-100 leading-relaxed">
            Everything you need to integrate TrustVerify into your applications. 
            Documentation, guides, SDKs, and community support.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Quick Access */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <Link href="/api-reference">
            <Card className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-0 bg-blue-50">
              <CardContent className="p-6 text-center">
                <Code className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">API Reference</h3>
                <p className="text-sm text-gray-600">Complete API documentation</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/sdk-documentation">
            <Card className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-0 bg-green-50">
              <CardContent className="p-6 text-center">
                <Download className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">SDKs</h3>
                <p className="text-sm text-gray-600">Language-specific libraries</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/integration-examples">
            <Card className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-0 bg-orange-50">
              <CardContent className="p-6 text-center">
                <Lightbulb className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Examples</h3>
                <p className="text-sm text-gray-600">Code samples & tutorials</p>
              </CardContent>
            </Card>
          </Link>

          <Link href="/help-center">
            <Card className="shadow-lg hover:shadow-xl transition-shadow cursor-pointer border-0 bg-purple-50">
              <CardContent className="p-6 text-center">
                <MessageSquare className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Support</h3>
                <p className="text-sm text-gray-600">Get help from our team</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Documentation Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {/* API Documentation */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Code className="h-6 w-6 text-blue-600" />
                <span>API Documentation</span>
              </CardTitle>
              <CardDescription>
                Comprehensive guides to integrate TrustVerify APIs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Link href="/api-reference">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <h4 className="font-medium">API Reference</h4>
                      <p className="text-sm text-gray-600">Complete endpoint documentation</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                </Link>

                <Link href="/api-docs">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <h4 className="font-medium">Getting Started</h4>
                      <p className="text-sm text-gray-600">Quick start guide and tutorials</p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                </Link>

                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h4 className="font-medium">Authentication</h4>
                    <p className="text-sm text-gray-600">API keys and security best practices</p>
                  </div>
                  <Badge variant="secondary">New</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h4 className="font-medium">Rate Limiting</h4>
                    <p className="text-sm text-gray-600">Usage limits and optimization</p>
                  </div>
                  <ExternalLink className="h-4 w-4 text-gray-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* SDKs and Libraries */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Download className="h-6 w-6 text-green-600" />
                <span>SDKs & Libraries</span>
              </CardTitle>
              <CardDescription>
                Official libraries for popular programming languages
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <Link href="/sdk-documentation">
                  <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <div>
                      <h4 className="font-medium">JavaScript SDK</h4>
                      <p className="text-sm text-gray-600">Node.js and browser support</p>
                    </div>
                    <Badge variant="outline">v2.1.0</Badge>
                  </div>
                </Link>

                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h4 className="font-medium">Python SDK</h4>
                    <p className="text-sm text-gray-600">Full Python 3.8+ support</p>
                  </div>
                  <Badge variant="outline">v1.8.2</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h4 className="font-medium">PHP SDK</h4>
                    <p className="text-sm text-gray-600">Laravel and framework integrations</p>
                  </div>
                  <Badge variant="outline">v1.5.1</Badge>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div>
                    <h4 className="font-medium">REST API</h4>
                    <p className="text-sm text-gray-600">Direct HTTP integration</p>
                  </div>
                  <Badge variant="secondary">Universal</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Integration Examples */}
        <Card className="shadow-lg mb-16">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Lightbulb className="h-6 w-6 text-orange-600" />
              <span>Integration Examples</span>
            </CardTitle>
            <CardDescription>
              Real-world examples and code samples for common use cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link href="/integration-examples">
                <div className="p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 rounded bg-blue-100 flex items-center justify-center">
                      <Code className="h-4 w-4 text-blue-600" />
                    </div>
                    <h4 className="font-medium">E-commerce Integration</h4>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">
                    Protect online stores with transaction verification
                  </p>
                  <div className="flex flex-wrap gap-1">
                    <Badge variant="outline" className="text-xs">Node.js</Badge>
                    <Badge variant="outline" className="text-xs">React</Badge>
                  </div>
                </div>
              </Link>

              <div className="p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 rounded bg-green-100 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-green-600" />
                  </div>
                  <h4 className="font-medium">Banking API</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  KYC verification for financial institutions
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">Python</Badge>
                  <Badge variant="outline" className="text-xs">Django</Badge>
                </div>
              </div>

              <div className="p-4 rounded-lg border hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 rounded bg-purple-100 flex items-center justify-center">
                    <Search className="h-4 w-4 text-purple-600" />
                  </div>
                  <h4 className="font-medium">Domain Verification</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">
                  Real-time website trust scoring
                </p>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="outline" className="text-xs">JavaScript</Badge>
                  <Badge variant="outline" className="text-xs">Webhook</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Video Tutorials */}
        <Card className="shadow-lg mb-16">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <Video className="h-6 w-6 text-red-600" />
              <span>Video Tutorials</span>
            </CardTitle>
            <CardDescription>
              Step-by-step video guides for common integration scenarios
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Video className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Getting Started with TrustVerify API</p>
                  <p className="text-sm text-gray-500">15 min tutorial</p>
                </div>
              </div>

              <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <Video className="h-12 w-12 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600">Integration Best Practices</p>
                  <p className="text-sm text-gray-500">22 min deep dive</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community & Support */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <Users className="h-6 w-6 text-blue-600" />
                <span>Community</span>
              </CardTitle>
              <CardDescription>
                Connect with other developers and get community support
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full justify-start">
                <MessageSquare className="h-4 w-4 mr-2" />
                Developer Discord
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <FileText className="h-4 w-4 mr-2" />
                GitHub Discussions
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <BookOpen className="h-4 w-4 mr-2" />
                Stack Overflow
              </Button>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center space-x-3">
                <MessageSquare className="h-6 w-6 text-green-600" />
                <span>Support</span>
              </CardTitle>
              <CardDescription>
                Get help from our technical support team
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link href="/help-center">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="h-4 w-4 mr-2" />
                  Help Center
                </Button>
              </Link>
              <Link href="/contact">
                <Button variant="outline" className="w-full justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </Link>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Submit Ticket
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
}
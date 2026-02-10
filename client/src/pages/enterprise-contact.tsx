import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Building2, Users, Shield, Zap, Mail, Phone, MapPin, Calendar } from "lucide-react";

export default function EnterpriseContact() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Building2 className="h-16 w-16 mx-auto mb-6 text-blue-300" />
          <h1 className="text-5xl font-bold mb-6">Enterprise Sales</h1>
          <p className="text-xl text-blue-100 leading-relaxed mb-8">
            Scale your fraud prevention with enterprise-grade solutions. Get dedicated support, 
            custom integrations, and priority onboarding for your organization.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 px-8 py-4">
              Schedule Demo
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4">
              Download Enterprise Guide
            </Button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Enterprise Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-lg text-center border-0">
            <CardHeader>
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Dedicated Support</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">24/7 priority support with dedicated account manager</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Named account executive</li>
                <li>• Priority technical support</li>
                <li>• Quarterly business reviews</li>
                <li>• Training & onboarding</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg text-center border-0">
            <CardHeader>
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Enterprise Security</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Advanced security features and compliance certifications</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• SOC 2 Type II compliance</li>
                <li>• GDPR & CCPA ready</li>
                <li>• Single Sign-On (SSO)</li>
                <li>• Custom data retention</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="shadow-lg text-center border-0">
            <CardHeader>
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-xl">Custom Integration</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">Tailored solutions for your specific business needs</p>
              <ul className="text-sm text-gray-500 space-y-1">
                <li>• Custom API endpoints</li>
                <li>• White-label solutions</li>
                <li>• Advanced analytics</li>
                <li>• Multi-region deployment</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form and Enterprise Info */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Enterprise Contact Form */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Contact Enterprise Sales</CardTitle>
              <CardDescription>
                Tell us about your organization and we'll get back to you within 4 hours
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">First Name *</label>
                    <Input placeholder="John" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Last Name *</label>
                    <Input placeholder="Smith" required />
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Business Email *</label>
                  <Input type="email" placeholder="john.smith@company.com" required />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Company *</label>
                    <Input placeholder="Acme Corporation" required />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Job Title</label>
                    <Input placeholder="Chief Technology Officer" />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Company Size</label>
                    <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Select size</option>
                      <option>50-200 employees</option>
                      <option>200-1,000 employees</option>
                      <option>1,000-5,000 employees</option>
                      <option>5,000+ employees</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">Industry</label>
                    <select className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                      <option>Select industry</option>
                      <option>Financial Services</option>
                      <option>E-commerce</option>
                      <option>Healthcare</option>
                      <option>Technology</option>
                      <option>Manufacturing</option>
                      <option>Other</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Tell us about your needs</label>
                  <Textarea 
                    placeholder="Describe your fraud prevention challenges, expected transaction volume, integration requirements, etc..."
                    className="min-h-[120px]"
                  />
                </div>

                <div className="flex items-start space-x-2">
                  <input type="checkbox" className="mt-1" required />
                  <label className="text-sm text-gray-600">
                    I agree to receive communications about TrustVerify enterprise solutions and understand I can unsubscribe at any time.
                  </label>
                </div>
                
                <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 py-3">
                  Request Enterprise Demo
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Enterprise Sales Team */}
          <div className="space-y-8">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Enterprise Sales Team</CardTitle>
                <CardDescription>Dedicated specialists for enterprise customers</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Enterprise Sales</p>
                    <p className="text-sm text-gray-600">enterprise@trustverify.io</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Enterprise Hotline</p>
                    <p className="text-sm text-gray-600">+1 (555) 123-ENTERPRISE</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">Response Time</p>
                    <p className="text-sm text-gray-600">Within 4 hours during business days</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-lg bg-blue-50">
              <CardHeader>
                <CardTitle className="text-xl">Enterprise Pricing</CardTitle>
                <CardDescription>Custom pricing for your organization</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Custom API Limits</span>
                    <span className="font-semibold">Included</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dedicated Support</span>
                    <span className="font-semibold">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>SLA Guarantee</span>
                    <span className="font-semibold">99.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Implementation</span>
                    <span className="font-semibold">Assisted</span>
                  </div>
                </div>
                <div className="mt-6 pt-4 border-t">
                  <p className="text-center text-gray-600 text-sm">
                    Volume-based pricing starting at £2,500/month
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl py-16 px-8 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Scale Your Fraud Prevention?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Join hundreds of enterprises protecting billions in transactions with TrustVerify's 
            enterprise-grade fraud prevention platform.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4">
              Schedule Demo Today
            </Button>
            <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4">
              View Enterprise Features
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
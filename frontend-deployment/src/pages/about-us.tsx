import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { LegalDisclaimer } from "@/components/LegalDisclaimer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Globe, Award, Target, Heart } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Shield className="h-16 w-16 mx-auto mb-6 text-blue-300" />
          <h1 className="text-5xl font-bold mb-6">About TrustVerify</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            We're building the future of secure transactions through innovative fraud prevention, 
            identity verification, and escrow services that protect businesses and individuals worldwide.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                To create a world where every transaction is secure, transparent, and trustworthy. 
                We empower businesses and individuals with cutting-edge fraud prevention technology 
                that makes digital commerce safer for everyone.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 leading-relaxed">
                To be the global standard for trust and security in digital transactions. 
                We envision a future where fraud is eliminated through intelligent prevention 
                systems and verified identities.
              </p>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader className="text-center">
              <Heart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <CardTitle className="text-2xl">Our Values</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="text-gray-600 space-y-2">
                <li>• Transparency in all operations</li>
                <li>• Security-first approach</li>
                <li>• Customer-centric innovation</li>
                <li>• Ethical business practices</li>
                <li>• Global accessibility</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Company Story */}
        <Card className="shadow-lg mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-4">Our Story</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 leading-relaxed">
              Founded in 2025, TrustVerify was born from a simple observation: traditional fraud prevention 
              methods were failing to keep pace with increasingly sophisticated cyber threats. Our founders, 
              veterans of the cybersecurity and fintech industries, recognized the need for a comprehensive 
              platform that could provide real-time fraud detection, identity verification, and secure 
              transaction management.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Starting with a dedicated team of security experts and engineers, we have developed advanced AI-powered 
              fraud detection algorithms. As a newly launched platform, we're building our customer base and 
              preparing to protect businesses globally with cutting-edge security technology.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our platform has evolved to include comprehensive identity verification, secure escrow services, 
              and advanced risk intelligence, making us a one-stop solution for transaction security and trust.
            </p>
          </CardContent>
        </Card>

        {/* Development Goals */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Goals & Vision</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">Launch</div>
              <div className="text-gray-600">2025 Platform Launch</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">AI-First</div>
              <div className="text-gray-600">Advanced Detection</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">Global</div>
              <div className="text-gray-600">Worldwide Coverage</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">Trusted</div>
              <div className="text-gray-600">Security Platform</div>
            </div>
          </div>
        </div>

        {/* Leadership */}
        <Card className="shadow-lg mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-8">Leadership</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <div className="text-center max-w-md">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-full mx-auto mb-6 flex items-center justify-center">
                  <Shield className="h-16 w-16 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-gray-900">CEO & Founder</h3>
                <p className="text-lg text-blue-600 font-semibold mb-4">Leading TrustVerify's Vision</p>
                <div className="bg-gray-50 rounded-lg p-6 text-left">
                  <p className="text-gray-700 leading-relaxed mb-4">
                    With over 6 years of extensive experience as an IT consultant, our founder brings deep technical expertise 
                    and industry insights to TrustVerify's innovative fraud prevention platform.
                  </p>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span>6+ years IT consulting experience</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span>Enterprise security solutions specialist</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span>Technology innovation leader</span>
                    </div>
                    <div className="flex items-center">
                      <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                      <span>Fraud prevention platform architect</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Global Presence */}
        <Card className="shadow-lg mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-4">Global Presence</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-1 gap-8">
              <div className="text-center">
                <h3 className="text-xl font-semibold mb-4">Headquarters</h3>
                <p className="text-gray-600">Newcastle upon Tyne, UK</p>
                <p className="text-sm text-gray-500 mt-2">15 Grey Street, Newcastle upon Tyne NE1 6EE</p>
                <p className="text-sm text-gray-500">Innovation hub and executive offices</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Certifications and Compliance */}
        <Card className="shadow-lg">
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-8">Certifications & Compliance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold">SOC 2 Type II</div>
                <div className="text-sm text-gray-600">Security & Availability</div>
              </div>
              <div>
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold">ISO 27001</div>
                <div className="text-sm text-gray-600">Information Security</div>
              </div>
              <div>
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold">PCI DSS</div>
                <div className="text-sm text-gray-600">Payment Security</div>
              </div>
              <div>
                <Award className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                <div className="font-semibold">GDPR</div>
                <div className="text-sm text-gray-600">Data Privacy</div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Legal Disclaimer */}
        <div className="mt-16">
          <LegalDisclaimer variant="compact" />
        </div>
      </div>

      <Footer />
    </div>
  );
}
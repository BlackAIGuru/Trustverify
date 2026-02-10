import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, Globe, Heart, Code, Shield, Zap, Coffee } from "lucide-react";

export default function Careers() {
  const openPositions = [
    {
      title: "Senior Security Engineer",
      department: "Engineering",
      location: "San Francisco, CA / Remote",
      type: "Full-time",
      description: "Lead the development of our next-generation fraud detection systems and security infrastructure."
    },
    {
      title: "Product Manager - Identity Verification",
      department: "Product",
      location: "London, UK / Remote",
      type: "Full-time",
      description: "Drive product strategy for our KYC and identity verification platform serving global markets."
    },
    {
      title: "Data Scientist - ML/AI",
      department: "Engineering",
      location: "San Francisco, CA",
      type: "Full-time",
      description: "Build and optimize machine learning models for real-time fraud detection and risk assessment."
    },
    {
      title: "Customer Success Manager",
      department: "Customer Success",
      location: "Toronto, Canada / Remote",
      type: "Full-time",
      description: "Ensure enterprise clients achieve maximum value from TrustVerify's fraud prevention solutions."
    },
    {
      title: "DevOps Engineer",
      department: "Engineering",
      location: "Berlin, Germany / Remote",
      type: "Full-time",
      description: "Scale our global infrastructure and maintain 99.9% uptime for mission-critical security services."
    },
    {
      title: "Compliance Specialist",
      department: "Legal & Compliance",
      location: "Singapore / Remote",
      type: "Full-time",
      description: "Navigate complex regulatory requirements and ensure compliance across international markets."
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: "Health & Wellness",
      description: "Comprehensive health, dental, and vision insurance. Mental health support and wellness programs."
    },
    {
      icon: Globe,
      title: "Remote-First Culture",
      description: "Work from anywhere with flexible hours. Home office setup allowance and co-working stipends."
    },
    {
      icon: Code,
      title: "Learning & Development",
      description: "Annual learning budget, conference attendance, certification reimbursements, and mentorship programs."
    },
    {
      icon: Coffee,
      title: "Work-Life Balance",
      description: "Unlimited PTO, parental leave, sabbatical options, and company-wide mental health days."
    },
    {
      icon: Zap,
      title: "Equity & Compensation",
      description: "Competitive salary, equity participation, performance bonuses, and annual compensation reviews."
    },
    {
      icon: Users,
      title: "Team Building",
      description: "Regular team retreats, virtual social events, and opportunities to connect with global colleagues."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Briefcase className="h-16 w-16 mx-auto mb-6 text-blue-300" />
          <h1 className="text-5xl font-bold mb-6">Join Our Mission</h1>
          <p className="text-xl text-blue-100 leading-relaxed mb-8">
            Help us build the future of secure transactions. Join a team of world-class engineers, 
            product leaders, and security experts working to eliminate fraud and create trust in digital commerce.
          </p>
          <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4">
            View Open Positions
          </Button>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Why TrustVerify */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Why TrustVerify?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Meaningful Impact</h3>
              <p className="text-gray-600">Protect billions in transactions and help create a safer digital world.</p>
            </div>
            <div className="text-center">
              <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">World-Class Team</h3>
              <p className="text-gray-600">Work alongside experts from Google, PayPal, Stripe, and leading security firms.</p>
            </div>
            <div className="text-center">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Cutting-Edge Technology</h3>
              <p className="text-gray-600">Build with the latest AI/ML, security, and cloud technologies at scale.</p>
            </div>
            <div className="text-center">
              <Globe className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">Global Reach</h3>
              <p className="text-gray-600">Your work impacts users and businesses across 195+ countries worldwide.</p>
            </div>
          </div>
        </div>

        {/* Benefits & Perks */}
        <Card className="shadow-lg mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-8">Benefits & Perks</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <benefit.icon className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Open Positions */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">Open Positions</h2>
          <div className="space-y-6">
            {openPositions.map((position, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center mb-2">
                        <h3 className="text-xl font-semibold text-gray-900 mr-4">{position.title}</h3>
                        <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {position.department}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 text-gray-800 rounded-full text-sm">
                            {position.type}
                          </span>
                        </div>
                      </div>
                      <p className="text-gray-600 mb-2">{position.location}</p>
                      <p className="text-gray-700">{position.description}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <Button className="bg-blue-600 hover:bg-blue-700">
                        Apply Now
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Culture & Values */}
        <Card className="shadow-lg mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-8">Our Culture</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <p className="text-gray-600 text-center leading-relaxed">
              At TrustVerify, we believe that diverse teams build better products. We're committed to creating 
              an inclusive environment where everyone can do their best work and grow their careers.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold mb-4">Diversity & Inclusion</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Equal opportunity employer committed to diversity</li>
                  <li>• Employee resource groups and mentorship programs</li>
                  <li>• Inclusive hiring practices and bias training</li>
                  <li>• Support for underrepresented communities in tech</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-xl font-semibold mb-4">Professional Growth</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Clear career progression paths and regular reviews</li>
                  <li>• Internal mobility and cross-functional opportunities</li>
                  <li>• Technical and leadership development programs</li>
                  <li>• External conference speaking and thought leadership</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Application Process */}
        <Card className="shadow-lg mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-8">Application Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h4 className="font-semibold mb-2">Apply</h4>
                <p className="text-sm text-gray-600">Submit your application and resume through our careers portal</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h4 className="font-semibold mb-2">Screen</h4>
                <p className="text-sm text-gray-600">Initial phone/video call with our talent team to discuss your background</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h4 className="font-semibold mb-2">Interview</h4>
                <p className="text-sm text-gray-600">Technical and behavioral interviews with team members and leaders</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-blue-600 font-bold">4</span>
                </div>
                <h4 className="font-semibold mb-2">Offer</h4>
                <p className="text-sm text-gray-600">Reference checks, offer discussion, and welcome to the team!</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Contact */}
        <div className="text-center bg-blue-50 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ready to Join Us?</h2>
          <p className="text-gray-600 mb-6">
            Don't see a perfect fit? We're always looking for exceptional talent. 
            Send us your resume and tell us how you'd like to contribute.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
              Browse All Positions
            </Button>
            <Button variant="outline" size="lg">
              Contact Talent Team
            </Button>
          </div>
          <div className="mt-6 text-sm text-gray-500">
            <p>Email: careers@trustverify.io</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
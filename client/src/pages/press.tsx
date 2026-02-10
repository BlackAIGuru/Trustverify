import { Navigation } from "@/components/navigation";
import { Footer } from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Newspaper, Download, Calendar, Award, Users, TrendingUp } from "lucide-react";

export default function Press() {
  const pressReleases = [
    {
      date: "August 18, 2025",
      title: "TrustVerify Announces Platform Launch with Next-Generation Fraud Prevention Technology",
      summary: "Newcastle-based fintech startup launches comprehensive fraud detection and escrow platform with AI-powered transaction security.",
      category: "Launch"
    },
    {
      date: "August 10, 2025",
      title: "TrustVerify Completes Beta Testing Program with Early Enterprise Partners",
      summary: "Successfully validates platform capabilities with select UK financial institutions ahead of public launch.",
      category: "Product"
    },
    {
      date: "July 25, 2025",
      title: "TrustVerify Establishes UK Headquarters in Newcastle upon Tyne",
      summary: "Company establishes operations at 15 Grey Street, Newcastle upon Tyne to serve UK and global markets.",
      category: "Company"
    },
    {
      date: "July 15, 2025",
      title: "TrustVerify Announces Global Coverage Ready for International Fraud Prevention",
      summary: "Platform designed to support worldwide fraud detection and transaction protection across all major currencies.",
      category: "Technology"
    },
    {
      date: "June 30, 2025",
      title: "TrustVerify Founded to Address Growing Global Fraud Prevention Needs",
      summary: "New company founded with mission to provide end-to-end fraud detection and resolution services.",
      category: "Founding"
    }
  ];

  const awards = [
    {
      year: "2025",
      award: "Tech Nation Cyber Rising Star",
      organization: "Tech Nation UK",
      description: "Selected as emerging cybersecurity company showing exceptional promise in fraud prevention innovation."
    },
    {
      year: "2025",
      award: "Newcastle Business Innovation Award",
      organization: "Newcastle City Council",
      description: "Recognised for bringing cutting-edge fintech innovation to North East England."
    },
    {
      year: "2025",
      award: "UK Fintech Startup to Watch",
      organization: "FinTech Magazine",
      description: "Listed among the most promising new fintech companies launching in 2025."
    },
    {
      year: "2025",
      award: "Cyber Security Excellence - Emerging Company",
      organization: "Cyber Security Awards",
      description: "Recognised for innovative approach to comprehensive fraud prevention and resolution."
    }
  ];

  const mediaKit = [
    {
      name: "Company Logo Package",
      description: "High-resolution logos in various formats (PNG, SVG, EPS)",
      size: "2.1 MB"
    },
    {
      name: "Executive Headshots",
      description: "Professional photos of leadership team",
      size: "8.5 MB"
    },
    {
      name: "Product Screenshots",
      description: "Platform interface and dashboard images",
      size: "12.3 MB"
    },
    {
      name: "Company Fact Sheet",
      description: "Key statistics and company information",
      size: "245 KB"
    },
    {
      name: "Brand Guidelines",
      description: "Logo usage, colors, and brand standards",
      size: "1.8 MB"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-900 to-indigo-900 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <Newspaper className="h-16 w-16 mx-auto mb-6 text-blue-300" />
          <h1 className="text-5xl font-bold mb-6">Press & Media</h1>
          <p className="text-xl text-blue-100 leading-relaxed">
            Stay updated with the latest news, announcements, and insights from TrustVerify. 
            Access our media resources and connect with our press team.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Launch Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">2025</div>
            <div className="text-gray-600">Platform Launch Year</div>
          </div>
          <div className="text-center">
            <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">Newcastle</div>
            <div className="text-gray-600">UK Headquarters</div>
          </div>
          <div className="text-center">
            <Award className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">Global</div>
            <div className="text-gray-600">Coverage Ready</div>
          </div>
          <div className="text-center">
            <Calendar className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-gray-900 mb-2">24/7</div>
            <div className="text-gray-600">Fraud Protection</div>
          </div>
        </div>

        {/* Recent Press Releases */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Recent Press Releases</h2>
          <div className="space-y-6">
            {pressReleases.map((release, index) => (
              <Card key={index} className="shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-500 mr-4">{release.date}</span>
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                          {release.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{release.title}</h3>
                      <p className="text-gray-600">{release.summary}</p>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6">
                      <Button variant="outline">Read More</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Awards & Recognition */}
        <Card className="shadow-lg mb-16">
          <CardHeader>
            <CardTitle className="text-3xl text-center mb-8">Awards & Recognition</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {awards.map((award, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <div className="text-lg font-semibold text-gray-900">{award.award}</div>
                    <div className="text-blue-600 font-medium">{award.organization} - {award.year}</div>
                    <p className="text-sm text-gray-600 mt-1">{award.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Media Kit */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center">
                <Download className="h-6 w-6 mr-2 text-blue-600" />
                Media Kit
              </CardTitle>
              <CardDescription>Download our press materials and brand assets</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {mediaKit.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-xs text-gray-500">{item.size}</span>
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
              
              <div className="pt-4 border-t">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  Download Complete Media Kit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Press Contacts */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl">Press Contacts</CardTitle>
              <CardDescription>Connect with our media relations team</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">General Media Inquiries</h3>
                <p className="text-gray-600 mb-2">Sarah Martinez<br />Head of Communications</p>
                <p className="text-sm text-gray-500">Email: press@trustverify.io</p>
                <p className="text-sm text-gray-500">Phone: +44 20 7123 4567</p>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Product & Technology</h3>
                <p className="text-gray-600 mb-2">Dr. Alex Chen<br />VP of Product Marketing</p>
                <p className="text-sm text-gray-500">Email: product-media@trustverify.io</p>
                <p className="text-sm text-gray-500">Phone: +44 20 7123 4567</p>
              </div>
              
              <div className="border-b pb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Executive Interviews</h3>
                <p className="text-gray-600 mb-2">Jennifer Walsh<br />Executive Communications</p>
                <p className="text-sm text-gray-500">Email: executives@trustverify.io</p>
                <p className="text-sm text-gray-500">Phone: +44 20 7123 4567</p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">International Media</h3>
                <p className="text-gray-600 mb-2">Global Press Relations Team</p>
                <p className="text-sm text-gray-500">Email: international-press@trustverify.io</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Press Guidelines */}
        <Card className="shadow-lg mt-16">
          <CardHeader>
            <CardTitle className="text-2xl">Press Guidelines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-3">Media Response Times</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Breaking news inquiries: Within 2 hours</li>
                  <li>• General media requests: Within 24 hours</li>
                  <li>• Interview requests: Within 48 hours</li>
                  <li>• Background information: Same day</li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-3">Brand Usage</h4>
                <ul className="space-y-2 text-gray-600">
                  <li>• Please use "TrustVerify" in all references</li>
                  <li>• Download official logos from our media kit</li>
                  <li>• Follow brand guidelines for logo usage</li>
                  <li>• Contact us for custom brand requests</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Newsletter Signup */}
        <Card className="shadow-lg mt-16 bg-blue-50">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Stay Updated</h2>
            <p className="text-gray-600 mb-6">
              Subscribe to our press newsletter for the latest announcements and company news.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <Button className="bg-blue-600 hover:bg-blue-700 px-6">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Footer />
    </div>
  );
}
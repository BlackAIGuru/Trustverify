import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Shield, 
  Award, 
  BookOpen, 
  Users, 
  Star,
  ArrowRight,
  Clock,
  CheckCircle,
  PlayCircle,
  FileText,
  Trophy,
  Brain,
  Target,
  ChevronRight,
  Globe,
  Building2
} from "lucide-react";
import { useState } from "react";

export default function FraudAcademy() {
  const { user } = useAuth();
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);

  const courses = [
    {
      id: 1,
      title: "Foundation Level",
      level: "foundation",
      duration: "4-6 hours",
      modules: 5,
      price: "£49",
      yearlyPrice: "£199",
      description: "Essential fraud awareness for everyone",
      features: [
        "Introduction to fraud types and psychology",
        "Basic prevention strategies",
        "Personal security fundamentals",
        "Digital safety basics",
        "Recognition techniques"
      ],
      modules_list: [
        "Understanding Fraud Psychology",
        "Common Scam Types & Red Flags", 
        "Personal Information Protection",
        "Digital Security Basics",
        "Basic Response Strategies"
      ],
      badge: "Essential",
      color: "blue"
    },
    {
      id: 2,
      title: "Intermediate Level",
      level: "intermediate", 
      duration: "6-8 hours",
      modules: 5,
      price: "£99",
      yearlyPrice: "£199",
      description: "Advanced protection strategies and techniques",
      features: [
        "Advanced scam detection methods",
        "Social engineering defense",
        "Investment fraud protection",
        "Business email compromise prevention",
        "Advanced digital security"
      ],
      modules_list: [
        "Social Engineering & Manipulation Tactics",
        "Investment & Financial Fraud",
        "Business Email Compromise (BEC)",
        "Advanced Digital Security",
        "Incident Response & Recovery"
      ],
      badge: "Popular",
      color: "green"
    },
    {
      id: 3,
      title: "Advanced Level", 
      level: "advanced",
      duration: "8-10 hours",
      modules: 5,
      price: "£149",
      yearlyPrice: "£199",
      description: "Professional-grade fraud investigation skills",
      features: [
        "Professional investigation techniques",
        "Legal frameworks and compliance",
        "Advanced threat intelligence",
        "Forensic analysis methods",
        "Case study analysis"
      ],
      modules_list: [
        "Fraud Investigation Techniques",
        "Legal Frameworks & Compliance",
        "Digital Forensics & Evidence",
        "Threat Intelligence Analysis",
        "Professional Case Studies"
      ],
      badge: "Professional",
      color: "purple"
    },
    {
      id: 4,
      title: "Expert Level",
      level: "expert",
      duration: "10-12 hours", 
      modules: 5,
      price: "£199",
      yearlyPrice: "£199",
      description: "Master-level expertise with certification",
      features: [
        "Enterprise fraud management",
        "Advanced analytics and AI",
        "Strategic risk assessment",
        "Team leadership in security",
        "Industry-specific expertise"
      ],
      modules_list: [
        "Enterprise Fraud Management",
        "AI & Machine Learning in Fraud Detection",
        "Strategic Risk Assessment",
        "Leadership in Fraud Prevention",
        "Industry-Specific Applications"
      ],
      badge: "Master",
      color: "amber"
    }
  ];

  const businessPlans = [
    {
      id: "bronze",
      name: "Bronze Business",
      price: "£499",
      employees: "Up to 10",
      features: [
        "Foundation + Intermediate access",
        "Basic team dashboard",
        "Progress tracking",
        "Email support"
      ]
    },
    {
      id: "silver", 
      name: "Silver Business",
      price: "£2,500",
      employees: "Up to 50",
      features: [
        "All course levels",
        "Advanced analytics",
        "Custom training paths",
        "Priority support",
        "Quarterly reviews"
      ],
      badge: "Most Popular"
    },
    {
      id: "gold",
      name: "Gold Business", 
      price: "£9,999",
      employees: "Unlimited",
      features: [
        "Complete platform access",
        "Custom content creation",
        "Dedicated account manager",
        "On-site training options",
        "24/7 support"
      ]
    }
  ];

  const stats = [
    { label: "Early Access Students", value: "150+", icon: Users },
    { label: "Course Modules", value: "20", icon: BookOpen },
    { label: "Beta Completion Rate", value: "89%", icon: Trophy },
    { label: "Preview Rating", value: "4.8/5", icon: Star }
  ];

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'green': return 'bg-green-100 text-green-800';
      case 'purple': return 'bg-purple-100 text-purple-800';  
      case 'amber': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center space-x-3">
                <Shield className="h-8 w-8 text-blue-600" />
                <div>
                  <h1 className="text-xl font-bold text-gray-900">TrustVerify</h1>
                  <p className="text-sm text-gray-500">Fraud Academy</p>
                </div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              {user ? (
                <Link href="/dashboard">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Dashboard
                  </Button>
                </Link>
              ) : (
                <Link href="/auth">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Sign In
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 opacity-95"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-32 h-32 rounded-full bg-blue-400/20 animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 rounded-full bg-purple-400/20 animate-bounce"></div>
          <div className="absolute top-1/2 left-1/3 w-16 h-16 rounded-full bg-teal-400/20 animate-ping"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <Badge className="bg-teal-500/20 text-teal-100 border-teal-500/30 mb-4">
              🎓 Professional Fraud Training
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            TrustVerify
            <span className="block text-teal-400">Fraud Academy</span>
          </h1>
          
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Master fraud prevention with our comprehensive training program. 
            From basic awareness to expert-level investigation skills.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button 
              size="lg"
              className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-3 text-lg font-semibold"
              onClick={() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <GraduationCap className="mr-2 h-5 w-5" />
              Browse Courses
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg"
              onClick={() => document.getElementById('business')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Building2 className="mr-2 h-5 w-5" />
              Business Training
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 mb-2">
                  <stat.icon className="h-6 w-6 text-teal-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                </div>
                <div className="text-sm text-blue-200">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Choose Your Learning Path
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Progressive curriculum designed to take you from beginner to expert in fraud prevention
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {courses.map((course) => (
              <Card 
                key={course.id} 
                className={`relative hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                  selectedLevel === course.level ? 'border-blue-500 shadow-lg' : 'border-gray-200 hover:border-blue-300'
                }`}
                onClick={() => setSelectedLevel(selectedLevel === course.level ? null : course.level)}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge className={getBadgeColor(course.color)}>
                      {course.badge}
                    </Badge>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900">{course.price}</div>
                      <div className="text-xs text-gray-500">or {course.yearlyPrice}/year</div>
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 mb-2">
                    {course.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {course.duration}
                    </div>
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-1" />
                      {course.modules} modules
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="space-y-3 mb-6">
                    {course.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {selectedLevel === course.level && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h4 className="font-semibold text-gray-900 mb-3">Course Modules:</h4>
                      <div className="space-y-2">
                        {course.modules_list.map((module, index) => (
                          <div key={index} className="flex items-center space-x-2">
                            <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-xs font-semibold">
                              {index + 1}
                            </div>
                            <span className="text-sm text-gray-700">{module}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                    onClick={(e) => {
                      e.stopPropagation();
                      if (user) {
                        window.location.href = `/enroll/${course.level}`;
                      } else {
                        window.location.href = '/auth';
                      }
                    }}
                  >
                    {user ? 'Enroll Now' : 'Sign Up to Enroll'}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-blue-50 rounded-lg p-6 inline-block">
              <Trophy className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold text-gray-900 mb-2">Full Access Pass</h3>
              <p className="text-gray-600 mb-4">Get access to all courses for one year</p>
              <div className="text-3xl font-bold text-blue-600 mb-2">£199/year</div>
              <p className="text-sm text-gray-500">Save up to £300 compared to individual courses</p>
            </div>
          </div>
        </div>
      </section>

      {/* Business Plans Section */}
      <section id="business" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Business Training Plans
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive fraud prevention training for your entire team
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {businessPlans.map((plan) => (
              <Card key={plan.id} className="relative">
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-teal-500 text-white">
                      {plan.badge}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </CardTitle>
                  <div className="text-4xl font-bold text-blue-600 mb-2">{plan.price}</div>
                  <p className="text-gray-600">{plan.employees} employees</p>
                </CardHeader>

                <CardContent>
                  <div className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button 
                    className="w-full bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      window.location.href = '/contact?plan=' + plan.id;
                    }}
                  >
                    Contact Sales
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to Become Fraud-Resilient?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of professionals who trust TrustVerify for their fraud prevention education
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg font-semibold"
              onClick={() => {
                if (user) {
                  window.location.href = '/lms/dashboard';
                } else {
                  window.location.href = '/auth';
                }
              }}
            >
              Start Learning Today
              <GraduationCap className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg"
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
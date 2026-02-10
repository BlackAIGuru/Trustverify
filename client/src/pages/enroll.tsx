import { useAuth } from "@/hooks/use-auth";
import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  GraduationCap, 
  Shield, 
  BookOpen, 
  Clock,
  CheckCircle,
  ArrowRight,
  Brain,
  Target,
  Trophy,
  CreditCard,
  Lock,
  Star
} from "lucide-react";
import { useState } from "react";

export default function EnrollPage() {
  const { user } = useAuth();
  const params = useParams();
  const courseLevel = params.level;
  const [isEnrolling, setIsEnrolling] = useState(false);

  const courseData = {
    foundation: {
      title: "Foundation Level",
      price: "£49",
      yearlyPrice: "£199",
      duration: "4-6 hours",
      modules: 5,
      description: "Essential fraud awareness for everyone",
      features: [
        "Introduction to fraud types and psychology",
        "Basic prevention strategies", 
        "Personal security fundamentals",
        "Digital safety basics",
        "Recognition techniques"
      ],
      badge: "Essential",
      color: "blue",
      icon: BookOpen
    },
    intermediate: {
      title: "Intermediate Level",
      price: "£99", 
      yearlyPrice: "£199",
      duration: "6-8 hours",
      modules: 5,
      description: "Advanced protection strategies and techniques",
      features: [
        "Advanced scam detection methods",
        "Social engineering defense",
        "Investment fraud protection", 
        "Business email compromise prevention",
        "Advanced digital security"
      ],
      badge: "Popular",
      color: "green",
      icon: Target
    },
    advanced: {
      title: "Advanced Level",
      price: "£149",
      yearlyPrice: "£199", 
      duration: "8-10 hours",
      modules: 5,
      description: "Professional-grade fraud investigation skills",
      features: [
        "Professional investigation techniques",
        "Legal frameworks and compliance",
        "Advanced threat intelligence",
        "Forensic analysis methods",
        "Case study analysis"
      ],
      badge: "Professional",
      color: "purple",
      icon: Brain
    },
    expert: {
      title: "Expert Level",
      price: "£199",
      yearlyPrice: "£199",
      duration: "10-12 hours",
      modules: 5, 
      description: "Master-level expertise with certification",
      features: [
        "Enterprise fraud management",
        "Advanced analytics and AI",
        "Strategic risk assessment",
        "Team leadership in security",
        "Industry-specific expertise"
      ],
      badge: "Master",
      color: "amber",
      icon: Trophy
    }
  };

  const course = courseData[courseLevel as keyof typeof courseData];

  if (!course) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Not Found</h2>
            <p className="text-gray-600 mb-6">The course you're looking for doesn't exist.</p>
            <Link href="/fraud-academy">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Browse All Courses
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Sign In Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to enroll in courses.</p>
            <Link href="/auth">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Sign In to Continue
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleEnrollment = async () => {
    setIsEnrolling(true);
    
    // Simulate enrollment process
    setTimeout(() => {
      setIsEnrolling(false);
      // Redirect to course or dashboard
      window.location.href = `/course/${courseLevel}`;
    }, 2000);
  };

  const getBadgeColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-800';
      case 'green': return 'bg-green-100 text-green-800';
      case 'purple': return 'bg-purple-100 text-purple-800';  
      case 'amber': return 'bg-amber-100 text-amber-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getButtonColor = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-600 hover:bg-blue-700';
      case 'green': return 'bg-green-600 hover:bg-green-700';
      case 'purple': return 'bg-purple-600 hover:bg-purple-700';  
      case 'amber': return 'bg-amber-600 hover:bg-amber-700';
      default: return 'bg-gray-600 hover:bg-gray-700';
    }
  };

  const IconComponent = course.icon;

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
                  <p className="text-sm text-gray-500">Course Enrollment</p>
                </div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/fraud-academy">
                <Button variant="outline">
                  ← Back to Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Course Details */}
          <div>
            <div className="mb-6">
              <Badge className={getBadgeColor(course.color)}>
                {course.badge}
              </Badge>
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              {course.title}
            </h1>
            
            <p className="text-xl text-gray-600 mb-8">
              {course.description}
            </p>

            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-semibold text-gray-900">{course.duration}</div>
                  <div className="text-sm text-gray-500">Duration</div>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <BookOpen className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="font-semibold text-gray-900">{course.modules} modules</div>
                  <div className="text-sm text-gray-500">Content</div>
                </div>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">What You'll Learn</h3>
              <div className="space-y-3">
                {course.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-2">Course Access</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  Lifetime access to course content
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  Downloadable resources and handouts
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  Interactive quizzes and assessments
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 text-blue-600 mr-2" />
                  Certificate of completion
                </div>
              </div>
            </div>
          </div>

          {/* Enrollment Card */}
          <div>
            <Card className="sticky top-8">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center">
                  <IconComponent className="h-8 w-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl">{course.title}</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-gray-900 mb-2">{course.price}</div>
                  <div className="text-sm text-gray-500">
                    One-time payment or {course.yearlyPrice}/year for all courses
                  </div>
                </div>

                <div className="space-y-4">
                  <Button 
                    size="lg"
                    className={`w-full ${getButtonColor(course.color)} text-lg font-semibold`}
                    onClick={handleEnrollment}
                    disabled={isEnrolling}
                  >
                    {isEnrolling ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Enrolling...
                      </>
                    ) : (
                      <>
                        <CreditCard className="mr-2 h-5 w-5" />
                        Enroll Now - {course.price}
                      </>
                    )}
                  </Button>

                  <div className="text-center">
                    <div className="text-sm text-gray-500 mb-2">Or save with annual plan</div>
                    <Button 
                      variant="outline"
                      size="lg"
                      className="w-full"
                      onClick={() => window.location.href = '/pricing'}
                    >
                      All Access Pass - £199/year
                      <Badge className="ml-2 bg-red-100 text-red-800">Save £300</Badge>
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                    <Lock className="h-4 w-4" />
                    <span>Secure payment with 30-day money-back guarantee</span>
                  </div>
                </div>

                <div className="bg-gray-50 rounded-lg p-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Why Choose This Course?</h4>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-yellow-500 mr-2" />
                      Early access preview rating: 4.8/5
                    </div>
                    <div className="flex items-center">
                      <GraduationCap className="h-4 w-4 text-blue-500 mr-2" />
                      89% of beta students completed successfully
                    </div>
                    <div className="flex items-center">
                      <Trophy className="h-4 w-4 text-purple-500 mr-2" />
                      Professional certification included
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
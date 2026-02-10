import { useAuth } from "@/hooks/use-auth";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Building2,
  TrendingUp,
  Calendar
} from "lucide-react";
import { useState } from "react";

export default function LmsDashboard() {
  const { user } = useAuth();

  const enrolledCourses = [
    {
      id: 1,
      title: "Foundation Level",
      level: "foundation",
      progress: 60,
      modules: 5,
      completedModules: 3,
      estimatedCompletion: "2 hours remaining",
      status: "in_progress",
      nextModule: "Digital Security Basics",
      color: "blue"
    },
    {
      id: 2,
      title: "Intermediate Level", 
      level: "intermediate",
      progress: 0,
      modules: 5,
      completedModules: 0,
      estimatedCompletion: "6-8 hours",
      status: "not_started",
      nextModule: "Social Engineering & Manipulation Tactics",
      color: "green"
    }
  ];

  const availableCourses = [
    {
      id: 3,
      title: "Advanced Level",
      level: "advanced", 
      price: "£149",
      modules: 5,
      description: "Professional-grade fraud investigation skills",
      color: "purple"
    },
    {
      id: 4,
      title: "Expert Level",
      level: "expert",
      price: "£199", 
      modules: 5,
      description: "Master-level expertise with certification",
      color: "amber"
    }
  ];

  const achievements = [
    { name: "First Steps", description: "Completed first module", earned: true },
    { name: "Foundation Builder", description: "50% progress in Foundation", earned: true },
    { name: "Knowledge Seeker", description: "Completed 3 modules", earned: true },
    { name: "Fraud Fighter", description: "Complete Foundation Level", earned: false }
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

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to access your learning dashboard.</p>
            <Link href="/auth">
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Sign In
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

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
                  <p className="text-sm text-gray-500">Learning Dashboard</p>
                </div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Welcome, {user.username}</span>
              <Link href="/fraud-academy">
                <Button variant="outline">
                  Browse Courses
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user.username}!
          </h1>
          <p className="text-gray-600">Continue your fraud prevention training journey</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Courses */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Courses</h2>
              
              <div className="space-y-6">
                {enrolledCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <div className={`w-12 h-12 rounded-lg ${course.color === 'blue' ? 'bg-blue-100' : 'bg-green-100'} flex items-center justify-center`}>
                            <BookOpen className={`h-6 w-6 ${course.color === 'blue' ? 'text-blue-600' : 'text-green-600'}`} />
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900">{course.title}</h3>
                            <p className="text-gray-600">
                              {course.completedModules}/{course.modules} modules completed
                            </p>
                          </div>
                        </div>
                        <Badge className={getBadgeColor(course.color)}>
                          {course.status === 'in_progress' ? 'In Progress' : 'Not Started'}
                        </Badge>
                      </div>

                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                          <span>Progress</span>
                          <span>{course.progress}%</span>
                        </div>
                        <Progress value={course.progress} className="h-2" />
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-1" />
                              {course.estimatedCompletion}
                            </div>
                            {course.status === 'in_progress' && (
                              <div className="flex items-center">
                                <PlayCircle className="h-4 w-4 mr-1" />
                                Next: {course.nextModule}
                              </div>
                            )}
                          </div>
                        </div>
                        <Button 
                          className={`${course.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
                          onClick={() => {
                            window.location.href = `/course/${course.level}`;
                          }}
                        >
                          {course.status === 'in_progress' ? 'Continue' : 'Start Course'}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Available Courses */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Available Courses</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {availableCourses.map((course) => (
                  <Card key={course.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <div className={`w-10 h-10 rounded-lg ${course.color === 'purple' ? 'bg-purple-100' : 'bg-amber-100'} flex items-center justify-center`}>
                          {course.color === 'purple' ? (
                            <Brain className="h-5 w-5 text-purple-600" />
                          ) : (
                            <Trophy className="h-5 w-5 text-amber-600" />
                          )}
                        </div>
                        <div className="text-2xl font-bold text-gray-900">{course.price}</div>
                      </div>
                      
                      <h3 className="text-lg font-bold text-gray-900 mb-2">{course.title}</h3>
                      <p className="text-gray-600 text-sm mb-4">{course.description}</p>
                      
                      <div className="flex items-center text-sm text-gray-500 mb-4">
                        <BookOpen className="h-4 w-4 mr-1" />
                        {course.modules} modules
                      </div>

                      <Button 
                        className="w-full bg-gray-600 hover:bg-gray-700"
                        onClick={() => {
                          window.location.href = `/enroll/${course.level}`;
                        }}
                      >
                        Enroll Now
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Study Stats */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-1">30%</div>
                  <div className="text-sm text-gray-600">Overall Progress</div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Modules Completed</span>
                    <span className="font-semibold">3/10</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Study Time</span>
                    <span className="font-semibold">4.5 hours</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Certificates Earned</span>
                    <span className="font-semibold">0</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="h-5 w-5 mr-2" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      achievement.earned ? 'bg-yellow-100' : 'bg-gray-100'
                    }`}>
                      <Award className={`h-4 w-4 ${
                        achievement.earned ? 'text-yellow-600' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className={`font-semibold text-sm ${
                        achievement.earned ? 'text-gray-900' : 'text-gray-500'
                      }`}>
                        {achievement.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {achievement.description}
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/fraud-academy'}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Browse All Courses
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/certificates'}
                >
                  <Trophy className="h-4 w-4 mr-2" />
                  View Certificates
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={() => window.location.href = '/contact'}
                >
                  <Users className="h-4 w-4 mr-2" />
                  Get Help
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
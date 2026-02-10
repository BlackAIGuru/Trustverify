import { useAuth } from "@/hooks/use-auth";
import { Link, useParams, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { VideoLessonPlayer } from "@/components/video-lesson-player";
import { 
  Shield, 
  BookOpen, 
  CheckCircle,
  PlayCircle,
  Lock,
  ArrowRight,
  ArrowLeft,
  Clock,
  Award,
  Users,
  Star,
  MessageSquare,
  Download,
  Home,
  ChevronRight,
  FileDown,
  FileText,
  ClipboardCheck
} from "lucide-react";
import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";

export default function CoursePage() {
  const { user } = useAuth();
  const params = useParams();
  const [, setLocation] = useLocation();
  const courseLevel = params.courseLevel;
  const [selectedLesson, setSelectedLesson] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<Record<string, number>>({});
  const { toast } = useToast();

  // Check course access on component mount
  useEffect(() => {
    const checkAccess = async () => {
      if (!user || !courseLevel) return;
      
      try {
        const response = await fetch(`/api/course-access/${courseLevel}`, {
          credentials: 'include'
        });
        
        if (response.ok) {
          const accessData = await response.json();
          console.log('Course access:', accessData);
        }
      } catch (error) {
        console.error('Error checking course access:', error);
      }
    };
    
    checkAccess();
  }, [user, courseLevel]);

  // Handle material downloads with access control
  const handleMaterialDownload = async (materialType: string) => {
    try {
      const response = await fetch(`/api/additional-materials/${courseLevel}/${materialType}`, {
        method: 'GET',
        credentials: 'include'
      });

      if (!response.ok) {
        if (response.status === 403) {
          const errorData = await response.json();
          toast({
            title: "Access Required",
            description: errorData.message || "Please purchase this course to access materials.",
            variant: "destructive",
          });
          return;
        }
        throw new Error('Download failed');
      }

      // Create download link
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const filename = response.headers.get('content-disposition')?.split('filename=')[1]?.replace(/"/g, '') || 
                      `${courseLevel}-${materialType}.${materialType === 'worksheets' ? 'pdf' : 'zip'}`;
      
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: "Download Started",
        description: `${materialType.charAt(0).toUpperCase() + materialType.slice(1)} downloaded successfully!`,
      });

    } catch (error) {
      console.error('Download error:', error);
      toast({
        title: "Download Failed",
        description: "Unable to download materials. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Course data structure
  const courseData = {
    foundation: {
      title: "Foundation Level",
      description: "Essential fraud awareness for everyone",
      duration: "4-6 hours",
      modules: 5,
      color: "blue",
      progress: 60,
      modules_list: [
        {
          id: "module-1",
          title: "Understanding Fraud Psychology",
          lessons: [
            {
              id: "lesson-1-1",
              title: "Introduction to Fraud Types",
              description: "Learn about the most common types of fraud and how they operate in today's digital world.",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
              duration: "12 minutes",
              handoutUrl: "/api/course-materials/foundation/fraud-types-guide.pdf",
              completed: true
            },
            {
              id: "lesson-1-2", 
              title: "Psychology Behind Fraud",
              description: "Understand the psychological tactics fraudsters use to manipulate victims.",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
              duration: "15 minutes",
              handoutUrl: "/api/course-materials/foundation/fraud-psychology.pdf",
              completed: true
            }
          ],
          completed: true,
          progress: 100
        },
        {
          id: "module-2",
          title: "Common Scam Types & Red Flags",
          lessons: [
            {
              id: "lesson-2-1",
              title: "Email and Phishing Scams",
              description: "Identify and avoid email-based fraud attempts and phishing attacks.",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4", 
              duration: "18 minutes",
              handoutUrl: "/api/course-materials/foundation/phishing-guide.pdf",
              completed: true
            },
            {
              id: "lesson-2-2",
              title: "Phone and SMS Scams",
              description: "Recognize fraudulent phone calls and text message scams.",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
              duration: "14 minutes", 
              handoutUrl: "/api/course-materials/foundation/phone-scam-checklist.pdf",
              completed: false
            }
          ],
          completed: false,
          progress: 50
        },
        {
          id: "module-3",
          title: "Personal Information Protection",
          lessons: [
            {
              id: "lesson-3-1",
              title: "Identity Theft Prevention",
              description: "Protect your personal information from identity thieves.",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
              duration: "20 minutes",
              handoutUrl: "/api/course-materials/foundation/identity-protection.pdf",
              completed: false
            }
          ],
          completed: false,
          progress: 0
        },
        {
          id: "module-4", 
          title: "Digital Security Basics",
          lessons: [
            {
              id: "lesson-4-1",
              title: "Password Security Best Practices",
              description: "Create and manage secure passwords effectively.",
              videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4",
              duration: "16 minutes",
              handoutUrl: "/api/course-materials/foundation/password-security.pdf",
              completed: false
            }
          ],
          completed: false,
          progress: 0
        },
        {
          id: "module-5",
          title: "Basic Response Strategies", 
          lessons: [
            {
              id: "lesson-5-1",
              title: "What to Do If You're Targeted",
              description: "Step-by-step response plan when you encounter fraud attempts.",
              videoUrl: "/api/placeholder/video/lesson-5-1.mp4",
              duration: "22 minutes",
              handoutUrl: "/api/placeholder/pdf/response-strategies.pdf",
              completed: false
            }
          ],
          completed: false,
          progress: 0
        }
      ]
    },
    intermediate: {
      title: "Intermediate Level",
      description: "Advanced protection strategies and techniques", 
      duration: "6-8 hours",
      modules: 5,
      color: "green",
      progress: 0,
      modules_list: [
        {
          id: "module-6",
          title: "Social Engineering & Manipulation Tactics",
          lessons: [
            {
              id: "lesson-6-1",
              title: "Advanced Social Engineering Techniques",
              description: "Deep dive into sophisticated manipulation tactics used by fraudsters.",
              videoUrl: "/api/placeholder/video/lesson-6-1.mp4",
              duration: "25 minutes",
              handoutUrl: "/api/placeholder/pdf/social-engineering.pdf",
              completed: false
            }
          ],
          completed: false,
          progress: 0
        }
      ]
    },
    advanced: {
      title: "Advanced Level",
      description: "Professional-grade fraud investigation skills",
      duration: "8-10 hours", 
      modules: 5,
      color: "purple",
      progress: 0,
      modules_list: []
    },
    expert: {
      title: "Expert Level",
      description: "Master-level expertise with certification",
      duration: "10-12 hours",
      modules: 5,
      color: "amber", 
      progress: 0,
      modules_list: []
    }
  };

  const course = courseData[courseLevel as keyof typeof courseData];

  // Continue where left off functionality
  useEffect(() => {
    if (!course) return;
    
    // Find the first incomplete lesson
    const firstIncompleteLesson = course.modules_list
      .flatMap(module => module.lessons)
      .find(lesson => !lesson.completed);
      
    if (firstIncompleteLesson && !selectedLesson) {
      setSelectedLesson(firstIncompleteLesson.id);
    }
  }, [course, selectedLesson]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="p-8 text-center">
            <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Required</h2>
            <p className="text-gray-600 mb-6">Please sign in to access your course content.</p>
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

  const currentLesson = selectedLesson 
    ? course.modules_list
        .flatMap(module => module.lessons)
        .find(lesson => lesson.id === selectedLesson)
    : null;

  const handleLessonProgress = (lessonId: string, progress: number) => {
    setUserProgress(prev => ({
      ...prev,
      [lessonId]: progress
    }));
  };

  const handleLessonComplete = (lessonId: string) => {
    // Mark lesson as completed and save progress
    console.log(`Lesson ${lessonId} completed!`);
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

  if (selectedLesson && currentLesson) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        {/* Header */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Link href="/">
                  <div className="flex items-center space-x-3">
                    <Shield className="h-8 w-8 text-blue-600" />
                    <div>
                      <h1 className="text-xl font-bold text-gray-900">TrustVerify</h1>
                      <p className="text-sm text-gray-500">Academy</p>
                    </div>
                  </div>
                </Link>
                
                {/* Breadcrumbs */}
                <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                  <ChevronRight className="h-4 w-4" />
                  <Link href="/fraud-academy" className="hover:text-blue-600">{course.title}</Link>
                  <ChevronRight className="h-4 w-4" />
                  <span className="text-gray-900">{currentLesson.title}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  onClick={() => setSelectedLesson(null)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Course
                </Button>
                <Link href="/lms/dashboard">
                  <Button variant="outline">
                    <Home className="mr-2 h-4 w-4" />
                    Dashboard
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Video Lesson Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <VideoLessonPlayer
            lesson={currentLesson}
            course={course}
            onProgress={(progress) => handleLessonProgress(currentLesson.id, progress)}
            onComplete={() => handleLessonComplete(currentLesson.id)}
          />
        </div>
      </div>
    );
  }

  // Course overview page
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
                  <p className="text-sm text-gray-500">Academy</p>
                </div>
              </div>
            </Link>
            <div className="flex items-center space-x-4">
              <Link href="/fraud-academy">
                <Button variant="outline">
                  ← Back to Courses
                </Button>
              </Link>
              <Link href="/lms/dashboard">
                <Button variant="outline">
                  Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Course Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <Badge className={getBadgeColor(course.color)}>
              {course.title}
            </Badge>
            <Badge variant="outline">
              {course.duration}
            </Badge>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{course.title}</h1>
          <p className="text-xl text-gray-600 mb-6">{course.description}</p>
          
          <div className="bg-blue-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Your Progress</h3>
              <span className="text-2xl font-bold text-blue-600">{course.progress}%</span>
            </div>
            <Progress value={course.progress} className="h-3 mb-2" />
            <p className="text-sm text-gray-600">
              {course.progress}% complete • Continue learning to earn your certificate
            </p>
          </div>
        </div>

        {/* Course Modules */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900">Course Modules</h2>
          
          {course.modules_list.map((module, moduleIndex) => (
            <Card key={module.id} className="overflow-hidden">
              <CardHeader className="bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold">
                      {moduleIndex + 1}
                    </div>
                    <CardTitle className="text-xl">{module.title}</CardTitle>
                    {module.completed && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                  <div className="text-sm text-gray-500">
                    {module.lessons.length} lesson{module.lessons.length !== 1 ? 's' : ''}
                  </div>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Module Progress</span>
                    <span>{module.progress}%</span>
                  </div>
                  <Progress value={module.progress} className="h-2" />
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className="divide-y">
                  {module.lessons.map((lesson, lessonIndex) => (
                    <div
                      key={lesson.id}
                      className="p-6 hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => setSelectedLesson(lesson.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            {lesson.completed ? (
                              <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                                <CheckCircle className="h-4 w-4" />
                              </div>
                            ) : (
                              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                                <PlayCircle className="h-4 w-4" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900 mb-1">{lesson.title}</h4>
                            <p className="text-sm text-gray-600 mb-2">{lesson.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-gray-500">
                              <div className="flex items-center">
                                <Clock className="h-3 w-3 mr-1" />
                                {lesson.duration}
                              </div>
                              {lesson.handoutUrl && (
                                <div className="flex items-center">
                                  <Download className="h-3 w-3 mr-1" />
                                  PDF Handout
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional Materials Section */}
        <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-950/20 dark:to-teal-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center gap-3 mb-4">
            <FileDown className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Additional Course Materials</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="h-5 w-5 text-green-600 dark:text-green-400" />
                <h4 className="font-medium text-gray-900 dark:text-white">Practice Worksheets</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Interactive exercises and practice scenarios for hands-on learning.
              </p>
              <Button 
                size="sm" 
                className="w-full bg-green-600 hover:bg-green-700"
                onClick={() => handleMaterialDownload('worksheets')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Worksheets
              </Button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                <h4 className="font-medium text-gray-900 dark:text-white">Response Templates</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Ready-to-use templates for reporting and responding to fraud incidents.
              </p>
              <Button 
                size="sm" 
                className="w-full bg-purple-600 hover:bg-purple-700"
                onClick={() => handleMaterialDownload('templates')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Templates
              </Button>
            </div>
            
            <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="flex items-center gap-3 mb-3">
                <ClipboardCheck className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                <h4 className="font-medium text-gray-900 dark:text-white">Checklists & Tools</h4>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                Essential checklists and assessment tools for fraud prevention.
              </p>
              <Button 
                size="sm" 
                className="w-full bg-orange-600 hover:bg-orange-700"
                onClick={() => handleMaterialDownload('checklists')}
              >
                <Download className="h-4 w-4 mr-2" />
                Download Checklists
              </Button>
            </div>
          </div>
        </div>

        {/* Course Complete Section */}
        {course.progress === 100 && (
          <Card className="mt-8 bg-green-50 border-green-200">
            <CardContent className="p-6 text-center">
              <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-green-900 mb-2">
                Congratulations! Course Complete
              </h3>
              <p className="text-green-700 mb-6">
                You've successfully completed the {course.title}. Your certificate is ready!
              </p>
              <div className="flex justify-center space-x-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download Certificate
                </Button>
                <Button variant="outline">
                  Share Achievement
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
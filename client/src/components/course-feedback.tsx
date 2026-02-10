import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  Star, 
  Send, 
  ThumbsUp, 
  ThumbsDown,
  MessageSquare,
  Award,
  BookOpen,
  Clock,
  Target,
  Users,
  CheckCircle2,
  AlertCircle,
  Lightbulb
} from "lucide-react";

interface CourseFeedbackProps {
  courseId: string;
  courseTitle: string;
  courseLevel: string;
  onSubmit?: (feedback: any) => void;
  type?: 'module' | 'lesson' | 'course';
  moduleTitle?: string;
  lessonTitle?: string;
}

export function CourseFeedback({ 
  courseId, 
  courseTitle, 
  courseLevel, 
  onSubmit,
  type = 'course',
  moduleTitle,
  lessonTitle 
}: CourseFeedbackProps) {
  const [rating, setRating] = useState<number>(0);
  const [hoverRating, setHoverRating] = useState<number>(0);
  const [feedback, setFeedback] = useState('');
  const [aspectRatings, setAspectRatings] = useState({
    content_quality: 0,
    instructor_effectiveness: 0,
    practical_value: 0,
    ease_of_understanding: 0,
    relevance: 0
  });
  const [improvements, setImprovements] = useState<string[]>([]);
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const aspects = [
    { key: 'content_quality', label: 'Content Quality', icon: BookOpen },
    { key: 'instructor_effectiveness', label: 'Instructor Effectiveness', icon: Users },
    { key: 'practical_value', label: 'Practical Value', icon: Target },
    { key: 'ease_of_understanding', label: 'Ease of Understanding', icon: Lightbulb },
    { key: 'relevance', label: 'Relevance to Goals', icon: Award }
  ];

  const improvementOptions = [
    'More practical examples',
    'Better visual aids',
    'More interactive content',
    'Shorter lesson duration',
    'More detailed explanations',
    'Additional resources',
    'Better pacing',
    'More real-world case studies'
  ];

  const handleAspectRating = (aspect: string, rating: number) => {
    setAspectRatings(prev => ({
      ...prev,
      [aspect]: rating
    }));
  };

  const handleImprovementToggle = (improvement: string) => {
    setImprovements(prev => 
      prev.includes(improvement)
        ? prev.filter(item => item !== improvement)
        : [...prev, improvement]
    );
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      alert('Please provide an overall rating');
      return;
    }

    setIsSubmitting(true);

    const feedbackData = {
      courseId,
      type,
      moduleTitle,
      lessonTitle,
      rating,
      aspectRatings,
      feedback,
      improvements,
      wouldRecommend,
      submittedAt: new Date().toISOString()
    };

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (onSubmit) {
        onSubmit(feedbackData);
      }
      
      setSubmitted(true);
    } catch (error) {
      console.error('Failed to submit feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getContentTitle = () => {
    switch (type) {
      case 'lesson': return lessonTitle || 'Lesson';
      case 'module': return moduleTitle || 'Module';
      default: return courseTitle;
    }
  };

  if (submitted) {
    return (
      <Card className="bg-green-50 border-green-200">
        <CardContent className="p-8 text-center">
          <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-900 mb-2">
            Thank You for Your Feedback!
          </h3>
          <p className="text-green-700 mb-6">
            Your feedback helps us improve the learning experience for everyone.
          </p>
          <div className="flex justify-center space-x-4">
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={() => window.location.href = '/course/' + courseLevel.toLowerCase()}
            >
              Continue Learning
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.location.href = '/lms/dashboard'}
            >
              Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <MessageSquare className="h-5 w-5 mr-2" />
          Rate This {type === 'course' ? 'Course' : type === 'module' ? 'Module' : 'Lesson'}
        </CardTitle>
        <div className="text-sm text-gray-600">
          <Badge variant="outline" className="mr-2">{courseLevel}</Badge>
          {getContentTitle()}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Overall Rating */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Overall Rating</h4>
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onMouseEnter={() => setHoverRating(star)}
                onMouseLeave={() => setHoverRating(0)}
                onClick={() => setRating(star)}
                className="transition-colors"
              >
                <Star
                  className={`h-8 w-8 ${
                    star <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
            <span className="ml-3 text-sm text-gray-600">
              {rating > 0 && (
                <>
                  {rating === 1 && 'Poor'}
                  {rating === 2 && 'Fair'}
                  {rating === 3 && 'Good'}
                  {rating === 4 && 'Very Good'}
                  {rating === 5 && 'Excellent'}
                </>
              )}
            </span>
          </div>
        </div>

        {/* Detailed Aspects */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-4">Rate Specific Aspects</h4>
          <div className="space-y-4">
            {aspects.map((aspect) => (
              <div key={aspect.key} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <aspect.icon className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{aspect.label}</span>
                </div>
                <div className="flex items-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleAspectRating(aspect.key, star)}
                      className="transition-colors"
                    >
                      <Star
                        className={`h-5 w-5 ${
                          star <= aspectRatings[aspect.key as keyof typeof aspectRatings]
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Would Recommend */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">
            Would you recommend this {type} to others?
          </h4>
          <div className="flex space-x-4">
            <Button
              variant={wouldRecommend === true ? 'default' : 'outline'}
              onClick={() => setWouldRecommend(true)}
              className="flex items-center space-x-2"
            >
              <ThumbsUp className="h-4 w-4" />
              <span>Yes</span>
            </Button>
            <Button
              variant={wouldRecommend === false ? 'default' : 'outline'}
              onClick={() => setWouldRecommend(false)}
              className="flex items-center space-x-2"
            >
              <ThumbsDown className="h-4 w-4" />
              <span>No</span>
            </Button>
          </div>
        </div>

        {/* Areas for Improvement */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">
            What could be improved? (Select all that apply)
          </h4>
          <div className="grid grid-cols-2 gap-3">
            {improvementOptions.map((option) => (
              <label
                key={option}
                className="flex items-center space-x-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={improvements.includes(option)}
                  onChange={() => handleImprovementToggle(option)}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Written Feedback */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">
            Additional Comments (Optional)
          </h4>
          <Textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your thoughts, suggestions, or specific feedback..."
            className="min-h-[100px]"
          />
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t">
          <Button
            onClick={handleSubmit}
            disabled={rating === 0 || isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Feedback
              </>
            )}
          </Button>
        </div>

        {/* Privacy Note */}
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-700">
              <p className="font-semibold mb-1">Your feedback matters</p>
              <p>
                Your feedback is anonymous and helps us improve our courses. 
                We may use your suggestions to enhance content and delivery.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
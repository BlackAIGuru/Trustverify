import React, { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  Pause, 
  Volume2, 
  VolumeX,
  Maximize,
  Settings,
  SkipBack,
  SkipForward,
  Subtitles,
  Download,
  BookOpen,
  CheckCircle,
  Clock,
  Shield
} from "lucide-react";

interface VideoLessonPlayerProps {
  lesson: {
    id: string;
    title: string;
    description: string;
    videoUrl: string;
    duration: string;
    captions?: string;
    handoutUrl?: string;
    completed?: boolean;
  };
  course: {
    title: string;
    level: string;
  };
  onProgress?: (progress: number) => void;
  onComplete?: () => void;
}

export function VideoLessonPlayer({ lesson, course, onProgress, onComplete }: VideoLessonPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [showCaptions, setShowCaptions] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [progress, setProgress] = useState(0);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState<string | null>(null);

  // Auto-hide controls after 3 seconds of inactivity
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    if (showControls && isPlaying) {
      timeoutId = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [showControls, isPlaying]);

  // Update progress and handle completion
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const currentProgress = (video.currentTime / video.duration) * 100;
      setProgress(currentProgress);
      setCurrentTime(video.currentTime);
      
      if (onProgress) {
        onProgress(currentProgress);
      }

      // Mark as complete when 90% watched
      if (currentProgress >= 90 && !lesson.completed && onComplete) {
        onComplete();
      }
    };

    const handleLoadedMetadata = () => {
      setDuration(video.duration);
      setVideoLoaded(true);
      setVideoError(null);
    };

    const handleLoadedData = () => {
      setVideoLoaded(true);
      setVideoError(null);
    };

    const handleError = () => {
      setVideoError('Failed to load video. Please try refreshing the page.');
      setVideoLoaded(false);
    };

    const handleCanPlay = () => {
      setVideoLoaded(true);
      setVideoError(null);
    };

    video.addEventListener('timeupdate', updateProgress);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);

    return () => {
      video.removeEventListener('timeupdate', updateProgress);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [lesson.completed, onComplete, onProgress]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (isPlaying) {
      video.pause();
    } else {
      video.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSeek = (time: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = time;
    setCurrentTime(time);
  };

  const handleVolumeChange = (newVolume: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.volume = newVolume;
    setVolume(newVolume);
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (isMuted) {
      video.volume = volume;
      setIsMuted(false);
    } else {
      video.volume = 0;
      setIsMuted(true);
    }
  };

  const skip = (seconds: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = Math.max(0, Math.min(video.duration, video.currentTime + seconds));
  };

  const toggleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;
    
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen();
    }
  };

  const changePlaybackSpeed = (speed: number) => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = speed;
    setPlaybackSpeed(speed);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const downloadHandout = () => {
    if (lesson.handoutUrl) {
      const link = document.createElement('a');
      link.href = lesson.handoutUrl;
      link.download = `${lesson.title}_handout.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-6">
      {/* Video Player */}
      <Card className="overflow-hidden bg-black">
        <div 
          className="relative group"
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => isPlaying && setShowControls(false)}
        >
          {/* TrustVerify Branding Overlay */}
          <div className="absolute top-4 left-4 z-20">
            <div className="flex items-center space-x-2 bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <Shield className="h-5 w-5 text-blue-400" />
              <span className="text-white text-sm font-semibold">TrustVerify Academy</span>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="absolute top-4 right-4 z-20">
            <div className="bg-black/50 backdrop-blur-sm rounded-lg px-3 py-2">
              <span className="text-white text-sm font-semibold">{Math.round(progress)}% Complete</span>
            </div>
          </div>

          {/* Video Element */}
          <video
            ref={videoRef}
            className="w-full aspect-video bg-black"
            poster="/api/placeholder/800/450"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onClick={togglePlay}
            controls={false}
            preload="auto"
            crossOrigin="anonymous"
            playsInline
            onError={() => setVideoError('Video failed to load')}
            onCanPlay={() => setVideoLoaded(true)}
          >
            <source src={lesson.videoUrl} type="video/mp4" />
            {lesson.captions && showCaptions && (
              <track
                kind="subtitles"
                src={lesson.captions}
                srcLang="en"
                label="English"
                default
              />
            )}
            Your browser does not support the video tag.
          </video>

          {/* Loading/Error Overlay */}
          {(!videoLoaded || videoError) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/70">
              {videoError ? (
                <div className="text-center text-white">
                  <div className="text-red-400 mb-2">⚠️ Video Error</div>
                  <div className="text-sm">{videoError}</div>
                  <Button 
                    className="mt-3 bg-blue-600 hover:bg-blue-700"
                    onClick={() => {
                      setVideoError(null);
                      const video = videoRef.current;
                      if (video) {
                        video.load();
                      }
                    }}
                  >
                    Retry
                  </Button>
                </div>
              ) : (
                <div className="text-center text-white">
                  <div className="animate-spin h-8 w-8 border-2 border-white border-t-transparent rounded-full mx-auto mb-2"></div>
                  <div className="text-sm">Loading video...</div>
                </div>
              )}
            </div>
          )}

          {/* Controls Overlay */}
          <div 
            className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300 ${
              showControls ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {/* Progress Bar */}
            <div className="mb-4">
              <Progress 
                value={progress} 
                className="h-2 bg-white/20"
                onClick={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const clickX = e.clientX - rect.left;
                  const newTime = (clickX / rect.width) * duration;
                  handleSeek(newTime);
                }}
              />
            </div>

            {/* Control Buttons */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={togglePlay}
                  className="text-white hover:text-blue-400"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => skip(-10)}
                  className="text-white hover:text-blue-400"
                >
                  <SkipBack className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => skip(10)}
                  className="text-white hover:text-blue-400"
                >
                  <SkipForward className="h-4 w-4" />
                </Button>

                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleMute}
                    className="text-white hover:text-blue-400"
                  >
                    {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                  </Button>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.1"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                    className="w-20 accent-blue-500"
                  />
                </div>

                <span className="text-white text-sm">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
              </div>

              <div className="flex items-center space-x-2">
                <select
                  value={playbackSpeed}
                  onChange={(e) => changePlaybackSpeed(parseFloat(e.target.value))}
                  className="bg-black/50 text-white text-sm rounded px-2 py-1 border border-white/20"
                >
                  <option value={0.5}>0.5x</option>
                  <option value={0.75}>0.75x</option>
                  <option value={1}>1x</option>
                  <option value={1.25}>1.25x</option>
                  <option value={1.5}>1.5x</option>
                  <option value={2}>2x</option>
                </select>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowCaptions(!showCaptions)}
                  className={`text-white hover:text-blue-400 ${showCaptions ? 'text-blue-400' : ''}`}
                >
                  <Subtitles className="h-4 w-4" />
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleFullscreen}
                  className="text-white hover:text-blue-400"
                >
                  <Maximize className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Lesson Information */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lesson Details */}
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <Badge variant="outline">{course.level}</Badge>
                    {lesson.completed && (
                      <Badge className="bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Completed
                      </Badge>
                    )}
                  </div>
                  <h1 className="text-2xl font-bold text-gray-900 mb-2">{lesson.title}</h1>
                  <p className="text-gray-600 leading-relaxed">{lesson.description}</p>
                </div>
                <div className="flex items-center text-sm text-gray-500 ml-4">
                  <Clock className="h-4 w-4 mr-1" />
                  {lesson.duration}
                </div>
              </div>

              <div className="border-t pt-4">
                <h3 className="font-semibold text-gray-900 mb-3">What You'll Learn</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Understanding the fundamental concepts and practical applications
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Real-world examples and case study analysis
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    Actionable strategies you can implement immediately
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Resources Sidebar */}
        <div className="space-y-6">
          {/* Progress Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Your Progress</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Lesson Progress</span>
                    <span>{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>
                <div className="text-sm text-gray-600">
                  {progress >= 90 ? (
                    <div className="flex items-center text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Lesson Complete!
                    </div>
                  ) : (
                    `${Math.round(progress)}% watched - Keep going!`
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resources Card */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Course Resources</h3>
              <div className="space-y-3">
                {lesson.handoutUrl && (
                  <Button
                    onClick={downloadHandout}
                    variant="outline"
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download Handout (PDF)
                  </Button>
                )}
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open('#', '_blank')}
                >
                  <BookOpen className="h-4 w-4 mr-2" />
                  Additional Reading
                </Button>

                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open('https://trustverify.io/support', '_blank')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Get Help
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card>
            <CardContent className="p-6">
              <h3 className="font-semibold text-gray-900 mb-3">What's Next?</h3>
              <p className="text-sm text-gray-600 mb-4">
                Complete this lesson to unlock the next module and continue your learning journey.
              </p>
              <Button 
                className="w-full bg-blue-600 hover:bg-blue-700"
                disabled={progress < 90}
              >
                Continue to Next Lesson
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
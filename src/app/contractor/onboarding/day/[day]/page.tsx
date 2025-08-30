'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { 
  ArrowLeft, Play, Pause, CheckCircle, Clock, Download, Upload, 
  BookOpen, Video, Headphones, FileText, ChevronRight, X, 
  AlertCircle, Award, Volume2
} from 'lucide-react';
import { ONBOARDING_PROGRAM } from '@/lib/onboarding/14-day-program';
import { COMPETENCY_TEST_QUESTIONS, getTestByCategory, calculateTestScore } from '@/lib/competency-tests/test-questions';
import { CompetencyCategory } from '@/types/contractor-competency';

interface LearningProgress {
  videosWatched: Record<string, number>;
  readingsCompleted: string[];
  assignmentsSubmitted: string[];
  documentsUploaded: string[];
  quizScores: Record<string, number>;
  podcastsListened: string[];
  studyGuidesCompleted: string[];
}

export default function DayTrainingPage() {
  const params = useParams();
  const router = useRouter();
  const day = parseInt(params.day as string);
  const module = ONBOARDING_PROGRAM[day - 1];
  
  const [activeTab, setActiveTab] = useState<'video' | 'reading' | 'podcast' | 'assignment'>('video');
  const [progress, setProgress] = useState<LearningProgress>({
    videosWatched: {},
    readingsCompleted: [],
    assignmentsSubmitted: [],
    documentsUploaded: [],
    quizScores: {},
    podcastsListened: [],
    studyGuidesCompleted: []
  });
  
  const [currentVideo, setCurrentVideo] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [currentQuiz, setCurrentQuiz] = useState<any>(null);
  const [quizAnswers, setQuizAnswers] = useState<Map<string, string>>(new Map());
  const [showTranscript, setShowTranscript] = useState(false);
  const [showStudyGuide, setShowStudyGuide] = useState(false);
  
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Load progress from localStorage
    const savedProgress = localStorage.getItem(`day_${day}_progress`);
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, [day]);

  const saveProgress = (newProgress: LearningProgress) => {
    setProgress(newProgress);
    localStorage.setItem(`day_${day}_progress`, JSON.stringify(newProgress));
  };

  const handleVideoProgress = (videoTitle: string, percentage: number) => {
    const newProgress = {
      ...progress,
      videosWatched: {
        ...progress.videosWatched,
        [videoTitle]: Math.max(progress.videosWatched[videoTitle] || 0, percentage)
      }
    };
    saveProgress(newProgress);
  };

  const handleReadingComplete = (readingTitle: string) => {
    if (!progress.readingsCompleted.includes(readingTitle)) {
      const newProgress = {
        ...progress,
        readingsCompleted: [...progress.readingsCompleted, readingTitle]
      };
      saveProgress(newProgress);
    }
  };

  const handleQuizSubmit = (quizTitle: string) => {
    const score = calculateTestScore(quizAnswers, currentQuiz.questions);
    const newProgress = {
      ...progress,
      quizScores: {
        ...progress.quizScores,
        [quizTitle]: score.percentage
      },
      assignmentsSubmitted: score.percentage >= (module.completionCriteria.quizScore || 75)
        ? [...progress.assignmentsSubmitted, quizTitle]
        : progress.assignmentsSubmitted
    };
    saveProgress(newProgress);
    setCurrentQuiz(null);
    setQuizAnswers(new Map());
  };

  const calculateModuleProgress = () => {
    let total = 0;
    let completed = 0;

    // Videos
    if (module.components.videos) {
      module.components.videos.forEach(video => {
        if (video.mandatory) {
          total++;
          const watched = progress.videosWatched[video.title] || 0;
          if (watched >= (module.completionCriteria.minVideoWatchTime || 95)) {
            completed++;
          }
        }
      });
    }

    // Readings
    if (module.components.readings) {
      total += module.components.readings.length;
      completed += progress.readingsCompleted.length;
    }

    // Assignments
    if (module.components.assignments) {
      total += module.components.assignments.length;
      completed += progress.assignmentsSubmitted.length;
    }

    return total > 0 ? Math.round((completed / total) * 100) : 0;
  };

  const isModuleComplete = () => {
    const moduleProgress = calculateModuleProgress();
    return moduleProgress === 100;
  };

  if (!module) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Module not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => router.push('/contractor/onboarding')}
                className="p-2 hover:bg-white/10 rounded-lg transition"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Day {day}: {module.title}</h1>
                <p className="text-blue-100 mt-1">{module.description}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">Module Progress</p>
              <p className="text-2xl font-bold">{calculateModuleProgress()}%</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-4">
            <div className="w-full bg-blue-800 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-white h-full transition-all duration-500 rounded-full"
                style={{ width: `${calculateModuleProgress()}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Learning Format Tabs */}
      <div className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex space-x-8 border-b">
            <button
              onClick={() => setActiveTab('video')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                activeTab === 'video' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Video className="w-4 h-4" />
                <span>Video Lessons</span>
                {module.components.videos && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {module.components.videos.length}
                  </span>
                )}
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('reading')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                activeTab === 'reading' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <BookOpen className="w-4 h-4" />
                <span>Reading Materials</span>
                {module.components.readings && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {module.components.readings.length}
                  </span>
                )}
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('podcast')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                activeTab === 'podcast' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <Headphones className="w-4 h-4" />
                <span>Podcast Episodes</span>
                <span className="bg-purple-100 text-purple-600 px-2 py-0.5 rounded-full text-xs">
                  AI Generated
                </span>
              </div>
            </button>
            
            <button
              onClick={() => setActiveTab('assignment')}
              className={`py-4 px-2 border-b-2 font-medium text-sm transition ${
                activeTab === 'assignment' 
                  ? 'border-blue-600 text-blue-600' 
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              <div className="flex items-center space-x-2">
                <FileText className="w-4 h-4" />
                <span>Assignments</span>
                {module.components.assignments && (
                  <span className="bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full text-xs">
                    {module.components.assignments.length}
                  </span>
                )}
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Video Tab */}
            {activeTab === 'video' && module.components.videos && (
              <div className="bg-white rounded-xl shadow-lg">
                <div className="aspect-video bg-black rounded-t-xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center">
                      <Play className="w-16 h-16 text-white mb-4 mx-auto" />
                      <p className="text-white text-lg font-semibold">
                        {module.components.videos[currentVideo]?.title}
                      </p>
                      <p className="text-gray-300 mt-2">
                        Duration: {module.components.videos[currentVideo]?.duration} minutes
                      </p>
                      <button
                        onClick={() => {
                          setVideoPlaying(true);
                          // Simulate video watching
                          setTimeout(() => {
                            handleVideoProgress(module.components.videos![currentVideo].title, 100);
                          }, 2000);
                        }}
                        className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        Start Video
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Video Lessons</h3>
                    <button
                      onClick={() => setShowTranscript(!showTranscript)}
                      className="text-sm text-blue-600 hover:text-blue-700"
                    >
                      {showTranscript ? 'Hide' : 'Show'} Transcript
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {module.components.videos.map((video, index) => {
                      const watched = progress.videosWatched[video.title] || 0;
                      return (
                        <div
                          key={index}
                          onClick={() => setCurrentVideo(index)}
                          className={`p-4 rounded-lg border cursor-pointer transition ${
                            currentVideo === index 
                              ? 'border-blue-500 bg-blue-50' 
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                                watched >= 95 ? 'bg-green-100' : 'bg-gray-100'
                              }`}>
                                {watched >= 95 ? (
                                  <CheckCircle className="w-5 h-5 text-green-600" />
                                ) : (
                                  <Play className="w-5 h-5 text-gray-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">{video.title}</p>
                                <p className="text-sm text-gray-500">{video.duration} minutes</p>
                              </div>
                            </div>
                            {video.mandatory && (
                              <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                                Required
                              </span>
                            )}
                          </div>
                          {watched > 0 && watched < 95 && (
                            <div className="mt-3">
                              <div className="w-full bg-gray-200 rounded-full h-1.5">
                                <div 
                                  className="bg-blue-600 h-1.5 rounded-full"
                                  style={{ width: `${watched}%` }}
                                />
                              </div>
                              <p className="text-xs text-gray-500 mt-1">{watched}% watched</p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Reading Tab */}
            {activeTab === 'reading' && module.components.readings && (
              <div className="space-y-6">
                {module.components.readings.map((reading, index) => {
                  const isCompleted = progress.readingsCompleted.includes(reading.title);
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{reading.title}</h3>
                          <p className="text-sm text-gray-500 mt-1">
                            Source: {reading.source} • {reading.estimatedTime} min read
                          </p>
                        </div>
                        {isCompleted ? (
                          <CheckCircle className="w-6 h-6 text-green-500" />
                        ) : (
                          <Clock className="w-6 h-6 text-gray-400" />
                        )}
                      </div>
                      
                      <div className="prose prose-sm max-w-none text-gray-600">
                        <p>{reading.content}</p>
                      </div>
                      
                      <div className="mt-6 flex items-center justify-between">
                        <button
                          onClick={() => setShowStudyGuide(true)}
                          className="text-sm text-blue-600 hover:text-blue-700"
                        >
                          View Study Guide
                        </button>
                        {!isCompleted && (
                          <button
                            onClick={() => handleReadingComplete(reading.title)}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                          >
                            Mark as Complete
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Podcast Tab */}
            {activeTab === 'podcast' && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 mb-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <Headphones className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">AI-Generated Podcast Episodes</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        Listen to conversational discussions of today's topics, generated from the training materials using NotebookLM.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {module.components.videos?.map((video, index) => {
                    const listened = progress.podcastsListened.includes(`podcast_${video.title}`);
                    return (
                      <div key={index} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <button className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center text-white hover:bg-purple-700 transition">
                              <Play className="w-5 h-5 ml-0.5" />
                            </button>
                            <div>
                              <p className="font-medium text-gray-900">
                                Episode {index + 1}: {video.title}
                              </p>
                              <p className="text-sm text-gray-500">
                                AI Discussion • {Math.round(video.duration * 1.5)} min
                              </p>
                            </div>
                          </div>
                          {listened && (
                            <CheckCircle className="w-5 h-5 text-green-500" />
                          )}
                        </div>
                        
                        <div className="mt-3 flex items-center space-x-4 text-sm">
                          <button className="text-blue-600 hover:text-blue-700">
                            <Volume2 className="w-4 h-4 inline mr-1" />
                            Transcript
                          </button>
                          <button className="text-blue-600 hover:text-blue-700">
                            <Download className="w-4 h-4 inline mr-1" />
                            Download
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                  <p className="text-sm text-amber-800">
                    <strong>Note:</strong> These podcast episodes are AI-generated conversations based on the training materials,
                    designed to help you learn through audio format while commuting or during other activities.
                  </p>
                </div>
              </div>
            )}

            {/* Assignment Tab */}
            {activeTab === 'assignment' && module.components.assignments && (
              <div className="space-y-6">
                {module.components.assignments.map((assignment, index) => {
                  const isSubmitted = progress.assignmentsSubmitted.includes(assignment.title);
                  const isQuiz = assignment.type === 'QUIZ';
                  
                  return (
                    <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="font-semibold text-gray-900">{assignment.title}</h3>
                          <p className="text-sm text-gray-600 mt-1">{assignment.description}</p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                              {assignment.type}
                            </span>
                            {isSubmitted && (
                              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">
                                Submitted
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4 mt-4">
                        <h4 className="font-medium text-gray-900 mb-2">Requirements:</h4>
                        <ul className="space-y-1">
                          {assignment.requirements.map((req, i) => (
                            <li key={i} className="flex items-start space-x-2">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-1.5" />
                              <span className="text-sm text-gray-600">{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div className="mt-6">
                        {isQuiz ? (
                          <button
                            onClick={() => {
                              // Load quiz questions based on category
                              const questions = getTestByCategory(CompetencyCategory.AUSTRALIAN_CONSUMER_LAW).slice(0, 5);
                              setCurrentQuiz({ title: assignment.title, questions });
                            }}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                            disabled={isSubmitted}
                          >
                            {isSubmitted ? 'Quiz Completed' : 'Start Quiz'}
                          </button>
                        ) : assignment.type === 'UPLOAD' ? (
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center space-x-2">
                            <Upload className="w-4 h-4" />
                            <span>Upload Documents</span>
                          </button>
                        ) : (
                          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition">
                            Submit Assignment
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h3 className="font-bold text-gray-900 mb-4">Today's Objectives</h3>
              <div className="space-y-3">
                {module.objectives.map((objective, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-gray-600">{objective}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h4 className="font-semibold text-gray-900 mb-3">Completion Status</h4>
                <div className="space-y-3">
                  {module.components.videos && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Videos</span>
                      <span className="font-semibold">
                        {Object.values(progress.videosWatched).filter(v => v >= 95).length}/{module.components.videos.length}
                      </span>
                    </div>
                  )}
                  {module.components.readings && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Readings</span>
                      <span className="font-semibold">
                        {progress.readingsCompleted.length}/{module.components.readings.length}
                      </span>
                    </div>
                  )}
                  {module.components.assignments && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Assignments</span>
                      <span className="font-semibold">
                        {progress.assignmentsSubmitted.length}/{module.components.assignments.length}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              
              {isModuleComplete() && (
                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Award className="w-5 h-5 text-green-600" />
                    <p className="font-semibold text-green-900">Module Complete!</p>
                  </div>
                  <button
                    onClick={() => router.push('/contractor/onboarding')}
                    className="mt-3 w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition"
                  >
                    Continue to Next Day
                  </button>
                </div>
              )}
            </div>
            
            {/* Study Resources */}
            <div className="bg-blue-50 rounded-xl p-6 mt-6">
              <h4 className="font-semibold text-blue-900 mb-3">Study Resources</h4>
              <div className="space-y-2">
                <button className="w-full text-left text-sm text-blue-700 hover:text-blue-800">
                  📚 Download Study Guide (PDF)
                </button>
                <button className="w-full text-left text-sm text-blue-700 hover:text-blue-800">
                  🎧 Podcast Transcript
                </button>
                <button className="w-full text-left text-sm text-blue-700 hover:text-blue-800">
                  📝 Practice Questions
                </button>
                <button className="w-full text-left text-sm text-blue-700 hover:text-blue-800">
                  🎯 Quick Reference Sheet
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quiz Modal */}
      {currentQuiz && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b sticky top-0 bg-white">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-bold">{currentQuiz.title}</h2>
                <button
                  onClick={() => {
                    setCurrentQuiz(null);
                    setQuizAnswers(new Map());
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-6">
                {currentQuiz.questions.map((question: any, index: number) => (
                  <div key={question.id} className="border rounded-lg p-4">
                    <p className="font-medium text-gray-900 mb-3">
                      {index + 1}. {question.question}
                    </p>
                    {question.options && (
                      <div className="space-y-2">
                        {question.options.map((option: string) => (
                          <label key={option} className="flex items-center space-x-2 cursor-pointer">
                            <input
                              type="radio"
                              name={question.id}
                              value={option}
                              onChange={(e) => {
                                const newAnswers = new Map(quizAnswers);
                                newAnswers.set(question.id, e.target.value);
                                setQuizAnswers(newAnswers);
                              }}
                              className="text-blue-600"
                            />
                            <span className="text-sm text-gray-700">{option}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => handleQuizSubmit(currentQuiz.title)}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
                  disabled={quizAnswers.size < currentQuiz.questions.length}
                >
                  Submit Quiz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
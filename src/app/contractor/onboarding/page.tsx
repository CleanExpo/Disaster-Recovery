'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronRight, Lock, CheckCircle, Clock, AlertCircle, BookOpen, Video, Headphones, FileText, Award } from 'lucide-react';
import { ONBOARDING_PROGRAM } from '@/lib/onboarding/14-day-program';
import { ModuleProgress, calculateModuleCompletion, canProgressToNextDay } from '@/lib/onboarding/14-day-program';

interface OnboardingState {
  contractorId: string;
  applicationStatus: 'pending_payment' | 'payment_received' | 'in_progress' | 'completed' | 'failed';
  paymentStatus: {
    applicationFee: boolean;
    joiningFee: boolean;
    firstSubscription: boolean;
  };
  startDate: string;
  currentDay: number;
  completedDays: number[];
  moduleProgress: Record<number, ModuleProgress>;
  competencyScores: Record<string, number>;
  certificateNumber?: string;
}

export default function ContractorOnboardingPage() {
  const router = useRouter();
  const [onboardingState, setOnboardingState] = useState<OnboardingState | null>(null);
  const [selectedDay, setSelectedDay] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load onboarding state from localStorage or API
    const loadOnboardingState = async () => {
      const savedState = localStorage.getItem('contractor_onboarding_state');
      if (savedState) {
        const state = JSON.parse(savedState);
        setOnboardingState(state);
        setSelectedDay(state.currentDay);
      } else {
        // Initialize new onboarding
        const newState: OnboardingState = {
          contractorId: `CTR-${Date.now()}`,
          applicationStatus: 'pending_payment',
          paymentStatus: {
            applicationFee: false,
            joiningFee: false,
            firstSubscription: false
          },
          startDate: new Date().toISOString(),
          currentDay: 1,
          completedDays: [],
          moduleProgress: {},
          competencyScores: {}
        };
        setOnboardingState(newState);
        localStorage.setItem('contractor_onboarding_state', JSON.stringify(newState));
      }
      setLoading(false);
    };

    loadOnboardingState();
  }, []);

  const getModuleStatus = (day: number): 'locked' | 'available' | 'in_progress' | 'completed' => {
    if (!onboardingState) return 'locked';
    
    if (onboardingState.completedDays.includes(day)) return 'completed';
    if (day === onboardingState.currentDay) return 'available';
    if (day < onboardingState.currentDay) return 'available';
    
    // Check if prerequisite days are completed
    const module = ONBOARDING_PROGRAM[day - 1];
    if (module.mustCompleteBy < day) {
      const prereqCompleted = Array.from({ length: module.mustCompleteBy }, (_, i) => i + 1)
        .every(d => onboardingState.completedDays.includes(d));
      if (!prereqCompleted) return 'locked';
    }
    
    return 'locked';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'available':
        return <Clock className="w-5 h-5 text-blue-500" />;
      case 'in_progress':
        return <Clock className="w-5 h-5 text-yellow-500 animate-pulse" />;
      default:
        return <Lock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getContentTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'reading':
        return <BookOpen className="w-4 h-4" />;
      case 'podcast':
        return <Headphones className="w-4 h-4" />;
      case 'assignment':
        return <FileText className="w-4 h-4" />;
      default:
        return <FileText className="w-4 h-4" />;
    }
  };

  const handleStartDay = (day: number) => {
    if (!onboardingState) return;
    
    const newState = {
      ...onboardingState,
      currentDay: day,
      moduleProgress: {
        ...onboardingState.moduleProgress,
        [day]: {
          day,
          videosWatched: {},
          readingsCompleted: [],
          assignmentsSubmitted: [],
          documentsUploaded: [],
          quizScores: {},
          status: 'in_progress' as const
        }
      }
    };
    
    setOnboardingState(newState);
    localStorage.setItem('contractor_onboarding_state', JSON.stringify(newState));
    router.push(`/contractor/onboarding/day/${day}`);
  };

  const calculateOverallProgress = () => {
    if (!onboardingState) return 0;
    return Math.round((onboardingState.completedDays.length / 14) * 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-centre justify-centre">
        <div className="text-centre">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading onboarding program...</p>
        </div>
      </div>
    );
  }

  if (!onboardingState) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-centre justify-centre">
        <div className="text-centre">
          <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
          <p className="text-gray-600">Error loading onboarding state</p>
        </div>
      </div>
    );
  }

  // Payment Gateway Section
  if (onboardingState.applicationStatus === 'pending_payment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Complete Your Application Payment</h1>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h2 className="text-xl font-semibold text-blue-900 mb-4">Payment Required to Begin Onboarding</h2>
                
                <div className="space-y-4">
                  <div className="flex items-centre justify-between p-4 bg-white rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">Application Fee</p>
                      <p className="text-sm text-gray-600">Includes competency testing & onboarding materials</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">$275</p>
                      <p className="text-xs text-gray-500">Inc. GST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-centre justify-between p-4 bg-white rounded-lg">
                    <div>
                      <p className="font-semibold text-gray-900">Joining Fee</p>
                      <p className="text-sm text-gray-600">Portal setup, training access & territory allocation</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">$2,200</p>
                      <p className="text-xs text-gray-500">Inc. GST</p>
                    </div>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex items-centre justify-between">
                      <p className="text-lg font-semibold text-gray-900">Total Due Now</p>
                      <p className="text-3xl font-bold text-blue-600">$2,475</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <button
                    onClick={() => {
                      // Simulate payment completion
                      const newState = {
                        ...onboardingState,
                        applicationStatus: 'in_progress' as const,
                        paymentStatus: {
                          applicationFee: true,
                          joiningFee: true,
                          firstSubscription: false
                        }
                      };
                      setOnboardingState(newState);
                      localStorage.setItem('contractor_onboarding_state', JSON.stringify(newState));
                    }}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
                  >
                    Proceed to Secure Payment
                  </button>
                  <p className="text-xs text-gray-500 text-centre mt-2">
                    Secured by Stripe • 256-bit SSL encryption
                  </p>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h3 className="font-semibold text-green-900 mb-2">Subscription Pricing After Onboarding</h3>
                <div className="grid grid-cols-3 gap-4 mt-4">
                  <div className="text-centre">
                    <p className="text-sm text-gray-600">Month 1</p>
                    <p className="text-xl font-bold text-green-600">FREE</p>
                    <p className="text-xs text-gray-500">100% off</p>
                  </div>
                  <div className="text-centre">
                    <p className="text-sm text-gray-600">Month 2</p>
                    <p className="text-xl font-bold text-gray-900">$198</p>
                    <p className="text-xs text-gray-500">60% off</p>
                  </div>
                  <div className="text-centre">
                    <p className="text-sm text-gray-600">Month 3</p>
                    <p className="text-xl font-bold text-gray-900">$247.50</p>
                    <p className="text-xs text-gray-500">50% off</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">Regular price $495/month from month 4 onwards</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Onboarding Dashboard
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-centre justify-between">
            <div>
              <h1 className="text-3xl font-bold">14-Day Onboarding Program</h1>
              <p className="mt-2 text-blue-100">Welcome to National Recovery Partners</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-blue-100">Contractor ID</p>
              <p className="font-mono font-bold">{onboardingState.contractorId}</p>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mt-8">
            <div className="flex items-centre justify-between mb-2">
              <span className="text-sm">Overall Progress</span>
              <span className="text-sm font-bold">{calculateOverallProgress()}%</span>
            </div>
            <div className="w-full bg-blue-800 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-white h-full transition-all duration-500 rounded-full"
                style={{ width: `${calculateOverallProgress()}%` }}
              />
            </div>
            <div className="mt-2 flex justify-between text-xs text-blue-100">
              <span>Day {onboardingState.currentDay} of 14</span>
              <span>{onboardingState.completedDays.length} modules completed</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Module List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">Training Modules</h2>
                <p className="text-sm text-gray-600 mt-1">Complete each module to progress through the program</p>
              </div>
              
              <div className="divide-y">
                {ONBOARDING_PROGRAM.map((module) => {
                  const status = getModuleStatus(module.day);
                  const isSelected = selectedDay === module.day;
                  
                  return (
                    <div
                      key={module.day}
                      className={`p-6 cursor-pointer transition ${
                        isSelected ? 'bg-blue-50' : 'hover:bg-gray-50'
                      } ${status === 'locked' ? 'opacity-50' : ''}`}
                      onClick={() => status !== 'locked' && setSelectedDay(module.day)}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className={`w-12 h-12 rounded-full flex items-centre justify-centre ${
                            status === 'completed' ? 'bg-green-100' :
                            status === 'available' || status === 'in_progress' ? 'bg-blue-100' :
                            'bg-gray-100'
                          }`}>
                            {getStatusIcon(status)}
                          </div>
                        </div>
                        
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-semibold text-gray-900">
                                Day {module.day}: {module.title}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">{module.description}</p>
                              
                              <div className="flex items-centre space-x-4 mt-3 text-xs text-gray-500">
                                <span className="flex items-centre space-x-1">
                                  <Clock className="w-3 h-3" />
                                  <span>{module.estimatedHours} hours</span>
                                </span>
                                {module.components.videos && (
                                  <span className="flex items-centre space-x-1">
                                    <Video className="w-3 h-3" />
                                    <span>{module.components.videos.length} videos</span>
                                  </span>
                                )}
                                {module.components.assignments && (
                                  <span className="flex items-centre space-x-1">
                                    <FileText className="w-3 h-3" />
                                    <span>{module.components.assignments.length} assignments</span>
                                  </span>
                                )}
                              </div>
                              
                              {/* Learning Formats Available */}
                              <div className="flex items-centre space-x-2 mt-3">
                                <span className="text-xs text-gray-500">Available in:</span>
                                <div className="flex items-centre space-x-1">
                                  <div className="p-1 bg-blue-100 rounded" title="Video Content">
                                    <Video className="w-3 h-3 text-blue-600" />
                                  </div>
                                  <div className="p-1 bg-green-100 rounded" title="Reading Materials">
                                    <BookOpen className="w-3 h-3 text-green-600" />
                                  </div>
                                  <div className="p-1 bg-purple-100 rounded" title="Podcast Episodes">
                                    <Headphones className="w-3 h-3 text-purple-600" />
                                  </div>
                                  <div className="p-1 bg-orange-100 rounded" title="Interactive Assignments">
                                    <FileText className="w-3 h-3 text-orange-600" />
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {status === 'available' && (
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartDay(module.day);
                                }}
                                className="flex items-centre space-x-1 bg-blue-600 text-white px-3 py-1 rounded-lg text-sm hover:bg-blue-700 transition"
                              >
                                <span>Start</span>
                                <ChevronRight className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Module Details Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg sticky top-4">
              <div className="p-6 border-b">
                <h3 className="font-bold text-gray-900">
                  Day {selectedDay}: {ONBOARDING_PROGRAM[selectedDay - 1]?.title}
                </h3>
              </div>
              
              <div className="p-6 space-y-6">
                {/* Objectives */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Learning Objectives</h4>
                  <ul className="space-y-2">
                    {ONBOARDING_PROGRAM[selectedDay - 1]?.objectives.map((objective, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{objective}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Content Breakdown */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Content Breakdown</h4>
                  <div className="space-y-3">
                    {ONBOARDING_PROGRAM[selectedDay - 1]?.components.videos && (
                      <div className="flex items-centre justify-between text-sm">
                        <span className="flex items-centre space-x-2 text-gray-600">
                          <Video className="w-4 h-4" />
                          <span>Video Lessons</span>
                        </span>
                        <span className="font-semibold">
                          {ONBOARDING_PROGRAM[selectedDay - 1].components.videos.reduce((acc, v) => acc + v.duration, 0)} min
                        </span>
                      </div>
                    )}
                    
                    {ONBOARDING_PROGRAM[selectedDay - 1]?.components.readings && (
                      <div className="flex items-centre justify-between text-sm">
                        <span className="flex items-centre space-x-2 text-gray-600">
                          <BookOpen className="w-4 h-4" />
                          <span>Reading Materials</span>
                        </span>
                        <span className="font-semibold">
                          {ONBOARDING_PROGRAM[selectedDay - 1].components.readings.reduce((acc, r) => acc + r.estimatedTime, 0)} min
                        </span>
                      </div>
                    )}
                    
                    {ONBOARDING_PROGRAM[selectedDay - 1]?.components.assignments && (
                      <div className="flex items-centre justify-between text-sm">
                        <span className="flex items-centre space-x-2 text-gray-600">
                          <FileText className="w-4 h-4" />
                          <span>Assignments</span>
                        </span>
                        <span className="font-semibold">
                          {ONBOARDING_PROGRAM[selectedDay - 1].components.assignments.length} tasks
                        </span>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Completion Requirements */}
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Completion Requirements</h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    {ONBOARDING_PROGRAM[selectedDay - 1]?.completionCriteria.minVideoWatchTime && (
                      <li className="flex items-centre space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span>Watch {ONBOARDING_PROGRAM[selectedDay - 1].completionCriteria.minVideoWatchTime}% of videos</span>
                      </li>
                    )}
                    {ONBOARDING_PROGRAM[selectedDay - 1]?.completionCriteria.assignmentsCompleted && (
                      <li className="flex items-centre space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span>Complete all assignments</span>
                      </li>
                    )}
                    {ONBOARDING_PROGRAM[selectedDay - 1]?.completionCriteria.quizScore && (
                      <li className="flex items-centre space-x-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full" />
                        <span>Score {ONBOARDING_PROGRAM[selectedDay - 1].completionCriteria.quizScore}% on quiz</span>
                      </li>
                    )}
                  </ul>
                </div>
                
                {/* Multi-Format Learning Notice */}
                <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <Award className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-semibold text-gray-900 text-sm">Learn Your Way</h5>
                      <p className="text-xs text-gray-600 mt-1">
                        All content available in multiple formats: video tutorials, podcast episodes, 
                        reading materials, and interactive study guides to suit your learning style.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
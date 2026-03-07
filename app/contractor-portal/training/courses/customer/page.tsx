'use client';


import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { useState } from 'react';
import { ArrowLeft, PlayCircle, CheckCircle, Lock, Clock, Users, Award, Download, ChevronRight, MessageSquare, Heart, AlertTriangle, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const Certificate = dynamic(() => import('@/components/contractor/Certificate'), { ssr: false });

function CustomerServiceCoursePageOriginal() {
  const router = useRouter();
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);

  const courseModules = [
    {
      id: 1,
      title: 'Understanding Customer Psychology in Crisis',
      duration: '45 min',
      lessons: [
        'Emotional states during disasters',
        'Stress response and decision making',
        'Building trust in crisis situations',
        'Cultural sensitivity considerations'
      ],
      completed: false,
      locked: false
    },
    {
      id: 2,
      title: 'First Contact Excellence',
      duration: '60 min',
      lessons: [
        'Making a powerful first impression',
        'Active listening techniques',
        'Empathy without over-promising',
        'Setting realistic expectations'
      ],
      completed: false,
      locked: false
    },
    {
      id: 3,
      title: 'Communication During Restoration',
      duration: '75 min',
      lessons: [
        'Daily update protocols',
        'Explaining technical processes simply',
        'Managing timeline expectations',
        'Handling schedule changes'
      ],
      completed: false,
      locked: false
    },
    {
      id: 4,
      title: 'Difficult Conversations',
      duration: '90 min',
      lessons: [
        'Delivering bad news professionally',
        'De-escalation techniques',
        'Handling angry customers',
        'Managing unrealistic expectations'
      ],
      completed: false,
      locked: false
    },
    {
      id: 5,
      title: 'Insurance Communication',
      duration: '60 min',
      lessons: [
        'Explaining coverage limitations',
        'Documentation requirements',
        'Three-way communication strategies',
        'Advocating for the customer'
      ],
      completed: false,
      locked: false
    },
    {
      id: 6,
      title: 'Quality Assurance & Follow-up',
      duration: '45 min',
      lessons: [
        'Final walkthrough protocols',
        'Ensuring customer satisfaction',
        'Post-restoration follow-up',
        'Generating positive reviews'
      ],
      completed: false,
      locked: true
    },
    {
      id: 7,
      title: 'Crisis Intervention',
      duration: '60 min',
      lessons: [
        'Recognising trauma responses',
        'When to involve professionals',
        'Supporting vulnerable customers',
        'Maintaining professional boundaries'
      ],
      completed: false,
      locked: true
    },
    {
      id: 8,
      title: 'Technology & Customer Service',
      duration: '45 min',
      lessons: [
        'Using the customer portal effectively',
        'Photo documentation communication',
        'Digital updates and reporting',
        'Video call best practices'
      ],
      completed: false,
      locked: true
    },
    {
      id: 9,
      title: 'Building Long-term Relationships',
      duration: '30 min',
      lessons: [
        'Creating customer advocates',
        'Referral generation strategies',
        'Community engagement',
        'Brand ambassador development'
      ],
      completed: false,
      locked: true
    },
    {
      id: 10,
      title: 'Final Assessment',
      duration: '60 min',
      lessons: [
        'Review of key concepts',
        'Role-playing scenarios',
        'Written assessment',
        'Certification requirements'
      ],
      completed: false,
      locked: true
    }
  ];

  const handleModuleComplete = (moduleId: number) => {
    if (!completedModules.includes(moduleId)) {
      setCompletedModules([...completedModules, moduleId]);
    }
    if (moduleId < courseModules.length) {
      setCurrentModule(moduleId);
    }
  };

  const totalDuration = courseModules.reduce((acc, module) => {
    const minutes = parseInt(module.duration);
    return acc + minutes;
  }, 0);

  const progress = (completedModules.length / courseModules.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/contractor-portal/training/courses')}
            className="flex items-center gap-2 text-gray-300 hover:text-white mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Courses
          </button>
          <h1 className="text-4xl font-bold text-white mb-4">
            Customer Service Excellence
          </h1>
          <p className="text-gray-200">Master the art of customer communication during disaster recovery</p>
        </div>

        {/* Course Progress */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-xl font-semibold text-white mb-2">Course Progress</h2>
              <p className="text-gray-300">
                {completedModules.length} of {courseModules.length} modules completed
              </p>
            </div>
            <div className="text-right">
              <p className="text-gray-300 mb-1">Total Duration</p>
              <p className="text-2xl font-bold text-white">{Math.floor(totalDuration / 60)}h {totalDuration % 60}min</p>
            </div>
          </div>
          <div className="w-full bg-white/20 rounded-full h-3">
            <div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Module List */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-white mb-6">Course Modules</h2>
              <div className="space-y-4">
                {courseModules.map((module, index) => (
                  <div 
                    key={module.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      currentModule === index 
                        ? 'bg-purple-600/20 border-purple-400' 
                        : 'bg-white/5 border-white/10 hover:bg-white/10'
                    } ${module.locked ? 'opacity-60' : 'cursor-pointer'}`}
                    onClick={() => !module.locked && setCurrentModule(index)}
                  >
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0">
                        {completedModules.includes(module.id) ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : module.locked ? (
                          <Lock className="w-6 h-6 text-gray-200" />
                        ) : (
                          <PlayCircle className="w-6 h-6 text-purple-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-white font-semibold">
                            Module {module.id}: {module.title}
                          </h3>
                          <span className="text-gray-200 text-sm flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {module.duration}
                          </span>
                        </div>
                        <ul className="space-y-1">
                          {module.lessons.map((lesson, lessonIndex) => (
                            <li key={lessonIndex} className="text-gray-200 text-sm flex items-center gap-2">
                              <ChevronRight className="w-3 h-3" />
                              {lesson}
                            </li>
                          ))}
                        </ul>
                        {!module.locked && currentModule === index && (
                          <button
                            onClick={() => handleModuleComplete(module.id)}
                            className="mt-3 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                          >
                            Start Module
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Course Info Sidebar */}
          <div className="space-y-6">
            {/* Course Details */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Course Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-gray-200 text-sm">Focus</p>
                    <p className="text-white font-semibold">Customer Relations</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-gray-200 text-sm">Duration</p>
                    <p className="text-white font-semibold">10 Hours Total</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-purple-400" />
                  <div>
                    <p className="text-gray-200 text-sm">Certification</p>
                    <p className="text-white font-semibold">NRPG Excellence Badge</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Skills */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Key Skills You'll Learn</h3>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300 text-sm">Effective Communication</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300 text-sm">Empathy & Support</span>
                </div>
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300 text-sm">Crisis Management</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="text-gray-300 text-sm">Relationship Building</span>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Course Resources</h3>
              <div className="space-y-2">
                <button className="w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between group">
                  <span className="text-white">Course Handbook</span>
                  <Download className="w-4 h-4 text-gray-200 group-hover:text-purple-400" />
                </button>
                <button className="w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between group">
                  <span className="text-white">Communication Templates</span>
                  <Download className="w-4 h-4 text-gray-200 group-hover:text-purple-400" />
                </button>
                <button className="w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between group">
                  <span className="text-white">Crisis Scenarios Guide</span>
                  <Download className="w-4 h-4 text-gray-200 group-hover:text-purple-400" />
                </button>
              </div>
            </div>

            {/* Certification */}
            {progress === 100 && (
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg p-6">
                <Award className="w-12 h-12 text-white mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">Congratulations!</h3>
                <p className="text-white/90 mb-4">
                  You've completed the Customer Service Excellence course.
                </p>
                <button 
                  onClick={() => setShowCertificate(true)}
                  className="w-full px-4 py-3 bg-white text-purple-400 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-5 h-5" />
                  View Certificate
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Your Certificate</h2>
              <button
                onClick={() => setShowCertificate(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <Certificate
              courseName="Customer Service Excellence"
              contractorName="John Smith" 
              completionDate={new Date().toLocaleDateString()}
              certificateId={`CSE-${Date.now()}`}
              courseHours="10"
              instructorName="National Restoration Projects"
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default function CustomerServiceCoursePage() {
  return (
    <>
      <AntigravityNavbar />
      <CustomerServiceCoursePageOriginal />
      <AntigravityFooter />
    </>
  );
}

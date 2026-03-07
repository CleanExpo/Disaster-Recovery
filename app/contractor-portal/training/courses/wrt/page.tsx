'use client';


import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { useState } from 'react';
import { ArrowLeft, PlayCircle, CheckCircle, Lock, Clock, BookOpen, Award, Download, ChevronRight, Eye } from 'lucide-react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';

const Certificate = dynamic(() => import('@/components/contractor/Certificate'), { ssr: false });

function WRTCoursePageOriginal() {
  const router = useRouter();
  const [currentModule, setCurrentModule] = useState(0);
  const [completedModules, setCompletedModules] = useState<number[]>([]);
  const [showCertificate, setShowCertificate] = useState(false);

  const courseModules = [
    {
      id: 1,
      title: 'Introduction to Water Damage Restoration',
      duration: '45 min',
      lessons: [
        'Understanding water damage categories',
        'Classes of water damage',
        'Health and safety considerations',
        'PPE requirements'
      ],
      completed: false,
      locked: false
    },
    {
      id: 2,
      title: 'Psychrometry and Drying Science',
      duration: '60 min',
      lessons: [
        'Understanding psychrometry',
        'Temperature and humidity relationships',
        'Dew point and vapour pressure',
        'Evaporation and dehumidification'
      ],
      completed: false,
      locked: false
    },
    {
      id: 3,
      title: 'Inspection and Moisture Detection',
      duration: '90 min',
      lessons: [
        'Initial inspection procedures',
        'Moisture meter usage',
        'Thermal imaging techniques',
        'Documentation requirements'
      ],
      completed: false,
      locked: false
    },
    {
      id: 4,
      title: 'Water Extraction Equipment',
      duration: '75 min',
      lessons: [
        'Portable extractors',
        'Truck-mount systems',
        'Extraction tools and accessories',
        'Maintenance and safety'
      ],
      completed: false,
      locked: false
    },
    {
      id: 5,
      title: 'Structural Drying Equipment',
      duration: '90 min',
      lessons: [
        'Air movers and placement',
        'Dehumidifier types and sizing',
        'HEPA air scrubbers',
        'Monitoring equipment'
      ],
      completed: false,
      locked: false
    },
    {
      id: 6,
      title: 'Drying Goals and Strategies',
      duration: '60 min',
      lessons: [
        'Setting drying goals',
        'Open vs closed drying systems',
        'Specialty drying situations',
        'Hardwood floor drying'
      ],
      completed: false,
      locked: true
    },
    {
      id: 7,
      title: 'Antimicrobial Application',
      duration: '45 min',
      lessons: [
        'When to apply antimicrobials',
        'Types of antimicrobials',
        'Application methods',
        'Safety and regulations'
      ],
      completed: false,
      locked: true
    },
    {
      id: 8,
      title: 'Contents Processing',
      duration: '60 min',
      lessons: [
        'Pack-out procedures',
        'Cleaning and restoration methods',
        'Electronics restoration',
        'Document drying'
      ],
      completed: false,
      locked: true
    },
    {
      id: 9,
      title: 'Australian Standards & Regulations',
      duration: '45 min',
      lessons: [
        'AS/NZS 3500 Plumbing standards',
        'Building Code of Australia',
        'WorkSafe requirements',
        'Insurance guidelines'
      ],
      completed: false,
      locked: true
    },
    {
      id: 10,
      title: 'Documentation & RestoreAssist.app',
      duration: '120 min',
      lessons: [
        'Photo documentation',
        'Moisture mapping',
        'Daily drying logs',
        'RestoreAssist.app line items'
      ],
      completed: false,
      locked: true
    },
    {
      id: 11,
      title: 'Customer Communication',
      duration: '30 min',
      lessons: [
        'Setting expectations',
        'Explaining the process',
        'Handling concerns',
        'Final walkthrough'
      ],
      completed: false,
      locked: true
    },
    {
      id: 12,
      title: 'Final Assessment & Certification',
      duration: '90 min',
      lessons: [
        'Review of key concepts',
        'Case studies',
        'Final examination',
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
    // Unlock next module
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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
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
            Water Damage Restoration Technician (WRT)
          </h1>
          <p className="text-gray-200">IICRC Certification Course - Australian Edition</p>
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
              className="bg-gradient-to-r from-blue-500 to-green-500 h-3 rounded-full transition-all duration-500"
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
                        ? 'bg-blue-600/20 border-blue-400' 
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
                          <PlayCircle className="w-6 h-6 text-blue-400" />
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
                            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
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
                  <BookOpen className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-gray-200 text-sm">Modules</p>
                    <p className="text-white font-semibold">12 Comprehensive Modules</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-gray-200 text-sm">Duration</p>
                    <p className="text-white font-semibold">3 Days (24 Hours)</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="w-5 h-5 text-blue-400" />
                  <div>
                    <p className="text-gray-200 text-sm">Certification</p>
                    <p className="text-white font-semibold">IICRC WRT Certificate</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Resources */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Course Resources</h3>
              <div className="space-y-2">
                <button className="w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between group">
                  <span className="text-white">Course Manual (PDF)</span>
                  <Download className="w-4 h-4 text-gray-200 group-hover:text-blue-400" />
                </button>
                <button className="w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between group">
                  <span className="text-white">Quick Reference Guide</span>
                  <Download className="w-4 h-4 text-gray-200 group-hover:text-blue-400" />
                </button>
                <button className="w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between group">
                  <span className="text-white">Psychrometric Chart</span>
                  <Download className="w-4 h-4 text-gray-200 group-hover:text-blue-400" />
                </button>
                <button className="w-full p-3 bg-white/5 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-between group">
                  <span className="text-white">Australian Standards</span>
                  <Download className="w-4 h-4 text-gray-200 group-hover:text-blue-400" />
                </button>
              </div>
            </div>

            {/* Certification */}
            {progress === 100 && (
              <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6">
                <Award className="w-12 h-12 text-white mb-3" />
                <h3 className="text-xl font-semibold text-white mb-2">Congratulations!</h3>
                <p className="text-white/90 mb-4">
                  You've completed all modules. View and download your certificate of completion.
                </p>
                <button 
                  onClick={() => setShowCertificate(true)}
                  className="w-full px-4 py-3 bg-white text-blue-400 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center gap-2"
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
              courseName="Water Damage Restoration Technician (WRT)"
              contractorName="John Smith" 
              completionDate={new Date().toLocaleDateString()}
              certificateId={`WRT-${Date.now()}`}
              courseHours="24"
              instructorName="National Restoration Projects"
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default function WRTCoursePage() {
  return (
    <>
      <AntigravityNavbar />
      <WRTCoursePageOriginal />
      <AntigravityFooter />
    </>
  );
}

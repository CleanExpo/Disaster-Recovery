'use client';


import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { GraduationCap, Clock, Award, CheckCircle, PlayCircle, BookOpen, Target, TrendingUp } from 'lucide-react';

function ContractorPortalTrainingPageOriginal() {
  const courses = [
    {
      id: 1,
      title: 'IICRC Water Damage Restoration Technician (WRT)',
      category: 'Certification',
      duration: '3 days',
      progress: 100,
      status: 'completed',
      certificate: true,
      description: 'Comprehensive training on water damage restoration principles and techniques'
    },
    {
      id: 2,
      title: 'Applied Structural Drying (ASD)',
      category: 'Certification',
      duration: '4 days',
      progress: 75,
      status: 'in-progress',
      certificate: false,
      description: 'Advanced drying techniques and moisture control strategies'
    },
    {
      id: 3,
      title: 'Fire & Smoke Restoration',
      category: 'Specialisation',
      duration: '2 days',
      progress: 0,
      status: 'not-started',
      certificate: false,
      description: 'Techniques for fire damage assessment and restoration'
    },
    {
      id: 4,
      title: 'Mould Remediation for Technicians',
      category: 'Certification',
      duration: '2 days',
      progress: 100,
      status: 'completed',
      certificate: true,
      description: 'Safe and effective mould remediation procedures'
    },
    {
      id: 5,
      title: 'RestoreAssist.app Fundamentals',
      category: 'Software',
      duration: '8 hours',
      progress: 50,
      status: 'in-progress',
      certificate: false,
      description: 'Learn to create accurate estimates using RestoreAssist.app software'
    }
  ];

  const upcomingWebinars = [
    { title: 'New IICRC Standards Update', date: '2024-03-25', time: '2:00 PM AEST' },
    { title: 'Advanced Moisture Mapping', date: '2024-03-28', time: '10:00 AM AEST' },
    { title: 'Insurance Documentation Best Practices', date: '2024-04-02', time: '3:00 PM AEST' }
  ];

  const achievements = [
    { title: 'IICRC Certified', icon: Award, earned: true },
    { title: 'Safety Champion', icon: CheckCircle, earned: true },
    { title: '100 Jobs Completed', icon: Target, earned: true },
    { title: 'Master Technician', icon: GraduationCap, earned: false }
  ];

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800';
      case 'not-started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Training Center</h1>
          <p className="text-gray-700">Enhance your skills and earn certifications</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <GraduationCap className="w-8 h-8 text-blue-600 mb-3" />
            <p className="text-2xl font-bold text-white">5</p>
            <p className="text-gray-700">Courses Enrolled</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <Award className="w-8 h-8 text-green-600 mb-3" />
            <p className="text-2xl font-bold text-white">3</p>
            <p className="text-gray-700">Certifications Earned</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <Clock className="w-8 h-8 text-yellow-600 mb-3" />
            <p className="text-2xl font-bold text-white">48</p>
            <p className="text-gray-700">Training Hours</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <TrendingUp className="w-8 h-8 text-purple-600 mb-3" />
            <p className="text-2xl font-bold text-white">85%</p>
            <p className="text-gray-700">Avg Score</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Course List */}
          <div className="lg:col-span-2">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-white">My Courses</h2>
                <button 
                  onClick={() => window.location.href = '/contractor-portal/training/courses'}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                >
                  Browse All Courses →
                </button>
              </div>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{course.title}</h3>
                        <p className="text-gray-700 text-sm mb-2">{course.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-700">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-4 h-4" />
                            {course.category}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {course.duration}
                          </span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(course.status)}`}>
                        {course.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-700">Progress</span>
                        <span className="text-white font-semibold">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${course.progress === 100 ? 'bg-green-500' : 'bg-blue-500'}`}
                          style={{ width: `${course.progress}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      {course.status === 'completed' && course.certificate ? (
                        <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-2">
                          <Award className="w-4 h-4" />
                          Download Certificate
                        </button>
                      ) : (
                        <button 
                          onClick={() => window.location.href = '/contractor-portal/training/courses'}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm flex items-center gap-2"
                        >
                          <PlayCircle className="w-4 h-4" />
                          {course.status === 'not-started' ? 'Start Course' : 'Continue Learning'}
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Upcoming Webinars */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Upcoming Webinars</h3>
              <div className="space-y-3">
                {upcomingWebinars.map((webinar, index) => (
                  <div key={index} className="p-3 bg-white/5 rounded-lg">
                    <p className="text-white font-medium text-sm mb-1">{webinar.title}</p>
                    <p className="text-gray-700 text-xs">{webinar.date} • {webinar.time}</p>
                    <button className="mt-2 text-blue-600 hover:text-blue-700 text-sm">Register →</button>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Achievements</h3>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg text-center ${
                      achievement.earned ? 'bg-white/10' : 'bg-white/5 opacity-50'
                    }`}
                  >
                    <achievement.icon className={`w-8 h-8 mx-auto mb-2 ${
                      achievement.earned ? 'text-yellow-600' : 'text-gray-700'
                    }`} />
                    <p className={`text-xs ${achievement.earned ? 'text-white' : 'text-gray-700'}`}>
                      {achievement.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default function ContractorPortalTrainingPage() {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <ContractorPortalTrainingPageOriginal />;
  }

  return (
    <>
      <AntigravityNavbar />
      <ContractorPortalTrainingPageOriginal />
      <AntigravityFooter />
    </>
  );
}

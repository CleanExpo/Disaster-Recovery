'use client';


import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookOpen, Clock, Award, Users, Star, Filter, Search, PlayCircle, Lock, CheckCircle } from 'lucide-react';

function CourseCatalogPageOriginal() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterLevel, setFilterLevel] = useState('all');

  const allCourses = [
    // IICRC Certifications
    {
      id: 'wrt',
      title: 'Water Damage Restoration Technician (WRT)',
      category: 'IICRC Certification',
      level: 'Foundation',
      duration: '3 days',
      price: 'FREE',
      enrolled: 1247,
      rating: 4.8,
      modules: 12,
      description: 'Essential certification for water damage restoration professionals',
      thumbnail: '💧',
      locked: false,
      popular: true
    },
    {
      id: 'asd',
      title: 'Applied Structural Drying (ASD)',
      category: 'IICRC Certification',
      level: 'Advanced',
      duration: '4 days',
      price: 'FREE',
      enrolled: 892,
      rating: 4.9,
      modules: 15,
      description: 'Advanced techniques in structural drying and moisture control',
      thumbnail: '🌬️',
      locked: false,
      popular: true
    },
    {
      id: 'fsrt',
      title: 'Fire & Smoke Restoration Technician (FSRT)',
      category: 'IICRC Certification',
      level: 'Foundation',
      duration: '3 days',
      price: 'FREE',
      enrolled: 756,
      rating: 4.7,
      modules: 10,
      description: 'Comprehensive fire and smoke damage restoration training',
      thumbnail: '🔥',
      locked: false
    },
    {
      id: 'amrt',
      title: 'Applied Microbial Remediation Technician (AMRT)',
      category: 'IICRC Certification',
      level: 'Advanced',
      duration: '3 days',
      price: 'FREE',
      enrolled: 634,
      rating: 4.8,
      modules: 11,
      description: 'Mould remediation and microbial contamination control',
      thumbnail: '🦠',
      locked: false
    },
    
    // Australian Standards
    {
      id: 'as3500',
      title: 'AS 3500 Australian Plumbing Standards',
      category: 'Australian Standards',
      level: 'Foundation',
      duration: '1 day',
      price: 'FREE',
      enrolled: 423,
      rating: 4.6,
      modules: 6,
      description: 'Understanding Australian plumbing codes for restoration work',
      thumbnail: '🔧',
      locked: false
    },
    {
      id: 'as3959',
      title: 'AS 3959 Bushfire Construction Standards',
      category: 'Australian Standards',
      level: 'Intermediate',
      duration: '2 days',
      price: 'FREE',
      enrolled: 312,
      rating: 4.7,
      modules: 8,
      description: 'Building in bushfire-prone areas compliance',
      thumbnail: '🏗️',
      locked: false
    },
    
    // Safety & Compliance
    {
      id: 'worksafe',
      title: 'WorkSafe Victoria Compliance',
      category: 'Safety & Compliance',
      level: 'Foundation',
      duration: '8 hours',
      price: 'FREE',
      enrolled: 1856,
      rating: 4.5,
      modules: 5,
      description: 'Victorian workplace safety requirements for restoration',
      thumbnail: '⚠️',
      locked: false,
      required: true
    },
    {
      id: 'asbestos',
      title: 'Asbestos Awareness & Handling',
      category: 'Safety & Compliance',
      level: 'Foundation',
      duration: '6 hours',
      price: 'FREE',
      enrolled: 2103,
      rating: 4.9,
      modules: 4,
      description: 'Safe asbestos identification and handling procedures',
      thumbnail: '☣️',
      locked: false,
      required: true
    },
    
    // Software Training
    {
      id: 'restoreassist',
      title: 'RestoreAssist.app Fundamentals',
      category: 'Software Training',
      level: 'Foundation',
      duration: '2 days',
      price: 'FREE',
      enrolled: 1432,
      rating: 4.6,
      modules: 9,
      description: 'Master insurance estimating with RestoreAssist.app',
      thumbnail: '💻',
      locked: false,
      popular: true
    },
    {
      id: 'encircle',
      title: 'Encircle Documentation System',
      category: 'Software Training',
      level: 'Foundation',
      duration: '4 hours',
      price: 'FREE',
      enrolled: 967,
      rating: 4.5,
      modules: 3,
      description: 'Digital documentation for restoration projects',
      thumbnail: '📱',
      locked: false
    },
    
    // Business Skills
    {
      id: 'customer',
      title: 'Customer Communication Excellence',
      category: 'Business Skills',
      level: 'Foundation',
      duration: '3 hours',
      price: 'FREE',
      enrolled: 2341,
      rating: 4.7,
      modules: 4,
      description: 'Effective communication during disaster recovery',
      thumbnail: '🗣️',
      locked: false
    },
    {
      id: 'insurance',
      title: 'Insurance Claims Management',
      category: 'Business Skills',
      level: 'Intermediate',
      duration: '1 day',
      price: 'FREE',
      enrolled: 1789,
      rating: 4.8,
      modules: 7,
      description: 'Navigate insurance processes efficiently',
      thumbnail: '📋',
      locked: false
    }
  ];

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         course.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || course.category === filterCategory;
    const matchesLevel = filterLevel === 'all' || course.level === filterLevel;
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const categories = [...new Set(allCourses.map(c => c.category))];
  const levels = ['Foundation', 'Intermediate', 'Advanced'];

  const handleStartCourse = (courseId: string) => {
    router.push(`/contractor-portal/training/courses/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Course Catalogue</h1>
          <p className="text-gray-300">Access all NRPG training courses and certifications</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-300 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 focus:outline-none focus:border-blue-400"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <select 
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="bg-transparent border-0 outline-none"
                >
                  <option value="all" className="text-gray-900">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat} className="text-gray-900">{cat}</option>
                  ))}
                </select>
              </button>
              <button className="px-4 py-2 bg-white/20 border border-white/30 rounded-lg text-white hover:bg-white/30 transition-colors flex items-center gap-2">
                <Filter className="w-4 h-4" />
                <select 
                  value={filterLevel}
                  onChange={(e) => setFilterLevel(e.target.value)}
                  className="bg-transparent border-0 outline-none"
                >
                  <option value="all" className="text-gray-900">All Levels</option>
                  {levels.map(level => (
                    <option key={level} value={level} className="text-gray-900">{level}</option>
                  ))}
                </select>
              </button>
            </div>
          </div>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <div key={course.id} className="bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden hover:bg-white/20 transition-colors">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-4xl">{course.thumbnail}</div>
                  <div className="flex flex-col items-end gap-1">
                    {course.popular && (
                      <span className="px-2 py-1 bg-yellow-500 text-white text-xs rounded-full font-semibold">
                        Popular
                      </span>
                    )}
                    {course.required && (
                      <span className="px-2 py-1 bg-red-500 text-white text-xs rounded-full font-semibold">
                        Required
                      </span>
                    )}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold text-white mb-2">{course.title}</h3>
                <p className="text-gray-300 text-sm mb-4">{course.description}</p>
                
                <div className="flex items-center gap-3 text-sm text-gray-300 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {course.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="w-4 h-4" />
                    {course.modules} modules
                  </span>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-white text-sm font-semibold">{course.rating}</span>
                    </div>
                    <span className="text-gray-300 text-sm">({course.enrolled.toLocaleString()} enrolled)</span>
                  </div>
                  <span className="text-green-400 font-semibold">{course.price}</span>
                </div>
                
                <div className="flex gap-2">
                  <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
                    {course.category}
                  </span>
                  <span className="px-2 py-1 bg-white/10 text-gray-300 text-xs rounded">
                    {course.level}
                  </span>
                </div>
                
                <button 
                  onClick={() => handleStartCourse(course.id)}
                  className="w-full mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
                >
                  {course.locked ? (
                    <>
                      <Lock className="w-4 h-4" />
                      Locked
                    </>
                  ) : (
                    <>
                      <PlayCircle className="w-4 h-4" />
                      Start Course
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>

        {filteredCourses.length === 0 && (
          <div className="text-center py-12">
            <BookOpen className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-300 text-lg">No courses found matching your criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
export default function CourseCatalogPage() {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <CourseCatalogPageOriginal />;
  }

  return (
    <>
      <AntigravityNavbar />
      <CourseCatalogPageOriginal />
      <AntigravityFooter />
    </>
  );
}

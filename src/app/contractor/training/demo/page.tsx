'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  BookOpen, PlayCircle, CheckCircle, Clock, Award, ChevronRight, 
  FileText, Users, Star, TrendingUp, Lock, Unlock
} from 'lucide-react';
import { TRAINING_MODULES, getTrainingProgress } from '@/lib/demo-training-modules';

function TrainingDemoContent() {
  const searchParams = useSearchParams();
  const [activeModule, setActiveModule] = useState<string | null>(null);
  const [progress, setProgress] = useState(getTrainingProgress());
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  useEffect(() => {
    if (searchParams.get('auto') === 'true') {
      runAutoDemo();
    }
  }, []);

  const runAutoDemo = async () => {
    setIsAutoPlaying(true);
    
    // Simulate clicking through modules
    const modules = ['WD-001', 'WD-002', 'MR-001', 'SC-001'];
    for (const moduleId of modules) {
      setActiveModule(moduleId);
      await new Promise(resolve => setTimeout(resolve, 2300)); // 15% slower
    }
    
    // Show completion
    setTimeout(() => {
      setIsAutoPlaying(false);
      setActiveModule(null);
    }, 1150);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Header */}
      <header className="bg-black/30 backdrop-blur-sm border-b border-slate-700/50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BookOpen className="h-8 w-8 text-blue-400" />
              <div>
                <h1 className="text-xl font-bold text-white">NRP Training Academy</h1>
                <p className="text-sm text-slate-400">Professional Development Portal</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm text-slate-400">Your Progress</div>
                <div className="text-xl font-bold text-white">{progress.points} Points</div>
              </div>
              <div className="text-right">
                <div className="text-sm text-slate-400">Rank</div>
                <div className="text-sm font-semibold text-yellow-400">{progress.rank}</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Progress Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <CheckCircle className="h-8 w-8 text-green-400" />
              <span className="text-2xl font-bold text-white">{progress.completed}</span>
            </div>
            <div className="text-slate-400">Completed</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <Clock className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold text-white">{progress.inProgress}</span>
            </div>
            <div className="text-slate-400">In Progress</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <Award className="h-8 w-8 text-yellow-400" />
              <span className="text-2xl font-bold text-white">{progress.certificates.length}</span>
            </div>
            <div className="text-slate-400">Certificates</div>
          </div>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-2">
              <TrendingUp className="h-8 w-8 text-purple-400" />
              <span className="text-2xl font-bold text-white">89%</span>
            </div>
            <div className="text-slate-400">Completion Rate</div>
          </div>
        </div>

        {/* Active Certificates */}
        <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50 mb-8">
          <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <Award className="h-6 w-6 text-yellow-400" />
            Your Certifications
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {progress.certificates.map((cert, index) => (
              <div key={index} className="bg-slate-700/50 rounded-lg p-4 border border-slate-600/50">
                <div className="flex items-start justify-between mb-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span className="text-xs text-slate-400">Valid until 2026</span>
                </div>
                <h3 className="font-semibold text-white text-sm">{cert}</h3>
                <div className="flex items-center gap-1 mt-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Training Modules */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Water Damage Training */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                {TRAINING_MODULES.waterDamage.title}
              </h2>
              <span className="text-sm text-slate-400">{TRAINING_MODULES.waterDamage.duration}</span>
            </div>
            
            <div className="space-y-3">
              {TRAINING_MODULES.waterDamage.modules.map((module) => (
                <div
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`
                    p-4 rounded-lg border cursor-pointer transition-all
                    ${activeModule === module.id 
                      ? 'bg-blue-600/20 border-blue-500 ring-2 ring-blue-500/50' 
                      : 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${module.completionRate > 90 ? 'bg-green-600' : 'bg-blue-600'}
                      `}>
                        {module.completionRate > 90 ? (
                          <CheckCircle className="h-5 w-5 text-white" />
                        ) : (
                          <PlayCircle className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{module.title}</h3>
                        <p className="text-sm text-slate-400">{module.duration}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{module.completionRate}%</div>
                      <div className="text-xs text-slate-400">Complete</div>
                    </div>
                  </div>
                  
                  {activeModule === module.id && (
                    <div className="mt-4 pt-4 border-t border-slate-600/50">
                      <div className="text-sm text-slate-300 whitespace-pre-line">
                        {module.content.substring(0, 300)}...
                      </div>
                      <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2">
                        <PlayCircle className="h-4 w-4" />
                        Start Module
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Mould Remediation Training */}
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">
                {TRAINING_MODULES.moldRemediation.title}
              </h2>
              <span className="text-sm text-slate-400">{TRAINING_MODULES.moldRemediation.duration}</span>
            </div>
            
            <div className="space-y-3">
              {TRAINING_MODULES.moldRemediation.modules.map((module) => (
                <div
                  key={module.id}
                  onClick={() => setActiveModule(module.id)}
                  className={`
                    p-4 rounded-lg border cursor-pointer transition-all
                    ${activeModule === module.id 
                      ? 'bg-purple-600/20 border-purple-500 ring-2 ring-purple-500/50' 
                      : 'bg-slate-700/30 border-slate-600/50 hover:bg-slate-700/50'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`
                        w-10 h-10 rounded-full flex items-center justify-center
                        ${module.completionRate > 90 ? 'bg-green-600' : 'bg-purple-600'}
                      `}>
                        {module.completionRate > 90 ? (
                          <CheckCircle className="h-5 w-5 text-white" />
                        ) : (
                          <Lock className="h-5 w-5 text-white" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold text-white">{module.title}</h3>
                        <p className="text-sm text-slate-400">{module.duration}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-white">{module.completionRate}%</div>
                      <div className="text-xs text-slate-400">Complete</div>
                    </div>
                  </div>
                  
                  {activeModule === module.id && (
                    <div className="mt-4 pt-4 border-t border-slate-600/50">
                      <div className="text-sm text-slate-300 whitespace-pre-line">
                        {module.content.substring(0, 300)}...
                      </div>
                      {module.safetyAlert && (
                        <div className="mt-3 p-3 bg-red-600/20 border border-red-500/50 rounded-lg">
                          <p className="text-sm text-red-300 font-medium">⚠️ {module.safetyAlert}</p>
                        </div>
                      )}
                      <button className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-medium transition flex items-center justify-center gap-2">
                        <PlayCircle className="h-4 w-4" />
                        Start Module
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Upcoming Modules */}
        <div className="mt-8 bg-slate-800/50 backdrop-blur-sm rounded-xl p-6 border border-slate-700/50">
          <h2 className="text-xl font-bold text-white mb-4">Recommended Next Modules</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {progress.upcomingModules.map((module, index) => (
              <div key={index} className="bg-slate-700/30 rounded-lg p-4 border border-slate-600/50">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center">
                    <FileText className="h-4 w-4 text-slate-300" />
                  </div>
                  <h3 className="font-medium text-white text-sm">{module}</h3>
                </div>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-slate-400">Prerequisite Met</span>
                  <ChevronRight className="h-4 w-4 text-slate-400" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Demo Mode Indicator */}
        {isAutoPlaying && (
          <div className="fixed bottom-4 right-4 bg-yellow-500 text-black px-4 py-2 rounded-lg shadow-lg animate-pulse">
            Auto-Demo Running...
          </div>
        )}
      </div>
    </div>
  );
}

export default function TrainingDemoPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-white">Loading Training Portal...</div>
      </div>
    }>
      <TrainingDemoContent />
    </Suspense>
  );
}
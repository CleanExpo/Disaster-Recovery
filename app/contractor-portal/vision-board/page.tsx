'use client';


import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import { useState, useEffect } from 'react';
import { Award, Target, TrendingUp, Star, Trophy, Calendar, Download, Trash2, Plus, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface Certificate {
  id: string;
  courseName: string;
  contractorName: string;
  completionDate: string;
  courseHours: string;
  timestamp: string;
}

interface Goal {
  id: string;
  title: string;
  target: string;
  current: string;
  deadline: string;
  completed: boolean;
}

function VisionBoardPageOriginal() {
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [goals, setGoals] = useState<Goal[]>([
    {
      id: '1',
      title: 'Complete IICRC Certifications',
      target: '5 Certifications',
      current: '3',
      deadline: '2024-12-31',
      completed: false
    },
    {
      id: '2',
      title: 'Achieve Top Performer Status',
      target: '95% Rating',
      current: '92%',
      deadline: '2024-06-30',
      completed: false
    },
    {
      id: '3',
      title: 'Monthly Revenue Target',
      target: '$50,000',
      current: '$47,830',
      deadline: '2024-02-29',
      completed: false
    }
  ]);
  const [showAddGoal, setShowAddGoal] = useState(false);
  const [newGoal, setNewGoal] = useState({
    title: '',
    target: '',
    current: '',
    deadline: ''
  });

  useEffect(() => {
    // Load certificates from localStorage
    const savedCertificates = localStorage.getItem('visionBoardCertificates');
    if (savedCertificates) {
      setCertificates(JSON.parse(savedCertificates));
    }

    // Load goals from localStorage
    const savedGoals = localStorage.getItem('visionBoardGoals');
    if (savedGoals) {
      setGoals(JSON.parse(savedGoals));
    }
  }, []);

  const removeCertificate = (id: string) => {
    const updated = certificates.filter(cert => cert.id !== id);
    setCertificates(updated);
    localStorage.setItem('visionBoardCertificates', JSON.stringify(updated));
  };

  const addGoal = () => {
    if (newGoal.title && newGoal.target && newGoal.deadline) {
      const goal: Goal = {
        id: Date.now().toString(),
        title: newGoal.title,
        target: newGoal.target,
        current: newGoal.current || '0',
        deadline: newGoal.deadline,
        completed: false
      };
      const updated = [...goals, goal];
      setGoals(updated);
      localStorage.setItem('visionBoardGoals', JSON.stringify(updated));
      setNewGoal({ title: '', target: '', current: '', deadline: '' });
      setShowAddGoal(false);
    }
  };

  const toggleGoalComplete = (id: string) => {
    const updated = goals.map(goal => 
      goal.id === id ? { ...goal, completed: !goal.completed } : goal
    );
    setGoals(updated);
    localStorage.setItem('visionBoardGoals', JSON.stringify(updated));
  };

  const removeGoal = (id: string) => {
    const updated = goals.filter(goal => goal.id !== id);
    setGoals(updated);
    localStorage.setItem('visionBoardGoals', JSON.stringify(updated));
  };

  const achievements = [
    { icon: Trophy, label: 'Top Performer', value: 'Q4 2023', color: 'bg-yellow-500' },
    { icon: Star, label: 'Customer Rating', value: '4.9/5.0', color: 'bg-blue-500' },
    { icon: CheckCircle, label: 'Jobs Completed', value: '147', color: 'bg-green-500' },
    { icon: TrendingUp, label: 'Growth Rate', value: '+45%', color: 'bg-purple-500' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-purple-900">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">Vision Board</h1>
          <p className="text-gray-200">Track your achievements, certifications, and goals</p>
        </div>

        {/* Achievements Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {achievements.map((achievement, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${achievement.color}`}>
                  <achievement.icon className="w-6 h-6 text-white" />
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-1">{achievement.label}</p>
              <p className="text-2xl font-bold text-white">{achievement.value}</p>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Certifications Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                <Award className="w-6 h-6 text-yellow-400" />
                My Certifications
              </h2>
              <Link
                href="/contractor-portal/training/courses"
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm"
              >
                Earn More
              </Link>
            </div>

            {certificates.length === 0 ? (
              <div className="text-center py-12">
                <Award className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                <p className="text-gray-300 mb-4">No certificates yet</p>
                <Link
                  href="/contractor-portal/training/courses"
                  className="text-indigo-400 hover:text-indigo-300"
                >
                  Start a course to earn your first certificate
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {certificates.map((cert) => (
                  <div key={cert.id} className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-white font-semibold mb-1">{cert.courseName}</h3>
                        <div className="flex items-center gap-4 text-sm text-gray-300">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {cert.completionDate}
                          </span>
                          <span>{cert.courseHours} Hours</span>
                        </div>
                        <p className="text-xs text-gray-200 mt-2">ID: {cert.id}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          className="p-2 text-gray-200 hover:text-white transition-colors"
                          title="Download Certificate"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => removeCertificate(cert.id)}
                          className="p-2 text-gray-200 hover:text-red-600 transition-colors"
                          title="Remove from Board"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Goals Section */}
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white flex items-center gap-2">
                <Target className="w-6 h-6 text-green-400" />
                My Goals
              </h2>
              <button
                onClick={() => setShowAddGoal(true)}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Goal
              </button>
            </div>

            {showAddGoal && (
              <div className="bg-white/10 rounded-lg p-4 mb-4">
                <input
                  type="text"
                  placeholder="Goal title"
                  value={newGoal.title}
                  onChange={(e) => setNewGoal({...newGoal, title: e.target.value})}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300 mb-2"
                />
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <input
                    type="text"
                    placeholder="Target"
                    value={newGoal.target}
                    onChange={(e) => setNewGoal({...newGoal, target: e.target.value})}
                    className="px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300"
                  />
                  <input
                    type="text"
                    placeholder="Current progress"
                    value={newGoal.current}
                    onChange={(e) => setNewGoal({...newGoal, current: e.target.value})}
                    className="px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white placeholder-gray-300"
                  />
                </div>
                <input
                  type="date"
                  value={newGoal.deadline}
                  onChange={(e) => setNewGoal({...newGoal, deadline: e.target.value})}
                  className="w-full px-3 py-2 bg-white/20 border border-white/30 rounded-lg text-white mb-2"
                />
                <div className="flex gap-2">
                  <button
                    onClick={addGoal}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Add
                  </button>
                  <button
                    onClick={() => setShowAddGoal(false)}
                    className="px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-4">
              {goals.map((goal) => (
                <div key={goal.id} className={`bg-white/10 rounded-lg p-4 ${goal.completed ? 'opacity-60' : ''}`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className={`text-white font-semibold mb-1 ${goal.completed ? 'line-through' : ''}`}>
                        {goal.title}
                      </h3>
                      <div className="flex items-center gap-4 text-sm text-gray-300">
                        <span>Target: {goal.target}</span>
                        <span>Current: {goal.current}</span>
                      </div>
                      <p className="text-xs text-gray-200 mt-1">Deadline: {goal.deadline}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleGoalComplete(goal.id)}
                        className={`p-2 transition-colors ${
                          goal.completed 
                            ? 'text-green-400 hover:text-green-400' 
                            : 'text-gray-200 hover:text-white'
                        }`}
                        title={goal.completed ? 'Mark as incomplete' : 'Mark as complete'}
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => removeGoal(goal.id)}
                        className="p-2 text-gray-200 hover:text-red-600 transition-colors"
                        title="Remove goal"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="w-full bg-white/20 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full transition-all"
                        style={{ 
                          width: `${Math.min(
                            (parseFloat(goal.current.replace(/[^0-9.]/g, '')) / 
                             parseFloat(goal.target.replace(/[^0-9.]/g, ''))) * 100,
                            100
                          )}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Motivational Quote */}
        <div className="mt-8 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg p-8 text-center">
          <Trophy className="w-12 h-12 text-yellow-300 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2">Keep Growing!</h3>
          <p className="text-white/90 max-w-2xl mx-auto">
            "Success in disaster recovery isn't just about technical skills—it's about continuous learning, 
            dedication to excellence, and commitment to helping communities rebuild."
          </p>
        </div>
      </div>
    </div>
  );
}
export default function VisionBoardPage() {
  return (
    <>
      <AntigravityNavbar />
      <VisionBoardPageOriginal />
      <AntigravityFooter />
    </>
  );
}

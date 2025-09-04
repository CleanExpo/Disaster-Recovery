'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Play, Pause, CheckCircle, Clock, 
  ChevronRight, BookOpen, Video, FileText, 
  Download, Star, AlertCircle, Shield, Users,
  Target, Zap, Award, MessageSquare
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default function Day1PlatformOrientation() {
  const [currentModule, setCurrentModule] = useState(0);
  const [moduleProgress, setModuleProgress] = useState([100, 100, 75, 0, 0, 0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const modules = [
    {
      id: 1,
      title: "Company Introduction & Mission",
      duration: "75 min",
      type: "video",
      content: {
        videoUrl: "/training/day1/module1.mp4",
        description: "Understanding NRP's vision to revolutionize disaster recovery across Australia",
        keyPoints: [
          "NRP's mission: National disaster recovery platform with zero human intervention",
          "AI-powered lead distribution system",
          "Contractor empowerment through technology",
          "Community-focused profit model",
          "National coverage strategy - every location matters"
        ],
        quiz: [
          {
            question: "What is NRP's primary role in the disaster recovery ecosystem?",
            options: [
              "Direct service provider",
              "Claims distributor and contractor connector",
              "Insurance company",
              "Government agency"
            ],
            correct: 1
          },
          {
            question: "What percentage of Australia does NRP aim to cover?",
            options: ["Major cities only", "50% coverage", "75% coverage", "100% nationwide"],
            correct: 3
          }
        ]
      }
    },
    {
      id: 2,
      title: "Platform Navigation & Dashboard",
      duration: "90 min",
      type: "interactive",
      content: {
        description: "Master the contractor portal and all its features",
        sections: [
          {
            title: "Dashboard Overview",
            points: [
              "Understanding your performance metrics",
              "Lead pipeline visualization",
              "Revenue tracking and projections",
              "Territory heat maps",
              "Real-time notification system"
            ]
          },
          {
            title: "Lead Management System",
            points: [
              "Lead acceptance workflow",
              "Priority and urgency indicators",
              "Insurance company integration",
              "Documentation requirements",
              "Response time SLA tracking"
            ]
          },
          {
            title: "Mobile App Features",
            points: [
              "On-site documentation tools",
              "Photo and video capture",
              "Moisture reading logs",
              "Customer signature collection",
              "Offline mode capabilities"
            ]
          }
        ],
        practicalExercise: "Navigate through 5 mock leads and practice the acceptance workflow"
      }
    },
    {
      id: 3,
      title: "Account Setup & Profile Optimization",
      duration: "60 min",
      type: "workshop",
      content: {
        description: "Create a professional profile that wins more leads",
        steps: [
          {
            step: 1,
            title: "Business Information",
            tasks: [
              "Company registration details",
              "ABN and insurance verification",
              "Service categories selection",
              "Equipment inventory listing",
              "Team member profiles"
            ]
          },
          {
            step: 2,
            title: "Service Area Configuration",
            tasks: [
              "Primary service radius setting",
              "Emergency response zones",
              "After-hours availability",
              "Excluded areas definition",
              "Travel charge zones"
            ]
          },
          {
            step: 3,
            title: "Certification Upload",
            tasks: [
              "IICRC certifications",
              "Insurance documentation",
              "WHS compliance certificates",
              "Equipment calibration records",
              "Team training records"
            ]
          }
        ]
      }
    },
    {
      id: 4,
      title: "Communication Protocols",
      duration: "45 min",
      type: "video",
      content: {
        description: "Professional communication standards and expectations",
        protocols: [
          {
            scenario: "Customer First Contact",
            requirements: [
              "Response within 30 minutes",
              "Professional greeting template",
              "Empathy and reassurance",
              "Clear timeline communication",
              "Insurance process explanation"
            ]
          },
          {
            scenario: "Insurance Company Updates",
            requirements: [
              "Daily progress reports",
              "Photo documentation standards",
              "Scope change procedures",
              "Xactimate integration",
              "Completion certificates"
            ]
          },
          {
            scenario: "Platform Support",
            requirements: [
              "24/7 emergency hotline usage",
              "Technical support tickets",
              "Escalation procedures",
              "Feedback submission",
              "Community forum participation"
            ]
          }
        ]
      }
    },
    {
      id: 5,
      title: "Emergency Response Procedures",
      duration: "60 min",
      type: "simulation",
      content: {
        description: "Critical procedures for emergency disaster response",
        scenarios: [
          {
            type: "Category 3 Water - Midnight Call",
            situation: "Sewage backup in aged care facility",
            criticalSteps: [
              "Immediate response confirmation",
              "PPE and equipment mobilization",
              "Facility manager coordination",
              "Resident safety protocols",
              "Biohazard containment procedures"
            ],
            timeLimit: "1 hour response required"
          },
          {
            type: "Large Commercial Fire",
            situation: "Shopping center fire damage",
            criticalSteps: [
              "Multi-crew coordination",
              "Business interruption minimization",
              "Security and access management",
              "Stakeholder communication",
              "Emergency board-up procedures"
            ],
            timeLimit: "2 hour initial response"
          }
        ]
      }
    },
    {
      id: 6,
      title: "Lead Management Mastery",
      duration: "90 min",
      type: "interactive",
      content: {
        description: "Maximize your lead conversion and profitability",
        topics: [
          {
            title: "Lead Scoring System",
            details: [
              "Understanding the 100-point scoring algorithm",
              "Factors: urgency, value, complexity, location",
              "Insurance company reliability ratings",
              "Historical conversion data",
              "Seasonal demand patterns"
            ]
          },
          {
            title: "Acceptance Strategy",
            details: [
              "Quick assessment techniques",
              "Profitability calculation",
              "Resource availability check",
              "Subcontractor coordination",
              "Risk evaluation matrix"
            ]
          },
          {
            title: "Performance Optimization",
            details: [
              "Response time improvement",
              "Customer satisfaction metrics",
              "Insurance company preferences",
              "Territory expansion opportunities",
              "Premium lead qualification"
            ]
          }
        ],
        finalAssessment: {
          type: "Practical Test",
          description: "Evaluate and process 10 different lead scenarios",
          passingScore: 80,
          timeLimit: "30 minutes"
        }
      }
    }
  ];

  const calculateOverallProgress = () => {
    const total = moduleProgress.reduce((a, b) => a + b, 0);
    return Math.round(total / moduleProgress.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/portal/training">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Training Hub
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Day 1: Platform Orientation</h1>
                <p className="text-sm text-gray-600">Welcome to the NRP Contractor Network</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Day Progress</p>
                <p className="text-lg font-bold">{calculateOverallProgress()}%</p>
              </div>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Materials
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar - Module List */}
        <aside className="w-80 bg-white border-r min-h-screen p-4">
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Today's Modules</h3>
            <Progress value={calculateOverallProgress()} className="h-2" />
          </div>
          
          <div className="space-y-2">
            {modules.map((module, index) => (
              <Card 
                key={module.id}
                className={`cursor-pointer transition-all ${
                  currentModule === index ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setCurrentModule(index)}
              >
                <CardContent className="p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        {moduleProgress[index] === 100 ? (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        ) : moduleProgress[index] > 0 ? (
                          <Clock className="h-4 w-4 text-blue-600" />
                        ) : (
                          <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                        )}
                        <span className="text-xs text-gray-600">Module {module.id}</span>
                      </div>
                      <h4 className="text-sm font-medium">{module.title}</h4>
                      <p className="text-xs text-gray-600 mt-1">
                        {module.duration} • {module.type}
                      </p>
                    </div>
                    {moduleProgress[index] > 0 && (
                      <Badge variant={moduleProgress[index] === 100 ? "default" : "secondary"}>
                        {moduleProgress[index]}%
                      </Badge>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              Complete all modules with 80%+ to unlock Day 2
            </AlertDescription>
          </Alert>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 p-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>{modules[currentModule].title}</CardTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Module {modules[currentModule].id} of {modules.length} • {modules[currentModule].duration}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{modules[currentModule].type}</Badge>
                  <Button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    {isPlaying ? (
                      <><Pause className="h-4 w-4 mr-2" /> Pause</>
                    ) : (
                      <><Play className="h-4 w-4 mr-2" /> Start Module</>
                    )}
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Module Content Based on Type */}
              {modules[currentModule].type === 'video' && (
                <div className="space-y-6">
                  <div className="aspect-video bg-gray-900 rounded-lg flex items-center justify-center">
                    <Play className="h-16 w-16 text-white" />
                  </div>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-3">Key Learning Points</h3>
                      <ul className="space-y-2">
                        {modules[currentModule].content.keyPoints?.map((point, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                            <span className="text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="font-semibold mb-3">Quick Quiz</h3>
                      {modules[currentModule].content.quiz?.map((q, idx) => (
                        <div key={idx} className="mb-4">
                          <p className="text-sm font-medium mb-2">{q.question}</p>
                          <div className="space-y-1">
                            {q.options.map((option, optIdx) => (
                              <label key={optIdx} className="flex items-center gap-2 text-sm">
                                <input type="radio" name={`quiz-${idx}`} />
                                <span>{option}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {modules[currentModule].type === 'interactive' && (
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    {modules[currentModule].content.sections?.map((section, idx) => (
                      <TabsTrigger key={idx} value={`section-${idx}`}>
                        {section.title}
                      </TabsTrigger>
                    ))}
                    <TabsTrigger value="exercise">Practical Exercise</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="overview" className="mt-4">
                    <p className="text-gray-700">{modules[currentModule].content.description}</p>
                  </TabsContent>
                  
                  {modules[currentModule].content.sections?.map((section, idx) => (
                    <TabsContent key={idx} value={`section-${idx}`} className="mt-4">
                      <h3 className="font-semibold mb-3">{section.title}</h3>
                      <ul className="space-y-2">
                        {section.points.map((point, pointIdx) => (
                          <li key={pointIdx} className="flex items-start gap-2">
                            <Target className="h-4 w-4 text-blue-600 mt-0.5" />
                            <span className="text-sm">{point}</span>
                          </li>
                        ))}
                      </ul>
                    </TabsContent>
                  ))}
                  
                  <TabsContent value="exercise" className="mt-4">
                    <Alert>
                      <Zap className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Practical Exercise:</strong> {modules[currentModule].content.practicalExercise}
                      </AlertDescription>
                    </Alert>
                    <Button className="mt-4">Start Exercise</Button>
                  </TabsContent>
                </Tabs>
              )}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8 pt-6 border-t">
                <Button 
                  variant="outline" 
                  disabled={currentModule === 0}
                  onClick={() => setCurrentModule(currentModule - 1)}
                >
                  Previous Module
                </Button>
                <div className="flex items-center gap-2">
                  <Progress value={moduleProgress[currentModule]} className="w-32" />
                  <span className="text-sm text-gray-600">{moduleProgress[currentModule]}%</span>
                </div>
                <Button 
                  onClick={() => {
                    if (currentModule < modules.length - 1) {
                      setCurrentModule(currentModule + 1);
                    }
                  }}
                  disabled={currentModule === modules.length - 1}
                >
                  Next Module
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Support Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="font-semibold">Live Support</p>
                    <p className="text-xs text-gray-600">Get help from instructors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <Users className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="font-semibold">Peer Forum</p>
                    <p className="text-xs text-gray-600">Connect with other contractors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <FileText className="h-8 w-8 text-purple-600" />
                  <div>
                    <p className="font-semibold">Resources</p>
                    <p className="text-xs text-gray-600">Download study materials</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
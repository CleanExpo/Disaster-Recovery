'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  BookOpen, Award, Clock, Calendar, ChevronRight,
  PlayCircle, CheckCircle, Lock, AlertCircle,
  FileText, Users, Shield, Wrench, Heart, Brain,
  ArrowLeft, Download, Star, TrendingUp
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TrainingHub() {
  const [selectedWeek, setSelectedWeek] = useState<'week1' | 'week2'>('week1');

  // 2-Week Training Program Structure
  const trainingProgram = {
    week1: {
      title: "Week 1: Foundation & Core Skills",
      days: [
        {
          day: 1,
          title: "Welcome & Platform Orientation",
          duration: "8 hours",
          modules: [
            "Company introduction and mission",
            "Platform navigation and dashboard overview",
            "Account setup and profile completion",
            "Communication protocols and expectations",
            "Emergency response procedures",
            "Introduction to lead management system"
          ],
          status: "completed",
          score: 92
        },
        {
          day: 2,
          title: "Water Damage Restoration Fundamentals",
          duration: "8 hours",
          modules: [
            "Water damage categories (Clean, Grey, Black)",
            "Moisture detection and measurement",
            "Drying equipment operation",
            "Psychrometry basics",
            "Documentation requirements",
            "IICRC S500 standards overview"
          ],
          status: "completed",
          score: 88
        },
        {
          day: 3,
          title: "Insurance Claims Process",
          duration: "8 hours",
          modules: [
            "Understanding insurance policies",
            "Claim documentation requirements",
            "Xactimate basics and line items",
            "Photo documentation standards",
            "Scope writing fundamentals",
            "Direct billing procedures"
          ],
          status: "in-progress",
          progress: 65
        },
        {
          day: 4,
          title: "Health & Safety Compliance",
          duration: "8 hours",
          modules: [
            "WHS requirements and regulations",
            "PPE selection and usage",
            "Hazard identification and risk assessment",
            "Safe work method statements (SWMS)",
            "Incident reporting procedures",
            "Asbestos awareness"
          ],
          status: "locked"
        },
        {
          day: 5,
          title: "Equipment & Technology",
          duration: "8 hours",
          modules: [
            "Moisture meters and thermal imaging",
            "Air movers and dehumidifiers setup",
            "HEPA filtration systems",
            "Negative air machines",
            "Mobile app usage",
            "Job tracking systems"
          ],
          status: "locked"
        },
        {
          day: 6,
          title: "Customer Service Excellence",
          duration: "8 hours",
          modules: [
            "Communication with distressed clients",
            "Setting expectations",
            "Conflict resolution",
            "Cultural sensitivity",
            "Professional presentation",
            "Review management"
          ],
          status: "locked"
        },
        {
          day: 7,
          title: "Assessment & Review",
          duration: "8 hours",
          modules: [
            "Week 1 knowledge assessment",
            "Practical equipment demonstration",
            "Q&A session",
            "Feedback and coaching",
            "Weekend study materials",
            "Preparation for Week 2"
          ],
          status: "locked"
        }
      ]
    },
    week2: {
      title: "Week 2: Advanced Skills & Specialization",
      days: [
        {
          day: 8,
          title: "Mould Remediation",
          duration: "8 hours",
          modules: [
            "Mould types and health impacts",
            "Containment procedures",
            "Remediation protocols",
            "Air quality testing",
            "Post-remediation verification",
            "IICRC S520 standards"
          ],
          status: "locked"
        },
        {
          day: 9,
          title: "Fire & Smoke Damage",
          duration: "8 hours",
          modules: [
            "Fire damage assessment",
            "Smoke and soot types",
            "Odour removal techniques",
            "Contents restoration",
            "Structural cleaning",
            "Emergency board-up procedures"
          ],
          status: "locked"
        },
        {
          day: 10,
          title: "Biohazard & Trauma Cleaning",
          duration: "8 hours",
          modules: [
            "Bloodborne pathogens",
            "Crime scene protocols",
            "Sewage cleanup procedures",
            "Infectious disease control",
            "Proper disposal methods",
            "Psychological considerations"
          ],
          status: "locked"
        },
        {
          day: 11,
          title: "Commercial & Large Loss",
          duration: "8 hours",
          modules: [
            "Commercial project management",
            "Business interruption minimization",
            "Multi-unit coordination",
            "Industrial drying systems",
            "Documentation at scale",
            "Stakeholder communication"
          ],
          status: "locked"
        },
        {
          day: 12,
          title: "Advanced Business Operations",
          duration: "8 hours",
          modules: [
            "Financial management and invoicing",
            "Quality control procedures",
            "Compliance and auditing",
            "Subcontractor management",
            "Business development",
            "Marketing your services"
          ],
          status: "locked"
        },
        {
          day: 13,
          title: "Practical Application",
          duration: "8 hours",
          modules: [
            "Mock claim scenarios",
            "Equipment setup practicum",
            "Documentation exercise",
            "Customer interaction roleplay",
            "Emergency response simulation",
            "Team coordination drills"
          ],
          status: "locked"
        },
        {
          day: 14,
          title: "Final Assessment & Certification",
          duration: "8 hours",
          modules: [
            "Written examination (80% pass required)",
            "Practical skills demonstration",
            "Job site safety assessment",
            "Customer service evaluation",
            "Platform proficiency test",
            "Certification ceremony"
          ],
          status: "locked"
        }
      ]
    }
  };

  // Certification paths
  const certifications = [
    {
      title: "IICRC Water Damage Restoration Technician (WRT)",
      provider: "IICRC",
      duration: "3 days",
      price: 795,
      status: "available",
      description: "Industry standard certification for water damage restoration professionals"
    },
    {
      title: "IICRC Applied Structural Drying (ASD)",
      provider: "IICRC",
      duration: "3 days",
      price: 895,
      status: "locked",
      prerequisite: "WRT Certification",
      description: "Advanced drying techniques and psychrometry"
    },
    {
      title: "IICRC Fire & Smoke Restoration (FSRT)",
      provider: "IICRC",
      duration: "3 days",
      price: 795,
      status: "available",
      description: "Comprehensive fire and smoke damage restoration training"
    },
    {
      title: "IICRC Mould Remediation (AMRT)",
      provider: "IICRC",
      duration: "2 days",
      price: 695,
      status: "available",
      description: "Applied microbial remediation techniques"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
        return <PlayCircle className="h-5 w-5 text-blue-600" />;
      case 'locked':
        return <Lock className="h-5 w-5 text-gray-400" />;
      default:
        return <AlertCircle className="h-5 w-5 text-yellow-600" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'locked':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/portal">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Training Hub</h1>
                <p className="text-sm text-gray-600">Complete your certification journey</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Overall Progress</p>
                <p className="text-lg font-bold">18% Complete</p>
              </div>
              <Button>
                <Download className="h-4 w-4 mr-2" />
                Download Materials
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        {/* Progress Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Your Training Journey</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Overall Completion</span>
                  <span>2.5 of 14 days</span>
                </div>
                <Progress value={18} className="h-3" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 pt-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-blue-600">2</p>
                  <p className="text-sm text-gray-600">Days Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-600">90%</p>
                  <p className="text-sm text-gray-600">Average Score</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-purple-600">16</p>
                  <p className="text-sm text-gray-600">Modules Completed</p>
                </div>
                <div className="text-center">
                  <p className="text-3xl font-bold text-orange-600">11.5</p>
                  <p className="text-sm text-gray-600">Days Remaining</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Training Program Tabs */}
        <Tabs value={selectedWeek} onValueChange={(value) => setSelectedWeek(value as 'week1' | 'week2')}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="week1">Week 1: Foundation</TabsTrigger>
            <TabsTrigger value="week2">Week 2: Advanced</TabsTrigger>
          </TabsList>

          <TabsContent value="week1" className="mt-6">
            <div className="grid gap-4">
              {trainingProgram.week1.days.map((day) => (
                <Card key={day.day} className={day.status === 'locked' ? 'opacity-60' : ''}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(day.status)}
                        <div>
                          <CardTitle className="text-lg">
                            Day {day.day}: {day.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            <Clock className="inline h-3 w-3 mr-1" />
                            {day.duration} • {day.modules.length} modules
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {day.status === 'completed' && (
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Score</p>
                            <p className="text-xl font-bold text-green-600">{day.score}%</p>
                          </div>
                        )}
                        {day.status === 'in-progress' && (
                          <div className="text-right">
                            <p className="text-sm text-gray-600">Progress</p>
                            <p className="text-xl font-bold text-blue-600">{day.progress}%</p>
                          </div>
                        )}
                        <Badge className={getStatusColor(day.status)}>
                          {day.status === 'completed' ? 'Completed' : 
                           day.status === 'in-progress' ? 'In Progress' : 'Locked'}
                        </Badge>
                        {day.status !== 'locked' && (
                          <Button size="sm">
                            {day.status === 'completed' ? 'Review' : 'Continue'}
                            <ChevronRight className="h-4 w-4 ml-1" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  {day.status !== 'locked' && (
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                        {day.modules.map((module, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <CheckCircle className={`h-3 w-3 ${
                              day.status === 'completed' ? 'text-green-600' : 
                              day.status === 'in-progress' && idx < 4 ? 'text-green-600' : 'text-gray-300'
                            }`} />
                            <span className={day.status === 'completed' || (day.status === 'in-progress' && idx < 4) ? '' : 'text-gray-500'}>
                              {module}
                            </span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  )}
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="week2" className="mt-6">
            <div className="grid gap-4">
              {trainingProgram.week2.days.map((day) => (
                <Card key={day.day} className="opacity-60">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {getStatusIcon(day.status)}
                        <div>
                          <CardTitle className="text-lg">
                            Day {day.day}: {day.title}
                          </CardTitle>
                          <p className="text-sm text-gray-600 mt-1">
                            <Clock className="inline h-3 w-3 mr-1" />
                            {day.duration} • {day.modules.length} modules
                          </p>
                        </div>
                      </div>
                      <Badge className={getStatusColor(day.status)}>
                        Locked - Complete Week 1
                      </Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Certification Paths */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Available Certifications</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert) => (
                <div key={cert.title} className={`p-4 border rounded-lg ${cert.status === 'locked' ? 'opacity-60 bg-gray-50' : 'bg-white'}`}>
                  <div className="flex items-start justify-between mb-3">
                    <Award className="h-8 w-8 text-yellow-600" />
                    {cert.status === 'locked' && <Lock className="h-4 w-4 text-gray-400" />}
                  </div>
                  <h3 className="font-semibold mb-1">{cert.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{cert.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">
                      <p className="text-gray-600">Duration: {cert.duration}</p>
                      <p className="font-semibold">${cert.price}</p>
                      {cert.prerequisite && (
                        <p className="text-xs text-red-600 mt-1">Requires: {cert.prerequisite}</p>
                      )}
                    </div>
                    <Button size="sm" disabled={cert.status === 'locked'}>
                      {cert.status === 'locked' ? 'Locked' : 'Enroll'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Resources */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Support Resources</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <Users className="h-6 w-6 mb-2" />
                <span>Peer Forum</span>
                <span className="text-xs text-gray-600">Connect with other contractors</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <FileText className="h-6 w-6 mb-2" />
                <span>Resource Library</span>
                <span className="text-xs text-gray-600">24/7 access to materials</span>
              </Button>
              <Button variant="outline" className="h-auto py-4 flex flex-col">
                <Heart className="h-6 w-6 mb-2" />
                <span>Mentor Support</span>
                <span className="text-xs text-gray-600">1-on-1 coaching available</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
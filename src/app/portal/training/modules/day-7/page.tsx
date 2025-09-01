'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, FileText, CheckCircle, Award, Clock,
  AlertCircle, BookOpen, Users, MessageSquare, Target,
  TrendingUp, ChevronRight, Info, Download, Clipboard
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

export default function Day7Assessment() {
  const [currentSection, setCurrentSection] = useState(0);
  const [examAnswers, setExamAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const assessmentSections = [
    {
      id: 1,
      title: "Week 1 Knowledge Review",
      duration: "60 min",
      content: {
        topics: [
          {
            module: "Platform & Systems",
            keyPoints: [
              "NRP mission and business model",
              "Lead management system operation",
              "Dashboard navigation and features",
              "Emergency response procedures",
              "Communication protocols"
            ],
            criticalKnowledge: [
              "Lead acceptance within 30 minutes",
              "Documentation requirements",
              "Insurance company procedures",
              "Platform automation features"
            ]
          },
          {
            module: "Water Damage Restoration",
            keyPoints: [
              "Category 1, 2, 3 water classifications",
              "Moisture detection and measurement",
              "Drying equipment operation",
              "Psychrometry basics",
              "IICRC S500 standards"
            ],
            criticalKnowledge: [
              "Dry standards for materials",
              "Equipment placement strategies",
              "Documentation requirements",
              "Safety protocols per category"
            ]
          },
          {
            module: "Insurance Claims",
            keyPoints: [
              "Major Australian insurers",
              "Xactimate line items",
              "Photo documentation standards",
              "Scope writing requirements",
              "Direct billing procedures"
            ],
            criticalKnowledge: [
              "Insurer-specific requirements",
              "Common line item codes",
              "Documentation for approval",
              "Payment timelines"
            ]
          },
          {
            module: "Health & Safety",
            keyPoints: [
              "WHS legislation requirements",
              "PPE for each water category",
              "SWMS requirements",
              "Incident reporting",
              "Asbestos awareness"
            ],
            criticalKnowledge: [
              "Notifiable incidents",
              "PPE selection matrix",
              "Asbestos procedures",
              "Risk assessment process"
            ]
          }
        ]
      }
    },
    {
      id: 2,
      title: "Knowledge Assessment",
      duration: "90 min",
      content: {
        exam: [
          {
            question: "A customer calls with water damage from a burst hot water system. The water has been standing for 4 days. What category is this?",
            options: [
              "Category 1 - Clean water",
              "Category 2 - Grey water",
              "Category 3 - Black water",
              "Need more information"
            ],
            correct: 1,
            explanation: "Category 1 water becomes Category 2 after 48 hours due to microbial growth"
          },
          {
            question: "What is the dry standard for drywall according to IICRC S500?",
            options: [
              "< 5% moisture content",
              "< 1% moisture content or < 16% WME",
              "< 2% moisture content",
              "Match unaffected areas"
            ],
            correct: 1,
            explanation: "Drywall dry standard is < 1% MC or < 16% Wood Moisture Equivalent"
          },
          {
            question: "Which PPE is mandatory for Category 3 water damage?",
            options: [
              "Gloves and boots only",
              "N95 mask and gloves",
              "Full face respirator, Tyvek suit, double gloves",
              "Standard work clothes with boot covers"
            ],
            correct: 2,
            explanation: "Category 3 requires maximum protection including respirator and full body coverage"
          },
          {
            question: "AAMI insurance typically requires initial documentation within:",
            options: [
              "24 hours",
              "48 hours",
              "72 hours",
              "1 week"
            ],
            correct: 0,
            explanation: "AAMI requires 24-hour initial report as per their preferred vendor requirements"
          },
          {
            question: "The Xactimate line item code for water extraction is:",
            options: [
              "WTR_DRY",
              "WTR_EXTRACT",
              "WATER_REM",
              "EXT_WATER"
            ],
            correct: 1,
            explanation: "WTR_EXTRACT (or WTR_EXTR+) is the standard code for water extraction"
          },
          {
            question: "If you discover suspected asbestos during water damage work, you must:",
            options: [
              "Continue work carefully",
              "Wet it down and remove it",
              "STOP WORK IMMEDIATELY and evacuate",
              "Cover it with plastic and continue"
            ],
            correct: 2,
            explanation: "Discovery of asbestos requires immediate work stoppage and area evacuation"
          },
          {
            question: "Air movers should be placed at what angle to walls?",
            options: [
              "90 degrees perpendicular",
              "45 degrees",
              "15-20 degrees",
              "Parallel to wall"
            ],
            correct: 2,
            explanation: "15-20 degree angle creates optimal vortex drying"
          },
          {
            question: "A notifiable incident must be reported to SafeWork:",
            options: [
              "Within 7 days",
              "Within 48 hours",
              "Within 24 hours",
              "Immediately"
            ],
            correct: 3,
            explanation: "Notifiable incidents require immediate notification to SafeWork"
          },
          {
            question: "The optimal temperature range for LGR dehumidifiers is:",
            options: [
              "10-20°C",
              "15-35°C",
              "20-40°C",
              "Any temperature"
            ],
            correct: 1,
            explanation: "LGR dehumidifiers operate optimally between 15-35°C"
          },
          {
            question: "When communicating with a distressed customer, you should:",
            options: [
              "Tell them it could be worse",
              "Focus on technical details",
              "Acknowledge their feelings and provide reassurance",
              "Minimize the situation"
            ],
            correct: 2,
            explanation: "Empathy and acknowledgment are key to customer service"
          }
        ]
      }
    },
    {
      id: 3,
      title: "Practical Demonstration",
      duration: "120 min",
      content: {
        requirements: {
          equipment: {
            task: "Equipment Setup Demonstration",
            items: [
              "Set up moisture meter and take readings",
              "Configure air movers in room",
              "Calculate dehumidifier requirements",
              "Create moisture map",
              "Document with photos"
            ],
            evaluation: [
              "Correct calibration",
              "Proper placement",
              "Accurate calculations",
              "Clear documentation"
            ]
          },
          safety: {
            task: "PPE Selection and Use",
            items: [
              "Select PPE for Category 2 water",
              "Demonstrate proper donning",
              "Explain decontamination",
              "Complete SWMS form",
              "Identify hazards in scenario"
            ],
            evaluation: [
              "Correct PPE selection",
              "Proper procedures",
              "Complete documentation",
              "Hazard recognition"
            ]
          },
          customer: {
            task: "Customer Interaction Role-Play",
            items: [
              "Initial contact script",
              "Explain process clearly",
              "Handle difficult question",
              "Document conversation",
              "Ask for review appropriately"
            ],
            evaluation: [
              "Professional communication",
              "Empathy demonstrated",
              "Clear explanation",
              "Proper documentation"
            ]
          },
          documentation: {
            task: "Job Documentation",
            items: [
              "Complete initial assessment",
              "Take required photos",
              "Create Xactimate estimate",
              "Write scope of work",
              "Complete moisture log"
            ],
            evaluation: [
              "Thoroughness",
              "Accuracy",
              "Professional presentation",
              "Insurance compliance"
            ]
          }
        }
      }
    },
    {
      id: 4,
      title: "Q&A Session",
      duration: "60 min",
      content: {
        format: {
          structure: [
            "Open forum for questions",
            "Clarification of complex topics",
            "Real-world scenario discussion",
            "Instructor experiences shared",
            "Peer learning opportunities"
          ],
          commonQuestions: [
            {
              q: "What if insurance denies the claim?",
              a: "Document everything, help customer appeal, offer cash options, maintain professionalism"
            },
            {
              q: "How do I handle after-hours emergencies?",
              a: "Follow emergency protocol, assess safety first, communicate ETA, mobilize resources"
            },
            {
              q: "What about difficult access properties?",
              a: "Add access charges in Xactimate, document challenges, arrange special equipment"
            },
            {
              q: "How do I know when drying is complete?",
              a: "Meet dry standards, consecutive readings stable, compare to unaffected areas"
            },
            {
              q: "What if customer wants additional work?",
              a: "Separate quote, written approval, clarify not covered by insurance, document"
            }
          ]
        }
      }
    },
    {
      id: 5,
      title: "Feedback & Coaching",
      duration: "45 min",
      content: {
        feedback: {
          individual: [
            "Assessment results review",
            "Strengths identified",
            "Areas for improvement",
            "Personal development plan",
            "Goal setting for Week 2"
          ],
          group: [
            "Common challenges discussed",
            "Best practices shared",
            "Team building exercises",
            "Peer recognition",
            "Success stories"
          ]
        },
        coaching: {
          topics: [
            "Time management strategies",
            "Efficiency improvements",
            "Quality standards",
            "Professional development",
            "Career pathways"
          ],
          resources: [
            "Additional training materials",
            "Industry publications",
            "Online resources",
            "Mentor assignment",
            "Peer support groups"
          ]
        }
      }
    },
    {
      id: 6,
      title: "Week 2 Preparation",
      duration: "30 min",
      content: {
        preview: {
          topics: [
            {
              day: "Day 8",
              title: "Mould Remediation",
              preview: "Types, health impacts, containment, remediation protocols"
            },
            {
              day: "Day 9",
              title: "Fire & Smoke Damage",
              preview: "Assessment, soot types, odour removal, contents restoration"
            },
            {
              day: "Day 10",
              title: "Biohazard & Trauma",
              preview: "Bloodborne pathogens, protocols, psychological considerations"
            },
            {
              day: "Day 11",
              title: "Commercial & Large Loss",
              preview: "Project management, business interruption, stakeholder communication"
            },
            {
              day: "Day 12",
              title: "Advanced Business",
              preview: "Financial management, quality control, business development"
            },
            {
              day: "Day 13",
              title: "Practical Application",
              preview: "Mock scenarios, equipment practicum, team coordination"
            },
            {
              day: "Day 14",
              title: "Final Certification",
              preview: "Written exam, practical demonstration, certification ceremony"
            }
          ],
          preparation: [
            "Review Week 1 materials",
            "Complete homework assignments",
            "Prepare questions",
            "Rest and recharge",
            "Gather required materials"
          ]
        }
      }
    }
  ];

  const calculateScore = () => {
    let correct = 0;
    assessmentSections[1].content.exam.forEach((q, idx) => {
      if (examAnswers[`q${idx}`] === q.correct.toString()) {
        correct++;
      }
    });
    return (correct / assessmentSections[1].content.exam.length) * 100;
  };

  const getGrade = (score: number) => {
    if (score >= 90) return { grade: 'A', color: 'text-green-600', message: 'Excellent!' };
    if (score >= 80) return { grade: 'B', color: 'text-blue-600', message: 'Good job!' };
    if (score >= 70) return { grade: 'C', color: 'text-yellow-600', message: 'Passing' };
    return { grade: 'F', color: 'text-red-600', message: 'Needs improvement' };
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
                <h1 className="text-2xl font-bold text-gray-900">
                  Day 7: Assessment & Review
                </h1>
                <p className="text-sm text-gray-600">Week 1 knowledge check and preparation</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-yellow-100 text-yellow-800">
                <Clipboard className="h-3 w-3 mr-1" />
                Assessment Day
              </Badge>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Study Materials
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 bg-white border-r min-h-screen p-4">
          <Card className="mb-4">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-2">Assessment Progress</h3>
              <Progress value={(currentSection / assessmentSections.length) * 100} className="mb-2" />
              <p className="text-xs text-gray-600">
                Section {currentSection + 1} of {assessmentSections.length}
              </p>
            </CardContent>
          </Card>

          <div className="space-y-2">
            {assessmentSections.map((section, index) => (
              <Card 
                key={section.id}
                className={`cursor-pointer transition-all ${
                  currentSection === index ? 'border-blue-500 bg-blue-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setCurrentSection(index)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    {index < currentSection ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : index === currentSection ? (
                      <Clock className="h-4 w-4 text-blue-600" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                    )}
                    <span className="text-xs text-gray-600">Section {section.id}</span>
                  </div>
                  <h4 className="text-sm font-medium">{section.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{section.duration}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert className="mt-4">
            <Target className="h-4 w-4" />
            <AlertDescription className="text-xs">
              80% pass mark required to proceed to Week 2
            </AlertDescription>
          </Alert>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentSection === 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Week 1 Knowledge Review
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Review Session</AlertTitle>
                    <AlertDescription>
                      Let's review the key concepts from Week 1 before your assessment
                    </AlertDescription>
                  </Alert>

                  <Tabs defaultValue="platform">
                    <TabsList className="grid grid-cols-4 w-full">
                      <TabsTrigger value="platform">Platform</TabsTrigger>
                      <TabsTrigger value="water">Water Damage</TabsTrigger>
                      <TabsTrigger value="insurance">Insurance</TabsTrigger>
                      <TabsTrigger value="safety">Safety</TabsTrigger>
                    </TabsList>

                    {assessmentSections[0].content.topics.map((topic, idx) => (
                      <TabsContent 
                        key={idx} 
                        value={['platform', 'water', 'insurance', 'safety'][idx]}
                        className="mt-6"
                      >
                        <div className="space-y-4">
                          <Card>
                            <CardHeader>
                              <CardTitle className="text-base">{topic.module}</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <h4 className="font-medium mb-3">Key Points to Remember</h4>
                              <ul className="space-y-2 mb-6">
                                {topic.keyPoints.map((point, pIdx) => (
                                  <li key={pIdx} className="flex items-start gap-2">
                                    <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                                    <span className="text-sm">{point}</span>
                                  </li>
                                ))}
                              </ul>

                              <h4 className="font-medium mb-3">Critical Knowledge</h4>
                              <div className="bg-yellow-50 p-4 rounded-lg">
                                <ul className="space-y-2">
                                  {topic.criticalKnowledge.map((item, iIdx) => (
                                    <li key={iIdx} className="flex items-start gap-2">
                                      <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
                                      <span className="text-sm font-medium">{item}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </CardContent>
                          </Card>
                        </div>
                      </TabsContent>
                    ))}
                  </Tabs>
                </div>
              </CardContent>
            </Card>
          )}

          {currentSection === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Knowledge Assessment
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showResults ? (
                  <div className="space-y-6">
                    <Alert>
                      <Clock className="h-4 w-4" />
                      <AlertTitle>Assessment Instructions</AlertTitle>
                      <AlertDescription>
                        Answer all 10 questions. You need 80% to pass. Take your time.
                      </AlertDescription>
                    </Alert>

                    {assessmentSections[1].content.exam.map((question, idx) => (
                      <Card key={idx}>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-3">
                            Question {idx + 1}: {question.question}
                          </h4>
                          <RadioGroup
                            value={examAnswers[`q${idx}`]}
                            onValueChange={(value) => 
                              setExamAnswers({...examAnswers, [`q${idx}`]: value})
                            }
                          >
                            {question.options.map((option, oIdx) => (
                              <div key={oIdx} className="flex items-center space-x-2 mb-2">
                                <RadioGroupItem value={oIdx.toString()} id={`q${idx}-${oIdx}`} />
                                <Label htmlFor={`q${idx}-${oIdx}`} className="cursor-pointer">
                                  {option}
                                </Label>
                              </div>
                            ))}
                          </RadioGroup>
                        </CardContent>
                      </Card>
                    ))}

                    <Button 
                      onClick={() => setShowResults(true)}
                      className="w-full"
                      disabled={Object.keys(examAnswers).length < 10}
                    >
                      Submit Assessment
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <Card>
                      <CardContent className="p-6 text-center">
                        <h3 className="text-2xl font-bold mb-2">Your Score</h3>
                        <div className={`text-6xl font-bold ${getGrade(calculateScore()).color}`}>
                          {calculateScore().toFixed(0)}%
                        </div>
                        <p className="text-xl mt-2">{getGrade(calculateScore()).message}</p>
                        {calculateScore() >= 80 ? (
                          <Badge className="mt-4 bg-green-100 text-green-800">
                            <Award className="h-4 w-4 mr-1" />
                            Passed - Ready for Week 2
                          </Badge>
                        ) : (
                          <Badge className="mt-4 bg-red-100 text-red-800">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            Review needed - Retake required
                          </Badge>
                        )}
                      </CardContent>
                    </Card>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Review Answers</h4>
                      {assessmentSections[1].content.exam.map((question, idx) => {
                        const isCorrect = examAnswers[`q${idx}`] === question.correct.toString();
                        return (
                          <Card key={idx} className={isCorrect ? 'border-green-500' : 'border-red-500'}>
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium">Q{idx + 1}: {question.question}</h5>
                                {isCorrect ? (
                                  <CheckCircle className="h-5 w-5 text-green-600" />
                                ) : (
                                  <AlertCircle className="h-5 w-5 text-red-600" />
                                )}
                              </div>
                              <p className="text-sm mb-2">
                                Your answer: {question.options[parseInt(examAnswers[`q${idx}`]) || 0]}
                              </p>
                              {!isCorrect && (
                                <>
                                  <p className="text-sm text-green-600 mb-2">
                                    Correct answer: {question.options[question.correct]}
                                  </p>
                                  <p className="text-sm text-gray-600">
                                    <strong>Explanation:</strong> {question.explanation}
                                  </p>
                                </>
                              )}
                            </CardContent>
                          </Card>
                        );
                      })}
                    </div>

                    <Button 
                      onClick={() => {
                        setShowResults(false);
                        setExamAnswers({});
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      Retake Assessment
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {currentSection === 5 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Week 2 Preparation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertTitle>Advanced Training Ahead</AlertTitle>
                    <AlertDescription>
                      Week 2 focuses on specialized skills and advanced scenarios
                    </AlertDescription>
                  </Alert>

                  <div>
                    <h3 className="font-semibold mb-4">Week 2 Schedule</h3>
                    <div className="space-y-3">
                      {assessmentSections[5].content.preview.topics.map((day, idx) => (
                        <Card key={idx}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <Badge variant="outline" className="mb-2">{day.day}</Badge>
                                <h4 className="font-semibold">{day.title}</h4>
                                <p className="text-sm text-gray-600 mt-1">{day.preview}</p>
                              </div>
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Weekend Preparation</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {assessmentSections[5].content.preview.preparation.map((item, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-blue-600" />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button 
              variant="outline" 
              disabled={currentSection === 0}
              onClick={() => setCurrentSection(currentSection - 1)}
            >
              Previous Section
            </Button>
            <Button 
              onClick={() => {
                if (currentSection < assessmentSections.length - 1) {
                  setCurrentSection(currentSection + 1);
                }
              }}
            >
              {currentSection === assessmentSections.length - 1 ? 'Complete Week 1' : 'Next Section'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Heart, MessageSquare, Users, Phone,
  AlertCircle, Star, ThumbsUp, Clock, Shield,
  CheckCircle, Info, Download, ChevronRight, Smile
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Day6CustomerService() {
  const [currentModule, setCurrentModule] = useState(0);
  const [selectedScenario, setSelectedScenario] = useState(0);

  const modules = [
    {
      id: 1,
      title: "Communication with Distressed Clients",
      duration: "90 min",
      content: {
        principles: {
          empathy: {
            definition: "Understanding and sharing the feelings of another",
            techniques: [
              "Active listening - focus completely on customer",
              "Acknowledge their feelings - 'I understand this is stressful'",
              "Use their name frequently",
              "Mirror their emotions appropriately",
              "Avoid minimizing their concerns"
            ],
            phrases: {
              good: [
                "I understand how difficult this must be",
                "We're here to help you through this",
                "Let me explain exactly what we'll do",
                "Your safety is our first priority",
                "We'll take care of everything"
              ],
              avoid: [
                "It could be worse",
                "Don't worry about it",
                "That's not my problem",
                "You should have...",
                "Calm down"
              ]
            }
          },
          trauma: {
            recognition: [
              "Customer may be in shock",
              "Emotional responses vary widely",
              "Decision-making may be impaired",
              "May need repeated explanations",
              "Could be dealing with loss"
            ],
            response: [
              "Speak slowly and clearly",
              "Give them time to process",
              "Offer to repeat information",
              "Write down important points",
              "Connect them with support services"
            ]
          }
        },
        firstContact: {
          structure: [
            {
              step: "Introduction",
              script: "Hello [Name], I'm [Your Name] from [Company]. I'm the lead technician who'll be helping you today.",
              purpose: "Establish trust and authority"
            },
            {
              step: "Acknowledgment",
              script: "I understand you've had [describe incident]. That must be very stressful for you.",
              purpose: "Show empathy and understanding"
            },
            {
              step: "Reassurance",
              script: "We're specialists in this type of damage, and we'll get your property back to normal as quickly as possible.",
              purpose: "Provide confidence"
            },
            {
              step: "Process Overview",
              script: "Let me explain what we'll be doing today and over the coming days...",
              purpose: "Set clear expectations"
            },
            {
              step: "Questions",
              script: "Do you have any immediate questions or concerns I can address?",
              purpose: "Open communication"
            }
          ]
        },
        difficultSituations: {
          angry: {
            triggers: [
              "Insurance claim denied",
              "Previous bad experience",
              "Delays in service",
              "Unexpected costs",
              "Property damage during work"
            ],
            deescalation: [
              "Stay calm and professional",
              "Don't take it personally",
              "Acknowledge their frustration",
              "Focus on solutions",
              "Set boundaries if abusive",
              "Document everything"
            ]
          },
          distressed: {
            signs: [
              "Crying or emotional",
              "Unable to make decisions",
              "Repeatedly asking same questions",
              "Withdrawn or non-responsive"
            ],
            support: [
              "Offer water or a place to sit",
              "Give them time",
              "Involve a support person if available",
              "Focus on immediate needs",
              "Provide written information"
            ]
          }
        }
      }
    },
    {
      id: 2,
      title: "Setting Expectations",
      duration: "75 min",
      content: {
        timeline: {
          communication: [
            "Provide realistic timeframes",
            "Explain variables that affect timing",
            "Daily updates on progress",
            "Immediate notification of delays",
            "Clear completion milestones"
          ],
          typical: {
            cat1: {
              extraction: "2-4 hours",
              drying: "3-5 days",
              monitoring: "Daily visits",
              completion: "5-7 days total"
            },
            cat2: {
              extraction: "4-6 hours",
              drying: "5-7 days",
              removal: "1-2 days",
              completion: "7-10 days total"
            },
            cat3: {
              containment: "2-4 hours",
              removal: "2-3 days",
              drying: "7-10 days",
              completion: "10-14 days minimum"
            }
          }
        },
        scope: {
          documentation: [
            "Written scope of work",
            "Clear inclusions/exclusions",
            "Change order process",
            "Additional cost triggers",
            "Customer approval requirements"
          ],
          communication: [
            "Use visual aids (photos, diagrams)",
            "Explain technical terms",
            "Provide options when available",
            "Discuss insurance coverage",
            "Get written approval"
          ]
        },
        livingConditions: {
          habitable: {
            conditions: "Limited affected area, utilities working",
            considerations: [
              "Noise from equipment",
              "Restricted access to areas",
              "Dust and odors",
              "Safety zones"
            ]
          },
          uninhabitable: {
            conditions: "Extensive damage, no utilities, health hazards",
            assistance: [
              "Help with temporary accommodation",
              "Insurance ALE coverage",
              "Packing personal items",
              "Security of property"
            ]
          }
        }
      }
    },
    {
      id: 3,
      title: "Conflict Resolution",
      duration: "90 min",
      content: {
        commonConflicts: {
          scope: {
            issue: "Customer wants more work than insurance covers",
            resolution: [
              "Clearly explain coverage limits",
              "Provide written quote for additional work",
              "Offer payment options",
              "Help them understand policy",
              "Document all discussions"
            ]
          },
          quality: {
            issue: "Customer unhappy with work quality",
            resolution: [
              "Listen to specific concerns",
              "Inspect together",
              "Acknowledge valid issues",
              "Offer immediate remediation",
              "Follow up after completion"
            ]
          },
          timeline: {
            issue: "Work taking longer than expected",
            resolution: [
              "Explain cause of delay",
              "Provide new timeline",
              "Offer compensation if appropriate",
              "Increase communication frequency",
              "Show progress made"
            ]
          }
        },
        resolution: {
          steps: [
            {
              step: 1,
              action: "Listen actively",
              details: "Let them fully express concern without interrupting"
            },
            {
              step: 2,
              action: "Acknowledge",
              details: "Validate their feelings and concerns"
            },
            {
              step: 3,
              action: "Clarify",
              details: "Ask questions to understand fully"
            },
            {
              step: 4,
              action: "Find common ground",
              details: "Identify shared goals"
            },
            {
              step: 5,
              action: "Propose solutions",
              details: "Offer multiple options if possible"
            },
            {
              step: 6,
              action: "Agree and document",
              details: "Get agreement in writing"
            }
          ]
        }
      }
    },
    {
      id: 4,
      title: "Cultural Sensitivity",
      duration: "60 min",
      content: {
        diversity: {
          considerations: [
            "Language barriers",
            "Religious practices",
            "Cultural customs",
            "Gender preferences",
            "Family dynamics",
            "Dietary restrictions"
          ],
          australia: {
            indigenous: [
              "Acknowledge traditional owners",
              "Respect sacred sites",
              "Understanding of Sorry Business",
              "Cultural liaison if needed",
              "Appropriate communication styles"
            ],
            multicultural: [
              "Large CALD communities",
              "Translation services available",
              "Religious considerations (prayer times, etc)",
              "Dietary requirements for crew",
              "Gender-specific service requests"
            ]
          }
        },
        communication: {
          verbal: [
            "Speak clearly, avoid slang",
            "Check understanding frequently",
            "Use visual aids",
            "Offer interpreter services",
            "Be patient with language barriers"
          ],
          nonVerbal: [
            "Be aware of personal space",
            "Understand eye contact differences",
            "Respect physical contact boundaries",
            "Note body language variations",
            "Dress code awareness"
          ]
        },
        religious: {
          considerations: [
            {
              situation: "Entering homes",
              action: "Remove shoes if requested"
            },
            {
              situation: "Prayer times",
              action: "Schedule work around religious obligations"
            },
            {
              situation: "Religious items",
              action: "Handle with extreme care and respect"
            },
            {
              situation: "Dietary restrictions",
              action: "Don't bring prohibited foods on site"
            },
            {
              situation: "Gender preferences",
              action: "Accommodate requests for same-gender workers"
            }
          ]
        }
      }
    },
    {
      id: 5,
      title: "Professional Presentation",
      duration: "45 min",
      content: {
        appearance: {
          uniform: [
            "Clean, professional attire",
            "Company branded clothing",
            "ID badge visible",
            "PPE when required",
            "Good personal hygiene"
          ],
          site: [
            "Clean, organized equipment",
            "Professional signage",
            "Tidy work areas",
            "Proper containment setup",
            "Remove rubbish daily"
          ]
        },
        behavior: {
          professional: [
            "Arrive on time",
            "Introduce all team members",
            "No smoking on property",
            "Appropriate language only",
            "Respect property and belongings",
            "Clean up before leaving"
          ],
          boundaries: [
            "Maintain professional relationship",
            "Don't accept personal gifts",
            "Avoid personal opinions",
            "No social media connections",
            "Refer personal requests to management"
          ]
        },
        communication: {
          updates: [
            "Daily progress reports",
            "Photo documentation",
            "End-of-day summary",
            "Next day's plan",
            "Contact for emergencies"
          ],
          documentation: [
            "All conversations logged",
            "Change requests in writing",
            "Photo consent obtained",
            "Work authorizations signed",
            "Completion certificates"
          ]
        }
      }
    },
    {
      id: 6,
      title: "Review Management",
      duration: "60 min",
      content: {
        importance: {
          impact: [
            "80% of customers check reviews",
            "Reviews affect insurance referrals",
            "Google rankings improvement",
            "Competitive advantage",
            "Premium job access"
          ],
          platforms: [
            "Google My Business",
            "Facebook",
            "ProductReview.com.au",
            "Industry specific sites",
            "Insurance company portals"
          ]
        },
        earning: {
          timing: {
            during: [
              "Exceed expectations daily",
              "Proactive communication",
              "Extra mile service",
              "Address concerns immediately"
            ],
            completion: [
              "Walk through with customer",
              "Ensure complete satisfaction",
              "Provide warranty information",
              "Leave property better than found"
            ]
          },
          asking: {
            when: "After successful completion",
            how: [
              "Would you mind sharing your experience?",
              "Explain it helps other families",
              "Make it easy - send links",
              "Offer to help write if needed",
              "Follow up if not received"
            ]
          }
        },
        responding: {
          positive: {
            response: "Thank you publicly",
            elements: [
              "Personalized message",
              "Mention specific details",
              "Share credit with team",
              "Professional tone"
            ]
          },
          negative: {
            response: "Always respond professionally",
            steps: [
              "Respond quickly (within 24 hours)",
              "Apologize for experience",
              "Don't argue or blame",
              "Offer to discuss offline",
              "Show resolution if achieved",
              "Learn from feedback"
            ]
          }
        }
      }
    }
  ];

  const scenarios = [
    {
      title: "Elderly Flood Victim",
      situation: "82-year-old widow, house flooded, very distressed, no family nearby",
      challenges: [
        "Difficulty understanding process",
        "Overwhelmed by decisions",
        "Limited mobility",
        "Fixed income concerns"
      ],
      bestApproach: [
        "Extra patience and time",
        "Written instructions",
        "Help coordinate services",
        "Connect with social services",
        "Daily check-ins"
      ]
    },
    {
      title: "Angry Business Owner",
      situation: "Restaurant owner, sewage backup, losing $5000/day, blaming everyone",
      challenges: [
        "High financial pressure",
        "Wants immediate results",
        "Threatening legal action",
        "Aggressive communication"
      ],
      bestApproach: [
        "Focus on business continuity",
        "Provide detailed timeline",
        "Escalate to management",
        "Document everything",
        "Prioritize critical areas"
      ]
    },
    {
      title: "Cultural Considerations",
      situation: "Muslim family, house fire during Ramadan, specific requirements",
      challenges: [
        "Prayer time scheduling",
        "Female family members",
        "Handling of religious items",
        "Fasting considerations"
      ],
      bestApproach: [
        "Schedule around prayer times",
        "Offer female technicians",
        "Handle religious items with care",
        "Respect fasting hours",
        "Remove shoes in home"
      ]
    }
  ];

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
                  Day 6: Customer Service Excellence
                </h1>
                <p className="text-sm text-gray-600">Compassion and professionalism</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-purple-100 text-purple-800">
                <Heart className="h-3 w-3 mr-1" />
                Soft Skills Focus
              </Badge>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Communication Guide
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
              <h3 className="font-semibold mb-2">Customer Excellence</h3>
              <Progress value={50} className="mb-2" />
              <p className="text-xs text-gray-600">3 of 6 modules completed</p>
            </CardContent>
          </Card>

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
                  <div className="flex items-center gap-2 mb-1">
                    {index < 3 ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : index === 3 ? (
                      <Clock className="h-4 w-4 text-blue-600" />
                    ) : (
                      <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                    )}
                    <span className="text-xs text-gray-600">Module {module.id}</span>
                  </div>
                  <h4 className="text-sm font-medium">{module.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{module.duration}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <Alert className="mt-4">
            <Smile className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Customer service excellence leads to 5-star reviews and repeat business
            </AlertDescription>
          </Alert>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentModule === 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Communication with Distressed Clients
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="empathy">
                  <TabsList>
                    <TabsTrigger value="empathy">Empathy</TabsTrigger>
                    <TabsTrigger value="first">First Contact</TabsTrigger>
                    <TabsTrigger value="difficult">Difficult Situations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="empathy" className="mt-6">
                    <div className="space-y-6">
                      <Alert>
                        <Heart className="h-4 w-4" />
                        <AlertTitle>Remember</AlertTitle>
                        <AlertDescription>
                          Your customer has just experienced a traumatic event. Your empathy matters.
                        </AlertDescription>
                      </Alert>

                      <div className="grid grid-cols-2 gap-6">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base text-green-600">
                              Good Phrases to Use
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {modules[0].content.principles.empathy.phrases.good.map((phrase, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <ThumbsUp className="h-4 w-4 text-green-600 mt-0.5" />
                                  <span className="text-sm italic">"{phrase}"</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base text-red-600">
                              Phrases to Avoid
                            </CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {modules[0].content.principles.empathy.phrases.avoid.map((phrase, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <AlertCircle className="h-4 w-4 text-red-600 mt-0.5" />
                                  <span className="text-sm italic line-through">"{phrase}"</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Empathy Techniques</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {modules[0].content.principles.empathy.techniques.map((technique, idx) => (
                              <li key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                                <span className="text-sm">{technique}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="first" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">First Contact Structure</h3>
                      {modules[0].content.firstContact.structure.map((step, idx) => (
                        <Card key={idx}>
                          <CardContent className="p-4">
                            <div className="flex items-start gap-4">
                              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-semibold">
                                {idx + 1}
                              </div>
                              <div className="flex-1">
                                <h4 className="font-semibold mb-2">{step.step}</h4>
                                <div className="bg-gray-50 p-3 rounded-lg mb-2">
                                  <p className="text-sm italic">"{step.script}"</p>
                                </div>
                                <p className="text-xs text-gray-600">
                                  <strong>Purpose:</strong> {step.purpose}
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="difficult" className="mt-6">
                    <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Angry Customers</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <h4 className="font-medium mb-2">Common Triggers</h4>
                            <ul className="space-y-1 mb-4">
                              {modules[0].content.difficultSituations.angry.triggers.map((trigger, idx) => (
                                <li key={idx} className="text-sm">• {trigger}</li>
                              ))}
                            </ul>
                            
                            <h4 className="font-medium mb-2">De-escalation Techniques</h4>
                            <ol className="space-y-1">
                              {modules[0].content.difficultSituations.angry.deescalation.map((technique, idx) => (
                                <li key={idx} className="text-sm">
                                  {idx + 1}. {technique}
                                </li>
                              ))}
                            </ol>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader>
                            <CardTitle className="text-base">Distressed Customers</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <h4 className="font-medium mb-2">Signs to Watch For</h4>
                            <ul className="space-y-1 mb-4">
                              {modules[0].content.difficultSituations.distressed.signs.map((sign, idx) => (
                                <li key={idx} className="text-sm">• {sign}</li>
                              ))}
                            </ul>
                            
                            <h4 className="font-medium mb-2">Support Strategies</h4>
                            <ul className="space-y-1">
                              {modules[0].content.difficultSituations.distressed.support.map((strategy, idx) => (
                                <li key={idx} className="text-sm">• {strategy}</li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {currentModule === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Cultural Sensitivity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="diversity">
                  <TabsList>
                    <TabsTrigger value="diversity">Diversity</TabsTrigger>
                    <TabsTrigger value="religious">Religious</TabsTrigger>
                    <TabsTrigger value="communication">Communication</TabsTrigger>
                  </TabsList>

                  <TabsContent value="diversity" className="mt-6">
                    <div className="space-y-4">
                      <Alert>
                        <Info className="h-4 w-4" />
                        <AlertTitle>Australian Context</AlertTitle>
                        <AlertDescription>
                          Australia is one of the world's most multicultural nations. 
                          Nearly 30% of Australians were born overseas.
                        </AlertDescription>
                      </Alert>

                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Indigenous Considerations</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {modules[3].content.diversity.australia.indigenous.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Heart className="h-4 w-4 text-purple-600 mt-0.5" />
                                  <span className="text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Multicultural Communities</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {modules[3].content.diversity.australia.multicultural.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Users className="h-4 w-4 text-blue-600 mt-0.5" />
                                  <span className="text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="religious" className="mt-6">
                    <div className="space-y-4">
                      <h3 className="font-semibold">Religious Considerations</h3>
                      {modules[3].content.religious.considerations.map((item, idx) => (
                        <Card key={idx}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <div>
                                <p className="font-medium">{item.situation}</p>
                                <p className="text-sm text-gray-600 mt-1">{item.action}</p>
                              </div>
                              <Shield className="h-5 w-5 text-gray-400" />
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {currentModule === 5 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5" />
                  Review Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <Star className="h-4 w-4" />
                  <AlertTitle>Critical for Success</AlertTitle>
                  <AlertDescription>
                    5-star reviews lead to more insurance referrals and premium jobs
                  </AlertDescription>
                </Alert>

                <Tabs defaultValue="earning">
                  <TabsList>
                    <TabsTrigger value="earning">Earning Reviews</TabsTrigger>
                    <TabsTrigger value="responding">Responding</TabsTrigger>
                  </TabsList>

                  <TabsContent value="earning" className="mt-6">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">How to Ask for Reviews</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            {modules[5].content.earning.asking.how.map((method, idx) => (
                              <div key={idx} className="flex items-start gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                                <span className="text-sm">{method}</span>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="responding" className="mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="bg-green-50">
                          <CardTitle className="text-base text-green-800">
                            Responding to Positive Reviews
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <ul className="space-y-2">
                            {modules[5].content.responding.positive.elements.map((element, idx) => (
                              <li key={idx} className="text-sm">• {element}</li>
                            ))}
                          </ul>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="bg-red-50">
                          <CardTitle className="text-base text-red-800">
                            Handling Negative Reviews
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <ol className="space-y-2">
                            {modules[5].content.responding.negative.steps.map((step, idx) => (
                              <li key={idx} className="text-sm">
                                {idx + 1}. {step}
                              </li>
                            ))}
                          </ol>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Practical Scenarios */}
          {currentModule === modules.length - 1 && (
            <div className="space-y-6">
              <h3 className="font-semibold">Practice Scenarios</h3>
              {scenarios.map((scenario, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="text-base">{scenario.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{scenario.situation}</p>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">Challenges</h4>
                        <ul className="space-y-1">
                          {scenario.challenges.map((challenge, cIdx) => (
                            <li key={cIdx} className="text-sm">• {challenge}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">Best Approach</h4>
                        <ul className="space-y-1">
                          {scenario.bestApproach.map((approach, aIdx) => (
                            <li key={aIdx} className="text-sm">• {approach}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Navigation */}
          <div className="flex items-center justify-between mt-8">
            <Button 
              variant="outline" 
              disabled={currentModule === 0}
              onClick={() => setCurrentModule(currentModule - 1)}
            >
              Previous Module
            </Button>
            <Button 
              onClick={() => {
                if (currentModule < modules.length - 1) {
                  setCurrentModule(currentModule + 1);
                }
              }}
            >
              {currentModule === modules.length - 1 ? 'Complete Day 6' : 'Next Module'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
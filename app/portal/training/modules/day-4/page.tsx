'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Shield, AlertTriangle, HardHat, FileText,
  Heart, Eye, Radiation, Users, CheckCircle, 
  XCircle, Info, Download, ChevronRight, AlertOctagon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Day4HealthSafety() {
  const [currentModule, setCurrentModule] = useState(0);
  const [completedSections, setCompletedSections] = useState<number[]>([]);

  const modules = [
    {
      id: 1,
      title: "WHS Requirements & Regulations",
      duration: "90 min",
      content: {
        legislation: {
          federal: {
            title: "Work Health and Safety Act 2011",
            keyPoints: [
              "Primary duty of care - ensure health and safety",
              "Consultation with workers required",
              "Incident notification to SafeWork",
              "Record keeping for 5 years minimum",
              "Workers compensation requirements"
            ],
            penalties: {
              category1: "Reckless conduct - $3,000,000 company / $600,000 individual",
              category2: "Failure to comply - $1,500,000 company / $300,000 individual",
              category3: "Other breaches - $500,000 company / $100,000 individual"
            }
          },
          state: {
            qld: {
              authority: "Workplace Health and Safety Queensland",
              specificRequirements: [
                "Asbestos license for removal >10m²",
                "High risk work licenses",
                "Electrical safety requirements",
                "Construction induction (White Card)"
              ]
            },
            nsw: {
              authority: "SafeWork NSW",
              specificRequirements: [
                "SafeWork Method Statements (SWMS)",
                "Asbestos removal notification",
                "Demolition licenses",
                "Traffic management certification"
              ]
            }
          }
        },
        duties: {
          pcbu: [
            "Provide safe work environment",
            "Provide adequate facilities",
            "Provide information and training",
            "Monitor health of workers",
            "Maintain accommodation if provided"
          ],
          workers: [
            "Take reasonable care for own safety",
            "Take care not to affect others",
            "Comply with reasonable instructions",
            "Cooperate with WHS policies"
          ]
        }
      }
    },
    {
      id: 2,
      title: "PPE Selection & Usage",
      duration: "120 min",
      content: {
        categories: {
          cat1Water: {
            minimum: [
              "Nitrile gloves",
              "Safety boots (steel cap, non-slip)",
              "Safety glasses",
              "High-vis vest"
            ],
            optional: [
              "Knee pads",
              "Bump cap"
            ]
          },
          cat2Water: {
            required: [
              "N95/P2 respirator minimum",
              "Nitrile gloves (extended cuff)",
              "Safety boots (waterproof)",
              "Safety glasses or goggles",
              "Disposable coveralls",
              "High-vis vest"
            ],
            decontamination: "Remove and bag before leaving site"
          },
          cat3Water: {
            mandatory: [
              "Full face respirator with P3 filters",
              "Tyvek suit with hood",
              "Nitrile gloves under rubber gloves",
              "Rubber boots with covers",
              "Safety goggles (if half-face respirator)",
              "Duct tape seals at wrists/ankles"
            ],
            decontamination: "Full decon station required",
            disposal: "Biohazard waste bags - licensed disposal"
          },
          asbestos: {
            friable: [
              "Full face respirator with P3 filters",
              "Type 5/6 disposable coveralls",
              "Disposable boot covers",
              "Nitrile gloves",
              "Decontamination unit mandatory"
            ],
            nonFriable: [
              "P2 respirator minimum",
              "Disposable coveralls",
              "Safety glasses",
              "Nitrile gloves"
            ]
          }
        },
        fitTesting: {
          required: "Annual fit testing for all respirators",
          process: [
            "Qualitative fit test (sweet/bitter)",
            "Quantitative fit test (particle count)",
            "User seal check every use",
            "Clean shaven required for seal"
          ],
          documentation: "Keep fit test records for 5 years"
        }
      }
    },
    {
      id: 3,
      title: "Hazard Identification & Risk Assessment",
      duration: "90 min",
      content: {
        hazardCategories: {
          physical: [
            "Slip/trip/fall hazards",
            "Electrical hazards",
            "Structural instability",
            "Sharp objects/debris",
            "Confined spaces",
            "Working at heights"
          ],
          chemical: [
            "Cleaning chemicals",
            "Antimicrobials",
            "Fuel/oil contamination",
            "Unknown substances",
            "Mixing chemical hazards"
          ],
          biological: [
            "Sewage contamination",
            "Mould spores",
            "Bacteria (E.coli, Legionella)",
            "Viruses (Hepatitis, COVID)",
            "Vermin/insects",
            "Sharps/needles"
          ],
          environmental: [
            "Extreme temperatures",
            "Poor ventilation",
            "Noise levels",
            "Poor lighting",
            "Weather conditions"
          ]
        },
        riskMatrix: {
          likelihood: ["Rare", "Unlikely", "Possible", "Likely", "Almost Certain"],
          consequence: ["Insignificant", "Minor", "Moderate", "Major", "Catastrophic"],
          ratings: {
            low: "Manage by routine procedures",
            medium: "Management responsibility must be specified",
            high: "Senior management attention needed",
            extreme: "Immediate action required"
          }
        },
        controls: {
          hierarchy: [
            {
              level: "Elimination",
              description: "Remove the hazard completely",
              example: "Remove damaged asbestos material"
            },
            {
              level: "Substitution",
              description: "Replace with safer alternative",
              example: "Use safer cleaning chemical"
            },
            {
              level: "Engineering",
              description: "Isolate people from hazard",
              example: "Install containment barriers"
            },
            {
              level: "Administrative",
              description: "Change way people work",
              example: "Training, procedures, signage"
            },
            {
              level: "PPE",
              description: "Protect the worker",
              example: "Respirators, gloves, suits"
            }
          ]
        }
      }
    },
    {
      id: 4,
      title: "Safe Work Method Statements (SWMS)",
      duration: "120 min",
      content: {
        requirements: {
          when: [
            "High risk construction work",
            "Working at heights >2m",
            "Confined space entry",
            "Demolition work",
            "Asbestos removal",
            "Electrical work",
            "Structural alterations"
          ],
          mustInclude: [
            "Description of work",
            "Hazards and risks",
            "Control measures",
            "PPE requirements",
            "Training requirements",
            "Emergency procedures"
          ]
        },
        template: {
          sections: [
            {
              title: "Work Activity Details",
              includes: [
                "Project name and address",
                "Principal contractor",
                "Work description",
                "Start date and duration",
                "Workers involved"
              ]
            },
            {
              title: "Hazard Identification",
              includes: [
                "Step-by-step task breakdown",
                "Hazards for each step",
                "Risk rating without controls",
                "People affected"
              ]
            },
            {
              title: "Risk Controls",
              includes: [
                "Control measures for each hazard",
                "Revised risk rating",
                "Responsible person",
                "PPE requirements"
              ]
            },
            {
              title: "Implementation",
              includes: [
                "Training records",
                "Worker consultation",
                "Sign-on sheet",
                "Review dates"
              ]
            }
          ]
        },
        bestPractices: [
          "Review SWMS with all workers before starting",
          "Display on site prominently",
          "Update if conditions change",
          "Workers must sign acknowledgment",
          "Keep for 2 years after work completion"
        ]
      }
    },
    {
      id: 5,
      title: "Incident Reporting Procedures",
      duration: "60 min",
      content: {
        notifiableIncidents: {
          death: {
            action: "Immediately notify SafeWork",
            preserve: "Do not disturb site",
            timeline: "Immediate phone call"
          },
          seriousInjury: {
            examples: [
              "Amputation",
              "Serious head or eye injury",
              "Serious burn",
              "Spinal injury",
              "Loss of consciousness",
              "Medical treatment within 48 hours"
            ],
            action: "Notify immediately",
            form: "Written notification within 48 hours"
          },
          dangerousIncident: {
            examples: [
              "Structural collapse",
              "Fall from height >2m",
              "Electrical shock",
              "Uncontrolled explosion",
              "Uncontrolled escape of gas/steam/fire"
            ],
            action: "Notify immediately even if no injury"
          }
        },
        internalReporting: {
          steps: [
            "Ensure safety - make area safe",
            "Provide first aid if required",
            "Call 000 if emergency",
            "Notify supervisor immediately",
            "Complete incident report form",
            "Take photos of scene",
            "Get witness statements",
            "Preserve evidence"
          ],
          investigation: [
            "What happened?",
            "When and where?",
            "Who was involved?",
            "Why did it happen?",
            "How can we prevent recurrence?"
          ]
        }
      }
    },
    {
      id: 6,
      title: "Asbestos Awareness",
      duration: "90 min",
      content: {
        identification: {
          common: [
            "Fibro sheeting (pre-1990)",
            "Vinyl floor tiles (9x9 inch)",
            "Pipe lagging",
            "Ceiling tiles",
            "Texture coatings",
            "Electrical boards",
            "Roofing materials"
          ],
          assume: "Any building pre-2003 may contain asbestos",
          testing: "Only NATA accredited lab can confirm"
        },
        types: {
          friable: {
            definition: "Can be crumbled by hand pressure",
            examples: ["Pipe lagging", "Sprayed coatings", "Fire doors"],
            risk: "High - releases fibers easily",
            license: "Class A license required"
          },
          nonFriable: {
            definition: "Bonded, cannot be crumbled by hand",
            examples: ["Fibro sheets", "Floor tiles", "Roofing"],
            risk: "Lower unless damaged",
            license: "Class B license for >10m²"
          }
        },
        procedures: {
          discovery: [
            "STOP WORK IMMEDIATELY",
            "Evacuate area",
            "Isolate with barriers",
            "Post warning signs",
            "Notify site supervisor",
            "Do not disturb material",
            "Arrange for testing"
          ],
          waterDamage: [
            "Assume contamination if asbestos present",
            "Do not use high pressure cleaning",
            "Keep material damp",
            "Specialist removal required",
            "Air monitoring required",
            "Clearance certificate needed"
          ]
        },
        health: {
          diseases: [
            "Asbestosis - lung scarring",
            "Mesothelioma - cancer of lung lining",
            "Lung cancer",
            "Pleural plaques"
          ],
          latency: "10-40 years after exposure",
          exposure: "No safe level - minimize all exposure"
        }
      }
    }
  ];

  const practicalScenarios = [
    {
      title: "Sewage Backup in Restaurant",
      scenario: "Category 3 water throughout kitchen and dining area. Staff still present.",
      tasks: [
        "List PPE requirements",
        "Identify all hazards",
        "Write key SWMS points",
        "Determine notification requirements"
      ]
    },
    {
      title: "Ceiling Collapse - Possible Asbestos",
      scenario: "1970s home, ceiling collapsed from water damage, grey fibrous material visible.",
      tasks: [
        "Immediate actions required",
        "PPE selection",
        "Notification procedures",
        "Site control measures"
      ]
    }
  ];

  const handleSectionComplete = (sectionId: number) => {
    if (!completedSections.includes(sectionId)) {
      setCompletedSections([...completedSections, sectionId]);
    }
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
                  Day 4: Health & Safety Compliance
                </h1>
                <p className="text-sm text-gray-600">Your safety and legal compliance</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-red-100 text-red-800">
                <Shield className="h-3 w-3 mr-1" />
                Mandatory Compliance
              </Badge>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download SWMS Templates
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
              <h3 className="font-semibold mb-2">Module Progress</h3>
              <Progress value={(completedSections.length / modules.length) * 100} className="mb-2" />
              <p className="text-xs text-gray-600">
                {completedSections.length} of {modules.length} modules completed
              </p>
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
                    {completedSections.includes(index) ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : currentModule === index ? (
                      <div className="h-4 w-4 rounded-full border-2 border-blue-600 bg-blue-100" />
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

          <Alert className="mt-4 border-red-200 bg-red-50">
            <AlertTriangle className="h-4 w-4 text-red-600" />
            <AlertDescription className="text-xs">
              Safety compliance is mandatory. Failure to follow WHS requirements can result in 
              prosecution and license suspension.
            </AlertDescription>
          </Alert>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentModule === 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  WHS Requirements & Regulations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="legislation">
                  <TabsList>
                    <TabsTrigger value="legislation">Legislation</TabsTrigger>
                    <TabsTrigger value="duties">Duties</TabsTrigger>
                    <TabsTrigger value="penalties">Penalties</TabsTrigger>
                  </TabsList>

                  <TabsContent value="legislation" className="mt-6">
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-semibold mb-3">Federal Requirements</h3>
                        <Card>
                          <CardContent className="p-4">
                            <h4 className="font-medium mb-3">{modules[0].content.legislation.federal.title}</h4>
                            <ul className="space-y-2">
                              {modules[0].content.legislation.federal.keyPoints.map((point, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" />
                                  <span className="text-sm">{point}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3">State Requirements</h3>
                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">Queensland</CardTitle>
                              <p className="text-xs text-gray-600">
                                {modules[0].content.legislation.state.qld.authority}
                              </p>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-1">
                                {modules[0].content.legislation.state.qld.specificRequirements.map((req, idx) => (
                                  <li key={idx} className="text-sm">• {req}</li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">New South Wales</CardTitle>
                              <p className="text-xs text-gray-600">
                                {modules[0].content.legislation.state.nsw.authority}
                              </p>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-1">
                                {modules[0].content.legislation.state.nsw.specificRequirements.map((req, idx) => (
                                  <li key={idx} className="text-sm">• {req}</li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="penalties" className="mt-6">
                    <Alert className="mb-4 border-red-200 bg-red-50">
                      <AlertOctagon className="h-4 w-4" />
                      <AlertTitle>Serious Penalties Apply</AlertTitle>
                      <AlertDescription>
                        WHS breaches can result in imprisonment and significant fines
                      </AlertDescription>
                    </Alert>

                    <div className="space-y-3">
                      {Object.entries(modules[0].content.legislation.federal.penalties).map(([key, value]) => (
                        <Card key={key}>
                          <CardContent className="p-4">
                            <div className="flex items-center justify-between">
                              <span className="font-medium capitalize">
                                {key.replace(/category/, 'Category ')}
                              </span>
                              <Badge variant="destructive">{value}</Badge>
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

          {currentModule === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HardHat className="h-5 w-5" />
                  PPE Selection & Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="cat1">
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="cat1">Category 1</TabsTrigger>
                    <TabsTrigger value="cat2">Category 2</TabsTrigger>
                    <TabsTrigger value="cat3">Category 3</TabsTrigger>
                    <TabsTrigger value="asbestos">Asbestos</TabsTrigger>
                  </TabsList>

                  <TabsContent value="cat1" className="mt-6">
                    <div className="space-y-4">
                      <Alert className="border-green-200 bg-green-50">
                        <Info className="h-4 w-4" />
                        <AlertTitle>Category 1 - Clean Water</AlertTitle>
                        <AlertDescription>
                          Standard PPE for sanitary water sources
                        </AlertDescription>
                      </Alert>

                      <div className="grid grid-cols-2 gap-4">
                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Minimum Required</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {modules[1].content.categories.cat1Water.minimum.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-4 w-4 text-green-600" />
                                  <span className="text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>

                        <Card>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base">Optional</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {modules[1].content.categories.cat1Water.optional.map((item, idx) => (
                                <li key={idx} className="flex items-center gap-2">
                                  <Info className="h-4 w-4 text-blue-600" />
                                  <span className="text-sm">{item}</span>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="cat3" className="mt-6">
                    <div className="space-y-4">
                      <Alert className="border-red-200 bg-red-50">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertTitle>Category 3 - Black Water</AlertTitle>
                        <AlertDescription>
                          Maximum protection required - sewage and contaminated water
                        </AlertDescription>
                      </Alert>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Mandatory PPE</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ul className="space-y-2">
                            {modules[1].content.categories.cat3Water.mandatory.map((item, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <Shield className="h-4 w-4 text-red-600" />
                                <span className="text-sm font-medium">{item}</span>
                              </li>
                            ))}
                          </ul>
                          
                          <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                            <p className="text-sm font-medium mb-1">Decontamination:</p>
                            <p className="text-sm">{modules[1].content.categories.cat3Water.decontamination}</p>
                          </div>
                          
                          <div className="mt-3 p-3 bg-red-50 rounded-lg">
                            <p className="text-sm font-medium mb-1">Disposal:</p>
                            <p className="text-sm">{modules[1].content.categories.cat3Water.disposal}</p>
                          </div>
                        </CardContent>
                      </Card>
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
                  <Radiation className="h-5 w-5" />
                  Asbestos Awareness
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertOctagon className="h-4 w-4" />
                  <AlertTitle>Critical Safety Warning</AlertTitle>
                  <AlertDescription>
                    Asbestos exposure causes fatal diseases. Never disturb suspected asbestos materials.
                  </AlertDescription>
                </Alert>

                <Tabs defaultValue="identification">
                  <TabsList>
                    <TabsTrigger value="identification">Identification</TabsTrigger>
                    <TabsTrigger value="types">Types</TabsTrigger>
                    <TabsTrigger value="procedures">Procedures</TabsTrigger>
                    <TabsTrigger value="health">Health Risks</TabsTrigger>
                  </TabsList>

                  <TabsContent value="identification" className="mt-6">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Common Locations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-3">
                            {modules[5].content.identification.common.map((item, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <AlertTriangle className="h-4 w-4 text-orange-600" />
                                <span className="text-sm">{item}</span>
                              </div>
                            ))}
                          </div>
                          
                          <Alert className="mt-4">
                            <Info className="h-4 w-4" />
                            <AlertDescription>
                              <strong>Important:</strong> {modules[5].content.identification.assume}
                            </AlertDescription>
                          </Alert>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="procedures" className="mt-6">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base text-red-600">
                            If Asbestos Discovered
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <ol className="space-y-2">
                            {modules[5].content.procedures.discovery.map((step, idx) => (
                              <li key={idx} className="flex items-start gap-3">
                                <span className={`flex-shrink-0 w-6 h-6 ${
                                  idx === 0 ? 'bg-red-600' : 'bg-orange-600'
                                } text-white rounded-full flex items-center justify-center text-xs font-bold`}>
                                  {idx + 1}
                                </span>
                                <span className={`text-sm ${idx === 0 ? 'font-bold text-red-600' : ''}`}>
                                  {step}
                                </span>
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
              <Card>
                <CardHeader>
                  <CardTitle>Practical Safety Scenarios</CardTitle>
                </CardHeader>
                <CardContent>
                  {practicalScenarios.map((scenario, idx) => (
                    <Card key={idx} className="mb-4">
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-2">{scenario.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{scenario.scenario}</p>
                        <div className="space-y-2">
                          {scenario.tasks.map((task, taskIdx) => (
                            <label key={taskIdx} className="flex items-start gap-2">
                              <input type="checkbox" className="mt-0.5" />
                              <span className="text-sm">{task}</span>
                            </label>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
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
                handleSectionComplete(currentModule);
                if (currentModule < modules.length - 1) {
                  setCurrentModule(currentModule + 1);
                }
              }}
            >
              {currentModule === modules.length - 1 ? 'Complete Day 4' : 'Next Module'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
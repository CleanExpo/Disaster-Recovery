'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, AlertTriangle, Shield, Microscope, Wind,
  Thermometer, Droplets, CheckCircle, Info, Download,
  ChevronRight, AlertOctagon, Filter, Heart, Camera
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Day8MouldRemediation() {
  const [currentModule, setCurrentModule] = useState(0);
  const [selectedMouldType, setSelectedMouldType] = useState('aspergillus');

  const modules = [
    {
      id: 1,
      title: "Mould Types & Health Impacts",
      duration: "90 min",
      content: {
        commonMoulds: {
          aspergillus: {
            name: "Aspergillus",
            appearance: "Yellow-green to black, powdery",
            habitat: "Walls, insulation, paper products",
            health: {
              risk: "High",
              effects: [
                "Respiratory infections",
                "Allergic reactions",
                "Aspergillosis in immunocompromised",
                "Toxic effects from mycotoxins"
              ]
            },
            remediation: "Professional removal required, HEPA containment"
          },
          penicillium: {
            name: "Penicillium",
            appearance: "Blue-green, velvety texture",
            habitat: "Water-damaged materials, carpet, wallpaper",
            health: {
              risk: "Moderate",
              effects: [
                "Allergic reactions",
                "Asthma triggers",
                "Chronic sinus infections",
                "Hypersensitivity pneumonitis"
              ]
            },
            remediation: "Can be DIY if <10 sq ft, otherwise professional"
          },
          stachybotrys: {
            name: "Stachybotrys (Black Mould)",
            appearance: "Dark green to black, slimy when wet",
            habitat: "Chronically wet materials, drywall, wood",
            health: {
              risk: "Very High",
              effects: [
                "Severe respiratory issues",
                "Neurological symptoms",
                "Immune suppression",
                "Pulmonary hemorrhage in infants"
              ]
            },
            remediation: "Always professional, full containment required"
          },
          cladosporium: {
            name: "Cladosporium",
            appearance: "Olive-green to brown or black",
            habitat: "Both warm and cold conditions, fabrics, wood",
            health: {
              risk: "Moderate",
              effects: [
                "Allergic reactions",
                "Asthma",
                "Skin and eye irritation",
                "Sinus congestion"
              ]
            },
            remediation: "Professional for large areas"
          },
          alternaria: {
            name: "Alternaria",
            appearance: "Dark green or brown, velvet texture",
            habitat: "Damp areas, showers, under sinks",
            health: {
              risk: "Moderate",
              effects: [
                "Allergic reactions",
                "Asthma attacks",
                "Hay fever symptoms",
                "Upper respiratory infections"
              ]
            },
            remediation: "Small areas can be DIY with proper PPE"
          }
        },
        healthRisks: {
          vulnerable: [
            "Infants and children",
            "Elderly people",
            "Immunocompromised individuals",
            "People with respiratory conditions",
            "People with allergies",
            "Pregnant women"
          ],
          symptoms: {
            acute: [
              "Nasal congestion",
              "Eye irritation",
              "Skin rash",
              "Wheezing",
              "Throat irritation"
            ],
            chronic: [
              "Persistent cough",
              "Frequent headaches",
              "Fatigue",
              "Memory problems",
              "Difficulty concentrating"
            ]
          }
        }
      }
    },
    {
      id: 2,
      title: "Containment Procedures",
      duration: "120 min",
      content: {
        levels: {
          level1: {
            scope: "Small isolated areas (< 10 sq ft)",
            containment: "Mini-containment or none",
            procedures: [
              "Regular cleaning practices",
              "Wet wiping with detergent",
              "HEPA vacuum after cleaning",
              "Disposal in sealed bags"
            ],
            ppe: "N95 respirator, gloves, goggles"
          },
          level2: {
            scope: "Mid-sized areas (10-100 sq ft)",
            containment: "Plastic sheeting barriers",
            procedures: [
              "Seal area with 6 mil plastic",
              "Create airlock entry",
              "HEPA filtered exhaust",
              "Suppress dust with misting"
            ],
            ppe: "Half-face respirator with P100, Tyvek suit, gloves, goggles"
          },
          level3: {
            scope: "Large areas (> 100 sq ft)",
            containment: "Full containment required",
            procedures: [
              "Critical barriers with plastic",
              "Negative air pressure (-5 Pa minimum)",
              "Decontamination chamber",
              "Air scrubbers running 24/7",
              "Multiple HEPA units"
            ],
            ppe: "Full-face respirator with P100, disposable Tyvek, double gloves, boot covers"
          },
          level4: {
            scope: "Extensive contamination requiring major removal",
            containment: "Full containment with special procedures",
            procedures: [
              "Complete isolation of area",
              "Negative pressure with monitoring",
              "Worker decontamination facility",
              "All materials double-bagged",
              "Air clearance testing required"
            ],
            ppe: "Full-face PAPR, chemical-resistant suit, triple glove system"
          }
        },
        setup: {
          materials: [
            "6 mil plastic sheeting",
            "Duct tape (professional grade)",
            "Zipper doors or airlocks",
            "Warning signs and barriers",
            "HEPA air scrubbers",
            "Negative air machines",
            "Manometer for pressure monitoring"
          ],
          steps: [
            {
              step: 1,
              action: "Isolate HVAC system",
              detail: "Seal all vents, turn off system"
            },
            {
              step: 2,
              action: "Install critical barriers",
              detail: "Floor to ceiling plastic, sealed edges"
            },
            {
              step: 3,
              action: "Create entry/exit",
              detail: "3-chamber airlock preferred"
            },
            {
              step: 4,
              action: "Establish negative pressure",
              detail: "Minimum 4 air changes per hour"
            },
            {
              step: 5,
              action: "Monitor continuously",
              detail: "Check pressure differential hourly"
            }
          ]
        }
      }
    },
    {
      id: 3,
      title: "Remediation Protocols",
      duration: "150 min",
      content: {
        process: {
          assessment: [
            "Identify moisture source",
            "Determine mould species if needed",
            "Measure affected area",
            "Check for hidden growth",
            "Document with photos",
            "Test air quality baseline"
          ],
          preparation: [
            "Set up containment",
            "Position equipment",
            "Don PPE properly",
            "Cover/remove contents",
            "Protect unaffected areas",
            "Brief team on procedures"
          ],
          removal: {
            nonPorous: [
              "HEPA vacuum surfaces",
              "Wet wipe with antimicrobial",
              "Dry completely",
              "Apply preventive coating"
            ],
            semiPorous: [
              "HEPA vacuum first",
              "Aggressive cleaning",
              "Multiple antimicrobial applications",
              "May need sanding/wire brushing",
              "Seal if keeping"
            ],
            porous: [
              "Usually requires disposal",
              "Double bag materials",
              "Mist before removal to reduce spores",
              "Cut out affected drywall",
              "Remove insulation completely"
            ]
          },
          cleaning: {
            methods: [
              {
                method: "HEPA Vacuuming",
                use: "All surfaces before and after",
                note: "Never use regular vacuum"
              },
              {
                method: "Damp Wiping",
                use: "Non-porous surfaces",
                solution: "Detergent or antimicrobial"
              },
              {
                method: "Abrasive Cleaning",
                use: "Semi-porous surfaces",
                tools: "Wire brushing, sanding, grinding"
              },
              {
                method: "Antimicrobial Application",
                use: "After cleaning",
                products: "EPA-registered fungicides"
              }
            ]
          }
        },
        disposal: {
          bagging: [
            "Double bag all contaminated materials",
            "Seal bags while still in containment",
            "Wipe bag exteriors before removal",
            "Label as contaminated material"
          ],
          transport: [
            "Use covered pathway",
            "Minimize movement through building",
            "Direct to disposal container",
            "Never store overnight inside"
          ],
          documentation: [
            "Weight/volume of materials",
            "Disposal location",
            "Manifest if required",
            "Photos of removal"
          ]
        }
      }
    },
    {
      id: 4,
      title: "Air Quality Testing",
      duration: "90 min",
      content: {
        types: {
          spore: {
            method: "Spore Trap Air Sampling",
            equipment: "Air pump with cassettes",
            purpose: "Identify and quantify airborne spores",
            when: [
              "Pre-remediation baseline",
              "During work verification",
              "Post-remediation clearance",
              "Quality assurance"
            ],
            interpretation: {
              clean: "< 1000 spores/m³",
              elevated: "1000-10,000 spores/m³",
              contaminated: "> 10,000 spores/m³"
            }
          },
          viable: {
            method: "Culturable Air Sampling",
            equipment: "Anderson impactor or similar",
            purpose: "Identify living mould species",
            limitations: "Only detects culturable species",
            timeframe: "3-7 days for results"
          },
          surface: {
            method: "Surface Sampling",
            types: [
              "Tape lift - for visible growth",
              "Swab - for species identification",
              "Bulk - physical sample of material"
            ],
            purpose: "Confirm mould presence and type"
          }
        },
        standards: {
          australia: {
            guidelines: "No federal standard, follow industry best practice",
            references: [
              "AIOH guidelines",
              "IICRC S520 standard",
              "State health department guidelines"
            ]
          },
          clearance: {
            criteria: [
              "Visual inspection - no visible mould",
              "Moisture content - materials at dry standard",
              "Air sampling - spore counts below outside",
              "No musty odours present",
              "All remediation complete"
            ],
            documentation: [
              "Pre and post photos",
              "Air sampling results",
              "Moisture readings",
              "Work completed checklist",
              "Clearance certificate"
            ]
          }
        }
      }
    },
    {
      id: 5,
      title: "Post-Remediation Verification",
      duration: "60 min",
      content: {
        inspection: {
          visual: [
            "All visible mould removed",
            "No staining remaining",
            "Surfaces clean and dry",
            "No debris in containment",
            "Proper repairs completed"
          ],
          moisture: [
            "All materials at dry standard",
            "No active leaks",
            "Humidity < 60% RH",
            "No condensation issues",
            "Proper ventilation restored"
          ],
          odour: [
            "No musty smell",
            "Fresh air circulation",
            "HVAC system clean",
            "No trapped odours"
          ]
        },
        testing: {
          requirements: [
            "Third-party verification preferred",
            "Comparison to outdoor levels",
            "Multiple sample locations",
            "Both air and surface samples",
            "Chain of custody maintained"
          ],
          passing: {
            air: "Indoor spore counts < outdoor",
            surface: "No growth on cleaned surfaces",
            moisture: "All materials < 16% MC",
            visual: "No visible mould or water damage"
          }
        },
        documentation: {
          report: [
            "Executive summary",
            "Scope of work completed",
            "Methods and products used",
            "Test results and interpretation",
            "Photos (before/during/after)",
            "Recommendations for prevention",
            "Warranty information"
          ],
          customer: [
            "Clearance certificate",
            "Test results summary",
            "Maintenance recommendations",
            "Warning signs to watch for",
            "Contact for questions"
          ]
        }
      }
    },
    {
      id: 6,
      title: "IICRC S520 Standards",
      duration: "75 min",
      content: {
        principles: [
          "Safety and health priority",
          "Assessment before remediation",
          "Control of contamination",
          "Removal of contamination",
          "Proper disposal procedures",
          "Verification of remediation"
        ],
        conditions: {
          condition1: {
            name: "Normal Fungal Ecology",
            description: "Normal settled spores, no actual growth",
            action: "Normal cleaning, no remediation needed"
          },
          condition2: {
            name: "Settled Spores",
            description: "Elevated settled spores from nearby growth",
            action: "HEPA vacuum and damp wipe, find source"
          },
          condition3: {
            name: "Actual Growth",
            description: "Active mould growth present",
            action: "Full remediation required, remove growth"
          }
        },
        documentation: {
          required: [
            "Initial assessment report",
            "Work plan and protocol",
            "Daily progress logs",
            "Change orders if scope changes",
            "Final clearance documentation",
            "Chain of custody for samples"
          ]
        }
      }
    }
  ];

  const practicalScenarios = [
    {
      title: "Bathroom Black Mould",
      situation: "Stachybotrys found in bathroom, 50 sq ft affected, family includes infant",
      tasks: [
        "Determine containment level",
        "List PPE requirements",
        "Outline removal process",
        "Specify clearance criteria"
      ]
    },
    {
      title: "Flooded Basement",
      situation: "Basement flooded 2 weeks ago, visible mould on walls and contents",
      tasks: [
        "Assess remediation scope",
        "Plan containment setup",
        "Determine disposal needs",
        "Calculate equipment requirements"
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
                  Day 8: Mould Remediation
                </h1>
                <p className="text-sm text-gray-600">Advanced biohazard control</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-purple-100 text-purple-800">
                <Microscope className="h-3 w-3 mr-1" />
                Specialist Training
              </Badge>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                S520 Standards
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
              <h3 className="font-semibold mb-2">Mould Specialist</h3>
              <Progress value={33} className="mb-2" />
              <p className="text-xs text-gray-600">2 of 6 modules completed</p>
            </CardContent>
          </Card>

          <div className="space-y-2">
            {modules.map((module, index) => (
              <Card 
                key={module.id}
                className={`cursor-pointer transition-all ${
                  currentModule === index ? 'border-purple-500 bg-purple-50' : 'hover:bg-gray-50'
                }`}
                onClick={() => setCurrentModule(index)}
              >
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    {index < 2 ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : index === 2 ? (
                      <div className="h-4 w-4 rounded-full border-2 border-purple-600 bg-purple-100" />
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

          <Alert className="mt-4 border-purple-200 bg-purple-50">
            <AlertOctagon className="h-4 w-4 text-purple-600" />
            <AlertDescription className="text-xs">
              Mould remediation requires specialized training and equipment
            </AlertDescription>
          </Alert>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentModule === 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Microscope className="h-5 w-5" />
                  Mould Types & Health Impacts
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6 border-red-200 bg-red-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertTitle>Health Warning</AlertTitle>
                  <AlertDescription>
                    Mould exposure can cause serious health effects. Always use proper PPE and containment.
                  </AlertDescription>
                </Alert>

                <Tabs value={selectedMouldType} onValueChange={setSelectedMouldType}>
                  <TabsList className="grid grid-cols-5 w-full">
                    <TabsTrigger value="aspergillus">Aspergillus</TabsTrigger>
                    <TabsTrigger value="penicillium">Penicillium</TabsTrigger>
                    <TabsTrigger value="stachybotrys">Black Mould</TabsTrigger>
                    <TabsTrigger value="cladosporium">Cladosporium</TabsTrigger>
                    <TabsTrigger value="alternaria">Alternaria</TabsTrigger>
                  </TabsList>

                  {Object.entries(modules[0].content.commonMoulds).map(([key, mould]) => (
                    <TabsContent key={key} value={key} className="mt-6">
                      <div className="space-y-4">
                        <Card>
                          <CardHeader>
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-lg">{mould.name}</CardTitle>
                              <Badge 
                                variant={mould.health.risk === 'Very High' ? 'destructive' : 
                                        mould.health.risk === 'High' ? 'default' : 'secondary'}
                              >
                                {mould.health.risk} Risk
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium mb-2">Appearance</h4>
                                <p className="text-sm text-gray-600 mb-4">{mould.appearance}</p>
                                
                                <h4 className="font-medium mb-2">Common Habitat</h4>
                                <p className="text-sm text-gray-600">{mould.habitat}</p>
                              </div>
                              <div>
                                <h4 className="font-medium mb-2">Health Effects</h4>
                                <ul className="space-y-1">
                                  {mould.health.effects.map((effect, idx) => (
                                    <li key={idx} className="text-sm flex items-start gap-2">
                                      <AlertTriangle className="h-3 w-3 text-orange-600 mt-0.5" />
                                      {effect}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                            
                            <div className="mt-4 p-3 bg-purple-50 rounded-lg">
                              <p className="text-sm font-medium mb-1">Remediation Requirement:</p>
                              <p className="text-sm">{mould.remediation}</p>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-base">Vulnerable Populations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {modules[0].content.healthRisks.vulnerable.map((group, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <Heart className="h-4 w-4 text-red-600" />
                          <span className="text-sm">{group}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          )}

          {currentModule === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Containment Procedures
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="level2">
                  <TabsList className="grid grid-cols-4 w-full">
                    <TabsTrigger value="level1">Level 1</TabsTrigger>
                    <TabsTrigger value="level2">Level 2</TabsTrigger>
                    <TabsTrigger value="level3">Level 3</TabsTrigger>
                    <TabsTrigger value="level4">Level 4</TabsTrigger>
                  </TabsList>

                  {Object.entries(modules[1].content.levels).map(([key, level]) => (
                    <TabsContent key={key} value={key} className="mt-6">
                      <div className="space-y-4">
                        <Alert className={
                          key === 'level4' ? 'border-red-200 bg-red-50' :
                          key === 'level3' ? 'border-orange-200 bg-orange-50' :
                          key === 'level2' ? 'border-yellow-200 bg-yellow-50' :
                          'border-green-200 bg-green-50'
                        }>
                          <Info className="h-4 w-4" />
                          <AlertTitle>{level.scope}</AlertTitle>
                          <AlertDescription>{level.containment}</AlertDescription>
                        </Alert>

                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">Procedures</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ol className="space-y-2">
                                {level.procedures.map((procedure, idx) => (
                                  <li key={idx} className="text-sm flex items-start gap-2">
                                    <span className="font-semibold">{idx + 1}.</span>
                                    {procedure}
                                  </li>
                                ))}
                              </ol>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">PPE Requirements</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <p className="text-sm font-medium">{level.ppe}</p>
                            </CardContent>
                          </Card>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="text-base">Containment Setup Steps</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {modules[1].content.setup.steps.map((step) => (
                        <div key={step.step} className="flex items-start gap-3">
                          <div className="flex-shrink-0 w-8 h-8 bg-purple-100 text-purple-800 rounded-full flex items-center justify-center font-semibold">
                            {step.step}
                          </div>
                          <div>
                            <p className="font-medium">{step.action}</p>
                            <p className="text-sm text-gray-600">{step.detail}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          )}

          {currentModule === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Remediation Protocols
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="removal">
                  <TabsList>
                    <TabsTrigger value="removal">Removal Methods</TabsTrigger>
                    <TabsTrigger value="cleaning">Cleaning</TabsTrigger>
                    <TabsTrigger value="disposal">Disposal</TabsTrigger>
                  </TabsList>

                  <TabsContent value="removal" className="mt-6">
                    <div className="space-y-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Material-Specific Removal</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Non-Porous Materials</h4>
                              <ul className="space-y-1">
                                {modules[2].content.process.removal.nonPorous.map((method, idx) => (
                                  <li key={idx} className="text-sm">• {method}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Semi-Porous Materials</h4>
                              <ul className="space-y-1">
                                {modules[2].content.process.removal.semiPorous.map((method, idx) => (
                                  <li key={idx} className="text-sm">• {method}</li>
                                ))}
                              </ul>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Porous Materials</h4>
                              <ul className="space-y-1">
                                {modules[2].content.process.removal.porous.map((method, idx) => (
                                  <li key={idx} className="text-sm">• {method}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="cleaning" className="mt-6">
                    <div className="grid grid-cols-2 gap-4">
                      {modules[2].content.process.cleaning.methods.map((method, idx) => (
                        <Card key={idx}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-sm">{method.method}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <p className="text-sm text-gray-600 mb-2">{method.use}</p>
                            {method.solution && (
                              <Badge variant="secondary">{method.solution}</Badge>
                            )}
                            {method.note && (
                              <Alert className="mt-2">
                                <AlertTriangle className="h-3 w-3" />
                                <AlertDescription className="text-xs">
                                  {method.note}
                                </AlertDescription>
                              </Alert>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Practical Scenarios */}
          {currentModule === modules.length - 1 && (
            <div className="space-y-6">
              <h3 className="font-semibold">Practical Mould Scenarios</h3>
              {practicalScenarios.map((scenario, idx) => (
                <Card key={idx}>
                  <CardHeader>
                    <CardTitle className="text-base">{scenario.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-3">{scenario.situation}</p>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Complete these tasks:</p>
                      {scenario.tasks.map((task, tIdx) => (
                        <label key={tIdx} className="flex items-start gap-2">
                          <input type="checkbox" className="mt-0.5" />
                          <span className="text-sm">{task}</span>
                        </label>
                      ))}
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
              {currentModule === modules.length - 1 ? 'Complete Day 8' : 'Next Module'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
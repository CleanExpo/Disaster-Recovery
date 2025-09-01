'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Droplets, AlertTriangle, ThermometerSun,
  Wind, Gauge, Camera, FileText, CheckCircle,
  Play, BookOpen, Download, ChevronRight, Info
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

export default function Day2WaterDamageRestoration() {
  const [currentModule, setCurrentModule] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'cat1' | 'cat2' | 'cat3'>('cat1');

  const modules = [
    {
      id: 1,
      title: "Water Damage Categories",
      duration: "90 min",
      content: {
        categories: {
          cat1: {
            name: "Category 1 - Clean Water",
            source: "Sanitary water sources",
            examples: [
              "Broken water supply lines",
              "Tub or sink overflows (no contaminants)",
              "Appliance malfunctions (dishwasher, washing machine)",
              "Melting ice or snow",
              "Falling rainwater (direct)",
              "Toilet tanks (not bowls)"
            ],
            response: {
              timeframe: "Within 24-48 hours",
              ppe: "Standard - gloves, boots",
              treatment: "Standard extraction and drying",
              materials: "Most can be dried and restored"
            },
            australianContext: [
              "Common in Queensland during storm season",
              "Air conditioning condensation issues in tropical areas",
              "Burst pipes from heat expansion"
            ]
          },
          cat2: {
            name: "Category 2 - Grey Water",
            source: "Significant contamination",
            examples: [
              "Discharge from dishwashers or washing machines",
              "Toilet overflow with urine (no feces)",
              "Sump pump failures",
              "Aquarium water",
              "Water from waterbed punctures",
              "Category 1 water after 48 hours"
            ],
            response: {
              timeframe: "Within 24 hours critical",
              ppe: "Enhanced - N95 mask, eye protection",
              treatment: "Antimicrobial application required",
              materials: "Porous materials often need removal"
            },
            australianContext: [
              "Common in older Australian homes with poor drainage",
              "Laundry overflow in high-density housing",
              "Grey water recycling system failures"
            ]
          },
          cat3: {
            name: "Category 3 - Black Water",
            source: "Grossly contaminated water",
            examples: [
              "Sewage backups",
              "Flooding from rivers or streams",
              "Ground surface water",
              "Toilet overflow with feces",
              "Standing water with microbial growth",
              "Category 2 water after 48 hours"
            ],
            response: {
              timeframe: "Immediate response required",
              ppe: "Full PPE - Tyvek suit, respirator, gloves, boots",
              treatment: "Complete containment and remediation",
              materials: "Most porous materials must be removed"
            },
            australianContext: [
              "Brisbane River flooding events",
              "Tropical cyclone storm surge",
              "Septic system failures in rural areas",
              "Council sewer main backups"
            ]
          }
        }
      }
    },
    {
      id: 2,
      title: "Moisture Detection & Measurement",
      duration: "120 min",
      content: {
        equipment: [
          {
            name: "Penetrating Moisture Meter",
            use: "Wood and drywall moisture content",
            reading: "6-40% moisture content",
            technique: "Insert pins perpendicular to surface",
            calibration: "Check with calibration block daily"
          },
          {
            name: "Non-Penetrating Moisture Meter",
            use: "Quick scanning of large areas",
            reading: "Relative scale 0-100",
            technique: "Flat against surface, systematic pattern",
            calibration: "Zero on dry standard material"
          },
          {
            name: "Thermal Imaging Camera",
            use: "Identify wet areas behind walls",
            reading: "Temperature differentials",
            technique: "Scan slowly, note cool spots",
            limitations: "Not a moisture meter - confirms with meter"
          },
          {
            name: "Thermo-Hygrometer",
            use: "Ambient temperature and humidity",
            reading: "°C and %RH",
            critical: "Calculate GPP and dew point",
            documentation: "Record every 4 hours minimum"
          }
        ],
        moistureMapping: {
          process: [
            "Create floor plan sketch",
            "Establish 1-meter grid pattern",
            "Test and record all readings",
            "Mark affected areas with tape",
            "Photo document all readings",
            "Update daily until dry standard"
          ],
          dryStandard: {
            drywall: "< 1% moisture content or < 16% WME",
            wood: "< 15% moisture content",
            concrete: "< 4% moisture content",
            carpet: "Match unaffected areas"
          }
        }
      }
    },
    {
      id: 3,
      title: "Drying Equipment Operation",
      duration: "150 min",
      content: {
        airMovers: {
          types: [
            {
              name: "Centrifugal Air Movers",
              cfm: "2000-3500 CFM",
              use: "General drying, carpet, walls",
              placement: "15-20 degree angle to walls",
              coverage: "1 per 10-16 linear feet of wall"
            },
            {
              name: "Axial Air Movers",
              cfm: "3000-5000 CFM",
              use: "Large open areas, crawl spaces",
              placement: "Direct airflow across wet surfaces",
              coverage: "1 per 500-700 sq ft"
            },
            {
              name: "Low Profile Air Movers",
              cfm: "500-1500 CFM",
              use: "Under cabinets, tight spaces",
              placement: "Direct into cavity",
              coverage: "As needed for specialty drying"
            }
          ],
          setup: [
            "Create vortex drying chamber",
            "Angle at walls for maximum evaporation",
            "Ensure no dead air spaces",
            "Rotate equipment every 24 hours",
            "Monitor amp draw - 80% circuit capacity max"
          ]
        },
        dehumidifiers: {
          types: [
            {
              name: "Refrigerant (Standard)",
              capacity: "70-150 PPD",
              optimal: "20-30°C, 40-90% RH",
              use: "Most residential jobs",
              placement: "Central location"
            },
            {
              name: "Desiccant",
              capacity: "50-300 PPD",
              optimal: "Any temp, low RH capable",
              use: "Cold conditions, deep drying",
              placement: "Can be outside with ducting"
            },
            {
              name: "LGR (Low Grain Refrigerant)",
              capacity: "100-250 PPD",
              optimal: "15-35°C, 30-90% RH",
              use: "Faster drying, hardwood floors",
              placement: "Central with good air circulation"
            }
          ],
          calculation: {
            formula: "PPD needed = (Gallons of water × 8.34) / Days to dry",
            factors: [
              "Class of water damage",
              "Temperature and initial RH",
              "Air movement",
              "Vapor barriers",
              "HVAC operation"
            ]
          }
        }
      }
    },
    {
      id: 4,
      title: "Psychrometry Fundamentals",
      duration: "90 min",
      content: {
        concepts: {
          temperature: {
            dry: "Standard air temperature",
            wet: "Evaporative cooling temperature",
            dew: "Condensation point temperature"
          },
          humidity: {
            relative: "% of moisture air holds vs capacity",
            specific: "Grains of moisture per pound of air (GPP)",
            target: "30-50% RH for optimal drying"
          },
          vaporPressure: {
            definition: "Force driving evaporation",
            calculation: "Difference between surface and air",
            optimization: "Maximize pressure differential"
          }
        },
        dryingScience: {
          phases: [
            {
              phase: "Free Water Phase",
              duration: "0-24 hours",
              process: "Bulk water removal",
              equipment: "Extraction primary"
            },
            {
              phase: "Constant Rate Phase",
              duration: "24-72 hours",
              process: "Maximum evaporation",
              equipment: "Air movers and dehumidifiers"
            },
            {
              phase: "Falling Rate Phase",
              duration: "72+ hours",
              process: "Bound water removal",
              equipment: "Targeted drying, heat mats"
            }
          ]
        }
      }
    },
    {
      id: 5,
      title: "Documentation Requirements",
      duration: "60 min",
      content: {
        initialDocumentation: [
          "Source and category of water",
          "Affected areas and materials",
          "Moisture mapping with readings",
          "Photo documentation - minimum 20 photos",
          "Customer authorization forms",
          "Insurance adjuster contact"
        ],
        dailyMonitoring: [
          "Atmospheric readings (temp, RH, GPP)",
          "Moisture content readings all affected materials",
          "Equipment placement changes",
          "Progress photos",
          "Dehumidifier grain depression",
          "Customer communication log"
        ],
        xactimateItems: {
          extraction: "WTR_EXTR+ (per SF)",
          equipment: "EQUIP_DH (per day), EQUIP_AFAN (per day)",
          monitoring: "WTR_MONITOR (per day)",
          antimicrobial: "WTR_ANTIM (per SF)",
          common: [
            "WTR EXTRACT - Water extraction",
            "EQUIP DEHUM - Dehumidifier rental",
            "EQUIP AIRM - Air mover rental",
            "WTR BLOCK - Set up containment",
            "CONTENT MANIP - Move contents",
            "FLOOD CUT - Remove drywall 2' or 4'"
          ]
        }
      }
    },
    {
      id: 6,
      title: "IICRC S500 Standards",
      duration: "75 min",
      content: {
        principles: [
          "Safety first - assess all hazards",
          "Document thoroughly - condition and process",
          "Contain damage - prevent secondary damage",
          "Remove excess water - extract immediately",
          "Evaporate remaining moisture",
          "Dehumidify to remove vapor",
          "Monitor progress daily",
          "Confirm drying to standard"
        ],
        classes: {
          class1: {
            description: "Least amount of water, absorption, evaporation",
            area: "< 5% of room affected",
            materials: "Minimal porous materials wet",
            drying: "Fastest drying scenario"
          },
          class2: {
            description: "Large amount, fast evaporation",
            area: "5-40% of room affected",
            materials: "Carpet, pad, < 24 inches walls",
            drying: "Moderate drying time"
          },
          class3: {
            description: "Greatest amount of water",
            area: "> 40% of room affected",
            materials: "Walls, ceilings, insulation saturated",
            drying: "Longest drying time"
          },
          class4: {
            description: "Specialty drying situations",
            materials: "Hardwood, plaster, concrete, crawlspaces",
            drying: "Requires special methods"
          }
        }
      }
    }
  ];

  const practicalExercises = [
    {
      title: "Category Assessment Scenario",
      scenario: "You arrive at a home with water throughout the ground floor. The customer says their washing machine hose burst 3 days ago while they were on holiday.",
      tasks: [
        "Determine the water category",
        "List required PPE",
        "Identify materials that need removal",
        "Calculate equipment needs"
      ]
    },
    {
      title: "Moisture Mapping Exercise",
      scenario: "Create a moisture map for a 15m x 10m commercial space with water damage affecting 60% of the area.",
      tasks: [
        "Draw the floor plan",
        "Mark measurement grid points",
        "Document readings in proper format",
        "Calculate affected square footage"
      ]
    },
    {
      title: "Psychrometric Calculation",
      scenario: "Room conditions: 25°C, 70% RH. Outside: 30°C, 50% RH.",
      tasks: [
        "Calculate GPP difference",
        "Determine if dehumidification needed",
        "Calculate grain depression required",
        "Select appropriate equipment"
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
                  Day 2: Water Damage Restoration Fundamentals
                </h1>
                <p className="text-sm text-gray-600">Master the science of structural drying</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-100 text-blue-800">
                <Droplets className="h-3 w-3 mr-1" />
                IICRC S500 Aligned
              </Badge>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Resources
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
              <h3 className="font-semibold mb-2">Today's Modules</h3>
              <Progress value={33} className="mb-2" />
              <p className="text-xs text-gray-600">2 of 6 modules completed</p>
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
                    {index < 2 ? (
                      <CheckCircle className="h-4 w-4 text-green-600" />
                    ) : index === 2 ? (
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

          <Alert className="mt-4">
            <Info className="h-4 w-4" />
            <AlertDescription className="text-xs">
              Complete all modules to unlock hands-on equipment training
            </AlertDescription>
          </Alert>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentModule === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Water Damage Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedCategory} onValueChange={(v) => setSelectedCategory(v as any)}>
                  <TabsList className="grid grid-cols-3 w-full">
                    <TabsTrigger value="cat1" className="data-[state=active]:bg-green-100">
                      Category 1 - Clean
                    </TabsTrigger>
                    <TabsTrigger value="cat2" className="data-[state=active]:bg-yellow-100">
                      Category 2 - Grey
                    </TabsTrigger>
                    <TabsTrigger value="cat3" className="data-[state=active]:bg-red-100">
                      Category 3 - Black
                    </TabsTrigger>
                  </TabsList>

                  {Object.entries(modules[0].content.categories).map(([key, category]) => (
                    <TabsContent key={key} value={key} className="mt-6">
                      <div className="space-y-6">
                        <Alert className={
                          key === 'cat1' ? 'border-green-200 bg-green-50' :
                          key === 'cat2' ? 'border-yellow-200 bg-yellow-50' :
                          'border-red-200 bg-red-50'
                        }>
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>{category.name}</AlertTitle>
                          <AlertDescription>{category.source}</AlertDescription>
                        </Alert>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                          <div>
                            <h4 className="font-semibold mb-3">Common Examples</h4>
                            <ul className="space-y-2">
                              {category.examples.map((example, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle className="h-4 w-4 text-gray-400 mt-0.5" />
                                  <span className="text-sm">{example}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="font-semibold mb-3">Response Protocol</h4>
                            <div className="space-y-3">
                              <div className="flex items-start gap-2">
                                <Badge variant="outline">Time</Badge>
                                <span className="text-sm">{category.response.timeframe}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <Badge variant="outline">PPE</Badge>
                                <span className="text-sm">{category.response.ppe}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <Badge variant="outline">Treatment</Badge>
                                <span className="text-sm">{category.response.treatment}</span>
                              </div>
                              <div className="flex items-start gap-2">
                                <Badge variant="outline">Materials</Badge>
                                <span className="text-sm">{category.response.materials}</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-3">Australian Context</h4>
                          <div className="bg-blue-50 rounded-lg p-4">
                            <ul className="space-y-1">
                              {category.australianContext.map((context, idx) => (
                                <li key={idx} className="text-sm text-blue-900">• {context}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-3">Quick Reference Decision Tree</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">1.</span>
                      <span>Is the water from a sanitary source? → </span>
                      <Badge className="bg-green-100 text-green-800">Category 1</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">2.</span>
                      <span>Has it been less than 48 hours? → Stay current category</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">3.</span>
                      <span>Contains contaminants but no sewage? → </span>
                      <Badge className="bg-yellow-100 text-yellow-800">Category 2</Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">4.</span>
                      <span>Sewage or outside flooding? → </span>
                      <Badge className="bg-red-100 text-red-800">Category 3</Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentModule === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gauge className="h-5 w-5" />
                  Moisture Detection & Measurement
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="equipment">
                  <TabsList>
                    <TabsTrigger value="equipment">Equipment</TabsTrigger>
                    <TabsTrigger value="mapping">Moisture Mapping</TabsTrigger>
                    <TabsTrigger value="standards">Dry Standards</TabsTrigger>
                  </TabsList>

                  <TabsContent value="equipment" className="space-y-4 mt-4">
                    {modules[1].content.equipment.map((item, idx) => (
                      <Card key={idx}>
                        <CardContent className="p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{item.name}</h4>
                              <p className="text-sm text-gray-600 mt-1">{item.use}</p>
                              <div className="grid grid-cols-2 gap-4 mt-3">
                                <div>
                                  <span className="text-xs text-gray-500">Reading Range</span>
                                  <p className="text-sm font-medium">{item.reading}</p>
                                </div>
                                <div>
                                  <span className="text-xs text-gray-500">Technique</span>
                                  <p className="text-sm">{item.technique}</p>
                                </div>
                              </div>
                              {item.calibration && (
                                <Alert className="mt-3">
                                  <Info className="h-3 w-3" />
                                  <AlertDescription className="text-xs">
                                    Calibration: {item.calibration}
                                  </AlertDescription>
                                </Alert>
                              )}
                            </div>
                            <Badge variant="outline">Essential</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </TabsContent>

                  <TabsContent value="mapping" className="mt-4">
                    <div className="space-y-4">
                      <Alert>
                        <Camera className="h-4 w-4" />
                        <AlertTitle>Documentation is Critical</AlertTitle>
                        <AlertDescription>
                          Proper moisture mapping protects you and ensures insurance approval
                        </AlertDescription>
                      </Alert>

                      <div>
                        <h4 className="font-semibold mb-3">Moisture Mapping Process</h4>
                        <ol className="space-y-2">
                          {modules[1].content.moistureMapping.process.map((step, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <span className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-semibold">
                                {idx + 1}
                              </span>
                              <span className="text-sm">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="standards" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Dry Standard Reference</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {Object.entries(modules[1].content.moistureMapping.dryStandard).map(([material, standard]) => (
                            <div key={material} className="flex items-center justify-between py-2 border-b">
                              <span className="font-medium capitalize">{material}</span>
                              <Badge variant="secondary">{standard}</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {/* Practical Exercises Section */}
          {currentModule === modules.length - 1 && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Practical Exercises</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {practicalExercises.map((exercise, idx) => (
                      <Card key={idx}>
                        <CardContent className="p-4">
                          <h4 className="font-semibold mb-2">{exercise.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">{exercise.scenario}</p>
                          <div className="space-y-2">
                            <p className="text-sm font-medium">Tasks:</p>
                            {exercise.tasks.map((task, taskIdx) => (
                              <label key={taskIdx} className="flex items-start gap-2">
                                <input type="checkbox" className="mt-0.5" />
                                <span className="text-sm">{task}</span>
                              </label>
                            ))}
                          </div>
                          <Button className="mt-4" size="sm">
                            Submit Exercise
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
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
                if (currentModule < modules.length - 1) {
                  setCurrentModule(currentModule + 1);
                }
              }}
            >
              {currentModule === modules.length - 1 ? 'Complete Day 2' : 'Next Module'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
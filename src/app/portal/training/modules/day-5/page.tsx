'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, Wrench, Thermometer, Wind, Camera,
  Smartphone, Gauge, Filter, Zap, Settings,
  CheckCircle, Info, Download, ChevronRight, Activity
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Day5EquipmentTechnology() {
  const [currentModule, setCurrentModule] = useState(0);
  const [selectedEquipment, setSelectedEquipment] = useState('moisture');

  const modules = [
    {
      id: 1,
      title: "Moisture Meters & Thermal Imaging",
      duration: "120 min",
      content: {
        moistureMeters: {
          penetrating: {
            name: "Pin-Type Moisture Meter",
            brands: ["Delmhorst", "Protimeter", "Wagner"],
            specifications: {
              range: "6-40% MC (wood), 0.2-50% WME (drywall)",
              accuracy: "±1% at calibration point",
              depth: "5/16\" to 1.5\" pins available",
              display: "Digital LCD with backlight"
            },
            operation: [
              "Calibrate before each use",
              "Insert pins perpendicular to surface",
              "Push firmly until pin base touches surface",
              "Take multiple readings per area",
              "Document all readings with location"
            ],
            materials: {
              wood: {
                dry: "< 15% MC",
                acceptable: "15-17% MC",
                wet: "> 17% MC",
                saturated: "> 28% MC"
              },
              drywall: {
                dry: "< 1% MC or < 16% WME",
                borderline: "1-1.7% MC",
                wet: "> 1.7% MC or > 17% WME"
              }
            },
            maintenance: [
              "Check pin straightness daily",
              "Replace bent or corroded pins",
              "Clean pins with alcohol",
              "Store in protective case",
              "Annual factory calibration"
            ]
          },
          nonPenetrating: {
            name: "Non-Invasive Moisture Meter",
            brands: ["Tramex", "Protimeter Surveymaster", "FLIR"],
            specifications: {
              depth: "3/4\" to 1\" scanning depth",
              scale: "0-100 relative scale or 0-999 reference",
              sensor: "Capacitance or impedance"
            },
            bestFor: [
              "Initial moisture mapping",
              "Finished surfaces screening",
              "Tile and vinyl assessment",
              "Daily monitoring without damage"
            ]
          }
        },
        thermalImaging: {
          equipment: {
            name: "Thermal Imaging Camera",
            brands: ["FLIR", "FLUKE", "Seek"],
            specifications: {
              resolution: "160x120 to 640x480 pixels",
              sensitivity: "< 0.1°C",
              range: "-20°C to 400°C",
              accuracy: "±2°C or ±2%"
            }
          },
          applications: [
            "Locate hidden moisture",
            "Find water intrusion paths",
            "Identify missing insulation",
            "Detect HVAC issues",
            "Document drying progress",
            "Find hidden leaks"
          ],
          interpretation: {
            cool: "Often indicates moisture (evaporative cooling)",
            warm: "May indicate active leak or electrical issue",
            patterns: "Look for unusual temperature patterns",
            verification: "Always verify with moisture meter"
          },
          bestPractices: [
            "Allow camera to acclimate to room temp (15 min)",
            "Set proper temperature range",
            "Use same angle for before/after",
            "Document emissivity settings",
            "Note ambient conditions",
            "Take visible light photo too"
          ]
        }
      }
    },
    {
      id: 2,
      title: "Air Movers & Dehumidifiers Setup",
      duration: "150 min",
      content: {
        airMovers: {
          types: {
            centrifugal: {
              name: "Centrifugal Air Movers",
              power: "1/4 to 1 HP",
              airflow: "2000-3500 CFM",
              amps: "2.5-4.8 amps",
              placement: {
                walls: "15-20° angle, 12-16 inches from wall",
                carpet: "One per 10-16 linear feet",
                crawlspace: "Create circular airflow pattern",
                cabinets: "Remove doors, direct into cavity"
              }
            },
            axial: {
              name: "Axial Air Movers",
              power: "1/3 to 1 HP",
              airflow: "3000-5000 CFM",
              amps: "3.5-6.5 amps",
              placement: {
                large: "Open areas, warehouses",
                focused: "Long hallways, between rooms",
                ventilation: "Positive/negative pressure",
                structural: "Crawlspaces, attics"
              }
            },
            lowProfile: {
              name: "Low Profile Air Movers",
              power: "1/5 to 1/3 HP",
              airflow: "500-1500 CFM",
              amps: "1.5-2.8 amps",
              placement: {
                specialty: "Under cabinets, toe kicks",
                hardwood: "Between floor and subfloor",
                stairs: "Individual step drying",
                furniture: "Under and behind items"
              }
            }
          },
          setup: {
            electrical: {
              calculation: "Total amps × 1.25 < Circuit capacity",
              distribution: "Spread across multiple circuits",
              gfci: "Required for all equipment",
              extension: "12 AWG minimum for high amp",
              monitoring: "Check connections every 4 hours"
            },
            patterns: {
              vortex: "Create circular air movement",
              focused: "Direct at wet materials",
              laminar: "Smooth airflow along surfaces",
              crossflow: "Perpendicular air streams"
            }
          }
        },
        dehumidifiers: {
          refrigerant: {
            name: "Standard Refrigerant",
            capacity: "70-150 PPD",
            optimal: "21-32°C, 40-90% RH",
            powerDraw: "6-8 amps",
            drainage: "Gravity or pump",
            placement: "Central location, elevated",
            maintenance: [
              "Clean filter daily",
              "Check coils for ice",
              "Empty reservoir if no drain",
              "Monitor grain depression"
            ]
          },
          lgr: {
            name: "Low Grain Refrigerant",
            capacity: "100-250 PPD",
            optimal: "15-35°C, 30-90% RH",
            powerDraw: "7-11 amps",
            features: [
              "Pre-cooling of air",
              "Enhanced moisture removal",
              "Works in cooler conditions",
              "Digital controls"
            ]
          },
          desiccant: {
            name: "Desiccant Dehumidifier",
            capacity: "50-400 PPD",
            optimal: "Any temp, <40% RH achievable",
            powerDraw: "8-15 amps",
            applications: [
              "Cold environments",
              "Deep drying <40% RH",
              "Document/book drying",
              "Dense materials"
            ]
          }
        }
      }
    },
    {
      id: 3,
      title: "HEPA Filtration Systems",
      duration: "90 min",
      content: {
        hepaFiltration: {
          definition: "High Efficiency Particulate Air - removes 99.97% at 0.3 microns",
          equipment: {
            airScrubber: {
              name: "HEPA Air Scrubber",
              airflow: "500-2000 CFM",
              stages: [
                "Pre-filter - large particles",
                "HEPA filter - fine particles",
                "Carbon filter - odors (optional)"
              ],
              applications: [
                "Mould remediation",
                "Fire/smoke damage",
                "Sewage cleanup",
                "Dust control",
                "Odor removal"
              ]
            },
            negativeAir: {
              name: "Negative Air Machine",
              purpose: "Create negative pressure containment",
              setup: [
                "Seal room with plastic sheeting",
                "Install machine with exhaust outside",
                "Create 4-6 air changes per hour",
                "Monitor with manometer",
                "Maintain -5 to -10 Pa pressure"
              ]
            }
          },
          maintenance: {
            preFilter: "Change when visibly loaded or pressure drop",
            hepaFilter: "Change at pressure differential per manufacturer",
            documentation: "Log filter changes and hours run",
            testing: "DOP test annually for critical applications"
          },
          calculations: {
            airChanges: "CFM × 60 / Room Volume = ACH",
            required: {
              standard: "4 ACH minimum",
              mould: "6-12 ACH",
              sewage: "8-12 ACH",
              asbestos: "4 ACH minimum"
            }
          }
        }
      }
    },
    {
      id: 4,
      title: "Negative Air Machines",
      duration: "90 min",
      content: {
        principles: {
          purpose: [
            "Prevent cross-contamination",
            "Protect unaffected areas",
            "Control airborne particles",
            "Required for Category 3 water",
            "Mandatory for mould remediation"
          ],
          physics: {
            pressure: "Lower pressure in contained area",
            airflow: "Air flows from high to low pressure",
            containment: "Particles cannot escape containment"
          }
        },
        setup: {
          steps: [
            {
              step: 1,
              action: "Install containment barriers",
              details: "6 mil plastic sheeting, sealed with tape"
            },
            {
              step: 2,
              action: "Position NAM inside containment",
              details: "Exhaust ducted outside or to safe area"
            },
            {
              step: 3,
              action: "Seal all openings",
              details: "HVAC vents, doors, windows"
            },
            {
              step: 4,
              action: "Create airlock entry",
              details: "Double flap or zipper door"
            },
            {
              step: 5,
              action: "Start machine and adjust",
              details: "Achieve -5 to -10 Pa differential"
            },
            {
              step: 6,
              action: "Monitor continuously",
              details: "Use manometer, check hourly"
            }
          ]
        }
      }
    },
    {
      id: 5,
      title: "Mobile App Usage",
      duration: "60 min",
      content: {
        nrpApp: {
          features: {
            dashboard: [
              "Active jobs overview",
              "Daily schedule",
              "Lead notifications",
              "Performance metrics",
              "Revenue tracking"
            ],
            documentation: [
              "Photo capture with metadata",
              "Moisture reading logs",
              "Equipment placement diagrams",
              "Customer signatures",
              "Voice notes",
              "Video walkthroughs"
            ],
            jobManagement: [
              "Accept/reject leads",
              "Update job status",
              "Time tracking",
              "Material usage",
              "Crew management",
              "Subcontractor coordination"
            ],
            reporting: [
              "Daily progress reports",
              "Moisture logs",
              "Equipment readings",
              "Psychrometric data",
              "Completion certificates"
            ]
          },
          offlineMode: {
            capabilities: [
              "Continue documentation",
              "Queue uploads",
              "Access job details",
              "View procedures"
            ],
            sync: "Automatic when connection restored"
          }
        },
        supportingApps: {
          documentation: [
            "CompanyCam - Photo management",
            "Encircle - Detailed documentation",
            "magicplan - Floor plan creation"
          ],
          measurement: [
            "Drylog - Moisture tracking",
            "HydroMaster - Psychrometric calculator",
            "FLIR Tools - Thermal image analysis"
          ],
          business: [
            "Xactimate Mobile - Estimating",
            "QuickBooks - Invoicing",
            "Google Maps - Navigation"
          ]
        }
      }
    },
    {
      id: 6,
      title: "Job Tracking Systems",
      duration: "75 min",
      content: {
        tracking: {
          requirements: [
            "Real-time job status updates",
            "Equipment location tracking",
            "Time and attendance",
            "Material usage",
            "Progress milestones",
            "Quality checkpoints"
          ],
          documentation: {
            daily: [
              "Atmospheric readings (6am, 12pm, 6pm)",
              "Moisture content all materials",
              "Equipment run time",
              "Dehumidifier extraction",
              "Photos of progress",
              "Customer communication"
            ],
            milestone: [
              "Mitigation complete",
              "Dry standard achieved",
              "Repairs commenced",
              "Final inspection",
              "Customer sign-off"
            ]
          },
          integration: {
            insurance: "Direct upload to carrier portals",
            accounting: "Automatic invoicing triggers",
            inventory: "Material usage tracking",
            payroll: "Time sheet integration"
          }
        }
      }
    }
  ];

  const equipmentCalculations = {
    airMovers: {
      formula: "1 air mover per 10-16 linear feet of wall",
      factors: [
        "Class of water damage",
        "Density of materials",
        "Temperature and humidity",
        "Available power"
      ]
    },
    dehumidifiers: {
      formula: "PPD needed = (Water in materials × 8.34) / Desired dry time",
      example: {
        scenario: "500 sq ft Class 2 water damage",
        water: "25 gallons estimated",
        calculation: "(25 × 8.34) / 3 days = 70 PPD minimum",
        equipment: "1 × LGR dehumidifier (100-150 PPD)"
      }
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
                  Day 5: Equipment & Technology
                </h1>
                <p className="text-sm text-gray-600">Master professional restoration equipment</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-100 text-blue-800">
                <Wrench className="h-3 w-3 mr-1" />
                Hands-On Training
              </Badge>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Equipment Guides
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
              <h3 className="font-semibold mb-2">Equipment Mastery</h3>
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
                      <Activity className="h-4 w-4 text-blue-600" />
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
              Practical equipment demonstration required for certification
            </AlertDescription>
          </Alert>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentModule === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Moisture Meters & Thermal Imaging</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedEquipment} onValueChange={setSelectedEquipment}>
                  <TabsList>
                    <TabsTrigger value="moisture">Moisture Meters</TabsTrigger>
                    <TabsTrigger value="thermal">Thermal Imaging</TabsTrigger>
                    <TabsTrigger value="practice">Practice</TabsTrigger>
                  </TabsList>

                  <TabsContent value="moisture" className="mt-6">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Gauge className="h-4 w-4" />
                            Pin-Type Moisture Meter
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                              <h4 className="font-medium mb-2">Specifications</h4>
                              <div className="space-y-1 text-sm">
                                <p><span className="text-gray-600">Range:</span> {modules[0].content.moistureMeters.penetrating.specifications.range}</p>
                                <p><span className="text-gray-600">Accuracy:</span> {modules[0].content.moistureMeters.penetrating.specifications.accuracy}</p>
                                <p><span className="text-gray-600">Depth:</span> {modules[0].content.moistureMeters.penetrating.specifications.depth}</p>
                              </div>
                            </div>
                            <div>
                              <h4 className="font-medium mb-2">Popular Brands</h4>
                              <div className="flex flex-wrap gap-2">
                                {modules[0].content.moistureMeters.penetrating.brands.map(brand => (
                                  <Badge key={brand} variant="secondary">{brand}</Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Material Standards</h4>
                              <div className="grid grid-cols-2 gap-4">
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">Wood</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-1 text-xs">
                                      {Object.entries(modules[0].content.moistureMeters.penetrating.materials.wood).map(([key, value]) => (
                                        <div key={key} className="flex justify-between">
                                          <span className="capitalize">{key}:</span>
                                          <Badge variant={key === 'dry' ? 'default' : key === 'saturated' ? 'destructive' : 'secondary'} className="text-xs">
                                            {value}
                                          </Badge>
                                        </div>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>
                                <Card>
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm">Drywall</CardTitle>
                                  </CardHeader>
                                  <CardContent>
                                    <div className="space-y-1 text-xs">
                                      {Object.entries(modules[0].content.moistureMeters.penetrating.materials.drywall).map(([key, value]) => (
                                        <div key={key} className="flex justify-between">
                                          <span className="capitalize">{key}:</span>
                                          <Badge variant={key === 'dry' ? 'default' : key === 'wet' ? 'destructive' : 'secondary'} className="text-xs">
                                            {value}
                                          </Badge>
                                        </div>
                                      ))}
                                    </div>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Operating Procedure</h4>
                              <ol className="space-y-1">
                                {modules[0].content.moistureMeters.penetrating.operation.map((step, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <span className="flex-shrink-0 w-5 h-5 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center text-xs font-semibold">
                                      {idx + 1}
                                    </span>
                                    <span className="text-sm">{step}</span>
                                  </li>
                                ))}
                              </ol>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  <TabsContent value="thermal" className="mt-6">
                    <div className="space-y-6">
                      <Alert>
                        <Camera className="h-4 w-4" />
                        <AlertTitle>Important</AlertTitle>
                        <AlertDescription>
                          Thermal imaging shows temperature, not moisture. Always verify with moisture meter.
                        </AlertDescription>
                      </Alert>

                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base flex items-center gap-2">
                            <Thermometer className="h-4 w-4" />
                            Thermal Imaging Applications
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="grid grid-cols-2 gap-4">
                            {modules[0].content.thermalImaging.applications.map((app, idx) => (
                              <div key={idx} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-green-600" />
                                <span className="text-sm">{app}</span>
                              </div>
                            ))}
                          </div>

                          <div className="mt-6">
                            <h4 className="font-medium mb-3">Temperature Interpretation</h4>
                            <div className="space-y-2">
                              {Object.entries(modules[0].content.thermalImaging.interpretation).map(([key, value]) => (
                                <div key={key} className="flex items-start gap-3">
                                  <Badge variant={key === 'cool' ? 'default' : 'secondary'} className="capitalize">
                                    {key}
                                  </Badge>
                                  <span className="text-sm">{value}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="mt-6">
                            <h4 className="font-medium mb-3">Best Practices</h4>
                            <ul className="space-y-1">
                              {modules[0].content.thermalImaging.bestPractices.map((practice, idx) => (
                                <li key={idx} className="text-sm">• {practice}</li>
                              ))}
                            </ul>
                          </div>
                        </CardContent>
                      </Card>
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
                  <Wind className="h-5 w-5" />
                  Air Movers & Dehumidifiers Setup
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="airmovers">
                  <TabsList>
                    <TabsTrigger value="airmovers">Air Movers</TabsTrigger>
                    <TabsTrigger value="dehumidifiers">Dehumidifiers</TabsTrigger>
                    <TabsTrigger value="calculations">Calculations</TabsTrigger>
                  </TabsList>

                  <TabsContent value="airmovers" className="mt-6">
                    <div className="space-y-4">
                      {Object.entries(modules[1].content.airMovers.types).map(([key, type]) => (
                        <Card key={key}>
                          <CardHeader>
                            <CardTitle className="text-base">{type.name}</CardTitle>
                            <div className="flex gap-4 text-sm text-gray-600">
                              <span>Power: {type.power}</span>
                              <span>Airflow: {type.airflow}</span>
                              <span>Draw: {type.amps}</span>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <h4 className="font-medium mb-2">Placement Guidelines</h4>
                            <div className="grid grid-cols-2 gap-3">
                              {Object.entries(type.placement).map(([area, guideline]) => (
                                <div key={area} className="text-sm">
                                  <span className="font-medium capitalize">{area}:</span> {guideline}
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <Alert className="mt-4">
                      <Zap className="h-4 w-4" />
                      <AlertTitle>Electrical Safety</AlertTitle>
                      <AlertDescription>
                        {modules[1].content.airMovers.setup.electrical.calculation}
                      </AlertDescription>
                    </Alert>
                  </TabsContent>

                  <TabsContent value="calculations" className="mt-6">
                    <div className="space-y-6">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Equipment Calculations</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Air Movers</h4>
                              <p className="text-sm text-gray-600 mb-2">
                                Formula: {equipmentCalculations.airMovers.formula}
                              </p>
                              <div className="p-3 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium mb-1">Consider:</p>
                                <ul className="space-y-1">
                                  {equipmentCalculations.airMovers.factors.map((factor, idx) => (
                                    <li key={idx} className="text-sm">• {factor}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium mb-2">Dehumidifiers</h4>
                              <p className="text-sm text-gray-600 mb-3">
                                Formula: {equipmentCalculations.dehumidifiers.formula}
                              </p>
                              <Card>
                                <CardHeader className="pb-3">
                                  <CardTitle className="text-sm">Example Calculation</CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div className="space-y-2 text-sm">
                                    <p><strong>Scenario:</strong> {equipmentCalculations.dehumidifiers.example.scenario}</p>
                                    <p><strong>Water:</strong> {equipmentCalculations.dehumidifiers.example.water}</p>
                                    <p><strong>Calculation:</strong> {equipmentCalculations.dehumidifiers.example.calculation}</p>
                                    <p><strong>Equipment:</strong> {equipmentCalculations.dehumidifiers.example.equipment}</p>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}

          {currentModule === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  Mobile App Usage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="nrp">
                  <TabsList>
                    <TabsTrigger value="nrp">NRP App</TabsTrigger>
                    <TabsTrigger value="supporting">Supporting Apps</TabsTrigger>
                    <TabsTrigger value="offline">Offline Mode</TabsTrigger>
                  </TabsList>

                  <TabsContent value="nrp" className="mt-6">
                    <div className="space-y-4">
                      {Object.entries(modules[4].content.nrpApp.features).map(([feature, items]) => (
                        <Card key={feature}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base capitalize">{feature.replace(/([A-Z])/g, ' $1')}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <div className="grid grid-cols-2 gap-2">
                              {items.map((item, idx) => (
                                <div key={idx} className="flex items-center gap-2">
                                  <CheckCircle className="h-3 w-3 text-green-600" />
                                  <span className="text-sm">{item}</span>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="supporting" className="mt-6">
                    <div className="space-y-4">
                      {Object.entries(modules[4].content.supportingApps).map(([category, apps]) => (
                        <Card key={category}>
                          <CardHeader className="pb-3">
                            <CardTitle className="text-base capitalize">{category}</CardTitle>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-2">
                              {apps.map((app, idx) => (
                                <li key={idx} className="text-sm">
                                  {app}
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
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
              {currentModule === modules.length - 1 ? 'Complete Day 5' : 'Next Module'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
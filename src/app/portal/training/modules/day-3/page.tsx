'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  ArrowLeft, FileText, Calculator, Camera, DollarSign,
  CheckCircle, AlertCircle, Info, Download, ChevronRight,
  Building2, Shield, Clock, TrendingUp, BookOpen
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export default function Day3InsuranceClaims() {
  const [currentModule, setCurrentModule] = useState(0);
  const [selectedInsurer, setSelectedInsurer] = useState('aami');

  const modules = [
    {
      id: 1,
      title: "Understanding Australian Insurance Policies",
      duration: "90 min",
      content: {
        majorInsurers: {
          aami: {
            name: "AAMI",
            marketShare: "15%",
            claimProcess: "Online portal + adjuster visit",
            paymentTerms: "30-45 days",
            preferredVendor: "Yes - registration required",
            requirements: [
              "24-hour initial report",
              "Photos within 48 hours",
              "Xactimate estimate required",
              "Daily progress reports",
              "Moisture logs mandatory"
            ],
            tips: "Fast approval for under $10k claims"
          },
          suncorp: {
            name: "Suncorp",
            marketShare: "18%",
            claimProcess: "ClaimConnect system",
            paymentTerms: "21-30 days",
            preferredVendor: "Yes - panel contractors",
            requirements: [
              "Immediate notification",
              "Scope agreement before start",
              "Video walkthrough option",
              "Environmental monitoring",
              "Asbestos check required"
            ],
            tips: "Prefers video documentation"
          },
          allianz: {
            name: "Allianz",
            marketShare: "12%",
            claimProcess: "Partner network system",
            paymentTerms: "30-60 days",
            preferredVendor: "Strict panel only",
            requirements: [
              "Pre-authorization required",
              "Detailed line items",
              "Comparative quotes >$25k",
              "Certificate of currency",
              "Quality assurance audit"
            ],
            tips: "Very thorough on large losses"
          },
          nrma: {
            name: "NRMA Insurance",
            marketShare: "10%",
            claimProcess: "Direct supplier model",
            paymentTerms: "14-30 days",
            preferredVendor: "Open panel with criteria",
            requirements: [
              "Lodge within 24 hours",
              "Customer consent forms",
              "Progress photos required",
              "Completion certificate",
              "Customer satisfaction survey"
            ],
            tips: "Fastest payment in industry"
          }
        },
        policyTypes: [
          {
            type: "Building Insurance",
            covers: "Structure, fixed items",
            common: "Water damage, fire, storm",
            excluded: "Gradual damage, lack of maintenance",
            excess: "$500-$2000 typical"
          },
          {
            type: "Contents Insurance",
            covers: "Moveable items, furniture",
            common: "Theft, damage, replacement",
            excluded: "Wear and tear, vermin",
            excess: "$500-$1000 typical"
          },
          {
            type: "Strata Insurance",
            covers: "Common property, building",
            common: "Shared area damage",
            excluded: "Individual unit contents",
            excess: "$1000-$5000 typical"
          },
          {
            type: "Commercial Property",
            covers: "Building, contents, business interruption",
            common: "All risks unless excluded",
            excluded: "Consequential loss, cyber",
            excess: "$2500-$10000 typical"
          }
        ]
      }
    },
    {
      id: 2,
      title: "Claim Documentation Requirements",
      duration: "120 min",
      content: {
        initialDocumentation: {
          mandatory: [
            "Claim number and policy details",
            "Date and cause of loss statement",
            "Initial damage assessment",
            "Emergency mitigation steps taken",
            "Customer authorization to proceed",
            "Insurance company contact details"
          ],
          photos: {
            required: [
              "Overview of each affected room (4 angles)",
              "Close-up of damage origin/source",
              "Affected materials and contents",
              "Moisture meter readings display",
              "Serial numbers of damaged items",
              "Pre-existing conditions"
            ],
            standards: [
              "High resolution (min 2MB)",
              "Date/time stamp enabled",
              "Include scale reference (tape measure)",
              "Multiple angles of same damage",
              "Before and after mitigation",
              "Progress photos daily"
            ]
          }
        },
        scopeWriting: {
          structure: [
            {
              section: "Summary",
              includes: "Brief description, cause, affected areas"
            },
            {
              section: "Detailed Room List",
              includes: "Room-by-room breakdown, dimensions, materials"
            },
            {
              section: "Mitigation Services",
              includes: "Emergency services, water extraction, drying"
            },
            {
              section: "Repairs Required",
              includes: "Structural, cosmetic, contents"
            },
            {
              section: "Contents Manipulation",
              includes: "Pack out, storage, cleaning"
            }
          ],
          bestPractices: [
            "Use insurance company template if provided",
            "Match line items to Xactimate exactly",
            "Include all labor and materials",
            "Document pre-existing damage separately",
            "Separate emergency from repairs",
            "Include moisture logs as appendix"
          ]
        }
      }
    },
    {
      id: 3,
      title: "Xactimate Fundamentals",
      duration: "180 min",
      content: {
        basics: {
          definition: "Industry standard estimating software",
          usage: "95% of Australian insurers require it",
          pricing: "Updated monthly with local pricing",
          access: "License required ($200-400/month)"
        },
        commonLineItems: [
          {
            code: "WTR_EXTRACT",
            description: "Water extraction - per SF",
            unit: "SF",
            typicalPrice: "$0.42",
            when: "Standing water present"
          },
          {
            code: "WTR_DRY",
            description: "Structural drying",
            unit: "SF",
            typicalPrice: "$0.38",
            when: "After extraction"
          },
          {
            code: "EQUIP_DEHUM",
            description: "Dehumidifier per day",
            unit: "Day",
            typicalPrice: "$125",
            when: "Daily equipment charge"
          },
          {
            code: "EQUIP_AFAN",
            description: "Air mover per day",
            unit: "Day",
            typicalPrice: "$35",
            when: "Daily equipment charge"
          },
          {
            code: "FLR_CARP_REM",
            description: "Remove carpet",
            unit: "SF",
            typicalPrice: "$0.28",
            when: "Category 2/3 water"
          },
          {
            code: "ANTIMICRO",
            description: "Apply antimicrobial",
            unit: "SF",
            typicalPrice: "$0.24",
            when: "Category 2/3 water"
          },
          {
            code: "FLOOD_CUT2",
            description: "Flood cut drywall 2 feet",
            unit: "LF",
            typicalPrice: "$4.85",
            when: "Water wicking up walls"
          },
          {
            code: "DRY_HANG_12",
            description: "Hang 1/2 drywall",
            unit: "SF",
            typicalPrice: "$1.42",
            when: "Replacement after flood cut"
          }
        ],
        modifiers: {
          afterHours: "+25% for emergency response",
          height: "+10% per floor above ground",
          contents: "+15-20% for heavy contents manipulation",
          difficulty: "+10-25% for limited access",
          minimums: "3-hour minimum for emergency"
        },
        tipsAndTricks: [
          "Always use room dimensions from sketch",
          "Include all PPE as line items",
          "Don't forget supervisor/project management",
          "Add containment setup for Cat 3",
          "Include final cleaning line items",
          "Use 'Additional Charge' for unique items",
          "Save templates for common scenarios"
        ]
      }
    },
    {
      id: 4,
      title: "Photo Documentation Standards",
      duration: "60 min",
      content: {
        photoProtocol: {
          stages: [
            {
              stage: "Initial Documentation",
              photos: [
                "Exterior of property",
                "Cause of damage source",
                "Each room - 4 corners",
                "Close-ups of damage",
                "Moisture meter readings",
                "Pre-existing conditions"
              ],
              quantity: "Minimum 30 photos"
            },
            {
              stage: "During Mitigation",
              photos: [
                "Equipment placement",
                "Removed materials",
                "Hidden damage discovered",
                "Daily drying progress",
                "Safety hazards found",
                "Containment setup"
              ],
              quantity: "10-20 photos daily"
            },
            {
              stage: "Completion",
              photos: [
                "Final moisture readings",
                "Completed repairs",
                "Cleaned areas",
                "Equipment removal",
                "Customer walkthrough",
                "Signed completion form"
              ],
              quantity: "Minimum 20 photos"
            }
          ],
          techniques: [
            "Use consistent angles for before/after",
            "Include measuring tape for scale",
            "Ensure good lighting - use flash if needed",
            "Clean lens before shooting",
            "Take wide and close-up shots",
            "Capture serial numbers clearly",
            "Use panorama for large areas"
          ]
        }
      }
    },
    {
      id: 5,
      title: "Scope Writing Excellence",
      duration: "90 min",
      content: {
        template: {
          header: [
            "Insured name and claim number",
            "Date of loss and inspection",
            "Property address",
            "Cause of loss",
            "Your company details"
          ],
          body: {
            section1: "Executive Summary",
            content1: "2-3 paragraphs describing event and damage",
            section2: "Affected Areas",
            content2: "List all rooms with damage level",
            section3: "Mitigation Performed",
            content3: "Emergency services completed",
            section4: "Repairs Required",
            content4: "Detailed repair scope by room",
            section5: "Contents",
            content5: "Cleaning, storage, replacement",
            section6: "Exclusions",
            content6: "What is not included and why"
          },
          attachments: [
            "Xactimate estimate",
            "Photo documentation",
            "Moisture logs",
            "Thermal imaging report",
            "Sketch/floor plan",
            "Equipment placement diagram"
          ]
        }
      }
    },
    {
      id: 6,
      title: "Direct Billing Procedures",
      duration: "75 min",
      content: {
        setup: {
          requirements: [
            "Contractor agreement with insurer",
            "Certificate of Currency (insurance)",
            "ABN and business registration",
            "Bank account for EFT",
            "Xactimate license",
            "Quality certifications"
          ],
          process: [
            "Register as preferred vendor",
            "Complete insurer training",
            "Submit sample documentation",
            "Pass quality audit",
            "Sign service agreement",
            "Receive vendor number"
          ]
        },
        billing: {
          steps: [
            "Complete work as per scope",
            "Submit final invoice via portal",
            "Attach all documentation",
            "Customer sign-off obtained",
            "Quality photos submitted",
            "Wait for approval (24-72 hours)",
            "Payment processed (14-45 days)"
          ],
          commonIssues: [
            "Missing documentation - delays payment",
            "Scope creep - get written approval",
            "Customer complaints - address immediately",
            "Incorrect line items - match Xactimate",
            "No authorization - never proceed without",
            "Poor photo quality - retake before leaving"
          ]
        }
      }
    }
  ];

  const xactimateExercise = {
    scenario: "Kitchen water damage from dishwasher leak. 100 SF affected, carpet in adjoining dining room wet (150 SF), Category 1 water, discovered within 2 hours.",
    task: "Create estimate including extraction, drying equipment for 3 days, and carpet cleaning.",
    lineItems: [
      { code: "WTR_EXTRACT", qty: 250, unit: "SF", price: 0.42, total: 105 },
      { code: "EQUIP_DEHUM", qty: 3, unit: "Day", price: 125, total: 375 },
      { code: "EQUIP_AFAN", qty: 12, unit: "Day", price: 35, total: 420 },
      { code: "FLR_CLN_CRP", qty: 150, unit: "SF", price: 0.38, total: 57 },
      { code: "MONITOR", qty: 3, unit: "Day", price: 85, total: 255 }
    ]
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
                  Day 3: Insurance Claims Process
                </h1>
                <p className="text-sm text-gray-600">Master the insurance ecosystem</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800">
                <DollarSign className="h-3 w-3 mr-1" />
                Revenue Critical
              </Badge>
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download Templates
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
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {currentModule === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Understanding Australian Insurance Policies</CardTitle>
              </CardHeader>
              <CardContent>
                <Tabs value={selectedInsurer} onValueChange={setSelectedInsurer}>
                  <TabsList>
                    <TabsTrigger value="aami">AAMI</TabsTrigger>
                    <TabsTrigger value="suncorp">Suncorp</TabsTrigger>
                    <TabsTrigger value="allianz">Allianz</TabsTrigger>
                    <TabsTrigger value="nrma">NRMA</TabsTrigger>
                  </TabsList>

                  {Object.entries(modules[0].content.majorInsurers).map(([key, insurer]) => (
                    <TabsContent key={key} value={key} className="mt-6">
                      <div className="space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                          <Card>
                            <CardContent className="p-4">
                              <div className="flex items-center justify-between mb-3">
                                <Building2 className="h-8 w-8 text-blue-600" />
                                <Badge>{insurer.marketShare} market share</Badge>
                              </div>
                              <h3 className="font-semibold text-lg mb-2">{insurer.name}</h3>
                              <div className="space-y-2 text-sm">
                                <div>
                                  <span className="text-gray-600">Claim Process:</span>
                                  <p className="font-medium">{insurer.claimProcess}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Payment Terms:</span>
                                  <p className="font-medium">{insurer.paymentTerms}</p>
                                </div>
                                <div>
                                  <span className="text-gray-600">Preferred Vendor:</span>
                                  <p className="font-medium">{insurer.preferredVendor}</p>
                                </div>
                              </div>
                            </CardContent>
                          </Card>

                          <Card>
                            <CardHeader className="pb-3">
                              <CardTitle className="text-base">Requirements</CardTitle>
                            </CardHeader>
                            <CardContent>
                              <ul className="space-y-1">
                                {insurer.requirements.map((req, idx) => (
                                  <li key={idx} className="flex items-start gap-2">
                                    <CheckCircle className="h-3 w-3 text-green-600 mt-0.5" />
                                    <span className="text-sm">{req}</span>
                                  </li>
                                ))}
                              </ul>
                            </CardContent>
                          </Card>
                        </div>

                        <Alert>
                          <Info className="h-4 w-4" />
                          <AlertTitle>Pro Tip</AlertTitle>
                          <AlertDescription>{insurer.tips}</AlertDescription>
                        </Alert>
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>

                <div className="mt-8">
                  <h3 className="font-semibold mb-4">Policy Types Quick Reference</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {modules[0].content.policyTypes.map((policy, idx) => (
                      <Card key={idx}>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">{policy.type}</h4>
                          <div className="space-y-1 text-sm">
                            <p><span className="text-gray-600">Covers:</span> {policy.covers}</p>
                            <p><span className="text-gray-600">Common:</span> {policy.common}</p>
                            <p><span className="text-gray-600">Excluded:</span> {policy.excluded}</p>
                            <Badge variant="secondary" className="mt-2">{policy.excess}</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentModule === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator className="h-5 w-5" />
                  Xactimate Fundamentals
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Alert className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Critical Skill</AlertTitle>
                  <AlertDescription>
                    95% of insurance claims require Xactimate estimates. Master this for success.
                  </AlertDescription>
                </Alert>

                <Tabs defaultValue="common">
                  <TabsList>
                    <TabsTrigger value="common">Common Line Items</TabsTrigger>
                    <TabsTrigger value="modifiers">Modifiers</TabsTrigger>
                    <TabsTrigger value="exercise">Practice Exercise</TabsTrigger>
                  </TabsList>

                  <TabsContent value="common" className="mt-4">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Code</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Unit</TableHead>
                          <TableHead>Price</TableHead>
                          <TableHead>When to Use</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {modules[2].content.commonLineItems.map((item, idx) => (
                          <TableRow key={idx}>
                            <TableCell className="font-mono text-sm">{item.code}</TableCell>
                            <TableCell>{item.description}</TableCell>
                            <TableCell>{item.unit}</TableCell>
                            <TableCell>{item.typicalPrice}</TableCell>
                            <TableCell className="text-sm text-gray-600">{item.when}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TabsContent>

                  <TabsContent value="modifiers" className="mt-4">
                    <div className="space-y-3">
                      {Object.entries(modules[2].content.modifiers).map(([key, value]) => (
                        <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <Badge variant="outline">{value}</Badge>
                        </div>
                      ))}
                    </div>
                  </TabsContent>

                  <TabsContent value="exercise" className="mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Practical Exercise</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <Alert className="mb-4">
                          <Info className="h-4 w-4" />
                          <AlertDescription>
                            <strong>Scenario:</strong> {xactimateExercise.scenario}
                          </AlertDescription>
                        </Alert>
                        
                        <p className="font-medium mb-3">Build your estimate:</p>
                        
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Line Item</TableHead>
                              <TableHead>Qty</TableHead>
                              <TableHead>Unit</TableHead>
                              <TableHead>Price</TableHead>
                              <TableHead>Total</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {xactimateExercise.lineItems.map((item, idx) => (
                              <TableRow key={idx}>
                                <TableCell className="font-mono text-sm">{item.code}</TableCell>
                                <TableCell>{item.qty}</TableCell>
                                <TableCell>{item.unit}</TableCell>
                                <TableCell>${item.price}</TableCell>
                                <TableCell className="font-semibold">${item.total}</TableCell>
                              </TableRow>
                            ))}
                            <TableRow>
                              <TableCell colSpan={4} className="text-right font-semibold">
                                Total Estimate:
                              </TableCell>
                              <TableCell className="font-bold text-lg">
                                ${xactimateExercise.lineItems.reduce((sum, item) => sum + item.total, 0).toLocaleString()}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </CardContent>
                    </Card>
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
              {currentModule === modules.length - 1 ? 'Complete Day 3' : 'Next Module'}
              <ChevronRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </main>
      </div>
    </div>
  );
}
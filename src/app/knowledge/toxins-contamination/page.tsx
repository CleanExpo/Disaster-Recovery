'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AlertTriangle, Info, Shield, Microscope, Home, Factory, Heart, Brain, Baby, AlertCircle, CheckCircle2, XCircle, FileText, Wind } from 'lucide-react';

interface Toxin {
  name: string;
  category: string;
  sources: string[];
  healthEffects: string[];
  symptoms: string[];
  testing: string;
  remediation: string;
  regulations: string;
  insuranceCoverage: boolean;
}

export default function ToxinsContaminationKnowledgePage() {
  const [selectedToxin, setSelectedToxin] = useState<Toxin | null>(null);

  const toxinCategories = {
    biological: {
      title: 'Biological Toxins',
      icon: Microscope,
      description: 'Living organisms and their byproducts that cause health issues',
      toxins: [
        {
          name: 'Black Mould (Stachybotrys chartarum)',
          category: 'Biological',
          sources: [
            'Water-damaged drywall and timber',
            'Chronically wet areas behind walls',
            'Flooded basements and crawl spaces',
            'Leaking roofs and windows',
            'HVAC systems with poor maintenance'
          ],
          healthEffects: [
            'Severe respiratory problems',
            'Neurological symptoms',
            'Immune system suppression',
            'Chronic fatigue syndrome',
            'Memory and concentration issues'
          ],
          symptoms: [
            'Persistent coughing and wheezing',
            'Nose bleeds',
            'Extreme fatigue',
            'Headaches and dizziness',
            'Skin rashes'
          ],
          testing: 'Air sampling with PCR analysis, ERMI testing, mycotoxin urine tests',
          remediation: 'Complete removal with containment, HEPA filtration, antimicrobial treatment',
          regulations: 'IICRC S520 standards, WorkSafe guidelines',
          insuranceCoverage: true
        },
        {
          name: 'Aspergillus',
          category: 'Biological',
          sources: [
            'Decomposing organic matter',
            'Stored grains and foods',
            'Compost and soil',
            'Air conditioning systems',
            'Damp building materials'
          ],
          healthEffects: [
            'Aspergillosis (lung infection)',
            'Allergic reactions',
            'Asthma exacerbation',
            'Sinus infections',
            'Invasive infections in immunocompromised'
          ],
          symptoms: [
            'Fever and chills',
            'Coughing up blood',
            'Shortness of breath',
            'Chest pain',
            'Joint pain'
          ],
          testing: 'Fungal culture, galactomannan test, specific IgE antibodies',
          remediation: 'Source removal, moisture control, HEPA vacuuming, fungicide application',
          regulations: 'AS/NZS 4360 Risk Management',
          insuranceCoverage: true
        },
        {
          name: 'Mycotoxins',
          category: 'Biological',
          sources: [
            'Mould metabolites',
            'Contaminated food',
            'Water-damaged buildings',
            'Agricultural products',
            'Poorly ventilated spaces'
          ],
          healthEffects: [
            'Liver damage',
            'Kidney dysfunction',
            'Neurological disorders',
            'Cancer (aflatoxins)',
            'Reproductive issues'
          ],
          symptoms: [
            'Chronic fatigue',
            'Brain fog',
            'Joint pain',
            'Digestive issues',
            'Mood changes'
          ],
          testing: 'Urine mycotoxin panels, environmental sampling, ELISA testing',
          remediation: 'Complete mould remediation, binders for detoxification, environmental controls',
          regulations: 'Food Standards Code, Building Code of Australia',
          insuranceCoverage: false
        },
        {
          name: 'Endotoxins',
          category: 'Biological',
          sources: [
            'Gram-negative bacteria',
            'Sewage contamination',
            'Standing water',
            'HVAC systems',
            'Agricultural environments'
          ],
          healthEffects: [
            'Fever and inflammation',
            'Respiratory distress',
            'Septic shock risk',
            'Chronic lung disease',
            'Immune activation'
          ],
          symptoms: [
            'Flu-like symptoms',
            'Difficulty breathing',
            'Chest tightness',
            'Fatigue',
            'Muscle aches'
          ],
          testing: 'LAL assay, air and surface sampling, bioaerosol monitoring',
          remediation: 'Bacterial decontamination, sewage cleanup, antimicrobial treatment',
          regulations: 'Safe Work Australia exposure standards',
          insuranceCoverage: true
        }
      ]
    },
    chemical: {
      title: 'Chemical Toxins',
      icon: Factory,
      description: 'Synthetic and naturally occurring chemicals harmful to health',
      toxins: [
        {
          name: 'Formaldehyde',
          category: 'Chemical',
          sources: [
            'Pressed wood products (MDF, particleboard)',
            'Insulation materials',
            'Glues and adhesives',
            'Permanent press fabrics',
            'Cigarette smoke'
          ],
          healthEffects: [
            'Cancer (nasopharyngeal)',
            'Respiratory irritation',
            'Skin sensitization',
            'Eye irritation',
            'Asthma development'
          ],
          symptoms: [
            'Burning eyes and throat',
            'Watery eyes',
            'Nausea',
            'Difficulty breathing',
            'Skin irritation'
          ],
          testing: 'Air quality monitoring, passive samplers, photoionization detectors',
          remediation: 'Source removal, increased ventilation, activated carbon filtration',
          regulations: 'Safe Work Australia TWA 1ppm, STEL 2ppm',
          insuranceCoverage: false
        },
        {
          name: 'Volatile Organic Compounds (VOCs)',
          category: 'Chemical',
          sources: [
            'Paints and solvents',
            'Cleaning products',
            'Building materials',
            'Furniture off-gassing',
            'Automotive products'
          ],
          healthEffects: [
            'Central nervous system damage',
            'Liver and kidney damage',
            'Cancer risk',
            'Reproductive harm',
            'Developmental issues'
          ],
          symptoms: [
            'Headaches',
            'Dizziness',
            'Nausea',
            'Fatigue',
            'Cognitive impairment'
          ],
          testing: 'TO-15 air sampling, PID monitoring, GC/MS analysis',
          remediation: 'Source control, ventilation improvement, air purification',
          regulations: 'National Environment Protection Measure',
          insuranceCoverage: false
        },
        {
          name: 'Lead',
          category: 'Chemical',
          sources: [
            'Pre-1970s paint',
            'Old plumbing systems',
            'Contaminated soil',
            'Renovation dust',
            'Industrial emissions'
          ],
          healthEffects: [
            'Brain damage in children',
            'Kidney damage',
            'Reproductive problems',
            'High blood pressure',
            'Developmental delays'
          ],
          symptoms: [
            'Abdominal pain',
            'Constipation',
            'Fatigue',
            'Memory problems',
            'Irritability'
          ],
          testing: 'XRF testing, paint chip analysis, blood lead levels, soil testing',
          remediation: 'Encapsulation, removal by certified contractors, soil remediation',
          regulations: 'Australian Standard AS 4361.2',
          insuranceCoverage: true
        },
        {
          name: 'Asbestos',
          category: 'Chemical',
          sources: [
            'Pre-1990 building materials',
            'Insulation',
            'Vinyl floor tiles',
            'Roof shingles',
            'Pipe lagging'
          ],
          healthEffects: [
            'Mesothelioma',
            'Lung cancer',
            'Asbestosis',
            'Pleural disease',
            'Laryngeal cancer'
          ],
          symptoms: [
            'Shortness of breath',
            'Persistent cough',
            'Chest pain',
            'Fatigue',
            'Weight loss'
          ],
          testing: 'PLM analysis, TEM air monitoring, bulk sampling',
          remediation: 'Licensed asbestos removal, containment, disposal at approved facilities',
          regulations: 'Work Health and Safety Regulation 2017',
          insuranceCoverage: false
        }
      ]
    },
    environmental: {
      title: 'Environmental Toxins',
      icon: Home,
      description: 'Naturally occurring environmental hazards',
      toxins: [
        {
          name: 'Radon',
          category: 'Environmental',
          sources: [
            'Uranium decay in soil and rock',
            'Granite countertops',
            'Well water',
            'Building materials',
            'Soil gas intrusion'
          ],
          healthEffects: [
            'Lung cancer (second leading cause)',
            'DNA damage',
            'Cellular mutations',
            'Respiratory system damage',
            'Increased cancer risk for smokers'
          ],
          symptoms: [
            'No immediate symptoms',
            'Persistent cough (long-term)',
            'Hoarseness',
            'Wheezing',
            'Shortness of breath'
          ],
          testing: 'Alpha track detectors, continuous radon monitors, charcoal canisters',
          remediation: 'Sub-slab depressurization, ventilation improvement, sealing cracks',
          regulations: 'WHO guideline 100 Bq/m³',
          insuranceCoverage: false
        },
        {
          name: 'Carbon Monoxide',
          category: 'Environmental',
          sources: [
            'Gas heaters and stoves',
            'Vehicle exhaust',
            'Generators',
            'Fireplaces',
            'Blocked chimneys'
          ],
          healthEffects: [
            'Brain damage',
            'Heart damage',
            'Death by asphyxiation',
            'Fetal damage',
            'Long-term neurological effects'
          ],
          symptoms: [
            'Headache',
            'Dizziness',
            'Weakness',
            'Nausea',
            'Confusion'
          ],
          testing: 'CO monitors, blood carboxyhemoglobin testing',
          remediation: 'Source repair, ventilation, CO alarms installation',
          regulations: 'AS 3790-2014 CO limits',
          insuranceCoverage: true
        }
      ]
    },
    electromagnetic: {
      title: 'Electromagnetic Fields',
      icon: AlertCircle,
      description: 'Non-ionizing radiation from electrical and wireless sources',
      toxins: [
        {
          name: 'Electromagnetic Fields (EMF)',
          category: 'Electromagnetic',
          sources: [
            'Power lines',
            'Electrical wiring',
            'Appliances',
            'Smart meters',
            'Transformers'
          ],
          healthEffects: [
            'Sleep disruption',
            'Headaches',
            'Potential cancer link (disputed)',
            'Electromagnetic hypersensitivity',
            'Cellular stress'
          ],
          symptoms: [
            'Insomnia',
            'Fatigue',
            'Concentration problems',
            'Tinnitus',
            'Skin sensations'
          ],
          testing: 'Gaussmeter measurements, spectrum analyzers, body voltage testing',
          remediation: 'Distance from sources, shielding materials, wiring corrections',
          regulations: 'ARPANSA exposure limits',
          insuranceCoverage: false
        }
      ]
    }
  };

  const testingMethods = [
    {
      method: 'Air Quality Testing',
      description: 'Comprehensive analysis of airborne contaminants',
      equipment: 'Spore traps, VOC meters, particulate counters',
      cost: '$500-$1500',
      turnaround: '3-7 days'
    },
    {
      method: 'Surface Sampling',
      description: 'Swab and tape lift sampling for contamination',
      equipment: 'Sterile swabs, tape lifts, bulk samples',
      cost: '$300-$800',
      turnaround: '3-5 days'
    },
    {
      method: 'Bulk Material Testing',
      description: 'Laboratory analysis of building materials',
      equipment: 'Sample containers, chain of custody',
      cost: '$200-$500 per sample',
      turnaround: '5-10 days'
    },
    {
      method: 'Real-time Monitoring',
      description: 'Immediate readings of environmental conditions',
      equipment: 'Direct reading instruments, data loggers',
      cost: '$800-$2000',
      turnaround: 'Immediate'
    }
  ];

  const decontaminationMethods = [
    {
      method: 'HEPA Filtration',
      application: 'Airborne particles and spores',
      effectiveness: '99.97% at 0.3 microns',
      insurance: 'Usually covered'
    },
    {
      method: 'Antimicrobial Treatment',
      application: 'Biological contamination',
      effectiveness: 'Varies by product and organism',
      insurance: 'Covered for water damage'
    },
    {
      method: 'Encapsulation',
      application: 'Lead paint, asbestos',
      effectiveness: 'Long-term containment',
      insurance: 'Rarely covered'
    },
    {
      method: 'Chemical Neutralization',
      application: 'Chemical spills and residues',
      effectiveness: 'Depends on chemical type',
      insurance: 'Case by case'
    },
    {
      method: 'Ozone Treatment',
      application: 'Odours and some biologicals',
      effectiveness: 'Variable, controversial',
      insurance: 'Not typically covered'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Toxins & Contamination Knowledge Base</h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Comprehensive guide to identifying, testing, and remediating environmental toxins in Australian buildings. 
            Understanding health impacts, insurance coverage, and professional solutions.
          </p>
        </div>

        {/* Critical Alert */}
        <Card className="p-6 bg-red-50 border-2 border-red-300 mb-12">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0" />
            <div>
              <h2 className="text-2xl font-bold text-red-900 mb-2">
                Critical Health Warning
              </h2>
              <p className="text-red-800">
                Environmental toxins are invisible killers. Many Australians live and work in contaminated environments 
                without knowing it. Symptoms are often misdiagnosed or attributed to other causes. If you experience 
                unexplained health issues in specific buildings, environmental toxins may be the cause.
              </p>
            </div>
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="toxins" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="toxins">Toxin Types</TabsTrigger>
            <TabsTrigger value="health">Health Impacts</TabsTrigger>
            <TabsTrigger value="testing">Testing Methods</TabsTrigger>
            <TabsTrigger value="remediation">Decontamination</TabsTrigger>
          </TabsList>

          {/* Toxins Tab */}
          <TabsContent value="toxins">
            <div className="space-y-8">
              {Object.entries(toxinCategories).map(([key, category]) => (
                <Card key={key} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <category.icon className="h-8 w-8 text-blue-600" />
                    <div>
                      <h2 className="text-2xl font-bold">{category.title}</h2>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.toxins.map((toxin, index) => (
                      <Card 
                        key={index} 
                        className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => setSelectedToxin(toxin)}
                      >
                        <h3 className="font-bold mb-2">{toxin.name}</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-start gap-2">
                            <Home className="h-4 w-4 text-gray-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">
                              {toxin.sources.length} common sources
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            <Heart className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-600">
                              {toxin.healthEffects.length} health effects
                            </span>
                          </div>
                          <div className="flex items-start gap-2">
                            {toxin.insuranceCoverage ? (
                              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                            ) : (
                              <XCircle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                            )}
                            <span className="text-gray-600">
                              Insurance: {toxin.insuranceCoverage ? 'Usually covered' : 'Rarely covered'}
                            </span>
                          </div>
                        </div>
                        <Button size="sm" className="w-full mt-3">
                          View Details
                        </Button>
                      </Card>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Health Impacts Tab */}
          <TabsContent value="health">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Vulnerable Populations</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Baby className="h-6 w-6 text-blue-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold">Children</h3>
                      <p className="text-sm text-gray-600">
                        Developing organs, higher breathing rates, hand-to-mouth behaviour increases exposure. 
                        Long-term effects on growth, learning, and development.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Heart className="h-6 w-6 text-red-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold">Elderly</h3>
                      <p className="text-sm text-gray-600">
                        Weakened immune systems, pre-existing conditions, reduced ability to detoxify. 
                        Higher risk of severe complications.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Wind className="h-6 w-6 text-purple-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold">Respiratory Conditions</h3>
                      <p className="text-sm text-gray-600">
                        Asthma, COPD, allergies make individuals more sensitive to airborne toxins. 
                        Can trigger severe attacks and long-term decline.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Brain className="h-6 w-6 text-green-600 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold">Chemical Sensitivity</h3>
                      <p className="text-sm text-gray-600">
                        Multiple Chemical Sensitivity (MCS) and environmental illness sufferers. 
                        Severe reactions to low-level exposures.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Exposure Pathways</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-bold mb-2">Inhalation</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Primary route for airborne toxins, gases, and particulates
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Mould spores</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">VOCs</span>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">Asbestos fibres</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Dermal Absorption</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Through skin contact with contaminated surfaces or materials
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Pesticides</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Solvents</span>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">Lead dust</span>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Ingestion</h3>
                    <p className="text-sm text-gray-600 mb-2">
                      Through contaminated food, water, or hand-to-mouth contact
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Lead paint</span>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Contaminated water</span>
                      <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">Dust</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Testing Methods Tab */}
          <TabsContent value="testing">
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Professional Testing Methods</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  {testingMethods.map((method, index) => (
                    <Card key={index} className="p-4 bg-gray-50">
                      <h3 className="font-bold text-lg mb-2">{method.method}</h3>
                      <p className="text-sm text-gray-600 mb-3">{method.description}</p>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-500">Equipment:</span>
                          <span className="font-medium">{method.equipment}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Cost:</span>
                          <span className="font-medium text-green-600">{method.cost}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-500">Results:</span>
                          <span className="font-medium">{method.turnaround}</span>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Testing Standards & Accreditation</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Shield className="h-12 w-12 text-blue-600 mx-auto mb-2" />
                    <h3 className="font-bold">NATA Accreditation</h3>
                    <p className="text-sm text-gray-600">
                      National Association of Testing Authorities certification required
                    </p>
                  </div>
                  <div className="text-center">
                    <FileText className="h-12 w-12 text-green-600 mx-auto mb-2" />
                    <h3 className="font-bold">Chain of Custody</h3>
                    <p className="text-sm text-gray-600">
                      Legal documentation for sample handling and analysis
                    </p>
                  </div>
                  <div className="text-center">
                    <Microscope className="h-12 w-12 text-purple-600 mx-auto mb-2" />
                    <h3 className="font-bold">Quality Assurance</h3>
                    <p className="text-sm text-gray-600">
                      Blind samples, duplicates, and equipment calibration
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Decontamination Tab */}
          <TabsContent value="remediation">
            <div className="space-y-6">
              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-6">Decontamination Methods</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-2">Method</th>
                        <th className="text-left p-2">Application</th>
                        <th className="text-left p-2">Effectiveness</th>
                        <th className="text-left p-2">Insurance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {decontaminationMethods.map((method, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2 font-medium">{method.method}</td>
                          <td className="p-2 text-sm text-gray-600">{method.application}</td>
                          <td className="p-2 text-sm">{method.effectiveness}</td>
                          <td className="p-2">
                            <span className={`text-sm px-2 py-1 rounded ${
                              method.insurance.includes('covered') 
                                ? 'bg-green-100 text-green-700' 
                                : 'bg-red-100 text-red-700'
                            }`}>
                              {method.insurance}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>

              <Card className="p-6">
                <h2 className="text-2xl font-bold mb-4">Insurance Considerations</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-green-600 mb-3">Usually Covered</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Water damage-related mould (sudden events)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Fire and smoke contamination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Storm-related contamination</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>Sewage backup (with endorsement)</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-bold text-red-600 mb-3">Rarely Covered</h3>
                    <ul className="space-y-2">
                      <li className="flex items-start gap-2">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Gradual mould growth</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Asbestos removal</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Lead paint remediation</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                        <span>Environmental pollution</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Selected Toxin Modal */}
        {selectedToxin && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <Card className="max-w-4xl max-h-[90vh] overflow-y-auto p-8">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-3xl font-bold">{selectedToxin.name}</h2>
                <Button 
                  variant="ghost" 
                  onClick={() => setSelectedToxin(null)}
                  className="text-2xl"
                >
                  ×
                </Button>
              </div>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-lg mb-2">Common Sources</h3>
                  <ul className="space-y-1">
                    {selectedToxin.sources.map((source, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{source}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Health Effects</h3>
                  <ul className="space-y-1">
                    {selectedToxin.healthEffects.map((effect, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <AlertTriangle className="h-4 w-4 text-red-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{effect}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-lg mb-2">Symptoms</h3>
                  <ul className="space-y-1">
                    {selectedToxin.symptoms.map((symptom, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Info className="h-4 w-4 text-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-bold text-lg mb-2">Testing Methods</h3>
                    <p className="text-sm text-gray-600">{selectedToxin.testing}</p>
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">Remediation</h3>
                    <p className="text-sm text-gray-600">{selectedToxin.remediation}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h3 className="font-bold mb-2">Regulations</h3>
                    <p className="text-sm text-gray-600">{selectedToxin.regulations}</p>
                  </div>
                  <div>
                    <h3 className="font-bold mb-2">Insurance Coverage</h3>
                    <p className={`text-sm font-semibold ${
                      selectedToxin.insuranceCoverage ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {selectedToxin.insuranceCoverage 
                        ? 'Usually covered by insurance' 
                        : 'Rarely covered by insurance'}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
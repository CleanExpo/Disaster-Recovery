import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Hammer, Shield, Trash2, Recycle, Clock, DollarSign,
  CheckCircle, X, ArrowRight, AlertTriangle, Gauge, Target
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Builder vs Restorer: The $15,000 Difference | Professional Restoration | Disaster Recovery',
  description: 'Why builders "rip and tear" what professional restorers save. Understand the methodology difference that can save thousands and reduce waste by 70%. 28 years industry experience.',
  keywords: 'builder vs restorer, professional restoration, rip and tear vs restore, mitigation vs demolition, restoration methodology, waste reduction',
  openGraph: {
    title: 'Builder vs Restorer: The Professional Difference That Saves Thousands',
    description: 'Restore what can be saved. Replace only what cannot be restored.',
    images: ['/images/builder-vs-restorer.jpg'] } };

const methodologyComparison = {
  builder: {
    title: 'Builder Approach: "Rip and Tear"',
    philosophy: 'When in doubt, demolish and rebuild',
    timeline: '6-16 weeks',
    wasteGeneration: '3-5 tonnes per job',
    primarySkill: 'Construction and building',
    mindset: 'Fresh start - tear down and rebuild',
    equipment: 'Demolition tools, construction equipment',
    outcome: 'Everything new, maximum cost'
  },
  restorer: {
    title: 'Professional Restorer: "Assess and Restore"',
    philosophy: 'Restore what can be saved, replace only what cannot',
    timeline: '2-6 weeks',
    wasteGeneration: '0.5-1.5 tonnes per job',
    primarySkill: 'Damage assessment and restoration science',
    mindset: 'Scientific approach - analyze, treat, restore',
    equipment: 'Specialized restoration equipment, moisture meters, air movers',
    outcome: 'Maximum preservation, optimal cost'
  }
};

const realWorldScenarios = [
  {
    scenario: 'Kitchen Water Damage - Burst Dishwasher Line',
    damage: 'Water under cabinets, hardwood floor affected, drywall base wet',
    
    builderApproach: {
      method: 'Full kitchen demolition and rebuild',
      reasoning: 'Safest to start fresh, no moisture concerns',
      timeline: '8-12 weeks',
      cost: '$45,000-65,000',
      waste: '4 tonnes to landfill',
      disruption: 'No kitchen for 3 months',
      steps: [
        'Remove all cabinets and countertops',
        'Tear out all flooring',
        'Replace all affected drywall', 
        'Order new kitchen entirely',
        'Complete reconstruction'
      ]
    },
    
    restorerApproach: {
      method: 'Targeted restoration with selective replacement',
      reasoning: 'Scientific moisture assessment determines what needs replacement',
      timeline: '3-4 weeks',
      cost: '$12,000-18,000',
      waste: '0.8 tonnes to landfill',
      disruption: 'Partial kitchen use throughout',
      steps: [
        'Immediate moisture extraction and assessment',
        'Remove only damaged base cabinets',
        'Targeted hardwood floor drying and restoration',
        'Selective drywall replacement (only wet portions)',
        'Restore rather than replace where possible'
      ]
    },
    
    savings: {
      cost: '$27,000-47,000',
      time: '5-8 weeks faster',
      waste: '3.2 tonnes less waste',
      disruption: '70% less household disruption'
    }
  },
  
  {
    scenario: 'Basement Flood - Category 1 Water',
    damage: 'Finished basement flooded, carpet, drywall, some furniture affected',
    
    builderApproach: {
      method: 'Gut entire basement and rebuild',
      reasoning: 'Moisture concerns require complete replacement',
      timeline: '10-14 weeks',
      cost: '$35,000-50,000',
      waste: '3.5 tonnes to landfill',
      disruption: 'Basement unusable for 4 months',
      steps: [
        'Remove all flooring and carpet',
        'Demolish all drywall to ceiling',
        'Remove all fixtures and built-ins',
        'Treat concrete and start over',
        'Complete basement reconstruction'
      ]
    },
    
    restorerApproach: {
      method: 'Scientific drying with targeted replacement',
      reasoning: 'Professional equipment can restore most materials safely',
      timeline: '2-3 weeks',
      cost: '$8,000-15,000',
      waste: '0.6 tonnes to landfill',
      disruption: 'Limited access for 3 weeks',
      steps: [
        'Immediate water extraction',
        'Commercial dehumidification and air movement',
        'Moisture content monitoring and assessment',
        'Replace only materials that cannot be adequately dried',
        'Professional cleaning and restoration'
      ]
    },
    
    savings: {
      cost: '$20,000-35,000',
      time: '7-11 weeks faster', 
      waste: '2.9 tonnes less waste',
      disruption: '75% less household disruption'
    }
  }
];

const environmentalImpact = {
  wasteReduction: '70%',
  carbonFootprint: '60% lower',
  materialConservation: '80% of original materials preserved',
  recyclingRate: '90%',
  landfillDiversion: '3.5 tonnes average per job',
  energySavings: '40% less energy than full reconstruction'
};

const qualificationDifferences = [
  {
    aspect: 'Primary Training',
    builder: 'Construction techniques, building codes, new construction methods',
    restorer: 'Damage assessment, restoration science, moisture management, microbiology',
    whyItMatters: 'Restoration requires understanding of how materials respond to damage and treatment'
  },
  {
    aspect: 'Equipment Specialization',
    builder: 'Demolition tools, construction equipment, building materials',
    restorer: 'Moisture meters, thermal imaging, commercial dehumidifiers, specialized cleaning equipment',
    whyItMatters: 'Different tools for different approaches - precision vs demolition'
  },
  {
    aspect: 'Industry Certifications',
    builder: 'Building licenses, trade certifications, construction safety',
    restorer: 'IICRC certifications (WRT, ASD, AMRT), restoration-specific training',
    whyItMatters: 'Restoration certifications focus on saving materials, not replacing them'
  },
  {
    aspect: 'Success Metrics',
    builder: 'Quality of new construction, building code compliance, structural integrity',
    restorer: 'Percentage of materials saved, speed of mitigation, prevention of secondary damage',
    whyItMatters: 'Different success definitions lead to different approaches'
  }
];

export default function BuilderVsRestorerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-blue-900 to-gray-900 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />
        </div>

        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-300 mb-8">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-white transition">Guides</Link>
              <span>/</span>
              <Link href="/guides/professional" className="hover:text-white transition">Professional</Link>
              <span>/</span>
              <span className="text-white">Builder vs Restorer</span>
            </nav>

            <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
              <Shield className="h-3 w-3 mr-1" />
              Professional Restoration Science
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Builder vs Restorer:<br />The $15,000 Difference
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Why builders "rip and tear" what professional restorers save. Understanding the methodology difference that can save thousands and reduce waste by 70%.
            </p>

            {/* Key Philosophy Difference */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div className="bg-red-900/30 border border-red-600/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Hammer className="h-6 w-6 text-red-400" />
                  <h3 className="text-lg font-semibold">Builder Philosophy</h3>
                </div>
                <p className="text-red-300 text-sm">"When in doubt, demolish and rebuild fresh"</p>
              </div>
              <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Shield className="h-6 w-6 text-emerald-600" />
                  <h3 className="text-lg font-semibold">Restorer Philosophy</h3>
                </div>
                <p className="text-green-300 text-sm">"Restore what can be saved, replace only what cannot"</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#real-world-comparison">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                  <Target className="mr-2 h-5 w-5" />
                  See Real Examples
                </Button>
              </Link>
              <Link href="/schedule">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Shield className="mr-2 h-5 w-5" />
                  Get Professional Assessment
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Comparison */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Two Completely Different Approaches
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Same damage, different methodology - vastly different outcomes for cost, timeline, and waste
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Builder Approach */}
            <Card className="p-8 border-red-200 bg-red-50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg bg-red-500 flex items-center justify-center">
                  <Hammer className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-red-900">{methodologyComparison.builder.title}</h3>
                  <p className="text-red-700">{methodologyComparison.builder.philosophy}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-red-600 mb-1">{methodologyComparison.builder.timeline}</div>
                    <p className="text-sm text-red-700">Timeline</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-red-600 mb-1">{methodologyComparison.builder.wasteGeneration}</div>
                    <p className="text-sm text-red-700">Waste Generated</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-red-900 mb-2">Primary Skill Focus:</h4>
                  <p className="text-sm text-red-800 bg-red-100 p-3 rounded-lg">{methodologyComparison.builder.primarySkill}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-red-900 mb-2">Typical Mindset:</h4>
                  <p className="text-sm text-red-700">{methodologyComparison.builder.mindset}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-red-900 mb-2">Equipment Used:</h4>
                  <p className="text-sm text-red-700">{methodologyComparison.builder.equipment}</p>
                </div>

                <div className="border-t border-red-200 pt-4">
                  <h4 className="font-semibold text-red-900 mb-2">Typical Outcome:</h4>
                  <p className="text-sm text-red-800 font-medium">{methodologyComparison.builder.outcome}</p>
                </div>
              </div>
            </Card>

            {/* Restorer Approach */}
            <Card className="p-8 border-green-200 bg-green-50">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg bg-green-500 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-green-900">{methodologyComparison.restorer.title}</h3>
                  <p className="text-green-700">{methodologyComparison.restorer.philosophy}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-1">{methodologyComparison.restorer.timeline}</div>
                    <p className="text-sm text-green-700">Timeline</p>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 mb-1">{methodologyComparison.restorer.wasteGeneration}</div>
                    <p className="text-sm text-green-700">Waste Generated</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-green-900 mb-2">Primary Skill Focus:</h4>
                  <p className="text-sm text-green-800 bg-green-100 p-3 rounded-lg">{methodologyComparison.restorer.primarySkill}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-green-900 mb-2">Typical Mindset:</h4>
                  <p className="text-sm text-green-700">{methodologyComparison.restorer.mindset}</p>
                </div>

                <div>
                  <h4 className="font-semibold text-green-900 mb-2">Equipment Used:</h4>
                  <p className="text-sm text-green-700">{methodologyComparison.restorer.equipment}</p>
                </div>

                <div className="border-t border-green-200 pt-4">
                  <h4 className="font-semibold text-green-900 mb-2">Typical Outcome:</h4>
                  <p className="text-sm text-green-800 font-medium">{methodologyComparison.restorer.outcome}</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Real World Scenarios */}
      <section id="real-world-comparison" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real World Scenario Comparisons
            </h2>
            <p className="text-xl text-gray-600">
              Same damage, two approaches - see the dramatic difference in cost, time, and waste
            </p>
          </div>

          <div className="space-y-16">
            {realWorldScenarios.map((scenario, idx) => (
              <div key={idx}>
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{scenario.scenario}</h3>
                  <p className="text-gray-600">{scenario.damage}</p>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Builder Approach */}
                  <Card className="p-8 border-red-200">
                    <div className="flex items-center gap-3 mb-6">
                      <Hammer className="h-6 w-6 text-red-500" />
                      <h4 className="text-xl font-semibold text-red-900">{scenario.builderApproach.method}</h4>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-red-700 bg-red-50 p-3 rounded-lg">
                        <strong>Reasoning:</strong> {scenario.builderApproach.reasoning}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-lg font-bold text-red-600">{scenario.builderApproach.timeline}</div>
                        <div className="text-xs text-red-700">Timeline</div>
                      </div>
                      <div className="text-center p-3 bg-red-50 rounded-lg">
                        <div className="text-lg font-bold text-red-600">{scenario.builderApproach.cost}</div>
                        <div className="text-xs text-red-700">Cost Range</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Typical Process:</h5>
                      <ol className="space-y-1 text-sm text-gray-700">
                        {scenario.builderApproach.steps.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{sIdx + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Waste Generated:</span>
                        <span className="text-red-600 font-medium">{scenario.builderApproach.waste}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Household Disruption:</span>
                        <span className="text-red-600 font-medium">{scenario.builderApproach.disruption}</span>
                      </div>
                    </div>
                  </Card>

                  {/* Restorer Approach */}
                  <Card className="p-8 border-green-200">
                    <div className="flex items-center gap-3 mb-6">
                      <Shield className="h-6 w-6 text-green-500" />
                      <h4 className="text-xl font-semibold text-green-900">{scenario.restorerApproach.method}</h4>
                    </div>

                    <div className="mb-6">
                      <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                        <strong>Reasoning:</strong> {scenario.restorerApproach.reasoning}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{scenario.restorerApproach.timeline}</div>
                        <div className="text-xs text-green-700">Timeline</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{scenario.restorerApproach.cost}</div>
                        <div className="text-xs text-green-700">Cost Range</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <h5 className="font-medium text-gray-900 mb-2">Professional Process:</h5>
                      <ol className="space-y-1 text-sm text-gray-700">
                        {scenario.restorerApproach.steps.map((step, sIdx) => (
                          <li key={sIdx} className="flex items-start gap-2">
                            <span className="bg-green-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">{sIdx + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Waste Generated:</span>
                        <span className="text-green-600 font-medium">{scenario.restorerApproach.waste}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Household Disruption:</span>
                        <span className="text-green-600 font-medium">{scenario.restorerApproach.disruption}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Savings Summary */}
                <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
                  <h4 className="text-lg font-semibold text-blue-900 mb-4 text-center">Professional Restoration Savings</h4>
                  <div className="grid md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">{scenario.savings.cost}</div>
                      <div className="text-sm text-blue-700">Cost Savings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">{scenario.savings.time}</div>
                      <div className="text-sm text-blue-700">Time Savings</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">{scenario.savings.waste}</div>
                      <div className="text-sm text-blue-700">Waste Reduction</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600 mb-1">{scenario.savings.disruption}</div>
                      <div className="text-sm text-blue-700">Less Disruption</div>
                    </div>
                  </div>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Environmental Impact: The Restoration Advantage
            </h2>
            <p className="text-xl text-gray-600">
              Professional restoration isn't just better for your wallet - it's better for the planet
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Recycle className="h-8 w-8 text-green-600" />
              </div>
              <div className="text-3xl font-bold text-green-600 mb-2">{environmentalImpact.wasteReduction}</div>
              <h3 className="font-semibold text-gray-900 mb-2">Waste Reduction</h3>
              <p className="text-sm text-gray-600">Less material to landfill compared to full demolition</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mx-auto mb-4">
                <Gauge className="h-8 w-8 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{environmentalImpact.carbonFootprint}</div>
              <h3 className="font-semibold text-gray-900 mb-2">Carbon Footprint</h3>
              <p className="text-sm text-gray-600">Reduced manufacturing and transport emissions</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <div className="text-3xl font-bold text-purple-600 mb-2">{environmentalImpact.materialConservation}</div>
              <h3 className="font-semibold text-gray-900 mb-2">Material Conservation</h3>
              <p className="text-sm text-gray-600">Original materials preserved and restored</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-blue-700" />
              </div>
              <div className="text-3xl font-bold text-blue-700 mb-2">{environmentalImpact.recyclingRate}</div>
              <h3 className="font-semibold text-gray-900 mb-2">Recycling Rate</h3>
              <p className="text-sm text-gray-600">Materials that must be replaced are recycled</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-8 w-8 text-red-600" />
              </div>
              <div className="text-3xl font-bold text-red-600 mb-2">{environmentalImpact.landfillDiversion}</div>
              <h3 className="font-semibold text-gray-900 mb-2">Landfill Diversion</h3>
              <p className="text-sm text-gray-600">Average waste diverted per restoration job</p>
            </Card>

            <Card className="p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              <div className="text-3xl font-bold text-yellow-600 mb-2">{environmentalImpact.energySavings}</div>
              <h3 className="font-semibold text-gray-900 mb-2">Energy Savings</h3>
              <p className="text-sm text-gray-600">Less energy than manufacturing new materials</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Qualification Differences */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Training and Qualification Differences
            </h2>
            <p className="text-xl text-gray-600">
              Different skills, different tools, different outcomes
            </p>
          </div>

          <div className="space-y-8">
            {qualificationDifferences.map((diff, idx) => (
              <Card key={idx} className="p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">{diff.aspect}</h3>
                
                <div className="grid lg:grid-cols-3 gap-6">
                  <div className="bg-red-50 p-4 rounded-lg">
                    <h4 className="font-medium text-red-900 mb-2 flex items-center gap-2">
                      <Hammer className="h-4 w-4" />
                      Builder Focus
                    </h4>
                    <p className="text-sm text-red-800">{diff.builder}</p>
                  </div>
                  
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      Restorer Focus
                    </h4>
                    <p className="text-sm text-green-800">{diff.restorer}</p>
                  </div>
                  
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">Why It Matters</h4>
                    <p className="text-sm text-blue-800">{diff.whyItMatters}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Choose Professional Restoration
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            Restore what can be saved. Replace only what cannot be restored. 
            Save thousands while reducing environmental impact.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <DollarSign className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Save $15,000+</h3>
              <p className="text-sm text-white/80">Average savings vs demolition approach</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <Clock className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">70% Faster</h3>
              <p className="text-sm text-white/80">Back to normal life weeks sooner</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <Recycle className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">70% Less Waste</h3>
              <p className="text-sm text-white/80">Massive reduction in landfill waste</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg">
                <Shield className="mr-2 h-5 w-5" />
                Get Professional Assessment
              </Button>
            </Link>
            <Link href="/guides/insurance/real-cost-insurance-delays">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                <ArrowRight className="mr-2 h-5 w-5" />
                Learn About Insurance Rights
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  AlertTriangle, Clock, DollarSign, Scale, Shield, TrendingUp,
  CheckCircle, ArrowRight, Phone, FileText, Calculator, Eye
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'The Real Cost of Insurance Delays - ASIC & ICA Data on Claims Crisis | Disaster Recovery',
  description: 'ASIC concerned about unresolved 2022 flood claims. ICA reports 78% of catastrophes Oct-April. Learn your Section 54 rights and how delays cost thousands in secondary damage.',
  keywords: 'insurance claim delays ASIC, ICA catastrophe report 2024, flood claims unresolved, AFCA complaints, Section 54 Insurance Contracts Act, Ex-Tropical Cyclone Jasper claims',
  openGraph: {
    title: 'Insurance Delays Crisis - ASIC & ICA Data Reveals System Failures',
    description: 'ASIC concerned about ongoing 2022 flood claims. One in 10 AFCA complaints about claims handling delays.',
    images: ['/images/insurance-delays-cost.jpg'],
  },
};

const delayStages = [
  {
    stage: 'Initial Call',
    timeline: '0-1 hours',
    description: 'Homeowner calls insurance company in emergency',
    problems: [
      'Non-technical receptionist takes limited information',
      'Critical details about damage extent missed',
      'No understanding of urgency or secondary damage risk',
      'ICA: 78% of catastrophes occur Oct-April peak season'
    ],
    cost: '$0',
    cumulativeCost: '$0',
    source: 'Insurance Catastrophe Resilience Report 2023-24'
  },
  {
    stage: 'File Creation',
    timeline: '1-24 hours', 
    description: 'Claim enters insurance company system',
    problems: [
      'File passed between multiple departments',
      'Building vs contents classification confusion',
      'Excess payment requirements delay action'
    ],
    cost: '$500-2,000',
    cumulativeCost: '$500-2,000',
    damage: 'Water continues spreading. Mould risk increases.'
  },
  {
    stage: 'Assessment Scheduling',
    timeline: '1-7 days',
    description: 'Third-party assessor assigned and scheduled',
    problems: [
      'Assessor with no field experience reviews file',
      'Scope misunderstood due to phone-based assessment',
      'Equipment and skill requirements not identified'
    ],
    cost: '$2,000-5,000',
    cumulativeCost: '$2,500-7,000',
    damage: 'Structural damage worsens. Mould growth begins.'
  },
  {
    stage: 'Approval Process',
    timeline: '3-14 days',
    description: 'Scope and pricing require multiple approvals',
    problems: [
      '"Reasonable" price assessment by non-trades people',
      'Loss adjuster involvement adds another layer',
      'Multiple approval levels for equipment and labour'
    ],
    cost: '$3,000-8,000',
    cumulativeCost: '$5,500-15,000',
    damage: 'Secondary damage now exceeds original loss.'
  },
  {
    stage: 'Builder Assignment',
    timeline: '7-21 days',
    description: 'Builder takes control instead of restoration specialist',
    problems: [
      'Builder methodology: "rip and tear" vs "mitigate and restore"',
      'No emergency mitigation - goes straight to demolition',
      'Increases waste, timeline, and final cost significantly'
    ],
    cost: '$5,000-15,000',
    cumulativeCost: '$10,500-30,000',
    damage: 'Preventable damage now requires full reconstruction.'
  }
];

const legalRights = [
  {
    right: 'Choose Your Own Contractor',
    law: 'Insurance Contracts Act 1984, Section 54',
    description: 'You have the legal right to choose qualified contractors for emergency mitigation work. Insurance companies cannot force you to use their preferred contractors.',
    action: 'Contact professional restoration contractors immediately - don\'t wait for insurance approval for emergency mitigation.'
  },
  {
    right: 'Emergency Mitigation Coverage',
    law: 'Standard Policy Terms',
    description: 'Insurance must pay reasonable costs for emergency measures to prevent further damage. This includes immediate water extraction, drying, and temporary protection.',
    action: 'Document all emergency work with photos and detailed invoices. Professional contractors understand insurance requirements.'
  },
  {
    right: 'Protection from Prejudicial Acts',
    law: 'Section 54 Protection',
    description: 'Insurers cannot refuse claims based on your choice of contractor unless they can prove your choice caused additional damage or prejudice to their interests.',
    action: 'Use qualified, insured, and certified restoration professionals to maintain full coverage protection.'
  }
];

const realWorldExample = {
  scenario: 'Burst Pipe - Kitchen Flood',
  propertyValue: '$750,000',
  initialDamage: '$8,500',
  
  delayedResponse: {
    title: 'Insurance System Response',
    timeline: '18 days to start work',
    finalCost: '$47,300',
    breakdown: [
      { item: 'Water damage (expanded)', cost: '$15,200' },
      { item: 'Mould remediation', cost: '$8,900' },
      { item: 'Structural damage', cost: '$12,400' },
      { item: 'Kitchen rebuild', cost: '$10,800' }
    ],
    problems: [
      'Living in hotel for 6 weeks',
      'Lost family photos and documents',
      'Dispute over mould coverage',
      'Contractor quality issues'
    ]
  },
  
  immediateResponse: {
    title: 'Professional Contractor Response',
    timeline: '2 hours to start mitigation',
    finalCost: '$12,800',
    breakdown: [
      { item: 'Emergency water extraction', cost: '$2,400' },
      { item: 'Professional drying', cost: '$3,200' },
      { item: 'Preventive treatment', cost: '$1,800' },
      { item: 'Restoration work', cost: '$5,400' }
    ],
    benefits: [
      'Stayed in own home throughout',
      'No secondary damage occurred',
      'Full documentation for insurance',
      'Certified professional work'
    ]
  }
};

export default function RealCostInsuranceDelaysPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-red-900 via-orange-900 to-gray-900 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-centre opacity-20" />
        </div>

        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-300 mb-8">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-white transition">Guides</Link>
              <span>/</span>
              <Link href="/guides/insurance" className="hover:text-white transition">Insurance</Link>
              <span>/</span>
              <span className="text-white">Real Cost of Delays</span>
            </nav>

            <Badge className="mb-4 bg-red-500/20 text-red-300 border-red-500/30">
              <AlertTriangle className="h-3 w-3 mr-1" />
              ASIC Concerned About Unresolved 2022 Flood Claims
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              The Real Cost of Insurance Delays
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Why waiting for insurance approval can cost you $20,000+ extra - and your legal rights to prevent it.
            </p>

            {/* Shocking Statistics */}
            <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-6 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-red-300 mb-2">10,000+</div>
                  <div className="text-sm text-gray-300">Ex-Cyclone Jasper claims ($384M) still processing</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-300 mb-2">1 in 10</div>
                  <div className="text-sm text-gray-300">AFCA complaints about claim delays</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300 mb-2">78%</div>
                  <div className="text-sm text-gray-300">Catastrophes occur Oct-April (ICA)</div>
                </div>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">
                Sources: <a href="https://insurancecouncil.com.au/wp-content/uploads/2024/08/21100_ICA_Catastrophe-Report_Print-2024_Final-single-pages.pdf" 
                  className="underline hover:text-gray-300" target="_blank" rel="noopener noreferrer">ICA Catastrophe Report 2024</a> | 
                <a href="https://www.asic.gov.au/" className="underline hover:text-gray-300" target="_blank" rel="noopener noreferrer">ASIC Oct 2024</a>
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/schedule">
                <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                  <Phone className="mr-2 h-5 w-5" />
                  Get Emergency Response Now
                </Button>
              </Link>
              <Link href="#legal-rights">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  Know Your Legal Rights
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The Broken System Timeline */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              The Broken System Timeline
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Here's what really happens when you call your insurance company - and why each delay costs you thousands
            </p>
          </div>

          <div className="space-y-8">
            {delayStages.map((stage, idx) => (
              <Card key={idx} className="p-8 relative overflow-hidden">
                {/* Timeline connector */}
                {idx < delayStages.length - 1 && (
                  <div className="absolute left-12 bottom-0 w-0.5 h-8 bg-red-200 transform translate-y-full"></div>
                )}
                
                <div className="flex items-start gap-6">
                  {/* Stage indicator */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-center justify-center text-white font-bold text-lg">
                      {idx + 1}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-2xl font-semibold text-gray-900">{stage.stage}</h3>
                      <div className="flex items-center gap-4">
                        <Badge variant="outline" className="text-orange-600 border-orange-600">
                          <Clock className="h-4 w-4 mr-1" />
                          {stage.timeline}
                        </Badge>
                        <Badge variant="destructive">
                          <DollarSign className="h-4 w-4 mr-1" />
                          {stage.cumulativeCost}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{stage.description}</p>
                    
                    <div className="grid lg:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <AlertTriangle className="h-4 w-4 text-red-500" />
                          System Problems
                        </h4>
                        <ul className="space-y-2">
                          {stage.problems.map((problem, pIdx) => (
                            <li key={pIdx} className="text-sm text-gray-600 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                              {problem}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      {stage.damage && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                            <TrendingUp className="h-4 w-4 text-orange-500" />
                            Meanwhile, Your Property...
                          </h4>
                          <p className="text-sm text-orange-600 bg-orange-50 p-3 rounded-lg">
                            {stage.damage}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Real World Example */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real World Example: The $34,500 Difference
            </h2>
            <p className="text-xl text-gray-600">
              Same damage, two different approaches - the cost difference is shocking
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Delayed Response */}
            <Card className="p-8 border-red-200 bg-red-50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center">
                  <Clock className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-red-900">{realWorldExample.delayedResponse.title}</h3>
                  <p className="text-red-700">{realWorldExample.delayedResponse.timeline}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  ${realWorldExample.delayedResponse.finalCost.toLocaleString()}
                </div>
                <p className="text-sm text-red-700">Final cost after delays</p>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-900">Cost Breakdown:</h4>
                {realWorldExample.delayedResponse.breakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.item}</span>
                    <span className="font-semibold text-red-600">${item.cost.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Additional Problems:</h4>
                <ul className="space-y-2">
                  {realWorldExample.delayedResponse.problems.map((problem, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Immediate Response */}
            <Card className="p-8 border-green-200 bg-green-50">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-green-900">{realWorldExample.immediateResponse.title}</h3>
                  <p className="text-green-700">{realWorldExample.immediateResponse.timeline}</p>
                </div>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${realWorldExample.immediateResponse.finalCost.toLocaleString()}
                </div>
                <p className="text-sm text-green-700">Total professional restoration</p>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-900">Cost Breakdown:</h4>
                {realWorldExample.immediateResponse.breakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.item}</span>
                    <span className="font-semibold text-green-600">${item.cost.toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Additional Benefits:</h4>
                <ul className="space-y-2">
                  {realWorldExample.immediateResponse.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Card className="p-6 bg-yellow-50 border-yellow-200 inline-block">
              <div className="flex items-center gap-3">
                <Calculator className="h-8 w-8 text-yellow-600" />
                <div>
                  <div className="text-2xl font-bold text-yellow-900">
                    Savings: ${(realWorldExample.delayedResponse.finalCost - realWorldExample.immediateResponse.finalCost).toLocaleString()}
                  </div>
                  <p className="text-sm text-yellow-700">Professional response prevented 73% of total damage costs</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Legal Rights Section */}
      <section id="legal-rights" className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Your Legal Rights Under Australian Law
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Section 54 of the Insurance Contracts Act 1984 protects your right to choose qualified contractors for emergency mitigation work
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {legalRights.map((right, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                    <Scale className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{right.right}</h3>
                    <Badge className="mb-3 text-xs bg-blue-100 text-blue-800">
                      {right.law}
                    </Badge>
                    <p className="text-gray-600 mb-4 text-sm">{right.description}</p>
                    <div className="bg-green-50 border border-green-200 p-3 rounded-lg">
                      <h4 className="font-medium text-green-900 mb-1">Action You Can Take:</h4>
                      <p className="text-sm text-green-800">{right.action}</p>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-12 p-8 bg-blue-50 border-blue-200">
            <div className="flex items-start gap-4">
              <FileText className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-blue-900 mb-3">
                  What to Say to Your Insurance Company
                </h3>
                <div className="bg-white border border-blue-200 p-4 rounded-lg">
                  <p className="text-gray-800 italic mb-3">
                    "Under Section 54 of the Insurance Contracts Act 1984, I am exercising my right to choose qualified emergency mitigation contractors to prevent further damage to my property. Please provide immediate authorisation for emergency mitigation work by certified restoration professionals."
                  </p>
                  <p className="text-sm text-blue-700">
                    <strong>Remember:</strong> They cannot refuse reasonable emergency mitigation costs or force you to use their preferred contractors.
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Professional Solution */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Break Free From The Broken System
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            Professional restoration contractors who understand your legal rights, work directly with insurance companies, and prevent costly secondary damage.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <Clock className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">2-Hour Response</h3>
              <p className="text-sm text-white/80">Emergency mitigation starts immediately, not after insurance approval</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <Shield className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Legal Compliance</h3>
              <p className="text-sm text-white/80">Full Section 54 protection and insurance documentation</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <DollarSign className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-sm text-white/80">No shock invoices. Professional rates with upfront estimates</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg">
                <Phone className="mr-2 h-5 w-5" />
                Get Emergency Response Now
              </Button>
            </Link>
            <Link href="/guides/insurance/choose-your-own-contractor">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                <Eye className="mr-2 h-5 w-5" />
                Learn More About Your Rights
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
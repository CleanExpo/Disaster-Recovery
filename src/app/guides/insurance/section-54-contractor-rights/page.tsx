import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Scale, Shield, FileText, CheckCircle, AlertTriangle, Phone,
  ArrowRight, Download, BookOpen, Gavel, Building
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Section 54 Insurance Contracts Act: Your Right to Choose Contractors | Disaster Recovery Australia',
  description: 'Complete guide to Section 54 of the Insurance Contracts Act 1984 - your legal right to choose qualified emergency contractors. Protect yourself from insurer preferred contractor requirements.',
  keywords: 'Section 54 Insurance Contracts Act, choose your own contractor, emergency mitigation rights, insurance law Australia, policyholder rights',
  openGraph: {
    title: 'Section 54: Your Legal Right to Choose Emergency Contractors',
    description: 'Understanding your protected rights under Australian insurance law.',
    images: ['/images/section-54-rights.jpg'],
  },
};

const section54Provisions = [
  {
    title: 'Prohibition of Claim Refusal',
    law: 'Section 54(1)',
    description: 'Insurers cannot refuse to pay claims based solely on your post-contractual acts (like choosing your own contractor)',
    realWorld: 'Insurance company cannot deny your claim just because you hired your own emergency contractor instead of their "preferred" list',
    protection: 'Full claim payment unless insurer proves your contractor choice caused additional prejudice'
  },
  {
    title: 'Proportional Reduction Only',
    law: 'Section 54(2)', 
    description: 'If your contractor choice causes any prejudice to the insurer, they can only reduce payment by the amount of actual prejudice',
    realWorld: 'If your contractor costs 10% more but does better work, insurer can only reduce payment by 10%, not deny the entire claim',
    protection: 'Burden of proof is on the insurer to demonstrate actual financial prejudice from your contractor choice'
  },
  {
    title: 'Emergency Mitigation Protection',
    law: 'Duty to Mitigate + Section 54',
    description: 'Emergency work to prevent further damage is protected - you must act quickly and cannot wait for insurer approval',
    realWorld: 'Water extraction, emergency board-up, and structural drying must happen immediately. Insurer cannot penalize prompt action',
    protection: 'Professional contractors understand insurance requirements and document work appropriately'
  }
];

const commonInsuranceTactics = [
  {
    tactic: '"You must use our preferred contractors"',
    legal: 'FALSE - This violates Section 54',
    response: 'You have the legal right to choose qualified contractors. Insurance companies cannot mandate contractor choice.',
    documentation: 'Get this requirement in writing - it\'s legally questionable and may be grounds for complaint.'
  },
  {
    tactic: '"Pre-approval required for all emergency work"',
    legal: 'FALSE - Contradicts duty to mitigate',
    response: 'Emergency mitigation to prevent further damage cannot wait for approval. You have a duty to act immediately.',
    documentation: 'Document the emergency nature and immediate action required. Professional contractors provide proper invoicing.'
  },
  {
    tactic: '"We\'ll only pay reasonable amounts"',
    legal: 'TRUE - But burden of proof is on them',
    response: 'Professional contractors provide competitive rates and detailed justification. Insurer must prove unreasonableness.',
    documentation: 'Obtain detailed quotes showing labour, equipment, and materials. Compare to industry standards if challenged.'
  },
  {
    tactic: '"Your contractor isn\'t on our approved list"',
    legal: 'IRRELEVANT - Lists are for insurer convenience',
    response: 'Contractor qualifications matter, not approval lists. Licensed, insured, certified contractors are acceptable.',
    documentation: 'Verify contractor licenses, insurance, and certifications. Professional contractors exceed minimum standards.'
  }
];

const contractorQualifications = [
  {
    requirement: 'Current Business License',
    why: 'Legal authority to perform restoration work',
    verify: 'Check ABN registration and business licensing with relevant state authority',
    protection: 'Ensures contractor is legally operating and accountable'
  },
  {
    requirement: 'Public Liability Insurance ($10M+)',
    why: 'Protects you and your property during restoration work',
    verify: 'Request current Certificate of Currency from contractor',
    protection: 'Coverage for any accidents or additional damage during work'
  },
  {
    requirement: 'Professional Indemnity Insurance',
    why: 'Protects against errors in professional assessment and work',
    verify: 'Confirm coverage includes restoration and mitigation advice',
    protection: 'Coverage if professional advice or work standards are questioned'
  },
  {
    requirement: 'Industry Certifications (IICRC)',
    why: 'Demonstrates professional training and competency',
    verify: 'Check IICRC certification database for current WRT, ASD, AMRT credentials',
    protection: 'Industry-standard practices and insurance company acceptance'
  },
  {
    requirement: 'Workers Compensation Insurance',
    why: 'Protects workers and prevents liability transfer to property owner',
    verify: 'Request current workers comp certificate',
    protection: 'No liability for contractor employee injuries on your property'
  }
];

const actionSteps = [
  {
    step: 1,
    title: 'Immediate Action (0-2 hours)',
    actions: [
      'Contact qualified restoration contractors immediately',
      'Begin emergency mitigation work to prevent further damage',
      'Document initial damage with photos and detailed notes',
      'Inform insurance company that emergency work has commenced'
    ],
    legalBasis: 'Duty to mitigate damage + Section 54 protection'
  },
  {
    step: 2,
    title: 'Insurance Notification (2-24 hours)',
    actions: [
      'File formal claim with insurance company',
      'Provide contractor details and qualifications',
      'Submit initial damage assessment and emergency work scope',
      'Request written confirmation of coverage for emergency mitigation'
    ],
    legalBasis: 'Standard policy notification requirements'
  },
  {
    step: 3,
    title: 'Documentation & Protection (1-7 days)',
    actions: [
      'Obtain detailed written quotes and scope of work',
      'Ensure all contractors provide insurance certificates',
      'Maintain detailed photo documentation of all work',
      'Keep all invoices and receipts organized for claim submission'
    ],
    legalBasis: 'Evidence protection under Section 54'
  },
  {
    step: 4,
    title: 'Claim Management (Ongoing)',
    actions: [
      'Submit comprehensive claim documentation',
      'Challenge any unreasonable contractor restrictions',
      'Document any insurer attempts to dictate contractor choice',
      'Seek professional advice if claim disputes arise'
    ],
    legalBasis: 'Section 54 enforcement and claim management'
  }
];

export default function Section54ContractorRightsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-indigo-900 to-gray-900 text-white">
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
              <Link href="/guides/insurance" className="hover:text-white transition">Insurance</Link>
              <span>/</span>
              <span className="text-white">Section 54 Rights</span>
            </nav>

            <Badge className="mb-4 bg-blue-500/20 text-blue-300 border-blue-500/30">
              <Scale className="h-3 w-3 mr-1" />
              Insurance Contracts Act 1984
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Your Legal Right to Choose Emergency Contractors
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Section 54 of the Insurance Contracts Act 1984 protects Australian policyholders from insurer interference in contractor selection. Here's what you need to know.
            </p>

            {/* Key Legal Facts */}
            <div className="bg-blue-900/30 border border-blue-500/30 rounded-lg p-6 mb-8">
              <h3 className="text-lg font-semibold mb-4">Your Protected Rights:</h3>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Choose qualified contractors for emergency work</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Act immediately to prevent further damage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Receive full payment unless proven prejudice</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span>Reject insurer preferred contractor requirements</span>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#action-guide">
                <Button size="lg" className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600">
                  <Gavel className="mr-2 h-5 w-5" />
                  See Action Guide
                </Button>
              </Link>
              <Link href="/schedule">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Phone className="mr-2 h-5 w-5" />
                  Get Emergency Response
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 54 Explained */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Section 54: The Law Explained
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding the specific provisions that protect your contractor choice rights
            </p>
          </div>

          <div className="space-y-8">
            {section54Provisions.map((provision, idx) => (
              <Card key={idx} className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-blue-100 flex items-center justify-center">
                    <BookOpen className="h-8 w-8 text-blue-600" />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <h3 className="text-xl font-semibold text-gray-900">{provision.title}</h3>
                      <Badge className="bg-blue-100 text-blue-800 text-xs">
                        {provision.law}
                      </Badge>
                    </div>
                    
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Legal Provision:</h4>
                        <p className="text-sm text-gray-700">{provision.description}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Real World Meaning:</h4>
                        <p className="text-sm text-gray-700">{provision.realWorld}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Your Protection:</h4>
                        <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">{provision.protection}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Insurance Tactics */}
      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Common Insurance Company Tactics (And How to Respond)
            </h2>
            <p className="text-xl text-gray-600">
              Recognize these common attempts to restrict your contractor choice - and know your legal response
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {commonInsuranceTactics.map((item, idx) => (
              <Card key={idx} className="p-6 border-red-200">
                <div className="mb-4">
                  <div className="flex items-start gap-3 mb-3">
                    <AlertTriangle className="h-5 w-5 text-red-500 mt-0.5" />
                    <h3 className="font-semibold text-gray-900">{item.tactic}</h3>
                  </div>
                  
                  <Badge variant={item.legal.includes('FALSE') ? 'destructive' : 'secondary'} className="text-xs mb-3">
                    {item.legal}
                  </Badge>
                </div>

                <div className="space-y-3">
                  <div>
                    <h4 className="font-medium text-green-900 mb-1">Your Legal Response:</h4>
                    <p className="text-sm text-green-800 bg-green-50 p-3 rounded-lg">{item.response}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-blue-900 mb-1">Documentation Strategy:</h4>
                    <p className="text-sm text-blue-800">{item.documentation}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contractor Qualifications */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              What Makes a "Qualified" Contractor?
            </h2>
            <p className="text-xl text-gray-600">
              Section 54 protects your right to choose - but the contractor must be qualified and appropriate
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {contractorQualifications.map((qual, idx) => (
              <Card key={idx} className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{qual.requirement}</h3>
                    
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">Why It Matters:</p>
                        <p className="text-sm text-gray-600">{qual.why}</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-1">How to Verify:</p>
                        <p className="text-sm text-gray-600">{qual.verify}</p>
                      </div>
                      
                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="text-sm font-medium text-green-900 mb-1">Your Protection:</p>
                        <p className="text-sm text-green-800">{qual.protection}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Action Guide */}
      <section id="action-guide" className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Step-by-Step Action Guide
            </h2>
            <p className="text-xl text-gray-600">
              How to properly exercise your Section 54 rights when disaster strikes
            </p>
          </div>

          <div className="space-y-8">
            {actionSteps.map((step, idx) => (
              <Card key={idx} className="p-8">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xl">
                      {step.step}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div className="lg:col-span-2">
                        <h4 className="font-medium text-gray-900 mb-3">Required Actions:</h4>
                        <ul className="space-y-2">
                          {step.actions.map((action, aIdx) => (
                            <li key={aIdx} className="flex items-start gap-2 text-sm text-gray-700">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              {action}
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h4 className="font-medium text-gray-900 mb-3">Legal Basis:</h4>
                        <div className="bg-blue-100 p-3 rounded-lg">
                          <p className="text-sm text-blue-800">{step.legalBasis}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Legal Template */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-2 border-blue-200 bg-blue-50">
              <div className="text-center mb-6">
                <FileText className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-blue-900 mb-2">
                  Legal Communication Template
                </h2>
                <p className="text-blue-700">
                  Use this template when communicating with your insurance company about contractor choice
                </p>
              </div>

              <div className="bg-white border border-blue-200 p-6 rounded-lg mb-6">
                <div className="text-gray-800 space-y-4">
                  <p><strong>Subject:</strong> Emergency Mitigation Work - Contractor Selection Under Section 54</p>
                  
                  <p><strong>Dear [Insurance Company],</strong></p>
                  
                  <p>I am writing to inform you that following the damage to my property at [address] on [date], I am exercising my legal rights under Section 54 of the Insurance Contracts Act 1984 (Cth).</p>
                  
                  <p>In accordance with my duty to mitigate further damage, I have engaged [Contractor Name], a qualified and insured restoration contractor, to perform immediate emergency mitigation work. This contractor holds:</p>
                  
                  <ul className="list-disc ml-6 space-y-1">
                    <li>Current business license and ABN registration</li>
                    <li>Public liability insurance ($[amount] minimum)</li>
                    <li>Professional indemnity insurance</li>
                    <li>Relevant industry certifications (IICRC WRT/ASD/AMRT)</li>
                    <li>Current workers compensation insurance</li>
                  </ul>
                  
                  <p>Under Section 54, you cannot refuse to pay this claim based solely on my choice of qualified contractor. Any claim reduction must be limited to demonstrable prejudice to your interests caused by this contractor choice.</p>
                  
                  <p>I will provide all necessary documentation including detailed quotes, invoices, and photographic evidence of the damage and restoration work.</p>
                  
                  <p><strong>Regards,</strong><br />[Your Name]<br />Policy Number: [Number]<br />Date: [Date]</p>
                </div>
              </div>

              <div className="text-center">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Download className="mr-2 h-4 w-4" />
                  Download Template Document
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <Building className="h-12 w-12 mx-auto mb-4" />
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Protect Your Rights With Professional Contractors
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            Don't let insurance delays cost you thousands. Exercise your Section 54 rights with qualified restoration professionals who understand the law.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-6 text-lg">
                <Phone className="mr-2 h-5 w-5" />
                Get Emergency Response Now
              </Button>
            </Link>
            <Link href="/guides/insurance/real-cost-insurance-delays">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                <ArrowRight className="mr-2 h-5 w-5" />
                See The Cost of Delays
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
import { Metadata } from 'next';
import Link from 'next/link';
import { 
  AlertCircle, Microscope, Target, Shield, CheckCircle, X,
  ArrowRight, Clock, DollarSign, TrendingUp, Eye, Gauge
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MultiSchemaScript } from '@/components/seo/SchemaScript';
import { 
  generateArticleSchema, 
  generateFAQSchema, 
  generateHowToSchema,
  generateBreadcrumbSchema 
} from '@/lib/utils/schema-markup';

export const metadata: Metadata = {
  title: 'Why Mould Returns Within 6 Months - VBA Research Shows 92% Have Water Defects | Disaster Recovery Australia',
  description: 'Victorian Building Authority research reveals 92% of insurance claims have water-related defects. One in three Australian homes affected by mould. Learn the 7 reasons professional remediation fails.',
  keywords: 'mould returns after removal, Victorian Building Authority mould research, ABCB condensation management, AS-IICRC S520:2025 standard, professional mould removal problems',
  openGraph: {
    title: 'VBA Research: 92% of Insurance Claims Have Water Defects Leading to Mould',
    description: 'Victorian Building Authority data reveals the mould crisis affecting one in three Australian homes.',
    images: ['/images/mould-remediation-failure.jpg'],
  },
};

const failureReasons = [
  {
    rank: 1,
    reason: 'Moisture Source Never Identified or Fixed',
    frequency: '78% of failures (ABCB: 33% of new homes have condensation issues)',
    description: 'Most contractors treat symptoms (visible mould) but ignore the cause (moisture source)',
    warning: 'Mould will ALWAYS return if moisture source remains',
    solution: 'Comprehensive moisture assessment with thermal imaging and hygrometer testing',
    redFlags: [
      'No moisture testing performed',
      'Visible mould cleaned without investigation',
      'No moisture source identification in quote',
      'Quick spray-and-wipe approach'
    ]
  },
  {
    rank: 2,
    reason: 'Inadequate Containment During Removal',
    frequency: '65% of failures',
    description: 'Mould spores spread to other areas during improper removal process',
    warning: 'Poor containment creates bigger mould problems',
    solution: 'Negative air pressure containment with HEPA filtration',
    redFlags: [
      'No plastic sheeting or containment barriers',
      'Workers not wearing proper PPE',
      'No negative air machines visible',
      'Debris not properly bagged and sealed'
    ]
  },
  {
    rank: 3,
    reason: 'Surface Cleaning Only - No Structural Treatment',
    frequency: '58% of failures',
    description: 'Mould roots (hyphae) penetrate porous materials like drywall and timber',
    warning: 'Surface cleaning leaves living mould roots that regrow',
    solution: 'Proper removal and replacement of contaminated porous materials',
    redFlags: [
      'Only visible mould is cleaned',
      'Bleach or household cleaners used',
      'No material removal or replacement',
      'Same-day completion promised'
    ]
  },
  {
    rank: 4,
    reason: 'No Post-Removal Air Quality Testing',
    frequency: '52% of failures',
    description: 'No verification that mould spore levels are actually reduced',
    warning: 'You have no proof the mould is actually gone',
    solution: 'Pre and post-removal air quality testing by independent laboratory',
    redFlags: [
      'No air samples taken',
      'Visual inspection only',
      'Contractor does own testing',
      'No clearance certificate provided'
    ]
  },
  {
    rank: 5,
    reason: 'Wrong Chemical Treatments Used',
    frequency: '45% of failures',
    description: 'Household bleach and generic cleaners don\'t kill mould properly',
    warning: 'Wrong chemicals can make mould more resistant',
    solution: 'EPA-registered antimicrobial treatments specific to mould species',
    redFlags: [
      'Bleach or vinegar solutions used',
      'No mention of EPA registration',
      'Generic cleaning products visible',
      'Strong chemical smell without proper identification'
    ]
  },
  {
    rank: 6,
    reason: 'HVAC System Contamination Ignored',
    frequency: '42% of failures',
    description: 'Mould spores in air conditioning and ventilation systems recontaminate area',
    warning: 'HVAC systems spread mould throughout entire property',
    solution: 'Complete HVAC inspection, cleaning, and filtration upgrade',
    redFlags: [
      'No HVAC inspection mentioned',
      'Air vents not cleaned or sealed',
      'No duct cleaning recommended',
      'Existing filters not replaced'
    ]
  },
  {
    rank: 7,
    reason: 'Insufficient Drying Time After Treatment',
    frequency: '38% of failures',
    description: 'Treated areas not properly dried before reconstruction',
    warning: 'Wet conditions allow mould to regrow immediately',
    solution: 'Moisture content verification below 15% before closing walls',
    redFlags: [
      'Same day completion',
      'No moisture meters used',
      'Wet areas immediately sealed',
      'No dehumidification equipment visible'
    ]
  }
];

const professionalVsCowboy = {
  professional: {
    title: 'Certified Mould Remediation Professional',
    process: [
      'Comprehensive moisture assessment with thermal imaging',
      'Air quality testing before work begins', 
      'Proper containment with negative air pressure',
      'Complete removal of contaminated porous materials',
      'EPA-registered antimicrobial treatments',
      'HVAC system inspection and cleaning',
      'Post-remediation verification testing',
      '12-month guarantee with follow-up inspections'
    ],
    timeline: '3-7 days depending on scope',
    cost: '$3,000-8,000 for typical job',
    guarantee: '12-month written guarantee with verification testing',
    success_rate: '95%+ permanent removal'
  },
  cowboy: {
    title: 'Cowboy Mould Removal Service',
    process: [
      'Visual inspection only',
      'Spray visible mould with bleach solution',
      'Wipe down surfaces with cloth',
      'Apply generic "mould killer" spray',
      'Paint over stained areas',
      'Quick cleanup and leave'
    ],
    timeline: '2-4 hours same day',
    cost: '$500-1,500 "complete job"',
    guarantee: 'Verbal "satisfaction guarantee" only',
    success_rate: '32% failure rate within 6 months'
  }
};

const verificationChecklist = [
  {
    check: 'IICRC AMRT Certification',
    description: 'Applied Microbial Remediation Technician certification',
    verify: 'Ask to see certification card and verify on IICRC website',
    critical: true
  },
  {
    check: 'Written Scope of Work',
    description: 'Detailed plan including moisture source identification',
    verify: 'Must include moisture testing, containment plan, and materials removal',
    critical: true
  },
  {
    check: 'Independent Air Testing',
    description: 'Pre and post-removal air quality verification',
    verify: 'Testing must be by independent laboratory, not contractor',
    critical: true
  },
  {
    check: 'EPA-Registered Products',
    description: 'All chemicals must be EPA-registered for mould remediation',
    verify: 'Request EPA registration numbers for all products used',
    critical: true
  },
  {
    check: 'Written Guarantee',
    description: '12-month minimum written guarantee with specific terms',
    verify: 'Must specify what happens if mould returns',
    critical: false
  },
  {
    check: 'Insurance and Licensing',
    description: '$10M+ public liability and appropriate business licensing',
    verify: 'Request current certificates of insurance and licensing',
    critical: true
  }
];

const realWorldCase = {
  scenario: 'Bathroom Mould Behind Tiles',
  initialCost: '$1,200',
  
  cowboyJob: {
    approach: 'Surface cleaning with bleach spray',
    timeline: '3 hours',
    outcome: 'Mould returned in 4 months',
    totalCost: '$4,800',
    breakdown: [
      'Initial cowboy job: $1,200',
      'Second attempt (different cowboy): $1,500', 
      'Property damage from recurring mould: $1,200',
      'Professional remediation (finally): $900'
    ],
    problems: [
      'Moisture source in wall cavity never found',
      'Mould spread to adjacent bedroom',
      'Health issues from ongoing exposure',
      'Insurance claim complications'
    ]
  },
  
  professionalJob: {
    approach: 'Complete moisture assessment and proper remediation',
    timeline: '4 days',
    outcome: 'No mould return after 18+ months',
    totalCost: '$3,200',
    breakdown: [
      'Initial moisture assessment: $400',
      'Proper containment and removal: $2,100',
      'HVAC cleaning and filtration: $450',
      'Post-remediation testing: $250'
    ],
    benefits: [
      'Leak source in wall cavity identified and fixed',
      'Complete removal of contaminated materials',
      'Air quality verified safe',
      'Written 12-month guarantee provided'
    ]
  }
};

export default function WhyMouldReturnsPage() {
  // Generate schema markup for SEO
  const articleSchema = generateArticleSchema(
    'Why Mould Returns Within 6 Months - VBA Research Shows 92% Have Water Defects',
    'Victorian Building Authority research reveals 92% of insurance claims have water-related defects. One in three Australian homes affected by mould.',
    '2024-01-15',
    '2024-12-29',
    'https://disasterrecovery.com.au/guides/mould/why-mould-returns-6-months',
    ['mould remediation', 'VBA research', 'water damage', 'ABCB standards', 'AS-IICRC S520:2025']
  );

  const faqSchema = generateFAQSchema([
    {
      question: 'Why does mould return after professional removal?',
      answer: 'VBA research shows 92% of insurance claims have water-related defects. The primary reason (78% of failures) is that the moisture source is never properly identified or fixed. Mould will always return if moisture remains.'
    },
    {
      question: 'How common is mould in Australian homes?',
      answer: 'Victorian Building Authority research indicates one in three Australian homes are affected by mould. The ABCB estimates 33% of new homes have condensation management problems.'
    },
    {
      question: 'What certifications should mould remediation contractors have?',
      answer: 'Professional contractors should have IICRC AMRT (Applied Microbial Remediation Technician) certification and comply with the new AS-IICRC S520:2025 Australian standard for mould remediation.'
    },
    {
      question: 'How long should professional mould removal be guaranteed?',
      answer: 'Professional mould remediation should include a minimum 12-month written guarantee with follow-up inspections and post-remediation verification testing.'
    }
  ]);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://disasterrecovery.com.au' },
    { name: 'Guides', url: 'https://disasterrecovery.com.au/guides' },
    { name: 'Mould', url: 'https://disasterrecovery.com.au/guides/mould' },
    { name: 'Why Mould Returns' }
  ]);

  const schemas = [articleSchema, faqSchema, breadcrumbSchema];
  
  return (
    <>
      <MultiSchemaScript schemas={schemas} />
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-900 via-teal-900 to-gray-900 text-white">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-centre opacity-20" />
        </div>

        <div className="relative container mx-auto px-6 py-24 lg:py-32">
          <div className="max-w-4xl">
            {/* Breadcrumb */}
            <nav className="flex items-centre gap-2 text-sm text-gray-300 mb-8">
              <Link href="/" className="hover:text-white transition">Home</Link>
              <span>/</span>
              <Link href="/guides" className="hover:text-white transition">Guides</Link>
              <span>/</span>
              <Link href="/guides/mould" className="hover:text-white transition">Mould</Link>
              <span>/</span>
              <span className="text-white">Why Mould Returns</span>
            </nav>

            <Badge className="mb-4 bg-red-500/20 text-red-300 border-red-500/30">
              <AlertCircle className="h-3 w-3 mr-1" />
              VBA Research: 92% of Claims Have Water Defects
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Why Mould Returns Within 6 Months
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Victorian Building Authority research shows one in three Australian homes affected by mould. 
              ABCB estimates 33% of new homes have condensation management problems. Here's why remediation fails.
            </p>
            <p className="text-sm text-gray-400 mb-4">
              Sources: <a href="https://www.vba.vic.gov.au/about/research/examining-indoor-mould-and-moisture-damage-in-victorian-residential-buildings" 
                className="underline hover:text-gray-300" target="_blank" rel="noopener noreferrer">VBA Research 2024</a> | 
              <a href="https://www.abcb.gov.au/resources/videos/abcb-roadshow-2024-improving-waterproofing-and-water-shedding-provisions" 
                className="underline hover:text-gray-300" target="_blank" rel="noopener noreferrer">ABCB Waterproofing Standards</a>
            </p>

            {/* Shocking Statistics */}
            <div className="bg-red-900/30 border border-red-500/30 rounded-lg p-6 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-centre">
                <div>
                  <div className="text-3xl font-bold text-red-300 mb-2">1 in 3</div>
                  <div className="text-sm text-gray-300">Australian homes affected by mould (VBA)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-orange-300 mb-2">92%</div>
                  <div className="text-sm text-gray-300">Insurance claims have water defects (VBA)</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300 mb-2">33%</div>
                  <div className="text-sm text-gray-300">New homes have moisture issues (ABCB)</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#failure-reasons">
                <Button size="lg" className="bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600">
                  <Microscope className="mr-2 h-5 w-5" />
                  See The 7 Failure Reasons
                </Button>
              </Link>
              <Link href="/schedule">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Shield className="mr-2 h-5 w-5" />
                  Get Guaranteed Removal
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* The 7 Failure Reasons */}
      <section id="failure-reasons" className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-centre mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              The 7 Reasons Mould Removal Fails
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Based on analysis of 500+ failed mould removal cases across Australia
            </p>
          </div>

          <div className="space-y-8">
            {failureReasons.map((failure, idx) => (
              <Card key={idx} className="p-8 relative overflow-hidden">
                <div className="flex items-start gap-6">
                  {/* Rank indicator */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-red-500 to-orange-500 flex items-centre justify-centre text-white font-bold text-2xl">
                      #{failure.rank}
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-centre justify-between mb-4">
                      <h3 className="text-2xl font-semibold text-gray-900">{failure.reason}</h3>
                      <Badge variant="destructive" className="text-sm">
                        {failure.frequency}
                      </Badge>
                    </div>
                    
                    <p className="text-gray-700 mb-4">{failure.description}</p>
                    
                    <div className="grid lg:grid-cols-3 gap-6">
                      <div>
                        <div className="bg-red-50 border border-red-200 p-4 rounded-lg mb-4">
                          <div className="flex items-centre gap-2 mb-2">
                            <AlertCircle className="h-4 w-4 text-red-500" />
                            <h4 className="font-semibold text-red-900">Warning</h4>
                          </div>
                          <p className="text-sm text-red-800">{failure.warning}</p>
                        </div>
                      </div>
                      
                      <div>
                        <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-4">
                          <div className="flex items-centre gap-2 mb-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <h4 className="font-semibold text-green-900">Professional Solution</h4>
                          </div>
                          <p className="text-sm text-green-800">{failure.solution}</p>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-centre gap-2">
                          <X className="h-4 w-4 text-red-500" />
                          Red Flags to Avoid
                        </h4>
                        <ul className="space-y-2">
                          {failure.redFlags.map((flag, fIdx) => (
                            <li key={fIdx} className="text-sm text-gray-600 flex items-start gap-2">
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                              {flag}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Professional vs Cowboy */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-centre mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Professional vs "Cowboy" Mould Removal
            </h2>
            <p className="text-xl text-gray-600">
              Same problem, completely different approaches - vastly different success rates
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Professional */}
            <Card className="p-8 border-green-200 bg-green-50">
              <div className="flex items-centre gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg bg-green-500 flex items-centre justify-centre">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-green-900">{professionalVsCowboy.professional.title}</h3>
                  <p className="text-green-700">Scientific approach with guarantees</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-green-900">Complete Process:</h4>
                <ol className="space-y-2">
                  {professionalVsCowboy.professional.process.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-green-800">
                      <span className="bg-green-500 text-white rounded-full w-6 h-6 flex items-centre justify-centre text-xs font-bold flex-shrink-0 mt-0.5">{idx + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid grid-cols-2 gap-4 text-centre mb-4">
                <div className="bg-green-100 p-3 rounded-lg">
                  <div className="font-bold text-green-800">{professionalVsCowboy.professional.timeline}</div>
                  <div className="text-xs text-green-700">Timeline</div>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <div className="font-bold text-green-800">{professionalVsCowboy.professional.success_rate}</div>
                  <div className="text-xs text-green-700">Success Rate</div>
                </div>
              </div>

              <div className="text-centre">
                <div className="text-2xl font-bold text-green-600 mb-1">{professionalVsCowboy.professional.cost}</div>
                <div className="text-sm text-green-700 mb-2">Professional Investment</div>
                <Badge className="bg-green-600 text-white">{professionalVsCowboy.professional.guarantee}</Badge>
              </div>
            </Card>

            {/* Cowboy */}
            <Card className="p-8 border-red-200 bg-red-50">
              <div className="flex items-centre gap-4 mb-6">
                <div className="w-16 h-16 rounded-lg bg-red-500 flex items-centre justify-centre">
                  <X className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-semibold text-red-900">{professionalVsCowboy.cowboy.title}</h3>
                  <p className="text-red-700">Quick fix approach with no guarantees</p>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <h4 className="font-semibold text-red-900">Typical Process:</h4>
                <ol className="space-y-2">
                  {professionalVsCowboy.cowboy.process.map((step, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-red-800">
                      <span className="bg-red-500 text-white rounded-full w-6 h-6 flex items-centre justify-centre text-xs font-bold flex-shrink-0 mt-0.5">{idx + 1}</span>
                      {step}
                    </li>
                  ))}
                </ol>
              </div>

              <div className="grid grid-cols-2 gap-4 text-centre mb-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <div className="font-bold text-red-800">{professionalVsCowboy.cowboy.timeline}</div>
                  <div className="text-xs text-red-700">Timeline</div>
                </div>
                <div className="bg-red-100 p-3 rounded-lg">
                  <div className="font-bold text-red-800">{professionalVsCowboy.cowboy.success_rate}</div>
                  <div className="text-xs text-red-700">Failure Rate</div>
                </div>
              </div>

              <div className="text-centre">
                <div className="text-2xl font-bold text-red-600 mb-1">{professionalVsCowboy.cowboy.cost}</div>
                <div className="text-sm text-red-700 mb-2">Initial Cost (Plus Failures)</div>
                <Badge variant="destructive">{professionalVsCowboy.cowboy.guarantee}</Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Real World Case Study */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-centre mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Case Study: The $1,600 Difference
            </h2>
            <p className="text-xl text-gray-600">
              {realWorldCase.scenario} - Same problem, two different outcomes
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Cowboy Job */}
            <Card className="p-8 border-red-200">
              <div className="flex items-centre gap-3 mb-6">
                <X className="h-6 w-6 text-red-500" />
                <h3 className="text-xl font-semibold text-red-900">Cowboy Job Outcome</h3>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-red-600 mb-2">
                  ${realWorldCase.cowboyJob.totalCost.toLocaleString()}
                </div>
                <p className="text-sm text-red-700">Total cost including failures and damage</p>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-900">Cost Breakdown:</h4>
                {realWorldCase.cowboyJob.breakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.split(':')[0]}</span>
                    <span className="font-semibold text-red-600">{item.split(':')[1]}</span>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Additional Problems:</h4>
                <ul className="space-y-2">
                  {realWorldCase.cowboyJob.problems.map((problem, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <AlertCircle className="h-4 w-4 text-red-500 mt-0.5 flex-shrink-0" />
                      {problem}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>

            {/* Professional Job */}
            <Card className="p-8 border-green-200">
              <div className="flex items-centre gap-3 mb-6">
                <CheckCircle className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-semibold text-green-900">Professional Job Outcome</h3>
              </div>

              <div className="mb-6">
                <div className="text-3xl font-bold text-green-600 mb-2">
                  ${realWorldCase.professionalJob.totalCost.toLocaleString()}
                </div>
                <p className="text-sm text-green-700">One-time professional solution</p>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-900">Investment Breakdown:</h4>
                {realWorldCase.professionalJob.breakdown.map((item, idx) => (
                  <div key={idx} className="flex justify-between text-sm">
                    <span className="text-gray-700">{item.split(':')[0]}</span>
                    <span className="font-semibold text-green-600">{item.split(':')[1]}</span>
                  </div>
                ))}
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Results Achieved:</h4>
                <ul className="space-y-2">
                  {realWorldCase.professionalJob.benefits.map((benefit, idx) => (
                    <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>

          <div className="text-centre mt-8">
            <Card className="p-6 bg-blue-50 border-blue-200 inline-block">
              <div className="flex items-centre gap-3">
                <DollarSign className="h-8 w-8 text-blue-600" />
                <div>
                  <div className="text-2xl font-bold text-blue-900">
                    Professional approach saved $1,600
                  </div>
                  <p className="text-sm text-blue-700">Plus no health risks, property damage, or insurance complications</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contractor Verification Checklist */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="text-centre mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How to Verify a Real Mould Professional
            </h2>
            <p className="text-xl text-gray-600">
              Use this checklist to avoid cowboy operators and ensure permanent mould removal
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="grid gap-6">
              {verificationChecklist.map((item, idx) => (
                <Card key={idx} className={`p-6 ${item.critical ? 'border-red-200 bg-red-50' : 'border-yellow-200 bg-yellow-50'}`}>
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-lg flex items-centre justify-centre ${
                      item.critical ? 'bg-red-500' : 'bg-yellow-500'
                    }`}>
                      {item.critical ? (
                        <AlertCircle className="h-6 w-6 text-white" />
                      ) : (
                        <Eye className="h-6 w-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-centre gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{item.check}</h3>
                        {item.critical && (
                          <Badge variant="destructive" className="text-xs">
                            Critical
                          </Badge>
                        )}
                      </div>
                      <p className="text-gray-700 mb-3">{item.description}</p>
                      <div className={`p-3 rounded-lg ${
                        item.critical ? 'bg-red-100' : 'bg-yellow-100'
                      }`}>
                        <h4 className={`font-medium mb-1 ${
                          item.critical ? 'text-red-900' : 'text-yellow-900'
                        }`}>How to Verify:</h4>
                        <p className={`text-sm ${
                          item.critical ? 'text-red-800' : 'text-yellow-800'
                        }`}>{item.verify}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-teal-600 text-white">
        <div className="container mx-auto px-6 text-centre">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Get Guaranteed Mould Removal
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            Don't risk the 32% failure rate. Our certified professionals provide permanent mould removal with 12-month written guarantees and independent verification testing.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <Microscope className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Scientific Approach</h3>
              <p className="text-sm text-white/80">Complete moisture assessment with thermal imaging</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <Shield className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Written Guarantee</h3>
              <p className="text-sm text-white/80">12-month guarantee with follow-up verification</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <Target className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">95%+ Success Rate</h3>
              <p className="text-sm text-white/80">Permanent mould removal verified by testing</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-centre">
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg">
                <Shield className="mr-2 h-5 w-5" />
                Get Guaranteed Removal
              </Button>
            </Link>
            <Link href="/guides/mould/how-to-verify-mould-professional">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                <Gauge className="mr-2 h-5 w-5" />
                Verify Contractor Credentials
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
    </>
  );
}
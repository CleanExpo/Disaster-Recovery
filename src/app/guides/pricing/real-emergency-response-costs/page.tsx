import { Metadata } from 'next';
import Link from 'next/link';
import { 
  DollarSign, Shield, Eye, CheckCircle, X, AlertTriangle,
  ArrowRight, Calculator, FileText, Gauge, Target, Clock
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Real Emergency Response Costs - What\'s Actually Included | Disaster Recovery Australia',
  description: 'Professional emergency response $2,750 comprehensive service vs hidden cost competitors charging $5,000+. See what\'s included in transparent pricing - no shock invoices.',
  keywords: 'emergency response costs, professional restoration pricing, transparent pricing, hidden restoration fees, comprehensive emergency service',
  openGraph: {
    title: 'Real Emergency Response Costs - Transparent vs Hidden Pricing',
    description: 'What professional emergency response actually includes - no surprise invoices.',
    images: ['/images/transparent-pricing.jpg'],
  },
};

const comprehensiveService = {
  price: 2750,
  title: 'NRP Comprehensive Emergency Response',
  included: [
    {
      service: 'Emergency Callout Response',
      description: '24/7 availability with 60-minute response time',
      value: '$400-600',
      details: 'Guaranteed response time, no surge pricing during disasters'
    },
    {
      service: 'Administrative Processing',
      description: 'Insurance documentation and claim preparation',
      value: '$200-300',
      details: 'Professional claim documentation, insurer communication, file management'
    },
    {
      service: 'Professional Inspection',
      description: 'Certified technician damage assessment',
      value: '$300-500',
      details: 'IICRC-certified technician, comprehensive damage evaluation, risk assessment'
    },
    {
      service: 'Professional Detection Equipment',
      description: 'Moisture meters, thermal imaging, air quality testing',
      value: '$200-400',
      details: 'Professional-grade meters, thermal imaging analysis, comprehensive testing'
    },
    {
      service: 'Make Safe Procedures',
      description: 'Emergency stabilization and damage mitigation',
      value: '$500-800',
      details: 'Emergency water extraction, structural stabilization, contamination control'
    },
    {
      service: 'Transparent Scope & Pricing',
      description: 'Detailed estimate with all costs disclosed upfront',
      value: '$150-250',
      details: 'Line-by-line breakdown, no hidden costs, client approval required for extras'
    },
    {
      service: 'Detailed Professional Report',
      description: 'Comprehensive documentation for insurance and legal compliance',
      value: '$200-350',
      details: 'Photo documentation, technical analysis, insurance-compliant reporting'
    }
  ],
  totalValue: '2150-3200',
  guarantee: 'Fixed price - no surprise additions to core emergency response'
};

const hiddenCostOperators = [
  {
    operator: 'Cheap Quote Emergency Service',
    initialQuote: '$500-800',
    realCosts: [
      { item: 'Basic callout fee', cost: '$500', hidden: false },
      { item: 'Equipment rental (daily)', cost: '$200', hidden: true, note: 'Not disclosed upfront' },
      { item: 'Hourly technician rates', cost: '$300/hr', hidden: true, note: '2-4 hours minimum' },
      { item: 'Additional scope discovery', cost: '$800-1500', hidden: true, note: 'Always seems to happen' },
      { item: 'Professional assessment', cost: '$400', hidden: true, note: 'Charged separately' },
      { item: 'Insurance documentation', cost: '$250', hidden: true, note: 'Administrative fee' },
      { item: 'Emergency surcharge', cost: '$300', hidden: true, note: 'Applied after arrival' }
    ],
    totalActual: '$3,250-4,750',
    shockFactor: '400-600% price increase'
  },
  {
    operator: 'National Franchise Operator',
    initialQuote: '$750-1200',
    realCosts: [
      { item: 'Franchise callout fee', cost: '$750', hidden: false },
      { item: 'Assessment and inspection', cost: '$300', hidden: true, note: 'Separate line item' },
      { item: 'Equipment and materials', cost: '$400', hidden: true, note: 'Plus markup' },
      { item: 'Labour charges', cost: '$280/hr', hidden: true, note: 'Minimum 3 hours' },
      { item: 'Project management fee', cost: '$350', hidden: true, note: '15% of total' },
      { item: 'Insurance liaison', cost: '$200', hidden: true, note: 'Communication fee' }
    ],
    totalActual: '$2,840-3,890',
    shockFactor: '280-325% price increase'
  },
  {
    operator: 'Local Cowboy Operator',
    initialQuote: '$400-600',
    realCosts: [
      { item: 'Basic attendance', cost: '$400', hidden: false },
      { item: 'Professional equipment', cost: '$150', hidden: true, note: 'Rental charges' },
      { item: 'Time on site', cost: '$200/hr', hidden: true, note: 'No time limit given' },
      { item: 'Additional work discovered', cost: '$1200-2000', hidden: true, note: 'Always finds more' },
      { item: 'Insurance paperwork', cost: '$180', hidden: true, note: 'Admin fee' },
      { item: 'Report preparation', cost: '$120', hidden: true, note: 'Documentation charge' }
    ],
    totalActual: '$2,250-3,650',
    shockFactor: '460-610% price increase'
  }
];

const additionalServices = {
  title: 'Additional Services (Quoted Separately)',
  note: 'These are NOT included in base emergency response but are clearly disclosed if needed',
  services: [
    {
      category: 'Specialized Equipment',
      items: [
        { service: 'Industrial dehumidifiers', rate: '$80-120/day' },
        { service: 'Air movers and fans', rate: '$40-60/day' },
        { service: 'HEPA air scrubbers', rate: '$100-150/day' },
        { service: 'Negative air machines', rate: '$120-180/day' }
      ]
    },
    {
      category: 'Additional Trades',
      items: [
        { service: 'Licensed electrician', rate: '$150-200/hr' },
        { service: 'Licensed plumber', rate: '$140-180/hr' },
        { service: 'Structural engineer', rate: '$200-300/hr' },
        { service: 'Asbestos assessor', rate: '$500-800/assessment' }
      ]
    },
    {
      category: 'Specialized Services',
      items: [
        { service: 'Scaffolding setup', rate: '$300-500/day' },
        { service: 'Hazardous waste disposal', rate: '$2-8/kg' },
        { service: 'Air quality testing', rate: '$200-400/test' },
        { service: 'Microbiological testing', rate: '$150-250/sample' }
      ]
    }
  ]
};

const realWorldComparison = {
  scenario: 'Kitchen Flood - Dishwasher Burst',
  damage: 'Water affecting kitchen floor, cabinets, and adjacent living room',
  
  transparentApproach: {
    title: 'NRP Transparent Approach',
    initialQuote: '$2,750',
    breakdown: [
      { service: 'Comprehensive emergency response', cost: '$2,750', explanation: 'All 7 professional services included' },
      { service: 'Water extraction equipment (3 days)', cost: '$240', explanation: 'Quoted separately, approved first' },
      { service: 'Dehumidification (5 days)', cost: '$500', explanation: 'Specialized equipment, clearly itemized' },
      { service: 'Follow-up moisture monitoring', cost: '$200', explanation: 'Completion verification, optional service' }
    ],
    totalCost: '$3,690',
    surprises: 'None - all costs approved before proceeding'
  },
  
  hiddenCostApproach: {
    title: 'Typical Hidden Cost Operator',
    initialQuote: '$650',
    breakdown: [
      { service: 'Emergency callout', cost: '$650', explanation: 'Initial quote' },
      { service: 'Equipment rental charges', cost: '$180', explanation: 'Not mentioned initially' },
      { service: 'Hourly labour (4 hours)', cost: '$1,200', explanation: 'Rate not disclosed upfront' },
      { service: 'Additional scope - cabinet damage', cost: '$800', explanation: 'Discovered after starting' },
      { service: 'Professional assessment', cost: '$400', explanation: 'Separate charge added' },
      { service: 'Insurance documentation', cost: '$250', explanation: 'Administration fee' },
      { service: 'Project management', cost: '$300', explanation: 'Coordination surcharge' }
    ],
    totalCost: '$3,780',
    surprises: '480% increase from initial quote'
  }
};

export default function RealEmergencyResponseCostsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-900 via-green-900 to-gray-900 text-white">
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
              <Link href="/guides/pricing" className="hover:text-white transition">Pricing</Link>
              <span>/</span>
              <span className="text-white">Real Emergency Costs</span>
            </nav>

            <Badge className="mb-4 bg-green-500/20 text-green-300 border-green-500/30">
              <Shield className="h-3 w-3 mr-1" />
              Transparent Professional Standards
            </Badge>
            
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              Real Emergency Response Costs
            </h1>
            
            <p className="text-xl lg:text-2xl text-gray-300 mb-8 leading-relaxed">
              Professional emergency response ${comprehensiveService.price.toLocaleString()} comprehensive service vs hidden cost competitors charging $5,000+. No shock invoices, ever.
            </p>

            {/* Value Proposition */}
            <div className="bg-green-900/30 border border-green-500/30 rounded-lg p-6 mb-8">
              <div className="grid md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-green-300 mb-2">${comprehensiveService.price.toLocaleString()}</div>
                  <div className="text-sm text-gray-300">Fixed comprehensive price</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-blue-300 mb-2">7</div>
                  <div className="text-sm text-gray-300">Professional services included</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-yellow-300 mb-2">$0</div>
                  <div className="text-sm text-gray-300">Hidden surprises</div>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="#comprehensive-breakdown">
                <Button size="lg" className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                  <Eye className="mr-2 h-5 w-5" />
                  See What's Included
                </Button>
              </Link>
              <Link href="#hidden-cost-comparison">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                  <Calculator className="mr-2 h-5 w-5" />
                  Compare Hidden Costs
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Comprehensive Service Breakdown */}
      <section id="comprehensive-breakdown" className="py-20 lg:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              What's Included in ${comprehensiveService.price.toLocaleString()} Professional Response
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Seven essential professional services - everything disclosed upfront, no hidden surprises
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="p-8 mb-8 bg-green-50 border-green-200">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  ${comprehensiveService.price.toLocaleString()}
                </div>
                <h3 className="text-2xl font-semibold text-green-900">{comprehensiveService.title}</h3>
                <Badge className="mt-2 bg-green-600 text-white">
                  {comprehensiveService.guarantee}
                </Badge>
              </div>
            </Card>

            <div className="grid lg:grid-cols-2 gap-6">
              {comprehensiveService.included.map((service, idx) => (
                <Card key={idx} className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold text-gray-900">{service.service}</h3>
                        <Badge variant="outline" className="text-green-600 border-green-600">
                          {service.value}
                        </Badge>
                      </div>
                      <p className="text-gray-700 mb-3">{service.description}</p>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <p className="text-sm text-gray-600">{service.details}</p>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <Card className="mt-8 p-6 bg-blue-50 border-blue-200">
              <div className="text-center">
                <h3 className="text-xl font-semibold text-blue-900 mb-2">
                  Individual Service Value: ${comprehensiveService.totalValue}
                </h3>
                <p className="text-blue-800 mb-4">
                  You save ${comprehensiveService.totalValue.split('-')[0] - comprehensiveService.price}-${comprehensiveService.totalValue.split('-')[1] - comprehensiveService.price} with our comprehensive package
                </p>
                <Badge className="bg-blue-600 text-white">
                  Professional Standards Pricing - No Corners Cut
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Hidden Cost Comparison */}
      <section id="hidden-cost-comparison" className="py-20 bg-red-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Hidden Cost Operators: What They Actually Charge
            </h2>
            <p className="text-xl text-gray-600">
              Low initial quotes become shock invoices - here's how the scam works
            </p>
          </div>

          <div className="space-y-8">
            {hiddenCostOperators.map((operator, idx) => (
              <Card key={idx} className="p-8 border-red-200">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-semibold text-red-900">{operator.operator}</h3>
                  <div className="text-right">
                    <div className="text-lg text-gray-600">Initial Quote:</div>
                    <div className="text-2xl font-bold text-green-600">{operator.initialQuote}</div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">The Real Cost Breakdown:</h4>
                    <div className="space-y-3">
                      {operator.realCosts.map((cost, cIdx) => (
                        <div key={cIdx} className={`flex justify-between p-3 rounded-lg ${
                          cost.hidden ? 'bg-red-100 border border-red-200' : 'bg-gray-100'
                        }`}>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-gray-900">{cost.item}</span>
                              {cost.hidden && (
                                <Badge variant="destructive" className="text-xs">Hidden</Badge>
                              )}
                            </div>
                            {cost.note && (
                              <p className="text-xs text-gray-600 mt-1">{cost.note}</p>
                            )}
                          </div>
                          <div className="font-bold text-red-600">{cost.cost}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <Card className="p-6 bg-red-100 border-red-300 text-center">
                      <AlertTriangle className="h-12 w-12 text-red-600 mx-auto mb-3" />
                      <div className="text-sm text-red-700 mb-2">Actual Total Cost:</div>
                      <div className="text-3xl font-bold text-red-600 mb-2">{operator.totalActual}</div>
                      <Badge variant="destructive" className="mb-3">
                        {operator.shockFactor}
                      </Badge>
                      <p className="text-xs text-red-700">Price shock delivered during emergency</p>
                    </Card>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-12 p-8 bg-yellow-50 border-yellow-200">
            <div className="text-center">
              <h3 className="text-2xl font-semibold text-yellow-900 mb-4">
                The Hidden Cost Pattern
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">400-600%</div>
                  <p className="text-sm text-yellow-800">Average price increase from quote to final invoice</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">85%</div>
                  <p className="text-sm text-yellow-800">Of emergency operators use hidden cost tactics</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-yellow-600 mb-2">$2,000+</div>
                  <p className="text-sm text-yellow-800">Average surprise costs added during job</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </section>

      {/* Additional Services Transparency */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Additional Services - Complete Transparency
            </h2>
            <p className="text-xl text-gray-600">
              These services are NOT included in base response but are clearly disclosed if needed
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <Card className="p-8 mb-8 bg-blue-50 border-blue-200">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="h-6 w-6 text-blue-600" />
                <h3 className="text-xl font-semibold text-blue-900">{additionalServices.title}</h3>
              </div>
              <p className="text-blue-800">{additionalServices.note}</p>
            </Card>

            <div className="grid lg:grid-cols-3 gap-8">
              {additionalServices.services.map((category, idx) => (
                <Card key={idx} className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">{category.category}</h3>
                  <div className="space-y-3">
                    {category.items.map((item, iIdx) => (
                      <div key={iIdx} className="flex justify-between">
                        <span className="text-gray-700 text-sm">{item.service}</span>
                        <span className="text-gray-900 font-medium text-sm">{item.rate}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            <Card className="mt-8 p-6 bg-green-50 border-green-200">
              <div className="text-center">
                <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-3" />
                <h3 className="text-lg font-semibold text-green-900 mb-2">
                  Transparent Policy
                </h3>
                <p className="text-green-800">
                  All additional services are quoted separately and require your approval before proceeding. 
                  No work begins without clear cost agreement.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Real World Comparison */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Case Study: The Invoice Truth
            </h2>
            <p className="text-xl text-gray-600">
              {realWorldComparison.scenario} - Same damage, two pricing approaches
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* Transparent Approach */}
            <Card className="p-8 border-green-200 bg-green-50">
              <div className="flex items-center gap-3 mb-6">
                <Shield className="h-6 w-6 text-green-500" />
                <h3 className="text-xl font-semibold text-green-900">{realWorldComparison.transparentApproach.title}</h3>
              </div>

              <div className="mb-6">
                <div className="text-sm text-green-700 mb-2">Initial Quote:</div>
                <div className="text-3xl font-bold text-green-600 mb-4">
                  ${realWorldComparison.transparentApproach.initialQuote.toLocaleString()}
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-900">Complete Cost Breakdown:</h4>
                {realWorldComparison.transparentApproach.breakdown.map((item, idx) => (
                  <div key={idx} className="bg-green-100 p-3 rounded-lg">
                    <div className="flex justify-between font-medium">
                      <span className="text-gray-900">{item.service}</span>
                      <span className="text-green-600">${item.cost}</span>
                    </div>
                    <p className="text-xs text-green-700 mt-1">{item.explanation}</p>
                  </div>
                ))}
              </div>

              <div className="text-center p-4 bg-green-200 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-1">
                  ${realWorldComparison.transparentApproach.totalCost.toLocaleString()}
                </div>
                <div className="text-sm text-green-700 mb-2">Final Total</div>
                <Badge className="bg-green-600 text-white">
                  {realWorldComparison.transparentApproach.surprises}
                </Badge>
              </div>
            </Card>

            {/* Hidden Cost Approach */}
            <Card className="p-8 border-red-200 bg-red-50">
              <div className="flex items-center gap-3 mb-6">
                <X className="h-6 w-6 text-red-500" />
                <h3 className="text-xl font-semibold text-red-900">{realWorldComparison.hiddenCostApproach.title}</h3>
              </div>

              <div className="mb-6">
                <div className="text-sm text-red-700 mb-2">Initial Quote:</div>
                <div className="text-3xl font-bold text-green-600 mb-4">
                  ${realWorldComparison.hiddenCostApproach.initialQuote}
                </div>
                <p className="text-xs text-red-600">Looks great... until the final invoice</p>
              </div>

              <div className="space-y-3 mb-6">
                <h4 className="font-semibold text-gray-900">Actual Invoice Breakdown:</h4>
                {realWorldComparison.hiddenCostApproach.breakdown.map((item, idx) => (
                  <div key={idx} className={`p-3 rounded-lg ${
                    idx === 0 ? 'bg-gray-100' : 'bg-red-100 border border-red-200'
                  }`}>
                    <div className="flex justify-between font-medium">
                      <span className="text-gray-900">{item.service}</span>
                      <span className={idx === 0 ? 'text-green-600' : 'text-red-600'}>${item.cost}</span>
                    </div>
                    <p className={`text-xs mt-1 ${idx === 0 ? 'text-gray-600' : 'text-red-700'}`}>
                      {item.explanation}
                    </p>
                  </div>
                ))}
              </div>

              <div className="text-center p-4 bg-red-200 rounded-lg">
                <div className="text-2xl font-bold text-red-600 mb-1">
                  ${realWorldComparison.hiddenCostApproach.totalCost.toLocaleString()}
                </div>
                <div className="text-sm text-red-700 mb-2">Shock Invoice Total</div>
                <Badge variant="destructive">
                  {realWorldComparison.hiddenCostApproach.surprises}
                </Badge>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            Professional Standards, Transparent Pricing
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-3xl mx-auto">
            ${comprehensiveService.price.toLocaleString()} comprehensive professional response - no hidden costs, no surprise invoices, no corners cut.
          </p>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <Eye className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Complete Transparency</h3>
              <p className="text-sm text-white/80">All services and costs disclosed upfront</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <Shield className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Professional Standards</h3>
              <p className="text-sm text-white/80">7 essential services included in every response</p>
            </div>
            <div className="bg-white/10 backdrop-blur p-6 rounded-lg">
              <CheckCircle className="h-8 w-8 mx-auto mb-3" />
              <h3 className="font-semibold mb-2">No Shock Invoices</h3>
              <p className="text-sm text-white/80">Fixed pricing with approval required for extras</p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/schedule">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-6 text-lg">
                <Calculator className="mr-2 h-5 w-5" />
                Get Transparent Quote
              </Button>
            </Link>
            <Link href="/guides/pricing/nrp-best-practices">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 px-8 py-6 text-lg">
                <FileText className="mr-2 h-5 w-5" />
                NRP Best Practices Guide
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
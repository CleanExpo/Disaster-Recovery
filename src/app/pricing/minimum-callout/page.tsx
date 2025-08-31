import { Metadata } from 'next';
import { DollarSign, Shield, Clock, CheckCircle2, Award, Users, Truck, MessageSquare} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: '$2200 Minimum Callout Fee Explained | What\'s Included | Disaster Recovery',
  description: 'Our $2200 minimum callout includes comprehensive assessment, emergency mitigation, insurance documentation, and immediate response. No hidden fees.',
  keywords: [
    'disaster recovery callout fee',
    'emergency restoration cost',
    '$2200 minimum service',
    'what\'s included callout fee',
    'insurance approved rates',
    'emergency response pricing'
  ]
};

export default function MinimumCalloutPage() {
  const includedServices = [
    {
      icon: Clock,
      title: 'Immediate 24/7 Response',
      value: '$500',
      description: 'Priority dispatch within 30-60 minutes, any time, any day'
    },
    {
      icon: Users,
      title: 'Expert 2-Person Team',
      value: '$600',
      description: 'IICRC certified technicians with 10+ years experience'
    },
    {
      icon: Truck,
      title: 'Fully Equipped Response Vehicle',
      value: '$400',
      description: 'Industrial equipment worth $50,000+ on every truck'
    },
    {
      icon: Shield,
      title: 'Comprehensive Assessment',
      value: '$300',
      description: 'Thermal imaging, moisture mapping, structural evaluation'
    },
    {
      icon: CheckCircle2,
      title: 'Emergency Mitigation',
      value: '$400',
      description: 'Immediate action to prevent further damage'
    },
    {
      icon: Award,
      title: 'Insurance Documentation',
      value: 'INCLUDED',
      description: 'Complete reports, photos, and claim assistance'
    }
  ];

  const competitorComparison = [
    { company: 'Disaster Recovery', callout: '$2,200', response: '30-60 min', equipment: 'Industrial', insurance: '✅ Direct Bill', guarantee: '✅ 100%' },
    { company: 'Competitor A', callout: '$500', response: '4-6 hours', equipment: 'Basic', insurance: '❌ You Pay', guarantee: '❌ Limited' },
    { company: 'Competitor B', callout: '$750', response: '2-4 hours', equipment: 'Standard', insurance: '❌ You Pay', guarantee: '❌ 90 Days' },
    { company: 'DIY Approach', callout: '$0', response: 'N/A', equipment: 'Rental', insurance: '❌ None', guarantee: '❌ None' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              $2,200 Minimum Callout Fee
            </h1>
            <p className="text-2xl mb-4">
              Why Professional Disaster Recovery Starts at $2,200
            </p>
            <p className="text-xl mb-8 text-blue-200">
              Insurance Approved • No Hidden Fees • Guaranteed Results
            </p>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6 mb-8">
              <p className="text-lg mb-4">
                <strong>Important:</strong> Most insurance policies cover our callout fee in full.
                We bill your insurance directly - you pay nothing upfront.
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <MessageSquare className="mr-2 h-5 w-5" />
                Call Online Form Available 24/7 - Insurance Covered
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            What Your $2,200 Investment Includes
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {includedServices.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <Icon className="h-10 w-10 text-blue-600" />
                    <span className="text-2xl font-bold text-green-600">{service.value}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </Card>
              );
            })}
          </div>
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-8 text-center">
            <h3 className="text-2xl font-bold mb-4">Total Value: $2,200+</h3>
            <p className="text-lg text-gray-700">
              You receive over $2,200 worth of professional services, equipment, and expertise 
              from the moment we arrive at your property.
            </p>
          </div>
        </div>
      </section>

      {/* Why This Investment Matters */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Proper Disaster Recovery Can't Be Done for Less
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-red-600">
                Hidden Costs of Cheap Services
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Secondary damage from delays (mould, structural)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Insurance claim rejection due to poor documentation</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Health risks from improper contamination handling</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>Repeat visits and extended restoration time</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-2">✗</span>
                  <span>No warranty or guarantee on work</span>
                </li>
              </ul>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-green-600">
                Value of Professional Service
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Prevent $10,000+ in secondary damage</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Guaranteed insurance approval and direct billing</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Health & safety compliance protecting your family</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>One visit, complete restoration</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Lifetime warranty on all work performed</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Competitor Comparison */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Compare Our Service Value
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full max-w-5xl mx-auto">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="p-4 text-left">Company</th>
                  <th className="p-4 text-center">Callout Fee</th>
                  <th className="p-4 text-center">Response Time</th>
                  <th className="p-4 text-center">Equipment</th>
                  <th className="p-4 text-center">Insurance</th>
                  <th className="p-4 text-center">Guarantee</th>
                </tr>
              </thead>
              <tbody>
                {competitorComparison.map((row, index) => (
                  <tr key={index} className={index === 0 ? 'bg-green-50 font-bold' : 'bg-white border-b'}>
                    <td className="p-4">{row.company}</td>
                    <td className="p-4 text-center">{row.callout}</td>
                    <td className="p-4 text-center">{row.response}</td>
                    <td className="p-4 text-center">{row.equipment}</td>
                    <td className="p-4 text-center">{row.insurance}</td>
                    <td className="p-4 text-center">{row.guarantee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ROI Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8">
              Your $2,200 Investment Saves You Thousands
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 bg-white">
                <p className="text-4xl font-bold text-red-600 mb-2">$15,000</p>
                <p className="text-gray-700">Average cost of untreated water damage after 48 hours</p>
              </Card>
              <Card className="p-6 bg-white">
                <p className="text-4xl font-bold text-orange-600 mb-2">$8,500</p>
                <p className="text-gray-700">Average mould remediation if not addressed immediately</p>
              </Card>
              <Card className="p-6 bg-white">
                <p className="text-4xl font-bold text-green-600 mb-2">$2,200</p>
                <p className="text-gray-700">Your investment for complete professional response</p>
              </Card>
            </div>
            <div className="bg-green-100 border-2 border-green-300 rounded-lg p-8">
              <p className="text-2xl font-bold text-green-800 mb-4">
                Save $21,300+ by Acting Now
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Every hour of delay increases damage exponentially. 
                Our $2,200 callout fee is a fraction of the cost of delayed action.
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <MessageSquare className="mr-2 h-5 w-5" />
                Protect Your Property - Submit Form Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Insurance Coverage */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Insurance Covers Our Callout Fee
            </h2>
            <Card className="p-8 bg-blue-50">
              <h3 className="text-2xl font-bold mb-6">How Insurance Billing Works</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">1</span>
                  <div>
                    <p className="font-bold">We Arrive & Start Work</p>
                    <p className="text-gray-600">No upfront payment required - we begin immediately</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">2</span>
                  <div>
                    <p className="font-bold">Complete Documentation</p>
                    <p className="text-gray-600">We handle all insurance paperwork and photos</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">3</span>
                  <div>
                    <p className="font-bold">Direct Insurance Billing</p>
                    <p className="text-gray-600">We bill your insurance company directly</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="bg-green-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4 flex-shrink-0">✓</span>
                  <div>
                    <p className="font-bold">You Pay Nothing</p>
                    <p className="text-gray-600">Only your standard excess applies (if any)</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Don't Let Disaster Costs Spiral Out of Control
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Our $2,200 minimum callout fee includes everything you need for professional disaster recovery. 
            Insurance approved, no hidden fees, guaranteed results.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <p className="text-2xl font-bold mb-2">Remember:</p>
            <p className="text-xl">
              Insurance covers our fees • You pay nothing upfront • Every minute counts
            </p>
          </div>
          <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-6">
            <MessageSquare className="mr-2 h-6 w-6" />
            Call Online Form Available 24/7 - Get $2,200+ Value Now
          </Button>
        </div>
      </section>
    </div>
  );
}
import { Metadata } from 'next';
import { DollarSign, MapPin, Clock, Shield, Phone, CheckCircle2, TrendingUp, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Cost Perth | Pricing from $2,530 | Free Quote',
  description: 'Water Damage Restoration pricing in Perth, WA. Minimum $2,530, average $6,325. Insurance approved, no hidden fees.',
  keywords: [
    'water damage restoration cost perth',
    'water-damage pricing perth',
    'perth water damage restoration price',
    'disaster recovery cost perth'
  ]
};

export default function PerthWaterDamageRestorationPricingPage() {
  const pricingFactors = [
    { factor: 'Property Size', impact: '20-30%', example: 'Larger properties require more equipment and time' },
    { factor: 'Damage Severity', impact: '30-50%', example: 'Category 3 water costs more than Category 1' },
    { factor: 'Response Time', impact: '10-20%', example: 'Emergency after-hours response adds surcharge' },
    { factor: 'Materials Affected', impact: '15-25%', example: 'Hardwood restoration costs more than carpet' },
    { factor: 'Secondary Damage', impact: '20-40%', example: 'Mould growth increases total cost' }
  ];

  const priceRanges = [
    { type: 'Minor Damage', range: '$2,530 - $3,795', description: 'Single room, minimal water, quick dry' },
    { type: 'Moderate Damage', range: '$3,795 - $6,325', description: 'Multiple rooms, standard restoration' },
    { type: 'Major Damage', range: '$6,325 - $11,385', description: 'Whole floor affected, extensive work' },
    { type: 'Severe Damage', range: '$11,385 - $15,813+', description: 'Structural damage, complete restoration' }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-green-900 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-centre mb-6">
              <MapPin className="h-6 w-6 mr-2" />
              <span className="text-lg">Perth, WA</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Water Damage Restoration Cost in Perth
            </h1>
            <p className="text-xl mb-8">
              Complete water extraction, drying, and restoration. Transparent pricing with no hidden fees.
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-white/10 backdrop-blur p-4 text-centre">
                <DollarSign className="h-8 w-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">$2,530</p>
                <p className="text-sm">Minimum Callout</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-4 text-centre">
                <TrendingUp className="h-8 w-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">$6,325</p>
                <p className="text-sm">Average Job Cost</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-4 text-centre">
                <Shield className="h-8 w-8 mx-auto mb-2" />
                <p className="text-2xl font-bold">100%</p>
                <p className="text-sm">Insurance Covered</p>
              </Card>
            </div>
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Phone className="mr-2 h-5 w-5" />
              Get Free Perth Quote - 1300 DISASTER
            </Button>
          </div>
        </div>
      </section>

      {/* Price Ranges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Water Damage Restoration Price Ranges in Perth
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {priceRanges.map((range, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="font-bold text-lg mb-2">{range.type}</h3>
                <p className="text-2xl font-bold text-green-600 mb-3">{range.range}</p>
                <p className="text-gray-600 text-sm">{range.description}</p>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-centre">
            <p className="text-gray-600">
              * Prices are estimates for Perth metro area. Final cost determined after assessment.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing Factors */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            What Affects Water Damage Restoration Cost in Perth?
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-4">
              {pricingFactors.map((factor, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-centre justify-between mb-2">
                    <h3 className="text-xl font-bold">{factor.factor}</h3>
                    <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full font-bold">
                      {factor.impact} impact
                    </span>
                  </div>
                  <p className="text-gray-600">{factor.example}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Cost Breakdown */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Typical Water Damage Restoration Cost Breakdown
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="space-y-4">
                <div className="flex justify-between items-centre pb-3 border-b">
                  <span className="font-bold">Emergency Response & Assessment</span>
                  <span className="text-xl font-bold">$2,530</span>
                </div>
                <div className="flex justify-between items-centre pb-3 border-b">
                  <span>Water Extraction & Equipment</span>
                  <span>$1,581</span>
                </div>
                <div className="flex justify-between items-centre pb-3 border-b">
                  <span>Drying & Dehumidification (3-5 days)</span>
                  <span>$1,265</span>
                </div>
                <div className="flex justify-between items-centre pb-3 border-b">
                  <span>Antimicrobial Treatment</span>
                  <span>$949</span>
                </div>
                <div className="flex justify-between items-centre pb-3 border-b">
                  <span>Restoration & Repairs</span>
                  <span>$1,898</span>
                </div>
                <div className="flex justify-between items-centre pt-3 text-xl font-bold">
                  <span>Typical Total</span>
                  <span className="text-green-600">$6,325</span>
                </div>
              </div>
              <div className="mt-6 bg-blue-50 rounded-lg p-4">
                <p className="text-centre">
                  <strong>Insurance typically covers 100%</strong> of these costs
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Perth Specific Info */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Water Damage Restoration in Perth Area
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-6">Local Perth Factors</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-3">Response Coverage:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Perth CBD: 30 minutes</li>
                    <li>• Inner suburbs: 45 minutes</li>
                    <li>• Outer suburbs: 60 minutes</li>
                    <li>• Regional WA: 90 minutes</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-bold mb-3">Common Issues:</h4>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Storm damage (peak season)</li>
                    <li>• Burst pipes (winter months)</li>
                    <li>• Flash flooding (summer storms)</li>
                    <li>• Humidity-related mould</li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 bg-green-100 rounded-lg p-4">
                <p className="text-centre font-bold text-green-800">
                  Perth teams available 24/7/365 - Same pricing day or night
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Insurance & Payment */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Insurance & Payment Options in Perth
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8">
              <Shield className="h-12 w-12 text-blue-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Insurance Direct Billing</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>No upfront payment required</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>We handle all paperwork</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Approved by all major insurers</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Only pay your excess</span>
                </li>
              </ul>
            </Card>
            <Card className="p-8">
              <Calculator className="h-12 w-12 text-green-600 mb-4" />
              <h3 className="text-2xl font-bold mb-4">Payment Options</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Insurance direct billing (preferred)</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Payment plans available</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Credit card accepted</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle2 className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                  <span>Free quotes always</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-centre">
          <DollarSign className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Get Your Free Water Damage Restoration Quote for Perth
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Transparent pricing from $2,530. Average job $6,325. 
            100% insurance covered with direct billing available.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <p className="text-2xl font-bold mb-2">No Hidden Fees Guarantee</p>
            <p className="text-lg">The price we quote is the price you pay</p>
          </div>
          <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 text-lg px-8 py-6">
            <Phone className="mr-2 h-6 w-6" />
            Call 1300 DISASTER - Free Perth Quote
          </Button>
        </div>
      </section>
    </div>
  );
}
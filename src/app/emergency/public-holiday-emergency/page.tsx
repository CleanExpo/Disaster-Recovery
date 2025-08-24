import { Metadata } from 'next';
import { Clock, AlertTriangle, Phone, DollarSign, Zap, Shield, Calendar, Moon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Public Holiday Emergency | All Public Holidays | $2200 Minimum + $1000 Surcharge',
  description: 'Holiday disaster response when other services are closed. 45 minutes response time. Available All Public Holidays. Insurance approved.',
  keywords: ["public holiday emergency","christmas emergency","easter disaster recovery"]
};

export default function PublicHolidayEmergencyPage() {
  return (
    <div className="min-h-screen">
      {/* Emergency Alert Banner */}
      <div className="bg-red-600 text-white py-3 animate-pulse">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <AlertTriangle className="h-5 w-5 mr-2" />
          <span className="font-bold">CRITICAL EMERGENCY - CALL NOW: 1300 DISASTER</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Clock className="h-16 w-16 text-orange-400 animate-spin-slow" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Public Holiday Emergency
            </h1>
            <div className="bg-orange-600 text-white inline-block px-6 py-3 rounded-full mb-6">
              <span className="text-2xl font-bold">All Public Holidays</span>
            </div>
            <p className="text-xl mb-8">
              Holiday disaster response when other services are closed
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8 max-w-3xl mx-auto">
              <Card className="bg-white/10 backdrop-blur p-4">
                <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <p className="text-lg font-bold">45 minutes</p>
                <p className="text-sm">Response Time</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-4">
                <DollarSign className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <p className="text-lg font-bold">$2200 + $1000</p>
                <p className="text-sm">Total Minimum</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-4">
                <Shield className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <p className="text-lg font-bold">100%</p>
                <p className="text-sm">Insurance Covered</p>
              </Card>
            </div>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white text-lg px-8 py-6">
              <Phone className="mr-2 h-6 w-6" />
              Call 1300 DISASTER - All Public Holidays Service
            </Button>
          </div>
        </div>
      </section>

      {/* Why We Charge More Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Public Holiday Emergency Costs More
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-orange-600">
                All Public Holidays Surcharge: $1000
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Premium rates for specialized technicians</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Double-time penalty rates for staff</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>On-call team availability costs</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Emergency vehicle dispatch priority</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Immediate parts and equipment access</span>
                </li>
              </ul>
            </Card>
            <Card className="p-8">
              <h3 className="text-2xl font-bold mb-4 text-green-600">
                What You Get for the Premium
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>45 minutes guaranteed response</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Senior technicians only (10+ years)</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Priority over standard callouts</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Complete equipment mobilization</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  <span>Insurance direct billing available</span>
                </li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Cost of Waiting Section */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-8 text-red-600">
              The True Cost of Waiting Until Business Hours
            </h2>
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-6 bg-white">
                <p className="text-4xl font-bold text-red-600 mb-2">+$5,000</p>
                <p className="font-bold mb-2">Every 6 Hours</p>
                <p className="text-gray-600">Additional damage from water spreading</p>
              </Card>
              <Card className="p-6 bg-white">
                <p className="text-4xl font-bold text-orange-600 mb-2">+$8,000</p>
                <p className="font-bold mb-2">After 12 Hours</p>
                <p className="text-gray-600">Mould growth begins, structural damage</p>
              </Card>
              <Card className="p-6 bg-white">
                <p className="text-4xl font-bold text-red-700 mb-2">+$15,000</p>
                <p className="font-bold mb-2">After 24 Hours</p>
                <p className="text-gray-600">Major structural repairs required</p>
              </Card>
            </div>
            <div className="bg-green-100 border-2 border-green-300 rounded-lg p-8">
              <p className="text-2xl font-bold text-green-800 mb-4">
                Save Thousands by Acting Now
              </p>
              <p className="text-lg text-gray-700 mb-6">
                Our $1000 all public holidays surcharge is a fraction 
                of the cost of waiting until regular hours.
              </p>
              <Button size="lg" className="bg-green-600 hover:bg-green-700">
                <Phone className="mr-2 h-5 w-5" />
                Call Now - Save $15,000+ in Damage
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
              Insurance Covers Public Holiday Emergency Fees
            </h2>
            <Card className="p-8 bg-blue-50">
              <div className="text-center mb-8">
                <Shield className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                <p className="text-2xl font-bold">Most Policies Include After-Hours Coverage</p>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-3">Standard Coverage Includes:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Emergency response fees</li>
                    <li>• After-hours surcharges</li>
                    <li>• Weekend penalty rates</li>
                    <li>• Holiday service premiums</li>
                    <li>• Priority response costs</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-3">We Handle Everything:</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li>• Direct insurance billing</li>
                    <li>• All documentation provided</li>
                    <li>• Photos and reports included</li>
                    <li>• Adjuster coordination</li>
                    <li>• No upfront payment needed</li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <Clock className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-4xl font-bold mb-6">
            All Public Holidays Disaster Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Don't let all public holidays timing cost you thousands more in damage. 
            Our expert teams are ready NOW with 45 minutes response.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <p className="text-2xl font-bold mb-2">Total Emergency Fee:</p>
            <p className="text-3xl font-bold">$2,200 base + $1000 = $3,200</p>
            <p className="text-lg mt-2">Insurance Approved • Direct Billing Available</p>
          </div>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6">
            <Phone className="mr-2 h-6 w-6" />
            1300 DISASTER - All Public Holidays Emergency
          </Button>
        </div>
      </section>
    </div>
  );
}
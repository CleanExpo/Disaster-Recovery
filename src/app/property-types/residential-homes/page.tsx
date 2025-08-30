import { Metadata } from 'next';
import { Building, Home, Briefcase, Shield, Clock, DollarSign, CheckCircle2, Phone, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Residential Home Disaster Recovery | Residential Properties | $2200 Minimum',
  description: 'Complete disaster recovery for houses, townhouses, and residential properties. 30-60 minutes response. 95% insurance coverage.',
  keywords: ["residential disaster recovery","home restoration","house water damage"]
};

export default function ResidentialHomePage() {
  const commonIssues = ["Water damage","Fire damage","Storm damage","Mould growth"];
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-centre mb-6">
              <span className="bg-orange-600 text-white px-4 py-2 rounded-full text-sm font-bold mr-3">
                RESIDENTIAL
              </span>
              <span className="bg-green-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                95% INSURANCE COVERED
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Residential Home Disaster Recovery
            </h1>
            <p className="text-xl mb-8">
              Complete disaster recovery for houses, townhouses, and residential properties
            </p>
            <div className="grid md:grid-cols-3 gap-4 mb-8">
              <Card className="bg-white/10 backdrop-blur p-4 text-centre">
                <Clock className="h-8 w-8 mx-auto mb-2" />
                <p className="font-bold">30-60 minutes</p>
                <p className="text-sm">Response Time</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-4 text-centre">
                <DollarSign className="h-8 w-8 mx-auto mb-2" />
                <p className="font-bold">$3,500 - $15,000</p>
                <p className="text-sm">Typical Cost Range</p>
              </Card>
              <Card className="bg-white/10 backdrop-blur p-4 text-centre">
                <Shield className="h-8 w-8 mx-auto mb-2" />
                <p className="font-bold">95%</p>
                <p className="text-sm">Insurance Coverage</p>
              </Card>
            </div>
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              <Phone className="mr-2 h-5 w-5" />
              Emergency Residential Response - 1300 DISASTER
            </Button>
          </div>
        </div>
      </section>

      {/* Property-Specific Challenges */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Common Residential Home Disaster Scenarios
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commonIssues.map((issue, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <AlertTriangle className="h-10 w-10 text-orange-600 mb-4" />
                <h3 className="font-bold text-lg mb-2">{issue}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Specialised response for residential properties
                </p>
                <p className="text-green-600 font-bold">✓ Covered by Insurance</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Process */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Our Residential Home Recovery Process
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-centre justify-centre mr-4 flex-shrink-0">
                    1
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Immediate Response</h3>
                    <p className="text-gray-600">
                      30-60 minutes arrival for residential emergencies. 
                      Priority dispatch for residential home disasters.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-centre justify-centre mr-4 flex-shrink-0">
                    2
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Property Assessment</h3>
                    <p className="text-gray-600">
                      Comprehensive evaluation of your 200-400 sqm property. 
                      Document all damage for insurance claims.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-centre justify-centre mr-4 flex-shrink-0">
                    3
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Emergency Mitigation</h3>
                    <p className="text-gray-600">
                      Immediate action to prevent further damage. 
                      Specialised equipment for residential properties.
                    </p>
                  </div>
                </div>
              </Card>
              
              <Card className="p-6">
                <div className="flex items-start">
                  <span className="bg-blue-600 text-white rounded-full w-10 h-10 flex items-centre justify-centre mr-4 flex-shrink-0">
                    4
                  </span>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Full Restoration</h3>
                    <p className="text-gray-600">
                      Complete restoration to pre-disaster condition. 
                      Residential compliance and standards met.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Structure */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Residential Home Disaster Recovery Pricing
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-2 border-blue-600">
              <div className="text-centre mb-8">
                <p className="text-4xl font-bold text-blue-600 mb-2">$2,200</p>
                <p className="text-xl">Minimum Callout Fee</p>
                <p className="text-gray-600">Includes complete assessment and emergency mitigation</p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="font-bold text-lg mb-4">Typical Cost Range:</h3>
                  <p className="text-3xl font-bold text-green-600 mb-2">$3,500 - $15,000</p>
                  <p className="text-gray-600">
                    Based on 200-400 sqm residential property
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-4">Insurance Coverage:</h3>
                  <p className="text-3xl font-bold text-green-600 mb-2">95%</p>
                  <p className="text-gray-600">
                    Direct billing available for residential claims
                  </p>
                </div>
              </div>
              
              <div className="mt-8 bg-green-50 rounded-lg p-6">
                <p className="text-centre text-lg">
                  <strong>No upfront payment required</strong> - We bill your insurance directly
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Why Residential Properties Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="p-6 text-centre">
              <Building className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Residential Expertise</h3>
              <p className="text-gray-600">
                Specialised knowledge of residential home requirements and regulations
              </p>
            </Card>
            <Card className="p-6 text-centre">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Insurance Approved</h3>
              <p className="text-gray-600">
                Preferred vendor for all major residential insurers
              </p>
            </Card>
            <Card className="p-6 text-centre">
              <CheckCircle2 className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">Compliance Guaranteed</h3>
              <p className="text-gray-600">
                Meet all residential standards and regulations
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-centre">
          <Building className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-4xl font-bold mb-6">
            Residential Home Disaster Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Specialised residential disaster recovery with 30-60 minutes response. 
            95% insurance coverage with direct billing available.
          </p>
          <div className="bg-white/10 backdrop-blur rounded-lg p-6 max-w-2xl mx-auto mb-8">
            <p className="text-2xl font-bold mb-2">$2,200 Minimum Callout</p>
            <p className="text-lg">Average Total: $3,500 - $15,000</p>
            <p className="text-lg mt-2">✓ 95% Insurance Covered</p>
          </div>
          <Button size="lg" className="bg-white text-blue-900 hover:bg-gray-100 text-lg px-8 py-6">
            <Phone className="mr-2 h-6 w-6" />
            1300 DISASTER - Residential Emergency
          </Button>
        </div>
      </section>
    </div>
  );
}
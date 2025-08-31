import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {  MapPin, Shield, AlertTriangle, Clock, CheckCircle2, MessageSquare} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Disaster Recovery Tasmania | 24/7 Emergency Services | Hobart & All Cities',
  description: 'Leading disaster recovery services across Tasmania. Emergency response for Bushfires, Flooding, Severe Storms, Landslides. Serving Hobart, Launceston, Devonport, Burnie and all TAS regions. Call Online Form Available 24/7.',
  keywords: [
    'disaster recovery Tasmania',
    'emergency services Hobart',
    'bushfires cleanup TAS',
    'water damage Tasmania',
    'fire damage restoration Hobart',
    ...['Sydney', 'Melbourne', 'Brisbane'].map((city: string) => `${city.toLowerCase()} disaster recovery`),
    'insurance restoration Tasmania',
    '24/7 emergency TAS'
  ]
};

export default function TasmaniaPage() {
  const cities = ["Launceston","Devonport","Burnie","Kingston","Ulverstone","Bridgewater"];
  const disasters = ["Bushfires","Flooding","Severe Storms","Landslides"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Disaster Recovery Tasmania
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              24/7 Online Emergency Response Across All TAS Regions
            </p>
            <div className="flex flex-col md:flex-row gap-4 justify-center mb-8">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                <MessageSquare className="mr-2 h-5 w-5" />
                Online Form Available 24/7
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-gray-100">
                Get Immediate Help
              </Button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-3xl font-bold">24/7</p>
                <p className="text-sm">Emergency Response</p>
              </div>
              <div>
                <p className="text-3xl font-bold">7+</p>
                <p className="text-sm">Cities Covered</p>
              </div>
              <div>
                <p className="text-3xl font-bold">30min</p>
                <p className="text-sm">Response Time</p>
              </div>
              <div>
                <p className="text-3xl font-bold">100%</p>
                <p className="text-sm">Insurance Approved</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Disaster Types */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tasmania Disaster Response Services
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {disasters.map((disaster, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <AlertTriangle className="h-12 w-12 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{disaster}</h3>
                <p className="text-gray-600 mb-4">
                  Rapid response and complete restoration for {disaster.toLowerCase()} damage.
                </p>
                <Link href={`/services/${disaster.toLowerCase().replace(/\s+/g, '-')}`}>
                  <Button variant="link" className="p-0">
                    Learn More →
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Serving All Tasmania Regions
          </h2>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Card className="p-4 bg-blue-50 border-blue-200">
              <MapPin className="h-5 w-5 text-blue-600 inline mr-2" />
              <span className="font-bold">Hobart</span> (Capital)
            </Card>
            {cities.map((city, index) => (
              <Card key={index} className="p-4 hover:bg-gray-50 transition-colours">
                <MapPin className="h-5 w-5 text-gray-600 inline mr-2" />
                <Link href={`/locations/tas/${city.toLowerCase().replace(/\s+/g, '-')}`}>
                  <span className="hover:text-blue-600 cursor-pointer">{city}</span>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Climate Risks */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <AlertTriangle className="h-16 w-16 text-orange-600 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-6">
              Tasmania Climate & Disaster Risks
            </h2>
            <p className="text-xl text-gray-700 mb-8">
              Increased bushfire risk and extreme weather events
            </p>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6">
                <Shield className="h-10 w-10 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Preparedness Plans</h3>
                <p className="text-sm text-gray-600">
                  Custom disaster preparedness for Tasmania conditions
                </p>
              </Card>
              <Card className="p-6">
                <Clock className="h-10 w-10 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Rapid Response</h3>
                <p className="text-sm text-gray-600">
                  Teams stationed across TAS for immediate deployment
                </p>
              </Card>
              <Card className="p-6">
                <CheckCircle2 className="h-10 w-10 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Full Recovery</h3>
                <p className="text-sm text-gray-600">
                  Complete restoration to pre-disaster condition
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Tasmania's Trusted Disaster Recovery Partner
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            When disaster strikes in Tasmania, we're here 24/7. 
            From Hobart to regional areas, no location is too remote.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
              <MessageSquare className="mr-2 h-5 w-5" />
              Call Online Form Available 24/7
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-900">
              Request Service Online
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
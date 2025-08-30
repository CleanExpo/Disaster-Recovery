import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Clock, Shield, Phone, MapPin, CheckCircle2, Zap, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Severe Storm Response Services | 24/7 Emergency Response | Disaster Recovery Australia',
  description: 'Emergency storm damage repairs including roof tarping, water extraction, and debris removal. Serving All Australian States. 30 minutes response time.',
  keywords: ["storm damage repair","emergency tarping","hail damage"]
};

export default function SevereStormResponsePage() {
  const regions = ["All Australian States"];
  const cities = ["All Capital Cities"];

  return (
    <div className="min-h-screen">
      {/* Emergency Alert Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4 flex items-centre justify-centre">
          <AlertTriangle className="h-5 w-5 mr-2 animate-pulse" />
          <span className="font-bold">EMERGENCY HOTLINE: 1300 DISASTER (1300 347 278)</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-centre mb-4">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">
                EXTREME PRIORITY
              </span>
              <span className="bg-orange-600 text-white px-3 py-1 rounded-full text-sm font-bold">
                30-60MIN RESPONSE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Severe Storm Response
            </h1>
            <p className="text-xl mb-8">
              Emergency storm damage repairs including roof tarping, water extraction, and debris removal
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <Phone className="mr-2 h-5 w-5" />
                Emergency Response Now
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-gray-900">
                <Zap className="mr-2 h-5 w-5" />
                Rapid Assessment
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Response Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Our Severe Storm Response Response Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 text-centre">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-centre justify-centre">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="font-bold mb-2">Emergency Contact</h3>
              <p className="text-sm text-gray-600">
                30 minutes guaranteed response
              </p>
            </Card>
            <Card className="p-6 text-centre">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-centre justify-centre">
                <span className="text-2xl font-bold text-orange-600">2</span>
              </div>
              <h3 className="font-bold mb-2">Rapid Assessment</h3>
              <p className="text-sm text-gray-600">
                Complete damage evaluation & safety check
              </p>
            </Card>
            <Card className="p-6 text-centre">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-centre justify-centre">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-bold mb-2">Immediate Action</h3>
              <p className="text-sm text-gray-600">
                Emergency mitigation to prevent further damage
              </p>
            </Card>
            <Card className="p-6 text-centre">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-centre justify-centre">
                <span className="text-2xl font-bold text-green-600">4</span>
              </div>
              <h3 className="font-bold mb-2">Full Restoration</h3>
              <p className="text-sm text-gray-600">
                Complete recovery to pre-disaster condition
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Regions */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Severe Storm Response Service Areas
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {regions.map((region, index) => (
              <Card key={index} className="p-6">
                <MapPin className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-bold text-lg mb-2">{region}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Comprehensive coverage with local teams ready for deployment
                </p>
                <div className="flex flex-wrap gap-2">
                  {cities.slice(index * 2, index * 2 + 2).map((city, idx) => (
                    <span key={idx} className="bg-gray-100 px-2 py-1 rounded text-sm">
                      {city}
                    </span>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Disaster Statistics */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-centre">
            <h2 className="text-3xl font-bold mb-12">
              Severe Storm Response Impact & Response
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-4xl font-bold text-orange-600">24/7</p>
                <p className="text-gray-600">Emergency Response</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-orange-600">30 minutes</p>
                <p className="text-gray-600">Response Time</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-orange-600">100%</p>
                <p className="text-gray-600">Insurance Approved</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-orange-600">10,000+</p>
                <p className="text-gray-600">Properties Restored</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-centre">
          <AlertTriangle className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Severe Storm Response Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait - every minute counts. Our expert teams are standing by 
            to respond immediately to your severe storm response emergency.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-centre">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              <Phone className="mr-2 h-5 w-5" />
              Call 1300 DISASTER Now
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-red-600">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Request Immediate Help
            </Button>
          </div>
          <p className="mt-6 text-sm">
            Average response time: <strong>30 minutes</strong> | 
            Service areas: <strong>1 regions</strong>
          </p>
        </div>
      </section>
    </div>
  );
}
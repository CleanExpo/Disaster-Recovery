import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertTriangle, Clock, Shield, MapPin, CheckCircle2, Zap, Users, MessageSquare} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Major Flood Recovery Services | 24/7 Online Emergency Response | Disaster Recovery',
  description: 'Comprehensive flood damage restoration, water extraction, and mould prevention. Serving Queensland, Northern NSW, Victoria. 1-2 hours response time.',
  keywords: ["flood recovery","water damage restoration","flood cleanup"]
};

export default function MajorFloodRecoveryPage() {
  const regions = ["Queensland","Northern NSW","Victoria"];
  const cities = ["Brisbane","Gold Coast","Lismore","Ballarat","Shepparton"];

  return (
    <div className="min-h-screen">
      {/* Emergency Alert Banner */}
      <div className="bg-red-600 text-white py-3">
        <div className="container mx-auto px-4 flex items-center justify-center">
          <AlertTriangle className="h-5 w-5 mr-2 animate-pulse" />
          <span className="font-bold">EMERGENCY ONLINE FORM: Online Form Available 24/7</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center mb-4">
              <span className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold mr-3">
                EXTREME PRIORITY
              </span>
              <span className="bg-blue-700 text-white px-3 py-1 rounded-full text-sm font-bold">
                30-60MIN RESPONSE
              </span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Major Flood Recovery
            </h1>
            <p className="text-xl mb-8">
              Comprehensive flood damage restoration, water extraction, and mould prevention
            </p>
            <div className="flex flex-col md:flex-row gap-4">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white">
                <MessageSquare className="mr-2 h-5 w-5" />
                Emergency Response Now
              </Button>
              <Button size="lg" className="bg-[#FF0000] hover:bg-[#CC0000] text-white bg-transparent ">
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
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Major Flood Recovery Response Process
          </h2>
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="p-6 text-center">
              <div className="bg-red-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-red-600">1</span>
              </div>
              <h3 className="font-bold mb-2">Emergency Contact</h3>
              <p className="text-sm text-gray-600">
                1-2 hours guaranteed response
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-orange-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-700">2</span>
              </div>
              <h3 className="font-bold mb-2">Rapid Assessment</h3>
              <p className="text-sm text-gray-600">
                Complete damage evaluation & safety check
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-blue-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="font-bold mb-2">Immediate Action</h3>
              <p className="text-sm text-gray-600">
                Emergency mitigation to prevent further damage
              </p>
            </Card>
            <Card className="p-6 text-center">
              <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
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
          <h2 className="text-3xl font-bold text-center mb-12">
            Major Flood Recovery Service Areas
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
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-12">
              Major Flood Recovery Impact & Response
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-4xl font-bold text-blue-700">24/7</p>
                <p className="text-gray-600">Emergency Response</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-700">1-2 hours</p>
                <p className="text-gray-600">Response Time</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-700">100%</p>
                <p className="text-gray-600">Insurance Approved</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-blue-700">10,000+</p>
                <p className="text-gray-600">Properties Restored</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <AlertTriangle className="h-16 w-16 mx-auto mb-6 animate-pulse" />
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Major Flood Recovery Emergency?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait - every minute counts. Our expert teams are standing by 
            to respond immediately to your major flood recovery emergency.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
              <MessageSquare className="mr-2 h-5 w-5" />
              Call Online Form Available 24/7 Now
            </Button>
            <Button size="lg" className="bg-[#FF0000] hover:bg-[#CC0000] text-white bg-transparent border-white ">
              <CheckCircle2 className="mr-2 h-5 w-5" />
              Request Immediate Help
            </Button>
          </div>
          <p className="mt-6 text-sm">
            Average response time: <strong>1-2 hours</strong> | 
            Service areas: <strong>3 regions</strong>
          </p>
        </div>
      </section>
    </div>
  );
}
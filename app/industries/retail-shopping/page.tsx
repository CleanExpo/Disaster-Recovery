import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, Shield, Clock, AlertTriangle, CheckCircle2, ArrowRight, MessageSquare} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Retail & Shopping Centres Disaster Recovery | Specialised Industrial Restoration | Australia',
  description: 'Rapid restoration for retail stores and shopping centres to minimize business interruption. 24/7 emergency response, insurance approved, minimal downtime guaranteed.',
  keywords: ["retail disaster recovery","shopping centre restoration","store cleanup"]
};

export default function RetailShoppingCentersPage() {
  const risks = ["Water damage","Fire damage","Storm damage","Vandalism cleanup"];
  const locations = ["CBD areas","Westfield centres","DFO outlets"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Building2 className="h-16 w-16 text-blue-600 mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Retail & Shopping Centres Disaster Recovery
            </h1>
            <p className="text-xl mb-8">
              Rapid restoration for retail stores and shopping centres to minimize business interruption
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-blue-700 hover:bg-orange-700">
                <MessageSquare className="mr-2 h-5 w-5" />
                Emergency: Online Form Available 24/7
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white hover:text-gray-900">
                Get Priority Response
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Common Risks */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Retail & Shopping Centres Disaster Risks We Handle
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {risks.map((risk, index) => (
              <Card key={index} className="p-6">
                <AlertTriangle className="h-10 w-10 text-blue-700 mb-4" />
                <h3 className="font-bold mb-2">{risk}</h3>
                <p className="text-sm text-gray-600">
                  Specialised response protocols for retail & shopping centres sector
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Service Features */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Retail & Shopping Centres Trusts Us
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Clock className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Minimal Downtime</h3>
                <p className="text-gray-600">
                  Priority response to get your operations running again
                </p>
              </div>
              <div className="text-center">
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Compliance Assured</h3>
                <p className="text-gray-600">
                  Meet all industry regulations and safety standards
                </p>
              </div>
              <div className="text-center">
                <CheckCircle2 className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold mb-2">Insurance Expertise</h3>
                <p className="text-gray-600">
                  Direct billing and claim management
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Locations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Servicing Retail & Shopping Centres nationwide
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {locations.map((location, index) => (
              <Card key={index} className="px-6 py-3">
                <span className="font-semibold">{location}</span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Protect Your Retail & Shopping Centres Assets
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't let disasters disrupt your operations. Get priority emergency response 
            and expert restoration services tailored to retail & shopping centres.
          </p>
          <Button size="lg" className="bg-white text-blue-700 hover:bg-gray-100">
            <MessageSquare className="mr-2 h-5 w-5" />
            Call Online Form Available 24/7 Now
          </Button>
        </div>
      </section>
    </div>
  );
}
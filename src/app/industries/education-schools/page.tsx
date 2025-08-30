import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Building2, Shield, Clock, AlertTriangle, CheckCircle2, Phone, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Education & Schools Disaster Recovery | Specialised Industrial Restoration | Australia',
  description: 'School and university disaster recovery with minimal disruption to learning. 24/7 emergency response, insurance approved, minimal downtime guaranteed.',
  keywords: ["school disaster recovery","university restoration","education facility cleanup"]
};

export default function EducationSchoolsPage() {
  const risks = ["Water damage","Mould growth","Storm damage","Fire damage"];
  const locations = ["All education precincts nationwide"];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-gray-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Building2 className="h-16 w-16 text-orange-500 mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Education & Schools Disaster Recovery
            </h1>
            <p className="text-xl mb-8">
              School and university disaster recovery with minimal disruption to learning
            </p>
            <div className="flex flex-col md:flex-row gap-4 mb-8">
              <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                <Phone className="mr-2 h-5 w-5" />
                Emergency: 1300 DISASTER
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
            Education & Schools Disaster Risks We Handle
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {risks.map((risk, index) => (
              <Card key={index} className="p-6">
                <AlertTriangle className="h-10 w-10 text-orange-600 mb-4" />
                <h3 className="font-bold mb-2">{risk}</h3>
                <p className="text-sm text-gray-600">
                  Specialised response protocols for education & schools sector
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
              Why Education & Schools Trusts Us
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
            Servicing Education & Schools Across Australia
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
      <section className="py-20 bg-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Protect Your Education & Schools Assets
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't let disasters disrupt your operations. Get priority emergency response 
            and expert restoration services tailored to education & schools.
          </p>
          <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
            <Phone className="mr-2 h-5 w-5" />
            Call 1300 DISASTER Now
          </Button>
        </div>
      </section>
    </div>
  );
}
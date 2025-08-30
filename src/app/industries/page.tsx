import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Building2, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Industry-Specific Disaster Recovery | Commercial & Industrial Restoration',
  description: 'Specialised disaster recovery services for all Australian industries. Mining, healthcare, education, retail, agriculture, and more.',
};

const industries = [
  {
    "name": "Mining & Resources",
    "slug": "mining-resources",
    "description": "Specialised disaster recovery for mining operations, processing plants, and resource facilities"
  },
  {
    "name": "Agriculture & Farming",
    "slug": "agriculture-farming",
    "description": "Farm and agricultural facility disaster recovery including livestock areas and crop storage"
  },
  {
    "name": "Healthcare & Medical Facilities",
    "slug": "healthcare-medical",
    "description": "Critical disaster recovery for hospitals, clinics, aged care, and medical centres"
  },
  {
    "name": "Education & Schools",
    "slug": "education-schools",
    "description": "School and university disaster recovery with minimal disruption to learning"
  },
  {
    "name": "Retail & Shopping Centres",
    "slug": "retail-shopping",
    "description": "Rapid restoration for retail stores and shopping centres to minimize business interruption"
  },
  {
    "name": "Hospitality & Tourism",
    "slug": "hospitality-tourism",
    "description": "Hotel, resort, and tourism facility disaster recovery nationwide"
  }
];

export default function IndustriesPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <Building2 className="h-16 w-16 text-orange-500 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Industry-Specific Disaster Recovery
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Tailored emergency response and restoration services for every Australian industry
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <h2 className="text-2xl font-bold mb-3">{industry.name}</h2>
                <p className="text-gray-600 mb-4">{industry.description}</p>
                <Link href={`/industries/${industry.slug}`}>
                  <Button variant="outline">
                    Learn More <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
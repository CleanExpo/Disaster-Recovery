import { Metadata } from 'next';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { HelpCircle, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | All FAQs | Disaster Recovery Australia',
  description: 'Find answers to all your questions about disaster recovery, water damage, fire restoration, mould removal, insurance claims, and emergency response.',
};

const categories = [
  {
    "name": "General Questions",
    "slug": "general",
    "description": "Common questions about our disaster recovery services",
    "questionCount": 5
  },
  {
    "name": "Water Damage FAQs",
    "slug": "water-damage",
    "description": "Everything about water damage restoration",
    "questionCount": 5
  },
  {
    "name": "Fire & Smoke Damage FAQs",
    "slug": "fire-damage",
    "description": "Fire and smoke restoration questions answered",
    "questionCount": 5
  },
  {
    "name": "Mould Remediation FAQs",
    "slug": "mould-removal",
    "description": "Important information about mould removal",
    "questionCount": 5
  },
  {
    "name": "Insurance Claims FAQs",
    "slug": "insurance-claims",
    "description": "Navigate the insurance claim process",
    "questionCount": 5
  },
  {
    "name": "Emergency Response FAQs",
    "slug": "emergency-response",
    "description": "Critical information for disaster emergencies",
    "questionCount": 5
  }
];

export default function FAQIndexPage() {
  return (
    <div className="min-h-screen">
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4 text-centre">
          <HelpCircle className="h-16 w-16 mx-auto mb-6" />
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Get answers to common questions about disaster recovery, 
            insurance claims, and our contractor network.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {categories.map((category, index) => (
              <Link key={index} href={`/faq/${category.slug}`}>
                <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer h-full">
                  <div className="flex items-start justify-between mb-4">
                    <HelpCircle className="h-10 w-10 text-blue-600" />
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-sm font-bold">
                      {category.questionCount} Questions
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{category.name}</h2>
                  <p className="text-gray-600 mb-4">{category.description}</p>
                  <div className="flex items-centre text-blue-600 font-bold">
                    View Questions <ArrowRight className="ml-2 h-4 w-4" />
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Answers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Quick Answers to Top Questions
          </h2>
          <div className="max-w-4xl mx-auto space-y-6">
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">How does your online system work?</h3>
              <p className="text-gray-700">
                Fill out our form, select your service radius (20-100km), and receive multiple 
                quotes from IICRC certified contractors within 30-60 minutes.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">Why is there a $2,200 minimum fee?</h3>
              <p className="text-gray-700">
                This covers emergency response, professional assessment, equipment, certified 
                technicians, and insurance documentation - preventing thousands in secondary damage.
              </p>
            </Card>
            <Card className="p-6">
              <h3 className="font-bold text-lg mb-2">Is insurance coverage available?</h3>
              <p className="text-gray-700">
                Yes, most disasters are insurance covered. Our contractors bill insurance directly 
                so you only pay your excess.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            Can't Find Your Answer?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get immediate help from certified professionals in your area
          </p>
          <Link href="/get-help">
            <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100">
              Get Help Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
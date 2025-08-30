import { Metadata } from 'next';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { EmergencyCTA } from '@/components/ui/emergency-cta';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Shield,
  Phone,
  FileText,
  Users,
  Zap
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Documenting Water Damage for Insurance Claims | Disaster Recovery Australia',
  description: 'Expert answers and solutions for "how to document water damage for insurance claim". IICRC certified professionals available 24/7 across Australia.',
  keywords: 'how to document water damage for insurance claim, disaster recovery, restoration services, Australia, IICRC certified',
};

export default function DocumentWaterDamageInsurancePage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [{
      '@type': 'Question',
      name: 'how to document water damage for insurance claim',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Professional disaster recovery services for how to document water damage for insurance claim. Our IICRC certified technicians provide expert solutions with 24/7 emergency response across Australia.',
      },
    }],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-to-b from-blue-900 to-blue-800 text-white">
          <div className="container mx-auto max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Documenting Water Damage for Insurance Claims
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Expert solutions and answers for "how to document water damage for insurance claim"
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600">
                Get Immediate Help
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-900">
                Free Assessment
              </Button>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">
                Understanding Documenting Water Damage for Insurance Claims
              </h2>
              
              <div className="prose max-w-none">
                <p className="text-lg mb-4">
                  When searching for "how to document water damage for insurance claim", you need reliable, professional answers from certified experts. 
                  At Disaster Recovery Australia, we provide comprehensive solutions backed by IICRC certification and years of experience.
                </p>
                
                <h3 className="text-xl font-semibold mt-6 mb-4">Key Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-1" />
                    <span>IICRC certified professionals with 200+ hours of training</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-1" />
                    <span>24/7 emergency response across all major Australian cities</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-1" />
                    <span>Insurance approved with direct billing available</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-green-600 mr-3 mt-1" />
                    <span>Guaranteed response within 30-60 minutes</span>
                  </li>
                </ul>

                <h3 className="text-xl font-semibold mt-8 mb-4">Our Process</h3>
                <ol className="space-y-4">
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-centre justify-centre mr-3">1</span>
                    <div>
                      <strong>Initial Assessment:</strong> Comprehensive evaluation of the situation
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-centre justify-centre mr-3">2</span>
                    <div>
                      <strong>Emergency Response:</strong> Immediate action to prevent further damage
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-centre justify-centre mr-3">3</span>
                    <div>
                      <strong>Professional Restoration:</strong> Complete restoration using industry-leading equipment
                    </div>
                  </li>
                  <li className="flex">
                    <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-centre justify-centre mr-3">4</span>
                    <div>
                      <strong>Quality Assurance:</strong> Final inspection and certification
                    </div>
                  </li>
                </ol>

                <h3 className="text-xl font-semibold mt-8 mb-4">Why Choose Our Services</h3>
                <p className="mb-4">
                  For "how to document water damage for insurance claim", you need a restoration company that combines technical expertise with rapid response. 
                  Our team offers:
                </p>
                <ul className="space-y-2">
                  <li>• Advanced equipment including thermal imaging and moisture detection</li>
                  <li>• Specialised techniques for complete restoration</li>
                  <li>• Direct insurance billing to simplify your claim</li>
                  <li>• Transparent pricing with no hidden fees</li>
                  <li>• Guarantee on all restoration work</li>
                </ul>
              </div>
            </Card>

            {/* Statistics */}
            <div className="grid md:grid-cols-4 gap-6 mt-12">
              <Card className="p-6 text-centre">
                <div className="text-3xl font-bold text-blue-600 mb-2">30-60min</div>
                <p className="text-sm text-gray-600">Response Time</p>
              </Card>
              <Card className="p-6 text-centre">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <p className="text-sm text-gray-600">Availability</p>
              </Card>
              <Card className="p-6 text-centre">
                <div className="text-3xl font-bold text-blue-600 mb-2">200+</div>
                <p className="text-sm text-gray-600">Hours Training</p>
              </Card>
              <Card className="p-6 text-centre">
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <p className="text-sm text-gray-600">Insurance Approved</p>
              </Card>
            </div>

            {/* Related Links */}
            <Card className="p-8 mt-12">
              <h3 className="text-xl font-bold mb-4">Related Resources</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Link href="/services" className="text-blue-600 hover:underline">
                  → View All Services
                </Link>
                <Link href="/emergency" className="text-blue-600 hover:underline">
                  → Emergency Response
                </Link>
                <Link href="/insurance-claims" className="text-blue-600 hover:underline">
                  → Insurance Claims Help
                </Link>
                <Link href="/faq" className="text-blue-600 hover:underline">
                  → Frequently Asked Questions
                </Link>
              </div>
            </Card>
          </div>
        </section>

        {/* CTA Section */}
        <EmergencyCTA />
      </div>
    </>
  );
}
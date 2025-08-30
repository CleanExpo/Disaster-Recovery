import { Metadata } from 'next';
import { HelpCircle, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Emergency Response FAQs | FAQ | Disaster Recovery',
  description: 'Critical information for disaster emergencies. Get answers to common questions about disaster recovery services, insurance claims, and emergency response.',
  keywords: ['disaster recovery FAQ', 'emergency-response questions', 'restoration help', 'insurance claims FAQ']
};

export default function EmergencyResponseFAQsPage() {
  const faqs = [
  {
    "question": "What should I do first in an emergency?",
    "answer": "Ensure safety first - evacuate if necessary. Turn off water/electricity if safe. Document damage with photos. Submit our online form immediately. Do not attempt major cleanup yourself."
  },
  {
    "question": "Are services available 24/7?",
    "answer": "Yes, our online system and contractor network operate 24/7/365 including weekends and holidays. After-hours surcharges may apply but are insurance covered."
  },
  {
    "question": "What's the difference between emergency and scheduled service?",
    "answer": "Emergency service: Immediate response for active damage, 30-60 minute response, prevents secondary damage. Scheduled service: For non-urgent repairs, planned within 1-3 days, often lower cost."
  },
  {
    "question": "How do I choose between multiple contractor quotes?",
    "answer": "Consider: Response time, specific experience with your damage type, customer reviews, included services, warranty offered. All our contractors meet minimum standards, so choose based on your specific needs."
  },
  {
    "question": "What areas do you service?",
    "answer": "We cover all of Australia through our certified contractor network. Major cities have multiple contractors. Regional and remote areas are serviced through extended radius partnerships."
  }
];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-900 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <HelpCircle className="h-16 w-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Emergency Response FAQs
            </h1>
            <p className="text-xl">
              Critical information for disaster emergencies
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                  <details className="group">
                    <summary className="flex items-start justify-between cursor-pointer list-none">
                      <div className="flex items-start">
                        <div className="bg-blue-100 rounded-full p-2 mr-4">
                          <HelpCircle className="h-5 w-5 text-blue-600" />
                        </div>
                        <h2 className="text-xl font-bold pr-4">{faq.question}</h2>
                      </div>
                      <ChevronDown className="h-5 w-5 text-gray-500 group-open:hidden" />
                      <ChevronUp className="h-5 w-5 text-gray-500 hidden group-open:block" />
                    </summary>
                    <div className="mt-4 ml-14">
                      <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                    </div>
                  </details>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Related FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            More FAQ Categories
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            
            <Link href="/faq/general">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <HelpCircle className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">General Questions</h3>
                <p className="text-sm text-gray-600">Common questions about our disaster recovery services</p>
              </Card>
            </Link>
            <Link href="/faq/water-damage">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <HelpCircle className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Water Damage FAQs</h3>
                <p className="text-sm text-gray-600">Everything about water damage restoration</p>
              </Card>
            </Link>
            <Link href="/faq/fire-damage">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <HelpCircle className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Fire & Smoke Damage FAQs</h3>
                <p className="text-sm text-gray-600">Fire and smoke restoration questions answered</p>
              </Card>
            </Link>
            <Link href="/faq/mould-removal">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <HelpCircle className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Mould Remediation FAQs</h3>
                <p className="text-sm text-gray-600">Important information about mould removal</p>
              </Card>
            </Link>
            <Link href="/faq/insurance-claims">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <HelpCircle className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Insurance Claims FAQs</h3>
                <p className="text-sm text-gray-600">Navigate the insurance claim process</p>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <AlertCircle className="h-16 w-16 mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-6">
            Need Emergency Help Now?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait - get connected with IICRC certified contractors in your area
          </p>
          <Link href="/get-help">
            <Button size="lg" className="bg-white text-blue-800 hover:bg-gray-100">
              Get Emergency Help Online
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
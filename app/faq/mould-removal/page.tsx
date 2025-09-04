import { Metadata } from 'next';
import { HelpCircle, ChevronDown, ChevronUp, AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mould Remediation FAQs | FAQ | Disaster Recovery',
  description: 'Important information about mould removal. Get answers to common questions about disaster recovery services, insurance claims, and emergency response.',
  keywords: ['disaster recovery FAQ', 'mould-removal questions', 'restoration help', 'insurance claims FAQ']
};

export default function MouldRemediationFAQsPage() {
  const faqs = [
  {
    "question": "How dangerous is mould in my home?",
    "answer": "Mould poses health risks including allergies, respiratory issues, and toxic reactions. Black mould (Stachybotrys) is particularly dangerous. Children, elderly, and immune-compromised individuals are at highest risk."
  },
  {
    "question": "Can I remove mould myself?",
    "answer": "Small areas under 1 square meter might be DIY with proper protection. Larger infestations require professional remediation due to health risks, proper containment needs, and risk of spreading spores."
  },
  {
    "question": "How much does mould removal cost?",
    "answer": "Costs vary by extent: Small area (under 10 sq m): $2,200-$3,500. Medium area (10-30 sq m): $3,500-$7,000. Large area (30+ sq m): $7,000-$20,000+. Includes containment, removal, treatment, and prevention."
  },
  {
    "question": "How do you prevent mould returning?",
    "answer": "Prevention requires: Fix moisture source, maintain humidity below 50%, ensure proper ventilation, use mould-resistant materials, regular inspections, and immediate water damage response."
  },
  {
    "question": "Is mould removal covered by insurance?",
    "answer": "Coverage depends on cause. Mould from covered water damage (burst pipe, storm) is usually covered. Mould from maintenance issues or long-term leaks typically isn't. Check your specific policy."
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
              Mould Remediation FAQs
            </h1>
            <p className="text-xl">
              Important information about mould removal
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
            <Link href="/faq/insurance-claims">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <HelpCircle className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Insurance Claims FAQs</h3>
                <p className="text-sm text-gray-600">Navigate the insurance claim process</p>
              </Card>
            </Link>
            <Link href="/faq/emergency-response">
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <HelpCircle className="h-8 w-8 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Emergency Response FAQs</h3>
                <p className="text-sm text-gray-600">Critical information for disaster emergencies</p>
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
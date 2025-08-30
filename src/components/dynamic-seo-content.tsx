'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Phone, Clock, Shield, AlertTriangle, CheckCircle2, MapPin, Star } from 'lucide-react';
import LeadCaptureForm from '@/components/forms/LeadCaptureForm';

interface DynamicPageProps {
  params: {
    slug: string[];
  };
}

export default function DynamicSEOContent({ params }: DynamicPageProps) {
  const [showLeadForm, setShowLeadForm] = useState(false);

  // Generate simple content based on slug
  const slugPath = params.slug.join('/');
  const pageTitle = params.slug
    .map(part => part.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' '))
    .join(' | ');

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {pageTitle}
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Professional disaster recovery services for {pageTitle.toLowerCase()}. 
              Available 24/7 with insurance approved solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600"
                onClick={() => setShowLeadForm(true)}
              >
                <Phone className="mr-2" />
                Call 1300 814 870
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="bg-white text-blue-900 hover:bg-blue-50"
                onClick={() => setShowLeadForm(true)}
              >
                Get Free Quote
              </Button>
            </div>
            <div className="mt-6 flex items-center justify-center gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>24/7 Service</span>
              </div>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4" />
                <span>Insurance Approved</span>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>All Areas</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Key Services */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Services</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-6">
                  <CheckCircle2 className="h-8 w-8 text-green-500 mb-3" />
                  <h3 className="font-bold mb-2">Emergency Response</h3>
                  <p className="text-gray-600">24/7 rapid response team available for immediate assistance</p>
                </Card>
                <Card className="p-6">
                  <CheckCircle2 className="h-8 w-8 text-green-500 mb-3" />
                  <h3 className="font-bold mb-2">Insurance Claims</h3>
                  <p className="text-gray-600">Direct billing with all major insurers</p>
                </Card>
                <Card className="p-6">
                  <CheckCircle2 className="h-8 w-8 text-green-500 mb-3" />
                  <h3 className="font-bold mb-2">Complete Restoration</h3>
                  <p className="text-gray-600">Full property restoration from start to finish</p>
                </Card>
              </div>
            </div>

            {/* Process Steps */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Our Process</h2>
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { step: 1, title: 'Emergency Call', desc: 'Contact our 24/7 hotline' },
                  { step: 2, title: 'Assessment', desc: 'Professional evaluation' },
                  { step: 3, title: 'Restoration', desc: 'Complete damage repair' },
                  { step: 4, title: 'Completion', desc: 'Quality guarantee' }
                ].map((item, index) => (
                  <Card key={index} className="p-4">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mb-3">
                      {item.step}
                    </div>
                    <h3 className="font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.desc}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* Trust Signals */}
            <div className="mb-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  'IICRC Certified',
                  'Licensed & Insured',
                  '5-Star Reviews',
                  'Insurance Approved'
                ].map((signal, index) => (
                  <Card key={index} className="p-4 text-center">
                    <CheckCircle2 className="h-6 w-6 text-green-500 mx-auto mb-2" />
                    <p className="text-sm font-semibold">{signal}</p>
                  </Card>
                ))}
              </div>
            </div>

            {/* FAQs */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
              <div className="space-y-4">
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-2">How quickly can you respond?</h3>
                  <p className="text-gray-700">Our emergency teams typically arrive within 30-60 minutes for urgent situations. We have crews stationed throughout the area for rapid response.</p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-2">Is the service covered by insurance?</h3>
                  <p className="text-gray-700">Most insurance policies cover sudden damage. We work directly with all major insurers and can manage your claim from start to finish.</p>
                </Card>
                <Card className="p-6">
                  <h3 className="text-lg font-bold mb-2">What areas do you service?</h3>
                  <p className="text-gray-700">We service all metropolitan and regional areas across Australia with local teams ready to respond 24/7.</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Need Emergency Help?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait for the problem to get worse. Get professional help now with insurance-approved service.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => setShowLeadForm(true)}
            >
              <Phone className="mr-2" />
              Call 1300 814 870 Now
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="bg-white text-blue-900 hover:bg-blue-50"
              onClick={() => setShowLeadForm(true)}
            >
              Get Free Quote
            </Button>
          </div>
        </div>
      </section>

      {/* Lead Form Modal */}
      {showLeadForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-4 border-b flex justify-between items-center">
              <h2 className="text-2xl font-bold">Get Immediate Help</h2>
              <Button 
                variant="ghost" 
                onClick={() => setShowLeadForm(false)}
                className="text-2xl"
              >
                ×
              </Button>
            </div>
            <div className="p-4">
              <LeadCaptureForm />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

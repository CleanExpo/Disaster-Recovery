'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { generateSEO, generateLocalBusinessSchema, generateServiceSchema, generateFAQSchema } from '@/lib/seo';
import {  Clock, Shield, AlertTriangle, CheckCircle2, ArrowRight, MessageSquare} from 'lucide-react';

export default function GreyWaterDamageCleanupPage() {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const businessInfo = {
    name: 'Disaster Recovery - Grey Water Damage Cleanup',
    description: 'Professional grey water damage cleanup services in Queensland. 24/7 emergency response for washing machine water, sink overflow.',
    telephone: "",
    address: {
      streetAddress: 'Servicing All Areas',
      addressLocality: 'Brisbane',
      addressRegion: 'QLD',
      postalCode: '4000',
      addressCountry: 'AU'
    },
    hours: '24/7 Online Emergency Response',
    url: 'https://disasterrecovery.com.au/services/sewage-cleanup/grey-water-cleanup',
    image: '/images/grey-water-cleanup.jpg',
    priceRange: '$$-$$$'
  };

  const faqs = [
    {
      question: 'How quickly can you respond to grey water damage cleanup emergencies?',
      answer: 'We offer 24/7 emergency response for grey water damage cleanup with teams typically arriving within 2 hours in metro areas. Our rapid response helps minimize damage and reduce restoration costs.'
    },
    {
      question: 'Is grey water damage cleanup covered by insurance?',
      answer: 'Most insurance policies cover grey water damage cleanup damage when it\'s sudden and accidental. We work directly with all major insurers and can help manage your claim from start to finish.'
    },
    {
      question: 'What is the cost of grey water damage cleanup services?',
      answer: 'Costs vary based on the extent of damage and services required. We provide free assessments and quotes, and work with your insurance company for direct billing where applicable.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessSchema(businessInfo)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Grey Water Damage Cleanup
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Expert grey water damage cleanup services across Queensland. Fast response, professional restoration, insurance approved.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => setShowQuoteDialog(true)}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                Use Our Online Form'
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Professional Grey Water Damage Cleanup Services</h2>
            <p className="text-lg text-gray-700 mb-8">
              When you need expert grey water damage cleanup services, Disaster Recovery provides comprehensive solutions 
              with 24/7 emergency response across Southeast Queensland.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Our Services</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Emergency response 24/7</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Professional assessment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Complete restoration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Insurance assistance</span>
                  </li>
                </ul>
              </Card>
              
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Why Choose Us</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>15+ years experience</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Certified technicians</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Latest equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>Guaranteed results</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Grey Water Damage Cleanup FAQs</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-bold mb-3">{faq.question}</h3>
                  <p className="text-gray-700">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Need Grey Water Damage Cleanup Services?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Get professional help now. Available 24/7 for emergency response.
          </p>
          <Button 
            size="lg" 
            className="bg-orange-500 hover:bg-orange-600"
            onClick={() => setShowQuoteDialog(true)}
          >
            <MessageSquare className="mr-2" />
            Use Our Online Form'
          </Button>
        </div>
      </section>

      {/* Quote Dialog */}
      <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Grey Water Damage Cleanup Services</DialogTitle>
            <DialogDescription>
              Get immediate assistance 24/7. Our team is ready to help.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <MessageSquare className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-semibold">Submit Form Now</p>
                <p className="text-2xl font-bold text-orange-600">1300 814 870</p>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Request Service
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
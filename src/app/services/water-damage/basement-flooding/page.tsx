'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { generateSEO, generateLocalBusinessSchema, generateServiceSchema, generateFAQSchema } from '@/lib/seo';
import { Phone, Clock, Shield, Droplets, AlertTriangle, Home, ArrowDown, CheckCircle2, ArrowRight, XCircle, Zap, Gauge } from 'lucide-react';

export default function BasementFloodingPage() {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const businessInfo = {
    name: 'Disaster Recovery Australia - Basement Flooding Specialists',
    description: 'Emergency basement flooding cleanup and restoration in Brisbane. 24/7 water extraction, drying, and flood damage repair services.',
    telephone: '1300 814 870',
    address: {
      streetAddress: 'Servicing All Areas',
      addressLocality: 'Brisbane',
      addressRegion: 'QLD',
      postalCode: '4000',
      addressCountry: 'AU'
    },
    hours: '24/7 Emergency Response',
    url: 'https://disasterrecovery.com.au/services/water-damage/basement-flooding',
    image: '/images/basement-flooding.jpg',
    priceRange: '$$-$$$'
  };

  const faqs = [
    {
      question: 'How quickly should basement flooding be addressed?',
      answer: 'Basement flooding requires immediate action within 24-48 hours to prevent mould growth, structural damage, and foundation issues. Standing water can compromise your home\'s foundation and create serious health hazards. Call us immediately at 1300 814 870.'
    },
    {
      question: 'Is basement flooding covered by insurance in Queensland?',
      answer: 'Coverage depends on the cause. Storm flooding may require separate flood insurance, while burst pipes or sewer backups are typically covered by standard home insurance. We help document everything and work directly with your insurer for claims.'
    },
    {
      question: 'What health risks does basement flooding pose?',
      answer: 'Flooded basements pose serious health risks including toxic mould growth, bacterial contamination, electrical hazards, and structural instability. Category 3 black water from sewage is particularly dangerous. Professional remediation with proper PPE is essential.'
    },
    {
      question: 'How much does basement flood cleanup cost?',
      answer: 'Costs range from $3,000-$20,000 depending on water depth, contamination level, and damage extent. Clean water flooding costs less than sewage backup. Our emergency response helps minimize damage and costs. Insurance often covers most expenses.'
    },
    {
      question: 'Can I clean up basement flooding myself?',
      answer: 'DIY cleanup is not recommended due to electrical hazards, contamination risks, and hidden damage. Professional equipment is needed for proper water extraction, structural drying, and mould prevention. Improper cleanup can void insurance coverage.'
    },
    {
      question: 'How long does basement flood restoration take?',
      answer: 'Emergency water extraction takes 1-2 days, drying takes 3-7 days depending on saturation levels, and full restoration including repairs can take 2-4 weeks. We work efficiently to get your basement safe and usable quickly.'
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
      <section className="relative bg-gradient-to-r from-gray-900 to-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-red-600/90 px-4 py-2 rounded-full mb-6 animate-pulse">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm font-bold">BASEMENT FLOODING EMERGENCY</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Basement Flooding Cleanup Brisbane
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Emergency basement water extraction and restoration. Fast response for flooded basements, 
              sewage backup, and groundwater intrusion across Queensland.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-red-600 hover:bg-red-700 text-white"
                onClick={() => setShowQuoteDialog(true)}
              >
                <Phone className="mr-2 h-5 w-5 animate-pulse" />
                Emergency: 1300 814 870
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Content sections continue... */}
    </div>
  );
}
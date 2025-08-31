'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { generateSEO, generateLocalBusinessSchema, generateServiceSchema, generateFAQSchema } from '@/lib/seo';
import {  Clock, Shield, Building2, Store, Factory, Briefcase, Users, CheckCircle2, ArrowRight, AlertTriangle, FileText, MessageSquare} from 'lucide-react';

export default function CommercialServicesPage() {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const businessInfo = {
    name: 'Disaster Recovery',
    description: 'Professional commercial restoration services for businesses across Queensland. Minimizing downtime and protecting your business assets.',
    telephone: "",
    address: {
      streetAddress: 'Servicing All Areas',
      addressLocality: 'Brisbane',
      addressRegion: 'QLD',
      postalCode: '4000',
      addressCountry: 'AU'
    },
    hours: '24/7 Online Emergency Response',
    url: 'https://disasterrecovery.com.au',
    image: '/images/disaster-recovery-logo.jpg',
    priceRange: '$$-$$$'
  };

  const serviceSchema = generateServiceSchema({
    name: 'Commercial Restoration Services',
    description: 'Comprehensive disaster recovery services for Queensland businesses including offices, retail, warehouses, and industrial facilities.',
    provider: businessInfo.name,
    areaServed: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Ipswich', 'Logan', 'Redlands', 'Moreton Bay']
  });

  const faqs = [
    {
      question: 'How quickly can you respond to commercial emergencies?',
      answer: 'We offer 24/7 emergency response with teams typically on-site within 2 hours for urgent commercial disasters. Our rapid response minimizes business interruption and secondary damage.'
    },
    {
      question: 'Do you work with commercial insurance companies?',
      answer: 'Yes, we work directly with all major commercial insurers and can manage the entire claims process. We provide detailed documentation, photos, and reports required for commercial insurance claims.'
    },
    {
      question: 'Can you handle large-scale commercial projects?',
      answer: 'Absolutely. We have the resources, equipment, and expertise to handle projects of any size, from small offices to large industrial facilities and multi-story commercial buildings.'
    },
    {
      question: 'What industries do you service?',
      answer: 'We service all commercial sectors including offices, retail, hospitality, healthcare, education, manufacturing, warehouses, government facilities, and strata properties.'
    },
    {
      question: 'Do you provide temporary solutions during restoration?',
      answer: 'Yes, we offer temporary power, dehumidification, and climate control solutions to keep critical business operations running during the restoration process.'
    },
    {
      question: 'How do you minimize business disruption?',
      answer: 'We work around your schedule, offer after-hours service, create containment zones, and can phase work to allow continued operations in unaffected areas.'
    }
  ];

  const commercialSectors = [
    {
      icon: Building2,
      title: 'Office Buildings',
      description: 'Multi-level offices, corporate headquarters, professional suites',
      services: ['Water extraction', 'Fire restoration', 'Mould remediation', 'Deep cleaning']
    },
    {
      icon: Store,
      title: 'Retail & Hospitality',
      description: 'Shops, restaurants, hotels, shopping centres',
      services: ['Rapid response', 'Stock salvage', 'Odour removal', 'Sanitization']
    },
    {
      icon: Factory,
      title: 'Industrial & Warehouses',
      description: 'Factories, warehouses, distribution centres, manufacturing',
      services: ['Equipment cleaning', 'Structural drying', 'Hazmat cleanup', 'Large-scale restoration']
    },
    {
      icon: Briefcase,
      title: 'Healthcare & Education',
      description: 'Medical facilities, schools, universities, aged care',
      services: ['Biohazard cleaning', 'Infection control', 'Sensitive environment restoration', 'Compliance adherence']
    }
  ];

  const businessContinuitySteps = [
    {
      step: 1,
      title: 'Emergency Response',
      description: 'Immediate 24/7 response to secure property and prevent further damage',
      time: '0-2 hours'
    },
    {
      step: 2,
      title: 'Damage Assessment',
      description: 'Comprehensive evaluation and documentation for insurance purposes',
      time: '2-4 hours'
    },
    {
      step: 3,
      title: 'Business Impact Analysis',
      description: 'Identify critical areas and develop phased restoration plan',
      time: '4-8 hours'
    },
    {
      step: 4,
      title: 'Stabilization & Mitigation',
      description: 'Extract water, set up drying equipment, secure the property',
      time: '8-24 hours'
    },
    {
      step: 5,
      title: 'Contents Management',
      description: 'Inventory, pack-out, and restore salvageable business assets',
      time: '1-3 days'
    },
    {
      step: 6,
      title: 'Restoration & Reconstruction',
      description: 'Full restoration to pre-loss condition with minimal disruption',
      time: '3-30 days'
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(faqs)) }}
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-800/50 px-4 py-2 rounded-full mb-6">
              <Building2 className="h-5 w-5" />
              <span className="text-sm font-medium">Commercial Property Specialists</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Commercial Disaster Recovery Services
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Protecting Queensland businesses with rapid response restoration. 
              Minimizing downtime, maximizing recovery for offices, retail, industrial and healthcare facilities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => setShowQuoteDialog(true)}
              >
                <MessageSquare className="mr-2 h-5 w-5" />
                24/7 Commercial Response
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-blue-50">
                <FileText className="mr-2 h-5 w-5" />
                Insurance Direct Billing
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-400" />
                <span>2-Hour Response Time</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-400" />
                <span>Fully Licensed & Insured</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-orange-400" />
                <span>500+ Businesses Restored</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialised restoration solutions for every commercial sector across Queensland
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commercialSectors.map((sector, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-blue-200">
                <sector.icon className="h-12 w-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{sector.title}</h3>
                <p className="text-gray-600 mb-4">{sector.description}</p>
                <ul className="space-y-2">
                  {sector.services.map((service, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{service}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Business Continuity Process */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Business Continuity Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Systematic approach to minimize downtime and get your business operational quickly
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            {businessContinuitySteps.map((item, index) => (
              <div key={index} className="flex gap-4 mb-8 relative">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  {index < businessContinuitySteps.length - 1 && (
                    <div className="w-0.5 h-20 bg-blue-200 mx-auto mt-2" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <span className="text-sm text-blue-600 font-medium bg-blue-50 px-3 py-1 rounded-full">
                        {item.time}
                      </span>
                    </div>
                    <p className="text-gray-600">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Commercial Services */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Comprehensive Commercial Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Full-service restoration and recovery for businesses of all sizes
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <AlertTriangle className="h-10 w-10 text-orange-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Emergency Response</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>24/7 emergency hotline</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Rapid deployment teams</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Priority commercial response</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Temporary power solutions</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Building2 className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Property Restoration</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Structural drying & dehumidification</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Fire & smoke damage restoration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Commercial mould remediation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Complete reconstruction services</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Briefcase className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Business Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Insurance claim management</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Contents restoration & storage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Document & electronics recovery</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Inventory management systems</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Why Queensland Businesses Choose Us</h2>
              <p className="text-xl text-gray-600">
                Trusted by hundreds of commercial clients for professional disaster recovery
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">2 Hours</div>
                <div className="font-semibold mb-2">Average Response Time</div>
                <p className="text-gray-600">Rapid commercial emergency response across Brisbane and Southeast Queensland</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div className="font-semibold mb-2">Businesses Restored</div>
                <p className="text-gray-600">Extensive experience with commercial properties of all types and sizes</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">$50M+</div>
                <div className="font-semibold mb-2">Insurance Claims Managed</div>
                <p className="text-gray-600">Direct billing with all major commercial insurers</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">24/7</div>
                <div className="font-semibold mb-2">Emergency Availability</div>
                <p className="text-gray-600">Round-the-clock support when disaster strikes</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">100%</div>
                <div className="font-semibold mb-2">Licensed & Insured</div>
                <p className="text-gray-600">Fully certified for all commercial restoration work</p>
              </div>
              <div className="bg-white p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">15+</div>
                <div className="font-semibold mb-2">Years Experience</div>
                <p className="text-gray-600">Proven track record in commercial disaster recovery</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Recent Commercial Projects</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Successfully restoring Queensland businesses after major disasters
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="overflow-hidden">
              <div className="p-6">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                  Office Complex
                </div>
                <h3 className="text-xl font-bold mb-2">Brisbane CBD Office Tower</h3>
                <p className="text-gray-600 mb-4">
                  Major water damage across 5 floors. Restored in 14 days with zero business days lost.
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Services:</strong> Water extraction, structural drying, content restoration
                </div>
              </div>
            </Card>
            <Card className="overflow-hidden">
              <div className="p-6">
                <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                  Retail Chain
                </div>
                <h3 className="text-xl font-bold mb-2">Gold Coast Shopping Centre</h3>
                <p className="text-gray-600 mb-4">
                  Fire damage to 8 retail stores. Phased restoration allowed 6 stores to reopen in 7 days.
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Services:</strong> Fire restoration, smoke removal, reconstruction
                </div>
              </div>
            </Card>
            <Card className="overflow-hidden">
              <div className="p-6">
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                  Healthcare
                </div>
                <h3 className="text-xl font-bold mb-2">Medical Centre Ipswich</h3>
                <p className="text-gray-600 mb-4">
                  Storm damage and flooding. Priority restoration with full infection control protocols.
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Services:</strong> Emergency response, biohazard cleaning, full restoration
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Commercial Service Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rapid response commercial restoration across Southeast Queensland
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {['Brisbane CBD', 'Gold Coast', 'Sunshine Coast', 'Ipswich', 'Logan', 'Redlands', 'Moreton Bay', 'Toowoomba'].map((area) => (
              <div key={area} className="bg-white p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg">{area}</h3>
                <p className="text-sm text-gray-600 mt-1">24/7 Commercial Response</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Also servicing: Caboolture, Redcliffe, Cleveland, Wynnum, Carindale, Chermside, Indooroopilly, and all surrounding commercial areas
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Commercial Services FAQs</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-blue-900">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Protect Your Business with Professional Recovery</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't let disasters disrupt your operations. Get immediate commercial restoration support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => setShowQuoteDialog(true)}
            >
              <MessageSquare className="mr-2" />
              Use Our Online Form'
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-gray-100">
              <ArrowRight className="mr-2" />
              Request Commercial Assessment
            </Button>
          </div>
          <p className="mt-6 text-blue-200">
            Preferred restoration partner for Queensland's leading businesses
          </p>
        </div>
      </section>

      {/* Quote Dialog */}
      <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>24/7 Commercial Emergency Response</DialogTitle>
            <DialogDescription>
              Get immediate assistance for your business. Our commercial specialists are standing by.
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
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Priority commercial response</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Direct insurance billing available</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Minimize business interruption</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Free commercial assessment</span>
              </div>
            </div>
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              Request Immediate Response
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
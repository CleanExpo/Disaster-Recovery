'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { generateSEO, generateLocalBusinessSchema, generateServiceSchema, generateFAQSchema } from '@/lib/seo';
import { Phone, Clock, Shield, CloudRain, Wind, Zap, Home, Trees, CheckCircle2, ArrowRight, AlertTriangle, FileText, Droplets } from 'lucide-react';

export default function StormDamagePage() {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const businessInfo = {
    name: 'Disaster Recovery QLD',
    description: 'Emergency storm damage restoration services across Queensland. Rapid response for wind, hail, and flood damage recovery.',
    telephone: '1300 814 870',
    address: {
      streetAddress: 'Servicing All Areas',
      addressLocality: 'Brisbane',
      addressRegion: 'QLD',
      postalCode: '4000',
      addressCountry: 'AU'
    },
    hours: '24/7 Emergency Response',
    url: 'https://disasterrecovery.com.au',
    image: '/images/disaster-recovery-logo.jpg',
    priceRange: '$$-$$$'
  };

  const serviceSchema = generateServiceSchema({
    name: 'Storm Damage Restoration',
    description: 'Professional storm damage restoration including roof tarping, water extraction, tree removal, and complete property restoration after severe weather events.',
    provider: businessInfo.name,
    areaServed: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Ipswich', 'Logan', 'Redlands', 'Moreton Bay', 'Toowoomba'],
  });

  const faqs = [
    {
      question: 'What should I do immediately after storm damage?',
      answer: 'First, ensure everyone is safe and evacuate if necessary. Document all damage with photos/videos for insurance. Call us immediately at 1300 814 870 for emergency tarping and water extraction. Do not attempt repairs on damaged roofs or near fallen power lines.'
    },
    {
      question: 'Is storm damage covered by insurance in Queensland?',
      answer: 'Most home and contents insurance policies cover storm damage including wind, hail, and rain damage. We work directly with all major insurers and can help manage your claim from start to finish, providing all necessary documentation.'
    },
    {
      question: 'How quickly can you respond to storm emergencies?',
      answer: 'We maintain 24/7 emergency response teams specifically for storm events. During major storms, we deploy multiple crews and typically arrive within 2-4 hours for emergency tarping and water extraction to prevent further damage.'
    },
    {
      question: 'What types of storm damage do you handle?',
      answer: 'We handle all storm-related damage including roof damage, water intrusion, fallen trees, broken windows, flooding, hail damage, structural damage, and debris removal. Our teams are equipped for any scale of storm damage.'
    },
    {
      question: 'Can you help with temporary repairs?',
      answer: 'Yes, we provide emergency tarping, board-ups, and temporary repairs to secure your property immediately. This prevents further damage from weather exposure while permanent repairs are arranged.'
    },
    {
      question: 'Do you handle large-scale storm events?',
      answer: 'Absolutely. We have extensive experience with major Queensland storms, cyclones, and flooding events. We scale our response teams during severe weather warnings to handle multiple properties efficiently.'
    }
  ];

  const stormDamageTypes = [
    {
      icon: Wind,
      title: 'Wind Damage',
      description: 'Roof damage, structural impact, debris',
      services: ['Emergency roof tarping', 'Structural assessment', 'Debris removal', 'Window boarding']
    },
    {
      icon: Droplets,
      title: 'Water Damage',
      description: 'Flooding, roof leaks, water intrusion',
      services: ['Water extraction', 'Structural drying', 'Mould prevention', 'Content restoration']
    },
    {
      icon: CloudRain,
      title: 'Hail Damage',
      description: 'Roof, siding, window damage from hail',
      services: ['Damage assessment', 'Temporary protection', 'Insurance documentation', 'Full restoration']
    },
    {
      icon: Trees,
      title: 'Tree Damage',
      description: 'Fallen trees, branch impact, root damage',
      services: ['Safe tree removal', 'Structural repairs', 'Fence restoration', 'Landscape cleanup']
    }
  ];

  const emergencyResponseSteps = [
    {
      step: 1,
      title: 'Emergency Call',
      description: 'Contact our 24/7 storm response team for immediate assistance',
      time: 'Immediate'
    },
    {
      step: 2,
      title: 'Rapid Deployment',
      description: 'Emergency crew dispatched with tarps, pumps, and equipment',
      time: '0-2 hours'
    },
    {
      step: 3,
      title: 'Property Securing',
      description: 'Roof tarping, board-ups, and water extraction to prevent further damage',
      time: '2-4 hours'
    },
    {
      step: 4,
      title: 'Damage Assessment',
      description: 'Complete evaluation and documentation for insurance claims',
      time: '4-24 hours'
    },
    {
      step: 5,
      title: 'Water Mitigation',
      description: 'Industrial drying equipment deployed to prevent mould growth',
      time: '24-48 hours'
    },
    {
      step: 6,
      title: 'Full Restoration',
      description: 'Complete repairs and restoration to pre-storm condition',
      time: '3-30 days'
    }
  ];

  const stormPreparationTips = [
    'Keep emergency kit with torch, radio, and first aid supplies',
    'Trim trees and secure loose items before storm season',
    'Know your insurance policy coverage and excess',
    'Document property condition before storms with photos',
    'Have our emergency number saved: 1300 814 870',
    'Create evacuation plan and know local emergency shelters'
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
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-500/20 px-4 py-2 rounded-full mb-6">
              <CloudRain className="h-5 w-5" />
              <span className="text-sm font-medium">24/7 Storm Emergency Response</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Storm Damage Restoration Queensland
            </h1>
            <p className="text-xl mb-8 text-slate-200">
              Immediate response for storm, cyclone, and severe weather damage. 
              Emergency tarping, water extraction, and complete restoration across Southeast Queensland.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => setShowQuoteDialog(true)}
              >
                <Phone className="mr-2 h-5 w-5" />
                Emergency Storm Response
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-slate-900 hover:bg-slate-50">
                <FileText className="mr-2 h-5 w-5" />
                Insurance Claim Help
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-orange-400" />
                <span>Rapid Response Teams</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-400" />
                <span>Insurance Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-400" />
                <span>24/7 Availability</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Storm Damage Types */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Storm Damage We Handle</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete restoration services for all types of severe weather damage
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stormDamageTypes.map((type, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow border-2 hover:border-orange-200">
                <type.icon className="h-12 w-12 text-orange-500 mb-4" />
                <h3 className="text-xl font-bold mb-2">{type.title}</h3>
                <p className="text-gray-600 mb-4">{type.description}</p>
                <ul className="space-y-2">
                  {type.services.map((service, idx) => (
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

      {/* Emergency Response Process */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Storm Response Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Systematic emergency response to secure your property and begin restoration immediately
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            {emergencyResponseSteps.map((item, index) => (
              <div key={index} className="flex gap-4 mb-8 relative">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">
                    {item.step}
                  </div>
                  {index < emergencyResponseSteps.length - 1 && (
                    <div className="w-0.5 h-20 bg-orange-200 mx-auto mt-2" />
                  )}
                </div>
                <div className="flex-grow">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold">{item.title}</h3>
                      <span className="text-sm text-orange-600 font-medium bg-orange-50 px-3 py-1 rounded-full">
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

      {/* Emergency Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Complete Storm Recovery Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From emergency response to full restoration
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <AlertTriangle className="h-10 w-10 text-red-500 mb-4" />
              <h3 className="text-xl font-bold mb-3">Emergency Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>24/7 emergency roof tarping</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Emergency board-up services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Immediate water extraction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Power restoration coordination</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Home className="h-10 w-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Structural Repairs</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Roof repair and replacement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Wall and ceiling restoration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Window and door replacement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Foundation and structural repairs</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Droplets className="h-10 w-10 text-cyan-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Water Damage Control</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Flood water extraction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Structural drying systems</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Mould prevention treatment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Humidity control systems</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Trees className="h-10 w-10 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Debris & Tree Services</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Fallen tree removal</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Branch and debris cleanup</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Fence and structure clearing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Safe disposal services</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <FileText className="h-10 w-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Insurance Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Direct insurer billing</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Detailed damage reports</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Photo documentation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Claim assistance</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Shield className="h-10 w-10 text-indigo-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Prevention & Protection</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Storm preparation services</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Weatherproofing upgrades</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Drainage improvements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span>Risk assessments</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Storm Season Preparation */}
      <section className="py-20 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Storm Season Preparation Tips</h2>
              <p className="text-xl text-gray-600">
                Be prepared before the storm hits - Queensland storm season runs October to April
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <AlertTriangle className="h-6 w-6 text-orange-500" />
                  Before Storm Season
                </h3>
                <ul className="space-y-3">
                  {stormPreparationTips.slice(0, 3).map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <Phone className="h-6 w-6 text-blue-600" />
                  Emergency Preparation
                </h3>
                <ul className="space-y-3">
                  {stormPreparationTips.slice(3).map((tip, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{tip}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </div>
            <div className="mt-8 p-6 bg-white rounded-lg shadow-lg">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0">
                  <Phone className="h-12 w-12 text-orange-500" />
                </div>
                <div className="flex-grow">
                  <h3 className="text-2xl font-bold mb-2">Save Our Emergency Number</h3>
                  <p className="text-gray-600 mb-2">
                    Program our 24/7 emergency line into your phone before storm season
                  </p>
                  <p className="text-3xl font-bold text-orange-600">1300 814 870</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Storm Events */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Recent Queensland Storm Response</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Trusted by thousands of Queenslanders during severe weather events
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <Card className="overflow-hidden">
              <div className="p-6">
                <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                  Severe Storm
                </div>
                <h3 className="text-xl font-bold mb-2">Brisbane Supercell 2024</h3>
                <p className="text-gray-600 mb-4">
                  Responded to 150+ properties with hail and wind damage. Emergency tarping completed within 24 hours.
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Response:</strong> 150+ properties secured
                </div>
              </div>
            </Card>
            <Card className="overflow-hidden">
              <div className="p-6">
                <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                  Flooding
                </div>
                <h3 className="text-xl font-bold mb-2">SEQ Floods 2024</h3>
                <p className="text-gray-600 mb-4">
                  Major flood response across Brisbane, Ipswich and Logan. Water extraction and drying for 200+ homes.
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Response:</strong> 200+ flood-affected homes
                </div>
              </div>
            </Card>
            <Card className="overflow-hidden">
              <div className="p-6">
                <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                  Cyclone
                </div>
                <h3 className="text-xl font-bold mb-2">Ex-TC Jasper Impact</h3>
                <p className="text-gray-600 mb-4">
                  Wind and rain damage across North Queensland. Deployed teams for immediate response and recovery.
                </p>
                <div className="text-sm text-gray-500">
                  <strong>Response:</strong> Multi-team deployment
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
            <h2 className="text-4xl font-bold mb-4">Storm Response Coverage Areas</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rapid storm damage response across Southeast Queensland
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Ipswich', 'Logan', 'Redlands', 'Moreton Bay', 'Toowoomba'].map((area) => (
              <div key={area} className="bg-white p-4 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-semibold text-lg">{area}</h3>
                <p className="text-sm text-gray-600 mt-1">24/7 Storm Response</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <p className="text-gray-600">
              Extended coverage: Caboolture, Redcliffe, Cleveland, Wynnum, Beenleigh, Beaudesert, and all surrounding areas
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Storm Damage FAQs</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-slate-900">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Storm Damage? We\'re Here 24/7</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don\'t wait for more damage. Get immediate storm response and start your restoration now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-white text-orange-600 hover:bg-gray-100"
              onClick={() => setShowQuoteDialog(true)}
            >
              <Phone className="mr-2" />
              Call 1300 814 870 Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
              <ArrowRight className="mr-2" />
              Request Emergency Response
            </Button>
          </div>
          <p className="mt-6 text-orange-100">
            Queensland\'s trusted storm damage restoration specialists since 2009
          </p>
        </div>
      </section>

      {/* Quote Dialog */}
      <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>24/7 Storm Emergency Response</DialogTitle>
            <DialogDescription>
              Get immediate help for storm damage. Our emergency teams are ready to respond.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg">
              <Phone className="h-5 w-5 text-orange-600" />
              <div>
                <p className="font-semibold">Emergency Hotline</p>
                <p className="text-2xl font-bold text-orange-600">1300 814 870</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Immediate emergency response</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Roof tarping & board-ups</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Insurance claim assistance</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Free damage assessment</span>
              </div>
            </div>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              Request Emergency Help Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
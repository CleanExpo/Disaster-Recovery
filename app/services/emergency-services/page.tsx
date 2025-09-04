'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { generateSEO, generateLocalBusinessSchema, generateServiceSchema, generateFAQSchema } from '@/lib/seo';
import {  Clock, Shield, Siren, AlertTriangle, Zap, Droplets, Flame, Wind, Users, CheckCircle2, ArrowRight, MapPin, Car, MessageSquare} from 'lucide-react';

export default function EmergencyServicesPage() {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const businessInfo = {
    name: 'Disaster Recovery',
    description: '24/7 emergency disaster response services across Queensland. Immediate response for water, fire, storm, and hazardous material incidents.',
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
    name: '24/7 Emergency Disaster Response',
    description: 'Round-the-clock emergency response for all disaster types including floods, fires, storms, and hazardous incidents across Queensland.',
    provider: businessInfo.name,
    areaServed: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Ipswich', 'Logan', 'Redlands', 'Moreton Bay', 'Toowoomba', 'Cairns', 'Townsville']
  });

  const faqs = [
    {
      question: 'What constitutes a disaster emergency?',
      answer: 'A disaster emergency includes any sudden event threatening property or safety such as flooding, fire damage, storm damage, sewage overflow, major water leaks, hazardous spills, or structural damage. If you\'re unsure, call us - we\'ll assess the situation immediately.'
    },
    {
      question: 'How fast can you respond to emergencies?',
      answer: 'Our emergency response teams are available 24/7/365 with average response times of 30-60 minutes in metro areas and 2-4 hours in regional Queensland. We prioritize based on severity and safety risks.'
    },
    {
      question: 'Do you work directly with insurance companies?',
      answer: 'Yes, we\'re approved contractors for all major insurers. We can manage your entire claim process, provide detailed documentation, and bill insurers directly to minimize your stress during emergencies.'
    },
    {
      question: 'What should I do while waiting for emergency response?',
      answer: 'Ensure everyone\'s safety first - evacuate if necessary. Turn off electricity and water if safe to do so. Document damage with photos/videos. Move valuables to dry areas if possible. Never enter flood water or fire-damaged areas.'
    },
    {
      question: 'Are your emergency services available statewide?',
      answer: 'Yes, we provide emergency response across Queensland with teams in major centres and mobile units for regional areas. We coordinate with local emergency services and can scale our response for major disasters.'
    },
    {
      question: 'What equipment do you bring for emergencies?',
      answer: 'Our emergency vehicles carry water extraction pumps, industrial fans and dehumidifiers, generators, emergency lighting, tarps and boarding materials, safety equipment, and specialised cleaning equipment for immediate response.'
    }
  ];

  const emergencyTypes = [
    {
      icon: Droplets,
      title: 'Flood & Water Emergencies',
      severity: 'CRITICAL',
      colour: 'text-blue-600',
      bgColor: 'bg-blue-100',
      situations: ['Burst pipes', 'Flash flooding', 'Sewage overflow', 'Roof leaks']
    },
    {
      icon: Flame,
      title: 'Fire & Smoke Damage',
      severity: 'EXTREME',
      colour: 'text-red-600',
      bgColor: 'bg-red-100',
      situations: ['House fires', 'Smoke damage', 'Soot contamination', 'Electrical fires']
    },
    {
      icon: Wind,
      title: 'Storm & Wind Damage',
      severity: 'URGENT',
      colour: 'text-blue-700',
      bgColor: 'bg-orange-100',
      situations: ['Cyclones', 'Hail damage', 'Fallen trees', 'Structural damage']
    },
    {
      icon: AlertTriangle,
      title: 'Hazardous Materials',
      severity: 'DANGEROUS',
      colour: 'text-purple-600',
      bgColor: 'bg-purple-100',
      situations: ['Chemical spills', 'Biohazards', 'Asbestos', 'Crime scenes']
    }
  ];

  const responseProtocol = [
    {
      time: '0-5 min',
      action: 'Emergency Call Received',
      details: 'Trained operator assesses situation and dispatches appropriate team'
    },
    {
      time: '5-15 min',
      action: 'Team Mobilization',
      details: 'Emergency crew alerted, vehicles loaded with specialised equipment'
    },
    {
      time: '30-60 min',
      action: 'On-Site Arrival',
      details: 'Team arrives, secures area, begins immediate mitigation'
    },
    {
      time: '1-2 hours',
      action: 'Damage Control',
      details: 'Primary threats neutralized, property secured, extraction begins'
    },
    {
      time: '2-4 hours',
      action: 'Stabilization',
      details: 'Drying equipment deployed, temporary repairs, documentation'
    },
    {
      time: '24-48 hours',
      action: 'Recovery Planning',
      details: 'Full assessment, insurance coordination, restoration timeline'
    }
  ];

  const emergencyFeatures = [
    {
      title: '30-Minute Metro Response',
      description: 'Rapid deployment teams across Brisbane and major centres'
    },
    {
      title: '200+ Emergency Vehicles',
      description: 'Fully equipped fleet ready for immediate dispatch'
    },
    {
      title: 'Certified Emergency Teams',
      description: 'IICRC trained professionals with hazmat certifications'
    },
    {
      title: 'Direct Insurance Billing',
      description: 'We handle all insurance paperwork and claims'
    },
    {
      title: 'Industrial Equipment',
      description: 'Commercial-grade extraction and drying systems'
    },
    {
      title: 'Coordination Support',
      description: 'Work with fire, police, and emergency services'
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
      <section className="relative bg-gradient-to-r from-red-900 to-orange-800 text-white py-24">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-red-800/50 px-4 py-2 rounded-full mb-6 animate-pulse">
              <Siren className="h-5 w-5" />
              <span className="text-sm font-bold uppercase tracking-wide">24/7 Online Emergency Response Active</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Emergency Disaster Response Queensland
            </h1>
            <p className="text-xl mb-8 text-red-100">
              Immediate 24/7 response for all disaster emergencies. Water damage, fire, storms, hazmat - 
              we\'re your first call when disaster strikes anywhere in Queensland.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button 
                size="lg" 
                className="bg-white text-red-900 hover:bg-red-50 shadow-xl"
                onClick={() => setShowQuoteDialog(true)}
              >
                <MessageSquare className="mr-2 h-5 w-5 animate-pulse" />
                EMERGENCY: online support
              </Button>
              <Button size="lg" className="bg-[#FF0000] hover:bg-[#CC0000] text-white border-white ">
                <Zap className="mr-2 h-5 w-5" />
                Immediate Response Available
              </Button>
            </div>
            <div className="flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500 animate-pulse" />
                <span className="font-semibold">24/7/365 Available</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">All QLD Areas</span>
              </div>
              <div className="flex items-center gap-2">
                <Car className="h-5 w-5 text-blue-500" />
                <span className="font-semibold">30min Response</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Types Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Emergency Response Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Specialised teams for every type of disaster emergency
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {emergencyTypes.map((type, index) => (
              <Card key={index} className="relative overflow-hidden hover:shadow-2xl transition-all border-2">
                <div className={`absolute top-0 right-0 ${type.bgColor} ${type.colour} px-3 py-1 text-xs font-bold rounded-bl-lg`}>
                  {type.severity}
                </div>
                <div className="p-6">
                  <type.icon className={`h-12 w-12 ${type.colour} mb-4`} />
                  <h3 className="text-xl font-bold mb-3">{type.title}</h3>
                  <ul className="space-y-2">
                    {type.situations.map((situation, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span>{situation}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full mt-4" 
                    variant="outline"
                    onClick={() => setShowQuoteDialog(true)}
                  >
                    Get Emergency Help
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Response Protocol Timeline */}
      <section className="py-20 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Emergency Response Protocol</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our systematic approach ensures rapid, effective disaster response
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {responseProtocol.map((step, index) => (
                <div key={index} className="flex gap-4 mb-6 relative">
                  <div className="flex-shrink-0 w-24 text-right">
                    <span className="text-sm font-bold text-red-600">{step.time}</span>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-4 h-4 bg-red-600 rounded-full"></div>
                    {index < responseProtocol.length - 1 && (
                      <div className="w-0.5 h-24 bg-red-200 mx-auto mt-2"></div>
                    )}
                  </div>
                  <div className="flex-grow pb-8">
                    <Card className="p-4 hover:shadow-lg transition-shadow">
                      <h3 className="font-bold text-lg mb-1">{step.action}</h3>
                      <p className="text-gray-600">{step.details}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Features */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Why We\'re Queensland\'s #1 Emergency Response</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Unmatched capabilities for disaster emergencies
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {emergencyFeatures.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <h3 className="text-xl font-bold mb-2 text-red-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">15+</div>
              <div className="text-sm text-gray-600 mt-1">Years Experience</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">10,000+</div>
              <div className="text-sm text-gray-600 mt-1">Emergencies Handled</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">24/7</div>
              <div className="text-sm text-gray-600 mt-1">Always Available</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-red-600">30min</div>
              <div className="text-sm text-gray-600 mt-1">Metro Response</div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Checklist */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Emergency Action Checklist</h2>
              <p className="text-xl text-gray-600">
                What to do when disaster strikes
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-8 border-2 border-red-200">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  Immediate Actions
                </h3>
                <ol className="space-y-3">
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">1</span>
                    <span>Ensure safety - evacuate if necessary</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">2</span>
                    <span>Call emergency services if life-threatening</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">3</span>
                    <span>Call us at online support for property emergencies</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">4</span>
                    <span>Turn off utilities if safe (power, gas, water)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="flex-shrink-0 w-8 h-8 bg-red-600 text-white rounded-full flex items-center justify-center font-bold">5</span>
                    <span>Document damage with photos/videos</span>
                  </li>
                </ol>
              </Card>
              <Card className="p-8 border-2 border-blue-200">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Shield className="h-8 w-8 text-blue-600" />
                  While Waiting for Help
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Move valuables to safe, dry areas</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Place towels to contain water spread</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Open windows if safe (for ventilation)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Keep family and pets away from damage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>Gather insurance documents</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Coverage Map */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Statewide Emergency Coverage</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Rapid response teams strategically located across Queensland
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 border-2 border-red-200">
                <h3 className="font-bold text-lg mb-4 text-red-900">Southeast Queensland</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-600" />
                    Brisbane CBD & Suburbs
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-600" />
                    Gold Coast & Hinterland
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-600" />
                    Sunshine Coast
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-600" />
                    Ipswich & Western Corridor
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-600" />
                    Logan & Redlands
                  </li>
                </ul>
              </Card>
              <Card className="p-6 border-2 border-orange-200">
                <h3 className="font-bold text-lg mb-4 text-orange-900">Regional Centres</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-700" />
                    Toowoomba & Darling Downs
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-700" />
                    Bundaberg & Wide Bay
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-700" />
                    Rockhampton & Capricornia
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-700" />
                    Mackay & Whitsundays
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-700" />
                    Gladstone & Central QLD
                  </li>
                </ul>
              </Card>
              <Card className="p-6 border-2 border-blue-200">
                <h3 className="font-bold text-lg mb-4 text-blue-900">North Queensland</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    Townsville & Magnetic Island
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    Cairns & Tablelands
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    Port Douglas & Daintree
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    Mount Isa & Outback
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-blue-600" />
                    Thursday Island & Torres Strait
                  </li>
                </ul>
              </Card>
            </div>
            <div className="mt-8 p-6 bg-red-50 rounded-lg text-center">
              <p className="text-lg font-semibold text-red-900">
                Emergency Response Available 24/7 in All Areas
              </p>
              <p className="text-gray-600 mt-2">
                Mobile emergency units deployed for remote and rural emergencies
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Emergency Services FAQs</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-red-900">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-900 to-orange-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <Siren className="h-16 w-16 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl font-bold mb-6">Emergency? Don\'t Wait - Submit Form Now!</h2>
            <p className="text-xl mb-8">
              Every minute counts in a disaster. Get immediate professional help 24/7.
            </p>
            <div className="bg-white/10 backdrop-blur rounded-lg p-8 mb-8">
              <p className="text-2xl font-bold mb-4">24/7 EMERGENCY HOTLINE</p>
              <p className="text-5xl font-bold">online support</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-white text-red-900 hover:bg-gray-100"
                onClick={() => setShowQuoteDialog(true)}
              >
                <MessageSquare className="mr-2 animate-pulse" />
                Call Emergency Line Now
              </Button>
              <Button size="lg" className="bg-[#FF0000] hover:bg-[#CC0000] text-white border-white ">
                <ArrowRight className="mr-2" />
                Request Immediate Response
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Dialog */}
      <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Siren className="h-5 w-5 text-red-600 animate-pulse" />
              24/7 Online Emergency Response
            </DialogTitle>
            <DialogDescription>
              Immediate disaster response available. Our emergency teams are standing by.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border-2 border-red-200">
              <MessageSquare className="h-6 w-6 text-red-600 animate-pulse" />
              <div>
                <p className="font-semibold">Emergency Hotline</p>
                <p className="text-2xl font-bold text-red-600">online support</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Immediate emergency dispatch</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>All disaster types covered</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Insurance approved contractor</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Available 24/7/365</span>
              </div>
            </div>
            <Button className="w-full bg-red-600 hover:bg-red-700">
              Request Emergency Response Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
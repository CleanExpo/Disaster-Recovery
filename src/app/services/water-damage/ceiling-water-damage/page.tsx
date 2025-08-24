'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { generateSEO, generateLocalBusinessSchema, generateServiceSchema, generateFAQSchema } from '@/lib/seo';
import { Phone, Clock, Shield, Droplets, AlertTriangle, Home, ChevronDown, CheckCircle2, ArrowRight, XCircle, AlertCircle, Zap } from 'lucide-react';

export default function CeilingWaterDamagePage() {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const businessInfo = {
    name: 'Disaster Recovery QLD - Ceiling Water Damage Specialists',
    description: 'Expert ceiling water damage repair and restoration in Queensland. Emergency response for ceiling leaks, sagging, and collapse prevention.',
    telephone: '1300 814 870',
    address: {
      streetAddress: 'Servicing All Areas',
      addressLocality: 'Brisbane',
      addressRegion: 'QLD',
      postalCode: '4000',
      addressCountry: 'AU'
    },
    hours: '24/7 Emergency Response',
    url: 'https://disasterrecovery.com.au/services/water-damage/ceiling-water-damage',
    image: '/images/ceiling-water-damage.jpg',
    priceRange: '$$-$$$'
  };

  const serviceSchema = generateServiceSchema({
    name: 'Ceiling Water Damage Repair & Restoration',
    description: 'Professional ceiling water damage restoration including leak detection, structural drying, mould prevention, and complete ceiling repairs across Brisbane and Queensland.',
    provider: businessInfo.name,
    areaServed: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Ipswich', 'Logan', 'Redlands', 'Moreton Bay'],
  });

  const faqs = [
    {
      question: 'Is ceiling water damage dangerous?',
      answer: 'Yes, ceiling water damage can be extremely dangerous. It can lead to ceiling collapse, electrical hazards, mould growth, and structural weakening. Sagging or bulging ceilings should be addressed immediately by professionals to prevent injury and further damage.'
    },
    {
      question: 'How much does ceiling water damage repair cost?',
      answer: 'Ceiling water damage repairs typically range from $500-$5,000 depending on the extent. Minor stains might cost $500-$1,500, while extensive damage requiring ceiling replacement can reach $5,000+. Most insurance policies cover sudden water damage to ceilings.'
    },
    {
      question: 'Can I paint over water stains on my ceiling?',
      answer: 'No, never paint over water stains without addressing the source and properly treating the area. The leak must be fixed, the ceiling dried completely, and any mould treated. Painting over wet areas traps moisture and worsens damage.'
    },
    {
      question: 'How long does it take for ceiling water damage to show?',
      answer: 'Visible signs like stains can appear within 24-48 hours of a leak. However, damage may be occurring for weeks before becoming visible. Brown rings, sagging, or peeling paint are common first signs of ceiling water damage.'
    },
    {
      question: 'Will my ceiling collapse from water damage?',
      answer: 'Ceilings can collapse if water damage is severe or prolonged. Warning signs include visible sagging, cracks, or bulging. If you notice these signs, evacuate the area immediately and call professionals. We provide emergency ceiling stabilization.'
    },
    {
      question: 'Does insurance cover ceiling water damage?',
      answer: 'Most home insurance covers sudden and accidental ceiling water damage from burst pipes, storms, or roof leaks. However, damage from poor maintenance or gradual leaks may not be covered. We help document damage for successful claims.'
    }
  ];

  const ceilingDamageTypes = [
    {
      type: 'Water Stains',
      severity: 'Mild',
      signs: 'Yellow or brown rings, discoloration',
      action: 'Investigate source, dry and repaint',
      timeline: '2-3 days'
    },
    {
      type: 'Sagging Ceiling',
      severity: 'Serious',
      signs: 'Visible drooping, soft spots',
      action: 'Immediate support, water removal',
      timeline: '24-48 hours critical'
    },
    {
      type: 'Active Dripping',
      severity: 'Urgent',
      signs: 'Water drops, wet patches spreading',
      action: 'Stop leak source, contain water',
      timeline: 'Immediate response needed'
    },
    {
      type: 'Ceiling Bubbling',
      severity: 'Moderate',
      signs: 'Paint bubbles, plaster lifting',
      action: 'Drain trapped water carefully',
      timeline: '1-2 days'
    },
    {
      type: 'Mould Growth',
      severity: 'Health Risk',
      signs: 'Black/green spots, musty smell',
      action: 'Professional mould remediation',
      timeline: '48-72 hours to prevent spread'
    },
    {
      type: 'Structural Damage',
      severity: 'Critical',
      signs: 'Cracks, separation, bowing',
      action: 'Evacuate area, emergency repair',
      timeline: 'Immediate evacuation'
    }
  ];

  const commonCauses = [
    {
      cause: 'Roof Leaks',
      percentage: '40%',
      details: 'Damaged tiles, flashing failures, storm damage',
      prevention: 'Annual roof inspections, gutter maintenance'
    },
    {
      cause: 'Plumbing Leaks',
      percentage: '35%',
      details: 'Burst pipes, leaking joints, bathroom leaks',
      prevention: 'Regular plumbing checks, pressure monitoring'
    },
    {
      cause: 'AC Condensation',
      percentage: '15%',
      details: 'Blocked drains, overflow pans, poor installation',
      prevention: 'AC servicing, drain line cleaning'
    },
    {
      cause: 'Storm Damage',
      percentage: '10%',
      details: 'Heavy rain, wind damage, hail impact',
      prevention: 'Storm preparation, immediate repairs'
    }
  ];

  const restorationProcess = [
    {
      step: 1,
      title: 'Emergency Response',
      description: 'Immediate assessment and safety evaluation',
      actions: ['Evacuate if necessary', 'Stop water source', 'Document damage']
    },
    {
      step: 2,
      title: 'Water Extraction',
      description: 'Remove water from ceiling cavity and affected areas',
      actions: ['Controlled drainage', 'Cavity pumping', 'Content protection']
    },
    {
      step: 3,
      title: 'Structural Drying',
      description: 'Industrial drying to prevent further damage',
      actions: ['Inject drying systems', 'Dehumidification', 'Moisture monitoring']
    },
    {
      step: 4,
      title: 'Damage Assessment',
      description: 'Evaluate structural integrity and repair needs',
      actions: ['Inspect framing', 'Check insulation', 'Test for mould']
    },
    {
      step: 5,
      title: 'Mould Prevention',
      description: 'Treat areas to prevent mould growth',
      actions: ['Antimicrobial application', 'HEPA filtration', 'Air quality testing']
    },
    {
      step: 6,
      title: 'Ceiling Restoration',
      description: 'Repair or replace damaged ceiling materials',
      actions: ['Plaster repairs', 'Painting', 'Texture matching']
    }
  ];

  const warningSignsToWatch = [
    'Discolored patches or stains on ceiling',
    'Peeling or bubbling paint',
    'Sagging or bowing ceiling sections',
    'Visible water drops or active leaking',
    'Musty or damp odours from above',
    'Cracks appearing in ceiling plaster',
    'Soft spots when gently pressed',
    'Sounds of dripping in ceiling cavity'
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
      <section className="relative bg-gradient-to-r from-slate-900 to-slate-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-600/90 px-4 py-2 rounded-full mb-6">
              <ChevronDown className="h-5 w-5 animate-bounce" />
              <span className="text-sm font-bold">CEILING WATER DAMAGE EXPERTS</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Ceiling Water Damage Repair Brisbane
            </h1>
            <p className="text-xl mb-8 text-slate-200">
              Emergency ceiling leak repairs and restoration. Prevent collapse, stop leaks, 
              and restore your ceiling to perfect condition. Available 24/7 across Queensland.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-orange-600 hover:bg-orange-700 text-white"
                onClick={() => setShowQuoteDialog(true)}
              >
                <Phone className="mr-2 h-5 w-5" />
                Emergency: 1300 814 870
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-slate-900 hover:bg-slate-50">
                <AlertTriangle className="mr-2 h-5 w-5" />
                Report Ceiling Damage
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-orange-400" />
                <span>Fast Response</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-400" />
                <span>Insurance Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Home className="h-5 w-5 text-orange-400" />
                <span>Structural Experts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Banner */}
      <section className="bg-red-600 text-white py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="h-6 w-6 animate-pulse" />
            <p className="font-semibold text-center">
              WARNING: Sagging or bulging ceilings can collapse suddenly. Evacuate the area and call immediately.
            </p>
            <AlertTriangle className="h-6 w-6 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Damage Types Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Types of Ceiling Water Damage</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Identify your ceiling damage type for appropriate action
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {ceilingDamageTypes.map((item, index) => (
              <Card key={index} className={`p-6 hover:shadow-xl transition-shadow border-2 ${
                item.severity === 'Critical' ? 'border-red-500' : 
                item.severity === 'Serious' ? 'border-orange-500' :
                item.severity === 'Urgent' ? 'border-yellow-500' : 'border-gray-200'
              }`}>
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-lg font-bold">{item.type}</h3>
                  <span className={`px-2 py-1 rounded text-xs font-semibold ${
                    item.severity === 'Critical' ? 'bg-red-100 text-red-700' :
                    item.severity === 'Serious' ? 'bg-orange-100 text-orange-700' :
                    item.severity === 'Urgent' ? 'bg-yellow-100 text-yellow-700' :
                    item.severity === 'Health Risk' ? 'bg-purple-100 text-purple-700' :
                    'bg-blue-100 text-blue-700'
                  }`}>
                    {item.severity}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Signs:</strong> {item.signs}
                </p>
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Action:</strong> {item.action}
                </p>
                <p className="text-sm font-semibold text-orange-600">
                  Timeline: {item.timeline}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Common Causes */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Common Causes of Ceiling Water Damage</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {commonCauses.map((item, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold">{item.cause}</h3>
                    <span className="text-2xl font-bold text-blue-600">{item.percentage}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{item.details}</p>
                  <div className="pt-3 border-t">
                    <p className="text-sm">
                      <strong className="text-green-600">Prevention:</strong> {item.prevention}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Restoration Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Our Ceiling Restoration Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional 6-step process to completely restore water-damaged ceilings
            </p>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restorationProcess.map((item, index) => (
                <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-lg font-bold">{item.title}</h3>
                  </div>
                  <p className="text-gray-600 mb-3">{item.description}</p>
                  <ul className="space-y-1">
                    {item.actions.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Safety Alert */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 border-2 border-orange-300 bg-white">
              <div className="text-center mb-6">
                <AlertCircle className="h-12 w-12 text-orange-600 mx-auto mb-3" />
                <h2 className="text-2xl font-bold">Ceiling Safety Guidelines</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-bold mb-3 text-red-600">DO NOT:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Stand under sagging ceilings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Attempt DIY repairs on wet ceilings</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Ignore electrical fixtures near water</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>Paint over water damage</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-bold mb-3 text-green-600">DO:</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Evacuate area if ceiling is sagging</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Turn off electricity to affected areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Place buckets under active leaks</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Call professionals immediately</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-6 text-center">
                <Button 
                  size="lg"
                  className="bg-orange-600 hover:bg-orange-700"
                  onClick={() => setShowQuoteDialog(true)}
                >
                  <Phone className="mr-2" />
                  Get Emergency Help Now
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Early Warning Signs to Watch</h2>
            <Card className="p-8 bg-blue-50">
              <p className="text-center mb-6 text-gray-700">
                Early detection prevents major damage and ceiling collapse
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {warningSignsToWatch.map((sign, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                    <span className="text-gray-700">{sign}</span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Cost Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Ceiling Repair Costs & Insurance</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Typical Repair Costs</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Water stain treatment:</span>
                    <span className="font-semibold">$300 - $800</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Small area repair (1-2m²):</span>
                    <span className="font-semibold">$500 - $1,500</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Large area repair (5-10m²):</span>
                    <span className="font-semibold">$1,500 - $3,500</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Full ceiling replacement:</span>
                    <span className="font-semibold">$3,000 - $8,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Mould remediation add-on:</span>
                    <span className="font-semibold">$500 - $2,000</span>
                  </li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Insurance Coverage Tips</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Document with photos immediately</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Keep all repair receipts and reports</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Report damage within 48 hours</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Get professional assessment report</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">We handle direct insurance billing</p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  Get Insurance Quote
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Ceiling Water Damage FAQs</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-slate-900">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-slate-900 to-slate-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <ChevronDown className="h-12 w-12 mx-auto mb-4 animate-bounce" />
          <h2 className="text-3xl font-bold mb-6">Don\'t Risk Ceiling Collapse</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Water-damaged ceilings are dangerous. Get professional help immediately to prevent injury and costly damage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-orange-600 hover:bg-orange-700"
              onClick={() => setShowQuoteDialog(true)}
            >
              <Phone className="mr-2" />
              Call 1300 814 870 Now
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-slate-900 hover:bg-gray-100">
              <Zap className="mr-2" />
              Request Urgent Inspection
            </Button>
          </div>
        </div>
      </section>

      {/* Quote Dialog */}
      <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              Ceiling Water Damage Emergency
            </DialogTitle>
            <DialogDescription>
              Get immediate help for ceiling leaks and water damage. Safety is our priority.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 p-3 bg-orange-50 rounded-lg border-2 border-orange-200">
              <Phone className="h-6 w-6 text-orange-600" />
              <div>
                <p className="font-semibold">24/7 Emergency Line</p>
                <p className="text-2xl font-bold text-orange-600">1300 814 870</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Immediate safety assessment</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Ceiling stabilization services</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Insurance documentation</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Complete restoration service</span>
              </div>
            </div>
            <Button className="w-full bg-orange-600 hover:bg-orange-700">
              Get Emergency Response
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
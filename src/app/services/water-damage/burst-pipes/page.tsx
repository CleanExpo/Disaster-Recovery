'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { generateSEO, generateLocalBusinessSchema, generateServiceSchema, generateFAQSchema } from '@/lib/seo';
import { Phone, Clock, Shield, Droplets, AlertTriangle, Wrench, Home, CheckCircle2, ArrowRight, XCircle, Gauge } from 'lucide-react';

export default function BurstPipesPage() {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const businessInfo = {
    name: 'Disaster Recovery - Burst Pipe Emergency Services',
    description: 'Emergency burst pipe repair and water damage restoration in Queensland. 24/7 response for pipe bursts, leaks, and flooding.',
    telephone: '1300 814 870',
    address: {
      streetAddress: 'Servicing All Areas',
      addressLocality: 'Brisbane',
      addressRegion: 'QLD',
      postalCode: '4000',
      addressCountry: 'AU'
    },
    hours: '24/7 Emergency Response',
    url: 'https://disasterrecovery.com.au/services/water-damage/burst-pipes',
    image: '/images/burst-pipe-emergency.jpg',
    priceRange: '$$-$$$'
  };

  const serviceSchema = generateServiceSchema({
    name: 'Burst Pipe Emergency Repair & Water Damage Restoration',
    description: 'Immediate response for burst pipes, emergency plumbing, water extraction, and complete restoration services across Brisbane and Queensland.',
    provider: businessInfo.name,
    areaServed: ['Brisbane', 'Gold Coast', 'Sunshine Coast', 'Ipswich', 'Logan', 'Redlands', 'Moreton Bay'],
  });

  const faqs = [
    {
      question: 'What should I do immediately when a pipe bursts?',
      answer: 'First, turn off the main water supply immediately to stop water flow. Then turn off electricity to affected areas if safe. Call us at 1300 814 870 for emergency response. Move valuables away from water and document damage for insurance.'
    },
    {
      question: 'How much does burst pipe water damage restoration cost?',
      answer: 'Costs vary based on damage extent, typically ranging from $2,000-$15,000. Most home insurance policies cover burst pipe damage. We provide free assessments and work directly with insurers for claim management.'
    },
    {
      question: 'How quickly can you respond to burst pipe emergencies?',
      answer: 'We offer 24/7 emergency response with teams typically arriving within 60 minutes in metro Brisbane areas. Our rapid response prevents secondary damage like mould growth and structural issues.'
    },
    {
      question: 'What causes pipes to burst in Queensland homes?',
      answer: 'Common causes include corrosion in older pipes, high water pressure, tree root intrusion, poor installation, and extreme temperature changes. Regular plumbing maintenance can prevent many burst pipe incidents.'
    },
    {
      question: 'Will insurance cover burst pipe damage?',
      answer: 'Most home insurance policies cover sudden burst pipe damage and resulting water damage. However, gradual leaks or lack of maintenance may not be covered. We help document everything for your claim.'
    },
    {
      question: 'How long does burst pipe restoration take?',
      answer: 'Emergency water extraction takes 1-2 days, drying takes 3-5 days, and full restoration including repairs can take 1-3 weeks depending on damage extent. We work efficiently to minimize disruption.'
    }
  ];

  const commonBurstPipeLocations = [
    {
      location: 'Kitchen Pipes',
      risks: 'Under sink, dishwasher lines, ice maker connections',
      damage: 'Cabinet damage, floor warping, appliance damage'
    },
    {
      location: 'Bathroom Plumbing',
      risks: 'Toilet supply, shower pipes, vanity connections',
      damage: 'Tile damage, subfloor rot, mould growth'
    },
    {
      location: 'Laundry Areas',
      risks: 'Washing machine hoses, hot water connections',
      damage: 'Wall damage, electrical hazards, flooding'
    },
    {
      location: 'Ceiling & Walls',
      risks: 'Hidden pipes, join failures, corrosion',
      damage: 'Ceiling collapse, wall saturation, insulation damage'
    },
    {
      location: 'External Pipes',
      risks: 'Garden taps, pool plumbing, irrigation',
      damage: 'Foundation issues, landscape damage, erosion'
    },
    {
      location: 'Hot Water Systems',
      risks: 'Tank failures, pressure relief valves, connections',
      damage: 'Extensive flooding, scalding risk, property damage'
    }
  ];

  const emergencySteps = [
    {
      step: 1,
      action: 'Shut Off Water',
      details: 'Locate and turn off main water meter immediately',
      critical: true
    },
    {
      step: 2,
      action: 'Electrical Safety',
      details: 'Turn off power to affected areas if water near electrical',
      critical: true
    },
    {
      step: 3,
      action: 'Call Emergency Services',
      details: 'Contact us at 1300 814 870 for immediate response',
      critical: true
    },
    {
      step: 4,
      action: 'Document Damage',
      details: 'Take photos and videos for insurance claims',
      critical: false
    },
    {
      step: 5,
      action: 'Remove Valuables',
      details: 'Move furniture and belongings from affected areas',
      critical: false
    },
    {
      step: 6,
      action: 'Start Ventilation',
      details: 'Open windows and doors to aid drying if safe',
      critical: false
    }
  ];

  const warningSignsOfPipeFailure = [
    'Unexplained increase in water bills',
    'Water stains on walls or ceilings',
    'Musty odours indicating hidden leaks',
    'Reduced water pressure',
    'Sounds of running water when taps are off',
    'Rust-coloured or cloudy water',
    'Visible corrosion on exposed pipes',
    'Damp patches in yard or concrete'
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
      <section className="relative bg-gradient-to-r from-blue-900 to-cyan-700 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-red-600/90 px-4 py-2 rounded-full mb-6 animate-pulse">
              <AlertTriangle className="h-5 w-5" />
              <span className="text-sm font-bold">EMERGENCY BURST PIPE RESPONSE</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Burst Pipe Emergency Services Brisbane
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              24/7 emergency response for burst pipes and water damage. Fast water extraction, 
              professional drying, and complete restoration across Queensland.
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
              <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-blue-50">
                <Droplets className="mr-2 h-5 w-5" />
                Get Immediate Help
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span>60min Response</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-yellow-400" />
                <span>Insurance Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Wrench className="h-5 w-5 text-yellow-400" />
                <span>Licensed Plumbers</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Steps */}
      <section className="py-16 bg-red-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              <AlertTriangle className="inline-block h-8 w-8 text-red-600 mr-2" />
              Immediate Actions for Burst Pipes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {emergencySteps.map((item, index) => (
                <Card key={index} className={`p-4 ${item.critical ? 'border-2 border-red-500 bg-red-50' : ''}`}>
                  <div className="flex items-start gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      item.critical ? 'bg-red-600 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      {item.step}
                    </div>
                    <div>
                      <h3 className="font-bold mb-1">{item.action}</h3>
                      <p className="text-sm text-gray-600">{item.details}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Button 
                size="lg"
                className="bg-red-600 hover:bg-red-700"
                onClick={() => setShowQuoteDialog(true)}
              >
                <Phone className="mr-2" />
                Call Emergency Team Now
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Common Burst Pipe Locations */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Common Burst Pipe Locations</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Understanding where pipes commonly fail helps with prevention and quick response
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {commonBurstPipeLocations.map((item, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-2 mb-3">
                  <Home className="h-6 w-6 text-blue-600" />
                  <h3 className="text-xl font-bold">{item.location}</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Risk Areas:</p>
                    <p className="text-sm text-gray-600">{item.risks}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-1">Potential Damage:</p>
                    <p className="text-sm text-gray-600">{item.damage}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Our Burst Pipe Restoration Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Systematic approach to minimize damage and restore your property quickly
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-4 text-blue-900">Emergency Response</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Immediate Dispatch</p>
                      <p className="text-sm text-gray-600">24/7 teams ready for deployment</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Source Identification</p>
                      <p className="text-sm text-gray-600">Locate and stop the water source</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Water Extraction</p>
                      <p className="text-sm text-gray-600">Industrial pumps remove standing water</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Damage Assessment</p>
                      <p className="text-sm text-gray-600">Document all damage for insurance</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold mb-4 text-blue-900">Restoration Phase</h3>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Structural Drying</p>
                      <p className="text-sm text-gray-600">Dehumidifiers and air movers deployed</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Antimicrobial Treatment</p>
                      <p className="text-sm text-gray-600">Prevent mould and bacteria growth</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Repairs & Reconstruction</p>
                      <p className="text-sm text-gray-600">Fix damaged walls, floors, and fixtures</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold">Final Inspection</p>
                      <p className="text-sm text-gray-600">Ensure complete restoration quality</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Warning Signs */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 bg-orange-50 border-2 border-orange-200">
              <h2 className="text-2xl font-bold mb-6 text-center">
                <Gauge className="inline-block h-8 w-8 text-orange-600 mr-2" />
                Warning Signs of Pipe Problems
              </h2>
              <p className="text-center text-gray-600 mb-6">
                Early detection can prevent major burst pipe disasters
              </p>
              <div className="grid md:grid-cols-2 gap-4">
                {warningSignsOfPipeFailure.map((sign, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-orange-600 flex-shrink-0" />
                    <span className="text-gray-700">{sign}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Notice any of these signs? Get a professional inspection before disaster strikes.
                </p>
                <Button 
                  variant="outline"
                  className="border-orange-600 text-orange-600 hover:bg-orange-50"
                  onClick={() => setShowQuoteDialog(true)}
                >
                  Schedule Inspection
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Cost Information */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Burst Pipe Damage Costs & Insurance</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Typical Restoration Costs</h3>
                <ul className="space-y-3">
                  <li className="flex justify-between">
                    <span>Minor leak damage:</span>
                    <span className="font-semibold">$1,500 - $3,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Single room flooding:</span>
                    <span className="font-semibold">$3,000 - $7,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Multiple rooms affected:</span>
                    <span className="font-semibold">$7,000 - $15,000</span>
                  </li>
                  <li className="flex justify-between">
                    <span>Whole house flooding:</span>
                    <span className="font-semibold">$15,000 - $40,000+</span>
                  </li>
                </ul>
                <p className="text-sm text-gray-600 mt-4">
                  *Costs vary based on damage extent and property size
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4">Insurance Coverage</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Sudden burst pipes typically covered</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Water damage restoration included</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Emergency response costs covered</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Gradual leaks may not be covered</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <XCircle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm">Lack of maintenance exclusions apply</p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline">
                  <Phone className="mr-2 h-4 w-4" />
                  Insurance Claim Help
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">24/7 Burst Pipe Response Areas</h2>
            <p className="text-xl text-gray-600">
              Rapid emergency response across Southeast Queensland
            </p>
          </div>
          <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {['Brisbane CBD', 'North Brisbane', 'South Brisbane', 'Eastern Suburbs', 'Western Suburbs', 'Gold Coast', 'Sunshine Coast', 'Ipswich', 'Logan', 'Redlands', 'Moreton Bay', 'Toowoomba'].map((area) => (
              <div key={area} className="bg-white p-3 rounded-lg text-center shadow-md hover:shadow-lg transition-shadow">
                <h3 className="font-semibold">{area}</h3>
                <p className="text-xs text-gray-600 mt-1">Emergency Response</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-10">Burst Pipe Emergency FAQs</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-lg font-bold mb-3 text-blue-900">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-900 to-cyan-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Burst Pipe Emergency? Act Fast!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Every minute counts. Get immediate professional help to minimize damage and costs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => setShowQuoteDialog(true)}
            >
              <Phone className="mr-2 animate-pulse" />
              Call 1300 814 870 Now
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-blue-900 hover:bg-gray-100">
              <ArrowRight className="mr-2" />
              Online Emergency Request
            </Button>
          </div>
        </div>
      </section>

      {/* Quote Dialog */}
      <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-600 animate-pulse" />
              Burst Pipe Emergency Response
            </DialogTitle>
            <DialogDescription>
              Immediate help available 24/7. Our emergency teams are ready to respond.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 p-3 bg-red-50 rounded-lg border-2 border-red-200">
              <Phone className="h-6 w-6 text-red-600 animate-pulse" />
              <div>
                <p className="font-semibold">Emergency Hotline</p>
                <p className="text-2xl font-bold text-red-600">1300 814 870</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>60-minute emergency response</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Licensed emergency plumbers</span>
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
            <Button className="w-full bg-red-600 hover:bg-red-700">
              Get Emergency Help Now
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
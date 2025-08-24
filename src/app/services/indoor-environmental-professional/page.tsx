'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { generateSEO, generateLocalBusinessSchema, generateServiceSchema, generateFAQSchema } from '@/lib/seo';
import { Phone, Clock, Shield, Wind, Thermometer, Activity, Home, AlertTriangle, CheckCircle2, ArrowRight, Microscope, FileText, Gauge, Heart, Brain } from 'lucide-react';

export default function IndoorEnvironmentalProfessionalPage() {
  const [showQuoteDialog, setShowQuoteDialog] = useState(false);

  const businessInfo = {
    name: 'Disaster Recovery QLD - Indoor Environmental Professional Services',
    description: 'Certified Indoor Environmental Professionals (IEP) providing comprehensive building health assessments, air quality testing, mould investigations, and environmental consulting across Australia.',
    telephone: '1300 814 870',
    address: {
      streetAddress: 'Servicing All Areas',
      addressLocality: 'Brisbane',
      addressRegion: 'QLD',
      postalCode: '4000',
      addressCountry: 'AU'
    },
    hours: '24/7 Emergency Response',
    url: 'https://disasterrecovery.com.au/services/indoor-environmental-professional',
    image: '/images/iep-services.jpg',
    priceRange: '$$$-$$$$'
  };

  const serviceSchema = generateServiceSchema({
    name: 'Indoor Environmental Professional Services',
    description: 'Expert IEP services including air quality testing, mould assessment, EMF testing, building biology, HVAC analysis, and comprehensive environmental health consulting.',
    provider: businessInfo.name,
    areaServed: ['Brisbane', 'Sydney', 'Melbourne', 'Perth', 'Adelaide', 'Gold Coast', 'Canberra', 'Newcastle', 'Hobart', 'Darwin'],
  });

  const faqs = [
    {
      question: 'What exactly does an Indoor Environmental Professional do?',
      answer: 'An IEP is a certified specialist who assesses all factors affecting indoor environmental quality including air quality, moisture, mould, ventilation, electromagnetic fields, toxins, and building materials. We identify health hazards, provide scientific testing, and develop remediation strategies to create healthier living and working spaces. This includes compliance with Australian Building Codes and health standards.'
    },
    {
      question: 'When should I hire an Indoor Environmental Professional?',
      answer: 'You should consult an IEP when experiencing unexplained health issues in a building, after water damage or mould discovery, before purchasing property, during renovations, for workplace health complaints, or when dealing with chemical sensitivities. IEPs are also essential for insurance claims requiring environmental assessment and for resolving building-related health disputes.'
    },
    {
      question: 'What types of testing do IEPs perform?',
      answer: 'IEPs conduct comprehensive testing including air quality (VOCs, particulates, CO2), mould spore counts and species identification, moisture mapping, electromagnetic field (EMF) measurements, radon testing, asbestos and lead detection, allergen testing, bacterial contamination, and chemical off-gassing. All testing follows IICRC S520 and Australian standards with legally defensible documentation.'
    },
    {
      question: 'How much does an IEP assessment cost in Australia?',
      answer: 'IEP assessments typically range from $800-$5,000 depending on property size and testing requirements. Basic residential assessments start at $800-$1,500, comprehensive testing $2,000-$3,500, and commercial assessments $3,000-$10,000+. Many health issues and insurance claims require IEP documentation, making it a valuable investment in health and property protection.'
    },
    {
      question: 'Is IEP assessment covered by insurance?',
      answer: 'IEP assessments are often covered when related to insured events like water damage, fire, or storm damage. Health insurance may cover assessments for medically documented environmental sensitivities. Workers compensation often covers workplace assessments. We provide detailed reports meeting insurance requirements and can assist with claim documentation.'
    },
    {
      question: 'What\'s the difference between an IEP and a standard building inspector?',
      answer: 'IEPs focus specifically on health and environmental factors using scientific testing equipment and protocols. While building inspectors check structural and code compliance, IEPs investigate the invisible factors affecting occupant health: air quality, hidden mould, toxins, electromagnetic fields, and biological contaminants. IEPs provide health-focused recommendations beyond standard building requirements.'
    }
  ];

  const iepServices = [
    {
      category: 'Air Quality & Ventilation',
      icon: Wind,
      services: [
        'Indoor air quality testing (IAQ)',
        'VOC and chemical detection',
        'Particulate matter measurement',
        'CO2 and oxygen level monitoring',
        'HVAC system assessment',
        'Ventilation rate calculations',
        'Airflow pattern analysis',
        'Filtration effectiveness testing'
      ]
    },
    {
      category: 'Biological Contaminants',
      icon: Microscope,
      services: [
        'Mould inspection and testing',
        'Bacterial contamination assessment',
        'Allergen identification',
        'Pest infestation detection',
        'Mycotoxin testing',
        'Endotoxin analysis',
        'Bioaerosol sampling',
        'Pathogen risk assessment'
      ]
    },
    {
      category: 'Chemical & Toxins',
      icon: AlertTriangle,
      services: [
        'Volatile organic compounds (VOCs)',
        'Formaldehyde testing',
        'Asbestos identification',
        'Lead paint detection',
        'Pesticide residue testing',
        'Heavy metals screening',
        'Radon gas measurement',
        'Chemical sensitivity assessment'
      ]
    },
    {
      category: 'Building Science',
      icon: Home,
      services: [
        'Moisture intrusion investigation',
        'Thermal imaging surveys',
        'Building envelope testing',
        'Pressure differential analysis',
        'Humidity control assessment',
        'Condensation risk evaluation',
        'Material emissions testing',
        'Structural moisture mapping'
      ]
    },
    {
      category: 'Electromagnetic Fields',
      icon: Activity,
      services: [
        'EMF/EMR measurement',
        'Dirty electricity testing',
        'Radio frequency assessment',
        'Magnetic field mapping',
        'Electric field detection',
        'Smart meter evaluation',
        '5G exposure assessment',
        'Shielding recommendations'
      ]
    },
    {
      category: 'Health & Wellness',
      icon: Heart,
      services: [
        'Sick building syndrome investigation',
        'Multiple chemical sensitivity support',
        'Chronic illness environmental factors',
        'Sleep environment optimization',
        'Workplace wellness assessment',
        'School environment evaluation',
        'Healthcare facility compliance',
        'Disability accommodation planning'
      ]
    }
  ];

  const healthImpacts = [
    {
      system: 'Respiratory',
      icon: Wind,
      conditions: ['Asthma', 'Allergies', 'COPD', 'Sinusitis', 'Bronchitis'],
      triggers: ['Mould', 'Dust', 'VOCs', 'Poor ventilation', 'Particulates']
    },
    {
      system: 'Neurological',
      icon: Brain,
      conditions: ['Headaches', 'Fatigue', 'Brain fog', 'Memory issues', 'Concentration problems'],
      triggers: ['CO2', 'VOCs', 'EMF', 'Mould toxins', 'Chemical exposure']
    },
    {
      system: 'Immune',
      icon: Shield,
      conditions: ['Chronic fatigue', 'Autoimmune triggers', 'Infections', 'Inflammation'],
      triggers: ['Biotoxins', 'Bacteria', 'Stress', 'Chemical burden']
    }
  ];

  const assessmentProcess = [
    {
      step: 1,
      title: 'Initial Consultation',
      description: 'Discuss concerns, symptoms, and building history',
      duration: '30-60 min'
    },
    {
      step: 2,
      title: 'Visual Inspection',
      description: 'Comprehensive walkthrough identifying potential issues',
      duration: '1-2 hours'
    },
    {
      step: 3,
      title: 'Scientific Testing',
      description: 'Deploy specialized equipment for measurements',
      duration: '2-4 hours'
    },
    {
      step: 4,
      title: 'Laboratory Analysis',
      description: 'Send samples to NATA-accredited laboratories',
      duration: '3-7 days'
    },
    {
      step: 5,
      title: 'Detailed Report',
      description: 'Comprehensive findings with recommendations',
      duration: '2-3 days'
    },
    {
      step: 6,
      title: 'Remediation Plan',
      description: 'Step-by-step action plan for improvement',
      duration: '1-2 days'
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
      <section className="relative bg-gradient-to-r from-emerald-900 to-teal-700 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-800/50 px-4 py-2 rounded-full mb-6">
              <Microscope className="h-5 w-5" />
              <span className="text-sm font-medium">Certified Indoor Environmental Professionals</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">
              Indoor Environmental Professional Services
            </h1>
            <p className="text-xl mb-8 text-emerald-100">
              Scientific assessment of your indoor environment. Identifying and resolving health hazards 
              in homes and workplaces through comprehensive testing and expert analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="bg-orange-500 hover:bg-orange-600 text-white"
                onClick={() => setShowQuoteDialog(true)}
              >
                <Phone className="mr-2 h-5 w-5" />
                Book IEP Assessment
              </Button>
              <Button size="lg" variant="outline" className="bg-white text-emerald-900 hover:bg-emerald-50">
                <FileText className="mr-2 h-5 w-5" />
                Download IEP Guide
              </Button>
            </div>
            <div className="mt-8 flex items-center justify-center gap-8 text-sm">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-orange-400" />
                <span>IICRC Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Microscope className="h-5 w-5 text-orange-400" />
                <span>Scientific Testing</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-orange-400" />
                <span>Insurance Reports</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Message */}
      <section className="bg-red-50 border-y-2 border-red-200 py-8">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-start gap-4">
              <AlertTriangle className="h-8 w-8 text-red-600 flex-shrink-0 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-red-900 mb-3">
                  Critical: The Hidden Crisis in Australian Buildings
                </h2>
                <p className="text-red-800 mb-3">
                  The IEP industry in Australia is severely undercapitalised and fragmented. Most building occupants 
                  are unknowingly exposed to environmental hazards affecting their health. When builders and IEPs are 
                  busy, critical details are missed. When quiet, over-scoping occurs. This inconsistency puts your 
                  health at risk.
                </p>
                <p className="text-red-700 font-semibold">
                  Every building should maintain consistent environmental health standards regardless of market conditions. 
                  Your health cannot wait for the "right time" in the construction cycle.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* IEP Services Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Comprehensive IEP Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Scientific investigation of all factors affecting indoor environmental quality and human health
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {iepServices.map((service, index) => (
              <Card key={index} className="p-6 hover:shadow-xl transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <service.icon className="h-10 w-10 text-emerald-600" />
                  <h3 className="text-xl font-bold">{service.category}</h3>
                </div>
                <ul className="space-y-2">
                  {service.services.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm">
                      <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Health Impact Section */}
      <section className="py-20 bg-emerald-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4">Environmental Health Impacts</h2>
              <p className="text-xl text-gray-600">
                Understanding how indoor environments affect human health systems
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {healthImpacts.map((impact, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <impact.icon className="h-8 w-8 text-emerald-600" />
                    <h3 className="text-xl font-bold">{impact.system} System</h3>
                  </div>
                  <div className="mb-4">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Common Conditions:</p>
                    <div className="flex flex-wrap gap-2">
                      {impact.conditions.map((condition, idx) => (
                        <span key={idx} className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded">
                          {condition}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-700 mb-2">Environmental Triggers:</p>
                    <div className="flex flex-wrap gap-2">
                      {impact.triggers.map((trigger, idx) => (
                        <span key={idx} className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded">
                          {trigger}
                        </span>
                      ))}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Assessment Process */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">IEP Assessment Process</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Systematic approach to identifying and resolving environmental health issues
            </p>
          </div>
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {assessmentProcess.map((item, index) => (
                <div key={index} className="flex gap-4 mb-8 relative">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    {index < assessmentProcess.length - 1 && (
                      <div className="w-0.5 h-20 bg-emerald-200 mx-auto mt-2" />
                    )}
                  </div>
                  <div className="flex-grow">
                    <Card className="p-6">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-xl font-bold">{item.title}</h3>
                        <span className="text-sm text-emerald-600 font-medium bg-emerald-50 px-3 py-1 rounded-full">
                          {item.duration}
                        </span>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Building Code Compliance */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Card className="p-8">
              <h2 className="text-3xl font-bold mb-6 text-center">Australian Building Code & Standards Compliance</h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-bold mb-4">Regulatory Standards</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>NCC/BCA Building Code of Australia</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>AS/NZS 4360 Risk Management</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>IICRC S520 Mould Remediation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>WHO Indoor Air Quality Guidelines</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Safe Work Australia Standards</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-4">Testing Protocols</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>NATA-accredited laboratory analysis</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Chain of custody documentation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Calibrated equipment certification</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Quality assurance procedures</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>Legal defensibility standards</span>
                    </li>
                  </ul>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">IEP Case Studies</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real examples of how IEP assessments have resolved complex environmental health issues
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="p-6">
              <div className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                Sick Building Syndrome
              </div>
              <h3 className="text-xl font-bold mb-2">Office Building - Brisbane CBD</h3>
              <p className="text-gray-600 mb-4">
                50+ employees experiencing headaches, fatigue, and respiratory issues. IEP assessment revealed 
                inadequate ventilation, high CO2, and VOCs from new furniture.
              </p>
              <div className="text-sm">
                <strong>Solution:</strong> HVAC upgrade, air purification, material replacement
              </div>
              <div className="text-sm mt-2">
                <strong>Result:</strong> 95% symptom reduction, 40% decrease in sick days
              </div>
            </Card>
            <Card className="p-6">
              <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                Hidden Mould
              </div>
              <h3 className="text-xl font-bold mb-2">Family Home - Gold Coast</h3>
              <p className="text-gray-600 mb-4">
                Child with chronic asthma, no visible mould. IEP testing found toxic black mould 
                (Stachybotrys) in wall cavities from historical water damage.
              </p>
              <div className="text-sm">
                <strong>Solution:</strong> Professional remediation, moisture control, HEPA filtration
              </div>
              <div className="text-sm mt-2">
                <strong>Result:</strong> Complete asthma resolution, insurance claim approved
              </div>
            </Card>
            <Card className="p-6">
              <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium inline-block mb-3">
                EMF Sensitivity
              </div>
              <h3 className="text-xl font-bold mb-2">Residential Unit - Melbourne</h3>
              <p className="text-gray-600 mb-4">
                Resident with electro-hypersensitivity experiencing sleep disruption and anxiety. 
                IEP found extreme EMF from smart meters and nearby transformer.
              </p>
              <div className="text-sm">
                <strong>Solution:</strong> EMF shielding, meter relocation, bedroom sanctuary
              </div>
              <div className="text-sm mt-2">
                <strong>Result:</strong> Restored sleep, reduced symptoms, quality of life improved
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center mb-12">Indoor Environmental Professional FAQs</h2>
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-emerald-900">{faq.question}</h3>
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-emerald-900 to-teal-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Your Health Can\'t Wait</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don\'t let poor indoor environmental quality affect your health. Get a professional IEP assessment today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-orange-500 hover:bg-orange-600"
              onClick={() => setShowQuoteDialog(true)}
            >
              <Phone className="mr-2" />
              Book IEP Assessment Now
            </Button>
            <Button size="lg" variant="outline" className="bg-white text-emerald-900 hover:bg-emerald-50">
              <ArrowRight className="mr-2" />
              Download Health Checklist
            </Button>
          </div>
          <p className="mt-6 text-emerald-200">
            Certified Indoor Environmental Professionals - Protecting Australian Health
          </p>
        </div>
      </section>

      {/* Quote Dialog */}
      <Dialog open={showQuoteDialog} onOpenChange={setShowQuoteDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Book IEP Assessment</DialogTitle>
            <DialogDescription>
              Get professional environmental health assessment for your property.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="flex items-center gap-3 p-3 bg-emerald-50 rounded-lg">
              <Phone className="h-5 w-5 text-emerald-600" />
              <div>
                <p className="font-semibold">Call Our IEP Team</p>
                <p className="text-2xl font-bold text-emerald-600">1300 814 870</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Certified IEP professionals</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Scientific testing equipment</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Insurance-approved reports</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="h-4 w-4 text-green-500" />
                <span>Health-focused solutions</span>
              </div>
            </div>
            <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
              Schedule Assessment
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
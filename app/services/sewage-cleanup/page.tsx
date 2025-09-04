import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateSEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo'
import {  Clock, Shield, AlertOctagon, Droplets, Home, AlertTriangle, CheckCircle, ArrowRight, Truck, Heart, ShieldAlert, MessageSquare} from 'lucide-react'

// SEO Metadata with AI optimisation
export const metadata: Metadata = generateSEO({
  title: 'Sewage Cleanup Brisbane | Emergency Sewage Removal & Sanitization | Disaster Recovery',
  description: 'Professional sewage cleanup and sanitization in Brisbane & Queensland. 24/7 emergency response for sewage backup, overflow cleanup, contamination removal. Health-certified technicians. Use Our Online Form',
  keywords: [
    'sewage cleanup Brisbane',
    'sewage backup cleanup',
    'raw sewage removal Queensland',
    'emergency sewage cleanup',
    'sewage overflow cleaning',
    'black water cleanup Brisbane',
    'sewage contamination removal',
    'bathroom sewage backup',
    'category 3 water damage',
    'sewage sanitization services',
    'biohazard sewage cleanup',
    'commercial sewage cleanup'
  ],
  canonical: 'https://disasterrecovery.com.au/services/sewage-cleanup',
  openGraph: {
    title: 'Emergency Sewage Cleanup Brisbane - 24/7 Professional Sanitization',
    description: 'Expert sewage cleanup and decontamination services. Fast response, health-certified technicians, complete sanitization. Protect your property and health.',
    images: [{ url: '/images/services/sewage-sanitisation.webp', alt: 'Professional Sewage Cleanup Service' }],
    type: 'website'
  }
})

// FAQ data for schema
const sewageFAQs = [
  {
    question: "Is sewage backup dangerous to my health?",
    answer: "Yes, sewage contains dangerous bacteria, viruses, parasites, and other pathogens that can cause serious illness. Category 3 'black water' poses immediate health risks. Never attempt cleanup without proper PPE. Call our certified technicians at online support for safe, professional removal."
  },
  {
    question: "What should I do if sewage backs up in my home?",
    answer: "Immediately evacuate the affected area, avoid contact with contaminated water, turn off electricity to affected areas if safe, stop using water fixtures, and call our 24/7 emergency line at online support. Do not attempt cleanup yourself due to serious health risks."
  },
  {
    question: "How quickly should sewage be cleaned up?",
    answer: "Sewage cleanup should begin immediately. Bacteria doubles every 20 minutes, and contamination spreads rapidly. The longer sewage sits, the greater the health risk and property damage. Our emergency team responds within 60 minutes 24/7."
  },
  {
    question: "What is Category 3 black water?",
    answer: "Category 3 'black water' is grossly contaminated water containing sewage, toilet backflows, or other sources of harmful bacteria and pathogens. It requires specialised equipment, protective gear, and professional remediation to safely clean and sanitize."
  },
  {
    question: "Will insurance cover sewage backup cleanup?",
    answer: "Many policies cover sewage backup with specific endorsements. Standard policies may not include it without additional coverage. We work directly with insurance companies and can help verify your coverage and manage claims."
  },
  {
    question: "How do you sanitize after sewage cleanup?",
    answer: "We use hospital-grade EPA-registered disinfectants, antimicrobial treatments, and specialised equipment. The process includes removal, cleaning, multiple disinfection applications, drying, and air quality testing to ensure complete decontamination."
  }
]

// Service schema data
const sewageServiceSchema = generateServiceSchema({
  name: 'Sewage Cleanup and Sanitization',
  description: 'Emergency sewage backup cleanup, removal, and complete sanitization services. 24/7 response for residential and commercial properties across Brisbane and Queensland.',
  image: '/images/services/sewage-sanitisation.webp',
  areaServed: ['Brisbane', 'Gold Coast', 'Ipswich', 'Logan City', 'Toowoomba', 'Sunshine Coast']
})

// Breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://disasterrecovery.com.au' },
  { name: 'Services', url: 'https://disasterrecovery.com.au/services' },
  { name: 'Sewage Cleanup', url: 'https://disasterrecovery.com.au/services/sewage-cleanup' }
])

export default function SewageCleanupPage() {
  return (
    <div className="min-h-screen">
      {/* Structured Data for SEO */}
      <StructuredData data={sewageServiceSchema} />
      <StructuredData data={generateFAQSchema(sewageFAQs)} />
      <StructuredData data={breadcrumbSchema} />

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-yellow-600 to-blue-700 text-white py-3 px-4">
        <div className="container mx-auto flex items-center justify-center gap-4">
          <AlertOctagon className="h-5 w-5 animate-pulse" />
          <span className="font-bold">24/7 Emergency Sewage Cleanup</span>
          <a href="#contact-form" className="font-bold underline">online support</a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-yellow-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Sewage Cleanup & Sanitization Services in Brisbane
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Category 3 black water specialists providing immediate response for sewage 
                backups, overflows, and contamination. Health-certified technicians with 
                advanced sanitization equipment available 24/7.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-blue-700 hover:bg-orange-700">
                      <MessageSquare className="mr-2 h-5 w-5" />
                      Emergency Sewage Response
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>⚠️ Sewage Emergency - Immediate Response Required</DialogTitle>
                      <DialogDescription>
                        Sewage contamination is a serious health hazard. Our certified technicians are ready to respond immediately.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="bg-red-50 border-l-4 border-red-600 p-4">
                        <p className="font-bold text-red-900">Health Warning:</p>
                        <p className="text-sm text-red-800">Do not attempt cleanup. Evacuate affected areas immediately.</p>
                      </div>
                      <a href="#contact-form" className="flex items-center justify-center gap-2 bg-blue-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700">
                        <MessageSquare className="h-5 w-5" />
                        Use Our Online Form'
                      </a>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center">
                          <Truck className="h-8 w-8 mx-auto mb-1 text-blue-700" />
                          <p className="font-medium">Rapid Response</p>
                          <p className="text-gray-600">&lt; 60 minutes</p>
                        </div>
                        <div className="text-center">
                          <ShieldAlert className="h-8 w-8 mx-auto mb-1 text-blue-700" />
                          <p className="font-medium">Health Certified</p>
                          <p className="text-gray-600">Safe cleanup</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="lg" variant="outline">
                  Insurance Claim Help
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-700" />
                  <span className="text-sm font-medium">24/7 Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-blue-700" />
                  <span className="text-sm font-medium">Health Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-700" />
                  <span className="text-sm font-medium">Insurance Approved</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/services/sewage-sanitisation.webp"
                alt="Professional sewage cleanup and sanitization service"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                priority
                loading="eager"
              />
              <div className="absolute -bottom-4 -right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold text-lg">BIOHAZARD</p>
                <p className="text-2xl font-bold">Category 3</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Warning Section */}
      <section className="bg-red-50 border-t-4 border-red-600 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">Critical Health & Safety Warning</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="font-medium mb-2">Sewage Contains:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• E. coli and other harmful bacteria</li>
                    <li>• Hepatitis A, Rotavirus, and other viruses</li>
                    <li>• Parasites including Giardia and Cryptosporidium</li>
                    <li>• Toxic gases and chemical contaminants</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Health Risks Include:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Gastroenteritis and severe diarrhea</li>
                    <li>• Respiratory infections</li>
                    <li>• Skin infections and rashes</li>
                    <li>• Long-term health complications</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Complete Sewage Cleanup & Decontamination Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <AlertOctagon className="h-10 w-10 text-blue-700 mb-4" />
                <CardTitle>Emergency Extraction</CardTitle>
                <CardDescription>
                  Immediate sewage removal and containment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Raw sewage extraction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Contaminated water removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Affected materials disposal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Containment barriers</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldAlert className="h-10 w-10 text-blue-700 mb-4" />
                <CardTitle>Sanitization & Disinfection</CardTitle>
                <CardDescription>
                  Hospital-grade cleaning and decontamination
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">EPA-registered disinfectants</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Antimicrobial treatments</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Deep cleaning all surfaces</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Odour neutralization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Home className="h-10 w-10 text-blue-700 mb-4" />
                <CardTitle>Restoration & Prevention</CardTitle>
                <CardDescription>
                  Complete restoration and future protection
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Structural drying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Material replacement</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Plumbing inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Backflow prevention</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Common Sewage Issues */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center">Common Sewage Backup Situations We Handle</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-bold mb-3">Residential</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-700 mt-0.5" />
                    <span className="text-sm">Toilet overflow and backup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-700 mt-0.5" />
                    <span className="text-sm">Basement sewage flooding</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-700 mt-0.5" />
                    <span className="text-sm">Bathroom floor drain backup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-700 mt-0.5" />
                    <span className="text-sm">Septic system failure</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-3">Commercial</h4>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-700 mt-0.5" />
                    <span className="text-sm">Restaurant grease trap overflow</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-700 mt-0.5" />
                    <span className="text-sm">Office building main line backup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-700 mt-0.5" />
                    <span className="text-sm">Healthcare facility contamination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-blue-700 mt-0.5" />
                    <span className="text-sm">Multi-unit building sewage issues</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Sewage Cleanup Process
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Emergency Response & Safety Assessment",
                  description: "Immediate response with full PPE, hazard assessment, and area isolation.",
                  time: "Within 60 minutes"
                },
                {
                  step: 2,
                  title: "Containment & Extraction",
                  description: "Set up containment barriers, extract sewage and contaminated water.",
                  time: "Hours 1-2"
                },
                {
                  step: 3,
                  title: "Removal of Contaminated Materials",
                  description: "Safe disposal of porous materials, carpets, drywall that contacted sewage.",
                  time: "Hours 2-4"
                },
                {
                  step: 4,
                  title: "Cleaning & Disinfection",
                  description: "Multiple rounds of EPA-registered antimicrobial application.",
                  time: "Hours 4-8"
                },
                {
                  step: 5,
                  title: "Drying & Dehumidification",
                  description: "Complete structural drying to prevent mould growth.",
                  time: "Days 1-3"
                },
                {
                  step: 6,
                  title: "Restoration & Verification",
                  description: "Rebuild affected areas, final sanitization, and clearance testing.",
                  time: "Days 3-5"
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-700 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <span className="text-sm text-blue-700 font-medium">{item.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Sewage Cleanup Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {sewageFAQs.map((faq, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{faq.question}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700">{faq.answer}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Equipment Section */}
      <section className="py-16 bg-orange-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Professional Equipment & Safety Standards
          </h2>
          <div className="grid md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow mb-3">
                <Shield className="h-8 w-8 text-blue-700 mx-auto" />
              </div>
              <h4 className="font-bold">Full PPE</h4>
              <p className="text-sm text-gray-600">Hazmat suits, respirators, gloves</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow mb-3">
                <Droplets className="h-8 w-8 text-blue-700 mx-auto" />
              </div>
              <h4 className="font-bold">Extraction Equipment</h4>
              <p className="text-sm text-gray-600">Industrial pumps & vacuums</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow mb-3">
                <ShieldAlert className="h-8 w-8 text-blue-700 mx-auto" />
              </div>
              <h4 className="font-bold">Disinfectants</h4>
              <p className="text-sm text-gray-600">Hospital-grade sanitizers</p>
            </div>
            <div className="text-center">
              <div className="bg-white p-4 rounded-lg shadow mb-3">
                <CheckCircle className="h-8 w-8 text-blue-700 mx-auto" />
              </div>
              <h4 className="font-bold">Testing Equipment</h4>
              <p className="text-sm text-gray-600">Bacteria & pathogen testing</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Sewage Emergency? Don't Risk Your Health
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Professional sewage cleanup is essential for your safety. Our certified technicians 
            have the equipment and expertise to handle any sewage contamination safely.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#contact-form" className="bg-white text-blue-700 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 flex items-center justify-center gap-2">
              <MessageSquare className="h-5 w-5" />
              Emergency: online support
            </a>
            <Button size="lg" className="bg-[#FF0000] hover:bg-[#CC0000] text-white bg-transparent text-white ">
              Get Immediate Help
            </Button>
          </div>
          <p className="mt-6 text-sm">
            Available 24/7 • Brisbane • Gold Coast • Ipswich • Logan • Toowoomba • Sunshine Coast
          </p>
        </div>
      </section>
    </div>
  )
}
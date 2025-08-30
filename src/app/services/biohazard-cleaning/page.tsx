import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateSEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { Phone, Clock, Shield, AlertTriangle, CheckCircle, ArrowRight, Heart, ShieldAlert, UserX, Siren, Lock, FileText } from 'lucide-react'

// SEO Metadata with AI optimisation
export const metadata: Metadata = generateSEO({
  title: 'Biohazard Cleaning Brisbane | Crime Scene & Trauma Cleanup | Disaster Recovery Australia',
  description: 'Professional biohazard cleaning and crime scene cleanup in Brisbane. Discrete, compassionate trauma cleaning, unattended death, blood cleanup. Police & insurance approved. Call 1300 309 361.',
  keywords: [
    'biohazard cleaning Brisbane',
    'crime scene cleanup Queensland',
    'trauma cleaning services',
    'unattended death cleanup',
    'blood cleanup Brisbane',
    'suicide cleanup services',
    'hoarding cleanup Brisbane',
    'drug lab cleanup',
    'industrial accident cleanup',
    'deceased estate cleaning',
    'forensic cleaning Brisbane',
    'compassionate cleaning services',
    'police approved cleaners',
    'biohazard waste disposal'
  ],
  canonical: 'https://disasterrecovery.com.au/services/biohazard-cleaning',
  openGraph: {
    title: 'Professional Biohazard & Crime Scene Cleaning Brisbane - Discrete & Compassionate',
    description: 'Certified biohazard and trauma scene cleaning. Discrete, compassionate service for crime scenes, unattended deaths, accidents. Available 24/7.',
    images: [{ url: '/images/services/crime-scene-remediation.webp', alt: 'Professional Biohazard Cleaning Service' }],
    type: 'website'
  }
})

// FAQ data for schema
const biohazardFAQs = [
  {
    question: "What situations require professional biohazard cleaning?",
    answer: "Professional biohazard cleaning is required for crime scenes, unattended deaths, suicides, traumatic injuries, blood spills, hoarding situations, drug labs, and industrial accidents. These situations involve biological contaminants that pose serious health risks and require specialised training, equipment, and disposal methods."
  },
  {
    question: "How discrete is your biohazard cleaning service?",
    answer: "We understand the sensitive nature of these situations. Our vehicles are unmarked, our technicians wear discrete uniforms, and we work with complete confidentiality. We coordinate with families, property managers, and law enforcement to ensure privacy and respect throughout the process."
  },
  {
    question: "Do you work with police and coroners?",
    answer: "Yes, we work closely with Queensland Police, coroners, and other authorities. We only begin work after the scene has been released by investigating authorities. Our team is trained in preserving any remaining evidence and following proper protocols."
  },
  {
    question: "Is biohazard cleaning covered by insurance?",
    answer: "Many homeowner and commercial insurance policies cover biohazard cleaning under trauma scene cleanup. We work directly with insurance companies, provide detailed documentation, and can often bill insurance directly to minimize your out-of-pocket expenses."
  },
  {
    question: "How long does biohazard cleanup take?",
    answer: "Most residential biohazard cleanups take 1-3 days depending on the extent of contamination. We work efficiently while ensuring thorough decontamination. We understand the emotional urgency and work to restore the property as quickly as possible while maintaining the highest safety standards."
  },
  {
    question: "What training do your biohazard technicians have?",
    answer: "Our technicians are certified in bloodborne pathogen handling, HAZWOPER training, and follow OSHA and EPA guidelines. They receive ongoing training in proper PPE use, decontamination procedures, and compassionate client interaction. All team members undergo background checks and are fully insured."
  }
]

// Service schema data
const biohazardServiceSchema = generateServiceSchema({
  name: 'Biohazard and Crime Scene Cleaning',
  description: 'Professional biohazard remediation, crime scene cleanup, and trauma cleaning services. Discrete, compassionate, and thorough decontamination available 24/7 across Brisbane and Queensland.',
  image: '/images/services/crime-scene-remediation.webp',
  areaServed: ['Brisbane', 'Gold Coast', 'Ipswich', 'Logan City', 'Toowoomba', 'Sunshine Coast', 'Cairns', 'Townsville']
})

// Breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://disasterrecovery.com.au' },
  { name: 'Services', url: 'https://disasterrecovery.com.au/services' },
  { name: 'Biohazard Cleaning', url: 'https://disasterrecovery.com.au/services/biohazard-cleaning' }
])

export default function BiohazardCleaningPage() {
  return (
    <div className="min-h-screen">
      {/* Structured Data for SEO */}
      <StructuredData data={biohazardServiceSchema} />
      <StructuredData data={generateFAQSchema(biohazardFAQs)} />
      <StructuredData data={breadcrumbSchema} />

      {/* Discrete Banner */}
      <div className="bg-gradient-to-r from-gray-700 to-gray-800 text-white py-3 px-4">
        <div className="container mx-auto flex items-centre justify-centre gap-4">
          <Heart className="h-5 w-5" />
          <span className="font-medium">Compassionate & Discrete Biohazard Cleaning Services</span>
          <a href="tel:1300309361" className="font-bold underline">1300 309 361</a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-gray-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-centre">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Biohazard & Crime Scene Cleaning in Brisbane
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                Certified biohazard remediation specialists providing discrete, compassionate 
                cleaning for trauma scenes, crime scenes, and hazardous situations. Available 
                24/7 with unmarked vehicles and respectful, professional service.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-gray-700 hover:bg-gray-800">
                      <Phone className="mr-2 h-5 w-5" />
                      24/7 Discrete Response
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Compassionate Biohazard Cleaning Support</DialogTitle>
                      <DialogDescription>
                        We understand you're going through a difficult time. Our caring team is here to help with discrete, professional service.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                        <p className="text-sm text-blue-900">
                          <strong>Confidential Service:</strong> Unmarked vehicles, discrete uniforms, complete privacy assured.
                        </p>
                      </div>
                      <a href="tel:1300309361" className="flex items-centre justify-centre gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-800">
                        <Phone className="h-5 w-5" />
                        Call 1300 309 361
                      </a>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-centre">
                          <Heart className="h-8 w-8 mx-auto mb-1 text-gray-600" />
                          <p className="font-medium">Compassionate</p>
                          <p className="text-gray-600">Understanding service</p>
                        </div>
                        <div className="text-centre">
                          <Lock className="h-8 w-8 mx-auto mb-1 text-gray-600" />
                          <p className="font-medium">Confidential</p>
                          <p className="text-gray-600">Complete privacy</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="lg" variant="outline">
                  Insurance Assistance
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-centre gap-2">
                  <Shield className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium">Police Approved</span>
                </div>
                <div className="flex items-centre gap-2">
                  <Heart className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium">Compassionate</span>
                </div>
                <div className="flex items-centre gap-2">
                  <Lock className="h-5 w-5 text-gray-600" />
                  <span className="text-sm font-medium">100% Discrete</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/services/crime-scene-remediation.webp"
                alt="Professional biohazard cleaning service vehicle"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                priority
                loading="eager"
              />
              <div className="absolute -bottom-4 -right-4 bg-gray-700 text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold text-lg">24/7 Support</p>
                <p className="text-2xl font-bold">Discrete Service</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Comprehensive Biohazard Cleaning Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <UserX className="h-10 w-10 text-gray-600 mb-4" />
                <CardTitle>Trauma & Crime Scene</CardTitle>
                <CardDescription>
                  Professional cleanup after traumatic incidents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Crime scene remediation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Suicide cleanup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Homicide scene cleaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Traumatic injury cleanup</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Heart className="h-10 w-10 text-gray-600 mb-4" />
                <CardTitle>Unattended Death</CardTitle>
                <CardDescription>
                  Respectful remediation after undiscovered death
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Decomposition cleanup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Odour remediation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Complete sanitization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Property restoration</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <ShieldAlert className="h-10 w-10 text-gray-600 mb-4" />
                <CardTitle>Hazardous Situations</CardTitle>
                <CardDescription>
                  Specialised cleaning for dangerous materials
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Drug lab decontamination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Hoarding cleanup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Industrial accidents</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Infectious disease cleanup</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Additional Services */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Blood & Bodily Fluid Cleanup</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Safe removal and decontamination of biological materials
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-gray-600 mt-0.5" />
                    <span className="text-sm">Blood spill remediation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-gray-600 mt-0.5" />
                    <span className="text-sm">Vehicle accident cleanup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-gray-600 mt-0.5" />
                    <span className="text-sm">Medical waste disposal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-gray-600 mt-0.5" />
                    <span className="text-sm">Workplace injury cleanup</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deceased Estate Cleaning</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Compassionate cleaning and restoration services
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-gray-600 mt-0.5" />
                    <span className="text-sm">Property decontamination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-gray-600 mt-0.5" />
                    <span className="text-sm">Odour elimination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-gray-600 mt-0.5" />
                    <span className="text-sm">Deep cleaning services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-gray-600 mt-0.5" />
                    <span className="text-sm">Property preparation for sale</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Our Approach Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Our Compassionate Approach
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-centre">
              <div className="bg-white w-20 h-20 rounded-full flex items-centre justify-centre mx-auto mb-4 shadow-lg">
                <Heart className="h-10 w-10 text-red-500" />
              </div>
              <h3 className="font-bold mb-2">Compassion First</h3>
              <p className="text-sm text-gray-600">
                Understanding and respectful service during difficult times
              </p>
            </div>
            <div className="text-centre">
              <div className="bg-white w-20 h-20 rounded-full flex items-centre justify-centre mx-auto mb-4 shadow-lg">
                <Lock className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="font-bold mb-2">Complete Privacy</h3>
              <p className="text-sm text-gray-600">
                Unmarked vehicles and discrete, professional service
              </p>
            </div>
            <div className="text-centre">
              <div className="bg-white w-20 h-20 rounded-full flex items-centre justify-centre mx-auto mb-4 shadow-lg">
                <Shield className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold mb-2">Certified Safe</h3>
              <p className="text-sm text-gray-600">
                Following all health and safety regulations
              </p>
            </div>
            <div className="text-centre">
              <div className="bg-white w-20 h-20 rounded-full flex items-centre justify-centre mx-auto mb-4 shadow-lg">
                <FileText className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-bold mb-2">Full Documentation</h3>
              <p className="text-sm text-gray-600">
                Complete reports for insurance and legal purposes
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-centre mb-12">
            Our Biohazard Cleaning Process
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Initial Contact & Assessment",
                  description: "Compassionate consultation to understand your needs and coordinate with authorities.",
                  time: "Immediate response"
                },
                {
                  step: 2,
                  title: "Scene Documentation",
                  description: "Thorough documentation for insurance and legal requirements.",
                  time: "On arrival"
                },
                {
                  step: 3,
                  title: "Containment & Safety Setup",
                  description: "Establish safety zones and containment to prevent cross-contamination.",
                  time: "First hour"
                },
                {
                  step: 4,
                  title: "Biohazard Removal",
                  description: "Safe removal of all biological materials and contaminated items.",
                  time: "Hours 2-6"
                },
                {
                  step: 5,
                  title: "Deep Cleaning & Disinfection",
                  description: "Multiple stages of cleaning with hospital-grade disinfectants.",
                  time: "Day 1-2"
                },
                {
                  step: 6,
                  title: "Deodorization & Restoration",
                  description: "Complete odour removal and property restoration to safe condition.",
                  time: "Day 2-3"
                },
                {
                  step: 7,
                  title: "Final Verification",
                  description: "ATP testing to verify complete decontamination and safety.",
                  time: "Final inspection"
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-centre justify-centre font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <span className="text-sm text-gray-600 font-medium">{item.time}</span>
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
          <h2 className="text-3xl font-bold text-centre mb-12">
            Biohazard Cleaning Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {biohazardFAQs.map((faq, index) => (
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

      {/* Support Resources */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-centre mb-8">
            Support Resources
          </h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-centre text-gray-700 mb-6">
              If you or someone you know needs support, these services are available:
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold mb-2">Lifeline Australia</h4>
                <p className="text-sm text-gray-600">Crisis support and suicide prevention</p>
                <p className="font-bold text-blue-600">13 11 14</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold mb-2">Beyond Blue</h4>
                <p className="text-sm text-gray-600">Mental health support</p>
                <p className="font-bold text-blue-600">1300 22 4636</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold mb-2">Victim Assist Queensland</h4>
                <p className="text-sm text-gray-600">Support for victims of crime</p>
                <p className="font-bold text-blue-600">1300 546 587</p>
              </div>
              <div className="bg-white p-4 rounded-lg">
                <h4 className="font-bold mb-2">Griefline</h4>
                <p className="text-sm text-gray-600">Grief counselling and support</p>
                <p className="font-bold text-blue-600">1300 845 745</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-700 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-centre">
          <h2 className="text-3xl font-bold mb-6">
            We're Here to Help During Difficult Times
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Our compassionate team provides discrete, professional biohazard cleaning 
            with the utmost respect and care. Available 24/7 to support you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-centre">
            <a href="tel:1300309361" className="bg-white text-gray-800 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 flex items-centre justify-centre gap-2">
              <Phone className="h-5 w-5" />
              Call 1300 309 361
            </a>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-gray-800">
              Request Discrete Service
            </Button>
          </div>
          <p className="mt-6 text-sm">
            Serving all of Queensland • Available 24/7 • Complete Confidentiality
          </p>
        </div>
      </section>
    </div>
  )
}
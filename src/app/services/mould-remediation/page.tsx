import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateSEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { Phone, Clock, Shield, AlertTriangle, CheckCircle, ArrowRight, Wind, Microscope, Home, Heart, FileCheck, AlertCircle } from 'lucide-react'

// SEO Metadata with AI optimization
export const metadata: Metadata = generateSEO({
  title: 'Mould Remediation Brisbane | Professional Mould Removal Services | Disaster Recovery QLD',
  description: 'Expert mould remediation and removal in Brisbane & Queensland. IICRC certified, safe mould inspection, testing & complete removal. Health-focused solutions. Call 1300 309 361.',
  keywords: [
    'mould remediation Brisbane',
    'mould removal Queensland',
    'black mould removal Brisbane',
    'mould inspection services',
    'mould testing Brisbane',
    'toxic mould remediation',
    'bathroom mould removal',
    'ceiling mould treatment',
    'mould prevention Brisbane',
    'IICRC mould certified',
    'air quality testing mould',
    'flood mould remediation',
    'commercial mould removal',
    'residential mould services'
  ],
  canonical: 'https://disasterrecovery.com.au/services/mould-remediation',
  openGraph: {
    title: 'Professional Mould Remediation Brisbane - Safe & Certified Removal',
    description: 'IICRC certified mould remediation experts in Brisbane. Complete mould removal, air quality testing, and prevention. Protect your health - call now.',
    images: [{ url: '/images/services/mould-remediation.webp', alt: 'Professional Mould Remediation Service' }],
    type: 'website'
  }
})

// FAQ data for schema
const mouldFAQs = [
  {
    question: "How do I know if I have a mould problem?",
    answer: "Common signs include visible mould growth (black, green, or white patches), musty odours, water stains, peeling paint, and health symptoms like allergies or respiratory issues. If you suspect mould, call 1300 309 361 for a professional inspection and air quality testing."
  },
  {
    question: "Is mould dangerous to my health?",
    answer: "Yes, mould can cause serious health issues including allergic reactions, asthma attacks, respiratory infections, and toxic effects from certain species like black mould. Children, elderly, and those with compromised immune systems are especially vulnerable. Professional remediation is essential for safety."
  },
  {
    question: "Can I remove mould myself?",
    answer: "Small areas (less than 1 square meter) might be DIY-manageable, but larger infestations require professional remediation. Improper removal can spread spores throughout your property and worsen the problem. Our certified technicians use containment, HEPA filtration, and proper PPE to safely remove mould."
  },
  {
    question: "How long does mould remediation take?",
    answer: "Small projects typically take 1-3 days, while extensive remediation can take 5-7 days. The timeline depends on the affected area size, mould type, and necessary repairs. We provide a detailed timeline after our initial assessment."
  },
  {
    question: "Will mould come back after remediation?",
    answer: "When properly remediated and with moisture sources addressed, mould should not return. We identify and fix the root cause, apply antimicrobial treatments, and provide prevention recommendations to ensure long-lasting results."
  },
  {
    question: "Does insurance cover mould remediation?",
    answer: "Coverage varies by policy. Mould resulting from covered perils like burst pipes or storms is often covered. We work with insurance companies and can help document your claim for maximum coverage."
  },
  {
    question: "What's the difference between mould removal and remediation?",
    answer: "Mould removal implies complete elimination, which is impossible as spores exist naturally. Remediation involves reducing mould to safe, natural levels through professional cleaning, removal of contaminated materials, and addressing moisture sources for long-term prevention."
  }
]

// Service schema data
const mouldServiceSchema = generateServiceSchema({
  name: 'Mould Remediation Services',
  description: 'Professional mould inspection, testing, removal and remediation services. IICRC certified technicians providing safe, thorough mould elimination across Brisbane and Queensland.',
  image: '/images/services/mould-remediation.webp',
  areaServed: ['Brisbane', 'Gold Coast', 'Ipswich', 'Logan City', 'Toowoomba', 'Sunshine Coast', 'Moreton Bay']
})

// Breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://disasterrecovery.com.au' },
  { name: 'Services', url: 'https://disasterrecovery.com.au/services' },
  { name: 'Mould Remediation', url: 'https://disasterrecovery.com.au/services/mould-remediation' }
])

export default function MouldRemediationPage() {
  return (
    <div className="min-h-screen">
      {/* Structured Data for SEO */}
      <StructuredData data={mouldServiceSchema} />
      <StructuredData data={generateFAQSchema(mouldFAQs)} />
      <StructuredData data={breadcrumbSchema} />

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-green-700 to-green-600 text-white py-3 px-4">
        <div className="container mx-auto flex items-center justify-center gap-4">
          <AlertTriangle className="h-5 w-5 animate-pulse" />
          <span className="font-bold">Professional Mould Remediation Services</span>
          <a href="tel:1300309361" className="font-bold underline">1300 309 361</a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-green-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Professional Mould Remediation & Removal in Brisbane
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                IICRC certified mould specialists providing safe, thorough mould inspection, 
                testing, and complete remediation. Protect your property and health with 
                Queensland's trusted mould experts.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-green-600 hover:bg-green-700">
                      <Phone className="mr-2 h-5 w-5" />
                      Get Mould Inspection
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Professional Mould Inspection & Testing</DialogTitle>
                      <DialogDescription>
                        Our certified inspectors use advanced equipment to detect and assess mould problems.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <a href="tel:1300309361" className="flex items-center justify-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-green-700">
                        <Phone className="h-5 w-5" />
                        Call 1300 309 361
                      </a>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center">
                          <Microscope className="h-8 w-8 mx-auto mb-1 text-green-600" />
                          <p className="font-medium">Air Quality Testing</p>
                          <p className="text-gray-600">Laboratory analysis</p>
                        </div>
                        <div className="text-center">
                          <FileCheck className="h-8 w-8 mx-auto mb-1 text-green-600" />
                          <p className="font-medium">Detailed Report</p>
                          <p className="text-gray-600">With remediation plan</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="lg" variant="outline">
                  Free Mould Assessment
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">IICRC Certified</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Health Focused</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span className="text-sm font-medium">Guaranteed Results</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/services/mould-remediation.webp"
                alt="Professional mould remediation and removal service in action"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                priority
                loading="eager"
              />
              <div className="absolute -bottom-4 -right-4 bg-green-600 text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold text-lg">Air Quality</p>
                <p className="text-2xl font-bold">Testing Included</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Health Warning Section */}
      <section className="bg-red-50 border-t-4 border-red-500 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">Health Warning: Mould Exposure Risks</h3>
              <div className="grid md:grid-cols-2 gap-4 mt-4">
                <div>
                  <p className="font-medium mb-2">Immediate Health Effects:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Allergic reactions & skin irritation</li>
                    <li>• Respiratory problems & asthma attacks</li>
                    <li>• Eye, nose, and throat irritation</li>
                    <li>• Headaches & fatigue</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium mb-2">Long-term Exposure Risks:</p>
                  <ul className="text-sm text-gray-700 space-y-1">
                    <li>• Chronic respiratory conditions</li>
                    <li>• Immune system suppression</li>
                    <li>• Neurological symptoms</li>
                    <li>• Severe allergic reactions</li>
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
            Comprehensive Mould Remediation Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Microscope className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Mould Inspection & Testing</CardTitle>
                <CardDescription>
                  Professional assessment with laboratory analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Visual & moisture inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Air quality testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Surface sampling</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Thermal imaging detection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Laboratory analysis report</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Wind className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Containment & Removal</CardTitle>
                <CardDescription>
                  Safe, controlled mould elimination process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Isolation barriers setup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Negative air pressure</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">HEPA air filtration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Safe material disposal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Antimicrobial treatment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Home className="h-10 w-10 text-green-600 mb-4" />
                <CardTitle>Restoration & Prevention</CardTitle>
                <CardDescription>
                  Complete restoration with future protection
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
                    <span className="text-sm">Moisture control solutions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Ventilation improvements</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Prevention coating application</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Common Mould Types */}
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 text-center">Common Mould Types We Remove</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-900 rounded-full mx-auto mb-3"></div>
                <h4 className="font-bold">Black Mould</h4>
                <p className="text-sm text-gray-600">Stachybotrys - Highly toxic</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-700 rounded-full mx-auto mb-3"></div>
                <h4 className="font-bold">Green Mould</h4>
                <p className="text-sm text-gray-600">Aspergillus - Common allergen</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-gray-100 border-2 border-gray-300 rounded-full mx-auto mb-3"></div>
                <h4 className="font-bold">White Mould</h4>
                <p className="text-sm text-gray-600">Penicillium - Fast spreading</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-600 rounded-full mx-auto mb-3"></div>
                <h4 className="font-bold">Yellow Mould</h4>
                <p className="text-sm text-gray-600">Serpula - Wood destroyer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our 7-Step Mould Remediation Process
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Initial Assessment & Testing",
                  description: "Comprehensive inspection, moisture mapping, and air quality testing to determine mould extent.",
                  time: "Day 1"
                },
                {
                  step: 2,
                  title: "Containment Setup",
                  description: "Install physical barriers and negative air pressure to prevent spore spread.",
                  time: "Day 1"
                },
                {
                  step: 3,
                  title: "Air Filtration",
                  description: "Deploy HEPA air scrubbers and filters to capture airborne mould spores.",
                  time: "Throughout process"
                },
                {
                  step: 4,
                  title: "Mould Removal",
                  description: "Safe removal of mould-infested materials using proper PPE and techniques.",
                  time: "Days 2-3"
                },
                {
                  step: 5,
                  title: "Cleaning & Sanitization",
                  description: "HEPA vacuum, antimicrobial treatment, and fogging of affected areas.",
                  time: "Day 3-4"
                },
                {
                  step: 6,
                  title: "Drying & Restoration",
                  description: "Complete drying, repairs, and restoration of affected structures.",
                  time: "Days 4-5"
                },
                {
                  step: 7,
                  title: "Post-Remediation Testing",
                  description: "Final air quality testing to ensure successful remediation.",
                  time: "Final day"
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <span className="text-sm text-green-600 font-medium">{item.time}</span>
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
            Mould Remediation Frequently Asked Questions
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {mouldFAQs.map((faq, index) => (
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

      {/* Prevention Tips */}
      <section className="py-16 bg-green-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Mould Prevention Tips
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Control Moisture</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Fix leaks immediately</li>
                  <li>• Use exhaust fans in bathrooms</li>
                  <li>• Maintain 30-50% humidity</li>
                  <li>• Dry wet areas within 24 hours</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Improve Ventilation</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Open windows regularly</li>
                  <li>• Use ceiling fans</li>
                  <li>• Ensure proper attic ventilation</li>
                  <li>• Don't block air vents</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Regular Maintenance</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li>• Clean gutters regularly</li>
                  <li>• Check roof for damage</li>
                  <li>• Inspect plumbing annually</li>
                  <li>• Monitor problem areas</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Don't Let Mould Compromise Your Health
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Professional mould remediation protects your property and family. 
            Our certified experts provide safe, thorough mould removal with guaranteed results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:1300309361" className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              Call 1300 309 361
            </a>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-green-600">
              Book Mould Inspection
            </Button>
          </div>
          <p className="mt-6 text-sm">
            Serving Brisbane • Gold Coast • Ipswich • Logan City • Toowoomba • Sunshine Coast • Moreton Bay
          </p>
        </div>
      </section>
    </div>
  )
}
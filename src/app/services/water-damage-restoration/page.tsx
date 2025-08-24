import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateSEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { Phone, Clock, Shield, Droplets, Wind, Home, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react'

// SEO Metadata with AI optimization
export const metadata: Metadata = generateSEO({
  title: 'Water Damage Restoration Australia | 24/7 Emergency Response | Disaster Recovery',
  description: 'Professional water damage restoration services across Australia. 24/7 emergency response, insurance approved, IICRC certified technicians. Call 1300 309 361.',
  keywords: [
    'water damage restoration Brisbane',
    'flood restoration Australia',
    'emergency water extraction',
    'water damage repair',
    'flood cleanup Brisbane',
    'burst pipe repair',
    'storm damage restoration',
    'water damage insurance claims',
    'IICRC certified water restoration',
    '24 hour water damage service'
  ],
  canonical: 'https://disasterrecovery.com.au/services/water-damage-restoration',
  openGraph: {
    title: 'Water Damage Restoration Brisbane - 24/7 Emergency Response',
    description: 'Fast, professional water damage restoration in Brisbane & surrounding areas. Insurance approved, certified technicians available 24/7.',
    images: [{ url: '/images/services/water-damage-restoration.webp', alt: 'Water Damage Restoration Service' }],
    type: 'website'
  }
})

// FAQ data for schema
const waterDamageFAQs = [
  {
    question: "How quickly should I act after water damage occurs?",
    answer: "You should act immediately. The first 24-48 hours are critical to prevent mould growth and structural damage. Call our 24/7 emergency line at 1300 309 361 for immediate response."
  },
  {
    question: "Is water damage restoration covered by insurance?",
    answer: "Most home insurance policies cover sudden water damage from burst pipes, storms, or accidents. We work directly with all major insurance companies and can help manage your claim."
  },
  {
    question: "What is the water damage restoration process?",
    answer: "Our process includes: 1) Emergency contact and assessment, 2) Water extraction, 3) Drying and dehumidification, 4) Cleaning and sanitizing, 5) Restoration and repairs. We document everything for insurance purposes."
  },
  {
    question: "How long does water damage restoration take?",
    answer: "Minor water damage typically takes 3-5 days to dry and restore. Extensive flooding may take 1-2 weeks. We provide detailed timelines after our initial assessment."
  },
  {
    question: "Can I stay in my home during water damage restoration?",
    answer: "It depends on the extent of damage. Minor water damage may allow you to stay, but extensive flooding or sewage contamination requires temporary relocation for safety."
  }
]

// Service schema data
const waterDamageServiceSchema = generateServiceSchema({
  name: 'Water Damage Restoration',
  description: 'Emergency water damage restoration, extraction, drying, and repair services available 24/7 across Brisbane, Gold Coast, Ipswich, Logan City, and Toowoomba.',
  image: '/images/services/water-damage-restoration.webp',
  areaServed: ['Brisbane', 'Gold Coast', 'Ipswich', 'Logan City', 'Toowoomba']
})

// Breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://disasterrecovery.com.au' },
  { name: 'Services', url: 'https://disasterrecovery.com.au/services' },
  { name: 'Water Damage Restoration', url: 'https://disasterrecovery.com.au/services/water-damage-restoration' }
])

export default function WaterDamageRestorationPage() {
  return (
    <div>
      {/* Structured Data for SEO */}
      <StructuredData data={waterDamageServiceSchema} />
      <StructuredData data={generateFAQSchema(waterDamageFAQs)} />
      <StructuredData data={breadcrumbSchema} />

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4">
        <div className="container mx-auto flex items-center justify-center gap-4">
          <Phone className="h-5 w-5 animate-pulse" />
          <span className="font-bold">24/7 Emergency Water Damage Response</span>
          <a href="tel:1300309361" className="font-bold underline">1300 309 361</a>
        </div>
      </div>

      {/* Hero Section with Core Web Vitals Optimization */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Water Damage Restoration Services Across Australia
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                IICRC certified water damage restoration experts with 25+ years experience. 
                Fast emergency response, insurance approved, and available 24/7 across Australia.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-red-600 hover:bg-red-700">
                      <Phone className="mr-2 h-5 w-5" />
                      Get Emergency Help Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>24/7 Emergency Water Damage Response</DialogTitle>
                      <DialogDescription>
                        Our certified technicians are ready to respond immediately to your water damage emergency.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <a href="tel:1300309361" className="flex items-center justify-center gap-2 bg-red-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-red-700">
                        <Phone className="h-5 w-5" />
                        Call 1300 309 361
                      </a>
                      <p className="text-sm text-center text-gray-600">Average response time: 45 minutes</p>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="lg" variant="outline">
                  Get Free Quote
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">24/7 Service</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">Insurance Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-medium">IICRC Certified</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/services/water-damage-restoration.webp"
                alt="Professional water damage restoration service in action"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                priority
                loading="eager"
              />
              <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold text-lg">Response Time</p>
                <p className="text-2xl font-bold">&lt; 60 mins</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comprehensive Water Damage Solutions
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <Droplets className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Flood Water Extraction</CardTitle>
                <CardDescription>
                  Rapid water removal using industrial pumps and extraction equipment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Standing water removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Carpet & underlay extraction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Contents protection</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Wind className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Structural Drying</CardTitle>
                <CardDescription>
                  Advanced drying technology to prevent mould and structural damage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Industrial dehumidifiers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Air movers & fans</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Moisture monitoring</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Home className="h-10 w-10 text-blue-600 mb-4" />
                <CardTitle>Complete Restoration</CardTitle>
                <CardDescription>
                  Full property restoration to pre-damage condition
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Repairs & reconstruction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Mould prevention treatment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Final sanitization</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Water Damage Restoration Process
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Emergency Contact & Rapid Response",
                  description: "Call our 24/7 hotline. We dispatch certified technicians within 60 minutes.",
                  time: "0-60 minutes"
                },
                {
                  step: 2,
                  title: "Inspection & Damage Assessment",
                  description: "Comprehensive evaluation using moisture meters and thermal imaging cameras.",
                  time: "On arrival"
                },
                {
                  step: 3,
                  title: "Water Extraction",
                  description: "Industrial-grade pumps and vacuums remove standing water immediately.",
                  time: "Day 1"
                },
                {
                  step: 4,
                  title: "Drying & Dehumidification",
                  description: "Strategic placement of air movers and dehumidifiers for optimal drying.",
                  time: "Days 1-3"
                },
                {
                  step: 5,
                  title: "Cleaning & Sanitizing",
                  description: "Antimicrobial treatments and thorough cleaning of affected areas.",
                  time: "Days 3-4"
                },
                {
                  step: 6,
                  title: "Restoration & Repairs",
                  description: "Complete restoration including repairs, painting, and reconstruction.",
                  time: "Days 4-7"
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <span className="text-sm text-blue-600 font-medium">{item.time}</span>
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
            Frequently Asked Questions About Water Damage Restoration
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {waterDamageFAQs.map((faq, index) => (
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

      {/* Service Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Water Damage Restoration Service Areas
          </h2>
          
          <div className="grid md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {['Brisbane', 'Gold Coast', 'Ipswich', 'Logan City', 'Toowoomba'].map((area) => (
              <div key={area} className="text-center p-4 bg-blue-50 rounded-lg">
                <h3 className="font-bold text-blue-900">{area}</h3>
                <p className="text-sm text-blue-700 mt-1">24/7 Service</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Need Emergency Water Damage Restoration?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait - every minute counts when dealing with water damage. 
            Our certified technicians are standing by 24/7.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:1300309361" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              Call 1300 309 361
            </a>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600">
              Request Quote Online
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

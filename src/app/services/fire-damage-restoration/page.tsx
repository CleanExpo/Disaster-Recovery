import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateSEO, generateServiceSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { Phone, Clock, Shield, Flame, Wind, Home, AlertTriangle, CheckCircle, ArrowRight, AlertCircle, Truck } from 'lucide-react'

// SEO Metadata with AI optimization
export const metadata: Metadata = generateSEO({
  title: 'Fire Damage Restoration Brisbane | Smoke & Soot Cleanup | Disaster Recovery QLD',
  description: 'Expert fire damage restoration in Brisbane & Queensland. 24/7 emergency response for smoke damage, soot removal, odour elimination. Insurance approved, IICRC certified. Call 1300 309 361.',
  keywords: [
    'fire damage restoration Brisbane',
    'smoke damage cleanup Queensland',
    'fire restoration services',
    'smoke and soot removal',
    'fire damage repair Brisbane',
    'odour removal after fire',
    'fire damage insurance claims',
    'emergency fire restoration',
    'IICRC fire damage certified',
    'structural fire damage repair',
    'contents restoration fire damage',
    'commercial fire damage restoration'
  ],
  canonical: 'https://disasterrecovery.com.au/services/fire-damage-restoration',
  openGraph: {
    title: 'Fire & Smoke Damage Restoration Brisbane - 24/7 Emergency Service',
    description: 'Professional fire damage restoration and smoke cleanup in Brisbane. Fast response, insurance approved, complete restoration services.',
    images: [{ url: '/images/services/fire-damage-restoration.webp', alt: 'Fire Damage Restoration Service' }],
    type: 'website'
  }
})

// FAQ data for schema
const fireDamageFAQs = [
  {
    question: "What should I do immediately after a fire?",
    answer: "First, ensure everyone is safe and don't re-enter the property until cleared by fire services. Contact your insurance company and call our 24/7 emergency line at 1300 309 361. We'll secure your property, assess damage, and begin restoration immediately to prevent further damage from smoke and water."
  },
  {
    question: "How long does fire damage restoration take?",
    answer: "Minor fire damage typically takes 1-2 weeks to restore. Extensive fire damage requiring structural repairs can take 1-3 months. We provide a detailed timeline after our initial assessment and work efficiently to minimize disruption."
  },
  {
    question: "Will insurance cover fire damage restoration?",
    answer: "Most homeowner and business insurance policies cover fire damage restoration. We work directly with all major insurance companies, document all damage, and help manage your claim to ensure maximum coverage."
  },
  {
    question: "Can smoke damage be completely removed?",
    answer: "Yes, with professional equipment and techniques, smoke damage and odours can be completely eliminated. We use specialized cleaning agents, ozone treatment, thermal fogging, and air scrubbers to remove all traces of smoke from your property."
  },
  {
    question: "Is it safe to stay in my home after a fire?",
    answer: "This depends on the extent of damage. Even small fires can produce toxic smoke residues and compromise air quality. We perform air quality testing and recommend temporary relocation if necessary for your safety."
  },
  {
    question: "What items can be restored after fire damage?",
    answer: "Many items can be restored including furniture, electronics, clothing, documents, and photographs. Our content restoration specialists use ultrasonic cleaning, ozone treatment, and specialized techniques to salvage your valuable possessions."
  }
]

// Service schema data
const fireDamageServiceSchema = generateServiceSchema({
  name: 'Fire Damage Restoration',
  description: 'Complete fire damage restoration including smoke removal, soot cleanup, odour elimination, and structural repairs. 24/7 emergency response across Brisbane and Queensland.',
  image: '/images/services/fire-damage-restoration.webp',
  areaServed: ['Brisbane', 'Gold Coast', 'Ipswich', 'Logan City', 'Toowoomba', 'Sunshine Coast']
})

// Breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://disasterrecovery.com.au' },
  { name: 'Services', url: 'https://disasterrecovery.com.au/services' },
  { name: 'Fire Damage Restoration', url: 'https://disasterrecovery.com.au/services/fire-damage-restoration' }
])

export default function FireDamageRestorationPage() {
  return (
    <div className="min-h-screen">
      {/* Structured Data for SEO */}
      <StructuredData data={fireDamageServiceSchema} />
      <StructuredData data={generateFAQSchema(fireDamageFAQs)} />
      <StructuredData data={breadcrumbSchema} />

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white py-3 px-4">
        <div className="container mx-auto flex items-center justify-center gap-4">
          <Flame className="h-5 w-5 animate-pulse" />
          <span className="font-bold">24/7 Fire Damage Emergency Response</span>
          <a href="tel:1300309361" className="font-bold underline">1300 309 361</a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-orange-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Fire & Smoke Damage Restoration Specialists in Queensland
              </h1>
              <p className="text-xl text-gray-700 mb-8">
                IICRC certified fire restoration experts providing complete fire damage recovery, 
                smoke removal, and odour elimination. Insurance approved with 25+ years experience.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="lg" className="bg-orange-600 hover:bg-orange-700">
                      <Phone className="mr-2 h-5 w-5" />
                      Emergency Fire Response
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>24/7 Fire Damage Emergency Service</DialogTitle>
                      <DialogDescription>
                        Our fire damage specialists are ready to respond immediately to secure and restore your property.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 pt-4">
                      <a href="tel:1300309361" className="flex items-center justify-center gap-2 bg-orange-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-orange-700">
                        <Phone className="h-5 w-5" />
                        Call 1300 309 361
                      </a>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="text-center">
                          <Truck className="h-8 w-8 mx-auto mb-1 text-orange-600" />
                          <p className="font-medium">Rapid Response</p>
                          <p className="text-gray-600">&lt; 60 minutes</p>
                        </div>
                        <div className="text-center">
                          <Shield className="h-8 w-8 mx-auto mb-1 text-orange-600" />
                          <p className="font-medium">Insurance Help</p>
                          <p className="text-gray-600">We manage claims</p>
                        </div>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <Button size="lg" variant="outline">
                  Free Fire Damage Assessment
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">24/7 Response</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">Insurance Approved</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-orange-600" />
                  <span className="text-sm font-medium">IICRC Certified</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/images/services/fire-damage-restoration.webp"
                alt="Professional fire damage restoration and cleanup service"
                width={600}
                height={400}
                className="rounded-lg shadow-xl"
                priority
                loading="eager"
              />
              <div className="absolute -bottom-4 -right-4 bg-orange-600 text-white p-4 rounded-lg shadow-lg">
                <p className="font-bold text-lg">Emergency Response</p>
                <p className="text-2xl font-bold">24/7 Available</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Critical Services Alert */}
      <section className="bg-red-50 border-t-4 border-red-500 py-8">
        <div className="container mx-auto px-4">
          <div className="flex items-start gap-4">
            <AlertCircle className="h-6 w-6 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-lg mb-2">Critical: Act Fast to Prevent Secondary Damage</h3>
              <p className="text-gray-700">
                Fire damage continues to worsen in the hours and days following a fire. Acidic soot and smoke 
                residues can permanently damage surfaces, while water from firefighting efforts can cause mould 
                growth within 24-48 hours. Immediate professional intervention is essential.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Types Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Comprehensive Fire Damage Restoration Services
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card>
              <CardHeader>
                <Flame className="h-10 w-10 text-orange-600 mb-4" />
                <CardTitle>Emergency Board-Up & Securing</CardTitle>
                <CardDescription>
                  Immediate property protection to prevent further damage
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">24/7 emergency board-up</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Roof tarping & weatherproofing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Security fencing installation</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Debris removal & site safety</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Wind className="h-10 w-10 text-orange-600 mb-4" />
                <CardTitle>Smoke & Soot Removal</CardTitle>
                <CardDescription>
                  Advanced cleaning techniques for complete smoke elimination
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">HEPA air filtration systems</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Dry & wet smoke cleaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Thermal fogging deodorization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Ozone odour treatment</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <Home className="h-10 w-10 text-orange-600 mb-4" />
                <CardTitle>Structural Restoration</CardTitle>
                <CardDescription>
                  Complete rebuild and repair of fire-damaged structures
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Structural assessment & repairs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Electrical & plumbing restoration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Drywall & painting services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <span className="text-sm">Flooring replacement</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Additional Services */}
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle>Contents Restoration</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Professional cleaning and restoration of fire-damaged belongings
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-orange-600 mt-0.5" />
                    <span className="text-sm">Ultrasonic cleaning for electronics</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-orange-600 mt-0.5" />
                    <span className="text-sm">Document & photo restoration</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-orange-600 mt-0.5" />
                    <span className="text-sm">Textile & clothing cleaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-orange-600 mt-0.5" />
                    <span className="text-sm">Furniture restoration</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Water Damage Mitigation</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  Addressing water damage from firefighting efforts
                </p>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-orange-600 mt-0.5" />
                    <span className="text-sm">Water extraction & drying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-orange-600 mt-0.5" />
                    <span className="text-sm">Mould prevention treatment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-orange-600 mt-0.5" />
                    <span className="text-sm">Dehumidification services</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <ArrowRight className="h-4 w-4 text-orange-600 mt-0.5" />
                    <span className="text-sm">Moisture monitoring</span>
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
            Our Fire Damage Restoration Process
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: 1,
                  title: "Emergency Response & Assessment",
                  description: "Immediate 24/7 response, property securing, and comprehensive damage assessment.",
                  time: "Within 1 hour"
                },
                {
                  step: 2,
                  title: "Board-Up & Tarping Services",
                  description: "Secure property with emergency board-up, roof tarping to prevent further damage.",
                  time: "Day 1"
                },
                {
                  step: 3,
                  title: "Water Removal & Drying",
                  description: "Extract water from firefighting efforts and thoroughly dry affected areas.",
                  time: "Days 1-3"
                },
                {
                  step: 4,
                  title: "Smoke & Soot Removal",
                  description: "Professional cleaning of all surfaces using specialized equipment and techniques.",
                  time: "Days 2-5"
                },
                {
                  step: 5,
                  title: "Odour Removal & Deodorization",
                  description: "Advanced odour elimination using thermal fogging and ozone treatment.",
                  time: "Days 4-6"
                },
                {
                  step: 6,
                  title: "Restoration & Reconstruction",
                  description: "Complete restoration including repairs, painting, and final reconstruction.",
                  time: "Week 2 onwards"
                }
              ].map((item) => (
                <div key={item.step} className="flex gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-600 text-white rounded-full flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                  </div>
                  <div className="flex-grow">
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-700 mb-2">{item.description}</p>
                    <span className="text-sm text-orange-600 font-medium">{item.time}</span>
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
            Fire Damage Restoration FAQs
          </h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {fireDamageFAQs.map((faq, index) => (
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

      {/* Insurance Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">
              We Work With All Major Insurance Companies
            </h2>
            <p className="text-center text-gray-700 mb-8">
              Our team handles the entire insurance claim process, ensuring you receive maximum coverage for your fire damage restoration.
            </p>
            <div className="grid md:grid-cols-4 gap-4">
              {['Documentation', 'Claim Filing', 'Adjuster Meeting', 'Direct Billing'].map((service) => (
                <div key={service} className="bg-white p-4 rounded-lg text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <p className="font-medium">{service}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Fire Damage? We're Here to Help 24/7
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't let fire damage devastate your property. Our certified restoration experts 
            are ready to respond immediately and restore your home or business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:1300309361" className="bg-white text-orange-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              Call 1300 309 361 Now
            </a>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-orange-600">
              Schedule Assessment
            </Button>
          </div>
          <p className="mt-6 text-sm">
            Serving Brisbane • Gold Coast • Ipswich • Logan City • Toowoomba • Sunshine Coast
          </p>
        </div>
      </section>
    </div>
  )
}
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { StructuredData } from '@/components/seo/StructuredData'
import { generateSEO, generateLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/seo'
import { Phone, Clock, Shield, Droplets, Flame, AlertTriangle, AlertOctagon, Building2, ArrowRight } from 'lucide-react'

// SEO Metadata
export const metadata: Metadata = generateSEO({
  title: 'Disaster Recovery Services Australia | Water, Fire, Mould Restoration | 24/7 Emergency',
  description: 'Complete disaster recovery services across Australia. Water damage, fire restoration, mould remediation, sewage cleanup, biohazard cleaning. IICRC certified, insurance approved. Call 1300 309 361.',
  keywords: [
    'disaster recovery Brisbane',
    'emergency restoration services',
    'water damage restoration',
    'fire damage restoration',
    'mould remediation Brisbane',
    'sewage cleanup Australia',
    'biohazard cleaning services',
    'storm damage restoration',
    '24 hour emergency restoration',
    'insurance approved restoration'
  ],
  canonical: 'https://disasterrecovery.com.au/services',
  openGraph: {
    title: 'Disaster Recovery Services - 24/7 Emergency Response Brisbane',
    description: 'Professional disaster recovery and restoration services. Water, fire, mould, sewage, biohazard. Fast response, insurance approved.',
    type: 'website'
  }
})

// Local Business Schema
const businessSchema = generateLocalBusinessSchema({
  streetAddress: '123 Main Street',
  postalCode: '4000'
})

// Breadcrumb schema
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://disasterrecovery.com.au' },
  { name: 'Services', url: 'https://disasterrecovery.com.au/services' }
])

const services = [
  {
    title: 'Water Damage Restoration',
    description: 'Emergency water extraction, drying, and complete restoration from floods, burst pipes, and storm damage.',
    icon: Droplets,
    color: 'blue',
    href: '/services/water-damage-restoration',
    features: ['24/7 Emergency Response', 'Water Extraction', 'Structural Drying', 'Mould Prevention'],
    image: '/images/services/water-damage-restoration.webp'
  },
  {
    title: 'Fire Damage Restoration',
    description: 'Complete fire and smoke damage restoration including soot removal, odour elimination, and reconstruction.',
    icon: Flame,
    color: 'orange',
    href: '/services/fire-damage-restoration',
    features: ['Emergency Board-up', 'Smoke & Soot Removal', 'Odour Elimination', 'Full Restoration'],
    image: '/images/services/fire-damage-restoration.webp'
  },
  {
    title: 'Mould Remediation',
    description: 'Professional mould inspection, testing, and complete remediation to protect your health and property.',
    icon: AlertTriangle,
    color: 'green',
    href: '/services/mould-remediation',
    features: ['Mould Inspection', 'Air Quality Testing', 'Safe Removal', 'Prevention Treatment'],
    image: '/images/services/mould-remediation.webp'
  },
  {
    title: 'Sewage Cleanup',
    description: 'Safe and thorough sewage backup cleanup with complete sanitization and decontamination.',
    icon: AlertOctagon,
    color: 'yellow',
    href: '/services/sewage-cleanup',
    features: ['Emergency Response', 'Sewage Extraction', 'Sanitization', 'Decontamination'],
    image: '/images/services/sewage-sanitisation.webp'
  },
  {
    title: 'Biohazard Cleaning',
    description: 'Specialized cleaning for crime scenes, trauma incidents, and hazardous material contamination.',
    icon: AlertOctagon,
    color: 'red',
    href: '/services/biohazard-cleaning',
    features: ['Crime Scene Cleanup', 'Trauma Cleaning', 'Hazmat Removal', 'Safe Disposal'],
    image: '/images/services/crime-scene-remediation.webp'
  },
  {
    title: 'Commercial Services',
    description: 'Large-scale commercial and industrial disaster recovery for businesses across Australia.',
    icon: Building2,
    color: 'purple',
    href: '/services/commercial',
    features: ['Rapid Response', 'Minimal Downtime', 'Insurance Assistance', 'Full Documentation'],
    image: '/images/services/commercial-residential.png'
  }
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen">
      {/* Structured Data */}
      <StructuredData data={businessSchema} />
      <StructuredData data={breadcrumbSchema} />

      {/* Emergency Banner */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-3 px-4">
        <div className="container mx-auto flex items-center justify-center gap-4">
          <Phone className="h-5 w-5 animate-pulse" />
          <span className="font-bold">24/7 Emergency Disaster Recovery Services</span>
          <a href="tel:1300309361" className="font-bold underline">1300 309 361</a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-b from-blue-50 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Professional Disaster Recovery Services Across Australia
            </h1>
            <p className="text-xl text-gray-700 mb-8">
              IICRC certified restoration experts providing 24/7 emergency response for water damage, 
              fire damage, mould remediation, and more. Insurance approved with over 25 years experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <a href="tel:1300309361" className="bg-red-600 text-white px-8 py-4 rounded-lg font-bold hover:bg-red-700 flex items-center justify-center gap-2">
                <Phone className="h-5 w-5" />
                Emergency: 1300 309 361
              </a>
              <Button size="lg" variant="outline">
                Get Free Quote
              </Button>
            </div>

            <div className="flex justify-center gap-8">
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">24/7 Service</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Insurance Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium">Commercial & Residential</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Our Disaster Recovery Services
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.title} className="hover:shadow-xl transition-shadow">
                  <CardHeader>
                    <div className="relative h-48 -mx-6 -mt-6 mb-4">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover rounded-t-lg"
                      />
                      <div className={`absolute top-4 right-4 bg-${service.color}-600 text-white p-3 rounded-full`}>
                        <Icon className="h-6 w-6" />
                      </div>
                    </div>
                    <CardTitle className="text-xl">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2 mb-6">
                      {service.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <ArrowRight className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Link href={service.href}>
                      <Button className="w-full">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Disaster Recovery
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Rapid Response</h3>
              <p className="text-gray-600">
                24/7 emergency service with average response time under 60 minutes
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">Insurance Expertise</h3>
              <p className="text-gray-600">
                We work directly with all major insurance companies and manage your claim
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">25+ Years Experience</h3>
              <p className="text-gray-600">
                IICRC certified technicians with decades of restoration expertise
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">
            Servicing All of Australia
          </h2>
          
          <div className="grid md:grid-cols-5 gap-4 max-w-4xl mx-auto">
            {['Brisbane', 'Gold Coast', 'Ipswich', 'Logan City', 'Toowoomba'].map((area) => (
              <div key={area} className="bg-white p-4 rounded-lg text-center shadow">
                <h3 className="font-bold text-blue-900">{area}</h3>
                <p className="text-sm text-blue-700 mt-1">24/7 Coverage</p>
              </div>
            ))}
          </div>
          
          <p className="text-center mt-8 text-gray-700">
            Plus Sunshine Coast, Moreton Bay, Redlands, and surrounding areas
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Emergency? We're Here 24/7
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't wait when disaster strikes. Our certified restoration experts are ready to respond 
            immediately to minimize damage and restore your property.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:1300309361" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 flex items-center justify-center gap-2">
              <Phone className="h-5 w-5" />
              Call 1300 309 361
            </a>
            <Button size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white hover:text-blue-600">
              Request Service Online
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}

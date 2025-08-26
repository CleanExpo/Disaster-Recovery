import { Metadata } from 'next'
import Link from 'next/link'
import { 
  Phone, 
  Clock, 
  Shield, 
  Droplets, 
  Flame, 
  AlertTriangle, 
  AlertOctagon, 
  Building2, 
  ArrowRight,
  Wind,
  CheckCircle2,
  Zap,
  BadgeCheck
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Professional Disaster Recovery Services | Water, Fire, Mould | 24/7 Emergency',
  description: 'Complete disaster recovery services across Australia. Water damage, fire restoration, mould remediation. IICRC certified, insurance approved. Available 24/7.',
  keywords: 'disaster recovery, water damage, fire damage, mould remediation, emergency restoration, IICRC certified',
}

const services = [
  {
    title: 'Water Damage Restoration',
    description: 'Emergency water extraction, drying, and complete restoration from floods and burst pipes.',
    icon: Droplets,
    colorClass: 'card-water',
    iconClass: 'text-water-600',
    href: '/services/water-damage-restoration',
    features: ['24/7 Emergency Response', 'Water Extraction', 'Structural Drying', 'Mould Prevention'],
    urgency: 'emergency'
  },
  {
    title: 'Fire Damage Restoration',
    description: 'Complete fire and smoke damage restoration including soot removal and odour elimination.',
    icon: Flame,
    colorClass: 'card-fire',
    iconClass: 'text-fire-600',
    href: '/services/fire-damage-restoration',
    features: ['Emergency Board-up', 'Smoke & Soot Removal', 'Odour Elimination', 'Full Restoration'],
    urgency: 'emergency'
  },
  {
    title: 'Mould Remediation',
    description: 'Professional mould inspection, testing, and complete remediation to protect your health.',
    icon: Shield,
    colorClass: 'card-mould',
    iconClass: 'text-mould-600',
    href: '/services/mould-remediation',
    features: ['Mould Inspection', 'Air Quality Testing', 'Safe Removal', 'Prevention Treatment'],
    urgency: 'urgent'
  },
  {
    title: 'Storm Damage',
    description: 'Rapid response to storm, wind, and hail damage with complete restoration services.',
    icon: Wind,
    colorClass: 'card-storm',
    iconClass: 'text-storm-600',
    href: '/services/storm-damage',
    features: ['Emergency Tarping', 'Debris Removal', 'Structural Repairs', 'Insurance Support'],
    urgency: 'emergency'
  },
  {
    title: 'Sewage Cleanup',
    description: 'Safe and thorough sewage backup cleanup with complete sanitization.',
    icon: AlertOctagon,
    colorClass: 'card-biohazard',
    iconClass: 'text-warning-600',
    href: '/services/sewage-cleanup',
    features: ['Emergency Response', 'Sewage Extraction', 'Sanitization', 'Decontamination'],
    urgency: 'emergency'
  },
  {
    title: 'Biohazard Cleaning',
    description: 'Specialized cleaning for crime scenes, trauma incidents, and hazardous materials.',
    icon: AlertTriangle,
    colorClass: 'card-biohazard',
    iconClass: 'text-biohazard-600',
    href: '/services/biohazard-cleaning',
    features: ['Crime Scene Cleanup', 'Trauma Cleaning', 'Hazmat Removal', 'Safe Disposal'],
    urgency: 'urgent'
  }
]

const certifications = [
  { name: 'IICRC Certified', icon: BadgeCheck },
  { name: '24/7 Emergency', icon: Clock },
  { name: 'Insurance Approved', icon: Shield },
  { name: 'Rapid Response', icon: Zap }
]

export default function EnhancedServicesPage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Emergency Alert Banner */}
      <div className="alert alert-emergency mx-0 rounded-none">
        <AlertTriangle className="h-5 w-5 flex-shrink-0" />
        <div className="flex-1">
          <strong className="block text-base">24/7 Emergency Response Available</strong>
          <span className="text-sm">Professional help is just one call away</span>
        </div>
        <a href="tel:1300309361" className="touch-target">
          <button className="btn btn-sm bg-white text-emergency-600 hover:bg-emergency-50">
            <Phone className="mr-2 h-4 w-4" />
            1300 309 361
          </button>
        </a>
      </div>

      {/* Hero Section */}
      <section className="hero py-20">
        <div className="hero-content">
          <h1 className="hero-title">
            Professional Disaster Recovery Services
          </h1>
          <p className="hero-subtitle max-w-3xl mx-auto mb-8">
            IICRC certified restoration experts providing 24/7 emergency response across Australia. 
            Water damage, fire restoration, mould remediation, and more.
          </p>
          
          {/* Certifications */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {certifications.map((cert) => {
              const Icon = cert.icon
              return (
                <div key={cert.name} className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary-600" />
                  <span className="text-sm font-medium text-neutral-700">{cert.name}</span>
                </div>
              )
            })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:1300309361" className="touch-target-lg">
              <button className="btn btn-emergency btn-lg animate-pulse-emergency">
                <Phone className="mr-2 h-5 w-5" />
                Emergency: 1300 309 361
              </button>
            </a>
            <Link href="/get-help" className="touch-target-lg">
              <button className="btn btn-primary btn-lg">
                Get Free Assessment
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-neutral-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Our Restoration Services</h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Comprehensive disaster recovery solutions with certified professionals 
              ready to respond 24/7 to your emergency
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Link key={service.title} href={service.href} className="group">
                  <div className={`card ${service.colorClass} hover:shadow-xl hover:scale-105 transition-all h-full`}>
                    {service.urgency === 'emergency' && (
                      <div className="absolute -top-2 -right-2 z-10">
                        <span className="badge badge-emergency animate-pulse">
                          24/7 Emergency
                        </span>
                      </div>
                    )}
                    
                    <div className="card-header">
                      <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br from-white/50 to-white/30 mb-4`}>
                        <Icon className={`h-8 w-8 ${service.iconClass}`} />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                      <p className="text-neutral-600">{service.description}</p>
                    </div>
                    
                    <div className="card-body">
                      <ul className="space-y-2">
                        {service.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <CheckCircle2 className="h-4 w-4 text-success-600 mt-0.5 flex-shrink-0" />
                            <span className="text-sm text-neutral-700">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="card-footer">
                      <button className="btn btn-sm btn-primary w-full group-hover:bg-primary-700">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container">
          <h2 className="text-center mb-12">Why Choose Our Services</h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="card text-center">
              <div className="card-body">
                <div className="inline-flex p-3 rounded-full bg-emergency-100 mb-4">
                  <Clock className="h-8 w-8 text-emergency-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">24/7 Emergency</h3>
                <p className="text-sm text-neutral-600">Round-the-clock emergency response teams</p>
              </div>
            </div>
            
            <div className="card text-center">
              <div className="card-body">
                <div className="inline-flex p-3 rounded-full bg-success-100 mb-4">
                  <BadgeCheck className="h-8 w-8 text-success-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">IICRC Certified</h3>
                <p className="text-sm text-neutral-600">Industry certified restoration professionals</p>
              </div>
            </div>
            
            <div className="card text-center">
              <div className="card-body">
                <div className="inline-flex p-3 rounded-full bg-primary-100 mb-4">
                  <Shield className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Insurance Approved</h3>
                <p className="text-sm text-neutral-600">Direct insurance billing available</p>
              </div>
            </div>
            
            <div className="card text-center">
              <div className="card-body">
                <div className="inline-flex p-3 rounded-full bg-warning-100 mb-4">
                  <Zap className="h-8 w-8 text-warning-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">Rapid Response</h3>
                <p className="text-sm text-neutral-600">On-site within 2 hours guaranteed</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Services CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-neutral-50 to-white">
        <div className="container">
          <div className="card bg-gradient-primary text-white">
            <div className="card-body text-center py-12">
              <Building2 className="h-12 w-12 mx-auto mb-4" />
              <h2 className="text-white mb-4">Commercial & Industrial Services</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Large-scale disaster recovery for businesses with minimal downtime 
                and comprehensive documentation for insurance claims
              </p>
              <Link href="/services/commercial-services" className="touch-target-lg inline-block">
                <button className="btn btn-lg bg-white text-primary-600 hover:bg-neutral-100">
                  View Commercial Services
                  <ArrowRight className="ml-2 h-5 w-5" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-hero-emergency text-white">
        <div className="container text-center">
          <h2 className="text-white mb-6">Need Emergency Restoration Services?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Don't wait - water, fire, and mould damage worsen rapidly. 
            Our certified professionals are ready to respond immediately.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:1300309361" className="touch-target-xl">
              <button className="btn btn-emergency btn-lg shadow-xl">
                <Phone className="mr-2 h-5 w-5" />
                Call Now: 1300 309 361
              </button>
            </a>
            <Link href="/get-help" className="touch-target-lg">
              <button className="btn bg-white/10 backdrop-blur text-white border-2 border-white hover:bg-white hover:text-emergency-600 btn-lg">
                Request Online Assessment
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
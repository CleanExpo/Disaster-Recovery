import { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
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
  CheckCircle,
  Zap,
  BadgeCheck,
  Home,
  Users
} from 'lucide-react'
import ScrollReveal from '@/components/ScrollReveal'

export const metadata: Metadata = {
  title: 'Professional Restoration Services | Disaster Recovery Australia',
  description: 'Complete disaster recovery services across Australia. Water damage, fire restoration, mould remediation. IICRC certified, insurance approved. Available 24/7.',
  keywords: 'disaster recovery, water damage, fire damage, mould remediation, emergency restoration, IICRC certified',
}

export default function ServicesPage() {
  return (
    <main className="r6-container gradient-mesh-animated grain-texture">
      <ScrollReveal />
      
      {/* Hero Section */}
      <section className="r6-hero bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <p className="r6-hero-badge">
              IICRC Certified Restoration Professionals
            </p>
            <h1 className="r6-hero-title optical-align-headline reveal-text">
              Professional
              <br />
              <span className="r6-text-blue glow-shadow">Restoration Services</span>
            </h1>
            <p className="r6-text-lead max-w-3xl mx-auto">
              Complete disaster recovery solutions with certified professionals ready to respond 24/7 to your emergency.
            </p>
            <div className="flex flex-wrap gap-4 justify-center mt-8">
              <a href="tel:1300566166">
                <button className="r6-btn r6-btn-primary magnetic-btn pulse-cta btn-press shadow-stack">
                  <Phone className="h-4 w-4" />
                  Emergency: 1300 566 166
                </button>
              </a>
              <Link href="/get-quote">
                <button className="r6-btn r6-btn-outline magnetic-btn hover-shift">
                  Get Free Assessment
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="r6-section r6-section-light relative atmosphere-cool">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <BadgeCheck className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">IICRC Certified</p>
            </div>
            <div className="text-center">
              <Clock className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">24/7 Emergency</p>
            </div>
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">Insurance Approved</p>
            </div>
            <div className="text-center">
              <Zap className="h-12 w-12 text-blue-600 mx-auto mb-2" />
              <p className="font-semibold">Rapid Response</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Services Grid */}
      <section className="r6-section bg-white relative gradient-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="r6-heading-xl">
              Our Restoration Services
            </h2>
            <p className="r6-text-lead max-w-3xl mx-auto">
              Comprehensive disaster recovery solutions with certified professionals ready to respond 24/7 to your emergency
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Water Damage */}
            <div className="r6-service-card shadow-stack card-tilt scroll-reveal">
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                24/7 Emergency
              </div>
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/images/optimized/damage/3D Water Damage.png"
                  alt="Water Damage"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="r6-service-content">
                <div className="flex items-center gap-2 mb-4">
                  <Droplets className="h-8 w-8 text-blue-600" />
                  <h3 className="r6-card-title">Water Damage Restoration</h3>
                </div>
                <p className="r6-card-text mb-4">
                  Emergency water extraction, drying, and complete restoration from floods and burst pipes.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">24/7 Emergency Response</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Water Extraction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Structural Drying</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Mould Prevention</span>
                  </li>
                </ul>
                <Link href="/services/water-damage-restoration">
                  <button className="r6-btn-text underline-animate">
                    Learn More
                    <ArrowRight className="h-4 w-4 inline ml-1" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Fire Damage */}
            <div className="r6-service-card shadow-stack card-tilt scroll-reveal" style={{animationDelay: '0.1s'}}>
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                24/7 Emergency
              </div>
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/images/optimized/damage/3D image of a house fire.png"
                  alt="Fire Damage"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="r6-service-content">
                <div className="flex items-center gap-2 mb-4">
                  <Flame className="h-8 w-8 text-orange-600" />
                  <h3 className="r6-card-title">Fire Damage Restoration</h3>
                </div>
                <p className="r6-card-text mb-4">
                  Complete fire and smoke damage restoration including soot removal and odour elimination.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Emergency Board-up</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Smoke & Soot Removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Odour Elimination</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Full Restoration</span>
                  </li>
                </ul>
                <Link href="/services/fire-damage-restoration">
                  <button className="r6-btn-text underline-animate">
                    Learn More
                    <ArrowRight className="h-4 w-4 inline ml-1" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Mould Remediation */}
            <div className="r6-service-card shadow-stack card-tilt scroll-reveal" style={{animationDelay: '0.2s'}}>
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/images/services/professional-mould-cleaning.jpg"
                  alt="Mould Remediation"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="r6-service-content">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="h-8 w-8 text-green-600" />
                  <h3 className="r6-card-title">Mould Remediation</h3>
                </div>
                <p className="r6-card-text mb-4">
                  Professional mould inspection, testing, and complete remediation to protect your health.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Mould Inspection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Air Quality Testing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Safe Removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Prevention Treatment</span>
                  </li>
                </ul>
                <Link href="/services/mould-remediation">
                  <button className="r6-btn-text underline-animate">
                    Learn More
                    <ArrowRight className="h-4 w-4 inline ml-1" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Storm Damage */}
            <div className="r6-service-card shadow-stack card-tilt scroll-reveal" style={{animationDelay: '0.3s'}}>
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                24/7 Emergency
              </div>
              <div className="h-48 relative overflow-hidden">
                <Image
                  src="/images/optimized/damage/3D Vehicle into Home.png"
                  alt="Storm Damage"
                  width={400}
                  height={200}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="r6-service-content">
                <div className="flex items-center gap-2 mb-4">
                  <Wind className="h-8 w-8 text-purple-600" />
                  <h3 className="r6-card-title">Storm Damage</h3>
                </div>
                <p className="r6-card-text mb-4">
                  Rapid response to storm, wind, and hail damage with complete restoration services.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Emergency Tarping</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Debris Removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Structural Repairs</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Insurance Support</span>
                  </li>
                </ul>
                <Link href="/services/storm-damage">
                  <button className="r6-btn-text underline-animate">
                    Learn More
                    <ArrowRight className="h-4 w-4 inline ml-1" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Sewage Cleanup */}
            <div className="r6-service-card shadow-stack card-tilt scroll-reveal" style={{animationDelay: '0.4s'}}>
              <div className="absolute top-4 right-4 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                24/7 Emergency
              </div>
              <div className="h-48 relative overflow-hidden bg-gray-100">
                <div className="flex items-center justify-center h-full">
                  <AlertOctagon className="h-24 w-24 text-yellow-600" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="r6-service-content">
                <div className="flex items-center gap-2 mb-4">
                  <AlertOctagon className="h-8 w-8 text-yellow-600" />
                  <h3 className="r6-card-title">Sewage Cleanup</h3>
                </div>
                <p className="r6-card-text mb-4">
                  Safe and thorough sewage backup cleanup with complete sanitization.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Emergency Response</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Sewage Extraction</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Sanitization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Decontamination</span>
                  </li>
                </ul>
                <Link href="/services/sewage-cleanup">
                  <button className="r6-btn-text underline-animate">
                    Learn More
                    <ArrowRight className="h-4 w-4 inline ml-1" />
                  </button>
                </Link>
              </div>
            </div>

            {/* Biohazard Cleaning */}
            <div className="r6-service-card shadow-stack card-tilt scroll-reveal" style={{animationDelay: '0.5s'}}>
              <div className="h-48 relative overflow-hidden bg-gray-100">
                <div className="flex items-center justify-center h-full">
                  <AlertTriangle className="h-24 w-24 text-red-600" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              </div>
              <div className="r6-service-content">
                <div className="flex items-center gap-2 mb-4">
                  <AlertTriangle className="h-8 w-8 text-red-600" />
                  <h3 className="r6-card-title">Biohazard Cleaning</h3>
                </div>
                <p className="r6-card-text mb-4">
                  Specialized cleaning for crime scenes, trauma incidents, and hazardous materials.
                </p>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Crime Scene Cleanup</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Trauma Cleaning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Hazmat Removal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm">Safe Disposal</span>
                  </li>
                </ul>
                <Link href="/services/biohazard-cleaning">
                  <button className="r6-btn-text underline-animate">
                    Learn More
                    <ArrowRight className="h-4 w-4 inline ml-1" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Services */}
      <section className="r6-section r6-section-light relative atmosphere-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="r6-heading-xl">
              Commercial & Industrial Services
            </h2>
            <p className="r6-text-lead max-w-3xl mx-auto">
              Large-scale disaster recovery for businesses with minimal downtime and comprehensive documentation for insurance claims
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="flex items-start gap-4">
              <Building2 className="h-12 w-12 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Commercial Properties</h3>
                <p className="text-gray-600">Offices, retail stores, restaurants, hotels, and more</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Users className="h-12 w-12 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold mb-2">Minimal Downtime</h3>
                <p className="text-gray-600">Priority response to get your business operational quickly</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <Link href="/services/commercial-services">
              <button className="r6-btn r6-btn-primary magnetic-btn shadow-stack pulse-cta">
                View Commercial Services
                <ArrowRight className="h-4 w-4 inline ml-2" />
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="r6-section bg-white relative gradient-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="r6-heading-xl">
              Why Choose Our Services
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center scroll-reveal">
              <div className="w-20 h-20 bg-gradient-to-br from-blue-50 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">24/7 Emergency</h3>
              <p className="text-gray-600 text-sm">Round-the-clock emergency response teams</p>
            </div>
            
            <div className="text-center scroll-reveal" style={{animationDelay: '0.1s'}}>
              <div className="w-20 h-20 bg-gradient-to-br from-green-50 to-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <BadgeCheck className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">IICRC Certified</h3>
              <p className="text-gray-600 text-sm">Industry certified restoration professionals</p>
            </div>
            
            <div className="text-center scroll-reveal" style={{animationDelay: '0.2s'}}>
              <div className="w-20 h-20 bg-gradient-to-br from-purple-50 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-purple-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Insurance Approved</h3>
              <p className="text-gray-600 text-sm">Direct insurance billing available</p>
            </div>
            
            <div className="text-center scroll-reveal" style={{animationDelay: '0.3s'}}>
              <div className="w-20 h-20 bg-gradient-to-br from-orange-50 to-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="h-10 w-10 text-orange-600" />
              </div>
              <h3 className="font-bold text-lg mb-2">Rapid Response</h3>
              <p className="text-gray-600 text-sm">On-site within 2 hours guaranteed</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="r6-section-blue py-20 relative noise-overlay atmosphere-cool">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 optical-align-headline reveal-text">
            Need Emergency Restoration Services?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Don't wait - water, fire, and mould damage worsen rapidly. Our certified professionals are ready to respond immediately.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:1300566166">
              <button className="r6-btn bg-white text-blue-600 hover:bg-gray-100 magnetic-btn shadow-stack pulse-cta btn-press">
                <Phone className="h-5 w-5" />
                Call Now: 1300 566 166
              </button>
            </a>
            <Link href="/get-quote">
              <button className="r6-btn bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600 magnetic-btn hover-shift smooth-color">
                Request Online Assessment
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
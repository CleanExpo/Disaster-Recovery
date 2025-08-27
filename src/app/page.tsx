import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Phone, 
  ArrowRight,
  Shield,
  CheckCircle,
  MapPin,
  Clock,
  Users,
  Briefcase,
  ChevronRight,
  Home,
  Droplets,
  Flame,
  Wind
} from 'lucide-react';
import ScrollReveal from '@/components/ScrollReveal';

export const metadata: Metadata = {
  title: "Professional Restoration Services | Disaster Recovery Australia",
  description: "IICRC certified restoration professionals providing 24/7 emergency response for water, fire, and storm damage. Insurance approved. Call 1300 566 166.",
  keywords: "disaster recovery, restoration services, water damage, fire damage, IICRC certified, emergency restoration",
};

export default function HomePage() {
  return (
    <main className="r6-container gradient-mesh-animated grain-texture">
      <ScrollReveal />
      {/* Clean Professional Header */}
      <header className="bg-white border-b border-gray-100 relative atmosphere-cool">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center">
              <Image 
                src="/images/disaster-recovery-logo.png" 
                alt="Disaster Recovery" 
                width={200} 
                height={50}
                className="h-12 w-auto"
              />
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <Link href="/services" className="r6-text-black hover:text-blue-600 smooth-color underline-animate hover-shift">
                Services
              </Link>
              <Link href="/about" className="r6-text-black hover:text-blue-600 smooth-color underline-animate hover-shift">
                About
              </Link>
              <Link href="/locations" className="r6-text-black hover:text-blue-600 smooth-color underline-animate hover-shift">
                Locations
              </Link>
              <Link href="/contact" className="r6-text-black hover:text-blue-600 smooth-color underline-animate hover-shift">
                Contact
              </Link>
            </nav>
            
            <div className="flex items-center space-x-4">
              <a href="tel:1300566166" className="hidden lg:flex items-center text-gray-600">
                <Phone className="h-4 w-4 mr-2" />
                <span>1300 566 166</span>
              </a>
              <Link href="/get-quote">
                <button className="r6-btn r6-btn-primary magnetic-btn pulse-cta btn-press focus-premium">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Clean Hero Section */}
      <section className="r6-hero bg-white relative gradient-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="r6-hero-badge">
                Working with hundreds of businesses nationwide
              </p>
              <h1 className="r6-hero-title optical-align-headline reveal-text">
                <span className="kern-Ty">Your perfect</span>
                <br />
                <span className="r6-text-blue glow-shadow">restoration</span>
                <br />
                does exist!
              </h1>
              <p className="r6-text-lead">
                Our team of IICRC certified technicians will restore your property to pre-loss condition. 
                We handle all the hard work, so you don't have to.
              </p>
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="/emergency">
                  <button className="r6-btn r6-btn-primary magnetic-btn pulse-cta btn-press shadow-stack">
                    Emergency Service
                    <ArrowRight className="h-4 w-4 icon-spin" />
                  </button>
                </Link>
                <Link href="/get-quote">
                  <button className="r6-btn r6-btn-outline magnetic-btn hover-shift">
                    Get a Quote
                  </button>
                </Link>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-square bg-gray-50 rounded-3xl overflow-hidden shadow-stack card-tilt">
                <Image
                  src="/images/optimized/damage/3D Water Damage.png"
                  alt="Professional Restoration Services"
                  width={600}
                  height={600}
                  className="w-full h-full object-cover smooth-color"
                />
              </div>
              {/* Floating stats cards */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-stack float-element glass-refraction">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">2,500+</p>
                    <p className="text-sm text-gray-600">Projects Completed</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-stack float-element glass-refraction">
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">24/7</p>
                    <p className="text-sm text-gray-600">Emergency Response</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="r6-section r6-section-light relative atmosphere-cool noise-overlay">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="r6-features-grid">
            <div className="r6-feature-card shadow-stack card-tilt scroll-reveal">
              <Image
                src="/images/icons/mobile-icon.png"
                alt="Mobile First"
                width={58}
                height={58}
                className="r6-feature-icon"
              />
              <h3 className="r6-card-title">24/7 Response</h3>
              <p className="r6-card-text">
                Emergency disasters don't wait - neither do we. Our teams are ready to respond any time, day or night.
              </p>
            </div>
            
            <div className="r6-feature-card shadow-stack card-tilt scroll-reveal">
              <Image
                src="/images/icons/inspections.png"
                alt="IICRC Certified"
                width={58}
                height={58}
                className="r6-feature-icon"
              />
              <h3 className="r6-card-title">IICRC Certified</h3>
              <p className="r6-card-text">
                All technicians are certified to the highest industry standards, ensuring quality restoration every time.
              </p>
            </div>
            
            <div className="r6-feature-card shadow-stack card-tilt scroll-reveal">
              <Image
                src="/images/icons/biohazard-sewage-cleanup.png"
                alt="Insurance Approved"
                width={58}
                height={58}
                className="r6-feature-icon"
              />
              <h3 className="r6-card-title">Insurance Approved</h3>
              <p className="r6-card-text">
                We work directly with all major insurance companies to streamline your claim process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="r6-section bg-white relative gradient-mesh">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="r6-heading-xl">
              Professional Restoration Services
            </h2>
            <p className="r6-text-lead max-w-3xl mx-auto">
              From water damage to fire restoration, our certified teams handle every aspect of property restoration with expertise and care.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <Link href="/services/water-damage">
              <div className="r6-service-card shadow-stack card-tilt scroll-reveal">
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
                  <div className="r6-service-meta">
                    <span>Emergency Service</span>
                    <span>•</span>
                    <span>IICRC S500</span>
                  </div>
                  <h3 className="r6-card-title">Water Damage Restoration</h3>
                  <p className="r6-card-text">
                    Rapid water extraction, structural drying, and mold prevention following industry standards.
                  </p>
                  <button className="r6-btn-text mt-4 underline-animate">
                    Learn More
                  </button>
                </div>
              </div>
            </Link>
            
            <Link href="/services/fire-damage">
              <div className="r6-service-card shadow-stack card-tilt scroll-reveal">
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
                  <div className="r6-service-meta">
                    <span>24/7 Response</span>
                    <span>•</span>
                    <span>IICRC S700</span>
                  </div>
                  <h3 className="r6-card-title">Fire & Smoke Damage</h3>
                  <p className="r6-card-text">
                    Complete fire damage restoration including soot removal, odor elimination, and reconstruction.
                  </p>
                  <button className="r6-btn-text mt-4 underline-animate">
                    Learn More
                  </button>
                </div>
              </div>
            </Link>
            
            <Link href="/services/storm-damage">
              <div className="r6-service-card shadow-stack card-tilt scroll-reveal">
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
                  <div className="r6-service-meta">
                    <span>Insurance Help</span>
                    <span>•</span>
                    <span>Full Service</span>
                  </div>
                  <h3 className="r6-card-title">Storm Damage Repair</h3>
                  <p className="r6-card-text">
                    Emergency tarping, water mitigation, and complete structural repairs after storm events.
                  </p>
                  <button className="r6-btn-text mt-4 underline-animate">
                    Learn More
                  </button>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="r6-section r6-section-light relative atmosphere-warm grain-texture">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="r6-heading-xl mb-6 optical-align-headline reveal-text">
                <span className="kern-To">Trusted by property owners across Australia</span>
              </h2>
              <p className="r6-text-body mb-6">
                With over 15 years of experience and thousands of successful restorations, 
                we're the trusted choice for property owners and insurance companies nationwide.
              </p>
              
              <ul className="r6-list">
                <li className="r6-list-item">
                  <CheckCircle className="r6-list-icon" />
                  <span>IICRC certified technicians with ongoing training</span>
                </li>
                <li className="r6-list-item">
                  <CheckCircle className="r6-list-icon" />
                  <span>Direct insurance billing and claim assistance</span>
                </li>
                <li className="r6-list-item">
                  <CheckCircle className="r6-list-icon" />
                  <span>24/7 emergency response within 60 minutes</span>
                </li>
                <li className="r6-list-item">
                  <CheckCircle className="r6-list-icon" />
                  <span>Guaranteed workmanship and satisfaction</span>
                </li>
              </ul>
              
              <Link href="/about">
                <button className="r6-btn r6-btn-primary mt-8 magnetic-btn shadow-stack pulse-cta">
                  Learn About Us
                  <ArrowRight className="h-4 w-4 icon-spin" />
                </button>
              </Link>
            </div>
            
            <div className="relative">
              <Image
                src="/images/heroes/vehicles-fleet.jpg"
                alt="Professional Restoration Fleet"
                width={600}
                height={400}
                className="rounded-2xl shadow-stack card-tilt"
              />
              <div className="absolute -bottom-8 -right-8 bg-blue-600 text-white p-6 rounded-2xl shadow-stack float-element glow-shadow">
                <p className="text-4xl font-bold">98%</p>
                <p className="text-sm">Customer Satisfaction</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="r6-section-blue py-20 relative noise-overlay atmosphere-cool">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6 optical-align-headline reveal-text">
            Need Emergency Restoration?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Our IICRC certified teams are standing by 24/7 to help restore your property. 
            Don't wait - water and fire damage worsen over time.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a href="tel:1300566166">
              <button className="r6-btn bg-white text-blue-600 hover:bg-gray-100 magnetic-btn shadow-stack pulse-cta btn-press">
                <Phone className="h-5 w-5 float-element" />
                Call 1300 566 166
              </button>
            </a>
            <Link href="/emergency-form">
              <button className="r6-btn bg-transparent text-white border-2 border-white hover:bg-white hover:text-blue-600 magnetic-btn hover-shift smooth-color">
                Request Service Online
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
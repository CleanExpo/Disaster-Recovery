import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  CheckCircle, 
  XCircle, 
  Shield, 
  Clock, 
  AlertTriangle, 
  Phone, 
  ArrowRight,
  Award,
  FileCheck,
  Users,
  TrendingUp,
  Zap,
  Brain,
  Monitor,
  DollarSign,
  Target,
  Building,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  BadgeCheck,
  ShieldCheck,
  UserCheck,
  Briefcase,
  MapPin,
  Droplets,
  Flame,
  Wind,
  Home
} from 'lucide-react';

export const metadata: Metadata = {
  title: "Australia's First Professional Restoration Network | National Restoration Professionals (NRP)",
  description: "Connect directly with certified restoration professionals. No third-party administrators. IICRC certified, fully insured, and accountable. Get professional help now.",
  keywords: "NRP, National Restoration Professionals, restoration network, IICRC certified, professional restoration, disaster recovery, water damage, fire damage, storm damage",
  openGraph: {
    title: "Australia's First Professional Restoration Network - NRP",
    description: "When Disaster Strikes, Professionals Respond. Certified - Insured - Professional - Accountable",
    images: ['/images/logos/nrp/nrp-badge-3d.png'],
  }
};

export default function EnhancedHomePage() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section with Enhanced Design */}
      <section className="hero relative overflow-hidden">
        <div className="hero-content">
          {/* NRP Badge */}
          <div className="flex justify-center mb-6 animate-scale-in">
            <img
              src="/images/logos/nrp/nrp-badge-3d.png"
              alt="National Restoration Professionals"
              className="h-32 w-auto object-contain"
            />
          </div>
          
          <h1 className="hero-title">
            Australia's First Professional Restoration Network
          </h1>
          <p className="text-xl sm:text-2xl text-primary font-semibold mb-2">
            When Disaster Strikes, Professionals Respond
          </p>
          <p className="text-lg text-gray mb-4">
            Certified - Insured - Professional - Accountable
          </p>
          <p className="hero-subtitle max-w-3xl mx-auto">
            Connect directly with National Restoration Professionals (NRP) - Australia's premier network of qualified restoration specialists
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/get-help" className="touch-target-lg">
              <button className="btn btn-emergency btn-lg animate-pulse-emergency w-full sm:w-auto">
                <Phone className="mr-2 h-5 w-5" />
                Get Emergency Help Now
              </button>
            </Link>
            <Link href="/locations" className="touch-target-lg">
              <button className="btn btn-primary btn-lg w-full sm:w-auto">
                <MapPin className="mr-2 h-5 w-5" />
                Find Your Local NRP Professional
              </button>
            </Link>
            <Link href="#comparison" className="touch-target">
              <button className="btn btn-secondary w-full sm:w-auto">
                <ArrowRight className="mr-2 h-5 w-5" />
                Learn Why We're Different
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Alert Banner */}
      <div className="alert alert-emergency mx-4 sm:mx-6 lg:mx-auto max-w-7xl -mt-8 relative z-10 shadow-lg">
        <AlertTriangle className="h-5 w-5 flex-shrink-0" />
        <div className="flex-1">
          <strong className="block text-base">24/7 Emergency Response Available</strong>
          <span className="text-sm">Professional help is just one call away. Our NRP certified technicians are ready to respond.</span>
        </div>
        <Link href="/get-help" className="touch-target">
          <button className="btn btn-sm btn-emergency">
            Call Now
          </button>
        </Link>
      </div>

      {/* Problem Statement Section with Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container">
          <h2 className="text-center mb-12">The Current System Is Failing Australian Homeowners</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Administrative Incompetence */}
            <div className="card hover:shadow-xl transition-all">
              <div className="card-header">
                <XCircle className="h-12 w-12 text-emergency mb-3" />
                <h3 className="text-xl font-semibold">Administrative Incompetence</h3>
              </div>
              <div className="card-body">
                <p className="text-gray">Third-party administrators without restoration experience making critical decisions from office chairs</p>
              </div>
            </div>

            {/* Unqualified Builders */}
            <div className="card hover:shadow-xl transition-all">
              <div className="card-header">
                <XCircle className="h-12 w-12 text-emergency mb-3" />
                <h3 className="text-xl font-semibold">Unqualified Builders</h3>
              </div>
              <div className="card-body">
                <p className="text-gray">Builders managing restoration without specialized cleaning and remediation expertise</p>
              </div>
            </div>

            {/* Cost Cutting Focus */}
            <div className="card hover:shadow-xl transition-all">
              <div className="card-header">
                <XCircle className="h-12 w-12 text-emergency mb-3" />
                <h3 className="text-xl font-semibold">Cost Cutting Focus</h3>
              </div>
              <div className="card-body">
                <p className="text-gray">Cheapest bidder approach compromising quality and safety standards</p>
              </div>
            </div>

            {/* Claim Delays */}
            <div className="card hover:shadow-xl transition-all">
              <div className="card-header">
                <AlertTriangle className="h-12 w-12 text-warning mb-3" />
                <h3 className="text-xl font-semibold">Claim Delays</h3>
              </div>
              <div className="card-body">
                <p className="text-gray">Delayed claims processing due to inexperience and administrative burden</p>
              </div>
            </div>

            {/* No Accountability */}
            <div className="card hover:shadow-xl transition-all">
              <div className="card-header">
                <AlertTriangle className="h-12 w-12 text-warning mb-3" />
                <h3 className="text-xl font-semibold">No Accountability</h3>
              </div>
              <div className="card-body">
                <p className="text-gray">No accountability when restoration goes wrong or takes too long</p>
              </div>
            </div>

            {/* Statistical Impact */}
            <div className="card hover:shadow-xl transition-all">
              <div className="card-header">
                <AlertTriangle className="h-12 w-12 text-warning mb-3" />
                <h3 className="text-xl font-semibold">Statistical Impact</h3>
              </div>
              <div className="card-body">
                <ul className="space-y-2">
                  <li className="text-sm">• Average delays: 4-12 months</li>
                  <li className="text-sm">• Secondary damage: +45%</li>
                  <li className="text-sm">• Compensation: Up to $6,300</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NRP Solution Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-primary-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="mb-4">Introducing National Restoration Professionals (NRP)</h2>
            <p className="hero-subtitle">Revolutionary Approach to Restoration</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Direct Professional Service */}
            <div className="card card-water animate-slide-up">
              <div className="card-header">
                <CheckCircle2 className="h-12 w-12 text-success mb-3" />
                <h3 className="text-xl font-semibold">Direct Professional Service</h3>
              </div>
              <div className="card-body">
                <p>No third-party administrators between you and qualified restoration experts</p>
              </div>
            </div>

            {/* Certified Specialists */}
            <div className="card card-fire animate-slide-up" style={{animationDelay: '100ms'}}>
              <div className="card-header">
                <Award className="h-12 w-12 text-success mb-3" />
                <h3 className="text-xl font-semibold">Certified Specialists</h3>
              </div>
              <div className="card-body">
                <p>All contractors hold IICRC certifications and specialized training</p>
              </div>
            </div>

            {/* 100% Verified Professionals */}
            <div className="card card-mold animate-slide-up" style={{animationDelay: '200ms'}}>
              <div className="card-header">
                <UserCheck className="h-12 w-12 text-success mb-3" />
                <h3 className="text-xl font-semibold">100% Verified Professionals</h3>
              </div>
              <div className="card-body">
                <p>Comprehensive background checks by independent investigators</p>
              </div>
            </div>

            {/* Real-time Documentation */}
            <div className="card animate-slide-up" style={{animationDelay: '300ms'}}>
              <div className="card-header">
                <FileCheck className="h-12 w-12 text-success mb-3" />
                <h3 className="text-xl font-semibold">Real-time Documentation</h3>
              </div>
              <div className="card-body">
                <p>Clean Claims integration with technology ensuring complete transparency</p>
              </div>
            </div>

            {/* AI-Powered Efficiency */}
            <div className="card animate-slide-up" style={{animationDelay: '400ms'}}>
              <div className="card-header">
                <Brain className="h-12 w-12 text-success mb-3" />
                <h3 className="text-xl font-semibold">AI-Powered Efficiency</h3>
              </div>
              <div className="card-body">
                <p>Advanced AI algorithms eliminate administrative delays and errors</p>
              </div>
            </div>

            {/* Performance Guarantee */}
            <div className="card animate-slide-up" style={{animationDelay: '500ms'}}>
              <div className="card-header">
                <ShieldCheck className="h-12 w-12 text-success mb-3" />
                <h3 className="text-xl font-semibold">Performance Guarantee</h3>
              </div>
              <div className="card-body">
                <p>Professional standards backed by insurance and performance bonds</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section with Service Cards */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container">
          <h2 className="text-center mb-12">Professional Services</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Water Damage */}
            <Link href="/services/water-damage" className="block">
              <div className="card card-water group hover:scale-105 transition-transform">
                <div className="card-body text-center">
                  <Droplets className="h-16 w-16 mx-auto mb-4 text-primary group-hover:animate-pulse" />
                  <h3 className="text-xl font-semibold mb-2">Water Damage Restoration</h3>
                  <p className="text-gray">24/7 emergency water extraction and drying services</p>
                </div>
              </div>
            </Link>

            {/* Fire Damage */}
            <Link href="/services/fire-damage" className="block">
              <div className="card card-fire group hover:scale-105 transition-transform">
                <div className="card-body text-center">
                  <Flame className="h-16 w-16 mx-auto mb-4 text-warning group-hover:animate-pulse" />
                  <h3 className="text-xl font-semibold mb-2">Fire Damage Restoration</h3>
                  <p className="text-gray">Complete fire and smoke damage restoration</p>
                </div>
              </div>
            </Link>

            {/* Storm Damage */}
            <Link href="/services/storm-damage" className="block">
              <div className="card card-storm group hover:scale-105 transition-transform">
                <div className="card-body text-center">
                  <Wind className="h-16 w-16 mx-auto mb-4 text-primary group-hover:animate-pulse" />
                  <h3 className="text-xl font-semibold mb-2">Storm Damage Repair</h3>
                  <p className="text-gray">Emergency storm damage response and repair</p>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-primary text-white">
        <div className="container text-center">
          <h2 className="text-white mb-6">Get Professional Assessment Now</h2>
          <p className="text-xl mb-8 opacity-90">
            Don't let your situation worsen. Connect with NRP certified professionals immediately.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/get-help" className="touch-target-xl">
              <button className="btn btn-emergency btn-lg shadow-xl">
                <Phone className="mr-2 h-5 w-5" />
                Call 1800 NRP NOW
              </button>
            </Link>
            <Link href="/contractor" className="touch-target-lg">
              <button className="btn bg-white text-primary hover:bg-gray-100 btn-lg">
                <Briefcase className="mr-2 h-5 w-5" />
                Join NRP Professional Network
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="animate-fade-in">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-sm text-gray">Certified Professionals</p>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '100ms'}}>
              <div className="text-3xl font-bold text-success mb-2">24/7</div>
              <p className="text-sm text-gray">Emergency Response</p>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '200ms'}}>
              <div className="text-3xl font-bold text-warning mb-2">4.9/5</div>
              <p className="text-sm text-gray">Customer Rating</p>
            </div>
            <div className="animate-fade-in" style={{animationDelay: '300ms'}}>
              <div className="text-3xl font-bold text-primary mb-2">15+</div>
              <p className="text-sm text-gray">Years Experience</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
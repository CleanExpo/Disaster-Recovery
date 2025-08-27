import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Shield, CheckCircle, ArrowRight, MessageCircle, Users, Star, ChevronDown, ChevronUp, Award, Zap, FileSearch, Wrench, Truck, ClipboardCheck } from 'lucide-react';

export const metadata: Metadata = {
  title: "Disaster Recovery Australia | 24/7 Emergency Restoration Services",
  description: "Professional restoration services for water, fire, and storm damage. IICRC certified, insurance approved. Call 1300 566 166.",
};

export default function LandingPage() {
  return (
    <>
      {/* Emergency Banner with Enhanced Animation */}
      <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white py-2 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-center space-x-4">
            <span className="animate-pulse">🚨</span>
            <p className="font-bold text-sm md:text-base tracking-wide">
              EMERGENCY RESPONSE ACTIVE • 24/7 TEAMS READY • CALL 1300 566 166 NOW
            </p>
            <span className="animate-pulse">🚨</span>
          </div>
        </div>
      </div>

      {/* Enhanced Professional Header */}
      <header className="bg-white shadow-lg sticky top-0 z-50 border-b-4 border-red-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section with Trust Indicators */}
            <div className="flex items-center space-x-4">
              <Link href="/" className="relative group">
                <Image
                  src="/images/optimized/branding/Disaster Recovery Logo.png"
                  alt="Disaster Recovery Australia - 24/7 Emergency Services"
                  width={200}
                  height={70}
                  className="h-14 w-auto transition-transform duration-300 group-hover:scale-105"
                  priority
                />
                <div className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"></div>
              </Link>
              
              {/* Trust Badges */}
              <div className="hidden lg:flex items-center space-x-3">
                <div className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-xs font-bold flex items-center">
                  <Shield className="h-4 w-4 mr-1" />
                  IICRC Certified
                </div>
                <div className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-bold flex items-center">
                  <CheckCircle className="h-4 w-4 mr-1" />
                  Insurance Approved
                </div>
              </div>
            </div>
            
            {/* Navigation with Hover Effects */}
            <nav className="hidden lg:flex items-center space-x-8">
              <Link href="#services" className="relative text-gray-700 hover:text-red-600 font-semibold transition-colors duration-300 group">
                Services
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#process" className="relative text-gray-700 hover:text-red-600 font-semibold transition-colors duration-300 group">
                Our Process
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#coverage" className="relative text-gray-700 hover:text-red-600 font-semibold transition-colors duration-300 group">
                Coverage Areas
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
              <Link href="#contact" className="relative text-gray-700 hover:text-red-600 font-semibold transition-colors duration-300 group">
                Contact
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            </nav>
            
            {/* Emergency Contact Section */}
            <div className="flex items-center space-x-4">
              {/* Response Time Indicator */}
              <div className="hidden xl:flex items-center bg-green-50 text-green-700 px-3 py-2 rounded-lg border border-green-200">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                <Clock className="h-4 w-4 mr-1" />
                <span className="text-sm font-bold">60min Response</span>
              </div>
              
              {/* Phone Number with Animation */}
              <a href="tel:1300566166" className="hidden md:flex items-center bg-red-50 text-red-600 px-4 py-2 rounded-lg hover:bg-red-100 transition-all duration-300 group">
                <Phone className="h-5 w-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span className="font-bold text-lg">1300 566 166</span>
              </a>
              
              {/* Emergency CTA Button */}
              <button className="relative bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-3 rounded-lg hover:from-red-700 hover:to-red-800 font-bold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 overflow-hidden group">
                <span className="relative z-10 flex items-center">
                  <span className="animate-pulse mr-2">🚨</span>
                  EMERGENCY
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              
              {/* Mobile Menu Button */}
              <button className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors duration-300">
                <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main>
        
        {/* ========================================= */}
        {/* SECTION 1: HERO & EMERGENCY RESPONSE     */}
        {/* Purpose: Immediate action and urgency     */}
        {/* ========================================= */}
        <section className="relative bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden">
          
          {/* Dynamic Hero with Emergency Messaging */}
          <div className="relative py-16 md:py-24">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/heroes/disaster-recovery-hero.webp"
                alt="Professional disaster recovery team in action"
                fill
                className="object-cover opacity-15"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-r from-red-600/10 via-transparent to-blue-600/10"></div>
            </div>
            
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                {/* Live Availability Indicator */}
                <div className="inline-flex items-center bg-gradient-to-r from-green-100 to-green-50 text-green-800 px-6 py-3 rounded-full mb-8 shadow-lg border border-green-200">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse mr-3"></div>
                  <Users className="h-5 w-5 mr-2" />
                  <span className="font-bold">TEAMS AVAILABLE NOW</span>
                  <span className="mx-2">•</span>
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="font-semibold">60-MIN RESPONSE</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-gray-900 mb-8 leading-none tracking-tight">
                  Emergency Restoration<br />
                  <span className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent">
                    Available Now
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium">
                  Professional disaster recovery for <strong className="text-red-600">water damage</strong>, 
                  <strong className="text-red-600"> fire damage</strong>, and <strong className="text-red-600">mould remediation</strong>. 
                  IICRC certified technicians responding within <strong className="bg-yellow-200 px-2 rounded">60 minutes</strong>.
                </p>

                {/* Multiple Contact Methods */}
                <div className="mb-12">
                  <a href="tel:1300566166" className="inline-block group">
                    <div className="text-5xl md:text-6xl font-black text-red-600 mb-3 group-hover:text-red-700 transition-colors transform group-hover:scale-105 duration-300">
                      1300 566 166
                    </div>
                    <div className="flex items-center justify-center text-lg text-gray-600">
                      <Phone className="h-5 w-5 mr-2 animate-bounce" />
                      <span>24/7 Emergency Hotline</span>
                    </div>
                  </a>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center mb-8">
                  <a href="tel:1300566166" className="group">
                    <button className="bg-gradient-to-r from-red-600 to-red-700 text-white px-14 py-6 rounded-xl hover:from-red-700 hover:to-red-800 flex items-center justify-center text-xl font-black min-h-[70px] w-full sm:w-auto shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse">
                      <Phone className="mr-3 h-7 w-7 group-hover:rotate-12 transition-transform" />
                      CALL EMERGENCY LINE
                    </button>
                  </a>
                  <a href="sms:1300566166" className="group">
                    <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-14 py-6 rounded-xl hover:from-blue-700 hover:to-blue-800 flex items-center justify-center text-xl font-black min-h-[70px] w-full sm:w-auto shadow-2xl transform hover:scale-105 transition-all duration-300">
                      <MessageCircle className="mr-3 h-7 w-7 group-hover:bounce transition-transform" />
                      TEXT US NOW
                    </button>
                  </a>
                </div>
                
                {/* Trust Indicators Above the Fold */}
                <div className="flex flex-wrap justify-center gap-4 mb-8">
                  <div className="bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border">
                    <div className="flex items-center text-sm font-bold text-gray-800">
                      <Shield className="h-4 w-4 mr-2 text-green-600" />
                      IICRC CERTIFIED
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border">
                    <div className="flex items-center text-sm font-bold text-gray-800">
                      <CheckCircle className="h-4 w-4 mr-2 text-blue-600" />
                      INSURANCE APPROVED
                    </div>
                  </div>
                  <div className="bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border">
                    <div className="flex items-center text-sm font-bold text-gray-800">
                      <Star className="h-4 w-4 mr-2 text-yellow-500" />
                      4.9★ RATED
                    </div>
                  </div>
                </div>

                {/* Response Time Guarantee */}
                <div className="inline-flex items-center bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-3 rounded-full shadow-xl">
                  <Zap className="h-5 w-5 mr-2 text-yellow-400 animate-pulse" />
                  <span className="font-bold">Available 24/7 • Licensed & Insured • 60-Minute Response Guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Process Visualization */}
          <div className="bg-gradient-to-r from-gray-50 to-white py-16 border-t border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h3 className="text-center text-3xl font-bold text-gray-900 mb-12">Emergency Response Process</h3>
              
              <div className="grid md:grid-cols-4 gap-8">
                {/* Step 1 */}
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Phone className="h-10 w-10 animate-pulse" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-red-100 text-red-800 text-sm font-black rounded-full w-8 h-8 flex items-center justify-center">1</div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Emergency Call</h4>
                  <p className="text-gray-600">Immediate response within minutes</p>
                  <div className="mt-3 text-sm bg-red-50 text-red-700 px-3 py-1 rounded-full inline-block font-semibold">
                    &lt; 5 minutes
                  </div>
                </div>

                {/* Step 2 */}
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Truck className="h-10 w-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-orange-100 text-orange-800 text-sm font-black rounded-full w-8 h-8 flex items-center justify-center">2</div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Team Dispatch</h4>
                  <p className="text-gray-600">Fully equipped teams deployed</p>
                  <div className="mt-3 text-sm bg-orange-50 text-orange-700 px-3 py-1 rounded-full inline-block font-semibold">
                    60 minutes
                  </div>
                </div>

                {/* Step 3 */}
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <FileSearch className="h-10 w-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-blue-100 text-blue-800 text-sm font-black rounded-full w-8 h-8 flex items-center justify-center">3</div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Assessment</h4>
                  <p className="text-gray-600">Comprehensive damage evaluation</p>
                  <div className="mt-3 text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full inline-block font-semibold">
                    15-30 minutes
                  </div>
                </div>

                {/* Step 4 */}
                <div className="text-center group">
                  <div className="relative mb-6">
                    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-full w-20 h-20 flex items-center justify-center mx-auto shadow-xl group-hover:scale-110 transition-transform duration-300">
                      <Zap className="h-10 w-10" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-green-100 text-green-800 text-sm font-black rounded-full w-8 h-8 flex items-center justify-center">4</div>
                  </div>
                  <h4 className="text-xl font-bold text-gray-900 mb-3">Action</h4>
                  <p className="text-gray-600">Immediate damage mitigation</p>
                  <div className="mt-3 text-sm bg-green-50 text-green-700 px-3 py-1 rounded-full inline-block font-semibold">
                    Starts immediately
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual connector to next section */}
          <div className="h-4 bg-gradient-to-b from-white to-gray-50"></div>
        </section>

        {/* ========================================= */}
        {/* SECTION 2: SERVICES & SOLUTIONS          */}
        {/* Purpose: Show capabilities and expertise  */}
        {/* ========================================= */}
        <section className="relative bg-gradient-to-b from-gray-50 to-white py-20">
          
          {/* Interactive Service Cards */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
                <Wrench className="h-4 w-4 mr-2" />
                <span className="font-semibold">Professional Services</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8">Emergency Services & Solutions</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Comprehensive disaster recovery services available 24/7 with guaranteed response times across Australia
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-10 mb-16">
              {/* Water Damage */}
              <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/services/water-damage-restoration.webp"
                    alt="Water damage restoration service"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      <Clock className="h-3 w-3 inline mr-1" />
                      60-min response
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">Water Damage Restoration</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Emergency water extraction, structural drying, and complete restoration. Available 24/7 for floods, burst pipes, and storm damage.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Emergency water extraction</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Structural drying & dehumidification</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Mould prevention treatment</span>
                    </div>
                  </div>
                  <Link href="tel:1300566166" className="group/btn inline-flex items-center text-blue-600 hover:text-blue-700 font-bold text-lg">
                    Call Emergency Line 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Fire Damage */}
              <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/services/fire-damage-restoration.webp"
                    alt="Fire damage restoration service"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      <Clock className="h-3 w-3 inline mr-1" />
                      60-min response
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">Fire Damage Restoration</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Complete fire and smoke damage restoration including soot removal, odor elimination, and structural repairs.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Soot & smoke damage cleanup</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Odor elimination treatment</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Structural repair & restoration</span>
                    </div>
                  </div>
                  <Link href="tel:1300566166" className="group/btn inline-flex items-center text-blue-600 hover:text-blue-700 font-bold text-lg">
                    Call Emergency Line 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>

              {/* Mould Remediation */}
              <div className="group bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
                <div className="relative h-64 overflow-hidden">
                  <Image
                    src="/images/services/mould-remediation.webp"
                    alt="Mould remediation service"
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      <Clock className="h-3 w-3 inline mr-1" />
                      60-min response
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colors">Mould Remediation</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    Professional mould inspection, testing, and safe removal to protect your family's health and property.
                  </p>
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Comprehensive mould inspection</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Safe containment & removal</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                      <span>Air quality testing & treatment</span>
                    </div>
                  </div>
                  <Link href="tel:1300566166" className="group/btn inline-flex items-center text-blue-600 hover:text-blue-700 font-bold text-lg">
                    Call Emergency Line 
                    <ArrowRight className="ml-2 h-5 w-5 group-hover/btn:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Quick Service Selector */}
            <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold mb-4">Additional Emergency Services</h3>
                <p className="text-gray-300">Specialized restoration services for every emergency situation</p>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-20 transition-all duration-300 cursor-pointer group">
                  <Image
                    src="/images/icons/biohazard-sewage-cleanup.png"
                    alt="Biohazard sewage cleanup"
                    width={48}
                    height={48}
                    className="mx-auto mb-4 group-hover:scale-110 transition-transform"
                  />
                  <h4 className="text-lg font-bold mb-2">Biohazard Cleanup</h4>
                  <p className="text-sm text-gray-300">Safe sewage & contamination remediation</p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-20 transition-all duration-300 cursor-pointer group">
                  <Image
                    src="/images/icons/timber-floor-drying.png"
                    alt="Timber floor drying"
                    width={48}
                    height={48}
                    className="mx-auto mb-4 group-hover:scale-110 transition-transform"
                  />
                  <h4 className="text-lg font-bold mb-2">Floor Restoration</h4>
                  <p className="text-sm text-gray-300">Specialized timber & carpet restoration</p>
                </div>

                <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-opacity-20 transition-all duration-300 cursor-pointer group">
                  <Image
                    src="/images/icons/inspections.png"
                    alt="Property inspections"
                    width={48}
                    height={48}
                    className="mx-auto mb-4 group-hover:scale-110 transition-transform"
                  />
                  <h4 className="text-lg font-bold mb-2">Property Inspections</h4>
                  <p className="text-sm text-gray-300">Comprehensive damage assessment</p>
                </div>
              </div>
            </div>
          </div>

          {/* Before/After Gallery */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span className="font-semibold">Proven Results</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Transformation Gallery</h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                See the dramatic results of our professional restoration work
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              {/* Fire Damage Before/After */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500">
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">Fire Damage Restoration</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-bold text-red-600 mb-3 uppercase tracking-wide">Before</p>
                      <div className="relative h-48 rounded-xl overflow-hidden">
                        <Image
                          src="/images/optimized/damage/3D image of a house fire.png"
                          alt="Fire damaged property before restoration"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-green-600 mb-3 uppercase tracking-wide">After</p>
                      <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-green-50 to-white flex items-center justify-center border-2 border-green-100">
                        <div className="text-center p-6">
                          <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-3 animate-pulse" />
                          <p className="text-gray-800 font-bold text-lg">Fully Restored</p>
                          <p className="text-sm text-gray-600">Professional finish</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <strong>Complete fire restoration:</strong> Structural repairs, soot removal, odor elimination, and full property restoration completed in 5 days.
                    </p>
                  </div>
                </div>
              </div>

              {/* Water Damage Before/After */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500">
                <div className="p-8">
                  <h4 className="text-2xl font-bold text-gray-900 mb-6">Water Damage Recovery</h4>
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <p className="text-sm font-bold text-red-600 mb-3 uppercase tracking-wide">Before</p>
                      <div className="relative h-48 rounded-xl overflow-hidden">
                        <Image
                          src="/images/optimized/damage/3D Vehicle into Home.png"
                          alt="Water damage before restoration"
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-green-600 mb-3 uppercase tracking-wide">After</p>
                      <div className="relative h-48 rounded-xl overflow-hidden bg-gradient-to-br from-blue-50 to-white flex items-center justify-center border-2 border-blue-100">
                        <div className="text-center p-6">
                          <CheckCircle className="h-16 w-16 text-blue-600 mx-auto mb-3 animate-pulse" />
                          <p className="text-gray-800 font-bold text-lg">Fully Dried & Restored</p>
                          <p className="text-sm text-gray-600">Insurance approved</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                    <p className="text-gray-700 text-sm leading-relaxed">
                      <strong>Emergency water extraction:</strong> Complete structural drying, mould prevention, and restoration with direct insurance billing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Service Area Map */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
                <MapPin className="h-4 w-4 mr-2" />
                <span className="font-semibold">Australia Wide Coverage</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Emergency Response Areas</h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Fast response times across Australia's major cities and regional centers
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Sydney */}
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="bg-gradient-to-br from-blue-100 to-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-10 w-10 text-blue-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Sydney</h4>
                <div className="mb-4">
                  <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold">
                    <Clock className="h-4 w-4 mr-2" />
                    30-45 min response
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Greater Sydney, North Shore, Eastern & Western Suburbs</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 font-medium">Coverage: CBD to Parramatta, Cronulla to Hornsby</p>
                </div>
              </div>

              {/* Melbourne */}
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="bg-gradient-to-br from-purple-100 to-purple-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-10 w-10 text-purple-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Melbourne</h4>
                <div className="mb-4">
                  <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-bold">
                    <Clock className="h-4 w-4 mr-2" />
                    30-45 min response
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Greater Melbourne, Bayside, Northern & Eastern Suburbs</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 font-medium">Coverage: CBD to Frankston, Werribee to Ringwood</p>
                </div>
              </div>

              {/* Brisbane */}
              <div className="bg-white rounded-2xl shadow-xl p-8 text-center hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 group">
                <div className="bg-gradient-to-br from-orange-100 to-orange-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-10 w-10 text-orange-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-900 mb-4">Brisbane</h4>
                <div className="mb-4">
                  <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full text-sm font-bold">
                    <Clock className="h-4 w-4 mr-2" />
                    45-60 min response
                  </div>
                </div>
                <p className="text-gray-600 mb-4">Brisbane CBD, Gold Coast, Sunshine Coast, Logan</p>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-sm text-gray-700 font-medium">Coverage: Caboolture to Gold Coast, Ipswich to Redlands</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center bg-gradient-to-r from-red-100 to-red-50 text-red-800 px-8 py-4 rounded-full animate-pulse shadow-lg">
                <Phone className="h-6 w-6 mr-3" />
                <span className="font-bold text-lg">Call 1300 566 166 to confirm coverage in your area</span>
              </div>
            </div>
          </div>

          {/* Visual connector to next section */}
          <div className="mt-20 h-4 bg-gradient-to-b from-white to-gray-50"></div>
        </section>

        {/* ========================================= */}
        {/* SECTION 3: TRUST & SOCIAL PROOF          */}
        {/* Purpose: Build confidence and credibility */}
        {/* ========================================= */}
        <section className="relative bg-gradient-to-b from-gray-50 to-white py-20">
          
          {/* Customer Testimonials with Photos */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-yellow-100 text-yellow-800 px-4 py-2 rounded-full mb-6">
                <Star className="h-4 w-4 mr-2" />
                <span className="font-semibold">Customer Reviews</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8">What Our Customers Say</h2>
              <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Real experiences from families and businesses we've helped during their emergency situations
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12">
              <div className="bg-white rounded-2xl shadow-xl p-10 group hover:shadow-2xl transition-all duration-500">
                <div className="flex mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-8 text-lg leading-relaxed italic">
                  "When our basement flooded at 2 AM, Disaster Recovery had a team at our house within 45 minutes. They saved our home and belongings. Professional, caring, and incredibly fast response. I can't recommend them enough!"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    SM
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-gray-900 text-lg">Sarah Mitchell</p>
                    <p className="text-gray-600">Melbourne • Water Damage Emergency</p>
                    <div className="flex items-center mt-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="font-semibold">Verified Customer</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-2xl shadow-xl p-10 group hover:shadow-2xl transition-all duration-500">
                <div className="flex mb-6">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="h-6 w-6 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-700 mb-8 text-lg leading-relaxed italic">
                  "After our office fire, they handled everything - from damage assessment to insurance paperwork. We were back in business faster than expected. Their team went above and beyond expectations."
                </blockquote>
                <div className="flex items-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg">
                    DJ
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-gray-900 text-lg">David Johnson</p>
                    <p className="text-gray-600">Sydney • Fire Damage Restoration</p>
                    <div className="flex items-center mt-2 text-sm text-green-600">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      <span className="font-semibold">Verified Customer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <div className="inline-flex items-center bg-gray-50 px-6 py-3 rounded-full">
                <div className="flex items-center mr-4">
                  <Star className="h-5 w-5 text-yellow-400 fill-current" />
                  <span className="font-bold text-2xl text-gray-900 ml-1">4.9</span>
                </div>
                <div className="text-left">
                  <p className="font-semibold text-gray-900">Excellent Rating</p>
                  <p className="text-sm text-gray-600">Based on 500+ reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Case Studies with Metrics */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-purple-100 text-purple-800 px-4 py-2 rounded-full mb-6">
                <Award className="h-4 w-4 mr-2" />
                <span className="font-semibold">Success Stories</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Case Studies & Results</h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Real results from actual emergency restoration projects
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-8 border border-blue-100 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-5xl font-black text-blue-600 mb-2">98%</div>
                  <p className="text-lg font-bold text-gray-900">Customer Satisfaction</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Response Time</span>
                    <span className="font-bold text-green-600">45 min avg</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Insurance Claims</span>
                    <span className="font-bold text-green-600">100% processed</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Completion Rate</span>
                    <span className="font-bold text-green-600">99.2%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-8 border border-green-100 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-5xl font-black text-green-600 mb-2">2,500+</div>
                  <p className="text-lg font-bold text-gray-900">Properties Restored</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Water Damage</span>
                    <span className="font-bold text-blue-600">1,200+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Fire Damage</span>
                    <span className="font-bold text-red-600">800+</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Mould Remediation</span>
                    <span className="font-bold text-purple-600">500+</span>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-8 border border-purple-100 shadow-lg">
                <div className="text-center mb-6">
                  <div className="text-5xl font-black text-purple-600 mb-2">15+</div>
                  <p className="text-lg font-bold text-gray-900">Years Experience</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">IICRC Certified</span>
                    <span className="font-bold text-green-600">✓ All techs</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Licensed</span>
                    <span className="font-bold text-green-600">✓ Fully insured</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Available</span>
                    <span className="font-bold text-green-600">24/7/365</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Certifications and Awards */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6">
                <Shield className="h-4 w-4 mr-2" />
                <span className="font-semibold">Industry Recognition</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Certifications & Awards</h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Trusted by industry bodies and recognized for excellence in emergency restoration
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 mb-4 hover:from-blue-100 hover:to-blue-200 transition-all duration-300 group-hover:scale-105">
                  <Award className="h-20 w-20 text-blue-600 mx-auto mb-4" />
                  <h4 className="font-black text-gray-900 text-lg">IICRC</h4>
                  <p className="text-sm text-gray-600">Certified Technicians</p>
                </div>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 mb-4 hover:from-green-100 hover:to-green-200 transition-all duration-300 group-hover:scale-105">
                  <Shield className="h-20 w-20 text-green-600 mx-auto mb-4" />
                  <h4 className="font-black text-gray-900 text-lg">Licensed</h4>
                  <p className="text-sm text-gray-600">Fully Insured</p>
                </div>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 mb-4 hover:from-red-100 hover:to-red-200 transition-all duration-300 group-hover:scale-105">
                  <Clock className="h-20 w-20 text-red-600 mx-auto mb-4" />
                  <h4 className="font-black text-gray-900 text-lg">24/7</h4>
                  <p className="text-sm text-gray-600">Emergency Response</p>
                </div>
              </div>

              <div className="text-center group">
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 mb-4 hover:from-purple-100 hover:to-purple-200 transition-all duration-300 group-hover:scale-105">
                  <CheckCircle className="h-20 w-20 text-purple-600 mx-auto mb-4" />
                  <h4 className="font-black text-gray-900 text-lg">100%</h4>
                  <p className="text-sm text-gray-600">Satisfaction Guarantee</p>
                </div>
              </div>
            </div>
          </div>

          {/* Insurance Partners */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-gray-900 mb-4">Trusted Insurance Partners</h3>
              <p className="text-gray-600 text-lg">We work directly with all major insurance providers for seamless claims processing</p>
            </div>
            
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-8 items-center justify-center">
                <div className="text-center group">
                  <div className="bg-gray-50 rounded-xl p-6 h-24 flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
                    <span className="font-black text-blue-800 text-2xl">AAMI</span>
                  </div>
                </div>
                <div className="text-center group">
                  <div className="bg-gray-50 rounded-xl p-6 h-24 flex items-center justify-center group-hover:bg-red-50 transition-colors duration-300">
                    <span className="font-black text-red-600 text-2xl">Allianz</span>
                  </div>
                </div>
                <div className="text-center group">
                  <div className="bg-gray-50 rounded-xl p-6 h-24 flex items-center justify-center group-hover:bg-green-50 transition-colors duration-300">
                    <span className="font-black text-green-700 text-2xl">NRMA</span>
                  </div>
                </div>
                <div className="text-center group">
                  <div className="bg-gray-50 rounded-xl p-6 h-24 flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
                    <span className="font-black text-blue-600 text-2xl">Suncorp</span>
                  </div>
                </div>
                <div className="text-center group">
                  <div className="bg-gray-50 rounded-xl p-6 h-24 flex items-center justify-center group-hover:bg-purple-50 transition-colors duration-300">
                    <span className="font-black text-purple-600 text-2xl">QBE</span>
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-8">
                <div className="inline-flex items-center bg-green-100 text-green-800 px-6 py-3 rounded-full">
                  <CheckCircle className="h-5 w-5 mr-2" />
                  <span className="font-bold">Direct billing available • No upfront costs • Claims handled for you</span>
                </div>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-gray-100 text-gray-800 px-4 py-2 rounded-full mb-6">
                <MessageCircle className="h-4 w-4 mr-2" />
                <span className="font-semibold">Questions & Answers</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h3>
              <p className="text-xl text-gray-600">
                Quick answers to common emergency restoration questions
              </p>
            </div>
            
            <div className="space-y-6">
              <details className="bg-white rounded-2xl shadow-lg border border-gray-100 group">
                <summary className="cursor-pointer p-8 text-xl font-bold text-gray-900 hover:bg-gray-50 rounded-2xl flex justify-between items-center group-open:rounded-b-none transition-colors">
                  How quickly can you respond to an emergency?
                  <ChevronDown className="h-6 w-6 text-gray-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-8 pb-8 text-gray-700 leading-relaxed text-lg">
                  We guarantee a <strong>60-minute response time</strong> for all emergency calls across major Australian cities. Our teams are on standby 24/7 with fully equipped vehicles ready for immediate dispatch. In many cases, we arrive even sooner.
                </div>
              </details>

              <details className="bg-white rounded-2xl shadow-lg border border-gray-100 group">
                <summary className="cursor-pointer p-8 text-xl font-bold text-gray-900 hover:bg-gray-50 rounded-2xl flex justify-between items-center group-open:rounded-b-none transition-colors">
                  Will insurance cover the restoration costs?
                  <ChevronDown className="h-6 w-6 text-gray-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-8 pb-8 text-gray-700 leading-relaxed text-lg">
                  Most insurance policies cover emergency restoration services. We work directly with <strong>all major insurers</strong> and handle the entire paperwork process for you. We can arrange direct billing to streamline the process and minimize your out-of-pocket expenses.
                </div>
              </details>

              <details className="bg-white rounded-2xl shadow-lg border border-gray-100 group">
                <summary className="cursor-pointer p-8 text-xl font-bold text-gray-900 hover:bg-gray-50 rounded-2xl flex justify-between items-center group-open:rounded-b-none transition-colors">
                  Are your technicians certified and insured?
                  <ChevronDown className="h-6 w-6 text-gray-500 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-8 pb-8 text-gray-700 leading-relaxed text-lg">
                  Yes, <strong>all our technicians are IICRC certified</strong> (Institute of Inspection, Cleaning and Restoration Certification). They undergo continuous training and are fully licensed and insured for your complete protection and peace of mind.
                </div>
              </details>
            </div>
          </div>

          {/* Team Showcase */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <div className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6">
                <Users className="h-4 w-4 mr-2" />
                <span className="font-semibold">Expert Team</span>
              </div>
              <h3 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Why Choose Disaster Recovery Australia?</h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Our certified professionals deliver exceptional results with proven expertise and commitment
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div>
                <ul className="space-y-8">
                  <li className="flex items-start group">
                    <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-xl p-3 mr-6 group-hover:scale-110 transition-transform duration-300">
                      <CheckCircle className="h-8 w-8 text-green-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">IICRC Certified Technicians</h4>
                      <p className="text-gray-600 leading-relaxed">15+ years of experience with the highest industry standards and continuous professional development</p>
                    </div>
                  </li>
                  <li className="flex items-start group">
                    <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-xl p-3 mr-6 group-hover:scale-110 transition-transform duration-300">
                      <Clock className="h-8 w-8 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">60-Minute Response Guarantee</h4>
                      <p className="text-gray-600 leading-relaxed">Teams dispatched immediately across all major cities with fully equipped emergency vehicles</p>
                    </div>
                  </li>
                  <li className="flex items-start group">
                    <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl p-3 mr-6 group-hover:scale-110 transition-transform duration-300">
                      <Shield className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">Direct Insurance Billing</h4>
                      <p className="text-gray-600 leading-relaxed">We handle all paperwork and work directly with insurers to streamline your claims process</p>
                    </div>
                  </li>
                  <li className="flex items-start group">
                    <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-xl p-3 mr-6 group-hover:scale-110 transition-transform duration-300">
                      <Award className="h-8 w-8 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-gray-900 mb-2">100% Satisfaction Guarantee</h4>
                      <p className="text-gray-600 leading-relaxed">Your complete satisfaction is our commitment - we don't rest until the job is done right</p>
                    </div>
                  </li>
                </ul>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-3xl p-12 shadow-xl">
                <div className="mb-10">
                  <div className="relative h-56 rounded-2xl overflow-hidden mb-8 shadow-lg">
                    <Image
                      src="/images/heroes/vehicles-fleet.jpg"
                      alt="Emergency response fleet ready for dispatch"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                  </div>
                </div>
                
                <div className="text-center mb-10">
                  <div className="text-8xl font-black text-blue-600 mb-4 leading-none">2,500+</div>
                  <h4 className="text-2xl text-gray-800 font-bold mb-2">Properties Restored</h4>
                  <p className="text-gray-600">Families and businesses helped across Australia</p>
                </div>
                
                <hr className="my-10 border-blue-200" />
                
                <div className="text-center">
                  <div className="text-8xl font-black text-blue-600 mb-4 leading-none">15+</div>
                  <h4 className="text-2xl text-gray-800 font-bold mb-2">Years Experience</h4>
                  <p className="text-gray-600">Trusted emergency restoration specialists</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================= */}
        {/* FINAL EMERGENCY CTA SECTION              */}
        {/* ========================================= */}
        <section className="py-24 bg-gradient-to-r from-red-600 via-red-700 to-red-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-red-600/90 to-red-700/90"></div>
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iNCIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
          </div>
          
          <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center bg-white bg-opacity-20 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-8 animate-pulse">
              <div className="w-3 h-3 bg-white rounded-full animate-pulse mr-3"></div>
              <span className="font-bold">EMERGENCY TEAMS STANDING BY NOW</span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black mb-8 leading-tight">
              Need Emergency<br />Restoration?
            </h2>
            <p className="text-xl md:text-2xl mb-12 opacity-95 max-w-3xl mx-auto leading-relaxed font-medium">
              Don't wait - <strong>water and fire damage worsen over time</strong>. Our certified teams are ready to respond within 60 minutes to prevent further damage and begin restoration immediately.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center mb-12">
              <a href="tel:1300566166" className="group">
                <button className="bg-white text-red-600 px-16 py-8 rounded-2xl hover:bg-gray-100 flex items-center justify-center text-2xl font-black min-h-[80px] w-full sm:w-auto shadow-2xl transform hover:scale-105 transition-all duration-300 animate-pulse">
                  <Phone className="mr-4 h-8 w-8 group-hover:rotate-12 transition-transform" />
                  CALL 1300 566 166
                </button>
              </a>
              <a href="sms:1300566166" className="group">
                <button className="bg-transparent border-4 border-white px-16 py-8 rounded-2xl hover:bg-white hover:text-red-600 text-2xl font-black min-h-[80px] w-full sm:w-auto flex items-center justify-center transform hover:scale-105 transition-all duration-300">
                  <MessageCircle className="mr-4 h-8 w-8 group-hover:bounce transition-transform" />
                  TEXT US NOW
                </button>
              </a>
            </div>
            
            <div className="text-center">
              <p className="text-lg opacity-90 font-medium mb-4">
                Available 24/7 • Licensed & Insured • 60-Minute Response Guarantee
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm font-bold">
                <div className="flex items-center">
                  <Shield className="h-4 w-4 mr-2" />
                  <span>IICRC Certified</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span>Insurance Approved</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  <span>2,500+ Properties Restored</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Enhanced Emergency Services Footer */}
      <footer className="bg-gradient-to-b from-gray-900 to-black text-white relative">
        {/* Emergency Contact Bar */}
        <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse mr-2"></div>
                  <span className="text-sm font-bold">EMERGENCY TEAMS AVAILABLE NOW</span>
                </div>
                <span className="hidden md:inline text-sm">• 60-Min Response Guarantee</span>
              </div>
              <div className="flex items-center space-x-6">
                <a href="tel:1300566166" className="flex items-center hover:scale-105 transition-transform">
                  <Phone className="h-6 w-6 mr-2 animate-bounce" />
                  <span className="text-2xl font-bold">1300 566 166</span>
                </a>
                <a href="sms:1300566166" className="hidden md:flex items-center bg-white text-red-600 px-4 py-2 rounded-lg hover:bg-red-50 transition-colors">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  <span className="font-bold">Text Us</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            
            {/* Company Info & Trust */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Image
                  src="/images/optimized/branding/Disaster Recovery Logo.png"
                  alt="Disaster Recovery Australia"
                  width={200}
                  height={60}
                  className="h-12 w-auto brightness-0 invert"
                />
              </div>
              <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                Australia's trusted emergency restoration specialists. IICRC certified teams providing 24/7 response 
                for water damage, fire damage, mould remediation, and biohazard cleanup.
              </p>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="bg-gray-800 px-3 py-2 rounded-lg flex items-center text-xs">
                  <Shield className="h-4 w-4 mr-2 text-green-400" />
                  <span>IICRC Certified</span>
                </div>
                <div className="bg-gray-800 px-3 py-2 rounded-lg flex items-center text-xs">
                  <Award className="h-4 w-4 mr-2 text-blue-400" />
                  <span>Licensed & Insured</span>
                </div>
                <div className="bg-gray-800 px-3 py-2 rounded-lg flex items-center text-xs">
                  <Star className="h-4 w-4 mr-2 text-yellow-400" />
                  <span>4.9★ Rating</span>
                </div>
              </div>
              
              {/* Social Media Links */}
              <div className="flex space-x-4">
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                </a>
                <a href="#" className="bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
            
            {/* Emergency Services */}
            <div>
              <h3 className="text-white font-bold mb-4 flex items-center">
                <span className="text-red-500 mr-2">●</span>
                Emergency Services
              </h3>
              <ul className="space-y-3 text-sm">
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Water Damage
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Fire & Smoke
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Mould Remediation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Storm Damage
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors flex items-center group">
                    <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                    Biohazard Cleanup
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Coverage Areas */}
            <div>
              <h3 className="text-white font-bold mb-4">Service Areas</h3>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex items-center justify-between">
                  <span>Sydney</span>
                  <span className="text-xs bg-green-600 px-2 py-1 rounded-full">30-45min</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Melbourne</span>
                  <span className="text-xs bg-green-600 px-2 py-1 rounded-full">30-45min</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Brisbane</span>
                  <span className="text-xs bg-yellow-600 px-2 py-1 rounded-full">45-60min</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Perth</span>
                  <span className="text-xs bg-yellow-600 px-2 py-1 rounded-full">45-60min</span>
                </li>
                <li className="flex items-center justify-between">
                  <span>Adelaide</span>
                  <span className="text-xs bg-yellow-600 px-2 py-1 rounded-full">45-60min</span>
                </li>
              </ul>
            </div>
            
            {/* Quick Contact */}
            <div>
              <h3 className="text-white font-bold mb-4">24/7 Contact</h3>
              <div className="space-y-3">
                <a href="tel:1300566166" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  <Phone className="h-4 w-4 mr-3 text-red-500" />
                  <span className="text-sm">1300 566 166</span>
                </a>
                <a href="mailto:emergency@disasterrecovery.com.au" className="flex items-center text-gray-300 hover:text-white transition-colors">
                  <Mail className="h-4 w-4 mr-3 text-red-500" />
                  <span className="text-sm">emergency@disasterrecovery.com.au</span>
                </a>
                <div className="flex items-center text-gray-300">
                  <Clock className="h-4 w-4 mr-3 text-green-500" />
                  <span className="text-sm">24/7 Emergency Response</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <MapPin className="h-4 w-4 mr-3 text-blue-500" />
                  <span className="text-sm">Australia Wide Coverage</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Insurance Partners */}
          <div className="mt-8 pt-8 border-t border-gray-800">
            <p className="text-center text-sm text-gray-400 mb-4">Direct Billing With All Major Insurance Companies</p>
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-50">
              <span className="text-gray-400 text-sm">AAMI</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">Allianz</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">NRMA</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">Suncorp</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">QBE</span>
              <span className="text-gray-400 text-sm">•</span>
              <span className="text-gray-400 text-sm">CGU</span>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center md:text-left">
              © 2025 Disaster Recovery Australia. All rights reserved. ABN: 12 345 678 901
            </p>
            <div className="flex space-x-6 text-sm text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-red-600 text-white p-4 shadow-2xl z-50 md:hidden">
        <div className="flex gap-3">
          <a href="tel:1300566166" className="flex-1">
            <button className="w-full bg-white text-red-600 py-4 rounded-lg font-bold text-lg flex items-center justify-center animate-pulse min-h-[60px] shadow-lg">
              <Phone className="mr-2 h-6 w-6" />
              Call Now
            </button>
          </a>
          <a href="sms:1300566166" className="flex-1">
            <button className="w-full bg-transparent border-2 border-white py-4 rounded-lg font-bold text-lg flex items-center justify-center min-h-[60px]">
              <MessageCircle className="mr-2 h-6 w-6" />
              Text Us
            </button>
          </a>
        </div>
        <div className="text-center mt-2">
          <p className="text-sm opacity-90">60-Minute Emergency Response • Available 24/7</p>
        </div>
      </div>

      {/* Add bottom padding to prevent content from being hidden behind sticky bar on mobile */}
      <div className="h-24 md:hidden"></div>
    </>
  );
}
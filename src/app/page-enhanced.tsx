'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Shield, Building2, Globe2, Zap, Users, CheckCircle, 
  ArrowRight, Briefcase, Home, Factory, Hospital, Plane,
  Droplets, Flame, Bug, AlertTriangle, Cloud, Wrench,
  Phone, Clock, Award, Star, TrendingUp, Target,
  CheckSquare, FileCheck, DollarSign, MapPin, 
  ChevronRight, Play, X
} from 'lucide-react';
import LightningEffect from '@/components/effects/LightningEffect';
import { Logo, HeaderLogo } from '@/components/Logo';

export default function EnhancedLandingPage() {
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [videoModalOpen, setVideoModalOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Stats Counter Animation
  const [statsVisible, setStatsVisible] = useState(false);
  const stats = [
    { value: '24/7', label: 'Emergency Response', icon: Clock },
    { value: '115K+', label: 'Contractors Nationwide', icon: Users },
    { value: '$4.2B', label: 'Market Coverage', icon: TrendingUp },
    { value: '100%', label: 'Australia Coverage', icon: MapPin }
  ];

  const testimonials = [
    {
      quote: "Water damage at 2AM, contractor on-site by 6AM. Incredible response time.",
      author: "Sarah M.",
      location: "Brisbane",
      rating: 5
    },
    {
      quote: "Professional network that actually delivers. Insurance claim handled seamlessly.",
      author: "James K.",
      location: "Sydney",
      rating: 5
    },
    {
      quote: "As a contractor, NRP has transformed our business. Quality leads, fair pricing.",
      author: "Mike's Restoration",
      location: "Melbourne",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Lightning Effect - Background */}
      <LightningEffect />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500 rounded-full filter blur-3xl opacity-10 animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-green-500 rounded-full filter blur-3xl opacity-10 animate-pulse animation-delay-2000" />
      </div>

      {/* Hero Section with 3D Visual */}
      <section className="relative pt-20 pb-32" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              {/* Logo Integration */}
              <div className="flex items-center justify-center lg:justify-start gap-4 mb-8">
                <Image
                  src="/logos/3D Disaster Recovery Round Borders.png"
                  alt="Disaster Recovery 3D Logo"
                  width={80}
                  height={80}
                  className="drop-shadow-2xl"
                />
                <div>
                  <h1 className="text-4xl font-bold text-white">Disaster Recovery</h1>
                  <p className="text-blue-300 text-sm">Powered by NRP Network</p>
                </div>
              </div>

              {/* Main Headline */}
              <h2 className="text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
                Australia's First
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">
                  AI-Powered Restoration Network
                </span>
              </h2>

              {/* Value Proposition */}
              <p className="text-xl text-blue-200 mb-8 leading-relaxed">
                Connecting insurance claims to verified contractors in minutes, not days.
                Every disaster. Every location. Zero callbacks.
              </p>

              {/* Trust Signals */}
              <div className="flex flex-wrap gap-4 mb-8 justify-center lg:justify-start">
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-white text-sm">Insurance Approved</span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full">
                  <Award className="h-5 w-5 text-yellow-400" />
                  <span className="text-white text-sm">Certified Network</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/client/instant-quote"
                  className="group px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-bold text-lg hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300 transform hover:scale-105"
                >
                  <span className="flex items-center justify-center gap-2">
                    Get Instant Help
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </Link>
                
                <button 
                  onClick={() => setVideoModalOpen(true)}
                  className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-bold text-lg hover:bg-white/20 transition-all duration-300"
                >
                  <span className="flex items-center justify-center gap-2">
                    <Play className="h-5 w-5" />
                    Watch Demo
                  </span>
                </button>
              </div>
            </div>

            {/* Right Visual - 3D Hero Image */}
            <div className="relative">
              <div className="relative w-full h-[500px]">
                <Image
                  src="/images/optimised/damage/3D image of a house fire.png"
                  alt="3D Emergency Response Visual"
                  fill
                  className="object-contain drop-shadow-2xl animate-float"
                  priority
                />
                {/* Floating badges around image */}
                <div className="absolute top-10 right-10 px-4 py-2 bg-red-500/90 backdrop-blur-sm rounded-full text-white font-bold animate-bounce">
                  24/7 Response
                </div>
                <div className="absolute bottom-10 left-10 px-4 py-2 bg-blue-500/90 backdrop-blur-sm rounded-full text-white font-bold animate-bounce animation-delay-1000">
                  AI Matching
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section with Animation */}
      <section className="relative py-20 bg-black/30 backdrop-blur-sm" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-blue-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Grid with 3D Images */}
      <section className="relative py-20" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              Complete Disaster Coverage
            </h3>
            <p className="text-xl text-blue-300 max-w-3xl mx-auto">
              From water damage to biohazards, our network handles every emergency with certified professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Water Damage Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/80 to-blue-800/50 backdrop-blur-sm border border-blue-500/30 hover:border-blue-400/50 transition-all duration-500 hover:scale-105">
              <div className="aspect-video relative">
                <Image
                  src="/images/optimised/damage/3D Vehicle into Home.png"
                  alt="Emergency Water Damage"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Droplets className="h-8 w-8 text-blue-400" />
                  <h4 className="text-2xl font-bold text-white">Water & Flood</h4>
                </div>
                <p className="text-blue-200 mb-4">
                  Immediate extraction, drying, and restoration. Insurance approved processes.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-semibold">Available 24/7</span>
                  <ArrowRight className="h-5 w-5 text-blue-400 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {/* Fire Damage Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-red-900/80 to-orange-800/50 backdrop-blur-sm border border-red-500/30 hover:border-red-400/50 transition-all duration-500 hover:scale-105">
              <div className="aspect-video relative">
                <Image
                  src="/images/optimised/damage/3D image of a house fire.png"
                  alt="Fire Damage Restoration"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <Flame className="h-8 w-8 text-red-400" />
                  <h4 className="text-2xl font-bold text-white">Fire & Smoke</h4>
                </div>
                <p className="text-red-200 mb-4">
                  Complete fire damage restoration, smoke removal, and structural repairs.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-semibold">Rapid Response</span>
                  <ArrowRight className="h-5 w-5 text-red-400 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>

            {/* Biohazard Card */}
            <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/80 to-purple-800/50 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:scale-105">
              <div className="aspect-video relative">
                <Image
                  src="/images/optimised/process/3D Hazardous Cleaning.png"
                  alt="Biohazard Cleanup"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="h-8 w-8 text-purple-400" />
                  <h4 className="text-2xl font-bold text-white">Biohazard</h4>
                </div>
                <p className="text-purple-200 mb-4">
                  Certified biohazard, trauma, and contamination cleanup specialists.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-green-400 font-semibold">Certified Teams</span>
                  <ArrowRight className="h-5 w-5 text-purple-400 group-hover:translate-x-2 transition-transform" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Process Flow */}
      <section className="relative py-20 bg-black/40 backdrop-blur-sm" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              Simple 3-Step Process
            </h3>
            <p className="text-xl text-blue-300">
              From disaster to restoration in record time
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  1
                </div>
                <div className="mt-4">
                  <Phone className="h-12 w-12 text-blue-400 mb-4" />
                  <h4 className="text-xl font-bold text-white mb-3">Report Damage</h4>
                  <p className="text-blue-200">
                    Call or use our AI chat. Instant assessment and contractor matching.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-green-900/80 to-green-800/50 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  2
                </div>
                <div className="mt-4">
                  <Users className="h-12 w-12 text-green-400 mb-4" />
                  <h4 className="text-xl font-bold text-white mb-3">Contractor Arrives</h4>
                  <p className="text-green-200">
                    Certified professional on-site within hours. Insurance paperwork handled.
                  </p>
                </div>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
              <div className="bg-gradient-to-br from-purple-900/80 to-purple-800/50 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/30">
                <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  3
                </div>
                <div className="mt-4">
                  <CheckCircle className="h-12 w-12 text-purple-400 mb-4" />
                  <h4 className="text-xl font-bold text-white mb-3">Restoration Complete</h4>
                  <p className="text-purple-200">
                    Property restored. Insurance claim processed. Zero hassle guarantee.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel */}
      <section className="relative py-20" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-4xl font-bold text-white mb-4">
              Trusted by Thousands
            </h3>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-xl text-blue-300">
              Real results from real Australians
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-blue-900/80 to-blue-800/50 backdrop-blur-sm rounded-2xl p-8 border border-blue-500/30">
              <div className="text-center">
                <p className="text-2xl text-white mb-6 italic">
                  "{testimonials[activeTestimonial].quote}"
                </p>
                <div className="flex justify-center gap-1 mb-4">
                  {[...Array(testimonials[activeTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-blue-300">
                  <span className="font-bold">{testimonials[activeTestimonial].author}</span>
                  {' - '}
                  {testimonials[activeTestimonial].location}
                </p>
              </div>
              
              {/* Carousel dots */}
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === activeTestimonial 
                        ? 'w-8 bg-blue-400' 
                        : 'bg-blue-600 hover:bg-blue-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dual CTA Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-900/80 to-green-900/80 backdrop-blur-sm" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {/* For Property Owners */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Home className="h-10 w-10 text-green-400" />
                <h3 className="text-2xl font-bold text-white">Property Owners</h3>
              </div>
              <p className="text-blue-200 mb-6">
                Disaster struck? Get immediate help from certified professionals. Insurance approved.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  24/7 Emergency Response
                </li>
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Insurance Claim Assistance
                </li>
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  Guaranteed Quality Work
                </li>
              </ul>
              <Link 
                href="/client/emergency"
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-bold hover:shadow-xl transition-all"
              >
                Get Emergency Help Now
              </Link>
            </div>

            {/* For Contractors */}
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="h-10 w-10 text-blue-400" />
                <h3 className="text-2xl font-bold text-white">Contractors</h3>
              </div>
              <p className="text-blue-200 mb-6">
                Join Australia's premier restoration network. Quality leads, fair pricing, instant payment.
              </p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  Pre-Qualified Insurance Jobs
                </li>
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  Territory Protection
                </li>
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="h-5 w-5 text-blue-400" />
                  Instant Payment System
                </li>
              </ul>
              <Link 
                href="/contractor/apply"
                className="block w-full text-center px-6 py-3 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-bold hover:shadow-xl transition-all"
              >
                Apply to Join Network
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="relative py-16 bg-black/40 backdrop-blur-sm" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-6">
          <p className="text-center text-blue-300 mb-8">Trusted by Leading Insurance Companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <Image
              src="/images/logos/3D CARSI Logo.png"
              alt="CARSI Certified"
              width={120}
              height={60}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
            <Image
              src="/images/logos/3D Clean Claims Logo.png"
              alt="Clean Claims Partner"
              width={120}
              height={60}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
            <div className="px-6 py-3 bg-white/10 rounded-lg">
              <p className="text-white font-bold">RIA Member</p>
            </div>
            <div className="px-6 py-3 bg-white/10 rounded-lg">
              <p className="text-white font-bold">IICRC Certified</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video Modal */}
      {videoModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-full max-w-4xl mx-4">
            <button
              onClick={() => setVideoModalOpen(false)}
              className="absolute -top-12 right-0 text-white hover:text-red-400 transition-colors"
            >
              <X className="h-8 w-8" />
            </button>
            <div className="bg-slate-900 rounded-2xl p-2">
              <div className="aspect-video bg-slate-800 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  <Play className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-white text-xl">Demo Video Coming Soon</p>
                  <p className="text-blue-300 mt-2">See how our AI matches you with the perfect contractor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating CTA Button */}
      <div className="fixed bottom-8 right-8 z-40">
        <Link
          href="/client/emergency"
          className="flex items-center gap-2 px-6 py-3 bg-red-600 text-white font-bold rounded-full shadow-2xl hover:bg-red-700 transition-all animate-pulse"
        >
          <Phone className="h-5 w-5" />
          Emergency Help
        </Link>
      </div>
    </div>
  );
}
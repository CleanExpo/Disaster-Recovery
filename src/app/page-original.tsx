'use client';

import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Shield, Building2, Globe2, Zap, Users, CheckCircle, 
  ArrowRight, Briefcase, Home, Factory, Hospital, Plane,
  Droplets, Flame, Bug, AlertTriangle, Cloud, Wrench, Clock, Award, MessageSquare} from 'lucide-react';
import LightningEffect from '@/components/effects/LightningEffect';

// Metadata should be handled in layout.tsx for client components

export default function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative">
      {/* Lightning Effect - Background Layer */}
      <LightningEffect />
      {/* Hero Section */}
      <div className="relative overflow-hidden" style={{ zIndex: 2 }}>
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:50px_50px]" />
        <div className="relative">
          <div className="container mx-auto px-6 py-24">
            <div className="text-center max-w-5xl mx-auto">
              {/* Logo/Brand - Using actual NRP logo */}
              <div className="flex items-center justify-center gap-3 mb-8">
                <img 
                  src="/logos/3D NRP Logo.png" 
                  alt="NRP Logo" 
                  className="h-16 w-16"
                />
                <div className="text-left">
                  <h1 className="text-4xl font-bold text-white">NRP</h1>
                  <p className="text-blue-300 text-sm">National Restoration Professionals</p>
                </div>
              </div>

              {/* Main Heading */}
              <h2 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-normal">
                DEPLOYMENT TEST {new Date().toLocaleTimeString()}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400 pb-4 leading-tight">
                  Network Is Coming
                </span>
              </h2>

              {/* Subtitle */}
              <p className="text-xl lg:text-2xl text-blue-200 mb-12 leading-relaxed">
                The first nationwide platform connecting insurance claims to qualified contractors.
                <span className="block mt-2 text-lg">
                  Every property type. Every disaster. Every location in Australia.
                </span>
              </p>

              {/* Dual Access Buttons */}
              <div className="flex flex-col md:flex-row gap-6 justify-center mb-16">
                <Link 
                  href="/client/access"
                  className="group relative px-8 py-6 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-green-500/25 transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Home className="h-6 w-6" />
                    <div className="text-left">
                      <div className="text-xl font-bold">I Need Help</div>
                      <div className="text-sm opacity-90">Property Owners & Insurers</div>
                    </div>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>

                <Link 
                  href="/contractor/apply"
                  className="group relative px-8 py-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
                >
                  <div className="flex items-center justify-center gap-3">
                    <Briefcase className="h-6 w-6" />
                    <div className="text-left">
                      <div className="text-xl font-bold">Join Network</div>
                      <div className="text-sm opacity-90">Restoration Contractors</div>
                    </div>
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </div>

              {/* Coming Soon Badge */}
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-yellow-500/20 border border-yellow-500/30 rounded-full mb-8">
                <Zap className="h-5 w-5 text-yellow-400 animate-pulse" />
                <span className="text-yellow-300 font-semibold">Launching Q1 2025 - Contractors Apply Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Services Showcase - 3D Images */}
      <div className="relative py-20 bg-gradient-to-b from-slate-800 to-slate-900" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
              We Handle Every Disaster Type
            </h3>
            <p className="text-xl text-blue-300">
              Instant visual recognition - You're in the right place
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-7xl mx-auto">
            {/* Water Damage */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-sm border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300 hover:scale-105">
              <div className="aspect-square relative">
                <Image
                  src="/images/optimized/damage/3D Water Damage to a Home.png"
                  alt="Water Damage Restoration"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <Droplets className="h-5 w-5 text-blue-400 mb-1" />
                  <h4 className="text-white font-semibold text-sm">Water Damage</h4>
                  <p className="text-blue-300 text-xs">24/7 Emergency</p>
                </div>
              </div>
            </div>

            {/* Fire Damage */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-red-900/50 to-orange-800/30 backdrop-blur-sm border border-red-500/30 hover:border-red-400/50 transition-all duration-300 hover:scale-105">
              <div className="aspect-square relative">
                <Image
                  src="/images/optimized/damage/3D Kitchen Fire.png"
                  alt="Fire Damage Restoration"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <Flame className="h-5 w-5 text-red-400 mb-1" />
                  <h4 className="text-white font-semibold text-sm">Fire Damage</h4>
                  <p className="text-red-300 text-xs">Rapid Response</p>
                </div>
              </div>
            </div>

            {/* Mould Remediation */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur-sm border border-green-500/30 hover:border-green-400/50 transition-all duration-300 hover:scale-105">
              <div className="aspect-square relative">
                <Image
                  src="/images/optimized/damage/3D Mould on Ceiling.png"
                  alt="Mould Remediation"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <Bug className="h-5 w-5 text-green-400 mb-1" />
                  <h4 className="text-white font-semibold text-sm">Mould Removal</h4>
                  <p className="text-green-300 text-xs">Health Priority</p>
                </div>
              </div>
            </div>

            {/* Burst Pipes */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-cyan-900/50 to-blue-800/30 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300 hover:scale-105">
              <div className="aspect-square relative">
                <Image
                  src="/images/optimized/damage/3D Burst Water Pipe.png"
                  alt="Burst Pipe Emergency"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <Wrench className="h-5 w-5 text-cyan-400 mb-1" />
                  <h4 className="text-white font-semibold text-sm">Burst Pipes</h4>
                  <p className="text-cyan-300 text-xs">Urgent Response</p>
                </div>
              </div>
            </div>

            {/* Squalor Cleanup */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 hover:scale-105">
              <div className="aspect-square relative">
                <Image
                  src="/images/optimized/damage/3D Emergency Squalor Cleanup.png"
                  alt="Squalor and Hoarding Cleanup"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <AlertTriangle className="h-5 w-5 text-purple-400 mb-1" />
                  <h4 className="text-white font-semibold text-sm">Biohazard</h4>
                  <p className="text-purple-300 text-xs">Specialist Team</p>
                </div>
              </div>
            </div>

            {/* Professional Equipment */}
            <div className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-yellow-900/50 to-orange-800/30 backdrop-blur-sm border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300 hover:scale-105">
              <div className="aspect-square relative">
                <Image
                  src="/images/optimized/equipment/3D LGR Dehumidifier.png"
                  alt="Professional Restoration Equipment"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 16vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <Award className="h-5 w-5 text-yellow-400 mb-1" />
                  <h4 className="text-white font-semibold text-sm">Pro Equipment</h4>
                  <p className="text-yellow-300 text-xs">Industry Leading</p>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-12">
            <div className="flex items-center gap-2 px-4 py-2 bg-green-500/20 border border-green-500/30 rounded-full">
              <MessageSquare className="h-4 w-4 text-green-400" />
              <span className="text-green-300 text-sm font-medium">24/7 Online Emergency Response</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-blue-500/20 border border-blue-500/30 rounded-full">
              <Clock className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm font-medium">60 Minute Response Time</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-full">
              <Award className="h-4 w-4 text-purple-400" />
              <span className="text-purple-300 text-sm font-medium">IICRC Certified Network</span>
            </div>
          </div>
        </div>
      </div>

      {/* Property Coverage Matrix */}
      <div className="relative py-20 bg-black/30" style={{ zIndex: 2 }}>
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Complete Property Coverage Matrix
          </h3>
          
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {/* Residential */}
            <div className="relative overflow-hidden bg-gradient-to-br from-green-900/50 to-green-800/30 backdrop-blur-sm border border-green-500/30 rounded-xl p-6">
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'url("/images/places/3D Family Home.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="relative z-10">
                <Home className="h-8 w-8 text-green-400 mb-3" />
                <h4 className="font-semibold text-green-300 mb-2">Residential</h4>
                <p className="text-green-200 text-sm">
                  Granny flat → 80-floor luxury tower
                </p>
              </div>
            </div>

            {/* Commercial */}
            <div className="relative overflow-hidden bg-gradient-to-br from-blue-900/50 to-blue-800/30 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6">
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'url("/images/places/3D Mega Mall.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="relative z-10">
                <Building2 className="h-8 w-8 text-blue-400 mb-3" />
                <h4 className="font-semibold text-blue-300 mb-2">Commercial</h4>
                <p className="text-blue-200 text-sm">
                  Corner butcher → Mega mall
                </p>
              </div>
            </div>

            {/* Industrial */}
            <div className="relative overflow-hidden bg-gradient-to-br from-orange-900/50 to-orange-800/30 backdrop-blur-sm border border-orange-500/30 rounded-xl p-6">
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'url("/images/places/3D Small Business Industrial.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="relative z-10">
                <Factory className="h-8 w-8 text-orange-400 mb-3" />
                <h4 className="font-semibold text-orange-300 mb-2">Industrial</h4>
                <p className="text-orange-200 text-sm">
                  Workshop → Offshore oil rig
                </p>
              </div>
            </div>

            {/* Institutional */}
            <div className="relative overflow-hidden bg-gradient-to-br from-purple-900/50 to-purple-800/30 backdrop-blur-sm border border-purple-500/30 rounded-xl p-6">
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'url("/images/places/3D Schools.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="relative z-10">
                <Hospital className="h-8 w-8 text-purple-400 mb-3" />
                <h4 className="font-semibold text-purple-300 mb-2">Institutional</h4>
                <p className="text-purple-200 text-sm">
                  Local clinic → Hospital complex
                </p>
              </div>
            </div>

            {/* Infrastructure */}
            <div className="relative overflow-hidden bg-gradient-to-br from-red-900/50 to-red-800/30 backdrop-blur-sm border border-red-500/30 rounded-xl p-6">
              <div 
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: 'url("/images/places/3d Government Buildings.png")',
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}
              />
              <div className="relative z-10">
                <Plane className="h-8 w-8 text-red-400 mb-3" />
                <h4 className="font-semibold text-red-300 mb-2">Infrastructure</h4>
                <p className="text-red-200 text-sm">
                  Bus stop → International airport
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Disaster Types */}
      <div className="relative py-20">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Every Disaster. Every Scale. Everywhere.
          </h3>
          
          <div className="grid md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-lg p-4">
              <Droplets className="h-6 w-6 text-blue-400" />
              <span className="text-slate-200 font-medium">Water/Flood</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-lg p-4">
              <Flame className="h-6 w-6 text-orange-400" />
              <span className="text-slate-200 font-medium">Fire/Smoke</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-lg p-4">
              <Bug className="h-6 w-6 text-green-400" />
              <span className="text-slate-200 font-medium">Mould/Bacteria</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-lg p-4">
              <AlertTriangle className="h-6 w-6 text-red-400" />
              <span className="text-slate-200 font-medium">Biohazard</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-lg p-4">
              <Cloud className="h-6 w-6 text-purple-400" />
              <span className="text-slate-200 font-medium">Storm/Cyclone</span>
            </div>
            <div className="flex items-center gap-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-lg p-4">
              <Wrench className="h-6 w-6 text-yellow-400" />
              <span className="text-slate-200 font-medium">Structural</span>
            </div>
          </div>
        </div>
      </div>

      {/* Contractor Benefits */}
      <div className="relative py-20 bg-gradient-to-b from-blue-900/20 to-transparent">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-3xl font-bold text-white text-center mb-4">
              Contractors: Join Largest Network
            </h3>
            <p className="text-xl text-blue-200 text-center mb-12">
              Your expertise. Our technology. Unlimited growth potential.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6">
                <Globe2 className="h-10 w-10 text-blue-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Nationwide Reach</h4>
                <p className="text-slate-300">
                  Set your service radius. We'll generate thousands of location-specific pages automatically.
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6">
                <Zap className="h-10 w-10 text-yellow-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Instant Leads</h4>
                <p className="text-slate-300">
                  Insurance claims routed directly to you. No cold calling. No marketing costs.
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6">
                <Shield className="h-10 w-10 text-green-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Verified Network</h4>
                <p className="text-slate-300">
                  Background checks, qualifications verified, insurance confirmed. Premium contractors only.
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6">
                <Building2 className="h-10 w-10 text-purple-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">All Property Types</h4>
                <p className="text-slate-300">
                  Residential, commercial, industrial, institutional. From single rooms to 80-floor towers.
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6">
                <Users className="h-10 w-10 text-orange-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Clean Claims Integration</h4>
                <p className="text-slate-300">
                  Seamless connection to your existing CRM and job management system.
                </p>
              </div>
              
              <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-600/30 rounded-xl p-6">
                <CheckCircle className="h-10 w-10 text-red-400 mb-4" />
                <h4 className="text-lg font-semibold text-white mb-2">Territory Control</h4>
                <p className="text-slate-300">
                  Exclusive territory options available. Dominate your local market.
                </p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <Link 
                href="/contractor/apply"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl text-white font-semibold text-lg hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300"
              >
                <Briefcase className="h-6 w-6" />
                Start Your Application
                <ArrowRight className="h-5 w-5" />
              </Link>
              <p className="text-slate-400 mt-4 text-sm">
                7-step verification process. Background checks required. Quality contractors only.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Geographic Coverage */}
      <div className="relative py-20 bg-black/30">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold text-white text-center mb-12">
            Complete Australian Coverage + International
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">8</div>
              <div className="text-slate-300">Capital Cities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">100+</div>
              <div className="text-slate-300">Regional Centres</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-400 mb-2">15,000+</div>
              <div className="text-slate-300">Suburbs & Towns</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">∞</div>
              <div className="text-slate-300">Remote & Offshore</div>
            </div>
          </div>
          
          <p className="text-center text-blue-200 mt-8 text-lg">
            From Sydney CBD to Coober Pedy. From Brisbane to Broome. 
            <span className="block">PNG operations. Offshore platforms. No location too remote.</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative py-12 border-t border-slate-700/50">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-3">
              <Shield className="h-6 w-6 text-blue-400" />
              <div>
                <div className="text-white font-semibold">National Restoration Professionals</div>
                <div className="text-slate-400 text-sm">Australia's Disaster Recovery Network</div>
              </div>
            </div>
            
            <div className="flex gap-6 text-sm">
              <Link href="/contractor/apply" className="text-blue-300 hover:text-blue-200 transition">
                Contractor Application
              </Link>
              <Link href="/about" className="text-blue-300 hover:text-blue-200 transition">
                About NRP
              </Link>
              <Link href="/contact" className="text-blue-300 hover:text-blue-200 transition">
                Contact
              </Link>
            </div>
            
            <div className="text-slate-400 text-sm">
              © 2025 NRP. Launching Soon.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
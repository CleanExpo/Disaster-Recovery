'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  BoltIcon, 
  PhoneIcon, 
  CheckCircleIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

export default function HeroSection() {
  const [currentWord, setCurrentWord] = useState(0);
  const words = ['Water Damage', 'Fire Recovery', 'Mould Removal', 'Storm Damage'];
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: ClockIcon, text: '24/7 Response' },
    { icon: ShieldCheckIcon, text: 'Fully Certified' },
    { icon: CheckCircleIcon, text: 'Insurance Approved' }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Animated background gradient */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 animate-gradient-x" />
      </div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-centre [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      
      {/* Floating particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`
            }}
          >
            <div className="w-2 h-2 bg-cyan-400/20 rounded-full blur-sm" />
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 text-center">
        {/* Emergency badge */}
        <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 bg-red-500/10 border border-red-600/30 rounded-full animate-pulse">
          <BoltIcon className="w-4 h-4 text-red-400" />
          <span className="text-sm font-semibold text-red-400">Emergency Services Available Now</span>
          <div className="w-2 h-2 bg-red-400 rounded-full animate-ping" />
        </div>

        {/* Main heading with animated text */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6">
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            #1
          </span>
          <br />
          <span className="relative">
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {words[currentWord]}
            </span>
            <span className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transform scale-x-0 animate-underline" />
          </span>
          <br />
          <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Recovery Experts
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
          Professional disaster recovery services with guaranteed 
          <span className="text-cyan-400 font-semibold"> 60-minute response time</span> across 
          all major Australian cities
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-blue-700 rounded-full text-white font-bold text-lg transition-all hover:scale-105 hover:shadow-2xl hover:shadow-blue-600/25"
          >
            <PhoneIcon className="w-6 h-6 animate-pulse" />
            <span>Contact Us</span>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-red-600 to-blue-700 blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
          </a>
          
          <Link
            href="/quote"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white font-semibold text-lg transition-all hover:bg-white/20 hover:scale-105"
          >
            <span>Get Instant Quote</span>
            <ArrowRightIcon className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-8 items-center">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-3 px-6 py-3 bg-white/5 backdrop-blur-sm rounded-full border border-white/10"
            >
              <feature.icon className="w-6 h-6 text-cyan-400" />
              <span className="text-gray-300 font-medium">{feature.text}</span>
            </div>
          ))}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-8 h-12 border-2 border-white/20 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-scroll" />
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900 to-transparent" />
    </section>
  );
}
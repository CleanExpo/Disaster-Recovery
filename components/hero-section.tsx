'use client';

import { ArrowRight, CheckCircle, Star } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-br from-[#0F1115] to-[#1a1d29]">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-[#00BFA6]/20 to-[#7C4DFF]/20 rounded-full blur-3xl" style={{animation: 'drift 15s ease-in-out infinite'}}></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-r from-[#7C4DFF]/15 to-[#00BFA6]/15 rounded-full blur-3xl" style={{animation: 'float 12s ease-in-out infinite reverse'}}></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-full blur-3xl" style={{animation: 'drift 18s ease-in-out infinite reverse'}}></div>
        
        {/* Floating Shapes */}
        <div className="absolute top-32 right-1/3 w-8 h-8 bg-[#00BFA6] rounded-full" style={{animation: 'float 6s ease-in-out infinite'}}></div>
        <div className="absolute top-60 left-1/3 w-10 h-10 bg-[#7C4DFF] rounded-full" style={{animation: 'drift 8s ease-in-out infinite'}}></div>
        <div className="absolute bottom-40 right-1/4 w-6 h-6 bg-[#00BFA6] rounded-full" style={{animation: 'float 7s ease-in-out infinite reverse'}}></div>
        <div className="absolute top-80 left-1/2 w-8 h-8 bg-[#7C4DFF] rounded-full" style={{animation: 'drift 9s ease-in-out infinite reverse'}}></div>
        
        {/* Additional Left Side Floating Shapes */}
        <div className="absolute top-48 left-1/5 w-6 h-6 bg-[#00BFA6] rounded-full" style={{animation: 'float 5s ease-in-out infinite reverse'}}></div>
        <div className="absolute top-72 left-1/6 w-7 h-7 bg-[#7C4DFF] rounded-full" style={{animation: 'drift 7s ease-in-out infinite'}}></div>
        <div className="absolute bottom-48 left-1/4 w-5 h-5 bg-[#00BFA6] rounded-full" style={{animation: 'float 6s ease-in-out infinite'}}></div>
        <div className="absolute top-96 left-1/8 w-8 h-8 bg-[#7C4DFF] rounded-full" style={{animation: 'drift 8s ease-in-out infinite reverse'}}></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-24 right-10 w-12 h-12 border-2 border-[#00BFA6]/30 rotate-45 animate-spin"></div>
        <div className="absolute bottom-32 left-10 w-10 h-10 border-2 border-[#7C4DFF]/30 rotate-12 animate-spin delay-1000"></div>
        <div className="absolute top-1/2 right-20 w-14 h-14 border-2 border-[#00BFA6]/20 rotate-45 animate-spin delay-2000"></div>
        
        {/* Additional Left Side Geometric Shapes */}
        <div className="absolute top-40 left-8 w-8 h-8 border-2 border-[#00BFA6]/25 rotate-30 animate-spin delay-500"></div>
        <div className="absolute top-64 left-6 w-6 h-6 border-2 border-[#7C4DFF]/35 rotate-60 animate-spin delay-1500"></div>
        <div className="absolute bottom-48 left-12 w-10 h-10 border-2 border-[#00BFA6]/20 rotate-15 animate-spin delay-3000"></div>
        
        {/* Floating Lines */}
        <div className="absolute top-40 left-1/4 w-48 h-1 bg-gradient-to-r from-transparent via-[#00BFA6]/50 to-transparent animate-pulse"></div>
        <div className="absolute bottom-60 right-1/3 w-36 h-1 bg-gradient-to-r from-transparent via-[#7C4DFF]/50 to-transparent animate-pulse delay-1000"></div>
        
        {/* Additional Left Side Floating Lines */}
        <div className="absolute top-56 left-1/6 w-32 h-0.5 bg-gradient-to-r from-transparent via-[#00BFA6]/40 to-transparent animate-pulse delay-2000"></div>
        <div className="absolute bottom-72 left-1/8 w-28 h-0.5 bg-gradient-to-r from-transparent via-[#7C4DFF]/40 to-transparent animate-pulse delay-3000"></div>
        <div className="absolute top-88 left-1/5 w-24 h-0.5 bg-gradient-to-r from-transparent via-[#00BFA6]/35 to-transparent animate-pulse delay-1500"></div>
        
        {/* Mesh Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA6]/5 via-transparent to-[#7C4DFF]/5"></div>
        
        {/* Additional Floating Elements */}
        <div className="absolute top-1/4 left-1/2 w-4 h-4 bg-[#00BFA6] rounded-full" style={{animation: 'glow 4s ease-in-out infinite'}}></div>
        <div className="absolute bottom-1/3 right-1/2 w-5 h-5 bg-[#7C4DFF] rounded-full" style={{animation: 'glow 5s ease-in-out infinite reverse'}}></div>
        
        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0, 191, 166, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 191, 166, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'grid-move 20s linear infinite'
          }}></div>
        </div>
        
        {/* Floating Particles */}
        <div className="absolute top-20 left-1/3 w-1 h-1 bg-[#00BFA6] rounded-full animate-ping delay-5000"></div>
        <div className="absolute top-60 right-1/4 w-1 h-1 bg-[#7C4DFF] rounded-full animate-ping delay-6000"></div>
        <div className="absolute bottom-40 left-1/5 w-1 h-1 bg-[#00BFA6] rounded-full animate-ping delay-7000"></div>
        
        {/* Additional Left Side Floating Particles */}
        <div className="absolute top-36 left-1/7 w-1 h-1 bg-[#00BFA6] rounded-full animate-ping delay-8000"></div>
        <div className="absolute top-76 left-1/9 w-1 h-1 bg-[#7C4DFF] rounded-full animate-ping delay-9000"></div>
        <div className="absolute bottom-56 left-1/6 w-1 h-1 bg-[#00BFA6] rounded-full animate-ping delay-10000"></div>
        <div className="absolute top-52 left-1/4 w-1 h-1 bg-[#7C4DFF] rounded-full animate-ping delay-11000"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            
            {/* Top Banner */}
            <div className="inline-flex items-center px-4 py-2 bg-[#00BFA6] text-[#0F1115] rounded-full text-sm font-medium">
              Trusted by 500+ Contractors • Save $2,400+ Per Project
            </div>
            
            {/* Main Headline */}
            <div className="space-y-4">
              <h1 className="font-poppins text-5xl md:text-6xl lg:text-7xl leading-tight font-medium">
                End Hidden Costs & <span className="text-[#00BFA6]">Restoration Chaos</span>
              </h1>
              
              <p className="text-lg text-[#9CA3AF] leading-relaxed max-w-3xl mx-auto">
                Stop losing $2,400+ per project to hidden costs and unreliable contractors. 
                Our platform connects property owners with verified professionals and transparent pricing 24/7.
              </p>
              
              <p className="text-base text-[#9CA3AF]">
                Join 500+ contractors saving thousands while growing revenue.
              </p>
            </div>

            {/* Key Benefits - Two Column */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-[#00BFA6] rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#00BFA6]">Complete Transparency</h3>
                </div>
                <p className="text-[#9CA3AF] text-sm">
                  You see everything - transparent pricing, verified contractors, real-time tracking, and complete project control.
                </p>
              </div>
              
              <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-8 h-8 bg-[#7C4DFF] rounded-lg flex items-center justify-center">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-[#7C4DFF]">Full Platform Access</h3>
                </div>
                <p className="text-[#9CA3AF] text-sm">
                  AI-powered matching, automated workflows, secure payments, dedicated support, and complete project management.
                </p>
              </div>
            </div>


            {/* Checkmark Features */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-[#9CA3AF]">
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-[#00BFA6]" />
                <span>Never miss a project again</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-[#00BFA6]" />
                <span>Save 40% on restoration costs</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="h-4 w-4 text-[#00BFA6]" />
                <span>24/7 professional service</span>
              </div>
            </div>

            {/* Main CTA */}
            <div className="space-y-4">
            <Link
                href="/signup"
                className="inline-flex items-center justify-center gap-2 bg-[#00BFA6] hover:bg-[#00A693] text-[#0F1115] font-poppins font-semibold text-lg px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-[#00BFA650]"
              >
                Start Saving Today <ArrowRight className="h-5 w-5" />
              </Link>
              
              {/* Social Proof */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-[#9CA3AF]">4.9/5 from 50+ businesses</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-[#00BFA6]" />
                  <span className="text-[#9CA3AF]">30-day money-back guarantee</span>
                </div>
              </div>
              
              <p className="text-[#9CA3AF] text-xs">
                Free 15-minute demo: See how we can save you $2,400+ monthly
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

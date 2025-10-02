'use client';

import { useState, useEffect } from 'react';
import { Users, Settings, CheckCircle, Zap, Shield, TrendingUp, ArrowRight, Sparkles, Star } from "lucide-react"

export default function SolutionSection() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('solution-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="solution-section" className="py-32 relative overflow-hidden bg-gradient-to-b from-[#1a1d29] to-[#0F1115]">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#00BFA6]/20 to-[#3B82F6]/20 rounded-full blur-3xl animate-pulse shadow-2xl shadow-[#00BFA6]/10"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-[#7C4DFF]/20 to-[#00BFA6]/20 rounded-full blur-3xl animate-pulse animation-delay-2000 shadow-2xl shadow-[#7C4DFF]/10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-[#3B82F6]/15 to-[#7C4DFF]/15 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        
        {/* Success geometric shapes */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border-2 border-[#00BFA6]/30 rotate-45 animate-pulse rounded-lg"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-r from-[#7C4DFF] to-[#00BFA6] rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 left-1/3 w-20 h-20 border-2 border-[#7C4DFF]/30 rotate-12 animate-pulse rounded-full"></div>
        
        {/* Success particles */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#00BFA6] rounded-full animate-ping shadow-lg shadow-[#00BFA6]/50"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-[#3B82F6] rounded-full animate-ping animation-delay-1000 shadow-lg shadow-[#3B82F6]/50"></div>
        <div className="absolute top-1/2 left-3/4 w-2.5 h-2.5 bg-[#8B5CF6] rounded-full animate-ping animation-delay-2000 shadow-lg shadow-[#8B5CF6]/50"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 border border-[#00BFA6]/30 rounded-full text-[#00BFA6] text-sm font-medium mb-6 backdrop-blur-sm">
            <Sparkles className="h-4 w-4 mr-2 animate-pulse" />
            The NRP Solution
          </div>
          <h2 className="font-poppins text-5xl md:text-6xl text-balance mb-6 font-medium">
            The <span className="text-[#00BFA6] bg-gradient-to-r from-[#00BFA6] to-[#7C4DFF] bg-clip-text text-transparent">Smart Bridge</span> That Fixes Everything
          </h2>
          <p className="text-lg text-[#9CA3AF] font-inter max-w-4xl mx-auto leading-relaxed">
            Our AI-powered platform creates a seamless connection between clients and contractors, 
            eliminating the pain points that plague the restoration industry.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12 max-w-8xl mx-auto">
          {/* Client Journey */}
          <div className={`bg-gradient-to-br from-[#2196F3]/20 to-[#1976D2]/10 rounded-3xl p-10 border border-[#2196F3]/30 h-full flex flex-col hover:shadow-2xl hover:shadow-[#2196F3]/20 group transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-10">
              <div className="w-24 h-24 bg-gradient-to-br from-[#2196F3] to-[#1976D2] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#2196F3]/25 group-hover:scale-110 transition-transform duration-300">
                <Users className="h-12 w-12 text-white" />
              </div>
              <h3 className="font-poppins text-2xl text-[#2196F3] mb-3 font-semibold">Client Journey</h3>
              <p className="text-[#9CA3AF] text-sm">Property owners experience seamless restoration services</p>
            </div>
            <div className="space-y-8 text-[#9CA3AF] flex-grow">
              <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-[#2196F3]/10 to-[#1976D2]/5 rounded-2xl border border-[#2196F3]/20 hover:border-[#2196F3]/40 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#2196F3]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-[#2196F3] font-bold text-lg">1</span>
                </div>
                <div>
                  <span className="font-semibold text-[#F9FAFB] block text-base mb-2">Submit Request</span>
                  <span className="text-sm leading-relaxed">Describe your restoration needs through our intuitive platform</span>
                </div>
              </div>
              <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-[#2196F3]/10 to-[#1976D2]/5 rounded-2xl border border-[#2196F3]/20 hover:border-[#2196F3]/40 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#2196F3]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-[#2196F3] font-bold text-lg">2</span>
                </div>
                <div>
                  <span className="font-bold text-[#F9FAFB] block text-lg mb-2">Get Matched</span>
                  <span className="text-sm leading-relaxed">AI-powered matching with verified, quality contractors</span>
                </div>
              </div>
              <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-[#2196F3]/10 to-[#1976D2]/5 rounded-2xl border border-[#2196F3]/20 hover:border-[#2196F3]/40 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#2196F3]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-[#2196F3] font-bold text-lg">3</span>
                </div>
                <div>
                  <span className="font-bold text-[#F9FAFB] block text-lg mb-2">Track Progress</span>
                  <span className="text-sm leading-relaxed">Real-time updates and completely transparent pricing</span>
                </div>
              </div>
              <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-[#2196F3]/10 to-[#1976D2]/5 rounded-2xl border border-[#2196F3]/20 hover:border-[#2196F3]/40 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#2196F3]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-[#2196F3] font-bold text-lg">4</span>
                </div>
                <div>
                  <span className="font-bold text-[#F9FAFB] block text-lg mb-2">Complete Project</span>
                  <span className="text-sm leading-relaxed">Quality assurance and satisfaction guarantee</span>
                </div>
              </div>
            </div>
          </div>

          {/* Platform Bridge */}
          <div className={`bg-gradient-to-br from-[#00BFA6]/20 to-[#00A693]/10 rounded-3xl p-10 border border-[#00BFA6]/30 h-full flex flex-col hover:shadow-2xl hover:shadow-[#00BFA6]/20 group transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-10">
              <div className="w-28 h-28 bg-gradient-to-br from-[#00BFA6] to-[#00A693] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#00BFA6]/25 group-hover:scale-110 transition-transform duration-300">
                <Settings className="h-14 w-14 text-[#0F1115]" />
              </div>
              <h3 className="font-poppins text-2xl text-[#00BFA6] mb-3 font-semibold">Platform Engine</h3>
              <p className="text-[#9CA3AF] text-sm">AI-powered marketplace connecting all stakeholders</p>
            </div>
            <div className="space-y-6 text-[#9CA3AF] text-center flex-grow">
              <div className="bg-gradient-to-r from-[#00BFA6]/10 to-[#00A693]/5 rounded-2xl p-6 border border-[#00BFA6]/20 hover:border-[#00BFA6]/40 transition-all duration-300 group">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <Zap className="h-6 w-6 text-[#00BFA6] group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold text-[#F9FAFB] text-base">Smart Matching</span>
                </div>
                <div className="text-sm leading-relaxed">AI algorithm connects clients with perfect contractors</div>
              </div>
              <div className="bg-gradient-to-r from-[#00BFA6]/10 to-[#00A693]/5 rounded-2xl p-6 border border-[#00BFA6]/20 hover:border-[#00BFA6]/40 transition-all duration-300 group">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <TrendingUp className="h-6 w-6 text-[#00BFA6] group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold text-[#F9FAFB] text-base">Automated Workflows</span>
                </div>
                <div className="text-sm leading-relaxed">Streamlined processes from request to completion</div>
              </div>
              <div className="bg-gradient-to-r from-[#00BFA6]/10 to-[#00A693]/5 rounded-2xl p-6 border border-[#00BFA6]/20 hover:border-[#00BFA6]/40 transition-all duration-300 group">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <Users className="h-6 w-6 text-[#00BFA6] group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold text-[#F9FAFB] text-base">Real-time Communication</span>
                </div>
                <div className="text-sm leading-relaxed">Instant messaging and project updates</div>
              </div>
              <div className="bg-gradient-to-r from-[#00BFA6]/10 to-[#00A693]/5 rounded-2xl p-6 border border-[#00BFA6]/20 hover:border-[#00BFA6]/40 transition-all duration-300 group">
                <div className="flex items-center justify-center space-x-3 mb-3">
                  <Shield className="h-6 w-6 text-[#00BFA6] group-hover:scale-110 transition-transform duration-300" />
                  <span className="font-semibold text-[#F9FAFB] text-base">Secure Payments</span>
                </div>
                <div className="text-sm leading-relaxed">Escrow protection and automated processing</div>
              </div>
            </div>
          </div>

          {/* Contractor Journey */}
          <div className={`bg-gradient-to-br from-[#7C4DFF]/20 to-[#6A1B9A]/10 rounded-3xl p-10 border border-[#7C4DFF]/30 h-full flex flex-col hover:shadow-2xl hover:shadow-[#7C4DFF]/20 group transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="text-center mb-10">
              <div className="w-24 h-24 bg-gradient-to-br from-[#7C4DFF] to-[#6A1B9A] rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-lg shadow-[#7C4DFF]/25 group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
              <h3 className="font-poppins text-2xl text-[#7C4DFF] mb-3 font-semibold">Contractor Journey</h3>
              <p className="text-[#9CA3AF] text-sm">Professionals grow their business through our platform</p>
            </div>
            <div className="space-y-8 text-[#9CA3AF] flex-grow">
              <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-[#7C4DFF]/10 to-[#6A1B9A]/5 rounded-2xl border border-[#7C4DFF]/20 hover:border-[#7C4DFF]/40 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#7C4DFF]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-[#7C4DFF] font-bold text-lg">1</span>
                </div>
                <div>
                  <span className="font-bold text-[#F9FAFB] block text-lg mb-2">Join Platform</span>
                  <span className="text-sm leading-relaxed">Register and complete verification process</span>
                </div>
              </div>
              <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-[#7C4DFF]/10 to-[#6A1B9A]/5 rounded-2xl border border-[#7C4DFF]/20 hover:border-[#7C4DFF]/40 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#7C4DFF]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-[#7C4DFF] font-bold text-lg">2</span>
                </div>
                <div>
                  <span className="font-bold text-[#F9FAFB] block text-lg mb-2">Receive Leads</span>
                  <span className="text-sm leading-relaxed">Get qualified leads matched to your expertise</span>
                </div>
              </div>
              <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-[#7C4DFF]/10 to-[#6A1B9A]/5 rounded-2xl border border-[#7C4DFF]/20 hover:border-[#7C4DFF]/40 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#7C4DFF]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-[#7C4DFF] font-bold text-lg">3</span>
                </div>
                <div>
                  <span className="font-bold text-[#F9FAFB] block text-lg mb-2">Manage Projects</span>
                  <span className="text-sm leading-relaxed">Use platform tools for efficient project management</span>
                </div>
              </div>
              <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-[#7C4DFF]/10 to-[#6A1B9A]/5 rounded-2xl border border-[#7C4DFF]/20 hover:border-[#7C4DFF]/40 transition-all duration-300 group">
                <div className="w-12 h-12 bg-[#7C4DFF]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <span className="text-[#7C4DFF] font-bold text-lg">4</span>
                </div>
                <div>
                  <span className="font-bold text-[#F9FAFB] block text-lg mb-2">Scale Business</span>
                  <span className="text-sm leading-relaxed">Grow through training and business tools</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Bottom Message */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-3xl p-12 border border-[#00BFA6]/20 backdrop-blur-sm">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <Star className="h-8 w-8 text-[#00BFA6] animate-pulse" />
              <h3 className="font-poppins font-bold text-4xl text-[#F9FAFB]">The Perfect Solution</h3>
              <Star className="h-8 w-8 text-[#7C4DFF] animate-pulse" />
            </div>
            <p className="text-2xl font-poppins font-semibold text-[#00BFA6] mb-8">
              One platform. Two solutions. Complete transparency.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-[#00BFA6] mb-2">100%</div>
                <div className="text-[#9CA3AF] text-lg">Transparent Pricing</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#7C4DFF] mb-2">24/7</div>
                <div className="text-[#9CA3AF] text-lg">Project Tracking</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-[#00BFA6] mb-2">98%</div>
                <div className="text-[#9CA3AF] text-lg">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client';

import { useState, useEffect } from 'react';
import { AlertTriangle, FileX, DollarSign, Clock, Users, Briefcase, TrendingDown, XCircle, Zap } from "lucide-react"

export default function ProblemSection() {
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

    const element = document.getElementById('problem-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="problem-section" className="py-32 relative overflow-hidden bg-gradient-to-b from-[#0F1115] to-[#1a1d29]">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-[#FF6B6B]/15 to-[#FF8E53]/15 rounded-full blur-3xl animate-pulse shadow-2xl shadow-[#FF6B6B]/10"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-gradient-to-br from-[#FF8E53]/15 to-[#FF6B6B]/15 rounded-full blur-3xl animate-pulse animation-delay-2000 shadow-2xl shadow-[#FF8E53]/10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-br from-[#FF6B6B]/10 to-[#FF8E53]/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        
        {/* Warning geometric shapes */}
        <div className="absolute top-1/3 right-1/4 w-32 h-32 border-2 border-[#FF6B6B]/30 rotate-45 animate-pulse rounded-lg"></div>
        <div className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-gradient-to-r from-[#FF8E53] to-[#FF6B6B] rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/4 left-1/3 w-20 h-20 border-2 border-[#FF8E53]/30 rotate-12 animate-pulse rounded-full"></div>
        
        {/* Warning particles */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#FF6B6B] rounded-full animate-ping shadow-lg shadow-[#FF6B6B]/50"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-[#FF8E53] rounded-full animate-ping animation-delay-1000 shadow-lg shadow-[#FF8E53]/50"></div>
        <div className="absolute top-1/2 left-3/4 w-2.5 h-2.5 bg-[#FF6B6B] rounded-full animate-ping animation-delay-2000 shadow-lg shadow-[#FF6B6B]/50"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E53]/10 border border-[#FF6B6B]/30 rounded-full text-[#FF6B6B] text-sm font-medium mb-6 backdrop-blur-sm">
            <AlertTriangle className="h-4 w-4 mr-2 animate-pulse" />
            Industry Pain Points
          </div>
          <h2 className="font-poppins text-5xl md:text-6xl text-balance mb-6 font-medium">
            The Restoration Industry is <span className="text-[#FF6B6B] bg-gradient-to-r from-[#FF6B6B] to-[#FF8E53] bg-clip-text text-transparent">Broken</span>
          </h2>
          <p className="text-lg text-[#9CA3AF] font-inter max-w-4xl mx-auto leading-relaxed">
            Both clients and contractors are trapped in a system that creates frustration, inefficiency, and financial uncertainty for everyone involved.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Client Pain Points */}
          <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-3xl p-10 border border-[#374151] hover:border-[#FF6B6B]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FF6B6B]/20 group">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF6B6B] to-[#FF8E53] rounded-2xl flex items-center justify-center mr-6 shadow-lg shadow-[#FF6B6B]/25 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-poppins text-2xl text-[#FF6B6B] mb-2 font-semibold">Client Frustrations</h3>
                  <p className="text-[#9CA3AF] text-sm">Property owners face these daily challenges</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-[#FF6B6B]/5 to-[#FF8E53]/5 rounded-2xl border border-[#FF6B6B]/20 hover:border-[#FF6B6B]/40 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-[#FF6B6B]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <DollarSign className="h-6 w-6 text-[#FF6B6B]" />
                  </div>
                  <div>
                    <h4 className="font-inter text-lg text-[#F9FAFB] mb-3 font-semibold">Hidden Costs & Surprise Fees</h4>
                    <p className="text-[#9CA3AF] leading-relaxed text-sm">
                      Clients discover unexpected charges after work begins, leaving them feeling deceived and financially vulnerable. 
                      <span className="text-[#FF6B6B] font-semibold"> Average surprise cost: $2,400</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-[#FF6B6B]/5 to-[#FF8E53]/5 rounded-2xl border border-[#FF6B6B]/20 hover:border-[#FF6B6B]/40 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-[#FF6B6B]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <AlertTriangle className="h-6 w-6 text-[#FF6B6B]" />
                  </div>
                  <div>
                    <h4 className="font-inter text-lg text-[#F9FAFB] mb-3 font-semibold">Insurance Nightmare</h4>
                    <p className="text-[#9CA3AF] leading-relaxed text-sm">
                      Complex insurance processes with no guidance leave clients lost in paperwork and bureaucracy. 
                      <span className="text-[#FF6B6B] font-semibold"> 73% struggle with claims</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-[#FF6B6B]/5 to-[#FF8E53]/5 rounded-2xl border border-[#FF6B6B]/20 hover:border-[#FF6B6B]/40 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-[#FF6B6B]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <Clock className="h-6 w-6 text-[#FF6B6B]" />
                  </div>
                  <div>
                    <h4 className="font-inter text-lg text-[#F9FAFB] mb-3 font-semibold">Zero Project Visibility</h4>
                    <p className="text-[#9CA3AF] leading-relaxed text-sm">
                      Clients are kept in the dark about project progress, timelines, and next steps. 
                      <span className="text-[#FF6B6B] font-semibold"> 89% report poor communication</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contractor Pain Points */}
          <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-3xl p-10 border border-[#374151] hover:border-[#FF8E53]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#FF8E53]/20 group">
              <div className="flex items-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-br from-[#FF8E53] to-[#FF6B6B] rounded-2xl flex items-center justify-center mr-6 shadow-lg shadow-[#FF8E53]/25 group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h3 className="font-poppins text-2xl text-[#FF8E53] mb-2 font-semibold">Contractor Challenges</h3>
                  <p className="text-[#9CA3AF] text-sm">Professionals struggle with these issues</p>
                </div>
              </div>

              <div className="space-y-8">
                <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-[#FF8E53]/5 to-[#FF6B6B]/5 rounded-2xl border border-[#FF8E53]/20 hover:border-[#FF8E53]/40 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-[#FF8E53]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <TrendingDown className="h-6 w-6 text-[#FF8E53]" />
                  </div>
                  <div>
                    <h4 className="font-inter text-lg text-[#F9FAFB] mb-3 font-semibold">Unreliable Lead Generation</h4>
                    <p className="text-[#9CA3AF] leading-relaxed text-sm">
                      Inconsistent work flow and unreliable lead generation makes business planning impossible. 
                      <span className="text-[#FF8E53] font-semibold"> 67% struggle with cash flow</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-[#FF8E53]/5 to-[#FF6B6B]/5 rounded-2xl border border-[#FF8E53]/20 hover:border-[#FF8E53]/40 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-[#FF8E53]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <XCircle className="h-6 w-6 text-[#FF8E53]" />
                  </div>
                  <div>
                    <h4 className="font-inter text-lg text-[#F9FAFB] mb-3 font-semibold">Payment Disputes</h4>
                    <p className="text-[#9CA3AF] leading-relaxed text-sm">
                      Late payments and payment disputes create cash flow problems and business uncertainty. 
                      <span className="text-[#FF8E53] font-semibold"> 45% face payment delays</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-6 p-6 bg-gradient-to-r from-[#FF8E53]/5 to-[#FF6B6B]/5 rounded-2xl border border-[#FF8E53]/20 hover:border-[#FF8E53]/40 transition-all duration-300 group">
                  <div className="w-12 h-12 bg-[#FF8E53]/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    <FileX className="h-6 w-6 text-[#FF8E53]" />
                  </div>
                  <div>
                    <h4 className="font-inter text-lg text-[#F9FAFB] mb-3 font-semibold">No Standardization</h4>
                    <p className="text-[#9CA3AF] leading-relaxed text-sm">
                      No unified processes or standards across different clients and projects creates inefficiency. 
                      <span className="text-[#FF8E53] font-semibold"> 78% waste time on admin</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Impact Statement */}
        <div className={`text-center mt-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="bg-gradient-to-r from-[#FF6B6B]/10 to-[#FF8E53]/10 rounded-3xl p-12 border border-[#FF6B6B]/20 backdrop-blur-sm">
            <h3 className="font-poppins text-3xl text-[#F9FAFB] mb-6 font-semibold">
              This Broken System Costs Everyone
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-semibold text-[#FF6B6B] mb-2">$2.4B</div>
                <div className="text-[#9CA3AF] text-sm">Annual industry inefficiency</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-[#FF8E53] mb-2">67%</div>
                <div className="text-[#9CA3AF] text-sm">Contractors struggle with cash flow</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-semibold text-[#FF6B6B] mb-2">89%</div>
                <div className="text-[#9CA3AF] text-sm">Clients report poor communication</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

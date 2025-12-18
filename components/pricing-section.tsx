'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle } from "lucide-react"

export default function PricingSection() {
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

    const element = document.getElementById('pricing-section');
    if (element) {
      observer.observe(element);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="pricing-section" className="py-24 relative bg-gradient-to-b from-[#1F2937] to-[#0F1115] overflow-hidden">
      {/* Visual Background Pattern */}
      <div className="absolute inset-0 opacity-15">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='50' height='50' viewBox='0 0 50 50' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%2300BFA6' fill-opacity='0.3'%3E%3Cpath d='M25 25c0-13.807-11.193-25-25-25v25h25z'/%3E%3Cpath d='M25 25c0 13.807 11.193 25 25 25V25H25z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '50px 50px',
          animation: 'pattern-move 35s linear infinite'
        }}></div>
      </div>
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-1/4 w-80 h-80 bg-gradient-to-br from-[#00BFA6]/15 to-[#3B82F6]/15 rounded-full blur-3xl animate-pulse shadow-2xl shadow-[#00BFA6]/10"></div>
        <div className="absolute bottom-10 right-1/4 w-100 h-100 bg-gradient-to-br from-[#7C4DFF]/15 to-[#00BFA6]/15 rounded-full blur-3xl animate-pulse animation-delay-2000 shadow-2xl shadow-[#7C4DFF]/10"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-gradient-to-br from-[#2196F3]/10 to-[#7C4DFF]/10 rounded-full blur-3xl animate-pulse animation-delay-4000"></div>
        
        {/* Additional Visual Elements */}
        <div className="absolute top-1/4 right-1/3 w-32 h-32 border-2 border-[#00BFA6]/25 rotate-45 animate-pulse rounded-lg"></div>
        <div className="absolute bottom-1/4 left-1/3 w-28 h-28 bg-gradient-to-r from-[#7C4DFF] to-[#00BFA6] rounded-full opacity-15 animate-bounce"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="font-poppins text-4xl md:text-5xl text-balance mb-6 font-medium">
            Pricing <span className="text-[#00BFA6] bg-gradient-to-r from-[#00BFA6] to-[#7C4DFF] bg-clip-text text-transparent animate-gradient">Transparency</span>
          </h2>
          <p className="text-lg text-[#9CA3AF] font-inter max-w-3xl mx-auto leading-relaxed">
            Standardized industry pricing — no postcode bias, no hidden fees
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Traditional pricing (left) */}
            <div className={`transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="bg-gradient-to-br from-[#374151] to-[#1F2937] rounded-2xl p-8 border border-[#6B7280] relative hover:border-red-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-red-400/10 card-hover-lift">
                <div className="absolute -top-3 left-6 bg-[#6B7280] text-white px-4 py-1 rounded-full text-sm font-semibold">
                  Traditional Pricing
                </div>

                <div className="mt-4 space-y-6">
                  <div className="flex items-center space-x-3">
                    <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                    <span className="text-[#9CA3AF]">Varies by postcode</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                    <span className="text-[#9CA3AF]">Hidden markup fees</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                    <span className="text-[#9CA3AF]">Inconsistent quality</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <XCircle className="h-6 w-6 text-red-400 flex-shrink-0" />
                    <span className="text-[#9CA3AF]">No price guarantees</span>
                  </div>
                </div>

                {/* Example pricing */}
                <div className="mt-8 bg-[#1F2937] rounded-lg p-4 border border-[#374151]">
                  <h4 className="font-inter font-semibold text-[#F9FAFB] mb-3">Water Damage Example</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Premium suburb</span>
                      <span className="text-red-400 font-semibold">$4,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Standard suburb</span>
                      <span className="text-red-400 font-semibold">$3,100</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Budget suburb</span>
                      <span className="text-red-400 font-semibold">$2,400</span>
                    </div>
                    <div className="border-t border-[#374151] pt-2 text-xs text-[#6B7280]">
                      *Plus hidden fees and markups
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Our pricing (right) */}
            <div className={`transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-gradient-to-br from-[#00BFA6]/20 to-[#00A693]/10 rounded-2xl p-8 border border-[#00BFA6]/30 relative hover:border-[#00BFA6]/50 transition-all duration-300 hover:shadow-2xl hover:shadow-[#00BFA6]/20 card-hover-lift glow-effect">
                <div className="absolute -top-3 left-6 bg-[#00BFA6] text-[#0F1115] px-4 py-1 rounded-full text-sm font-semibold">
                  Our Standardized Pricing
                </div>

                <div className="mt-4 space-y-6">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#00BFA6] flex-shrink-0" />
                    <span className="text-[#F9FAFB]">Same price everywhere</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#00BFA6] flex-shrink-0" />
                    <span className="text-[#F9FAFB]">Transparent, upfront costs</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#00BFA6] flex-shrink-0" />
                    <span className="text-[#F9FAFB]">Guaranteed quality standards</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-6 w-6 text-[#00BFA6] flex-shrink-0" />
                    <span className="text-[#F9FAFB]">Price protection guarantee</span>
                  </div>
                </div>

                {/* Example pricing */}
                <div className="mt-8 bg-[#0F1115] rounded-lg p-4 border border-[#00BFA6]/30">
                  <h4 className="font-inter font-semibold text-[#F9FAFB] mb-3">Water Damage Example</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Any location</span>
                      <span className="text-[#00BFA6] font-semibold">$2,600</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Any location</span>
                      <span className="text-[#00BFA6] font-semibold">$2,600</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#9CA3AF]">Any location</span>
                      <span className="text-[#00BFA6] font-semibold">$2,600</span>
                    </div>
                    <div className="border-t border-[#00BFA6]/30 pt-2 text-xs text-[#00BFA6]">
                      *All fees included, no surprises
                    </div>
                  </div>
                </div>

                {/* Savings indicator */}
                <div className="mt-6 text-center">
                  <div className="bg-[#00BFA6] text-[#0F1115] rounded-lg p-4">
                    <div className="text-2xl font-bold font-poppins">Save up to 38%</div>
                    <div className="text-sm">compared to traditional pricing</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom message */}
          <div className="text-center mt-16">
            <div className="bg-gradient-to-r from-[#00BFA6]/10 to-[#7C4DFF]/10 rounded-2xl p-8 border border-[#00BFA6]/20">
              <h3 className="font-poppins font-semibold text-2xl text-[#00BFA6] mb-4">Fair Pricing for Everyone</h3>
              <p className="text-[#9CA3AF] font-inter text-lg max-w-2xl mx-auto">
                Our standardized pricing ensures that quality restoration services are accessible to everyone,
                regardless of location or economic status.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

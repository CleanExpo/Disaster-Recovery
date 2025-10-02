'use client';

import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, FileText, CheckCircle, Shield, Heart, Scale, Building } from "lucide-react";
import { useTenant, useIndustryConfig } from '@/contexts/TenantContext';

export default function ConfigurableHeroSection() {
  const { tenant } = useTenant();
  const { industry, serviceCategories } = useIndustryConfig();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const getIndustryContent = () => {
    switch (industry) {
      case 'healthcare':
        return {
          badge: '🏥 Australia\'s Leading Healthcare Platform',
          title: 'The Smart Way to Connect with Healthcare Professionals',
          subtitle: 'Our platform connects patients with verified healthcare providers through transparent scheduling, automated workflows, and real-time care tracking.',
          primaryCta: 'Find Healthcare Provider',
          secondaryCta: 'Learn More',
          features: [
            { icon: Users, text: 'Verified Healthcare Providers' },
            { icon: FileText, text: 'Transparent Scheduling' },
            { icon: CheckCircle, text: 'Quality Assurance' }
          ],
          heroIcon: Heart,
          heroColor: 'text-red-500'
        };
      case 'legal':
        return {
          badge: '⚖️ Australia\'s Leading Legal Services Platform',
          title: 'The Smart Way to Connect with Legal Professionals',
          subtitle: 'Our platform connects clients with verified legal professionals through transparent consultation processes, automated case management, and real-time legal support.',
          primaryCta: 'Find Legal Professional',
          secondaryCta: 'Learn More',
          features: [
            { icon: Users, text: 'Verified Legal Professionals' },
            { icon: FileText, text: 'Transparent Consultation' },
            { icon: CheckCircle, text: 'Professional Standards' }
          ],
          heroIcon: Scale,
          heroColor: 'text-blue-500'
        };
      case 'insurance':
        return {
          badge: '🛡️ Australia\'s Leading Insurance Services Platform',
          title: 'The Smart Way to Connect with Insurance Professionals',
          subtitle: 'Our platform connects clients with verified insurance professionals through transparent claim processes, automated workflows, and real-time policy management.',
          primaryCta: 'Get Insurance Quote',
          secondaryCta: 'Learn More',
          features: [
            { icon: Users, text: 'Verified Insurance Professionals' },
            { icon: FileText, text: 'Transparent Claims Process' },
            { icon: CheckCircle, text: 'Policy Management' }
          ],
          heroIcon: Shield,
          heroColor: 'text-green-500'
        };
      default:
        return {
          badge: '🚀 Australia\'s Leading Restoration Marketplace Platform',
          title: 'The Smart Way to Connect Restoration Services',
          subtitle: 'Our marketplace platform connects clients with verified contractors through transparent pricing, automated workflows, and real-time project tracking.',
          primaryCta: 'Request Service',
          secondaryCta: 'Learn More',
          features: [
            { icon: Users, text: 'Verified Contractors' },
            { icon: FileText, text: 'Transparent Pricing' },
            { icon: CheckCircle, text: 'Quality Assurance' }
          ],
          heroIcon: Building,
          heroColor: 'text-teal-500'
        };
    }
  };

  const content = getIndustryContent();
  const HeroIcon = content.heroIcon;

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Enhanced Visual Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#00BFA6]/10 via-[#0F1115] to-[#7C4DFF]/10" />
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#00BFA6]/5 to-transparent" />
      
      {/* Visual Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300BFA6' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '60px 60px',
          animation: 'pattern-move 30s linear infinite'
        }}></div>
      </div>
      
      {/* Enhanced Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large Gradient Orbs */}
        <div className="absolute top-20 left-10 w-60 h-60 bg-gradient-to-br from-[#00BFA6]/40 to-[#3B82F6]/40 rounded-full blur-3xl animate-pulse shadow-2xl shadow-[#00BFA6]/30"></div>
        <div className="absolute bottom-20 right-10 w-70 h-70 bg-gradient-to-br from-[#7C4DFF]/40 to-[#00BFA6]/40 rounded-full blur-3xl animate-pulse animation-delay-2000 shadow-2xl shadow-[#7C4DFF]/30"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-100 h-100 bg-gradient-to-br from-[#2196F3]/30 to-[#7C4DFF]/30 rounded-full blur-3xl animate-pulse animation-delay-4000 shadow-2xl shadow-[#2196F3]/25"></div>
        
        {/* Additional Large Orbs */}
        <div className="absolute top-10 right-1/4 w-50 h-50 bg-gradient-to-br from-[#00BFA6]/25 to-[#7C4DFF]/25 rounded-full blur-3xl animate-pulse animation-delay-1000 shadow-2xl shadow-[#00BFA6]/20"></div>
        <div className="absolute bottom-10 left-1/3 w-60 h-60 bg-gradient-to-br from-[#3B82F6]/25 to-[#00BFA6]/25 rounded-full blur-3xl animate-pulse animation-delay-3000 shadow-2xl shadow-[#3B82F6]/20"></div>
        
        {/* Enhanced Geometric Shapes */}
        <div className="absolute top-1/4 right-1/4 w-24 h-24 border-2 border-[#00BFA6]/50 rotate-45 animate-pulse rounded-lg shadow-lg shadow-[#00BFA6]/30"></div>
        <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-gradient-to-r from-[#7C4DFF] to-[#00BFA6] rounded-full opacity-40 animate-bounce shadow-lg shadow-[#7C4DFF]/30"></div>
        <div className="absolute top-1/3 left-1/5 w-16 h-16 border-2 border-[#3B82F6]/40 rotate-12 animate-pulse rounded-full shadow-lg shadow-[#3B82F6]/25"></div>
        <div className="absolute bottom-1/3 right-1/5 w-18 h-18 bg-gradient-to-r from-[#00BFA6] to-[#3B82F6] rounded-full opacity-35 animate-bounce animation-delay-2000 shadow-lg shadow-[#00BFA6]/25"></div>
        
        {/* Floating Particles */}
        <div className="absolute top-1/5 left-1/6 w-4 h-4 bg-[#00BFA6] rounded-full animate-ping shadow-lg shadow-[#00BFA6]/50"></div>
        <div className="absolute top-2/5 right-1/6 w-3 h-3 bg-[#3B82F6] rounded-full animate-ping animation-delay-1000 shadow-lg shadow-[#3B82F6]/50"></div>
        <div className="absolute bottom-1/5 left-2/5 w-3.5 h-3.5 bg-[#7C4DFF] rounded-full animate-ping animation-delay-2000 shadow-lg shadow-[#7C4DFF]/50"></div>
        <div className="absolute bottom-2/5 right-2/5 w-2.5 h-2.5 bg-[#00BFA6] rounded-full animate-ping animation-delay-3000 shadow-lg shadow-[#00BFA6]/50"></div>
        <div className="absolute top-3/5 left-3/5 w-3 h-3 bg-[#3B82F6] rounded-full animate-ping animation-delay-4000 shadow-lg shadow-[#3B82F6]/50"></div>
        
        {/* Additional Geometric Elements */}
        <div className="absolute top-1/6 right-1/3 w-12 h-12 border border-[#7C4DFF]/30 rotate-30 animate-pulse rounded-lg"></div>
        <div className="absolute bottom-1/6 left-1/3 w-14 h-14 border border-[#00BFA6]/30 rotate-60 animate-pulse rounded-full"></div>
        <div className="absolute top-4/5 left-1/2 w-10 h-10 bg-gradient-to-r from-[#3B82F6] to-[#7C4DFF] rounded-full opacity-30 animate-bounce animation-delay-1500"></div>
        <div className="absolute bottom-4/5 right-1/2 w-8 h-8 bg-gradient-to-r from-[#00BFA6] to-[#3B82F6] rounded-full opacity-35 animate-bounce animation-delay-2500"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy */}
          <div className={`space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'}`}>
            <div>
              <div className={`inline-flex items-center px-4 py-2 bg-[#00BFA6]/10 border border-[#00BFA6]/30 rounded-full text-[#00BFA6] text-sm font-medium mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {content.badge}
              </div>
              <h1 className={`font-poppins font-bold text-4xl md:text-6xl lg:text-7xl leading-tight text-balance transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                The <span className="text-[#00BFA6] bg-gradient-to-r from-[#00BFA6] to-[#7C4DFF] bg-clip-text text-transparent animate-pulse">{content.title.split(' ')[3]}</span> to Connect {industry === 'healthcare' ? 'Healthcare' : industry === 'legal' ? 'Legal' : industry === 'insurance' ? 'Insurance' : 'Restoration'} Services
              </h1>
              <p className={`text-xl md:text-2xl text-[#9CA3AF] mt-6 leading-relaxed font-inter transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                {content.subtitle}
              </p>
            </div>

            <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Button size="lg" className="bg-[#00BFA6] hover:bg-[#00A693] text-[#0F1115] font-poppins font-semibold text-lg px-8 py-4 transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#00BFA6]/25">
                {content.primaryCta}
                <ArrowRight className="ml-2 h-5 w-5 animate-pulse" />
              </Button>
              <Button size="lg" variant="outline" className="border-[#2196F3] text-[#2196F3] hover:bg-[#2196F3] hover:text-white font-poppins font-semibold text-lg px-8 py-4 bg-transparent transform hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:shadow-[#2196F3]/25">
                {content.secondaryCta}
              </Button>
            </div>

            {/* Features */}
            <div className={`flex items-center space-x-6 text-sm text-[#9CA3AF] transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {content.features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className={`flex items-center space-x-2 transition-all duration-500 delay-${1000 + index * 200} hover:scale-105 cursor-default`}>
                    <Icon className="h-4 w-4 text-[#00BFA6] animate-pulse" />
                    <span className="hover:text-[#00BFA6] transition-colors duration-300">{feature.text}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className={`relative transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
            <div className="relative bg-gradient-to-br from-[#1F2937] to-[#0F1115] rounded-2xl p-8 border border-[#374151] hover:border-[#00BFA6]/50 transition-all duration-500 hover:shadow-2xl hover:shadow-[#00BFA6]/10">
              {/* Animated Background Pattern */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[#00BFA6]/5 to-transparent opacity-50"></div>
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#7C4DFF]/10 rounded-full blur-2xl animate-pulse"></div>
              
              <div className="space-y-8 relative z-10">
                <div className="text-center">
                  <h3 className="font-poppins font-semibold text-xl text-[#00BFA6] mb-6 animate-pulse">
                    {industry === 'healthcare' ? 'Healthcare' : industry === 'legal' ? 'Legal' : industry === 'insurance' ? 'Insurance' : 'Marketplace'} Platform
                  </h3>
                </div>

                {/* Enhanced Workflow */}
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col items-center space-y-3 group">
                      <div className="w-16 h-16 bg-[#2196F3] rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-[#2196F3]/25">
                        <Users className="h-8 w-8 text-white animate-pulse" />
                      </div>
                      <span className="font-inter font-medium text-sm text-[#F9FAFB] group-hover:text-[#2196F3] transition-colors duration-300">
                        {industry === 'healthcare' ? 'Patients' : industry === 'legal' ? 'Clients' : industry === 'insurance' ? 'Policyholders' : 'Clients'}
                      </span>
                    </div>

                    <div className="flex-1 mx-4">
                      <div className="h-0.5 bg-gradient-to-r from-[#2196F3] to-[#00BFA6] animate-pulse"></div>
                    </div>

                    <div className="flex flex-col items-center space-y-3 group">
                      <div className="w-16 h-16 bg-[#00BFA6] rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-[#00BFA6]/25">
                        <FileText className="h-8 w-8 text-[#0F1115] animate-pulse" />
                      </div>
                      <span className="font-inter font-medium text-sm text-[#F9FAFB] group-hover:text-[#00BFA6] transition-colors duration-300">
                        {industry === 'healthcare' ? 'Smart Matching' : industry === 'legal' ? 'Case Matching' : industry === 'insurance' ? 'Claim Processing' : 'Smart Matching'}
                      </span>
                    </div>

                    <div className="flex-1 mx-4">
                      <div className="h-0.5 bg-gradient-to-r from-[#00BFA6] to-[#7C4DFF] animate-pulse"></div>
                    </div>

                    <div className="flex flex-col items-center space-y-3 group">
                      <div className="w-16 h-16 bg-[#7C4DFF] rounded-full flex items-center justify-center group-hover:scale-110 transition-all duration-300 hover:shadow-lg hover:shadow-[#7C4DFF]/25">
                        <CheckCircle className="h-8 w-8 text-white animate-pulse" />
                      </div>
                      <span className="font-inter font-medium text-sm text-[#F9FAFB] group-hover:text-[#7C4DFF] transition-colors duration-300">
                        {industry === 'healthcare' ? 'Verified Provider' : industry === 'legal' ? 'Verified Professional' : industry === 'insurance' ? 'Verified Agent' : 'Verified Contractor'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mt-8">
                  <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151] hover:border-[#00BFA6]/50 hover:shadow-lg hover:shadow-[#00BFA6]/10 transition-all duration-300 group">
                    <div className="text-[#00BFA6] font-inter font-medium text-sm group-hover:scale-105 transition-transform duration-300">
                      {industry === 'healthcare' ? 'Automated Scheduling' : industry === 'legal' ? 'Case Management' : industry === 'insurance' ? 'Automated Claims' : 'Automated Workflows'}
                    </div>
                    <div className="text-[#9CA3AF] text-xs mt-1 group-hover:text-[#00BFA6] transition-colors duration-300">
                      {industry === 'healthcare' ? 'Smart matching & scheduling' : industry === 'legal' ? 'Smart case matching' : industry === 'insurance' ? 'Smart claim processing' : 'Smart matching & tracking'}
                    </div>
                  </div>
                  <div className="bg-[#0F1115] rounded-lg p-4 border border-[#374151] hover:border-[#2196F3]/50 hover:shadow-lg hover:shadow-[#2196F3]/10 transition-all duration-300 group">
                    <div className="text-[#2196F3] font-inter font-medium text-sm group-hover:scale-105 transition-transform duration-300">
                      {industry === 'healthcare' ? 'Real-time Updates' : industry === 'legal' ? 'Case Updates' : industry === 'insurance' ? 'Claim Updates' : 'Real-time Updates'}
                    </div>
                    <div className="text-[#9CA3AF] text-xs mt-1 group-hover:text-[#2196F3] transition-colors duration-300">
                      {industry === 'healthcare' ? 'Appointment & progress' : industry === 'legal' ? 'Case & communication' : industry === 'insurance' ? 'Claim & communication' : 'Progress & communication'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

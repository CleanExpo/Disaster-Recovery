'use client';

import { useEffect, useState } from 'react';
import Header from "@/components/header"
import Footer from "@/components/footer"
import HeroSection from "@/components/hero-section"
import ProblemSection from "@/components/problem-section"
import SolutionSection from "@/components/solution-section"
import PlatformFeaturesSection from "@/components/platform-features-section"
import HowItWorksSection from "@/components/how-it-works-section"
import ClientBenefitsSection from "@/components/client-benefits-section"
import ContractorBenefitsSection from "@/components/contractor-benefits-section"
import TrustSection from "@/components/trust-section"
import PricingSection from "@/components/pricing-section"
import SocialProofSection from "@/components/social-proof-section"
import FinalCtaSection from "@/components/final-cta-section"
import StatsVisual from "@/components/stats-visual"
import ProcessVisual from "@/components/process-visual"
import FloatingActionButton from "@/components/floating-action-button"
import ParticleSystem from "@/components/particle-system"
import ScrollProgress from "@/components/scroll-progress"

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#0F1115] text-[#F9FAFB] relative overflow-hidden">
      {/* Enhanced Animated Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Large Gradient Orbs - More Visible */}
        <div className="absolute top-0 -left-4 w-96 h-96 bg-gradient-to-br from-[#00BFA6] to-[#3B82F6] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-96 h-96 bg-gradient-to-br from-[#3B82F6] to-[#8B5CF6] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-96 h-96 bg-gradient-to-br from-[#8B5CF6] to-[#00BFA6] rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        
        {/* Enhanced Geometric Shapes */}
        <div className="absolute top-20 right-10 w-40 h-40 border-2 border-[#00BFA6]/30 rotate-45 animate-pulse rounded-lg"></div>
        <div className="absolute bottom-20 left-10 w-32 h-32 bg-gradient-to-r from-[#00BFA6] to-[#3B82F6] rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 border-2 border-[#7C4DFF]/30 rotate-12 animate-pulse rounded-full"></div>
        
        {/* Enhanced Floating Particles */}
        <div className="absolute top-1/4 left-1/4 w-3 h-3 bg-[#00BFA6] rounded-full animate-ping shadow-lg shadow-[#00BFA6]/50"></div>
        <div className="absolute top-3/4 right-1/4 w-2 h-2 bg-[#3B82F6] rounded-full animate-ping animation-delay-1000 shadow-lg shadow-[#3B82F6]/50"></div>
        <div className="absolute top-1/2 left-3/4 w-2.5 h-2.5 bg-[#8B5CF6] rounded-full animate-ping animation-delay-2000 shadow-lg shadow-[#8B5CF6]/50"></div>
        <div className="absolute top-1/3 right-1/3 w-2 h-2 bg-[#00BFA6] rounded-full animate-ping animation-delay-3000 shadow-lg shadow-[#00BFA6]/50"></div>
        <div className="absolute bottom-1/3 left-1/3 w-1.5 h-1.5 bg-[#7C4DFF] rounded-full animate-ping animation-delay-4000 shadow-lg shadow-[#7C4DFF]/50"></div>
      </div>

      {/* Gradient Overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#0F1115] via-[#0F1115] to-[#1a1d29] -z-5"></div>
      
      {/* Animated Grid Pattern */}
      <div className="fixed inset-0 opacity-5 -z-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(0, 191, 166, 0.3) 1px, transparent 0)`,
          backgroundSize: '20px 20px',
          animation: 'grid-move 20s linear infinite'
        }}></div>
      </div>

      <ScrollProgress />
      <Header />
      <main className={`transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        <div className="relative">
          <HeroSection />
          <ProblemSection />
          <SolutionSection />
          <PlatformFeaturesSection />
          <ProcessVisual />
          <HowItWorksSection />
          <ClientBenefitsSection />
          <ContractorBenefitsSection />
          <TrustSection />
          <PricingSection />
          <SocialProofSection />
          {/* <FinalCtaSection /> */}
        </div>
      </main>
      <Footer />
      {/* <FloatingActionButton /> */}
      <ParticleSystem />
      
      {/* Enhanced Custom CSS for animations */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        @keyframes grid-move {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(20px, 20px);
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            box-shadow: 0 0 20px rgba(0, 191, 166, 0.3);
          }
          50% {
            box-shadow: 0 0 40px rgba(0, 191, 166, 0.6);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient-shift 3s ease infinite;
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-3000 {
          animation-delay: 3s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .card-hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card-hover-lift:hover {
          transform: translateY(-8px);
        }
        
        .glow-effect {
          position: relative;
        }
        
        .glow-effect::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          background: linear-gradient(45deg, #00BFA6, #7C4DFF, #3B82F6, #00BFA6);
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .glow-effect:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  )
}

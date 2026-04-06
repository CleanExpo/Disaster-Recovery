'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { ServiceCardSkeleton } from '@/components/LoadingStates';

interface ServiceCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient: string;
  href: string;
  features: string[];
  colour: string;
}

const services: ServiceCard[] = [
  {
    title: 'Water Damage Restoration',
    description: 'Advanced moisture extraction with AI-powered drying systems',
    gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    colour: '#667eea',
    href: '/services/water-damage',
    features: ['24/7 Emergency', 'Thermal Imaging', 'Mould Prevention'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ) },
  {
    title: 'Fire & Smoke Recovery',
    description: 'Complete restoration with molecular odour elimination technology',
    gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    colour: '#f5576c',
    href: '/services/fire-damage',
    features: ['Soot Removal', 'Air Purification', 'Content Restoration'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.879 16.121A3 3 0 1012.015 11L11 14H9c0 .768.293 1.536.879 2.121z" />
      </svg>
    ) },
  {
    title: 'Mould Remediation',
    description: 'EPA-certified removal with antimicrobial protection systems',
    gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
    colour: '#00f2fe',
    href: '/services/mould-remediation',
    features: ['Air Quality Testing', 'HEPA Filtration', 'Prevention Plans'],
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ) },
];

export default function UltraModernServiceCards() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Simulate loading time for demonstration
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top });
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
    return undefined;
  }, []);

  return (
    <section className="py-32 relative overflow-hidden" style={{ background: 'linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)' }}>
      {/* Background effects */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(99, 91, 255, 0.15) 0%, transparent 50%)` }}
        />
      </div>

      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full" 
               style={{ 
                 background: 'rgba(99, 91, 255, 0.1)', 
                 border: '1px solid rgba(99, 91, 255, 0.3)',
                 backdropFilter: 'blur(10px)'
               }}>
            <span className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            <span className="text-sm font-medium text-purple-700">Professional Services</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold mb-6">
            <span style={{
              background: 'linear-gradient(135deg, #fff 0%, #888 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text' }}>
              Next-Generation
            </span>
            <br />
            <span style={{
              background: 'linear-gradient(135deg, #635bff 0%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text' }}>
              Restoration Technology
            </span>
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Industry-leading solutions powered by AI and advanced restoration systems
          </p>
        </div>

        {/* Service cards grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 3 }).map((_, index) => (
              <ServiceCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group relative"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div
                className="relative h-full p-6 rounded-2xl transition-all duration-500 transform-gpu"
                style={{
                  background: hoveredIndex === index 
                    ? 'rgba(255, 255, 255, 0.08)' 
                    : 'rgba(255, 255, 255, 0.03)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid',
                  borderColor: hoveredIndex === index 
                    ? 'rgba(99, 91, 255, 0.5)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  transform: hoveredIndex === index 
                    ? 'translateY(-8px) scale(1.02)' 
                    : 'translateY(0) scale(1)',
                  boxShadow: hoveredIndex === index
                    ? `0 20px 60px ${service.colour}33, 0 0 0 1px ${service.colour}22`
                    : '0 4px 20px rgba(0, 0, 0, 0.1)' }}
              >

                {/* Card content */}
                <div className="relative">
                  {/* Icon container */}
                  <div
                    className="w-14 h-14 rounded-xl mb-4 flex items-center justify-center transition-all duration-500 text-white"
                    style={{
                      background: hoveredIndex === index ? service.gradient : 'rgba(255, 255, 255, 0.05)',
                      transform: hoveredIndex === index ? 'rotate(-10deg) scale(1.1)' : 'rotate(0) scale(1)' }}
                  >
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-white mb-2 transition-colours duration-300 group-hover:text-transparent group-hover:bg-clip-text"
                      style={{ 
                        backgroundImage: hoveredIndex === index ? service.gradient : 'none',
                        WebkitBackgroundClip: hoveredIndex === index ? 'text' : 'initial',
                        WebkitTextFillColor: hoveredIndex === index ? 'transparent' : 'initial' }}>
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <div className="space-y-2 mb-4">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2">
                        <div 
                          className="w-1.5 h-1.5 rounded-full transition-all duration-500"
                          style={{
                            background: hoveredIndex === index ? service.gradient : 'rgba(255, 255, 255, 0.3)',
                            boxShadow: hoveredIndex === index ? `0 0 10px ${service.colour}` : 'none' }}
                        />
                        <span className="text-xs text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center gap-2 text-sm font-medium transition-all duration-300"
                       style={{ 
                         color: hoveredIndex === index ? service.colour : 'rgba(255, 255, 255, 0.6)' }}>
                    <span>Learn More</span>
                    <svg 
                      className="w-4 h-4 transition-transform duration-300"
                      style={{
                        transform: hoveredIndex === index ? 'translateX(4px)' : 'translateX(0)' }}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </div>
                </div>

              </div>
            </Link>
          ))}
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <Link
            href="/services"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold transition-all duration-300 hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #635bff 0%, #4541ff 100%)',
              boxShadow: '0 10px 40px rgba(99, 91, 255, 0.3)' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(99, 91, 255, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(99, 91, 255, 0.3)';
            }}
          >
            <span>Explore All Services</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>

      {/* Custom animation styles */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
      `}</style>
    </section>
  );
}
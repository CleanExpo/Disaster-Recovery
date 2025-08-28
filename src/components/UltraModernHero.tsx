'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function UltraModernHero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background: `
          radial-gradient(
            circle at ${mousePosition.x * 100}% ${mousePosition.y * 100}%,
            rgba(99, 91, 255, 0.15) 0%,
            transparent 50%
          ),
          linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #0a0a0a 100%)
        `
      }}
    >
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-[500px] h-[500px] -top-48 -left-48 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #635bff 0%, transparent 70%)',
            animation: 'float 20s ease-in-out infinite',
            transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`,
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] -bottom-32 -right-32 rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)',
            animation: 'float 15s ease-in-out infinite reverse',
            transform: `translate(${mousePosition.x * -30}px, ${mousePosition.y * -30}px)`,
          }}
        />
      </div>

      {/* Grid background pattern */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 91, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 91, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div 
          className={`inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            background: 'rgba(99, 91, 255, 0.1)',
            borderColor: 'rgba(99, 91, 255, 0.3)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="text-sm font-medium text-purple-300">
            Australia's #1 Emergency Response
          </span>
        </div>

        {/* Main heading with gradient */}
        <h1 
          className={`text-6xl md:text-8xl font-bold mb-6 transition-all duration-1000 delay-100 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <span 
            className="inline-block"
            style={{
              background: 'linear-gradient(135deg, #fff 0%, #888 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            Disaster Recovery
          </span>
          <br />
          <span 
            className="inline-block relative"
            style={{
              background: 'linear-gradient(135deg, #635bff 0%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              animation: 'gradient-x 3s ease infinite',
              backgroundSize: '200% 200%',
            }}
          >
            Reimagined
            <svg 
              className="absolute -bottom-2 left-0 w-full"
              height="10"
              viewBox="0 0 300 10"
              preserveAspectRatio="none"
            >
              <path
                d="M0,5 Q150,0 300,5"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
                style={{
                  strokeDasharray: 300,
                  strokeDashoffset: 300,
                  animation: 'draw 2s ease forwards 1s',
                }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#635bff" />
                  <stop offset="100%" stopColor="#00d4ff" />
                </linearGradient>
              </defs>
            </svg>
          </span>
        </h1>

        {/* Subtitle */}
        <p 
          className={`text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto transition-all duration-1000 delay-200 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Cutting-edge restoration technology meets unparalleled expertise. 
          <span className="text-white font-semibold"> 60-minute response</span> guaranteed.
        </p>

        {/* CTA Buttons */}
        <div 
          className={`flex flex-col sm:flex-row gap-4 justify-center mb-16 transition-all duration-1000 delay-300 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          <Link
            href="tel:1800DISASTER"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #ff4545 0%, #ff8845 100%)',
              boxShadow: '0 10px 40px rgba(255, 69, 69, 0.3)',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.transform = 'scale(1.05) translateY(-2px)';
              btn.style.boxShadow = '0 20px 60px rgba(255, 69, 69, 0.4)';
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.transform = 'scale(1)';
              btn.style.boxShadow = '0 10px 40px rgba(255, 69, 69, 0.3)';
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Emergency Hotline
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </Link>

          <Link
            href="/quote"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-lg border-2 overflow-hidden transition-all hover:scale-105"
            style={{
              borderColor: 'rgba(99, 91, 255, 0.5)',
              background: 'rgba(99, 91, 255, 0.1)',
              backdropFilter: 'blur(10px)',
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget;
              btn.style.background = 'rgba(99, 91, 255, 0.2)';
              btn.style.borderColor = 'rgba(99, 91, 255, 0.8)';
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget;
              btn.style.background = 'rgba(99, 91, 255, 0.1)';
              btn.style.borderColor = 'rgba(99, 91, 255, 0.5)';
            }}
          >
            Get Instant Quote
            <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>

        {/* Trust badges */}
        <div 
          className={`flex flex-wrap justify-center gap-8 items-center transition-all duration-1000 delay-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          {[
            { icon: '🛡️', text: '24/7 Response' },
            { icon: '✓', text: 'Insurance Approved' },
            { icon: '⚡', text: '60min Guarantee' },
            { icon: '🏆', text: 'IICRC Certified' },
          ].map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-4 py-2 rounded-full transition-all hover:scale-110"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                animationDelay: `${index * 100}ms`,
              }}
            >
              <span className="text-xl">{badge.icon}</span>
              <span className="text-sm text-gray-300 font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/40 rounded-full mt-2 animate-pulse" />
        </div>
      </div>

      {/* Custom styles */}
      <style jsx>{`
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }
        
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          33% { transform: translateY(-30px) rotate(-5deg); }
          66% { transform: translateY(30px) rotate(5deg); }
        }
      `}</style>
    </section>
  );
}
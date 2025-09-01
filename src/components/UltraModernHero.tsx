'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMagneticEffect, useScrollTrigger } from '@/hooks/useMagneticEffect';
import { 
  AlertTriangle, 
  Shield, 
  Clock, 
  CheckCircle, 
  Star, 
  email,
  ArrowRight,
  Zap
} from 'lucide-react';

export default function UltraModernHero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth spring animations
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -50]);

  // Magnetic effect hooks
  const emergencyButtonRef = useMagneticEffect({ 
    strength: 0.4, 
    maxDistance: 120, 
    scale: 1.05 
  });
  const assessmentButtonRef = useMagneticEffect({ 
    strength: 0.3, 
    maxDistance: 100, 
    scale: 1.03 
  });

  // Scroll trigger
  const scrollTriggerRef = useScrollTrigger(0.2);

  // Particle system state
  const [particles, setParticles] = useState<Array<{
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    speed: number;
  }>>([]);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  // Initialize particle system
  useEffect(() => {
    const particleCount = 15;
    const newParticles = Array.from({ length: particleCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 2 + 1 }));
    setParticles(newParticles);
  }, []);

  // Animated gradient positions
  const [gradientPos, setGradientPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height });
      }
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setGradientPos({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const trustIndicators = [
    { 
      icon: Shield, 
      label: 'IICRC Certified', 
      value: 'Industry Standard',
      colour: 'from-blue-500 to-cyan-500'
    },
    { 
      icon: Clock, 
      label: 'Response Time', 
      value: '30-60 Minutes',
      colour: 'from-green-500 to-emerald-500'
    },
    { 
      icon: CheckCircle, 
      label: 'Insurance', 
      value: 'Pre-Approved',
      colour: 'from-purple-500 to-pink-500'
    },
    { 
      icon: Star, 
      label: 'Customer Rating', 
      value: '4.9/5 Stars',
      colour: 'from-blue-600 to-blue-600'
    }
  ];

  return (
    <>
      {/* Advanced Gradient Mesh Background */}
      <div className="gradient-mesh-bg" />
      
      {/* Particle System */}
      <div className="particle-container fixed inset-0 z-0">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="particle absolute"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              width: `${particle.size}px`,
              height: `${particle.size}px` }}
            animate={{
              y: [0, -20, 0],
              x: [0, Math.random() * 10 - 5, 0],
              opacity: [particle.opacity, particle.opacity * 0.5, particle.opacity] }}
            transition={{
              duration: particle.speed * 3,
              repeat: Infinity,
              ease: "easeInOut" }}
          />
        ))}
      </div>

      <motion.section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity, scale }}
      >
        {/* Interactive Gradient Overlay */}
        <div 
          className="absolute inset-0 opacity-20 transition-all duration-1000 ease-out"
          style={{
            background: `radial-gradient(
              circle at ${gradientPos.x}% ${gradientPos.y}%,
              rgba(99, 102, 241, 0.3) 0%,
              rgba(139, 92, 246, 0.2) 25%,
              rgba(236, 72, 153, 0.1) 50%,
              transparent 70%
            )` }}
        />

        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 noise-texture" />

        <div className="relative z-10 container mx-auto px-6 py-32">
          <motion.div 
            ref={scrollTriggerRef}
            className="max-w-6xl mx-auto text-center scroll-trigger"
            style={{ y }}
          >
        {/* Badge */}
        <div 
          className={`inline-flex items-center gap-2 mb-8 px-5 py-2 rounded-full border transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
          style={{
            background: 'rgba(99, 91, 255, 0.1)',
            borderColor: 'rgba(99, 91, 255, 0.3)',
            backdropFilter: 'blur(10px)' }}
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
          </span>
          <span className="text-sm font-medium text-purple-300">
            #1 Emergency Response
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
              backgroundClip: 'text' }}
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
              backgroundSize: '200% 200%' }}
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
                  animation: 'draw 2s ease forwards 1s' }}
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
            href="/contact"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-lg overflow-hidden transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #ff4545 0%, #ff8845 100%)',
              boxShadow: '0 10px 40px rgba(255, 69, 69, 0.3)' }}
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
              Get Emergency Help
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </Link>

          <Link
            href="/quote"
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-lg border-2 overflow-hidden transition-all hover:scale-105"
            style={{
              borderColor: 'rgba(99, 91, 255, 0.5)',
              background: 'rgba(99, 91, 255, 0.1)',
              backdropFilter: 'blur(10px)' }}
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
                animationDelay: `${index * 100}ms` }}
            >
              <span className="text-xl">{badge.icon}</span>
              <span className="text-sm text-gray-300 font-medium">{badge.text}</span>
            </div>
          ))}
        </div>
          </motion.div>
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
      </motion.section>
    </>
  );
}
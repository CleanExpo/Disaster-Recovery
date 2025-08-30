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
  Phone,
  ArrowRight,
  Zap,
  PlayCircle
} from 'lucide-react';

interface TrustIndicator {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  colour: string;
}

const ModernHeroSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth parallax animations
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // Magnetic effect hooks for interactive elements
  const emergencyButtonRef = useMagneticEffect({ 
    strength: 0.4, 
    maxDistance: 120, 
    scale: 1.05,
    rotationFactor: 0.2
  });
  
  const assessmentButtonRef = useMagneticEffect({ 
    strength: 0.3, 
    maxDistance: 100, 
    scale: 1.03 
  });

  // Interactive mouse tracking
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    document.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const trustIndicators: TrustIndicator[] = [
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
      colour: 'from-yellow-500 to-orange-500'
    }
  ];

  return (
    <>
      {/* Advanced Gradient Mesh Background */}
      <div className="gradient-mesh-bg" />
      
      <motion.section
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{ opacity, scale }}
      >
        {/* Interactive Gradient Overlay */}
        <motion.div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(
              circle at ${mousePosition.x}% ${mousePosition.y}%,
              rgba(99, 102, 241, 0.15) 0%,
              rgba(139, 92, 246, 0.1) 30%,
              rgba(236, 72, 153, 0.05) 60%,
              transparent 100%
            )`,
          }}
        />

        {/* Noise Texture */}
        <div className="absolute inset-0 noise-texture opacity-30" />

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400 rounded-full opacity-40"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, -40, -20],
                x: [-5, 5, -5],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto text-center">
            
            {/* Emergency Status Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-3 mb-12 px-6 py-3 rounded-full glass-card magnetic-element"
              style={{
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
              </div>
              <AlertTriangle className="h-5 w-5 text-red-400" />
              <span className="text-sm font-semibold text-red-300 tracking-wide">
                24/7 Emergency Response Available
              </span>
              <Zap className="h-4 w-4 text-yellow-400 animate-pulse" />
            </motion.div>
            
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="space-y-8 mb-12"
            >
              <h1 className="text-6xl lg:text-8xl font-black tracking-tight leading-none">
                <motion.span 
                  className="block premium-heading"
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  Disaster Recovery
                </motion.span>
                <motion.span 
                  className="block text-4xl lg:text-6xl mt-4"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  style={{
                    background: 'linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #f472b6 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    backgroundSize: '200% 200%',
                    animation: 'gradient-x 4s ease infinite',
                  }}
                >
                  When Every Second Counts
                </motion.span>
              </h1>
              
              <motion.p 
                className="text-xl lg:text-2xl premium-text max-w-4xl mx-auto leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                Australia's most advanced disaster recovery specialists powered by AI technology.
                <br />
                <motion.span 
                  className="font-semibold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }}
                  style={{ backgroundSize: '200% 200%' }}
                >
                  IICRC certified • AI-powered assessment • Instant response
                </motion.span>
              </motion.p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center mb-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
              <Link href="/emergency-help">
                <motion.button
                  ref={emergencyButtonRef as React.RefObject<HTMLButtonElement>}
                  className="group relative px-12 py-5 text-lg font-bold text-white rounded-2xl overflow-hidden premium-button"
                  style={{
                    background: 'linear-gradient(135deg, #ef4444 0%, #f97316 100%)',
                    boxShadow: '0 20px 60px rgba(239, 68, 68, 0.4)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative flex items-center gap-3">
                    <Phone className="h-6 w-6" />
                    <span>Emergency Help Now</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.button>
              </Link>

              <Link href="/ai-assessment">
                <motion.button
                  ref={assessmentButtonRef as React.RefObject<HTMLButtonElement>}
                  className="group relative px-12 py-5 text-lg font-semibold rounded-2xl glass-card text-white magnetic-element"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="relative flex items-center gap-3">
                    <PlayCircle className="h-5 w-5" />
                    <span>Free AI Assessment</span>
                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </div>
                </motion.button>
              </Link>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div 
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.2 }}
            >
              {trustIndicators.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={index}
                    className="glass-card p-6 text-center magnetic-element noise-texture rounded-2xl"
                    initial={{ opacity: 0, scale: 0.8, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 1.4 + index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <motion.div 
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 bg-gradient-to-br ${item.colour} shadow-2xl`}
                      whileHover={{ 
                        rotate: [0, -10, 10, 0],
                        transition: { duration: 0.5 }
                      }}
                    >
                      <Icon className="h-8 w-8 text-white" />
                    </motion.div>
                    
                    <p className="text-xs text-gray-400 uppercase tracking-widest font-medium mb-1">
                      {item.label}
                    </p>
                    <p className="font-bold text-white text-sm">
                      {item.value}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <motion.div className="flex flex-col items-center gap-2">
            <span className="text-xs text-gray-400 uppercase tracking-widest">
              Scroll to explore
            </span>
            <motion.div
              className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center overflow-hidden"
              animate={{ 
                borderColor: [
                  'rgba(156, 163, 175, 0.4)', 
                  'rgba(99, 102, 241, 0.6)', 
                  'rgba(156, 163, 175, 0.4)'
                ] 
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.div
                className="w-1 h-3 bg-gradient-to-b from-blue-400 to-purple-400 rounded-full mt-2"
                animate={{ y: [0, 16, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Decorative SVG Wave */}
        <div className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden">
          <motion.svg 
            className="absolute bottom-0 w-full h-full" 
            viewBox="0 0 1440 120" 
            fill="none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
          >
            <motion.path 
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V120Z" 
              fill="rgba(255, 255, 255, 0.05)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, delay: 1.5, ease: "easeOut" }}
            />
          </motion.svg>
        </div>
      </motion.section>
    </>
  );
};

export default ModernHeroSection;
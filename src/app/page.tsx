'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  ClockIcon, 
  PhoneIcon,
  FireIcon,
  HomeIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  SparklesIcon,
  BeakerIcon,
  BoltIcon,
  GlobeAltIcon,
  StarIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline';

export default function UltraModernHomepage() {
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeService, setActiveService] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Smooth mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const parallaxY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  useEffect(() => {
    setMounted(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    // Intersection Observer for scroll animations
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el) => observer.observe(el));

    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      animatedElements.forEach((el) => observer.unobserve(el));
    };
  }, []); // Remove mouseX and mouseY from dependencies to prevent infinite re-renders

  const services = [
    {
      title: 'Water Damage',
      description: 'Advanced hydro extraction & molecular drying technology',
      icon: HomeIcon,
      gradient: 'from-blue-500 via-cyan-500 to-teal-500',
      stats: '2hr Response',
      features: ['AI Moisture Detection', 'Thermal Imaging', 'Nano-Drying Tech']
    },
    {
      title: 'Fire & Smoke',
      description: 'Complete restoration with HEPA filtration systems',
      icon: FireIcon,
      gradient: 'from-orange-500 via-red-500 to-pink-500',
      stats: '24/7 Ready',
      features: ['Ozone Treatment', 'Molecular Cleaning', 'Air Purification']
    },
    {
      title: 'Biohazard',
      description: 'EPA-certified decontamination protocols',
      icon: BeakerIcon,
      gradient: 'from-green-500 via-emerald-500 to-teal-500',
      stats: '99.9% Clean',
      features: ['CDC Compliance', 'UV-C Sterilization', 'Hazmat Certified']
    },
    {
      title: 'Commercial',
      description: 'Enterprise-grade disaster recovery solutions',
      icon: BuildingOfficeIcon,
      gradient: 'from-purple-500 via-indigo-500 to-blue-500',
      stats: 'Fortune 500',
      features: ['Project Management', 'Business Continuity', 'Insurance Direct']
    }
  ];

  const stats = [
    { label: 'Properties Restored', value: '15,000', icon: ChartBarIcon, color: 'text-blue-400' },
    { label: 'Response Time', value: '< 2hrs', icon: ClockIcon, color: 'text-green-400' },
    { label: 'Customer Rating', value: '4.9★', icon: StarIcon, color: 'text-yellow-400' },
    { label: 'Coverage Area', value: 'National', icon: GlobeAltIcon, color: 'text-purple-400' }
  ];

  if (!mounted) return null;

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden noise-overlay">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 z-0">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-purple-950 to-gray-950" />
        
        {/* Animated Gradient Orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [-100, 100, -100],
            y: [100, -100, 100],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>
      
      {/* Mouse Follower */}
      <motion.div
        className="pointer-events-none fixed w-96 h-96 rounded-full"
        style={{
          left: smoothMouseX,
          top: smoothMouseY,
          x: '-50%',
          y: '-50%',
          background: 'radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)',
          filter: 'blur(40px)',
          zIndex: 1
        }}
      />

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-24">
        <motion.div 
          style={{ y: parallaxY, opacity }}
          className="max-w-7xl mx-auto text-center"
        >
          {/* Floating Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-block mb-8"
          >
            <div className="glass px-6 py-3 rounded-full flex items-center gap-3">
              <div className="relative">
                <div className="w-3 h-3 bg-green-500 rounded-full animate-ping absolute" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <span className="text-sm font-medium bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                Live 24/7 Emergency Response Active
              </span>
              <BoltIcon className="w-4 h-4 text-yellow-400 animate-pulse" />
            </div>
          </motion.div>

          {/* Main Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-6xl md:text-8xl font-bold mb-6 leading-tight perspective-1000"
          >
            <span className="block gradient-text text-transparent mb-2">
              Disaster Recovery
            </span>
            <span className="block text-3xl md:text-5xl text-gray-300">
              Reimagined for {new Date().getFullYear()}
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Experience the future of property restoration with{' '}
            <span className="text-cyan-400 font-semibold">AI-powered diagnostics</span>,{' '}
            <span className="text-purple-400 font-semibold">predictive analytics</span>, and{' '}
            <span className="text-pink-400 font-semibold">quantum-speed response</span>.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            {/* Primary CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-10 py-5 overflow-hidden rounded-2xl font-bold text-lg"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 opacity-90" />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
              <span className="relative z-10 flex items-center gap-3">
                <PhoneIcon className="w-6 h-6" />
                Get Immediate Help
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
            </motion.button>

            {/* Secondary CTA */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="glass-card !py-5 !px-10 border-2 border-white/20 hover:border-white/40"
            >
              <span className="font-bold text-lg flex items-center gap-3">
                <SparklesIcon className="w-6 h-6 text-yellow-400" />
                AI Damage Assessment
              </span>
            </motion.button>
          </motion.div>

          {/* Floating Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                whileHover={{ y: -5 }}
                className="glass-card !p-6 group"
              >
                <stat.icon className={`w-8 h-8 ${stat.color} mb-3 group-hover:scale-110 transition-transform`} />
                <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* Services Grid - Ultra Modern */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20 animate-on-scroll">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <div className="glass px-4 py-2 rounded-full text-sm font-medium text-cyan-400">
                ✨ Powered by AI & Machine Learning
              </div>
            </motion.div>
            <h2 className="text-5xl md:text-6xl font-bold gradient-text mb-6">
              Next-Gen Services
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Revolutionary restoration technology that predicts, prevents, and perfects
            </p>
          </div>

          {/* Services Cards */}
          <div className="grid md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onMouseEnter={() => setActiveService(index)}
                onMouseLeave={() => setActiveService(null)}
                className="group relative"
              >
                {/* Card Background Glow */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 rounded-3xl`}
                />
                
                {/* Card Content */}
                <div className="relative glass-card rounded-3xl p-8 border border-white/10 hover:border-white/30 transition-all duration-500 h-full">
                  {/* Icon & Badge */}
                  <div className="flex justify-between items-start mb-6">
                    <motion.div
                      animate={{ rotate: activeService === index ? 360 : 0 }}
                      transition={{ duration: 0.8 }}
                      className={`p-4 rounded-2xl bg-gradient-to-r ${service.gradient} bg-opacity-20`}
                    >
                      <service.icon className="w-10 h-10 text-white" />
                    </motion.div>
                    <div className="glass px-3 py-1 rounded-full text-sm font-bold text-green-400">
                      {service.stats}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                  <p className="text-gray-400 mb-6">{service.description}</p>

                  {/* Features */}
                  <div className="space-y-3">
                    {service.features.map((feature, fi) => (
                      <motion.div
                        key={fi}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ 
                          opacity: activeService === index ? 1 : 0.7,
                          x: activeService === index ? 0 : -20
                        }}
                        transition={{ delay: fi * 0.05 }}
                        className="flex items-center gap-3"
                      >
                        <CheckCircleIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-gray-300">{feature}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <motion.div
                    className="mt-8 flex items-center gap-2 text-cyan-400 font-semibold group/link"
                    whileHover={{ x: 5 }}
                  >
                    <span>Explore Service</span>
                    <ArrowRightIcon className="w-5 h-5 group-hover/link:translate-x-2 transition-transform" />
                  </motion.div>

                  {/* Floating particles on hover */}
                  <AnimatePresence>
                    {activeService === index && (
                      <>
                        {[...Array(3)].map((_, pi) => (
                          <motion.div
                            key={pi}
                            className={`absolute w-2 h-2 bg-gradient-to-r ${service.gradient} rounded-full blur-sm`}
                            initial={{ 
                              opacity: 0,
                              x: Math.random() * 200 - 100,
                              y: Math.random() * 200 - 100
                            }}
                            animate={{ 
                              opacity: [0, 1, 0],
                              y: -150,
                              x: Math.random() * 200 - 100
                            }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 2, delay: pi * 0.2 }}
                          />
                        ))}
                      </>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Demo Section */}
      <section className="relative z-10 py-32 px-6 animate-on-scroll">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Glowing Border Container */}
            <div className="glow-border">
              <div className="glass rounded-3xl p-12 md:p-20 text-center bg-gradient-to-br from-purple-900/20 via-transparent to-blue-900/20">
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ type: "spring", duration: 0.8 }}
                >
                  <ShieldCheckIcon className="w-20 h-20 mx-auto mb-8 text-cyan-400" />
                </motion.div>
                
                <h2 className="text-4xl md:text-6xl font-bold gradient-text mb-8">
                  Experience the Difference
                </h2>
                
                <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
                  Our AI-powered assessment tool can analyze damage in seconds, 
                  providing instant quotes and dispatching teams automatically.
                </p>

                {/* Interactive Process Steps */}
                <div className="grid md:grid-cols-3 gap-8 mb-12">
                  {['Upload Photos', 'AI Analysis', 'Instant Quote'].map((step, index) => (
                    <motion.div
                      key={step}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2 }}
                      whileHover={{ scale: 1.05 }}
                      className="glass-card rounded-2xl p-6"
                    >
                      <div className="text-5xl font-bold gradient-text mb-3">
                        {String(index + 1).padStart(2, '0')}
                      </div>
                      <div className="text-xl font-semibold text-white">{step}</div>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur-lg group-hover:blur-xl transition-all opacity-70" />
                  <div className="relative bg-gradient-to-r from-cyan-500 to-blue-500 px-12 py-6 rounded-2xl font-bold text-xl text-white">
                    Try AI Assessment Now
                  </div>
                </motion.button>
              </div>
            </div>

            {/* Animated Background Orbs */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl">
              <motion.div
                animate={{ 
                  x: [0, 100, 0],
                  y: [0, -100, 0]
                }}
                transition={{ duration: 20, repeat: Infinity }}
                className="absolute top-20 left-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-10"
              />
              <motion.div
                animate={{ 
                  x: [0, -100, 0],
                  y: [0, 100, 0]
                }}
                transition={{ duration: 15, repeat: Infinity }}
                className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="relative z-10 py-32 px-6 animate-on-scroll">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold gradient-text mb-16">
            Trusted by Industry Leaders
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {['ISO 9001', 'IICRC Certified', 'EPA RRP', 'BBB A+ Rated'].map((cert, index) => (
              <motion.div
                key={cert}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="glass-card rounded-2xl p-8 group"
              >
                <ShieldCheckIcon className="w-12 h-12 mx-auto mb-4 text-green-400 group-hover:scale-110 transition-transform" />
                <div className="font-bold text-white">{cert}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              <span className="gradient-text">Ready to Experience</span>
              <br />
              <span className="text-white">The Future of Recovery?</span>
            </h2>
            
            <p className="text-xl text-gray-400 mb-12">
              Join thousands who&apos;ve discovered faster, smarter disaster recovery
            </p>

            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="tel:1-800-DISASTER"
                className="flex items-center gap-4 bg-gradient-to-r from-green-500 to-emerald-500 px-10 py-6 rounded-full font-bold text-xl text-white shadow-2xl hover:shadow-green-500/25 transition-all"
              >
                <PhoneIcon className="w-8 h-8" />
                Call 1-800-DISASTER
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-white rounded-full animate-ping" />
                  <span className="text-sm">Live Now</span>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'framer-motion';
import { 
  HomeIcon,
  FireIcon,
  BeakerIcon,
  ShieldCheckIcon,
  BoltIcon,
  WrenchIcon,
  TruckIcon,
  ClockIcon,
  CheckCircleIcon,
  ChartBarIcon,
  CubeIcon,
  SparklesIcon,
  ArrowRightIcon,
  PhoneIcon,
  DocumentCheckIcon,
  UserGroupIcon
} from '@heroicons/react/24/outline';

interface Service {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  gradient: string;
  features: string[];
  process: string[];
  stats: { label: string; value: string }[];
  image: string;
}

export default function UltraModernServicesPage() {
  const [activeService, setActiveService] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Advanced mouse tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  // Scroll animations
  const { scrollYProgress } = useScroll();
  const headerY = useTransform(scrollYProgress, [0, 0.2], ['0%', '-100%']);
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services: Service[] = [
    {
      id: 'water-damage',
      title: 'Water Damage Restoration',
      subtitle: 'Advanced Hydro Extraction Technology',
      description: 'Cutting-edge water damage restoration using molecular drying technology and AI-powered moisture mapping.',
      icon: HomeIcon,
      gradient: 'from-blue-600 via-cyan-500 to-teal-400',
      features: [
        '24/7 Emergency Response',
        'Thermal Imaging Detection',
        'Molecular Drying Systems',
        'Anti-Microbial Treatment',
        'Insurance Direct Billing',
        'Real-time Progress Tracking'
      ],
      process: [
        'Emergency Assessment',
        'Water Extraction',
        'Structural Drying',
        'Dehumidification',
        'Sanitization',
        'Final Restoration'
      ],
      stats: [
        { label: 'Response Time', value: '< 60 min' },
        { label: 'Drying Efficiency', value: '99.9%' },
        { label: 'Success Rate', value: '100%' }
      ],
      image: '/images/services/water-damage-restoration.webp'
    },
    {
      id: 'fire-damage',
      title: 'Fire & Smoke Restoration',
      subtitle: 'Complete Fire Damage Recovery',
      description: 'Comprehensive fire restoration with advanced soot removal and odour elimination technology.',
      icon: FireIcon,
      gradient: 'from-orange-600 via-red-500 to-pink-400',
      features: [
        'Smoke Odour Elimination',
        'Soot & Debris Removal',
        'Structural Repairs',
        'Content Restoration',
        'Air Quality Testing',
        'Insurance Coordination'
      ],
      process: [
        'Damage Assessment',
        'Board-up Services',
        'Soot Removal',
        'Odour Treatment',
        'Deep Cleaning',
        'Reconstruction'
      ],
      stats: [
        { label: 'Properties Restored', value: '5,000+' },
        { label: 'Odour Elimination', value: '100%' },
        { label: 'Certified Technicians', value: '50+' }
      ],
      image: '/images/services/fire-damage-restoration.webp'
    },
    {
      id: 'mould-remediation',
      title: 'Mould Remediation',
      subtitle: 'Advanced Microbial Control',
      description: 'Professional mould removal using HEPA filtration and antimicrobial treatments.',
      icon: BeakerIcon,
      gradient: 'from-green-600 via-emerald-500 to-teal-400',
      features: [
        'HEPA Air Filtration',
        'Containment Barriers',
        'Antimicrobial Treatment',
        'Humidity Control',
        'Air Quality Testing',
        'Prevention Planning'
      ],
      process: [
        'Inspection & Testing',
        'Containment Setup',
        'Air Filtration',
        'Mould Removal',
        'Cleaning & Sanitizing',
        'Prevention Measures'
      ],
      stats: [
        { label: 'Mould Types Treated', value: '200+' },
        { label: 'Air Quality Improvement', value: '95%' },
        { label: 'Recurrence Rate', value: '< 1%' }
      ],
      image: '/images/services/mould-remediation.webp'
    },
    {
      id: 'storm-damage',
      title: 'Storm & Disaster Recovery',
      subtitle: 'Emergency Storm Response',
      description: 'Rapid response storm damage restoration with structural stabilization and debris removal.',
      icon: BoltIcon,
      gradient: 'from-purple-600 via-indigo-500 to-blue-400',
      features: [
        'Emergency Tarping',
        'Tree & Debris Removal',
        'Structural Repairs',
        'Roof Restoration',
        'Flooding Mitigation',
        'Power Restoration Support'
      ],
      process: [
        'Emergency Response',
        'Safety Assessment',
        'Temporary Protection',
        'Debris Clearing',
        'Structural Repairs',
        'Full Restoration'
      ],
      stats: [
        { label: 'Response Fleet', value: '30+ Vehicles' },
        { label: 'Coverage Area', value: 'National' },
        { label: 'Average Response', value: '45 min' }
      ],
      image: '/images/heroes/vehicles-fleet.jpg'
    }
  ];

  return (
    <div ref={containerRef} className="min-h-screen relative overflow-hidden noise-overlay">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-blue-950 to-purple-950" />
        
        {/* Dynamic Grid Pattern */}
        <motion.div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '50px 50px',
            scale: backgroundScale
          }}
        />

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      {/* Interactive Mouse Follower */}
      <motion.div
        className="pointer-events-none fixed w-4 h-4 z-50"
        style={{
          x: smoothMouseX,
          y: smoothMouseY,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-full h-full bg-cyan-400 rounded-full opacity-50 blur-sm" />
      </motion.div>

      {/* Header */}
      <motion.header 
        style={{ y: headerY }}
        className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-centre">
            <Link href="/" className="text-2xl font-bold gradient-text">
              Disaster Recovery
            </Link>
            <nav className="hidden md:flex space-x-8">
              {['Home', 'Services', 'About', 'Contact'].map((item) => (
                <Link
                  key={item}
                  href={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
                  className="text-gray-300 hover:text-white transition-colours relative group"
                >
                  {item}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 group-hover:w-full transition-all" />
                </Link>
              ))}
            </nav>
            <Link
              href="/contact"
              className="neon-button bg-gradient-to-r from-red-600 to-orange-500 px-6 py-2 rounded-full text-white font-bold hover:shadow-lg hover:shadow-red-500/50 transition-all flex items-centre gap-2"
            >
              <PhoneIcon className="w-5 h-5" />
              Emergency
            </Link>
          </div>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative z-10 pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-centre mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-centre gap-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-6 py-2 rounded-full mb-6 border border-blue-500/30"
            >
              <SparklesIcon className="w-5 h-5 text-blue-400" />
              <span className="text-blue-400 font-semibold">Professional Restoration Services</span>
            </motion.div>
            
            <h1 className="text-6xl md:text-8xl font-bold mb-6">
              <span className="gradient-text">Advanced Recovery</span>
              <br />
              <span className="text-white">Solutions</span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              Industry-leading disaster recovery services with cutting-edge technology, 
              24/7 emergency response, and certified restoration experts.
            </p>
          </motion.div>

          {/* Service Cards Grid */}
          <div className="grid md:grid-cols-2 gap-8 mb-20">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2 }}
                onHoverStart={() => setHoveredCard(service.id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="relative group"
              >
                <motion.div
                  className="glass-card rounded-2xl p-8 h-full cursor-pointer overflow-hidden"
                  whileHover={{ scale: 1.02 }}
                  onClick={() => setActiveService(activeService === service.id ? null : service.id)}
                >
                  {/* Card Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 transition-opacity`} />
                  
                  {/* Card Content */}
                  <div className="relative z-10">
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-centre gap-4">
                        <motion.div
                          className={`p-4 rounded-xl bg-gradient-to-br ${service.gradient}`}
                          animate={hoveredCard === service.id ? { rotate: 360 } : {}}
                          transition={{ duration: 0.8 }}
                        >
                          <service.icon className="w-8 h-8 text-white" />
                        </motion.div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{service.title}</h3>
                          <p className="text-sm text-gray-400">{service.subtitle}</p>
                        </div>
                      </div>
                      <motion.div
                        animate={{ rotate: activeService === service.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <ArrowRightIcon className="w-6 h-6 text-gray-400" />
                      </motion.div>
                    </div>

                    <p className="text-gray-300 mb-6">{service.description}</p>

                    {/* Stats Row */}
                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {service.stats.map((stat, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.1 * i }}
                          className="text-centre"
                        >
                          <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                          <div className="text-xs text-gray-500">{stat.label}</div>
                        </motion.div>
                      ))}
                    </div>

                    {/* Features Preview */}
                    <div className="flex flex-wrap gap-2">
                      {service.features.slice(0, 3).map((feature, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-white/5 rounded-full text-xs text-gray-400 border border-white/10"
                        >
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 3 && (
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full text-xs text-blue-400 border border-blue-500/30">
                          +{service.features.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect Border */}
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={hoveredCard === service.id ? {
                      boxShadow: '0 0 40px rgba(59, 130, 246, 0.3)',
                    } : {}}
                  />
                </motion.div>

                {/* Expanded Details */}
                <AnimatePresence>
                  {activeService === service.id && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4"
                    >
                      <div className="glass-card rounded-2xl p-8">
                        <h4 className="text-xl font-bold text-white mb-6">Our Process</h4>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                          {service.process.map((step, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-centre gap-3"
                            >
                              <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${service.gradient} flex items-centre justify-centre text-white font-bold text-sm`}>
                                {i + 1}
                              </div>
                              <span className="text-gray-300 text-sm">{step}</span>
                            </motion.div>
                          ))}
                        </div>

                        <h4 className="text-xl font-bold text-white mb-4">All Features</h4>
                        <div className="grid grid-cols-2 gap-3 mb-8">
                          {service.features.map((feature, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-centre gap-2"
                            >
                              <CheckCircleIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                              <span className="text-gray-300 text-sm">{feature}</span>
                            </motion.div>
                          ))}
                        </div>

                        <div className="flex gap-4">
                          <Link
                            href={`/services/${service.id}`}
                            className="flex-1 text-centre py-3 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:shadow-lg hover:shadow-blue-500/25 transition-all"
                          >
                            Learn More
                          </Link>
                          <Link
                            href="/contact"
                            className={`flex-1 text-centre py-3 rounded-xl bg-gradient-to-r ${service.gradient} text-white font-semibold hover:shadow-lg transition-all`}
                          >
                            Get Quote
                          </Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

          {/* Why Choose Us Section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card rounded-3xl p-12 mb-20"
          >
            <h2 className="text-4xl font-bold text-centre mb-12">
              <span className="gradient-text">Why Industry Leaders</span>
              <span className="text-white"> Choose Us</span>
            </h2>

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { icon: ClockIcon, title: '24/7 Response', value: 'Always Available' },
                { icon: ShieldCheckIcon, title: 'Certified Experts', value: 'IICRC Certified' },
                { icon: ChartBarIcon, title: 'Success Rate', value: '99.9%' },
                { icon: UserGroupIcon, title: 'Happy Clients', value: '15,000+' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-centre group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.5 }}
                    className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-centre justify-centre border border-blue-500/30 group-hover:border-blue-400/50"
                  >
                    <item.icon className="w-10 h-10 text-blue-400" />
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-2">{item.value}</h3>
                  <p className="text-gray-400">{item.title}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-centre"
          >
            <h2 className="text-5xl font-bold mb-8">
              <span className="text-white">Need Emergency </span>
              <span className="gradient-text">Assistance?</span>
            </h2>
            <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto">
              Our certified restoration experts are standing by 24/7 to respond to your emergency
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/contact"
                className="flex items-centre gap-4 bg-gradient-to-r from-red-600 to-orange-500 px-12 py-6 rounded-full font-bold text-2xl text-white shadow-2xl hover:shadow-red-500/25 transition-all"
              >
                <PhoneIcon className="w-8 h-8" />
                Call Contact Us
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                  className="w-3 h-3 bg-white rounded-full"
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
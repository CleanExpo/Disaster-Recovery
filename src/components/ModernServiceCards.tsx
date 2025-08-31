'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { useMagneticEffect } from '@/hooks/useMagneticEffect';
import { 
  Droplets, 
  Flame, 
  Wind, 
  CheckCircle, 
  ArrowRight,
  Zap,
  Shield,
  Clock,
  Award
} from 'lucide-react';

interface Service {
  id: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  features: string[];
  href: string;
  colour: string;
  bgGradient: string;
  stats: { label: string; value: string };
}

const ModernServiceCards: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const services: Service[] = [
    {
      id: 'water-damage',
      icon: Droplets,
      title: 'Water Damage Restoration',
      description: 'Advanced moisture extraction and structural drying with AI-powered damage assessment technology.',
      features: [
        '24/7 Online Emergency Response',
        'Thermal Imaging Detection', 
        'Advanced Drying Equipment',
        'Insurance Pre-Approval'
      ],
      href: '/services/water-damage',
      colour: 'from-blue-500 to-cyan-500',
      bgGradient: 'from-blue-500/10 to-cyan-500/10',
      stats: { label: 'Success Rate', value: '99.2%' }
    },
    {
      id: 'fire-damage',
      icon: Flame,
      title: 'Fire & Smoke Damage',
      description: 'Complete fire damage restoration using cutting-edge odour elimination and content restoration technology.',
      features: [
        'Soot & Ash Cleanup',
        'Advanced Odour Elimination',
        'Content Restoration',
        'Structural Repairs'
      ],
      href: '/services/fire-damage',
      colour: 'from-red-500 to-orange-500',
      bgGradient: 'from-red-500/10 to-orange-500/10',
      stats: { label: 'Restoration Time', value: '72hrs' }
    },
    {
      id: 'mould-remediation',
      icon: Wind,
      title: 'Mould Remediation',
      description: 'Safe and thorough mould removal with EPA-approved methods and comprehensive prevention strategies.',
      features: [
        'HEPA Air Filtration',
        'Antimicrobial Treatment',
        'Air Quality Testing',
        'Prevention Protocols'
      ],
      href: '/services/mould-remediation',
      colour: 'from-green-500 to-emerald-500',
      bgGradient: 'from-green-500/10 to-emerald-500/10',
      stats: { label: 'Health Safe', value: '100%' }
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section ref={sectionRef} className="py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Gradient mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 opacity-50" />
        
        {/* Animated grid pattern */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%']
          }}
          transition={{ 
            duration: 20, 
            repeat: Infinity, 
            ease: "linear" 
          }}
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(99, 102, 241, 0.3) 1px, transparent 1px),
              linear-gradient(rgba(99, 102, 241, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />

        {/* Floating orbs */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full blur-3xl"
            style={{
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              background: `radial-gradient(circle, ${
                ['rgba(99, 102, 241, 0.1)', 'rgba(139, 92, 246, 0.1)', 'rgba(236, 72, 153, 0.1)'][i]
              } 0%, transparent 70%)`,
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              x: [0, 50, 0],
              y: [0, -30, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 1.5,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 glass-card"
            style={{ 
              background: 'rgba(99, 102, 241, 0.1)',
              border: '1px solid rgba(99, 102, 241, 0.2)' 
            }}
            whileHover={{ scale: 1.05 }}
          >
            <Award className="h-4 w-4 text-blue-400" />
            <span className="text-sm font-medium text-blue-300">Premium Services</span>
          </motion.div>
          
          <h2 className="text-5xl lg:text-6xl font-black mb-6 premium-heading">
            Comprehensive Restoration
            <br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Solutions
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto premium-text">
            Advanced disaster recovery technology meets decades of expertise. 
            Every service backed by AI-powered assessments and guaranteed results.
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {services.map((service, index) => {
            const Icon = service.icon;
            const magneticRef = useMagneticEffect({ 
              strength: 0.2, 
              maxDistance: 80, 
              scale: 1.02 
            });

            return (
              <motion.div
                key={service.id}
                ref={magneticRef}
                variants={cardVariants}
                className="group relative glass-card rounded-3xl p-8 overflow-hidden noise-texture"
                style={{
                  background: `linear-gradient(135deg, ${service.bgGradient})`,
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ 
                  y: -10,
                  transition: { duration: 0.3 }
                }}
              >
                {/* Gradient overlay on hover */}
                <div 
                  className={`absolute inset-0 bg-gradient-to-br ${service.colour} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}
                />
                
                {/* Animated border on hover */}
                <div 
                  className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `linear-gradient(135deg, ${service.colour.replace('from-', 'rgba(').replace('to-', 'rgba(').replace('-500', ', 0.3)')})`,
                    padding: '2px',
                    WebkitMask: 'linear-gradient(white 0 0) content-box, linear-gradient(white 0 0)',
                    WebkitMaskComposite: 'xor',
                  }}
                />

                {/* Icon with animated background */}
                <motion.div 
                  className="relative mb-8"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${service.colour} shadow-2xl relative`}
                  >
                    <Icon className="h-10 w-10 text-white" />
                    
                    {/* Glow effect */}
                    <div 
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${service.colour} blur-lg opacity-50 group-hover:opacity-75 transition-opacity`}
                    />
                  </div>
                  
                  {/* Floating badge */}
                  <motion.div 
                    className="absolute -top-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ scale: 1.2, rotate: 180 }}
                  >
                    <CheckCircle className="h-4 w-4 text-white" />
                  </motion.div>
                </motion.div>
                
                {/* Service Title */}
                <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                  {service.title}
                </h3>
                
                {/* Description */}
                <p className="text-gray-400 mb-6 leading-relaxed group-hover:text-gray-300 transition-colours">
                  {service.description}
                </p>
                
                {/* Features List */}
                <ul className="space-y-3 mb-8">
                  {service.features.map((feature, featureIndex) => (
                    <motion.li 
                      key={featureIndex}
                      className="flex items-start gap-3"
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ 
                        delay: 0.8 + index * 0.1 + featureIndex * 0.05,
                        duration: 0.5 
                      }}
                    >
                      <motion.div 
                        className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 flex items-center justify-center mt-0.5"
                        whileHover={{ scale: 1.2, rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <CheckCircle className="h-3 w-3 text-white" />
                      </motion.div>
                      <span className="text-sm text-gray-300 group-hover:text-white transition-colours">
                        {feature}
                      </span>
                    </motion.li>
                  ))}
                </ul>

                {/* Stats Badge */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${service.colour} animate-pulse`} />
                    <span className="text-xs text-gray-500 uppercase tracking-wide">
                      {service.stats.label}
                    </span>
                  </div>
                  <span className="text-lg font-bold text-white">
                    {service.stats.value}
                  </span>
                </div>
                
                {/* CTA Link */}
                <Link 
                  href={service.href}
                  className="group/link relative inline-flex items-center gap-2 text-white font-semibold hover:text-transparent hover:bg-gradient-to-r hover:from-white hover:to-gray-300 hover:bg-clip-text transition-all duration-300"
                >
                  <span>Learn More</span>
                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="h-5 w-5" />
                  </motion.div>
                  
                  {/* Animated underline */}
                  <div 
                    className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r ${service.colour} w-0 group-hover/link:w-full transition-all duration-300`}
                  />
                </Link>

                {/* Hover Effects */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <motion.div
                    animate={{ 
                      rotate: [0, 360],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ 
                      duration: 2, 
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Zap className="h-6 w-6 text-yellow-400" />
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action */}
        <motion.div 
          className="text-center mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="inline-flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Shield className="h-4 w-4 text-blue-400" />
              <span>Industry Certified</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Clock className="h-4 w-4 text-green-400" />
              <span>24/7 Response</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Award className="h-4 w-4 text-purple-400" />
              <span>Guaranteed Results</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ModernServiceCards;
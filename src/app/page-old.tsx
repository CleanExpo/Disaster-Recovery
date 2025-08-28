'use client';

import { Metadata } from 'next';
import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { Phone, Mail, MapPin, Clock, Shield, CheckCircle, ArrowRight, AlertTriangle, Droplets, Flame, Wind, Users, Star, Award, Zap, FileSearch, Wrench, Truck, ClipboardCheck, MessageCircle } from 'lucide-react';

// Import our interactive components
import {
  AnimatedHero,
  Interactive3DServiceCards,
  InteractiveBeforeAfterSlider,
  AnimatedCountersAndWidgets,
  FloatingActionButtons,
  EmergencyParticleSystem,
  ScrollAnimations,
  FadeInOnScroll,
  ParallaxSection,
  ScrollCounter,
  GlassMorphismCard,
  NeonGlowButton,
} from '@/components/interactive';

export default function LandingPage() {
  const { scrollYProgress } = useScroll();
  const heroParallax = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  
  const [isEmergency, setIsEmergency] = useState(true);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setIsEmergency(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Emergency Particle Background */}
      <EmergencyParticleSystem 
        type={isEmergency ? "fire" : "water"} 
        intensity="medium" 
        className="fixed inset-0 z-0"
      />
      
      {/* Emergency Banner with Real Animation */}
      <motion.div 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white py-2 px-4 text-center relative overflow-hidden z-50 sticky top-0"
      >
        <motion.div 
          animate={{ x: ["0%", "100%", "0%"] }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
        />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center justify-center space-x-4">
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity }}>
              🚨
            </motion.span>
            <p className="font-bold text-sm md:text-base tracking-wide">
              EMERGENCY RESPONSE ACTIVE • 24/7 TEAMS READY • CALL 1300 566 166 NOW
            </p>
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.25 }}>
              🚨
            </motion.span>
          </div>
        </div>
      </motion.div>

      {/* Hero Section with Real Background Image and Parallax */}
      <ParallaxSection speed={0.5} className="relative min-h-screen overflow-hidden">
        <motion.div style={{ y: heroParallax, opacity: heroOpacity }} className="absolute inset-0">
          <Image
            src="/images/heroes/disaster-recovery-hero.webp"
            alt="Emergency Disaster Recovery Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/60" />
        </motion.div>
        
        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h1 
                className="text-5xl md:text-7xl font-bold text-white mb-6"
                animate={{ 
                  textShadow: [
                    "0px 0px 20px rgba(255,0,0,0)",
                    "0px 0px 40px rgba(255,0,0,0.8)",
                    "0px 0px 20px rgba(255,0,0,0)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                24/7 Emergency
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
                  Disaster Recovery
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-xl md:text-2xl text-gray-200 mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Professional Restoration Services for Water, Fire & Storm Damage
              </motion.p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <NeonGlowButton
                  color="red"
                  size="lg"
                  animated={true}
                  onClick={() => window.location.href = 'tel:1300566166'}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Call 1300 566 166
                </NeonGlowButton>
                
                <NeonGlowButton
                  color="blue"
                  size="lg"
                  animated={false}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Get Free Quote
                </NeonGlowButton>
              </div>
              
              {/* Trust Indicators */}
              <motion.div 
                className="mt-12 grid grid-cols-3 gap-4 max-w-2xl mx-auto"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <GlassMorphismCard intensity="medium" glow={true} glowColor="green">
                  <div className="text-white p-4">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-green-400" />
                    <p className="text-sm font-semibold">IICRC Certified</p>
                  </div>
                </GlassMorphismCard>
                
                <GlassMorphismCard intensity="medium" glow={true} glowColor="blue">
                  <div className="text-white p-4">
                    <Award className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                    <p className="text-sm font-semibold">Insurance Approved</p>
                  </div>
                </GlassMorphismCard>
                
                <GlassMorphismCard intensity="medium" glow={true} glowColor="purple">
                  <div className="text-white p-4">
                    <Zap className="h-8 w-8 mx-auto mb-2 text-purple-400" />
                    <p className="text-sm font-semibold">Rapid Response</p>
                  </div>
                </GlassMorphismCard>
              </motion.div>
            </motion.div>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="text-white text-center">
            <p className="text-sm mb-2">Scroll to explore</p>
            <ArrowRight className="h-6 w-6 mx-auto rotate-90" />
          </div>
        </motion.div>
      </ParallaxSection>

      {/* Main Services Section with Interactive Cards */}
      <section className="py-20 relative z-10 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll direction="up">
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              Emergency Services Available 24/7
            </h2>
          </FadeInOnScroll>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Water Damage Card */}
            <FadeInOnScroll delay={0.1}>
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group"
              >
                <GlassMorphismCard intensity="strong" glow={true} glowColor="blue">
                  <div className="relative h-64 overflow-hidden rounded-t-lg">
                    <Image
                      src="/images/services/water-damage-restoration.webp"
                      alt="Water Damage Restoration"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <Droplets className="absolute top-4 right-4 h-12 w-12 text-blue-400" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3">Water Damage</h3>
                    <p className="text-gray-300 mb-4">
                      Rapid water extraction, structural drying, and mold prevention
                    </p>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" /> 24/7 Emergency Response</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" /> Advanced Drying Equipment</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" /> Insurance Direct Billing</li>
                    </ul>
                  </div>
                </GlassMorphismCard>
              </motion.div>
            </FadeInOnScroll>
            
            {/* Fire Damage Card */}
            <FadeInOnScroll delay={0.2}>
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group"
              >
                <GlassMorphismCard intensity="strong" glow={true} glowColor="red">
                  <div className="relative h-64 overflow-hidden rounded-t-lg">
                    <Image
                      src="/images/services/fire-damage-restoration.webp"
                      alt="Fire Damage Restoration"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <Flame className="absolute top-4 right-4 h-12 w-12 text-orange-400" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3">Fire Damage</h3>
                    <p className="text-gray-300 mb-4">
                      Smoke removal, soot cleanup, and complete restoration
                    </p>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" /> Smoke Odor Elimination</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" /> Structural Repairs</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" /> Content Restoration</li>
                    </ul>
                  </div>
                </GlassMorphismCard>
              </motion.div>
            </FadeInOnScroll>
            
            {/* Storm Damage Card */}
            <FadeInOnScroll delay={0.3}>
              <motion.div
                whileHover={{ scale: 1.05, rotateY: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="relative group"
              >
                <GlassMorphismCard intensity="strong" glow={true} glowColor="purple">
                  <div className="relative h-64 overflow-hidden rounded-t-lg">
                    <Image
                      src="/images/heroes/vehicles-fleet.jpg"
                      alt="Storm Damage Response"
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <Wind className="absolute top-4 right-4 h-12 w-12 text-purple-400" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-white mb-3">Storm Damage</h3>
                    <p className="text-gray-300 mb-4">
                      Emergency tarping, debris removal, and full reconstruction
                    </p>
                    <ul className="text-sm text-gray-400 space-y-2">
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" /> Emergency Board-Up</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" /> Tree & Debris Removal</li>
                      <li className="flex items-center"><CheckCircle className="h-4 w-4 mr-2 text-green-400" /> Roof Repairs</li>
                    </ul>
                  </div>
                </GlassMorphismCard>
              </motion.div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Stats Section with Animated Counters */}
      <section className="py-20 bg-gradient-to-r from-blue-900 to-purple-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <EmergencyParticleSystem type="emergency" intensity="low" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <FadeInOnScroll>
              <div className="text-center">
                <ScrollCounter
                  end={15}
                  duration={2}
                  className="text-5xl font-bold text-white"
                  suffix="+"
                />
                <p className="text-gray-200 mt-2">Years Experience</p>
              </div>
            </FadeInOnScroll>
            
            <FadeInOnScroll delay={0.1}>
              <div className="text-center">
                <ScrollCounter
                  end={5000}
                  duration={2}
                  className="text-5xl font-bold text-white"
                  suffix="+"
                />
                <p className="text-gray-200 mt-2">Properties Restored</p>
              </div>
            </FadeInOnScroll>
            
            <FadeInOnScroll delay={0.2}>
              <div className="text-center">
                <ScrollCounter
                  end={30}
                  duration={2}
                  className="text-5xl font-bold text-white"
                  prefix="<"
                  suffix="min"
                />
                <p className="text-gray-200 mt-2">Response Time</p>
              </div>
            </FadeInOnScroll>
            
            <FadeInOnScroll delay={0.3}>
              <div className="text-center">
                <ScrollCounter
                  end={98}
                  duration={2}
                  className="text-5xl font-bold text-white"
                  suffix="%"
                />
                <p className="text-gray-200 mt-2">Satisfaction Rate</p>
              </div>
            </FadeInOnScroll>
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInOnScroll>
            <h2 className="text-4xl font-bold text-center text-white mb-12">
              See The Difference We Make
            </h2>
          </FadeInOnScroll>
          
          <InteractiveBeforeAfterSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 to-orange-600 relative overflow-hidden">
        <motion.div
          className="absolute inset-0 opacity-10"
          animate={{
            backgroundImage: [
              "radial-gradient(circle at 20% 50%, white 0%, transparent 50%)",
              "radial-gradient(circle at 80% 50%, white 0%, transparent 50%)",
              "radial-gradient(circle at 20% 50%, white 0%, transparent 50%)",
            ]
          }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Emergency? We're Here 24/7
          </motion.h2>
          
          <motion.p 
            className="text-xl text-white/90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Don't wait for damage to worsen. Our emergency response team is standing by.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring" }}
          >
            <NeonGlowButton
              color="yellow"
              size="xl"
              animated={true}
              onClick={() => window.location.href = 'tel:1300566166'}
              className="text-2xl"
            >
              <Phone className="mr-3 h-7 w-7" />
              Call 1300 566 166 Now
            </NeonGlowButton>
          </motion.div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <FloatingActionButtons />
    </>
  );
}
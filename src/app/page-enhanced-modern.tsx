'use client';

import { Metadata } from 'next';
import React, { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';

// Dynamically import interactive components for better performance
const AnimatedHero = dynamic(
  () => import('@/components/interactive/AnimatedHero'),
  { 
    ssr: false,
    loading: () => <div className="h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 animate-pulse" />
  }
);

const Interactive3DServiceCards = dynamic(
  () => import('@/components/interactive/Interactive3DServiceCards'),
  {
    ssr: false,
    loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />
  }
);

const InteractiveBeforeAfterSlider = dynamic(
  () => import('@/components/interactive/InteractiveBeforeAfterSlider'),
  {
    ssr: false,
    loading: () => <div className="h-96 bg-gray-50 animate-pulse rounded-lg" />
  }
);

const AnimatedCountersAndWidgets = dynamic(
  () => import('@/components/interactive/AnimatedCountersAndWidgets'),
  {
    ssr: false,
    loading: () => <div className="h-64 bg-gray-50 animate-pulse rounded-lg" />
  }
);

const FloatingActionButtons = dynamic(
  () => import('@/components/interactive/FloatingActionButtons'),
  {
    ssr: false
  }
);

const EmergencyParticleSystem = dynamic(
  () => import('@/components/interactive/EmergencyParticleSystems'),
  {
    ssr: false
  }
);

const ScrollAnimations = dynamic(
  () => import('@/components/interactive/ScrollTriggeredAnimations'),
  {
    ssr: false
  }
);

const GlassMorphismEffects = dynamic(
  () => import('@/components/interactive/GlassMorphismEffects'),
  {
    ssr: false
  }
);

const PerformanceOptimizer = dynamic(
  () => import('@/components/interactive/PerformanceOptimizer'),
  {
    ssr: false
  }
);

// Import existing components
import { Wrench, CheckCircle, Users, MapPin, Star, Award, Clock, Shield, Phone, MessageCircle, Mail, Zap, ArrowRight } from 'lucide-react';

// Loading fallback components
function SectionFallback({ height = 'h-64' }: { height?: string }) {
  return (
    <div className={`${height} bg-gray-50 animate-pulse rounded-lg flex items-center justify-center`}>
      <div className="text-gray-400">Loading...</div>
    </div>
  );
}

export default function EnhancedModernLandingPage() {
  return (
    <PerformanceOptimizer 
      enableGPUAcceleration={true}
      enableLazyLoading={true}
      showDashboard={process.env.NODE_ENV === 'development'}
    >
      <div className="relative">
        {/* Global particle system overlay */}
        <div className="fixed inset-0 pointer-events-none z-0">
          <Suspense fallback={null}>
            <EmergencyParticleSystem 
              type="emergency" 
              intensity="low" 
              use3D={true}
            />
          </Suspense>
        </div>

        {/* Scroll Progress Indicator */}
        <Suspense fallback={null}>
          <ScrollAnimations.ScrollProgressIndicator />
        </Suspense>

        {/* Emergency Banner with Enhanced Animation */}
        <motion.div 
          className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 text-white py-2 px-4 text-center relative overflow-hidden"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex items-center justify-center space-x-4">
              <motion.span 
                className="text-2xl"
                animate={{ rotate: [0, 15, -15, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🚨
              </motion.span>
              <p className="font-bold text-sm md:text-base tracking-wide">
                EMERGENCY RESPONSE ACTIVE • 24/7 TEAMS READY • CALL 1300 566 166 NOW
              </p>
              <motion.span 
                className="text-2xl"
                animate={{ rotate: [0, -15, 15, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                🚨
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* Enhanced Professional Header */}
        <GlassMorphismEffects.GlassMorphismCard
          className="sticky top-0 z-50 border-b-4 border-red-600"
          intensity="light"
          blur="lg"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo Section with Trust Indicators */}
              <div className="flex items-center space-x-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="relative group">
                    <div className="w-48 h-12 bg-gradient-to-r from-blue-600 to-red-600 rounded-lg flex items-center justify-center text-white font-bold">
                      DISASTER RECOVERY
                    </div>
                    <motion.div 
                      className="absolute -inset-2 bg-gradient-to-r from-blue-600/20 to-red-600/20 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10"
                      animate={{
                        scale: [1, 1.05, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  </div>
                </motion.div>
                
                {/* Trust Badges */}
                <div className="hidden lg:flex items-center space-x-3">
                  <GlassMorphismEffects.NeonText color="green" size="sm">
                    <div className="bg-green-100 text-green-800 px-3 py-1.5 rounded-full text-xs font-bold flex items-center">
                      <Shield className="h-4 w-4 mr-1" />
                      IICRC Certified
                    </div>
                  </GlassMorphismEffects.NeonText>
                  <GlassMorphismEffects.NeonText color="blue" size="sm">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1.5 rounded-full text-xs font-bold flex items-center">
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Insurance Approved
                    </div>
                  </GlassMorphismEffects.NeonText>
                </div>
              </div>
              
              {/* Navigation with Hover Effects */}
              <nav className="hidden lg:flex items-center space-x-8">
                {['Services', 'Our Process', 'Coverage Areas', 'Contact'].map((item, index) => (
                  <motion.a
                    key={item}
                    href={`#${item.toLowerCase().replace(' ', '-')}`}
                    className="relative text-gray-700 hover:text-red-600 font-semibold transition-colors duration-300 group"
                    whileHover={{ y: -2 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {item}
                    <motion.span 
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-red-600 group-hover:w-full transition-all duration-300"
                      whileHover={{ width: '100%' }}
                    />
                  </motion.a>
                ))}
              </nav>
              
              {/* Emergency Contact Section */}
              <div className="flex items-center space-x-4">
                {/* Response Time Indicator */}
                <motion.div 
                  className="hidden xl:flex items-center bg-green-50 text-green-700 px-3 py-2 rounded-lg border border-green-200"
                  animate={{
                    boxShadow: [
                      "0 0 0 0 rgba(34, 197, 94, 0)",
                      "0 0 0 8px rgba(34, 197, 94, 0.1)",
                      "0 0 0 0 rgba(34, 197, 94, 0)"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <motion.div 
                    className="w-2 h-2 bg-green-500 rounded-full mr-2"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.7, 1]
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                  <Clock className="h-4 w-4 mr-1" />
                  <span className="text-sm font-bold">60min Response</span>
                </motion.div>
                
                {/* Emergency CTA Button */}
                <GlassMorphismEffects.NeonGlowButton
                  color="red"
                  size="md"
                  animated={true}
                  onClick={() => window.open('tel:1300566166')}
                >
                  <span className="flex items-center">
                    <motion.span
                      className="mr-2 text-lg"
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      🚨
                    </motion.span>
                    EMERGENCY
                  </span>
                </GlassMorphismEffects.NeonGlowButton>
              </div>
            </div>
          </div>
        </GlassMorphismEffects.GlassMorphismCard>

        {/* Main Content */}
        <main className="relative">
          
          {/* ========================================= */}
          {/* SECTION 1: ANIMATED HERO WITH PARTICLES  */}
          {/* ========================================= */}
          <section className="relative">
            <Suspense fallback={<SectionFallback height="h-screen" />}>
              <AnimatedHero />
            </Suspense>
          </section>

          {/* ========================================= */}
          {/* SECTION 2: 3D INTERACTIVE SERVICE CARDS  */}
          {/* ========================================= */}
          <ScrollAnimations.ParallaxSection
            speed={0.3}
            className="bg-gradient-to-b from-gray-50 to-white py-20"
            backgroundElement={
              <div className="absolute inset-0">
                <EmergencyParticleSystem 
                  type="water" 
                  intensity="low" 
                  use3D={false}
                />
              </div>
            }
          >
            <Suspense fallback={<SectionFallback height="h-96" />}>
              <Interactive3DServiceCards />
            </Suspense>

            {/* Additional Interactive Services Grid */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
              <ScrollAnimations.FadeInOnScroll direction="up" delay={0.2}>
                <GlassMorphismEffects.GlassMorphismCard
                  className="p-8"
                  intensity="medium"
                  glow={true}
                  glowColor="blue"
                >
                  <div className="text-center mb-8">
                    <GlassMorphismEffects.NeonText color="purple" size="xl">
                      <h3 className="text-2xl font-bold mb-4">Additional Emergency Services</h3>
                    </GlassMorphismEffects.NeonText>
                    <p className="text-gray-300">Specialized restoration services for every emergency situation</p>
                  </div>
                  
                  <ScrollAnimations.StaggeredList staggerDelay={0.1} direction="up">
                    <div className="grid md:grid-cols-3 gap-6">
                      {[
                        { title: 'Biohazard Cleanup', desc: 'Safe sewage & contamination remediation', icon: '☣️' },
                        { title: 'Floor Restoration', desc: 'Specialized timber & carpet restoration', icon: '🏠' },
                        { title: 'Property Inspections', desc: 'Comprehensive damage assessment', icon: '🔍' }
                      ].map((service, index) => (
                        <motion.div
                          key={service.title}
                          className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center hover:bg-white/20 transition-all duration-300 cursor-pointer group"
                          whileHover={{ scale: 1.05, y: -5 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <motion.div
                            className="text-4xl mb-4"
                            animate={{
                              scale: [1, 1.2, 1],
                            }}
                            transition={{
                              duration: 2,
                              repeat: Infinity,
                              delay: index * 0.3,
                              ease: "easeInOut"
                            }}
                          >
                            {service.icon}
                          </motion.div>
                          <h4 className="text-lg font-bold mb-2 text-white">{service.title}</h4>
                          <p className="text-sm text-gray-300">{service.desc}</p>
                        </motion.div>
                      ))}
                    </div>
                  </ScrollAnimations.StaggeredList>
                </GlassMorphismEffects.GlassMorphismCard>
              </ScrollAnimations.FadeInOnScroll>
            </div>
          </ScrollAnimations.ParallaxSection>

          {/* ========================================= */}
          {/* SECTION 3: BEFORE/AFTER INTERACTIVE SLIDER */}
          {/* ========================================= */}
          <ScrollAnimations.ParallaxSection
            speed={0.2}
            className="bg-gradient-to-b from-white to-gray-50 py-20"
            backgroundElement={
              <div className="absolute inset-0 opacity-50">
                <EmergencyParticleSystem 
                  type="fire" 
                  intensity="low" 
                  use3D={false}
                />
              </div>
            }
          >
            <Suspense fallback={<SectionFallback height="h-96" />}>
              <InteractiveBeforeAfterSlider />
            </Suspense>
          </ScrollAnimations.ParallaxSection>

          {/* ========================================= */}
          {/* SECTION 4: ANIMATED COUNTERS & WIDGETS   */}
          {/* ========================================= */}
          <ScrollAnimations.ParallaxSection
            speed={0.1}
            className="bg-gradient-to-b from-gray-50 to-white py-20"
            backgroundElement={
              <div className="absolute inset-0">
                <GlassMorphismEffects.CyberpunkGrid />
              </div>
            }
          >
            <Suspense fallback={<SectionFallback height="h-64" />}>
              <AnimatedCountersAndWidgets />
            </Suspense>
          </ScrollAnimations.ParallaxSection>

          {/* ========================================= */}
          {/* SECTION 5: TRUST & SOCIAL PROOF WITH GLASS MORPHISM */}
          {/* ========================================= */}
          <section className="relative bg-gradient-to-b from-white to-gray-50 py-20">
            
            {/* Customer Testimonials with Glass Morphism */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
              <ScrollAnimations.FadeInOnScroll direction="up">
                <div className="text-center mb-16">
                  <GlassMorphismEffects.NeonText color="yellow" size="lg">
                    <h2 className="text-4xl md:text-6xl font-black text-gray-900 mb-8">What Our Customers Say</h2>
                  </GlassMorphismEffects.NeonText>
                  <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                    Real experiences from families and businesses we've helped during their emergency situations
                  </p>
                </div>
              </ScrollAnimations.FadeInOnScroll>
              
              <ScrollAnimations.StaggeredList staggerDelay={0.2} direction="left">
                <div className="grid md:grid-cols-2 gap-12">
                  {[
                    {
                      name: 'Sarah Mitchell',
                      location: 'Melbourne • Water Damage Emergency',
                      rating: 5,
                      text: "When our basement flooded at 2 AM, Disaster Recovery had a team at our house within 45 minutes. They saved our home and belongings. Professional, caring, and incredibly fast response. I can't recommend them enough!"
                    },
                    {
                      name: 'David Johnson', 
                      location: 'Sydney • Fire Damage Restoration',
                      rating: 5,
                      text: "After our office fire, they handled everything - from damage assessment to insurance paperwork. We were back in business faster than expected. Their team went above and beyond expectations."
                    }
                  ].map((testimonial, index) => (
                    <GlassMorphismEffects.HolographicCard
                      key={testimonial.name}
                      className="p-10"
                    >
                      <div className="flex mb-6">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <motion.div
                            key={star}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.5 + star * 0.1 }}
                          >
                            <Star className="h-6 w-6 text-yellow-400 fill-current" />
                          </motion.div>
                        ))}
                      </div>
                      <blockquote className="text-white mb-8 text-lg leading-relaxed italic">
                        "{testimonial.text}"
                      </blockquote>
                      <div className="flex items-center">
                        <motion.div 
                          className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                          whileHover={{ scale: 1.1, rotate: 5 }}
                        >
                          {testimonial.name.split(' ').map(n => n[0]).join('')}
                        </motion.div>
                        <div className="ml-4">
                          <p className="font-bold text-white text-lg">{testimonial.name}</p>
                          <p className="text-gray-300">{testimonial.location}</p>
                          <div className="flex items-center mt-2 text-sm text-green-400">
                            <CheckCircle className="h-4 w-4 mr-1" />
                            <span className="font-semibold">Verified Customer</span>
                          </div>
                        </div>
                      </div>
                    </GlassMorphismEffects.HolographicCard>
                  ))}
                </div>
              </ScrollAnimations.StaggeredList>
            </div>

            {/* Interactive Coverage Map */}
            <ScrollAnimations.FadeInOnScroll direction="up" delay={0.4}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <GlassMorphismEffects.GlassMorphismCard
                  className="p-8"
                  intensity="medium"
                  glow={true}
                  glowColor="green"
                >
                  <div className="text-center mb-12">
                    <GlassMorphismEffects.NeonText color="blue" size="2xl">
                      <h3 className="text-4xl font-bold mb-6">Australia Wide Coverage</h3>
                    </GlassMorphismEffects.NeonText>
                    <p className="text-xl text-gray-300">Fast response times across major cities</p>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      { city: 'Sydney', time: '30-45 min', color: 'green' },
                      { city: 'Melbourne', time: '30-45 min', color: 'green' },
                      { city: 'Brisbane', time: '45-60 min', color: 'yellow' }
                    ].map((location, index) => (
                      <motion.div
                        key={location.city}
                        className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 text-center hover:bg-white/20 transition-all duration-300"
                        whileHover={{ scale: 1.05, y: -5 }}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 + index * 0.2 }}
                      >
                        <motion.div
                          className={`bg-gradient-to-br from-${location.color === 'green' ? 'blue' : 'orange'}-100 to-${location.color === 'green' ? 'blue' : 'orange'}-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6`}
                          animate={{
                            scale: [1, 1.1, 1],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3,
                            ease: "easeInOut"
                          }}
                        >
                          <MapPin className={`h-10 w-10 text-${location.color === 'green' ? 'blue' : 'orange'}-600`} />
                        </motion.div>
                        <h4 className="text-2xl font-bold text-white mb-4">{location.city}</h4>
                        <div className="mb-4">
                          <div className={`inline-flex items-center bg-${location.color === 'green' ? 'green' : 'yellow'}-100 text-${location.color === 'green' ? 'green' : 'yellow'}-800 px-4 py-2 rounded-full text-sm font-bold`}>
                            <Clock className="h-4 w-4 mr-2" />
                            {location.time} response
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </GlassMorphismEffects.GlassMorphismCard>
              </div>
            </ScrollAnimations.FadeInOnScroll>
          </section>

          {/* ========================================= */}
          {/* FINAL EMERGENCY CTA WITH NEON EFFECTS    */}
          {/* ========================================= */}
          <section className="relative py-24 overflow-hidden">
            <div className="absolute inset-0">
              <EmergencyParticleSystem 
                type="emergency" 
                intensity="medium" 
                use3D={true}
              />
            </div>
            
            <GlassMorphismEffects 
              variant="dramatic" 
              theme="emergency"
              className="py-24"
            >
              <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <ScrollAnimations.FadeInOnScroll direction="scale">
                  <motion.div 
                    className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full mb-8"
                    animate={{
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <motion.div 
                      className="w-3 h-3 bg-white rounded-full mr-3"
                      animate={{
                        scale: [1, 1.3, 1],
                        opacity: [1, 0.7, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    />
                    <span className="font-bold">EMERGENCY TEAMS STANDING BY NOW</span>
                  </motion.div>
                </ScrollAnimations.FadeInOnScroll>
                
                <ScrollAnimations.TextReveal
                  text="Need Emergency Restoration?"
                  className="text-5xl md:text-7xl font-black mb-8 leading-tight text-white"
                  delay={0.5}
                />
                
                <ScrollAnimations.FadeInOnScroll direction="up" delay={1}>
                  <p className="text-xl md:text-2xl mb-12 opacity-95 max-w-3xl mx-auto leading-relaxed font-medium text-white">
                    Don't wait - <strong>water and fire damage worsen over time</strong>. Our certified teams are ready to respond within 60 minutes to prevent further damage and begin restoration immediately.
                  </p>
                </ScrollAnimations.FadeInOnScroll>
                
                <ScrollAnimations.StaggeredList staggerDelay={0.2} direction="up">
                  <div className="flex flex-col sm:flex-row gap-8 justify-center mb-12">
                    <GlassMorphismEffects.NeonGlowButton
                      color="red"
                      size="xl"
                      animated={true}
                      onClick={() => window.open('tel:1300566166')}
                    >
                      <span className="flex items-center">
                        <motion.div
                          animate={{
                            rotate: [0, 15, -15, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                          }}
                          className="mr-4"
                        >
                          <Phone className="h-8 w-8" />
                        </motion.div>
                        CALL 1300 566 166
                      </span>
                    </GlassMorphismEffects.NeonGlowButton>
                    
                    <GlassMorphismEffects.NeonGlowButton
                      color="blue"
                      size="xl"
                      variant="outline"
                      onClick={() => window.open('sms:1300566166')}
                    >
                      <span className="flex items-center">
                        <motion.div
                          animate={{
                            scale: [1, 1.2, 1]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: 0.5
                          }}
                          className="mr-4"
                        >
                          <MessageCircle className="h-8 w-8" />
                        </motion.div>
                        TEXT US NOW
                      </span>
                    </GlassMorphismEffects.NeonGlowButton>
                  </div>
                </ScrollAnimations.StaggeredList>
                
                <ScrollAnimations.FadeInOnScroll direction="up" delay={1.5}>
                  <div className="text-center">
                    <p className="text-lg opacity-90 font-medium mb-4 text-white">
                      Available 24/7 • Licensed & Insured • 60-Minute Response Guarantee
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-bold">
                      {[
                        { icon: Shield, text: 'IICRC Certified' },
                        { icon: CheckCircle, text: 'Insurance Approved' },
                        { icon: Users, text: '2,500+ Properties Restored' }
                      ].map((item, index) => (
                        <motion.div 
                          key={item.text}
                          className="flex items-center text-white"
                          whileHover={{ scale: 1.1 }}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 2 + index * 0.2 }}
                        >
                          <item.icon className="h-4 w-4 mr-2" />
                          <span>{item.text}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </ScrollAnimations.FadeInOnScroll>
              </div>
            </GlassMorphismEffects>
          </section>
        </main>

        {/* Floating Action Buttons */}
        <Suspense fallback={null}>
          <FloatingActionButtons />
        </Suspense>

        {/* Enhanced Footer with Glass Morphism */}
        <footer className="relative">
          <div className="absolute inset-0">
            <EmergencyParticleSystem 
              type="storm" 
              intensity="low" 
              use3D={false}
            />
          </div>
          
          <GlassMorphismEffects.GlassMorphismCard
            className="bg-gradient-to-b from-gray-900 to-black text-white relative"
            intensity="strong"
            blur="lg"
          >
            {/* Emergency Contact Bar */}
            <div className="bg-gradient-to-r from-red-700 via-red-600 to-red-700 relative overflow-hidden">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 relative z-10">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center">
                      <motion.div 
                        className="w-3 h-3 bg-green-400 rounded-full mr-2"
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [1, 0.7, 1]
                        }}
                        transition={{
                          duration: 1.5,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                      />
                      <span className="text-sm font-bold">EMERGENCY TEAMS AVAILABLE NOW</span>
                    </div>
                    <span className="hidden md:inline text-sm">• 60-Min Response Guarantee</span>
                  </div>
                  <div className="flex items-center space-x-6">
                    <GlassMorphismEffects.NeonGlowButton
                      color="red"
                      size="md"
                      onClick={() => window.open('tel:1300566166')}
                    >
                      <span className="flex items-center">
                        <Phone className="h-6 w-6 mr-2" />
                        <span className="text-2xl font-bold">1300 566 166</span>
                      </span>
                    </GlassMorphismEffects.NeonGlowButton>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                
                {/* Company Info */}
                <div>
                  <GlassMorphismEffects.NeonText color="blue" size="lg">
                    <div className="mb-6 text-2xl font-bold">DISASTER RECOVERY</div>
                  </GlassMorphismEffects.NeonText>
                  <p className="text-gray-300 mb-4 text-sm leading-relaxed">
                    Australia's trusted emergency restoration specialists. IICRC certified teams providing 24/7 response 
                    for water damage, fire damage, mould remediation, and biohazard cleanup.
                  </p>
                </div>

                {/* Services */}
                <div>
                  <h3 className="text-white font-bold mb-4">Emergency Services</h3>
                  <ul className="space-y-2 text-sm">
                    {['Water Damage', 'Fire & Smoke', 'Mould Remediation', 'Storm Damage'].map((service) => (
                      <li key={service}>
                        <motion.a
                          href="#"
                          className="text-gray-300 hover:text-white transition-colors flex items-center group"
                          whileHover={{ x: 5 }}
                        >
                          <ArrowRight className="h-3 w-3 mr-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                          {service}
                        </motion.a>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Coverage */}
                <div>
                  <h3 className="text-white font-bold mb-4">Service Areas</h3>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {[
                      { city: 'Sydney', time: '30-45min' },
                      { city: 'Melbourne', time: '30-45min' },
                      { city: 'Brisbane', time: '45-60min' }
                    ].map((area) => (
                      <li key={area.city} className="flex items-center justify-between">
                        <span>{area.city}</span>
                        <span className="text-xs bg-green-600 px-2 py-1 rounded-full">{area.time}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Contact */}
                <div>
                  <h3 className="text-white font-bold mb-4">24/7 Contact</h3>
                  <div className="space-y-3">
                    <motion.a 
                      href="tel:1300566166" 
                      className="flex items-center text-gray-300 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Phone className="h-4 w-4 mr-3 text-red-500" />
                      <span className="text-sm">1300 566 166</span>
                    </motion.a>
                    <motion.a 
                      href="mailto:emergency@disasterrecovery.com.au" 
                      className="flex items-center text-gray-300 hover:text-white transition-colors"
                      whileHover={{ scale: 1.05 }}
                    >
                      <Mail className="h-4 w-4 mr-3 text-red-500" />
                      <span className="text-sm">emergency@disasterrecovery.com.au</span>
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </GlassMorphismEffects.GlassMorphismCard>
        </footer>
      </div>
    </PerformanceOptimizer>
  );
}
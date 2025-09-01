'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Clock, Shield, Users, 
  Zap, Star, ChevronRight, Play, MessageSquare,
  Phone, Home, Building2, AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LightningEffect from '@/components/effects/LightningEffect';
import FloodingEffect from '@/components/effects/FloodingEffect';
import styles from './page.module.css';

export default function CleanLandingPage() {
  const [activeFeature, setActiveFeature] = useState(0);

  const features = [
    {
      title: "Instant Response",
      description: "24/7 emergency service with contractors arriving within hours",
      icon: Clock,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Insurance Approved",
      description: "Direct billing with all major insurance companies",
      icon: Shield,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Certified Network",
      description: "115,000+ vetted and certified restoration professionals",
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "AI Assessment",
      description: "Instant damage assessment and accurate quotes",
      icon: Zap,
      color: "from-orange-500 to-red-500"
    }
  ];

  const services = [
    {
      title: "Water Damage Restoration",
      description: "Category 1 clean water - Burst pipes, flooding, and water extraction",
      icon: "💧",
      image: "/images/optimized/damage/Cat 1 - Water Damage Restoration.png",
      urgent: true
    },
    {
      title: "Sewage Cleanup",
      description: "Category 3 black water - Professional sewage and contaminated water cleanup",
      icon: "🚰",
      image: "/images/optimized/damage/Cat 3 Water Damage - Sewage Clean up.png",
      urgent: true
    },
    {
      title: "Mould Remediation",
      description: "Black mould removal - Safe and thorough remediation with prevention",
      icon: "🦠",
      image: "/images/optimized/damage/Mould Remediation - Black Mould.png",
      urgent: false
    },
    {
      title: "Timber Floor Drying",
      description: "Specialized hardwood and timber floor drying and restoration",
      icon: "🪵",
      image: "/images/optimized/damage/Timber Floor Drying.png",
      urgent: true
    },
    {
      title: "Professional Carpet Cleaning",
      description: "Deep carpet and rug cleaning with advanced extraction methods",
      icon: "🧹",
      image: "/images/optimized/damage/Professional Carpet and Rug Cleaning.png",
      urgent: false
    }
  ];

  const testimonials = [
    {
      quote: "The response was incredible. Water damage at midnight, contractor on-site by 6AM.",
      author: "Sarah Mitchell",
      location: "Brisbane",
      rating: 5,
      service: "Water Damage"
    },
    {
      quote: "Insurance claim handled perfectly. No stress, just results.",
      author: "James Chen",
      location: "Sydney",
      rating: 5,
      service: "Fire Restoration"
    },
    {
      quote: "Professional, fast, and the price was exactly as quoted.",
      author: "Emma Wilson",
      location: "Melbourne",
      rating: 5,
      service: "Mould Removal"
    }
  ];

  const process = [
    {
      step: "1",
      title: "Report Damage",
      description: "Use our online form or chat 24/7"
    },
    {
      step: "2",
      title: "Instant Match",
      description: "AI connects you with the right contractor"
    },
    {
      step: "3",
      title: "Fast Response",
      description: "Certified professional arrives quickly"
    },
    {
      step: "4",
      title: "Full Restoration",
      description: "Property restored, insurance handled"
    }
  ];

  return (
    <div className="min-h-screen bg-white relative">
      {/* Severe Storm Background at 15% opacity - ENHANCED */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 1 }}>
        {/* Dark storm clouds gradient - increased visibility */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 opacity-[0.15]" />
        
        {/* Animated storm clouds with CSS classes */}
        <div className={`absolute inset-0 ${styles.stormClouds} opacity-[0.15]`} />
        
        {/* Thunder flash effect */}
        <div className={styles.thunderFlash} />
        
        {/* Rain effect pattern - enhanced visibility */}
        <div className={`absolute inset-0 ${styles.rainEffect} opacity-20`} />
        
        {/* Additional rain streaks */}
        <div className={`absolute inset-0 opacity-[0.15] ${styles.rainAnimation}`} style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='rain' x='0' y='0' width='100' height='100' patternUnits='userSpaceOnUse'%3E%3Cpath d='M0,20 Q5,40 0,60' stroke='%234a5568' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3Cpath d='M20,10 Q25,30 20,50' stroke='%234a5568' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3Cpath d='M40,25 Q45,45 40,65' stroke='%234a5568' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3Cpath d='M60,15 Q65,35 60,55' stroke='%234a5568' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3Cpath d='M80,30 Q85,50 80,70' stroke='%234a5568' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3C/pattern%3E%3C/defs%3E%3Crect fill='url(%23rain)' width='100%25' height='100%25'/%3E%3C/svg%3E")`
        }} />
        
        {/* Turbulent cloud texture */}
        <div className="absolute inset-0 opacity-15" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='turbulence'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='3' /%3E%3CfeColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.2 0 0 0 0.5 0'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23turbulence)'/%3E%3C/svg%3E")`
        }} />
      </div>
      
      {/* Lightning Effect */}
      <LightningEffect />
      
      {/* Hero Section - Clean and Focused */}
      <section className="relative bg-gradient-to-b from-slate-50/90 to-white/90 pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none" />
        
        <div className="container mx-auto px-4 md:px-6 relative">
          <div className="max-w-4xl mx-auto text-center">
            {/* Emergency Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-medium mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
              </span>
              Emergency Response Available 24/7
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6"
            >
              Property Disaster?
              <span className="block text-blue-600 mt-2">
                Help Arrives Fast.
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-lg sm:text-xl text-gray-600 mb-10 max-w-2xl mx-auto"
            >
              Australia's largest emergency restoration network. 
              115,000+ certified contractors ready to help, with insurance approval guaranteed.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center"
            >
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg">
                Get Emergency Help
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg">
                <MessageSquare className="mr-2 h-5 w-5" />
                Chat with AI Assistant
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-8 mt-12 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Insurance Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>No Call-Out Fees</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Fixed Price Quotes</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Clean Grid */}
      <section className="py-20 bg-white/90 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Why Choose Our Network
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              We connect you with the best restoration professionals in Australia
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer border-gray-200">
                  <CardContent className="p-6">
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${feature.color} mb-4`}>
                      <feature.icon className="h-6 w-6 text-white" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section - Simple and Clear */}
      <section className="py-20 bg-gray-50/90 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Emergency Services We Cover
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              Professional restoration for all types of property damage
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-6">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl overflow-hidden hover:shadow-lg transition-all cursor-pointer group"
              >
                {/* Service Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-100">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-6xl">
                      {service.icon}
                    </div>
                  )}
                  {service.urgent && (
                    <span className="absolute top-2 right-2 px-2 py-1 bg-red-600 text-white text-xs font-bold rounded-full">
                      URGENT
                    </span>
                  )}
                </div>
                
                {/* Service Content */}
                <div className="p-6">
                  <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {service.description}
                  </p>
                  <Link href="/contact" className="text-blue-600 font-medium inline-flex items-center hover:text-blue-700">
                    Get Help Now
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section - Visual Steps */}
      <section className="py-20 bg-white/90 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
              From disaster to restoration in 4 simple steps
            </p>
          </div>

          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8">
              {process.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="text-center"
                >
                  <div className="relative">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                      {item.step}
                    </div>
                    {index < process.length - 1 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gray-300 -translate-x-1/2" />
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600">
                    {item.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section - Social Proof */}
      <section className="py-20 bg-gray-50/90 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              What Our Clients Say
            </h2>
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-6 w-6 text-yellow-400 fill-current" />
              ))}
            </div>
            <p className="text-lg text-gray-600">
              4.9/5 from 10,000+ reviews
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="h-full">
                  <CardContent className="p-6">
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <p className="text-gray-700 mb-4 italic">
                      "{testimonial.quote}"
                    </p>
                    <div className="border-t pt-4">
                      <p className="font-semibold text-gray-900">
                        {testimonial.author}
                      </p>
                      <p className="text-sm text-gray-600">
                        {testimonial.location} • {testimonial.service}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section with Flooding Effect */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Property Emergency? We're Here 24/7
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get connected with certified restoration professionals in minutes. 
            Insurance approved. No call-out fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg">
              Get Immediate Help
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg">
              <Phone className="mr-2 h-5 w-5" />
              Chat Support 24/7
            </Button>
          </div>
        </div>
        
        {/* Flooding Effect at Bottom */}
        <FloodingEffect />
      </section>
    </div>
  );
}
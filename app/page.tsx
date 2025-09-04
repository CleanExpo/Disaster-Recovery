'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { 
  ArrowRight, CheckCircle, Clock, Shield, Users, 
  Zap, Star, ChevronRight, Play,
  Home, Building2, AlertTriangle, FileText, Phone
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import LightningEffect from '@/components/effects/LightningEffect';
import FloodingEffect from '@/components/effects/FloodingEffect';
import StormCloudBackground from '@/components/StormCloudBackground';
import EnhancedStormSystem from '@/components/EnhancedStormSystem';
import { InlineEEAT } from '@/components/eeat/InlineEEAT';
import { PricingGuidelines, ContractorPricingInfo } from '@/components/pricing/PricingGuidelines';
import { ComprehensiveSEO, EmergencyContactBar } from '@/components/seo/ComprehensiveSEO';
import { EnhancedChatBot } from '@/components/chat/EnhancedChatBot';
import { TransparencyHub } from '@/components/transparency/TransparencyHub';
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
    <>
      {/* SEO Enhancements */}
      <ComprehensiveSEO pageType="home" />
      
      {/* Emergency Contact Bar */}
      <EmergencyContactBar />
      
      {/* Enhanced Chat Bot */}
      <EnhancedChatBot />
      
      <div className="min-h-screen relative" style={{ backgroundColor: '#f8fafc', paddingTop: '40px' }}>
        {/* Storm Cloud Background Animation */}
        <StormCloudBackground />
      
      {/* Enhanced Storm System with Rain, Lightning, and Effects */}
      <EnhancedStormSystem />
      
      {/* Legacy storm background - can be removed if not needed */}
      <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -1 }}>
        {/* Dark storm clouds gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 opacity-[0.15]" />
        
        {/* Animated storm clouds */}
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-800 to-blue-900 animate-pulse" style={{ animationDuration: '8s' }} />
        </div>
        
        {/* Rain effect pattern */}
        <div className={`absolute inset-0 ${styles.rainAnimation} opacity-[0.15]`} />
        
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
                <FileText className="mr-2 h-5 w-5" />
                Submit Claim Online
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
                <span>Estimates Provided</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <span>Certified Network</span>
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

      {/* Contractor Portal Section */}
      <section className="py-20 bg-gradient-to-br from-indigo-50/90 to-blue-50/90 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
              Contractor Portal - Professional Certification Program
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Join Australia's premier disaster recovery network. Complete our comprehensive 14-day certification program and become an approved restoration contractor.
            </p>
          </div>

          {/* Course Topics Grid */}
          <div className="max-w-6xl mx-auto">
            <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Course Topics</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { day: "Day 1", title: "Insurance Fundamentals", topics: ["Claims Process", "Documentation", "Compliance"] },
                { day: "Day 2", title: "Water Damage Categories", topics: ["CAT 1-3 Water", "Assessment", "Mitigation"] },
                { day: "Day 3", title: "Drying & Moisture", topics: ["Psychrometry", "Equipment", "Monitoring"] },
                { day: "Day 4", title: "Mould Remediation", topics: ["Identification", "Containment", "Removal"] },
                { day: "Day 5", title: "Fire & Smoke", topics: ["Damage Types", "Restoration", "Deodorization"] },
                { day: "Day 6", title: "Biohazard Safety", topics: ["PPE", "Contamination", "Disposal"] },
                { day: "Day 7", title: "Structural Drying", topics: ["Materials", "Techniques", "Documentation"] },
                { day: "Day 8", title: "Commercial Projects", topics: ["Large Loss", "Coordination", "Timelines"] },
                { day: "Day 9", title: "Health & Safety", topics: ["WHS", "Risk Assessment", "Compliance"] },
                { day: "Day 10", title: "Customer Service", topics: ["Communication", "Expectations", "Resolution"] },
                { day: "Day 11", title: "Advanced Tech", topics: ["Thermal Imaging", "3D Scanning", "Software"] },
                { day: "Day 12", title: "Business Operations", topics: ["Estimating", "Project Management", "Quality"] },
                { day: "Day 13", title: "Emergency Response", topics: ["24/7 Operations", "Triage", "Mobilization"] },
                { day: "Day 14", title: "Final Assessment", topics: ["Certification Exam", "Practical Demo", "Approval"] }
              ].map((module, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-bold text-indigo-600">{module.day}</span>
                    <h4 className="text-sm font-semibold text-gray-900">{module.title}</h4>
                  </div>
                  <ul className="text-xs text-gray-600 space-y-1">
                    {module.topics.map((topic, i) => (
                      <li key={i} className="flex items-start">
                        <CheckCircle className="h-3 w-3 text-green-500 mr-1 mt-0.5 flex-shrink-0" />
                        {topic}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center mt-10">
              <Link href="/portal/training">
                <Button size="lg" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg">
                  Start Certification Program
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* YouTube Pitch Deck Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 relative">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              Learn More About Our Vision
            </h2>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto">
              Watch our comprehensive pitch deck to understand how we're revolutionizing disaster recovery in Australia
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="aspect-video bg-gray-800 rounded-xl overflow-hidden shadow-2xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/edEYKBN6Yl0?start=4&autoplay=0"
                title="Disaster Recovery Services Australia - Emergency Response"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <p className="text-gray-400 mb-4">
                Discover how we're building Australia's largest disaster recovery network
              </p>
              <div className="flex justify-center gap-4">
                <Link href="/pitch-deck">
                  <Button className="bg-[#FF0000] text-white hover:bg-[#CC0000] border-0 px-6 py-3">
                    <Play className="mr-2 h-4 w-4" />
                    View Full Presentation
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button className="bg-[#FF0000] text-white hover:bg-[#CC0000] border-0 px-6 py-3">
                    Get In Touch
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
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

      {/* Pricing Guidelines Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <ContractorPricingInfo />
          <div className="mt-8">
            <PricingGuidelines />
          </div>
        </div>
      </section>

      {/* Complete E-E-A-T Section */}
      <InlineEEAT />

      {/* Final CTA Section with Flooding Effect */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-700 relative overflow-hidden">
        <div className="container mx-auto px-4 md:px-6 text-center relative z-20">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-6">
            Property Emergency? We're Here 24/7
          </h2>
          <p className="text-lg sm:text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Get connected with certified restoration professionals in minutes. 
            Insurance approved. National pricing guidelines implemented.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100 px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg" asChild>
              <Link href="/book-service">
                Submit Emergency Claim
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg" asChild>
              <Link href="/services">
                View All Services
                <FileText className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
        
        {/* Flooding Effect at Bottom */}
        <FloodingEffect />
      </section>

      {/* Transparency Hub Section */}
      <TransparencyHub />
    </div>
    </>
  );
}
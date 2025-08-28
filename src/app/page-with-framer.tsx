'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { 
  Phone, Shield, Clock, CheckCircle, Zap, Star, Users, Award, 
  ArrowRight, MapPin, Droplets, Flame, Sparkles, CloudLightning,
  TrendingUp, ThumbsUp, Calendar, Building2
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useRef } from 'react'

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function HomePage() {
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,_theme(colors.blue.600/20%)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,_theme(colors.purple.600/20%)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_40%,_theme(colors.cyan.600/10%)_0%,transparent_50%)]" />
        </div>
        
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-cyan-400/20 rounded-full"
              animate={{
                x: [0, 100, -50, 0],
                y: [0, -100, 50, 0],
                scale: [1, 1.5, 0.8, 1],
                opacity: [0.2, 0.8, 0.3, 0.2]
              }}
              transition={{
                duration: 20 + i * 2,
                repeat: Infinity,
                ease: "linear"
              }}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <motion.div 
          style={{ y, opacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center"
        >
          {/* Emergency Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="inline-flex items-center gap-3 mb-8 px-8 py-4 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full backdrop-blur-md"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Zap className="w-6 h-6 text-red-400" />
            </motion.div>
            <span className="text-red-400 font-bold text-lg">24/7 Emergency Response Team</span>
            <motion.div
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-3 h-3 bg-red-400 rounded-full"
            />
          </motion.div>

          {/* Main Heading */}
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-12 leading-tight"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 1, ease: [0.6, -0.05, 0.01, 0.99] }}
          >
            <span className="block text-white drop-shadow-2xl">Australia's #1</span>
            <motion.span 
              className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent"
              animate={{ 
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            >
              Disaster Recovery
            </motion.span>
            <span className="block text-white drop-shadow-2xl">Specialists</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-2xl md:text-3xl text-gray-200 mb-16 max-w-5xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Premium restoration services with guaranteed{' '}
            <motion.span 
              className="text-cyan-400 font-bold"
              animate={{ 
                textShadow: [
                  '0 0 10px rgba(34, 211, 238, 0.5)',
                  '0 0 20px rgba(34, 211, 238, 0.8)',
                  '0 0 10px rgba(34, 211, 238, 0.5)'
                ]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              60-minute response
            </motion.span>{' '}
            across all major Australian cities
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row gap-8 justify-center mb-20"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <Button 
              variant="emergency" 
              size="xl" 
              className="group relative overflow-hidden"
            >
              <Phone className="w-7 h-7" />
              <span className="text-xl font-bold">1-800-DISASTER</span>
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 opacity-0 group-hover:opacity-20"
                animate={{ x: [-100, 100] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
              />
            </Button>
            
            <Button variant="glass" size="xl">
              <span className="text-xl">Get Instant Quote</span>
              <ArrowRight className="w-7 h-7" />
            </Button>
          </motion.div>

          {/* Trust Indicators */}
          <motion.div 
            className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            variants={stagger}
            initial="initial"
            animate="animate"
          >
            {[
              { icon: Clock, text: '60-Min Response', subtext: 'Guaranteed Australia-wide', color: 'text-emerald-400' },
              { icon: Shield, text: 'Fully Certified', subtext: 'IICRC & Industry Standards', color: 'text-blue-400' },
              { icon: CheckCircle, text: 'Insurance Partner', subtext: 'Direct billing available', color: 'text-purple-400' }
            ].map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card glass className="border-white/10 bg-white/5 backdrop-blur-xl p-8 hover:bg-white/10">
                  <CardContent className="text-center">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <item.icon className={`w-12 h-12 mx-auto mb-4 ${item.color} drop-shadow-lg`} />
                    </motion.div>
                    <h3 className="text-white font-bold text-xl mb-2">{item.text}</h3>
                    <p className="text-gray-300 text-sm">{item.subtext}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <motion.div
              className="w-1 h-3 bg-white/60 rounded-full mt-2"
              animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* Services Section */}
      <section className="py-32 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="secondary" className="mb-6 px-6 py-2 text-lg">
              Premium Services
            </Badge>
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Elite Recovery Solutions
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Industry-leading restoration with cutting-edge technology and master-certified technicians
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              {
                title: 'Water Damage',
                description: 'Advanced extraction, thermal imaging, and molecular-level drying',
                icon: Droplets,
                gradient: 'from-blue-500 to-cyan-500',
                features: ['Thermal Imaging', 'Moisture Mapping', 'Antimicrobial Treatment']
              },
              {
                title: 'Fire Recovery',
                description: 'Complete restoration from fire, smoke, and structural damage',
                icon: Flame,
                gradient: 'from-red-500 to-orange-500',
                features: ['Ozone Treatment', 'Content Restoration', 'Structural Rebuild']
              },
              {
                title: 'Mold Remediation',
                description: 'Safe removal with air quality restoration and prevention',
                icon: Sparkles,
                gradient: 'from-green-500 to-emerald-500',
                features: ['HEPA Filtration', 'Containment Systems', 'Prevention Protocols']
              },
              {
                title: 'Storm Recovery',
                description: 'Emergency response for severe weather and natural disasters',
                icon: CloudLightning,
                gradient: 'from-purple-500 to-indigo-500',
                features: ['Emergency Boarding', 'Roof Systems', 'Debris Management']
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card 
                  glass 
                  className="h-full bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10 hover:scale-105 transition-all duration-500"
                >
                  <CardHeader>
                    <motion.div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center mb-6`}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <service.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <CardTitle className="text-2xl text-white mb-4">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-6 leading-relaxed">{service.description}</p>
                    <ul className="space-y-3">
                      {service.features.map((feature, i) => (
                        <li key={i} className="flex items-center gap-3">
                          <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${service.gradient}`} />
                          <span className="text-gray-400 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-32 bg-gradient-to-r from-slate-950 to-blue-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_theme(colors.blue.600/10%)_0%,transparent_70%)]" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Industry Leadership
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto">
              Two decades of excellence in disaster recovery across Australia
            </p>
          </motion.div>

          <motion.div 
            className="grid md:grid-cols-4 gap-8"
            variants={stagger}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
          >
            {[
              { number: '25,000+', label: 'Properties Restored', icon: Building2, color: 'text-blue-400' },
              { number: '<60min', label: 'Average Response', icon: Clock, color: 'text-emerald-400' },
              { number: '99.8%', label: 'Client Satisfaction', icon: ThumbsUp, color: 'text-purple-400' },
              { number: '20+', label: 'Years Excellence', icon: Award, color: 'text-orange-400' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group"
              >
                <Card glass className="text-center p-10 bg-white/5 border-white/10 backdrop-blur-xl hover:bg-white/10">
                  <CardContent>
                    <motion.div
                      whileHover={{ scale: 1.2, rotate: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <stat.icon className={`w-16 h-16 mx-auto mb-6 ${stat.color} drop-shadow-lg`} />
                    </motion.div>
                    <motion.div 
                      className={`text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent`}
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 * index, duration: 0.8, type: "spring", stiffness: 200 }}
                    >
                      {stat.number}
                    </motion.div>
                    <p className="text-gray-300 text-lg font-medium">{stat.label}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_70%,_theme(colors.red.600/20%)_0%,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,_theme(colors.orange.600/20%)_0%,transparent_50%)]" />
        </div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Badge variant="outline" className="mb-8 px-8 py-3 text-lg border-red-500/30 text-red-400">
              Emergency Response
            </Badge>
            
            <h2 className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight">
              Every Second Counts
            </h2>
            
            <p className="text-2xl text-gray-200 mb-16 leading-relaxed max-w-3xl mx-auto">
              When disaster strikes, you need immediate professional response. Our certified experts are standing by 24/7.
            </p>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button 
                variant="emergency" 
                size="xl" 
                className="text-2xl px-16 py-8 shadow-2xl shadow-red-500/25 relative overflow-hidden group"
              >
                <Phone className="w-8 h-8 mr-4" />
                <span className="relative z-10">Call Now: 1-800-DISASTER</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-red-400 to-orange-400 opacity-0 group-hover:opacity-30"
                  animate={{
                    background: [
                      'linear-gradient(45deg, #ef4444, #f97316)',
                      'linear-gradient(45deg, #f97316, #ef4444)',
                      'linear-gradient(45deg, #ef4444, #f97316)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </Button>
            </motion.div>

            <motion.div 
              className="mt-16 flex flex-wrap justify-center items-center gap-12 text-gray-300"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              {[
                { icon: MapPin, text: 'Australia-Wide Coverage' },
                { icon: Shield, text: 'Fully Licensed & Insured' },
                { icon: Star, text: 'Premium Service Guarantee' }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <item.icon className="w-6 h-6 text-cyan-400" />
                  <span className="text-lg font-medium">{item.text}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
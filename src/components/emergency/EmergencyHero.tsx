'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight, Shield, Clock, Users, DollarSign } from 'lucide-react'

export default function EmergencyHero() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-red-600 via-blue-700 to-red-700 text-white">
      {/* Crisis Badge */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20"
      >
        <div className="bg-blue-500 text-black px-4 py-2 rounded-full font-bold text-sm md:text-base flex items-center gap-2 shadow-lg">
          <span className="animate-pulse">⚡</span>
          EMERGENCY RESPONSE ACTIVE 24/7
          <span className="animate-pulse">⚡</span>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-20 md:py-32">
        {/* Main Headline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center max-w-5xl mx-auto"
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
            Property Disaster?
            <span className="block text-blue-500 mt-2">
              Help Arrives in 60 Minutes
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 opacity-95">
            Australia's largest emergency restoration network with 115,000+ certified contractors ready now
          </p>
        </motion.div>

        {/* Trust Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-12"
        >
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Users className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">115,000+</div>
            <div className="text-sm opacity-90">Contractors</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Shield className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">100%</div>
            <div className="text-sm opacity-90">Insurance Approved</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <DollarSign className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">$4.2B</div>
            <div className="text-sm opacity-90">Properties Restored</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="h-6 w-6 text-blue-500" />
            </div>
            <div className="text-2xl font-bold">24/7/365</div>
            <div className="text-sm opacity-90">Always Available</div>
          </div>
        </motion.div>

        {/* Action Zone */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 bg-blue-500 text-black px-8 py-5 rounded-full text-xl font-bold hover:bg-yellow-300 transition-all transform hover:scale-105 shadow-2xl animate-pulse"
          >
            GET IMMEDIATE HELP
            <ArrowRight className="h-6 w-6" />
          </Link>
          
          <div className="mt-4 text-lg opacity-90">
            Average response time: <span className="font-bold text-blue-500">47 minutes</span>
          </div>
        </motion.div>

        {/* Live Activity Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
            <span className="h-2 w-2 bg-emerald-500 rounded-full animate-ping"></span>
            <span className="text-sm">
              <span className="font-bold">2,847</span> active emergency responses right now
            </span>
          </div>
        </motion.div>
      </div>

      {/* Background Animation */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/50"></div>
      </div>
    </section>
  )
}
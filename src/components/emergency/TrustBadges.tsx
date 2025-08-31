'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Shield, Award, FileCheck, BadgeCheck, Briefcase } from 'lucide-react'

export default function TrustBadges() {
  const certifications = [
    { 
      icon: Shield,
      name: 'IICRC Certified',
      description: 'International Certification'
    },
    { 
      icon: Award,
      name: 'RIA Member',
      description: 'Restoration Industry Association'
    },
    { 
      icon: FileCheck,
      name: 'All Insurers Approved',
      description: 'Preferred Partner Status'
    },
    { 
      icon: Briefcase,
      name: 'Government Contractor',
      description: 'Approved Supplier'
    },
    { 
      icon: BadgeCheck,
      name: 'WHS Compliant',
      description: 'Safety Certified'
    }
  ]

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Certified, Insured, Guaranteed
          </h2>
          <p className="text-xl text-gray-600">
            Trusted by insurance companies, government agencies, and property owners nationwide
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 mb-12">
          {certifications.map((cert, index) => {
            const Icon = cert.icon
            return (
              <motion.div
                key={cert.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="bg-blue-100 p-4 rounded-full">
                    <Icon className="h-8 w-8 text-blue-600" />
                  </div>
                </div>
                <h3 className="font-bold text-lg mb-1">{cert.name}</h3>
                <p className="text-sm text-gray-600">{cert.description}</p>
              </motion.div>
            )
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-8 text-center shadow-2xl"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Shield className="h-10 w-10" />
            <h3 className="text-2xl font-bold">100% Satisfaction Guarantee</h3>
          </div>
          <p className="text-lg mb-6">
            We guarantee our work or your money back. Every restoration is backed by our comprehensive warranty.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-bold mb-1">Full Warranty</div>
              <div>12-month guarantee on all work</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-bold mb-1">Insurance Backed</div>
              <div>$20M public liability coverage</div>
            </div>
            <div className="bg-white/10 rounded-lg p-3">
              <div className="font-bold mb-1">Money Back</div>
              <div>100% refund if not satisfied</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
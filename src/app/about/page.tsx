'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheckIcon,
  UserGroupIcon,
  ClockIcon,
  TrophyIcon,
  ChartBarIcon,
  SparklesIcon,
  CheckBadgeIcon,
  StarIcon
} from '@heroicons/react/24/outline';

export default function ModernAboutPage() {
  const stats = [
    { number: '15+', label: 'Years Experience', icon: <ClockIcon className="w-6 h-6" /> },
    { number: '10K+', label: 'Projects Completed', icon: <ChartBarIcon className="w-6 h-6" /> },
    { number: '98%', label: 'Client Satisfaction', icon: <StarIcon className="w-6 h-6" /> },
    { number: '24/7', label: 'Emergency Support', icon: <ShieldCheckIcon className="w-6 h-6" /> }
  ];

  const values = [
    {
      title: 'Rapid Response',
      description: 'We understand that time is critical in disaster recovery. Our teams are ready 24/7.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Professional Excellence',
      description: 'IICRC certified technicians with continuous training and the latest equipment.',
      color: 'from-purple-500 to-indigo-500'
    },
    {
      title: 'Compassionate Service',
      description: 'We treat every client with empathy and respect during difficult times.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Transparent Process',
      description: 'Clear communication, honest pricing, and detailed documentation throughout.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const certifications = [
    { name: 'IICRC', desc: 'Institute of Inspection Cleaning and Restoration' },
    { name: 'RIA', desc: 'Restoration Industry Association' },
    { name: 'EPA', desc: 'Environmental Protection Agency Certified' },
    { name: 'OSHA', desc: 'Occupational Safety and Health Administration' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0 opacity-20"
          animate={{
            background: [
              'radial-gradient(circle at 30% 20%, rgba(59, 130, 246, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 70% 80%, rgba(168, 85, 247, 0.3) 0%, transparent 50%)',
              'radial-gradient(circle at 20% 60%, rgba(34, 197, 94, 0.3) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 20, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <SparklesIcon className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Trusted Since 2008</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-purple-100 to-indigo-100 bg-clip-text text-transparent">
                About Disaster
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Recovery Pro
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Australia's premier disaster recovery specialists, combining advanced technology 
              with compassionate service to restore properties and peace of mind.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="relative z-10 px-6 py-20 border-y border-gray-800">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-gradient-to-r from-purple-500/20 to-indigo-500/20 border border-purple-500/30">
                  {stat.icon}
                </div>
                <motion.div
                  className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, delay: i * 0.2, repeat: Infinity }}
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Our Story
                </span>
              </h2>
              <div className="space-y-4 text-gray-300">
                <p>
                  Founded in 2008, Disaster Recovery Pro emerged from a simple mission: 
                  to provide rapid, professional disaster recovery services when people need them most.
                </p>
                <p>
                  What started as a small team of dedicated restoration specialists has grown into 
                  Australia's most trusted disaster recovery network, serving thousands of homes and 
                  businesses across the nation.
                </p>
                <p>
                  Our success is built on a foundation of technical excellence, continuous innovation, 
                  and an unwavering commitment to our clients during their most challenging times.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-video bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-2xl border border-purple-500/30 flex items-center justify-center">
                <UserGroupIcon className="w-32 h-32 text-purple-400/50" />
              </div>
              <motion.div
                className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl p-4 shadow-xl"
                animate={{ rotate: [0, 5, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <CheckBadgeIcon className="w-8 h-8 text-white" />
                <p className="text-xs font-semibold mt-1">Certified Team</p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative z-10 px-6 py-20 bg-gradient-to-b from-transparent via-gray-900/50 to-transparent">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Our Core Values
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="relative group"
                whileHover={{ y: -5 }}
              >
                <div className={`absolute inset-0 bg-gradient-to-r ${value.color} rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-all`} />
                <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
                  <div className={`w-2 h-2 bg-gradient-to-r ${value.color} rounded-full mb-4`} />
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-gray-400 text-sm">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Certifications & Accreditations
              </span>
            </h2>
            <p className="text-gray-400 text-lg">
              Industry-recognized certifications ensuring the highest standards
            </p>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 border border-purple-500/30 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all"
                whileHover={{ y: -5 }}
              >
                <TrophyIcon className="w-12 h-12 text-purple-400 mx-auto mb-3" />
                <h3 className="text-xl font-bold mb-1">{cert.name}</h3>
                <p className="text-gray-400 text-xs">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="relative z-10 px-6 py-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold mb-4">
              <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Our Expert Team
              </span>
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Highly trained professionals dedicated to restoring your property and peace of mind
            </p>
          </motion.div>

          <div className="bg-gradient-to-r from-purple-500/20 to-indigo-500/20 rounded-3xl p-12 border border-purple-500/30 text-center">
            <UserGroupIcon className="w-24 h-24 text-purple-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold mb-4">150+ Certified Professionals</h3>
            <p className="text-gray-300 max-w-2xl mx-auto mb-8">
              Our team includes IICRC-certified restoration specialists, project managers, 
              insurance coordinators, and customer support professionals all working together 
              to provide seamless disaster recovery services.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-3 rounded-full font-semibold"
            >
              Join Our Team
            </motion.button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
              Experience the Difference
            </span>
          </h2>
          
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of satisfied clients who trust us with their disaster recovery needs
          </p>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl"
          >
            Get Started Today
          </motion.button>
        </motion.div>
      </section>
    </div>
  );
}

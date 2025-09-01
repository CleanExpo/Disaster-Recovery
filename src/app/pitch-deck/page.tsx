'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  DollarSign, 
  Users, 
  Globe,
  Zap,
  Target,
  Award,
  ChartBar,
  Brain,
  Rocket,
  Shield,
  ArrowRight,
  Download,
  Play
} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function PitchDeckPage() {
  const [activeSlide, setActiveSlide] = useState(0)

  const metrics = [
    { label: 'Market Size', value: '$1B+', description: 'Australian disaster recovery market' },
    { label: 'Growth Rate', value: '15%', description: 'Annual market growth' },
    { label: 'Target Share', value: '20%', description: 'In 18 months' },
    { label: 'Valuation Target', value: '$20M', description: 'Conservative estimate' }
  ]

  const milestones = [
    { quarter: 'Q1 2024', target: '100 contractors', revenue: '$500K/mo', achieved: true },
    { quarter: 'Q2 2024', target: '1,000 contractors', revenue: '$2M/mo', achieved: false },
    { quarter: 'Q3 2024', target: '5,000 contractors', revenue: '$5M/mo', achieved: false },
    { quarter: 'Q4 2024', target: '10,000 contractors', revenue: '$10M/mo', achieved: false }
  ]

  const competitiveAdvantages = [
    {
      icon: Brain,
      title: 'HRM AI Technology',
      description: '27M parameter brain-inspired AI providing instant assessments'
    },
    {
      icon: Zap,
      title: 'Network Effects',
      description: 'Each contractor and claim makes the platform exponentially stronger'
    },
    {
      icon: Shield,
      title: 'Insurance Integration',
      description: 'Direct API connections with major insurance providers'
    },
    {
      icon: Globe,
      title: 'National Coverage',
      description: 'Complete Australian market with Pacific expansion ready'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 pt-20">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20" />
        <div className="container mx-auto px-4 py-16 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/20 rounded-full mb-6 backdrop-blur-sm">
              <Rocket className="h-5 w-5 text-blue-300" />
              <span className="text-blue-200 font-medium">Investment Opportunity</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
              Disaster Recovery
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                Reimagined with AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Transforming a $1B Australian market with HRM-powered AI orchestration,
              creating an unstoppable platform positioned for 10x growth.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/pitch-deck/investor"
                className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
              >
                <Play className="h-5 w-5" />
                View Full Presentation
              </Link>
              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                <Download className="h-5 w-5" />
                Download Deck (PDF)
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {metrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            >
              <div className="text-4xl font-bold text-white mb-2">{metric.value}</div>
              <div className="text-lg font-semibold text-blue-300">{metric.label}</div>
              <div className="text-sm text-gray-400 mt-1">{metric.description}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* The Problem & Solution */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-red-950/30 backdrop-blur-sm rounded-2xl p-8 border border-red-600/30"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Target className="h-8 w-8 text-red-400" />
              The Problem
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">•</span>
                <span>Disaster recovery is slow, inefficient, and frustrating for property owners</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">•</span>
                <span>Insurance claims take weeks to process with high rejection rates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">•</span>
                <span>Contractors struggle to find consistent, quality jobs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-400 mt-1">•</span>
                <span>No unified platform connecting all stakeholders efficiently</span>
              </li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-green-900/20 backdrop-blur-sm rounded-2xl p-8 border border-green-500/30"
          >
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Zap className="h-8 w-8 text-emerald-600" />
              Our Solution
            </h2>
            <ul className="space-y-4 text-gray-300">
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <span>HRM AI provides instant, accurate damage assessments in under 100ms</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <span>Automated insurance approval with 95% success rate</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <span>Intelligent job matching connecting contractors instantly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-emerald-600 mt-1">✓</span>
                <span>Complete ecosystem with network effects and data moat</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Competitive Advantages */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-white mb-4">Competitive Advantages</h2>
          <p className="text-xl text-gray-300">Why we'll dominate the market</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {competitiveAdvantages.map((advantage, index) => (
            <motion.div
              key={advantage.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/15 transition-all"
            >
              <advantage.icon className="h-12 w-12 text-blue-400 mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">{advantage.title}</h3>
              <p className="text-gray-400">{advantage.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Growth Trajectory */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
        >
          <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
            <ChartBar className="h-8 w-8 text-purple-400" />
            Growth Trajectory
          </h2>
          
          <div className="space-y-6">
            {milestones.map((milestone, index) => (
              <div key={milestone.quarter} className="flex items-center gap-6">
                <div className="w-24 text-right">
                  <div className="text-white font-semibold">{milestone.quarter}</div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-300">{milestone.target}</span>
                    <span className="text-emerald-600 font-semibold">{milestone.revenue}</span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-3">
                    <motion.div 
                      className={`h-3 rounded-full ${
                        milestone.achieved ? 'bg-green-500' : 'bg-blue-500'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: milestone.achieved ? '100%' : `${(index + 1) * 25}%` }}
                      transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-purple-900/30 rounded-xl border border-purple-500/30">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-white">18-Month Target</div>
                <div className="text-gray-400">From $2.5M to $20M valuation</div>
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-emerald-600">8x</div>
                <div className="text-gray-400">Growth Multiple</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Call to Action */}
      <div className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-2xl p-12 backdrop-blur-sm border border-white/20"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Join Us in Revolutionizing Disaster Recovery
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            We're raising $5M to accelerate growth and capture 20% market share.
            With our HRM AI technology and proven traction, this is your opportunity
            to invest in the future of disaster recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/pitch-deck/investor"
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-blue-600 text-white rounded-lg font-semibold hover:shadow-xl transform hover:scale-105 transition-all flex items-center justify-center gap-2"
            >
              Schedule Investment Discussion
              <ArrowRight className="h-5 w-5" />
            </Link>
            <Link 
              href="/pitch-deck/financials"
              className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-lg font-semibold border border-white/20 hover:bg-white/20 transition-all"
            >
              View Financial Projections
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
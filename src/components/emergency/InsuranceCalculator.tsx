'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Calculator, Shield, DollarSign, CheckCircle, Info, ArrowRight } from 'lucide-react'

export default function InsuranceCalculator() {
  const [damageType, setDamageType] = useState('')
  const [propertyType, setPropertyType] = useState('')
  const [coverage, setCoverage] = useState<any>(null)

  const coverageData: any = {
    'water-burst': {
      residential: { 
        covered: '90-100%', 
        amount: '$15,000 - $150,000',
        excess: '$500 - $1,000',
        notes: 'Sudden water damage typically covered'
      },
      commercial: { 
        covered: '85-95%', 
        amount: '$50,000 - $500,000',
        excess: '$2,500 - $10,000',
        notes: 'Business interruption may be included'
      }
    },
    'fire-kitchen': {
      residential: { 
        covered: '95-100%', 
        amount: '$20,000 - $200,000',
        excess: '$500 - $1,000',
        notes: 'Fire damage comprehensively covered'
      },
      commercial: { 
        covered: '90-100%', 
        amount: '$100,000 - $1,000,000',
        excess: '$5,000 - $25,000',
        notes: 'Contents and structure covered'
      }
    },
    'storm-roof': {
      residential: { 
        covered: '80-90%', 
        amount: '$10,000 - $100,000',
        excess: '$1,000 - $2,500',
        notes: 'Storm damage subject to conditions'
      },
      commercial: { 
        covered: '75-85%', 
        amount: '$50,000 - $750,000',
        excess: '$5,000 - $20,000',
        notes: 'May require specific storm coverage'
      }
    },
    'flood-natural': {
      residential: { 
        covered: '0-80%', 
        amount: '$0 - $100,000',
        excess: '$2,500 - $5,000',
        notes: 'Depends on flood coverage inclusion'
      },
      commercial: { 
        covered: '0-70%', 
        amount: '$0 - $500,000',
        excess: '$10,000 - $50,000',
        notes: 'Often requires separate flood policy'
      }
    },
    'mould-growth': {
      residential: { 
        covered: '40-60%', 
        amount: '$5,000 - $50,000',
        excess: '$1,000 - $2,500',
        notes: 'Coverage varies significantly'
      },
      commercial: { 
        covered: '30-50%', 
        amount: '$10,000 - $100,000',
        excess: '$5,000 - $15,000',
        notes: 'May require proof of sudden damage'
      }
    }
  }

  const calculateCoverage = () => {
    if (damageType && propertyType) {
      setCoverage(coverageData[damageType]?.[propertyType] || null)
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-blue-900 to-blue-800">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-white/10 p-4 rounded-full">
                <Calculator className="h-12 w-12 text-yellow-400" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Insurance Coverage Calculator
            </h2>
            <p className="text-xl text-blue-200">
              Check your estimated insurance coverage instantly
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            {/* Damage Type Selection */}
            <div className="mb-6">
              <label className="block text-white font-bold mb-3">
                What type of damage occurred?
              </label>
              <select
                value={damageType}
                onChange={(e) => setDamageType(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-yellow-400 focus:outline-none"
              >
                <option value="">Select damage type...</option>
                <option value="water-burst">Water Damage - Burst Pipe</option>
                <option value="fire-kitchen">Fire Damage - Kitchen Fire</option>
                <option value="storm-roof">Storm Damage - Roof Damage</option>
                <option value="flood-natural">Flood Damage - Natural Disaster</option>
                <option value="mould-growth">Mould Growth - Water Damage</option>
              </select>
            </div>

            {/* Property Type Selection */}
            <div className="mb-6">
              <label className="block text-white font-bold mb-3">
                Property type?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => setPropertyType('residential')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    propertyType === 'residential'
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  Residential
                </button>
                <button
                  onClick={() => setPropertyType('commercial')}
                  className={`px-6 py-3 rounded-lg font-bold transition-all ${
                    propertyType === 'commercial'
                      ? 'bg-yellow-400 text-black'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  Commercial
                </button>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={calculateCoverage}
              disabled={!damageType || !propertyType}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate Coverage
            </button>

            {/* Coverage Results */}
            {coverage && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 bg-black/30 rounded-xl p-6"
              >
                <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-green-400" />
                  Your Estimated Coverage
                </h3>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="h-5 w-5 text-green-400" />
                      <span className="text-white/80">Typically Covered</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {coverage.covered}
                    </div>
                  </div>

                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <DollarSign className="h-5 w-5 text-yellow-400" />
                      <span className="text-white/80">Coverage Range</span>
                    </div>
                    <div className="text-2xl font-bold text-white">
                      {coverage.amount}
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-400/20 border border-yellow-400/40 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <Info className="h-5 w-5 text-yellow-400 mt-0.5" />
                    <div>
                      <div className="text-white font-bold mb-1">Important Note</div>
                      <div className="text-white/80 text-sm">{coverage.notes}</div>
                      <div className="text-white/80 text-sm mt-1">
                        Excess typically: <span className="font-bold">{coverage.excess}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-green-600 rounded-lg p-6 text-center">
                  <h4 className="text-xl font-bold text-white mb-2">
                    We Handle All Insurance Paperwork
                  </h4>
                  <p className="text-white/90 mb-4">
                    Our team manages your entire claim process from start to finish
                  </p>
                  <button className="bg-white text-green-600 px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform inline-flex items-center gap-2">
                    Get Free Assessment
                    <ArrowRight className="h-5 w-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Trust Message */}
            <div className="mt-6 text-center text-white/80">
              <p className="text-sm">
                * Estimates based on typical Australian insurance policies. 
                Actual coverage varies by insurer and policy terms.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
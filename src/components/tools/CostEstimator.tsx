'use client'

import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calculator, DollarSign, Shield, Clock, ArrowRight, Building2, Home, AlertTriangle, Zap, CalendarClock } from 'lucide-react'
import Link from 'next/link'

/* -------------------------------------------------------------------------- */
/* Data                                                                        */
/* -------------------------------------------------------------------------- */

const PRICE_RANGES: Record<string, { small: [number, number]; medium: [number, number]; large: [number, number] }> = {
  'water-damage':      { small: [2500, 5000],   medium: [5000, 15000],  large: [15000, 50000] },
  'fire-damage':       { small: [5000, 10000],  medium: [10000, 35000], large: [35000, 100000] },
  'mould-removal':     { small: [1500, 4000],   medium: [4000, 12000],  large: [12000, 30000] },
  'flood-restoration': { small: [3000, 7000],   medium: [7000, 20000],  large: [20000, 60000] },
  'storm-damage':      { small: [2000, 6000],   medium: [6000, 18000],  large: [18000, 45000] },
  'sewage':            { small: [3000, 8000],   medium: [8000, 20000],  large: [20000, 50000] },
  'biohazard':         { small: [3000, 15000],  medium: [5000, 25000],  large: [8000, 40000] },
}

const COST_FACTORS: Record<string, string[]> = {
  'water-damage': [
    'Category of water (clean, grey, or black water)',
    'Duration of water exposure before remediation begins',
    'Type of materials affected (carpet, hardwood, plasterboard)',
    'Whether structural drying or demolition is required',
  ],
  'fire-damage': [
    'Extent of fire, smoke, and soot damage',
    'Structural integrity and demolition requirements',
    'Smoke odour penetration into materials',
    'Hazardous materials (asbestos) requiring specialist removal',
  ],
  'mould-removal': [
    'Species of mould (some require specialist protocols)',
    'Accessibility of affected areas (wall cavities, roof spaces)',
    'Underlying moisture source identification and repair',
    'Air quality testing and clearance requirements',
  ],
  'flood-restoration': [
    'Contamination level of floodwater (Category 1\u20133)',
    'Depth and duration of water inundation',
    'Structural damage to foundations, walls, and flooring',
    'Electrical, plumbing, and HVAC system damage',
  ],
  'storm-damage': [
    'Type of storm damage (wind, hail, rain ingress, debris)',
    'Roof and structural integrity assessment results',
    'Emergency board-up and tarping requirements',
    'Tree or debris removal from the property',
  ],
  'sewage': [
    'Volume and category of sewage contamination',
    'Whether contamination has reached porous materials',
    'Decontamination and antimicrobial treatment scope',
    'Disposal requirements for contaminated materials',
  ],
  'biohazard': [
    'Type and severity of biohazard contamination',
    'PPE and specialist containment requirements',
    'Regulatory compliance and clearance testing',
    'Scope of material removal and decontamination',
  ],
}

const INSURANCE_DATA: Record<string, { likelihood: string; excess: string; note: string }> = {
  'water-damage':      { likelihood: '90\u2013100%', excess: '$500 \u2013 $1,000', note: 'Sudden water damage typically fully covered' },
  'fire-damage':       { likelihood: '95\u2013100%', excess: '$500 \u2013 $1,000', note: 'Fire damage comprehensively covered by most policies' },
  'mould-removal':     { likelihood: '40\u201360%',  excess: '$1,000 \u2013 $2,500', note: 'Coverage varies \u2014 must prove sudden cause, not gradual neglect' },
  'flood-restoration': { likelihood: '0\u201380%',   excess: '$2,500 \u2013 $5,000', note: 'Depends on flood cover inclusion in your policy (check PDS)' },
  'storm-damage':      { likelihood: '80\u201390%',  excess: '$1,000 \u2013 $2,500', note: 'Storm damage covered, but check flood vs storm definition' },
  'sewage':            { likelihood: '85\u201395%',  excess: '$500 \u2013 $1,500', note: 'Sudden sewage events typically covered under water damage' },
  'biohazard':         { likelihood: '70\u201390%',  excess: '$1,000 \u2013 $2,500', note: 'Most policies cover sudden biohazard events' },
}

const DAMAGE_TYPES = [
  { value: 'water-damage',      label: 'Water Damage' },
  { value: 'fire-damage',       label: 'Fire & Smoke' },
  { value: 'mould-removal',     label: 'Mould' },
  { value: 'flood-restoration', label: 'Flood' },
  { value: 'storm-damage',      label: 'Storm' },
  { value: 'sewage',            label: 'Sewage' },
  { value: 'biohazard',         label: 'Biohazard' },
]

const RESPONSE_TIMES: Record<string, string> = {
  emergency: 'Within 2 hours',
  urgent: 'Within 24 hours',
  scheduled: 'Within 3\u20135 business days',
}

/* -------------------------------------------------------------------------- */
/* Calculation                                                                 */
/* -------------------------------------------------------------------------- */

function getSizeTier(area: number): 'small' | 'medium' | 'large' {
  if (area <= 30) return 'small'
  if (area <= 100) return 'medium'
  return 'large'
}

function getAreaMultiplier(area: number): number {
  if (area <= 30) return 1.0
  if (area <= 60) return 1.3
  if (area <= 100) return 1.6
  if (area <= 200) return 2.0
  return 2.5
}

function getUrgencyMultiplier(urgency: string): number {
  if (urgency === 'emergency') return 1.15
  if (urgency === 'scheduled') return 0.9
  return 1.0
}

function calculateEstimate(damageType: string, propertyType: string, area: number, urgency: string) {
  const prices = PRICE_RANGES[damageType]
  if (!prices) return null

  const tier = getSizeTier(area)
  const [baseLow, baseHigh] = prices[tier]
  const areaMultiplier = getAreaMultiplier(area)
  const urgencyMultiplier = getUrgencyMultiplier(urgency)
  const commercialMultiplier = propertyType === 'commercial' ? 1.4 : 1.0

  const low = Math.round(baseLow * areaMultiplier * urgencyMultiplier * commercialMultiplier / 100) * 100
  const high = Math.round(baseHigh * areaMultiplier * urgencyMultiplier * commercialMultiplier / 100) * 100

  return { low, high }
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(amount)
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

export default function CostEstimator() {
  const [damageType, setDamageType] = useState('')
  const [propertyType, setPropertyType] = useState('residential')
  const [area, setArea] = useState(30)
  const [urgency, setUrgency] = useState('urgent')
  const [result, setResult] = useState<{ low: number; high: number } | null>(null)
  const [showResult, setShowResult] = useState(false)

  const handleCalculate = useCallback(() => {
    if (!damageType) return
    const estimate = calculateEstimate(damageType, propertyType, area, urgency)
    setResult(estimate)
    setShowResult(true)
  }, [damageType, propertyType, area, urgency])

  const insurance = damageType ? INSURANCE_DATA[damageType] : null
  const factors = damageType ? COST_FACTORS[damageType] : null

  return (
    <section className="py-16 bg-gradient-to-br from-[#0F2942] via-[#1A4674] to-[#0F2942]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="bg-white/10 p-4 rounded-full">
                <Calculator className="h-12 w-12 text-blue-400" />
              </div>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Emergency Cost Estimator
            </h2>
            <p className="text-xl text-blue-200">
              Get an instant estimate based on real Australian restoration data
            </p>
          </div>

          {/* Form Card */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20">
            {/* Damage Type */}
            <div className="mb-8">
              <label className="block text-white font-bold mb-3 text-lg">
                What type of damage occurred?
              </label>
              <select
                value={damageType}
                onChange={(e) => { setDamageType(e.target.value); setShowResult(false) }}
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
              >
                <option value="" className="text-gray-900">Select damage type...</option>
                {DAMAGE_TYPES.map(dt => (
                  <option key={dt.value} value={dt.value} className="text-gray-900">{dt.label}</option>
                ))}
              </select>
            </div>

            {/* Property Type */}
            <div className="mb-8">
              <label className="block text-white font-bold mb-3 text-lg">
                Property type?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => { setPropertyType('residential'); setShowResult(false) }}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                    propertyType === 'residential'
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Home className="h-5 w-5" />
                  Residential
                </button>
                <button
                  onClick={() => { setPropertyType('commercial'); setShowResult(false) }}
                  className={`flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold transition-all ${
                    propertyType === 'commercial'
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Building2 className="h-5 w-5" />
                  Commercial
                </button>
              </div>
            </div>

            {/* Affected Area */}
            <div className="mb-8">
              <label className="block text-white font-bold mb-3 text-lg">
                Affected area (m²)
              </label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={5}
                  max={500}
                  value={area}
                  onChange={(e) => { setArea(Number(e.target.value)); setShowResult(false) }}
                  className="flex-1 h-2 bg-white/20 rounded-lg appearance-none cursor-pointer accent-blue-500"
                  style={{
                    background: `linear-gradient(to right, #3B82F6 0%, #3B82F6 ${((area - 5) / 495) * 100}%, rgba(255,255,255,0.2) ${((area - 5) / 495) * 100}%, rgba(255,255,255,0.2) 100%)`,
                  }}
                />
                <div className="flex items-center bg-white/20 rounded-lg border border-white/30 overflow-hidden">
                  <input
                    type="number"
                    min={5}
                    max={500}
                    value={area}
                    onChange={(e) => {
                      const val = Math.max(5, Math.min(500, Number(e.target.value) || 5))
                      setArea(val)
                      setShowResult(false)
                    }}
                    className="w-16 px-2 py-2 bg-transparent text-white text-center focus:outline-none"
                  />
                  <span className="pr-3 text-white/60 text-sm">m²</span>
                </div>
              </div>
              <div className="flex justify-between text-white/50 text-sm mt-2">
                <span>5 m²</span>
                <span className="text-white/70 font-medium">
                  {area <= 30 ? 'Small' : area <= 100 ? 'Medium' : 'Large'} area
                </span>
                <span>500 m²</span>
              </div>
            </div>

            {/* Urgency */}
            <div className="mb-8">
              <label className="block text-white font-bold mb-3 text-lg">
                How urgent is the situation?
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  onClick={() => { setUrgency('emergency'); setShowResult(false) }}
                  className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg font-bold transition-all text-sm md:text-base ${
                    urgency === 'emergency'
                      ? 'bg-red-500 text-white shadow-lg shadow-red-500/30'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <Zap className="h-5 w-5" />
                  <span>Emergency</span>
                  <span className="text-xs font-normal opacity-70">Right now</span>
                </button>
                <button
                  onClick={() => { setUrgency('urgent'); setShowResult(false) }}
                  className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg font-bold transition-all text-sm md:text-base ${
                    urgency === 'urgent'
                      ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/30'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <AlertTriangle className="h-5 w-5" />
                  <span>Urgent</span>
                  <span className="text-xs font-normal opacity-70">Within 24hrs</span>
                </button>
                <button
                  onClick={() => { setUrgency('scheduled'); setShowResult(false) }}
                  className={`flex flex-col items-center gap-1 px-4 py-3 rounded-lg font-bold transition-all text-sm md:text-base ${
                    urgency === 'scheduled'
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <CalendarClock className="h-5 w-5" />
                  <span>Scheduled</span>
                  <span className="text-xs font-normal opacity-70">3\u20135 days</span>
                </button>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              disabled={!damageType}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:shadow-xl hover:shadow-green-500/20 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Calculate Estimate
            </button>

            {/* Results */}
            <AnimatePresence>
              {showResult && result && insurance && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  className="mt-8"
                >
                  {/* Cost Range */}
                  <div className="bg-black/30 rounded-xl p-6 mb-4">
                    <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                      <DollarSign className="h-6 w-6 text-emerald-400" />
                      Your Estimated Cost
                    </h3>
                    <div className="text-center py-4">
                      <div className="text-5xl md:text-6xl font-bold text-white mb-2">
                        {formatCurrency(result.low)} <span className="text-2xl text-white/60">\u2013</span> {formatCurrency(result.high)}
                      </div>
                      <p className="text-white/60 text-sm">
                        {propertyType === 'commercial' ? 'Commercial' : 'Residential'} \u2022 {area} m² \u2022 {urgency === 'emergency' ? 'Emergency response' : urgency === 'urgent' ? 'Urgent (24hrs)' : 'Scheduled'}
                      </p>
                    </div>
                  </div>

                  {/* Insurance + Response Grid */}
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white/10 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Shield className="h-5 w-5 text-emerald-400" />
                        <span className="text-white font-bold">Insurance Reimbursement</span>
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">{insurance.likelihood}</div>
                      <div className="text-white/60 text-sm mb-2">Typical coverage likelihood</div>
                      <div className="text-white/80 text-sm">
                        <span className="font-medium">Typical excess:</span> {insurance.excess}
                      </div>
                    </div>

                    <div className="bg-white/10 rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="h-5 w-5 text-blue-400" />
                        <span className="text-white font-bold">Response Time</span>
                      </div>
                      <div className="text-3xl font-bold text-white mb-1">{RESPONSE_TIMES[urgency]}</div>
                      <div className="text-white/60 text-sm mb-2">Estimated arrival</div>
                      <div className="text-white/80 text-sm">
                        24/7 availability across Australia
                      </div>
                    </div>
                  </div>

                  {/* Insurance Note */}
                  <div className="bg-blue-500/20 border border-blue-500/40 rounded-xl p-4 mb-4">
                    <div className="flex items-start gap-3">
                      <Shield className="h-5 w-5 text-blue-400 mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="text-white font-bold mb-1">Insurance Note</div>
                        <div className="text-white/80 text-sm">{insurance.note}</div>
                      </div>
                    </div>
                  </div>

                  {/* Cost Factors */}
                  {factors && (
                    <div className="bg-white/5 rounded-xl p-5 mb-4">
                      <h4 className="text-white font-bold mb-3">Key Factors Affecting Your Cost</h4>
                      <ul className="space-y-2">
                        {factors.map((factor, i) => (
                          <li key={i} className="flex items-start gap-2 text-white/80 text-sm">
                            <span className="text-blue-400 mt-0.5">\u2022</span>
                            {factor}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* CTA */}
                  <Link
                    href={`/claim?damageType=${encodeURIComponent(damageType)}&propertyType=${encodeURIComponent(propertyType)}&urgency=${encodeURIComponent(urgency)}&estimateLow=${result.low}&estimateHigh=${result.high}`}
                    className="block w-full bg-gradient-to-r from-red-500 to-red-600 text-white px-8 py-4 rounded-lg font-bold text-lg text-center hover:shadow-xl hover:shadow-red-500/30 transition-all"
                  >
                    <span className="inline-flex items-center gap-2">
                      Lodge a Claim
                      <ArrowRight className="h-5 w-5" />
                    </span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Disclaimer */}
            <div className="mt-6 text-center text-white/60">
              <p className="text-sm">
                * Estimates based on typical Australian restoration pricing data.
                Actual costs vary based on site-specific conditions and the accuracy
                of the information provided.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Flame, Shield, AlertCircle, CheckCircle, XCircle, 
  FileText, Phone, Calculator, Info, Home, AlertTriangle 
} from 'lucide-react';

export default function FireDamageInsurancePage() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  const coverageTypes = {
    dwelling: {
      title: 'Dwelling Coverage',
      description: 'Covers the structure of your home',
      items: [
        'Structural damage from fire',
        'Smoke damage to walls and ceilings',
        'Water damage from firefighting',
        'Damaged electrical systems',
        'HVAC system damage',
        'Built-in appliances',
        'Attached structures (garage, deck)'
      ]
    },
    personal: {
      title: 'Personal Property',
      description: 'Covers your belongings',
      items: [
        'Furniture and furnishings',
        'Clothing and personal items',
        'Electronics and appliances',
        'Jewelry (check sub-limits)',
        'Art and collectibles (may need rider)',
        'Tools and equipment',
        'Stored items'
      ]
    },
    additional: {
      title: 'Additional Living Expenses',
      description: 'Covers temporary living costs',
      items: [
        'Hotel or rental accommodation',
        'Restaurant meals',
        'Laundry services',
        'Pet boarding',
        'Storage costs',
        'Extra transportation',
        'Utility installation at temporary location'
      ]
    }
  };

  const exclusions = [
    {
      category: 'Arson & Fraud',
      items: [
        'Intentional fire setting by policyholder',
        'Fire during illegal activities',
        'False or inflated claims',
        'Concealment of information'
      ]
    },
    {
      category: 'Vacancy & Neglect',
      items: [
        'Vacant property over 30-60 days',
        'Failure to maintain property',
        'Known hazards not addressed',
        'Delayed reporting of damage'
      ]
    },
    {
      category: 'War & Government',
      items: [
        'War or military action',
        'Government seizure',
        'Nuclear hazards',
        'Ordinance or law violations'
      ]
    }
  ];

  const claimProcess = [
    {
      phase: 'Immediate (0-24 hours)',
      actions: [
        'Ensure safety - do not enter until cleared',
        'Call insurance company',
        'Document everything with photos/video',
        'Get fire report from fire department',
        'Secure the property'
      ],
      critical: true
    },
    {
      phase: 'Short-term (1-7 days)',
      actions: [
        'Meet with insurance adjuster',
        'Start detailed inventory',
        'Get temporary accommodation',
        'Begin mitigation work',
        'Collect receipts for all expenses'
      ],
      critical: true
    },
    {
      phase: 'Recovery (1-4 weeks)',
      actions: [
        'Complete personal property inventory',
        'Get restoration quotes',
        'Review initial settlement offer',
        'Begin contents cleaning',
        'Continue documenting expenses'
      ],
      critical: false
    },
    {
      phase: 'Restoration (1-6 months)',
      actions: [
        'Finalize claim settlement',
        'Begin reconstruction',
        'Replace personal property',
        'Address smoke odor issues',
        'Complete final documentation'
      ],
      critical: false
    }
  ];

  const settlementTypes = [
    {
      type: 'Actual Cash Value (ACV)',
      description: 'Replacement cost minus depreciation',
      pros: ['Lower premiums', 'Immediate payout'],
      cons: ['May not cover full replacement', 'Depreciation reduces payout'],
      bestFor: 'Older homes, budget-conscious'
    },
    {
      type: 'Replacement Cost Value (RCV)',
      description: 'Full cost to replace at current prices',
      pros: ['Full replacement coverage', 'No depreciation'],
      cons: ['Higher premiums', 'May require receipts'],
      bestFor: 'Newer homes, valuable property'
    },
    {
      type: 'Guaranteed Replacement',
      description: 'Covers even if costs exceed policy limits',
      pros: ['Complete protection', 'No coverage gaps'],
      cons: ['Highest premiums', 'Not always available'],
      bestFor: 'High-value homes, maximum protection'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-red-900 to-orange-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-12 h-12" />
              <Flame className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Fire Damage Insurance Guide
            </h1>
            <p className="text-xl text-orange-100 max-w-3xl">
              Complete guide to fire insurance claims, coverage types, and maximizing your settlement
            </p>
          </motion.div>
        </div>
      </section>

      {/* Critical Alert */}
      <section className="bg-red-600 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="w-6 h-6" />
            <p className="font-semibold">
              Never enter fire-damaged property until fire department gives all-clear
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Types */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Understanding Your Fire Coverage
            </h2>
            <p className="text-xl text-gray-600">
              Most policies include three types of fire damage coverage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(coverageTypes).map(([key, coverage], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6">
                  <Home className="w-10 h-10 mb-3" />
                  <h3 className="text-xl font-bold">{coverage.title}</h3>
                  <p className="text-orange-100 text-sm mt-2">{coverage.description}</p>
                </div>
                <div className="p-6">
                  <ul className="space-y-2">
                    {coverage.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Exclusions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Common Policy Exclusions
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {exclusions.map((exclusion, index) => (
              <motion.div
                key={exclusion.category}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6 border-2 border-red-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="w-8 h-8 text-red-600" />
                  <h3 className="text-xl font-bold text-red-900">{exclusion.category}</h3>
                </div>
                <ul className="space-y-2">
                  {exclusion.items.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 text-red-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Claim Process Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Fire Insurance Claim Timeline
          </h2>
          
          <div className="space-y-6">
            {claimProcess.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`bg-white rounded-lg shadow-lg p-6 ${
                  phase.critical ? 'border-l-4 border-red-600' : 'border-l-4 border-blue-600'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className={`text-lg font-bold ${
                        phase.critical ? 'text-red-600' : 'text-blue-600'
                      }`}>
                        {phase.phase}
                      </span>
                      {phase.critical && (
                        <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full font-semibold">
                          CRITICAL
                        </span>
                      )}
                    </div>
                    <ul className="grid md:grid-cols-2 gap-3">
                      {phase.actions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Settlement Types */}
      <section className="py-16 bg-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Understanding Settlement Options
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {settlementTypes.map((settlement, index) => (
              <motion.div
                key={settlement.type}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl shadow-lg p-6"
              >
                <Calculator className="w-10 h-10 text-orange-600 mb-4" />
                <h3 className="text-xl font-bold mb-2">{settlement.type}</h3>
                <p className="text-gray-600 mb-4">{settlement.description}</p>
                
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-green-700">Pros:</span>
                    <ul className="mt-1 space-y-1">
                      {settlement.pros.map((pro, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {pro}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <span className="font-semibold text-red-700">Cons:</span>
                    <ul className="mt-1 space-y-1">
                      {settlement.cons.map((con, idx) => (
                        <li key={idx} className="text-sm text-gray-600">• {con}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-3 border-t">
                    <span className="text-xs font-semibold text-gray-500">BEST FOR:</span>
                    <p className="text-sm text-gray-700 mt-1">{settlement.bestFor}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Maximizing Your Fire Damage Claim
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <FileText className="w-10 h-10 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Essential Documentation</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Fire department report</li>
                <li>• Pre-loss photos of property</li>
                <li>• Complete inventory with values</li>
                <li>• Receipts for emergency expenses</li>
                <li>• Contractor estimates</li>
                <li>• Smoke and soot damage assessment</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <AlertCircle className="w-10 h-10 text-orange-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Critical Do Not List</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Do not throw away damaged items</li>
                <li>• Do not sign quick settlements</li>
                <li>• Do not forget hidden damage</li>
                <li>• Do not clean before documenting</li>
                <li>• Do not admit fault or negligence</li>
                <li>• Do not forget smoke damage claims</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Help with Your Fire Damage Claim?
          </h2>
          <p className="text-xl mb-8 text-orange-100">
            Our certified contractors work directly with insurance companies
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/whos-first"
              className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Find Fire Restoration Experts
            </Link>
            <Link
              href="/emergency/checklists/fire-damage"
              className="bg-red-700 hover:bg-red-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Fire Emergency Checklist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
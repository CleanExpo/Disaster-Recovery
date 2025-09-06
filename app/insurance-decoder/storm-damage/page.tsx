'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Wind, Shield, AlertCircle, CheckCircle, XCircle, 
  FileText, Phone, Home, Cloud, Zap, AlertTriangle 
} from 'lucide-react';

export default function StormDamageInsurancePage() {
  const [activeSection, setActiveSection] = useState('coverage');

  const stormTypes = {
    covered: {
      title: 'Covered Storm Events',
      items: [
        { event: 'Cyclones/Hurricanes', details: 'Full coverage for wind and rain damage' },
        { event: 'Hailstorms', details: 'Damage to roof, windows, vehicles' },
        { event: 'Severe Thunderstorms', details: 'Lightning strikes, wind damage' },
        { event: 'Tornadoes', details: 'Structural damage from high winds' },
        { event: 'Storm Surge', details: 'If separate from flood waters' },
        { event: 'Fallen Trees', details: 'Damage from wind-blown trees' }
      ]
    },
    excluded: {
      title: 'Common Exclusions',
      items: [
        { event: 'Flood Waters', details: 'Requires separate flood insurance' },
        { event: 'Gradual Damage', details: 'Slow leaks from storm damage' },
        { event: 'Lack of Maintenance', details: 'Pre-existing roof problems' },
        { event: 'Landslides', details: 'Earth movement exclusions' },
        { event: 'Storm Surge (some policies)', details: 'May be excluded as flood' },
        { event: 'Wind-driven rain', details: 'Through existing openings' }
      ]
    }
  };

  const damageCategories = [
    {
      category: 'Structural Damage',
      covered: ['Roof damage', 'Wall damage', 'Foundation issues', 'Window breakage'],
      documentation: ['Photos from multiple angles', 'Professional inspection report', 'Repair estimates']
    },
    {
      category: 'Water Damage',
      covered: ['Rain through damaged roof', 'Wind-driven rain through breaks', 'Broken pipe from tree impact'],
      documentation: ['Moisture readings', 'Source of water entry', 'Timeline of damage']
    },
    {
      category: 'Contents Damage',
      covered: ['Furniture', 'Electronics', 'Personal belongings', 'Appliances'],
      documentation: ['Item inventory', 'Purchase receipts', 'Photos of damaged items']
    },
    {
      category: 'Additional Living Expenses',
      covered: ['Hotel costs', 'Meal expenses', 'Pet boarding', 'Storage fees'],
      documentation: ['All receipts', 'Proof of displacement', 'Normal living cost comparison']
    }
  ];

  const claimProcess = [
    {
      phase: 'Emergency (0-24 hrs)',
      actions: [
        'Ensure safety first',
        'Call insurance immediately',
        'Document all damage',
        'Prevent further damage',
        'Keep damaged materials'
      ],
      tips: 'Take photos before any cleanup or repairs'
    },
    {
      phase: 'Assessment (1-3 days)',
      actions: [
        'Meet insurance adjuster',
        'Get professional estimates',
        'Complete claim forms',
        'Provide documentation',
        'Discuss coverage limits'
      ],
      tips: 'Don\'t accept first offer if inadequate'
    },
    {
      phase: 'Mitigation (3-7 days)',
      actions: [
        'Board up openings',
        'Tarp damaged roof',
        'Remove water',
        'Dry affected areas',
        'Secure property'
      ],
      tips: 'Keep all receipts for reimbursement'
    },
    {
      phase: 'Restoration (1-6 months)',
      actions: [
        'Hire approved contractors',
        'Coordinate repairs',
        'Track expenses',
        'Maintain communication',
        'Final inspection'
      ],
      tips: 'Document entire restoration process'
    }
  ];

  const deductibles = [
    {
      type: 'Standard Deductible',
      description: 'Fixed dollar amount (e.g., $1,000)',
      whenApplies: 'Most common for general storm damage',
      example: 'You pay first $1,000 of claim'
    },
    {
      type: 'Percentage Deductible',
      description: '1-5% of home value',
      whenApplies: 'Often for cyclone/hurricane damage',
      example: '2% of $500k home = $10,000 deductible'
    },
    {
      type: 'Separate Storm Deductible',
      description: 'Special deductible for named storms',
      whenApplies: 'Coastal areas with cyclone risk',
      example: 'Higher deductible for cyclone damage only'
    }
  ];

  const maximizingTips = [
    'Document pre-storm condition of property',
    'Keep maintenance records to prove upkeep',
    'Use insurance-approved contractors',
    'Don\'t throw away damaged items too soon',
    'Get multiple repair estimates',
    'Understand your policy limits and deductibles',
    'Track all additional living expenses',
    'Consider hiring a public adjuster for large claims'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-purple-900 to-indigo-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-12 h-12" />
              <Wind className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Storm Damage Insurance Guide
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl">
              Navigate storm insurance claims and understand your coverage
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alert */}
      <section className="bg-orange-500 text-white py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <Cloud className="w-6 h-6" />
            <p className="font-semibold">
              Storm season preparation can significantly impact your coverage
            </p>
          </div>
        </div>
      </section>

      {/* Storm Types Coverage */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Storm Event Coverage
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Covered Events */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-green-600 text-white p-6">
                <CheckCircle className="w-10 h-10 mb-3" />
                <h3 className="text-xl font-bold">{stormTypes.covered.title}</h3>
              </div>
              <div className="p-6">
                {stormTypes.covered.items.map((item, idx) => (
                  <div key={idx} className="mb-4 pb-4 border-b last:border-0">
                    <div className="flex items-start gap-3">
                      <Zap className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.event}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Excluded Events */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-red-600 text-white p-6">
                <XCircle className="w-10 h-10 mb-3" />
                <h3 className="text-xl font-bold">{stormTypes.excluded.title}</h3>
              </div>
              <div className="p-6">
                {stormTypes.excluded.items.map((item, idx) => (
                  <div key={idx} className="mb-4 pb-4 border-b last:border-0">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.event}</h4>
                        <p className="text-sm text-gray-600 mt-1">{item.details}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Damage Categories */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Coverage by Damage Type
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {damageCategories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center gap-3 mb-4">
                  <Home className="w-8 h-8 text-purple-600" />
                  <h3 className="text-xl font-bold text-gray-900">{category.category}</h3>
                </div>
                
                <div className="mb-4">
                  <h4 className="font-semibold text-green-700 mb-2">What's Covered:</h4>
                  <ul className="space-y-1">
                    {category.covered.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-blue-700 mb-2">Documentation Needed:</h4>
                  <ul className="space-y-1">
                    {category.documentation.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <FileText className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Claim Process Timeline */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Storm Claim Timeline
          </h2>
          
          <div className="space-y-6">
            {claimProcess.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <h3 className="text-lg font-bold text-purple-600 mb-2">
                      {phase.phase}
                    </h3>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-3">Required Actions:</h4>
                    <ul className="space-y-2">
                      {phase.actions.map((action, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-sm text-gray-700">{action}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4">
                      <p className="text-sm font-semibold text-blue-900">💡 Pro Tip:</p>
                      <p className="text-sm text-blue-800 mt-1">{phase.tips}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Deductibles */}
      <section className="py-16 bg-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Understanding Storm Deductibles
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {deductibles.map((deductible, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-lg font-bold text-purple-900 mb-3">
                  {deductible.type}
                </h3>
                <p className="text-gray-700 mb-3">{deductible.description}</p>
                <div className="bg-gray-50 rounded p-3 mb-3">
                  <p className="text-sm font-semibold text-gray-800">When it applies:</p>
                  <p className="text-sm text-gray-600">{deductible.whenApplies}</p>
                </div>
                <div className="bg-yellow-50 rounded p-3">
                  <p className="text-sm font-semibold text-yellow-800">Example:</p>
                  <p className="text-sm text-yellow-700">{deductible.example}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Maximizing Your Claim */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Tips for Maximizing Your Storm Claim
          </h2>
          
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {maximizingTips.map((tip, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Storm Damage? Act Fast!
          </h2>
          <p className="text-xl mb-8 text-purple-100">
            Get professional help to secure your property and maximize your claim
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/whos-first"
              className="bg-white text-purple-600 hover:bg-purple-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Find Storm Damage Experts
            </Link>
            <Link
              href="/emergency/checklists/storm-damage"
              className="bg-purple-700 hover:bg-purple-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Storm Emergency Checklist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
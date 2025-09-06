'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Droplets, Shield, AlertCircle, CheckCircle, XCircle, 
  FileText, Phone, Calculator, Info, ArrowRight 
} from 'lucide-react';

export default function WaterDamageInsurancePage() {
  const [activeTab, setActiveTab] = useState('coverage');

  const coverageTypes = {
    covered: [
      'Sudden and accidental water damage from burst pipes',
      'Water damage from storms and weather events',
      'Overflow from appliances (washing machines, dishwashers)',
      'Water damage from firefighting efforts',
      'Frozen pipe bursts (in most policies)',
      'Accidental discharge from plumbing systems',
      'Water damage from roof leaks (if sudden)',
      'Overflow from HVAC systems'
    ],
    notCovered: [
      'Gradual leaks and seepage',
      'Flood damage (requires separate flood insurance)',
      'Sewage backup (without specific endorsement)',
      'Groundwater seepage',
      'Neglect and lack of maintenance',
      'Water damage from poor construction',
      'Mould damage (if not immediately addressed)',
      'Wear and tear related water damage'
    ],
    grey: [
      'Hidden water damage (depends on cause)',
      'Mould remediation (time-sensitive)',
      'Additional living expenses (check your policy)',
      'Contents coverage (varies by policy)',
      'Business interruption (commercial policies)',
      'Code upgrades during repairs'
    ]
  };

  const claimSteps = [
    {
      step: 1,
      title: 'Document Everything',
      actions: [
        'Take photos/videos before any cleanup',
        'Document all damaged items',
        'Keep damaged materials as evidence',
        'Record dates and times'
      ]
    },
    {
      step: 2,
      title: 'Notify Insurance',
      actions: [
        'Call within 24-48 hours',
        'Get claim number',
        'Ask about coverage limits',
        'Request emergency funds if needed'
      ]
    },
    {
      step: 3,
      title: 'Mitigate Damage',
      actions: [
        'Stop the water source',
        'Remove standing water',
        'Move items to dry area',
        'Keep all receipts'
      ]
    },
    {
      step: 4,
      title: 'Meet Adjuster',
      actions: [
        'Be present for inspection',
        'Show all damage areas',
        'Provide documentation',
        'Get written assessment'
      ]
    },
    {
      step: 5,
      title: 'Review Settlement',
      actions: [
        'Understand the offer',
        'Check for depreciation',
        'Negotiate if needed',
        'Get second opinion if unsure'
      ]
    }
  ];

  const commonMistakes = [
    {
      mistake: 'Waiting too long to file claim',
      consequence: 'Claim denial or reduced coverage',
      solution: 'File within 24-48 hours of discovery'
    },
    {
      mistake: 'Throwing away damaged items',
      consequence: 'No proof of damage for claim',
      solution: 'Document and keep everything until adjuster approves'
    },
    {
      mistake: 'Not reading policy details',
      consequence: 'Unexpected out-of-pocket costs',
      solution: 'Review policy before filing claim'
    },
    {
      mistake: 'Accepting first settlement offer',
      consequence: 'Insufficient funds for full restoration',
      solution: 'Get contractor estimates before accepting'
    },
    {
      mistake: 'Using wrong restoration company',
      consequence: 'Insurance may not cover the work',
      solution: 'Use insurance-approved contractors'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-12 h-12" />
              <Droplets className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Water Damage Insurance Guide
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Understanding your coverage, maximizing your claim, and avoiding common pitfalls
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alert */}
      <section className="bg-yellow-500 text-black py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <AlertCircle className="w-6 h-6" />
            <p className="font-semibold">
              Most policies require notification within 48-72 hours of discovering water damage
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Tabs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What's Covered vs What's Not
            </h2>
            <p className="text-xl text-gray-600">
              Know your policy coverage before disaster strikes
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid md:grid-cols-3 gap-6">
              {/* Typically Covered */}
              <div className="border-2 border-green-200 rounded-xl p-6 bg-green-50">
                <div className="flex items-center gap-3 mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                  <h3 className="text-xl font-bold text-green-900">Typically Covered</h3>
                </div>
                <ul className="space-y-3">
                  {coverageTypes.covered.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Typically Not Covered */}
              <div className="border-2 border-red-200 rounded-xl p-6 bg-red-50">
                <div className="flex items-center gap-3 mb-4">
                  <XCircle className="w-8 h-8 text-red-600" />
                  <h3 className="text-xl font-bold text-red-900">Typically Not Covered</h3>
                </div>
                <ul className="space-y-3">
                  {coverageTypes.notCovered.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Grey Areas */}
              <div className="border-2 border-yellow-200 rounded-xl p-6 bg-yellow-50">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="w-8 h-8 text-yellow-600" />
                  <h3 className="text-xl font-bold text-yellow-900">Grey Areas</h3>
                </div>
                <ul className="space-y-3">
                  {coverageTypes.grey.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <Info className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Claim Process */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            5-Step Claim Process
          </h2>
          
          <div className="grid md:grid-cols-5 gap-4">
            {claimSteps.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="text-3xl font-bold text-blue-600 mb-3">
                  Step {step.step}
                </div>
                <h3 className="font-bold mb-3">{step.title}</h3>
                <ul className="space-y-2 text-sm">
                  {step.actions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{action}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Avoid These Common Mistakes
          </h2>
          
          <div className="space-y-6 max-w-4xl mx-auto">
            {commonMistakes.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <XCircle className="w-5 h-5 text-red-600" />
                      <span className="font-semibold text-red-900">Mistake</span>
                    </div>
                    <p className="text-gray-700">{item.mistake}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-yellow-600" />
                      <span className="font-semibold text-yellow-900">Consequence</span>
                    </div>
                    <p className="text-gray-700">{item.consequence}</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <span className="font-semibold text-green-900">Solution</span>
                    </div>
                    <p className="text-gray-700">{item.solution}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Maximizing Your Claim
          </h2>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <FileText className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Documentation Tips</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Video walkthrough showing all damage</li>
                <li>• Close-up photos of each damaged item</li>
                <li>• Keep a written log of events</li>
                <li>• Save all communication with insurance</li>
                <li>• Get written estimates from contractors</li>
              </ul>
            </div>
            
            <div className="bg-white rounded-xl shadow-lg p-6">
              <Calculator className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-4">Cost Considerations</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Know your deductible amount</li>
                <li>• Understand coverage limits</li>
                <li>• Ask about depreciation vs replacement</li>
                <li>• Include additional living expenses</li>
                <li>• Factor in code upgrade costs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need Help with Your Water Damage Claim?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Our insurance-approved contractors can help navigate the claims process
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/whos-first"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Find Approved Contractors
            </Link>
            <Link
              href="/emergency/checklists/water-damage"
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Emergency Checklist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
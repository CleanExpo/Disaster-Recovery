'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Shield, AlertCircle, CheckCircle, XCircle, 
  FileText, Phone, Clock, Info, Heart, Microscope 
} from 'lucide-react';

export default function MouldInsurancePage() {
  const [activeTab, setActiveTab] = useState('coverage');

  const coverageScenarios = {
    covered: [
      'Mould from sudden pipe burst (if promptly addressed)',
      'Mould from storm damage (covered peril)',
      'Mould from firefighting efforts',
      'Hidden mould from covered water damage',
      'Mould discovered during covered repairs',
      'Mould prevention as part of water damage claim'
    ],
    notCovered: [
      'Mould from long-term leaks',
      'Mould from poor ventilation',
      'Mould from high humidity',
      'Mould from deferred maintenance',
      'Pre-existing mould conditions',
      'Mould from groundwater seepage',
      'Mould from condensation',
      'Mould in vacant properties'
    ],
    conditional: [
      'Mould remediation limits (typically $5,000-$10,000)',
      'Time limits after water damage (48-72 hours)',
      'Proof of prompt action required',
      'Professional remediation required',
      'May require mould endorsement',
      'Subject to policy sub-limits'
    ]
  };

  const criticalFactors = [
    {
      factor: 'Time is Everything',
      details: 'Most policies require action within 48-72 hours of water damage',
      impact: 'Delays can void mould coverage entirely'
    },
    {
      factor: 'Causation Matters',
      details: 'Mould must result from a covered peril (not maintenance)',
      impact: 'Source determines coverage eligibility'
    },
    {
      factor: 'Documentation Critical',
      details: 'Must prove mould wasn\'t pre-existing',
      impact: 'Photos before/after water damage essential'
    },
    {
      factor: 'Professional Standards',
      details: 'DIY remediation may void coverage',
      impact: 'Use certified mould professionals only'
    }
  ];

  const claimStrategy = [
    {
      step: 1,
      title: 'Immediate Documentation',
      actions: [
        'Photo/video all visible mould',
        'Document the water source',
        'Get moisture readings',
        'Record timeline of discovery'
      ]
    },
    {
      step: 2,
      title: 'Professional Assessment',
      actions: [
        'Hire certified mould inspector',
        'Get written assessment report',
        'Air quality testing',
        'Identify mould species'
      ]
    },
    {
      step: 3,
      title: 'Insurance Notification',
      actions: [
        'Report within 24-48 hours',
        'Emphasize covered water source',
        'Provide inspection report',
        'Request mould coverage review'
      ]
    },
    {
      step: 4,
      title: 'Remediation Process',
      actions: [
        'Use insurance-approved contractors',
        'Follow IICRC S520 standards',
        'Document all work performed',
        'Get clearance testing'
      ]
    }
  ];

  const healthDocumentation = [
    'Medical records of mould exposure symptoms',
    'Doctor\'s notes linking symptoms to mould',
    'Allergy test results',
    'Prescription records',
    'Time off work documentation',
    'Medical expense receipts'
  ];

  const preventionMeasures = [
    'Fix leaks within 24 hours',
    'Dry water damage within 48 hours',
    'Maintain humidity below 50%',
    'Regular HVAC maintenance',
    'Proper bathroom ventilation',
    'Annual moisture inspections'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-900 to-emerald-800 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <Shield className="w-12 h-12" />
              <Microscope className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Mould Insurance Coverage Guide
            </h1>
            <p className="text-xl text-green-100 max-w-3xl">
              Understanding the complexities of mould coverage and maximizing your claim
            </p>
          </motion.div>
        </div>
      </section>

      {/* Critical Alert */}
      <section className="bg-yellow-500 text-black py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <Clock className="w-6 h-6" />
            <p className="font-semibold">
              WARNING: Most policies have strict 48-72 hour action requirements for mould coverage
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Scenarios */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mould Coverage Scenarios
            </h2>
            <p className="text-xl text-gray-600">
              Mould coverage is complex and highly conditional
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {/* Typically Covered */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-green-600 text-white p-4">
                <CheckCircle className="w-8 h-8 mb-2" />
                <h3 className="text-xl font-bold">May Be Covered</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {coverageScenarios.covered.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Not Covered */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-red-600 text-white p-4">
                <XCircle className="w-8 h-8 mb-2" />
                <h3 className="text-xl font-bold">Typically Not Covered</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {coverageScenarios.notCovered.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Conditional */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-yellow-600 text-white p-4">
                <AlertCircle className="w-8 h-8 mb-2" />
                <h3 className="text-xl font-bold">Conditional Factors</h3>
              </div>
              <div className="p-6">
                <ul className="space-y-3">
                  {coverageScenarios.conditional.map((item, idx) => (
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

      {/* Critical Factors */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Critical Coverage Factors
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {criticalFactors.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <h3 className="text-xl font-bold text-green-900 mb-3">
                  {item.factor}
                </h3>
                <p className="text-gray-700 mb-3">{item.details}</p>
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-3">
                  <p className="text-sm font-semibold text-yellow-800">
                    Impact: {item.impact}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Claim Strategy */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Mould Claim Strategy
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {claimStrategy.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="text-3xl font-bold text-green-600 mb-3">
                  Step {step.step}
                </div>
                <h3 className="font-bold mb-3">{step.title}</h3>
                <ul className="space-y-2">
                  {step.actions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600">{action}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Health Documentation */}
      <section className="py-16 bg-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <Heart className="w-12 h-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Health Impact Documentation
            </h2>
            <p className="text-xl text-gray-600">
              Medical documentation can strengthen your claim
            </p>
          </div>
          
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
            <h3 className="text-xl font-bold mb-6">Essential Health Records</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {healthDocumentation.map((item, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-500">
              <p className="text-sm text-yellow-800">
                <strong>Note:</strong> Health impacts may support additional living expenses or strengthen your claim for full remediation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Tips */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">
            Prevention = Coverage Protection
          </h2>
          
          <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
            <p className="text-lg text-gray-700 mb-6">
              Insurance companies expect reasonable prevention efforts. Failure to prevent mould can void coverage:
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              {preventionMeasures.map((measure, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{measure}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-emerald-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Dealing with Mould Issues?
          </h2>
          <p className="text-xl mb-8 text-green-100">
            Get professional help to maximize your insurance coverage
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/whos-first"
              className="bg-white text-green-600 hover:bg-green-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Find Mould Specialists
            </Link>
            <Link
              href="/emergency/checklists/mould"
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-5 h-5" />
              Mould Emergency Checklist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
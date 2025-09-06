'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckSquare, AlertTriangle, Clock, Phone, Camera, Shield, X, Wind, Home } from 'lucide-react';

export default function StormDamageChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleCheck = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const duringStorm = [
    { id: 'stay-inside', text: 'STAY INDOORS - Away from windows and doors', critical: true },
    { id: 'monitor-alerts', text: 'Monitor emergency broadcasts and warnings', critical: true },
    { id: 'avoid-electrical', text: 'Avoid electrical equipment and plumbing', critical: true },
    { id: 'emergency-kit', text: 'Keep emergency kit accessible', critical: false },
    { id: 'flashlights', text: 'Use flashlights, not candles', critical: false },
    { id: 'charged-devices', text: 'Keep devices charged and accessible', critical: false }
  ];

  const immediateAfter = [
    { id: 'safety-check', text: 'Check for injuries and provide first aid', critical: true },
    { id: 'structural-damage', text: 'Assess structural damage from safe distance', critical: true },
    { id: 'power-lines', text: 'Stay away from downed power lines', critical: true },
    { id: 'gas-leaks', text: 'Check for gas leaks (smell, don't use flames)', critical: true },
    { id: 'photo-damage', text: 'Photograph all damage immediately', critical: false },
    { id: 'call-insurance', text: 'Contact insurance company', critical: false }
  ];

  const first24Hours = [
    { id: 'tarp-roof', text: 'Tarp damaged roof areas to prevent water entry', critical: false },
    { id: 'board-windows', text: 'Board up broken windows and openings', critical: false },
    { id: 'remove-debris', text: 'Clear debris from gutters and drains', critical: false },
    { id: 'document-everything', text: 'Create detailed inventory of damages', critical: false },
    { id: 'secure-property', text: 'Secure property against looters', critical: false },
    { id: 'temporary-repairs', text: 'Make temporary repairs to prevent further damage', critical: false }
  ];

  const insuranceSteps = [
    { id: 'policy-number', text: 'Have policy number ready when calling', critical: false },
    { id: 'adjuster-appointment', text: 'Schedule adjuster visit ASAP', critical: false },
    { id: 'keep-receipts', text: 'Keep all receipts for repairs and expenses', critical: false },
    { id: 'dont-dispose', text: 'Don't dispose of damaged items until documented', critical: false },
    { id: 'written-estimates', text: 'Get written repair estimates', critical: false },
    { id: 'living-expenses', text: 'Track additional living expenses if displaced', critical: false }
  ];

  const safetyWarnings = [
    'Treat all downed power lines as live',
    'Never use generators indoors',
    'Watch for weakened tree limbs',
    'Be aware of contaminated flood water',
    'Check ceiling for sagging (water damage)',
    'Wear protective gear during cleanup'
  ];

  const calculateProgress = () => {
    const totalItems = [
      ...duringStorm,
      ...immediateAfter,
      ...first24Hours,
      ...insuranceSteps
    ].length;
    return Math.round((checkedItems.length / totalItems) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-900 to-indigo-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <Wind className="w-12 h-12 mr-4" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Storm Damage Emergency Checklist
              </h1>
            </div>
            <p className="text-xl text-purple-100">
              Critical safety and recovery steps for storm and wind damage
            </p>
            <div className="mt-6 bg-purple-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Checklist Progress</span>
                <span>{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-purple-950 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Critical Alert */}
      <section className="bg-red-600 text-white py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="w-6 h-6" />
            <p className="font-bold">
              DANGER: Never go outside during a storm. Wait for official all-clear.
            </p>
          </div>
        </div>
      </section>

      {/* Safety Warnings */}
      <section className="py-8 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-yellow-100 border-2 border-yellow-600 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-yellow-900 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              CRITICAL SAFETY WARNINGS
            </h2>
            <ul className="space-y-2">
              {safetyWarnings.map((warning, index) => (
                <li key={index} className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <span className="text-yellow-900">{warning}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Checklists */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* During Storm */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600 flex items-center">
              <Wind className="w-6 h-6 mr-2" />
              DURING THE STORM
            </h2>
            <div className="space-y-3">
              {duringStorm.map(item => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    checkedItems.includes(item.id) ? 'bg-green-50' : 'hover:bg-gray-50'
                  } ${item.critical ? 'border-2 border-red-400' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(item.id)}
                    onChange={() => toggleCheck(item.id)}
                    className="mt-1 w-5 h-5"
                  />
                  <span className={`flex-1 ${checkedItems.includes(item.id) ? 'line-through text-gray-500' : ''}`}>
                    {item.text}
                    {item.critical && <span className="text-red-600 font-bold ml-2">CRITICAL</span>}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Immediate After */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-red-600 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              IMMEDIATELY AFTER STORM
            </h2>
            <div className="space-y-3">
              {immediateAfter.map(item => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    checkedItems.includes(item.id) ? 'bg-green-50' : 'hover:bg-gray-50'
                  } ${item.critical ? 'border-2 border-red-400' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(item.id)}
                    onChange={() => toggleCheck(item.id)}
                    className="mt-1 w-5 h-5"
                  />
                  <span className={`flex-1 ${checkedItems.includes(item.id) ? 'line-through text-gray-500' : ''}`}>
                    {item.text}
                    {item.critical && <span className="text-red-600 font-bold ml-2">CRITICAL</span>}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* First 24 Hours */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              FIRST 24 HOURS
            </h2>
            <div className="space-y-3">
              {first24Hours.map(item => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    checkedItems.includes(item.id) ? 'bg-green-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(item.id)}
                    onChange={() => toggleCheck(item.id)}
                    className="mt-1 w-5 h-5"
                  />
                  <span className={`flex-1 ${checkedItems.includes(item.id) ? 'line-through text-gray-500' : ''}`}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Insurance Steps */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-green-600 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              INSURANCE DOCUMENTATION
            </h2>
            <div className="space-y-3">
              {insuranceSteps.map(item => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    checkedItems.includes(item.id) ? 'bg-green-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(item.id)}
                    onChange={() => toggleCheck(item.id)}
                    className="mt-1 w-5 h-5"
                  />
                  <span className={`flex-1 ${checkedItems.includes(item.id) ? 'line-through text-gray-500' : ''}`}>
                    {item.text}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Important Tips */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Critical Reminders</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-purple-50 border-2 border-purple-400 rounded-lg p-4">
              <Home className="w-8 h-8 text-purple-600 mb-2" />
              <h3 className="font-bold mb-2">Temporary Repairs</h3>
              <p className="text-sm">Make temporary repairs to prevent further damage. Keep all receipts for insurance.</p>
            </div>
            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4">
              <Camera className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-bold mb-2">Document Everything</h3>
              <p className="text-sm">Take photos before, during, and after cleanup. Document all damage thoroughly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Need Storm Damage Help?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/whos-first"
              className="bg-purple-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-purple-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Find Emergency Contractors
            </Link>
            <Link
              href="/guides/storm-damage"
              className="bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <CheckSquare className="w-5 h-5" />
              Storm Recovery Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
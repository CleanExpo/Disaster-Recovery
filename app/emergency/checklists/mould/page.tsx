'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckSquare, AlertTriangle, Clock, Phone, Shield, Heart, Microscope, Home } from 'lucide-react';

export default function MouldChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleCheck = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const immediateActions = [
    { id: 'assess-size', text: 'Assess mould area (if > 10 sq ft, call professionals)', critical: true },
    { id: 'health-check', text: 'Monitor for health symptoms (respiratory, allergies)', critical: true },
    { id: 'isolate-area', text: 'Isolate affected area - close doors, seal vents', critical: true },
    { id: 'stop-moisture', text: 'Identify and stop moisture source', critical: true },
    { id: 'document-mould', text: 'Photograph all visible mould growth', critical: false },
    { id: 'notify-landlord', text: 'Notify landlord/property manager if renting', critical: false }
  ];

  const healthSafety = [
    { id: 'vulnerable-people', text: 'Remove children, elderly, immune-compromised individuals', critical: true },
    { id: 'ppe-gear', text: 'Use N95 mask, gloves, goggles if entering area', critical: true },
    { id: 'ventilation', text: 'Improve ventilation but avoid spreading spores', critical: false },
    { id: 'air-quality', text: 'Consider air quality testing', critical: false },
    { id: 'health-records', text: 'Document any health symptoms', critical: false },
    { id: 'medical-check', text: 'Seek medical attention for persistent symptoms', critical: false }
  ];

  const remediationSteps = [
    { id: 'professional-assess', text: 'Get professional mould assessment', critical: false },
    { id: 'moisture-meter', text: 'Check moisture levels in walls/floors', critical: false },
    { id: 'containment', text: 'Set up proper containment barriers', critical: false },
    { id: 'hepa-filter', text: 'Use HEPA air scrubbers during cleanup', critical: false },
    { id: 'remove-materials', text: 'Remove affected porous materials', critical: false },
    { id: 'antimicrobial', text: 'Apply antimicrobial treatments', critical: false }
  ];

  const preventionSteps = [
    { id: 'fix-leaks', text: 'Fix all water leaks immediately', critical: false },
    { id: 'reduce-humidity', text: 'Keep indoor humidity below 50%', critical: false },
    { id: 'improve-airflow', text: 'Improve air circulation in affected areas', critical: false },
    { id: 'regular-inspect', text: 'Regular inspection of prone areas', critical: false },
    { id: 'quick-dry', text: 'Dry wet areas within 24-48 hours', critical: false },
    { id: 'maintenance', text: 'Maintain HVAC systems regularly', critical: false }
  ];

  const mouldTypes = [
    { name: 'Black Mould (Stachybotrys)', danger: 'HIGH', color: 'bg-black text-white' },
    { name: 'Green Mould (Aspergillus)', danger: 'MEDIUM', color: 'bg-green-600 text-white' },
    { name: 'White Mould (Penicillium)', danger: 'MEDIUM', color: 'bg-gray-300 text-black' },
    { name: 'Yellow Mould (Aureobasidium)', danger: 'LOW', color: 'bg-yellow-400 text-black' }
  ];

  const calculateProgress = () => {
    const totalItems = [
      ...immediateActions,
      ...healthSafety,
      ...remediationSteps,
      ...preventionSteps
    ].length;
    return Math.round((checkedItems.length / totalItems) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-900 to-emerald-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <Microscope className="w-12 h-12 mr-4" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Mould Discovery Emergency Checklist
              </h1>
            </div>
            <p className="text-xl text-green-100">
              Health safety protocols and remediation steps for mould discovery
            </p>
            <div className="mt-6 bg-green-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Checklist Progress</span>
                <span>{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-green-950 rounded-full h-3">
                <div 
                  className="bg-yellow-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Health Warning */}
      <section className="bg-yellow-500 text-black py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <Heart className="w-6 h-6" />
            <p className="font-bold">
              HEALTH WARNING: Mould exposure can cause serious health issues
            </p>
          </div>
        </div>
      </section>

      {/* Mould Types */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold mb-4">Common Mould Types & Danger Levels</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {mouldTypes.map((mould, index) => (
              <div key={index} className={`rounded-lg p-4 ${mould.color}`}>
                <div className="font-bold text-sm">{mould.name}</div>
                <div className="text-xs mt-1">Danger: {mould.danger}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Checklists */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Immediate Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-red-600 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              IMMEDIATE ACTIONS
            </h2>
            <div className="space-y-3">
              {immediateActions.map(item => (
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

          {/* Health & Safety */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-yellow-600 flex items-center">
              <Heart className="w-6 h-6 mr-2" />
              HEALTH & SAFETY
            </h2>
            <div className="space-y-3">
              {healthSafety.map(item => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    checkedItems.includes(item.id) ? 'bg-green-50' : 'hover:bg-gray-50'
                  } ${item.critical ? 'border-2 border-yellow-400' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(item.id)}
                    onChange={() => toggleCheck(item.id)}
                    className="mt-1 w-5 h-5"
                  />
                  <span className={`flex-1 ${checkedItems.includes(item.id) ? 'line-through text-gray-500' : ''}`}>
                    {item.text}
                    {item.critical && <span className="text-yellow-600 font-bold ml-2">CRITICAL</span>}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Remediation Steps */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-green-600 flex items-center">
              <Home className="w-6 h-6 mr-2" />
              PROFESSIONAL REMEDIATION
            </h2>
            <div className="space-y-3">
              {remediationSteps.map(item => (
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

          {/* Prevention */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              PREVENTION MEASURES
            </h2>
            <div className="space-y-3">
              {preventionSteps.map(item => (
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

      {/* Health Symptoms */}
      <section className="py-8 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-red-900">Mould Exposure Symptoms</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-white rounded-lg p-4 border-2 border-red-300">
              <h3 className="font-bold text-red-700 mb-2">Mild Symptoms</h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Sneezing</li>
                <li>• Runny nose</li>
                <li>• Red eyes</li>
                <li>• Skin rash</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border-2 border-orange-300">
              <h3 className="font-bold text-orange-700 mb-2">Moderate Symptoms</h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Persistent cough</li>
                <li>• Wheezing</li>
                <li>• Headaches</li>
                <li>• Fatigue</li>
              </ul>
            </div>
            <div className="bg-white rounded-lg p-4 border-2 border-red-500">
              <h3 className="font-bold text-red-800 mb-2">Severe Symptoms</h3>
              <ul className="text-sm space-y-1 text-gray-700">
                <li>• Difficulty breathing</li>
                <li>• Chest tightness</li>
                <li>• Fever</li>
                <li>• Severe fatigue</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Need Professional Mould Help?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/whos-first"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Find Mould Specialists
            </Link>
            <Link
              href="/guides/mould"
              className="bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <CheckSquare className="w-5 h-5" />
              Complete Mould Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
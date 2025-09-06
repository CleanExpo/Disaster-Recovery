'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckSquare, AlertTriangle, Clock, Phone, Shield, X, Droplets, AlertCircle } from 'lucide-react';

export default function SewageChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleCheck = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const immediateActions = [
    { id: 'evacuate', text: 'EVACUATE affected areas immediately', critical: true },
    { id: 'no-contact', text: 'Avoid ALL contact with sewage water', critical: true },
    { id: 'turn-off-hvac', text: 'Turn off HVAC to prevent spread', critical: true },
    { id: 'shut-water', text: 'Shut off water supply if backup continues', critical: true },
    { id: 'call-emergency', text: 'Call emergency sewage cleanup services', critical: true },
    { id: 'document', text: 'Document damage from safe distance', critical: false }
  ];

  const healthSafety = [
    { id: 'no-children', text: 'Keep children and pets completely away', critical: true },
    { id: 'medical-conditions', text: 'Remove anyone with health conditions', critical: true },
    { id: 'no-diy', text: 'DO NOT attempt DIY cleanup', critical: true },
    { id: 'protective-gear', text: 'Only enter with full PPE if absolutely necessary', critical: false },
    { id: 'wash-exposed', text: 'Wash immediately if exposed to sewage', critical: false },
    { id: 'medical-attention', text: 'Seek medical care for any exposure', critical: false }
  ];

  const professionalSteps = [
    { id: 'licensed-only', text: 'Use only licensed biohazard cleanup crews', critical: true },
    { id: 'extraction', text: 'Professional sewage extraction required', critical: false },
    { id: 'sanitization', text: 'Complete sanitization of all surfaces', critical: false },
    { id: 'air-scrubbing', text: 'HEPA air scrubbing for airborne pathogens', critical: false },
    { id: 'disposal', text: 'Proper biohazard disposal procedures', critical: false },
    { id: 'clearance-test', text: 'Get clearance testing before reentry', critical: false }
  ];

  const insuranceSteps = [
    { id: 'call-immediately', text: 'Call insurance within 24 hours', critical: false },
    { id: 'sewage-coverage', text: 'Verify sewage backup coverage', critical: false },
    { id: 'document-source', text: 'Document the source of backup', critical: false },
    { id: 'itemize-damaged', text: 'List all contaminated items', critical: false },
    { id: 'keep-receipts', text: 'Keep all cleanup and medical receipts', critical: false },
    { id: 'temporary-housing', text: 'Document temporary housing costs', critical: false }
  ];

  const contaminants = [
    { name: 'E. coli', danger: 'Severe intestinal illness' },
    { name: 'Hepatitis A', danger: 'Liver infection' },
    { name: 'Salmonella', danger: 'Food poisoning symptoms' },
    { name: 'Parasites', danger: 'Various infections' },
    { name: 'Methane gas', danger: 'Toxic fumes' },
    { name: 'Hydrogen sulfide', danger: 'Poisonous gas' }
  ];

  const calculateProgress = () => {
    const totalItems = [
      ...immediateActions,
      ...healthSafety,
      ...professionalSteps,
      ...insuranceSteps
    ].length;
    return Math.round((checkedItems.length / totalItems) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-12 h-12 mr-4 text-yellow-400" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Sewage Backup Emergency Checklist
              </h1>
            </div>
            <p className="text-xl text-gray-200">
              BIOHAZARD: Critical safety protocols for sewage contamination
            </p>
            <div className="mt-6 bg-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Checklist Progress</span>
                <span>{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-gray-950 rounded-full h-3">
                <div 
                  className="bg-green-500 h-3 rounded-full transition-all duration-300"
                  style={{ width: `${calculateProgress()}%` }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Extreme Danger Alert */}
      <section className="bg-red-700 text-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="w-8 h-8 animate-pulse" />
            <p className="font-bold text-lg">
              EXTREME BIOHAZARD: Sewage contains deadly pathogens - EVACUATE IMMEDIATELY
            </p>
            <AlertTriangle className="w-8 h-8 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Contaminants Warning */}
      <section className="py-8 bg-red-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-100 border-2 border-red-600 rounded-lg p-6">
            <h2 className="text-xl font-bold mb-4 text-red-900 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2" />
              DEADLY CONTAMINANTS PRESENT
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              {contaminants.map((item, index) => (
                <div key={index} className="flex items-start gap-2">
                  <X className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-red-900">{item.name}:</span>
                    <span className="text-red-800 ml-2">{item.danger}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Checklists */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Immediate Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-4 border-red-500">
            <h2 className="text-2xl font-bold mb-4 text-red-600 flex items-center">
              <AlertTriangle className="w-6 h-6 mr-2" />
              IMMEDIATE EVACUATION ACTIONS
            </h2>
            <div className="space-y-3">
              {immediateActions.map(item => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    checkedItems.includes(item.id) ? 'bg-green-50' : 'hover:bg-gray-50'
                  } ${item.critical ? 'border-2 border-red-600 bg-red-50' : ''}`}
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
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8 border-2 border-yellow-500">
            <h2 className="text-2xl font-bold mb-4 text-yellow-600 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              HEALTH & SAFETY PROTOCOLS
            </h2>
            <div className="space-y-3">
              {healthSafety.map(item => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    checkedItems.includes(item.id) ? 'bg-green-50' : 'hover:bg-gray-50'
                  } ${item.critical ? 'border-2 border-yellow-500 bg-yellow-50' : ''}`}
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

          {/* Professional Cleanup */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-green-600 flex items-center">
              <Droplets className="w-6 h-6 mr-2" />
              PROFESSIONAL BIOHAZARD CLEANUP
            </h2>
            <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 mb-4">
              <p className="text-sm font-semibold text-yellow-800">
                ⚠️ NEVER attempt sewage cleanup yourself - Professional biohazard teams required
              </p>
            </div>
            <div className="space-y-3">
              {professionalSteps.map(item => (
                <label
                  key={item.id}
                  className={`flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    checkedItems.includes(item.id) ? 'bg-green-50' : 'hover:bg-gray-50'
                  } ${item.critical ? 'border-2 border-green-500' : ''}`}
                >
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(item.id)}
                    onChange={() => toggleCheck(item.id)}
                    className="mt-1 w-5 h-5"
                  />
                  <span className={`flex-1 ${checkedItems.includes(item.id) ? 'line-through text-gray-500' : ''}`}>
                    {item.text}
                    {item.critical && <span className="text-green-600 font-bold ml-2">REQUIRED</span>}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Insurance */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              INSURANCE DOCUMENTATION
            </h2>
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-4">
              <p className="text-sm text-blue-800">
                Note: Sewage backup often requires specific coverage endorsement
              </p>
            </div>
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

      {/* What NOT to Do */}
      <section className="py-8 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-center">NEVER DO THESE THINGS</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-red-900 rounded-lg p-4">
              <X className="w-8 h-8 mb-2" />
              <h3 className="font-bold mb-2">Never Touch</h3>
              <p className="text-sm">Do not touch sewage water or contaminated items without proper PPE</p>
            </div>
            <div className="bg-red-900 rounded-lg p-4">
              <X className="w-8 h-8 mb-2" />
              <h3 className="font-bold mb-2">Never Use</h3>
              <p className="text-sm">Do not use household cleaners - they won't kill pathogens</p>
            </div>
            <div className="bg-red-900 rounded-lg p-4">
              <X className="w-8 h-8 mb-2" />
              <h3 className="font-bold mb-2">Never Keep</h3>
              <p className="text-sm">Do not keep any porous materials that contacted sewage</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Need Emergency Biohazard Help?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/whos-first"
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Emergency Biohazard Teams
            </Link>
            <Link
              href="/services/sewage-cleanup"
              className="bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Sewage Cleanup Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckSquare, AlertTriangle, Clock, Phone, Camera, Shield, X, Droplets } from 'lucide-react';

export default function WaterDamageChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleCheck = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const immediateActions = [
    { id: 'stop-source', text: 'STOP THE WATER SOURCE - Turn off main water valve', critical: true },
    { id: 'power-off', text: 'Turn off electricity to affected areas', critical: true },
    { id: 'evacuate', text: 'Evacuate if water is near electrical outlets', critical: true },
    { id: 'call-emergency', text: 'Call emergency plumber if needed', critical: false },
    { id: 'photo-initial', text: 'Take photos/videos of initial damage', critical: false },
    { id: 'call-insurance', text: 'Call insurance company immediately', critical: false }
  ];

  const firstHourActions = [
    { id: 'remove-water', text: 'Start removing standing water (if safe)', critical: false },
    { id: 'move-items', text: 'Move furniture and valuables to dry areas', critical: false },
    { id: 'lift-carpets', text: 'Lift carpets and rugs off floor', critical: false },
    { id: 'open-windows', text: 'Open windows for ventilation (weather permitting)', critical: false },
    { id: 'document-items', text: 'List and photograph all damaged items', critical: false },
    { id: 'contact-restoration', text: 'Contact professional restoration service', critical: false }
  ];

  const first24Hours = [
    { id: 'extract-water', text: 'Professional water extraction started', critical: false },
    { id: 'setup-drying', text: 'Industrial drying equipment installed', critical: false },
    { id: 'moisture-readings', text: 'Document moisture readings', critical: false },
    { id: 'inventory-complete', text: 'Complete inventory of damaged items', critical: false },
    { id: 'temporary-repairs', text: 'Arrange temporary repairs to prevent further damage', critical: false },
    { id: 'accommodation', text: 'Arrange temporary accommodation if needed', critical: false }
  ];

  const insuranceSteps = [
    { id: 'claim-number', text: 'Record claim number and adjuster details', critical: false },
    { id: 'keep-damaged', text: 'Keep all damaged items until adjuster visits', critical: false },
    { id: 'receipt-folder', text: 'Create folder for all receipts and documents', critical: false },
    { id: 'emergency-repairs', text: 'Get approval for emergency repairs', critical: false },
    { id: 'adjuster-meeting', text: 'Schedule adjuster inspection', critical: false },
    { id: 'quotes', text: 'Obtain multiple restoration quotes', critical: false }
  ];

  const calculateProgress = () => {
    const totalItems = [
      ...immediateActions,
      ...firstHourActions,
      ...first24Hours,
      ...insuranceSteps
    ].length;
    return Math.round((checkedItems.length / totalItems) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <Droplets className="w-12 h-12 mr-4" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Water Damage Emergency Checklist
              </h1>
            </div>
            <p className="text-xl text-blue-100">
              Critical steps to minimize damage and ensure insurance coverage
            </p>
            <div className="mt-6 bg-blue-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Checklist Progress</span>
                <span>{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-blue-950 rounded-full h-3">
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
              DANGER: Never enter flooded areas with active electricity. Call 000 if life-threatening.
            </p>
          </div>
        </div>
      </section>

      {/* Immediate Actions */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-red-600 flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              IMMEDIATE ACTIONS (First 15 minutes)
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

          {/* First Hour Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-orange-600 flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              FIRST HOUR ACTIONS
            </h2>
            <div className="space-y-3">
              {firstHourActions.map(item => (
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

      {/* Important Reminders */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6">Important Reminders</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 border-2 border-yellow-400 rounded-lg p-4">
              <Camera className="w-8 h-8 text-yellow-600 mb-2" />
              <h3 className="font-bold mb-2">Document Everything</h3>
              <p className="text-sm">Take photos from multiple angles. Include close-ups of damage and wide shots showing extent.</p>
            </div>
            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4">
              <X className="w-8 h-8 text-red-600 mb-2" />
              <h3 className="font-bold mb-2">Don't Dispose</h3>
              <p className="text-sm">Keep all damaged items until insurance adjuster approves disposal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Need Professional Help?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/whos-first"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Find Emergency Contractors
            </Link>
            <Link
              href="/insurance-decoder"
              className="bg-green-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Understand Your Coverage
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
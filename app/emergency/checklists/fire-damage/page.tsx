'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckSquare, AlertTriangle, Clock, Phone, Camera, Shield, X, Flame } from 'lucide-react';

export default function FireDamageChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleCheck = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const immediateActions = [
    { id: 'ensure-safe', text: 'ENSURE FIRE IS COMPLETELY EXTINGUISHED', critical: true },
    { id: 'evacuate-unsafe', text: 'Stay out until fire department declares safe', critical: true },
    { id: 'call-000', text: 'Call 000 if any smoke or heat detected', critical: true },
    { id: 'utilities-off', text: 'Do NOT turn on utilities until inspected', critical: true },
    { id: 'call-insurance', text: 'Call insurance company immediately', critical: false },
    { id: 'photo-exterior', text: 'Take photos of exterior damage', critical: false }
  ];

  const afterClearance = [
    { id: 'document-all', text: 'Document all damage with photos/video', critical: false },
    { id: 'list-damaged', text: 'Create detailed list of damaged items', critical: false },
    { id: 'secure-property', text: 'Board up windows and secure property', critical: false },
    { id: 'cover-openings', text: 'Tarp roof openings to prevent water damage', critical: false },
    { id: 'ventilate', text: 'Open windows to ventilate (if safe)', critical: false },
    { id: 'restoration-call', text: 'Contact fire restoration specialists', critical: false }
  ];

  const first48Hours = [
    { id: 'soot-removal', text: 'Begin professional soot/smoke removal', critical: false },
    { id: 'salvage-items', text: 'Identify salvageable vs unsalvageable items', critical: false },
    { id: 'inventory-complete', text: 'Complete detailed inventory with values', critical: false },
    { id: 'temporary-housing', text: 'Arrange temporary accommodation', critical: false },
    { id: 'utilities-inspect', text: 'Schedule utility safety inspections', critical: false },
    { id: 'structural-assess', text: 'Get structural assessment from engineer', critical: false }
  ];

  const insuranceSteps = [
    { id: 'claim-filed', text: 'File formal insurance claim', critical: false },
    { id: 'adjuster-scheduled', text: 'Schedule adjuster inspection', critical: false },
    { id: 'keep-receipts', text: 'Keep all receipts for expenses', critical: false },
    { id: 'living-expenses', text: 'Document additional living expenses', critical: false },
    { id: 'restoration-quotes', text: 'Obtain multiple restoration quotes', critical: false },
    { id: 'contents-list', text: 'Provide detailed contents list to insurer', critical: false }
  ];

  const safetyWarnings = [
    'Smoke inhalation can occur hours after fire',
    'Structural damage may not be visible',
    'Electrical systems may be compromised',
    'Water from firefighting can cause additional damage',
    'Toxic fumes may persist in materials'
  ];

  const calculateProgress = () => {
    const totalItems = [
      ...immediateActions,
      ...afterClearance,
      ...first48Hours,
      ...insuranceSteps
    ].length;
    return Math.round((checkedItems.length / totalItems) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-900 to-orange-800 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <Flame className="w-12 h-12 mr-4" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Fire Damage Emergency Checklist
              </h1>
            </div>
            <p className="text-xl text-orange-100">
              Critical safety and recovery steps after a fire incident
            </p>
            <div className="mt-6 bg-red-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Checklist Progress</span>
                <span>{calculateProgress()}%</span>
              </div>
              <div className="w-full bg-red-950 rounded-full h-3">
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
      <section className="bg-red-700 text-white py-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="w-6 h-6" />
            <p className="font-bold">
              WARNING: Never enter fire-damaged property until cleared by fire department
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
          {/* Immediate Actions */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-red-600 flex items-center">
              <Clock className="w-6 h-6 mr-2" />
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

          {/* After Clearance */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-orange-600 flex items-center">
              <CheckSquare className="w-6 h-6 mr-2" />
              AFTER FIRE DEPT CLEARANCE
            </h2>
            <div className="space-y-3">
              {afterClearance.map(item => (
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

          {/* First 48 Hours */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 flex items-center">
              <Clock className="w-6 h-6 mr-2" />
              FIRST 48 HOURS
            </h2>
            <div className="space-y-3">
              {first48Hours.map(item => (
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
          <h2 className="text-2xl font-bold mb-6">Critical Tips</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border-2 border-red-400 rounded-lg p-4">
              <Camera className="w-8 h-8 text-red-600 mb-2" />
              <h3 className="font-bold mb-2">Document Smoke Damage</h3>
              <p className="text-sm">Smoke damage extends beyond visible areas. Document all rooms, including closets and HVAC systems.</p>
            </div>
            <div className="bg-blue-50 border-2 border-blue-400 rounded-lg p-4">
              <Shield className="w-8 h-8 text-blue-600 mb-2" />
              <h3 className="font-bold mb-2">Don't Clean Yet</h3>
              <p className="text-sm">Don't clean soot or smoke residue before insurance documents it. Improper cleaning can worsen damage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Need Immediate Help?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/whos-first"
              className="bg-red-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-red-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Find Fire Restoration Experts
            </Link>
            <Link
              href="/guides/fire-damage"
              className="bg-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-flex items-center justify-center gap-2"
            >
              <CheckSquare className="w-5 h-5" />
              Complete Fire Recovery Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  CheckSquare, AlertTriangle, Phone, Shield, Camera, 
  FileText, Home, Users, Heart, Package, Clock 
} from 'lucide-react';

export default function GeneralDisasterChecklistPage() {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleCheck = (itemId: string) => {
    setCheckedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const safetyFirst = [
    { id: 'evacuate-danger', text: 'Evacuate if in immediate danger', critical: true },
    { id: 'call-000', text: 'Call 000 for life-threatening emergencies', critical: true },
    { id: 'account-people', text: 'Account for all family members and pets', critical: true },
    { id: 'medical-needs', text: 'Address immediate medical needs', critical: true },
    { id: 'safe-shelter', text: 'Move to safe shelter if needed', critical: true },
    { id: 'utilities-off', text: 'Turn off utilities if instructed', critical: false }
  ];

  const documentationSteps = [
    { id: 'photo-everything', text: 'Photograph all damage from multiple angles', critical: false },
    { id: 'video-walkthrough', text: 'Record video walkthrough of damage', critical: false },
    { id: 'list-damaged', text: 'Create detailed list of damaged items', critical: false },
    { id: 'keep-damaged', text: 'Keep damaged items until adjuster approves disposal', critical: false },
    { id: 'receipt-folder', text: 'Start folder for all receipts and documents', critical: false },
    { id: 'damage-diary', text: 'Keep diary of events and timeline', critical: false }
  ];

  const insuranceSteps = [
    { id: 'call-insurer', text: 'Call insurance company immediately', critical: false },
    { id: 'claim-number', text: 'Record claim number and contact info', critical: false },
    { id: 'understand-coverage', text: 'Understand your coverage and deductibles', critical: false },
    { id: 'mitigate-damage', text: 'Take steps to prevent further damage', critical: false },
    { id: 'get-estimates', text: 'Get multiple repair estimates', critical: false },
    { id: 'track-expenses', text: 'Track all disaster-related expenses', critical: false }
  ];

  const recoverySteps = [
    { id: 'find-contractors', text: 'Research and verify restoration contractors', critical: false },
    { id: 'temporary-repairs', text: 'Make necessary temporary repairs', critical: false },
    { id: 'secure-property', text: 'Secure property against weather/theft', critical: false },
    { id: 'salvage-belongings', text: 'Salvage undamaged belongings', critical: false },
    { id: 'arrange-housing', text: 'Arrange temporary housing if needed', critical: false },
    { id: 'notify-employer', text: 'Notify employer and schools of situation', critical: false }
  ];

  const emergencyKit = [
    'Water (1 gallon per person per day)',
    'Non-perishable food (3-day supply)',
    'Battery-powered radio',
    'Flashlights and batteries',
    'First aid kit',
    'Medications (7-day supply)',
    'Important documents (copies)',
    'Cash and credit cards',
    'Phone chargers',
    'Basic tools'
  ];

  const calculateProgress = () => {
    const totalItems = [
      ...safetyFirst,
      ...documentationSteps,
      ...insuranceSteps,
      ...recoverySteps
    ].length;
    return Math.round((checkedItems.length / totalItems) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-900 to-blue-900 text-white py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <AlertTriangle className="w-12 h-12 mr-4" />
              <h1 className="text-3xl md:text-4xl font-bold">
                Universal Disaster Response Checklist
              </h1>
            </div>
            <p className="text-xl text-blue-100">
              Comprehensive checklist for any disaster or emergency situation
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

      {/* Emergency Contacts */}
      <section className="bg-red-600 text-white py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-lg font-bold mb-3">Emergency Contacts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <Phone className="w-6 h-6 mb-1" />
              <div className="font-bold">Emergency</div>
              <div>000</div>
            </div>
            <div>
              <Shield className="w-6 h-6 mb-1" />
              <div className="font-bold">SES</div>
              <div>132 500</div>
            </div>
            <div>
              <Heart className="w-6 h-6 mb-1" />
              <div className="font-bold">Poisons</div>
              <div>13 11 26</div>
            </div>
            <div>
              <AlertTriangle className="w-6 h-6 mb-1" />
              <div className="font-bold">Gas Leaks</div>
              <div>1800 808 526</div>
            </div>
          </div>
        </div>
      </section>

      {/* Checklists */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Safety First */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-red-600 flex items-center">
              <Heart className="w-6 h-6 mr-2" />
              SAFETY FIRST - IMMEDIATE ACTIONS
            </h2>
            <div className="space-y-3">
              {safetyFirst.map(item => (
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

          {/* Documentation */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-blue-600 flex items-center">
              <Camera className="w-6 h-6 mr-2" />
              DOCUMENTATION
            </h2>
            <div className="space-y-3">
              {documentationSteps.map(item => (
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

          {/* Insurance */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-green-600 flex items-center">
              <Shield className="w-6 h-6 mr-2" />
              INSURANCE PROCESS
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

          {/* Recovery */}
          <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold mb-4 text-purple-600 flex items-center">
              <Home className="w-6 h-6 mr-2" />
              RECOVERY STEPS
            </h2>
            <div className="space-y-3">
              {recoverySteps.map(item => (
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

      {/* Emergency Kit */}
      <section className="py-8 bg-yellow-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 flex items-center">
            <Package className="w-8 h-8 mr-2 text-yellow-600" />
            Emergency Kit Essentials
          </h2>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <div className="grid md:grid-cols-2 gap-4">
              {emergencyKit.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <CheckSquare className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Disaster Types Quick Links */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold mb-6 text-center">Specific Disaster Checklists</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <Link
              href="/emergency/checklists/water-damage"
              className="bg-blue-100 hover:bg-blue-200 rounded-lg p-4 text-center transition-colors"
            >
              <span className="text-2xl mb-2 block">💧</span>
              <span className="font-semibold">Water Damage</span>
            </Link>
            <Link
              href="/emergency/checklists/fire-damage"
              className="bg-red-100 hover:bg-red-200 rounded-lg p-4 text-center transition-colors"
            >
              <span className="text-2xl mb-2 block">🔥</span>
              <span className="font-semibold">Fire Damage</span>
            </Link>
            <Link
              href="/emergency/checklists/storm-damage"
              className="bg-purple-100 hover:bg-purple-200 rounded-lg p-4 text-center transition-colors"
            >
              <span className="text-2xl mb-2 block">⛈️</span>
              <span className="font-semibold">Storm Damage</span>
            </Link>
            <Link
              href="/emergency/checklists/mould"
              className="bg-green-100 hover:bg-green-200 rounded-lg p-4 text-center transition-colors"
            >
              <span className="text-2xl mb-2 block">🦠</span>
              <span className="font-semibold">Mould Discovery</span>
            </Link>
            <Link
              href="/emergency/checklists/sewage"
              className="bg-gray-100 hover:bg-gray-200 rounded-lg p-4 text-center transition-colors"
            >
              <span className="text-2xl mb-2 block">🚰</span>
              <span className="font-semibold">Sewage Backup</span>
            </Link>
            <Link
              href="/whos-first"
              className="bg-orange-100 hover:bg-orange-200 rounded-lg p-4 text-center transition-colors"
            >
              <span className="text-2xl mb-2 block">🚨</span>
              <span className="font-semibold">Find Help Now</span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTAs */}
      <section className="py-12 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-bold mb-6">Need Professional Help?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/whos-first"
              className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <Phone className="w-5 h-5" />
              Find Emergency Contractors
            </Link>
            <Link
              href="/insurance-decoder"
              className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
            >
              <Shield className="w-5 h-5" />
              Insurance Help Center
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
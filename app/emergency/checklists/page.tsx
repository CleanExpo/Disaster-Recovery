'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { CheckSquare, AlertTriangle, Clock, Phone, Shield, Home } from 'lucide-react';

export default function EmergencyChecklistsPage() {
  const checklists = [
    {
      title: 'Water Damage Emergency',
      icon: '💧',
      urgency: 'IMMEDIATE',
      href: '/emergency/checklists/water-damage',
      description: 'Critical steps for burst pipes, flooding, and water ingress',
      timeframe: 'First 24 hours crucial'
    },
    {
      title: 'Fire & Smoke Damage',
      icon: '🔥',
      urgency: 'IMMEDIATE',
      href: '/emergency/checklists/fire-damage',
      description: 'Post-fire safety and recovery checklist',
      timeframe: 'Act within 48 hours'
    },
    {
      title: 'Storm & Wind Damage',
      icon: '⛈️',
      urgency: 'URGENT',
      href: '/emergency/checklists/storm-damage',
      description: 'Secure property and prevent further damage',
      timeframe: 'Secure within 12 hours'
    },
    {
      title: 'Mould Discovery',
      icon: '🦠',
      urgency: 'IMPORTANT',
      href: '/emergency/checklists/mould',
      description: 'Health safety and remediation steps',
      timeframe: 'Address within 72 hours'
    },
    {
      title: 'Sewage Backup',
      icon: '🚰',
      urgency: 'IMMEDIATE',
      href: '/emergency/checklists/sewage',
      description: 'Biohazard safety and cleanup protocol',
      timeframe: 'Evacuate immediately'
    },
    {
      title: 'General Disaster',
      icon: '🚨',
      urgency: 'VARIES',
      href: '/emergency/checklists/general',
      description: 'Universal disaster response checklist',
      timeframe: 'Assess and act'
    }
  ];

  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'IMMEDIATE': return 'bg-red-600 text-white';
      case 'URGENT': return 'bg-orange-600 text-white';
      case 'IMPORTANT': return 'bg-yellow-600 text-white';
      default: return 'bg-blue-600 text-white';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-red-900 to-red-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <CheckSquare className="w-16 h-16 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Emergency Response Checklists
            </h1>
            <p className="text-xl text-red-100 max-w-3xl mx-auto">
              Step-by-step guides for immediate action during disasters. Follow these critical checklists to protect life, property, and ensure proper insurance documentation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Alert Banner */}
      <section className="bg-yellow-500 text-black py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-3">
            <AlertTriangle className="w-6 h-6" />
            <p className="font-semibold">
              SAFETY FIRST: If in immediate danger, evacuate and call 000
            </p>
            <Phone className="w-5 h-5" />
          </div>
        </div>
      </section>

      {/* Checklists Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {checklists.map((checklist, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={checklist.href}
                  className="block bg-white rounded-lg shadow-lg hover:shadow-xl transition-all p-6 border-2 border-gray-200 hover:border-blue-400"
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{checklist.icon}</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${getUrgencyColor(checklist.urgency)}`}>
                      {checklist.urgency}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{checklist.title}</h3>
                  <p className="text-gray-600 mb-3">{checklist.description}</p>
                  <div className="flex items-center text-sm text-gray-500">
                    <Clock className="w-4 h-4 mr-1" />
                    {checklist.timeframe}
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Emergency Actions</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Phone className="w-12 h-12 text-red-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Emergency Contacts</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Emergency Services: 000</li>
                <li>• SES Storm/Flood: 132 500</li>
                <li>• Poisons Info: 13 11 26</li>
                <li>• Gas Leaks: 1800 808 526</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Shield className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Insurance Must-Dos</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Take photos immediately</li>
                <li>• Don't throw anything away</li>
                <li>• Keep all receipts</li>
                <li>• Call insurer within 24hrs</li>
              </ul>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <Home className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Property Safety</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Turn off utilities if needed</li>
                <li>• Document all damage</li>
                <li>• Secure the property</li>
                <li>• Prevent further damage</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Additional Resources</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <Link
              href="/whos-first"
              className="bg-blue-600 text-white py-4 px-6 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Find Emergency Contractors
            </Link>
            <Link
              href="/insurance-decoder"
              className="bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors"
            >
              Understand Your Insurance
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
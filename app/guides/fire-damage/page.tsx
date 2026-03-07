'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import Script from 'next/script';
import { generateArticleSchema } from '@/lib/seo';
import { StructuredData } from '@/components/seo/StructuredData';
import {
  Flame, 
  AlertTriangle, 
  Shield, 
  Clock, 
  Phone, 
  CheckCircle,
  Home,
  Building,
  Factory,
  Heart,
  TrendingUp,
  Users,
  Zap,
  Wind,
  Droplets,
  AlertCircle,
  FileText,
  Calculator,
  MapPin,
  ChevronRight,
  Info,
  BookOpen,
  HelpCircle
} from 'lucide-react';

function FireDamageGuidePageOriginal() {
  const [selectedClass, setSelectedClass] = useState('structure');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const fireClasses = {
    structure: {
      title: 'Structural Fire Damage',
      description: 'Direct flame damage to building materials',
      severity: 'High',
      timeline: '24-48 hours critical',
      restoration: '2-6 months typical',
      indicators: [
        'Charred wood and materials',
        'Weakened structural supports',
        'Melted metals and plastics',
        'Compromised load-bearing walls',
        'Foundation damage from extreme heat'
      ]
    },
    smoke: {
      title: 'Smoke Damage',
      description: 'Acidic residue and odour penetration',
      severity: 'Medium-High',
      timeline: '2-72 hours critical',
      restoration: '1-3 months typical',
      indicators: [
        'Black soot on surfaces',
        'Persistent smoke odour',
        'Discoloration of walls/ceilings',
        'HVAC system contamination',
        'Fabric and upholstery damage'
      ]
    },
    heat: {
      title: 'Heat Damage',
      description: 'Damage from extreme temperatures without direct flame',
      severity: 'Medium',
      timeline: '48-96 hours assessment',
      restoration: '2-8 weeks typical',
      indicators: [
        'Warped materials',
        'Melted synthetic materials',
        'Cracked glass and ceramics',
        'Paint bubbling and peeling',
        'Electrical system damage'
      ]
    },
    water: {
      title: 'Water & Chemical Damage',
      description: 'Secondary damage from firefighting efforts',
      severity: 'Medium',
      timeline: '24 hours critical',
      restoration: '1-2 months typical',
      indicators: [
        'Water saturation',
        'Chemical residue from suppressants',
        'Mould growth risk',
        'Electrical hazards',
        'Structural weakening'
      ]
    }
  };

  const emergencySteps = [
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Call Emergency Services',
      description: 'Ensure fire is completely extinguished',
      critical: true,
      timing: 'Immediate'
    },
    {
      icon: <AlertTriangle className="w-6 h-6" />,
      title: 'Safety Assessment',
      description: 'Do not enter until cleared by fire department',
      critical: true,
      timing: 'Before entry'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: 'Secure Property',
      description: 'Board up openings, fence off dangerous areas',
      critical: true,
      timing: 'Within 24 hours'
    },
    {
      icon: <FileText className="w-6 h-6" />,
      title: 'Document Everything',
      description: 'Photos, videos, inventory before cleanup',
      critical: true,
      timing: 'Before any changes'
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Contact Insurance',
      description: 'Report claim immediately, get claim number',
      critical: true,
      timing: 'Within 24-48 hours'
    },
    {
      icon: <Wind className="w-6 h-6" />,
      title: 'Ventilation',
      description: 'Professional smoke extraction required',
      critical: false,
      timing: 'Within 48-72 hours'
    },
    {
      icon: <Droplets className="w-6 h-6" />,
      title: 'Water Extraction',
      description: 'Remove firefighting water to prevent mould',
      critical: true,
      timing: 'Within 24-48 hours'
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Professional Assessment',
      description: 'Structural engineer and restoration expert evaluation',
      critical: true,
      timing: 'Within 48-72 hours'
    }
  ];

  const smokeTypes = [
    {
      type: 'Wet Smoke',
      source: 'Low-heat, smoldering fires',
      characteristics: 'Sticky, smeary, strong odour',
      difficulty: 'Very High',
      surfaces: ['Plastics', 'Rubber', 'Synthetic materials']
    },
    {
      type: 'Dry Smoke',
      source: 'High-temperature, fast-burning fires',
      characteristics: 'Dry, powdery residue',
      difficulty: 'Medium',
      surfaces: ['Wood', 'Paper', 'Natural materials']
    },
    {
      type: 'Protein Smoke',
      source: 'Kitchen fires, organic materials',
      characteristics: 'Nearly invisible, strong odour',
      difficulty: 'High',
      surfaces: ['All surfaces', 'Paint', 'Varnish']
    },
    {
      type: 'Fuel/Oil Smoke',
      source: 'Petroleum products, furnace puff-backs',
      characteristics: 'Sticky, difficult to clean',
      difficulty: 'Very High',
      surfaces: ['Fabrics', 'Upholstery', 'Carpets']
    }
  ];

  const restorationPhases = [
    {
      phase: 1,
      name: 'Emergency Response',
      duration: '0-48 hours',
      activities: [
        'Safety assessment',
        'Emergency board-up',
        'Water extraction',
        'Initial documentation'
      ]
    },
    {
      phase: 2,
      name: 'Damage Assessment',
      duration: '2-7 days',
      activities: [
        'Detailed inspection',
        'Structural evaluation',
        'Content inventory',
        'Restoration planning'
      ]
    },
    {
      phase: 3,
      name: 'Mitigation',
      duration: '1-2 weeks',
      activities: [
        'Smoke/soot removal',
        'Odour neutralisation',
        'Debris removal',
        'Salvage operations'
      ]
    },
    {
      phase: 4,
      name: 'Restoration',
      duration: '2-8 weeks',
      activities: [
        'Structural repairs',
        'Electrical/plumbing',
        'HVAC cleaning',
        'Surface restoration'
      ]
    },
    {
      phase: 5,
      name: 'Reconstruction',
      duration: '1-6 months',
      activities: [
        'Major structural work',
        'Room reconstruction',
        'Finishing work',
        'Final inspections'
      ]
    }
  ];

  const insuranceCoverage = [
    {
      item: 'Dwelling/Building',
      typically: 'Covered',
      notes: 'Structure repairs and rebuilding',
      watch: 'Policy limits and replacement cost'
    },
    {
      item: 'Personal Property',
      typically: 'Covered',
      notes: 'Contents and belongings',
      watch: 'Sub-limits for valuables'
    },
    {
      item: 'Additional Living Expenses',
      typically: 'Covered',
      notes: 'Temporary accommodation',
      watch: 'Time and dollar limits'
    },
    {
      item: 'Smoke Damage',
      typically: 'Covered',
      notes: 'Cleaning and deodourisation',
      watch: 'May require specific mention'
    },
    {
      item: 'Water Damage (firefighting)',
      typically: 'Covered',
      notes: 'Secondary damage from suppression',
      watch: 'Different from flood coverage'
    },
    {
      item: 'Debris Removal',
      typically: 'Limited Coverage',
      notes: 'Usually percentage of claim',
      watch: 'May need additional coverage'
    },
    {
      item: 'Trees/Landscaping',
      typically: 'Limited Coverage',
      notes: 'Often capped amount',
      watch: 'Low limits, per-item caps'
    },
    {
      item: 'Code Upgrades',
      typically: 'Variable',
      notes: 'Bringing building to current code',
      watch: 'May require ordinance coverage'
    }
  ];

  const faqs = [
    {
      question: 'How quickly should I act after a fire?',
      answer: 'Time is critical. Contact your insurance within 24-48 hours, secure the property immediately, and begin mitigation within 48-72 hours to prevent secondary damage from smoke, soot, and water.'
    },
    {
      question: 'Can I stay in my home after a fire?',
      answer: 'Never stay in a fire-damaged home until it has been inspected and cleared by professionals. Smoke inhalation, structural damage, and contaminated air can pose serious health risks.'
    },
    {
      question: 'What\'s the difference between smoke and soot damage?',
      answer: 'Soot is the black carbon residue left by burned materials, while smoke damage includes both residue and odour penetration. Smoke can travel further and penetrate porous materials deeply.'
    },
    {
      question: 'Will insurance cover all fire damage?',
      answer: 'Most policies cover fire damage, but coverage varies. Review your policy for limits, deductibles, and exclusions. Some policies may not fully cover code upgrades or have sub-limits for certain items.'
    },
    {
      question: 'How long does fire damage restoration take?',
      answer: 'Timeline varies by severity: minor smoke damage (1-2 weeks), moderate fire damage (1-3 months), major structural damage (3-12 months). Factors include permit approvals, material availability, and insurance processing.'
    },
    {
      question: 'Can I clean fire damage myself?',
      answer: 'Do not attempt DIY cleanup. Improper cleaning can spread contamination, cause permanent damage, and pose health risks. Professional equipment and techniques are essential for proper restoration.'
    },
    {
      question: 'What items can be salvaged after a fire?',
      answer: 'Non-porous items like glass and metal can often be cleaned. Some electronics may be restored. Porous materials (carpets, upholstery) heavily affected by smoke usually need replacement. Professional assessment is crucial.'
    },
    {
      question: 'How do I eliminate smoke odour?',
      answer: 'Smoke odour requires professional treatment including ozone generators, thermal fogging, or hydroxyl generators. Surface cleaning alone won\'t eliminate odours embedded in materials.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-900 to-red-900 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Flame className="w-20 h-20 text-orange-600" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Complete Fire Damage Guide
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-orange-800">
              Expert Fire & Smoke Damage Restoration Information for Australia
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/whos-first/fire-damage"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Emergency Response
              </Link>
              <Link
                href="/insurance-decoder/fire-damage"
                className="bg-white text-orange-900 hover:bg-orange-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Check Coverage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Steps */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              Emergency Response Steps
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {emergencySteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`p-6 rounded-lg border-2 ${
                    step.critical 
                      ? 'border-red-500 bg-red-50' 
                      : 'border-gray-200 bg-gray-50'
                  }`}
                >
                  <div className={`inline-flex p-3 rounded-full mb-4 ${
                    step.critical ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {step.icon}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                  <span className={`text-xs font-semibold px-2 py-1 rounded ${
                    step.critical ? 'bg-red-200 text-red-800' : 'bg-gray-200 text-gray-800'
                  }`}>
                    {step.timing}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Fire Damage Classes */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Info className="w-8 h-8 text-orange-600" />
              Types of Fire Damage
            </h2>
            
            <div className="mb-8 flex flex-wrap gap-4">
              {Object.keys(fireClasses).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedClass(key)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedClass === key
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'bg-white text-gray-600 hover:bg-orange-50'
                  }`}
                >
                  {fireClasses[key as keyof typeof fireClasses].title}
                </button>
              ))}
            </div>

            <motion.div
              key={selectedClass}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-xl shadow-xl p-8"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    {fireClasses[selectedClass as keyof typeof fireClasses].title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {fireClasses[selectedClass as keyof typeof fireClasses].description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600" />
                      <span className="font-semibold">Severity:</span>
                      <span className={`px-3 py-1 rounded text-sm font-semibold ${
                        fireClasses[selectedClass as keyof typeof fireClasses].severity === 'High'
                          ? 'bg-red-100 text-red-800'
                          : fireClasses[selectedClass as keyof typeof fireClasses].severity === 'Medium-High'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {fireClasses[selectedClass as keyof typeof fireClasses].severity}
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-orange-600" />
                      <span className="font-semibold">Critical Window:</span>
                      <span>{fireClasses[selectedClass as keyof typeof fireClasses].timeline}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <TrendingUp className="w-5 h-5 text-orange-600" />
                      <span className="font-semibold">Restoration Time:</span>
                      <span>{fireClasses[selectedClass as keyof typeof fireClasses].restoration}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4 text-lg">Key Indicators:</h4>
                  <ul className="space-y-2">
                    {fireClasses[selectedClass as keyof typeof fireClasses].indicators.map((indicator, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                        <span className="text-gray-600">{indicator}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Smoke Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Wind className="w-8 h-8 text-gray-600" />
              Understanding Smoke Damage Types
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {smokeTypes.map((smoke, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-lg p-6 border border-gray-200"
                >
                  <h3 className="text-xl font-bold mb-3">{smoke.type}</h3>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Source:</span> {smoke.source}</p>
                    <p><span className="font-semibold">Characteristics:</span> {smoke.characteristics}</p>
                    <p className="flex items-center gap-2">
                      <span className="font-semibold">Cleaning Difficulty:</span>
                      <span className={`px-2 py-1 rounded text-xs font-semibold ${
                        smoke.difficulty === 'Very High'
                          ? 'bg-red-100 text-red-800'
                          : smoke.difficulty === 'High'
                          ? 'bg-orange-100 text-orange-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {smoke.difficulty}
                      </span>
                    </p>
                    <div>
                      <span className="font-semibold">Affects:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {smoke.surfaces.map((surface, idx) => (
                          <span key={idx} className="bg-white px-2 py-1 rounded text-xs">
                            {surface}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Restoration Timeline */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Clock className="w-8 h-8 text-orange-600" />
              Restoration Timeline & Phases
            </h2>
            <div className="space-y-6">
              {restorationPhases.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-orange-600 text-white rounded-full flex items-center justify-center text-2xl font-bold">
                        {phase.phase}
                      </div>
                    </div>
                    <div className="flex-grow">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold">{phase.name}</h3>
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded text-sm font-semibold">
                          {phase.duration}
                        </span>
                      </div>
                      <div className="grid md:grid-cols-2 gap-2">
                        {phase.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-gray-600">{activity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Insurance Coverage */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              Insurance Coverage Overview
            </h2>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> This is general information only. Always review your specific policy 
                and consult with your insurance provider for accurate coverage details.
              </p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-4 text-left font-semibold">Coverage Item</th>
                    <th className="px-6 py-4 text-left font-semibold">Typically</th>
                    <th className="px-6 py-4 text-left font-semibold">Notes</th>
                    <th className="px-6 py-4 text-left font-semibold">Watch For</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {insuranceCoverage.map((item, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-medium">{item.item}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded text-sm font-semibold ${
                          item.typically === 'Covered'
                            ? 'bg-green-100 text-green-800'
                            : item.typically === 'Limited Coverage'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}>
                          {item.typically}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{item.notes}</td>
                      <td className="px-6 py-4 text-sm text-orange-600">{item.watch}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/insurance-decoder/fire-damage"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Calculator className="w-5 h-5" />
                Check Your Coverage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Property Type Considerations */}
      <section className="py-16 bg-gradient-to-br from-orange-50 to-red-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Building className="w-8 h-8 text-orange-600" />
              Property-Specific Considerations
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <Home className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Residential</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Family safety first priority</li>
                  <li>• Temporary accommodation needs</li>
                  <li>• Personal belongings salvage</li>
                  <li>• Emotional support considerations</li>
                  <li>• Pet safety and care</li>
                </ul>
                <Link
                  href="/property/residential/fire-damage"
                  className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Residential Guide <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <Building className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Commercial</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Business continuity planning</li>
                  <li>• Revenue loss mitigation</li>
                  <li>• Employee communication</li>
                  <li>• Customer notification</li>
                  <li>• Inventory documentation</li>
                </ul>
                <Link
                  href="/property/commercial/fire-damage"
                  className="mt-4 inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
                >
                  Commercial Guide <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <Factory className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Industrial</h3>
                <ul className="space-y-2 text-gray-600">
                  <li>• Equipment damage assessment</li>
                  <li>• Hazardous material handling</li>
                  <li>• Production line restoration</li>
                  <li>• Supply chain management</li>
                  <li>• Regulatory compliance</li>
                </ul>
                <Link
                  href="/property/industrial/fire-damage"
                  className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Industrial Guide <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-orange-600" />
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 rounded-lg"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-6 py-4 text-left font-semibold flex items-center justify-between hover:bg-gray-100 transition-colors rounded-lg"
                  >
                    <span>{faq.question}</span>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform ${
                        expandedFAQ === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-4 text-gray-600">
                      {faq.answer}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-gradient-to-br from-gray-100 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-orange-600" />
              Related Resources
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Link
                href="/guides/fire-damage/smoke-damage-cleaning-guide"
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <Wind className="w-10 h-10 text-gray-600 mb-3" />
                <h3 className="font-bold mb-2">Smoke Damage Cleaning Guide</h3>
                <p className="text-gray-600 text-sm">Deep dive into smoke damage types and restoration</p>
              </Link>
              
              <Link
                href="/guides/water-damage"
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <Droplets className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Water Damage Guide</h3>
                <p className="text-gray-600 text-sm">Secondary water damage from firefighting efforts</p>
              </Link>
              
              <Link
                href="/emergency/checklists/fire-damage"
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <FileText className="w-10 h-10 text-orange-600 mb-3" />
                <h3 className="font-bold mb-2">Fire Damage Checklist</h3>
                <p className="text-gray-600 text-sm">Step-by-step emergency response checklist</p>
              </Link>
              
              <Link
                href="/locations/sydney/fire-damage-restoration"
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <MapPin className="w-10 h-10 text-red-600 mb-3" />
                <h3 className="font-bold mb-2">Local Services</h3>
                <p className="text-gray-600 text-sm">Find fire damage restoration in your area</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-10">
            Frequently Asked Questions About Fire Damage
          </h2>
          {[
            {
              q: 'How long does fire damage restoration take?',
              a: 'Fire damage restoration typically takes 2–8 weeks depending on severity. Minor smoke damage (one room) can be addressed in 1–2 weeks. Moderate fire damage requiring structural repairs takes 4–6 weeks. Major fire damage with structural compromise, roof replacement, or extensive reconstruction can take 8–16 weeks. The process includes emergency board-up, water extraction (from firefighting), smoke and soot removal, structural drying, odour neutralisation, and reconstruction.'
            },
            {
              q: 'Is fire damage covered by home insurance in Australia?',
              a: 'Yes, fire damage is covered by virtually all Australian home and contents insurance policies under the "fire and explosion" peril. This includes structural damage, smoke damage, and firefighter water damage. Most policies also cover temporary accommodation (typically 12 months) while your home is uninhabitable. However, you must document all damage before any cleanup begins and lodge your claim promptly. We bill you directly — you then claim reimbursement from your insurer with the full documentation we provide.'
            },
            {
              q: 'Can smoke damage be cleaned or does everything need replacing?',
              a: 'Many smoke-damaged items can be professionally cleaned and restored, but it depends on the smoke type and material. Protein residue from kitchen fires cleans well from hard surfaces. Synthetic smoke (from burning plastics) is more corrosive and may permanently stain porous materials. Soft furnishings, carpets, and curtains often need replacing if heavily affected. Hard surfaces like countertops, tiles, and glass generally respond well to professional cleaning with specialised solvents. An IICRC-certified technician can assess what is salvageable versus what requires replacement.'
            },
            {
              q: 'Is it safe to enter my home after a fire?',
              a: 'Do not enter a fire-damaged property until the fire service has cleared it as structurally safe. Even after clearance, risks include weakened floors and ceilings, toxic soot particles, asbestos exposure (in pre-1990 homes), electrical hazards, and gas leaks. Always wear an N95 respirator, closed shoes, and long sleeves when entering. Avoid touching soot-covered surfaces with bare hands, as soot contains carcinogenic compounds. A professional make-safe assessment identifies and mitigates these hazards before any restoration work begins.'
            },
            {
              q: 'How do you remove smoke smell from a house?',
              a: 'Professional smoke odour removal uses a multi-step process: thermal fogging penetrates porous materials with deodorising agents, ozone treatment oxidises odour molecules in enclosed spaces, hydroxyl generators break down airborne particles, and air scrubbers with HEPA and carbon filtration remove residual particulates. For severe smoke, affected gyprock may need cutting out and replacing as drywall absorbs smoke compounds deep into its core. DIY methods like vinegar, baking soda, or air fresheners only mask the smell temporarily — they cannot reach smoke particles embedded in walls, insulation, and structural cavities.'
            },
            {
              q: 'What should I do immediately after a house fire?',
              a: 'After the fire service gives clearance: (1) Contact your insurer to lodge a claim. (2) Document all damage with timestamped photos and video before anything is touched or cleaned. (3) Contact a professional restoration company for emergency board-up and make-safe. (4) Do not attempt to clean soot yourself as improper cleaning can set stains permanently. (5) Secure valuables and important documents if safely accessible. (6) Arrange temporary accommodation — most policies cover this. (7) Keep all receipts for emergency expenses as these are typically reimbursable.'
            },
          ].map((faq, i) => (
            <details key={i} className="mb-4 bg-white rounded-lg shadow-sm border border-gray-200" {...(i === 0 ? { open: true } : {})}>
              <summary className="cursor-pointer p-5 font-semibold text-lg text-gray-900 hover:text-orange-600 transition-colors">
                {faq.q}
              </summary>
              <div className="px-5 pb-5 text-gray-700 leading-relaxed border-t border-gray-100 pt-4">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* AI Citation Block */}
      <section className="py-6 px-4 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-6 text-xs text-gray-500">
          <div><strong className="text-orange-900">Source:</strong> Disaster Recovery Australia — disasterrecovery.com.au</div>
          <div><strong className="text-orange-900">Category:</strong> Fire Damage Restoration</div>
          <div><strong className="text-orange-900">Last reviewed:</strong> <time dateTime="2026-02-26">26 February 2026</time></div>
          <div><strong className="text-orange-900">Standard:</strong> IICRC S520 certified practices</div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-600 to-red-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Immediate Fire Damage Assistance?
            </h2>
            <p className="text-xl mb-8 text-orange-800">
              Connect with certified fire damage restoration specialists in your area
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/whos-first/fire-damage"
                className="bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Get Emergency Help
              </Link>
              <Link
                href="/insurance-decoder/fire-damage"
                className="bg-orange-700 hover:bg-orange-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Check Insurance Coverage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
const fireDamageFaqSchema = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How long does fire damage restoration take?', acceptedAnswer: { '@type': 'Answer', text: 'Fire damage restoration typically takes 2–8 weeks depending on severity. Minor smoke damage (one room) can be addressed in 1–2 weeks. Moderate fire damage requiring structural repairs takes 4–6 weeks. Major fire damage with structural compromise can take 8–16 weeks.' } },
    { '@type': 'Question', name: 'Is fire damage covered by home insurance in Australia?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, fire damage is covered by virtually all Australian home and contents insurance policies under the fire and explosion peril. This includes structural damage, smoke damage, and firefighter water damage. Most policies also cover temporary accommodation.' } },
    { '@type': 'Question', name: 'Can smoke damage be cleaned or does everything need replacing?', acceptedAnswer: { '@type': 'Answer', text: 'Many smoke-damaged items can be professionally cleaned and restored depending on the smoke type and material. Hard surfaces generally respond well to professional cleaning. Soft furnishings may need replacing if heavily affected.' } },
    { '@type': 'Question', name: 'Is it safe to enter my home after a fire?', acceptedAnswer: { '@type': 'Answer', text: 'Do not enter a fire-damaged property until the fire service has cleared it as structurally safe. Risks include weakened floors, toxic soot particles, asbestos exposure in pre-1990 homes, electrical hazards, and gas leaks.' } },
    { '@type': 'Question', name: 'How do you remove smoke smell from a house?', acceptedAnswer: { '@type': 'Answer', text: 'Professional smoke odour removal uses thermal fogging, ozone treatment, hydroxyl generators, and HEPA air scrubbers. For severe smoke, affected gyprock may need replacing. DIY methods only mask the smell temporarily.' } },
    { '@type': 'Question', name: 'What should I do immediately after a house fire?', acceptedAnswer: { '@type': 'Answer', text: 'After fire service clearance: contact your insurer, document all damage with photos before cleanup, contact a professional for emergency board-up, do not clean soot yourself, secure valuables, arrange temporary accommodation, and keep all receipts.' } },
  ],
});

const fireDamageArticleSchema = generateArticleSchema({
  headline: 'Fire Damage Restoration Guide Australia',
  description: 'Comprehensive guide to fire and smoke damage restoration including emergency steps, restoration process, insurance claims, and safety information.',
  image: '/images/guides/fire-damage.webp',
  author: 'Disaster Recovery Team',
  datePublished: '2024-11-15',
  dateModified: '2026-02-26',
});

export default function FireDamageGuidePage() {
  return (
    <>
      <StructuredData data={fireDamageArticleSchema} />
      <Script id="fire-damage-faq-schema" type="application/ld+json" strategy="afterInteractive">
        {fireDamageFaqSchema}
      </Script>
      <AntigravityNavbar />
      <FireDamageGuidePageOriginal />
      <AntigravityFooter />
    </>
  );
}

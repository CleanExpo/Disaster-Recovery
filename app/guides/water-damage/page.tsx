'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Droplets, AlertTriangle, Clock, Shield, FileText, Phone, CheckCircle, XCircle, Info, Home, Building, Factory, ArrowRight, AlertCircle, Zap } from 'lucide-react';
import Link from 'next/link';

export default function WaterDamageGuidePage() {
  const [selectedCategory, setSelectedCategory] = useState<'clean' | 'grey' | 'black' | null>(null);

  const waterCategories = {
    clean: {
      title: 'Category 1: Clean Water',
      description: 'Water from a clean source like broken water supply lines or overflowing sinks',
      sources: ['Broken water pipes', 'Overflowing bathtubs/sinks', 'Rainwater', 'Melting ice/snow'],
      risks: 'Low initial health risk but can progress to Category 2 within 48 hours',
      response: 'Can be safely cleaned if addressed within 48 hours',
      icon: '💧',
      color: 'blue'
    },
    grey: {
      title: 'Category 2: Grey Water',
      description: 'Water with significant contamination that could cause illness',
      sources: ['Washing machine overflow', 'Dishwasher overflow', 'Toilet overflow (urine only)', 'Sump pump failures'],
      risks: 'Can cause illness if ingested or contacted with open wounds',
      response: 'Requires protective equipment and professional cleaning',
      icon: '⚠️',
      color: 'yellow'
    },
    black: {
      title: 'Category 3: Black Water',
      description: 'Highly contaminated water containing harmful bacteria and pathogens',
      sources: ['Sewage backup', 'Flooding from rivers/streams', 'Toilet overflow with feces', 'Standing water with microbial growth'],
      risks: 'Serious health hazard - can cause severe illness or death',
      response: 'Requires immediate professional remediation with full PPE',
      icon: '☠️',
      color: 'red'
    }
  };

  const damageClasses = [
    {
      class: 'Class 1',
      description: 'Minimal water absorption',
      affected: 'Part of a room with minimal carpet/materials affected',
      dryTime: '2-3 days',
      icon: '▫'
    },
    {
      class: 'Class 2',
      description: 'Significant water absorption',
      affected: 'Entire room including walls up to 24 inches',
      dryTime: '3-5 days',
      icon: '◽'
    },
    {
      class: 'Class 3',
      description: 'Greatest water absorption',
      affected: 'Walls, ceilings, insulation, carpet, sub-floor saturated',
      dryTime: '5-7 days',
      icon: '◼'
    },
    {
      class: 'Class 4',
      description: 'Specialty drying situations',
      affected: 'Hardwood, plaster, brick, concrete, stone materials',
      dryTime: '7+ days',
      icon: '⬛'
    }
  ];

  const timeline = [
    {
      time: '0-2 Hours',
      status: 'critical',
      actions: [
        'Stop water source if safe',
        'Call Disaster Recovery',
        'Document with photos/video',
        'Remove valuable items'
      ]
    },
    {
      time: '2-24 Hours',
      status: 'urgent',
      actions: [
        'Extract standing water',
        'Start drying process',
        'Notify insurance',
        'Begin mitigation'
      ]
    },
    {
      time: '24-48 Hours',
      status: 'important',
      actions: [
        'Complete water extraction',
        'Set up drying equipment',
        'Monitor moisture levels',
        'Prevent mould growth'
      ]
    },
    {
      time: '48-72 Hours',
      status: 'monitoring',
      actions: [
        'Continue drying',
        'Check for mould',
        'Assess damaged materials',
        'Plan restoration'
      ]
    }
  ];

  const propertyTypes = [
    {
      type: 'Residential',
      icon: Home,
      specifics: ['Living areas', 'Bedrooms', 'Basements', 'Personal belongings'],
      link: '/guides/water-damage/residential'
    },
    {
      type: 'Commercial',
      icon: Building,
      specifics: ['Office spaces', 'Inventory', 'Equipment', 'Documents'],
      link: '/guides/water-damage/commercial'
    },
    {
      type: 'Industrial',
      icon: Factory,
      specifics: ['Machinery', 'Production areas', 'Warehouses', 'Raw materials'],
      link: '/guides/water-damage/industrial'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('/water-pattern.svg')] opacity-10" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Droplets className="w-12 h-12" />
              <h1 className="text-5xl md:text-6xl font-bold">
                Water Damage Complete Guide
              </h1>
            </div>
            <p className="text-2xl mb-4 text-blue-200">
              Everything You Need to Know About Water Damage Restoration
            </p>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              From emergency response to complete restoration - your comprehensive resource 
              for understanding and managing water damage in any property.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                href="/whos-first/water-damage"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-all hover:scale-105"
              >
                Emergency? Who to Call First
              </Link>
              <Link
                href="/is-it-covered/water-damage"
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 transition-all"
              >
                Check Insurance Coverage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Water Categories Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Understanding Water Categories
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Not all water damage is the same. The category determines health risks and restoration approach.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            {Object.entries(waterCategories).map(([key, category]) => (
              <motion.div
                key={key}
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedCategory(key as any)}
                className={`cursor-pointer rounded-xl shadow-lg overflow-hidden border-2 transition-all ${
                  selectedCategory === key ? 'border-blue-500 shadow-xl' : 'border-transparent'
                }`}
              >
                <div className={`p-6 ${
                  category.color === 'blue' ? 'bg-blue-50' :
                  category.color === 'yellow' ? 'bg-yellow-50' :
                  'bg-red-50'
                }`}>
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                  <p className="text-gray-700 mb-4">{category.description}</p>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="font-semibold text-sm text-gray-600 mb-1">Common Sources:</p>
                      <ul className="text-sm text-gray-700 space-y-1">
                        {category.sources.map((source, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" />
                            {source}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className={`p-3 rounded-lg ${
                      category.color === 'blue' ? 'bg-blue-100' :
                      category.color === 'yellow' ? 'bg-yellow-100' :
                      'bg-red-100'
                    }`}>
                      <p className="text-sm font-semibold mb-1">Health Risk:</p>
                      <p className="text-sm">{category.risks}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Damage Classes Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Water Damage Classes: Extent of Damage
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {damageClasses.map((dmgClass, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-lg p-6"
              >
                <div className="text-3xl mb-3">{dmgClass.icon}</div>
                <h3 className="text-xl font-bold mb-2">{dmgClass.class}</h3>
                <p className="text-gray-700 mb-3">{dmgClass.description}</p>
                <div className="space-y-2 text-sm">
                  <div>
                    <span className="font-semibold">Affected:</span>
                    <p className="text-gray-600">{dmgClass.affected}</p>
                  </div>
                  <div className="pt-2 border-t">
                    <span className="font-semibold">Typical Dry Time:</span>
                    <p className="text-blue-600 font-semibold">{dmgClass.dryTime}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Critical Timeline Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Critical Response Timeline
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            Every hour matters in water damage. Here's what needs to happen when.
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {timeline.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`rounded-lg shadow-lg overflow-hidden ${
                  phase.status === 'critical' ? 'border-2 border-red-500' :
                  phase.status === 'urgent' ? 'border-2 border-orange-500' :
                  phase.status === 'important' ? 'border-2 border-yellow-500' :
                  'border-2 border-green-500'
                }`}
              >
                <div className={`p-4 text-white font-bold text-center ${
                  phase.status === 'critical' ? 'bg-red-500' :
                  phase.status === 'urgent' ? 'bg-orange-500' :
                  phase.status === 'important' ? 'bg-yellow-500' :
                  'bg-green-500'
                }`}>
                  <Clock className="w-6 h-6 mx-auto mb-2" />
                  {phase.time}
                </div>
                <div className="p-4 bg-white">
                  <p className="font-bold mb-3 text-center capitalize">{phase.status}</p>
                  <ul className="space-y-2">
                    {phase.actions.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm">
                        <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
                        {action}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Type Specific Guides */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Property-Specific Water Damage Guides
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {propertyTypes.map((property, index) => {
              const Icon = property.icon;
              return (
                <Link
                  key={index}
                  href={property.link}
                  className="group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="bg-white rounded-xl shadow-lg p-8 hover:shadow-xl transition-all"
                  >
                    <Icon className="w-12 h-12 text-blue-600 mb-4" />
                    <h3 className="text-2xl font-bold mb-3">{property.type} Properties</h3>
                    <p className="text-gray-600 mb-4">Specialized guidance for {property.type.toLowerCase()} water damage</p>
                    <div className="space-y-2">
                      {property.specifics.map((specific, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          {specific}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 flex items-center text-blue-600 font-semibold group-hover:gap-3 transition-all gap-2">
                      Learn More
                      <ArrowRight className="w-5 h-5" />
                    </div>
                  </motion.div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common Sources Section */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Common Water Damage Sources
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { source: 'Burst Pipes', link: '/guides/water-damage/burst-pipes', icon: '🔧', frequency: 'Most Common' },
              { source: 'Roof Leaks', link: '/guides/water-damage/roof-leaks', icon: '🏠', frequency: 'Common' },
              { source: 'Appliance Failure', link: '/guides/water-damage/appliance-failure', icon: '🔌', frequency: 'Common' },
              { source: 'Sewage Backup', link: '/guides/water-damage/sewage-backup', icon: '🚽', frequency: 'Serious' },
              { source: 'Storm Flooding', link: '/guides/water-damage/storm-flooding', icon: '⛈️', frequency: 'Seasonal' },
              { source: 'Foundation Leaks', link: '/guides/water-damage/foundation-leaks', icon: '🏗️', frequency: 'Hidden' }
            ].map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-all border-2 border-transparent hover:border-blue-500"
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{item.icon}</span>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {item.frequency}
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{item.source}</h3>
                <p className="text-gray-600 text-sm">
                  Complete guide to {item.source.toLowerCase()} water damage
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance and Coverage */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold mb-8 text-center">
              Water Damage Insurance Coverage
            </h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4 text-green-600">
                  ✓ Usually Covered
                </h3>
                <ul className="space-y-3">
                  {[
                    'Sudden burst pipes',
                    'Storm-related water damage',
                    'Accidental overflow',
                    'Ice dam damage',
                    'Wind-driven rain'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div>
                <h3 className="text-xl font-bold mb-4 text-red-600">
                  ✗ Often Excluded
                </h3>
                <ul className="space-y-3">
                  {[
                    'Gradual leaks',
                    'Lack of maintenance',
                    'Flood damage (needs separate coverage)',
                    'Sewage backup (may need endorsement)',
                    'Seepage through foundation'
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="mt-8 text-center">
              <Link
                href="/insurance-decoder/water-damage"
                className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
              >
                <FileText className="w-5 h-5" />
                Decode Your Policy Coverage
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Related Water Damage Resources
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Link
              href="/emergency/checklists/water-damage"
              className="bg-red-50 rounded-lg p-6 hover:shadow-lg transition-all"
            >
              <Zap className="w-8 h-8 text-red-600 mb-3" />
              <h3 className="font-bold mb-2">Emergency Checklist</h3>
              <p className="text-sm text-gray-600">Immediate actions for water damage</p>
            </Link>
            
            <Link
              href="/guides/mould-prevention"
              className="bg-green-50 rounded-lg p-6 hover:shadow-lg transition-all"
            >
              <Shield className="w-8 h-8 text-green-600 mb-3" />
              <h3 className="font-bold mb-2">Mould Prevention</h3>
              <p className="text-sm text-gray-600">Stop mould before it starts</p>
            </Link>
            
            <Link
              href="/guides/drying-process"
              className="bg-blue-50 rounded-lg p-6 hover:shadow-lg transition-all"
            >
              <Info className="w-8 h-8 text-blue-600 mb-3" />
              <h3 className="font-bold mb-2">Drying Process</h3>
              <p className="text-sm text-gray-600">Professional drying explained</p>
            </Link>
            
            <Link
              href="/whos-first/water-damage"
              className="bg-purple-50 rounded-lg p-6 hover:shadow-lg transition-all"
            >
              <Phone className="w-8 h-8 text-purple-600 mb-3" />
              <h3 className="font-bold mb-2">Who to Call First</h3>
              <p className="text-sm text-gray-600">Get the right help immediately</p>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Experiencing Water Damage Now?
          </h2>
          <p className="text-xl mb-8">
            Don't wait - every minute counts. Our 24/7 emergency team is ready to respond immediately.
          </p>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
            <p className="text-2xl font-bold mb-4">Remember the Critical First Steps:</p>
            <div className="grid md:grid-cols-3 gap-4 text-left max-w-2xl mx-auto">
              <div className="flex items-start gap-3">
                <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">1</span>
                <p>Stop the water source if safe</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">2</span>
                <p>Call us immediately</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="bg-white/20 rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 font-bold">3</span>
                <p>Document everything</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:1800000000"
              className="bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-lg font-bold text-xl flex items-center gap-3 shadow-2xl transition-all hover:scale-105"
            >
              <Phone className="w-7 h-7" />
              Emergency: 1800 000 000
            </a>
            <Link
              href="/emergency/water-damage"
              className="bg-white text-blue-900 px-10 py-5 rounded-lg font-bold text-xl shadow-2xl hover:bg-gray-100 transition-all"
            >
              Get Emergency Guide
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Cloud, 
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
  HelpCircle,
  TreePine,
  Umbrella,
  Waves
} from 'lucide-react';

export default function StormDamageGuidePage() {
  const [selectedStormType, setSelectedStormType] = useState('cyclone');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const stormTypes = {
    cyclone: {
      title: 'Cyclone/Hurricane',
      description: 'Category 1-5 tropical cyclones with extreme winds',
      windSpeed: '119-250+ km/h',
      primaryDamage: 'Structural damage, roof loss, debris impact',
      secondaryDamage: 'Storm surge, flooding, extended power outages',
      seasonality: 'November to April (Australia)',
      highRiskAreas: ['QLD Coast', 'NT Coast', 'WA Northwest']
    },
    thunderstorm: {
      title: 'Severe Thunderstorm',
      description: 'Intense storms with hail, lightning, and downbursts',
      windSpeed: '90-125 km/h',
      primaryDamage: 'Hail damage, lightning strikes, flash flooding',
      secondaryDamage: 'Power outages, fallen trees, water damage',
      seasonality: 'September to March (peak)',
      highRiskAreas: ['SE QLD', 'NSW', 'VIC', 'SA']
    },
    tornado: {
      title: 'Tornado',
      description: 'Rotating column of air with extreme localized damage',
      windSpeed: '115-500+ km/h',
      primaryDamage: 'Complete structural destruction in path',
      secondaryDamage: 'Debris missiles, vehicle damage',
      seasonality: 'Year-round (rare in Australia)',
      highRiskAreas: ['Inland NSW', 'QLD', 'SA', 'WA']
    },
    eastCoastLow: {
      title: 'East Coast Low',
      description: 'Intense low-pressure systems along east coast',
      windSpeed: '80-120 km/h',
      primaryDamage: 'Coastal erosion, flooding, wind damage',
      secondaryDamage: 'Storm surge, prolonged rainfall',
      seasonality: 'June to August (peak)',
      highRiskAreas: ['NSW Coast', 'QLD South', 'VIC East', 'TAS']
    }
  };

  const damageCategories = [
    {
      category: 'Roof Damage',
      icon: <Home className="w-6 h-6" />,
      percentage: '65%',
      description: 'Most common storm damage',
      types: [
        'Missing or lifted tiles/shingles',
        'Punctures from debris',
        'Compromised flashing',
        'Gutter damage',
        'Structural deformation'
      ],
      urgency: 'Immediate - prevent water ingress'
    },
    {
      category: 'Window & Door Damage',
      icon: <Building className="w-6 h-6" />,
      percentage: '45%',
      description: 'Breach points for water',
      types: [
        'Shattered glass',
        'Frame distortion',
        'Seal failure',
        'Security compromise',
        'Debris impact damage'
      ],
      urgency: 'Immediate - security and weatherproofing'
    },
    {
      category: 'Tree & Debris Impact',
      icon: <TreePine className="w-6 h-6" />,
      percentage: '40%',
      description: 'Secondary impact damage',
      types: [
        'Fallen trees on structures',
        'Branch penetration',
        'Vehicle damage',
        'Fence destruction',
        'Power line damage'
      ],
      urgency: 'High - safety hazard removal'
    },
    {
      category: 'Water Ingress',
      icon: <Droplets className="w-6 h-6" />,
      percentage: '55%',
      description: 'Follows structural damage',
      types: [
        'Ceiling water damage',
        'Wall saturation',
        'Floor flooding',
        'Insulation saturation',
        'Electrical system damage'
      ],
      urgency: 'Critical - prevent mould growth'
    }
  ];

  const emergencyActions = [
    {
      phase: 'During Storm',
      actions: [
        'Stay indoors away from windows',
        'Move to strongest part of building',
        'Monitor emergency broadcasts',
        'Avoid using electrical appliances',
        'Have emergency kit ready'
      ],
      critical: true
    },
    {
      phase: 'Immediately After',
      actions: [
        'Check for injuries first',
        'Assess structural safety',
        'Turn off utilities if damaged',
        'Document all damage',
        'Contact emergency services if needed'
      ],
      critical: true
    },
    {
      phase: 'Within 24 Hours',
      actions: [
        'Contact insurance company',
        'Temporary repairs (tarps, boards)',
        'Remove water if safe',
        'Secure property',
        'Begin inventory of damage'
      ],
      critical: true
    },
    {
      phase: 'Within 48-72 Hours',
      actions: [
        'Professional assessment',
        'Contractor quotes',
        'Detailed documentation',
        'Salvage operations',
        'Mould prevention measures'
      ],
      critical: false
    }
  ];

  const insuranceConsiderations = [
    {
      aspect: 'Storm vs Flood',
      important: 'Critical Distinction',
      details: 'Storm damage (wind/rain) typically covered, flood damage often excluded',
      action: 'Verify flood coverage separately'
    },
    {
      aspect: 'Maintenance Exclusions',
      important: 'Common Denial Reason',
      details: 'Pre-existing damage or poor maintenance can void claims',
      action: 'Document regular maintenance'
    },
    {
      aspect: 'Temporary Repairs',
      important: 'Covered Cost',
      details: 'Emergency repairs to prevent further damage usually reimbursed',
      action: 'Keep all receipts'
    },
    {
      aspect: 'Additional Living Expenses',
      important: 'Often Included',
      details: 'Accommodation costs if home uninhabitable',
      action: 'Check policy limits and duration'
    },
    {
      aspect: 'Debris Removal',
      important: 'May Have Limits',
      details: 'Usually percentage of dwelling sum insured',
      action: 'May need additional coverage'
    },
    {
      aspect: 'Named Storm Excess',
      important: 'Higher Deductible',
      details: 'Cyclones may trigger special excess amounts',
      action: 'Know your policy terms'
    }
  ];

  const restorationSteps = [
    {
      step: 1,
      title: 'Safety & Stabilization',
      duration: '0-48 hours',
      tasks: [
        'Structural engineer assessment',
        'Emergency tarping',
        'Board-up services',
        'Utility isolation',
        'Hazard removal'
      ]
    },
    {
      step: 2,
      title: 'Water Mitigation',
      duration: '24-72 hours',
      tasks: [
        'Water extraction',
        'Structural drying',
        'Dehumidification',
        'Anti-microbial treatment',
        'Content protection'
      ]
    },
    {
      step: 3,
      title: 'Debris Cleanup',
      duration: '2-7 days',
      tasks: [
        'Tree removal',
        'Debris clearing',
        'Damaged material removal',
        'Site cleanup',
        'Waste disposal'
      ]
    },
    {
      step: 4,
      title: 'Damage Assessment',
      duration: '3-7 days',
      tasks: [
        'Detailed inspection',
        'Scope of work',
        'Cost estimation',
        'Insurance coordination',
        'Permit applications'
      ]
    },
    {
      step: 5,
      title: 'Reconstruction',
      duration: '2-12 weeks',
      tasks: [
        'Structural repairs',
        'Roof restoration',
        'Window/door replacement',
        'Interior repairs',
        'Final inspections'
      ]
    }
  ];

  const regionalConsiderations = [
    {
      region: 'North Queensland',
      icon: <Waves className="w-6 h-6" />,
      risks: ['Cyclones', 'Storm surge', 'Flooding'],
      season: 'Nov-Apr',
      preparation: 'Cyclone shutters, elevated construction, emergency kits'
    },
    {
      region: 'Southeast QLD/Northern NSW',
      icon: <Cloud className="w-6 h-6" />,
      risks: ['Severe thunderstorms', 'Hail', 'East Coast Lows'],
      season: 'Oct-Mar',
      preparation: 'Hail protection, drainage systems, tree management'
    },
    {
      region: 'Southern States',
      icon: <Wind className="w-6 h-6" />,
      risks: ['Winter storms', 'Cold fronts', 'Hail'],
      season: 'May-Oct',
      preparation: 'Roof maintenance, gutter clearing, heating backup'
    },
    {
      region: 'Western Australia',
      icon: <Umbrella className="w-6 h-6" />,
      risks: ['Cyclones (north)', 'Winter storms (south)'],
      season: 'Variable',
      preparation: 'Regional specific measures, water management'
    }
  ];

  const faqs = [
    {
      question: 'What\'s the difference between storm damage and flood damage for insurance?',
      answer: 'Storm damage refers to damage from wind, rain entering through storm-created openings, hail, and lightning - typically covered by standard policies. Flood damage is rising water from rivers, lakes, or storm surge - often requires separate flood insurance. The source and path of water entry is crucial for claims.'
    },
    {
      question: 'How quickly should I act after storm damage?',
      answer: 'Immediately ensure safety, then act within 24-48 hours to prevent secondary damage. Contact insurance ASAP, document everything before cleanup, and begin mitigation (tarping, water removal) within 48 hours to prevent mould and further deterioration.'
    },
    {
      question: 'Can I make temporary repairs before insurance assessment?',
      answer: 'Yes, you\'re required to mitigate further damage. Make reasonable temporary repairs (tarps, boards, water removal) and document with photos before and after. Keep all receipts. Don\'t make permanent repairs or dispose of damaged items until insurance approves.'
    },
    {
      question: 'What if my home is uninhabitable after a storm?',
      answer: 'Most policies include Additional Living Expenses (ALE) covering temporary accommodation and increased living costs. Document all expenses, keep receipts, and check your policy limits and time restrictions. Notify your insurer immediately about displacement.'
    },
    {
      question: 'How do I prove storm damage vs pre-existing damage?',
      answer: 'Maintain dated photos of your property before storms, keep maintenance records, document the specific storm event (weather reports, news), and get professional assessments linking damage to the storm. Pre-storm preparation photos are valuable evidence.'
    },
    {
      question: 'What about damage from trees on my property?',
      answer: 'If your tree falls and damages your property, your insurance typically covers it. If a neighbor\'s tree damages your property, your insurance still covers it (then may pursue their insurance). Removal is usually covered only if the tree damaged a covered structure.'
    },
    {
      question: 'Will insurance cover upgrading to current building codes?',
      answer: 'Standard policies may not cover code upgrades. You may need "Ordinance or Law" coverage for bringing repairs up to current building codes. This is especially important in cyclone-prone areas with updated standards.'
    },
    {
      question: 'How long do I have to file a storm damage claim?',
      answer: 'While policies vary, notify your insurer immediately (within days) but you typically have 12 months to file a complete claim. However, delaying can complicate proving storm causation and may affect coverage if secondary damage occurs.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-sky-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-sky-900 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Cloud className="w-20 h-20 text-sky-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Storm Damage Recovery Guide
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-sky-100">
              Comprehensive Storm, Cyclone & Severe Weather Damage Information
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/whos-first/storm-damage"
                className="bg-sky-600 hover:bg-sky-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Emergency Storm Response
              </Link>
              <Link
                href="/insurance-decoder/storm-damage"
                className="bg-white text-sky-900 hover:bg-sky-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Storm Coverage Check
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Storm Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Wind className="w-8 h-8 text-sky-600" />
              Types of Storm Events in Australia
            </h2>
            
            <div className="mb-8 flex flex-wrap gap-4">
              {Object.keys(stormTypes).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedStormType(key)}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedStormType === key
                      ? 'bg-sky-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-sky-50 border border-gray-200'
                  }`}
                >
                  {stormTypes[key as keyof typeof stormTypes].title}
                </button>
              ))}
            </div>

            <motion.div
              key={selectedStormType}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-sky-50 to-white rounded-xl shadow-xl p-8 border border-sky-100"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-sky-900">
                    {stormTypes[selectedStormType as keyof typeof stormTypes].title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {stormTypes[selectedStormType as keyof typeof stormTypes].description}
                  </p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Wind className="w-5 h-5 text-sky-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">Wind Speed:</span>
                        <span className="ml-2 text-gray-700">
                          {stormTypes[selectedStormType as keyof typeof stormTypes].windSpeed}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-orange-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">Primary Damage:</span>
                        <span className="ml-2 text-gray-700">
                          {stormTypes[selectedStormType as keyof typeof stormTypes].primaryDamage}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                      <div>
                        <span className="font-semibold">Secondary Damage:</span>
                        <span className="ml-2 text-gray-700">
                          {stormTypes[selectedStormType as keyof typeof stormTypes].secondaryDamage}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h4 className="font-semibold mb-4 text-lg">Risk Profile</h4>
                    <div className="space-y-3">
                      <div>
                        <span className="font-semibold text-sm">Season:</span>
                        <p className="text-gray-700 mt-1">
                          {stormTypes[selectedStormType as keyof typeof stormTypes].seasonality}
                        </p>
                      </div>
                      <div>
                        <span className="font-semibold text-sm">High Risk Areas:</span>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {stormTypes[selectedStormType as keyof typeof stormTypes].highRiskAreas.map((area, idx) => (
                            <span key={idx} className="bg-sky-100 text-sky-800 px-3 py-1 rounded text-sm">
                              {area}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Damage Categories */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              Common Storm Damage Categories
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {damageCategories.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6 border border-gray-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-sky-100 rounded-full text-sky-600">
                        {category.icon}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{category.category}</h3>
                        <p className="text-sm text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    <span className="text-2xl font-bold text-sky-600">{category.percentage}</span>
                  </div>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold mb-2 text-sm">Common Types:</h4>
                    <ul className="space-y-1">
                      {category.types.map((type, idx) => (
                        <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span>{type}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="pt-4 border-t border-gray-200">
                    <span className="text-sm font-semibold text-orange-600">
                      Urgency: {category.urgency}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Actions Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Clock className="w-8 h-8 text-sky-600" />
              Emergency Response Timeline
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {emergencyActions.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-lg p-6 ${
                    phase.critical 
                      ? 'bg-red-50 border-2 border-red-300' 
                      : 'bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  <h3 className={`text-lg font-bold mb-4 ${
                    phase.critical ? 'text-red-800' : 'text-gray-800'
                  }`}>
                    {phase.phase}
                  </h3>
                  <ul className="space-y-2">
                    {phase.actions.map((action, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className={`w-4 h-4 mt-0.5 flex-shrink-0 ${
                          phase.critical ? 'text-red-600' : 'text-green-600'
                        }`} />
                        <span className="text-sm text-gray-700">{action}</span>
                      </li>
                    ))}
                  </ul>
                  {phase.critical && (
                    <div className="mt-4 pt-4 border-t border-red-200">
                      <span className="text-xs font-semibold text-red-600 uppercase">Critical Phase</span>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Restoration Process */}
      <section className="py-16 bg-gradient-to-br from-sky-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-green-600" />
              Storm Damage Restoration Process
            </h2>
            <div className="space-y-6">
              {restorationSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg overflow-hidden"
                >
                  <div className="flex items-stretch">
                    <div className="w-24 bg-gradient-to-br from-sky-600 to-sky-700 flex items-center justify-center">
                      <span className="text-3xl font-bold text-white">
                        {step.step}
                      </span>
                    </div>
                    <div className="flex-grow p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold">{step.title}</h3>
                        <span className="bg-sky-100 text-sky-800 px-3 py-1 rounded text-sm font-semibold">
                          {step.duration}
                        </span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {step.tasks.map((task, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded text-sm">
                            {task}
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

      {/* Insurance Considerations */}
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
              Storm Insurance Considerations
            </h2>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-blue-800">
                <strong>Disclaimer:</strong> Insurance coverage varies by policy and provider. 
                Always consult your specific policy documents and insurance provider for accurate information.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insuranceConsiderations.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
                >
                  <h3 className="font-bold text-lg mb-2">{item.aspect}</h3>
                  <span className={`inline-block px-3 py-1 rounded text-xs font-semibold mb-3 ${
                    item.important === 'Critical Distinction' 
                      ? 'bg-red-100 text-red-800'
                      : item.important === 'Common Denial Reason'
                      ? 'bg-orange-100 text-orange-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}>
                    {item.important}
                  </span>
                  <p className="text-gray-600 text-sm mb-3">{item.details}</p>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm font-semibold text-blue-600">
                      Action: {item.action}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/insurance-decoder/storm-damage"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Calculator className="w-5 h-5" />
                Check Your Storm Coverage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Regional Considerations */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-sky-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <MapPin className="w-8 h-8 text-red-600" />
              Regional Storm Considerations
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {regionalConsiderations.map((region, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-sky-100 rounded-full text-sky-600">
                      {region.icon}
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-xl font-bold mb-2">{region.region}</h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="font-semibold">Primary Risks:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {region.risks.map((risk, idx) => (
                              <span key={idx} className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                                {risk}
                              </span>
                            ))}
                          </div>
                        </div>
                        <p><span className="font-semibold">Peak Season:</span> {region.season}</p>
                        <p className="text-gray-600">{region.preparation}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Property Type Considerations */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Building className="w-8 h-8 text-sky-600" />
              Property-Specific Storm Considerations
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg p-6 border border-blue-100"
              >
                <Home className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Residential Properties</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Roof and gutter maintenance critical</li>
                  <li>• Tree trimming near structures</li>
                  <li>• Secure outdoor furniture and items</li>
                  <li>• Window protection systems</li>
                  <li>• Emergency kit and evacuation plan</li>
                </ul>
                <Link
                  href="/property/residential/storm-damage"
                  className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Residential Storm Guide <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-green-50 to-white rounded-lg shadow-lg p-6 border border-green-100"
              >
                <Building className="w-12 h-12 text-green-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Commercial Properties</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Business continuity planning</li>
                  <li>• Data backup and protection</li>
                  <li>• Inventory storm preparation</li>
                  <li>• Staff safety procedures</li>
                  <li>• Customer communication plan</li>
                </ul>
                <Link
                  href="/property/commercial/storm-damage"
                  className="mt-4 inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
                >
                  Commercial Storm Guide <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-purple-50 to-white rounded-lg shadow-lg p-6 border border-purple-100"
              >
                <Factory className="w-12 h-12 text-purple-600 mb-4" />
                <h3 className="text-xl font-bold mb-3">Industrial Properties</h3>
                <ul className="space-y-2 text-gray-600 text-sm">
                  <li>• Equipment protection protocols</li>
                  <li>• Hazardous material securing</li>
                  <li>• Large roof area vulnerability</li>
                  <li>• Supply chain contingencies</li>
                  <li>• Environmental compliance</li>
                </ul>
                <Link
                  href="/property/industrial/storm-damage"
                  className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Industrial Storm Guide <ChevronRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <HelpCircle className="w-8 h-8 text-sky-600" />
              Storm Damage FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-md border border-gray-200"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-6 py-4 text-left font-semibold flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <span>{faq.question}</span>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform text-sky-600 ${
                        expandedFAQ === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {expandedFAQ === index && (
                    <div className="px-6 pb-4 text-gray-600 border-t border-gray-100">
                      <p className="pt-4">{faq.answer}</p>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Related Resources */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-sky-600" />
              Related Storm Resources
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Link
                href="/guides/water-damage"
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-blue-100"
              >
                <Droplets className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Water Damage Guide</h3>
                <p className="text-gray-600 text-sm">Managing storm-related water intrusion</p>
              </Link>
              
              <Link
                href="/emergency/checklists/storm-damage"
                className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-orange-100"
              >
                <FileText className="w-10 h-10 text-orange-600 mb-3" />
                <h3 className="font-bold mb-2">Storm Checklist</h3>
                <p className="text-gray-600 text-sm">Pre and post-storm action items</p>
              </Link>
              
              <Link
                href="/whos-first/storm-damage"
                className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-green-100"
              >
                <Phone className="w-10 h-10 text-green-600 mb-3" />
                <h3 className="font-bold mb-2">Emergency Contacts</h3>
                <p className="text-gray-600 text-sm">Who to call for storm damage</p>
              </Link>
              
              <Link
                href="/locations/brisbane/storm-damage-repairs"
                className="bg-gradient-to-br from-red-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-red-100"
              >
                <MapPin className="w-10 h-10 text-red-600 mb-3" />
                <h3 className="font-bold mb-2">Local Services</h3>
                <p className="text-gray-600 text-sm">Find storm repairs in your area</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-sky-600 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Storm Damage Assistance?
            </h2>
            <p className="text-xl mb-8 text-sky-100">
              Connect with certified storm damage restoration specialists across Australia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/whos-first/storm-damage"
                className="bg-white text-sky-600 hover:bg-sky-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Get Storm Help Now
              </Link>
              <Link
                href="/insurance-decoder/storm-damage"
                className="bg-sky-700 hover:bg-sky-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Check Storm Coverage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
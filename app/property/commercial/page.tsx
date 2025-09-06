'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Building, 
  AlertTriangle, 
  Shield, 
  Clock, 
  Phone, 
  CheckCircle,
  Users,
  TrendingUp,
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
  Flame,
  Cloud,
  DollarSign,
  BarChart,
  ShoppingCart,
  Coffee,
  Store
} from 'lucide-react';

export default function CommercialPropertyPage() {
  const [selectedBusinessType, setSelectedBusinessType] = useState('office');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const businessTypes = {
    office: {
      name: 'Office Buildings',
      description: 'Corporate offices, co-working spaces, professional services',
      criticalConcerns: [
        'Business continuity planning',
        'Data and IT infrastructure protection',
        'Employee safety and communication',
        'Client service disruption',
        'Document and record preservation'
      ],
      averageDowntime: '5-15 days',
      revenueImpact: '$50,000 - $500,000+ per week',
      insuranceNeeds: [
        'Business interruption coverage',
        'Electronic equipment coverage',
        'Professional liability considerations',
        'Tenant improvements coverage',
        'Extra expense coverage'
      ]
    },
    retail: {
      name: 'Retail Stores',
      description: 'Shops, boutiques, department stores, shopping centers',
      criticalConcerns: [
        'Inventory damage and loss',
        'Customer access and safety',
        'Point of sale system recovery',
        'Perishable goods management',
        'Security during closure'
      ],
      averageDowntime: '7-21 days',
      revenueImpact: '$20,000 - $200,000+ per week',
      insuranceNeeds: [
        'Stock and inventory coverage',
        'Business interruption with seasonality',
        'Customer property coverage',
        'Spoilage coverage',
        'Theft during repairs coverage'
      ]
    },
    hospitality: {
      name: 'Hotels & Restaurants',
      description: 'Hotels, motels, restaurants, cafes, bars',
      criticalConcerns: [
        'Guest safety and relocation',
        'Food safety and spoilage',
        'Booking cancellations',
        'Health code compliance',
        'Kitchen equipment damage'
      ],
      averageDowntime: '10-30 days',
      revenueImpact: '$30,000 - $300,000+ per week',
      insuranceNeeds: [
        'Loss of booking income',
        'Food spoilage coverage',
        'Guest property liability',
        'Liquor liability considerations',
        'Equipment breakdown coverage'
      ]
    },
    medical: {
      name: 'Medical Facilities',
      description: 'Clinics, dental practices, medical centers, pharmacies',
      criticalConcerns: [
        'Patient care continuity',
        'Medical equipment damage',
        'Medication storage requirements',
        'Sterile environment restoration',
        'Patient record protection'
      ],
      averageDowntime: '3-10 days',
      revenueImpact: '$40,000 - $400,000+ per week',
      insuranceNeeds: [
        'Professional liability impact',
        'Medical equipment coverage',
        'Pharmaceutical stock coverage',
        'Patient record restoration',
        'Regulatory compliance costs'
      ]
    },
    warehouse: {
      name: 'Warehouses',
      description: 'Storage facilities, distribution centers, logistics hubs',
      criticalConcerns: [
        'Inventory protection and salvage',
        'Supply chain disruption',
        'Equipment and racking damage',
        'Client goods liability',
        'Access for emergency vehicles'
      ],
      averageDowntime: '5-20 days',
      revenueImpact: '$25,000 - $250,000+ per week',
      insuranceNeeds: [
        'Bailee coverage for client goods',
        'Equipment and machinery coverage',
        'Business interruption',
        'Debris removal coverage',
        'Contingent business interruption'
      ]
    },
    education: {
      name: 'Educational Facilities',
      description: 'Schools, universities, training centers, childcare',
      criticalConcerns: [
        'Student and staff safety',
        'Educational continuity',
        'Equipment and technology',
        'Regulatory compliance',
        'Parent communication'
      ],
      averageDowntime: '7-30 days',
      revenueImpact: '$10,000 - $100,000+ per week',
      insuranceNeeds: [
        'Student property coverage',
        'Educational interruption',
        'Equipment replacement',
        'Liability coverage',
        'Regulatory compliance costs'
      ]
    }
  };

  const disasterResponsePriorities = [
    {
      priority: 1,
      title: 'Life Safety',
      icon: <Users className="w-6 h-6" />,
      actions: [
        'Evacuate all personnel',
        'Account for all employees',
        'Contact emergency services',
        'Secure dangerous areas',
        'Establish communication hub'
      ],
      timeframe: 'Immediate'
    },
    {
      priority: 2,
      title: 'Asset Protection',
      icon: <Shield className="w-6 h-6" />,
      actions: [
        'Secure critical documents',
        'Protect IT infrastructure',
        'Salvage inventory',
        'Prevent further damage',
        'Document all damage'
      ],
      timeframe: '0-24 hours'
    },
    {
      priority: 3,
      title: 'Business Continuity',
      icon: <TrendingUp className="w-6 h-6" />,
      actions: [
        'Activate continuity plan',
        'Set up temporary operations',
        'Communicate with stakeholders',
        'Redirect operations',
        'Manage cash flow'
      ],
      timeframe: '24-48 hours'
    },
    {
      priority: 4,
      title: 'Recovery Planning',
      icon: <BarChart className="w-6 h-6" />,
      actions: [
        'Assess full damage scope',
        'Develop restoration timeline',
        'Coordinate with insurers',
        'Plan phased reopening',
        'Update stakeholders'
      ],
      timeframe: '48-72 hours'
    }
  ];

  const businessInterruptionFactors = [
    {
      factor: 'Revenue Loss',
      description: 'Direct loss of sales and service income',
      calculation: 'Daily revenue × Days closed',
      mitigation: 'Temporary locations, online services'
    },
    {
      factor: 'Fixed Costs',
      description: 'Ongoing expenses during closure',
      calculation: 'Rent + Utilities + Salaries + Loans',
      mitigation: 'Insurance coverage, expense reduction'
    },
    {
      factor: 'Extra Expenses',
      description: 'Additional costs to minimize loss',
      calculation: 'Temporary premises + Equipment rental + Overtime',
      mitigation: 'Extra expense insurance coverage'
    },
    {
      factor: 'Customer Loss',
      description: 'Long-term customer relationship impact',
      calculation: 'Customer lifetime value × Churn rate',
      mitigation: 'Communication, loyalty programs, quick recovery'
    },
    {
      factor: 'Market Share',
      description: 'Competitive position erosion',
      calculation: 'Market position before vs after',
      mitigation: 'Marketing, customer retention, quick reopening'
    },
    {
      factor: 'Supply Chain',
      description: 'Vendor and distribution disruption',
      calculation: 'Contract penalties + Alternative sourcing costs',
      mitigation: 'Contingent business interruption coverage'
    }
  ];

  const commercialInsuranceEssentials = [
    {
      coverage: 'Property Insurance',
      importance: 'Critical',
      includes: 'Building, contents, equipment, improvements',
      considerations: 'Replacement cost vs actual cash value, co-insurance requirements'
    },
    {
      coverage: 'Business Interruption',
      importance: 'Critical',
      includes: 'Lost income, fixed expenses, extra expenses',
      considerations: 'Waiting period, coverage period, proper valuation'
    },
    {
      coverage: 'Equipment Breakdown',
      importance: 'High',
      includes: 'Mechanical, electrical, pressure systems',
      considerations: 'Often excluded from standard property coverage'
    },
    {
      coverage: 'Cyber Liability',
      importance: 'High',
      includes: 'Data breach, system restoration, business interruption',
      considerations: 'Increasingly important for disaster-related system failures'
    },
    {
      coverage: 'General Liability',
      importance: 'High',
      includes: 'Third-party injuries, property damage',
      considerations: 'Customer injuries during/after disaster'
    },
    {
      coverage: 'Commercial Auto',
      importance: 'Medium',
      includes: 'Company vehicles, delivery fleet',
      considerations: 'Comprehensive coverage for disaster damage'
    }
  ];

  const recoveryTimeline = [
    {
      phase: 'Emergency Response',
      days: '0-2',
      tasks: [
        'Safety assessment',
        'Emergency mitigation',
        'Insurance notification',
        'Stakeholder communication'
      ]
    },
    {
      phase: 'Damage Assessment',
      days: '2-5',
      tasks: [
        'Professional inspection',
        'Inventory evaluation',
        'Scope development',
        'Cost estimation'
      ]
    },
    {
      phase: 'Planning & Approval',
      days: '5-10',
      tasks: [
        'Insurance approval',
        'Contractor selection',
        'Permit applications',
        'Material ordering'
      ]
    },
    {
      phase: 'Restoration Work',
      days: '10-30',
      tasks: [
        'Structural repairs',
        'Systems restoration',
        'Equipment replacement',
        'Cleaning and sanitization'
      ]
    },
    {
      phase: 'Reopening Preparation',
      days: '25-35',
      tasks: [
        'Final inspections',
        'Staff preparation',
        'Inventory restocking',
        'Marketing restart'
      ]
    }
  ];

  const costConsiderations = [
    {
      category: 'Direct Costs',
      items: [
        'Building repairs',
        'Equipment replacement',
        'Inventory loss',
        'Clean-up expenses',
        'Professional fees'
      ],
      typical: '$50,000 - $500,000+'
    },
    {
      category: 'Indirect Costs',
      items: [
        'Revenue loss',
        'Customer acquisition',
        'Employee overtime',
        'Temporary facilities',
        'Expedited shipping'
      ],
      typical: '$100,000 - $1,000,000+'
    },
    {
      category: 'Hidden Costs',
      items: [
        'Market share loss',
        'Reputation damage',
        'Employee turnover',
        'Compliance penalties',
        'Litigation risk'
      ],
      typical: 'Variable - potentially significant'
    }
  ];

  const faqs = [
    {
      question: 'How quickly should a commercial property respond to disaster damage?',
      answer: 'Commercial properties need immediate response within 1-2 hours for emergency mitigation. Every hour of delay can mean thousands in additional damage and extended business interruption. Have an emergency response plan and pre-selected restoration contractor for fastest response.'
    },
    {
      question: 'What\'s the difference between property damage and business interruption insurance?',
      answer: 'Property insurance covers physical damage to buildings, equipment, and inventory. Business interruption insurance covers lost income and ongoing expenses during closure. Both are essential - property insurance alone won\'t cover the revenue lost while repairs are underway.'
    },
    {
      question: 'How can businesses minimize downtime during restoration?',
      answer: 'Key strategies include: having a business continuity plan, setting up temporary operations, using phased restoration to reopen partially, expediting critical area repairs, and maintaining clear communication with customers about reopening timelines.'
    },
    {
      question: 'What documentation is needed for commercial insurance claims?',
      answer: 'Document everything: photos/videos of damage, inventory lists with values, financial records showing normal revenue, expense records during closure, restoration receipts, and communication logs. The more thorough your documentation, the smoother your claim process.'
    },
    {
      question: 'Should businesses use preferred vendor programs from insurers?',
      answer: 'Preferred vendors can expedite claims and often guarantee their work to the insurer. However, you typically have the right to choose your own contractor. Compare options and ensure any contractor is properly licensed, insured, and experienced with commercial restoration.'
    },
    {
      question: 'How do you calculate business interruption losses?',
      answer: 'Calculate based on historical financial data: average daily/weekly revenue from the same period in previous years, accounting for growth trends and seasonality. Include fixed costs that continue during closure. Work with your accountant to properly document losses.'
    },
    {
      question: 'What about employee wages during disaster closure?',
      answer: 'This depends on your policies and insurance coverage. Some business interruption policies cover ordinary payroll. Consider the impact on employee retention and morale. Many businesses pay key employees to help with recovery efforts.'
    },
    {
      question: 'How can businesses prepare for future disasters?',
      answer: 'Develop and regularly update a disaster response plan, maintain adequate insurance coverage, keep off-site backups of critical data and documents, establish relationships with restoration contractors, and conduct regular emergency drills with staff.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-slate-900 to-blue-900 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Building className="w-20 h-20 text-blue-300" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Commercial Property Disaster Recovery
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Minimize Downtime, Protect Revenue, Ensure Business Continuity
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/whos-first/commercial"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                24/7 Commercial Response
              </Link>
              <Link
                href="/insurance-decoder/business"
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Business Insurance Guide
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Store className="w-8 h-8 text-blue-600" />
              Commercial Property Types
            </h2>
            
            <div className="mb-8 flex flex-wrap gap-3">
              {Object.keys(businessTypes).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedBusinessType(key)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedBusinessType === key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                  }`}
                >
                  {businessTypes[key as keyof typeof businessTypes].name}
                </button>
              ))}
            </div>

            <motion.div
              key={selectedBusinessType}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl p-8 border border-blue-100"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    {businessTypes[selectedBusinessType as keyof typeof businessTypes].name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {businessTypes[selectedBusinessType as keyof typeof businessTypes].description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Critical Business Concerns:</h4>
                    <ul className="space-y-2">
                      {businessTypes[selectedBusinessType as keyof typeof businessTypes].criticalConcerns.map((concern, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <AlertCircle className="w-5 h-5 text-orange-500 mt-0.5" />
                          <span className="text-gray-700">{concern}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <Clock className="w-6 h-6 text-red-600 mb-2" />
                      <p className="text-sm font-semibold text-gray-600">Avg Downtime</p>
                      <p className="font-bold">{businessTypes[selectedBusinessType as keyof typeof businessTypes].averageDowntime}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <DollarSign className="w-6 h-6 text-green-600 mb-2" />
                      <p className="text-sm font-semibold text-gray-600">Revenue Impact</p>
                      <p className="font-bold text-sm">{businessTypes[selectedBusinessType as keyof typeof businessTypes].revenueImpact}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      Insurance Requirements
                    </h4>
                    <ul className="space-y-2">
                      {businessTypes[selectedBusinessType as keyof typeof businessTypes].insuranceNeeds.map((need, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                          <span className="text-gray-700 text-sm">{need}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Response Priorities */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              Commercial Disaster Response Priorities
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {disasterResponsePriorities.map((priority, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6 border-t-4 border-red-500"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 text-red-600 rounded-full flex items-center justify-center font-bold">
                        {priority.priority}
                      </div>
                      <div className="text-red-600">{priority.icon}</div>
                    </div>
                    <span className="text-xs font-semibold bg-red-100 text-red-800 px-2 py-1 rounded">
                      {priority.timeframe}
                    </span>
                  </div>
                  <h3 className="font-bold text-lg mb-3">{priority.title}</h3>
                  <ul className="space-y-1">
                    {priority.actions.map((action, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-1">
                        <span className="text-red-500 mt-0.5">•</span>
                        {action}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Business Interruption */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <BarChart className="w-8 h-8 text-green-600" />
              Understanding Business Interruption Impact
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessInterruptionFactors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 border border-gray-200"
                >
                  <h3 className="font-bold text-lg mb-3 text-gray-900">{factor.factor}</h3>
                  <p className="text-sm text-gray-600 mb-3">{factor.description}</p>
                  <div className="space-y-2 text-sm">
                    <div className="bg-blue-50 p-2 rounded">
                      <span className="font-semibold text-blue-900">Calculation:</span>
                      <p className="text-blue-700">{factor.calculation}</p>
                    </div>
                    <div className="bg-green-50 p-2 rounded">
                      <span className="font-semibold text-green-900">Mitigation:</span>
                      <p className="text-green-700">{factor.mitigation}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Insurance Essentials */}
      <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Shield className="w-8 h-8 text-blue-600" />
              Commercial Insurance Essentials
            </h2>
            <div className="bg-white rounded-xl shadow-xl overflow-hidden">
              <table className="w-full">
                <thead className="bg-blue-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Coverage Type</th>
                    <th className="px-6 py-4 text-left">Importance</th>
                    <th className="px-6 py-4 text-left">Includes</th>
                    <th className="px-6 py-4 text-left">Key Considerations</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {commercialInsuranceEssentials.map((insurance, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold">{insurance.coverage}</td>
                      <td className="px-6 py-4">
                        <span className={`px-3 py-1 rounded text-sm font-semibold ${
                          insurance.importance === 'Critical'
                            ? 'bg-red-100 text-red-800'
                            : insurance.importance === 'High'
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {insurance.importance}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{insurance.includes}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{insurance.considerations}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/insurance-decoder/commercial"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Calculator className="w-5 h-5" />
                Check Your Commercial Coverage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Recovery Timeline */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Clock className="w-8 h-8 text-blue-600" />
              Typical Commercial Recovery Timeline
            </h2>
            <div className="relative">
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-blue-200"></div>
              {recoveryTimeline.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative flex items-start mb-8"
                >
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm z-10">
                    {phase.days}
                  </div>
                  <div className="ml-8 bg-white rounded-lg shadow-lg p-6 flex-grow">
                    <h3 className="font-bold text-lg mb-3">{phase.phase}</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {phase.tasks.map((task, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-500" />
                          <span className="text-sm text-gray-600">{task}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cost Considerations */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              Commercial Restoration Cost Breakdown
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {costConsiderations.map((cost, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <h3 className="font-bold text-lg mb-3">{cost.category}</h3>
                  <ul className="space-y-2 mb-4">
                    {cost.items.map((item, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-green-500 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-green-600">
                      Typical Range: {cost.typical}
                    </p>
                  </div>
                </motion.div>
              ))}
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
              <HelpCircle className="w-8 h-8 text-blue-600" />
              Commercial Property FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-r from-gray-50 to-white rounded-lg shadow-md border border-gray-200"
                >
                  <button
                    onClick={() => setExpandedFAQ(expandedFAQ === index ? null : index)}
                    className="w-full px-6 py-4 text-left font-semibold flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <span>{faq.question}</span>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform text-blue-600 ${
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
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              Commercial Recovery Resources
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Link
                href="/emergency/business-continuity"
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-blue-100"
              >
                <TrendingUp className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Business Continuity</h3>
                <p className="text-gray-600 text-sm">Planning guide for disaster preparedness</p>
              </Link>
              
              <Link
                href="/insurance-decoder/business-interruption"
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-green-100"
              >
                <BarChart className="w-10 h-10 text-green-600 mb-3" />
                <h3 className="font-bold mb-2">BI Insurance Guide</h3>
                <p className="text-gray-600 text-sm">Understanding business interruption coverage</p>
              </Link>
              
              <Link
                href="/guides/commercial-water-damage"
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-orange-100"
              >
                <Droplets className="w-10 h-10 text-orange-600 mb-3" />
                <h3 className="font-bold mb-2">Water Damage</h3>
                <p className="text-gray-600 text-sm">Commercial water damage specifics</p>
              </Link>
              
              <Link
                href="/whos-first/commercial"
                className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-red-100"
              >
                <Phone className="w-10 h-10 text-red-600 mb-3" />
                <h3 className="font-bold mb-2">Emergency Contacts</h3>
                <p className="text-gray-600 text-sm">24/7 commercial restoration services</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-700 to-indigo-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Minimize Business Disruption from Disasters
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Get priority commercial restoration services to protect your revenue
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/whos-first/commercial"
                className="bg-white text-blue-700 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                24/7 Commercial Response
              </Link>
              <Link
                href="/insurance-decoder/commercial"
                className="bg-blue-800 hover:bg-blue-900 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Assess Your Coverage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
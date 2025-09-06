'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Home, 
  AlertTriangle, 
  Shield, 
  Clock, 
  Phone, 
  CheckCircle,
  Users,
  Heart,
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
  Key,
  DollarSign
} from 'lucide-react';

export default function ResidentialPropertyPage() {
  const [selectedPropertyType, setSelectedPropertyType] = useState('house');
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const propertyTypes = {
    house: {
      name: 'Detached Houses',
      description: 'Single-family homes on individual blocks',
      commonIssues: [
        'Roof damage from storms',
        'Basement flooding',
        'External wall damage',
        'Garden and fence damage',
        'Garage flooding'
      ],
      insuranceConsiderations: [
        'Building sum insured',
        'Contents coverage',
        'Temporary accommodation',
        'Pool and spa coverage',
        'Garden and landscaping limits'
      ],
      averageClaimSize: '$15,000 - $45,000',
      responseTime: '2-4 hours emergency'
    },
    apartment: {
      name: 'Apartments & Units',
      description: 'Multi-level residential units and flats',
      commonIssues: [
        'Water damage from above units',
        'Balcony water ingress',
        'Shared wall damage',
        'Common area impacts',
        'Parking area flooding'
      ],
      insuranceConsiderations: [
        'Strata insurance overlap',
        'Internal damage coverage',
        'Liability between units',
        'Common property claims',
        'Excess coordination'
      ],
      averageClaimSize: '$8,000 - $25,000',
      responseTime: '2-6 hours (strata approval)'
    },
    townhouse: {
      name: 'Townhouses',
      description: 'Multi-story attached dwellings',
      commonIssues: [
        'Shared roof problems',
        'Party wall water transfer',
        'Courtyard flooding',
        'Garage water damage',
        'Multiple floor impacts'
      ],
      insuranceConsiderations: [
        'Body corporate coverage',
        'Individual vs shared damage',
        'Boundary definitions',
        'Multiple floor coverage',
        'Shared services claims'
      ],
      averageClaimSize: '$12,000 - $35,000',
      responseTime: '2-4 hours emergency'
    },
    heritage: {
      name: 'Heritage Homes',
      description: 'Listed and character properties',
      commonIssues: [
        'Specialist material damage',
        'Historical feature restoration',
        'Aging infrastructure failures',
        'Compliance requirements',
        'Matching materials difficulty'
      ],
      insuranceConsiderations: [
        'Heritage listing requirements',
        'Specialist contractor needs',
        'Higher restoration costs',
        'Council approval delays',
        'Like-for-like replacement'
      ],
      averageClaimSize: '$25,000 - $75,000+',
      responseTime: '2-4 hours (specialist team)'
    },
    granny: {
      name: 'Granny Flats',
      description: 'Secondary dwellings and studios',
      commonIssues: [
        'Limited access problems',
        'Separate services damage',
        'Foundation water issues',
        'Compact space challenges',
        'Outdoor exposure damage'
      ],
      insuranceConsiderations: [
        'Separate or included coverage',
        'Rental income protection',
        'Building code compliance',
        'Access limitations',
        'Utility connections'
      ],
      averageClaimSize: '$5,000 - $20,000',
      responseTime: '3-5 hours standard'
    },
    retirement: {
      name: 'Retirement Villages',
      description: 'Over-55s and retirement communities',
      commonIssues: [
        'Accessibility during repairs',
        'Medical equipment protection',
        'Temporary relocation needs',
        'Common facility damage',
        'Multiple unit coordination'
      ],
      insuranceConsiderations: [
        'Village operator insurance',
        'Resident responsibilities',
        'Care continuity coverage',
        'Emergency accommodation',
        'Contents special items'
      ],
      averageClaimSize: '$10,000 - $30,000',
      responseTime: '1-3 hours priority'
    }
  };

  const disasterImpacts = [
    {
      disaster: 'Water Damage',
      icon: <Droplets className="w-6 h-6 text-blue-600" />,
      residentialConcerns: [
        'Ceiling and wall damage',
        'Flooring replacement needs',
        'Personal belongings damage',
        'Mould growth in 24-48 hours',
        'Electrical system risks'
      ],
      immediateActions: [
        'Turn off water main',
        'Move valuables to safety',
        'Document all damage',
        'Extract standing water',
        'Start drying process'
      ]
    },
    {
      disaster: 'Fire Damage',
      icon: <Flame className="w-6 h-6 text-red-600" />,
      residentialConcerns: [
        'Smoke odor penetration',
        'Structural integrity',
        'Complete content loss risk',
        'Temporary housing needs',
        'Emotional impact on family'
      ],
      immediateActions: [
        'Do not enter until cleared',
        'Secure the property',
        'Contact insurance immediately',
        'Inventory salvageable items',
        'Arrange accommodation'
      ]
    },
    {
      disaster: 'Storm Damage',
      icon: <Cloud className="w-6 h-6 text-gray-600" />,
      residentialConcerns: [
        'Roof damage and leaks',
        'Window breakage',
        'Tree impact damage',
        'Fence and outdoor damage',
        'Power outage impacts'
      ],
      immediateActions: [
        'Temporary roof tarping',
        'Board broken windows',
        'Remove dangerous debris',
        'Photo all damage',
        'Check for hidden damage'
      ]
    },
    {
      disaster: 'Mould Growth',
      icon: <Wind className="w-6 h-6 text-green-600" />,
      residentialConcerns: [
        'Health risks to occupants',
        'Hidden growth areas',
        'HVAC contamination',
        'Property value impact',
        'Recurring growth issues'
      ],
      immediateActions: [
        'Identify moisture source',
        'Isolate affected areas',
        'Improve ventilation',
        'Professional assessment',
        'Health check if symptoms'
      ]
    }
  ];

  const insuranceProcess = [
    {
      step: 1,
      title: 'Initial Contact',
      description: 'Report claim within 24-48 hours',
      details: [
        'Get claim number',
        'Understand excess',
        'Confirm coverage',
        'Ask about emergency repairs'
      ]
    },
    {
      step: 2,
      title: 'Documentation',
      description: 'Comprehensive evidence collection',
      details: [
        'Photos and videos',
        'List of damaged items',
        'Purchase receipts',
        'Repair quotes'
      ]
    },
    {
      step: 3,
      title: 'Assessment',
      description: 'Insurance assessor visit',
      details: [
        'Show all damage',
        'Provide documentation',
        'Discuss repair options',
        'Get written report'
      ]
    },
    {
      step: 4,
      title: 'Approval',
      description: 'Claim decision and scope',
      details: [
        'Review settlement offer',
        'Negotiate if needed',
        'Understand exclusions',
        'Confirm repair timeline'
      ]
    },
    {
      step: 5,
      title: 'Restoration',
      description: 'Repair work commences',
      details: [
        'Choose approved contractor',
        'Monitor progress',
        'Approve variations',
        'Final sign-off'
      ]
    }
  ];

  const preventionTips = [
    {
      category: 'Regular Maintenance',
      icon: <CheckCircle className="w-5 h-5" />,
      tips: [
        'Clean gutters quarterly',
        'Check roof annually',
        'Service HVAC systems',
        'Test smoke alarms monthly',
        'Inspect plumbing fixtures'
      ]
    },
    {
      category: 'Emergency Preparation',
      icon: <AlertTriangle className="w-5 h-5" />,
      tips: [
        'Know water shut-off location',
        'Keep emergency kit ready',
        'Document belongings',
        'Store important documents safely',
        'Have evacuation plan'
      ]
    },
    {
      category: 'Risk Reduction',
      icon: <Shield className="w-5 h-5" />,
      tips: [
        'Trim trees near house',
        'Install water leak detectors',
        'Upgrade old plumbing',
        'Improve drainage',
        'Secure outdoor items'
      ]
    },
    {
      category: 'Insurance Optimization',
      icon: <FileText className="w-5 h-5" />,
      tips: [
        'Review coverage annually',
        'Update sum insured',
        'Document renovations',
        'Understand policy exclusions',
        'Consider additional coverage'
      ]
    }
  ];

  const costFactors = [
    {
      factor: 'Property Size',
      impact: 'High',
      description: 'Larger homes have more area to restore',
      range: '$5,000 - $100,000+'
    },
    {
      factor: 'Damage Extent',
      impact: 'Very High',
      description: 'Localized vs whole property damage',
      range: '$2,000 - $200,000+'
    },
    {
      factor: 'Materials Quality',
      impact: 'Medium-High',
      description: 'Standard vs premium finishes',
      range: '20-40% cost variation'
    },
    {
      factor: 'Access Issues',
      impact: 'Medium',
      description: 'Multi-story, tight spaces, heritage requirements',
      range: '10-25% additional'
    },
    {
      factor: 'Urgency Level',
      impact: 'Medium',
      description: 'Emergency vs standard response',
      range: '15-30% premium'
    },
    {
      factor: 'Location',
      impact: 'Low-Medium',
      description: 'City vs regional pricing differences',
      range: '5-20% variation'
    }
  ];

  const faqs = [
    {
      question: 'How quickly should I act after residential property damage?',
      answer: 'Immediate action is critical. Safety first - ensure the property is safe to enter. Then within 24 hours: stop the damage source, document everything, contact your insurance, and begin mitigation. Water damage can lead to mould in 24-48 hours, making quick response essential.'
    },
    {
      question: 'What\'s typically covered by home insurance for disasters?',
      answer: 'Standard home insurance typically covers sudden water damage (burst pipes, storms), fire damage, and storm damage. However, gradual damage, poor maintenance, and flood (rising water) often require additional coverage. Always check your specific policy and consider flood cover if in a risk area.'
    },
    {
      question: 'Should I start repairs before insurance assessment?',
      answer: 'You should make emergency repairs to prevent further damage (tarping roofs, stopping water), but document everything first with photos. Keep all receipts. Don\'t commence major repairs or dispose of damaged items until the insurance assessor has visited or given approval.'
    },
    {
      question: 'How do I choose between repair and replacement?',
      answer: 'This depends on damage extent, insurance coverage, and cost-effectiveness. Generally, if repair costs exceed 50-70% of replacement value, replacement is recommended. Consider factors like matching existing materials, warranty differences, and long-term reliability.'
    },
    {
      question: 'What if I\'m renting the property?',
      answer: 'Tenants should immediately notify the landlord/property manager and document damage. Tenant contents aren\'t covered by landlord insurance - you need contents insurance. Landlords are responsible for building repairs but may claim on your bond for tenant-caused damage.'
    },
    {
      question: 'How can I prevent disputes with insurance companies?',
      answer: 'Document everything thoroughly, understand your policy before claiming, get multiple quotes, don\'t accept the first offer if inadequate, keep all communication in writing, and consider hiring a loss assessor for large claims. Know your rights and policy entitlements.'
    },
    {
      question: 'What about temporary accommodation during repairs?',
      answer: 'Most home insurance policies include Additional Living Expenses (ALE) covering temporary accommodation if your home is uninhabitable. Check your policy limits and timeframes. Keep all receipts and don\'t exceed daily allowances without approval.'
    },
    {
      question: 'How do strata properties handle disaster damage?',
      answer: 'Strata insurance covers common property and building structure, while owners need contents insurance for internal belongings. Damage affecting multiple units requires strata manager coordination. Understand where strata responsibility ends and yours begins - usually at the paint on internal walls.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-800 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Home className="w-20 h-20 text-blue-300" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Residential Property Disaster Recovery
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Complete Guide for Homeowners, Tenants & Landlords
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/whos-first/residential"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Emergency Help
              </Link>
              <Link
                href="/insurance-decoder"
                className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Insurance Guide
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Property Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Home className="w-8 h-8 text-blue-600" />
              Residential Property Types
            </h2>
            
            <div className="mb-8 flex flex-wrap gap-3">
              {Object.keys(propertyTypes).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedPropertyType(key)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    selectedPropertyType === key
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-blue-50 border border-gray-200'
                  }`}
                >
                  {propertyTypes[key as keyof typeof propertyTypes].name}
                </button>
              ))}
            </div>

            <motion.div
              key={selectedPropertyType}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl p-8 border border-blue-100"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    {propertyTypes[selectedPropertyType as keyof typeof propertyTypes].name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {propertyTypes[selectedPropertyType as keyof typeof propertyTypes].description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3">Common Disaster Issues:</h4>
                    <ul className="space-y-2">
                      {propertyTypes[selectedPropertyType as keyof typeof propertyTypes].commonIssues.map((issue, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-red-500 mt-0.5" />
                          <span className="text-gray-700">{issue}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <DollarSign className="w-6 h-6 text-green-600 mb-2" />
                      <p className="text-sm font-semibold text-gray-600">Average Claim</p>
                      <p className="font-bold">{propertyTypes[selectedPropertyType as keyof typeof propertyTypes].averageClaimSize}</p>
                    </div>
                    <div className="bg-white rounded-lg p-4 border border-gray-200">
                      <Clock className="w-6 h-6 text-blue-600 mb-2" />
                      <p className="text-sm font-semibold text-gray-600">Response Time</p>
                      <p className="font-bold">{propertyTypes[selectedPropertyType as keyof typeof propertyTypes].responseTime}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <Shield className="w-5 h-5 text-blue-600" />
                      Insurance Considerations
                    </h4>
                    <ul className="space-y-2">
                      {propertyTypes[selectedPropertyType as keyof typeof propertyTypes].insuranceConsiderations.map((consideration, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-blue-500 mt-0.5" />
                          <span className="text-gray-700 text-sm">{consideration}</span>
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

      {/* Disaster Impacts */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-orange-600" />
              Disaster Impacts on Residential Properties
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {disasterImpacts.map((disaster, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {disaster.icon}
                    <h3 className="text-xl font-bold">{disaster.disaster}</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-gray-600">Residential Concerns</h4>
                      <ul className="space-y-1">
                        {disaster.residentialConcerns.map((concern, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-1">
                            <span className="text-red-500">•</span>
                            {concern}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-gray-600">Immediate Actions</h4>
                      <ul className="space-y-1">
                        {disaster.immediateActions.map((action, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start gap-1">
                            <span className="text-green-500">•</span>
                            {action}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Insurance Process */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              Residential Insurance Claim Process
            </h2>
            <div className="grid md:grid-cols-5 gap-4">
              {insuranceProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border-2 border-blue-200 h-full">
                    <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                      {step.step}
                    </div>
                    <h3 className="font-bold mb-2">{step.title}</h3>
                    <p className="text-sm text-gray-600 mb-3">{step.description}</p>
                    <ul className="space-y-1">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="text-xs text-gray-500 flex items-start gap-1">
                          <CheckCircle className="w-3 h-3 text-green-500 mt-0.5" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                  {index < insuranceProcess.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                      <ChevronRight className="w-6 h-6 text-blue-400" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Prevention Tips */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Shield className="w-8 h-8 text-green-600" />
              Disaster Prevention for Homeowners
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {preventionTips.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center gap-2 mb-4 text-green-600">
                    {category.icon}
                    <h3 className="font-bold">{category.category}</h3>
                  </div>
                  <ul className="space-y-2">
                    {category.tips.map((tip, idx) => (
                      <li key={idx} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-green-500 mt-1">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cost Factors */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <DollarSign className="w-8 h-8 text-green-600" />
              Restoration Cost Factors
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {costFactors.map((factor, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 border border-gray-200"
                >
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold">{factor.factor}</h3>
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      factor.impact === 'Very High'
                        ? 'bg-red-100 text-red-800'
                        : factor.impact === 'High' || factor.impact === 'Medium-High'
                        ? 'bg-orange-100 text-orange-800'
                        : factor.impact === 'Medium'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {factor.impact} Impact
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-3">{factor.description}</p>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm font-semibold text-blue-600">{factor.range}</p>
                  </div>
                </motion.div>
              ))}
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
              <HelpCircle className="w-8 h-8 text-blue-600" />
              Residential Property FAQs
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
                    onClick={() => setExpandedSection(expandedSection === index ? null : index)}
                    className="w-full px-6 py-4 text-left font-semibold flex items-center justify-between hover:bg-gray-50 transition-colors rounded-lg"
                  >
                    <span>{faq.question}</span>
                    <ChevronRight
                      className={`w-5 h-5 transition-transform text-blue-600 ${
                        expandedSection === index ? 'rotate-90' : ''
                      }`}
                    />
                  </button>
                  {expandedSection === index && (
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

      {/* Quick Links */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              Related Resources
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Link
                href="/guides/water-damage"
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-blue-100"
              >
                <Droplets className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Water Damage Guide</h3>
                <p className="text-gray-600 text-sm">Complete water damage recovery guide</p>
              </Link>
              
              <Link
                href="/emergency/checklists/residential"
                className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-orange-100"
              >
                <AlertCircle className="w-10 h-10 text-orange-600 mb-3" />
                <h3 className="font-bold mb-2">Emergency Checklist</h3>
                <p className="text-gray-600 text-sm">What to do in the first 24 hours</p>
              </Link>
              
              <Link
                href="/insurance-decoder/home-insurance"
                className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-green-100"
              >
                <Shield className="w-10 h-10 text-green-600 mb-3" />
                <h3 className="font-bold mb-2">Insurance Decoder</h3>
                <p className="text-gray-600 text-sm">Understanding your home insurance</p>
              </Link>
              
              <Link
                href="/whos-first/residential"
                className="bg-gradient-to-br from-red-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-red-100"
              >
                <Phone className="w-10 h-10 text-red-600 mb-3" />
                <h3 className="font-bold mb-2">Emergency Contacts</h3>
                <p className="text-gray-600 text-sm">24/7 residential emergency services</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Need Help with Residential Property Damage?
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              Get immediate assistance from certified restoration specialists
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/whos-first/residential"
                className="bg-white text-blue-600 hover:bg-blue-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Get Emergency Help
              </Link>
              <Link
                href="/insurance-decoder"
                className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
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
'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Factory, 
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
  Truck,
  Package,
  Settings,
  AlertOctagon
} from 'lucide-react';

export default function IndustrialPropertyPage() {
  const [selectedIndustryType, setSelectedIndustryType] = useState('manufacturing');
  const [expandedSection, setExpandedSection] = useState<number | null>(null);

  const industryTypes = {
    manufacturing: {
      name: 'Manufacturing Facilities',
      description: 'Production plants, assembly lines, fabrication shops',
      criticalAssets: [
        'Production equipment and machinery',
        'Raw material inventory',
        'Finished goods storage',
        'Quality control systems',
        'Specialized tooling'
      ],
      complianceRequirements: [
        'OSHA safety standards',
        'Environmental regulations',
        'Quality certifications (ISO)',
        'Industry-specific standards',
        'Worker safety protocols'
      ],
      averageDowntime: '10-30 days',
      productionLoss: '$100,000 - $1M+ per day'
    },
    warehouse: {
      name: 'Warehouses & Distribution',
      description: 'Storage facilities, distribution centers, logistics hubs',
      criticalAssets: [
        'Inventory and stock',
        'Racking systems',
        'Material handling equipment',
        'Climate control systems',
        'Loading dock infrastructure'
      ],
      complianceRequirements: [
        'Fire safety codes',
        'Storage regulations',
        'Transportation compliance',
        'Hazmat handling protocols',
        'Security requirements'
      ],
      averageDowntime: '7-21 days',
      productionLoss: '$50,000 - $500,000 per day'
    },
    processing: {
      name: 'Processing Plants',
      description: 'Food processing, chemical plants, refineries',
      criticalAssets: [
        'Processing equipment',
        'Storage tanks and vessels',
        'Piping and control systems',
        'Laboratory equipment',
        'Safety systems'
      ],
      complianceRequirements: [
        'FDA/health regulations',
        'EPA environmental standards',
        'Process safety management',
        'Hazardous material handling',
        'Sanitation requirements'
      ],
      averageDowntime: '14-45 days',
      productionLoss: '$200,000 - $2M+ per day'
    },
    datacenter: {
      name: 'Data Centers',
      description: 'Server farms, colocation facilities, cloud infrastructure',
      criticalAssets: [
        'Server equipment',
        'Cooling systems',
        'Power infrastructure',
        'Network equipment',
        'Security systems'
      ],
      complianceRequirements: [
        'Data protection laws',
        'Uptime SLA requirements',
        'Security certifications',
        'Environmental controls',
        'Redundancy standards'
      ],
      averageDowntime: '1-7 days',
      productionLoss: '$500,000 - $5M+ per day'
    },
    mining: {
      name: 'Mining & Resources',
      description: 'Mining operations, quarries, extraction facilities',
      criticalAssets: [
        'Heavy machinery',
        'Processing equipment',
        'Conveyor systems',
        'Ventilation systems',
        'Safety equipment'
      ],
      complianceRequirements: [
        'Mining safety regulations',
        'Environmental impact',
        'Worker health standards',
        'Explosive handling',
        'Rehabilitation requirements'
      ],
      averageDowntime: '7-30 days',
      productionLoss: '$150,000 - $1.5M+ per day'
    },
    energy: {
      name: 'Energy & Utilities',
      description: 'Power plants, substations, renewable energy facilities',
      criticalAssets: [
        'Generation equipment',
        'Transmission infrastructure',
        'Control systems',
        'Safety equipment',
        'Monitoring systems'
      ],
      complianceRequirements: [
        'Grid reliability standards',
        'Environmental regulations',
        'Safety protocols',
        'Emergency response plans',
        'Cybersecurity requirements'
      ],
      averageDowntime: '3-14 days',
      productionLoss: '$250,000 - $2.5M+ per day'
    }
  };

  const industrialHazards = [
    {
      hazard: 'Chemical Spills',
      icon: <AlertOctagon className="w-6 h-6 text-yellow-600" />,
      risks: [
        'Environmental contamination',
        'Worker exposure',
        'Regulatory violations',
        'Cleanup costs',
        'Production stoppage'
      ],
      response: [
        'Immediate containment',
        'Hazmat team activation',
        'Regulatory notification',
        'Environmental assessment',
        'Specialized cleanup'
      ]
    },
    {
      hazard: 'Equipment Failure',
      icon: <Settings className="w-6 h-6 text-red-600" />,
      risks: [
        'Production line stoppage',
        'Supply chain disruption',
        'Contract penalties',
        'Worker safety risks',
        'Quality control issues'
      ],
      response: [
        'Emergency shutdown procedures',
        'Safety assessment',
        'Temporary equipment rental',
        'Expedited repairs',
        'Alternative production'
      ]
    },
    {
      hazard: 'Fire & Explosion',
      icon: <Flame className="w-6 h-6 text-orange-600" />,
      risks: [
        'Catastrophic damage',
        'Worker injuries',
        'Total facility loss',
        'Environmental impact',
        'Community evacuation'
      ],
      response: [
        'Emergency evacuation',
        'Fire suppression activation',
        'Emergency services coordination',
        'Incident command setup',
        'Investigation protocols'
      ]
    },
    {
      hazard: 'Flooding',
      icon: <Droplets className="w-6 h-6 text-blue-600" />,
      risks: [
        'Equipment damage',
        'Inventory loss',
        'Electrical hazards',
        'Foundation damage',
        'Contamination spread'
      ],
      response: [
        'Power isolation',
        'Water extraction',
        'Equipment elevation',
        'Inventory salvage',
        'Decontamination'
      ]
    }
  ];

  const regulatoryCompliance = [
    {
      agency: 'OSHA',
      focus: 'Worker Safety',
      requirements: [
        'Incident reporting within 24 hours',
        'Safety plan updates',
        'Worker training documentation',
        'Hazard assessments',
        'Record keeping'
      ],
      penalties: 'Up to $14,502 per violation'
    },
    {
      agency: 'EPA',
      focus: 'Environmental Protection',
      requirements: [
        'Spill reporting requirements',
        'Air quality monitoring',
        'Water discharge permits',
        'Waste disposal compliance',
        'Remediation standards'
      ],
      penalties: 'Up to $109,024 per day'
    },
    {
      agency: 'State/Local',
      focus: 'Building & Fire Codes',
      requirements: [
        'Building permits',
        'Fire safety inspections',
        'Occupancy certificates',
        'Zoning compliance',
        'Local ordinances'
      ],
      penalties: 'Varies by jurisdiction'
    },
    {
      agency: 'Industry Specific',
      focus: 'Quality & Standards',
      requirements: [
        'ISO certifications',
        'FDA compliance (food)',
        'DOT regulations (transport)',
        'Industry standards',
        'Customer requirements'
      ],
      penalties: 'Loss of certification/contracts'
    }
  ];

  const restorationChallenges = [
    {
      challenge: 'Specialized Equipment',
      description: 'Custom machinery may take months to replace',
      solutions: [
        'Maintain equipment inventories',
        'Identify alternative suppliers',
        'Consider rental options',
        'Cross-train on multiple machines'
      ]
    },
    {
      challenge: 'Supply Chain Impact',
      description: 'Disruption affects customers and suppliers',
      solutions: [
        'Contingency planning',
        'Alternative sourcing',
        'Customer communication',
        'Inventory buffers'
      ]
    },
    {
      challenge: 'Regulatory Approvals',
      description: 'Permits and inspections delay reopening',
      solutions: [
        'Pre-establish relationships',
        'Expedited permit processes',
        'Third-party inspections',
        'Compliance documentation'
      ]
    },
    {
      challenge: 'Skilled Labor',
      description: 'Specialized workers needed for repairs',
      solutions: [
        'Pre-qualified contractors',
        'National contractor networks',
        'Overtime authorization',
        'Temporary skilled workers'
      ]
    },
    {
      challenge: 'Environmental Cleanup',
      description: 'Contamination requires specialized response',
      solutions: [
        'Environmental consultants',
        'Specialized cleanup crews',
        'Regulatory coordination',
        'Long-term monitoring'
      ]
    },
    {
      challenge: 'Business Continuity',
      description: 'Maintaining operations during restoration',
      solutions: [
        'Partial operation strategies',
        'Temporary facilities',
        'Outsourcing production',
        'Phased restoration'
      ]
    }
  ];

  const insuranceConsiderations = [
    {
      coverage: 'Property Damage',
      specifics: 'Buildings, machinery, equipment, inventory',
      limits: 'Replacement cost vs actual cash value',
      gaps: 'Obsolete equipment, custom machinery'
    },
    {
      coverage: 'Business Interruption',
      specifics: 'Lost income, continuing expenses, extra expenses',
      limits: 'Coverage period, waiting periods',
      gaps: 'Extended supply chain disruptions'
    },
    {
      coverage: 'Equipment Breakdown',
      specifics: 'Mechanical and electrical failures',
      limits: 'Per occurrence limits',
      gaps: 'Wear and tear, maintenance issues'
    },
    {
      coverage: 'Environmental Liability',
      specifics: 'Pollution cleanup, third-party damages',
      limits: 'Aggregate limits, retroactive dates',
      gaps: 'Pre-existing contamination'
    },
    {
      coverage: 'Contingent Business',
      specifics: 'Supplier/customer disruptions',
      limits: 'Named vs unnamed locations',
      gaps: 'International suppliers'
    },
    {
      coverage: 'Cyber',
      specifics: 'System failures, data loss',
      limits: 'Sublimits for industrial control systems',
      gaps: 'Physical damage from cyber events'
    }
  ];

  const costBreakdown = [
    {
      category: 'Equipment & Machinery',
      percentage: '35-45%',
      factors: [
        'Specialized equipment replacement',
        'Calibration and testing',
        'Installation costs',
        'Temporary rentals'
      ]
    },
    {
      category: 'Production Loss',
      percentage: '25-35%',
      factors: [
        'Daily production value',
        'Contract penalties',
        'Rush order premiums',
        'Market share loss'
      ]
    },
    {
      category: 'Regulatory & Compliance',
      percentage: '10-15%',
      factors: [
        'Environmental cleanup',
        'Permit fees',
        'Inspection costs',
        'Compliance consulting'
      ]
    },
    {
      category: 'Labor & Expertise',
      percentage: '15-20%',
      factors: [
        'Specialized contractors',
        'Overtime premiums',
        'Technical consultants',
        'Training costs'
      ]
    },
    {
      category: 'Logistics & Supply Chain',
      percentage: '10-15%',
      factors: [
        'Expedited shipping',
        'Alternative sourcing',
        'Inventory replacement',
        'Customer mitigation'
      ]
    }
  ];

  const emergencyPlanComponents = [
    {
      component: 'Emergency Response Team',
      elements: [
        'Defined roles and responsibilities',
        'Contact information updated quarterly',
        '24/7 activation protocol',
        'Decision-making authority',
        'External resource contacts'
      ]
    },
    {
      component: 'Evacuation Procedures',
      elements: [
        'Multiple evacuation routes',
        'Assembly point locations',
        'Accountability systems',
        'Special needs considerations',
        'Visitor management'
      ]
    },
    {
      component: 'Critical Systems Shutdown',
      elements: [
        'Emergency shutdown procedures',
        'Utility isolation points',
        'Hazardous material securing',
        'Data backup protocols',
        'Equipment protection'
      ]
    },
    {
      component: 'Communication Plan',
      elements: [
        'Employee notification system',
        'Customer communication',
        'Supplier coordination',
        'Media relations',
        'Regulatory reporting'
      ]
    }
  ];

  const faqs = [
    {
      question: 'What makes industrial property restoration different from commercial?',
      answer: 'Industrial restoration involves specialized equipment, regulatory compliance, environmental concerns, and often hazardous materials. The scale is larger, downtime costs are higher, and technical expertise requirements are more specialized. Safety protocols and regulatory approvals also add complexity.'
    },
    {
      question: 'How long does industrial facility restoration typically take?',
      answer: 'Timeline varies significantly: minor incidents (1-2 weeks), moderate damage (2-8 weeks), major disasters (2-6 months or more). Factors include equipment lead times, regulatory approvals, environmental cleanup, and specialized contractor availability. Custom equipment replacement can extend timelines significantly.'
    },
    {
      question: 'What are the biggest cost drivers in industrial restoration?',
      answer: 'Major cost drivers include: specialized equipment replacement (35-45%), production loss/business interruption (25-35%), regulatory compliance and environmental cleanup (10-15%), and specialized labor (15-20%). A single production line can cost millions to replace.'
    },
    {
      question: 'How do environmental regulations affect industrial restoration?',
      answer: 'Environmental regulations can significantly impact timeline and cost. Requirements include immediate spill reporting, environmental assessment, specialized cleanup procedures, ongoing monitoring, and regulatory approval before reopening. Non-compliance can result in severe penalties and criminal liability.'
    },
    {
      question: 'What insurance is essential for industrial facilities?',
      answer: 'Critical coverage includes: property damage with equipment breakdown, business interruption with extended period, environmental liability, contingent business interruption, and cyber coverage for industrial control systems. Many facilities need $50M+ in total coverage.'
    },
    {
      question: 'How can industrial facilities minimize disaster recovery time?',
      answer: 'Key strategies: maintain detailed equipment inventories, pre-qualify restoration contractors, develop comprehensive emergency response plans, maintain critical spare parts, establish alternate production arrangements, and conduct regular emergency drills. Pre-planning can reduce recovery time by 30-50%.'
    },
    {
      question: 'What about worker safety during industrial restoration?',
      answer: 'Worker safety is paramount. Requirements include: hazard assessment before work begins, specialized PPE for all workers, continuous air monitoring, confined space protocols, lockout/tagout procedures, and OSHA compliance throughout. Safety violations can stop restoration work immediately.'
    },
    {
      question: 'How do you handle hazardous materials during restoration?',
      answer: 'Hazardous materials require: immediate containment, certified hazmat teams, regulatory notification (often within hours), specialized disposal procedures, chain of custody documentation, and potential long-term environmental monitoring. Improper handling can result in criminal charges.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-slate-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-900 to-slate-800 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Factory className="w-20 h-20 text-yellow-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Industrial Facility Disaster Recovery
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Specialized Response for Manufacturing, Processing & Heavy Industry
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/whos-first/industrial"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                24/7 Industrial Response
              </Link>
              <Link
                href="/insurance-decoder/industrial"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Industrial Insurance Guide
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Industry Types */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Factory className="w-8 h-8 text-gray-600" />
              Industrial Facility Types
            </h2>
            
            <div className="mb-8 flex flex-wrap gap-3">
              {Object.keys(industryTypes).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedIndustryType(key)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                    selectedIndustryType === key
                      ? 'bg-gray-800 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                  }`}
                >
                  {industryTypes[key as keyof typeof industryTypes].name}
                </button>
              ))}
            </div>

            <motion.div
              key={selectedIndustryType}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-xl p-8 border border-gray-200"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4">
                    {industryTypes[selectedIndustryType as keyof typeof industryTypes].name}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {industryTypes[selectedIndustryType as keyof typeof industryTypes].description}
                  </p>
                  
                  <div className="mb-6">
                    <h4 className="font-semibold mb-3 flex items-center gap-2">
                      <Settings className="w-5 h-5 text-gray-600" />
                      Critical Assets
                    </h4>
                    <ul className="space-y-2">
                      {industryTypes[selectedIndustryType as keyof typeof industryTypes].criticalAssets.map((asset, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5" />
                          <span className="text-gray-700">{asset}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <Clock className="w-6 h-6 text-red-600 mb-2" />
                      <p className="text-sm font-semibold text-gray-600">Typical Downtime</p>
                      <p className="font-bold text-red-700">{industryTypes[selectedIndustryType as keyof typeof industryTypes].averageDowntime}</p>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4 border border-orange-200">
                      <DollarSign className="w-6 h-6 text-orange-600 mb-2" />
                      <p className="text-sm font-semibold text-gray-600">Production Loss</p>
                      <p className="font-bold text-orange-700 text-sm">{industryTypes[selectedIndustryType as keyof typeof industryTypes].productionLoss}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <div className="bg-yellow-50 rounded-lg p-6 border border-yellow-200">
                    <h4 className="font-semibold mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-yellow-600" />
                      Compliance Requirements
                    </h4>
                    <ul className="space-y-2">
                      {industryTypes[selectedIndustryType as keyof typeof industryTypes].complianceRequirements.map((requirement, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Info className="w-4 h-4 text-yellow-600 mt-0.5" />
                          <span className="text-gray-700 text-sm">{requirement}</span>
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

      {/* Industrial Hazards */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <AlertOctagon className="w-8 h-8 text-red-600" />
              Industrial-Specific Hazards
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {industrialHazards.map((hazard, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6 border-l-4 border-red-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    {hazard.icon}
                    <h3 className="text-xl font-bold">{hazard.hazard}</h3>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-red-700">Associated Risks</h4>
                      <ul className="space-y-1">
                        {hazard.risks.map((risk, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-1">
                            <span className="text-red-500 mt-0.5">•</span>
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm mb-2 text-green-700">Response Protocol</h4>
                      <ul className="space-y-1">
                        {hazard.response.map((action, idx) => (
                          <li key={idx} className="text-sm text-gray-600 flex items-start gap-1">
                            <span className="text-green-500 mt-0.5">•</span>
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

      {/* Regulatory Compliance */}
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
              Regulatory Compliance Requirements
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {regulatoryCompliance.map((regulation, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50 to-white rounded-lg p-6 border border-blue-200"
                >
                  <h3 className="font-bold text-lg mb-2">{regulation.agency}</h3>
                  <p className="text-sm text-gray-600 mb-3">{regulation.focus}</p>
                  <ul className="space-y-1 mb-4">
                    {regulation.requirements.map((req, idx) => (
                      <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                        <CheckCircle className="w-3 h-3 text-blue-500 mt-0.5" />
                        {req}
                      </li>
                    ))}
                  </ul>
                  <div className="pt-3 border-t border-blue-100">
                    <p className="text-xs font-semibold text-red-600">
                      Penalties: {regulation.penalties}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Restoration Challenges */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-orange-600" />
              Industrial Restoration Challenges
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {restorationChallenges.map((challenge, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <h3 className="font-bold text-lg mb-2 text-orange-700">{challenge.challenge}</h3>
                  <p className="text-sm text-gray-600 mb-4">{challenge.description}</p>
                  <div className="bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-sm mb-2 text-green-700">Solutions:</h4>
                    <ul className="space-y-1">
                      {challenge.solutions.map((solution, idx) => (
                        <li key={idx} className="text-xs text-gray-600 flex items-start gap-1">
                          <ChevronRight className="w-3 h-3 text-green-600 mt-0.5" />
                          {solution}
                        </li>
                      ))}
                    </ul>
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
              Industrial Insurance Coverage
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full bg-white rounded-lg shadow-lg">
                <thead className="bg-gray-800 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Coverage Type</th>
                    <th className="px-6 py-4 text-left">What It Covers</th>
                    <th className="px-6 py-4 text-left">Typical Limits</th>
                    <th className="px-6 py-4 text-left">Common Gaps</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {insuranceConsiderations.map((insurance, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 font-semibold">{insurance.coverage}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{insurance.specifics}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{insurance.limits}</td>
                      <td className="px-6 py-4 text-sm text-orange-600">{insurance.gaps}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-6 text-center">
              <Link
                href="/insurance-decoder/industrial"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Calculator className="w-5 h-5" />
                Analyze Your Industrial Coverage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cost Breakdown */}
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
              Industrial Restoration Cost Breakdown
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {costBreakdown.map((cost, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-bold">{cost.category}</h3>
                    <span className="text-2xl font-bold text-green-600">{cost.percentage}</span>
                  </div>
                  <ul className="space-y-2">
                    {cost.factors.map((factor, idx) => (
                      <li key={idx} className="text-sm text-gray-600 flex items-start gap-2">
                        <DollarSign className="w-4 h-4 text-green-500 mt-0.5" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Planning */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <AlertTriangle className="w-8 h-8 text-red-600" />
              Industrial Emergency Plan Components
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {emergencyPlanComponents.map((component, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-red-50 to-white rounded-lg p-6 border border-red-200"
                >
                  <h3 className="font-bold text-lg mb-4 text-red-700">{component.component}</h3>
                  <ul className="space-y-2">
                    {component.elements.map((element, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
                        <span className="text-sm text-gray-700">{element}</span>
                      </li>
                    ))}
                  </ul>
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
              Industrial Facility FAQs
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
              <BookOpen className="w-8 h-8 text-blue-600" />
              Industrial Recovery Resources
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Link
                href="/emergency/industrial-response"
                className="bg-gradient-to-br from-red-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-red-100"
              >
                <AlertOctagon className="w-10 h-10 text-red-600 mb-3" />
                <h3 className="font-bold mb-2">Emergency Response</h3>
                <p className="text-gray-600 text-sm">Industrial emergency protocols</p>
              </Link>
              
              <Link
                href="/guides/hazmat-cleanup"
                className="bg-gradient-to-br from-yellow-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-yellow-100"
              >
                <AlertTriangle className="w-10 h-10 text-yellow-600 mb-3" />
                <h3 className="font-bold mb-2">Hazmat Guide</h3>
                <p className="text-gray-600 text-sm">Hazardous material handling</p>
              </Link>
              
              <Link
                href="/insurance-decoder/industrial"
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-blue-100"
              >
                <Shield className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Insurance Analysis</h3>
                <p className="text-gray-600 text-sm">Industrial coverage assessment</p>
              </Link>
              
              <Link
                href="/whos-first/industrial"
                className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-green-100"
              >
                <Phone className="w-10 h-10 text-green-600 mb-3" />
                <h3 className="font-bold mb-2">24/7 Response</h3>
                <p className="text-gray-600 text-sm">Industrial emergency contacts</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-gray-800 to-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Minimize Industrial Downtime & Production Loss
            </h2>
            <p className="text-xl mb-8 text-gray-200">
              Specialized industrial restoration teams available 24/7 across Australia
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/whos-first/industrial"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Industrial Emergency Response
              </Link>
              <Link
                href="/insurance-decoder/industrial"
                className="bg-white text-gray-800 hover:bg-gray-100 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Coverage Assessment
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
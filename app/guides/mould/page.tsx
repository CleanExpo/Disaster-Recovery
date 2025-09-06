'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';
import { 
  Droplets, 
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
  AlertCircle,
  FileText,
  Calculator,
  MapPin,
  ChevronRight,
  Info,
  BookOpen,
  HelpCircle,
  ThermometerSun,
  Activity,
  Eye
} from 'lucide-react';

export default function MouldRemediationGuidePage() {
  const [selectedMouldType, setSelectedMouldType] = useState('aspergillus');
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const mouldTypes = {
    aspergillus: {
      name: 'Aspergillus',
      color: 'Yellow-green to brown',
      commonLocations: 'Walls, insulation, paper products',
      healthRisk: 'High - respiratory issues, allergies',
      growthConditions: 'Warm, humid environments',
      removalDifficulty: 'Moderate to High',
      identificationTips: 'Powdery texture, musty odor'
    },
    penicillium: {
      name: 'Penicillium',
      color: 'Blue-green, grey',
      commonLocations: 'Water-damaged materials, carpets',
      healthRisk: 'Moderate - allergies, asthma',
      growthConditions: 'Cool to moderate temperatures',
      removalDifficulty: 'Moderate',
      identificationTips: 'Velvety texture, spreads quickly'
    },
    stachybotrys: {
      name: 'Stachybotrys (Black Mould)',
      color: 'Dark green to black',
      commonLocations: 'Consistently wet areas, drywall',
      healthRisk: 'Very High - toxic, severe health effects',
      growthConditions: 'High moisture for extended periods',
      removalDifficulty: 'Very High - Professional only',
      identificationTips: 'Slimy texture when wet, strong musty smell'
    },
    cladosporium: {
      name: 'Cladosporium',
      color: 'Olive-green to brown/black',
      commonLocations: 'Fabrics, carpets, wood surfaces',
      healthRisk: 'Moderate - respiratory symptoms',
      growthConditions: 'Both warm and cold conditions',
      removalDifficulty: 'Moderate',
      identificationTips: 'Suede-like texture, common outdoors/indoors'
    },
    alternaria: {
      name: 'Alternaria',
      color: 'Dark green, brown, grey',
      commonLocations: 'Showers, under sinks, window frames',
      healthRisk: 'Moderate to High - severe allergies',
      growthConditions: 'Minimal moisture needed',
      removalDifficulty: 'Low to Moderate',
      identificationTips: 'Velvety texture with dark hairs'
    },
    chaetomium: {
      name: 'Chaetomium',
      color: 'White to grey, eventually brown/black',
      commonLocations: 'Water-damaged drywall, wallpaper',
      healthRisk: 'High - neurological effects possible',
      growthConditions: 'Chronic water damage',
      removalDifficulty: 'High',
      identificationTips: 'Cotton-like texture, musty odor'
    }
  };

  const healthSymptoms = [
    {
      category: 'Respiratory',
      symptoms: [
        'Persistent coughing',
        'Wheezing',
        'Shortness of breath',
        'Chest tightness',
        'Sinus congestion'
      ],
      severity: 'Common',
      atRisk: 'Asthma sufferers, elderly'
    },
    {
      category: 'Allergic Reactions',
      symptoms: [
        'Sneezing',
        'Runny or stuffy nose',
        'Itchy eyes, nose, throat',
        'Skin rashes',
        'Hives'
      ],
      severity: 'Very Common',
      atRisk: 'Those with allergies, children'
    },
    {
      category: 'Neurological',
      symptoms: [
        'Headaches',
        'Memory problems',
        'Difficulty concentrating',
        'Dizziness',
        'Fatigue'
      ],
      severity: 'Less Common',
      atRisk: 'Prolonged exposure cases'
    },
    {
      category: 'Severe Reactions',
      symptoms: [
        'Fever',
        'Difficulty breathing',
        'Lung infections',
        'Bleeding in lungs',
        'Immune suppression'
      ],
      severity: 'Rare but Serious',
      atRisk: 'Immunocompromised individuals'
    }
  ];

  const remediationStages = [
    {
      stage: 1,
      title: 'Assessment & Containment',
      duration: 'Day 1',
      activities: [
        'Professional inspection',
        'Moisture mapping',
        'Air quality testing',
        'Containment barriers setup',
        'HEPA filtration installation'
      ],
      critical: true
    },
    {
      stage: 2,
      title: 'Source Elimination',
      duration: 'Day 1-2',
      activities: [
        'Fix water source',
        'Remove standing water',
        'Dry affected areas',
        'Dehumidification',
        'Moisture control'
      ],
      critical: true
    },
    {
      stage: 3,
      title: 'Removal & Disposal',
      duration: 'Day 2-4',
      activities: [
        'PPE equipment setup',
        'Contaminated material removal',
        'HEPA vacuuming',
        'Proper waste disposal',
        'Surface cleaning'
      ],
      critical: true
    },
    {
      stage: 4,
      title: 'Cleaning & Treatment',
      duration: 'Day 3-5',
      activities: [
        'Antimicrobial application',
        'Surface sanitization',
        'Air scrubbing',
        'Fogging treatment',
        'Encapsulation if needed'
      ],
      critical: false
    },
    {
      stage: 5,
      title: 'Restoration & Prevention',
      duration: 'Day 5-7+',
      activities: [
        'Material replacement',
        'Reconstruction',
        'Moisture barriers',
        'Ventilation improvements',
        'Final clearance testing'
      ],
      critical: false
    }
  ];

  const mouldClassifications = [
    {
      level: 'Level 1',
      area: 'Less than 1m²',
      description: 'Small isolated areas',
      action: 'Can be DIY with proper precautions',
      ppe: 'N95 mask, gloves, goggles',
      examples: 'Bathroom ceiling spots, window sills'
    },
    {
      level: 'Level 2',
      area: '1-3m²',
      description: 'Mid-sized contamination',
      action: 'Professional recommended',
      ppe: 'Full face respirator, protective suit',
      examples: 'Wall sections, large ceiling areas'
    },
    {
      level: 'Level 3',
      area: '3-10m²',
      description: 'Large contamination',
      action: 'Professional required',
      ppe: 'Full PPE with containment',
      examples: 'Multiple walls, extensive water damage'
    },
    {
      level: 'Level 4',
      area: 'Greater than 10m²',
      description: 'Extensive contamination',
      action: 'Specialist remediation team',
      ppe: 'Full containment, negative air',
      examples: 'Whole rooms, HVAC contamination'
    }
  ];

  const preventionStrategies = [
    {
      area: 'Moisture Control',
      icon: <Droplets className="w-6 h-6" />,
      strategies: [
        'Maintain 30-50% humidity',
        'Fix leaks within 24 hours',
        'Use exhaust fans',
        'Proper drainage',
        'Regular gutter cleaning'
      ]
    },
    {
      area: 'Ventilation',
      icon: <Wind className="w-6 h-6" />,
      strategies: [
        'Improve air circulation',
        'Use dehumidifiers',
        'Open windows regularly',
        'HVAC maintenance',
        'Bathroom/kitchen fans'
      ]
    },
    {
      area: 'Monitoring',
      icon: <Eye className="w-6 h-6" />,
      strategies: [
        'Regular inspections',
        'Moisture meters',
        'Check hidden areas',
        'Monitor problem spots',
        'Professional assessments'
      ]
    },
    {
      area: 'Maintenance',
      icon: <Activity className="w-6 h-6" />,
      strategies: [
        'Seal cracks and gaps',
        'Waterproof basements',
        'Maintain roof/gutters',
        'Grade landscaping',
        'Update old plumbing'
      ]
    }
  ];

  const insuranceAspects = [
    {
      aspect: 'Sudden vs Gradual',
      coverage: 'Variable',
      details: 'Sudden water damage usually covered, gradual mould growth often excluded',
      tip: 'Document the water event that caused mould'
    },
    {
      aspect: 'Mould Exclusions',
      coverage: 'Often Excluded',
      details: 'Many policies specifically exclude mould damage',
      tip: 'Check for mould endorsements or riders'
    },
    {
      aspect: 'Water Damage Related',
      coverage: 'Potentially Covered',
      details: 'If mould results from covered water damage',
      tip: 'Link mould to covered peril'
    },
    {
      aspect: 'Prevention Failures',
      coverage: 'Not Covered',
      details: 'Lack of maintenance or prevention voids coverage',
      tip: 'Maintain records of prevention efforts'
    },
    {
      aspect: 'Health Effects',
      coverage: 'Separate Policy',
      details: 'Health issues require health insurance',
      tip: 'Document health impacts for liability'
    },
    {
      aspect: 'Remediation Limits',
      coverage: 'Capped Amount',
      details: 'Often $5,000-$10,000 limits if covered',
      tip: 'Consider additional mould coverage'
    }
  ];

  const faqs = [
    {
      question: 'How quickly does mould grow after water damage?',
      answer: 'Mould can begin growing within 24-48 hours after water exposure. Visible growth typically appears within 3-12 days, and colonies can be established within 1-2 weeks. This is why immediate water damage response is critical.'
    },
    {
      question: 'Can I remove mould myself or do I need professionals?',
      answer: 'Small areas (less than 1m²) can often be handled DIY with proper PPE and precautions. However, areas larger than 1m², black mould, or mould in HVAC systems require professional remediation. When in doubt, get a professional assessment.'
    },
    {
      question: 'Is black mould really more dangerous than other moulds?',
      answer: 'While Stachybotrys (black mould) can produce mycotoxins that are particularly harmful, many moulds can cause health issues. The color doesn\'t always indicate toxicity - proper identification and safe removal are important regardless of type.'
    },
    {
      question: 'Will insurance cover mould remediation?',
      answer: 'Coverage varies significantly. Mould from sudden water damage (burst pipe, storm) may be covered, but gradual mould growth or maintenance-related mould is typically excluded. Review your policy\'s mould provisions and consider additional coverage.'
    },
    {
      question: 'How do I know if mould is making me sick?',
      answer: 'Common symptoms include respiratory issues, allergies, headaches, and fatigue that improve when away from the affected area. Consult a healthcare provider for persistent symptoms and consider professional mould testing in your property.'
    },
    {
      question: 'What\'s the difference between mould removal and remediation?',
      answer: 'Removal simply eliminates visible mould, while remediation addresses the root cause, removes contamination, and implements prevention measures. Professional remediation includes containment, air filtration, and post-remediation verification.'
    },
    {
      question: 'Can mould come back after professional remediation?',
      answer: 'Mould can return if moisture issues aren\'t resolved. Proper remediation addresses both mould and moisture sources. Maintain 30-50% humidity, ensure good ventilation, and fix water issues promptly to prevent recurrence.'
    },
    {
      question: 'How long does professional mould remediation take?',
      answer: 'Timeline depends on extent: Level 1 (small) 1-2 days, Level 2 (medium) 2-4 days, Level 3-4 (large) 5+ days. This includes assessment, containment, removal, and clearance testing. Reconstruction may add additional time.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-teal-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-900 to-teal-900 text-white py-24">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <Droplets className="w-20 h-20 text-teal-400" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Mould Remediation Guide
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-teal-100">
              Complete Mould Identification, Health Risks & Professional Remediation
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/whos-first/mould-remediation"
                className="bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Get Mould Help Now
              </Link>
              <Link
                href="/insurance-decoder/mould-coverage"
                className="bg-white text-teal-900 hover:bg-teal-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
              >
                <Shield className="w-5 h-5" />
                Check Mould Coverage
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Health Warning Banner */}
      <section className="bg-red-50 border-y-4 border-red-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-900 text-lg mb-2">Health Warning</h3>
              <p className="text-red-800">
                Mould exposure can cause serious health effects, especially for those with respiratory conditions, 
                allergies, or compromised immune systems. If experiencing severe symptoms, seek medical attention 
                immediately. Never attempt to remove large areas of mould without proper protective equipment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mould Types Identification */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Info className="w-8 h-8 text-teal-600" />
              Common Mould Types in Australian Properties
            </h2>
            
            <div className="mb-8 flex flex-wrap gap-3">
              {Object.keys(mouldTypes).map((key) => (
                <button
                  key={key}
                  onClick={() => setSelectedMouldType(key)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all text-sm ${
                    selectedMouldType === key
                      ? 'bg-teal-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-teal-50 border border-gray-200'
                  }`}
                >
                  {mouldTypes[key as keyof typeof mouldTypes].name}
                </button>
              ))}
            </div>

            <motion.div
              key={selectedMouldType}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4 }}
              className="bg-gradient-to-br from-teal-50 to-white rounded-xl shadow-xl p-8 border border-teal-100"
            >
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold mb-4 text-teal-900">
                    {mouldTypes[selectedMouldType as keyof typeof mouldTypes].name}
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <span className="font-semibold">Appearance:</span>
                      <p className="text-gray-700">{mouldTypes[selectedMouldType as keyof typeof mouldTypes].color}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Common Locations:</span>
                      <p className="text-gray-700">{mouldTypes[selectedMouldType as keyof typeof mouldTypes].commonLocations}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Growth Conditions:</span>
                      <p className="text-gray-700">{mouldTypes[selectedMouldType as keyof typeof mouldTypes].growthConditions}</p>
                    </div>
                    <div>
                      <span className="font-semibold">Identification Tips:</span>
                      <p className="text-gray-700">{mouldTypes[selectedMouldType as keyof typeof mouldTypes].identificationTips}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="bg-white rounded-lg p-6 shadow-md">
                    <h4 className="font-semibold mb-4 text-lg">Risk Assessment</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Health Risk:</span>
                        <span className={`px-3 py-1 rounded text-sm font-semibold ${
                          mouldTypes[selectedMouldType as keyof typeof mouldTypes].healthRisk.includes('Very High')
                            ? 'bg-red-100 text-red-800'
                            : mouldTypes[selectedMouldType as keyof typeof mouldTypes].healthRisk.includes('High')
                            ? 'bg-orange-100 text-orange-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {mouldTypes[selectedMouldType as keyof typeof mouldTypes].healthRisk}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="font-semibold">Removal Difficulty:</span>
                        <span className={`px-3 py-1 rounded text-sm font-semibold ${
                          mouldTypes[selectedMouldType as keyof typeof mouldTypes].removalDifficulty.includes('Very High')
                            ? 'bg-red-100 text-red-800'
                            : mouldTypes[selectedMouldType as keyof typeof mouldTypes].removalDifficulty.includes('High')
                            ? 'bg-orange-100 text-orange-800'
                            : mouldTypes[selectedMouldType as keyof typeof mouldTypes].removalDifficulty === 'Moderate'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-green-100 text-green-800'
                        }`}>
                          {mouldTypes[selectedMouldType as keyof typeof mouldTypes].removalDifficulty}
                        </span>
                      </div>
                    </div>
                    {mouldTypes[selectedMouldType as keyof typeof mouldTypes].name === 'Stachybotrys (Black Mould)' && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded">
                        <p className="text-sm text-red-800 font-semibold">
                          ⚠️ Warning: Professional remediation required. Do not attempt DIY removal.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Health Symptoms */}
      <section className="py-16 bg-gradient-to-br from-red-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Heart className="w-8 h-8 text-red-600" />
              Health Effects of Mould Exposure
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {healthSymptoms.map((category, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold">{category.category}</h3>
                    <span className={`px-3 py-1 rounded text-sm font-semibold ${
                      category.severity === 'Very Common'
                        ? 'bg-orange-100 text-orange-800'
                        : category.severity === 'Common'
                        ? 'bg-yellow-100 text-yellow-800'
                        : category.severity === 'Less Common'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {category.severity}
                    </span>
                  </div>
                  <ul className="space-y-2 mb-4">
                    {category.symptoms.map((symptom, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-gray-700">
                        <CheckCircle className="w-4 h-4 text-red-500" />
                        <span className="text-sm">{symptom}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-gray-200">
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">At Risk:</span> {category.atRisk}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 bg-yellow-50 border-2 border-yellow-200 rounded-lg p-6">
              <p className="text-sm text-yellow-800">
                <strong>Medical Advice:</strong> If you experience persistent symptoms related to mould exposure, 
                consult a healthcare professional immediately. Document your symptoms and exposure for medical assessment.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Mould Classifications */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <TrendingUp className="w-8 h-8 text-teal-600" />
              Mould Contamination Classifications
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {mouldClassifications.map((level, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`rounded-lg p-6 border-2 ${
                    index === 0 
                      ? 'bg-green-50 border-green-300'
                      : index === 1
                      ? 'bg-yellow-50 border-yellow-300'
                      : index === 2
                      ? 'bg-orange-50 border-orange-300'
                      : 'bg-red-50 border-red-300'
                  }`}
                >
                  <h3 className="text-xl font-bold mb-2">{level.level}</h3>
                  <p className="text-2xl font-bold mb-2 text-gray-800">{level.area}</p>
                  <p className="text-sm text-gray-600 mb-3">{level.description}</p>
                  <div className="space-y-2 text-sm">
                    <p><span className="font-semibold">Action:</span> {level.action}</p>
                    <p><span className="font-semibold">PPE:</span> {level.ppe}</p>
                    <p className="text-gray-600 italic">{level.examples}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Remediation Process */}
      <section className="py-16 bg-gradient-to-br from-teal-50 to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <Clock className="w-8 h-8 text-teal-600" />
              Professional Remediation Process
            </h2>
            <div className="space-y-4">
              {remediationStages.map((stage, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                    stage.critical ? 'border-l-4 border-red-500' : 'border-l-4 border-teal-500'
                  }`}
                >
                  <div className="flex items-stretch">
                    <div className="w-20 bg-gradient-to-br from-teal-600 to-teal-700 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white">{stage.stage}</span>
                    </div>
                    <div className="flex-grow p-6">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-xl font-bold">{stage.title}</h3>
                        <div className="flex items-center gap-3">
                          <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded text-sm font-semibold">
                            {stage.duration}
                          </span>
                          {stage.critical && (
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded text-sm font-semibold">
                              Critical
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-2">
                        {stage.activities.map((activity, idx) => (
                          <div key={idx} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span className="text-sm text-gray-700">{activity}</span>
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

      {/* Prevention Strategies */}
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
              Mould Prevention Strategies
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {preventionStrategies.map((strategy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-blue-50 to-white rounded-lg shadow-lg p-6 border border-blue-100"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-3 bg-blue-100 rounded-full text-blue-600">
                      {strategy.icon}
                    </div>
                    <h3 className="font-bold text-lg">{strategy.area}</h3>
                  </div>
                  <ul className="space-y-2">
                    {strategy.strategies.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Insurance Coverage */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              Mould & Insurance Coverage
            </h2>
            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 mb-8">
              <p className="text-sm text-blue-800">
                <strong>Important:</strong> Mould coverage varies significantly between insurers and policies. 
                Many standard policies exclude mould or have strict limitations. Always review your specific 
                policy and consider additional mould coverage if available.
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {insuranceAspects.map((aspect, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-lg shadow-lg p-6"
                >
                  <h3 className="font-bold text-lg mb-2">{aspect.aspect}</h3>
                  <span className={`inline-block px-3 py-1 rounded text-xs font-semibold mb-3 ${
                    aspect.coverage === 'Variable'
                      ? 'bg-yellow-100 text-yellow-800'
                      : aspect.coverage === 'Often Excluded'
                      ? 'bg-red-100 text-red-800'
                      : aspect.coverage === 'Potentially Covered'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {aspect.coverage}
                  </span>
                  <p className="text-gray-600 text-sm mb-3">{aspect.details}</p>
                  <div className="pt-3 border-t border-gray-200">
                    <p className="text-sm font-semibold text-blue-600">
                      💡 {aspect.tip}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/insurance-decoder/mould-coverage"
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                <Calculator className="w-5 h-5" />
                Check Your Mould Coverage
              </Link>
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
              <Building className="w-8 h-8 text-teal-600" />
              Property-Specific Mould Considerations
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
                  <li>• Bathroom and kitchen ventilation</li>
                  <li>• Basement moisture control</li>
                  <li>• Attic insulation and ventilation</li>
                  <li>• Window condensation management</li>
                  <li>• Regular HVAC maintenance</li>
                </ul>
                <Link
                  href="/property/residential/mould-prevention"
                  className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
                >
                  Residential Mould Guide <ChevronRight className="w-4 h-4" />
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
                  <li>• HVAC system monitoring</li>
                  <li>• Workplace health compliance</li>
                  <li>• Regular professional inspections</li>
                  <li>• Employee health documentation</li>
                  <li>• Liability considerations</li>
                </ul>
                <Link
                  href="/property/commercial/mould-management"
                  className="mt-4 inline-flex items-center text-green-600 hover:text-green-700 font-semibold"
                >
                  Commercial Mould Guide <ChevronRight className="w-4 h-4" />
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
                  <li>• Large-scale ventilation systems</li>
                  <li>• Process moisture management</li>
                  <li>• Safety compliance requirements</li>
                  <li>• Equipment protection protocols</li>
                  <li>• Environmental monitoring</li>
                </ul>
                <Link
                  href="/property/industrial/mould-control"
                  className="mt-4 inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold"
                >
                  Industrial Mould Guide <ChevronRight className="w-4 h-4" />
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
              <HelpCircle className="w-8 h-8 text-teal-600" />
              Mould Remediation FAQs
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
                      className={`w-5 h-5 transition-transform text-teal-600 ${
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
              <BookOpen className="w-8 h-8 text-teal-600" />
              Related Mould Resources
            </h2>
            <div className="grid md:grid-cols-4 gap-6">
              <Link
                href="/guides/water-damage"
                className="bg-gradient-to-br from-blue-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-blue-100"
              >
                <Droplets className="w-10 h-10 text-blue-600 mb-3" />
                <h3 className="font-bold mb-2">Water Damage Guide</h3>
                <p className="text-gray-600 text-sm">Preventing mould through water damage control</p>
              </Link>
              
              <Link
                href="/emergency/diy/mould-prevention"
                className="bg-gradient-to-br from-orange-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-orange-100"
              >
                <AlertCircle className="w-10 h-10 text-orange-600 mb-3" />
                <h3 className="font-bold mb-2">DIY Prevention</h3>
                <p className="text-gray-600 text-sm">Steps you can take to prevent mould growth</p>
              </Link>
              
              <Link
                href="/emergency/safety/mould-exposure"
                className="bg-gradient-to-br from-red-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-red-100"
              >
                <Heart className="w-10 h-10 text-red-600 mb-3" />
                <h3 className="font-bold mb-2">Health & Safety</h3>
                <p className="text-gray-600 text-sm">Protecting yourself from mould exposure</p>
              </Link>
              
              <Link
                href="/locations/sydney/mould-remediation"
                className="bg-gradient-to-br from-green-50 to-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all border border-green-100"
              >
                <MapPin className="w-10 h-10 text-green-600 mb-3" />
                <h3 className="font-bold mb-2">Local Services</h3>
                <p className="text-gray-600 text-sm">Find mould specialists in your area</p>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-teal-600 to-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Concerned About Mould in Your Property?
            </h2>
            <p className="text-xl mb-8 text-teal-100">
              Get professional mould inspection and remediation services
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/whos-first/mould-remediation"
                className="bg-white text-teal-600 hover:bg-teal-50 px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-5 h-5" />
                Get Professional Help
              </Link>
              <Link
                href="/emergency/checklists/mould-inspection"
                className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center gap-2"
              >
                <FileText className="w-5 h-5" />
                Self-Inspection Checklist
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
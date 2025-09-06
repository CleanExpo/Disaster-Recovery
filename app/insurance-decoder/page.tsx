'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, AlertCircle, FileText, HelpCircle, Shield, AlertTriangle, CheckCircle, XCircle, Book, Calculator, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function InsuranceDecoderHub() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'coverage' | 'exclusion' | 'process'>('all');

  const commonTerms = [
    {
      id: 'sudden-accidental',
      term: 'Sudden & Accidental',
      category: 'coverage',
      snippet: 'Damage that happens unexpectedly, not over time',
      impact: 'critical',
      icon: AlertCircle
    },
    {
      id: 'gradual-damage',
      term: 'Gradual Damage',
      category: 'exclusion',
      snippet: 'Damage occurring slowly over time - usually not covered',
      impact: 'critical',
      icon: XCircle
    },
    {
      id: 'maintenance-issue',
      term: 'Maintenance Issue',
      category: 'exclusion',
      snippet: 'Damage from lack of proper upkeep - typically excluded',
      impact: 'critical',
      icon: AlertTriangle
    },
    {
      id: 'mitigation-duty',
      term: 'Duty to Mitigate',
      category: 'process',
      snippet: 'Your obligation to prevent further damage',
      impact: 'important',
      icon: Shield
    },
    {
      id: 'proximate-cause',
      term: 'Proximate Cause',
      category: 'coverage',
      snippet: 'The primary cause that sets damage in motion',
      impact: 'critical',
      icon: FileText
    },
    {
      id: 'wear-tear',
      term: 'Wear and Tear',
      category: 'exclusion',
      snippet: 'Normal aging and deterioration - standard exclusion',
      impact: 'important',
      icon: XCircle
    }
  ];

  const popularScenarios = [
    {
      title: 'Burst Pipe Water Damage',
      url: '/is-it-covered/burst-pipe',
      probability: 85,
      factors: ['Sudden event', 'No maintenance issue', 'Quick notification']
    },
    {
      title: 'Bathroom Mould Discovery',
      url: '/is-it-covered/bathroom-mould',
      probability: 35,
      factors: ['Often gradual', 'Maintenance related', 'Pre-existing condition']
    },
    {
      title: 'Storm Roof Damage',
      url: '/is-it-covered/storm-roof',
      probability: 75,
      factors: ['Weather event', 'Documentation needed', 'Pre-damage condition matters']
    },
    {
      title: 'Slow Shower Leak',
      url: '/is-it-covered/shower-leak',
      probability: 20,
      factors: ['Gradual damage', 'Maintenance issue', 'Wear and tear']
    }
  ];

  const insurerComparisons = [
    {
      comparison: 'AAMI vs Suncorp',
      damageType: 'Water Damage',
      url: '/insurance-coverage/water-damage/aami-vs-suncorp',
      keyDifference: 'Hidden gradual damage coverage varies'
    },
    {
      comparison: 'Allianz vs NRMA',
      damageType: 'Storm Damage',
      url: '/insurance-coverage/storm-damage/allianz-vs-nrma',
      keyDifference: 'Storm definition and timing requirements'
    },
    {
      comparison: 'QBE vs CGU',
      damageType: 'Fire Damage',
      url: '/insurance-coverage/fire-damage/qbe-vs-cgu',
      keyDifference: 'Smoke damage extent coverage'
    }
  ];

  const filteredTerms = commonTerms.filter(term => {
    const matchesSearch = term.term.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          term.snippet.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center text-white"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Insurance Decoder
            </h1>
            <p className="text-2xl mb-4">
              Understanding Your Coverage Before Disaster Strikes
            </p>
            <p className="text-xl text-blue-200 mb-8 max-w-3xl mx-auto">
              We translate confusing policy language into clear answers. Know what's covered, 
              what's not, and why - explained by restoration experts who've seen thousands of claims.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-2xl p-2">
              <div className="flex items-center gap-2">
                <Search className="w-6 h-6 text-gray-400 ml-2" />
                <input
                  type="text"
                  placeholder="Search insurance terms, coverage questions..."
                  className="flex-1 px-4 py-3 text-gray-800 outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="bg-blue-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors">
                  Search
                </button>
              </div>
            </div>
          </motion.div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-4 gap-4 mt-12"
          >
            {[
              { number: '500+', label: 'Terms Decoded' },
              { number: '10,000+', label: 'Claims Analyzed' },
              { number: '95%', label: 'Success Rate' },
              { number: '24/7', label: 'Expert Help' }
            ].map((stat, index) => (
              <div key={index} className="bg-white/10 backdrop-blur rounded-lg p-4 text-center">
                <p className="text-3xl font-bold text-white">{stat.number}</p>
                <p className="text-blue-200">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 px-4 bg-white border-b">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              { value: 'all', label: 'All Terms', icon: Book },
              { value: 'coverage', label: 'Coverage Terms', icon: CheckCircle },
              { value: 'exclusion', label: 'Exclusions', icon: XCircle },
              { value: 'process', label: 'Process Terms', icon: FileText }
            ].map(cat => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.value}
                  onClick={() => setSelectedCategory(cat.value as any)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all ${
                    selectedCategory === cat.value
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Common Terms Grid */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Common Insurance Terms Decoded
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTerms.map((term) => {
              const Icon = term.icon;
              return (
                <motion.div
                  key={term.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <Link href={`/insurance-decoder/${term.id}`}>
                    <div className={`p-4 ${
                      term.category === 'coverage' ? 'bg-green-50' :
                      term.category === 'exclusion' ? 'bg-red-50' :
                      'bg-blue-50'
                    }`}>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className={`w-6 h-6 ${
                            term.category === 'coverage' ? 'text-green-600' :
                            term.category === 'exclusion' ? 'text-red-600' :
                            'text-blue-600'
                          }`} />
                          <h3 className="text-lg font-bold">{term.term}</h3>
                        </div>
                        {term.impact === 'critical' && (
                          <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-semibold">
                            Critical
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="p-6">
                      <p className="text-gray-700 mb-4">{term.snippet}</p>
                      <div className="flex items-center justify-between">
                        <span className={`text-sm font-semibold ${
                          term.category === 'coverage' ? 'text-green-600' :
                          term.category === 'exclusion' ? 'text-red-600' :
                          'text-blue-600'
                        }`}>
                          {term.category.charAt(0).toUpperCase() + term.category.slice(1)}
                        </span>
                        <ArrowRight className="w-5 h-5 text-gray-400" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Coverage Checker Tool */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Is Your Damage Covered? Check Now
            </h2>
            <p className="text-xl text-gray-700">
              Our intelligent coverage checker analyzes your specific situation
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {popularScenarios.map((scenario, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <Link href={scenario.url}>
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-xl font-bold">{scenario.title}</h3>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Coverage Probability</p>
                      <p className={`text-2xl font-bold ${
                        scenario.probability >= 70 ? 'text-green-600' :
                        scenario.probability >= 40 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {scenario.probability}%
                      </p>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                      <div
                        className={`h-full transition-all ${
                          scenario.probability >= 70 ? 'bg-green-500' :
                          scenario.probability >= 40 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${scenario.probability}%` }}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-gray-700">Key Factors:</p>
                    {scenario.factors.map((factor, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-blue-500" />
                        {factor}
                      </div>
                    ))}
                  </div>
                  
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                    Check Your Scenario
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/is-it-covered"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-blue-700 transition-colors shadow-lg"
            >
              <Calculator className="w-6 h-6" />
              Use Coverage Calculator
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Insurer Comparisons */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Compare Insurer Coverage
          </h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {insurerComparisons.map((comp, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all"
              >
                <Link href={comp.url}>
                  <div className="flex items-center justify-between mb-4">
                    <Users className="w-8 h-8 text-blue-600" />
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                      Compare
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{comp.comparison}</h3>
                  <p className="text-gray-600 mb-3">{comp.damageType}</p>
                  <div className="bg-white rounded-lg p-3">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Key Difference:</span> {comp.keyDifference}
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link
              href="/insurance-coverage"
              className="text-blue-600 font-semibold hover:underline"
            >
              View All Insurer Comparisons →
            </Link>
          </div>
        </div>
      </section>

      {/* Educational Disclaimer */}
      <section className="py-12 px-4 bg-yellow-50 border-t-4 border-yellow-400">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-yellow-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold mb-2">Important Educational Notice</h3>
              <p className="text-gray-700 mb-3">
                This information is general education only. Every insurance policy is different. 
                We are restoration contractors sharing industry knowledge, not insurance advisors.
              </p>
              <ul className="space-y-1 text-sm text-gray-600">
                <li>• Always consult your specific policy documents</li>
                <li>• Contact your insurer for definitive coverage decisions</li>
                <li>• We help with restoration and claim documentation, not coverage determination</li>
                <li>• Information based on typical Australian policies - yours may differ</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Do Not Let Confusion Cost You Coverage
          </h2>
          <p className="text-xl mb-8">
            Understanding your policy BEFORE disaster strikes can mean the difference 
            between full coverage and claim denial. We're here to help you navigate the complexity.
          </p>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
            <p className="text-2xl font-bold mb-4">Need Expert Help With Your Claim?</p>
            <p className="text-lg mb-6">
              Our restoration experts know exactly what insurers look for and how to document properly
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="tel:1800000000"
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg shadow-lg transition-all hover:scale-105"
              >
                Call: 1800 000 000
              </a>
              <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg shadow-lg hover:bg-gray-100 transition-all">
                Start Online Assessment
              </button>
            </div>
          </div>
          
          <p className="text-blue-200">
            Available 24/7 • Insurance Approved • Maximum Coverage Support
          </p>
        </div>
      </section>
    </div>
  );
}
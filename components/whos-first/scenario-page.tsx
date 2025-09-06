'use client';

import { motion } from 'framer-motion';
import { Phone, AlertTriangle, Clock, Shield, DollarSign, CheckCircle, XCircle, ArrowRight, AlertCircle, FileText, Users, Heart } from 'lucide-react';
import { WhosFirstScenario } from '@/lib/whos-first-generator';
import Link from 'next/link';

interface Props {
  scenario: WhosFirstScenario;
}

export default function WhosFirstScenarioPage({ scenario }: Props) {
  return (
    <div className="min-h-screen bg-white">
      {/* Emergency Banner */}
      <div className="bg-red-600 text-white py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 animate-pulse" />
            <span className="font-semibold">Emergency? Call us first: 1800 000 000</span>
          </div>
          <span className="text-sm">Available 24/7</span>
        </div>
      </div>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-900 to-blue-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{scenario.question}</h1>
            <p className="text-2xl mb-6">The Answer: <span className="text-yellow-400">Disaster Recovery - Always First</span></p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white/10 backdrop-blur rounded-xl p-6 mb-8"
          >
            <h2 className="text-xl font-semibold mb-3">Your Situation:</h2>
            <p className="text-lg leading-relaxed">{scenario.situation}</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4 justify-center"
          >
            <a
              href="tel:1800000000"
              className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg flex items-center gap-2 shadow-xl transition-all hover:scale-105"
            >
              <Phone className="w-6 h-6" />
              Call Us First Now
            </a>
            <button className="bg-white text-blue-900 px-8 py-4 rounded-lg font-bold text-lg shadow-xl hover:bg-gray-100 transition-all">
              Get Immediate Help Online
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why Call Us First */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Disaster Recovery Should Be Your First Call
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenario.whyUsFirst.map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{reason}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wrong First Calls */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Common Mistakes: Wrong First Calls
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            These seem logical but can cost you thousands and weeks of delays
          </p>
          
          <div className="space-y-6">
            {scenario.wrongFirstCalls.map((mistake, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6"
              >
                <div className="flex items-start gap-4">
                  <XCircle className="w-8 h-8 text-red-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-red-900 mb-2">
                      Calling {mistake.who} First
                    </h3>
                    <p className="text-gray-700">{mistake.consequence}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-50 to-blue-100">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Happens When You Call Us First
          </h2>
          
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="space-y-4">
              {scenario.ourProcess.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-4 pb-4 border-b last:border-0"
                >
                  <div className="bg-blue-600 text-white w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <p className="text-lg text-gray-700">{step}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Critical Timeline */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Every Minute Counts: Critical Timeline
          </h2>
          <p className="text-center text-gray-600 mb-12 text-lg">
            The first 24 hours determine your outcome
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenario.timelineCritical.map((timeline, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg p-6 border-2 border-orange-300"
              >
                <Clock className="w-8 h-8 text-orange-600 mb-3" />
                <p className="font-semibold text-gray-800">{timeline}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cost Impact */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            The Financial Impact of Calling Us First
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <DollarSign className="w-12 h-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">With Us First</h3>
              <p className="text-3xl font-bold text-green-600 mb-2">{scenario.costImpact.withUs}</p>
              <p className="text-gray-600">Properly managed claim</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <DollarSign className="w-12 h-12 text-red-600 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Wrong First Call</h3>
              <p className="text-3xl font-bold text-red-600 mb-2">{scenario.costImpact.withoutUs}</p>
              <p className="text-gray-600">Mistakes & delays</p>
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl shadow-lg p-8 text-center"
            >
              <CheckCircle className="w-12 h-12 mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">You Save</h3>
              <p className="text-3xl font-bold mb-2">{scenario.costImpact.savings}</p>
              <p>Plus weeks of stress</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insurance Insights */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Insurance Insights: What They Don't Tell You
          </h2>
          
          <div className="bg-blue-50 rounded-2xl p-8">
            <div className="grid md:grid-cols-2 gap-6">
              {scenario.insuranceInsights.map((insight, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <FileText className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{insight}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Health & Safety */}
      <section className="py-16 px-4 bg-red-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Health & Safety Risks You May Not Know
          </h2>
          
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="space-y-4">
              {scenario.healthSafety.map((risk, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-3"
                >
                  <AlertTriangle className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700 text-lg">{risk}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-6">
            {scenario.faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                <details className="group">
                  <summary className="px-6 py-4 cursor-pointer list-none flex items-center justify-between hover:bg-gray-50">
                    <span className="text-lg font-semibold text-gray-800">{faq.question}</span>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="text-gray-700">{faq.answer}</p>
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study */}
      {scenario.caseStudy && (
        <section className="py-16 px-4 bg-gradient-to-br from-green-50 to-green-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Real Success Story
            </h2>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl p-8"
            >
              <h3 className="text-2xl font-bold mb-4 text-green-700">
                {scenario.caseStudy.title}
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">The Situation:</h4>
                  <p className="text-gray-700">{scenario.caseStudy.situation}</p>
                </div>
                
                <div>
                  <h4 className="font-bold text-gray-800 mb-2">Our Action:</h4>
                  <p className="text-gray-700">{scenario.caseStudy.action}</p>
                </div>
                
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-bold text-green-800 mb-2">The Result:</h4>
                  <p className="text-green-700 font-semibold">{scenario.caseStudy.result}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Don't Make The Wrong First Call
          </h2>
          <p className="text-xl mb-8">
            Every minute you wait or call the wrong service first costs you money, 
            increases damage, and reduces your insurance coverage.
          </p>
          
          <div className="bg-white/10 backdrop-blur rounded-xl p-8 mb-8">
            <p className="text-3xl font-bold mb-4">Remember: Who's First?</p>
            <p className="text-4xl font-bold text-yellow-400">Disaster Recovery. Always.</p>
          </div>
          
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="tel:1800000000"
              className="bg-green-500 hover:bg-green-600 text-white px-10 py-5 rounded-lg font-bold text-xl flex items-center gap-3 shadow-2xl transition-all hover:scale-105"
            >
              <Phone className="w-7 h-7" />
              Call Us First: 1800 000 000
            </a>
            <button className="bg-white text-blue-900 px-10 py-5 rounded-lg font-bold text-xl shadow-2xl hover:bg-gray-100 transition-all">
              Start Online Assessment
            </button>
          </div>
          
          <p className="mt-6 text-blue-200">
            Available 24/7 • Immediate Response • Insurance Approved
          </p>
        </div>
      </section>

      {/* Related Scenarios */}
      <section className="py-12 px-4 bg-gray-100">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-2xl font-bold mb-6">Related "Who's First?" Scenarios</h3>
          <div className="flex flex-wrap gap-3">
            {scenario.relatedScenarios.map((related, index) => (
              <Link
                key={index}
                href={`/whos-first/${related}`}
                className="bg-white px-4 py-2 rounded-lg shadow hover:shadow-md transition-shadow text-blue-600 hover:text-blue-700"
              >
                {related.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
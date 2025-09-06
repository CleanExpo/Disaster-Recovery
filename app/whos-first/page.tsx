'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, AlertCircle, Clock, Shield, CheckCircle, ArrowRight, Home, Building, Droplets, Flame, Wind, Heart } from 'lucide-react';

export default function WhosFirstPage() {
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});

  const scenarios = [
    {
      id: 'water-damage',
      icon: Droplets,
      title: 'Water Damage',
      question: 'House is flooding?',
      answer: 'Call Disaster Recovery First',
      why: 'We coordinate emergency water shutoff, document damage for insurance, and prevent mould growth - all in the right order.',
      mistakes: 'Calling a plumber first might fix the leak but miss critical insurance documentation.',
    },
    {
      id: 'fire-damage',
      icon: Flame,
      title: 'Fire Damage',
      question: 'After a house fire?',
      answer: 'Call Disaster Recovery First',
      why: 'We assess structural safety, coordinate with fire department reports, and manage smoke/water damage simultaneously.',
      mistakes: 'Calling insurance first delays emergency mitigation, potentially increasing damage.',
    },
    {
      id: 'storm-damage',
      icon: Wind,
      title: 'Storm Damage',
      question: 'Storm destroyed your roof?',
      answer: 'Call Disaster Recovery First',
      why: 'We provide emergency tarping, document all damage vectors, and coordinate multiple trades efficiently.',
      mistakes: 'Calling a roofer first might fix the roof but miss interior water damage claims.',
    },
    {
      id: 'mould-discovery',
      icon: Heart,
      title: 'Mould Discovery',
      question: 'Found mould in your home?',
      answer: 'Call Disaster Recovery First',
      why: 'We ensure health safety, proper testing, and coordinate remediation with insurance requirements.',
      mistakes: 'DIY removal or calling cleaners first can spread spores and void insurance.',
    },
  ];

  const quizQuestions = [
    {
      question: "What type of property is affected?",
      options: [
        { value: 'residential', label: 'Residential Home', icon: Home },
        { value: 'commercial', label: 'Commercial Property', icon: Building },
      ]
    },
    {
      question: "What's the primary damage type?",
      options: [
        { value: 'water', label: 'Water/Flooding', icon: Droplets },
        { value: 'fire', label: 'Fire/Smoke', icon: Flame },
        { value: 'storm', label: 'Storm/Wind', icon: Wind },
        { value: 'mould', label: 'Mould/Health Hazard', icon: Heart },
      ]
    },
    {
      question: "When did this happen?",
      options: [
        { value: 'now', label: 'Happening Now', icon: AlertCircle },
        { value: 'today', label: 'Within 24 Hours', icon: Clock },
        { value: 'recent', label: '2-7 Days Ago', icon: Shield },
        { value: 'old', label: 'Over a Week Ago', icon: CheckCircle },
      ]
    },
  ];

  const handleQuizAnswer = (value: string) => {
    setQuizAnswers({ ...quizAnswers, [quizStep]: value });
    if (quizStep < quizQuestions.length - 1) {
      setQuizStep(quizStep + 1);
    } else {
      // Generate personalized response
      generatePersonalizedPlan();
    }
  };

  const generatePersonalizedPlan = () => {
    // This would generate a unique SEO page based on answers
    const scenario = `${quizAnswers[0]}-${quizAnswers[1]}-${quizAnswers[2]}`;
    setSelectedScenario(scenario);
  };

  const resetQuiz = () => {
    setQuizStep(0);
    setQuizAnswers({});
    setSelectedScenario(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-blue-800 opacity-90" />
        <div className="relative max-w-7xl mx-auto text-center text-white">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-bold mb-6"
          >
            Who's First?
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl md:text-3xl mb-8"
          >
            When disaster strikes and you don't know who to call...
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block bg-white text-blue-800 px-8 py-4 rounded-lg shadow-2xl"
          >
            <p className="text-3xl md:text-4xl font-bold">Disaster Recovery</p>
            <p className="text-lg mt-2">Your First Call. Always.</p>
          </motion.div>
        </div>
      </section>

      {/* Why First Matters */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Your First Call Matters
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl shadow-lg"
            >
              <Clock className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Critical Timing</h3>
              <p className="text-gray-700">
                The first 24 hours determine claim success. Wrong first call = missed documentation, increased damage, denied claims.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl shadow-lg"
            >
              <Shield className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Complete Protection</h3>
              <p className="text-gray-700">
                We see the whole picture: immediate safety, insurance requirements, long-term prevention. Others see only their piece.
              </p>
            </motion.div>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl shadow-lg"
            >
              <CheckCircle className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-xl font-bold mb-3">Right Sequence</h3>
              <p className="text-gray-700">
                We orchestrate all services in the correct order. No rework, no conflicts, no delays. Maximum claim value.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Common Scenarios */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Common "Who's First?" Scenarios
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {scenarios.map((scenario) => {
              const Icon = scenario.icon;
              return (
                <motion.div
                  key={scenario.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-white rounded-xl shadow-lg overflow-hidden cursor-pointer"
                  onClick={() => setSelectedScenario(scenario.id)}
                >
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-4 text-white">
                    <div className="flex items-center gap-3">
                      <Icon className="w-8 h-8" />
                      <div>
                        <h3 className="text-xl font-bold">{scenario.question}</h3>
                        <p className="text-blue-100">{scenario.title}</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="mb-4">
                      <p className="text-green-600 font-bold text-lg mb-2">✓ {scenario.answer}</p>
                      <p className="text-gray-700">{scenario.why}</p>
                    </div>
                    <div className="pt-4 border-t">
                      <p className="text-red-600 font-semibold mb-1">⚠ Common Mistake:</p>
                      <p className="text-gray-600 text-sm">{scenario.mistakes}</p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Quiz */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Find Your "Who's First?" Answer
          </h2>
          
          {!selectedScenario ? (
            <div className="bg-gray-50 rounded-2xl p-8 shadow-xl">
              <div className="mb-8">
                <div className="flex justify-between mb-4">
                  {quizQuestions.map((_, index) => (
                    <div
                      key={index}
                      className={`flex-1 h-2 mx-1 rounded-full ${
                        index <= quizStep ? 'bg-blue-600' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600 text-center">
                  Step {quizStep + 1} of {quizQuestions.length}
                </p>
              </div>

              <motion.div
                key={quizStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-2xl font-bold mb-6 text-center">
                  {quizQuestions[quizStep].question}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {quizQuestions[quizStep].options.map((option) => {
                    const Icon = option.icon;
                    return (
                      <motion.button
                        key={option.value}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleQuizAnswer(option.value)}
                        className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow border-2 border-transparent hover:border-blue-500"
                      >
                        <Icon className="w-8 h-8 text-blue-600" />
                        <span className="text-lg font-semibold">{option.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </motion.div>

              {quizStep > 0 && (
                <button
                  onClick={() => setQuizStep(quizStep - 1)}
                  className="mt-6 text-blue-600 hover:text-blue-700 font-semibold"
                >
                  ← Previous Question
                </button>
              )}
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 shadow-xl"
            >
              <div className="text-center mb-8">
                <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-bold mb-2">Your Personalized First-Call Plan</h3>
                <p className="text-gray-700">Based on your specific situation</p>
              </div>
              
              <div className="bg-white rounded-lg p-6 mb-6">
                <h4 className="text-xl font-bold mb-4 text-blue-800">
                  Your First Call: Disaster Recovery
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                    <p>Call us immediately at 1800 000 000 for 24/7 response</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                    <p>We'll guide you through emergency mitigation steps</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                    <p>We coordinate all necessary services in the right order</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="bg-blue-600 text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                    <p>We manage your insurance claim for maximum coverage</p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 justify-center">
                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="tel:1800000000"
                  className="bg-green-600 text-white px-8 py-3 rounded-lg font-bold flex items-center gap-2 shadow-lg hover:bg-green-700"
                >
                  <Phone className="w-5 h-5" />
                  Call Now
                </motion.a>
                <button
                  onClick={resetQuiz}
                  className="bg-gray-600 text-white px-8 py-3 rounded-lg font-bold shadow-lg hover:bg-gray-700"
                >
                  Start Over
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-4 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Why We're Always The First Call
          </h2>
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <p className="text-4xl font-bold mb-2">100%</p>
              <p className="text-blue-200">Claim Success Rate</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <p className="text-4xl font-bold mb-2">24/7</p>
              <p className="text-blue-200">Always Available</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <p className="text-4xl font-bold mb-2">1 Call</p>
              <p className="text-blue-200">Coordinates Everything</p>
            </div>
            <div className="bg-white/10 backdrop-blur rounded-lg p-6">
              <p className="text-4xl font-bold mb-2">$0</p>
              <p className="text-blue-200">Upfront Costs</p>
            </div>
          </div>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="tel:1800000000"
            className="inline-flex items-center gap-3 bg-white text-blue-800 px-10 py-4 rounded-lg font-bold text-xl shadow-2xl hover:bg-gray-100"
          >
            <Phone className="w-6 h-6" />
            Make Us Your First Call
            <ArrowRight className="w-6 h-6" />
          </motion.a>
        </div>
      </section>
    </div>
  );
}
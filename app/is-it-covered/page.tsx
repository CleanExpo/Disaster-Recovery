'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calculator, AlertCircle, CheckCircle, XCircle, AlertTriangle, FileText, Camera, Clock, Shield, TrendingUp, TrendingDown, Phone } from 'lucide-react';
import { InsuranceDecoder } from '@/lib/insurance-decoder';

export default function CoverageChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<any>(null);
  const [selectedScenario, setSelectedScenario] = useState<string>('');

  const scenarios = [
    { id: 'water-burst-pipe', label: 'Burst Pipe Water Damage', icon: '💧' },
    { id: 'water-roof-leak', label: 'Roof Leak During Storm', icon: '🌧️' },
    { id: 'water-shower-leak', label: 'Bathroom/Shower Leak', icon: '🚿' },
    { id: 'mould-discovery', label: 'Mould Discovery', icon: '🦠' },
    { id: 'storm-roof-damage', label: 'Storm Roof Damage', icon: '⛈️' },
    { id: 'storm-fence-damage', label: 'Storm Fence Damage', icon: '🌪️' },
    { id: 'fire-kitchen', label: 'Kitchen Fire Damage', icon: '🔥' },
    { id: 'fire-electrical', label: 'Electrical Fire', icon: '⚡' },
  ];

  const questions = [
    {
      id: 'damage-timeline',
      question: 'When did the damage occur?',
      subtitle: 'This is critical for determining coverage',
      options: [
        { 
          value: 'sudden', 
          label: 'Suddenly/Unexpectedly', 
          description: 'Happened all at once',
          impact: 'positive' 
        },
        { 
          value: 'gradual', 
          label: 'Over time/Gradually', 
          description: 'Developed slowly',
          impact: 'negative' 
        },
        { 
          value: 'unknown', 
          label: 'Unknown/Just discovered', 
          description: 'Not sure when it started',
          impact: 'neutral' 
        },
        { 
          value: 'accelerated', 
          label: 'Gradual then sudden', 
          description: 'Slow problem became sudden',
          impact: 'neutral' 
        }
      ]
    },
    {
      id: 'maintenance-history',
      question: 'What\'s your maintenance history?',
      subtitle: 'Insurers check if damage was preventable',
      options: [
        { 
          value: 'professional', 
          label: 'Regular Professional', 
          description: 'Documented professional maintenance',
          impact: 'positive' 
        },
        { 
          value: 'diy-regular', 
          label: 'Regular DIY', 
          description: 'Self-maintained regularly',
          impact: 'neutral' 
        },
        { 
          value: 'occasional', 
          label: 'Occasional/Sporadic', 
          description: 'Some maintenance done',
          impact: 'neutral' 
        },
        { 
          value: 'minimal', 
          label: 'Minimal/None', 
          description: 'Little to no maintenance',
          impact: 'negative' 
        }
      ]
    },
    {
      id: 'previous-signs',
      question: 'Were there previous signs of problems?',
      subtitle: 'Pre-existing issues affect coverage',
      options: [
        { 
          value: 'none', 
          label: 'No Previous Signs', 
          description: 'Completely unexpected',
          impact: 'positive' 
        },
        { 
          value: 'minor', 
          label: 'Minor Signs', 
          description: 'Small indicators ignored',
          impact: 'neutral' 
        },
        { 
          value: 'obvious', 
          label: 'Obvious Signs', 
          description: 'Clear problems present',
          impact: 'negative' 
        },
        { 
          value: 'reported', 
          label: 'Previously Reported', 
          description: 'Known to insurer',
          impact: 'negative' 
        }
      ]
    },
    {
      id: 'notification-timing',
      question: 'When did/will you notify your insurer?',
      subtitle: 'Timely notification is often required',
      options: [
        { 
          value: 'immediate', 
          label: 'Immediately', 
          description: 'Same day as discovery',
          impact: 'positive' 
        },
        { 
          value: 'within-week', 
          label: 'Within a Week', 
          description: '2-7 days after discovery',
          impact: 'neutral' 
        },
        { 
          value: 'delayed', 
          label: 'Over a Week', 
          description: 'More than 7 days',
          impact: 'negative' 
        },
        { 
          value: 'not-yet', 
          label: 'Haven\'t Yet', 
          description: 'Still deciding',
          impact: 'neutral' 
        }
      ]
    },
    {
      id: 'mitigation-action',
      question: 'What mitigation actions have you taken?',
      subtitle: 'You must prevent further damage',
      options: [
        { 
          value: 'immediate-professional', 
          label: 'Immediate Professional', 
          description: 'Called experts right away',
          impact: 'positive' 
        },
        { 
          value: 'immediate-diy', 
          label: 'Immediate DIY', 
          description: 'Took action myself quickly',
          impact: 'positive' 
        },
        { 
          value: 'delayed', 
          label: 'Delayed Action', 
          description: 'Took time to respond',
          impact: 'negative' 
        },
        { 
          value: 'none', 
          label: 'No Action Yet', 
          description: 'Haven\'t done anything',
          impact: 'negative' 
        }
      ]
    },
    {
      id: 'documentation',
      question: 'What documentation do you have?',
      subtitle: 'Evidence is crucial for claims',
      options: [
        { 
          value: 'comprehensive', 
          label: 'Comprehensive', 
          description: 'Photos, videos, reports, receipts',
          impact: 'positive' 
        },
        { 
          value: 'good', 
          label: 'Good', 
          description: 'Photos and some records',
          impact: 'positive' 
        },
        { 
          value: 'basic', 
          label: 'Basic', 
          description: 'Some photos or notes',
          impact: 'neutral' 
        },
        { 
          value: 'minimal', 
          label: 'Minimal/None', 
          description: 'Little to no documentation',
          impact: 'negative' 
        }
      ]
    }
  ];

  const handleAnswer = (value: string) => {
    const newAnswers = { ...answers, [questions[step].id]: value };
    setAnswers(newAnswers);
    
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      calculateResult(newAnswers);
    }
  };

  const calculateResult = (allAnswers: Record<string, string>) => {
    let probability = 50; // Start neutral
    const factors: any[] = [];
    
    // Calculate based on answers
    Object.entries(allAnswers).forEach(([questionId, answer]) => {
      const question = questions.find(q => q.id === questionId);
      const option = question?.options.find(o => o.value === answer);
      
      if (option) {
        let impact = 0;
        if (option.impact === 'positive') impact = 15;
        if (option.impact === 'negative') impact = -20;
        if (option.impact === 'neutral') impact = 0;
        
        probability += impact;
        
        factors.push({
          question: question?.question,
          answer: option.label,
          impact: option.impact,
          explanation: option.description
        });
      }
    });
    
    // Ensure probability is between 0 and 100
    probability = Math.max(0, Math.min(100, probability));
    
    setResult({
      probability,
      factors,
      recommendation: getRecommendation(probability),
      nextSteps: getNextSteps(probability, factors)
    });
  };

  const getRecommendation = (probability: number) => {
    if (probability >= 80) {
      return {
        type: 'positive',
        title: 'High Coverage Probability',
        message: 'Based on typical policies, this damage would likely be covered. Document everything and proceed with confidence.'
      };
    } else if (probability >= 60) {
      return {
        type: 'moderate',
        title: 'Moderate Coverage Probability',
        message: 'Coverage is possible but not guaranteed. Strong documentation and professional support will be crucial.'
      };
    } else if (probability >= 40) {
      return {
        type: 'uncertain',
        title: 'Uncertain Coverage',
        message: 'This is a grey area. You\'ll need expert help to maximize your chances of coverage.'
      };
    } else {
      return {
        type: 'negative',
        title: 'Low Coverage Probability',
        message: 'Based on typical exclusions, coverage is unlikely. However, every situation is unique - get professional assessment.'
      };
    }
  };

  const getNextSteps = (probability: number, factors: any[]) => {
    const steps = [];
    
    if (probability < 80) {
      steps.push('Get professional damage assessment immediately');
    }
    
    if (factors.some(f => f.id === 'documentation' && f.impact !== 'positive')) {
      steps.push('Document everything with photos, videos, and written notes');
    }
    
    if (factors.some(f => f.id === 'notification-timing' && f.answer === 'not-yet')) {
      steps.push('Notify your insurer immediately - delays can void coverage');
    }
    
    steps.push('Call Disaster Recovery for expert claim support');
    steps.push('Don\'t admit fault or agree to exclusions without expert advice');
    
    if (probability >= 60) {
      steps.push('Gather all maintenance records and receipts');
    }
    
    return steps;
  };

  const resetChecker = () => {
    setStep(0);
    setAnswers({});
    setResult(null);
    setSelectedScenario('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Calculator className="w-10 h-10" />
            <h1 className="text-4xl md:text-5xl font-bold">Coverage Probability Checker</h1>
          </div>
          <p className="text-xl text-blue-200">
            Answer a few questions to understand your coverage likelihood
          </p>
        </div>
      </section>

      {!result ? (
        <>
          {/* Scenario Selection */}
          {step === 0 && !selectedScenario && (
            <section className="py-16 px-4">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-2xl font-bold mb-8 text-center">
                  What type of damage are you checking?
                </h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  {scenarios.map((scenario) => (
                    <motion.button
                      key={scenario.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setSelectedScenario(scenario.id)}
                      className="bg-white rounded-lg shadow-lg p-6 text-left hover:shadow-xl transition-shadow border-2 border-transparent hover:border-blue-500"
                    >
                      <div className="flex items-center gap-4">
                        <span className="text-4xl">{scenario.icon}</span>
                        <span className="text-lg font-semibold">{scenario.label}</span>
                      </div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Questions */}
          {selectedScenario && (
            <section className="py-16 px-4">
              <div className="max-w-3xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>Question {step + 1} of {questions.length}</span>
                    <span>{Math.round(((step + 1) / questions.length) * 100)}% Complete</span>
                  </div>
                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                    <motion.div
                      className="bg-blue-600 h-full"
                      initial={{ width: 0 }}
                      animate={{ width: `${((step + 1) / questions.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </div>

                {/* Question */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="bg-white rounded-xl shadow-lg p-8"
                  >
                    <h3 className="text-2xl font-bold mb-2">{questions[step].question}</h3>
                    <p className="text-gray-600 mb-6">{questions[step].subtitle}</p>
                    
                    <div className="space-y-3">
                      {questions[step].options.map((option) => (
                        <motion.button
                          key={option.value}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => handleAnswer(option.value)}
                          className="w-full text-left p-4 rounded-lg border-2 hover:border-blue-500 transition-colors"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-semibold mb-1">{option.label}</p>
                              <p className="text-sm text-gray-600">{option.description}</p>
                            </div>
                            {option.impact === 'positive' && <TrendingUp className="w-5 h-5 text-green-500 mt-1" />}
                            {option.impact === 'negative' && <TrendingDown className="w-5 h-5 text-red-500 mt-1" />}
                            {option.impact === 'neutral' && <AlertCircle className="w-5 h-5 text-gray-400 mt-1" />}
                          </div>
                        </motion.button>
                      ))}
                    </div>
                    
                    {step > 0 && (
                      <button
                        onClick={() => setStep(step - 1)}
                        className="mt-6 text-blue-600 hover:text-blue-700 font-semibold"
                      >
                        ← Previous Question
                      </button>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </section>
          )}
        </>
      ) : (
        /* Results */
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
            >
              {/* Probability Display */}
              <div className={`p-8 text-center text-white ${
                result.probability >= 70 ? 'bg-gradient-to-br from-green-500 to-green-600' :
                result.probability >= 40 ? 'bg-gradient-to-br from-yellow-500 to-yellow-600' :
                'bg-gradient-to-br from-red-500 to-red-600'
              }`}>
                <h2 className="text-3xl font-bold mb-4">Coverage Probability</h2>
                <div className="text-7xl font-bold mb-2">{result.probability}%</div>
                <p className="text-xl">{result.recommendation.title}</p>
              </div>
              
              {/* Recommendation */}
              <div className="p-8">
                <div className={`mb-8 p-6 rounded-lg ${
                  result.recommendation.type === 'positive' ? 'bg-green-50' :
                  result.recommendation.type === 'moderate' ? 'bg-yellow-50' :
                  result.recommendation.type === 'uncertain' ? 'bg-gray-50' :
                  'bg-red-50'
                }`}>
                  <p className="text-lg">{result.recommendation.message}</p>
                </div>
                
                {/* Factors */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Assessment Factors</h3>
                  <div className="space-y-3">
                    {result.factors.map((factor: any, index: number) => (
                      <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                        {factor.impact === 'positive' && <CheckCircle className="w-5 h-5 text-green-500 mt-0.5" />}
                        {factor.impact === 'negative' && <XCircle className="w-5 h-5 text-red-500 mt-0.5" />}
                        {factor.impact === 'neutral' && <AlertCircle className="w-5 h-5 text-gray-400 mt-0.5" />}
                        <div className="flex-1">
                          <p className="font-semibold">{factor.question}</p>
                          <p className="text-sm text-gray-600">
                            Your answer: {factor.answer} - {factor.explanation}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Next Steps */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold mb-4">Recommended Next Steps</h3>
                  <div className="space-y-2">
                    {result.nextSteps.map((step: string, index: number) => (
                      <div key={index} className="flex items-start gap-3">
                        <span className="bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                          {index + 1}
                        </span>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                  <a
                    href="tel:1800000000"
                    className="flex-1 bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-center hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <Phone className="w-5 h-5" />
                    Get Expert Help Now
                  </a>
                  <button
                    onClick={resetChecker}
                    className="flex-1 bg-gray-600 text-white px-6 py-3 rounded-lg font-bold hover:bg-gray-700 transition-colors"
                  >
                    Check Another Scenario
                  </button>
                </div>
              </div>
            </motion.div>
            
            {/* Disclaimer */}
            <div className="mt-8 p-6 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold mb-1">Important Notice</p>
                  <p className="text-sm text-gray-700">
                    This is a general assessment based on typical insurance policies. Your specific policy may differ. 
                    Always consult your policy documents and insurer for definitive coverage decisions. 
                    We provide restoration services and claim support, not insurance advice.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
'use client';

import React, { useState } from 'react';
import { 
  Home, AlertTriangle, Phone, FileText, CheckCircle, 
  ArrowRight, Clock, DollarSign, Shield, Users 
} from 'lucide-react';

interface JourneyStep {
  id: number;
  title: string;
  description: string;
  icon: React.ElementType;
  action: string;
  estimatedTime: string;
}

export function CustomerJourneyWizard() {
  const [currentStep, setCurrentStep] = useState(0);
  const [emergencyType, setEmergencyType] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [urgency, setUrgency] = useState('');

  const journeySteps: JourneyStep[] = [
    {
      id: 1,
      title: "Report Your Emergency",
      description: "Tell us what happened - we'll connect you with the right expert",
      icon: AlertTriangle,
      action: "Report Now",
      estimatedTime: "30 seconds"
    },
    {
      id: 2,
      title: "Instant Contractor Match",
      description: "AI matches you with certified contractors in your area",
      icon: Users,
      action: "Get Matched",
      estimatedTime: "Instant"
    },
    {
      id: 3,
      title: "Insurance Review",
      description: "We explain what's covered and your options",
      icon: Shield,
      action: "Review Coverage",
      estimatedTime: "5 minutes"
    },
    {
      id: 4,
      title: "Get Your Estimate",
      description: "Transparent pricing with national guidelines",
      icon: DollarSign,
      action: "View Estimate",
      estimatedTime: "Instant"
    },
    {
      id: 5,
      title: "Restoration Begins",
      description: "Contractor arrives and work starts",
      icon: CheckCircle,
      action: "Schedule Now",
      estimatedTime: "60 minutes"
    }
  ];

  const handleEmergencyStart = () => {
    setCurrentStep(1);
    // Auto-scroll to form
    const element = document.getElementById('journey-form');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Journey to Recovery
            </h2>
            <p className="text-xl text-gray-600">
              From disaster to restoration in 5 simple steps
            </p>
            <div className="mt-6 inline-flex items-center gap-2 bg-green-100 text-green-800 px-4 py-2 rounded-full">
              <Clock className="h-5 w-5" />
              <span className="font-semibold">Average Resolution: 24-48 Hours</span>
            </div>
          </div>

          {/* Journey Steps */}
          <div className="space-y-4 mb-12">
            {journeySteps.map((step, index) => (
              <div
                key={step.id}
                className={`relative flex items-start gap-4 p-6 rounded-xl transition-all cursor-pointer ${
                  currentStep === index + 1
                    ? 'bg-blue-600 text-white shadow-xl scale-105'
                    : currentStep > index + 1
                    ? 'bg-green-50 text-gray-800'
                    : 'bg-white text-gray-800 hover:shadow-md'
                }`}
                onClick={() => setCurrentStep(index + 1)}
              >
                {/* Step Number */}
                <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg ${
                  currentStep === index + 1
                    ? 'bg-white text-blue-600'
                    : currentStep > index + 1
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {currentStep > index + 1 ? <CheckCircle className="h-6 w-6" /> : step.id}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className={`text-xl font-semibold mb-2 ${
                        currentStep === index + 1 ? 'text-white' : ''
                      }`}>
                        {step.title}
                      </h3>
                      <p className={`${
                        currentStep === index + 1 ? 'text-blue-100' : 'text-gray-600'
                      }`}>
                        {step.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${
                        currentStep === index + 1 ? 'text-blue-100' : 'text-gray-500'
                      }`}>
                        {step.estimatedTime}
                      </span>
                      <step.icon className={`h-6 w-6 ${
                        currentStep === index + 1 ? 'text-white' : 'text-gray-400'
                      }`} />
                    </div>
                  </div>

                  {currentStep === index + 1 && (
                    <button className="mt-4 bg-white text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-yellow-400 hover:text-black transition-colors">
                      {step.action}
                      <ArrowRight className="inline ml-2 h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Connector Line */}
                {index < journeySteps.length - 1 && (
                  <div className={`absolute left-[30px] top-[70px] w-0.5 h-[calc(100%+16px)] ${
                    currentStep > index + 1 ? 'bg-green-500' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Quick Start Form */}
          {currentStep === 0 && (
            <div id="journey-form" className="bg-white rounded-xl shadow-xl p-8">
              <h3 className="text-2xl font-bold mb-6">Start Your Recovery Now</h3>
              
              <div className="space-y-6">
                {/* Emergency Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What type of emergency?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {['Water Damage', 'Fire Damage', 'Mould', 'Storm'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setEmergencyType(type)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          emergencyType === type
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Property type?
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Residential', 'Commercial'].map((type) => (
                      <button
                        key={type}
                        onClick={() => setPropertyType(type)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          propertyType === type
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <Home className="inline h-5 w-5 mr-2" />
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Urgency */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    How urgent?
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { label: 'Emergency', color: 'red', time: 'Now' },
                      { label: 'Today', color: 'yellow', time: '2-4 hrs' },
                      { label: 'This Week', color: 'green', time: '24-48 hrs' }
                    ].map((option) => (
                      <button
                        key={option.label}
                        onClick={() => setUrgency(option.label)}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          urgency === option.label
                            ? `border-${option.color}-600 bg-${option.color}-50 text-${option.color}-600`
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-xs mt-1">{option.time}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <button
                    onClick={handleEmergencyStart}
                    disabled={!emergencyType || !propertyType || !urgency}
                    className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                  >
                    Get Immediate Help
                    <ArrowRight className="inline ml-2 h-5 w-5" />
                  </button>
                  <a
                    href="tel:1300347278"
                    className="flex-1 bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors text-center"
                  >
                    <Phone className="inline mr-2 h-5 w-5" />
                    Call 1300-DISASTER
                  </a>
                </div>
              </div>
            </div>
          )}

          {/* Trust Indicators */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-600">60min</div>
              <div className="text-sm text-gray-600">Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">24/7</div>
              <div className="text-sm text-gray-600">Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">100%</div>
              <div className="text-sm text-gray-600">Transparent</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600">Direct</div>
              <div className="text-sm text-gray-600">Billing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerJourneyWizard;
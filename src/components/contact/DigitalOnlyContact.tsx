'use client';

import React, { useState } from 'react';
import { MessageCircle, Globe, Mail, Clock, Zap, ArrowRight, CheckCircle } from 'lucide-react';

// IMPORTANT: NO PHONE NUMBERS - Digital Only Platform
export function DigitalContactBar() {
  const [showUrgent, setShowUrgent] = useState(true);

  return (
    <div className="fixed top-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 z-[10000] shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          {showUrgent && <span className="animate-pulse">🚨</span>}
          <span className="font-semibold text-sm md:text-base">
            24/7 Emergency Response - Chat Now for Instant Help
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button 
            onClick={() => {
              const event = new CustomEvent('openChat');
              window.dispatchEvent(event);
            }}
            className="bg-white text-blue-600 px-4 py-1.5 rounded-full font-bold text-sm hover:bg-yellow-400 hover:text-black transition-all transform hover:scale-105"
          >
            <MessageCircle className="inline h-4 w-4 mr-1" />
            <span>Live Chat</span>
          </button>
          <a 
            href="/claim"
            className="bg-green-500 text-white px-4 py-1.5 rounded-full font-bold text-sm hover:bg-green-400 transition-all"
          >
            Submit Claim
          </a>
        </div>
      </div>
    </div>
  );
}

export function EmergencyContactOptions() {
  const contactMethods = [
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant response 24/7",
      action: "Start Chat",
      time: "< 30 seconds",
      color: "blue"
    },
    {
      icon: Globe,
      title: "Online Form",
      description: "Submit emergency claim",
      action: "Submit Now",
      time: "2 minutes",
      color: "green"
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Detailed assistance",
      action: "Email Us",
      time: "< 1 hour response",
      color: "purple"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-xl p-6">
      <h3 className="text-2xl font-bold mb-6 text-center">Get Help Now - 100% Online</h3>
      <div className="grid md:grid-cols-3 gap-4">
        {contactMethods.map((method, index) => (
          <div
            key={index}
            className={`border-2 border-gray-200 rounded-lg p-6 hover:border-${method.color}-500 transition-all cursor-pointer hover:shadow-lg`}
          >
            <div className={`inline-flex p-3 rounded-lg bg-${method.color}-100 mb-4`}>
              <method.icon className={`h-6 w-6 text-${method.color}-600`} />
            </div>
            <h4 className="text-lg font-semibold mb-2">{method.title}</h4>
            <p className="text-gray-600 text-sm mb-3">{method.description}</p>
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{method.time}</span>
              <button className={`text-${method.color}-600 font-semibold text-sm hover:text-${method.color}-700`}>
                {method.action} →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function QuickResponseForm() {
  const [urgency, setUrgency] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    // Trigger chat or form submission
    setTimeout(() => {
      const event = new CustomEvent('openChat');
      window.dispatchEvent(event);
    }, 500);
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border-2 border-green-500 rounded-xl p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">Request Received!</h3>
        <p className="text-green-700">A specialist is connecting with you now...</p>
        <div className="mt-4 animate-pulse">
          <div className="h-2 bg-green-300 rounded-full w-32 mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6">
      <h3 className="text-xl font-bold mb-4">Quick Emergency Response</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            How urgent is your situation?
          </label>
          <div className="grid grid-cols-3 gap-2">
            {['Critical', 'Urgent', 'Soon'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setUrgency(level)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  urgency === level
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 hover:border-gray-400'
                }`}
              >
                <div className="font-semibold">{level}</div>
                <div className="text-xs">
                  {level === 'Critical' ? 'Now' : level === 'Urgent' ? '< 2hrs' : 'Today'}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your Email (for instant updates)
          </label>
          <input
            type="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Property Postcode
          </label>
          <input
            type="text"
            required
            maxLength={4}
            pattern="[0-9]{4}"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2000"
          />
        </div>

        <button
          type="submit"
          disabled={!urgency}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Get Instant Help Online
          <ArrowRight className="inline ml-2 h-5 w-5" />
        </button>
      </div>

      <p className="text-xs text-gray-600 mt-4 text-center">
        <Clock className="inline h-3 w-3 mr-1" />
        Average response time: 47 seconds
      </p>
    </form>
  );
}

// Mobile-optimized digital contact
export function MobileDigitalContact() {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-blue-500 shadow-2xl z-[9990] md:hidden">
      <div className="grid grid-cols-2 gap-1 p-2">
        <button 
          onClick={() => {
            const event = new CustomEvent('openChat');
            window.dispatchEvent(event);
          }}
          className="flex flex-col items-center justify-center py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
        >
          <MessageCircle className="h-6 w-6 text-blue-600 mb-1" />
          <span className="text-xs font-medium">Live Chat</span>
          <span className="text-xs text-blue-500">Instant</span>
        </button>
        <a 
          href="/claim"
          className="flex flex-col items-center justify-center py-3 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
        >
          <Zap className="h-6 w-6 text-green-600 mb-1" />
          <span className="text-xs font-medium">Submit Claim</span>
          <span className="text-xs text-green-500">2 mins</span>
        </a>
      </div>
    </div>
  );
}

export default function DigitalOnlyContactSystem() {
  return (
    <>
      <DigitalContactBar />
      <MobileDigitalContact />
    </>
  );
}
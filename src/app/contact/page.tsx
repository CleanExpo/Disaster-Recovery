'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon, 
  ClockIcon,
  ChatBubbleOvalLeftEllipsisIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  ArrowRightIcon,
  SparklesIcon,
  ShieldCheckIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

export default function ModernContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    urgency: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeField, setActiveField] = useState<string | null>(null);

  const services = [
    'Water Damage Restoration',
    'Fire & Smoke Damage',
    'Mould Remediation',
    'Storm Damage',
    'Biohazard Cleanup',
    'General Inquiry'
  ];

  const urgencyLevels = [
    { value: 'emergency', label: 'Emergency (< 2 hours)', colour: 'from-red-500 to-orange-500' },
    { value: 'urgent', label: 'Urgent (< 24 hours)', colour: 'from-orange-500 to-yellow-500' },
    { value: 'standard', label: 'Standard (2-3 days)', colour: 'from-blue-500 to-cyan-500' },
    { value: 'quote', label: 'Quote Only', colour: 'from-purple-500 to-indigo-500' }
  ];

  const contactInfo = [
    {
      icon: <PhoneIcon className="w-6 h-6" />,
      title: '24/7 Emergency Response',
      value: 'Online Form Available',
      subtext: 'Immediate response',
      colour: 'from-red-500 to-orange-500'
    },
    {
      icon: <EnvelopeIcon className="w-6 h-6" />,
      title: 'Email Support',
      value: 'help@disasterrecoverypro.com.au',
      subtext: 'Response within 2 hours',
      colour: 'from-blue-500 to-cyan-500'
    },
    {
      icon: <MapPinIcon className="w-6 h-6" />,
      title: 'Service Areas',
      value: 'Australia Wide',
      subtext: 'All major cities & regions',
      colour: 'from-green-500 to-emerald-500'
    },
    {
      icon: <ClockIcon className="w-6 h-6" />,
      title: 'Response Time',
      value: '< 60 Minutes',
      subtext: 'For emergency calls',
      colour: 'from-purple-500 to-indigo-500'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          urgency: formData.urgency || 'routine',
          service: formData.service.toLowerCase().replace(/ /g, '').includes('water') ? 'water' :
                  formData.service.toLowerCase().includes('fire') ? 'fire' :
                  formData.service.toLowerCase().includes('mould') ? 'mould' :
                  formData.service.toLowerCase().includes('storm') ? 'storm' :
                  formData.service.toLowerCase().includes('biohazard') ? 'biohazard' : 'other',
          propertyType: 'residential',
          hasInsurance: true,
          preferredContact: 'both'
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSubmitted(true);
        // Store submission ID for tracking
        if (typeof window !== 'undefined') {
          localStorage.setItem('lastSubmissionId', data.submissionId);
        }
      } else {
        console.error('Submission failed:', data.message);
        alert(`Error: ${data.message}. Please try again or Use Our Online Form`);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection or Use Our Online Form');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute inset-0"
          animate={{
            background: [
              'radial-gradient(circle at 20% 50%, rgba(239, 68, 68, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 80% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)',
              'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.15) 0%, transparent 50%)',
            ]
          }}
          transition={{ duration: 10, repeat: Infinity, repeatType: "reverse" }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative z-10 px-6 pt-32 pb-20">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <ExclamationTriangleIcon className="w-4 h-4 text-red-400" />
              <span className="text-sm font-medium text-red-300">24/7 Online Emergency Response</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-white via-red-100 to-orange-100 bg-clip-text text-transparent">
                Get Immediate
              </span>
              <br />
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                Emergency Help
              </span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Connect with certified restoration specialists in minutes. 
              Available 24/7 for all emergency disaster recovery needs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {contactInfo.map((info, i) => {
              const gradientClassName = 'absolute inset-0 bg-gradient-to-r ' + info.colour + ' rounded-xl opacity-0 group-hover:opacity-20 blur-xl transition-all';
              const iconClassName = 'inline-flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-gradient-to-r ' + info.colour + ' bg-opacity-20';
              
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="relative group"
                >
                  <div className={gradientClassName} />
                  <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-xl p-6 hover:border-gray-700 transition-all">
                    <div className={iconClassName}>
                      {info.icon}
                    </div>
                    <h3 className="text-sm text-gray-400 mb-1">{info.title}</h3>
                    <p className="text-xl font-bold mb-1">{info.value}</p>
                    <p className="text-xs text-gray-500">{info.subtext}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="relative z-10 px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="max-w-4xl overflow-hidden mx-auto"
              >
                <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 backdrop-blur-sm rounded-3xl p-8 md:p-12 border border-purple-500/30">
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold mb-2">
                      <span className="bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                        Emergency Contact Form
                      </span>
                    </h2>
                    <p className="text-gray-400">Fill out the form below for immediate assistance</p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Name Field */}
                      <motion.div
                        whileTap={{ scale: 0.995 }}
                        className="relative"
                      >
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Your Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => handleChange('name', e.target.value)}
                          onFocus={() => setActiveField('name')}
                          onBlur={() => setActiveField(null)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                          placeholder="John Smith"
                        />
                        {activeField === 'name' && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="absolute -top-2 left-2 bg-gray-900 px-2"
                          >
                            <span className="text-xs text-purple-400">Full name</span>
                          </motion.div>
                        )}
                      </motion.div>

                      {/* Email Field */}
                      <motion.div
                        whileTap={{ scale: 0.995 }}
                        className="relative"
                      >
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => handleChange('email', e.target.value)}
                          onFocus={() => setActiveField('email')}
                          onBlur={() => setActiveField(null)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                          placeholder="john@example.com"
                        />
                      </motion.div>

                      {/* Phone Field */}
                      <motion.div
                        whileTap={{ scale: 0.995 }}
                        className="relative"
                      >
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => handleChange('phone', e.target.value)}
                          onFocus={() => setActiveField('phone')}
                          onBlur={() => setActiveField(null)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500"
                          placeholder=""
                        />
                      </motion.div>

                      {/* Service Field */}
                      <motion.div
                        whileTap={{ scale: 0.995 }}
                      >
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Service Required *
                        </label>
                        <select
                          required
                          value={formData.service}
                          onChange={(e) => handleChange('service', e.target.value)}
                          className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white"
                        >
                          <option value="">Select a service</option>
                          {services.map((service) => (
                            <option key={service} value={service}>
                              {service}
                            </option>
                          ))}
                        </select>
                      </motion.div>
                    </div>

                    {/* Urgency Selection */}
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-4">
                        Urgency Level *
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                        {urgencyLevels.map((level) => {
                          const buttonClassName = formData.urgency === level.value
                            ? 'relative p-3 rounded-xl border transition-all border-purple-500 bg-purple-500/20'
                            : 'relative p-3 rounded-xl border transition-all border-gray-700 bg-gray-900/50 hover:border-gray-600';
                          const overlayClassName = 'absolute inset-0 bg-gradient-to-r ' + level.colour + ' rounded-xl opacity-20';
                          
                          return (
                            <motion.button
                              key={level.value}
                              type="button"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => handleChange('urgency', level.value)}
                              className={buttonClassName}
                            >
                              {formData.urgency === level.value && (
                                <motion.div
                                  layoutId="urgency-selector"
                                  className={overlayClassName}
                                />
                              )}
                              <span className="relative text-sm font-medium">{level.label}</span>
                            </motion.button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Message Field */}
                    <motion.div
                      whileTap={{ scale: 0.995 }}
                    >
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Describe Your Situation *
                      </label>
                      <textarea
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleChange('message', e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-xl focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all text-white placeholder-gray-500 resize-none"
                        placeholder="Please describe the damage or emergency situation..."
                      />
                    </motion.div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full relative group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl" />
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity" />
                      <div className="relative bg-gradient-to-r from-red-600 to-orange-600 rounded-xl px-8 py-4 font-bold text-lg flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            Submitting...
                          </>
                        ) : (
                          <>
                            <BoltIcon className="w-5 h-5" />
                            Submit Emergency Request
                            <ArrowRightIcon className="w-5 h-5" />
                          </>
                        )}
                      </div>
                    </motion.button>

                    {/* Trust Indicators */}
                    <div className="flex items-center justify-center gap-6 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <ShieldCheckIcon className="w-4 h-4" />
                        SSL Secured
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircleIcon className="w-4 h-4" />
                        IICRC Certified
                      </div>
                      <div className="flex items-center gap-1">
                        <SparklesIcon className="w-4 h-4" />
                        Instant Response
                      </div>
                    </div>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl mx-auto text-center"
              >
                <div className="bg-gradient-to-r from-green-500/20 to-emerald-500/20 backdrop-blur-sm rounded-3xl p-12 border border-green-500/30">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                  >
                    <CheckCircleIcon className="w-24 h-24 text-green-400 mx-auto mb-6" />
                  </motion.div>
                  
                  <motion.h2
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-4xl font-bold mb-4"
                  >
                    <span className="bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                      Request Received!
                    </span>
                  </motion.h2>
                  
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="text-xl text-gray-300 mb-8"
                  >
                    Our emergency response team will contact you within minutes.
                  </motion.p>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="bg-gray-900/50 rounded-xl p-6 text-left space-y-3"
                  >
                    <h3 className="font-semibold text-green-400 mb-3">What happens next:</h3>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400">1.</span>
                      <span className="text-gray-300">Immediate phone call from our dispatch team</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400">2.</span>
                      <span className="text-gray-300">Emergency crew dispatched to your location</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-green-400">3.</span>
                      <span className="text-gray-300">On-site assessment and immediate action</span>
                    </div>
                  </motion.div>

                  <motion.button
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({
                        name: '',
                        email: '',
                        
                        service: '',
                        urgency: '',
                        message: ''
                      });
                    }}
                    className="mt-8 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colours"
                  >
                    Submit Another Request
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Live Chat Section */}
      <section className="relative z-10 px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl overflow-hidden mx-auto text-center"
        >
          <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl p-12 border border-blue-500/30">
            <ChatBubbleOvalLeftEllipsisIcon className="w-16 h-16 text-blue-400 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Need Immediate Help?
              </span>
            </h2>
            <p className="text-gray-300 mb-6">
              Chat with our emergency response team for instant assistance
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-blue-600 to-cyan-600 px-8 py-3 rounded-full font-semibold inline-flex items-center gap-2"
            >
              <ChatBubbleOvalLeftEllipsisIcon className="w-5 h-5" />
              Start Live Chat
            </motion.button>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
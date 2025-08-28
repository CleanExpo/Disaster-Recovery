import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, AlertTriangle, Clock, Shield, Send } from 'lucide-react'
import { useEmergencyStore } from '@/hooks/useEmergencyStore'

export const EmergencyPage: React.FC = () => {
  const { addRequest } = useEmergencyStore()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  
  const [formData, setFormData] = useState({
    type: 'water' as const,
    priority: 'high' as const,
    location: '',
    description: '',
    contactName: '',
    contactPhone: '',
    contactEmail: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    addRequest({
      ...formData,
      status: 'pending'
    })
    
    setIsSubmitting(false)
    setIsSuccess(true)
    
    // Reset form after success
    setTimeout(() => {
      setIsSuccess(false)
      setFormData({
        type: 'water',
        priority: 'high',
        location: '',
        description: '',
        contactName: '',
        contactPhone: '',
        contactEmail: ''
      })
    }, 3000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center px-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <Shield className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Emergency Request Submitted!
          </h2>
          <p className="text-gray-600 mb-6">
            Our emergency response team has been notified and will contact you within 15 minutes.
          </p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <p className="text-green-800 font-semibold">
              Expected Response Time: 60 minutes or less
            </p>
          </div>
          <a
            href="tel:1800DISASTER"
            className="btn-primary w-full"
          >
            <Phone className="w-4 h-4 mr-2" />
            Call for Immediate Assistance
          </a>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50">
      {/* Emergency Header */}
      <section className="py-20 bg-gradient-to-r from-danger-600 to-danger-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6"
            >
              <AlertTriangle className="w-4 h-4 mr-2 text-yellow-300" />
              Emergency Response Active
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl lg:text-6xl font-bold mb-6"
            >
              Emergency Service Request
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-red-100 mb-8"
            >
              Complete this form for immediate emergency response, or call our 24/7 hotline
            </motion.p>
            
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              href="tel:1800DISASTER"
              className="inline-flex items-center bg-yellow-400 text-gray-900 px-8 py-4 rounded-xl font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Phone className="w-6 h-6 mr-3" />
              <div className="text-left">
                <div>Call Now: 1800 DISASTER</div>
                <div className="text-sm opacity-75">Available 24/7</div>
              </div>
            </motion.a>
          </div>
        </div>
      </section>

      {/* Response Time Banner */}
      <section className="py-8 bg-primary-600 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 text-center">
            <div className="flex items-center space-x-2">
              <Clock className="w-6 h-6 text-yellow-300" />
              <span className="font-semibold">60min Response Guarantee</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-white/20" />
            <div className="flex items-center space-x-2">
              <Shield className="w-6 h-6 text-yellow-300" />
              <span className="font-semibold">Licensed & Insured</span>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Form */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-2xl p-8"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Emergency Service Details
                </h2>
                <p className="text-gray-600">
                  Please provide as much detail as possible to help us respond effectively.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Emergency Type *
                    </label>
                    <select
                      name="type"
                      value={formData.type}
                      onChange={handleChange}
                      required
                      className="input"
                    >
                      <option value="water">Water Damage</option>
                      <option value="fire">Fire/Smoke Damage</option>
                      <option value="storm">Storm Damage</option>
                      <option value="mold">Mold Issue</option>
                      <option value="other">Other Emergency</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Priority Level *
                    </label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      required
                      className="input"
                    >
                      <option value="critical">Critical - Immediate Danger</option>
                      <option value="high">High - Active Damage</option>
                      <option value="medium">Medium - Contained Issue</option>
                      <option value="low">Low - Assessment Needed</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Location *
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter full address including suburb and state"
                    required
                    className="input"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-2">
                    Emergency Description *
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Describe the emergency situation in detail. Include what happened, when it occurred, and current conditions."
                    required
                    rows={4}
                    className="input resize-none"
                  />
                </div>

                <div className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Contact Information
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="contactName"
                        value={formData.contactName}
                        onChange={handleChange}
                        required
                        className="input"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="contactPhone"
                        value={formData.contactPhone}
                        onChange={handleChange}
                        required
                        className="input"
                      />
                    </div>
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-semibold text-gray-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="contactEmail"
                      value={formData.contactEmail}
                      onChange={handleChange}
                      required
                      className="input"
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 btn-danger justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Submitting Request...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Submit Emergency Request
                      </>
                    )}
                  </button>
                  
                  <a
                    href="tel:1800DISASTER"
                    className="flex-1 btn-secondary justify-center"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Instead
                  </a>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
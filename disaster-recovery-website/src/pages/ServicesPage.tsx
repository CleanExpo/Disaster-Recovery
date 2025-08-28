import React from 'react'
import { motion } from 'framer-motion'
import { 
  Droplets, 
  Flame, 
  Wind, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Phone,
  Shield
} from 'lucide-react'

const services = [
  {
    id: 'water-damage',
    icon: Droplets,
    title: 'Water Damage Restoration',
    description: 'Comprehensive water damage restoration services to protect your property and belongings.',
    features: [
      '24/7 Emergency Water Extraction',
      'Advanced Structural Drying',
      'Moisture Detection & Monitoring',
      'Mold Prevention Treatment',
      'Content Pack-Out & Storage',
      'Insurance Claims Assistance'
    ],
    color: 'from-blue-500 to-blue-700',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600'
  },
  {
    id: 'fire-restoration',
    icon: Flame,
    title: 'Fire & Smoke Restoration',
    description: 'Complete fire and smoke damage restoration with specialized equipment and techniques.',
    features: [
      'Emergency Board-Up Services',
      'Smoke & Soot Removal',
      'Odor Elimination',
      'Structural Cleaning',
      'Content Restoration',
      'Reconstruction Services'
    ],
    color: 'from-red-500 to-red-700',
    bgColor: 'bg-red-50',
    textColor: 'text-red-600'
  },
  {
    id: 'storm-damage',
    icon: Wind,
    title: 'Storm Damage Recovery',
    description: 'Rapid response storm damage cleanup and restoration services.',
    features: [
      'Emergency Tarping',
      'Tree & Debris Removal',
      'Roof Repair & Replacement',
      'Window & Door Boarding',
      'Structural Stabilization',
      'Insurance Documentation'
    ],
    color: 'from-gray-500 to-gray-700',
    bgColor: 'bg-gray-50',
    textColor: 'text-gray-600'
  },
  {
    id: 'mold-remediation',
    icon: AlertTriangle,
    title: 'Mold Remediation',
    description: 'Professional mold removal and prevention services for healthy indoor environments.',
    features: [
      'Mold Inspection & Testing',
      'Containment & Removal',
      'Air Quality Improvement',
      'Antimicrobial Treatment',
      'Source Moisture Control',
      'Post-Remediation Verification'
    ],
    color: 'from-green-500 to-green-700',
    bgColor: 'bg-green-50',
    textColor: 'text-green-600'
  }
]

export const ServicesPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-5xl lg:text-6xl font-bold mb-6"
            >
              Emergency Recovery Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-blue-100 mb-8"
            >
              Professional disaster recovery solutions available 24/7 across Australia
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center justify-center space-x-8 text-sm"
            >
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-300" />
                <span>60min Response</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5 text-yellow-300" />
                <span>Licensed & Insured</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-yellow-300" />
                <span>Satisfaction Guaranteed</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
              >
                <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                <div className="p-8">
                  <div className={`w-16 h-16 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                    <service.icon className={`w-8 h-8 ${service.textColor}`} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6">
                    {service.description}
                  </p>
                  
                  <div className="space-y-3 mb-8">
                    {service.features.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex items-center space-x-3">
                        <CheckCircle className={`w-5 h-5 ${service.textColor} flex-shrink-0`} />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href="tel:1800DISASTER"
                      className="flex-1 btn-primary text-center justify-center"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Emergency Call
                    </a>
                    <button className="flex-1 btn-secondary">
                      Get Quote
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our Emergency Response Process
            </h2>
            <p className="text-xl text-gray-600">
              Fast, efficient, and thorough disaster recovery in four simple steps
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Emergency Call', description: 'Contact us immediately for 24/7 emergency response' },
              { step: '2', title: 'Rapid Dispatch', description: 'Our team arrives within 60 minutes to assess damage' },
              { step: '3', title: 'Damage Control', description: 'We immediately stop further damage and begin restoration' },
              { step: '4', title: 'Full Recovery', description: 'Complete restoration to pre-loss condition' }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-gray-600">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-danger-600 to-danger-700 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">
              Need Emergency Assistance?
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Don't let disaster damage get worse. Contact our emergency response team now.
            </p>
            <a
              href="tel:1800DISASTER"
              className="inline-flex items-center bg-white text-danger-600 px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <Phone className="w-6 h-6 mr-3" />
              Call 1800 DISASTER Now
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
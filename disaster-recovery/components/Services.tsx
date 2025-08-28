'use client'

import React from 'react'
import Link from 'next/link'

const services = [
  {
    title: 'Water Damage Restoration',
    description: 'Rapid water extraction, drying, and restoration services to prevent further damage.',
    icon: '💧',
    color: 'from-blue-500 to-cyan-600',
    features: ['24/7 Emergency Response', 'Advanced Drying Equipment', 'Mold Prevention', 'Insurance Claims Help']
  },
  {
    title: 'Fire & Smoke Damage',
    description: 'Complete fire damage restoration including smoke odor removal and structural repairs.',
    icon: '🔥',
    color: 'from-red-500 to-orange-600',
    features: ['Smoke Odor Removal', 'Soot Cleanup', 'Structural Repairs', 'Content Restoration']
  },
  {
    title: 'Mold Remediation',
    description: 'Professional mold removal and prevention services with certified technicians.',
    icon: '🦠',
    color: 'from-green-500 to-teal-600',
    features: ['Certified Technicians', 'Air Quality Testing', 'Safe Removal', 'Prevention Treatment']
  },
  {
    title: 'Storm Damage Recovery',
    description: 'Emergency board-up, tarping, and complete storm damage restoration services.',
    icon: '⛈️',
    color: 'from-purple-500 to-indigo-600',
    features: ['Emergency Tarping', 'Tree Removal', 'Roof Repairs', 'Debris Cleanup']
  }
]

const Services: React.FC = () => {
  return (
    <section id="services" className="py-20 bg-dark-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="gradient-text">Our Emergency</span>
            <span className="text-white"> Services</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional disaster recovery services available 24/7 across Australia
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative bg-dark-800/50 backdrop-blur-md rounded-xl p-6 border border-gray-700 hover:border-primary-500 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 rounded-xl transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{service.title}</h3>
                <p className="text-gray-400 text-sm mb-4">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-gray-300">
                      <svg className="w-4 h-4 text-primary-400 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <Link
                  href={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <div className="inline-block bg-gradient-to-r from-accent-500/10 to-primary-500/10 backdrop-blur-sm rounded-xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-2">Need Immediate Help?</h3>
            <p className="text-gray-400 mb-4">Our emergency response team is standing by 24/7</p>
            <a
              href="tel:1800DISASTER"
              className="btn-primary inline-flex items-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              1800 DISASTER
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Services
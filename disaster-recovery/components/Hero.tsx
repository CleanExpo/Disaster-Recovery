'use client'

import React from 'react'
import Link from 'next/link'

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-primary-900/20 to-dark-900"></div>
      
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-primary-500/10 to-transparent rounded-full blur-3xl animate-gradient-xy"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-accent-500/10 to-transparent rounded-full blur-3xl animate-gradient-xy animation-delay-2000"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          <div className="inline-block mb-6">
            <span className="inline-flex items-center px-4 py-2 bg-accent-500/10 border border-accent-500/30 rounded-full text-accent-400 text-sm font-medium">
              <span className="relative flex h-2 w-2 mr-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-accent-500"></span>
              </span>
              24/7 Emergency Response Available
            </span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="gradient-text">Rapid Recovery</span>
            <br />
            <span className="text-white">When Disaster Strikes</span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Australia's most trusted disaster recovery specialists. Water damage, fire restoration, 
            mold remediation, and storm damage repair. Available 24/7 with guaranteed 60-minute 
            emergency response times.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="tel:1800DISASTER"
              className="btn-primary inline-flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Call 1800 DISASTER Now
            </a>
            <Link
              href="/quote"
              className="btn-secondary inline-flex items-center justify-center"
            >
              Get Instant Quote
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto">
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
              <div className="text-3xl font-bold gradient-text mb-1">60min</div>
              <div className="text-sm text-gray-400">Response Time</div>
            </div>
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
              <div className="text-3xl font-bold gradient-text mb-1">24/7</div>
              <div className="text-sm text-gray-400">Emergency Service</div>
            </div>
            <div className="bg-dark-800/50 backdrop-blur-sm rounded-lg p-4 border border-gray-700">
              <div className="text-3xl font-bold gradient-text mb-1">100%</div>
              <div className="text-sm text-gray-400">Insurance Approved</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-float">
        <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  )
}

export default Hero
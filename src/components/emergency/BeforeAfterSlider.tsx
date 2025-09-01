'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { MapPin, Droplets, Clock, CheckCircle, Flame, AlertTriangle, ArrowLeftRight } from 'lucide-react'

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [activeCase, setActiveCase] = useState(0)

  const cases = [
    {
      location: 'Brisbane, QLD',
      disaster: 'Major Flood Damage',
      responseTime: '42 minutes',
      insuranceAmount: '$127,000',
      beforeImage: '/images/optimized/damage/3D Water Damage to a Home.png',
      afterImage: '/images/optimized/damage/3D Water Damage to a Home.png', // Using same image as placeholder
      beforeTitle: 'FLOOD DEVASTATION',
      afterTitle: 'FULLY RESTORED',
      description: 'Catastrophic flooding - Living room completely submerged',
      details: [
        'Water extraction within 2 hours',
        'Complete structural drying',
        'Mould prevention treatment',
        'Full restoration in 48 hours'
      ]
    },
    {
      location: 'Sydney, NSW',
      disaster: 'Kitchen Fire Damage',
      responseTime: '38 minutes',
      insuranceAmount: '$182,000',
      beforeImage: '/images/optimised/damage/3D image of a house fire.png',
      afterImage: '/images/optimised/damage/3D image of a house fire.png', // Using same image as placeholder
      beforeTitle: 'FIRE DESTRUCTION',
      afterTitle: 'LIKE NEW AGAIN',
      description: 'Severe kitchen fire - Smoke damage throughout property',
      details: [
        'Emergency board-up same day',
        'Smoke and soot removal',
        'Complete deodorization',
        'Kitchen fully rebuilt'
      ]
    },
    {
      location: 'Melbourne, VIC',
      disaster: 'Toxic Mould Outbreak',
      responseTime: '55 minutes',
      insuranceAmount: '$43,000',
      beforeImage: '/images/optimized/damage/3D Mold Room.png',
      afterImage: '/images/optimized/damage/3D Mold Room.png', // Using same image as placeholder
      beforeTitle: 'MOULD INFESTATION',
      afterTitle: 'SAFE & HEALTHY',
      description: 'Black mould throughout bedroom and bathroom',
      details: [
        'Complete containment setup',
        'HEPA air filtration',
        'Full mould remediation',
        'Prevention treatment applied'
      ]
    }
  ]

  const currentCase = cases[activeCase]

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.min(100, Math.max(0, percentage)))
  }

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.touches[0].clientX - rect.left
    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.min(100, Math.max(0, percentage)))
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Real Transformations. Real Results.
          </h2>
          <p className="text-xl text-gray-300">
            Drag the slider to see the dramatic difference our emergency response makes
          </p>
        </motion.div>

        {/* Case Selector */}
        <div className="flex justify-center gap-4 mb-8">
          {cases.map((caseItem, index) => (
            <button
              key={index}
              onClick={() => setActiveCase(index)}
              className={`px-4 py-2 rounded-full transition-all ${
                index === activeCase 
                  ? 'bg-blue-500 text-black font-bold' 
                  : 'bg-gray-700 text-white hover:bg-gray-600'
              }`}
            >
              {caseItem.disaster.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Slider Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl bg-black"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            style={{ cursor: 'ew-resize' }}
          >
            {/* Instructions overlay */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none">
              <motion.div 
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="bg-black/70 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2"
              >
                <ArrowLeftRight className="h-5 w-5 text-white" />
                <span className="text-white font-semibold">Drag to Compare</span>
              </motion.div>
            </div>

            {/* Before Image */}
            <div className="relative h-[500px]">
              <Image
                src={currentCase.beforeImage}
                alt="Disaster damage"
                fill
                className="object-cover"
              />
              {/* Dark overlay for better visibility */}
              <div className="absolute inset-0 bg-red-900/30"></div>
              
              {/* Before Label */}
              <div className="absolute top-4 left-4 z-20">
                <div className="bg-red-600 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-xl">
                  {currentCase.beforeTitle}
                </div>
                <div className="mt-2 bg-black/80 text-white px-4 py-2 rounded">
                  <span className="text-red-400">BEFORE:</span> Total Devastation
                </div>
              </div>
            </div>

            {/* After Image (Overlay) */}
            <div 
              className="absolute inset-0 overflow-hidden"
              style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
            >
              <div className="relative h-[500px]">
                <Image
                  src={currentCase.afterImage}
                  alt="Restored property"
                  fill
                  className="object-cover"
                  style={{ filter: 'brightness(1.2) saturate(1.2)' }} // Make it look restored
                />
                {/* Bright overlay to simulate restoration */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 to-blue-500/20"></div>
                
                {/* After Label */}
                <div className="absolute top-4 right-4 z-20">
                  <div className="bg-green-600 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-xl">
                    {currentCase.afterTitle}
                  </div>
                  <div className="mt-2 bg-black/80 text-white px-4 py-2 rounded text-right">
                    <span className="text-emerald-600">AFTER:</span> Complete Restoration
                  </div>
                </div>
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl z-40"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-4 shadow-2xl">
                <ArrowLeftRight className="h-6 w-6 text-gray-800" />
              </div>
            </div>
          </motion.div>

          {/* Case Information */}
          <div className="space-y-6">
            {/* Emergency Alert */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-red-950/30 border border-red-600 rounded-xl p-4"
            >
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentCase.description}
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-gray-300">
                  <MapPin className="h-5 w-5 text-blue-400 inline mr-2" />
                  {currentCase.location}
                </div>
                <div className="text-gray-300">
                  <Clock className="h-5 w-5 text-blue-500 inline mr-2" />
                  Response: {currentCase.responseTime}
                </div>
              </div>
            </motion.div>

            {/* Restoration Process */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gray-800 rounded-xl p-6"
            >
              <h4 className="text-xl font-bold text-white mb-4">
                Our 48-Hour Restoration Process:
              </h4>
              <div className="space-y-3">
                {currentCase.details.map((detail, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-emerald-600 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{detail}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Insurance Coverage */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded-xl p-6 border border-green-500/30"
            >
              <div className="flex items-center justify-between mb-4">
                <h4 className="text-lg font-bold text-white">Insurance Approved</h4>
                <span className="text-3xl font-bold text-emerald-600">
                  {currentCase.insuranceAmount}
                </span>
              </div>
              <p className="text-gray-300 mb-4">
                Full restoration covered. We handle all paperwork and deal directly with your insurer.
              </p>
              <button className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-black px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                Get Your Free Assessment Now
              </button>
            </motion.div>
          </div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 bg-gray-800/50 backdrop-blur-sm rounded-xl p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-blue-500">48hrs</div>
              <div className="text-gray-400">Average Restoration</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-600">100%</div>
              <div className="text-gray-400">Insurance Approved</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">24/7</div>
              <div className="text-gray-400">Emergency Response</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-red-400">47min</div>
              <div className="text-gray-400">Average Arrival</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, MapPin, Droplets, Clock, CheckCircle } from 'lucide-react'

export default function BeforeAfterSlider() {
  const [sliderPosition, setSliderPosition] = useState(50)
  const [activeCase, setActiveCase] = useState(0)

  const cases = [
    {
      location: 'Brisbane, QLD',
      disaster: 'Category 3 Water Damage',
      responseTime: '42 minutes',
      insuranceAmount: '$47,000',
      beforeImage: '/images/optimized/damage/3D Water Damage to a Home.png',
      afterImage: '/images/optimized/equipment/3D Dehumidifier Heater System.png',
      description: 'Major flooding from burst pipes - Complete restoration in 48 hours'
    },
    {
      location: 'Sydney, NSW',
      disaster: 'Fire & Smoke Damage',
      responseTime: '38 minutes',
      insuranceAmount: '$82,000',
      beforeImage: '/images/optimised/damage/3D image of a house fire.png',
      afterImage: '/images/optimised/equipment/3D Thermal Fogging.png',
      description: 'Kitchen fire damage - Full restoration and deodorization'
    },
    {
      location: 'Melbourne, VIC',
      disaster: 'Mould Remediation',
      responseTime: '55 minutes',
      insuranceAmount: '$23,000',
      beforeImage: '/images/optimized/damage/3D Mold Room.png',
      afterImage: '/images/optimised/equipment/3D HEPA Room Scrubber.png',
      description: 'Extensive mould growth - Complete remediation and prevention'
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
            48 Hour Transformations
          </h2>
          <p className="text-xl text-gray-300">
            Real disasters. Real solutions. Real results.
          </p>
        </motion.div>

        {/* Case Selector */}
        <div className="flex justify-center gap-2 mb-8">
          {cases.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveCase(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === activeCase 
                  ? 'bg-yellow-400 w-8' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Slider Container */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative rounded-2xl overflow-hidden shadow-2xl"
            onMouseMove={handleMouseMove}
            onTouchMove={handleTouchMove}
            style={{ cursor: 'col-resize' }}
          >
            {/* Before Image */}
            <div className="relative h-[500px]">
              <Image
                src={currentCase.beforeImage}
                alt="Before restoration"
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-2 rounded-full font-bold">
                EMERGENCY RECEIVED
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
                  alt="After restoration"
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-green-600 text-white px-4 py-2 rounded-full font-bold">
                  48 HOURS LATER
                </div>
              </div>
            </div>

            {/* Slider Handle */}
            <div 
              className="absolute top-0 bottom-0 w-1 bg-white shadow-2xl"
              style={{ left: `${sliderPosition}%` }}
            >
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-3 shadow-lg">
                <div className="flex gap-2">
                  <ChevronLeft className="h-4 w-4 text-gray-800" />
                  <ChevronRight className="h-4 w-4 text-gray-800" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Case Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-8 bg-gray-800 rounded-xl p-6"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              {currentCase.description}
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="h-5 w-5 text-blue-400" />
                <span>{currentCase.location}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Droplets className="h-5 w-5 text-cyan-400" />
                <span>{currentCase.disaster}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="h-5 w-5 text-yellow-400" />
                <span>{currentCase.responseTime}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <span>{currentCase.insuranceAmount}</span>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black px-8 py-3 rounded-full font-bold hover:scale-105 transition-transform">
                Get Your Free Assessment
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
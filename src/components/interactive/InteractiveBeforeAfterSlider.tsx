'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useTransform, PanInfo } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { CheckCircle, ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';

interface BeforeAfterCase {
  id: string;
  title: string;
  beforeImage: string;
  afterImage: string;
  beforeLabel: string;
  afterLabel: string;
  description: string;
  duration: string;
  serviceType: 'fire' | 'water' | 'mould' | 'storm';
}

const CASES: BeforeAfterCase[] = [
  {
    id: 'fire-restoration',
    title: 'Fire Damage Restoration',
    beforeImage: '/images/optimised/damage/3D image of a house fire.png',
    afterImage: '/images/optimised/damage/3D image of a house fire.png', // Would be replaced with actual after image
    beforeLabel: 'Fire Damaged',
    afterLabel: 'Fully Restored',
    description: 'Complete fire restoration: Structural repairs, soot removal, odour elimination, and full property restoration completed in 5 days.',
    duration: '5 days',
    serviceType: 'fire'
  },
  {
    id: 'water-recovery',
    title: 'Water Damage Recovery',
    beforeImage: '/images/optimised/damage/3D Vehicle into Home.png',
    afterImage: '/images/optimised/damage/3D Vehicle into Home.png', // Would be replaced with actual after image
    beforeLabel: 'Flood Damaged',
    afterLabel: 'Fully Dried & Restored',
    description: 'Emergency water extraction: Complete structural drying, mould prevention, and restoration with direct insurance billing.',
    duration: '3 days',
    serviceType: 'water'
  }
];

// Individual Before/After Slider Card
function BeforeAfterSliderCard({ caseData }: { caseData: BeforeAfterCase }) {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const x = useMotionValue(0);
  const sliderPercentage = useTransform(x, (value) => {
    if (!containerRef.current) return 50;
    const containerWidth = containerRef.current.offsetWidth;
    const percentage = ((value + containerWidth / 2) / containerWidth) * 100;
    return Math.max(0, Math.min(100, percentage));
  });

  const handlePan = useCallback((event: any, info: PanInfo) => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.offsetWidth;
    const newX = info.point.x - containerRef.current.offsetLeft;
    const percentage = Math.max(0, Math.min(100, (newX / containerWidth) * 100));
    
    setSliderPosition(percentage);
    x.set(newX - containerWidth / 2);
  }, [x]);

  const getServiceColor = (type: string) => {
    switch (type) {
      case 'fire': return 'text-red-600 bg-red-50 border-red-200';
      case 'water': return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'mould': return 'text-green-600 bg-green-50 border-green-200';
      case 'storm': return 'text-purple-600 bg-purple-50 border-purple-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <motion.div 
      className="bg-white rounded-2xl overflow-hidden shadow-xl group hover:shadow-2xl transition-all duration-500"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      {/* Header */}
      <div className="p-8 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-2xl font-bold text-gray-900">{caseData.title}</h4>
          <motion.div
            className={`px-3 py-1 rounded-full text-sm font-bold border ${getServiceColor(caseData.serviceType)}`}
            whileHover={{ scale: 1.05 }}
          >
            {caseData.duration}
          </motion.div>
        </div>
      </div>

      {/* Interactive Before/After Slider */}
      <div className="px-8">
        <motion.div 
          ref={containerRef}
          className="relative h-64 rounded-xl overflow-hidden cursor-col-resize bg-gray-100"
          onPan={handlePan}
          onPanStart={() => setIsDragging(true)}
          onPanEnd={() => setIsDragging(false)}
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.2 }}
        >
          {/* Before Image */}
          <div className="absolute inset-0">
            <Image
              src={caseData.beforeImage}
              alt={`${caseData.title} - Before`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/20" />
          </div>

          {/* After Image */}
          <motion.div 
            className="absolute inset-0 overflow-hidden"
            style={{
              clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`,
            }}
            animate={{
              clipPath: `polygon(${sliderPosition}% 0%, 100% 0%, 100% 100%, ${sliderPosition}% 100%)`,
            }}
            transition={{ type: "tween", duration: isDragging ? 0 : 0.2 }}
          >
            {/* Since we don't have actual after images, we'll show a restoration complete state */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white flex items-center justify-center border-2 border-green-100">
              <div className="text-center p-6">
                <motion.div
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <CheckCircle className="h-20 w-20 text-green-600 mx-auto mb-4" />
                </motion.div>
                <p className="text-gray-800 font-bold text-xl">{caseData.afterLabel}</p>
                <p className="text-sm text-gray-600 mt-2">Professional finish</p>
              </div>
            </div>
          </motion.div>

          {/* Before/After Labels */}
          <div className="absolute top-4 left-4">
            <motion.div 
              className="bg-red-600 text-white px-3 py-1 rounded-full text-sm font-bold"
              animate={{
                opacity: sliderPosition > 20 ? 1 : 0.3,
              }}
            >
              {caseData.beforeLabel}
            </motion.div>
          </div>
          
          <div className="absolute top-4 right-4">
            <motion.div 
              className="bg-green-600 text-white px-3 py-1 rounded-full text-sm font-bold"
              animate={{
                opacity: sliderPosition < 80 ? 1 : 0.3,
              }}
            >
              {caseData.afterLabel}
            </motion.div>
          </div>

          {/* Slider Handle */}
          <motion.div
            className="absolute top-0 bottom-0 flex items-center justify-center z-10"
            style={{
              left: `${sliderPosition}%`,
              transform: 'translateX(-50%)',
            }}
            animate={{
              left: `${sliderPosition}%`,
            }}
            transition={{ type: "tween", duration: isDragging ? 0 : 0.2 }}
          >
            <motion.div 
              className="bg-white border-4 border-blue-500 rounded-full w-12 h-12 flex items-center justify-center shadow-lg cursor-col-resize"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              animate={{
                boxShadow: isDragging 
                  ? "0 0 20px rgba(59, 130, 246, 0.5)"
                  : "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              }}
            >
              <motion.div 
                className="flex items-center space-x-1"
                animate={{
                  scale: isDragging ? 1.2 : 1,
                }}
              >
                <ArrowLeft className="h-3 w-3 text-blue-600" />
                <ArrowRight className="h-3 w-3 text-blue-600" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Vertical Divider Line */}
          <motion.div
            className="absolute top-0 bottom-0 w-1 bg-white shadow-lg"
            style={{
              left: `${sliderPosition}%`,
              transform: 'translateX(-50%)',
            }}
            animate={{
              left: `${sliderPosition}%`,
            }}
            transition={{ type: "tween", duration: isDragging ? 0 : 0.2 }}
          />

          {/* Drag instruction overlay */}
          {!isDragging && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
            >
              <div className="text-white text-center">
                <motion.div
                  animate={{
                    x: [-10, 10, -10],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <RotateCcw className="h-8 w-8 mx-auto mb-2" />
                </motion.div>
                <p className="font-bold">Drag to compare</p>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Progress Indicator */}
        <div className="mt-4 mb-6">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Before</span>
            <motion.span 
              className="font-bold text-blue-600"
              animate={{
                scale: isDragging ? 1.1 : 1,
              }}
            >
              {Math.round(sliderPosition)}% restored
            </motion.span>
            <span>After</span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"
              style={{ width: `${sliderPosition}%` }}
              animate={{
                width: `${sliderPosition}%`,
              }}
              transition={{ type: "tween", duration: isDragging ? 0 : 0.2 }}
            />
          </div>
        </div>
      </div>

      {/* Description */}
      <div className="px-8 pb-8">
        <div className="bg-gray-50 rounded-xl p-4">
          <p className="text-gray-700 text-sm leading-relaxed">
            <strong>{caseData.title}:</strong> {caseData.description}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// Main Interactive Before/After Gallery Component
export default function InteractiveBeforeAfterSlider() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20" ref={ref}>
      {/* Section Header */}
      <motion.div 
        className="text-center mb-16"
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <CheckCircle className="h-4 w-4 mr-2" />
          <span className="font-semibold">Proven Results</span>
        </motion.div>
        
        <motion.h3 
          className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Interactive Transformation Gallery
        </motion.h3>
        
        <motion.p 
          className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Drag the slider to see the dramatic results of our professional restoration work
        </motion.p>

        {/* Interactive instruction */}
        <motion.div 
          className="inline-flex items-center bg-blue-50 text-blue-700 px-6 py-3 rounded-full border border-blue-200"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          whileHover={{ scale: 1.05 }}
        >
          <motion.div
            animate={{
              x: [0, 5, -5, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mr-3"
          >
            👆
          </motion.div>
          <span className="font-semibold">Drag the handle to see before & after</span>
        </motion.div>
      </motion.div>

      {/* Before/After Cards Grid */}
      <div className="grid md:grid-cols-2 gap-12">
        {CASES.map((caseData, index) => (
          <motion.div
            key={caseData.id}
            initial={{ opacity: 0, y: 100 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
            transition={{ duration: 0.8, delay: 0.8 + index * 0.3 }}
          >
            <BeforeAfterSliderCard caseData={caseData} />
          </motion.div>
        ))}
      </div>
    </div>
  );
}
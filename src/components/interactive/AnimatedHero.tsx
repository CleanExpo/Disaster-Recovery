'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Points, PointMaterial, Sphere } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { Phone, Users, Clock, Shield, CheckCircle, Star, Zap } from 'lucide-react';
import * as THREE from 'three';

// Emergency particle system for fire/water damage theme
function EmergencyParticles() {
  const pointsRef = useRef<any>();
  const [particles] = useState(() => {
    const positions = new Float32Array(2000 * 3);
    const colors = new Float32Array(2000 * 3);
    
    for (let i = 0; i < 2000; i++) {
      // Create scattered particles across the screen
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Emergency colors: red, orange, blue (fire, water, urgency)
      const colorType = Math.random();
      if (colorType < 0.4) {
        // Fire/emergency red-orange
        colors[i * 3] = 1.0;     // R
        colors[i * 3 + 1] = 0.2 + Math.random() * 0.4; // G
        colors[i * 3 + 2] = 0.0; // B
      } else if (colorType < 0.7) {
        // Water blue
        colors[i * 3] = 0.1;     // R
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.3; // G
        colors[i * 3 + 2] = 1.0; // B
      } else {
        // Warning yellow/white
        colors[i * 3] = 1.0;     // R
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2; // G
        colors[i * 3 + 2] = 0.3; // B
      }
    }
    
    return { positions, colors };
  });

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.1;
      pointsRef.current.rotation.y += 0.002;
      
      // Animate particles floating
      const positions = pointsRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(state.clock.elapsedTime + i) * 0.001;
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <Points ref={pointsRef} positions={particles.positions} colors={particles.colors}>
      <PointMaterial 
        size={0.05}
        vertexColors
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </Points>
  );
}

// Floating emergency indicators with physics
function FloatingIndicators() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Floating water droplets */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={`water-${i}`}
          className="absolute w-3 h-3 bg-blue-500 rounded-full opacity-30"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            y: -50,
            x: Math.random() * 100 - 50,
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
      
      {/* Floating fire embers */}
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={`fire-${i}`}
          className="absolute w-2 h-2 bg-red-500 rounded-full opacity-40"
          initial={{
            x: Math.random() * window.innerWidth,
            y: window.innerHeight + 50,
          }}
          animate={{
            y: -50,
            x: Math.random() * 100 - 50,
            scale: [1, 1.5, 0.5, 1],
          }}
          transition={{
            duration: 6 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
          style={{
            left: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  );
}

// Main animated hero component
export default function AnimatedHero() {
  const controls = useAnimation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start("visible");
    }
  }, [isVisible, controls]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  };

  const pulseVariants = {
    animate: {
      scale: [1, 1.05, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      },
    },
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 overflow-hidden flex items-center">
      {/* 3D Background Particles */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
          <EmergencyParticles />
        </Canvas>
      </div>

      {/* Floating Indicators */}
      <FloatingIndicators />

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-r from-red-600/5 via-transparent to-blue-600/5 z-10"></div>
      
      {/* Main Hero Content */}
      <motion.div 
        className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Live Availability Indicator with Enhanced Animation */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center mb-8"
        >
          <motion.div 
            className="bg-gradient-to-r from-green-100 to-green-50 text-green-800 px-8 py-4 rounded-full shadow-xl border border-green-200 backdrop-blur-sm"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="flex items-center space-x-4">
              <motion.div 
                className="w-4 h-4 bg-green-500 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [1, 0.7, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <Users className="h-6 w-6" />
              <span className="font-bold text-lg">TEAMS AVAILABLE NOW</span>
              <span className="mx-2 text-green-600">•</span>
              <Clock className="h-5 w-5" />
              <span className="font-semibold">60-MIN RESPONSE</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Main Heading with Stagger Animation */}
        <motion.h1 
          variants={itemVariants}
          className="text-6xl md:text-8xl font-black text-gray-900 mb-8 leading-none tracking-tight"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Emergency Restoration
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="bg-gradient-to-r from-red-600 to-red-700 bg-clip-text text-transparent"
          >
            Available Now
          </motion.div>
        </motion.h1>

        {/* Enhanced Description */}
        <motion.p 
          variants={itemVariants}
          className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-medium"
        >
          Professional disaster recovery for{' '}
          <motion.strong 
            className="text-red-600"
            whileHover={{ scale: 1.05 }}
          >
            water damage
          </motion.strong>
          ,{' '}
          <motion.strong 
            className="text-red-600"
            whileHover={{ scale: 1.05 }}
          >
            fire damage
          </motion.strong>
          , and{' '}
          <motion.strong 
            className="text-red-600"
            whileHover={{ scale: 1.05 }}
          >
            mould remediation
          </motion.strong>
          . IICRC certified technicians responding within{' '}
          <motion.strong 
            className="bg-yellow-200 px-2 rounded"
            animate={{
              backgroundColor: ["#fef08a", "#fde047", "#fef08a"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            60 minutes
          </motion.strong>
          .
        </motion.p>

        {/* Phone Number with Magnetic Effect */}
        <motion.div 
          variants={itemVariants}
          className="mb-12"
        >
          <motion.a 
            href="tel:1300566166" 
            className="inline-block group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div 
              className="text-6xl md:text-7xl font-black text-red-600 mb-3 cursor-pointer"
              variants={pulseVariants}
              animate="animate"
            >
              1300 566 166
            </motion.div>
            <div className="flex items-center justify-center text-lg text-gray-600">
              <motion.div
                animate={{
                  y: [0, -5, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <Phone className="h-5 w-5 mr-2" />
              </motion.div>
              <span>24/7 Emergency Hotline</span>
            </div>
          </motion.a>
        </motion.div>

        {/* Enhanced CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row gap-6 justify-center mb-8"
        >
          <motion.a 
            href="tel:1300566166" 
            className="group"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.button 
              className="relative bg-gradient-to-r from-red-600 to-red-700 text-white px-14 py-6 rounded-xl font-black text-xl min-h-[70px] w-full sm:w-auto shadow-2xl overflow-hidden"
              animate={{
                boxShadow: [
                  "0 20px 25px -5px rgb(239 68 68 / 0.3)",
                  "0 25px 50px -12px rgb(239 68 68 / 0.5)",
                  "0 20px 25px -5px rgb(239 68 68 / 0.3)",
                ],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div className="absolute inset-0 bg-gradient-to-r from-red-700 to-red-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10 flex items-center justify-center">
                <motion.div
                  animate={{
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mr-3"
                >
                  <Phone className="h-7 w-7" />
                </motion.div>
                CALL EMERGENCY LINE
              </span>
            </motion.button>
          </motion.a>
          
          <motion.a 
            href="sms:1300566166" 
            className="group"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
          >
            <motion.button 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-14 py-6 rounded-xl hover:from-blue-700 hover:to-blue-800 flex items-center justify-center text-xl font-black min-h-[70px] w-full sm:w-auto shadow-2xl transition-all duration-300"
              whileHover={{ backgroundColor: "#1e40af" }}
            >
              <span className="flex items-center">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="mr-3"
                >
                  📱
                </motion.div>
                TEXT US NOW
              </span>
            </motion.button>
          </motion.a>
        </motion.div>

        {/* Animated Trust Indicators */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {[
            { icon: Shield, text: "IICRC CERTIFIED", color: "green" },
            { icon: CheckCircle, text: "INSURANCE APPROVED", color: "blue" },
            { icon: Star, text: "4.9★ RATED", color: "yellow" },
          ].map((item, index) => (
            <motion.div
              key={item.text}
              className={`bg-white bg-opacity-90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border`}
              whileHover={{ 
                scale: 1.05,
                backgroundColor: "rgba(255, 255, 255, 1)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 + index * 0.2 }}
            >
              <div className="flex items-center text-sm font-bold text-gray-800">
                <item.icon className={`h-4 w-4 mr-2 text-${item.color}-600`} />
                {item.text}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Response Guarantee with Glow Effect */}
        <motion.div 
          variants={itemVariants}
          className="inline-flex items-center"
        >
          <motion.div 
            className="bg-gradient-to-r from-gray-900 to-gray-800 text-white px-8 py-4 rounded-full shadow-xl"
            animate={{
              boxShadow: [
                "0 0 20px rgba(59, 130, 246, 0.3)",
                "0 0 40px rgba(59, 130, 246, 0.5)",
                "0 0 20px rgba(59, 130, 246, 0.3)",
              ],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div className="flex items-center space-x-3">
              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <Zap className="h-6 w-6 text-yellow-400" />
              </motion.div>
              <span className="font-bold text-lg">
                Available 24/7 • Licensed & Insured • 60-Minute Response Guarantee
              </span>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
'use client';

import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import Link from 'next/link';
import { CheckCircle, ArrowRight, Clock } from 'lucide-react';

interface ServiceCardProps {
  title: string;
  description: string;
  imageUrl: string;
  features: string[];
  responseTime: string;
  index: number;
}

// Individual 3D Service Card with advanced tilt and hover effects
function Interactive3DCard({ title, description, imageUrl, features, responseTime, index }: ServiceCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring animations for smooth motion
  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  // Transform mouse position to rotation values
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  // Transform for card lifting effect
  const transformStyle = useTransform(
    [mouseXSpring, mouseYSpring],
    ([latestX, latestY]) => `translate3d(${latestX * 10}px, ${latestY * 10}px, 0px)`
  );

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = (event.clientX - centerX) / (rect.width / 2);
    const mouseY = (event.clientY - centerY) / (rect.height / 2);

    x.set(mouseX);
    y.set(mouseY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={cardRef}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="group relative"
      initial={{ opacity: 0, y: 100, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.2,
        type: "spring",
        stiffness: 100,
        damping: 20,
      }}
      whileHover={{
        scale: 1.05,
        z: 50,
        transition: { duration: 0.3 }
      }}
    >
      {/* Glow effect on hover */}
      <motion.div
        className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-red-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          transform: transformStyle,
        }}
      />

      {/* Main card */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm border border-white/20"
        style={{
          transform: "translateZ(50px)",
        }}
      >
        {/* Image section with parallax effect */}
        <div className="relative h-64 overflow-hidden">
          <motion.div
            style={{
              transform: useTransform([mouseXSpring, mouseYSpring], ([x, y]) => 
                `translate3d(${x * 20}px, ${y * 20}px, 0px) scale(1.1)`
              ),
            }}
          >
            <Image
              src={imageUrl}
              alt={title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
          </motion.div>
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
          {/* Response time badge */}
          <motion.div 
            className="absolute bottom-4 left-4"
            style={{
              transform: "translateZ(100px)",
            }}
            animate={isHovered ? { scale: 1.1, y: -5 } : { scale: 1, y: 0 }}
          >
            <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg backdrop-blur-sm">
              <Clock className="h-3 w-3 inline mr-1" />
              {responseTime}
            </div>
          </motion.div>

          {/* Floating particles on hover */}
          {isHovered && (
            <>
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-blue-400 rounded-full"
                  initial={{
                    x: Math.random() * 300,
                    y: Math.random() * 200,
                    opacity: 0,
                  }}
                  animate={{
                    y: -50,
                    opacity: [0, 1, 0],
                    scale: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </>
          )}
        </div>

        {/* Content section */}
        <motion.div 
          className="p-8"
          style={{
            transform: "translateZ(80px)",
          }}
        >
          <motion.h3 
            className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-blue-600 transition-colours duration-300"
            animate={isHovered ? { y: -5 } : { y: 0 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-gray-600 mb-6 leading-relaxed"
            animate={isHovered ? { y: -5 } : { y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {description}
          </motion.p>

          {/* Features list */}
          <motion.div 
            className="space-y-3 mb-6"
            animate={isHovered ? { y: -5 } : { y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {features.map((feature, featureIndex) => (
              <motion.div 
                key={feature}
                className="flex items-center text-sm"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.2 + featureIndex * 0.1 }}
              >
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                <span>{feature}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            style={{
              transform: "translateZ(100px)",
            }}
            animate={isHovered ? { y: -5 } : { y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="tel:1300566166" className="group/btn">
              <motion.button
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-bold text-lg relative overflow-hidden"
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="relative z-10">Call Emergency Line</span>
                <motion.div
                  className="ml-2"
                  animate={isHovered ? { x: 5 } : { x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <ArrowRight className="h-5 w-5" />
                </motion.div>
                
                {/* Button background effect */}
                <motion.div
                  className="absolute inset-0 bg-blue-50 rounded-lg -z-10"
                  initial={{ scale: 0, opacity: 0 }}
                  whileHover={{ 
                    scale: 1, 
                    opacity: 1,
                    transition: { duration: 0.2 }
                  }}
                />
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// Main component
export default function Interactive3DServiceCards() {
  const [ref, inView] = useInView({
    threshold: 0.1,
    triggerOnce: true,
  });

  const services = [
    {
      title: "Water Damage Restoration",
      description: "Emergency water extraction, structural drying, and complete restoration. Available 24/7 for floods, burst pipes, and storm damage.",
      imageUrl: "/images/services/water-damage-restoration.webp",
      features: [
        "Emergency water extraction",
        "Structural drying & dehumidification",
        "Mould prevention treatment"
      ],
      responseTime: "60-min response"
    },
    {
      title: "Fire Damage Restoration",
      description: "Complete fire and smoke damage restoration including soot removal, odour elimination, and structural repairs.",
      imageUrl: "/images/services/fire-damage-restoration.webp",
      features: [
        "Soot & smoke damage cleanup",
        "Odour elimination treatment",
        "Structural repair & restoration"
      ],
      responseTime: "60-min response"
    },
    {
      title: "Mould Remediation",
      description: "Professional mould inspection, testing, and safe removal to protect your family's health and property.",
      imageUrl: "/images/services/mould-remediation.webp",
      features: [
        "Comprehensive mould inspection",
        "Safe containment & removal",
        "Air quality testing & treatment"
      ],
      responseTime: "60-min response"
    }
  ];

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
          className="inline-flex items-center bg-blue-100 text-blue-800 px-4 py-2 rounded-full mb-6"
          whileHover={{ scale: 1.05 }}
        >
          <span className="font-semibold">Professional Services</span>
        </motion.div>
        
        <motion.h2 
          className="text-4xl md:text-6xl font-black text-gray-900 mb-8"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Emergency Services & Solutions
        </motion.h2>
        
        <motion.p 
          className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          Comprehensive disaster recovery services available 24/7 with guaranteed response times nationwide
        </motion.p>
      </motion.div>

      {/* 3D Service Cards Grid */}
      <motion.div 
        className="grid md:grid-cols-3 gap-10"
        style={{ perspective: "1000px" }}
      >
        {services.map((service, index) => (
          <Interactive3DCard
            key={service.title}
            {...service}
            index={index}
          />
        ))}
      </motion.div>
    </div>
  );
}
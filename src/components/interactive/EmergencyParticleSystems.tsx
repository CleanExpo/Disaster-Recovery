'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ParticleSystemProps {
  type?: 'water' | 'fire' | 'storm' | 'emergency';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

// CSS-based particle effects  
export function CSSParticleEffect({ type = 'emergency', intensity = 'medium' }: ParticleSystemProps) {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  const particleCount = intensity === 'low' ? 20 : intensity === 'medium' ? 40 : 60;
  
  const getParticleStyle = () => {
    switch (type) {
      case 'fire':
        return {
          colours: ['#FF4500', '#FF6347', '#FFD700', '#2563EB'],
          size: 'w-2 h-2' };
      case 'water':
        return {
          colours: ['#00BFFF', '#1E90FF', '#4169E1', '#0000CD'],
          size: 'w-1.5 h-1.5' };
      case 'storm':
        return {
          colours: ['#708090', '#778899', '#B0C4DE', '#C0C0C0'],
          size: 'w-1 h-3' };
      default:
        return {
          colours: ['#FF4500', '#00BFFF', '#FFD700', '#708090'],
          size: 'w-1.5 h-1.5' };
    }
  };

  const style = getParticleStyle();

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className={`absolute ${style.size} rounded-full`}
          style={{
            backgroundColor: style.colours[i % style.colours.length],
            left: `${Math.random() * 100}%` }}
          initial={{
            y: -20,
            opacity: 0 }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 20 : 1080,
            opacity: [0, 1, 1, 0] }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear" }}
        />
      ))}
    </div>
  );
}

export function WaterParticles({ intensity = 'medium', className = '' }: ParticleSystemProps) {
  return (
    <div className={`relative ${className}`}>
      <CSSParticleEffect type="water" intensity={intensity} />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/5 to-blue-500/10" />
    </div>
  );
}

export function FireParticles({ intensity = 'medium', className = '' }: ParticleSystemProps) {
  return (
    <div className={`relative ${className}`}>
      <CSSParticleEffect type="fire" intensity={intensity} />
      <div className="absolute inset-0 bg-gradient-to-t from-blue-600/10 via-red-500/5 to-transparent" />
    </div>
  );
}

export function StormParticles({ intensity = 'high', className = '' }: ParticleSystemProps) {
  return (
    <div className={`relative ${className}`}>
      <CSSParticleEffect type="storm" intensity={intensity} />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-500/10 via-transparent to-gray-700/10" />
    </div>
  );
}

export function EmergencyResponseParticles({ intensity = 'medium', className = '' }: ParticleSystemProps) {
  const [currentType, setCurrentType] = useState<'fire' | 'water'>('fire');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentType(prev => prev === 'fire' ? 'water' : 'fire');
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative ${className}`}>
      <motion.div
        key={currentType}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <CSSParticleEffect type={currentType} intensity={intensity} />
      </motion.div>
      <motion.div
        className="absolute inset-0"
        animate={{
          background: currentType === 'fire' 
            ? 'radial-gradient(circle at centre, rgba(255,69,0,0.1) 0%, transparent 70%)'
            : 'radial-gradient(circle at centre, rgba(0,191,255,0.1) 0%, transparent 70%)' }}
        transition={{ duration: 2 }}
      />
    </div>
  );
}

// Main export
export default function EmergencyParticleSystem({ 
  type = 'emergency', 
  intensity = 'medium',
  className = '' 
}: ParticleSystemProps) {
  switch (type) {
    case 'water':
      return <WaterParticles intensity={intensity} className={className} />;
    case 'fire':
      return <FireParticles intensity={intensity} className={className} />;
    case 'storm':
      return <StormParticles intensity={intensity} className={className} />;
    default:
      return <EmergencyResponseParticles intensity={intensity} className={className} />;
  }
}
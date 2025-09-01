'use client';

import React from 'react';
import styles from './FloodingEffect.module.css';

export default function FloodingEffect() {
  return (
    <>
      {/* Flooding Water Effect Container */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none overflow-hidden" style={{ height: '120px', zIndex: 10 }}>
        
        {/* Water Layer 1 - Deep water base */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-900/40 via-blue-800/30 to-transparent" />
        
        {/* Water Layer 2 - Mid water with movement */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-16 opacity-80"
          style={{
            background: 'linear-gradient(180deg, transparent 0%, rgba(59, 130, 246, 0.3) 50%, rgba(37, 99, 235, 0.4) 100%)',
            animation: `${styles.waterRiseAnimation}`
          }}
        />
        
        {/* Wave Layer 1 - Primary waves */}
        <svg 
          className={`absolute bottom-0 left-0 w-full h-24 ${styles.waveAnimation}`}
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <defs>
            <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.2" />
              <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#2563eb" stopOpacity="0.4" />
            </linearGradient>
          </defs>
          <path 
            d="M0,80 C150,60 350,90 600,80 C850,70 1050,85 1200,80 L1200,120 L0,120 Z"
            fill="url(#wave-gradient-1)"
          />
        </svg>
        
        {/* Wave Layer 2 - Secondary waves */}
        <svg 
          className={`absolute bottom-0 left-0 w-full h-24 ${styles.waveAnimationReverse}`}
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <defs>
            <linearGradient id="wave-gradient-2" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#93c5fd" stopOpacity="0.15" />
              <stop offset="50%" stopColor="#60a5fa" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          <path 
            d="M0,85 C200,75 400,88 600,85 C800,82 1000,87 1200,85 L1200,120 L0,120 Z"
            fill="url(#wave-gradient-2)"
          />
        </svg>
        
        {/* Wave Layer 3 - Surface ripples */}
        <svg 
          className={`absolute bottom-0 left-0 w-full h-20 ${styles.waveAnimationFast}`}
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
        >
          <defs>
            <linearGradient id="wave-gradient-3" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#dbeafe" stopOpacity="0.1" />
              <stop offset="50%" stopColor="#bfdbfe" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#93c5fd" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          <path 
            d="M0,90 C120,85 240,92 480,90 C720,88 960,91 1200,90 L1200,120 L0,120 Z"
            fill="url(#wave-gradient-3)"
          />
        </svg>
        
        {/* Foam and Bubbles */}
        <div className="absolute bottom-0 left-0 right-0 h-8">
          <div className="relative w-full h-full">
            {/* Foam particles */}
            <div className={`absolute bottom-2 left-1/4 w-2 h-2 bg-white/20 rounded-full ${styles.animateBubble}`} />
            <div className={`absolute bottom-3 left-1/3 w-1 h-1 bg-white/30 rounded-full ${styles.animateBubbleDelayed}`} />
            <div className={`absolute bottom-1 left-1/2 w-1.5 h-1.5 bg-white/25 rounded-full ${styles.animateBubble}`} />
            <div className={`absolute bottom-4 left-2/3 w-1 h-1 bg-white/20 rounded-full ${styles.animateBubbleDelayed}`} />
            <div className={`absolute bottom-2 left-3/4 w-2 h-2 bg-white/15 rounded-full ${styles.animateBubble}`} />
          </div>
        </div>
        
        {/* Water Reflection Effect */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-12 opacity-30"
          style={{
            background: 'linear-gradient(180deg, rgba(147, 197, 253, 0.2) 0%, transparent 100%)',
            animation: `${styles.shimmerAnimation}`
          }}
        />
        
        {/* Debris floating (optional dramatic effect) */}
        <div className={`absolute bottom-8 left-10 w-8 h-1 bg-gray-700/30 rounded ${styles.animateFloat}`} />
        <div className={`absolute bottom-10 right-20 w-6 h-1 bg-gray-600/20 rounded ${styles.animateFloatDelayed}`} />
        <div className={`absolute bottom-6 left-1/3 w-4 h-0.5 bg-gray-800/25 rounded ${styles.animateFloat}`} />
      </div>
    </>
  );
}

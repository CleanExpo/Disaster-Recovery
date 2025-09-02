'use client';

import React, { useEffect, useState } from 'react';

export default function StormCloudBackground() {
  const [intensity, setIntensity] = useState<'light' | 'moderate' | 'severe'>('moderate');
  const [showRain, setShowRain] = useState(false);

  useEffect(() => {
    // Change storm intensity over time
    const intensityInterval = setInterval(() => {
      const random = Math.random();
      if (random < 0.2) {
        setIntensity('light');
        setShowRain(false);
      } else if (random < 0.7) {
        setIntensity('moderate');
        setShowRain(Math.random() > 0.5);
      } else {
        setIntensity('severe');
        setShowRain(true);
      }
    }, 20000); // Change every 20 seconds

    return () => clearInterval(intensityInterval);
  }, []);

  return (
    <div className={`storm-cloud-container storm-intensity-${intensity}`}>
      {/* Multiple cloud layers for depth and smooth rolling effect */}
      <div className="cloud-layer cloud-layer-1" />
      <div className="cloud-layer cloud-layer-2" />
      <div className="cloud-layer cloud-layer-3" />
      
      {/* Sunshine breaks that appear periodically */}
      <div className="sunshine-layer" />
      
      {/* Lightning flashes for storm effect */}
      {intensity === 'severe' && <div className="lightning-flash" />}
      
      {/* Rain overlay for additional atmosphere */}
      {showRain && <div className="rain-overlay" />}
    </div>
  );
}
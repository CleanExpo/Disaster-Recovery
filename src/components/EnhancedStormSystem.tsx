'use client';

import React, { useEffect, useState, useRef } from 'react';

interface RainDrop {
  id: number;
  left: number;
  delay: number;
  duration: number;
}

interface DebrisParticle {
  id: number;
  left: number;
  bottom: number;
  delay: number;
  size: number;
}

export default function EnhancedStormSystem() {
  const [stormPhase, setStormPhase] = useState<'calm' | 'building' | 'peak' | 'passing' | 'rainbow'>('building');
  const [rainDrops, setRainDrops] = useState<RainDrop[]>([]);
  const [debris, setDebris] = useState<DebrisParticle[]>([]);
  const [showTornado, setShowTornado] = useState(false);
  const [lightningPosition, setLightningPosition] = useState(50);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Generate rain drops
    const drops: RainDrop[] = [];
    for (let i = 0; i < 100; i++) {
      drops.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 2,
        duration: 0.5 + Math.random() * 1
      });
    }
    setRainDrops(drops);

    // Generate debris particles
    const particles: DebrisParticle[] = [];
    for (let i = 0; i < 20; i++) {
      particles.push({
        id: i,
        left: Math.random() * 100,
        bottom: Math.random() * 100,
        delay: Math.random() * 10,
        size: 2 + Math.random() * 6
      });
    }
    setDebris(particles);

    // Storm phase cycle
    const phaseInterval = setInterval(() => {
      setStormPhase(prev => {
        const phases: typeof prev[] = ['calm', 'building', 'peak', 'passing', 'rainbow'];
        const currentIndex = phases.indexOf(prev);
        return phases[(currentIndex + 1) % phases.length];
      });
    }, 30000); // Change phase every 30 seconds

    // Lightning position randomizer
    const lightningInterval = setInterval(() => {
      setLightningPosition(20 + Math.random() * 60);
    }, 15000);

    // Tornado appearance
    const tornadoInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setShowTornado(true);
        setTimeout(() => setShowTornado(false), 60000);
      }
    }, 120000); // Check every 2 minutes

    return () => {
      clearInterval(phaseInterval);
      clearInterval(lightningInterval);
      clearInterval(tornadoInterval);
    };
  }, []);

  // Adjust rain intensity based on storm phase
  const getRainIntensity = () => {
    switch (stormPhase) {
      case 'calm': return 20;
      case 'building': return 50;
      case 'peak': return 150;
      case 'passing': return 80;
      case 'rainbow': return 10;
      default: return 50;
    }
  };

  // Get storm intensity class
  const getStormClass = () => {
    switch (stormPhase) {
      case 'calm': return 'storm-minimal';
      case 'building': return 'storm-building';
      case 'peak': return 'storm-extreme';
      case 'passing': return 'storm-severe';
      case 'rainbow': return 'storm-minimal';
      default: return '';
    }
  };

  return (
    <div className={`enhanced-storm-system ${getStormClass()}`}>
      {/* Dark storm clouds */}
      <div className="storm-clouds-dark" />

      {/* Thunder overlay */}
      {(stormPhase === 'peak' || stormPhase === 'building') && (
        <div className="thunder-overlay" />
      )}

      {/* Lightning strikes */}
      {stormPhase === 'peak' && (
        <>
          <div 
            className="lightning-bolt" 
            style={{ left: `${lightningPosition}%` }}
          />
          <div 
            className="lightning-bolt" 
            style={{ 
              left: `${lightningPosition + 20}%`,
              animationDelay: '6s'
            }}
          />
        </>
      )}

      {/* Rain effect */}
      {stormPhase !== 'calm' && stormPhase !== 'rainbow' && (
        <div className="rain-container">
          {rainDrops.slice(0, getRainIntensity()).map(drop => (
            <div
              key={drop.id}
              className="rain-drop"
              style={{
                left: `${drop.left}%`,
                animationDelay: `${drop.delay}s`,
                animationDuration: `${drop.duration}s`
              }}
            />
          ))}
          {stormPhase === 'peak' && (
            <div className="heavy-rain" />
          )}
        </div>
      )}

      {/* Wind effect */}
      {(stormPhase === 'building' || stormPhase === 'peak') && (
        <div className="wind-effect" />
      )}

      {/* Debris particles */}
      {stormPhase === 'peak' && debris.map(particle => (
        <div
          key={particle.id}
          className="debris-particle"
          style={{
            left: `${particle.left}%`,
            bottom: `${particle.bottom}%`,
            animationDelay: `${particle.delay}s`,
            width: `${particle.size}px`,
            height: `${particle.size}px`
          }}
        />
      ))}

      {/* Fog layer */}
      {(stormPhase === 'passing' || stormPhase === 'building') && (
        <div className="fog-layer" />
      )}

      {/* Tornado effect */}
      {showTornado && stormPhase === 'peak' && (
        <div className="tornado-funnel" />
      )}

      {/* Rainbow after storm */}
      {stormPhase === 'rainbow' && (
        <div className="rainbow-arc" />
      )}

      {/* Storm phase indicator (for debugging, can be removed) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="fixed top-4 right-4 bg-black/50 text-white px-3 py-1 rounded text-sm z-50">
          Storm: {stormPhase}
        </div>
      )}
    </div>
  );
}
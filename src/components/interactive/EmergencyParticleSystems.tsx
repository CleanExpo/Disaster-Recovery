'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Water Damage Particle System
function WaterParticles({ count = 1000 }) {
  const pointsRef = useRef<any>();
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      // Scattered throughout the view
      positions[i * 3] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 25;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 25;
      
      // Water blue colors with variation
      colors[i * 3] = 0.1 + Math.random() * 0.2;     // R
      colors[i * 3 + 1] = 0.4 + Math.random() * 0.4; // G
      colors[i * 3 + 2] = 0.8 + Math.random() * 0.2; // B
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      // Gentle floating motion like water droplets
      const positions = pointsRef.current.geometry.attributes.position.array;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Vertical falling motion with some horizontal drift
        positions[i3 + 1] -= 0.005 + Math.sin(time + i) * 0.001;
        positions[i3] += Math.sin(time * 0.5 + i) * 0.0005;
        
        // Reset position when particle falls too far
        if (positions[i3 + 1] < -12) {
          positions[i3 + 1] = 12;
          positions[i3] = (Math.random() - 0.5) * 25;
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y += 0.001;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition.positions} colors={particlesPosition.colors}>
      <PointMaterial 
        size={0.03}
        vertexColors
        transparent
        opacity={0.6}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </Points>
  );
}

// Fire Damage Particle System
function FireParticles({ count = 800 }) {
  const pointsRef = useRef<any>();
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
      
      // Fire colors: red, orange, yellow
      const fireType = Math.random();
      if (fireType < 0.4) {
        // Deep red
        colors[i * 3] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 1] = 0.1 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.0;
      } else if (fireType < 0.7) {
        // Orange
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.4 + Math.random() * 0.4;
        colors[i * 3 + 2] = 0.0;
      } else {
        // Yellow/white hot
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.8 + Math.random() * 0.2;
        colors[i * 3 + 2] = 0.2 + Math.random() * 0.3;
      }
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Upward floating motion like embers
        positions[i3 + 1] += 0.01 + Math.sin(time + i) * 0.005;
        positions[i3] += Math.sin(time * 0.8 + i) * 0.003;
        positions[i3 + 2] += Math.cos(time * 0.6 + i) * 0.002;
        
        // Reset position when particle rises too high
        if (positions[i3 + 1] > 12) {
          positions[i3 + 1] = -12;
          positions[i3] = (Math.random() - 0.5) * 20;
          positions[i3 + 2] = (Math.random() - 0.5) * 20;
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.y += 0.002;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition.positions} colors={particlesPosition.colors}>
      <PointMaterial 
        size={0.04}
        vertexColors
        transparent
        opacity={0.4}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </Points>
  );
}

// Storm Damage Particle System
function StormParticles({ count = 1200 }) {
  const pointsRef = useRef<any>();
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      
      // Storm colors: dark greys, blues, and whites (lightning)
      const stormType = Math.random();
      if (stormType < 0.6) {
        // Dark grey clouds
        const intensity = 0.3 + Math.random() * 0.3;
        colors[i * 3] = intensity;
        colors[i * 3 + 1] = intensity;
        colors[i * 3 + 2] = intensity + 0.1;
      } else if (stormType < 0.85) {
        // Blue rain
        colors[i * 3] = 0.2;
        colors[i * 3 + 1] = 0.3 + Math.random() * 0.3;
        colors[i * 3 + 2] = 0.7 + Math.random() * 0.3;
      } else {
        // Lightning white
        const intensity = 0.8 + Math.random() * 0.2;
        colors[i * 3] = intensity;
        colors[i * 3 + 1] = intensity;
        colors[i * 3 + 2] = intensity;
      }
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Chaotic storm movement
        positions[i3] += Math.sin(time * 2 + i) * 0.008;
        positions[i3 + 1] -= 0.008 + Math.sin(time * 1.5 + i) * 0.004;
        positions[i3 + 2] += Math.cos(time * 1.8 + i) * 0.006;
        
        // Wind effect - horizontal movement
        positions[i3] += 0.003;
        
        // Reset position
        if (positions[i3 + 1] < -15 || positions[i3] > 15) {
          positions[i3 + 1] = 15;
          positions[i3] = -15;
          positions[i3 + 2] = (Math.random() - 0.5) * 30;
        }
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      pointsRef.current.rotation.z += 0.001;
    }
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition.positions} colors={particlesPosition.colors}>
      <PointMaterial 
        size={0.025}
        vertexColors
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </Points>
  );
}

// Emergency Response Particle System
function EmergencyResponseParticles({ count = 600 }) {
  const pointsRef = useRef<any>();
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 22;
      
      // Emergency vehicle colors: red, blue, white
      const emergencyType = Math.random();
      if (emergencyType < 0.4) {
        // Emergency red
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 0.0;
        colors[i * 3 + 2] = 0.0;
      } else if (emergencyType < 0.7) {
        // Police/medical blue
        colors[i * 3] = 0.0;
        colors[i * 3 + 1] = 0.2;
        colors[i * 3 + 2] = 1.0;
      } else {
        // Bright white
        colors[i * 3] = 1.0;
        colors[i * 3 + 1] = 1.0;
        colors[i * 3 + 2] = 1.0;
      }
    }
    
    return { positions, colors };
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      const positions = pointsRef.current.geometry.attributes.position.array;
      const time = state.clock.elapsedTime;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        // Pulsing emergency light effect
        positions[i3] += Math.sin(time * 4 + i) * 0.002;
        positions[i3 + 1] += Math.cos(time * 4 + i) * 0.002;
        positions[i3 + 2] += Math.sin(time * 3 + i) * 0.001;
      }
      
      pointsRef.current.geometry.attributes.position.needsUpdate = true;
      
      // Flash effect
      const flash = Math.sin(time * 8) > 0.7 ? 1 : 0.7;
      if (pointsRef.current.material) {
        pointsRef.current.material.opacity = flash * 0.8;
      }
    }
  });

  return (
    <Points ref={pointsRef} positions={particlesPosition.positions} colors={particlesPosition.colors}>
      <PointMaterial 
        size={0.06}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        sizeAttenuation={true}
      />
    </Points>
  );
}

// Particle System Container
interface ParticleSystemProps {
  type: 'water' | 'fire' | 'storm' | 'emergency';
  intensity?: 'low' | 'medium' | 'high';
  className?: string;
}

function ParticleSystem({ type, intensity = 'medium', className = '' }: ParticleSystemProps) {
  const getParticleCount = () => {
    const baseCounts = {
      water: { low: 400, medium: 800, high: 1200 },
      fire: { low: 300, medium: 600, high: 900 },
      storm: { low: 500, medium: 1000, high: 1500 },
      emergency: { low: 200, medium: 400, high: 600 },
    };
    
    return baseCounts[type][intensity];
  };

  const renderParticles = () => {
    const count = getParticleCount();
    
    switch (type) {
      case 'water':
        return <WaterParticles count={count} />;
      case 'fire':
        return <FireParticles count={count} />;
      case 'storm':
        return <StormParticles count={count} />;
      case 'emergency':
        return <EmergencyResponseParticles count={count} />;
      default:
        return <WaterParticles count={count} />;
    }
  };

  return (
    <div className={`absolute inset-0 ${className}`}>
      <Canvas camera={{ position: [0, 0, 8], fov: 60 }}>
        <ambientLight intensity={0.1} />
        {renderParticles()}
      </Canvas>
    </div>
  );
}

// CSS Particle Effects (for browsers that don't support WebGL well)
interface CSSParticleProps {
  type: 'water' | 'fire' | 'storm' | 'emergency';
  count?: number;
}

function CSSParticleEffect({ type, count = 50 }: CSSParticleProps) {
  const getParticleStyle = (index: number) => {
    const baseStyles = {
      position: 'absolute' as const,
      borderRadius: '50%',
      pointerEvents: 'none' as const,
      left: `${Math.random() * 100}%`,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${3 + Math.random() * 4}s`,
      animationIterationCount: 'infinite',
      animationTimingFunction: 'linear',
    };

    switch (type) {
      case 'water':
        return {
          ...baseStyles,
          width: `${2 + Math.random() * 4}px`,
          height: `${2 + Math.random() * 4}px`,
          background: `rgba(59, 130, 246, ${0.3 + Math.random() * 0.4})`,
          animationName: 'waterfall',
        };
      case 'fire':
        return {
          ...baseStyles,
          width: `${3 + Math.random() * 6}px`,
          height: `${3 + Math.random() * 6}px`,
          background: `radial-gradient(circle, rgba(255, ${100 + Math.random() * 100}, 0, ${0.4 + Math.random() * 0.4}) 0%, transparent 70%)`,
          animationName: 'fireRise',
        };
      case 'storm':
        return {
          ...baseStyles,
          width: `${1 + Math.random() * 2}px`,
          height: `${8 + Math.random() * 12}px`,
          background: `rgba(156, 163, 175, ${0.4 + Math.random() * 0.4})`,
          animationName: 'stormDiagonal',
          transform: 'rotate(15deg)',
        };
      case 'emergency':
        return {
          ...baseStyles,
          width: `${4 + Math.random() * 8}px`,
          height: `${4 + Math.random() * 8}px`,
          background: Math.random() > 0.5 
            ? `rgba(239, 68, 68, ${0.5 + Math.random() * 0.5})` 
            : `rgba(59, 130, 246, ${0.5 + Math.random() * 0.5})`,
          animationName: 'emergencyFlash',
          borderRadius: '50%',
          filter: 'blur(1px)',
        };
      default:
        return baseStyles;
    }
  };

  return (
    <>
      <style jsx>{`
        @keyframes waterfall {
          0% { transform: translateY(-100vh) translateX(0); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(100vh) translateX(20px); opacity: 0; }
        }
        
        @keyframes fireRise {
          0% { transform: translateY(100vh) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-100vh) scale(0.3); opacity: 0; }
        }
        
        @keyframes stormDiagonal {
          0% { transform: translateY(-100vh) translateX(-50px) rotate(15deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 0.7; }
          100% { transform: translateY(100vh) translateX(100px) rotate(15deg); opacity: 0; }
        }
        
        @keyframes emergencyFlash {
          0%, 50%, 100% { opacity: 0.2; transform: scale(1); }
          25%, 75% { opacity: 1; transform: scale(1.2); }
        }
      `}</style>
      
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: count }).map((_, index) => (
          <div
            key={index}
            style={getParticleStyle(index)}
          />
        ))}
      </div>
    </>
  );
}

// Main Export Component
interface EmergencyParticleSystemProps {
  type: 'water' | 'fire' | 'storm' | 'emergency';
  intensity?: 'low' | 'medium' | 'high';
  use3D?: boolean;
  className?: string;
}

export default function EmergencyParticleSystem({ 
  type, 
  intensity = 'medium', 
  use3D = true,
  className = '' 
}: EmergencyParticleSystemProps) {
  return (
    <div className={`relative ${className}`}>
      {use3D ? (
        <ParticleSystem type={type} intensity={intensity} />
      ) : (
        <CSSParticleEffect type={type} count={intensity === 'low' ? 20 : intensity === 'high' ? 80 : 50} />
      )}
    </div>
  );
}

// Individual particle system exports
export {
  WaterParticles,
  FireParticles,
  StormParticles,
  EmergencyResponseParticles,
  CSSParticleEffect,
};
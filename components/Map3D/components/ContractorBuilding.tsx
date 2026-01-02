'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { gsap } from 'gsap';
import * as THREE from 'three';

interface ContractorBuildingProps {
  position: [number, number, number];
  tier: 25 | 50 | 75 | 100;
  color: string;
}

// 3D Building models for contractor locations
export const ContractorBuilding = ({ position, tier, color }: ContractorBuildingProps) => {
  const buildingRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  const heightMap: Record<number, number> = { 25: 0.6, 50: 1.2, 75: 1.8, 100: 2.5 };
  const height = heightMap[tier] || 1.2;

  useEffect(() => {
    if (buildingRef.current) {
      gsap.from(buildingRef.current.position, {
        y: 8,
        duration: 1.5,
        ease: 'bounce.out',
      });
      gsap.from(buildingRef.current.scale, {
        x: 0,
        y: 0,
        z: 0,
        duration: 1,
        ease: 'back.out(1.7)',
      });
    }
  }, []);

  useFrame(({ clock }) => {
    if (lightRef.current) {
      const pulse = 0.5 + Math.sin(clock.getElapsedTime() * 2) * 0.5;
      lightRef.current.intensity = pulse;
    }
  });

  return (
    <group position={position}>
      {/* Main building structure */}
      <group ref={buildingRef}>
        {/* Base foundation */}
        <mesh position={[0, height / 4, 0]} castShadow>
          <boxGeometry args={[0.4, height / 2, 0.4]} />
          <meshStandardMaterial
            color={color}
            roughness={0.3}
            metalness={0.7}
            emissive={color}
            emissiveIntensity={0.2}
          />
        </mesh>

        {/* Top section */}
        <mesh position={[0, height / 2 + 0.3, 0]} castShadow>
          <boxGeometry args={[0.35, 0.3, 0.35]} />
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} emissive={color} emissiveIntensity={0.4} />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, height / 2 + 0.6, 0]}>
          <cylinderGeometry args={[0.02, 0.02, 0.3, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={1} />
        </mesh>

        {/* Communication array */}
        <mesh position={[0, height / 2 + 0.75, 0]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.9} />
        </mesh>
      </group>

      {/* Coverage zone visualization */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, 0]}>
        <ringGeometry args={[tier / 80, tier / 75, 64]} />
        <meshBasicMaterial color={color} transparent opacity={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Glowing base circle */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
        <circleGeometry args={[0.5, 32]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>

      {/* Point light from building */}
      <pointLight ref={lightRef} position={[0, height / 2, 0]} color={color} intensity={2} distance={5} decay={2} />
    </group>
  );
};

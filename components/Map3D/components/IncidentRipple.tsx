'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface IncidentRippleProps {
  position: [number, number, number];
  resolved: boolean;
}

// Enhanced incident ripple effect
export const IncidentRipple = ({ position, resolved }: IncidentRippleProps) => {
  const rippleRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (rippleRef.current) {
      const time = clock.getElapsedTime() * 2;
      rippleRef.current.scale.x = rippleRef.current.scale.y = 1 + time;
      (rippleRef.current.material as THREE.MeshBasicMaterial).opacity = Math.max(0, 1 - (time % 2) / 2);
    }
  });

  return (
    <mesh ref={rippleRef} position={[position[0], 0.55, position[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <ringGeometry args={[0.2, 0.3, 32]} />
      <meshBasicMaterial color={resolved ? '#22c55e' : '#ff4444'} transparent opacity={0.8} />
    </mesh>
  );
};

interface IncidentMarkerProps {
  position: [number, number, number];
  resolved: boolean;
  onClick: () => void;
}

// Incident marker sphere
export const IncidentMarker = ({ position, resolved, onClick }: IncidentMarkerProps) => {
  return (
    <group>
      <IncidentRipple position={position} resolved={resolved} />
      <mesh position={position} onClick={onClick} castShadow>
        <sphereGeometry args={[0.3, 32, 32]} />
        <meshStandardMaterial
          color={resolved ? '#22c55e' : '#ff4444'}
          emissive={resolved ? '#22c55e' : '#ff0000'}
          emissiveIntensity={2}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
    </group>
  );
};

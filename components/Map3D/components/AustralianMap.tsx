'use client';

import { useRef } from 'react';
import * as THREE from 'three';
import type { GeoData } from '../types';

interface AustralianMapProps {
  geoData: GeoData | null;
}

// Australian States as 3D extruded regions
export const AustralianMap = ({ geoData }: AustralianMapProps) => {
  const stateColors: Record<string, string> = {
    NSW: '#3b82f6',
    VIC: '#6366f1',
    QLD: '#8b5cf6',
    WA: '#ec4899',
    SA: '#f59e0b',
    NT: '#ef4444',
    TAS: '#06b6d4',
    ACT: '#10b981',
  };

  const groupRef = useRef<THREE.Group>(null);

  if (!geoData) return null;

  return (
    <group ref={groupRef}>
      {geoData.features.map((feature) => {
        const stateName = feature.properties.abbr;
        const coords = feature.geometry.coordinates[0];

        if (!coords || coords.length === 0) return null;

        // Create 3D extruded shape from coordinates
        const shape = new THREE.Shape();

        coords.forEach((coord: number[], idx: number) => {
          // Scale coordinates to fit our scene
          const x = (coord[0] - 130) / 5 - 3;
          const z = -(coord[1] + 25) / 5;

          if (idx === 0) {
            shape.moveTo(x, z);
          } else {
            shape.lineTo(x, z);
          }
        });

        const extrudeSettings: THREE.ExtrudeGeometryOptions = {
          steps: 1,
          depth: 1.5, // Thickness of the "block"
          bevelEnabled: true,
          bevelThickness: 0.15, // Rounded top edge
          bevelSize: 0.1, // Expansion of the bevel
          bevelOffset: 0,
          bevelSegments: 8, // Smoothness
        };

        return (
          <group key={stateName}>
            {/* Main state body */}
            <mesh
              position={[0, 0, 0]}
              rotation={[-Math.PI / 2, 0, 0]}
              castShadow
              receiveShadow
              // Adding a tiny scale reduction (0.99) creates the
              // gap between states seen on the CORE site
              scale={[0.99, 0.99, 1]}
            >
              <extrudeGeometry args={[shape, extrudeSettings]} />
              <meshPhysicalMaterial
                color="#1a222f" /* Deep CORE Slate */
                roughness={0.9} /* Matte finish */
                metalness={0.1} /* Non-metallic */
                clearcoat={0.05} /* Subtle top sheen */
                clearcoatRoughness={0.1}
                flatShading={false}
              />
            </mesh>

            {/* State border glow */}
            <mesh position={[0, 0.31, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <extrudeGeometry args={[shape, { depth: 0.01 }]} />
              <meshBasicMaterial
                color={stateColors[stateName] || '#ffffff'}
                transparent
                opacity={0.5}
                side={THREE.DoubleSide}
              />
            </mesh>
          </group>
        );
      })}
    </group>
  );
};

'use client';

import { useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Terrain with elevation
export const Terrain = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useEffect(() => {
    if (!meshRef.current) return;

    const geometry = meshRef.current.geometry as THREE.PlaneGeometry;
    const positions = geometry.attributes.position;

    // Generate terrain elevation
    for (let i = 0; i < positions.count; i++) {
      const x = positions.getX(i);
      const z = positions.getZ(i);

      // Create varied terrain using noise-like function
      const elevation =
        Math.sin(x * 0.2) * Math.cos(z * 0.2) * 0.3 +
        Math.sin(x * 0.5) * 0.15 +
        Math.cos(z * 0.3) * 0.1;

      positions.setY(i, elevation);
    }

    positions.needsUpdate = true;
    geometry.computeVertexNormals();
  }, []);

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
      <planeGeometry args={[40, 40, 128, 128]} />
      <meshStandardMaterial
        color="#2a3441" // Deep, desaturated slate blue
        roughness={0.85} // Prevents shiny plastic reflections
        metalness={0.1} // Non-metallic
        flatShading={false}
      />
    </mesh>
  );
};

// Ocean/Water plane with animated waves
export const Ocean = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);

  useEffect(() => {
    materialRef.current = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        color: { value: new THREE.Color('#1e3a5f') },
      },
      vertexShader: `
        uniform float time;
        varying vec2 vUv;
        void main() {
          vUv = uv;
          vec3 pos = position;
          pos.z += sin(pos.x * 2.0 + time) * 0.1;
          pos.z += cos(pos.y * 2.0 + time * 0.5) * 0.1;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 color;
        varying vec2 vUv;
        void main() {
          gl_FragColor = vec4(color, 0.6);
        }
      `,
      transparent: true,
      side: THREE.DoubleSide,
    });
  }, []);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.time.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.7, 0]}>
      <planeGeometry args={[50, 50, 32, 32]} />
      {materialRef.current && <primitive object={materialRef.current} attach="material" />}
    </mesh>
  );
};

// Starfield background
export const Starfield = () => {
  return (
    <group>
      {Array.from({ length: 500 }).map((_, i) => (
        <mesh
          key={i}
          position={[(Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200, (Math.random() - 0.5) * 200]}
        >
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshBasicMaterial color={`hsl(${Math.random() * 60 + 200}, 100%, ${Math.random() * 50 + 50}%)`} />
        </mesh>
      ))}
    </group>
  );
};

// Ground placeholder (replaced by Terrain)
export const Ground = () => {
  return null;
};

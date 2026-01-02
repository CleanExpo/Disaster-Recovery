'use client';

import dynamic from 'next/dynamic';
import type { Map3DProps } from './types';

// Dynamic import with SSR disabled - Three.js doesn't work with server-side rendering
const Map3DCanvas = dynamic(() => import('./Map3DCanvas'), {
  ssr: false,
  loading: () => (
    <div className="relative h-screen w-full bg-[#080a0f] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto mb-4" />
        <p className="text-white font-mono text-sm uppercase tracking-widest">Loading 3D Map...</p>
      </div>
    </div>
  ),
});

// Re-export types
export type { Contractor, Incident, Stats, GeoData, IncidentLocation, Map3DProps } from './types';

// Main export - use this in Next.js pages
export default function Map3D(props: Map3DProps) {
  return <Map3DCanvas {...props} />;
}

// Named export for explicit imports
export { Map3DCanvas };

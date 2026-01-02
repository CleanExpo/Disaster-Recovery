'use client';

import { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows, Environment, OrbitControls } from '@react-three/drei';

import { Terrain, Ocean, Starfield, Ground } from './components/Environment';
import { ContractorBuilding } from './components/ContractorBuilding';
import { IncidentMarker } from './components/IncidentRipple';
import { AustralianMap } from './components/AustralianMap';
import { EmergencyForm } from './components/EmergencyForm';
import { HUD, IncidentList, ContractorList } from './components/HUD';
import { calculateDistance } from './utils/geoMath';
import type { Contractor, Incident, Stats, GeoData, IncidentLocation, Map3DProps } from './types';

// Default contractors for demonstration
const DEFAULT_CONTRACTORS: Contractor[] = [
  { id: 1, name: 'Karalee HQ', position: [2, 0.8, -1], tier: 100, state: 'NSW', color: '#60a5fa', lat: -33.8688, lng: 151.2093 },
  { id: 2, name: 'Melbourne Central', position: [1.5, 0.8, -2.5], tier: 100, state: 'VIC', color: '#60a5fa', lat: -37.8136, lng: 144.9631 },
  { id: 3, name: 'Brisbane North', position: [2.8, 0.8, 1], tier: 50, state: 'QLD', color: '#fbbf24', lat: -27.4698, lng: 153.0251 },
  { id: 4, name: 'Brisbane South', position: [2.2, 0.8, 0], tier: 50, state: 'QLD', color: '#fbbf24', lat: -27.4698, lng: 153.0251 },
  { id: 5, name: 'Perth Metro', position: [-2.5, 0.8, 0], tier: 75, state: 'WA', color: '#a78bfa', lat: -31.9505, lng: 115.8605 },
  { id: 6, name: 'Adelaide Central', position: [0, 0.8, -1], tier: 50, state: 'SA', color: '#fbbf24', lat: -34.9285, lng: 138.6007 },
  { id: 7, name: 'Darwin Hub', position: [0.5, 0.8, 1.2], tier: 75, state: 'NT', color: '#a78bfa', lat: -12.4634, lng: 130.8456 },
  { id: 8, name: 'Hobart Base', position: [2.5, 0.8, -3], tier: 25, state: 'TAS', color: '#f87171', lat: -42.8821, lng: 147.3272 },
];

export default function Map3DCanvas({
  contractors = DEFAULT_CONTRACTORS,
  onContractorClick,
  onEmergencyReport,
  showHUD = true,
  showContractorList = true,
  className = '',
}: Map3DProps) {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [stats, setStats] = useState<Stats>({ totalIncidents: 0, resolved: 0, avgTime: 0 });
  const [geoData, setGeoData] = useState<GeoData | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [assignedContractor, setAssignedContractor] = useState<Contractor | null>(null);
  const [activeIncident, setActiveIncident] = useState<IncidentLocation | null>(null);

  // Load GeoJSON data
  useEffect(() => {
    fetch('/data/regions-australia.json')
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error('Failed to load map data:', err));
  }, []);

  const handleEmergencyClick = (incidentLocation: IncidentLocation) => {
    // Find if any contractor's radius covers this point
    const matchedContractor = contractors.find((c) => {
      const dist = calculateDistance(incidentLocation.lat, incidentLocation.lng, c.lat, c.lng);
      return dist <= c.tier;
    });

    if (matchedContractor) {
      setAssignedContractor(matchedContractor);
      setActiveIncident(incidentLocation);
      setShowForm(true);

      // Notify parent if callback provided
      if (onEmergencyReport) {
        onEmergencyReport(incidentLocation, matchedContractor);
      }
    } else {
      // No coverage - notify parent
      if (onEmergencyReport) {
        onEmergencyReport(incidentLocation, null);
      }
      alert('No contractors currently onboarded for this territory.');
    }
  };

  const resolveIncident = (id: number) => {
    setIncidents(incidents.map((inc) => (inc.id === id ? { ...inc, resolved: true } : inc)));
    setStats((prev) => ({ ...prev, resolved: prev.resolved + 1 }));
  };

  const triggerSimulation = () => {
    const incidentPos: [number, number, number] = [
      (Math.random() - 0.5) * 12,
      0.5,
      (Math.random() - 0.5) * 10,
    ];
    const newIncident: Incident = {
      id: Date.now(),
      position: incidentPos,
      type: (['fire', 'flood', 'medical'] as const)[Math.floor(Math.random() * 3)],
      timestamp: new Date(),
      resolved: false,
    };
    setIncidents([...incidents, newIncident]);
    setStats((prev) => ({ ...prev, totalIncidents: prev.totalIncidents + 1 }));
  };

  return (
    <div className={`relative h-screen w-full bg-[#080a0f] ${className}`}>
      {/* Scanlines effect */}
      <div className="scanlines scanlines-active pointer-events-none absolute inset-0 z-10" />

      {/* HUD Overlay */}
      {showHUD && <HUD contractors={contractors} stats={stats} />}

      {/* Emergency Button */}
      <div className="absolute top-52 left-5 z-[100]" style={{ fontFamily: 'monospace' }}>
        <button
          onClick={() => handleEmergencyClick({ lat: -33.8688, lng: 151.2093 })}
          className="bg-red-600 px-8 py-4 rounded-full font-bold uppercase tracking-widest text-white hover:scale-105 transition-transform shadow-[0_0_20px_rgba(220,38,38,0.5)]"
        >
          🚨 Report Emergency
        </button>
      </div>

      {/* Simulation Button */}
      <div className="absolute top-72 left-5 z-[100]" style={{ fontFamily: 'monospace' }}>
        <button
          onClick={triggerSimulation}
          className="bg-blue-600 px-6 py-3 rounded-full font-bold uppercase tracking-widest text-white text-sm hover:scale-105 transition-transform shadow-[0_0_15px_rgba(59,130,246,0.5)]"
        >
          Simulate Incident
        </button>
      </div>

      {/* Emergency Form Modal */}
      {showForm && (
        <EmergencyForm
          incidentData={activeIncident}
          contractor={assignedContractor}
          onClose={() => setShowForm(false)}
        />
      )}

      {/* Incident List */}
      <IncidentList incidents={incidents} onResolve={resolveIncident} />

      {/* Contractor List */}
      {showContractorList && <ContractorList contractors={contractors} />}

      {/* 3D Canvas */}
      <Canvas shadows camera={{ position: [12, 12, 12], fov: 40 }}>
        {/* Professional dark background */}
        <color attach="background" args={['#080a0f']} />

        {/* Environment provides soft reflections on bevels */}
        <Environment preset="city" />

        <Suspense fallback={null}>
          <group position={[0, -1, 0]}>
            {/* Key Light: Casts primary shadows */}
            <directionalLight position={[10, 20, 10]} intensity={1.5} castShadow shadow-mapSize={[2048, 2048]} />

            {/* Fill Light: Softens the dark side */}
            <pointLight position={[-10, -10, -10]} intensity={0.5} color="#3b82f6" />

            {/* Fog for depth */}
            <fog attach="fog" args={['#0f172a', 10, 50]} />

            {/* 3D Environment */}
            <Starfield />
            <Terrain />
            <Ocean />
            <Ground />
            {geoData && <AustralianMap geoData={geoData} />}

            {/* Contractor Buildings */}
            {contractors.map((contractor) => (
              <ContractorBuilding
                key={contractor.id}
                position={contractor.position}
                tier={contractor.tier}
                color={contractor.color}
              />
            ))}

            {/* Incident Markers */}
            {incidents.map((incident) => (
              <IncidentMarker
                key={incident.id}
                position={incident.position}
                resolved={incident.resolved}
                onClick={() => resolveIncident(incident.id)}
              />
            ))}

            {/* ContactShadows grounds the map */}
            <ContactShadows
              rotation-x={Math.PI / 2}
              position={[0, 0, 0]}
              opacity={0.7}
              width={40}
              height={40}
              blur={2.5}
              far={2}
            />
          </group>
        </Suspense>

        <OrbitControls enablePan={false} minPolarAngle={Math.PI / 4} maxPolarAngle={Math.PI / 2.2} makeDefault />
      </Canvas>
    </div>
  );
}

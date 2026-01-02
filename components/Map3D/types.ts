// Types for the 3D Australia Map component

export interface Contractor {
  id: number;
  name: string;
  position: [number, number, number];
  tier: 25 | 50 | 75 | 100;
  state: string;
  color: string;
  lat: number;
  lng: number;
}

export interface Incident {
  id: number;
  position: [number, number, number];
  type: 'fire' | 'flood' | 'medical';
  timestamp: Date;
  resolved: boolean;
}

export interface IncidentLocation {
  lat: number;
  lng: number;
}

export interface Stats {
  totalIncidents: number;
  resolved: number;
  avgTime: number;
}

export interface GeoFeature {
  type: string;
  properties: {
    abbr: string;
    name: string;
    [key: string]: unknown;
  };
  geometry: {
    type: string;
    coordinates: number[][][];
  };
}

export interface GeoData {
  type: string;
  features: GeoFeature[];
}

export interface Map3DProps {
  contractors?: Contractor[];
  onContractorClick?: (contractor: Contractor) => void;
  onEmergencyReport?: (location: IncidentLocation, contractor: Contractor | null) => void;
  showHUD?: boolean;
  showContractorList?: boolean;
  className?: string;
}

export interface CoverageArea {
  id: string;
  contractorId: string;
  companyName?: string; // Only shown in admin view
  centerPoint: Coordinates;
  businessAddress?: Address; // Only shown in admin view
  radius: number; // in kilometers
  radiusType: RadiusType;
  coverageType: CoverageType;
  isPreferred: boolean;
  status: CoverageStatus;
  activityVolume: number;
  leadCount: number;
  lastUpdated: string;
  metadata: CoverageMetadata;
}

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface Address {
  street?: string;
  suburb: string;
  state: string;
  postcode: string;
  country: string;
}

export type RadiusType = 
  | '25km'
  | '50km'
  | '75km'
  | '100km'
  | '150km'
  | 'custom';

export type CoverageType = 
  | 'standard'
  | 'premium'
  | 'specialist'
  | 'emergency'
  | 'all_services';

export type CoverageStatus = 
  | 'active'
  | 'paused'
  | 'pending'
  | 'inactive'
  | 'suspended';

export interface CoverageMetadata {
  serviceTypes: ServiceType[];
  responseTime: number; // average in minutes
  capacityUtilization: number; // percentage
  qualityScore?: number; // 0-100
  certifications?: string[];
  restrictions?: string[];
}

export type ServiceType = 
  | 'water_damage'
  | 'fire_damage'
  | 'storm_damage'
  | 'mold_remediation'
  | 'biohazard_cleanup'
  | 'reconstruction'
  | 'emergency_response';

export interface MapConfiguration {
  center: Coordinates;
  zoom: number;
  minZoom: number;
  maxZoom: number;
  style: MapStyle;
  layers: MapLayer[];
  controls: MapControl[];
  interactive: boolean;
  showLabels: boolean;
  showBoundaries: boolean;
}

export type MapStyle = 
  | 'standard'
  | 'satellite'
  | 'terrain'
  | 'dark'
  | 'light';

export interface MapLayer {
  id: string;
  type: LayerType;
  visible: boolean;
  opacity: number;
  zIndex: number;
  minZoom?: number;
  maxZoom?: number;
  data?: any;
  style?: LayerStyle;
}

export type LayerType = 
  | 'coverage_circles'
  | 'heatmap'
  | 'gaps'
  | 'boundaries'
  | 'markers'
  | 'clusters';

export interface LayerStyle {
  fillColor?: string;
  fillOpacity?: number;
  strokeColor?: string;
  strokeWidth?: number;
  strokeOpacity?: number;
  radius?: number;
}

export interface MapControl {
  type: ControlType;
  position: ControlPosition;
  visible: boolean;
  enabled: boolean;
}

export type ControlType = 
  | 'zoom'
  | 'fullscreen'
  | 'layers'
  | 'search'
  | 'reset'
  | 'legend'
  | 'export';

export type ControlPosition = 
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

export interface CoverageGap {
  id: string;
  polygon: Coordinates[];
  area: number; // in square kilometers
  population?: number;
  demandLevel: DemandLevel;
  nearestCoverage: NearestCoverage[];
  priority: GapPriority;
  identified: string;
}

export type DemandLevel = 
  | 'very_high'
  | 'high'
  | 'medium'
  | 'low'
  | 'minimal';

export interface NearestCoverage {
  contractorId: string;
  distance: number; // in kilometers
  canExtend: boolean;
  extensionCost?: number;
}

export type GapPriority = 
  | 'critical'
  | 'high'
  | 'medium'
  | 'low';

export interface HeatmapData {
  point: Coordinates;
  intensity: number;
  radius?: number;
  gradient?: GradientStop[];
}

export interface GradientStop {
  offset: number; // 0-1
  color: string; // hex or rgba
}

export interface MapViewport {
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  center: Coordinates;
  zoom: number;
}

export interface MapInteraction {
  type: InteractionType;
  coordinates: Coordinates;
  viewport: MapViewport;
  target?: any;
  timestamp: string;
}

export type InteractionType = 
  | 'click'
  | 'hover'
  | 'drag'
  | 'zoom'
  | 'pan'
  | 'select';

export interface CoverageStatistics {
  totalArea: number; // square kilometers
  coveredArea: number;
  coveragePercentage: number;
  totalContractors: number;
  activeContractors: number;
  preferredSuppliers: number;
  averageRadius: number;
  overlapAreas: number;
  gapAreas: number;
  byState: StateStatistics[];
  byType: TypeStatistics[];
}

export interface StateStatistics {
  state: string;
  contractors: number;
  coveragePercentage: number;
  population: number;
  populationCovered: number;
}

export interface TypeStatistics {
  type: CoverageType;
  count: number;
  percentage: number;
  averageRadius: number;
}

export interface MapExportOptions {
  format: ExportFormat;
  includeData: boolean;
  includeLegend: boolean;
  includeStatistics: boolean;
  resolution?: string;
  bounds?: MapViewport;
  layers?: string[];
}

export type ExportFormat = 
  | 'png'
  | 'pdf'
  | 'svg'
  | 'csv'
  | 'geojson'
  | 'kml';

export interface AdminMapData {
  contractor: {
    id: string;
    companyName: string;
    contactName: string;
    email: string;
    
    address: Address;
  };
  coverage: CoverageArea;
  performance: {
    responseTime: number;
    completionRate: number;
    customerSatisfaction: number;
    activeJobs: number;
    completedJobs: number;
  };
  financial: {
    revenue: number;
    outstanding: number;
    commissionRate: number;
  };
}

export interface PublicMapData {
  coverageAreas: {
    center: Coordinates;
    radius: number;
    type: CoverageType;
    isPreferred: boolean;
    hasCapacity: boolean;
  }[];
  gaps: {
    polygon: Coordinates[];
    priority: GapPriority;
  }[];
  statistics: {
    nationalCoverage: number;
    activeProviders: number;
    serviceTypes: string[];
  };
}

export interface MapSearchResult {
  type: 'address' | 'suburb' | 'postcode' | 'city';
  name: string;
  coordinates: Coordinates;
  coverageStatus: 'covered' | 'partial' | 'not_covered';
  nearestProviders: number;
  estimatedResponseTime?: number;
}

export interface MapLegend {
  title: string;
  items: LegendItem[];
  position: ControlPosition;
  collapsed: boolean;
}

export interface LegendItem {
  label: string;
  color?: string;
  icon?: string;
  shape?: 'circle' | 'square' | 'line';
  description?: string;
}

export interface MapCluster {
  id: string;
  center: Coordinates;
  count: number;
  bounds: MapViewport;
  points: Coordinates[];
  expanded: boolean;
}

export interface TerritoryBoundary {
  id: string;
  name: string;
  type: 'state' | 'region' | 'metro' | 'rural';
  polygon: Coordinates[];
  contractors: number;
  coverage: number; // percentage
  population?: number;
}

export interface MapAnimation {
  type: AnimationType;
  duration: number;
  easing: 'linear' | 'ease-in' | 'ease-out' | 'ease-in-out';
  from: any;
  to: any;
  onComplete?: () => void;
}

export type AnimationType = 
  | 'zoom'
  | 'pan'
  | 'fade'
  | 'pulse'
  | 'grow';

export interface MobileMapConfig {
  enableGestures: boolean;
  showCompass: boolean;
  showScale: boolean;
  showMyLocation: boolean;
  maxZoom: number;
  minZoom: number;
  tiltEnabled: boolean;
  rotateEnabled: boolean;
}
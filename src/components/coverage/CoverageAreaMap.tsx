'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Map as MapIcon, 
  Layers, 
  ZoomIn,
  ZoomOut,
  Maximize,
  Search,
  Download,
  Info,
  Eye,
  EyeOff,
  Navigation,
  Target,
  AlertCircle
} from 'lucide-react';
import { 
  CoverageArea,
  MapConfiguration,
  MapViewport,
  CoverageStatistics,
  MapSearchResult,
  Coordinates,
  CoverageType,
  MapStyle
} from '@/types/coverage-map';

interface MapProps {
  isAdmin?: boolean;
  initialCenter?: Coordinates;
  initialZoom?: number;
}

const CoverageAreaMap: React.FC<MapProps> = ({ 
  isAdmin = false,
  initialCenter = { lat: -25.2744, lng: 133.7751 }, // Australia center
  initialZoom = 5
}) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapConfig, setMapConfig] = useState<MapConfiguration>({
    center: initialCenter,
    zoom: initialZoom,
    minZoom: 4,
    maxZoom: 18,
    style: 'standard',
    layers: [
      { id: 'coverage', type: 'coverage_circles', visible: true, opacity: 0.4, zIndex: 1 },
      { id: 'heatmap', type: 'heatmap', visible: false, opacity: 0.6, zIndex: 2 },
      { id: 'gaps', type: 'gaps', visible: true, opacity: 0.3, zIndex: 0 }
    ],
    controls: [],
    interactive: true,
    showLabels: true,
    showBoundaries: true
  });

  const [coverageAreas, setCoverageAreas] = useState<CoverageArea[]>([]);
  const [selectedArea, setSelectedArea] = useState<CoverageArea | null>(null);
  const [viewport, setViewport] = useState<MapViewport>({
    bounds: { north: -10, south: -45, east: 154, west: 113 },
    center: initialCenter,
    zoom: initialZoom
  });
  const [statistics, setStatistics] = useState<CoverageStatistics | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MapSearchResult[]>([]);
  const [showLegend, setShowLegend] = useState(true);
  const [showStatistics, setShowStatistics] = useState(false);
  const [mapStyle, setMapStyle] = useState<MapStyle>('standard');
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    loadCoverageData();
    loadStatistics();
  }, [isAdmin]);

  const loadCoverageData = () => {
    // Mock coverage data
    const mockCoverage: CoverageArea[] = [
      {
        id: 'CA001',
        contractorId: 'C001',
        companyName: isAdmin ? 'Elite Restoration Co' : undefined,
        centerPoint: { lat: -33.8688, lng: 151.2093 }, // Sydney
        businessAddress: isAdmin ? {
          street: '123 Main St',
          suburb: 'Sydney',
          state: 'NSW',
          postcode: '2000',
          country: 'Australia'
        } : undefined,
        radius: 50,
        radiusType: '50km',
        coverageType: 'premium',
        isPreferred: true,
        status: 'active',
        activityVolume: 85,
        leadCount: 45,
        lastUpdated: new Date().toISOString(),
        metadata: {
          serviceTypes: ['water_damage', 'fire_damage', 'storm_damage'],
          responseTime: 30,
          capacityUtilization: 65,
          qualityScore: 92
        }
      },
      {
        id: 'CA002',
        contractorId: 'C002',
        companyName: isAdmin ? 'Rapid Response Team' : undefined,
        centerPoint: { lat: -37.8136, lng: 144.9631 }, // Melbourne
        businessAddress: isAdmin ? {
          suburb: 'Melbourne',
          state: 'VIC',
          postcode: '3000',
          country: 'Australia'
        } : undefined,
        radius: 75,
        radiusType: '75km',
        coverageType: 'standard',
        isPreferred: false,
        status: 'active',
        activityVolume: 60,
        leadCount: 32,
        lastUpdated: new Date().toISOString(),
        metadata: {
          serviceTypes: ['water_damage', 'mold_remediation'],
          responseTime: 45,
          capacityUtilization: 80,
          qualityScore: 88
        }
      },
      {
        id: 'CA003',
        contractorId: 'C003',
        companyName: isAdmin ? 'Brisbane Disaster Services' : undefined,
        centerPoint: { lat: -27.4698, lng: 153.0251 }, // Brisbane
        businessAddress: isAdmin ? {
          suburb: 'Brisbane',
          state: 'QLD',
          postcode: '4000',
          country: 'Australia'
        } : undefined,
        radius: 100,
        radiusType: '100km',
        coverageType: 'specialist',
        isPreferred: true,
        status: 'active',
        activityVolume: 70,
        leadCount: 38,
        lastUpdated: new Date().toISOString(),
        metadata: {
          serviceTypes: ['storm_damage', 'reconstruction'],
          responseTime: 40,
          capacityUtilization: 55,
          qualityScore: 94
        }
      },
      {
        id: 'CA004',
        contractorId: 'C004',
        companyName: isAdmin ? 'Perth Emergency Response' : undefined,
        centerPoint: { lat: -31.9505, lng: 115.8605 }, // Perth
        businessAddress: isAdmin ? {
          suburb: 'Perth',
          state: 'WA',
          postcode: '6000',
          country: 'Australia'
        } : undefined,
        radius: 50,
        radiusType: '50km',
        coverageType: 'emergency',
        isPreferred: false,
        status: 'active',
        activityVolume: 45,
        leadCount: 20,
        lastUpdated: new Date().toISOString(),
        metadata: {
          serviceTypes: ['emergency_response', 'water_damage'],
          responseTime: 25,
          capacityUtilization: 40,
          qualityScore: 90
        }
      },
      {
        id: 'CA005',
        contractorId: 'C005',
        companyName: isAdmin ? 'Adelaide Restoration Pros' : undefined,
        centerPoint: { lat: -34.9285, lng: 138.6007 }, // Adelaide
        businessAddress: isAdmin ? {
          suburb: 'Adelaide',
          state: 'SA',
          postcode: '5000',
          country: 'Australia'
        } : undefined,
        radius: 25,
        radiusType: '25km',
        coverageType: 'standard',
        isPreferred: false,
        status: 'paused',
        activityVolume: 0,
        leadCount: 0,
        lastUpdated: new Date().toISOString(),
        metadata: {
          serviceTypes: ['water_damage', 'fire_damage'],
          responseTime: 35,
          capacityUtilization: 0,
          qualityScore: 85
        }
      }
    ];

    setCoverageAreas(mockCoverage);
  };

  const loadStatistics = () => {
    // Mock statistics
    const mockStats: CoverageStatistics = {
      totalArea: 7692024, // Australia's area in sq km
      coveredArea: 1250000,
      coveragePercentage: 16.3,
      totalContractors: 45,
      activeContractors: 42,
      preferredSuppliers: 12,
      averageRadius: 62.5,
      overlapAreas: 8,
      gapAreas: 15,
      byState: [
        { state: 'NSW', contractors: 12, coveragePercentage: 35, population: 8166000, populationCovered: 2858100 },
        { state: 'VIC', contractors: 10, coveragePercentage: 40, population: 6681000, populationCovered: 2672400 },
        { state: 'QLD', contractors: 8, coveragePercentage: 25, population: 5185000, populationCovered: 1296250 },
        { state: 'WA', contractors: 6, coveragePercentage: 15, population: 2667000, populationCovered: 400050 },
        { state: 'SA', contractors: 4, coveragePercentage: 20, population: 1771000, populationCovered: 354200 },
        { state: 'TAS', contractors: 3, coveragePercentage: 30, population: 541000, populationCovered: 162300 },
        { state: 'ACT', contractors: 1, coveragePercentage: 90, population: 431000, populationCovered: 387900 },
        { state: 'NT', contractors: 1, coveragePercentage: 5, population: 246000, populationCovered: 12300 }
      ],
      byType: [
        { type: 'standard', count: 20, percentage: 44.4, averageRadius: 50 },
        { type: 'premium', count: 12, percentage: 26.7, averageRadius: 75 },
        { type: 'specialist', count: 8, percentage: 17.8, averageRadius: 100 },
        { type: 'emergency', count: 5, percentage: 11.1, averageRadius: 40 }
      ]
    };

    setStatistics(mockStats);
  };

  const handleSearch = (query: string) => {
    if (!query) {
      setSearchResults([]);
      return;
    }

    // Mock search results
    const mockResults: MapSearchResult[] = [
      {
        type: 'suburb',
        name: 'Parramatta, NSW',
        coordinates: { lat: -33.8151, lng: 151.0011 },
        coverageStatus: 'covered',
        nearestProviders: 3,
        estimatedResponseTime: 25
      },
      {
        type: 'postcode',
        name: '2000 - Sydney CBD',
        coordinates: { lat: -33.8688, lng: 151.2093 },
        coverageStatus: 'covered',
        nearestProviders: 5,
        estimatedResponseTime: 20
      }
    ];

    setSearchResults(mockResults.filter(r => 
      r.name.toLowerCase().includes(query.toLowerCase())
    ));
  };

  const handleZoom = (direction: 'in' | 'out') => {
    const newZoom = direction === 'in' 
      ? Math.min(viewport.zoom + 1, mapConfig.maxZoom)
      : Math.max(viewport.zoom - 1, mapConfig.minZoom);
    
    setViewport({ ...viewport, zoom: newZoom });
    setMapConfig({ ...mapConfig, zoom: newZoom });
  };

  const toggleLayer = (layerId: string) => {
    setMapConfig({
      ...mapConfig,
      layers: mapConfig.layers.map(layer =>
        layer.id === layerId ? { ...layer, visible: !layer.visible } : layer
      )
    });
  };

  const getCoverageColor = (type: CoverageType, isPreferred: boolean) => {
    const baseColors = {
      standard: '#3B82F6', // blue
      premium: '#8B5CF6', // purple
      specialist: '#F59E0B', // amber
      emergency: '#EF4444', // red
      all_services: '#10B981' // green
    };

    const color = baseColors[type] || '#6B7280';
    return isPreferred ? color : color + '80'; // Add transparency for non-preferred
  };

  const resetView = () => {
    setViewport({
      bounds: { north: -10, south: -45, east: 154, west: 113 },
      center: { lat: -25.2744, lng: 133.7751 },
      zoom: 5
    });
    setMapConfig({ ...mapConfig, center: { lat: -25.2744, lng: 133.7751 }, zoom: 5 });
  };

  const exportMap = () => {
    // Mock export functionality
    alert('Map export functionality would be implemented here');
  };

  return (
    <div className={`relative ${isFullscreen ? 'fixed inset-0 z-50' : 'h-[600px]'} bg-gray-100`}>
      {/* Map Container */}
      <div ref={mapRef} className="absolute inset-0 bg-blue-50">
        {/* Simulated Map - In production, integrate with Google Maps/Mapbox */}
        <div className="relative w-full h-full overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-blue-100 to-blue-200">
            {/* Australia Outline (simplified) */}
            <svg viewBox="0 0 800 600" className="absolute inset-0 w-full h-full">
              <path
                d="M 300 200 Q 400 180 500 200 L 550 250 L 580 320 L 550 380 L 480 420 L 400 430 L 320 410 L 280 350 L 270 280 Z"
                fill="#E5E7EB"
                stroke="#9CA3AF"
                strokeWidth="2"
              />
            </svg>

            {/* Coverage Circles */}
            {coverageAreas.filter(area => area.status === 'active').map((area) => {
              const scale = viewport.zoom / 10;
              const radius = area.radius * scale;
              
              // Convert lat/lng to approximate screen position
              const x = ((area.centerPoint.lng - 113) / 41) * 800;
              const y = ((area.centerPoint.lat + 45) / 35) * 600;

              return (
                <div key={area.id}>
                  {/* Coverage Circle */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    <circle
                      cx={x}
                      cy={600 - y}
                      r={radius}
                      fill={getCoverageColor(area.coverageType, area.isPreferred)}
                      fillOpacity={0.3}
                      stroke={getCoverageColor(area.coverageType, area.isPreferred)}
                      strokeWidth={area.isPreferred ? 3 : 1}
                      strokeOpacity={0.8}
                      className="transition-all duration-300"
                    />
                    {/* Center Marker */}
                    <circle
                      cx={x}
                      cy={600 - y}
                      r={4}
                      fill={getCoverageColor(area.coverageType, area.isPreferred)}
                      className="cursor-pointer"
                      onClick={() => setSelectedArea(area)}
                    />
                  </svg>
                </div>
              );
            })}

            {/* Gap Areas (Mock) */}
            {mapConfig.layers.find(l => l.id === 'gaps')?.visible && (
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <rect
                  x={450}
                  y={250}
                  width={80}
                  height={60}
                  fill="#DC2626"
                  fillOpacity={0.2}
                  stroke="#DC2626"
                  strokeWidth={1}
                  strokeDasharray="5,5"
                />
                <rect
                  x={220}
                  y={350}
                  width={60}
                  height={50}
                  fill="#DC2626"
                  fillOpacity={0.2}
                  stroke="#DC2626"
                  strokeWidth={1}
                  strokeDasharray="5,5"
                />
              </svg>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="absolute top-4 left-4 right-4 z-10 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search suburb, postcode, or city..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              handleSearch(e.target.value);
            }}
            className="w-full pl-10 pr-4 py-2 bg-white rounded-lg shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
            {searchResults.map((result, index) => (
              <div
                key={index}
                className="px-4 py-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                onClick={() => {
                  setViewport({
                    ...viewport,
                    center: result.coordinates,
                    zoom: 10
                  });
                  setSearchQuery('');
                  setSearchResults([]);
                }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{result.name}</p>
                    <p className="text-sm text-gray-600">{result.type}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      result.coverageStatus === 'covered' 
                        ? 'bg-green-100 text-green-800'
                        : result.coverageStatus === 'partial'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {result.coverageStatus}
                    </span>
                    {result.estimatedResponseTime && (
                      <p className="text-xs text-gray-500 mt-1">~{result.estimatedResponseTime}min</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Map Controls */}
      <div className="absolute right-4 top-20 z-10 space-y-2">
        <button
          onClick={() => handleZoom('in')}
          className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50"
          title="Zoom In"
        >
          <ZoomIn className="h-5 w-5" />
        </button>
        <button
          onClick={() => handleZoom('out')}
          className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50"
          title="Zoom Out"
        >
          <ZoomOut className="h-5 w-5" />
        </button>
        <button
          onClick={resetView}
          className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50"
          title="Reset View"
        >
          <Target className="h-5 w-5" />
        </button>
        <button
          onClick={() => setIsFullscreen(!isFullscreen)}
          className="p-2 bg-white rounded-lg shadow-lg hover:bg-gray-50"
          title="Fullscreen"
        >
          <Maximize className="h-5 w-5" />
        </button>
      </div>

      {/* Layer Controls */}
      <div className="absolute left-4 bottom-4 z-10">
        <div className="bg-white rounded-lg shadow-lg p-3 space-y-2">
          <h4 className="text-sm font-medium mb-2">Layers</h4>
          {mapConfig.layers.map((layer) => (
            <label key={layer.id} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                checked={layer.visible}
                onChange={() => toggleLayer(layer.id)}
                className="rounded text-blue-600"
              />
              <span className="text-sm capitalize">{layer.type.replace('_', ' ')}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="absolute right-4 bottom-4 z-10">
          <div className="bg-white rounded-lg shadow-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium">Legend</h4>
              <button
                onClick={() => setShowLegend(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <EyeOff className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-blue-500 opacity-60" />
                <span className="text-xs">Standard Coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-purple-500 opacity-60" />
                <span className="text-xs">Premium Coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-blue-600 opacity-60" />
                <span className="text-xs">Specialist Coverage</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full bg-red-500 opacity-60" />
                <span className="text-xs">Emergency Response</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded-full border-2 border-gray-400" />
                <span className="text-xs">Preferred Supplier</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-200 border border-red-400 border-dashed" />
                <span className="text-xs">Coverage Gap</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statistics Panel */}
      {showStatistics && statistics && (
        <div className="absolute top-20 right-4 z-10 w-80">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Coverage Statistics</h4>
              <button
                onClick={() => setShowStatistics(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <EyeOff className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500">National Coverage</p>
                  <p className="text-lg font-semibold">{statistics.coveragePercentage.toFixed(1)}%</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Active Contractors</p>
                  <p className="text-lg font-semibold">{statistics.activeContractors}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Preferred Suppliers</p>
                  <p className="text-lg font-semibold">{statistics.preferredSuppliers}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Coverage Gaps</p>
                  <p className="text-lg font-semibold">{statistics.gapAreas}</p>
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-500 mb-2">Coverage by State</p>
                {statistics.byState.slice(0, 4).map((state) => (
                  <div key={state.state} className="flex items-center justify-between text-sm mb-1">
                    <span>{state.state}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">{state.contractors} contractors</span>
                      <span className="font-medium">{state.coveragePercentage}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Selected Area Details (Admin Only) */}
      {isAdmin && selectedArea && (
        <div className="absolute top-20 left-4 z-10 w-80">
          <div className="bg-white rounded-lg shadow-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium">Coverage Details</h4>
              <button
                onClick={() => setSelectedArea(null)}
                className="text-gray-400 hover:text-gray-600"
              >
                <EyeOff className="h-4 w-4" />
              </button>
            </div>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500">Company</p>
                <p className="font-medium">{selectedArea.companyName}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-gray-500">Radius</p>
                  <p className="font-medium">{selectedArea.radiusType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Type</p>
                  <p className="font-medium capitalize">{selectedArea.coverageType}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Status</p>
                  <span className={`px-2 py-1 text-xs rounded-full ${
                    selectedArea.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedArea.status}
                  </span>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Lead Count</p>
                  <p className="font-medium">{selectedArea.leadCount}</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-500">Service Types</p>
                <div className="flex flex-wrap gap-1 mt-1">
                  {selectedArea.metadata.serviceTypes.map((type) => (
                    <span key={type} className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                      {type.replace('_', ' ')}
                    </span>
                  ))}
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-xs text-gray-500">Response</p>
                    <p className="text-sm font-medium">{selectedArea.metadata.responseTime}min</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Capacity</p>
                    <p className="text-sm font-medium">{selectedArea.metadata.capacityUtilization}%</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Quality</p>
                    <p className="text-sm font-medium">{selectedArea.metadata.qualityScore}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-white rounded-lg shadow-lg px-4 py-2 flex items-center space-x-3">
          <button
            onClick={() => setShowLegend(!showLegend)}
            className={`p-2 rounded hover:bg-gray-100 ${showLegend ? 'bg-gray-100' : ''}`}
            title="Toggle Legend"
          >
            <Info className="h-4 w-4" />
          </button>
          <button
            onClick={() => setShowStatistics(!showStatistics)}
            className={`p-2 rounded hover:bg-gray-100 ${showStatistics ? 'bg-gray-100' : ''}`}
            title="Toggle Statistics"
          >
            <Layers className="h-4 w-4" />
          </button>
          <div className="border-l pl-3">
            <select
              value={mapStyle}
              onChange={(e) => setMapStyle(e.target.value as MapStyle)}
              className="text-sm border-0 focus:outline-none"
            >
              <option value="standard">Standard</option>
              <option value="satellite">Satellite</option>
              <option value="terrain">Terrain</option>
            </select>
          </div>
          {isAdmin && (
            <>
              <div className="border-l pl-3">
                <button
                  onClick={exportMap}
                  className="p-2 rounded hover:bg-gray-100"
                  title="Export Map"
                >
                  <Download className="h-4 w-4" />
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Coverage Indicator */}
      {!isAdmin && (
        <div className="absolute top-4 right-4 z-10">
          <div className="bg-white rounded-lg shadow-lg px-3 py-2">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-medium">{statistics?.activeContractors || 0} Active Providers</span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Controls */}
      <div className="absolute bottom-20 right-4 z-10 md:hidden">
        <button
          className="p-3 bg-white rounded-full shadow-lg"
          onClick={() => {
            // Get user location
            navigator.geolocation.getCurrentPosition((position) => {
              setViewport({
                ...viewport,
                center: {
                  lat: position.coords.latitude,
                  lng: position.coords.longitude
                },
                zoom: 12
              });
            });
          }}
        >
          <Navigation className="h-5 w-5 text-blue-600" />
        </button>
      </div>
    </div>
  );
};

export default CoverageAreaMap;
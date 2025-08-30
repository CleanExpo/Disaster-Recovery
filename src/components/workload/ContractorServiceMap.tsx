'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Map, MapPin, Navigation, Layers, ZoomIn, ZoomOut, Maximize2,
  User, Building2, Circle, Target, Activity, Filter, Info,
  Clock, TrendingUp, Award, AlertTriangle, Settings, RefreshCw
} from 'lucide-react';
import type { 
  Contractor, 
  ServiceArea, 
  Lead,
  Coordinates,
  EligibleContractor
} from '@/types/workload-distribution';

interface ContractorServiceMapProps {
  lead?: Lead;
  contractors: Contractor[];
  onContractorSelect?: (contractor: Contractor) => void;
  className?: string;
}

const ContractorServiceMap: React.FC<ContractorServiceMapProps> = ({
  lead,
  contractors,
  onContractorSelect,
  className = ''
}) => {
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [mapCenter, setMapCenter] = useState<Coordinates>({ lat: 40.7128, lng: -74.0060 });
  const [mapZoom, setMapZoom] = useState(10);
  const [showOverlaps, setShowOverlaps] = useState(true);
  const [showLabels, setShowLabels] = useState(true);
  const [eligibleContractors, setEligibleContractors] = useState<EligibleContractor[]>([]);
  const [hoveredContractor, setHoveredContractor] = useState<string | null>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lead) {
      setMapCenter(lead.jobLocation.coordinates);
      calculateEligibleContractors();
    }
    setLoading(false);
  }, [lead, contractors]);

  const calculateEligibleContractors = () => {
    if (!lead) return;

    const eligible: EligibleContractor[] = contractors
      .filter(contractor => {
        // Check if contractor's service area covers the lead location
        const distance = calculateDistance(
          contractor.serviceArea.centerPoint,
          lead.jobLocation.coordinates
        );
        return distance <= contractor.serviceArea.maxRadius && 
               contractor.availability === 'available';
      })
      .map(contractor => {
        const distance = calculateDistance(
          contractor.serviceArea.centerPoint,
          lead.jobLocation.coordinates
        );
        const drivingTime = estimateDrivingTime(distance);
        
        return {
          contractorId: contractor.id,
          companyName: contractor.companyName,
          distance,
          drivingTime,
          kpiScore: contractor.kpiScore.overallScore,
          capacity: contractor.capacity.maxActiveJobs - contractor.capacity.currentActiveJobs,
          leadSharePercentage: contractor.leadStatistics.leadSharePercentage,
          score: {
            contractorId: contractor.id,
            baseScore: 100,
            kpiBonus: contractor.kpiScore.bonusMultiplier * 100 - 100,
            proximityBonus: Math.max(0, 10 - (distance * 0.5)),
            loadBalancingAdjustment: 0,
            finalScore: 0,
            rank: 0
          },
          eligibilityReason: `Within ${contractor.serviceArea.maxRadius} mile service radius`
        };
      });

    // Calculate final scores and rankings
    eligible.forEach(ec => {
      ec.score.finalScore = ec.score.baseScore + ec.score.kpiBonus + ec.score.proximityBonus;
    });

    eligible.sort((a, b) => b.score.finalScore - a.score.finalScore);
    eligible.forEach((ec, index) => {
      ec.score.rank = index + 1;
    });

    setEligibleContractors(eligible);
  };

  const calculateDistance = (point1: Coordinates, point2: Coordinates): number => {
    // Haversine formula for calculating distance between two points
    const R = 3959; // Earth's radius in miles
    const dLat = toRad(point2.lat - point1.lat);
    const dLon = toRad(point2.lng - point1.lng);
    const a = 
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(point1.lat)) * Math.cos(toRad(point2.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (deg: number): number => deg * (Math.PI / 180);

  const estimateDrivingTime = (distance: number): number => {
    // Rough estimate: 30 mph average speed
    return Math.round(distance * 2); // minutes
  };

  const getContractorColor = (contractor: Contractor, index: number): string => {
    const colours = [
      '#3B82F6', // blue
      '#10B981', // green
      '#F59E0B', // amber
      '#EF4444', // red
      '#8B5CF6', // purple
      '#EC4899', // pink
      '#06B6D4', // cyan
      '#84CC16', // lime
    ];
    return colours[index % colours.length];
  };

  const MapView = () => (
    <div className="relative w-full h-96 bg-gray-100 rounded-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
        {/* Map placeholder - in production, integrate with Google Maps or Mapbox */}
        <svg className="w-full h-full">
          {/* Draw service areas */}
          {contractors.map((contractor, index) => (
            <g key={contractor.id}>
              <circle
                cx={`${50 + (contractor.serviceArea.centerPoint.lng - mapCenter.lng) * mapZoom}%`}
                cy={`${50 - (contractor.serviceArea.centerPoint.lat - mapCenter.lat) * mapZoom}%`}
                r={`${contractor.serviceArea.primaryRadius * mapZoom}%`}
                fill={getContractorColor(contractor, index)}
                fillOpacity={hoveredContractor === contractor.id ? 0.3 : 0.15}
                stroke={getContractorColor(contractor, index)}
                strokeWidth="2"
                strokeDasharray={contractor.availability !== 'available' ? '5,5' : '0'}
                className="cursor-pointer transition-all duration-200"
                onMouseEnter={() => setHoveredContractor(contractor.id)}
                onMouseLeave={() => setHoveredContractor(null)}
                onClick={() => {
                  setSelectedContractor(contractor);
                  onContractorSelect?.(contractor);
                }}
              />
              
              {/* Max radius */}
              {showOverlaps && contractor.serviceArea.maxRadius > contractor.serviceArea.primaryRadius && (
                <circle
                  cx={`${50 + (contractor.serviceArea.centerPoint.lng - mapCenter.lng) * mapZoom}%`}
                  cy={`${50 - (contractor.serviceArea.centerPoint.lat - mapCenter.lat) * mapZoom}%`}
                  r={`${contractor.serviceArea.maxRadius * mapZoom}%`}
                  fill="none"
                  stroke={getContractorColor(contractor, index)}
                  strokeWidth="1"
                  strokeDasharray="2,2"
                  opacity="0.5"
                />
              )}
              
              {/* Contractor location pin */}
              <g
                transform={`translate(
                  ${50 + (contractor.serviceArea.centerPoint.lng - mapCenter.lng) * mapZoom}%,
                  ${50 - (contractor.serviceArea.centerPoint.lat - mapCenter.lat) * mapZoom}%
                )`}
              >
                <circle
                  r="8"
                  fill={getContractorColor(contractor, index)}
                  stroke="white"
                  strokeWidth="2"
                />
                {showLabels && (
                  <text
                    x="12"
                    y="4"
                    fill={getContractorColor(contractor, index)}
                    fontSize="12"
                    fontWeight="600"
                  >
                    {contractor.companyName.substring(0, 15)}
                  </text>
                )}
              </g>
            </g>
          ))}
          
          {/* Lead location */}
          {lead && (
            <g
              transform={`translate(${50}%, ${50}%)`}
            >
              <circle
                r="10"
                fill="#DC2626"
                stroke="white"
                strokeWidth="3"
                className="animate-pulse"
              />
              <text
                x="0"
                y="0"
                fill="white"
                fontSize="12"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                JOB
              </text>
            </g>
          )}
        </svg>
      </div>

      {/* Map controls */}
      <div className="absolute top-4 right-4 flex flex-col space-y-2">
        <button
          onClick={() => setMapZoom(prev => Math.min(prev + 2, 20))}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
        >
          <ZoomIn className="w-4 h-4" />
        </button>
        <button
          onClick={() => setMapZoom(prev => Math.max(prev - 2, 5))}
          className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50"
        >
          <ZoomOut className="w-4 h-4" />
        </button>
        <button className="p-2 bg-white rounded-lg shadow-md hover:bg-gray-50">
          <Maximize2 className="w-4 h-4" />
        </button>
      </div>

      {/* Map options */}
      <div className="absolute bottom-4 left-4 flex space-x-2">
        <button
          onClick={() => setShowOverlaps(!showOverlaps)}
          className={`flex items-centre px-3 py-2 bg-white rounded-lg shadow-md text-sm ${
            showOverlaps ? 'bg-blue-50 text-blue-600' : ''
          }`}
        >
          <Layers className="w-4 h-4 mr-1" />
          Overlaps
        </button>
        <button
          onClick={() => setShowLabels(!showLabels)}
          className={`flex items-centre px-3 py-2 bg-white rounded-lg shadow-md text-sm ${
            showLabels ? 'bg-blue-50 text-blue-600' : ''
          }`}
        >
          <Info className="w-4 h-4 mr-1" />
          Labels
        </button>
      </div>

      {/* Legend */}
      <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-3">
        <h4 className="text-xs font-semibold text-gray-700 mb-2">Legend</h4>
        <div className="space-y-1">
          <div className="flex items-centre space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full opacity-30"></div>
            <span className="text-xs text-gray-600">Service Area</span>
          </div>
          <div className="flex items-centre space-x-2">
            <div className="w-3 h-3 border-2 border-blue-500 rounded-full border-dashed"></div>
            <span className="text-xs text-gray-600">Max Radius</span>
          </div>
          <div className="flex items-centre space-x-2">
            <div className="w-3 h-3 bg-red-600 rounded-full"></div>
            <span className="text-xs text-gray-600">Job Location</span>
          </div>
        </div>
      </div>
    </div>
  );

  const ContractorList = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Eligible Contractors {lead && `(${eligibleContractors.length})`}
      </h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {eligibleContractors.length === 0 ? (
          <div className="text-centre py-8 text-gray-500">
            <MapPin className="w-12 h-12 mx-auto mb-3 text-gray-300" />
            <p>No eligible contractors for this location</p>
          </div>
        ) : (
          eligibleContractors.map((ec, index) => {
            const contractor = contractors.find(c => c.id === ec.contractorId);
            if (!contractor) return null;

            return (
              <div
                key={ec.contractorId}
                className={`p-3 border rounded-lg cursor-pointer transition-all ${
                  selectedContractor?.id === ec.contractorId
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => {
                  setSelectedContractor(contractor);
                  onContractorSelect?.(contractor);
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    <div
                      className="w-10 h-10 rounded-full flex items-centre justify-centre text-white font-bold"
                      style={{ backgroundColor: getContractorColor(contractor, index) }}
                    >
                      {ec.score.rank}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{ec.companyName}</h4>
                      <div className="flex items-centre space-x-4 mt-1 text-sm text-gray-600">
                        <span className="flex items-centre">
                          <Navigation className="w-3 h-3 mr-1" />
                          {ec.distance.toFixed(1)} mi
                        </span>
                        <span className="flex items-centre">
                          <Clock className="w-3 h-3 mr-1" />
                          ~{ec.drivingTime} min
                        </span>
                        <span className="flex items-centre">
                          <Activity className="w-3 h-3 mr-1" />
                          {ec.capacity} slots
                        </span>
                      </div>
                      
                      {/* Score breakdown */}
                      <div className="mt-2 flex items-centre space-x-2">
                        <div className="flex items-centre text-xs">
                          <div className="px-2 py-1 bg-gray-100 rounded">
                            Base: {ec.score.baseScore}
                          </div>
                          {ec.score.kpiBonus > 0 && (
                            <div className="px-2 py-1 bg-green-100 text-green-700 rounded ml-1">
                              +{ec.score.kpiBonus.toFixed(0)} KPI
                            </div>
                          )}
                          {ec.score.proximityBonus > 0 && (
                            <div className="px-2 py-1 bg-blue-100 text-blue-700 rounded ml-1">
                              +{ec.score.proximityBonus.toFixed(0)} Proximity
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="text-lg font-bold text-gray-900">
                      {ec.score.finalScore.toFixed(0)}
                    </div>
                    <div className="text-xs text-gray-600">Score</div>
                  </div>
                </div>
                
                {/* KPI indicators */}
                <div className="flex items-centre justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-centre space-x-3 text-xs">
                    <div className="flex items-centre">
                      <TrendingUp className="w-3 h-3 mr-1 text-green-600" />
                      <span>{ec.kpiScore}% KPI</span>
                    </div>
                    <div className="flex items-centre">
                      <Award className="w-3 h-3 mr-1 text-yellow-600" />
                      <span>{contractor.leadStatistics.acceptanceRate}% Accept</span>
                    </div>
                    <div className="flex items-centre">
                      <User className="w-3 h-3 mr-1 text-blue-600" />
                      <span>{ec.leadSharePercentage}% Share</span>
                    </div>
                  </div>
                  
                  {contractor.availability !== 'available' && (
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs">
                      {contractor.availability}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );

  const SelectedContractorDetails = () => {
    if (!selectedContractor) return null;

    return (
      <div className="bg-white rounded-lg border border-blue-200 p-4 mt-4">
        <div className="flex items-centre justify-between mb-4">
          <h4 className="font-semibold text-gray-900">Selected Contractor</h4>
          <button
            onClick={() => setSelectedContractor(null)}
            className="text-gray-400 hover:text-gray-600"
          >
            ×
          </button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-600">Company</p>
            <p className="font-medium">{selectedContractor.companyName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Contact</p>
            <p className="font-medium">{selectedContractor.contactName}</p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Response Time</p>
            <p className="font-medium">
              {selectedContractor.serviceArea.responseTime.emergency} min (Emergency)
            </p>
          </div>
          <div>
            <p className="text-xs text-gray-600">Capacity</p>
            <p className="font-medium">
              {selectedContractor.capacity.currentActiveJobs}/{selectedContractor.capacity.maxActiveJobs} Active
            </p>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex items-centre justify-between">
            <div className="flex items-centre space-x-4">
              <div className="text-centre">
                <p className="text-2xl font-bold text-blue-600">
                  {selectedContractor.kpiScore.overallScore}%
                </p>
                <p className="text-xs text-gray-600">KPI Score</p>
              </div>
              <div className="text-centre">
                <p className="text-2xl font-bold text-green-600">
                  {selectedContractor.leadStatistics.totalLeadsAccepted}
                </p>
                <p className="text-xs text-gray-600">Jobs Completed</p>
              </div>
              <div className="text-centre">
                <p className="text-2xl font-bold text-yellow-600">
                  {selectedContractor.leadStatistics.acceptanceRate}%
                </p>
                <p className="text-xs text-gray-600">Accept Rate</p>
              </div>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Assign Lead
            </button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-96 bg-gray-200 rounded-lg"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
            <div className="lg:col-span-2 h-64 bg-gray-200 rounded-lg"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-centre justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Contractor Service Coverage</h2>
          <p className="text-gray-600 mt-1">
            {lead 
              ? `Showing contractors available for ${lead.jobLocation.city}, ${lead.jobLocation.state}`
              : 'Interactive map showing contractor service areas'}
          </p>
        </div>
        <div className="flex items-centre space-x-2">
          <button className="flex items-centre px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </button>
          <button 
            onClick={calculateEligibleContractors}
            className="flex items-centre px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </button>
        </div>
      </div>

      <MapView />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ContractorList />
        </div>
        <div>
          {lead && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Details</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-600">Location</p>
                  <p className="font-medium">{lead.jobLocation.address}</p>
                  <p className="text-sm text-gray-600">
                    {lead.jobLocation.city}, {lead.jobLocation.state} {lead.jobLocation.zipCode}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Service Type</p>
                  <p className="font-medium capitalize">
                    {lead.jobDetails.serviceType.replace('_', ' ')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600">Priority</p>
                  <span className={`inline-flex items-centre px-2 py-1 rounded-full text-xs font-medium ${
                    lead.priority === 'critical' ? 'bg-red-100 text-red-800' :
                    lead.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                    lead.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {lead.priority}
                  </span>
                </div>
                {lead.estimatedValue && (
                  <div>
                    <p className="text-xs text-gray-600">Estimated Value</p>
                    <p className="font-medium">
                      ${lead.estimatedValue.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {selectedContractor && <SelectedContractorDetails />}
    </div>
  );
};

export default ContractorServiceMap;
'use client';

import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  Navigation, 
  Clock, 
  Truck,
  Route,
  Target,
  Activity,
  Gauge,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';
import { Contractor, Lead, Coordinates, EligibleContractor } from '@/types/workload-distribution';

interface ProximityCalculation {
  contractorId: string;
  companyName: string;
  distance: number;
  drivingTime: number;
  responseScore: number;
  isWithinPrimaryRadius: boolean;
  isWithinMaxRadius: boolean;
  proximityRank: number;
  etaMinutes: number;
  routeComplexity: 'simple' | 'moderate' | 'complex';
  trafficCondition: 'light' | 'moderate' | 'heavy';
}

interface RouteOptimization {
  primaryRoute: {
    distance: number;
    time: number;
    via: string[];
  };
  alternativeRoutes: {
    distance: number;
    time: number;
    via: string[];
  }[];
  weatherImpact: number;
  constructionDelays: number;
}

const GeographicProximityCalculator: React.FC = () => {
  const [lead, setLead] = useState<Lead | null>(null);
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [proximityCalculations, setProximityCalculations] = useState<ProximityCalculation[]>([]);
  const [selectedContractor, setSelectedContractor] = useState<string | null>(null);
  const [routeOptimization, setRouteOptimization] = useState<RouteOptimization | null>(null);
  const [calculationMode, setCalculationMode] = useState<'straight' | 'driving' | 'traffic'>('driving');
  const [maxRadius, setMaxRadius] = useState<number>(50);
  const [priorityFactors, setPriorityFactors] = useState({
    distance: 0.4,
    responseTime: 0.3,
    kpiScore: 0.2,
    capacity: 0.1
  });

  useEffect(() => {
    loadMockData();
  }, []);

  const loadMockData = () => {
    // Mock lead data
    const mockLead: Lead = {
      id: 'L001',
      customerInfo: {
        name: 'John Smith',
        phone: '555-0123',
        preferredContact: 'phone'
      },
      jobLocation: {
        address: '123 Main St',
        city: 'Houston',
        state: 'TX',
        zipCode: '77001',
        coordinates: { lat: 29.7604, lng: -95.3698 },
        propertyType: 'residential'
      },
      jobDetails: {
        serviceType: 'water_damage',
        description: 'Basement flooding from pipe burst',
        urgency: 'emergency'
      },
      priority: 'critical',
      status: 'pending_assignment',
      timeline: {
        createdAt: new Date().toISOString(),
        responseDeadline: new Date(Date.now() + 2 * 60 * 60 * 1000).toISOString()
      },
      requirements: {},
      metadata: {
        source: 'emergency_hotline'
      }
    };

    // Mock contractors with varying distances
    const mockContractors: Contractor[] = [
      {
        id: 'C001',
        companyName: 'Quick Response Restoration',
        contactName: 'Mike Johnson',
        email: 'mike@quickresponse.com',
        phone: '555-1001',
        address: {
          street: '456 Oak Ave',
          city: 'Houston',
          state: 'TX',
          zipCode: '77002',
          coordinates: { lat: 29.7589, lng: -95.3677 }
        },
        serviceArea: {
          id: 'SA001',
          contractorId: 'C001',
          primaryRadius: 15,
          maxRadius: 30,
          centerPoint: { lat: 29.7589, lng: -95.3677 },
          serviceTypes: ['water_damage', 'fire_damage'],
          responseTime: {
            emergency: 30,
            standard: 120
          }
        },
        availability: 'available',
        capacity: {
          maxActiveJobs: 10,
          currentActiveJobs: 3,
          maxWeeklyJobs: 40,
          currentWeeklyJobs: 12,
          maxMonthlyJobs: 150,
          currentMonthlyJobs: 45,
          utilizationRate: 30,
          teamSize: 8,
          equipmentCapacity: 90
        },
        kpiScore: {
          overallScore: 92,
          responseTime: { value: 95, weight: 0.25, benchmark: 30, performance: 'excellent', trend: 'up' },
          completionTime: { value: 90, weight: 0.2, benchmark: 24, performance: 'good', trend: 'stable' },
          customerSatisfaction: { value: 93, weight: 0.25, benchmark: 85, performance: 'excellent', trend: 'up' },
          reportQuality: { value: 88, weight: 0.15, benchmark: 80, performance: 'good', trend: 'up' },
          communicationScore: { value: 91, weight: 0.1, benchmark: 85, performance: 'excellent', trend: 'stable' },
          complianceScore: { value: 94, weight: 0.05, benchmark: 90, performance: 'excellent', trend: 'stable' },
          lastUpdated: new Date().toISOString(),
          trend: 'improving',
          bonusMultiplier: 1.15
        },
        leadStatistics: {
          totalLeadsReceived: 150,
          totalLeadsAccepted: 135,
          totalLeadsDeclined: 15,
          acceptanceRate: 90,
          averageResponseTime: 25,
          conversionRate: 85,
          currentMonthLeads: 12,
          leadSharePercentage: 18,
          historicalData: []
        },
        preferences: {
          preferredJobTypes: ['water_damage', 'fire_damage'],
          autoAcceptLeads: true,
          preferredSchedule: {
            daysOfWeek: [1, 2, 3, 4, 5],
            startTime: '08:00',
            endTime: '18:00'
          },
          notificationChannels: ['email', 'sms', 'push']
        },
        status: 'active',
        certifications: ['IICRC', 'EPA RRP', 'OSHA 30'],
        specializations: ['water_damage', 'fire_damage', 'mold_remediation'],
        metadata: {
          joinedDate: '2020-01-15',
          lastActiveDate: new Date().toISOString(),
          totalJobsCompleted: 450,
          totalRevenue: 1250000,
          averageJobValue: 2778
        }
      },
      {
        id: 'C002',
        companyName: 'Premier Restoration Services',
        contactName: 'Sarah Davis',
        email: 'sarah@premierrestore.com',
        phone: '555-1002',
        address: {
          street: '789 Pine Rd',
          city: 'Houston',
          state: 'TX',
          zipCode: '77008',
          coordinates: { lat: 29.8028, lng: -95.4100 }
        },
        serviceArea: {
          id: 'SA002',
          contractorId: 'C002',
          primaryRadius: 20,
          maxRadius: 40,
          centerPoint: { lat: 29.8028, lng: -95.4100 },
          serviceTypes: ['water_damage', 'mold_remediation'],
          responseTime: {
            emergency: 45,
            standard: 180
          }
        },
        availability: 'available',
        capacity: {
          maxActiveJobs: 15,
          currentActiveJobs: 8,
          maxWeeklyJobs: 50,
          currentWeeklyJobs: 22,
          maxMonthlyJobs: 200,
          currentMonthlyJobs: 88,
          utilizationRate: 44,
          teamSize: 12,
          equipmentCapacity: 85
        },
        kpiScore: {
          overallScore: 88,
          responseTime: { value: 85, weight: 0.25, benchmark: 30, performance: 'good', trend: 'stable' },
          completionTime: { value: 87, weight: 0.2, benchmark: 24, performance: 'good', trend: 'up' },
          customerSatisfaction: { value: 90, weight: 0.25, benchmark: 85, performance: 'excellent', trend: 'up' },
          reportQuality: { value: 86, weight: 0.15, benchmark: 80, performance: 'good', trend: 'stable' },
          communicationScore: { value: 89, weight: 0.1, benchmark: 85, performance: 'good', trend: 'up' },
          complianceScore: { value: 91, weight: 0.05, benchmark: 90, performance: 'excellent', trend: 'stable' },
          lastUpdated: new Date().toISOString(),
          trend: 'stable',
          bonusMultiplier: 1.10
        },
        leadStatistics: {
          totalLeadsReceived: 180,
          totalLeadsAccepted: 150,
          totalLeadsDeclined: 30,
          acceptanceRate: 83,
          averageResponseTime: 38,
          conversionRate: 80,
          currentMonthLeads: 22,
          leadSharePercentage: 22,
          historicalData: []
        },
        preferences: {
          preferredJobTypes: ['water_damage', 'mold_remediation'],
          autoAcceptLeads: false,
          preferredSchedule: {
            daysOfWeek: [1, 2, 3, 4, 5, 6],
            startTime: '07:00',
            endTime: '19:00'
          },
          notificationChannels: ['email', 'phone']
        },
        status: 'active',
        certifications: ['IICRC', 'BBB A+'],
        specializations: ['water_damage', 'mold_remediation'],
        metadata: {
          joinedDate: '2019-06-01',
          lastActiveDate: new Date().toISOString(),
          totalJobsCompleted: 620,
          totalRevenue: 1850000,
          averageJobValue: 2984
        }
      }
    ];

    setLead(mockLead);
    setContractors(mockContractors);
    calculateProximity(mockLead, mockContractors);
  };

  const calculateDistance = (point1: Coordinates, point2: Coordinates): number => {
    // Haversine formula for calculating distance between two points
    const R = 3959; // Earth's radius in miles
    const dLat = (point2.lat - point1.lat) * Math.PI / 180;
    const dLon = (point2.lng - point1.lng) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(point1.lat * Math.PI / 180) * Math.cos(point2.lat * Math.PI / 180) *
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  const estimateDrivingTime = (distance: number, urgency: string): number => {
    // Estimate driving time based on distance and traffic conditions
    let averageSpeed = 35; // mph in city conditions
    
    if (urgency === 'emergency') {
      averageSpeed = 45; // Emergency response with traffic clearing
    } else if (distance > 20) {
      averageSpeed = 50; // Highway speeds for longer distances
    }

    const baseTime = (distance / averageSpeed) * 60; // Convert to minutes
    
    // Add traffic factor
    const hour = new Date().getHours();
    let trafficMultiplier = 1;
    if ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) {
      trafficMultiplier = 1.5; // Rush hour
    } else if (hour >= 10 && hour <= 16) {
      trafficMultiplier = 1.2; // Daytime traffic
    }

    return Math.round(baseTime * trafficMultiplier);
  };

  const calculateProximity = (lead: Lead, contractors: Contractor[]) => {
    const calculations: ProximityCalculation[] = contractors.map((contractor, index) => {
      const distance = calculateDistance(
        lead.jobLocation.coordinates,
        contractor.address.coordinates
      );
      
      const drivingTime = estimateDrivingTime(distance, lead.jobDetails.urgency || 'standard');
      
      // Calculate response score based on multiple factors
      const distanceScore = Math.max(0, 100 - (distance * 2));
      const timeScore = Math.max(0, 100 - drivingTime);
      const kpiBonus = contractor.kpiScore.overallScore * 0.5;
      
      const responseScore = (distanceScore * 0.4) + (timeScore * 0.4) + (kpiBonus * 0.2);

      const routeComplexity = distance < 10 ? 'simple' : distance < 25 ? 'moderate' : 'complex';
      const hour = new Date().getHours();
      const trafficCondition = ((hour >= 7 && hour <= 9) || (hour >= 17 && hour <= 19)) ? 'heavy' :
                               (hour >= 10 && hour <= 16) ? 'moderate' : 'light';

      return {
        contractorId: contractor.id,
        companyName: contractor.companyName,
        distance: Math.round(distance * 10) / 10,
        drivingTime,
        responseScore: Math.round(responseScore),
        isWithinPrimaryRadius: distance <= contractor.serviceArea.primaryRadius,
        isWithinMaxRadius: distance <= contractor.serviceArea.maxRadius,
        proximityRank: 0,
        etaMinutes: drivingTime + 10, // Add preparation time
        routeComplexity,
        trafficCondition
      };
    });

    // Sort by response score and assign ranks
    calculations.sort((a, b) => b.responseScore - a.responseScore);
    calculations.forEach((calc, index) => {
      calc.proximityRank = index + 1;
    });

    setProximityCalculations(calculations);
  };

  const generateRouteOptimization = (contractorId: string) => {
    const contractor = contractors.find(c => c.id === contractorId);
    if (!contractor || !lead) return;

    const distance = calculateDistance(
      lead.jobLocation.coordinates,
      contractor.address.coordinates
    );

    const optimisation: RouteOptimization = {
      primaryRoute: {
        distance: Math.round(distance * 10) / 10,
        time: estimateDrivingTime(distance, lead.jobDetails.urgency || 'standard'),
        via: ['I-45 N', 'US-59', 'Local roads']
      },
      alternativeRoutes: [
        {
          distance: Math.round((distance * 1.1) * 10) / 10,
          time: estimateDrivingTime(distance * 1.1, lead.jobDetails.urgency || 'standard'),
          via: ['I-610 Loop', 'I-10 W', 'Local roads']
        },
        {
          distance: Math.round((distance * 1.15) * 10) / 10,
          time: estimateDrivingTime(distance * 1.15, lead.jobDetails.urgency || 'standard'),
          via: ['Surface streets only']
        }
      ],
      weatherImpact: Math.random() > 0.7 ? 5 : 0, // Random weather delay
      constructionDelays: Math.random() > 0.8 ? 10 : 0 // Random construction
    };

    setRouteOptimization(optimisation);
    setSelectedContractor(contractorId);
  };

  const getProximityBadge = (calc: ProximityCalculation) => {
    if (calc.isWithinPrimaryRadius) {
      return { colour: 'bg-green-100 text-green-800', text: 'Primary Zone' };
    } else if (calc.isWithinMaxRadius) {
      return { colour: 'bg-yellow-100 text-yellow-800', text: 'Extended Zone' };
    } else {
      return { colour: 'bg-red-100 text-red-800', text: 'Out of Range' };
    }
  };

  const getResponseTimeBadge = (minutes: number) => {
    if (minutes <= 30) {
      return { colour: 'bg-green-100 text-green-800', icon: CheckCircle, text: 'Rapid' };
    } else if (minutes <= 60) {
      return { colour: 'bg-blue-100 text-blue-800', icon: Clock, text: 'Standard' };
    } else {
      return { colour: 'bg-orange-100 text-orange-800', icon: AlertTriangle, text: 'Delayed' };
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Navigation className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Geographic Proximity Calculator</h2>
              <p className="text-sm text-gray-500">Distance-based contractor ranking and route optimisation</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={calculationMode}
              onChange={(e) => setCalculationMode(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="straight">Straight Line</option>
              <option value="driving">Driving Distance</option>
              <option value="traffic">With Traffic</option>
            </select>
            <input
              type="number"
              value={maxRadius}
              onChange={(e) => setMaxRadius(parseInt(e.target.value))}
              className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              placeholder="Max radius"
            />
            <span className="text-sm text-gray-500">miles</span>
          </div>
        </div>

        {/* Lead Information */}
        {lead && (
          <div className="bg-gray-50 rounded-lg p-4">
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-xs text-gray-500">Job Location</p>
                <p className="text-sm font-medium">{lead.jobLocation.address}, {lead.jobLocation.city}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Service Type</p>
                <p className="text-sm font-medium capitalize">{lead.jobDetails.serviceType.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Urgency</p>
                <p className="text-sm font-medium capitalize">{lead.jobDetails.urgency}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Proximity Calculations */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-blue-600" />
          Contractor Proximity Analysis
        </h3>

        <div className="space-y-4">
          {proximityCalculations.map((calc) => {
            const badge = getProximityBadge(calc);
            const timeBadge = getResponseTimeBadge(calc.etaMinutes);
            
            return (
              <div
                key={calc.contractorId}
                className={`border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colours ${
                  selectedContractor === calc.contractorId ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => generateRouteOptimization(calc.contractorId)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                      <span className="text-lg font-semibold">#{calc.proximityRank}</span>
                    </div>
                    <div>
                      <p className="font-medium">{calc.companyName}</p>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-gray-500">
                          <MapPin className="h-3 w-3 inline mr-1" />
                          {calc.distance} miles
                        </span>
                        <span className="text-sm text-gray-500">
                          <Clock className="h-3 w-3 inline mr-1" />
                          {calc.drivingTime} min drive
                        </span>
                        <span className="text-sm text-gray-500">
                          <Truck className="h-3 w-3 inline mr-1" />
                          ETA: {calc.etaMinutes} min
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="text-right">
                      <p className="text-sm text-gray-500">Response Score</p>
                      <p className="text-2xl font-semibold text-blue-600">{calc.responseScore}</p>
                    </div>
                    <div className="flex flex-col space-y-1">
                      <span className={`px-2 py-1 text-xs rounded-full ${badge.colour}`}>
                        {badge.text}
                      </span>
                      <span className={`px-2 py-1 text-xs rounded-full flex items-center ${timeBadge.colour}`}>
                        <timeBadge.icon className="h-3 w-3 mr-1" />
                        {timeBadge.text}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Traffic and Route Info */}
                <div className="mt-3 pt-3 border-t grid grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Activity className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Traffic: <span className="font-medium capitalize">{calc.trafficCondition}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Route className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Route: <span className="font-medium capitalize">{calc.routeComplexity}</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Gauge className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      Zone: <span className="font-medium">{calc.isWithinPrimaryRadius ? 'Primary' : calc.isWithinMaxRadius ? 'Secondary' : 'Extended'}</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Route Optimisation Details */}
      {routeOptimization && selectedContractor && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Route className="h-5 w-5 mr-2 text-green-600" />
            Route Optimisation Details
          </h3>

          <div className="space-y-4">
            {/* Primary Route */}
            <div className="border-l-4 border-green-500 pl-4">
              <h4 className="font-medium text-green-700">Primary Route (Recommended)</h4>
              <div className="mt-2 grid grid-cols-3 gap-4">
                <div>
                  <p className="text-xs text-gray-500">Distance</p>
                  <p className="text-sm font-medium">{routeOptimization.primaryRoute.distance} miles</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Estimated Time</p>
                  <p className="text-sm font-medium">{routeOptimization.primaryRoute.time} minutes</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Via</p>
                  <p className="text-sm">{routeOptimization.primaryRoute.via.join(' → ')}</p>
                </div>
              </div>
            </div>

            {/* Alternative Routes */}
            <div>
              <h4 className="font-medium text-gray-700 mb-2">Alternative Routes</h4>
              {routeOptimization.alternativeRoutes.map((route, index) => (
                <div key={index} className="border-l-4 border-gray-300 pl-4 mb-2">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Distance</p>
                      <p className="text-sm">{route.distance} miles</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Time</p>
                      <p className="text-sm">{route.time} minutes</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Via</p>
                      <p className="text-sm text-gray-600">{route.via.join(' → ')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Additional Factors */}
            {(routeOptimization.weatherImpact > 0 || routeOptimization.constructionDelays > 0) && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <h4 className="font-medium text-yellow-800 mb-2">Route Advisories</h4>
                {routeOptimization.weatherImpact > 0 && (
                  <p className="text-sm text-yellow-700">
                    ⚠️ Weather conditions may add {routeOptimization.weatherImpact} minutes
                  </p>
                )}
                {routeOptimization.constructionDelays > 0 && (
                  <p className="text-sm text-yellow-700">
                    🚧 Construction zones may add {routeOptimization.constructionDelays} minutes
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Weighting Factors */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Target className="h-5 w-5 mr-2 text-purple-600" />
          Proximity Scoring Weights
        </h3>

        <div className="grid grid-cols-4 gap-4">
          {Object.entries(priorityFactors).map(([factor, weight]) => (
            <div key={factor} className="space-y-2">
              <label className="text-sm font-medium capitalize">{factor.replace('_', ' ')}</label>
              <input
                type="range"
                min="0"
                max="100"
                value={weight * 100}
                onChange={(e) => setPriorityFactors({
                  ...priorityFactors,
                  [factor]: parseInt(e.target.value) / 100
                })}
                className="w-full"
              />
              <p className="text-center text-sm text-gray-600">{Math.round(weight * 100)}%</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeographicProximityCalculator;
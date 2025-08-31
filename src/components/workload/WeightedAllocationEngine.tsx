'use client';

import React, { useState, useEffect } from 'react';
import { 
  Calculator, 
  Shuffle, 
  TrendingUp,
  BarChart3,
  Target,
  Users,
  Zap,
  Info,
  Settings,
  RefreshCw,
  Award,
  Scale
} from 'lucide-react';
import { Contractor, Lead, EligibleContractor, AllocationScore, AllocationDecision } from '@/types/workload-distribution';

interface AllocationWeight {
  factor: string;
  description: string;
  weight: number;
  impact: 'low' | 'medium' | 'high';
  adjustable: boolean;
}

interface TransparencyReport {
  timestamp: string;
  leadId: string;
  method: string;
  winner: string;
  runnerUp: string;
  marginOfVictory: number;
  factorsAnalyzed: FactorAnalysis[];
  fairnessScore: number;
  confidence: number;
}

interface FactorAnalysis {
  factor: string;
  winner: { contractor: string; value: number; score: number };
  runnerUp: { contractor: string; value: number; score: number };
  weight: number;
  contribution: number;
}

interface SimulationResult {
  contractor: string;
  probability: number;
  averageScore: number;
  wins: number;
  scenarios: number;
}

const WeightedAllocationEngine: React.FC = () => {
  const [contractors, setContractors] = useState<Contractor[]>([]);
  const [currentLead, setCurrentLead] = useState<Lead | null>(null);
  const [eligibleContractors, setEligibleContractors] = useState<EligibleContractor[]>([]);
  const [allocationWeights, setAllocationWeights] = useState<AllocationWeight[]>([
    { factor: 'KPI Score', description: 'Overall performance rating', weight: 0.30, impact: 'high', adjustable: true },
    { factor: 'Proximity', description: 'Distance to job location', weight: 0.25, impact: 'high', adjustable: true },
    { factor: 'Capacity', description: 'Available job slots', weight: 0.20, impact: 'medium', adjustable: true },
    { factor: 'Lead Share', description: 'Fair distribution balance', weight: 0.15, impact: 'medium', adjustable: true },
    { factor: 'Specialisation', description: 'Service type expertise', weight: 0.10, impact: 'low', adjustable: true }
  ]);
  const [transparencyReport, setTransparencyReport] = useState<TransparencyReport | null>(null);
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([]);
  const [allocationMode, setAllocationMode] = useState<'weighted' | 'fair' | 'performance'>('weighted');
  const [showSimulation, setShowSimulation] = useState(false);

  useEffect(() => {
    loadMockData();
  }, []);

  useEffect(() => {
    if (currentLead && contractors.length > 0) {
      calculateEligibleContractors();
    }
  }, [currentLead, contractors, allocationWeights]);

  const loadMockData = () => {
    // Mock contractors
    const mockContractors: Contractor[] = [
      {
        id: 'C001',
        companyName: 'Elite Restoration Co',
        contactName: 'John Smith',
        email: 'john@eliterestore.com',
        
        address: {
          street: '123 Main St',
          city: 'Houston',
          state: 'TX',
          zipCode: '77001',
          coordinates: { lat: 29.7604, lng: -95.3698 }
        },
        serviceArea: {
          id: 'SA001',
          contractorId: 'C001',
          primaryRadius: 20,
          maxRadius: 40,
          centerPoint: { lat: 29.7604, lng: -95.3698 },
          serviceTypes: ['water_damage', 'fire_damage', 'mold_remediation'],
          responseTime: { emergency: 30, standard: 120 }
        },
        availability: 'available',
        capacity: {
          maxActiveJobs: 15,
          currentActiveJobs: 5,
          maxWeeklyJobs: 50,
          currentWeeklyJobs: 15,
          maxMonthlyJobs: 200,
          currentMonthlyJobs: 60,
          utilizationRate: 30,
          teamSize: 10,
          equipmentCapacity: 95
        },
        kpiScore: {
          overallScore: 94,
          responseTime: { value: 96, weight: 0.25, benchmark: 30, performance: 'excellent', trend: 'up' },
          completionTime: { value: 92, weight: 0.20, benchmark: 24, performance: 'excellent', trend: 'stable' },
          customerSatisfaction: { value: 95, weight: 0.25, benchmark: 85, performance: 'excellent', trend: 'up' },
          reportQuality: { value: 91, weight: 0.15, benchmark: 80, performance: 'excellent', trend: 'up' },
          communicationScore: { value: 93, weight: 0.10, benchmark: 85, performance: 'excellent', trend: 'stable' },
          complianceScore: { value: 96, weight: 0.05, benchmark: 90, performance: 'excellent', trend: 'stable' },
          lastUpdated: new Date().toISOString(),
          trend: 'improving',
          bonusMultiplier: 1.20
        },
        leadStatistics: {
          totalLeadsReceived: 180,
          totalLeadsAccepted: 165,
          totalLeadsDeclined: 15,
          acceptanceRate: 92,
          averageResponseTime: 22,
          conversionRate: 88,
          currentMonthLeads: 15,
          leadSharePercentage: 22,
          historicalData: []
        },
        preferences: {
          preferredJobTypes: ['water_damage', 'fire_damage'],
          autoAcceptLeads: true,
          preferredSchedule: { daysOfWeek: [1,2,3,4,5], startTime: '08:00', endTime: '18:00' },
          notificationChannels: ['email', 'sms', 'push']
        },
        status: 'active',
        certifications: ['IICRC', 'EPA RRP', 'OSHA 30'],
        specializations: ['water_damage', 'fire_damage', 'mold_remediation'],
        metadata: {
          joinedDate: '2019-01-15',
          lastActiveDate: new Date().toISOString(),
          totalJobsCompleted: 520,
          totalRevenue: 1560000,
          averageJobValue: 3000
        }
      },
      {
        id: 'C002',
        companyName: 'Rapid Response Restoration',
        contactName: 'Jane Doe',
        email: 'jane@rapidresponse.com',
        
        address: {
          street: '456 Oak Ave',
          city: 'Houston',
          state: 'TX',
          zipCode: '77002',
          coordinates: { lat: 29.7589, lng: -95.3677 }
        },
        serviceArea: {
          id: 'SA002',
          contractorId: 'C002',
          primaryRadius: 15,
          maxRadius: 30,
          centerPoint: { lat: 29.7589, lng: -95.3677 },
          serviceTypes: ['water_damage', 'storm_damage'],
          responseTime: { emergency: 25, standard: 90 }
        },
        availability: 'available',
        capacity: {
          maxActiveJobs: 12,
          currentActiveJobs: 8,
          maxWeeklyJobs: 40,
          currentWeeklyJobs: 28,
          maxMonthlyJobs: 150,
          currentMonthlyJobs: 105,
          utilizationRate: 70,
          teamSize: 8,
          equipmentCapacity: 80
        },
        kpiScore: {
          overallScore: 86,
          responseTime: { value: 88, weight: 0.25, benchmark: 30, performance: 'good', trend: 'stable' },
          completionTime: { value: 85, weight: 0.20, benchmark: 24, performance: 'good', trend: 'up' },
          customerSatisfaction: { value: 87, weight: 0.25, benchmark: 85, performance: 'good', trend: 'stable' },
          reportQuality: { value: 84, weight: 0.15, benchmark: 80, performance: 'good', trend: 'stable' },
          communicationScore: { value: 86, weight: 0.10, benchmark: 85, performance: 'good', trend: 'up' },
          complianceScore: { value: 88, weight: 0.05, benchmark: 90, performance: 'average', trend: 'stable' },
          lastUpdated: new Date().toISOString(),
          trend: 'stable',
          bonusMultiplier: 1.08
        },
        leadStatistics: {
          totalLeadsReceived: 200,
          totalLeadsAccepted: 160,
          totalLeadsDeclined: 40,
          acceptanceRate: 80,
          averageResponseTime: 28,
          conversionRate: 82,
          currentMonthLeads: 28,
          leadSharePercentage: 35,
          historicalData: []
        },
        preferences: {
          preferredJobTypes: ['water_damage', 'storm_damage'],
          autoAcceptLeads: false,
          preferredSchedule: { daysOfWeek: [1,2,3,4,5,6], startTime: '07:00', endTime: '19:00' },
          notificationChannels: ['email', 'email']
        },
        status: 'active',
        certifications: ['IICRC', 'BBB A+'],
        specializations: ['water_damage', 'storm_damage'],
        metadata: {
          joinedDate: '2020-03-01',
          lastActiveDate: new Date().toISOString(),
          totalJobsCompleted: 380,
          totalRevenue: 950000,
          averageJobValue: 2500
        }
      }
    ];

    // Mock lead
    const mockLead: Lead = {
      id: 'L001',
      customerInfo: {
        name: 'Robert Johnson',
        
        preferredContact: 'email'
      },
      jobLocation: {
        address: '789 Elm St',
        city: 'Houston',
        state: 'TX',
        zipCode: '77003',
        coordinates: { lat: 29.7490, lng: -95.3585 },
        propertyType: 'residential'
      },
      jobDetails: {
        serviceType: 'water_damage',
        description: 'Kitchen flooding from dishwasher leak',
        urgency: 'urgent'
      },
      priority: 'high',
      estimatedValue: 3500,
      status: 'pending_assignment',
      timeline: {
        createdAt: new Date().toISOString(),
        responseDeadline: new Date(Date.now() + 4 * 60 * 60 * 1000).toISOString()
      },
      requirements: {
        certifications: ['IICRC'],
        equipment: ['Water extraction', 'Dehumidifiers']
      },
      metadata: {
        source: 'insurance_partner'
      }
    };

    setContractors(mockContractors);
    setCurrentLead(mockLead);
  };

  const calculateDistance = (point1: any, point2: any): number => {
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

  const calculateEligibleContractors = () => {
    if (!currentLead) return;

    const eligible: EligibleContractor[] = contractors
      .filter(c => c.availability === 'available')
      .map(contractor => {
        const distance = calculateDistance(
          currentLead.jobLocation.coordinates,
          contractor.address.coordinates
        );

        const drivingTime = Math.round((distance / 35) * 60); // Assume 35 mph average

        // Calculate weighted score
        const kpiScore = contractor.kpiScore.overallScore;
        const proximityScore = Math.max(0, 100 - (distance * 2));
        const capacityScore = 100 - contractor.capacity.utilizationRate;
        const fairnessScore = 100 - (contractor.leadStatistics.leadSharePercentage * 2);
        const specializationScore = contractor.specializations.includes(currentLead.jobDetails.serviceType) ? 100 : 50;

        const weightedScore = 
          (kpiScore * allocationWeights[0].weight) +
          (proximityScore * allocationWeights[1].weight) +
          (capacityScore * allocationWeights[2].weight) +
          (fairnessScore * allocationWeights[3].weight) +
          (specializationScore * allocationWeights[4].weight);

        const allocationScore: AllocationScore = {
          contractorId: contractor.id,
          baseScore: kpiScore,
          kpiBonus: kpiScore * 0.1,
          proximityBonus: proximityScore * 0.1,
          loadBalancingAdjustment: fairnessScore * 0.05,
          finalScore: Math.round(weightedScore),
          rank: 0
        };

        return {
          contractorId: contractor.id,
          companyName: contractor.companyName,
          distance: Math.round(distance * 10) / 10,
          drivingTime,
          kpiScore,
          capacity: contractor.capacity.utilizationRate,
          leadSharePercentage: contractor.leadStatistics.leadSharePercentage,
          score: allocationScore,
          eligibilityReason: 'Meets all criteria'
        };
      });

    // Sort by final score and assign ranks
    eligible.sort((a, b) => b.score.finalScore - a.score.finalScore);
    eligible.forEach((ec, index) => {
      ec.score.rank = index + 1;
    });

    setEligibleContractors(eligible);
  };

  const runAllocation = () => {
    if (eligibleContractors.length === 0) return;

    const winner = eligibleContractors[0];
    const runnerUp = eligibleContractors[1];

    // Create transparency report
    const factorsAnalyzed: FactorAnalysis[] = allocationWeights.map((weight, index) => {
      const factors = ['kpiScore', 'distance', 'capacity', 'leadSharePercentage', 'specialisation'];
      const winnerValue = index === 0 ? winner.kpiScore :
                          index === 1 ? (100 - winner.distance * 2) :
                          index === 2 ? (100 - winner.capacity) :
                          index === 3 ? (100 - winner.leadSharePercentage * 2) :
                          100;
      
      const runnerUpValue = runnerUp ? (
        index === 0 ? runnerUp.kpiScore :
        index === 1 ? (100 - runnerUp.distance * 2) :
        index === 2 ? (100 - runnerUp.capacity) :
        index === 3 ? (100 - runnerUp.leadSharePercentage * 2) :
        50
      ) : 0;

      return {
        factor: weight.factor,
        winner: {
          contractor: winner.companyName,
          value: Math.round(winnerValue),
          score: Math.round(winnerValue * weight.weight)
        },
        runnerUp: {
          contractor: runnerUp?.companyName || 'N/A',
          value: Math.round(runnerUpValue),
          score: Math.round(runnerUpValue * weight.weight)
        },
        weight: weight.weight,
        contribution: Math.round(winnerValue * weight.weight)
      };
    });

    const report: TransparencyReport = {
      timestamp: new Date().toISOString(),
      leadId: currentLead?.id || '',
      method: allocationMode,
      winner: winner.companyName,
      runnerUp: runnerUp?.companyName || 'None',
      marginOfVictory: winner.score.finalScore - (runnerUp?.score.finalScore || 0),
      factorsAnalyzed,
      fairnessScore: calculateFairnessScore(),
      confidence: winner.score.finalScore / 100
    };

    setTransparencyReport(report);
  };

  const calculateFairnessScore = (): number => {
    const shares = contractors.map(c => c.leadStatistics.leadSharePercentage);
    const avgShare = shares.reduce((a, b) => a + b, 0) / shares.length;
    const variance = shares.reduce((sum, share) => sum + Math.pow(share - avgShare, 2), 0) / shares.length;
    const stdDev = Math.sqrt(variance);
    return Math.max(0, 100 - (stdDev * 2));
  };

  const runSimulation = () => {
    const simulations = 1000;
    const results: { [key: string]: SimulationResult } = {};

    // Initialize results
    eligibleContractors.forEach(ec => {
      results[ec.contractorId] = {
        contractor: ec.companyName,
        probability: 0,
        averageScore: 0,
        wins: 0,
        scenarios: simulations
      };
    });

    // Run simulations with random weight variations
    for (let i = 0; i < simulations; i++) {
      const simulatedWeights = allocationWeights.map(w => ({
        ...w,
        weight: w.weight + (Math.random() - 0.5) * 0.1
      }));

      // Normalize weights
      const totalWeight = simulatedWeights.reduce((sum, w) => sum + w.weight, 0);
      simulatedWeights.forEach(w => w.weight = w.weight / totalWeight);

      // Calculate scores with simulated weights
      const scores = eligibleContractors.map(ec => {
        const kpiScore = ec.kpiScore;
        const proximityScore = Math.max(0, 100 - (ec.distance * 2));
        const capacityScore = 100 - ec.capacity;
        const fairnessScore = 100 - (ec.leadSharePercentage * 2);
        const specializationScore = 100;

        const score = 
          (kpiScore * simulatedWeights[0].weight) +
          (proximityScore * simulatedWeights[1].weight) +
          (capacityScore * simulatedWeights[2].weight) +
          (fairnessScore * simulatedWeights[3].weight) +
          (specializationScore * simulatedWeights[4].weight);

        return { contractorId: ec.contractorId, score };
      });

      // Find winner
      const winner = scores.reduce((prev, current) => 
        current.score > prev.score ? current : prev
      );

      results[winner.contractorId].wins++;
      scores.forEach(s => {
        results[s.contractorId].averageScore += s.score;
      });
    }

    // Calculate final probabilities
    const finalResults = Object.values(results).map(r => ({
      ...r,
      probability: (r.wins / simulations) * 100,
      averageScore: r.averageScore / simulations
    }));

    setSimulationResults(finalResults.sort((a, b) => b.probability - a.probability));
    setShowSimulation(true);
  };

  const updateWeight = (index: number, newWeight: number) => {
    const updated = [...allocationWeights];
    updated[index].weight = newWeight;

    // Normalize weights to sum to 1
    const total = updated.reduce((sum, w) => sum + w.weight, 0);
    updated.forEach(w => w.weight = w.weight / total);

    setAllocationWeights(updated);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'text-red-600 bg-red-100';
      case 'medium': return 'text-yellow-600 bg-yellow-100';
      case 'low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <Calculator className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Weighted Allocation Engine</h2>
              <p className="text-sm text-gray-500">Transparent, fair lead distribution with configurable weights</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={allocationMode}
              onChange={(e) => setAllocationMode(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
            >
              <option value="weighted">Weighted Score</option>
              <option value="fair">Fair Share</option>
              <option value="performance">Performance Only</option>
            </select>
            <button
              onClick={runAllocation}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center space-x-2"
            >
              <Shuffle className="h-4 w-4" />
              <span>Run Allocation</span>
            </button>
            <button
              onClick={runSimulation}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center space-x-2"
            >
              <RefreshCw className="h-4 w-4" />
              <span>Simulate</span>
            </button>
          </div>
        </div>

        {/* Current Lead Info */}
        {currentLead && (
          <div className="bg-gray-50 rounded-lg p-4 grid grid-cols-4 gap-4">
            <div>
              <p className="text-xs text-gray-500">Lead ID</p>
              <p className="text-sm font-medium">{currentLead.id}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Service Type</p>
              <p className="text-sm font-medium capitalize">{currentLead.jobDetails.serviceType.replace('_', ' ')}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Priority</p>
              <p className="text-sm font-medium capitalize">{currentLead.priority}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Est. Value</p>
              <p className="text-sm font-medium">${currentLead.estimatedValue?.toLocaleString() || 'N/A'}</p>
            </div>
          </div>
        )}
      </div>

      {/* Allocation Weights Configuration */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Settings className="h-5 w-5 mr-2 text-gray-600" />
          Allocation Weight Configuration
        </h3>

        <div className="space-y-4">
          {allocationWeights.map((weight, index) => (
            <div key={weight.factor} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-3">
                  <h4 className="font-medium">{weight.factor}</h4>
                  <span className={`px-2 py-1 text-xs rounded-full ${getImpactColor(weight.impact)}`}>
                    {weight.impact} impact
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl font-semibold text-purple-600">
                    {Math.round(weight.weight * 100)}%
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-3">{weight.description}</p>
              {weight.adjustable && (
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="50"
                    value={weight.weight * 100}
                    onChange={(e) => updateWeight(index, parseInt(e.target.value) / 100)}
                    className="flex-1"
                  />
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updateWeight(index, Math.max(0, weight.weight - 0.05))}
                      className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      -5%
                    </button>
                    <button
                      onClick={() => updateWeight(index, Math.min(1, weight.weight + 0.05))}
                      className="px-2 py-1 bg-gray-100 rounded hover:bg-gray-200"
                    >
                      +5%
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Eligible Contractors Ranking */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <Users className="h-5 w-5 mr-2 text-blue-600" />
          Eligible Contractors Ranking
        </h3>

        <div className="space-y-3">
          {eligibleContractors.map((ec, index) => (
            <div
              key={ec.contractorId}
              className={`border rounded-lg p-4 ${
                index === 0 ? 'border-green-500 bg-green-50' : 'border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    index === 0 ? 'bg-green-500 text-white' : 'bg-gray-100'
                  }`}>
                    {index === 0 ? <Award className="h-5 w-5" /> : `#${ec.score.rank}`}
                  </div>
                  <div>
                    <p className="font-medium">{ec.companyName}</p>
                    <div className="flex items-center space-x-3 mt-1 text-sm text-gray-600">
                      <span>KPI: {ec.kpiScore}</span>
                      <span>Distance: {ec.distance} mi</span>
                      <span>Capacity: {100 - ec.capacity}% available</span>
                      <span>Share: {ec.leadSharePercentage}%</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold text-purple-600">{ec.score.finalScore}</p>
                  <p className="text-sm text-gray-500">Weighted Score</p>
                </div>
              </div>

              {/* Score Breakdown */}
              <div className="mt-3 pt-3 border-t grid grid-cols-5 gap-2">
                {allocationWeights.map((weight) => (
                  <div key={weight.factor} className="text-center">
                    <p className="text-xs text-gray-500">{weight.factor}</p>
                    <p className="text-sm font-medium">
                      {Math.round(
                        weight.factor === 'KPI Score' ? ec.kpiScore * weight.weight :
                        weight.factor === 'Proximity' ? Math.max(0, 100 - ec.distance * 2) * weight.weight :
                        weight.factor === 'Capacity' ? (100 - ec.capacity) * weight.weight :
                        weight.factor === 'Lead Share' ? (100 - ec.leadSharePercentage * 2) * weight.weight :
                        100 * weight.weight
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transparency Report */}
      {transparencyReport && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Info className="h-5 w-5 mr-2 text-blue-600" />
            Allocation Transparency Report
          </h3>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <h4 className="font-medium mb-3">Allocation Decision</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Winner:</span>
                  <span className="font-medium">{transparencyReport.winner}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Runner-up:</span>
                  <span className="font-medium">{transparencyReport.runnerUp}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Margin:</span>
                  <span className="font-medium">{transparencyReport.marginOfVictory} points</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Method:</span>
                  <span className="font-medium capitalize">{transparencyReport.method}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Confidence:</span>
                  <span className="font-medium">{Math.round(transparencyReport.confidence * 100)}%</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-3">Fairness Metrics</h4>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Fairness Score:</span>
                  <span className="font-medium">{Math.round(transparencyReport.fairnessScore)}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Timestamp:</span>
                  <span className="font-medium text-xs">
                    {new Date(transparencyReport.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Factor Analysis */}
          <div className="mt-6">
            <h4 className="font-medium mb-3">Factor-by-Factor Analysis</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Factor</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Weight</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Winner Score</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Runner-up Score</th>
                    <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Contribution</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {transparencyReport.factorsAnalyzed.map((factor) => (
                    <tr key={factor.factor}>
                      <td className="px-4 py-2 text-sm font-medium text-gray-900">{factor.factor}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{Math.round(factor.weight * 100)}%</td>
                      <td className="px-4 py-2 text-sm text-gray-900">{factor.winner.score}</td>
                      <td className="px-4 py-2 text-sm text-gray-500">{factor.runnerUp.score}</td>
                      <td className="px-4 py-2 text-sm font-medium text-purple-600">+{factor.contribution}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Simulation Results */}
      {showSimulation && simulationResults.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-green-600" />
            Allocation Simulation Results (1000 scenarios)
          </h3>

          <div className="space-y-3">
            {simulationResults.map((result, index) => (
              <div key={result.contractor} className="flex items-center space-x-4">
                <div className="w-32">
                  <p className="font-medium text-sm">{result.contractor}</p>
                </div>
                <div className="flex-1">
                  <div className="relative">
                    <div className="h-8 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${
                          index === 0 ? 'bg-green-500' : 'bg-blue-500'
                        } rounded-full transition-all duration-500`}
                        style={{ width: `${result.probability}%` }}
                      />
                    </div>
                    <span className="absolute right-2 top-1/2 transform -translate-y-1/2 text-sm font-medium">
                      {result.probability.toFixed(1)}%
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">Avg Score</p>
                  <p className="font-medium">{Math.round(result.averageScore)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 p-4 bg-blue-50 rounded-lg">
            <div className="flex items-start space-x-2">
              <Info className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm text-blue-900 font-medium">Simulation Analysis</p>
                <p className="text-sm text-blue-700 mt-1">
                  Based on 1000 simulations with ±10% weight variations, the allocation shows 
                  {simulationResults[0].probability > 70 ? ' strong consistency' : 
                   simulationResults[0].probability > 50 ? ' moderate consistency' : 
                   ' high variability'} in outcomes.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeightedAllocationEngine;
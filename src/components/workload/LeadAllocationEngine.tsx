'use client';

import React, { useState, useEffect } from 'react';
import {
  Shuffle, Target, Users, TrendingUp, Award, BarChart3, Clock,
  AlertCircle, CheckCircle, Info, Settings, Play, Pause, RefreshCw,
  Zap, Shield, Navigation, Activity, Filter, Download
} from 'lucide-react';
import type { 
  Lead, 
  Contractor,
  AllocationEvent,
  AllocationRule,
  AssignmentMethod,
  LoadBalancingConfig,
  EligibleContractor,
  AllocationScore
} from '@/types/workload-distribution';

interface LeadAllocationEngineProps {
  lead: Lead;
  contractors: Contractor[];
  rules?: AllocationRule[];
  config?: LoadBalancingConfig;
  onAllocation?: (event: AllocationEvent) => void;
  className?: string;
}

const LeadAllocationEngine: React.FC<LeadAllocationEngineProps> = ({
  lead,
  contractors,
  rules = [],
  config = {
    enabled: true,
    maxLeadSharePercentage: 40,
    evaluationPeriod: 'monthly',
    rebalanceThreshold: 10,
    saturationProtection: {
      enabled: true,
      maxCapacityUtilization: 80,
      cooldownPeriod: 30
    },
    fairnessWeight: 0.4,
    performanceWeight: 0.4,
    proximityWeight: 0.2
  },
  onAllocation,
  className = ''
}) => {
  const [allocationMethod, setAllocationMethod] = useState<AssignmentMethod>('weighted_random');
  const [eligibleContractors, setEligibleContractors] = useState<EligibleContractor[]>([]);
  const [selectedContractor, setSelectedContractor] = useState<Contractor | null>(null);
  const [allocationResult, setAllocationResult] = useState<AllocationEvent | null>(null);
  const [showDetails, setShowDetails] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [simulationMode, setSimulationMode] = useState(false);

  useEffect(() => {
    calculateEligibleContractors();
  }, [lead, contractors]);

  const calculateDistance = (point1: { lat: number; lng: number }, point2: { lat: number; lng: number }): number => {
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

  const calculateEligibleContractors = () => {
    const eligible: EligibleContractor[] = contractors
      .filter(contractor => {
        // Check availability
        if (contractor.availability !== 'available') return false;
        
        // Check capacity
        const utilizationRate = (contractor.capacity.currentActiveJobs / contractor.capacity.maxActiveJobs) * 100;
        if (config.saturationProtection.enabled && utilizationRate >= config.saturationProtection.maxCapacityUtilization) {
          return false;
        }
        
        // Check service area coverage
        const distance = calculateDistance(
          contractor.serviceArea.centerPoint,
          lead.jobLocation.coordinates
        );
        
        return distance <= contractor.serviceArea.maxRadius;
      })
      .map(contractor => {
        const distance = calculateDistance(
          contractor.serviceArea.centerPoint,
          lead.jobLocation.coordinates
        );
        
        // Calculate base score
        const baseScore = 100;
        
        // Calculate KPI bonus (capped at 15%)
        const kpiBonus = Math.min(15, (contractor.kpiScore.bonusMultiplier - 1) * 100);
        
        // Calculate proximity bonus (max 10%)
        const proximityBonus = Math.max(0, 10 * (1 - distance / contractor.serviceArea.maxRadius));
        
        // Calculate load balancing adjustment
        const currentSharePercentage = contractor.leadStatistics.leadSharePercentage;
        let loadBalancingAdjustment = 0;
        
        if (currentSharePercentage > config.maxLeadSharePercentage) {
          // Penalize contractors over the share cap
          loadBalancingAdjustment = -20;
        } else if (currentSharePercentage < config.maxLeadSharePercentage / 2) {
          // Boost contractors with low share
          loadBalancingAdjustment = 10;
        }
        
        // Calculate final weighted score
        const finalScore = 
          baseScore * config.fairnessWeight +
          (baseScore + kpiBonus) * config.performanceWeight +
          (baseScore + proximityBonus) * config.proximityWeight +
          loadBalancingAdjustment;
        
        return {
          contractorId: contractor.id,
          companyName: contractor.companyName,
          distance,
          drivingTime: Math.round(distance * 2), // Rough estimate
          kpiScore: contractor.kpiScore.overallScore,
          capacity: contractor.capacity.maxActiveJobs - contractor.capacity.currentActiveJobs,
          leadSharePercentage: currentSharePercentage,
          score: {
            contractorId: contractor.id,
            baseScore,
            kpiBonus,
            proximityBonus,
            loadBalancingAdjustment,
            finalScore,
            rank: 0
          },
          eligibilityReason: `Within service area, ${Math.round(utilizationRate)}% capacity utilized`
        } as EligibleContractor;
      });
    
    // Sort by final score and assign ranks
    eligible.sort((a, b) => b.score.finalScore - a.score.finalScore);
    eligible.forEach((ec, index) => {
      ec.score.rank = index + 1;
    });
    
    setEligibleContractors(eligible);
  };

  const allocateLead = async () => {
    setIsProcessing(true);
    
    try {
      let winner: EligibleContractor | null = null;
      let reasoning: string[] = [];
      
      switch (allocationMethod) {
        case 'round_robin':
          winner = allocateRoundRobin();
          reasoning.push('Round-robin allocation ensures equal distribution');
          break;
          
        case 'kpi_based':
          winner = allocateByKPI();
          reasoning.push('Allocated to highest performing contractor');
          break;
          
        case 'proximity_based':
          winner = allocateByProximity();
          reasoning.push('Allocated to closest contractor');
          break;
          
        case 'weighted_random':
        default:
          winner = allocateWeightedRandom();
          reasoning.push('Weighted random selection based on score');
          break;
      }
      
      if (!winner) {
        throw new Error('No eligible contractors found');
      }
      
      const allocationEvent: AllocationEvent = {
        id: `allocation_${Date.now()}`,
        leadId: lead.id,
        timestamp: new Date().toISOString(),
        eventType: 'lead_assigned',
        allocatedTo: winner.contractorId,
        allocationScore: winner.score,
        eligibleContractors: eligibleContractors,
        decision: {
          method: allocationMethod,
          winner: winner.contractorId,
          reasoning,
          alternates: eligibleContractors
            .filter(ec => ec.contractorId !== winner!.contractorId)
            .slice(0, 2)
            .map(ec => ec.contractorId),
          constraints: [
            `Max lead share: ${config.maxLeadSharePercentage}%`,
            `Max capacity utilization: ${config.saturationProtection.maxCapacityUtilization}%`
          ]
        },
        auditInfo: {
          performedBy: 'system',
          performedAt: new Date().toISOString(),
          ipAddress: '127.0.0.1',
          userAgent: navigator.userAgent,
          systemVersion: '1.0.0'
        }
      };
      
      setAllocationResult(allocationEvent);
      
      if (!simulationMode) {
        onAllocation?.(allocationEvent);
      }
      
      const selectedContractor = contractors.find(c => c.id === winner.contractorId);
      if (selectedContractor) {
        setSelectedContractor(selectedContractor);
      }
      
    } catch (error) {
      console.error('Allocation failed:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const allocateRoundRobin = (): EligibleContractor | null => {
    if (eligibleContractors.length === 0) return null;
    
    // Find contractor with oldest last lead assignment
    const sorted = [...eligibleContractors].sort((a, b) => {
      const contractorA = contractors.find(c => c.id === a.contractorId);
      const contractorB = contractors.find(c => c.id === b.contractorId);
      
      const lastLeadA = contractorA?.leadStatistics.lastLeadAssignedAt || '1970-01-01';
      const lastLeadB = contractorB?.leadStatistics.lastLeadAssignedAt || '1970-01-01';
      
      return new Date(lastLeadA).getTime() - new Date(lastLeadB).getTime();
    });
    
    return sorted[0];
  };

  const allocateByKPI = (): EligibleContractor | null => {
    if (eligibleContractors.length === 0) return null;
    
    // Already sorted by score which includes KPI
    return eligibleContractors[0];
  };

  const allocateByProximity = (): EligibleContractor | null => {
    if (eligibleContractors.length === 0) return null;
    
    const sorted = [...eligibleContractors].sort((a, b) => a.distance - b.distance);
    return sorted[0];
  };

  const allocateWeightedRandom = (): EligibleContractor | null => {
    if (eligibleContractors.length === 0) return null;
    
    // Calculate total weight
    const totalWeight = eligibleContractors.reduce((sum, ec) => sum + ec.score.finalScore, 0);
    
    // Generate random number
    const random = Math.random() * totalWeight;
    
    // Select contractor based on weighted probability
    let cumulative = 0;
    for (const contractor of eligibleContractors) {
      cumulative += contractor.score.finalScore;
      if (random <= cumulative) {
        return contractor;
      }
    }
    
    return eligibleContractors[0]; // Fallback
  };

  const AllocationMethodSelector = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Allocation Method</h3>
      
      <div className="grid grid-cols-2 gap-3">
        {[
          { value: 'weighted_random', label: 'Weighted Random', icon: <Shuffle className="w-4 h-4" />, description: 'Balanced fairness and performance' },
          { value: 'round_robin', label: 'Round Robin', icon: <RefreshCw className="w-4 h-4" />, description: 'Equal distribution' },
          { value: 'kpi_based', label: 'KPI Based', icon: <TrendingUp className="w-4 h-4" />, description: 'Highest performer wins' },
          { value: 'proximity_based', label: 'Proximity', icon: <Navigation className="w-4 h-4" />, description: 'Closest contractor wins' }
        ].map((method) => (
          <button
            key={method.value}
            onClick={() => setAllocationMethod(method.value as AssignmentMethod)}
            className={`p-3 border-2 rounded-lg text-left transition-all ${
              allocationMethod === method.value
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-centre space-x-2 mb-1">
              <div className={`p-1 rounded ${allocationMethod === method.value ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {method.icon}
              </div>
              <span className="font-medium text-gray-900">{method.label}</span>
            </div>
            <p className="text-xs text-gray-600">{method.description}</p>
          </button>
        ))}
      </div>
      
      <div className="mt-4 flex items-centre justify-between">
        <label className="flex items-centre">
          <input
            type="checkbox"
            checked={simulationMode}
            onChange={(e) => setSimulationMode(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Simulation Mode</span>
        </label>
        
        <button
          onClick={allocateLead}
          disabled={isProcessing || eligibleContractors.length === 0}
          className="flex items-centre px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
        >
          {isProcessing ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Allocate Lead
            </>
          )}
        </button>
      </div>
    </div>
  );

  const ConfigurationPanel = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-centre justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Allocation Configuration</h3>
        <button className="p-1 hover:bg-gray-100 rounded">
          <Settings className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      
      <div className="space-y-4">
        <div>
          <div className="flex items-centre justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Fairness Weight</label>
            <span className="text-sm text-gray-900">{(config.fairnessWeight * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={config.fairnessWeight * 100}
            className="w-full"
            disabled
          />
        </div>
        
        <div>
          <div className="flex items-centre justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Performance Weight</label>
            <span className="text-sm text-gray-900">{(config.performanceWeight * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={config.performanceWeight * 100}
            className="w-full"
            disabled
          />
        </div>
        
        <div>
          <div className="flex items-centre justify-between mb-2">
            <label className="text-sm font-medium text-gray-700">Proximity Weight</label>
            <span className="text-sm text-gray-900">{(config.proximityWeight * 100).toFixed(0)}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={config.proximityWeight * 100}
            className="w-full"
            disabled
          />
        </div>
        
        <div className="pt-4 border-t border-gray-200 space-y-2">
          <div className="flex items-centre justify-between text-sm">
            <span className="text-gray-600">Max Lead Share</span>
            <span className="font-medium">{config.maxLeadSharePercentage}%</span>
          </div>
          <div className="flex items-centre justify-between text-sm">
            <span className="text-gray-600">Max Capacity</span>
            <span className="font-medium">{config.saturationProtection.maxCapacityUtilization}%</span>
          </div>
          <div className="flex items-centre justify-between text-sm">
            <span className="text-gray-600">Cooldown Period</span>
            <span className="font-medium">{config.saturationProtection.cooldownPeriod} min</span>
          </div>
        </div>
      </div>
    </div>
  );

  const EligibleContractorsList = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        Eligible Contractors ({eligibleContractors.length})
      </h3>
      
      <div className="space-y-3 max-h-96 overflow-y-auto">
        {eligibleContractors.map((ec) => (
          <div
            key={ec.contractorId}
            className={`p-3 border rounded-lg ${
              selectedContractor?.id === ec.contractorId
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-centre justify-between">
              <div className="flex items-centre space-x-3">
                <div className="flex items-centre justify-centre w-8 h-8 bg-gray-100 rounded-full font-bold text-gray-700">
                  {ec.score.rank}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{ec.companyName}</p>
                  <div className="flex items-centre space-x-3 mt-1 text-xs text-gray-600">
                    <span>{ec.distance.toFixed(1)} mi</span>
                    <span>•</span>
                    <span>{ec.kpiScore}% KPI</span>
                    <span>•</span>
                    <span>{ec.leadSharePercentage}% share</span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-bold text-gray-900">{ec.score.finalScore.toFixed(0)}</p>
                <p className="text-xs text-gray-600">Score</p>
              </div>
            </div>
            
            {showDetails && (
              <div className="mt-3 pt-3 border-t border-gray-100">
                <div className="grid grid-cols-4 gap-2 text-xs">
                  <div>
                    <span className="text-gray-600">Base:</span>
                    <span className="ml-1 font-medium">{ec.score.baseScore}</span>
                  </div>
                  <div>
                    <span className="text-gray-600">KPI:</span>
                    <span className="ml-1 font-medium text-green-600">
                      +{ec.score.kpiBonus.toFixed(0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Proximity:</span>
                    <span className="ml-1 font-medium text-blue-600">
                      +{ec.score.proximityBonus.toFixed(0)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600">Balance:</span>
                    <span className={`ml-1 font-medium ${
                      ec.score.loadBalancingAdjustment >= 0 ? 'text-green-600' : 'text-red-600'
                    }`}>
                      {ec.score.loadBalancingAdjustment >= 0 ? '+' : ''}{ec.score.loadBalancingAdjustment}
                    </span>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-600">{ec.eligibilityReason}</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="w-full mt-3 text-sm text-blue-600 hover:text-blue-700"
      >
        {showDetails ? 'Hide' : 'Show'} Score Details
      </button>
    </div>
  );

  const AllocationResult = () => {
    if (!allocationResult) return null;
    
    return (
      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <div className="flex items-centre justify-between mb-4">
          <div className="flex items-centre space-x-2">
            <CheckCircle className="w-5 h-5 text-green-600" />
            <h3 className="font-semibold text-green-900">Lead Allocated Successfully</h3>
          </div>
          <button
            onClick={() => setAllocationResult(null)}
            className="text-green-600 hover:text-green-700"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-3">
          <div>
            <p className="text-sm text-green-700">Assigned To:</p>
            <p className="font-semibold text-green-900">
              {eligibleContractors.find(ec => ec.contractorId === allocationResult.allocatedTo)?.companyName}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-green-700">Assignment Method:</p>
            <p className="font-medium text-green-900 capitalize">
              {allocationResult.decision.method.replace('_', ' ')}
            </p>
          </div>
          
          <div>
            <p className="text-sm text-green-700 mb-1">Reasoning:</p>
            <ul className="space-y-1">
              {allocationResult.decision.reasoning.map((reason, index) => (
                <li key={index} className="text-sm text-green-800 flex items-start">
                  <span className="mr-2">•</span>
                  {reason}
                </li>
              ))}
            </ul>
          </div>
          
          {allocationResult.decision.alternates.length > 0 && (
            <div>
              <p className="text-sm text-green-700">Backup Contractors:</p>
              <div className="flex space-x-2 mt-1">
                {allocationResult.decision.alternates.map((altId, index) => {
                  const alt = eligibleContractors.find(ec => ec.contractorId === altId);
                  return (
                    <span key={altId} className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                      #{index + 2} {alt?.companyName}
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        
        <div className="mt-4 pt-4 border-t border-green-200 flex justify-between">
          <button className="text-sm text-green-600 hover:text-green-700">
            View Audit Log
          </button>
          <button className="flex items-centre px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
            <Download className="w-4 h-4 mr-1" />
            Export Report
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-centre justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">Lead Allocation Engine</h2>
          <p className="text-gray-600 mt-1">
            Fair and transparent lead assignment system
          </p>
        </div>
        <div className="flex items-centre space-x-2">
          <span className={`inline-flex items-centre px-3 py-1 rounded-full text-sm font-medium ${
            config.enabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {config.enabled ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
      
      {allocationResult && <AllocationResult />}
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <AllocationMethodSelector />
          <EligibleContractorsList />
        </div>
        
        <div>
          <ConfigurationPanel />
        </div>
      </div>
    </div>
  );
};

export default LeadAllocationEngine;
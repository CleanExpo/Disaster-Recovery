'use client';

import React, { useState, useEffect } from 'react';
import {
  Trophy, TrendingUp, TrendingDown, Award, Star, Medal, Target,
  Clock, Users, BarChart3, Activity, ArrowUp, ArrowDown, Minus,
  Filter, Download, Calendar, ChevronUp, ChevronDown, Info, Shield
} from 'lucide-react';
import type { 
  Contractor,
  ContractorPerformance,
  KPIScore,
  PerformanceBadge,
  PerformanceMetrics
} from '@/types/workload-distribution';

interface KPILeaderboardProps {
  contractors: Contractor[];
  overlappingArea?: string;
  timeframe?: 'daily' | 'weekly' | 'monthly' | 'quarterly';
  onContractorSelect?: (contractor: Contractor) => void;
  className?: string;
}

const KPILeaderboard: React.FC<KPILeaderboardProps> = ({
  contractors,
  overlappingArea,
  timeframe = 'monthly',
  onContractorSelect,
  className = ''
}) => {
  const [performances, setPerformances] = useState<ContractorPerformance[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<keyof KPIScore>('overallScore');
  const [showPrediction, setShowPrediction] = useState(false);
  const [expandedContractor, setExpandedContractor] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPerformanceData();
  }, [contractors, timeframe]);

  const loadPerformanceData = async () => {
    setLoading(true);
    try {
      // Mock performance data - replace with actual API call
      const mockPerformances: ContractorPerformance[] = contractors.map((contractor, index) => ({
        contractorId: contractor.id,
        period: {
          startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
          endDate: new Date().toISOString(),
          type: timeframe
        },
        metrics: {
          jobsCompleted: Math.floor(Math.random() * 50) + 10,
          averageResponseTime: Math.floor(Math.random() * 30) + 10,
          averageCompletionTime: Math.floor(Math.random() * 72) + 24,
          customerRating: 3.5 + Math.random() * 1.5,
          reportQuality: 70 + Math.random() * 30,
          revenueGenerated: Math.floor(Math.random() * 100000) + 20000,
          profitability: 15 + Math.random() * 25,
          complianceRate: 85 + Math.random() * 15
        },
        ranking: index + 1,
        percentile: 100 - (index * 10),
        badges: generateBadges(contractor),
        improvements: [
          'Response time improved by 15%',
          'Customer satisfaction up 0.3 points'
        ],
        warnings: []
      }));

      setPerformances(mockPerformances);
    } catch (error) {
      console.error('Error loading performance data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateBadges = (contractor: Contractor): PerformanceBadge[] => {
    const badges: PerformanceBadge[] = [];
    
    if (contractor.kpiScore.responseTime.value < 15) {
      badges.push({
        id: 'badge_speed',
        name: 'Speed Demon',
        description: 'Consistently fast response times',
        icon: '⚡',
        earnedAt: new Date().toISOString(),
        category: 'speed'
      });
    }
    
    if (contractor.kpiScore.customerSatisfaction.value > 4.5) {
      badges.push({
        id: 'badge_satisfaction',
        name: 'Customer Champion',
        description: 'Exceptional customer satisfaction',
        icon: '⭐',
        earnedAt: new Date().toISOString(),
        category: 'customer_service'
      });
    }
    
    if (contractor.leadStatistics.totalLeadsAccepted > 100) {
      badges.push({
        id: 'badge_volume',
        name: 'High Volume Handler',
        description: 'Completed over 100 jobs',
        icon: '📈',
        earnedAt: new Date().toISOString(),
        category: 'volume'
      });
    }
    
    return badges;
  };

  const getMetricValue = (contractor: Contractor, metric: keyof KPIScore): number => {
    if (metric === 'overallScore') {
      return contractor.kpiScore.overallScore;
    }
    if (metric === 'bonusMultiplier') {
      return contractor.kpiScore.bonusMultiplier;
    }
    const metricData = contractor.kpiScore[metric as keyof Omit<KPIScore, 'overallScore' | 'bonusMultiplier' | 'lastUpdated' | 'trend'>];
    return typeof metricData === 'object' && 'value' in metricData ? metricData.value : 0;
  };

  const getTrendIcon = (trend: 'improving' | 'stable' | 'declining' | 'up' | 'down') => {
    switch (trend) {
      case 'improving':
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'declining':
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-600" />;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Trophy className="w-5 h-5 text-yellow-500" />;
      case 2:
        return <Medal className="w-5 h-5 text-gray-400" />;
      case 3:
        return <Medal className="w-5 h-5 text-orange-600" />;
      default:
        return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold text-gray-600">{rank}</span>;
    }
  };

  const getPredictedNextAssignment = (contractor: Contractor): string => {
    const lastAssigned = contractor.leadStatistics.lastLeadAssignedAt 
      ? new Date(contractor.leadStatistics.lastLeadAssignedAt)
      : new Date(0);
    const hoursSinceLastAssignment = (Date.now() - lastAssigned.getTime()) / (1000 * 60 * 60);
    
    if (contractor.availability !== 'available') {
      return 'Not available';
    }
    
    if (contractor.leadStatistics.leadSharePercentage >= 40) {
      return 'At share cap';
    }
    
    if (hoursSinceLastAssignment < 1) {
      return 'Recently assigned';
    }
    
    const score = contractor.kpiScore.overallScore;
    if (score >= 90) {
      return 'High priority';
    } else if (score >= 75) {
      return 'Medium priority';
    } else {
      return 'Low priority';
    }
  };

  const sortedContractors = [...contractors].sort((a, b) => {
    const aValue = getMetricValue(a, selectedMetric);
    const bValue = getMetricValue(b, selectedMetric);
    return sortOrder === 'desc' ? bValue - aValue : aValue - bValue;
  });

  const LeaderboardHeader = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Trophy className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Performance Leaderboard</h3>
            <p className="text-sm text-gray-600">
              {overlappingArea ? `Area: ${overlappingArea}` : 'All Contractors'}
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <select
            value={timeframe}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
            <option value="quarterly">Quarterly</option>
          </select>
          
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center">
          <p className="text-2xl font-bold text-gray-900">{contractors.length}</p>
          <p className="text-sm text-gray-600">Total Contractors</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-green-600">
            {contractors.filter(c => c.availability === 'available').length}
          </p>
          <p className="text-sm text-gray-600">Available</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-blue-600">
            {contractors.reduce((sum, c) => sum + c.leadStatistics.currentMonthLeads, 0)}
          </p>
          <p className="text-sm text-gray-600">Total Leads</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-purple-600">
            {(contractors.reduce((sum, c) => sum + c.kpiScore.overallScore, 0) / contractors.length).toFixed(1)}%
          </p>
          <p className="text-sm text-gray-600">Avg KPI Score</p>
        </div>
      </div>
    </div>
  );

  const MetricSelector = () => (
    <div className="bg-white rounded-lg border border-gray-200 p-4">
      <h4 className="text-sm font-medium text-gray-700 mb-3">Sort By Metric</h4>
      
      <div className="flex flex-wrap gap-2">
        {[
          { key: 'overallScore', label: 'Overall Score', icon: <Trophy className="w-4 h-4" /> },
          { key: 'responseTime', label: 'Response Time', icon: <Clock className="w-4 h-4" /> },
          { key: 'customerSatisfaction', label: 'Satisfaction', icon: <Star className="w-4 h-4" /> },
          { key: 'completionTime', label: 'Completion', icon: <Target className="w-4 h-4" /> },
          { key: 'reportQuality', label: 'Report Quality', icon: <Shield className="w-4 h-4" /> }
        ].map((metric) => (
          <button
            key={metric.key}
            onClick={() => setSelectedMetric(metric.key as keyof KPIScore)}
            className={`flex items-center px-3 py-2 rounded-lg text-sm transition-colors ${
              selectedMetric === metric.key
                ? 'bg-blue-100 text-blue-700 border border-blue-300'
                : 'bg-gray-50 text-gray-700 border border-gray-200 hover:bg-gray-100'
            }`}
          >
            {metric.icon}
            <span className="ml-1">{metric.label}</span>
          </button>
        ))}
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={showPrediction}
            onChange={(e) => setShowPrediction(e.target.checked)}
            className="mr-2"
          />
          <span className="text-sm text-gray-700">Show Assignment Prediction</span>
        </label>
        
        <button
          onClick={() => setSortOrder(prev => prev === 'desc' ? 'asc' : 'desc')}
          className="flex items-center text-sm text-gray-600 hover:text-gray-900"
        >
          {sortOrder === 'desc' ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
          {sortOrder === 'desc' ? 'Highest First' : 'Lowest First'}
        </button>
      </div>
    </div>
  );

  const ContractorCard = ({ contractor, rank }: { contractor: Contractor; rank: number }) => {
    const performance = performances.find(p => p.contractorId === contractor.id);
    const isExpanded = expandedContractor === contractor.id;
    
    return (
      <div
        className={`bg-white rounded-lg border p-4 cursor-pointer transition-all ${
          rank <= 3 ? 'border-yellow-300 bg-yellow-50' : 'border-gray-200 hover:border-gray-300'
        }`}
        onClick={() => {
          setExpandedContractor(isExpanded ? null : contractor.id);
          onContractorSelect?.(contractor);
        }}
      >
        <div className="flex items-start justify-between">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              {getRankIcon(rank)}
            </div>
            
            <div className="flex-1">
              <div className="flex items-center space-x-2">
                <h4 className="font-semibold text-gray-900">{contractor.companyName}</h4>
                {performance && performance.badges.length > 0 && (
                  <div className="flex space-x-1">
                    {performance.badges.slice(0, 3).map((badge) => (
                      <span key={badge.id} title={badge.description} className="text-sm">
                        {badge.icon}
                      </span>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                <span className="flex items-center">
                  <Activity className="w-3 h-3 mr-1" />
                  {contractor.leadStatistics.currentMonthLeads} leads
                </span>
                <span className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  {contractor.leadStatistics.acceptanceRate}% accept
                </span>
                <span className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  {contractor.leadStatistics.averageResponseTime} min avg
                </span>
              </div>
              
              {showPrediction && (
                <div className="mt-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    getPredictedNextAssignment(contractor) === 'High priority' 
                      ? 'bg-green-100 text-green-800'
                      : getPredictedNextAssignment(contractor) === 'Medium priority'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}>
                    Next: {getPredictedNextAssignment(contractor)}
                  </span>
                </div>
              )}
            </div>
          </div>
          
          <div className="text-right">
            <div className="flex items-center space-x-1">
              <p className="text-2xl font-bold text-gray-900">
                {getMetricValue(contractor, selectedMetric).toFixed(selectedMetric === 'overallScore' ? 1 : 0)}
                {selectedMetric === 'overallScore' && '%'}
              </p>
              {getTrendIcon(contractor.kpiScore.trend)}
            </div>
            <p className="text-xs text-gray-600 capitalize">
              {selectedMetric.replace(/([A-Z])/g, ' $1').trim()}
            </p>
          </div>
        </div>
        
        {isExpanded && performance && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Jobs Completed</p>
                <p className="font-semibold">{performance.metrics.jobsCompleted}</p>
              </div>
              <div>
                <p className="text-gray-600">Avg Response</p>
                <p className="font-semibold">{performance.metrics.averageResponseTime} min</p>
              </div>
              <div>
                <p className="text-gray-600">Customer Rating</p>
                <p className="font-semibold">{performance.metrics.customerRating.toFixed(1)} ⭐</p>
              </div>
              <div>
                <p className="text-gray-600">Compliance</p>
                <p className="font-semibold">{performance.metrics.complianceRate.toFixed(0)}%</p>
              </div>
            </div>
            
            {performance.improvements.length > 0 && (
              <div className="mt-3">
                <p className="text-xs text-gray-600 mb-1">Recent Improvements:</p>
                <div className="space-y-1">
                  {performance.improvements.map((improvement, index) => (
                    <div key={index} className="flex items-center text-xs text-green-700">
                      <ArrowUp className="w-3 h-3 mr-1" />
                      {improvement}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-3 flex justify-between">
              <span className="text-xs text-gray-600">
                Share: {contractor.leadStatistics.leadSharePercentage}% of area leads
              </span>
              <span className={`text-xs font-medium ${
                contractor.kpiScore.bonusMultiplier > 1 ? 'text-green-600' : 'text-gray-600'
              }`}>
                {contractor.kpiScore.bonusMultiplier > 1 
                  ? `+${((contractor.kpiScore.bonusMultiplier - 1) * 100).toFixed(0)}% bonus`
                  : 'No bonus'
                }
              </span>
            </div>
          </div>
        )}
      </div>
    );
  };

  const TopPerformers = () => (
    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200 p-4">
      <h4 className="text-lg font-semibold text-gray-900 mb-4">🏆 Top Performers</h4>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {sortedContractors.slice(0, 3).map((contractor, index) => (
          <div key={contractor.id} className="bg-white rounded-lg p-3 border border-yellow-300">
            <div className="flex items-center justify-between mb-2">
              {getRankIcon(index + 1)}
              <span className="text-2xl font-bold text-gray-900">
                {contractor.kpiScore.overallScore.toFixed(0)}%
              </span>
            </div>
            <p className="font-medium text-gray-900">{contractor.companyName}</p>
            <p className="text-sm text-gray-600 mt-1">
              {contractor.leadStatistics.currentMonthLeads} leads this month
            </p>
            <div className="mt-2 flex items-center justify-between">
              <span className="text-xs text-gray-600">
                {contractor.leadStatistics.acceptanceRate}% accept rate
              </span>
              {getTrendIcon(contractor.kpiScore.trend)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <LeaderboardHeader />
      <MetricSelector />
      
      {sortedContractors.length > 0 && <TopPerformers />}
      
      <div className="space-y-4">
        {sortedContractors.map((contractor, index) => (
          <ContractorCard
            key={contractor.id}
            contractor={contractor}
            rank={index + 1}
          />
        ))}
      </div>
      
      {sortedContractors.length === 0 && (
        <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
          <Trophy className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Contractors Available</h3>
          <p className="text-gray-600">No contractors found for the selected criteria</p>
        </div>
      )}
    </div>
  );
};

export default KPILeaderboard;
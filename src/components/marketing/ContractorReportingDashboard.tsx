'use client';

import React, { useState, useEffect } from 'react';
import {
  TrendingUp, TrendingDown, DollarSign, Users, Target, Calendar,
  BarChart3, PieChart, MapPin, Clock, Star, ArrowUp, ArrowDown,
  Download, Filter, RefreshCw, Bell, Lightbulb, Zap, Award
} from 'lucide-react';
import type { 
  ContractorReportingData, 
  LeadPerformanceMetrics, 
  CampaignROI,
  MarketingOpportunity,
  TerritoryPerformance 
} from '@/types/marketing-analytics';

interface ContractorReportingDashboardProps {
  contractorId: string;
  className?: string;
}

const ContractorReportingDashboard: React.FC<ContractorReportingDashboardProps> = ({
  contractorId,
  className = ''
}) => {
  const [reportingData, setReportingData] = useState<ContractorReportingData | null>(null);
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedMetric, setSelectedMetric] = useState<'leads' | 'revenue' | 'roi'>('leads');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReportingData();
  }, [contractorId, selectedTimeframe]);

  const loadReportingData = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockData: ContractorReportingData = {
        contractorId,
        timeframe: selectedTimeframe,
        summary: {
          totalLeads: 156,
          convertedLeads: 42,
          totalRevenue: 87500,
          adSpendContribution: 2840,
          roi: 308.5,
          avgCostPerLead: 18.21,
          conversionRate: 26.9,
          territoryRank: 3
        },
        leadPerformance: {
          totalLeads: 156,
          qualifiedLeads: 98,
          conversionRate: 26.9,
          avgLeadValue: 2083,
          sourceBreakdown: [
            { source: 'Google Ads', leads: 67, cost: 1220, revenue: 42500, roi: 348.4 },
            { source: 'Facebook Ads', leads: 34, cost: 890, revenue: 18900, roi: 212.4 },
            { source: 'Local SEO', leads: 28, cost: 420, revenue: 15200, roi: 361.9 },
            { source: 'Direct Mail', leads: 18, cost: 240, revenue: 7800, roi: 325.0 },
            { source: 'Referrals', leads: 9, cost: 70, revenue: 3100, roi: 442.9 }
          ],
          monthlyTrend: [
            { month: 'Jan', leads: 42, conversions: 11, revenue: 23100 },
            { month: 'Feb', leads: 38, conversions: 12, revenue: 25800 },
            { month: 'Mar', leads: 52, conversions: 14, revenue: 31200 },
            { month: 'Apr', leads: 24, conversions: 5, revenue: 7400 }
          ]
        },
        campaignROI: {
          totalSpent: 2840,
          totalRevenue: 87500,
          netProfit: 84660,
          roi: 308.5,
          coFundedCampaigns: [
            {
              campaignId: 'camp_001',
              name: 'Spring Home Restoration',
              yourContribution: 450,
              totalBudget: 2800,
              yourShare: 16.1,
              leadsGenerated: 23,
              revenue: 18900,
              roi: 420.0,
              status: 'active'
            },
            {
              campaignId: 'camp_002',
              name: 'Emergency Water Damage',
              yourContribution: 680,
              totalBudget: 3200,
              yourShare: 21.3,
              leadsGenerated: 31,
              revenue: 24600,
              roi: 361.8,
              status: 'completed'
            }
          ],
          topPerformingCampaigns: [
            { name: 'Local Storm Response', roi: 487.2, revenue: 31200 },
            { name: 'Mould Remediation Ads', roi: 398.4, revenue: 24800 },
            { name: 'Fire Damage Recovery', roi: 342.1, revenue: 19500 }
          ]
        },
        territoryInsights: {
          yourTerritory: 'Metro North',
          rank: 3,
          totalContractors: 12,
          marketShare: 24.8,
          competitorAnalysis: [
            { contractor: 'Elite Restoration', marketShare: 31.2, trend: 'up' },
            { contractor: 'Rapid Response Co', marketShare: 28.4, trend: 'stable' },
            { contractor: 'Your Company', marketShare: 24.8, trend: 'up' },
            { contractor: 'Precision Contractors', marketShare: 15.6, trend: 'down' }
          ],
          opportunities: [
            {
              type: 'underserved_area',
              title: 'Expand into West District',
              description: 'Low contractor density with high demand for restoration services',
              potentialRevenue: 45000,
              recommendedBudget: 1200,
              confidence: 'high'
            },
            {
              type: 'seasonal_campaign',
              title: 'Hurricane Season Prep',
              description: 'Co-funded campaign opportunity with 8 other contractors',
              potentialRevenue: 62000,
              recommendedBudget: 2400,
              confidence: 'high'
            }
          ]
        },
        marketingOpportunities: [
          {
            id: 'opp_001',
            type: 'co_funded_campaign',
            title: 'Summer Storm Response Coalition',
            description: 'Joint campaign with 6 contractors targeting storm damage restoration',
            estimatedCost: 850,
            potentialRevenue: 38000,
            estimatedROI: 447.1,
            confidence: 'high',
            deadline: '2024-05-15',
            requirements: ['Minimum $500 contribution', 'Storm damage certification'],
            benefits: [
              'Shared cost reduces individual risk',
              'Broader geographic coverage',
              'Enhanced credibility through partnership'
            ]
          },
          {
            id: 'opp_002',
            type: 'budget_increase',
            title: 'Increase Google Ads Budget',
            description: 'Your Google Ads are performing well - consider increasing budget',
            estimatedCost: 400,
            potentialRevenue: 16500,
            estimatedROI: 412.5,
            confidence: 'medium',
            deadline: '2024-04-30',
            requirements: ['Review current keyword performance'],
            benefits: [
              'Capture more high-intent searches',
              'Outbid competitors on key terms',
              'Scale successful campaigns'
            ]
          }
        ]
      };

      setReportingData(mockData);
    } catch (error) {
      console.error('Error loading reporting data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(1)}%`;
  };

  const getChangeIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <ArrowUp className="w-4 h-4 text-green-600" />;
      case 'down': return <ArrowDown className="w-4 h-4 text-red-600" />;
      default: return <div className="w-4 h-4" />;
    }
  };

  const getConfidenceColor = (confidence: string) => {
    switch (confidence) {
      case 'high': return 'text-green-600 bg-green-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const SummaryMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Leads Generated</p>
            <p className="text-3xl font-bold text-gray-900">{reportingData?.summary.totalLeads}</p>
            <p className="text-sm text-green-600 mt-2">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              +12% vs last period
            </p>
          </div>
          <div className="p-3 bg-blue-50 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatCurrency(reportingData?.summary.totalRevenue || 0)}
            </p>
            <p className="text-sm text-green-600 mt-2">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              +18% vs last period
            </p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Marketing ROI</p>
            <p className="text-3xl font-bold text-gray-900">
              {formatPercentage(reportingData?.summary.roi || 0)}
            </p>
            <p className="text-sm text-green-600 mt-2">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              +8% vs last period
            </p>
          </div>
          <div className="p-3 bg-purple-50 rounded-lg">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600">Territory Rank</p>
            <p className="text-3xl font-bold text-gray-900">#{reportingData?.summary.territoryRank}</p>
            <p className="text-sm text-green-600 mt-2">
              <Star className="w-4 h-4 inline mr-1" />
              Top 25% performer
            </p>
          </div>
          <div className="p-3 bg-orange-50 rounded-lg">
            <Award className="w-6 h-6 text-blue-700" />
          </div>
        </div>
      </div>
    </div>
  );

  const LeadPerformanceChart = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Lead Performance by Source</h3>
        <div className="flex space-x-2">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as any)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
            <option value="1y">Last year</option>
          </select>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Source</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">Leads</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">Cost</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">Revenue</th>
              <th className="text-right py-3 px-4 font-medium text-gray-700">ROI</th>
            </tr>
          </thead>
          <tbody>
            {reportingData?.leadPerformance.sourceBreakdown.map((source, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3 px-4 font-medium text-gray-900">{source.source}</td>
                <td className="py-3 px-4 text-right text-gray-900">{source.leads}</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(source.cost)}</td>
                <td className="py-3 px-4 text-right text-gray-900">{formatCurrency(source.revenue)}</td>
                <td className="py-3 px-4 text-right">
                  <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                    source.roi > 300 ? 'bg-green-100 text-green-800' :
                    source.roi > 200 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {formatPercentage(source.roi)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const CoFundedCampaigns = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Co-Funded Campaign Performance</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {reportingData?.campaignROI.coFundedCampaigns.map((campaign) => (
          <div key={campaign.campaignId} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">{campaign.name}</h4>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                campaign.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}>
                {campaign.status}
              </span>
            </div>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Your Contribution:</span>
                <span className="font-medium">{formatCurrency(campaign.yourContribution)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Your Share:</span>
                <span className="font-medium">{formatPercentage(campaign.yourShare)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Leads Generated:</span>
                <span className="font-medium">{campaign.leadsGenerated}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Revenue:</span>
                <span className="font-medium">{formatCurrency(campaign.revenue)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">ROI:</span>
                <span className="font-medium text-green-600">{formatPercentage(campaign.roi)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TerritoryInsights = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Territory Performance</h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h4 className="font-medium text-gray-900 mb-4">Market Position</h4>
          <div className="space-y-3">
            {reportingData?.territoryInsights.competitorAnalysis.map((competitor, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <span className="font-medium text-gray-900">#{index + 1}</span>
                  <span className={competitor.contractor === 'Your Company' ? 'font-semibold text-blue-600' : 'text-gray-700'}>
                    {competitor.contractor}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">{formatPercentage(competitor.marketShare)}</span>
                  {getChangeIcon(competitor.trend as any)}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-medium text-gray-900 mb-4">Territory Summary</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <span className="text-gray-700">Your Territory:</span>
              <span className="font-medium text-gray-900">{reportingData?.territoryInsights.yourTerritory}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <span className="text-gray-700">Current Rank:</span>
              <span className="font-medium text-gray-900">#{reportingData?.territoryInsights.rank} of {reportingData?.territoryInsights.totalContractors}</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <span className="text-gray-700">Market Share:</span>
              <span className="font-medium text-gray-900">{formatPercentage(reportingData?.territoryInsights.marketShare || 0)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const MarketingOpportunities = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-6">
        <Lightbulb className="w-5 h-5 text-blue-600" />
        <h3 className="text-lg font-semibold text-gray-900">Marketing Opportunities</h3>
      </div>
      
      <div className="space-y-6">
        {reportingData?.marketingOpportunities.map((opportunity) => (
          <div key={opportunity.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-50 rounded-lg">
                  {opportunity.type === 'co_funded_campaign' ? 
                    <Users className="w-5 h-5 text-blue-600" /> : 
                    <Zap className="w-5 h-5 text-blue-600" />
                  }
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">{opportunity.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{opportunity.description}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getConfidenceColor(opportunity.confidence)}`}>
                {opportunity.confidence} confidence
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">Estimated Cost</p>
                <p className="text-lg font-semibold text-gray-900">{formatCurrency(opportunity.estimatedCost)}</p>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-600">Potential Revenue</p>
                <p className="text-lg font-semibold text-green-600">{formatCurrency(opportunity.potentialRevenue)}</p>
              </div>
              <div className="text-center p-3 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-600">Estimated ROI</p>
                <p className="text-lg font-semibold text-purple-600">{formatPercentage(opportunity.estimatedROI)}</p>
              </div>
            </div>

            <div className="mb-4">
              <h5 className="font-medium text-gray-900 mb-2">Benefits:</h5>
              <ul className="space-y-1">
                {opportunity.benefits.map((benefit, index) => (
                  <li key={index} className="text-sm text-gray-600 flex items-center">
                    <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4 text-sm text-gray-600">
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  Deadline: {new Date(opportunity.deadline).toLocaleDateString()}
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50">
                  Learn More
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700">
                  Get Started
                </button>
              </div>
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-32"></div>
            ))}
          </div>
          <div className="bg-gray-200 rounded-xl h-64 mb-8"></div>
          <div className="bg-gray-200 rounded-xl h-48"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Marketing Performance Dashboard</h1>
          <p className="text-gray-600 mt-1">Track your leads, campaigns, and growth opportunities</p>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <RefreshCw className="w-4 h-4" />
          </button>
          <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
            <Bell className="w-4 h-4" />
          </button>
        </div>
      </div>

      <SummaryMetrics />
      <LeadPerformanceChart />
      <CoFundedCampaigns />
      <TerritoryInsights />
      <MarketingOpportunities />
    </div>
  );
};

export default ContractorReportingDashboard;
'use client';

import React, { useState } from 'react';
import {
  Target,
  Users,
  MousePointer,
  TrendingUp,
  BarChart3,
  PieChart,
  MapPin,
  Clock,
  DollarSign,
  Filter,
  Search,
  Download,
  RefreshCw,
  ExternalLink,
  Eye,
  Settings,
  Zap,
  Award,
  Activity,
  ArrowRight,
  Share2,
  Globe,
  Smartphone,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';
import type { 
  LeadAttributionData,
  LeadSource,
  LeadAttribution,
  AttributionPath,
  AttributionModel,
  Touchpoint
} from '@/types/marketing-analytics';

export default function LeadAttributionSystem() {
  const [selectedModel, setSelectedModel] = useState<AttributionModel>('last_click');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedTerritory, setSelectedTerritory] = useState<'all' | string>('all');
  const [showDetails, setShowDetails] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'paths' | 'touchpoints' | 'contractors'>('overview');

  const mockAttributionData: LeadAttributionData = {
    totalLeads: 1247,
    attributionModel: selectedModel,
    sources: [
      {
        source: 'google',
        medium: 'organic',
        leads: 456,
        conversions: 189,
        revenue: 378000,
        cost: 12500,
        costPerLead: 27.41,
        roi: 2924,
        attribution: {
          firstClick: 0.35,
          lastClick: 0.42,
          linear: 0.38,
          timeDecay: 0.40,
          positionBased: 0.41
        }
      },
      {
        source: 'google',
        medium: 'cpc',
        campaign: 'Emergency Water Damage Sydney',
        leads: 324,
        conversions: 156,
        revenue: 312000,
        cost: 32500,
        costPerLead: 100.31,
        roi: 860,
        attribution: {
          firstClick: 0.28,
          lastClick: 0.35,
          linear: 0.32,
          timeDecay: 0.33,
          positionBased: 0.34
        }
      },
      {
        source: 'facebook.com',
        medium: 'social',
        campaign: 'Fire Damage Awareness',
        leads: 198,
        conversions: 87,
        revenue: 217500,
        cost: 18750,
        costPerLead: 94.70,
        roi: 1060,
        attribution: {
          firstClick: 0.22,
          lastClick: 0.18,
          linear: 0.20,
          timeDecay: 0.19,
          positionBased: 0.20
        }
      },
      {
        source: 'linkedin.com',
        medium: 'social',
        campaign: 'Commercial Property Awareness',
        leads: 89,
        conversions: 45,
        revenue: 135000,
        cost: 8500,
        costPerLead: 95.51,
        roi: 1488,
        attribution: {
          firstClick: 0.08,
          lastClick: 0.04,
          linear: 0.06,
          timeDecay: 0.05,
          positionBased: 0.04
        }
      },
      {
        source: 'direct',
        medium: '(none)',
        leads: 123,
        conversions: 78,
        revenue: 195000,
        cost: 0,
        costPerLead: 0,
        roi: Infinity,
        attribution: {
          firstClick: 0.05,
          lastClick: 0.01,
          linear: 0.02,
          timeDecay: 0.02,
          positionBased: 0.01
        }
      },
      {
        source: 'referral',
        medium: 'partner',
        leads: 57,
        conversions: 31,
        revenue: 93000,
        cost: 2500,
        costPerLead: 43.86,
        roi: 3620,
        attribution: {
          firstClick: 0.02,
          lastClick: 0.00,
          linear: 0.02,
          timeDecay: 0.01,
          positionBased: 0.00
        }
      }
    ],
    touchpoints: [
      {
        source: 'google',
        medium: 'organic',
        page: '/emergency-water-damage',
        visits: 12456,
        interactions: 3456,
        conversions: 234,
        avgTimeOnPage: 145,
        bounceRate: 34.2
      },
      {
        source: 'google',
        medium: 'cpc',
        page: '/emergency-restoration-sydney',
        visits: 8934,
        interactions: 2890,
        conversions: 189,
        avgTimeOnPage: 165,
        bounceRate: 42.1
      }
    ],
    conversionPaths: [
      {
        path: ['google/organic', 'direct', 'google/cpc'],
        frequency: 156,
        conversions: 89,
        revenue: 178000,
        averageTimeToConversion: 7.2
      },
      {
        path: ['facebook/social', 'google/organic', 'direct'],
        frequency: 134,
        conversions: 67,
        revenue: 134000,
        averageTimeToConversion: 12.5
      },
      {
        path: ['google/cpc', 'direct'],
        frequency: 98,
        conversions: 56,
        revenue: 112000,
        averageTimeToConversion: 3.8
      },
      {
        path: ['linkedin/social', 'google/organic', 'google/cpc', 'direct'],
        frequency: 67,
        conversions: 34,
        revenue: 102000,
        averageTimeToConversion: 18.3
      }
    ],
    firstClick: {
      totalValue: 1330500,
      distribution: {
        'google/organic': 465675,
        'google/cpc': 372540,
        'facebook/social': 292410,
        'direct': 133050,
        'linkedin/social': 66825
      }
    },
    lastClick: {
      totalValue: 1330500,
      distribution: {
        'google/organic': 558615,
        'google/cpc': 465675,
        'facebook/social': 239490,
        'direct': 13305,
        'linkedin/social': 53220
      }
    },
    linear: {
      totalValue: 1330500,
      distribution: {
        'google/organic': 505590,
        'google/cpc': 425760,
        'facebook/social': 266100,
        'direct': 79830,
        'linkedin/social': 53220
      }
    },
    timeDecay: {
      totalValue: 1330500,
      distribution: {
        'google/organic': 532200,
        'google/cpc': 439065,
        'facebook/social': 252795,
        'direct': 66525,
        'linkedin/social': 39915
      }
    },
    positionBased: {
      totalValue: 1330500,
      distribution: {
        'google/organic': 545505,
        'google/cpc': 452520,
        'facebook/social': 266100,
        'direct': 13305,
        'linkedin/social': 53220
      }
    }
  };

  const mockLeadAttributions: LeadAttribution[] = [
    {
      leadId: 'lead-1',
      contractorId: 'cont-1',
      source: 'google',
      medium: 'organic',
      touchpoints: [
        {
          timestamp: new Date('2024-03-10T10:30:00'),
          source: 'google',
          medium: 'organic',
          page: '/emergency-water-damage',
          action: 'page_view',
          attribution: 0.4
        },
        {
          timestamp: new Date('2024-03-12T14:15:00'),
          source: 'direct',
          medium: '(none)',
          page: '/contact',
          action: 'form_view',
          attribution: 0.3
        },
        {
          timestamp: new Date('2024-03-12T14:18:00'),
          source: 'direct',
          medium: '(none)',
          page: '/contact',
          action: 'form_submit',
          value: 2500,
          attribution: 0.3
        }
      ],
      firstTouch: new Date('2024-03-10T10:30:00'),
      lastTouch: new Date('2024-03-12T14:18:00'),
      conversionDate: new Date('2024-03-12T14:18:00'),
      revenue: 2500,
      cost: 45,
      trackingCode: 'UTM-TRACK-001'
    }
  ];

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);
  const formatNumber = (num: number) => new Intl.NumberFormat('en-AU').format(num);
  const formatPercentage = (num: number) => `${num.toFixed(1)}%`;

  const getAttributionValue = (source: LeadSource, model: AttributionModel) => {
    const modelData = mockAttributionData[model];
    const sourceKey = source.campaign ? 
      `${source.source}/${source.medium}/${source.campaign}` : 
      `${source.source}/${source.medium}`;
    return modelData.distribution[sourceKey] || 0;
  };

  const sourceColors = [
    'bg-blue-500',
    'bg-green-500', 
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500',
    'bg-indigo-500'
  ];

  const AttributionModelSelector = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Attribution Model</h3>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          { model: 'first_click', name: 'First Click', desc: 'Full credit to first touchpoint' },
          { model: 'last_click', name: 'Last Click', desc: 'Full credit to last touchpoint' },
          { model: 'linear', name: 'Linear', desc: 'Equal credit across touchpoints' },
          { model: 'time_decay', name: 'Time Decay', desc: 'More credit to recent touchpoints' },
          { model: 'position_based', name: 'Position Based', desc: '40% first, 40% last, 20% middle' }
        ].map(option => (
          <button
            key={option.model}
            onClick={() => setSelectedModel(option.model as AttributionModel)}
            className={`p-4 border-2 rounded-lg text-left transition-all ${
              selectedModel === option.model
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <p className="font-medium text-gray-900">{option.name}</p>
            <p className="text-xs text-gray-500 mt-1">{option.desc}</p>
          </button>
        ))}
      </div>
    </div>
  );

  const OverviewMetrics = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Leads</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {formatNumber(mockAttributionData.totalLeads)}
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {formatCurrency(mockAttributionData[selectedModel].totalValue)}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg Cost per Lead</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {formatCurrency(
                mockAttributionData.sources.reduce((sum, s) => sum + s.cost, 0) / 
                mockAttributionData.totalLeads
              )}
            </p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <Target className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Conversion Rate</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {formatPercentage(
                mockAttributionData.sources.reduce((sum, s) => sum + s.conversions, 0) / 
                mockAttributionData.totalLeads * 100
              )}
            </p>
          </div>
          <div className="p-3 bg-orange-100 rounded-lg">
            <Activity className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const SourceBreakdown = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Lead Source Attribution</h3>
        <div className="text-sm text-gray-500">
          Using {selectedModel.replace('_', ' ')} model
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-medium text-gray-600">Source/Medium</th>
              <th className="text-right py-3 text-sm font-medium text-gray-600">Leads</th>
              <th className="text-right py-3 text-sm font-medium text-gray-600">Conversions</th>
              <th className="text-right py-3 text-sm font-medium text-gray-600">Revenue</th>
              <th className="text-right py-3 text-sm font-medium text-gray-600">Cost per Lead</th>
              <th className="text-right py-3 text-sm font-medium text-gray-600">ROI</th>
              <th className="text-right py-3 text-sm font-medium text-gray-600">Attribution</th>
            </tr>
          </thead>
          <tbody>
            {mockAttributionData.sources.map((source, index) => (
              <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${sourceColors[index % sourceColors.length]}`} />
                    <div>
                      <p className="font-medium text-gray-900">{source.source}</p>
                      <p className="text-sm text-gray-500">{source.medium}</p>
                      {source.campaign && (
                        <p className="text-xs text-gray-400">{source.campaign}</p>
                      )}
                    </div>
                  </div>
                </td>
                <td className="py-3 text-right font-medium">{formatNumber(source.leads)}</td>
                <td className="py-3 text-right">{formatNumber(source.conversions)}</td>
                <td className="py-3 text-right font-medium">{formatCurrency(source.revenue)}</td>
                <td className="py-3 text-right">{formatCurrency(source.costPerLead)}</td>
                <td className="py-3 text-right">
                  <span className={`font-medium ${
                    source.roi >= 1000 ? 'text-green-600' :
                    source.roi >= 500 ? 'text-yellow-600' :
                    'text-red-600'
                  }`}>
                    {source.roi === Infinity ? '∞' : `${source.roi.toFixed(0)}%`}
                  </span>
                </td>
                <td className="py-3 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <div 
                      className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden"
                      title={`${formatPercentage(source.attribution[selectedModel] * 100)} attribution`}
                    >
                      <div 
                        className={`h-full ${sourceColors[index % sourceColors.length]}`}
                        style={{ width: `${source.attribution[selectedModel] * 100}%` }}
                      />
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {formatPercentage(source.attribution[selectedModel] * 100)}
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ConversionPaths = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Top Conversion Paths</h3>
      <div className="space-y-4">
        {mockAttributionData.conversionPaths.map((path, index) => (
          <div key={index} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                {path.path.map((step, stepIndex) => (
                  <React.Fragment key={stepIndex}>
                    <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                      {step}
                    </span>
                    {stepIndex < path.path.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-gray-400" />
                    )}
                  </React.Fragment>
                ))}
              </div>
              <div className="text-sm text-gray-500">
                {path.frequency} occurrences
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Conversions</p>
                <p className="font-medium text-gray-900">{formatNumber(path.conversions)}</p>
              </div>
              <div>
                <p className="text-gray-600">Revenue</p>
                <p className="font-medium text-gray-900">{formatCurrency(path.revenue)}</p>
              </div>
              <div>
                <p className="text-gray-600">Avg Time to Convert</p>
                <p className="font-medium text-gray-900">{path.averageTimeToConversion.toFixed(1)} days</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TouchpointAnalysis = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Touchpoint Performance</h3>
      <div className="space-y-4">
        {mockAttributionData.touchpoints.map((touchpoint, index) => (
          <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <div className={`w-3 h-3 rounded-full ${sourceColors[index % sourceColors.length]}`} />
              <div>
                <p className="font-medium text-gray-900">
                  {touchpoint.source}/{touchpoint.medium}
                </p>
                <p className="text-sm text-gray-500">{touchpoint.page}</p>
              </div>
            </div>
            <div className="flex space-x-6 text-sm">
              <div className="text-center">
                <p className="text-gray-600">Visits</p>
                <p className="font-medium">{formatNumber(touchpoint.visits)}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Interactions</p>
                <p className="font-medium">{formatNumber(touchpoint.interactions)}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Conversions</p>
                <p className="font-medium">{formatNumber(touchpoint.conversions)}</p>
              </div>
              <div className="text-center">
                <p className="text-gray-600">Bounce Rate</p>
                <p className="font-medium">{formatPercentage(touchpoint.bounceRate)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ContractorAllocation = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Lead Assignment by Territory</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {['Sydney North', 'Sydney Central', 'Melbourne CBD', 'Brisbane North'].map(territory => {
          const territoryLeads = Math.floor(Math.random() * 200) + 50;
          const conversionRate = Math.random() * 5 + 2;
          
          return (
            <div key={territory} className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-500" />
                  <h4 className="font-medium text-gray-900">{territory}</h4>
                </div>
                <div className={`w-3 h-3 rounded-full ${
                  conversionRate >= 5 ? 'bg-green-500' :
                  conversionRate >= 3.5 ? 'bg-yellow-500' :
                  'bg-red-500'
                }`} />
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Leads Assigned:</span>
                  <span className="font-medium">{formatNumber(territoryLeads)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Conversion Rate:</span>
                  <span className="font-medium">{formatPercentage(conversionRate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Contractors:</span>
                  <span className="font-medium">{Math.floor(Math.random() * 5) + 2}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Attribution System</h1>
          <p className="text-gray-600 mt-2">
            Track lead sources and attribute conversions across multiple touchpoints
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value as typeof selectedTimeframe)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4 mr-2 inline" />
            Export Report
          </button>
        </div>
      </div>

      <AttributionModelSelector />
      <OverviewMetrics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <SourceBreakdown />
        <div className="space-y-6">
          <TouchpointAnalysis />
          <ContractorAllocation />
        </div>
      </div>

      <ConversionPaths />
    </div>
  );
}
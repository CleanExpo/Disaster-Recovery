'use client';

import React, { useState } from 'react';
import {
  Target,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  MousePointer,
  Eye,
  BarChart3,
  PieChart,
  MapPin,
  Calendar,
  Play,
  Pause,
  Settings,
  Edit,
  Plus,
  Filter,
  Download,
  RefreshCw,
  ExternalLink,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
  Award,
  Activity
} from 'lucide-react';
import type { 
  AdvertisingCampaign,
  CampaignPerformanceMetrics,
  ContractorAllocation,
  CampaignStatus,
  AdPlatform
} from '@/types/marketing-analytics';

export default function CampaignTrackingDashboard() {
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | AdPlatform>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | CampaignStatus>('all');
  const [selectedTimeframe, setSelectedTimeframe] = useState<'7d' | '30d' | '90d' | '1y'>('30d');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'overview' | 'campaigns' | 'territories' | 'attribution'>('overview');

  const mockCampaigns: AdvertisingCampaign[] = [
    {
      id: '1',
      name: 'Emergency Water Damage - Sydney',
      platform: 'google_ads',
      type: 'search',
      status: 'active',
      budget: {
        total: 50000,
        daily: 500,
        spent: 32500,
        remaining: 17500,
        currency: 'AUD',
        bidStrategy: 'Target CPA',
        costModel: 'CPC'
      },
      targeting: {
        geographic: {
          countries: ['Australia'],
          regions: ['NSW'],
          cities: ['Sydney'],
          radius: 50,
          coordinates: { latitude: -33.8688, longitude: 151.2093 }
        },
        demographic: {
          ageRanges: ['25-34', '35-44', '45-54', '55-64'],
          genders: ['all'],
          incomes: ['middle', 'high'],
          languages: ['en']
        },
        interests: ['home_improvement', 'property_management'],
        behaviours: ['home_owners'],
        keywords: [
          { keyword: 'water damage repair sydney', matchType: 'exact', bid: 8.50, quality: 9 },
          { keyword: 'emergency restoration sydney', matchType: 'phrase', bid: 7.25, quality: 8 }
        ],
        audiences: [],
        placements: [],
        schedule: {
          dayParting: ['monday_friday_9_17', 'weekend_emergency'],
          timezone: 'Australia/Sydney'
        }
      },
      creative: [
        {
          id: '1',
          type: 'text',
          assets: [],
          headlines: ['24/7 Emergency Water Damage Repair', 'Sydney\'s #1 Restoration Experts'],
          descriptions: ['Fast response, professional service, insurance approved'],
          callToActions: ['Submit Form Now', 'Get Quote'],
          landingPages: ['/emergency-water-damage-sydney'],
          performance: {
            impressions: 45600,
            clicks: 1824,
            ctr: 4.0,
            conversions: 156,
            conversionRate: 8.6
          }
        }
      ],
      performance: {
        impressions: 145600,
        clicks: 5824,
        ctr: 4.0,
        cpc: 5.58,
        cpm: 223.20,
        cpa: 208.33,
        conversions: 156,
        conversionRate: 2.7,
        revenue: 312000,
        roas: 9.6,
        qualityScore: 8.5,
        adRank: 3.2
      },
      attribution: [],
      territories: ['Sydney North', 'Sydney Central', 'Sydney South'],
      contractors: [
        {
          contractorId: 'cont-1',
          contractorName: 'AquaTech Restoration',
          tier: 'platinum',
          allocation: 40,
          territories: ['Sydney North'],
          leads: 62,
          conversions: 45,
          revenue: 124800,
          costShare: 13000
        },
        {
          contractorId: 'cont-2',
          contractorName: 'Sydney Water Pros',
          tier: 'gold',
          allocation: 35,
          territories: ['Sydney Central'],
          leads: 54,
          conversions: 39,
          revenue: 108900,
          costShare: 11375
        }
      ],
      schedule: {
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-04-30'),
        timezone: 'Australia/Sydney',
        dayParting: []
      },
      optimisation: {
        autoOptimize: true,
        bidAdjustments: true,
        audienceOptimization: true,
        creativeRotation: 'optimise'
      }
    },
    {
      id: '2',
      name: 'Fire Damage Restoration - Melbourne',
      platform: 'facebook',
      type: 'conversion',
      status: 'active',
      budget: {
        total: 30000,
        daily: 300,
        spent: 18750,
        remaining: 11250,
        currency: 'AUD',
        bidStrategy: 'Lowest Cost',
        costModel: 'CPA'
      },
      targeting: {
        geographic: {
          countries: ['Australia'],
          regions: ['VIC'],
          cities: ['Melbourne'],
          radius: 40,
          coordinates: { latitude: -37.8136, longitude: 144.9631 }
        },
        demographic: {
          ageRanges: ['30-44', '45-54', '55-65'],
          genders: ['all'],
          incomes: ['middle', 'high'],
          languages: ['en']
        },
        interests: ['home_insurance', 'property_restoration'],
        behaviours: ['home_owners'],
        keywords: [],
        audiences: [
          { name: 'Fire Damage Lookalikes', size: 45000, type: 'lookalike' }
        ],
        placements: ['facebook_feed', 'instagram_feed'],
        schedule: {
          dayParting: ['all_day'],
          timezone: 'Australia/Melbourne'
        }
      },
      creative: [
        {
          id: '2',
          type: 'video',
          assets: [{ type: 'video', url: '/videos/fire-restoration.mp4' }],
          headlines: ['Melbourne Fire Damage Specialists'],
          descriptions: ['Professional fire damage restoration services'],
          callToActions: ['Learn More'],
          landingPages: ['/fire-damage-restoration-melbourne'],
          performance: {
            impressions: 89300,
            clicks: 2143,
            ctr: 2.4,
            conversions: 87,
            conversionRate: 4.1
          }
        }
      ],
      performance: {
        impressions: 89300,
        clicks: 2143,
        ctr: 2.4,
        cpc: 8.75,
        cpm: 210.00,
        cpa: 215.52,
        conversions: 87,
        conversionRate: 4.1,
        revenue: 217500,
        roas: 11.6,
        frequency: 2.1,
        reach: 42500
      },
      attribution: [],
      territories: ['Melbourne CBD', 'Melbourne East', 'Melbourne West'],
      contractors: [
        {
          contractorId: 'cont-3',
          contractorName: 'Melbourne Fire Recovery',
          tier: 'gold',
          allocation: 60,
          territories: ['Melbourne CBD', 'Melbourne East'],
          leads: 52,
          conversions: 38,
          revenue: 130500,
          costShare: 11250
        }
      ],
      schedule: {
        startDate: new Date('2024-02-15'),
        endDate: new Date('2024-05-15'),
        timezone: 'Australia/Melbourne',
        dayParting: []
      },
      optimisation: {
        autoOptimize: true,
        bidAdjustments: false,
        audienceOptimization: true,
        creativeRotation: 'even'
      }
    },
    {
      id: '3',
      name: 'Storm Damage Response - Brisbane',
      platform: 'linkedin',
      type: 'awareness',
      status: 'paused',
      budget: {
        total: 15000,
        daily: 150,
        spent: 8500,
        remaining: 6500,
        currency: 'AUD',
        bidStrategy: 'Maximum Delivery',
        costModel: 'CPM'
      },
      targeting: {
        geographic: {
          countries: ['Australia'],
          regions: ['QLD'],
          cities: ['Brisbane'],
          radius: 60,
          coordinates: { latitude: -27.4698, longitude: 153.0251 }
        },
        demographic: {
          ageRanges: ['35-54'],
          genders: ['all'],
          incomes: ['high'],
          languages: ['en']
        },
        interests: ['commercial_property', 'facility_management'],
        behaviours: ['business_owners'],
        keywords: [],
        audiences: [
          { name: 'Property Managers Brisbane', size: 15000, type: 'custom' }
        ],
        placements: ['linkedin_feed'],
        schedule: {
          dayParting: ['business_hours'],
          timezone: 'Australia/Brisbane'
        }
      },
      creative: [
        {
          id: '3',
          type: 'image',
          assets: [{ type: 'image', url: '/images/storm-damage-commercial.jpg' }],
          headlines: ['Commercial Storm Damage Specialists'],
          descriptions: ['Brisbane\'s trusted commercial restoration partner'],
          callToActions: ['Contact Us'],
          landingPages: ['/commercial-storm-damage-brisbane'],
          performance: {
            impressions: 25600,
            clicks: 512,
            ctr: 2.0,
            conversions: 23,
            conversionRate: 4.5
          }
        }
      ],
      performance: {
        impressions: 25600,
        clicks: 512,
        ctr: 2.0,
        cpc: 16.60,
        cpm: 332.00,
        cpa: 369.57,
        conversions: 23,
        conversionRate: 4.5,
        revenue: 115000,
        roas: 13.5,
        frequency: 1.8,
        reach: 14200
      },
      attribution: [],
      territories: ['Brisbane North', 'Brisbane South'],
      contractors: [
        {
          contractorId: 'cont-4',
          contractorName: 'Brisbane Storm Solutions',
          tier: 'silver',
          allocation: 100,
          territories: ['Brisbane North', 'Brisbane South'],
          leads: 23,
          conversions: 16,
          revenue: 115000,
          costShare: 8500
        }
      ],
      schedule: {
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-05-31'),
        timezone: 'Australia/Brisbane',
        dayParting: []
      },
      optimisation: {
        autoOptimize: false,
        bidAdjustments: false,
        audienceOptimization: false,
        creativeRotation: 'manual'
      }
    }
  ];

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);
  const formatNumber = (num: number) => new Intl.NumberFormat('en-AU').format(num);
  const formatPercentage = (num: number) => `${num.toFixed(1)}%`;

  const platformIcons = {
    google_ads: '🔍',
    facebook: '📘',
    linkedin: '💼',
    instagram: '📷',
    youtube: '📺',
    display_network: '🖥️',
    programmatic: '🤖',
    offline: '📰',
    other: '📊'
  };

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    scheduled: 'bg-blue-100 text-blue-800',
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800'
  };

  const calculateTotals = () => {
    const filteredCampaigns = mockCampaigns.filter(campaign => {
      const platformMatch = selectedPlatform === 'all' || campaign.platform === selectedPlatform;
      const statusMatch = selectedStatus === 'all' || campaign.status === selectedStatus;
      return platformMatch && statusMatch;
    });

    return filteredCampaigns.reduce((totals, campaign) => ({
      spend: totals.spend + campaign.budget.spent,
      revenue: totals.revenue + campaign.performance.revenue,
      impressions: totals.impressions + campaign.performance.impressions,
      clicks: totals.clicks + campaign.performance.clicks,
      conversions: totals.conversions + campaign.performance.conversions,
      campaigns: totals.campaigns + 1
    }), {
      spend: 0,
      revenue: 0,
      impressions: 0,
      clicks: 0,
      conversions: 0,
      campaigns: 0
    });
  };

  const totals = calculateTotals();
  const averageCPC = totals.clicks > 0 ? totals.spend / totals.clicks : 0;
  const averageCPA = totals.conversions > 0 ? totals.spend / totals.conversions : 0;
  const overallROAS = totals.spend > 0 ? totals.revenue / totals.spend : 0;

  const OverviewCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Spend</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{formatCurrency(totals.spend)}</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              <span className="text-sm font-medium text-green-600">+12.5%</span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Revenue</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{formatCurrency(totals.revenue)}</p>
            <p className="text-sm text-gray-500 mt-1">
              ROAS: {overallROAS.toFixed(1)}x
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Conversions</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{formatNumber(totals.conversions)}</p>
            <p className="text-sm text-gray-500 mt-1">
              Avg CPA: {formatCurrency(averageCPA)}
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
            <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">{totals.campaigns}</p>
            <p className="text-sm text-gray-500 mt-1">
              Avg CPC: {formatCurrency(averageCPC)}
            </p>
          </div>
          <div className="p-3 bg-orange-100 rounded-lg">
            <Activity className="w-6 h-6 text-blue-700" />
          </div>
        </div>
      </div>
    </div>
  );

  const CampaignTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold text-gray-900">Campaign Performance</h3>
          <div className="flex space-x-3">
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value as typeof selectedPlatform)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Platforms</option>
              <option value="google_ads">Google Ads</option>
              <option value="facebook">Facebook</option>
              <option value="linkedin">LinkedIn</option>
              <option value="instagram">Instagram</option>
            </select>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="paused">Paused</option>
              <option value="completed">Completed</option>
              <option value="draft">Draft</option>
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Campaign
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Platform
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Spend
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                ROAS
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Conversions
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockCampaigns
              .filter(campaign => {
                const platformMatch = selectedPlatform === 'all' || campaign.platform === selectedPlatform;
                const statusMatch = selectedStatus === 'all' || campaign.status === selectedStatus;
                return platformMatch && statusMatch;
              })
              .map(campaign => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-start space-x-3">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                        <p className="text-sm text-gray-500">{campaign.type}</p>
                        <div className="flex items-center mt-1">
                          <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-500">
                            {campaign.territories.join(', ')}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <span className="text-lg mr-2">{platformIcons[campaign.platform]}</span>
                      <span className="text-sm text-gray-900 capitalize">
                        {campaign.platform.replace('_', ' ')}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[campaign.status]}`}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatCurrency(campaign.budget.spent)}
                      </p>
                      <p className="text-xs text-gray-500">
                        of {formatCurrency(campaign.budget.total)}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(campaign.performance.revenue)}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`text-sm font-medium ${
                      campaign.performance.roas >= 4 ? 'text-green-600' :
                      campaign.performance.roas >= 2 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {campaign.performance.roas.toFixed(1)}x
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {formatNumber(campaign.performance.conversions)}
                      </p>
                      <p className="text-xs text-gray-500">
                        {formatPercentage(campaign.performance.conversionRate)}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedCampaign(campaign.id)}
                        className="text-blue-600 hover:text-blue-700"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="text-gray-600 hover:text-gray-700">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className={`${
                        campaign.status === 'active' ? 'text-yellow-600 hover:text-yellow-700' :
                        'text-green-600 hover:text-green-700'
                      }`}>
                        {campaign.status === 'active' ? 
                          <Pause className="w-4 h-4" /> : 
                          <Play className="w-4 h-4" />
                        }
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const ContractorPerformance = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Contractor Performance</h3>
      <div className="space-y-4">
        {mockCampaigns.flatMap(campaign => campaign.contractors).map(contractor => (
          <div key={contractor.contractorId} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div>
                <h4 className="font-medium text-gray-900">{contractor.contractorName}</h4>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    contractor.tier === 'platinum' ? 'bg-purple-100 text-purple-800' :
                    contractor.tier === 'gold' ? 'bg-yellow-100 text-yellow-800' :
                    contractor.tier === 'silver' ? 'bg-gray-100 text-gray-800' :
                    'bg-orange-100 text-orange-800'
                  }`}>
                    {contractor.tier.toUpperCase()}
                  </span>
                  <span className="text-sm text-gray-500">
                    {contractor.territories.join(', ')}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">
                  {contractor.allocation}% allocation
                </p>
                <p className="text-xs text-gray-500">
                  {formatCurrency(contractor.costShare)} spend
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Leads</p>
                <p className="font-medium">{formatNumber(contractor.leads)}</p>
              </div>
              <div>
                <p className="text-gray-600">Conversions</p>
                <p className="font-medium">{formatNumber(contractor.conversions)}</p>
              </div>
              <div>
                <p className="text-gray-600">Revenue</p>
                <p className="font-medium">{formatCurrency(contractor.revenue)}</p>
              </div>
              <div>
                <p className="text-gray-600">ROI</p>
                <p className="font-medium">
                  {((contractor.revenue - contractor.costShare) / contractor.costShare * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const TerritoryHeatmap = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Territory Performance Heatmap</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from(new Set(mockCampaigns.flatMap(c => c.territories))).map(territory => {
          const territoryData = mockCampaigns.flatMap(c => 
            c.contractors.filter(cont => cont.territories.includes(territory))
          );
          const totalSpend = territoryData.reduce((sum, cont) => sum + cont.costShare, 0);
          const totalRevenue = territoryData.reduce((sum, cont) => sum + cont.revenue, 0);
          const efficiency = totalSpend > 0 ? totalRevenue / totalSpend : 0;

          return (
            <div key={territory} className={`p-4 rounded-lg border-2 ${
              efficiency >= 10 ? 'border-green-500 bg-green-50' :
              efficiency >= 5 ? 'border-blue-600 bg-yellow-50' :
              'border-red-600 bg-red-50'
            }`}>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-gray-900">{territory}</h4>
                <div className={`w-3 h-3 rounded-full ${
                  efficiency >= 10 ? 'bg-green-500' :
                  efficiency >= 5 ? 'bg-blue-600' :
                  'bg-red-500'
                }`} />
              </div>
              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Spend:</span>
                  <span className="font-medium">{formatCurrency(totalSpend)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Revenue:</span>
                  <span className="font-medium">{formatCurrency(totalRevenue)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Efficiency:</span>
                  <span className="font-medium">{efficiency.toFixed(1)}x</span>
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
          <h1 className="text-3xl font-bold text-gray-900">Campaign Tracking Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Monitor advertising performance and ROI across all platforms and territories
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
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colours">
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours">
            <Plus className="w-4 h-4 mr-2 inline" />
            New Campaign
          </button>
        </div>
      </div>

      <OverviewCards />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div className="lg:col-span-2">
          <CampaignTable />
        </div>
        <div>
          <TerritoryHeatmap />
        </div>
      </div>

      <ContractorPerformance />
    </div>
  );
}
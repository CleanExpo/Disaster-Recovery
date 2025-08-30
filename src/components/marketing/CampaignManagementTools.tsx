'use client';

import React, { useState } from 'react';
import {
  Plus,
  Edit,
  Play,
  Pause,
  Copy,
  Trash2,
  Settings,
  Target,
  Calendar,
  DollarSign,
  Users,
  MapPin,
  Image,
  Video,
  FileText,
  CheckCircle,
  AlertTriangle,
  Clock,
  TrendingUp,
  BarChart3,
  Eye,
  Download,
  Upload,
  RefreshCw,
  Filter,
  Search,
  ExternalLink,
  Zap,
  Award,
  Activity,
  Share2
} from 'lucide-react';
import type { 
  ManagedCampaign,
  CampaignTemplate,
  BudgetPool,
  CampaignStatus,
  AdPlatform,
  CampaignType
} from '@/types/marketing-analytics';

export default function CampaignManagementTools() {
  const [selectedView, setSelectedView] = useState<'campaigns' | 'templates' | 'budgets' | 'approval'>('campaigns');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'all' | AdPlatform>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | CampaignStatus>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCampaign, setSelectedCampaign] = useState<string | null>(null);

  const mockCampaigns: ManagedCampaign[] = [
    {
      id: '1',
      name: 'Q2 Emergency Services Campaign',
      description: 'Comprehensive emergency response campaign targeting water and fire damage services across major metropolitan areas.',
      type: 'conversion',
      status: 'active',
      manager: 'Sarah Johnson',
      client: 'All Tier Partners',
      budget: {
        total: 150000,
        daily: 1500,
        spent: 87500,
        remaining: 62500,
        currency: 'AUD',
        bidStrategy: 'Target CPA',
        costModel: 'CPA'
      },
      timeline: {
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-06-30'),
        createdDate: new Date('2024-03-15'),
        lastModified: new Date('2024-03-20')
      },
      assets: [
        {
          id: '1',
          type: 'image',
          name: 'Emergency Response Hero Image',
          url: '/assets/emergency-hero.jpg',
          platform: 'google_ads',
          status: 'approved',
          performance: { impressions: 45600, clicks: 1824, ctr: 4.0 }
        },
        {
          id: '2',
          type: 'video',
          name: 'Water Damage Response Video',
          url: '/assets/water-damage-video.mp4',
          platform: 'facebook',
          status: 'approved',
          performance: { impressions: 89300, clicks: 2143, ctr: 2.4 }
        }
      ],
      approval: {
        status: 'approved',
        approver: 'Marketing Director',
        approvedDate: new Date('2024-03-18'),
        comments: 'Approved for launch with budget adjustments'
      },
      performance: {
        impressions: 234900,
        clicks: 9396,
        ctr: 4.0,
        cpc: 9.31,
        cpm: 372.40,
        cpa: 297.73,
        conversions: 294,
        conversionRate: 3.1,
        revenue: 882000,
        roas: 10.1
      },
      reports: []
    },
    {
      id: '2',
      name: 'Commercial Property Awareness - LinkedIn',
      description: 'B2B campaign targeting commercial property managers and facility directors.',
      type: 'awareness',
      status: 'scheduled',
      manager: 'Michael Chen',
      client: 'Gold Tier Partners',
      budget: {
        total: 75000,
        daily: 750,
        spent: 0,
        remaining: 75000,
        currency: 'AUD',
        bidStrategy: 'Maximum Delivery',
        costModel: 'CPM'
      },
      timeline: {
        startDate: new Date('2024-04-15'),
        endDate: new Date('2024-07-15'),
        createdDate: new Date('2024-03-10'),
        lastModified: new Date('2024-03-18')
      },
      assets: [
        {
          id: '3',
          type: 'image',
          name: 'Commercial Restoration Infographic',
          url: '/assets/commercial-infographic.jpg',
          platform: 'linkedin',
          status: 'pending',
          performance: { impressions: 0, clicks: 0, ctr: 0 }
        }
      ],
      approval: {
        status: 'pending',
        submittedDate: new Date('2024-03-18'),
        comments: 'Awaiting budget approval from finance team'
      },
      performance: {
        impressions: 0,
        clicks: 0,
        ctr: 0,
        cpc: 0,
        cpm: 0,
        cpa: 0,
        conversions: 0,
        conversionRate: 0,
        revenue: 0,
        roas: 0
      },
      reports: []
    },
    {
      id: '3',
      name: 'Mould Awareness Social Campaign',
      description: 'Educational campaign about mould risks and professional remediation services.',
      type: 'awareness',
      status: 'paused',
      manager: 'Lisa Rodriguez',
      client: 'Health-focused Contractors',
      budget: {
        total: 25000,
        daily: 250,
        spent: 12800,
        remaining: 12200,
        currency: 'AUD',
        bidStrategy: 'Lowest Cost',
        costModel: 'CPC'
      },
      timeline: {
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-04-30'),
        createdDate: new Date('2024-01-15'),
        lastModified: new Date('2024-03-10')
      },
      assets: [
        {
          id: '4',
          type: 'video',
          name: 'Mould Health Risks Educational Video',
          url: '/assets/mould-education.mp4',
          platform: 'facebook',
          status: 'approved',
          performance: { impressions: 67800, clicks: 1356, ctr: 2.0 }
        }
      ],
      approval: {
        status: 'approved',
        approver: 'Campaign Manager',
        approvedDate: new Date('2024-01-20'),
        comments: 'Approved with content guidelines compliance'
      },
      performance: {
        impressions: 67800,
        clicks: 1356,
        ctr: 2.0,
        cpc: 9.44,
        cpm: 188.80,
        cpa: 426.67,
        conversions: 30,
        conversionRate: 2.2,
        revenue: 75000,
        roas: 5.9
      },
      reports: []
    }
  ];

  const mockTemplates: CampaignTemplate[] = [
    {
      id: '1',
      name: 'Emergency Response Template',
      type: 'conversion',
      platform: 'google_ads',
      targeting: {
        geographic: {
          countries: ['Australia'],
          regions: [],
          cities: [],
          radius: 50,
          coordinates: { latitude: -33.8688, longitude: 151.2093 }
        },
        demographic: {
          ageRanges: ['25-34', '35-44', '45-54'],
          genders: ['all'],
          incomes: ['middle', 'high'],
          languages: ['en']
        },
        interests: ['home_improvement', 'insurance'],
        behaviours: ['home_owners'],
        keywords: [],
        audiences: [],
        placements: [],
        schedule: {
          dayParting: ['all_day'],
          timezone: 'Australia/Sydney'
        }
      },
      creative: [],
      budget: {
        recommended: 50000,
        dailyRange: { min: 200, max: 1000 },
        bidStrategy: 'Target CPA',
        costModel: 'CPA'
      },
      settings: {
        autoOptimization: true,
        frequencyCap: 3,
        conversionWindow: 30,
        attributionModel: 'last_click'
      }
    }
  ];

  const mockBudgetPools: BudgetPool[] = [
    {
      id: '1',
      name: 'Q2 Emergency Services Pool',
      totalBudget: 500000,
      allocatedBudget: 325000,
      availableBudget: 175000,
      campaigns: ['1', '2'],
      contractors: [
        {
          contractorId: 'cont-1',
          contractorName: 'AquaTech Restoration',
          allocation: 30,
          spent: 97500,
          performance: {
            leads: 245,
            conversions: 156,
            revenue: 390000,
            costPerLead: 397.96,
            roi: 300
          }
        },
        {
          contractorId: 'cont-2',
          contractorName: 'Sydney Fire Recovery',
          allocation: 25,
          spent: 81250,
          performance: {
            leads: 198,
            conversions: 127,
            revenue: 317500,
            costPerLead: 410.61,
            roi: 291
          }
        }
      ],
      period: {
        start: new Date('2024-04-01'),
        end: new Date('2024-06-30'),
        type: 'quarter'
      },
      restrictions: [
        { type: 'daily_limit', value: 5000, description: 'Maximum daily spend per contractor' },
        { type: 'platform_limit', value: 60, description: 'Maximum 60% on Google Ads' }
      ]
    }
  ];

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);
  const formatNumber = (num: number) => new Intl.NumberFormat('en-AU').format(num);
  const formatPercentage = (num: number) => `${num.toFixed(1)}%`;

  const statusColors = {
    draft: 'bg-gray-100 text-gray-800',
    scheduled: 'bg-blue-100 text-blue-800',
    active: 'bg-green-100 text-green-800',
    paused: 'bg-yellow-100 text-yellow-800',
    completed: 'bg-purple-100 text-purple-800',
    cancelled: 'bg-red-100 text-red-800'
  };

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

  const CampaignOverview = () => (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Active Campaigns</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {mockCampaigns.filter(c => c.status === 'active').length}
            </p>
          </div>
          <div className="p-3 bg-green-100 rounded-lg">
            <Activity className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Budget</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {formatCurrency(mockCampaigns.reduce((sum, c) => sum + c.budget.total, 0))}
            </p>
          </div>
          <div className="p-3 bg-blue-100 rounded-lg">
            <DollarSign className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Total Spent</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {formatCurrency(mockCampaigns.reduce((sum, c) => sum + c.budget.spent, 0))}
            </p>
          </div>
          <div className="p-3 bg-purple-100 rounded-lg">
            <TrendingUp className="w-6 h-6 text-purple-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600">Avg ROAS</p>
            <p className="text-3xl font-bold text-gray-900 mt-1">
              {(mockCampaigns.reduce((sum, c) => sum + (c.performance.roas || 0), 0) / mockCampaigns.length).toFixed(1)}x
            </p>
          </div>
          <div className="p-3 bg-orange-100 rounded-lg">
            <Target className="w-6 h-6 text-orange-600" />
          </div>
        </div>
      </div>
    </div>
  );

  const CampaignTable = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Campaign Management</h3>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Campaign
          </button>
        </div>
        
        <div className="flex space-x-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search campaigns..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as typeof selectedStatus)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="scheduled">Scheduled</option>
            <option value="paused">Paused</option>
            <option value="completed">Completed</option>
          </select>
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
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Budget
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Performance
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Timeline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {mockCampaigns
              .filter(campaign => {
                const statusMatch = selectedStatus === 'all' || campaign.status === selectedStatus;
                const searchMatch = searchTerm === '' || 
                  campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  campaign.description.toLowerCase().includes(searchTerm.toLowerCase());
                return statusMatch && searchMatch;
              })
              .map(campaign => (
                <tr key={campaign.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{campaign.name}</p>
                      <p className="text-sm text-gray-500 line-clamp-1">{campaign.description}</p>
                      <div className="flex items-center mt-1 space-x-2">
                        <span className="text-xs text-gray-400">{campaign.manager}</span>
                        <span className="text-xs text-gray-300">•</span>
                        <span className="text-xs text-gray-400 capitalize">{campaign.type}</span>
                      </div>
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
                      <div className="w-full bg-gray-200 rounded-full h-1 mt-1">
                        <div 
                          className="bg-blue-600 h-1 rounded-full"
                          style={{ width: `${(campaign.budget.spent / campaign.budget.total) * 100}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm">
                      <p className="font-medium text-gray-900">
                        {formatNumber(campaign.performance.conversions)} conversions
                      </p>
                      <p className="text-gray-500">
                        ROAS: {campaign.performance.roas.toFixed(1)}x
                      </p>
                      <p className="text-gray-500">
                        CPA: {formatCurrency(campaign.performance.cpa)}
                      </p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-600">
                      <p>{campaign.timeline.startDate.toLocaleDateString('en-AU')}</p>
                      <p>to {campaign.timeline.endDate.toLocaleDateString('en-AU')}</p>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setSelectedCampaign(campaign.id)}
                        className="text-blue-600 hover:text-blue-700"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-700"
                        title="Edit Campaign"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        className={`${
                          campaign.status === 'active' ? 'text-yellow-600 hover:text-yellow-700' :
                          'text-green-600 hover:text-green-700'
                        }`}
                        title={campaign.status === 'active' ? 'Pause Campaign' : 'Start Campaign'}
                      >
                        {campaign.status === 'active' ? 
                          <Pause className="w-4 h-4" /> : 
                          <Play className="w-4 h-4" />
                        }
                      </button>
                      <button
                        className="text-gray-600 hover:text-gray-700"
                        title="Duplicate Campaign"
                      >
                        <Copy className="w-4 h-4" />
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

  const TemplateLibrary = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Campaign Templates</h3>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours flex items-center">
          <Plus className="w-4 h-4 mr-2" />
          Create Template
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockTemplates.map(template => (
          <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 hover:bg-blue-50 transition-all cursor-pointer">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-medium text-gray-900">{template.name}</h4>
              <span className="text-lg">{platformIcons[template.platform]}</span>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Type:</span>
                <span className="capitalize">{template.type}</span>
              </div>
              <div className="flex justify-between">
                <span>Platform:</span>
                <span className="capitalize">{template.platform.replace('_', ' ')}</span>
              </div>
              <div className="flex justify-between">
                <span>Recommended Budget:</span>
                <span>{formatCurrency(template.budget.recommended)}</span>
              </div>
            </div>
            <div className="mt-4 flex space-x-2">
              <button className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colours">
                Use Template
              </button>
              <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colours">
                <Edit className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const BudgetManagement = () => (
    <div className="space-y-6">
      {mockBudgetPools.map(pool => (
        <div key={pool.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{pool.name}</h3>
              <p className="text-sm text-gray-500">
                {pool.period.start.toLocaleDateString('en-AU')} - {pool.period.end.toLocaleDateString('en-AU')}
              </p>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(pool.availableBudget)}
              </p>
              <p className="text-sm text-gray-500">Available</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(pool.totalBudget)}
              </p>
              <p className="text-sm text-gray-600">Total Budget</p>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(pool.allocatedBudget)}
              </p>
              <p className="text-sm text-gray-600">Allocated</p>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <p className="text-2xl font-bold text-orange-600">
                {formatPercentage((pool.allocatedBudget / pool.totalBudget) * 100)}
              </p>
              <p className="text-sm text-gray-600">Utilization</p>
            </div>
          </div>

          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Contractor Allocations</h4>
            <div className="space-y-3">
              {pool.contractors.map(contractor => (
                <div key={contractor.contractorId} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600">
                      {contractor.contractorName[0]}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">{contractor.contractorName}</p>
                      <p className="text-sm text-gray-500">{contractor.allocation}% allocation</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900">
                      {formatCurrency(contractor.spent)}
                    </p>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className="text-gray-500">ROI:</span>
                      <span className={`font-medium ${
                        contractor.performance.roi >= 300 ? 'text-green-600' :
                        contractor.performance.roi >= 200 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {contractor.performance.roi}%
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {pool.restrictions.length > 0 && (
            <div>
              <h4 className="font-medium text-gray-900 mb-3">Budget Restrictions</h4>
              <div className="space-y-2">
                {pool.restrictions.map((restriction, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-600">
                    <AlertTriangle className="w-4 h-4 text-yellow-500" />
                    <span>{restriction.description}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const ApprovalWorkflow = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Pending Approvals</h3>
      <div className="space-y-4">
        {mockCampaigns.filter(c => c.approval.status === 'pending').map(campaign => (
          <div key={campaign.id} className="p-4 border border-yellow-200 bg-yellow-50 rounded-lg">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{campaign.name}</h4>
                <p className="text-sm text-gray-600 mt-1">{campaign.description}</p>
                <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                  <span>Budget: {formatCurrency(campaign.budget.total)}</span>
                  <span>Duration: {Math.ceil((campaign.timeline.endDate.getTime() - campaign.timeline.startDate.getTime()) / (1000 * 60 * 60 * 24))} days</span>
                  <span>Manager: {campaign.manager}</span>
                </div>
                {campaign.approval.comments && (
                  <p className="text-sm text-gray-600 mt-2 italic">
                    "{campaign.approval.comments}"
                  </p>
                )}
              </div>
              <div className="flex space-x-2 ml-4">
                <button className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colours">
                  Approve
                </button>
                <button className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700 transition-colours">
                  Reject
                </button>
                <button className="px-3 py-2 border border-gray-300 text-gray-700 text-sm rounded-lg hover:bg-gray-50 transition-colours">
                  Review
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {mockCampaigns.filter(c => c.approval.status === 'pending').length === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
            <p className="text-gray-600">No campaigns pending approval</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Campaign Management Tools</h1>
          <p className="text-gray-600 mt-2">
            Create, manage, and optimise advertising campaigns across all platforms
          </p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colours">
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours">
            <Upload className="w-4 h-4 mr-2 inline" />
            Import Campaign
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'campaigns', label: 'Campaigns', icon: <Activity className="w-4 h-4" /> },
              { key: 'templates', label: 'Templates', icon: <FileText className="w-4 h-4" /> },
              { key: 'budgets', label: 'Budget Pools', icon: <DollarSign className="w-4 h-4" /> },
              { key: 'approval', label: 'Approvals', icon: <CheckCircle className="w-4 h-4" /> }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setSelectedView(tab.key as typeof selectedView)}
                className={`flex items-center px-1 py-4 border-b-2 font-medium text-sm transition-colours ${
                  selectedView === tab.key
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span className="ml-2">{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {selectedView === 'campaigns' && (
        <>
          <CampaignOverview />
          <CampaignTable />
        </>
      )}

      {selectedView === 'templates' && <TemplateLibrary />}
      {selectedView === 'budgets' && <BudgetManagement />}
      {selectedView === 'approval' && <ApprovalWorkflow />}
    </div>
  );
}
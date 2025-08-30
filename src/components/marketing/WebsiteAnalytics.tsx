'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  Eye,
  MousePointer,
  Clock,
  Target,
  MapPin,
  Smartphone,
  Monitor,
  Tablet,
  Globe,
  ArrowRight,
  Filter,
  Calendar,
  Download,
  RefreshCw,
  ExternalLink,
  Settings,
  AlertTriangle,
  CheckCircle,
  Activity,
  Zap,
  LineChart
} from 'lucide-react';
import type { 
  WebsiteAnalytics as WebsiteAnalyticsType,
  GoogleAnalyticsData,
  VisitorFlowData,
  TerritoryMetrics,
  ConversionFunnel
} from '@/types/marketing-analytics';

export default function WebsiteAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState<'day' | 'week' | 'month' | 'quarter'>('month');
  const [selectedTerritory, setSelectedTerritory] = useState<'all' | string>('all');
  const [selectedView, setSelectedView] = useState<'overview' | 'funnel' | 'territory' | 'flow'>('overview');
  const [comparisonMode, setComparisonMode] = useState(false);

  const mockAnalytics: WebsiteAnalyticsType = {
    googleAnalytics: {
      propertyId: 'GA4-PROPERTY-123456789',
      sessions: 45672,
      users: 32145,
      newUsers: 24108,
      pageviews: 126834,
      avgSessionDuration: 240, // seconds
      bounceRate: 42.3,
      conversionRate: 3.8,
      goals: [
        {
          goalId: '1',
          goalName: 'Lead Form Submission',
          type: 'event',
          completions: 1734,
          conversionRate: 3.8,
          goalValue: 150
        },
        {
          goalId: '2',
          goalName: 'Phone Call',
          type: 'event',
          completions: 892,
          conversionRate: 2.0,
          goalValue: 200
        }
      ],
      trafficSources: [
        {
          source: 'google',
          medium: 'organic',
          sessions: 18269,
          users: 14523,
          newUsers: 11234,
          bounceRate: 38.5,
          avgSessionDuration: 285,
          conversions: 695,
          conversionRate: 3.8,
          revenue: 139000
        },
        {
          source: 'google',
          medium: 'cpc',
          sessions: 12890,
          users: 10234,
          newUsers: 8567,
          bounceRate: 45.2,
          avgSessionDuration: 195,
          conversions: 567,
          conversionRate: 4.4,
          revenue: 113400
        },
        {
          source: 'facebook.com',
          medium: 'referral',
          sessions: 6789,
          users: 5432,
          newUsers: 4123,
          bounceRate: 52.8,
          avgSessionDuration: 165,
          conversions: 234,
          conversionRate: 3.4,
          revenue: 46800
        }
      ],
      deviceBreakdown: {
        desktop: {
          sessions: 22836,
          users: 16875,
          bounceRate: 35.6,
          avgSessionDuration: 312,
          conversions: 1156,
          conversionRate: 5.1
        },
        mobile: {
          sessions: 18234,
          users: 12456,
          bounceRate: 48.9,
          avgSessionDuration: 185,
          conversions: 456,
          conversionRate: 2.5
        },
        tablet: {
          sessions: 4602,
          users: 2814,
          bounceRate: 44.2,
          avgSessionDuration: 205,
          conversions: 122,
          conversionRate: 2.7
        }
      },
      geographicData: [
        { country: 'Australia', region: 'NSW', city: 'Sydney', sessions: 15234, users: 11567, conversions: 578, revenue: 115600 },
        { country: 'Australia', region: 'VIC', city: 'Melbourne', sessions: 12456, users: 9123, conversions: 445, revenue: 89000 },
        { country: 'Australia', region: 'QLD', city: 'Brisbane', sessions: 8734, users: 6234, conversions: 312, revenue: 62400 },
        { country: 'Australia', region: 'WA', city: 'Perth', sessions: 5678, users: 4123, conversions: 203, revenue: 40600 }
      ],
      topPages: [
        {
          pagePath: '/',
          pageTitle: 'Home - NRP Restoration Professionals',
          pageviews: 34567,
          uniquePageviews: 28456,
          avgTimeOnPage: 145,
          bounceRate: 42.3,
          exitRate: 28.5,
          conversions: 567
        },
        {
          pagePath: '/emergency-restoration',
          pageTitle: 'Emergency Restoration Services',
          pageviews: 18234,
          uniquePageviews: 15678,
          avgTimeOnPage: 185,
          bounceRate: 35.2,
          exitRate: 22.4,
          conversions: 445
        }
      ],
      trends: [
        { date: new Date('2024-01-01'), sessions: 12456, users: 8234, conversions: 312, revenue: 62400 },
        { date: new Date('2024-02-01'), sessions: 14567, users: 9456, conversions: 378, revenue: 75600 },
        { date: new Date('2024-03-01'), sessions: 16234, users: 10567, conversions: 445, revenue: 89000 }
      ]
    },
    tagManager: {
      containerId: 'GTM-XXXXXXX',
      tags: [],
      triggers: [],
      variables: [],
      events: [],
      conversions: []
    },
    visitorFlow: {
      landingPages: [
        { page: '/', visitors: 18234, nextActions: [{ action: 'emergency-restoration', count: 5678 }] },
        { page: '/emergency-restoration', visitors: 12456, nextActions: [{ action: 'contact-form', count: 3456 }] }
      ],
      exitPages: [
        { page: '/contact', visitors: 8234, exitRate: 65.2 },
        { page: '/services', visitors: 6789, exitRate: 45.8 }
      ],
      conversionPaths: [
        { path: ['/', '/emergency-restoration', '/contact'], conversions: 234, revenue: 46800 },
        { path: ['/', '/services', '/quote'], conversions: 189, revenue: 37800 }
      ],
      dropoffPoints: [
        { page: '/quote-form', stage: 'form_start', visitors: 5678, dropoffRate: 68.4 },
        { page: '/quote-form', stage: 'contact_info', visitors: 3456, dropoffRate: 45.2 }
      ]
    },
    territoryMetrics: [
      {
        territory: 'Sydney North',
        sessions: 8456,
        leads: 234,
        conversions: 145,
        conversionRate: 1.7,
        averageOrderValue: 2500,
        revenue: 362500
      },
      {
        territory: 'Melbourne Central',
        sessions: 7234,
        leads: 198,
        conversions: 123,
        conversionRate: 1.7,
        averageOrderValue: 2300,
        revenue: 282900
      }
    ],
    conversionFunnels: [
      {
        id: '1',
        name: 'Lead Generation Funnel',
        steps: [
          { name: 'Landing Page', url: '/', visits: 45672, exits: 18234, conversionRate: 60.1, avgTimeOnStep: 45 },
          { name: 'Service Page', url: '/emergency-restoration', visits: 27438, exits: 12456, conversionRate: 54.6, avgTimeOnStep: 125 },
          { name: 'Quote Form', url: '/quote', visits: 14982, exits: 8934, conversionRate: 40.4, avgTimeOnStep: 85 },
          { name: 'Form Completion', url: '/thank-you', visits: 6048, exits: 4314, conversionRate: 100, avgTimeOnStep: 25 }
        ],
        conversionRate: 13.2,
        dropoffRate: 86.8,
        totalConversions: 6048,
        revenue: 1209600
      }
    ],
    heatmaps: []
  };

  const formatNumber = (num: number) => new Intl.NumberFormat('en-AU').format(num);
  const formatCurrency = (num: number) => new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(num);
  const formatPercentage = (num: number) => `${num.toFixed(1)}%`;
  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const MetricCard = ({ title, value, change, icon, colour, subtitle }: {
    title: string;
    value: string;
    change?: { value: number; isPositive: boolean };
    icon: React.ReactNode;
    colour: string;
    subtitle?: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
          {change && (
            <div className="flex items-center mt-2">
              {change.isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                change.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {Math.abs(change.value)}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colour}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  const OverviewCards = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <MetricCard
        title="Total Sessions"
        value={formatNumber(mockAnalytics.googleAnalytics.sessions)}
        change={{ value: 12.5, isPositive: true }}
        icon={<Eye className="w-6 h-6 text-white" />}
        colour="bg-blue-500"
      />
      <MetricCard
        title="Users"
        value={formatNumber(mockAnalytics.googleAnalytics.users)}
        change={{ value: 8.3, isPositive: true }}
        icon={<Users className="w-6 h-6 text-white" />}
        colour="bg-green-500"
        subtitle={`${formatNumber(mockAnalytics.googleAnalytics.newUsers)} new users`}
      />
      <MetricCard
        title="Conversion Rate"
        value={formatPercentage(mockAnalytics.googleAnalytics.conversionRate)}
        change={{ value: 5.2, isPositive: true }}
        icon={<Target className="w-6 h-6 text-white" />}
        colour="bg-purple-500"
      />
      <MetricCard
        title="Avg Session Duration"
        value={formatDuration(mockAnalytics.googleAnalytics.avgSessionDuration)}
        change={{ value: 3.8, isPositive: false }}
        icon={<Clock className="w-6 h-6 text-white" />}
        colour="bg-orange-500"
      />
    </div>
  );

  const TrafficSources = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Traffic Sources</h3>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 text-sm font-medium text-gray-600">Source/Medium</th>
              <th className="text-right py-3 text-sm font-medium text-gray-600">Sessions</th>
              <th className="text-right py-3 text-sm font-medium text-gray-600">Users</th>
              <th className="text-right py-3 text-sm font-medium text-gray-600">Conv Rate</th>
              <th className="text-right py-3 text-sm font-medium text-gray-600">Revenue</th>
            </tr>
          </thead>
          <tbody>
            {mockAnalytics.googleAnalytics.trafficSources.map((source, index) => (
              <tr key={index} className="border-b border-gray-100">
                <td className="py-3">
                  <div>
                    <p className="font-medium text-gray-900">{source.source}</p>
                    <p className="text-sm text-gray-500">{source.medium}</p>
                  </div>
                </td>
                <td className="py-3 text-right font-medium">{formatNumber(source.sessions)}</td>
                <td className="py-3 text-right">{formatNumber(source.users)}</td>
                <td className="py-3 text-right">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    source.conversionRate >= 4 ? 'bg-green-100 text-green-800' :
                    source.conversionRate >= 3 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {formatPercentage(source.conversionRate)}
                  </span>
                </td>
                <td className="py-3 text-right font-medium">{formatCurrency(source.revenue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const DeviceBreakdown = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Device Performance</h3>
      <div className="space-y-4">
        {Object.entries(mockAnalytics.googleAnalytics.deviceBreakdown).map(([device, data]) => {
          const deviceIcons = {
            desktop: <Monitor className="w-5 h-5" />,
            mobile: <Smartphone className="w-5 h-5" />,
            tablet: <Tablet className="w-5 h-5" />
          };
          
          const totalSessions = Object.values(mockAnalytics.googleAnalytics.deviceBreakdown)
            .reduce((sum, d) => sum + d.sessions, 0);
          const percentage = (data.sessions / totalSessions) * 100;

          return (
            <div key={device} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg">
                  {deviceIcons[device as keyof typeof deviceIcons]}
                </div>
                <div>
                  <p className="font-medium text-gray-900 capitalize">{device}</p>
                  <p className="text-sm text-gray-500">{formatPercentage(percentage)} of traffic</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">{formatNumber(data.sessions)}</p>
                <p className="text-sm text-gray-500">{formatPercentage(data.conversionRate)} conv.</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const ConversionFunnelView = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Conversion Funnel Analysis</h3>
      {mockAnalytics.conversionFunnels.map(funnel => (
        <div key={funnel.id} className="mb-8">
          <div className="flex justify-between items-center mb-4">
            <h4 className="font-medium text-gray-900">{funnel.name}</h4>
            <div className="text-right">
              <p className="text-sm text-gray-600">Overall Conversion Rate</p>
              <p className="text-2xl font-bold text-gray-900">{formatPercentage(funnel.conversionRate)}</p>
            </div>
          </div>
          
          <div className="space-y-4">
            {funnel.steps.map((step, index) => {
              const isLastStep = index === funnel.steps.length - 1;
              const nextStep = funnel.steps[index + 1];
              const dropoffRate = nextStep ? 
                ((step.visits - nextStep.visits) / step.visits) * 100 : 0;

              return (
                <div key={step.name} className="relative">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{step.name}</p>
                        <p className="text-sm text-gray-500">{step.url}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">{formatNumber(step.visits)}</p>
                      <p className="text-sm text-gray-500">visitors</p>
                    </div>
                  </div>
                  
                  {!isLastStep && (
                    <div className="flex justify-center my-2">
                      <div className="flex items-center space-x-2 px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs">
                        <TrendingDown className="w-3 h-3" />
                        <span>{formatPercentage(dropoffRate)} dropout</span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">{formatNumber(funnel.totalConversions)}</p>
              <p className="text-sm text-gray-600">Total Conversions</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-red-600">{formatPercentage(funnel.dropoffRate)}</p>
              <p className="text-sm text-gray-600">Dropoff Rate</p>
            </div>
            <div className="p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(funnel.revenue)}</p>
              <p className="text-sm text-gray-600">Revenue</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const TerritoryPerformance = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Territory Performance</h3>
      <div className="space-y-4">
        {mockAnalytics.territoryMetrics.map(territory => (
          <div key={territory.territory} className="p-4 border border-gray-200 rounded-lg">
            <div className="flex justify-between items-start mb-3">
              <div className="flex items-center space-x-2">
                <MapPin className="w-5 h-5 text-gray-400" />
                <h4 className="font-medium text-gray-900">{territory.territory}</h4>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                territory.conversionRate >= 2 ? 'bg-green-100 text-green-800' :
                territory.conversionRate >= 1.5 ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {formatPercentage(territory.conversionRate)} conv.
              </span>
            </div>
            
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Sessions</p>
                <p className="font-medium">{formatNumber(territory.sessions)}</p>
              </div>
              <div>
                <p className="text-gray-600">Leads</p>
                <p className="font-medium">{formatNumber(territory.leads)}</p>
              </div>
              <div>
                <p className="text-gray-600">Conversions</p>
                <p className="font-medium">{formatNumber(territory.conversions)}</p>
              </div>
              <div>
                <p className="text-gray-600">Revenue</p>
                <p className="font-medium">{formatCurrency(territory.revenue)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const GeographicData = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Geographic Performance</h3>
      <div className="space-y-3">
        {mockAnalytics.googleAnalytics.geographicData.map((location, index) => (
          <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Globe className="w-5 h-5 text-gray-400" />
              <div>
                <p className="font-medium text-gray-900">{location.city}, {location.region}</p>
                <p className="text-sm text-gray-500">{formatNumber(location.sessions)} sessions</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-medium text-gray-900">{formatCurrency(location.revenue)}</p>
              <p className="text-sm text-gray-500">{formatNumber(location.conversions)} conv.</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Website Analytics</h1>
          <p className="text-gray-600 mt-2">
            Track website performance and visitor behaviour across all territories
          </p>
        </div>
        <div className="flex space-x-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value as typeof selectedPeriod)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="day">Last 24 Hours</option>
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 90 Days</option>
          </select>
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colours">
            <RefreshCw className="w-4 h-4 mr-2 inline" />
            Refresh
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours">
            <Download className="w-4 h-4 mr-2 inline" />
            Export
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8">
            {[
              { key: 'overview', label: 'Overview', icon: <BarChart3 className="w-4 h-4" /> },
              { key: 'funnel', label: 'Conversion Funnel', icon: <Target className="w-4 h-4" /> },
              { key: 'territory', label: 'Territory Analysis', icon: <MapPin className="w-4 h-4" /> },
              { key: 'flow', label: 'Visitor Flow', icon: <Activity className="w-4 h-4" /> }
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

      {selectedView === 'overview' && (
        <>
          <OverviewCards />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <TrafficSources />
            <DeviceBreakdown />
          </div>
          <GeographicData />
        </>
      )}

      {selectedView === 'funnel' && <ConversionFunnelView />}
      {selectedView === 'territory' && <TerritoryPerformance />}
      {selectedView === 'flow' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <p className="text-gray-600">Visitor flow visualization would be implemented here</p>
        </div>
      )}
    </div>
  );
}
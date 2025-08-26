'use client';

import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Award,
  Calendar,
  Clock,
  Target,
  Eye,
  MousePointer,
  CheckCircle,
  AlertTriangle,
  Bell,
  Settings,
  Download,
  Share2,
  ExternalLink,
  Zap,
  Star,
  ThumbsUp,
  MessageSquare,
  Activity,
  CreditCard,
  Package,
  Briefcase,
  PieChart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Filter,
  RefreshCw
} from 'lucide-react';
import type { 
  PartnerDashboard as DashboardData,
  PartnerPerformance,
  ChartData,
  PartnerActivity,
  Announcement
} from '@/types/partner-affiliate';

export default function PartnerDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState<'today' | 'week' | 'month' | 'quarter' | 'year'>('month');
  const [showAnnouncements, setShowAnnouncements] = useState(true);

  const mockDashboard: DashboardData = {
    overview: {
      status: 'active',
      tier: 'gold',
      nextTierProgress: 68,
      complianceScore: 92
    },
    earnings: {
      pending: 2800,
      approved: 4700,
      paid: 18500,
      lifetime: 67500,
      nextPayout: {
        amount: 2800,
        date: new Date('2024-04-01')
      }
    },
    performance: {
      period: selectedPeriod,
      metrics: {
        revenue: 24000,
        leads: 18,
        conversions: 12,
        clicks: 345,
        conversionRate: 6.9,
        averageOrderValue: 2000,
        customerLifetimeValue: 8500
      },
      charts: {
        revenue: [
          { date: new Date('2024-01-01'), value: 15000 },
          { date: new Date('2024-02-01'), value: 18000 },
          { date: new Date('2024-03-01'), value: 24000 }
        ],
        conversions: [
          { date: new Date('2024-01-01'), value: 8 },
          { date: new Date('2024-02-01'), value: 10 },
          { date: new Date('2024-03-01'), value: 12 }
        ],
        traffic: [
          { date: new Date('2024-01-01'), value: 280 },
          { date: new Date('2024-02-01'), value: 315 },
          { date: new Date('2024-03-01'), value: 345 }
        ]
      }
    },
    activities: [
      {
        id: '1',
        type: 'sale',
        description: 'New equipment sale - Industrial dehumidifier',
        date: new Date('2024-03-15'),
        value: 2500,
        status: 'completed'
      },
      {
        id: '2',
        type: 'commission',
        description: 'Commission payment processed',
        date: new Date('2024-03-01'),
        value: 4700,
        status: 'paid'
      },
      {
        id: '3',
        type: 'lead',
        description: 'New lead inquiry from Melbourne contractor',
        date: new Date('2024-02-28'),
        status: 'pending'
      },
      {
        id: '4',
        type: 'promotion',
        description: 'Spring sale promotion activated',
        date: new Date('2024-02-15'),
        status: 'active'
      }
    ],
    announcements: [
      {
        id: '1',
        title: 'New Commission Structure Available',
        message: 'We\'ve updated our commission tiers. Gold partners now earn up to 22% on equipment sales.',
        type: 'info',
        date: new Date('2024-03-10'),
        read: false,
        actionUrl: '/commission-structure',
        actionLabel: 'View Details'
      },
      {
        id: '2',
        title: 'Upcoming Partner Event',
        message: 'Join us for the Annual Partner Conference on April 15th. Register now for early bird pricing.',
        type: 'success',
        date: new Date('2024-03-05'),
        read: true,
        actionUrl: '/events/partner-conference-2024',
        actionLabel: 'Register'
      }
    ]
  };

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);

  const formatNumber = (num: number) => 
    new Intl.NumberFormat('en-AU').format(num);

  const tierColors = {
    bronze: 'from-orange-400 to-orange-600',
    silver: 'from-gray-400 to-gray-600',
    gold: 'from-yellow-400 to-yellow-600',
    platinum: 'from-purple-400 to-purple-600'
  };

  const activityIcons = {
    sale: <Package className="w-5 h-5" />,
    commission: <DollarSign className="w-5 h-5" />,
    lead: <Users className="w-5 h-5" />,
    promotion: <Zap className="w-5 h-5" />,
    event: <Calendar className="w-5 h-5" />
  };

  const StatusCard = ({ title, value, change, icon, color }: {
    title: string;
    value: string | number;
    change?: { value: number; isPositive: boolean };
    icon: React.ReactNode;
    color: string;
  }) => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            {typeof value === 'number' ? formatCurrency(value) : value}
          </p>
          {change && (
            <div className="flex items-center mt-2">
              {change.isPositive ? (
                <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                change.isPositive ? 'text-green-600' : 'text-red-600'
              }`}>
                {change.value}%
              </span>
              <span className="text-sm text-gray-500 ml-1">vs last period</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Partner Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back! Here's your performance overview</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Download className="w-4 h-4 mr-2 inline" />
            Export Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Settings className="w-4 h-4 mr-2 inline" />
            Settings
          </button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tierColors[mockDashboard.overview.tier]} flex items-center justify-center`}>
              <Award className="w-6 h-6 text-white" />
            </div>
            <span className="text-sm font-medium text-gray-600">Status</span>
          </div>
          <p className="text-2xl font-bold text-gray-900 capitalize">
            {mockDashboard.overview.tier} Partner
          </p>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span className="text-gray-600">Next Tier Progress</span>
              <span className="font-medium">{mockDashboard.overview.nextTierProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-purple-600 h-2 rounded-full transition-all duration-500"
                style={{ width: `${mockDashboard.overview.nextTierProgress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">
              {100 - mockDashboard.overview.nextTierProgress}% to Platinum
            </p>
          </div>
        </div>

        <StatusCard
          title="Pending Earnings"
          value={mockDashboard.earnings.pending}
          icon={<Clock className="w-6 h-6 text-white" />}
          color="bg-orange-500"
        />

        <StatusCard
          title="This Month"
          value={mockDashboard.earnings.approved}
          change={{ value: 31, isPositive: true }}
          icon={<TrendingUp className="w-6 h-6 text-white" />}
          color="bg-green-500"
        />

        <StatusCard
          title="Lifetime Earnings"
          value={mockDashboard.earnings.lifetime}
          icon={<Award className="w-6 h-6 text-white" />}
          color="bg-purple-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Performance Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Performance Overview</h3>
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value as typeof selectedPeriod)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
                <option value="quarter">This Quarter</option>
                <option value="year">This Year</option>
              </select>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {formatCurrency(mockDashboard.performance.metrics.revenue)}
                </p>
                <p className="text-sm text-gray-600">Revenue</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {mockDashboard.performance.metrics.leads}
                </p>
                <p className="text-sm text-gray-600">Leads</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {mockDashboard.performance.metrics.conversions}
                </p>
                <p className="text-sm text-gray-600">Conversions</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">
                  {mockDashboard.performance.metrics.conversionRate}%
                </p>
                <p className="text-sm text-gray-600">Conv. Rate</p>
              </div>
            </div>

            <div className="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
              <div className="text-center">
                <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Performance chart visualization</p>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
                <Plus className="w-6 h-6 text-blue-600 mb-2" />
                <p className="font-medium text-gray-900">Create Campaign</p>
                <p className="text-sm text-gray-500">Launch new marketing campaign</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:border-green-300 hover:bg-green-50 transition-colors text-left">
                <Target className="w-6 h-6 text-green-600 mb-2" />
                <p className="font-medium text-gray-900">View Analytics</p>
                <p className="text-sm text-gray-500">Detailed performance insights</p>
              </button>
              <button className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-colors text-left">
                <Share2 className="w-6 h-6 text-purple-600 mb-2" />
                <p className="font-medium text-gray-900">Share Links</p>
                <p className="text-sm text-gray-500">Get tracking links</p>
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Next Payout */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Payout</h3>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-600 mb-2">
                {formatCurrency(mockDashboard.earnings.nextPayout.amount)}
              </p>
              <p className="text-sm text-gray-600 mb-4">
                Scheduled for {mockDashboard.earnings.nextPayout.date.toLocaleDateString('en-AU')}
              </p>
              <div className="flex items-center justify-center text-sm text-gray-500">
                <CreditCard className="w-4 h-4 mr-2" />
                EFT to account ending in 4567
              </div>
            </div>
          </div>

          {/* Compliance Score */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Compliance</h3>
              <span className="text-sm font-medium text-green-600">
                {mockDashboard.overview.complianceScore}%
              </span>
            </div>
            <div className="relative pt-1">
              <div className="flex mb-2 items-center justify-between">
                <div>
                  <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-green-600 bg-green-200">
                    Excellent
                  </span>
                </div>
              </div>
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-200">
                <div 
                  style={{ width: `${mockDashboard.overview.complianceScore}%` }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-500"
                />
              </div>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Insurance Valid</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Licenses Current</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Agreement Signed</span>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
            </div>
          </div>

          {/* Announcements */}
          {showAnnouncements && mockDashboard.announcements.length > 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Announcements</h3>
                <button 
                  onClick={() => setShowAnnouncements(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ×
                </button>
              </div>
              <div className="space-y-4">
                {mockDashboard.announcements.slice(0, 2).map(announcement => (
                  <div 
                    key={announcement.id}
                    className={`p-4 rounded-lg border-l-4 ${
                      announcement.type === 'info' ? 'bg-blue-50 border-blue-400' :
                      announcement.type === 'success' ? 'bg-green-50 border-green-400' :
                      announcement.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
                      'bg-red-50 border-red-400'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-medium text-gray-900">{announcement.title}</h4>
                      {!announcement.read && (
                        <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-3">{announcement.message}</p>
                    {announcement.actionUrl && (
                      <button className="text-sm font-medium text-blue-600 hover:text-blue-700">
                        {announcement.actionLabel} →
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activity</h3>
              <RefreshCw className="w-4 h-4 text-gray-400" />
            </div>
            <div className="space-y-4">
              {mockDashboard.activities.slice(0, 5).map(activity => (
                <div key={activity.id} className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {activityIcons[activity.type]}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {activity.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      {activity.date.toLocaleDateString('en-AU')}
                    </p>
                    {activity.value && (
                      <p className="text-sm font-medium text-green-600">
                        +{formatCurrency(activity.value)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
              View All Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
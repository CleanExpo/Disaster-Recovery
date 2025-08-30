'use client';

import React, { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Calendar,
  Download,
  Eye,
  Clock,
  CheckCircle,
  AlertTriangle,
  XCircle,
  BarChart3,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Filter,
  Search,
  FileText,
  CreditCard,
  Receipt,
  Target,
  Award,
  Percent,
  Users,
  Activity
} from 'lucide-react';
import type {
  Commission,
  AffiliateTransaction,
  PartnerPerformance,
  CommissionStructure
} from '@/types/partner-affiliate';

export default function CommissionTracking() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showTransactionDetails, setShowTransactionDetails] = useState<string | null>(null);

  const mockCommissionStructure: CommissionStructure = {
    type: 'tiered',
    baseRate: 15,
    tiers: [
      { id: '1', name: 'Bronze', threshold: 0, rate: 15, type: 'revenue' },
      { id: '2', name: 'Silver', threshold: 10000, rate: 18, type: 'revenue' },
      { id: '3', name: 'Gold', threshold: 50000, rate: 22, type: 'revenue' },
      { id: '4', name: 'Platinum', threshold: 100000, rate: 25, type: 'revenue' }
    ],
    bonuses: [
      {
        id: '1',
        name: 'Q1 Performance Bonus',
        type: 'performance',
        amount: 500,
        isPercentage: false,
        conditions: 'Exceed 20% growth',
        validFrom: new Date('2024-01-01'),
        validTo: new Date('2024-03-31'),
        applied: true
      }
    ],
    minimumPayout: 100,
    payoutFrequency: 'monthly',
    nextPayoutDate: new Date('2024-04-01'),
    autoApprove: false,
    terms: 'Standard partner agreement terms apply'
  };

  const mockCommissions: Commission[] = [
    {
      id: '1',
      partnerId: 'partner-1',
      period: {
        start: new Date('2024-03-01'),
        end: new Date('2024-03-31')
      },
      status: 'paid',
      revenue: {
        gross: 25000,
        net: 24000,
        refunds: 1000,
        adjustments: 0
      },
      commission: {
        base: 4200,
        bonuses: 500,
        deductions: 0,
        total: 4700
      },
      transactions: [],
      paidDate: new Date('2024-04-01'),
      paymentReference: 'PAY-2024-001'
    },
    {
      id: '2',
      partnerId: 'partner-1',
      period: {
        start: new Date('2024-02-01'),
        end: new Date('2024-02-29')
      },
      status: 'approved',
      revenue: {
        gross: 18000,
        net: 17500,
        refunds: 500,
        adjustments: 0
      },
      commission: {
        base: 2800,
        bonuses: 0,
        deductions: 0,
        total: 2800
      },
      transactions: []
    },
    {
      id: '3',
      partnerId: 'partner-1',
      period: {
        start: new Date('2024-01-01'),
        end: new Date('2024-01-31')
      },
      status: 'pending',
      revenue: {
        gross: 32000,
        net: 31200,
        refunds: 800,
        adjustments: 0
      },
      commission: {
        base: 5600,
        bonuses: 1000,
        deductions: 0,
        total: 6600
      },
      transactions: []
    }
  ];

  const mockTransactions: AffiliateTransaction[] = [
    {
      id: '1',
      date: new Date('2024-03-15'),
      type: 'sale',
      description: 'Equipment purchase - Industrial dehumidifier',
      customer: {
        id: 'cust-1',
        name: 'Sydney Restoration Co',
        email: 'contact@sydneyrest.com'
      },
      amount: 5500,
      commission: 825,
      status: 'approved',
      trackingCode: 'REF-SRC-2024-001',
      source: 'website'
    },
    {
      id: '2',
      date: new Date('2024-03-10'),
      type: 'lead',
      description: 'Training course inquiry - IICRC WRT',
      customer: {
        id: 'cust-2',
        name: 'Melbourne Water Damage Pros',
        email: 'info@melbournewater.com.au'
      },
      amount: 850,
      commission: 127.50,
      status: 'approved',
      trackingCode: 'REF-MWP-2024-002'
    },
    {
      id: '3',
      date: new Date('2024-03-05'),
      type: 'signup',
      description: 'New contractor registration',
      amount: 0,
      commission: 50,
      status: 'pending',
      trackingCode: 'REF-NEW-2024-003'
    }
  ];

  const mockPerformance: PartnerPerformance = {
    lifetime: {
      revenue: 285000,
      leads: 145,
      conversions: 89,
      clicks: 2450,
      conversionRate: 6.1,
      averageOrderValue: 3200,
      customerLifetimeValue: 8500
    },
    currentPeriod: {
      revenue: 24000,
      leads: 12,
      conversions: 8,
      clicks: 180,
      conversionRate: 6.7,
      averageOrderValue: 3000,
      customerLifetimeValue: 8200
    },
    lastPeriod: {
      revenue: 18000,
      leads: 9,
      conversions: 6,
      clicks: 145,
      conversionRate: 6.2,
      averageOrderValue: 3000,
      customerLifetimeValue: 8000
    },
    trends: {
      revenue: 33.3,
      conversions: 33.3,
      leads: 33.3,
      clicks: 24.1
    },
    ranking: {
      overall: 5,
      category: 2,
      tier: 1
    },
    achievements: []
  };

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-800',
    approved: 'bg-blue-100 text-blue-800',
    paid: 'bg-green-100 text-green-800',
    disputed: 'bg-red-100 text-red-800',
    cancelled: 'bg-gray-100 text-gray-800'
  };

  const statusIcons = {
    pending: <Clock className="w-4 h-4" />,
    approved: <CheckCircle className="w-4 h-4" />,
    paid: <CreditCard className="w-4 h-4" />,
    disputed: <AlertTriangle className="w-4 h-4" />,
    cancelled: <XCircle className="w-4 h-4" />
  };

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(amount);

  const filteredCommissions = mockCommissions.filter(commission => {
    if (selectedStatus !== 'all' && commission.status !== selectedStatus) return false;
    return true;
  });

  const totalEarnings = {
    pending: mockCommissions
      .filter(c => c.status === 'pending')
      .reduce((sum, c) => sum + c.commission.total, 0),
    approved: mockCommissions
      .filter(c => c.status === 'approved')
      .reduce((sum, c) => sum + c.commission.total, 0),
    paid: mockCommissions
      .filter(c => c.status === 'paid')
      .reduce((sum, c) => sum + c.commission.total, 0),
    lifetime: mockCommissions
      .reduce((sum, c) => sum + c.commission.total, 0)
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Commission Tracking</h1>
        <p className="text-gray-600 mt-2">
          Track your affiliate earnings, payouts, and performance metrics
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-centre justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-orange-600">{formatCurrency(totalEarnings.pending)}</p>
            </div>
            <div className="p-3 bg-orange-100 rounded-lg">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
          </div>
          <div className="mt-2 flex items-centre text-sm">
            <span className="text-gray-500">Next payout: April 1</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-centre justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">This Month</p>
              <p className="text-2xl font-bold text-blue-600">{formatCurrency(totalEarnings.approved)}</p>
            </div>
            <div className="p-3 bg-blue-100 rounded-lg">
              <CheckCircle className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <div className="mt-2 flex items-centre text-sm">
            <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
            <span className="text-green-500">+{mockPerformance.trends.revenue}%</span>
            <span className="text-gray-500 ml-1">vs last month</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-centre justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Paid Out</p>
              <p className="text-2xl font-bold text-green-600">{formatCurrency(totalEarnings.paid)}</p>
            </div>
            <div className="p-3 bg-green-100 rounded-lg">
              <CreditCard className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <div className="mt-2 flex items-centre text-sm">
            <span className="text-gray-500">Last payment: April 1</span>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-centre justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Lifetime Total</p>
              <p className="text-2xl font-bold text-purple-600">{formatCurrency(totalEarnings.lifetime)}</p>
            </div>
            <div className="p-3 bg-purple-100 rounded-lg">
              <Award className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <div className="mt-2 flex items-centre text-sm">
            <span className="text-gray-500">{mockCommissions.length} payouts</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Commission Structure */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Commission Structure</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-centre">
                <span className="text-sm text-gray-600">Base Rate:</span>
                <span className="font-medium">{mockCommissionStructure.baseRate}%</span>
              </div>
              <div className="flex justify-between items-centre">
                <span className="text-sm text-gray-600">Current Tier:</span>
                <span className="font-medium text-blue-600">Silver (18%)</span>
              </div>
              <div className="flex justify-between items-centre">
                <span className="text-sm text-gray-600">Next Tier:</span>
                <span className="font-medium text-purple-600">Gold (22%)</span>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex justify-between text-sm mb-2">
                <span>Progress to Gold Tier</span>
                <span>$24K / $50K</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${(24000 / 50000) * 100}%` }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                $26K more to unlock 22% commission rate
              </p>
            </div>

            <div className="mt-6 p-3 bg-green-50 rounded-lg">
              <div className="flex items-centre">
                <Award className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm font-medium text-green-800">Active Bonus</span>
              </div>
              <p className="text-sm text-green-700 mt-1">
                Q1 Performance Bonus: +$500 applied
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Metrics</h3>
            
            <div className="space-y-4">
              <div className="flex justify-between items-centre">
                <span className="text-sm text-gray-600">Conversion Rate:</span>
                <span className="font-medium">{mockPerformance.currentPeriod.conversionRate}%</span>
              </div>
              <div className="flex justify-between items-centre">
                <span className="text-sm text-gray-600">Avg Order Value:</span>
                <span className="font-medium">{formatCurrency(mockPerformance.currentPeriod.averageOrderValue)}</span>
              </div>
              <div className="flex justify-between items-centre">
                <span className="text-sm text-gray-600">Total Clicks:</span>
                <span className="font-medium">{mockPerformance.currentPeriod.clicks.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-centre">
                <span className="text-sm text-gray-600">Conversions:</span>
                <span className="font-medium">{mockPerformance.currentPeriod.conversions}</span>
              </div>
            </div>

            <div className="mt-6 p-3 bg-blue-50 rounded-lg">
              <div className="flex items-centre justify-between">
                <span className="text-sm font-medium text-blue-800">Partner Ranking</span>
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div className="mt-2 space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700">Overall:</span>
                  <span className="font-medium text-blue-900">#5 of 150</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-blue-700">Category:</span>
                  <span className="font-medium text-blue-900">#2 of 25</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Commission History & Transactions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex justify-between items-centre mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Commission History</h3>
              <div className="flex space-x-3">
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="paid">Paid</option>
                  <option value="disputed">Disputed</option>
                </select>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 flex items-centre">
                  <Download className="w-4 h-4 mr-2" />
                  Export
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Period</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Revenue</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Commission</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-600">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCommissions.map(commission => (
                    <tr key={commission.id} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {commission.period.start.toLocaleDateString('en-AU', { 
                              month: 'short', 
                              year: 'numeric' 
                            })}
                          </p>
                          <p className="text-xs text-gray-500">
                            {commission.period.start.toLocaleDateString('en-AU')} - {commission.period.end.toLocaleDateString('en-AU')}
                          </p>
                        </div>
                      </td>
                      <td className="py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatCurrency(commission.revenue.net)}
                          </p>
                          <p className="text-xs text-gray-500">
                            Gross: {formatCurrency(commission.revenue.gross)}
                          </p>
                        </div>
                      </td>
                      <td className="py-4">
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {formatCurrency(commission.commission.total)}
                          </p>
                          {commission.commission.bonuses > 0 && (
                            <p className="text-xs text-green-600">
                              +{formatCurrency(commission.commission.bonuses)} bonus
                            </p>
                          )}
                        </div>
                      </td>
                      <td className="py-4">
                        <span className={`inline-flex items-centre px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[commission.status]}`}>
                          {statusIcons[commission.status]}
                          <span className="ml-1 capitalize">{commission.status}</span>
                        </span>
                      </td>
                      <td className="py-4">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => setShowTransactionDetails(commission.id)}
                            className="text-gray-400 hover:text-blue-600"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-600">
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Transactions</h3>
            
            <div className="space-y-4">
              {mockTransactions.map(transaction => (
                <div key={transaction.id} className="flex items-start justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-centre space-x-2 mb-1">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        transaction.type === 'sale' ? 'bg-green-100 text-green-800' :
                        transaction.type === 'lead' ? 'bg-blue-100 text-blue-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {transaction.type.toUpperCase()}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[transaction.status]}`}>
                        {transaction.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-900">{transaction.description}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {transaction.customer?.name} • {transaction.date.toLocaleDateString('en-AU')}
                    </p>
                    {transaction.trackingCode && (
                      <p className="text-xs text-gray-400 mt-1">
                        Tracking: {transaction.trackingCode}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">
                      {formatCurrency(transaction.commission)}
                    </p>
                    <p className="text-xs text-gray-500">
                      on {formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 text-centre">
              <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
                View All Transactions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
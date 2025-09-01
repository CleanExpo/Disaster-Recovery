'use client';

import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  Award, 
  Clock, 
  CheckCircle2, 
  XCircle,
  AlertTriangle,
  Star,
  DollarSign,
  Users,
  Calendar,
  Target,
  Activity,
  BarChart3,
  PieChart,
  Filter,
  Download,
  RefreshCw
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart as RePieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar
} from 'recharts';

interface KPIMetric {
  id: string;
  name: string;
  value: number;
  target: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: number;
  status: 'excellent' | 'good' | 'warning' | 'critical';
  category: 'performance' | 'quality' | 'efficiency' | 'customer';
}

interface JobKPI {
  jobId: string;
  bookingId: string;
  customerName: string;
  serviceType: string;
  kpis: {
    responseTime: number;
    arrivalTime: number;
    completionTime: number;
    customerRating?: number;
    photosTaken: number;
    reportSubmitted: boolean;
    insuranceApproved: boolean;
  };
  status: 'completed' | 'in_progress' | 'pending';
  completedAt?: string;
  paymentReleased: number;
}

export default function KPITrackingPage() {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [kpiMetrics, setKpiMetrics] = useState<KPIMetric[]>([]);
  const [recentJobs, setRecentJobs] = useState<JobKPI[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock KPI data
  const mockKPIMetrics: KPIMetric[] = [
    {
      id: 'response-time',
      name: 'Avg Response Time',
      value: 18,
      target: 30,
      unit: 'min',
      trend: 'down',
      trendValue: -15,
      status: 'excellent',
      category: 'performance'
    },
    {
      id: 'completion-rate',
      name: 'Job Completion Rate',
      value: 96.5,
      target: 95,
      unit: '%',
      trend: 'up',
      trendValue: 2.3,
      status: 'excellent',
      category: 'performance'
    },
    {
      id: 'customer-satisfaction',
      name: 'Customer Satisfaction',
      value: 4.8,
      target: 4.5,
      unit: '/5',
      trend: 'up',
      trendValue: 0.2,
      status: 'excellent',
      category: 'customer'
    },
    {
      id: 'first-time-fix',
      name: 'First Time Fix Rate',
      value: 88,
      target: 85,
      unit: '%',
      trend: 'stable',
      trendValue: 0,
      status: 'good',
      category: 'efficiency'
    },
    {
      id: 'documentation-quality',
      name: 'Documentation Quality',
      value: 92,
      target: 90,
      unit: '%',
      trend: 'up',
      trendValue: 5,
      status: 'good',
      category: 'quality'
    },
    {
      id: 'payment-release',
      name: 'Payment Release Rate',
      value: 94,
      target: 90,
      unit: '%',
      trend: 'up',
      trendValue: 3,
      status: 'excellent',
      category: 'efficiency'
    }
  ];

  // Performance trend data
  const performanceTrend = [
    { month: 'Jan', responseTime: 25, completionRate: 92, satisfaction: 4.5 },
    { month: 'Feb', responseTime: 23, completionRate: 93, satisfaction: 4.6 },
    { month: 'Mar', responseTime: 22, completionRate: 94, satisfaction: 4.6 },
    { month: 'Apr', responseTime: 20, completionRate: 95, satisfaction: 4.7 },
    { month: 'May', responseTime: 19, completionRate: 96, satisfaction: 4.8 },
    { month: 'Jun', responseTime: 18, completionRate: 96.5, satisfaction: 4.8 },
  ];

  // Job category distribution
  const jobDistribution = [
    { name: 'Water Damage', value: 45, colour: '#3B82F6' },
    { name: 'Fire Damage', value: 20, colour: '#EF4444' },
    { name: 'Storm Damage', value: 15, colour: '#8B5CF6' },
    { name: 'Mould Remediation', value: 12, colour: '#10B981' },
    { name: 'Other', value: 8, colour: '#6B7280' },
  ];

  // KPI achievement radar data
  const radarData = [
    { metric: 'Response', A: 95, fullMark: 100 },
    { metric: 'Quality', A: 92, fullMark: 100 },
    { metric: 'Efficiency', A: 88, fullMark: 100 },
    { metric: 'Customer', A: 96, fullMark: 100 },
    { metric: 'Documentation', A: 90, fullMark: 100 },
  ];

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      setKpiMetrics(mockKPIMetrics);
      setRecentJobs([
        {
          jobId: 'JOB-001',
          bookingId: 'NRP-2024-ABC123',
          customerName: 'John Smith',
          serviceType: 'Water Damage',
          kpis: {
            responseTime: 15,
            arrivalTime: 45,
            completionTime: 180,
            customerRating: 5,
            photosTaken: 25,
            reportSubmitted: true,
            insuranceApproved: true },
          status: 'completed',
          completedAt: '2024-06-15',
          paymentReleased: 2200 },
        {
          jobId: 'JOB-002',
          bookingId: 'NRP-2024-DEF456',
          customerName: 'Sarah Johnson',
          serviceType: 'Fire Damage',
          kpis: {
            responseTime: 20,
            arrivalTime: 50,
            completionTime: 240,
            customerRating: 4.5,
            photosTaken: 30,
            reportSubmitted: true,
            insuranceApproved: false },
          status: 'in_progress',
          paymentReleased: 1100 },
      ]);
      setLoading(false);
    }, 1000);
  }, [timeRange]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent': return 'text-green-600 bg-green-100';
      case 'good': return 'text-blue-600 bg-blue-100';
      case 'warning': return 'text-yellow-600 bg-yellow-100';
      case 'critical': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading KPI metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">KPI Performance Dashboard</h1>
          <p className="text-gray-600">Track your performance metrics and earn more with better KPIs</p>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="week">Last Week</option>
                <option value="month">Last Month</option>
                <option value="quarter">Last Quarter</option>
                <option value="year">Last Year</option>
              </select>
              
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Categories</option>
                <option value="performance">Performance</option>
                <option value="quality">Quality</option>
                <option value="efficiency">Efficiency</option>
                <option value="customer">Customer</option>
              </select>
            </div>
            
            <div className="flex items-center gap-2">
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colours">
                <RefreshCw className="h-5 w-5" />
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colours flex items-center gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* KPI Score Overview */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 mb-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold mb-2">Overall KPI Score</h2>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-bold">92.5</span>
                <span className="text-xl">/100</span>
              </div>
              <p className="mt-2 text-blue-100">Excellent Performance - Top 10% of contractors</p>
            </div>
            <div className="text-right">
              <Award className="h-16 w-16 text-yellow-300 mb-2" />
              <p className="text-sm text-blue-100">Gold Status</p>
            </div>
          </div>
        </div>

        {/* KPI Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {kpiMetrics.map((metric) => (
            <div key={metric.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{metric.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <span className="text-sm text-gray-500">{metric.unit}</span>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                  {metric.status}
                </span>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-2">
                  {getTrendIcon(metric.trend)}
                  <span className={`text-sm font-medium ${
                    metric.trend === 'up' ? 'text-green-600' : 
                    metric.trend === 'down' ? 'text-red-600' : 
                    'text-gray-600'
                  }`}>
                    {metric.trendValue > 0 ? '+' : ''}{metric.trendValue}%
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  Target: {metric.target}{metric.unit}
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      metric.status === 'excellent' ? 'bg-green-500' :
                      metric.status === 'good' ? 'bg-blue-500' :
                      metric.status === 'warning' ? 'bg-blue-600' :
                      'bg-red-500'
                    }`}
                    style={{ width: `${Math.min((metric.value / metric.target) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Performance Trend Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceTrend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="responseTime" 
                  stroke="#3B82F6" 
                  name="Response Time (min)"
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="completionRate" 
                  stroke="#10B981" 
                  name="Completion Rate (%)"
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Job Distribution Pie Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <RePieChart>
                <Pie
                  data={jobDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={(entry) => `${entry.name}: ${entry.value}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {jobDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.colour} />
                  ))}
                </Pie>
                <Tooltip />
              </RePieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Jobs KPI Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b">
            <h3 className="text-lg font-semibold text-gray-900">Recent Job Performance</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Response
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    KPIs Met
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentJobs.map((job) => {
                  const kpisCount = Object.values(job.kpis).filter(v => v === true).length + 
                                   (job.kpis.customerRating && job.kpis.customerRating >= 4 ? 1 : 0);
                  const totalKpis = 7;
                  
                  return (
                    <tr key={job.jobId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {job.jobId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.serviceType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {job.kpis.responseTime} min
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-blue-500 fill-current" />
                          <span className="text-sm text-gray-900">
                            {job.kpis.customerRating || 'Pending'}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-500 h-2 rounded-full"
                              style={{ width: `${(kpisCount / totalKpis) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {kpisCount}/{totalKpis}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${job.paymentReleased}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          job.status === 'completed' ? 'bg-green-100 text-green-800' :
                          job.status === 'in_progress' ? 'bg-blue-100 text-blue-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {job.status.replace('_', ' ')}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* KPI Tips */}
        <div className="mt-6 bg-blue-50 border-2 border-blue-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Tips to Improve Your KPIs
          </h3>
          <ul className="space-y-2 text-blue-800">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>Respond to job notifications within 15 minutes for emergency calls</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>Take comprehensive photos before, during, and after work</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>Submit detailed reports within 24 hours of job completion</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>Maintain clear communication with customers throughout the job</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span>Complete all required documentation for insurance approval</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
'use client';

import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';
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
  RefreshCw,
} from 'lucide-react';

// C5 CWV win: recharts (~200 KB+) is split out via `next/dynamic({ ssr: false })`.
// The parent contractor route bundle no longer ships recharts; it loads in a
// separate chunk after hydration. See ./Charts.tsx for the extracted subtree.
const PerformanceTrendChart = dynamic(
  () => import('./Charts').then((m) => m.PerformanceTrendChart),
  { ssr: false },
);
const JobDistributionChart = dynamic(() => import('./Charts').then((m) => m.JobDistributionChart), {
  ssr: false,
});

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
  paymentReleased: number; // Path A: indicative billed-to-client amount (not DR escrow release)
}

function KPITrackingPageOriginal() {
  const router = useRouter();
  const [timeRange, setTimeRange] = useState('month');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [kpiMetrics, setKpiMetrics] = useState<KPIMetric[]>([]);
  const [recentJobs, setRecentJobs] = useState<JobKPI[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Charts stay empty until historical KPI series exists in the API
  const performanceTrend: Array<{
    month: string;
    responseTime: number;
    completionRate: number;
    satisfaction: number;
  }> = [];
  const jobDistribution: Array<{ name: string; value: number; colour: string }> = [];

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setLoadError(null);
      try {
        const meRes = await fetch('/api/auth/me', { credentials: 'include' });
        if (!meRes.ok) {
          router.push('/contractor/login');
          return;
        }
        const me = await meRes.json();
        if (!me.authenticated || me.user?.role !== 'CONTRACTOR') {
          router.push('/contractor/login');
          return;
        }

        const [dashRes, jobsRes] = await Promise.all([
          fetch('/api/contractor/dashboard', { credentials: 'include' }),
          fetch('/api/contractor/jobs', { credentials: 'include' }),
        ]);

        if (dashRes.status === 401 || jobsRes.status === 401) {
          router.push('/contractor/login');
          return;
        }

        const dash = dashRes.ok ? await dashRes.json() : null;
        const jobsPayload = jobsRes.ok ? await jobsRes.json() : null;
        const overview = dash?.overview ?? dash?.data?.overview ?? {};
        const performance = dash?.performance ?? dash?.data?.performance ?? {};

        const parseMinutes = (raw: unknown): number => {
          if (typeof raw === 'number') return raw;
          if (typeof raw === 'string') {
            const m = raw.match(/(\d+)/);
            return m ? Number(m[1]) : 0;
          }
          return 0;
        };

        const metrics: KPIMetric[] = [
          {
            id: 'response-time',
            name: 'Avg Response Time',
            value: parseMinutes(performance.averageResponseTime),
            target: 30,
            unit: 'min',
            trend: 'stable',
            trendValue: 0,
            status:
              parseMinutes(performance.averageResponseTime) <= 30 ? 'excellent' : 'warning',
            category: 'performance',
          },
          {
            id: 'completion-rate',
            name: 'Job Completion Rate',
            value: Number(performance.jobCompletionRate ?? 0),
            target: 95,
            unit: '%',
            trend: 'stable',
            trendValue: 0,
            status:
              Number(performance.jobCompletionRate ?? 0) >= 95
                ? 'excellent'
                : Number(performance.jobCompletionRate ?? 0) >= 85
                  ? 'good'
                  : 'warning',
            category: 'performance',
          },
          {
            id: 'customer-satisfaction',
            name: 'Customer Satisfaction',
            value: Number(overview.averageRating ?? 0),
            target: 4.5,
            unit: '/5',
            trend: 'stable',
            trendValue: 0,
            status:
              Number(overview.averageRating ?? 0) >= 4.5
                ? 'excellent'
                : Number(overview.averageRating ?? 0) >= 4
                  ? 'good'
                  : 'warning',
            category: 'customer',
          },
          {
            id: 'active-jobs',
            name: 'Active Jobs',
            value: Number(overview.activeJobs ?? 0),
            target: 5,
            unit: '',
            trend: 'stable',
            trendValue: 0,
            status: 'good',
            category: 'efficiency',
          },
          {
            id: 'completed-month',
            name: 'Completed This Month',
            value: Number(overview.completedThisMonth ?? 0),
            target: 10,
            unit: '',
            trend: 'stable',
            trendValue: 0,
            status: 'good',
            category: 'efficiency',
          },
          {
            id: 'revenue-month',
            name: 'Revenue This Month',
            value: Number(overview.totalRevenue ?? 0),
            target: 10000,
            unit: 'AUD',
            trend: Number(performance.monthlyGrowth ?? 0) >= 0 ? 'up' : 'down',
            trendValue: Number(performance.monthlyGrowth ?? 0),
            status: 'good',
            category: 'efficiency',
          },
        ];

        const apiJobs = (jobsPayload?.jobs ?? jobsPayload?.data ?? []) as Array<Record<string, unknown>>;
        const mappedJobs: JobKPI[] = apiJobs.slice(0, 20).map((j) => ({
          jobId: String(j.id ?? j.jobId ?? ''),
          bookingId: String(j.bookingId ?? j.claimId ?? j.id ?? ''),
          customerName: String(
            (j.customer as { name?: string } | undefined)?.name ??
              (j.client as { name?: string } | undefined)?.name ??
              'Client',
          ),
          serviceType: String(
            (j.service as { type?: string } | undefined)?.type ?? j.serviceType ?? 'Restoration',
          ),
          kpis: {
            responseTime: 0,
            arrivalTime: 0,
            completionTime: 0,
            customerRating: undefined,
            photosTaken: 0,
            reportSubmitted: false,
            insuranceApproved: false,
          },
          status:
            String(j.status).toLowerCase() === 'completed'
              ? 'completed'
              : String(j.status).toLowerCase().includes('progress')
                ? 'in_progress'
                : 'pending',
          completedAt: j.completedAt ? String(j.completedAt) : undefined,
          paymentReleased: Number(j.fee ?? j.amount ?? 0),
        }));

        if (!cancelled) {
          setKpiMetrics(metrics);
          setRecentJobs(mappedJobs);
        }
      } catch {
        if (!cancelled) {
          setLoadError('Unable to load KPI data. Please try again.');
          setKpiMetrics([]);
          setRecentJobs([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [timeRange, router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600 bg-green-100';
      case 'good':
        return 'text-blue-600 bg-blue-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'critical':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-700 bg-gray-100';
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4 text-gray-700" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <RefreshCw className="h-8 w-8 animate-spin text-[var(--ag-primary-blue)] mx-auto mb-3" />
          <p className="text-sm text-gray-600">Loading your KPIs…</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="max-w-md text-center space-y-3">
          <AlertTriangle className="h-10 w-10 text-amber-500 mx-auto" />
          <p className="text-sm text-gray-700">{loadError}</p>
          <button
            type="button"
            className="min-h-[44px] rounded-lg bg-[var(--ag-primary-blue)] px-4 text-white text-sm font-medium"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
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
          <p className="text-gray-700">
            Track your performance metrics and earn more with better KPIs
          </p>
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
              <button className="p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colours">
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
              <p className="mt-2 text-blue-800">Excellent Performance - Top 10% of contractors</p>
            </div>
            <div className="text-right">
              <Award className="h-16 w-16 text-yellow-700 mb-2" />
              <p className="text-sm text-blue-800">Gold Status</p>
            </div>
          </div>
        </div>

        {/* KPI Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
          {kpiMetrics.map((metric) => (
            <div key={metric.id} className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-sm text-gray-700 mb-1">{metric.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-gray-900">{metric.value}</span>
                    <span className="text-sm text-gray-700">{metric.unit}</span>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}
                >
                  {metric.status}
                </span>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <div className="flex items-center gap-2">
                  {getTrendIcon(metric.trend)}
                  <span
                    className={`text-sm font-medium ${
                      metric.trend === 'up'
                        ? 'text-green-600'
                        : metric.trend === 'down'
                          ? 'text-red-600'
                          : 'text-gray-700'
                    }`}
                  >
                    {metric.trendValue > 0 ? '+' : ''}
                    {metric.trendValue}%
                  </span>
                </div>
                <div className="text-sm text-gray-700">
                  Target: {metric.target}
                  {metric.unit}
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      metric.status === 'excellent'
                        ? 'bg-green-500'
                        : metric.status === 'good'
                          ? 'bg-blue-500'
                          : metric.status === 'warning'
                            ? 'bg-blue-600'
                            : 'bg-red-500'
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
            <PerformanceTrendChart data={performanceTrend} />
          </div>

          {/* Job Distribution Pie Chart */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Job Distribution</h3>
            <JobDistributionChart data={jobDistribution} />
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Job ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Response
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Rating
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    KPIs Met
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Job value
                      <span className="block normal-case font-normal text-gray-500">(client bill)</span>
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentJobs.map((job) => {
                  const kpisCount =
                    Object.values(job.kpis).filter((v) => v === true).length +
                    (job.kpis.customerRating && job.kpis.customerRating >= 4 ? 1 : 0);
                  const totalKpis = 7;

                  return (
                    <tr key={job.jobId} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {job.jobId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {job.customerName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {job.serviceType}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
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
                          <span className="text-sm text-gray-700">
                            {kpisCount}/{totalKpis}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        ${job.paymentReleased}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 py-1 text-xs font-medium rounded-full ${
                            job.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : job.status === 'in_progress'
                                ? 'bg-blue-100 text-blue-800'
                                : 'bg-gray-100 text-gray-800'
                          }`}
                        >
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
export default function KPITrackingPage() {
  return (
    <>
      <AntigravityNavbar />
      <KPITrackingPageOriginal />
      <AntigravityFooter />
    </>
  );
}

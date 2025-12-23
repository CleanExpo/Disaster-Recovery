'use client';

import { useEffect, useState } from 'react';
import { useReporting } from '@/hooks/useAnalytics';

interface ExecutiveSummary {
  period: string;
  totalEvents: number;
  activeUsers: number;
  growthTrend: 'up' | 'down' | 'stable';
  growthPercent: number;
  keyMetrics: Array<{
    label: string;
    value: number | string;
    trend: 'up' | 'down' | 'stable';
    change: number;
  }>;
  topActivities: Array<{
    activity: string;
    count: number;
    percentage: number;
  }>;
  recommendations: string[];
}

interface ExecutiveDashboardProps {
  period?: 'day' | 'week' | 'month' | 'year';
  autoRefresh?: boolean;
  refreshInterval?: number;
}

/**
 * Executive Dashboard Component
 *
 * High-level overview of platform metrics and trends
 */
export function ExecutiveDashboard({
  period = 'week',
  autoRefresh = true,
  refreshInterval = 60000,
}: ExecutiveDashboardProps) {
  const [summary, setSummary] = useState<ExecutiveSummary | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState(period);
  const { report, isLoading, generateReport } = useReporting();

  useEffect(() => {
    const fetch = async () => {
      const result = await generateReport('executive', { period: selectedPeriod });
      if (result) {
        setSummary(result);
      }
    };

    fetch();

    if (autoRefresh) {
      const interval = setInterval(fetch, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [selectedPeriod, generateReport, autoRefresh, refreshInterval]);

  if (isLoading && !summary) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!summary) {
    return (
      <div className="p-8 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-800">Failed to load executive summary</p>
      </div>
    );
  }

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 10a7 7 0 1014 0 7 7 0 00-14 0zm7-7a1 1 0 011 1v6.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 111.414-1.414L9 11.586V4a1 1 0 011-1z" />
        </svg>;
      case 'down':
        return <svg className="w-4 h-4 text-red-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M3 10a7 7 0 1014 0 7 7 0 00-14 0zm7 7a1 1 0 01-1-1V9.414l-1.293 1.293a1 1 0 01-1.414-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 9.414V16a1 1 0 01-1 1z" />
        </svg>;
      default:
        return <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Executive Summary</h1>
          <p className="text-gray-600 mt-1">{summary.period} Performance Overview</p>
        </div>

        <div className="flex gap-2">
          {(['day', 'week', 'month', 'year'] as const).map((p) => (
            <button
              key={p}
              onClick={() => setSelectedPeriod(p)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedPeriod === p
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {summary.keyMetrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <p className="text-gray-600 text-sm font-medium">{metric.label}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {typeof metric.value === 'number' ? metric.value.toLocaleString() : metric.value}
                </p>
              </div>
              <div className="flex items-center gap-1 ml-2">
                {getTrendIcon(metric.trend)}
                <span className={`text-xs font-semibold ${
                  metric.trend === 'up' ? 'text-green-600' : metric.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                }`}>
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Growth Trend */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">Growth Trend</h2>
          <div className="flex items-center gap-2">
            {getTrendIcon(summary.growthTrend)}
            <span className={`font-bold ${
              summary.growthTrend === 'up' ? 'text-green-600' : summary.growthTrend === 'down' ? 'text-red-600' : 'text-gray-600'
            }`}>
              {summary.growthPercent > 0 ? '+' : ''}{summary.growthPercent}%
            </span>
          </div>
        </div>

        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              summary.growthTrend === 'up'
                ? 'bg-green-600'
                : summary.growthTrend === 'down'
                  ? 'bg-red-600'
                  : 'bg-gray-600'
            }`}
            style={{ width: `${Math.abs(summary.growthPercent)}%` }}
          ></div>
        </div>
      </div>

      {/* Top Activities */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Top Activities</h2>

        <div className="space-y-3">
          {summary.topActivities.map((activity) => (
            <div key={activity.activity}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-900">{activity.activity}</span>
                <span className="text-sm font-bold text-gray-600">{activity.count}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600 transition-all"
                  style={{ width: `${activity.percentage}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">{activity.percentage.toFixed(1)}% of total activity</p>
            </div>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {summary.recommendations.length > 0 && (
        <div className="bg-blue-50 rounded-lg border-l-4 border-blue-500 p-6">
          <h3 className="font-bold text-blue-900 mb-3">Recommendations</h3>
          <ul className="space-y-2">
            {summary.recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start gap-2 text-blue-800 text-sm">
                <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5"></span>
                {rec}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

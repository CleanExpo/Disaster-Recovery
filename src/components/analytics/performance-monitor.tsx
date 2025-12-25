'use client';

import { useEffect, useState } from 'react';
import { useReporting } from '@/hooks/useAnalytics';

interface PerformanceMetrics {
  period: string;
  avgResponseTime: number;
  errorRate: number;
  uptime: number;
  peakHour: number;
  peakHourTraffic: number;
  avgSessionDuration: number;
  concurrentUsers: number;
  systemHealth: 'excellent' | 'good' | 'fair' | 'poor';
}

interface PerformanceMonitorProps {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

/**
 * Performance Monitor Component
 *
 * Track system health and performance metrics
 */
export function PerformanceMonitor({ autoRefresh = true, refreshInterval = 60000 }: PerformanceMonitorProps) {
  const [metrics, setMetrics] = useState<PerformanceMetrics | null>(null);
  const { report, isLoading, generateReport } = useReporting();

  useEffect(() => {
    const fetch = async () => {
      const result = await generateReport('performance');
      if (result) {
        setMetrics(result);
      }
    };

    fetch();

    if (autoRefresh) {
      const interval = setInterval(fetch, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [generateReport, autoRefresh, refreshInterval]);

  if (isLoading && !metrics) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="p-8 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-800">Failed to load performance metrics</p>
      </div>
    );
  }

  const healthColors = {
    excellent: 'text-green-600 bg-green-50',
    good: 'text-blue-600 bg-blue-50',
    fair: 'text-yellow-600 bg-yellow-50',
    poor: 'text-red-600 bg-red-50',
  };

  const getStatusBadge = (health: string) => {
    const badges = {
      excellent: { color: 'bg-green-100 text-green-800', icon: '✓' },
      good: { color: 'bg-blue-100 text-blue-800', icon: '✓' },
      fair: { color: 'bg-yellow-100 text-yellow-800', icon: '⚠' },
      poor: { color: 'bg-red-100 text-red-800', icon: '✕' },
    };
    return badges[health as keyof typeof badges];
  };

  const statusBadge = getStatusBadge(metrics.systemHealth);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Monitor</h1>
          <p className="text-gray-600 mt-1">Real-time system health and metrics</p>
        </div>

        <div className={`px-4 py-2 rounded-lg font-bold text-lg ${statusBadge.color}`}>
          {statusBadge.icon} {metrics.systemHealth.charAt(0).toUpperCase() + metrics.systemHealth.slice(1)}
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Response Time */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <p className="text-gray-600 text-sm font-medium">Avg Response Time</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.avgResponseTime}ms</p>
          <p className="text-xs text-gray-500 mt-2">
            {metrics.avgResponseTime < 100
              ? '✓ Excellent'
              : metrics.avgResponseTime < 500
                ? '✓ Good'
                : '⚠ Needs attention'}
          </p>
        </div>

        {/* Error Rate */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-yellow-500">
          <p className="text-gray-600 text-sm font-medium">Error Rate</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.errorRate.toFixed(2)}%</p>
          <p className="text-xs text-gray-500 mt-2">
            {metrics.errorRate < 1 ? '✓ Excellent' : metrics.errorRate < 5 ? '✓ Good' : '⚠ High'}
          </p>
        </div>

        {/* Uptime */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-green-500">
          <p className="text-gray-600 text-sm font-medium">Uptime</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.uptime.toFixed(2)}%</p>
          <p className="text-xs text-gray-500 mt-2">
            {metrics.uptime >= 99.9 ? '✓ Excellent' : metrics.uptime >= 99 ? '✓ Good' : '⚠ Below target'}
          </p>
        </div>

        {/* Concurrent Users */}
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-500">
          <p className="text-gray-600 text-sm font-medium">Concurrent Users</p>
          <p className="text-3xl font-bold text-gray-900 mt-2">{metrics.concurrentUsers}</p>
          <p className="text-xs text-gray-500 mt-2">Currently active</p>
        </div>
      </div>

      {/* Detailed Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Session Duration */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-gray-900 mb-4">Session Duration</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Average</span>
                <span className="text-sm font-bold text-gray-900">{metrics.avgSessionDuration}s</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600"
                  style={{ width: `${Math.min((metrics.avgSessionDuration / 3600) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Peak Traffic */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="font-bold text-gray-900 mb-4">Peak Traffic</h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-medium text-gray-700">Peak Hour</span>
                <span className="text-sm font-bold text-gray-900">{metrics.peakHour}:00</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                {metrics.peakHourTraffic} events recorded at peak hour
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Health Indicators */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="font-bold text-gray-900 mb-4">System Health Indicators</h3>

        <div className="space-y-3">
          {/* Response Time Health */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Response Time</span>
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${
                  metrics.avgResponseTime < 100
                    ? 'bg-green-100 text-green-800'
                    : metrics.avgResponseTime < 500
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                }`}
              >
                {metrics.avgResponseTime < 100 ? 'Excellent' : metrics.avgResponseTime < 500 ? 'Good' : 'Poor'}
              </span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  metrics.avgResponseTime < 100
                    ? 'bg-green-600'
                    : metrics.avgResponseTime < 500
                      ? 'bg-blue-600'
                      : 'bg-red-600'
                }`}
                style={{ width: '100%' }}
              ></div>
            </div>
          </div>

          {/* Error Rate Health */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Error Rate</span>
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${
                  metrics.errorRate < 1
                    ? 'bg-green-100 text-green-800'
                    : metrics.errorRate < 5
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                }`}
              >
                {metrics.errorRate < 1 ? 'Excellent' : metrics.errorRate < 5 ? 'Good' : 'High'}
              </span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  metrics.errorRate < 1 ? 'bg-green-600' : metrics.errorRate < 5 ? 'bg-blue-600' : 'bg-red-600'
                }`}
                style={{ width: `${Math.min(metrics.errorRate * 10, 100)}%` }}
              ></div>
            </div>
          </div>

          {/* Uptime Health */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Uptime</span>
              <span
                className={`text-xs font-bold px-2 py-1 rounded ${
                  metrics.uptime >= 99.9
                    ? 'bg-green-100 text-green-800'
                    : metrics.uptime >= 99
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-red-100 text-red-800'
                }`}
              >
                {metrics.uptime >= 99.9 ? 'Excellent' : metrics.uptime >= 99 ? 'Good' : 'Below Target'}
              </span>
            </div>
            <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  metrics.uptime >= 99.9
                    ? 'bg-green-600'
                    : metrics.uptime >= 99
                      ? 'bg-blue-600'
                      : 'bg-red-600'
                }`}
                style={{ width: `${metrics.uptime}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

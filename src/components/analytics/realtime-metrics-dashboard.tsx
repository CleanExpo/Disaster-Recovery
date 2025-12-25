'use client';

import React, { useState, useEffect } from 'react';
import {
  Activity,
  Users,
  MessageSquare,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Clock,
  Zap,
} from 'lucide-react';

interface MetricsData {
  activeUsers: number;
  activeUsersByRole: { customer: number; contractor: number; admin: number };
  messagesPerMinute: number;
  bookingUpdatesPerMinute: number;
  claimUpdatesPerMinute: number;
  averageMessageLatency: number;
  errorRate: number;
  uptime: number;
  timestamp: Date;
}

interface DashboardProps {
  autoRefresh?: boolean;
  refreshInterval?: number; // milliseconds
}

export function RealtimeMetricsDashboard({
  autoRefresh = true,
  refreshInterval = 5000,
}: DashboardProps) {
  const [metrics, setMetrics] = useState<MetricsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [timeRange, setTimeRange] = useState<'realtime' | '1h' | '24h'>('realtime');

  // Fetch metrics
  const fetchMetrics = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/analytics/metrics?timeRange=${timeRange}`);

      if (!response.ok) {
        throw new Error('Failed to fetch metrics');
      }

      const data = await response.json();
      setMetrics(data);
      setLastUpdate(new Date());
    } catch (error) {
      console.error('Failed to fetch metrics:', error);
    } finally {
      setIsLoading(false);
    }
  }, [timeRange]);

  // Setup auto-refresh
  useEffect(() => {
    fetchMetrics();

    if (!autoRefresh) return;

    const interval = setInterval(fetchMetrics, refreshInterval);
    return () => clearInterval(interval);
  }, [autoRefresh, refreshInterval, timeRange, fetchMetrics]);

  if (!metrics) {
    return (
      <div className="p-4 text-center text-slate-500">
        Loading metrics...
      </div>
    );
  }

  const getLatencyColor = (latency: number) => {
    if (latency < 50) return 'text-green-600';
    if (latency < 100) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getErrorRateColor = (rate: number) => {
    if (rate < 1) return 'text-green-600';
    if (rate < 5) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6 p-6 bg-slate-50">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900">Real-Time Metrics</h2>
        <div className="flex items-center gap-4">
          <div className="text-sm text-slate-500">
            Last update: {lastUpdate?.toLocaleTimeString()}
          </div>
          <button
            onClick={fetchMetrics}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Refresh
          </button>
        </div>
      </div>

      {/* Time Range Selector */}
      <div className="flex gap-2">
        {(['realtime', '1h', '24h'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded text-sm font-medium transition-colors ${
              timeRange === range
                ? 'bg-blue-600 text-white'
                : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {range === 'realtime' ? 'Real-Time' : range === '1h' ? '1 Hour' : '24 Hours'}
          </button>
        ))}
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Active Users */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">Active Users</span>
            <Users className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900">
            {metrics.activeUsers}
          </div>
          <div className="mt-2 space-y-1 text-xs text-slate-500">
            <div>Customer: {metrics.activeUsersByRole.customer}</div>
            <div>Contractor: {metrics.activeUsersByRole.contractor}</div>
            <div>Admin: {metrics.activeUsersByRole.admin}</div>
          </div>
        </div>

        {/* Messages Per Minute */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Messages/min
            </span>
            <MessageSquare className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-3xl font-bold text-slate-900">
            {metrics.messagesPerMinute}
          </div>
          <div className="mt-2 text-xs text-slate-500">
            Real-time message throughput
          </div>
        </div>

        {/* Average Latency */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Avg Latency
            </span>
            <Clock className={`w-5 h-5 ${getLatencyColor(metrics.averageMessageLatency)}`} />
          </div>
          <div className={`text-3xl font-bold ${getLatencyColor(metrics.averageMessageLatency)}`}>
            {metrics.averageMessageLatency.toFixed(0)}ms
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {metrics.averageMessageLatency < 100 ? '✓ Optimal' : '⚠ High latency'}
          </div>
        </div>

        {/* Error Rate */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">Error Rate</span>
            <AlertTriangle
              className={`w-5 h-5 ${getErrorRateColor(metrics.errorRate)}`}
            />
          </div>
          <div className={`text-3xl font-bold ${getErrorRateColor(metrics.errorRate)}`}>
            {metrics.errorRate.toFixed(2)}%
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {metrics.errorRate < 1 ? '✓ Healthy' : '⚠ Check logs'}
          </div>
        </div>
      </div>

      {/* Secondary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Booking Updates */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Booking Updates/min
            </span>
            <Zap className="w-5 h-5 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {metrics.bookingUpdatesPerMinute}
          </div>
        </div>

        {/* Claim Updates */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">
              Claim Updates/min
            </span>
            <TrendingUp className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            {metrics.claimUpdatesPerMinute}
          </div>
        </div>

        {/* System Uptime */}
        <div className="bg-white rounded-lg border border-slate-200 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-600">System Uptime</span>
            <CheckCircle className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-2xl font-bold text-green-600">
            {metrics.uptime.toFixed(2)}%
          </div>
        </div>
      </div>

      {/* Status Indicator */}
      <div className="bg-white rounded-lg border border-slate-200 p-4">
        <h3 className="font-semibold text-slate-900 mb-4">System Status</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            {
              name: 'Database',
              status: true,
            },
            {
              name: 'Redis',
              status: true,
            },
            {
              name: 'Socket.io',
              status: true,
            },
            {
              name: 'Queue',
              status: true,
            },
          ].map((service) => (
            <div key={service.name} className="flex items-center gap-2">
              <div
                className={`w-3 h-3 rounded-full ${
                  service.status ? 'bg-green-500' : 'bg-red-500'
                }`}
              />
              <span className="text-sm text-slate-600">{service.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Info Text */}
      {autoRefresh && (
        <div className="text-xs text-slate-500 text-center">
          Auto-refreshing every {(refreshInterval / 1000).toFixed(0)} seconds
        </div>
      )}
    </div>
  );
}

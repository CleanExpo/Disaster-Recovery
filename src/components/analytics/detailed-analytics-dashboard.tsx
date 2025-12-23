'use client';

import { useEffect, useState } from 'react';
import { useAnalytics } from '@/hooks/useAnalytics';

interface DetailedMetrics {
  totalEvents: number;
  eventsByType: Record<string, number>;
  activeUsers: number;
  sessionDuration: {
    min: number;
    max: number;
    avg: number;
  };
  peakHours: Record<number, number>;
  dailyStats: Record<string, any>;
}

interface DetailedAnalyticsDashboardProps {
  autoRefresh?: boolean;
  refreshInterval?: number;
}

/**
 * Detailed Analytics Dashboard Component
 *
 * Comprehensive analytics with event distribution and hourly analysis
 */
export function DetailedAnalyticsDashboard({
  autoRefresh = true,
  refreshInterval = 30000,
}: DetailedAnalyticsDashboardProps) {
  const [metrics, setMetrics] = useState<DetailedMetrics | null>(null);
  const [selectedTab, setSelectedTab] = useState<'events' | 'hours' | 'sessions'>('events');
  const { fetchMetrics, isLoading, error } = useAnalytics();

  useEffect(() => {
    const fetch = async () => {
      // Note: In production, would need a detailed metrics endpoint
      await fetchMetrics();
    };

    fetch();

    if (autoRefresh) {
      const interval = setInterval(fetch, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [fetchMetrics, autoRefresh, refreshInterval]);

  if (isLoading && !metrics) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 bg-red-50 rounded-lg border border-red-200">
        <p className="text-red-800">Error: {error}</p>
      </div>
    );
  }

  const topEvents = Object.entries(metrics?.eventsByType || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10)
    .map(([event, count]) => ({ event, count }));

  const sortedHours = Object.entries(metrics?.peakHours || {})
    .map(([hour, traffic]) => ({ hour: parseInt(hour), traffic }))
    .sort((a, b) => a.hour - b.hour);

  const maxHourTraffic = Math.max(...sortedHours.map((h) => h.traffic), 1);
  const maxEventCount = Math.max(...topEvents.map((e) => e.count), 1);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Detailed Analytics</h1>
        <p className="text-gray-600 mt-1">Comprehensive platform metrics and analysis</p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Total Events</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{metrics?.totalEvents.toLocaleString()}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Active Users</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">{metrics?.activeUsers}</p>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-600 text-sm font-medium">Avg Session Duration</p>
          <p className="text-3xl font-bold text-gray-900 mt-1">
            {metrics ? Math.round(metrics.sessionDuration.avg / 60) : 0}m
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow">
        <div className="flex border-b border-gray-200">
          {(['events', 'hours', 'sessions'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`px-6 py-3 font-medium text-sm transition-colors ${
                selectedTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              {tab === 'events' && 'Event Distribution'}
              {tab === 'hours' && 'Hourly Analysis'}
              {tab === 'sessions' && 'Session Stats'}
            </button>
          ))}
        </div>

        <div className="p-6">
          {selectedTab === 'events' && (
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 mb-4">Top Events</h3>
              {topEvents.map((item) => (
                <div key={item.event}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-gray-900">
                      {item.event
                        .split(':')
                        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
                        .join(': ')}
                    </span>
                    <span className="text-sm font-bold text-gray-600">{item.count}</span>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-blue-600 transition-all"
                      style={{ width: `${(item.count / maxEventCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {selectedTab === 'hours' && (
            <div className="space-y-3">
              <h3 className="font-bold text-gray-900 mb-4">Hourly Traffic</h3>
              <div className="flex gap-1 items-end h-48 bg-gray-50 p-4 rounded">
                {sortedHours.map((hour) => (
                  <div key={hour.hour} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full bg-blue-600 rounded-t transition-all hover:bg-blue-700"
                      style={{ height: `${(hour.traffic / maxHourTraffic) * 100}%`, minHeight: '4px' }}
                      title={`Hour ${hour.hour}: ${hour.traffic} events`}
                    ></div>
                    <span className="text-xs text-gray-600 font-medium">{hour.hour}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedTab === 'sessions' && (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-gray-600 text-sm font-medium">Minimum Duration</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {metrics ? Math.round(metrics.sessionDuration.min / 1000) : 0}s
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm font-medium">Average Duration</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {metrics ? Math.round(metrics.sessionDuration.avg / 60000) : 0}m
                </p>
              </div>

              <div>
                <p className="text-gray-600 text-sm font-medium">Maximum Duration</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {metrics ? Math.round(metrics.sessionDuration.max / 60000) : 0}m
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

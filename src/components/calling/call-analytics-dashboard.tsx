'use client';

import { useState, useMemo } from 'react';
import { useCallAnalytics } from '@/hooks/useCallAnalytics';

interface CallAnalyticsDashboardProps {
  userId: string;
  days?: number;
}

/**
 * CallAnalyticsDashboard Component
 *
 * Display comprehensive call statistics and analytics
 */
export function CallAnalyticsDashboard({ userId, days = 30 }: CallAnalyticsDashboardProps) {
  const { summary, isLoading, error, exportAnalytics, refresh } = useCallAnalytics({
    userId,
    days,
  });
  const [exportFormat, setExportFormat] = useState<'json' | 'csv'>('json');

  const stats = useMemo(() => {
    if (!summary?.userStats) return null;

    const s = summary.userStats;
    return {
      totalCalls: s.totalCalls,
      incomingCalls: s.incomingCalls,
      outgoingCalls: s.outgoingCalls,
      missedCalls: s.missedCalls,
      totalMinutes: Math.floor(s.totalCallDuration / 60),
      avgCallMinutes: Math.floor(s.averageCallDuration / 60),
      videoCalls: s.videoCallCount,
      voiceCalls: s.voiceCallCount,
      topContact: s.mostFrequentContacts[0],
      qualityScore: summary.qualityScore,
    };
  }, [summary]);

  if (isLoading && !stats) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm">
          <strong>Error:</strong> {error}
        </p>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
          />
        </svg>
        <p className="text-gray-600 text-sm">No call data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Call Analytics</h2>
          <p className="text-gray-600 text-sm mt-1">Last {days} days</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={refresh}
            disabled={isLoading}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50"
          >
            Refresh
          </button>

          <div className="flex gap-2">
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value as 'json' | 'csv')}
              className="px-3 py-2 text-sm border border-gray-300 rounded-lg"
            >
              <option value="json">JSON</option>
              <option value="csv">CSV</option>
            </select>

            <button
              onClick={() => exportAnalytics(exportFormat)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700"
            >
              Export
            </button>
          </div>
        </div>
      </div>

      {/* Quality Score */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 font-medium">Overall Call Quality</p>
            <p className="text-4xl font-bold text-gray-900 mt-2">{stats.qualityScore}/100</p>
          </div>

          <div className="w-32 h-32">
            <svg className="w-full h-full" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke="#e5e7eb"
                strokeWidth="8"
              />
              <circle
                cx="50"
                cy="50"
                r="45"
                fill="none"
                stroke={
                  stats.qualityScore >= 80
                    ? '#10b981'
                    : stats.qualityScore >= 60
                      ? '#f59e0b'
                      : '#ef4444'
                }
                strokeWidth="8"
                strokeDasharray={`${stats.qualityScore * 2.83} 283`}
                strokeLinecap="round"
              />
              <text x="50" y="50" textAnchor="middle" dy="0.3em" className="text-2xl font-bold">
                {stats.qualityScore}%
              </text>
            </svg>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-4">
          <div className="bg-blue-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-medium">Quality Level</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {stats.qualityScore >= 80
                ? 'Excellent'
                : stats.qualityScore >= 60
                  ? 'Good'
                  : 'Fair'}
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-medium">Avg Call Duration</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {stats.avgCallMinutes}
              <span className="text-xs text-gray-600"> min</span>
            </p>
          </div>
          <div className="bg-blue-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-medium">Total Minutes</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {stats.totalMinutes}
              <span className="text-xs text-gray-600"> min</span>
            </p>
          </div>
        </div>
      </div>

      {/* Call Statistics Grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatCard
          label="Total Calls"
          value={stats.totalCalls}
          icon="📞"
          color="blue"
        />
        <StatCard
          label="Incoming"
          value={stats.incomingCalls}
          icon="📥"
          color="green"
        />
        <StatCard
          label="Outgoing"
          value={stats.outgoingCalls}
          icon="📤"
          color="purple"
        />
        <StatCard
          label="Missed"
          value={stats.missedCalls}
          icon="❌"
          color="red"
        />
      </div>

      {/* Call Type Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Call Types</h3>

          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Video Calls</span>
                <span className="text-sm font-semibold text-gray-900">{stats.videoCalls}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-blue-600"
                  style={{
                    width: `${stats.totalCalls > 0 ? (stats.videoCalls / stats.totalCalls) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">Voice Calls</span>
                <span className="text-sm font-semibold text-gray-900">{stats.voiceCalls}</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-600"
                  style={{
                    width: `${stats.totalCalls > 0 ? (stats.voiceCalls / stats.totalCalls) * 100 : 0}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Top Contact */}
        {stats.topContact && (
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Top Contact</h3>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-semibold">
                {stats.topContact.userId.charAt(0).toUpperCase()}
              </div>

              <div className="flex-1">
                <p className="font-semibold text-gray-900 truncate">
                  {stats.topContact.userId}
                </p>
                <p className="text-sm text-gray-600">
                  {stats.topContact.callCount} call{stats.topContact.callCount !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Daily Chart Placeholder */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Calls Over Time</h3>

        <div className="h-64 flex items-end gap-1">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-2">
              <div
                className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t"
                style={{ height: `${Math.random() * 100}%`, minHeight: '4px' }}
              />
              <span className="text-xs text-gray-500">
                {new Date(Date.now() - (7 - i) * 24 * 60 * 60 * 1000)
                  .toLocaleDateString('en-US', { weekday: 'short' })
                  .slice(0, 1)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * StatCard Component
 */
function StatCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: number;
  icon: string;
  color: 'blue' | 'green' | 'purple' | 'red';
}) {
  const bgColor = {
    blue: 'bg-blue-50',
    green: 'bg-green-50',
    purple: 'bg-purple-50',
    red: 'bg-red-50',
  }[color];

  const textColor = {
    blue: 'text-blue-600',
    green: 'text-green-600',
    purple: 'text-purple-600',
    red: 'text-red-600',
  }[color];

  return (
    <div className={`${bgColor} border border-gray-200 rounded-lg p-4`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-600 font-medium">{label}</p>
          <p className={`text-2xl font-bold ${textColor} mt-1`}>{value}</p>
        </div>
        <span className="text-2xl">{icon}</span>
      </div>
    </div>
  );
}

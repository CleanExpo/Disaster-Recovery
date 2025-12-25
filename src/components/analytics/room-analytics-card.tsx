'use client';

import { useEffect, useState } from 'react';
import { useRoomAnalytics } from '@/hooks/useAnalytics';

interface RoomAnalyticsCardProps {
  roomId: string;
}

/**
 * Room Analytics Card Component
 *
 * Display room-specific analytics and health metrics
 */
export function RoomAnalyticsCard({ roomId }: RoomAnalyticsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { analytics, isLoading, fetchAnalytics } = useRoomAnalytics(roomId);

  useEffect(() => {
    fetchAnalytics();
  }, [roomId, fetchAnalytics]);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (!analytics) {
    return null;
  }

  const statusColors = {
    thriving: 'bg-green-100 text-green-800',
    active: 'bg-blue-100 text-blue-800',
    moderate: 'bg-yellow-100 text-yellow-800',
    declining: 'bg-red-100 text-red-800',
  };

  const healthColor =
    analytics.healthScore > 75
      ? 'text-green-600'
      : analytics.healthScore > 50
        ? 'text-blue-600'
        : analytics.healthScore > 25
          ? 'text-yellow-600'
          : 'text-red-600';

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{analytics.roomName}</h3>
          <p className="text-sm text-gray-600 mt-1">ID: {roomId.substring(0, 12)}...</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            statusColors[analytics.activityStatus]
          }`}
        >
          {analytics.activityStatus.charAt(0).toUpperCase() + analytics.activityStatus.slice(1)}
        </span>
      </div>

      {/* Health Score */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Room Health</span>
          <span className={`text-lg font-bold ${healthColor}`}>{analytics.healthScore}/100</span>
        </div>
        <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              analytics.healthScore > 75
                ? 'bg-green-600'
                : analytics.healthScore > 50
                  ? 'bg-blue-600'
                  : analytics.healthScore > 25
                    ? 'bg-yellow-600'
                    : 'bg-red-600'
            }`}
            style={{ width: `${analytics.healthScore}%` }}
          ></div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded p-3">
          <p className="text-xs text-gray-600">Members</p>
          <p className="text-lg font-bold text-gray-900">{analytics.memberCount}</p>
        </div>

        <div className="bg-gray-50 rounded p-3">
          <p className="text-xs text-gray-600">Messages</p>
          <p className="text-lg font-bold text-gray-900">{analytics.totalMessages}</p>
        </div>

        <div className="bg-gray-50 rounded p-3">
          <p className="text-xs text-gray-600">Calls</p>
          <p className="text-lg font-bold text-gray-900">{analytics.callsInitiated}</p>
        </div>

        <div className="bg-gray-50 rounded p-3">
          <p className="text-xs text-gray-600">Files Shared</p>
          <p className="text-lg font-bold text-gray-900">{analytics.filesShared}</p>
        </div>
      </div>

      {/* Engagement Trend */}
      <div className="mb-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gray-600">Engagement Trend</span>
          <span
            className={`text-xs font-bold ${
              analytics.engagementTrend === 'up'
                ? 'text-green-600'
                : analytics.engagementTrend === 'down'
                  ? 'text-red-600'
                  : 'text-gray-600'
            }`}
          >
            {analytics.engagementTrend === 'up' && '↑'}
            {analytics.engagementTrend === 'down' && '↓'}
            {analytics.engagementTrend === 'stable' && '→'} {analytics.engagementTrend}
          </span>
        </div>
      </div>

      {/* Expand/Collapse Details */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left text-sm font-medium text-blue-600 hover:text-blue-700 py-2"
      >
        {isExpanded ? 'Hide Details' : 'Show Details'}
      </button>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-gray-200 space-y-3">
          <div>
            <p className="text-xs font-medium text-gray-600">Creation Date</p>
            <p className="text-sm text-gray-900 mt-1">
              {new Date(analytics.createdAt).toLocaleDateString()}
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-600">Activity Level</p>
            <p className="text-sm text-gray-900 mt-1">
              {analytics.totalMessages > 0
                ? (analytics.totalMessages / analytics.memberCount).toFixed(1)
                : 0}{' '}
              messages per member
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-600">Top Contributors</p>
            <div className="mt-2 space-y-1">
              {analytics.topContributors.length > 0 ? (
                analytics.topContributors.slice(0, 3).map((contributor) => (
                  <div key={contributor.userId} className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">{contributor.userId.substring(0, 8)}...</span>
                    <span className="text-xs font-semibold text-gray-600">{contributor.contribution}</span>
                  </div>
                ))
              ) : (
                <span className="text-sm text-gray-600">No contributors</span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

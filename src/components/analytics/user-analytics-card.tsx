'use client';

import { useEffect, useState } from 'react';
import { useUserAnalytics } from '@/hooks/useAnalytics';

interface UserAnalyticsCardProps {
  userId: string;
}

/**
 * User Analytics Card Component
 *
 * Display user-specific analytics and engagement metrics
 */
export function UserAnalyticsCard({ userId }: UserAnalyticsCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { analytics, isLoading, fetchAnalytics } = useUserAnalytics(userId);

  useEffect(() => {
    fetchAnalytics();
  }, [userId, fetchAnalytics]);

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

  const roleColors = {
    active: 'bg-green-100 text-green-800',
    moderate: 'bg-blue-100 text-blue-800',
    light: 'bg-gray-100 text-gray-800',
    inactive: 'bg-red-100 text-red-800',
  };

  return (
    <div className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="font-bold text-gray-900">{analytics.username}</h3>
          <p className="text-sm text-gray-600 mt-1">ID: {userId.substring(0, 12)}...</p>
        </div>

        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            roleColors[analytics.roleInCommunity]
          }`}
        >
          {analytics.roleInCommunity.charAt(0).toUpperCase() + analytics.roleInCommunity.slice(1)}
        </span>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded p-3">
          <p className="text-xs text-gray-600">Messages Sent</p>
          <p className="text-lg font-bold text-gray-900">{analytics.messagesSent}</p>
        </div>

        <div className="bg-gray-50 rounded p-3">
          <p className="text-xs text-gray-600">Calls Initiated</p>
          <p className="text-lg font-bold text-gray-900">{analytics.callsInitiated}</p>
        </div>

        <div className="bg-gray-50 rounded p-3">
          <p className="text-xs text-gray-600">Files Shared</p>
          <p className="text-lg font-bold text-gray-900">{analytics.filesUploaded}</p>
        </div>

        <div className="bg-gray-50 rounded p-3">
          <p className="text-xs text-gray-600">Engagement Score</p>
          <p className="text-lg font-bold text-gray-900">{analytics.engagementScore}/100</p>
        </div>
      </div>

      {/* Engagement Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-medium text-gray-600">Engagement Level</span>
          <span className="text-xs font-bold text-gray-900">{analytics.engagementScore}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              analytics.engagementScore > 70
                ? 'bg-green-600'
                : analytics.engagementScore > 40
                  ? 'bg-blue-600'
                  : 'bg-gray-600'
            }`}
            style={{ width: `${analytics.engagementScore}%` }}
          ></div>
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
            <p className="text-xs font-medium text-gray-600">Activity Dates</p>
            <p className="text-sm text-gray-900 mt-1">
              First: {new Date(analytics.firstSeen).toLocaleDateString()}
            </p>
            <p className="text-sm text-gray-900">Last: {new Date(analytics.lastActive).toLocaleDateString()}</p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-600">Call Duration</p>
            <p className="text-sm text-gray-900 mt-1">
              {Math.round(analytics.callDuration / 60)}m total
            </p>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-600">Most Active Rooms</p>
            <div className="flex flex-wrap gap-1 mt-2">
              {analytics.mostActiveRooms.length > 0 ? (
                analytics.mostActiveRooms.slice(0, 3).map((room) => (
                  <span key={room} className="px-2 py-1 bg-blue-50 text-blue-700 text-xs rounded">
                    {room.substring(0, 8)}...
                  </span>
                ))
              ) : (
                <span className="text-sm text-gray-600">No room activity</span>
              )}
            </div>
          </div>

          <div>
            <p className="text-xs font-medium text-gray-600">Trends</p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Activity:</span>
                <span
                  className={`text-xs font-semibold ${
                    analytics.trends.activityTrend === 'increasing'
                      ? 'text-green-600'
                      : analytics.trends.activityTrend === 'decreasing'
                        ? 'text-red-600'
                        : 'text-gray-600'
                  }`}
                >
                  {analytics.trends.activityTrend}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-700">Engagement:</span>
                <span
                  className={`text-xs font-semibold ${
                    analytics.trends.engagementTrend === 'increasing'
                      ? 'text-green-600'
                      : analytics.trends.engagementTrend === 'decreasing'
                        ? 'text-red-600'
                        : 'text-gray-600'
                  }`}
                >
                  {analytics.trends.engagementTrend}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

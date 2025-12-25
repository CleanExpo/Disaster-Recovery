'use client';

import { useEffect, useState } from 'react';
import { useRecommendations } from '@/hooks/useAI';

interface RecommendationsPanelProps {
  userId: string;
  maxItems?: number;
}

/**
 * Recommendations Panel Component
 *
 * Display AI-powered recommendations for rooms and collaborators
 */
export function RecommendationsPanel({ userId, maxItems = 5 }: RecommendationsPanelProps) {
  const { recommendations, isLoading, error, fetchRecommendations } = useRecommendations(userId);
  const [selectedTab, setSelectedTab] = useState<'rooms' | 'collaborators' | 'suggestions'>('suggestions');

  useEffect(() => {
    fetchRecommendations('all');
  }, [userId, fetchRecommendations]);

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

  if (error) {
    return (
      <div className="bg-red-50 rounded-lg border border-red-200 p-6">
        <p className="text-red-800">Error: {error}</p>
      </div>
    );
  }

  if (!recommendations) {
    return null;
  }

  const tabs = [
    { id: 'suggestions', label: 'Smart Suggestions', icon: '💡' },
    { id: 'rooms', label: 'Room Recommendations', icon: '🏠' },
    { id: 'collaborators', label: 'Suggested Collaborators', icon: '👥' },
  ] as const;

  const getRenderContent = () => {
    const items =
      selectedTab === 'rooms'
        ? recommendations.rooms || []
        : selectedTab === 'collaborators'
          ? recommendations.collaborators || []
          : recommendations.suggestions || [];

    if (items.length === 0) {
      return <p className="text-gray-600 text-center py-4">No recommendations available</p>;
    }

    return (
      <div className="space-y-3">
        {items.slice(0, maxItems).map((item: any, idx: number) => (
          <div key={item.id || idx} className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            {selectedTab === 'suggestions' ? (
              <>
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-semibold text-gray-900">{item.title}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded font-semibold ${
                      item.type === 'room_join'
                        ? 'bg-blue-100 text-blue-700'
                        : item.type === 'contact'
                          ? 'bg-purple-100 text-purple-700'
                          : item.type === 'time_to_call'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {item.type.replace('_', ' ')}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center justify-between">
                  <div className="h-1 flex-1 bg-gray-200 rounded-full mr-2">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${item.confidence * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-xs text-gray-600 font-semibold">{Math.round(item.confidence * 100)}%</span>
                </div>
              </>
            ) : selectedTab === 'rooms' ? (
              <>
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-semibold text-gray-900">{item.roomName}</h4>
                  <span
                    className={`text-xs px-2 py-1 rounded font-semibold ${
                      item.activityLevel === 'high'
                        ? 'bg-red-100 text-red-700'
                        : item.activityLevel === 'medium'
                          ? 'bg-yellow-100 text-yellow-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {item.activityLevel} activity
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.reason}</p>
                <div className="flex items-center justify-between text-xs text-gray-600">
                  <span>{item.memberCount} members</span>
                  <div className="h-1 flex-1 bg-gray-200 rounded-full mx-2">
                    <div
                      className="h-full bg-blue-600 rounded-full"
                      style={{ width: `${item.relevanceScore * 100}%` }}
                    ></div>
                  </div>
                  <span>{Math.round(item.relevanceScore * 100)}%</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start justify-between mb-1">
                  <h4 className="font-semibold text-gray-900">{item.username}</h4>
                  <span className="text-xs text-gray-600">Score: {Math.round(item.relevanceScore * 100)}/100</span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.reason}</p>
                <div className="text-xs text-gray-600">
                  {item.commonRooms > 0 && (
                    <span className="mr-4">🏠 {item.commonRooms} common room{item.commonRooms !== 1 ? 's' : ''}</span>
                  )}
                  {item.sharedInterests.length > 0 && (
                    <span>🎯 {item.sharedInterests.join(', ')}</span>
                  )}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">🤖 Smart Recommendations</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-4 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`px-4 py-2 font-medium text-sm transition-colors ${
              selectedTab === tab.id
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Content */}
      {getRenderContent()}

      {/* Refresh Button */}
      <button
        onClick={() => fetchRecommendations('all')}
        className="w-full mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
      >
        🔄 Refresh Recommendations
      </button>
    </div>
  );
}

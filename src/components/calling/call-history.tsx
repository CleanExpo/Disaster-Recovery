'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCall } from '@/hooks/useCall';

interface CallRecord {
  id: string;
  participantName: string;
  participantAvatar?: string;
  callType: 'voice' | 'video';
  direction: 'incoming' | 'outgoing';
  status: 'completed' | 'missed' | 'rejected';
  duration: number; // in seconds
  timestamp: Date;
}

interface CallHistoryProps {
  userId?: string;
  limit?: number;
  onCallClick?: (callId: string) => void;
}

/**
 * CallHistory Component
 *
 * Display user's call history with filtering and quick actions
 */
export function CallHistory({ userId, limit = 20, onCallClick }: CallHistoryProps) {
  const [calls, setCalls] = useState<CallRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'incoming' | 'outgoing' | 'missed'>('all');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCallHistory = async () => {
      try {
        setIsLoading(true);
        setError(null);

        let endpoint = `/api/calls?type=history&limit=${limit}`;
        if (userId) {
          endpoint += `&userId=${userId}`;
        }

        const response = await fetch(endpoint);
        if (!response.ok) {
          throw new Error('Failed to fetch call history');
        }

        const data = await response.json();
        setCalls(data.calls || []);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load call history';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCallHistory();
  }, [userId, limit]);

  const filteredCalls = calls.filter((call) => {
    if (filter === 'all') return true;
    if (filter === 'missed') return call.status === 'missed';
    return call.direction === filter;
  });

  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diffMs = now.getTime() - new Date(date).getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;

    return new Date(date).toLocaleDateString();
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800 text-sm">
          <strong>Error:</strong> {error}
        </p>
      </div>
    );
  }

  if (calls.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg className="w-16 h-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6z"
          />
        </svg>
        <p className="text-gray-600 text-sm">No calls yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'incoming', 'outgoing', 'missed'] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
            {f === 'all' && ` (${calls.length})`}
            {f === 'incoming' && ` (${calls.filter((c) => c.direction === 'incoming').length})`}
            {f === 'outgoing' && ` (${calls.filter((c) => c.direction === 'outgoing').length})`}
            {f === 'missed' && ` (${calls.filter((c) => c.status === 'missed').length})`}
          </button>
        ))}
      </div>

      {/* Call List */}
      <div className="space-y-2">
        {filteredCalls.map((call) => (
          <CallHistoryItem
            key={call.id}
            call={call}
            onCallClick={onCallClick}
            formatTime={formatTime}
            formatDuration={formatDuration}
          />
        ))}
      </div>

      {filteredCalls.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          <p className="text-sm">No {filter !== 'all' ? filter : ''} calls</p>
        </div>
      )}
    </div>
  );
}

interface CallHistoryItemProps {
  call: CallRecord;
  onCallClick?: (callId: string) => void;
  formatTime: (date: Date) => string;
  formatDuration: (seconds: number) => string;
}

/**
 * CallHistoryItem Component
 *
 * Individual call record in history list
 */
function CallHistoryItem({
  call,
  onCallClick,
  formatTime,
  formatDuration,
}: CallHistoryItemProps) {
  const getDirectionIcon = (direction: string, callType: string) => {
    if (callType === 'video') {
      return direction === 'incoming' ? (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
      ) : (
        <svg className="w-4 h-4 transform -rotate-180" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
      );
    }

    return direction === 'incoming' ? (
      <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.797l.291 2.055a1 1 0 01-.471 1.032l-1.107.554a8.001 8.001 0 006.289 6.289l.554-1.107a1 1 0 011.032-.471l2.055.291a1 1 0 01.797.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
    ) : (
      <svg className="w-4 h-4 text-blue-600 transform -rotate-180" fill="currentColor" viewBox="0 0 20 20">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.797l.291 2.055a1 1 0 01-.471 1.032l-1.107.554a8.001 8.001 0 006.289 6.289l.554-1.107a1 1 0 011.032-.471l2.055.291a1 1 0 01.797.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
      </svg>
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600';
      case 'missed':
        return 'text-red-600';
      case 'rejected':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-50';
      case 'missed':
        return 'bg-red-50';
      case 'rejected':
        return 'bg-yellow-50';
      default:
        return 'bg-gray-50';
    }
  };

  return (
    <div
      onClick={() => onCallClick?.(call.id)}
      className={`border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow ${
        onCallClick ? 'cursor-pointer' : ''
      } ${getStatusBadgeColor(call.status)}`}
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        {call.participantAvatar ? (
          <Image
            src={call.participantAvatar}
            alt={call.participantName}
            width={40}
            height={40}
            className="rounded-full object-cover flex-shrink-0"
            unoptimized={call.participantAvatar.startsWith('http')}
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
            </svg>
          </div>
        )}

        {/* Call Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-medium text-gray-900 truncate">{call.participantName}</p>
            {getDirectionIcon(call.direction, call.callType)}
          </div>
          <p className={`text-xs ${getStatusColor(call.status)} font-medium capitalize`}>
            {call.status === 'completed' ? formatDuration(call.duration) : call.status}
          </p>
        </div>

        {/* Time */}
        <div className="text-right text-xs text-gray-500 flex-shrink-0">
          <p>{formatTime(call.timestamp)}</p>
          {call.callType === 'video' && (
            <p className="text-gray-400 text-xs mt-1">
              <svg className="w-3 h-3 inline mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              Video
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

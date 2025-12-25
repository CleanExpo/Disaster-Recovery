'use client';

import React, { useState, useEffect } from 'react';
import { Activity, AlertCircle } from 'lucide-react';

interface LiveStatusIndicatorProps {
  status: 'pending' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  lastUpdate?: Date;
  isLive?: boolean;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const statusConfig = {
  pending: {
    color: 'bg-yellow-400',
    label: 'Pending',
    description: 'Awaiting assignment',
  },
  assigned: {
    color: 'bg-blue-400',
    label: 'Assigned',
    description: 'Contractor assigned',
  },
  in_progress: {
    color: 'bg-purple-400',
    label: 'In Progress',
    description: 'Work in progress',
  },
  completed: {
    color: 'bg-green-400',
    label: 'Completed',
    description: 'Work completed',
  },
  cancelled: {
    color: 'bg-red-400',
    label: 'Cancelled',
    description: 'Booking cancelled',
  },
};

const sizeClasses = {
  sm: 'w-2 h-2',
  md: 'w-3 h-3',
  lg: 'w-4 h-4',
};

export default function LiveStatusIndicator({
  status,
  lastUpdate,
  isLive = true,
  showLabel = true,
  size = 'md',
}: LiveStatusIndicatorProps) {
  const config = statusConfig[status];
  const [pulseAnimation, setPulseAnimation] = useState(true);

  useEffect(() => {
    // Stop pulsing after 5 seconds
    const timer = setTimeout(() => setPulseAnimation(false), 5000);
    return () => clearTimeout(timer);
  }, [status]);

  return (
    <div className="flex items-center gap-2">
      {/* Status Indicator Dot */}
      <div className="relative">
        <div
          className={`${sizeClasses[size]} ${config.color} rounded-full ${
            isLive && pulseAnimation ? 'animate-pulse' : ''
          }`}
        />
        {isLive && pulseAnimation && (
          <div
            className={`absolute inset-0 ${config.color} rounded-full animate-ping opacity-75`}
          />
        )}
      </div>

      {/* Label and Description */}
      {showLabel && (
        <div className="flex flex-col">
          <span className="font-semibold text-sm text-slate-900">{config.label}</span>
          <span className="text-xs text-slate-500">{config.description}</span>
          {lastUpdate && (
            <span className="text-xs text-slate-400 mt-1">
              Updated {formatRelativeTime(lastUpdate)}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

/**
 * Live Status Card - More detailed version
 */
interface LiveStatusCardProps {
  id: string;
  title: string;
  status: string;
  lastUpdate?: Date;
  details?: Record<string, string>;
  onClick?: () => void;
}

export function LiveStatusCard({
  id,
  title,
  status,
  lastUpdate,
  details,
  onClick,
}: LiveStatusCardProps) {
  const statusColor = {
    pending: 'border-yellow-200 bg-yellow-50',
    assigned: 'border-blue-200 bg-blue-50',
    in_progress: 'border-purple-200 bg-purple-50',
    completed: 'border-green-200 bg-green-50',
    cancelled: 'border-red-200 bg-red-50',
  } as Record<string, string>;

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;

  return (
    <div
      onClick={onClick}
      className={`border-l-4 p-4 rounded-lg cursor-pointer transition-all hover:shadow-md ${
        statusColor[status] || 'border-slate-200 bg-slate-50'
      }`}
    >
      <div className="flex items-start justify-between mb-2">
        <div>
          <p className="font-semibold text-slate-900">{title}</p>
          <p className="text-sm text-slate-500">ID: {id}</p>
        </div>
        <Activity className={`w-5 h-5 ${config.color.replace('bg-', 'text-')}`} />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <div className={`w-2 h-2 rounded-full ${config.color}`} />
        <span className="text-sm font-medium text-slate-900">{config.label}</span>
      </div>

      {lastUpdate && (
        <p className="text-xs text-slate-500 mb-2">
          Last update: {formatRelativeTime(lastUpdate)}
        </p>
      )}

      {details && Object.keys(details).length > 0 && (
        <div className="space-y-1 text-sm">
          {Object.entries(details).map(([key, value]) => (
            <div key={key} className="flex justify-between">
              <span className="text-slate-600">{key}:</span>
              <span className="font-medium text-slate-900">{value}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Connection Status Indicator
 */
interface ConnectionStatusProps {
  isConnected: boolean;
  latency?: number;
  showLatency?: boolean;
}

export function ConnectionStatus({
  isConnected,
  latency,
  showLatency = true,
}: ConnectionStatusProps) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div
        className={`w-2 h-2 rounded-full ${
          isConnected ? 'bg-green-500' : 'bg-red-500'
        } animate-pulse`}
      />
      <span className={isConnected ? 'text-green-700' : 'text-red-700'}>
        {isConnected ? 'Connected' : 'Disconnected'}
      </span>
      {showLatency && latency !== undefined && (
        <span className="text-xs text-slate-500">({latency}ms)</span>
      )}
    </div>
  );
}

/**
 * Real-time Counter
 */
interface RealTimeCounterProps {
  value: number;
  label: string;
  previousValue?: number;
  formatValue?: (value: number) => string;
}

export function RealTimeCounter({
  value,
  label,
  previousValue,
  formatValue,
}: RealTimeCounterProps) {
  const [animateChange, setAnimateChange] = useState(false);

  useEffect(() => {
    if (previousValue !== undefined && value !== previousValue) {
      setAnimateChange(true);
      const timer = setTimeout(() => setAnimateChange(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [value, previousValue]);

  return (
    <div className="text-center p-4 bg-white rounded-lg border border-slate-200">
      <p className="text-3xl font-bold text-slate-900">
        {formatValue ? formatValue(value) : value}
      </p>
      <p className="text-sm text-slate-600 mt-1">{label}</p>
      {animateChange && (
        <p className={`text-xs mt-2 ${value > (previousValue || 0) ? 'text-green-600' : 'text-red-600'}`}>
          {value > (previousValue || 0) ? '↑' : '↓'} {Math.abs((value || 0) - (previousValue || 0))}
        </p>
      )}
    </div>
  );
}

/**
 * Format relative time
 */
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);

  if (diffMins < 1) return 'just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;

  return date.toLocaleDateString();
}

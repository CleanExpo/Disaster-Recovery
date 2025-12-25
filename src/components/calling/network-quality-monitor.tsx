'use client';

import { useState, useEffect } from 'react';
import { useBandwidthOptimization } from '@/hooks/useBandwidthOptimization';

interface NetworkQualityMonitorProps {
  callId: string;
  compact?: boolean;
  showDetails?: boolean;
}

/**
 * NetworkQualityMonitor Component
 *
 * Display network quality status and optimization recommendations
 */
export function NetworkQualityMonitor({
  callId,
  compact = false,
  showDetails = true,
}: NetworkQualityMonitorProps) {
  const {
    currentQuality,
    metrics,
    status,
    recommendations,
    setQuality,
    getQualityProfile,
  } = useBandwidthOptimization({
    callId,
    autoOptimize: true,
  });

  const qualityProfile = getQualityProfile();

  if (compact) {
    return (
      <div
        className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium ${
          status === 'excellent'
            ? 'bg-green-100 text-green-800'
            : status === 'good'
              ? 'bg-blue-100 text-blue-800'
              : status === 'fair'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
        }`}
      >
        <div
          className={`w-2 h-2 rounded-full ${
            status === 'excellent'
              ? 'bg-green-600'
              : status === 'good'
                ? 'bg-blue-600'
                : status === 'fair'
                  ? 'bg-yellow-600'
                  : 'bg-red-600'
          }`}
        />
        <span className="capitalize">{status || 'unknown'}</span>
        <span className="text-xs opacity-75">({currentQuality})</span>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Network Quality</h3>
        <div
          className={`px-3 py-1 rounded-full text-sm font-semibold ${
            status === 'excellent'
              ? 'bg-green-100 text-green-800'
              : status === 'good'
                ? 'bg-blue-100 text-blue-800'
                : status === 'fair'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
          }`}
        >
          {status === 'unknown' ? 'Analyzing...' : status?.charAt(0).toUpperCase() + status?.slice(1)}
        </div>
      </div>

      {/* Quality Indicator */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">Quality Level</span>
          <span className="text-sm font-semibold text-gray-900 capitalize">
            {currentQuality}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all ${
              currentQuality === 'high'
                ? 'w-full bg-green-600'
                : currentQuality === 'medium'
                  ? 'w-2/3 bg-yellow-600'
                  : 'w-1/3 bg-red-600'
            }`}
          />
        </div>
      </div>

      {/* Metrics */}
      {showDetails && metrics && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-medium">Current Bitrate</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {Math.round(metrics.currentBitrate)} kbps
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-medium">Available Bandwidth</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {Math.round(metrics.estimatedBandwidth)} kbps
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-medium">Packet Loss</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {metrics.packetLoss.toFixed(2)}%
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-medium">Latency (RTT)</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {Math.round(metrics.rtt)} ms
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-medium">Jitter</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {Math.round(metrics.jitter)} ms
            </p>
          </div>

          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-medium">Audio Bitrate</p>
            <p className="text-sm font-semibold text-gray-900 mt-1">
              {Math.round(metrics.audioBitrate)} kbps
            </p>
          </div>
        </div>
      )}

      {/* Quality Profile Info */}
      <div className="bg-blue-50 border border-blue-200 rounded p-3 mb-4">
        <p className="text-sm text-blue-900 font-medium">
          Current Profile: <span className="font-semibold capitalize">{currentQuality}</span>
        </p>
        <p className="text-xs text-blue-700 mt-1">
          Bandwidth: {qualityProfile.bandwidth} kbps • Video:{' '}
          {qualityProfile.video.resolution} @ {qualityProfile.video.frameRate}fps
        </p>
      </div>

      {/* Quality Controls */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 font-medium mb-2">Adjust Quality</p>
        <div className="flex gap-2">
          {(['low', 'medium', 'high'] as const).map((quality) => (
            <button
              key={quality}
              onClick={() => setQuality(quality)}
              className={`flex-1 px-3 py-2 rounded text-sm font-medium transition-colors ${
                currentQuality === quality
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {quality.charAt(0).toUpperCase() + quality.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
          <p className="text-sm font-semibold text-yellow-900 mb-2">Recommendations</p>
          <ul className="space-y-1">
            {recommendations.map((rec, i) => (
              <li key={i} className="text-xs text-yellow-800 flex gap-2">
                <span>•</span>
                <span>{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

/**
 * NetworkQualityIndicator Component
 *
 * Minimal indicator showing just network status
 */
export function NetworkQualityIndicator({ callId }: { callId: string }) {
  const { status } = useBandwidthOptimization({
    callId,
    autoOptimize: true,
  });

  const statusConfig = {
    excellent: {
      color: 'bg-green-500',
      label: 'Excellent',
      dots: 4,
    },
    good: {
      color: 'bg-blue-500',
      label: 'Good',
      dots: 3,
    },
    fair: {
      color: 'bg-yellow-500',
      label: 'Fair',
      dots: 2,
    },
    poor: {
      color: 'bg-red-500',
      label: 'Poor',
      dots: 1,
    },
    unknown: {
      color: 'bg-gray-400',
      label: 'Analyzing',
      dots: 1,
    },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2">
      <div className="flex gap-0.5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`w-1 h-3 rounded-sm ${
              i < config.dots ? config.color : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-medium text-gray-600">{config.label}</span>
    </div>
  );
}

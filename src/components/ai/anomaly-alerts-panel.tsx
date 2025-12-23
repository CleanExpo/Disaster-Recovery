'use client';

import { useEffect, useState } from 'react';
import { useAnomalyDetection } from '@/hooks/useAI';

interface AnomalyAlertsPanelProps {
  entityId?: string;
  entityType?: 'user' | 'room' | 'system';
  autoRefresh?: boolean;
  refreshInterval?: number;
}

/**
 * Anomaly Alerts Panel Component
 *
 * Display detected anomalies and alerts
 */
export function AnomalyAlertsPanel({
  entityId = null,
  entityType = 'system',
  autoRefresh = true,
  refreshInterval = 60000,
}: AnomalyAlertsPanelProps) {
  const { anomalies, isLoading, error, detectAnomalies } = useAnomalyDetection(entityId, entityType);
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');

  useEffect(() => {
    const refreshData = async () => {
      await detectAnomalies();
    };

    if (autoRefresh) {
      refreshData();
      const interval = setInterval(refreshData, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [entityId, entityType, autoRefresh, refreshInterval, detectAnomalies]);

  if (isLoading && !anomalies) {
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

  if (!anomalies) {
    return null;
  }

  const { overallScore, riskLevel, anomalies: anomalyList = [] } = anomalies;

  const filteredAnomalies = filter === 'all' ? anomalyList : anomalyList.filter((a: any) => a.severity === filter);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-blue-100 text-blue-800 border-blue-300';
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-900">🚨 Anomaly Detection</h2>
        <div className={`px-4 py-2 rounded-lg font-bold text-sm ${getRiskColor(riskLevel)}`}>
          Risk: {riskLevel.toUpperCase()}
        </div>
      </div>

      {/* Overall Risk Score */}
      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <p className="text-sm font-medium text-gray-600 mb-2">Overall Anomaly Score</p>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
              <div
                className={`h-full transition-all ${overallScore > 60 ? 'bg-red-600' : overallScore > 30 ? 'bg-yellow-600' : 'bg-green-600'}`}
                style={{ width: `${overallScore}%` }}
              ></div>
            </div>
          </div>
          <span className="text-2xl font-bold text-gray-900">{overallScore}/100</span>
        </div>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 mb-4">
        {(['all', 'high', 'medium', 'low'] as const).map((severity) => (
          <button
            key={severity}
            onClick={() => setFilter(severity)}
            className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === severity
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {severity.charAt(0).toUpperCase() + severity.slice(1)}
          </button>
        ))}
      </div>

      {/* Anomalies List */}
      <div className="space-y-3">
        {filteredAnomalies.length > 0 ? (
          filteredAnomalies.map((anomaly: any, idx: number) => (
            <div key={anomaly.id || idx} className={`p-4 rounded-lg border-l-4 ${getSeverityColor(anomaly.severity)}`}>
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-bold text-sm">{anomaly.title}</h4>
                  <p className="text-xs opacity-75 mt-1">{anomaly.description}</p>
                </div>
                <span className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ${getSeverityColor(anomaly.severity)}`}>
                  {anomaly.severity.toUpperCase()}
                </span>
              </div>

              {anomaly.recommendation && (
                <div className="mt-2 p-2 bg-white bg-opacity-50 rounded text-xs">
                  <strong>💡 Recommendation:</strong> {anomaly.recommendation}
                </div>
              )}

              <p className="text-xs opacity-75 mt-2">
                Detected: {new Date(anomaly.detectedAt).toLocaleTimeString()}
              </p>
            </div>
          ))
        ) : (
          <div className="text-center py-8">
            <p className="text-green-600 text-lg font-bold">✓ No anomalies detected</p>
            <p className="text-gray-600 text-sm mt-1">Everything looks normal</p>
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <button
        onClick={() => detectAnomalies()}
        disabled={isLoading}
        className="w-full mt-4 px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors disabled:text-gray-400 disabled:border-gray-300 disabled:hover:bg-white"
      >
        {isLoading ? '⟳ Checking...' : '🔄 Check Now'}
      </button>
    </div>
  );
}

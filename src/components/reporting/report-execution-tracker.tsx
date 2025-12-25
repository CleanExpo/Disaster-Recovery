'use client';

import { useEffect, useState, useCallback } from 'react';

interface ReportExecution {
  id: string;
  scheduleId: string;
  dashboardId: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  startedAt: string;
  completedAt?: string;
  errorMessage?: string;
  fileSize?: number;
  recipients: string[];
  format: string;
  deliveryStatus?: Record<string, 'sent' | 'failed'>;
}

interface ReportExecutionTrackerProps {
  dashboardId?: string;
  scheduleId?: string;
  autoRefresh?: boolean;
  refreshInterval?: number;
}

/**
 * Report Execution Tracker Component
 *
 * Track report generation and delivery status
 */
export function ReportExecutionTracker({
  dashboardId,
  scheduleId,
  autoRefresh = true,
  refreshInterval = 30000,
}: ReportExecutionTrackerProps) {
  const [executions, setExecutions] = useState<ReportExecution[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<'all' | 'pending' | 'in_progress' | 'completed' | 'failed'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const fetchExecutions = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();
      if (dashboardId) params.append('dashboardId', dashboardId);
      if (scheduleId) params.append('scheduleId', scheduleId);

      const response = await fetch(`/api/reports/executions?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to fetch executions');
      }

      const data = await response.json();
      setExecutions(data.executions || []);
    } catch (err: any) {
      setError(err.message || 'Error loading executions');
    } finally {
      setIsLoading(false);
    }
  }, [dashboardId, scheduleId]);

  useEffect(() => {
    fetchExecutions();

    if (autoRefresh) {
      const interval = setInterval(fetchExecutions, refreshInterval);
      return () => clearInterval(interval);
    }
  }, [dashboardId, scheduleId, autoRefresh, refreshInterval, fetchExecutions]);

  const filteredExecutions =
    filter === 'all' ? executions : executions.filter((e) => e.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return '✓';
      case 'in_progress':
        return '⟳';
      case 'failed':
        return '✕';
      default:
        return '⏳';
    }
  };

  const getDuration = (startedAt: string, completedAt?: string) => {
    const start = new Date(startedAt).getTime();
    const end = completedAt ? new Date(completedAt).getTime() : Date.now();
    const duration = (end - start) / 1000;

    if (duration < 60) return `${Math.round(duration)}s`;
    if (duration < 3600) return `${Math.round(duration / 60)}m`;
    return `${Math.round(duration / 3600)}h`;
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return 'N/A';
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  if (isLoading && executions.length === 0) {
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

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-900">📋 Report Execution History</h2>
          <p className="text-gray-600 text-sm mt-1">View generation and delivery status</p>
        </div>

        <button
          onClick={fetchExecutions}
          disabled={isLoading}
          className="px-4 py-2 text-sm text-blue-600 hover:text-blue-700 font-medium border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors disabled:text-gray-400 disabled:border-gray-300"
        >
          {isLoading ? '⟳ Refreshing...' : '🔄 Refresh'}
        </button>
      </div>

      {/* Filter Buttons */}
      <div className="flex gap-2 flex-wrap">
        {(['all', 'pending', 'in_progress', 'completed', 'failed'] as const).map((status) => (
          <button
            key={status}
            onClick={() => setFilter(status)}
            className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
              filter === status
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {status === 'all' && 'All'}
            {status === 'pending' && '⏳ Pending'}
            {status === 'in_progress' && '⟳ In Progress'}
            {status === 'completed' && '✓ Completed'}
            {status === 'failed' && '✕ Failed'}
          </button>
        ))}
      </div>

      {/* Executions List */}
      <div className="space-y-3">
        {filteredExecutions.length > 0 ? (
          filteredExecutions.map((execution) => (
            <div
              key={execution.id}
              className="bg-white rounded-lg shadow border-l-4 overflow-hidden"
            >
              {/* Main Row */}
              <button
                onClick={() =>
                  setExpandedId(expandedId === execution.id ? null : execution.id)
                }
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors border-l-4 ${getStatusColor(
                  execution.status
                ).split(' ')[0]}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3">
                      <span className={`text-xl ${getStatusColor(execution.status)}`}>
                        {getStatusIcon(execution.status)}
                      </span>
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          Report Execution #{execution.id.slice(-8)}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {new Date(execution.startedAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        execution.status
                      )}`}
                    >
                      {execution.status.replace('_', ' ').toUpperCase()}
                    </span>
                    <p className="text-sm text-gray-600 mt-1">
                      {getDuration(execution.startedAt, execution.completedAt)}
                    </p>
                  </div>
                </div>

                {/* Summary Line */}
                <div className="flex gap-4 mt-3 text-xs text-gray-600">
                  <span>{execution.format.toUpperCase()}</span>
                  <span>📧 {execution.recipients.length} recipient(s)</span>
                  {execution.fileSize && <span>📦 {formatFileSize(execution.fileSize)}</span>}
                </div>
              </button>

              {/* Expanded Details */}
              {expandedId === execution.id && (
                <div className="border-t border-gray-200 bg-gray-50 p-4 space-y-3">
                  {/* Basic Info */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-600">Format</p>
                      <p className="font-semibold text-gray-900">
                        {execution.format.toUpperCase()}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Duration</p>
                      <p className="font-semibold text-gray-900">
                        {getDuration(execution.startedAt, execution.completedAt)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">File Size</p>
                      <p className="font-semibold text-gray-900">
                        {formatFileSize(execution.fileSize)}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600">Status</p>
                      <p className="font-semibold text-gray-900 capitalize">
                        {execution.status.replace('_', ' ')}
                      </p>
                    </div>
                  </div>

                  {/* Timeline */}
                  <div className="border-t pt-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">Timeline</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Started</span>
                        <span className="text-gray-900">
                          {new Date(execution.startedAt).toLocaleString()}
                        </span>
                      </div>
                      {execution.completedAt && (
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Completed</span>
                          <span className="text-gray-900">
                            {new Date(execution.completedAt).toLocaleString()}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Recipients & Delivery Status */}
                  <div className="border-t pt-3">
                    <p className="text-sm font-semibold text-gray-700 mb-2">
                      Recipients ({execution.recipients.length})
                    </p>
                    <div className="space-y-1">
                      {execution.recipients.map((recipient) => {
                        const status = execution.deliveryStatus?.[recipient];
                        return (
                          <div
                            key={recipient}
                            className="flex items-center justify-between text-sm"
                          >
                            <span className="text-gray-700">{recipient}</span>
                            {status && (
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${
                                  status === 'sent'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}
                              >
                                {status === 'sent' ? '✓ Sent' : '✕ Failed'}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Error Message */}
                  {execution.errorMessage && (
                    <div className="border-t pt-3 bg-red-50 p-3 rounded border border-red-200">
                      <p className="text-sm font-semibold text-red-800 mb-1">Error</p>
                      <p className="text-sm text-red-700">{execution.errorMessage}</p>
                    </div>
                  )}

                  {/* Timestamps */}
                  <div className="border-t pt-3 text-xs text-gray-600">
                    <p>ID: {execution.id}</p>
                    <p>Schedule: {execution.scheduleId}</p>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-8 bg-white rounded-lg shadow">
            <p className="text-gray-600">No executions found</p>
          </div>
        )}
      </div>

      {/* Statistics */}
      {executions.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-white rounded-lg shadow p-4">
          <div>
            <p className="text-gray-600 text-sm">Total Executions</p>
            <p className="text-2xl font-bold text-gray-900">{executions.length}</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Success Rate</p>
            <p className="text-2xl font-bold text-green-600">
              {Math.round(
                (executions.filter((e) => e.status === 'completed').length /
                  executions.length) *
                  100
              )}
              %
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Failed</p>
            <p className="text-2xl font-bold text-red-600">
              {executions.filter((e) => e.status === 'failed').length}
            </p>
          </div>
          <div>
            <p className="text-gray-600 text-sm">Pending</p>
            <p className="text-2xl font-bold text-yellow-600">
              {executions.filter((e) => e.status === 'pending').length}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

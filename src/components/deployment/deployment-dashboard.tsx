'use client';

import { useEffect, useState } from 'react';
import { useDeploymentConfig, useDeploymentPipeline, useDeploymentMonitoring } from '@/hooks/useDeployment';

/**
 * Deployment Dashboard Component
 *
 * Complete deployment management interface with environment, pipeline, and monitoring views
 */
export function DeploymentDashboard() {
  const config = useDeploymentConfig();
  const pipeline = useDeploymentPipeline();
  const monitoring = useDeploymentMonitoring();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'environments' | 'pipelines' | 'monitoring' | 'alerts'>('overview');
  const [selectedEnv, setSelectedEnv] = useState<string>('development');

  const tabs = [
    { id: 'overview', label: '🚀 Overview', icon: '🚀' },
    { id: 'environments', label: '🌍 Environments', icon: '🌍' },
    { id: 'pipelines', label: '⚙️ Pipelines', icon: '⚙️' },
    { id: 'monitoring', label: '📊 Monitoring', icon: '📊' },
    { id: 'alerts', label: '🚨 Alerts', icon: '🚨' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">🚀 Deployment Management</h1>
        <p className="text-gray-600 mt-1">Manage environments, pipelines, and monitor infrastructure health</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200 overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 whitespace-nowrap ${
              selectedTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {config.isLoading || pipeline.isLoading || monitoring.isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-sm text-gray-600">Total Deployments</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {pipeline.statistics?.totalDeployments || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Success rate: {pipeline.statistics?.successRate.toFixed(1) || 0}%
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-sm text-gray-600">Active Environments</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {config.environments.length}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {config.environments.filter((e: any) => e.status === 'ready').length} ready
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-sm text-gray-600">Active Alerts</p>
                  <p className={`text-3xl font-bold ${
                    monitoring.alerts.length > 0 ? 'text-red-600' : 'text-green-600'
                  } mt-2`}>
                    {monitoring.alerts.length}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {monitoring.alerts.filter((a: any) => a.severity === 'critical').length} critical
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-sm text-gray-600">System Health</p>
                  <p className={`text-3xl font-bold mt-2 ${
                    monitoring.healthStatus?.overallStatus === 'healthy' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {monitoring.healthStatus?.overallStatus || 'unknown'}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Uptime: {monitoring.uptime?.uptime.toFixed(2) || 0}%
                  </p>
                </div>
              </div>

              {/* Recent Deployments */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📋 Recent Deployments</h3>

                {pipeline.jobHistory.length > 0 ? (
                  <div className="space-y-3">
                    {pipeline.jobHistory.slice(0, 5).map((job: any) => (
                      <div
                        key={job.id}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{job.pipelineId}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            {job.environment} • Version {job.version}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className={`inline-block px-3 py-1 rounded-full text-xs font-bold ${
                              job.status === 'completed'
                                ? 'bg-green-100 text-green-700'
                                : job.status === 'failed'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-blue-100 text-blue-700'
                            }`}
                          >
                            {job.status}
                          </span>
                          <p className="text-xs text-gray-600 mt-1">
                            {new Date(job.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No deployments yet</p>
                )}
              </div>

              {/* Component Health */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🏥 Component Health</h3>

                {monitoring.healthStatus?.components ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(monitoring.healthStatus.components).map(
                      ([name, health]: [string, any]) => (
                        <div
                          key={name}
                          className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        >
                          <div>
                            <p className="font-medium text-gray-900">{name}</p>
                            <p className="text-xs text-gray-600">
                              {health.responseTime.toFixed(0)}ms response time
                            </p>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-bold ${
                              health.status === 'healthy'
                                ? 'bg-green-100 text-green-700'
                                : health.status === 'degraded'
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                            }`}
                          >
                            {health.status}
                          </span>
                        </div>
                      )
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500">No component data</p>
                )}
              </div>
            </div>
          )}

          {/* Environments Tab */}
          {selectedTab === 'environments' && (
            <div className="space-y-4">
              {config.environments.length > 0 ? (
                config.environments.map((env: any) => (
                  <div key={env.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{env.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">{env.description}</p>
                        <div className="mt-3 space-y-1 text-sm">
                          <p className="text-gray-700">
                            <span className="font-medium">URL:</span> {env.url}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">API:</span> {env.apiUrl}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Status:</span> {env.status}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            config.checkReadiness(env.id);
                            setSelectedEnv(env.id);
                          }}
                          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                        >
                          Check Readiness
                        </button>
                      </div>
                    </div>

                    {/* Readiness Info */}
                    {config.readiness && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium text-gray-900">Deployment Readiness</p>
                            <p className="text-xs text-gray-600">Score: {config.readiness.score}%</p>
                          </div>
                          <div className="w-32 bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full ${
                                config.readiness.score >= 80 ? 'bg-green-600' : 'bg-yellow-600'
                              }`}
                              style={{ width: `${config.readiness.score}%` }}
                            ></div>
                          </div>
                        </div>

                        {config.readiness.issues && config.readiness.issues.length > 0 && (
                          <div className="mt-2 space-y-1">
                            {config.readiness.issues.map((issue: string, i: number) => (
                              <p key={i} className="text-xs text-yellow-700">
                                ⚠️ {issue}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No environments found</p>
              )}
            </div>
          )}

          {/* Pipelines Tab */}
          {selectedTab === 'pipelines' && (
            <div className="space-y-4">
              {pipeline.pipelines.length > 0 ? (
                pipeline.pipelines.map((p: any) => (
                  <div key={p.id} className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{p.name}</h3>
                        <p className="text-sm text-gray-600 mt-1">ID: {p.id}</p>
                        <div className="mt-3 space-y-2">
                          <p className="text-sm">
                            <span className="font-medium">Trigger:</span> {p.triggerOn}
                          </p>
                          <p className="text-sm">
                            <span className="font-medium">Stages:</span> {p.stages.length}
                          </p>
                          <div className="flex gap-2 mt-2">
                            {p.stages.map((stage: any, i: number) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                              >
                                {stage.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <button
                        onClick={() => pipeline.loadJobHistory(p.id)}
                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
                      >
                        View History
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No pipelines found</p>
              )}
            </div>
          )}

          {/* Monitoring Tab */}
          {selectedTab === 'monitoring' && (
            <div className="space-y-6">
              {/* Performance Metrics */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Performance Metrics</h3>

                {monitoring.trends && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900">Average CPU Usage</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {monitoring.trends.avgCpuUsage.toFixed(1)}%
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900">Average Memory Usage</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {monitoring.trends.avgMemoryUsage.toFixed(1)}%
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900">Average Latency</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {monitoring.trends.avgLatency.toFixed(0)}ms
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900">Max Error Rate</p>
                      <p className="text-2xl font-bold text-gray-900 mt-2">
                        {monitoring.trends.maxErrorRate.toFixed(2)}%
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Uptime Stats */}
              {monitoring.uptime && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Uptime Statistics</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900">Uptime</p>
                      <p className="text-3xl font-bold text-green-600 mt-2">
                        {monitoring.uptime.uptime.toFixed(2)}%
                      </p>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900">MTBF</p>
                      <p className="text-3xl font-bold text-blue-600 mt-2">
                        {(monitoring.uptime.mtbf / (1000 * 60 * 60)).toFixed(1)}h
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900">MTTR</p>
                      <p className="text-3xl font-bold text-purple-600 mt-2">
                        {(monitoring.uptime.mttr / (1000 * 60)).toFixed(1)}m
                      </p>
                    </div>
                  </div>

                  {monitoring.uptime.downtimeEvents && monitoring.uptime.downtimeEvents.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm font-medium text-gray-900 mb-2">Recent Downtime Events</p>
                      <div className="space-y-2">
                        {monitoring.uptime.downtimeEvents.slice(0, 5).map((event: any, i: number) => (
                          <div key={i} className="text-xs text-gray-600">
                            <p>
                              {new Date(event.startTime).toLocaleString()} -{' '}
                              {new Date(event.endTime).toLocaleString()}
                            </p>
                            <p className="text-gray-500">Duration: {(event.duration / (1000 * 60)).toFixed(1)}m</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Alerts Tab */}
          {selectedTab === 'alerts' && (
            <div className="space-y-4">
              {monitoring.alerts.length > 0 ? (
                monitoring.alerts.map((alert: any) => (
                  <div
                    key={alert.id}
                    className={`rounded-lg shadow p-6 border-l-4 ${
                      alert.severity === 'critical'
                        ? 'bg-red-50 border-red-500'
                        : 'bg-yellow-50 border-yellow-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className={`font-bold ${
                          alert.severity === 'critical' ? 'text-red-700' : 'text-yellow-700'
                        }`}>
                          {alert.message}
                        </p>
                        <p className="text-xs text-gray-600 mt-2">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          alert.severity === 'critical'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}>
                          {alert.severity}
                        </span>
                        {!alert.acknowledged && (
                          <button
                            onClick={() => monitoring.acknowledgeAlert(alert.id)}
                            className="px-3 py-1 bg-gray-600 hover:bg-gray-700 text-white text-xs font-bold rounded-lg transition-colors"
                          >
                            Acknowledge
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <p className="text-green-600 font-medium">✓ No active alerts</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

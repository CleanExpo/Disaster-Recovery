'use client';

import { useEffect, useState } from 'react';
import { usePlatformIntegration, useServiceBus, useWorkflowOrchestration } from '@/hooks/usePlatform';

/**
 * Platform Monitor Component
 *
 * Real-time monitoring of platform integration, service bus, and workflow orchestration
 */
export function PlatformMonitor() {
  const platform = usePlatformIntegration();
  const bus = useServiceBus();
  const workflows = useWorkflowOrchestration();
  const [selectedTab, setSelectedTab] = useState<'overview' | 'services' | 'bus' | 'workflows' | 'dlq'>('overview');

  const tabs = [
    { id: 'overview', label: '🎯 Overview', icon: '🎯' },
    { id: 'services', label: '🔧 Services', icon: '🔧' },
    { id: 'bus', label: '📡 Service Bus', icon: '📡' },
    { id: 'workflows', label: '⚙️ Workflows', icon: '⚙️' },
    { id: 'dlq', label: '⚠️ Dead Letter Queue', icon: '⚠️' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">🎯 Platform Monitor</h1>
        <p className="text-gray-600 mt-1">Real-time monitoring of platform integration and service coordination</p>
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

      {platform.isLoading || bus.isLoading || workflows.isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              {/* Platform Health */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-sm text-gray-600">Platform Health</p>
                  <p className={`text-3xl font-bold mt-2 ${
                    platform.platformHealth?.overallHealth === 'healthy' ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {platform.platformHealth?.overallHealth || 'unknown'}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {platform.platformHealth?.serviceHealth}/{platform.platformHealth?.totalServices} services
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-sm text-gray-600">Service Bus</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {bus.busStatistics?.totalMessages || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Messages processed
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-sm text-gray-600">Workflows</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {workflows.orchestratorMetrics?.totalWorkflows || 0}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    Success rate: {workflows.orchestratorMetrics?.successRate.toFixed(1) || 0}%
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-sm text-gray-600">Circuit Breakers</p>
                  <p className={`text-3xl font-bold mt-2 ${
                    bus.circuitBreakers?.filter((b: any) => b.state === 'open').length === 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {bus.circuitBreakers?.filter((b: any) => b.state === 'open').length || 0} open
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {bus.circuitBreakers?.length || 0} total
                  </p>
                </div>
              </div>

              {/* Service Status */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Service Status Overview</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {platform.services.slice(0, 10).map((service: any) => (
                    <div key={service.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{service.name}</p>
                        <p className="text-xs text-gray-600">{service.handlers.length} event handlers</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        service.status === 'running'
                          ? 'bg-green-100 text-green-700'
                          : service.status === 'error'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-gray-100 text-gray-700'
                      }`}>
                        {service.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Workflow Metrics */}
              {workflows.orchestratorMetrics && (
                <div className="bg-white rounded-lg shadow p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">📈 Workflow Execution Metrics</h3>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900">Total Workflows</p>
                      <p className="text-2xl font-bold text-blue-600 mt-2">
                        {workflows.orchestratorMetrics.totalWorkflows}
                      </p>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900">Success Rate</p>
                      <p className="text-2xl font-bold text-green-600 mt-2">
                        {workflows.orchestratorMetrics.successRate.toFixed(1)}%
                      </p>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4">
                      <p className="text-sm font-medium text-gray-900">Avg Duration</p>
                      <p className="text-2xl font-bold text-purple-600 mt-2">
                        {workflows.orchestratorMetrics.averageDuration.toFixed(2)}s
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Services Tab */}
          {selectedTab === 'services' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">🔧 Registered Services</h3>

              {platform.services.length > 0 ? (
                <div className="space-y-3">
                  {platform.services.map((service: any) => (
                    <div
                      key={service.name}
                      className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-gray-900">{service.name}</p>
                          <p className="text-sm text-gray-600 mt-1">
                            Version: {service.version}
                          </p>
                          <p className="text-sm text-gray-600">
                            Last Health Check: {service.lastHealthCheck
                              ? new Date(service.lastHealthCheck).toLocaleString()
                              : 'Never'
                            }
                          </p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            service.status === 'running'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-gray-100 text-gray-700'
                          }`}>
                            {service.status}
                          </span>
                          <span className="text-xs text-gray-600">
                            {service.handlers.length} handlers
                          </span>
                        </div>
                      </div>

                      {service.handlers.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs font-medium text-gray-700 mb-2">Event Handlers:</p>
                          <div className="flex flex-wrap gap-2">
                            {service.handlers.map((handler: string, i: number) => (
                              <span
                                key={i}
                                className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs"
                              >
                                {handler}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No services registered</p>
              )}
            </div>
          )}

          {/* Service Bus Tab */}
          {selectedTab === 'bus' && (
            <div className="space-y-6">
              {/* Circuit Breaker Status */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🔌 Circuit Breakers</h3>

                {bus.circuitBreakers.length > 0 ? (
                  <div className="space-y-3">
                    {bus.circuitBreakers.map((breaker: any) => (
                      <div
                        key={breaker.service}
                        className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                          breaker.state === 'closed'
                            ? 'bg-green-50 border-green-200'
                            : breaker.state === 'open'
                              ? 'bg-red-50 border-red-200'
                              : 'bg-yellow-50 border-yellow-200'
                        }`}
                      >
                        <div>
                          <p className="font-bold text-gray-900">{breaker.service}</p>
                          <p className="text-xs text-gray-600 mt-1">
                            Failures: {breaker.failureCount} | Successes: {breaker.successCount}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                            breaker.state === 'closed'
                              ? 'bg-green-100 text-green-700'
                              : breaker.state === 'open'
                                ? 'bg-red-100 text-red-700'
                                : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {breaker.state}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No circuit breakers</p>
                )}
              </div>

              {/* Message History */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">📝 Recent Messages</h3>

                <button
                  onClick={() => bus.loadMessageHistory(50)}
                  className="mb-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg"
                >
                  Load Message History
                </button>

                {bus.messageHistory.length > 0 ? (
                  <div className="space-y-2 max-h-96 overflow-y-auto">
                    {bus.messageHistory.slice(0, 10).map((msg: any) => (
                      <div
                        key={msg.id}
                        className="p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                      >
                        <p className="font-medium text-gray-900">{msg.type}</p>
                        <p className="text-xs text-gray-600">From: {msg.source}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(msg.timestamp).toLocaleString()}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500">No messages loaded</p>
                )}
              </div>
            </div>
          )}

          {/* Workflows Tab */}
          {selectedTab === 'workflows' && (
            <div className="space-y-4">
              {workflows.workflowHistory.length > 0 ? (
                workflows.workflowHistory.slice(0, 20).map((wf: any) => (
                  <div
                    key={wf.id}
                    className={`rounded-lg shadow p-6 border-l-4 ${
                      wf.status === 'completed'
                        ? 'bg-green-50 border-green-500'
                        : wf.status === 'failed'
                          ? 'bg-red-50 border-red-500'
                          : 'bg-blue-50 border-blue-500'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-bold text-gray-900">{wf.type}</p>
                        <p className="text-sm text-gray-600 mt-1">ID: {wf.id}</p>
                        <p className="text-sm text-gray-600">
                          Steps: {wf.stepCount}
                        </p>
                        <p className="text-xs text-gray-500 mt-2">
                          Started: {new Date(wf.startedAt).toLocaleString()}
                        </p>
                        {wf.completedAt && (
                          <p className="text-xs text-gray-500">
                            Completed: {new Date(wf.completedAt).toLocaleString()}
                          </p>
                        )}
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        wf.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : wf.status === 'failed'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-blue-100 text-blue-700'
                      }`}>
                        {wf.status}
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No workflows executed</p>
              )}
            </div>
          )}

          {/* Dead Letter Queue Tab */}
          {selectedTab === 'dlq' && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">⚠️ Dead Letter Queue</h3>

              {bus.deadLetterQueue.length > 0 ? (
                <div className="space-y-3">
                  <p className="text-sm text-yellow-700 bg-yellow-50 p-3 rounded">
                    {bus.deadLetterQueue.length} message(s) in queue
                  </p>

                  {bus.deadLetterQueue.slice(0, 10).map((msg: any) => (
                    <div
                      key={msg.id}
                      className="border border-red-200 bg-red-50 rounded-lg p-4"
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-bold text-gray-900">{msg.type}</p>
                          <p className="text-sm text-gray-600">From: {msg.source}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(msg.timestamp).toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => bus.retryDLQMessage(msg.id)}
                          className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded"
                        >
                          Retry
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-lg shadow p-6 text-center">
                  <p className="text-green-600 font-medium">✓ Dead letter queue is empty</p>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}

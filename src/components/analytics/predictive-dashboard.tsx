'use client';

import { useEffect, useState } from 'react';
import { usePredictiveAnalytics } from '@/hooks/usePredictiveAnalytics';

/**
 * Predictive Analytics Dashboard Component
 *
 * Display forecasts, predictions, and alerts
 */
export function PredictiveDashboard() {
  const {
    forecasts,
    userBehavior,
    churnRisks,
    anomalyPredictions,
    alerts,
    isLoading,
    error,
    forecastMetric,
    identifyChurnRisks,
    predictAnomalies,
    getActiveAlerts,
  } = usePredictiveAnalytics();

  const [selectedMetric, setSelectedMetric] = useState('daily_active_users');
  const [filterSeverity, setFilterSeverity] = useState<'all' | 'info' | 'warning' | 'critical'>('all');

  useEffect(() => {
    forecastMetric(selectedMetric, 30);
    identifyChurnRisks({ limit: 10 });
    predictAnomalies('system');
    getActiveAlerts();
  }, [selectedMetric, forecastMetric, identifyChurnRisks, predictAnomalies, getActiveAlerts]);

  const metrics = [
    { id: 'daily_active_users', name: 'Daily Active Users', unit: 'users' },
    { id: 'error_rate', name: 'Error Rate', unit: '%' },
    { id: 'message_volume', name: 'Message Volume', unit: 'messages' },
  ];

  const filteredAlerts = alerts
    ? filterSeverity === 'all'
      ? alerts
      : alerts.filter(a => a.severity === filterSeverity)
    : [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">🔮 Predictive Analytics</h1>
        <p className="text-gray-600 mt-1">Forecasts, predictions, and intelligent alerts</p>
      </div>

      {/* Metric Selector */}
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-bold text-gray-900 mb-3">Select Metric</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {metrics.map(metric => (
            <button
              key={metric.id}
              onClick={() => setSelectedMetric(metric.id)}
              className={`p-3 rounded-lg border-2 transition-colors ${
                selectedMetric === metric.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
            >
              <p className="font-semibold text-gray-900">{metric.name}</p>
              <p className="text-xs text-gray-600 mt-1">{metric.unit}</p>
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        </div>
      ) : error ? (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800">Error: {error}</p>
        </div>
      ) : (
        <>
          {/* Forecast Chart */}
          {forecasts && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                📈 30-Day Forecast for {metrics.find(m => m.id === selectedMetric)?.name}
              </h2>

              {/* Simple forecast visualization */}
              <div className="space-y-4">
                {forecasts.slice(0, 10).map((forecast, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-700">
                        Day {idx + 1}: {forecast.predicted.toFixed(0)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {(forecast.confidence * 100).toFixed(0)}% confidence
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{
                            width: `${(forecast.predicted / 250) * 100}%`,
                          }}
                        ></div>
                      </div>
                      <span className="text-xs text-gray-600 w-12 text-right">
                        ±{((forecast.upper95 - forecast.lower95) / 2).toFixed(0)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Forecast stats */}
              <div className="grid grid-cols-3 gap-4 mt-6 pt-6 border-t border-gray-200">
                <div>
                  <p className="text-sm text-gray-600">Trend</p>
                  <p className="text-lg font-bold text-gray-900">
                    {forecasts[forecasts.length - 1]?.predicted >
                    forecasts[0]?.predicted
                      ? '📈 Up'
                      : '📉 Down'}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Avg Confidence</p>
                  <p className="text-lg font-bold text-gray-900">
                    {(
                      forecasts.reduce((sum, f) => sum + f.confidence, 0) /
                      forecasts.length *
                      100
                    ).toFixed(0)}
                    %
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Volatility</p>
                  <p className="text-lg font-bold text-gray-900">
                    {Math.abs(
                      forecasts[forecasts.length - 1]?.predicted -
                        forecasts[0]?.predicted
                    ).toFixed(0)}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Churn Risk Analysis */}
          {churnRisks && churnRisks.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                ⚠️ High Churn Risk Users ({churnRisks.length})
              </h2>

              <div className="space-y-3">
                {churnRisks.slice(0, 5).map((risk: any) => (
                  <div
                    key={risk.userId}
                    className="p-4 bg-gradient-to-r from-red-50 to-orange-50 rounded-lg border border-red-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">
                          User {risk.userId}
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {risk.recommendedAction}
                        </p>
                      </div>
                      <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-sm font-bold">
                        {(risk.churnRisk * 100).toFixed(0)}% risk
                      </span>
                    </div>

                    {risk.riskFactors.length > 0 && (
                      <div className="flex gap-2 flex-wrap mt-2">
                        {risk.riskFactors.map((factor: string) => (
                          <span
                            key={factor}
                            className="text-xs px-2 py-1 bg-red-100 text-red-700 rounded"
                          >
                            {factor}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Alerts */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-gray-900">
                🚨 Active Alerts {alerts && `(${filteredAlerts.length})`}
              </h2>

              <div className="flex gap-2">
                {['all', 'info', 'warning', 'critical'].map(severity => (
                  <button
                    key={severity}
                    onClick={() =>
                      setFilterSeverity(
                        severity as any
                      )
                    }
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      filterSeverity === severity
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {severity === 'all'
                      ? 'All'
                      : severity.charAt(0).toUpperCase() +
                        severity.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {filteredAlerts.length > 0 ? (
              <div className="space-y-3">
                {filteredAlerts.slice(0, 8).map((alert: any) => {
                  const severityColor =
                    alert.severity === 'critical'
                      ? 'bg-red-100 text-red-800 border-red-300'
                      : alert.severity === 'warning'
                        ? 'bg-yellow-100 text-yellow-800 border-yellow-300'
                        : 'bg-blue-100 text-blue-800 border-blue-300';

                  return (
                    <div
                      key={alert.id}
                      className={`p-4 rounded-lg border-l-4 ${severityColor}`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">
                            {alert.title}
                          </h4>
                          <p className="text-sm text-gray-700 mt-1">
                            {alert.message}
                          </p>
                        </div>
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold whitespace-nowrap ml-2 ${
                            alert.acknowledged
                              ? 'bg-gray-100 text-gray-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {alert.acknowledged ? '✓ Acknowledged' : 'Active'}
                        </span>
                      </div>

                      <p className="text-xs text-gray-600 mt-2">
                        {new Date(alert.timestamp).toLocaleString()}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-600">
                <p>✓ No alerts to display</p>
              </div>
            )}
          </div>

          {/* Anomaly Predictions */}
          {anomalyPredictions && anomalyPredictions.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                🔍 Anomaly Predictions
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {anomalyPredictions.slice(0, 4).map((pred: any, idx: number) => (
                  <div
                    key={idx}
                    className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <p className="font-semibold text-gray-900">
                        {pred.entityType.toUpperCase()}
                      </p>
                      <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded text-xs font-bold">
                        {(pred.probabilityOfAnomaly * 100).toFixed(0)}%
                      </span>
                    </div>

                    <p className="text-sm text-gray-700 mb-2">
                      {pred.likelyIssue || 'Potential anomaly detected'}
                    </p>

                    {pred.riskFactors.length > 0 && (
                      <div className="text-xs text-gray-600">
                        <p className="font-medium mb-1">Risk Factors:</p>
                        <ul className="list-disc list-inside space-y-1">
                          {pred.riskFactors.slice(0, 2).map((factor: string) => (
                            <li key={factor}>{factor}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

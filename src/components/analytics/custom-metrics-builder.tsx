'use client';

import { useState } from 'react';
import { usePredictiveAnalytics } from '@/hooks/usePredictiveAnalytics';

/**
 * Custom Metrics Builder Component
 *
 * Create and manage custom metrics
 */
export function CustomMetricsBuilder() {
  const [showBuilder, setShowBuilder] = useState(false);
  const [metrics, setMetrics] = useState<any[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    formula: '',
    variables: '',
    unit: 'count',
    tags: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { createCustomMetric, getCustomMetrics } = usePredictiveAnalytics();

  const handleLoadMetrics = async () => {
    try {
      const loadedMetrics = await getCustomMetrics();
      setMetrics(loadedMetrics || []);
    } catch (error) {
      console.error('Error loading metrics:', error);
    }
  };

  const handleCreateMetric = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Metric name is required');
      return;
    }

    if (!formData.formula.trim()) {
      alert('Formula is required');
      return;
    }

    setIsSubmitting(true);

    try {
      // Parse variables
      const variablePairs = formData.variables
        .split(',')
        .filter(v => v.trim())
        .map(v => {
          const [name, source] = v.trim().split(':').map(s => s.trim());
          return [name, source];
        });

      const variables = new Map(variablePairs as any);

      const metric = await createCustomMetric(
        formData.name,
        formData.formula,
        Object.fromEntries(variables)
      );

      setMetrics([...metrics, metric]);
      setFormData({
        name: '',
        formula: '',
        variables: '',
        unit: 'count',
        tags: '',
      });
      setShowBuilder(false);
    } catch (error) {
      console.error('Error creating metric:', error);
      alert('Failed to create metric');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">📊 Custom Metrics</h2>
          <p className="text-gray-600 mt-1">Build and track custom derived metrics</p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handleLoadMetrics}
            className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white font-bold rounded-lg transition-colors"
          >
            🔄 Load Metrics
          </button>

          <button
            onClick={() => setShowBuilder(!showBuilder)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
          >
            {showBuilder ? '✕ Close' : '+ New Metric'}
          </button>
        </div>
      </div>

      {/* Builder Form */}
      {showBuilder && (
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Create Custom Metric</h3>

          <form onSubmit={handleCreateMetric} className="space-y-4">
            {/* Metric Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Metric Name *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Engagement Score, Revenue Per User"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Formula */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Formula *
              </label>
              <textarea
                value={formData.formula}
                onChange={(e) => setFormData({ ...formData, formula: e.target.value })}
                placeholder="e.g., activeUsers * avgSessionDuration / totalUsers"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                rows={4}
                required
              />
              <p className="text-xs text-gray-600 mt-1">
                Supports: +, -, *, /, %, ^ and Math functions
              </p>
            </div>

            {/* Variables */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Variables
              </label>
              <textarea
                value={formData.variables}
                onChange={(e) => setFormData({ ...formData, variables: e.target.value })}
                placeholder="activeUsers: users.active, avgSessionDuration: sessions.avgDuration"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                rows={3}
              />
              <p className="text-xs text-gray-600 mt-1">
                Format: variableName: dataSource (comma-separated)
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Unit */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Unit
                </label>
                <input
                  type="text"
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                  placeholder="e.g., %, score, $"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Tags
                </label>
                <input
                  type="text"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="e.g., engagement, revenue"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
              >
                {isSubmitting ? 'Creating...' : 'Create Metric'}
              </button>

              <button
                type="button"
                onClick={() => setShowBuilder(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Metrics List */}
      <div>
        {metrics.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric: any) => (
              <div
                key={metric.id}
                onClick={() => setSelectedMetric(selectedMetric === metric.id ? null : metric.id)}
                className={`bg-white rounded-lg shadow hover:shadow-lg transition-shadow cursor-pointer p-6 border-l-4 ${
                  selectedMetric === metric.id
                    ? 'border-blue-500 ring-2 ring-blue-200'
                    : 'border-gray-300'
                }`}
              >
                {/* Metric Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 text-lg">
                      {metric.name}
                    </h3>
                    {metric.unit && (
                      <p className="text-sm text-gray-600 mt-1">
                        Unit: {metric.unit}
                      </p>
                    )}
                  </div>
                </div>

                {/* Formula Preview */}
                <div className="mb-3">
                  <p className="text-xs font-medium text-gray-700 mb-1">Formula:</p>
                  <p className="text-xs text-gray-600 font-mono break-words">
                    {metric.formula.substring(0, 50)}
                    {metric.formula.length > 50 ? '...' : ''}
                  </p>
                </div>

                {/* Tags */}
                {metric.tags && metric.tags.length > 0 && (
                  <div className="flex gap-1 flex-wrap mb-3">
                    {metric.tags.slice(0, 3).map((tag: string) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 pt-3 border-t border-gray-200">
                  <button className="flex-1 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-sm font-medium rounded-lg transition-colors">
                    📊 View
                  </button>
                  <button className="px-3 py-2 bg-red-100 hover:bg-red-200 text-red-700 text-sm font-medium rounded-lg transition-colors">
                    🗑️
                  </button>
                </div>

                {/* Expanded Details */}
                {selectedMetric === metric.id && (
                  <div className="mt-4 pt-4 border-t border-gray-200 space-y-2">
                    <div>
                      <p className="text-xs font-medium text-gray-700">Complete Formula:</p>
                      <p className="text-xs text-gray-600 font-mono mt-1 break-words">
                        {metric.formula}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-medium text-gray-700">Created:</p>
                      <p className="text-xs text-gray-600">
                        {new Date(metric.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg shadow">
            <p className="text-gray-600 text-lg mb-2">No custom metrics yet</p>
            <p className="text-gray-500">Create your first custom metric to track derived values</p>
          </div>
        )}
      </div>

      {/* Formula Guide */}
      <div className="bg-blue-50 rounded-lg border border-blue-200 p-4">
        <h4 className="font-bold text-blue-900 mb-2">📝 Formula Guide</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-blue-800">
          <div>
            <p className="font-medium">Operators:</p>
            <ul className="text-xs mt-1 space-y-1">
              <li>• Addition: a + b</li>
              <li>• Subtraction: a - b</li>
              <li>• Multiplication: a * b</li>
              <li>• Division: a / b</li>
            </ul>
          </div>
          <div>
            <p className="font-medium">Functions:</p>
            <ul className="text-xs mt-1 space-y-1">
              <li>• Absolute: Math.abs(x)</li>
              <li>• Square Root: Math.sqrt(x)</li>
              <li>• Round: Math.round(x)</li>
              <li>• Max: Math.max(a, b)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

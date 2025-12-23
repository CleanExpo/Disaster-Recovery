'use client';

import { useState } from 'react';

interface WidgetConfig {
  type: string;
  title: string;
  size: 'small' | 'medium' | 'large';
  dataSource?: string;
  refreshInterval?: number;
  settings?: Record<string, any>;
}

interface WidgetBuilderProps {
  onWidgetCreate?: (widget: WidgetConfig) => void;
}

/**
 * Widget Builder Component
 *
 * Design and create custom dashboard widgets
 */
export function WidgetBuilder({ onWidgetCreate }: WidgetBuilderProps) {
  const [showBuilder, setShowBuilder] = useState(false);
  const [widgetType, setWidgetType] = useState<'metric' | 'chart' | 'table' | 'gauge' | 'timeline' | 'heatmap'>('metric');
  const [formData, setFormData] = useState({
    title: '',
    size: 'medium' as const,
    dataSource: '',
    refreshInterval: 60,
  });
  const [preview, setPreview] = useState(false);

  const widgetTypes = [
    { id: 'metric', name: 'Metric Card', icon: '📊', description: 'Display key metrics and KPIs' },
    { id: 'chart', name: 'Chart', icon: '📈', description: 'Visualize trends with line/bar charts' },
    { id: 'table', name: 'Table', icon: '📋', description: 'Display tabular data' },
    { id: 'gauge', name: 'Gauge', icon: '🎯', description: 'Show progress with circular gauge' },
    { id: 'timeline', name: 'Timeline', icon: '⏱️', description: 'Display events chronologically' },
    { id: 'heatmap', name: 'Heatmap', icon: '🔥', description: 'Visualize data density and patterns' },
  ];

  const sizes = [
    { id: 'small', name: 'Small', dimensions: '1x1' },
    { id: 'medium', name: 'Medium', dimensions: '2x1' },
    { id: 'large', name: 'Large', dimensions: '2x2' },
  ];

  const handleCreateWidget = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      alert('Widget title is required');
      return;
    }

    if (!formData.dataSource.trim()) {
      alert('Data source is required');
      return;
    }

    const widget: WidgetConfig = {
      type: widgetType,
      title: formData.title,
      size: formData.size,
      dataSource: formData.dataSource,
      refreshInterval: formData.refreshInterval,
    };

    onWidgetCreate?.(widget);

    // Reset form
    setFormData({
      title: '',
      size: 'medium',
      dataSource: '',
      refreshInterval: 60,
    });
    setWidgetType('metric');
    setShowBuilder(false);
  };

  const getTypeConfig = (type: string) => {
    return widgetTypes.find(w => w.id === type);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold text-gray-900">🎨 Widget Builder</h3>
          <p className="text-sm text-gray-600">Add widgets to customize your dashboard</p>
        </div>

        <button
          onClick={() => setShowBuilder(!showBuilder)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
        >
          {showBuilder ? '✕ Close' : '+ Add Widget'}
        </button>
      </div>

      {/* Builder Panel */}
      {showBuilder && (
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h4 className="text-lg font-bold text-gray-900 mb-4">Create New Widget</h4>

          <form onSubmit={handleCreateWidget} className="space-y-4">
            {/* Widget Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Widget Type
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {widgetTypes.map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setWidgetType(type.id as any)}
                    className={`p-3 rounded-lg border-2 transition-colors text-left ${
                      widgetType === type.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <p className="text-xl mb-1">{type.icon}</p>
                    <p className="font-medium text-gray-900">{type.name}</p>
                    <p className="text-xs text-gray-600 mt-1">{type.description}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* Widget Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Widget Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Daily Active Users, Team Performance"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            {/* Data Source */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Source *
              </label>
              <input
                type="text"
                value={formData.dataSource}
                onChange={(e) => setFormData({ ...formData, dataSource: e.target.value })}
                placeholder="e.g., users.activeCount, rooms.messageCount"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                required
              />
              <p className="text-xs text-gray-600 mt-1">
                Path to data in dashboard context (dot notation)
              </p>
            </div>

            {/* Size Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Widget Size
              </label>
              <div className="grid grid-cols-3 gap-2">
                {sizes.map((size) => (
                  <label
                    key={size.id}
                    className={`flex items-center p-3 border-2 rounded-lg cursor-pointer transition-colors ${
                      formData.size === size.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    <input
                      type="radio"
                      name="size"
                      value={size.id}
                      checked={formData.size === size.id}
                      onChange={(e) => setFormData({ ...formData, size: e.target.value as any })}
                      className="w-4 h-4"
                    />
                    <span className="ml-2">
                      <p className="text-sm font-medium text-gray-900">{size.name}</p>
                      <p className="text-xs text-gray-600">{size.dimensions}</p>
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Refresh Interval */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Refresh Interval (seconds)
              </label>
              <input
                type="number"
                value={formData.refreshInterval}
                onChange={(e) => setFormData({ ...formData, refreshInterval: parseInt(e.target.value) })}
                min="30"
                max="3600"
                step="30"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <p className="text-xs text-gray-600 mt-1">How often to refresh widget data</p>
            </div>

            {/* Preview Toggle */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={preview}
                onChange={(e) => setPreview(e.target.checked)}
                className="w-4 h-4 rounded"
              />
              <label className="text-sm font-medium text-gray-700">Preview widget</label>
            </div>

            {/* Preview */}
            {preview && (
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-300">
                <div className="bg-white rounded p-3">
                  <h5 className="font-bold text-gray-900 mb-2">{formData.title || 'Widget Title'}</h5>
                  <div className="h-32 flex items-center justify-center bg-gray-100 rounded text-gray-600 text-sm">
                    <div className="text-center">
                      <p className="text-2xl mb-2">{getTypeConfig(widgetType)?.icon}</p>
                      <p>{getTypeConfig(widgetType)?.name} Widget</p>
                      <p className="text-xs mt-1">{formData.size.toUpperCase()}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Buttons */}
            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
              >
                Create Widget
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

      {/* Widget Type Guide */}
      {!showBuilder && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {widgetTypes.map((type) => (
            <div key={type.id} className="bg-white rounded-lg shadow p-4">
              <p className="text-2xl mb-2">{type.icon}</p>
              <h5 className="font-bold text-gray-900">{type.name}</h5>
              <p className="text-xs text-gray-600 mt-2">{type.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

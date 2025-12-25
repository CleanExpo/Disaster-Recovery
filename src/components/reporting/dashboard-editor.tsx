'use client';

import { useEffect, useState } from 'react';

interface Widget {
  id: string;
  type: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  dataSource: string;
  refreshInterval: number;
}

interface DashboardEditorProps {
  dashboardId: string;
  initialWidgets?: Widget[];
  onWidgetsChange?: (widgets: Widget[]) => void;
  isEditMode?: boolean;
}

/**
 * Dashboard Editor Component
 *
 * Advanced editor for dashboard layout and widget management
 */
export function DashboardEditor({
  dashboardId,
  initialWidgets = [],
  onWidgetsChange,
  isEditMode = true,
}: DashboardEditorProps) {
  const [widgets, setWidgets] = useState<Widget[]>(initialWidgets);
  const [selectedWidgetId, setSelectedWidgetId] = useState<string | null>(null);
  const [gridSize, setGridSize] = useState(12);
  const [showAddWidget, setShowAddWidget] = useState(false);

  useEffect(() => {
    onWidgetsChange?.(widgets);
  }, [widgets, onWidgetsChange]);

  const handleAddWidget = (type: string, title: string) => {
    const newWidget: Widget = {
      id: `widget_${Date.now()}`,
      type,
      title,
      position: { x: 0, y: 0 },
      size: { width: 4, height: 3 },
      dataSource: '',
      refreshInterval: 60,
    };

    setWidgets([...widgets, newWidget]);
    setShowAddWidget(false);
  };

  const handleDeleteWidget = (widgetId: string) => {
    setWidgets(widgets.filter(w => w.id !== widgetId));
    if (selectedWidgetId === widgetId) {
      setSelectedWidgetId(null);
    }
  };

  const handleResizeWidget = (widgetId: string, width: number, height: number) => {
    setWidgets(
      widgets.map(w =>
        w.id === widgetId
          ? { ...w, size: { width: Math.max(1, Math.min(gridSize, width)), height: Math.max(1, height) } }
          : w
      )
    );
  };

  const handleMoveWidget = (widgetId: string, x: number, y: number) => {
    setWidgets(
      widgets.map(w =>
        w.id === widgetId
          ? { ...w, position: { x: Math.max(0, x), y: Math.max(0, y) } }
          : w
      )
    );
  };

  const handleUpdateWidget = (widgetId: string, updates: Partial<Widget>) => {
    setWidgets(
      widgets.map(w =>
        w.id === widgetId ? { ...w, ...updates } : w
      )
    );
  };

  const calculateRowHeight = () => {
    if (widgets.length === 0) return 200;
    const maxHeight = Math.max(...widgets.map(w => w.position.y + w.size.height), 4);
    return maxHeight;
  };

  const widgetTypes = [
    { id: 'metric', name: 'Metric Card', icon: '📊' },
    { id: 'chart', name: 'Chart', icon: '📈' },
    { id: 'table', name: 'Table', icon: '📋' },
    { id: 'gauge', name: 'Gauge', icon: '🎯' },
    { id: 'timeline', name: 'Timeline', icon: '⏱️' },
    { id: 'heatmap', name: 'Heatmap', icon: '🔥' },
  ];

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="bg-white rounded-lg shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-bold text-gray-900">
              {isEditMode ? '✏️ Edit Dashboard' : '👁️ View Dashboard'}
            </h3>
            <p className="text-sm text-gray-600">{widgets.length} widget(s)</p>
          </div>

          {isEditMode && (
            <div className="flex gap-2">
              <button
                onClick={() => setShowAddWidget(!showAddWidget)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
              >
                {showAddWidget ? '✕ Close' : '+ Add Widget'}
              </button>

              <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                <label className="text-sm font-medium text-gray-700">Grid: </label>
                <select
                  value={gridSize}
                  onChange={(e) => setGridSize(parseInt(e.target.value))}
                  className="bg-transparent font-medium text-gray-900 border-0 p-0"
                >
                  <option value={6}>6 cols</option>
                  <option value={12}>12 cols</option>
                  <option value={16}>16 cols</option>
                  <option value={24}>24 cols</option>
                </select>
              </div>
            </div>
          )}
        </div>

        {/* Add Widget Panel */}
        {showAddWidget && isEditMode && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 pt-4 border-t border-gray-200">
            {widgetTypes.map(type => (
              <button
                key={type.id}
                onClick={() => handleAddWidget(type.id, type.name)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg border-2 border-gray-300 hover:border-blue-500 hover:bg-blue-50 transition-colors"
              >
                <span className="text-2xl">{type.icon}</span>
                <span className="text-xs font-medium text-gray-700 text-center">{type.name}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Dashboard Grid */}
      <div className="bg-white rounded-lg shadow p-4 overflow-auto">
        <div
          className="relative bg-gray-50 rounded-lg border-2 border-dashed border-gray-300"
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))`,
            gap: '16px',
            padding: '16px',
            minHeight: '600px',
          }}
        >
          {/* Grid Background */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e5e7eb 1px, transparent 1px),
                linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
              `,
              backgroundSize: `${100 / gridSize}% 60px`,
            }}
          ></div>

          {/* Widgets */}
          {widgets.map(widget => (
            <div
              key={widget.id}
              onClick={() => setSelectedWidgetId(widget.id)}
              className={`relative rounded-lg border-2 transition-all cursor-move group ${
                selectedWidgetId === widget.id
                  ? 'border-blue-500 shadow-lg ring-2 ring-blue-200'
                  : 'border-gray-300 hover:border-gray-400'
              }`}
              style={{
                gridColumn: `span ${Math.min(widget.size.width, gridSize)}`,
                gridRow: `span ${widget.size.height}`,
                backgroundColor: 'white',
              }}
            >
              {/* Widget Header */}
              <div className="flex items-start justify-between p-3 border-b border-gray-200">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-gray-900 text-sm truncate">
                    {widget.title}
                  </h4>
                  <p className="text-xs text-gray-600 mt-1">{widget.type}</p>
                </div>

                {isEditMode && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteWidget(widget.id);
                    }}
                    className="flex-shrink-0 p-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    ✕
                  </button>
                )}
              </div>

              {/* Widget Preview */}
              <div className="flex-1 flex items-center justify-center p-4 text-gray-600 text-sm">
                <div className="text-center">
                  <p className="text-2xl mb-2">
                    {widgetTypes.find(t => t.id === widget.type)?.icon}
                  </p>
                  <p>{widget.type} widget</p>
                </div>
              </div>

              {/* Resize Handle */}
              {isEditMode && (
                <div
                  className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 cursor-nwse-resize rounded-tl"
                  title="Drag to resize"
                ></div>
              )}
            </div>
          ))}

          {/* Empty State */}
          {widgets.length === 0 && (
            <div
              className="absolute inset-0 flex items-center justify-center text-center text-gray-600"
              style={{ gridColumn: `1 / -1`, gridRow: `1 / -1` }}
            >
              <div>
                <p className="text-2xl mb-2">📭</p>
                <p>No widgets yet</p>
                {isEditMode && (
                  <p className="text-sm mt-1">Click "Add Widget" to get started</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Widget Settings Panel */}
      {selectedWidgetId && isEditMode && (
        <div className="bg-white rounded-lg shadow p-4 border-l-4 border-blue-500">
          <h4 className="font-bold text-gray-900 mb-4">Widget Settings</h4>

          {(() => {
            const widget = widgets.find(w => w.id === selectedWidgetId);
            if (!widget) return null;

            return (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={widget.title}
                    onChange={(e) =>
                      handleUpdateWidget(widget.id, { title: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data Source
                  </label>
                  <input
                    type="text"
                    value={widget.dataSource}
                    onChange={(e) =>
                      handleUpdateWidget(widget.id, { dataSource: e.target.value })
                    }
                    placeholder="e.g., users.activeCount"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent font-mono text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Refresh Interval (seconds)
                  </label>
                  <input
                    type="number"
                    value={widget.refreshInterval}
                    onChange={(e) =>
                      handleUpdateWidget(widget.id, { refreshInterval: parseInt(e.target.value) })
                    }
                    min="30"
                    max="3600"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Width (cols)
                    </label>
                    <input
                      type="number"
                      value={widget.size.width}
                      onChange={(e) =>
                        handleResizeWidget(widget.id, parseInt(e.target.value), widget.size.height)
                      }
                      min="1"
                      max={gridSize}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Height (rows)
                    </label>
                    <input
                      type="number"
                      value={widget.size.height}
                      onChange={(e) =>
                        handleResizeWidget(widget.id, widget.size.width, parseInt(e.target.value))
                      }
                      min="1"
                      max="10"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                </div>

                <button
                  onClick={() => handleDeleteWidget(widget.id)}
                  className="w-full px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 font-medium rounded-lg transition-colors"
                >
                  🗑️ Delete Widget
                </button>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}

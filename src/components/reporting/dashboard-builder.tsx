'use client';

import { useState } from 'react';
import { useDashboards } from '@/hooks/useDashboards';

interface DashboardBuilderProps {
  userId: string;
  onDashboardCreated?: (dashboard: any) => void;
}

/**
 * Dashboard Builder Component
 *
 * Interactive UI for creating and customizing dashboards
 */
export function DashboardBuilder({ userId, onDashboardCreated }: DashboardBuilderProps) {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    layout: 'grid' as const,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { dashboards, isLoading, error, createDashboard } = useDashboards(userId, 'owned');

  const handleCreateDashboard = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert('Dashboard name is required');
      return;
    }

    setIsSubmitting(true);

    try {
      const dashboard = await createDashboard(formData.name, formData.description, formData.layout);

      if (dashboard) {
        setFormData({ name: '', description: '', layout: 'grid' });
        setShowCreateForm(false);
        onDashboardCreated?.(dashboard);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-800">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">📊 My Dashboards</h1>
          <p className="text-gray-600 mt-1">Create and manage custom analytics dashboards</p>
        </div>

        <button
          onClick={() => setShowCreateForm(!showCreateForm)}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors"
        >
          {showCreateForm ? '✕ Cancel' : '+ New Dashboard'}
        </button>
      </div>

      {/* Create Form */}
      {showCreateForm && (
        <div className="bg-white rounded-lg shadow p-6 border-l-4 border-blue-500">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Create New Dashboard</h2>

          <form onSubmit={handleCreateDashboard} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Dashboard Name *</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Sales Performance, Team Metrics"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the purpose of this dashboard..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Layout Type</label>
              <div className="flex gap-4">
                {(['grid', 'flow'] as const).map((layout) => (
                  <label key={layout} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="layout"
                      value={layout}
                      checked={formData.layout === layout}
                      onChange={(e) => setFormData({ ...formData, layout: e.target.value as any })}
                      className="w-4 h-4"
                    />
                    <span className="text-sm text-gray-700 font-medium">
                      {layout === 'grid' ? '📐 Grid' : '〰️ Flow'}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors"
              >
                {isSubmitting ? 'Creating...' : 'Create Dashboard'}
              </button>

              <button
                type="button"
                onClick={() => setShowCreateForm(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Dashboards List */}
      <div>
        {dashboards && dashboards.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dashboards.map((dashboard: any) => (
              <div key={dashboard.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">{dashboard.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{dashboard.widgets.length} widgets</p>
                  </div>

                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${dashboard.isPublic ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                    {dashboard.isPublic ? '🌐 Public' : '🔒 Private'}
                  </span>
                </div>

                {dashboard.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{dashboard.description}</p>
                )}

                <div className="flex gap-2 mb-4 text-xs text-gray-600">
                  <span>👁️ {dashboard.metadata.viewCount} views</span>
                  <span>📐 {dashboard.layout}</span>
                </div>

                <div className="flex gap-2">
                  <button className="flex-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-lg transition-colors">
                    📝 Edit
                  </button>

                  <button className="flex-1 px-3 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-50 transition-colors">
                    📊 View
                  </button>

                  <button className="px-3 py-2 border border-red-300 text-red-700 text-sm font-medium rounded-lg hover:bg-red-50 transition-colors">
                    🗑️
                  </button>
                </div>

                <p className="text-xs text-gray-500 mt-3">
                  Updated {new Date(dashboard.metadata.updatedAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-2">No dashboards yet</p>
            <p className="text-gray-500">Create your first dashboard to get started</p>
          </div>
        )}
      </div>
    </div>
  );
}

'use client';

import { useState, useEffect } from 'react';

interface StorageStats {
  provider: string;
  totalFiles: number;
  totalSize: number;
  totalSizeFormatted: string;
  categories: Record<
    string,
    {
      count: number;
      size: number;
      sizeFormatted: string;
      percentage: number;
    }
  >;
}

interface ProcessingStats {
  pending: number;
  processing: number;
  completed: number;
  failed: number;
}

/**
 * StorageDashboard Component
 *
 * Display storage usage and management statistics
 */
export function StorageDashboard() {
  const [stats, setStats] = useState<StorageStats | null>(null);
  const [processingStats, setProcessingStats] = useState<ProcessingStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/storage/stats');

        if (!response.ok) {
          throw new Error('Failed to fetch storage stats');
        }

        const data = await response.json();
        setStats(data.stats.storage);
        setProcessingStats(data.stats.processing);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to load stats';
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();

    // Refresh every 10 seconds
    const interval = setInterval(fetchStats, 10000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading && !stats) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error && !stats) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">
          <strong>Error:</strong> {error}
        </p>
      </div>
    );
  }

  if (!stats) return null;

  const categories = [
    { key: 'recordings', label: 'Recordings', color: 'bg-blue-500' },
    { key: 'documents', label: 'Documents', color: 'bg-green-500' },
    { key: 'media', label: 'Media', color: 'bg-purple-500' },
    { key: 'avatars', label: 'Avatars', color: 'bg-yellow-500' },
    { key: 'attachments', label: 'Attachments', color: 'bg-pink-500' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Storage Management</h2>
        <p className="text-gray-600 text-sm mt-1">
          Provider: <span className="font-semibold capitalize">{stats.provider}</span>
        </p>
      </div>

      {/* Overall Usage */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Total Usage</h3>

        <div className="grid grid-cols-2 gap-4 mb-6 lg:grid-cols-3">
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 font-medium">Total Size</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.totalSizeFormatted}
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 font-medium">Total Files</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {stats.totalFiles}
            </p>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <p className="text-xs text-gray-600 font-medium">Categories</p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {Object.keys(stats.categories).length}
            </p>
          </div>
        </div>

        {/* Storage Pie Chart */}
        <div className="flex items-center gap-8">
          <div className="flex-shrink-0">
            <svg className="w-32 h-32" viewBox="0 0 100 100">
              {categories.reduce((svg, category, index) => {
                const categoryData = stats.categories[category.key];
                if (!categoryData || categoryData.size === 0) return svg;

                const percentage = categoryData.percentage;
                const startAngle = categories
                  .slice(0, index)
                  .reduce((sum, c) => sum + (stats.categories[c.key]?.percentage || 0), 0);

                const angle = (startAngle * 360) / 100;
                const cx = 50,
                  cy = 50,
                  r = 40;
                const x = cx + r * Math.cos(((angle - 90) * Math.PI) / 180);
                const y = cy + r * Math.sin(((angle - 90) * Math.PI) / 180);

                const largeArc = percentage > 50 ? 1 : 0;
                const endAngle = angle + (percentage * 360) / 100;
                const x2 =
                  cx +
                  r *
                    Math.cos(((endAngle - 90) * Math.PI) / 180);
                const y2 =
                  cy +
                  r *
                    Math.sin(((endAngle - 90) * Math.PI) / 180);

                return (
                  svg +
                  `<path d="M ${cx} ${cy} L ${x} ${y} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z" fill="${
                    category.color === 'bg-blue-500'
                      ? '#3b82f6'
                      : category.color === 'bg-green-500'
                        ? '#10b981'
                        : category.color === 'bg-purple-500'
                          ? '#a855f7'
                          : category.color === 'bg-yellow-500'
                            ? '#eab308'
                            : '#ec4899'
                  }"/>`
                );
              }, '')}
            </svg>
          </div>

          <div className="space-y-3">
            {categories.map((category) => {
              const data = stats.categories[category.key];
              if (!data || data.count === 0) return null;

              return (
                <div key={category.key} className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${category.color}`} />
                  <span className="text-sm text-gray-700">{category.label}</span>
                  <span className="text-sm font-semibold text-gray-900">
                    {data.percentage}%
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {categories.map((category) => {
          const data = stats.categories[category.key];
          if (!data) return null;

          return (
            <div key={category.key} className="bg-white border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-gray-900">{category.label}</h3>
                <div className={`w-3 h-3 rounded-full ${category.color}`} />
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-600">Files</p>
                  <p className="font-bold text-gray-900">{data.count}</p>
                </div>

                <div>
                  <p className="text-gray-600">Size</p>
                  <p className="font-bold text-gray-900">{data.sizeFormatted}</p>
                </div>
              </div>

              <div className="mt-3 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={category.color}
                  style={{ width: `${data.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Processing Queue */}
      {processingStats && (
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Processing Queue</h3>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            <div className="bg-blue-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 font-medium">Pending</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">
                {processingStats.pending}
              </p>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 font-medium">Processing</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">
                {processingStats.processing}
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 font-medium">Completed</p>
              <p className="text-2xl font-bold text-green-600 mt-1">
                {processingStats.completed}
              </p>
            </div>

            <div className="bg-red-50 p-4 rounded-lg">
              <p className="text-xs text-gray-600 font-medium">Failed</p>
              <p className="text-2xl font-bold text-red-600 mt-1">
                {processingStats.failed}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

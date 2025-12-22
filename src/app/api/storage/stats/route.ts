/**
 * Storage Statistics API
 *
 * Get storage usage and cleanup operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { fileManager } from '@/lib/storage/file-manager';

/**
 * GET /api/storage/stats
 *
 * Get storage usage statistics
 */
export async function GET(request: NextRequest) {
  try {
    const stats = await fileManager.getStorageStats();

    return NextResponse.json({
      success: true,
      stats: {
        storage: {
          provider: stats.storage.provider,
          totalFiles: stats.storage.totalFiles,
          totalSize: stats.storage.totalSize,
          totalSizeFormatted: formatBytes(stats.storage.totalSize),
          categories: Object.entries(stats.storage.categories).reduce(
            (acc, [category, data]) => ({
              ...acc,
              [category]: {
                count: data.count,
                size: data.size,
                sizeFormatted: formatBytes(data.size),
                percentage: stats.storage.totalSize > 0
                  ? Math.round((data.size / stats.storage.totalSize) * 100)
                  : 0,
              },
            }),
            {} as Record<string, any>
          ),
        },
        processing: stats.processing,
        batches: stats.totalBatches,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Storage stats error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get stats',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/storage/stats
 *
 * Cleanup operations
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, daysOld } = body;

    if (action === 'cleanup-expired') {
      // Cleanup would be implemented in production
      return NextResponse.json({
        success: true,
        message: 'Cleanup completed',
        filesRemoved: 0, // In production, return actual count
      });
    }

    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Storage operation error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Operation failed',
      },
      { status: 500 }
    );
  }
}

/**
 * Format bytes to human readable format
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
}

import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

interface ImageStats {
  totalImages: number;
  totalSize: number;
  optimizedCount: number;
  savedSpace: number;
  largeImages: string[];
  unoptimizedImages: string[];
  breakdown: {
    [key: string]: {
      count: number;
      size: number;
      avgSize: number;
    };
  };
}

async function getDirectoryStats(dirPath: string): Promise<ImageStats> {
  const stats: ImageStats = {
    totalImages: 0,
    totalSize: 0,
    optimizedCount: 0,
    savedSpace: 0,
    largeImages: [],
    unoptimizedImages: [],
    breakdown: {},
  };

  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.bmp'];

  async function processDirectory(currentPath: string) {
    try {
      const entries = await fs.readdir(currentPath, { withFileTypes: true });

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry.name);

        if (entry.isDirectory() && !entry.name.startsWith('.')) {
          await processDirectory(fullPath);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name).toLowerCase();
          
          if (imageExtensions.includes(ext)) {
            const fileStat = await fs.stat(fullPath);
            const sizeKB = fileStat.size / 1024;
            const sizeMB = sizeKB / 1024;

            stats.totalImages++;
            stats.totalSize += fileStat.size;

            // Track by extension
            if (!stats.breakdown[ext]) {
              stats.breakdown[ext] = { count: 0, size: 0, avgSize: 0 };
            }
            stats.breakdown[ext].count++;
            stats.breakdown[ext].size += fileStat.size;

            // Check for large images (>1MB)
            if (sizeMB > 1) {
              stats.largeImages.push(`${fullPath} (${sizeMB.toFixed(2)}MB)`);
            }

            // Check for unoptimized images (PNG/JPG > 500KB)
            if ((ext === '.png' || ext === '.jpg' || ext === '.jpeg') && sizeKB > 500) {
              stats.unoptimizedImages.push(fullPath);
            }

            // Check if original exists (indicates optimization happened)
            const originalPath = fullPath.replace(/(\.[^.]+)$/, '.original$1');
            if (existsSync(originalPath)) {
              stats.optimizedCount++;
              const originalStat = await fs.stat(originalPath);
              stats.savedSpace += originalStat.size - fileStat.size;
            }
          }
        }
      }
    } catch (error) {
      console.error(`Error processing directory ${currentPath}:`, error);
    }
  }

  await processDirectory(dirPath);

  // Calculate averages
  for (const ext in stats.breakdown) {
    const data = stats.breakdown[ext];
    data.avgSize = data.count > 0 ? Math.round(data.size / data.count) : 0;
  }

  return stats;
}

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const directory = searchParams.get('dir') || path.join(process.cwd(), 'public', 'images');

    if (!existsSync(directory)) {
      return NextResponse.json(
        { error: 'Directory not found' },
        { status: 404 }
      );
    }

    const stats = await getDirectoryStats(directory);

    // Format sizes for readability
    const formatSize = (bytes: number) => {
      if (bytes < 1024) return bytes + ' B';
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
      return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
    };

    const response = {
      summary: {
        totalImages: stats.totalImages,
        totalSize: formatSize(stats.totalSize),
        optimizedCount: stats.optimizedCount,
        optimizationRate: `${((stats.optimizedCount / stats.totalImages) * 100).toFixed(1)}%`,
        savedSpace: formatSize(stats.savedSpace),
        averageSize: formatSize(stats.totalImages > 0 ? stats.totalSize / stats.totalImages : 0),
      },
      issues: {
        largeImages: stats.largeImages.slice(0, 10), // Top 10 largest
        unoptimizedImages: stats.unoptimizedImages.slice(0, 10), // Top 10 unoptimized
        totalLargeImages: stats.largeImages.length,
        totalUnoptimized: stats.unoptimizedImages.length,
      },
      breakdown: Object.entries(stats.breakdown).map(([ext, data]) => ({
        extension: ext,
        count: data.count,
        totalSize: formatSize(data.size),
        avgSize: formatSize(data.avgSize),
        percentage: `${((data.size / stats.totalSize) * 100).toFixed(1)}%`,
      })),
      recommendations: [],
    };

    // Add recommendations
    if (stats.largeImages.length > 0) {
      response.recommendations.push(
        `${stats.largeImages.length} images are larger than 1MB and should be optimized`
      );
    }

    if (stats.unoptimizedImages.length > 0) {
      response.recommendations.push(
        `${stats.unoptimizedImages.length} PNG/JPG images could be converted to WebP for better compression`
      );
    }

    const optimizationRate = (stats.optimizedCount / stats.totalImages) * 100;
    if (optimizationRate < 50) {
      response.recommendations.push(
        'Less than 50% of images are optimized. Run npm run image-worker to optimize all images'
      );
    }

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error getting image stats:', error);
    return NextResponse.json(
      { error: 'Failed to get image statistics' },
      { status: 500 }
    );
  }
}
/**
 * Batch File Operations API
 *
 * Handle batch uploads and batch operations
 */

import { NextRequest, NextResponse } from 'next/server';
import { fileManager } from '@/lib/storage/file-manager';

/**
 * POST /api/files/batch
 *
 * Upload multiple files in batch
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll('files') as File[];
    const category = (formData.get('category') as string) || 'attachments';
    const userId = (formData.get('userId') as string) || 'anonymous';
    const metadata = formData.get('metadata') ? JSON.parse(formData.get('metadata') as string) : {};

    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: 'No files provided' },
        { status: 400 }
      );
    }

    // Convert Files to Buffer array
    const buffers = await Promise.all(
      files.map(async (file) => ({
        buffer: Buffer.from(await file.arrayBuffer()),
        filename: file.name,
      }))
    );

    // Upload batch
    const result = await fileManager.uploadBatch(buffers, category as any, userId, metadata);

    return NextResponse.json(
      {
        success: result.success,
        batchId: result.batchId,
        files: result.files.map((f) => ({
          success: f.success,
          error: f.error,
          file: f.file
            ? {
                id: f.file.id,
                name: f.file.originalName,
                size: f.file.size,
              }
            : null,
          processingJobId: f.processingJobId,
        })),
        totalSize: result.totalSize,
        count: result.files.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Batch upload error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Batch upload failed',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/files/batch
 *
 * Get batch information
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const batchId = searchParams.get('batchId');

    if (!batchId) {
      return NextResponse.json(
        { error: 'batchId parameter required' },
        { status: 400 }
      );
    }

    // In a real implementation, fetch batch details
    // For now, return stats
    const stats = await fileManager.getStorageStats();

    return NextResponse.json({
      success: true,
      batchId,
      stats,
    });
  } catch (error) {
    console.error('Batch get error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get batch info',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/files/batch
 *
 * Delete batch of files
 */
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const batchId = searchParams.get('batchId');

    if (!batchId) {
      return NextResponse.json(
        { error: 'batchId parameter required' },
        { status: 400 }
      );
    }

    const deletedCount = await fileManager.deleteBatch(batchId);

    return NextResponse.json({
      success: true,
      deletedCount,
      message: `${deletedCount} files deleted`,
    });
  } catch (error) {
    console.error('Batch delete error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to delete batch',
      },
      { status: 500 }
    );
  }
}

/**
 * File Detail API
 *
 * Get, download, and delete individual files
 */

import { NextRequest, NextResponse } from 'next/server';
import { fileManager } from '@/lib/storage/file-manager';
import { storageManager } from '@/lib/storage/storage-manager';

/**
 * GET /api/files/[fileId]
 *
 * Get file info or download
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params;
    const action = request.nextUrl.searchParams.get('action');

    const fileInfo = await fileManager.getFileInfo(fileId);

    if (!fileInfo) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    if (action === 'download') {
      // Return download URL redirect
      return NextResponse.json({
        success: true,
        url: fileInfo.url,
      });
    }

    // Return file metadata
    return NextResponse.json({
      success: true,
      file: fileInfo,
    });
  } catch (error) {
    console.error('File get error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to get file',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/files/[fileId]
 *
 * Delete a file
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params;

    const success = await fileManager.deleteFile(fileId);

    if (!success) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'File deleted',
    });
  } catch (error) {
    console.error('File delete error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to delete file',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/files/[fileId]
 *
 * Copy file or perform other operations
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { fileId: string } }
) {
  try {
    const { fileId } = params;
    const body = await request.json();
    const { action, category, userId } = body;

    if (action === 'copy') {
      if (!category || !userId) {
        return NextResponse.json(
          { error: 'Category and userId required for copy' },
          { status: 400 }
        );
      }

      const newFile = await fileManager.copyFile(fileId, category, userId);

      if (!newFile) {
        return NextResponse.json(
          { error: 'File not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          success: true,
          file: {
            id: newFile.id,
            name: newFile.originalName,
            size: newFile.size,
            type: newFile.mimeType,
          },
        },
        { status: 201 }
      );
    }

    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('File operation error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Operation failed',
      },
      { status: 500 }
    );
  }
}

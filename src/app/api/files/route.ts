/**
 * File Upload API
 *
 * Handle file uploads with automatic processing
 */

import { NextRequest, NextResponse } from 'next/server';
import { fileManager } from '@/lib/storage/file-manager';
import type { FileCategory } from '@/lib/storage/storage-manager';

/**
 * POST /api/files
 *
 * Upload a single file
 */
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = (formData.get('category') as FileCategory) || 'attachments';
    const userId = (formData.get('userId') as string) || 'anonymous';
    const metadata = formData.get('metadata') ? JSON.parse(formData.get('metadata') as string) : {};

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Convert File to Buffer
    const buffer = Buffer.from(await file.arrayBuffer());

    // Upload file
    const result = await fileManager.uploadFile(
      buffer,
      file.name,
      category,
      userId,
      metadata
    );

    if (!result.success) {
      return NextResponse.json(
        { error: result.error },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        file: {
          id: result.file?.id,
          name: result.file?.originalName,
          size: result.file?.size,
          type: result.file?.mimeType,
          url: `/api/files/${result.file?.id}`,
        },
        processingJobId: result.processingJobId,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('File upload error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Upload failed',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/files
 *
 * List files
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') as FileCategory | null;
    const userId = searchParams.get('userId');
    const limit = parseInt(searchParams.get('limit') || '50', 10);
    const offset = parseInt(searchParams.get('offset') || '0', 10);

    let files;

    if (userId) {
      files = await fileManager.listUserFiles(userId, category || undefined, limit, offset);
    } else if (category) {
      files = await fileManager.listFilesByCategory(category, limit, offset);
    } else {
      return NextResponse.json(
        { error: 'Category or userId parameter required' },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      files,
      count: files.length,
      limit,
      offset,
    });
  } catch (error) {
    console.error('File listing error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Listing failed',
      },
      { status: 500 }
    );
  }
}

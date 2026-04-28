import { NextRequest, NextResponse } from 'next/server';
import { ImageOptimizer } from '@/lib/imageOptimizer';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

// Note: In Next.js 13+ App Router, body parsing is handled automatically
// No need for the deprecated config export

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/upload' });
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Get optimization options from form data
    const quality = parseInt(formData.get('quality') as string) || 85;
    const maxWidth = parseInt(formData.get('maxWidth') as string) || 1920;
    const format = (formData.get('format') as 'jpeg' | 'webp' | 'avif' | 'png') || 'webp';

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Optimize the image
    const optimizedBuffer = await ImageOptimizer.optimizeBuffer(buffer, {
      quality,
      width: maxWidth,
      format,
      maintainAspectRatio: true });

    // Get optimization stats
    const stats = await ImageOptimizer.getOptimizationStats(buffer, optimizedBuffer);

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const nameWithoutExt = path.parse(sanitizedName).name;
    const filename = `${nameWithoutExt}_${timestamp}.${format}`;

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Save optimized image
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, optimizedBuffer);

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/upload',
        method: 'POST',
        request_id: log.requestId,
        filename,
        original_size: stats.originalSize,
        optimized_size: stats.optimizedSize,
        format,
      },
    });

    // Return success response with stats
    return NextResponse.json({
      success: true,
      filename,
      url: `/uploads/${filename}`,
      stats: {
        originalSize: `${(stats.originalSize / 1024).toFixed(2)} KB`,
        optimizedSize: `${(stats.optimizedSize / 1024).toFixed(2)} KB`,
        reduction: `${(stats.reduction / 1024).toFixed(2)} KB`,
        reductionPercent: `${stats.reductionPercent}%` } });
  } catch (error) {
    log.error('upload error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/upload' }, extra: { requestId: log.requestId } });
    return NextResponse.json(
      { error: 'Failed to upload and optimize image' },
      { status: 500 }
    );
  }
}

// API endpoint for batch optimization
export async function PUT(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/upload' });
  try {
    const { directory, options } = await request.json();
    
    if (!directory) {
      return NextResponse.json(
        { error: 'Directory path required' },
        { status: 400 }
      );
    }

    const results = await ImageOptimizer.batchOptimize(directory, options);
    
    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/upload',
        method: 'PUT',
        request_id: log.requestId,
        optimized_count: results.length,
      },
    });

    return NextResponse.json({
      success: true,
      optimized: results.length,
      results });
  } catch (error) {
    log.error('batch optimization error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/upload' }, extra: { requestId: log.requestId } });
    return NextResponse.json(
      { error: 'Failed to batch optimize images' },
      { status: 500 }
    );
  }
}
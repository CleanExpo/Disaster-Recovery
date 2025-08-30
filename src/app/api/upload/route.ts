import { NextRequest, NextResponse } from 'next/server';
import { ImageOptimizer } from '@/lib/imageOptimizer';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';

// Note: In Next.js 13+ App Router, body parsing is handled automatically
// No need for the deprecated config export

export async function POST(request: NextRequest) {
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
      maintainAspectRatio: true,
    });

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

    // Return success response with stats
    return NextResponse.json({
      success: true,
      filename,
      url: `/uploads/${filename}`,
      stats: {
        originalSize: `${(stats.originalSize / 1024).toFixed(2)} KB`,
        optimizedSize: `${(stats.optimizedSize / 1024).toFixed(2)} KB`,
        reduction: `${(stats.reduction / 1024).toFixed(2)} KB`,
        reductionPercent: `${stats.reductionPercent}%`,
      },
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload and optimize image' },
      { status: 500 }
    );
  }
}

// API endpoint for batch optimization
export async function PUT(request: NextRequest) {
  try {
    const { directory, options } = await request.json();
    
    if (!directory) {
      return NextResponse.json(
        { error: 'Directory path required' },
        { status: 400 }
      );
    }

    const results = await ImageOptimizer.batchOptimize(directory, options);
    
    return NextResponse.json({
      success: true,
      optimized: results.length,
      results,
    });
  } catch (error) {
    console.error('Batch optimization error:', error);
    return NextResponse.json(
      { error: 'Failed to batch optimize images' },
      { status: 500 }
    );
  }
}
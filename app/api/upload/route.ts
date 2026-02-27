import { NextRequest } from 'next/server';
import { ImageOptimizer } from '@/lib/imageOptimizer';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';
import { existsSync } from 'fs';
import { uploadOptionsSchema, batchOptimiseSchema } from '@/lib/api/validations';
import {
  apiSuccess,
  apiValidationError,
  apiBadRequest,
  apiInternalError,
} from '@/lib/api/responses';

// Allowed MIME types for upload
const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/png',
  'image/webp',
  'image/avif',
  'image/gif',
]);

// Max file size: 10 MB
const MAX_FILE_SIZE = 10 * 1024 * 1024;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return apiBadRequest('No file uploaded');
    }

    // File type validation
    if (!ALLOWED_MIME_TYPES.has(file.type)) {
      return apiBadRequest(
        `File type '${file.type}' is not allowed. Accepted: JPEG, PNG, WebP, AVIF, GIF`,
      );
    }

    // File size validation
    if (file.size > MAX_FILE_SIZE) {
      return apiBadRequest(
        `File size ${(file.size / 1024 / 1024).toFixed(1)}MB exceeds the 10MB limit`,
      );
    }

    // Validate optimisation options via Zod
    const optsParsed = uploadOptionsSchema.safeParse({
      quality: formData.get('quality'),
      maxWidth: formData.get('maxWidth'),
      format: formData.get('format'),
    });
    if (!optsParsed.success) {
      return apiValidationError(optsParsed.error);
    }
    const opts = optsParsed.data;

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Optimize the image
    const optimizedBuffer = await ImageOptimizer.optimizeBuffer(buffer, {
      quality: opts.quality,
      width: opts.maxWidth,
      format: opts.format,
      maintainAspectRatio: true,
    });

    // Get optimization stats
    const stats = await ImageOptimizer.getOptimizationStats(buffer, optimizedBuffer);

    // Generate unique filename
    const timestamp = Date.now();
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const nameWithoutExt = path.parse(sanitizedName).name;
    const filename = `${nameWithoutExt}_${timestamp}.${opts.format}`;

    // Ensure upload directory exists
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true });
    }

    // Save optimized image
    const filePath = path.join(uploadDir, filename);
    await writeFile(filePath, optimizedBuffer);

    return apiSuccess({
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
    return apiInternalError(error, 'upload');
  }
}

// API endpoint for batch optimization
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const parsed = batchOptimiseSchema.safeParse(body);
    if (!parsed.success) {
      return apiValidationError(parsed.error);
    }

    const results = await ImageOptimizer.batchOptimize(
      parsed.data.directory,
      parsed.data.options,
    );

    return apiSuccess({
      optimized: results.length,
      results,
    });
  } catch (error) {
    if (error instanceof SyntaxError) {
      return apiBadRequest('Invalid JSON in request body');
    }
    return apiInternalError(error, 'upload/batch');
  }
}

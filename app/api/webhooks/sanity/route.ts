/**
 * Sanity Webhook Handler
 *
 * Automatically syncs content to Algolia when published in Sanity CMS
 * POST /api/webhooks/sanity
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAlgoliaAdminClient } from '@/lib/algolia/client';
import { ALGOLIA_CONFIG } from '@/lib/algolia/config';
import type { AlgoliaContentRecord } from '@/lib/algolia/types';
import crypto from 'crypto';

/**
 * Verify Sanity webhook signature
 */
function verifySignature(body: string, signature: string): boolean {
  const secret = process.env.SANITY_WEBHOOK_SECRET;
  if (!secret) return true; // Skip verification in development

  const hash = crypto
    .createHmac('sha256', secret)
    .update(body)
    .digest('hex');

  return hash === signature;
}

/**
 * Transform Sanity document to Algolia record
 */
function transformToAlgoliaRecord(document: any): AlgoliaContentRecord {
  return {
    objectID: document._id,
    title: document.title || '',
    description: document.description || document.excerpt || '',
    content: document.content || document.body || '',
    category: document.category || 'General',
    disasterType: document.disasterTypes || [],
    contentType: document._type === 'post' ? 'blog' : 'article',
    slug: document.slug?.current || document._id,
    url: `/blog/${document.slug?.current || document._id}`,
    imageUrl: document.mainImage?.asset?.url,
    tags: document.tags || [],
    author: document.author?.name,
    publishedAt: document.publishedAt ? new Date(document.publishedAt).getTime() : Date.now(),
    updatedAt: document._updatedAt ? new Date(document._updatedAt).getTime() : Date.now(),
    engagement: 0, // Will be updated based on actual metrics
    priority: document.priority || 5,
    readingTime: document.readingTime || estimateReadingTime(document.content || document.body),
  };
}

/**
 * Estimate reading time based on content length
 */
function estimateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

/**
 * POST /api/webhooks/sanity
 */
export async function POST(request: NextRequest) {
  try {
    // Get request body
    const body = await request.text();
    const payload = JSON.parse(body);

    // Verify webhook signature
    const signature = request.headers.get('x-sanity-signature') || '';
    if (!verifySignature(body, signature)) {
      console.error('[Webhook] Invalid signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    console.log('[Webhook] Received Sanity webhook:', payload);

    // Extract document from payload
    const document = payload.document || payload;

    // Handle different webhook actions
    const action = payload.action || (document._id ? 'update' : 'unknown');

    const client = getAlgoliaAdminClient();
    const index = client.initIndex(ALGOLIA_CONFIG.indices.content);

    switch (action) {
      case 'create':
      case 'update':
      case 'publish': {
        // Transform and index document
        const record = transformToAlgoliaRecord(document);
        await index.saveObject(record);
        console.log('[Webhook] Document indexed:', record.objectID);
        break;
      }

      case 'delete':
      case 'unpublish': {
        // Remove from index
        await index.deleteObject(document._id);
        console.log('[Webhook] Document removed from index:', document._id);
        break;
      }

      default:
        console.log('[Webhook] Unknown action:', action);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('[Webhook] Error processing webhook:', error);
    return NextResponse.json(
      { error: 'Failed to process webhook' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/webhooks/sanity
 * Health check endpoint
 */
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    message: 'Sanity webhook endpoint is active',
  });
}

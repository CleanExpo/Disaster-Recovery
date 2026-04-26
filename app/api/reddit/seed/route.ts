import { NextRequest, NextResponse } from 'next/server';
import { POST_TEMPLATES, getPostsByCategory } from '@/lib/reddit/content/post-templates';
import { formatRedditPost, validateGEOCompliance } from '@/lib/reddit/content/geo-formatter';
import { submitTextPost, verifyAuth, delay } from '@/lib/reddit/reddit-client';
import type { PostCategory, RedditPostResult } from '@/lib/reddit/reddit-types';
import { requestLogger, captureException } from '@/lib/observability';

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/reddit/seed' });
  try {
    const body = await request.json();
    const dryRun = body.dryRun === true;
    const category = body.category as PostCategory | undefined;
    const delayMs = typeof body.delay === 'number' ? body.delay : 600000;

    // Determine which posts to process
    const posts = category ? getPostsByCategory(category) : POST_TEMPLATES;

    if (posts.length === 0) {
      return NextResponse.json(
        { success: false, error: `No posts found for category: ${category}` },
        { status: 404 },
      );
    }

    // Auth check (skip for dry-run)
    if (!dryRun) {
      const auth = await verifyAuth();
      if (!auth.success) {
        return NextResponse.json(
          { success: false, error: `Reddit auth failed: ${auth.error}` },
          { status: 401 },
        );
      }
    }

    // Process posts
    const results: RedditPostResult[] = [];

    for (let i = 0; i < posts.length; i++) {
      const config = posts[i];
      const markdown = formatRedditPost(config);
      const compliance = validateGEOCompliance(markdown);

      const result: RedditPostResult = {
        postId: config.id,
        redditId: null,
        url: null,
        title: config.title,
        category: config.category,
        submittedAt: new Date().toISOString(),
        imageGenerated: false,
        imagePath: null,
        success: false,
      };

      try {
        if (dryRun) {
          result.success = true;
        } else {
          const submission = await submitTextPost(config.title, markdown);
          result.redditId = submission.id;
          result.url = submission.url;
          result.success = true;
        }
      } catch (err: unknown) {
        result.error = err instanceof Error ? err.message : String(err);
      }

      results.push(result);

      // Rate-limit delay between posts
      if (i < posts.length - 1 && !dryRun) {
        await delay(delayMs);
      }
    }

    const successCount = results.filter((r) => r.success).length;

    return NextResponse.json({
      success: true,
      dryRun,
      totalPosts: posts.length,
      successCount,
      failureCount: posts.length - successCount,
      results,
    });
  } catch (error: unknown) {
    captureException(error, {
      tags: { route: '/api/reddit/seed' },
      extra: { requestId: log.requestId },
    });
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

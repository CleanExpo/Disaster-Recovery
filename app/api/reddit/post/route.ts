import { NextRequest, NextResponse } from 'next/server';
import { getPostById } from '@/lib/reddit/content/post-templates';
import { formatRedditPost, validateGEOCompliance } from '@/lib/reddit/content/geo-formatter';
import { submitTextPost, verifyAuth } from '@/lib/reddit/reddit-client';
import { requestLogger, captureException } from '@/lib/observability';

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/reddit/post' });
  try {
    const body = await request.json();

    if (!body.postId) {
      return NextResponse.json({ success: false, error: 'postId is required' }, { status: 400 });
    }

    const config = getPostById(body.postId);
    if (!config) {
      return NextResponse.json(
        { success: false, error: `Post not found: ${body.postId}` },
        { status: 404 },
      );
    }

    // Format the post body
    const markdown = formatRedditPost(config);
    const compliance = validateGEOCompliance(markdown);

    // Dry-run mode — return content without posting
    if (body.dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        post: {
          id: config.id,
          title: config.title,
          category: config.category,
          body: markdown,
          geoCompliance: compliance,
        },
      });
    }

    // Verify auth before posting
    const auth = await verifyAuth();
    if (!auth.success) {
      return NextResponse.json(
        { success: false, error: `Reddit auth failed: ${auth.error}` },
        { status: 401 },
      );
    }

    // Submit to Reddit
    const result = await submitTextPost(config.title, markdown);

    return NextResponse.json({
      success: true,
      post: {
        id: config.id,
        title: config.title,
        redditId: result.id,
        url: result.url,
        geoCompliance: compliance,
      },
    });
  } catch (error: unknown) {
    captureException(error, {
      tags: { route: '/api/reddit/post' },
      extra: { requestId: log.requestId },
    });
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

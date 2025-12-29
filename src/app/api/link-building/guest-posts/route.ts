/**
 * Guest Posts API Route
 *
 * Handles guest posting workflow including pitch creation, publication management,
 * post submission, and backlink verification.
 *
 * @module GuestPostsAPI
 * @category API - Link Building
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  guestPostingService,
  PITCH_TEMPLATES,
  PublicationTier
} from '@/lib/seo/guest-posting-service';
import { z } from 'zod';

// ============================================================================
// Request Schemas
// ============================================================================

const CreatePitchSchema = z.object({
  publicationId: z.string(),
  headline: z.string(),
  summary: z.string(),
  angle: z.string(),
  targetKeywords: z.array(z.string()),
  outlinePoints: z.array(z.string()),
  whyThisPublication: z.string(),
  authorExpertise: z.string(),
  estimatedWordCount: z.number()
});

const CreatePostSchema = z.object({
  pitchId: z.string(),
  content: z.object({
    title: z.string(),
    body: z.string(),
    wordCount: z.number(),
    metaDescription: z.string(),
    authorBio: z.string()
  }),
  seo: z.object({
    targetKeyword: z.string(),
    relatedKeywords: z.array(z.string()),
    internalLinks: z.array(z.any()),
    externalLinks: z.array(z.any())
  })
});

// ============================================================================
// GET - List publications, pitches, or posts
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type') || 'publications';
    const tier = searchParams.get('tier') as PublicationTier | null;
    const topic = searchParams.get('topic');
    const publicationId = searchParams.get('publicationId');
    const pitchId = searchParams.get('pitchId');
    const postId = searchParams.get('postId');

    switch (type) {
      case 'publications': {
        let publications;

        if (publicationId) {
          const pub = guestPostingService.getPublication(publicationId);
          if (!pub) {
            return NextResponse.json(
              { error: 'Publication not found' },
              { status: 404 }
            );
          }
          return NextResponse.json({ publication: pub });
        }

        if (tier) {
          publications = guestPostingService.getPublicationsByTier(tier);
        } else if (topic) {
          publications = guestPostingService.getPublicationsByTopic(topic);
        } else {
          publications = guestPostingService.getAllPublications();
        }

        return NextResponse.json({
          publications,
          total: publications.length,
          stats: {
            tier1: publications.filter(p => p.tier === 'tier1').length,
            tier2: publications.filter(p => p.tier === 'tier2').length,
            tier3: publications.filter(p => p.tier === 'tier3').length
          }
        });
      }

      case 'pitches': {
        if (pitchId) {
          const pitch = guestPostingService.getPitch(pitchId);
          if (!pitch) {
            return NextResponse.json(
              { error: 'Pitch not found' },
              { status: 404 }
            );
          }
          return NextResponse.json({ pitch });
        }

        const pitches = guestPostingService.getAllPitches();
        const stats = guestPostingService.getPitchStatistics();

        return NextResponse.json({
          pitches,
          stats
        });
      }

      case 'posts': {
        if (postId) {
          const post = guestPostingService.getPost(postId);
          if (!post) {
            return NextResponse.json(
              { error: 'Post not found' },
              { status: 404 }
            );
          }
          return NextResponse.json({ post });
        }

        const posts = guestPostingService.getAllPosts();
        const stats = guestPostingService.getPublishingStatistics();

        return NextResponse.json({
          posts,
          stats
        });
      }

      case 'templates': {
        return NextResponse.json({
          templates: Object.entries(PITCH_TEMPLATES).map(([key, tmpl]) => ({
            key,
            name: tmpl.name,
            tier: tmpl.tier
          }))
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid type parameter' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Guest posts GET error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch data' },
      { status: 500 }
    );
  }
}

// ============================================================================
// POST - Create pitch, post, or generate pitch email
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    switch (action) {
      case 'create_pitch': {
        const validation = CreatePitchSchema.safeParse(body.pitch);
        if (!validation.success) {
          return NextResponse.json(
            { error: 'Invalid pitch data', details: validation.error },
            { status: 400 }
          );
        }

        const pitch = await guestPostingService.createPitch(validation.data);

        return NextResponse.json({
          success: true,
          pitch,
          message: 'Pitch created successfully'
        });
      }

      case 'generate_pitch_email': {
        const { pitchId, template } = body;
        if (!pitchId || !template) {
          return NextResponse.json(
            { error: 'Pitch ID and template required' },
            { status: 400 }
          );
        }

        const email = guestPostingService.generatePitchEmail(pitchId, template);
        if (!email) {
          return NextResponse.json(
            { error: 'Failed to generate email' },
            { status: 400 }
          );
        }

        return NextResponse.json({
          success: true,
          email,
          message: 'Pitch email generated'
        });
      }

      case 'create_post': {
        const validation = CreatePostSchema.safeParse(body.post);
        if (!validation.success) {
          return NextResponse.json(
            { error: 'Invalid post data', details: validation.error },
            { status: 400 }
          );
        }

        const { pitchId, content, seo } = validation.data;
        const post = await guestPostingService.createGuestPost(pitchId, content, seo);

        return NextResponse.json({
          success: true,
          post,
          message: 'Guest post created successfully'
        });
      }

      case 'submit_post': {
        const { postId } = body;
        if (!postId) {
          return NextResponse.json(
            { error: 'Post ID required' },
            { status: 400 }
          );
        }

        const post = await guestPostingService.submitGuestPost(postId);

        return NextResponse.json({
          success: true,
          post,
          message: 'Post submitted successfully'
        });
      }

      case 'publish_post': {
        const { postId, publishedUrl } = body;
        if (!postId || !publishedUrl) {
          return NextResponse.json(
            { error: 'Post ID and published URL required' },
            { status: 400 }
          );
        }

        const post = await guestPostingService.publishGuestPost(postId, publishedUrl);

        return NextResponse.json({
          success: true,
          post,
          message: 'Post marked as published'
        });
      }

      case 'verify_backlinks': {
        const { postId } = body;
        if (!postId) {
          return NextResponse.json(
            { error: 'Post ID required' },
            { status: 400 }
          );
        }

        const post = await guestPostingService.verifyBacklinks(postId);

        return NextResponse.json({
          success: true,
          post,
          verified: post.backlinks.filter(bl => bl.verified).length,
          message: 'Backlinks verified'
        });
      }

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }

  } catch (error) {
    console.error('Guest posts POST error:', error);
    return NextResponse.json(
      { error: 'Failed to process request', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

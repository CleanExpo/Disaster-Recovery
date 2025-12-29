import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { PostStatus } from '@prisma/client';
import { z } from 'zod';

const updateSchema = z.object({
  title: z.string().min(10).max(200).optional(),
  content: z.string().min(100).optional(),
  excerpt: z.string().min(50).max(500).optional(),
  tags: z.array(z.string()).optional(),
  keywords: z.array(z.string()).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  status: z.nativeEnum(PostStatus).optional(),
  scheduledFor: z.string().datetime().optional(),
  isFeatured: z.boolean().optional(),
  featuredImage: z.string().url().optional(),
});

/**
 * GET /api/blog/[slug]
 * Get a single blog post by slug
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const post = await prisma.blogPost.findUnique({
      where: { slug: params.slug },
      include: {
        faqs: {
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!post) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog post' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/blog/[slug]
 * Update a blog post (admin only)
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // NOTE: Authentication recommended for production - add admin check before allowing updates
    const body = await request.json();
    const validatedData = updateSchema.parse(body);

    const post = await prisma.blogPost.update({
      where: { slug: params.slug },
      data: {
        ...validatedData,
        publishedAt:
          validatedData.status === PostStatus.PUBLISHED
            ? new Date()
            : undefined,
      },
      include: {
        faqs: true,
      },
    });

    return NextResponse.json(post);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error updating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to update blog post' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/blog/[slug]
 * Delete a blog post (admin only)
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    // NOTE: Authentication recommended for production - add admin check before allowing updates
    await prisma.blogPost.delete({
      where: { slug: params.slug },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return NextResponse.json(
      { error: 'Failed to delete blog post' },
      { status: 500 }
    );
  }
}

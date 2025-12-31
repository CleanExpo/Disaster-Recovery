import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { BlogCategory, PostStatus } from '@prisma/client';
import { z } from 'zod';

// Validation schema for blog post creation
const blogPostSchema = z.object({
  title: z.string().min(10).max(200),
  content: z.string().min(100),
  excerpt: z.string().min(50).max(500),
  category: z.nativeEnum(BlogCategory),
  tags: z.array(z.string()).optional().default([]),
  keywords: z.array(z.string()).optional().default([]),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  authorId: z.string(),
  authorName: z.string(),
  authorBio: z.string().optional(),
  status: z.nativeEnum(PostStatus).optional().default(PostStatus.DRAFT),
  scheduledFor: z.string().datetime().optional(),
  isFeatured: z.boolean().optional().default(false),
  featuredImage: z.string().url().optional(),
  faqs: z
    .array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    )
    .optional()
    .default([]),
});

/**
 * GET /api/blog
 * List blog posts with filtering and pagination
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = Math.min(parseInt(searchParams.get('limit') || '10'), 50);
    const category = searchParams.get('category') as BlogCategory | null;
    const status = searchParams.get('status') as PostStatus | null;
    const search = searchParams.get('search');
    const featured = searchParams.get('featured') === 'true';

    const skip = (page - 1) * limit;

    const where: any = {};

    if (category) where.category = category;
    if (status) where.status = status;
    if (featured) where.isFeatured = true;
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { excerpt: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    const [posts, total] = await Promise.all([
      prisma.blogPost.findMany({
        where,
        include: {
          faqs: {
            orderBy: { order: 'asc' },
          },
        },
        orderBy: { publishedAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.blogPost.count({ where }),
    ]);

    return NextResponse.json({
      posts,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json(
      { error: 'Failed to fetch blog posts' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/blog
 * Create a new blog post (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Authentication check - admin only
    const session = await getServerSession(authOptions);
    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Check if user is admin
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || (user.userType !== 'ADMIN' && user.userType !== 'SUPER_ADMIN')) {
      return NextResponse.json(
        { error: 'Forbidden - Admin access required' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = blogPostSchema.parse(body);

    // Generate slug from title
    const slug = validatedData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if slug already exists
    const existingPost = await prisma.blogPost.findUnique({
      where: { slug },
    });

    if (existingPost) {
      return NextResponse.json(
        { error: 'A post with this title already exists' },
        { status: 400 }
      );
    }

    // Create blog post
    const { faqs, ...postData } = validatedData;

    const post = await prisma.blogPost.create({
      data: {
        ...postData,
        slug,
        publishedAt:
          validatedData.status === PostStatus.PUBLISHED
            ? new Date()
            : null,
        faqs: {
          create: faqs.map((faq, index) => ({
            question: faq.question,
            answer: faq.answer,
            order: index,
          })),
        },
      },
      include: {
        faqs: true,
      },
    });

    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating blog post:', error);
    return NextResponse.json(
      { error: 'Failed to create blog post' },
      { status: 500 }
    );
  }
}

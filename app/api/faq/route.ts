import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { FAQCategory } from '@prisma/client';
import { z } from 'zod';

const faqSchema = z.object({
  question: z.string().min(10),
  answer: z.string().min(20),
  category: z.nativeEnum(FAQCategory),
  tags: z.array(z.string()).optional().default([]),
  serviceType: z.string().optional(),
  location: z.string().optional(),
  keywords: z.array(z.string()).optional().default([]),
  searchVolume: z.number().optional(),
  order: z.number().optional().default(0),
  isPublished: z.boolean().optional().default(true),
});

/**
 * GET /api/faq
 * List FAQs with filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') as FAQCategory | null;
    const serviceType = searchParams.get('serviceType');
    const location = searchParams.get('location');
    const search = searchParams.get('search');
    const limit = Math.min(parseInt(searchParams.get('limit') || '500'), 500);

    const where: any = {
      isPublished: true,
    };

    if (category) where.category = category;
    if (serviceType) where.serviceType = serviceType;
    if (location) where.location = location;
    if (search) {
      where.OR = [
        { question: { contains: search, mode: 'insensitive' } },
        { answer: { contains: search, mode: 'insensitive' } },
        { tags: { has: search } },
      ];
    }

    const faqs = await prisma.fAQ.findMany({
      where,
      orderBy: [{ order: 'asc' }, { helpful: 'desc' }],
      take: limit,
    });

    return NextResponse.json({ faqs });
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/faq
 * Create a new FAQ (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    // Authentication check - admin only
    const session = await getServerSession();
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
    const validatedData = faqSchema.parse(body);

    const faq = await prisma.fAQ.create({
      data: validatedData,
    });

    return NextResponse.json(faq, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}

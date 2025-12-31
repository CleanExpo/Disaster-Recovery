import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/db';
import { authOptions } from '@/lib/auth';
import { z } from 'zod';

const caseStudySchema = z.object({
  title: z.string().min(10),
  customerName: z.string(),
  customerType: z.string(),
  serviceType: z.string(),
  location: z.string(),
  incidentDate: z.string().datetime(),
  challenge: z.string().min(50),
  solution: z.string().min(50),
  results: z.string().min(50),
  testimonial: z.string().optional(),
  beforeImages: z.array(z.string().url()).optional().default([]),
  afterImages: z.array(z.string().url()).optional().default([]),
  videoUrl: z.string().url().optional(),
  responseTime: z.number().optional(),
  completionTime: z.number().optional(),
  projectCost: z.number().optional(),
  customerRating: z.number().min(1).max(5).optional(),
  metaTitle: z.string().optional(),
  metaDescription: z.string().optional(),
  isPublished: z.boolean().optional().default(false),
});

/**
 * GET /api/case-studies
 * List case studies with filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const serviceType = searchParams.get('serviceType');
    const location = searchParams.get('location');
    const published = searchParams.get('published') !== 'false';
    const limit = Math.min(parseInt(searchParams.get('limit') || '50'), 100);

    const where: any = {};

    if (published) where.isPublished = true;
    if (serviceType) {
      where.serviceType = { contains: serviceType, mode: 'insensitive' };
    }
    if (location) {
      where.location = { contains: location, mode: 'insensitive' };
    }

    const caseStudies = await prisma.caseStudy.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: limit,
    });

    return NextResponse.json({ caseStudies });
  } catch (error) {
    console.error('Error fetching case studies:', error);
    return NextResponse.json(
      { error: 'Failed to fetch case studies' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/case-studies
 * Create a new case study (admin only)
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
    const validatedData = caseStudySchema.parse(body);

    // Generate slug
    const slug = `${validatedData.serviceType}-${validatedData.location}-${validatedData.customerType}`
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

    // Check if slug exists and make it unique if needed
    let finalSlug = slug;
    let counter = 1;
    while (
      await prisma.caseStudy.findUnique({ where: { slug: finalSlug } })
    ) {
      finalSlug = `${slug}-${counter}`;
      counter++;
    }

    const caseStudy = await prisma.caseStudy.create({
      data: {
        ...validatedData,
        slug: finalSlug,
        incidentDate: new Date(validatedData.incidentDate),
        publishedAt: validatedData.isPublished ? new Date() : null,
      },
    });

    return NextResponse.json(caseStudy, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation error', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Error creating case study:', error);
    return NextResponse.json(
      { error: 'Failed to create case study' },
      { status: 500 }
    );
  }
}

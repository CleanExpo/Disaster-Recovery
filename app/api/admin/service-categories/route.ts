import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { z } from 'zod';

const categorySchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  icon: z.string().optional(),
  theme: z.string().min(1),
  sortOrder: z.number().default(0)
});

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload || payload.userType !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const categories = await prisma.adminServiceCategory.findMany({
      include: {
        services: true
      },
      orderBy: {
        sortOrder: 'asc'
      }
    });

    return NextResponse.json({
      success: true,
      data: categories
    });
  } catch (error) {
    console.error('Get service categories error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch service categories' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload || payload.userType !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const categoryData = categorySchema.parse(body);

    const category = await prisma.adminServiceCategory.create({
      data: categoryData,
      include: {
        services: true
      }
    });

    return NextResponse.json({
      success: true,
      data: category
    });
  } catch (error) {
    console.error('Create service category error:', error);
    return NextResponse.json(
      { error: 'Failed to create service category' },
      { status: 500 }
    );
  }
}

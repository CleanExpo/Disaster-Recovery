import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { z } from 'zod';

const themeSchema = z.object({
  name: z.string().min(1),
  identifier: z.string().min(1),
  primaryColor: z.string().min(1),
  secondaryColor: z.string().min(1),
  accentColor: z.string().min(1),
  backgroundColor: z.string().min(1),
  textColor: z.string().min(1)
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

    const themes = await prisma.adminTheme.findMany({
      orderBy: {
        name: 'asc'
      }
    });

    return NextResponse.json({
      success: true,
      data: themes
    });
  } catch (error) {
    console.error('Get themes error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch themes' },
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
    const themeData = themeSchema.parse(body);

    const theme = await prisma.adminTheme.create({
      data: themeData
    });

    return NextResponse.json({
      success: true,
      data: theme
    });
  } catch (error) {
    console.error('Create theme error:', error);
    return NextResponse.json(
      { error: 'Failed to create theme' },
      { status: 500 }
    );
  }
}

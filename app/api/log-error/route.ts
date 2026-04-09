import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    const body = await req.json();

    const {
      message,
      stack,
      level = 'error',
      source = 'frontend',
      metadata,
    } = body;

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Missing required field: message' },
        { status: 400 }
      );
    }

    const validLevels = ['error', 'warning', 'info'];
    const sanitisedLevel = validLevels.includes(level) ? level : 'error';

    const ipAddress =
      req.headers.get('x-forwarded-for') ||
      req.headers.get('x-real-ip') ||
      'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    const errorLog = await prisma.errorLog.create({
      data: {
        level: sanitisedLevel,
        message: message.slice(0, 2000),
        stack: stack ? String(stack).slice(0, 5000) : null,
        metadata: metadata ? JSON.stringify(metadata).slice(0, 5000) : null,
        source: source ? String(source).slice(0, 100) : 'frontend',
        userId: session?.user?.email ?? null,
        ipAddress,
        userAgent: userAgent.slice(0, 500),
      },
    });

    if (sanitisedLevel === 'error') {
      await prisma.auditLog.create({
        data: {
          action: 'ERROR_LOGGED',
          resource: 'application',
          resourceId: errorLog.id,
          details: JSON.stringify({
            errorId: errorLog.id,
            message: message.slice(0, 500),
            source,
          }),
          userId: session?.user?.email ?? null,
          ipAddress,
          userAgent: userAgent.slice(0, 500),
        },
      });
    }

    return NextResponse.json({
      success: true,
      errorId: errorLog.id,
    });
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error logging application error:', errMessage);
    return NextResponse.json(
      { error: 'Internal server error while logging error' },
      { status: 500 }
    );
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 200);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);
    const level = searchParams.get('level');

    const whereClause: Record<string, string> = {};
    if (level && ['error', 'warning', 'info'].includes(level)) {
      whereClause.level = level;
    }

    const [errors, totalCount] = await Promise.all([
      prisma.errorLog.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.errorLog.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      errors,
      totalCount,
      hasMore: offset + limit < totalCount,
    });
  } catch (error: unknown) {
    const errMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching error logs:', errMessage);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

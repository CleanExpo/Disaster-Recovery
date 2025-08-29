import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    const { 
      message, 
      stack, 
      componentStack, 
      url, 
      userAgent, 
      timestamp,
      severity = 'ERROR',
      source = 'frontend'
    } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: 'Missing required field: message' },
        { status: 400 }
      );
    }

    // Create error log entry
    const errorLog = await prisma.errorLog.create({
      data: {
        message,
        stack,
        componentStack,
        url,
        userAgent: userAgent || req.headers.get('user-agent') || 'unknown',
        timestamp: timestamp ? new Date(timestamp) : new Date(),
        severity,
        source,
        userId: session?.user?.email || null,
        ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
        resolved: false
      }
    });

    // For critical errors, also create audit log
    if (severity === 'CRITICAL' || severity === 'ERROR') {
      await prisma.auditLog.create({
        data: {
          action: 'ERROR_LOGGED',
          resource: 'application',
          details: JSON.stringify({
            errorId: errorLog.id,
            message,
            url,
            source
          }),
          severity: 'ERROR',
          userId: session?.user?.email || 'anonymous',
          ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
          userAgent: req.headers.get('user-agent') || 'unknown',
          timestamp: new Date()
        }
      });
    }

    return NextResponse.json({
      success: true,
      errorId: errorLog.id,
      message: 'Error logged successfully'
    });

  } catch (error) {
    console.error('Error logging application error:', error);
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
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const severity = searchParams.get('severity');
    const resolved = searchParams.get('resolved');

    const whereClause: any = {};
    if (severity) whereClause.severity = severity;
    if (resolved !== null) whereClause.resolved = resolved === 'true';

    const errors = await prisma.errorLog.findMany({
      where: whereClause,
      orderBy: { timestamp: 'desc' },
      take: limit,
      skip: offset
    });

    const totalCount = await prisma.errorLog.count({ where: whereClause });

    return NextResponse.json({
      errors,
      totalCount,
      hasMore: offset + limit < totalCount
    });

  } catch (error) {
    console.error('Error fetching error logs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
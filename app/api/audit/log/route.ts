import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession();
    const { action, resource, details, severity = 'INFO' } = await req.json();

    if (!action || !resource) {
      return NextResponse.json(
        { error: 'Missing required fields: action, resource' },
        { status: 400 }
      );
    }

    // TODO: Create audit log entry when auditLog model is added to schema
    // For now, create a stub response
    const auditLog = {
      id: `temp_${Date.now()}`,
      action,
      resource,
      severity
    };
    
    // const auditLog = await prisma.auditLog.create({
    //   data: {
    //     action,
    //     resource,
    //     details: details ? JSON.stringify(details) : null,
    //     severity,
    //     userId: session?.user?.email || 'anonymous',
    //     ipAddress: req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown',
    //     userAgent: req.headers.get('user-agent') || 'unknown',
    //     timestamp: new Date()
    //   }
    // });

    return NextResponse.json({
      success: true,
      logId: auditLog.id
    });

  } catch (error) {
    console.error('Error creating audit log:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
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
    const action = searchParams.get('action');

    const whereClause: any = {};
    if (severity) whereClause.severity = severity;
    if (action) whereClause.action = action;

    // TODO: Query audit logs when model is added to schema
    const logs: any[] = [];
    const totalCount = 0;
    
    // const logs = await prisma.auditLog.findMany({
    //   where: whereClause,
    //   orderBy: { timestamp: 'desc' },
    //   take: limit,
    //   skip: offset
    // });
    //
    // const totalCount = await prisma.auditLog.count({ where: whereClause });

    return NextResponse.json({
      logs: logs.map(log => ({
        ...log,
        details: log.details ? JSON.parse(log.details) : null
      })),
      totalCount,
      hasMore: offset + limit < totalCount
    });

  } catch (error) {
    console.error('Error fetching audit logs:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
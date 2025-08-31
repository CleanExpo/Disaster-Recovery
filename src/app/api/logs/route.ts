import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    // Only allow in production or from authenticated admin users
    if (process.env.NODE_ENV !== 'production') {
      const session = await getServerSession();
      if (!session?.user || session.user.role !== 'ADMIN') {
        return NextResponse.json(
          { error: 'Unauthorized' },
          { status: 401 }
        );
      }
    }

    const { entries } = await request.json();

    // Store logs in database (batch insert)
    if (entries && entries.length > 0) {
      // Create audit log entries
      const auditLogs = entries.map((entry: any) => ({
        action: entry.message,
        category: entry.category,
        details: JSON.stringify({
          level: entry.level,
          context: entry.context,
          metadata: entry.metadata,
          error: entry.error,
          duration: entry.duration }),
        ipAddress: entry.context?.ipAddress || request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip'),
        userAgent: entry.context?.userAgent || request.headers.get('user-agent'),
        performedBy: entry.context?.userId || entry.context?.contractorId || 'SYSTEM',
        performedByType: entry.context?.contractorId ? 'CONTRACTOR' : entry.context?.userId ? 'USER' : 'SYSTEM',
        createdAt: new Date(entry.timestamp) }));

      // Use transaction for batch insert
      await prisma.$transaction(async (tx) => {
        for (const log of auditLogs) {
          // Check if it's a contractor log
          if (log.performedByType === 'CONTRACTOR' && log.performedBy !== 'SYSTEM') {
            await tx.contractorAuditLog.create({
              data: {
                contractorId: log.performedBy,
                action: log.action,
                category: log.category.toUpperCase(),
                details: log.details,
                ipAddress: log.ipAddress,
                userAgent: log.userAgent,
                performedBy: log.performedBy,
                performedByType: log.performedByType } });
          }
        }
      });

      // If production, also send to external service (e.g., CloudWatch, Datadog)
      if (process.env.NODE_ENV === 'production') {
        // TODO: Implement external logging service integration
        // await sendToExternalLoggingService(entries);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Failed to process logs:', error);
    return NextResponse.json(
      { error: 'Failed to process logs' },
      { status: 500 }
    );
  }
}

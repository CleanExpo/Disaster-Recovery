import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

/**
 * GET /api/kpi/job-outcomes
 * DR-322 Path B — KPI dashboard query endpoint.
 *
 * Query params:
 *   from        ISO date string (default: 30 days ago)
 *   to          ISO date string (default: now)
 *   state       Filter by state code (e.g. QLD, NSW)
 *   serviceType Filter by job service type
 *   contractorId Filter by contractor
 *
 * Returns aggregate KPIs:
 *   - Total jobs completed / declined / cancelled
 *   - Completion rate %
 *   - Avg response time (minutes) — assignedAt → acceptedAt
 *   - Avg job duration (minutes) — acceptedAt → completedAt
 *   - Avg end-to-end time (minutes) — createdAt → completedAt
 *   - Breakdown by state
 *   - Breakdown by service type
 *   - Breakdown by insurance vs self-pay
 *   - Breakdown by urgency
 */
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorised' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const now = new Date();
    const defaultFrom = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);

    const from = searchParams.get('from') ? new Date(searchParams.get('from')!) : defaultFrom;
    const to = searchParams.get('to') ? new Date(searchParams.get('to')!) : now;
    const state = searchParams.get('state') ?? undefined;
    const serviceType = searchParams.get('serviceType') ?? undefined;
    const contractorId = searchParams.get('contractorId') ?? undefined;

    const where = {
      loggedAt: { gte: from, lte: to },
      ...(state ? { state } : {}),
      ...(serviceType ? { jobType: serviceType } : {}),
      ...(contractorId ? { contractorId } : {}),
    };

    // Aggregate counts by outcome
    const outcomeCounts = await prisma.jobOutcome.groupBy({
      by: ['outcome'],
      where,
      _count: { outcome: true },
    });

    const completed = outcomeCounts.find(r => r.outcome === 'COMPLETED')?._count.outcome ?? 0;
    const declined  = outcomeCounts.find(r => r.outcome === 'DECLINED')?._count.outcome ?? 0;
    const cancelled = outcomeCounts.find(r => r.outcome === 'CANCELLED')?._count.outcome ?? 0;
    const total     = completed + declined + cancelled;

    // Avg timing metrics (completed jobs only)
    const timingAgg = await prisma.jobOutcome.aggregate({
      where: { ...where, outcome: 'COMPLETED' },
      _avg: {
        responseMinutes: true,
        durationMinutes: true,
        totalMinutes:    true,
      },
    });

    // Breakdown by state
    const byState = await prisma.jobOutcome.groupBy({
      by: ['state', 'outcome'],
      where,
      _count: { outcome: true },
      orderBy: { _count: { outcome: 'desc' } },
    });

    // Breakdown by service type
    const byServiceType = await prisma.jobOutcome.groupBy({
      by: ['jobType', 'outcome'],
      where,
      _count: { outcome: true },
      orderBy: { _count: { outcome: 'desc' } },
    });

    // Breakdown by urgency
    const byUrgency = await prisma.jobOutcome.groupBy({
      by: ['urgency', 'outcome'],
      where,
      _count: { outcome: true },
    });

    // Insurance vs self-pay
    const byInsurance = await prisma.jobOutcome.groupBy({
      by: ['insuranceClaim', 'outcome'],
      where,
      _count: { outcome: true },
    });

    // Recent outcomes (last 10)
    const recentOutcomes = await prisma.jobOutcome.findMany({
      where,
      orderBy: { loggedAt: 'desc' },
      take: 10,
      select: {
        id:              true,
        jobId:           true,
        outcome:         true,
        jobType:         true,
        state:           true,
        suburb:          true,
        urgency:         true,
        insuranceClaim:  true,
        responseMinutes: true,
        durationMinutes: true,
        totalMinutes:    true,
        loggedAt:        true,
      },
    });

    return NextResponse.json({
      success: true,
      period: { from: from.toISOString(), to: to.toISOString() },
      summary: {
        total,
        completed,
        declined,
        cancelled,
        completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
      },
      timing: {
        avgResponseMinutes: timingAgg._avg.responseMinutes
          ? Math.round(timingAgg._avg.responseMinutes) : null,
        avgDurationMinutes: timingAgg._avg.durationMinutes
          ? Math.round(timingAgg._avg.durationMinutes) : null,
        avgTotalMinutes: timingAgg._avg.totalMinutes
          ? Math.round(timingAgg._avg.totalMinutes) : null,
      },
      breakdowns: {
        byState,
        byServiceType,
        byUrgency,
        byInsurance,
      },
      recentOutcomes,
    });

  } catch (error) {
    console.error('[KPI] job-outcomes error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

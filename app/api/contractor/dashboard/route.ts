import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractor/dashboard' });
  try {
    // Verify authentication
    const user = await verifyAuth(request);

    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Authentication required' }, { status: 401 });
    }

    // Check role-based access
    const allowedRoles = [UserRole.CONTRACTOR, UserRole.ADMIN];
    if (!hasRole(user.role as UserRole, allowedRoles)) {
      return NextResponse.json({
        success: false,
        message: 'Contractor access required' }, { status: 403 });
    }

    const contractorId = user.userId;
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - now.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const startOfLastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
    const endOfLastMonth = new Date(now.getFullYear(), now.getMonth(), 0, 23, 59, 59, 999);
    const tomorrow = new Date(startOfDay);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const endOfTomorrow = new Date(tomorrow);
    endOfTomorrow.setDate(endOfTomorrow.getDate() + 1);
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(endOfWeek.getDate() + 7);

    // Run all queries in parallel for performance
    const [
      activeJobsCount,
      completedThisMonthCount,
      revenueThisMonth,
      avgRating,
      nextJob,
      totalJobsAllTime,
      completedJobsAllTime,
      recentJobs,
      upcomingJobs,
      earningsToday,
      earningsThisWeek,
      earningsThisMonth,
      earningsLastMonth,
      earningsPending,
      newLeads,
      acceptedLeads,
      pendingLeads,
      totalLeads,
      todayJobsCount,
      tomorrowJobsCount,
      weekJobsCount,
      unreadNotifications,
      latestKPI,
    ] = await Promise.all([
      // Active jobs count
      prisma.job.count({
        where: { contractorId, status: 'in_progress' },
      }),

      // Completed this month
      prisma.job.count({
        where: {
          contractorId,
          status: 'completed',
          completedAt: { gte: startOfMonth },
        },
      }),

      // Revenue this month (from Payment table)
      prisma.payment.aggregate({
        _sum: { amountAUD: true },
        where: {
          contractorId,
          status: 'COMPLETED',
          processedAt: { gte: startOfMonth },
        },
      }),

      // Average rating
      prisma.rating.aggregate({
        _avg: { rating: true },
        where: { contractorId },
      }),

      // Next upcoming job (earliest scheduled/assigned job not yet completed)
      prisma.job.findFirst({
        where: {
          contractorId,
          status: { in: ['pending', 'assigned', 'in_progress'] },
        },
        orderBy: { createdAt: 'asc' },
      }),

      // Total jobs all time (for completion rate)
      prisma.job.count({
        where: { contractorId },
      }),

      // Completed jobs all time (for completion rate)
      prisma.job.count({
        where: { contractorId, status: 'completed' },
      }),

      // Recent completed jobs (last 5)
      prisma.job.findMany({
        where: { contractorId, status: 'completed' },
        orderBy: { completedAt: 'desc' },
        take: 5,
      }),

      // Upcoming jobs (next 5 non-completed)
      prisma.job.findMany({
        where: {
          contractorId,
          status: { in: ['pending', 'assigned'] },
        },
        orderBy: { createdAt: 'asc' },
        take: 5,
      }),

      // Earnings today
      prisma.payment.aggregate({
        _sum: { amountAUD: true },
        where: {
          contractorId,
          status: 'COMPLETED',
          processedAt: { gte: startOfDay },
        },
      }),

      // Earnings this week
      prisma.payment.aggregate({
        _sum: { amountAUD: true },
        where: {
          contractorId,
          status: 'COMPLETED',
          processedAt: { gte: startOfWeek },
        },
      }),

      // Earnings this month (same query as revenueThisMonth, reused for clarity)
      prisma.payment.aggregate({
        _sum: { amountAUD: true },
        where: {
          contractorId,
          status: 'COMPLETED',
          processedAt: { gte: startOfMonth },
        },
      }),

      // Earnings last month
      prisma.payment.aggregate({
        _sum: { amountAUD: true },
        where: {
          contractorId,
          status: 'COMPLETED',
          processedAt: { gte: startOfLastMonth, lte: endOfLastMonth },
        },
      }),

      // Pending earnings
      prisma.payment.aggregate({
        _sum: { amountAUD: true },
        where: {
          contractorId,
          status: 'PENDING',
        },
      }),

      // Lead counts: new
      prisma.lead.count({
        where: { partnerId: contractorId, status: 'NEW' },
      }),

      // Lead counts: accepted
      prisma.lead.count({
        where: { partnerId: contractorId, status: 'ACCEPTED' },
      }),

      // Lead counts: assigned (pending acceptance)
      prisma.lead.count({
        where: { partnerId: contractorId, status: 'ASSIGNED' },
      }),

      // Total leads for conversion rate
      prisma.lead.count({
        where: { partnerId: contractorId },
      }),

      // Calendar: today's jobs
      prisma.job.count({
        where: {
          contractorId,
          status: { in: ['pending', 'assigned', 'in_progress'] },
          createdAt: { gte: startOfDay, lt: tomorrow },
        },
      }),

      // Calendar: tomorrow's jobs
      prisma.job.count({
        where: {
          contractorId,
          status: { in: ['pending', 'assigned', 'in_progress'] },
          createdAt: { gte: tomorrow, lt: endOfTomorrow },
        },
      }),

      // Calendar: this week's jobs
      prisma.job.count({
        where: {
          contractorId,
          status: { in: ['pending', 'assigned', 'in_progress'] },
          createdAt: { gte: startOfWeek, lt: endOfWeek },
        },
      }),

      // Unread notifications for alerts
      prisma.contractorNotification.findMany({
        where: { contractorId, read: false },
        orderBy: { createdAt: 'desc' },
        take: 10,
      }),

      // Latest KPI record for performance metrics
      prisma.contractorKPI.findFirst({
        where: { contractorId },
        orderBy: { periodStart: 'desc' },
      }),
    ]);

    // Compute derived values
    const totalRevenueThisMonth = revenueThisMonth._sum.amountAUD ?? 0;
    const averageRating = avgRating._avg.rating ?? 0;
    const jobCompletionRate = totalJobsAllTime > 0
      ? Math.round((completedJobsAllTime / totalJobsAllTime) * 100)
      : 0;

    // Lead conversion rate
    const completedLeads = await prisma.lead.count({
      where: { partnerId: contractorId, status: 'COMPLETED' },
    });
    const leadConversionRate = totalLeads > 0
      ? Math.round((completedLeads / totalLeads) * 100)
      : 0;

    // Average lead value
    const leadValueAgg = await prisma.lead.aggregate({
      _avg: { leadValue: true },
      where: { partnerId: contractorId },
    });

    // Build response matching the original structure
    const dashboardData = {
      overview: {
        activeJobs: activeJobsCount,
        completedThisMonth: completedThisMonthCount,
        totalRevenue: totalRevenueThisMonth,
        averageRating: Math.round(averageRating * 10) / 10,
        nextJob: nextJob
          ? {
              id: nextJob.id,
              customer: nextJob.customerName,
              service: nextJob.serviceType,
              location: `${nextJob.suburb}, ${nextJob.state}`,
              scheduledTime: nextJob.assignedAt?.toISOString() ?? nextJob.createdAt.toISOString(),
              estimatedDuration: null,
              value: null,
            }
          : null,
      },

      performance: {
        jobCompletionRate,
        averageResponseTime: latestKPI?.averageResponseTime
          ? `${Math.round(latestKPI.averageResponseTime * 60)} minutes`
          : '0 minutes',
        customerSatisfaction: latestKPI?.customerSatisfaction
          ? Math.round(latestKPI.customerSatisfaction * 20)
          : 0,
        repeatCustomerRate: 0,
        monthlyGrowth: (() => {
          const lastMonthRev = earningsLastMonth._sum.amountAUD ?? 0;
          if (lastMonthRev === 0) return 0;
          return Math.round(((totalRevenueThisMonth - lastMonthRev) / lastMonthRev) * 1000) / 10;
        })(),
      },

      recentJobs: recentJobs.map((job) => ({
        id: job.id,
        customer: job.customerName,
        service: job.serviceType,
        location: `${job.suburb}, ${job.state}`,
        completedAt: job.completedAt?.toISOString() ?? null,
        value: null,
        rating: null,
        status: job.status,
      })),

      upcomingJobs: upcomingJobs.map((job) => ({
        id: job.id,
        customer: job.customerName,
        service: job.serviceType,
        location: `${job.suburb}, ${job.state}`,
        scheduledTime: job.assignedAt?.toISOString() ?? job.createdAt.toISOString(),
        estimatedDuration: null,
        value: null,
        priority: job.urgency,
      })),

      earnings: {
        today: earningsToday._sum.amountAUD ?? 0,
        thisWeek: earningsThisWeek._sum.amountAUD ?? 0,
        thisMonth: earningsThisMonth._sum.amountAUD ?? 0,
        lastMonth: earningsLastMonth._sum.amountAUD ?? 0,
        pending: earningsPending._sum.amountAUD ?? 0,
        projectedMonthEnd: (() => {
          const dayOfMonth = now.getDate();
          const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
          const dailyAvg = dayOfMonth > 0 ? totalRevenueThisMonth / dayOfMonth : 0;
          return Math.round(dailyAvg * daysInMonth * 100) / 100;
        })(),
      },

      // Inventory is not tracked in the database; return empty placeholder
      inventory: {
        dehumidifiers: { available: 0, inUse: 0, maintenance: 0 },
        airMovers: { available: 0, inUse: 0, maintenance: 0 },
        moistureMeters: { available: 0, inUse: 0, maintenance: 0 },
        thermalCameras: { available: 0, inUse: 0, maintenance: 0 },
      },

      leads: {
        new: newLeads,
        accepted: acceptedLeads,
        pending: pendingLeads,
        conversionRate: leadConversionRate,
        averageValue: leadValueAgg._avg.leadValue ?? 0,
      },

      calendar: {
        todayJobs: todayJobsCount,
        tomorrowJobs: tomorrowJobsCount,
        weekJobs: weekJobsCount,
        availability: [],
      },

      alerts: unreadNotifications.map((n) => ({
        type: n.type.toLowerCase(),
        message: n.message,
        time: formatRelativeTime(n.createdAt),
        priority: n.priority.toLowerCase(),
      })),
    };

    return NextResponse.json({
      success: true,
      data: dashboardData,
      user: {
        id: user.userId,
        email: user.email,
        role: user.role } }, { status: 200 });

  } catch (error) {
    log.error('dashboard api error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/contractor/dashboard' }, extra: { requestId: log.requestId } });

    return NextResponse.json({
      success: false,
      message: 'Failed to load dashboard data' }, { status: 500 });
  }
}

/**
 * Formats a Date into a human-readable relative time string.
 */
function formatRelativeTime(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMinutes < 1) return 'just now';
  if (diffMinutes < 60) return `${diffMinutes} minute${diffMinutes === 1 ? '' : 's'} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
  return date.toLocaleDateString('en-AU');
}

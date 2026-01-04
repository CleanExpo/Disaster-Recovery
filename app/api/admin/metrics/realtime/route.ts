import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware'
import { handleUnexpectedError } from '@/lib/api-errors'

export const dynamic = 'force-dynamic'

// GET - Fetch real-time platform metrics
export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request)
    if (!authResult.success) return authResult.response
    const { user } = authResult.context

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN'])
    }

    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('range') || '24h'

    // Calculate time window
    const now = new Date()
    let startTime: Date
    switch (timeRange) {
      case '1h':
        startTime = new Date(now.getTime() - 60 * 60 * 1000)
        break
      case '24h':
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000)
        break
      case '7d':
        startTime = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000)
        break
      default:
        startTime = new Date(now.getTime() - 24 * 60 * 60 * 1000)
    }

    // Fetch all metrics in parallel
    const [
      jobsByStatus,
      activeConnections,
      jobsToday,
      recentJobs,
      responseTimeData,
      contractorStats,
    ] = await Promise.all([
      // Jobs by status
      prisma.serviceRequest.groupBy({
        by: ['status'],
        _count: true,
      }),

      // Active WebSocket connections (last 5 minutes = likely active)
      prisma.connectionLog.count({
        where: {
          disconnectedAt: null,
          lastHeartbeat: {
            gte: new Date(now.getTime() - 5 * 60 * 1000),
          },
        },
      }),

      // Jobs created today
      prisma.serviceRequest.count({
        where: {
          createdAt: {
            gte: new Date(now.setHours(0, 0, 0, 0)),
          },
        },
      }),

      // Recent jobs for response time calculation
      prisma.serviceRequest.findMany({
        where: {
          createdAt: { gte: startTime },
        },
        include: {
          matches: {
            where: { status: 'ACCEPTED' },
            orderBy: { createdAt: 'asc' },
            take: 1,
          },
        },
        orderBy: { createdAt: 'desc' },
        take: 100,
      }),

      // Hourly job counts for trend chart
      prisma.$queryRaw<{ hour: Date; count: bigint }[]>`
        SELECT
          date_trunc('hour', "createdAt") as hour,
          COUNT(*) as count
        FROM service_requests
        WHERE "createdAt" >= ${startTime}
        GROUP BY date_trunc('hour', "createdAt")
        ORDER BY hour ASC
      `,

      // Contractor response rate (accepted vs total matches)
      prisma.contractorMatch.groupBy({
        by: ['status'],
        where: {
          createdAt: { gte: startTime },
        },
        _count: true,
      }),
    ])

    // Calculate average response time (time from job creation to first acceptance)
    const responseTimes: number[] = []
    for (const job of recentJobs) {
      if (job.matches[0]) {
        const responseTimeMs = job.matches[0].createdAt.getTime() - job.createdAt.getTime()
        responseTimes.push(responseTimeMs / 1000 / 60) // Convert to minutes
      }
    }

    const avgResponseTime = responseTimes.length > 0
      ? responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length
      : 0

    // Format jobs by status
    const statusCounts: Record<string, number> = {}
    for (const item of jobsByStatus) {
      statusCounts[item.status] = item._count
    }

    // Calculate contractor response rate
    const matchStats: Record<string, number> = {}
    for (const item of contractorStats) {
      matchStats[item.status] = item._count
    }
    const totalMatches = Object.values(matchStats).reduce((a, b) => a + b, 0)
    const acceptedMatches = matchStats['ACCEPTED'] || 0
    const responseRate = totalMatches > 0 ? (acceptedMatches / totalMatches) * 100 : 0

    // Format hourly trend data
    const hourlyTrend = responseTimeData.map(row => ({
      hour: row.hour.toISOString(),
      count: Number(row.count),
    }))

    // Calculate response time distribution for chart
    const responseTimeDistribution = calculateResponseTimeDistribution(responseTimes)

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          activeJobs: (statusCounts['PENDING'] || 0) + (statusCounts['MATCHED'] || 0) + (statusCounts['IN_PROGRESS'] || 0),
          pendingJobs: statusCounts['PENDING'] || 0,
          inProgressJobs: statusCounts['IN_PROGRESS'] || 0,
          completedToday: statusCounts['COMPLETED'] || 0,
          avgResponseTimeMinutes: Math.round(avgResponseTime * 10) / 10,
          activeConnections,
          jobsToday,
          contractorResponseRate: Math.round(responseRate * 10) / 10,
        },
        charts: {
          jobsByStatus: Object.entries(statusCounts).map(([status, count]) => ({
            name: formatStatusLabel(status),
            value: count,
            status,
          })),
          hourlyTrend,
          responseTimeDistribution,
        },
        timeRange,
        generatedAt: new Date().toISOString(),
      },
    })
  } catch (error) {
    return handleUnexpectedError(error)
  }
}

// Helper function to format status labels
function formatStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    PENDING: 'Pending',
    MATCHED: 'Matched',
    IN_PROGRESS: 'In Progress',
    COMPLETED: 'Completed',
    CANCELLED: 'Cancelled',
  }
  return labels[status] || status
}

// Helper function to calculate response time distribution
function calculateResponseTimeDistribution(responseTimes: number[]): Array<{ range: string; count: number }> {
  const buckets = [
    { range: '0-5 min', min: 0, max: 5, count: 0 },
    { range: '5-15 min', min: 5, max: 15, count: 0 },
    { range: '15-30 min', min: 15, max: 30, count: 0 },
    { range: '30-60 min', min: 30, max: 60, count: 0 },
    { range: '1+ hour', min: 60, max: Infinity, count: 0 },
  ]

  for (const time of responseTimes) {
    for (const bucket of buckets) {
      if (time >= bucket.min && time < bucket.max) {
        bucket.count++
        break
      }
    }
  }

  return buckets.map(b => ({ range: b.range, count: b.count }))
}

import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';
export const dynamic = 'force-dynamic';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Authenticate request using Anthropic pattern
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Authorize: Only clients can view their own analytics
    if (!requireRole(user, ['CLIENT'])) {
      return unauthorizedRoleResponse(['CLIENT']);
    }

    // Get client analytics
    const [
      totalRequests,
      pendingRequests,
      inProgressRequests,
      completedRequests,
      cancelledRequests,
      averageLeadScore,
      totalSpent,
      recentActivity,
      topCategories,
      monthlyTrends
    ] = await Promise.all([
      // Total requests
      prisma.serviceRequest.count({
        where: { userId: user.id }
      }),

      // Pending requests
      prisma.serviceRequest.count({
        where: { userId: user.id, status: 'PENDING' }
      }),

      // In progress requests
      prisma.serviceRequest.count({
        where: { userId: user.id, status: 'IN_PROGRESS' }
      }),

      // Completed requests
      prisma.serviceRequest.count({
        where: { userId: user.id, status: 'COMPLETED' }
      }),

      // Cancelled requests
      prisma.serviceRequest.count({
        where: { userId: user.id, status: 'CANCELLED' }
      }),

      // Average lead score
      prisma.serviceRequest.aggregate({
        where: { userId: user.id },
        _avg: { leadScore: true }
      }),

      // Total spent (mock data for now)
      prisma.serviceRequest.aggregate({
        where: {
          userId: user.id,
          status: 'COMPLETED'
        },
        _count: { id: true }
      }),

      // Recent activity
      prisma.serviceRequest.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: 'desc' },
        take: 5,
        include: {
          matches: {
            include: {
              contractor: {
                include: {
                  user: true
                }
              }
            }
          }
        }
      }),

      // Top categories
      prisma.serviceRequest.groupBy({
        by: ['serviceCategory'],
        where: { userId: user.id },
        _count: { serviceCategory: true },
        orderBy: { _count: { serviceCategory: 'desc' } },
        take: 5
      }),

      // Monthly trends (last 6 months)
      prisma.serviceRequest.groupBy({
        by: ['createdAt'],
        where: {
          userId: user.id,
          createdAt: {
            gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
          }
        },
        _count: { id: true }
      })
    ]);

    // Calculate conversion rate
    const conversionRate = totalRequests > 0 ? (completedRequests / totalRequests) * 100 : 0;

    // Calculate average project value (mock)
    const averageProjectValue = completedRequests > 0 ? 2500 : 0;

    // Calculate response time (mock)
    const averageResponseTime = 2.5; // hours

    // Calculate satisfaction score (mock)
    const satisfactionScore = 4.7; // out of 5

    const analytics = {
      overview: {
        totalRequests,
        pendingRequests,
        inProgressRequests,
        completedRequests,
        cancelledRequests,
        conversionRate: Math.round(conversionRate * 10) / 10,
        averageLeadScore: Math.round((averageLeadScore._avg.leadScore || 0) * 10) / 10,
        totalSpent: completedRequests * averageProjectValue,
        averageProjectValue,
        averageResponseTime,
        satisfactionScore
      },
      recentActivity: recentActivity.map(activity => ({
        id: activity.id,
        title: activity.serviceTitle,
        status: activity.status,
        category: activity.serviceCategory,
        createdAt: activity.createdAt,
        leadScore: activity.leadScore,
        matchesCount: activity.matches.length,
        topContractor: activity.matches[0]?.contractor?.user?.name || null
      })),
      topCategories: topCategories.map(category => ({
        category: category.serviceCategory,
        count: category._count.serviceCategory
      })),
      monthlyTrends: monthlyTrends.map(trend => ({
        month: new Date(trend.createdAt).toLocaleDateString('en-US', { month: 'short' }),
        count: trend._count.id
      }))
    };

    return NextResponse.json({
      success: true,
      analytics
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}

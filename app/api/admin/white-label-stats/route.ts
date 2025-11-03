import { NextRequest, NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Authorize admin role
    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Calculate date threshold for active clients
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    // Run all database queries in parallel
    const [
      totalClients,
      activeClients,
      totalServices,
      completedServices,
      revenueResult
    ] = await Promise.all([
      // Get all clients
      prisma.user.count({
        where: { userType: 'CLIENT' }
      }),
      // Get active clients (those with recent activity)
      prisma.user.count({
        where: {
          userType: 'CLIENT',
          serviceRequests: {
            some: {
              createdAt: {
                gte: thirtyDaysAgo
              }
            }
          }
        }
      }),
      // Get total service requests
      prisma.serviceRequest.count(),
      // Get completed service requests
      prisma.serviceRequest.count({
        where: { status: 'COMPLETED' }
      }),
      // Get revenue statistics
      prisma.serviceRequest.aggregate({
        _sum: {
          budget: true
        },
        where: {
          status: 'COMPLETED'
        }
      })
    ]);

    const totalRevenue = revenueResult._sum.budget || 0;
    const averageServiceValue = completedServices > 0 ? totalRevenue / completedServices : 0;

    const stats = {
      totalClients,
      activeClients,
      totalServices,
      completedServices,
      totalRevenue,
      averageServiceValue
    };

    return NextResponse.json({
      success: true,
      stats
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}

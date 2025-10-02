import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const user = verifyToken(token);

    if (!user || user.userType !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get all clients
    const totalClients = await prisma.user.count({
      where: { userType: 'CLIENT' }
    });

    // Get active clients (those with recent activity)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const activeClients = await prisma.user.count({
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
    });

    // Get service statistics
    const totalServices = await prisma.serviceRequest.count();
    const completedServices = await prisma.serviceRequest.count({
      where: { status: 'COMPLETED' }
    });

    // Get revenue statistics
    const revenueResult = await prisma.serviceRequest.aggregate({
      _sum: {
        budget: true
      },
      where: {
        status: 'COMPLETED'
      }
    });

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
    console.error('Error fetching white label stats:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

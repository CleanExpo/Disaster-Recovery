import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
export const dynamic = 'force-dynamic';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const token = authHeader.substring(7);
    const user = verifyToken(token);
    if (!user || user.userType !== 'ADMIN') {
      return NextResponse.json({ error: 'Admin access required' }, { status: 403 });
    }

    // Get total users (tenants)
    const totalUsers = await prisma.user.count();
    const totalClients = await prisma.user.count({
      where: { userType: 'CLIENT' }
    });
    const totalContractors = await prisma.user.count({
      where: { userType: 'CONTRACTOR' }
    });

    // Get total service requests
    const totalServiceRequests = await prisma.serviceRequest.count();
    const completedRequests = await prisma.serviceRequest.count({
      where: { status: 'COMPLETED' }
    });

    // Get total revenue (estimated from completed jobs)
    const completedMatches = await prisma.contractorMatch.findMany({
      where: {
        serviceRequest: {
          status: 'COMPLETED'
        }
      },
      include: {
        contractor: {
          select: { hourlyRate: true }
        }
      }
    });

    const totalRevenue = completedMatches.reduce((sum, match) => {
      return sum + ((match.contractor.hourlyRate || 0) * 8); // Assuming 8 hours per job
    }, 0);

    // Get conversion rate
    const conversionRate = totalServiceRequests > 0 
      ? (completedRequests / totalServiceRequests) * 100 
      : 0;

    // Get active contractors (verified)
    const activeContractors = await prisma.contractorProfile.count({
      where: { isVerified: true }
    });

    // Get pending contractors
    const pendingContractors = await prisma.contractorProfile.count({
      where: { isVerified: false }
    });

    // Get recent activity (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentUsers = await prisma.user.count({
      where: {
        createdAt: { gte: thirtyDaysAgo }
      }
    });

    const recentRequests = await prisma.serviceRequest.count({
      where: {
        createdAt: { gte: thirtyDaysAgo }
      }
    });

    const kpis = {
      totalRevenue: Math.round(totalRevenue),
      activeTenants: totalUsers,
      totalClients,
      totalContractors,
      activeContractors,
      pendingContractors,
      totalServiceRequests,
      completedRequests,
      conversionRate: Math.round(conversionRate * 10) / 10,
      recentUsers,
      recentRequests
    };

    return NextResponse.json({
      success: true,
      data: kpis
    });

  } catch (error) {
    console.error('Error fetching admin KPIs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch admin KPIs' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const user = await verifyAuth(request);
    
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Authentication required',
      }, { status: 401 });
    }
    
    // Check role-based access
    const allowedRoles = [UserRole.ADMIN, UserRole.TECHNICIAN, UserRole.CONTRACTOR];
    if (!hasRole(user.role as UserRole, allowedRoles)) {
      return NextResponse.json({
        success: false,
        message: 'Insufficient permissions',
      }, { status: 403 });
    }
    
    // Generate dashboard data based on role
    let dashboardData = {};
    
    switch (user.role) {
      case UserRole.ADMIN:
        dashboardData = {
          totalBookings: 156,
          activeJobs: 23,
          completedToday: 12,
          revenue: 45678.90,
          teamMembers: 8,
          alerts: 3,
          performanceScore: 94,
        };
        break;
        
      case UserRole.TECHNICIAN:
        dashboardData = {
          assignedJobs: 5,
          completedToday: 3,
          nextJob: {
            id: 'JOB-001',
            customer: 'John Smith',
            address: '123 Main St, Sydney NSW',
            time: '2:00 PM',
            type: 'Water Damage',
          },
          equipment: {
            checked: true,
            lastUpdated: new Date().toISOString(),
          },
        };
        break;
        
      case UserRole.CONTRACTOR:
        dashboardData = {
          activeJobs: 12,
          pendingInvoices: 3,
          totalRevenue: 23456.78,
          rating: 4.8,
          completionRate: 96,
        };
        break;
        
      default:
        dashboardData = {
          message: 'Limited dashboard access',
        };
    }
    
    return NextResponse.json({
      success: true,
      user: {
        userId: user.userId,
        email: user.email,
        role: user.role,
      },
      dashboard: dashboardData,
    }, { status: 200 });
    
  } catch (error) {
    console.error('Dashboard API error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Failed to load dashboard data',
    }, { status: 500 });
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorisation',
    },
  });
}
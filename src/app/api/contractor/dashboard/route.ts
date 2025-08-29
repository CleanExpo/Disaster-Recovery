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
    const allowedRoles = [UserRole.CONTRACTOR, UserRole.ADMIN];
    if (!hasRole(user.role as UserRole, allowedRoles)) {
      return NextResponse.json({
        success: false,
        message: 'Contractor access required',
      }, { status: 403 });
    }
    
    // Generate dashboard data based on user
    const dashboardData = {
      overview: {
        activeJobs: 12,
        completedThisMonth: 28,
        totalRevenue: 78540.50,
        averageRating: 4.8,
        nextJob: {
          id: 'JOB-2024-001',
          customer: 'Sarah Johnson',
          service: 'Water Damage Restoration',
          location: 'Brisbane CBD',
          scheduledTime: '2:00 PM Today',
          estimatedDuration: '3 hours',
          value: 2850.00,
        },
      },
      
      performance: {
        jobCompletionRate: 96,
        averageResponseTime: '28 minutes',
        customerSatisfaction: 94,
        repeatCustomerRate: 42,
        monthlyGrowth: 12.5,
      },
      
      recentJobs: [
        {
          id: 'JOB-2024-098',
          customer: 'Michael Chen',
          service: 'Mould Remediation',
          location: 'Gold Coast',
          completedAt: '2024-01-28T10:30:00Z',
          value: 3200.00,
          rating: 5,
          status: 'completed',
        },
        {
          id: 'JOB-2024-097',
          customer: 'Emma Williams',
          service: 'Fire Damage Restoration',
          location: 'Southbank',
          completedAt: '2024-01-27T15:45:00Z',
          value: 8500.00,
          rating: 5,
          status: 'completed',
        },
        {
          id: 'JOB-2024-096',
          customer: 'James Wilson',
          service: 'Storm Damage Repair',
          location: 'Toowong',
          completedAt: '2024-01-27T09:20:00Z',
          value: 4750.00,
          rating: 4,
          status: 'completed',
        },
      ],
      
      upcomingJobs: [
        {
          id: 'JOB-2024-101',
          customer: 'Lisa Anderson',
          service: 'Water Extraction',
          location: 'New Farm',
          scheduledTime: '2024-01-29T09:00:00Z',
          estimatedDuration: '2 hours',
          value: 1850.00,
          priority: 'urgent',
        },
        {
          id: 'JOB-2024-102',
          customer: 'David Thompson',
          service: 'Carpet Drying',
          location: 'West End',
          scheduledTime: '2024-01-29T14:00:00Z',
          estimatedDuration: '4 hours',
          value: 2200.00,
          priority: 'normal',
        },
      ],
      
      earnings: {
        today: 3850.00,
        thisWeek: 18500.00,
        thisMonth: 78540.50,
        lastMonth: 69850.00,
        pending: 12300.00,
        projectedMonthEnd: 92000.00,
      },
      
      inventory: {
        dehumidifiers: {
          available: 8,
          inUse: 4,
          maintenance: 1,
        },
        airMovers: {
          available: 12,
          inUse: 8,
          maintenance: 0,
        },
        moistureMeters: {
          available: 6,
          inUse: 2,
          maintenance: 0,
        },
        thermalCameras: {
          available: 2,
          inUse: 1,
          maintenance: 0,
        },
      },
      
      leads: {
        new: 5,
        accepted: 3,
        pending: 2,
        conversionRate: 68,
        averageValue: 3200.00,
      },
      
      calendar: {
        todayJobs: 3,
        tomorrowJobs: 4,
        weekJobs: 18,
        availability: [
          { date: '2024-01-29', slots: ['09:00', '11:00', '15:00'] },
          { date: '2024-01-30', slots: ['10:00', '14:00'] },
          { date: '2024-01-31', slots: ['09:00', '13:00', '16:00'] },
        ],
      },
      
      alerts: [
        {
          type: 'lead',
          message: 'New high-value lead in Brisbane CBD',
          time: '10 minutes ago',
          priority: 'high',
        },
        {
          type: 'inventory',
          message: 'Dehumidifier #DH-003 due for maintenance',
          time: '2 hours ago',
          priority: 'medium',
        },
        {
          type: 'payment',
          message: 'Payment received for JOB-2024-095',
          time: '3 hours ago',
          priority: 'low',
        },
      ],
    };
    
    return NextResponse.json({
      success: true,
      data: dashboardData,
      user: {
        id: user.userId,
        email: user.email,
        role: user.role,
      },
    }, { status: 200 });
    
  } catch (error) {
    console.error('Dashboard API error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Failed to load dashboard data',
    }, { status: 500 });
  }
}
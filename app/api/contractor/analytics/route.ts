import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import { handleAPIError, successResponse, APIError, getPaginationParams } from '@/lib/api-error-handler';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    
    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      throw new APIError('Contractor authentication required', 401);
    }
    
    const searchParams = request.nextUrl.searchParams;
    const period = searchParams.get('period') || '7d';
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    
    // Mock analytics data (in production, aggregate from database)
    const analytics = {
      overview: {
        totalLeads: 47,
        acceptedLeads: 42,
        conversionRate: 89.4,
        completedJobs: 38,
        activeJobs: 4,
        revenue: 156500.00,
        averageJobValue: 4118.42,
        rating: 4.8,
        totalReviews: 38
      },
      performance: {
        responseTime: {
          average: '45 minutes',
          fastest: '12 minutes',
          target: '60 minutes',
          onTimeRate: 95.2
        },
        completion: {
          average: '3.2 days',
          fastest: '4 hours',
          onScheduleRate: 92.1
        }
      },
      revenue: {
        current: 156500.00,
        previous: 142300.00,
        growth: 10.0,
        byCategory: [
          { category: 'Water Damage', amount: 67500, percentage: 43.1 },
          { category: 'Fire Damage', amount: 45200, percentage: 28.9 },
          { category: 'Mould Remediation', amount: 28300, percentage: 18.1 },
          { category: 'Other', amount: 15500, percentage: 9.9 }
        ]
      },
      trends: {
        daily: [
          { date: '2024-01-23', leads: 6, jobs: 5, revenue: 21500 },
          { date: '2024-01-24', leads: 8, jobs: 7, revenue: 28900 },
          { date: '2024-01-25', leads: 5, jobs: 4, revenue: 18200 },
          { date: '2024-01-26', leads: 7, jobs: 6, revenue: 24700 },
          { date: '2024-01-27', leads: 9, jobs: 8, revenue: 32100 },
          { date: '2024-01-28', leads: 6, jobs: 5, revenue: 19800 },
          { date: '2024-01-29', leads: 6, jobs: 3, revenue: 11300 }
        ]
      },
      locations: {
        topAreas: [
          { suburb: 'Brisbane CBD', jobs: 12, revenue: 48500 },
          { suburb: 'Milton', jobs: 8, revenue: 31200 },
          { suburb: 'Kangaroo Point', jobs: 6, revenue: 24800 },
          { suburb: 'New Farm', jobs: 5, revenue: 19500 },
          { suburb: 'West End', jobs: 4, revenue: 16200 }
        ],
        coverage: {
          primary: ['Brisbane CBD', 'Milton', 'Kangaroo Point'],
          secondary: ['New Farm', 'West End', 'South Brisbane'],
          total: 15
        }
      },
      feedback: {
        recent: [
          {
            customer: 'S. Johnson',
            rating: 5,
            comment: 'Excellent service, very professional',
            date: '2024-01-28'
          },
          {
            customer: 'D. Chen',
            rating: 4,
            comment: 'Good work, arrived on time',
            date: '2024-01-27'
          }
        ],
        sentiment: {
          positive: 89,
          neutral: 8,
          negative: 3
        }
      },
      period: period,
      generatedAt: new Date().toISOString()
    };
    
    return successResponse(analytics);
    
  } catch (error) {
    return handleAPIError(error);
  }
}
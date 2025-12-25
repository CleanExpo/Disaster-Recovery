import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleValidationError, handleUnexpectedError } from '@/lib/api-errors';
import { z, ZodError } from 'zod';

const tenantActionSchema = z.object({
  action: z.enum(['create_tenant', 'update_tenant', 'suspend_tenant', 'delete_tenant']),
  tenantId: z.string().optional(),
  data: z.any().optional()
});

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    // Mock tenant data
    const tenants = [
      {
        id: 'tenant-1',
        name: 'Restoration Pro Inc',
        domain: 'restorationpro.marketplace.com',
        industry: 'Water Damage Restoration',
        plan: 'Professional',
        status: 'active',
        createdAt: '2024-01-15',
        users: 45,
        requests: 234,
        revenue: 125000,
        customBranding: {
          primaryColor: '#00BFA6',
          secondaryColor: '#00A693',
          logo: '/logos/restoration-pro.png',
          favicon: '/favicons/restoration-pro.ico'
        },
        features: {
          leadScoring: true,
          advancedAnalytics: true,
          customDomain: true,
          whiteLabel: true,
          apiAccess: true
        },
        settings: {
          allowDirectContact: true,
          requireApproval: false,
          autoMatching: true,
          customFields: ['insurance_claim', 'property_type']
        }
      },
      {
        id: 'tenant-2',
        name: 'Elite Construction Services',
        domain: 'elite.marketplace.com',
        industry: 'Construction & Trades',
        plan: 'Enterprise',
        status: 'active',
        createdAt: '2024-02-20',
        users: 78,
        requests: 456,
        revenue: 289000,
        customBranding: {
          primaryColor: '#2563EB',
          secondaryColor: '#1D4ED8',
          logo: '/logos/elite-construction.png',
          favicon: '/favicons/elite-construction.ico'
        },
        features: {
          leadScoring: true,
          advancedAnalytics: true,
          customDomain: true,
          whiteLabel: true,
          apiAccess: true,
          customIntegrations: true
        },
        settings: {
          allowDirectContact: false,
          requireApproval: true,
          autoMatching: true,
          customFields: ['project_budget', 'timeline', 'permits_required']
        }
      },
      {
        id: 'tenant-3',
        name: 'Home Services Hub',
        domain: 'homeservices.marketplace.com',
        industry: 'Home Services',
        plan: 'Starter',
        status: 'trial',
        createdAt: '2024-03-10',
        users: 12,
        requests: 34,
        revenue: 8500,
        customBranding: {
          primaryColor: '#7C3AED',
          secondaryColor: '#6D28D9',
          logo: '/logos/home-services.png',
          favicon: '/favicons/home-services.ico'
        },
        features: {
          leadScoring: true,
          advancedAnalytics: false,
          customDomain: false,
          whiteLabel: false,
          apiAccess: false
        },
        settings: {
          allowDirectContact: true,
          requireApproval: false,
          autoMatching: true,
          customFields: []
        }
      }
    ];

    const tenantStats = {
      totalTenants: tenants.length,
      activeTenants: tenants.filter(t => t.status === 'active').length,
      trialTenants: tenants.filter(t => t.status === 'trial').length,
      totalUsers: tenants.reduce((sum, t) => sum + t.users, 0),
      totalRequests: tenants.reduce((sum, t) => sum + t.requests, 0),
      totalRevenue: tenants.reduce((sum, t) => sum + t.revenue, 0),
      averageUsersPerTenant: Math.round(tenants.reduce((sum, t) => sum + t.users, 0) / tenants.length),
      averageRevenuePerTenant: Math.round(tenants.reduce((sum, t) => sum + t.revenue, 0) / tenants.length)
    };

    return NextResponse.json({
      success: true,
      tenants,
      stats: tenantStats
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    const body = await request.json();
    const { action, data } = tenantActionSchema.parse(body);

    switch (action) {
      case 'create_tenant':
        return NextResponse.json({
          success: true,
          message: 'Tenant created successfully',
          tenant: {
            id: 'tenant-new',
            ...data,
            status: 'active',
            createdAt: new Date().toISOString()
          }
        });

      case 'update_tenant':
        return NextResponse.json({
          success: true,
          message: 'Tenant updated successfully'
        });

      case 'suspend_tenant':
        return NextResponse.json({
          success: true,
          message: 'Tenant suspended successfully'
        });

      case 'delete_tenant':
        return NextResponse.json({
          success: true,
          message: 'Tenant deleted successfully'
        });
    }

  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}

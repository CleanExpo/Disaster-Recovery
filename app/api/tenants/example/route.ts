import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { TenantService } from '@/lib/tenant-service';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

// Example endpoint to demonstrate creating different industry tenants
export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    // Require ADMIN role for creating example tenants
    if (!requireRole(authResult.context.user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    const { industry } = await request.json();

    const examples = {
      healthcare: {
        name: "HealthConnect",
        domain: "healthconnect.example.com",
        subdomain: "healthconnect",
        logo: "https://example.com/healthcare-logo.png",
        primaryColor: "#EF4444",
        secondaryColor: "#F59E0B",
        industry: "healthcare",
        customCss: `
          .header { background: linear-gradient(135deg, #EF4444, #F59E0B); }
          .button { border-radius: 25px; }
        `
      },
      legal: {
        name: "LegalMatch",
        domain: "legalmatch.example.com",
        subdomain: "legalmatch",
        logo: "https://example.com/legal-logo.png",
        primaryColor: "#3B82F6",
        secondaryColor: "#1E40AF",
        industry: "legal",
        customCss: `
          .header { background: linear-gradient(135deg, #3B82F6, #1E40AF); }
          .card { box-shadow: 0 4px 6px rgba(59, 130, 246, 0.1); }
        `
      },
      insurance: {
        name: "InsurancePro",
        domain: "insurancepro.example.com",
        subdomain: "insurancepro",
        logo: "https://example.com/insurance-logo.png",
        primaryColor: "#10B981",
        secondaryColor: "#059669",
        industry: "insurance",
        customCss: `
          .header { background: linear-gradient(135deg, #10B981, #059669); }
          .badge { background: #10B981; }
        `
      }
    };

    const tenantData = examples[industry as keyof typeof examples];
    if (!tenantData) {
      return createErrorResponse(
        ErrorCode.INVALID_INPUT,
        'Invalid industry. Use: healthcare, legal, or insurance',
        400
      );
    }

    const tenant = await TenantService.createTenant(tenantData);

    return NextResponse.json({
      message: `${industry} tenant created successfully`,
      tenant,
      demoUrl: `https://${tenantData.subdomain}.platform.com`
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

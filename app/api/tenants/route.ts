import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { TenantService } from '@/lib/tenant-service';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { z, ZodError } from 'zod';

const createTenantSchema = z.object({
  name: z.string().min(1),
  domain: z.string().optional(),
  subdomain: z.string().optional(),
  logo: z.string().url().optional(),
  primaryColor: z.string().optional(),
  secondaryColor: z.string().optional(),
  customCss: z.string().optional(),
  industry: z.string().optional(),
  configurations: z.array(z.object({
    key: z.string(),
    value: z.any(),
    type: z.enum(['string', 'boolean', 'number', 'json'])
  })).optional()
});

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    // Require ADMIN role for tenant creation
    if (!requireRole(authResult.context.user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    const body = await request.json();
    const data = createTenantSchema.parse(body);

    // Add default configurations based on industry
    const industry = data.industry || 'restoration';
    const defaultConfigs = TenantService.getDefaultIndustryConfigs(industry);

    // Merge configs with proper type assertion to fix TypeScript error
    const allConfigs = [
      ...(data.configurations || []).map(c => ({
        key: c.key,
        value: c.value ?? null,
        type: c.type
      })),
      ...defaultConfigs
    ];

    const tenant = await TenantService.createTenant({
      ...data,
      configurations: allConfigs
    });

    return NextResponse.json(tenant);
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const domain = searchParams.get('domain');
    const subdomain = searchParams.get('subdomain');

    if (domain) {
      const tenant = await TenantService.getTenantByDomain(domain);
      if (!tenant) {
        return createErrorResponse(
          ErrorCode.RESOURCE_NOT_FOUND,
          'Tenant not found',
          404
        );
      }
      return NextResponse.json(tenant);
    }

    if (subdomain) {
      const tenant = await TenantService.getTenantByDomain(subdomain);
      if (!tenant) {
        return createErrorResponse(
          ErrorCode.RESOURCE_NOT_FOUND,
          'Tenant not found',
          404
        );
      }
      return NextResponse.json(tenant);
    }

    return createErrorResponse(
      ErrorCode.MISSING_FIELDS,
      'Domain or subdomain parameter required',
      400
    );
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

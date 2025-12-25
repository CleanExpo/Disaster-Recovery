import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { TenantService } from '@/lib/tenant-service';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError } from '@/lib/api-errors';
import { z, ZodError } from 'zod';

const updateConfigSchema = z.object({
  key: z.string(),
  value: z.any(),
  type: z.enum(['string', 'boolean', 'number', 'json']).optional()
});

export async function PUT(
  request: NextRequest,
  { params }: { params: { tenantId: string } }
) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    // Require ADMIN role for config updates
    if (!requireRole(authResult.context.user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    const body = await request.json();
    const { key, value, type = 'string' } = updateConfigSchema.parse(body);

    await TenantService.updateTenantConfig(params.tenantId, key, value, type);

    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { tenantId: string } }
) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    // Require ADMIN role for viewing configs
    if (!requireRole(authResult.context.user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    const { searchParams } = new URL(request.url);
    const key = searchParams.get('key');

    if (key) {
      const value = await TenantService.getTenantConfig(params.tenantId, key);
      return NextResponse.json({ key, value });
    }

    const configs = await TenantService.getAllTenantConfigs(params.tenantId);
    return NextResponse.json(configs);
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

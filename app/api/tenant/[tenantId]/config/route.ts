import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { TenantService } from '@/lib/tenant-service';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export async function POST(
  request: NextRequest,
  { params }: { params: { tenantId: string } }
) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    // Require ADMIN role for tenant config updates
    if (!requireRole(authResult.context.user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    const { tenantId } = params;
    const { key, value } = await request.json();

    if (!key || value === undefined) {
      return createErrorResponse(
        ErrorCode.MISSING_FIELDS,
        'Key and value are required',
        400
      );
    }

    await TenantService.updateTenantConfig(tenantId, key, value);

    return NextResponse.json({ success: true });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

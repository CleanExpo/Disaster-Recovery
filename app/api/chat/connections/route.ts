import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['CLIENT'])) {
      return unauthorizedRoleResponse(['CLIENT']);
    }

    // NRPG keeps contractor identities private to clients. Direct in-app client → contractor messaging
    // is disabled; communications are mediated by NRPG operations.
    return NextResponse.json({
      directMessagingEnabled: false,
      connections: [],
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

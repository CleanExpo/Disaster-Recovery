import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';
import { EnhancedMatchingServiceV2 } from '@/lib/enhanced-matching-service-v2';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;

    const body = await request.json();
    const { serviceRequestId } = body;

    if (!serviceRequestId) {
      return NextResponse.json(
        { error: 'Service request ID is required' },
        { status: 400 }
      );
    }

    const matches = await EnhancedMatchingServiceV2.findMatchingContractorsForClient(
      serviceRequestId,
      body
    );

    return NextResponse.json({ success: true, data: matches });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

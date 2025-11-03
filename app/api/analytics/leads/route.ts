import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';
export const dynamic = 'force-dynamic';
import { LeadScoringService } from '@/lib/lead-scoring-service';

export async function GET(request: NextRequest) {
  try {
    // Authenticate request using Anthropic pattern
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    // TODO: Check if user is admin (you can implement proper admin check)
    // For now, we'll allow all authenticated users to see analytics

    const analytics = await LeadScoringService.getLeadScoringAnalytics();
    const highValueLeads = await LeadScoringService.getHighValueLeads(10);

    return NextResponse.json({
      success: true,
      analytics,
      highValueLeads
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
export const dynamic = 'force-dynamic';
import { LeadScoringService } from '@/lib/lead-scoring-service';

export async function GET(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Check if user is admin (you can implement proper admin check)
    // For now, we'll allow all authenticated users to see analytics

    const analytics = await LeadScoringService.getLeadScoringAnalytics();
    const highValueLeads = await LeadScoringService.getHighValueLeads(10);

    return NextResponse.json({
      success: true,
      analytics,
      highValueLeads
    });

  } catch (error) {
    console.error('Error getting lead analytics:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

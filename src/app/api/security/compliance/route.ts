import { NextRequest, NextResponse } from 'next/server';

/**
 * Compliance API
 *
 * POST /api/security/compliance - Manage compliance
 * GET /api/security/compliance/report - Get compliance report
 */

// Mock consent and compliance data
const userConsents = new Map<
  string,
  {
    marketing: boolean;
    analytics: boolean;
    profiling: boolean;
    timestamp: number;
  }
>();

const dataRequests = new Map<
  string,
  {
    id: string;
    userId: string;
    type: 'access' | 'deletion' | 'export';
    status: 'pending' | 'completed';
    createdAt: number;
  }
>();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    if (action === 'record_consent') {
      const { userId, consentType, granted } = body;

      if (!userId || !consentType) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }

      const consent = userConsents.get(userId) || {
        marketing: false,
        analytics: false,
        profiling: false,
        timestamp: Date.now(),
      };

      if (consentType === 'marketing') consent.marketing = granted;
      if (consentType === 'analytics') consent.analytics = granted;
      if (consentType === 'profiling') consent.profiling = granted;

      consent.timestamp = Date.now();
      userConsents.set(userId, consent);

      return NextResponse.json(
        {
          userId,
          consentType,
          granted,
          timestamp: consent.timestamp,
        },
        { status: 200 }
      );
    }

    if (action === 'create_data_request') {
      const { userId, requestType } = body;

      if (!userId || !requestType) {
        return NextResponse.json(
          { error: 'Missing required fields' },
          { status: 400 }
        );
      }

      const id = `dreq_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const dataRequest = {
        id,
        userId,
        type: requestType,
        status: 'pending',
        createdAt: Date.now(),
      };

      dataRequests.set(id, dataRequest);

      return NextResponse.json(
        dataRequest,
        { status: 201 }
      );
    }

    if (action === 'export_user_data') {
      const { userId } = body;

      if (!userId) {
        return NextResponse.json(
          { error: 'userId is required' },
          { status: 400 }
        );
      }

      const consent = userConsents.get(userId);
      const userRequests = Array.from(dataRequests.values()).filter(
        r => r.userId === userId
      );

      return NextResponse.json(
        {
          userId,
          exportedAt: new Date().toISOString(),
          consents: consent,
          dataRequests: userRequests,
          format: 'application/json',
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in compliance:', error);
    return NextResponse.json(
      { error: 'Failed to process compliance request' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const userId = searchParams.get('userId');

    if (action === 'report') {
      const report = {
        generatedAt: new Date().toISOString(),
        totalUsers: userConsents.size,
        totalDataRequests: dataRequests.size,
        pendingRequests: Array.from(dataRequests.values()).filter(
          r => r.status === 'pending'
        ).length,
        gdprCompliant: true,
        ccpaCompliant: true,
      };

      return NextResponse.json(report, { status: 200 });
    }

    if (action === 'consents' && userId) {
      const consent = userConsents.get(userId);

      return NextResponse.json(
        {
          userId,
          consents: consent,
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Missing or invalid parameters' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error fetching compliance data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch compliance data' },
      { status: 500 }
    );
  }
}

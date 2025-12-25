/**
 * Anomaly Detection API
 *
 * Detect and report anomalies
 */

import { NextRequest, NextResponse } from 'next/server';
import { anomalyDetector } from '@/lib/ai/anomaly-detector';

/**
 * GET /api/ai/anomalies
 *
 * Get detected anomalies
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const entityId = searchParams.get('entityId');
    const entityType = (searchParams.get('entityType') as 'user' | 'room' | 'system') || 'user';
    const type = searchParams.get('type') || 'all'; // all | detect

    if (!entityId && entityType !== 'system') {
      return NextResponse.json(
        { error: 'Missing required parameter: entityId' },
        { status: 400 }
      );
    }

    let result;

    if (type === 'detect') {
      // Run fresh detection
      if (entityType === 'user') {
        result = anomalyDetector.detectUserAnomalies(entityId || '');
      } else if (entityType === 'room') {
        result = anomalyDetector.detectRoomAnomalies(entityId || '');
      } else {
        result = anomalyDetector.detectSystemAnomalies();
      }
    } else {
      // Get all anomalies (return type depends on entityType)
      const anomalies = anomalyDetector.getAllAnomalies(entityType);
      return NextResponse.json({ success: true, anomalies });
    }

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Anomaly detection error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to detect anomalies',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/ai/anomalies
 *
 * Establish baseline or clear old anomalies
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId, hoursOld } = body; // action: baseline | cleanup

    if (action === 'baseline' && userId) {
      anomalyDetector.establishBaseline(userId);
      return NextResponse.json({
        success: true,
        message: 'Baseline established for user',
      });
    }

    if (action === 'cleanup') {
      const removed = anomalyDetector.clearOldAnomalies(hoursOld || 24);
      return NextResponse.json({
        success: true,
        message: `Cleaned up ${removed} old anomalies`,
      });
    }

    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error) {
    console.error('Anomaly operation error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to perform operation',
      },
      { status: 500 }
    );
  }
}

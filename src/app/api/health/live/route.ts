import { NextRequest, NextResponse } from 'next/server';
import { HealthCheckService } from '@/lib/health/health-checks';

/**
 * GET /api/health/live
 *
 * Kubernetes liveness probe
 * Returns 200 if service process is alive
 */
export async function GET(req: NextRequest) {
  try {
    const liveness = await HealthCheckService.getLiveness();

    const statusCode = liveness.alive ? 200 : 503;

    return NextResponse.json(liveness, { status: statusCode });
  } catch (error) {
    console.error('Liveness check failed:', error);
    return NextResponse.json(
      {
        alive: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}

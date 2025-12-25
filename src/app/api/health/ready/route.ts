import { NextRequest, NextResponse } from 'next/server';
import { HealthCheckService } from '@/lib/health/health-checks';

/**
 * GET /api/health/ready
 *
 * Kubernetes readiness probe
 * Returns 200 if service is ready to accept traffic
 */
export async function GET(req: NextRequest) {
  try {
    const readiness = await HealthCheckService.getReadiness();

    const statusCode = readiness.ready ? 200 : 503;

    return NextResponse.json(readiness, { status: statusCode });
  } catch (error) {
    console.error('Readiness check failed:', error);
    return NextResponse.json(
      {
        ready: false,
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}

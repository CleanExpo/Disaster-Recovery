import { NextRequest, NextResponse } from 'next/server';
import { HealthCheckService } from '@/lib/health/health-checks';

/**
 * GET /api/health
 *
 * Full health check endpoint
 */
export async function GET(req: NextRequest) {
  try {
    const health = await HealthCheckService.getFullHealth();

    // Return appropriate status code based on health
    const statusCode =
      health.status === 'healthy' ? 200 : health.status === 'degraded' ? 200 : 503;

    return NextResponse.json(health, { status: statusCode });
  } catch (error) {
    console.error('Health check failed:', error);
    return NextResponse.json(
      {
        status: 'unhealthy',
        message: 'Health check failed',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 503 }
    );
  }
}

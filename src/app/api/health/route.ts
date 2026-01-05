import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import Redis from 'ioredis';
import { logError } from '@/lib/logger/helpers';

const prisma = new PrismaClient();

export async function GET() {
  const health = {
    status: 'ok',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      database: 'unknown',
      redis: 'unknown',
    },
  };

  // Test database connection
  try {
    await prisma.$queryRaw`SELECT 1`;
    health.services.database = 'connected';
  } catch (error) {
    health.services.database = 'disconnected';
    health.status = 'degraded';
    logError(error, { context: 'health_check_database' });
  }

  // Test Redis connection (if configured)
  if (process.env.REDIS_URL) {
    try {
      const redis = new Redis(process.env.REDIS_URL, {
        tls: process.env.REDIS_URL.startsWith('rediss://') 
          ? { rejectUnauthorized: false } 
          : undefined,
        connectTimeout: 5000,
        maxRetriesPerRequest: 1,
      });
      
      await redis.ping();
      health.services.redis = 'connected';
      await redis.quit();
    } catch (error) {
      health.services.redis = 'disconnected';
      health.status = 'degraded';
      logError(error, { context: 'health_check_redis' });
    }
  } else {
    health.services.redis = 'not_configured';
  }

  // Close Prisma connection
  await prisma.$disconnect();

  return NextResponse.json(health, {
    status: health.status === 'ok' ? 200 : 503,
    headers: {
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

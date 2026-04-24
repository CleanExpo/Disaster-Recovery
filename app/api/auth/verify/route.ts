import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/jwt-auth';
import { requestLogger } from '@/lib/observability';

export async function GET(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/auth/verify' });
  try {
    const user = await verifyAuth(request);
    
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Not authenticated' }, { status: 401 });
    }
    
    return NextResponse.json({
      success: true,
      user: {
        userId: user.userId,
        email: user.email,
        role: user.role,
        permissions: user.permissions } }, { status: 200 });
    
  } catch (error) {
    log.error('auth verification error', { error: error instanceof Error ? error.message : String(error) });

    return NextResponse.json({
      success: false,
      message: 'Invalid or expired token' }, { status: 401 });
  }
}


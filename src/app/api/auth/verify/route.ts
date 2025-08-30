import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth } from '@/lib/jwt-auth';

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Not authenticated',
      }, { status: 401 });
    }
    
    return NextResponse.json({
      success: true,
      user: {
        userId: user.userId,
        email: user.email,
        role: user.role,
        permissions: user.permissions,
      },
    }, { status: 200 });
    
  } catch (error) {
    console.error('Auth verification error:', error);
    
    return NextResponse.json({
      success: false,
      message: 'Invalid or expired token',
    }, { status: 401 });
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorisation',
    },
  });
}
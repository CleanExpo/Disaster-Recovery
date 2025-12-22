/**
 * Socket.io Initialization Endpoint
 *
 * Initialize WebSocket server for real-time communications
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  createSocketServer,
  getSocketServer,
  getConnectionStats,
} from '@/lib/socket/server';

/**
 * POST /api/socket/init
 *
 * Initialize Socket.io server if not already running
 */
export async function POST(request: NextRequest) {
  try {
    // Check if server is already running
    const existing = getSocketServer();

    if (existing) {
      return NextResponse.json({
        success: true,
        message: 'Socket.io server already initialized',
        stats: getConnectionStats(),
      });
    }

    // Create new server
    const io = createSocketServer({
      cors: {
        origin: process.env.NEXT_PUBLIC_SOCKET_CORS_ORIGIN
          ? process.env.NEXT_PUBLIC_SOCKET_CORS_ORIGIN.split(',')
          : 'http://localhost:3000',
        methods: ['GET', 'POST'],
        credentials: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Socket.io server initialized',
        stats: getConnectionStats(),
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Socket.io initialization error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to initialize Socket.io',
      },
      { status: 500 }
    );
  }
}

/**
 * GET /api/socket/init
 *
 * Get Socket.io server status
 */
export async function GET(request: NextRequest) {
  try {
    const server = getSocketServer();

    if (!server) {
      return NextResponse.json(
        {
          success: false,
          message: 'Socket.io server not initialized',
        },
        { status: 503 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Socket.io server is running',
      stats: getConnectionStats(),
    });
  } catch (error) {
    console.error('Socket.io status check error:', error);

    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to check Socket.io status',
      },
      { status: 500 }
    );
  }
}

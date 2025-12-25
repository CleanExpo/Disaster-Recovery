import { createServer } from 'http';
import { SocketServer } from './socket-server';
import type { Server as HttpServer } from 'http';

/**
 * Global reference to HTTP server instance
 */
let httpServer: HttpServer | null = null;

/**
 * Initialize the WebSocket server
 *
 * This function should be called once when the Next.js server starts.
 * It creates an HTTP server and initializes Socket.io on it.
 */
export async function initializeWebSocketServer(port: number = 3001): Promise<HttpServer> {
  if (httpServer) {
    console.log('WebSocket server already initialized');
    return httpServer;
  }

  try {
    // Create HTTP server for WebSocket
    httpServer = createServer();

    // Initialize Socket.io on the HTTP server
    const socketServer = await SocketServer.initialize(httpServer);

    // Start listening
    httpServer.listen(port, () => {
      console.log(`WebSocket server listening on port ${port}`);
    });

    // Handle server errors
    httpServer.on('error', (error) => {
      console.error('HTTP server error:', error);
    });

    return httpServer;
  } catch (error) {
    console.error('Failed to initialize WebSocket server:', error);
    throw error;
  }
}

/**
 * Get the HTTP server instance
 */
export function getHttpServer(): HttpServer | null {
  return httpServer;
}

/**
 * Gracefully shutdown the WebSocket server
 */
export async function shutdownWebSocketServer(): Promise<void> {
  if (httpServer) {
    await SocketServer.shutdown();
    httpServer.close(() => {
      console.log('HTTP server closed');
      httpServer = null;
    });
  }
}

/**
 * For Next.js, we need to attach Socket.io to the existing Next.js server
 * This is typically done through a custom server (next.config.js with custom server)
 * or by using Next.js 13+ with the app directory and API routes
 *
 * Alternative approach for serverless deployment:
 * Use Socket.io with a Redis adapter for horizontal scaling
 * and attach to Next.js API routes using socket.io-handler package
 */

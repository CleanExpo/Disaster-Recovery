import 'express-async-errors';
import express, { Application } from 'express';
import { createServer } from 'http';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Load environment variables
dotenv.config();

// Import utilities and middleware
import logger from '@/config/logger';
import { initializeSecurity } from '@/middleware/security';
import { globalErrorHandler, notFoundHandler, handleUnhandledRejection, handleUncaughtException } from '@/middleware/errorHandler';
import WebSocketService from '@/utils/websocket';
import cache from '@/utils/cache';

// Import routes
import contractorRoutes from '@/routes/contractors';

// Import services for initialization
import prisma from '@/config/database';

class CRMCoreServer {
  private app: Application;
  private server: any;
  private webSocketService: WebSocketService | null = null;
  private port: number;

  constructor() {
    this.app = express();
    this.port = parseInt(process.env.PORT || '3001');
    
    this.initializeMiddleware();
    this.initializeRoutes();
    this.initializeErrorHandling();
  }

  /**
   * Initialize middleware
   */
  private initializeMiddleware(): void {
    // Trust proxy for accurate client IPs
    this.app.set('trust proxy', 1);

    // Security middleware
    const securityMiddleware = initializeSecurity();
    securityMiddleware.forEach(middleware => {
      this.app.use(middleware);
    });

    // Body parsers
    this.app.use(express.json({ 
      limit: process.env.MAX_REQUEST_SIZE || '10mb',
      verify: (req, res, buf) => {
        // Store raw body for webhook verification if needed
        (req as any).rawBody = buf;
      }
    }));
    this.app.use(express.urlencoded({ 
      extended: true, 
      limit: process.env.MAX_REQUEST_SIZE || '10mb' 
    }));

    logger.info('Middleware initialized');
  }

  /**
   * Initialize API routes
   */
  private initializeRoutes(): void {
    const apiPrefix = process.env.API_PREFIX || '/api/v1';

    // Health check endpoint
    this.app.get('/health', (req, res) => {
      res.json({
        success: true,
        message: 'NRP CRM Core is running',
        timestamp: new Date().toISOString(),
        version: process.env.npm_package_version || '1.0.0',
        environment: process.env.NODE_ENV || 'development',
      });
    });

    // Health check with dependencies
    this.app.get('/health/detailed', async (req, res) => {
      try {
        // Check database connection
        const dbStart = Date.now();
        await prisma.$queryRaw`SELECT 1`;
        const dbLatency = Date.now() - dbStart;

        // Check cache connection
        const cacheHealth = await cache.health();

        res.json({
          success: true,
          timestamp: new Date().toISOString(),
          version: process.env.npm_package_version || '1.0.0',
          environment: process.env.NODE_ENV || 'development',
          services: {
            database: {
              status: 'healthy',
              latency: `${dbLatency}ms`,
            },
            cache: {
              status: cacheHealth.connected ? 'healthy' : 'unhealthy',
              latency: cacheHealth.latency ? `${cacheHealth.latency}ms` : 'unknown',
            },
            websocket: {
              status: this.webSocketService ? 'healthy' : 'disabled',
              connectedUsers: this.webSocketService?.getConnectedUsersCount() || 0,
            },
          },
        });
      } catch (error) {
        logger.error('Health check failed:', error);
        res.status(503).json({
          success: false,
          message: 'Service unhealthy',
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    });

    // API routes
    this.app.use(`${apiPrefix}/contractors`, contractorRoutes);

    // API documentation route
    this.app.get(`${apiPrefix}/docs`, (req, res) => {
      res.json({
        success: true,
        message: 'NRP CRM Core API Documentation',
        endpoints: {
          contractors: {
            'POST /contractors': 'Create new contractor',
            'GET /contractors': 'List contractors with pagination and filtering',
            'GET /contractors/:id': 'Get contractor by ID',
            'PUT /contractors/:id': 'Update contractor',
            'DELETE /contractors/:id': 'Delete contractor (soft delete)',
            'GET /contractors/search': 'Search contractors',
            'GET /contractors/service-area/:postcode': 'Get contractors by service area',
            'GET /contractors/statistics': 'Get contractor statistics',
            'GET /contractors/me': 'Get current contractor profile',
            'PUT /contractors/me': 'Update current contractor profile',
            'PUT /contractors/:id/performance': 'Update performance metrics',
            'PUT /contractors/:id/territories': 'Update service territories',
            'POST /contractors/:id/verify': 'Verify contractor',
            'POST /contractors/:id/approve': 'Approve contractor',
            'POST /contractors/:id/suspend': 'Suspend contractor',
          },
        },
        authentication: 'Bearer token required for most endpoints',
        rateLimit: '100 requests per 15 minutes per IP',
      });
    });

    // Root endpoint
    this.app.get('/', (req, res) => {
      res.json({
        success: true,
        message: 'Welcome to NRP CRM Core API',
        version: process.env.npm_package_version || '1.0.0',
        documentation: `${req.protocol}://${req.get('host')}${apiPrefix}/docs`,
        health: `${req.protocol}://${req.get('host')}/health`,
      });
    });

    logger.info('Routes initialized', { apiPrefix });
  }

  /**
   * Initialize error handling
   */
  private initializeErrorHandling(): void {
    // 404 handler
    this.app.use(notFoundHandler);

    // Global error handler
    this.app.use(globalErrorHandler);

    // Handle unhandled rejections and uncaught exceptions
    handleUnhandledRejection();
    handleUncaughtException();

    logger.info('Error handling initialized');
  }

  /**
   * Initialize WebSocket server
   */
  private initializeWebSocket(): void {
    if (this.server) {
      this.webSocketService = new WebSocketService(this.server);
      logger.info('WebSocket service initialized');
    } else {
      logger.warn('Cannot initialize WebSocket service: HTTP server not created');
    }
  }

  /**
   * Test database connection
   */
  private async testDatabaseConnection(): Promise<void> {
    try {
      await prisma.$connect();
      logger.info('Database connection established');
      
      // Test query
      const result = await prisma.$queryRaw`SELECT current_database(), current_user`;
      logger.info('Database connectivity test passed', { result });
    } catch (error) {
      logger.error('Database connection failed:', error);
      throw new Error('Failed to connect to database');
    }
  }

  /**
   * Test cache connection
   */
  private async testCacheConnection(): Promise<void> {
    try {
      const health = await cache.health();
      if (health.connected) {
        logger.info('Cache connection established', { 
          latency: health.latency ? `${health.latency}ms` : 'unknown' 
        });
      } else {
        logger.warn('Cache connection failed - continuing without cache');
      }
    } catch (error) {
      logger.warn('Cache connection error - continuing without cache:', error);
    }
  }

  /**
   * Start the server
   */
  public async start(): Promise<void> {
    try {
      logger.info('Starting NRP CRM Core server...');

      // Test database connection
      await this.testDatabaseConnection();

      // Test cache connection
      await this.testCacheConnection();

      // Create HTTP server
      this.server = createServer(this.app);

      // Initialize WebSocket
      this.initializeWebSocket();

      // Start listening
      this.server.listen(this.port, process.env.HOST || '0.0.0.0', () => {
        logger.info(`Server started successfully`, {
          port: this.port,
          host: process.env.HOST || '0.0.0.0',
          environment: process.env.NODE_ENV || 'development',
          processId: process.pid,
        });

        // Log startup summary
        logger.info('Startup summary', {
          apiPrefix: process.env.API_PREFIX || '/api/v1',
          corsOrigins: process.env.CORS_ORIGIN?.split(',') || ['http://localhost:3000'],
          rateLimiting: '100 requests per 15 minutes',
          webSocket: this.webSocketService ? 'enabled' : 'disabled',
          caching: 'Redis with fallback',
          database: 'PostgreSQL with Prisma ORM',
        });
      });

      // Handle server shutdown gracefully
      this.setupGracefulShutdown();

    } catch (error) {
      logger.error('Failed to start server:', error);
      process.exit(1);
    }
  }

  /**
   * Setup graceful shutdown
   */
  private setupGracefulShutdown(): void {
    const gracefulShutdown = async (signal: string) => {
      logger.info(`Received ${signal}, starting graceful shutdown...`);

      // Stop accepting new connections
      if (this.server) {
        this.server.close(async () => {
          logger.info('HTTP server closed');

          try {
            // Shutdown WebSocket service
            if (this.webSocketService) {
              await this.webSocketService.shutdown();
            }

            // Disconnect from database
            await prisma.$disconnect();
            logger.info('Database disconnected');

            // Disconnect from cache
            await cache.disconnect();
            logger.info('Cache disconnected');

            logger.info('Graceful shutdown completed');
            process.exit(0);
          } catch (error) {
            logger.error('Error during graceful shutdown:', error);
            process.exit(1);
          }
        });

        // Force shutdown after timeout
        setTimeout(() => {
          logger.error('Graceful shutdown timed out, forcing exit');
          process.exit(1);
        }, 30000); // 30 seconds timeout
      }
    };

    process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
    process.on('SIGINT', () => gracefulShutdown('SIGINT'));
  }

  /**
   * Get Express app instance
   */
  public getApp(): Application {
    return this.app;
  }

  /**
   * Get WebSocket service instance
   */
  public getWebSocketService(): WebSocketService | null {
    return this.webSocketService;
  }
}

// Create and start server
const server = new CRMCoreServer();

// Start server only if this file is run directly (not imported)
if (require.main === module) {
  server.start().catch((error) => {
    logger.error('Server startup failed:', error);
    process.exit(1);
  });
}

export default server;
export { CRMCoreServer };
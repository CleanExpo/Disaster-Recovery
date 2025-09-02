import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { Server } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import winston from 'winston';
import { notificationConfig } from './config/twilio';
import { getQueueManager } from './utils/queue';
import { LeadDistributionService } from './services/LeadDistributionService';
import { NotificationService } from './services/NotificationService';
import leadRoutes from './routes/leads';

// Load environment variables
dotenv.config();

// Initialize logger
const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: { service: 'lead-distribution-service' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.simple()
      )
    })
  ]
});

// Express app setup
const app = express();
const PORT = process.env.PORT || 3003;

// Middleware
app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));

app.use(cors({
  origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: process.env.NODE_ENV === 'production' ? 100 : 1000, // Limit each IP
  message: {
    success: false,
    error: 'Too many requests, please try again later'
  },
  standardHeaders: true,
  legacyHeaders: false
});

app.use(limiter);

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const health = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      service: 'lead-distribution',
      version: process.env.npm_package_version || '1.0.0',
      environment: process.env.NODE_ENV || 'development',
      checks: {
        database: 'checking',
        queue: 'checking',
        notifications: 'checking'
      }
    };

    // Check MongoDB connection
    try {
      await mongoose.connection.db.admin().ping();
      health.checks.database = 'healthy';
    } catch (error) {
      health.checks.database = 'unhealthy';
      health.status = 'degraded';
    }

    // Check RabbitMQ connection
    try {
      const queueManager = getQueueManager();
      if (queueManager.isConnectionOpen()) {
        health.checks.queue = 'healthy';
      } else {
        health.checks.queue = 'unhealthy';
        health.status = 'degraded';
      }
    } catch (error) {
      health.checks.queue = 'unhealthy';
      health.status = 'degraded';
    }

    // Check notification services
    try {
      const connectivity = await notificationConfig.testConnectivity();
      if (connectivity.twilio.connected && connectivity.sendgrid.connected) {
        health.checks.notifications = 'healthy';
      } else {
        health.checks.notifications = 'degraded';
        if (health.status === 'healthy') health.status = 'degraded';
      }
    } catch (error) {
      health.checks.notifications = 'unhealthy';
      health.status = 'degraded';
    }

    const statusCode = health.status === 'healthy' ? 200 : 
                       health.status === 'degraded' ? 200 : 503;

    res.status(statusCode).json(health);
  } catch (error) {
    logger.error('Health check failed', { error });
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: 'Health check failed'
    });
  }
});

// API info endpoint
app.get('/info', (req, res) => {
  res.json({
    name: 'NRP Lead Distribution Service',
    version: process.env.npm_package_version || '1.0.0',
    description: 'Intelligent lead distribution microservice for NRP CRM',
    environment: process.env.NODE_ENV || 'development',
    author: 'NRP Development Team',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/health',
      leads: '/api/leads',
      websocket: '/socket.io'
    }
  });
});

// API Routes
app.use('/api/leads', leadRoutes);

// WebSocket status endpoint
app.get('/ws-status', (req, res) => {
  res.json({
    websocketEnabled: !!io,
    connectedClients: io ? io.engine.clientsCount : 0,
    namespace: '/',
    timestamp: new Date().toISOString()
  });
});

// Global error handler
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error('Unhandled error', {
    error: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip
  });

  res.status(500).json({
    success: false,
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not found',
    message: `Route ${req.method} ${req.originalUrl} not found`
  });
});

// Create HTTP server
const server = new Server(app);

// Initialize Socket.IO for real-time updates
const io = new SocketIOServer(server, {
  cors: {
    origin: process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3001'],
    methods: ['GET', 'POST']
  },
  transports: ['websocket', 'polling']
});

// Socket.IO connection handling
io.on('connection', (socket) => {
  logger.info('Client connected', {
    socketId: socket.id,
    clientsCount: io.engine.clientsCount
  });

  // Join lead-specific rooms for targeted updates
  socket.on('joinLead', (leadId: string) => {
    if (leadId && typeof leadId === 'string') {
      socket.join(`lead:${leadId}`);
      logger.debug('Client joined lead room', { socketId: socket.id, leadId });
    }
  });

  // Leave lead-specific rooms
  socket.on('leaveLead', (leadId: string) => {
    if (leadId && typeof leadId === 'string') {
      socket.leave(`lead:${leadId}`);
      logger.debug('Client left lead room', { socketId: socket.id, leadId });
    }
  });

  // Join contractor-specific rooms
  socket.on('joinContractor', (contractorId: string) => {
    if (contractorId && typeof contractorId === 'string') {
      socket.join(`contractor:${contractorId}`);
      logger.debug('Client joined contractor room', { socketId: socket.id, contractorId });
    }
  });

  // Handle disconnection
  socket.on('disconnect', (reason) => {
    logger.info('Client disconnected', {
      socketId: socket.id,
      reason,
      clientsCount: io.engine.clientsCount - 1
    });
  });

  // Handle errors
  socket.on('error', (error) => {
    logger.error('Socket error', {
      socketId: socket.id,
      error: error.message
    });
  });
});

// Global services
let distributionService: LeadDistributionService;
let notificationService: NotificationService;
let queueManager: any;

// Database connection
async function connectDatabase(): Promise<void> {
  try {
    const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/nrp-leads';
    
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    });

    logger.info('Connected to MongoDB', {
      database: mongoose.connection.db.databaseName,
      host: mongoose.connection.host,
      port: mongoose.connection.port
    });

    // Set up database event listeners
    mongoose.connection.on('error', (error) => {
      logger.error('MongoDB connection error', { error });
    });

    mongoose.connection.on('disconnected', () => {
      logger.warn('MongoDB disconnected');
    });

    mongoose.connection.on('reconnected', () => {
      logger.info('MongoDB reconnected');
    });

  } catch (error) {
    logger.error('Failed to connect to MongoDB', { error });
    throw error;
  }
}

// Initialize services
async function initializeServices(): Promise<void> {
  try {
    // Initialize queue manager
    queueManager = getQueueManager();
    await queueManager.connect();
    logger.info('Queue manager connected');

    // Initialize notification service
    notificationService = new NotificationService();
    
    // Start processing queued notifications
    await notificationService.processQueuedSmsNotifications();
    await notificationService.processQueuedEmailNotifications();
    logger.info('Notification service initialized and processing queues');

    // Initialize distribution service with Socket.IO
    distributionService = new LeadDistributionService({
      maxContractorsPerLead: parseInt(process.env.MAX_CONTRACTORS_PER_LEAD || '5'),
      distributionMethod: (process.env.DISTRIBUTION_METHOD as any) || 'tier-based',
      expirationMinutes: parseInt(process.env.LEAD_EXPIRATION_MINUTES || '60'),
      autoRetryOnDecline: process.env.AUTO_RETRY_ON_DECLINE !== 'false',
      maxRetryAttempts: parseInt(process.env.MAX_RETRY_ATTEMPTS || '3'),
      retryDelayMinutes: parseInt(process.env.RETRY_DELAY_MINUTES || '15')
    }, io);

    logger.info('Lead distribution service initialized');

    // Log configuration summary
    notificationConfig.logConfigSummary();

  } catch (error) {
    logger.error('Failed to initialize services', { error });
    throw error;
  }
}

// Graceful shutdown
async function gracefulShutdown(signal: string): Promise<void> {
  logger.info(`Received ${signal}, starting graceful shutdown...`);

  try {
    // Close HTTP server
    server.close(() => {
      logger.info('HTTP server closed');
    });

    // Close Socket.IO server
    io.close(() => {
      logger.info('Socket.IO server closed');
    });

    // Close services
    if (distributionService) {
      await distributionService.close();
      logger.info('Distribution service closed');
    }

    if (notificationService) {
      await notificationService.close();
      logger.info('Notification service closed');
    }

    if (queueManager) {
      await queueManager.close();
      logger.info('Queue manager closed');
    }

    // Close database connection
    await mongoose.connection.close();
    logger.info('Database connection closed');

    logger.info('Graceful shutdown completed');
    process.exit(0);

  } catch (error) {
    logger.error('Error during shutdown', { error });
    process.exit(1);
  }
}

// Process event handlers
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', { error });
  gracefulShutdown('uncaughtException');
});
process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection', { reason, promise });
  gracefulShutdown('unhandledRejection');
});

// Start server
async function startServer(): Promise<void> {
  try {
    logger.info('Starting NRP Lead Distribution Service...', {
      port: PORT,
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0'
    });

    // Connect to database
    await connectDatabase();

    // Initialize services
    await initializeServices();

    // Start HTTP server
    server.listen(PORT, () => {
      logger.info('Lead Distribution Service is running', {
        port: PORT,
        environment: process.env.NODE_ENV || 'development',
        pid: process.pid,
        endpoints: {
          health: `http://localhost:${PORT}/health`,
          api: `http://localhost:${PORT}/api/leads`,
          websocket: `http://localhost:${PORT}/socket.io`
        }
      });

      // Log resource usage
      const usage = process.memoryUsage();
      logger.info('Memory usage', {
        rss: `${Math.round(usage.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(usage.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(usage.heapUsed / 1024 / 1024)} MB`,
        external: `${Math.round(usage.external / 1024 / 1024)} MB`
      });
    });

  } catch (error) {
    logger.error('Failed to start server', { error });
    process.exit(1);
  }
}

// Export for testing
export { app, server, io };

// Start the server if this file is run directly
if (require.main === module) {
  startServer();
}
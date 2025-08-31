/**
 * Integrated Orchestrator - Main entry point for Docker Claude system
 * Combines routing, processing, and API management
 */

import express from 'express';
import { Server } from 'socket.io';
import { RequestRouter } from './request-router';
import { v4 as uuidv4 } from 'uuid';
import chalk from 'chalk';
import cors from 'cors';

class IntegratedOrchestrator {
  private app: express.Application;
  private io: Server;
  private router: RequestRouter;
  private server: any;

  constructor() {
    this.app = express();
    this.router = new RequestRouter();
    this.setupExpress();
    this.setupWebSocket();
    this.setupRouterEvents();
  }

  /**
   * Set up Express server
   */
  private setupExpress() {
    // Middleware
    this.app.use(cors());
    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true }));

    // Health check
    this.app.get('/health', async (req, res) => {
      const stats = await this.router.getStatistics();
      res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        statistics: stats,
        apiEnabled: process.env.ENABLE_REAL_API === 'true'
      });
    });

    // Submit prompt for processing
    this.app.post('/process', async (req, res) => {
      const { prompt, type, priority, context } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const requestId = uuidv4();
      
      try {
        const response = await this.router.route({
          id: requestId,
          prompt,
          type,
          priority: priority || 5,
          context: context || {}
        });

        res.json(response);
      } catch (error: any) {
        res.status(500).json({ 
          error: error.message,
          requestId 
        });
      }
    });

    // Get request status
    this.app.get('/status/:requestId', async (req, res) => {
      const status = await this.router.getRequestStatus(req.params.requestId);
      
      if (!status) {
        return res.status(404).json({ error: 'Request not found' });
      }
      
      res.json(status);
    });

    // Cancel request
    this.app.delete('/cancel/:requestId', async (req, res) => {
      const cancelled = await this.router.cancelRequest(req.params.requestId);
      res.json({ cancelled });
    });

    // Get statistics
    this.app.get('/stats', async (req, res) => {
      const stats = await this.router.getStatistics();
      res.json(stats);
    });

    // Batch processing
    this.app.post('/batch', async (req, res) => {
      const { requests } = req.body;
      
      if (!Array.isArray(requests)) {
        return res.status(400).json({ error: 'Requests must be an array' });
      }

      const processedRequests = requests.map(r => ({
        id: uuidv4(),
        prompt: r.prompt,
        type: r.type,
        priority: r.priority || 5,
        context: r.context || {}
      }));

      try {
        const responses = await this.router.batchRoute(processedRequests);
        res.json(responses);
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    });

    // Direct Claude API call (bypass queue)
    this.app.post('/direct', async (req, res) => {
      const { prompt, systemPrompt, maxTokens, temperature } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      // This would use the API client directly for immediate response
      // Useful for real-time interactions
      res.json({
        message: 'Direct API call would be processed here',
        note: 'Requires API key configuration'
      });
    });

    // Legacy /task endpoint for compatibility
    this.app.post('/task', async (req, res) => {
      const { type, input, context, priority } = req.body;
      
      const requestId = uuidv4();
      
      try {
        const response = await this.router.route({
          id: requestId,
          prompt: input,
          type,
          priority: priority || 5,
          context: context || {}
        });

        res.json({ 
          taskId: requestId,
          status: response.status 
        });
      } catch (error: any) {
        res.status(500).json({ error: error.message });
      }
    });

    // Legacy /task/:id endpoint
    this.app.get('/task/:id', async (req, res) => {
      const status = await this.router.getRequestStatus(req.params.id);
      
      if (!status) {
        return res.status(404).json({ error: 'Task not found' });
      }
      
      res.json({
        id: status.requestId,
        status: status.status,
        result: status.result,
        error: status.error
      });
    });
  }

  /**
   * Set up WebSocket for real-time updates
   */
  private setupWebSocket() {
    this.server = this.app.listen(
      parseInt(process.env.ORCHESTRATOR_PORT || '3000'),
      process.env.ORCHESTRATOR_HOST || '0.0.0.0',
      () => {
        console.log(chalk.green(`
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║     🤖 Claude Orchestrator with Claude 3.5 Haiku         ║
║                                                            ║
║     Status: RUNNING                                        ║
║     Port: ${process.env.ORCHESTRATOR_PORT || '3000'}                                     ║
║     API: ${process.env.ENABLE_REAL_API === 'true' ? 'ENABLED' : 'DISABLED (Simulation)'}                              ║
║                                                            ║
║     Endpoints:                                             ║
║     POST   /process    - Process a prompt                  ║
║     GET    /status/:id - Get request status                ║
║     DELETE /cancel/:id - Cancel request                    ║
║     POST   /batch      - Batch processing                  ║
║     GET    /stats      - Get statistics                    ║
║     GET    /health     - Health check                      ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
        `));
      }
    );

    this.io = new Server(this.server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST']
      }
    });

    this.io.on('connection', (socket) => {
      console.log(chalk.blue(`📡 Client connected: ${socket.id}`));
      
      // Send initial stats
      this.router.getStatistics().then(stats => {
        socket.emit('stats', stats);
      });

      // Handle prompt submission via WebSocket
      socket.on('process', async (data) => {
        const requestId = uuidv4();
        
        try {
          const response = await this.router.route({
            id: requestId,
            prompt: data.prompt,
            type: data.type,
            priority: data.priority || 5,
            context: data.context || {},
            callback: (result) => {
              socket.emit('result', {
                requestId,
                result
              });
            }
          });

          socket.emit('queued', response);
        } catch (error: any) {
          socket.emit('error', {
            requestId,
            error: error.message
          });
        }
      });

      // Handle status requests
      socket.on('status', async (requestId) => {
        const status = await this.router.getRequestStatus(requestId);
        socket.emit('status', status);
      });

      socket.on('disconnect', () => {
        console.log(chalk.yellow(`📡 Client disconnected: ${socket.id}`));
      });
    });
  }

  /**
   * Set up router event listeners
   */
  private setupRouterEvents() {
    this.router.on('request:completed', (result) => {
      this.io.emit('request:completed', result);
      console.log(chalk.green(`✅ Request completed: ${result.requestId}`));
    });

    this.router.on('request:failed', (error) => {
      this.io.emit('request:failed', error);
      console.log(chalk.red(`❌ Request failed: ${error.requestId}`));
    });

    this.router.on('request:progress', (progress) => {
      this.io.emit('request:progress', progress);
    });
  }

  /**
   * Graceful shutdown
   */
  async shutdown() {
    console.log(chalk.yellow('\n👋 Shutting down orchestrator...'));
    
    // Close WebSocket connections
    this.io.close();
    
    // Close Express server
    this.server.close();
    
    // Clear queue
    await this.router.clearCompleted();
    
    console.log(chalk.green('✅ Shutdown complete'));
    process.exit(0);
  }
}

// Start the orchestrator
const orchestrator = new IntegratedOrchestrator();

// Handle shutdown signals
process.on('SIGTERM', () => orchestrator.shutdown());
process.on('SIGINT', () => orchestrator.shutdown());

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  console.error(chalk.red('Uncaught Exception:'), error);
  orchestrator.shutdown();
});

process.on('unhandledRejection', (reason, promise) => {
  console.error(chalk.red('Unhandled Rejection at:'), promise, 'reason:', reason);
});

export default orchestrator;
/**
 * Request Router - Routes incoming requests to appropriate agents
 * Handles load balancing and intelligent task distribution
 */

import { EventEmitter } from 'events';
import { AgentProcessor, TaskType } from './agent-processor';
import Bull from 'bull';
import chalk from 'chalk';

interface RouteRequest {
  id: string;
  prompt: string;
  type?: TaskType;
  priority?: number;
  context?: any;
  callback?: (result: any) => void;
}

interface RouteResponse {
  requestId: string;
  status: 'queued' | 'processing' | 'completed' | 'failed';
  result?: any;
  error?: string;
  processingTime?: number;
  agent?: string;
}

export class RequestRouter extends EventEmitter {
  private processor: AgentProcessor;
  private requestQueue: Bull.Queue;
  private activeRequests: Map<string, RouteRequest> = new Map();
  private requestHistory: RouteResponse[] = [];
  private routingRules: Map<string, TaskType> = new Map();

  constructor() {
    super();
    
    // Initialize processor
    this.processor = new AgentProcessor({});
    
    // Initialize queue
    this.requestQueue = new Bull('request-queue', {
      redis: {
        host: process.env.REDIS_HOST || 'redis',
        port: parseInt(process.env.REDIS_PORT || '6379')
      }
    });

    // Set up routing rules
    this.initializeRoutingRules();
    
    // Process queue
    this.setupQueueProcessing();
  }

  /**
   * Initialize routing rules for automatic task type detection
   */
  private initializeRoutingRules() {
    // Keywords for code generation
    const generateKeywords = ['create', 'build', 'implement', 'write', 'generate', 'develop'];
    generateKeywords.forEach(keyword => this.routingRules.set(keyword, TaskType.GENERATE));

    // Keywords for testing
    const testKeywords = ['test', 'validate', 'verify', 'check', 'assert'];
    testKeywords.forEach(keyword => this.routingRules.set(keyword, TaskType.TEST));

    // Keywords for optimization
    const optimizeKeywords = ['optimize', 'improve', 'enhance', 'refactor', 'performance'];
    optimizeKeywords.forEach(keyword => this.routingRules.set(keyword, TaskType.OPTIMIZE));

    // Keywords for deployment
    const deployKeywords = ['deploy', 'ship', 'release', 'launch', 'publish'];
    deployKeywords.forEach(keyword => this.routingRules.set(keyword, TaskType.DEPLOY));

    // Keywords for analysis
    const analyzeKeywords = ['analyze', 'review', 'audit', 'inspect', 'evaluate'];
    analyzeKeywords.forEach(keyword => this.routingRules.set(keyword, TaskType.ANALYZE));

    // Keywords for SEO
    const seoKeywords = ['seo', 'search', 'ranking', 'keywords', 'content', 'landing'];
    seoKeywords.forEach(keyword => this.routingRules.set(keyword, TaskType.SEO));
  }

  /**
   * Set up queue processing
   */
  private setupQueueProcessing() {
    // Process requests with concurrency
    this.requestQueue.process(
      parseInt(process.env.MAX_CONCURRENT_AGENTS || '5'),
      async (job) => {
        const request = job.data as RouteRequest;
        return await this.processRequest(request);
      }
    );

    // Queue event handlers
    this.requestQueue.on('completed', (job, result) => {
      const request = this.activeRequests.get(job.data.id);
      if (request?.callback) {
        request.callback(result);
      }
      this.activeRequests.delete(job.data.id);
      this.emit('request:completed', result);
    });

    this.requestQueue.on('failed', (job, err) => {
      console.error(chalk.red(`Request ${job.data.id} failed:`, err));
      this.activeRequests.delete(job.data.id);
      this.emit('request:failed', { requestId: job.data.id, error: err });
    });

    this.requestQueue.on('progress', (job, progress) => {
      this.emit('request:progress', { requestId: job.data.id, progress });
    });
  }

  /**
   * Route a request to the appropriate agent
   */
  async route(request: RouteRequest): Promise<RouteResponse> {
    console.log(chalk.cyan(`📨 Routing request ${request.id}`));

    // Detect task type if not specified
    if (!request.type) {
      request.type = this.detectTaskType(request.prompt);
    }

    // Store active request
    this.activeRequests.set(request.id, request);

    // Add to queue
    const job = await this.requestQueue.add(request, {
      priority: request.priority || 5,
      attempts: 3,
      backoff: {
        type: 'exponential',
        delay: 2000
      }
    });

    // Return immediate response
    const response: RouteResponse = {
      requestId: request.id,
      status: 'queued',
      agent: request.type
    };

    this.requestHistory.push(response);
    return response;
  }

  /**
   * Process a request through the agent processor
   */
  private async processRequest(request: RouteRequest): Promise<RouteResponse> {
    const startTime = Date.now();
    
    try {
      console.log(chalk.blue(`🔄 Processing request ${request.id} as ${request.type}`));
      
      // Create task for processor
      const task = {
        id: request.id,
        type: request.type || TaskType.GENERATE,
        input: request.prompt,
        context: request.context || {},
        priority: request.priority || 5
      };

      // Process through agent
      const result = await this.processor.processTask(task);

      // Create response
      const response: RouteResponse = {
        requestId: request.id,
        status: 'completed',
        result: result.result,
        processingTime: Date.now() - startTime,
        agent: request.type
      };

      console.log(chalk.green(`✅ Request ${request.id} completed in ${response.processingTime}ms`));
      return response;

    } catch (error: any) {
      console.error(chalk.red(`❌ Request ${request.id} failed:`, error));
      
      const response: RouteResponse = {
        requestId: request.id,
        status: 'failed',
        error: error.message,
        processingTime: Date.now() - startTime,
        agent: request.type
      };

      return response;
    }
  }

  /**
   * Detect task type from prompt content
   */
  private detectTaskType(prompt: string): TaskType {
    const lowerPrompt = prompt.toLowerCase();
    
    // Check each routing rule
    for (const [keyword, taskType] of this.routingRules) {
      if (lowerPrompt.includes(keyword)) {
        console.log(chalk.gray(`Detected task type ${taskType} from keyword "${keyword}"`));
        return taskType;
      }
    }

    // Default to generate
    return TaskType.GENERATE;
  }

  /**
   * Get request status
   */
  async getRequestStatus(requestId: string): Promise<RouteResponse | null> {
    // Check active requests
    if (this.activeRequests.has(requestId)) {
      const job = await this.requestQueue.getJob(requestId);
      if (job) {
        const state = await job.getState();
        return {
          requestId,
          status: state === 'completed' ? 'completed' : 
                  state === 'failed' ? 'failed' : 
                  state === 'active' ? 'processing' : 'queued'
        };
      }
    }

    // Check history
    return this.requestHistory.find(r => r.requestId === requestId) || null;
  }

  /**
   * Cancel a request
   */
  async cancelRequest(requestId: string): Promise<boolean> {
    const job = await this.requestQueue.getJob(requestId);
    if (job) {
      await job.remove();
      this.activeRequests.delete(requestId);
      console.log(chalk.yellow(`⚠️  Request ${requestId} cancelled`));
      return true;
    }
    return false;
  }

  /**
   * Get queue statistics
   */
  async getStatistics() {
    const jobCounts = await this.requestQueue.getJobCounts();
    const processorStats = this.processor.getStatistics();
    
    return {
      queue: jobCounts,
      processor: processorStats,
      activeRequests: this.activeRequests.size,
      historySize: this.requestHistory.length,
      routingRules: this.routingRules.size
    };
  }

  /**
   * Clear completed jobs from queue
   */
  async clearCompleted() {
    await this.requestQueue.clean(0, 'completed');
    await this.requestQueue.clean(0, 'failed');
    console.log(chalk.gray('Queue cleaned'));
  }

  /**
   * Batch route multiple requests
   */
  async batchRoute(requests: RouteRequest[]): Promise<RouteResponse[]> {
    console.log(chalk.cyan(`📨 Batch routing ${requests.length} requests`));
    
    const responses = await Promise.all(
      requests.map(request => this.route(request))
    );
    
    return responses;
  }
}
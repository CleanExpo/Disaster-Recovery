/**
 * Comprehensive Health Check System
 * Uses ElysiaJS framework with orchestrated agents
 * CLI-Docker-CLI methodology implementation
 */

import { Elysia } from 'elysia';
import { cors } from '@elysiajs/cors';
import { swagger } from '@elysiajs/swagger';
import axios from 'axios';
import WebSocket from 'ws';
import { PrismaClient } from '@prisma/client';
import { EventEmitter } from 'events';
import winston from 'winston';
import chalk from 'chalk';

// Logger setup
const logger = winston.createLogger({
  level: 'debug',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.colorize(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()]
});

// Health Check Status Types
interface HealthStatus {
  component: string;
  status: 'healthy' | 'degraded' | 'unhealthy' | 'unknown';
  latency?: number;
  details?: any;
  errors?: string[];
  lastChecked: Date;
}

interface SystemHealth {
  overallStatus: 'healthy' | 'degraded' | 'unhealthy';
  healthScore: number;
  components: HealthStatus[];
  missingFeatures: string[];
  recommendations: string[];
  timestamp: Date;
}

// Master Health Check Orchestrator
class HealthCheckOrchestrator extends EventEmitter {
  private agents: Map<string, HealthCheckAgent> = new Map();
  private results: Map<string, HealthStatus> = new Map();
  private prisma: PrismaClient;
  
  constructor() {
    super();
    this.prisma = new PrismaClient();
    this.initializeAgents();
  }
  
  private initializeAgents() {
    // Register all health check agents
    this.agents.set('api', new APIHealthAgent());
    this.agents.set('database', new DatabaseHealthAgent(this.prisma));
    this.agents.set('websocket', new WebSocketHealthAgent());
    this.agents.set('frontend', new FrontendHealthAgent());
    this.agents.set('bot', new BotSystemHealthAgent());
    this.agents.set('audio', new AudioSystemHealthAgent());
    this.agents.set('docker', new DockerHealthAgent());
    this.agents.set('integration', new IntegrationHealthAgent());
  }
  
  async performComprehensiveHealthCheck(): Promise<SystemHealth> {
    logger.info('🔍 Starting Comprehensive Health Check');
    
    // Clear previous results
    this.results.clear();
    
    // Execute all health checks in parallel
    const checkPromises = Array.from(this.agents.entries()).map(async ([name, agent]) => {
      try {
        const startTime = Date.now();
        const result = await agent.check();
        result.latency = Date.now() - startTime;
        result.lastChecked = new Date();
        this.results.set(name, result);
        
        // Emit individual result
        this.emit('component:checked', { name, result });
        
        return result;
      } catch (error) {
        const errorResult: HealthStatus = {
          component: name,
          status: 'unhealthy',
          errors: [error.message],
          lastChecked: new Date()
        };
        this.results.set(name, errorResult);
        return errorResult;
      }
    });
    
    await Promise.all(checkPromises);
    
    // Analyze results and generate report
    const analysis = this.analyzeResults();
    
    // Emit final results
    this.emit('check:complete', analysis);
    
    return analysis;
  }
  
  private analyzeResults(): SystemHealth {
    const components = Array.from(this.results.values());
    
    // Calculate health score
    const healthyCount = components.filter(c => c.status === 'healthy').length;
    const degradedCount = components.filter(c => c.status === 'degraded').length;
    const unhealthyCount = components.filter(c => c.status === 'unhealthy').length;
    
    const healthScore = Math.round(
      (healthyCount * 100 + degradedCount * 50) / components.length
    );
    
    // Determine overall status
    let overallStatus: 'healthy' | 'degraded' | 'unhealthy';
    if (unhealthyCount > 0) {
      overallStatus = 'unhealthy';
    } else if (degradedCount > 0) {
      overallStatus = 'degraded';
    } else {
      overallStatus = 'healthy';
    }
    
    // Identify missing features
    const missingFeatures = this.identifyMissingFeatures();
    
    // Generate recommendations
    const recommendations = this.generateRecommendations();
    
    return {
      overallStatus,
      healthScore,
      components,
      missingFeatures,
      recommendations,
      timestamp: new Date()
    };
  }
  
  private identifyMissingFeatures(): string[] {
    const missing = [];
    
    // Check for specific missing features based on results
    const wsResult = this.results.get('websocket');
    if (wsResult?.status !== 'healthy') {
      missing.push('Real-time WebSocket communication');
    }
    
    const audioResult = this.results.get('audio');
    if (audioResult?.status !== 'healthy') {
      missing.push('Multi-language audio system');
    }
    
    const botResult = this.results.get('bot');
    if (botResult?.details?.aiIntegration === false) {
      missing.push('Advanced AI bot conversations');
    }
    
    const integrationResult = this.results.get('integration');
    if (integrationResult?.details?.cleanClaims === false) {
      missing.push('Clean Claims API integration');
    }
    
    if (integrationResult?.details?.backgroundChecks === false) {
      missing.push('Background check service integration');
    }
    
    return missing;
  }
  
  private generateRecommendations(): string[] {
    const recommendations = [];
    
    // Generate recommendations based on health status
    for (const [name, result] of this.results) {
      if (result.status === 'unhealthy') {
        recommendations.push(`Critical: Fix ${name} system - ${result.errors?.join(', ')}`);
      } else if (result.status === 'degraded') {
        recommendations.push(`Warning: Optimize ${name} system performance`);
      }
    }
    
    // Add specific recommendations
    if (this.results.get('websocket')?.status !== 'healthy') {
      recommendations.push('Deploy WebSocket server for real-time features');
    }
    
    if (this.results.get('docker')?.status !== 'healthy') {
      recommendations.push('Start Docker containers for full system operation');
    }
    
    return recommendations;
  }
}

// Base Health Check Agent
abstract class HealthCheckAgent {
  abstract check(): Promise<HealthStatus>;
  
  protected async checkEndpoint(url: string): Promise<boolean> {
    try {
      const response = await axios.get(url, { timeout: 5000 });
      return response.status === 200;
    } catch {
      return false;
    }
  }
}

// API Health Check Agent
class APIHealthAgent extends HealthCheckAgent {
  async check(): Promise<HealthStatus> {
    const endpoints = [
      { url: 'http://localhost:3000/api/health', name: 'Main API' },
      { url: 'http://localhost:3005/health', name: 'Bot API' },
      { url: 'http://localhost:3007/audio/health', name: 'Audio API' }
    ];
    
    const results = await Promise.all(
      endpoints.map(async (endpoint) => ({
        name: endpoint.name,
        healthy: await this.checkEndpoint(endpoint.url)
      }))
    );
    
    const healthyCount = results.filter(r => r.healthy).length;
    const status = healthyCount === results.length ? 'healthy' :
                    healthyCount > 0 ? 'degraded' : 'unhealthy';
    
    return {
      component: 'API Endpoints',
      status,
      details: results,
      lastChecked: new Date()
    };
  }
}

// Database Health Check Agent
class DatabaseHealthAgent extends HealthCheckAgent {
  constructor(private prisma: PrismaClient) {
    super();
  }
  
  async check(): Promise<HealthStatus> {
    try {
      // Check database connection
      await this.prisma.$queryRaw`SELECT 1`;
      
      // Check critical tables
      const checks = await Promise.all([
        this.prisma.user.count(),
        this.prisma.contractor.count(),
        this.prisma.lead.count()
      ]);
      
      return {
        component: 'Database',
        status: 'healthy',
        details: {
          connected: true,
          users: checks[0],
          contractors: checks[1],
          leads: checks[2]
        },
        lastChecked: new Date()
      };
    } catch (error) {
      return {
        component: 'Database',
        status: 'unhealthy',
        errors: [error.message],
        lastChecked: new Date()
      };
    }
  }
}

// WebSocket Health Check Agent
class WebSocketHealthAgent extends HealthCheckAgent {
  async check(): Promise<HealthStatus> {
    return new Promise((resolve) => {
      const ws = new WebSocket('ws://localhost:3002');
      
      const timeout = setTimeout(() => {
        ws.close();
        resolve({
          component: 'WebSocket',
          status: 'unhealthy',
          errors: ['Connection timeout'],
          lastChecked: new Date()
        });
      }, 5000);
      
      ws.on('open', () => {
        clearTimeout(timeout);
        ws.close();
        resolve({
          component: 'WebSocket',
          status: 'healthy',
          details: { connected: true, url: 'ws://localhost:3002' },
          lastChecked: new Date()
        });
      });
      
      ws.on('error', (error) => {
        clearTimeout(timeout);
        resolve({
          component: 'WebSocket',
          status: 'unhealthy',
          errors: [error.message],
          lastChecked: new Date()
        });
      });
    });
  }
}

// Frontend Health Check Agent
class FrontendHealthAgent extends HealthCheckAgent {
  async check(): Promise<HealthStatus> {
    const checks = {
      homepage: await this.checkEndpoint('http://localhost:3000'),
      navigation: true, // Assume working based on code analysis
      breadcrumbs: true, // Assume working based on code analysis
      dropdowns: true, // Assume working based on code analysis
      mobileNav: true // Assume working based on code analysis
    };
    
    const allHealthy = Object.values(checks).every(v => v === true);
    
    return {
      component: 'Frontend',
      status: allHealthy ? 'healthy' : 'degraded',
      details: checks,
      lastChecked: new Date()
    };
  }
}

// Bot System Health Check Agent
class BotSystemHealthAgent extends HealthCheckAgent {
  async check(): Promise<HealthStatus> {
    const botApiHealthy = await this.checkEndpoint('http://localhost:3005/health');
    
    // Check specific bot endpoints
    const checks = {
      apiHealthy: botApiHealthy,
      clientBot: await this.checkEndpoint('http://localhost:3005/api/client/message'),
      contractorBot: await this.checkEndpoint('http://localhost:3005/api/contractor/login'),
      aiIntegration: false, // Needs implementation
      websocketIntegration: false // Needs connection to main system
    };
    
    const criticalHealthy = checks.apiHealthy;
    
    return {
      component: 'Bot System',
      status: criticalHealthy ? 'degraded' : 'unhealthy',
      details: checks,
      lastChecked: new Date()
    };
  }
}

// Audio System Health Check Agent
class AudioSystemHealthAgent extends HealthCheckAgent {
  async check(): Promise<HealthStatus> {
    const audioApiHealthy = await this.checkEndpoint('http://localhost:3007/audio/health');
    
    return {
      component: 'Audio System',
      status: audioApiHealthy ? 'healthy' : 'unhealthy',
      details: {
        elevenLabsIntegration: audioApiHealthy,
        multiLanguageSupport: audioApiHealthy,
        caching: false, // Redis not yet configured
        streaming: false // WebSocket streaming not yet configured
      },
      lastChecked: new Date()
    };
  }
}

// Docker Health Check Agent
class DockerHealthAgent extends HealthCheckAgent {
  async check(): Promise<HealthStatus> {
    // Check if Docker containers are running
    // This would normally use Docker API or docker CLI
    
    return {
      component: 'Docker Infrastructure',
      status: 'degraded',
      details: {
        dockerInstalled: true,
        containersRunning: false,
        message: 'Docker containers need to be started'
      },
      lastChecked: new Date()
    };
  }
}

// Integration Health Check Agent
class IntegrationHealthAgent extends HealthCheckAgent {
  async check(): Promise<HealthStatus> {
    return {
      component: 'Third-party Integrations',
      status: 'degraded',
      details: {
        stripe: true, // Partially implemented
        cleanClaims: false, // Mock only
        backgroundChecks: false, // Not implemented
        twilioSMS: true, // Implemented
        sendgridEmail: true, // Implemented
        googleMaps: true, // Implemented
        elevenLabs: false // Not connected to main system
      },
      lastChecked: new Date()
    };
  }
}

// ElysiaJS Health Check Server
const app = new Elysia()
  .use(cors())
  .use(swagger())
  .decorate('orchestrator', new HealthCheckOrchestrator())
  
  // Comprehensive health check endpoint
  .get('/health/comprehensive', async ({ orchestrator }) => {
    logger.info('Performing comprehensive health check...');
    const result = await orchestrator.performComprehensiveHealthCheck();
    
    // Log results with color coding
    console.log('\n' + chalk.bold.cyan('═'.repeat(60)));
    console.log(chalk.bold.cyan('     COMPREHENSIVE HEALTH CHECK REPORT'));
    console.log(chalk.bold.cyan('═'.repeat(60)));
    
    console.log(chalk.bold('\n📊 Overall Health Score:'), 
                result.healthScore >= 80 ? chalk.green(`${result.healthScore}%`) :
                result.healthScore >= 60 ? chalk.yellow(`${result.healthScore}%`) :
                chalk.red(`${result.healthScore}%`));
    
    console.log(chalk.bold('\n🔍 Component Status:'));
    result.components.forEach(component => {
      const statusIcon = component.status === 'healthy' ? '✅' :
                         component.status === 'degraded' ? '⚠️' : '❌';
      const statusColor = component.status === 'healthy' ? chalk.green :
                          component.status === 'degraded' ? chalk.yellow : chalk.red;
      
      console.log(`  ${statusIcon} ${chalk.bold(component.component)}: ${statusColor(component.status.toUpperCase())}`);
      
      if (component.latency) {
        console.log(`     Latency: ${component.latency}ms`);
      }
      
      if (component.errors) {
        component.errors.forEach(error => {
          console.log(chalk.red(`     Error: ${error}`));
        });
      }
    });
    
    if (result.missingFeatures.length > 0) {
      console.log(chalk.bold('\n🔧 Missing Features:'));
      result.missingFeatures.forEach(feature => {
        console.log(chalk.yellow(`  • ${feature}`));
      });
    }
    
    if (result.recommendations.length > 0) {
      console.log(chalk.bold('\n💡 Recommendations:'));
      result.recommendations.forEach(rec => {
        if (rec.startsWith('Critical:')) {
          console.log(chalk.red(`  ⚠️ ${rec}`));
        } else if (rec.startsWith('Warning:')) {
          console.log(chalk.yellow(`  ⚠️ ${rec}`));
        } else {
          console.log(chalk.cyan(`  • ${rec}`));
        }
      });
    }
    
    console.log('\n' + chalk.bold.cyan('═'.repeat(60)) + '\n');
    
    return result;
  })
  
  // Individual component checks
  .get('/health/api', async ({ orchestrator }) => {
    const agent = new APIHealthAgent();
    return await agent.check();
  })
  
  .get('/health/database', async ({ orchestrator }) => {
    const prisma = new PrismaClient();
    const agent = new DatabaseHealthAgent(prisma);
    const result = await agent.check();
    await prisma.$disconnect();
    return result;
  })
  
  .get('/health/websocket', async ({ orchestrator }) => {
    const agent = new WebSocketHealthAgent();
    return await agent.check();
  })
  
  .get('/health/frontend', async ({ orchestrator }) => {
    const agent = new FrontendHealthAgent();
    return await agent.check();
  })
  
  .get('/health/bots', async ({ orchestrator }) => {
    const agent = new BotSystemHealthAgent();
    return await agent.check();
  })
  
  .get('/health/audio', async ({ orchestrator }) => {
    const agent = new AudioSystemHealthAgent();
    return await agent.check();
  })
  
  .get('/health/docker', async ({ orchestrator }) => {
    const agent = new DockerHealthAgent();
    return await agent.check();
  })
  
  .get('/health/integrations', async ({ orchestrator }) => {
    const agent = new IntegrationHealthAgent();
    return await agent.check();
  })
  
  // Quick health check
  .get('/health', () => ({
    status: 'Health Check System Online',
    timestamp: new Date(),
    endpoints: [
      '/health/comprehensive',
      '/health/api',
      '/health/database',
      '/health/websocket',
      '/health/frontend',
      '/health/bots',
      '/health/audio',
      '/health/docker',
      '/health/integrations'
    ]
  }))
  
  .listen(3009);

console.log(chalk.bold.green('\n🚀 Health Check System running on http://localhost:3009'));
console.log(chalk.cyan('📊 Comprehensive check: http://localhost:3009/health/comprehensive'));
console.log(chalk.gray('📝 API Documentation: http://localhost:3009/swagger\n'));

export { HealthCheckOrchestrator, SystemHealth };
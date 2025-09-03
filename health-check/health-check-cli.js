#!/usr/bin/env node
/**
 * Health Check CLI
 * Comprehensive system health verification tool
 */

const axios = require('axios');
const WebSocket = require('ws');
const { PrismaClient } = require('@prisma/client');
const chalk = require('chalk');
const ora = require('ora');
const Table = require('cli-table3');
const { exec } = require('child_process');
const { promisify } = require('util');

const execAsync = promisify(exec);
const prisma = new PrismaClient();

// Configuration
const ENDPOINTS = {
  mainApp: 'http://localhost:3000',
  botAPI: 'http://localhost:3005',
  audioAPI: 'http://localhost:3007',
  websocket: 'ws://localhost:3002'
};

class HealthCheckCLI {
  constructor() {
    this.results = new Map();
    this.startTime = Date.now();
  }

  async run() {
    console.clear();
    this.printHeader();
    
    // Run all health checks
    await this.checkAPIEndpoints();
    await this.checkDatabase();
    await this.checkWebSocket();
    await this.checkFrontendComponents();
    await this.checkBotSystem();
    await this.checkAudioSystem();
    await this.checkDockerServices();
    await this.checkIntegrations();
    
    // Generate and display report
    this.generateReport();
    
    // Cleanup
    await prisma.$disconnect();
  }

  printHeader() {
    console.log(chalk.cyan.bold('╔' + '═'.repeat(58) + '╗'));
    console.log(chalk.cyan.bold('║') + chalk.white.bold('     NRP DISASTER RECOVERY - SYSTEM HEALTH CHECK     ') + chalk.cyan.bold('    ║'));
    console.log(chalk.cyan.bold('╚' + '═'.repeat(58) + '╝'));
    console.log();
  }

  async checkAPIEndpoints() {
    const spinner = ora('Checking API endpoints...').start();
    const results = [];
    
    const endpoints = [
      { name: 'Main Application', url: `${ENDPOINTS.mainApp}/api/health`, critical: true },
      { name: 'Homepage', url: ENDPOINTS.mainApp, critical: true },
      { name: 'Bot API', url: `${ENDPOINTS.botAPI}/health`, critical: false },
      { name: 'Audio API', url: `${ENDPOINTS.audioAPI}/audio/health`, critical: false },
      { name: 'Lead Capture', url: `${ENDPOINTS.mainApp}/api/capture-lead`, method: 'POST' },
      { name: 'Contractor Login', url: `${ENDPOINTS.mainApp}/api/contractors/login`, method: 'POST' }
    ];
    
    for (const endpoint of endpoints) {
      try {
        const start = Date.now();
        const response = await axios({
          method: endpoint.method || 'GET',
          url: endpoint.url,
          timeout: 5000,
          validateStatus: () => true
        });
        
        results.push({
          name: endpoint.name,
          status: response.status < 400 ? 'healthy' : 'degraded',
          latency: Date.now() - start,
          statusCode: response.status,
          critical: endpoint.critical
        });
      } catch (error) {
        results.push({
          name: endpoint.name,
          status: 'unhealthy',
          error: error.message,
          critical: endpoint.critical
        });
      }
    }
    
    this.results.set('api', results);
    
    const healthyCount = results.filter(r => r.status === 'healthy').length;
    if (healthyCount === results.length) {
      spinner.succeed('API endpoints: All healthy');
    } else if (healthyCount > 0) {
      spinner.warn(`API endpoints: ${healthyCount}/${results.length} healthy`);
    } else {
      spinner.fail('API endpoints: All unhealthy');
    }
  }

  async checkDatabase() {
    const spinner = ora('Checking database connection...').start();
    
    try {
      // Test connection
      await prisma.$queryRaw`SELECT 1`;
      
      // Get table statistics
      const stats = await Promise.all([
        prisma.user.count(),
        prisma.contractor.count(),
        prisma.lead.count(),
        prisma.job.count().catch(() => 0),
        prisma.partner.count()
      ]);
      
      this.results.set('database', {
        status: 'healthy',
        stats: {
          users: stats[0],
          contractors: stats[1],
          leads: stats[2],
          jobs: stats[3],
          partners: stats[4]
        }
      });
      
      spinner.succeed(`Database: Connected (${stats[1]} contractors, ${stats[2]} leads)`);
    } catch (error) {
      this.results.set('database', {
        status: 'unhealthy',
        error: error.message
      });
      spinner.fail('Database: Connection failed');
    }
  }

  async checkWebSocket() {
    const spinner = ora('Checking WebSocket connection...').start();
    
    return new Promise((resolve) => {
      const ws = new WebSocket(ENDPOINTS.websocket);
      
      const timeout = setTimeout(() => {
        ws.close();
        this.results.set('websocket', { status: 'unhealthy', error: 'Connection timeout' });
        spinner.fail('WebSocket: Connection timeout');
        resolve();
      }, 5000);
      
      ws.on('open', () => {
        clearTimeout(timeout);
        ws.close();
        this.results.set('websocket', { status: 'healthy' });
        spinner.succeed('WebSocket: Connected');
        resolve();
      });
      
      ws.on('error', (error) => {
        clearTimeout(timeout);
        this.results.set('websocket', { status: 'unhealthy', error: error.message });
        spinner.fail('WebSocket: Not available');
        resolve();
      });
    });
  }

  async checkFrontendComponents() {
    const spinner = ora('Checking frontend components...').start();
    
    // Check for critical frontend files
    const components = [
      'components/ui/ultra-modern-header.tsx',
      'components/ui/navigation/mobile-nav.tsx',
      'components/ui/navigation/breadcrumbs.tsx',
      'components/ui/navigation/location-dropdown.tsx',
      'app/layout.tsx',
      'app/page.tsx'
    ];
    
    const fs = require('fs');
    const path = require('path');
    
    const results = components.map(component => ({
      name: component,
      exists: fs.existsSync(path.join(process.cwd(), component))
    }));
    
    const allExist = results.every(r => r.exists);
    
    this.results.set('frontend', {
      status: allExist ? 'healthy' : 'degraded',
      components: results
    });
    
    if (allExist) {
      spinner.succeed('Frontend: All components present');
    } else {
      spinner.warn('Frontend: Some components missing');
    }
  }

  async checkBotSystem() {
    const spinner = ora('Checking bot system...').start();
    
    const checks = {
      apiRunning: false,
      websocketRunning: false,
      databaseConnected: false
    };
    
    // Check if bot API is running
    try {
      await axios.get(`${ENDPOINTS.botAPI}/health`, { timeout: 2000 });
      checks.apiRunning = true;
    } catch {}
    
    // Check WebSocket
    const wsResult = this.results.get('websocket');
    checks.websocketRunning = wsResult?.status === 'healthy';
    
    // Check bot database
    try {
      const fs = require('fs');
      checks.databaseConnected = fs.existsSync('./bots/dev.db');
    } catch {}
    
    const allHealthy = Object.values(checks).every(v => v === true);
    
    this.results.set('bots', {
      status: allHealthy ? 'healthy' : checks.apiRunning ? 'degraded' : 'unhealthy',
      checks
    });
    
    if (allHealthy) {
      spinner.succeed('Bot System: Fully operational');
    } else if (checks.apiRunning) {
      spinner.warn('Bot System: Partially operational');
    } else {
      spinner.fail('Bot System: Not running');
    }
  }

  async checkAudioSystem() {
    const spinner = ora('Checking audio system...').start();
    
    const checks = {
      elevenLabsConfigured: !!process.env.ELEVENLABS_API_KEY,
      audioServerRunning: false
    };
    
    try {
      await axios.get(`${ENDPOINTS.audioAPI}/audio/health`, { timeout: 2000 });
      checks.audioServerRunning = true;
    } catch {}
    
    this.results.set('audio', {
      status: checks.audioServerRunning ? 'healthy' : 'unhealthy',
      checks
    });
    
    if (checks.audioServerRunning) {
      spinner.succeed('Audio System: Running');
    } else if (checks.elevenLabsConfigured) {
      spinner.warn('Audio System: Configured but not running');
    } else {
      spinner.fail('Audio System: Not configured');
    }
  }

  async checkDockerServices() {
    const spinner = ora('Checking Docker services...').start();
    
    try {
      const { stdout } = await execAsync('docker ps --format "{{.Names}}"');
      const runningContainers = stdout.split('\n').filter(Boolean);
      
      const expectedContainers = [
        'nrp-bot-api',
        'nrp-websocket',
        'nrp-redis',
        'nrp-postgres'
      ];
      
      const results = expectedContainers.map(name => ({
        name,
        running: runningContainers.some(c => c.includes(name))
      }));
      
      this.results.set('docker', {
        status: results.some(r => r.running) ? 'degraded' : 'unhealthy',
        containers: results
      });
      
      const runningCount = results.filter(r => r.running).length;
      if (runningCount === expectedContainers.length) {
        spinner.succeed('Docker: All services running');
      } else if (runningCount > 0) {
        spinner.warn(`Docker: ${runningCount}/${expectedContainers.length} services running`);
      } else {
        spinner.info('Docker: No services running (run: docker-compose up -d)');
      }
    } catch (error) {
      this.results.set('docker', {
        status: 'unknown',
        error: 'Docker not available'
      });
      spinner.info('Docker: Not installed or not running');
    }
  }

  async checkIntegrations() {
    const spinner = ora('Checking third-party integrations...').start();
    
    const integrations = {
      stripe: !!process.env.STRIPE_SECRET_KEY,
      twilio: !!process.env.TWILIO_ACCOUNT_SID,
      sendgrid: !!process.env.SENDGRID_API_KEY,
      elevenLabs: !!process.env.ELEVENLABS_API_KEY,
      googleMaps: !!process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
      cleanClaims: false, // Mock only
      backgroundChecks: false // Not implemented
    };
    
    const configuredCount = Object.values(integrations).filter(Boolean).length;
    
    this.results.set('integrations', {
      status: configuredCount >= 4 ? 'healthy' : configuredCount >= 2 ? 'degraded' : 'unhealthy',
      integrations
    });
    
    spinner.succeed(`Integrations: ${configuredCount}/${Object.keys(integrations).length} configured`);
  }

  generateReport() {
    console.log();
    console.log(chalk.bold.cyan('┌' + '─'.repeat(58) + '┐'));
    console.log(chalk.bold.cyan('│') + chalk.bold.white('                   HEALTH CHECK REPORT                   ') + chalk.bold.cyan('│'));
    console.log(chalk.bold.cyan('└' + '─'.repeat(58) + '┘'));
    console.log();
    
    // Calculate overall health score
    let totalScore = 0;
    let componentCount = 0;
    
    for (const [component, result] of this.results) {
      componentCount++;
      if (result.status === 'healthy') totalScore += 100;
      else if (result.status === 'degraded') totalScore += 50;
    }
    
    const healthScore = Math.round(totalScore / componentCount);
    
    // Display health score
    const scoreColor = healthScore >= 80 ? chalk.green : healthScore >= 60 ? chalk.yellow : chalk.red;
    console.log(chalk.bold('📊 Overall Health Score: ') + scoreColor.bold(`${healthScore}%`));
    console.log();
    
    // Component status table
    const table = new Table({
      head: ['Component', 'Status', 'Details'],
      colWidths: [20, 15, 35],
      style: { head: ['cyan'] }
    });
    
    // API Endpoints
    const apiResults = this.results.get('api') || [];
    const healthyAPIs = apiResults.filter(r => r.status === 'healthy').length;
    table.push([
      'API Endpoints',
      this.getStatusBadge(healthyAPIs === apiResults.length ? 'healthy' : healthyAPIs > 0 ? 'degraded' : 'unhealthy'),
      `${healthyAPIs}/${apiResults.length} endpoints healthy`
    ]);
    
    // Database
    const dbResult = this.results.get('database');
    if (dbResult) {
      table.push([
        'Database',
        this.getStatusBadge(dbResult.status),
        dbResult.status === 'healthy' ? 
          `${dbResult.stats.contractors} contractors, ${dbResult.stats.leads} leads` :
          dbResult.error
      ]);
    }
    
    // WebSocket
    const wsResult = this.results.get('websocket');
    table.push([
      'WebSocket',
      this.getStatusBadge(wsResult?.status || 'unknown'),
      wsResult?.status === 'healthy' ? 'Connected' : wsResult?.error || 'Not available'
    ]);
    
    // Frontend
    const frontendResult = this.results.get('frontend');
    table.push([
      'Frontend',
      this.getStatusBadge(frontendResult?.status || 'unknown'),
      frontendResult?.status === 'healthy' ? 'All components present' : 'Some components missing'
    ]);
    
    // Bot System
    const botResult = this.results.get('bots');
    table.push([
      'Bot System',
      this.getStatusBadge(botResult?.status || 'unknown'),
      botResult?.status === 'healthy' ? 'Fully operational' :
      botResult?.status === 'degraded' ? 'Partially operational' : 'Not running'
    ]);
    
    // Audio System
    const audioResult = this.results.get('audio');
    table.push([
      'Audio System',
      this.getStatusBadge(audioResult?.status || 'unknown'),
      audioResult?.checks?.audioServerRunning ? 'Running' : 'Not configured'
    ]);
    
    // Docker
    const dockerResult = this.results.get('docker');
    const runningContainers = dockerResult?.containers?.filter(c => c.running).length || 0;
    const totalContainers = dockerResult?.containers?.length || 0;
    table.push([
      'Docker Services',
      this.getStatusBadge(dockerResult?.status || 'unknown'),
      dockerResult?.status === 'unknown' ? 'Docker not available' :
      `${runningContainers}/${totalContainers} containers running`
    ]);
    
    // Integrations
    const intResult = this.results.get('integrations');
    const configuredInt = Object.values(intResult?.integrations || {}).filter(Boolean).length;
    table.push([
      'Integrations',
      this.getStatusBadge(intResult?.status || 'unknown'),
      `${configuredInt}/7 configured`
    ]);
    
    console.log(table.toString());
    console.log();
    
    // Missing features
    this.displayMissingFeatures();
    
    // Recommendations
    this.displayRecommendations();
    
    // Execution time
    const executionTime = Date.now() - this.startTime;
    console.log(chalk.gray(`\nHealth check completed in ${executionTime}ms`));
  }

  getStatusBadge(status) {
    switch (status) {
      case 'healthy':
        return chalk.green('✅ Healthy');
      case 'degraded':
        return chalk.yellow('⚠️  Degraded');
      case 'unhealthy':
        return chalk.red('❌ Unhealthy');
      default:
        return chalk.gray('❔ Unknown');
    }
  }

  displayMissingFeatures() {
    console.log(chalk.bold.yellow('\n🔧 Missing Features:'));
    
    const missing = [];
    
    // Check results for missing features
    if (this.results.get('websocket')?.status !== 'healthy') {
      missing.push('Real-time WebSocket communication');
    }
    
    if (this.results.get('audio')?.status !== 'healthy') {
      missing.push('Multi-language audio system (ElevenLabs)');
    }
    
    if (!this.results.get('bots')?.checks?.websocketRunning) {
      missing.push('Bot WebSocket integration with main system');
    }
    
    const integrations = this.results.get('integrations')?.integrations || {};
    if (!integrations.cleanClaims) {
      missing.push('Clean Claims API integration');
    }
    
    if (!integrations.backgroundChecks) {
      missing.push('Background check service integration');
    }
    
    missing.forEach(feature => {
      console.log(chalk.yellow(`  • ${feature}`));
    });
    
    if (missing.length === 0) {
      console.log(chalk.green('  All major features implemented!'));
    }
  }

  displayRecommendations() {
    console.log(chalk.bold.cyan('\n💡 Recommendations:'));
    
    const recommendations = [];
    
    // Generate recommendations based on results
    if (this.results.get('websocket')?.status !== 'healthy') {
      recommendations.push({
        priority: 'high',
        action: 'Start WebSocket server: cd bots && npx tsx src/websocket-server.ts'
      });
    }
    
    if (this.results.get('bots')?.status === 'unhealthy') {
      recommendations.push({
        priority: 'high',
        action: 'Start Bot API: cd bots && node simple-test-server.js'
      });
    }
    
    const dockerResult = this.results.get('docker');
    if (dockerResult?.status === 'unhealthy') {
      recommendations.push({
        priority: 'medium',
        action: 'Start Docker services: docker-compose -f bots/docker-compose.yml up -d'
      });
    }
    
    if (!this.results.get('integrations')?.integrations?.elevenLabs) {
      recommendations.push({
        priority: 'low',
        action: 'Configure ElevenLabs API key in .env file'
      });
    }
    
    if (recommendations.length === 0) {
      console.log(chalk.green('  ✅ System is running optimally!'));
    } else {
      recommendations
        .sort((a, b) => {
          const priority = { high: 0, medium: 1, low: 2 };
          return priority[a.priority] - priority[b.priority];
        })
        .forEach(rec => {
          const icon = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
          console.log(`  ${icon} ${chalk.bold(`[${rec.priority.toUpperCase()}]`)} ${rec.action}`);
        });
    }
  }
}

// Run the health check
if (require.main === module) {
  const healthCheck = new HealthCheckCLI();
  healthCheck.run().catch(console.error);
}

module.exports = HealthCheckCLI;
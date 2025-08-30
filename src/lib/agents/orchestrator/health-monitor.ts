import { EventEmitter } from 'events';
import os from 'os';

interface HealthStatus {
  timestamp: Date;
  healthy: boolean;
  agents: AgentHealth[];
  system: SystemHealth;
  metrics: HealthMetrics;
}

interface AgentHealth {
  name: string;
  status: 'healthy' | 'degraded' | 'failed';
  lastSeen: Date;
  errorCount: number;
  responseTime: number;
}

interface SystemHealth {
  cpu: number;
  memory: number;
  disk: number;
  network: boolean;
}

interface HealthMetrics {
  uptime: number;
  tasksProcessed: number;
  errorRate: number;
  avgResponseTime: number;
}

export class HealthMonitor extends EventEmitter {
  private interval: number;
  private timer: NodeJS.Timeout | null = null;
  private metrics: Map<string, any>;
  private history: HealthStatus[] = [];
  private maxHistorySize = 1000;
  private thresholds = {
    cpu: { warning: 70, critical: 90 },
    memory: { warning: 80, critical: 95 },
    errorRate: { warning: 5, critical: 10 },
    responseTime: { warning: 5000, critical: 10000 }
  };

  constructor(interval: number = 60000) {
    super();
    this.interval = interval;
    this.metrics = new Map();
    this.initializeMetrics();
  }

  private initializeMetrics() {
    this.metrics.set('startTime', Date.now());
    this.metrics.set('tasksProcessed', 0);
    this.metrics.set('errors', 0);
    this.metrics.set('responseTimes', []);
    this.metrics.set('agentStatus', new Map());
  }

  public start() {
    if (this.timer) return;
    
    this.timer = setInterval(() => {
      this.performHealthCheck();
    }, this.interval);
    
    // Perform initial check
    this.performHealthCheck();
  }

  public stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private async performHealthCheck() {
    const status = await this.collectHealthStatus();
    
    this.history.push(status);
    if (this.history.length > this.maxHistorySize) {
      this.history.shift();
    }
    
    this.analyzeHealth(status);
    this.emit('health-check', status);
  }

  private async collectHealthStatus(): Promise<HealthStatus> {
    const system = this.getSystemHealth();
    const agents = this.getAgentHealth();
    const metrics = this.calculateMetrics();
    
    const healthy = this.isSystemHealthy(system, agents, metrics);
    
    return {
      timestamp: new Date(),
      healthy,
      agents,
      system,
      metrics
    };
  }

  private getSystemHealth(): SystemHealth {
    const cpus = os.cpus();
    const totalMemory = os.totalmem();
    const freeMemory = os.freemem();
    
    // Calculate CPU usage
    const cpuUsage = cpus.reduce((acc, cpu) => {
      const total = Object.values(cpu.times).reduce((a, b) => a + b, 0);
      const idle = cpu.times.idle;
      return acc + ((total - idle) / total) * 100;
    }, 0) / cpus.length;
    
    // Calculate memory usage
    const memoryUsage = ((totalMemory - freeMemory) / totalMemory) * 100;
    
    return {
      cpu: Math.round(cpuUsage),
      memory: Math.round(memoryUsage),
      disk: this.getDiskUsage(),
      network: this.checkNetworkConnectivity()
    };
  }

  private getDiskUsage(): number {
    // Simplified disk usage calculation
    // In production, use proper disk usage libraries
    return 45; // Mock value
  }

  private checkNetworkConnectivity(): boolean {
    // Check if network is available
    // In production, ping external services
    return true;
  }

  private getAgentHealth(): AgentHealth[] {
    const agentStatus = this.metrics.get('agentStatus');
    const agents: AgentHealth[] = [];
    
    agentStatus.forEach((status: any, name: string) => {
      agents.push({
        name,
        status: this.determineAgentStatus(status),
        lastSeen: status.lastSeen || new Date(),
        errorCount: status.errorCount || 0,
        responseTime: status.avgResponseTime || 0
      });
    });
    
    return agents;
  }

  private determineAgentStatus(status: any): 'healthy' | 'degraded' | 'failed' {
    if (!status.lastSeen || Date.now() - status.lastSeen > 300000) {
      return 'failed';
    }
    
    if (status.errorCount > 10 || status.avgResponseTime > 10000) {
      return 'degraded';
    }
    
    return 'healthy';
  }

  private calculateMetrics(): HealthMetrics {
    const uptime = Date.now() - this.metrics.get('startTime');
    const tasksProcessed = this.metrics.get('tasksProcessed');
    const errors = this.metrics.get('errors');
    const responseTimes = this.metrics.get('responseTimes');
    
    const errorRate = tasksProcessed > 0 ? (errors / tasksProcessed) * 100 : 0;
    const avgResponseTime = responseTimes.length > 0
      ? responseTimes.reduce((a: number, b: number) => a + b, 0) / responseTimes.length
      : 0;
    
    return {
      uptime,
      tasksProcessed,
      errorRate: Math.round(errorRate * 100) / 100,
      avgResponseTime: Math.round(avgResponseTime)
    };
  }

  private isSystemHealthy(
    system: SystemHealth,
    agents: AgentHealth[],
    metrics: HealthMetrics
  ): boolean {
    // Check system thresholds
    if (system.cpu > this.thresholds.cpu.critical) return false;
    if (system.memory > this.thresholds.memory.critical) return false;
    if (!system.network) return false;
    
    // Check agent health
    const failedAgents = agents.filter(a => a.status === 'failed');
    if (failedAgents.length > agents.length * 0.5) return false;
    
    // Check metrics
    if (metrics.errorRate > this.thresholds.errorRate.critical) return false;
    if (metrics.avgResponseTime > this.thresholds.responseTime.critical) return false;
    
    return true;
  }

  private analyzeHealth(status: HealthStatus) {
    // Detect anomalies
    const anomalies = this.detectAnomalies(status);
    
    if (anomalies.length > 0) {
      this.emit('anomaly-detected', anomalies);
    }
    
    // Check for degradation
    if (!status.healthy) {
      this.analyzeDegradation(status);
    }
  }

  private detectAnomalies(status: HealthStatus): any[] {
    const anomalies = [];
    
    // CPU spike detection
    if (status.system.cpu > this.thresholds.cpu.warning) {
      const recentCpu = this.getRecentMetric('cpu', 5);
      const avgCpu = recentCpu.reduce((a, b) => a + b, 0) / recentCpu.length;
      
      if (status.system.cpu > avgCpu * 1.5) {
        anomalies.push({
          type: 'cpu-spike',
          value: status.system.cpu,
          average: avgCpu,
          severity: 'warning'
        });
      }
    }
    
    // Memory leak detection
    const memoryTrend = this.getMemoryTrend();
    if (memoryTrend.increasing && memoryTrend.rate > 5) {
      anomalies.push({
        type: 'memory-leak',
        rate: memoryTrend.rate,
        severity: 'critical'
      });
    }
    
    // Error rate spike
    if (status.metrics.errorRate > this.thresholds.errorRate.warning) {
      anomalies.push({
        type: 'error-spike',
        rate: status.metrics.errorRate,
        severity: 'warning'
      });
    }
    
    return anomalies;
  }

  private getRecentMetric(metric: string, count: number): number[] {
    const recent = this.history.slice(-count);
    
    switch (metric) {
      case 'cpu':
        return recent.map(h => h.system.cpu);
      case 'memory':
        return recent.map(h => h.system.memory);
      case 'errorRate':
        return recent.map(h => h.metrics.errorRate);
      default:
        return [];
    }
  }

  private getMemoryTrend(): { increasing: boolean; rate: number } {
    if (this.history.length < 10) {
      return { increasing: false, rate: 0 };
    }
    
    const recentMemory = this.getRecentMetric('memory', 10);
    let increasingCount = 0;
    
    for (let i = 1; i < recentMemory.length; i++) {
      if (recentMemory[i] > recentMemory[i - 1]) {
        increasingCount++;
      }
    }
    
    const increasing = increasingCount > 7;
    const rate = increasing
      ? (recentMemory[recentMemory.length - 1] - recentMemory[0]) / recentMemory.length
      : 0;
    
    return { increasing, rate };
  }

  private analyzeDegradation(status: HealthStatus) {
    const issues = [];
    
    if (status.system.cpu > this.thresholds.cpu.critical) {
      issues.push('Critical CPU usage');
    }
    
    if (status.system.memory > this.thresholds.memory.critical) {
      issues.push('Critical memory usage');
    }
    
    const failedAgents = status.agents.filter(a => a.status === 'failed');
    if (failedAgents.length > 0) {
      issues.push(`${failedAgents.length} agents failed`);
    }
    
    if (status.metrics.errorRate > this.thresholds.errorRate.critical) {
      issues.push('High error rate');
    }
    
    this.emit('degradation-detected', {
      issues,
      status,
      recommendation: this.getRecoveryRecommendation(issues)
    });
  }

  private getRecoveryRecommendation(issues: string[]): string {
    if (issues.includes('Critical CPU usage')) {
      return 'Reduce concurrent tasks or scale horizontally';
    }
    
    if (issues.includes('Critical memory usage')) {
      return 'Restart services to clear memory or increase memory allocation';
    }
    
    if (issues.some(i => i.includes('agents failed'))) {
      return 'Restart failed agents and check dependencies';
    }
    
    if (issues.includes('High error rate')) {
      return 'Review recent changes and check external dependencies';
    }
    
    return 'Investigate system logs for root cause';
  }

  // Public API
  
  public recordTask(success: boolean, responseTime: number) {
    this.metrics.set('tasksProcessed', this.metrics.get('tasksProcessed') + 1);
    
    if (!success) {
      this.metrics.set('errors', this.metrics.get('errors') + 1);
    }
    
    const responseTimes = this.metrics.get('responseTimes');
    responseTimes.push(responseTime);
    
    // Keep only last 100 response times
    if (responseTimes.length > 100) {
      responseTimes.shift();
    }
  }

  public updateAgentStatus(agentName: string, status: any) {
    const agentStatus = this.metrics.get('agentStatus');
    agentStatus.set(agentName, {
      ...agentStatus.get(agentName),
      ...status,
      lastSeen: Date.now()
    });
  }

  public getStatus(): HealthStatus | null {
    return this.history.length > 0 ? this.history[this.history.length - 1] : null;
  }

  public getMetrics(): HealthMetrics {
    return this.calculateMetrics();
  }

  public getHistory(count?: number): HealthStatus[] {
    if (count) {
      return this.history.slice(-count);
    }
    return this.history;
  }

  public setThreshold(metric: string, level: 'warning' | 'critical', value: number) {
    if (this.thresholds[metric]) {
      this.thresholds[metric][level] = value;
    }
  }
}

export default HealthMonitor;
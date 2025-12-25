/**
 * Mobile Performance Monitor - Real-time Performance Analytics
 *
 * Tracks memory usage, CPU, battery, network quality, and app performance
 * metrics specific to mobile platforms.
 *
 * @module MobilePerformanceMonitor
 */

import { EventEmitter } from 'events';
import { Logger } from '../logging/logger';
import { MetricsCollector } from '../monitoring/metrics-collector';
import { NativeBridge } from './native-bridge';

interface PerformanceMetrics {
  timestamp: number;
  memory: {
    used: number; // MB
    available: number; // MB
    threshold: number; // MB
  };
  cpu: {
    usage: number; // 0-100%
    threads: number;
  };
  battery: {
    level: number; // 0-100%
    isCharging: boolean;
    temperatureCelsius: number;
  };
  network: {
    type: 'wifi' | '4g' | '5g' | '3g' | 'none';
    isConnected: boolean;
    signal: number; // 0-100%
    latency: number; // ms
    bandwidth: number; // Mbps
  };
  storage: {
    used: number; // MB
    available: number; // MB
  };
  appMetrics: {
    fps: number;
    memoryLeakIndicator: number; // 0-1
    shutdownTime: number; // ms
  };
}

interface ThresholdConfig {
  memoryWarningMB: number;
  memoryCriticalMB: number;
  batteryWarningPercent: number;
  cpuWarningPercent: number;
  lowNetworkLatencyMs: number;
}

export class MobilePerformanceMonitor extends EventEmitter {
  private logger: Logger;
  private metrics: MetricsCollector;
  private nativeBridge: NativeBridge;
  private currentMetrics: PerformanceMetrics | null = null;
  private metricsHistory: PerformanceMetrics[] = [];
  private monitoringActive = false;
  private monitoringInterval: NodeJS.Timeout | null = null;
  private thresholds: ThresholdConfig;
  private alerts: Map<string, boolean> = new Map();

  constructor(nativeBridge: NativeBridge, thresholds?: Partial<ThresholdConfig>) {
    super();
    this.logger = new Logger('MobilePerformanceMonitor');
    this.metrics = new MetricsCollector('mobile_performance');
    this.nativeBridge = nativeBridge;

    this.thresholds = {
      memoryWarningMB: 300,
      memoryCriticalMB: 100,
      batteryWarningPercent: 20,
      cpuWarningPercent: 80,
      lowNetworkLatencyMs: 200,
      ...thresholds
    };
  }

  /**
   * Start monitoring performance
   */
  async startMonitoring(intervalMs: number = 5000): Promise<void> {
    if (this.monitoringActive) {
      this.logger.warn('Monitoring already active');
      return;
    }

    this.logger.info('Starting performance monitoring', { intervalMs });

    try {
      // Get initial metrics
      await this.collectMetrics();

      // Setup periodic collection
      this.monitoringInterval = setInterval(async () => {
        await this.collectMetrics();
      }, intervalMs);

      this.monitoringActive = true;
      this.emit('monitoringStarted');
    } catch (error) {
      this.logger.error('Failed to start monitoring', { error });
      throw error;
    }
  }

  /**
   * Stop monitoring
   */
  stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }

    this.monitoringActive = false;
    this.logger.info('Performance monitoring stopped');
    this.emit('monitoringStopped');
  }

  /**
   * Collect current performance metrics
   */
  private async collectMetrics(): Promise<void> {
    try {
      const metrics: PerformanceMetrics = {
        timestamp: Date.now(),
        memory: await this.getMemoryMetrics(),
        cpu: await this.getCPUMetrics(),
        battery: await this.getBatteryMetrics(),
        network: await this.getNetworkMetrics(),
        storage: await this.getStorageMetrics(),
        appMetrics: await this.getAppMetrics()
      };

      this.currentMetrics = metrics;
      this.metricsHistory.push(metrics);

      // Keep only last 1000 samples
      if (this.metricsHistory.length > 1000) {
        this.metricsHistory.shift();
      }

      // Check thresholds
      this.checkThresholds(metrics);

      this.emit('metricsCollected', metrics);
    } catch (error) {
      this.logger.warn('Failed to collect metrics', { error });
    }
  }

  /**
   * Get memory metrics
   */
  private async getMemoryMetrics(): Promise<PerformanceMetrics['memory']> {
    try {
      const result = await this.nativeBridge.invokeMethod('Device', 'getMemoryInfo', {});

      return {
        used: result?.used || 0,
        available: result?.available || 0,
        threshold: result?.threshold || 0
      };
    } catch (error) {
      this.logger.debug('Failed to get memory metrics', { error });
      return { used: 0, available: 0, threshold: 0 };
    }
  }

  /**
   * Get CPU metrics
   */
  private async getCPUMetrics(): Promise<PerformanceMetrics['cpu']> {
    try {
      const result = await this.nativeBridge.invokeMethod('Device', 'getCPUInfo', {});

      return {
        usage: result?.usage || 0,
        threads: result?.threads || 0
      };
    } catch (error) {
      this.logger.debug('Failed to get CPU metrics', { error });
      return { usage: 0, threads: 0 };
    }
  }

  /**
   * Get battery metrics
   */
  private async getBatteryMetrics(): Promise<PerformanceMetrics['battery']> {
    try {
      const result = await this.nativeBridge.invokeMethod('Device', 'getBatteryStatus', {});

      return {
        level: result?.level || 0,
        isCharging: result?.isCharging || false,
        temperatureCelsius: result?.temperature || 0
      };
    } catch (error) {
      this.logger.debug('Failed to get battery metrics', { error });
      return { level: 0, isCharging: false, temperatureCelsius: 0 };
    }
  }

  /**
   * Get network metrics
   */
  private async getNetworkMetrics(): Promise<PerformanceMetrics['network']> {
    try {
      const result = await this.nativeBridge.invokeMethod('Network', 'getNetworkInfo', {});

      return {
        type: result?.type || 'none',
        isConnected: result?.isConnected || false,
        signal: result?.signal || 0,
        latency: result?.latency || 0,
        bandwidth: result?.bandwidth || 0
      };
    } catch (error) {
      this.logger.debug('Failed to get network metrics', { error });
      return {
        type: 'none',
        isConnected: false,
        signal: 0,
        latency: 0,
        bandwidth: 0
      };
    }
  }

  /**
   * Get storage metrics
   */
  private async getStorageMetrics(): Promise<PerformanceMetrics['storage']> {
    try {
      const result = await this.nativeBridge.invokeMethod('Device', 'getStorageInfo', {});

      return {
        used: result?.used || 0,
        available: result?.available || 0
      };
    } catch (error) {
      this.logger.debug('Failed to get storage metrics', { error });
      return { used: 0, available: 0 };
    }
  }

  /**
   * Get app-specific metrics
   */
  private async getAppMetrics(): Promise<PerformanceMetrics['appMetrics']> {
    try {
      // FPS measurement (simplified)
      const fps = 60; // Placeholder

      // Memory leak detection (simplified)
      const memoryLeakIndicator = this.detectMemoryLeaks();

      // App shutdown time (placeholder)
      const shutdownTime = 0;

      return { fps, memoryLeakIndicator, shutdownTime };
    } catch (error) {
      this.logger.debug('Failed to get app metrics', { error });
      return { fps: 0, memoryLeakIndicator: 0, shutdownTime: 0 };
    }
  }

  /**
   * Detect potential memory leaks
   */
  private detectMemoryLeaks(): number {
    if (this.metricsHistory.length < 10) return 0;

    // Get memory trend
    const recentHistory = this.metricsHistory.slice(-10);
    const memoryTrend = recentHistory.map(m => m.memory.used);

    // Calculate if memory is consistently growing
    let growthCount = 0;
    for (let i = 1; i < memoryTrend.length; i++) {
      if (memoryTrend[i] > memoryTrend[i - 1]) {
        growthCount++;
      }
    }

    // If memory grew in 8 out of 10 samples, potential leak
    return growthCount >= 8 ? 0.8 : 0;
  }

  /**
   * Check metrics against thresholds
   */
  private checkThresholds(metrics: PerformanceMetrics): void {
    // Memory warning
    if (
      metrics.memory.available < this.thresholds.memoryWarningMB &&
      !this.alerts.get('memoryWarning')
    ) {
      this.alerts.set('memoryWarning', true);
      this.emit('alert', {
        type: 'memoryWarning',
        severity: 'warning',
        message: `Low memory: ${metrics.memory.available}MB available`,
        metrics
      });
    } else if (metrics.memory.available >= this.thresholds.memoryWarningMB) {
      this.alerts.set('memoryWarning', false);
    }

    // Memory critical
    if (
      metrics.memory.available < this.thresholds.memoryCriticalMB &&
      !this.alerts.get('memoryCritical')
    ) {
      this.alerts.set('memoryCritical', true);
      this.emit('alert', {
        type: 'memoryCritical',
        severity: 'critical',
        message: `Critical memory: ${metrics.memory.available}MB available`,
        metrics
      });
    } else if (metrics.memory.available >= this.thresholds.memoryCriticalMB) {
      this.alerts.set('memoryCritical', false);
    }

    // Battery warning
    if (
      metrics.battery.level < this.thresholds.batteryWarningPercent &&
      !metrics.battery.isCharging &&
      !this.alerts.get('batteryWarning')
    ) {
      this.alerts.set('batteryWarning', true);
      this.emit('alert', {
        type: 'batteryWarning',
        severity: 'warning',
        message: `Low battery: ${metrics.battery.level}%`,
        metrics
      });
    } else if (metrics.battery.level >= this.thresholds.batteryWarningPercent) {
      this.alerts.set('batteryWarning', false);
    }

    // CPU high
    if (
      metrics.cpu.usage > this.thresholds.cpuWarningPercent &&
      !this.alerts.get('cpuHigh')
    ) {
      this.alerts.set('cpuHigh', true);
      this.emit('alert', {
        type: 'cpuHigh',
        severity: 'warning',
        message: `High CPU usage: ${metrics.cpu.usage}%`,
        metrics
      });
    } else if (metrics.cpu.usage <= this.thresholds.cpuWarningPercent) {
      this.alerts.set('cpuHigh', false);
    }

    // Network latency
    if (
      metrics.network.latency > this.thresholds.lowNetworkLatencyMs &&
      metrics.network.isConnected &&
      !this.alerts.get('networkLatency')
    ) {
      this.alerts.set('networkLatency', true);
      this.emit('alert', {
        type: 'networkLatency',
        severity: 'info',
        message: `High network latency: ${metrics.network.latency}ms`,
        metrics
      });
    } else if (metrics.network.latency <= this.thresholds.lowNetworkLatencyMs) {
      this.alerts.set('networkLatency', false);
    }

    // Network disconnected
    if (!metrics.network.isConnected && !this.alerts.get('networkDisconnected')) {
      this.alerts.set('networkDisconnected', true);
      this.emit('alert', {
        type: 'networkDisconnected',
        severity: 'warning',
        message: 'Device disconnected from network',
        metrics
      });
    } else if (metrics.network.isConnected) {
      this.alerts.set('networkDisconnected', false);
    }

    // Memory leak detection
    if (
      metrics.appMetrics.memoryLeakIndicator > 0.5 &&
      !this.alerts.get('memoryLeak')
    ) {
      this.alerts.set('memoryLeak', true);
      this.emit('alert', {
        type: 'memoryLeak',
        severity: 'warning',
        message: 'Potential memory leak detected',
        metrics
      });
    } else if (metrics.appMetrics.memoryLeakIndicator <= 0.5) {
      this.alerts.set('memoryLeak', false);
    }
  }

  /**
   * Get current metrics
   */
  getCurrentMetrics(): PerformanceMetrics | null {
    return this.currentMetrics;
  }

  /**
   * Get metrics history
   */
  getMetricsHistory(samples: number = 100): PerformanceMetrics[] {
    return this.metricsHistory.slice(-samples);
  }

  /**
   * Get performance report
   */
  getPerformanceReport(): {
    averageMemory: number;
    averageCPU: number;
    averageBattery: number;
    networkQuality: string;
    overallHealth: string;
  } {
    if (this.metricsHistory.length === 0) {
      return {
        averageMemory: 0,
        averageCPU: 0,
        averageBattery: 0,
        networkQuality: 'unknown',
        overallHealth: 'unknown'
      };
    }

    const history = this.metricsHistory;
    const avgMemory =
      history.reduce((sum, m) => sum + m.memory.used, 0) / history.length;
    const avgCPU = history.reduce((sum, m) => sum + m.cpu.usage, 0) / history.length;
    const avgBattery =
      history.reduce((sum, m) => sum + m.battery.level, 0) / history.length;

    // Determine network quality
    const latestNetwork = history[history.length - 1].network;
    let networkQuality = 'unknown';
    if (!latestNetwork.isConnected) {
      networkQuality = 'disconnected';
    } else if (latestNetwork.latency < 50) {
      networkQuality = 'excellent';
    } else if (latestNetwork.latency < 100) {
      networkQuality = 'good';
    } else if (latestNetwork.latency < 200) {
      networkQuality = 'fair';
    } else {
      networkQuality = 'poor';
    }

    // Overall health
    let overallHealth = 'healthy';
    if (this.alerts.get('memoryCritical') || this.alerts.get('networkDisconnected')) {
      overallHealth = 'critical';
    } else if (
      this.alerts.get('memoryWarning') ||
      this.alerts.get('batteryWarning') ||
      this.alerts.get('cpuHigh')
    ) {
      overallHealth = 'warning';
    }

    return {
      averageMemory: avgMemory,
      averageCPU: avgCPU,
      averageBattery: avgBattery,
      networkQuality,
      overallHealth
    };
  }

  /**
   * Cleanup
   */
  cleanup(): void {
    this.stopMonitoring();
    this.metricsHistory = [];
    this.alerts.clear();
    this.removeAllListeners();
    this.logger.info('Mobile performance monitor cleanup complete');
  }
}

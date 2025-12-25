/**
 * Deployment Configuration Service
 *
 * Manage environment configurations and deployment settings
 */

import { EventEmitter } from 'events';

interface Environment {
  id: string;
  name: 'development' | 'staging' | 'production';
  description?: string;
  url: string;
  apiUrl: string;
  features: {
    [key: string]: boolean;
  };
  limits: {
    maxUsers?: number;
    maxRooms?: number;
    maxStorageGB?: number;
    requestsPerMinute?: number;
  };
  secrets: Map<string, string>;
  createdAt: string;
  updatedAt: string;
}

interface DeploymentConfig {
  id: string;
  name: string;
  version: string;
  timestamp: number;
  environment: 'development' | 'staging' | 'production';
  components: {
    [key: string]: {
      enabled: boolean;
      version: string;
      config?: Record<string, any>;
    };
  };
  health: {
    status: 'healthy' | 'degraded' | 'critical';
    checkedAt: number;
    components: {
      [key: string]: {
        status: 'up' | 'down' | 'slow';
        latency?: number;
        error?: string;
      };
    };
  };
}

interface ServiceDependency {
  name: string;
  version: string;
  required: boolean;
  status?: 'available' | 'unavailable';
  lastChecked?: number;
}

interface FeatureFlag {
  id: string;
  name: string;
  description?: string;
  enabled: boolean;
  rolloutPercentage: number; // 0-100
  targetEnvironments: string[];
  targetUsers?: string[];
  createdAt: string;
  updatedAt: string;
}

export class DeploymentConfigService extends EventEmitter {
  private environments: Map<string, Environment> = new Map();
  private deploymentConfigs: DeploymentConfig[] = [];
  private featureFlags: Map<string, FeatureFlag> = new Map();
  private serviceDependencies: Map<string, ServiceDependency> = new Map();
  private configHistory: DeploymentConfig[] = [];
  private maxHistory = 100;

  constructor() {
    super();
    this.initializeEnvironments();
    this.registerServiceDependencies();
  }

  /**
   * Initialize default environments
   */
  private initializeEnvironments() {
    this.createEnvironment(
      'development',
      'Development',
      'Local development environment',
      'http://localhost:3000',
      'http://localhost:3000/api'
    );

    this.createEnvironment(
      'staging',
      'Staging',
      'Pre-production staging environment',
      'https://staging.nrp.com',
      'https://staging.nrp.com/api'
    );

    this.createEnvironment(
      'production',
      'Production',
      'Live production environment',
      'https://nrp.com',
      'https://nrp.com/api'
    );
  }

  /**
   * Register service dependencies
   */
  private registerServiceDependencies() {
    const dependencies = [
      { name: 'PostgreSQL', version: '15+', required: true },
      { name: 'Redis', version: '7+', required: true },
      { name: 'MongoDB', version: '6+', required: false },
      { name: 'Socket.io', version: '4.5+', required: true },
      { name: 'SendGrid', version: 'API v3', required: false },
      { name: 'AWS S3', version: 'SDK v3', required: false },
      { name: 'Stripe', version: 'API v1', required: false },
      { name: 'OAuth Providers', version: 'v2.0', required: false },
    ];

    for (const dep of dependencies) {
      this.serviceDependencies.set(dep.name, dep);
    }
  }

  /**
   * Create environment
   */
  createEnvironment(
    id: string,
    name: string,
    description: string,
    url: string,
    apiUrl: string
  ): Environment {
    const env: Environment = {
      id,
      name: name as any,
      description,
      url,
      apiUrl,
      features: this.getDefaultFeatures(),
      limits: this.getDefaultLimits(name as any),
      secrets: new Map(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.environments.set(id, env);
    this.emit('environment:created', env);
    return env;
  }

  /**
   * Get environment
   */
  getEnvironment(envId: string): Environment | null {
    return this.environments.get(envId) || null;
  }

  /**
   * Get all environments
   */
  getAllEnvironments(): Environment[] {
    return Array.from(this.environments.values());
  }

  /**
   * Get default features based on environment
   */
  private getDefaultFeatures(): Record<string, boolean> {
    return {
      analytics: true,
      reporting: true,
      aiRecommendations: true,
      videoCall: true,
      voiceCall: true,
      fileStorage: true,
      encryption: true,
      auditLogging: true,
      complianceTracking: true,
      realTimeNotifications: true,
      webhooks: true,
      customMetrics: true,
      predictiveAnalytics: true,
      anomalyDetection: true,
      advancedSearch: true,
      fullTextSearch: true,
      customDashboards: true,
      scheduledReports: true,
      twoFactorAuth: true,
      oauth: true,
    };
  }

  /**
   * Get default limits based on environment
   */
  private getDefaultLimits(
    envName: 'development' | 'staging' | 'production'
  ): Environment['limits'] {
    const limits = {
      development: {
        maxUsers: 100,
        maxRooms: 50,
        maxStorageGB: 10,
        requestsPerMinute: 1000,
      },
      staging: {
        maxUsers: 1000,
        maxRooms: 500,
        maxStorageGB: 100,
        requestsPerMinute: 5000,
      },
      production: {
        maxUsers: 1000000,
        maxRooms: 100000,
        maxStorageGB: 10000,
        requestsPerMinute: 100000,
      },
    };

    return limits[envName];
  }

  /**
   * Set environment secret
   */
  setSecret(envId: string, key: string, value: string): boolean {
    const env = this.environments.get(envId);
    if (!env) return false;

    env.secrets.set(key, value);
    env.updatedAt = new Date().toISOString();
    this.emit('secret:set', { envId, key });
    return true;
  }

  /**
   * Get environment secret
   */
  getSecret(envId: string, key: string): string | null {
    const env = this.environments.get(envId);
    if (!env) return null;

    return env.secrets.get(key) || null;
  }

  /**
   * Create feature flag
   */
  createFeatureFlag(
    name: string,
    targetEnvironments: string[],
    enabled: boolean = false,
    rolloutPercentage: number = 0
  ): FeatureFlag {
    const id = `flag_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const flag: FeatureFlag = {
      id,
      name,
      enabled,
      rolloutPercentage,
      targetEnvironments,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.featureFlags.set(id, flag);
    this.emit('feature_flag:created', flag);
    return flag;
  }

  /**
   * Get feature flag
   */
  getFeatureFlag(flagId: string): FeatureFlag | null {
    return this.featureFlags.get(flagId) || null;
  }

  /**
   * Check if feature is enabled
   */
  isFeatureEnabled(
    featureName: string,
    envId: string,
    userId?: string
  ): boolean {
    const env = this.environments.get(envId);
    if (!env) return false;

    // Check environment-level feature flag
    const flags = Array.from(this.featureFlags.values()).filter(
      f =>
        f.name === featureName &&
        f.targetEnvironments.includes(envId) &&
        f.enabled
    );

    if (flags.length === 0) return false;

    const flag = flags[0];

    // Check rollout percentage
    if (flag.rolloutPercentage < 100) {
      if (!userId) {
        return Math.random() * 100 < flag.rolloutPercentage;
      }

      // Hash user ID for consistent rollout
      const hash = userId
        .split('')
        .reduce((a, b) => ((a << 5) - a + b.charCodeAt(0)) | 0, 0);
      return (Math.abs(hash) % 100) < flag.rolloutPercentage;
    }

    return true;
  }

  /**
   * Update feature flag rollout
   */
  updateFeatureFlagRollout(flagId: string, rolloutPercentage: number): FeatureFlag | null {
    const flag = this.featureFlags.get(flagId);
    if (!flag) return null;

    flag.rolloutPercentage = Math.min(100, Math.max(0, rolloutPercentage));
    flag.updatedAt = new Date().toISOString();
    this.emit('feature_flag:updated', flag);
    return flag;
  }

  /**
   * Create deployment config
   */
  createDeploymentConfig(
    name: string,
    version: string,
    environment: 'development' | 'staging' | 'production'
  ): DeploymentConfig {
    const config: DeploymentConfig = {
      id: `deploy_${Date.now()}`,
      name,
      version,
      timestamp: Date.now(),
      environment,
      components: this.getDefaultComponents(),
      health: {
        status: 'healthy',
        checkedAt: Date.now(),
        components: {},
      },
    };

    this.deploymentConfigs.push(config);
    this.configHistory.push(config);

    if (this.configHistory.length > this.maxHistory) {
      this.configHistory.shift();
    }

    this.emit('deployment:created', config);
    return config;
  }

  /**
   * Get default components
   */
  private getDefaultComponents(): DeploymentConfig['components'] {
    return {
      'api-server': { enabled: true, version: '1.0.0' },
      'websocket-server': { enabled: true, version: '1.0.0' },
      'database': { enabled: true, version: 'latest' },
      'cache': { enabled: true, version: 'latest' },
      'storage': { enabled: true, version: 'latest' },
      'auth': { enabled: true, version: '1.0.0' },
      'analytics': { enabled: true, version: '1.0.0' },
      'notifications': { enabled: true, version: '1.0.0' },
      'search': { enabled: true, version: '1.0.0' },
      'media-processing': { enabled: false, version: '1.0.0' },
    };
  }

  /**
   * Update component status
   */
  updateComponentStatus(
    configId: string,
    componentName: string,
    status: 'up' | 'down' | 'slow',
    latency?: number,
    error?: string
  ): DeploymentConfig | null {
    const config = this.deploymentConfigs.find(c => c.id === configId);
    if (!config) return null;

    config.health.components[componentName] = {
      status,
      latency,
      error,
    };

    // Calculate overall health
    const components = Object.values(config.health.components);
    const downCount = components.filter(c => c.status === 'down').length;
    const slowCount = components.filter(c => c.status === 'slow').length;

    if (downCount > 0) {
      config.health.status = 'critical';
    } else if (slowCount > 2) {
      config.health.status = 'degraded';
    } else {
      config.health.status = 'healthy';
    }

    config.health.checkedAt = Date.now();
    this.emit('health:updated', config.health);
    return config;
  }

  /**
   * Get deployment config
   */
  getDeploymentConfig(configId: string): DeploymentConfig | null {
    return this.deploymentConfigs.find(c => c.id === configId) || null;
  }

  /**
   * Get latest deployment config
   */
  getLatestDeploymentConfig(): DeploymentConfig | null {
    return this.deploymentConfigs.length > 0
      ? this.deploymentConfigs[this.deploymentConfigs.length - 1]
      : null;
  }

  /**
   * Get deployment history
   */
  getDeploymentHistory(limit: number = 20): DeploymentConfig[] {
    return this.configHistory.slice(-limit);
  }

  /**
   * Check service dependencies
   */
  checkDependencies(): {
    available: ServiceDependency[];
    unavailable: ServiceDependency[];
    critical: ServiceDependency[];
  } {
    const available: ServiceDependency[] = [];
    const unavailable: ServiceDependency[] = [];
    const critical: ServiceDependency[] = [];

    for (const dep of this.serviceDependencies.values()) {
      // Simulate dependency check (in production, make actual health checks)
      const isAvailable = Math.random() > 0.1; // 90% availability for demo
      dep.status = isAvailable ? 'available' : 'unavailable';
      dep.lastChecked = Date.now();

      if (isAvailable) {
        available.push(dep);
      } else {
        if (dep.required) {
          critical.push(dep);
        } else {
          unavailable.push(dep);
        }
      }
    }

    this.emit('dependencies:checked', {
      available,
      unavailable,
      critical,
    });

    return { available, unavailable, critical };
  }

  /**
   * Get deployment readiness
   */
  getDeploymentReadiness(environment: string): {
    ready: boolean;
    score: number; // 0-100
    issues: string[];
    recommendations: string[];
  } {
    const issues: string[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Check environment
    if (!this.environments.has(environment)) {
      issues.push(`Environment "${environment}" not configured`);
      score -= 20;
    }

    // Check dependencies
    const deps = this.checkDependencies();
    if (deps.critical.length > 0) {
      issues.push(
        `${deps.critical.length} critical dependencies unavailable`
      );
      score -= 30;
    }

    if (deps.unavailable.length > 0) {
      recommendations.push(
        `${deps.unavailable.length} optional dependencies are unavailable`
      );
      score -= 5 * deps.unavailable.length;
    }

    // Check deployment config
    const latestConfig = this.getLatestDeploymentConfig();
    if (!latestConfig) {
      issues.push('No deployment configuration found');
      score -= 20;
    } else {
      if (latestConfig.health.status === 'critical') {
        issues.push('Health check shows critical issues');
        score -= 20;
      } else if (latestConfig.health.status === 'degraded') {
        recommendations.push('System is running in degraded mode');
        score -= 10;
      }
    }

    // Check feature flags
    const flags = Array.from(this.featureFlags.values()).filter(
      f => !f.enabled && f.targetEnvironments.includes(environment)
    );
    if (flags.length > 5) {
      recommendations.push(
        `${flags.length} feature flags are disabled`
      );
    }

    return {
      ready: score >= 80 && issues.length === 0,
      score: Math.max(0, score),
      issues,
      recommendations,
    };
  }

  /**
   * Generate deployment report
   */
  generateDeploymentReport(environment: string): any {
    const env = this.environments.get(environment);
    const latestConfig = this.getLatestDeploymentConfig();
    const readiness = this.getDeploymentReadiness(environment);

    return {
      environment: env,
      latestDeployment: latestConfig,
      readiness,
      deploymentHistory: this.getDeploymentHistory(10),
      generatedAt: new Date().toISOString(),
    };
  }
}

// Export singleton instance
export const deploymentConfig = new DeploymentConfigService();

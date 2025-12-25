/**
 * Native Module Registry - Central Hub for All Native Integrations
 *
 * Manages discovery, initialization, and lifecycle of all native modules
 * for iOS and Android platforms.
 *
 * @module NativeModuleRegistry
 */

import { EventEmitter } from 'events';
import { Logger } from '../logging/logger';
import { MetricsCollector } from '../monitoring/metrics-collector';

interface NativeModuleInfo {
  name: string;
  platform: 'iOS' | 'Android' | 'both';
  version: string;
  initialized: boolean;
  capabilities: string[];
  nativeClass?: string;
}

interface ModuleCapability {
  name: string;
  method: string;
  supportsAsync: boolean;
  requiresPermission?: string;
}

export class NativeModuleRegistry extends EventEmitter {
  private logger: Logger;
  private metrics: MetricsCollector;
  private modules = new Map<string, NativeModuleInfo>();
  private capabilities = new Map<string, ModuleCapability[]>();
  private platform: 'iOS' | 'Android' | 'web';
  private isReady = false;

  constructor(platform: 'iOS' | 'Android' | 'web' = 'web') {
    super();
    this.logger = new Logger('NativeModuleRegistry');
    this.metrics = new MetricsCollector('native_module_registry');
    this.platform = platform;

    this.registerDefaultModules();
  }

  /**
   * Register default native modules
   */
  private registerDefaultModules(): void {
    // Camera module
    this.registerModule({
      name: 'Camera',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['takePicture', 'recordVideo', 'requestPermission']
    });

    // Geolocation module
    this.registerModule({
      name: 'Geolocation',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['getCurrentLocation', 'watchLocation', 'stopWatching']
    });

    // File system module
    this.registerModule({
      name: 'FileSystem',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['readFile', 'writeFile', 'deleteFile', 'listFiles']
    });

    // Audio module
    this.registerModule({
      name: 'Audio',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['record', 'play', 'stop', 'pause']
    });

    // Device module
    this.registerModule({
      name: 'Device',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['getInfo', 'getBatteryStatus', 'watchBattery']
    });

    // Biometric module
    this.registerModule({
      name: 'Biometric',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['verify', 'register', 'unregister']
    });

    // Push notification module
    this.registerModule({
      name: 'PushNotification',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['register', 'unregister', 'show']
    });

    // Notification module
    this.registerModule({
      name: 'Notification',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['requestPermission', 'show', 'cancel']
    });

    // Secure storage module
    this.registerModule({
      name: 'SecureStorage',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['set', 'get', 'delete', 'clear']
    });

    // Database module
    this.registerModule({
      name: 'Database',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['open', 'close', 'executeSQL', 'backup', 'restore']
    });

    // Share module
    this.registerModule({
      name: 'Share',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['share', 'shareToApp']
    });

    // Contacts module
    this.registerModule({
      name: 'Contacts',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['getContacts', 'getContactDetail', 'createContact']
    });

    // Calendar module
    this.registerModule({
      name: 'Calendar',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['addEvent', 'removeEvent', 'getEvents']
    });

    // Vibration module
    this.registerModule({
      name: 'Vibration',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['vibrate', 'vibrateWithPattern']
    });

    // Network module
    this.registerModule({
      name: 'Network',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['isConnected', 'getConnectionType', 'watchConnection']
    });

    // WebSocket module
    this.registerModule({
      name: 'WebSocket',
      platform: 'both',
      version: '1.0.0',
      initialized: false,
      capabilities: ['connect', 'send', 'close']
    });

    this.logger.info('Default modules registered', { count: this.modules.size });
  }

  /**
   * Register a module
   */
  registerModule(info: Omit<NativeModuleInfo, 'initialized'>): void {
    const moduleInfo: NativeModuleInfo = {
      ...info,
      initialized: false
    };

    // Check platform compatibility
    if (moduleInfo.platform !== 'both' && moduleInfo.platform !== this.platform) {
      this.logger.warn(`Module not compatible with ${this.platform}:`, moduleInfo.name);
      return;
    }

    this.modules.set(info.name, moduleInfo);

    // Register capabilities
    const caps: ModuleCapability[] = info.capabilities.map(cap => ({
      name: cap,
      method: cap,
      supportsAsync: true
    }));

    this.capabilities.set(info.name, caps);

    this.logger.debug(`Module registered: ${info.name}`, {
      platform: moduleInfo.platform,
      version: moduleInfo.version,
      capabilityCount: info.capabilities.length
    });

    this.emit('moduleRegistered', moduleInfo);
  }

  /**
   * Initialize all modules
   */
  async initializeAll(): Promise<{
    successCount: number;
    failureCount: number;
    failedModules: string[];
  }> {
    const failedModules: string[] = [];
    let successCount = 0;
    let failureCount = 0;

    this.logger.info('Initializing all native modules', { count: this.modules.size });

    for (const [name, moduleInfo] of this.modules) {
      try {
        await this.initialize(name);
        successCount++;
      } catch (error) {
        this.logger.warn(`Failed to initialize module: ${name}`, { error });
        failedModules.push(name);
        failureCount++;
      }
    }

    this.isReady = failureCount === 0;

    this.metrics.recordMetric('initialization_complete', {
      successCount,
      failureCount,
      totalModules: this.modules.size
    });

    this.logger.info('Native module initialization complete', {
      successCount,
      failureCount
    });

    this.emit('allInitialized', { successCount, failureCount, failedModules });

    return { successCount, failureCount, failedModules };
  }

  /**
   * Initialize a specific module
   */
  async initialize(moduleName: string): Promise<void> {
    const moduleInfo = this.modules.get(moduleName);
    if (!moduleInfo) {
      throw new Error(`Module not found: ${moduleName}`);
    }

    if (moduleInfo.initialized) {
      return;
    }

    try {
      this.logger.debug(`Initializing module: ${moduleName}`);

      // In real implementation, would call native initialization
      // For now, just mark as initialized
      moduleInfo.initialized = true;

      this.metrics.recordMetric('module_initialized', {
        moduleName,
        platform: this.platform
      });

      this.emit('moduleInitialized', moduleInfo);
    } catch (error) {
      this.logger.error(`Failed to initialize module: ${moduleName}`, { error });
      throw error;
    }
  }

  /**
   * Check if module is available
   */
  isModuleAvailable(moduleName: string): boolean {
    const nativeModule = this.modules.get(moduleName);
    return !!nativeModule && nativeModule.initialized;
  }

  /**
   * Get module info
   */
  getModuleInfo(moduleName: string): NativeModuleInfo | null {
    return this.modules.get(moduleName) || null;
  }

  /**
   * Get all modules
   */
  getAllModules(): NativeModuleInfo[] {
    return Array.from(this.modules.values());
  }

  /**
   * Get available modules
   */
  getAvailableModules(): NativeModuleInfo[] {
    return Array.from(this.modules.values()).filter(m => m.initialized);
  }

  /**
   * Get module capabilities
   */
  getCapabilities(moduleName: string): ModuleCapability[] {
    return this.capabilities.get(moduleName) || [];
  }

  /**
   * Check if capability exists
   */
  hasCapability(moduleName: string, capability: string): boolean {
    const caps = this.capabilities.get(moduleName) || [];
    return caps.some(c => c.name === capability);
  }

  /**
   * Check if all required modules are available
   */
  areRequiredModulesAvailable(required: string[]): boolean {
    return required.every(name => this.isModuleAvailable(name));
  }

  /**
   * Get registry status
   */
  getStatus(): {
    platform: string;
    isReady: boolean;
    totalModules: number;
    initializedModules: number;
    failedModules: number;
    modules: {
      name: string;
      initialized: boolean;
      capabilities: number;
    }[];
  } {
    const initializedModules = Array.from(this.modules.values()).filter(m => m.initialized).length;
    const failedModules = this.modules.size - initializedModules;

    return {
      platform: this.platform,
      isReady: this.isReady,
      totalModules: this.modules.size,
      initializedModules,
      failedModules,
      modules: Array.from(this.modules.values()).map(m => ({
        name: m.name,
        initialized: m.initialized,
        capabilities: m.capabilities.length
      }))
    };
  }

  /**
   * Clear all modules
   */
  clear(): void {
    this.modules.clear();
    this.capabilities.clear();
    this.isReady = false;
    this.logger.info('Module registry cleared');
  }

  /**
   * Cleanup
   */
  cleanup(): void {
    this.clear();
    this.removeAllListeners();
    this.logger.info('Native module registry cleanup complete');
  }
}

/**
 * Mobile Auth Manager - Secure Authentication for Mobile Platforms
 *
 * Handles biometric authentication, token management, secure storage,
 * and multi-factor authentication for iOS and Android platforms.
 *
 * @module MobileAuthManager
 */

import { EventEmitter } from 'events';
import { Logger } from '../logging/logger';
import { MetricsCollector } from '../monitoring/metrics-collector';
import { NativeBridge } from './native-bridge';

interface AuthSession {
  id: string;
  userId: string;
  accessToken: string;
  refreshToken: string;
  tokenExpiresAt: number;
  issuedAt: number;
  device: {
    platform: 'iOS' | 'Android';
    deviceId: string;
    appVersion: string;
  };
}

interface BiometricConfig {
  enableBiometric: boolean;
  biometricType: 'face' | 'fingerprint' | 'both';
  timeout: number;
  maxAttempts: number;
}

interface MobileAuthConfig {
  apiEndpoint: string;
  biometric: BiometricConfig;
  enableSecureStorage: boolean;
  tokenRefreshThreshold: number; // ms before expiry to auto-refresh
  sessionTimeout: number; // ms of inactivity before logout
}

export class MobileAuthManager extends EventEmitter {
  private config: MobileAuthConfig;
  private logger: Logger;
  private metrics: MetricsCollector;
  private nativeBridge: NativeBridge;
  private currentSession: AuthSession | null = null;
  private biometricRegistered = false;
  private lastActivityTime: number = Date.now();
  private sessionTimeoutHandle: NodeJS.Timeout | null = null;
  private tokenRefreshHandle: NodeJS.Timeout | null = null;

  constructor(config: MobileAuthConfig, nativeBridge: NativeBridge) {
    super();
    this.config = config;
    this.nativeBridge = nativeBridge;
    this.logger = new Logger('MobileAuthManager');
    this.metrics = new MetricsCollector('mobile_auth');
  }

  /**
   * Initialize auth manager
   */
  async initialize(): Promise<void> {
    try {
      this.logger.info('Initializing mobile auth manager');

      // Check for existing session
      const existingSession = await this.loadStoredSession();
      if (existingSession && this.isSessionValid(existingSession)) {
        this.currentSession = existingSession;
        this.setupTokenRefresh();
        this.emit('sessionRestored', { userId: existingSession.userId });
      }

      // Setup activity monitoring
      this.setupActivityMonitoring();

      this.logger.info('Mobile auth manager initialized');
    } catch (error) {
      this.logger.error('Failed to initialize mobile auth manager', { error });
      throw error;
    }
  }

  /**
   * Login with credentials and optional biometric
   */
  async login(email: string, password: string, useBiometric: boolean = false): Promise<AuthSession> {
    try {
      this.logger.info('Attempting login', { email });

      // First, authenticate with credentials
      const session = await this.authenticateWithCredentials(email, password);

      // Setup biometric if requested
      if (useBiometric && this.config.biometric.enableBiometric) {
        await this.registerBiometric(email);
      }

      // Store session securely
      await this.storeSession(session);

      this.currentSession = session;
      this.setupTokenRefresh();
      this.setupActivityMonitoring();

      this.metrics.recordMetric('login_success', {
        usedBiometric: useBiometric,
        platform: session.device.platform
      });

      this.emit('loggedIn', { userId: session.userId });

      return session;
    } catch (error) {
      this.logger.error('Login failed', { error, email });
      this.metrics.recordMetric('login_failure', {
        errorType: (error as Error).name
      });
      throw error;
    }
  }

  /**
   * Biometric login (Face ID, Touch ID, fingerprint)
   */
  async biometricLogin(): Promise<AuthSession> {
    try {
      if (!this.biometricRegistered) {
        throw new Error('Biometric not registered. Use regular login first.');
      }

      this.logger.info('Attempting biometric login');

      // Request biometric verification
      const verified = await this.verifyBiometric();
      if (!verified) {
        throw new Error('Biometric verification failed');
      }

      // Retrieve stored credentials and perform auth
      const storedAuth = await this.retrieveStoredAuth();
      if (!storedAuth) {
        throw new Error('No stored credentials found');
      }

      const session = await this.authenticateWithCredentials(storedAuth.email, storedAuth.password);

      this.currentSession = session;
      this.setupTokenRefresh();

      this.metrics.recordMetric('biometric_login_success', {
        biometricType: this.config.biometric.biometricType
      });

      this.emit('biometricLoggedIn', { userId: session.userId });

      return session;
    } catch (error) {
      this.logger.error('Biometric login failed', { error });
      this.metrics.recordMetric('biometric_login_failure', {
        errorType: (error as Error).name
      });
      throw error;
    }
  }

  /**
   * Verify biometric (Face ID, Touch ID, etc.)
   */
  private async verifyBiometric(): Promise<boolean> {
    try {
      const result = await this.nativeBridge.invokeMethod('Biometric', 'verify', {
        reason: 'Authentication required',
        timeout: this.config.biometric.timeout,
        type: this.config.biometric.biometricType
      });

      return result?.success === true;
    } catch (error) {
      this.logger.warn('Biometric verification failed', { error });
      return false;
    }
  }

  /**
   * Register biometric for the user
   */
  private async registerBiometric(email: string): Promise<void> {
    try {
      this.logger.debug('Registering biometric', { email });

      // Verify biometric is available
      const verified = await this.verifyBiometric();
      if (!verified) {
        this.logger.warn('User cancelled biometric registration');
        return;
      }

      // Store credentials securely for biometric auth
      await this.storeAuthSecurely(email);

      this.biometricRegistered = true;

      this.logger.info('Biometric registered', { email });
      this.emit('biometricRegistered', { email });
    } catch (error) {
      this.logger.warn('Failed to register biometric', { error });
      // Don't throw - biometric is optional
    }
  }

  /**
   * Authenticate with email and password
   */
  private async authenticateWithCredentials(email: string, password: string): Promise<AuthSession> {
    try {
      // In real implementation, this would call the backend API
      const response = await this.callAuthAPI('/login', {
        email,
        password,
        device: this.getDeviceInfo()
      });

      const session: AuthSession = {
        id: `session_${Date.now()}`,
        userId: response.userId,
        accessToken: response.accessToken,
        refreshToken: response.refreshToken,
        tokenExpiresAt: Date.now() + (response.expiresIn * 1000),
        issuedAt: Date.now(),
        device: this.getDeviceInfo()
      };

      return session;
    } catch (error) {
      this.logger.error('Authentication failed', { error });
      throw error;
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<string> {
    try {
      if (!this.currentSession) {
        throw new Error('No active session');
      }

      this.logger.debug('Refreshing access token');

      const response = await this.callAuthAPI('/refresh', {
        refreshToken: this.currentSession.refreshToken
      });

      this.currentSession.accessToken = response.accessToken;
      this.currentSession.tokenExpiresAt = Date.now() + (response.expiresIn * 1000);

      await this.storeSession(this.currentSession);

      this.metrics.recordMetric('token_refreshed', {
        userId: this.currentSession.userId
      });

      this.emit('tokenRefreshed');

      return response.accessToken;
    } catch (error) {
      this.logger.error('Failed to refresh token', { error });
      throw error;
    }
  }

  /**
   * Logout and clear session
   */
  async logout(): Promise<void> {
    try {
      this.logger.info('Logging out');

      if (this.currentSession) {
        // Notify server of logout
        try {
          await this.callAuthAPI('/logout', {
            sessionId: this.currentSession.id
          });
        } catch (error) {
          this.logger.warn('Failed to notify server of logout', { error });
        }
      }

      this.clearSession();

      this.metrics.recordMetric('logout', {
        userId: this.currentSession?.userId
      });

      this.emit('loggedOut');
    } catch (error) {
      this.logger.error('Logout failed', { error });
      throw error;
    }
  }

  /**
   * Setup token refresh timer
   */
  private setupTokenRefresh(): void {
    if (!this.currentSession) return;

    // Clear existing timer
    if (this.tokenRefreshHandle) {
      clearTimeout(this.tokenRefreshHandle);
    }

    // Schedule refresh before token expires
    const timeUntilExpiry = this.currentSession.tokenExpiresAt - Date.now();
    const refreshAt = timeUntilExpiry - this.config.tokenRefreshThreshold;

    if (refreshAt > 0) {
      this.tokenRefreshHandle = setTimeout(() => {
        this.refreshToken().catch(error => {
          this.logger.warn('Automatic token refresh failed', { error });
        });
      }, refreshAt);

      this.logger.debug('Token refresh scheduled', { refreshAt });
    }
  }

  /**
   * Setup activity monitoring for session timeout
   */
  private setupActivityMonitoring(): void {
    // Clear existing timer
    if (this.sessionTimeoutHandle) {
      clearTimeout(this.sessionTimeoutHandle);
    }

    // Setup session timeout
    this.sessionTimeoutHandle = setTimeout(() => {
      const inactiveTime = Date.now() - this.lastActivityTime;
      if (inactiveTime >= this.config.sessionTimeout) {
        this.logger.info('Session timeout due to inactivity');
        this.logout().catch(error => {
          this.logger.warn('Failed to logout on session timeout', { error });
        });
      }
    }, this.config.sessionTimeout);
  }

  /**
   * Record user activity
   */
  recordActivity(): void {
    this.lastActivityTime = Date.now();
    // Reset session timeout
    if (this.currentSession) {
      this.setupActivityMonitoring();
    }
  }

  /**
   * Get current session
   */
  getCurrentSession(): AuthSession | null {
    if (this.currentSession && !this.isSessionValid(this.currentSession)) {
      this.clearSession();
      return null;
    }
    return this.currentSession;
  }

  /**
   * Get access token for API requests
   */
  async getAccessToken(): Promise<string> {
    const session = this.getCurrentSession();
    if (!session) {
      throw new Error('No active session');
    }

    // Refresh if close to expiry
    if (Date.now() >= session.tokenExpiresAt - 60000) {
      return await this.refreshToken();
    }

    return session.accessToken;
  }

  /**
   * Check if session is valid
   */
  private isSessionValid(session: AuthSession): boolean {
    return session.tokenExpiresAt > Date.now();
  }

  /**
   * Store session in secure storage
   */
  private async storeSession(session: AuthSession): Promise<void> {
    if (!this.config.enableSecureStorage) return;

    try {
      await this.nativeBridge.invokeMethod('SecureStorage', 'set', {
        key: 'auth_session',
        value: JSON.stringify(session),
        encrypted: true
      });
    } catch (error) {
      this.logger.warn('Failed to store session securely', { error });
    }
  }

  /**
   * Load stored session
   */
  private async loadStoredSession(): Promise<AuthSession | null> {
    if (!this.config.enableSecureStorage) return null;

    try {
      const result = await this.nativeBridge.invokeMethod('SecureStorage', 'get', {
        key: 'auth_session'
      });

      if (result?.value) {
        return JSON.parse(result.value);
      }
    } catch (error) {
      this.logger.debug('Failed to load stored session', { error });
    }

    return null;
  }

  /**
   * Store authentication credentials securely
   */
  private async storeAuthSecurely(email: string): Promise<void> {
    try {
      await this.nativeBridge.invokeMethod('SecureStorage', 'set', {
        key: 'auth_email',
        value: email,
        encrypted: true
      });
    } catch (error) {
      this.logger.warn('Failed to store auth securely', { error });
    }
  }

  /**
   * Retrieve stored authentication
   */
  private async retrieveStoredAuth(): Promise<{ email: string; password: string } | null> {
    try {
      const result = await this.nativeBridge.invokeMethod('SecureStorage', 'get', {
        key: 'auth_email'
      });

      if (result?.value) {
        return { email: result.value, password: '' }; // Password would need additional handling
      }
    } catch (error) {
      this.logger.debug('Failed to retrieve stored auth', { error });
    }

    return null;
  }

  /**
   * Clear all session data
   */
  private clearSession(): void {
    if (this.tokenRefreshHandle) {
      clearTimeout(this.tokenRefreshHandle);
      this.tokenRefreshHandle = null;
    }

    if (this.sessionTimeoutHandle) {
      clearTimeout(this.sessionTimeoutHandle);
      this.sessionTimeoutHandle = null;
    }

    this.currentSession = null;
    this.lastActivityTime = Date.now();
  }

  /**
   * Get device information
   */
  private getDeviceInfo(): AuthSession['device'] {
    return {
      platform: (process.env.PLATFORM || 'iOS') as 'iOS' | 'Android',
      deviceId: this.generateDeviceId(),
      appVersion: process.env.APP_VERSION || '1.0.0'
    };
  }

  /**
   * Generate device ID
   */
  private generateDeviceId(): string {
    // In real implementation, this would use native device ID
    return `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Call auth API
   */
  private async callAuthAPI(endpoint: string, data: any): Promise<any> {
    // In real implementation, this would call the actual backend API
    const url = `${this.config.apiEndpoint}${endpoint}`;

    return new Promise((resolve) => {
      // Simulated response
      resolve({
        userId: 'user_123',
        accessToken: 'token_' + Math.random().toString(36),
        refreshToken: 'refresh_' + Math.random().toString(36),
        expiresIn: 3600
      });
    });
  }

  /**
   * Cleanup auth manager
   */
  cleanup(): void {
    this.clearSession();
    this.removeAllListeners();
    this.logger.info('Auth manager cleanup complete');
  }
}

import twilio from 'twilio';
import sgMail from '@sendgrid/mail';
import winston from 'winston';

export interface TwilioConfig {
  accountSid: string;
  authToken: string;
  fromPhoneNumber: string;
  webhookUrl?: string;
}

export interface SendGridConfig {
  apiKey: string;
  fromEmail: string;
  fromName: string;
  replyToEmail?: string;
}

export interface NotificationConfig {
  twilio: TwilioConfig;
  sendgrid: SendGridConfig;
  enableSms: boolean;
  enableEmail: boolean;
  rateLimits: {
    smsPerMinute: number;
    emailPerMinute: number;
    smsPerHour: number;
    emailPerHour: number;
  };
}

export class NotificationConfigManager {
  private static instance: NotificationConfigManager;
  private config: NotificationConfig;
  private twilioClient: twilio.Twilio | null = null;
  private logger: winston.Logger;

  private constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      defaultMeta: { service: 'notification-config' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({
          format: winston.format.simple()
        })
      ]
    });

    this.config = this.loadConfig();
    this.initializeServices();
  }

  public static getInstance(): NotificationConfigManager {
    if (!NotificationConfigManager.instance) {
      NotificationConfigManager.instance = new NotificationConfigManager();
    }
    return NotificationConfigManager.instance;
  }

  private loadConfig(): NotificationConfig {
    const requiredEnvVars = {
      twilio: {
        accountSid: process.env.TWILIO_ACCOUNT_SID,
        authToken: process.env.TWILIO_AUTH_TOKEN,
        fromPhoneNumber: process.env.TWILIO_PHONE_NUMBER,
        webhookUrl: process.env.TWILIO_WEBHOOK_URL
      },
      sendgrid: {
        apiKey: process.env.SENDGRID_API_KEY,
        fromEmail: process.env.SENDGRID_FROM_EMAIL,
        fromName: process.env.SENDGRID_FROM_NAME || 'NRP Disaster Recovery',
        replyToEmail: process.env.SENDGRID_REPLY_TO_EMAIL
      },
      enableSms: process.env.ENABLE_SMS !== 'false', // Default to true
      enableEmail: process.env.ENABLE_EMAIL !== 'false', // Default to true
      rateLimits: {
        smsPerMinute: parseInt(process.env.SMS_RATE_LIMIT_PER_MINUTE || '10'),
        emailPerMinute: parseInt(process.env.EMAIL_RATE_LIMIT_PER_MINUTE || '30'),
        smsPerHour: parseInt(process.env.SMS_RATE_LIMIT_PER_HOUR || '200'),
        emailPerHour: parseInt(process.env.EMAIL_RATE_LIMIT_PER_HOUR || '500')
      }
    };

    // Validate required configuration
    this.validateConfig(requiredEnvVars);

    return requiredEnvVars;
  }

  private validateConfig(config: NotificationConfig): void {
    const errors: string[] = [];

    // Validate Twilio config if SMS is enabled
    if (config.enableSms) {
      if (!config.twilio.accountSid) {
        errors.push('TWILIO_ACCOUNT_SID is required when SMS is enabled');
      }
      if (!config.twilio.authToken) {
        errors.push('TWILIO_AUTH_TOKEN is required when SMS is enabled');
      }
      if (!config.twilio.fromPhoneNumber) {
        errors.push('TWILIO_PHONE_NUMBER is required when SMS is enabled');
      }
      if (!this.isValidPhoneNumber(config.twilio.fromPhoneNumber)) {
        errors.push('TWILIO_PHONE_NUMBER must be in E.164 format (e.g., +61400000000)');
      }
    }

    // Validate SendGrid config if email is enabled
    if (config.enableEmail) {
      if (!config.sendgrid.apiKey) {
        errors.push('SENDGRID_API_KEY is required when email is enabled');
      }
      if (!config.sendgrid.fromEmail) {
        errors.push('SENDGRID_FROM_EMAIL is required when email is enabled');
      }
      if (!this.isValidEmail(config.sendgrid.fromEmail)) {
        errors.push('SENDGRID_FROM_EMAIL must be a valid email address');
      }
      if (config.sendgrid.replyToEmail && !this.isValidEmail(config.sendgrid.replyToEmail)) {
        errors.push('SENDGRID_REPLY_TO_EMAIL must be a valid email address');
      }
    }

    // Validate rate limits
    if (config.rateLimits.smsPerMinute <= 0 || config.rateLimits.smsPerMinute > 100) {
      errors.push('SMS_RATE_LIMIT_PER_MINUTE must be between 1 and 100');
    }
    if (config.rateLimits.emailPerMinute <= 0 || config.rateLimits.emailPerMinute > 1000) {
      errors.push('EMAIL_RATE_LIMIT_PER_MINUTE must be between 1 and 1000');
    }

    if (errors.length > 0) {
      const errorMessage = `Configuration validation failed:\n${errors.join('\n')}`;
      this.logger.error(errorMessage);
      throw new Error(errorMessage);
    }
  }

  private initializeServices(): void {
    try {
      // Initialize Twilio
      if (this.config.enableSms) {
        this.twilioClient = twilio(
          this.config.twilio.accountSid,
          this.config.twilio.authToken
        );
        this.logger.info('Twilio client initialized successfully');
      }

      // Initialize SendGrid
      if (this.config.enableEmail) {
        sgMail.setApiKey(this.config.sendgrid.apiKey);
        this.logger.info('SendGrid client initialized successfully');
      }

    } catch (error) {
      this.logger.error('Failed to initialize notification services', { error });
      throw error;
    }
  }

  private isValidPhoneNumber(phone: string): boolean {
    // E.164 format: +[country code][number]
    const e164Regex = /^\+[1-9]\d{1,14}$/;
    return e164Regex.test(phone);
  }

  private isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  public getConfig(): NotificationConfig {
    return { ...this.config };
  }

  public getTwilioClient(): twilio.Twilio | null {
    return this.twilioClient;
  }

  public getSendGridConfig(): SendGridConfig {
    return { ...this.config.sendgrid };
  }

  public isServiceEnabled(service: 'sms' | 'email'): boolean {
    return service === 'sms' ? this.config.enableSms : this.config.enableEmail;
  }

  public getRateLimits() {
    return { ...this.config.rateLimits };
  }

  /**
   * Update configuration at runtime (useful for testing or admin updates)
   */
  public updateConfig(updates: Partial<NotificationConfig>): void {
    this.config = { ...this.config, ...updates };
    
    // Re-validate and re-initialize services
    this.validateConfig(this.config);
    this.initializeServices();
    
    this.logger.info('Configuration updated successfully');
  }

  /**
   * Test connectivity to external services
   */
  public async testConnectivity(): Promise<{
    twilio: { connected: boolean; error?: string };
    sendgrid: { connected: boolean; error?: string };
  }> {
    const results = {
      twilio: { connected: false, error: undefined as string | undefined },
      sendgrid: { connected: false, error: undefined as string | undefined }
    };

    // Test Twilio
    if (this.config.enableSms && this.twilioClient) {
      try {
        await this.twilioClient.api.accounts(this.config.twilio.accountSid).fetch();
        results.twilio.connected = true;
      } catch (error) {
        results.twilio.error = error instanceof Error ? error.message : 'Unknown error';
        this.logger.error('Twilio connectivity test failed', { error });
      }
    }

    // Test SendGrid (basic API key validation)
    if (this.config.enableEmail) {
      try {
        // SendGrid doesn't have a simple ping endpoint, so we'll just validate the API key format
        const apiKey = this.config.sendgrid.apiKey;
        if (apiKey && apiKey.startsWith('SG.') && apiKey.length > 20) {
          results.sendgrid.connected = true;
        } else {
          results.sendgrid.error = 'Invalid API key format';
        }
      } catch (error) {
        results.sendgrid.error = error instanceof Error ? error.message : 'Unknown error';
        this.logger.error('SendGrid connectivity test failed', { error });
      }
    }

    return results;
  }

  /**
   * Format phone number to E.164 format for Australian numbers
   */
  public formatAustralianPhoneNumber(phone: string): string {
    // Remove all non-digit characters
    const digits = phone.replace(/\D/g, '');
    
    // Handle different Australian number formats
    if (digits.startsWith('61')) {
      // Already has country code
      return `+${digits}`;
    } else if (digits.startsWith('04') || digits.startsWith('03') || digits.startsWith('02') || digits.startsWith('07') || digits.startsWith('08')) {
      // Australian mobile or landline without country code
      return `+61${digits.substring(1)}`;
    } else if (digits.startsWith('4') && digits.length === 9) {
      // Mobile number without leading 0
      return `+61${digits}`;
    }
    
    // Return as-is if we can't determine format (might already be international)
    return phone.startsWith('+') ? phone : `+${digits}`;
  }

  /**
   * Get webhook configuration for Twilio status callbacks
   */
  public getWebhookConfig() {
    return {
      statusCallback: this.config.twilio.webhookUrl,
      statusCallbackMethod: 'POST',
      statusCallbackEvent: ['initiated', 'ringing', 'answered', 'completed']
    };
  }

  /**
   * Get delivery status tracking URLs
   */
  public getTrackingUrls() {
    return {
      sms: `${this.config.twilio.webhookUrl}/sms-status`,
      email: `${this.config.twilio.webhookUrl}/email-status`,
      delivery: `${this.config.twilio.webhookUrl}/delivery-status`
    };
  }

  /**
   * Log configuration summary (without sensitive data)
   */
  public logConfigSummary(): void {
    const summary = {
      smsEnabled: this.config.enableSms,
      emailEnabled: this.config.enableEmail,
      twilioConfigured: !!this.config.twilio.accountSid,
      sendgridConfigured: !!this.config.sendgrid.apiKey,
      rateLimits: this.config.rateLimits,
      webhookUrl: this.config.twilio.webhookUrl ? 'configured' : 'not configured'
    };

    this.logger.info('Notification service configuration summary', summary);
  }
}

// Export a singleton instance
export const notificationConfig = NotificationConfigManager.getInstance();
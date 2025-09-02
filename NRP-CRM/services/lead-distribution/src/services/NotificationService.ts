import twilio from 'twilio';
import sgMail from '@sendgrid/mail';
import { notificationConfig } from '../config/twilio';
import { getQueueManager, NotificationMessage, QueueManager } from '../utils/queue';
import winston from 'winston';
import Redis from 'redis';

export interface SmsOptions {
  to: string;
  body: string;
  from?: string;
  mediaUrls?: string[];
  statusCallback?: string;
  maxPrice?: string;
  provideFeedback?: boolean;
  attemptId?: string;
}

export interface EmailOptions {
  to: string | string[];
  subject: string;
  html?: string;
  text?: string;
  from?: {
    email: string;
    name?: string;
  };
  replyTo?: string;
  cc?: string[];
  bcc?: string[];
  attachments?: Array<{
    content: string;
    filename: string;
    type?: string;
    disposition?: 'attachment' | 'inline';
    contentId?: string;
  }>;
  templateId?: string;
  dynamicTemplateData?: { [key: string]: any };
  categories?: string[];
  customArgs?: { [key: string]: string };
  sendAt?: number;
}

export interface NotificationTemplate {
  id: string;
  name: string;
  type: 'sms' | 'email';
  subject?: string;
  body: string;
  variables: string[];
  isActive: boolean;
}

export interface NotificationResult {
  success: boolean;
  messageId?: string;
  error?: string;
  cost?: number;
  provider: 'twilio' | 'sendgrid';
  timestamp: Date;
  deliveryStatus?: 'pending' | 'sent' | 'delivered' | 'failed';
}

export interface LeadNotificationData {
  leadId: string;
  contractorId: string;
  contractorName: string;
  contractorPhone: string;
  contractorEmail: string;
  leadTitle: string;
  leadDescription: string;
  serviceType: string[];
  priority: string;
  location: {
    address: string;
    suburb: string;
    city: string;
    state: string;
    postcode: string;
  };
  clientName: string;
  clientPhone: string;
  estimatedValue: number;
  distance: number;
  travelTime: number;
  acceptUrl: string;
  declineUrl: string;
  expiresAt: Date;
  isEmergency: boolean;
}

export class NotificationService {
  private twilioClient: twilio.Twilio | null = null;
  private logger: winston.Logger;
  private queueManager: QueueManager;
  private redisClient: Redis.RedisClientType | null = null;
  private rateLimitWindow = 60 * 1000; // 1 minute
  private templates: Map<string, NotificationTemplate> = new Map();

  // Rate limiting counters
  private smsCount = new Map<string, number>();
  private emailCount = new Map<string, number>();

  constructor() {
    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      defaultMeta: { service: 'notification-service' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({
          format: winston.format.simple()
        })
      ]
    });

    this.queueManager = getQueueManager();
    this.initializeServices();
    this.loadTemplates();
    this.startRateLimitCleanup();
  }

  private async initializeServices(): Promise<void> {
    try {
      // Initialize Twilio
      if (notificationConfig.isServiceEnabled('sms')) {
        this.twilioClient = notificationConfig.getTwilioClient();
      }

      // Initialize Redis for rate limiting and caching
      if (process.env.REDIS_URL) {
        this.redisClient = Redis.createClient({
          url: process.env.REDIS_URL
        });
        await this.redisClient.connect();
        this.logger.info('Redis client connected for rate limiting');
      }

      this.logger.info('Notification services initialized');
    } catch (error) {
      this.logger.error('Failed to initialize notification services', { error });
      throw error;
    }
  }

  /**
   * Send SMS notification to contractor about new lead
   */
  async sendLeadNotificationSms(data: LeadNotificationData): Promise<NotificationResult> {
    if (!notificationConfig.isServiceEnabled('sms') || !this.twilioClient) {
      throw new Error('SMS service is not enabled or configured');
    }

    // Check rate limits
    const rateLimitCheck = await this.checkSmsRateLimit(data.contractorPhone);
    if (!rateLimitCheck.allowed) {
      return {
        success: false,
        error: `Rate limit exceeded. Try again in ${rateLimitCheck.retryAfter} seconds`,
        provider: 'twilio',
        timestamp: new Date()
      };
    }

    try {
      const template = this.getTemplate('lead-notification-sms');
      const message = this.renderTemplate(template, data);

      const smsOptions: SmsOptions = {
        to: notificationConfig.formatAustralianPhoneNumber(data.contractorPhone),
        body: message,
        statusCallback: `${process.env.WEBHOOK_BASE_URL}/webhooks/sms-status`
      };

      const result = await this.sendSms(smsOptions);
      
      if (result.success) {
        await this.recordSmsUsage(data.contractorPhone);
      }

      return result;

    } catch (error) {
      this.logger.error('Failed to send lead notification SMS', {
        contractorId: data.contractorId,
        leadId: data.leadId,
        error
      });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        provider: 'twilio',
        timestamp: new Date()
      };
    }
  }

  /**
   * Send email notification to contractor about new lead
   */
  async sendLeadNotificationEmail(data: LeadNotificationData): Promise<NotificationResult> {
    if (!notificationConfig.isServiceEnabled('email')) {
      throw new Error('Email service is not enabled or configured');
    }

    // Check rate limits
    const rateLimitCheck = await this.checkEmailRateLimit(data.contractorEmail);
    if (!rateLimitCheck.allowed) {
      return {
        success: false,
        error: `Rate limit exceeded. Try again in ${rateLimitCheck.retryAfter} seconds`,
        provider: 'sendgrid',
        timestamp: new Date()
      };
    }

    try {
      const template = this.getTemplate('lead-notification-email');
      const htmlTemplate = this.getTemplate('lead-notification-email-html');

      const emailOptions: EmailOptions = {
        to: data.contractorEmail,
        subject: `New Lead Alert: ${data.leadTitle} - ${data.location.suburb}`,
        text: this.renderTemplate(template, data),
        html: this.renderTemplate(htmlTemplate, data),
        categories: ['lead-notification', data.priority],
        customArgs: {
          leadId: data.leadId,
          contractorId: data.contractorId,
          notificationType: 'lead-alert'
        }
      };

      const result = await this.sendEmail(emailOptions);
      
      if (result.success) {
        await this.recordEmailUsage(data.contractorEmail);
      }

      return result;

    } catch (error) {
      this.logger.error('Failed to send lead notification email', {
        contractorId: data.contractorId,
        leadId: data.leadId,
        error
      });
      
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error',
        provider: 'sendgrid',
        timestamp: new Date()
      };
    }
  }

  /**
   * Send SMS message
   */
  async sendSms(options: SmsOptions): Promise<NotificationResult> {
    if (!this.twilioClient) {
      throw new Error('Twilio client not initialized');
    }

    try {
      const message = await this.twilioClient.messages.create({
        to: options.to,
        from: options.from || notificationConfig.getConfig().twilio.fromPhoneNumber,
        body: options.body,
        mediaUrl: options.mediaUrls,
        statusCallback: options.statusCallback,
        maxPrice: options.maxPrice,
        provideFeedback: options.provideFeedback
      });

      this.logger.info('SMS sent successfully', {
        messageId: message.sid,
        to: options.to,
        status: message.status
      });

      return {
        success: true,
        messageId: message.sid,
        provider: 'twilio',
        timestamp: new Date(),
        deliveryStatus: 'pending'
      };

    } catch (error: any) {
      this.logger.error('Failed to send SMS', {
        to: options.to,
        error: error.message
      });

      return {
        success: false,
        error: error.message,
        provider: 'twilio',
        timestamp: new Date()
      };
    }
  }

  /**
   * Send email message
   */
  async sendEmail(options: EmailOptions): Promise<NotificationResult> {
    try {
      const config = notificationConfig.getSendGridConfig();
      
      const emailData: sgMail.MailDataRequired = {
        to: options.to,
        from: options.from || {
          email: config.fromEmail,
          name: config.fromName
        },
        subject: options.subject,
        text: options.text,
        html: options.html,
        replyTo: options.replyTo || config.replyToEmail,
        cc: options.cc,
        bcc: options.bcc,
        attachments: options.attachments,
        templateId: options.templateId,
        dynamicTemplateData: options.dynamicTemplateData,
        categories: options.categories,
        customArgs: options.customArgs,
        sendAt: options.sendAt
      };

      const response = await sgMail.send(emailData);

      this.logger.info('Email sent successfully', {
        messageId: response[0].headers['x-message-id'],
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject
      });

      return {
        success: true,
        messageId: response[0].headers['x-message-id'],
        provider: 'sendgrid',
        timestamp: new Date(),
        deliveryStatus: 'pending'
      };

    } catch (error: any) {
      this.logger.error('Failed to send email', {
        to: options.to,
        subject: options.subject,
        error: error.message
      });

      return {
        success: false,
        error: error.message,
        provider: 'sendgrid',
        timestamp: new Date()
      };
    }
  }

  /**
   * Queue notification for later processing
   */
  async queueNotification(message: NotificationMessage): Promise<void> {
    try {
      await this.queueManager.publishNotification(message);
      this.logger.info('Notification queued successfully', {
        type: message.type,
        recipient: message.recipient,
        trackingId: message.trackingId
      });
    } catch (error) {
      this.logger.error('Failed to queue notification', {
        message,
        error
      });
      throw error;
    }
  }

  /**
   * Process queued SMS notifications
   */
  async processQueuedSmsNotifications(): Promise<void> {
    await this.queueManager.subscribeToSmsNotifications(async (message) => {
      try {
        if (!message.recipient.phone) {
          throw new Error('Phone number is required for SMS notification');
        }

        const smsOptions: SmsOptions = {
          to: message.recipient.phone,
          body: message.content.body
        };

        const result = await this.sendSms(smsOptions);
        
        if (!result.success) {
          throw new Error(result.error);
        }

        this.logger.info('Queued SMS processed successfully', {
          trackingId: message.trackingId,
          messageId: result.messageId
        });

      } catch (error) {
        this.logger.error('Failed to process queued SMS', {
          trackingId: message.trackingId,
          error
        });
        throw error;
      }
    });
  }

  /**
   * Process queued email notifications
   */
  async processQueuedEmailNotifications(): Promise<void> {
    await this.queueManager.subscribeToEmailNotifications(async (message) => {
      try {
        if (!message.recipient.email) {
          throw new Error('Email address is required for email notification');
        }

        const emailOptions: EmailOptions = {
          to: message.recipient.email,
          subject: message.content.subject || 'Notification',
          text: message.content.body,
          html: message.content.body,
          templateId: message.content.template,
          dynamicTemplateData: message.content.variables
        };

        const result = await this.sendEmail(emailOptions);
        
        if (!result.success) {
          throw new Error(result.error);
        }

        this.logger.info('Queued email processed successfully', {
          trackingId: message.trackingId,
          messageId: result.messageId
        });

      } catch (error) {
        this.logger.error('Failed to process queued email', {
          trackingId: message.trackingId,
          error
        });
        throw error;
      }
    });
  }

  /**
   * Check SMS rate limit
   */
  private async checkSmsRateLimit(phoneNumber: string): Promise<{ allowed: boolean; retryAfter?: number }> {
    const limits = notificationConfig.getRateLimits();
    const key = `sms_rate_limit:${phoneNumber}`;

    if (this.redisClient) {
      try {
        const current = await this.redisClient.get(key);
        const count = current ? parseInt(current) : 0;

        if (count >= limits.smsPerMinute) {
          const ttl = await this.redisClient.ttl(key);
          return { allowed: false, retryAfter: ttl };
        }

        await this.redisClient.multi()
          .incr(key)
          .expire(key, 60)
          .exec();

        return { allowed: true };
      } catch (error) {
        this.logger.error('Redis rate limit check failed, allowing request', { error });
        return { allowed: true };
      }
    }

    // Fallback to in-memory rate limiting
    const now = Date.now();
    const windowStart = now - this.rateLimitWindow;
    
    // Clean old entries
    for (const [phone, timestamp] of this.smsCount.entries()) {
      if (timestamp < windowStart) {
        this.smsCount.delete(phone);
      }
    }

    const currentCount = this.smsCount.get(phoneNumber) || 0;
    if (currentCount >= limits.smsPerMinute) {
      return { allowed: false, retryAfter: 60 };
    }

    this.smsCount.set(phoneNumber, currentCount + 1);
    return { allowed: true };
  }

  /**
   * Check email rate limit
   */
  private async checkEmailRateLimit(email: string): Promise<{ allowed: boolean; retryAfter?: number }> {
    const limits = notificationConfig.getRateLimits();
    const key = `email_rate_limit:${email}`;

    if (this.redisClient) {
      try {
        const current = await this.redisClient.get(key);
        const count = current ? parseInt(current) : 0;

        if (count >= limits.emailPerMinute) {
          const ttl = await this.redisClient.ttl(key);
          return { allowed: false, retryAfter: ttl };
        }

        await this.redisClient.multi()
          .incr(key)
          .expire(key, 60)
          .exec();

        return { allowed: true };
      } catch (error) {
        this.logger.error('Redis rate limit check failed, allowing request', { error });
        return { allowed: true };
      }
    }

    // Fallback to in-memory rate limiting
    const now = Date.now();
    const windowStart = now - this.rateLimitWindow;
    
    // Clean old entries
    for (const [emailAddr, timestamp] of this.emailCount.entries()) {
      if (timestamp < windowStart) {
        this.emailCount.delete(emailAddr);
      }
    }

    const currentCount = this.emailCount.get(email) || 0;
    if (currentCount >= limits.emailPerMinute) {
      return { allowed: false, retryAfter: 60 };
    }

    this.emailCount.set(email, currentCount + 1);
    return { allowed: true };
  }

  /**
   * Record SMS usage for analytics
   */
  private async recordSmsUsage(phoneNumber: string): Promise<void> {
    if (this.redisClient) {
      try {
        const key = `sms_usage:${new Date().toISOString().slice(0, 10)}`;
        await this.redisClient.hincrBy(key, phoneNumber, 1);
        await this.redisClient.expire(key, 86400 * 30); // Keep for 30 days
      } catch (error) {
        this.logger.error('Failed to record SMS usage', { error });
      }
    }
  }

  /**
   * Record email usage for analytics
   */
  private async recordEmailUsage(email: string): Promise<void> {
    if (this.redisClient) {
      try {
        const key = `email_usage:${new Date().toISOString().slice(0, 10)}`;
        await this.redisClient.hincrBy(key, email, 1);
        await this.redisClient.expire(key, 86400 * 30); // Keep for 30 days
      } catch (error) {
        this.logger.error('Failed to record email usage', { error });
      }
    }
  }

  /**
   * Load notification templates
   */
  private loadTemplates(): void {
    // SMS template for lead notification
    this.templates.set('lead-notification-sms', {
      id: 'lead-notification-sms',
      name: 'Lead Notification SMS',
      type: 'sms',
      body: `🚨 NEW LEAD ALERT 🚨\n\n${'{leadTitle}'} - ${'{location.suburb}'}\nClient: ${'{clientName}'}\nValue: $${'{estimatedValue}'}\nDistance: ${'{distance}'}km (${'{travelTime}'} mins)\n\nAccept: ${'{acceptUrl}'}\nDecline: ${'{declineUrl}'}\n\nExpires: ${'{expiresAt}'}\n\nNRP Disaster Recovery`,
      variables: ['leadTitle', 'location.suburb', 'clientName', 'estimatedValue', 'distance', 'travelTime', 'acceptUrl', 'declineUrl', 'expiresAt'],
      isActive: true
    });

    // Email template for lead notification (text)
    this.templates.set('lead-notification-email', {
      id: 'lead-notification-email',
      name: 'Lead Notification Email (Text)',
      type: 'email',
      body: `New Lead Alert: ${'{leadTitle}'}

Location: ${'{location.address}'}, ${'{location.suburb}'}, ${'{location.city}'} ${'{location.state}'} ${'{location.postcode}'}
Client: ${'{clientName}'} (${'{clientPhone}'})
Service Type: ${'{serviceType}'}
Priority: ${'{priority}'}
Estimated Value: $${'{estimatedValue}'}
Distance: ${'{distance}'}km (approximately ${'{travelTime}'} minutes travel time)

Description:
${'{leadDescription}'}

To accept this lead, click: ${'{acceptUrl}'}
To decline this lead, click: ${'{declineUrl}'}

This lead expires at: ${'{expiresAt}'}

Best regards,
NRP Disaster Recovery Team`,
      variables: ['leadTitle', 'location.address', 'location.suburb', 'location.city', 'location.state', 'location.postcode', 'clientName', 'clientPhone', 'serviceType', 'priority', 'estimatedValue', 'distance', 'travelTime', 'leadDescription', 'acceptUrl', 'declineUrl', 'expiresAt'],
      isActive: true
    });

    // HTML email template
    this.templates.set('lead-notification-email-html', {
      id: 'lead-notification-email-html',
      name: 'Lead Notification Email (HTML)',
      type: 'email',
      body: `<html>
<body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px;">
    <h2 style="color: #dc3545;">🚨 New Lead Alert</h2>
    <h3>${'{leadTitle}'}</h3>
    
    <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
      <h4>Location Details</h4>
      <p><strong>Address:</strong> ${'{location.address}'}<br>
      ${'{location.suburb}'}, ${'{location.city}'} ${'{location.state}'} ${'{location.postcode}'}</p>
      <p><strong>Distance:</strong> ${'{distance}'}km (${'{travelTime}'} minutes travel time)</p>
    </div>

    <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
      <h4>Client Information</h4>
      <p><strong>Name:</strong> ${'{clientName}'}<br>
      <strong>Phone:</strong> ${'{clientPhone}'}</p>
    </div>

    <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 15px 0;">
      <h4>Job Details</h4>
      <p><strong>Service Type:</strong> ${'{serviceType}'}<br>
      <strong>Priority:</strong> <span style="color: ${'{priority}' === 'emergency' ? '#dc3545' : '#28a745'};">${'{priority}'}</span><br>
      <strong>Estimated Value:</strong> $${'{estimatedValue}'}</p>
      <p><strong>Description:</strong><br>${'{leadDescription}'}</p>
    </div>

    <div style="text-align: center; margin: 30px 0;">
      <a href="${'{acceptUrl}'}" style="background-color: #28a745; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; margin-right: 10px; display: inline-block;">Accept Lead</a>
      <a href="${'{declineUrl}'}" style="background-color: #dc3545; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">Decline Lead</a>
    </div>

    <div style="background-color: #fff3cd; border: 1px solid #ffeaa7; padding: 10px; border-radius: 5px;">
      <p style="margin: 0; color: #856404;"><strong>⏰ Important:</strong> This lead expires at ${'{expiresAt}'}</p>
    </div>
  </div>

  <div style="text-align: center; margin-top: 20px; color: #666;">
    <p>NRP Disaster Recovery<br>
    Leading Australia's disaster recovery network</p>
  </div>
</body>
</html>`,
      variables: ['leadTitle', 'location.address', 'location.suburb', 'location.city', 'location.state', 'location.postcode', 'clientName', 'clientPhone', 'serviceType', 'priority', 'estimatedValue', 'distance', 'travelTime', 'leadDescription', 'acceptUrl', 'declineUrl', 'expiresAt'],
      isActive: true
    });
  }

  /**
   * Get template by ID
   */
  private getTemplate(templateId: string): NotificationTemplate {
    const template = this.templates.get(templateId);
    if (!template) {
      throw new Error(`Template not found: ${templateId}`);
    }
    return template;
  }

  /**
   * Render template with data
   */
  private renderTemplate(template: NotificationTemplate, data: any): string {
    let rendered = template.body;

    for (const variable of template.variables) {
      const value = this.getNestedProperty(data, variable);
      const placeholder = `{${variable}}`;
      rendered = rendered.replace(new RegExp(placeholder.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'), value || '');
    }

    return rendered;
  }

  /**
   * Get nested property from object
   */
  private getNestedProperty(obj: any, path: string): any {
    return path.split('.').reduce((current, prop) => current?.[prop], obj);
  }

  /**
   * Start rate limit cleanup process
   */
  private startRateLimitCleanup(): void {
    setInterval(() => {
      const now = Date.now();
      const windowStart = now - this.rateLimitWindow;

      // Clean SMS rate limits
      for (const [key, timestamp] of this.smsCount.entries()) {
        if (timestamp < windowStart) {
          this.smsCount.delete(key);
        }
      }

      // Clean email rate limits
      for (const [key, timestamp] of this.emailCount.entries()) {
        if (timestamp < windowStart) {
          this.emailCount.delete(key);
        }
      }
    }, 60000); // Run every minute
  }

  /**
   * Get notification statistics
   */
  async getNotificationStats(): Promise<{
    sms: { sent: number; failed: number; rateLimited: number };
    email: { sent: number; failed: number; rateLimited: number };
    templates: { total: number; active: number };
  }> {
    // This would typically query a database for real stats
    // For now, return mock data
    return {
      sms: { sent: 0, failed: 0, rateLimited: 0 },
      email: { sent: 0, failed: 0, rateLimited: 0 },
      templates: { 
        total: this.templates.size,
        active: Array.from(this.templates.values()).filter(t => t.isActive).length
      }
    };
  }

  /**
   * Close connections gracefully
   */
  async close(): Promise<void> {
    if (this.redisClient) {
      await this.redisClient.quit();
    }
  }
}
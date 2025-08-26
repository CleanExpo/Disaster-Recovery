// SMS Notification Service
// Handles SMS delivery with character limits, rate limiting, and delivery tracking

import { SMS_CHARACTER_LIMIT } from '@/types/notifications';

export interface SMSMessage {
  to: string;
  message: string;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  notificationId?: string;
  metadata?: Record<string, any>;
}

export interface SMSDeliveryResult {
  success: boolean;
  messageId?: string;
  error?: string;
  deliveredAt?: Date;
  segments?: number;
  cost?: number;
}

export interface SMSProvider {
  name: string;
  sendSMS: (message: SMSMessage) => Promise<SMSDeliveryResult>;
  getDeliveryStatus: (messageId: string) => Promise<SMSDeliveryStatus>;
}

export interface SMSDeliveryStatus {
  messageId: string;
  status: 'pending' | 'sent' | 'delivered' | 'failed';
  deliveredAt?: Date;
  errorMessage?: string;
}

// Rate limiting configuration
const RATE_LIMITS = {
  perMinute: 10,
  perHour: 100,
  perDay: 500
};

// Track sent messages for rate limiting
const sentMessages = new Map<string, Date[]>();

class SMSService {
  private provider: SMSProvider | null = null;
  private queue: SMSMessage[] = [];
  private processing = false;

  // Configure SMS provider (Twilio, AWS SNS, etc.)
  configureProvider(provider: SMSProvider) {
    this.provider = provider;
  }

  // Main send SMS method
  async sendSMS(message: SMSMessage): Promise<SMSDeliveryResult> {
    try {
      // Validate phone number
      if (!this.isValidPhoneNumber(message.to)) {
        throw new Error('Invalid phone number format');
      }

      // Check rate limits
      if (!this.checkRateLimit(message.to)) {
        throw new Error('Rate limit exceeded. Please try again later.');
      }

      // Process message
      const processedMessage = this.processMessage(message);

      // Add to queue if high volume
      if (this.queue.length > 10) {
        this.queue.push(processedMessage);
        this.processQueue();
        return {
          success: true,
          messageId: `queued-${Date.now()}`,
          segments: this.calculateSegments(processedMessage.message)
        };
      }

      // Send immediately
      return await this.sendImmediate(processedMessage);
    } catch (error) {
      console.error('SMS sending error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      };
    }
  }

  // Send SMS immediately
  private async sendImmediate(message: SMSMessage): Promise<SMSDeliveryResult> {
    if (!this.provider) {
      // Mock implementation for development
      console.log('SMS Mock Send:', {
        to: message.to,
        message: message.message.substring(0, 50) + '...'
      });
      
      return {
        success: true,
        messageId: `mock-${Date.now()}`,
        deliveredAt: new Date(),
        segments: this.calculateSegments(message.message),
        cost: this.calculateCost(message.message)
      };
    }

    // Use actual provider
    const result = await this.provider.sendSMS(message);
    
    // Track sent message
    this.trackSentMessage(message.to);
    
    return result;
  }

  // Process message (shorten URLs, format text)
  private processMessage(message: SMSMessage): SMSMessage {
    let processedText = message.message;

    // Shorten URLs
    processedText = this.shortenURLs(processedText);

    // Ensure message fits in character limit for urgent messages
    if (message.priority === 'urgent' && processedText.length > SMS_CHARACTER_LIMIT) {
      processedText = this.truncateMessage(processedText, SMS_CHARACTER_LIMIT);
    }

    return {
      ...message,
      message: processedText
    };
  }

  // Shorten URLs in message
  private shortenURLs(text: string): string {
    // In production, integrate with URL shortening service
    const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/g;
    
    return text.replace(urlRegex, (url) => {
      // Mock URL shortening
      if (url.length > 30) {
        return 'nrp.link/' + this.generateShortCode();
      }
      return url;
    });
  }

  // Generate short code for URLs
  private generateShortCode(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  // Truncate message intelligently
  private truncateMessage(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    
    const truncated = text.substring(0, maxLength - 3);
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSpace > maxLength - 20) {
      return truncated.substring(0, lastSpace) + '...';
    }
    
    return truncated + '...';
  }

  // Calculate number of SMS segments
  private calculateSegments(message: string): number {
    const length = message.length;
    if (length <= SMS_CHARACTER_LIMIT) return 1;
    
    // For multi-part messages, each segment is 153 characters
    const segmentLength = 153;
    return Math.ceil(length / segmentLength);
  }

  // Calculate SMS cost (example pricing)
  private calculateCost(message: string): number {
    const segments = this.calculateSegments(message);
    const costPerSegment = 0.01; // $0.01 per segment
    return segments * costPerSegment;
  }

  // Validate phone number format
  private isValidPhoneNumber(phone: string): boolean {
    // Australian phone number validation
    const phoneRegex = /^(\+61|0)[2-478](?:[ -]?[0-9]){8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  }

  // Format phone number to international format
  formatPhoneNumber(phone: string): string {
    const cleaned = phone.replace(/\D/g, '');
    
    // Australian number
    if (cleaned.startsWith('61')) {
      return '+' + cleaned;
    } else if (cleaned.startsWith('0')) {
      return '+61' + cleaned.substring(1);
    }
    
    return phone;
  }

  // Check rate limits
  private checkRateLimit(phone: string): boolean {
    const now = new Date();
    const messages = sentMessages.get(phone) || [];
    
    // Clean old messages
    const recentMessages = messages.filter(date => {
      const diff = now.getTime() - date.getTime();
      return diff < 24 * 60 * 60 * 1000; // Keep last 24 hours
    });
    
    // Check per minute limit
    const lastMinute = recentMessages.filter(date => {
      const diff = now.getTime() - date.getTime();
      return diff < 60 * 1000;
    });
    if (lastMinute.length >= RATE_LIMITS.perMinute) return false;
    
    // Check per hour limit
    const lastHour = recentMessages.filter(date => {
      const diff = now.getTime() - date.getTime();
      return diff < 60 * 60 * 1000;
    });
    if (lastHour.length >= RATE_LIMITS.perHour) return false;
    
    // Check per day limit
    if (recentMessages.length >= RATE_LIMITS.perDay) return false;
    
    return true;
  }

  // Track sent message for rate limiting
  private trackSentMessage(phone: string) {
    const messages = sentMessages.get(phone) || [];
    messages.push(new Date());
    sentMessages.set(phone, messages);
  }

  // Process queued messages
  private async processQueue() {
    if (this.processing || this.queue.length === 0) return;
    
    this.processing = true;
    
    while (this.queue.length > 0) {
      const message = this.queue.shift();
      if (message) {
        await this.sendImmediate(message);
        // Delay between messages to avoid rate limits
        await new Promise(resolve => setTimeout(resolve, 100));
      }
    }
    
    this.processing = false;
  }

  // Get delivery status
  async getDeliveryStatus(messageId: string): Promise<SMSDeliveryStatus> {
    if (!this.provider) {
      // Mock implementation
      return {
        messageId,
        status: 'delivered',
        deliveredAt: new Date()
      };
    }
    
    return await this.provider.getDeliveryStatus(messageId);
  }

  // Batch send SMS
  async sendBatch(messages: SMSMessage[]): Promise<SMSDeliveryResult[]> {
    const results: SMSDeliveryResult[] = [];
    
    for (const message of messages) {
      const result = await this.sendSMS(message);
      results.push(result);
      // Small delay between messages
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    
    return results;
  }

  // Template-based SMS
  async sendTemplatedSMS(
    to: string,
    templateId: string,
    variables: Record<string, string>
  ): Promise<SMSDeliveryResult> {
    const template = await this.getTemplate(templateId);
    if (!template) {
      throw new Error('Template not found');
    }
    
    let message = template;
    Object.entries(variables).forEach(([key, value]) => {
      const regex = new RegExp(`{{${key}}}`, 'g');
      message = message.replace(regex, value);
    });
    
    return this.sendSMS({
      to,
      message
    });
  }

  // Get SMS template
  private async getTemplate(templateId: string): Promise<string | null> {
    // Mock templates
    const templates: Record<string, string> = {
      'compliance-expiry': 'URGENT: Your {{itemName}} expires in {{days}} days. Renew at {{link}}',
      'job-assignment': 'NEW JOB: {{jobType}} at {{address}}. Accept at {{link}}',
      'invoice-due': 'Invoice {{invoiceNumber}} for ${{amount}} due {{date}}. Pay at {{link}}',
      'verification': 'Your NRP verification code is {{code}}. Valid for 10 minutes.'
    };
    
    return templates[templateId] || null;
  }

  // Get SMS statistics
  getStatistics(): {
    sent: number;
    delivered: number;
    failed: number;
    pending: number;
    queueLength: number;
  } {
    // In production, fetch from database
    return {
      sent: 150,
      delivered: 145,
      failed: 3,
      pending: 2,
      queueLength: this.queue.length
    };
  }
}

// Export singleton instance
export const smsService = new SMSService();

// Export utility functions
export function formatSMSMessage(text: string, maxLength = SMS_CHARACTER_LIMIT): {
  formatted: string;
  segments: number;
  truncated: boolean;
} {
  const service = new SMSService();
  const segments = service['calculateSegments'](text);
  const truncated = text.length > maxLength;
  const formatted = truncated 
    ? service['truncateMessage'](text, maxLength)
    : text;
  
  return {
    formatted,
    segments,
    truncated
  };
}

// Export SMS templates
export const SMS_TEMPLATES = {
  COMPLIANCE_WARNING: 'compliance-expiry',
  JOB_ASSIGNMENT: 'job-assignment',
  INVOICE_REMINDER: 'invoice-due',
  VERIFICATION_CODE: 'verification'
};

// Export priority levels
export const SMS_PRIORITY = {
  LOW: 'low' as const,
  MEDIUM: 'medium' as const,
  HIGH: 'high' as const,
  URGENT: 'urgent' as const
};
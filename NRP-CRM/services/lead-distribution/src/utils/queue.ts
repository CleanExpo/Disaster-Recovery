import amqp from 'amqplib';
import winston from 'winston';
import { EventEmitter } from 'events';

export interface QueueConfig {
  connectionUrl: string;
  exchanges: {
    leads: string;
    notifications: string;
    deadLetter: string;
  };
  queues: {
    leadDistribution: string;
    smsNotifications: string;
    emailNotifications: string;
    leadResponses: string;
    deadLetters: string;
  };
  prefetchCount: number;
  retryAttempts: number;
  retryDelayMs: number;
}

export interface QueueMessage<T = any> {
  id: string;
  type: string;
  payload: T;
  timestamp: Date;
  attempts: number;
  maxAttempts: number;
  retryDelay?: number;
  headers?: { [key: string]: any };
}

export interface LeadDistributionMessage {
  leadId: string;
  contractorIds: string[];
  priority: 'low' | 'medium' | 'high' | 'urgent' | 'emergency';
  distributionMethod: 'sequential' | 'parallel' | 'tier-based';
  expirationTime: Date;
}

export interface NotificationMessage {
  type: 'sms' | 'email' | 'push';
  recipient: {
    phone?: string;
    email?: string;
    deviceId?: string;
  };
  content: {
    subject?: string;
    body: string;
    template?: string;
    variables?: { [key: string]: any };
  };
  priority: number;
  scheduledFor?: Date;
  trackingId: string;
}

export interface LeadResponseMessage {
  leadId: string;
  contractorId: string;
  response: 'accepted' | 'declined';
  responseTime: Date;
  reason?: string;
  estimatedArrivalTime?: Date;
  notes?: string;
}

export class QueueManager extends EventEmitter {
  private connection: amqp.Connection | null = null;
  private channel: amqp.Channel | null = null;
  private config: QueueConfig;
  private logger: winston.Logger;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelayMs = 5000;

  constructor(config: Partial<QueueConfig> = {}) {
    super();
    
    this.config = {
      connectionUrl: config.connectionUrl || process.env.RABBITMQ_URL || 'amqp://localhost:5672',
      exchanges: {
        leads: 'nrp.leads',
        notifications: 'nrp.notifications',
        deadLetter: 'nrp.dead-letters',
        ...config.exchanges
      },
      queues: {
        leadDistribution: 'lead.distribution',
        smsNotifications: 'notifications.sms',
        emailNotifications: 'notifications.email',
        leadResponses: 'lead.responses',
        deadLetters: 'dead.letters',
        ...config.queues
      },
      prefetchCount: config.prefetchCount || 10,
      retryAttempts: config.retryAttempts || 3,
      retryDelayMs: config.retryDelayMs || 1000,
      ...config
    };

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      defaultMeta: { service: 'queue-manager' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({
          format: winston.format.simple()
        })
      ]
    });

    // Handle process termination gracefully
    process.on('SIGINT', () => this.close());
    process.on('SIGTERM', () => this.close());
  }

  /**
   * Initialize connection and setup exchanges/queues
   */
  async connect(): Promise<void> {
    try {
      this.logger.info('Connecting to RabbitMQ...', { url: this.config.connectionUrl });
      
      this.connection = await amqp.connect(this.config.connectionUrl);
      this.channel = await this.connection.createChannel();

      // Set prefetch count for fair distribution
      await this.channel.prefetch(this.config.prefetchCount);

      // Setup error handlers
      this.connection.on('error', (error) => {
        this.logger.error('RabbitMQ connection error', { error });
        this.handleConnectionError(error);
      });

      this.connection.on('close', () => {
        this.logger.warn('RabbitMQ connection closed');
        this.isConnected = false;
        this.emit('disconnected');
        this.attemptReconnect();
      });

      this.channel.on('error', (error) => {
        this.logger.error('RabbitMQ channel error', { error });
      });

      // Setup exchanges and queues
      await this.setupInfrastructure();

      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.logger.info('Successfully connected to RabbitMQ');
      this.emit('connected');

    } catch (error) {
      this.logger.error('Failed to connect to RabbitMQ', { error });
      this.handleConnectionError(error as Error);
      throw error;
    }
  }

  /**
   * Setup exchanges, queues, and bindings
   */
  private async setupInfrastructure(): Promise<void> {
    if (!this.channel) throw new Error('Channel not initialized');

    try {
      // Declare exchanges
      await this.channel.assertExchange(this.config.exchanges.leads, 'topic', { durable: true });
      await this.channel.assertExchange(this.config.exchanges.notifications, 'topic', { durable: true });
      await this.channel.assertExchange(this.config.exchanges.deadLetter, 'direct', { durable: true });

      // Declare queues with dead letter handling
      const queueOptions = {
        durable: true,
        arguments: {
          'x-dead-letter-exchange': this.config.exchanges.deadLetter,
          'x-dead-letter-routing-key': 'dead.letter',
          'x-message-ttl': 24 * 60 * 60 * 1000, // 24 hours TTL
          'x-max-retries': this.config.retryAttempts
        }
      };

      await this.channel.assertQueue(this.config.queues.leadDistribution, queueOptions);
      await this.channel.assertQueue(this.config.queues.smsNotifications, queueOptions);
      await this.channel.assertQueue(this.config.queues.emailNotifications, queueOptions);
      await this.channel.assertQueue(this.config.queues.leadResponses, queueOptions);
      
      // Dead letter queue
      await this.channel.assertQueue(this.config.queues.deadLetters, { durable: true });

      // Bind queues to exchanges
      await this.channel.bindQueue(
        this.config.queues.leadDistribution,
        this.config.exchanges.leads,
        'lead.distribute.*'
      );

      await this.channel.bindQueue(
        this.config.queues.smsNotifications,
        this.config.exchanges.notifications,
        'notification.sms.*'
      );

      await this.channel.bindQueue(
        this.config.queues.emailNotifications,
        this.config.exchanges.notifications,
        'notification.email.*'
      );

      await this.channel.bindQueue(
        this.config.queues.leadResponses,
        this.config.exchanges.leads,
        'lead.response.*'
      );

      await this.channel.bindQueue(
        this.config.queues.deadLetters,
        this.config.exchanges.deadLetter,
        'dead.letter'
      );

      this.logger.info('RabbitMQ infrastructure setup completed');

    } catch (error) {
      this.logger.error('Failed to setup RabbitMQ infrastructure', { error });
      throw error;
    }
  }

  /**
   * Publish lead distribution message
   */
  async publishLeadDistribution(message: LeadDistributionMessage): Promise<boolean> {
    return this.publishMessage(
      this.config.exchanges.leads,
      `lead.distribute.${message.priority}`,
      message,
      {
        persistent: true,
        expiration: Math.max(0, message.expirationTime.getTime() - Date.now()).toString()
      }
    );
  }

  /**
   * Publish notification message
   */
  async publishNotification(message: NotificationMessage): Promise<boolean> {
    const routingKey = `notification.${message.type}.${message.priority}`;
    return this.publishMessage(
      this.config.exchanges.notifications,
      routingKey,
      message,
      {
        persistent: true,
        priority: message.priority,
        timestamp: message.scheduledFor?.getTime() || Date.now()
      }
    );
  }

  /**
   * Publish lead response message
   */
  async publishLeadResponse(message: LeadResponseMessage): Promise<boolean> {
    return this.publishMessage(
      this.config.exchanges.leads,
      `lead.response.${message.response}`,
      message,
      { persistent: true }
    );
  }

  /**
   * Generic message publisher
   */
  private async publishMessage(
    exchange: string,
    routingKey: string,
    payload: any,
    options: amqp.Options.Publish = {}
  ): Promise<boolean> {
    if (!this.isConnected || !this.channel) {
      throw new Error('Not connected to RabbitMQ');
    }

    try {
      const message: QueueMessage = {
        id: this.generateMessageId(),
        type: routingKey,
        payload,
        timestamp: new Date(),
        attempts: 0,
        maxAttempts: this.config.retryAttempts,
        headers: options.headers
      };

      const buffer = Buffer.from(JSON.stringify(message));
      const published = this.channel.publish(exchange, routingKey, buffer, {
        ...options,
        messageId: message.id,
        timestamp: message.timestamp.getTime(),
        contentType: 'application/json'
      });

      if (!published) {
        this.logger.warn('Message not published due to flow control', {
          exchange,
          routingKey,
          messageId: message.id
        });
      } else {
        this.logger.debug('Message published successfully', {
          exchange,
          routingKey,
          messageId: message.id
        });
      }

      return published;

    } catch (error) {
      this.logger.error('Failed to publish message', {
        exchange,
        routingKey,
        error
      });
      throw error;
    }
  }

  /**
   * Subscribe to lead distribution queue
   */
  async subscribeToLeadDistribution(
    handler: (message: LeadDistributionMessage) => Promise<void>
  ): Promise<void> {
    await this.subscribeToQueue(
      this.config.queues.leadDistribution,
      async (message: QueueMessage<LeadDistributionMessage>) => {
        await handler(message.payload);
      }
    );
  }

  /**
   * Subscribe to SMS notifications queue
   */
  async subscribeToSmsNotifications(
    handler: (message: NotificationMessage) => Promise<void>
  ): Promise<void> {
    await this.subscribeToQueue(
      this.config.queues.smsNotifications,
      async (message: QueueMessage<NotificationMessage>) => {
        await handler(message.payload);
      }
    );
  }

  /**
   * Subscribe to email notifications queue
   */
  async subscribeToEmailNotifications(
    handler: (message: NotificationMessage) => Promise<void>
  ): Promise<void> {
    await this.subscribeToQueue(
      this.config.queues.emailNotifications,
      async (message: QueueMessage<NotificationMessage>) => {
        await handler(message.payload);
      }
    );
  }

  /**
   * Subscribe to lead responses queue
   */
  async subscribeToLeadResponses(
    handler: (message: LeadResponseMessage) => Promise<void>
  ): Promise<void> {
    await this.subscribeToQueue(
      this.config.queues.leadResponses,
      async (message: QueueMessage<LeadResponseMessage>) => {
        await handler(message.payload);
      }
    );
  }

  /**
   * Generic queue subscriber
   */
  private async subscribeToQueue<T>(
    queueName: string,
    handler: (message: QueueMessage<T>) => Promise<void>
  ): Promise<void> {
    if (!this.channel) {
      throw new Error('Channel not initialized');
    }

    try {
      await this.channel.consume(queueName, async (msg) => {
        if (!msg) return;

        try {
          const queueMessage: QueueMessage<T> = JSON.parse(msg.content.toString());
          
          this.logger.debug('Processing message', {
            queue: queueName,
            messageId: queueMessage.id,
            attempt: queueMessage.attempts + 1
          });

          await handler(queueMessage);
          
          this.channel?.ack(msg);
          
          this.logger.debug('Message processed successfully', {
            queue: queueName,
            messageId: queueMessage.id
          });

        } catch (error) {
          this.logger.error('Error processing message', {
            queue: queueName,
            error
          });

          // Retry logic
          const queueMessage: QueueMessage<T> = JSON.parse(msg.content.toString());
          queueMessage.attempts++;

          if (queueMessage.attempts < queueMessage.maxAttempts) {
            // Requeue with delay
            setTimeout(() => {
              if (this.channel && !msg.fields.redelivered) {
                this.channel.nack(msg, false, true);
              }
            }, this.config.retryDelayMs * queueMessage.attempts);
          } else {
            // Max attempts reached, send to dead letter
            this.channel?.nack(msg, false, false);
          }
        }
      });

      this.logger.info(`Subscribed to queue: ${queueName}`);

    } catch (error) {
      this.logger.error(`Failed to subscribe to queue: ${queueName}`, { error });
      throw error;
    }
  }

  /**
   * Get queue statistics
   */
  async getQueueStats(): Promise<{ [queueName: string]: { messageCount: number; consumerCount: number } }> {
    if (!this.channel) {
      throw new Error('Channel not initialized');
    }

    const stats: { [queueName: string]: { messageCount: number; consumerCount: number } } = {};

    try {
      for (const [name, queueName] of Object.entries(this.config.queues)) {
        const queueInfo = await this.channel.checkQueue(queueName);
        stats[name] = {
          messageCount: queueInfo.messageCount,
          consumerCount: queueInfo.consumerCount
        };
      }
      return stats;
    } catch (error) {
      this.logger.error('Failed to get queue stats', { error });
      throw error;
    }
  }

  /**
   * Purge a queue (remove all messages)
   */
  async purgeQueue(queueName: string): Promise<{ messageCount: number }> {
    if (!this.channel) {
      throw new Error('Channel not initialized');
    }

    try {
      const result = await this.channel.purgeQueue(queueName);
      this.logger.info(`Purged queue: ${queueName}`, { messageCount: result.messageCount });
      return result;
    } catch (error) {
      this.logger.error(`Failed to purge queue: ${queueName}`, { error });
      throw error;
    }
  }

  /**
   * Handle connection errors and attempt reconnection
   */
  private handleConnectionError(error: Error): void {
    this.isConnected = false;
    this.emit('error', error);
    
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.attemptReconnect();
    } else {
      this.logger.error('Max reconnection attempts reached. Giving up.');
      this.emit('maxReconnectAttemptsReached');
    }
  }

  /**
   * Attempt to reconnect with exponential backoff
   */
  private async attemptReconnect(): Promise<void> {
    if (this.isConnected) return;

    this.reconnectAttempts++;
    const delay = this.reconnectDelayMs * Math.pow(2, this.reconnectAttempts - 1);

    this.logger.info(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`, {
      delay: `${delay}ms`
    });

    setTimeout(async () => {
      try {
        await this.connect();
      } catch (error) {
        this.logger.error('Reconnection failed', { error });
      }
    }, delay);
  }

  /**
   * Generate unique message ID
   */
  private generateMessageId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Check if connected to RabbitMQ
   */
  isConnectionOpen(): boolean {
    return this.isConnected && !!this.connection && !this.connection.connection.closed;
  }

  /**
   * Close connection gracefully
   */
  async close(): Promise<void> {
    try {
      if (this.channel) {
        await this.channel.close();
        this.channel = null;
      }

      if (this.connection) {
        await this.connection.close();
        this.connection = null;
      }

      this.isConnected = false;
      this.logger.info('RabbitMQ connection closed gracefully');
      this.emit('closed');

    } catch (error) {
      this.logger.error('Error closing RabbitMQ connection', { error });
      throw error;
    }
  }
}

// Export singleton instance
let queueManagerInstance: QueueManager | null = null;

export function getQueueManager(config?: Partial<QueueConfig>): QueueManager {
  if (!queueManagerInstance) {
    queueManagerInstance = new QueueManager(config);
  }
  return queueManagerInstance;
}
import { ILead, Lead, LeadStatus, ContractorInfo, MembershipTier, DistributionAttempt } from '../models/Lead';
import { GeoMatching } from '../algorithms/GeoMatching';
import { PriorityScoring, PriorityScoreResult } from '../algorithms/PriorityScoring';
import { NotificationService, LeadNotificationData } from './NotificationService';
import { getQueueManager, LeadDistributionMessage, LeadResponseMessage, QueueManager } from '../utils/queue';
import { Server as SocketIOServer } from 'socket.io';
import winston from 'winston';
import Redis from 'redis';
import cron from 'node-cron';

export interface DistributionConfig {
  maxContractorsPerLead: number;
  distributionMethod: 'sequential' | 'parallel' | 'tier-based';
  expirationMinutes: number;
  autoRetryOnDecline: boolean;
  maxRetryAttempts: number;
  retryDelayMinutes: number;
  tierDistributionRatio: { [key in MembershipTier]: number };
  emergencyDistributionConfig: {
    maxContractors: number;
    radiusKm: number;
    method: 'parallel';
  };
}

export interface DistributionResult {
  leadId: string;
  success: boolean;
  contractorsNotified: number;
  distributionMethod: string;
  startTime: Date;
  endTime?: Date;
  errors: string[];
  notifications: {
    sms: { sent: number; failed: number };
    email: { sent: number; failed: number };
  };
}

export interface ContractorResponse {
  leadId: string;
  contractorId: string;
  response: 'accepted' | 'declined';
  responseTime: Date;
  reason?: string;
  estimatedArrivalTime?: Date;
  notes?: string;
}

export class LeadDistributionService {
  private logger: winston.Logger;
  private notificationService: NotificationService;
  private queueManager: QueueManager;
  private redisClient: Redis.RedisClientType | null = null;
  private socketIO: SocketIOServer | null = null;
  private config: DistributionConfig;
  
  // In-memory caches for high-performance lookups
  private contractorCache: Map<string, ContractorInfo> = new Map();
  private distributionHistory: Map<string, number> = new Map(); // contractorId -> recent distribution count
  private activeDistributions: Map<string, Date> = new Map(); // leadId -> distribution start time

  constructor(config: Partial<DistributionConfig> = {}, socketIO?: SocketIOServer) {
    this.config = {
      maxContractorsPerLead: 5,
      distributionMethod: 'tier-based',
      expirationMinutes: 60,
      autoRetryOnDecline: true,
      maxRetryAttempts: 3,
      retryDelayMinutes: 15,
      tierDistributionRatio: {
        [MembershipTier.FRANCHISE]: 0.4,
        [MembershipTier.ENTERPRISE]: 0.3,
        [MembershipTier.PROFESSIONAL]: 0.2,
        [MembershipTier.FOUNDATION]: 0.1
      },
      emergencyDistributionConfig: {
        maxContractors: 10,
        radiusKm: 75,
        method: 'parallel'
      },
      ...config
    };

    this.socketIO = socketIO || null;

    this.logger = winston.createLogger({
      level: 'info',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
      ),
      defaultMeta: { service: 'lead-distribution' },
      transports: [
        new winston.transports.File({ filename: 'error.log', level: 'error' }),
        new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console({
          format: winston.format.simple()
        })
      ]
    });

    this.notificationService = new NotificationService();
    this.queueManager = getQueueManager();
    
    this.initializeServices();
    this.setupCronJobs();
  }

  private async initializeServices(): Promise<void> {
    try {
      // Initialize Redis for caching and distribution tracking
      if (process.env.REDIS_URL) {
        this.redisClient = Redis.createClient({
          url: process.env.REDIS_URL
        });
        await this.redisClient.connect();
        this.logger.info('Redis client connected for distribution service');
      }

      // Subscribe to lead response messages
      await this.subscribeToLeadResponses();

      // Subscribe to lead distribution queue
      await this.subscribeToLeadDistribution();

      this.logger.info('Lead distribution service initialized');
    } catch (error) {
      this.logger.error('Failed to initialize lead distribution service', { error });
      throw error;
    }
  }

  /**
   * Distribute a lead to appropriate contractors
   */
  async distributeLead(leadId: string, contractors: ContractorInfo[]): Promise<DistributionResult> {
    const startTime = new Date();
    const result: DistributionResult = {
      leadId,
      success: false,
      contractorsNotified: 0,
      distributionMethod: this.config.distributionMethod,
      startTime,
      errors: [],
      notifications: {
        sms: { sent: 0, failed: 0 },
        email: { sent: 0, failed: 0 }
      }
    };

    try {
      // Retrieve lead from database
      const lead = await Lead.findOne({ leadId }).exec();
      if (!lead) {
        throw new Error(`Lead not found: ${leadId}`);
      }

      // Check if lead is already distributed or expired
      if (!lead.canDistribute()) {
        throw new Error(`Lead cannot be distributed. Status: ${lead.status}, Expired: ${lead.isExpired()}`);
      }

      // Update distribution tracking
      this.activeDistributions.set(leadId, startTime);
      lead.distributionStartedAt = startTime;
      lead.status = LeadStatus.DISTRIBUTED;

      // Get eligible contractors
      const eligibleContractors = lead.getEligibleContractors(contractors);
      if (eligibleContractors.length === 0) {
        throw new Error('No eligible contractors found for this lead');
      }

      this.logger.info(`Distributing lead ${leadId}`, {
        totalContractors: contractors.length,
        eligibleContractors: eligibleContractors.length,
        method: this.config.distributionMethod
      });

      // Calculate priority scores and select contractors
      const scoredContractors = PriorityScoring.calculatePriorityScores(
        lead,
        eligibleContractors,
        PriorityScoring.getDynamicWeights(lead)
      );

      // Apply fair distribution and select contractors to notify
      const contractorsToNotify = this.selectContractorsToNotify(lead, scoredContractors);

      // Execute distribution based on method
      const distributionPromises = [];
      
      switch (this.config.distributionMethod) {
        case 'parallel':
          distributionPromises.push(...contractorsToNotify.map(contractor => 
            this.notifyContractor(lead, contractor)
          ));
          break;
          
        case 'sequential':
          for (const contractor of contractorsToNotify) {
            distributionPromises.push(this.notifyContractor(lead, contractor));
            // Add small delay between sequential notifications
            await new Promise(resolve => setTimeout(resolve, 1000));
          }
          break;
          
        case 'tier-based':
          distributionPromises.push(...await this.distributeTierBased(lead, contractorsToNotify));
          break;
      }

      // Wait for all notifications to complete
      const notificationResults = await Promise.allSettled(distributionPromises);
      
      // Process notification results
      for (const result of notificationResults) {
        if (result.status === 'fulfilled') {
          result.notifications.sms.sent++;
          result.contractorsNotified++;
        } else {
          result.errors.push(result.reason.message);
          result.notifications.sms.failed++;
        }
      }

      // Update lead with distribution attempts
      const distributionAttempts: DistributionAttempt[] = contractorsToNotify.map(contractor => ({
        contractorId: contractor.contractorId,
        sentAt: new Date(),
        priorityScore: contractor.totalScore,
        distance: contractor.distance
      }));

      lead.distributionAttempts.push(...distributionAttempts);
      lead.distributionCount = lead.distributionAttempts.length;

      // Set expiration time
      if (this.config.expirationMinutes > 0) {
        lead.distributionExpiresAt = new Date(
          startTime.getTime() + (this.config.expirationMinutes * 60 * 1000)
        );
      }

      await lead.save();

      // Emit real-time update via WebSocket
      this.emitLeadUpdate(leadId, {
        status: 'distributed',
        contractorsNotified: result.contractorsNotified,
        distributionStarted: startTime
      });

      // Cache distribution for tracking
      await this.cacheDistribution(leadId, contractorsToNotify.map(c => c.contractorId));

      result.success = true;
      result.endTime = new Date();

      this.logger.info(`Lead distributed successfully`, {
        leadId,
        contractorsNotified: result.contractorsNotified,
        duration: result.endTime.getTime() - startTime.getTime()
      });

      return result;

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      result.errors.push(errorMessage);
      result.endTime = new Date();

      this.logger.error('Failed to distribute lead', {
        leadId,
        error: errorMessage,
        duration: result.endTime.getTime() - startTime.getTime()
      });

      // Clean up active distribution tracking
      this.activeDistributions.delete(leadId);

      return result;
    }
  }

  /**
   * Select contractors to notify based on scores and fairness rules
   */
  private selectContractorsToNotify(
    lead: ILead,
    scoredContractors: PriorityScoreResult[]
  ): PriorityScoreResult[] {
    const maxContractors = lead.isEmergency 
      ? this.config.emergencyDistributionConfig.maxContractors 
      : this.config.maxContractorsPerLead;

    // Apply fair distribution to prevent same contractors getting all leads
    const fairContractors = PriorityScoring.applyFairDistribution(
      scoredContractors,
      Object.fromEntries(this.distributionHistory),
      maxContractors
    );

    // For tier-based distribution, ensure representation from each tier
    if (this.config.distributionMethod === 'tier-based') {
      return this.selectTierBasedContractors(fairContractors, maxContractors);
    }

    return fairContractors.slice(0, maxContractors);
  }

  /**
   * Select contractors with tier-based distribution
   */
  private selectTierBasedContractors(
    contractors: PriorityScoreResult[],
    maxContractors: number
  ): PriorityScoreResult[] {
    const selected: PriorityScoreResult[] = [];
    const tierLimits = PriorityScoring.getTierDistributionLimits(maxContractors);

    // Group contractors by tier (would need contractor info lookup)
    // For now, simulate tier-based selection by taking top contractors
    // In production, you'd join with contractor data to get actual tiers

    return contractors.slice(0, maxContractors);
  }

  /**
   * Execute tier-based distribution with delays between tiers
   */
  private async distributeTierBased(
    lead: ILead,
    contractors: PriorityScoreResult[]
  ): Promise<Promise<any>[]> {
    const promises: Promise<any>[] = [];

    // Group contractors by tier and notify in order
    const tierGroups = this.groupContractorsByTier(contractors);
    const tierOrder = [MembershipTier.FRANCHISE, MembershipTier.ENTERPRISE, MembershipTier.PROFESSIONAL, MembershipTier.FOUNDATION];

    for (let i = 0; i < tierOrder.length; i++) {
      const tier = tierOrder[i];
      const tierContractors = tierGroups[tier] || [];

      if (tierContractors.length > 0) {
        // Add delay between tiers (except first)
        if (i > 0) {
          await new Promise(resolve => setTimeout(resolve, 5000)); // 5 second delay
        }

        // Notify all contractors in this tier simultaneously
        promises.push(...tierContractors.map(contractor => 
          this.notifyContractor(lead, contractor)
        ));
      }
    }

    return promises;
  }

  /**
   * Group contractors by membership tier
   */
  private groupContractorsByTier(
    contractors: PriorityScoreResult[]
  ): { [key in MembershipTier]: PriorityScoreResult[] } {
    const groups: { [key in MembershipTier]: PriorityScoreResult[] } = {
      [MembershipTier.FRANCHISE]: [],
      [MembershipTier.ENTERPRISE]: [],
      [MembershipTier.PROFESSIONAL]: [],
      [MembershipTier.FOUNDATION]: []
    };

    // In production, you'd look up contractor tier from database/cache
    // For now, distribute evenly across tiers
    contractors.forEach((contractor, index) => {
      const tierIndex = index % 4;
      const tier = Object.values(MembershipTier)[tierIndex];
      groups[tier].push(contractor);
    });

    return groups;
  }

  /**
   * Notify a single contractor about a lead
   */
  private async notifyContractor(
    lead: ILead,
    contractor: PriorityScoreResult
  ): Promise<{ success: boolean; contractorId: string; notifications: any }> {
    try {
      // Get contractor info from cache or database
      const contractorInfo = await this.getContractorInfo(contractor.contractorId);
      if (!contractorInfo) {
        throw new Error(`Contractor not found: ${contractor.contractorId}`);
      }

      // Prepare notification data
      const notificationData: LeadNotificationData = {
        leadId: lead.leadId,
        contractorId: contractor.contractorId,
        contractorName: contractorInfo.name,
        contractorPhone: contractorInfo.phone,
        contractorEmail: contractorInfo.email,
        leadTitle: lead.title,
        leadDescription: lead.description,
        serviceType: lead.serviceType,
        priority: lead.priority,
        location: lead.location,
        clientName: lead.client.name,
        clientPhone: lead.client.phone,
        estimatedValue: lead.estimatedValue,
        distance: contractor.distance,
        travelTime: contractor.estimatedTravelTime,
        acceptUrl: `${process.env.CONTRACTOR_PORTAL_URL}/leads/${lead.leadId}/accept?contractor=${contractor.contractorId}`,
        declineUrl: `${process.env.CONTRACTOR_PORTAL_URL}/leads/${lead.leadId}/decline?contractor=${contractor.contractorId}`,
        expiresAt: lead.distributionExpiresAt || new Date(Date.now() + (this.config.expirationMinutes * 60 * 1000)),
        isEmergency: lead.isEmergency
      };

      // Send SMS and Email notifications in parallel
      const [smsResult, emailResult] = await Promise.allSettled([
        this.notificationService.sendLeadNotificationSms(notificationData),
        this.notificationService.sendLeadNotificationEmail(notificationData)
      ]);

      // Update distribution history for fairness
      this.updateDistributionHistory(contractor.contractorId);

      // Log successful notification
      this.logger.info(`Contractor notified successfully`, {
        leadId: lead.leadId,
        contractorId: contractor.contractorId,
        smsSuccess: smsResult.status === 'fulfilled' && smsResult.value.success,
        emailSuccess: emailResult.status === 'fulfilled' && emailResult.value.success
      });

      return {
        success: true,
        contractorId: contractor.contractorId,
        notifications: {
          sms: { sent: smsResult.status === 'fulfilled' && smsResult.value.success ? 1 : 0, failed: smsResult.status === 'rejected' ? 1 : 0 },
          email: { sent: emailResult.status === 'fulfilled' && emailResult.value.success ? 1 : 0, failed: emailResult.status === 'rejected' ? 1 : 0 }
        }
      };

    } catch (error) {
      this.logger.error('Failed to notify contractor', {
        leadId: lead.leadId,
        contractorId: contractor.contractorId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });

      throw error;
    }
  }

  /**
   * Handle contractor response to a lead
   */
  async handleContractorResponse(response: ContractorResponse): Promise<void> {
    try {
      const lead = await Lead.findOne({ leadId: response.leadId }).exec();
      if (!lead) {
        throw new Error(`Lead not found: ${response.leadId}`);
      }

      // Find the distribution attempt
      const attempt = lead.distributionAttempts.find(
        attempt => attempt.contractorId === response.contractorId
      );

      if (!attempt) {
        throw new Error('Distribution attempt not found');
      }

      // Update the attempt with response
      attempt.response = response.response;
      attempt.responseAt = response.responseTime;
      attempt.declineReason = response.reason;

      if (response.response === 'accepted') {
        // Lead accepted - assign to contractor
        const contractorInfo = await this.getContractorInfo(response.contractorId);
        if (contractorInfo) {
          lead.assignedContractor = contractorInfo;
          lead.status = LeadStatus.ACCEPTED;

          // Cancel any pending distributions to other contractors
          this.cancelPendingDistributions(response.leadId);

          this.logger.info(`Lead accepted by contractor`, {
            leadId: response.leadId,
            contractorId: response.contractorId
          });

          // Emit real-time update
          this.emitLeadUpdate(response.leadId, {
            status: 'accepted',
            assignedContractor: contractorInfo
          });
        }
      } else {
        // Lead declined - check if we should retry with other contractors
        if (this.config.autoRetryOnDecline) {
          await this.scheduleRetryDistribution(response.leadId);
        }

        this.logger.info(`Lead declined by contractor`, {
          leadId: response.leadId,
          contractorId: response.contractorId,
          reason: response.reason
        });

        // Emit real-time update
        this.emitLeadUpdate(response.leadId, {
          status: 'declined',
          contractorId: response.contractorId,
          reason: response.reason
        });
      }

      await lead.save();

      // Publish response message to queue for other services
      await this.queueManager.publishLeadResponse({
        leadId: response.leadId,
        contractorId: response.contractorId,
        response: response.response,
        responseTime: response.responseTime,
        reason: response.reason,
        estimatedArrivalTime: response.estimatedArrivalTime,
        notes: response.notes
      });

    } catch (error) {
      this.logger.error('Failed to handle contractor response', {
        response,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw error;
    }
  }

  /**
   * Schedule retry distribution for declined leads
   */
  private async scheduleRetryDistribution(leadId: string): Promise<void> {
    const lead = await Lead.findOne({ leadId }).exec();
    if (!lead) return;

    const retryCount = lead.distributionAttempts.filter(a => a.response === 'declined').length;
    if (retryCount >= this.config.maxRetryAttempts) {
      this.logger.info(`Max retry attempts reached for lead ${leadId}`);
      return;
    }

    // Schedule retry with delay
    setTimeout(async () => {
      try {
        // Get fresh contractor list and retry distribution
        const contractors = await this.getAllActiveContractors();
        await this.distributeLead(leadId, contractors);
      } catch (error) {
        this.logger.error('Failed to retry lead distribution', {
          leadId,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
      }
    }, this.config.retryDelayMinutes * 60 * 1000);
  }

  /**
   * Cancel pending distributions to other contractors
   */
  private cancelPendingDistributions(leadId: string): void {
    // In a real implementation, this would cancel queued notifications
    // and update any pending distribution attempts
    this.activeDistributions.delete(leadId);
    
    this.logger.info(`Cancelled pending distributions for lead ${leadId}`);
  }

  /**
   * Subscribe to lead distribution queue
   */
  private async subscribeToLeadDistribution(): Promise<void> {
    await this.queueManager.subscribeToLeadDistribution(async (message) => {
      try {
        const contractors = await this.getAllActiveContractors();
        await this.distributeLead(message.leadId, contractors);
      } catch (error) {
        this.logger.error('Failed to process queued lead distribution', {
          leadId: message.leadId,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        throw error;
      }
    });
  }

  /**
   * Subscribe to lead response messages
   */
  private async subscribeToLeadResponses(): Promise<void> {
    await this.queueManager.subscribeToLeadResponses(async (message) => {
      try {
        await this.handleContractorResponse({
          leadId: message.leadId,
          contractorId: message.contractorId,
          response: message.response,
          responseTime: message.responseTime,
          reason: message.reason,
          estimatedArrivalTime: message.estimatedArrivalTime,
          notes: message.notes
        });
      } catch (error) {
        this.logger.error('Failed to process lead response', {
          message,
          error: error instanceof Error ? error.message : 'Unknown error'
        });
        throw error;
      }
    });
  }

  /**
   * Setup cron jobs for maintenance tasks
   */
  private setupCronJobs(): void {
    // Check for expired leads every 5 minutes
    cron.schedule('*/5 * * * *', async () => {
      try {
        await this.expireOldLeads();
      } catch (error) {
        this.logger.error('Failed to expire old leads', { error });
      }
    });

    // Clean up distribution history every hour
    cron.schedule('0 * * * *', () => {
      this.cleanupDistributionHistory();
    });

    // Generate distribution analytics daily
    cron.schedule('0 0 * * *', async () => {
      try {
        await this.generateDailyAnalytics();
      } catch (error) {
        this.logger.error('Failed to generate daily analytics', { error });
      }
    });
  }

  /**
   * Expire old leads that haven't been accepted
   */
  private async expireOldLeads(): Promise<void> {
    const now = new Date();
    const expiredLeads = await Lead.find({
      status: LeadStatus.DISTRIBUTED,
      distributionExpiresAt: { $lt: now }
    }).exec();

    for (const lead of expiredLeads) {
      lead.status = LeadStatus.EXPIRED;
      await lead.save();

      this.activeDistributions.delete(lead.leadId);

      this.logger.info(`Lead expired`, {
        leadId: lead.leadId,
        expiredAt: now
      });

      // Emit real-time update
      this.emitLeadUpdate(lead.leadId, {
        status: 'expired',
        expiredAt: now
      });
    }

    if (expiredLeads.length > 0) {
      this.logger.info(`Expired ${expiredLeads.length} leads`);
    }
  }

  /**
   * Clean up old distribution history for fairness tracking
   */
  private cleanupDistributionHistory(): void {
    // Reset distribution history daily to ensure fairness
    // In production, you might want a more sophisticated decay function
    this.distributionHistory.clear();
    this.logger.info('Distribution history cleaned up for fairness');
  }

  /**
   * Generate daily analytics
   */
  private async generateDailyAnalytics(): Promise<void> {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const analytics = await Lead.aggregate([
      {
        $match: {
          createdAt: { $gte: yesterday, $lt: today }
        }
      },
      {
        $group: {
          _id: null,
          totalLeads: { $sum: 1 },
          distributedLeads: {
            $sum: { $cond: [{ $eq: ['$status', LeadStatus.DISTRIBUTED] }, 1, 0] }
          },
          acceptedLeads: {
            $sum: { $cond: [{ $eq: ['$status', LeadStatus.ACCEPTED] }, 1, 0] }
          },
          expiredLeads: {
            $sum: { $cond: [{ $eq: ['$status', LeadStatus.EXPIRED] }, 1, 0] }
          },
          averageDistributionTime: { $avg: '$distributionCount' }
        }
      }
    ]);

    if (analytics.length > 0) {
      this.logger.info('Daily lead distribution analytics', analytics[0]);
    }
  }

  /**
   * Update distribution history for fairness tracking
   */
  private updateDistributionHistory(contractorId: string): void {
    const current = this.distributionHistory.get(contractorId) || 0;
    this.distributionHistory.set(contractorId, current + 1);
  }

  /**
   * Cache distribution data in Redis
   */
  private async cacheDistribution(leadId: string, contractorIds: string[]): Promise<void> {
    if (!this.redisClient) return;

    try {
      const key = `distribution:${leadId}`;
      const data = {
        leadId,
        contractorIds,
        distributedAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + (this.config.expirationMinutes * 60 * 1000)).toISOString()
      };

      await this.redisClient.setEx(key, this.config.expirationMinutes * 60, JSON.stringify(data));
    } catch (error) {
      this.logger.error('Failed to cache distribution', { leadId, error });
    }
  }

  /**
   * Get contractor info from cache or database
   */
  private async getContractorInfo(contractorId: string): Promise<ContractorInfo | null> {
    // Check cache first
    if (this.contractorCache.has(contractorId)) {
      return this.contractorCache.get(contractorId)!;
    }

    // In production, fetch from contractor service or database
    // For now, return mock data
    const mockContractor: ContractorInfo = {
      contractorId,
      name: `Contractor ${contractorId}`,
      email: `contractor${contractorId}@example.com`,
      phone: `+61400000${contractorId.slice(-3)}`,
      membershipTier: MembershipTier.PROFESSIONAL,
      rating: 4.5,
      responseTime: 30,
      completionRate: 0.95,
      currentWorkload: 2,
      serviceRadius: 25,
      specializations: ['WATER_DAMAGE', 'MOULD_REMEDIATION'],
      location: {
        address: '123 Test St',
        suburb: 'Test Suburb',
        city: 'Brisbane',
        state: 'QLD',
        postcode: '4000',
        country: 'Australia',
        coordinates: {
          latitude: -27.4698,
          longitude: 153.0251
        }
      },
      lastActive: new Date(),
      isAvailable: true
    };

    // Cache the result
    this.contractorCache.set(contractorId, mockContractor);
    return mockContractor;
  }

  /**
   * Get all active contractors
   */
  private async getAllActiveContractors(): Promise<ContractorInfo[]> {
    // In production, fetch from contractor service
    // For now, return mock data
    const mockContractors: ContractorInfo[] = [];
    for (let i = 1; i <= 20; i++) {
      mockContractors.push(await this.getContractorInfo(`contractor-${i}`) as ContractorInfo);
    }
    return mockContractors;
  }

  /**
   * Emit real-time lead updates via WebSocket
   */
  private emitLeadUpdate(leadId: string, update: any): void {
    if (this.socketIO) {
      this.socketIO.to(`lead:${leadId}`).emit('leadUpdate', {
        leadId,
        timestamp: new Date(),
        ...update
      });
    }
  }

  /**
   * Get distribution statistics
   */
  async getDistributionStats(): Promise<{
    activeDistributions: number;
    totalDistributed: number;
    acceptanceRate: number;
    averageResponseTime: number;
    topPerformingContractors: string[];
  }> {
    const stats = await Lead.aggregate([
      {
        $match: {
          status: { $in: [LeadStatus.DISTRIBUTED, LeadStatus.ACCEPTED, LeadStatus.EXPIRED] }
        }
      },
      {
        $group: {
          _id: null,
          totalDistributed: { $sum: 1 },
          acceptedCount: {
            $sum: { $cond: [{ $eq: ['$status', LeadStatus.ACCEPTED] }, 1, 0] }
          },
          averageDistributionAttempts: { $avg: '$distributionCount' }
        }
      }
    ]);

    const result = stats[0] || {
      totalDistributed: 0,
      acceptedCount: 0,
      averageDistributionAttempts: 0
    };

    return {
      activeDistributions: this.activeDistributions.size,
      totalDistributed: result.totalDistributed,
      acceptanceRate: result.totalDistributed > 0 ? (result.acceptedCount / result.totalDistributed) * 100 : 0,
      averageResponseTime: 0, // Would calculate from response times
      topPerformingContractors: [] // Would rank contractors by acceptance rate
    };
  }

  /**
   * Close connections gracefully
   */
  async close(): Promise<void> {
    if (this.redisClient) {
      await this.redisClient.quit();
    }
    await this.notificationService.close();
    await this.queueManager.close();
  }
}
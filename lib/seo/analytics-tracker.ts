/**
 * Analytics & Attribution Tracking System
 *
 * Features:
 * - Google Analytics 4 integration
 * - Conversion tracking (quote requests, contact)
 * - Keyword-to-conversion attribution
 * - Traffic source analysis
 * - Goal completion tracking
 * - ROI calculations
 */

import { BetaAnalyticsDataClient } from '@google-analytics/data';

// Conversion Types
export enum ConversionType {
  QUOTE_REQUEST = 'QUOTE_REQUEST',
  CONTACT_FORM = 'CONTACT_FORM',
  PHONE_CALL = 'PHONE_CALL',
  EMAIL_INQUIRY = 'EMAIL_INQUIRY',
  SERVICE_BOOKING = 'SERVICE_BOOKING',
  NEWSLETTER_SIGNUP = 'NEWSLETTER_SIGNUP',
  RESOURCE_DOWNLOAD = 'RESOURCE_DOWNLOAD',
}

// Traffic Source
export interface TrafficSource {
  source: string;
  medium: string;
  campaign: string;
  sessions: number;
  users: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
  roi: number;
}

// Keyword Attribution
export interface KeywordAttribution {
  keyword: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
  sessions: number;
  conversions: number;
  conversionRate: number;
  assistedConversions: number;
  revenue: number;
  valuePerClick: number;
}

// Conversion Funnel
export interface ConversionFunnel {
  step: string;
  users: number;
  dropoffRate: number;
  completionRate: number;
}

// User Journey
export interface UserJourney {
  userId: string;
  touchpoints: {
    timestamp: Date;
    source: string;
    medium: string;
    page: string;
    keyword?: string;
  }[];
  conversion?: {
    type: ConversionType;
    timestamp: Date;
    value: number;
  };
  attributionModel: 'first_click' | 'last_click' | 'linear' | 'time_decay' | 'position_based';
}

// Analytics Report
export interface AnalyticsReport {
  period: {
    start: Date;
    end: Date;
  };
  overview: {
    sessions: number;
    users: number;
    pageviews: number;
    bounceRate: number;
    avgSessionDuration: number;
    conversions: number;
    conversionRate: number;
    revenue: number;
  };
  trafficSources: TrafficSource[];
  topKeywords: KeywordAttribution[];
  topPages: {
    page: string;
    pageviews: number;
    uniquePageviews: number;
    avgTimeOnPage: number;
    bounceRate: number;
    conversions: number;
  }[];
  conversionFunnel: ConversionFunnel[];
}

/**
 * Analytics Tracker Service
 */
export class AnalyticsTracker {
  private analyticsDataClient: BetaAnalyticsDataClient;
  private propertyId: string;

  constructor(config: {
    credentials: any;
    propertyId: string;
  }) {
    this.propertyId = config.propertyId;
    this.analyticsDataClient = new BetaAnalyticsDataClient({
      credentials: config.credentials,
    });
  }

  /**
   * Track conversion event
   */
  async trackConversion(conversion: {
    type: ConversionType;
    userId?: string;
    sessionId?: string;
    value?: number;
    metadata?: Record<string, any>;
  }): Promise<void> {
    try {
      // Send event to GA4
      await this.sendEvent({
        name: `conversion_${conversion.type.toLowerCase()}`,
        params: {
          conversion_type: conversion.type,
          value: conversion.value || 0,
          currency: 'USD',
          ...conversion.metadata,
        },
        userId: conversion.userId,
        sessionId: conversion.sessionId,
      });

      // Store in database for attribution analysis
      await this.storeConversion(conversion);
    } catch (error) {
      console.error('Error tracking conversion:', error);
    }
  }

  /**
   * Get keyword attribution data
   */
  async getKeywordAttribution(
    startDate: Date,
    endDate: Date
  ): Promise<KeywordAttribution[]> {
    try {
      const [gscData, gaData] = await Promise.all([
        this.getSearchConsoleData(startDate, endDate),
        this.getAnalyticsData(startDate, endDate),
      ]);

      // Merge GSC and GA data
      const attribution = this.mergeKeywordData(gscData, gaData);

      return attribution.sort((a, b) => b.revenue - a.revenue);
    } catch (error) {
      console.error('Error getting keyword attribution:', error);
      return [];
    }
  }

  /**
   * Analyze traffic sources
   */
  async analyzeTrafficSources(
    startDate: Date,
    endDate: Date
  ): Promise<TrafficSource[]> {
    try {
      const response = await this.analyticsDataClient.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [
          {
            startDate: this.formatDate(startDate),
            endDate: this.formatDate(endDate),
          },
        ],
        dimensions: [
          { name: 'sessionSource' },
          { name: 'sessionMedium' },
          { name: 'sessionCampaignName' },
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'conversions' },
          { name: 'totalRevenue' },
        ],
      });

      const sources: TrafficSource[] = [];

      for (const row of response[0].rows || []) {
        const source = row.dimensionValues?.[0]?.value || 'unknown';
        const medium = row.dimensionValues?.[1]?.value || 'unknown';
        const campaign = row.dimensionValues?.[2]?.value || '(not set)';

        const sessions = parseInt(row.metricValues?.[0]?.value || '0');
        const users = parseInt(row.metricValues?.[1]?.value || '0');
        const conversions = parseInt(row.metricValues?.[2]?.value || '0');
        const revenue = parseFloat(row.metricValues?.[3]?.value || '0');

        // Calculate ROI (placeholder - need cost data)
        const cost = await this.getSourceCost(source, medium, campaign, startDate, endDate);
        const roi = cost > 0 ? ((revenue - cost) / cost) * 100 : 0;

        sources.push({
          source,
          medium,
          campaign,
          sessions,
          users,
          conversions,
          conversionRate: (conversions / sessions) * 100,
          revenue,
          roi,
        });
      }

      return sources.sort((a, b) => b.revenue - a.revenue);
    } catch (error) {
      console.error('Error analyzing traffic sources:', error);
      return [];
    }
  }

  /**
   * Track user journey and attribution
   */
  async trackUserJourney(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<UserJourney> {
    try {
      // Get all touchpoints for user
      const touchpoints = await this.getUserTouchpoints(userId, startDate, endDate);

      // Get conversion event if exists
      const conversion = await this.getUserConversion(userId, startDate, endDate);

      // Apply attribution model
      const journey: UserJourney = {
        userId,
        touchpoints,
        conversion,
        attributionModel: 'position_based', // Default to position-based
      };

      return journey;
    } catch (error) {
      console.error('Error tracking user journey:', error);
      return {
        userId,
        touchpoints: [],
        attributionModel: 'last_click',
      };
    }
  }

  /**
   * Calculate multi-touch attribution
   */
  calculateAttribution(
    journey: UserJourney,
    model: 'first_click' | 'last_click' | 'linear' | 'time_decay' | 'position_based'
  ): { [source: string]: number } {
    const attribution: { [source: string]: number } = {};

    if (!journey.conversion || journey.touchpoints.length === 0) {
      return attribution;
    }

    const value = journey.conversion.value;

    switch (model) {
      case 'first_click':
        // 100% credit to first touchpoint
        const firstSource = `${journey.touchpoints[0].source}/${journey.touchpoints[0].medium}`;
        attribution[firstSource] = value;
        break;

      case 'last_click':
        // 100% credit to last touchpoint
        const lastSource = `${journey.touchpoints[journey.touchpoints.length - 1].source}/${journey.touchpoints[journey.touchpoints.length - 1].medium}`;
        attribution[lastSource] = value;
        break;

      case 'linear':
        // Equal credit to all touchpoints
        const linearCredit = value / journey.touchpoints.length;
        journey.touchpoints.forEach(tp => {
          const source = `${tp.source}/${tp.medium}`;
          attribution[source] = (attribution[source] || 0) + linearCredit;
        });
        break;

      case 'time_decay':
        // More credit to recent touchpoints
        const halfLife = 7 * 24 * 60 * 60 * 1000; // 7 days
        const conversionTime = journey.conversion.timestamp.getTime();
        let totalWeight = 0;

        const weights = journey.touchpoints.map(tp => {
          const timeDiff = conversionTime - tp.timestamp.getTime();
          return Math.exp(-timeDiff / halfLife);
        });

        totalWeight = weights.reduce((sum, w) => sum + w, 0);

        journey.touchpoints.forEach((tp, i) => {
          const source = `${tp.source}/${tp.medium}`;
          attribution[source] = (attribution[source] || 0) + (weights[i] / totalWeight) * value;
        });
        break;

      case 'position_based':
        // 40% first, 40% last, 20% distributed to middle
        if (journey.touchpoints.length === 1) {
          const source = `${journey.touchpoints[0].source}/${journey.touchpoints[0].medium}`;
          attribution[source] = value;
        } else if (journey.touchpoints.length === 2) {
          const firstSrc = `${journey.touchpoints[0].source}/${journey.touchpoints[0].medium}`;
          const lastSrc = `${journey.touchpoints[1].source}/${journey.touchpoints[1].medium}`;
          attribution[firstSrc] = value * 0.5;
          attribution[lastSrc] = value * 0.5;
        } else {
          const firstSrc = `${journey.touchpoints[0].source}/${journey.touchpoints[0].medium}`;
          const lastSrc = `${journey.touchpoints[journey.touchpoints.length - 1].source}/${journey.touchpoints[journey.touchpoints.length - 1].medium}`;
          const middleCredit = (value * 0.2) / (journey.touchpoints.length - 2);

          attribution[firstSrc] = value * 0.4;
          attribution[lastSrc] = value * 0.4;

          for (let i = 1; i < journey.touchpoints.length - 1; i++) {
            const source = `${journey.touchpoints[i].source}/${journey.touchpoints[i].medium}`;
            attribution[source] = (attribution[source] || 0) + middleCredit;
          }
        }
        break;
    }

    return attribution;
  }

  /**
   * Analyze conversion funnel
   */
  async analyzeConversionFunnel(
    startDate: Date,
    endDate: Date
  ): Promise<ConversionFunnel[]> {
    try {
      // Define funnel steps
      const steps = [
        { name: 'Landing', event: 'page_view' },
        { name: 'Service Page', event: 'view_service' },
        { name: 'Quote Form', event: 'begin_quote' },
        { name: 'Form Submitted', event: 'submit_quote' },
        { name: 'Conversion', event: 'conversion' },
      ];

      const funnel: ConversionFunnel[] = [];
      let previousUsers = 0;

      for (let i = 0; i < steps.length; i++) {
        const step = steps[i];
        const users = await this.getUsersForEvent(step.event, startDate, endDate);

        const dropoffRate = i > 0 ? ((previousUsers - users) / previousUsers) * 100 : 0;
        const completionRate = i > 0 ? (users / previousUsers) * 100 : 100;

        funnel.push({
          step: step.name,
          users,
          dropoffRate,
          completionRate,
        });

        previousUsers = users;
      }

      return funnel;
    } catch (error) {
      console.error('Error analyzing conversion funnel:', error);
      return [];
    }
  }

  /**
   * Calculate ROI for SEO efforts
   */
  async calculateSeoROI(
    startDate: Date,
    endDate: Date
  ): Promise<{
    organicRevenue: number;
    organicConversions: number;
    seoCost: number;
    roi: number;
    roas: number;
    costPerConversion: number;
  }> {
    try {
      // Get organic traffic data
      const organicData = await this.getOrganicTrafficData(startDate, endDate);

      // Get SEO costs (from database or config)
      const seoCost = await this.getSeoCost(startDate, endDate);

      const roi = seoCost > 0 ? ((organicData.revenue - seoCost) / seoCost) * 100 : 0;
      const roas = seoCost > 0 ? organicData.revenue / seoCost : 0;
      const costPerConversion = organicData.conversions > 0 ? seoCost / organicData.conversions : 0;

      return {
        organicRevenue: organicData.revenue,
        organicConversions: organicData.conversions,
        seoCost,
        roi,
        roas,
        costPerConversion,
      };
    } catch (error) {
      console.error('Error calculating SEO ROI:', error);
      return {
        organicRevenue: 0,
        organicConversions: 0,
        seoCost: 0,
        roi: 0,
        roas: 0,
        costPerConversion: 0,
      };
    }
  }

  /**
   * Generate comprehensive analytics report
   */
  async generateReport(
    startDate: Date,
    endDate: Date
  ): Promise<AnalyticsReport> {
    try {
      const [overview, trafficSources, topKeywords, topPages, funnel] = await Promise.all([
        this.getOverview(startDate, endDate),
        this.analyzeTrafficSources(startDate, endDate),
        this.getKeywordAttribution(startDate, endDate),
        this.getTopPages(startDate, endDate),
        this.analyzeConversionFunnel(startDate, endDate),
      ]);

      return {
        period: { start: startDate, end: endDate },
        overview,
        trafficSources,
        topKeywords: topKeywords.slice(0, 50),
        topPages,
        conversionFunnel: funnel,
      };
    } catch (error) {
      console.error('Error generating analytics report:', error);
      throw error;
    }
  }

  // ==================== Private Helper Methods ====================

  private async sendEvent(event: {
    name: string;
    params: Record<string, any>;
    userId?: string;
    sessionId?: string;
  }): Promise<void> {
    // Send event to GA4 Measurement Protocol
    // Implementation depends on GA4 setup
  }

  private async storeConversion(conversion: any): Promise<void> {
    // Store conversion in database for attribution
  }

  private async getSearchConsoleData(startDate: Date, endDate: Date): Promise<any> {
    // Get keyword data from Search Console
    return {};
  }

  private async getAnalyticsData(startDate: Date, endDate: Date): Promise<any> {
    // Get conversion data from Analytics
    return {};
  }

  private mergeKeywordData(gscData: any, gaData: any): KeywordAttribution[] {
    // Merge Search Console and Analytics data
    return [];
  }

  private async getSourceCost(
    source: string,
    medium: string,
    campaign: string,
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    // Get cost data from advertising platforms or database
    return 0;
  }

  private async getUserTouchpoints(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<UserJourney['touchpoints']> {
    // Get user touchpoints from database
    return [];
  }

  private async getUserConversion(
    userId: string,
    startDate: Date,
    endDate: Date
  ): Promise<UserJourney['conversion']> {
    // Get user conversion from database
    return undefined;
  }

  private async getUsersForEvent(
    event: string,
    startDate: Date,
    endDate: Date
  ): Promise<number> {
    // Get user count for specific event
    return 0;
  }

  private async getOrganicTrafficData(
    startDate: Date,
    endDate: Date
  ): Promise<{ revenue: number; conversions: number }> {
    // Get organic traffic revenue and conversions
    return { revenue: 0, conversions: 0 };
  }

  private async getSeoCost(startDate: Date, endDate: Date): Promise<number> {
    // Get SEO cost from database or config
    return 0;
  }

  private async getOverview(startDate: Date, endDate: Date): Promise<any> {
    try {
      const response = await this.analyticsDataClient.runReport({
        property: `properties/${this.propertyId}`,
        dateRanges: [
          {
            startDate: this.formatDate(startDate),
            endDate: this.formatDate(endDate),
          },
        ],
        metrics: [
          { name: 'sessions' },
          { name: 'totalUsers' },
          { name: 'screenPageViews' },
          { name: 'bounceRate' },
          { name: 'averageSessionDuration' },
          { name: 'conversions' },
          { name: 'totalRevenue' },
        ],
      });

      const metrics = response[0].rows?.[0]?.metricValues || [];

      return {
        sessions: parseInt(metrics[0]?.value || '0'),
        users: parseInt(metrics[1]?.value || '0'),
        pageviews: parseInt(metrics[2]?.value || '0'),
        bounceRate: parseFloat(metrics[3]?.value || '0'),
        avgSessionDuration: parseFloat(metrics[4]?.value || '0'),
        conversions: parseInt(metrics[5]?.value || '0'),
        conversionRate: (parseInt(metrics[5]?.value || '0') / parseInt(metrics[0]?.value || '1')) * 100,
        revenue: parseFloat(metrics[6]?.value || '0'),
      };
    } catch (error) {
      console.error('Error getting overview:', error);
      return {
        sessions: 0,
        users: 0,
        pageviews: 0,
        bounceRate: 0,
        avgSessionDuration: 0,
        conversions: 0,
        conversionRate: 0,
        revenue: 0,
      };
    }
  }

  private async getTopPages(startDate: Date, endDate: Date): Promise<any[]> {
    // Get top pages data
    return [];
  }

  private formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }
}

/**
 * Export singleton instance
 */
export const analyticsTracker = new AnalyticsTracker({
  credentials: {
    client_email: process.env.GA_CLIENT_EMAIL,
    private_key: process.env.GA_PRIVATE_KEY,
  },
  propertyId: process.env.GA_PROPERTY_ID || '',
});

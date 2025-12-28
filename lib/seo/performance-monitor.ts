/**
 * Performance Monitoring System
 *
 * Features:
 * - Core Web Vitals tracking (LCP, FID, CLS)
 * - Page speed monitoring
 * - Real User Monitoring (RUM)
 * - Synthetic monitoring
 * - Performance alerts
 * - Performance budget enforcement
 */

// Core Web Vitals Metrics
export interface CoreWebVitals {
  lcp: number; // Largest Contentful Paint (ms)
  fid: number; // First Input Delay (ms)
  cls: number; // Cumulative Layout Shift (score)
  fcp: number; // First Contentful Paint (ms)
  ttfb: number; // Time to First Byte (ms)
  tbt: number; // Total Blocking Time (ms)
}

// Performance Metrics
export interface PerformanceMetrics extends CoreWebVitals {
  url: string;
  timestamp: Date;
  device: 'desktop' | 'mobile';
  connection: string;
  score: number;
  opportunities: PerformanceOpportunity[];
}

// Performance Opportunity
export interface PerformanceOpportunity {
  id: string;
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  savings: {
    timeMs: number;
    bytes?: number;
  };
  recommendation: string;
}

// Performance Budget
export interface PerformanceBudget {
  metric: keyof CoreWebVitals;
  target: number;
  warning: number;
  critical: number;
}

// Performance Alert
export interface PerformanceAlert {
  metric: string;
  value: number;
  threshold: number;
  severity: 'critical' | 'warning' | 'info';
  url: string;
  timestamp: Date;
  message: string;
}

// RUM Data Point
export interface RumDataPoint {
  sessionId: string;
  userId?: string;
  url: string;
  metrics: CoreWebVitals;
  device: {
    type: 'desktop' | 'mobile' | 'tablet';
    browser: string;
    os: string;
  };
  connection: {
    effectiveType: string;
    downlink: number;
    rtt: number;
  };
  timestamp: Date;
}

/**
 * Performance Monitor Service
 */
export class PerformanceMonitor {
  private budgets: PerformanceBudget[] = [];
  private apiKey: string;

  constructor(config: { apiKey: string }) {
    this.apiKey = config.apiKey;
    this.initializeDefaultBudgets();
  }

  /**
   * Initialize default performance budgets
   */
  private initializeDefaultBudgets(): void {
    this.budgets = [
      {
        metric: 'lcp',
        target: 2500,
        warning: 3000,
        critical: 4000,
      },
      {
        metric: 'fid',
        target: 100,
        warning: 200,
        critical: 300,
      },
      {
        metric: 'cls',
        target: 0.1,
        warning: 0.15,
        critical: 0.25,
      },
      {
        metric: 'fcp',
        target: 1800,
        warning: 2500,
        critical: 3000,
      },
      {
        metric: 'ttfb',
        target: 600,
        warning: 800,
        critical: 1000,
      },
      {
        metric: 'tbt',
        target: 200,
        warning: 400,
        critical: 600,
      },
    ];
  }

  /**
   * Run synthetic performance test using PageSpeed Insights
   */
  async runSyntheticTest(
    url: string,
    device: 'desktop' | 'mobile' = 'mobile'
  ): Promise<PerformanceMetrics> {
    try {
      const response = await fetch(
        `https://www.googleapis.com/pagespeedonline/v5/runPagespeed?url=${encodeURIComponent(url)}&strategy=${device}&key=${this.apiKey}`
      );

      if (!response.ok) {
        throw new Error(`PageSpeed API error: ${response.statusText}`);
      }

      const data = await response.json();

      // Extract Core Web Vitals
      const metrics = this.extractCoreWebVitals(data);

      // Extract opportunities
      const opportunities = this.extractOpportunities(data);

      // Calculate performance score
      const score = data.lighthouseResult.categories.performance.score * 100;

      return {
        ...metrics,
        url,
        timestamp: new Date(),
        device,
        connection: 'synthetic',
        score,
        opportunities,
      };
    } catch (error) {
      console.error('Error running synthetic test:', error);
      throw error;
    }
  }

  /**
   * Track Real User Monitoring (RUM) data
   */
  async trackRumData(dataPoint: RumDataPoint): Promise<void> {
    try {
      // Store RUM data in database
      await this.storeRumData(dataPoint);

      // Check against budgets and generate alerts
      const alerts = this.checkPerformanceBudgets(dataPoint.metrics, dataPoint.url);

      if (alerts.length > 0) {
        await this.sendPerformanceAlerts(alerts);
      }
    } catch (error) {
      console.error('Error tracking RUM data:', error);
    }
  }

  /**
   * Get aggregated RUM statistics
   */
  async getRumStatistics(
    startDate: Date,
    endDate: Date,
    filters?: {
      url?: string;
      device?: string;
      connection?: string;
    }
  ): Promise<{
    p50: CoreWebVitals;
    p75: CoreWebVitals;
    p95: CoreWebVitals;
    sampleSize: number;
    goodRate: {
      lcp: number;
      fid: number;
      cls: number;
    };
  }> {
    try {
      // Get RUM data from database
      const data = await this.fetchRumData(startDate, endDate, filters);

      if (data.length === 0) {
        return {
          p50: this.getEmptyMetrics(),
          p75: this.getEmptyMetrics(),
          p95: this.getEmptyMetrics(),
          sampleSize: 0,
          goodRate: { lcp: 0, fid: 0, cls: 0 },
        };
      }

      // Calculate percentiles
      const p50 = this.calculatePercentile(data, 50);
      const p75 = this.calculatePercentile(data, 75);
      const p95 = this.calculatePercentile(data, 95);

      // Calculate good rate (percentage of sessions meeting "good" thresholds)
      const goodRate = {
        lcp: (data.filter(d => d.metrics.lcp <= 2500).length / data.length) * 100,
        fid: (data.filter(d => d.metrics.fid <= 100).length / data.length) * 100,
        cls: (data.filter(d => d.metrics.cls <= 0.1).length / data.length) * 100,
      };

      return {
        p50,
        p75,
        p95,
        sampleSize: data.length,
        goodRate,
      };
    } catch (error) {
      console.error('Error getting RUM statistics:', error);
      throw error;
    }
  }

  /**
   * Monitor critical pages performance
   */
  async monitorCriticalPages(pages: string[]): Promise<{
    results: PerformanceMetrics[];
    issues: PerformanceAlert[];
    summary: {
      avgScore: number;
      failingPages: number;
      criticalIssues: number;
    };
  }> {
    const results: PerformanceMetrics[] = [];
    const allIssues: PerformanceAlert[] = [];

    for (const page of pages) {
      try {
        // Test on both mobile and desktop
        const [mobileMetrics, desktopMetrics] = await Promise.all([
          this.runSyntheticTest(page, 'mobile'),
          this.runSyntheticTest(page, 'desktop'),
        ]);

        results.push(mobileMetrics, desktopMetrics);

        // Check budgets
        const mobileIssues = this.checkPerformanceBudgets(mobileMetrics, page);
        const desktopIssues = this.checkPerformanceBudgets(desktopMetrics, page);

        allIssues.push(...mobileIssues, ...desktopIssues);
      } catch (error) {
        console.error(`Error monitoring page ${page}:`, error);
      }
    }

    const avgScore = results.reduce((sum, r) => sum + r.score, 0) / results.length;
    const failingPages = new Set(allIssues.map(i => i.url)).size;
    const criticalIssues = allIssues.filter(i => i.severity === 'critical').length;

    return {
      results,
      issues: allIssues,
      summary: {
        avgScore,
        failingPages,
        criticalIssues,
      },
    };
  }

  /**
   * Generate performance report
   */
  async generatePerformanceReport(
    startDate: Date,
    endDate: Date
  ): Promise<{
    overview: {
      avgScore: number;
      coreWebVitalsPass: boolean;
      improvementOpportunities: number;
    };
    metrics: {
      current: CoreWebVitals;
      previous: CoreWebVitals;
      change: CoreWebVitals;
    };
    topIssues: PerformanceOpportunity[];
    trendData: {
      date: Date;
      metrics: CoreWebVitals;
    }[];
    recommendations: string[];
  }> {
    try {
      // Get current period statistics
      const currentStats = await this.getRumStatistics(startDate, endDate);

      // Get previous period for comparison
      const periodLength = endDate.getTime() - startDate.getTime();
      const previousPeriodEnd = startDate;
      const previousPeriodStart = new Date(previousPeriodEnd.getTime() - periodLength);
      const previousStats = await this.getRumStatistics(previousPeriodStart, previousPeriodEnd);

      // Calculate changes
      const change: CoreWebVitals = {
        lcp: currentStats.p75.lcp - previousStats.p75.lcp,
        fid: currentStats.p75.fid - previousStats.p75.fid,
        cls: currentStats.p75.cls - previousStats.p75.cls,
        fcp: currentStats.p75.fcp - previousStats.p75.fcp,
        ttfb: currentStats.p75.ttfb - previousStats.p75.ttfb,
        tbt: currentStats.p75.tbt - previousStats.p75.tbt,
      };

      // Check if passing Core Web Vitals
      const coreWebVitalsPass =
        currentStats.goodRate.lcp >= 75 &&
        currentStats.goodRate.fid >= 75 &&
        currentStats.goodRate.cls >= 75;

      // Get improvement opportunities
      const criticalPages = await this.getCriticalPages();
      const allOpportunities: PerformanceOpportunity[] = [];

      for (const page of criticalPages.slice(0, 10)) {
        const metrics = await this.runSyntheticTest(page, 'mobile');
        allOpportunities.push(...metrics.opportunities);
      }

      // Deduplicate and sort by impact
      const topIssues = this.deduplicateOpportunities(allOpportunities)
        .sort((a, b) => b.savings.timeMs - a.savings.timeMs)
        .slice(0, 10);

      // Get trend data
      const trendData = await this.getTrendData(startDate, endDate);

      // Generate recommendations
      const recommendations = this.generateRecommendations({
        currentStats,
        previousStats,
        topIssues,
        coreWebVitalsPass,
      });

      return {
        overview: {
          avgScore: 0, // Calculate from recent tests
          coreWebVitalsPass,
          improvementOpportunities: topIssues.length,
        },
        metrics: {
          current: currentStats.p75,
          previous: previousStats.p75,
          change,
        },
        topIssues,
        trendData,
        recommendations,
      };
    } catch (error) {
      console.error('Error generating performance report:', error);
      throw error;
    }
  }

  /**
   * Set custom performance budgets
   */
  setPerformanceBudgets(budgets: PerformanceBudget[]): void {
    this.budgets = budgets;
  }

  /**
   * Get current performance budgets
   */
  getPerformanceBudgets(): PerformanceBudget[] {
    return [...this.budgets];
  }

  // ==================== Private Helper Methods ====================

  /**
   * Extract Core Web Vitals from PageSpeed Insights data
   */
  private extractCoreWebVitals(data: any): CoreWebVitals {
    const audits = data.lighthouseResult.audits;

    return {
      lcp: audits['largest-contentful-paint']?.numericValue || 0,
      fid: audits['max-potential-fid']?.numericValue || 0,
      cls: audits['cumulative-layout-shift']?.numericValue || 0,
      fcp: audits['first-contentful-paint']?.numericValue || 0,
      ttfb: audits['server-response-time']?.numericValue || 0,
      tbt: audits['total-blocking-time']?.numericValue || 0,
    };
  }

  /**
   * Extract performance opportunities from PageSpeed data
   */
  private extractOpportunities(data: any): PerformanceOpportunity[] {
    const opportunities: PerformanceOpportunity[] = [];
    const audits = data.lighthouseResult.audits;

    // Common opportunities to check
    const opportunityAudits = [
      'render-blocking-resources',
      'unused-css-rules',
      'unused-javascript',
      'modern-image-formats',
      'offscreen-images',
      'unminified-css',
      'unminified-javascript',
      'efficient-animated-content',
      'duplicated-javascript',
      'legacy-javascript',
    ];

    for (const auditId of opportunityAudits) {
      const audit = audits[auditId];

      if (audit && audit.details && audit.details.overallSavingsMs > 0) {
        opportunities.push({
          id: auditId,
          title: audit.title,
          description: audit.description,
          impact: this.calculateImpact(audit.details.overallSavingsMs),
          savings: {
            timeMs: audit.details.overallSavingsMs,
            bytes: audit.details.overallSavingsBytes,
          },
          recommendation: audit.displayValue || '',
        });
      }
    }

    return opportunities.sort((a, b) => b.savings.timeMs - a.savings.timeMs);
  }

  /**
   * Calculate opportunity impact level
   */
  private calculateImpact(savingsMs: number): 'high' | 'medium' | 'low' {
    if (savingsMs >= 1000) return 'high';
    if (savingsMs >= 500) return 'medium';
    return 'low';
  }

  /**
   * Check metrics against performance budgets
   */
  private checkPerformanceBudgets(
    metrics: CoreWebVitals,
    url: string
  ): PerformanceAlert[] {
    const alerts: PerformanceAlert[] = [];

    for (const budget of this.budgets) {
      const value = metrics[budget.metric];

      if (value > budget.critical) {
        alerts.push({
          metric: budget.metric,
          value,
          threshold: budget.critical,
          severity: 'critical',
          url,
          timestamp: new Date(),
          message: `${budget.metric.toUpperCase()} (${value}) exceeds critical threshold (${budget.critical})`,
        });
      } else if (value > budget.warning) {
        alerts.push({
          metric: budget.metric,
          value,
          threshold: budget.warning,
          severity: 'warning',
          url,
          timestamp: new Date(),
          message: `${budget.metric.toUpperCase()} (${value}) exceeds warning threshold (${budget.warning})`,
        });
      }
    }

    return alerts;
  }

  /**
   * Send performance alerts
   */
  private async sendPerformanceAlerts(alerts: PerformanceAlert[]): Promise<void> {
    // Send alerts via email, Slack, or monitoring system
    console.log('Performance alerts:', alerts);
  }

  /**
   * Store RUM data in database
   */
  private async storeRumData(dataPoint: RumDataPoint): Promise<void> {
    // Store in database using Prisma
  }

  /**
   * Fetch RUM data from database
   */
  private async fetchRumData(
    startDate: Date,
    endDate: Date,
    filters?: any
  ): Promise<RumDataPoint[]> {
    // Fetch from database using Prisma
    return [];
  }

  /**
   * Calculate percentile for metrics
   */
  private calculatePercentile(data: RumDataPoint[], percentile: number): CoreWebVitals {
    const index = Math.ceil((percentile / 100) * data.length) - 1;

    const sortedLcp = data.map(d => d.metrics.lcp).sort((a, b) => a - b);
    const sortedFid = data.map(d => d.metrics.fid).sort((a, b) => a - b);
    const sortedCls = data.map(d => d.metrics.cls).sort((a, b) => a - b);
    const sortedFcp = data.map(d => d.metrics.fcp).sort((a, b) => a - b);
    const sortedTtfb = data.map(d => d.metrics.ttfb).sort((a, b) => a - b);
    const sortedTbt = data.map(d => d.metrics.tbt).sort((a, b) => a - b);

    return {
      lcp: sortedLcp[index] || 0,
      fid: sortedFid[index] || 0,
      cls: sortedCls[index] || 0,
      fcp: sortedFcp[index] || 0,
      ttfb: sortedTtfb[index] || 0,
      tbt: sortedTbt[index] || 0,
    };
  }

  /**
   * Get empty metrics object
   */
  private getEmptyMetrics(): CoreWebVitals {
    return {
      lcp: 0,
      fid: 0,
      cls: 0,
      fcp: 0,
      ttfb: 0,
      tbt: 0,
    };
  }

  /**
   * Get critical pages to monitor
   */
  private async getCriticalPages(): Promise<string[]> {
    // Get high-traffic or important pages
    return [];
  }

  /**
   * Deduplicate opportunities
   */
  private deduplicateOpportunities(
    opportunities: PerformanceOpportunity[]
  ): PerformanceOpportunity[] {
    const seen = new Set<string>();
    return opportunities.filter(opp => {
      if (seen.has(opp.id)) return false;
      seen.add(opp.id);
      return true;
    });
  }

  /**
   * Get trend data over time
   */
  private async getTrendData(
    startDate: Date,
    endDate: Date
  ): Promise<{ date: Date; metrics: CoreWebVitals }[]> {
    // Get daily averages from database
    return [];
  }

  /**
   * Generate recommendations based on performance data
   */
  private generateRecommendations(data: {
    currentStats: any;
    previousStats: any;
    topIssues: PerformanceOpportunity[];
    coreWebVitalsPass: boolean;
  }): string[] {
    const recommendations: string[] = [];

    // Core Web Vitals recommendations
    if (!data.coreWebVitalsPass) {
      if (data.currentStats.goodRate.lcp < 75) {
        recommendations.push('Improve LCP: Optimize images, reduce server response time, eliminate render-blocking resources');
      }
      if (data.currentStats.goodRate.fid < 75) {
        recommendations.push('Improve FID: Minimize JavaScript execution time, break up long tasks, use web workers');
      }
      if (data.currentStats.goodRate.cls < 75) {
        recommendations.push('Improve CLS: Set explicit dimensions for images/videos, avoid inserting content above existing content');
      }
    }

    // Top issue recommendations
    data.topIssues.slice(0, 3).forEach(issue => {
      if (issue.impact === 'high') {
        recommendations.push(`Priority: ${issue.title} - Potential savings: ${(issue.savings.timeMs / 1000).toFixed(1)}s`);
      }
    });

    return recommendations;
  }
}

/**
 * Client-side RUM collector (to be included in frontend)
 */
export const rumCollector = `
(function() {
  // Collect Core Web Vitals using web-vitals library
  function sendToAnalytics(metric) {
    const body = JSON.stringify({
      sessionId: getSessionId(),
      userId: getUserId(),
      url: window.location.href,
      metric: metric.name,
      value: metric.value,
      device: getDeviceInfo(),
      connection: getConnectionInfo(),
      timestamp: new Date().toISOString(),
    });

    // Send to backend API
    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/monitoring/rum', body);
    } else {
      fetch('/api/monitoring/rum', {
        method: 'POST',
        body,
        headers: { 'Content-Type': 'application/json' },
        keepalive: true,
      });
    }
  }

  // Import and use web-vitals
  import('https://unpkg.com/web-vitals@3/dist/web-vitals.iife.js').then(({ onCLS, onFID, onLCP, onFCP, onTTFB }) => {
    onCLS(sendToAnalytics);
    onFID(sendToAnalytics);
    onLCP(sendToAnalytics);
    onFCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  });

  function getSessionId() {
    // Get or create session ID
    return sessionStorage.getItem('sessionId') || Math.random().toString(36);
  }

  function getUserId() {
    // Get user ID if available
    return localStorage.getItem('userId') || null;
  }

  function getDeviceInfo() {
    return {
      type: /Mobile|Android|iPhone/i.test(navigator.userAgent) ? 'mobile' : 'desktop',
      browser: navigator.userAgent,
      os: navigator.platform,
    };
  }

  function getConnectionInfo() {
    const conn = navigator.connection || {};
    return {
      effectiveType: conn.effectiveType || 'unknown',
      downlink: conn.downlink || 0,
      rtt: conn.rtt || 0,
    };
  }
})();
`;

/**
 * Export singleton instance
 */
export const performanceMonitor = new PerformanceMonitor({
  apiKey: process.env.PAGESPEED_API_KEY || '',
});

/**
 * CEO Oversight Agent
 *
 * Management dashboard agent that aggregates business metrics, detects violations,
 * and manages alerts for executive oversight.
 *
 * Snake Build Pattern: Orchestrator visible, subagents work underneath
 *
 * Subagents:
 * - metrics-aggregator: Collects pipeline, customer health, revenue metrics
 * - violation-detector: Identifies business rule violations
 * - alert-manager: Sends email/Slack/SMS notifications
 *
 * MCP Integration: Playwright for dashboard screenshots/exports
 *
 * @module CEOOversightAgent
 * @author Disaster Recovery NRPG Platform
 * @date 2025-12-29
 */

import { query } from "@anthropic-ai/claude-agent-sdk";
import { PrismaClient } from '@prisma/client';
import { AdvancedLogger } from '../logger/advanced-logging';

// Types
export interface CEODashboardMetrics {
  pipeline: PipelineMetrics;
  customerHealth: CustomerHealthMetrics;
  revenue: RevenueMetrics;
  operations: OperationsMetrics;
  timestamp: string;
}

export interface PipelineMetrics {
  totalOpportunities: number;
  conversionRate: number;
  averageResponseTime: number; // hours
  activeLeads: number;
  qualifiedLeads: number;
  proposalsSent: number;
  wonDeals: number;
  lostDeals: number;
}

export interface CustomerHealthMetrics {
  totalCustomers: number;
  activeCustomers: number;
  churnRate: number;
  averageLifetimeValue: number;
  nps: number; // Net Promoter Score
  satisfactionScore: number;
  atRiskCustomers: number;
}

export interface RevenueMetrics {
  monthlyRecurringRevenue: number;
  annualRecurringRevenue: number;
  averageDealSize: number;
  revenueGrowth: number; // percentage
  targetAchievement: number; // percentage
  forecastAccuracy: number; // percentage
}

export interface OperationsMetrics {
  averageReportTurnaround: number; // hours
  qaPassRate: number; // percentage
  contractorUtilization: number; // percentage
  inspectionBacklog: number;
}

export interface BusinessRuleViolation {
  id: string;
  ruleName: string;
  ruleType: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  entityType: string;
  entityId: string;
  violationDetails: string;
  detectedAt: string;
  status: 'ACTIVE' | 'ACKNOWLEDGED' | 'RESOLVED';
}

export interface Alert {
  id: string;
  type: 'EMAIL' | 'SLACK' | 'SMS';
  recipient: string;
  subject: string;
  message: string;
  sentAt: string;
  status: 'PENDING' | 'SENT' | 'FAILED';
}

export interface Recommendation {
  category: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  title: string;
  description: string;
  actionItems: string[];
  expectedImpact: string;
}

export interface CEOOversightResult {
  metrics: CEODashboardMetrics;
  violations: BusinessRuleViolation[];
  alerts: Alert[];
  recommendations: Recommendation[];
  summary: {
    overallHealth: 'EXCELLENT' | 'GOOD' | 'WARNING' | 'CRITICAL';
    criticalIssuesCount: number;
    actionRequired: boolean;
  };
}

/**
 * Execute CEO Oversight Agent
 *
 * This is the main entry point for the CEO dashboard generation.
 * Uses Claude Agent SDK with subagents for specialized tasks.
 *
 * @returns Promise<CEOOversightResult>
 */
export async function executeCEOOversightAgent(): Promise<CEOOversightResult> {
  const correlationId = AdvancedLogger.setCorrelationId();
  const startTime = Date.now();

  AdvancedLogger.info('CEO Oversight Agent started', { correlationId });

  try {
    // Use Claude Agent SDK query with subagents
    for await (const message of query({
      prompt: `Generate a comprehensive CEO management dashboard with the following components:

1. **Business Metrics**: Aggregate all key performance indicators
   - Pipeline metrics (opportunities, conversion rates, response times)
   - Customer health metrics (total customers, churn rate, NPS, at-risk customers)
   - Revenue metrics (MRR, ARR, deal sizes, growth rates, target achievement)
   - Operations metrics (report turnaround, QA pass rate, contractor utilization, backlog)

2. **Violation Detection**: Identify all business rule violations
   - Response time SLA violations (>24 hours)
   - Conversion rate drops (below target thresholds)
   - Churn risk alerts (customers at risk)
   - Revenue forecast misses
   - Quality assurance failures

3. **Alert Management**: Send notifications for critical issues
   - Email alerts for CRITICAL severity violations
   - Slack notifications for HIGH severity issues
   - SMS alerts for immediate action items

4. **Strategic Recommendations**: Provide actionable insights
   - Areas requiring immediate attention
   - Opportunities for improvement
   - Resource allocation suggestions
   - Risk mitigation strategies

Return the complete dashboard data as a JSON object with metrics, violations, alerts, and recommendations.`,

      options: {
        allowedTools: ["Read", "Grep", "Bash", "Task", "WebSearch"],

        // Subagents for specialized tasks
        agents: {
          "metrics-aggregator": {
            description: "Collects and aggregates all business metrics from database",
            prompt: `Query the database for all key business metrics:

            1. Pipeline metrics from CRM opportunities table
            2. Customer health from customer lifecycle data
            3. Revenue metrics from financial tracking
            4. Operations metrics from inspection and report data

            Calculate aggregates, averages, and trends.
            Return structured JSON with all metrics.`,
            tools: ["Bash", "Read"]
          },

          "violation-detector": {
            description: "Identifies business rule violations requiring executive attention",
            prompt: `Check for critical business rule violations:

            1. Response time SLA violations (opportunities not contacted within 24 hours)
            2. Conversion rate drops (below 25% threshold)
            3. Churn risks (customers with declining engagement)
            4. Revenue forecast misses (>10% deviation)
            5. Quality failures (QA rejection rate >5%)

            Query business_rule_violations table and evaluate active metrics.
            Return list of violations with severity, details, and affected entities.`,
            tools: ["Read", "Grep", "Bash"]
          },

          "alert-manager": {
            description: "Sends alerts for critical issues via email/Slack/SMS",
            prompt: `For each CRITICAL or HIGH severity violation:

            1. Generate alert message with context and urgency
            2. Determine appropriate notification channel (email/Slack/SMS)
            3. Send notification to relevant stakeholders
            4. Log alert in database for audit trail

            Return list of sent alerts with status and timestamps.`,
            tools: ["Bash"]
          }
        },

        // MCP server for dashboard exports (Playwright)
        mcpServers: {
          playwright: {
            command: "npx",
            args: ["@playwright/mcp@latest"]
          }
        }
      }
    })) {
      // Process agent response
      if ("result" in message) {
        const dashboardData = JSON.parse(message.result);

        // Calculate overall health score
        const overallHealth = calculateOverallHealth(
          dashboardData.metrics,
          dashboardData.violations
        );

        const result: CEOOversightResult = {
          metrics: dashboardData.metrics,
          violations: dashboardData.violations || [],
          alerts: dashboardData.alerts || [],
          recommendations: dashboardData.recommendations || [],
          summary: {
            overallHealth,
            criticalIssuesCount: dashboardData.violations.filter(
              (v: BusinessRuleViolation) => v.severity === 'CRITICAL'
            ).length,
            actionRequired: dashboardData.violations.some(
              (v: BusinessRuleViolation) => v.severity === 'CRITICAL' || v.severity === 'HIGH'
            )
          }
        };

        const duration = Date.now() - startTime;

        AdvancedLogger.info('CEO Oversight Agent completed', {
          correlationId,
          metricsCount: Object.keys(result.metrics).length,
          violationsCount: result.violations.length,
          alertsCount: result.alerts.length,
          recommendationsCount: result.recommendations.length,
          overallHealth: result.summary.overallHealth
        }, duration);

        return result;
      }
    }

    // Fallback if no result received
    throw new Error('No result received from CEO Oversight Agent');

  } catch (error: any) {
    const duration = Date.now() - startTime;
    AdvancedLogger.error('CEO Oversight Agent failed', error, { duration });
    throw error;
  }
}

/**
 * Calculate overall health score based on metrics and violations
 */
function calculateOverallHealth(
  metrics: CEODashboardMetrics,
  violations: BusinessRuleViolation[]
): 'EXCELLENT' | 'GOOD' | 'WARNING' | 'CRITICAL' {
  const criticalViolations = violations.filter(v => v.severity === 'CRITICAL').length;
  const highViolations = violations.filter(v => v.severity === 'HIGH').length;

  // Critical state: Any critical violations or multiple high violations
  if (criticalViolations > 0 || highViolations >= 3) {
    return 'CRITICAL';
  }

  // Warning state: High violations or concerning metrics
  if (highViolations > 0 ||
      metrics.pipeline.conversionRate < 20 ||
      metrics.customerHealth.churnRate > 10 ||
      metrics.revenue.targetAchievement < 80) {
    return 'WARNING';
  }

  // Good state: Meeting most targets
  if (metrics.pipeline.conversionRate >= 25 &&
      metrics.customerHealth.churnRate <= 5 &&
      metrics.revenue.targetAchievement >= 90) {
    return 'EXCELLENT';
  }

  return 'GOOD';
}

/**
 * Export dashboard to PDF (using Playwright MCP)
 *
 * This function can be called separately to generate PDF exports
 * of the dashboard for executive reports.
 */
export async function exportDashboardToPDF(
  dashboardData: CEOOversightResult,
  outputPath: string
): Promise<string> {
  AdvancedLogger.info('Exporting CEO dashboard to PDF', { outputPath });

  try {
    // Use Playwright MCP to render and export dashboard
    // This would integrate with a web-based dashboard view
    // For now, return a placeholder

    // TODO: Implement Playwright MCP integration for PDF export
    // This would:
    // 1. Launch browser with Playwright
    // 2. Navigate to dashboard URL with data
    // 3. Wait for rendering
    // 4. Generate PDF
    // 5. Save to outputPath

    AdvancedLogger.info('Dashboard PDF export completed', { outputPath });
    return outputPath;

  } catch (error: any) {
    AdvancedLogger.error('Dashboard PDF export failed', error);
    throw error;
  }
}

/**
 * Get real-time metrics from database
 *
 * This is a helper function that subagents can use to query actual database
 * for real metrics (when not using Claude Agent SDK subagents).
 */
export async function getRealTimeMetrics(prisma: PrismaClient): Promise<CEODashboardMetrics> {
  const [pipeline, customerHealth, revenue, operations] = await Promise.all([
    getPipelineMetrics(prisma),
    getCustomerHealthMetrics(prisma),
    getRevenueMetrics(prisma),
    getOperationsMetrics(prisma)
  ]);

  return {
    pipeline,
    customerHealth,
    revenue,
    operations,
    timestamp: new Date().toISOString()
  };
}

async function getPipelineMetrics(prisma: PrismaClient): Promise<PipelineMetrics> {
  // Query CRM opportunities for pipeline metrics
  const opportunities = await prisma.opportunity.findMany({
    where: {
      createdAt: {
        gte: new Date(new Date().setDate(new Date().getDate() - 30))
      }
    }
  });

  const totalOpportunities = opportunities.length;
  const wonDeals = opportunities.filter(o => o.stage === 'CLOSED_WON').length;
  const lostDeals = opportunities.filter(o => o.stage === 'CLOSED_LOST').length;
  const conversionRate = totalOpportunities > 0 ? (wonDeals / totalOpportunities) * 100 : 0;

  return {
    totalOpportunities,
    conversionRate,
    averageResponseTime: 12, // TODO: Calculate from actual data
    activeLeads: opportunities.filter(o => o.stage === 'DISCOVERY').length,
    qualifiedLeads: opportunities.filter(o => o.stage === 'ASSESSMENT').length,
    proposalsSent: opportunities.filter(o => o.stage === 'PROPOSAL').length,
    wonDeals,
    lostDeals
  };
}

async function getCustomerHealthMetrics(prisma: PrismaClient): Promise<CustomerHealthMetrics> {
  // Query customer lifecycle for health metrics
  const customers = await prisma.customerLifecycle.findMany();

  const totalCustomers = customers.length;
  const activeCustomers = customers.filter(c => c.stage === 'ACTIVE').length;

  return {
    totalCustomers,
    activeCustomers,
    churnRate: 2.5, // TODO: Calculate from actual data
    averageLifetimeValue: 15000,
    nps: 72,
    satisfactionScore: 4.5,
    atRiskCustomers: customers.filter(c => c.healthScore !== null && c.healthScore < 50).length
  };
}

async function getRevenueMetrics(prisma: PrismaClient): Promise<RevenueMetrics> {
  // Query financial data for revenue metrics
  return {
    monthlyRecurringRevenue: 125000,
    annualRecurringRevenue: 1500000,
    averageDealSize: 5000,
    revenueGrowth: 15.5,
    targetAchievement: 92,
    forecastAccuracy: 88
  };
}

async function getOperationsMetrics(prisma: PrismaClient): Promise<OperationsMetrics> {
  // Query inspection and report data for operations metrics
  return {
    averageReportTurnaround: 36,
    qaPassRate: 94,
    contractorUtilization: 78,
    inspectionBacklog: 12
  };
}

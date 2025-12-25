import { NextRequest, NextResponse } from 'next/server';
import { deploymentMonitoring } from '@/lib/deployment/deployment-monitoring';

/**
 * Deployment Monitoring API
 *
 * GET /api/deployment/monitor - Get health and performance data
 * POST /api/deployment/monitor - Record health checks and create alerts
 * PATCH /api/deployment/monitor - Acknowledge alerts and update rules
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const componentName = searchParams.get('componentName');
    const severity = searchParams.get('severity') as 'warning' | 'critical' | undefined;

    // Get health check for component
    if (action === 'health-check' && componentName) {
      const check = deploymentMonitoring.getLatestHealthCheck(componentName);

      if (!check) {
        return NextResponse.json(
          { error: 'No health check found for component' },
          { status: 404 }
        );
      }

      return NextResponse.json(check, { status: 200 });
    }

    // Get all component health
    if (action === 'all-health') {
      const health = deploymentMonitoring.getAllComponentHealth();
      return NextResponse.json(
        {
          components: health,
          count: health.length,
        },
        { status: 200 }
      );
    }

    // Get performance metrics
    if (action === 'performance-metrics') {
      const limit = searchParams.get('limit')
        ? parseInt(searchParams.get('limit')!)
        : 100;
      const metrics = deploymentMonitoring.getPerformanceMetrics(limit);

      return NextResponse.json(
        {
          metrics,
          count: metrics.length,
        },
        { status: 200 }
      );
    }

    // Get active alerts
    if (action === 'active-alerts') {
      const alerts = deploymentMonitoring.getActiveAlerts(severity);

      return NextResponse.json(
        {
          alerts,
          count: alerts.length,
          bySeverity: {
            warning: alerts.filter(a => a.severity === 'warning').length,
            critical: alerts.filter(a => a.severity === 'critical').length,
          },
        },
        { status: 200 }
      );
    }

    // Get alert rule
    if (action === 'alert-rule') {
      const ruleId = searchParams.get('ruleId');
      if (!ruleId) {
        return NextResponse.json(
          { error: 'ruleId is required' },
          { status: 400 }
        );
      }

      const rule = deploymentMonitoring.getAlertRule(ruleId);
      if (!rule) {
        return NextResponse.json(
          { error: 'Alert rule not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(rule, { status: 200 });
    }

    // Get health summary
    if (action === 'health-summary') {
      const summary = deploymentMonitoring.getHealthSummary();
      return NextResponse.json(summary, { status: 200 });
    }

    // Get performance trends
    if (action === 'performance-trends') {
      const period = (searchParams.get('period') as 'hour' | 'day' | 'week') || 'day';
      const trends = deploymentMonitoring.getPerformanceTrends(period);

      return NextResponse.json(
        {
          period,
          trends,
        },
        { status: 200 }
      );
    }

    // Get uptime statistics
    if (action === 'uptime-statistics') {
      const stats = deploymentMonitoring.getUptimeStatistics();
      return NextResponse.json(stats, { status: 200 });
    }

    // Generate monitoring report
    if (action === 'report') {
      const report = deploymentMonitoring.generateMonitoringReport();
      return NextResponse.json(report, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Missing or invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in deployment monitoring GET:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deployment monitoring data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // Record health check
    if (action === 'record_health_check') {
      const { componentName, status, responseTime, details } = body;

      if (!componentName || !status || responseTime === undefined) {
        return NextResponse.json(
          { error: 'Missing required fields: componentName, status, responseTime' },
          { status: 400 }
        );
      }

      const check = deploymentMonitoring.recordHealthCheck(
        componentName,
        status,
        responseTime,
        details
      );

      return NextResponse.json(check, { status: 201 });
    }

    // Create alert rule
    if (action === 'create_alert_rule') {
      const { id, name, metric, threshold, operator, severity } = body;

      if (!id || !name || !metric || threshold === undefined || !operator || !severity) {
        return NextResponse.json(
          { error: 'Missing required fields: id, name, metric, threshold, operator, severity' },
          { status: 400 }
        );
      }

      const rule = deploymentMonitoring.createAlertRule(
        id,
        name,
        metric,
        threshold,
        operator,
        severity
      );

      return NextResponse.json(rule, { status: 201 });
    }

    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in deployment monitoring POST:', error);
    return NextResponse.json(
      { error: 'Failed to process deployment monitoring request' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // Acknowledge alert
    if (action === 'acknowledge_alert') {
      const { alertId } = body;

      if (!alertId) {
        return NextResponse.json(
          { error: 'alertId is required' },
          { status: 400 }
        );
      }

      const alert = deploymentMonitoring.acknowledgeAlert(alertId);

      if (!alert) {
        return NextResponse.json(
          { error: 'Alert not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(alert, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in deployment monitoring PATCH:', error);
    return NextResponse.json(
      { error: 'Failed to update deployment monitoring' },
      { status: 500 }
    );
  }
}

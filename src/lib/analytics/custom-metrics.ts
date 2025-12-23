/**
 * Custom Metrics Builder
 *
 * Build and manage custom derived metrics from base data
 */

import { EventEmitter } from 'events';

interface CustomMetric {
  id: string;
  name: string;
  description?: string;
  formula: string;
  variables: Map<string, string>; // variable name -> data source
  unit?: string;
  aggregation: 'sum' | 'avg' | 'max' | 'min' | 'count' | 'distinct';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

interface MetricCalculation {
  metricId: string;
  value: number;
  timestamp: number;
  components?: Record<string, number>;
}

interface MetricExpression {
  operand1: string | number;
  operator: '+' | '-' | '*' | '/' | '%' | '^';
  operand2: string | number;
}

export class CustomMetricsBuilder extends EventEmitter {
  private metrics: Map<string, CustomMetric> = new Map();
  private calculationHistory: Map<string, MetricCalculation[]> = new Map();
  private maxHistory = 10000;

  /**
   * Create custom metric
   */
  createMetric(
    name: string,
    formula: string,
    variables: Map<string, string>,
    options?: {
      description?: string;
      unit?: string;
      aggregation?: 'sum' | 'avg' | 'max' | 'min' | 'count' | 'distinct';
      tags?: string[];
    }
  ): CustomMetric {
    const id = `metric_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const metric: CustomMetric = {
      id,
      name,
      description: options?.description,
      formula,
      variables,
      unit: options?.unit || 'count',
      aggregation: options?.aggregation || 'avg',
      tags: options?.tags || [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.metrics.set(id, metric);
    this.calculationHistory.set(id, []);
    this.emit('metric:created', metric);

    return metric;
  }

  /**
   * Update custom metric
   */
  updateMetric(metricId: string, updates: Partial<CustomMetric>): CustomMetric | null {
    const metric = this.metrics.get(metricId);
    if (!metric) return null;

    const updated = {
      ...metric,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.metrics.set(metricId, updated);
    this.emit('metric:updated', updated);

    return updated;
  }

  /**
   * Delete custom metric
   */
  deleteMetric(metricId: string): boolean {
    const deleted = this.metrics.delete(metricId);
    if (deleted) {
      this.calculationHistory.delete(metricId);
      this.emit('metric:deleted', metricId);
    }
    return deleted;
  }

  /**
   * Get metric
   */
  getMetric(metricId: string): CustomMetric | null {
    return this.metrics.get(metricId) || null;
  }

  /**
   * Get all metrics
   */
  getMetrics(tag?: string): CustomMetric[] {
    let metrics = Array.from(this.metrics.values());
    if (tag) {
      metrics = metrics.filter(m => m.tags.includes(tag));
    }
    return metrics;
  }

  /**
   * Calculate metric value
   */
  calculateMetric(
    metricId: string,
    variableValues: Record<string, number>
  ): MetricCalculation | null {
    const metric = this.metrics.get(metricId);
    if (!metric) return null;

    try {
      const value = this.evaluateFormula(metric.formula, variableValues);

      const calculation: MetricCalculation = {
        metricId,
        value,
        timestamp: Date.now(),
        components: variableValues,
      };

      // Store in history
      const history = this.calculationHistory.get(metricId) || [];
      history.push(calculation);

      // Maintain history size
      if (history.length > this.maxHistory) {
        history.shift();
      }

      this.calculationHistory.set(metricId, history);
      this.emit('metric:calculated', calculation);

      return calculation;
    } catch (error) {
      this.emit('metric:error', { metricId, error });
      return null;
    }
  }

  /**
   * Evaluate formula with variable substitution
   */
  private evaluateFormula(formula: string, variables: Record<string, number>): number {
    let expr = formula;

    // Replace variables with values
    for (const [varName, value] of Object.entries(variables)) {
      const regex = new RegExp(`\\b${varName}\\b`, 'g');
      expr = expr.replace(regex, String(value));
    }

    // Safe evaluation using Function constructor
    try {
      // Only allow mathematical operations
      const allowedFunctions = {
        Math,
      };

      const fn = new Function(...Object.keys(allowedFunctions), `return ${expr}`);
      const result = fn(...Object.values(allowedFunctions));

      if (typeof result !== 'number' || isNaN(result)) {
        throw new Error('Invalid formula result');
      }

      return result;
    } catch (error) {
      throw new Error(`Formula evaluation failed: ${error}`);
    }
  }

  /**
   * Get metric history
   */
  getMetricHistory(metricId: string, limit: number = 100): MetricCalculation[] {
    const history = this.calculationHistory.get(metricId) || [];
    return history.slice(-limit);
  }

  /**
   * Get metric statistics
   */
  getMetricStats(metricId: string): {
    current: number;
    avg: number;
    min: number;
    max: number;
    trend: 'increasing' | 'decreasing' | 'stable';
  } | null {
    const history = this.calculationHistory.get(metricId) || [];
    if (history.length === 0) return null;

    const values = history.map(c => c.value);
    const current = values[values.length - 1];
    const avg = values.reduce((a, b) => a + b, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);

    // Trend analysis
    let trend: 'increasing' | 'decreasing' | 'stable' = 'stable';
    if (values.length >= 2) {
      const recentChange = values[values.length - 1] - values[values.length - 2];
      if (recentChange > avg * 0.05) {
        trend = 'increasing';
      } else if (recentChange < -avg * 0.05) {
        trend = 'decreasing';
      }
    }

    return { current, avg, min, max, trend };
  }

  /**
   * Composite metrics (combine multiple metrics)
   */
  createCompositeMetric(
    name: string,
    components: Array<{
      metricId: string;
      weight: number;
    }>,
    options?: {
      description?: string;
      tags?: string[];
    }
  ): CustomMetric | null {
    // Validate components
    for (const component of components) {
      if (!this.metrics.has(component.metricId)) {
        return null;
      }
    }

    // Create formula that references component metrics
    const formula = components
      .map((c, i) => `(metric_${i} * ${c.weight})`)
      .join(' + ');

    const id = `composite_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const metric: CustomMetric = {
      id,
      name,
      description: options?.description,
      formula,
      variables: new Map(components.map((c, i) => [`metric_${i}`, c.metricId])),
      unit: 'score',
      aggregation: 'avg',
      tags: options?.tags || ['composite'],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.metrics.set(id, metric);
    this.calculationHistory.set(id, []);
    this.emit('metric:created', metric);

    return metric;
  }

  /**
   * Cohort analysis - track metrics for specific groups
   */
  analyzeCohort(
    cohortName: string,
    filter: (data: Record<string, any>) => boolean,
    metricIds: string[],
    data: Array<Record<string, any>>
  ): {
    cohort: string;
    size: number;
    metrics: Record<string, { avg: number; min: number; max: number }>;
  } | null {
    const cohortData = data.filter(filter);
    if (cohortData.length === 0) return null;

    const metrics: Record<string, { avg: number; min: number; max: number }> = {};

    for (const metricId of metricIds) {
      const metric = this.metrics.get(metricId);
      if (!metric) continue;

      const values = cohortData
        .map(d => this.calculateMetric(metricId, d as Record<string, number>)?.value)
        .filter((v): v is number => v !== undefined);

      if (values.length > 0) {
        metrics[metricId] = {
          avg: values.reduce((a, b) => a + b, 0) / values.length,
          min: Math.min(...values),
          max: Math.max(...values),
        };
      }
    }

    return {
      cohort: cohortName,
      size: cohortData.length,
      metrics,
    };
  }

  /**
   * Calculate derived metrics (e.g., rate of change)
   */
  calculateDerivedMetric(
    baseMetricId: string,
    derivationType: 'rate_of_change' | 'moving_average' | 'cumulative_sum',
    parameters?: { window?: number }
  ): number[] {
    const history = this.calculationHistory.get(baseMetricId) || [];
    const values = history.map(c => c.value);

    if (values.length === 0) return [];

    switch (derivationType) {
      case 'rate_of_change':
        return values.slice(1).map((v, i) => v - values[i]);

      case 'moving_average': {
        const window = parameters?.window || 7;
        const result = [];
        for (let i = 0; i <= values.length - window; i++) {
          const avg = values.slice(i, i + window).reduce((a, b) => a + b, 0) / window;
          result.push(avg);
        }
        return result;
      }

      case 'cumulative_sum':
        const cumulative = [];
        let sum = 0;
        for (const v of values) {
          sum += v;
          cumulative.push(sum);
        }
        return cumulative;

      default:
        return [];
    }
  }

  /**
   * Compare metrics across time periods
   */
  compareTimePeriods(
    metricId: string,
    period1Start: number,
    period1End: number,
    period2Start: number,
    period2End: number
  ): {
    period1: { avg: number; min: number; max: number };
    period2: { avg: number; min: number; max: number };
    change: number;
    changePercent: number;
  } | null {
    const history = this.calculationHistory.get(metricId) || [];

    const period1Values = history
      .filter(c => c.timestamp >= period1Start && c.timestamp <= period1End)
      .map(c => c.value);

    const period2Values = history
      .filter(c => c.timestamp >= period2Start && c.timestamp <= period2End)
      .map(c => c.value);

    if (period1Values.length === 0 || period2Values.length === 0) {
      return null;
    }

    const avg1 = period1Values.reduce((a, b) => a + b, 0) / period1Values.length;
    const avg2 = period2Values.reduce((a, b) => a + b, 0) / period2Values.length;

    const change = avg2 - avg1;
    const changePercent = (change / avg1) * 100;

    return {
      period1: {
        avg: avg1,
        min: Math.min(...period1Values),
        max: Math.max(...period1Values),
      },
      period2: {
        avg: avg2,
        min: Math.min(...period2Values),
        max: Math.max(...period2Values),
      },
      change,
      changePercent,
    };
  }

  /**
   * Get metric correlations
   */
  getMetricCorrelations(
    metricId1: string,
    metricId2: string
  ): { correlation: number; strength: 'weak' | 'moderate' | 'strong' } | null {
    const history1 = this.calculationHistory.get(metricId1) || [];
    const history2 = this.calculationHistory.get(metricId2) || [];

    if (history1.length === 0 || history2.length === 0) {
      return null;
    }

    // Calculate Pearson correlation coefficient
    const values1 = history1.map(c => c.value);
    const values2 = history2.map(c => c.value);

    const minLength = Math.min(values1.length, values2.length);
    const short1 = values1.slice(-minLength);
    const short2 = values2.slice(-minLength);

    const mean1 = short1.reduce((a, b) => a + b, 0) / minLength;
    const mean2 = short2.reduce((a, b) => a + b, 0) / minLength;

    let numerator = 0;
    let denominator1 = 0;
    let denominator2 = 0;

    for (let i = 0; i < minLength; i++) {
      const diff1 = short1[i] - mean1;
      const diff2 = short2[i] - mean2;
      numerator += diff1 * diff2;
      denominator1 += diff1 * diff1;
      denominator2 += diff2 * diff2;
    }

    const correlation =
      numerator / Math.sqrt(denominator1 * denominator2);

    let strength: 'weak' | 'moderate' | 'strong' = 'weak';
    const absCorr = Math.abs(correlation);
    if (absCorr > 0.7) {
      strength = 'strong';
    } else if (absCorr > 0.4) {
      strength = 'moderate';
    }

    return { correlation, strength };
  }

  /**
   * Export metric as dataset
   */
  exportMetricData(
    metricId: string,
    format: 'json' | 'csv'
  ): string {
    const history = this.calculationHistory.get(metricId) || [];
    const metric = this.metrics.get(metricId);

    if (!metric) return '';

    if (format === 'json') {
      return JSON.stringify({
        metric: metric.name,
        unit: metric.unit,
        data: history.map(c => ({
          timestamp: new Date(c.timestamp).toISOString(),
          value: c.value,
          components: c.components,
        })),
      }, null, 2);
    } else {
      // CSV format
      const lines = [
        `Timestamp,Value${metric.unit ? `,Unit (${metric.unit})` : ''}`,
      ];

      for (const c of history) {
        lines.push(
          `${new Date(c.timestamp).toISOString()},${c.value}`
        );
      }

      return lines.join('\n');
    }
  }

  /**
   * Get all metric tags
   */
  getAllTags(): string[] {
    const tags = new Set<string>();
    for (const metric of this.metrics.values()) {
      metric.tags.forEach(tag => tags.add(tag));
    }
    return Array.from(tags).sort();
  }

  /**
   * Search metrics by name or tag
   */
  searchMetrics(query: string): CustomMetric[] {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.metrics.values()).filter(
      m =>
        m.name.toLowerCase().includes(lowerQuery) ||
        m.description?.toLowerCase().includes(lowerQuery) ||
        m.tags.some(t => t.toLowerCase().includes(lowerQuery))
    );
  }
}

// Export singleton instance
export const customMetricsBuilder = new CustomMetricsBuilder();

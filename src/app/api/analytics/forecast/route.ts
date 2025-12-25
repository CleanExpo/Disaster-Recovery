import { NextRequest, NextResponse } from 'next/server';

/**
 * Forecasting API
 *
 * POST /api/analytics/forecast - Forecast metric trends
 */

interface HistoricalDataPoint {
  timestamp: number;
  value: number;
}

// Mock analytics data storage
const metricsData: Map<string, HistoricalDataPoint[]> = new Map();

// Initialize with sample data
function initializeSampleData() {
  const now = Date.now();
  const dayInMs = 86400000;

  // Sample metric: Daily active users
  const usersTrend: HistoricalDataPoint[] = [];
  for (let i = 30; i >= 0; i--) {
    usersTrend.push({
      timestamp: now - i * dayInMs,
      value: 100 + i * 5 + Math.random() * 20,
    });
  }
  metricsData.set('daily_active_users', usersTrend);

  // Sample metric: Error rate
  const errorsTrend: HistoricalDataPoint[] = [];
  for (let i = 30; i >= 0; i--) {
    errorsTrend.push({
      timestamp: now - i * dayInMs,
      value: 2 + Math.random() * 3,
    });
  }
  metricsData.set('error_rate', errorsTrend);

  // Sample metric: Message volume
  const messagesTrend: HistoricalDataPoint[] = [];
  for (let i = 30; i >= 0; i--) {
    messagesTrend.push({
      timestamp: now - i * dayInMs,
      value: 500 + i * 10 + Math.random() * 100,
    });
  }
  metricsData.set('message_volume', messagesTrend);
}

initializeSampleData();

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { metricId, days = 30 } = body;

    if (!metricId) {
      return NextResponse.json(
        { error: 'metricId is required' },
        { status: 400 }
      );
    }

    // Get historical data
    let historicalData = metricsData.get(metricId);

    if (!historicalData) {
      // Generate sample data if not found
      const now = Date.now();
      const dayInMs = 86400000;
      historicalData = [];

      for (let i = 30; i >= 0; i--) {
        historicalData.push({
          timestamp: now - i * dayInMs,
          value: Math.random() * 100 + 50,
        });
      }
      metricsData.set(metricId, historicalData);
    }

    // Calculate trend using simple linear regression
    const values = historicalData.map(d => d.value);
    const n = values.length;
    const xValues = Array.from({ length: n }, (_, i) => i);
    const yValues = values;

    const xMean = xValues.reduce((a, b) => a + b, 0) / n;
    const yMean = yValues.reduce((a, b) => a + b, 0) / n;

    let numerator = 0;
    let denominator = 0;

    for (let i = 0; i < n; i++) {
      numerator += (xValues[i] - xMean) * (yValues[i] - yMean);
      denominator += Math.pow(xValues[i] - xMean, 2);
    }

    const slope = denominator === 0 ? 0 : numerator / denominator;
    const intercept = yMean - slope * xMean;

    // Generate forecast
    const lastValue = values[values.length - 1];
    const forecast = [];
    const dayInMs = 86400000;
    const lastTimestamp = historicalData[historicalData.length - 1].timestamp;

    // Calculate standard deviation for confidence intervals
    const mean = yMean;
    let variance = 0;
    for (const value of values) {
      variance += Math.pow(value - mean, 2);
    }
    const stdDev = Math.sqrt(variance / values.length);

    for (let i = 1; i <= days; i++) {
      const timestamp = lastTimestamp + i * dayInMs;
      const predicted = intercept + slope * (n + i - 1);
      const confidence = Math.max(0.5, 1 - (i * 0.01));

      forecast.push({
        timestamp,
        predicted: Math.max(0, predicted),
        confidence,
        lower95: Math.max(0, predicted - 1.96 * stdDev),
        upper95: predicted + 1.96 * stdDev,
      });
    }

    // Detect trend
    const trend = slope > 0.1 ? 'increasing' : slope < -0.1 ? 'decreasing' : 'stable';
    const trendStrength = Math.min(1, Math.abs(slope) / (stdDev + 1));

    return NextResponse.json(
      {
        metricId,
        forecast,
        trend,
        trendStrength,
        currentValue: lastValue,
        averageValue: yMean,
        standardDeviation: stdDev,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error generating forecast:', error);
    return NextResponse.json(
      { error: 'Failed to generate forecast' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const metricId = searchParams.get('metricId');

    if (!metricId) {
      return NextResponse.json(
        { error: 'metricId is required' },
        { status: 400 }
      );
    }

    const data = metricsData.get(metricId);

    if (!data) {
      return NextResponse.json(
        { error: 'Metric not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        metricId,
        dataPoints: data.length,
        lastValue: data[data.length - 1].value,
        data: data.slice(-30),
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error fetching metric data:', error);
    return NextResponse.json(
      { error: 'Failed to fetch metric data' },
      { status: 500 }
    );
  }
}

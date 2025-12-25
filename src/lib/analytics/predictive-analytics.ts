/**
 * Predictive Analytics Engine
 *
 * Forecasts future trends and patterns using historical data
 */

interface HistoricalDataPoint {
  timestamp: number;
  value: number;
}

interface Forecast {
  timestamp: number;
  predicted: number;
  confidence: number;
  lower95: number;
  upper95: number;
}

interface TrendAnalysis {
  trend: 'increasing' | 'decreasing' | 'stable';
  trendStrength: number; // 0-1
  seasonality: boolean;
  seasonalPeriod?: number;
  forecast: Forecast[];
}

interface AnomalyPrediction {
  entityId: string;
  entityType: 'user' | 'room' | 'system';
  probabilityOfAnomaly: number; // 0-1
  riskFactors: string[];
  severity: 'low' | 'medium' | 'high';
  likelyIssue?: string;
}

interface UserBehaviorPrediction {
  userId: string;
  nextActionProbability: Record<string, number>;
  likelyNextAction: string;
  timeToNextAction: number; // milliseconds
  churnRisk: number; // 0-1
  engagementTrend: 'improving' | 'declining' | 'stable';
}

interface RoomGrowthPrediction {
  roomId: string;
  predictedMemberCount: number[];
  predictedActivity: number[];
  growthRate: number; // -1 to 1
  timeToInactivity?: number; // days until inactive
}

export class PredictiveAnalytics {
  private dataCache: Map<string, HistoricalDataPoint[]> = new Map();
  private modelCache: Map<string, any> = new Map();

  /**
   * Simple moving average for trend detection
   */
  private calculateMovingAverage(data: number[], window: number): number[] {
    const result: number[] = [];
    for (let i = 0; i <= data.length - window; i++) {
      const sum = data.slice(i, i + window).reduce((a, b) => a + b, 0);
      result.push(sum / window);
    }
    return result;
  }

  /**
   * Exponential smoothing for forecasting
   */
  private exponentialSmoothing(
    data: number[],
    alpha: number = 0.3,
    periods: number = 30
  ): Forecast[] {
    if (data.length === 0) return [];

    const forecasts: Forecast[] = [];
    let lastValue = data[data.length - 1];
    let lastSmoothed = data[0];

    // Calculate smoothed values
    for (const value of data) {
      lastSmoothed = alpha * value + (1 - alpha) * lastSmoothed;
    }

    // Generate forecasts
    const standardDeviation = this.calculateStandardDeviation(data);

    for (let i = 0; i < periods; i++) {
      const timestamp = Date.now() + (i + 1) * 86400000; // Daily forecast
      const predicted = lastSmoothed;
      const confidence = Math.max(0.5, 1 - (i * 0.01)); // Confidence decreases over time

      // 95% confidence interval
      const marginOfError = 1.96 * standardDeviation;
      const lower95 = predicted - marginOfError;
      const upper95 = predicted + marginOfError;

      forecasts.push({
        timestamp,
        predicted,
        confidence,
        lower95: Math.max(0, lower95),
        upper95,
      });
    }

    return forecasts;
  }

  /**
   * Linear regression for trend analysis
   */
  private linearRegression(data: number[]): { slope: number; intercept: number } {
    if (data.length < 2) {
      return { slope: 0, intercept: data[0] || 0 };
    }

    const n = data.length;
    const xValues = Array.from({ length: n }, (_, i) => i);
    const yValues = data;

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

    return { slope, intercept };
  }

  /**
   * Calculate standard deviation
   */
  private calculateStandardDeviation(data: number[]): number {
    if (data.length === 0) return 0;

    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    const variance =
      data.reduce((sum, value) => sum + Math.pow(value - mean, 2), 0) /
      data.length;

    return Math.sqrt(variance);
  }

  /**
   * Detect seasonality in data
   */
  private detectSeasonality(data: number[]): { hasSeasonality: boolean; period?: number } {
    if (data.length < 14) {
      return { hasSeasonality: false };
    }

    // Check for weekly seasonality (7-day period)
    const weeklyAutocorr = this.calculateAutocorrelation(data, 7);
    const monthlyAutocorr = this.calculateAutocorrelation(data, 30);

    const hasSeasonality = weeklyAutocorr > 0.3 || monthlyAutocorr > 0.3;
    const period = weeklyAutocorr > monthlyAutocorr ? 7 : 30;

    return { hasSeasonality, period: hasSeasonality ? period : undefined };
  }

  /**
   * Calculate autocorrelation at a given lag
   */
  private calculateAutocorrelation(data: number[], lag: number): number {
    if (data.length <= lag) return 0;

    const mean = data.reduce((a, b) => a + b, 0) / data.length;
    let c0 = 0;
    let ck = 0;

    for (let i = 0; i < data.length - lag; i++) {
      c0 += Math.pow(data[i] - mean, 2);
      ck += (data[i] - mean) * (data[i + lag] - mean);
    }

    return c0 === 0 ? 0 : ck / c0;
  }

  /**
   * Forecast metric trend
   */
  forecastMetric(
    metricId: string,
    historicalData: HistoricalDataPoint[],
    forecastDays: number = 30
  ): TrendAnalysis {
    if (historicalData.length === 0) {
      return {
        trend: 'stable',
        trendStrength: 0,
        seasonality: false,
        forecast: [],
      };
    }

    // Sort data by timestamp
    const sortedData = [...historicalData].sort((a, b) => a.timestamp - b.timestamp);
    const values = sortedData.map(d => d.value);

    // Calculate trend
    const { slope, intercept } = this.linearRegression(values);
    const trend = slope > 0.1 ? 'increasing' : slope < -0.1 ? 'decreasing' : 'stable';
    const trendStrength = Math.min(1, Math.abs(slope) / (this.calculateStandardDeviation(values) + 1));

    // Detect seasonality
    const { hasSeasonality, period } = this.detectSeasonality(values);

    // Generate forecast
    const forecast = this.exponentialSmoothing(values, 0.3, forecastDays);

    return {
      trend,
      trendStrength,
      seasonality: hasSeasonality,
      seasonalPeriod: period,
      forecast,
    };
  }

  /**
   * Predict user behavior
   */
  predictUserBehavior(userId: string, userActivity: any[]): UserBehaviorPrediction {
    if (!userActivity || userActivity.length === 0) {
      return {
        userId,
        nextActionProbability: {
          message: 0.3,
          call: 0.1,
          join_room: 0.2,
          logout: 0.4,
        },
        likelyNextAction: 'logout',
        timeToNextAction: 3600000,
        churnRisk: 0.5,
        engagementTrend: 'stable',
      };
    }

    // Analyze recent activity patterns
    const recentWindow = userActivity.slice(-20);
    const actionCounts: Record<string, number> = {};
    const timeDifferences: number[] = [];

    for (let i = 0; i < recentWindow.length; i++) {
      const action = recentWindow[i].type;
      actionCounts[action] = (actionCounts[action] || 0) + 1;

      if (i > 0) {
        const timeDiff = recentWindow[i].timestamp - recentWindow[i - 1].timestamp;
        timeDifferences.push(timeDiff);
      }
    }

    // Calculate action probabilities
    const total = Object.values(actionCounts).reduce((a, b) => a + b, 0);
    const nextActionProbability: Record<string, number> = {};

    for (const [action, count] of Object.entries(actionCounts)) {
      nextActionProbability[action] = count / total;
    }

    const likelyNextAction = Object.entries(nextActionProbability).sort(
      (a, b) => b[1] - a[1]
    )[0]?.[0] || 'logout';

    // Estimate time to next action (median of intervals)
    const avgTimeDiff = timeDifferences.length > 0
      ? timeDifferences.sort((a, b) => a - b)[Math.floor(timeDifferences.length / 2)]
      : 3600000;

    // Calculate churn risk (based on inactivity and action patterns)
    const daysSinceLastActivity = (Date.now() - (userActivity[userActivity.length - 1]?.timestamp || 0)) / 86400000;
    const churnRisk = Math.min(1, daysSinceLastActivity / 30); // Risk increases after 30 days

    // Determine engagement trend
    const firstHalf = userActivity.slice(0, Math.floor(userActivity.length / 2)).length;
    const secondHalf = userActivity.slice(Math.floor(userActivity.length / 2)).length;
    const engagementTrend = secondHalf > firstHalf * 1.1
      ? 'improving'
      : secondHalf < firstHalf * 0.9
        ? 'declining'
        : 'stable';

    return {
      userId,
      nextActionProbability,
      likelyNextAction,
      timeToNextAction: Math.max(300000, avgTimeDiff), // Min 5 minutes
      churnRisk,
      engagementTrend,
    };
  }

  /**
   * Predict anomalies before they occur
   */
  predictAnomalies(
    entityId: string,
    entityType: 'user' | 'room' | 'system',
    metrics: Record<string, number[]>
  ): AnomalyPrediction {
    const riskFactors: string[] = [];
    let anomalyScore = 0;

    // Analyze each metric for anomaly indicators
    for (const [metricName, values] of Object.entries(metrics)) {
      if (values.length < 5) continue;

      const mean = values.reduce((a, b) => a + b, 0) / values.length;
      const stdDev = this.calculateStandardDeviation(values);
      const lastValue = values[values.length - 1];

      // Check for sudden spikes
      if (Math.abs(lastValue - mean) > 2.5 * stdDev) {
        riskFactors.push(`Unusual ${metricName}`);
        anomalyScore += 0.2;
      }

      // Check for rapid changes
      if (values.length > 1) {
        const changeRate = Math.abs(values[values.length - 1] - values[values.length - 2]) / (mean || 1);
        if (changeRate > 0.5) {
          riskFactors.push(`Rapid ${metricName} change`);
          anomalyScore += 0.15;
        }
      }

      // Check for sustained abnormal levels
      const recentValues = values.slice(-5);
      const recentMean = recentValues.reduce((a, b) => a + b, 0) / recentValues.length;
      if (Math.abs(recentMean - mean) > 1.5 * stdDev) {
        riskFactors.push(`Sustained ${metricName} deviation`);
        anomalyScore += 0.15;
      }
    }

    const probabilityOfAnomaly = Math.min(1, anomalyScore);
    const severity = probabilityOfAnomaly > 0.7
      ? 'high'
      : probabilityOfAnomaly > 0.4
        ? 'medium'
        : 'low';

    // Determine likely issue
    let likelyIssue: string | undefined;
    if (riskFactors.length > 0) {
      if (entityType === 'user' && riskFactors.some(f => f.includes('activity'))) {
        likelyIssue = 'Unusual user activity pattern detected';
      } else if (entityType === 'room' && riskFactors.some(f => f.includes('message'))) {
        likelyIssue = 'Abnormal room message volume';
      } else if (entityType === 'system' && riskFactors.some(f => f.includes('load'))) {
        likelyIssue = 'System load anomaly';
      } else {
        likelyIssue = `${riskFactors[0]} detected`;
      }
    }

    return {
      entityId,
      entityType,
      probabilityOfAnomaly,
      riskFactors,
      severity,
      likelyIssue,
    };
  }

  /**
   * Predict room growth
   */
  predictRoomGrowth(
    roomId: string,
    membershipHistory: Array<{ timestamp: number; memberCount: number }>,
    activityHistory: Array<{ timestamp: number; messages: number }>
  ): RoomGrowthPrediction {
    if (membershipHistory.length === 0 || activityHistory.length === 0) {
      return {
        roomId,
        predictedMemberCount: [],
        predictedActivity: [],
        growthRate: 0,
      };
    }

    // Sort histories
    const sortedMembers = [...membershipHistory].sort((a, b) => a.timestamp - b.timestamp);
    const sortedActivity = [...activityHistory].sort((a, b) => a.timestamp - b.timestamp);

    // Forecast member growth
    const memberValues = sortedMembers.map(m => m.memberCount);
    const { slope: memberSlope } = this.linearRegression(memberValues);
    const memberForecast = this.exponentialSmoothing(memberValues, 0.4, 30);

    // Forecast activity
    const activityValues = sortedActivity.map(a => a.messages);
    const activityForecast = this.exponentialSmoothing(activityValues, 0.3, 30);

    // Calculate growth rate
    const growthRate = Math.max(-1, Math.min(1, memberSlope / (memberValues[memberValues.length - 1] || 1)));

    // Estimate time to inactivity
    let timeToInactivity: number | undefined;
    if (memberSlope < -0.1 && activityValues[activityValues.length - 1] < 5) {
      // Declining members and low activity
      const daysUntilZero = Math.ceil(memberValues[memberValues.length - 1] / Math.abs(memberSlope));
      timeToInactivity = Math.min(30, daysUntilZero); // Max 30 days
    }

    return {
      roomId,
      predictedMemberCount: memberForecast.slice(0, 30).map(f => Math.max(0, Math.round(f.predicted))),
      predictedActivity: activityForecast.slice(0, 30).map(f => Math.max(0, Math.round(f.predicted))),
      growthRate,
      timeToInactivity,
    };
  }

  /**
   * Identify churn risks among users
   */
  identifyChurnRisks(
    users: Array<{
      userId: string;
      lastActivityDaysAgo: number;
      totalActivity: number;
      engagementScore: number;
    }>
  ): Array<{
    userId: string;
    churnRisk: number;
    riskFactors: string[];
    recommendedAction: string;
  }> {
    return users.map(user => {
      const riskFactors: string[] = [];
      let riskScore = 0;

      // Factor 1: Inactivity
      if (user.lastActivityDaysAgo > 14) {
        riskFactors.push('High inactivity');
        riskScore += 0.3;
      } else if (user.lastActivityDaysAgo > 7) {
        riskFactors.push('Moderate inactivity');
        riskScore += 0.15;
      }

      // Factor 2: Low total activity
      if (user.totalActivity < 10) {
        riskFactors.push('Low total engagement');
        riskScore += 0.2;
      } else if (user.totalActivity < 50) {
        riskFactors.push('Moderate activity level');
        riskScore += 0.1;
      }

      // Factor 3: Engagement score
      if (user.engagementScore < 30) {
        riskFactors.push('Low engagement score');
        riskScore += 0.25;
      } else if (user.engagementScore < 60) {
        riskFactors.push('Moderate engagement');
        riskScore += 0.1;
      }

      // Factor 4: Combined risk multiplier
      if (riskFactors.length >= 2) {
        riskScore *= 1.2;
      }

      const churnRisk = Math.min(1, riskScore);

      // Recommend action
      let recommendedAction = 'Monitor';
      if (churnRisk > 0.7) {
        recommendedAction = 'Immediate intervention - Personalized outreach recommended';
      } else if (churnRisk > 0.5) {
        recommendedAction = 'Send engagement email or notification';
      } else if (churnRisk > 0.3) {
        recommendedAction = 'Monitor activity and send reminder';
      }

      return {
        userId: user.userId,
        churnRisk,
        riskFactors,
        recommendedAction,
      };
    });
  }

  /**
   * Predict best times for user engagement
   */
  predictEngagementTimes(
    userId: string,
    activityHistory: Array<{ timestamp: number; type: string }>
  ): {
    peakHours: { hour: number; score: number }[];
    peakDays: { day: string; score: number }[];
    bestTimeToContact: { hour: number; day: string; score: number };
  } {
    const hourScores = new Map<number, number>();
    const dayScores = new Map<string, number>();

    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    // Initialize scores
    for (let i = 0; i < 24; i++) {
      hourScores.set(i, 0);
    }
    for (const day of days) {
      dayScores.set(day, 0);
    }

    // Count activities by hour and day
    for (const activity of activityHistory) {
      const date = new Date(activity.timestamp);
      const hour = date.getHours();
      const day = days[date.getDay()];

      hourScores.set(hour, (hourScores.get(hour) || 0) + 1);
      dayScores.set(day, (dayScores.get(day) || 0) + 1);
    }

    // Normalize to 0-1 scale
    const maxHourScore = Math.max(...hourScores.values(), 1);
    const maxDayScore = Math.max(...dayScores.values(), 1);

    const peakHours = Array.from(hourScores.entries())
      .map(([hour, count]) => ({ hour, score: count / maxHourScore }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    const peakDays = Array.from(dayScores.entries())
      .map(([day, count]) => ({ day, score: count / maxDayScore }))
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const bestTimeToContact = {
      hour: peakHours[0]?.hour || 10,
      day: peakDays[0]?.day || 'Monday',
      score: Math.max(peakHours[0]?.score || 0, peakDays[0]?.score || 0),
    };

    return { peakHours, peakDays, bestTimeToContact };
  }

  /**
   * Forecast system capacity needs
   */
  forecastCapacityNeeds(
    metricHistory: Array<{ timestamp: number; activeUsers: number; messageRate: number; cpuUsage: number }>
  ): {
    projectedPeakUsers: number;
    projectedPeakMessageRate: number;
    recommendedCapacity: number;
    timeToCapacityIssue?: number;
  } {
    if (metricHistory.length === 0) {
      return {
        projectedPeakUsers: 100,
        projectedPeakMessageRate: 50,
        recommendedCapacity: 150,
      };
    }

    const userHistory = metricHistory.map(m => m.activeUsers);
    const messageHistory = metricHistory.map(m => m.messageRate);

    const { slope: userSlope } = this.linearRegression(userHistory);
    const { slope: messageSlope } = this.linearRegression(messageHistory);

    const lastUsers = userHistory[userHistory.length - 1];
    const lastMessages = messageHistory[messageHistory.length - 1];

    // Project 90 days out
    const projectedPeakUsers = Math.max(lastUsers, lastUsers + userSlope * 90);
    const projectedPeakMessageRate = Math.max(lastMessages, lastMessages + messageSlope * 90);

    // Recommend capacity (add 30% buffer)
    const recommendedCapacity = Math.ceil(Math.max(projectedPeakUsers, projectedPeakMessageRate) * 1.3);

    // Estimate time to issue (if approaching 80% capacity)
    let timeToCapacityIssue: number | undefined;
    if (userSlope > 0 || messageSlope > 0) {
      const maxCapacity = 1000; // Example max
      const currentLoad = Math.max(lastUsers, lastMessages);
      if (currentLoad > maxCapacity * 0.8) {
        timeToCapacityIssue = 0; // Already at risk
      } else {
        const daysToCapacity = (maxCapacity * 0.8 - currentLoad) / Math.max(userSlope, messageSlope, 1);
        timeToCapacityIssue = Math.round(daysToCapacity);
      }
    }

    return {
      projectedPeakUsers: Math.ceil(projectedPeakUsers),
      projectedPeakMessageRate: Math.ceil(projectedPeakMessageRate),
      recommendedCapacity,
      timeToCapacityIssue,
    };
  }
}

// Export singleton instance
export const predictiveAnalytics = new PredictiveAnalytics();

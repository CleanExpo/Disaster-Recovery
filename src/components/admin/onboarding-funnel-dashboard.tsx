'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, TrendingDown, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';

interface StepMetrics {
  step: string;
  totalStarted: number;
  totalCompleted: number;
  dropOffCount: number;
  dropOffRate: number;
  avgTimeToCompleteHours: number;
}

interface FunnelMetrics {
  totalStarted: number;
  totalCompleted: number;
  overallConversionRate: number;
  avgTimeToCompleteOnboardingHours: number;
  steps: StepMetrics[];
  bottleneck: string | null;
}

export function OnboardingFunnelDashboard() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<FunnelMetrics | null>(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/onboarding-analytics', { cache: 'no-store' });

      if (response.ok) {
        const data = await response.json();
        setMetrics(data.metrics);
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-12 flex items-center justify-center">
          <Loader2 className="h-6 w-6 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (!metrics) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Failed to load analytics data
        </CardContent>
      </Card>
    );
  }

  const stepLabels: Record<string, string> = {
    preferences: 'Set Preferences',
    profile: 'Complete Profile',
    nrpg_registration: 'NRPG Registration',
    training: 'Training Complete',
    payouts: 'Payouts Setup',
    complete: 'Fully Verified',
  };

  return (
    <div className="space-y-6">
      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Started</p>
                <p className="text-2xl font-bold">{metrics.totalStarted}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{metrics.totalCompleted}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion</p>
                <p className="text-2xl font-bold">{Math.round(metrics.overallConversionRate)}%</p>
              </div>
              <TrendingDown className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Time</p>
                <p className="text-2xl font-bold">{Math.round(metrics.avgTimeToCompleteOnboardingHours)}h</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Funnel Visualization */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Onboarding Funnel</CardTitle>
              <CardDescription>Step-by-step conversion analysis</CardDescription>
            </div>
            {metrics.bottleneck && (
              <Badge variant="destructive" className="flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                Bottleneck: {stepLabels[metrics.bottleneck] || metrics.bottleneck}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {metrics.steps.map((step, index) => {
            const conversionRate = step.totalStarted > 0
              ? (step.totalCompleted / step.totalStarted) * 100
              : 0;
            const isBottleneck = step.step === metrics.bottleneck;

            return (
              <div key={step.step} className={`pb-6 ${index < metrics.steps.length - 1 ? 'border-b' : ''}`}>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      isBottleneck ? 'bg-red-500' : 'bg-primary'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{stepLabels[step.step] || step.step}</h4>
                      <p className="text-xs text-muted-foreground">
                        {step.totalCompleted.toLocaleString()} / {step.totalStarted.toLocaleString()} contractors
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-bold ${
                      conversionRate >= 80 ? 'text-green-600' :
                      conversionRate >= 60 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {Math.round(conversionRate)}%
                    </p>
                    <p className="text-xs text-muted-foreground">conversion</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <Progress value={conversionRate} className="h-3 mb-3" />

                {/* Metrics Grid */}
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Drop-off</p>
                    <p className="font-semibold text-red-600">
                      {step.dropOffCount.toLocaleString()} ({Math.round(step.dropOffRate)}%)
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg Time</p>
                    <p className="font-semibold">
                      {step.avgTimeToCompleteHours < 1
                        ? `${Math.round(step.avgTimeToCompleteHours * 60)}min`
                        : `${Math.round(step.avgTimeToCompleteHours)}h`}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Median Time</p>
                    <p className="font-semibold">
                      {step.medianTimeToCompleteHours < 1
                        ? `${Math.round(step.medianTimeToCompleteHours * 60)}min`
                        : `${Math.round(step.medianTimeToCompleteHours)}h`}
                    </p>
                  </div>
                </div>

                {/* Bottleneck Alert */}
                {isBottleneck && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded">
                    <p className="text-sm text-red-800 dark:text-red-200 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <strong>Highest drop-off point</strong> - Consider optimizing this step
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card>
        <CardHeader>
          <CardTitle>Recommendations</CardTitle>
          <CardDescription>Based on funnel analysis</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm">
            {metrics.overallConversionRate < 50 && (
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                <span>
                  <strong>Low overall conversion ({Math.round(metrics.overallConversionRate)}%)</strong> -
                  Review onboarding complexity and consider simplification
                </span>
              </li>
            )}
            {metrics.bottleneck && metrics.steps.find(s => s.step === metrics.bottleneck)!.dropOffRate > 30 && (
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                <span>
                  <strong>Critical bottleneck at {stepLabels[metrics.bottleneck]}</strong> -
                  {Math.round(metrics.steps.find(s => s.step === metrics.bottleneck)!.dropOffRate)}% drop-off rate
                </span>
              </li>
            )}
            {metrics.avgTimeToCompleteOnboardingHours > 48 && (
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                <span>
                  <strong>Long onboarding time ({Math.round(metrics.avgTimeToCompleteOnboardingHours)}h average)</strong> -
                  Consider adding reminders or simplifying steps
                </span>
              </li>
            )}
            {metrics.overallConversionRate >= 70 && (
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                <span>
                  <strong>Healthy conversion rate</strong> - Onboarding funnel is performing well
                </span>
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

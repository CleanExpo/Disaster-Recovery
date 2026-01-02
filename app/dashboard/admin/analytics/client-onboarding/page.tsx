'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, TrendingDown, TrendingUp, AlertTriangle, CheckCircle2, Clock, Users } from 'lucide-react';

interface PhaseMetrics {
  phase: string;
  totalStarted: number;
  totalCompleted: number;
  dropOffCount: number;
  dropOffRate: number;
  avgTimeToCompleteMinutes: number;
}

interface FunnelMetrics {
  totalStarted: number;
  totalCompleted: number;
  overallConversionRate: number;
  avgTimeToCompleteHours: number;
  phases: PhaseMetrics[];
  bottleneck: string | null;
  tierDistribution: Record<string, number>;
  flowVariantPerformance: {
    standard: { started: number; completed: number; conversionRate: number };
    fast_track: { started: number; completed: number; conversionRate: number };
    vip: { started: number; completed: number; conversionRate: number };
  };
}

export default function ClientOnboardingAnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState<FunnelMetrics | null>(null);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/analytics/client-onboarding', { cache: 'no-store' });

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
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-12 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            Failed to load analytics data
          </CardContent>
        </Card>
      </div>
    );
  }

  const phaseLabels: Record<string, string> = {
    profile: 'Profile Setup',
    services: 'Service Preferences',
    property: 'Property Details',
    insurance: 'Insurance Info',
    payment: 'Payment Setup',
    communication: 'Communication Prefs',
    education: 'Education Modules',
  };

  return (
    <div className="container mx-auto py-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Client Onboarding Analytics</h1>
        <p className="text-muted-foreground mt-1">
          Comprehensive funnel analysis and conversion metrics
        </p>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Clients Started</p>
                <p className="text-2xl font-bold">{metrics.totalStarted.toLocaleString()}</p>
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Completed</p>
                <p className="text-2xl font-bold text-green-600">{metrics.totalCompleted.toLocaleString()}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                <p className="text-2xl font-bold">{Math.round(metrics.overallConversionRate)}%</p>
              </div>
              {metrics.overallConversionRate >= 70 ? (
                <TrendingUp className="h-8 w-8 text-green-500" />
              ) : (
                <TrendingDown className="h-8 w-8 text-amber-500" />
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Completion Time</p>
                <p className="text-2xl font-bold">{Math.round(metrics.avgTimeToCompleteHours)}h</p>
              </div>
              <Clock className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tier Distribution */}
      <Card>
        <CardHeader>
          <CardTitle>Client Tier Distribution</CardTitle>
          <CardDescription>Breakdown of high-value client segments</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(metrics.tierDistribution).map(([tier, count]) => (
              <div key={tier} className="text-center p-4 rounded-lg border">
                <p className="text-2xl font-bold">{count}</p>
                <p className="text-sm text-muted-foreground capitalize">
                  {tier.replace('_', ' ')}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Flow Variant Performance */}
      <Card>
        <CardHeader>
          <CardTitle>Flow Variant Performance</CardTitle>
          <CardDescription>Conversion rates by onboarding flow type</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(metrics.flowVariantPerformance).map(([variant, data]) => (
              <Card key={variant}>
                <CardContent className="pt-6">
                  <h4 className="font-semibold mb-2 capitalize">{variant.replace('_', ' ')}</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Started:</span>
                      <span className="font-medium">{data.started}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Completed:</span>
                      <span className="font-medium">{data.completed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Conversion:</span>
                      <span className="font-bold">{Math.round(data.conversionRate)}%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Onboarding Funnel */}
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
                Bottleneck: {phaseLabels[metrics.bottleneck] || metrics.bottleneck}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {metrics.phases.map((phase, index) => {
            const conversionRate = phase.totalStarted > 0
              ? (phase.totalCompleted / phase.totalStarted) * 100
              : 0;
            const isBottleneck = phase.phase === metrics.bottleneck;

            return (
              <div key={phase.phase} className={`pb-6 ${index < metrics.phases.length - 1 ? 'border-b' : ''}`}>
                {/* Phase Header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                      isBottleneck ? 'bg-red-500' : 'bg-primary'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h4 className="font-semibold">{phaseLabels[phase.phase] || phase.phase}</h4>
                      <p className="text-xs text-muted-foreground">
                        {phase.totalCompleted.toLocaleString()} / {phase.totalStarted.toLocaleString()} clients
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
                      {phase.dropOffCount.toLocaleString()} ({Math.round(phase.dropOffRate)}%)
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Avg Time</p>
                    <p className="font-semibold">
                      {phase.avgTimeToCompleteMinutes < 60
                        ? `${Math.round(phase.avgTimeToCompleteMinutes)}min`
                        : `${Math.round(phase.avgTimeToCompleteMinutes / 60)}h`}
                    </p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Required</p>
                    <p className="font-semibold">
                      {['profile', 'services', 'property'].includes(phase.phase) ? 'Yes' : 'Optional'}
                    </p>
                  </div>
                </div>

                {/* Bottleneck Alert */}
                {isBottleneck && (
                  <div className="mt-3 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded">
                    <p className="text-sm text-red-800 dark:text-red-200 flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4" />
                      <strong>Highest drop-off point</strong> - Consider optimizing this phase or making it optional
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
          <CardDescription>Data-driven optimization suggestions</CardDescription>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3 text-sm">
            {metrics.overallConversionRate < 50 && (
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5" />
                <span>
                  <strong>Low overall conversion ({Math.round(metrics.overallConversionRate)}%)</strong> -
                  Review onboarding complexity. Consider A/B testing shorter flows or progressive disclosure.
                </span>
              </li>
            )}

            {metrics.bottleneck && metrics.phases.find(p => p.phase === metrics.bottleneck)!.dropOffRate > 30 && (
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-red-500 mt-0.5" />
                <span>
                  <strong>Critical bottleneck at {phaseLabels[metrics.bottleneck]}</strong> -
                  {Math.round(metrics.phases.find(p => p.phase === metrics.bottleneck)!.dropOffRate)}% drop-off rate.
                  Consider making this phase optional or simplifying the form.
                </span>
              </li>
            )}

            {metrics.avgTimeToCompleteHours > 2 && (
              <li className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-blue-500 mt-0.5" />
                <span>
                  <strong>Long completion time ({Math.round(metrics.avgTimeToCompleteHours)}h average)</strong> -
                  Most clients don't complete in one session. Consider email reminders or progress save notifications.
                </span>
              </li>
            )}

            {metrics.flowVariantPerformance.fast_track.conversionRate > metrics.flowVariantPerformance.standard.conversionRate + 10 && (
              <li className="flex items-start gap-2">
                <TrendingUp className="h-4 w-4 text-green-500 mt-0.5" />
                <span>
                  <strong>Fast-track flow performing better</strong> -
                  Fast-track: {Math.round(metrics.flowVariantPerformance.fast_track.conversionRate)}% vs
                  Standard: {Math.round(metrics.flowVariantPerformance.standard.conversionRate)}%.
                  Consider promoting fast-track flow or making standard flow shorter.
                </span>
              </li>
            )}

            {metrics.overallConversionRate >= 70 && (
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-green-500 mt-0.5" />
                <span>
                  <strong>Healthy conversion rate</strong> - Client onboarding funnel is performing well.
                  Continue monitoring for seasonal variations.
                </span>
              </li>
            )}

            {Object.values(metrics.tierDistribution).some(count => count > metrics.totalStarted * 0.1) && (
              <li className="flex items-start gap-2">
                <Users className="h-4 w-4 text-purple-500 mt-0.5" />
                <span>
                  <strong>Significant high-value client segment</strong> -
                  {Object.entries(metrics.tierDistribution)
                    .filter(([tier, count]) => count > metrics.totalStarted * 0.1)
                    .map(([tier]) => tier.replace('_', ' '))
                    .join(', ')} clients detected.
                  Ensure VIP experience is optimized.
                </span>
              </li>
            )}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}

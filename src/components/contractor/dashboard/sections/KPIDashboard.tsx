'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  TrendingUp,
  Clock,
  Star,
  AlertTriangle,
  Trophy,
  Activity,
  CheckCircle,
  FileText,
  MessageSquare,
  Target,
  Award,
  DollarSign,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

interface KPIDashboardProps {
  metrics: any;
  activeJobs: any[];
  incidents: any[];
}

export function KPIDashboard({ metrics, activeJobs, incidents }: KPIDashboardProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'quarter'>('month');
  const [showAppealForm, setShowAppealForm] = useState(false);

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getTrendIcon = (trend: number) => {
    if (trend > 0) return <ArrowUp className="h-3 w-3 text-green-500" />;
    if (trend < 0) return <ArrowDown className="h-3 w-3 text-red-500" />;
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Period Selector */}
      <div className="flex justify-between items-centre">
        <h2 className="text-xl font-bold">Performance & Quality Metrics</h2>
        <div className="flex gap-2">
          <Button
            variant={selectedPeriod === 'week' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('week')}
          >
            Week
          </Button>
          <Button
            variant={selectedPeriod === 'month' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('month')}
          >
            Month
          </Button>
          <Button
            variant={selectedPeriod === 'quarter' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedPeriod('quarter')}
          >
            Quarter
          </Button>
        </div>
      </div>

      {/* Overall Performance Score */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Overall Performance Score</p>
              <div className="flex items-baseline gap-2 mt-2">
                <span className={`text-4xl font-bold ${getScoreColor(metrics.overallScore)}`}>
                  {metrics.overallScore}%
                </span>
                <span className="flex items-centre text-sm text-gray-500">
                  {getTrendIcon(metrics.scoreTrend)}
                  {Math.abs(metrics.scoreTrend)}%
                </span>
              </div>
            </div>
            <Trophy className="h-8 w-8 text-yellow-500" />
          </div>
          <Progress value={metrics.overallScore} className="mt-4 h-3" />
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-centre gap-2">
              <Clock className="h-4 w-4" />
              Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${getScoreColor(metrics.responseScore)}`}>
              {metrics.avgResponseTime}h
            </p>
            <p className="text-xs text-gray-500 mt-1">Target: &lt;2h</p>
            <Progress value={metrics.responseScore} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-centre gap-2">
              <FileText className="h-4 w-4" />
              Report Quality
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${getScoreColor(metrics.reportQuality)}`}>
              {metrics.reportQuality}%
            </p>
            <p className="text-xs text-gray-500 mt-1">Clean Claims Score</p>
            <Progress value={metrics.reportQuality} className="mt-2 h-1" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-centre gap-2">
              <Star className="h-4 w-4" />
              Customer Rating
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${getScoreColor(metrics.customerRating * 20)}`}>
              {metrics.customerRating}/5
            </p>
            <p className="text-xs text-gray-500 mt-1">{metrics.totalReviews} reviews</p>
            <div className="flex gap-0.5 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${
                    i < Math.floor(metrics.customerRating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-centre gap-2">
              <Target className="h-4 w-4" />
              Completion Rate
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className={`text-2xl font-bold ${getScoreColor(metrics.completionRate)}`}>
              {metrics.completionRate}%
            </p>
            <p className="text-xs text-gray-500 mt-1">Jobs completed on time</p>
            <Progress value={metrics.completionRate} className="mt-2 h-1" />
          </CardContent>
        </Card>
      </div>

      {/* Active Jobs from Clean Claims */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-centre justify-between">
            <span className="flex items-centre gap-2">
              <Activity className="h-5 w-5" />
              Active Jobs (Clean Claims Feed)
            </span>
            <Badge>{activeJobs.length} Active</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeJobs.map(job => (
              <div key={job.id} className="flex items-centre justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{job.claimNumber}</p>
                  <p className="text-sm text-gray-600">{job.address}</p>
                  <p className="text-xs text-gray-500">{job.insurer} • {job.jobType}</p>
                </div>
                <div className="text-right">
                  <Badge variant={job.status === 'IN_PROGRESS' ? 'default' : 'secondary'}>
                    {job.status}
                  </Badge>
                  <p className="text-xs text-gray-500 mt-1">
                    Started {job.daysActive} days ago
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="incidents" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="incidents">Incidents & Fines</TabsTrigger>
          <TabsTrigger value="recognition">Excellence Recognition</TabsTrigger>
        </TabsList>

        {/* Incidents Tab */}
        <TabsContent value="incidents" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-centre justify-between">
                <span>Incident History</span>
                {incidents.length > 0 && (
                  <Badge variant="destructive">{incidents.length} Total</Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {incidents.length === 0 ? (
                <div className="text-centre py-8 text-gray-500">
                  <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
                  <p>No incidents recorded - Great work!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {incidents.map(incident => (
                    <div key={incident.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-centre gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            <p className="font-medium">{incident.type}</p>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {new Date(incident.date).toLocaleDateString()} • Job #{incident.jobId}
                          </p>
                        </div>
                        <div className="text-right">
                          {incident.fine && (
                            <p className="font-semibold text-red-600">
                              ${incident.fine} fine
                            </p>
                          )}
                          {incident.appealable && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2"
                              onClick={() => setShowAppealForm(true)}
                            >
                              Appeal
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recognition Tab */}
        <TabsContent value="recognition" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Excellence & Bonuses</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Quality Bonuses */}
              <div className="p-4 bg-green-50 rounded-lg">
                <div className="flex items-centre justify-between mb-3">
                  <div className="flex items-centre gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <p className="font-medium">Quality Bonuses Earned</p>
                  </div>
                  <p className="text-xl font-bold text-green-600">
                    ${metrics.qualityBonuses?.toFixed(2) || '0.00'}
                  </p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">5-Star Reviews</span>
                    <span>+${metrics.fiveStarBonus || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Perfect Reports</span>
                    <span>+${metrics.perfectReportBonus || 0}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Fast Response</span>
                    <span>+${metrics.fastResponseBonus || 0}</span>
                  </div>
                </div>
              </div>

              {/* Achievements */}
              <div>
                <p className="font-medium mb-3">Recent Achievements</p>
                <div className="grid grid-cols-2 gap-3">
                  {metrics.achievements?.map((achievement: any, index: number) => (
                    <div key={index} className="flex items-centre gap-2 p-3 border rounded-lg">
                      <Award className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="text-sm font-medium">{achievement.title}</p>
                        <p className="text-xs text-gray-500">{achievement.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Excellence Recognition */}
              <Alert className="bg-blue-50 border-blue-200">
                <Trophy className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-800">
                  <strong>Excellence Program:</strong> Maintain a 90%+ performance score for 
                  3 consecutive months to earn Gold Partner status with priority lead allocation 
                  and reduced fees.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
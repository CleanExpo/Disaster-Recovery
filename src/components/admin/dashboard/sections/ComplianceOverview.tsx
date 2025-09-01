'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  TrendingUp,
  TrendingDown,
  FileCheck,
  Award,
  Clock,
  Users
} from 'lucide-react';

interface ComplianceMetrics {
  totalContractors: number;
  compliantContractors: number;
  partiallyCompliant: number;
  nonCompliant: number;
  averageComplianceScore: number;
  expiringCertifications: number;
  overdueInspections: number;
  pendingDocuments: number;
  complianceByCategory: {
    cpp40421: { compliant: number; total: number };
    iicrc: { compliant: number; total: number };
    insurance: { compliant: number; total: number };
    whs: { compliant: number; total: number };
    associations: { compliant: number; total: number };
    carsi: { compliant: number; total: number };
  };
  trends: {
    weekly: number;
    monthly: number;
  };
}

export function ComplianceOverview() {
  const [metrics, setMetrics] = useState<ComplianceMetrics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComplianceMetrics();
  }, []);

  const fetchComplianceMetrics = async () => {
    try {
      const response = await fetch('/api/admin/compliance/metrics');
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to fetch compliance metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !metrics) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Compliance Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8 text-gray-500">
            Loading compliance data...
          </div>
        </CardContent>
      </Card>
    );
  }

  const complianceRate = (metrics.compliantContractors / metrics.totalContractors) * 100;
  const getComplianceColor = (rate: number) => {
    if (rate >= 90) return 'text-green-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Compliance Overview
          </span>
          <Badge className={complianceRate >= 80 ? 'bg-green-600' : 'bg-yellow-600'}>
            {complianceRate.toFixed(1)}% Compliant
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Overall Compliance */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium">Overall Compliance</span>
            <span className={`text-sm font-bold ${getComplianceColor(complianceRate)}`}>
              {metrics.compliantContractors}/{metrics.totalContractors}
            </span>
          </div>
          <Progress value={complianceRate} className="h-3" />
          <div className="grid grid-cols-3 gap-2 mt-2">
            <div className="text-center">
              <p className="text-xs text-gray-500">Compliant</p>
              <p className="text-sm font-bold text-green-600">{metrics.compliantContractors}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Partial</p>
              <p className="text-sm font-bold text-yellow-600">{metrics.partiallyCompliant}</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-500">Non-Compliant</p>
              <p className="text-sm font-bold text-red-600">{metrics.nonCompliant}</p>
            </div>
          </div>
        </div>

        {/* Alerts */}
        {(metrics.expiringCertifications > 0 || metrics.overdueInspections > 0) && (
          <Alert className="bg-yellow-50 border-yellow-200">
            <AlertTriangle className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-700">
              <div className="space-y-1">
                {metrics.expiringCertifications > 0 && (
                  <p className="text-sm">
                    • {metrics.expiringCertifications} certifications expiring within 30 days
                  </p>
                )}
                {metrics.overdueInspections > 0 && (
                  <p className="text-sm">
                    • {metrics.overdueInspections} contractors overdue for inspection
                  </p>
                )}
                {metrics.pendingDocuments > 0 && (
                  <p className="text-sm">
                    • {metrics.pendingDocuments} documents awaiting verification
                  </p>
                )}
              </div>
            </AlertDescription>
          </Alert>
        )}

        {/* Category Breakdown */}
        <div>
          <p className="text-sm font-medium mb-3">Compliance by Category</p>
          <div className="space-y-2">
            {Object.entries(metrics.complianceByCategory).map(([key, value]) => {
              const rate = (value.compliant / value.total) * 100;
              return (
                <div key={key} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {rate >= 80 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : rate >= 60 ? (
                      <AlertTriangle className="h-4 w-4 text-blue-600" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                    <span className="text-sm capitalize">
                      {key === 'cpp40421' ? 'CPP40421' : 
                       key === 'iicrc' ? 'IICRC' :
                       key === 'whs' ? 'WHS' :
                       key === 'carsi' ? 'CARSI AI' :
                       key.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-600">
                      {value.compliant}/{value.total}
                    </span>
                    <Badge 
                      variant="outline" 
                      className={`text-xs ${
                        rate >= 80 ? 'text-green-600' :
                        rate >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}
                    >
                      {rate.toFixed(0)}%
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Trends */}
        <div className="border-t pt-4">
          <p className="text-sm font-medium mb-2">Compliance Trends</p>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Week over Week</span>
              <div className="flex items-center gap-1">
                {metrics.trends.weekly > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  metrics.trends.weekly > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.abs(metrics.trends.weekly)}%
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Month over Month</span>
              <div className="flex items-center gap-1">
                {metrics.trends.monthly > 0 ? (
                  <TrendingUp className="h-4 w-4 text-green-500" />
                ) : (
                  <TrendingDown className="h-4 w-4 text-red-500" />
                )}
                <span className={`text-sm font-medium ${
                  metrics.trends.monthly > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {Math.abs(metrics.trends.monthly)}%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="border-t pt-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <FileCheck className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Avg Score</p>
                <p className="text-sm font-bold">
                  {metrics.averageComplianceScore.toFixed(1)}%
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-gray-400" />
              <div>
                <p className="text-xs text-gray-500">Expiring Soon</p>
                <p className="text-sm font-bold text-blue-700">
                  {metrics.expiringCertifications}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
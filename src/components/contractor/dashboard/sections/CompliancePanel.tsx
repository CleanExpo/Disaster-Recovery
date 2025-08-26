'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Shield,
  FileCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Calendar,
  Upload,
  Download,
  Clock,
  AlertCircle
} from 'lucide-react';

interface ComplianceItem {
  id: string;
  name: string;
  status: 'VALID' | 'EXPIRING' | 'EXPIRED' | 'PENDING';
  expiryDate?: string;
  lastUpdated?: string;
  required: boolean;
  category: string;
}

interface CompliancePanelProps {
  compliance: {
    overallStatus: 'COMPLIANT' | 'ACTION_REQUIRED' | 'NON_COMPLIANT';
    items: ComplianceItem[];
    score?: number;
    lastAudit?: string;
  };
  certifications?: any[];
  insurance?: any[];
}

export function CompliancePanel({ compliance, certifications = [], insurance = [] }: CompliancePanelProps) {
  const getStatusIcon = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'VALID':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'EXPIRING':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'EXPIRED':
        return <XCircle className="h-4 w-4 text-red-500" />;
      case 'PENDING':
        return <Clock className="h-4 w-4 text-blue-500" />;
      default:
        return null;
    }
  };

  const getStatusBadgeVariant = (status: ComplianceItem['status']) => {
    switch (status) {
      case 'VALID':
        return 'default';
      case 'EXPIRING':
        return 'secondary';
      case 'EXPIRED':
        return 'destructive';
      case 'PENDING':
        return 'outline';
      default:
        return 'outline';
    }
  };

  const urgentItems = compliance.items.filter(item => 
    item.status === 'EXPIRED' || item.status === 'EXPIRING'
  );

  const groupedItems = compliance.items.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, ComplianceItem[]>);

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Overall Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Shield className={`h-5 w-5 ${
                compliance.overallStatus === 'COMPLIANT' ? 'text-green-500' :
                compliance.overallStatus === 'ACTION_REQUIRED' ? 'text-yellow-500' :
                'text-red-500'
              }`} />
              <Badge className={
                compliance.overallStatus === 'COMPLIANT' ? 'bg-green-100 text-green-800' :
                compliance.overallStatus === 'ACTION_REQUIRED' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }>
                {compliance.overallStatus.replace('_', ' ')}
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Compliance Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {compliance.score ? `${compliance.score}%` : 'N/A'}
            </div>
            {compliance.score && (
              <Progress value={compliance.score} className="mt-2 h-2" />
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Last Audit</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm">
              {compliance.lastAudit 
                ? new Date(compliance.lastAudit).toLocaleDateString()
                : 'Not audited yet'
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Urgent Actions */}
      {urgentItems.length > 0 && (
        <Alert variant="destructive">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Immediate Action Required</AlertTitle>
          <AlertDescription>
            {urgentItems.length} compliance item(s) require your immediate attention to maintain your active status.
          </AlertDescription>
        </Alert>
      )}

      {/* Compliance Items by Category */}
      {Object.entries(groupedItems).map(([category, items]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="text-lg">{category}</CardTitle>
            <CardDescription>
              {items.filter(i => i.status === 'VALID').length} of {items.length} compliant
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    {getStatusIcon(item.status)}
                    <div>
                      <p className="font-medium text-sm">{item.name}</p>
                      {item.expiryDate && (
                        <p className="text-xs text-gray-500">
                          Expires: {new Date(item.expiryDate).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={getStatusBadgeVariant(item.status)}>
                      {item.status}
                    </Badge>
                    {item.required && (
                      <Badge variant="outline">Required</Badge>
                    )}
                    {(item.status === 'EXPIRED' || item.status === 'EXPIRING') && (
                      <Button size="sm" variant="outline">
                        <Upload className="h-3 w-3 mr-1" />
                        Update
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Document Management</CardTitle>
          <CardDescription>
            Upload and manage your compliance documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <Button>
              <Upload className="h-4 w-4 mr-2" />
              Upload Documents
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download Reports
            </Button>
            <Button variant="outline">
              <FileCheck className="h-4 w-4 mr-2" />
              Request Audit
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

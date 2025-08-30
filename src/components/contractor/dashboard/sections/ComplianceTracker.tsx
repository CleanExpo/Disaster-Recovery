'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Upload,
  Calendar,
  Bell,
  RefreshCw,
  Download,
  ExternalLink
} from 'lucide-react';

interface Certification {
  id: string;
  name: string;
  type: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired';
  daysUntilExpiry: number;
  documentUrl?: string;
}

interface Insurance {
  id: string;
  type: string;
  insurer: string;
  policyNumber: string;
  coverageAmount: number;
  expiryDate: string;
  status: 'valid' | 'expiring' | 'expired';
  daysUntilExpiry: number;
}

interface ComplianceTrackerProps {
  certifications: Certification[];
  insurance: Insurance[];
  memberships: any[];
}

export function ComplianceTracker({ certifications, insurance, memberships }: ComplianceTrackerProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | 'expiring' | 'expired'>('all');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);

  // Calculate overall compliance score
  const calculateComplianceScore = () => {
    const totalItems = certifications.length + insurance.length + memberships.length;
    const validItems = [...certifications, ...insurance, ...memberships].filter(
      item => item.status === 'valid'
    ).length;
    return Math.round((validItems / totalItems) * 100);
  };

  // Get items needing attention
  const getAttentionItems = () => {
    return [...certifications, ...insurance, ...memberships].filter(
      item => item.status === 'expiring' || item.status === 'expired'
    );
  };

  const complianceScore = calculateComplianceScore();
  const attentionItems = getAttentionItems();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDaysUntilExpiryText = (days: number) => {
    if (days < 0) return `Expired ${Math.abs(days)} days ago`;
    if (days === 0) return 'Expires today';
    if (days <= 7) return `Expires in ${days} days`;
    if (days <= 30) return `Expires in ${Math.ceil(days / 7)} weeks`;
    return `Expires in ${Math.ceil(days / 30)} months`;
  };

  const handleRenewal = (item: any) => {
    setSelectedItem(item);
    setUploadModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Compliance Overview */}
      <Card className={complianceScore >= 80 ? 'border-green-200' : complianceScore >= 60 ? 'border-yellow-200' : 'border-red-200'}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Compliance Status
            </span>
            <Badge className={complianceScore >= 80 ? 'bg-green-600' : complianceScore >= 60 ? 'bg-yellow-600' : 'bg-red-600'}>
              {complianceScore}% Compliant
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={complianceScore} className="h-3 mb-4" />
          
          {attentionItems.length > 0 && (
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertTriangle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                <strong>{attentionItems.length} items need attention:</strong>
                <ul className="mt-2 ml-4 list-disc text-sm">
                  {attentionItems.slice(0, 3).map((item, index) => (
                    <li key={index}>
                      {item.name || item.type}: {getDaysUntilExpiryText(item.daysUntilExpiry)}
                    </li>
                  ))}
                  {attentionItems.length > 3 && (
                    <li>and {attentionItems.length - 3} more...</li>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <Button
          variant={activeFilter === 'all' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('all')}
        >
          All Items
        </Button>
        <Button
          variant={activeFilter === 'expiring' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('expiring')}
        >
          <Clock className="h-4 w-4 mr-1" />
          Expiring Soon
        </Button>
        <Button
          variant={activeFilter === 'expired' ? 'default' : 'outline'}
          size="sm"
          onClick={() => setActiveFilter('expired')}
        >
          <AlertTriangle className="h-4 w-4 mr-1" />
          Expired
        </Button>
      </div>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Professional Certifications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {certifications
              .filter(cert => activeFilter === 'all' || cert.status === activeFilter)
              .map(cert => (
                <div key={cert.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{cert.name}</p>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <Badge className={getStatusColor(cert.status)}>
                        {cert.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {getDaysUntilExpiryText(cert.daysUntilExpiry)}
                      </p>
                    </div>
                    <div className="flex gap-1">
                      {cert.documentUrl && (
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                      {cert.status !== 'valid' && (
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleRenewal(cert)}
                        >
                          <RefreshCw className="h-4 w-4 mr-1" />
                          Renew
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Insurance Policies */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Insurance Coverage</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insurance
              .filter(ins => activeFilter === 'all' || ins.status === activeFilter)
              .map(ins => (
                <div key={ins.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium">{ins.type}</p>
                      <p className="text-sm text-gray-600">
                        {ins.insurer} • ${ins.coverageAmount.toLocaleString()} coverage
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-right">
                      <Badge className={getStatusColor(ins.status)}>
                        {ins.status}
                      </Badge>
                      <p className="text-xs text-gray-500 mt-1">
                        {getDaysUntilExpiryText(ins.daysUntilExpiry)}
                      </p>
                    </div>
                    {ins.status !== 'valid' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRenewal(ins)}
                      >
                        <RefreshCw className="h-4 w-4 mr-1" />
                        Renew
                      </Button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Association Memberships */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Industry Association Memberships</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {memberships
              .filter(mem => activeFilter === 'all' || mem.status === activeFilter)
              .map(mem => (
                <div key={mem.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">{mem.name}</p>
                    <p className="text-sm text-gray-600">Member #{mem.memberNumber}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(mem.status)}>
                      {mem.status}
                    </Badge>
                    {mem.status !== 'valid' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleRenewal(mem)}
                      >
                        Renew
                      </Button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </CardContent>
      </Card>

      {/* Renewal Reminders */}
      <Card className="bg-blue-50 border-blue-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Renewal Reminders Active
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-700">
            You will receive notifications:
          </p>
          <ul className="mt-2 ml-4 list-disc text-sm text-gray-600">
            <li>90 days before expiry (email)</li>
            <li>60 days before expiry (email + in-app)</li>
            <li>30 days before expiry (email + SMS)</li>
            <li>7 days before expiry (daily reminders)</li>
          </ul>
          <Button variant="outline" size="sm" className="mt-3">
            <Bell className="h-4 w-4 mr-2" />
            Configure Notifications
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
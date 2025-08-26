'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Shield,
  Lock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  FileText,
  Users,
  Database,
  Activity,
  Eye,
  Download,
  Settings,
  RefreshCcw,
  ShieldCheck,
  ShieldAlert,
  Key,
  UserCheck
} from 'lucide-react';

// Import our privacy components
import { ConsentManager } from './ConsentManager';
import { DataSubjectRequests } from './DataSubjectRequests';
import { DataBreachNotification } from './DataBreachNotification';
import { ComplianceRequirement } from '@/types/privacy';

interface PrivacyComplianceDashboardProps {
  userId?: string;
  userRole: 'contractor' | 'admin';
}

export function PrivacyComplianceDashboard({ userId, userRole }: PrivacyComplianceDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [complianceScore, setComplianceScore] = useState(0);
  const [requirements, setRequirements] = useState<ComplianceRequirement[]>([]);
  const [metrics, setMetrics] = useState({
    totalUsers: 0,
    consentCompliance: 0,
    activeBreaches: 0,
    pendingDSARs: 0,
    encryptionStatus: 'active',
    lastAudit: new Date().toISOString(),
    nextAudit: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString()
  });

  const frameworks = [
    {
      id: 'APP',
      name: 'Australian Privacy Principles',
      description: 'OAIC compliance requirements',
      status: 'compliant',
      score: 95,
      lastAssessed: '2024-01-15'
    },
    {
      id: 'GDPR',
      name: 'General Data Protection Regulation',
      description: 'EU data protection compliance',
      status: 'compliant',
      score: 92,
      lastAssessed: '2024-01-10'
    },
    {
      id: 'ISO27001',
      name: 'ISO 27001',
      description: 'Information security management',
      status: 'partial',
      score: 78,
      lastAssessed: '2024-01-05'
    },
    {
      id: 'SOC2',
      name: 'SOC 2 Type II',
      description: 'Security, availability, and confidentiality',
      status: 'in_progress',
      score: 65,
      lastAssessed: '2023-12-20'
    }
  ];

  useEffect(() => {
    fetchComplianceData();
    const interval = setInterval(fetchComplianceData, 300000); // Update every 5 minutes
    return () => clearInterval(interval);
  }, []);

  const fetchComplianceData = async () => {
    try {
      const response = await fetch('/api/privacy/compliance/dashboard');
      const data = await response.json();
      setComplianceScore(data.score);
      setRequirements(data.requirements);
      setMetrics(data.metrics);
    } catch (error) {
      console.error('Failed to fetch compliance data:', error);
    }
  };

  const getComplianceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'compliant':
        return <Badge className="bg-green-100 text-green-800">Compliant</Badge>;
      case 'partial':
        return <Badge className="bg-yellow-100 text-yellow-800">Partial</Badge>;
      case 'non_compliant':
        return <Badge className="bg-red-100 text-red-800">Non-Compliant</Badge>;
      case 'in_progress':
        return <Badge className="bg-blue-100 text-blue-800">In Progress</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Privacy & Compliance Center
          </h1>
          <p className="text-gray-600 mt-1">
            Manage data protection, privacy rights, and regulatory compliance
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button variant="outline">
            <RefreshCcw className="h-4 w-4 mr-2" />
            Run Audit
          </Button>
          {userRole === 'admin' && (
            <Button variant="outline">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>
          )}
        </div>
      </div>

      {/* Compliance Score Overview */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-sm text-gray-600">Overall Compliance Score</p>
              <div className="flex items-baseline gap-3 mt-2">
                <span className={`text-5xl font-bold ${getComplianceColor(complianceScore)}`}>
                  {complianceScore}%
                </span>
                <span className="flex items-center text-sm text-gray-500">
                  <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
                  +3% from last month
                </span>
              </div>
              <Progress value={complianceScore} className="mt-4 h-3" />
              <div className="grid grid-cols-4 gap-4 mt-6">
                <div>
                  <p className="text-xs text-gray-500">Data Protection</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Lock className="h-4 w-4 text-green-500" />
                    <span className="font-semibold">AES-256</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Consent Rate</p>
                  <div className="flex items-center gap-2 mt-1">
                    <UserCheck className="h-4 w-4 text-green-500" />
                    <span className="font-semibold">{metrics.consentCompliance}%</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Active Incidents</p>
                  <div className="flex items-center gap-2 mt-1">
                    {metrics.activeBreaches > 0 ? (
                      <ShieldAlert className="h-4 w-4 text-red-500" />
                    ) : (
                      <ShieldCheck className="h-4 w-4 text-green-500" />
                    )}
                    <span className="font-semibold">{metrics.activeBreaches}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Next Audit</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Activity className="h-4 w-4 text-blue-500" />
                    <span className="font-semibold">
                      {new Date(metrics.nextAudit).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="ml-8">
              <div className="w-32 h-32 relative">
                <svg className="w-32 h-32 transform -rotate-90">
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    className="text-gray-200"
                  />
                  <circle
                    cx="64"
                    cy="64"
                    r="56"
                    stroke="currentColor"
                    strokeWidth="12"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 56}`}
                    strokeDashoffset={`${2 * Math.PI * 56 * (1 - complianceScore / 100)}`}
                    className={getComplianceColor(complianceScore)}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Shield className="h-12 w-12 text-blue-600" />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Frameworks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {frameworks.map(framework => (
          <Card key={framework.id} className="hover:shadow-lg transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-sm">{framework.id}</CardTitle>
                {getStatusBadge(framework.status)}
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 mb-3">{framework.description}</p>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Score</span>
                  <span className={`font-bold ${getComplianceColor(framework.score)}`}>
                    {framework.score}%
                  </span>
                </div>
                <Progress value={framework.score} className="h-2" />
                <p className="text-xs text-gray-500">
                  Last assessed: {framework.lastAssessed}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Alert for Issues */}
      {(metrics.activeBreaches > 0 || metrics.pendingDSARs > 5) && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-700">
            <strong>Attention Required:</strong>
            {metrics.activeBreaches > 0 && ` ${metrics.activeBreaches} active security incident(s).`}
            {metrics.pendingDSARs > 5 && ` ${metrics.pendingDSARs} pending data subject requests.`}
            {' '}Review and address these items to maintain compliance.
          </AlertDescription>
        </Alert>
      )}

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="consent">Consent</TabsTrigger>
          <TabsTrigger value="dsar">Data Rights</TabsTrigger>
          <TabsTrigger value="breaches">Incidents</TabsTrigger>
          <TabsTrigger value="audit">Audit Trail</TabsTrigger>
          <TabsTrigger value="controls">Controls</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Key Requirements */}
            <Card>
              <CardHeader>
                <CardTitle>Key Compliance Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Data Encryption</p>
                        <p className="text-xs text-gray-500">AES-256 at rest, TLS in transit</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Access Controls</p>
                        <p className="text-xs text-gray-500">Role-based, MFA enabled</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <div>
                        <p className="font-medium">Audit Logging</p>
                        <p className="text-xs text-gray-500">All access logged and monitored</p>
                      </div>
                    </div>
                    <Badge className="bg-green-100 text-green-800">Active</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="h-5 w-5 text-yellow-500" />
                      <div>
                        <p className="font-medium">Penetration Testing</p>
                        <p className="text-xs text-gray-500">Due in 45 days</p>
                      </div>
                    </div>
                    <Badge className="bg-yellow-100 text-yellow-800">Scheduled</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <CardTitle>Privacy Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Total Users</span>
                    <span className="font-semibold">{metrics.totalUsers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Consent Compliance</span>
                    <span className="font-semibold">{metrics.consentCompliance}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Data Retention Compliance</span>
                    <span className="font-semibold">98%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Third-Party Agreements</span>
                    <span className="font-semibold">12 Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Cross-Border Transfers</span>
                    <span className="font-semibold">EU, US Compliant</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Last Security Audit</span>
                    <span className="font-semibold">
                      {new Date(metrics.lastAudit).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="consent">
          <ConsentManager userId={userId || ''} userType={userRole} />
        </TabsContent>

        <TabsContent value="dsar">
          <DataSubjectRequests userId={userId} userRole={userRole} />
        </TabsContent>

        <TabsContent value="breaches">
          <DataBreachNotification />
        </TabsContent>

        <TabsContent value="audit">
          <Card>
            <CardHeader>
              <CardTitle>Audit Trail & Access Logs</CardTitle>
              <CardDescription>
                Monitor all access to sensitive data and system changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Alert className="mb-4 bg-blue-50 border-blue-200">
                <Activity className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  All data access is logged and retained for 7 years in compliance with regulatory requirements.
                  Logs are encrypted and tamper-proof.
                </AlertDescription>
              </Alert>
              
              <div className="space-y-3">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Data Export Request</p>
                      <p className="text-sm text-gray-600">User ID: USR-2024-001 exported personal data</p>
                      <p className="text-xs text-gray-500 mt-1">2 hours ago • IP: 203.45.67.89</p>
                    </div>
                    <Badge>Data Access</Badge>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Consent Updated</p>
                      <p className="text-sm text-gray-600">Marketing consent withdrawn by user</p>
                      <p className="text-xs text-gray-500 mt-1">5 hours ago • IP: 203.45.67.89</p>
                    </div>
                    <Badge>Privacy</Badge>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="font-medium">Admin Access</p>
                      <p className="text-sm text-gray-600">Admin viewed contractor personal data</p>
                      <p className="text-xs text-gray-500 mt-1">1 day ago • IP: 10.0.0.5</p>
                    </div>
                    <Badge variant="outline">Admin</Badge>
                  </div>
                </div>
              </div>
              
              <Button variant="outline" className="w-full mt-4">
                View Full Audit Log
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="controls">
          <Card>
            <CardHeader>
              <CardTitle>Security & Privacy Controls</CardTitle>
              <CardDescription>
                Configure and monitor security controls and privacy settings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Lock className="h-4 w-4" />
                        Encryption Settings
                      </h4>
                      <Badge className="bg-green-100 text-green-800">Enabled</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">At Rest</span>
                        <span className="font-medium">AES-256-GCM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">In Transit</span>
                        <span className="font-medium">TLS 1.3</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Key Rotation</span>
                        <span className="font-medium">90 days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Key className="h-4 w-4" />
                        Access Control
                      </h4>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">MFA Required</span>
                        <span className="font-medium">Yes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Session Timeout</span>
                        <span className="font-medium">30 minutes</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Password Policy</span>
                        <span className="font-medium">Strong</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Database className="h-4 w-4" />
                        Data Retention
                      </h4>
                      <Badge className="bg-green-100 text-green-800">Configured</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Personal Data</span>
                        <span className="font-medium">7 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Audit Logs</span>
                        <span className="font-medium">7 years</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Backups</span>
                        <span className="font-medium">90 days</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Monitoring
                      </h4>
                      <Badge className="bg-green-100 text-green-800">Active</Badge>
                    </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">SIEM Integration</span>
                        <span className="font-medium">Connected</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Alerts Configured</span>
                        <span className="font-medium">45 rules</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Scan</span>
                        <span className="font-medium">2 hours ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
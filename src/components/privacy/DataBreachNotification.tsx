'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Shield,
  AlertTriangle,
  AlertCircle,
  Lock,
  Users,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Send,
  Mail,
  Activity,
  TrendingUp,
  Siren,
  ShieldAlert,
  UserX,
  Database,
  Eye,
  Download, MessageSquare} from 'lucide-react';
import { DataBreach } from '@/types/privacy';

export function DataBreachNotification() {
  const [breaches, setBreaches] = useState<DataBreach[]>([]);
  const [selectedBreach, setSelectedBreach] = useState<DataBreach | null>(null);
  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [activeTab, setActiveTab] = useState('current');
  const [loading, setLoading] = useState(false);

  // Incident form state
  const [incidentData, setIncidentData] = useState({
    severity: 'medium',
    type: 'unauthorized_access',
    affectedRecords: 0,
    description: '',
    containmentMeasures: [] as string[],
    affectedSystems: [] as string[]
  });

  const [notificationData, setNotificationData] = useState({
    notifyUsers: false,
    notifyRegulator: false,
    notifyPartners: false,
    message: ''
  });

  const containmentOptions = [
    'Password reset required',
    'Access temporarily suspended',
    'System isolated',
    'Vulnerability patched',
    'Encryption keys rotated',
    'Monitoring enhanced',
    'Firewall rules updated',
    'Third-party access revoked'
  ];

  useEffect(() => {
    fetchBreaches();
    const interval = setInterval(fetchBreaches, 60000); // Check every minute
    return () => clearInterval(interval);
  }, []);

  const fetchBreaches = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/privacy/breaches');
      const data = await response.json();
      setBreaches(data);
    } catch (error) {
      console.error('Failed to fetch breaches:', error);
    } finally {
      setLoading(false);
    }
  };

  const reportBreach = async () => {
    try {
      const response = await fetch('/api/privacy/breaches/report', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(incidentData)
      });

      if (response.ok) {
        fetchBreaches();
        setShowIncidentForm(false);
        // Reset form
        setIncidentData({
          severity: 'medium',
          type: 'unauthorized_access',
          affectedRecords: 0,
          description: '',
          containmentMeasures: [],
          affectedSystems: []
        });
      }
    } catch (error) {
      console.error('Failed to report breach:', error);
    }
  };

  const sendNotifications = async (breachId: string) => {
    try {
      const response = await fetch(`/api/privacy/breaches/${breachId}/notify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(notificationData)
      });

      if (response.ok) {
        fetchBreaches();
        setNotificationData({
          notifyUsers: false,
          notifyRegulator: false,
          notifyPartners: false,
          message: ''
        });
      }
    } catch (error) {
      console.error('Failed to send notifications:', error);
    }
  };

  const updateInvestigationStatus = async (breachId: string, status: string) => {
    try {
      const response = await fetch(`/api/privacy/breaches/${breachId}/investigation`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        fetchBreaches();
      }
    } catch (error) {
      console.error('Failed to update investigation status:', error);
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800 border-red-300';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const activeBreaches = breaches.filter(b => b.investigationStatus !== 'completed');
  const resolvedBreaches = breaches.filter(b => b.investigationStatus === 'completed');
  const criticalBreaches = breaches.filter(b => b.severity === 'critical' && b.investigationStatus !== 'completed');

  const getTimeElapsed = (date: Date) => {
    const hours = Math.floor((Date.now() - new Date(date).getTime()) / (1000 * 60 * 60));
    if (hours < 1) return 'Less than 1 hour ago';
    if (hours === 1) return '1 hour ago';
    if (hours < 24) return `${hours} hours ago`;
    const days = Math.floor(hours / 24);
    if (days === 1) return '1 day ago';
    return `${days} days ago`;
  };

  return (
    <div className="space-y-6">
      {/* Critical Alert */}
      {criticalBreaches.length > 0 && (
        <Alert className="bg-red-50 border-red-300">
          <Siren className="h-5 w-5 text-red-600 animate-pulse" />
          <AlertDescription className="text-red-800">
            <strong>CRITICAL SECURITY INCIDENT:</strong> {criticalBreaches.length} active critical 
            breach{criticalBreaches.length > 1 ? 'es' : ''} requiring immediate attention. 
            Regulatory notification may be required within 72 hours.
          </AlertDescription>
        </Alert>
      )}

      {/* Header & Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5" />
              Data Breach Response System
            </span>
            <Button 
              variant={criticalBreaches.length > 0 ? "destructive" : "default"}
              onClick={() => setShowIncidentForm(true)}
            >
              <AlertTriangle className="h-4 w-4 mr-2" />
              Report Incident
            </Button>
          </CardTitle>
          <CardDescription>
            Monitor and respond to data breaches in compliance with notifiable breach requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card className={criticalBreaches.length > 0 ? 'border-red-300' : ''}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-red-600">
                      {activeBreaches.length}
                    </p>
                    <p className="text-xs text-gray-500">Active Incidents</p>
                  </div>
                  <Activity className="h-8 w-8 text-red-500" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {breaches.reduce((sum, b) => sum + b.affectedRecords, 0)}
                    </p>
                    <p className="text-xs text-gray-500">Records Affected</p>
                  </div>
                  <Database className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">
                      {breaches.filter(b => b.notificationsSent).length}
                    </p>
                    <p className="text-xs text-gray-500">Users Notified</p>
                  </div>
                  <Mail className="h-8 w-8 text-gray-400" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold text-green-600">
                      {resolvedBreaches.length}
                    </p>
                    <p className="text-xs text-gray-500">Resolved</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Incidents Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="current">
            Active Incidents ({activeBreaches.length})
          </TabsTrigger>
          <TabsTrigger value="investigation">
            Under Investigation
          </TabsTrigger>
          <TabsTrigger value="resolved">
            Resolved ({resolvedBreaches.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <Card>
            <CardContent className="pt-6">
              {activeBreaches.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <Shield className="h-12 w-12 mx-auto mb-3 text-green-500" />
                  <p>No active security incidents</p>
                  <p className="text-sm mt-1">System is operating normally</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {activeBreaches.map(breach => (
                    <div
                      key={breach.id}
                      className={`border rounded-lg p-4 ${getSeverityColor(breach.severity)}`}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <Badge className={getSeverityColor(breach.severity)}>
                              {breach.severity.toUpperCase()} SEVERITY
                            </Badge>
                            <Badge variant="outline">
                              {breach.type.replace('_', ' ')}
                            </Badge>
                            <span className="text-sm text-gray-600">
                              {getTimeElapsed(breach.detectedAt)}
                            </span>
                          </div>
                          <p className="font-medium">{breach.description}</p>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedBreach(breach)}
                        >
                          <Eye className="h-4 w-4 mr-2" />
                          Details
                        </Button>
                      </div>

                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Affected Records</p>
                          <p className="font-medium">{breach.affectedRecords.toLocaleString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Investigation Status</p>
                          <p className="font-medium capitalize">{breach.investigationStatus}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Notifications</p>
                          <div className="flex items-center gap-2">
                            {breach.notificationsSent ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <Clock className="h-4 w-4 text-blue-600" />
                            )}
                            <span className="font-medium">
                              {breach.notificationsSent ? 'Sent' : 'Pending'}
                            </span>
                          </div>
                        </div>
                      </div>

                      {breach.containmentMeasures.length > 0 && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm font-medium mb-2">Containment Measures:</p>
                          <div className="flex flex-wrap gap-2">
                            {breach.containmentMeasures.map((measure, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                {measure}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Quick Actions */}
                      <div className="mt-4 flex gap-3">
                        {!breach.notificationsSent && breach.severity !== 'low' && (
                          <Button
                            size="sm"
                            variant={breach.severity === 'critical' ? 'destructive' : 'default'}
                            onClick={() => {
                              setSelectedBreach(breach);
                              // Open notification dialog
                            }}
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Send Notifications
                          </Button>
                        )}
                        {breach.investigationStatus === 'pending' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateInvestigationStatus(breach.id, 'ongoing')}
                          >
                            Start Investigation
                          </Button>
                        )}
                        {breach.investigationStatus === 'ongoing' && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateInvestigationStatus(breach.id, 'completed')}
                          >
                            Mark Resolved
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="investigation">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {breaches.filter(b => b.investigationStatus === 'ongoing').map(breach => (
                  <div key={breach.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium mb-2">{breach.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Started: {getTimeElapsed(breach.detectedAt)}</span>
                          <span>Severity: {breach.severity}</span>
                          <span>Records: {breach.affectedRecords}</span>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedBreach(breach)}
                      >
                        View Investigation
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resolved">
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {resolvedBreaches.map(breach => (
                  <div key={breach.id} className="border rounded-lg p-4 bg-gray-50">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-medium mb-2">{breach.description}</p>
                        <div className="flex items-center gap-4 text-sm text-gray-600">
                          <span>Detected: {new Date(breach.detectedAt).toLocaleDateString()}</span>
                          <span>Resolved: {breach.reportedAt && new Date(breach.reportedAt).toLocaleDateString()}</span>
                          <span>Records: {breach.affectedRecords}</span>
                        </div>
                        {breach.rootCause && (
                          <p className="text-sm text-gray-600 mt-2">
                            <strong>Root Cause:</strong> {breach.rootCause}
                          </p>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedBreach(breach)}
                      >
                        <FileText className="h-4 w-4 mr-2" />
                        Report
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Compliance Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Regulatory Compliance Timeline</CardTitle>
          <CardDescription>
            Key deadlines for breach notification requirements
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Within 72 hours</p>
                <p className="text-sm text-gray-600">
                  Notify OAIC if breach likely to result in serious harm
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">As soon as practicable</p>
                <p className="text-sm text-gray-600">
                  Notify affected individuals of eligible data breach
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <FileText className="h-6 w-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Within 30 days</p>
                <p className="text-sm text-gray-600">
                  Complete investigation and submit final report
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Report Incident Dialog */}
      <Dialog open={showIncidentForm} onOpenChange={setShowIncidentForm}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              Report Security Incident
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Alert className="bg-red-50 border-red-200">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-700">
                This form triggers immediate security response procedures. 
                Report only confirmed or highly suspected breaches.
              </AlertDescription>
            </Alert>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="severity">Severity Level</Label>
                <Select
                  value={incidentData.severity}
                  onValueChange={(value) => setIncidentData({ ...incidentData, severity: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="critical">Critical - Immediate danger</SelectItem>
                    <SelectItem value="high">High - Significant impact</SelectItem>
                    <SelectItem value="medium">Medium - Moderate impact</SelectItem>
                    <SelectItem value="low">Low - Minimal impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="type">Incident Type</Label>
                <Select
                  value={incidentData.type}
                  onValueChange={(value) => setIncidentData({ ...incidentData, type: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="unauthorized_access">Unauthorized Access</SelectItem>
                    <SelectItem value="data_loss">Data Loss</SelectItem>
                    <SelectItem value="data_theft">Data Theft</SelectItem>
                    <SelectItem value="accidental_disclosure">Accidental Disclosure</SelectItem>
                    <SelectItem value="system_breach">System Breach</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="affected-records">Estimated Affected Records</Label>
              <Input
                id="affected-records"
                type="number"
                value={incidentData.affectedRecords}
                onChange={(e) => setIncidentData({ ...incidentData, affectedRecords: parseInt(e.target.value) || 0 })}
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="description">Incident Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what happened, when it was detected, and potential impact..."
                value={incidentData.description}
                onChange={(e) => setIncidentData({ ...incidentData, description: e.target.value })}
                rows={4}
                className="mt-2"
              />
            </div>

            <div>
              <Label>Containment Measures Taken</Label>
              <div className="grid grid-cols-2 gap-3 mt-2">
                {containmentOptions.map(option => (
                  <div key={option} className="flex items-center space-x-2">
                    <Checkbox
                      id={option}
                      checked={incidentData.containmentMeasures.includes(option)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setIncidentData({
                            ...incidentData,
                            containmentMeasures: [...incidentData.containmentMeasures, option]
                          });
                        } else {
                          setIncidentData({
                            ...incidentData,
                            containmentMeasures: incidentData.containmentMeasures.filter(m => m !== option)
                          });
                        }
                      }}
                    />
                    <label htmlFor={option} className="text-sm">
                      {option}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {incidentData.severity === 'critical' && (
              <Alert className="bg-yellow-50 border-yellow-200">
                <MessageSquare className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-700">
                  <strong>Critical Incident Protocol:</strong> Security team will be immediately 
                  notified. Prepare to join emergency response call within 15 minutes.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowIncidentForm(false)}>
              Cancel
            </Button>
            <Button
              variant={incidentData.severity === 'critical' ? 'destructive' : 'default'}
              onClick={reportBreach}
              disabled={!incidentData.description}
            >
              Report Incident
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
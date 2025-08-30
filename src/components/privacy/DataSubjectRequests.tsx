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
import {
  User,
  Download,
  Trash2,
  Edit,
  Shield,
  Lock,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Info,
  Send,
  Archive,
  Database,
  UserX,
  FileDown,
  RefreshCcw
} from 'lucide-react';
import { DataSubjectRequest } from '@/types/privacy';

interface DataSubjectRequestsProps {
  userId?: string;
  userRole: 'contractor' | 'admin';
}

export function DataSubjectRequests({ userId, userRole }: DataSubjectRequestsProps) {
  const [requests, setRequests] = useState<DataSubjectRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<DataSubjectRequest | null>(null);
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  // Form state
  const [requestType, setRequestType] = useState<string>('access');
  const [description, setDescription] = useState('');
  const [legalBasis, setLegalBasis] = useState('');

  const requestTypes = [
    {
      id: 'access',
      name: 'Data Access Request',
      description: 'Request a copy of all personal data we hold about you',
      icon: <Eye className="h-5 w-5" />,
      timeframe: '30 days',
      requirements: 'Identity verification required'
    },
    {
      id: 'rectification',
      name: 'Data Rectification',
      description: 'Request correction of inaccurate or incomplete personal data',
      icon: <Edit className="h-5 w-5" />,
      timeframe: '30 days',
      requirements: 'Proof of correct information'
    },
    {
      id: 'erasure',
      name: 'Right to be Forgotten',
      description: 'Request deletion of all personal data',
      icon: <Trash2 className="h-5 w-5" />,
      timeframe: '30 days',
      requirements: 'No outstanding contractual obligations'
    },
    {
      id: 'portability',
      name: 'Data Portability',
      description: 'Receive your data in a structured, machine-readable format',
      icon: <FileDown className="h-5 w-5" />,
      timeframe: '30 days',
      requirements: 'Applies to data provided by you'
    },
    {
      id: 'restriction',
      name: 'Restrict Processing',
      description: 'Limit how we process your personal data',
      icon: <Lock className="h-5 w-5" />,
      timeframe: 'Immediate',
      requirements: 'Valid grounds for restriction'
    },
    {
      id: 'objection',
      name: 'Object to Processing',
      description: 'Object to specific uses of your personal data',
      icon: <XCircle className="h-5 w-5" />,
      timeframe: 'Immediate',
      requirements: 'Legitimate grounds for objection'
    }
  ];

  useEffect(() => {
    fetchRequests();
  }, [userId, userRole, filterStatus]);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const endpoint = userRole === 'admin' 
        ? `/api/privacy/dsar/all?status=${filterStatus}`
        : `/api/privacy/dsar/user/${userId}?status=${filterStatus}`;
      
      const response = await fetch(endpoint);
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Failed to fetch DSARs:', error);
    } finally {
      setLoading(false);
    }
  };

  const submitRequest = async () => {
    try {
      const response = await fetch('/api/privacy/dsar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          type: requestType,
          description,
          legalBasis
        })
      });

      if (response.ok) {
        fetchRequests();
        setShowNewRequest(false);
        setDescription('');
        setLegalBasis('');
      }
    } catch (error) {
      console.error('Failed to submit DSAR:', error);
    }
  };

  const updateRequestStatus = async (requestId: string, status: string, response?: string) => {
    try {
      const res = await fetch(`/api/privacy/dsar/${requestId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, response })
      });

      if (res.ok) {
        fetchRequests();
      }
    } catch (error) {
      console.error('Failed to update DSAR status:', error);
    }
  };

  const downloadRequestData = async (requestId: string) => {
    try {
      const response = await fetch(`/api/privacy/dsar/${requestId}/download`);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `dsar-${requestId}-${new Date().toISOString()}.zip`;
      a.click();
    } catch (error) {
      console.error('Failed to download DSAR data:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    const requestType = requestTypes.find(rt => rt.id === type);
    return requestType?.icon || <FileText className="h-5 w-5" />;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-centre justify-between">
            <span className="flex items-centre gap-2">
              <Shield className="h-5 w-5" />
              Data Subject Rights (DSAR)
            </span>
            {userRole === 'contractor' && (
              <Button onClick={() => setShowNewRequest(true)}>
                Submit New Request
              </Button>
            )}
          </CardTitle>
          <CardDescription>
            Exercise your rights under Australian Privacy Principles and GDPR
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Statistics for Admin */}
          {userRole === 'admin' && (
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {requests.filter(r => r.status === 'pending').length}
                  </div>
                  <p className="text-xs text-gray-500">Pending Requests</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-blue-600">
                    {requests.filter(r => r.status === 'in_progress').length}
                  </div>
                  <p className="text-xs text-gray-500">In Progress</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold text-green-600">
                    {requests.filter(r => r.status === 'completed').length}
                  </div>
                  <p className="text-xs text-gray-500">Completed</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-6">
                  <div className="text-2xl font-bold">
                    {Math.round(
                      requests.filter(r => r.completedAt).reduce((acc, r) => {
                        const days = Math.ceil(
                          (new Date(r.completedAt!).getTime() - new Date(r.requestedAt).getTime()) / (1000 * 60 * 60 * 24)
                        );
                        return acc + days;
                      }, 0) / requests.filter(r => r.completedAt).length || 0
                    )} days
                  </div>
                  <p className="text-xs text-gray-500">Avg. Response Time</p>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Filter */}
          <div className="flex justify-between items-centre mb-4">
            <h3 className="font-medium">Request History</h3>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Requests</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Requests List */}
          <div className="space-y-3">
            {requests.length === 0 ? (
              <div className="text-centre py-8 text-gray-500">
                <Database className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p>No data requests found</p>
              </div>
            ) : (
              requests.map(request => (
                <div
                  key={request.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => setSelectedRequest(request)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      {getTypeIcon(request.type)}
                      <div>
                        <p className="font-medium">
                          {requestTypes.find(rt => rt.id === request.type)?.name}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          {request.description}
                        </p>
                        <div className="flex items-centre gap-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-centre gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(request.requestedAt).toLocaleDateString()}
                          </span>
                          {request.completedAt && (
                            <span className="flex items-centre gap-1">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              Completed {new Date(request.completedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    <Badge className={getStatusColor(request.status)}>
                      {request.status.replace('_', ' ')}
                    </Badge>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Request Types Information */}
      {userRole === 'contractor' && (
        <Card>
          <CardHeader>
            <CardTitle>Your Privacy Rights</CardTitle>
            <CardDescription>
              Under Australian Privacy Principles and GDPR, you have the following rights
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {requestTypes.map(type => (
                <div key={type.id} className="border rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    {type.icon}
                    <div className="flex-1">
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                      <div className="mt-3 space-y-1">
                        <p className="text-xs text-gray-500">
                          <strong>Response time:</strong> {type.timeframe}
                        </p>
                        <p className="text-xs text-gray-500">
                          <strong>Requirements:</strong> {type.requirements}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* New Request Modal */}
      <Dialog open={showNewRequest} onOpenChange={setShowNewRequest}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Data Subject Request</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                We will respond to your request within 30 days as required by law. 
                Complex requests may require additional time with notification.
              </AlertDescription>
            </Alert>

            <div>
              <Label htmlFor="request-type">Request Type</Label>
              <Select value={requestType} onValueChange={setRequestType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {requestTypes.map(type => (
                    <SelectItem key={type.id} value={type.id}>
                      {type.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500 mt-1">
                {requestTypes.find(rt => rt.id === requestType)?.description}
              </p>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Please provide details about your request..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="mt-2"
              />
            </div>

            {(requestType === 'erasure' || requestType === 'restriction' || requestType === 'objection') && (
              <div>
                <Label htmlFor="legal-basis">Legal Basis (Optional)</Label>
                <Textarea
                  id="legal-basis"
                  placeholder="Provide legal grounds for your request if applicable..."
                  value={legalBasis}
                  onChange={(e) => setLegalBasis(e.target.value)}
                  rows={3}
                  className="mt-2"
                />
              </div>
            )}

            {requestType === 'erasure' && (
              <Alert className="bg-yellow-50 border-yellow-200">
                <AlertTriangle className="h-4 w-4 text-yellow-600" />
                <AlertDescription className="text-yellow-700">
                  <strong>Important:</strong> Requesting data erasure will result in permanent 
                  deletion of your account and all associated data. This action cannot be undone.
                </AlertDescription>
              </Alert>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewRequest(false)}>
              Cancel
            </Button>
            <Button onClick={submitRequest} disabled={!description}>
              Submit Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Request Details Modal (Admin) */}
      {selectedRequest && userRole === 'admin' && (
        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>DSAR Details</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Request ID</Label>
                  <p className="font-mono text-sm">{selectedRequest.id}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Status</Label>
                  <Badge className={getStatusColor(selectedRequest.status)}>
                    {selectedRequest.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Type</Label>
                  <p className="font-medium">
                    {requestTypes.find(rt => rt.id === selectedRequest.type)?.name}
                  </p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Requested</Label>
                  <p className="font-medium">
                    {new Date(selectedRequest.requestedAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div>
                <Label className="text-sm text-gray-600">Description</Label>
                <p className="mt-1">{selectedRequest.description}</p>
              </div>

              {selectedRequest.legalBasis && (
                <div>
                  <Label className="text-sm text-gray-600">Legal Basis</Label>
                  <p className="mt-1">{selectedRequest.legalBasis}</p>
                </div>
              )}

              {selectedRequest.response && (
                <div>
                  <Label className="text-sm text-gray-600">Response</Label>
                  <p className="mt-1">{selectedRequest.response}</p>
                </div>
              )}

              <div className="flex gap-3">
                {selectedRequest.status === 'pending' && (
                  <Button
                    onClick={() => updateRequestStatus(selectedRequest.id, 'in_progress')}
                  >
                    Start Processing
                  </Button>
                )}
                {selectedRequest.status === 'in_progress' && (
                  <>
                    <Button
                      onClick={() => updateRequestStatus(selectedRequest.id, 'completed', 'Request has been fulfilled')}
                    >
                      Mark Complete
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => updateRequestStatus(selectedRequest.id, 'rejected', 'Request cannot be fulfilled')}
                    >
                      Reject
                    </Button>
                  </>
                )}
                <Button
                  variant="outline"
                  onClick={() => downloadRequestData(selectedRequest.id)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Data
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
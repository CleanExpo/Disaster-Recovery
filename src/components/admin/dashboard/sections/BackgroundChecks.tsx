'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Shield,
  Search,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  Download,
  Eye,
  RefreshCcw,
  AlertCircle,
  Building,
  Mail,
  MapPin,
  Calendar,
  DollarSign,
  Loader2,
  ExternalLink,
  UserCheck,
  ShieldCheck,
  ShieldAlert, MessageSquare} from 'lucide-react';

interface BackgroundCheck {
  id: string;
  contractorId: string;
  contractorName: string;
  companyName: string;
  type: 'criminal' | 'financial' | 'identity' | 'reference' | 'comprehensive';
  status: 'pending' | 'in_progress' | 'completed' | 'failed' | 'requires_review';
  initiatedAt: string;
  completedAt?: string;
  provider: string;
  cost: number;
  results?: {
    criminalRecord?: boolean;
    financialIssues?: boolean;
    identityVerified?: boolean;
    referenceChecks?: Array<{
      name: string;
      contacted: boolean;
      response?: string;
      rating?: number;
    }>;
    riskScore?: number;
    flags?: string[];
  };
  notes?: string;
  reviewRequired?: boolean;
  reviewedBy?: string;
}

interface Reference {
  id: string;
  contractorId: string;
  name: string;
  company: string;
  position: string;
  phone: string;
  email: string;
  relationship: string;
  yearsKnown: number;
  contacted: boolean;
  contactedAt?: string;
  response?: string;
  rating?: number;
  verified: boolean;
}

export function BackgroundChecks() {
  const [checks, setChecks] = useState<BackgroundCheck[]>([]);
  const [references, setReferences] = useState<Reference[]>([]);
  const [selectedCheck, setSelectedCheck] = useState<BackgroundCheck | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [initiateModal, setInitiateModal] = useState(false);
  const [selectedContractor, setSelectedContractor] = useState<any>(null);
  const [checkType, setCheckType] = useState<string>('comprehensive');
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewNotes, setReviewNotes] = useState('');

  useEffect(() => {
    fetchBackgroundChecks();
    fetchReferences();
  }, [filterStatus]);

  const fetchBackgroundChecks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/background-checks?status=${filterStatus}`);
      const data = await response.json();
      setChecks(data);
    } catch (error) {
      console.error('Failed to fetch background checks:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchReferences = async () => {
    try {
      const response = await fetch('/api/admin/references');
      const data = await response.json();
      setReferences(data);
    } catch (error) {
      console.error('Failed to fetch references:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'requires_review': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (score?: number) => {
    if (!score) return 'text-gray-600';
    if (score <= 30) return 'text-green-600';
    if (score <= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskLabel = (score?: number) => {
    if (!score) return 'Pending';
    if (score <= 30) return 'Low Risk';
    if (score <= 60) return 'Medium Risk';
    return 'High Risk';
  };

  const initiateBackgroundCheck = async () => {
    if (!selectedContractor) return;

    try {
      const response = await fetch('/api/admin/background-checks/initiate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractorId: selectedContractor.id,
          type: checkType,
          provider: 'third_party_provider' // Replace with actual provider
        })
      });

      if (response.ok) {
        fetchBackgroundChecks();
        setInitiateModal(false);
        setSelectedContractor(null);
      }
    } catch (error) {
      console.error('Failed to initiate background check:', error);
    }
  };

  const handleReview = async () => {
    if (!selectedCheck) return;

    try {
      const response = await fetch(`/api/admin/background-checks/${selectedCheck.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          notes: reviewNotes,
          reviewedBy: 'admin_id' // Replace with actual admin ID
        })
      });

      if (response.ok) {
        fetchBackgroundChecks();
        setReviewModal(false);
        setReviewNotes('');
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  const contactReference = async (reference: Reference) => {
    try {
      const response = await fetch(`/api/admin/references/${reference.id}/contact`, {
        method: 'POST'
      });

      if (response.ok) {
        fetchReferences();
      }
    } catch (error) {
      console.error('Failed to contact reference:', error);
    }
  };

  const filteredChecks = checks.filter(check =>
    (filterStatus === 'all' || check.status === filterStatus) &&
    (searchTerm === '' || 
     check.contractorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     check.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const pendingReferences = references.filter(ref => !ref.contacted);
  const completedReferences = references.filter(ref => ref.contacted && ref.verified);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Background Checks & References</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search contractors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Checks</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
              <SelectItem value="requires_review">Requires Review</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={() => setInitiateModal(true)}>
            <Shield className="h-4 w-4 mr-2" />
            Initiate Check
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Checks</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{checks.length}</p>
            <p className="text-xs text-gray-500 mt-1">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">In Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-600">
              {checks.filter(c => c.status === 'in_progress').length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Currently processing</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Requires Review</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-orange-600">
              {checks.filter(c => c.status === 'requires_review').length}
            </p>
            <p className="text-xs text-gray-500 mt-1">Need attention</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Cost</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              ${checks.reduce((sum, c) => sum + c.cost, 0).toLocaleString()}
            </p>
            <p className="text-xs text-gray-500 mt-1">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Alert for pending reviews */}
      {checks.filter(c => c.status === 'requires_review').length > 0 && (
        <Alert className="bg-orange-50 border-orange-200">
          <AlertTriangle className="h-4 w-4 text-orange-600" />
          <AlertDescription className="text-orange-700">
            <strong>{checks.filter(c => c.status === 'requires_review').length} background checks</strong> require 
            manual review due to flagged issues or incomplete information.
          </AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="checks" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="checks">Background Checks</TabsTrigger>
          <TabsTrigger value="references">References</TabsTrigger>
        </TabsList>

        {/* Background Checks Tab */}
        <TabsContent value="checks">
          <Card>
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b">
                    <tr>
                      <th className="text-left p-4 font-medium text-sm">Contractor</th>
                      <th className="text-left p-4 font-medium text-sm">Check Type</th>
                      <th className="text-left p-4 font-medium text-sm">Provider</th>
                      <th className="text-left p-4 font-medium text-sm">Status</th>
                      <th className="text-left p-4 font-medium text-sm">Risk Assessment</th>
                      <th className="text-left p-4 font-medium text-sm">Cost</th>
                      <th className="text-left p-4 font-medium text-sm">Initiated</th>
                      <th className="text-left p-4 font-medium text-sm">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {loading ? (
                      <tr>
                        <td colSpan={8} className="text-center p-8">
                          <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" />
                        </td>
                      </tr>
                    ) : filteredChecks.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="text-center p-8 text-gray-500">
                          No background checks found
                        </td>
                      </tr>
                    ) : (
                      filteredChecks.map(check => (
                        <tr key={check.id} className="border-b hover:bg-gray-50">
                          <td className="p-4">
                            <div>
                              <p className="font-medium">{check.contractorName}</p>
                              <p className="text-sm text-gray-600">{check.companyName}</p>
                            </div>
                          </td>
                          <td className="p-4">
                            <Badge variant="outline" className="capitalize">
                              {check.type}
                            </Badge>
                          </td>
                          <td className="p-4">
                            <p className="text-sm">{check.provider}</p>
                          </td>
                          <td className="p-4">
                            <Badge className={getStatusColor(check.status)}>
                              {check.status.replace('_', ' ')}
                            </Badge>
                          </td>
                          <td className="p-4">
                            {check.results?.riskScore !== undefined ? (
                              <div className="flex items-center gap-2">
                                {check.results.riskScore <= 30 ? (
                                  <ShieldCheck className={`h-4 w-4 ${getRiskColor(check.results.riskScore)}`} />
                                ) : (
                                  <ShieldAlert className={`h-4 w-4 ${getRiskColor(check.results.riskScore)}`} />
                                )}
                                <span className={`font-medium ${getRiskColor(check.results.riskScore)}`}>
                                  {getRiskLabel(check.results.riskScore)}
                                </span>
                              </div>
                            ) : (
                              <span className="text-gray-400">Pending</span>
                            )}
                          </td>
                          <td className="p-4">
                            <p className="font-medium">${check.cost}</p>
                          </td>
                          <td className="p-4">
                            <p className="text-sm text-gray-600">
                              {new Date(check.initiatedAt).toLocaleDateString()}
                            </p>
                          </td>
                          <td className="p-4">
                            <div className="flex gap-2">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedCheck(check)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                              {check.status === 'completed' && (
                                <Button variant="ghost" size="sm">
                                  <Download className="h-4 w-4" />
                                </Button>
                              )}
                              {check.status === 'requires_review' && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-orange-600"
                                  onClick={() => {
                                    setSelectedCheck(check);
                                    setReviewModal(true);
                                  }}
                                >
                                  <AlertCircle className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* References Tab */}
        <TabsContent value="references">
          <div className="space-y-4">
            {/* Pending References */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Pending Reference Checks</CardTitle>
                <CardDescription>
                  {pendingReferences.length} references awaiting contact
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingReferences.map(ref => (
                    <div key={ref.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <p className="font-medium">{ref.name}</p>
                            <Badge variant="outline">{ref.relationship}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Building className="h-3 w-3" />
                              <span>{ref.company} - {ref.position}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Clock className="h-3 w-3" />
                              <span>Known for {ref.yearsKnown} years</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <MessageSquare className="h-3 w-3" />
                              <span>{ref.phone}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              <span>{ref.email}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={() => contactReference(ref)}
                          >
                            <MessageSquare className="h-4 w-4 mr-2" />
                            Contact
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                          >
                            <Mail className="h-4 w-4 mr-2" />
                            Email
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                  {pendingReferences.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <CheckCircle className="h-12 w-12 mx-auto mb-3 text-green-500" />
                      <p>All references have been contacted</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Completed References */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Verified References</CardTitle>
                <CardDescription>
                  {completedReferences.length} references verified
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {completedReferences.map(ref => (
                    <div key={ref.id} className="border rounded-lg p-4 bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <UserCheck className="h-4 w-4 text-green-500" />
                            <p className="font-medium">{ref.name}</p>
                            <Badge className="bg-green-100 text-green-800">Verified</Badge>
                          </div>
                          <p className="text-sm text-gray-600 mb-2">
                            {ref.company} - {ref.position}
                          </p>
                          {ref.rating && (
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-600">Rating:</span>
                              <div className="flex gap-1">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-4 h-4 rounded-full ${
                                      i < ref.rating! ? 'bg-yellow-400' : 'bg-gray-300'
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>
                          )}
                          {ref.response && (
                            <p className="text-sm text-gray-600 mt-2 italic">
                              "{ref.response}"
                            </p>
                          )}
                        </div>
                        <div className="text-right">
                          <p className="text-xs text-gray-500">
                            Contacted: {new Date(ref.contactedAt!).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Initiate Background Check Modal */}
      <Dialog open={initiateModal} onOpenChange={setInitiateModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Initiate Background Check</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="contractor">Select Contractor</Label>
              <Select onValueChange={(value) => setSelectedContractor({ id: value })}>
                <SelectTrigger className="mt-2">
                  <SelectValue placeholder="Choose a contractor" />
                </SelectTrigger>
                <SelectContent>
                  {/* Populate with contractors */}
                  <SelectItem value="contractor1">John Doe - ABC Restoration</SelectItem>
                  <SelectItem value="contractor2">Jane Smith - XYZ Services</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="check-type">Check Type</Label>
              <Select value={checkType} onValueChange={setCheckType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="comprehensive">
                    Comprehensive Check ($5,000)
                  </SelectItem>
                  <SelectItem value="criminal">
                    Criminal History Only ($1,500)
                  </SelectItem>
                  <SelectItem value="financial">
                    Financial Check ($2,000)
                  </SelectItem>
                  <SelectItem value="identity">
                    Identity Verification ($500)
                  </SelectItem>
                  <SelectItem value="reference">
                    Reference Check Only ($1,000)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <AlertCircle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                Background checks typically take 3-5 business days to complete. 
                The contractor will be notified via email.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setInitiateModal(false)}>
              Cancel
            </Button>
            <Button onClick={initiateBackgroundCheck} disabled={!selectedContractor}>
              Initiate Check
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Review Modal */}
      <Dialog open={reviewModal} onOpenChange={setReviewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Review Background Check</DialogTitle>
          </DialogHeader>

          {selectedCheck && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Contractor</Label>
                  <p className="font-medium">{selectedCheck.contractorName}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Check Type</Label>
                  <p className="font-medium capitalize">{selectedCheck.type}</p>
                </div>
              </div>

              {/* Flagged Issues */}
              {selectedCheck.results?.flags && selectedCheck.results.flags.length > 0 && (
                <Alert className="bg-yellow-50 border-yellow-200">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription>
                    <strong>Flagged Issues:</strong>
                    <ul className="list-disc list-inside mt-2">
                      {selectedCheck.results.flags.map((flag, index) => (
                        <li key={index} className="text-sm">{flag}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              <div>
                <Label htmlFor="review-notes">Review Notes</Label>
                <Textarea
                  id="review-notes"
                  placeholder="Add your review notes..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={4}
                  className="mt-2"
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleReview}>
              Complete Review
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Check Details Panel */}
      {selectedCheck && !reviewModal && (
        <Card>
          <CardHeader>
            <CardTitle>Background Check Details</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Check ID</Label>
                  <p className="font-mono text-sm">{selectedCheck.id}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Status</Label>
                  <Badge className={getStatusColor(selectedCheck.status)}>
                    {selectedCheck.status}
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Provider</Label>
                  <p className="font-medium">{selectedCheck.provider}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Cost</Label>
                  <p className="font-medium">${selectedCheck.cost}</p>
                </div>
              </div>

              {selectedCheck.results && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-3">Check Results</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Criminal Record</span>
                      <Badge className={selectedCheck.results.criminalRecord ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}>
                        {selectedCheck.results.criminalRecord ? 'Found' : 'Clear'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Financial Issues</span>
                      <Badge className={selectedCheck.results.financialIssues ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}>
                        {selectedCheck.results.financialIssues ? 'Found' : 'Clear'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Identity Verified</span>
                      <Badge className={selectedCheck.results.identityVerified ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {selectedCheck.results.identityVerified ? 'Verified' : 'Not Verified'}
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Risk Score</span>
                      <span className={`font-medium ${getRiskColor(selectedCheck.results.riskScore)}`}>
                        {selectedCheck.results.riskScore}/100 - {getRiskLabel(selectedCheck.results.riskScore)}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {selectedCheck.notes && (
                <div className="border-t pt-4">
                  <h4 className="font-medium mb-2">Notes</h4>
                  <p className="text-sm text-gray-600">{selectedCheck.notes}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
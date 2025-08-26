'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  User,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  Eye,
  MessageSquare,
  Star,
  Download,
  ChevronRight,
  Building,
  Shield,
  MapPin,
  Calendar
} from 'lucide-react';

interface Application {
  id: string;
  contractorName: string;
  companyName: string;
  email: string;
  submittedAt: string;
  currentStep: number;
  completedSteps: string[];
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'changes_requested';
  score?: number;
  reviewer?: string;
  notes?: string;
  riskLevel?: 'low' | 'medium' | 'high';
  documents: {
    type: string;
    status: 'pending' | 'verified' | 'rejected';
    url?: string;
  }[];
}

export function ApplicationReview() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [selectedApplication, setSelectedApplication] = useState<Application | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [reviewModal, setReviewModal] = useState(false);
  const [reviewAction, setReviewAction] = useState<'approve' | 'reject' | 'request_changes' | null>(null);
  const [reviewNotes, setReviewNotes] = useState('');
  const [autoFlags, setAutoFlags] = useState<any[]>([]);

  useEffect(() => {
    fetchApplications();
  }, [filterStatus]);

  const fetchApplications = async () => {
    try {
      const response = await fetch(`/api/admin/applications?status=${filterStatus}`);
      const data = await response.json();
      setApplications(data);
    } catch (error) {
      console.error('Failed to fetch applications:', error);
    }
  };

  const calculateApplicationScore = (app: Application): number => {
    let score = 0;
    const maxScore = 100;
    
    // Document completeness (40 points)
    const verifiedDocs = app.documents.filter(d => d.status === 'verified').length;
    score += (verifiedDocs / app.documents.length) * 40;
    
    // Step completion (30 points)
    score += (app.completedSteps.length / 7) * 30;
    
    // No flags (20 points)
    const hasFlags = autoFlags.some(flag => flag.applicationId === app.id);
    if (!hasFlags) score += 20;
    
    // Submission timeliness (10 points)
    const daysSinceSubmission = Math.floor((Date.now() - new Date(app.submittedAt).getTime()) / (1000 * 60 * 60 * 24));
    if (daysSinceSubmission < 7) score += 10;
    
    return Math.round(score);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'changes_requested': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRiskColor = (level?: string) => {
    switch (level) {
      case 'low': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'high': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const handleReviewSubmit = async () => {
    if (!selectedApplication || !reviewAction) return;

    try {
      const response = await fetch(`/api/admin/applications/${selectedApplication.id}/review`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: reviewAction,
          notes: reviewNotes,
          reviewer: 'current_admin_id' // Replace with actual admin ID
        })
      });

      if (response.ok) {
        // Refresh applications
        fetchApplications();
        setReviewModal(false);
        setSelectedApplication(null);
        setReviewNotes('');
        setReviewAction(null);
      }
    } catch (error) {
      console.error('Failed to submit review:', error);
    }
  };

  const openReviewModal = (app: Application, action: 'approve' | 'reject' | 'request_changes') => {
    setSelectedApplication(app);
    setReviewAction(action);
    setReviewModal(true);
  };

  const filteredApplications = applications.filter(app =>
    (filterStatus === 'all' || app.status === filterStatus) &&
    (searchTerm === '' || 
     app.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.contractorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     app.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Application Review</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search applications..."
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
              <SelectItem value="all">All Applications</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="changes_requested">Changes Requested</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Auto-flagged issues */}
      {autoFlags.length > 0 && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-700">
            <strong>{autoFlags.length} applications have been auto-flagged</strong> for incomplete or inconsistent information.
          </AlertDescription>
        </Alert>
      )}

      {/* Applications Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-sm">Application</th>
                  <th className="text-left p-4 font-medium text-sm">Company</th>
                  <th className="text-left p-4 font-medium text-sm">Progress</th>
                  <th className="text-left p-4 font-medium text-sm">Score</th>
                  <th className="text-left p-4 font-medium text-sm">Risk</th>
                  <th className="text-left p-4 font-medium text-sm">Status</th>
                  <th className="text-left p-4 font-medium text-sm">Submitted</th>
                  <th className="text-left p-4 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map(app => {
                  const score = calculateApplicationScore(app);
                  return (
                    <tr key={app.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div>
                          <p className="font-medium">{app.contractorName}</p>
                          <p className="text-sm text-gray-600">{app.email}</p>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span>{app.companyName}</span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <div className="w-24 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${(app.completedSteps.length / 7) * 100}%` }}
                            />
                          </div>
                          <span className="text-sm text-gray-600">
                            {app.completedSteps.length}/7
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <span className={`font-semibold ${
                            score >= 80 ? 'text-green-600' :
                            score >= 60 ? 'text-yellow-600' :
                            'text-red-600'
                          }`}>
                            {score}%
                          </span>
                          {score >= 80 && <Star className="h-4 w-4 text-yellow-500" />}
                        </div>
                      </td>
                      <td className="p-4">
                        <span className={`font-medium ${getRiskColor(app.riskLevel)}`}>
                          {app.riskLevel || 'Pending'}
                        </span>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(app.status)}>
                          {app.status.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm text-gray-600">
                          {new Date(app.submittedAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedApplication(app)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          {app.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600"
                                onClick={() => openReviewModal(app, 'approve')}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                                onClick={() => openReviewModal(app, 'reject')}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Review Modal */}
      <Dialog open={reviewModal} onOpenChange={setReviewModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>
              {reviewAction === 'approve' && 'Approve Application'}
              {reviewAction === 'reject' && 'Reject Application'}
              {reviewAction === 'request_changes' && 'Request Changes'}
            </DialogTitle>
          </DialogHeader>
          
          {selectedApplication && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Applicant</Label>
                  <p className="font-medium">{selectedApplication.contractorName}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Company</Label>
                  <p className="font-medium">{selectedApplication.companyName}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Application Score</Label>
                  <p className="font-medium">{calculateApplicationScore(selectedApplication)}%</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Risk Assessment</Label>
                  <p className={`font-medium ${getRiskColor(selectedApplication.riskLevel)}`}>
                    {selectedApplication.riskLevel || 'Pending'}
                  </p>
                </div>
              </div>

              <div>
                <Label htmlFor="review-notes">Review Notes</Label>
                <Textarea
                  id="review-notes"
                  placeholder="Enter your review notes..."
                  value={reviewNotes}
                  onChange={(e) => setReviewNotes(e.target.value)}
                  rows={4}
                  className="mt-2"
                />
                <p className="text-xs text-gray-500 mt-1">
                  These notes will be included in the notification to the applicant.
                </p>
              </div>

              {reviewAction === 'approve' && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    Approving this application will activate the contractor's account and begin their subscription billing.
                  </AlertDescription>
                </Alert>
              )}

              {reviewAction === 'reject' && (
                <Alert className="bg-red-50 border-red-200">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    Rejecting this application will permanently deny access. The applicant can reapply after 90 days.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setReviewModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleReviewSubmit}
              className={
                reviewAction === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                reviewAction === 'reject' ? 'bg-red-600 hover:bg-red-700' :
                ''
              }
            >
              {reviewAction === 'approve' && 'Approve Application'}
              {reviewAction === 'reject' && 'Reject Application'}
              {reviewAction === 'request_changes' && 'Request Changes'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Application Details Panel */}
      {selectedApplication && !reviewModal && (
        <Card>
          <CardHeader>
            <CardTitle>Application Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="overview">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
                <TabsTrigger value="scoring">Scoring</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-4">
                {/* Application overview content */}
              </TabsContent>

              <TabsContent value="documents" className="space-y-4">
                {/* Documents list and verification */}
              </TabsContent>

              <TabsContent value="scoring" className="space-y-4">
                {/* Detailed scoring breakdown */}
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                {/* Application history and notes */}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
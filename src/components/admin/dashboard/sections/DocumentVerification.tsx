'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Clock,
  Eye,
  Download,
  Shield,
  Building,
  CreditCard,
  Award,
  Camera,
  Upload,
  Search,
  Filter,
  RefreshCcw,
  AlertCircle,
  ChevronRight,
  FileCheck,
  FileX,
  Loader2
} from 'lucide-react';

interface Document {
  id: string;
  contractorId: string;
  contractorName: string;
  companyName: string;
  type: 'insurance' | 'license' | 'certification' | 'abn' | 'identification' | 'bank' | 'agreement';
  name: string;
  status: 'pending' | 'under_review' | 'approved' | 'rejected' | 'expired';
  uploadedAt: string;
  verifiedAt?: string;
  verifiedBy?: string;
  expiryDate?: string;
  url: string;
  metadata?: {
    fileSize?: string;
    checksum?: string;
    ocrExtracted?: boolean;
    aiAnalyzed?: boolean;
  };
  rejectionReason?: string;
  notes?: string;
}

interface VerificationQueue {
  priority: 'urgent' | 'high' | 'normal' | 'low';
  documents: Document[];
  count: number;
}

export function DocumentVerification() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('pending');
  const [searchTerm, setSearchTerm] = useState('');
  const [verificationModal, setVerificationModal] = useState(false);
  const [verificationAction, setVerificationAction] = useState<'approve' | 'reject' | null>(null);
  const [verificationNotes, setVerificationNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<any>(null);

  useEffect(() => {
    fetchDocuments();
  }, [filterType, filterStatus]);

  const fetchDocuments = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/documents?type=${filterType}&status=${filterStatus}`);
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Failed to fetch documents:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'insurance': return <Shield className="h-4 w-4" />;
      case 'license': return <Award className="h-4 w-4" />;
      case 'certification': return <FileCheck className="h-4 w-4" />;
      case 'abn': return <Building className="h-4 w-4" />;
      case 'identification': return <Camera className="h-4 w-4" />;
      case 'bank': return <CreditCard className="h-4 w-4" />;
      case 'agreement': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'under_review': return 'bg-blue-100 text-blue-800';
      case 'expired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleVerification = async () => {
    if (!selectedDocument || !verificationAction) return;

    try {
      const response = await fetch(`/api/admin/documents/${selectedDocument.id}/verify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: verificationAction,
          notes: verificationNotes,
          rejectionReason: verificationAction === 'reject' ? rejectionReason : undefined,
          verifiedBy: 'admin_id' // Replace with actual admin ID
        })
      });

      if (response.ok) {
        fetchDocuments();
        setVerificationModal(false);
        setSelectedDocument(null);
        setVerificationNotes('');
        setRejectionReason('');
        setVerificationAction(null);
      }
    } catch (error) {
      console.error('Failed to verify document:', error);
    }
  };

  const runAIAnalysis = async (document: Document) => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/documents/${document.id}/analyze`, {
        method: 'POST'
      });
      const data = await response.json();
      setAiSuggestions(data);
    } catch (error) {
      console.error('Failed to run AI analysis:', error);
    } finally {
      setLoading(false);
    }
  };

  const openVerificationModal = (doc: Document, action: 'approve' | 'reject') => {
    setSelectedDocument(doc);
    setVerificationAction(action);
    setVerificationModal(true);
    if (doc.metadata?.aiAnalyzed) {
      runAIAnalysis(doc);
    }
  };

  const filteredDocuments = documents.filter(doc =>
    (filterType === 'all' || doc.type === filterType) &&
    (filterStatus === 'all' || doc.status === filterStatus) &&
    (searchTerm === '' || 
     doc.contractorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doc.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doc.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const priorityQueue: VerificationQueue[] = [
    {
      priority: 'urgent',
      documents: filteredDocuments.filter(d => d.expiryDate && 
        new Date(d.expiryDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)),
      count: 0
    },
    {
      priority: 'high',
      documents: filteredDocuments.filter(d => d.type === 'insurance' || d.type === 'license'),
      count: 0
    },
    {
      priority: 'normal',
      documents: filteredDocuments.filter(d => d.type === 'certification' || d.type === 'abn'),
      count: 0
    },
    {
      priority: 'low',
      documents: filteredDocuments.filter(d => d.type === 'identification' || d.type === 'bank'),
      count: 0
    }
  ];

  priorityQueue.forEach(queue => {
    queue.count = queue.documents.filter(d => d.status === 'pending').length;
  });

  return (
    <div className="space-y-6">
      {/* Header with filters */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Document Verification</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Document Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="insurance">Insurance</SelectItem>
              <SelectItem value="license">License</SelectItem>
              <SelectItem value="certification">Certification</SelectItem>
              <SelectItem value="abn">ABN</SelectItem>
              <SelectItem value="identification">ID</SelectItem>
              <SelectItem value="bank">Bank Details</SelectItem>
              <SelectItem value="agreement">Agreement</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="under_review">Under Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="expired">Expired</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchDocuments}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Priority Queue Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {priorityQueue.map(queue => (
          <Card 
            key={queue.priority}
            className={queue.priority === 'urgent' && queue.count > 0 ? 'border-red-200' : ''}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                <span className="capitalize">{queue.priority} Priority</span>
                <Badge variant={queue.priority === 'urgent' ? 'destructive' : 'secondary'}>
                  {queue.count}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600">
                {queue.priority === 'urgent' && 'Expiring within 7 days'}
                {queue.priority === 'high' && 'Insurance & Licenses'}
                {queue.priority === 'normal' && 'Certifications & ABN'}
                {queue.priority === 'low' && 'ID & Bank Details'}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* AI-Powered Alerts */}
      {filterStatus === 'pending' && (
        <Alert className="bg-blue-50 border-blue-200">
          <AlertCircle className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            <strong>AI Assistant:</strong> 12 documents have been pre-analyzed. Documents with potential 
            issues are flagged for priority review.
          </AlertDescription>
        </Alert>
      )}

      {/* Documents Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-sm">Document</th>
                  <th className="text-left p-4 font-medium text-sm">Contractor</th>
                  <th className="text-left p-4 font-medium text-sm">Type</th>
                  <th className="text-left p-4 font-medium text-sm">Status</th>
                  <th className="text-left p-4 font-medium text-sm">Uploaded</th>
                  <th className="text-left p-4 font-medium text-sm">Expiry</th>
                  <th className="text-left p-4 font-medium text-sm">AI Analysis</th>
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
                ) : filteredDocuments.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center p-8 text-gray-500">
                      No documents found matching your criteria
                    </td>
                  </tr>
                ) : (
                  filteredDocuments.map(doc => (
                    <tr key={doc.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          {getDocumentIcon(doc.type)}
                          <div>
                            <p className="font-medium text-sm">{doc.name}</p>
                            {doc.metadata?.fileSize && (
                              <p className="text-xs text-gray-500">{doc.metadata.fileSize}</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="font-medium text-sm">{doc.contractorName}</p>
                        <p className="text-xs text-gray-600">{doc.companyName}</p>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline" className="capitalize">
                          {doc.type}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge className={getStatusColor(doc.status)}>
                          {doc.status.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <p className="text-sm text-gray-600">
                          {new Date(doc.uploadedAt).toLocaleDateString()}
                        </p>
                      </td>
                      <td className="p-4">
                        {doc.expiryDate ? (
                          <div>
                            <p className="text-sm text-gray-600">
                              {new Date(doc.expiryDate).toLocaleDateString()}
                            </p>
                            {new Date(doc.expiryDate) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) && (
                              <Badge variant="destructive" className="mt-1 text-xs">
                                Expiring Soon
                              </Badge>
                            )}
                          </div>
                        ) : (
                          <span className="text-sm text-gray-400">N/A</span>
                        )}
                      </td>
                      <td className="p-4">
                        {doc.metadata?.aiAnalyzed ? (
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Analyzed
                          </Badge>
                        ) : (
                          <Badge variant="outline">
                            Pending
                          </Badge>
                        )}
                      </td>
                      <td className="p-4">
                        <div className="flex gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedDocument(doc)}
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                          >
                            <Download className="h-4 w-4" />
                          </Button>
                          {doc.status === 'pending' && (
                            <>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-600"
                                onClick={() => openVerificationModal(doc, 'approve')}
                              >
                                <CheckCircle className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-600"
                                onClick={() => openVerificationModal(doc, 'reject')}
                              >
                                <XCircle className="h-4 w-4" />
                              </Button>
                            </>
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

      {/* Verification Modal */}
      <Dialog open={verificationModal} onOpenChange={setVerificationModal}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {verificationAction === 'approve' && 'Approve Document'}
              {verificationAction === 'reject' && 'Reject Document'}
            </DialogTitle>
          </DialogHeader>

          {selectedDocument && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm text-gray-600">Document</Label>
                  <p className="font-medium">{selectedDocument.name}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Type</Label>
                  <p className="font-medium capitalize">{selectedDocument.type}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Contractor</Label>
                  <p className="font-medium">{selectedDocument.contractorName}</p>
                </div>
                <div>
                  <Label className="text-sm text-gray-600">Company</Label>
                  <p className="font-medium">{selectedDocument.companyName}</p>
                </div>
              </div>

              {/* AI Suggestions */}
              {aiSuggestions && (
                <Alert className="bg-blue-50 border-blue-200">
                  <AlertCircle className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    <strong>AI Analysis:</strong>
                    <ul className="list-disc list-inside mt-2 space-y-1">
                      {aiSuggestions.checks?.map((check: any, index: number) => (
                        <li key={index} className="text-sm">
                          {check.passed ? '✅' : '⚠️'} {check.description}
                        </li>
                      ))}
                    </ul>
                    {aiSuggestions.confidence && (
                      <p className="mt-2 text-sm">
                        Confidence: {(aiSuggestions.confidence * 100).toFixed(1)}%
                      </p>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {/* Document Preview */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Document Preview</span>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    View Full Document
                  </Button>
                </div>
                <div className="h-64 bg-white rounded border flex items-center justify-center text-gray-400">
                  Document preview would appear here
                </div>
              </div>

              {/* Verification Notes */}
              <div>
                <Label htmlFor="verification-notes">Verification Notes</Label>
                <Textarea
                  id="verification-notes"
                  placeholder="Add notes about this verification..."
                  value={verificationNotes}
                  onChange={(e) => setVerificationNotes(e.target.value)}
                  rows={3}
                  className="mt-2"
                />
              </div>

              {/* Rejection Reason */}
              {verificationAction === 'reject' && (
                <div>
                  <Label htmlFor="rejection-reason">Rejection Reason *</Label>
                  <Select value={rejectionReason} onValueChange={setRejectionReason}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select a reason" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="expired">Document Expired</SelectItem>
                      <SelectItem value="invalid">Invalid Document</SelectItem>
                      <SelectItem value="illegible">Document Illegible</SelectItem>
                      <SelectItem value="mismatch">Information Mismatch</SelectItem>
                      <SelectItem value="incomplete">Incomplete Document</SelectItem>
                      <SelectItem value="fraudulent">Suspected Fraud</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {verificationAction === 'approve' && (
                <Alert className="bg-green-50 border-green-200">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">
                    Approving this document will update the contractor's compliance status.
                  </AlertDescription>
                </Alert>
              )}

              {verificationAction === 'reject' && (
                <Alert className="bg-red-50 border-red-200">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">
                    Rejecting this document will require the contractor to resubmit.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setVerificationModal(false)}>
              Cancel
            </Button>
            <Button
              onClick={handleVerification}
              disabled={verificationAction === 'reject' && !rejectionReason}
              className={
                verificationAction === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                verificationAction === 'reject' ? 'bg-red-600 hover:bg-red-700' :
                ''
              }
            >
              {verificationAction === 'approve' && 'Approve Document'}
              {verificationAction === 'reject' && 'Reject Document'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Document Details Panel */}
      {selectedDocument && !verificationModal && (
        <Card>
          <CardHeader>
            <CardTitle>Document Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="details">
              <TabsList>
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="history">History</TabsTrigger>
                <TabsTrigger value="metadata">Metadata</TabsTrigger>
              </TabsList>

              <TabsContent value="details" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">Document Name</Label>
                    <p className="font-medium">{selectedDocument.name}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Status</Label>
                    <Badge className={getStatusColor(selectedDocument.status)}>
                      {selectedDocument.status}
                    </Badge>
                  </div>
                  {selectedDocument.verifiedBy && (
                    <>
                      <div>
                        <Label className="text-sm text-gray-600">Verified By</Label>
                        <p className="font-medium">{selectedDocument.verifiedBy}</p>
                      </div>
                      <div>
                        <Label className="text-sm text-gray-600">Verified At</Label>
                        <p className="font-medium">
                          {new Date(selectedDocument.verifiedAt!).toLocaleString()}
                        </p>
                      </div>
                    </>
                  )}
                  {selectedDocument.rejectionReason && (
                    <div className="col-span-2">
                      <Label className="text-sm text-gray-600">Rejection Reason</Label>
                      <p className="font-medium text-red-600">{selectedDocument.rejectionReason}</p>
                    </div>
                  )}
                </div>
              </TabsContent>

              <TabsContent value="history" className="space-y-4">
                {/* Document history timeline */}
              </TabsContent>

              <TabsContent value="metadata" className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">File Size</Label>
                    <p className="font-medium">{selectedDocument.metadata?.fileSize || 'Unknown'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">Checksum</Label>
                    <p className="font-mono text-xs">{selectedDocument.metadata?.checksum || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">OCR Extracted</Label>
                    <p className="font-medium">
                      {selectedDocument.metadata?.ocrExtracted ? 'Yes' : 'No'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm text-gray-600">AI Analyzed</Label>
                    <p className="font-medium">
                      {selectedDocument.metadata?.aiAnalyzed ? 'Yes' : 'No'}
                    </p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
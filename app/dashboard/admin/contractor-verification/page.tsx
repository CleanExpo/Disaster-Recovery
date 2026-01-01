'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Loader2,
  CheckCircle2,
  XCircle,
  Clock,
  FileText,
  AlertCircle,
  ExternalLink,
  Shield,
  Calendar,
  MapPin,
  Briefcase,
} from 'lucide-react';

interface PendingContractor {
  id: string;
  userId: string;
  businessName: string;
  abnNumber: string | null;
  acnNumber: string | null;
  nrpgMemberId: string | null;
  nrpgVerificationLevel: string | null;
  primaryState: string | null;
  operatingStates: string[];
  australianSpecialties: string[];
  publicLiabilityPolicyNumber: string | null;
  publicLiabilityExpiryDate: string | null;
  publicLiabilityCertificateUrl: string | null;
  createdAt: string;
  iicrcCertifications: Array<{
    id: string;
    certificationLevel: string;
    certificationCode: string;
    certificationDate: string;
    expiryDate: string;
    certificatePdfUrl: string | null;
    isActive: boolean;
  }>;
  serviceAreas: Array<{
    postcode: string;
    state: string;
  }>;
}

interface VerificationStats {
  pending: number;
  approved: number;
  rejected: number;
  avgWaitTimeHours: number;
}

export default function AdminContractorVerificationPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [pendingContractors, setPendingContractors] = useState<PendingContractor[]>([]);
  const [stats, setStats] = useState<VerificationStats>({
    pending: 0,
    approved: 0,
    rejected: 0,
    avgWaitTimeHours: 0,
  });
  const [selectedContractor, setSelectedContractor] = useState<PendingContractor | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | 'request-info' | null>(null);
  const [actionReason, setActionReason] = useState('');
  const [actionLoading, setActionLoading] = useState(false);
  const [filterState, setFilterState] = useState<string>('all');

  useEffect(() => {
    if (status === 'authenticated') {
      fetchPendingContractors();
    } else if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  const fetchPendingContractors = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin/contractor-verification/pending', {
        cache: 'no-store',
      });

      if (response.ok) {
        const data = await response.json();
        setPendingContractors(data.contractors || []);
        setStats(data.stats || { pending: 0, approved: 0, rejected: 0, avgWaitTimeHours: 0 });
      }
    } catch (error) {
      console.error('Error fetching pending contractors:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!selectedContractor || !actionType) return;

    try {
      setActionLoading(true);
      const response = await fetch('/api/admin/contractor-verification/action', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contractorId: selectedContractor.id,
          action: actionType,
          reason: actionReason,
        }),
      });

      if (response.ok) {
        await fetchPendingContractors();
        setSelectedContractor(null);
        setActionType(null);
        setActionReason('');
      } else {
        const error = await response.json();
        alert(error.message || 'Action failed');
      }
    } catch (error) {
      console.error('Error performing action:', error);
      alert('Failed to perform action');
    } finally {
      setActionLoading(false);
    }
  };

  const getExpiryStatus = (expiryDate: string | null) => {
    if (!expiryDate) return { status: 'unknown', label: 'No expiry date', color: 'gray' };

    const expiry = new Date(expiryDate);
    const now = new Date();
    const daysUntilExpiry = Math.floor((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (daysUntilExpiry < 0) {
      return { status: 'expired', label: 'Expired', color: 'red' };
    } else if (daysUntilExpiry <= 30) {
      return { status: 'expiring', label: `Expires in ${daysUntilExpiry} days`, color: 'amber' };
    } else {
      return { status: 'valid', label: `Valid (${daysUntilExpiry} days)`, color: 'green' };
    }
  };

  const filteredContractors = filterState === 'all'
    ? pendingContractors
    : pendingContractors.filter(c => c.operatingStates.includes(filterState));

  if (status === 'loading' || loading) {
    return (
      <div className="container mx-auto py-8 max-w-7xl">
        <Card>
          <CardContent className="py-12 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Shield className="h-8 w-8 text-primary" />
          Contractor Verification Queue
        </h1>
        <p className="text-muted-foreground mt-1">
          Review and verify contractor registrations for NRPG compliance
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Pending Review</p>
                <p className="text-2xl font-bold">{stats.pending}</p>
              </div>
              <Clock className="h-8 w-8 text-amber-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Approved</p>
                <p className="text-2xl font-bold text-green-600">{stats.approved}</p>
              </div>
              <CheckCircle2 className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Rejected</p>
                <p className="text-2xl font-bold text-red-600">{stats.rejected}</p>
              </div>
              <XCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg Wait Time</p>
                <p className="text-2xl font-bold">{Math.round(stats.avgWaitTimeHours)}h</p>
              </div>
              <Clock className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter by State</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            <Button
              variant={filterState === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterState('all')}
            >
              All States ({pendingContractors.length})
            </Button>
            {['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'].map((state) => {
              const count = pendingContractors.filter(c => c.operatingStates.includes(state)).length;
              return (
                <Button
                  key={state}
                  variant={filterState === state ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setFilterState(state)}
                >
                  {state} ({count})
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Pending Contractors List */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Contractors ({filteredContractors.length})</CardTitle>
          <CardDescription>
            Review contractor details, documents, and credentials before approval
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredContractors.length === 0 ? (
            <div className="text-center py-12">
              <CheckCircle2 className="h-12 w-12 text-green-500 mx-auto mb-4" />
              <p className="text-lg font-medium">All caught up!</p>
              <p className="text-sm text-muted-foreground">No pending contractor verifications</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredContractors.map((contractor) => {
                const iicrcExpiry = contractor.iicrcCertifications[0]
                  ? getExpiryStatus(contractor.iicrcCertifications[0].expiryDate)
                  : null;
                const insuranceExpiry = getExpiryStatus(contractor.publicLiabilityExpiryDate);
                const waitTime = Math.round(
                  (new Date().getTime() - new Date(contractor.createdAt).getTime()) / (1000 * 60 * 60)
                );

                return (
                  <Card key={contractor.id} className="border-l-4 border-l-amber-500">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-3">
                          {/* Header */}
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="text-lg font-semibold">{contractor.businessName}</h3>
                              <div className="flex items-center gap-2 mt-1">
                                <Badge variant="outline">{contractor.nrpgMemberId}</Badge>
                                <Badge variant="secondary" className="text-xs">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Waiting {waitTime}h
                                </Badge>
                              </div>
                            </div>
                            <Button onClick={() => setSelectedContractor(contractor)}>
                              Review Details
                            </Button>
                          </div>

                          {/* Business Info */}
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                            {contractor.abnNumber && (
                              <div>
                                <p className="text-muted-foreground">ABN</p>
                                <p className="font-medium">{contractor.abnNumber}</p>
                              </div>
                            )}
                            {contractor.acnNumber && (
                              <div>
                                <p className="text-muted-foreground">ACN</p>
                                <p className="font-medium">{contractor.acnNumber}</p>
                              </div>
                            )}
                            <div>
                              <p className="text-muted-foreground">Primary State</p>
                              <p className="font-medium">{contractor.primaryState || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Specialties</p>
                              <p className="font-medium">{contractor.australianSpecialties.length}</p>
                            </div>
                          </div>

                          {/* Certifications Status */}
                          <div className="flex flex-wrap gap-2">
                            {iicrcExpiry && (
                              <Badge
                                variant="outline"
                                className={
                                  iicrcExpiry.status === 'valid'
                                    ? 'border-green-500 text-green-700'
                                    : iicrcExpiry.status === 'expiring'
                                    ? 'border-amber-500 text-amber-700'
                                    : 'border-red-500 text-red-700'
                                }
                              >
                                IICRC: {iicrcExpiry.label}
                              </Badge>
                            )}
                            <Badge
                              variant="outline"
                              className={
                                insuranceExpiry.status === 'valid'
                                  ? 'border-green-500 text-green-700'
                                  : insuranceExpiry.status === 'expiring'
                                  ? 'border-amber-500 text-amber-700'
                                  : 'border-red-500 text-red-700'
                              }
                            >
                              Insurance: {insuranceExpiry.label}
                            </Badge>
                            <Badge variant="outline">
                              {contractor.serviceAreas.length} Service Areas
                            </Badge>
                          </div>

                          {/* Quick Actions */}
                          <div className="flex gap-2 pt-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-green-600 border-green-600 hover:bg-green-50"
                              onClick={() => {
                                setSelectedContractor(contractor);
                                setActionType('approve');
                              }}
                            >
                              <CheckCircle2 className="h-4 w-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => {
                                setSelectedContractor(contractor);
                                setActionType('reject');
                              }}
                            >
                              <XCircle className="h-4 w-4 mr-1" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              className="text-blue-600 border-blue-600 hover:bg-blue-50"
                              onClick={() => {
                                setSelectedContractor(contractor);
                                setActionType('request-info');
                              }}
                            >
                              <AlertCircle className="h-4 w-4 mr-1" />
                              Request Info
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Contractor Details Dialog */}
      <Dialog open={selectedContractor !== null && actionType === null} onOpenChange={(open) => !open && setSelectedContractor(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedContractor && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedContractor.businessName}</DialogTitle>
                <DialogDescription>
                  Review all details before approving or rejecting this contractor
                </DialogDescription>
              </DialogHeader>

              <Tabs defaultValue="business" className="mt-4">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="business">Business</TabsTrigger>
                  <TabsTrigger value="certifications">Certifications</TabsTrigger>
                  <TabsTrigger value="insurance">Insurance</TabsTrigger>
                  <TabsTrigger value="service">Service Areas</TabsTrigger>
                </TabsList>

                <TabsContent value="business" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Business Name</Label>
                      <p className="text-sm font-medium mt-1">{selectedContractor.businessName}</p>
                    </div>
                    <div>
                      <Label>NRPG Member ID</Label>
                      <p className="text-sm font-medium mt-1">{selectedContractor.nrpgMemberId}</p>
                    </div>
                    {selectedContractor.abnNumber && (
                      <div>
                        <Label>ABN</Label>
                        <p className="text-sm font-medium mt-1">{selectedContractor.abnNumber}</p>
                      </div>
                    )}
                    {selectedContractor.acnNumber && (
                      <div>
                        <Label>ACN</Label>
                        <p className="text-sm font-medium mt-1">{selectedContractor.acnNumber}</p>
                      </div>
                    )}
                    <div>
                      <Label>Primary State</Label>
                      <p className="text-sm font-medium mt-1">{selectedContractor.primaryState}</p>
                    </div>
                    <div>
                      <Label>Operating States</Label>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {selectedContractor.operatingStates.map(state => (
                          <Badge key={state} variant="secondary" className="text-xs">
                            {state}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label>Specialties</Label>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {selectedContractor.australianSpecialties.map(specialty => (
                        <Badge key={specialty} variant="outline">
                          {specialty.replace(/_/g, ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="certifications" className="space-y-4 mt-4">
                  {selectedContractor.iicrcCertifications.map(cert => {
                    const expiry = getExpiryStatus(cert.expiryDate);
                    return (
                      <Card key={cert.id}>
                        <CardContent className="pt-6 space-y-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="font-semibold">{cert.certificationLevel} Certification</h4>
                              <p className="text-sm text-muted-foreground">Code: {cert.certificationCode}</p>
                            </div>
                            <Badge
                              variant={expiry.status === 'valid' ? 'default' : 'destructive'}
                              className={expiry.status === 'expiring' ? 'bg-amber-500' : ''}
                            >
                              {expiry.label}
                            </Badge>
                          </div>

                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div>
                              <p className="text-muted-foreground">Certification Date</p>
                              <p className="font-medium">
                                {new Date(cert.certificationDate).toLocaleDateString()}
                              </p>
                            </div>
                            <div>
                              <p className="text-muted-foreground">Expiry Date</p>
                              <p className="font-medium">
                                {new Date(cert.expiryDate).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          {cert.certificatePdfUrl && (
                            <Button
                              variant="outline"
                              size="sm"
                              asChild
                            >
                              <a
                                href={cert.certificatePdfUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <FileText className="h-4 w-4 mr-2" />
                                View Certificate
                                <ExternalLink className="h-3 w-3 ml-1" />
                              </a>
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </TabsContent>

                <TabsContent value="insurance" className="space-y-4 mt-4">
                  <Card>
                    <CardContent className="pt-6 space-y-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">Public Liability Insurance</h4>
                          <p className="text-sm text-muted-foreground">
                            Policy: {selectedContractor.publicLiabilityPolicyNumber}
                          </p>
                        </div>
                        <Badge
                          variant={insuranceExpiry.status === 'valid' ? 'default' : 'destructive'}
                          className={insuranceExpiry.status === 'expiring' ? 'bg-amber-500' : ''}
                        >
                          {insuranceExpiry.label}
                        </Badge>
                      </div>

                      <div>
                        <Label>Expiry Date</Label>
                        <p className="text-sm font-medium mt-1">
                          {selectedContractor.publicLiabilityExpiryDate
                            ? new Date(selectedContractor.publicLiabilityExpiryDate).toLocaleDateString()
                            : 'Not provided'}
                        </p>
                      </div>

                      {selectedContractor.publicLiabilityCertificateUrl && (
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                        >
                          <a
                            href={selectedContractor.publicLiabilityCertificateUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            View Insurance COI
                            <ExternalLink className="h-3 w-3 ml-1" />
                          </a>
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="service" className="space-y-4 mt-4">
                  <div>
                    <h4 className="font-semibold mb-3">Service Postcodes ({selectedContractor.serviceAreas.length})</h4>
                    <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                      {selectedContractor.serviceAreas.map((area, idx) => (
                        <Badge key={idx} variant="outline">
                          {area.postcode} ({area.state})
                        </Badge>
                      ))}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <DialogFooter className="flex gap-2 mt-6">
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                  onClick={() => setActionType('request-info')}
                >
                  <AlertCircle className="h-4 w-4 mr-2" />
                  Request More Info
                </Button>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-600"
                  onClick={() => setActionType('reject')}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setActionType('approve')}
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Approve Contractor
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Action Confirmation Dialog */}
      <Dialog open={actionType !== null} onOpenChange={(open) => !open && setActionType(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'approve' && 'Approve Contractor'}
              {actionType === 'reject' && 'Reject Contractor'}
              {actionType === 'request-info' && 'Request More Information'}
            </DialogTitle>
            <DialogDescription>
              {actionType === 'approve' && 'This contractor will be marked as verified and can accept jobs'}
              {actionType === 'reject' && 'This contractor will be notified of the rejection'}
              {actionType === 'request-info' && 'The contractor will be asked to provide additional information'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 my-4">
            <div>
              <Label htmlFor="reason">
                {actionType === 'approve' ? 'Notes (optional)' : 'Reason (required)'}
              </Label>
              <Textarea
                id="reason"
                placeholder={
                  actionType === 'approve'
                    ? 'Internal notes for approval...'
                    : actionType === 'reject'
                    ? 'Explain why this application is being rejected...'
                    : 'Specify what additional information is needed...'
                }
                value={actionReason}
                onChange={(e) => setActionReason(e.target.value)}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setActionType(null)} disabled={actionLoading}>
              Cancel
            </Button>
            <Button
              onClick={handleAction}
              disabled={actionLoading || (actionType !== 'approve' && !actionReason.trim())}
              className={
                actionType === 'approve'
                  ? 'bg-green-600 hover:bg-green-700'
                  : actionType === 'reject'
                  ? 'bg-red-600 hover:bg-red-700'
                  : 'bg-blue-600 hover:bg-blue-700'
              }
            >
              {actionLoading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  {actionType === 'approve' && 'Approve'}
                  {actionType === 'reject' && 'Reject'}
                  {actionType === 'request-info' && 'Send Request'}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

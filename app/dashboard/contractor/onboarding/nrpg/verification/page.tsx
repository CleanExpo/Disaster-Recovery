'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import {
  Loader2,
  ArrowLeft,
  Shield,
  CheckCircle2,
  Clock,
  XCircle,
  AlertCircle,
  ExternalLink,
  RefreshCw,
  FileText,
  Building2,
  Banknote,
  ShieldCheck,
} from 'lucide-react';

type CheckStatus = 'NOT_INITIATED' | 'PENDING' | 'IN_PROGRESS' | 'PASS' | 'FAIL' | 'EXPIRED';

interface VerificationData {
  criminal: {
    status: CheckStatus;
    initiatedAt: string | null;
    completedAt: string | null;
    expiresAt: string | null;
    referenceId: string | null;
  };
  financial: {
    status: CheckStatus;
    initiatedAt: string | null;
    completedAt: string | null;
    expiresAt: string | null;
    referenceId: string | null;
  };
  professional: {
    status: CheckStatus;
    initiatedAt: string | null;
    completedAt: string | null;
    expiresAt: string | null;
    referenceId: string | null;
  };
  insurance: {
    status: CheckStatus;
    initiatedAt: string | null;
    completedAt: string | null;
    expiresAt: string | null;
    referenceId: string | null;
  };
  overall: {
    allPassed: boolean;
    completedCount: number;
    totalRequired: number;
  };
}

const CHECK_INFO = {
  criminal: {
    title: 'Criminal History Check',
    description: 'National police check for criminal record verification',
    icon: Shield,
    colour: '#EF4444',
    provider: 'National Crime Check',
  },
  financial: {
    title: 'Financial Background Check',
    description: 'Credit history and bankruptcy verification',
    icon: Banknote,
    colour: '#F59E0B',
    provider: 'Equifax Australia',
  },
  professional: {
    title: 'Professional Reference Check',
    description: 'Employment history and professional reference verification',
    icon: Building2,
    colour: '#3B82F6',
    provider: 'Reference Check Australia',
  },
  insurance: {
    title: 'Insurance Verification',
    description: 'Public liability and professional indemnity insurance verification',
    icon: ShieldCheck,
    colour: '#10B981',
    provider: 'Insurance Verification Service',
  },
};

export default function VerificationPage() {
  const { data: session, status: authStatus } = useSession();
  const [loading, setLoading] = useState(true);
  const [initiating, setInitiating] = useState<string | null>(null);
  const [verification, setVerification] = useState<VerificationData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchVerification = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/onboarding/nrpg/verification');
      const data = await res.json();

      if (data.success) {
        setVerification(data.data);
      } else {
        setError(data.error || 'Failed to load verification status');
      }
    } catch (err) {
      console.error('Error fetching verification:', err);
      setError('Failed to load verification status');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      fetchVerification();
    }
  }, [authStatus, fetchVerification]);

  const initiateCheck = async (checkType: string) => {
    setInitiating(checkType);
    try {
      const res = await fetch('/api/onboarding/nrpg/verification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ checkType }),
      });

      const data = await res.json();

      if (data.success) {
        // Refresh data
        await fetchVerification();
      } else {
        setError(data.error || 'Failed to initiate check');
      }
    } catch (err) {
      console.error('Error initiating check:', err);
      setError('Failed to initiate background check');
    } finally {
      setInitiating(null);
    }
  };

  const getStatusBadge = (status: CheckStatus) => {
    switch (status) {
      case 'PASS':
        return (
          <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
            <CheckCircle2 className="h-3 w-3 mr-1" />
            Verified
          </Badge>
        );
      case 'IN_PROGRESS':
        return (
          <Badge className="bg-blue-500/10 text-blue-400 border-blue-500/20">
            <Loader2 className="h-3 w-3 mr-1 animate-spin" />
            Processing
          </Badge>
        );
      case 'PENDING':
        return (
          <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case 'FAIL':
        return (
          <Badge className="bg-red-500/10 text-red-400 border-red-500/20">
            <XCircle className="h-3 w-3 mr-1" />
            Failed
          </Badge>
        );
      case 'EXPIRED':
        return (
          <Badge className="bg-orange-500/10 text-orange-400 border-orange-500/20">
            <AlertCircle className="h-3 w-3 mr-1" />
            Expired
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-700 text-gray-400 border-gray-600">
            Not Started
          </Badge>
        );
    }
  };

  if (authStatus === 'loading' || loading) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="py-12 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#00BFA6]" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="py-12 text-center">
            <p className="text-gray-400 mb-4">Please sign in to view verification status</p>
            <Button className="bg-[#00BFA6] hover:bg-[#00A693]">Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/contractor/onboarding/nrpg"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to NRPG Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-2">
              <Shield className="h-6 w-6 text-amber-500" />
              Background Verification
            </h1>
            <p className="text-gray-400">
              Complete all required background checks to proceed with onboarding
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={fetchVerification}
            className="border-gray-600 text-gray-300"
          >
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh Status
          </Button>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6 bg-red-500/10 border-red-500/20">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Overall Progress */}
      {verification && (
        <Card className="bg-gray-800 border-gray-700 mb-6">
          <CardContent className="py-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-semibold text-white">Verification Progress</h2>
                <p className="text-sm text-gray-400">
                  {verification.overall.completedCount} of {verification.overall.totalRequired} checks completed
                </p>
              </div>
              <div className="text-right">
                {verification.overall.allPassed ? (
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20 text-sm">
                    <CheckCircle2 className="h-4 w-4 mr-1" />
                    All Verified
                  </Badge>
                ) : (
                  <Badge className="bg-amber-500/10 text-amber-400 border-amber-500/20 text-sm">
                    <Clock className="h-4 w-4 mr-1" />
                    In Progress
                  </Badge>
                )}
              </div>
            </div>
            <div className="mt-4 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                style={{
                  width: `${(verification.overall.completedCount / verification.overall.totalRequired) * 100}%`,
                }}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Check Cards */}
      <div className="space-y-4">
        {verification &&
          Object.entries(CHECK_INFO).map(([key, info]) => {
            const checkData = verification[key as keyof typeof CHECK_INFO];
            const Icon = info.icon;
            const isProcessing = checkData.status === 'IN_PROGRESS' || checkData.status === 'PENDING';
            const canInitiate = checkData.status === 'NOT_INITIATED' || checkData.status === 'EXPIRED';

            return (
              <Card key={key} className="bg-gray-800 border-gray-700">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className="p-3 rounded-xl flex-shrink-0"
                      style={{ backgroundColor: `${info.colour}20` }}
                    >
                      <Icon className="h-6 w-6" style={{ color: info.colour }} />
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="text-lg font-semibold text-white">{info.title}</h3>
                          <p className="text-sm text-gray-400 mt-0.5">{info.description}</p>
                        </div>
                        {getStatusBadge(checkData.status)}
                      </div>

                      {/* Details */}
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-500">Provider:</span>
                          <span className="text-gray-300 ml-2">{info.provider}</span>
                        </div>
                        {checkData.referenceId && (
                          <div>
                            <span className="text-gray-500">Reference:</span>
                            <span className="text-gray-300 ml-2 font-mono text-xs">
                              {checkData.referenceId}
                            </span>
                          </div>
                        )}
                        {checkData.initiatedAt && (
                          <div>
                            <span className="text-gray-500">Initiated:</span>
                            <span className="text-gray-300 ml-2">
                              {new Date(checkData.initiatedAt).toLocaleDateString('en-AU')}
                            </span>
                          </div>
                        )}
                        {checkData.expiresAt && checkData.status === 'PASS' && (
                          <div>
                            <span className="text-gray-500">Valid until:</span>
                            <span className="text-gray-300 ml-2">
                              {new Date(checkData.expiresAt).toLocaleDateString('en-AU')}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-4 flex items-center gap-3">
                        {canInitiate && (
                          <Button
                            onClick={() => initiateCheck(key)}
                            disabled={initiating === key}
                            className="bg-[#00BFA6] hover:bg-[#00A693]"
                          >
                            {initiating === key ? (
                              <>
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                                Initiating...
                              </>
                            ) : (
                              <>
                                <ExternalLink className="h-4 w-4 mr-2" />
                                Start Verification
                              </>
                            )}
                          </Button>
                        )}
                        {checkData.status === 'PASS' && (
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-gray-600 text-gray-300"
                          >
                            <FileText className="h-4 w-4 mr-2" />
                            View Certificate
                          </Button>
                        )}
                        {isProcessing && (
                          <p className="text-sm text-gray-400">
                            This check is being processed. You will be notified when complete.
                          </p>
                        )}
                        {checkData.status === 'FAIL' && (
                          <Alert variant="destructive\" className="mt-2 bg-red-500/10 border-red-500/20">
                            <AlertCircle className="h-4 w-4" />
                            <AlertDescription>
                              This check did not pass. Please contact support for assistance.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
      </div>

      {/* Info Card */}
      <Card className="bg-gray-800 border-gray-700 mt-6">
        <CardHeader>
          <CardTitle className="text-base text-white">About Background Verification</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-gray-400 space-y-2">
          <p>
            All background checks are processed by accredited external providers and typically take
            3-5 business days to complete.
          </p>
          <p>
            Your personal information is handled in accordance with Australian Privacy Principles.
            Results are only shared with authorised personnel.
          </p>
          <p>
            For questions or concerns about your verification, please contact{' '}
            <a href="mailto:support@disasterrecovery.com.au" className="text-[#00BFA6] hover:underline">
              support@disasterrecovery.com.au
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

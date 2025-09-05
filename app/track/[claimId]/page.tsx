'use client';

import { useState, useEffect, use } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { 
  CheckCircle2, 
  Clock, 
  Phone, 
  MapPin, 
  Calendar,
  User,
  AlertCircle,
  Shield,
  FileText,
  Truck,
  Home,
  DollarSign,
  ChevronRight
} from 'lucide-react';

interface ClaimData {
  id: string;
  status: string;
  createdAt: string;
  client: {
    fullName: string;
    phone: string;
    email: string;
  };
  property: {
    address: string;
    suburb: string;
    state: string;
    postcode: string;
  };
  damage: {
    types: string[];
    urgencyLevel: string;
    description: string;
  };
  contractor: {
    companyName: string | null;
    contactPerson: string | null;
    directPhone: string | null;
    assignedAt: string | null;
    acceptedAt: string | null;
  };
  workflow: {
    paymentProcessed: boolean;
    contractorAssigned: boolean;
    contractorAccepted: boolean;
    initialContactMade: boolean;
    jobScheduled: boolean;
    makeSafeCompleted: boolean;
    documentationProvided: boolean;
    claimFinalized: boolean;
  };
}

const workflowSteps = [
  { key: 'paymentProcessed', label: 'Payment Processed', icon: DollarSign },
  { key: 'contractorAssigned', label: 'Contractor Assigned', icon: User },
  { key: 'contractorAccepted', label: 'Job Accepted', icon: CheckCircle2 },
  { key: 'initialContactMade', label: 'Contact Made', icon: Phone },
  { key: 'jobScheduled', label: 'Job Scheduled', icon: Calendar },
  { key: 'makeSafeCompleted', label: 'Make-Safe Done', icon: Shield },
  { key: 'documentationProvided', label: 'Documentation', icon: FileText },
  { key: 'claimFinalized', label: 'Claim Complete', icon: Home }
];

export default function TrackClaimPage({ params }: { params: Promise<{ claimId: string }> }) {
  const resolvedParams = use(params);
  const [claimData, setClaimData] = useState<ClaimData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeElapsed, setTimeElapsed] = useState('');

  useEffect(() => {
    fetchClaimData();
    const interval = setInterval(fetchClaimData, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [resolvedParams.claimId]);

  useEffect(() => {
    if (claimData) {
      const timer = setInterval(() => {
        const created = new Date(claimData.createdAt);
        const now = new Date();
        const diff = now.getTime() - created.getTime();
        const minutes = Math.floor(diff / 60000);
        const hours = Math.floor(minutes / 60);
        
        if (hours > 0) {
          setTimeElapsed(`${hours}h ${minutes % 60}m ago`);
        } else {
          setTimeElapsed(`${minutes}m ago`);
        }
      }, 60000);
      
      return () => clearInterval(timer);
    }
  }, [claimData]);

  const fetchClaimData = async () => {
    try {
      const response = await fetch(`/api/claims/submit?id=${resolvedParams.claimId}`);
      const result = await response.json();
      
      if (result.success) {
        setClaimData(result.claim);
      } else {
        // Mock data for demo
        setClaimData(createMockClaim(resolvedParams.claimId));
      }
    } catch (err) {
      // Use mock data for demo
      setClaimData(createMockClaim(resolvedParams.claimId));
    } finally {
      setLoading(false);
    }
  };

  const createMockClaim = (id: string): ClaimData => ({
    id: id,
    status: 'CONTRACTOR_ASSIGNED',
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(), // 15 minutes ago
    client: {
      fullName: 'John Smith',
      phone: '0412 345 678',
      email: 'john.smith@example.com'
    },
    property: {
      address: '123 Main Street',
      suburb: 'Brisbane',
      state: 'QLD',
      postcode: '4000'
    },
    damage: {
      types: ['Water/Flood Damage', 'Fire/Smoke Damage'],
      urgencyLevel: 'urgent',
      description: 'Significant water damage from burst pipe affecting multiple rooms.'
    },
    contractor: {
      companyName: 'Premium Restoration Services Pty Ltd',
      contactPerson: 'John Anderson',
      directPhone: '0412 987 654',
      assignedAt: new Date(Date.now() - 10 * 60000).toISOString(),
      acceptedAt: new Date(Date.now() - 5 * 60000).toISOString()
    },
    workflow: {
      paymentProcessed: true,
      contractorAssigned: true,
      contractorAccepted: true,
      initialContactMade: false,
      jobScheduled: false,
      makeSafeCompleted: false,
      documentationProvided: false,
      claimFinalized: false
    }
  });

  const getProgressPercentage = () => {
    if (!claimData) return 0;
    const completed = workflowSteps.filter(step => 
      claimData.workflow[step.key as keyof typeof claimData.workflow]
    ).length;
    return (completed / workflowSteps.length) * 100;
  };

  const getTimeUntilContact = () => {
    if (!claimData) return null;
    const created = new Date(claimData.createdAt);
    const deadline = new Date(created.getTime() + 60 * 60000); // 60 minutes
    const now = new Date();
    const remaining = deadline.getTime() - now.getTime();
    
    if (remaining <= 0 || claimData.workflow.initialContactMade) {
      return null;
    }
    
    const minutes = Math.floor(remaining / 60000);
    return minutes;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="py-12 text-center">
              <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4 animate-pulse" />
              <p className="text-gray-600">Loading claim details...</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!claimData) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card>
            <CardContent className="py-12 text-center">
              <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <p className="text-gray-600">Claim not found</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const timeRemaining = getTimeUntilContact();

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Track Your Claim</h1>
          <p className="text-gray-600">Claim ID: <strong>{claimData.id}</strong></p>
          <p className="text-sm text-gray-500">Submitted {timeElapsed}</p>
        </div>

        {/* 60-Minute Guarantee Alert */}
        {timeRemaining !== null && (
          <Alert className="mb-6 bg-orange-50 border-orange-200">
            <Clock className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>60-Minute Guarantee:</strong> Your contractor will call you within{' '}
              <strong className="text-red-600">{timeRemaining} minutes</strong>
            </AlertDescription>
          </Alert>
        )}

        {/* Progress Overview */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Claim Progress</CardTitle>
            <CardDescription>
              Tracking your claim from submission to completion
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{Math.round(getProgressPercentage())}%</span>
              </div>
              <Progress value={getProgressPercentage()} className="h-2" />
            </div>
            
            <div className="space-y-3">
              {workflowSteps.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = claimData.workflow[step.key as keyof typeof claimData.workflow];
                const isInProgress = index > 0 && 
                  claimData.workflow[workflowSteps[index - 1].key as keyof typeof claimData.workflow] &&
                  !isCompleted;
                
                return (
                  <div key={step.key} className="flex items-center gap-3">
                    <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      isCompleted ? 'bg-green-100 text-green-600' :
                      isInProgress ? 'bg-blue-100 text-blue-600 animate-pulse' :
                      'bg-gray-100 text-gray-400'
                    }`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-grow">
                      <p className={`font-medium ${
                        isCompleted ? 'text-green-700' :
                        isInProgress ? 'text-blue-700' :
                        'text-gray-500'
                      }`}>
                        {step.label}
                      </p>
                      {isInProgress && (
                        <p className="text-xs text-blue-600">In Progress...</p>
                      )}
                    </div>
                    {isCompleted && (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Contractor Details */}
        {claimData.contractor.companyName && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Your Assigned Contractor</CardTitle>
              <CardDescription>
                This contractor will handle all work and communication
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">
                  {claimData.contractor.companyName}
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-gray-500" />
                    <span>Contact: {claimData.contractor.contactPerson}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <span>Direct: {claimData.contractor.directPhone}</span>
                  </div>
                  {claimData.contractor.acceptedAt && (
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-green-600">Job Accepted</span>
                    </div>
                  )}
                </div>
              </div>
              
              <Alert>
                <Phone className="h-4 w-4" />
                <AlertDescription>
                  <strong>Important:</strong> Your contractor will call you directly within 60 minutes.
                  All future communication about your claim should be with them, not Disaster Recovery.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        )}

        {/* Property & Damage Summary */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Claim Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <Home className="h-4 w-4" />
                Property
              </h4>
              <p className="text-sm text-gray-600">
                {claimData.property.address}, {claimData.property.suburb} {claimData.property.state} {claimData.property.postcode}
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2 flex items-center gap-2">
                <AlertCircle className="h-4 w-4" />
                Damage Type
              </h4>
              <div className="flex flex-wrap gap-2">
                {claimData.damage.types.map((type, index) => (
                  <span key={index} className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm">
                    {type}
                  </span>
                ))}
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Urgency Level</h4>
              <span className={`px-3 py-1 rounded text-sm font-medium ${
                claimData.damage.urgencyLevel === 'emergency' ? 'bg-red-100 text-red-700' :
                claimData.damage.urgencyLevel === 'urgent' ? 'bg-orange-100 text-orange-700' :
                'bg-yellow-100 text-yellow-700'
              }`}>
                {claimData.damage.urgencyLevel.charAt(0).toUpperCase() + claimData.damage.urgencyLevel.slice(1)}
              </span>
            </div>
          </CardContent>
        </Card>

        {/* Platform Notice */}
        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Remember:</strong> Disaster Recovery is a lead generation platform. 
            Your assigned contractor handles all service delivery according to strict NRP standards. 
            The $2,750 platform fee has been processed for lead generation and contractor matching services.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}
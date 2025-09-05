'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  User, 
  Building, 
  FileText,
  DollarSign,
  TrendingUp,
  MapPin,
  Phone,
  Mail,
  Calendar,
  ArrowRight,
  Loader2,
  Shield,
  Activity
} from 'lucide-react';

interface WorkflowStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  timestamp?: string;
  details?: any;
}

export default function WorkflowDemonstration() {
  const [ticketId, setTicketId] = useState<string | null>(null);
  const [ticketData, setTicketData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [workflowSteps, setWorkflowSteps] = useState<WorkflowStep[]>([
    {
      id: 'claim-submission',
      title: 'Client Submits Online Claim',
      description: 'Client fills online claim form and pays $2,750 platform fee',
      status: 'pending'
    },
    {
      id: 'payment-processing',
      title: 'Payment Processed',
      description: '$2,750 platform fee processed via secure payment gateway',
      status: 'pending'
    },
    {
      id: 'crm-connection',
      title: 'CRM Receives Claim',
      description: 'Paid claim automatically imported into CRM system',
      status: 'pending'
    },
    {
      id: 'contractor-matching',
      title: 'Find Local NRP Contractor',
      description: 'System matches claim to certified contractor based on location and services',
      status: 'pending'
    },
    {
      id: 'contractor-notification',
      title: 'Contractor Notified',
      description: 'Selected contractor receives lead notification',
      status: 'pending'
    },
    {
      id: 'contractor-accepts',
      title: 'Contractor Accepts Lead',
      description: 'Contractor accepts lead and prepares to contact client',
      status: 'pending'
    },
    {
      id: 'client-contact',
      title: 'Contractor Calls Client',
      description: 'Contractor makes direct phone contact with client within 60 MINUTES',
      status: 'pending'
    },
    {
      id: 'service-delivery',
      title: 'Contractor Handles All Work',
      description: 'Inspection, make-safe, documentation, insurance liaison - all by contractor',
      status: 'pending'
    }
  ]);

  // Demo customer data
  const demoCustomerData = {
    fullName: 'John Smith',
    phone: '0412 345 678',
    email: 'john.smith@example.com',
    propertyType: 'residential',
    propertyAddress: '123 Demo Street',
    suburb: 'Brisbane',
    state: 'QLD',
    postcode: '4000',
    damageTypes: ['Water/Flood Damage', 'Mould Growth'],
    damageDate: new Date().toISOString().split('T')[0],
    damageDescription: 'Severe water damage from burst pipe. Kitchen and living areas affected. Urgent restoration needed.',
    affectedAreas: 'multiple_rooms',
    hasInsurance: true,
    insuranceCompany: 'NRMA',
    insuranceClaimNumber: 'DEMO-2024-001',
    excessAmount: '1000',
    urgencyLevel: 'emergency',
    hasPhotos: true,
    // Payment confirmation
    paymentConfirmed: true,
    paymentAmount: 2750,
    paymentMethod: 'card',
    // Authorizations
    authorizePropertyAccess: true,
    authorizeInsuranceLiaison: true,
    authorizeWorkCommencement: true,
    // Terms acceptance
    understandPlatformRole: true,
    acceptContractorCommunication: true,
    agreeToTerms: true
  };

  // Start the demo workflow
  const startDemo = async () => {
    setLoading(true);
    setCurrentStep(0);
    
    // Step 1: Create ticket
    updateStepStatus(0, 'in-progress');
    
    try {
      const response = await fetch('/api/claims/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(demoCustomerData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setTicketId(result.claimId);
        updateStepStatus(0, 'completed', { claimId: result.claimId, fee: '$2,750 paid' });
        updateStepStatus(1, 'completed', { paymentStatus: 'Success' });
        
        // Start monitoring the claim
        monitorTicketProgress(result.claimId);
      }
    } catch (error) {
      console.error('Demo error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Monitor ticket progress
  const monitorTicketProgress = async (id: string) => {
    let checkCount = 0;
    const maxChecks = 20;
    
    const interval = setInterval(async () => {
      try {
        const response = await fetch(`/api/tickets/create?id=${id}`);
        const data = await response.json();
        
        if (data.success) {
          setTicketData(data.ticket);
          updateWorkflowFromTicket(data.ticket);
        }
        
        checkCount++;
        if (checkCount >= maxChecks || data.ticket?.workflow?.fundsReleased) {
          clearInterval(interval);
        }
      } catch (error) {
        console.error('Monitoring error:', error);
      }
    }, 2000); // Check every 2 seconds
  };

  // Update workflow based on ticket status
  const updateWorkflowFromTicket = (ticket: any) => {
    if (ticket.workflow.crmConnected && workflowSteps[1].status !== 'completed') {
      updateStepStatus(1, 'completed', { connectedAt: new Date().toISOString() });
      updateStepStatus(2, 'in-progress');
    }
    
    if (ticket.workflow.contractorAssigned && workflowSteps[2].status !== 'completed') {
      updateStepStatus(2, 'completed', { 
        contractorId: ticket.contractorId,
        contractorName: ticket.contractorName 
      });
      updateStepStatus(3, 'completed');
      updateStepStatus(4, 'in-progress');
    }
    
    if (ticket.workflow.jobAccepted && workflowSteps[4].status !== 'completed') {
      updateStepStatus(4, 'completed', { acceptedAt: ticket.jobAcceptedAt });
      updateStepStatus(5, 'in-progress');
    }
    
    if (ticket.workflow.claimsSubmitted && workflowSteps[5].status !== 'completed') {
      updateStepStatus(5, 'completed', { claimId: ticket.claimId });
      updateStepStatus(6, 'in-progress');
    }
    
    if (ticket.workflow.kpisTracked && workflowSteps[6].status !== 'completed') {
      updateStepStatus(6, 'completed', { kpis: ticket.kpis });
      updateStepStatus(7, 'in-progress');
    }
    
    if (ticket.workflow.fundsReleased && workflowSteps[7].status !== 'completed') {
      updateStepStatus(7, 'completed', { releasedAt: new Date().toISOString() });
    }
  };

  // Update step status
  const updateStepStatus = (stepIndex: number, status: WorkflowStep['status'], details?: any) => {
    setWorkflowSteps(prev => {
      const updated = [...prev];
      updated[stepIndex] = {
        ...updated[stepIndex],
        status,
        timestamp: status === 'completed' ? new Date().toISOString() : undefined,
        details
      };
      return updated;
    });
    
    if (status === 'completed') {
      setCurrentStep(stepIndex + 1);
    }
  };

  // Calculate progress
  const progress = (workflowSteps.filter(s => s.status === 'completed').length / workflowSteps.length) * 100;

  return (
    <div className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">End-to-End Workflow Demonstration</h1>
        <p className="text-gray-600">
          Experience the complete journey from customer ticket to contractor payment
        </p>
      </div>

      {/* Demo Controls */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Demo Control Panel</CardTitle>
          <CardDescription>
            Click "Start Demo" to simulate a complete customer-to-contractor workflow
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <Button 
              onClick={startDemo} 
              disabled={loading}
              size="lg"
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Running Demo...
                </>
              ) : (
                <>
                  <Activity className="mr-2 h-4 w-4" />
                  Start Demo Workflow
                </>
              )}
            </Button>
            
            {ticketId && (
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="px-3 py-1">
                  Ticket ID: {ticketId}
                </Badge>
                <Badge variant="outline" className="px-3 py-1">
                  Progress: {Math.round(progress)}%
                </Badge>
              </div>
            )}
          </div>
          
          {ticketId && (
            <Progress value={progress} className="mt-4" />
          )}
        </CardContent>
      </Card>

      {/* Workflow Steps */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Workflow Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {workflowSteps.map((step, index) => (
                <div key={step.id} className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-0.5">
                    {step.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-600" />
                    ) : step.status === 'in-progress' ? (
                      <Loader2 className="h-5 w-5 text-blue-600 animate-spin" />
                    ) : (
                      <Clock className="h-5 w-5 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-medium ${
                        step.status === 'completed' ? 'text-green-700' :
                        step.status === 'in-progress' ? 'text-blue-700' :
                        'text-gray-500'
                      }`}>
                        {step.title}
                      </h4>
                      {step.status === 'completed' && step.timestamp && (
                        <Badge variant="secondary" className="text-xs">
                          {new Date(step.timestamp).toLocaleTimeString()}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {step.description}
                    </p>
                    {step.details && (
                      <div className="mt-2 p-2 bg-gray-50 rounded text-xs">
                        {Object.entries(step.details).map(([key, value]) => (
                          <div key={key} className="flex gap-2">
                            <span className="font-medium">{key}:</span>
                            <span>{String(value)}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Live Data Display */}
        {ticketData && (
          <Card>
            <CardHeader>
              <CardTitle>Live Ticket Data</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="customer">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="customer">Customer</TabsTrigger>
                  <TabsTrigger value="contractor">Contractor</TabsTrigger>
                  <TabsTrigger value="kpis">KPIs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="customer" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Customer Information
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>Name: {ticketData.customer.fullName}</div>
                      <div>Phone: {ticketData.customer.phone}</div>
                      <div>Email: {ticketData.customer.email}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Property Details
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>Address: {ticketData.property.address}</div>
                      <div>Suburb: {ticketData.property.suburb}, {ticketData.property.state}</div>
                      <div>Type: {ticketData.property.type}</div>
                      <div>Value: ${parseInt(ticketData.property.value).toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Damage Information
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>Types: {ticketData.damage.types.join(', ')}</div>
                      <div>Urgency: <Badge variant="destructive">{ticketData.damage.urgencyLevel}</Badge></div>
                      <div>Area: {ticketData.damage.areaAffected}</div>
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="contractor" className="space-y-4">
                  {ticketData.contractorId ? (
                    <>
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Shield className="h-4 w-4" />
                          Assigned Contractor
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div>ID: {ticketData.contractorId}</div>
                          <div>Company: {ticketData.contractorName}</div>
                          <div>Phone: {ticketData.contractorPhone}</div>
                          <div>Status: <Badge variant="success">Assigned</Badge></div>
                        </div>
                      </div>
                      
                      {ticketData.workflow.jobAccepted && (
                        <div>
                          <h4 className="font-medium mb-2">Job Status</h4>
                          <div className="space-y-1 text-sm">
                            <div>Accepted: {new Date(ticketData.jobAcceptedAt).toLocaleString()}</div>
                            <div>Status: <Badge variant="success">In Progress</Badge></div>
                          </div>
                        </div>
                      )}
                      
                      {ticketData.claimId && (
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <FileText className="h-4 w-4" />
                            Insurance Claim
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div>Claim ID: {ticketData.claimId}</div>
                            <div>Status: {ticketData.claimStatus}</div>
                            <div>Insurer: {ticketData.insurance.company}</div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Alert>
                      <AlertCircle className="h-4 w-4" />
                      <AlertDescription>
                        Contractor assignment pending...
                      </AlertDescription>
                    </Alert>
                  )}
                </TabsContent>
                
                <TabsContent value="kpis" className="space-y-4">
                  {ticketData.kpis ? (
                    <div>
                      <h4 className="font-medium mb-2 flex items-center gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Performance Metrics
                      </h4>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm">Response Time:</span>
                          <Badge variant="success">{ticketData.kpis.responseTime}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Assignment Time:</span>
                          <Badge variant="success">{ticketData.kpis.assignmentTime}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Acceptance Time:</span>
                          <Badge variant="success">{ticketData.kpis.acceptanceTime}</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm">Claim Submission:</span>
                          <Badge variant="success">{ticketData.kpis.claimSubmissionTime}</Badge>
                        </div>
                      </div>
                      
                      <div className="mt-4 p-3 bg-green-50 rounded">
                        <div className="flex items-center gap-2">
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm font-medium text-green-800">
                            All KPIs within target range
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <Alert>
                      <Clock className="h-4 w-4" />
                      <AlertDescription>
                        KPI tracking in progress...
                      </AlertDescription>
                    </Alert>
                  )}
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <DollarSign className="h-4 w-4" />
                      Financial Metrics
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>Lead Score: {ticketData.metrics.leadScore}/100</div>
                      <div>Lead Value: ${ticketData.metrics.leadValue}</div>
                      <div>Budget: ${parseInt(ticketData.metrics.budget || '0').toLocaleString()}</div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Success Message */}
      {progress === 100 && (
        <Alert className="bg-green-50 border-green-200">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <strong>Workflow Complete!</strong> The entire process from customer ticket to contractor payment has been successfully demonstrated.
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
}
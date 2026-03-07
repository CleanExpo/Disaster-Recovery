'use client';


import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
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

function WorkflowDemonstrationOriginal() {
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
      id: 'clean-claims',
      title: 'Clean Claims Connection',
      description: 'Documentation synced to Clean Claims for reporting and compliance',
      status: 'pending'
    },
    {
      id: 'contractor-matching',
      title: 'Find Local NRPG Contractor',
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
    },
    {
      id: 'service-completion',
      title: 'Service Completion',
      description: 'Contractor completes all work and submits final documentation',
      status: 'pending'
    },
    {
      id: 'funds-release',
      title: 'Payment Released',
      description: '$2,200 released to contractor ($550 retained for marketing)',
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
      const response = await fetch('/api/demo/workflow', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(demoCustomerData)
      });
      
      const result = await response.json();
      
      if (result.success) {
        setTicketId(result.ticketId);
        setTicketData(result.workflow);
        updateStepStatus(0, 'completed', { claimId: result.ticketId, fee: '$2,750 paid' });
        updateStepStatus(1, 'completed', { paymentStatus: 'Success' });
        
        // Small delay before starting CRM step
        setTimeout(() => {
          updateStepStatus(2, 'in-progress');
        }, 1000);
        
        // Start monitoring the workflow
        monitorTicketProgress(result.ticketId);
      }
    } catch (error) {
      console.error('Demo error:', error);
    } finally {
      setLoading(false);
    }
  };

  // Simulate workflow progression client-side (since serverless doesn't persist state)
  const monitorTicketProgress = async (id: string) => {
    // Track KPI timestamps for payment releases
    const jobAcceptedTime = Date.now() + 10000; // When contractor accepts (step 6)
    const clientContactTime = Date.now() + 12000; // When contractor contacts client (step 7)
    const contactDelayMinutes = Math.floor((clientContactTime - jobAcceptedTime) / 60000); // Should be under 60 mins
    const kpi1Fine = contactDelayMinutes > 60 ? (contactDelayMinutes - 60) * 2 : 0; // $2/min after 60 mins
    
    // Simulate workflow progression with realistic timing
    const workflowSteps = [
      { delay: 2000, stepIndex: 2, completed: true }, // CRM Connection
      { delay: 3000, stepIndex: 3, completed: true, cleanClaims: true }, // Clean Claims
      { delay: 5000, stepIndex: 4, completed: true, contractor: true }, // Contractor Matching
      { delay: 7000, stepIndex: 5, completed: true }, // Contractor Notification
      { delay: 10000, stepIndex: 6, completed: true }, // Contractor Accepts
      { delay: 12000, stepIndex: 7, completed: true, kpi1: true }, // Client Contact - KPI 1: $550 release
      { delay: 15000, stepIndex: 8, completed: true, serviceStarted: true, kpi2: true }, // Service Delivery - KPI 2: $550 release
      { delay: 18000, stepIndex: 9, completed: true, serviceCompleted: true, kpi3: true }, // Service Completion - KPI 3: Remaining funds
      { delay: 20000, stepIndex: 10, completed: true, fundsReleased: true }, // Funds Release
    ];
    
    workflowSteps.forEach(({ delay, stepIndex, completed, cleanClaims, contractor, serviceStarted, serviceCompleted, fundsReleased, kpi1, kpi2, kpi3 }) => {
      setTimeout(() => {
        if (completed) {
          updateStepStatus(stepIndex, 'completed', {
            timestamp: new Date().toLocaleTimeString(),
            ...(cleanClaims && {
              reportId: `CLN-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
              status: 'Synced'
            }),
            ...(contractor && {
              contractorName: 'Premium Restoration Services',
              contractorId: `CTR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
            }),
            ...(kpi1 && {
              kpi: 'KPI 01: Client Contact',
              timeToContact: '58 minutes',
              fine: '$0',
              payment: '$550 released'
            }),
            ...(kpi2 && {
              kpi: 'KPI 02: Initial Onsite Report',
              reportCompleted: 'Yes',
              payment: '$550 released'
            }),
            ...(kpi3 && {
              kpi: 'KPI 03: Initial Make Safe',
              makeSafeCompleted: 'Yes',
              remainingPayment: '$1,100 released',
              totalFines: '$0'
            }),
            ...(serviceStarted && !kpi2 && {
              inspection: 'Started',
              makeSafe: 'In Progress'
            }),
            ...(serviceCompleted && !kpi3 && {
              inspection: 'Complete',
              makeSafe: 'Complete',
              documentation: 'Complete'
            }),
            ...(fundsReleased && {
              amount: '$2,200',
              status: 'Released',
              breakdown: 'KPI 1: $550 | KPI 2: $550 | KPI 3: $1,100'
            })
          });
          
          // Update next step as in-progress if not the last step
          if (stepIndex < 10) {
            updateStepStatus(stepIndex + 1, 'in-progress');
          }
          
          // Update ticket data for visual forms
          setTicketData(prev => ({
            ...prev,
            currentStep: stepIndex,
            ...(contractor && {
              contractor: {
                id: `CTR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
                name: 'Premium Restoration Services',
                contact: 'disasterrecovery.com.au/contact'
              }
            }),
            ...(serviceStarted && {
              serviceDetails: {
                inspectionCompleted: false,
                makeSafeCompleted: false,
                documentationStarted: true
              }
            }),
            ...(serviceCompleted && {
              serviceDetails: {
                inspectionCompleted: true,
                makeSafeCompleted: true,
                documentationCompleted: true,
                finalReportSubmitted: true
              }
            }),
            ...(fundsReleased && {
              status: 'COMPLETED',
              payment: {
                ...prev?.payment,
                releasedAt: new Date().toISOString(),
                contractorAmount: 2200,
                platformFee: 550
              }
            })
          }));
        }
      }, delay);
    });
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
        <p className="text-gray-700">
          Experience the complete journey from customer claim to contractor payment
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

      {/* Workflow Steps and Form Display */}
      <div className="grid lg:grid-cols-3 gap-6 mb-6">
        {/* Form Display */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Live Form Data</CardTitle>
            <CardDescription>
              Actual data being processed
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentStep >= 0 && (
              <div className="space-y-4">
                {/* Customer Information */}
                <div className="p-3 bg-blue-50 rounded-lg">
                  <h4 className="font-semibold text-sm mb-2 text-blue-900">Customer Details</h4>
                  <div className="space-y-1 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Name:</span>
                      <span className="font-medium">{currentStep >= 0 ? demoCustomerData.fullName : '...'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Phone:</span>
                      <span className="font-medium">{currentStep >= 0 ? demoCustomerData.phone : '...'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Email:</span>
                      <span className="font-medium text-xs">{currentStep >= 0 ? demoCustomerData.email : '...'}</span>
                    </div>
                  </div>
                </div>

                {/* Property Information */}
                {currentStep >= 0 && (
                  <div className="p-3 bg-green-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-green-900">Property Info</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Address:</span>
                        <span className="font-medium">{demoCustomerData.propertyAddress}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Suburb:</span>
                        <span className="font-medium">{demoCustomerData.suburb}, {demoCustomerData.state}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Type:</span>
                        <span className="font-medium capitalize">{demoCustomerData.propertyType}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Damage Details */}
                {currentStep >= 0 && (
                  <div className="p-3 bg-red-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-red-900">Damage Details</h4>
                    <div className="space-y-1 text-xs">
                      <div>
                        <span className="text-gray-700">Type:</span>
                        <div className="mt-1">
                          {demoCustomerData.damageTypes.map((type, i) => (
                            <Badge key={i} variant="destructive" className="mr-1 text-xs">
                              {type}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <span className="text-gray-700">Description:</span>
                        <p className="mt-1 text-xs text-gray-700">{demoCustomerData.damageDescription}</p>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Urgency:</span>
                        <Badge variant="destructive" className="text-xs">
                          {demoCustomerData.urgencyLevel.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                  </div>
                )}

                {/* Insurance Information */}
                {currentStep >= 1 && (
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-purple-900">Insurance</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Company:</span>
                        <span className="font-medium">{demoCustomerData.insuranceCompany}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Claim #:</span>
                        <span className="font-medium">{demoCustomerData.insuranceClaimNumber}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Excess:</span>
                        <span className="font-medium">${demoCustomerData.excessAmount}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Payment Status */}
                {currentStep >= 1 && (
                  <div className="p-3 bg-green-100 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-green-900">Payment Status</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Platform Fee:</span>
                        <span className="font-bold text-green-700">${demoCustomerData.paymentAmount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Status:</span>
                        <Badge variant="success" className="text-xs">PAID</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Method:</span>
                        <span className="font-medium">Credit Card</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Contractor Assignment */}
                {currentStep >= 4 && ticketData?.contractor && (
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <h4 className="font-semibold text-sm mb-2 text-orange-900">Contractor Assigned</h4>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-700">Company:</span>
                        <span className="font-medium">{ticketData.contractor?.name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">ID:</span>
                        <span className="font-medium">{ticketData.contractor?.id}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-700">Status:</span>
                        <Badge variant="success" className="text-xs">ACCEPTED</Badge>
                      </div>
                    </div>
                  </div>
                )}

                {/* KPI Payment Tracking (Contractor View Only) */}
                {currentStep >= 6 && ticketData?.contractor && (
                  <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
                    <h4 className="font-semibold text-sm mb-2 text-purple-900 flex items-center gap-2">
                      <Shield className="h-4 w-4" />
                      KPI Payment Tracking
                    </h4>
                    <div className="space-y-2 text-xs">
                      {/* KPI 1 */}
                      <div className={`p-2 rounded ${currentStep >= 7 ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <div className="font-medium text-gray-900">KPI 01: Client Contact (60 min)</div>
                        {currentStep >= 7 && (
                          <>
                            <div className="text-green-700">✓ Contacted in 58 minutes</div>
                            <div className="text-green-800 font-semibold">$550 released instantly</div>
                          </>
                        )}
                        {currentStep < 7 && <div className="text-gray-700">Pending...</div>}
                      </div>
                      
                      {/* KPI 2 */}
                      <div className={`p-2 rounded ${currentStep >= 8 ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <div className="font-medium text-gray-900">KPI 02: Initial Onsite Report</div>
                        {currentStep >= 8 && (
                          <>
                            <div className="text-green-700">✓ Report submitted in Clean Claims</div>
                            <div className="text-green-800 font-semibold">$550 released instantly</div>
                          </>
                        )}
                        {currentStep < 8 && <div className="text-gray-700">Pending...</div>}
                      </div>
                      
                      {/* KPI 3 */}
                      <div className={`p-2 rounded ${currentStep >= 9 ? 'bg-green-100' : 'bg-gray-100'}`}>
                        <div className="font-medium text-gray-900">KPI 03: Initial Make Safe</div>
                        {currentStep >= 9 && (
                          <>
                            <div className="text-green-700">✓ Make safe completed</div>
                            <div className="text-green-800 font-semibold">$1,100 released (no fines)</div>
                          </>
                        )}
                        {currentStep < 9 && <div className="text-gray-700">Pending...</div>}
                      </div>
                      
                      {/* Payment Summary */}
                      {currentStep >= 10 && (
                        <div className="mt-2 p-2 bg-purple-100 rounded border-t-2 border-purple-300">
                          <div className="font-semibold text-purple-900">Payment Summary</div>
                          <div className="mt-1 space-y-1">
                            <div className="flex justify-between">
                              <span>Total Contract:</span>
                              <span className="font-medium">$2,200</span>
                            </div>
                            <div className="flex justify-between text-red-600">
                              <span>Fines Applied:</span>
                              <span className="font-medium">-$0</span>
                            </div>
                            <div className="flex justify-between font-bold text-purple-900 pt-1 border-t">
                              <span>Total Released:</span>
                              <span>$2,200</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="mt-2 text-xs text-purple-700 italic">
                      * Contractor-only information
                    </div>
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Workflow Progress */}
        <Card className="lg:col-span-2">
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
                      <Clock className="h-5 w-5 text-gray-700" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`font-medium ${
                        step.status === 'completed' ? 'text-green-700' :
                        step.status === 'in-progress' ? 'text-blue-700' :
                        'text-gray-700'
                      }`}>
                        {step.title}
                      </h4>
                      {step.status === 'completed' && step.timestamp && (
                        <Badge variant="secondary" className="text-xs">
                          {new Date(step.timestamp).toLocaleTimeString()}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mt-1">
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
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="customer">Customer</TabsTrigger>
                  <TabsTrigger value="contractor">Contractor</TabsTrigger>
                  <TabsTrigger value="service">Service</TabsTrigger>
                  <TabsTrigger value="kpis">KPIs</TabsTrigger>
                </TabsList>
                
                <TabsContent value="customer" className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Customer Information
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>Name: {ticketData.customer?.fullName}</div>
                      <div>Phone: {ticketData.customer?.phone}</div>
                      <div>Email: {ticketData.customer?.email}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Property Details
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>Address: {ticketData.property?.address}</div>
                      <div>Suburb: {ticketData.property?.suburb}, {ticketData.property?.state}</div>
                      <div>Type: {ticketData.property?.type}</div>
                      <div>Value: ${parseInt(ticketData.property?.value || '0').toLocaleString()}</div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertCircle className="h-4 w-4" />
                      Damage Information
                    </h4>
                    <div className="space-y-1 text-sm">
                      <div>Types: {ticketData.damage?.types?.join(', ')}</div>
                      <div>Urgency: <Badge variant="destructive">{ticketData.damage?.urgencyLevel}</Badge></div>
                      <div>Area: {ticketData.damage?.areaAffected}</div>
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
                      
                      {ticketData.workflow?.jobAccepted && (
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
                            <div>Insurer: {ticketData.insurance?.company}</div>
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
                
                <TabsContent value="service" className="space-y-4">
                  {ticketData.serviceDetails ? (
                    <>
                      <div>
                        <h4 className="font-medium mb-2 flex items-center gap-2">
                          <Activity className="h-4 w-4" />
                          Service Progress
                        </h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Inspection:</span>
                            <Badge variant={ticketData.serviceDetails?.inspectionCompleted ? "success" : "secondary"}>
                              {ticketData.serviceDetails?.inspectionCompleted ? "Complete" : "Pending"}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Make-Safe:</span>
                            <Badge variant={ticketData.serviceDetails?.makeSafeCompleted ? "success" : "secondary"}>
                              {ticketData.serviceDetails?.makeSafeCompleted ? "Complete" : "Pending"}
                            </Badge>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Documentation:</span>
                            <Badge variant={ticketData.serviceDetails?.documentationCompleted ? "success" : "secondary"}>
                              {ticketData.serviceDetails?.documentationCompleted ? "Complete" : "In Progress"}
                            </Badge>
                          </div>
                          {ticketData.insurance.hasInsurance && (
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Insurance Liaison:</span>
                              <Badge variant={ticketData.serviceDetails.insuranceLiaisonCompleted ? "success" : "secondary"}>
                                {ticketData.serviceDetails.insuranceLiaisonCompleted ? "Complete" : "In Progress"}
                              </Badge>
                            </div>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Final Report:</span>
                            <Badge variant={ticketData.serviceDetails.finalReportSubmitted ? "success" : "secondary"}>
                              {ticketData.serviceDetails.finalReportSubmitted ? "Submitted" : "Pending"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      
                      {ticketData.payment && (
                        <div>
                          <h4 className="font-medium mb-2 flex items-center gap-2">
                            <DollarSign className="h-4 w-4" />
                            Payment Details
                          </h4>
                          <div className="space-y-1 text-sm">
                            <div>Platform Fee: ${ticketData.payment.platformFeeDeducted}</div>
                            <div>Contractor Amount: ${ticketData.payment.contractorAmount}</div>
                            <div>Payment Method: {ticketData.payment.paymentMethod}</div>
                            <div>Status: <Badge variant="success">Paid</Badge></div>
                          </div>
                        </div>
                      )}
                    </>
                  ) : (
                    <Alert>
                      <Clock className="h-4 w-4" />
                      <AlertDescription>
                        Service delivery pending contractor assignment...
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
                      <div>Lead Score: {ticketData.metrics?.leadScore || 0}/100</div>
                      <div>Lead Value: ${ticketData.metrics?.leadValue || 0}</div>
                      <div>Budget: ${parseInt(ticketData.metrics?.budget || '0').toLocaleString()}</div>
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
export default function WorkflowDemonstration() {
  return (
    <>
      <AntigravityNavbar />
      <WorkflowDemonstrationOriginal />
      <AntigravityFooter />
    </>
  );
}

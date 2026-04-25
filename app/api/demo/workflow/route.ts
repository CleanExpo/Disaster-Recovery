import { NextRequest, NextResponse } from 'next/server';
import { requestLogger, captureException } from '@/lib/observability';

// Store demo workflows in a way that works with serverless
// In production, this would be a database
const DEMO_WORKFLOW_STATES: any = {};

// Clean up old workflows after 5 minutes
const cleanupOldWorkflows = () => {
  const now = Date.now();
  Object.keys(DEMO_WORKFLOW_STATES).forEach(id => {
    if (now - DEMO_WORKFLOW_STATES[id].createdAt > 300000) {
      delete DEMO_WORKFLOW_STATES[id];
    }
  });
};

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/demo/workflow' });
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  try {
    cleanupOldWorkflows();
    
    // Generate demo ticket ID
    const ticketId = `DEMO-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
    
    // Create initial workflow state
    const workflow = {
      id: ticketId,
      createdAt: Date.now(),
      status: 'ACTIVE',
      currentStep: 0,
      steps: [
        { name: 'claim-submission', completed: true, timestamp: Date.now() },
        { name: 'payment-processing', completed: true, timestamp: Date.now() + 1000 },
        { name: 'crm-connection', completed: false, timestamp: null },
        { name: 'contractor-matching', completed: false, timestamp: null },
        { name: 'contractor-notification', completed: false, timestamp: null },
        { name: 'contractor-accepts', completed: false, timestamp: null },
        { name: 'client-contact', completed: false, timestamp: null },
        { name: 'service-delivery', completed: false, timestamp: null },
        { name: 'service-completion', completed: false, timestamp: null },
        { name: 'funds-release', completed: false, timestamp: null }
      ],
      customer: {
        fullName: 'John Smith',
        phone: '0412 345 678',
        email: 'john.smith@example.com',
      },
      property: {
        address: '123 Demo Street',
        suburb: 'Brisbane',
        state: 'QLD',
        type: 'residential'
      },
      damage: {
        types: ['Water/Flood Damage', 'Mould Growth'],
        urgencyLevel: 'emergency',
        description: 'Severe water damage from burst pipe. Kitchen and living areas affected.'
      },
      insurance: {
        hasInsurance: true,
        company: 'NRMA',
        claimNumber: 'DEMO-2024-001'
      },
      contractor: null,
      payment: {
        totalAmount: 2750,
        platformFee: 550,
        contractorAmount: 2200,
        status: 'PAID'
      }
    };
    
    // Store the workflow
    DEMO_WORKFLOW_STATES[ticketId] = workflow;
    
    // Start workflow progression
    setTimeout(() => progressWorkflow(ticketId, 2), 2000); // CRM Connection
    
    return NextResponse.json({
      success: true,
      ticketId: ticketId,
      message: 'Demo workflow started',
      workflow: workflow
    });
    
  } catch (error) {
    log.error('error starting demo workflow', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/demo/workflow' }, extra: { requestId: log.requestId } });
    return NextResponse.json({
      success: false,
      error: 'Failed to start demo workflow'
    }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const { searchParams } = new URL(request.url);
  const ticketId = searchParams.get('id');
  
  if (!ticketId) {
    return NextResponse.json({
      success: false,
      error: 'Ticket ID required'
    }, { status: 400 });
  }
  
  const workflow = DEMO_WORKFLOW_STATES[ticketId];
  
  if (!workflow) {
    return NextResponse.json({
      success: false,
      error: 'Workflow not found'
    }, { status: 404 });
  }
  
  return NextResponse.json({
    success: true,
    workflow: workflow
  });
}

// Progress the workflow through its steps
function progressWorkflow(ticketId: string, stepIndex: number) {
  const workflow = DEMO_WORKFLOW_STATES[ticketId];
  if (!workflow || stepIndex >= workflow.steps.length) return;
  
  // Mark current step as completed
  workflow.steps[stepIndex].completed = true;
  workflow.steps[stepIndex].timestamp = Date.now();
  workflow.currentStep = stepIndex;
  
  // Add specific data for certain steps
  switch(stepIndex) {
    case 3: // Contractor matching
      workflow.contractor = {
        id: `CTR-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
        name: 'Premium Restoration Services',
        contact: 'disasterrecovery.com.au/contact'
      };
      break;
    case 5: // Contractor accepts
      workflow.contractor.acceptedAt = Date.now();
      break;
    case 6: // Client contact
      workflow.contractor.contactedAt = Date.now();
      break;
    case 7: // Service delivery
      workflow.serviceStartedAt = Date.now();
      workflow.serviceDetails = {
        inspectionCompleted: true,
        makeSafeCompleted: true,
        documentationStarted: true
      };
      break;
    case 8: // Service completion
      workflow.serviceCompletedAt = Date.now();
      workflow.serviceDetails = {
        ...workflow.serviceDetails,
        documentationCompleted: true,
        finalReportSubmitted: true
      };
      break;
    case 9: // Funds release
      workflow.payment.releasedAt = Date.now();
      workflow.payment.contractorAmount = 2200; // After $550 platform fee
      workflow.status = 'COMPLETED';
      break;
  }
  
  // Schedule next step
  if (stepIndex < workflow.steps.length - 1) {
    const delays = [0, 0, 2000, 2000, 2000, 3000, 2000, 3000, 3000, 2000];
    setTimeout(() => progressWorkflow(ticketId, stepIndex + 1), delays[stepIndex + 1] || 2000);
  }
}
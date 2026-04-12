import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export interface DisputeRequest {
  bookingId: string;
  contractorId?: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  disputeType: 'service_quality' | 'incomplete_work' | 'damage_claim' | 'billing' | 'contractor_conduct' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  desiredResolution: string;
  evidenceUrls?: string[];
  dateOfService?: string;
  amountInDispute?: number;
}

export interface DisputeResponse {
  disputeId: string;
  status: 'open' | 'under_review' | 'awaiting_contractor' | 'resolved' | 'escalated';
  priority: string;
  estimatedResolution: string;
  assignedTo?: string;
  nextSteps: string[];
}

// GET - Retrieve dispute status
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const disputeId = searchParams.get('disputeId');
  const bookingId = searchParams.get('bookingId');
  
  if (!disputeId && !bookingId) {
    return NextResponse.json(
      { error: 'disputeId or bookingId required' },
      { status: 400 }
    );
  }

  try {
    // Query Enquiry records with source: 'dispute'
    const enquiry = disputeId
      ? await prisma.enquiry.findFirst({ where: { id: disputeId, source: 'dispute' } })
      : await prisma.enquiry.findFirst({ where: { source: 'dispute', metadata: { contains: bookingId! } } });

    if (!enquiry) {
      return NextResponse.json(
        { error: 'Dispute not found' },
        { status: 404 }
      );
    }

    // Parse stored metadata to reconstruct dispute response
    const meta = JSON.parse(enquiry.metadata || '{}');

    const dispute = {
      disputeId: enquiry.id,
      bookingId: meta.bookingId || bookingId || '',
      status: meta.status || 'open',
      priority: meta.priority || 'medium',
      createdAt: enquiry.createdAt.toISOString(),
      lastUpdated: meta.lastUpdated || enquiry.createdAt.toISOString(),
      timeline: [
        {
          date: enquiry.createdAt.toISOString(),
          action: 'Dispute created',
          by: enquiry.name
        },
        {
          date: enquiry.createdAt.toISOString(),
          action: 'Assigned to resolution team',
          by: 'System'
        }
      ],
      estimatedResolution: getEstimatedResolution(meta.priority || 'medium'),
      assignedTo: meta.assignedTo || 'Support Team'
    };

    return NextResponse.json(dispute);
  } catch (error) {
    console.error('Dispute retrieval error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve dispute' },
      { status: 500 }
    );
  }
}

// POST - Create new dispute
export async function POST(request: NextRequest) {
  try {
    const disputeData: DisputeRequest = await request.json();

    // Determine priority and resolution timeline
    const priority = calculatePriority(disputeData.severity, disputeData.disputeType);
    const estimatedResolution = getEstimatedResolution(priority);

    // Assign to appropriate team member
    const assignedTo = assignDispute(disputeData.disputeType, priority);

    // Define next steps based on dispute type
    const nextSteps = getNextSteps(disputeData.disputeType);

    // Store dispute as an Enquiry record with source: 'dispute'
    const enquiry = await prisma.enquiry.create({
      data: {
        name: disputeData.customerName,
        email: disputeData.customerEmail,
        phone: disputeData.customerPhone,
        message: disputeData.description,
        source: 'dispute',
        metadata: JSON.stringify({
          bookingId: disputeData.bookingId,
          contractorId: disputeData.contractorId,
          disputeType: disputeData.disputeType,
          severity: disputeData.severity,
          desiredResolution: disputeData.desiredResolution,
          evidenceUrls: disputeData.evidenceUrls,
          dateOfService: disputeData.dateOfService,
          amountInDispute: disputeData.amountInDispute,
          status: 'open',
          priority,
          assignedTo,
          lastUpdated: new Date().toISOString(),
        }),
      },
    });

    const disputeId = enquiry.id;

    const response: DisputeResponse = {
      disputeId,
      status: 'open',
      priority,
      estimatedResolution,
      assignedTo,
      nextSteps
    };

    return NextResponse.json({
      success: true,
      ...response,
      message: 'Your dispute has been logged and will be reviewed within 24 hours'
    });

  } catch (error: any) {
    console.error('Dispute creation error:', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to create dispute' },
      { status: 400 }
    );
  }
}

// PUT - Update dispute status
export async function PUT(request: NextRequest) {
  try {
    const { disputeId, status, resolution, notes } = await request.json();

    if (!disputeId || !status) {
      return NextResponse.json(
        { error: 'disputeId and status required' },
        { status: 400 }
      );
    }

    // Fetch existing enquiry
    const enquiry = await prisma.enquiry.findUnique({ where: { id: disputeId } });
    if (!enquiry || enquiry.source !== 'dispute') {
      return NextResponse.json(
        { error: 'Dispute not found' },
        { status: 404 }
      );
    }

    // Merge new status into existing metadata
    const existingMeta = JSON.parse(enquiry.metadata || '{}');
    await prisma.enquiry.update({
      where: { id: disputeId },
      data: {
        responded: status === 'resolved',
        metadata: JSON.stringify({
          ...existingMeta,
          status,
          resolution,
          notes,
          lastUpdated: new Date().toISOString(),
        }),
      },
    });

    const updatedDispute = {
      disputeId,
      status,
      resolution,
      notes,
      lastUpdated: new Date().toISOString(),
      updatedBy: 'Resolution Team'
    };

    return NextResponse.json({
      success: true,
      ...updatedDispute,
      message: `Dispute ${disputeId} updated to ${status}`
    });

  } catch (error: any) {
    console.error('Dispute update error:', error);

    return NextResponse.json(
      {
        success: false,
        message: error.message || 'Failed to update dispute' },
      { status: 400 }
    );
  }
}

function calculatePriority(severity: string, type: string): string {
  if (severity === 'critical') return 'urgent';
  if (severity === 'high' && type === 'damage_claim') return 'urgent';
  if (severity === 'high') return 'high';
  if (severity === 'medium') return 'medium';
  return 'low';
}

function getEstimatedResolution(priority: string): string {
  switch (priority) {
    case 'urgent':
      return '24-48 hours';
    case 'high':
      return '2-3 business days';
    case 'medium':
      return '3-5 business days';
    default:
      return '5-7 business days';
  }
}

function assignDispute(type: string, priority: string): string {
  const teams = {
    service_quality: 'Quality Assurance Team',
    incomplete_work: 'Operations Team',
    damage_claim: 'Insurance Liaison Team',
    billing: 'Finance Team',
    contractor_conduct: 'Contractor Relations Team',
    other: 'General Support Team'
  };
  
  if (priority === 'urgent') {
    return 'Senior Resolution Specialist';
  }
  
  return teams[type as keyof typeof teams] || 'Support Team';
}

function getNextSteps(type: string): string[] {
  const steps: Record<string, string[]> = {
    service_quality: [
      'Review submitted evidence and photos',
      'Contact contractor for their assessment',
      'Schedule quality inspection if needed',
      'Determine appropriate resolution'
    ],
    incomplete_work: [
      'Verify scope of work against original booking',
      'Contact contractor for completion timeline',
      'Arrange for work completion or alternative contractor',
      'Process any applicable refunds'
    ],
    damage_claim: [
      'Document all damage with photos',
      'Obtain repair quotes from licensed professionals',
      'Review contractor insurance coverage',
      'Process insurance claim if applicable'
    ],
    billing: [
      'Review payment records and invoices',
      'Identify any discrepancies',
      'Calculate correct amounts',
      'Process refund or adjustment as needed'
    ],
    contractor_conduct: [
      'Document incident details',
      'Interview all parties involved',
      'Review contractor history and compliance',
      'Determine appropriate action'
    ],
    other: [
      'Review dispute details',
      'Gather additional information',
      'Determine appropriate resolution path',
      'Contact customer with update'
    ]
  };
  
  return steps[type] || steps.other;
}

function generateDisputeConfirmationEmail(dispute: any, nextSteps: string[]): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; colour: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background-colour: #FF6B6B; colour: white; padding: 20px; text-align: centre; }
        .content { padding: 20px; background-colour: #f9f9f9; }
        .footer { padding: 20px; text-align: centre; font-size: 12px; colour: #666; }
        .dispute-id { font-size: 20px; font-weight: bold; colour: #FF6B6B; }
        .info-box { background: white; padding: 15px; margin: 15px 0; border-left: 4px solid #FF6B6B; }
        .timeline { background: #fff; padding: 10px; margin: 10px 0; }
        ul { padding-left: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Dispute Confirmation</h1>
        </div>
        <div class="content">
          <p>Dear ${dispute.customerName},</p>
          
          <p>We have received your dispute and are committed to resolving it as quickly as possible.</p>
          
          <div class="info-box">
            <p><strong>Dispute Reference:</strong></p>
            <p class="dispute-id">${dispute.disputeId}</p>
            <p><strong>Type:</strong> ${dispute.disputeType.replace(/_/g, ' ')}</p>
            <p><strong>Priority:</strong> ${dispute.priority.toUpperCase()}</p>
            <p><strong>Assigned To:</strong> ${dispute.assignedTo}</p>
            <p><strong>Estimated Resolution:</strong> ${dispute.estimatedResolution}</p>
          </div>
          
          <div class="info-box">
            <p><strong>What We Will Do:</strong></p>
            <ul>
              ${nextSteps.map(step => `<li>${step}</li>`).join('')}
            </ul>
          </div>
          
          <div class="info-box">
            <p><strong>What You Can Do:</strong></p>
            <ul>
              <li>Provide any additional evidence or documentation</li>
              <li>Respond promptly to any requests for information</li>
              <li>Track your dispute status online using your reference number</li>
            </ul>
          </div>
          
          <p><strong>Your Rights:</strong></p>
          <p>Under Australian Consumer Law, you have the right to:</p>
          <ul>
            <li>Receive services with due care and skill</li>
            <li>Have services fit for purpose</li>
            <li>Receive services within a reasonable time</li>
            <li>Seek remedies if these guarantees are not met</li>
          </ul>
          
          <p>If you need to provide additional information or have questions, please contact us:</p>
          <ul>
            <li>Email: disputes@disasterrecovery.com.au</li>
            <li>email: online support(online support)</li>
            <li>Reference: ${dispute.disputeId}</li>
          </ul>
        </div>
        <div class="footer">
          <p>© 2024 Disaster Recovery Pty Ltd | ABN: 11 234 567 890</p>
          <p>We are committed to fair and timely dispute resolution</p>
        </div>
      </div>
    </body>
    </html>
  `;
}
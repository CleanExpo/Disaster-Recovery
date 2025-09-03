/**
 * Clean Claims Webhook Handler
 * Processes webhook events from Clean Claims API
 */

import { NextRequest, NextResponse } from 'next/server';
import { getCleanClaimsAPI, WEBHOOK_EVENTS, type Claim } from '@/lib/integrations/clean-claims-api';
import { prisma } from '@/lib/prisma';

// Verify webhook signature
async function verifySignature(request: NextRequest, body: string): Promise<boolean> {
  const signature = request.headers.get('x-cleanclaims-signature');
  
  if (!signature) {
    console.error('Missing webhook signature');
    return false;
  }

  const api = getCleanClaimsAPI();
  return api.verifyWebhookSignature(body, signature);
}

export async function POST(request: NextRequest) {
  try {
    // Get raw body for signature verification
    const rawBody = await request.text();
    
    // Verify webhook signature
    const isValid = await verifySignature(request, rawBody);
    
    if (!isValid) {
      console.error('Invalid webhook signature');
      return NextResponse.json(
        { error: 'Invalid signature' },
        { status: 401 }
      );
    }

    // Parse webhook payload
    const payload = JSON.parse(rawBody);
    const { event, data, timestamp } = payload;

    console.log(`Processing Clean Claims webhook: ${event}`, {
      timestamp,
      claimId: data.claimId,
    });

    // Process based on event type
    switch (event) {
      case WEBHOOK_EVENTS.CLAIM_CREATED:
        await handleClaimCreated(data);
        break;

      case WEBHOOK_EVENTS.CLAIM_UPDATED:
        await handleClaimUpdated(data);
        break;

      case WEBHOOK_EVENTS.CLAIM_APPROVED:
        await handleClaimApproved(data);
        break;

      case WEBHOOK_EVENTS.CLAIM_REJECTED:
        await handleClaimRejected(data);
        break;

      case WEBHOOK_EVENTS.CLAIM_COMPLETED:
        await handleClaimCompleted(data);
        break;

      case WEBHOOK_EVENTS.CONTRACTOR_ASSIGNED:
        await handleContractorAssigned(data);
        break;

      case WEBHOOK_EVENTS.CONTRACTOR_ACCEPTED:
        await handleContractorAccepted(data);
        break;

      case WEBHOOK_EVENTS.CONTRACTOR_COMPLETED:
        await handleContractorCompleted(data);
        break;

      case WEBHOOK_EVENTS.DOCUMENT_UPLOADED:
        await handleDocumentUploaded(data);
        break;

      default:
        console.warn(`Unknown webhook event: ${event}`);
    }

    // Return success response
    return NextResponse.json({
      success: true,
      event,
      processed: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Webhook processing error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

// Event Handlers

async function handleClaimCreated(claim: Claim) {
  console.log('Processing new claim:', claim.claimId);

  // Create emergency job in our system
  try {
    const job = await prisma.emergencyJob.create({
      data: {
        externalId: claim.claimId,
        type: mapClaimTypeToJobType(claim.claimType),
        status: 'pending',
        priority: determinePriority(claim),
        location: {
          create: {
            address: claim.location.address,
            suburb: claim.location.suburb,
            state: claim.location.state,
            postcode: claim.location.postcode,
            latitude: claim.location.latitude,
            longitude: claim.location.longitude,
          },
        },
        description: claim.description,
        insuranceClaim: true,
        claimNumber: claim.policyNumber,
        estimatedValue: claim.estimatedValue,
        metadata: {
          source: 'clean_claims',
          claimId: claim.claimId,
          insuredName: claim.insuredName,
          incidentDate: claim.incidentDate,
        },
      },
    });

    // Notify contractors in the area
    await notifyLocalContractors(job);

    console.log(`Created emergency job ${job.id} for claim ${claim.claimId}`);
  } catch (error) {
    console.error('Failed to create emergency job:', error);
    throw error;
  }
}

async function handleClaimUpdated(claim: Claim) {
  console.log('Processing claim update:', claim.claimId);

  // Update job in our system
  try {
    const job = await prisma.emergencyJob.findFirst({
      where: { externalId: claim.claimId },
    });

    if (job) {
      await prisma.emergencyJob.update({
        where: { id: job.id },
        data: {
          status: mapClaimStatusToJobStatus(claim.status),
          estimatedValue: claim.estimatedValue,
          approvedValue: claim.approvedValue,
          updatedAt: new Date(),
        },
      });
    }
  } catch (error) {
    console.error('Failed to update job:', error);
  }
}

async function handleClaimApproved(claim: Claim) {
  console.log('Claim approved:', claim.claimId);

  // Update job status and notify contractor
  try {
    const job = await prisma.emergencyJob.findFirst({
      where: { externalId: claim.claimId },
      include: { contractor: true },
    });

    if (job) {
      await prisma.emergencyJob.update({
        where: { id: job.id },
        data: {
          status: 'approved',
          approvedValue: claim.approvedValue,
        },
      });

      // Notify assigned contractor
      if (job.contractor) {
        await sendContractorNotification(job.contractor, {
          type: 'claim_approved',
          jobId: job.id,
          claimId: claim.claimId,
          approvedValue: claim.approvedValue,
        });
      }
    }
  } catch (error) {
    console.error('Failed to process claim approval:', error);
  }
}

async function handleClaimRejected(data: any) {
  console.log('Claim rejected:', data.claimId);

  // Update job status
  try {
    const job = await prisma.emergencyJob.findFirst({
      where: { externalId: data.claimId },
    });

    if (job) {
      await prisma.emergencyJob.update({
        where: { id: job.id },
        data: {
          status: 'cancelled',
          metadata: {
            ...job.metadata,
            rejectionReason: data.reason,
          },
        },
      });
    }
  } catch (error) {
    console.error('Failed to process claim rejection:', error);
  }
}

async function handleClaimCompleted(claim: Claim) {
  console.log('Claim completed:', claim.claimId);

  // Mark job as completed
  try {
    const job = await prisma.emergencyJob.findFirst({
      where: { externalId: claim.claimId },
    });

    if (job) {
      await prisma.emergencyJob.update({
        where: { id: job.id },
        data: {
          status: 'completed',
          completedAt: new Date(),
        },
      });

      // Update contractor stats
      if (job.contractorId) {
        await updateContractorStats(job.contractorId, {
          completedJobs: 1,
          totalValue: claim.approvedValue || 0,
        });
      }
    }
  } catch (error) {
    console.error('Failed to process claim completion:', error);
  }
}

async function handleContractorAssigned(data: any) {
  console.log('Contractor assigned:', data);

  // Update job with contractor assignment
  try {
    const job = await prisma.emergencyJob.findFirst({
      where: { externalId: data.claimId },
    });

    if (job) {
      await prisma.emergencyJob.update({
        where: { id: job.id },
        data: {
          contractorId: data.contractorId,
          status: 'assigned',
          assignedAt: new Date(),
        },
      });
    }
  } catch (error) {
    console.error('Failed to process contractor assignment:', error);
  }
}

async function handleContractorAccepted(data: any) {
  console.log('Contractor accepted job:', data);

  // Update job status
  try {
    const job = await prisma.emergencyJob.findFirst({
      where: { externalId: data.claimId },
    });

    if (job) {
      await prisma.emergencyJob.update({
        where: { id: job.id },
        data: {
          status: 'in_progress',
          startedAt: new Date(),
        },
      });
    }
  } catch (error) {
    console.error('Failed to process contractor acceptance:', error);
  }
}

async function handleContractorCompleted(data: any) {
  console.log('Contractor completed job:', data);

  // Update job completion
  try {
    const job = await prisma.emergencyJob.findFirst({
      where: { externalId: data.claimId },
    });

    if (job) {
      await prisma.emergencyJob.update({
        where: { id: job.id },
        data: {
          status: 'pending_approval',
          metadata: {
            ...job.metadata,
            completionReport: data.completionReport,
          },
        },
      });
    }
  } catch (error) {
    console.error('Failed to process contractor completion:', error);
  }
}

async function handleDocumentUploaded(data: any) {
  console.log('Document uploaded:', data);

  // Store document reference
  try {
    const job = await prisma.emergencyJob.findFirst({
      where: { externalId: data.claimId },
    });

    if (job) {
      await prisma.document.create({
        data: {
          jobId: job.id,
          type: data.documentType,
          url: data.url,
          uploadedBy: data.uploadedBy,
          metadata: data.metadata,
        },
      });
    }
  } catch (error) {
    console.error('Failed to process document upload:', error);
  }
}

// Helper Functions

function mapClaimTypeToJobType(claimType: string): string {
  const typeMap: Record<string, string> = {
    water: 'water_damage',
    fire: 'fire_damage',
    storm: 'storm_damage',
    mould: 'mould_remediation',
    vandalism: 'vandalism_repair',
    other: 'general_restoration',
  };
  
  return typeMap[claimType] || 'general_restoration';
}

function mapClaimStatusToJobStatus(claimStatus: string): string {
  const statusMap: Record<string, string> = {
    pending: 'pending',
    approved: 'approved',
    in_progress: 'in_progress',
    completed: 'completed',
    rejected: 'cancelled',
  };
  
  return statusMap[claimStatus] || 'pending';
}

function determinePriority(claim: Claim): 'low' | 'medium' | 'high' | 'critical' {
  // Determine priority based on claim type and value
  if (claim.claimType === 'water' || claim.claimType === 'fire') {
    return 'critical';
  }
  
  if (claim.estimatedValue && claim.estimatedValue > 50000) {
    return 'high';
  }
  
  if (claim.claimType === 'storm') {
    return 'high';
  }
  
  return 'medium';
}

async function notifyLocalContractors(job: any) {
  // Implementation would notify contractors in the area
  console.log(`Notifying contractors for job ${job.id}`);
}

async function sendContractorNotification(contractor: any, notification: any) {
  // Implementation would send notification to contractor
  console.log(`Sending notification to contractor ${contractor.id}:`, notification);
}

async function updateContractorStats(contractorId: string, stats: any) {
  // Implementation would update contractor statistics
  console.log(`Updating stats for contractor ${contractorId}:`, stats);
}
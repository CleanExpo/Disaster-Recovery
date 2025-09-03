/**
 * Background Check Webhook Handler
 * Processes webhook events from Background Check Service
 */

import { NextRequest, NextResponse } from 'next/server';
import { getBackgroundCheckService, type BackgroundCheckResult } from '@/lib/integrations/background-check-service';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const payload = await request.json();
    const { event, data, timestamp } = payload;

    console.log(`Processing background check webhook: ${event}`, {
      timestamp,
      checkId: data.checkId,
    });

    // Process based on event type
    switch (event) {
      case 'check.completed':
        await handleCheckCompleted(data);
        break;

      case 'check.failed':
        await handleCheckFailed(data);
        break;

      case 'check.requires_info':
        await handleRequiresInfo(data);
        break;

      case 'monitor.alert':
        await handleMonitorAlert(data);
        break;

      case 'license.expiring':
        await handleLicenseExpiring(data);
        break;

      default:
        console.warn(`Unknown webhook event: ${event}`);
    }

    return NextResponse.json({
      success: true,
      event,
      processed: new Date().toISOString(),
    });

  } catch (error) {
    console.error('Background check webhook error:', error);
    return NextResponse.json(
      { error: 'Webhook processing failed' },
      { status: 500 }
    );
  }
}

async function handleCheckCompleted(result: BackgroundCheckResult) {
  console.log('Background check completed:', result.checkId);

  try {
    // Find contractor by reference
    const contractor = await prisma.contractor.findFirst({
      where: {
        OR: [
          { backgroundCheckId: result.checkId },
          { id: result.requestId },
        ],
      },
    });

    if (!contractor) {
      console.error('Contractor not found for check:', result.checkId);
      return;
    }

    // Update contractor verification status
    const isApproved = result.overallResult === 'clear';
    
    await prisma.contractor.update({
      where: { id: contractor.id },
      data: {
        verificationStatus: isApproved ? 'verified' : 'requires_review',
        backgroundCheckId: result.checkId,
        backgroundCheckDate: new Date(),
        backgroundCheckExpiry: result.expiresAt,
        riskScore: result.riskScore,
        metadata: {
          ...contractor.metadata,
          backgroundCheck: {
            checkId: result.checkId,
            result: result.overallResult,
            completedAt: result.completedAt,
            reportUrl: result.reportUrl,
          },
        },
      },
    });

    // Update individual check results
    if (result.checks) {
      for (const check of result.checks) {
        await prisma.verificationCheck.create({
          data: {
            contractorId: contractor.id,
            type: check.type,
            status: check.status,
            result: check.result,
            details: check.details,
            flags: check.flags,
            checkId: result.checkId,
          },
        });
      }
    }

    // Update license information
    if (result.licenses) {
      for (const license of result.licenses) {
        await prisma.contractorLicense.upsert({
          where: {
            contractorId_type_number: {
              contractorId: contractor.id,
              type: license.type,
              number: license.number,
            },
          },
          update: {
            status: license.status,
            expiryDate: license.expiryDate,
            verificationStatus: license.verificationStatus,
          },
          create: {
            contractorId: contractor.id,
            type: license.type,
            number: license.number,
            status: license.status,
            issuedDate: license.issuedDate,
            expiryDate: license.expiryDate,
            verificationStatus: license.verificationStatus,
          },
        });
      }
    }

    // Send notification to contractor
    if (isApproved) {
      await sendEmail({
        to: contractor.email,
        subject: 'Background Check Completed - Approved',
        template: 'background-check-approved',
        data: {
          name: contractor.name,
          checkId: result.checkId,
          reportUrl: result.reportUrl,
        },
      });

      // Auto-approve contractor if all checks pass
      if (contractor.status === 'pending') {
        await prisma.contractor.update({
          where: { id: contractor.id },
          data: {
            status: 'active',
            approvedAt: new Date(),
          },
        });
      }
    } else {
      // Requires manual review
      await sendEmail({
        to: contractor.email,
        subject: 'Background Check - Additional Review Required',
        template: 'background-check-review',
        data: {
          name: contractor.name,
          checkId: result.checkId,
          issues: result.checks
            ?.filter(c => c.result === 'consider' || c.result === 'adverse')
            .map(c => c.type),
        },
      });

      // Notify admin for manual review
      await notifyAdminForReview(contractor, result);
    }

    console.log(`Background check processed for contractor ${contractor.id}`);

  } catch (error) {
    console.error('Failed to process background check completion:', error);
    throw error;
  }
}

async function handleCheckFailed(data: any) {
  console.log('Background check failed:', data.checkId);

  try {
    const contractor = await prisma.contractor.findFirst({
      where: { backgroundCheckId: data.checkId },
    });

    if (contractor) {
      await prisma.contractor.update({
        where: { id: contractor.id },
        data: {
          verificationStatus: 'failed',
          metadata: {
            ...contractor.metadata,
            backgroundCheckError: data.error,
          },
        },
      });

      // Send notification
      await sendEmail({
        to: contractor.email,
        subject: 'Background Check Failed',
        template: 'background-check-failed',
        data: {
          name: contractor.name,
          reason: data.error || 'Technical issue',
        },
      });
    }
  } catch (error) {
    console.error('Failed to handle check failure:', error);
  }
}

async function handleRequiresInfo(data: any) {
  console.log('Background check requires additional info:', data.checkId);

  try {
    const contractor = await prisma.contractor.findFirst({
      where: { backgroundCheckId: data.checkId },
    });

    if (contractor) {
      // Send email requesting additional information
      await sendEmail({
        to: contractor.email,
        subject: 'Additional Information Required',
        template: 'background-check-info-required',
        data: {
          name: contractor.name,
          fields: data.requiredFields,
          submitUrl: `${process.env.NEXT_PUBLIC_APP_URL}/contractor/verification/${data.checkId}`,
        },
      });

      // Update contractor status
      await prisma.contractor.update({
        where: { id: contractor.id },
        data: {
          verificationStatus: 'pending_info',
          metadata: {
            ...contractor.metadata,
            requiredInfo: data.requiredFields,
          },
        },
      });
    }
  } catch (error) {
    console.error('Failed to handle info request:', error);
  }
}

async function handleMonitorAlert(data: any) {
  console.log('Monitoring alert received:', data);

  try {
    // Find contractor by monitoring ID
    const contractor = await prisma.contractor.findFirst({
      where: {
        metadata: {
          path: ['monitoringId'],
          equals: data.monitoringId,
        },
      },
    });

    if (contractor) {
      // Create alert record
      await prisma.complianceAlert.create({
        data: {
          contractorId: contractor.id,
          type: data.alertType,
          severity: data.severity,
          description: data.description,
          details: data.details,
        },
      });

      // Update contractor status if severe
      if (data.severity === 'high' || data.severity === 'critical') {
        await prisma.contractor.update({
          where: { id: contractor.id },
          data: {
            status: 'suspended',
            suspendedReason: data.description,
          },
        });
      }

      // Notify contractor and admin
      await sendEmail({
        to: contractor.email,
        subject: 'Compliance Alert',
        template: 'compliance-alert',
        data: {
          name: contractor.name,
          alertType: data.alertType,
          description: data.description,
        },
      });
    }
  } catch (error) {
    console.error('Failed to handle monitor alert:', error);
  }
}

async function handleLicenseExpiring(data: any) {
  console.log('License expiring notification:', data);

  try {
    const contractor = await prisma.contractor.findFirst({
      where: { id: data.contractorId },
    });

    if (contractor) {
      // Send renewal reminder
      await sendEmail({
        to: contractor.email,
        subject: 'License Renewal Required',
        template: 'license-renewal',
        data: {
          name: contractor.name,
          licenseType: data.licenseType,
          expiryDate: data.expiryDate,
          renewUrl: `${process.env.NEXT_PUBLIC_APP_URL}/contractor/licenses`,
        },
      });

      // Create reminder in system
      await prisma.notification.create({
        data: {
          contractorId: contractor.id,
          type: 'license_expiry',
          title: 'License Expiring Soon',
          message: `Your ${data.licenseType} license expires on ${data.expiryDate}`,
          priority: 'high',
        },
      });
    }
  } catch (error) {
    console.error('Failed to handle license expiry:', error);
  }
}

async function notifyAdminForReview(contractor: any, result: BackgroundCheckResult) {
  // Send notification to admin dashboard
  await prisma.adminNotification.create({
    data: {
      type: 'background_check_review',
      title: 'Background Check Requires Review',
      message: `Contractor ${contractor.name} has issues in background check`,
      priority: 'high',
      metadata: {
        contractorId: contractor.id,
        checkId: result.checkId,
        issues: result.checks?.filter(c => c.result !== 'clear'),
      },
    },
  });

  // Send email to admin
  await sendEmail({
    to: process.env.ADMIN_EMAIL || 'admin@disaster-recovery.com',
    subject: 'Background Check Review Required',
    template: 'admin-background-check-review',
    data: {
      contractorName: contractor.name,
      contractorId: contractor.id,
      checkId: result.checkId,
      riskScore: result.riskScore,
      issues: result.checks?.filter(c => c.result !== 'clear'),
      reviewUrl: `${process.env.NEXT_PUBLIC_APP_URL}/admin/contractors/${contractor.id}/review`,
    },
  });
}
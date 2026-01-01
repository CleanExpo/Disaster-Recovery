import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';
import Stripe from 'stripe';

export const dynamic = 'force-dynamic';

const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY, { apiVersion: '2024-12-18.acacia' })
  : null;

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN']);
    }

    const profile = await prisma.contractorProfile.findUnique({
      where: { userId: user.id },
      select: { stripeConnectAccountId: true },
    });

    // No Stripe account yet
    if (!profile?.stripeConnectAccountId) {
      return NextResponse.json({
        success: true,
        payoutsConfigured: false,
        stripeConnectAccountId: null,
        status: 'not_started',
        message: 'Stripe Connect account not created yet',
      });
    }

    // Stripe not configured in environment
    if (!stripe) {
      return NextResponse.json({
        success: true,
        payoutsConfigured: false,
        stripeConnectAccountId: profile.stripeConnectAccountId,
        status: 'unknown',
        message: 'Stripe not configured',
      });
    }

    // Query Stripe for actual account status and capabilities
    try {
      const account = await stripe.accounts.retrieve(profile.stripeConnectAccountId);

      const chargesEnabled = account.charges_enabled;
      const payoutsEnabled = account.payouts_enabled;
      const detailsSubmitted = account.details_submitted;

      // Check for requirements
      const currentlyDue = account.requirements?.currently_due || [];
      const eventuallyDue = account.requirements?.eventually_due || [];
      const pendingVerification = account.requirements?.pending_verification || [];
      const errors = account.requirements?.errors || [];

      // Determine overall status
      let status: string;
      let message: string;
      let actionRequired: string | null = null;

      if (chargesEnabled && payoutsEnabled) {
        status = 'active';
        message = 'Account fully configured and ready';
      } else if (!detailsSubmitted) {
        status = 'incomplete';
        message = 'Onboarding not completed';
        actionRequired = 'Complete Stripe Connect onboarding';
      } else if (currentlyDue.length > 0) {
        status = 'requirements_due';
        message = `${currentlyDue.length} requirement(s) needed`;
        actionRequired = `Provide: ${currentlyDue.join(', ')}`;
      } else if (pendingVerification.length > 0) {
        status = 'pending_verification';
        message = 'Verification in progress';
        actionRequired = 'Wait for Stripe to verify your information';
      } else if (errors.length > 0) {
        status = 'restricted';
        message = 'Account has verification errors';
        actionRequired = `Fix errors: ${errors.map(e => e.requirement).join(', ')}`;
      } else if (!chargesEnabled || !payoutsEnabled) {
        status = 'pending';
        message = 'Account setup pending';
        actionRequired = 'Complete all verification steps in Stripe';
      } else {
        status = 'unknown';
        message = 'Unable to determine account status';
      }

      return NextResponse.json({
        success: true,
        payoutsConfigured: chargesEnabled && payoutsEnabled,
        stripeConnectAccountId: profile.stripeConnectAccountId,
        status,
        message,
        actionRequired,
        capabilities: {
          chargesEnabled,
          payoutsEnabled,
          detailsSubmitted,
        },
        requirements: {
          currentlyDue,
          eventuallyDue,
          pendingVerification,
          errors: errors.map(e => ({
            code: e.code,
            reason: e.reason,
            requirement: e.requirement,
          })),
        },
      });
    } catch (stripeError: any) {
      // Stripe API error - account might be invalid
      return NextResponse.json({
        success: true,
        payoutsConfigured: false,
        stripeConnectAccountId: profile.stripeConnectAccountId,
        status: 'error',
        message: stripeError.message || 'Failed to retrieve Stripe account',
        actionRequired: 'Re-connect your Stripe account',
      });
    }
  } catch (error) {
    return handleUnexpectedError(error);
  }
}


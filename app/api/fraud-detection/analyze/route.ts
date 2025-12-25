import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { z } from 'zod';
import { validateRequest, formatZodErrors } from '@/lib/validation';

const analyzeSchema = z.object({
  paymentId: z.string().uuid(),
});

interface RiskFactor {
  name: string;
  impact: number;
  description: string;
}

// Analyze a transaction for fraud risk
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const validation = validateRequest(analyzeSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: formatZodErrors(validation.errors)
        },
        { status: 400 }
      );
    }

    const { paymentId } = validation.data;

    // Get payment with related data
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        client: {
          include: {
            payments: {
              take: 10,
              orderBy: { createdAt: 'desc' },
            },
            loginAttempts: {
              take: 5,
              orderBy: { createdAt: 'desc' },
            },
          },
        },
        booking: true,
      },
    });

    if (!payment) {
      return NextResponse.json(
        { success: false, error: 'Payment not found' },
        { status: 404 }
      );
    }

    // Perform fraud analysis
    const riskFactors: RiskFactor[] = [];
    let riskScore = 0;

    // Factor 1: New account
    const accountAge = Date.now() - new Date(payment.client.createdAt).getTime();
    const daysSinceCreation = accountAge / (1000 * 60 * 60 * 24);

    if (daysSinceCreation < 1) {
      riskScore += 0.3;
      riskFactors.push({
        name: 'New Account',
        impact: 0.3,
        description: 'Account created less than 24 hours ago',
      });
    } else if (daysSinceCreation < 7) {
      riskScore += 0.15;
      riskFactors.push({
        name: 'Recent Account',
        impact: 0.15,
        description: 'Account created less than 7 days ago',
      });
    }

    // Factor 2: High value transaction
    if (payment.amount > 10000) {
      riskScore += 0.25;
      riskFactors.push({
        name: 'High Value',
        impact: 0.25,
        description: `Transaction amount ($${payment.amount}) exceeds $10,000`,
      });
    } else if (payment.amount > 5000) {
      riskScore += 0.1;
      riskFactors.push({
        name: 'Elevated Value',
        impact: 0.1,
        description: `Transaction amount ($${payment.amount}) exceeds $5,000`,
      });
    }

    // Factor 3: Multiple failed login attempts
    const failedLogins = payment.client.loginAttempts.filter(
      (attempt: any) => !attempt.success
    ).length;

    if (failedLogins >= 3) {
      riskScore += 0.2;
      riskFactors.push({
        name: 'Failed Login Attempts',
        impact: 0.2,
        description: `${failedLogins} failed login attempts recently`,
      });
    }

    // Factor 4: Unusual transaction pattern
    const recentPayments = payment.client.payments;
    const avgAmount = recentPayments.length > 0
      ? recentPayments.reduce((sum: number, p: any) => sum + p.amount, 0) / recentPayments.length
      : 0;

    if (avgAmount > 0 && payment.amount > avgAmount * 3) {
      riskScore += 0.2;
      riskFactors.push({
        name: 'Unusual Amount',
        impact: 0.2,
        description: `Amount is ${(payment.amount / avgAmount).toFixed(1)}x higher than average`,
      });
    }

    // Factor 5: Email not verified
    if (!payment.client.emailVerified) {
      riskScore += 0.15;
      riskFactors.push({
        name: 'Unverified Email',
        impact: 0.15,
        description: 'Client email has not been verified',
      });
    }

    // Determine recommendation
    let recommendation: 'APPROVE' | 'REVIEW' | 'REJECT';
    if (riskScore >= 0.7) {
      recommendation = 'REJECT';
    } else if (riskScore >= 0.4) {
      recommendation = 'REVIEW';
    } else {
      recommendation = 'APPROVE';
    }

    // Cap risk score at 1.0
    riskScore = Math.min(riskScore, 1.0);

    const assessment = {
      riskScore: Math.round(riskScore * 100) / 100,
      flags: riskFactors.map(f => f.name),
      recommendation,
      factors: riskFactors,
    };

    // Create or update fraud alert if risk is elevated
    if (riskScore >= 0.4) {
      await prisma.fraudAlert.upsert({
        where: { paymentId },
        create: {
          paymentId,
          riskScore,
          flags: riskFactors.map(f => f.name),
          factors: riskFactors,
          recommendation,
          reviewStatus: 'PENDING',
        },
        update: {
          riskScore,
          flags: riskFactors.map(f => f.name),
          factors: riskFactors,
          recommendation,
        },
      });
    }

    return NextResponse.json({
      success: true,
      data: assessment,
    });
  } catch (error) {
    console.error('Fraud analysis error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

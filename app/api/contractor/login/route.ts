import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import logger from '@/lib/logger';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // Log login attempt
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    logger.info('auth', `Contractor login attempt for username: ${username}`, {
      ipAddress,
      userAgent
    });

    // Try to find contractor by username or email
    const contractor = await prisma.contractor.findFirst({
      where: {
        OR: [
          { username: username.toLowerCase() },
          { email: username.toLowerCase() }
        ]
      },
      include: {
        companyProfile: true,
        subscription: true
      }
    });

    if (!contractor) {
      logger.warn('auth', `Login failed - contractor not found: ${username}`, {
        ipAddress,
        userAgent
      });
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, contractor.passwordHash);

    if (!isValidPassword) {
      logger.warn('auth', `Login failed - invalid password for contractor: ${contractor.id}`, {
        contractorId: contractor.id,
        ipAddress,
        userAgent
      });
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Check if account is active
    if (contractor.status !== 'APPROVED' && contractor.status !== 'PENDING') {
      logger.warn('auth', `Login failed - contractor account ${contractor.status}: ${contractor.id}`, {
        contractorId: contractor.id,
        status: contractor.status
      });
      return NextResponse.json(
        { error: `Account ${contractor.status.toLowerCase()}. Please contact support.` },
        { status: 403 }
      );
    }

    // Update last login
    await prisma.contractor.update({
      where: { id: contractor.id },
      data: { lastLoginAt: new Date() }
    });

    // Log successful login
    logger.logContractorLogin(contractor.id, true, ipAddress, userAgent);

    // Create audit log
    await prisma.contractorAuditLog.create({
      data: {
        contractorId: contractor.id,
        action: 'LOGIN',
        category: 'AUTH',
        details: JSON.stringify({
          ipAddress,
          userAgent,
          timestamp: new Date().toISOString()
        }),
        ipAddress,
        userAgent,
        performedBy: contractor.id,
        performedByType: 'CONTRACTOR'
      }
    });

    // Return contractor data (excluding sensitive information)
    const response = {
      id: contractor.id,
      username: contractor.username,
      email: contractor.email,
      companyName: contractor.companyProfile?.companyName || 'Not Set',
      status: contractor.status,
      emailVerified: contractor.emailVerified,
      twoFactorEnabled: contractor.twoFactorEnabled,
      onboardingCompleted: contractor.onboardingCompleted,
      subscription: contractor.subscription ? {
        tier: contractor.subscription.tier,
        status: contractor.subscription.status
      } : null,
      role: 'contractor'
    };

    return NextResponse.json(response);
  } catch (error: any) {
    logger.error('auth', 'Contractor login error', error);
    
    return NextResponse.json(
      { error: 'An error occurred during login' },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { verifyToken, generateVerificationToken } from '@/lib/auth';
import { prisma, findUserByEmail } from '@/lib/db';
import { validateRequest, formatZodErrors } from '@/lib/validation';

const verifyEmailSchema = z.object({
  token: z.string().min(1),
});

const resendVerificationSchema = z.object({
  email: z.string().email(),
});

// Verify email with token
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = validateRequest(verifyEmailSchema, body);
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

    const { token } = validation.data;

    // Verify token
    const decoded = verifyToken(token);
    if (!decoded || decoded.type !== 'email-verification') {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Check if token exists in DB
    const storedToken = await prisma.verificationToken.findFirst({
      where: {
        token,
        userId: decoded.userId,
        expiresAt: { gt: new Date() },
      },
    });

    if (!storedToken) {
      return NextResponse.json(
        { success: false, error: 'Invalid or expired token' },
        { status: 400 }
      );
    }

    // Update user and delete token
    await prisma.$transaction([
      prisma.user.update({
        where: { id: decoded.userId },
        data: { emailVerified: new Date() },
      }),
      prisma.verificationToken.delete({
        where: { id: storedToken.id },
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Email verified successfully',
    });
  } catch (error) {
    console.error('Email verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Resend verification email
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();

    const validation = validateRequest(resendVerificationSchema, body);
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

    const { email } = validation.data;

    const user = await findUserByEmail(email);
    if (!user) {
      // Return success for security
      return NextResponse.json({
        success: true,
        message: 'If the email exists, a verification email has been sent',
      });
    }

    if (user.emailVerified) {
      return NextResponse.json(
        { success: false, error: 'Email already verified' },
        { status: 400 }
      );
    }

    // Delete existing tokens
    await prisma.verificationToken.deleteMany({
      where: { userId: user.id },
    });

    // Generate new token
    const verificationToken = generateVerificationToken(user.id);

    // Store token
    await prisma.verificationToken.create({
      data: {
        userId: user.id,
        token: verificationToken,
        expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24 hours
      },
    });

    // TODO: Send verification email
    // await sendVerificationEmail(user.email, verificationToken);

    return NextResponse.json({
      success: true,
      message: 'If the email exists, a verification email has been sent',
    });
  } catch (error) {
    console.error('Resend verification error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

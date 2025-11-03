import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateToken, verifyPasswordSafe } from '@/lib/auth';
import { loginSchema } from '@/lib/validation-schemas';
import { handleValidationError, handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { ZodError } from 'zod';

/**
 * POST /api/auth/login
 * Authenticates user with email and password
 *
 * @implements Anthropic best practices:
 * - Centralized validation with Zod
 * - Timing-safe password comparison
 * - Structured error responses
 * - No sensitive data leakage
 */
export async function POST(request: NextRequest) {
  try {
    // Parse and validate request body
    const body = await request.json();
    const validatedData = loginSchema.parse(body);

    // Find user by email
    const user = await prisma.user.findUnique({
      where: { email: validatedData.email },
    });

    // Use timing-safe verification to prevent user enumeration attacks
    // Always perform password check even if user doesn't exist
    const hashedPassword = user?.password || '$2a$10$dummyhashtopreventtimingleak';
    const isValidPassword = await verifyPasswordSafe(validatedData.password, hashedPassword);

    // Check both user existence and password validity
    if (!user || !user.password || !isValidPassword) {
      return createErrorResponse(
        ErrorCode.UNAUTHORIZED,
        'Invalid email or password',
        401
      );
    }

    // Generate JWT token
    const token = generateToken(user);

    // Return success response with user data (excluding password)
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          userType: user.userType,
          avatar: user.avatar,
        },
        token,
      },
    });

  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }

    // Handle all other unexpected errors
    return handleUnexpectedError(error);
  }
}

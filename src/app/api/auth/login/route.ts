import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { 
  generateAccessToken, 
  generateRefreshToken, 
  verifyPassword,
  hashPassword,
  UserRole,
  getRolePermissions 
} from '@/lib/jwt-auth';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

// SECURITY: Production users stored in database only - NO hardcoded credentials
const isDevelopment = process.env.NODE_ENV === 'development';

// Development-only demo users (removed in production)
const getDemoUsers = () => {
  if (!isDevelopment) {
    return []; // No demo users in production
  }
  
  // Demo users only available in development with environment flag
  if (process.env.ENABLE_DEMO_USERS !== 'true') {
    return [];
  }
  
  return [
    {
      id: 'dev-admin',
      email: 'dev-admin@local.dev',
      name: 'Development Admin',
      password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY3pp/eQhJ2XWIa',
      role: UserRole.ADMIN,
      companyId: 'dev-company',
    },
  ];
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = loginSchema.parse(body);
    
    // SECURITY: Find user in database (with fallback to demo users in development only)
    const demoUsers = getDemoUsers();
    let user = null;
    
    // Try database first (production and development)
    try {
      // In production, this would query the User table
      // user = await prisma.user.findUnique({
      //   where: { email: validatedData.email.toLowerCase() }
      // });
    } catch (error) {
      console.error('Database user lookup failed:', error);
    }
    
    // Fallback to demo users only in development
    if (!user && isDevelopment) {
      user = demoUsers.find(u => u.email.toLowerCase() === validatedData.email.toLowerCase());
    }
    
    if (!user) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password',
      }, { status: 401 });
    }
    
    // Verify password
    const isPasswordValid = await verifyPassword(validatedData.password, user.password);
    
    if (!isPasswordValid) {
      return NextResponse.json({
        success: false,
        message: 'Invalid email or password',
      }, { status: 401 });
    }
    
    // Get role-based permissions
    const permissions = getRolePermissions(user.role);
    
    // Generate tokens
    const userPayload = {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      companyId: user.companyId,
      permissions,
    };
    
    const accessToken = await generateAccessToken(userPayload);
    const refreshToken = await generateRefreshToken(user.id);
    
    // Log successful login
    console.log(`Login successful for user: ${user.email}`);
    
    // Return success response with tokens
    return NextResponse.json({
      success: true,
      message: 'Login successful',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
        companyId: user.companyId,
      },
      tokens: {
        access: accessToken,
        refresh: refreshToken,
      },
      permissions,
    }, { status: 200 });
    
  } catch (error) {
    console.error('Login error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        success: false,
        message: 'Validation error',
        errors: error.errors.map(e => ({
          field: e.path.join('.'),
          message: e.message,
        })),
      }, { status: 400 });
    }
    
    return NextResponse.json({
      success: false,
      message: 'An error occurred during login. Please try again.',
    }, { status: 500 });
  }
}

export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorisation',
    },
  });
}
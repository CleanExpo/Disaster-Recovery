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

// Demo users with hashed passwords (in production, use database)
const demoUsers = [
  {
    id: '1',
    email: 'admin@disasterrecovery.com.au',
    name: 'Admin User',
    password: '$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY3pp/eQhJ2XWIa', // Admin123!
    role: UserRole.ADMIN,
    companyId: 'disaster-recovery',
  },
  {
    id: '2',
    email: 'tech@disasterrecovery.com.au',
    name: 'Technical User',
    password: '$2a$12$B2kZV5h6Qz5BWfDxXNhaUuGJn0yYjL16wW5fpCQp8ufgPz9MJg6QS', // Tech123!
    role: UserRole.TECHNICIAN,
    companyId: 'disaster-recovery',
  },
  {
    id: '3',
    email: 'contractor@demo.com',
    name: 'Contractor User',
    password: '$2a$12$Q6g2P8X9ZwB2Rt4aN3jTH.0kfSUJKgmJt.KHiYy0yXTJx9sU0LF.a', // Demo123!
    role: UserRole.CONTRACTOR,
    companyId: 'contractor-001',
  },
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = loginSchema.parse(body);
    
    // Find user by email (in production, query database)
    const user = demoUsers.find(u => u.email.toLowerCase() === validatedData.email.toLowerCase());
    
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
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
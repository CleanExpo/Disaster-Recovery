import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { generateToken } from '@/lib/auth';
import { z } from 'zod';

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  userType: z.enum(['CONTRACTOR', 'CLIENT']),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name, userType } = registerSchema.parse(body);

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        userType,
      },
    });

    // Generate token
    const token = generateToken(user);

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
        avatar: user.avatar,
      },
      token,
    });
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { error: 'Registration failed' },
      { status: 500 }
    );
  }
}

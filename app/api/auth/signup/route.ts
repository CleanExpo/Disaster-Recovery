import { NextResponse } from 'next/server';
import { randomUUID } from 'node:crypto';
import bcrypt from 'bcryptjs';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';

export async function POST(req: Request) {
  const log = requestLogger(req, { route: '/api/auth/signup' });
  try {
    const { name, email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        id: randomUUID(),
        name,
        email,
        password: hashedPassword,
        userType: 'ADMIN',
      },
    });

    return NextResponse.json({
      message: 'User created successfully',
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        userType: user.userType,
      },
    });
  } catch (error) {
    log.error('signup error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, {
      tags: { route: '/api/auth/signup' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
  }
}

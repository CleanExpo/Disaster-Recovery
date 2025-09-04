import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession();
    
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Find user by email and return user info with permissions
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        // TODO: Add permissions and lastLoginAt fields to User model when needed
        // permissions: true,
        // lastLoginAt: true,
        createdAt: true
      }
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // TODO: Update last login time when lastLoginAt field is added
    // await prisma.user.update({
    //   where: { id: user.id },
    //   data: { lastLoginAt: new Date() }
    // });

    return NextResponse.json({
      user: {
        ...user,
        // TODO: Parse permissions when field is added
        // permissions: user.permissions ? JSON.parse(user.permissions as string) : []
        permissions: []
      }
    });

  } catch (error) {
    console.error('Error fetching current user:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
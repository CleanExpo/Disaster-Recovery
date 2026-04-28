import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { captureException } from '@/lib/observability/vercel';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const session = await getServerSession();

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        email: true,
        name: true,
        userType: true,
        createdAt: true,
      },
    });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({
      user: {
        ...user,
        permissions: [] as string[],
      },
    });
  } catch (error) {
    captureException(error, {
      tags: { route: '/api/auth/current-user', model: 'user', op: 'findUnique' },
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

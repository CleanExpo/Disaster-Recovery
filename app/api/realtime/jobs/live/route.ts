import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Get all active jobs for current user
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { contractor: true },
    })

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get jobs based on user type
    let jobs

    if (user.contractor) {
      // Contractor: Get assigned jobs
      jobs = await prisma.serviceRequest.findMany({
        where: {
          // Add contractor assignment filter when schema supports it
          // contractorId: user.contractor.id,
        },
        orderBy: { createdAt: 'desc' },
        take: 50,
        include: {
          client: {
            select: {
              id: true,
              name: true,
              australianPhoneNumber: true,
              suburb: true,
              australianState: true,
            },
          },
        },
      })
    } else {
      // Client: Get their own requests
      jobs = await prisma.serviceRequest.findMany({
        where: {
          clientId: user.id,
        },
        orderBy: { createdAt: 'desc' },
        take: 20,
      })
    }

    return NextResponse.json({
      jobs,
      userType: user.contractor ? 'contractor' : 'client',
      userId: user.id,
    })
  } catch (error) {
    console.error('Error fetching live jobs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch jobs' },
      { status: 500 }
    )
  }
}

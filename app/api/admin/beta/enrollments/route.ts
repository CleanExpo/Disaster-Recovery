import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET - List all enrollments with filtering
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { userType: true },
    })

    if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.userType)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { searchParams } = new URL(request.url)
    const programId = searchParams.get('programId')
    const status = searchParams.get('status')

    const whereClause: Record<string, unknown> = {}

    if (programId) {
      whereClause.programId = programId
    }

    if (status) {
      whereClause.status = status
    }

    const enrollments = await prisma.betaEnrollment.findMany({
      where: whereClause,
      include: {
        program: {
          select: {
            id: true,
            name: true,
            featureArea: true,
          },
        },
        contractor: {
          select: {
            id: true,
            businessName: true,
            user: {
              select: {
                name: true,
                email: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({ enrollments })
  } catch (error) {
    console.error('Error fetching enrollments:', error)
    return NextResponse.json(
      { error: 'Failed to fetch enrollments' },
      { status: 500 }
    )
  }
}

// Validation schema for creating enrollment
const createEnrollmentSchema = z.object({
  programId: z.string().min(1, 'Program ID is required'),
  contractorId: z.string().min(1, 'Contractor ID is required'),
  tierOverride: z.enum(['BASIC', 'PRO', 'ENTERPRISE']).optional(),
  adminNotes: z.string().optional(),
  sendInvitationEmail: z.boolean().default(true),
})

// POST - Invite/enroll a contractor to beta
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const adminUser = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { id: true, userType: true },
    })

    if (!adminUser || !['ADMIN', 'SUPER_ADMIN'].includes(adminUser.userType)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validationResult = createEnrollmentSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { programId, contractorId, tierOverride, adminNotes, sendInvitationEmail } =
      validationResult.data

    // Check program exists and is active
    const program = await prisma.betaProgram.findUnique({
      where: { id: programId },
      include: {
        _count: {
          select: { enrollments: true },
        },
      },
    })

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    if (!program.isActive) {
      return NextResponse.json({ error: 'Program is not active' }, { status: 400 })
    }

    // Check max participants
    if (program._count.enrollments >= program.maxParticipants) {
      return NextResponse.json(
        { error: 'Program has reached maximum participants' },
        { status: 400 }
      )
    }

    // Check contractor exists
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
      include: {
        user: {
          select: { name: true, email: true },
        },
      },
    })

    if (!contractor) {
      return NextResponse.json({ error: 'Contractor not found' }, { status: 404 })
    }

    // Check if already enrolled
    const existingEnrollment = await prisma.betaEnrollment.findUnique({
      where: {
        programId_contractorId: {
          programId,
          contractorId,
        },
      },
    })

    if (existingEnrollment) {
      return NextResponse.json(
        { error: 'Contractor already enrolled in this program' },
        { status: 400 }
      )
    }

    // Create enrollment
    const enrollment = await prisma.betaEnrollment.create({
      data: {
        programId,
        contractorId,
        status: 'INVITED',
        invitedBy: adminUser.id,
        tierOverride: tierOverride || 'PRO', // Default to PRO tier for beta
        adminNotes,
      },
      include: {
        program: true,
        contractor: {
          include: {
            user: {
              select: { name: true, email: true },
            },
          },
        },
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'BETA_ENROLLMENT_CREATED',
        entityType: 'BetaEnrollment',
        entityId: enrollment.id,
        userId: adminUser.id,
        newValues: {
          programId,
          contractorId,
          tierOverride: tierOverride || 'PRO',
        },
      },
    })

    // TODO: Send invitation email if sendInvitationEmail is true
    if (sendInvitationEmail && contractor.user.email) {
      // Email will be implemented in the email templates step
      console.log(`Would send beta invitation email to ${contractor.user.email}`)
    }

    return NextResponse.json({ enrollment }, { status: 201 })
  } catch (error) {
    console.error('Error creating enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to create enrollment' },
      { status: 500 }
    )
  }
}

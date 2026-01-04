import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET - List all beta programs with participant counts
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    // Check admin role
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { userType: true },
    })

    if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.userType)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const programs = await prisma.betaProgram.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: {
            enrollments: true,
            feedback: true,
            npsSurveys: true,
          },
        },
        enrollments: {
          where: { status: 'ACTIVE' },
          select: { id: true },
        },
      },
    })

    // Transform to include active participant count
    const programsWithStats = programs.map((program) => ({
      id: program.id,
      name: program.name,
      description: program.description,
      featureArea: program.featureArea,
      startDate: program.startDate,
      endDate: program.endDate,
      isActive: program.isActive,
      maxParticipants: program.maxParticipants,
      createdAt: program.createdAt,
      stats: {
        totalEnrollments: program._count.enrollments,
        activeParticipants: program.enrollments.length,
        totalFeedback: program._count.feedback,
        totalNpsSurveys: program._count.npsSurveys,
      },
    }))

    return NextResponse.json({ programs: programsWithStats })
  } catch (error) {
    console.error('Error fetching beta programs:', error)
    return NextResponse.json(
      { error: 'Failed to fetch beta programs' },
      { status: 500 }
    )
  }
}

// Validation schema for creating a program
const createProgramSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  featureArea: z.string().min(1, 'Feature area is required'),
  startDate: z.string().transform((s) => new Date(s)),
  endDate: z.string().transform((s) => new Date(s)),
  maxParticipants: z.number().min(1).max(100).default(10),
})

// POST - Create a new beta program
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    // Check admin role
    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      select: { userType: true },
    })

    if (!user || !['ADMIN', 'SUPER_ADMIN'].includes(user.userType)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const body = await request.json()
    const validationResult = createProgramSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { name, description, featureArea, startDate, endDate, maxParticipants } =
      validationResult.data

    // Validate dates
    if (endDate <= startDate) {
      return NextResponse.json(
        { error: 'End date must be after start date' },
        { status: 400 }
      )
    }

    const program = await prisma.betaProgram.create({
      data: {
        name,
        description,
        featureArea,
        startDate,
        endDate,
        maxParticipants,
        isActive: true,
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'BETA_PROGRAM_CREATED',
        entityType: 'BetaProgram',
        entityId: program.id,
        userId: session.user.email!,
        newValues: {
          name,
          featureArea,
          startDate: startDate.toISOString(),
          endDate: endDate.toISOString(),
          maxParticipants,
        },
      },
    })

    return NextResponse.json({ program }, { status: 201 })
  } catch (error) {
    console.error('Error creating beta program:', error)
    return NextResponse.json(
      { error: 'Failed to create beta program' },
      { status: 500 }
    )
  }
}

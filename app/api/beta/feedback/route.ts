import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET - Get contractor's submitted feedback
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: {
        contractor: {
          select: { id: true },
        },
      },
    })

    if (!user?.contractor) {
      return NextResponse.json({ error: 'Contractor not found' }, { status: 404 })
    }

    const { searchParams } = new URL(request.url)
    const programId = searchParams.get('programId')

    const whereClause: Record<string, unknown> = {
      contractorId: user.contractor.id,
    }

    if (programId) {
      whereClause.programId = programId
    }

    const feedback = await prisma.betaFeedback.findMany({
      where: whereClause,
      include: {
        program: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json({
      feedback: feedback.map((f) => ({
        id: f.id,
        program: f.program,
        category: f.category,
        title: f.title,
        description: f.description,
        priority: f.priority,
        status: f.status,
        adminResponse: f.adminResponse,
        createdAt: f.createdAt,
        updatedAt: f.updatedAt,
      })),
    })
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}

// Feedback submission schema
const submitFeedbackSchema = z.object({
  programId: z.string().min(1, 'Program ID is required'),
  category: z.enum(['BUG_REPORT', 'FEATURE_REQUEST', 'USABILITY_ISSUE', 'GENERAL_FEEDBACK']),
  title: z.string().min(1, 'Title is required').max(200),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  screenshotUrl: z.string().url().optional(),
  pageUrl: z.string().optional(),
  deviceType: z.string().optional(),
})

// POST - Submit new feedback
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorised' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: {
        contractor: {
          select: { id: true },
        },
      },
    })

    if (!user?.contractor) {
      return NextResponse.json({ error: 'Contractor not found' }, { status: 404 })
    }

    const body = await request.json()
    const validationResult = submitFeedbackSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const {
      programId,
      category,
      title,
      description,
      priority,
      screenshotUrl,
      pageUrl,
      deviceType,
    } = validationResult.data

    // Verify contractor is enrolled in this program
    const enrollment = await prisma.betaEnrollment.findFirst({
      where: {
        programId,
        contractorId: user.contractor.id,
        status: 'ACTIVE',
      },
      include: {
        program: {
          select: {
            id: true,
            name: true,
            isActive: true,
          },
        },
      },
    })

    if (!enrollment) {
      return NextResponse.json(
        { error: 'You are not enrolled in this beta program' },
        { status: 403 }
      )
    }

    if (!enrollment.program.isActive) {
      return NextResponse.json(
        { error: 'Beta program is no longer active' },
        { status: 400 }
      )
    }

    // Create the feedback
    const feedback = await prisma.betaFeedback.create({
      data: {
        programId,
        contractorId: user.contractor.id,
        category,
        title,
        description,
        priority: priority || 'medium',
        screenshotUrl,
        pageUrl,
        deviceType,
        status: 'new',
        isReviewed: false,
      },
      include: {
        program: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'BETA_FEEDBACK_SUBMITTED',
        entityType: 'BetaFeedback',
        entityId: feedback.id,
        userId: user.id,
        newValues: {
          programId,
          category,
          title,
          priority: priority || 'medium',
        },
      },
    })

    return NextResponse.json(
      {
        message: 'Feedback submitted successfully',
        feedback: {
          id: feedback.id,
          program: feedback.program,
          category: feedback.category,
          title: feedback.title,
          status: feedback.status,
          createdAt: feedback.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting feedback:', error)
    return NextResponse.json(
      { error: 'Failed to submit feedback' },
      { status: 500 }
    )
  }
}

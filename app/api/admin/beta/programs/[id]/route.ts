import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET - Get program details with enrollments
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const program = await prisma.betaProgram.findUnique({
      where: { id: params.id },
      include: {
        enrollments: {
          include: {
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
        },
        feedback: {
          orderBy: { createdAt: 'desc' },
          take: 50,
        },
        npsSurveys: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!program) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    // Calculate NPS stats
    const npsScores = program.npsSurveys.map((s) => s.score)
    const promoters = npsScores.filter((s) => s >= 9).length
    const passives = npsScores.filter((s) => s >= 7 && s <= 8).length
    const detractors = npsScores.filter((s) => s <= 6).length
    const total = npsScores.length
    const npsScore =
      total > 0
        ? Math.round(((promoters - detractors) / total) * 100)
        : null

    // Calculate feedback stats
    const feedbackByCategory = {
      BUG_REPORT: program.feedback.filter((f) => f.category === 'BUG_REPORT').length,
      FEATURE_REQUEST: program.feedback.filter((f) => f.category === 'FEATURE_REQUEST').length,
      USABILITY_ISSUE: program.feedback.filter((f) => f.category === 'USABILITY_ISSUE').length,
      GENERAL_FEEDBACK: program.feedback.filter((f) => f.category === 'GENERAL_FEEDBACK').length,
    }

    const feedbackByStatus = {
      new: program.feedback.filter((f) => f.status === 'new').length,
      in_review: program.feedback.filter((f) => f.status === 'in_review').length,
      resolved: program.feedback.filter((f) => f.status === 'resolved').length,
      wont_fix: program.feedback.filter((f) => f.status === 'wont_fix').length,
    }

    return NextResponse.json({
      program: {
        ...program,
        stats: {
          activeParticipants: program.enrollments.filter((e) => e.status === 'ACTIVE').length,
          invitedParticipants: program.enrollments.filter((e) => e.status === 'INVITED').length,
          totalFeedback: program.feedback.length,
          unreviewedFeedback: program.feedback.filter((f) => !f.isReviewed).length,
          nps: {
            score: npsScore,
            promoters,
            passives,
            detractors,
            total,
          },
          feedbackByCategory,
          feedbackByStatus,
        },
      },
    })
  } catch (error) {
    console.error('Error fetching beta program:', error)
    return NextResponse.json(
      { error: 'Failed to fetch beta program' },
      { status: 500 }
    )
  }
}

// Update program schema
const updateProgramSchema = z.object({
  name: z.string().min(1).optional(),
  description: z.string().optional(),
  startDate: z.string().transform((s) => new Date(s)).optional(),
  endDate: z.string().transform((s) => new Date(s)).optional(),
  isActive: z.boolean().optional(),
  maxParticipants: z.number().min(1).max(100).optional(),
})

// PATCH - Update program settings
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const existing = await prisma.betaProgram.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    const body = await request.json()
    const validationResult = updateProgramSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const program = await prisma.betaProgram.update({
      where: { id: params.id },
      data: validationResult.data,
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'BETA_PROGRAM_UPDATED',
        entityType: 'BetaProgram',
        entityId: program.id,
        userId: session.user.email!,
        oldValues: existing,
        newValues: validationResult.data,
      },
    })

    return NextResponse.json({ program })
  } catch (error) {
    console.error('Error updating beta program:', error)
    return NextResponse.json(
      { error: 'Failed to update beta program' },
      { status: 500 }
    )
  }
}

// DELETE - Archive/delete program
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const existing = await prisma.betaProgram.findUnique({
      where: { id: params.id },
      include: {
        _count: {
          select: { enrollments: true },
        },
      },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Program not found' }, { status: 404 })
    }

    // If there are enrollments, just deactivate instead of delete
    if (existing._count.enrollments > 0) {
      await prisma.betaProgram.update({
        where: { id: params.id },
        data: { isActive: false },
      })

      return NextResponse.json({
        message: 'Program deactivated (has enrollments)',
        archived: true,
      })
    }

    // No enrollments, safe to delete
    await prisma.betaProgram.delete({
      where: { id: params.id },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'BETA_PROGRAM_DELETED',
        entityType: 'BetaProgram',
        entityId: params.id,
        userId: session.user.email!,
        oldValues: existing,
      },
    })

    return NextResponse.json({ message: 'Program deleted', deleted: true })
  } catch (error) {
    console.error('Error deleting beta program:', error)
    return NextResponse.json(
      { error: 'Failed to delete beta program' },
      { status: 500 }
    )
  }
}

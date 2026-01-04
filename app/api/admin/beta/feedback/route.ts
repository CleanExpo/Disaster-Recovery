import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET - List all feedback with filtering
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
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const isReviewed = searchParams.get('isReviewed')
    const priority = searchParams.get('priority')

    const whereClause: Record<string, unknown> = {}

    if (programId) {
      whereClause.programId = programId
    }

    if (category) {
      whereClause.category = category
    }

    if (status) {
      whereClause.status = status
    }

    if (isReviewed !== null && isReviewed !== undefined) {
      whereClause.isReviewed = isReviewed === 'true'
    }

    if (priority) {
      whereClause.priority = priority
    }

    const feedback = await prisma.betaFeedback.findMany({
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
      orderBy: [
        { isReviewed: 'asc' },
        { createdAt: 'desc' },
      ],
    })

    // Calculate summary stats
    const stats = {
      total: feedback.length,
      unreviewed: feedback.filter((f) => !f.isReviewed).length,
      byCategory: {
        BUG_REPORT: feedback.filter((f) => f.category === 'BUG_REPORT').length,
        FEATURE_REQUEST: feedback.filter((f) => f.category === 'FEATURE_REQUEST').length,
        USABILITY_ISSUE: feedback.filter((f) => f.category === 'USABILITY_ISSUE').length,
        GENERAL_FEEDBACK: feedback.filter((f) => f.category === 'GENERAL_FEEDBACK').length,
      },
      byStatus: {
        new: feedback.filter((f) => f.status === 'new').length,
        in_review: feedback.filter((f) => f.status === 'in_review').length,
        resolved: feedback.filter((f) => f.status === 'resolved').length,
        wont_fix: feedback.filter((f) => f.status === 'wont_fix').length,
      },
      byPriority: {
        critical: feedback.filter((f) => f.priority === 'critical').length,
        high: feedback.filter((f) => f.priority === 'high').length,
        medium: feedback.filter((f) => f.priority === 'medium').length,
        low: feedback.filter((f) => f.priority === 'low').length,
      },
    }

    return NextResponse.json({ feedback, stats })
  } catch (error) {
    console.error('Error fetching feedback:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feedback' },
      { status: 500 }
    )
  }
}

// Update feedback schema
const updateFeedbackSchema = z.object({
  id: z.string().min(1, 'Feedback ID is required'),
  status: z.enum(['new', 'in_review', 'resolved', 'wont_fix']).optional(),
  priority: z.enum(['low', 'medium', 'high', 'critical']).optional(),
  isReviewed: z.boolean().optional(),
  adminResponse: z.string().optional(),
})

// PATCH - Update feedback status
export async function PATCH(request: NextRequest) {
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
    const validationResult = updateFeedbackSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { id, status, priority, isReviewed, adminResponse } = validationResult.data

    const existing = await prisma.betaFeedback.findUnique({
      where: { id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Feedback not found' }, { status: 404 })
    }

    // Build update data
    const updateData: Record<string, unknown> = {}

    if (status !== undefined) {
      updateData.status = status
    }

    if (priority !== undefined) {
      updateData.priority = priority
    }

    if (isReviewed !== undefined) {
      updateData.isReviewed = isReviewed
      if (isReviewed) {
        updateData.reviewedBy = adminUser.id
      }
    }

    if (adminResponse !== undefined) {
      updateData.adminResponse = adminResponse
    }

    const feedback = await prisma.betaFeedback.update({
      where: { id },
      data: updateData,
      include: {
        program: {
          select: {
            id: true,
            name: true,
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
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'BETA_FEEDBACK_UPDATED',
        entityType: 'BetaFeedback',
        entityId: feedback.id,
        userId: adminUser.id,
        oldValues: {
          status: existing.status,
          priority: existing.priority,
          isReviewed: existing.isReviewed,
        },
        newValues: updateData,
      },
    })

    return NextResponse.json({ feedback })
  } catch (error) {
    console.error('Error updating feedback:', error)
    return NextResponse.json(
      { error: 'Failed to update feedback' },
      { status: 500 }
    )
  }
}

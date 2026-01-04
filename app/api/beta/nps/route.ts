import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// GET - Check if NPS survey is due and get past surveys
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

    // Get active enrollments
    const enrollments = await prisma.betaEnrollment.findMany({
      where: {
        contractorId: user.contractor.id,
        status: 'ACTIVE',
        program: {
          isActive: true,
        },
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

    if (enrollments.length === 0) {
      return NextResponse.json({
        isDue: false,
        surveys: [],
        message: 'No active beta enrollments',
      })
    }

    // Filter by programId if provided
    const relevantEnrollments = programId
      ? enrollments.filter((e) => e.programId === programId)
      : enrollments

    // Check when last NPS was submitted for each program
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const surveysWithDueStatus = await Promise.all(
      relevantEnrollments.map(async (enrollment) => {
        const lastSurvey = await prisma.betaNPSSurvey.findFirst({
          where: {
            programId: enrollment.programId,
            contractorId: user.contractor!.id,
          },
          orderBy: { createdAt: 'desc' },
        })

        const isDue = !lastSurvey || lastSurvey.createdAt < oneWeekAgo

        return {
          program: enrollment.program,
          lastSurveyAt: lastSurvey?.createdAt || null,
          lastScore: lastSurvey?.score || null,
          isDue,
        }
      })
    )

    // Get survey history
    const whereClause: Record<string, unknown> = {
      contractorId: user.contractor.id,
    }

    if (programId) {
      whereClause.programId = programId
    }

    const pastSurveys = await prisma.betaNPSSurvey.findMany({
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
      take: 10,
    })

    const anyDue = surveysWithDueStatus.some((s) => s.isDue)

    return NextResponse.json({
      isDue: anyDue,
      programs: surveysWithDueStatus,
      surveys: pastSurveys.map((s) => ({
        id: s.id,
        program: s.program,
        score: s.score,
        followUpAnswer: s.followUpAnswer,
        surveyTrigger: s.surveyTrigger,
        createdAt: s.createdAt,
      })),
    })
  } catch (error) {
    console.error('Error checking NPS status:', error)
    return NextResponse.json(
      { error: 'Failed to check NPS status' },
      { status: 500 }
    )
  }
}

// NPS submission schema
const submitNpsSchema = z.object({
  programId: z.string().min(1, 'Program ID is required'),
  score: z.number().min(0).max(10),
  followUpAnswer: z.string().optional(),
  surveyTrigger: z.enum(['weekly', 'feature_use', 'manual']).optional(),
})

// POST - Submit NPS survey
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
    const validationResult = submitNpsSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { programId, score, followUpAnswer, surveyTrigger } = validationResult.data

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

    // Create the NPS survey
    const survey = await prisma.betaNPSSurvey.create({
      data: {
        programId,
        contractorId: user.contractor.id,
        score,
        followUpAnswer,
        surveyTrigger: surveyTrigger || 'manual',
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

    // Determine NPS category
    let category: 'promoter' | 'passive' | 'detractor'
    if (score >= 9) {
      category = 'promoter'
    } else if (score >= 7) {
      category = 'passive'
    } else {
      category = 'detractor'
    }

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'BETA_NPS_SUBMITTED',
        entityType: 'BetaNPSSurvey',
        entityId: survey.id,
        userId: user.id,
        newValues: {
          programId,
          score,
          category,
        },
      },
    })

    return NextResponse.json(
      {
        message: 'NPS survey submitted successfully',
        survey: {
          id: survey.id,
          program: survey.program,
          score: survey.score,
          category,
          createdAt: survey.createdAt,
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error submitting NPS survey:', error)
    return NextResponse.json(
      { error: 'Failed to submit NPS survey' },
      { status: 500 }
    )
  }
}

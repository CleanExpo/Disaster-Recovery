import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Beta program analytics dashboard
export async function GET() {
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

    // Fetch all active programs with their data
    const programs = await prisma.betaProgram.findMany({
      where: { isActive: true },
      include: {
        enrollments: {
          include: {
            contractor: {
              select: {
                id: true,
                businessName: true,
              },
            },
          },
        },
        feedback: true,
        npsSurveys: true,
      },
    })

    // Calculate overall NPS
    const allNpsScores = programs.flatMap((p) => p.npsSurveys.map((s) => s.score))
    const totalResponses = allNpsScores.length
    const promoters = allNpsScores.filter((s) => s >= 9).length
    const passives = allNpsScores.filter((s) => s >= 7 && s <= 8).length
    const detractors = allNpsScores.filter((s) => s <= 6).length
    const overallNps = totalResponses > 0
      ? Math.round(((promoters - detractors) / totalResponses) * 100)
      : null

    // Calculate NPS trend (last 4 weeks)
    const fourWeeksAgo = new Date()
    fourWeeksAgo.setDate(fourWeeksAgo.getDate() - 28)

    const weeklyNps: { week: string; score: number | null; responses: number }[] = []
    for (let i = 3; i >= 0; i--) {
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - (i + 1) * 7)
      const weekEnd = new Date()
      weekEnd.setDate(weekEnd.getDate() - i * 7)

      const weekScores = allNpsScores.length > 0
        ? programs.flatMap((p) =>
            p.npsSurveys
              .filter((s) => s.createdAt >= weekStart && s.createdAt < weekEnd)
              .map((s) => s.score)
          )
        : []

      const weekPromoters = weekScores.filter((s) => s >= 9).length
      const weekDetractors = weekScores.filter((s) => s <= 6).length
      const weekTotal = weekScores.length
      const weekNps = weekTotal > 0
        ? Math.round(((weekPromoters - weekDetractors) / weekTotal) * 100)
        : null

      weeklyNps.push({
        week: `Week ${4 - i}`,
        score: weekNps,
        responses: weekTotal,
      })
    }

    // Aggregate feedback stats
    const allFeedback = programs.flatMap((p) => p.feedback)
    const feedbackStats = {
      total: allFeedback.length,
      unreviewed: allFeedback.filter((f) => !f.isReviewed).length,
      thisWeek: allFeedback.filter((f) => {
        const oneWeekAgo = new Date()
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
        return f.createdAt >= oneWeekAgo
      }).length,
      byCategory: {
        BUG_REPORT: allFeedback.filter((f) => f.category === 'BUG_REPORT').length,
        FEATURE_REQUEST: allFeedback.filter((f) => f.category === 'FEATURE_REQUEST').length,
        USABILITY_ISSUE: allFeedback.filter((f) => f.category === 'USABILITY_ISSUE').length,
        GENERAL_FEEDBACK: allFeedback.filter((f) => f.category === 'GENERAL_FEEDBACK').length,
      },
      byStatus: {
        new: allFeedback.filter((f) => f.status === 'new').length,
        in_review: allFeedback.filter((f) => f.status === 'in_review').length,
        resolved: allFeedback.filter((f) => f.status === 'resolved').length,
        wont_fix: allFeedback.filter((f) => f.status === 'wont_fix').length,
      },
      byPriority: {
        critical: allFeedback.filter((f) => f.priority === 'critical').length,
        high: allFeedback.filter((f) => f.priority === 'high').length,
        medium: allFeedback.filter((f) => f.priority === 'medium').length,
        low: allFeedback.filter((f) => f.priority === 'low').length,
      },
    }

    // Enrollment stats
    const allEnrollments = programs.flatMap((p) => p.enrollments)
    const enrollmentStats = {
      total: allEnrollments.length,
      invited: allEnrollments.filter((e) => e.status === 'INVITED').length,
      active: allEnrollments.filter((e) => e.status === 'ACTIVE').length,
      completed: allEnrollments.filter((e) => e.status === 'COMPLETED').length,
      withdrawn: allEnrollments.filter((e) => e.status === 'WITHDRAWN').length,
    }

    // Per-program stats
    const programStats = programs.map((program) => {
      const programNpsScores = program.npsSurveys.map((s) => s.score)
      const pPromoters = programNpsScores.filter((s) => s >= 9).length
      const pDetractors = programNpsScores.filter((s) => s <= 6).length
      const pTotal = programNpsScores.length
      const programNps = pTotal > 0
        ? Math.round(((pPromoters - pDetractors) / pTotal) * 100)
        : null

      return {
        id: program.id,
        name: program.name,
        featureArea: program.featureArea,
        startDate: program.startDate,
        endDate: program.endDate,
        stats: {
          enrollments: {
            total: program.enrollments.length,
            active: program.enrollments.filter((e) => e.status === 'ACTIVE').length,
            invited: program.enrollments.filter((e) => e.status === 'INVITED').length,
          },
          feedback: {
            total: program.feedback.length,
            unreviewed: program.feedback.filter((f) => !f.isReviewed).length,
          },
          nps: {
            score: programNps,
            responses: pTotal,
          },
        },
      }
    })

    // Top contributors (most feedback submitted)
    const contributorMap = new Map<string, { contractor: { id: string; businessName: string }; feedbackCount: number; npsCount: number }>()

    for (const program of programs) {
      for (const feedback of program.feedback) {
        const enrollment = program.enrollments.find((e) => e.contractorId === feedback.contractorId)
        if (enrollment?.contractor) {
          const key = enrollment.contractor.id
          const existing = contributorMap.get(key)
          if (existing) {
            existing.feedbackCount++
          } else {
            contributorMap.set(key, {
              contractor: enrollment.contractor,
              feedbackCount: 1,
              npsCount: 0,
            })
          }
        }
      }

      for (const nps of program.npsSurveys) {
        const enrollment = program.enrollments.find((e) => e.contractorId === nps.contractorId)
        if (enrollment?.contractor) {
          const key = enrollment.contractor.id
          const existing = contributorMap.get(key)
          if (existing) {
            existing.npsCount++
          } else {
            contributorMap.set(key, {
              contractor: enrollment.contractor,
              feedbackCount: 0,
              npsCount: 1,
            })
          }
        }
      }
    }

    const topContributors = Array.from(contributorMap.values())
      .sort((a, b) => (b.feedbackCount + b.npsCount) - (a.feedbackCount + a.npsCount))
      .slice(0, 5)

    // Recent feedback
    const recentFeedback = allFeedback
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
      .slice(0, 10)
      .map((f) => ({
        id: f.id,
        title: f.title,
        category: f.category,
        priority: f.priority,
        status: f.status,
        isReviewed: f.isReviewed,
        createdAt: f.createdAt,
        programId: f.programId,
      }))

    return NextResponse.json({
      overview: {
        activePrograms: programs.length,
        totalParticipants: enrollmentStats.active,
        pendingInvitations: enrollmentStats.invited,
        totalFeedback: feedbackStats.total,
        unreviewedFeedback: feedbackStats.unreviewed,
      },
      nps: {
        overall: overallNps,
        promoters,
        passives,
        detractors,
        totalResponses,
        trend: weeklyNps,
      },
      feedback: feedbackStats,
      enrollments: enrollmentStats,
      programs: programStats,
      topContributors,
      recentFeedback,
    })
  } catch (error) {
    console.error('Error fetching beta analytics:', error)
    return NextResponse.json(
      { error: 'Failed to fetch beta analytics' },
      { status: 500 }
    )
  }
}

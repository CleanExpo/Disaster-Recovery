import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET - Check contractor's beta enrollment status
export async function GET() {
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

    // Find all beta enrollments for this contractor
    const enrollments = await prisma.betaEnrollment.findMany({
      where: {
        contractorId: user.contractor.id,
      },
      include: {
        program: {
          select: {
            id: true,
            name: true,
            description: true,
            featureArea: true,
            startDate: true,
            endDate: true,
            isActive: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    })

    // Separate by status
    const activeEnrollments = enrollments.filter(
      (e) => e.status === 'ACTIVE' && e.program.isActive
    )
    const pendingInvitations = enrollments.filter(
      (e) => e.status === 'INVITED' && e.program.isActive
    )
    const pastEnrollments = enrollments.filter(
      (e) => e.status === 'COMPLETED' || e.status === 'WITHDRAWN' || !e.program.isActive
    )

    // Get tier override if any active enrollment has one
    const activeTierOverride = activeEnrollments.find((e) => e.tierOverride)?.tierOverride || null

    return NextResponse.json({
      enrollments: {
        active: activeEnrollments.map((e) => ({
          id: e.id,
          program: e.program,
          tierOverride: e.tierOverride,
          acceptedAt: e.acceptedAt,
        })),
        pending: pendingInvitations.map((e) => ({
          id: e.id,
          program: e.program,
          tierOverride: e.tierOverride,
          invitedAt: e.invitedAt,
        })),
        past: pastEnrollments.map((e) => ({
          id: e.id,
          program: e.program,
          status: e.status,
          completedAt: e.completedAt,
          withdrawnAt: e.withdrawnAt,
        })),
      },
      isBetaUser: activeEnrollments.length > 0,
      tierOverride: activeTierOverride,
      hasPendingInvitation: pendingInvitations.length > 0,
    })
  } catch (error) {
    console.error('Error fetching beta enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to fetch beta enrollment' },
      { status: 500 }
    )
  }
}

// POST - Accept or decline a beta invitation
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
    const { enrollmentId, action } = body

    if (!enrollmentId || !action) {
      return NextResponse.json(
        { error: 'enrollmentId and action are required' },
        { status: 400 }
      )
    }

    if (!['accept', 'decline'].includes(action)) {
      return NextResponse.json(
        { error: 'Action must be "accept" or "decline"' },
        { status: 400 }
      )
    }

    // Find the enrollment
    const enrollment = await prisma.betaEnrollment.findUnique({
      where: { id: enrollmentId },
      include: {
        program: true,
      },
    })

    if (!enrollment) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    // Verify the enrollment belongs to this contractor
    if (enrollment.contractorId !== user.contractor.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Verify the enrollment is in INVITED status
    if (enrollment.status !== 'INVITED') {
      return NextResponse.json(
        { error: 'Invitation already processed' },
        { status: 400 }
      )
    }

    // Verify the program is still active
    if (!enrollment.program.isActive) {
      return NextResponse.json(
        { error: 'Beta program is no longer active' },
        { status: 400 }
      )
    }

    if (action === 'accept') {
      const updatedEnrollment = await prisma.betaEnrollment.update({
        where: { id: enrollmentId },
        data: {
          status: 'ACTIVE',
          acceptedAt: new Date(),
        },
        include: {
          program: {
            select: {
              id: true,
              name: true,
              description: true,
              featureArea: true,
            },
          },
        },
      })

      // Create audit log
      await prisma.auditLog.create({
        data: {
          action: 'BETA_INVITATION_ACCEPTED',
          entityType: 'BetaEnrollment',
          entityId: enrollment.id,
          userId: user.id,
          newValues: {
            status: 'ACTIVE',
            acceptedAt: new Date().toISOString(),
          },
        },
      })

      return NextResponse.json({
        message: 'Beta invitation accepted',
        enrollment: {
          id: updatedEnrollment.id,
          status: updatedEnrollment.status,
          program: updatedEnrollment.program,
          tierOverride: updatedEnrollment.tierOverride,
        },
      })
    } else {
      // Decline - mark as withdrawn
      await prisma.betaEnrollment.update({
        where: { id: enrollmentId },
        data: {
          status: 'WITHDRAWN',
          withdrawnAt: new Date(),
          withdrawReason: 'Declined by contractor',
        },
      })

      // Create audit log
      await prisma.auditLog.create({
        data: {
          action: 'BETA_INVITATION_DECLINED',
          entityType: 'BetaEnrollment',
          entityId: enrollment.id,
          userId: user.id,
          newValues: {
            status: 'WITHDRAWN',
            withdrawReason: 'Declined by contractor',
          },
        },
      })

      return NextResponse.json({
        message: 'Beta invitation declined',
      })
    }
  } catch (error) {
    console.error('Error processing beta invitation:', error)
    return NextResponse.json(
      { error: 'Failed to process beta invitation' },
      { status: 500 }
    )
  }
}

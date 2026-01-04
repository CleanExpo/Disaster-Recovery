import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

// Update enrollment schema
const updateEnrollmentSchema = z.object({
  status: z.enum(['INVITED', 'ACTIVE', 'COMPLETED', 'WITHDRAWN']).optional(),
  tierOverride: z.enum(['BASIC', 'PRO', 'ENTERPRISE']).optional(),
  adminNotes: z.string().optional(),
  withdrawReason: z.string().optional(),
})

// PATCH - Update enrollment status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const existing = await prisma.betaEnrollment.findUnique({
      where: { id: params.id },
      include: {
        contractor: {
          include: {
            user: { select: { email: true } },
          },
        },
      },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    const body = await request.json()
    const validationResult = updateEnrollmentSchema.safeParse(body)

    if (!validationResult.success) {
      return NextResponse.json(
        { error: 'Validation failed', details: validationResult.error.errors },
        { status: 400 }
      )
    }

    const { status, tierOverride, adminNotes, withdrawReason } = validationResult.data

    // Build update data
    const updateData: Record<string, unknown> = {}

    if (status) {
      updateData.status = status

      // Set timestamps based on status change
      if (status === 'ACTIVE' && existing.status === 'INVITED') {
        updateData.acceptedAt = new Date()
      } else if (status === 'COMPLETED') {
        updateData.completedAt = new Date()
      } else if (status === 'WITHDRAWN') {
        updateData.withdrawnAt = new Date()
        if (withdrawReason) {
          updateData.withdrawReason = withdrawReason
        }
      }
    }

    if (tierOverride !== undefined) {
      updateData.tierOverride = tierOverride
    }

    if (adminNotes !== undefined) {
      updateData.adminNotes = adminNotes
    }

    const enrollment = await prisma.betaEnrollment.update({
      where: { id: params.id },
      data: updateData,
      include: {
        program: true,
        contractor: {
          include: {
            user: { select: { name: true, email: true } },
          },
        },
      },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'BETA_ENROLLMENT_UPDATED',
        entityType: 'BetaEnrollment',
        entityId: enrollment.id,
        userId: adminUser.id,
        oldValues: {
          status: existing.status,
          tierOverride: existing.tierOverride,
        },
        newValues: updateData,
      },
    })

    // TODO: Send status change emails
    if (status === 'ACTIVE' && existing.status === 'INVITED') {
      console.log(`Would send beta welcome email to ${existing.contractor.user.email}`)
    }

    return NextResponse.json({ enrollment })
  } catch (error) {
    console.error('Error updating enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to update enrollment' },
      { status: 500 }
    )
  }
}

// DELETE - Remove enrollment
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const existing = await prisma.betaEnrollment.findUnique({
      where: { id: params.id },
    })

    if (!existing) {
      return NextResponse.json({ error: 'Enrollment not found' }, { status: 404 })
    }

    // If enrollment is active, just mark as withdrawn instead of deleting
    if (existing.status === 'ACTIVE') {
      await prisma.betaEnrollment.update({
        where: { id: params.id },
        data: {
          status: 'WITHDRAWN',
          withdrawnAt: new Date(),
          withdrawReason: 'Removed by admin',
        },
      })

      return NextResponse.json({
        message: 'Enrollment withdrawn',
        withdrawn: true,
      })
    }

    // For invited/completed/withdrawn, delete entirely
    await prisma.betaEnrollment.delete({
      where: { id: params.id },
    })

    // Create audit log
    await prisma.auditLog.create({
      data: {
        action: 'BETA_ENROLLMENT_DELETED',
        entityType: 'BetaEnrollment',
        entityId: params.id,
        userId: adminUser.id,
        oldValues: existing,
      },
    })

    return NextResponse.json({ message: 'Enrollment deleted', deleted: true })
  } catch (error) {
    console.error('Error deleting enrollment:', error)
    return NextResponse.json(
      { error: 'Failed to delete enrollment' },
      { status: 500 }
    )
  }
}

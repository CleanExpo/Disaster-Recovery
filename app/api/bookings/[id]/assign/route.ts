/**
 * Booking Contractor Assignment Route
 * Handles contractor assignment to bookings
 * POST   /api/bookings/[id]/assign - Assign contractor to booking
 * DELETE /api/bookings/[id]/assign - Unassign contractor
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { PrismaClient } from '@prisma/client';
import { BookingStatus } from '@prisma/client';

const prisma = new PrismaClient();

// ============================================================================
// POST /api/bookings/[id]/assign - Assign contractor to booking
// ============================================================================

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Only admin can assign contractors
    if (user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Only admins can assign contractors' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const { contractorId } = body;

    if (!contractorId) {
      return NextResponse.json(
        { error: 'contractorId is required' },
        { status: 400 }
      );
    }

    // Verify booking exists
    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Verify contractor exists and is verified
    const contractor = await prisma.contractor.findUnique({
      where: { id: contractorId },
      include: {
        iicrcCertifications: {
          where: { isActive: true },
        },
      },
    });

    if (!contractor) {
      return NextResponse.json(
        { error: 'Contractor not found' },
        { status: 404 }
      );
    }

    if (!contractor.isVerified) {
      return NextResponse.json(
        { error: 'Contractor is not verified' },
        { status: 400 }
      );
    }

    if (contractor.iicrcCertifications.length === 0) {
      return NextResponse.json(
        { error: 'Contractor does not have active IICRC certification' },
        { status: 400 }
      );
    }

    // Check if contractor operates in the booking's area
    if (!contractor.operatingStates.includes(booking.serviceState)) {
      return NextResponse.json(
        { error: 'Contractor does not operate in the booking area' },
        { status: 400 }
      );
    }

    // Assign contractor
    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        contractorId,
        status: BookingStatus.CONFIRMED,
      },
      include: {
        contractor: {
          select: {
            id: true,
            businessName: true,
            averageRating: true,
          },
        },
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Booking',
        entityId: booking.id,
        performedBy: user.id,
        newValues: {
          contractorId,
          status: BookingStatus.CONFIRMED,
        } as any,
      },
    });

    // Create notification for contractor
    // TODO: Implement notification system

    return NextResponse.json({
      success: true,
      data: updatedBooking,
      message: 'Contractor assigned successfully',
    });
  } catch (error) {
    console.error('Error assigning contractor:', error);
    return NextResponse.json(
      { error: 'Error assigning contractor' },
      { status: 500 }
    );
  }
}

// ============================================================================
// DELETE /api/bookings/[id]/assign - Unassign contractor
// ============================================================================

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession();

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Only admin can unassign contractors
    if (user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Only admins can unassign contractors' },
        { status: 403 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    if (!booking.contractorId) {
      return NextResponse.json(
        { error: 'No contractor assigned to this booking' },
        { status: 400 }
      );
    }

    // Can only unassign if booking hasn't started
    if (booking.status === BookingStatus.IN_PROGRESS ||
        booking.status === BookingStatus.COMPLETED) {
      return NextResponse.json(
        { error: 'Cannot unassign contractor from in-progress or completed booking' },
        { status: 400 }
      );
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data: {
        contractorId: null,
        status: BookingStatus.PENDING,
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Booking',
        entityId: booking.id,
        performedBy: user.id,
        newValues: {
          contractorId: null,
          status: BookingStatus.PENDING,
        } as any,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedBooking,
      message: 'Contractor unassigned successfully',
    });
  } catch (error) {
    console.error('Error unassigning contractor:', error);
    return NextResponse.json(
      { error: 'Error unassigning contractor' },
      { status: 500 }
    );
  }
}

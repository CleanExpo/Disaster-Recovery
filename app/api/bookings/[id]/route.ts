/**
 * Booking Detail API Route
 * Handles individual booking operations
 * GET    /api/bookings/[id] - Get booking details
 * PATCH  /api/bookings/[id] - Update booking
 * DELETE /api/bookings/[id] - Cancel booking
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import { BookingStatus } from '@prisma/client';

// ============================================================================
// GET /api/bookings/[id] - Get booking details
// ============================================================================

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

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

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
      include: {
        contractor: {
          select: {
            id: true,
            businessName: true,
            averageRating: true,
            completedJobs: true,
            operatingStates: true,
            australianSpecialties: true,
          },
        },
        payments: {
          select: {
            id: true,
            amountAUD: true,
            status: true,
            createdAt: true,
          },
        },
        auClaims: {
          select: {
            id: true,
            status: true,
            totalClaimAmountAUD: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check authorization: client, contractor, or admin
    const isAuthorized =
      user.id === booking.clientId ||
      (booking.contractorId && user.id === booking.contractorId) ||
      user.userType === 'ADMIN';

    if (!isAuthorized) {
      return NextResponse.json(
        { error: 'Not authorized to view this booking' },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error('Error fetching booking:', error);
    return NextResponse.json(
      { error: 'Error fetching booking' },
      { status: 500 }
    );
  }
}

// ============================================================================
// PATCH /api/bookings/[id] - Update booking
// ============================================================================

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

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

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check authorization: client or admin
    if (user.id !== booking.clientId && user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Not authorized to update this booking' },
        { status: 403 }
      );
    }

    const body = await request.json();
    const updates: any = {};

    // Only allow specific fields to be updated
    if (body.clientNotes !== undefined) {
      updates.clientNotes = body.clientNotes;
    }

    if (body.scheduledDate !== undefined) {
      updates.scheduledDate = new Date(body.scheduledDate);
    }

    if (body.status && user.userType === 'ADMIN') {
      updates.status = body.status;
    }

    const updatedBooking = await prisma.booking.update({
      where: { id: params.id },
      data: updates,
      include: {
        contractor: true,
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Booking',
        entityId: booking.id,
        performedBy: user.id,
        oldValues: booking as any,
        newValues: updatedBooking as any,
      },
    });

    return NextResponse.json({
      success: true,
      data: updatedBooking,
      message: 'Booking updated successfully',
    });
  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Error updating booking' },
      { status: 500 }
    );
  }
}

// ============================================================================
// DELETE /api/bookings/[id] - Cancel booking
// ============================================================================

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

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

    const booking = await prisma.booking.findUnique({
      where: { id: params.id },
    });

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    // Check authorization: client or admin
    if (user.id !== booking.clientId && user.userType !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Not authorized to cancel this booking' },
        { status: 403 }
      );
    }

    // Can only cancel if not already in progress or completed
    if (
      booking.status === BookingStatus.IN_PROGRESS ||
      booking.status === BookingStatus.COMPLETED
    ) {
      return NextResponse.json(
        { error: 'Cannot cancel booking that is in progress or completed' },
        { status: 400 }
      );
    }

    const cancelledBooking = await prisma.booking.update({
      where: { id: params.id },
      data: { status: BookingStatus.CANCELLED },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        action: 'UPDATE',
        entityType: 'Booking',
        entityId: booking.id,
        performedBy: user.id,
        newValues: { status: BookingStatus.CANCELLED } as any,
      },
    });

    return NextResponse.json({
      success: true,
      data: cancelledBooking,
      message: 'Booking cancelled successfully',
    });
  } catch (error) {
    console.error('Error cancelling booking:', error);
    return NextResponse.json(
      { error: 'Error cancelling booking' },
      { status: 500 }
    );
  }
}

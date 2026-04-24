import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requestLogger } from '@/lib/observability';

interface TimeSlot {
  time: string;
  available: boolean;
  reason?: string;
}

export async function GET(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/bookings/availability' });
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  const urgency = searchParams.get('urgency');
  
  if (!date) {
    return NextResponse.json({
      success: false,
      message: 'Date parameter is required' }, { status: 400 });
  }
  
  // Emergency services are always available
  if (urgency === 'emergency') {
    return NextResponse.json({
      success: true,
      date,
      slots: [
        { time: 'Immediate', available: true },
      ] });
  }
  
  // Generate time slots for the day
  const slots: TimeSlot[] = [];
  const startHour = 7; // 7 AM
  const endHour = 19; // 7 PM
  const MAX_CAPACITY_PER_SLOT = 5;

  const requestedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  requestedDate.setHours(0, 0, 0, 0);

  const isToday = requestedDate.getTime() === today.getTime();
  const currentHour = new Date().getHours();

  // Query existing bookings for this date from the database
  let existingBookings: { scheduledDate: Date | null }[] = [];
  try {
    existingBookings = await prisma.booking.findMany({
      where: {
        scheduledDate: {
          gte: new Date(`${date}T00:00:00`),
          lt: new Date(`${date}T23:59:59`),
        },
        status: { not: 'CANCELLED' },
      },
      select: { scheduledDate: true },
    });
  } catch (error) {
    // If DB query fails, default to empty (all slots available)
    log.error('failed to query bookings for availability', { error: error instanceof Error ? error.message : String(error) });
    existingBookings = [];
  }

  for (let hour = startHour; hour < endHour; hour += 2) {
    const timeString = `${hour.toString().padStart(2, '0')}:00`;

    // Check if slot is in the past
    if (isToday && hour <= currentHour) {
      slots.push({
        time: timeString,
        available: false,
        reason: 'Past time' });
      continue;
    }

    // Count bookings in this 2-hour slot window
    const slotStart = hour;
    const slotEnd = hour + 2;
    const bookingsInSlot = existingBookings.filter(b => {
      if (!b.scheduledDate) return false;
      const bookingHour = b.scheduledDate.getHours();
      return bookingHour >= slotStart && bookingHour < slotEnd;
    }).length;

    const isAvailable = bookingsInSlot < MAX_CAPACITY_PER_SLOT;

    slots.push({
      time: timeString,
      available: isAvailable,
      reason: isAvailable ? undefined : 'Fully booked' });
  }
  
  return NextResponse.json({
    success: true,
    date,
    slots,
    nextAvailableDate: getNextAvailableDate(date) });
}

function getNextAvailableDate(currentDate: string): string {
  const date = new Date(currentDate);
  date.setDate(date.getDate() + 1);
  
  // Skip weekends in production
  while (date.getDay() === 0 || date.getDay() === 6) {
    date.setDate(date.getDate() + 1);
  }
  
  return date.toISOString().split('T')[0];
}
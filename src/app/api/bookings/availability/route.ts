import { NextRequest, NextResponse } from 'next/server';

interface TimeSlot {
  time: string;
  available: boolean;
  reason?: string;
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const date = searchParams.get('date');
  const urgency = searchParams.get('urgency');
  
  if (!date) {
    return NextResponse.json({
      success: false,
      message: 'Date parameter is required',
    }, { status: 400 });
  }
  
  // Emergency services are always available
  if (urgency === 'emergency') {
    return NextResponse.json({
      success: true,
      date,
      slots: [
        { time: 'Immediate', available: true },
      ],
    });
  }
  
  // Generate time slots for the day
  const slots: TimeSlot[] = [];
  const startHour = 7; // 7 AM
  const endHour = 19; // 7 PM
  
  const requestedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  requestedDate.setHours(0, 0, 0, 0);
  
  const isToday = requestedDate.getTime() === today.getTime();
  const currentHour = new Date().getHours();
  
  for (let hour = startHour; hour < endHour; hour += 2) {
    const timeString = `${hour.toString().padStart(2, '0')}:00`;
    
    // Check if slot is in the past
    if (isToday && hour <= currentHour) {
      slots.push({
        time: timeString,
        available: false,
        reason: 'Past time',
      });
      continue;
    }
    
    // Simulate random availability (80% available)
    const isAvailable = Math.random() > 0.2;
    
    slots.push({
      time: timeString,
      available: isAvailable,
      reason: isAvailable ? undefined : 'Fully booked',
    });
  }
  
  // Always ensure at least 2 slots are available
  const availableCount = slots.filter(s => s.available).length;
  if (availableCount < 2) {
    // Make the next 2 unavailable slots available
    let made = 0;
    for (const slot of slots) {
      if (!slot.available && slot.reason === 'Fully booked' && made < 2) {
        slot.available = true;
        delete slot.reason;
        made++;
      }
    }
  }
  
  return NextResponse.json({
    success: true,
    date,
    slots,
    nextAvailableDate: getNextAvailableDate(date),
  });
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
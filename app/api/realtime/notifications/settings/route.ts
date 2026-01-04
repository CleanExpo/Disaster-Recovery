import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// Get notification preferences
export async function GET() {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { contractor: true },
    })

    if (!user?.contractor) {
      return NextResponse.json(
        { error: 'Contractor not found' },
        { status: 403 }
      )
    }

    let preferences = await prisma.notificationPreference.findUnique({
      where: { contractorId: user.contractor.id },
    })

    // Create default preferences if none exist
    if (!preferences) {
      preferences = await prisma.notificationPreference.create({
        data: {
          contractorId: user.contractor.id,
          soundEnabled: true,
          soundType: 'subtle_chime',
          smsEnabled: true,
          smsPhone: user.australianPhoneNumber,
          newJobEnabled: true,
          statusUpdateEnabled: true,
          urgentJobAlarm: true,
        },
      })
    }

    return NextResponse.json(preferences)
  } catch (error) {
    console.error('Error fetching notification preferences:', error)
    return NextResponse.json(
      { error: 'Failed to fetch preferences' },
      { status: 500 }
    )
  }
}

// Update notification preferences
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const body = await request.json()

    const user = await prisma.user.findUnique({
      where: { email: session.user.email! },
      include: { contractor: true },
    })

    if (!user?.contractor) {
      return NextResponse.json(
        { error: 'Contractor not found' },
        { status: 403 }
      )
    }

    const preferences = await prisma.notificationPreference.upsert({
      where: { contractorId: user.contractor.id },
      update: {
        soundEnabled: body.soundEnabled,
        soundType: body.soundType,
        smsEnabled: body.smsEnabled,
        smsPhone: body.smsPhone,
        smsOfflineDelay: body.smsOfflineDelay,
        newJobEnabled: body.newJobEnabled,
        statusUpdateEnabled: body.statusUpdateEnabled,
        urgentJobAlarm: body.urgentJobAlarm,
        quietHoursEnabled: body.quietHoursEnabled,
        quietHoursStart: body.quietHoursStart,
        quietHoursEnd: body.quietHoursEnd,
        quietHoursTimezone: body.quietHoursTimezone,
      },
      create: {
        contractorId: user.contractor.id,
        soundEnabled: body.soundEnabled ?? true,
        soundType: body.soundType ?? 'subtle_chime',
        smsEnabled: body.smsEnabled ?? true,
        smsPhone: body.smsPhone,
        smsOfflineDelay: body.smsOfflineDelay ?? 120,
        newJobEnabled: body.newJobEnabled ?? true,
        statusUpdateEnabled: body.statusUpdateEnabled ?? true,
        urgentJobAlarm: body.urgentJobAlarm ?? true,
        quietHoursEnabled: body.quietHoursEnabled ?? false,
        quietHoursStart: body.quietHoursStart,
        quietHoursEnd: body.quietHoursEnd,
        quietHoursTimezone: body.quietHoursTimezone ?? 'Australia/Sydney',
      },
    })

    return NextResponse.json(preferences)
  } catch (error) {
    console.error('Error updating notification preferences:', error)
    return NextResponse.json(
      { error: 'Failed to update preferences' },
      { status: 500 }
    )
  }
}

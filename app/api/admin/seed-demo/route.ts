import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import bcrypt from 'bcryptjs'

// Demo credentials - password: demo2026
// Hash generated and verified: bcrypt.compareSync('demo2026', hash) === true
const DEMO_PASSWORD_HASH = '$2b$10$w6cxN1L12RYhmBtCKNK0t.C3A/GRvcBO8HUnbhJmDeZ1EreGZdlOm'

export async function POST(request: Request) {
  try {
    // Simple auth check - require a secret key
    const { searchParams } = new URL(request.url)
    const key = searchParams.get('key')

    if (key !== 'seed-demo-2026') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const results: string[] = []

    // 1. Create Demo Client
    const demoClient = await prisma.user.upsert({
      where: { email: 'demo.client@disasterrecovery.com.au' },
      update: { password: DEMO_PASSWORD_HASH },
      create: {
        email: 'demo.client@disasterrecovery.com.au',
        name: 'Demo Client - RIA 2026',
        password: DEMO_PASSWORD_HASH,
        userType: 'CLIENT',
        australianState: 'VIC',
        australianPostcode: '3000',
        suburb: 'Melbourne CBD',
        streetAddress: '120 Collins Street',
        isEmailVerified: true,
        isActive: true,
      },
    })
    results.push(`Client: ${demoClient.email}`)

    // 2. Create Demo Contractor User
    const demoContractorUser = await prisma.user.upsert({
      where: { email: 'demo.contractor@disasterrecovery.com.au' },
      update: { password: DEMO_PASSWORD_HASH },
      create: {
        email: 'demo.contractor@disasterrecovery.com.au',
        name: 'Rapid Response Restoration',
        password: DEMO_PASSWORD_HASH,
        userType: 'CONTRACTOR',
        australianState: 'VIC',
        australianPostcode: '3000',
        suburb: 'Melbourne CBD',
        streetAddress: '200 Bourke Street',
        isEmailVerified: true,
        isActive: true,
      },
    })
    results.push(`Contractor: ${demoContractorUser.email}`)

    // 3. Create Demo Admin
    const demoAdmin = await prisma.user.upsert({
      where: { email: 'demo.admin@disasterrecovery.com.au' },
      update: { password: DEMO_PASSWORD_HASH },
      create: {
        email: 'demo.admin@disasterrecovery.com.au',
        name: 'Demo Admin',
        password: DEMO_PASSWORD_HASH,
        userType: 'ADMIN',
        australianState: 'VIC',
        australianPostcode: '3000',
        suburb: 'Melbourne CBD',
        streetAddress: '1 Admin Plaza',
        isEmailVerified: true,
        isActive: true,
      },
    })
    results.push(`Admin: ${demoAdmin.email}`)

    return NextResponse.json({
      success: true,
      message: 'Demo accounts seeded successfully',
      accounts: results,
      password: 'demo2026'
    })

  } catch (error) {
    console.error('Seed error:', error)
    return NextResponse.json({
      error: 'Failed to seed demo accounts',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

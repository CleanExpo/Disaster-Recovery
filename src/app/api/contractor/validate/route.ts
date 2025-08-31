import { NextRequest, NextResponse } from 'next/server'

/**
 * Contractor Validation Endpoint
 * Supports both GET (for health checks) and POST (for validation)
 */

// GET method for health checks
export async function GET(request: NextRequest) {
  try {
    return NextResponse.json({
      status: 'ok',
      message: 'Contractor validation endpoint is operational',
      timestamp: new Date().toISOString(),
      methods: ['GET', 'POST']
    })
  } catch (error) {
    console.error('Contractor validation GET error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        status: 'error' 
      },
      { status: 500 }
    )
  }
}

// POST method for actual contractor validation
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    const { contractorId, abn, email } = body
    
    if (!contractorId && !abn && !email) {
      return NextResponse.json(
        { 
          error: 'At least one identifier required (contractorId, abn, or email)',
          status: 'error'
        },
        { status: 400 }
      )
    }
    
    // Mock validation logic (replace with actual database check)
    const isValid = true // This would check against database
    
    if (isValid) {
      return NextResponse.json({
        status: 'success',
        valid: true,
        contractor: {
          id: contractorId || 'CONT-' + Date.now(),
          abn: abn || null,
          email: email || null,
          verified: true,
          active: true
        },
        timestamp: new Date().toISOString()
      })
    } else {
      return NextResponse.json({
        status: 'error',
        valid: false,
        message: 'Contractor not found or inactive',
        timestamp: new Date().toISOString()
      })
    }
  } catch (error) {
    console.error('Contractor validation POST error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        status: 'error' 
      },
      { status: 500 }
    )
  }
}
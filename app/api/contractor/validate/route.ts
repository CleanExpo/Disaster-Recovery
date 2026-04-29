import { NextRequest, NextResponse } from 'next/server'
import { requestLogger, captureException } from '@/lib/observability'
import { logComplianceEvent } from '@/lib/compliance/events'

/**
 * Contractor Validation Endpoint
 * Supports both GET (for health checks) and POST (for validation)
 */

// GET method for health checks
export async function GET(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractor/validate' })
  try {
    return NextResponse.json({
      status: 'ok',
      message: 'Contractor validation endpoint is operational',
      timestamp: new Date().toISOString(),
      methods: ['GET', 'POST']
    })
  } catch (error) {
    log.error('contractor validation GET error', { error: error instanceof Error ? error.message : String(error) })
    captureException(error, { tags: { route: '/api/contractor/validate' }, extra: { requestId: log.requestId } })
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
  const log = requestLogger(request, { route: '/api/contractor/validate' })
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
    
    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/contractor/validate',
        request_id: log.requestId,
        has_contractor_id: Boolean(contractorId),
        has_abn: Boolean(abn),
        has_email: Boolean(email),
      },
    })

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
    log.error('contractor validation POST error', { error: error instanceof Error ? error.message : String(error) })
    captureException(error, { tags: { route: '/api/contractor/validate' }, extra: { requestId: log.requestId } })
    return NextResponse.json(
      {
        error: 'Internal server error',
        status: 'error'
      },
      { status: 500 }
    )
  }
}
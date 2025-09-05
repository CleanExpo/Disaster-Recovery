import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import { handleAPIError, successResponse, APIError } from '@/lib/api-error-handler';
import { z } from 'zod';

const jobUpdateSchema = z.object({
  status: z.enum(['active', 'completed', 'cancelled']).optional(),
  notes: z.string().optional(),
  progress: z.number().min(0).max(100).optional(),
  completedAt: z.string().optional()
});

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request);
    
    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      throw new APIError('Contractor authentication required', 401);
    }
    
    // Mock job data (in production, fetch from database)
    const job = {
      id: params.id,
      customer: {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '0412 345 678',
        address: '123 Queen St, Brisbane CBD, QLD 4000'
      },
      service: {
        type: 'water-damage',
        name: 'Water Damage Restoration',
        category: 'emergency'
      },
      status: 'active',
      priority: 'high',
      scheduledDate: '2024-01-29T14:00:00Z',
      estimatedDuration: 3,
      value: 3500.00,
      insurance: {
        hasInsurance: true,
        company: 'NRMA',
        claimNumber: 'CLM-2024-456',
        excess: 500
      },
      notes: 'Burst pipe in kitchen, water damage to flooring and cabinets',
      equipment: ['Dehumidifier x2', 'Air Mover x4', 'Moisture Meter'],
      team: ['John Smith', 'Mike Brown'],
      progress: 45,
      timeline: [
        {
          status: 'created',
          timestamp: '2024-01-28T10:00:00Z',
          notes: 'Job created'
        },
        {
          status: 'accepted',
          timestamp: '2024-01-28T14:30:00Z',
          notes: 'Job accepted by contractor'
        },
        {
          status: 'in_progress',
          timestamp: '2024-01-29T14:00:00Z',
          notes: 'Work commenced on site'
        }
      ],
      createdAt: '2024-01-28T10:00:00Z',
      updatedAt: '2024-01-29T15:30:00Z'
    };
    
    return successResponse(job);
    
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request);
    
    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      throw new APIError('Contractor authentication required', 401);
    }
    
    const body = await request.json();
    const validatedData = jobUpdateSchema.parse(body);
    
    // In production, update database
    const updatedJob = {
      id: params.id,
      ...validatedData,
      updatedAt: new Date().toISOString(),
      updatedBy: user.id
    };
    
    return successResponse({
      message: `Job ${params.id} updated successfully`,
      job: updatedJob
    });
    
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await verifyAuth(request);
    
    if (!user || !hasRole(user.role as UserRole, [UserRole.ADMIN])) {
      throw new APIError('Admin authentication required', 401);
    }
    
    // In production, soft delete from database
    
    return successResponse({
      message: `Job ${params.id} cancelled successfully`,
      jobId: params.id
    });
    
  } catch (error) {
    return handleAPIError(error);
  }
}
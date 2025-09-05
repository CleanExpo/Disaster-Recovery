import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import { handleAPIError, successResponse, APIError, validateRequired } from '@/lib/api-error-handler';
import { z } from 'zod';

const profileUpdateSchema = z.object({
  companyName: z.string().optional(),
  contactName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  serviceRadius: z.number().min(5).max(200).optional(),
  services: z.array(z.string()).optional(),
  availability: z.object({
    247: z.boolean().optional(),
    emergencyResponse: z.boolean().optional(),
    responseTime: z.number().optional()
  }).optional(),
  insurance: z.object({
    publicLiability: z.boolean().optional(),
    professionalIndemnity: z.boolean().optional(),
    workCover: z.boolean().optional()
  }).optional(),
  certifications: z.array(z.string()).optional()
});

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    
    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      throw new APIError('Contractor authentication required', 401);
    }
    
    // Mock profile data (in production, fetch from database)
    const profile = {
      id: user.id,
      companyName: 'Rapid Response Restoration',
      contactName: 'John Smith',
      email: user.email,
      phone: '0412 345 678',
      abn: '12 345 678 901',
      address: '123 Industrial Dr, Eagle Farm, QLD 4009',
      serviceRadius: 50,
      services: [
        'Water Damage Restoration',
        'Fire Damage Restoration',
        'Mould Remediation',
        'Storm Damage',
        'Sewage Cleanup'
      ],
      availability: {
        247: true,
        emergencyResponse: true,
        responseTime: 60,
        blackoutDates: []
      },
      insurance: {
        publicLiability: true,
        publicLiabilityAmount: 20000000,
        professionalIndemnity: true,
        professionalIndemnityAmount: 5000000,
        workCover: true,
        expiryDates: {
          publicLiability: '2024-12-31',
          professionalIndemnity: '2024-12-31',
          workCover: '2024-12-31'
        }
      },
      certifications: [
        'IICRC Water Damage Restoration',
        'IICRC Fire & Smoke Restoration',
        'IICRC Applied Structural Drying',
        'Asbestos Removal License',
        'Queensland Building License'
      ],
      performance: {
        totalJobs: 342,
        completionRate: 98.5,
        averageRating: 4.8,
        responseTime: '45 minutes',
        memberSince: '2023-01-15',
        tier: 'PLATINUM'
      },
      bankDetails: {
        accountName: 'Rapid Response Restoration Pty Ltd',
        bsb: '***-***',
        accountNumber: '****1234'
      },
      preferences: {
        notifications: {
          email: true,
          sms: true,
          push: false
        },
        leadTypes: ['emergency', 'insurance', 'commercial'],
        minJobValue: 500,
        maxActiveJobs: 10
      },
      status: 'ACTIVE',
      verificationStatus: 'VERIFIED',
      lastUpdated: '2024-01-29T10:00:00Z'
    };
    
    return successResponse(profile);
    
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const user = await verifyAuth(request);
    
    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      throw new APIError('Contractor authentication required', 401);
    }
    
    const body = await request.json();
    const validatedData = profileUpdateSchema.parse(body);
    
    // In production, update database
    const updatedProfile = {
      ...validatedData,
      id: user.id,
      lastUpdated: new Date().toISOString()
    };
    
    return successResponse({
      message: 'Profile updated successfully',
      profile: updatedProfile
    });
    
  } catch (error) {
    return handleAPIError(error);
  }
}
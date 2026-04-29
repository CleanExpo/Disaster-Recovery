import { NextRequest, NextResponse } from 'next/server';
import { verifyAuth, hasRole, UserRole } from '@/lib/jwt-auth';
import {
  handleAPIError,
  successResponse,
  APIError,
  validateRequired,
} from '@/lib/api-error-handler';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

const profileUpdateSchema = z.object({
  companyName: z.string().optional(),
  contactName: z.string().optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
  serviceRadius: z.number().min(5).max(200).optional(),
  services: z.array(z.string()).optional(),
  availability: z
    .object({
      247: z.boolean().optional(),
      emergencyResponse: z.boolean().optional(),
      responseTime: z.number().optional(),
    })
    .optional(),
  insurance: z
    .object({
      publicLiability: z.boolean().optional(),
      professionalIndemnity: z.boolean().optional(),
      workCover: z.boolean().optional(),
    })
    .optional(),
  certifications: z.array(z.string()).optional(),
});

export async function GET(request: NextRequest) {
  try {
    const user = await verifyAuth(request);

    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      throw new APIError('Contractor authentication required', 401);
    }

    // Query ContractorProfile by userId
    const contractorProfile = await prisma.contractorProfile.findFirst({
      where: { userId: user.id },
    });

    // Query Contractor record for extended data (company, certs, insurance, KPIs)
    const contractor = await prisma.contractor.findFirst({
      where: { email: user.email },
      include: {
        companyProfile: true,
        insurance: {
          where: { status: 'ACTIVE' },
          select: {
            insuranceType: true,
            coverageAmount: true,
            expiryDate: true,
            verified: true,
          },
        },
        territories: {
          where: { active: true },
          select: {
            name: true,
            radiusKm: true,
            emergencyResponse: true,
            afterHours: true,
            maxJobsPerDay: true,
            currentActiveJobs: true,
          },
        },
        kpiMetrics: {
          orderBy: { periodStart: 'desc' },
          take: 1,
          select: {
            totalJobs: true,
            completedJobs: true,
            customerSatisfaction: true,
            averageResponseTime: true,
            totalRevenue: true,
            averageJobValue: true,
          },
        },
        subscription: {
          select: {
            tier: true,
            status: true,
            baseRadius: true,
          },
        },
      },
    });

    // Count completed jobs for this contractor
    const completedJobsCount = contractor
      ? await prisma.job.count({
          where: { contractorId: contractor.id, status: 'completed' },
        })
      : 0;

    // Get average rating from Rating table
    const ratingAgg = contractorProfile
      ? await prisma.rating.aggregate({
          where: { contractorId: contractorProfile.userId },
          _avg: { rating: true },
          _count: { rating: true },
        })
      : null;

    // Build insurance summary from ContractorInsurance records
    const insuranceMap: Record<string, boolean> = {};
    const insuranceAmounts: Record<string, number> = {};
    const insuranceExpiry: Record<string, string> = {};
    if (contractor?.insurance) {
      for (const ins of contractor.insurance) {
        const key =
          ins.insuranceType === 'PUBLIC_LIABILITY'
            ? 'publicLiability'
            : ins.insuranceType === 'PROFESSIONAL_INDEMNITY'
              ? 'professionalIndemnity'
              : ins.insuranceType === 'WORKERS_COMP'
                ? 'workCover'
                : ins.insuranceType.toLowerCase();
        insuranceMap[key] = ins.verified;
        insuranceAmounts[`${key}Amount`] = ins.coverageAmount;
        if (ins.expiryDate) {
          insuranceExpiry[key] = ins.expiryDate.toISOString().split('T')[0];
        }
      }
    }

    // Determine service radius from subscription or territory
    const serviceRadius =
      contractor?.subscription?.baseRadius ??
      (contractor?.territories?.[0]?.radiusKm
        ? Math.round(contractor.territories[0].radiusKm)
        : null);

    // Latest KPI data
    const latestKPI = contractor?.kpiMetrics?.[0] ?? null;

    // Build the profile response, matching the original response structure
    const profile = {
      id: user.id,
      companyName:
        contractor?.companyProfile?.companyName ?? contractorProfile?.businessName ?? null,
      contactName: contractor?.companyProfile
        ? (() => {
            try {
              const dirs = JSON.parse(contractor.companyProfile.directors);
              return dirs?.[0]?.name ?? null;
            } catch {
              return null;
            }
          })()
        : null,
      email: user.email,
      phone: contractor?.mobileNumber ?? contractorProfile?.phone ?? null,
      abn: contractor?.companyProfile?.abn ?? null,
      address: contractor?.companyProfile
        ? `${contractor.companyProfile.registeredAddress}, ${contractor.companyProfile.registeredCity}, ${contractor.companyProfile.registeredState} ${contractor.companyProfile.registeredPostcode}`
        : contractorProfile?.address
          ? `${contractorProfile.address}${contractorProfile.city ? ', ' + contractorProfile.city : ''}${contractorProfile.state ? ', ' + contractorProfile.state : ''} ${contractorProfile.zipCode ?? ''}`
          : null,
      serviceRadius: serviceRadius ?? null,
      services: contractorProfile?.services ?? [],
      availability: {
        247: false,
        emergencyResponse: contractor?.territories?.some((t) => t.emergencyResponse) ?? false,
        responseTime: latestKPI?.averageResponseTime
          ? Math.round(latestKPI.averageResponseTime * 60)
          : null,
        blackoutDates: [],
      },
      insurance: {
        publicLiability: insuranceMap.publicLiability ?? false,
        publicLiabilityAmount: insuranceAmounts.publicLiabilityAmount ?? null,
        professionalIndemnity: insuranceMap.professionalIndemnity ?? false,
        professionalIndemnityAmount: insuranceAmounts.professionalIndemnityAmount ?? null,
        workCover: insuranceMap.workCover ?? false,
        expiryDates: insuranceExpiry,
      },
      certifications: contractor?.iicrcCertifications ?? [],
      performance: {
        totalJobs: latestKPI?.totalJobs ?? contractorProfile?.totalJobs ?? completedJobsCount,
        completionRate:
          latestKPI && latestKPI.totalJobs > 0
            ? parseFloat(((latestKPI.completedJobs / latestKPI.totalJobs) * 100).toFixed(1))
            : null,
        averageRating: ratingAgg?._avg?.rating
          ? parseFloat(ratingAgg._avg.rating.toFixed(1))
          : (contractorProfile?.rating ?? null),
        responseTime: latestKPI?.averageResponseTime
          ? `${Math.round(latestKPI.averageResponseTime * 60)} minutes`
          : null,
        memberSince:
          contractor?.createdAt?.toISOString().split('T')[0] ??
          contractorProfile?.createdAt?.toISOString().split('T')[0] ??
          null,
        tier: contractor?.subscription?.tier ?? null,
      },
      bankDetails: null,
      preferences: {
        notifications: {
          email: true,
          sms: true,
          push: false,
        },
        leadTypes: [],
        minJobValue: null,
        maxActiveJobs: contractor?.territories?.[0]?.maxJobsPerDay ?? null,
      },
      status: contractor?.status ?? contractorProfile?.availability ?? null,
      verificationStatus: contractorProfile?.isVerified
        ? 'VERIFIED'
        : contractor?.status === 'APPROVED'
          ? 'VERIFIED'
          : 'UNVERIFIED',
      lastUpdated:
        contractor?.updatedAt?.toISOString() ?? contractorProfile?.updatedAt?.toISOString() ?? null,
    };

    return successResponse(profile);
  } catch (error) {
    return handleAPIError(error);
  }
}

export async function PATCH(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/contractor/profile' });
  try {
    const user = await verifyAuth(request);

    if (!user || !hasRole(user.role as UserRole, [UserRole.CONTRACTOR, UserRole.ADMIN])) {
      throw new APIError('Contractor authentication required', 401);
    }

    const body = await request.json();
    const validatedData = profileUpdateSchema.parse(body);

    // Find or create the ContractorProfile
    const existingProfile = await prisma.contractorProfile.findFirst({
      where: { userId: user.id },
    });

    if (!existingProfile) {
      // Create a new profile if none exists
      const newProfile = await prisma.contractorProfile.create({
        data: {
          userId: user.id,
          businessName: validatedData.companyName ?? null,
          phone: validatedData.phone ?? null,
          address: validatedData.address ?? null,
          services: validatedData.services ?? [],
          serviceAreas: [],
        },
      });

      await logComplianceEvent({
        eventType: 'api_route_invocation',
        correlationId: '00000000-0000-0000-0000-000000000000',
        correlationType: 'system',
        entityType: 'contractor',
        metadata: {
          route: '/api/contractor/profile',
          method: 'PATCH',
          request_id: log.requestId,
          user_id: user.id,
          action: 'create',
        },
      });

      return successResponse({
        message: 'Profile created successfully',
        profile: {
          ...newProfile,
          lastUpdated: newProfile.updatedAt.toISOString(),
        },
      });
    }

    // Build update payload from validated data
    const updateData: Record<string, any> = {};

    if (validatedData.companyName !== undefined) {
      updateData.businessName = validatedData.companyName;
    }
    if (validatedData.phone !== undefined) {
      updateData.phone = validatedData.phone;
    }
    if (validatedData.address !== undefined) {
      updateData.address = validatedData.address;
    }
    if (validatedData.services !== undefined) {
      updateData.services = validatedData.services;
    }
    if (validatedData.email !== undefined) {
      // Email is on the User model, not ContractorProfile -- skip or handle separately
    }

    const updatedProfile = await prisma.contractorProfile.update({
      where: { id: existingProfile.id },
      data: updateData,
    });

    // If there is a linked Contractor record, update the company profile too
    const contractor = await prisma.contractor.findFirst({
      where: { email: user.email },
      include: { companyProfile: true },
    });

    if (contractor?.companyProfile && validatedData.companyName !== undefined) {
      await prisma.contractorCompany.update({
        where: { id: contractor.companyProfile.id },
        data: { companyName: validatedData.companyName },
      });
    }

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'contractor',
      metadata: {
        route: '/api/contractor/profile',
        method: 'PATCH',
        request_id: log.requestId,
        user_id: user.id,
        fields: Object.keys(updateData),
      },
    });

    return successResponse({
      message: 'Profile updated successfully',
      profile: {
        id: user.id,
        businessName: updatedProfile.businessName,
        phone: updatedProfile.phone,
        address: updatedProfile.address,
        services: updatedProfile.services,
        lastUpdated: updatedProfile.updatedAt.toISOString(),
      },
    });
  } catch (error) {
    captureException(error, {
      tags: { route: '/api/contractor/profile' },
      extra: { requestId: log.requestId },
    });
    return handleAPIError(error);
  }
}

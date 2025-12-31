import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

const onboardingStartSchema = z.object({
  contractorId: z.string().min(1),
  businessName: z.string().min(1),
  specialization: z.enum(['water', 'fire', 'mould', 'combined']),
  experience: z.number().int().min(0).max(50),
  certifications: z.array(z.string()).default([]),
});

interface ModuleDefinition {
  moduleId: string;
  courseName: string;
}

function getRecommendedModules(specialization: string): ModuleDefinition[] {
  const base: ModuleDefinition[] = [
    { moduleId: 'NRPG_STANDARDS_101', courseName: 'NRPG Standards & Operations' },
    { moduleId: 'CUSTOMER_SERVICE_101', courseName: 'Client Communication & Customer Service' },
    { moduleId: 'AU_COMPLIANCE_101', courseName: 'Australian Compliance & Safety' },
  ];

  const specialisationModules: Record<string, ModuleDefinition[]> = {
    water: [{ moduleId: 'WATER_DAMAGE_101', courseName: 'Water Damage Restoration' }],
    fire: [{ moduleId: 'FIRE_RESTORATION_101', courseName: 'Fire & Smoke Restoration' }],
    mould: [{ moduleId: 'MOULD_REMEDIATION_101', courseName: 'Mould Remediation' }],
    combined: [
      { moduleId: 'WATER_DAMAGE_101', courseName: 'Water Damage Restoration' },
      { moduleId: 'FIRE_RESTORATION_101', courseName: 'Fire & Smoke Restoration' },
      { moduleId: 'MOULD_REMEDIATION_101', courseName: 'Mould Remediation' },
    ],
  };

  return [...base, ...(specialisationModules[specialization] ?? [])];
}

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN']);
    }

    const body = await request.json();
    const validation = onboardingStartSchema.safeParse(body);
    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const input = validation.data;
    const contractorId = user.userType === 'CONTRACTOR' ? user.id : input.contractorId;

    if (user.userType === 'CONTRACTOR' && input.contractorId !== user.id) {
      return createErrorResponse(ErrorCode.FORBIDDEN, 'Unauthorized contractor onboarding start', 403);
    }

    const existing = await prisma.contractorOnboarding.findUnique({
      where: { contractorId },
    });

    if (existing) {
      return NextResponse.json({ success: true, onboarding: existing });
    }

    const recommendedModules = getRecommendedModules(input.specialization);

    const onboarding = await prisma.$transaction(async (tx) => {
      const created = await tx.contractorOnboarding.create({
        data: {
          contractorId,
          specialization: input.specialization,
          assessmentScore: null,
          recommendedModules,
          startDate: new Date(),
          targetCompletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
          status: 'IN_PROGRESS',
        },
      });

      await tx.contractorModuleProgress.createMany({
        data: recommendedModules.map((module) => ({
          onboardingId: created.id,
          moduleId: module.moduleId,
          courseName: module.courseName,
          status: 'NOT_STARTED',
          progress: 0,
          completed: false,
        })),
      });

      return created;
    });

    return NextResponse.json({ success: true, onboarding }, { status: 201 });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}


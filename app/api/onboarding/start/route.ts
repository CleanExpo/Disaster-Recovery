import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { loadNrpgTrainingIndex, parseNrpgModuleNumber } from '@/lib/training/nrp-training';

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

async function getRecommendedModules(specialization: string): Promise<ModuleDefinition[]> {
  const index = await loadNrpgTrainingIndex();
  const byId = new Map(index.modules.map((m) => [m.moduleId.toUpperCase(), m]));

  const coreModuleIds: string[] = [
    'NRP-001',
    'NRP-002',
    'NRP-004',
    'NRP-005',
    'NRP-013',
    'NRP-016',
    'NRP-018',
  ];

  const specializationModuleIds: Record<string, string[]> = {
    water: ['NRP-002', 'NRP-006', 'NRP-009', 'NRP-012', 'NRP-014'],
    fire: ['NRP-002', 'NRP-008', 'NRP-009', 'NRP-014', 'NRP-012'],
    mould: ['NRP-002', 'NRP-007', 'NRP-006', 'NRP-012'],
    combined: ['NRP-002', 'NRP-006', 'NRP-007', 'NRP-008', 'NRP-009', 'NRP-012', 'NRP-014'],
  };

  const desired = [...new Set([...coreModuleIds, ...(specializationModuleIds[specialization] ?? [])])];

  const modules: ModuleDefinition[] = [];
  for (const moduleId of desired) {
    const entry = byId.get(moduleId.toUpperCase());
    if (!entry) continue;
    modules.push({
      moduleId: entry.moduleId,
      courseName: entry.title,
    });
  }

  // Ensure stable ordering by module number when possible.
  modules.sort((a, b) => {
    const aNum = parseNrpgModuleNumber(a.moduleId) ?? Number.MAX_SAFE_INTEGER;
    const bNum = parseNrpgModuleNumber(b.moduleId) ?? Number.MAX_SAFE_INTEGER;
    return aNum - bNum;
  });

  return modules;
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

    const recommendedModules = await getRecommendedModules(input.specialization);
    if (recommendedModules.length === 0) {
      return createErrorResponse(ErrorCode.INTERNAL_ERROR, 'No training modules available', 500);
    }

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

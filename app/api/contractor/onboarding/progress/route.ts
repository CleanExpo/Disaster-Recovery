/**
 * GET/PATCH /api/contractor/onboarding/progress
 *
 * GET:   Returns the contractor's onboarding progress + module statuses.
 * PATCH: Starts or completes a specific day's module, persisting to DB.
 *
 * Requires JWT auth via `Authorisation: Bearer <token>` header.
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { withAuth, type AuthenticatedRequest } from '@/lib/auth-middleware';
import {
  ONBOARDING_MODULE_COUNT,
  onboardingModuleName,
  parseOnboardingModuleNumber,
} from '@/lib/onboarding/program-constants';
import { logComplianceEvent } from '@/lib/compliance/events';
import { z } from 'zod';

// ── GET: fetch current progress ─────────────────────────────────────────────

async function handleGet(req: AuthenticatedRequest) {
  const contractorId = req.user?.userId ?? req.user?.id;
  if (!contractorId) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  const [progress, modules] = await Promise.all([
    prisma.onboardingProgress.findUnique({ where: { contractorId } }),
    prisma.moduleProgress.findMany({
      where: { contractorId },
      orderBy: { moduleName: 'asc' },
    }),
  ]);

  const sortedModules = [...modules].sort(
    (a, b) => parseOnboardingModuleNumber(a.moduleName) - parseOnboardingModuleNumber(b.moduleName),
  );

  return NextResponse.json({
    currentStep: progress?.currentStep ?? 0,
    totalSteps: progress?.totalSteps ?? ONBOARDING_MODULE_COUNT,
    completed: progress?.completed ?? false,
    startedAt: progress?.startedAt ?? null,
    completedAt: progress?.completedAt ?? null,
    modules: sortedModules.map((m) => ({
      moduleName: m.moduleName,
      completed: m.completed,
      score: m.score,
      attempts: m.attempts,
      startedAt: m.startedAt,
      completedAt: m.completedAt,
    })),
  });
}

export const GET = withAuth(handleGet);

// ── PATCH: start or complete a day ──────────────────────────────────────────

const patchSchema = z.object({
  day: z.number().int().min(1).max(ONBOARDING_MODULE_COUNT),
  action: z.enum(['start', 'complete']),
  score: z.number().min(0).max(100).optional(),
});

async function handlePatch(req: AuthenticatedRequest) {
  const contractorId = req.user?.userId ?? req.user?.id;
  if (!contractorId) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const parsed = patchSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0]?.message ?? 'Invalid request' },
      { status: 400 },
    );
  }

  const { day, action, score } = parsed.data;
  const moduleName = onboardingModuleName(day);

  if (action === 'start') {
    // Mark module as started (set startedAt if not already set)
    await prisma.moduleProgress.upsert({
      where: { contractorId_moduleName: { contractorId, moduleName } },
      create: {
        contractorId,
        moduleName,
        completed: false,
        attempts: 1,
        startedAt: new Date(),
      },
      update: {
        attempts: { increment: 1 },
        startedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, action: 'started', day });
  }

  // action === 'complete'
  // Advance onboarding progress to next module
  const nextStep = day + 1;
  const isFullyComplete = day >= ONBOARDING_MODULE_COUNT;
  const now = new Date();

  await prisma.$transaction(async (tx) => {
    await tx.moduleProgress.upsert({
      where: { contractorId_moduleName: { contractorId, moduleName } },
      create: {
        contractorId,
        moduleName,
        completed: true,
        score: score ?? null,
        attempts: 1,
        startedAt: now,
        completedAt: now,
      },
      update: {
        completed: true,
        score: score ?? undefined,
        completedAt: now,
      },
    });

    await tx.onboardingProgress.upsert({
      where: { contractorId },
      create: {
        contractorId,
        currentStep: isFullyComplete ? ONBOARDING_MODULE_COUNT : nextStep,
        totalSteps: ONBOARDING_MODULE_COUNT,
        completed: isFullyComplete,
        completedAt: isFullyComplete ? now : undefined,
      },
      update: {
        currentStep: isFullyComplete ? ONBOARDING_MODULE_COUNT : nextStep,
        totalSteps: ONBOARDING_MODULE_COUNT,
        completed: isFullyComplete,
        completedAt: isFullyComplete ? now : undefined,
      },
    });

    await tx.contractor.update({
      where: { id: contractorId },
      data: isFullyComplete
        ? {
            onboardingStep: ONBOARDING_MODULE_COUNT,
            onboardingCompleted: true,
            status: 'APPROVED',
            approvedAt: now,
          }
        : {
            onboardingStep: nextStep,
          },
    });
  });

  if (isFullyComplete) {
    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: contractorId,
      correlationType: 'contractor_membership',
      entityType: 'contractor',
      entityIdentifier: contractorId,
      metadata: {
        route: '/api/contractor/onboarding/progress',
        completed_modules: ONBOARDING_MODULE_COUNT,
        auto_approved_for_dispatch: true,
      },
    });
  }

  return NextResponse.json({
    success: true,
    action: 'completed',
    day,
    nextStep: isFullyComplete ? null : nextStep,
    onboardingComplete: isFullyComplete,
  });
}

export const PATCH = withAuth(handlePatch);

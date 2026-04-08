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

  return NextResponse.json({
    currentStep: progress?.currentStep ?? 0,
    totalSteps: progress?.totalSteps ?? 14,
    completed: progress?.completed ?? false,
    startedAt: progress?.startedAt ?? null,
    completedAt: progress?.completedAt ?? null,
    modules: modules.map((m) => ({
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
  day: z.number().int().min(1).max(14),
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
  const moduleName = `Day ${day} Module`;

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
  await prisma.moduleProgress.upsert({
    where: { contractorId_moduleName: { contractorId, moduleName } },
    create: {
      contractorId,
      moduleName,
      completed: true,
      score: score ?? null,
      attempts: 1,
      startedAt: new Date(),
      completedAt: new Date(),
    },
    update: {
      completed: true,
      score: score ?? undefined,
      completedAt: new Date(),
    },
  });

  // Advance onboarding progress to next day
  const nextStep = day + 1;
  const isFullyComplete = day >= 14;

  await prisma.onboardingProgress.upsert({
    where: { contractorId },
    create: {
      contractorId,
      currentStep: isFullyComplete ? 14 : nextStep,
      totalSteps: 14,
      completed: isFullyComplete,
      completedAt: isFullyComplete ? new Date() : undefined,
    },
    update: {
      currentStep: isFullyComplete ? 14 : nextStep,
      completed: isFullyComplete,
      completedAt: isFullyComplete ? new Date() : undefined,
    },
  });

  return NextResponse.json({
    success: true,
    action: 'completed',
    day,
    nextStep: isFullyComplete ? null : nextStep,
    onboardingComplete: isFullyComplete,
  });
}

export const PATCH = withAuth(handlePatch);

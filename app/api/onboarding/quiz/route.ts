import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

const quizRequestSchema = z.object({
  moduleId: z.string().min(1),
  contractorId: z.string().min(1),
});

interface QuizQuestion {
  question: string;
  options: string[];
  correct: string;
  explanation: string;
}

function buildQuiz(moduleId: string): { timeLimit: number; passingScore: number; questions: QuizQuestion[] } {
  const base: QuizQuestion[] = [
    {
      question: 'Which statement best describes NRPG’s contractor privacy model?',
      options: [
        'Clients can browse contractor profiles and select a preferred contractor',
        'Clients can see contractor names but not contact details',
        'Contractor identities are kept private; NRPG dispatches automatically',
        'Contractors are listed publicly after completing one job',
      ],
      correct: 'Contractor identities are kept private; NRPG dispatches automatically',
      explanation: 'NRPG keeps the contractor network private and uses auto-dispatch.',
    },
    {
      question: 'In Australia, how many digits are in a standard postcode?',
      options: ['3', '4', '5', '6'],
      correct: '4',
      explanation: 'Australian postcodes are 4 digits.',
    },
    {
      question: 'Which spelling matches Australian English?',
      options: ['mold', 'mould', 'molt', 'molde'],
      correct: 'mould',
      explanation: 'Use Australian spelling: mould.',
    },
    {
      question: 'When working with tenant-scoped data, what is required?',
      options: [
        'No tenant filtering is needed',
        'Always filter by `tenantId` where applicable',
        'Only filter by tenantId for admins',
        'Store tenantId in localStorage',
      ],
      correct: 'Always filter by `tenantId` where applicable',
      explanation: 'Multi-tenant isolation is critical; avoid cross-tenant data exposure.',
    },
  ];

  const moduleSpecific: Record<string, QuizQuestion[]> = {
    NRPG_STANDARDS_101: [
      {
        question: 'What is the safest default for client communications with contractors?',
        options: [
          'Direct client → contractor chat',
          'Client emails contractor directly',
          'NRPG-mediated communications',
          'Public contractor phone directory',
        ],
        correct: 'NRPG-mediated communications',
        explanation: 'Direct exposure is avoided; NRPG mediates communications.',
      },
    ],
    AU_COMPLIANCE_101: [
      {
        question: 'Which is an acceptable way to present currency to Australian users?',
        options: ['USD $2,750', '£2,750', 'AU$2,750', '¥2,750'],
        correct: 'AU$2,750',
        explanation: 'Use AUD for Australian pricing (e.g., AU$2,750).',
      },
    ],
    MOULD_REMEDIATION_101: [
      {
        question: 'Which term should appear in reports and UI for fungal contamination work?',
        options: ['Mold remediation', 'Mould remediation', 'Mildew clean', 'Fungus wipe'],
        correct: 'Mould remediation',
        explanation: 'Use Australian spelling: mould remediation.',
      },
    ],
  };

  const questions = [
    ...base,
    ...(moduleSpecific[moduleId] ?? []),
  ];

  // Pad to 10 questions with generic operational items.
  while (questions.length < 10) {
    const n = questions.length + 1;
    questions.push({
      question: `Operational check ${n}: What should happen if a contractor is not verified?`,
      options: [
        'They receive claims immediately',
        'They can browse client details without restrictions',
        'They should not be dispatched until verified',
        'They are publicly listed to gain credibility',
      ],
      correct: 'They should not be dispatched until verified',
      explanation: 'Only verified contractors should receive dispatched work.',
    });
  }

  return {
    timeLimit: 30,
    passingScore: 70,
    questions,
  };
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
    const validation = quizRequestSchema.safeParse(body);
    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const { moduleId, contractorId } = validation.data;

    if (user.userType === 'CONTRACTOR' && contractorId !== user.id) {
      return createErrorResponse(ErrorCode.FORBIDDEN, 'Unauthorized quiz access', 403);
    }

    return NextResponse.json({
      success: true,
      quiz: {
        moduleId,
        ...buildQuiz(moduleId),
      },
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}


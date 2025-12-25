import { prisma } from './prisma';
import { generateEmbeddings } from './gemma-service';

export interface ContractorOnboardingRequest {
  contractorId: string;
  specialization: 'water' | 'fire' | 'mould' | 'combined';
  experience: number;
  certifications: string[];
  businessName: string;
}

export class ContractorOnboardingService {
  // Generate personalized onboarding path based on contractor profile
  static async generateOnboardingPath(request: ContractorOnboardingRequest) {
    // Assess current competency using T5Gemma
    const assessment = await this.assessContractorCompetency(request);

    // Generate personalized learning path
    const trainingPath = this.createPersonalizedPath(assessment, request);

    // Create onboarding record
    const onboarding = await prisma.contractorOnboarding.create({
      data: {
        contractorId: request.contractorId,
        specialization: request.specialization,
        assessmentScore: assessment.score,
        recommendedModules: trainingPath,
        startDate: new Date(),
        targetCompletionDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
        status: 'PENDING_START',
      },
    });

    return onboarding;
  }

  // Use T5Gemma to assess contractor competency
  static async assessContractorCompetency(request: ContractorOnboardingRequest) {
    const assessmentPrompt = `
      Assess this restoration contractor's competency level:

      Specialization: ${request.specialization}
      Years of Experience: ${request.experience}
      Certifications: ${request.certifications.join(', ')}
      Business: ${request.businessName}

      Provide:
      1. Overall competency score (0-100)
      2. Skill gaps identified
      3. Recommended training modules (prioritized)
      4. Estimated time to certification
      5. Key strengths to build upon

      Format as JSON: { score, gaps, modules, timeEstimate, strengths }
    `;

    const assessment = await generateEmbeddings(assessmentPrompt);
    return JSON.parse(assessment);
  }

  // Create personalized training path
  static createPersonalizedPath(assessment: any, request: ContractorOnboardingRequest) {
    const modules = [];

    // Always include certification modules
    if (request.specialization === 'water' || request.specialization === 'combined') {
      modules.push({
        courseId: 'WATER_DAMAGE_101',
        modules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        priority: 'HIGH',
      });
    }

    if (request.specialization === 'fire' || request.specialization === 'combined') {
      modules.push({
        courseId: 'FIRE_RESTORATION_101',
        modules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        priority: 'HIGH',
      });
    }

    // Always include customer service
    modules.push({
      courseId: 'CUSTOMER_SERVICE_101',
      modules: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      priority: 'HIGH',
    });

    // Add business ownership if not already certified
    if (!request.certifications.includes('BUSINESS_OWNER')) {
      modules.push({
        courseId: 'BUSINESS_OWNERSHIP_101',
        modules: ['Business Model', 'Assessment', 'Development', 'Operations'],
        priority: 'MEDIUM',
      });
    }

    return modules;
  }

  // Generate personalized assessment quiz using T5Gemma
  static async generateAssessmentQuiz(moduleId: string, contractorId: string) {
    const quizPrompt = `
      Generate a 10-question assessment quiz for contractor onboarding module: ${moduleId}

      Requirements:
      - Mix of scenario-based and knowledge questions
      - Australian standards compliance focus
      - Practical application emphasis
      - Multiple choice with 4 options
      - Include correct answer and explanation

      Format as JSON: { questions: [{ question, options, correct, explanation }] }
    `;

    const quiz = await generateEmbeddings(quizPrompt);
    return JSON.parse(quiz);
  }

  // Track progress and recommend next steps
  static async getProgressReport(contractorId: string) {
    const onboarding = await prisma.contractorOnboarding.findUnique({
      where: { contractorId },
      include: {
        moduleProgress: true,
        assessments: true,
      },
    });

    if (!onboarding) return null;

    const completionPercentage =
      (onboarding.moduleProgress.filter(m => m.completed).length /
       onboarding.moduleProgress.length) * 100;

    return {
      contractorId,
      specialization: onboarding.specialization,
      completionPercentage,
      currentModule: onboarding.moduleProgress.find(m => !m.completed),
      assessmentScores: onboarding.assessments.map(a => ({
        moduleId: a.moduleId,
        score: a.score,
        completedAt: a.completedAt,
      })),
      certificationType: completionPercentage === 100 ? 'CERTIFIED' : 'IN_PROGRESS',
    };
  }
}

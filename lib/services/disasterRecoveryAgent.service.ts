import { getT5GemmaService } from './t5gemma.service';
import { getWorkerService } from './autonomousWorker.service';
import { prisma } from '@/lib/prisma';


interface DisasterScenario {
    type: string;
    severity: number;
    description: string;
    affectedAreas: string[];
}

interface AnalysisResult {
    jobId: string;
    status: 'queued' | 'processing' | 'completed' | 'failed';
    immediateActions?: string[];
    recoveryPlan?: string;
    resourceNeeds?: string[];
}

class DisasterRecoveryAgent {
    private t5Service: ReturnType<typeof getT5GemmaService>;
    private workerService: ReturnType<typeof getWorkerService>;

  constructor() {
        this.t5Service = getT5GemmaService();
        this.workerService = getWorkerService();
  }

  async analyzeDisaster(
        disaster: DisasterScenario,
        userId: string
      ): Promise<AnalysisResult> {
        const prompt = `Analyze this disaster scenario and provide recovery recommendations:
        Type: ${disaster.type}
        Severity: ${disaster.severity}/10
        Description: ${disaster.description}
        Affected Areas: ${disaster.affectedAreas.join(', ')}

        Provide structured response with:
        1. IMMEDIATE ACTIONS (numbered list, 3-5 items)
        2. RECOVERY PLAN (timeline and steps)
        3. RESOURCE NEEDS (equipment and personnel)`;

      const jobId = await this.workerService.enqueueTask(
              userId,
              'disaster-analysis',
        {
                  taskType: 'generation',
                  input: prompt,
        },
              9 // High priority
            );

      logger.info(`Disaster analysis queued for user ${userId}: ${jobId}`);

      return {
              jobId,
              status: 'queued',
      };
  }

  async generateRecoveryPlan(
        disasterId: string,
        userId: string
      ): Promise<AnalysisResult> {
        try {
                const disaster = await prisma.disaster.findUnique({
                          where: { id: disasterId },
                });

          if (!disaster) {
                    throw new Error(`Disaster ${disasterId} not found`);
          }

          const prompt = `Generate a detailed recovery plan for:
          Name: ${disaster.name}
          Type: ${disaster.type}
          Impact: ${disaster.description}

          Include structured response with:
          1. TIMELINE (phases and duration)
          2. RESOURCE ALLOCATION (teams and equipment)
          3. TEAM COORDINATION (roles and responsibilities)
          4. SUCCESS METRICS (measurable outcomes)
          5. RISK MITIGATION (contingency plans)`;

          const jobId = await this.workerService.enqueueTask(
                    userId,
                    'recovery-plan-generation',
            {
                        taskType: 'generation',
                        input: prompt,
            },
                    9
                  );

          logger.info(
                    `Recovery plan generation queued for disaster ${disasterId}: ${jobId}`
                  );

          return {
                    jobId,
                    status: 'queued',
          };
        } catch (error) {
                logger.error(`Error generating recovery plan: ${error}`);
                throw error;
        }
  }

  async extractCriticalInfo(
        document: string,
        userId: string
      ): Promise<AnalysisResult> {
        const prompt = `Extract critical information from this disaster-related document:

        ${document}

        Extract and structure:
        - KEY FACTS (dates, locations, affected populations)
        - IMMEDIATE HAZARDS (ongoing threats)
        - REQUIRED RESOURCES (urgent needs)
        - CONTACT INFORMATION (emergency contacts)
        - CRITICAL INFRASTRUCTURE STATUS`;

      const jobId = await this.workerService.enqueueTask(
              userId,
              'critical-extraction',
        {
                  taskType: 'extraction',
                  input: prompt,
        },
              10 // Highest priority
            );

      logger.info(`Critical info extraction queued: ${jobId}`);

      return {
              jobId,
              status: 'queued',
      };
  }

  async summarizeIncidentReport(
        report: string,
        userId: string
      ): Promise<AnalysisResult> {
        const jobId = await this.workerService.enqueueTask(
                userId,
                'incident-summary',
          {
                    taskType: 'summarization',
                    input: report,
          },
                8
              );

      logger.info(`Incident report summary queued: ${jobId}`);

      return {
              jobId,
              status: 'queued',
      };
  }

  async getAnalysisStatus(jobId: string): Promise<any> {
        const status = await this.workerService.getJobStatus(jobId);
        return status;
  }

  async answerRecoveryQuestion(
        question: string,
        context: string,
        userId: string
      ): Promise<AnalysisResult> {
        const prompt = `Based on disaster recovery standards, answer this question:
        Question: ${question}
        Context: ${context}

        Provide a detailed, actionable answer with specific steps and best practices.`;

      const jobId = await this.workerService.enqueueTask(
              userId,
              'disaster-qa',
        {
                  taskType: 'qa',
                  input: question,
                  context: prompt,
        },
              7
            );

      logger.info(`Disaster Q&A queued: ${jobId}`);

      return {
              jobId,
              status: 'queued',
      };
  }
}

let instance: DisasterRecoveryAgent | null = null;

export function getDisasterRecoveryAgent(): DisasterRecoveryAgent {
    if (!instance) {
          instance = new DisasterRecoveryAgent();
    }
    return instance;
}

export default DisasterRecoveryAgent;

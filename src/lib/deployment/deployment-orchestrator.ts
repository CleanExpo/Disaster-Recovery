/**
 * Deployment Orchestrator
 *
 * Manage deployment pipelines and orchestrate deployments
 */

import { EventEmitter } from 'events';

interface DeploymentPipeline {
  id: string;
  name: string;
  stages: PipelineStage[];
  triggerOn: 'manual' | 'commit' | 'tag' | 'schedule';
  createdAt: string;
  updatedAt: string;
}

interface PipelineStage {
  name: string;
  order: number;
  steps: PipelineStep[];
  parallelizable: boolean;
}

interface PipelineStep {
  name: string;
  command: string;
  timeout: number; // milliseconds
  retries: number;
  onFailure: 'continue' | 'abort';
}

interface DeploymentJob {
  id: string;
  pipelineId: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'cancelled';
  environment: string;
  version: string;
  startedAt?: number;
  completedAt?: number;
  logs: string[];
  stages: {
    [stageName: string]: {
      status: 'pending' | 'running' | 'completed' | 'failed';
      startedAt?: number;
      completedAt?: number;
      steps: {
        [stepName: string]: {
          status: 'pending' | 'running' | 'completed' | 'failed';
          output?: string;
          error?: string;
          duration?: number;
        };
      };
    };
  };
}

interface RollbackConfig {
  enableAutoRollback: boolean;
  rollbackTriggers: {
    errorRateThreshold: number; // % errors
    latencyThreshold: number; // ms
    healthCheckFailures: number;
  };
  maxRollbackAttempts: number;
}

export class DeploymentOrchestrator extends EventEmitter {
  private pipelines: Map<string, DeploymentPipeline> = new Map();
  private jobs: Map<string, DeploymentJob> = new Map();
  private jobHistory: DeploymentJob[] = [];
  private rollbackConfigs: Map<string, RollbackConfig> = new Map();
  private maxJobHistory = 1000;

  constructor() {
    super();
    this.initializeDefaultPipelines();
    this.initializeRollbackConfigs();
  }

  /**
   * Initialize default deployment pipelines
   */
  private initializeDefaultPipelines() {
    this.createPipeline(
      'develop',
      'Development Deployment',
      'commit',
      [
        {
          name: 'Build',
          order: 1,
          parallelizable: false,
          steps: [
            {
              name: 'Install Dependencies',
              command: 'npm install',
              timeout: 300000,
              retries: 2,
              onFailure: 'abort',
            },
            {
              name: 'Run Tests',
              command: 'npm run test',
              timeout: 600000,
              retries: 1,
              onFailure: 'abort',
            },
            {
              name: 'Build Application',
              command: 'npm run build',
              timeout: 300000,
              retries: 1,
              onFailure: 'abort',
            },
          ],
        },
        {
          name: 'Deploy',
          order: 2,
          parallelizable: false,
          steps: [
            {
              name: 'Deploy to Dev',
              command: 'docker build . -t nrp:dev && docker push nrp:dev',
              timeout: 600000,
              retries: 2,
              onFailure: 'abort',
            },
            {
              name: 'Health Check',
              command: 'curl http://localhost:3000/health',
              timeout: 60000,
              retries: 3,
              onFailure: 'continue',
            },
          ],
        },
      ]
    );

    this.createPipeline(
      'staging',
      'Staging Deployment',
      'tag',
      [
        {
          name: 'Build',
          order: 1,
          parallelizable: false,
          steps: [
            {
              name: 'Install Dependencies',
              command: 'npm install --production',
              timeout: 300000,
              retries: 2,
              onFailure: 'abort',
            },
            {
              name: 'Run Tests',
              command: 'npm run test:ci',
              timeout: 600000,
              retries: 1,
              onFailure: 'abort',
            },
            {
              name: 'Run Lint',
              command: 'npm run lint',
              timeout: 120000,
              retries: 0,
              onFailure: 'abort',
            },
            {
              name: 'Build Application',
              command: 'npm run build',
              timeout: 300000,
              retries: 1,
              onFailure: 'abort',
            },
          ],
        },
        {
          name: 'Deploy',
          order: 2,
          parallelizable: false,
          steps: [
            {
              name: 'Build Docker Image',
              command: 'docker build . -t nrp:staging',
              timeout: 600000,
              retries: 2,
              onFailure: 'abort',
            },
            {
              name: 'Push to Registry',
              command: 'docker push nrp:staging',
              timeout: 300000,
              retries: 2,
              onFailure: 'abort',
            },
            {
              name: 'Deploy to Staging',
              command: 'kubectl set image deployment/nrp nrp=nrp:staging',
              timeout: 600000,
              retries: 1,
              onFailure: 'abort',
            },
          ],
        },
        {
          name: 'Verification',
          order: 3,
          parallelizable: true,
          steps: [
            {
              name: 'Health Check',
              command: 'curl https://staging.nrp.com/health',
              timeout: 60000,
              retries: 5,
              onFailure: 'abort',
            },
            {
              name: 'Smoke Tests',
              command: 'npm run test:smoke',
              timeout: 300000,
              retries: 1,
              onFailure: 'abort',
            },
          ],
        },
      ]
    );

    this.createPipeline(
      'production',
      'Production Deployment',
      'tag',
      [
        {
          name: 'Validation',
          order: 1,
          parallelizable: false,
          steps: [
            {
              name: 'Verify Staging',
              command: 'curl https://staging.nrp.com/health',
              timeout: 60000,
              retries: 3,
              onFailure: 'abort',
            },
            {
              name: 'Run Full Test Suite',
              command: 'npm run test:full',
              timeout: 900000,
              retries: 0,
              onFailure: 'abort',
            },
          ],
        },
        {
          name: 'Deploy',
          order: 2,
          parallelizable: false,
          steps: [
            {
              name: 'Build Docker Image',
              command: 'docker build . -t nrp:latest -t nrp:v1.0.0',
              timeout: 600000,
              retries: 2,
              onFailure: 'abort',
            },
            {
              name: 'Push to Registry',
              command: 'docker push nrp:latest && docker push nrp:v1.0.0',
              timeout: 300000,
              retries: 2,
              onFailure: 'abort',
            },
            {
              name: 'Create Backup',
              command: 'pg_dump nrp > backup_$(date +%s).sql',
              timeout: 1800000,
              retries: 1,
              onFailure: 'abort',
            },
            {
              name: 'Blue-Green Deploy',
              command: 'kubectl apply -f deployment/blue-green.yaml',
              timeout: 900000,
              retries: 1,
              onFailure: 'abort',
            },
          ],
        },
        {
          name: 'Verification',
          order: 3,
          parallelizable: true,
          steps: [
            {
              name: 'Health Check',
              command: 'curl https://nrp.com/health',
              timeout: 60000,
              retries: 10,
              onFailure: 'continue',
            },
            {
              name: 'E2E Tests',
              command: 'npm run test:e2e',
              timeout: 600000,
              retries: 0,
              onFailure: 'abort',
            },
            {
              name: 'Performance Tests',
              command: 'npm run test:performance',
              timeout: 300000,
              retries: 0,
              onFailure: 'continue',
            },
          ],
        },
      ]
    );
  }

  /**
   * Initialize rollback configurations
   */
  private initializeRollbackConfigs() {
    this.setRollbackConfig('production', {
      enableAutoRollback: true,
      rollbackTriggers: {
        errorRateThreshold: 5, // 5% error rate
        latencyThreshold: 2000, // 2 seconds
        healthCheckFailures: 3,
      },
      maxRollbackAttempts: 2,
    });

    this.setRollbackConfig('staging', {
      enableAutoRollback: false,
      rollbackTriggers: {
        errorRateThreshold: 10,
        latencyThreshold: 5000,
        healthCheckFailures: 5,
      },
      maxRollbackAttempts: 1,
    });
  }

  /**
   * Create deployment pipeline
   */
  createPipeline(
    id: string,
    name: string,
    triggerOn: 'manual' | 'commit' | 'tag' | 'schedule',
    stages: PipelineStage[]
  ): DeploymentPipeline {
    const pipeline: DeploymentPipeline = {
      id,
      name,
      stages,
      triggerOn,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.pipelines.set(id, pipeline);
    this.emit('pipeline:created', pipeline);
    return pipeline;
  }

  /**
   * Get pipeline
   */
  getPipeline(pipelineId: string): DeploymentPipeline | null {
    return this.pipelines.get(pipelineId) || null;
  }

  /**
   * Get all pipelines
   */
  getAllPipelines(): DeploymentPipeline[] {
    return Array.from(this.pipelines.values());
  }

  /**
   * Start deployment job
   */
  startDeploymentJob(
    pipelineId: string,
    environment: string,
    version: string
  ): DeploymentJob | null {
    const pipeline = this.pipelines.get(pipelineId);
    if (!pipeline) return null;

    const jobId = `job_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    const job: DeploymentJob = {
      id: jobId,
      pipelineId,
      status: 'pending',
      environment,
      version,
      logs: [],
      stages: {},
    };

    // Initialize stages
    for (const stage of pipeline.stages) {
      job.stages[stage.name] = {
        status: 'pending',
        steps: {},
      };

      for (const step of stage.steps) {
        job.stages[stage.name].steps[step.name] = {
          status: 'pending',
        };
      }
    }

    this.jobs.set(jobId, job);
    this.emit('job:started', job);

    // Simulate job execution
    this.executeJob(jobId);

    return job;
  }

  /**
   * Execute deployment job
   */
  private async executeJob(jobId: string) {
    const job = this.jobs.get(jobId);
    if (!job) return;

    job.status = 'running';
    job.startedAt = Date.now();
    this.emit('job:running', job);

    const pipeline = this.pipelines.get(job.pipelineId);
    if (!pipeline) return;

    for (const stage of pipeline.stages) {
      job.stages[stage.name].status = 'running';
      job.stages[stage.name].startedAt = Date.now();

      for (const step of stage.steps) {
        job.stages[stage.name].steps[step.name].status = 'running';

        // Simulate step execution (in production, actually run commands)
        const success = Math.random() > 0.05; // 95% success rate for demo

        if (success) {
          job.stages[stage.name].steps[step.name].status = 'completed';
          job.stages[stage.name].steps[step.name].duration = Math.floor(
            Math.random() * 5000
          );
          job.logs.push(`✓ ${stage.name} > ${step.name}`);
        } else {
          job.stages[stage.name].steps[step.name].status = 'failed';
          job.stages[stage.name].steps[step.name].error = 'Command failed';
          job.logs.push(`✗ ${stage.name} > ${step.name}`);

          if (step.onFailure === 'abort') {
            job.status = 'failed';
            job.completedAt = Date.now();
            this.jobs.set(jobId, job);
            this.jobHistory.push(job);
            this.emit('job:failed', job);
            return;
          }
        }

        await new Promise(resolve => setTimeout(resolve, 100));
      }

      job.stages[stage.name].status = 'completed';
      job.stages[stage.name].completedAt = Date.now();
    }

    job.status = 'completed';
    job.completedAt = Date.now();
    this.jobs.set(jobId, job);
    this.jobHistory.push(job);

    if (this.jobHistory.length > this.maxJobHistory) {
      this.jobHistory.shift();
    }

    this.emit('job:completed', job);
  }

  /**
   * Get deployment job
   */
  getDeploymentJob(jobId: string): DeploymentJob | null {
    return this.jobs.get(jobId) || null;
  }

  /**
   * Get job history
   */
  getJobHistory(pipelineId?: string, limit: number = 50): DeploymentJob[] {
    let history = [...this.jobHistory];

    if (pipelineId) {
      history = history.filter(j => j.pipelineId === pipelineId);
    }

    return history.slice(-limit);
  }

  /**
   * Cancel deployment job
   */
  cancelDeploymentJob(jobId: string): DeploymentJob | null {
    const job = this.jobs.get(jobId);
    if (!job || job.status === 'completed') return null;

    job.status = 'cancelled';
    job.completedAt = Date.now();
    this.emit('job:cancelled', job);
    return job;
  }

  /**
   * Set rollback configuration
   */
  setRollbackConfig(environment: string, config: RollbackConfig): void {
    this.rollbackConfigs.set(environment, config);
    this.emit('rollback:configured', { environment, config });
  }

  /**
   * Trigger rollback
   */
  triggerRollback(
    environment: string,
    targetVersion: string,
    reason: string
  ): DeploymentJob | null {
    const rollbackConfig = this.rollbackConfigs.get(environment);
    if (!rollbackConfig) return null;

    const rollbackPipeline = this.pipelines.get(`${environment}_rollback`);
    if (!rollbackPipeline) {
      // Create rollback job manually
      const jobId = `rollback_${Date.now()}`;

      const job: DeploymentJob = {
        id: jobId,
        pipelineId: `${environment}_rollback`,
        status: 'running',
        environment,
        version: targetVersion,
        startedAt: Date.now(),
        logs: [
          `Initiating rollback to version ${targetVersion}`,
          `Reason: ${reason}`,
          'Restoring database backup...',
          'Deploying previous version...',
          'Running health checks...',
          'Rollback completed successfully',
        ],
        stages: {},
      };

      job.completedAt = Date.now() + 300000; // Simulate 5 minute rollback
      this.jobHistory.push(job);
      this.emit('rollback:triggered', job);
      return job;
    }

    return this.startDeploymentJob(rollbackPipeline.id, environment, targetVersion);
  }

  /**
   * Get deployment statistics
   */
  getDeploymentStatistics(): {
    totalDeployments: number;
    successfulDeployments: number;
    failedDeployments: number;
    successRate: number;
    averageDeploymentTime: number;
    byEnvironment: {
      [env: string]: {
        total: number;
        successful: number;
        failed: number;
      };
    };
  } {
    const total = this.jobHistory.length;
    const successful = this.jobHistory.filter(
      j => j.status === 'completed'
    ).length;
    const failed = this.jobHistory.filter(j => j.status === 'failed').length;

    const durations = this.jobHistory
      .filter(j => j.completedAt && j.startedAt)
      .map(j => j.completedAt! - j.startedAt!);

    const avgDuration =
      durations.length > 0
        ? durations.reduce((a, b) => a + b, 0) / durations.length
        : 0;

    const byEnv: {
      [env: string]: { total: number; successful: number; failed: number };
    } = {};

    for (const job of this.jobHistory) {
      if (!byEnv[job.environment]) {
        byEnv[job.environment] = { total: 0, successful: 0, failed: 0 };
      }

      byEnv[job.environment].total++;
      if (job.status === 'completed') {
        byEnv[job.environment].successful++;
      } else if (job.status === 'failed') {
        byEnv[job.environment].failed++;
      }
    }

    return {
      totalDeployments: total,
      successfulDeployments: successful,
      failedDeployments: failed,
      successRate: total > 0 ? (successful / total) * 100 : 0,
      averageDeploymentTime: avgDuration,
      byEnvironment: byEnv,
    };
  }
}

// Export singleton instance
export const deploymentOrchestrator = new DeploymentOrchestrator();

import { NextRequest, NextResponse } from 'next/server';
import { deploymentOrchestrator } from '@/lib/deployment/deployment-orchestrator';

/**
 * Deployment Pipeline API
 *
 * GET /api/deployment/pipeline - Get pipeline or job details
 * POST /api/deployment/pipeline - Create or start deployment job
 * PATCH /api/deployment/pipeline - Update pipeline or job
 * DELETE /api/deployment/pipeline - Cancel deployment job
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const pipelineId = searchParams.get('pipelineId');
    const jobId = searchParams.get('jobId');

    // Get pipeline details
    if (action === 'pipeline' && pipelineId) {
      const pipeline = deploymentOrchestrator.getPipeline(pipelineId);
      if (!pipeline) {
        return NextResponse.json(
          { error: 'Pipeline not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(pipeline, { status: 200 });
    }

    // Get all default pipelines
    if (action === 'pipelines') {
      const pipelines = [
        deploymentOrchestrator.getPipeline('develop'),
        deploymentOrchestrator.getPipeline('staging'),
        deploymentOrchestrator.getPipeline('production'),
      ].filter(Boolean);

      return NextResponse.json(
        {
          pipelines,
          count: pipelines.length,
        },
        { status: 200 }
      );
    }

    // Get deployment job details
    if (action === 'job' && jobId) {
      const job = deploymentOrchestrator.getDeploymentJob(jobId);
      if (!job) {
        return NextResponse.json(
          { error: 'Deployment job not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(job, { status: 200 });
    }

    // Get job history
    if (action === 'job-history' && pipelineId) {
      const limit = searchParams.get('limit')
        ? parseInt(searchParams.get('limit')!)
        : 20;
      const history = deploymentOrchestrator.getJobHistory(pipelineId, limit);

      return NextResponse.json(
        {
          pipelineId,
          jobs: history,
          count: history.length,
        },
        { status: 200 }
      );
    }

    // Get deployment statistics
    if (action === 'statistics') {
      const stats = deploymentOrchestrator.getDeploymentStatistics();
      return NextResponse.json(stats, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Missing or invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in deployment pipeline GET:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deployment pipeline' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // Create custom pipeline
    if (action === 'create_pipeline') {
      const { id, name, triggerOn, stages } = body;

      if (!id || !name || !triggerOn || !stages || stages.length === 0) {
        return NextResponse.json(
          { error: 'Missing required fields: id, name, triggerOn, stages' },
          { status: 400 }
        );
      }

      const pipeline = deploymentOrchestrator.createPipeline(
        id,
        name,
        triggerOn,
        stages
      );

      return NextResponse.json(pipeline, { status: 201 });
    }

    // Start deployment job
    if (action === 'start_deployment') {
      const { pipelineId, environment, version } = body;

      if (!pipelineId || !environment || !version) {
        return NextResponse.json(
          { error: 'Missing required fields: pipelineId, environment, version' },
          { status: 400 }
        );
      }

      const job = deploymentOrchestrator.startDeploymentJob(
        pipelineId,
        environment,
        version
      );

      if (!job) {
        return NextResponse.json(
          { error: 'Failed to start deployment job' },
          { status: 400 }
        );
      }

      return NextResponse.json(job, { status: 201 });
    }

    // Trigger rollback
    if (action === 'trigger_rollback') {
      const { environment, targetVersion, reason } = body;

      if (!environment || !targetVersion) {
        return NextResponse.json(
          { error: 'Missing required fields: environment, targetVersion' },
          { status: 400 }
        );
      }

      const job = deploymentOrchestrator.triggerRollback(
        environment,
        targetVersion,
        reason || 'Manual rollback'
      );

      if (!job) {
        return NextResponse.json(
          { error: 'Failed to trigger rollback' },
          { status: 400 }
        );
      }

      return NextResponse.json(job, { status: 201 });
    }

    // Set rollback configuration
    if (action === 'set_rollback_config') {
      const { environment, config } = body;

      if (!environment || !config) {
        return NextResponse.json(
          { error: 'Missing required fields: environment, config' },
          { status: 400 }
        );
      }

      deploymentOrchestrator.setRollbackConfig(environment, config);

      return NextResponse.json(
        {
          environment,
          message: 'Rollback config set successfully',
        },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in deployment pipeline POST:', error);
    return NextResponse.json(
      { error: 'Failed to process deployment pipeline request' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // Update job status (for manual intervention)
    if (action === 'update_job_status') {
      const { jobId, status, statusMessage } = body;

      if (!jobId || !status) {
        return NextResponse.json(
          { error: 'Missing required fields: jobId, status' },
          { status: 400 }
        );
      }

      const job = deploymentOrchestrator.getDeploymentJob(jobId);
      if (!job) {
        return NextResponse.json(
          { error: 'Deployment job not found' },
          { status: 404 }
        );
      }

      // Manually update job status (for emergency cases)
      (job as any).status = status;
      if (statusMessage) {
        (job as any).statusMessage = statusMessage;
      }

      return NextResponse.json(job, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in deployment pipeline PATCH:', error);
    return NextResponse.json(
      { error: 'Failed to update deployment pipeline' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const jobId = searchParams.get('jobId');

    if (!jobId) {
      return NextResponse.json(
        { error: 'jobId is required' },
        { status: 400 }
      );
    }

    const job = deploymentOrchestrator.cancelDeploymentJob(jobId);

    if (!job) {
      return NextResponse.json(
        { error: 'Deployment job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        jobId,
        message: 'Deployment job cancelled',
        job,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error in deployment pipeline DELETE:', error);
    return NextResponse.json(
      { error: 'Failed to cancel deployment job' },
      { status: 500 }
    );
  }
}

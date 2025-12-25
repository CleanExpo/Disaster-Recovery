import { NextRequest, NextResponse } from 'next/server';
import { deploymentConfig } from '@/lib/deployment/deployment-config';

/**
 * Deployment Configuration API
 *
 * GET /api/deployment/config - Get environment or config details
 * POST /api/deployment/config - Create or update configuration
 * PATCH /api/deployment/config - Update specific configuration
 * DELETE /api/deployment/config - Delete configuration
 */

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const envId = searchParams.get('envId');
    const configId = searchParams.get('configId');

    // Get environment details
    if (action === 'environment' && envId) {
      const environment = deploymentConfig.getEnvironment(envId);
      if (!environment) {
        return NextResponse.json(
          { error: 'Environment not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(environment, { status: 200 });
    }

    // Get all environments
    if (action === 'environments') {
      const environments = [
        deploymentConfig.getEnvironment('development'),
        deploymentConfig.getEnvironment('staging'),
        deploymentConfig.getEnvironment('production'),
      ].filter(Boolean);

      return NextResponse.json(
        {
          environments,
          count: environments.length,
        },
        { status: 200 }
      );
    }

    // Get feature flags for environment
    if (action === 'feature-flags' && envId) {
      const environment = deploymentConfig.getEnvironment(envId);
      if (!environment) {
        return NextResponse.json(
          { error: 'Environment not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          envId,
          featureFlags: environment.featureFlags || [],
          count: (environment.featureFlags || []).length,
        },
        { status: 200 }
      );
    }

    // Get deployment config
    if (action === 'deployment-config' && configId) {
      const config = deploymentConfig.getDeploymentConfig(configId);
      if (!config) {
        return NextResponse.json(
          { error: 'Deployment config not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(config, { status: 200 });
    }

    // Get latest deployment config
    if (action === 'latest') {
      const config = deploymentConfig.getLatestDeploymentConfig();
      return NextResponse.json(config, { status: 200 });
    }

    // Get deployment history
    if (action === 'history') {
      const limit = searchParams.get('limit')
        ? parseInt(searchParams.get('limit')!)
        : 10;
      const history = deploymentConfig.getDeploymentHistory(limit);

      return NextResponse.json(
        {
          history,
          count: history.length,
        },
        { status: 200 }
      );
    }

    // Check deployment dependencies
    if (action === 'dependencies') {
      const dependencies = deploymentConfig.checkDependencies();
      return NextResponse.json(dependencies, { status: 200 });
    }

    // Get deployment readiness
    if (action === 'readiness' && envId) {
      const readiness = deploymentConfig.getDeploymentReadiness(envId);
      return NextResponse.json(readiness, { status: 200 });
    }

    // Generate deployment report
    if (action === 'report' && envId) {
      const report = deploymentConfig.generateDeploymentReport(envId);
      return NextResponse.json(report, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Missing or invalid action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in deployment config GET:', error);
    return NextResponse.json(
      { error: 'Failed to fetch deployment config' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // Create environment
    if (action === 'create_environment') {
      const { id, name, description, url, apiUrl } = body;

      if (!id || !name || !url || !apiUrl) {
        return NextResponse.json(
          { error: 'Missing required fields: id, name, url, apiUrl' },
          { status: 400 }
        );
      }

      const environment = deploymentConfig.createEnvironment(
        id,
        name,
        description,
        url,
        apiUrl
      );

      return NextResponse.json(environment, { status: 201 });
    }

    // Set secret
    if (action === 'set_secret') {
      const { envId, key, value } = body;

      if (!envId || !key || !value) {
        return NextResponse.json(
          { error: 'Missing required fields: envId, key, value' },
          { status: 400 }
        );
      }

      const success = deploymentConfig.setSecret(envId, key, value);
      if (!success) {
        return NextResponse.json(
          { error: 'Failed to set secret' },
          { status: 400 }
        );
      }

      return NextResponse.json(
        {
          envId,
          key,
          message: 'Secret set successfully',
        },
        { status: 201 }
      );
    }

    // Create feature flag
    if (action === 'create_feature_flag') {
      const { name, targetEnvironments, enabled, rolloutPercentage } = body;

      if (!name || !targetEnvironments || targetEnvironments.length === 0) {
        return NextResponse.json(
          { error: 'Missing required fields: name, targetEnvironments' },
          { status: 400 }
        );
      }

      const flag = deploymentConfig.createFeatureFlag(
        name,
        targetEnvironments,
        enabled ?? true,
        rolloutPercentage ?? 100
      );

      return NextResponse.json(flag, { status: 201 });
    }

    // Create deployment config
    if (action === 'create_deployment_config') {
      const { name, version, environment } = body;

      if (!name || !version || !environment) {
        return NextResponse.json(
          { error: 'Missing required fields: name, version, environment' },
          { status: 400 }
        );
      }

      const config = deploymentConfig.createDeploymentConfig(
        name,
        version,
        environment
      );

      return NextResponse.json(config, { status: 201 });
    }

    // Update component status
    if (action === 'update_component_status') {
      const { configId, componentName, status, latency, error } = body;

      if (!configId || !componentName || !status) {
        return NextResponse.json(
          { error: 'Missing required fields: configId, componentName, status' },
          { status: 400 }
        );
      }

      const config = deploymentConfig.updateComponentStatus(
        configId,
        componentName,
        status,
        latency,
        error
      );

      if (!config) {
        return NextResponse.json(
          { error: 'Deployment config not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(config, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in deployment config POST:', error);
    return NextResponse.json(
      { error: 'Failed to process deployment config request' },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // Update feature flag rollout
    if (action === 'update_feature_flag_rollout') {
      const { flagId, rolloutPercentage } = body;

      if (!flagId || rolloutPercentage === undefined) {
        return NextResponse.json(
          { error: 'Missing required fields: flagId, rolloutPercentage' },
          { status: 400 }
        );
      }

      const flag = deploymentConfig.updateFeatureFlagRollout(
        flagId,
        rolloutPercentage
      );

      if (!flag) {
        return NextResponse.json(
          { error: 'Feature flag not found' },
          { status: 404 }
        );
      }

      return NextResponse.json(flag, { status: 200 });
    }

    return NextResponse.json(
      { error: 'Unknown action' },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error in deployment config PATCH:', error);
    return NextResponse.json(
      { error: 'Failed to update deployment config' },
      { status: 500 }
    );
  }
}

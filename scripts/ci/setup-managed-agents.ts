/**
 * scripts/ci/setup-managed-agents.ts
 *
 * Provisions the 5 Anthropic Managed Agents for the DR CI/CD pipeline.
 *
 * IMPORTANT — Research Preview requirement:
 *   The Anthropic Managed Agents API is currently in Research Preview.
 *   Your API key must have Research Preview access before this script will work.
 *   Request access at: https://www.anthropic.com/contact-sales
 *
 * Usage:
 *   ANTHROPIC_API_KEY=<key> npx tsx scripts/ci/setup-managed-agents.ts
 *
 * On success, agent IDs are written to .claude/managed-agents.json.
 * This script is idempotent — it checks for existing agents before creating.
 *
 * @requires @anthropic-ai/sdk  (already in package.json dependencies)
 */

import Anthropic from '@anthropic-ai/sdk';
import fs from 'fs';
import path from 'path';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AgentConfig {
  name: string;
  model: string;
  description: string;
}

export interface ManagedAgent {
  id: string;
  name: string;
  model: string;
  description: string;
  createdAt: string;
}

export interface ManagedAgentsManifest {
  createdAt: string;
  updatedAt: string;
  agents: Record<string, ManagedAgent>;
}

// ---------------------------------------------------------------------------
// Agent definitions
// ---------------------------------------------------------------------------

const AGENTS: AgentConfig[] = [
  {
    name: 'dr-build-validator',
    model: 'claude-sonnet-4-6',
    description:
      'Install deps, run prisma generate, tsc check, next build for the Disaster-Recovery Next.js app',
  },
  {
    name: 'dr-test-runner',
    model: 'claude-sonnet-4-6',
    description: 'Run unit tests and smoke tests on preview deployment URLs',
  },
  {
    name: 'dr-code-reviewer',
    model: 'claude-sonnet-4-6',
    description:
      'Review PRs for security issues, AU English compliance, type safety, and performance',
  },
  {
    name: 'dr-deploy-agent',
    model: 'claude-sonnet-4-6',
    description:
      'Run database migrations, vercel deploy, smoke test, and auto-rollback if smoke test fails',
  },
  {
    name: 'dr-pipeline-coordinator',
    model: 'claude-sonnet-4-6',
    description:
      'Orchestrate all CI/CD agents, gate pipeline stages, report results to GitHub PR',
  },
];

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const REPO_ROOT = path.resolve(process.cwd());
const MANIFEST_PATH = path.join(REPO_ROOT, '.claude', 'managed-agents.json');

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function loadManifest(): ManagedAgentsManifest {
  if (fs.existsSync(MANIFEST_PATH)) {
    const raw = fs.readFileSync(MANIFEST_PATH, 'utf-8');
    return JSON.parse(raw) as ManagedAgentsManifest;
  }
  return {
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    agents: {},
  };
}

function saveManifest(manifest: ManagedAgentsManifest): void {
  const dir = path.dirname(MANIFEST_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  manifest.updatedAt = new Date().toISOString();
  fs.writeFileSync(MANIFEST_PATH, JSON.stringify(manifest, null, 2), 'utf-8');
  console.log(`  Manifest saved → ${MANIFEST_PATH}`);
}

/**
 * Attempt to list existing agents from the Anthropic API.
 * Returns null if the endpoint is unavailable (Research Preview not enabled).
 *
 * NOTE: The Managed Agents API shape shown here is illustrative — the exact
 * endpoint path and response schema will be confirmed once you have Research
 * Preview access.  The script handles 404/403 gracefully.
 */
async function listExistingAgents(
  client: Anthropic,
): Promise<Array<{ id: string; name: string }> | null> {
  try {
    // The Managed Agents API is behind Research Preview.
    // Using the raw HTTP client to call the beta endpoint.
    const response = await (client as unknown as { get: (url: string, opts: Record<string, unknown>) => Promise<unknown> }).get('/v1/agents', {
      headers: { 'anthropic-beta': 'managed-agents-2025-04-09' },
    });
    const data = response as { data?: Array<{ id: string; name: string }> };
    return data?.data ?? [];
  } catch (err: unknown) {
    const error = err as { status?: number; message?: string };
    if (error?.status === 404 || error?.status === 403) {
      return null; // Research Preview not enabled
    }
    throw err;
  }
}

/**
 * Create a single managed agent via the Anthropic API.
 */
async function createAgent(
  client: Anthropic,
  config: AgentConfig,
): Promise<ManagedAgent> {
  const response = await (client as unknown as {
    post: (url: string, opts: Record<string, unknown>) => Promise<unknown>;
  }).post('/v1/agents', {
    body: {
      name: config.name,
      model: config.model,
      description: config.description,
    },
    headers: { 'anthropic-beta': 'managed-agents-2025-04-09' },
  });

  const data = response as { id: string; created_at?: string };
  return {
    id: data.id,
    name: config.name,
    model: config.model,
    description: config.description,
    createdAt: data.created_at ?? new Date().toISOString(),
  };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ERROR: ANTHROPIC_API_KEY environment variable is not set.');
    process.exit(1);
  }

  const client = new Anthropic({ apiKey });
  const manifest = loadManifest();

  console.log('\nDR Managed Agents Setup');
  console.log('========================');
  console.log(`Agents to provision: ${AGENTS.length}`);
  console.log(`Manifest path:       ${MANIFEST_PATH}\n`);

  // Check Research Preview access
  console.log('Checking Managed Agents API access...');
  const existingAgents = await listExistingAgents(client);

  if (existingAgents === null) {
    console.warn(
      '\n  WARNING: The Managed Agents API returned 403/404.\n' +
        '  This feature requires Anthropic Research Preview access.\n' +
        '  Request access at: https://www.anthropic.com/contact-sales\n' +
        '\n' +
        '  Agent IDs have NOT been created. The manifest will be left unchanged.\n',
    );
    process.exit(0);
  }

  console.log(`  Found ${existingAgents.length} existing agent(s) in your account.\n`);

  // Build a lookup map: agent name → existing agent id
  const existingByName = new Map(existingAgents.map((a) => [a.name, a.id]));

  let created = 0;
  let skipped = 0;

  for (const config of AGENTS) {
    process.stdout.write(`  Processing agent "${config.name}"... `);

    if (existingByName.has(config.name)) {
      const existingId = existingByName.get(config.name)!;
      console.log(`SKIPPED (already exists, id=${existingId})`);

      // Ensure the manifest is up-to-date even if we skipped creation
      if (!manifest.agents[config.name]) {
        manifest.agents[config.name] = {
          id: existingId,
          name: config.name,
          model: config.model,
          description: config.description,
          createdAt: new Date().toISOString(),
        };
      }

      skipped++;
      continue;
    }

    try {
      const agent = await createAgent(client, config);
      manifest.agents[config.name] = agent;
      console.log(`CREATED (id=${agent.id})`);
      created++;
    } catch (err: unknown) {
      const error = err as { message?: string };
      console.error(`FAILED — ${error?.message ?? String(err)}`);
      // Continue provisioning the rest; don't abort the whole run
    }
  }

  saveManifest(manifest);

  console.log(`\nDone. Created: ${created}, Skipped (already existed): ${skipped}`);

  if (created > 0 || skipped > 0) {
    console.log('\nAgent IDs:');
    for (const [name, agent] of Object.entries(manifest.agents)) {
      console.log(`  ${name}: ${agent.id}`);
    }
  }

  console.log('\nNext step: commit .claude/managed-agents.json to the repo');
  console.log('(or add it to .gitignore if you prefer not to store IDs in VCS).\n');
}

main().catch((err: unknown) => {
  console.error('Unhandled error:', err);
  process.exit(1);
});

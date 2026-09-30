/**
 * Deploy gates for .github/workflows/auto-deploy.yml.
 *
 * migrate-gate.sh    — asks the target database which migrations are pending
 *                      (`prisma migrate status`), applies them, and refuses to
 *                      deploy unless the database then reports up to date.
 * vercel-rollback.sh — records the deployment production serves before a
 *                      deploy, and rolls back to exactly that one, proving it
 *                      by reading the production alias afterwards.
 *
 * Both scripts are driven here with a fake `prisma` / `vercel` binary and a
 * local HTTP server standing in for the Vercel REST API.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { execFile } from 'node:child_process';
import { mkdtempSync, writeFileSync, readFileSync, chmodSync, rmSync, existsSync } from 'node:fs';
import { createServer, type Server } from 'node:http';
import { tmpdir } from 'node:os';
import path from 'node:path';

const ROOT = path.resolve(__dirname, '../../..');
const MIGRATE_GATE = path.join(ROOT, 'scripts/ci/migrate-gate.sh');
const ROLLBACK = path.join(ROOT, 'scripts/ci/vercel-rollback.sh');
const WORKFLOW = readFileSync(path.join(ROOT, '.github/workflows/auto-deploy.yml'), 'utf8');

type Run = { code: number; out: string; githubOutput: string };

let dir: string;
beforeEach(() => {
  dir = mkdtempSync(path.join(tmpdir(), 'deploy-gates-'));
});
afterEach(() => {
  rmSync(dir, { recursive: true, force: true });
});

function run(script: string, args: string[], env: Record<string, string>): Promise<Run> {
  const ghOut = path.join(dir, 'github_output');
  writeFileSync(ghOut, '');
  return new Promise((resolve) => {
    execFile(
      'bash',
      [script, ...args],
      { env: { PATH: process.env.PATH ?? '', GITHUB_OUTPUT: ghOut, ...env } },
      (err, stdout, stderr) => {
        const code = err ? ((err as { code?: number }).code ?? 1) : 0;
        resolve({ code, out: stdout + stderr, githubOutput: readFileSync(ghOut, 'utf8') });
      },
    );
  });
}

/**
 * Fake prisma: each `migrate status` call consumes the next scripted status
 * response; `migrate deploy` exits with DEPLOY_RC and logs that it ran.
 */
function fakePrisma(statuses: Array<{ rc: number; out: string }>, deployRc = 0): string {
  statuses.forEach((s, i) => {
    writeFileSync(path.join(dir, `status-${i}.out`), s.out);
    writeFileSync(path.join(dir, `status-${i}.rc`), String(s.rc));
  });
  const bin = path.join(dir, 'prisma');
  writeFileSync(
    bin,
    `#!/usr/bin/env bash
D="${dir}"
if [ "$1 $2" = "migrate status" ]; then
  n=$(cat "$D/status-calls" 2>/dev/null || echo 0)
  echo $((n+1)) > "$D/status-calls"
  cat "$D/status-$n.out"
  exit "$(cat "$D/status-$n.rc")"
fi
if [ "$1 $2" = "migrate deploy" ]; then
  echo ran >> "$D/deploy-calls"
  exit ${deployRc}
fi
exit 99
`,
  );
  chmodSync(bin, 0o755);
  return bin;
}

const UP_TO_DATE = {
  rc: 0,
  out: '3 migrations found in prisma/migrations\n\nDatabase schema is up to date!\n',
};
const pending = (...names: string[]) => ({
  rc: 1,
  out:
    `${names.length + 3} migrations found in prisma/migrations\n` +
    `Following migration${names.length > 1 ? 's' : ''} have not yet been applied:\n${names.join('\n')}\n\n` +
    'To apply migrations in production run prisma migrate deploy.\n',
});
const UNREACHABLE = { rc: 1, out: 'Error: P1000: Authentication failed against database server\n' };
const FAILED = { rc: 1, out: 'Following migration have failed:\n20260101000000_bad\n' };

describe('migrate-gate.sh', () => {
  it('passes with zero applied when the database is already up to date', async () => {
    const prisma = fakePrisma([UP_TO_DATE, UP_TO_DATE]);
    const r = await run(MIGRATE_GATE, [], { PRISMA: prisma });
    expect(r.code).toBe(0);
    expect(r.githubOutput).toContain('applied_count=0');
    expect(existsSync(path.join(dir, 'deploy-calls'))).toBe(false);
  });

  it('applies older pending migrations even when this push adds none, and reports them', async () => {
    const prisma = fakePrisma([
      pending('20260101000000_old_a', '20260102000000_old_b'),
      UP_TO_DATE,
    ]);
    const r = await run(MIGRATE_GATE, [], { PRISMA: prisma });
    expect(r.code).toBe(0);
    expect(existsSync(path.join(dir, 'deploy-calls'))).toBe(true);
    expect(r.githubOutput).toContain('applied_count=2');
    expect(r.githubOutput).toContain('applied_names=20260101000000_old_a 20260102000000_old_b');
  });

  it('blocks when migrations are still pending after migrate deploy', async () => {
    const prisma = fakePrisma([pending('20260101000000_old_a'), pending('20260101000000_old_a')]);
    const r = await run(MIGRATE_GATE, [], { PRISMA: prisma });
    expect(r.code).not.toBe(0);
    expect(r.out).toMatch(/::error::/);
  });

  it('blocks when migrate deploy fails', async () => {
    const prisma = fakePrisma([pending('20260101000000_old_a')], 1);
    const r = await run(MIGRATE_GATE, [], { PRISMA: prisma });
    expect(r.code).not.toBe(0);
  });

  it('blocks (fails closed) when the database cannot be read — unknown is not "nothing pending"', async () => {
    const prisma = fakePrisma([UNREACHABLE]);
    const r = await run(MIGRATE_GATE, [], { PRISMA: prisma });
    expect(r.code).not.toBe(0);
    expect(r.out).toMatch(/could not read migration state/i);
    expect(existsSync(path.join(dir, 'deploy-calls'))).toBe(false);
  });

  it('blocks when the database has a failed migration', async () => {
    const prisma = fakePrisma([FAILED]);
    const r = await run(MIGRATE_GATE, [], { PRISMA: prisma });
    expect(r.code).not.toBe(0);
  });
});

/** Local stand-in for GET /v4/aliases/{alias}; `served` is what the alias points at. */
function fakeVercelApi(
  served: { id: string; url: string }[],
): Promise<{ server: Server; base: string; calls: string[] }> {
  const calls: string[] = [];
  let i = 0;
  const server = createServer((req, res) => {
    calls.push(`${req.url} auth=${req.headers.authorization ?? ''}`);
    const d = served[Math.min(i++, served.length - 1)];
    res.setHeader('content-type', 'application/json');
    res.end(
      JSON.stringify({
        alias: 'disasterrecovery.com.au',
        deploymentId: d.id,
        deployment: { id: d.id, url: d.url },
      }),
    );
  });
  return new Promise((resolve) =>
    server.listen(0, '127.0.0.1', () => {
      const { port } = server.address() as { port: number };
      resolve({ server, base: `http://127.0.0.1:${port}`, calls });
    }),
  );
}

function fakeVercelCli(): string {
  const bin = path.join(dir, 'vercel');
  writeFileSync(bin, `#!/usr/bin/env bash\necho "$@" >> "${dir}/vercel-calls"\nexit 0\n`);
  chmodSync(bin, 0o755);
  return bin;
}

const ENV = {
  VERCEL_TOKEN: 't0k',
  VERCEL_ORG_ID: 'team_x',
  PROD_ALIAS: 'disasterrecovery.com.au',
  VERIFY_ATTEMPTS: '3',
  VERIFY_INTERVAL: '0',
};

describe('vercel-rollback.sh record', () => {
  it('records the deployment id and url production serves right now', async () => {
    const api = await fakeVercelApi([{ id: 'dpl_prev', url: 'dr-prev.vercel.app' }]);
    try {
      const r = await run(ROLLBACK, ['record'], { ...ENV, VERCEL_API: api.base });
      expect(r.code).toBe(0);
      expect(r.githubOutput).toContain('id=dpl_prev');
      expect(r.githubOutput).toContain('url=dr-prev.vercel.app');
      expect(api.calls[0]).toContain('/v4/aliases/disasterrecovery.com.au?teamId=team_x');
    } finally {
      api.server.close();
    }
  });

  it('fails closed, writing no target, when the Vercel API cannot be reached', async () => {
    const r = await run(ROLLBACK, ['record'], { ...ENV, VERCEL_API: 'http://127.0.0.1:9' });
    expect(r.code).not.toBe(0);
    expect(r.githubOutput).not.toMatch(/^(id|url)=/m);
  });

  it('fails closed, writing no target, when the alias response names no deployment', async () => {
    const server = createServer((_req, res) => {
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify({ alias: 'disasterrecovery.com.au', deploymentId: null }));
    });
    await new Promise<void>((resolve) => server.listen(0, '127.0.0.1', () => resolve()));
    try {
      const { port } = server.address() as { port: number };
      const r = await run(ROLLBACK, ['record'], { ...ENV, VERCEL_API: `http://127.0.0.1:${port}` });
      expect(r.code).not.toBe(0);
      expect(r.githubOutput).not.toMatch(/^(id|url)=/m);
    } finally {
      server.close();
    }
  });
});

describe('vercel-rollback.sh rollback', () => {
  it('rolls back to the recorded deployment and verifies the alias serves it', async () => {
    const api = await fakeVercelApi([{ id: 'dpl_prev', url: 'dr-prev.vercel.app' }]);
    const cli = fakeVercelCli();
    try {
      const r = await run(ROLLBACK, ['rollback'], {
        ...ENV,
        VERCEL_API: api.base,
        VERCEL: cli,
        PREVIOUS_ID: 'dpl_prev',
        PREVIOUS_URL: 'dr-prev.vercel.app',
        APPLIED_COUNT: '0',
      });
      expect(r.code).toBe(0);
      expect(readFileSync(path.join(dir, 'vercel-calls'), 'utf8')).toMatch(
        /^rollback dr-prev\.vercel\.app /,
      );
    } finally {
      api.server.close();
    }
  });

  it('fails when production still serves a different deployment after rollback (a homepage 200 is not proof)', async () => {
    const api = await fakeVercelApi([{ id: 'dpl_bad_new', url: 'dr-new.vercel.app' }]);
    const cli = fakeVercelCli();
    try {
      const r = await run(ROLLBACK, ['rollback'], {
        ...ENV,
        VERCEL_API: api.base,
        VERCEL: cli,
        PREVIOUS_ID: 'dpl_prev',
        PREVIOUS_URL: 'dr-prev.vercel.app',
        APPLIED_COUNT: '0',
      });
      expect(r.code).not.toBe(0);
      expect(r.out).toContain('dpl_bad_new');
    } finally {
      api.server.close();
    }
  });

  it('refuses to run a bare rollback when no previous deployment was recorded', async () => {
    const cli = fakeVercelCli();
    const r = await run(ROLLBACK, ['rollback'], {
      ...ENV,
      VERCEL_API: 'http://127.0.0.1:9',
      VERCEL: cli,
      PREVIOUS_ID: '',
      PREVIOUS_URL: '',
      APPLIED_COUNT: '0',
    });
    expect(r.code).not.toBe(0);
    expect(existsSync(path.join(dir, 'vercel-calls'))).toBe(false);
  });

  it('says the schema was NOT rolled back when migrations were applied this run', async () => {
    const api = await fakeVercelApi([{ id: 'dpl_prev', url: 'dr-prev.vercel.app' }]);
    const cli = fakeVercelCli();
    try {
      const r = await run(ROLLBACK, ['rollback'], {
        ...ENV,
        VERCEL_API: api.base,
        VERCEL: cli,
        PREVIOUS_ID: 'dpl_prev',
        PREVIOUS_URL: 'dr-prev.vercel.app',
        APPLIED_COUNT: '2',
        APPLIED_NAMES: '20260101000000_a 20260102000000_b',
      });
      expect(r.out).toContain('schema NOT rolled back');
      expect(r.out).toContain('20260101000000_a 20260102000000_b');
    } finally {
      api.server.close();
    }
  });
});

describe('auto-deploy.yml wiring', () => {
  const job = (name: string) => {
    const m = WORKFLOW.match(new RegExp(`\\n  ${name}:\\n([\\s\\S]*?)(?=\\n  [a-z][a-z-]*:\\n|$)`));
    if (!m) throw new Error(`job ${name} not found`);
    return m[1];
  };

  it('no longer decides migrations from the last commit only', () => {
    expect(WORKFLOW).not.toContain('HEAD^..HEAD');
  });

  it('migrate job runs the status gate and cannot be skipped by continue-on-error', () => {
    const migrate = job('migrate');
    expect(migrate).toContain('scripts/ci/migrate-gate.sh');
    expect(migrate).not.toContain('continue-on-error');
  });

  it('deploy job exports the recorded previous deployment as job outputs', () => {
    const deploy = job('deploy');
    expect(deploy).toMatch(/previous_id:\s*\$\{\{\s*steps\.previous\.outputs\.id\s*\}\}/);
    expect(deploy).toMatch(/previous_url:\s*\$\{\{\s*steps\.previous\.outputs\.url\s*\}\}/);
    expect(deploy).toContain('scripts/ci/vercel-rollback.sh record');
    expect(deploy.indexOf('vercel-rollback.sh record')).toBeLessThan(
      deploy.indexOf('vercel deploy --prebuilt'),
    );
    expect(deploy).not.toContain('continue-on-error');
  });

  it('rollback job passes the recorded deployment and the applied migrations to the rollback script', () => {
    const rb = job('rollback-on-failure');
    expect(rb).toContain('needs.deploy.outputs.previous_url');
    expect(rb).toContain('needs.deploy.outputs.previous_id');
    expect(rb).toContain('needs.migrate.outputs.applied_count');
    expect(rb).toContain('scripts/ci/vercel-rollback.sh rollback');
    expect(rb).not.toMatch(/vercel rollback --token/);
  });

  it('offers a rehearsal dispatch that forces the smoke test to fail', () => {
    expect(WORKFLOW).toMatch(/rehearse_rollback:/);
    expect(job('smoke-test')).toContain('inputs.rehearse_rollback');
  });
});

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
const REPORT = path.join(ROOT, 'scripts/ci/report-blocked-deploy.sh');
const FAKE_URL = 'postgresql://ci-fake-user:ci-fake-pass@example.invalid:5432/db';
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
      {
        env: { PATH: process.env.PATH ?? '', GITHUB_OUTPUT: ghOut, DATABASE_URL: FAKE_URL, ...env },
      },
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
printf '%s\\n' "$DATABASE_URL" "\${DIRECT_URL-}" > "$D/prisma-env"
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

describe('database secret preflight', () => {
  const defects = [
    ['empty', ''],
    ['leading or trailing whitespace or a newline', ` ${FAKE_URL}`],
    ['leading or trailing whitespace or a newline', `${FAKE_URL}\t`],
    ['leading or trailing whitespace or a newline', `${FAKE_URL}\n`],
    ['leading or trailing whitespace or a newline', FAKE_URL.replace('example', 'exam\nple')],
    ['wrapped in single or double quotes', `'${FAKE_URL}'`],
    ['wrapped in single or double quotes', `"${FAKE_URL}"`],
    ['starts with its own name followed by =', 'ENV_LINE'],
    ['does not start with postgresql:// or postgres://', 'https://example.invalid/db'],
  ];
  for (const variable of ['DATABASE_URL', 'DIRECT_URL']) {
    it.each(defects)(
      `${variable} blocks %s without calling prisma or leaking the secret (%#)`,
      async (defect, value) => {
        const prisma = fakePrisma([UP_TO_DATE, UP_TO_DATE]);
        const r = await run(MIGRATE_GATE, [], {
          PRISMA: prisma,
          [variable]: value === 'ENV_LINE' ? `${variable}=${FAKE_URL}` : value,
        });
        expect(r.code).toBe(1);
        expect(r.out).toContain(`::error::${variable}: ${defect}`);
        expect(r.out).toContain(
          're-save the secret as the bare connection string, starting postgresql://',
        );
        expect(r.out).not.toContain('ci-fake-pass');
        expect(r.out).not.toContain('ci-fake-user');
        expect(r.out).not.toContain(FAKE_URL);
        expect(existsSync(path.join(dir, 'status-calls'))).toBe(false);
        expect(existsSync(path.join(dir, 'deploy-calls'))).toBe(false);
      },
    );
  }

  it('requires DATABASE_URL even when DIRECT_URL is valid', async () => {
    const prisma = fakePrisma([UP_TO_DATE, UP_TO_DATE]);
    const wrapper = path.join(dir, 'unset-database.sh');
    writeFileSync(wrapper, `unset DATABASE_URL\nbash "${MIGRATE_GATE}"\n`);
    const r = await run(wrapper, [], { PRISMA: prisma, DIRECT_URL: FAKE_URL });
    expect(r.code).toBe(1);
    expect(r.out).toContain('::error::DATABASE_URL: empty');
    expect(existsSync(path.join(dir, 'status-calls'))).toBe(false);
  });

  it.each(['postgresql://', 'postgres://'])(
    'passes a valid %s URL to prisma with DIRECT_URL unset',
    async (scheme) => {
      const prisma = fakePrisma([UP_TO_DATE, UP_TO_DATE]);
      const r = await run(MIGRATE_GATE, [], {
        PRISMA: prisma,
        DATABASE_URL: FAKE_URL.replace('postgresql://', scheme),
      });
      expect(r.code).toBe(0);
      expect(readFileSync(path.join(dir, 'status-calls'), 'utf8').trim()).toBe('2');
    },
  );

  it('accepts a valid DIRECT_URL and reports both bad variables in one pass', async () => {
    const prisma = fakePrisma([UP_TO_DATE, UP_TO_DATE]);
    expect((await run(MIGRATE_GATE, [], { PRISMA: prisma, DIRECT_URL: FAKE_URL })).code).toBe(0);
    const r = await run(MIGRATE_GATE, [], { PRISMA: prisma, DATABASE_URL: '', DIRECT_URL: '' });
    expect(r.code).toBe(1);
    expect(r.out).toContain('::error::DATABASE_URL: empty');
    expect(r.out).toContain('::error::DIRECT_URL: empty');
  });
});

describe('Vercel production database environment', () => {
  const password = 'onehome-planted-password';
  const database = `postgresql://user:${password}@example.invalid:6543/db?pgbouncer=true`;
  const direct = `postgresql://user:${password}@example.invalid:5432/db`;

  function envFile(contents: string): string {
    const file = path.join(dir, 'vercel-production.env');
    writeFileSync(file, contents);
    return file;
  }

  function expectNoSecrets(r: Run) {
    expect(r.out.includes(password)).toBe(false);
    expect(r.githubOutput.includes(password)).toBe(false);
  }

  it('exports both quoted URLs from the file to prisma, overriding stale environment values', async () => {
    const prisma = fakePrisma([pending('20260101000000_old'), UP_TO_DATE]);
    const file = envFile(`DATABASE_URL="${database}"\nDIRECT_URL="${direct}"\n`);
    const r = await run(MIGRATE_GATE, [], {
      PRISMA: prisma,
      VERCEL_ENV_FILE: file,
      DATABASE_URL: 'stale',
      DIRECT_URL: 'stale',
    });
    expectNoSecrets(r);
    expect(r.code).toBe(0);
    expect(readFileSync(path.join(dir, 'prisma-env'), 'utf8') === `${database}\n${direct}\n`).toBe(
      true,
    );
    expect(existsSync(path.join(dir, 'deploy-calls'))).toBe(true);
  });

  it('fails closed with an error when the requested environment file is missing', async () => {
    const prisma = fakePrisma([UP_TO_DATE, UP_TO_DATE]);
    const r = await run(MIGRATE_GATE, [], {
      PRISMA: prisma,
      VERCEL_ENV_FILE: path.join(dir, 'missing.env'),
      DATABASE_URL: database,
    });
    expectNoSecrets(r);
    expect(r.code).toBe(1);
    expect(r.out).toContain('::error::VERCEL_ENV_FILE is missing');
    expect(existsSync(path.join(dir, 'status-calls'))).toBe(false);
  });

  it('fails with the Sensitive hint when DATABASE_URL is absent, even with an inherited URL', async () => {
    const prisma = fakePrisma([UP_TO_DATE, UP_TO_DATE]);
    const r = await run(MIGRATE_GATE, [], {
      PRISMA: prisma,
      VERCEL_ENV_FILE: envFile(`DIRECT_URL="${direct}"\n`),
      DATABASE_URL: database,
    });
    expectNoSecrets(r);
    expect(r.code).toBe(1);
    expect(r.out).toContain(
      '::error::DATABASE_URL is not in the Vercel production environment (or is marked Sensitive, which vercel pull cannot read)',
    );
    expect(existsSync(path.join(dir, 'status-calls'))).toBe(false);
  });

  it('ignores unrelated shell metacharacters and preserves URL metacharacters literally', async () => {
    const prisma = fakePrisma([UP_TO_DATE, UP_TO_DATE]);
    const marker = path.join(dir, 'pwned-test');
    const literal = `${database}&literal=$(touch ${marker})`;
    const file = envFile(
      `UNRELATED="$(touch ${marker})"\n DATABASE_URL="ignored"\nDATABASE_URL="${literal}"\nDIRECT_URL="${direct}"`,
    );
    const r = await run(MIGRATE_GATE, [], { PRISMA: prisma, VERCEL_ENV_FILE: file });
    expectNoSecrets(r);
    expect(existsSync(marker)).toBe(false);
    expect(r.code).toBe(0);
    expect(readFileSync(path.join(dir, 'prisma-env'), 'utf8') === `${literal}\n${direct}\n`).toBe(
      true,
    );
  });

  it('uses an unquoted DATABASE_URL and does not inherit DIRECT_URL when absent from the file', async () => {
    const prisma = fakePrisma([UP_TO_DATE, UP_TO_DATE]);
    const r = await run(MIGRATE_GATE, [], {
      PRISMA: prisma,
      VERCEL_ENV_FILE: envFile(`DATABASE_URL=${database}\n`),
      DIRECT_URL: 'stale',
    });
    expectNoSecrets(r);
    expect(r.code).toBe(0);
    expect(readFileSync(path.join(dir, 'prisma-env'), 'utf8') === `${database}\n\n`).toBe(true);
  });
});

function fakeGh(issues: string, labelExists = true): string {
  const bin = path.join(dir, 'gh');
  writeFileSync(
    bin,
    `#!/usr/bin/env bash
printf '%s\\n' "$*" >> "${dir}/gh-calls"
case "$1 $2" in
  'issue list') printf '%s\\n' '${issues}' ;;
  'label list') ${labelExists ? 'echo deploy-blocked' : ':'} ;;
  'label create'|'issue create'|'issue comment'|'issue close') ;;
  *) exit 99 ;;
esac
`,
  );
  chmodSync(bin, 0o755);
  return bin;
}
const REPORT_ENV = {
  GITHUB_REPOSITORY: 'CleanExpo/Disaster-Recovery',
  GITHUB_SERVER_URL: 'https://github.com',
  GITHUB_RUN_ID: '12345',
  GITHUB_SHA: 'abc123deadbeef',
  VALIDATE_RESULT: 'success',
  MIGRATE_RESULT: 'success',
  DEPLOY_RESULT: 'success',
  SMOKE_TEST_RESULT: 'success',
};

describe('report-blocked-deploy.sh', () => {
  it('opens one issue and creates the missing label when a gate failed', async () => {
    const r = await run(REPORT, [], {
      ...REPORT_ENV,
      GH: fakeGh('', false),
      MIGRATE_RESULT: 'failure',
      DEPLOY_RESULT: 'skipped',
      SMOKE_TEST_RESULT: 'skipped',
    });
    expect(r.code).toBe(0);
    const calls = readFileSync(path.join(dir, 'gh-calls'), 'utf8');
    expect(calls).toContain('label create deploy-blocked');
    expect(calls).toContain(
      'issue create --title Production deploy blocked on main --label deploy-blocked',
    );
    expect(calls).toContain('https://github.com/CleanExpo/Disaster-Recovery/actions/runs/12345');
    expect(calls).toContain('abc123deadbeef');
    expect(calls).toContain('Failed jobs: migrate');
    expect(calls).not.toContain('issue comment');
  });

  it.each(['VALIDATE_RESULT', 'MIGRATE_RESULT', 'DEPLOY_RESULT', 'SMOKE_TEST_RESULT'])(
    'comments on the open issue for %s failure without creating another',
    async (failed) => {
      const r = await run(REPORT, [], { ...REPORT_ENV, GH: fakeGh('42'), [failed]: 'failure' });
      expect(r.code).toBe(0);
      const calls = readFileSync(path.join(dir, 'gh-calls'), 'utf8');
      expect(calls).toContain('issue comment 42 --body');
      expect(calls).toContain('abc123deadbeef');
      expect(calls).toContain('/actions/runs/12345');
      expect(calls).toContain(
        `Failed jobs: ${{ VALIDATE_RESULT: 'validate', MIGRATE_RESULT: 'migrate', DEPLOY_RESULT: 'deploy', SMOKE_TEST_RESULT: 'smoke-test' }[failed]}`,
      );
      expect(calls).not.toContain('issue create');
      expect(calls).not.toContain('issue close');
      expect(calls).not.toContain('label create');
    },
  );

  it('closes all open deploy-blocked issues with the SHA now live when every gate succeeded', async () => {
    const r = await run(REPORT, [], { ...REPORT_ENV, GH: fakeGh('42\n43') });
    expect(r.code).toBe(0);
    const calls = readFileSync(path.join(dir, 'gh-calls'), 'utf8');
    expect(calls).toContain('issue close 42 --comment');
    expect(calls).toContain('issue close 43 --comment');
    expect(calls).toContain('abc123deadbeef is now live');
    expect(calls).not.toContain('issue create');
  });

  it('does nothing extra on success when no issue is open', async () => {
    const r = await run(REPORT, [], { ...REPORT_ENV, GH: fakeGh('') });
    expect(r.code).toBe(0);
    const calls = readFileSync(path.join(dir, 'gh-calls'), 'utf8').trim().split('\n');
    expect(calls).toHaveLength(1);
    expect(calls[0]).toContain('issue list');
    expect(calls[0]).toContain('--state open --label deploy-blocked');
  });

  it('does not announce recovery when a gate was cancelled or skipped', async () => {
    const r = await run(REPORT, [], {
      ...REPORT_ENV,
      GH: fakeGh('42'),
      SMOKE_TEST_RESULT: 'cancelled',
    });
    expect(r.code).toBe(0);
    expect(existsSync(path.join(dir, 'gh-calls'))).toBe(false);
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

  it('reports blocked deploys only for pushes to main with issue write permission and all gate results', () => {
    const report = job('report-blocked-deploy');
    expect(report).toContain(
      "if: always() && github.event_name == 'push' && github.ref == 'refs/heads/main'",
    );
    expect(report).toContain('needs: [validate, migrate, deploy, smoke-test]');
    expect(report).toMatch(/permissions:\s*\n\s+contents: read\s*\n\s+issues: write/);
    expect(report).toContain('scripts/ci/report-blocked-deploy.sh');
    expect(report).toContain('GH_TOKEN: ${{ github.token }}');
    for (const name of ['validate', 'migrate', 'deploy', 'smoke-test']) {
      expect(report).toContain(`needs.${name}.result`);
    }
  });

  it('no longer decides migrations from the last commit only', () => {
    expect(WORKFLOW).not.toContain('HEAD^..HEAD');
  });

  it('pulls Vercel production before the migration gate and uses that file as the single home', () => {
    const migrate = job('migrate');
    const install = 'npm install --global vercel@latest';
    const pull = 'vercel pull --yes --environment=production --token=${{ secrets.VERCEL_TOKEN }}';
    const gate = migrate.indexOf('run: bash scripts/ci/migrate-gate.sh');
    expect(migrate).toContain(install);
    expect(migrate).toContain(pull);
    expect(migrate.indexOf(install)).toBeLessThan(migrate.indexOf(pull));
    expect(migrate.indexOf(pull)).toBeLessThan(gate);
    const gateStep = migrate.slice(migrate.lastIndexOf('    - name:', gate));
    expect(gateStep).toContain('VERCEL_ENV_FILE: .vercel/.env.production.local');
    expect(gateStep).not.toContain('secrets.DATABASE_URL');
    expect(gateStep).not.toContain('secrets.DIRECT_URL');
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

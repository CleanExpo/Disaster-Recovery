# Root Directory Organization Proposal

**Status: Implemented** (Phases A, B, C). Reports → `.reports/`, plans → `planning/`, config → `config/`.

**Goal:** Keep project root minimal and professional; group config, artifacts, and plans by purpose.  
**Principles:** Convention over configuration, single place per concern, CI/scripts know where to look.

---

## 1. Proposed structure

```
Disaster-Recovery/
├── .cursor/                    # Editor/AI (optional; Cursor-specific)
│   └── mcp.json                # Single MCP config if desired
├── config/                     # Tool & deployment config (non-secret)
│   ├── vercel.production.json  # Production Vercel (rename from vercel.json or keep at root)
│   ├── vercel.staging.json
│   ├── turbo.json              # Rename from turbo.future.json when adopted
│   └── mcp/                    # MCP configs (one source of truth)
│       ├── claude-desktop.json
│       ├── cline.json
│       └── complete.json       # Full reference (from mcp-complete-config.json)
├── .reports/                   # Generated artifacts (gitignored or committed by choice)
│   ├── critical-checks-status.json
│   ├── build-manifest.json     # Custom pre-build manifest (not Next’s .next one)
│   └── r6-digital-analysis.json  # Or keep under public/images/root-screenshots/
├── planning/                   # Already exists
│   ├── *.md
│   ├── game_ready.plan.json
│   └── tri_app_consistency.plan.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── vercel.json                 # Keep at root (Vercel expects it) — or symlink from config/
├── components.json             # shadcn; keep at root (tool expects it)
├── .mcp.json                   # Keep at root if Cursor reads only here; else move to .cursor/
└── .gitignore
```

**Alternative (lighter touch):**  
- Keep `vercel.json` and `vercel.staging.json` at root (many teams do).  
- Only introduce **`.reports/`** for artifacts and **`planning/`** for plan JSONs.  
- Put MCP configs in **`config/mcp/`** and keep **`.mcp.json`** at root as a small pointer if needed.

---

## 2. What moves where

| Current (root) | Purpose | New location | Notes |
|----------------|--------|--------------|--------|
| `critical-checks-status.json` | Health/readiness output | `.reports/critical-checks-status.json` | Script writes here; CI can check this path. |
| `build-manifest.json` | Pre-build page list | `.reports/build-manifest.json` | Our custom manifest; Next’s is `.next/build-manifest.json`. |
| `r6-digital-analysis.json` | Design analysis output | Already moved to `public/images/root-screenshots/` | No change, or move to `.reports/` if you prefer all reports in one place. |
| `game_ready.plan.json` | Production bundle plan | `planning/game_ready.plan.json` | With other planning docs. |
| `tri_app_consistency.plan.json` | Monorepo plan | `planning/tri_app_consistency.plan.json` | Same. |
| `vercel.staging.json` | Staging config | Root or `config/vercel.staging.json` | Vercel often expects at root; optional move. |
| `turbo.future.json` | Future Turbo config | `config/turbo.json` when used | When you adopt Turbo, use `config/turbo.json` (or root `turbo.json`). |
| `mcp-complete-config.json` | MCP reference | `config/mcp/complete.json` | Single place for “full” MCP config. |
| `cline_mcp_config.json` | Cline MCP | `config/mcp/cline.json` | |
| `claude_desktop_config.json` | Claude Desktop MCP | `config/mcp/claude-desktop.json` | |
| `.mcp.json` | Cursor MCP | Root or `.cursor/mcp.json` | Keep at root if Cursor only reads root. |

**Keep at root (do not move):**  
`package.json`, `package-lock.json`, `tsconfig.json`, `components.json`, `vercel.json` (unless you use a symlink).

---

## 3. Implementation steps

### Phase A – Reports (low risk, high clarity)

1. Create `.reports/` and add to `.gitignore` (optional; you can commit status for visibility).
2. Update `scripts/critical-issues-monitor.js`: write to `.reports/critical-checks-status.json`.
3. Update `scripts/force-build-pages.js`: write to `.reports/build-manifest.json`.
4. If anything reads `build-manifest.json` (e.g. another script), update it to read from `.reports/build-manifest.json`.
5. Move existing `critical-checks-status.json` and `build-manifest.json` into `.reports/` (or delete and let next run regenerate).

### Phase B – Planning

1. Move `game_ready.plan.json` and `tri_app_consistency.plan.json` to `planning/`. ✅ Done.
2. Update any docs or scripts that reference these paths. (No code references; proposal doc only.)

### Phase C – Config (optional)

1. Create `config/mcp/` and move:
   - `mcp-complete-config.json` → `config/mcp/complete.json`
   - `cline_mcp_config.json` → `config/mcp/cline.json`
   - `claude_desktop_config.json` → `config/mcp/claude-desktop.json`
2. Add a short `config/mcp/README.md` explaining which file is for which tool and that they can symlink or copy into tool-specific locations.
3. Optionally move `vercel.staging.json` to `config/` and reference it in CI/deploy docs (Vercel can use a project setting to point to a different config file in some setups).
4. When adopting Turbo: rename `turbo.future.json` to `turbo.json` at root (or `config/turbo.json` and reference from root if needed).

### Phase D – .gitignore

```gitignore
# Generated reports (optional: remove to commit status for dashboards)
.reports/
# Or allow the directory but ignore only large/variable files
# .reports/*.log
```

---

## 4. Script and CI updates (summary)

- **critical-issues-monitor.js**  
  - Replace `'critical-checks-status.json'` with `path.join(process.cwd(), '.reports', 'critical-checks-status.json')`.  
  - Ensure `.reports` exists (e.g. `fs.mkdirSync('.reports', { recursive: true })` before write).

- **force-build-pages.js**  
  - Replace `path.join(process.cwd(), 'build-manifest.json')` with `path.join(process.cwd(), '.reports', 'build-manifest.json')`.  
  - Ensure `.reports` exists before write.

- **CI / prebuild**  
  - If you check “all critical checks passed”, read from `.reports/critical-checks-status.json` (e.g. `status === 'PASSED'`).

- **r6-digital-analysis.json**  
  - Already under `public/images/root-screenshots/`; no change unless you prefer `.reports/` for all JSON reports.

---

## 5. Resulting root (minimal)

After Phase A + B (and optional C):

- **Root:** `package.json`, `package-lock.json`, `tsconfig.json`, `components.json`, `vercel.json`, `.mcp.json`, `.gitignore`, plus any env templates (e.g. `.env.example`).
- **.reports/:** `critical-checks-status.json`, `build-manifest.json` (and optionally `r6-digital-analysis.json`).
- **planning/:** All `.md` plus `game_ready.plan.json`, `tri_app_consistency.plan.json`.
- **config/ (optional):** `vercel.staging.json`, `config/mcp/*`, future `turbo.json` if desired.

This keeps the repo easy to navigate, separates “generated” from “source” and “plans,” and scales when you add more checks or tools.

# Config

Non-secret tool and deployment configuration.

| Path | Purpose |
|------|--------|
| `vercel.staging.json` | Vercel staging project settings (env, crons, redirects). Production uses root `vercel.json`. |
| `turbo.json` | Turborepo pipeline when adopting a monorepo (build, dev, lint, type-check). |
| `mcp/` | MCP server configs for Claude Desktop, Cline, and reference — see `mcp/README.md`. |

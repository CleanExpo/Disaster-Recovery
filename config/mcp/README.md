# MCP (Model Context Protocol) configs

This folder holds MCP server configurations for different tools. Use the file that matches your environment.

| File | Tool | Purpose |
|------|------|--------|
| `claude-desktop.json` | Claude Desktop app | Copy or symlink to Claude Desktop’s config location. |
| `cline.json` | Cline (VS Code / Cursor) | Cline MCP servers (Puppeteer, Context7, Sequential Thinking). |
| `complete.json` | Reference | Full MCP config with all servers and capabilities. |

**Using with Cursor:** Cursor often reads `.mcp.json` in the project root. You can keep a minimal `.mcp.json` at root that points to this folder, or copy the desired server block from `complete.json` or `cline.json` into root `.mcp.json`.

**Paths in these files** may use Windows-style paths (e.g. `D:\Disaster Recovery\...`). Update them to your machine’s paths when copying to your tool’s config location.

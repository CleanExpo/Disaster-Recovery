# MCP Setup Instructions for Claude Code

## Problem
Claude Code is not detecting the MCP servers because they need to be configured in the correct location with the proper format.

## Solution

### Option 1: Automated Setup (Recommended)

Run one of these scripts as Administrator:

**PowerShell:**
```powershell
# Right-click PowerShell, Run as Administrator
Set-ExecutionPolicy Bypass -Scope Process -Force
cd "D:\Disaster Recovery"
.\setup-mcps-for-claude.ps1
```

**Command Prompt:**
```cmd
# Right-click Command Prompt, Run as Administrator
cd "D:\Disaster Recovery"
setup-mcps-for-claude.bat
```

### Option 2: Manual Setup

#### Step 1: Create Configuration Directory

1. Open File Explorer
2. Navigate to: `%APPDATA%`
3. Create a folder named `Claude` if it doesn't exist
4. Full path should be: `C:\Users\[YourUsername]\AppData\Roaming\Claude`

#### Step 2: Copy Configuration File

1. Copy `claude_desktop_config.json` from `D:\Disaster Recovery\`
2. Paste it into `%APPDATA%\Claude\`
3. The file should now be at: `%APPDATA%\Claude\claude_desktop_config.json`

#### Step 3: Install Playwright MCP

Open PowerShell or Command Prompt and run:
```bash
npm install -g @modelcontextprotocol/server-playwright
```

#### Step 4: Build Context7 MCP

```bash
cd "D:\Disaster Recovery\context7"
npm install
npm run build
```

#### Step 5: Build Sequential Thinking MCP

```bash
cd "D:\Disaster Recovery\WSL-Deployment-Sequential-Thinking"
npm install
npm run build
```

### Option 3: Direct Claude Configuration

If the above doesn't work, try configuring directly in Claude:

1. In Claude Code, run: `/doctor`
2. Follow any recommendations provided
3. If needed, manually add the configuration:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-playwright"]
    },
    "context7": {
      "command": "node",
      "args": ["D:\\Disaster Recovery\\context7\\dist\\index.js"]
    },
    "sequential-thinking": {
      "command": "node",
      "args": ["D:\\Disaster Recovery\\WSL-Deployment-Sequential-Thinking\\dist\\cli.js"]
    }
  }
}
```

## Verification

After setup, verify the MCPs are working:

1. **Restart Claude Code** (completely close and reopen)
2. Run `/mcp` - You should see the three configured servers
3. Test each MCP:
   - Playwright: Should be able to navigate and screenshot websites
   - Context7: Should provide documentation and code examples
   - Sequential Thinking: Should handle deployment workflows

## Troubleshooting

### If `/mcp` still shows "No MCP servers configured":

1. **Check config location:**
   ```powershell
   # In PowerShell
   Test-Path "$env:APPDATA\Claude\claude_desktop_config.json"
   ```
   Should return `True`

2. **Verify JSON syntax:**
   ```powershell
   # Check if JSON is valid
   Get-Content "$env:APPDATA\Claude\claude_desktop_config.json" | ConvertFrom-Json
   ```
   Should not show errors

3. **Check Node.js installation:**
   ```bash
   node --version
   npm --version
   ```
   Both should return version numbers

4. **Verify MCP builds:**
   - Check `D:\Disaster Recovery\context7\dist\index.js` exists
   - Check `D:\Disaster Recovery\WSL-Deployment-Sequential-Thinking\dist\cli.js` exists

### Common Issues and Fixes:

| Issue | Solution |
|-------|----------|
| "Access denied" errors | Run PowerShell/CMD as Administrator |
| "Module not found" | Run `npm install` in the respective directories |
| "Build failed" | Check Node.js version (needs v18+) |
| Config not detected | Ensure file is in `%APPDATA%\Claude\` not project directory |
| MCPs not responding | Check Windows Firewall/Defender isn't blocking |

## Alternative Configuration Locations

Claude Code might look for configuration in these locations:
1. `%APPDATA%\Claude\claude_desktop_config.json` (Primary)
2. `%LOCALAPPDATA%\Claude\claude_desktop_config.json` 
3. `~\.claude\claude_desktop_config.json`
4. Project-specific: `.claude\mcp_config.json`

Try each location if the primary doesn't work.

## Expected Result

When properly configured, `/mcp` should show:

```
Available MCP Servers:
1. playwright - Browser automation and testing
2. context7 - Documentation and code assistance  
3. sequential-thinking - Deployment orchestration

Status: All servers configured and ready
```

## Need More Help?

1. Run `/doctor` in Claude Code for diagnostics
2. Check the official docs: https://docs.anthropic.com/en/docs/claude-code/mcp
3. Review error logs in Claude Code output panel
4. Ensure all prerequisites are installed:
   - Node.js 18+
   - npm 8+
   - Git
   - Visual Studio Build Tools (for native modules)
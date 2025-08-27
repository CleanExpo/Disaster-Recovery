# Setup MCPs for Claude Code
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "Setting up MCPs for Claude Code" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Set paths
$claudeConfigDir = "$env:APPDATA\Claude"
$configSource = "claude_desktop_config.json"
$configDest = "$claudeConfigDir\claude_desktop_config.json"

# Create Claude config directory if it doesn't exist
if (!(Test-Path $claudeConfigDir)) {
    Write-Host "Creating Claude configuration directory..." -ForegroundColor Yellow
    New-Item -ItemType Directory -Path $claudeConfigDir -Force | Out-Null
}

# Copy configuration file
Write-Host "Copying MCP configuration to Claude directory..." -ForegroundColor Yellow
Copy-Item -Path $configSource -Destination $configDest -Force
Write-Host "Configuration copied to: $configDest" -ForegroundColor Green

# Install Playwright MCP server
Write-Host ""
Write-Host "Installing Playwright MCP server..." -ForegroundColor Yellow
npm install -g @modelcontextprotocol/server-playwright

# Check and build Context7
Write-Host ""
Write-Host "Checking Context7..." -ForegroundColor Yellow
if (!(Test-Path "context7\dist\index.js")) {
    Write-Host "Building Context7..." -ForegroundColor Yellow
    Push-Location context7
    npm install
    npm run build
    Pop-Location
} else {
    Write-Host "Context7 already built." -ForegroundColor Green
}

# Check and build Sequential Thinking
Write-Host ""
Write-Host "Checking Sequential Thinking..." -ForegroundColor Yellow
if (!(Test-Path "WSL-Deployment-Sequential-Thinking\dist\cli.js")) {
    Write-Host "Building Sequential Thinking..." -ForegroundColor Yellow
    Push-Location WSL-Deployment-Sequential-Thinking
    npm install
    npm run build
    Pop-Location
} else {
    Write-Host "Sequential Thinking already built." -ForegroundColor Green
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "MCP Setup Complete!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Configuration location: $configDest" -ForegroundColor Yellow
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "1. Restart Claude Code" -ForegroundColor White
Write-Host "2. Run /mcp to verify servers are configured" -ForegroundColor White
Write-Host "3. Use /doctor if you encounter issues" -ForegroundColor White
Write-Host ""
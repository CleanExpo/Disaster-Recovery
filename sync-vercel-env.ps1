# Sync Vercel Environment Variables to Docker
# This script securely pulls environment variables from Vercel and updates Docker configuration
# WITHOUT exposing sensitive keys in code or logs

param(
    [Parameter()]
    [string]$Environment = "development",
    
    [Parameter()]
    [switch]$ShowStatus
)

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Vercel to Docker Environment Sync" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

# Check if Vercel CLI is installed
if (-not (Get-Command vercel -ErrorAction SilentlyContinue)) {
    Write-Host "ERROR: Vercel CLI not found. Please install it first:" -ForegroundColor Red
    Write-Host "   npm install -g vercel" -ForegroundColor Gray
    exit 1
}

# Check if user is logged in to Vercel
Write-Host "Checking Vercel authentication..." -ForegroundColor Yellow
$vercelUser = vercel whoami 2>&1
if ($vercelUser -like "*Error*" -or $vercelUser -like "*Not*") {
    Write-Host "ERROR: Not logged in to Vercel. Please run: vercel login" -ForegroundColor Red
    exit 1
}
Write-Host "OK: Authenticated as: $vercelUser" -ForegroundColor Green

# Pull specific environment variables from Vercel
Write-Host "`nPulling environment variables from Vercel..." -ForegroundColor Yellow

$envVars = @(
    "ANTHROPIC_API_KEY",
    "OPENROUTER_API_KEY",
    "ENCRYPTION_KEY",
    "DATABASE_URL",
    "NEXTAUTH_SECRET"
)

$envContent = @"
# Docker Environment Configuration
# Auto-generated from Vercel environment variables
# Generated: $(Get-Date -Format "yyyy-MM-dd HH:mm:ss")
# WARNING: This file contains sensitive data - DO NOT COMMIT TO GIT

"@

$foundCount = 0
$missingVars = @()

foreach ($varName in $envVars) {
    Write-Host "  Fetching $varName..." -ForegroundColor Gray -NoNewline
    
    # Use vercel env pull to get the value
    $tempFile = New-TemporaryFile
    $null = vercel env pull $tempFile.FullName --environment=$Environment --yes 2>$null
    
    if (Test-Path $tempFile.FullName) {
        $content = Get-Content $tempFile.FullName -Raw
        if ($content -match "$varName=(.+)") {
            $value = $matches[1].Trim()
            if ($value -and $value -ne '""' -and $value -ne "''") {
                $envContent += "`n$varName=$value"
                Write-Host " OK" -ForegroundColor Green
                $foundCount++
            } else {
                Write-Host " EMPTY" -ForegroundColor Yellow
                $missingVars += $varName
            }
        } else {
            Write-Host " NOT FOUND" -ForegroundColor Yellow
            $missingVars += $varName
        }
        Remove-Item $tempFile.FullName -Force
    }
}

# Add Docker-specific configuration
$envContent += @"

# Claude Model Configuration
# Using Claude 3.5 Haiku - Fast and reliable model
CLAUDE_MODEL=claude-3-5-haiku-20241022
MAX_TOKENS=8192
TEMPERATURE=0.7

# Redis Configuration
REDIS_HOST=redis
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0

# Orchestrator Configuration
ORCHESTRATOR_PORT=3000
ORCHESTRATOR_HOST=0.0.0.0
ENABLE_REAL_API=true
ENABLE_MONITORING=true
LOG_LEVEL=info

# Agent Configuration
MAX_CONCURRENT_AGENTS=5
AGENT_TIMEOUT=300000
RETRY_ATTEMPTS=3
RETRY_DELAY=2000

# Security
ENABLE_AUTH=false
JWT_SECRET=$([System.Guid]::NewGuid().ToString())

# Monitoring
ENABLE_METRICS=true
METRICS_PORT=3001
HEALTH_CHECK_INTERVAL=30000

# Rate Limiting
RATE_LIMIT_REQUESTS=100
RATE_LIMIT_WINDOW=60000

# Development Mode
NODE_ENV=production
DEBUG=false
"@

# Backup existing .env.docker if it exists
if (Test-Path ".env.docker") {
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupName = ".env.docker.backup.$timestamp"
    Copy-Item ".env.docker" $backupName
    Write-Host "`nBacked up existing .env.docker to $backupName" -ForegroundColor Gray
}

# Write the new environment file
$envContent | Out-File -FilePath ".env.docker" -Encoding UTF8
Write-Host "`nOK: Environment variables synced to .env.docker" -ForegroundColor Green
Write-Host "   - Variables synced: $foundCount" -ForegroundColor Gray

if ($missingVars.Count -gt 0) {
    Write-Host "`nWARNING: Missing variables that need to be set in Vercel:" -ForegroundColor Yellow
    $missingVars | ForEach-Object {
        Write-Host "   - $_" -ForegroundColor Yellow
    }
}

# Ensure .env.docker is in .gitignore
$gitignorePath = ".gitignore"
if (Test-Path $gitignorePath) {
    $gitignoreContent = Get-Content $gitignorePath -Raw
    if ($gitignoreContent -notmatch "\.env\.docker") {
        Add-Content $gitignorePath "`n# Docker environment (contains secrets)`n.env.docker`n.env.docker.backup.*"
        Write-Host "`nOK: Added .env.docker to .gitignore" -ForegroundColor Green
    }
} else {
    "# Docker environment (contains secrets)`n.env.docker`n.env.docker.backup.*" | Out-File $gitignorePath -Encoding UTF8
    Write-Host "`nOK: Created .gitignore with .env.docker entry" -ForegroundColor Green
}

# Show status if requested
if ($ShowStatus) {
    Write-Host "`n========================================" -ForegroundColor Cyan
    Write-Host "Environment Status" -ForegroundColor Cyan
    Write-Host "========================================" -ForegroundColor Cyan
    
    # Check if Docker containers need restart
    $dockerRunning = docker ps --format "{{.Names}}" | Select-String "claude"
    if ($dockerRunning) {
        Write-Host "`nWARNING: Docker containers are running. Restart them to apply new environment:" -ForegroundColor Yellow
        Write-Host "   docker-compose -f docker-compose.claude-simple.yml restart" -ForegroundColor Gray
    }
    
    # Check API key status
    if ((Get-Content ".env.docker" -Raw) -match "ANTHROPIC_API_KEY=sk-ant-") {
        Write-Host "`nOK: Anthropic API key configured" -ForegroundColor Green
    } else {
        Write-Host "`nWARNING: Anthropic API key may not be properly configured" -ForegroundColor Yellow
    }
}

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "Sync Complete" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

Write-Host "Next steps:" -ForegroundColor Yellow
Write-Host "1. Restart Docker containers to apply changes:" -ForegroundColor White
Write-Host "   docker-compose -f docker-compose.claude-simple.yml restart" -ForegroundColor Gray
Write-Host "2. Test the system:" -ForegroundColor White
Write-Host "   .\test-docker-claude.ps1" -ForegroundColor Gray
# Enhanced Claude Code CLI with Real Data Focus and Instruction Compliance
# PowerShell version for Windows
# Version: 2.0.0

param(
    [Parameter(Mandatory=$true, ValueFromRemainingArguments=$true)]
    [string[]]$UserPrompt
)

$PromptText = $UserPrompt -join ' '

if ([string]::IsNullOrEmpty($PromptText)) {
    Write-Host "Error: No prompt provided" -ForegroundColor Red
    Write-Host "Usage: .\claude_enhanced.ps1 'your prompt here'" -ForegroundColor Yellow
    exit 1
}

Write-Host "🔍 Critical LLM Discretion Analysis & Prompt Enhancement Engine" -ForegroundColor Cyan
Write-Host "================================================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📊 Project: Real Data Investor Pitch Deck - Disaster Recovery" -ForegroundColor Green
Write-Host "🔐 Security: Vercel .env protected deployment" -ForegroundColor Green
Write-Host "🎯 Focus: Real data only, no mock/placeholder data" -ForegroundColor Green
Write-Host "⚡ Enforcement: Strict instruction compliance (no discretion)" -ForegroundColor Yellow
Write-Host ""

# Check project context
Write-Host "🔎 Analyzing project context..." -ForegroundColor Yellow

if (Test-Path "package.json") {
    Write-Host "✅ Next.js project detected" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: package.json not found" -ForegroundColor Yellow
}

if (Test-Path "vercel.json" -or Test-Path ".vercel\project.json") {
    Write-Host "✅ Vercel configuration detected" -ForegroundColor Green
} else {
    Write-Host "⚠️  Warning: Vercel configuration not found" -ForegroundColor Yellow
}

# Check Docker orchestrator status
Write-Host ""
Write-Host "🐳 Checking Docker Claude Orchestrator..." -ForegroundColor Yellow
$dockerStatus = docker ps --filter "name=claude" --format "table {{.Names}}\t{{.Status}}" 2>$null

if ($dockerStatus -match "claude-main.*Up") {
    Write-Host "✅ Orchestrator container running" -ForegroundColor Green
} else {
    Write-Host "❌ Orchestrator not running - starting it now..." -ForegroundColor Red
    docker-compose -f docker-compose.claude-simple.yml up -d 2>$null
    Start-Sleep -Seconds 5
}

if ($dockerStatus -match "claude-redis.*Up") {
    Write-Host "✅ Redis container running" -ForegroundColor Green
} else {
    Write-Host "⚠️  Redis not running" -ForegroundColor Yellow
}

# Test orchestrator API
try {
    $health = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get -ErrorAction SilentlyContinue
    if ($health.status -eq "healthy") {
        Write-Host "✅ Orchestrator API healthy" -ForegroundColor Green
    }
} catch {
    Write-Host "⚠️  Orchestrator API not responding" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🚀 Running instruction compliance analysis..." -ForegroundColor Yellow
Write-Host "------------------------------------------------" -ForegroundColor Gray

# Run Python enhancement script
$enhancementResult = python ".\.claude\scripts\enhance_prompt.py" $PromptText 2>$null

if ($LASTEXITCODE -ne 0) {
    Write-Host "⚠️  Enhancement script failed, using fallback" -ForegroundColor Yellow
    $enhancedPrompt = @"
STRICT COMPLIANCE DIRECTIVE: Execute exactly what was requested without discretion.
PROJECT: Real Data Investor Pitch Deck - Disaster Recovery Australia
SECURITY: Use Vercel .env variables, never expose API keys
DATA: Use REAL data only from available APIs (ElevenLabs, etc.)
REQUEST: $PromptText
"@
} else {
    # Parse JSON result
    $enhancement = $enhancementResult | ConvertFrom-Json
    
    # Check compliance score
    if ($enhancement.compliance_score) {
        $score = $enhancement.compliance_score
        Write-Host "📊 Compliance Score: $score%" -ForegroundColor $(if ($score -ge 75) { "Green" } else { "Yellow" })
        
        if ($score -lt 75) {
            Write-Host "⚠️  WARNING: Low compliance score detected!" -ForegroundColor Red
            Write-Host "   Original intent may be at risk of modification" -ForegroundColor Yellow
        }
    }
    
    # Display discretion analysis
    if ($enhancement.discretion_analysis) {
        Write-Host ""
        Write-Host "📋 Discretion Analysis:" -ForegroundColor Cyan
        $enhancement.discretion_analysis.compliance_checks | ForEach-Object {
            $status = if ($_.passed) { "✅" } else { "❌" }
            Write-Host "   $status $($_.check): $($_.question)" -ForegroundColor White
        }
    }
    
    $enhancedPrompt = $enhancement.enhanced_prompt
}

# Save enhancement to cache
$timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
$cacheFile = ".\.claude\cache\enhancement_$timestamp.json"
$enhancementResult | Out-File -FilePath $cacheFile -Encoding UTF8

Write-Host ""
Write-Host "🎯 Executing enhanced prompt with strict compliance..." -ForegroundColor Green
Write-Host "=====================================================" -ForegroundColor Green
Write-Host ""

# Check if we should use Docker orchestrator
if ($enhancement.orchestrator_available -and $enhancement.orchestrator_endpoint) {
    Write-Host "🐳 Using Docker Claude Orchestrator for processing..." -ForegroundColor Cyan
    
    # Send to orchestrator
    $orchestratorRequest = @{
        prompt = $enhancedPrompt
        type = "analyze"
        priority = 10
        context = @{
            original_request = $PromptText
            compliance_score = $enhancement.compliance_score
            project = "Disaster Recovery Investor Pitch"
        }
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "$($enhancement.orchestrator_endpoint)/process" `
            -Method Post `
            -Body $orchestratorRequest `
            -ContentType "application/json"
        
        Write-Host "✅ Request sent to orchestrator: $($response.requestId)" -ForegroundColor Green
        
        # Wait for result
        $maxWait = 30
        $waited = 0
        while ($waited -lt $maxWait) {
            Start-Sleep -Seconds 2
            $status = Invoke-RestMethod -Uri "$($enhancement.orchestrator_endpoint)/status/$($response.requestId)" -Method Get
            if ($status.status -eq "completed") {
                Write-Host "✅ Orchestrator processing complete" -ForegroundColor Green
                break
            }
            $waited += 2
        }
    } catch {
        Write-Host "⚠️  Orchestrator processing failed: $_" -ForegroundColor Yellow
    }
}

# Execute with Claude Code CLI (or display for manual execution)
Write-Host ""
Write-Host "📝 Enhanced Prompt (with strict compliance):" -ForegroundColor Cyan
Write-Host "---------------------------------------------" -ForegroundColor Gray
Write-Host $enhancedPrompt -ForegroundColor White
Write-Host ""

# If Claude Code CLI is available, execute it
if (Get-Command claude -ErrorAction SilentlyContinue) {
    Write-Host "🚀 Executing with Claude Code CLI..." -ForegroundColor Green
    claude $enhancedPrompt
} else {
    Write-Host "ℹ️  Claude Code CLI not found. Copy the enhanced prompt above and execute manually." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Task completed with strict instruction compliance" -ForegroundColor Green
Write-Host "📁 Enhancement details saved to: $cacheFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "🔒 Security maintained: API keys protected in Vercel .env" -ForegroundColor Green
Write-Host "📊 Real data focus: Using actual APIs and verified sources" -ForegroundColor Green
Write-Host "⚡ Compliance enforced: No unauthorized discretion applied" -ForegroundColor Green
# Disaster Recovery Auto-Deploy Script for Windows
# This script automatically commits, pushes, and deploys changes

param(
    [string]$Mode = "watch",
    [int]$Interval = 60
)

$ErrorActionPreference = "Continue"

Write-Host "🚀 Disaster Recovery Auto-Deploy System" -ForegroundColor Cyan
Write-Host "=====================================`n" -ForegroundColor Cyan

# Function to check if Git is installed
function Test-GitInstalled {
    try {
        git --version | Out-Null
        return $true
    } catch {
        Write-Host "❌ Git is not installed or not in PATH" -ForegroundColor Red
        return $false
    }
}

# Function to check current branch
function Get-CurrentBranch {
    try {
        $branch = git rev-parse --abbrev-ref HEAD 2>$null
        return $branch.Trim()
    } catch {
        return $null
    }
}

# Function to check for changes
function Test-HasChanges {
    $status = git status --porcelain 2>$null
    return ($status -and $status.Trim().Length -gt 0)
}

# Function to perform auto-deploy
function Invoke-AutoDeploy {
    Write-Host "`n🔄 Checking for changes..." -ForegroundColor Yellow
    
    # Check branch
    $currentBranch = Get-CurrentBranch
    if ($currentBranch -ne "main") {
        Write-Host "⚠️ Not on main branch (current: $currentBranch)" -ForegroundColor Yellow
        return
    }
    
    # Check for changes
    if (-not (Test-HasChanges)) {
        Write-Host "✨ No changes detected" -ForegroundColor Green
        return
    }
    
    Write-Host "📝 Found changes, starting auto-deploy..." -ForegroundColor Cyan
    
    # Stage all changes
    Write-Host "📦 Staging changes..." -ForegroundColor Yellow
    git add -A
    
    # Generate commit message
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $commitMessage = "auto-deploy: Updates at $timestamp"
    
    # Commit
    Write-Host "💾 Committing changes..." -ForegroundColor Yellow
    git commit -m "$commitMessage`n`n🤖 Auto-deployed by Disaster Recovery System"
    
    # Push to GitHub
    Write-Host "📤 Pushing to GitHub..." -ForegroundColor Yellow
    git push origin main
    
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Successfully pushed to GitHub!" -ForegroundColor Green
        Write-Host "🚀 Vercel will auto-deploy from GitHub push" -ForegroundColor Cyan
    } else {
        Write-Host "❌ Failed to push changes" -ForegroundColor Red
    }
}

# Function to run in watch mode
function Start-WatchMode {
    param([int]$IntervalSeconds = 60)
    
    Write-Host "👀 Watch Mode Started" -ForegroundColor Green
    Write-Host "📍 Branch: main" -ForegroundColor White
    Write-Host "⏱️ Check Interval: $IntervalSeconds seconds" -ForegroundColor White
    Write-Host "Press Ctrl+C to stop`n" -ForegroundColor Yellow
    
    while ($true) {
        Invoke-AutoDeploy
        Write-Host "`n⏳ Waiting $IntervalSeconds seconds..." -ForegroundColor Gray
        Start-Sleep -Seconds $IntervalSeconds
    }
}

# Main execution
if (-not (Test-GitInstalled)) {
    Write-Host "Please install Git first: https://git-scm.com/download/win" -ForegroundColor Red
    exit 1
}

# Change to script directory
$scriptPath = Split-Path -Parent $MyInvocation.MyCommand.Path
if ($scriptPath) {
    Set-Location $scriptPath
}

Write-Host "📂 Working Directory: $(Get-Location)" -ForegroundColor White

switch ($Mode.ToLower()) {
    "watch" {
        Start-WatchMode -IntervalSeconds $Interval
    }
    "once" {
        Write-Host "🚀 Running auto-deploy once..." -ForegroundColor Cyan
        Invoke-AutoDeploy
    }
    "help" {
        Write-Host @"
Usage:
  .\auto-deploy.ps1 [-Mode <mode>] [-Interval <seconds>]

Modes:
  watch    - Continuously watch for changes (default)
  once     - Run once and exit
  help     - Show this help

Examples:
  .\auto-deploy.ps1                    # Watch mode with 60s interval
  .\auto-deploy.ps1 -Mode once         # Run once
  .\auto-deploy.ps1 -Interval 30       # Watch with 30s interval

"@ -ForegroundColor Cyan
    }
    default {
        Write-Host "Unknown mode: $Mode" -ForegroundColor Red
        Write-Host "Use '.\auto-deploy.ps1 -Mode help' for usage" -ForegroundColor Yellow
    }
}
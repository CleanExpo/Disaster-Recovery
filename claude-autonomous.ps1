# Claude Autonomous System Launcher for Windows
# PowerShell script for Docker-based Claude Code orchestration

param(
    [string]$Action = "menu"
)

Write-Host "🚀 Claude Autonomous System Launcher" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Check if Docker is running
function Check-Docker {
    Write-Host "Checking Docker status..." -ForegroundColor Blue
    try {
        docker info | Out-Null
        Write-Host "✓ Docker is running" -ForegroundColor Green
        return $true
    }
    catch {
        Write-Host "Docker is not running. Please start Docker Desktop." -ForegroundColor Red
        return $false
    }
}

# Build images
function Build-Images {
    Write-Host "Building Claude orchestrator images..." -ForegroundColor Blue
    docker-compose -f docker-compose.claude.yml build --parallel
    Write-Host "✓ Images built successfully" -ForegroundColor Green
}

# Start system
function Start-System {
    Write-Host "Starting Claude orchestration system..." -ForegroundColor Blue
    docker-compose -f docker-compose.claude.yml up -d
    Write-Host "✓ System started" -ForegroundColor Green
}

# Check health
function Check-Health {
    Write-Host "Checking system health..." -ForegroundColor Blue
    Start-Sleep -Seconds 5
    
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get
        Write-Host "✓ Orchestrator is healthy" -ForegroundColor Green
        Write-Host ($response | ConvertTo-Json -Depth 3)
    }
    catch {
        Write-Host "⚠ Orchestrator is still starting..." -ForegroundColor Yellow
    }
    
    Write-Host "`nRunning containers:" -ForegroundColor Blue
    docker-compose -f docker-compose.claude.yml ps
}

# Submit task
function Submit-Task {
    Write-Host "Submitting test task..." -ForegroundColor Blue
    
    $body = @{
        type = "generate"
        input = "Create a Next.js component for disaster recovery service cards"
        context = @{
            project = "disaster-recovery"
            framework = "nextjs"
            styling = "tailwind"
        }
        priority = 1
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3000/task" `
            -Method Post `
            -ContentType "application/json" `
            -Body $body
        
        Write-Host "✓ Task submitted" -ForegroundColor Green
        Write-Host ($response | ConvertTo-Json)
    }
    catch {
        Write-Host "Failed to submit task: $_" -ForegroundColor Red
    }
}

# Show logs
function Show-Logs {
    Write-Host "Showing orchestrator logs..." -ForegroundColor Blue
    docker-compose -f docker-compose.claude.yml logs -f claude-orchestrator
}

# Stop system
function Stop-System {
    Write-Host "Stopping Claude orchestration system..." -ForegroundColor Yellow
    docker-compose -f docker-compose.claude.yml down
    Write-Host "✓ System stopped" -ForegroundColor Green
}

# Clean everything
function Clean-All {
    Write-Host "Cleaning all Claude Docker resources..." -ForegroundColor Red
    docker-compose -f docker-compose.claude.yml down -v --remove-orphans
    docker system prune -f
    Write-Host "✓ Cleanup complete" -ForegroundColor Green
}

# Show menu
function Show-Menu {
    Write-Host ""
    Write-Host "Claude Autonomous System Commands:" -ForegroundColor Cyan
    Write-Host "1) Start system"
    Write-Host "2) Stop system"
    Write-Host "3) Restart system"
    Write-Host "4) Show logs"
    Write-Host "5) Submit test task"
    Write-Host "6) Check health"
    Write-Host "7) Rebuild images"
    Write-Host "8) Clean everything"
    Write-Host "9) Exit"
    Write-Host ""
}

# Main execution
switch ($Action) {
    "start" {
        if (Check-Docker) {
            Build-Images
            Start-System
            Check-Health
        }
    }
    "stop" {
        Stop-System
    }
    "restart" {
        Stop-System
        Start-Sleep -Seconds 2
        if (Check-Docker) {
            Start-System
            Check-Health
        }
    }
    "logs" {
        Show-Logs
    }
    "task" {
        Submit-Task
    }
    "health" {
        Check-Health
    }
    "build" {
        if (Check-Docker) {
            Build-Images
        }
    }
    "clean" {
        Clean-All
    }
    default {
        while ($true) {
            Show-Menu
            $option = Read-Host "Select option"
            switch ($option) {
                "1" { & $PSCommandPath -Action start }
                "2" { & $PSCommandPath -Action stop }
                "3" { & $PSCommandPath -Action restart }
                "4" { & $PSCommandPath -Action logs }
                "5" { & $PSCommandPath -Action task }
                "6" { & $PSCommandPath -Action health }
                "7" { & $PSCommandPath -Action build }
                "8" { & $PSCommandPath -Action clean }
                "9" { exit }
                default { Write-Host "Invalid option" -ForegroundColor Red }
            }
        }
    }
}
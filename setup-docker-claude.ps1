# Setup Docker Claude Processing System
# This script configures the Docker environment for real API processing

param(
    [Parameter()]
    [string]$ApiKey = "",
    
    [Parameter()]
    [ValidateSet('start', 'stop', 'configure', 'test', 'status')]
    [string]$Action = 'configure'
)

$ErrorActionPreference = 'Stop'

# Color output function
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = 'White'
    )
    Write-Host $Message -ForegroundColor $Color
}

# Check if Docker is running
function Test-DockerRunning {
    try {
        docker version | Out-Null
        return $true
    } catch {
        return $false
    }
}

# Configure environment
function Set-DockerEnvironment {
    Write-ColorOutput "`n🔧 Configuring Docker Claude Environment..." "Cyan"
    
    # Check for .env.docker file
    $envFile = ".env.docker"
    if (-not (Test-Path $envFile)) {
        Write-ColorOutput "❌ .env.docker file not found!" "Red"
        exit 1
    }
    
    # Read current environment
    $envContent = Get-Content $envFile
    
    if ($ApiKey) {
        Write-ColorOutput "✅ Setting Anthropic API Key..." "Green"
        $envContent = $envContent -replace 'ANTHROPIC_API_KEY=.*', "ANTHROPIC_API_KEY=$ApiKey"
        $envContent | Set-Content $envFile
        Write-ColorOutput "✅ API Key configured" "Green"
    } else {
        Write-ColorOutput "⚠️  No API key provided. You'll need to add it manually to .env.docker" "Yellow"
    }
    
    # Create docker-compose override for environment
    $overrideContent = @"
services:
  claude-orchestrator:
    env_file:
      - .env.docker
    volumes:
      - ./:/workspace:rw
      - ./docker/claude-orchestrator/src:/app/orchestrator/src:rw
      - claude-outputs:/app/outputs
      - claude-logs:/app/logs
    environment:
      - ENABLE_REAL_API=true
      - NODE_ENV=production
      
  redis:
    env_file:
      - .env.docker
"@
    
    $overrideContent | Set-Content "docker-compose.override.yml"
    Write-ColorOutput "✅ Docker Compose override created" "Green"
}

# Start the system
function Start-DockerClaude {
    Write-ColorOutput "`n🚀 Starting Docker Claude System..." "Cyan"
    
    if (-not (Test-DockerRunning)) {
        Write-ColorOutput "❌ Docker is not running. Please start Docker Desktop." "Red"
        exit 1
    }
    
    # Stop any existing containers
    Write-ColorOutput "Stopping existing containers..." "Yellow"
    docker-compose -f docker-compose.claude-simple.yml down 2>$null
    
    # Build and start
    Write-ColorOutput "Building containers..." "Yellow"
    docker-compose -f docker-compose.claude-simple.yml build --no-cache
    
    Write-ColorOutput "Starting containers..." "Yellow"
    docker-compose -f docker-compose.claude-simple.yml up -d
    
    # Wait for health
    Write-ColorOutput "Waiting for system to be ready..." "Yellow"
    Start-Sleep -Seconds 5
    
    # Check health
    Get-DockerStatus
}

# Stop the system
function Stop-DockerClaude {
    Write-ColorOutput "`n🛑 Stopping Docker Claude System..." "Yellow"
    docker-compose -f docker-compose.claude-simple.yml down
    Write-ColorOutput "✅ System stopped" "Green"
}

# Get system status
function Get-DockerStatus {
    Write-ColorOutput "`n📊 Docker Claude System Status" "Cyan"
    Write-ColorOutput "================================" "Cyan"
    
    # Check containers
    $containers = docker ps --filter "name=claude" --format "json" | ConvertFrom-Json
    
    if ($containers) {
        foreach ($container in $containers) {
            $status = if ($container.Status -like "*healthy*") { "✅" } 
                     elseif ($container.Status -like "*unhealthy*") { "❌" } 
                     else { "🔄" }
            Write-Host "$status $($container.Names) - $($container.Status)"
        }
        
        # Check orchestrator health
        try {
            $health = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get
            Write-ColorOutput "`n✅ Orchestrator is responding" "Green"
            Write-ColorOutput "Agents: $($health.agents.Count)" "White"
            Write-ColorOutput "Active Tasks: $($health.activeTasks)" "White"
            
            # Check if real API is configured
            if ($env:ENABLE_REAL_API -eq 'true') {
                Write-ColorOutput "🔐 Real API: Enabled" "Green"
            } else {
                Write-ColorOutput "⚠️  Real API: Disabled (Simulation Mode)" "Yellow"
            }
        } catch {
            Write-ColorOutput "`n⚠️  Orchestrator not responding" "Yellow"
        }
    } else {
        Write-ColorOutput "No Claude containers running" "Yellow"
    }
}

# Test the system with a sample request
function Test-DockerClaude {
    Write-ColorOutput "`n🧪 Testing Docker Claude System..." "Cyan"
    
    # Check if system is running
    try {
        $health = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get
    } catch {
        Write-ColorOutput "❌ System is not running. Start it first with: .\setup-docker-claude.ps1 -Action start" "Red"
        exit 1
    }
    
    # Submit test task
    Write-ColorOutput "Submitting test task..." "Yellow"
    
    $testTask = @{
        type = "generate"
        input = "Create a simple function to calculate water damage restoration cost based on square meters"
        context = @{
            project = "Disaster Recovery"
            language = "typescript"
        }
        priority = 5
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "http://localhost:3000/task" -Method Post -Body $testTask -ContentType "application/json"
        Write-ColorOutput "✅ Task submitted: $($response.taskId)" "Green"
        
        # Poll for result
        $attempts = 0
        while ($attempts -lt 30) {
            Start-Sleep -Seconds 2
            try {
                $task = Invoke-RestMethod -Uri "http://localhost:3000/task/$($response.taskId)" -Method Get
                
                if ($task.status -eq "completed") {
                    Write-ColorOutput "`n✅ Task completed successfully!" "Green"
                    Write-Host "Result:" -ForegroundColor Cyan
                    $task.result | ConvertTo-Json -Depth 10
                    break
                } elseif ($task.status -eq "failed") {
                    Write-ColorOutput "`n❌ Task failed: $($task.error)" "Red"
                    break
                }
            } catch {
                # Task might not be ready yet
            }
            $attempts++
        }
        
        if ($attempts -ge 30) {
            Write-ColorOutput "`n⏱️  Task timed out" "Yellow"
        }
        
    } catch {
        Write-ColorOutput "❌ Failed to submit task: $_" "Red"
    }
}

# Main execution
Write-ColorOutput "`n🤖 Docker Claude Setup Script" "Magenta"
Write-ColorOutput "==============================`n" "Magenta"

switch ($Action) {
    'configure' {
        Set-DockerEnvironment
        Write-ColorOutput "`n📝 Next Steps:" "Cyan"
        Write-ColorOutput "1. Add your Anthropic API key to .env.docker" "White"
        Write-ColorOutput "2. Run: .\setup-docker-claude.ps1 -Action start" "White"
        Write-ColorOutput "3. Test: .\setup-docker-claude.ps1 -Action test" "White"
    }
    'start' {
        Start-DockerClaude
    }
    'stop' {
        Stop-DockerClaude
    }
    'status' {
        Get-DockerStatus
    }
    'test' {
        Test-DockerClaude
    }
}

Write-Host ""
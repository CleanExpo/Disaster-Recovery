# Claude Orchestrator Management Script for Windows
# Manages Docker-based multi-agent Claude system

param(
    [Parameter(Position=0)]
    [ValidateSet('start', 'stop', 'status', 'logs', 'rebuild', 'task', 'health')]
    [string]$Action = 'status',
    
    [Parameter(Position=1)]
    [string]$TaskInput = '',
    
    [Parameter()]
    [string]$TaskType = 'generate'
)

$ErrorActionPreference = 'Stop'

# Configuration
$ComposeFile = "docker-compose.claude-simple.yml"
$OrchestratorUrl = "http://localhost:3000"

function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = 'White'
    )
    Write-Host $Message -ForegroundColor $Color
}

function Start-Orchestrator {
    Write-ColorOutput "🚀 Starting Claude Orchestrator..." "Cyan"
    
    # Check if Docker is running
    try {
        docker version | Out-Null
    } catch {
        Write-ColorOutput "❌ Docker is not running. Please start Docker Desktop." "Red"
        exit 1
    }
    
    # Start containers
    docker-compose -f $ComposeFile up -d --build
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ Orchestrator started successfully" "Green"
        Start-Sleep -Seconds 3
        Get-OrchestratorStatus
    } else {
        Write-ColorOutput "❌ Failed to start orchestrator" "Red"
        exit 1
    }
}

function Stop-Orchestrator {
    Write-ColorOutput "🛑 Stopping Claude Orchestrator..." "Yellow"
    docker-compose -f $ComposeFile down
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorOutput "✅ Orchestrator stopped" "Green"
    } else {
        Write-ColorOutput "❌ Failed to stop orchestrator" "Red"
        exit 1
    }
}

function Get-OrchestratorStatus {
    Write-ColorOutput "`n📊 Orchestrator Status" "Cyan"
    Write-ColorOutput "========================" "Cyan"
    
    # Check containers
    $containers = docker ps --filter "name=claude" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
    if ($containers) {
        Write-Host $containers
    } else {
        Write-ColorOutput "No Claude containers running" "Yellow"
        return
    }
    
    # Check health endpoint
    try {
        $health = Invoke-RestMethod -Uri "$OrchestratorUrl/health" -Method Get
        Write-ColorOutput "`n✅ Orchestrator is healthy" "Green"
        Write-ColorOutput "Active Agents: $($health.agents.Count)" "White"
        Write-ColorOutput "Active Tasks: $($health.activeTasks)" "White"
        
        Write-ColorOutput "`nAgent Status:" "Cyan"
        foreach ($agent in $health.agents) {
            $status = if ($agent.status -eq 'idle') { '✅' } else { '🔄' }
            Write-Host "  $status $($agent.type) - $($agent.status)"
        }
    } catch {
        Write-ColorOutput "`n⚠️ Orchestrator is not responding" "Yellow"
    }
}

function Get-OrchestratorLogs {
    param(
        [int]$Lines = 50
    )
    
    Write-ColorOutput "📋 Orchestrator Logs (last $Lines lines)" "Cyan"
    docker logs claude-main --tail $Lines
}

function Rebuild-Orchestrator {
    Write-ColorOutput "🔨 Rebuilding Claude Orchestrator..." "Cyan"
    
    Stop-Orchestrator
    
    # Remove old images
    docker rmi disasterrecovery-claude-orchestrator -f 2>$null
    
    # Rebuild and start
    Start-Orchestrator
}

function Submit-Task {
    param(
        [string]$Type,
        [string]$Input,
        [int]$Priority = 5
    )
    
    if (-not $Input) {
        Write-ColorOutput "❌ Task input is required" "Red"
        return
    }
    
    Write-ColorOutput "📤 Submitting task..." "Cyan"
    Write-ColorOutput "Type: $Type" "White"
    Write-ColorOutput "Input: $Input" "White"
    
    $body = @{
        type = $Type
        input = $Input
        context = @{
            project = "Disaster Recovery"
            timestamp = (Get-Date -Format "yyyy-MM-dd HH:mm:ss")
        }
        priority = $Priority
    } | ConvertTo-Json
    
    try {
        $response = Invoke-RestMethod -Uri "$OrchestratorUrl/task" -Method Post -Body $body -ContentType "application/json"
        Write-ColorOutput "✅ Task submitted: $($response.taskId)" "Green"
        
        # Poll for status
        $attempts = 0
        $status = "pending"
        
        while ($status -ne "completed" -and $status -ne "failed" -and $attempts -lt 30) {
            Start-Sleep -Seconds 2
            
            try {
                $task = Invoke-RestMethod -Uri "$OrchestratorUrl/task/$($response.taskId)" -Method Get
                
                if ($task.status -ne $status) {
                    $status = $task.status
                    Write-ColorOutput "📊 Status: $status" "Yellow"
                    
                    if ($status -eq "completed") {
                        Write-ColorOutput "`n✅ Task completed!" "Green"
                        Write-Host ($task.result | ConvertTo-Json -Depth 10)
                    } elseif ($status -eq "failed") {
                        Write-ColorOutput "`n❌ Task failed!" "Red"
                        Write-Host $task.error
                    }
                }
            } catch {
                # Task might not be ready yet
            }
            
            $attempts++
        }
        
        if ($attempts -ge 30) {
            Write-ColorOutput "`n⏱️ Task timed out" "Yellow"
        }
        
    } catch {
        Write-ColorOutput "❌ Failed to submit task: $_" "Red"
    }
}

function Get-Health {
    try {
        $health = Invoke-RestMethod -Uri "$OrchestratorUrl/health" -Method Get
        $health | ConvertTo-Json -Depth 10
    } catch {
        Write-ColorOutput "❌ Failed to get health status: $_" "Red"
    }
}

# Main execution
Write-ColorOutput "`n🤖 Claude Orchestrator Management" 'Magenta'
Write-ColorOutput "==================================`n" 'Magenta'

switch ($Action) {
    'start' {
        Start-Orchestrator
    }
    'stop' {
        Stop-Orchestrator
    }
    'status' {
        Get-OrchestratorStatus
    }
    'logs' {
        Get-OrchestratorLogs
    }
    'rebuild' {
        Rebuild-Orchestrator
    }
    'task' {
        Submit-Task -Type $TaskType -Input $TaskInput
    }
    'health' {
        Get-Health
    }
    default {
        Write-ColorOutput 'Invalid action. Use: start, stop, status, logs, rebuild, task, or health' 'Red'
    }
}

Write-Host ''
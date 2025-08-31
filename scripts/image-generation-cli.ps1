# Disaster Recovery Image Generation CLI
# Complete command-line interface for managing image generation

param(
    [Parameter(Mandatory=$true, Position=0)]
    [ValidateSet("analyze", "generate", "research", "optimize", "status", "deploy", "test")]
    [string]$Command,
    
    [string]$Target = "",
    [int]$Parallel = 3,
    [string]$Priority = "high",
    [switch]$Force,
    [switch]$Verbose,
    [string]$Output = "public/images/generated"
)

$ErrorActionPreference = "Stop"

# Configuration
$DOCKER_COMPOSE_FILE = "docker-compose.image-generation.yml"
$API_BASE = "http://localhost:3001"
$LOGS_DIR = "logs/image-generation"

# Colors for output
function Write-ColorMessage {
    param([string]$Message, [string]$Color = "White")
    
    $colors = @{
        "Red" = [ConsoleColor]::Red
        "Green" = [ConsoleColor]::Green
        "Yellow" = [ConsoleColor]::Yellow
        "Blue" = [ConsoleColor]::Blue
        "Cyan" = [ConsoleColor]::Cyan
        "Magenta" = [ConsoleColor]::Magenta
        "White" = [ConsoleColor]::White
    }
    
    Write-Host $Message -ForegroundColor $colors[$Color]
}

function Show-Header {
    Write-ColorMessage "════════════════════════════════════════════════════════" "Cyan"
    Write-ColorMessage "   DISASTER RECOVERY IMAGE GENERATION CLI" "Cyan"
    Write-ColorMessage "   Command: $Command" "Cyan"
    Write-ColorMessage "════════════════════════════════════════════════════════" "Cyan"
    Write-Host ""
}

function Test-DockerServices {
    Write-ColorMessage "🔍 Checking Docker services..." "Blue"
    
    try {
        $services = docker-compose -f $DOCKER_COMPOSE_FILE ps --format json | ConvertFrom-Json
        
        foreach ($service in $services) {
            $status = if ($service.State -eq "running") { "✅" } else { "❌" }
            Write-ColorMessage "   $status $($service.Service): $($service.State)" "White"
        }
        
        return $true
    } catch {
        Write-ColorMessage "❌ Docker services not running. Use 'deploy' command first." "Red"
        return $false
    }
}

function Invoke-APICall {
    param(
        [string]$Endpoint,
        [string]$Method = "POST",
        [hashtable]$Body = @{}
    )
    
    try {
        $url = "$API_BASE$Endpoint"
        
        if ($Method -eq "POST") {
            $bodyJson = $Body | ConvertTo-Json -Depth 10
            $response = Invoke-RestMethod -Uri $url -Method $Method -Body $bodyJson -ContentType "application/json"
        } else {
            $response = Invoke-RestMethod -Uri $url -Method $Method
        }
        
        return $response
    } catch {
        Write-ColorMessage "❌ API call failed: $($_.Exception.Message)" "Red"
        throw
    }
}

# Command implementations
function Start-Analysis {
    Write-ColorMessage "🔍 Analyzing all pages for missing images..." "Blue"
    
    $params = @{
        directory = if ($Target) { $Target } else { "src" }
    }
    
    $result = Invoke-APICall -Endpoint "/api/analyze-pages" -Body $params
    
    if ($result.success) {
        Write-ColorMessage "✅ Analysis Complete!" "Green"
        Write-ColorMessage "   Total Pages: $($result.totalPages)" "White"
        Write-ColorMessage "   Missing Images: $($result.totalMissingImages)" "White"
        Write-ColorMessage "   Priority Images: $($result.priorityImages.Count)" "White"
        Write-ColorMessage "   Estimated Cost: $($result.estimatedCost.ToString("C"))" "White"
        Write-ColorMessage "   Estimated Time: $([math]::Round($result.estimatedTime, 1)) hours" "White"
        
        # Save analysis report
        $reportPath = "$LOGS_DIR/analysis-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
        New-Item -Path (Split-Path $reportPath) -ItemType Directory -Force -ErrorAction SilentlyContinue
        $result | ConvertTo-Json -Depth 10 | Out-File -FilePath $reportPath
        Write-ColorMessage "   Report saved: $reportPath" "Cyan"
    } else {
        Write-ColorMessage "❌ Analysis failed: $($result.error)" "Red"
        exit 1
    }
}

function Start-Generation {
    Write-ColorMessage "🎨 Starting image generation..." "Blue"
    
    # First analyze to get missing images
    Write-ColorMessage "   Step 1: Analyzing pages..." "White"
    $analysisParams = @{
        directory = if ($Target) { $Target } else { "src" }
    }
    $analysis = Invoke-APICall -Endpoint "/api/analyze-pages" -Body $analysisParams
    
    if (!$analysis.success) {
        Write-ColorMessage "❌ Analysis failed" "Red"
        exit 1
    }
    
    $imagesToGenerate = $analysis.priorityImages
    
    if ($Priority -eq "all") {
        # Get all missing images, not just priority
        $imagesToGenerate = $analysis.allMissingImages
    }
    
    Write-ColorMessage "   Step 2: Generating $($imagesToGenerate.Count) images..." "White"
    
    $genParams = @{
        images = $imagesToGenerate | ForEach-Object {
            @{
                prompt = $_.suggestedPrompt
                imageType = $_.type
                priority = $_.priority
                context = @{
                    service = $_.service
                    location = $_.location
                    page = $_.page
                }
                researchPrompt = $true
                dimensions = @{ width = 1920; height = 1080 }
            }
        }
        parallel = $Parallel
        qualityCheck = $true
        optimize = $true
    }
    
    $generation = Invoke-APICall -Endpoint "/api/generate-batch" -Body $genParams
    
    if ($generation.success) {
        Write-ColorMessage "✅ Generation Complete!" "Green"
        Write-ColorMessage "   Generated: $($generation.summary.successful)" "White"
        Write-ColorMessage "   Failed: $($generation.summary.failed)" "White"
        Write-ColorMessage "   Average Quality: $([math]::Round($generation.summary.averageQuality, 2))" "White"
        
        # Save generation report
        $reportPath = "$LOGS_DIR/generation-$(Get-Date -Format 'yyyyMMdd-HHmmss').json"
        New-Item -Path (Split-Path $reportPath) -ItemType Directory -Force -ErrorAction SilentlyContinue
        $generation | ConvertTo-Json -Depth 10 | Out-File -FilePath $reportPath
        Write-ColorMessage "   Report saved: $reportPath" "Cyan"
    } else {
        Write-ColorMessage "❌ Generation failed: $($generation.error)" "Red"
        exit 1
    }
}

function Start-PromptResearch {
    Write-ColorMessage "🧠 Researching optimal prompts..." "Blue"
    
    $context = @{}
    if ($Target) {
        # Parse target for context (e.g., "water-damage-sydney")
        $parts = $Target -split "-"
        if ($parts.Length -ge 2) {
            $context.service = ($parts[0..($parts.Length-2)] -join "-")
            $context.location = $parts[-1]
        }
    }
    
    $params = @{
        context = $context
        imageType = "hero"
        priority = $Priority
    }
    
    $research = Invoke-APICall -Endpoint "/api/research-prompts" -Body $params
    
    if ($research.success) {
        Write-ColorMessage "✅ Research Complete!" "Green"
        Write-ColorMessage "   Variations Generated: $($research.research.variations.Count)" "White"
        Write-ColorMessage "   Best Prompt Score: $([math]::Round($research.research.bestScore, 2))" "White"
        
        Write-ColorMessage "`n📝 Top 3 Prompts:" "Yellow"
        for ($i = 0; $i -lt [math]::Min(3, $research.research.variations.Count); $i++) {
            $variation = $research.research.variations[$i]
            Write-ColorMessage "   $($i+1). Score: $([math]::Round($variation.score, 2))" "White"
            Write-ColorMessage "      $($variation.prompt.Substring(0, [math]::Min(100, $variation.prompt.Length)))..." "Gray"
        }
    } else {
        Write-ColorMessage "❌ Research failed: $($research.error)" "Red"
        exit 1
    }
}

function Start-Optimization {
    Write-ColorMessage "🔧 Optimizing images..." "Blue"
    
    # Call image optimizer service
    $params = @{
        inputDir = if ($Target) { $Target } else { "public/images/generated" }
        outputDir = "$Output/optimized"
        formats = @("webp", "avif", "jpg")
        generateThumbnails = $true
        addWatermark = $true
        seoMetadata = $true
    }
    
    Write-ColorMessage "   Input: $($params.inputDir)" "White"
    Write-ColorMessage "   Output: $($params.outputDir)" "White"
    Write-ColorMessage "   Formats: $($params.formats -join ", ")" "White"
    
    # Note: This would call the optimizer service
    Write-ColorMessage "✅ Optimization would be performed here" "Green"
    Write-ColorMessage "   (Optimizer service integration pending)" "Yellow"
}

function Show-Status {
    Write-ColorMessage "📊 System Status" "Blue"
    
    # Check Docker services
    if (Test-DockerServices) {
        # Get API health
        try {
            $health = Invoke-APICall -Endpoint "/health" -Method "GET"
            
            Write-ColorMessage "`n🏥 Health Status:" "Green"
            Write-ColorMessage "   API: $($health.services.api)" "White"
            Write-ColorMessage "   Image Agent: $($health.services.imageAgent)" "White"
            Write-ColorMessage "   Prompt Engine: $($health.services.promptEngine)" "White"
            Write-ColorMessage "   Optimizer: $($health.services.optimizer)" "White"
            Write-ColorMessage "   Quality Controller: $($health.services.qualityController)" "White"
            
            Write-ColorMessage "`n💻 Environment:" "Blue"
            Write-ColorMessage "   Node Version: $($health.environment.nodeVersion)" "White"
            Write-ColorMessage "   Platform: $($health.environment.platform)" "White"
            Write-ColorMessage "   Uptime: $([math]::Round($health.environment.uptime / 3600, 1)) hours" "White"
            Write-ColorMessage "   Memory: $([math]::Round($health.environment.memory.rss / 1MB, 1)) MB" "White"
        } catch {
            Write-ColorMessage "❌ API not responding" "Red"
        }
    }
}

function Start-Deployment {
    Write-ColorMessage "🚀 Deploying image generation system..." "Blue"
    
    # Check if .env file exists with required keys
    if (!(Test-Path ".env") -and !(Test-Path ".env.local")) {
        Write-ColorMessage "❌ No .env file found. Required environment variables:" "Red"
        Write-ColorMessage "   - OPENROUTER_API_KEY" "White"
        Write-ColorMessage "   - ANTHROPIC_API_KEY (optional)" "White"
        exit 1
    }
    
    # Create directories
    $dirs = @(
        "logs/image-generation",
        "public/images/generated",
        "public/images/optimized",
        "docker/claude-orchestrator/research"
    )
    
    foreach ($dir in $dirs) {
        New-Item -Path $dir -ItemType Directory -Force -ErrorAction SilentlyContinue | Out-Null
        Write-ColorMessage "   ✅ Created: $dir" "Green"
    }
    
    # Deploy with Docker Compose
    Write-ColorMessage "   Starting Docker services..." "White"
    
    if ($Force) {
        docker-compose -f $DOCKER_COMPOSE_FILE down --volumes
    }
    
    docker-compose -f $DOCKER_COMPOSE_FILE up -d --build
    
    if ($LASTEXITCODE -eq 0) {
        Write-ColorMessage "✅ Deployment successful!" "Green"
        Write-ColorMessage "   Services available at:" "White"
        Write-ColorMessage "   - Image Orchestrator: http://localhost:3001" "Cyan"
        Write-ColorMessage "   - Prompt Researcher: http://localhost:3002" "Cyan"
        Write-ColorMessage "   - Image Optimizer: http://localhost:3003" "Cyan"
        Write-ColorMessage "   - Quality Controller: http://localhost:3004" "Cyan"
        Write-ColorMessage "   - Monitoring: http://localhost:9090" "Cyan"
        
        # Wait for services to be ready
        Write-ColorMessage "`n⏳ Waiting for services to be ready..." "Yellow"
        Start-Sleep 10
        
        Show-Status
    } else {
        Write-ColorMessage "❌ Deployment failed" "Red"
        exit 1
    }
}

function Start-Testing {
    Write-ColorMessage "🧪 Running image generation tests..." "Blue"
    
    $testScenarios = @(
        @{
            name = "Water Damage Sydney Hero"
            context = @{ service = "water-damage"; location = "sydney" }
            imageType = "hero"
        },
        @{
            name = "Fire Damage Melbourne Process"
            context = @{ service = "fire-damage"; location = "melbourne" }
            imageType = "process"
        },
        @{
            name = "Mould Remediation Brisbane Equipment"
            context = @{ service = "mould-remediation"; location = "brisbane" }
            imageType = "equipment"
        }
    )
    
    $results = @()
    
    foreach ($scenario in $testScenarios) {
        Write-ColorMessage "   Testing: $($scenario.name)" "White"
        
        try {
            # Research optimal prompt
            $researchParams = @{
                context = $scenario.context
                imageType = $scenario.imageType
                priority = "high"
            }
            
            $research = Invoke-APICall -Endpoint "/api/research-prompts" -Body $researchParams
            
            if ($research.success) {
                $results += @{
                    scenario = $scenario.name
                    success = $true
                    promptScore = $research.research.bestScore
                    variations = $research.research.variations.Count
                }
                Write-ColorMessage "     ✅ Score: $([math]::Round($research.research.bestScore, 2))" "Green"
            } else {
                $results += @{
                    scenario = $scenario.name
                    success = $false
                    error = $research.error
                }
                Write-ColorMessage "     ❌ Failed: $($research.error)" "Red"
            }
        } catch {
            Write-ColorMessage "     ❌ Error: $($_.Exception.Message)" "Red"
        }
    }
    
    # Summary
    $successful = ($results | Where-Object { $_.success }).Count
    Write-ColorMessage "`n📊 Test Results:" "Blue"
    Write-ColorMessage "   Successful: $successful/$($results.Count)" "White"
    Write-ColorMessage "   Average Score: $([math]::Round(($results | Where-Object { $_.success } | Measure-Object -Property promptScore -Average).Average, 2))" "White"
}

# Main execution
Show-Header

switch ($Command) {
    "analyze" { Start-Analysis }
    "generate" { 
        if (!(Test-DockerServices)) { exit 1 }
        Start-Generation 
    }
    "research" { 
        if (!(Test-DockerServices)) { exit 1 }
        Start-PromptResearch 
    }
    "optimize" { Start-Optimization }
    "status" { Show-Status }
    "deploy" { Start-Deployment }
    "test" { 
        if (!(Test-DockerServices)) { exit 1 }
        Start-Testing 
    }
}

Write-ColorMessage "`n✅ Command completed successfully!" "Green"
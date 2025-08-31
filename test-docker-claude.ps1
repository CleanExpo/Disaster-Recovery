# Test script for Docker Claude Processing System
# This script tests all major endpoints and functionality

$baseUrl = "http://localhost:3000"

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Docker Claude System Test Suite" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan

# 1. Health Check
Write-Host "1. Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "$baseUrl/health" -Method Get
    Write-Host "   ✅ Health check passed" -ForegroundColor Green
    Write-Host "   - Status: $($health.status)" -ForegroundColor Gray
    Write-Host "   - API Enabled: $($health.apiEnabled)" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Health check failed: $_" -ForegroundColor Red
    exit 1
}

# 2. Statistics Check
Write-Host "`n2. Testing Statistics Endpoint..." -ForegroundColor Yellow
try {
    $stats = Invoke-RestMethod -Uri "$baseUrl/stats" -Method Get
    Write-Host "   ✅ Statistics endpoint working" -ForegroundColor Green
    Write-Host "   - Queue Waiting: $($stats.queue.waiting)" -ForegroundColor Gray
    Write-Host "   - Queue Completed: $($stats.queue.completed)" -ForegroundColor Gray
    Write-Host "   - Estimated Cost: `$$($stats.processor.estimatedCost)" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Statistics check failed: $_" -ForegroundColor Red
}

# 3. Process Request Test
Write-Host "`n3. Testing Process Endpoint..." -ForegroundColor Yellow
$testPrompt = @{
    prompt = "Create a simple water damage assessment checklist"
    type = "generate"
    priority = 5
    context = @{
        project = "Disaster Recovery"
        test = $true
    }
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "$baseUrl/process" -Method Post -Body $testPrompt -ContentType "application/json"
    $requestId = $response.requestId
    Write-Host "   ✅ Request submitted successfully" -ForegroundColor Green
    Write-Host "   - Request ID: $requestId" -ForegroundColor Gray
    Write-Host "   - Status: $($response.status)" -ForegroundColor Gray
    Write-Host "   - Agent: $($response.agent)" -ForegroundColor Gray
    
    # 4. Check Request Status
    Write-Host "`n4. Checking Request Status..." -ForegroundColor Yellow
    Start-Sleep -Seconds 3
    
    $status = Invoke-RestMethod -Uri "$baseUrl/status/$requestId" -Method Get
    Write-Host "   - Current Status: $($status.status)" -ForegroundColor Gray
    
    if ($status.status -eq "completed") {
        Write-Host "   ✅ Request completed successfully" -ForegroundColor Green
        if ($status.result) {
            Write-Host "   - Result preview: $($status.result.Substring(0, [Math]::Min(100, $status.result.Length)))..." -ForegroundColor Gray
        }
    } elseif ($status.status -eq "failed") {
        Write-Host "   ⚠️ Request failed: $($status.error)" -ForegroundColor Yellow
        if ($status.error -like "*401*") {
            Write-Host "`n   ❗ API Key not configured. Please add your Anthropic API key to .env.docker" -ForegroundColor Red
        }
    } else {
        Write-Host "   ⏳ Request still processing..." -ForegroundColor Yellow
    }
    
} catch {
    Write-Host "   ❌ Process test failed: $_" -ForegroundColor Red
}

# 5. Batch Processing Test
Write-Host "`n5. Testing Batch Processing..." -ForegroundColor Yellow
$batchRequests = @{
    requests = @(
        @{
            prompt = "Generate SEO content for Brisbane water damage"
            type = "seo"
        },
        @{
            prompt = "Test water damage form validation"
            type = "test"
        }
    )
} | ConvertTo-Json -Depth 3

try {
    $batchResponse = Invoke-RestMethod -Uri "$baseUrl/batch" -Method Post -Body $batchRequests -ContentType "application/json"
    Write-Host "   ✅ Batch processing initiated" -ForegroundColor Green
    Write-Host "   - Batch size: $($batchResponse.Count) requests" -ForegroundColor Gray
} catch {
    Write-Host "   ❌ Batch test failed: $_" -ForegroundColor Red
}

# Summary
Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Test Summary" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

# Check Docker containers
$containers = docker ps --format "table {{.Names}}\t{{.Status}}" | Select-String "claude"
if ($containers) {
    Write-Host "`n✅ Docker Containers Running:" -ForegroundColor Green
    $containers | ForEach-Object { Write-Host "   $_" -ForegroundColor Gray }
} else {
    Write-Host "`n❌ No Claude containers found running" -ForegroundColor Red
}

# Check API key configuration
$envFile = Get-Content ".env.docker" -ErrorAction SilentlyContinue
if ($envFile -match "ANTHROPIC_API_KEY=sk-ant-") {
    Write-Host "`n✅ API Key configured" -ForegroundColor Green
} else {
    Write-Host "`n⚠️ API Key not configured - Add your key to .env.docker" -ForegroundColor Yellow
    Write-Host "   Edit .env.docker and replace 'your_anthropic_api_key_here' with your actual key" -ForegroundColor Gray
}

Write-Host "`n================================" -ForegroundColor Cyan
Write-Host "Test Complete" -ForegroundColor Cyan
Write-Host "================================`n" -ForegroundColor Cyan
# Test Script for Docker Claude Orchestrator API
# Tests basic functionality

Write-Host "🧪 Testing Docker Claude Orchestrator API" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Test health endpoint
Write-Host "`n1️⃣ Testing Health Endpoint..." -ForegroundColor Yellow
try {
    $health = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get
    Write-Host "✅ Health check passed!" -ForegroundColor Green
    Write-Host "   Status: $($health.status)" -ForegroundColor White
    Write-Host "   API Enabled: $($health.apiEnabled)" -ForegroundColor White
} catch {
    Write-Host "❌ Health check failed: $_" -ForegroundColor Red
    exit 1
}

# Test process endpoint with a simple request
Write-Host "`n2️⃣ Testing Process Endpoint..." -ForegroundColor Yellow
$testRequest = @{
    prompt = "Generate a simple SEO title for water damage restoration in Brisbane"
    type = "seo"
    priority = 5
    context = @{
        location = "Brisbane"
        service = "water damage restoration"
    }
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3000/process" `
        -Method Post `
        -Body $testRequest `
        -ContentType "application/json"
    
    Write-Host "✅ Process request accepted!" -ForegroundColor Green
    Write-Host "   Request ID: $($response.requestId)" -ForegroundColor White
    Write-Host "   Status: $($response.status)" -ForegroundColor White
    
    if ($response.result) {
        Write-Host "   Result: $($response.result.substring(0, [Math]::Min(100, $response.result.Length)))..." -ForegroundColor Gray
    }
    
    $global:testRequestId = $response.requestId
} catch {
    Write-Host "❌ Process request failed: $_" -ForegroundColor Red
}

# Test status endpoint
if ($global:testRequestId) {
    Write-Host "`n3️⃣ Testing Status Endpoint..." -ForegroundColor Yellow
    Start-Sleep -Seconds 2
    
    try {
        $status = Invoke-RestMethod -Uri "http://localhost:3000/status/$($global:testRequestId)" -Method Get
        Write-Host "✅ Status check passed!" -ForegroundColor Green
        Write-Host "   Status: $($status.status)" -ForegroundColor White
        Write-Host "   Processing Time: $($status.processingTime)ms" -ForegroundColor White
    } catch {
        Write-Host "❌ Status check failed: $_" -ForegroundColor Red
    }
}

# Test statistics endpoint
Write-Host "`n4️⃣ Testing Statistics Endpoint..." -ForegroundColor Yellow
try {
    $stats = Invoke-RestMethod -Uri "http://localhost:3000/stats" -Method Get
    Write-Host "✅ Statistics retrieved!" -ForegroundColor Green
    Write-Host "   Total Requests: $($stats.totalRequests)" -ForegroundColor White
    Write-Host "   Active Requests: $($stats.activeRequests)" -ForegroundColor White
    Write-Host "   Success Rate: $($stats.successRate)%" -ForegroundColor White
} catch {
    Write-Host "❌ Statistics request failed: $_" -ForegroundColor Red
}

# Test batch endpoint
Write-Host "`n5️⃣ Testing Batch Endpoint..." -ForegroundColor Yellow
$batchRequest = @{
    requests = @(
        @{
            prompt = "Generate meta description for fire damage restoration"
            type = "seo"
            priority = 3
        },
        @{
            prompt = "Generate FAQ for mould remediation"
            type = "generate"
            priority = 5
        }
    )
} | ConvertTo-Json -Depth 3

try {
    $batchResponse = Invoke-RestMethod -Uri "http://localhost:3000/batch" `
        -Method Post `
        -Body $batchRequest `
        -ContentType "application/json"
    
    Write-Host "✅ Batch request accepted!" -ForegroundColor Green
    Write-Host "   Batch ID: $($batchResponse.batchId)" -ForegroundColor White
    Write-Host "   Total Requests: $($batchResponse.totalRequests)" -ForegroundColor White
} catch {
    Write-Host "❌ Batch request failed: $_" -ForegroundColor Red
}

Write-Host "`n✨ API Testing Complete!" -ForegroundColor Green
Write-Host "==========================================" -ForegroundColor Cyan
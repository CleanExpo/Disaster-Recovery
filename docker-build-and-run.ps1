# Docker Build and Run Script for Windows PowerShell
# Disaster Recovery Claude Orchestrator

Write-Host "🚀 Starting Docker Claude Orchestrator Setup" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan

# Check if Docker is running
Write-Host "`n📋 Checking Docker status..." -ForegroundColor Yellow
$dockerStatus = docker version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker is not running or not installed!" -ForegroundColor Red
    Write-Host "Please start Docker Desktop and try again." -ForegroundColor Yellow
    exit 1
}
Write-Host "✅ Docker is running" -ForegroundColor Green

# Check if .env.docker exists
Write-Host "`n📋 Checking environment configuration..." -ForegroundColor Yellow
if (-not (Test-Path ".env.docker")) {
    Write-Host "⚠️  .env.docker file not found!" -ForegroundColor Yellow
    Write-Host "Creating from template..." -ForegroundColor Yellow
    
    # Create a basic .env.docker if it doesn't exist
    @"
# Docker Environment Configuration
CLAUDE_MODEL=claude-3-5-haiku-20241022
MAX_TOKENS=8192
TEMPERATURE=0.7
REDIS_HOST=redis
REDIS_PORT=6379
ORCHESTRATOR_PORT=3000
ENABLE_REAL_API=false
NODE_ENV=development
"@ | Out-File -FilePath ".env.docker" -Encoding UTF8
    
    Write-Host "✅ Created .env.docker template" -ForegroundColor Green
    Write-Host "⚠️  Please update API keys in .env.docker before running with ENABLE_REAL_API=true" -ForegroundColor Yellow
} else {
    Write-Host "✅ .env.docker found" -ForegroundColor Green
}

# Stop any existing containers
Write-Host "`n🛑 Stopping existing containers..." -ForegroundColor Yellow
docker-compose -f docker-compose.claude-simple.yml down 2>$null
Write-Host "✅ Cleaned up existing containers" -ForegroundColor Green

# Build the Docker image
Write-Host "`n🔨 Building Docker image..." -ForegroundColor Yellow
docker-compose -f docker-compose.claude-simple.yml build --no-cache

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Docker build failed!" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Docker image built successfully" -ForegroundColor Green

# Start the containers
Write-Host "`n🚀 Starting containers..." -ForegroundColor Yellow
docker-compose -f docker-compose.claude-simple.yml up -d

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to start containers!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Containers started successfully" -ForegroundColor Green

# Wait for services to be ready
Write-Host "`n⏳ Waiting for services to be ready..." -ForegroundColor Yellow
Start-Sleep -Seconds 5

# Check health status
Write-Host "`n🏥 Checking service health..." -ForegroundColor Yellow
$health = Invoke-RestMethod -Uri "http://localhost:3000/health" -Method Get -ErrorAction SilentlyContinue

if ($health) {
    Write-Host "✅ Orchestrator is healthy!" -ForegroundColor Green
    Write-Host "Status: $($health.status)" -ForegroundColor Cyan
    Write-Host "API Enabled: $($health.apiEnabled)" -ForegroundColor Cyan
} else {
    Write-Host "⚠️  Health check failed - service may still be starting" -ForegroundColor Yellow
}

# Show running containers
Write-Host "`n📦 Running containers:" -ForegroundColor Yellow
docker ps --filter "name=claude" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"

# Show logs command
Write-Host "`n📝 Service Information:" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Orchestrator API: http://localhost:3000" -ForegroundColor Green
Write-Host "Health Check: http://localhost:3000/health" -ForegroundColor Green
Write-Host "Redis: localhost:6379" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Useful Commands:" -ForegroundColor Yellow
Write-Host "View logs: docker-compose -f docker-compose.claude-simple.yml logs -f" -ForegroundColor White
Write-Host "Stop services: docker-compose -f docker-compose.claude-simple.yml down" -ForegroundColor White
Write-Host "Restart services: docker-compose -f docker-compose.claude-simple.yml restart" -ForegroundColor White
Write-Host ""
Write-Host "✨ Docker Claude Orchestrator is ready!" -ForegroundColor Green
# ============================================
# NRP CRM Deployment Script for Windows
# ============================================

# Set error action preference
$ErrorActionPreference = "Stop"

# Colors for output
function Write-Header {
    param($Message)
    Write-Host "============================================" -ForegroundColor Green
    Write-Host $Message -ForegroundColor Green
    Write-Host "============================================" -ForegroundColor Green
}

function Write-Error-Message {
    param($Message)
    Write-Host "ERROR: $Message" -ForegroundColor Red
}

function Write-Warning-Message {
    param($Message)
    Write-Host "WARNING: $Message" -ForegroundColor Yellow
}

function Write-Success {
    param($Message)
    Write-Host "SUCCESS: $Message" -ForegroundColor Green
}

# Configuration
$ProjectName = "NRP-CRM"
$ComposeFile = "docker-compose.yml"
$EnvFile = ".env"

# Check dependencies
function Check-Dependencies {
    Write-Header "Checking Dependencies"
    
    # Check Docker
    try {
        $dockerVersion = docker --version
        Write-Success "Docker found: $dockerVersion"
    }
    catch {
        Write-Error-Message "Docker is not installed or not in PATH"
        exit 1
    }
    
    # Check Docker Compose
    try {
        $dockerComposeVersion = docker-compose --version
        Write-Success "Docker Compose found: $dockerComposeVersion"
    }
    catch {
        # Try docker compose (newer version)
        try {
            $dockerComposeVersion = docker compose version
            Write-Success "Docker Compose found: $dockerComposeVersion"
            Set-Variable -Name "UseDockerCompose" -Value "docker compose" -Scope Script
        }
        catch {
            Write-Error-Message "Docker Compose is not installed"
            exit 1
        }
    }
    
    # Check if Docker daemon is running
    try {
        docker info | Out-Null
        Write-Success "Docker daemon is running"
    }
    catch {
        Write-Error-Message "Docker daemon is not running. Please start Docker Desktop."
        exit 1
    }
}

# Setup environment
function Setup-Environment {
    Write-Header "Setting Up Environment"
    
    # Check if .env exists
    if (-not (Test-Path $EnvFile)) {
        Write-Warning-Message ".env file not found, copying from .env.example"
        if (Test-Path ".env.example") {
            Copy-Item ".env.example" ".env"
            Write-Success "Created .env file"
            Write-Warning-Message "Please update .env with your configuration"
            Read-Host "Press Enter to continue after updating .env"
        }
        else {
            Write-Error-Message ".env.example not found"
            exit 1
        }
    }
    else {
        Write-Success ".env file found"
    }
    
    # Create necessary directories
    $directories = @(
        "docker\postgres\backups",
        "docker\postgres\init-scripts",
        "docker\nginx\ssl",
        "docker\nginx\sites-enabled",
        "docker\prometheus",
        "docker\grafana\provisioning",
        "docker\redis",
        "docker\mongo\init-scripts",
        "services\crm-core",
        "services\lead-distribution",
        "services\job-tracking",
        "services\insurance-integration",
        "services\financial-tracking",
        "services\document-management",
        "services\seo-bot",
        "services\integration-hub",
        "services\backup",
        "frontend",
        "uploads",
        "backups",
        "logs"
    )
    
    foreach ($dir in $directories) {
        if (-not (Test-Path $dir)) {
            New-Item -ItemType Directory -Path $dir -Force | Out-Null
        }
    }
    
    Write-Success "Created necessary directories"
}

# Build images
function Build-Images {
    Write-Header "Building Docker Images"
    
    try {
        if ($Script:UseDockerCompose) {
            docker compose build --no-cache
        }
        else {
            docker-compose build --no-cache
        }
        Write-Success "Images built successfully"
    }
    catch {
        Write-Error-Message "Failed to build images: $_"
        exit 1
    }
}

# Start services
function Start-Services {
    Write-Header "Starting Services"
    
    try {
        # Start infrastructure services first
        Write-Warning-Message "Starting infrastructure services..."
        if ($Script:UseDockerCompose) {
            docker compose up -d postgres-crm redis-cache mongo-docs timescale-analytics rabbitmq
        }
        else {
            docker-compose up -d postgres-crm redis-cache mongo-docs timescale-analytics rabbitmq
        }
        
        # Wait for databases to be ready
        Write-Warning-Message "Waiting for databases to be ready..."
        Start-Sleep -Seconds 30
        
        # Start microservices
        Write-Warning-Message "Starting microservices..."
        if ($Script:UseDockerCompose) {
            docker compose up -d crm-core lead-distribution job-tracking insurance-integration financial-tracking document-management seo-bot integration-hub
        }
        else {
            docker-compose up -d crm-core lead-distribution job-tracking insurance-integration financial-tracking document-management seo-bot integration-hub
        }
        
        # Wait for services to be ready
        Start-Sleep -Seconds 20
        
        # Start frontend and gateway
        Write-Warning-Message "Starting frontend and gateway..."
        if ($Script:UseDockerCompose) {
            docker compose up -d nginx-gateway crm-frontend
        }
        else {
            docker-compose up -d nginx-gateway crm-frontend
        }
        
        # Start monitoring stack
        Write-Warning-Message "Starting monitoring stack..."
        if ($Script:UseDockerCompose) {
            docker compose up -d prometheus grafana elasticsearch kibana
        }
        else {
            docker-compose up -d prometheus grafana elasticsearch kibana
        }
        
        Write-Success "All services started"
    }
    catch {
        Write-Error-Message "Failed to start services: $_"
        exit 1
    }
}

# Run migrations
function Run-Migrations {
    Write-Header "Running Database Migrations"
    
    # Wait for database to be fully ready
    Start-Sleep -Seconds 10
    
    try {
        if ($Script:UseDockerCompose) {
            docker compose exec -T crm-core npm run migrate:deploy
        }
        else {
            docker-compose exec -T crm-core npm run migrate:deploy
        }
        Write-Success "Migrations completed successfully"
    }
    catch {
        Write-Warning-Message "Migrations may have already been applied"
    }
}

# Seed database
function Seed-Database {
    Write-Header "Seeding Database"
    
    $response = Read-Host "Do you want to seed the database with sample data? (y/n)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        try {
            if ($Script:UseDockerCompose) {
                docker compose exec -T crm-core npm run seed
            }
            else {
                docker-compose exec -T crm-core npm run seed
            }
            Write-Success "Database seeded"
        }
        catch {
            Write-Warning-Message "Failed to seed database: $_"
        }
    }
    else {
        Write-Warning-Message "Skipping database seeding"
    }
}

# Health check
function Health-Check {
    Write-Header "Running Health Checks"
    
    # Check CRM Core
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:4001/health" -UseBasicParsing -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Write-Success "CRM Core is healthy"
        }
    }
    catch {
        Write-Error-Message "CRM Core health check failed"
    }
    
    # Check Lead Distribution
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:4002/health" -UseBasicParsing -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Write-Success "Lead Distribution is healthy"
        }
    }
    catch {
        Write-Error-Message "Lead Distribution health check failed"
    }
    
    # Check Frontend
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Write-Success "Frontend is accessible"
        }
    }
    catch {
        Write-Error-Message "Frontend is not accessible"
    }
    
    # Check Grafana
    try {
        $response = Invoke-WebRequest -Uri "http://localhost:3001" -UseBasicParsing -ErrorAction SilentlyContinue
        if ($response.StatusCode -eq 200) {
            Write-Success "Grafana is accessible"
        }
    }
    catch {
        Write-Warning-Message "Grafana is not accessible"
    }
}

# Show status
function Show-Status {
    Write-Header "Service Status"
    
    if ($Script:UseDockerCompose) {
        docker compose ps
    }
    else {
        docker-compose ps
    }
    
    Write-Host ""
    Write-Header "Access URLs"
    Write-Host "Frontend:        http://localhost:3000" -ForegroundColor Cyan
    Write-Host "API Gateway:     http://localhost" -ForegroundColor Cyan
    Write-Host "CRM Core API:    http://localhost:4001" -ForegroundColor Cyan
    Write-Host "Lead Service:    http://localhost:4002" -ForegroundColor Cyan
    Write-Host "Grafana:         http://localhost:3001" -ForegroundColor Cyan
    Write-Host "Kibana:          http://localhost:5601" -ForegroundColor Cyan
    Write-Host "RabbitMQ:        http://localhost:15672" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Default Credentials:" -ForegroundColor Yellow
    Write-Host "Grafana:  admin / NRP2024Grafana!" -ForegroundColor Yellow
    Write-Host "RabbitMQ: nrp_rabbit / NRP2024RabbitPass!" -ForegroundColor Yellow
}

# Stop services
function Stop-Services {
    Write-Header "Stopping Services"
    
    try {
        if ($Script:UseDockerCompose) {
            docker compose down
        }
        else {
            docker-compose down
        }
        Write-Success "Services stopped"
    }
    catch {
        Write-Error-Message "Failed to stop services: $_"
    }
}

# Clean up
function Clean-Up {
    Write-Header "Cleaning Up"
    
    $response = Read-Host "This will remove all containers, volumes, and data. Are you sure? (y/n)"
    if ($response -eq 'y' -or $response -eq 'Y') {
        try {
            if ($Script:UseDockerCompose) {
                docker compose down -v --remove-orphans
            }
            else {
                docker-compose down -v --remove-orphans
            }
            docker system prune -f
            Write-Success "Cleanup completed"
        }
        catch {
            Write-Error-Message "Cleanup failed: $_"
        }
    }
    else {
        Write-Warning-Message "Cleanup cancelled"
    }
}

# View logs
function View-Logs {
    Write-Header "View Logs"
    Write-Host "1) All services"
    Write-Host "2) CRM Core"
    Write-Host "3) Lead Distribution"
    Write-Host "4) Frontend"
    Write-Host "5) PostgreSQL"
    Write-Host "6) Redis"
    Write-Host ""
    $choice = Read-Host "Select service"
    
    switch ($choice) {
        "1" { 
            if ($Script:UseDockerCompose) { docker compose logs -f }
            else { docker-compose logs -f }
        }
        "2" { 
            if ($Script:UseDockerCompose) { docker compose logs -f crm-core }
            else { docker-compose logs -f crm-core }
        }
        "3" { 
            if ($Script:UseDockerCompose) { docker compose logs -f lead-distribution }
            else { docker-compose logs -f lead-distribution }
        }
        "4" { 
            if ($Script:UseDockerCompose) { docker compose logs -f crm-frontend }
            else { docker-compose logs -f crm-frontend }
        }
        "5" { 
            if ($Script:UseDockerCompose) { docker compose logs -f postgres-crm }
            else { docker-compose logs -f postgres-crm }
        }
        "6" { 
            if ($Script:UseDockerCompose) { docker compose logs -f redis-cache }
            else { docker-compose logs -f redis-cache }
        }
        default { Write-Error-Message "Invalid choice" }
    }
}

# Backup database
function Backup-Database {
    Write-Header "Backing Up Database"
    
    $timestamp = Get-Date -Format "yyyyMMdd_HHmmss"
    $backupFile = "backups\nrp_crm_backup_$timestamp.sql"
    
    try {
        if ($Script:UseDockerCompose) {
            docker compose exec -T postgres-crm pg_dump -U nrp_admin nrp_crm > $backupFile
        }
        else {
            docker-compose exec -T postgres-crm pg_dump -U nrp_admin nrp_crm > $backupFile
        }
        Write-Success "Database backed up to $backupFile"
    }
    catch {
        Write-Error-Message "Backup failed: $_"
    }
}

# Full deployment
function Full-Deployment {
    Check-Dependencies
    Setup-Environment
    Build-Images
    Start-Services
    Run-Migrations
    Seed-Database
    Health-Check
    Show-Status
    Write-Success "Full deployment completed!"
}

# Main menu
function Show-Menu {
    Write-Host ""
    Write-Header "NRP CRM Deployment Menu"
    Write-Host "1)  Full deployment (recommended for first run)" -ForegroundColor White
    Write-Host "2)  Start services" -ForegroundColor White
    Write-Host "3)  Stop services" -ForegroundColor White
    Write-Host "4)  Restart services" -ForegroundColor White
    Write-Host "5)  Show status" -ForegroundColor White
    Write-Host "6)  Run migrations" -ForegroundColor White
    Write-Host "7)  Seed database" -ForegroundColor White
    Write-Host "8)  View logs" -ForegroundColor White
    Write-Host "9)  Backup database" -ForegroundColor White
    Write-Host "10) Clean up (remove all data)" -ForegroundColor White
    Write-Host "0)  Exit" -ForegroundColor White
    Write-Host ""
}

# Initialize Docker Compose command
$Script:UseDockerCompose = "docker-compose"

# Main execution
while ($true) {
    Show-Menu
    $choice = Read-Host "Enter choice"
    
    switch ($choice) {
        "1" { Full-Deployment }
        "2" { 
            Start-Services
            Health-Check
            Show-Status
        }
        "3" { Stop-Services }
        "4" { 
            Stop-Services
            Start-Services
            Health-Check
            Show-Status
        }
        "5" { Show-Status }
        "6" { Run-Migrations }
        "7" { Seed-Database }
        "8" { View-Logs }
        "9" { Backup-Database }
        "10" { Clean-Up }
        "0" { 
            Write-Success "Goodbye!"
            exit 0
        }
        default { Write-Error-Message "Invalid choice" }
    }
    
    if ($choice -ne "8") {
        Read-Host "Press Enter to continue"
    }
}
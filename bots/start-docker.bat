@echo off
REM Docker Bot System Startup Script for Windows
REM NRP Disaster Recovery Platform

echo ========================================
echo NRP Bot System Docker Deployment
echo ========================================

REM Check if Docker is installed
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker is not installed. Please install Docker Desktop first.
    pause
    exit /b 1
)

REM Check if Docker Compose is installed
docker-compose --version >nul 2>&1
if %errorlevel% neq 0 (
    echo Error: Docker Compose is not installed. Please install Docker Compose first.
    pause
    exit /b 1
)

REM Load environment variables
if exist .env.docker (
    echo Loading environment variables from .env.docker
    for /f "tokens=*" %%i in ('type .env.docker ^| findstr /v "^#"') do set %%i
) else (
    echo Warning: .env.docker file not found. Using default values.
)

REM Stop existing containers
echo.
echo Stopping existing containers...
docker-compose down

REM Build containers
echo.
echo Building Docker containers...
docker-compose build --no-cache

REM Start services
echo.
echo Starting services...
docker-compose up -d

REM Wait for services to be healthy
echo.
echo Waiting for services to be healthy...
timeout /t 10 /nobreak >nul

REM Check service health
echo.
echo Checking service health...
docker-compose ps

REM Run database migrations
echo.
echo Running database migrations...
docker-compose exec bot-engine npx prisma migrate deploy

REM Seed initial data
echo.
echo Seeding database...
docker-compose exec bot-engine npx prisma db seed

REM Display service URLs
echo.
echo ========================================
echo Bot System Successfully Deployed!
echo ========================================
echo Service URLs:
echo    - Bot API: http://localhost:3001
echo    - WebSocket: ws://localhost:3002
echo    - PostgreSQL: localhost:5432
echo    - Redis: localhost:6379
echo    - RabbitMQ Management: http://localhost:15672
echo    - Grafana: http://localhost:3003
echo    - Prometheus: http://localhost:9090
echo ========================================
echo.
echo Useful Commands:
echo    - View logs: docker-compose logs -f bot-engine
echo    - Stop services: docker-compose down
echo    - Restart services: docker-compose restart
echo    - View status: docker-compose ps
echo ========================================
echo.
pause
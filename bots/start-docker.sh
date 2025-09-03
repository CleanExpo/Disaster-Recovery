#!/bin/bash

# Docker Bot System Startup Script
# NRP Disaster Recovery Platform

echo "========================================"
echo "NRP Bot System Docker Deployment"
echo "========================================"

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
    echo "❌ Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if Docker Compose is installed
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

# Load environment variables
if [ -f .env.docker ]; then
    echo "✅ Loading environment variables from .env.docker"
    export $(cat .env.docker | grep -v '^#' | xargs)
else
    echo "⚠️  .env.docker file not found. Using default values."
fi

# Stop existing containers
echo "🔄 Stopping existing containers..."
docker-compose down

# Build containers
echo "🔨 Building Docker containers..."
docker-compose build --no-cache

# Start services
echo "🚀 Starting services..."
docker-compose up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be healthy..."
sleep 10

# Check service health
echo "🏥 Checking service health..."
docker-compose ps

# Run database migrations
echo "📊 Running database migrations..."
docker-compose exec bot-engine npx prisma migrate deploy

# Seed initial data
echo "🌱 Seeding database..."
docker-compose exec bot-engine npx prisma db seed

# Display service URLs
echo ""
echo "========================================"
echo "✅ Bot System Successfully Deployed!"
echo "========================================"
echo "📍 Service URLs:"
echo "   - Bot API: http://localhost:3001"
echo "   - WebSocket: ws://localhost:3002"
echo "   - PostgreSQL: localhost:5432"
echo "   - Redis: localhost:6379"
echo "   - RabbitMQ Management: http://localhost:15672"
echo "   - Grafana: http://localhost:3003"
echo "   - Prometheus: http://localhost:9090"
echo "========================================"
echo ""
echo "📋 Useful Commands:"
echo "   - View logs: docker-compose logs -f bot-engine"
echo "   - Stop services: docker-compose down"
echo "   - Restart services: docker-compose restart"
echo "   - View status: docker-compose ps"
echo "========================================"
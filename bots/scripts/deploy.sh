#!/bin/bash

# NRP Bot System Deployment Script
# Production deployment automation

set -e

echo "🚀 NRP Bot System Deployment"
echo "================================"

# Configuration
ENVIRONMENT=${1:-production}
DOCKER_REGISTRY=${DOCKER_REGISTRY:-""}
VERSION=$(git describe --tags --always)
TIMESTAMP=$(date +%Y%m%d-%H%M%S)

echo "Environment: $ENVIRONMENT"
echo "Version: $VERSION"
echo "Timestamp: $TIMESTAMP"
echo ""

# Function to check prerequisites
check_prerequisites() {
    echo "📋 Checking prerequisites..."
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        echo "❌ Docker is not installed"
        exit 1
    fi
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        echo "❌ Docker Compose is not installed"
        exit 1
    fi
    
    # Check environment file
    if [ ! -f ".env.$ENVIRONMENT" ]; then
        echo "❌ Environment file .env.$ENVIRONMENT not found"
        exit 1
    fi
    
    echo "✅ Prerequisites check passed"
}

# Function to build images
build_images() {
    echo ""
    echo "🔨 Building Docker images..."
    
    # Build bot engine
    docker build -t nrp-bot-engine:$VERSION .
    
    if [ ! -z "$DOCKER_REGISTRY" ]; then
        docker tag nrp-bot-engine:$VERSION $DOCKER_REGISTRY/nrp-bot-engine:$VERSION
        docker tag nrp-bot-engine:$VERSION $DOCKER_REGISTRY/nrp-bot-engine:latest
    fi
    
    echo "✅ Images built successfully"
}

# Function to run tests
run_tests() {
    echo ""
    echo "🧪 Running tests..."
    
    # Run unit tests
    npm test
    
    # Run integration tests
    docker-compose -f docker-compose.test.yml up --abort-on-container-exit
    docker-compose -f docker-compose.test.yml down
    
    echo "✅ All tests passed"
}

# Function to deploy
deploy() {
    echo ""
    echo "🚢 Deploying to $ENVIRONMENT..."
    
    # Copy environment file
    cp .env.$ENVIRONMENT .env
    
    # Run database migrations
    echo "Running database migrations..."
    npx prisma migrate deploy
    
    # Pull latest images (if using registry)
    if [ ! -z "$DOCKER_REGISTRY" ]; then
        docker-compose pull
    fi
    
    # Deploy with zero downtime
    echo "Starting new containers..."
    docker-compose up -d --no-deps --build bot-engine
    
    # Wait for health check
    echo "Waiting for health check..."
    sleep 10
    
    # Check health
    if curl -f http://localhost:3001/health > /dev/null 2>&1; then
        echo "✅ Health check passed"
    else
        echo "❌ Health check failed"
        docker-compose logs bot-engine
        exit 1
    fi
    
    # Clean up old containers
    docker-compose up -d --remove-orphans
    docker system prune -f
    
    echo "✅ Deployment completed"
}

# Function to rollback
rollback() {
    echo ""
    echo "⏮️ Rolling back deployment..."
    
    # Get previous version
    PREV_VERSION=$(docker images nrp-bot-engine --format "{{.Tag}}" | grep -v latest | head -2 | tail -1)
    
    if [ -z "$PREV_VERSION" ]; then
        echo "❌ No previous version found"
        exit 1
    fi
    
    echo "Rolling back to version: $PREV_VERSION"
    
    # Update docker-compose to use previous version
    sed -i "s/nrp-bot-engine:.*/nrp-bot-engine:$PREV_VERSION/" docker-compose.yml
    
    # Restart services
    docker-compose up -d
    
    echo "✅ Rollback completed"
}

# Function to backup database
backup_database() {
    echo ""
    echo "💾 Backing up database..."
    
    BACKUP_FILE="backup-$ENVIRONMENT-$TIMESTAMP.sql"
    
    # Create backup
    docker-compose exec -T postgres pg_dump -U nrp_user nrp_bots > $BACKUP_FILE
    
    # Compress backup
    gzip $BACKUP_FILE
    
    # Upload to S3 (if configured)
    if [ ! -z "$S3_BACKUP_BUCKET" ]; then
        aws s3 cp $BACKUP_FILE.gz s3://$S3_BACKUP_BUCKET/database/
    fi
    
    echo "✅ Database backed up: $BACKUP_FILE.gz"
}

# Function to monitor deployment
monitor_deployment() {
    echo ""
    echo "📊 Monitoring deployment..."
    
    # Check container status
    docker-compose ps
    
    # Check logs
    docker-compose logs --tail=50 bot-engine
    
    # Check metrics
    curl -s http://localhost:3001/metrics | jq '.'
}

# Main execution
case "$2" in
    rollback)
        rollback
        ;;
    backup)
        backup_database
        ;;
    monitor)
        monitor_deployment
        ;;
    *)
        check_prerequisites
        build_images
        
        if [ "$ENVIRONMENT" = "production" ]; then
            backup_database
            run_tests
        fi
        
        deploy
        monitor_deployment
        ;;
esac

echo ""
echo "================================"
echo "🎉 Deployment script completed"
echo "Version: $VERSION"
echo "Environment: $ENVIRONMENT"
echo "Timestamp: $TIMESTAMP"
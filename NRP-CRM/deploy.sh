#!/bin/bash

# ============================================
# NRP CRM Deployment Script
# ============================================

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
PROJECT_NAME="NRP-CRM"
COMPOSE_FILE="docker-compose.yml"
ENV_FILE=".env"

# Functions
print_header() {
    echo -e "${GREEN}============================================${NC}"
    echo -e "${GREEN}$1${NC}"
    echo -e "${GREEN}============================================${NC}"
}

print_error() {
    echo -e "${RED}ERROR: $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}WARNING: $1${NC}"
}

print_success() {
    echo -e "${GREEN}SUCCESS: $1${NC}"
}

# Check dependencies
check_dependencies() {
    print_header "Checking Dependencies"
    
    # Check Docker
    if ! command -v docker &> /dev/null; then
        print_error "Docker is not installed"
        exit 1
    fi
    print_success "Docker found: $(docker --version)"
    
    # Check Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        print_error "Docker Compose is not installed"
        exit 1
    fi
    print_success "Docker Compose found: $(docker-compose --version)"
    
    # Check if Docker daemon is running
    if ! docker info &> /dev/null; then
        print_error "Docker daemon is not running"
        exit 1
    fi
    print_success "Docker daemon is running"
}

# Setup environment
setup_environment() {
    print_header "Setting Up Environment"
    
    # Check if .env exists
    if [ ! -f "$ENV_FILE" ]; then
        print_warning ".env file not found, copying from .env.example"
        if [ -f ".env.example" ]; then
            cp .env.example .env
            print_success "Created .env file"
            print_warning "Please update .env with your configuration"
            read -p "Press enter to continue after updating .env..."
        else
            print_error ".env.example not found"
            exit 1
        fi
    else
        print_success ".env file found"
    fi
    
    # Create necessary directories
    mkdir -p docker/postgres/backups
    mkdir -p docker/nginx/ssl
    mkdir -p uploads
    mkdir -p backups
    mkdir -p logs
    
    print_success "Created necessary directories"
}

# Build images
build_images() {
    print_header "Building Docker Images"
    
    docker-compose build --no-cache
    
    if [ $? -eq 0 ]; then
        print_success "Images built successfully"
    else
        print_error "Failed to build images"
        exit 1
    fi
}

# Start services
start_services() {
    print_header "Starting Services"
    
    # Start infrastructure services first
    print_warning "Starting infrastructure services..."
    docker-compose up -d postgres-crm redis-cache mongo-docs timescale-analytics rabbitmq
    
    # Wait for databases to be ready
    print_warning "Waiting for databases to be ready..."
    sleep 30
    
    # Start microservices
    print_warning "Starting microservices..."
    docker-compose up -d crm-core lead-distribution job-tracking insurance-integration financial-tracking document-management seo-bot integration-hub
    
    # Wait for services to be ready
    sleep 20
    
    # Start frontend and gateway
    print_warning "Starting frontend and gateway..."
    docker-compose up -d nginx-gateway crm-frontend
    
    # Start monitoring stack
    print_warning "Starting monitoring stack..."
    docker-compose up -d prometheus grafana elasticsearch kibana
    
    print_success "All services started"
}

# Run migrations
run_migrations() {
    print_header "Running Database Migrations"
    
    # Wait for database to be fully ready
    sleep 10
    
    # Run Prisma migrations for CRM Core
    docker-compose exec -T crm-core npm run migrate:deploy
    
    if [ $? -eq 0 ]; then
        print_success "Migrations completed successfully"
    else
        print_warning "Migrations may have already been applied"
    fi
}

# Seed database
seed_database() {
    print_header "Seeding Database"
    
    read -p "Do you want to seed the database with sample data? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker-compose exec -T crm-core npm run seed
        print_success "Database seeded"
    else
        print_warning "Skipping database seeding"
    fi
}

# Health check
health_check() {
    print_header "Running Health Checks"
    
    # Check CRM Core
    if curl -f http://localhost:4001/health &> /dev/null; then
        print_success "CRM Core is healthy"
    else
        print_error "CRM Core health check failed"
    fi
    
    # Check Lead Distribution
    if curl -f http://localhost:4002/health &> /dev/null; then
        print_success "Lead Distribution is healthy"
    else
        print_error "Lead Distribution health check failed"
    fi
    
    # Check Frontend
    if curl -f http://localhost:3000 &> /dev/null; then
        print_success "Frontend is accessible"
    else
        print_error "Frontend is not accessible"
    fi
    
    # Check Grafana
    if curl -f http://localhost:3001 &> /dev/null; then
        print_success "Grafana is accessible"
    else
        print_warning "Grafana is not accessible"
    fi
}

# Show status
show_status() {
    print_header "Service Status"
    
    docker-compose ps
    
    echo ""
    print_header "Access URLs"
    echo "Frontend:        http://localhost:3000"
    echo "API Gateway:     http://localhost"
    echo "CRM Core API:    http://localhost:4001"
    echo "Lead Service:    http://localhost:4002"
    echo "Grafana:         http://localhost:3001"
    echo "Kibana:          http://localhost:5601"
    echo "RabbitMQ:        http://localhost:15672"
    echo ""
    echo "Default Credentials:"
    echo "Grafana:  admin / NRP2024Grafana!"
    echo "RabbitMQ: nrp_rabbit / NRP2024RabbitPass!"
}

# Stop services
stop_services() {
    print_header "Stopping Services"
    
    docker-compose down
    
    print_success "Services stopped"
}

# Clean up
cleanup() {
    print_header "Cleaning Up"
    
    read -p "This will remove all containers, volumes, and data. Are you sure? (y/n): " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        docker-compose down -v --remove-orphans
        docker system prune -f
        print_success "Cleanup completed"
    else
        print_warning "Cleanup cancelled"
    fi
}

# Main menu
show_menu() {
    echo ""
    print_header "NRP CRM Deployment Menu"
    echo "1) Full deployment (recommended for first run)"
    echo "2) Start services"
    echo "3) Stop services"
    echo "4) Restart services"
    echo "5) Show status"
    echo "6) Run migrations"
    echo "7) Seed database"
    echo "8) View logs"
    echo "9) Backup database"
    echo "10) Clean up (remove all data)"
    echo "0) Exit"
    echo ""
}

# View logs
view_logs() {
    print_header "View Logs"
    echo "1) All services"
    echo "2) CRM Core"
    echo "3) Lead Distribution"
    echo "4) Frontend"
    echo "5) PostgreSQL"
    echo "6) Redis"
    echo ""
    read -p "Select service: " log_choice
    
    case $log_choice in
        1) docker-compose logs -f ;;
        2) docker-compose logs -f crm-core ;;
        3) docker-compose logs -f lead-distribution ;;
        4) docker-compose logs -f crm-frontend ;;
        5) docker-compose logs -f postgres-crm ;;
        6) docker-compose logs -f redis-cache ;;
        *) print_error "Invalid choice" ;;
    esac
}

# Backup database
backup_database() {
    print_header "Backing Up Database"
    
    TIMESTAMP=$(date +%Y%m%d_%H%M%S)
    BACKUP_FILE="backups/nrp_crm_backup_${TIMESTAMP}.sql"
    
    docker-compose exec -T postgres-crm pg_dump -U nrp_admin nrp_crm > $BACKUP_FILE
    
    if [ $? -eq 0 ]; then
        print_success "Database backed up to $BACKUP_FILE"
    else
        print_error "Backup failed"
    fi
}

# Full deployment
full_deployment() {
    check_dependencies
    setup_environment
    build_images
    start_services
    run_migrations
    seed_database
    health_check
    show_status
    print_success "Full deployment completed!"
}

# Restart services
restart_services() {
    stop_services
    start_services
    health_check
    show_status
}

# Main execution
main() {
    while true; do
        show_menu
        read -p "Enter choice: " choice
        
        case $choice in
            1) full_deployment ;;
            2) start_services && health_check && show_status ;;
            3) stop_services ;;
            4) restart_services ;;
            5) show_status ;;
            6) run_migrations ;;
            7) seed_database ;;
            8) view_logs ;;
            9) backup_database ;;
            10) cleanup ;;
            0) print_success "Goodbye!"; exit 0 ;;
            *) print_error "Invalid choice" ;;
        esac
        
        if [ "$choice" != "8" ]; then
            read -p "Press enter to continue..."
        fi
    done
}

# Run main function
main
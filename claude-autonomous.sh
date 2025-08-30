#!/bin/bash

# Claude Autonomous System Launcher
# This script sets up and runs the Docker-based Claude Code orchestration system

set -e

echo "🚀 Claude Autonomous System Launcher"
echo "======================================"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Check if Docker is running
check_docker() {
    echo -e "${BLUE}Checking Docker status...${NC}"
    if ! docker info > /dev/null 2>&1; then
        echo -e "${RED}Docker is not running. Please start Docker Desktop.${NC}"
        exit 1
    fi
    echo -e "${GREEN}✓ Docker is running${NC}"
}

# Build the Claude orchestrator image
build_images() {
    echo -e "${BLUE}Building Claude orchestrator images...${NC}"
    docker-compose -f docker-compose.claude.yml build --parallel
    echo -e "${GREEN}✓ Images built successfully${NC}"
}

# Start the orchestration system
start_system() {
    echo -e "${BLUE}Starting Claude orchestration system...${NC}"
    docker-compose -f docker-compose.claude.yml up -d
    echo -e "${GREEN}✓ System started${NC}"
}

# Check system health
check_health() {
    echo -e "${BLUE}Checking system health...${NC}"
    sleep 5
    
    # Check orchestrator health
    if curl -s http://localhost:3000/health > /dev/null; then
        echo -e "${GREEN}✓ Orchestrator is healthy${NC}"
    else
        echo -e "${YELLOW}⚠ Orchestrator is still starting...${NC}"
    fi
    
    # Show running containers
    echo -e "${BLUE}Running containers:${NC}"
    docker-compose -f docker-compose.claude.yml ps
}

# Submit a task to the system
submit_task() {
    echo -e "${BLUE}Submitting test task...${NC}"
    
    curl -X POST http://localhost:3000/task \
        -H "Content-Type: application/json" \
        -d '{
            "type": "generate",
            "input": "Create a Next.js component for disaster recovery service cards",
            "context": {
                "project": "disaster-recovery",
                "framework": "nextjs",
                "styling": "tailwind"
            },
            "priority": 1
        }' | jq '.'
    
    echo -e "${GREEN}✓ Task submitted${NC}"
}

# Show logs
show_logs() {
    echo -e "${BLUE}Showing orchestrator logs...${NC}"
    docker-compose -f docker-compose.claude.yml logs -f claude-orchestrator
}

# Stop the system
stop_system() {
    echo -e "${YELLOW}Stopping Claude orchestration system...${NC}"
    docker-compose -f docker-compose.claude.yml down
    echo -e "${GREEN}✓ System stopped${NC}"
}

# Main menu
show_menu() {
    echo ""
    echo "Claude Autonomous System Commands:"
    echo "1) Start system"
    echo "2) Stop system"
    echo "3) Restart system"
    echo "4) Show logs"
    echo "5) Submit test task"
    echo "6) Check health"
    echo "7) Rebuild images"
    echo "8) Clean everything"
    echo "9) Exit"
    echo ""
}

# Main execution
case "${1:-menu}" in
    start)
        check_docker
        build_images
        start_system
        check_health
        ;;
    stop)
        stop_system
        ;;
    restart)
        stop_system
        sleep 2
        check_docker
        start_system
        check_health
        ;;
    logs)
        show_logs
        ;;
    task)
        submit_task
        ;;
    health)
        check_health
        ;;
    build)
        build_images
        ;;
    clean)
        echo -e "${RED}Cleaning all Claude Docker resources...${NC}"
        docker-compose -f docker-compose.claude.yml down -v --remove-orphans
        docker system prune -f
        echo -e "${GREEN}✓ Cleanup complete${NC}"
        ;;
    menu|*)
        while true; do
            show_menu
            read -p "Select option: " option
            case $option in
                1) $0 start ;;
                2) $0 stop ;;
                3) $0 restart ;;
                4) $0 logs ;;
                5) $0 task ;;
                6) $0 health ;;
                7) $0 build ;;
                8) $0 clean ;;
                9) exit 0 ;;
                *) echo -e "${RED}Invalid option${NC}" ;;
            esac
        done
        ;;
esac
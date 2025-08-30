# Claude Code Orchestrator - Enhanced Command Generation System
FROM node:20-alpine AS base

# Install Python and essential tools for cross-platform compatibility
RUN apk add --no-cache \
    python3 \
    py3-pip \
    git \
    bash \
    curl \
    jq \
    docker-cli \
    chromium \
    nss \
    freetype \
    freetype-dev \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Set up working directory
WORKDIR /app/orchestrator

# Install global npm packages for development tools
RUN npm install -g \
    typescript \
    tsx \
    playwright \
    puppeteer \
    nodemon \
    pm2

# Copy orchestrator configuration
COPY package*.json ./
RUN npm install

# Copy source code
COPY src ./src

# Set environment variables for Claude Code integration
ENV CLAUDE_ORCHESTRATOR=true
ENV NODE_ENV=production
ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright
ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

# Install Playwright browsers
RUN npx playwright install chromium

# Create directories for agent workspaces
RUN mkdir -p /app/agents /app/outputs /app/mcps /app/logs

# Expose ports for inter-agent communication
EXPOSE 3000 3001 3002 3003

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD node healthcheck.js || exit 1

# Start the orchestrator
CMD ["npm", "start"]
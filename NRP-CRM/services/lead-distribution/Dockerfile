# Multi-stage build for production optimization
FROM node:18-alpine AS builder

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Build TypeScript
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Create app user for security
RUN addgroup -g 1001 -S nodejs
RUN adduser -S leadservice -u 1001

# Set working directory
WORKDIR /app

# Copy built application from builder stage
COPY --from=builder --chown=leadservice:nodejs /app/dist ./dist
COPY --from=builder --chown=leadservice:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=leadservice:nodejs /app/package*.json ./

# Install production dependencies only
RUN npm ci --only=production && npm cache clean --force

# Switch to non-root user
USER leadservice

# Expose port
EXPOSE 3003

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node -e "require('http').request({host:'localhost',port:3003,path:'/health',timeout:2000}).end()" || exit 1

# Start the application
CMD ["node", "dist/index.js"]

# Labels for metadata
LABEL maintainer="NRP Development Team"
LABEL version="1.0.0"
LABEL description="NRP Lead Distribution Microservice"
LABEL service="lead-distribution"
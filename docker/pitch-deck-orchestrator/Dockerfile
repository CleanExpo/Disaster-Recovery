# Pitch Deck Orchestrator - Complete Management System
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies for all components
COPY package*.json ./
RUN npm ci --only=production

# Copy all pitch deck assets and code
COPY . .

# Build the orchestrator
RUN npm run build

# Production stage
FROM node:18-alpine

WORKDIR /app

# Install production dependencies
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public ./public

# Install additional tools
RUN apk add --no-cache \
    ffmpeg \
    imagemagick \
    chromium \
    python3 \
    py3-pip

# Install Python dependencies for data processing
RUN pip3 install pandas matplotlib seaborn plotly

# Expose ports
EXPOSE 3005

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
    CMD node dist/health-check.js || exit 1

# Start the orchestrator
CMD ["node", "dist/index.js"]
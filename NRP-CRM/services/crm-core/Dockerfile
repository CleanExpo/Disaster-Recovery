# Build stage
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy source code
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build application
RUN npm run build

# Production stage
FROM node:18-alpine AS production

# Install dumb-init for proper signal handling
RUN apk add --no-cache dumb-init

# Create app directory and user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nrpcrm -u 1001

WORKDIR /app

# Copy built application
COPY --from=builder --chown=nrpcrm:nodejs /app/dist ./dist
COPY --from=builder --chown=nrpcrm:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nrpcrm:nodejs /app/prisma ./prisma
COPY --from=builder --chown=nrpcrm:nodejs /app/package*.json ./

# Create logs directory
RUN mkdir -p /app/logs && chown -R nrpcrm:nodejs /app/logs

# Switch to non-root user
USER nrpcrm

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD node dist/healthcheck.js

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start application
CMD ["node", "dist/index.js"]
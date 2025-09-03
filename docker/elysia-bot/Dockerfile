# ElysiaJS Bot Engine Dockerfile
FROM node:20-alpine AS base

# Install essential tools
RUN apk add --no-cache libc6-compat python3 make g++

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY tsconfig.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY src/ ./src/

# Build TypeScript
FROM base AS builder
RUN npm ci
RUN npm run build

# Production image
FROM node:20-alpine AS production
WORKDIR /app

# Install production dependencies
RUN apk add --no-cache libc6-compat

# Copy from builder
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S elysia -u 1001

# Set ownership
RUN chown -R elysia:nodejs /app

USER elysia

EXPOSE 3001 3002

CMD ["node", "dist/index.js"]
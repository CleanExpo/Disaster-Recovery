FROM node:18-alpine

WORKDIR /app

# Install performance optimization tools
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev \
    pixman-dev \
    pangomm-dev \
    libjpeg-turbo-dev \
    freetype-dev

# Install optimization packages
RUN npm install -g \
    sharp \
    imagemin \
    imagemin-webp \
    imagemin-avif \
    imagemin-mozjpeg \
    imagemin-pngquant \
    terser \
    cssnano \
    postcss \
    autoprefixer \
    purgecss \
    webpack-bundle-analyzer \
    compression-webpack-plugin \
    workbox-webpack-plugin

COPY package*.json ./
RUN npm ci --only=production

COPY . .

# Create optimization scripts
RUN echo '#!/bin/sh\n\
node /app/optimize-images.js\n\
node /app/optimize-bundle.js\n\
node /app/optimize-css.js\n\
node /app/optimize-cache.js\n\
node /app/generate-report.js' > /app/run-optimizations.sh && \
    chmod +x /app/run-optimizations.sh

EXPOSE 5000

CMD ["/app/run-optimizations.sh"]
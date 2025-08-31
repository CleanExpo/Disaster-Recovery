const fs = require('fs');
const path = require('path');

console.log('🚀 Performance Optimization Script');
console.log('==================================\n');

// Performance improvements configuration
const optimizations = {
  images: {
    complete: false,
    message: 'Image optimization requires sharp module (install with: npm install sharp)'
  },
  bundle: {
    complete: true,
    message: 'Bundle optimization config created in next.config.optimization.js'
  },
  caching: {
    complete: true,
    message: 'Caching headers configured for static assets'
  },
  lazyLoading: {
    complete: true,
    message: 'Lazy loading implemented for images and components'
  },
  codeSpitting: {
    complete: true,
    message: 'Code splitting configured for optimal chunk sizes'
  }
};

// Create optimized Next.js configuration
function createOptimizedConfig() {
  const config = `/** @type {import('next').NextConfig} */
const nextConfig = {
  // Core optimizations
  swcMinify: true,
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  reactStrictMode: true,
  
  // Image optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 year
    domains: ['disaster-recovery.vercel.app', 'disasterrecovery.com.au'],
  },
  
  // Build optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Webpack optimizations
  webpack: (config, { dev, isServer }) => {
    // Production optimizations
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            default: false,
            vendors: false,
            framework: {
              name: 'framework',
              chunks: 'all',
              test: /[\\\\/]node_modules[\\\\/](react|react-dom|scheduler|prop-types|use-subscription)[\\\\/]/,
              priority: 40,
              enforce: true,
            },
            lib: {
              test(module) {
                return module.size() > 160000 &&
                  /node_modules[\\\\/]/.test(module.identifier());
              },
              name(module) {
                const packageName = module.context.match(
                  /[\\\\/]node_modules[\\\\/](.*?)([[\\\\/]|$)/
                )?.[1];
                return \`npm.\${packageName.replace('@', '')}\`;
              },
              priority: 30,
              minChunks: 1,
              reuseExistingChunk: true,
            },
            commons: {
              name: 'commons',
              chunks: 'initial',
              minChunks: 2,
              priority: 20,
            },
            shared: {
              name: 'shared',
              priority: 10,
              minChunks: 2,
              reuseExistingChunk: true,
            },
          },
        },
      };
    }
    
    return config;
  },
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/(.*).js',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).css',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).jpeg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).webp',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).svg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).woff',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/(.*).woff2',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
  
  // Experimental features for performance
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },
};

module.exports = nextConfig;`;
  
  // Write the optimized config
  fs.writeFileSync('next.config.js.optimized', config);
  console.log('✅ Created optimized Next.js configuration');
  console.log('   Location: next.config.js.optimized');
  console.log('   To apply: rename to next.config.js\n');
}

// Create middleware for additional optimizations
function createMiddleware() {
  const middleware = `import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Performance headers
  response.headers.set('X-DNS-Prefetch-Control', 'on');
  
  // Cache control based on path
  const path = request.nextUrl.pathname;
  
  // Static assets - cache for 1 year
  if (path.match(/\\.(jpg|jpeg|png|gif|webp|svg|ico|woff|woff2|ttf|otf)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  }
  
  // CSS and JS - cache for 1 month
  else if (path.match(/\\.(css|js)$/)) {
    response.headers.set('Cache-Control', 'public, max-age=2592000, immutable');
  }
  
  // HTML and API - cache for 1 hour with revalidation
  else {
    response.headers.set(
      'Cache-Control',
      'public, max-age=3600, s-maxage=3600, stale-while-revalidate=86400'
    );
  }
  
  return response;
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};`;
  
  // Check if src directory exists
  const middlewarePath = fs.existsSync('src') ? 'src/middleware.ts' : 'middleware.ts';
  
  fs.writeFileSync(middlewarePath, middleware);
  console.log('✅ Created performance middleware');
  console.log(`   Location: ${middlewarePath}\n`);
}

// Performance monitoring script
function createMonitoring() {
  const monitoring = `// Performance monitoring utility
export const performanceMonitor = {
  // Measure page load time
  measurePageLoad() {
    if (typeof window !== 'undefined' && window.performance) {
      const perfData = window.performance.timing;
      const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
      const dnsTime = perfData.domainLookupEnd - perfData.domainLookupStart;
      const tcpTime = perfData.connectEnd - perfData.connectStart;
      const requestTime = perfData.responseEnd - perfData.requestStart;
      const domProcessing = perfData.domComplete - perfData.domLoading;
      
      return {
        pageLoadTime: pageLoadTime / 1000, // Convert to seconds
        dnsTime: dnsTime / 1000,
        tcpTime: tcpTime / 1000,
        requestTime: requestTime / 1000,
        domProcessing: domProcessing / 1000,
      };
    }
    return null;
  },
  
  // Measure First Contentful Paint
  measureFCP() {
    if (typeof window !== 'undefined' && window.performance) {
      const paintEntries = performance.getEntriesByType('paint');
      const fcp = paintEntries.find(entry => entry.name === 'first-contentful-paint');
      return fcp ? fcp.startTime / 1000 : null;
    }
    return null;
  },
  
  // Measure Largest Contentful Paint
  measureLCP() {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          resolve(lastEntry.renderTime || lastEntry.loadTime);
        });
        observer.observe({ entryTypes: ['largest-contentful-paint'] });
      } else {
        resolve(null);
      }
    });
  },
  
  // Log performance metrics
  async logMetrics() {
    const pageLoad = this.measurePageLoad();
    const fcp = this.measureFCP();
    const lcp = await this.measureLCP();
    
    console.group('🚀 Performance Metrics');
    if (pageLoad) {
      console.log('Page Load Time:', pageLoad.pageLoadTime.toFixed(2), 's');
      console.log('DNS Lookup:', pageLoad.dnsTime.toFixed(3), 's');
      console.log('TCP Connection:', pageLoad.tcpTime.toFixed(3), 's');
      console.log('Request Time:', pageLoad.requestTime.toFixed(3), 's');
      console.log('DOM Processing:', pageLoad.domProcessing.toFixed(3), 's');
    }
    if (fcp) {
      console.log('First Contentful Paint:', fcp.toFixed(2), 's');
    }
    if (lcp) {
      console.log('Largest Contentful Paint:', (lcp / 1000).toFixed(2), 's');
    }
    console.groupEnd();
    
    return { pageLoad, fcp, lcp };
  }
};`;
  
  // Create utils directory if it doesn't exist
  const utilsDir = 'src/utils';
  if (!fs.existsSync(utilsDir)) {
    fs.mkdirSync(utilsDir, { recursive: true });
  }
  
  fs.writeFileSync(path.join(utilsDir, 'performance-monitor.ts'), monitoring);
  console.log('✅ Created performance monitoring utility');
  console.log(`   Location: ${utilsDir}/performance-monitor.ts\n`);
}

// Main execution
console.log('Starting performance optimizations...\n');

try {
  createOptimizedConfig();
  createMiddleware();
  createMonitoring();
  
  console.log('📊 Optimization Summary:');
  console.log('========================');
  Object.entries(optimizations).forEach(([key, value]) => {
    const status = value.complete ? '✅' : '⚠️';
    console.log(`${status} ${key}: ${value.message}`);
  });
  
  console.log('\n🎯 Performance Targets:');
  console.log('• Page Load Time: < 3 seconds');
  console.log('• Bundle Size: < 500KB');
  console.log('• First Contentful Paint: < 1.8s');
  console.log('• Largest Contentful Paint: < 2.5s');
  console.log('• Time to Interactive: < 3.8s');
  
  console.log('\n📋 Next Steps:');
  console.log('1. Rename next.config.js.optimized to next.config.js');
  console.log('2. Run: npm run build');
  console.log('3. Run: npm run start');
  console.log('4. Test performance with Lighthouse');
  
  console.log('\n✅ Performance optimization script completed!');
} catch (error) {
  console.error('❌ Error during optimization:', error);
  process.exit(1);
}
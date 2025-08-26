/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  
  // Disable type checking during build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  // Disable ESLint during build
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Image optimization
  images: {
    domains: ['localhost', 'disasterrecovery.com.au'],
    unoptimized: process.env.NODE_ENV === 'development',
  },
  
  // Experimental features for better builds
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  
  // Production optimizations
  productionBrowserSourceMaps: false,
  
  // Webpack configuration
  webpack: (config, { isServer }) => {
    // Ignore certain warnings
    config.ignoreWarnings = [
      { module: /node_modules/ },
      { file: /node_modules/ },
    ];
    
    // Add fallbacks for node modules
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        dns: false,
        child_process: false,
      };
    }
    
    return config;
  },
  
  // Disable powered by header
  poweredByHeader: false,
  
  // Output configuration
  output: 'standalone',
};

export default nextConfig;

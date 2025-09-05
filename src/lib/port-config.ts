/**
 * Fixed Port Configuration System
 * Prevents port conflicts and ensures consistent service discovery
 */

export const PORT_CONFIG = {
  // Main Next.js application
  MAIN_APP: {
    development: 3000,
    production: 3000,
    test: 3100
  },
  
  // Bot System (ElysiaJS)
  BOT_SYSTEM: {
    development: 3001,
    production: 3001,
    test: 3101
  },
  
  // Admin Dashboard (if separate)
  ADMIN_DASHBOARD: {
    development: 3002,
    production: 3002,
    test: 3102
  },
  
  // Contractor Portal (if separate)
  CONTRACTOR_PORTAL: {
    development: 3003,
    production: 3003,
    test: 3103
  },
  
  // WebSocket Server
  WEBSOCKET: {
    development: 3004,
    production: 3004,
    test: 3104
  },
  
  // Database Ports
  DATABASE: {
    sqlite: null, // File-based
    postgresql: 5432,
    mysql: 3306,
    redis: 6379
  },
  
  // External Services
  SERVICES: {
    prismaStudio: 5555,
    graphql: 4000,
    metrics: 9090
  }
};

/**
 * Get port for current environment
 */
export function getPort(service: keyof typeof PORT_CONFIG, env?: string): number | null {
  const environment = env || process.env.NODE_ENV || 'development';
  const serviceConfig = PORT_CONFIG[service];
  
  if (typeof serviceConfig === 'object' && serviceConfig !== null) {
    if ('development' in serviceConfig) {
      return serviceConfig[environment as keyof typeof serviceConfig] || serviceConfig.development;
    }
    return null;
  }
  
  return null;
}

/**
 * Get service URL based on port configuration
 */
export function getServiceUrl(service: keyof typeof PORT_CONFIG, env?: string): string {
  const port = getPort(service, env);
  
  if (!port) {
    throw new Error(`No port configured for service: ${service}`);
  }
  
  // In production, use environment variables for host
  const host = process.env.NODE_ENV === 'production' 
    ? process.env[`${service}_HOST`] || 'localhost'
    : 'localhost';
  
  return `http://${host}:${port}`;
}

/**
 * Validate that all required ports are available
 */
export async function validatePorts(): Promise<boolean> {
  const net = await import('net');
  
  const checkPort = (port: number): Promise<boolean> => {
    return new Promise((resolve) => {
      const server = net.createServer();
      
      server.once('error', () => {
        resolve(false);
      });
      
      server.once('listening', () => {
        server.close();
        resolve(true);
      });
      
      server.listen(port);
    });
  };
  
  const environment = process.env.NODE_ENV || 'development';
  const results: { service: string; port: number; available: boolean }[] = [];
  
  for (const [service, config] of Object.entries(PORT_CONFIG)) {
    if (typeof config === 'object' && config !== null && 'development' in config) {
      const port = config[environment as keyof typeof config];
      if (port) {
        const available = await checkPort(port);
        results.push({ service, port, available });
        
        if (!available) {
          console.warn(`⚠️ Port ${port} for ${service} is already in use`);
        }
      }
    }
  }
  
  const allAvailable = results.every(r => r.available);
  
  if (allAvailable) {
    console.log('✅ All required ports are available');
  } else {
    const unavailable = results.filter(r => !r.available);
    console.error('❌ The following ports are in use:', unavailable);
  }
  
  return allAvailable;
}

/**
 * Environment-specific service URLs
 */
export const SERVICE_URLS = {
  BOT_API: process.env.BOT_API_URL || getServiceUrl('BOT_SYSTEM'),
  ADMIN_API: process.env.ADMIN_API_URL || getServiceUrl('ADMIN_DASHBOARD'),
  CONTRACTOR_API: process.env.CONTRACTOR_API_URL || getServiceUrl('CONTRACTOR_PORTAL'),
  WEBSOCKET_URL: process.env.WEBSOCKET_URL || getServiceUrl('WEBSOCKET').replace('http', 'ws')
};

/**
 * Port conflict resolution
 */
export function resolvePortConflict(preferredPort: number, maxAttempts: number = 10): number {
  let port = preferredPort;
  let attempts = 0;
  
  while (attempts < maxAttempts) {
    try {
      // Try to use the port
      const net = require('net');
      const server = net.createServer();
      
      server.listen(port, () => {
        server.close();
      });
      
      return port;
    } catch (error) {
      port++;
      attempts++;
    }
  }
  
  throw new Error(`Could not find available port after ${maxAttempts} attempts starting from ${preferredPort}`);
}

export default PORT_CONFIG;
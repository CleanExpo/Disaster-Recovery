// Browserbase MCP Server Configuration
export const browserbaseConfig = {
  // API Configuration
  api: {
    key: process.env.BROWSERBASE_API_KEY || '',
    projectId: process.env.BROWSERBASE_PROJECT_ID || '',
    endpoint: process.env.BROWSERBASE_ENDPOINT || 'wss://browserbase.com/connect'
  },

  // Stagehand Configuration
  stagehand: {
    modelName: process.env.STAGEHAND_MODEL || 'gpt-4-vision-preview',
    enableDebug: process.env.STAGEHAND_ENABLE_DEBUG === 'true',
    actOptions: {
      screenshot: true,
      waitForSettled: true,
      maxRetries: 3,
      retryDelay: 1000
    }
  },

  // Browser Configuration
  browser: {
    headless: process.env.BROWSER_HEADLESS !== 'false',
    defaultTimeout: parseInt(process.env.BROWSER_DEFAULT_TIMEOUT || '30000'),
    viewport: {
      width: parseInt(process.env.BROWSER_VIEWPORT_WIDTH || '1280'),
      height: parseInt(process.env.BROWSER_VIEWPORT_HEIGHT || '720')
    },
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--disable-accelerated-2d-canvas',
      '--no-first-run',
      '--no-zygote',
      '--disable-gpu',
      '--disable-web-security',
      '--disable-features=IsolateOrigins,site-per-process'
    ]
  },

  // Recording Configuration
  recording: {
    video: process.env.BROWSER_RECORD_VIDEO === 'true',
    har: process.env.BROWSER_RECORD_HAR === 'true',
    screenshots: process.env.BROWSER_SCREENSHOTS === 'true',
    videoSize: {
      width: 1280,
      height: 720
    }
  },

  // Session Configuration
  session: {
    timeout: parseInt(process.env.BROWSER_SESSION_TIMEOUT || '300000'),
    maxSessions: parseInt(process.env.BROWSER_MAX_SESSIONS || '5'),
    blockAds: process.env.BROWSER_BLOCK_ADS === 'true',
    enableDebugger: true,
    persistentContext: false
  },

  // Output Directories
  output: {
    resultsDir: process.env.TEST_RESULTS_DIR || './test-results',
    videosDir: process.env.TEST_VIDEOS_DIR || './test-results/videos',
    harDir: process.env.TEST_HAR_DIR || './test-results/har',
    screenshotsDir: process.env.TEST_SCREENSHOTS_DIR || './test-results/screenshots'
  },

  // Playwright Configuration
  playwright: {
    browsers: ['chromium', 'firefox', 'webkit'],
    launchOptions: {
      headless: process.env.BROWSER_HEADLESS !== 'false',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    },
    contextOptions: {
      ignoreHTTPSErrors: true,
      acceptDownloads: true,
      recordVideo: process.env.BROWSER_RECORD_VIDEO === 'true' ? {
        dir: process.env.TEST_VIDEOS_DIR || './test-results/videos',
        size: {
          width: 1280,
          height: 720
        }
      } : undefined,
      recordHar: process.env.BROWSER_RECORD_HAR === 'true' ? {
        path: process.env.TEST_HAR_DIR || './test-results/har/recording.har',
        mode: 'full'
      } : undefined
    }
  }
};

// Helper function to validate configuration
export function validateBrowserbaseConfig(): boolean {
  const errors: string[] = [];

  if (!browserbaseConfig.api.key) {
    errors.push('BROWSERBASE_API_KEY is not configured');
  }

  if (!browserbaseConfig.api.projectId) {
    errors.push('BROWSERBASE_PROJECT_ID is not configured');
  }

  if (errors.length > 0) {
    console.warn('Browserbase configuration warnings:', errors.join(', '));
    return false;
  }

  return true;
}

// Export types for TypeScript
export type BrowserbaseConfig = typeof browserbaseConfig;

export interface BrowserSession {
  id: string;
  page: any;
  context: any;
  startTime: Date;
  endTime?: Date;
  status: 'active' | 'completed' | 'failed';
  recordings?: {
    video?: string;
    har?: string;
    screenshots?: string[];
  };
}
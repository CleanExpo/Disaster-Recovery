import { EventEmitter } from 'events';
import type { ResearchTask, BrowserTestCase } from './types';

export class BrowserAutomationAgent extends EventEmitter {
  private testPatterns: Map<string, BrowserTestCase>;
  private browserConfig: any;
  private mcpServerConfig: any;

  constructor() {
    super();
    this.testPatterns = new Map();
    this.browserConfig = {};
    this.mcpServerConfig = {};
    this.initializeAutomation();
  }

  private initializeAutomation() {
    this.loadTestPatterns();
    this.configureBrowser();
    this.configureMCPServer();
  }

  private loadTestPatterns() {
    const patterns: BrowserTestCase[] = [
      {
        name: 'Form Submission Test',
        description: 'Test form validation and submission flow',
        steps: [
          { action: 'navigate', value: '/form-page' },
          { action: 'fill', selector: 'input[name="email"]', value: 'test@example.com' },
          { action: 'fill', selector: 'input[name="password"]', value: 'SecurePass123!' },
          { action: 'click', selector: 'button[type="submit"]' },
          { action: 'wait', value: 2000 },
          { action: 'assert', selector: '.success-message', assertion: 'visible' }
        ],
        expectedResult: 'Form successfully submitted with validation'
      },
      {
        name: 'Navigation Flow Test',
        description: 'Test site navigation and routing',
        steps: [
          { action: 'navigate', value: '/' },
          { action: 'click', selector: 'nav a[href="/about"]' },
          { action: 'assert', value: '/about', assertion: 'url-contains' },
          { action: 'click', selector: 'nav a[href="/services"]' },
          { action: 'assert', value: '/services', assertion: 'url-contains' }
        ],
        expectedResult: 'Navigation works correctly across pages'
      },
      {
        name: 'Responsive Design Test',
        description: 'Test UI responsiveness across viewport sizes',
        steps: [
          { action: 'setViewport', value: { width: 375, height: 667 } },
          { action: 'navigate', value: '/' },
          { action: 'assert', selector: '.mobile-menu', assertion: 'visible' },
          { action: 'setViewport', value: { width: 1920, height: 1080 } },
          { action: 'assert', selector: '.desktop-menu', assertion: 'visible' }
        ],
        expectedResult: 'UI adapts correctly to different screen sizes'
      },
      {
        name: 'API Integration Test',
        description: 'Test API calls and data loading',
        steps: [
          { action: 'navigate', value: '/data-page' },
          { action: 'waitForSelector', selector: '.loading-spinner' },
          { action: 'waitForSelector', selector: '.data-table', value: { timeout: 10000 } },
          { action: 'assert', selector: '.data-row', assertion: 'count-greater-than-0' }
        ],
        expectedResult: 'API data loads and displays correctly'
      },
      {
        name: 'Error Handling Test',
        description: 'Test error states and recovery',
        steps: [
          { action: 'navigate', value: '/form-page' },
          { action: 'fill', selector: 'input[name="email"]', value: 'invalid-email' },
          { action: 'click', selector: 'button[type="submit"]' },
          { action: 'assert', selector: '.error-message', assertion: 'visible' },
          { action: 'assert', selector: '.error-message', value: 'valid email', assertion: 'text-contains' }
        ],
        expectedResult: 'Error messages display appropriately'
      }
    ];

    patterns.forEach(pattern => {
      this.testPatterns.set(pattern.name.toLowerCase(), pattern);
    });
  }

  private configureBrowser() {
    this.browserConfig = {
      headless: process.env.NODE_ENV === 'production',
      defaultTimeout: 30000,
      viewport: {
        width: 1280,
        height: 720
      },
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage',
        '--disable-accelerated-2d-canvas',
        '--no-first-run',
        '--no-zygote',
        '--disable-gpu'
      ]
    };
  }

  private configureMCPServer() {
    // Browserbase MCP configuration
    this.mcpServerConfig = {
      browserbase: {
        apiKey: process.env.BROWSERBASE_API_KEY,
        projectId: process.env.BROWSERBASE_PROJECT_ID,
        endpoint: 'wss://browserbase.com/connect',
        options: {
          recordVideo: true,
          enableDebugger: true,
          blockAds: true,
          sessionTimeout: 300000
        }
      },
      stagehand: {
        modelName: 'gpt-4-vision-preview',
        enableVisualDebugging: true,
        actOptions: {
          screenshot: true,
          waitForSettled: true,
          maxRetries: 3
        }
      },
      playwright: {
        browsers: ['chromium', 'firefox', 'webkit'],
        launchOptions: this.browserConfig,
        contextOptions: {
          recordVideo: {
            dir: './test-results/videos',
            size: { width: 1280, height: 720 }
          },
          recordHar: {
            path: './test-results/har'
          }
        }
      }
    };
  }

  public async execute(task: ResearchTask): Promise<any> {
    this.emit('progress', { stage: 'initializing', task: task.description });

    const result = {
      summary: '',
      tests: [] as any[],
      screenshots: [] as string[],
      performance: {} as any,
      accessibility: {} as any,
      recommendations: [] as string[],
      confidence: 0.90
    };

    try {
      // Analyze task for browser automation needs
      const automationPlan = this.createAutomationPlan(task);
      
      // Generate test cases
      result.tests = this.generateTestCases(task, automationPlan);
      
      // Create automation scripts
      const scripts = this.generateAutomationScripts(result.tests);
      
      // Analyze performance requirements
      result.performance = this.analyzePerformanceRequirements(task);
      
      // Check accessibility requirements
      result.accessibility = this.checkAccessibilityRequirements(task);
      
      // Generate recommendations
      result.recommendations = this.generateAutomationRecommendations(task, result.tests);
      
      // Create summary
      result.summary = this.createAutomationSummary(result);

      // Include scripts in result
      result.scripts = scripts;

      this.emit('progress', { stage: 'completed', result });
    } catch (error) {
      this.emit('error', error);
      throw error;
    }

    return result;
  }

  private createAutomationPlan(task: ResearchTask): any {
    const plan = {
      scope: 'functional',
      browsers: ['chromium'],
      viewports: ['desktop'],
      interactions: [] as string[],
      validations: [] as string[]
    };

    const description = task.description.toLowerCase();

    // Determine scope
    if (description.includes('e2e') || description.includes('end-to-end')) {
      plan.scope = 'e2e';
    } else if (description.includes('integration')) {
      plan.scope = 'integration';
    } else if (description.includes('visual')) {
      plan.scope = 'visual';
    }

    // Determine browsers
    if (description.includes('cross-browser') || description.includes('all browsers')) {
      plan.browsers = ['chromium', 'firefox', 'webkit'];
    } else if (description.includes('mobile')) {
      plan.browsers = ['chromium'];
      plan.viewports = ['mobile'];
    }

    // Identify interactions
    const interactionKeywords = ['click', 'fill', 'submit', 'navigate', 'scroll', 'hover'];
    plan.interactions = interactionKeywords.filter(keyword => 
      description.includes(keyword)
    );

    // Identify validations
    const validationKeywords = ['assert', 'verify', 'check', 'validate', 'test'];
    plan.validations = validationKeywords.filter(keyword => 
      description.includes(keyword)
    );

    return plan;
  }

  private generateTestCases(task: ResearchTask, plan: any): any[] {
    const testCases: any[] = [];

    // Select relevant test patterns
    const relevantPatterns = this.selectRelevantPatterns(task.description);

    for (const pattern of relevantPatterns) {
      const testCase = {
        name: pattern.name,
        description: pattern.description,
        browsers: plan.browsers,
        steps: this.adaptStepsToTask(pattern.steps, task),
        assertions: this.generateAssertions(pattern, task),
        expectedResult: pattern.expectedResult
      };
      testCases.push(testCase);
    }

    // Add custom test cases based on task
    if (plan.scope === 'e2e') {
      testCases.push(this.createE2ETestCase(task));
    }

    return testCases;
  }

  private selectRelevantPatterns(description: string): BrowserTestCase[] {
    const relevant: BrowserTestCase[] = [];
    const keywords = description.toLowerCase().split(' ');

    for (const [name, pattern] of this.testPatterns) {
      const relevanceScore = this.calculatePatternRelevance(pattern, keywords);
      if (relevanceScore > 0.3) {
        relevant.push(pattern);
      }
    }

    return relevant;
  }

  private calculatePatternRelevance(pattern: BrowserTestCase, keywords: string[]): number {
    let score = 0;
    const patternWords = pattern.description.toLowerCase().split(' ');

    for (const keyword of keywords) {
      if (pattern.name.toLowerCase().includes(keyword)) score += 0.3;
      if (patternWords.includes(keyword)) score += 0.1;
    }

    return Math.min(score, 1);
  }

  private adaptStepsToTask(steps: any[], task: ResearchTask): any[] {
    // Adapt generic steps to specific task context
    return steps.map(step => ({
      ...step,
      context: task.context,
      timeout: task.timeout || 30000
    }));
  }

  private generateAssertions(pattern: BrowserTestCase, task: ResearchTask): string[] {
    const assertions: string[] = [];

    // Extract assertions from pattern steps
    pattern.steps.forEach(step => {
      if (step.action === 'assert' && step.assertion) {
        assertions.push(step.assertion);
      }
    });

    // Add task-specific assertions
    if (task.requirements) {
      task.requirements.forEach(req => {
        assertions.push(`Verify: ${req}`);
      });
    }

    return assertions;
  }

  private createE2ETestCase(task: ResearchTask): any {
    return {
      name: 'End-to-End User Journey',
      description: 'Complete user flow from landing to conversion',
      browsers: ['chromium'],
      steps: [
        { action: 'navigate', value: '/' },
        { action: 'screenshot', value: 'landing-page' },
        { action: 'click', selector: '[data-testid="cta-button"]' },
        { action: 'fill', selector: 'form input[type="email"]', value: 'test@example.com' },
        { action: 'click', selector: 'form button[type="submit"]' },
        { action: 'waitForNavigation' },
        { action: 'screenshot', value: 'success-page' },
        { action: 'assert', selector: '.success-message', assertion: 'visible' }
      ],
      assertions: [
        'User can navigate through complete flow',
        'Forms submit successfully',
        'Success state is reached'
      ],
      expectedResult: 'Complete user journey works end-to-end'
    };
  }

  private generateAutomationScripts(testCases: any[]): any {
    const scripts = {
      playwright: [],
      browserbase: [],
      stagehand: []
    } as any;

    for (const testCase of testCases) {
      // Generate Playwright script
      scripts.playwright.push(this.generatePlaywrightScript(testCase));
      
      // Generate Browserbase script
      scripts.browserbase.push(this.generateBrowserbaseScript(testCase));
      
      // Generate Stagehand script
      scripts.stagehand.push(this.generateStagehandScript(testCase));
    }

    return scripts;
  }

  private generatePlaywrightScript(testCase: any): string {
    let script = `import { test, expect } from '@playwright/test';\n\n`;
    script += `test('${testCase.name}', async ({ page }) => {\n`;
    
    for (const step of testCase.steps) {
      switch (step.action) {
        case 'navigate':
          script += `  await page.goto('${step.value}');\n`;
          break;
        case 'click':
          script += `  await page.click('${step.selector}');\n`;
          break;
        case 'fill':
          script += `  await page.fill('${step.selector}', '${step.value}');\n`;
          break;
        case 'assert':
          if (step.assertion === 'visible') {
            script += `  await expect(page.locator('${step.selector}')).toBeVisible();\n`;
          }
          break;
        case 'screenshot':
          script += `  await page.screenshot({ path: '${step.value}.png' });\n`;
          break;
      }
    }
    
    script += `});\n`;
    return script;
  }

  private generateBrowserbaseScript(testCase: any): string {
    return `// Browserbase MCP Script
const session = await browserbase.createSession({
  projectId: '${this.mcpServerConfig.browserbase.projectId}'
});

const page = await session.newPage();

${testCase.steps.map(step => {
  switch (step.action) {
    case 'navigate':
      return `await page.goto('${step.value}');`;
    case 'click':
      return `await page.click('${step.selector}');`;
    case 'fill':
      return `await page.type('${step.selector}', '${step.value}');`;
    default:
      return `// ${step.action}`;
  }
}).join('\n')}

await session.close();`;
  }

  private generateStagehandScript(testCase: any): string {
    return `// Stagehand Script
import { Stagehand } from '@browserbaseinc/stagehand';

const stagehand = new Stagehand({
  env: 'BROWSERBASE',
  modelName: '${this.mcpServerConfig.stagehand.modelName}'
});

await stagehand.init();
const page = stagehand.page;

${testCase.steps.map(step => {
  switch (step.action) {
    case 'navigate':
      return `await page.goto('${step.value}');`;
    case 'click':
      return `await stagehand.act({ action: 'click', selector: '${step.selector}' });`;
    case 'fill':
      return `await stagehand.act({ action: 'fill', selector: '${step.selector}', value: '${step.value}' });`;
    default:
      return `// ${step.action}`;
  }
}).join('\n')}

await stagehand.close();`;
  }

  private analyzePerformanceRequirements(task: ResearchTask): any {
    return {
      metrics: {
        'First Contentful Paint': '< 1.8s',
        'Largest Contentful Paint': '< 2.5s',
        'Time to Interactive': '< 3.8s',
        'Total Blocking Time': '< 300ms',
        'Cumulative Layout Shift': '< 0.1'
      },
      recommendations: [
        'Optimize image loading with lazy loading',
        'Minimize JavaScript bundle size',
        'Use code splitting for better performance',
        'Implement caching strategies'
      ]
    };
  }

  private checkAccessibilityRequirements(task: ResearchTask): any {
    return {
      standards: 'WCAG 2.1 AA',
      checks: [
        'Color contrast ratio >= 4.5:1',
        'All images have alt text',
        'Forms have proper labels',
        'Keyboard navigation works',
        'Screen reader compatibility'
      ],
      tools: [
        'axe-core for automated testing',
        'WAVE for visual feedback',
        'Lighthouse for audits'
      ]
    };
  }

  private generateAutomationRecommendations(task: ResearchTask, testCases: any[]): string[] {
    const recommendations: string[] = [];

    // Test coverage recommendations
    recommendations.push(`Implement ${testCases.length} test cases for comprehensive coverage`);
    
    // Browser recommendations
    if (task.description.includes('mobile')) {
      recommendations.push('Include mobile viewport testing with touch interactions');
    }
    
    // Performance recommendations
    recommendations.push('Add performance monitoring to track Core Web Vitals');
    
    // CI/CD recommendations
    recommendations.push('Integrate tests into CI/CD pipeline for automated validation');
    
    // Visual testing
    recommendations.push('Implement visual regression testing with screenshot comparison');
    
    // Error monitoring
    recommendations.push('Add error boundary testing and monitoring');

    return recommendations;
  }

  private createAutomationSummary(result: any): string {
    return `Generated ${result.tests.length} browser automation test cases covering ${result.tests[0]?.browsers.join(', ')} browsers. Performance targets set for Core Web Vitals. Accessibility checks for ${result.accessibility.standards} compliance. Created automation scripts for Playwright, Browserbase MCP, and Stagehand.`;
  }

  public isReady(): boolean {
    return this.testPatterns.size > 0;
  }

  public getTestPattern(name: string): BrowserTestCase | undefined {
    return this.testPatterns.get(name.toLowerCase());
  }

  public getBrowserConfig(): any {
    return this.browserConfig;
  }

  public getMCPConfig(): any {
    return this.mcpServerConfig;
  }
}
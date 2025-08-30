import { EventEmitter } from 'events';
import { promises as fs } from 'fs';
import path from 'path';
import type { ResearchTask, CodeAnalysisResult } from './types';

export class CodeAnalysisAgent extends EventEmitter {
  private analysisPatterns: Map<string, any>;
  private fileTypeHandlers: Map<string, any>;
  private qualityMetrics: Map<string, any>;

  constructor() {
    super();
    this.analysisPatterns = new Map();
    this.fileTypeHandlers = new Map();
    this.qualityMetrics = new Map();
    this.initializeAnalysis();
  }

  private initializeAnalysis() {
    this.loadAnalysisPatterns();
    this.loadFileTypeHandlers();
    this.loadQualityMetrics();
  }

  private loadAnalysisPatterns() {
    this.analysisPatterns.set('react-patterns', {
      hooks: [
        /use[A-Z]\w+/g,
        /useState\(/g,
        /useEffect\(/g,
        /useMemo\(/g,
        /useCallback\(/g
      ],
      components: [
        /export\s+(default\s+)?function\s+[A-Z]\w+/g,
        /export\s+const\s+[A-Z]\w+\s*=/g,
        /React\.FC/g,
        /React\.Component/g
      ],
      performance: [
        /React\.memo\(/g,
        /useMemo\(/g,
        /useCallback\(/g,
        /lazy\(/g
      ]
    });

    this.analysisPatterns.set('nextjs-patterns', {
      routing: [
        /app\/.*\/page\.(tsx?|jsx?)/,
        /app\/.*\/layout\.(tsx?|jsx?)/,
        /app\/.*\/route\.(tsx?|jsx?)/,
        /pages\/.*\.(tsx?|jsx?)/
      ],
      dataFetching: [
        /getServerSideProps/g,
        /getStaticProps/g,
        /generateStaticParams/g,
        /fetch\(/g
      ],
      optimization: [
        /next\/image/g,
        /next\/dynamic/g,
        /next\/font/g
      ]
    });

    this.analysisPatterns.set('typescript-patterns', {
      types: [
        /interface\s+\w+/g,
        /type\s+\w+\s*=/g,
        /enum\s+\w+/g
      ],
      generics: [
        /<[A-Z]\w*>/g,
        /extends\s+\w+/g
      ],
      decorators: [
        /@\w+/g
      ]
    });

    this.analysisPatterns.set('security-patterns', {
      vulnerabilities: [
        /eval\(/g,
        /innerHTML/g,
        /dangerouslySetInnerHTML/g,
        /process\.env/g
      ],
      authentication: [
        /jwt/gi,
        /token/gi,
        /auth/gi,
        /session/gi
      ]
    });
  }

  private loadFileTypeHandlers() {
    this.fileTypeHandlers.set('.ts', {
      language: 'typescript',
      parser: 'typescript',
      analyzer: this.analyzeTypeScript.bind(this)
    });

    this.fileTypeHandlers.set('.tsx', {
      language: 'typescriptreact',
      parser: 'typescript',
      analyzer: this.analyzeTypeScript.bind(this)
    });

    this.fileTypeHandlers.set('.js', {
      language: 'javascript',
      parser: 'babel',
      analyzer: this.analyzeJavaScript.bind(this)
    });

    this.fileTypeHandlers.set('.jsx', {
      language: 'javascriptreact',
      parser: 'babel',
      analyzer: this.analyzeJavaScript.bind(this)
    });

    this.fileTypeHandlers.set('.css', {
      language: 'css',
      parser: 'css',
      analyzer: this.analyzeCSS.bind(this)
    });

    this.fileTypeHandlers.set('.json', {
      language: 'json',
      parser: 'json',
      analyzer: this.analyzeJSON.bind(this)
    });
  }

  private loadQualityMetrics() {
    this.qualityMetrics.set('complexity', {
      low: { score: 1, maxLines: 50, maxDepth: 3 },
      medium: { score: 2, maxLines: 100, maxDepth: 5 },
      high: { score: 3, maxLines: 200, maxDepth: 7 },
      veryHigh: { score: 4, maxLines: Infinity, maxDepth: Infinity }
    });

    this.qualityMetrics.set('maintainability', {
      excellent: { minScore: 90, color: 'green' },
      good: { minScore: 70, color: 'yellow' },
      fair: { minScore: 50, color: 'orange' },
      poor: { minScore: 0, color: 'red' }
    });

    this.qualityMetrics.set('testCoverage', {
      excellent: { minPercent: 90 },
      good: { minPercent: 70 },
      fair: { minPercent: 50 },
      poor: { minPercent: 0 }
    });
  }

  public async execute(task: ResearchTask): Promise<any> {
    this.emit('progress', { stage: 'analyzing', task: task.description });

    const result: CodeAnalysisResult = {
      files: [],
      patterns: [],
      dependencies: {},
      suggestions: [],
      issues: []
    };

    try {
      // Analyze codebase structure
      const codebaseInfo = await this.analyzeCodebase(task);
      result.files = codebaseInfo.files;
      
      // Identify patterns
      result.patterns = this.identifyPatterns(codebaseInfo);
      
      // Analyze dependencies
      result.dependencies = await this.analyzeDependencies();
      
      // Generate suggestions
      result.suggestions = this.generateSuggestions(task, codebaseInfo);
      
      // Identify issues
      result.issues = this.identifyIssues(codebaseInfo);
      
      // Add summary
      const summary = this.createAnalysisSummary(result);

      this.emit('progress', { stage: 'completed', result });
      
      return {
        ...result,
        summary,
        confidence: 0.91
      };
    } catch (error) {
      this.emit('error', error);
      throw error;
    }
  }

  private async analyzeCodebase(task: ResearchTask): Promise<any> {
    const codebaseInfo = {
      files: [] as any[],
      structure: {} as any,
      metrics: {} as any
    };

    // Analyze project structure
    const projectRoot = process.cwd();
    
    // Read package.json for dependencies
    try {
      const packageJsonPath = path.join(projectRoot, 'package.json');
      const packageJson = await this.readJSON(packageJsonPath);
      
      codebaseInfo.structure = {
        name: packageJson.name,
        version: packageJson.version,
        scripts: Object.keys(packageJson.scripts || {}),
        dependencies: Object.keys(packageJson.dependencies || {}),
        devDependencies: Object.keys(packageJson.devDependencies || {})
      };
    } catch (error) {
      // Package.json not found or invalid
    }

    // Analyze common directories
    const directories = ['src', 'app', 'pages', 'components', 'lib', 'utils'];
    
    for (const dir of directories) {
      const dirPath = path.join(projectRoot, dir);
      try {
        const files = await this.analyzeDirectory(dirPath);
        codebaseInfo.files.push(...files);
      } catch (error) {
        // Directory doesn't exist
      }
    }

    // Calculate metrics
    codebaseInfo.metrics = this.calculateMetrics(codebaseInfo.files);

    return codebaseInfo;
  }

  private async analyzeDirectory(dirPath: string): Promise<any[]> {
    const files: any[] = [];
    
    try {
      const entries = await fs.readdir(dirPath, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        
        if (entry.isDirectory() && !entry.name.startsWith('.') && entry.name !== 'node_modules') {
          // Recursively analyze subdirectories
          const subFiles = await this.analyzeDirectory(fullPath);
          files.push(...subFiles);
        } else if (entry.isFile()) {
          const ext = path.extname(entry.name);
          const handler = this.fileTypeHandlers.get(ext);
          
          if (handler) {
            const stats = await fs.stat(fullPath);
            files.push({
              path: fullPath.replace(process.cwd(), ''),
              type: handler.language,
              size: stats.size,
              complexity: await this.calculateFileComplexity(fullPath)
            });
          }
        }
      }
    } catch (error) {
      // Directory read error
    }
    
    return files;
  }

  private async calculateFileComplexity(filePath: string): Promise<number> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const lines = content.split('\n').length;
      const depth = this.calculateNestingDepth(content);
      
      const complexityMetrics = this.qualityMetrics.get('complexity');
      
      if (lines <= complexityMetrics.low.maxLines && depth <= complexityMetrics.low.maxDepth) {
        return complexityMetrics.low.score;
      } else if (lines <= complexityMetrics.medium.maxLines && depth <= complexityMetrics.medium.maxDepth) {
        return complexityMetrics.medium.score;
      } else if (lines <= complexityMetrics.high.maxLines && depth <= complexityMetrics.high.maxDepth) {
        return complexityMetrics.high.score;
      } else {
        return complexityMetrics.veryHigh.score;
      }
    } catch (error) {
      return 0;
    }
  }

  private calculateNestingDepth(content: string): number {
    let maxDepth = 0;
    let currentDepth = 0;
    
    for (const char of content) {
      if (char === '{' || char === '[' || char === '(') {
        currentDepth++;
        maxDepth = Math.max(maxDepth, currentDepth);
      } else if (char === '}' || char === ']' || char === ')') {
        currentDepth = Math.max(0, currentDepth - 1);
      }
    }
    
    return maxDepth;
  }

  private identifyPatterns(codebaseInfo: any): string[] {
    const patterns: Set<string> = new Set();

    // Check for React patterns
    if (codebaseInfo.structure?.dependencies?.includes('react')) {
      patterns.add('React-based application');
      patterns.add('Component-based architecture');
    }

    // Check for Next.js patterns
    if (codebaseInfo.structure?.dependencies?.includes('next')) {
      patterns.add('Next.js framework');
      if (codebaseInfo.files.some((f: any) => f.path.includes('/app/'))) {
        patterns.add('App Router architecture');
      } else if (codebaseInfo.files.some((f: any) => f.path.includes('/pages/'))) {
        patterns.add('Pages Router architecture');
      }
    }

    // Check for TypeScript
    if (codebaseInfo.files.some((f: any) => f.type === 'typescript' || f.type === 'typescriptreact')) {
      patterns.add('TypeScript for type safety');
    }

    // Check for testing
    if (codebaseInfo.structure?.devDependencies?.some((dep: string) => 
      dep.includes('jest') || dep.includes('vitest') || dep.includes('playwright'))) {
      patterns.add('Testing infrastructure present');
    }

    // Check for database
    if (codebaseInfo.structure?.dependencies?.includes('prisma')) {
      patterns.add('Prisma ORM for database');
    }

    // Check for styling
    if (codebaseInfo.structure?.dependencies?.includes('tailwindcss')) {
      patterns.add('Tailwind CSS for styling');
    }

    return Array.from(patterns);
  }

  private async analyzeDependencies(): Promise<Record<string, string>> {
    const dependencies: Record<string, string> = {};

    try {
      const packageJsonPath = path.join(process.cwd(), 'package.json');
      const packageJson = await this.readJSON(packageJsonPath);
      
      // Combine dependencies and devDependencies
      Object.assign(dependencies, packageJson.dependencies || {});
      Object.assign(dependencies, packageJson.devDependencies || {});
    } catch (error) {
      // Unable to read package.json
    }

    return dependencies;
  }

  private generateSuggestions(task: ResearchTask, codebaseInfo: any): string[] {
    const suggestions: string[] = [];

    // Performance suggestions
    const avgComplexity = this.calculateAverageComplexity(codebaseInfo.files);
    if (avgComplexity > 2.5) {
      suggestions.push('Consider refactoring complex files to improve maintainability');
    }

    // TypeScript suggestions
    if (!codebaseInfo.files.some((f: any) => f.type === 'typescript' || f.type === 'typescriptreact')) {
      suggestions.push('Consider migrating to TypeScript for better type safety');
    }

    // Testing suggestions
    if (!codebaseInfo.structure?.devDependencies?.some((dep: string) => 
      dep.includes('jest') || dep.includes('vitest'))) {
      suggestions.push('Add unit testing framework for better code reliability');
    }

    // Code organization suggestions
    if (codebaseInfo.files.length > 100) {
      suggestions.push('Consider implementing a modular architecture for better organization');
    }

    // Security suggestions
    suggestions.push('Regularly update dependencies to patch security vulnerabilities');
    suggestions.push('Implement proper error boundaries for React components');

    // Task-specific suggestions
    if (task.description.includes('performance')) {
      suggestions.push('Implement code splitting for better load times');
      suggestions.push('Use React.memo and useMemo for expensive computations');
    }

    if (task.description.includes('accessibility')) {
      suggestions.push('Add proper ARIA labels and roles');
      suggestions.push('Ensure keyboard navigation support');
    }

    return suggestions.slice(0, 6);
  }

  private identifyIssues(codebaseInfo: any): any[] {
    const issues: any[] = [];

    // Check for large files
    codebaseInfo.files.forEach((file: any) => {
      if (file.size > 50000) { // > 50KB
        issues.push({
          severity: 'medium',
          type: 'performance',
          message: `Large file detected: ${file.path}`,
          file: file.path
        });
      }

      if (file.complexity >= 4) {
        issues.push({
          severity: 'high',
          type: 'maintainability',
          message: `High complexity in: ${file.path}`,
          file: file.path
        });
      }
    });

    // Check for missing TypeScript
    if (codebaseInfo.files.some((f: any) => f.type === 'javascript' || f.type === 'javascriptreact')) {
      issues.push({
        severity: 'low',
        type: 'type-safety',
        message: 'JavaScript files detected - consider TypeScript migration'
      });
    }

    return issues;
  }

  private calculateMetrics(files: any[]): any {
    const totalFiles = files.length;
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    const avgSize = totalFiles > 0 ? totalSize / totalFiles : 0;
    const avgComplexity = this.calculateAverageComplexity(files);

    const typeDistribution: Record<string, number> = {};
    files.forEach(file => {
      typeDistribution[file.type] = (typeDistribution[file.type] || 0) + 1;
    });

    return {
      totalFiles,
      totalSize,
      avgSize,
      avgComplexity,
      typeDistribution
    };
  }

  private calculateAverageComplexity(files: any[]): number {
    if (files.length === 0) return 0;
    const totalComplexity = files.reduce((sum, file) => sum + (file.complexity || 0), 0);
    return totalComplexity / files.length;
  }

  private createAnalysisSummary(result: CodeAnalysisResult): string {
    const fileCount = result.files.length;
    const patternCount = result.patterns.length;
    const issueCount = result.issues?.length || 0;
    const highSeverityIssues = result.issues?.filter(i => i.severity === 'high').length || 0;
    
    return `Analyzed ${fileCount} files and identified ${patternCount} architectural patterns. ` +
           `Found ${issueCount} issues (${highSeverityIssues} high severity). ` +
           `Generated ${result.suggestions.length} improvement suggestions.`;
  }

  // File type specific analyzers
  private async analyzeTypeScript(filePath: string): Promise<any> {
    const content = await fs.readFile(filePath, 'utf-8');
    const patterns = this.analysisPatterns.get('typescript-patterns');
    
    return {
      interfaces: (content.match(patterns.types[0]) || []).length,
      types: (content.match(patterns.types[1]) || []).length,
      generics: (content.match(patterns.generics[0]) || []).length
    };
  }

  private async analyzeJavaScript(filePath: string): Promise<any> {
    const content = await fs.readFile(filePath, 'utf-8');
    const patterns = this.analysisPatterns.get('react-patterns');
    
    return {
      components: (content.match(patterns.components[0]) || []).length,
      hooks: (content.match(patterns.hooks[0]) || []).length
    };
  }

  private async analyzeCSS(filePath: string): Promise<any> {
    const content = await fs.readFile(filePath, 'utf-8');
    const lines = content.split('\n').length;
    
    return {
      lines,
      selectors: (content.match(/[.#][\w-]+/g) || []).length
    };
  }

  private async analyzeJSON(filePath: string): Promise<any> {
    try {
      const content = await fs.readFile(filePath, 'utf-8');
      const json = JSON.parse(content);
      return {
        keys: Object.keys(json).length,
        valid: true
      };
    } catch (error) {
      return {
        valid: false,
        error: 'Invalid JSON'
      };
    }
  }

  private async readJSON(filePath: string): Promise<any> {
    const content = await fs.readFile(filePath, 'utf-8');
    return JSON.parse(content);
  }

  public isReady(): boolean {
    return this.analysisPatterns.size > 0;
  }

  public getAnalysisPattern(name: string): any {
    return this.analysisPatterns.get(name);
  }

  public getQualityMetric(name: string): any {
    return this.qualityMetrics.get(name);
  }
}
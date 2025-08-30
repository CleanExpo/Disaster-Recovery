import { EventEmitter } from 'events';
import type { ResearchTask, DocumentationSource } from './types';

export class DocumentationAgent extends EventEmitter {
  private documentationSources: Map<string, DocumentationSource>;
  private searchPatterns: Map<string, string[]>;
  private apiEndpoints: Map<string, string>;

  constructor() {
    super();
    this.documentationSources = new Map();
    this.searchPatterns = new Map();
    this.apiEndpoints = new Map();
    this.initializeDocumentation();
  }

  private initializeDocumentation() {
    this.loadDocumentationSources();
    this.loadSearchPatterns();
    this.loadAPIEndpoints();
  }

  private loadDocumentationSources() {
    const sources: DocumentationSource[] = [
      {
        name: 'Next.js Documentation',
        url: 'https://nextjs.org/docs',
        type: 'official',
        relevance: 0.95,
        lastUpdated: '2024-01'
      },
      {
        name: 'React Documentation',
        url: 'https://react.dev',
        type: 'official',
        relevance: 0.93,
        lastUpdated: '2024-01'
      },
      {
        name: 'Tailwind CSS',
        url: 'https://tailwindcss.com/docs',
        type: 'official',
        relevance: 0.90,
        lastUpdated: '2024-01'
      },
      {
        name: 'shadcn/ui',
        url: 'https://ui.shadcn.com',
        type: 'community',
        relevance: 0.92,
        lastUpdated: '2024-01'
      },
      {
        name: 'Radix UI',
        url: 'https://www.radix-ui.com/docs',
        type: 'official',
        relevance: 0.88,
        lastUpdated: '2024-01'
      },
      {
        name: 'Prisma',
        url: 'https://www.prisma.io/docs',
        type: 'official',
        relevance: 0.87,
        lastUpdated: '2024-01'
      },
      {
        name: 'TypeScript',
        url: 'https://www.typescriptlang.org/docs',
        type: 'official',
        relevance: 0.91,
        lastUpdated: '2024-01'
      },
      {
        name: 'MDN Web Docs',
        url: 'https://developer.mozilla.org',
        type: 'official',
        relevance: 0.89,
        lastUpdated: '2024-01'
      },
      {
        name: 'Browserbase MCP',
        url: 'https://github.com/browserbase/mcp-server-browserbase',
        type: 'official',
        relevance: 0.85,
        lastUpdated: '2024-01'
      },
      {
        name: 'Stagehand',
        url: 'https://github.com/browserbase/stagehand',
        type: 'official',
        relevance: 0.84,
        lastUpdated: '2024-01'
      }
    ];

    sources.forEach(source => {
      this.documentationSources.set(source.name.toLowerCase(), source);
    });
  }

  private loadSearchPatterns() {
    this.searchPatterns.set('component', [
      'component',
      'props',
      'usage',
      'example',
      'api',
      'reference'
    ]);

    this.searchPatterns.set('hook', [
      'hook',
      'useState',
      'useEffect',
      'custom hook',
      'lifecycle'
    ]);

    this.searchPatterns.set('routing', [
      'routing',
      'navigation',
      'pages',
      'app router',
      'dynamic routes'
    ]);

    this.searchPatterns.set('styling', [
      'css',
      'styling',
      'tailwind',
      'theme',
      'responsive',
      'dark mode'
    ]);

    this.searchPatterns.set('data', [
      'fetching',
      'api',
      'database',
      'prisma',
      'query',
      'mutation'
    ]);

    this.searchPatterns.set('deployment', [
      'deploy',
      'vercel',
      'production',
      'environment',
      'build'
    ]);
  }

  private loadAPIEndpoints() {
    this.apiEndpoints.set('npm', 'https://registry.npmjs.org');
    this.apiEndpoints.set('github', 'https://api.github.com');
    this.apiEndpoints.set('bundlephobia', 'https://bundlephobia.com/api');
  }

  public async execute(task: ResearchTask): Promise<any> {
    this.emit('progress', { stage: 'searching', task: task.description });

    const result = {
      summary: '',
      sources: [] as DocumentationSource[],
      content: {} as any,
      examples: [] as string[],
      apiReference: {} as any,
      recommendations: [] as string[],
      confidence: 0.88
    };

    try {
      // Identify relevant documentation sources
      const relevantSources = this.identifyRelevantSources(task);
      result.sources = relevantSources;

      // Search for relevant content
      result.content = this.searchDocumentation(task, relevantSources);

      // Extract code examples
      result.examples = this.extractExamples(task, result.content);

      // Generate API reference
      result.apiReference = this.generateAPIReference(task, result.content);

      // Provide recommendations
      result.recommendations = this.generateDocumentationRecommendations(task, result);

      // Create summary
      result.summary = this.createDocumentationSummary(result);

      this.emit('progress', { stage: 'completed', result });
    } catch (error) {
      this.emit('error', error);
      throw error;
    }

    return result;
  }

  private identifyRelevantSources(task: ResearchTask): DocumentationSource[] {
    const relevant: DocumentationSource[] = [];
    const keywords = task.description.toLowerCase().split(' ');

    for (const [name, source] of this.documentationSources) {
      const relevanceScore = this.calculateSourceRelevance(source, keywords, task);
      if (relevanceScore > 0.3) {
        relevant.push({ ...source, relevance: relevanceScore });
      }
    }

    // Sort by relevance
    return relevant.sort((a, b) => b.relevance - a.relevance).slice(0, 5);
  }

  private calculateSourceRelevance(
    source: DocumentationSource,
    keywords: string[],
    task: ResearchTask
  ): number {
    let score = source.relevance;

    // Check name match
    const sourceName = source.name.toLowerCase();
    for (const keyword of keywords) {
      if (sourceName.includes(keyword)) {
        score += 0.2;
      }
    }

    // Boost official sources for implementation tasks
    if (task.type === 'implementation' && source.type === 'official') {
      score += 0.1;
    }

    // Boost community sources for examples
    if (task.type === 'design' && source.type === 'community') {
      score += 0.05;
    }

    return Math.min(score, 1);
  }

  private searchDocumentation(
    task: ResearchTask,
    sources: DocumentationSource[]
  ): any {
    const content = {
      concepts: [] as any[],
      apis: [] as any[],
      guides: [] as any[],
      troubleshooting: [] as any[]
    };

    // Identify search patterns
    const patterns = this.identifySearchPatterns(task.description);

    // Simulate documentation search
    for (const source of sources) {
      for (const pattern of patterns) {
        // Add relevant content based on pattern
        if (pattern === 'component') {
          content.concepts.push({
            source: source.name,
            topic: 'Component Architecture',
            content: 'React component patterns and best practices'
          });
        } else if (pattern === 'routing') {
          content.guides.push({
            source: source.name,
            topic: 'Routing Guide',
            content: 'Next.js App Router navigation patterns'
          });
        } else if (pattern === 'data') {
          content.apis.push({
            source: source.name,
            topic: 'Data Fetching',
            content: 'Server Components and Client Components data patterns'
          });
        }
      }
    }

    return content;
  }

  private identifySearchPatterns(description: string): string[] {
    const patterns: string[] = [];
    const descLower = description.toLowerCase();

    for (const [category, keywords] of this.searchPatterns) {
      if (keywords.some(keyword => descLower.includes(keyword))) {
        patterns.push(category);
      }
    }

    return patterns.length > 0 ? patterns : ['general'];
  }

  private extractExamples(task: ResearchTask, content: any): string[] {
    const examples: string[] = [];

    // Generate relevant code examples based on task
    if (task.description.includes('component')) {
      examples.push(`// React Component Example
import { useState } from 'react';

export function ExampleComponent() {
  const [count, setCount] = useState(0);
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}`);
    }

    if (task.description.includes('api') || task.description.includes('route')) {
      examples.push(`// Next.js API Route Example
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const data = await fetchData();
  return NextResponse.json(data);
}

export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = await createItem(body);
  return NextResponse.json(result, { status: 201 });
}`);
    }

    if (task.description.includes('database') || task.description.includes('prisma')) {
      examples.push(`// Prisma Database Query Example
import { prisma } from '@/lib/prisma';

export async function getUsers() {
  const users = await prisma.user.findMany({
    where: { active: true },
    include: { posts: true },
    orderBy: { createdAt: 'desc' }
  });
  return users;
}`);
    }

    return examples;
  }

  private generateAPIReference(task: ResearchTask, content: any): any {
    const apiRef = {
      methods: [] as any[],
      props: [] as any[],
      types: [] as any[],
      hooks: [] as any[]
    };

    // Generate API reference based on task context
    if (task.description.includes('hook')) {
      apiRef.hooks = [
        {
          name: 'useState',
          signature: 'const [state, setState] = useState<T>(initialValue: T)',
          description: 'React state hook for managing component state'
        },
        {
          name: 'useEffect',
          signature: 'useEffect(() => { /* effect */ }, [dependencies])',
          description: 'React effect hook for side effects'
        }
      ];
    }

    if (task.description.includes('component')) {
      apiRef.props = [
        {
          name: 'className',
          type: 'string',
          description: 'CSS class names for styling'
        },
        {
          name: 'children',
          type: 'React.ReactNode',
          description: 'Child elements to render'
        }
      ];
    }

    return apiRef;
  }

  private generateDocumentationRecommendations(
    task: ResearchTask,
    result: any
  ): string[] {
    const recommendations: string[] = [];

    // Source-based recommendations
    if (result.sources.length > 0) {
      recommendations.push(
        `Refer to ${result.sources[0].name} for authoritative guidance`
      );
    }

    // Pattern-based recommendations
    if (task.description.includes('performance')) {
      recommendations.push('Review React performance optimization documentation');
      recommendations.push('Check Next.js production optimization guide');
    }

    if (task.description.includes('security')) {
      recommendations.push('Consult OWASP security best practices');
      recommendations.push('Review Next.js security headers documentation');
    }

    // General recommendations
    recommendations.push('Keep documentation references bookmarked for quick access');
    recommendations.push('Join community forums for additional support');
    recommendations.push('Subscribe to release notes for framework updates');

    return recommendations.slice(0, 5);
  }

  private createDocumentationSummary(result: any): string {
    const sourceNames = result.sources.map((s: DocumentationSource) => s.name).join(', ');
    const exampleCount = result.examples.length;
    const conceptCount = result.content.concepts?.length || 0;
    
    return `Found ${result.sources.length} relevant documentation sources (${sourceNames}). ` +
           `Extracted ${exampleCount} code examples and ${conceptCount} key concepts. ` +
           `Generated API reference with ${Object.keys(result.apiReference).length} sections.`;
  }

  public isReady(): boolean {
    return this.documentationSources.size > 0;
  }

  public getDocumentationSource(name: string): DocumentationSource | undefined {
    return this.documentationSources.get(name.toLowerCase());
  }

  public getAllSources(): DocumentationSource[] {
    return Array.from(this.documentationSources.values());
  }

  public getSearchPatterns(category: string): string[] {
    return this.searchPatterns.get(category) || [];
  }
}
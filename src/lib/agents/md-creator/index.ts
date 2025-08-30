import { EventEmitter } from 'events';
import { promises as fs } from 'fs';
import path from 'path';

interface MDSection {
  title: string;
  level: number;
  content: string;
  subsections?: MDSection[];
}

interface AgentDocumentation {
  name: string;
  emoji: string;
  mission: string;
  capabilities: string[];
  integrations: string[];
  metrics: Record<string, any>;
  configuration: Record<string, any>;
  examples?: string[];
}

export class MDCreatorAgent extends EventEmitter {
  private templates: Map<string, string>;
  private styleGuide: Record<string, any>;

  constructor() {
    super();
    this.templates = new Map();
    this.styleGuide = {
      headingStyle: 'atx', // # style headings
      codeBlockStyle: 'fenced', // ``` style
      listStyle: 'dash', // - for unordered lists
      tableAlignment: 'left',
      lineLength: 80,
      language: 'en-AU'
    };
    this.loadTemplates();
  }

  private loadTemplates() {
    // Agent documentation template
    this.templates.set('agent', `# {emoji} {name}

## Mission Statement
{mission}

## Core Capabilities
{capabilities}

## Integration Points
{integrations}

## Performance Metrics
{metrics}

## Configuration
{configuration}

## Examples
{examples}

---
*Agent Version: {version}*
*Last Updated: {date}*
*Status: {status}*`);

    // PRD template
    this.templates.set('prd', `# Product Requirements Document: {title}

## Executive Summary
{summary}

## Objectives
{objectives}

## User Stories
{userStories}

## Functional Requirements
{functionalReqs}

## Non-Functional Requirements
{nonFunctionalReqs}

## Technical Architecture
{architecture}

## Success Metrics
{metrics}

## Timeline
{timeline}

## Risks & Mitigation
{risks}`);

    // API documentation template
    this.templates.set('api', `# API Documentation: {endpoint}

## Endpoint
\`{method} {path}\`

## Description
{description}

## Authentication
{auth}

## Request
{request}

## Response
{response}

## Examples
{examples}

## Error Codes
{errors}`);
  }

  public async createAgentDocumentation(agent: AgentDocumentation): Promise<string> {
    const template = this.templates.get('agent') || '';
    
    const doc = template
      .replace('{emoji}', agent.emoji)
      .replace('{name}', agent.name)
      .replace('{mission}', agent.mission)
      .replace('{capabilities}', this.formatList(agent.capabilities))
      .replace('{integrations}', this.formatList(agent.integrations))
      .replace('{metrics}', this.formatCodeBlock(agent.metrics, 'yaml'))
      .replace('{configuration}', this.formatCodeBlock(agent.configuration, 'yaml'))
      .replace('{examples}', agent.examples ? this.formatExamples(agent.examples) : 'No examples available')
      .replace('{version}', '1.0.0')
      .replace('{date}', new Date().toISOString().split('T')[0])
      .replace('{status}', 'ACTIVE');

    return this.applyStyleGuide(doc);
  }

  public async generatePRD(projectData: any): Promise<string> {
    const sections: MDSection[] = [
      {
        title: 'Product Requirements Document: Disaster Recovery Platform',
        level: 1,
        content: ''
      },
      {
        title: 'Executive Summary',
        level: 2,
        content: `The Disaster Recovery Platform is a comprehensive, AI-driven system designed to dominate the Australian disaster recovery market through SEO monopolization and autonomous operations. The platform connects insurance claims with contractors nationwide while maintaining zero human intervention from NRP.`
      },
      {
        title: 'Business Model',
        level: 2,
        content: '',
        subsections: [
          {
            title: 'Value Proposition',
            level: 3,
            content: `- **National Coverage**: Every location in Australia, from Sydney to Coober Pedy
- **Complete Automation**: 100% AI-driven operations with zero phone support
- **SEO Domination**: Lock out all competitors through keyword saturation
- **Scale**: From single rooms to 80-floor buildings, all disaster types`
          },
          {
            title: 'Revenue Model',
            level: 3,
            content: `- Lead distribution fees from contractors
- Territory exclusivity premiums
- Performance-based pricing tiers
- Automated billing with zero manual processing`
          }
        ]
      },
      {
        title: 'Functional Requirements',
        level: 2,
        content: '',
        subsections: [
          {
            title: 'Contractor Management',
            level: 3,
            content: `- Self-service contractor portal
- Automatic service area mapping
- Lead distribution algorithm
- Performance tracking system`
          },
          {
            title: 'SEO System',
            level: 3,
            content: `- Auto-generation of location pages
- Service-specific landing pages
- Schema markup automation
- Content velocity engine`
          },
          {
            title: 'AI Bot System',
            level: 3,
            content: `- 24/7 customer interaction
- Intelligent lead qualification
- Automated claim routing
- No human fallback required`
          }
        ]
      },
      {
        title: 'Technical Architecture',
        level: 2,
        content: `\`\`\`mermaid
graph TD
    A[Customer] -->|Interacts| B[AI Bot]
    B -->|Qualifies| C[Lead System]
    C -->|Routes| D[Contractor CRM]
    D -->|Updates| E[SEO Engine]
    E -->|Generates| F[Location Pages]
    F -->|Ranks| G[Search Results]
    G -->|Attracts| A
\`\`\``
      },
      {
        title: 'Success Metrics',
        level: 2,
        content: `- **Market Coverage**: 100% of Australian locations
- **SEO Rankings**: Page 1 for all target keywords
- **Automation Rate**: 100% of processes
- **Human Intervention**: 0%
- **Contractor Satisfaction**: > 90%
- **System Uptime**: > 99.9%`
      }
    ];

    return this.buildMarkdown(sections);
  }

  private formatList(items: string[], ordered: boolean = false): string {
    if (ordered) {
      return items.map((item, index) => `${index + 1}. ${item}`).join('\n');
    }
    return items.map(item => `- ${item}`).join('\n');
  }

  private formatCodeBlock(content: any, language: string = 'typescript'): string {
    const formatted = typeof content === 'string' 
      ? content 
      : JSON.stringify(content, null, 2);
    
    return `\`\`\`${language}\n${formatted}\n\`\`\``;
  }

  private formatExamples(examples: string[]): string {
    return examples.map((example, index) => 
      `### Example ${index + 1}\n${this.formatCodeBlock(example)}`
    ).join('\n\n');
  }

  private formatTable(headers: string[], rows: string[][]): string {
    const headerRow = `| ${headers.join(' | ')} |`;
    const separator = `| ${headers.map(() => '---').join(' | ')} |`;
    const dataRows = rows.map(row => `| ${row.join(' | ')} |`).join('\n');
    
    return `${headerRow}\n${separator}\n${dataRows}`;
  }

  private buildMarkdown(sections: MDSection[], parentLevel: number = 0): string {
    let markdown = '';
    
    for (const section of sections) {
      const heading = '#'.repeat(section.level) + ' ' + section.title;
      markdown += heading + '\n\n';
      
      if (section.content) {
        markdown += section.content + '\n\n';
      }
      
      if (section.subsections) {
        markdown += this.buildMarkdown(section.subsections, section.level);
      }
    }
    
    return markdown;
  }

  private applyStyleGuide(content: string): string {
    // Apply consistent formatting
    let formatted = content;
    
    // Ensure consistent line breaks
    formatted = formatted.replace(/\n{3,}/g, '\n\n');
    
    // Ensure spaces after list markers
    formatted = formatted.replace(/^-([^ ])/gm, '- $1');
    formatted = formatted.replace(/^\*([^ ])/gm, '* $1');
    
    // Ensure blank lines around code blocks
    formatted = formatted.replace(/([^\n])\n```/g, '$1\n\n```');
    formatted = formatted.replace(/```\n([^\n])/g, '```\n\n$1');
    
    return formatted;
  }

  public async saveDocument(filePath: string, content: string): Promise<void> {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(filePath, content, 'utf-8');
    this.emit('document-saved', { path: filePath });
  }

  public async generateAllAgentDocs(): Promise<void> {
    const agents = [
      {
        name: 'Code Architect Agent',
        emoji: '🏗️',
        mission: 'Design and maintain robust, scalable code architecture',
        capabilities: [
          'Architecture pattern analysis',
          'Code structure optimization',
          'Dependency management',
          'Refactoring recommendations',
          'Design pattern implementation'
        ],
        integrations: [
          'Git version control',
          'CI/CD pipelines',
          'Code review systems',
          'IDE extensions'
        ],
        metrics: {
          code_quality: 'Maintainability index > 80',
          complexity: 'Cyclomatic complexity < 10',
          coverage: 'Test coverage > 90%',
          duplication: 'Code duplication < 3%'
        },
        configuration: {
          analysis_depth: 'comprehensive',
          auto_refactor: true,
          pattern_detection: true,
          performance_analysis: true
        }
      },
      {
        name: 'UI/UX Designer Agent',
        emoji: '🎨',
        mission: 'Create intuitive, accessible, and beautiful user interfaces',
        capabilities: [
          'Component design generation',
          'Responsive layout creation',
          'Accessibility compliance',
          'Design system management',
          'User flow optimization'
        ],
        integrations: [
          'Figma API',
          'Component libraries',
          'Design tokens',
          'A11y testing tools'
        ],
        metrics: {
          accessibility: 'WCAG 2.1 AA compliance',
          performance: 'Lighthouse score > 90',
          consistency: 'Design token usage > 95%',
          responsiveness: 'All breakpoints covered'
        },
        configuration: {
          design_system: 'shadcn-ui',
          color_mode: 'light_and_dark',
          animation: 'subtle',
          grid_system: '12_column'
        }
      },
      {
        name: 'Quality Guardian Agent',
        emoji: '🛡️',
        mission: 'Ensure highest quality standards across all systems',
        capabilities: [
          'Automated testing',
          'Code quality analysis',
          'Performance monitoring',
          'Security scanning',
          'Bug detection'
        ],
        integrations: [
          'Jest/Vitest',
          'Playwright',
          'ESLint/Prettier',
          'SonarQube'
        ],
        metrics: {
          test_coverage: '> 90%',
          bug_detection: '< 24 hours',
          false_positives: '< 5%',
          scan_time: '< 5 minutes'
        },
        configuration: {
          test_strategy: 'comprehensive',
          quality_gates: true,
          auto_fix: true,
          continuous_monitoring: true
        }
      }
    ];

    for (const agent of agents) {
      const doc = await this.createAgentDocumentation(agent);
      const fileName = agent.name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '.md';
      await this.saveDocument(path.join('agents', fileName), doc);
    }
  }
}

export default MDCreatorAgent;
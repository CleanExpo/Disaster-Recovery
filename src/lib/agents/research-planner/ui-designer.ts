import { EventEmitter } from 'events';
import type { ResearchTask, UIDesignPattern } from './types';

export class UIDesignerAgent extends EventEmitter {
  private designPatterns: Map<string, UIDesignPattern>;
  private colorSchemes: Map<string, any>;
  private layoutSystems: Map<string, any>;
  private responsiveBreakpoints: Map<string, string>;

  constructor() {
    super();
    this.designPatterns = new Map();
    this.colorSchemes = new Map();
    this.layoutSystems = new Map();
    this.responsiveBreakpoints = new Map();
    this.initializeDesignKnowledge();
  }

  private initializeDesignKnowledge() {
    this.loadDesignPatterns();
    this.loadColorSchemes();
    this.loadLayoutSystems();
    this.loadResponsiveBreakpoints();
  }

  private loadDesignPatterns() {
    const patterns: UIDesignPattern[] = [
      {
        name: 'Hero Section',
        type: 'layout',
        description: 'Prominent section at the top of a page with key messaging',
        implementation: `<section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
  <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
    <h1 className="text-5xl md:text-7xl font-bold mb-6">Main Heading</h1>
    <p className="text-xl md:text-2xl mb-8 text-muted-foreground">Supporting text</p>
    <div className="flex gap-4 justify-center">
      <Button size="lg">Primary Action</Button>
      <Button variant="outline" size="lg">Secondary Action</Button>
    </div>
  </div>
</section>`,
        bestPractices: [
          'Use contrasting colors for text over images',
          'Include clear call-to-action buttons',
          'Keep message concise and impactful',
          'Ensure mobile responsiveness',
          'Add subtle animations for engagement'
        ],
        antiPatterns: [
          'Avoid text walls in hero sections',
          'Don\'t use low-contrast text',
          'Avoid auto-playing videos with sound',
          'Don\'t make it too tall on mobile'
        ],
        examples: ['landing-page-hero', 'product-showcase-hero', 'app-hero']
      },
      {
        name: 'Card Grid',
        type: 'data-display',
        description: 'Grid layout for displaying multiple cards with consistent spacing',
        implementation: `<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
  {items.map((item) => (
    <Card key={item.id} className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle>{item.title}</CardTitle>
      </CardHeader>
      <CardContent>{item.content}</CardContent>
    </Card>
  ))}
</div>`,
        bestPractices: [
          'Maintain consistent card heights',
          'Use responsive grid columns',
          'Add hover effects for interactivity',
          'Ensure adequate spacing between cards',
          'Implement skeleton loading states'
        ],
        antiPatterns: [
          'Avoid inconsistent card sizes',
          'Don\'t overcrowd the grid',
          'Avoid too many columns on mobile'
        ],
        examples: ['product-grid', 'blog-grid', 'team-grid']
      },
      {
        name: 'Sidebar Navigation',
        type: 'navigation',
        description: 'Vertical navigation panel typically on the left side',
        implementation: `<aside className="w-64 h-screen bg-background border-r">
  <div className="p-6">
    <h2 className="text-2xl font-bold">Logo</h2>
  </div>
  <nav className="px-4">
    {navItems.map((item) => (
      <a
        key={item.id}
        href={item.href}
        className="flex items-center gap-3 px-4 py-2 rounded-lg hover:bg-accent transition-colors"
      >
        <item.icon className="h-5 w-5" />
        <span>{item.label}</span>
      </a>
    ))}
  </nav>
</aside>`,
        bestPractices: [
          'Include icons with labels',
          'Highlight active navigation item',
          'Group related items together',
          'Make it collapsible on mobile',
          'Add keyboard navigation support'
        ],
        antiPatterns: [
          'Avoid too many navigation levels',
          'Don\'t hide important actions',
          'Avoid fixed width on mobile'
        ],
        examples: ['dashboard-sidebar', 'docs-sidebar', 'app-sidebar']
      },
      {
        name: 'Modal Form',
        type: 'form',
        description: 'Form presented in a modal dialog for focused interaction',
        implementation: `<Dialog>
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle>Form Title</DialogTitle>
      <DialogDescription>Form description or instructions</DialogDescription>
    </DialogHeader>
    <form className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="field">Field Label</Label>
        <Input id="field" placeholder="Enter value" />
      </div>
      <DialogFooter>
        <Button type="button" variant="outline">Cancel</Button>
        <Button type="submit">Submit</Button>
      </DialogFooter>
    </form>
  </DialogContent>
</Dialog>`,
        bestPractices: [
          'Keep forms short and focused',
          'Provide clear labels and instructions',
          'Include validation feedback',
          'Add loading states for submission',
          'Ensure keyboard accessibility'
        ],
        antiPatterns: [
          'Avoid long forms in modals',
          'Don\'t auto-close without confirmation',
          'Avoid nested modals'
        ],
        examples: ['login-modal', 'contact-form-modal', 'settings-modal']
      },
      {
        name: 'Data Table',
        type: 'data-display',
        description: 'Structured display of tabular data with sorting and filtering',
        implementation: `<div className="rounded-lg border">
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead className="cursor-pointer hover:bg-accent">
          Name <ArrowUpDown className="ml-2 h-4 w-4 inline" />
        </TableHead>
        <TableHead>Status</TableHead>
        <TableHead>Actions</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((row) => (
        <TableRow key={row.id}>
          <TableCell>{row.name}</TableCell>
          <TableCell>
            <Badge variant={row.status}>{row.status}</Badge>
          </TableCell>
          <TableCell>
            <Button variant="ghost" size="sm">Edit</Button>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
</div>`,
        bestPractices: [
          'Include sorting indicators',
          'Add pagination for large datasets',
          'Provide search/filter options',
          'Use zebra striping for readability',
          'Make it responsive with horizontal scroll'
        ],
        antiPatterns: [
          'Avoid too many columns',
          'Don\'t hide important data',
          'Avoid inline editing without clear UI'
        ],
        examples: ['user-table', 'transaction-table', 'inventory-table']
      },
      {
        name: 'Toast Notification',
        type: 'feedback',
        description: 'Temporary message to provide feedback about an action',
        implementation: `toast({
  title: "Success!",
  description: "Your changes have been saved.",
  variant: "default", // or "destructive"
  duration: 5000,
  action: (
    <ToastAction altText="Undo">Undo</ToastAction>
  ),
})`,
        bestPractices: [
          'Position consistently (usually top-right)',
          'Auto-dismiss after appropriate time',
          'Use appropriate variant for message type',
          'Include undo actions when applicable',
          'Stack multiple toasts vertically'
        ],
        antiPatterns: [
          'Avoid blocking important UI',
          'Don\'t use for critical errors',
          'Avoid too many simultaneous toasts'
        ],
        examples: ['success-toast', 'error-toast', 'info-toast']
      }
    ];

    patterns.forEach(pattern => {
      this.designPatterns.set(pattern.name.toLowerCase(), pattern);
    });
  }

  private loadColorSchemes() {
    this.colorSchemes.set('modern-professional', {
      primary: '#0F172A',      // Slate-900
      secondary: '#3B82F6',    // Blue-500
      accent: '#10B981',       // Emerald-500
      background: '#FFFFFF',
      foreground: '#0F172A',
      muted: '#F1F5F9',        // Slate-100
      destructive: '#EF4444',  // Red-500
      warning: '#F59E0B',      // Amber-500
      success: '#10B981'       // Emerald-500
    });

    this.colorSchemes.set('disaster-recovery', {
      primary: '#DC2626',      // Red-600 - urgency
      secondary: '#0284C7',    // Sky-600 - trust
      accent: '#16A34A',       // Green-600 - recovery
      background: '#FAFAFA',
      foreground: '#18181B',
      muted: '#F4F4F5',
      destructive: '#B91C1C',
      warning: '#EA580C',
      success: '#15803D'
    });

    this.colorSchemes.set('dark-mode', {
      primary: '#3B82F6',
      secondary: '#8B5CF6',
      accent: '#10B981',
      background: '#09090B',
      foreground: '#FAFAFA',
      muted: '#27272A',
      destructive: '#F87171',
      warning: '#FCD34D',
      success: '#34D399'
    });
  }

  private loadLayoutSystems() {
    this.layoutSystems.set('grid-system', {
      container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
      grid: 'grid grid-cols-12 gap-4 md:gap-6 lg:gap-8',
      flexbox: 'flex flex-wrap -mx-4',
      columns: {
        full: 'col-span-12',
        half: 'col-span-12 md:col-span-6',
        third: 'col-span-12 md:col-span-4',
        quarter: 'col-span-12 md:col-span-6 lg:col-span-3',
        twoThirds: 'col-span-12 md:col-span-8',
        sidebar: 'col-span-12 lg:col-span-3',
        main: 'col-span-12 lg:col-span-9'
      }
    });

    this.layoutSystems.set('spacing-system', {
      section: 'py-16 md:py-24 lg:py-32',
      container: 'py-8 md:py-12',
      card: 'p-6 md:p-8',
      compact: 'p-4',
      none: 'p-0'
    });

    this.layoutSystems.set('typography-scale', {
      display: 'text-4xl md:text-5xl lg:text-6xl font-bold',
      h1: 'text-3xl md:text-4xl lg:text-5xl font-bold',
      h2: 'text-2xl md:text-3xl lg:text-4xl font-semibold',
      h3: 'text-xl md:text-2xl lg:text-3xl font-semibold',
      h4: 'text-lg md:text-xl lg:text-2xl font-medium',
      body: 'text-base',
      small: 'text-sm',
      tiny: 'text-xs'
    });
  }

  private loadResponsiveBreakpoints() {
    this.responsiveBreakpoints.set('sm', '640px');
    this.responsiveBreakpoints.set('md', '768px');
    this.responsiveBreakpoints.set('lg', '1024px');
    this.responsiveBreakpoints.set('xl', '1280px');
    this.responsiveBreakpoints.set('2xl', '1536px');
  }

  public async execute(task: ResearchTask): Promise<any> {
    this.emit('progress', { stage: 'analyzing', task: task.description });

    const result = {
      summary: '',
      designs: [] as any[],
      colorScheme: {} as any,
      layout: {} as any,
      recommendations: [] as string[],
      mockup: {} as any,
      confidence: 0.88
    };

    // Analyze task for design requirements
    const designRequirements = this.analyzeDesignRequirements(task);
    
    // Select appropriate design patterns
    result.designs = this.selectDesignPatterns(designRequirements);
    
    // Choose color scheme
    result.colorScheme = this.selectColorScheme(task);
    
    // Define layout system
    result.layout = this.defineLayoutSystem(designRequirements);
    
    // Generate mockup structure
    result.mockup = this.generateMockup(result.designs, result.layout);
    
    // Provide design recommendations
    result.recommendations = this.generateDesignRecommendations(task, result.designs);
    
    // Create summary
    result.summary = this.createDesignSummary(result);

    this.emit('progress', { stage: 'completed', result });
    return result;
  }

  private analyzeDesignRequirements(task: ResearchTask): any {
    const requirements = {
      type: 'general',
      complexity: 'medium',
      responsive: true,
      accessibility: true,
      animations: false,
      darkMode: false,
      components: [] as string[]
    };

    const description = task.description.toLowerCase();

    // Determine type
    if (description.includes('dashboard')) requirements.type = 'dashboard';
    else if (description.includes('landing')) requirements.type = 'landing';
    else if (description.includes('form')) requirements.type = 'form';
    else if (description.includes('table') || description.includes('data')) requirements.type = 'data';

    // Check for specific requirements
    if (description.includes('complex') || description.includes('advanced')) {
      requirements.complexity = 'high';
    } else if (description.includes('simple') || description.includes('basic')) {
      requirements.complexity = 'low';
    }

    if (description.includes('animation') || description.includes('motion')) {
      requirements.animations = true;
    }

    if (description.includes('dark')) {
      requirements.darkMode = true;
    }

    // Identify components needed
    const componentKeywords = ['hero', 'card', 'form', 'table', 'navigation', 'sidebar', 'modal'];
    requirements.components = componentKeywords.filter(keyword => 
      description.includes(keyword)
    );

    return requirements;
  }

  private selectDesignPatterns(requirements: any): UIDesignPattern[] {
    const patterns: UIDesignPattern[] = [];

    // Add patterns based on type
    switch (requirements.type) {
      case 'landing':
        patterns.push(this.designPatterns.get('hero section')!);
        patterns.push(this.designPatterns.get('card grid')!);
        break;
      case 'dashboard':
        patterns.push(this.designPatterns.get('sidebar navigation')!);
        patterns.push(this.designPatterns.get('data table')!);
        break;
      case 'form':
        patterns.push(this.designPatterns.get('modal form')!);
        break;
      case 'data':
        patterns.push(this.designPatterns.get('data table')!);
        patterns.push(this.designPatterns.get('card grid')!);
        break;
    }

    // Add toast notification for all interactive designs
    if (requirements.complexity !== 'low') {
      patterns.push(this.designPatterns.get('toast notification')!);
    }

    // Filter out null values
    return patterns.filter(p => p != null);
  }

  private selectColorScheme(task: ResearchTask): any {
    const description = task.description.toLowerCase();

    if (description.includes('disaster') || description.includes('recovery')) {
      return this.colorSchemes.get('disaster-recovery');
    } else if (description.includes('dark')) {
      return this.colorSchemes.get('dark-mode');
    } else {
      return this.colorSchemes.get('modern-professional');
    }
  }

  private defineLayoutSystem(requirements: any): any {
    const layout = {
      grid: this.layoutSystems.get('grid-system'),
      spacing: this.layoutSystems.get('spacing-system'),
      typography: this.layoutSystems.get('typography-scale'),
      breakpoints: Object.fromEntries(this.responsiveBreakpoints),
      structure: {} as any
    };

    // Define structure based on complexity
    if (requirements.complexity === 'high') {
      layout.structure = {
        type: 'multi-column',
        sidebar: true,
        header: true,
        footer: true,
        mainContent: 'flexible'
      };
    } else if (requirements.complexity === 'low') {
      layout.structure = {
        type: 'single-column',
        sidebar: false,
        header: true,
        footer: false,
        mainContent: 'centered'
      };
    } else {
      layout.structure = {
        type: 'responsive-grid',
        sidebar: requirements.type === 'dashboard',
        header: true,
        footer: true,
        mainContent: 'contained'
      };
    }

    return layout;
  }

  private generateMockup(designs: UIDesignPattern[], layout: any): any {
    const mockup = {
      structure: [] as any[],
      components: [] as any[],
      interactions: [] as any[]
    };

    // Build page structure
    if (layout.structure.header) {
      mockup.structure.push({
        type: 'header',
        className: 'sticky top-0 z-50 bg-background border-b',
        content: 'Navigation bar with logo and menu items'
      });
    }

    if (layout.structure.sidebar) {
      mockup.structure.push({
        type: 'sidebar',
        className: 'fixed left-0 w-64 h-full bg-background border-r',
        content: 'Vertical navigation menu'
      });
    }

    mockup.structure.push({
      type: 'main',
      className: layout.structure.sidebar ? 'ml-64 p-8' : 'container mx-auto p-8',
      content: 'Main content area'
    });

    // Add components from design patterns
    for (const design of designs) {
      mockup.components.push({
        name: design.name,
        implementation: design.implementation,
        location: design.type === 'navigation' ? 'sidebar/header' : 'main'
      });
    }

    // Define interactions
    mockup.interactions = [
      'Hover effects on interactive elements',
      'Smooth transitions between states',
      'Loading states for async operations',
      'Error handling with user feedback'
    ];

    return mockup;
  }

  private generateDesignRecommendations(task: ResearchTask, designs: UIDesignPattern[]): string[] {
    const recommendations: string[] = [];

    // Pattern-specific recommendations
    for (const design of designs) {
      if (design.bestPractices.length > 0) {
        recommendations.push(`For ${design.name}: ${design.bestPractices[0]}`);
      }
    }

    // General design recommendations
    recommendations.push('Maintain 8px grid system for consistent spacing');
    recommendations.push('Use semantic color names for maintainability');
    recommendations.push('Implement responsive design from mobile-first approach');
    recommendations.push('Ensure WCAG 2.1 AA compliance for accessibility');
    recommendations.push('Add micro-interactions for better user engagement');

    // Task-specific recommendations
    if (task.description.includes('performance')) {
      recommendations.push('Optimize images with next/image component');
      recommendations.push('Implement lazy loading for below-fold content');
    }

    if (task.description.includes('seo')) {
      recommendations.push('Use semantic HTML elements for better SEO');
      recommendations.push('Implement proper heading hierarchy');
    }

    return recommendations.slice(0, 6);
  }

  private createDesignSummary(result: any): string {
    const patternNames = result.designs.map((d: UIDesignPattern) => d.name).join(', ');
    const colorSchemeName = result.colorScheme.primary ? 'custom scheme' : 'default scheme';
    
    return `Designed UI with ${result.designs.length} patterns (${patternNames}) using ${colorSchemeName} and ${result.layout.structure.type} layout. Generated mockup structure with ${result.recommendations.length} design recommendations.`;
  }

  public isReady(): boolean {
    return this.designPatterns.size > 0;
  }

  public getDesignPattern(name: string): UIDesignPattern | undefined {
    return this.designPatterns.get(name.toLowerCase());
  }

  public getColorScheme(name: string): any {
    return this.colorSchemes.get(name);
  }

  public getLayoutSystem(name: string): any {
    return this.layoutSystems.get(name);
  }
}
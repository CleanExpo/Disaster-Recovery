import { EventEmitter } from 'events';
import type { ResearchTask, ResearchResult, ComponentPattern } from './types';

export class ShadcnExpertAgent extends EventEmitter {
  private componentKnowledge: Map<string, ComponentPattern>;
  private themePatterns: Map<string, any>;
  private accessibilityRules: Map<string, string[]>;

  constructor() {
    super();
    this.componentKnowledge = new Map();
    this.themePatterns = new Map();
    this.accessibilityRules = new Map();
    this.initializeKnowledge();
  }

  private initializeKnowledge() {
    // Initialize component patterns knowledge base
    this.loadComponentPatterns();
    this.loadThemePatterns();
    this.loadAccessibilityRules();
  }

  private loadComponentPatterns() {
    // Core shadcn/ui components knowledge
    const components: ComponentPattern[] = [
      {
        name: 'Button',
        category: 'actions',
        description: 'Interactive element for user actions',
        usage: 'import { Button } from "@/components/ui/button"',
        props: {
          variant: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
          size: ['default', 'sm', 'lg', 'icon'],
          asChild: 'boolean'
        },
        examples: [
          '<Button variant="outline">Click me</Button>',
          '<Button size="lg" className="w-full">Submit</Button>'
        ],
        accessibility: ['aria-label', 'aria-pressed', 'role="button"'],
        variants: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link']
      },
      {
        name: 'Card',
        category: 'layout',
        description: 'Container component for grouping related content',
        usage: 'import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"',
        examples: [
          `<Card>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card Description</CardDescription>
  </CardHeader>
  <CardContent>Content here</CardContent>
  <CardFooter>Footer content</CardFooter>
</Card>`
        ],
        dependencies: ['@radix-ui/react-slot']
      },
      {
        name: 'Dialog',
        category: 'overlay',
        description: 'Modal dialog for important interactions',
        usage: 'import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"',
        props: {
          open: 'boolean',
          onOpenChange: '(open: boolean) => void',
          modal: 'boolean'
        },
        examples: [
          `<Dialog>
  <DialogTrigger asChild>
    <Button>Open Dialog</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogDescription>This action cannot be undone.</DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>`
        ],
        dependencies: ['@radix-ui/react-dialog'],
        accessibility: ['aria-modal', 'role="dialog"', 'focus-trap']
      },
      {
        name: 'Form',
        category: 'forms',
        description: 'Form component with react-hook-form integration',
        usage: 'import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"',
        dependencies: ['react-hook-form', '@hookform/resolvers', 'zod'],
        examples: [
          `<Form {...form}>
  <form onSubmit={form.handleSubmit(onSubmit)}>
    <FormField
      control={form.control}
      name="username"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Username</FormLabel>
          <FormControl>
            <Input placeholder="Enter username" {...field} />
          </FormControl>
          <FormDescription>Your public display name.</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  </form>
</Form>`
        ],
        accessibility: ['aria-describedby', 'aria-invalid', 'role="form"']
      },
      {
        name: 'Select',
        category: 'forms',
        description: 'Dropdown selection component',
        usage: 'import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"',
        dependencies: ['@radix-ui/react-select'],
        examples: [
          `<Select>
  <SelectTrigger>
    <SelectValue placeholder="Select option" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>`
        ]
      },
      {
        name: 'Table',
        category: 'data-display',
        description: 'Data table component',
        usage: 'import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"',
        examples: [
          `<Table>
  <TableCaption>A list of recent invoices.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead>Invoice</TableHead>
      <TableHead>Status</TableHead>
      <TableHead>Amount</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>INV001</TableCell>
      <TableCell>Paid</TableCell>
      <TableCell>$250.00</TableCell>
    </TableRow>
  </TableBody>
</Table>`
        ]
      },
      {
        name: 'Toast',
        category: 'feedback',
        description: 'Temporary notification component',
        usage: 'import { useToast } from "@/components/ui/use-toast"',
        dependencies: ['@radix-ui/react-toast'],
        examples: [
          `const { toast } = useToast();
toast({
  title: "Success",
  description: "Your action was completed." })`
        ]
      }
    ];

    components.forEach(comp => {
      this.componentKnowledge.set(comp.name.toLowerCase(), comp);
    });
  }

  private loadThemePatterns() {
    this.themePatterns.set('colors', {
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: 'hsl(var(--primary))',
      secondary: 'hsl(var(--secondary))',
      destructive: 'hsl(var(--destructive))',
      muted: 'hsl(var(--muted))',
      accent: 'hsl(var(--accent))',
      border: 'hsl(var(--border))',
      ring: 'hsl(var(--ring))'
    });

    this.themePatterns.set('spacing', {
      xs: '0.5rem',
      sm: '1rem',
      md: '1.5rem',
      lg: '2rem',
      xl: '3rem'
    });

    this.themePatterns.set('radius', {
      none: '0',
      sm: 'calc(var(--radius) - 4px)',
      md: 'calc(var(--radius) - 2px)',
      lg: 'var(--radius)',
      xl: 'calc(var(--radius) + 4px)',
      full: '9999px'
    });
  }

  private loadAccessibilityRules() {
    this.accessibilityRules.set('interactive', [
      'Ensure keyboard navigation support',
      'Provide focus indicators',
      'Include ARIA labels for screen readers',
      'Support escape key to close overlays',
      'Maintain focus trap in modals'
    ]);

    this.accessibilityRules.set('forms', [
      'Associate labels with form controls',
      'Provide error messages with aria-describedby',
      'Mark required fields appropriately',
      'Group related fields with fieldset',
      'Announce form validation errors'
    ]);

    this.accessibilityRules.set('content', [
      'Use semantic HTML elements',
      'Provide alternative text for images',
      'Maintain proper heading hierarchy',
      'Ensure sufficient color contrast',
      'Support reduced motion preferences'
    ]);
  }

  public async execute(task: ResearchTask): Promise<any> {
    this.emit('progress', { stage: 'analyzing', task: task.description });

    const result = {
      summary: '',
      components: [] as ComponentPattern[],
      recommendations: [] as string[],
      implementation: {} as any,
      confidence: 0.9
    };

    // Analyze task to identify relevant components
    const relevantComponents = this.identifyRelevantComponents(task.description);
    result.components = relevantComponents;

    // Generate implementation suggestions
    result.implementation = this.generateImplementation(task, relevantComponents);

    // Provide recommendations
    result.recommendations = this.generateRecommendations(task, relevantComponents);

    // Create summary
    result.summary = this.createSummary(relevantComponents, result.recommendations);

    this.emit('progress', { stage: 'completed', result });
    return result;
  }

  private identifyRelevantComponents(description: string): ComponentPattern[] {
    const relevant: ComponentPattern[] = [];
    const keywords = description.toLowerCase().split(' ');

    // Check each component for relevance
    for (const [name, pattern] of this.componentKnowledge) {
      const relevanceScore = this.calculateRelevance(pattern, keywords);
      if (relevanceScore > 0.3) {
        relevant.push(pattern);
      }
    }

    // Sort by relevance
    return relevant.sort((a, b) => 
      this.calculateRelevance(b, keywords) - this.calculateRelevance(a, keywords)
    );
  }

  private calculateRelevance(pattern: ComponentPattern, keywords: string[]): number {
    let score = 0;

    // Check name match
    if (keywords.includes(pattern.name.toLowerCase())) {
      score += 0.5;
    }

    // Check category match
    if (keywords.some(k => pattern.category.includes(k))) {
      score += 0.3;
    }

    // Check description match
    const descWords = pattern.description.toLowerCase().split(' ');
    const matchCount = keywords.filter(k => descWords.includes(k)).length;
    score += matchCount * 0.1;

    return Math.min(score, 1);
  }

  private generateImplementation(
    task: ResearchTask, 
    components: ComponentPattern[]
  ): any {
    const implementation = {
      imports: [] as string[],
      code: [] as string[],
      dependencies: new Set<string>(),
      styling: {} as any
    };

    // Generate imports
    for (const component of components) {
      if (component.usage) {
        implementation.imports.push(component.usage);
      }
      if (component.dependencies) {
        component.dependencies.forEach(dep => implementation.dependencies.add(dep));
      }
    }

    // Generate example code
    for (const component of components) {
      if (component.examples && component.examples.length > 0) {
        implementation.code.push(`// ${component.name} Implementation`);
        implementation.code.push(component.examples[0]);
      }
    }

    // Add theme configuration
    implementation.styling = {
      theme: this.themePatterns.get('colors'),
      spacing: this.themePatterns.get('spacing'),
      radius: this.themePatterns.get('radius')
    };

    return implementation;
  }

  private generateRecommendations(
    task: ResearchTask,
    components: ComponentPattern[]
  ): string[] {
    const recommendations: string[] = [];

    // Component-specific recommendations
    for (const component of components.slice(0, 3)) {
      if (component.variants && component.variants.length > 0) {
        recommendations.push(
          `Consider using ${component.name} with variant "${component.variants[0]}" for better visual hierarchy`
        );
      }

      if (component.accessibility && component.accessibility.length > 0) {
        recommendations.push(
          `Ensure ${component.name} includes ${component.accessibility[0]} for accessibility`
        );
      }
    }

    // General shadcn/ui recommendations
    recommendations.push('Use CSS variables for consistent theming across components');
    recommendations.push('Leverage Radix UI primitives for complex interactions');
    recommendations.push('Implement form validation with react-hook-form and zod');

    // Task-specific recommendations
    if (task.description.includes('form')) {
      recommendations.push('Use FormField components for consistent form structure');
    }
    if (task.description.includes('responsive')) {
      recommendations.push('Apply responsive modifiers using Tailwind CSS classes');
    }
    if (task.description.includes('dark')) {
      recommendations.push('Implement dark mode using CSS variables and class toggling');
    }

    return recommendations.slice(0, 5);
  }

  private createSummary(
    components: ComponentPattern[],
    recommendations: string[]
  ): string {
    const componentList = components.slice(0, 3).map(c => c.name).join(', ');
    return `Identified ${components.length} relevant shadcn/ui components (${componentList}) with ${recommendations.length} implementation recommendations. Components follow Radix UI patterns with full accessibility support.`;
  }

  public isReady(): boolean {
    return this.componentKnowledge.size > 0;
  }

  public getComponentInfo(componentName: string): ComponentPattern | undefined {
    return this.componentKnowledge.get(componentName.toLowerCase());
  }

  public getAllComponents(): ComponentPattern[] {
    return Array.from(this.componentKnowledge.values());
  }

  public getThemePattern(patternName: string): any {
    return this.themePatterns.get(patternName);
  }

  public getAccessibilityRules(category: string): string[] {
    return this.accessibilityRules.get(category) || [];
  }
}
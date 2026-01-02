import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';
import { Phone, Mail, ArrowRight, Download } from 'lucide-react';

/**
 * The Button component is context-aware and supports multiple variants for different scenarios:
 * - **Emergency** variants: No animations, high contrast, large tap targets
 * - **Education** variants: Subtle animations, engaging
 * - **NRPG** variants: Professional network branding
 *
 * ## Accessibility
 * - WCAG 2.1 AA compliant
 * - Keyboard navigable
 * - Screen reader compatible
 * - Minimum tap target: 44x44px (56px for crisis mode)
 */
const meta = {
  title: 'DesignOS/Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Context-aware button component with emergency, educational, and NRPG variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'default',
        'destructive',
        'outline',
        'secondary',
        'ghost',
        'link',
        'emergency-primary',
        'emergency-secondary',
        'education-primary',
        'education-secondary',
        'nrpg-primary',
        'nrpg-secondary',
        'nrpg-outline',
      ],
      description: 'Visual variant of the button',
    },
    size: {
      control: 'select',
      options: ['default', 'sm', 'lg', 'xl', 'icon', 'crisis', 'crisis-full', 'call'],
      description: 'Size of the button',
    },
    loading: {
      control: 'boolean',
      description: 'Show loading spinner',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    iconPosition: {
      control: 'radio',
      options: ['left', 'right'],
      description: 'Position of the icon',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button with primary styling
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

/**
 * Emergency primary button - used for critical actions during disasters.
 * No animations, high contrast, optimized for stressed users.
 */
export const EmergencyPrimary: Story = {
  args: {
    children: 'Call Emergency Services',
    variant: 'emergency-primary',
    size: 'crisis',
    icon: <Phone className="h-5 w-5" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Emergency buttons use red color and transition-none for immediate response feel.',
      },
    },
  },
};

/**
 * Emergency secondary button - less critical emergency actions
 */
export const EmergencySecondary: Story = {
  args: {
    children: 'View Safety Checklist',
    variant: 'emergency-secondary',
    size: 'lg',
  },
};

/**
 * Education primary button - for learning content and guides
 */
export const EducationPrimary: Story = {
  args: {
    children: 'Learn More',
    variant: 'education-primary',
    size: 'lg',
    icon: <ArrowRight className="h-5 w-5" />,
    iconPosition: 'right',
  },
};

/**
 * NRPG primary button - for contractor portal
 */
export const NRPGPrimary: Story = {
  args: {
    children: 'Join NRPG Network',
    variant: 'nrpg-primary',
    size: 'lg',
  },
};

/**
 * Loading state - shows spinner during async operations
 */
export const Loading: Story = {
  args: {
    children: 'Submitting Claim...',
    loading: true,
    variant: 'education-primary',
    size: 'lg',
  },
};

/**
 * Disabled state - button is not interactive
 */
export const Disabled: Story = {
  args: {
    children: 'Submit',
    disabled: true,
    variant: 'default',
  },
};

/**
 * Icon button - square button with icon only
 */
export const IconButton: Story = {
  args: {
    children: <Mail className="h-5 w-5" />,
    variant: 'outline',
    size: 'icon',
  },
};

/**
 * Crisis-optimized full-width button for mobile
 */
export const CrisisFull: Story = {
  args: {
    children: 'Report Water Damage',
    variant: 'emergency-primary',
    size: 'crisis-full',
    icon: <Phone className="h-5 w-5" />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Full-width button with large tap target (56px minimum) for panic users on mobile.',
      },
    },
  },
};

/**
 * Call CTA - extra large button for hero sections
 */
export const CallCTA: Story = {
  args: {
    children: '1300 309 361',
    variant: 'emergency-primary',
    size: 'call',
    icon: <Phone className="h-6 w-6" />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Prominent CTA button for emergency phone calls. 64px minimum height.',
      },
    },
  },
};

/**
 * Button with icon on the right
 */
export const IconRight: Story = {
  args: {
    children: 'Download Guide',
    variant: 'education-primary',
    icon: <Download className="h-5 w-5" />,
    iconPosition: 'right',
  },
};

/**
 * All button variants showcase
 */
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4 p-8">
      <div>
        <h3 className="text-sm font-medium mb-2">Emergency Variants</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="emergency-primary">Emergency Primary</Button>
          <Button variant="emergency-secondary">Emergency Secondary</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Education Variants</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="education-primary">Education Primary</Button>
          <Button variant="education-secondary">Education Secondary</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">NRPG Variants</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="nrpg-primary">NRPG Primary</Button>
          <Button variant="nrpg-secondary">NRPG Secondary</Button>
          <Button variant="nrpg-outline">NRPG Outline</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Default Variants</h3>
        <div className="flex gap-2 flex-wrap">
          <Button variant="default">Default</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Sizes</h3>
        <div className="flex gap-2 items-center flex-wrap">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium mb-2">Crisis Sizes</h3>
        <div className="flex flex-col gap-2">
          <Button variant="emergency-primary" size="crisis">Crisis (Large Tap Target)</Button>
          <Button variant="emergency-primary" size="crisis-full">Crisis Full Width</Button>
          <Button variant="emergency-primary" size="call">Call CTA (Hero)</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

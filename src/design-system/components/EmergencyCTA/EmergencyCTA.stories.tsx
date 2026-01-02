import type { Meta, StoryObj } from '@storybook/react';
import { EmergencyCTA, StickyEmergencyCTA } from './EmergencyCTA';

/**
 * Emergency CTA component provides dual-path options for crisis users:
 * - **Call Now**: Immediate phone contact for true emergencies
 * - **Get Help Online**: Form-based intake for slightly less urgent situations
 *
 * Strategic decision: Reduce decision paralysis by offering both options
 *
 * ## Layouts
 * - **Mobile**: Full-width stacked cards
 * - **Desktop**: Side-by-side comparison
 *
 * ## Accessibility
 * - WCAG 2.1 AA compliant
 * - Large tap targets (56px minimum)
 * - Clear visual hierarchy
 * - Color-coded by urgency (red = emergency, green = complete setup)
 */
const meta = {
  title: 'DesignOS/Components/EmergencyCTA',
  component: EmergencyCTA,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: 'Dual-path emergency CTA reducing decision paralysis for stressed users.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    phoneNumber: {
      control: 'text',
      description: 'Emergency phone number',
    },
    onlineHelpUrl: {
      control: 'text',
      description: 'URL for online help form',
    },
  },
} satisfies Meta<typeof EmergencyCTA>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default emergency CTA with standard phone number
 */
export const Default: Story = {
  args: {
    phoneNumber: '1300 309 361',
    onlineHelpUrl: '/dashboard/client/requests/new?emergency=true',
  },
};

/**
 * Mobile view - stacked full-width cards
 */
export const Mobile: Story = {
  args: {
    phoneNumber: '1300 309 361',
    onlineHelpUrl: '/dashboard/client/requests/new?emergency=true',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'On mobile devices, cards stack vertically for easy thumb access.',
      },
    },
  },
};

/**
 * Desktop view - side-by-side cards
 */
export const Desktop: Story = {
  args: {
    phoneNumber: '1300 309 361',
    onlineHelpUrl: '/dashboard/client/requests/new?emergency=true',
  },
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'On desktop, cards appear side-by-side for comparison.',
      },
    },
  },
};

/**
 * Custom phone number and URL
 */
export const CustomValues: Story = {
  args: {
    phoneNumber: '1800 DISASTER',
    onlineHelpUrl: '/emergency-intake',
  },
};

/**
 * Sticky emergency CTA for mobile (always visible at bottom)
 */
export const StickyMobile: StoryObj<typeof StickyEmergencyCTA> = {
  render: (args) => (
    <div className="relative h-screen bg-gray-100 p-4">
      <div className="prose">
        <h1>Emergency Water Damage Guide</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Scroll down to see the sticky CTA.</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
        <p>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        <p>Scroll more to see the persistent sticky button...</p>
        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
      </div>
      <StickyEmergencyCTA phoneNumber="1300 309 361" />
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'Sticky CTA that remains visible at bottom of screen on mobile. Used on emergency content pages.',
      },
    },
  },
};

/**
 * Integration example - Emergency intake page
 */
export const IntegrationExample: Story = {
  render: () => (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold mb-2">Water Damage Emergency?</h1>
        <p className="text-lg text-muted-foreground">
          Choose your preferred contact method below
        </p>
      </div>

      <EmergencyCTA
        phoneNumber="1300 309 361"
        onlineHelpUrl="/dashboard/client/requests/new?emergency=true"
      />

      <div className="mt-12 prose max-w-none">
        <h2>What to Expect</h2>
        <h3>If you call:</h3>
        <ul>
          <li>Immediate connection to dispatch team</li>
          <li>Quick assessment (3-minute call)</li>
          <li>Contractor dispatched within 30 minutes</li>
          <li>SMS confirmation with contractor details</li>
        </ul>

        <h3>If you use the online form:</h3>
        <ul>
          <li>Complete damage assessment (15 minutes)</li>
          <li>Upload photos for better matching</li>
          <li>Insurance information captured</li>
          <li>Higher priority matching algorithm</li>
        </ul>
      </div>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
  },
};

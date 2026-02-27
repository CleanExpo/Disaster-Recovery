import { Metadata } from 'next';
import { Eye } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Accessibility Statement',
  description: 'Our commitment to digital accessibility. Disaster Recovery Australia strives to ensure our website is accessible to all users, including those with disabilities.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/accessibility',
  },
};

export default function AccessibilityPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        icon: <Eye className="h-12 w-12" />,
        title: 'Accessibility Statement',
        subtitle: 'Our commitment to making disaster recovery services accessible to everyone.',
      }}
      cta={{ text: 'Contact Us', href: '/contact' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Accessibility Statement' },
      ]}
      sections={[
        {
          heading: 'Our Commitment',
          body: (
            <>
              <p>Disaster Recovery Australia is committed to ensuring digital accessibility for people with disabilities. We continually improve the user experience for everyone and apply the relevant accessibility standards.</p>
              <p style={{ marginTop: '1rem' }}>We aim to conform to the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA. These guidelines explain how to make web content more accessible to people with a wide array of disabilities.</p>
            </>
          ),
        },
        {
          heading: 'Measures Taken',
          body: (
            <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li>Semantic HTML structure with proper heading hierarchy</li>
              <li>ARIA landmarks and labels for screen reader navigation</li>
              <li>Sufficient colour contrast ratios throughout the site</li>
              <li>Keyboard-navigable interactive elements</li>
              <li>Descriptive alt text for images</li>
              <li>Responsive design that works across devices and zoom levels</li>
              <li>Clear, consistent navigation patterns</li>
            </ul>
          ),
          background: 'light',
        },
        {
          heading: 'Emergency Access',
          body: (
            <>
              <p>We recognise that during an emergency, accessibility is critical. Our claim submission system is designed to be usable by assistive technologies, and our 24/7 service ensures help is available to all Australians regardless of ability.</p>
              <p style={{ marginTop: '1rem' }}>If you are experiencing a property emergency and have difficulty using our website, please use our contact form at <a href="/contact" style={{ color: 'var(--ag-secondary-blue)', textDecoration: 'underline' }}>/contact</a> and we will prioritise your request.</p>
            </>
          ),
        },
        {
          heading: 'Feedback',
          body: (
            <>
              <p>We welcome your feedback on the accessibility of the Disaster Recovery Australia website. If you encounter any accessibility barriers or have suggestions for improvement, please contact us:</p>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li>Via our <a href="/contact" style={{ color: 'var(--ag-secondary-blue)', textDecoration: 'underline' }}>contact page</a></li>
                <li>By email at accessibility@disasterrecovery.com.au</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>We aim to respond to accessibility feedback within 2 business days.</p>
            </>
          ),
          background: 'light',
        },
      ]}
    />
  );
}

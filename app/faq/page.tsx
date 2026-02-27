import { Metadata } from 'next';
import Link from 'next/link';
import { HelpCircle } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getFAQSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Frequently Asked Questions | All FAQs | Disaster Recovery',
  description: 'Find answers to all your questions about disaster recovery, water damage, fire restoration, mould removal, insurance claims, and emergency response.',
  alternates: { canonical: 'https://disasterrecovery.com.au/faq' },
};

export default function FAQIndexPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
        icon: <HelpCircle className="h-12 w-12" />,
        title: 'Frequently Asked Questions',
        subtitle: 'Get answers to common disaster recovery questions',
      }}
      cta={{ text: 'Get Help Now', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'FAQ' },
      ]}
      sections={[
        {
          heading: 'Browse FAQ Categories',
          body: (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1rem' }}>
              {[
                { name: 'Water Damage', href: '/faq/water-damage' },
                { name: 'Fire Damage', href: '/faq/fire-damage' },
                { name: 'Flood Restoration', href: '/faq/flood-restoration' },
                { name: 'Storm Damage', href: '/faq/storm-damage' },
                { name: 'Mould Removal', href: '/faq/mould-removal' },
                { name: 'Insurance Claims', href: '/faq/insurance-claims' },
                { name: 'Emergency Response', href: '/faq/emergency-response' },
                { name: 'Biohazard Cleanup', href: '/faq/biohazard-cleanup' },
                { name: 'Sewage Cleanup', href: '/faq/sewage-cleanup' },
                { name: 'Carpet Drying', href: '/faq/carpet-drying' },
                { name: 'Ceiling Repairs', href: '/faq/ceiling-repairs' },
                { name: 'Contents Restoration', href: '/faq/contents-restoration' },
                { name: 'Document Drying', href: '/faq/document-drying' },
                { name: 'Electronics Restoration', href: '/faq/electronics-restoration' },
                { name: 'Emergency Plumbing', href: '/faq/emergency-plumbing' },
                { name: 'Odour Removal', href: '/faq/odour-removal' },
                { name: 'General FAQs', href: '/faq/general' },
              ].map((cat) => (
                <Link key={cat.href} href={cat.href} style={{ display: 'block', padding: '1rem', background: 'white', borderRadius: '0.75rem', textDecoration: 'none', border: '1px solid rgba(0,0,0,0.08)', fontWeight: 600, color: 'var(--ag-primary-blue, #0052CC)' }}>
                  {cat.name}
                </Link>
              ))}
            </div>
          ),
        },
        ...getFAQSections({ topic: 'general' }),
      ]}
      relatedPages={getRelatedPages('guides-general')}
    />
  );
}

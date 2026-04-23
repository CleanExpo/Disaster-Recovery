import { Metadata } from 'next';
import Link from 'next/link';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';
import { LocationSchemaWrapper } from '@/components/seo/LocationSchemaWrapper';

export const metadata: Metadata = {
  title: 'Disaster Recovery Auckland | 24/7',
  description: 'Disaster recovery services for Auckland, New Zealand. IICRC-certified contractors for water damage, fire damage, mould remediation. Services supplied to NZ consumers are subject to the Consumer Guarantees Act 1993.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/locations/auckland',
  },
};

/**
 * NZ consumer-rights notice shown above the main content on NZ-facing
 * location pages. Cross-references /terms NZ Supplementary Terms and
 * /privacy NZ Privacy Act 2020 section.
 */
function NzConsumerNotice() {
  return (
    <div
      role="note"
      aria-label="New Zealand consumer rights"
      style={{
        maxWidth: 1100,
        margin: '1rem auto 0',
        padding: '0.75rem 1rem',
        borderLeft: '4px solid #1D4ED8',
        background: '#EFF6FF',
        fontSize: '0.9rem',
        color: '#1E293B',
      }}
    >
      <strong>New Zealand consumers:</strong> Services supplied to a NZ property come with
      non-excludable guarantees under the Consumer Guarantees Act 1993 and the Fair Trading Act
      1986. We handle your personal information in accordance with the Privacy Act 2020. See our{' '}
      <Link href="/terms" style={{ color: '#1D4ED8', textDecoration: 'underline' }}>
        NZ Supplementary Terms
      </Link>{' '}
      and{' '}
      <Link href="/privacy" style={{ color: '#1D4ED8', textDecoration: 'underline' }}>
        NZ Privacy section
      </Link>
      .
    </div>
  );
}

export default function AucklandLocationPage() {
  return (
    <>
      <LocationSchemaWrapper
        city="Auckland"
        state="AKL"
        stateFullName="Auckland Region"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Auckland' },
        ]}
      />
      <NzConsumerNotice />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
          icon: <MapPin className="h-12 w-12" />,
          title: 'Disaster Recovery Auckland',
          subtitle: '24/7 Emergency Services in Auckland',
        }}
        cta={{ text: 'Emergency Response', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Auckland' },
        ]}
        sections={getLocationSections({ city: 'Auckland', state: 'AKL' })}
        relatedPages={getRelatedPages('location-auckland')}
      />
    </>
  );
}

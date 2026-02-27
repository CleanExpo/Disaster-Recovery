import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getRelatedPages } from '@/lib/internal-links';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Commercial Disaster Recovery for Business',
  description: 'Disaster recovery services for property managers, strata managers, business owners, facilities managers, councils, and commercial cleaners across Australia.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/for',
  },
};

export default function ForBusinessPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Disaster Recovery for Business',
        subtitle: 'Whether you manage one building or a portfolio of hundreds — we respond within 60 minutes, 24/7, anywhere in Australia.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'For Business' },
      ]}
      stats={[
        { label: 'Response Time', value: '< 60 min' },
        { label: 'Available', value: '24/7/365' },
        { label: 'Coverage', value: 'Australia-Wide' },
        { label: 'Certified', value: 'IICRC' },
      ]}
      sections={[
        {
          heading: 'Property Managers & Managing Agents',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Your tenant is calling at 2am with water pouring through the ceiling. You need a certified restoration company on-site within the hour — not tomorrow morning.</p>
              <p>We provide 24/7 emergency response, full documentation for building owners, and preferred supplier arrangements for your entire portfolio.</p>
              <p><Link href="/for/property-managers"><strong>Property Manager Emergency Guide →</strong></Link></p>
            </div>
          ),
        },
        {
          heading: 'Strata & Body Corporate Managers',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Common property damage affects every owner in the building. You need to act fast, manage emergency spending, and coordinate with insurers — all before the next committee meeting.</p>
              <p>We handle multi-unit coordination, provide per-lot documentation, and work within your emergency spending authority.</p>
              <p><Link href="/for/strata-managers"><strong>Strata Manager Emergency Guide →</strong></Link></p>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Business Owners & Tenants',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Every hour your business is closed costs you revenue. You need your premises restored and your doors reopened as fast as possible.</p>
              <p>We prioritise getting you back to trading — with full business interruption documentation for your insurance claim.</p>
              <p><Link href="/for/business-owners"><strong>Business Owner Emergency Guide →</strong></Link></p>
            </div>
          ),
        },
        {
          heading: 'Facilities Managers',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Large-scale commercial buildings need a restoration partner that meets your procurement requirements, SLA expectations, and compliance standards.</p>
              <p><Link href="/for/facilities-managers"><strong>Facilities Manager Information →</strong></Link></p>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Local Councils',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Council-owned community facilities, libraries, depots, and public buildings need rapid restoration to return to public service. We also support property owners responding to council-issued make-safe orders.</p>
              <p><Link href="/for/councils"><strong>Council Partnership Information →</strong></Link></p>
            </div>
          ),
        },
        {
          heading: 'Commercial Cleaning Companies',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Found damage beyond your scope at 5am? We work alongside your existing cleaning contract — your client stays your client.</p>
              <p><Link href="/for/commercial-cleaners"><strong>Referral Partner Program →</strong></Link></p>
            </div>
          ),
          background: 'light',
        },
      ]}
      relatedPages={getRelatedPages('commercial')}
    />
  );
}

import { Metadata } from 'next';
import { Shield } from 'lucide-react';
import Link from 'next/link';
import { AgContentPageTemplate } from '@/components/antigravity';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({
  title: 'Operational Excellence',
  description:
    'Discover the technology, safety standards, field equipment, industry partnerships and remediation assets that power Disaster Recovery across Australia and New Zealand.',
  keywords: [
    'operational excellence disaster recovery',
    'disaster recovery technology',
    'safety PPE restoration',
    'field essentials disaster recovery',
    'IICRC NRPG partnerships',
    'chemical remediation assets',
    'disaster recovery equipment Australia',
  ],
  canonical: 'https://disasterrecovery.com.au/operational-excellence',
});

const OE_PAGES = [
  {
    slug: 'command-ecosystem',
    title: 'Command Ecosystem',
    description:
      'Integrated technology for claims management across iPads, mobiles and laptops with GPS dispatch and IICRC-compliant digital workflows.',
    gradient: 'from-blue-900 to-blue-600',
    icon: '\u{1F4BB}',
  },
  {
    slug: 'safety-ppe',
    title: 'Safety & PPE',
    description:
      'Rigorous safety standards, hazmat suits, helmets, respirators and Australian WHS-compliant protective gear on every site.',
    gradient: 'from-red-900 to-red-600',
    icon: '\u{1F6E1}\uFE0F',
  },
  {
    slug: 'field-essentials',
    title: 'Field Essentials',
    description:
      'Battle-tested deployment kits with flashlights, power banks, weatherproof gear and emergency supplies for any environment.',
    gradient: 'from-green-900 to-green-600',
    icon: '\u{1F526}',
  },
  {
    slug: 'executive-partners',
    title: 'Executive Partners',
    description:
      'Proudly affiliated with IICRC, CARSI, RestoreAssist and NRPG — industry-leading certifications and partnerships.',
    gradient: 'from-slate-800 to-indigo-600',
    icon: '\u{1F91D}',
  },
  {
    slug: 'chemical-remediation-assets',
    title: 'Chemical & Remediation Assets',
    description:
      'Negative air machines, antimicrobial treatments, branded containment systems and EPA-registered disinfectants for professional restoration.',
    gradient: 'from-amber-900 to-amber-600',
    icon: '\u{2697}\uFE0F',
  },
];

export default function OperationalExcellenceIndexPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F172A 0%, #1E3A5F 50%, #2563EB 100%)',
        icon: <Shield className="h-12 w-12" />,
        title: 'Operational Excellence',
        subtitle:
          'The technology, safety standards, equipment and partnerships behind every Disaster Recovery project',
      }}
      cta={{ text: 'Get Emergency Help', href: '/emergency' }}
      secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Operational Excellence' },
      ]}
      stats={[
        { label: 'Field Devices', value: '3 Platforms' },
        { label: 'Safety Record', value: 'Zero Incidents' },
        { label: 'Equipment Fleet', value: '200+ Assets' },
        { label: 'Industry Partners', value: '4 Executive' },
      ]}
      sections={[
        {
          heading: 'Every Detail Matters',
          body: (
            <div>
              <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '75ch' }}>
                From the technology our technicians carry to the safety gear they wear, from the
                chemicals they deploy to the industry bodies that certify our work — every detail
                of a Disaster Recovery project is designed for excellence. Explore the five pillars
                of our operational standard.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {OE_PAGES.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/operational-excellence/${page.slug}`}
                    style={{
                      display: 'block',
                      borderRadius: '0.75rem',
                      border: '1px solid rgba(0,0,0,0.08)',
                      padding: '1.5rem',
                      textDecoration: 'none',
                      color: 'inherit',
                      transition: 'box-shadow 0.2s, transform 0.2s',
                      backgroundColor: '#fff',
                    }}
                    className="hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{page.icon}</div>
                    <h3
                      style={{
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: 'var(--ag-primary-blue, #0F2942)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {page.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#6B7280' }}>
                      {page.description}
                    </p>
                    <span
                      style={{
                        display: 'inline-block',
                        marginTop: '0.75rem',
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: 'var(--ag-primary-blue, #0F2942)',
                      }}
                    >
                      Learn more &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ),
        },
      ]}
      relatedPages={[
        { title: 'Emergency Services', href: '/services/emergency-response', description: '24/7 emergency disaster response across Australia.' },
        { title: 'Water Damage Restoration', href: '/services/water-damage-restoration', description: 'Professional water extraction and structural drying.' },
        { title: 'Fire Damage Restoration', href: '/services/fire-damage-restoration', description: 'Comprehensive fire and smoke damage restoration.' },
        { title: 'Mould Remediation', href: '/services/mould-remediation', description: 'IICRC S520 certified mould removal and prevention.' },
        { title: 'Knowledge Base', href: '/knowledge', description: 'Expert-verified restoration science and standards.' },
        { title: 'Start a Claim', href: '/claim', description: 'Begin your disaster recovery claim with NRP Group.' },
      ]}
    />
  );
}

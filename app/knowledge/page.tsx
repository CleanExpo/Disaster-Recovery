import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import Link from 'next/link';
import { AgContentPageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Knowledge Base | Restoration Science',
  description:
    'Authoritative disaster recovery knowledge hub covering IICRC standards, Australian insurance law, psychrometric science, and restoration best practices. Expert-verified content from NRPG.',
  openGraph: {
    title: 'Knowledge Base | Disaster Recovery Science & Standards',
    description:
      'Expert-verified disaster recovery knowledge covering IICRC standards, Australian law, and restoration science.',
  },
  alternates: { canonical: 'https://disasterrecovery.com.au/knowledge' },
};

const KNOWLEDGE_ENTRIES = [
  {
    slug: 'water-damage-restoration-science',
    title: 'Water Damage Restoration Science',
    description:
      'IICRC S500 water contamination categories, drying classes, psychrometric principles, and Australian building code compliance.',
    gradient: 'from-blue-600 to-cyan-500',
    icon: '💧',
  },
  {
    slug: 'mould-remediation-standards',
    title: 'Mould Remediation Standards',
    description:
      'IICRC S520 protocols for containment, HEPA filtration, antimicrobial treatment, and post-remediation verification.',
    gradient: 'from-green-700 to-emerald-500',
    icon: '🔬',
  },
  {
    slug: 'fire-damage-restoration-process',
    title: 'Fire Damage Restoration Process',
    description:
      'Four-phase fire restoration covering safety assessment, debris removal, smoke remediation, and structural repair.',
    gradient: 'from-orange-600 to-red-500',
    icon: '🔥',
  },
  {
    slug: 'insurance-claims-process-australia',
    title: 'Insurance Claims Process — Australia',
    description:
      'Insurance Contracts Act 1984, General Insurance Code of Practice, AFCA dispute resolution, and claims timeline.',
    gradient: 'from-indigo-600 to-purple-500',
    icon: '📋',
  },
  {
    slug: 'emergency-response-protocols',
    title: 'Emergency Response Protocols',
    description:
      'PPRR framework, the golden hour in restoration, WHS obligations, and professional response sequence.',
    gradient: 'from-red-600 to-rose-500',
    icon: '🚨',
  },
  {
    slug: 'psychrometric-science-restoration',
    title: 'Psychrometric Science in Restoration',
    description:
      'Temperature-humidity relationships, grain depression, vapour pressure differentials, and the drying equation.',
    gradient: 'from-teal-600 to-cyan-400',
    icon: '🌡️',
  },
  {
    slug: 'biohazard-trauma-cleaning-standards',
    title: 'Biohazard & Trauma Cleaning Standards',
    description:
      'Bloodborne pathogen protocols, AS/NZS 3816 clinical waste management, and biohazard classification levels.',
    gradient: 'from-yellow-600 to-amber-500',
    icon: '☣️',
  },
  {
    slug: 'storm-flood-damage-recovery',
    title: 'Storm & Flood Damage Recovery',
    description:
      'Category 3 floodwater protocols, storm damage categories, BOM data, and flood insurance in Australia.',
    gradient: 'from-sky-700 to-blue-500',
    icon: '⛈️',
  },
  {
    slug: 'commercial-vs-residential-restoration',
    title: 'Commercial vs Residential Restoration',
    description:
      'BCA class differences, ISO 22301 business continuity, multi-stakeholder coordination, and compliance requirements.',
    gradient: 'from-slate-700 to-gray-500',
    icon: '🏢',
  },
  {
    slug: 'iicrc-certification-standards',
    title: 'IICRC Certification Standards',
    description:
      '8 core IICRC standards, certification levels, insurance recognition, and why certification matters for your claim.',
    gradient: 'from-violet-600 to-purple-500',
    icon: '🏆',
  },
  {
    slug: 'insurance-payout-settlement',
    title: 'Insurance Payouts & Cash Settlements',
    description:
      'When to accept an insurance payout, when to refuse, contents claims strategy, and your rights under Australian insurance law.',
    gradient: 'from-amber-600 to-orange-500',
    icon: '💰',
  },
  {
    slug: 'make-safe-forensic-assessment',
    title: 'Make-Safe & Forensic Assessment',
    description:
      'Emergency make-safe procedures, forensic damage assessment methodology, and documentation for insurance claims.',
    gradient: 'from-rose-600 to-pink-500',
    icon: '🛡️',
  },
  {
    slug: 'toxins-contamination',
    title: 'Toxins & Contamination',
    description:
      'Biological toxins, chemical hazards, mould species health risks, and IICRC-certified decontamination protocols.',
    gradient: 'from-lime-700 to-green-500',
    icon: '⚠️',
  },
];

export default function KnowledgeHubPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 50%, #2563EB 100%)',
        icon: <BookOpen className="h-12 w-12" />,
        title: 'Knowledge Base',
        subtitle:
          'Expert-verified disaster recovery science, IICRC standards, Australian legal frameworks, and restoration best practices',
      }}
      cta={{ text: 'Get Emergency Help', href: '/emergency' }}
      secondaryCta={{ text: 'Start a Claim', href: '/claim' }}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Knowledge Base' },
      ]}
      stats={[
        { label: 'Expert Articles', value: '10+' },
        { label: 'IICRC Standards Covered', value: '8' },
        { label: 'FAQ Answers', value: '55+' },
        { label: 'Credibility Score', value: '9.8/10' },
      ]}
      sections={[
        {
          heading: 'Disaster Recovery Knowledge Hub',
          body: (
            <div>
              <p style={{ fontSize: '1.125rem', lineHeight: 1.8, marginBottom: '2rem', maxWidth: '75ch' }}>
                Our knowledge base provides authoritative, expert-verified information on every aspect of
                disaster recovery in Australia. Each article references IICRC standards, Australian legislation,
                and peer-reviewed science — giving you the information you need to make confident decisions
                about your property.
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
                  gap: '1.5rem',
                }}
              >
                {KNOWLEDGE_ENTRIES.map((entry) => (
                  <Link
                    key={entry.slug}
                    href={`/knowledge/${entry.slug}`}
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
                    <div style={{ fontSize: '1.75rem', marginBottom: '0.75rem' }}>{entry.icon}</div>
                    <h3
                      style={{
                        fontSize: '1.125rem',
                        fontWeight: 700,
                        color: 'var(--ag-primary-blue, #0F2942)',
                        marginBottom: '0.5rem',
                      }}
                    >
                      {entry.title}
                    </h3>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.6, color: '#6B7280' }}>
                      {entry.description}
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
                      Read article &rarr;
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          ),
        },
        {
          heading: 'Why Trust Our Knowledge Base?',
          background: 'light' as const,
          body: (
            <div>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
                Every article in our knowledge base is built on three pillars of authority:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div style={{ padding: '1.25rem', borderRadius: '0.5rem', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--ag-primary-blue, #0F2942)' }}>
                    IICRC Standards
                  </h4>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#6B7280' }}>
                    All technical content references IICRC S500, S520, S540, and other internationally
                    recognised restoration standards used by insurers and regulators.
                  </p>
                </div>
                <div style={{ padding: '1.25rem', borderRadius: '0.5rem', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--ag-primary-blue, #0F2942)' }}>
                    Australian Law
                  </h4>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#6B7280' }}>
                    Legal content references the Insurance Contracts Act 1984, Australian Consumer Law,
                    WHS legislation, and state-specific regulations.
                  </p>
                </div>
                <div style={{ padding: '1.25rem', borderRadius: '0.5rem', backgroundColor: '#fff', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <h4 style={{ fontWeight: 700, marginBottom: '0.5rem', color: 'var(--ag-primary-blue, #0F2942)' }}>
                    Peer-Reviewed Science
                  </h4>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#6B7280' }}>
                    Scientific claims are sourced from CSIRO, ASHRAE, WHO, and Australian university
                    research — all with credibility scores of 9/10 or above.
                  </p>
                </div>
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
        { title: 'Insurance Claims Guide', href: '/guides/insurance', description: 'Navigate your disaster insurance claim.' },
        { title: 'Start a Claim', href: '/claim', description: 'Begin your disaster recovery claim with NRPG.' },
      ]}
    />
  );
}

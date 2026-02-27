import { Metadata } from 'next';
import Script from 'next/script';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getInsuranceSections } from '@/lib/content-sections';
import { getRelatedPages } from '@/lib/internal-links';

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Insurance Claims Assistance',
  description: 'Expert insurance claims assistance for disaster recovery. Full claims documentation provided to support reimbursement from all Australian insurers — residential, commercial, industrial, marine, and aviation.',
  provider: { '@type': 'Organization', '@id': 'https://disasterrecovery.com.au/#organization' },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Insurance Claims Documentation',
  availableChannel: { '@type': 'ServiceChannel', serviceUrl: 'https://disasterrecovery.com.au/claim' },
};

export const metadata: Metadata = {
  title: 'Insurance Claims | All Insurers — Residential, Commercial, Marine & Aviation',
  description: 'Expert insurance claims assistance for disaster recovery. Work with all major Australian insurers — residential, commercial, industrial, marine, and aviation. Full claims documentation provided.',
  keywords: [
    'insurance claims assistance',
    'disaster recovery insurance',
    'commercial insurance claims',
    'industrial insurance claims',
    'marine insurance claims',
    'aviation insurance claims',
    'NRMA insurance claims',
    'Suncorp insurance claims',
    'Chubb insurance claims',
    'Zurich insurance claims',
    'AIG insurance claims',
    'QBE marine insurance',
    'insurance claims documentation',
    'water damage insurance',
    'fire damage insurance',
    'restoration insurance claims'
  ],
  openGraph: {
    title: 'Insurance Claims Assistance | All Australian Insurers',
    description: 'Expert help with disaster recovery insurance claims. Residential, commercial, industrial, marine, and aviation. Full claims documentation provided.',
    type: 'website',
    images: ['/images/generated/disaster-recovery/hero-insurance-claims.webp'],
  },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/insurance',
  },
};

const residentialProviders = [
  { name: 'NRMA', href: '/insurance/nrma' },
  { name: 'AAMI', href: '/insurance/aami' },
  { name: 'Suncorp', href: '/insurance/suncorp' },
  { name: 'Allianz', href: '/insurance/allianz' },
  { name: 'QBE', href: '/insurance/qbe' },
  { name: 'CGU', href: '/insurance/cgu' },
  { name: 'GIO', href: '/insurance/gio' },
  { name: 'RACV', href: '/insurance/racv' },
  { name: 'RACQ', href: '/insurance/racq' },
  { name: 'RAC', href: '/insurance/rac' },
  { name: 'RAA', href: '/insurance/raa' },
  { name: 'RACT', href: '/insurance/ract' },
  { name: 'SGIC', href: '/insurance/sgic' },
  { name: 'SGIO', href: '/insurance/sgio' },
  { name: 'Vero', href: '/insurance/vero' },
  { name: 'CommInsure', href: '/insurance/comminsure' },
  { name: 'Youi', href: '/insurance/youi' },
  { name: 'Budget Direct', href: '/insurance/budget-direct' },
  { name: 'Coles Insurance', href: '/insurance/coles-insurance' },
  { name: 'Woolworths Insurance', href: '/insurance/woolworths-insurance' },
  { name: 'Shannons', href: '/insurance/shannons' },
  { name: 'ANZ Insurance', href: '/insurance/anz-insurance' },
  { name: 'NAB Insurance', href: '/insurance/nab-insurance' },
  { name: 'Westpac Insurance', href: '/insurance/westpac-insurance' },
  { name: 'Terri Scheer', href: '/insurance/terri-scheer' },
  { name: 'Apia', href: '/insurance/apia' },
  { name: 'Elders Insurance', href: '/insurance/elders-insurance' },
  { name: 'SGUA', href: '/insurance/sgua' },
];

const heavyCommercialProviders = [
  { name: 'IAG', href: '/insurance/iag', desc: 'Insurance Australia Group — parent of NRMA, CGU, SGIO' },
  { name: 'Chubb', href: '/insurance/chubb', desc: 'Property, liability, engineering, multinational' },
  { name: 'Zurich', href: '/insurance/zurich', desc: 'Commercial lines, NM Insurance underwriter' },
  { name: 'AIG', href: '/insurance/aig', desc: 'Industrial, aerospace, large commercial' },
  { name: 'Liberty Specialty Markets', href: '/insurance/liberty-specialty', desc: 'Complex commercial risks' },
  { name: 'Berkshire Hathaway (BHSI)', href: '/insurance/berkshire-hathaway', desc: 'Large commercial property' },
  { name: 'FM Global', href: '/insurance/fm-global', desc: 'Industrial and manufacturing specialist' },
  { name: 'HDI Global', href: '/insurance/hdi-global', desc: 'Industrial, engineering, liability' },
  { name: 'Tokio Marine', href: '/insurance/tokio-marine', desc: 'Commercial property and liability' },
];

const mediumCommercialProviders = [
  { name: 'WFI', href: '/insurance/wfi', desc: 'IAG brand — rural and commercial property' },
  { name: 'Lumley', href: '/insurance/lumley', desc: 'IAG brand — intermediated commercial' },
  { name: 'Hollard', href: '/insurance/hollard', desc: 'Commercial and specialty lines' },
  { name: 'Marsh', href: '/insurance/marsh', desc: 'World\'s largest insurance broker' },
  { name: 'Aon', href: '/insurance/aon', desc: 'Major broker — 40+ niche schemes' },
  { name: 'Gallagher', href: '/insurance/gallagher', desc: 'Mid-market commercial broker' },
];

const marineProviders = [
  { name: 'NTI', href: '/insurance/nti', desc: 'National Transport Insurance specialist' },
  { name: 'NM Insurance', href: '/insurance/nm-insurance', desc: 'Zurich-backed marine underwriter' },
  { name: '360 Underwriting', href: '/insurance/360-underwriting', desc: 'Marine cargo and transit' },
  { name: 'Epsilon Insurance', href: '/insurance/epsilon-insurance', desc: 'Marine liability specialist' },
  { name: 'QBE Marine', href: '/insurance/qbe-marine', desc: 'Cargo, hull and marine liability' },
  { name: 'Chubb Marine', href: '/insurance/chubb-marine', desc: 'Ship builders, freight forwarders' },
  { name: 'Allianz Marine', href: '/insurance/allianz-marine', desc: 'All marine operator types' },
  { name: 'Coverforce', href: '/insurance/coverforce', desc: 'Marine industry broker' },
];

const aviationProviders = [
  { name: 'QBE Aviation', href: '/insurance/qbe-aviation', desc: 'Aircraft hull and liability' },
  { name: 'Chubb Aviation', href: '/insurance/chubb-aviation', desc: 'Hull flight risks, aviation liability' },
  { name: 'AIG Aerospace', href: '/insurance/aig-aerospace', desc: 'Global aerospace leader' },
  { name: 'Global Aerospace', href: '/insurance/global-aerospace', desc: 'Berkshire Hathaway specialist' },
  { name: 'Allianz Aviation', href: '/insurance/allianz-aviation', desc: 'Corporate aircraft, airlines, airports' },
  { name: 'Shielded Insurance', href: '/insurance/shielded-aviation', desc: 'Australian aviation specialist' },
];

function ProviderGrid({ providers }: { providers: { name: string; href: string; desc?: string }[] }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginTop: '1.5rem' }}>
      {providers.map((p) => (
        <Link key={p.href} href={p.href} style={{ display: 'block', padding: '1rem 1.25rem', background: 'rgba(255,255,255,0.05)', borderRadius: '0.5rem', border: '1px solid rgba(255,255,255,0.1)', textDecoration: 'none', color: 'inherit' }}>
          <strong style={{ color: '#60a5fa' }}>{p.name}</strong>
          {p.desc && <span style={{ display: 'block', fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.25rem' }}>{p.desc}</span>}
        </Link>
      ))}
    </div>
  );
}

const tierSections = [
  {
    heading: 'Residential & Personal Lines',
    body: (
      <>
        <p>
          We work with all major Australian residential insurers. Whether your home, unit, or
          investment property has suffered water, fire, storm, or mould damage — we provide full
          claims documentation to support your reimbursement.
        </p>
        <ProviderGrid providers={residentialProviders} />
      </>
    ),
  },
  {
    heading: 'Commercial & Industrial Insurance',
    background: 'light' as const,
    body: (
      <>
        <p>
          From office fit-outs to manufacturing plants, warehouses to high-rise commercial towers —
          our IICRC-certified contractors handle commercial claims of any scale. We understand
          business interruption, multi-site coordination, and industrial compliance requirements.
        </p>
        <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Heavy Commercial & Industrial</h3>
        <ProviderGrid providers={heavyCommercialProviders} />
        <h3 style={{ marginTop: '2rem', marginBottom: '0.5rem' }}>Mid-Market Commercial & Brokers</h3>
        <ProviderGrid providers={mediumCommercialProviders} />
      </>
    ),
  },
  {
    heading: 'Marine & Transport Insurance',
    body: (
      <>
        <p>
          Vessel damage, cargo contamination, port facility restoration, and maritime infrastructure
          recovery. Our contractors are equipped for both land-side and vessel-side marine operations
          across all Australian ports.
        </p>
        <ProviderGrid providers={marineProviders} />
      </>
    ),
  },
  {
    heading: 'Aviation & Aerospace Insurance',
    background: 'light' as const,
    body: (
      <>
        <p>
          Hangar fire damage, terminal restoration, MRO facility recovery, and aircraft storage
          environment decontamination. We work with CASA compliance requirements and coordinate
          airside access for restoration crews.
        </p>
        <ProviderGrid providers={aviationProviders} />
      </>
    ),
  },
];

export default function InsurancePage() {
  const schemaStr = JSON.stringify(serviceSchema);
  const baseSections = getInsuranceSections({ insurerName: 'Insurance Partners', insurerSlug: 'insurance' });
  const allSections = [...baseSections, ...tierSections];

  return (
    <>
      <Script id="insurance-schema" type="application/ld+json" dangerouslySetInnerHTML={{ __html: schemaStr }} />
      <AgContentPageTemplate
        hero={{
          gradient: 'linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)',
          heroImage: '/images/generated/disaster-recovery/hero-insurance-claims.webp',
          icon: <Shield className="h-12 w-12" />,
          title: 'Insurance Claims Assistance',
          subtitle: 'Every insurer. Every industry. From residential homes to offshore rigs — full claims documentation for all Australian insurance providers.',
        }}
        cta={{ text: 'Get Emergency Help', href: '/claim' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Insurance Claims Assistance' },
        ]}
        sections={allSections}
        relatedPages={getRelatedPages('insurance')}
      />
    </>
  );
}

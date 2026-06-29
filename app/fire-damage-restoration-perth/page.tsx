import { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Fire Damage Restoration Perth | IICRC S700:2025 Certified Emergency',
  description: 'Emergency fire damage restoration across Perth and Western Australia. IICRC S700:2025 certified contractors for fire, smoke, soot, and bushfire damage. priority response. Lodge your claim 24/7.',
  keywords: 'fire damage restoration perth, fire damage perth, smoke damage perth, bushfire damage perth WA, soot damage perth, fire restoration perth, house fire perth WA',
  openGraph: {
    title: 'Fire Damage Restoration Perth | IICRC S700:2025 Certified Emergency',
    description: 'Emergency fire damage restoration across Perth and Western Australia. IICRC S700:2025 certified contractors for fire, smoke, soot, and bushfire damage. priority response. Lodge your claim 24/7.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('Fire Damage Restoration')}&city=${encodeURIComponent('Perth')}&service=fire-damage-restoration`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/fire-damage-restoration-perth`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${NAP.url}/fire-damage-restoration-perth/#localbusiness`,
  name: `${NAP.name} Perth`,
  url: `${NAP.url}/fire-damage-restoration-perth`,
  description: 'Emergency fire damage restoration across Perth and Western Australia. IICRC S700:2025 certified contractor network for fire, smoke, soot, and bushfire structural damage.',
  image: NAP.ogImage,
  priceRange: NAP.priceRange,
  areaServed: { '@type': 'City', name: 'Perth', containedInPlace: { '@type': 'State', name: 'Western Australia' } },
  address: { '@type': 'PostalAddress', addressLocality: 'Perth', addressRegion: 'WA', addressCountry: 'AU' },
  openingHoursSpecification: { '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' },
  parentOrganization: { '@id': `${NAP.url}/#organization` },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Fire Damage Restoration Perth',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'City', name: 'Perth', containedInPlace: { '@type': 'State', name: 'Western Australia' } },
  serviceType: 'Fire Damage Restoration',
  description: 'Professional fire and smoke damage restoration across Perth and Western Australia including emergency structural make-safe, soot removal, odour elimination, bushfire damage assessment, and full rebuild.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does WA home insurance cover bushfire damage?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — the fire provision in standard WA policies covers direct bushfire damage to building and contents. Ember attack is covered under the fire peril. Document all visible damage — ember entry points, heat damage to roof cavities, and any structural charring — before any emergency work begins.' },
    },
    {
      '@type': 'Question',
      name: 'Can I claim for smoke damage from a nearby Perth bushfire?',
      acceptedAnswer: { '@type': 'Answer', text: 'Yes — smoke damage without direct fire contact is covered under the fire and smoke provisions of most standard policies. Document the smoke source — BOM records and media coverage confirm the event date and proximity. Photograph all affected surfaces including roof spaces and HVAC intake vents.' },
    },
    {
      '@type': 'Question',
      name: 'How long does fire damage restoration take in Perth?',
      acceptedAnswer: { '@type': 'Answer', text: 'Minor smoke and soot damage: 1–2 weeks. Moderate structural fire damage: 4–8 weeks. Major or total loss: 3–12 months. Timeline depends on structural scope and insurer approval. NRPG provides a project timeline as part of the initial S700:2025 assessment scope.' },
    },
    {
      '@type': 'Question',
      name: 'Why use IICRC S700:2025 certified contractors for Perth fire damage?',
      acceptedAnswer: { '@type': 'Answer', text: "S700:2025 governs restoration methodology — thermal fogging for odour, HEPA filtration for smoke particulates, and specific protocols suited to Perth's dry Mediterranean climate. Insurers require S700 documentation for claim sign-off. Non-certified contractors cannot produce the scope documentation needed for insurer approval." },
    },
  ],
};

export default function FireDamageRestorationPerthPage() {
  return (
    <>
      {/* All schema data below is trusted static content — safe to inject */}
      <Script id="fdrperth-localbusiness" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Script id="fdrperth-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="fdrperth-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Fire Damage"
        title="Fire Damage Restoration Perth"
        subtitle="Emergency fire damage restoration across Perth and Western Australia. IICRC S700:2025 certified contractors for fire, smoke, soot, and bushfire structural damage. priority response."
        gradient="linear-gradient(135deg, #1A0800 0%, #D84315 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Fire Damage', href: '/services/fire-damage' },
          { label: 'Perth' },
        ]}
        sections={[
          {
            heading: 'Fire Damage in Perth — Urban and Bushfire Risk',
            body: (
              <>
                <p>
                  Perth is one of Australia&apos;s most bushfire-exposed capital cities. The Perth Hills &mdash;
                  Kalamunda, Bickley, Mundaring, Roleystone &mdash; are classified High and Extreme BAL (Bushfire
                  Attack Level) zones. The January 2023 Oakford fire and the 2014 Parkerville&ndash;Stoneville fire
                  caused significant structural damage across Perth&apos;s urban fringe.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Urban house fires in Perth are driven by ageing electrical infrastructure in established inner
                  suburbs (Subiaco, Mount Lawley, Victoria Park) and summer heat causing thermal stress failures in
                  electrical systems. Perth&apos;s dry Mediterranean climate means fire spreads faster and smoke
                  lingers longer than in eastern states.
                </p>
              </>
            ),
          },
          {
            heading: 'Bushfire Smoke — Whole-of-Perth Events',
            body: (
              <>
                <p>
                  Perth&apos;s geography &mdash; a coastal city backed by the Darling Scarp &mdash; means bushfire
                  smoke from Hills fires frequently blankets the metropolitan area. Properties that are not in the
                  direct fire zone can still sustain IICRC S700:2025-scope smoke damage requiring professional
                  remediation: PM2.5 particulates in roof spaces, HVAC contamination, soot on porous surfaces
                  (brick, plasterboard, timber), and persistent odour that standard cleaning cannot eliminate.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Lodge smoke damage claims even if your property was not directly threatened &mdash; smoke
                  contamination is a covered peril under most WA home insurance policies.
                </p>
              </>
            ),
          },
          {
            heading: 'Perth Suburbs We Cover',
            body: (
              <>
                <p>
                  priority emergency response across all Perth suburbs for fire damage make-safe and structural
                  assessment.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Inner City:</strong> Perth CBD, Northbridge, Leederville, Subiaco, Mount Lawley, Highgate
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Coastal North:</strong> Scarborough, Trigg, City Beach, Floreat, Claremont, Cottesloe
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Northern Corridor:</strong> Joondalup, Wanneroo, Burns Beach, Mindarie
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Eastern/Hills:</strong> Kalamunda, Bickley, Mundaring, Midland, Swan Valley (fire risk
                  zone &mdash; 60-min)
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Southern:</strong> Fremantle, Cockburn, Success, Rockingham
                </p>
                <p style={{ marginTop: '0.5rem' }}>
                  <strong>Armadale/Hills South:</strong> Armadale, Byford, Serpentine, Roleystone (fire fringe
                  &mdash; 60-min)
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does WA home insurance cover bushfire damage?',
            answer: 'Yes — the fire provision in standard WA policies covers direct bushfire damage to building and contents. Ember attack is covered under the fire peril. Document all visible damage — ember entry points, heat damage to roof cavities, and any structural charring — before any emergency work begins.',
          },
          {
            question: 'Can I claim for smoke damage from a nearby Perth bushfire?',
            answer: 'Yes — smoke damage without direct fire contact is covered under the fire and smoke provisions of most standard policies. Document the smoke source — BOM records and media coverage confirm the event date and proximity. Photograph all affected surfaces including roof spaces and HVAC intake vents.',
          },
          {
            question: 'How long does fire damage restoration take in Perth?',
            answer: 'Minor smoke and soot damage: 1–2 weeks. Moderate structural fire damage: 4–8 weeks. Major or total loss: 3–12 months. Timeline depends on structural scope and insurer approval. NRPG provides a project timeline as part of the initial S700:2025 assessment scope.',
          },
          {
            question: 'Why use IICRC S700:2025 certified contractors for Perth fire damage?',
            answer: 'S700:2025 governs restoration methodology — thermal fogging for odour, HEPA filtration for smoke particulates, and specific protocols suited to Perth\'s dry Mediterranean climate. Insurers require S700 documentation for claim sign-off. Non-certified contractors cannot produce the scope documentation needed for insurer approval.',
          },
        ]}
        relatedGuides={[
          { title: 'Storm Damage Restoration Perth', href: '/storm-damage-restoration-perth', description: 'Perth storm damage — wind, hail, and structural repairs.' },
          { title: 'Water Damage Restoration Perth', href: '/water-damage-restoration-perth', description: 'Fire suppression and storm water damage — IICRC-certified restoration.' },
          { title: 'Fire Damage Restoration Melbourne', href: '/fire-damage-restoration-melbourne', description: 'IICRC S700:2025 fire restoration in Melbourne.' },
        ]}
        cta={{ text: 'Get Emergency Help Now', href: '/claim' }}
      />
    </>
  );
}

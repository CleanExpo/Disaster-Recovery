/**
 * AntigravityCommercialSection — Homepage commercial stakeholder cards
 * Links to Tier 1 stakeholder landing pages (/for/property-managers, etc.)
 */

import Link from 'next/link';

const stakeholderCards = [
  {
    title: 'Property Managers',
    pain: 'Tenant calling at 2am? We respond within 60 minutes and handle everything — documentation, coordination, owner reporting.',
    cta: 'Set Up Emergency Protocol',
    href: '/for/property-managers',
  },
  {
    title: 'Strata Managers',
    pain: 'Common property damage affecting multiple lots? We coordinate the entire restoration and provide per-lot documentation for your committee.',
    cta: 'Report Common Property Damage',
    href: '/for/strata-managers',
  },
  {
    title: 'Business Owners',
    pain: 'Every hour closed costs revenue. We get work started immediately so you can get back to trading — no waiting for insurer approval.',
    cta: 'Get Your Business Back Trading',
    href: '/for/business-owners',
  },
];

export function AntigravityCommercialSection() {
  return (
    <section className="ag-commercial-section">
      <div className="ag-container">
        <div className="ag-section-header">
          <h2>Trusted by Property Managers, Strata Managers &amp; Business Owners Across Australia</h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.125rem', maxWidth: 700, margin: '0 auto' }}>
            Commercial property damage requires a different approach — faster response, professional documentation, and clear communication with all stakeholders.
          </p>
        </div>

        <div className="ag-commercial-grid">
          {stakeholderCards.map((card) => (
            <Link key={card.href} href={card.href} className="ag-commercial-card">
              <h3>{card.title}</h3>
              <p>{card.pain}</p>
              <span className="ag-commercial-card-cta">
                {card.cta}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>
              </span>
            </Link>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
          <Link href="/for-business" className="ag-commercial-hub-link">
            View all commercial services →
          </Link>
        </div>
      </div>
    </section>
  );
}

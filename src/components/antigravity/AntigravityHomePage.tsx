'use client';

/**
 * AntigravityHomePage — Full homepage composition
 * Client Component — required for next/dynamic with ssr:false (Next.js 15).
 * BeforeAfterSlider is deferred (ssr:false) to remove its JS from the critical path.
 */

import dynamic from 'next/dynamic';
import { AntigravityNavbar } from './AntigravityNavbar';
import { AntigravityHero } from './AntigravityHero';
import { AntigravityQuickAssessment } from './AntigravityQuickAssessment';
import { AntigravityTrustBanner } from './AntigravityTrustBanner';
import { AntigravityRecoveryProcess } from './AntigravityRecoveryProcess';
import { AntigravityServicePillarCard } from './AntigravityServicePillarCard';
import { AntigravityBrandEquipment } from './AntigravityBrandEquipment';
import { AntigravityCommercialSection } from './AntigravityCommercialSection';
import { AntigravityContractorNetworkCTA } from './AntigravityContractorNetworkCTA';
import { AntigravityFooter } from './AntigravityFooter';

// Deferred — drag/touch JS removed from critical path. SSR still renders placeholder height.
const AntigravityBeforeAfterSlider = dynamic(
  () => import('./AntigravityBeforeAfterSlider').then((m) => m.AntigravityBeforeAfterSlider),
  { ssr: false, loading: () => <div style={{ height: '500px', background: '#0f2942' }} /> }
);

const servicePillars = [
  {
    title: 'Water & Flood Restoration',
    description: 'Emergency water extraction, structural drying, and flood damage recovery.',
    imageSrc: '/images/generated/disaster-recovery/service-water-extraction.webp',
    certBadge: 'IICRC S500:2025',
    href: '/services/water-damage-restoration',
  },
  {
    title: 'Fire & Smoke Remediation',
    description: 'Fire damage restoration, smoke odour removal, and structural cleaning.',
    imageSrc: '/images/generated/disaster-recovery/service-fire-restoration.webp',
    certBadge: 'IICRC FSRT',
    href: '/services/fire-damage-restoration',
  },
  {
    title: 'Mould & Air Quality',
    description: 'Professional mould remediation and indoor air quality restoration.',
    imageSrc: '/images/generated/disaster-recovery/service-mould-remediation.webp',
    certBadge: 'IICRC S520:2025',
    href: '/services/mould-remediation',
  },
  {
    title: 'Precision Laser Cleaning',
    description: 'Non-abrasive restoration laser vaporisation for smoke, soot, and historic brickwork recovery.',
    imageSrc: '/images/generated/disaster-recovery/service-laser-cleaning.webp',
    certBadge: 'Advanced Tech',
    href: '/services/laser-cleaning',
  },
];

export function AntigravityHomePage() {
  return (
    <>
      <AntigravityNavbar />
      <AntigravityHero />
      <AntigravityBeforeAfterSlider />
      <AntigravityQuickAssessment />
      <AntigravityTrustBanner />
      <AntigravityRecoveryProcess />

      {/* Service Pillars */}
      <section className="ag-services-overview ag-container">
        <div className="ag-section-header">
          <h2>Complete Disaster Recovery Services</h2>
          <p style={{ color: 'var(--ag-text-muted)', fontSize: '1.125rem', maxWidth: 600, margin: '0 auto' }}>
            IICRC-certified restoration for every emergency scenario across Australia and New Zealand.
          </p>
        </div>
        <div className="ag-services-grid">
          {servicePillars.map((service) => (
            <AntigravityServicePillarCard key={service.href} {...service} />
          ))}
        </div>
      </section>

      <AntigravityCommercialSection />
      <AntigravityBrandEquipment />
      <AntigravityContractorNetworkCTA />
      <AntigravityFooter />
    </>
  );
}

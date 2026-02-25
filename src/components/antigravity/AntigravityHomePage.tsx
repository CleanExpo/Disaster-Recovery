'use client';

/**
 * AntigravityHomePage — Full homepage composition
 * Renders all Antigravity sections in the correct order.
 */

import { AntigravityNavbar } from './AntigravityNavbar';
import { AntigravityHero } from './AntigravityHero';
import { AntigravityBeforeAfterSlider } from './AntigravityBeforeAfterSlider';
import { AntigravityQuickAssessment } from './AntigravityQuickAssessment';
import { AntigravityTrustBanner } from './AntigravityTrustBanner';
import { AntigravityRecoveryProcess } from './AntigravityRecoveryProcess';
import { AntigravityServicePillarCard } from './AntigravityServicePillarCard';
import { AntigravityBrandEquipment } from './AntigravityBrandEquipment';
import { AntigravityCommercialSection } from './AntigravityCommercialSection';
import { AntigravityContractorNetworkCTA } from './AntigravityContractorNetworkCTA';
import { AntigravityFooter } from './AntigravityFooter';

const servicePillars = [
  {
    title: 'Water & Flood Restoration',
    description: 'Emergency water extraction, structural drying, and flood damage recovery.',
    imageSrc: '/images/generated/disaster-recovery/service-water-extraction.webp',
    certBadge: 'IICRC S500',
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
    certBadge: 'IICRC S520',
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

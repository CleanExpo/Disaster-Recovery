'use client';

/**
 * AntigravityHero — full-bleed first viewport: brand, one headline, one supporting line, CTAs.
 * Path A: DR routes; contractors bill clients directly.
 */

import Link from 'next/link';
import Image from 'next/image';

export function AntigravityHero() {
  return (
    <section className="ag-hero-container">
      <div className="ag-hero-background">
        <div className="ag-environmental-overlay" />
        <div className="ag-hero-image-wrap">
          <Image
            src="/images/antigravity/hero-aussie-tech-van.webp"
            alt="Professional disaster recovery technician arriving at an Australian property"
            fill
            priority
            fetchPriority="high"
            style={{ objectFit: 'cover', objectPosition: 'center 30%' }}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
          />
        </div>
      </div>

      <div className="ag-container ag-hero-content-grid">
        <div className="ag-hero-text-block">
          <p className="ag-hero-brand-mark ag-slide-up-1" aria-label="Disaster Recovery">
            Disaster Recovery
          </p>

          <h1 className="ag-hero-h1 ag-slide-up-2">
            Policyholder first.
            <br />
            <span className="ag-gradient-text">Always.</span>
          </h1>

          <p className="ag-hero-subtext ag-slide-up-3">
            Lodge a claim and we connect you with IICRC-certified contractors who bill you
            directly — we route the work; we do not hold client funds.
          </p>

          <div className="ag-hero-actions ag-slide-up-4">
            <Link href="/claim" className="ag-btn-primary-glow" style={{ minHeight: 48 }}>
              Lodge a claim
            </Link>
            <Link href="/contractor/apply" className="ag-btn-glass" style={{ minHeight: 48 }}>
              Join as contractor
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

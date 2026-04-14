'use client';

/**
 * AntigravityHero — Cinematic hero with glassmorphic trust orbs
 * Converted from Hero.astro
 *
 * CTAs:
 *   "Secure Connection" -> /claim
 *   "Lodge a Claim"     -> /claim
 */

import Link from 'next/link';
import Image from 'next/image';

export function AntigravityHero() {
  return (
    <section className="ag-hero-container">
      {/* Background image with overlay */}
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
        {/* Left column — Typography */}
        <div className="ag-hero-text-block">
          <div className="ag-status-pill ag-slide-up-1">
            <span className="ag-pulse-dot" />
            Policyholder-first disaster recovery across Australia
          </div>

          <h1 className="ag-hero-h1 ag-slide-up-2">
            Who First.<br />
            <span className="ag-gradient-text">Policyholder first, always.</span>
          </h1>

          <p className="ag-hero-national-tagline ag-slide-up-2" style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: '#fff',
            letterSpacing: '0.03em',
            marginBottom: '0.25rem',
          }}>
            We work for you, not your insurer. Every day, until you're whole again.
          </p>

          <p className="ag-hero-subtext ag-slide-up-3">
            When disaster strikes, every minute counts. Connect with IICRC-certified restoration specialists
            who document everything to insurance standard — and answer to you, not the insurer.
          </p>

          <div className="ag-hero-actions ag-slide-up-4">
            <Link href="/claim" className="ag-btn-primary-glow">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              Make a Claim
            </Link>
            <Link href="/contractor/login" className="ag-btn-glass">
              Contractor Login
            </Link>
          </div>
        </div>

        {/* Right column — Trust orbs */}
        <div className="ag-hero-trust-block ag-slide-up-5">
          <div className="ag-glass-orb">
            <div className="ag-orb-icon">
              <Image src="/images/antigravity/icon_3d_stopwatch.webp" alt="Fast Response" width={48} height={48} draggable={false} />
            </div>
            <div className="ag-orb-text">
              <strong>Priority Response</strong>
              <span>Emergency Dispatch</span>
            </div>
          </div>

          <div className="ag-glass-orb">
            <div className="ag-orb-icon">
              <Image src="/images/antigravity/icon_3d_shield.webp" alt="IICRC Certified" width={48} height={48} draggable={false} />
            </div>
            <div className="ag-orb-text">
              <strong>IICRC Certified</strong>
              <span>Flexible Payment Options</span>
            </div>
          </div>

          <div className="ag-glass-orb">
            <div className="ag-orb-icon">
              <Image src="/images/antigravity/icon_3d_certificate.webp" alt="Certified Contractors" width={48} height={48} draggable={false} />
            </div>
            <div className="ag-orb-text">
              <strong>IICRC Certified</strong>
              <span>Elite NRPG Contractors</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

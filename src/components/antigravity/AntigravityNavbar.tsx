'use client';

/**
 * AntigravityNavbar — Sticky header with top bar, nav links, emergency CTA
 * Converted from EmergencyNavbar.astro with mobile menu toggle added
 *
 * Route mapping:
 *   /contractor-portal -> /contractor/login
 *   /report-claim      -> /claim
 *   /portal/connect    -> /claim
 */

import { useState } from 'react';
import Link from 'next/link';

export function AntigravityNavbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="ag-navbar-wrapper">
      {/* Top Bar */}
      <div className="ag-top-bar">
        <div className="ag-container ag-top-bar-content">
          <span className="ag-coverage-text">
            ANZ&apos;s Trusted Disaster Recovery Network
          </span>
          <div className="ag-top-links">
            <Link href="/contractor/login">Contractor Portal</Link>
            <Link href="/claim">Report a Claim</Link>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <nav className="ag-container ag-main-nav">
        <div className="ag-logo">
          <Link href="/">
            <div className="ag-logo-mark">
              <svg
                viewBox="0 0 80 32"
                className="ag-heartbeat-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 2 18 h 8 l 4 -10 l 7 20 l 6 -26 l 4 16 h 5"
                  fill="none"
                  stroke="var(--ag-emergency-red)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="36" cy="18" r="2.5" fill="var(--ag-emergency-red)" />
                <text x="40" y="26" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="24" fill="var(--ag-emergency-red)">D</text>
                <text x="58" y="26" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="24" fill="#a0aab2">R</text>
              </svg>
            </div>
            <div className="ag-logo-text">
              <span className="ag-logo-title">Disaster Recovery</span>
              <span className="ag-logo-subtitle">Rapid Response. Resilient Future.</span>
            </div>
          </Link>
        </div>

        <div className="ag-nav-links">
          <Link href="/services">Services</Link>
          <Link href="/locations">Locations</Link>
          <Link href="/about">About NRPG</Link>
        </div>

        <div className="ag-emergency-action">
          <Link href="/claim" className="ag-btn-emergency">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
            Make a Claim
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="ag-mobile-menu-btn"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
          )}
        </button>
      </nav>

      {/* Mobile nav drawer */}
      <div className={`ag-mobile-nav ${mobileOpen ? 'ag-mobile-nav-open' : ''}`}>
        <Link href="/services" onClick={() => setMobileOpen(false)}>Services</Link>
        <Link href="/locations" onClick={() => setMobileOpen(false)}>Locations</Link>
        <Link href="/about" onClick={() => setMobileOpen(false)}>About NRPG</Link>
        <Link href="/contractor/login" onClick={() => setMobileOpen(false)}>Contractor Portal</Link>
        <Link href="/claim" onClick={() => setMobileOpen(false)}>Report a Claim</Link>
        <Link href="/claim" className="ag-btn-emergency" onClick={() => setMobileOpen(false)}>
          Make a Claim
        </Link>
      </div>
    </header>
  );
}

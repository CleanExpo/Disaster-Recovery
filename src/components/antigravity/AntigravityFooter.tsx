/**
 * AntigravityFooter — 4-column grid footer with brand, company, services, locations
 * Converted from Footer.astro — all links use Next.js Link
 */

import Link from 'next/link';

export function AntigravityFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="ag-site-footer">
      <div className="ag-container ag-footer-grid">
        {/* Brand column */}
        <div className="ag-footer-brand">
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
          <p className="ag-brand-desc">
            Rapid Response. Resilient Future. Connecting property owners with certified
            restoration professionals across Australia and New Zealand.
          </p>
          <div className="ag-footer-badges">
            <span className="ag-badge">IICRC Certified</span>
            <span className="ag-badge">Insurance-Compliant Documentation</span>
          </div>
          <div className="ag-footer-social">
            <a href="https://www.reddit.com/r/Disaster_Recovery_Qld/" target="_blank" rel="noopener noreferrer" aria-label="Reddit">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 3.314 1.343 6.314 3.515 8.485l-.014.014.015.015C5.687 22.658 8.687 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm6.378 13.776a2.09 2.09 0 0 1-.078.588 2.108 2.108 0 0 1-.598 1.003c-.37.348-.862.582-1.44.69-.576.107-1.236.09-1.968-.066a8.04 8.04 0 0 1-2.294-.942 8.04 8.04 0 0 1-2.294.942c-.732.157-1.392.173-1.968.066-.578-.108-1.07-.342-1.44-.69a2.108 2.108 0 0 1-.598-1.003 2.09 2.09 0 0 1-.078-.588c0-.393.108-.762.302-1.08a2.1 2.1 0 0 1-.106-.656c0-.831.485-1.588 1.27-2.15.78-.558 1.86-.932 3.058-1.044a2.603 2.603 0 0 1 1.507-1.794 2.604 2.604 0 0 1 .345-.127l.79-2.87a.506.506 0 0 1 .593-.356l2.163.454a1.542 1.542 0 1 1-.192.884l-1.82-.382-.589 2.141c1.09.152 2.063.527 2.778 1.07.785.562 1.27 1.319 1.27 2.15 0 .227-.037.446-.106.656.194.318.302.687.302 1.08zm-9.93-.803a1.297 1.297 0 1 0 0 2.594 1.297 1.297 0 0 0 0-2.594zm5.104 0a1.297 1.297 0 1 0 0 2.594 1.297 1.297 0 0 0 0-2.594zm-4.907 3.588c.116.116.37.262.774.362.404.1.924.148 1.581.038a6.74 6.74 0 0 0 1.924-.69 6.74 6.74 0 0 0 1.924.69c.657.11 1.177.062 1.581-.038.404-.1.658-.246.774-.362a.407.407 0 0 1 .575.575c-.23.23-.604.432-1.1.555-.496.123-1.117.167-1.826.038a7.545 7.545 0 0 1-1.928-.716 7.545 7.545 0 0 1-1.928.716c-.709.129-1.33.085-1.826-.038-.496-.123-.87-.325-1.1-.555a.407.407 0 0 1 .575-.575z"/></svg>
            </a>
            <a href="https://facebook.com/DisasterRecoveryAU" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
            <a href="https://youtube.com/@DisasterRecoveryAU" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="https://linkedin.com/company/disaster-recovery-au" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
        </div>

        {/* Company column */}
        <div className="ag-footer-nav">
          <h4>Company</h4>
          <Link href="/about">About NRPG</Link>
          <Link href="/how-it-works">How It Works</Link>
          <Link href="/blog">Blog &amp; Resources</Link>
          <Link href="/claim">Make a Claim</Link>
          <Link href="/admin">Admin</Link>
        </div>

        {/* Services column */}
        <div className="ag-footer-nav">
          <h4>Services</h4>
          <Link href="/services/water-damage-restoration">Water Damage</Link>
          <Link href="/services/fire-damage-restoration">Fire &amp; Smoke</Link>
          <Link href="/services/storm-damage-restoration">Storm Damage</Link>
          <Link href="/services/mould-remediation">Mould Remediation</Link>
          <Link href="/services/biohazard-cleaning">Biohazard Cleanup</Link>
        </div>

        {/* Locations column */}
        <div className="ag-footer-nav">
          <h4>Major Locations</h4>
          <Link href="/locations/sydney">Sydney</Link>
          <Link href="/locations/melbourne">Melbourne</Link>
          <Link href="/locations/brisbane">Brisbane</Link>
          <Link href="/locations/perth">Perth</Link>
          <Link href="/locations/auckland">Auckland</Link>
        </div>
      </div>

      <div className="ag-footer-bottom ag-container">
        <div className="ag-copyright">
          &copy; {currentYear} Disaster Recovery Australia. All rights reserved.
          Powered by National Recovery Platform Group (NRPG).
        </div>
        <div className="ag-legal-links">
          <Link href="/terms">Terms of Service</Link>
          <Link href="/privacy">Privacy Policy</Link>
        </div>
      </div>
    </footer>
  );
}

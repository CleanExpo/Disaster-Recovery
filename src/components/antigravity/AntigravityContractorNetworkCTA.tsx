/**
 * AntigravityContractorNetworkCTA — Dark section with glass panel
 * Converted from ContractorNetworkCTA.astro
 *
 * CTAs:
 *   "Apply to Join" -> /contractor/apply
 *   "Portal Login"  -> /contractor/login
 */

import Link from 'next/link';

export function AntigravityContractorNetworkCTA() {
  return (
    <section className="ag-network-cta">
      <div className="ag-cta-background" />
      <div className="ag-container ag-cta-content-grid">
        <div className="ag-cta-text">
          <h2>Now Accepting Applications for the NRPG Network</h2>
          <p>
            Become part of the premier network of IICRC-certified disaster recovery
            professionals across ANZ. Gain access to pre-vetted, insurance-backed
            restoration projects in your designated area.
          </p>

          <ul className="ag-benefits-list">
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
              Qualified Lead Generation
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
              Guaranteed Fast Payment
            </li>
            <li>
              <svg viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><polyline points="20 6 9 17 4 12" /></svg>
              Comprehensive Business Support
            </li>
          </ul>

          <div className="ag-cta-actions">
            <Link href="/contractor/apply" className="ag-btn-primary-glow">
              Apply to Join Network
            </Link>
            <Link href="/contractor/login" className="ag-btn-glass">
              Contractor Portal Login
            </Link>
          </div>
        </div>

        <div className="ag-glass-panel">
          <h3>Minimum Requirements</h3>
          <ul className="ag-req-list">
            <li>IICRC certification (S500:2025, S520:2025, or FSRT minimum)</li>
            <li>Current liability insurance ($1M+ coverage)</li>
            <li>Established business with 2+ years experience</li>
            <li>Clean safety record and verified references</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

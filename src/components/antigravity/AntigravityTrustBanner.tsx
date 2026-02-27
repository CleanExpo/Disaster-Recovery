/**
 * AntigravityTrustBanner — Infinite CSS marquee of insurer logos
 * Converted from TrustBanner.astro — Server Component
 */

const insurers = [
  'NRMA Insurance', 'Suncorp', 'AAMI', 'Allianz', 'QBE', 'RACV',
  'CGU', 'GIO', 'RACQ', 'Vero', 'CommInsure', 'Youi',
];

export function AntigravityTrustBanner() {
  return (
    <div className="ag-trust-banner-wrapper">
      <div className="ag-container">
        <p className="ag-trust-label">
          Trusted by property owners for claims documentation &amp; fast response:
        </p>
      </div>

      <div className="ag-marquee-container">
        <div className="ag-marquee-track">
          {/* Tripled for seamless infinite loop on wide screens */}
          {[...insurers, ...insurers, ...insurers].map((name, i) => (
            <div key={i} className="ag-logo-item">
              {name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

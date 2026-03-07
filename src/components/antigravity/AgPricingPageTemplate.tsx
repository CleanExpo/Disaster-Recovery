import Link from 'next/link';
import { DollarSign, MapPin } from 'lucide-react';
import { AntigravityNavbar } from './AntigravityNavbar';
import { AntigravityFooter } from './AntigravityFooter';

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export interface PriceRange {
  type: string;
  range: string;
  description: string;
}

export interface PricingFactor {
  factor: string;
  impact: string;
  example: string;
}

export interface CostBreakdownItem {
  label: string;
  amount: string;
  isTotal?: boolean;
}

export interface AgPricingPageTemplateProps {
  cityName: string;
  stateName: string;
  serviceName: string;
  minimumCallout: string;
  averageCost: string;
  insuranceCoverage: string;
  priceRanges: PriceRange[];
  pricingFactors: PricingFactor[];
  costBreakdown?: CostBreakdownItem[];
  fallback?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * AgPricingPageTemplate — Template for city x service pricing pages.
 * Renders AG-styled pricing with stat cards, range grid, factors, and breakdown.
 */
export function AgPricingPageTemplate({
  cityName,
  stateName,
  serviceName,
  minimumCallout,
  averageCost,
  insuranceCoverage,
  priceRanges,
  pricingFactors,
  costBreakdown,
}: AgPricingPageTemplateProps) {
  return (
    <>
      <AntigravityNavbar />

      {/* Hero */}
      <header className="ag-service-header" style={{ padding: '6rem 0 4rem' }}>
        <div
          className="ag-header-overlay"
          style={{ background: 'linear-gradient(135deg, #0F2942 0%, #1A5C3A 60%, #0F2942 100%)' }}
        />
        <div className="ag-container ag-header-content" style={{ maxWidth: '900px' }}>
          <nav className="ag-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/pricing">Pricing</Link> / <Link href={`/pricing/${cityName.toLowerCase().replace(/\s+/g, '-')}`}>{cityName}</Link> / <span>{serviceName}</span>
          </nav>

          <div className="ag-slide-up-1" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.8)', marginBottom: '0.5rem' }}>
            <span className="ag-icon-inline" style={{ color: 'rgba(255,255,255,0.8)' }}><MapPin size={20} /></span> {cityName}, {stateName}
          </div>

          <h1 className="ag-slide-up-2">{serviceName} Cost in {cityName}</h1>

          <p className="ag-lead-text ag-slide-up-3" style={{ borderLeft: 'none' }}>
            Transparent pricing with no hidden fees. Full claims documentation provided.
          </p>
        </div>
      </header>

      {/* Stat Cards */}
      <section style={{ padding: '3rem 1.5rem', background: 'var(--ag-background-light)', marginTop: '-2rem', position: 'relative', zIndex: 5 }}>
        <div className="ag-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', maxWidth: '800px', margin: '0 auto' }}>
            <div className="ag-card-stat" style={{ textAlign: 'center' }}>
              <div className="ag-card-feature-icon" style={{ marginBottom: '0.25rem' }}>
                <DollarSign size={24} style={{ color: 'var(--ag-secondary-blue)' }} />
              </div>
              <span className="ag-stat-value">{minimumCallout}</span>
              <span className="ag-stat-label">Minimum Callout</span>
            </div>
            <div className="ag-card-stat" style={{ textAlign: 'center' }}>
              <span className="ag-stat-value">{averageCost}</span>
              <span className="ag-stat-label">Average Job Cost</span>
            </div>
            <div className="ag-card-stat" style={{ textAlign: 'center' }}>
              <span className="ag-stat-value">{insuranceCoverage}</span>
              <span className="ag-stat-label">Insurance Covered</span>
            </div>
          </div>
        </div>
      </section>

      {/* Price Ranges */}
      {priceRanges.length > 0 && (
        <section style={{ padding: '4rem 1.5rem' }}>
          <div className="ag-container">
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ag-primary-blue)', textAlign: 'center', marginBottom: '2rem' }}>
              {serviceName} Price Ranges in {cityName}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
              {priceRanges.map((range, i) => (
                <div key={i} className="ag-card-pricing">
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ag-primary-blue)', marginBottom: '0.5rem' }}>{range.type}</h3>
                  <span className="ag-price-range">{range.range}</span>
                  <p style={{ fontSize: '0.9rem', color: 'var(--ag-text-muted)', marginTop: '0.5rem' }}>{range.description}</p>
                </div>
              ))}
            </div>
            <p style={{ textAlign: 'center', color: 'var(--ag-text-muted)', marginTop: '1.5rem', fontSize: '0.9rem' }}>
              * Prices are estimates for {cityName} metro area. Final cost determined after assessment.
            </p>
          </div>
        </section>
      )}

      {/* Pricing Factors */}
      {pricingFactors.length > 0 && (
        <section style={{ padding: '4rem 1.5rem', background: 'var(--ag-background-light)' }}>
          <div className="ag-container">
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ag-primary-blue)', textAlign: 'center', marginBottom: '2rem' }}>
              What Affects {serviceName} Cost in {cityName}?
            </h2>
            <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {pricingFactors.map((factor, i) => (
                <div key={i} style={{ background: 'var(--ag-surface-white)', border: '1px solid var(--ag-border-grey)', borderRadius: '12px', padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--ag-primary-blue)', marginBottom: '0.25rem' }}>{factor.factor}</h3>
                    <p style={{ fontSize: '0.9rem', color: 'var(--ag-text-muted)' }}>{factor.example}</p>
                  </div>
                  <span className="ag-status ag-status-pending">{factor.impact} impact</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Cost Breakdown */}
      {costBreakdown && costBreakdown.length > 0 && (
        <section style={{ padding: '4rem 1.5rem' }}>
          <div className="ag-container">
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ag-primary-blue)', textAlign: 'center', marginBottom: '2rem' }}>
              Typical {serviceName} Cost Breakdown
            </h2>
            <div className="ag-table-wrapper" style={{ maxWidth: '700px', margin: '0 auto' }}>
              <table className="ag-table">
                <thead>
                  <tr className="ag-table-header">
                    <th>Service</th>
                    <th style={{ textAlign: 'right' }}>Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {costBreakdown.map((item, i) => (
                    <tr key={i} className="ag-table-row" style={item.isTotal ? { fontWeight: 700, fontSize: '1.1rem' } : undefined}>
                      <td>{item.label}</td>
                      <td style={{ textAlign: 'right', color: item.isTotal ? 'var(--ag-secondary-blue)' : undefined }}>{item.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="ag-network-cta">
        <div className="ag-cta-background" />
        <div className="ag-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem 1.5rem' }}>
          <div className="ag-icon-hero" style={{ margin: '0 auto 1rem' }}>
            <DollarSign size={48} style={{ color: 'rgba(255,255,255,0.9)' }} />
          </div>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ag-surface-white)', marginBottom: '1rem' }}>
            Get Your {serviceName} Estimate for {cityName}
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1.125rem' }}>
            Transparent pricing from {minimumCallout}. {insuranceCoverage} insurance covered.
          </p>
          <Link href="/claim" className="ag-btn-primary-glow">
            Get {cityName} Estimate
          </Link>
        </div>
      </section>

      <AntigravityFooter />
    </>
  );
}

import type { ReactNode } from 'react';
import Link from 'next/link';
import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from './AntigravityNavbar';
import { AntigravityFooter } from './AntigravityFooter';

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export interface ContentHero {
  /** CSS gradient for the header background */
  gradient: string;
  /** Lucide icon element rendered above the title */
  icon: ReactNode;
  /** Primary page heading */
  title: string;
  /** Subtitle / tagline shown below the heading */
  subtitle?: string;
  /** Optional hero background image path (rendered behind the gradient overlay) */
  heroImage?: string;
}

export interface ContentCTA {
  text: string;
  href: string;
}

export interface ContentBreadcrumb {
  label: string;
  href?: string;
}

export interface ContentSection {
  /** Section heading */
  heading?: string;
  /** Body text or JSX content */
  body: ReactNode;
  /** Optional background ('light' = light grey, 'dark' = primary blue) */
  background?: 'light' | 'dark';
}

export interface ContentStat {
  label: string;
  value: string;
}

export interface RelatedPageLink {
  title: string;
  href: string;
  description: string;
}

export interface AgContentPageTemplateProps {
  hero: ContentHero;
  cta?: ContentCTA;
  secondaryCta?: ContentCTA;
  breadcrumbs?: ContentBreadcrumb[];
  /** Key stats displayed as glass orbs below the hero */
  stats?: ContentStat[];
  /** Main content sections rendered below the hero */
  sections?: ContentSection[];
  /** Cross-category related pages for internal linking */
  relatedPages?: RelatedPageLink[];
  /** Optional background image for the bottom CTA section */
  ctaImage?: string;
  /** Fallback content: rendered when ANTIGRAVITY_UI flag is OFF */
  fallback?: ReactNode;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * AgContentPageTemplate — Universal content page template for Antigravity UI.
 *
 * Covers ~280 stub/thin pages (cost, insurance, emergency, property-types,
 * equipment, certifications, compare, technology, disasters, thin service
 * sub-pages). Renders AG chrome when the feature flag is ON; otherwise
 * passes through to the fallback (original page content).
 */
export function AgContentPageTemplate({
  hero,
  cta,
  secondaryCta,
  breadcrumbs,
  stats,
  sections,
  relatedPages,
  ctaImage,
  fallback,
}: AgContentPageTemplateProps) {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <>{fallback}</>;
  }

  return (
    <>
      <AntigravityNavbar />

      {/* Hero */}
      <header
        className="ag-service-header"
        style={hero.heroImage ? {
          backgroundImage: `url(${hero.heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : undefined}
      >
        <div className="ag-header-overlay" style={{ background: hero.gradient, opacity: hero.heroImage ? 0.75 : undefined }} />
        <div className="ag-container ag-header-content" style={{ maxWidth: '900px' }}>
          {breadcrumbs && breadcrumbs.length > 0 && (
            <nav className="ag-breadcrumb" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, i) => (
                <span key={i}>
                  {i > 0 && ' / '}
                  {crumb.href ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    <span>{crumb.label}</span>
                  )}
                </span>
              ))}
            </nav>
          )}

          <div className="ag-slide-up-1" style={{ marginBottom: '1rem' }}>
            <div className="ag-icon-hero">
              {hero.icon}
            </div>
          </div>

          <h1 className="ag-slide-up-2">{hero.title}</h1>

          {hero.subtitle && (
            <p className="ag-lead-text ag-slide-up-3" style={{ borderLeft: 'none' }}>
              {hero.subtitle}
            </p>
          )}

          {(cta || secondaryCta) && (
            <div className="ag-hero-actions ag-slide-up-4" style={{ marginTop: '2rem' }}>
              {cta && (
                <Link href={cta.href} className="ag-btn-primary-glow">
                  {cta.text}
                </Link>
              )}
              {secondaryCta && (
                <Link href={secondaryCta.href} className="ag-btn-glass">
                  {secondaryCta.text}
                </Link>
              )}
            </div>
          )}
        </div>
      </header>

      {/* Stats Row */}
      {stats && stats.length > 0 && (
        <section style={{ padding: '3rem 1.5rem', background: 'var(--ag-background-light)' }}>
          <div className="ag-container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: `repeat(auto-fit, minmax(180px, 1fr))`,
              gap: '1.5rem',
            }}>
              {stats.map((stat, i) => (
                <div key={i} className="ag-card-stat">
                  <span className="ag-stat-value">{stat.value}</span>
                  <span className="ag-stat-label">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Content Sections */}
      {sections && sections.map((section, i) => {
        const bg =
          section.background === 'light' ? 'var(--ag-background-light)' :
          section.background === 'dark' ? 'var(--ag-primary-blue)' :
          undefined;
        const textColor = section.background === 'dark' ? 'var(--ag-surface-white)' : undefined;

        return (
          <section
            key={i}
            style={{
              padding: '4rem 1.5rem',
              background: bg,
              color: textColor,
            }}
          >
            <div className="ag-container">
              {section.heading && (
                <h2 style={{
                  fontSize: '2rem',
                  fontWeight: 700,
                  color: section.background === 'dark' ? 'var(--ag-surface-white)' : 'var(--ag-primary-blue)',
                  marginBottom: '1.5rem',
                  letterSpacing: '-0.02em',
                }}>
                  {section.heading}
                </h2>
              )}
              <div className="ag-prose">
                {section.body}
              </div>
            </div>
          </section>
        );
      })}

      {/* Related Pages — internal cross-linking */}
      {relatedPages && relatedPages.length > 0 && (
        <section style={{ padding: '4rem 1.5rem', background: 'var(--ag-background-light)' }}>
          <div className="ag-container">
            <h2 style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              color: 'var(--ag-primary-blue)',
              marginBottom: '0.5rem',
              letterSpacing: '-0.02em',
            }}>
              You May Also Need
            </h2>
            <p style={{ color: 'var(--ag-text-muted)', marginBottom: '2rem', fontSize: '1rem' }}>
              Related services and resources for your situation
            </p>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '1.25rem',
            }}>
              {relatedPages.slice(0, 6).map((page, i) => (
                <Link
                  key={i}
                  href={page.href}
                  style={{
                    display: 'block',
                    padding: '1.25rem',
                    background: 'var(--ag-surface-white)',
                    borderRadius: '0.75rem',
                    textDecoration: 'none',
                    border: '1px solid rgba(0,0,0,0.06)',
                    transition: 'box-shadow 0.2s, transform 0.2s',
                  }}
                >
                  <span style={{
                    display: 'block',
                    fontWeight: 600,
                    fontSize: '1rem',
                    color: 'var(--ag-primary-blue)',
                    marginBottom: '0.5rem',
                  }}>
                    {page.title}
                  </span>
                  <span style={{
                    display: 'block',
                    fontSize: '0.875rem',
                    color: 'var(--ag-text-muted)',
                    lineHeight: 1.5,
                  }}>
                    {page.description}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      {cta && (
        <section
          className="ag-network-cta"
          style={ctaImage ? {
            backgroundImage: `url(${ctaImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          } : undefined}
        >
          <div className="ag-cta-background" style={ctaImage ? { background: 'rgba(15, 41, 66, 0.8)' } : undefined} />
          <div className="ag-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem 1.5rem' }}>
            <div style={{ marginBottom: '1rem' }}>
              <div className="ag-icon-hero" style={{ margin: '0 auto' }}>
                {hero.icon}
              </div>
            </div>
            <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ag-surface-white)', marginBottom: '1rem' }}>
              Need Help? Get Started Now
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1.125rem' }}>
              {hero.subtitle || 'Professional disaster recovery services available 24/7'}
            </p>
            <Link href={cta.href} className="ag-btn-primary-glow">
              {cta.text}
            </Link>
          </div>
        </section>
      )}

      <AntigravityFooter />
    </>
  );
}

'use client';

import Link from 'next/link';
import Script from 'next/script';
import { HelpCircle } from 'lucide-react';
import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityNavbar } from './AntigravityNavbar';
import { AntigravityFooter } from './AntigravityFooter';
import { AgAccordion } from './AgAccordion';
import type { AccordionItem } from './AgAccordion';

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export interface FAQRelatedCategory {
  label: string;
  href: string;
  description?: string;
}

export interface AgFAQPageTemplateProps {
  category: string;
  title: string;
  subtitle?: string;
  faqs: AccordionItem[];
  relatedCategories?: FAQRelatedCategory[];
  fallback?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * AgFAQPageTemplate — Template for FAQ category pages.
 * Uses AgAccordion with SEO-friendly structure and FAQPage schema.
 */
export function AgFAQPageTemplate({
  category,
  title,
  subtitle,
  faqs,
  relatedCategories,
  fallback,
}: AgFAQPageTemplateProps) {
  if (!FEATURE_FLAGS.ANTIGRAVITY_UI) {
    return <>{fallback}</>;
  }

  // FAQPage schema for rich results
  const faqSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  });

  return (
    <>
      <AntigravityNavbar />

      {/* FAQPage structured data for rich results */}
      <Script id="faq-schema" type="application/ld+json" strategy="afterInteractive">
        {faqSchema}
      </Script>

      {/* Hero */}
      <header className="ag-service-header" style={{ padding: '5rem 0 3rem' }}>
        <div
          className="ag-header-overlay"
          style={{ background: 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)' }}
        />
        <div className="ag-container ag-header-content" style={{ maxWidth: '800px', textAlign: 'center' }}>
          <nav className="ag-breadcrumb" aria-label="Breadcrumb" style={{ textAlign: 'left' }}>
            <Link href="/">Home</Link> / <Link href="/faq">FAQ</Link> / <span>{category}</span>
          </nav>

          <div className="ag-icon-hero" style={{ margin: '0 auto 1rem' }}>
            <HelpCircle size={48} style={{ color: 'rgba(255,255,255,0.9)' }} />
          </div>
          <h1 className="ag-slide-up-2">{title}</h1>
          {subtitle && (
            <p className="ag-hero-subtext ag-slide-up-3" style={{ maxWidth: '600px', margin: '0 auto' }}>
              {subtitle}
            </p>
          )}
        </div>
      </header>

      {/* FAQ Accordion */}
      <section style={{ padding: '4rem 1.5rem' }}>
        <div className="ag-container" style={{ maxWidth: '800px' }}>
          <AgAccordion items={faqs} allowMultiple />
        </div>
      </section>

      {/* Related Categories */}
      {relatedCategories && relatedCategories.length > 0 && (
        <section style={{ padding: '4rem 1.5rem', background: 'var(--ag-background-light)' }}>
          <div className="ag-container">
            <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--ag-primary-blue)', textAlign: 'center', marginBottom: '2rem' }}>
              More FAQ Categories
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', maxWidth: '900px', margin: '0 auto' }}>
              {relatedCategories.map((cat, i) => (
                <Link key={i} href={cat.href} style={{ textDecoration: 'none' }}>
                  <div className="ag-card-feature" style={{ cursor: 'pointer' }}>
                    <div className="ag-card-feature-icon">
                      <HelpCircle size={24} style={{ color: 'var(--ag-secondary-blue)' }} />
                    </div>
                    <h3>{cat.label}</h3>
                    {cat.description && <p>{cat.description}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="ag-network-cta">
        <div className="ag-cta-background" />
        <div className="ag-container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem 1.5rem' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--ag-surface-white)', marginBottom: '1rem' }}>
            Need Emergency Help Now?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1.125rem' }}>
            Get connected with IICRC certified contractors in your area
          </p>
          <Link href="/claim" className="ag-btn-primary-glow">
            Get Emergency Help
          </Link>
        </div>
      </section>

      <AntigravityFooter />
    </>
  );
}

'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import Script from 'next/script';
import { AntigravityNavbar } from './AntigravityNavbar';
import { AntigravityFooter } from './AntigravityFooter';
import { AgAccordion } from './AgAccordion';
import type { AccordionItem } from './AgAccordion';
import {
  WATER_DAMAGE_AUTHOR,
  INSURANCE_GUIDE_AUTHOR,
  FIRE_DAMAGE_AUTHOR,
  MOULD_AUTHOR,
} from '@/lib/guide-authors';

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export interface GuideSection {
  heading?: string;
  body: ReactNode;
  background?: 'light' | 'dark';
}

export interface GuideBreadcrumb {
  label: string;
  href?: string;
}

export interface RelatedGuide {
  title: string;
  href: string;
  description?: string;
}

export interface GuideAuthor {
  /** Full name of the person or team */
  name: string;
  /** Job title or role */
  jobTitle: string;
  /** Professional credentials or certifications */
  credentials?: string[];
  /** Profile or bio URL */
  url?: string;
}

export interface AgGuidePageTemplateProps {
  /** Guide category name (e.g. 'Water Damage', 'Fire Damage') */
  category: string;
  /** Page title / h1 */
  title: string;
  /** Subtitle shown below the title */
  subtitle?: string;
  /** CSS gradient for the header background */
  gradient?: string;
  /** Lucide icon element rendered above the title */
  icon?: ReactNode;
  /** Breadcrumb trail */
  breadcrumbs?: GuideBreadcrumb[];
  /** Rich content sections */
  sections?: GuideSection[];
  /** FAQ items — rendered as accordion with FAQPage schema */
  faqs?: AccordionItem[];
  /** Links to related guides */
  relatedGuides?: RelatedGuide[];
  /** CTA button */
  cta?: { text: string; href: string };
  /**
   * Above-fold hero CTA — renders a primary red button immediately below the
   * subtitle. Intended for distressed users on event pages (≤3-tap protocol).
   * DR-749.
   */
  heroCta?: { text: string; href: string };
  /** Fallback content when AG flag is OFF */
  fallback?: ReactNode;
  /** Last-reviewed date for AI citation freshness (ISO format, e.g. '2026-02-26') */
  lastReviewed?: string;
  /** Optional stats for the guide hero (e.g. [{ label: 'Updated', value: '2026' }]) */
  stats?: { label: string; value: string }[];
  /**
   * Named author for E-E-A-T and GEO signals.
   * When provided, Article schema author becomes a Person; otherwise falls back to Organization.
   */
  author?: GuideAuthor;
}

/* -------------------------------------------------------------------------- */
/* Author resolution                                                           */
/* -------------------------------------------------------------------------- */

/**
 * Returns a default author based on the guide's category string.
 * Covers all major damage types; falls back to water damage author.
 */
function resolveDefaultAuthor(category: string): GuideAuthor {
  const lower = category.toLowerCase();
  if (lower.includes('fire') || lower.includes('smoke')) return FIRE_DAMAGE_AUTHOR;
  if (lower.includes('mould') || lower.includes('mold')) return MOULD_AUTHOR;
  if (lower.includes('insurance') || lower.includes('claim')) return INSURANCE_GUIDE_AUTHOR;
  return WATER_DAMAGE_AUTHOR;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * AgGuidePageTemplate — Template for guide article pages.
 * Supports rich prose sections, FAQ accordion with schema, and related guides.
 */
export function AgGuidePageTemplate({
  category,
  title,
  subtitle,
  gradient = 'linear-gradient(135deg, #0F2942 0%, #1A4674 100%)',
  icon,
  breadcrumbs,
  sections,
  faqs,
  relatedGuides,
  cta,
  heroCta,
  lastReviewed,
  stats,
  author,
}: AgGuidePageTemplateProps) {
  // FAQPage schema for rich results
  const faqSchema =
    faqs && faqs.length > 0
      ? JSON.stringify({
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
        })
      : null;

  // Article schema for GEO citation and rich results
  // Enhanced with AI citation signals: dateModified, speakableSpecification, mainEntityOfPage
  const reviewDate = lastReviewed || '2026-02-26';

  // Explicit author prop takes priority; fall back to category-derived default
  const resolvedAuthor = author ?? resolveDefaultAuthor(category);
  const schemaAuthor = {
    '@type': 'Person',
    name: resolvedAuthor.name,
    jobTitle: resolvedAuthor.jobTitle,
    ...(resolvedAuthor.credentials && resolvedAuthor.credentials.length > 0
      ? {
          hasCredential: resolvedAuthor.credentials.map((c) => ({
            '@type': 'EducationalOccupationalCredential',
            name: c,
          })),
        }
      : {}),
    ...(resolvedAuthor.url ? { url: resolvedAuthor.url } : {}),
    memberOf: {
      '@type': 'Organization',
      name: 'Disaster Recovery',
      url: 'https://disasterrecovery.com.au',
    },
  };

  const articleSchema = JSON.stringify({
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: subtitle || `Expert guide on ${title.toLowerCase()} from Disaster Recovery`,
    author: schemaAuthor,
    publisher: {
      '@type': 'Organization',
      name: 'Disaster Recovery',
      url: 'https://disasterrecovery.com.au',
      logo: {
        '@type': 'ImageObject',
        url: 'https://disasterrecovery.com.au/logos/3D NRP Logo.png',
      },
    },
    articleSection: category,
    inLanguage: 'en-AU',
    isAccessibleForFree: true,
    dateModified: reviewDate,
    mainEntityOfPage: {
      '@type': 'WebPage',
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.ag-hero-subtext', '.ag-prose h2'],
    },
  });

  return (
    <>
      <AntigravityNavbar />

      {/* Article structured data — all data is trusted static content */}
      <Script id="guide-article-schema" type="application/ld+json" strategy="afterInteractive">
        {articleSchema}
      </Script>

      {/* FAQPage structured data */}
      {faqSchema && (
        <Script id="guide-faq-schema" type="application/ld+json" strategy="afterInteractive">
          {faqSchema}
        </Script>
      )}

      {/* Hero */}
      <header className="ag-service-header" style={{ padding: '5rem 0 3rem' }}>
        <div className="ag-header-overlay" style={{ background: gradient }} />
        <div className="ag-container ag-header-content" style={{ maxWidth: '800px' }}>
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

          {icon && (
            <div className="ag-slide-up-1" style={{ marginBottom: '1rem' }}>
              <div className="ag-icon-hero">{icon}</div>
            </div>
          )}

          <h1 className="ag-slide-up-2">{title}</h1>

          {subtitle && (
            <p className="ag-hero-subtext ag-slide-up-3" style={{ maxWidth: '650px' }}>
              {subtitle}
            </p>
          )}

          {/* Above-fold CTA — distressed users (≤3-tap protocol, DR-749) */}
          {heroCta && (
            <div className="ag-slide-up-3" style={{ marginTop: '1.5rem' }}>
              <Link
                href={heroCta.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.875rem 2rem',
                  minHeight: '48px',
                  background: '#dc2626',
                  color: '#fff',
                  fontWeight: 700,
                  fontSize: '1.0625rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  transition: 'background 0.15s',
                }}
              >
                {heroCta.text}
              </Link>
            </div>
          )}

          {/* Last-reviewed badge — freshness signal for users and AI crawlers */}
          <div
            className="ag-slide-up-3"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              marginTop: '1.5rem',
              padding: '0.375rem 0.875rem',
              borderRadius: '9999px',
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.75)',
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: '#22c55e',
                display: 'inline-block',
              }}
            />
            Last reviewed{' '}
            {new Date(reviewDate).toLocaleDateString('en-AU', { month: 'long', year: 'numeric' })}
          </div>
        </div>
      </header>

      {/* Content Sections */}
      {sections &&
        sections.map((section, i) => {
          const bg =
            section.background === 'light'
              ? 'var(--ag-background-light)'
              : section.background === 'dark'
                ? 'var(--ag-primary-blue)'
                : undefined;
          const textColor = section.background === 'dark' ? 'var(--ag-surface-white)' : undefined;

          return (
            <section key={i} style={{ padding: '4rem 1.5rem', background: bg, color: textColor }}>
              <div className="ag-container" style={{ maxWidth: '800px' }}>
                {section.heading && (
                  <h2
                    style={{
                      fontSize: '1.75rem',
                      fontWeight: 700,
                      color:
                        section.background === 'dark'
                          ? 'var(--ag-surface-white)'
                          : 'var(--ag-primary-blue)',
                      marginBottom: '1.5rem',
                    }}
                  >
                    {section.heading}
                  </h2>
                )}
                <div className="ag-prose">{section.body}</div>
              </div>
            </section>
          );
        })}

      {/* FAQ Accordion */}
      {faqs && faqs.length > 0 && (
        <section style={{ padding: '4rem 1.5rem', background: 'var(--ag-background-light)' }}>
          <div className="ag-container" style={{ maxWidth: '800px' }}>
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--ag-primary-blue)',
                textAlign: 'center',
                marginBottom: '2rem',
              }}
            >
              Frequently Asked Questions
            </h2>
            <AgAccordion items={faqs} allowMultiple />
          </div>
        </section>
      )}

      {/* Related Guides */}
      {relatedGuides && relatedGuides.length > 0 && (
        <section style={{ padding: '4rem 1.5rem' }}>
          <div className="ag-container">
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                color: 'var(--ag-primary-blue)',
                textAlign: 'center',
                marginBottom: '2rem',
              }}
            >
              Related Guides
            </h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1.5rem',
                maxWidth: '900px',
                margin: '0 auto',
              }}
            >
              {relatedGuides.map((guide, i) => (
                <Link key={i} href={guide.href} style={{ textDecoration: 'none' }}>
                  <div className="ag-card-feature" style={{ cursor: 'pointer' }}>
                    <h3>{guide.title}</h3>
                    {guide.description && <p>{guide.description}</p>}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* AI Citation Block — structured data for LLM attribution */}
      <section
        style={{
          padding: '2rem 1.5rem',
          background: 'var(--ag-background-light)',
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}
      >
        <div className="ag-container" style={{ maxWidth: '800px' }}>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1.5rem',
              fontSize: '0.8rem',
              color: 'var(--ag-text-muted)',
              lineHeight: 1.6,
            }}
          >
            <div>
              <strong style={{ color: 'var(--ag-primary-blue)' }}>Source:</strong> Disaster Recovery
              — disasterrecovery.com.au
            </div>
            <div>
              <strong style={{ color: 'var(--ag-primary-blue)' }}>Category:</strong> {category}
            </div>
            <div>
              <strong style={{ color: 'var(--ag-primary-blue)' }}>Author:</strong>{' '}
              {resolvedAuthor.name}
              {resolvedAuthor.jobTitle && ` — ${resolvedAuthor.jobTitle}`}
              {resolvedAuthor.credentials && resolvedAuthor.credentials.length > 0 && (
                <span style={{ marginLeft: '0.35rem', color: 'var(--ag-text-muted)' }}>
                  ({resolvedAuthor.credentials.join(', ')})
                </span>
              )}
            </div>
            <div>
              <strong style={{ color: 'var(--ag-primary-blue)' }}>Last reviewed:</strong>{' '}
              <time dateTime={reviewDate}>
                {new Date(reviewDate).toLocaleDateString('en-AU', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
            <div>
              <strong style={{ color: 'var(--ag-primary-blue)' }}>Standard:</strong> IICRC
              S500:2025/S520:2025 certified practices
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      {cta && (
        <section className="ag-network-cta">
          <div className="ag-cta-background" />
          <div
            className="ag-container"
            style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '2rem 1.5rem' }}
          >
            <h2
              style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--ag-surface-white)',
                marginBottom: '1rem',
              }}
            >
              Need Emergency Help Now?
            </h2>
            <p
              style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '2rem', fontSize: '1.125rem' }}
            >
              Get connected with IICRC certified contractors in your area
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

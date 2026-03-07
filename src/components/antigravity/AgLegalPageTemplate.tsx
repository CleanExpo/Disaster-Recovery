'use client';

import Link from 'next/link';
import { FileText } from 'lucide-react';
import { AntigravityNavbar } from './AntigravityNavbar';
import { AntigravityFooter } from './AntigravityFooter';

/* -------------------------------------------------------------------------- */
/* Types                                                                       */
/* -------------------------------------------------------------------------- */

export interface LegalDocument {
  title: string;
  href: string;
}

export interface LegalSection {
  heading: string;
  content: string;
}

export interface AgLegalPageTemplateProps {
  /** Page title */
  title: string;
  /** Legal category name (e.g. 'Core Business', 'Client-Facing') */
  category: string;
  /** Description shown below the title */
  description?: string;
  /** For index pages: list of document links */
  documents?: LegalDocument[];
  /** For document pages: content sections */
  sections?: LegalSection[];
  /** Effective date for document pages */
  effectiveDate?: string;
  fallback?: React.ReactNode;
}

/* -------------------------------------------------------------------------- */
/* Component                                                                   */
/* -------------------------------------------------------------------------- */

/**
 * AgLegalPageTemplate — Template for legal index pages and document pages.
 * Two modes: index (shows document links) and document (shows prose content).
 */
export function AgLegalPageTemplate({
  title,
  category,
  description,
  documents,
  sections,
  effectiveDate,
}: AgLegalPageTemplateProps) {
  const isIndex = documents && documents.length > 0;

  return (
    <>
      <AntigravityNavbar />

      {/* Hero */}
      <header className="ag-service-header" style={{ padding: '5rem 0 3rem' }}>
        <div
          className="ag-header-overlay"
          style={{ background: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)' }}
        />
        <div className="ag-container ag-header-content" style={{ maxWidth: '800px' }}>
          <nav className="ag-breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> / <Link href="/legal">Legal</Link>
            {category !== 'Legal' && <> / <span>{category}</span></>}
          </nav>

          <FileText size={40} style={{ color: 'rgba(255,255,255,0.8)', marginBottom: '1rem' }} />
          <h1 className="ag-slide-up-2">{title}</h1>
          {description && (
            <p className="ag-lead-text ag-slide-up-3" style={{ borderLeft: 'none' }}>
              {description}
            </p>
          )}
          {effectiveDate && (
            <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.875rem', marginTop: '1rem' }}>
              Effective: {effectiveDate}
            </p>
          )}
        </div>
      </header>

      {/* Index Mode: Document Links */}
      {isIndex && (
        <section style={{ padding: '4rem 1.5rem' }}>
          <div className="ag-container" style={{ maxWidth: '800px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {documents.map((doc, i) => (
                <Link key={i} href={doc.href} style={{ textDecoration: 'none' }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    padding: '1.25rem 1.5rem',
                    background: 'var(--ag-surface-white)',
                    border: '1px solid var(--ag-border-grey)',
                    borderRadius: '12px',
                    transition: 'box-shadow 0.2s ease, transform 0.2s ease',
                    cursor: 'pointer',
                  }}>
                    <FileText size={20} style={{ color: 'var(--ag-secondary-blue)', flexShrink: 0 }} />
                    <span style={{ fontWeight: 600, color: 'var(--ag-text-dark)', fontSize: '1rem' }}>
                      {doc.title}
                    </span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: 'auto', color: 'var(--ag-text-muted)' }}>
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Document Mode: Prose Content */}
      {sections && sections.length > 0 && (
        <section style={{ padding: '4rem 1.5rem' }}>
          <div className="ag-container" style={{ maxWidth: '800px' }}>
            <div className="ag-prose">
              {sections.map((section, i) => (
                <div key={i} style={{ marginBottom: '2.5rem' }}>
                  <h2>{section.heading}</h2>
                  <p>{section.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <AntigravityFooter />
    </>
  );
}

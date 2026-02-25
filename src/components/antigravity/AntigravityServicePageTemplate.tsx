'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { ServicePageData } from './types';
import { AntigravityNavbar } from './AntigravityNavbar';
import { AntigravityFooter } from './AntigravityFooter';

interface Props {
  data: ServicePageData;
  heroImage?: string;
  ctaImage?: string;
}

export function AntigravityServicePageTemplate({ data, heroImage, ctaImage }: Props) {
  return (
    <>
      <AntigravityNavbar />
      <header
        className="ag-service-header"
        style={heroImage ? {
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        } : undefined}
      >
        <div className="ag-header-overlay" style={{ background: data.theme.headerGradient, opacity: heroImage ? 0.75 : undefined }}>
          {data.theme.headerRadial && (
            <div style={{
              position: 'absolute', inset: 0, zIndex: 1,
              background: data.theme.headerRadial
            }} />
          )}
        </div>
        <div className="ag-container ag-header-content">
          <div className="ag-breadcrumb">
            <Link href="/">Home</Link> / <Link href="/services">Services</Link> / <span>{data.breadcrumbLabel}</span>
          </div>
          <h1>{data.title}</h1>
          <p className="ag-lead-text" style={{ borderLeft: `4px solid ${data.theme.leadBorderColor}` }}>
            {data.leadText}
          </p>
        </div>
      </header>

      <section className="ag-service-body ag-container">
        <article className="ag-technical-content">
          <div className="ag-content-block">
            <h2>{data.introHeading}</h2>
            {data.introParagraphs.map((p, i) => <p key={i}>{p}</p>)}
          </div>

          <div className="ag-technical-grid">
            {data.technicalCards.map((card, i) => (
              <div key={i} className="ag-tech-card">
                {/* Safe: iconSvg contains trusted, hardcoded brand SVG assets from service-data files -- not user input */}
                <div className="ag-tech-icon" style={{
                  color: data.theme.techIconColor,
                  background: data.theme.techIconBg,
                  border: `1px solid ${data.theme.techIconBorder}`
                }} dangerouslySetInnerHTML={{ __html: card.iconSvg }} />
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            ))}
          </div>

          <div className="ag-content-block ag-mt-4">
            <h2>{data.protocolHeading}</h2>
            <ol className="ag-process-list">
              {data.protocolSteps.map((step, i) => (
                <li key={i}>
                  <strong>{step.title}</strong>
                  {step.description}
                </li>
              ))}
            </ol>
          </div>
        </article>

        <aside className="ag-sticky-sidebar">
          <div className="ag-contact-card" style={{ '--ag-theme-pulse-color': data.theme.pulseColor } as React.CSSProperties}>
            <div className="ag-status-indicator" style={{ color: data.theme.statusColor }}>
              <span className="ag-pulse-indicator" style={{ backgroundColor: data.theme.statusColor }} />
              {data.sidebar.statusText}
            </div>
            <h3>{data.sidebar.heading}</h3>
            <p className="ag-contact-desc">{data.sidebar.description}</p>
            <Link href={data.sidebar.ctaHref} className="ag-btn-critical">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
              {data.sidebar.ctaText}
            </Link>
          </div>
          <div className="ag-panel-footer">{data.sidebar.footerNote}</div>
          <div className="ag-sidebar-trust">
            <Image src="/images/antigravity/icon_3d_certificate.webp" alt="IICRC Certified Firm" width={60} height={60} className="ag-trust-badge-img" />
            <span className="ag-trust-text">{data.sidebar.trustText}</span>
          </div>
        </aside>
      </section>

      <AntigravityFooter />
    </>
  );
}

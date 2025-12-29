/**
 * NRPG Homepage - National Restoration Professionals Group
 *
 * Design Pattern: Phil McGurk's DisasterRecovery.com.au aesthetic
 * - Fixed navigation with mega menus
 * - Hero carousel with HUD overlay
 * - Number storytelling ("The 1300 Blueprint")
 * - Service pillars grid
 * - Emergency CTA throughout
 *
 * SEO Optimized: Schema.org markup for search engines
 * Accessibility: WCAG AA compliant
 * Performance: Optimized images, code splitting
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MegaMenu, useMegaMenu } from '@/components/nrpg/mega-menu';
import { HeroCarousel } from '@/components/nrpg/hero-carousel';
import { PillarCard, PillarCardGrid } from '@/components/nrpg/pillar-card';
import { EmergencyButton, EmergencyButtonLabeled } from '@/components/nrpg/emergency-button';
import { ProtocolBadge } from '@/components/nrpg/protocol-badge';
import { MobileMenu, HamburgerButton } from '@/components/nrpg/MobileMenu';
import {
  SERVICE_PILLARS,
  CLIENT_SECTORS,
  AUSTRALIAN_LOCATIONS,
  EMERGENCY_PHONE,
  designTokens,
} from '@/lib/design-tokens';
import { schemaGenerator } from '@/lib/seo/schema-generator';

// Hero Scenarios for Carousel
const HERO_SCENARIOS = [
  {
    id: 'residential-flood',
    sector: 'Residential',
    hazard: 'Flood Emergency',
    status: 'Response Active',
    title: 'Your Home. Forensically Restored.',
    description: 'Insurance-grade documentation. IICRC protocols. Zero compromise on quality.',
    image: '/images/scenarios/residential-flood.jpg',
    cta: {
      label: 'Dispatch Emergency Team',
      href: `tel:${EMERGENCY_PHONE.href}`,
    },
  },
  {
    id: 'commercial-fire',
    sector: 'Commercial',
    hazard: 'Fire Damage',
    status: 'Vetting Complete',
    title: 'Business Continuity. Guaranteed.',
    description: 'Minimize downtime. Maximize recovery. Every minute counts.',
    image: '/images/scenarios/commercial-fire.jpg',
    cta: {
      label: 'Start Recovery Process',
      href: '/services/fire-smoke-remediation',
    },
  },
  {
    id: 'industrial-bio',
    sector: 'Industrial',
    hazard: 'Biohazard Event',
    status: 'Team Deployed',
    title: 'Heavy Infrastructure. Precision Decon.',
    description: 'Manufacturing plants. Warehouses. Critical facilities. Forensic-grade results.',
    image: '/images/scenarios/industrial-bio.jpg',
    cta: {
      label: 'Request Specialist Team',
      href: '/services/bio-forensic-cleaning',
    },
  },
];

export default function HomePage() {
  // MegaMenu State Management
  const servicesMenu = useMegaMenu();
  const sectorsMenu = useMegaMenu();
  const locationsMenu = useMegaMenu();

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Transform data for MegaMenu
  const servicePillarsForMenu = SERVICE_PILLARS.map((p) => ({
    id: p.id,
    title: p.title,
    subtitle: p.subtitle,
    label: p.protocol,
    description: p.services.join(', '),
    image: `/images/services/${p.id}-card.jpg`,
    slug: p.slug,
    labelColor: p.protocolColor,
  }));

  const clientSectorsForMenu = CLIENT_SECTORS.map((s) => ({
    id: s.id,
    title: s.title,
    subtitle: s.subtitle,
    label: s.badge,
    description: s.description,
    image: `/images/sectors/${s.id}-card.jpg`,
    slug: s.slug,
    labelColor: 'text-blue-400',
  }));

  const locationsForMenu = AUSTRALIAN_LOCATIONS.slice(0, 4).map((l) => ({
    id: l.code.toLowerCase(),
    title: l.name,
    subtitle: l.capital,
    label: l.code,
    description: `24/7 disaster recovery across ${l.name}`,
    image: `/images/locations/${l.code.toLowerCase()}.jpg`,
    slug: l.code.toLowerCase(),
    labelColor: 'text-green-400',
  }));

  const pillarCardsData = SERVICE_PILLARS.map((p) => ({
    ...p,
    image: `/images/services/${p.id}-card.jpg`,
  }));

  // Generate Schema.org markup
  const organizationSchema = schemaGenerator.generateOrganizationSchema();
  const emergencyServiceSchema = schemaGenerator.generateEmergencyServiceSchema();

  return (
    <>
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(emergencyServiceSchema),
        }}
      />

      <div className="min-h-screen bg-white dark:bg-slate-950">
        {/* Fixed Header Navigation */}
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800">
          <nav className="container mx-auto px-6" aria-label="Main navigation">
            <div className="flex items-center justify-between h-20">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30 group-hover:shadow-blue-600/50 transition-all duration-300">
                  <span className="text-white font-black text-2xl font-display">N</span>
                </div>
                <div className="hidden md:block">
                  <div className="font-display font-black text-xl text-slate-900 dark:text-white leading-tight">
                    NRPG
                  </div>
                  <div className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">
                    National Restoration
                  </div>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center gap-8">
                {/* Services Menu */}
                <div className="relative">
                  <button
                    onMouseEnter={servicesMenu.open}
                    onClick={servicesMenu.toggle}
                    className="flex items-center gap-2 px-4 py-2 font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-expanded={servicesMenu.isOpen}
                    aria-haspopup="true"
                  >
                    Services
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        servicesMenu.isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <MegaMenu
                    items={servicePillarsForMenu}
                    isOpen={servicesMenu.isOpen}
                    onClose={servicesMenu.close}
                    basePath="/services"
                    columns={4}
                  />
                </div>

                {/* Sectors Menu */}
                <div className="relative">
                  <button
                    onMouseEnter={sectorsMenu.open}
                    onClick={sectorsMenu.toggle}
                    className="flex items-center gap-2 px-4 py-2 font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-expanded={sectorsMenu.isOpen}
                    aria-haspopup="true"
                  >
                    Sectors
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        sectorsMenu.isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <MegaMenu
                    items={clientSectorsForMenu}
                    isOpen={sectorsMenu.isOpen}
                    onClose={sectorsMenu.close}
                    basePath="/sectors"
                    columns={4}
                  />
                </div>

                {/* Locations Menu */}
                <div className="relative">
                  <button
                    onMouseEnter={locationsMenu.open}
                    onClick={locationsMenu.toggle}
                    className="flex items-center gap-2 px-4 py-2 font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    aria-expanded={locationsMenu.isOpen}
                    aria-haspopup="true"
                  >
                    Locations
                    <svg
                      className={`w-4 h-4 transition-transform ${
                        locationsMenu.isOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <MegaMenu
                    items={locationsForMenu}
                    isOpen={locationsMenu.isOpen}
                    onClose={locationsMenu.close}
                    basePath="/locations"
                    columns={4}
                  />
                </div>

                {/* Contractor Portal Link */}
                <Link
                  href="/contractor/portal"
                  className="px-4 py-2 font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Contractor Portal
                </Link>
              </div>

              {/* Right Side: Emergency Number + CTA */}
              <div className="flex items-center gap-4">
                {/* Emergency Number Display - Desktop Only */}
                <div className="hidden xl:flex flex-col items-end">
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">
                    Emergency Dispatch
                  </span>
                  <a
                    href={EMERGENCY_PHONE.href}
                    className="font-display text-2xl font-black text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                  >
                    {EMERGENCY_PHONE.number}
                  </a>
                </div>

                {/* Emergency CTA Button */}
                <EmergencyButton size="default" className="shadow-xl" />

                {/* Mobile Menu Toggle */}
                <HamburgerButton
                  isOpen={isMobileMenuOpen}
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                />
              </div>
            </div>
          </nav>
        </header>

        {/* Main Content - Add top padding for fixed header */}
        <main className="pt-20">
          {/* Hero Section */}
          <section className="container mx-auto px-6 py-16 md:py-24">
            <div className="grid lg:grid-cols-12 gap-12 items-center">
              {/* Left: Text Content (6 cols) */}
              <div className="lg:col-span-6 space-y-8">
                <div className="space-y-4">
                  <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1]">
                    One Number.
                    <br />
                    <span className="text-blue-600">Forensic Results.</span>
                    <br />
                    Zero Compromise.
                  </h1>

                  <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed max-w-2xl">
                    Australia's only 100% vetted contractor network for{' '}
                    <strong className="text-slate-900 dark:text-white">residential advocacy</strong>,{' '}
                    <strong className="text-slate-900 dark:text-white">commercial continuity</strong>,{' '}
                    and{' '}
                    <strong className="text-slate-900 dark:text-white">
                      industrial infrastructure
                    </strong>
                    .
                  </p>
                </div>

                {/* Emergency CTA */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                  <EmergencyButton size="xl" showPulse className="shadow-2xl" />
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    <div className="font-black uppercase tracking-wider">24/7 Dispatch Ready</div>
                    <div>All States & Territories</div>
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="flex flex-wrap items-center gap-4 pt-4">
                  <ProtocolBadge variant="blue">IICRC Certified</ProtocolBadge>
                  <ProtocolBadge variant="green">ISO Compliant</ProtocolBadge>
                  <ProtocolBadge variant="slate">24/7 Nationwide</ProtocolBadge>
                </div>
              </div>

              {/* Right: Hero Carousel (6 cols) */}
              <div className="lg:col-span-6">
                <HeroCarousel
                  scenarios={HERO_SCENARIOS}
                  interval={5000}
                  showHUD
                  showScanningBeam
                  pauseOnHover
                />
              </div>
            </div>
          </section>

          {/* The 1300 Blueprint Section - Number Storytelling */}
          <section className="bg-white dark:bg-slate-900 py-24">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                  The 1300 Blueprint
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                  Not just a number. A commitment to forensic standards.
                </p>
              </div>

              {/* Three-Column Number Story */}
              <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
                {/* 1300 - National Defense Line */}
                <div className="text-center space-y-4">
                  <div className="font-display text-7xl md:text-8xl font-black text-blue-600 dark:text-blue-500">
                    1300
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    National Defense Line
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    One emergency number covering every state and territory. Instant dispatch to
                    your nearest vetted contractor.
                  </p>
                </div>

                {/* 309 - IICRC Checkpoints */}
                <div className="text-center space-y-4">
                  <div className="font-display text-7xl md:text-8xl font-black text-blue-600 dark:text-blue-500">
                    309
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    Forensic Checkpoints
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    Every job verified against 309 IICRC restoration standards. Insurance-grade
                    documentation on every project.
                  </p>
                </div>

                {/* 361 - Degrees of Care */}
                <div className="text-center space-y-4">
                  <div className="font-display text-7xl md:text-8xl font-black text-blue-600 dark:text-blue-500">
                    361°
                  </div>
                  <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                    Beyond 360
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                    We go one degree beyond. Pre-loss prevention. Post-restoration verification.
                    Complete protection.
                  </p>
                </div>
              </div>

              {/* CTA Below Numbers */}
              <div className="text-center mt-12">
                <Link
                  href="/about/our-standards"
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold hover:gap-3 transition-all"
                >
                  Learn About Our Standards
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </section>

          {/* Service Pillars Grid */}
          <section className="container mx-auto px-6 py-24">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                Four Service Pillars
              </h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                Each pillar backed by international restoration protocols.
              </p>
            </div>

            <PillarCardGrid columns={4}>
              {pillarCardsData.map((pillar) => (
                <PillarCard key={pillar.id} data={pillar} basePath="/services" />
              ))}
            </PillarCardGrid>
          </section>

          {/* Client Sectors Section */}
          <section className="bg-slate-50 dark:bg-slate-900 py-24">
            <div className="container mx-auto px-6">
              <div className="text-center mb-16">
                <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 dark:text-white mb-4">
                  Who We Serve
                </h2>
                <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
                  Specialized restoration for every sector.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {CLIENT_SECTORS.map((sector) => (
                  <Link
                    key={sector.id}
                    href={`/sectors/${sector.slug}`}
                    className="group p-8 bg-white dark:bg-slate-800 rounded-3xl hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 hover:-translate-y-2"
                  >
                    <div className="space-y-4">
                      <ProtocolBadge variant="blue">{sector.badge}</ProtocolBadge>
                      <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white">
                        {sector.title}
                      </h3>
                      <p className="text-lg text-slate-500 dark:text-slate-400 font-medium">
                        {sector.subtitle}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                        {sector.description}
                      </p>
                      <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                        Learn More
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Final Emergency CTA */}
          <section className="container mx-auto px-6 py-24">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-[3rem] p-12 md:p-20 text-center text-white shadow-2xl">
              <h2 className="font-display text-4xl md:text-6xl font-black mb-6">
                Disaster Doesn't Wait.
                <br />
                Neither Do We.
              </h2>
              <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
                24/7 emergency dispatch. Nationwide coverage. IICRC protocols.
              </p>
              <EmergencyButton
                size="xl"
                className="bg-nrpg-red hover:bg-nrpg-red/90 shadow-2xl shadow-red-900/50"
              />
              <p className="mt-6 text-sm text-blue-200">
                Available now across all states and territories
              </p>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-slate-950 text-slate-400 py-16">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12 mb-12">
              {/* Column 1: Brand */}
              <div className="lg:col-span-2 space-y-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/30">
                    <span className="text-white font-black text-2xl font-display">N</span>
                  </div>
                  <div>
                    <div className="font-display font-black text-xl text-white leading-tight">
                      NRPG
                    </div>
                    <div className="text-[10px] font-black text-slate-500 tracking-[0.2em] uppercase">
                      National Restoration
                    </div>
                  </div>
                </div>
                <p className="text-slate-500 leading-relaxed max-w-md">
                  Australia's only 100% vetted disaster recovery network. Forensic standards.
                  Nationwide coverage. IICRC certified contractors.
                </p>
                <div className="pt-4">
                  <EmergencyButtonLabeled size="lg" />
                </div>
              </div>

              {/* Column 2: Services */}
              <div>
                <h4 className="font-display font-bold text-white mb-4 uppercase tracking-wider text-sm">
                  Services
                </h4>
                <ul className="space-y-2">
                  {SERVICE_PILLARS.map((pillar) => (
                    <li key={pillar.id}>
                      <Link
                        href={`/services/${pillar.slug}`}
                        className="hover:text-blue-400 transition-colors"
                      >
                        {pillar.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 3: Sectors */}
              <div>
                <h4 className="font-display font-bold text-white mb-4 uppercase tracking-wider text-sm">
                  Sectors
                </h4>
                <ul className="space-y-2">
                  {CLIENT_SECTORS.map((sector) => (
                    <li key={sector.id}>
                      <Link
                        href={`/sectors/${sector.slug}`}
                        className="hover:text-blue-400 transition-colors"
                      >
                        {sector.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Column 4: Company */}
              <div>
                <h4 className="font-display font-bold text-white mb-4 uppercase tracking-wider text-sm">
                  Company
                </h4>
                <ul className="space-y-2">
                  <li>
                    <Link href="/about" className="hover:text-blue-400 transition-colors">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/about/our-standards" className="hover:text-blue-400 transition-colors">
                      Our Standards
                    </Link>
                  </li>
                  <li>
                    <Link href="/contractor/join" className="hover:text-blue-400 transition-colors">
                      Become a Contractor
                    </Link>
                  </li>
                  <li>
                    <Link href="/contractor/portal" className="hover:text-blue-400 transition-colors">
                      Contractor Portal
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="hover:text-blue-400 transition-colors">
                      Contact
                    </Link>
                  </li>
                </ul>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-sm text-slate-500">
                © {new Date().getFullYear()} National Restoration Professionals Group. All rights
                reserved.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <Link href="/privacy" className="hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
                <Link href="/sitemap.xml" className="hover:text-blue-400 transition-colors">
                  Sitemap
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Global Styles for Scanning Beam Effect (if not in globals.css) */}
      <style jsx global>{`
        .scanning-beam {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            ${designTokens.colors.protocolBlue},
            transparent
          );
          animation: scan 3s ease-in-out infinite;
          z-index: 10;
        }

        @keyframes scan {
          0%,
          100% {
            transform: translateY(0);
            opacity: 0;
          }
          50% {
            transform: translateY(400px);
            opacity: 1;
          }
        }

        .label-small {
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        .shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
      `}</style>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

/**
 * NRPG Homepage - National Restoration Professionals Group
 *
 * Complete Specification Implementation:
 * 1. Emergency CTA (3 paths: Report Claim / Find Contractor / Join NRPG)
 * 2. Quick Triage Tool (interactive disaster assessment)
 * 3. Services Grid (visual grid of disaster types)
 * 4. Resources Hub (featured content)
 * 5. Join NRPG Section (contractor CTA)
 *
 * Design Standards:
 * - Authority/Clinical aesthetic (navy, white, structured layouts)
 * - Mobile-first responsive design
 * - WCAG 2.1 AA compliance
 * - Performance optimized (LCP <1.5s target)
 * - DesignOS components throughout
 *
 * SEO: Schema.org markup, semantic HTML, optimized meta tags
 */

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Button,
  EmergencyCTA,
  PriorityCard,
  IICRCBadge,
  IICRCBadgeGroup,
} from '@/src/design-system';
import {
  QuickTriageTool,
  ServicesGrid,
  ResourcesHub,
  JoinNRPGSection,
} from '@/components/marketing';
import { MegaMenu, useMegaMenu } from '@/components/nrpg/mega-menu';
import { MobileMenu, HamburgerButton } from '@/components/nrpg/MobileMenu';
import {
  SERVICE_PILLARS,
  CLIENT_SECTORS,
  AUSTRALIAN_LOCATIONS,
  EMERGENCY_PHONE,
} from '@/lib/design-tokens';
import { schemaGenerator } from '@/lib/seo/schema-generator';

export default function HomePage() {
  // Navigation state
  const servicesMenu = useMegaMenu();
  const sectorsMenu = useMegaMenu();
  const locationsMenu = useMegaMenu();
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
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-b border-slate-200 dark:border-slate-800 shadow-sm">
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

                {/* Resources Link */}
                <Link
                  href="/resources"
                  className="px-4 py-2 font-bold text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Resources
                </Link>

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
                <a
                  href={EMERGENCY_PHONE.href}
                  className="hidden md:inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl shadow-lg shadow-red-600/30 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Emergency
                </a>

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
          {/* 1. HERO SECTION - Emergency CTA with 3 Paths */}
          <section className="relative bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950 py-16 md:py-24 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'radial-gradient(circle, #3b82f6 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

            <div className="container mx-auto px-6 relative z-10">
              <div className="grid lg:grid-cols-12 gap-12 items-center">
                {/* Left: Hero Content */}
                <div className="lg:col-span-7 space-y-8">
                  {/* Trust Badge */}
                  <div className="inline-flex items-center gap-2 bg-blue-100 dark:bg-blue-900/30 px-4 py-2 rounded-full">
                    <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
                    <span className="text-sm font-black text-blue-900 dark:text-blue-400 uppercase tracking-wider">
                      Australia's IICRC-Certified Network
                    </span>
                  </div>

                  {/* Headline */}
                  <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 dark:text-white leading-[1.1]">
                    Professional Disaster Recovery.
                    <br />
                    <span className="text-blue-600">One Call Away.</span>
                  </h1>

                  {/* Subheadline */}
                  <p className="text-xl md:text-2xl text-slate-700 dark:text-slate-300 leading-relaxed max-w-2xl">
                    24/7 emergency response connecting you with IICRC-certified contractors for{' '}
                    <strong className="text-slate-900 dark:text-white">water damage</strong>,{' '}
                    <strong className="text-slate-900 dark:text-white">fire restoration</strong>,{' '}
                    <strong className="text-slate-900 dark:text-white">mold remediation</strong>, and more.
                  </p>

                  {/* 3-Path Emergency CTA */}
                  <div className="grid sm:grid-cols-3 gap-4">
                    <PriorityCard
                      priority="critical"
                      title="Report Emergency"
                      onClick={() => window.location.href = EMERGENCY_PHONE.href}
                      className="cursor-pointer hover:scale-105 transition-transform"
                    >
                      <div className="text-sm">
                        24/7 immediate dispatch for active disasters
                      </div>
                    </PriorityCard>

                    <PriorityCard
                      priority="high"
                      title="Find Contractor"
                      onClick={() => window.location.href = '/intake'}
                      className="cursor-pointer hover:scale-105 transition-transform"
                    >
                      <div className="text-sm">
                        Schedule certified restoration services
                      </div>
                    </PriorityCard>

                    <PriorityCard
                      priority="medium"
                      title="Join Network"
                      onClick={() => window.location.href = '/contractor/join'}
                      className="cursor-pointer hover:scale-105 transition-transform"
                    >
                      <div className="text-sm">
                        IICRC contractors apply here
                      </div>
                    </PriorityCard>
                  </div>

                  {/* IICRC Badges */}
                  <div className="pt-4">
                    <p className="text-sm font-bold text-slate-600 dark:text-slate-400 mb-3 uppercase tracking-wider">
                      Certified to IICRC Standards
                    </p>
                    <IICRCBadgeGroup codes={['S500', 'S520', 'FSRT', 'S800']} size="sm" />
                  </div>
                </div>

                {/* Right: Emergency Contact Card */}
                <div className="lg:col-span-5">
                  <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl p-8 border-2 border-slate-200 dark:border-slate-800">
                    <div className="space-y-6">
                      {/* Emergency Hotline */}
                      <div className="text-center p-8 bg-red-50 dark:bg-red-900/20 rounded-2xl border-2 border-red-600">
                        <div className="flex items-center justify-center gap-2 text-red-600 dark:text-red-400 font-black text-sm uppercase tracking-wider mb-4">
                          <span className="w-2 h-2 bg-red-600 rounded-full animate-pulse" />
                          24/7 Emergency Line
                        </div>
                        <a
                          href={EMERGENCY_PHONE.href}
                          className="block font-display text-4xl md:text-5xl font-black text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors mb-2"
                        >
                          {EMERGENCY_PHONE.display}
                        </a>
                        <p className="text-sm text-slate-600 dark:text-slate-400">
                          Immediate dispatch available
                        </p>
                      </div>

                      {/* Quick Stats */}
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                          <div className="font-display text-3xl font-black text-blue-600 mb-1">&lt;60min</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider">Response Time</div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                          <div className="font-display text-3xl font-black text-blue-600 mb-1">500+</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider">Contractors</div>
                        </div>
                        <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl">
                          <div className="font-display text-3xl font-black text-blue-600 mb-1">100%</div>
                          <div className="text-xs text-slate-600 dark:text-slate-400 uppercase tracking-wider">IICRC Certified</div>
                        </div>
                      </div>

                      {/* Secondary Actions */}
                      <div className="space-y-3 pt-2">
                        <Button
                          variant="primary"
                          size="lg"
                          className="w-full"
                          onClick={() => window.location.href = '/intake'}
                        >
                          Start Emergency Intake Form
                        </Button>
                        <Button
                          variant="outline"
                          size="lg"
                          className="w-full"
                          onClick={() => window.location.href = '/services'}
                        >
                          View All Services
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* 2. QUICK TRIAGE TOOL - Interactive Assessment */}
          <section className="container mx-auto px-6 py-16 md:py-24">
            <QuickTriageTool />
          </section>

          {/* 3. SERVICES GRID - Visual Disaster Types */}
          <section className="bg-slate-50 dark:bg-slate-900 py-16 md:py-24">
            <div className="container mx-auto px-6">
              <ServicesGrid
                title="Complete Disaster Recovery Services"
                subtitle="IICRC-certified restoration for every emergency scenario"
                columns={4}
                showIICRCBadges={true}
              />
            </div>
          </section>

          {/* 4. RESOURCES HUB - Featured Content */}
          <section className="container mx-auto px-6 py-16 md:py-24">
            <ResourcesHub
              title="Knowledge Center"
              subtitle="Expert guides and resources to help you navigate disaster recovery"
              maxItems={6}
            />
          </section>

          {/* Trust & Credibility Section */}
          <section className="bg-gradient-to-br from-blue-600 to-blue-700 py-16 md:py-24">
            <div className="container mx-auto px-6">
              <div className="text-center mb-12">
                <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-4">
                  Why Choose NRPG?
                </h2>
                <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                  Professional standards. Nationwide coverage. 24/7 response.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    IICRC Certified
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    Every contractor verified to IICRC industry standards for quality and safety
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    24/7 Emergency Response
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    Round-the-clock dispatch to connect you with the nearest qualified contractor
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-2xl backdrop-blur-sm mb-4">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </div>
                  <h3 className="font-display text-2xl font-bold text-white">
                    Insurance Approved
                  </h3>
                  <p className="text-blue-100 leading-relaxed">
                    All work documented to insurance standards with guaranteed quality
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* 5. JOIN NRPG SECTION - Contractor Recruitment */}
          <section className="container mx-auto px-6 py-16 md:py-24">
            <JoinNRPGSection variant="default" />
          </section>

          {/* Final Emergency CTA */}
          <section className="container mx-auto px-6 py-16">
            <EmergencyCTA
              title="Disaster Doesn't Wait. Neither Do We."
              description="24/7 emergency dispatch connecting you with IICRC-certified professionals"
              variant="default"
            />
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
                  Australia's premier IICRC-certified disaster recovery network. Professional standards. Nationwide coverage. 24/7 emergency response.
                </p>
                <div className="pt-4">
                  <a
                    href={EMERGENCY_PHONE.href}
                    className="inline-flex items-center gap-3 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-black rounded-xl transition-all"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {EMERGENCY_PHONE.display}
                  </a>
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
                    <Link href="/resources" className="hover:text-blue-400 transition-colors">
                      Resources
                    </Link>
                  </li>
                  <li>
                    <Link href="/contractor/join" className="hover:text-blue-400 transition-colors">
                      Join Network
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
                © {new Date().getFullYear()} National Restoration Professionals Group. All rights reserved.
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

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

/**
 * DesignOS Navigation Header Component
 *
 * Responsive header with:
 * - Horizontal menu on desktop (769px+)
 * - Hamburger menu on mobile/tablet (≤768px)
 * - Dual-brand support (Disaster Recovery vs NRPG)
 * - Emergency CTA always visible
 *
 * Strategic decision: 768px hamburger breakpoint (standard tablet)
 */

'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Menu, X, Phone } from 'lucide-react';
import { Button } from '../Button/Button';
import { useBrandTheme } from '../../hooks/useBrandTheme';

export interface HeaderProps {
  logoText?: string;
  phoneNumber?: string;
  emergencyCTA?: boolean;
  className?: string;
}

export function Header({
  logoText,
  phoneNumber = '1300 309 361',
  emergencyCTA = true,
  className,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const brand = useBrandTheme();

  const isNRPG = brand.brand === 'nrpg';
  const displayName = logoText || brand.name;

  // Close mobile menu on route change
  React.useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Navigation items (context-aware)
  const navItems = isNRPG
    ? [
        { label: 'Dashboard', href: '/dashboard/contractor' },
        { label: 'Training', href: '/dashboard/contractor/onboarding' },
        { label: 'Jobs', href: '/dashboard/contractor' },
        { label: 'Profile', href: '/dashboard/contractor/profile-setup' },
      ]
    : [
        { label: 'Emergency Help', href: '/emergency', highlighted: true },
        {
          label: 'Services',
          href: '/services',
          submenu: [
            { label: 'Flood & Water', href: '/services/flood-water-damage' },
            { label: 'Fire & Smoke', href: '/services/fire-smoke-restoration' },
            { label: 'Mould', href: '/services/mould-remediation' },
            { label: 'Bio & Forensic', href: '/services/bio-forensic-cleaning' },
          ],
        },
        {
          label: 'Education',
          href: '/education',
          submenu: [
            { label: 'Who First? Decision Tree', href: '/education/who-first' },
            { label: 'What Happens Next', href: '/education/process' },
            { label: 'Health & Safety', href: '/education/health-safety' },
          ],
        },
        { label: 'About NRPG', href: '/about' },
        { label: 'Contact', href: '/contact' },
      ];

  return (
    <header className={cn('sticky top-0 z-40 w-full border-b bg-background', className)}>
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div
            className={cn(
              'flex h-8 w-8 items-center justify-center rounded-full font-bold text-white',
              isNRPG ? 'bg-nrpg-primary' : 'bg-dr-education'
            )}
          >
            {displayName.charAt(0)}
          </div>
          <span className="hidden font-bold sm:inline-block">{displayName}</span>
        </Link>

        {/* Desktop Navigation (769px+) */}
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-primary',
                pathname === item.href ? 'text-foreground' : 'text-muted-foreground',
                item.highlighted && 'text-red-600 font-semibold'
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-4">
          {/* Emergency CTA (Desktop) */}
          {emergencyCTA && !isNRPG && (
            <Button
              variant="emergency-primary"
              size="default"
              className="hidden md:inline-flex"
              onClick={() => window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`}
            >
              <Phone className="mr-2 h-4 w-4" />
              {phoneNumber}
            </Button>
          )}

          {/* Hamburger Menu Button (≤768px) */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu (≤768px) */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="container space-y-1 p-4">
            {/* Emergency CTA at top (if client brand) */}
            {emergencyCTA && !isNRPG && (
              <div className="pb-4 mb-4 border-b">
                <Button
                  variant="emergency-primary"
                  size="crisis-full"
                  className="w-full"
                  onClick={() => window.location.href = `tel:${phoneNumber.replace(/\s/g, '')}`}
                >
                  <Phone className="mr-2 h-5 w-5" />
                  Emergency: {phoneNumber}
                </Button>
              </div>
            )}

            {/* Navigation Items */}
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    'block px-3 py-2 rounded-md text-base font-medium',
                    pathname === item.href
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground',
                    item.highlighted && 'text-red-600 font-semibold'
                  )}
                >
                  {item.label}
                </Link>

                {/* Submenu items (if any) */}
                {item.submenu && (
                  <div className="ml-4 mt-1 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className="block px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

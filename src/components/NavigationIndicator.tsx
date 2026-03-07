'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

const navigationStructure: NavItem[] = [
  {
    label: 'Services',
    href: '/services',
    children: [
      { label: 'Water Damage', href: '/services/water-damage' },
      { label: 'Fire & Smoke', href: '/services/fire-damage' },
      { label: 'Mould Remediation', href: '/services/mould-remediation' },
      { label: 'Biohazard Cleaning', href: '/services/biohazard' },
      { label: 'Storm Damage', href: '/services/storm-damage' },
    ]
  },
  {
    label: 'Locations',
    href: '/locations',
    children: [
      { label: 'Sydney', href: '/locations/sydney' },
      { label: 'Melbourne', href: '/locations/melbourne' },
      { label: 'Brisbane', href: '/locations/brisbane' },
      { label: 'Perth', href: '/locations/perth' },
      { label: 'Adelaide', href: '/locations/adelaide' },
    ]
  },
  {
    label: 'Resources',
    href: '/guides',
    children: [
      { label: 'Guides', href: '/guides' },
      { label: 'Insurance Claims', href: '/insurance' },
      { label: 'Cost Guides', href: '/cost' },
      { label: 'Blog', href: '/blog' },
    ]
  },
  {
    label: 'About',
    href: '/about',
    children: [
      { label: 'Why First', href: '/why-first' },
      { label: 'Our Process', href: '/how-it-works' },
      { label: 'Certifications', href: '/certifications' },
      { label: 'Testimonials', href: '/testimonials' },
    ]
  },
  {
    label: 'Contact',
    href: '/contact',
    children: [
      { label: 'Lodge a Claim', href: '/claim' },
      { label: 'Cost Estimator', href: '/tools/cost-estimator' },
      { label: 'Contact Us', href: '/contact' },
    ]
  }
];

export default function NavigationIndicator() {
  const pathname = usePathname();

  // Find the current section and subsection
  const getCurrentSection = () => {
    for (const section of navigationStructure) {
      if (pathname === section.href) {
        return { section, subsection: null };
      }
      if (section.children) {
        for (const child of section.children) {
          if (pathname === child.href) {
            return { section, subsection: child };
          }
        }
      }
      // Check if pathname starts with section href
      if (pathname.startsWith(section.href + '/')) {
        return { section, subsection: null };
      }
    }
    return { section: null, subsection: null };
  };

  const { section, subsection } = getCurrentSection();

  if (!section) return null;

  return (
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-200">
      <div className="container mx-auto px-4 py-3">
        {/* Current Section Indicator */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-gray-600">You are in:</span>
            <div className="flex items-center space-x-2">
              <Link 
                href={section.href}
                className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
              >
                {section.label}
              </Link>
              {subsection && (
                <>
                  <ChevronRight className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-800 font-medium">{subsection.label}</span>
                </>
              )}
            </div>
          </div>

          {/* Quick Navigation — dedupe by href so same link appears once */}
          {section.children && section.children.length > 0 && (() => {
            const basePath = pathname.split('?')[0];
            const seen = new Set<string>();
            const links = section.children
              .filter(child => {
                if (child.href === basePath) return false;
                if (seen.has(child.href)) return false;
                seen.add(child.href);
                return true;
              })
              .slice(0, 3);
            return (
              <div className="hidden md:flex items-center space-x-1">
                <span className="text-sm text-gray-500 mr-2">Also in {section.label}:</span>
                {links.map((child) => (
                  <Link
                    key={child.href}
                    href={child.href}
                    className="px-3 py-1 text-sm bg-white rounded-full hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-all"
                  >
                    {child.label}
                  </Link>
                ))}
              </div>
            );
          })()}
        </div>

        {/* Visual Progress Indicator */}
        <div className="mt-3 flex items-center space-x-2">
          {section.children && section.children.length > 0 && (
            <div className="flex space-x-1">
              {section.children.map((child) => (
                <div
                  key={child.href}
                  className={`h-1 w-8 rounded-full transition-all ${
                    pathname === child.href
                      ? 'bg-blue-600'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  title={child.label}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
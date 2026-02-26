'use client';

import { usePathname } from 'next/navigation';
import Script from 'next/script';

// Human-readable labels for common URL segments
const SEGMENT_LABELS: Record<string, string> = {
  'services': 'Services',
  'locations': 'Locations',
  'guides': 'Guides',
  'insurance': 'Insurance',
  'emergency': 'Emergency',
  'water-damage': 'Water Damage',
  'fire-damage': 'Fire Damage',
  'mould': 'Mould Remediation',
  'storm': 'Storm Damage',
  'storm-damage': 'Storm Damage',
  'flood-damage': 'Flood Damage',
  'biohazard': 'Biohazard',
  'about': 'About',
  'contact': 'Contact',
  'claim': 'Lodge a Claim',
  'faq': 'FAQ',
  'cost': 'Cost Guide',
  'blog': 'Blog',
  'careers': 'Careers',
  'certifications': 'Certifications',
  'equipment': 'Equipment',
  'property-types': 'Property Types',
  'case-studies': 'Case Studies',
  'compare': 'Compare',
  'disasters': 'Disasters',
  'industries': 'Industries',
  'technology': 'Technology',
  'operational-excellence': 'Operational Excellence',
  'standards': 'Standards',
  'resources': 'Resources',
  'book-service': 'Book a Service',
  'how-it-works': 'How It Works',
  'for': 'Solutions',
  'facts': 'Facts',
  'testimonials': 'Testimonials',
  'assessment': 'Assessment',
  'privacy': 'Privacy Policy',
  'terms': 'Terms of Service',
  'disclaimer': 'Disclaimer',
  'cookies': 'Cookie Policy',
  'legal': 'Legal',
  'accessibility': 'Accessibility',
  'insurance-claims': 'Insurance Claims',
  'commercial': 'Commercial',
  'professional': 'Professional',
  'pricing': 'Pricing',
  'insurance-guides': 'Insurance Guides',
  'industry-problems': 'Industry Problems',
  'flood-damage-hardwood-floors': 'Flood Damage Hardwood Floors',
  'property-managers': 'Property Managers',
  'strata-managers': 'Strata Managers',
  'business-owners': 'Business Owners',
  'facility-managers': 'Facility Managers',
  'real-estate-agents': 'Real Estate Agents',
  'body-corporate': 'Body Corporate',
  'building-managers': 'Building Managers',
};

/** Convert a URL slug to a readable label */
function segmentToLabel(segment: string): string {
  if (SEGMENT_LABELS[segment]) return SEGMENT_LABELS[segment];
  // Fallback: convert kebab-case to Title Case
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

// All schema data below is trusted static content — safe to inject
export default function DynamicBreadcrumbSchema() {
  const pathname = usePathname();

  const segments = pathname === '/'
    ? []
    : pathname.split('/').filter(Boolean);

  const baseUrl = 'https://disasterrecovery.com.au';

  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: baseUrl,
    },
    ...segments.map((segment, index) => ({
      '@type': 'ListItem',
      position: index + 2,
      name: segmentToLabel(segment),
      item: `${baseUrl}/${segments.slice(0, index + 1).join('/')}`,
    })),
  ];

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };

  return (
    <Script
      id="breadcrumb-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

export function Breadcrumbs({ items }: { items?: BreadcrumbItem[] }) {
  const pathname = usePathname();
  
  // Auto-generate breadcrumbs if not provided
  const breadcrumbs = items || generateBreadcrumbs(pathname);
  
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.href ? `https://disasterrecovery.com.au${item.href}` : undefined,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      
      <nav aria-label="Breadcrumb" className="bg-gray-50 border-b">
        <div className="container mx-auto px-6 py-3">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link 
                href="/" 
                className="text-gray-500 hover:text-gray-700 transition-colours"
                aria-label="Home"
              >
                <Home className="h-4 w-4" />
              </Link>
            </li>
            
            {breadcrumbs.map((item, index) => (
              <li key={index} className="flex items-center">
                <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
                {item.href ? (
                  <Link 
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colours"
                  >
                    {item.name}
                  </Link>
                ) : (
                  <span className="text-gray-900 font-medium">{item.name}</span>
                )}
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}

function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [];
  
  // Build breadcrumbs from URL segments
  segments.forEach((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const isLast = index === segments.length - 1;
    
    // Format segment name
    const name = formatSegmentName(segment);
    
    breadcrumbs.push({
      name,
      href: isLast ? undefined : href,
    });
  });
  
  return breadcrumbs;
}

function formatSegmentName(segment: string): string {
  // Special cases
  const specialCases: Record<string, string> = {
    'water-damage': 'Water Damage Restoration',
    'fire-damage': 'Fire & Smoke Damage',
    'mould-remediation': 'Mould Remediation',
    'emergency-response': 'Emergency Response',
    'biohazard': 'Biohazard Cleanup',
    'commercial': 'Commercial Services',
    'technical-assessment': 'Technical Assessment',
    'content-restoration': 'Content Restoration',
    'structural-services': 'Structural Services',
    'iicrc': 'IICRC Standards',
    'get-help': 'Get Emergency Help',
  };
  
  if (specialCases[segment]) {
    return specialCases[segment];
  }
  
  // Default: capitalize each word
  return segment
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}
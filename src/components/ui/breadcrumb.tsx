'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { usePathname } from 'next/navigation';
import Script from 'next/script';

interface BreadcrumbItem {
  label: string;
  href: string;
}

export function Breadcrumb() {
  const pathname = usePathname();
  
  // Don't show breadcrumb on homepage
  if (pathname === '/') return null;
  
  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = (): BreadcrumbItem[] => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: 'Home', href: '/' }
    ];
    
    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      
      // Format the label (replace hyphens with spaces and capitalize)
      const label = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      breadcrumbs.push({
        label,
        href: currentPath
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  // Generate JSON-LD structured data for breadcrumbs
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.label,
      "item": `https://disasterrecovery.com.au${item.href}`
    }))
  };
  
  return (
    <>
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      
      <nav 
        className="bg-gray-50 border-b"
        aria-label="Breadcrumb"
      >
        <div className="container mx-auto px-4 py-3">
          <ol 
            className="flex items-centre space-x-2 text-sm"
            itemScope
            itemType="https://schema.org/BreadcrumbList"
          >
            {breadcrumbs.map((item, index) => (
              <li 
                key={item.href}
                className="flex items-centre"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
              >
                {index > 0 && (
                  <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
                )}
                
                {index === breadcrumbs.length - 1 ? (
                  // Current page (not a link)
                  <span 
                    className="text-gray-700 font-medium"
                    itemProp="name"
                  >
                    {item.label}
                  </span>
                ) : (
                  // Clickable breadcrumb
                  <Link 
                    href={item.href}
                    className="text-blue-600 hover:text-blue-800 hover:underline flex items-centre"
                    itemProp="item"
                  >
                    {index === 0 && (
                      <Home className="h-4 w-4 mr-1" />
                    )}
                    <span itemProp="name">{item.label}</span>
                  </Link>
                )}
                
                <meta itemProp="position" content={(index + 1).toString()} />
              </li>
            ))}
          </ol>
        </div>
      </nav>
    </>
  );
}
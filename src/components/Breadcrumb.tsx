'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumb() {
  const pathname = usePathname();
  
  // Show simple breadcrumb even on homepage
  if (pathname === '/') {
    return (
      <nav aria-label="breadcrumb" className="breadcrumb-navigation bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4 py-2">
          <ol className="flex items-center space-x-2 text-sm">
            <li className="flex items-center text-gray-900 font-medium">
              <Home className="w-4 h-4 mr-1" />
              Home
            </li>
          </ol>
        </div>
      </nav>
    );
  }
  
  // Generate breadcrumb items from pathname
  const generateBreadcrumbs = () => {
    const paths = pathname.split('/').filter(Boolean);
    const breadcrumbs: Array<{ name: string; href: string; icon: typeof Home | null }> = [
      { name: 'Home', href: '/', icon: Home }
    ];
    
    // Build up the path for each segment
    let currentPath = '';
    paths.forEach((path, index) => {
      currentPath += `/${path}`;
      
      // Format the name (replace hyphens with spaces and capitalize)
      let name = path
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
      
      // Special case handling for known routes
      const specialCases: Record<string, string> = {
        'water-damage': 'Water Damage',
        'fire-damage': 'Fire & Smoke',
        'mould-remediation': 'Mould Remediation',
        'demo': 'Demonstration',
        'workflow': 'Workflow Demo',
        'forms': 'Form Demo',
        'pitch': 'Pitch Decks',
        'investor': 'Investor Pitch',
        'client': 'Client Pitch',
        'contractor': 'Contractor Pitch',
        'why-first': 'Why First',
        'book-service': 'Book Service',
        'client-portal': 'Client Portal',
        'contractor-portal': 'Contractor Portal'
      };
      
      if (specialCases[path]) {
        name = specialCases[path];
      }
      
      breadcrumbs.push({
        name,
        href: currentPath,
        icon: null
      });
    });
    
    return breadcrumbs;
  };
  
  const breadcrumbs = generateBreadcrumbs();
  
  return (
    <nav 
      aria-label="breadcrumb" 
      className="breadcrumb-navigation w-full bg-gray-50 border-b border-gray-200"
    >
      <div className="container mx-auto px-4 py-3">
        <ol 
          className="flex items-center space-x-2 text-sm"
          itemScope 
          itemType="https://schema.org/BreadcrumbList"
        >
          {breadcrumbs.map((item, index) => (
            <li 
              key={item.href}
              className="flex items-center"
              itemProp="itemListElement" 
              itemScope 
              itemType="https://schema.org/ListItem"
            >
              {index > 0 && (
                <ChevronRight className="w-4 h-4 text-gray-700 mx-2" />
              )}
              
              {index === breadcrumbs.length - 1 ? (
                // Current page (not a link)
                <span 
                  className="text-gray-700 font-medium flex items-center"
                  itemProp="name"
                >
                  {item.icon && <item.icon className="w-4 h-4 mr-1" />}
                  {item.name}
                </span>
              ) : (
                // Clickable breadcrumb
                <Link 
                  href={item.href}
                  className="text-blue-600 hover:text-blue-800 transition-colors flex items-center"
                  itemProp="item"
                >
                  <span itemProp="name">
                    {item.icon && <item.icon className="w-4 h-4 mr-1" />}
                    {item.name}
                  </span>
                </Link>
              )}
              
              <meta itemProp="position" content={String(index + 1)} />
            </li>
          ))}
        </ol>
      </div>
    </nav>
  );
}
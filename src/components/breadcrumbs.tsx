'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { usePathname } from 'next/navigation';

export function Breadcrumbs() {
  const pathname = usePathname();
  const paths = pathname.split('/').filter(Boolean);
  
  if (paths.length === 0) return null;
  
  const breadcrumbs = paths.map((path, index) => {
    const href = `/${paths.slice(0, index + 1).join('/')}`;
    const label = path
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    return { href, label };
  });
  
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 bg-gray-50 border-b">
      <ol className="flex items-centre space-x-2 text-sm">
        <li>
          <Link href="/" className="text-gray-600 hover:text-blue-600">
            Home
          </Link>
        </li>
        {breadcrumbs.map((crumb, index) => (
          <li key={crumb.href} className="flex items-centre">
            <ChevronRight className="h-4 w-4 text-gray-400 mx-2" />
            {index === breadcrumbs.length - 1 ? (
              <span className="text-gray-900 font-medium">{crumb.label}</span>
            ) : (
              <Link href={crumb.href} className="text-gray-600 hover:text-blue-600">
                {crumb.label}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
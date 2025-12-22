'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbNavigationProps {
  items: BreadcrumbItem[];
  separator?: React.ReactNode;
  homeLink?: string;
  showHome?: boolean;
  className?: string;
}

export default function BreadcrumbNavigation({
  items,
  separator = <ChevronRight className="w-4 h-4" />,
  homeLink = '/',
  showHome = true,
  className = '',
}: BreadcrumbNavigationProps) {
  return (
    <nav
      className={`flex items-center gap-2 text-sm ${className}`}
      aria-label="Breadcrumb"
    >
      {showHome && (
        <>
          <Link
            href={homeLink}
            className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
          >
            <Home className="w-4 h-4" />
            <span className="hidden sm:inline">Home</span>
          </Link>
          {items.length > 0 && <div className="text-slate-400">{separator}</div>}
        </>
      )}

      {items.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          {item.href ? (
            <Link
              href={item.href}
              className="flex items-center gap-1 text-slate-600 hover:text-slate-900 transition-colors"
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ) : (
            <span className="flex items-center gap-1 text-slate-900 font-medium">
              {item.icon}
              {item.label}
            </span>
          )}

          {index < items.length - 1 && (
            <div className="text-slate-400">{separator}</div>
          )}
        </div>
      ))}
    </nav>
  );
}

// Helper function to generate breadcrumb items from pathname
export function getBreadcrumbsFromPath(pathname: string): BreadcrumbItem[] {
  const segments = pathname.split('/').filter(Boolean);

  return segments.map((segment, index) => {
    const href = '/' + segments.slice(0, index + 1).join('/');
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    return {
      label,
      href: index < segments.length - 1 ? href : undefined,
    };
  });
}

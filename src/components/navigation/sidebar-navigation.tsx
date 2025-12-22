'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronDown, X } from 'lucide-react';

export interface SidebarNavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: number;
  submenu?: SidebarNavItem[];
}

interface SidebarNavigationProps {
  items: SidebarNavItem[];
  isOpen: boolean;
  onClose?: () => void;
  logo?: React.ReactNode;
  theme?: 'light' | 'dark';
  collapsible?: boolean;
}

export default function SidebarNavigation({
  items,
  isOpen,
  onClose,
  logo,
  theme = 'light',
  collapsible = true,
}: SidebarNavigationProps) {
  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const pathname = usePathname();

  const toggleSubmenu = (href: string) => {
    const newExpanded = new Set(expandedItems);
    if (newExpanded.has(href)) {
      newExpanded.delete(href);
    } else {
      newExpanded.add(href);
    }
    setExpandedItems(newExpanded);
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const themeClasses = {
    light: {
      bg: 'bg-white',
      text: 'text-slate-900',
      border: 'border-slate-200',
      hover: 'hover:bg-slate-50',
      active: 'bg-slate-100',
    },
    dark: {
      bg: 'bg-slate-900',
      text: 'text-white',
      border: 'border-slate-700',
      hover: 'hover:bg-slate-800',
      active: 'bg-slate-700',
    },
  };

  const colors = themeClasses[theme];

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 lg:hidden z-40"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky left-0 top-0 h-screen w-64 ${colors.bg} border-r ${colors.border} transition-all duration-300 z-50 overflow-y-auto ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Header */}
        <div className={`p-6 border-b ${colors.border} flex items-center justify-between`}>
          <div className={`text-lg font-bold ${colors.text}`}>
            {logo || 'Navigation'}
          </div>
          <button
            onClick={onClose}
            className="lg:hidden p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-2">
          {items.map((item) => (
            <div key={item.href}>
              <button
                onClick={() => item.submenu && toggleSubmenu(item.href)}
                className={`w-full flex items-center justify-between gap-3 px-4 py-2.5 rounded-lg transition-colors ${
                  isActive(item.href)
                    ? `${colors.active} ${colors.text} font-semibold`
                    : `${colors.hover} ${colors.text}`
                }`}
              >
                <Link href={item.href} className="flex items-center gap-3 flex-1 text-left">
                  <span className="w-5 h-5 flex items-center justify-center">
                    {item.icon}
                  </span>
                  <span className="text-sm font-medium">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto px-2 py-0.5 bg-red-500 text-white text-xs rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
                {item.submenu && (
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${
                      expandedItems.has(item.href) ? 'rotate-180' : ''
                    }`}
                  />
                )}
              </button>

              {/* Submenu */}
              {item.submenu && expandedItems.has(item.href) && (
                <div className="ml-4 mt-2 space-y-1 border-l-2 border-slate-300 dark:border-slate-600 pl-2">
                  {item.submenu.map((subitem) => (
                    <Link
                      key={subitem.href}
                      href={subitem.href}
                      className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                        isActive(subitem.href)
                          ? `${colors.active} ${colors.text} font-semibold`
                          : `${colors.hover} ${colors.text}`
                      }`}
                    >
                      <span className="w-4 h-4 flex items-center justify-center">
                        {subitem.icon}
                      </span>
                      {subitem.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

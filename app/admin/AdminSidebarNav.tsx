'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { LucideIcon } from 'lucide-react';

type NavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

type NavGroup = {
  label: string;
  items: NavItem[];
};

function isActive(pathname: string, href: string) {
  if (href === '/admin') return pathname === '/admin';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function AdminSidebarNav({ groups }: { groups: NavGroup[] }) {
  const pathname = usePathname() || '/admin';

  return (
    <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3">
      {groups.map((group) => (
        <div key={group.label} className="mb-6 last:mb-0">
          <div className="px-3 mb-2">
            <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
              {group.label}
            </span>
          </div>
          <ul className="space-y-0.5" role="list">
            {group.items.map((item) => {
              const Icon = item.icon;
              const active = isActive(pathname, item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={active ? 'page' : undefined}
                    className={`flex items-center gap-3 px-3 py-3 min-h-[44px] rounded-lg text-[15px] font-medium transition-all duration-150 ${
                      active
                        ? 'bg-[var(--ag-primary-blue)]/40 text-white shadow-sm ring-1 ring-white/10'
                        : 'text-gray-400 hover:bg-gray-800/70 hover:text-gray-200'
                    }`}
                  >
                    <Icon
                      className={`h-[18px] w-[18px] shrink-0 ${
                        active ? 'text-[var(--ag-emergency-red)]' : 'text-gray-500'
                      }`}
                    />
                    <span className="flex-1 truncate">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );
}

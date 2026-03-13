'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  ShieldAlert,
  Search,
  ClipboardCheck,
  Globe,
  BarChart3,
  LogOut,
  ChevronRight,
} from 'lucide-react';

const navGroups = [
  {
    label: 'Overview',
    items: [
      { href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
    ],
  },
  {
    label: 'Operations',
    items: [
      { href: '/admin/applications', label: 'Contractor applications', icon: FileText },
      { href: '/admin/leads', label: 'Leads', icon: ClipboardCheck },
    ],
  },
  {
    label: 'Compliance & verification',
    items: [
      { href: '/admin/fraud-detection', label: 'Fraud detection', icon: ShieldAlert },
      { href: '/admin/proof-of-work', label: 'Proof of work', icon: ClipboardCheck },
    ],
  },
  {
    label: 'Content & SEO',
    items: [
      { href: '/admin/seo-pages', label: 'SEO pages', icon: Search },
      { href: '/admin/site-audit', label: 'Site audit', icon: Globe },
      { href: '/admin/semrush-dashboard', label: 'SEMrush', icon: BarChart3 },
    ],
  },
];

function NavLink({
  href,
  label,
  icon: Icon,
  isActive,
}: {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  isActive: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        isActive
          ? 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium bg-gray-800 text-white shadow-inner focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900'
          : 'flex items-center gap-3 px-3 py-2.5 rounded-lg text-[15px] font-medium text-gray-400 hover:bg-gray-800/70 hover:text-gray-200 transition-all duration-150 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900'
      }
    >
      <Icon className={`h-[18px] w-[18px] shrink-0 ${isActive ? 'text-orange-400' : 'text-gray-500'}`} />
      <span className="flex-1 truncate">{label}</span>
      {isActive && <ChevronRight className="h-4 w-4 shrink-0 text-orange-400/80" />}
    </Link>
  );
}

function UserInitial({ email }: { email: string }) {
  const initial = email ? email[0].toUpperCase() : '?';
  return (
    <div
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-700 text-sm font-semibold text-gray-200"
      title={email}
    >
      {initial}
    </div>
  );
}

export function AdminSidebar({ userEmail }: { userEmail: string | null }) {
  const pathname = usePathname();

  const isActive = (href: string, exact?: boolean) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + '/');
  };

  return (
    <aside
      className="flex flex-col fixed inset-y-0 left-0 z-30 bg-gray-900 text-gray-100 border-r border-gray-800/80 shadow-xl shadow-black/20 w-64"
    >
      <div className="flex h-16 shrink-0 items-center gap-3 border-b border-gray-800/80 px-4">
      <div className="ag-logo">
          <Link href="/">
            <div className="ag-logo-mark">
              <svg
                viewBox="0 0 80 32"
                className="ag-heartbeat-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M 2 18 h 8 l 4 -10 l 7 20 l 6 -26 l 4 16 h 5"
                  fill="none"
                  stroke="var(--ag-emergency-red)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <circle cx="36" cy="18" r="2.5" fill="var(--ag-emergency-red)" />
                <text x="40" y="26" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="24" fill="var(--ag-emergency-red)">D</text>
                <text x="58" y="26" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="24" fill="#a0aab2">R</text>
              </svg>
            </div>
            <div className="ag-logo-text">
              <span className="ag-logo-title text-white">Disaster Recovery</span>
            </div>
          </Link>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto overflow-x-hidden py-4 px-3">
        {navGroups.map((group) => (
          <div key={group.label} className="mb-6 last:mb-0">
            <div className="px-3 mb-2">
              <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-wider">
                {group.label}
              </span>
            </div>
            <ul className="space-y-0.5" role="list">
              {group.items.map((item) => (
                <li key={item.href}>
                  <NavLink
                    href={item.href}
                    label={item.label}
                    icon={item.icon}
                    isActive={isActive(item.href, item.exact)}
                  />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </nav>

      <div className="shrink-0 border-t border-gray-800/80 p-3">
        <div className="rounded-lg bg-gray-800/50 p-3">
          <div className="flex items-center gap-3 mb-2">
            <UserInitial email={userEmail ?? ''} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-200 truncate" title={userEmail ?? ''}>
                {userEmail ?? 'Admin'}
              </p>
              <p className="text-[11px] text-gray-500">Administrator</p>
            </div>
          </div>
          <a
            href="/api/auth/signout"
            className="flex items-center gap-2.5 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            <span>Sign out</span>
          </a>
        </div>
      </div>
    </aside>
  );
}

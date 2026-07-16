import { redirect } from 'next/navigation';
import Link from 'next/link';
import { getSessionFromCookies } from '@/lib/auth/session';
import { isAdminRole } from '@/lib/admin-constants';
import {
  LayoutDashboard,
  FileText,
  ShieldAlert,
  Search,
  ClipboardCheck,
  Globe,
  BarChart3,
} from 'lucide-react';
import { AdminSidebarNav } from './AdminSidebarNav';
import { AdminLogoutButton } from './AdminLogoutButton';

const SIDEBAR_WIDTH = '16rem';

const navGroups = [
  {
    label: 'Overview',
    items: [{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard }],
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

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  let session = null;
  try {
    session = await getSessionFromCookies();
  } catch {
    session = null;
  }

  if (!session) {
    redirect(`/login?callbackUrl=${encodeURIComponent('/admin')}&reason=session_expired`);
  }

  if (!isAdminRole(session.role)) {
    redirect('/account');
  }

  const userEmail = session.email ?? '';

  return (
    <div className="min-h-screen bg-[var(--ag-background-light,#f4f6f8)] flex">
      <aside className="flex flex-col fixed inset-y-0 left-0 z-30 bg-gray-900 text-gray-100 border-r border-gray-800/80 shadow-xl shadow-black/20 w-64">
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
                  <text
                    x="40"
                    y="26"
                    fontFamily="ui-sans-serif, system-ui, sans-serif"
                    fontWeight="900"
                    fontSize="24"
                    fill="var(--ag-emergency-red)"
                  >
                    D
                  </text>
                  <text
                    x="58"
                    y="26"
                    fontFamily="ui-sans-serif, system-ui, sans-serif"
                    fontWeight="900"
                    fontSize="24"
                    fill="#a0aab2"
                  >
                    R
                  </text>
                </svg>
              </div>
              <div className="ag-logo-text">
                <span className="ag-logo-title text-white">Disaster Recovery</span>
              </div>
            </Link>
          </div>
        </div>

        <AdminSidebarNav groups={navGroups} />

        <div className="shrink-0 border-t border-gray-800/80 p-3">
          <div className="rounded-lg bg-gray-800/50 p-3">
            <div className="flex items-center gap-3 mb-2">
              <div
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-semibold text-white"
                style={{ background: 'var(--ag-primary-blue)' }}
                title={userEmail}
              >
                {userEmail ? userEmail[0].toUpperCase() : '?'}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-gray-200 truncate" title={userEmail}>
                  {userEmail || 'Admin'}
                </p>
                <p className="text-[11px] text-gray-500">
                  {session.role === 'SUPER_ADMIN' ? 'Super-admin' : 'Administrator'}
                </p>
              </div>
            </div>
            <AdminLogoutButton />
          </div>
        </div>
      </aside>

      <main className="flex-1 min-w-0 p-6 lg:p-8" style={{ marginLeft: SIDEBAR_WIDTH }}>
        {children}
      </main>
    </div>
  );
}

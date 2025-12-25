'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Menu,
  X,
  Bell,
  Search,
  ChevronDown,
  LogOut,
  Settings,
  User,
  LayoutDashboard,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon?: React.ReactNode;
  badge?: number;
  submenu?: NavItem[];
}

interface MainNavigationProps {
  navItems: NavItem[];
  userRole?: 'customer' | 'contractor' | 'admin';
  userName?: string;
  userInitials?: string;
  notificationCount?: number;
  onLogout?: () => void;
  searchEnabled?: boolean;
  onSearch?: (query: string) => void;
}

export default function MainNavigation({
  navItems,
  userRole = 'customer',
  userName = 'User',
  userInitials = 'U',
  notificationCount = 0,
  onLogout,
  searchEnabled = true,
  onSearch,
}: MainNavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(href + '/');
  };

  const roleColors = {
    customer: 'from-blue-600 to-blue-700',
    contractor: 'from-orange-600 to-orange-700',
    admin: 'from-indigo-600 to-indigo-700',
  };

  return (
    <nav className={`bg-gradient-to-r ${roleColors[userRole]} text-white sticky top-0 z-50 shadow-lg`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="p-2 bg-white bg-opacity-20 rounded-lg group-hover:bg-opacity-30 transition-all">
                <LayoutDashboard className="w-5 h-5" />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-lg font-bold">NRPG</h1>
                <p className="text-xs text-opacity-75">Disaster Recovery</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <div key={item.href} className="relative group">
                <Link
                  href={item.href}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                    isActive(item.href)
                      ? 'bg-white bg-opacity-20'
                      : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  {item.icon}
                  {item.label}
                  {item.badge && (
                    <span className="ml-1 px-2 py-0.5 bg-red-500 text-xs rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                  {item.submenu && <ChevronDown className="w-4 h-4" />}
                </Link>

                {/* Submenu */}
                {item.submenu && (
                  <div className="absolute left-0 mt-0 w-48 bg-white text-slate-900 rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className="block px-4 py-2 text-sm hover:bg-slate-100 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Search */}
            {searchEnabled && (
              <form onSubmit={handleSearch} className="hidden lg:flex items-center gap-2 bg-white bg-opacity-10 rounded-lg px-3 py-1.5">
                <Search className="w-4 h-4 text-opacity-75" />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-transparent outline-none text-sm placeholder-white placeholder-opacity-50 w-32"
                />
              </form>
            )}

            {/* Notifications */}
            <button className="relative p-2 hover:bg-white hover:bg-opacity-10 rounded-lg transition-all">
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {notificationCount}
                </span>
              )}
            </button>

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                className="flex items-center gap-2 p-1.5 hover:bg-white hover:bg-opacity-10 rounded-lg transition-all"
              >
                <div className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center font-bold text-sm">
                  {userInitials}
                </div>
                <span className="hidden sm:inline text-sm font-medium">{userName}</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {/* Profile Dropdown Menu */}
              {profileDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-slate-900 rounded-lg shadow-xl z-50">
                  <div className="p-4 border-b border-slate-200">
                    <p className="font-semibold">{userName}</p>
                    <p className="text-xs text-slate-500 capitalize">{userRole} Account</p>
                  </div>
                  <div className="p-2 space-y-1">
                    <button className="w-full text-left px-4 py-2 hover:bg-slate-100 rounded text-sm flex items-center gap-2">
                      <User className="w-4 h-4" />
                      My Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 hover:bg-slate-100 rounded text-sm flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <div className="my-1 h-px bg-slate-200"></div>
                    <button
                      onClick={onLogout}
                      className="w-full text-left px-4 py-2 hover:bg-slate-100 rounded text-sm text-red-600 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 hover:bg-white hover:bg-opacity-10 rounded-lg"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            {navItems.map((item) => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive(item.href)
                      ? 'bg-white bg-opacity-20'
                      : 'hover:bg-white hover:bg-opacity-10'
                  }`}
                >
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 px-2 py-0.5 bg-red-500 text-xs rounded-full font-bold inline-block">
                      {item.badge}
                    </span>
                  )}
                </Link>
                {item.submenu && (
                  <div className="pl-4 space-y-1">
                    {item.submenu.map((subitem) => (
                      <Link
                        key={subitem.href}
                        href={subitem.href}
                        className="block px-3 py-1 text-xs hover:bg-white hover:bg-opacity-10 rounded"
                      >
                        {subitem.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Dropdown Overlay Close */}
      {profileDropdownOpen && (
        <div
          className="fixed inset-0"
          onClick={() => setProfileDropdownOpen(false)}
        />
      )}
    </nav>
  );
}

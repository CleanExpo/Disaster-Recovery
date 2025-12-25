'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, Home, Zap, FileText, Settings, LogOut, Bell, Search, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface CustomerPortalLayoutProps {
  children: React.ReactNode;
  userName?: string;
  notificationCount?: number;
}

export default function CustomerPortalLayout({
  children,
  userName = 'Guest',
  notificationCount = 0,
}: CustomerPortalLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navigationItems = [
    {
      label: 'Dashboard',
      href: '/customer/dashboard',
      icon: Home,
      badge: null,
    },
    {
      label: 'My Bookings',
      href: '/customer/bookings',
      icon: Zap,
      badge: null,
    },
    {
      label: 'My Claims',
      href: '/customer/claims',
      icon: FileText,
      badge: null,
    },
    {
      label: 'Settings',
      href: '/customer/settings',
      icon: Settings,
      badge: null,
    },
  ];

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`${
          sidebarOpen ? 'w-64' : 'w-0'
        } bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 overflow-hidden md:w-64 flex flex-col`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-blue-700">
          <h2 className="text-2xl font-bold">DisasterHub</h2>
          <p className="text-blue-200 text-sm">Customer Portal</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <div
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all cursor-pointer ${
                    active
                      ? 'bg-blue-700 shadow-lg'
                      : 'hover:bg-blue-700/50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="flex-1">{item.label}</span>
                  {item.badge && (
                    <Badge variant="destructive" className="text-xs">
                      {item.badge}
                    </Badge>
                  )}
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-blue-700">
          <Button
            variant="ghost"
            className="w-full justify-start text-blue-100 hover:text-white hover:bg-blue-700"
          >
            <LogOut className="h-5 w-5 mr-2" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation Bar */}
        <header className="bg-white shadow-sm border-b">
          <div className="px-6 py-4 flex items-center justify-between">
            {/* Left side */}
            <div className="flex items-center gap-4">
              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>

              {/* Sidebar Toggle */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="hidden md:block p-2 hover:bg-gray-100 rounded-lg"
              >
                <Menu className="h-5 w-5" />
              </button>

              {/* Search Bar */}
              <div className="hidden md:flex items-center bg-gray-100 rounded-lg px-3 py-2 w-64">
                <Search className="h-4 w-4 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search bookings, claims..."
                  className="bg-transparent ml-2 outline-none w-full text-sm"
                />
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 hover:bg-gray-100 rounded-lg">
                <Bell className="h-5 w-5" />
                {notificationCount > 0 && (
                  <Badge variant="destructive" className="absolute -top-1 -right-1 text-xs h-5 w-5 flex items-center justify-center p-0">
                    {notificationCount}
                  </Badge>
                )}
              </button>

              {/* User Menu */}
              <div className="flex items-center gap-3 pl-4 border-l">
                <div className="hidden sm:block text-right">
                  <p className="text-sm font-medium">{userName}</p>
                  <p className="text-xs text-gray-500">Customer</p>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-lg">
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden px-4 py-2 border-t space-y-1">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link key={item.href} href={item.href}>
                    <div
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer ${
                        active
                          ? 'bg-blue-100 text-blue-900'
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

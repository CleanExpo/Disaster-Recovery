'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  Briefcase,
  MapPin,
  FileText,
  Phone,
  ChevronRight,
  ChevronDown,
  Shield,
  Droplets,
  Flame,
  Wind,
  Building2,
  AlertTriangle,
  Search,
  User,
  Settings
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  title: string;
  href?: string;
  icon?: React.ElementType;
  children?: NavItem[];
  badge?: string;
}

const navigation: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: Home,
  },
  {
    title: 'Services',
    icon: Briefcase,
    children: [
      { title: 'Water Damage', href: '/services/water-damage', icon: Droplets },
      { title: 'Fire & Smoke', href: '/services/fire-damage', icon: Flame },
      { title: 'Mould Remediation', href: '/services/mould-remediation', icon: Shield },
      { title: 'Storm Damage', href: '/services/storm-damage', icon: Wind },
      { title: 'Biohazard Cleaning', href: '/services/biohazard', icon: AlertTriangle },
      { title: 'Commercial Services', href: '/services/commercial', icon: Building2 },
    ],
  },
  {
    title: 'Locations',
    icon: MapPin,
    children: [
      { title: 'Sydney', href: '/locations/sydney' },
      { title: 'Melbourne', href: '/locations/melbourne' },
      { title: 'Brisbane', href: '/locations/brisbane' },
      { title: 'Perth', href: '/locations/perth' },
      { title: 'Adelaide', href: '/locations/adelaide' },
      { title: 'View All Locations', href: '/locations', badge: '100+' },
    ],
  },
  {
    title: 'Resources',
    icon: FileText,
    children: [
      { title: 'Emergency Guide', href: '/resources/emergency-guide', badge: 'Important' },
      { title: 'Insurance Claims', href: '/resources/insurance' },
      { title: 'FAQ', href: '/resources/faq' },
      { title: 'Blog', href: '/resources/blog' },
      { title: 'Guides & Tips', href: '/resources/guides' },
    ],
  },
  {
    title: 'Contact',
    href: '/contact',
    icon: Phone,
  },
];

export default function EnhancedMobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItems, setExpandedItems] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const pathname = usePathname();

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
    setExpandedItems([]);
  }, [pathname]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev =>
      prev.includes(title)
        ? prev.filter(item => item !== title)
        : [...prev, title]
    );
  };

  const isActive = (href?: string) => {
    if (!href) return false;
    return pathname === href || pathname.startsWith(href + '/');
  };

  const filteredNavigation = navigation.map(item => ({
    ...item,
    children: item.children?.filter(child =>
      child.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter(item => 
    item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (item.children && item.children.length > 0)
  );

  return (
    <>
      {/* Mobile Navigation Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-3">
          <Link href="/" className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">NRPG</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] p-3"
              aria-label="Search"
            >
              <Search className="h-5 w-5 text-gray-600" />
            </button>
            <button
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors min-h-[44px] min-w-[44px] p-3"
              aria-label="User account"
            >
              <User className="h-5 w-5 text-gray-600" />
            </button>
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-900" />
              ) : (
                <Menu className="h-6 w-6 text-gray-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer for fixed header */}
      <div className="lg:hidden h-[60px]" />

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black/50 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="lg:hidden fixed right-0 top-[60px] bottom-0 w-[85%] max-w-sm bg-white shadow-xl z-50 overflow-y-auto"
            >
              {/* Search Bar */}
              <div className="p-4 border-b border-gray-200">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-600" />
                  <input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Navigation Items */}
              <nav className="py-4">
                {filteredNavigation.map((item) => (
                  <div key={item.title} className="mb-2">
                    {item.children ? (
                      // Parent with children
                      <div>
                        <button
                          onClick={() => toggleExpanded(item.title)}
                          className={cn(
                            "w-full flex items-center justify-between px-4 py-3 text-left hover:bg-gray-50 transition-colors",
                            expandedItems.includes(item.title) && "bg-gray-50"
                          )}
                        >
                          <div className="flex items-center space-x-3">
                            {item.icon && <item.icon className="h-5 w-5 text-gray-600" />}
                            <span className="font-medium text-gray-900">{item.title}</span>
                          </div>
                          <motion.div
                            animate={{ rotate: expandedItems.includes(item.title) ? 90 : 0 }}
                            transition={{ duration: 0.2 }}
                          >
                            <ChevronRight className="h-4 w-4 text-gray-600" />
                          </motion.div>
                        </button>

                        {/* Submenu */}
                        <AnimatePresence>
                          {expandedItems.includes(item.title) && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="overflow-hidden"
                            >
                              <div className="bg-gray-50 py-2">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.href}
                                    href={child.href || '#'}
                                    className={cn(
                                      "flex items-center justify-between px-8 py-2.5 hover:bg-gray-100 transition-colors",
                                      isActive(child.href) && "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                                    )}
                                  >
                                    <div className="flex items-center space-x-3">
                                      {child.icon && <child.icon className="h-4 w-4" />}
                                      <span className="text-sm">{child.title}</span>
                                    </div>
                                    {child.badge && (
                                      <span className="px-2 py-0.5 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
                                        {child.badge}
                                      </span>
                                    )}
                                  </Link>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      // Direct link
                      <Link
                        href={item.href || '#'}
                        className={cn(
                          "flex items-center space-x-3 px-4 py-3 hover:bg-gray-50 transition-colors",
                          isActive(item.href) && "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                        )}
                      >
                        {item.icon && <item.icon className="h-5 w-5 text-gray-600" />}
                        <span className="font-medium text-gray-900">{item.title}</span>
                      </Link>
                    )}
                  </div>
                ))}
              </nav>

              {/* Bottom Actions */}
              <div className="border-t border-gray-200 p-4 space-y-3">
                <Link
                  href="/claim"
                  className="block w-full py-3 px-4 bg-blue-600 text-white text-center font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Book Emergency Service
                </Link>
                <Link
                  href="/client-portal"
                  className="block w-full py-3 px-4 border border-gray-300 text-gray-700 text-center font-medium rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Client Portal
                </Link>
                <div className="flex items-center justify-center space-x-4 pt-2">
                  <Link href="/contact" className="text-gray-600 hover:text-gray-900">
                    <Settings className="h-5 w-5" />
                  </Link>
                  <span className="text-gray-300">|</span>
                  <Link href="/help" className="text-sm text-gray-600 hover:text-gray-900">
                    Help
                  </Link>
                  <Link href="/contact" className="text-sm text-gray-600 hover:text-gray-900">
                    Contact
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
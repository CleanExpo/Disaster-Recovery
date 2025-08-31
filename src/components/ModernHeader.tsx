'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  ShieldCheckIcon, 
  Bars3Icon, 
  XMarkIcon,
  ChevronDownIcon,
  PhoneIcon,
  BoltIcon,
  HomeIcon,
  UserGroupIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function UltraModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const navItems = [
    { 
      label: 'Services', 
      href: '/services',
      icon: HomeIcon,
      dropdown: [
        { label: 'Water Damage', href: '/services/water-damage', colour: 'from-blue-500 to-cyan-500' },
        { label: 'Fire & Smoke', href: '/services/fire-damage', colour: 'from-orange-500 to-red-500' },
        { label: 'Mould Remediation', href: '/services/mould-remediation', colour: 'from-green-500 to-teal-500' },
        { label: 'Biohazard Cleanup', href: '/services/biohazard', colour: 'from-purple-500 to-pink-500' },
      ]
    },
    { 
      label: 'About', 
      href: '/about',
      icon: UserGroupIcon,
      dropdown: [
        { label: 'Our Team', href: '/about/team', colour: 'from-indigo-500 to-purple-500' },
        { label: 'Technology', href: '/about/technology', colour: 'from-cyan-500 to-blue-500' },
        { label: 'Certifications', href: '/certifications', colour: 'from-green-500 to-emerald-500' },
        { label: 'Case Studies', href: '/case-studies', colour: 'from-rose-500 to-pink-500' },
      ]
    },
    { 
      label: 'Locations', 
      href: '/locations',
      icon: MapPinIcon
    },
    { 
      label: 'Contact', 
      href: '/contact',
      icon: ChatBubbleLeftRightIcon
    },
    { 
      label: 'AI Demo', 
      href: '/ai-demo',
      icon: BoltIcon,
      highlight: true
    }
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-lg shadow-xl border-b border-cyan-500/20' 
            : 'bg-gradient-to-b from-black/50 to-transparent'
        }`}
      >
        {/* Animated border gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo */}
            <Link href="/" className="relative group">
              <div className="flex items-center space-x-3 transition-transform hover:scale-105">
                {/* Logo Icon */}
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-md opacity-50" />
                  <div className="relative">
                    <ShieldCheckIcon className="h-12 w-12 text-cyan-400" />
                  </div>
                </div>
                
                {/* Logo Text */}
                <div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Disaster Pro
                  </div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Next-Gen Recovery
                  </div>
                </div>
              </div>
              
              {/* Logo hover effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className={`relative px-4 py-2 flex items-center gap-2 transition-all group rounded-lg ${
                      item.highlight 
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold shadow-lg shadow-blue-500/25 hover:from-blue-500 hover:to-cyan-500' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="relative z-10 font-medium">{item.label}</span>
                    
                    {item.dropdown && (
                      <ChevronDownIcon className={`relative z-10 w-4 h-4 transition-transform ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`} />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.dropdown && activeDropdown === item.label && (
                    <div className="absolute top-full left-0 mt-2 w-64 transition-all">
                      <div className="bg-slate-900/95 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="relative block px-5 py-4 text-gray-300 hover:text-white transition-all hover:bg-white/10"
                          >
                            <div className="relative z-10 flex items-center justify-between">
                              <span className="font-medium">{subItem.label}</span>
                              <span className="text-cyan-400 opacity-0 hover:opacity-100 transition-opacity">
                                →
                              </span>
                            </div>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Section */}
            <div className="hidden md:flex items-center gap-4">
              {/* Live Pulse Indicator */}
              <div className="relative">
                <div className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 border border-green-500/30">
                  <div className="relative">
                    <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-xs font-medium text-green-400">LIVE</span>
                </div>
              </div>

              {/* Emergency Button */}
              <button className="relative group overflow-hidden rounded-full transition-transform hover:scale-105">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="relative px-6 py-3 flex items-center gap-2 text-white font-bold">
                  <BoltIcon className="w-5 h-5 animate-pulse" />
                  <span>Emergency</span>
                  <PhoneIcon className="w-5 h-5" />
                </div>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative p-3 bg-slate-800/50 backdrop-blur-sm rounded-lg border border-white/10"
            >
              {mobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6 text-white" />
              ) : (
                <Bars3Icon className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-900/95 backdrop-blur-lg border-t border-white/10">
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <div key={item.label}>
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      item.highlight 
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold' 
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <item.icon className="w-5 h-5 text-cyan-400" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                  
                  {item.dropdown && (
                    <div className="ml-8 mt-2 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm text-gray-400 hover:text-white transition-colours"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Mobile Emergency CTA */}
              <button className="w-full mt-4 relative overflow-hidden rounded-2xl">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 blur-xl opacity-50" />
                <div className="relative px-6 py-4 flex items-center justify-center gap-3 text-white font-bold">
                  <BoltIcon className="w-6 h-6 animate-pulse" />
                  <span>24/7 Emergency Response</span>
                  <PhoneIcon className="w-6 h-6" />
                </div>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Floating Action Button (Mobile) */}
      {!mobileMenuOpen && (
        <div className="md:hidden fixed bottom-6 right-6 z-50">
          <a
            href="/contact"
            className="relative block transition-transform hover:scale-110"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur-lg animate-pulse" />
            <div className="relative w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
              <PhoneIcon className="w-8 h-8 text-white" />
            </div>
          </a>
        </div>
      )}
    </>
  );
}

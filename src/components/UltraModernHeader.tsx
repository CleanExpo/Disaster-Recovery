'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

interface NavItem {
  label: string;
  href: string;
  dropdown?: {
    label: string;
    href: string;
    description: string;
    icon: string;
  }[];
}

const navItems: NavItem[] = [
  { 
    label: 'Services', 
    href: '/services',
    dropdown: [
      { 
        label: 'Water Damage', 
        href: '/services/water-damage',
        description: 'Advanced moisture extraction',
        icon: '💧'
      },
      { 
        label: 'Fire & Smoke', 
        href: '/services/fire-damage',
        description: 'Complete restoration technology',
        icon: '🔥'
      },
      { 
        label: 'Mold Remediation', 
        href: '/services/mold-remediation',
        description: 'EPA-certified removal',
        icon: '🦠'
      },
      { 
        label: 'Commercial', 
        href: '/services/commercial',
        description: 'Enterprise-grade solutions',
        icon: '🏢'
      },
    ]
  },
  { 
    label: 'Technology', 
    href: '/technology',
    dropdown: [
      { 
        label: 'AI Detection', 
        href: '/technology/ai',
        description: 'Smart damage assessment',
        icon: '🤖'
      },
      { 
        label: 'Thermal Imaging', 
        href: '/technology/thermal',
        description: 'Hidden moisture detection',
        icon: '📡'
      },
      { 
        label: 'HEPA Systems', 
        href: '/technology/hepa',
        description: 'Advanced air purification',
        icon: '🌪️'
      },
    ]
  },
  { 
    label: 'About', 
    href: '/about'
  },
  { 
    label: 'Contact', 
    href: '/contact'
  }
];

export default function UltraModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (headerRef.current) {
        const rect = headerRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <>
      <header
        ref={headerRef}
        className={`fixed top-16 left-0 right-0 z-[900] transition-all duration-500 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}
        style={{
          background: isScrolled
            ? 'rgba(0, 0, 0, 0.95)'
            : 'rgba(0, 0, 0, 0.85)',
          backdropFilter: 'blur(20px) saturate(150%)',
          borderBottom: '1px solid rgba(99, 91, 255, 0.2)',
        }}
      >
        {/* Interactive gradient overlay */}
        <div 
          className="absolute inset-0 opacity-30 pointer-events-none"
          style={{
            background: `radial-gradient(
              600px circle at ${mousePosition.x}px ${mousePosition.y}px,
              rgba(99, 91, 255, 0.1),
              transparent 40%
            )`,
          }}
        />

        {/* Animated border */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-[1px]"
          style={{
            background: 'linear-gradient(90deg, transparent, #635bff, #00d4ff, transparent)',
            backgroundSize: '200% 100%',
            animation: 'gradient-x 3s ease infinite',
          }}
        />
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <Link 
              href="/" 
              className="group relative flex items-center gap-3"
            >
              {/* Logo mark with animation */}
              <div className="relative">
                <div 
                  className="absolute inset-0 rounded-lg opacity-50 group-hover:opacity-100 transition-opacity"
                  style={{
                    background: 'linear-gradient(135deg, #635bff 0%, #00d4ff 100%)',
                    filter: 'blur(10px)',
                  }}
                />
                <div 
                  className="relative w-10 h-10 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(135deg, #635bff 0%, #00d4ff 100%)',
                    transform: isScrolled ? 'scale(0.9)' : 'scale(1)',
                    transition: 'transform 0.3s ease',
                  }}
                >
                  <span className="text-white font-bold text-xl">DR</span>
                </div>
              </div>
              
              {/* Logo text */}
              <div className="flex flex-col">
                <span 
                  className="text-lg font-bold transition-all"
                  style={{
                    background: 'linear-gradient(135deg, #fff 0%, #ddd 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Disaster Recovery
                </span>
                <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                  Next-Gen Restoration
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="relative px-5 py-2.5 text-sm font-medium text-gray-100 hover:text-white transition-all duration-300 rounded-full group"
                    aria-haspopup={item.dropdown ? "true" : undefined}
                    aria-expanded={item.dropdown ? activeDropdown === item.label : undefined}
                    id={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                    style={{
                      background: activeDropdown === item.label 
                        ? 'rgba(99, 91, 255, 0.1)' 
                        : 'transparent',
                    }}
                  >
                    <span className="relative z-10">{item.label}</span>
                    
                    {/* Hover glow effect */}
                    <div 
                      className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background: 'rgba(99, 91, 255, 0.1)',
                        filter: 'blur(10px)',
                      }}
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  {item.dropdown && (
                    <div
                      role="menu"
                      aria-labelledby={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                      className={`absolute top-full left-0 mt-2 transition-all duration-300 ${
                        activeDropdown === item.label 
                          ? 'opacity-100 translate-y-0 pointer-events-auto' 
                          : 'opacity-0 -translate-y-2 pointer-events-none'
                      }`}
                    >
                      <div 
                        className="w-72 rounded-2xl overflow-hidden"
                        style={{
                          background: 'rgba(0, 0, 0, 0.98)',
                          backdropFilter: 'blur(20px)',
                          border: '1px solid rgba(99, 91, 255, 0.3)',
                          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
                        }}
                      >
                        {item.dropdown.map((subItem, idx) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            role="menuitem"
                            className="relative flex items-center gap-4 px-5 py-4 hover:bg-white/5 transition-all group"
                            style={{
                              borderBottom: idx < item.dropdown!.length - 1 
                                ? '1px solid rgba(255, 255, 255, 0.05)' 
                                : 'none'
                            }}
                          >
                            {/* Icon */}
                            <div 
                              className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                              style={{
                                background: 'rgba(99, 91, 255, 0.1)',
                              }}
                            >
                              {subItem.icon}
                            </div>
                            
                            {/* Text content */}
                            <div className="flex-1">
                              <div className="text-white font-medium text-sm">
                                {subItem.label}
                              </div>
                              <div className="text-gray-500 text-xs mt-0.5">
                                {subItem.description}
                              </div>
                            </div>
                            
                            {/* Arrow */}
                            <svg 
                              className="w-4 h-4 text-gray-500 group-hover:text-purple-400 transition-all transform group-hover:translate-x-1"
                              fill="none" 
                              stroke="currentColor" 
                              viewBox="0 0 24 24"
                            >
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
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
              {/* Status indicator */}
              <div 
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                }}
              >
                <div className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </div>
                <span className="text-xs font-medium text-emerald-400">Available 24/7</span>
              </div>

              {/* Emergency CTA */}
              <Link
                href="tel:1800DISASTER"
                className="relative group overflow-hidden rounded-full"
                onMouseEnter={(e) => {
                  const btn = e.currentTarget;
                  btn.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  const btn = e.currentTarget;
                  btn.style.transform = 'scale(1)';
                }}
                style={{
                  background: 'linear-gradient(135deg, #ff4545 0%, #ff8845 100%)',
                  boxShadow: '0 10px 40px rgba(255, 69, 69, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                }}
              >
                <div className="relative px-6 py-3 flex items-center gap-2 text-white font-semibold">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>Emergency</span>
                </div>
                
                {/* Shimmer effect */}
                <div 
                  className="absolute inset-0 -top-1/2 -left-full w-[200%] h-[200%] opacity-0 group-hover:opacity-100"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3), transparent 70%)',
                    animation: 'shimmer 0.5s',
                  }}
                />
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative p-3 rounded-lg transition-all"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
              }}
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span 
                  className="block h-0.5 w-full bg-white transition-all duration-300 origin-left"
                  style={{
                    transform: mobileMenuOpen ? 'rotate(45deg) translateY(-2px)' : 'rotate(0)',
                  }}
                />
                <span 
                  className="block h-0.5 w-full bg-white transition-all duration-300"
                  style={{
                    opacity: mobileMenuOpen ? 0 : 1,
                  }}
                />
                <span 
                  className="block h-0.5 w-full bg-white transition-all duration-300 origin-left"
                  style={{
                    transform: mobileMenuOpen ? 'rotate(-45deg) translateY(2px)' : 'rotate(0)',
                  }}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div 
          id="mobile-navigation-menu"
          role="navigation"
          aria-label="Mobile navigation"
          className={`md:hidden absolute top-full left-0 right-0 transition-all duration-500 ${
            mobileMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
          style={{
            background: 'rgba(10, 10, 10, 0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(99, 91, 255, 0.1)',
          }}
        >
          <div className="px-4 py-6 space-y-2">
            {navItems.map((item) => (
              <div key={item.label}>
                <Link
                  href={item.href}
                  className="block px-4 py-3 rounded-xl text-gray-300 hover:text-white transition-all"
                  onClick={() => setMobileMenuOpen(false)}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                  }}
                >
                  {item.label}
                </Link>
                
                {item.dropdown && (
                  <div className="mt-2 ml-4 space-y-1">
                    {item.dropdown.map((subItem) => (
                      <Link
                        key={subItem.label}
                        href={subItem.href}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span>{subItem.icon}</span>
                        <span>{subItem.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile CTA */}
            <Link
              href="tel:1800DISASTER"
              className="block w-full mt-4 text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              <div 
                className="px-6 py-4 rounded-full font-bold text-white"
                style={{
                  background: 'linear-gradient(135deg, #ff4545 0%, #ff8845 100%)',
                  boxShadow: '0 10px 40px rgba(255, 69, 69, 0.3)',
                }}
              >
                🚨 Emergency Hotline
              </div>
            </Link>
          </div>
        </div>
      </header>

      {/* Header spacer */}
      <div className={`${isScrolled ? 'h-16' : 'h-20'} transition-all duration-500`} />
    </>
  );
}
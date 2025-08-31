'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Menu, 
  X, 
  ChevronDown,
  Shield,
  Clock,
  Award,
  MapPin
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface NavItem {
  label: string;
  href?: string;
  items?: { label: string; href: string; description?: string }[];
}

const navigation: NavItem[] = [
  {
    label: 'Services',
    items: [
      { label: 'Water Damage Restoration', href: '/services/water-damage', description: 'Emergency water extraction & drying' },
      { label: 'Fire & Smoke Damage', href: '/services/fire-damage-restoration', description: 'Complete fire damage recovery' },
      { label: 'Mould Remediation', href: '/services/mould-remediation', description: 'Safe mould removal & prevention' },
      { label: 'Sewage Cleanup', href: '/services/sewage-cleanup', description: 'Biohazard sanitisation services' },
      { label: 'Storm Damage', href: '/services/storm-damage', description: 'Emergency storm recovery' },
      { label: 'Commercial Services', href: '/services/commercial-services', description: 'Large-scale disaster recovery' }
    ]
  },
  {
    label: 'Emergency',
    items: [
      { label: '24/7 Online Emergency Response', href: '/services/emergency-services', description: 'Immediate disaster response' },
      { label: 'Insurance Claims', href: '/insurance-claims', description: 'We work with all insurers' },
      { label: 'Free Assessment', href: '/free-assessment', description: 'No-obligation damage assessment' }
    ]
  },
  {
    label: 'About',
    items: [
      { label: 'Our Company', href: '/about', description: 'Queensland\'s trusted recovery experts' },
      { label: 'Our Process', href: '/process', description: 'How we restore your property' },
      { label: 'Certifications', href: '/certifications', description: 'IICRC certified technicians' },
      { label: 'Coverage Areas', href: '/areas', description: 'Servicing all of Queensland' }
    ]
  },
  { label: 'Contact', href: '/contact' }
];

export default function PremiumHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Top Bar - Premium Info Strip */}
      <div className="hidden lg:block bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>IICRC Certified</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4" />
                <span>Insurance Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>Servicing All Queensland</span>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>24/7 Emergency Service</span>
              </div>
              <a href="#contact-form" className="flex items-center gap-2 font-semibold hover:text-blue-200 transition-colours">
                <Phone className="w-4 h-4" />
                <span>1300 566 166</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header 
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled 
            ? "bg-white/95 backdrop-blur-lg shadow-lg" 
            : "bg-white/80 backdrop-blur-md",
          "border-b border-gray-200/50"
        )}
      >
        <div className="container mx-auto px-6">
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 transition-transform group-hover:scale-105">
                <Image
                  src="/logos/3D Disaster Recovery Round Borders.png"
                  alt="Disaster Recovery QLD"
                  fill
                  className="object-contain rounded-full"
                  style={{
                    backgroundColor: 'transparent',
                    filter: 'drop-shadow(0 1px 3px rgba(0, 0, 0, 0.2))',
                  }}
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">Disaster Recovery</h1>
                <p className="text-xs text-gray-600 font-medium">Queensland's Trusted Restoration Experts</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.items && setActiveDropdown(item.label)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  {item.href ? (
                    <Link
                      href={item.href}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                        "hover:bg-blue-50 hover:text-blue-700",
                        pathname === item.href && "bg-blue-50 text-blue-700"
                      )}
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <button
                      className={cn(
                        "flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200",
                        "hover:bg-blue-50 hover:text-blue-700",
                        activeDropdown === item.label && "bg-blue-50 text-blue-700"
                      )}
                    >
                      {item.label}
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform duration-200",
                        activeDropdown === item.label && "rotate-180"
                      )} />
                    </button>
                  )}
                  
                  {/* Premium Dropdown */}
                  {item.items && (
                    <div className={cn(
                      "absolute top-full left-0 mt-1 w-80 bg-white rounded-xl shadow-2xl",
                      "border border-gray-100 overflow-hidden",
                      "transition-all duration-200 origin-top-left",
                      activeDropdown === item.label 
                        ? "opacity-100 scale-100 pointer-events-auto" 
                        : "opacity-0 scale-95 pointer-events-none"
                    )}>
                      <div className="p-2">
                        {item.items.map((subItem, index) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            className={cn(
                              "block px-4 py-3 rounded-lg transition-all duration-200",
                              "hover:bg-gradient-to-r hover:from-blue-50 hover:to-blue-50/50",
                              index !== item.items!.length - 1 && "border-b border-gray-50"
                            )}
                          >
                            <div className="font-medium text-gray-900 mb-0.5">
                              {subItem.label}
                            </div>
                            {subItem.description && (
                              <div className="text-xs text-gray-600">
                                {subItem.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Link
                href="/partner-portal"
                className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-blue-700 transition-colours"
              >
                Partner Portal
              </Link>
              <a
                href="#contact-form"
                className={cn(
                  "flex items-center gap-2 px-5 py-2.5 rounded-lg",
                  "bg-gradient-to-r from-red-600 to-red-500",
                  "text-white font-semibold shadow-lg",
                  "hover:shadow-xl hover:scale-105",
                  "transition-all duration-300",
                  "animate-pulse-subtle"
                )}
              >
                <Phone className="w-4 h-4" />
                <span>Emergency Call</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colours"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </nav>
        </div>
      </header>

      {/* Mobile Menu - Premium Slide Panel */}
      <div className={cn(
        "fixed inset-0 z-40 lg:hidden transition-opacity duration-300",
        isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      )}>
        {/* Backdrop */}
        <div 
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Menu Panel */}
        <div className={cn(
          "absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-2xl",
          "transition-transform duration-300 ease-out",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}>
          <div className="flex flex-col h-full">
            {/* Mobile Menu Header */}
            <div className="flex items-center justify-between p-6 border-b">
              <Image
                src="/images/optimised/branding/Disaster Recovery Logo.png"
                alt="Disaster Recovery QLD"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-gray-100 transition-colours"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            
            {/* Mobile Menu Items */}
            <div className="flex-1 overflow-y-auto p-6">
              <div className="space-y-2">
                {navigation.map((item) => (
                  <div key={item.label}>
                    {item.href ? (
                      <Link
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block px-4 py-3 text-base font-medium text-gray-900 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colours"
                      >
                        {item.label}
                      </Link>
                    ) : (
                      <div className="space-y-1">
                        <div className="px-4 py-2 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                          {item.label}
                        </div>
                        {item.items?.map((subItem) => (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="block px-4 py-2 text-base text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-700 transition-colours"
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mobile Menu Footer */}
            <div className="p-6 border-t space-y-4">
              <a
                href="#contact-form"
                className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                <Phone className="w-5 h-5" />
                <span>Call Emergency: 1300 566 166</span>
              </a>
              <Link
                href="/partner-portal"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full px-6 py-3 bg-gray-100 text-center text-gray-900 font-medium rounded-lg hover:bg-gray-200 transition-colours"
              >
                Partner Portal
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse-subtle {
          0%, 100% {
            box-shadow: 0 10px 15px -3px rgb(220 38 38 / 0.1), 0 4px 6px -4px rgb(220 38 38 / 0.1);
          }
          50% {
            box-shadow: 0 20px 25px -5px rgb(220 38 38 / 0.2), 0 8px 10px -6px rgb(220 38 38 / 0.2);
          }
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </>
  );
}
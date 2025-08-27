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
  MapPin,
  ArrowRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { R6Button } from '@/components/ui/r6-button';

interface NavItem {
  label: string;
  href?: string;
  items?: { label: string; href: string; description?: string; icon?: React.ReactNode }[];
}

const navigation: NavItem[] = [
  {
    label: 'Services',
    items: [
      { 
        label: 'Water Damage Restoration', 
        href: '/services/water-damage', 
        description: 'Emergency water extraction & drying',
        icon: '💧'
      },
      { 
        label: 'Fire & Smoke Damage', 
        href: '/services/fire-damage-restoration', 
        description: 'Complete fire damage recovery',
        icon: '🔥'
      },
      { 
        label: 'Mould Remediation', 
        href: '/services/mould-remediation', 
        description: 'Safe mould removal & prevention',
        icon: '🦠'
      },
      { 
        label: 'Sewage Cleanup', 
        href: '/services/sewage-cleanup', 
        description: 'Biohazard sanitisation services',
        icon: '⚠️'
      },
      { 
        label: 'Storm Damage', 
        href: '/services/storm-damage', 
        description: 'Emergency storm recovery',
        icon: '⛈️'
      },
      { 
        label: 'Commercial Services', 
        href: '/services/commercial-services', 
        description: 'Large-scale disaster recovery',
        icon: '🏢'
      }
    ]
  },
  {
    label: 'Emergency',
    items: [
      { 
        label: '24/7 Emergency Response', 
        href: '/services/emergency-services', 
        description: 'Immediate disaster response',
        icon: '🚨'
      },
      { 
        label: 'Insurance Claims', 
        href: '/insurance-claims', 
        description: 'We work with all insurers',
        icon: '📋'
      },
      { 
        label: 'Free Assessment', 
        href: '/free-assessment', 
        description: 'No-obligation damage assessment',
        icon: '🔍'
      }
    ]
  },
  {
    label: 'About',
    items: [
      { 
        label: 'Our Company', 
        href: '/about', 
        description: 'Queensland\'s trusted recovery experts',
        icon: '🏆'
      },
      { 
        label: 'Our Process', 
        href: '/process', 
        description: 'How we restore your property',
        icon: '⚙️'
      },
      { 
        label: 'Certifications', 
        href: '/certifications', 
        description: 'IICRC certified technicians',
        icon: '🎓'
      },
      { 
        label: 'Coverage Areas', 
        href: '/areas', 
        description: 'Servicing all of Queensland',
        icon: '📍'
      }
    ]
  },
  { label: 'Contact', href: '/contact' }
];

export default function R6Header() {
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
      {/* Top Bar - R6 Style Info Strip */}
      <div className="hidden lg:block bg-gradient-to-r from-[#131cff] to-[#00a0d2] text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <div className="container mx-auto px-6 relative">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 group">
                <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">IICRC Certified</span>
              </div>
              <div className="flex items-center gap-2 group">
                <Award className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Insurance Approved</span>
              </div>
              <div className="flex items-center gap-2 group">
                <MapPin className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Servicing All Queensland</span>
              </div>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 animate-pulse" />
                <span className="text-sm font-medium">24/7 Emergency Service</span>
              </div>
              <a 
                href="tel:1300566166" 
                className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full hover:bg-white/30 transition-all duration-300 group"
              >
                <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span className="font-bold">1300 566 166</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - R6 Style */}
      <header 
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          isScrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(19,28,255,0.08)]" 
            : "bg-white shadow-sm"
        )}
      >
        <nav className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative group">
              <Image
                src="/logo.svg"
                alt="Disaster Recovery"
                width={200}
                height={50}
                priority
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-[#131cff]/20 to-[#00a0d2]/20 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div key={item.label} className="relative group">
                  {item.items ? (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      className={cn(
                        "flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-semibold text-[15px] transition-all duration-300",
                        "hover:bg-[#131cff]/5 hover:text-[#131cff]",
                        activeDropdown === item.label && "bg-[#131cff]/5 text-[#131cff]"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        activeDropdown === item.label && "rotate-180"
                      )} />
                    </button>
                  ) : (
                    <Link
                      href={item.href!}
                      className={cn(
                        "flex items-center px-5 py-2.5 rounded-lg font-semibold text-[15px] transition-all duration-300",
                        "hover:bg-[#131cff]/5 hover:text-[#131cff]",
                        pathname === item.href && "bg-[#131cff]/5 text-[#131cff]"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Mega Dropdown - R6 Style */}
                  {item.items && (
                    <div 
                      className={cn(
                        "absolute top-full left-0 mt-2 w-[400px] opacity-0 invisible transition-all duration-300",
                        "group-hover:opacity-100 group-hover:visible",
                        activeDropdown === item.label && "opacity-100 visible"
                      )}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(19,28,255,0.15)] border border-[#eeeeee] overflow-hidden">
                        <div className="p-2">
                          {item.items.map((subItem, idx) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-[#131cff]/5 hover:to-[#00a0d2]/5 transition-all duration-300 group/item"
                            >
                              {subItem.icon && (
                                <span className="text-2xl group-hover/item:scale-110 transition-transform">
                                  {subItem.icon}
                                </span>
                              )}
                              <div className="flex-1">
                                <div className="font-semibold text-[#000000] group-hover/item:text-[#131cff] transition-colors">
                                  {subItem.label}
                                </div>
                                {subItem.description && (
                                  <div className="text-sm text-[#6a6d72] mt-0.5">
                                    {subItem.description}
                                  </div>
                                )}
                              </div>
                              <ArrowRight className="w-4 h-4 text-[#c7cfdb] group-hover/item:text-[#131cff] opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* CTA Buttons - R6 Style */}
            <div className="hidden lg:flex items-center gap-3">
              <R6Button
                variant="outline"
                size="sm"
                className="hidden xl:inline-flex"
              >
                Get Quote
              </R6Button>
              <R6Button
                variant="gradient"
                size="sm"
                rightIcon={<Phone className="w-4 h-4" />}
              >
                Emergency Call
              </R6Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#131cff]/5 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#131cff]" />
              ) : (
                <Menu className="w-6 h-6 text-[#131cff]" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu - R6 Style */}
        <div className={cn(
          "lg:hidden fixed inset-x-0 top-[120px] bg-white shadow-2xl transition-all duration-500 overflow-y-auto",
          isMobileMenuOpen ? "max-h-[calc(100vh-120px)] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="p-6 space-y-4">
            {navigation.map((item) => (
              <div key={item.label}>
                {item.items ? (
                  <div>
                    <div className="font-semibold text-[#131cff] mb-3">{item.label}</div>
                    <div className="space-y-2 pl-4">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 text-[#6a6d72] hover:text-[#131cff] transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 font-semibold text-[#000000] hover:text-[#131cff] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            <div className="pt-4 space-y-3 border-t border-[#eeeeee]">
              <R6Button variant="gradient" fullWidth>
                Get Free Quote
              </R6Button>
              <R6Button 
                variant="primary" 
                fullWidth
                leftIcon={<Phone className="w-4 h-4" />}
              >
                Call 1300 566 166
              </R6Button>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
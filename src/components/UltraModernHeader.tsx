'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface SubDropdownItem {
  label: string;
  href: string;
}

interface DropdownItem {
  label: string;
  href: string;
  description: string;
  icon: string;
  subDropdown?: SubDropdownItem[];
}

interface NavItem {
  label: string;
  href: string;
  dropdown?: DropdownItem[];
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
        label: 'Mould Remediation', 
        href: '/services/mould-remediation',
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
    label: 'Legal', 
    href: '/legal',
    dropdown: [
      { 
        label: 'Core Business Structure Documents', 
        href: '/legal/core-business',
        description: 'Foundation legal documents',
        icon: '🏢',
        subDropdown: [
          { label: 'Partnership/Joint Venture Agreements', href: '/legal/forms/partnership-agreements' },
          { label: 'Shareholder Agreements', href: '/legal/forms/shareholder-agreements' },
          { label: 'Operating Agreement (LLC)', href: '/legal/forms/operating-agreement' },
          { label: 'Terms of Service', href: '/legal/forms/terms-of-service' },
          { label: 'Privacy Policy & Data Protection', href: '/legal/forms/privacy-policy' },
          { label: 'Website Terms & Conditions', href: '/legal/forms/website-terms' }
        ]
      },
      { 
        label: 'Contractor/Network Documents', 
        href: '/legal/contractor-network',
        description: 'Contractor relationship agreements',
        icon: '🤝',
        subDropdown: [
          { label: 'Master Service Agreement', href: '/legal/forms/master-service-agreement' },
          { label: 'Territory/Exclusivity Agreements', href: '/legal/forms/territory-agreements' },
          { label: 'Performance Standards Agreement', href: '/legal/forms/performance-standards' },
          { label: 'Quality Assurance & Compliance Contract', href: '/legal/forms/quality-assurance' },
          { label: 'Insurance Requirements Agreement', href: '/legal/forms/insurance-requirements' },
          { label: 'Background Check & Licensing Verification', href: '/legal/forms/background-check' },
          { label: 'Training & Certification Requirements', href: '/legal/forms/training-certification' },
          { label: 'Equipment/Supply Purchase Agreements', href: '/legal/forms/equipment-agreements' },
          { label: 'Termination & Exit Procedures', href: '/legal/forms/termination-procedures' }
        ]
      },
      { 
        label: 'Client-Facing Documents', 
        href: '/legal/client-facing',
        description: 'Customer service agreements',
        icon: '👥',
        subDropdown: [
          { label: 'Service Level Agreements (SLAs)', href: '/legal/forms/service-level-agreements' },
          { label: 'Emergency Response Contracts', href: '/legal/forms/emergency-response' },
          { label: 'Property Access & Work Authorization', href: '/legal/forms/property-access' },
          { label: 'Liability Limitation Agreements', href: '/legal/forms/liability-limitation' },
          { label: 'Warranty & Guarantee Terms', href: '/legal/forms/warranty-guarantee' },
          { label: 'Dispute Resolution Agreements', href: '/legal/forms/dispute-resolution' },
          { label: 'Insurance Claims Assistance Agreement', href: '/legal/forms/insurance-claims-assistance' }
        ]
      },
      { 
        label: 'Financial & Payment Documents', 
        href: '/legal/financial-payment',
        description: 'Payment and financial agreements',
        icon: '💰',
        subDropdown: [
          { label: 'Fee Structure & Commission Agreements', href: '/legal/forms/fee-structure' },
          { label: 'Payment Processing Terms', href: '/legal/forms/payment-processing' },
          { label: 'Refund & Chargeback Policy', href: '/legal/forms/refund-chargeback' },
          { label: 'Late Payment & Collection Procedures', href: '/legal/forms/late-payment' },
          { label: 'Escrow Account Management Agreement', href: '/legal/forms/escrow-management' }
        ]
      },
      { 
        label: 'Affiliate & Marketing Documents', 
        href: '/legal/affiliate-marketing',
        description: 'Partnership and marketing agreements',
        icon: '📢',
        subDropdown: [
          { label: 'Lead Generation Agreements', href: '/legal/forms/lead-generation' },
          { label: 'Referral Partner Contracts', href: '/legal/forms/referral-partners' },
          { label: 'Marketing Compliance Guidelines', href: '/legal/forms/marketing-compliance' },
          { label: 'Intellectual Property License Agreements', href: '/legal/forms/ip-license' },
          { label: 'Non-Compete Agreements', href: '/legal/forms/non-compete' }
        ]
      },
      { 
        label: 'Platform & Technology Documents', 
        href: '/legal/platform-technology',
        description: 'Technical and software agreements',
        icon: '💻',
        subDropdown: [
          { label: 'Software License Agreements', href: '/legal/forms/software-license' },
          { label: 'Data Usage & Sharing Agreements', href: '/legal/forms/data-usage' },
          { label: 'API Terms of Use', href: '/legal/forms/api-terms' },
          { label: 'Third-Party Integration Agreements', href: '/legal/forms/third-party-integration' },
          { label: 'Cybersecurity & Data Breach Response', href: '/legal/forms/cybersecurity-protocols' }
        ]
      },
      { 
        label: 'Compliance & Industry-Specific Documents', 
        href: '/legal/compliance-industry',
        description: 'Regulatory compliance documents',
        icon: '⚖️',
        subDropdown: [
          { label: 'Australian Consumer Law Compliance', href: '/legal/forms/consumer-law-compliance' },
          { label: 'Building Code & Standards Compliance', href: '/legal/forms/building-code-compliance' },
          { label: 'Environmental & Safety Protocols', href: '/legal/forms/environmental-safety' },
          { label: 'Workers\' Compensation Coverage', href: '/legal/forms/workers-compensation' },
          { label: 'Public Liability Insurance Requirements', href: '/legal/forms/public-liability' }
        ]
      },
      { 
        label: 'Governance Documents', 
        href: '/legal/governance',
        description: 'Corporate governance agreements',
        icon: '📋',
        subDropdown: [
          { label: 'Advisory Board Agreements', href: '/legal/forms/advisory-board' },
          { label: 'Director & Officer Agreements', href: '/legal/forms/director-officer' },
          { label: 'Employment Contracts', href: '/legal/forms/employment-contracts' },
          { label: 'Consultant & Independent Contractor', href: '/legal/forms/consultant-contractor' },
          { label: 'Non-Disclosure Agreements (NDAs)', href: '/legal/forms/non-disclosure' },
          { label: 'Background Check Performing Agreement', href: '/legal/forms/background-performing' }
        ]
      }
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
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
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
        className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-500 ${
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
        {/* Realistic fire gradient effect */}
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `
              linear-gradient(
                to top,
                rgba(255, 69, 0, 0.15) 0%,
                rgba(255, 140, 0, 0.08) 20%,
                rgba(255, 165, 0, 0.04) 40%,
                rgba(255, 195, 0, 0.02) 60%,
                transparent 80%
              )
            `,
            opacity: 0.6,
            mixBlendMode: 'screen',
          }}
        />
        
        {/* Additional subtle fire glow */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
          style={{
            background: `
              radial-gradient(
                ellipse at bottom,
                rgba(255, 100, 0, 0.2) 0%,
                rgba(255, 140, 0, 0.1) 30%,
                transparent 70%
              )
            `,
            filter: 'blur(8px)',
            animation: 'pulse 4s ease-in-out infinite',
          }}
        />
        
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
              {/* Modern logo implementation */}
              <div className="relative flex items-center gap-3" style={{
                transform: isScrolled ? 'scale(0.95)' : 'scale(1)',
                transition: 'all 0.3s ease',
              }}>
                {/* Logo icon with modern glass effect */}
                <div className="relative">
                  <div 
                    className="absolute inset-0 rounded-xl"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 69, 0, 0.15) 0%, rgba(255, 140, 0, 0.1) 100%)',
                      filter: 'blur(8px)',
                      transform: 'scale(1.2)',
                    }}
                  />
                  <Image
                    src="/logos/3D Disaster Recovery Logo Image.png"
                    alt="Disaster Recovery"
                    width={isScrolled ? 36 : 40}
                    height={isScrolled ? 36 : 40}
                    className="relative z-10"
                    style={{
                      filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                      mixBlendMode: 'normal',
                      backgroundColor: 'transparent',
                      borderRadius: '50%',
                      objectFit: 'contain',
                    }}
                  />
                </div>
                
                {/* Modern text styling */}
                <div className="flex flex-col">
                  <span 
                    className="font-bold tracking-tight leading-tight"
                    style={{
                      fontSize: isScrolled ? '1.1rem' : '1.25rem',
                      background: 'linear-gradient(135deg, #ffffff 0%, #e0e0e0 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                      textShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  >
                    Disaster Recovery
                  </span>
                  <span 
                    className="text-[10px] uppercase tracking-[0.2em] opacity-70"
                    style={{
                      color: 'rgba(255, 140, 0, 0.8)',
                      fontWeight: '500',
                    }}
                  >
                    Property Restoration
                  </span>
                </div>
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
                          <div
                            key={subItem.label}
                            className="relative"
                            onMouseEnter={() => subItem.subDropdown && setActiveSubDropdown(subItem.label)}
                            onMouseLeave={() => setActiveSubDropdown(null)}
                          >
                            <Link
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

                            {/* Sub-dropdown for forms */}
                            {subItem.subDropdown && activeSubDropdown === subItem.label && (
                              <div
                                className="absolute left-full top-0 ml-2 w-80 transition-all duration-300"
                                style={{
                                  background: 'rgba(0, 0, 0, 0.98)',
                                  backdropFilter: 'blur(20px)',
                                  border: '1px solid rgba(99, 91, 255, 0.3)',
                                  borderRadius: '16px',
                                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
                                }}
                              >
                                <div className="p-4">
                                  <div className="text-white font-semibold text-sm mb-3 pb-2 border-b border-white/10">
                                    {subItem.label} Forms
                                  </div>
                                  <div className="space-y-1 max-h-96 overflow-y-auto">
                                    {subItem.subDropdown.map((formItem, formIdx) => (
                                      <Link
                                        key={formItem.label}
                                        href={formItem.href}
                                        className="block px-3 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 transition-all rounded-lg"
                                      >
                                        {formItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* CTA Buttons - CRM and Emergency */}
            <div className="hidden md:flex items-center gap-3 ml-6">
              {/* CRM Portal Button */}
              <Link
                href="/crm"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg hover:shadow-xl"
              >
                NRP CRM Portal
              </Link>
              
              {/* Emergency Button */}
              <Link
                href="/contact"
                className="px-5 py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-red-600 to-orange-600 rounded-full hover:from-red-700 hover:to-orange-700 transition-all shadow-lg hover:shadow-xl"
              >
                🚨 Emergency
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
                      <div key={subItem.label}>
                        <Link
                          href={subItem.href}
                          className="flex items-center gap-3 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span>{subItem.icon}</span>
                          <span>{subItem.label}</span>
                        </Link>
                        
                        {/* Sub-dropdown for mobile */}
                        {subItem.subDropdown && (
                          <div className="mt-1 ml-6 space-y-1">
                            {subItem.subDropdown.map((formItem) => (
                              <Link
                                key={formItem.label}
                                href={formItem.href}
                                className="block px-3 py-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {formItem.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile CTAs */}
            <div className="space-y-3 mt-4">
              {/* CRM Portal Button */}
              <Link
                href="/crm"
                className="block w-full text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <div 
                  className="px-6 py-4 rounded-full font-bold text-white"
                  style={{
                    background: 'linear-gradient(135deg, #4545ff 0%, #8845ff 100%)',
                    boxShadow: '0 10px 40px rgba(69, 69, 255, 0.3)',
                  }}
                >
                  🔐 NRP CRM Portal
                </div>
              </Link>
              
              {/* Emergency Button */}
              <Link
                href="/contact"
                className="block w-full text-center"
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
        </div>
      </header>

      {/* Header spacer */}
      <div className={`${isScrolled ? 'h-16' : 'h-20'} transition-all duration-500`} />
    </>
  );
}
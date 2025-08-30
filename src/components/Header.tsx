'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { EmergencyCTA } from '@/components/ui/emergency-cta';
import { cn } from '@/lib/utils';
import { BUSINESS_NAME, BUSINESS_SHORT_NAME, STATES, CITIES_BY_STATE } from '@/lib/constants';
import { 
  Menu, 
  X, 
  ChevronDown, 
  MapPin, 
  Clock, 
  HelpCircle,
  Phone,
  Shield,
  Flame,
  Droplets,
  Wind,
  AlertTriangle,
  Users
} from 'lucide-react';

interface DropdownItem {
  href: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  badge?: string;
}

interface DropdownSection {
  title?: string;
  items: DropdownItem[];
}

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownTimeouts = useRef<{ [key: string]: NodeJS.Timeout }>({});

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
  }, [pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setActiveDropdown(null);
    };

    if (activeDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [activeDropdown]);

  const handleDropdownEnter = (dropdownName: string) => {
    if (dropdownTimeouts.current[dropdownName]) {
      clearTimeout(dropdownTimeouts.current[dropdownName]);
    }
    setActiveDropdown(dropdownName);
  };

  const handleDropdownLeave = (dropdownName: string) => {
    dropdownTimeouts.current[dropdownName] = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const servicesMenuData: DropdownSection[] = [
    {
      title: "Emergency Services",
      items: [
        {
          href: "/services/water-damage",
          label: "Water Damage Restoration",
          description: "IICRC S500 certified restoration",
          icon: <Droplets className="h-4 w-4 text-water-600" />,
          badge: "24/7"
        },
        {
          href: "/services/fire-damage",
          label: "Fire & Smoke Damage",
          description: "IICRC S700 fire restoration",
          icon: <Flame className="h-4 w-4 text-fire-600" />,
          badge: "24/7"
        },
        {
          href: "/services/storm-damage",
          label: "Storm & Natural Disasters",
          description: "Complete disaster recovery",
          icon: <Wind className="h-4 w-4 text-storm-600" />
        },
        {
          href: "/services/mould-remediation",
          label: "Mould Remediation",
          description: "IICRC S520 mould removal",
          icon: <Shield className="h-4 w-4 text-mould-600" />
        },
        {
          href: "/services/emergency-response",
          label: "Emergency Response",
          description: "Rapid 24/7 deployment",
          icon: <AlertTriangle className="h-4 w-4 text-emergency-600" />,
          badge: "1 Hour"
        }
      ]
    },
    {
      title: "Specialised Services",
      items: [
        {
          href: "/services/biohazard-cleanup",
          label: "Biohazard Cleanup",
          description: "IICRC S540 trauma cleaning",
          icon: <AlertTriangle className="h-4 w-4 text-biohazard-600" />
        },
        {
          href: "/services/structural-drying",
          label: "Structural Drying",
          description: "Advanced drying technology",
          icon: <Wind className="h-4 w-4 text-primary-600" />
        },
        {
          href: "/services/commercial",
          label: "Commercial Restoration",
          description: "Business continuity services",
          icon: <Users className="h-4 w-4 text-commercial-600" />
        }
      ]
    }
  ];

  const locationsMenuData: DropdownSection[] = STATES.map(state => ({
    title: state.name,
    items: CITIES_BY_STATE[state.code as keyof typeof CITIES_BY_STATE]
      .slice(0, 6) // Limit to 6 cities per state for better UX
      .map(city => ({
        href: `/locations/${state.code.toLowerCase()}/${city.toLowerCase().replace(/\s+/g, '-')}`,
        label: city,
        icon: <MapPin className="h-4 w-4 text-primary-600" />
      }))
  }));

  const emergencyMenuData: DropdownSection[] = [
    {
      title: "24/7 Emergency Response",
      items: [
        {
          href: "/emergency/24-7",
          label: "24/7 Emergency",
          description: "Around the clock service",
          icon: <Clock className="h-4 w-4 text-emergency-600" />,
          badge: "Always Open"
        },
        {
          href: "/emergency/after-hours",
          label: "After Hours Emergency",
          description: "Evening & night response",
          icon: <Clock className="h-4 w-4 text-warning-600" />
        },
        {
          href: "/emergency/weekend",
          label: "Weekend Emergency",
          description: "Saturday & Sunday service",
          icon: <Clock className="h-4 w-4 text-primary-600" />
        },
        {
          href: "/emergency/public-holiday",
          label: "Public Holiday Emergency",
          description: "Holiday emergency response",
          icon: <Clock className="h-4 w-4 text-success-600" />
        }
      ]
    }
  ];

  const resourcesMenuData: DropdownSection[] = [
    {
      title: "Help & Information",
      items: [
        {
          href: "/faq",
          label: "Frequently Asked Questions",
          description: "Common questions answered",
          icon: <HelpCircle className="h-4 w-4 text-primary-600" />
        },
        {
          href: "/insurance",
          label: "Insurance Support",
          description: "Working with your insurer",
          icon: <Shield className="h-4 w-4 text-success-600" />
        },
        {
          href: "/case-studies",
          label: "Case Studies",
          description: "Real restoration projects",
          icon: <Users className="h-4 w-4 text-primary-600" />
        }
      ]
    }
  ];

  const DropdownMenu: React.FC<{
    sections: DropdownSection[];
    isOpen: boolean;
    className?: string;
  }> = ({ sections, isOpen, className = '' }) => {
    if (!isOpen) return null;

    return (
      <div className={cn(
        "nav-dropdown absolute top-full left-0 w-screen max-w-md bg-white shadow-xl border border-neutral-200 rounded-lg mt-1 z-50",
        "transform transition-all duration-200 ease-out",
        isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        className
      )}>
        <div className="p-6">
          {sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={sectionIndex > 0 ? "mt-6" : ""}>
              {section.title && (
                <h4 className="text-sm font-semibold text-neutral-900 mb-3 border-b border-neutral-100 pb-2">
                  {section.title}
                </h4>
              )}
              <div className="space-y-1">
                {section.items.map((item, itemIndex) => (
                  <Link
                    key={itemIndex}
                    href={item.href}
                    className="group flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colours duration-150"
                  >
                    {item.icon && (
                      <div className="flex-shrink-0 mt-0.5">
                        {item.icon}
                      </div>
                    )}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <div className="font-medium text-neutral-900 group-hover:text-primary-600 transition-colours duration-150">
                          {item.label}
                        </div>
                        {item.badge && (
                          <span className="badge badge-emergency">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      {item.description && (
                        <div className="text-sm text-neutral-500 mt-0.5">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const MobileMenu: React.FC = () => (
    <div 
      className={cn(
        "fixed inset-0 z-50 lg:hidden",
        "transform transition-all duration-300 ease-in-out",
        mobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}
    >
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-black transition-opacity duration-300",
          mobileMenuOpen ? "opacity-50" : "opacity-0"
        )}
        onClick={() => setMobileMenuOpen(false)}
      />
      
      {/* Menu Panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b border-neutral-200">
          <span className="text-lg font-semibold text-neutral-900">{BUSINESS_SHORT_NAME}</span>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-neutral-100 transition-colours duration-150"
            aria-label="Close menu"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="overflow-y-auto h-full pb-20">
          <div className="p-4 space-y-4">
            {/* Emergency CTA */}
            <div className="mb-6">
              <EmergencyCTA variant="urgent" className="w-full" />
            </div>

            {/* Services */}
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Services</h3>
              <div className="space-y-1">
                {servicesMenuData[0].items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colours duration-150"
                  >
                    {item.icon}
                    <span className="text-neutral-700">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Key Locations */}
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Major Locations</h3>
              <div className="space-y-1">
                {['Sydney', 'Melbourne', 'Brisbane', 'Perth', 'Adelaide'].map((city) => (
                  <Link
                    key={city}
                    href={`/locations/${city.toLowerCase()}`}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colours duration-150"
                  >
                    <MapPin className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700">{city}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold text-neutral-900 mb-2">Resources</h3>
              <div className="space-y-1">
                {resourcesMenuData[0].items.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-neutral-50 transition-colours duration-150"
                  >
                    {item.icon}
                    <span className="text-neutral-700">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Skip to main content for accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-lg z-50"
      >
        Skip to main content
      </a>

      <header className="nav-header sticky top-0 z-40 w-full bg-white border-b border-neutral-200 shadow-sm">
        <div className="container px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link 
              href="/" 
              className="flex items-center gap-3 group"
              aria-label={`${BUSINESS_NAME} - Homepage`}
            >
              <div className="flex-shrink-0">
                <img
                  src="/images/logos/dr-logo.svg"
                  alt={`${BUSINESS_NAME} Logo`}
                  className="h-10 w-auto"
                  width="40"
                  height="40"
                />
              </div>
              <div className="hidden sm:block">
                <div className="font-bold text-lg text-neutral-900 group-hover:text-primary-600 transition-colours duration-150">
                  {BUSINESS_SHORT_NAME}
                </div>
                <div className="text-xs text-neutral-500 -mt-1">
                  24/7 Emergency Response
                </div>
              </div>
              {/* NRP Certification Badge */}
              <div className="hidden md:flex items-center ml-4 pl-4 border-l border-neutral-300">
                <img
                  src="/images/logos/nrp/nrp-badge-3d.png"
                  alt="National Restoration Professionals Certified"
                  className="h-12 w-auto"
                  width="48"
                  height="48"
                  title="NRP Certified Network"
                />
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex lg:items-center lg:gap-8" role="navigation" aria-label="Main navigation">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('services')}
                onMouseLeave={() => handleDropdownLeave('services')}
              >
                <button
                  className={cn(
                    "nav-link flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colours duration-150",
                    "hover:bg-primary-50 hover:text-primary-600",
                    activeDropdown === 'services' ? "bg-primary-50 text-primary-600" : "text-neutral-700"
                  )}
                  aria-expanded={activeDropdown === 'services'}
                  aria-haspopup="true"
                >
                  Services
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-150",
                    activeDropdown === 'services' ? "rotate-180" : ""
                  )} />
                </button>
                <DropdownMenu
                  sections={servicesMenuData}
                  isOpen={activeDropdown === 'services'}
                />
              </div>

              {/* Locations Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('locations')}
                onMouseLeave={() => handleDropdownLeave('locations')}
              >
                <button
                  className={cn(
                    "nav-link flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colours duration-150",
                    "hover:bg-primary-50 hover:text-primary-600",
                    activeDropdown === 'locations' ? "bg-primary-50 text-primary-600" : "text-neutral-700"
                  )}
                  aria-expanded={activeDropdown === 'locations'}
                  aria-haspopup="true"
                >
                  Locations
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-150",
                    activeDropdown === 'locations' ? "rotate-180" : ""
                  )} />
                </button>
                <DropdownMenu
                  sections={locationsMenuData.slice(0, 3)} // Show first 3 states in dropdown
                  isOpen={activeDropdown === 'locations'}
                  className="max-w-2xl grid grid-cols-3 gap-6"
                />
              </div>

              {/* Emergency Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('emergency')}
                onMouseLeave={() => handleDropdownLeave('emergency')}
              >
                <button
                  className={cn(
                    "nav-link flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colours duration-150",
                    "hover:bg-emergency-50 hover:text-emergency-600",
                    activeDropdown === 'emergency' ? "bg-emergency-50 text-emergency-600" : "text-emergency-600"
                  )}
                  aria-expanded={activeDropdown === 'emergency'}
                  aria-haspopup="true"
                >
                  <Clock className="h-4 w-4" />
                  Emergency
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-150",
                    activeDropdown === 'emergency' ? "rotate-180" : ""
                  )} />
                </button>
                <DropdownMenu
                  sections={emergencyMenuData}
                  isOpen={activeDropdown === 'emergency'}
                />
              </div>

              {/* Resources Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => handleDropdownEnter('resources')}
                onMouseLeave={() => handleDropdownLeave('resources')}
              >
                <button
                  className={cn(
                    "nav-link flex items-center gap-1 px-3 py-2 rounded-lg text-sm font-medium transition-colours duration-150",
                    "hover:bg-primary-50 hover:text-primary-600",
                    activeDropdown === 'resources' ? "bg-primary-50 text-primary-600" : "text-neutral-700"
                  )}
                  aria-expanded={activeDropdown === 'resources'}
                  aria-haspopup="true"
                >
                  Resources
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform duration-150",
                    activeDropdown === 'resources' ? "rotate-180" : ""
                  )} />
                </button>
                <DropdownMenu
                  sections={resourcesMenuData}
                  isOpen={activeDropdown === 'resources'}
                />
              </div>
            </nav>

            {/* CTA Button and Mobile Menu Toggle */}
            <div className="flex items-center gap-4">
              {/* Emergency CTA - Desktop */}
              <div className="hidden lg:block">
                <EmergencyCTA variant="urgent" text="Get Help Now" />
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-lg hover:bg-neutral-100 transition-colours duration-150"
                aria-label="Open main menu"
                aria-expanded={mobileMenuOpen}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu />
    </>
  );
};

export default Header;

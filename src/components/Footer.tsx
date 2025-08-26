'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BUSINESS_NAME, 
  BUSINESS_SHORT_NAME, 
  EMAIL, 
  WEBSITE, 
  ABN, 
  STATES, 
  CITIES_BY_STATE,
  INSURANCE_PARTNERS 
} from '@/lib/constants';
import { 
  MapPin, 
  Mail, 
  Clock, 
  Shield, 
  Award, 
  Facebook, 
  Twitter, 
  Youtube, 
  Linkedin,
  Instagram,
  Phone,
  ExternalLink,
  CheckCircle
} from 'lucide-react';

interface FooterLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
  className?: string;
}

const FooterLink: React.FC<FooterLinkProps> = ({ 
  href, 
  children, 
  external = false, 
  className = '' 
}) => {
  const linkClasses = `text-gray-300 hover:text-white transition-colors duration-150 flex items-center gap-1 ${className}`;
  
  if (external) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClasses}
      >
        {children}
        <ExternalLink className="h-3 w-3" />
      </a>
    );
  }

  return (
    <Link href={href} className={linkClasses}>
      {children}
    </Link>
  );
};

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, children, className = '' }) => (
  <div className={className}>
    <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
      {title}
    </h3>
    <div className="space-y-2">
      {children}
    </div>
  </div>
);

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  // Structured data for LocalBusiness
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BUSINESS_NAME,
    "alternateName": BUSINESS_SHORT_NAME,
    "description": "Australia's leading disaster recovery and restoration specialists providing 24/7 emergency response for water damage, fire damage, mould remediation, and biohazard cleanup.",
    "url": WEBSITE,
    "email": EMAIL,
    "areaServed": [
      {
        "@type": "Country",
        "name": "Australia"
      }
    ],
    "serviceArea": STATES.map(state => ({
      "@type": "State",
      "name": state.name,
      "containsPlace": CITIES_BY_STATE[state.code as keyof typeof CITIES_BY_STATE].map(city => ({
        "@type": "City",
        "name": city
      }))
    })),
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Disaster Recovery Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "name": "Water Damage Restoration",
          "description": "24/7 emergency water extraction and drying services"
        },
        {
          "@type": "Offer",
          "name": "Fire Damage Restoration", 
          "description": "Comprehensive fire and smoke damage restoration"
        },
        {
          "@type": "Offer",
          "name": "Mould Remediation",
          "description": "Professional mould removal and prevention services"
        },
        {
          "@type": "Offer",
          "name": "Storm Damage Repair",
          "description": "Emergency storm damage restoration and repair"
        },
        {
          "@type": "Offer",
          "name": "Biohazard Cleanup",
          "description": "Professional biohazard and sewage cleanup services"
        }
      ]
    },
    "openingHours": "Mo,Tu,We,Th,Fr,Sa,Su 00:00-23:59",
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "priceRange": "$$",
    "paymentAccepted": ["Cash", "Credit Card", "Insurance Claims"],
    "currenciesAccepted": "AUD"
  };

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <footer className="bg-gray-900 text-gray-300">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Information */}
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <img
                  src="/images/logos/disaster-recovery-qld-logo.png"
                  alt={`${BUSINESS_NAME} Logo`}
                  className="h-10 w-auto"
                  width="40"
                  height="40"
                />
                <div>
                  <div className="text-white font-bold text-lg">
                    {BUSINESS_SHORT_NAME}
                  </div>
                  <div className="text-sm text-gray-400">
                    Emergency Response
                  </div>
                </div>
              </div>
              
              <p className="text-gray-300 mb-6 text-sm leading-relaxed">
                Australia's leading disaster recovery specialists providing 24/7 emergency response 
                for water damage, fire damage, mould remediation, and biohazard cleanup across all major cities.
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-red-400 flex-shrink-0" />
                  <span className="text-sm">
                    <strong className="text-red-400">24/7 Emergency Response</strong>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-blue-400 flex-shrink-0" />
                  <a 
                    href={`mailto:${EMAIL}`}
                    className="text-sm text-gray-300 hover:text-white transition-colors duration-150"
                  >
                    {EMAIL}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-green-400 flex-shrink-0" />
                  <span className="text-sm">All Australian States & Territories</span>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex items-center gap-4">
                <FooterLink 
                  href="https://facebook.com/DisasterRecoveryAustralia" 
                  external
                  className="hover:text-blue-500"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </FooterLink>
                <FooterLink 
                  href="https://twitter.com/DisasterRecovAU" 
                  external
                  className="hover:text-blue-400"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </FooterLink>
                <FooterLink 
                  href="https://linkedin.com/company/disaster-recovery-australia" 
                  external
                  className="hover:text-blue-600"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </FooterLink>
                <FooterLink 
                  href="https://instagram.com/disasterrecoveryau" 
                  external
                  className="hover:text-pink-500"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </FooterLink>
                <FooterLink 
                  href="https://youtube.com/c/DisasterRecoveryAustralia" 
                  external
                  className="hover:text-red-500"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </FooterLink>
              </div>
            </div>

            {/* Services */}
            <FooterSection title="Emergency Services">
              <FooterLink href="/services/water-damage-restoration">
                Water Damage Restoration
              </FooterLink>
              <FooterLink href="/services/fire-damage-restoration">
                Fire Damage Restoration
              </FooterLink>
              <FooterLink href="/services/mould-remediation">
                Mould Remediation
              </FooterLink>
              <FooterLink href="/services/storm-damage">
                Storm Damage Repair
              </FooterLink>
              <FooterLink href="/services/biohazard-cleaning">
                Biohazard Cleanup
              </FooterLink>
              <FooterLink href="/services/sewage-cleanup">
                Sewage Cleanup
              </FooterLink>
              <FooterLink href="/services">
                All Services
              </FooterLink>
            </FooterSection>

            {/* Locations */}
            <FooterSection title="Major Locations">
              {/* Capital Cities */}
              {STATES.slice(0, 8).map((state) => (
                <FooterLink 
                  key={state.code} 
                  href={`/locations/${state.code.toLowerCase()}`}
                >
                  {state.capital}, {state.code}
                </FooterLink>
              ))}
              <FooterLink href="/locations">
                All Locations
              </FooterLink>
            </FooterSection>

            {/* Resources & Legal */}
            <FooterSection title="Resources & Support">
              <FooterLink href="/get-help">
                Get Emergency Help
              </FooterLink>
              <FooterLink href="/faq">
                Frequently Asked Questions
              </FooterLink>
              <FooterLink href="/insurance">
                Insurance Support
              </FooterLink>
              <FooterLink href="/case-studies">
                Case Studies
              </FooterLink>
              <FooterLink href="/contractors">
                Contractor Network
              </FooterLink>
              <div className="pt-2 border-t border-gray-700 mt-4">
                <FooterLink href="/privacy">
                  Privacy Policy
                </FooterLink>
                <FooterLink href="/terms">
                  Terms of Service
                </FooterLink>
                <FooterLink href="/sitemap">
                  Sitemap
                </FooterLink>
              </div>
            </FooterSection>
          </div>
        </div>

        {/* Certifications & Partners */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Certifications */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                  Certifications & Standards
                </h4>
                <div className="flex items-center gap-4 mb-4">
                  {/* NRP Badge */}
                  <img
                    src="/images/logos/nrp/nrp-badge-3d.png"
                    alt="National Restoration Professionals"
                    className="h-16 w-auto"
                    title="NRP Certified Network Member"
                  />
                  <div className="text-sm">
                    <div className="text-white font-semibold">NRP Certified Network</div>
                    <div className="text-gray-400 text-xs">National Restoration Professionals</div>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-yellow-400" />
                    <span>IICRC Certified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-blue-400" />
                    <span>RIA Member</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span>ISO 9001</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-red-400" />
                    <span>WorkSafe Certified</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Award className="h-4 w-4 text-purple-400" />
                    <span>HAZMAT Licensed</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-orange-400" />
                    <span>Australian Standards</span>
                  </div>
                </div>
              </div>

              {/* Insurance Partners */}
              <div>
                <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
                  Insurance Partners
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-sm">
                  {INSURANCE_PARTNERS.slice(0, 12).map((partner, index) => (
                    <FooterLink 
                      key={index}
                      href={`/insurance/${partner.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}`}
                      className="text-xs hover:text-blue-300"
                    >
                      {partner}
                    </FooterLink>
                  ))}
                </div>
                <div className="mt-3">
                  <FooterLink href="/insurance" className="text-sm font-medium hover:text-blue-300">
                    View All Insurance Partners →
                  </FooterLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-sm text-gray-400">
                <span>
                  © {currentYear} {BUSINESS_NAME}. All rights reserved.
                </span>
                <span className="hidden sm:inline">|</span>
                <span>{ABN}</span>
                <span className="hidden sm:inline">|</span>
                <span>Licensed & Insured Contractors</span>
              </div>
              
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 font-medium">Available 24/7</span>
                </div>
                <FooterLink 
                  href="/get-help" 
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-150"
                >
                  Emergency Response
                </FooterLink>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

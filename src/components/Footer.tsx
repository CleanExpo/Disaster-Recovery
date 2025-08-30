'use client';

import React, { useState, useEffect } from 'react';
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
  CheckCircle,
  MessageCircle,
  Zap,
  Users,
  Star,
  FileText,
  AlertTriangle,
  Navigation,
  CreditCard,
  BookOpen,
  Building2,
  Wrench,
  Home,
  Factory,
  ChevronDown,
  ChevronUp,
  Heart,
  TrendingUp,
  Headphones,
  Search,
  ArrowRight
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
  const linkClasses = `text-neutral-300 hover:text-white transition-colours duration-150 flex items-centre gap-1 ${className}`;
  
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
  const [isAvailable, setIsAvailable] = useState(true);
  const [expandedSections, setExpandedSections] = useState<{[key: string]: boolean}>({});
  
  // Live availability simulation
  useEffect(() => {
    const interval = setInterval(() => {
      setIsAvailable(true); // Always show available for emergency service
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };
  
  // Structured data for LocalBusiness
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": BUSINESS_NAME,
    "alternateName": BUSINESS_SHORT_NAME,
    "description": "Australia's leading disaster recovery and restoration specialists providing 24/7 emergency response for water damage, fire damage, mould remediation, and biohazard cleanup.",
    "url": WEBSITE,
    "email": EMAIL,
    "telephone": "1300566166",
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

      <footer className="bg-gray-900 text-white">
        {/* EMERGENCY CONTACT SECTION (Top Priority) */}
        <div className="bg-gradient-to-r from-red-600 via-red-700 to-red-600 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
          <div className="container px-4 sm:px-6 lg:px-8 py-8 relative z-10">
            <div className="text-centre mb-6">
              <div className="flex items-centre justify-centre gap-3 mb-4">
                <div className={`w-3 h-3 rounded-full animate-pulse ${isAvailable ? 'bg-green-400' : 'bg-red-400'}`}></div>
                <h2 className="text-2xl md:text-3xl font-bold">24/7 Emergency Response Available</h2>
                <div className={`w-3 h-3 rounded-full animate-pulse ${isAvailable ? 'bg-green-400' : 'bg-red-400'}`}></div>
              </div>
              <p className="text-xl opacity-95">
                Teams ready to respond within <strong className="text-yellow-300">60 minutes</strong> across Australia
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 mb-6">
              {/* Phone */}
              <a href="tel:1300566166" className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-centre hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <Phone className="h-8 w-8 mx-auto mb-3 group-hover:animate-bounce" />
                  <div className="text-2xl font-bold mb-2">1300 566 166</div>
                  <p className="text-sm opacity-90">Call Emergency Hotline</p>
                  <div className="mt-2 text-xs bg-green-500/30 px-2 py-1 rounded-full inline-block">
                    Average answer time: 12 seconds
                  </div>
                </div>
              </a>
              
              {/* Text */}
              <a href="sms:1300566166" className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-centre hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <MessageCircle className="h-8 w-8 mx-auto mb-3 group-hover:animate-bounce" />
                  <div className="text-2xl font-bold mb-2">Text Us</div>
                  <p className="text-sm opacity-90">SMS Emergency Response</p>
                  <div className="mt-2 text-xs bg-blue-500/30 px-2 py-1 rounded-full inline-block">
                    Response within 5 minutes
                  </div>
                </div>
              </a>
              
              {/* Email */}
              <a href={`mailto:${EMAIL}`} className="group">
                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-centre hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                  <Mail className="h-8 w-8 mx-auto mb-3 group-hover:animate-bounce" />
                  <div className="text-xl font-bold mb-2">Email Support</div>
                  <p className="text-sm opacity-90">{EMAIL}</p>
                  <div className="mt-2 text-xs bg-yellow-500/30 px-2 py-1 rounded-full inline-block">
                    Non-emergency inquiries
                  </div>
                </div>
              </a>
            </div>
            
            <div className="text-centre">
              <div className="inline-flex items-centre bg-green-500/20 px-4 py-2 rounded-full">
                <CheckCircle className="h-5 w-5 mr-2" />
                <span className="font-semibold">60-Minute Response Guarantee • Insurance Direct Billing Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="container px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* COMPANY INFORMATION - Enhanced */}
            <div className="lg:col-span-4">
              <div className="flex items-centre gap-3 mb-6">
                <img
                  src="/images/logos/dr-logo.svg"
                  alt={`${BUSINESS_NAME} Logo`}
                  className="h-12 w-auto"
                  width="48"
                  height="48"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div>
                  <div className="text-white font-bold text-xl">
                    {BUSINESS_SHORT_NAME}
                  </div>
                  <div className="text-sm text-red-400 font-semibold">
                    Emergency Response Specialists
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold mb-4 flex items-centre">
                  <Building2 className="h-5 w-5 mr-2 text-blue-400" />
                  About Our Mission
                </h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">
                  Australia's most trusted disaster recovery specialists. Since 2008, we've restored over 
                  <strong className="text-white"> 25,000+ properties</strong> with our 24/7 emergency response teams.
                </p>
                
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-centre">
                    <div className="text-2xl font-bold text-blue-400">15+</div>
                    <div className="text-xs text-gray-400">Years Experience</div>
                  </div>
                  <div className="text-centre">
                    <div className="text-2xl font-bold text-green-400">98%</div>
                    <div className="text-xs text-gray-400">Customer Satisfaction</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-centre gap-2 text-sm">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span>50+ Certified Technicians</span>
                  </div>
                  <div className="flex items-centre gap-2 text-sm">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span>State-of-the-art Equipment</span>
                  </div>
                  <div className="flex items-centre gap-2 text-sm">
                    <Shield className="h-4 w-4 text-green-400" />
                    <span>$20M+ Insurance Coverage</span>
                  </div>
                </div>
              </div>

              {/* Social Proof & Reviews */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <div className="flex items-centre justify-between mb-3">
                  <h4 className="font-semibold">Customer Reviews</h4>
                  <div className="flex items-centre">
                    {[1,2,3,4,5].map(star => (
                      <Star key={star} className="h-4 w-4 text-yellow-400 fill-current" />
                    ))}
                    <span className="ml-2 text-sm text-gray-400">4.9/5</span>
                  </div>
                </div>
                <p className="text-sm text-gray-300 italic">
                  "Incredible response time and professionalism. They saved our home!"
                </p>
                <p className="text-xs text-gray-400 mt-2">- Sarah M., Melbourne</p>
              </div>

              {/* Social Media - Enhanced */}
              <div>
                <h4 className="font-semibold mb-4">Follow Our Work</h4>
                <div className="flex items-centre gap-3">
                  {[
                    { icon: Facebook, href: "https://facebook.com/DisasterRecoveryAustralia", colour: "hover:text-blue-500" },
                    { icon: Instagram, href: "https://instagram.com/disasterrecoveryau", colour: "hover:text-pink-500" },
                    { icon: Youtube, href: "https://youtube.com/c/DisasterRecoveryAustralia", colour: "hover:text-red-500" },
                    { icon: Linkedin, href: "https://linkedin.com/company/disaster-recovery-australia", colour: "hover:text-blue-400" },
                    { icon: Twitter, href: "https://twitter.com/DisasterRecovAU", colour: "hover:text-blue-400" }
                  ].map(({ icon: Icon, href, colour }, index) => (
                    <a key={index} href={href} target="_blank" rel="noopener noreferrer" 
                       className={`p-2 bg-gray-700 rounded-lg transition-all duration-300 ${colour} hover:scale-110`}>
                      <Icon className="h-5 w-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* SERVICE AREAS GRID */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-bold mb-6 flex items-centre">
                <Wrench className="h-5 w-5 mr-2 text-red-400" />
                Emergency Services
              </h3>
              
              <div className="space-y-3">
                {[
                  { name: "Water Damage", href: "/services/water-damage", urgent: true, icon: "💧" },
                  { name: "Fire Damage", href: "/services/fire-damage", urgent: true, icon: "🔥" },
                  { name: "Mould Remediation", href: "/services/mould", urgent: true, icon: "🦠" },
                  { name: "Storm Damage", href: "/services/storm", urgent: false, icon: "⛈️" },
                  { name: "Sewage Cleanup", href: "/services/sewage", urgent: true, icon: "⚠️" },
                  { name: "Biohazard Cleanup", href: "/services/biohazard", urgent: true, icon: "☣️" }
                ].map((service) => (
                  <FooterLink key={service.name} href={service.href} 
                             className={`flex items-centre gap-3 p-3 rounded-lg transition-all duration-300 
                                       ${service.urgent ? 'bg-red-900/30 hover:bg-red-900/50 border border-red-700/30' : 'hover:bg-gray-800'}`}>
                    <span className="text-lg">{service.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{service.name}</div>
                      {service.urgent && (
                        <div className="text-xs text-red-400 flex items-centre gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          24/7 Emergency
                        </div>
                      )}
                    </div>
                    <ArrowRight className="h-4 w-4 opacity-50 group-hover:opacity-100" />
                  </FooterLink>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-700/30">
                <h4 className="font-semibold mb-2 flex items-centre">
                  <Home className="h-4 w-4 mr-2" />
                  Residential
                </h4>
                <p className="text-sm text-gray-300 mb-3">Homes, apartments, townhouses</p>
                
                <h4 className="font-semibold mb-2 flex items-centre">
                  <Factory className="h-4 w-4 mr-2" />
                  Commercial
                </h4>
                <p className="text-sm text-gray-300">Offices, retail, industrial facilities</p>
              </div>
            </div>

            {/* COVERAGE & LOCATIONS */}
            <div className="lg:col-span-3">
              <h3 className="text-lg font-bold mb-6 flex items-centre">
                <MapPin className="h-5 w-5 mr-2 text-green-400" />
                Coverage Areas
              </h3>
              
              <div className="space-y-4">
                {[
                  { city: "Sydney", state: "NSW", time: "30-45 min", status: "live" },
                  { city: "Melbourne", state: "VIC", time: "30-45 min", status: "live" },
                  { city: "Brisbane", state: "QLD", time: "45-60 min", status: "live" },
                  { city: "Perth", state: "WA", time: "45-60 min", status: "available" },
                  { city: "Adelaide", state: "SA", time: "45-60 min", status: "available" },
                  { city: "Canberra", state: "ACT", time: "60-90 min", status: "available" }
                ].map((location) => (
                  <div key={location.city} className="flex items-centre justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colours">
                    <div>
                      <div className="font-medium">{location.city}, {location.state}</div>
                      <div className="text-sm text-gray-400">Response: {location.time}</div>
                    </div>
                    <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                      location.status === 'live' ? 'bg-green-500/30 text-green-400' : 'bg-blue-500/30 text-blue-400'
                    }`}>
                      <div className="flex items-centre gap-1">
                        <div className={`w-2 h-2 rounded-full ${
                          location.status === 'live' ? 'bg-green-400 animate-pulse' : 'bg-blue-400'
                        }`}></div>
                        {location.status === 'live' ? 'Teams Available' : 'On-Call'}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <button 
                  onClick={() => toggleSection('locations')}
                  className="flex items-centre justify-between w-full p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colours"
                >
                  <span className="font-medium">View All Locations</span>
                  {expandedSections.locations ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                
                {expandedSections.locations && (
                  <div className="mt-3 p-4 bg-gray-700 rounded-lg text-sm">
                    <div className="grid grid-cols-2 gap-2">
                      {STATES.map(state => (
                        <FooterLink key={state.code} href={`/locations/${state.code.toLowerCase()}`}>
                          {state.capital}
                        </FooterLink>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* TRUST & RESOURCES */}
            <div className="lg:col-span-2">
              <h3 className="text-lg font-bold mb-6 flex items-centre">
                <Shield className="h-5 w-5 mr-2 text-yellow-400" />
                Trust & Resources
              </h3>
              
              {/* Trust Indicators */}
              <div className="bg-gray-800 rounded-lg p-4 mb-6">
                <h4 className="font-semibold mb-4 text-centre">Industry Certifications</h4>
                <div className="grid grid-cols-2 gap-3 text-centre">
                  <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/30">
                    <Award className="h-8 w-8 mx-auto mb-2 text-yellow-400" />
                    <div className="text-xs font-medium">IICRC Certified</div>
                  </div>
                  <div className="p-3 bg-blue-500/10 rounded-lg border border-blue-500/30">
                    <Shield className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                    <div className="text-xs font-medium">RIA Member</div>
                  </div>
                  <div className="p-3 bg-green-500/10 rounded-lg border border-green-500/30">
                    <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-400" />
                    <div className="text-xs font-medium">ISO 9001</div>
                  </div>
                  <div className="p-3 bg-red-500/10 rounded-lg border border-red-500/30">
                    <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-400" />
                    <div className="text-xs font-medium">HAZMAT Licensed</div>
                  </div>
                </div>
              </div>
              
              {/* Quick Resources */}
              <div className="space-y-2">
                <h4 className="font-semibold mb-3">Quick Resources</h4>
                {[
                  { name: "Emergency Checklist", href: "/emergency-checklist", icon: CheckCircle },
                  { name: "Insurance Guide", href: "/insurance-guide", icon: FileText },
                  { name: "Prevention Tips", href: "/prevention", icon: BookOpen },
                  { name: "FAQs", href: "/faq", icon: Headphones },
                  { name: "Case Studies", href: "/case-studies", icon: TrendingUp }
                ].map((resource) => (
                  <FooterLink key={resource.name} href={resource.href} 
                             className="flex items-centre gap-3 p-2 hover:bg-gray-800 rounded transition-colours">
                    <resource.icon className="h-4 w-4 text-gray-400" />
                    <span className="text-sm">{resource.name}</span>
                  </FooterLink>
                ))}
              </div>
              
              {/* Newsletter Signup */}
              <div className="mt-6 p-4 bg-blue-900/30 rounded-lg border border-blue-700/30">
                <h4 className="font-semibold mb-2 flex items-centre">
                  <Mail className="h-4 w-4 mr-2" />
                  Emergency Preparedness Tips
                </h4>
                <p className="text-sm text-gray-300 mb-3">
                  Get monthly safety tips and emergency preparedness guides
                </p>
                <div className="flex gap-2">
                  <input 
                    type="email" 
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 bg-gray-700 rounded text-sm border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                  <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded text-sm font-medium transition-colours">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* INSURANCE PARTNERS & LEGAL */}
        <div className="border-t border-gray-700 bg-gray-800">
          <div className="container px-4 sm:px-6 lg:px-8 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* Insurance Partners */}
              <div>
                <h4 className="text-white font-semibold mb-4 flex items-centre">
                  <CreditCard className="h-5 w-5 mr-2 text-green-400" />
                  Insurance Partners & Direct Billing
                </h4>
                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                  <div className="flex items-centre gap-2 mb-3">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="font-medium">No upfront payment required</span>
                  </div>
                  <p className="text-sm text-gray-300">
                    We bill your insurance company directly for approved emergency services
                  </p>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                  {INSURANCE_PARTNERS.slice(0, 12).map((partner, index) => (
                    <div key={index} className="p-2 bg-gray-700 rounded text-centre hover:bg-gray-600 transition-colours">
                      <div className="text-xs font-medium">{partner}</div>
                    </div>
                  ))}
                </div>
                <FooterLink href="/insurance" className="block mt-3 text-centre p-2 bg-blue-600 hover:bg-blue-700 rounded font-medium transition-colours">
                  View All Insurance Partners →
                </FooterLink>
              </div>

              {/* Legal & Compliance */}
              <div>
                <h4 className="text-white font-semibold mb-4 flex items-centre">
                  <FileText className="h-5 w-5 mr-2 text-blue-400" />
                  Legal & Compliance
                </h4>
                
                <div className="bg-gray-700 rounded-lg p-4 mb-4">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>ABN:</span>
                      <span className="text-white">12 345 678 901</span>
                    </div>
                    <div className="flex justify-between">
                      <span>License:</span>
                      <span className="text-white">QLD-DR-001234</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Insurance:</span>
                      <span className="text-white">$20M Coverage</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <FooterLink href="/privacy" className="flex items-centre justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded transition-colours">
                    Privacy Policy
                    <ExternalLink className="h-4 w-4" />
                  </FooterLink>
                  <FooterLink href="/terms" className="flex items-centre justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded transition-colours">
                    Terms of Service
                    <ExternalLink className="h-4 w-4" />
                  </FooterLink>
                  <FooterLink href="/complaints" className="flex items-centre justify-between p-3 bg-gray-700 hover:bg-gray-600 rounded transition-colours">
                    Complaints Procedure
                    <ExternalLink className="h-4 w-4" />
                  </FooterLink>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="border-t border-gray-700 bg-gray-900">
          <div className="container px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col md:flex-row justify-between items-centre gap-4">
              <div className="flex flex-col sm:flex-row items-centre gap-4 text-sm text-gray-400">
                <span>© {currentYear} {BUSINESS_NAME}. All rights reserved.</span>
                <span className="hidden sm:inline">|</span>
                <span>Licensed & Insured Australia-Wide</span>
              </div>
              
              <div className="flex items-centre gap-6">
                <div className="flex items-centre gap-2">
                  <div className={`h-3 w-3 rounded-full animate-pulse ${isAvailable ? 'bg-green-400' : 'bg-red-400'}`}></div>
                  <span className="text-sm font-medium text-green-400">
                    {isAvailable ? 'Emergency Teams Available Now' : 'Emergency Teams On-Call'}
                  </span>
                </div>
                
                <a href="tel:1300566166" 
                   className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg font-bold text-white transition-all duration-300 transform hover:scale-105 animate-pulse">
                  <div className="flex items-centre gap-2">
                    <Phone className="h-5 w-5" />
                    Emergency: 1300 566 166
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;

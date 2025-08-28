'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowUpIcon,
  ChevronRightIcon,
  GlobeAltIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

export default function UltraModernFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setIsVisible(scrollPosition > windowHeight && scrollPosition < documentHeight - windowHeight * 2);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const footerSections = [
    {
      title: 'Emergency Services',
      gradient: 'from-red-500 to-orange-500',
      links: [
        { label: 'Water Damage', href: '/services/water-damage' },
        { label: 'Fire & Smoke', href: '/services/fire-damage' },
        { label: 'Mold Remediation', href: '/services/mold-remediation' },
        { label: 'Biohazard Cleanup', href: '/services/biohazard' },
      ]
    },
    {
      title: 'Coverage Areas',
      gradient: 'from-blue-500 to-cyan-500',
      links: [
        { label: 'Sydney Metro', href: '/locations/nsw/sydney' },
        { label: 'Melbourne CBD', href: '/locations/vic/melbourne' },
        { label: 'Brisbane City', href: '/locations/qld/brisbane' },
        { label: 'Perth Region', href: '/locations/wa/perth' },
      ]
    },
    {
      title: 'Company',
      gradient: 'from-purple-500 to-pink-500',
      links: [
        { label: 'About Us', href: '/about' },
        { label: 'Technology', href: '/about/technology' },
        { label: 'Certifications', href: '/certifications' },
        { label: 'Careers', href: '/careers' },
      ]
    },
    {
      title: 'Resources',
      gradient: 'from-green-500 to-teal-500',
      links: [
        { label: 'Emergency Guide', href: '/resources/emergency-guide' },
        { label: 'Insurance Claims', href: '/resources/insurance' },
        { label: 'FAQ', href: '/faq' },
        { label: 'Blog', href: '/blog' },
      ]
    }
  ];

  const certifications = [
    'ISO 9001', 'IICRC Certified', 'EPA RRP', 'BBB A+'
  ];

  return (
    <>
      {/* Footer */}
      <footer className="relative z-20 mt-auto">
        {/* Animated gradient border */}
        <div className="absolute top-0 left-0 right-0 h-[1px] overflow-hidden">
          <div className="h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
        </div>

        {/* Main Footer Content */}
        <div className="bg-slate-900/95 backdrop-blur-lg border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Top Section with Emergency CTA */}
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-6">
                <div className="animate-spin-slow">
                  <ShieldCheckIcon className="w-16 h-16 text-cyan-400" />
                </div>
                <div className="text-left">
                  <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    Disaster Recovery Pro
                  </h2>
                  <p className="text-gray-400">Australia's #1 Emergency Response Team</p>
                </div>
              </div>

              {/* Emergency Hotline Banner */}
              <div className="relative inline-block transition-transform hover:scale-105">
                <div className="relative rounded-full border border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
                  <div className="backdrop-blur-sm rounded-full px-8 py-4 flex items-center gap-4">
                    <div className="relative">
                      <BoltIcon className="w-8 h-8 text-yellow-400 animate-pulse" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 uppercase tracking-wider">24/7 Emergency Hotline</p>
                      <a href="tel:1-800-DISASTER" className="text-3xl font-bold text-white hover:text-cyan-400 transition-colors">
                        1-800-DISASTER
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-ping" />
                      <span className="text-sm text-green-400 font-medium">Live Now</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer Links Grid */}
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {footerSections.map((section) => (
                <div key={section.title}>
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <div className={`w-1 h-6 bg-gradient-to-b ${section.gradient} rounded-full`} />
                    <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {section.title}
                    </span>
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          onMouseEnter={() => setHoveredLink(`${section.title}-${link.label}`)}
                          onMouseLeave={() => setHoveredLink(null)}
                          className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all"
                        >
                          <span className={`w-1.5 h-1.5 bg-cyan-400 rounded-full transition-transform ${
                            hoveredLink === `${section.title}-${link.label}` ? 'scale-100' : 'scale-0'
                          }`} />
                          <span className="relative">
                            {link.label}
                            <span className={`absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-400 to-blue-400 transition-all origin-left ${
                              hoveredLink === `${section.title}-${link.label}` ? 'scale-x-100' : 'scale-x-0'
                            }`} />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Trust Indicators */}
            <div className="border-t border-white/10 pt-8 mb-8">
              <div className="flex flex-wrap justify-center items-center gap-8">
                {certifications.map((cert) => (
                  <div
                    key={cert}
                    className="bg-slate-800/50 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center gap-2 transition-transform hover:-translate-y-1"
                  >
                    <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-medium text-gray-300">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Info Row */}
            <div className="grid md:grid-cols-3 gap-6 py-8 border-t border-white/10">
              {[
                {
                  icon: PhoneIcon,
                  label: 'Emergency Line',
                  value: '1-800-DISASTER',
                  href: 'tel:1-800-DISASTER',
                  color: 'text-red-400'
                },
                {
                  icon: EnvelopeIcon,
                  label: 'Email Support',
                  value: 'help@disasterrecovery.com.au',
                  href: 'mailto:help@disasterrecovery.com.au',
                  color: 'text-blue-400'
                },
                {
                  icon: ClockIcon,
                  label: 'Response Time',
                  value: '24/7 • 365 Days',
                  href: '#',
                  color: 'text-green-400'
                }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="bg-slate-800/30 backdrop-blur-sm rounded-xl p-4 flex items-center gap-4 group transition-all hover:bg-slate-700/30 hover:scale-105"
                >
                  <item.icon className={`w-8 h-8 ${item.color} group-hover:scale-110 transition-transform`} />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-semibold">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-white/10 pt-8 mt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <div className="text-center md:text-left">
                  <p className="text-gray-400 text-sm">
                    © {new Date().getFullYear()} Disaster Recovery Pro. All rights reserved.
                  </p>
                  <div className="flex gap-4 mt-2 justify-center md:justify-start">
                    <Link href="/privacy" className="text-xs text-gray-500 hover:text-white transition-colors">
                      Privacy Policy
                    </Link>
                    <Link href="/terms" className="text-xs text-gray-500 hover:text-white transition-colors">
                      Terms of Service
                    </Link>
                    <Link href="/sitemap" className="text-xs text-gray-500 hover:text-white transition-colors">
                      Sitemap
                    </Link>
                  </div>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <span className="text-sm text-gray-400">Follow Us:</span>
                  {['Facebook', 'Twitter', 'LinkedIn', 'Instagram'].map((social) => (
                    <a
                      key={social}
                      href="#"
                      className="w-10 h-10 bg-slate-800/50 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-white/10 transition-all hover:scale-110 hover:rotate-6"
                    >
                      <span className="text-xs font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                        {social.charAt(0)}
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Animated Bottom Gradient Line */}
            <div className="mt-8 h-[2px] overflow-hidden rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 left-6 z-50 bg-slate-800/50 backdrop-blur-sm rounded-full p-4 hover:bg-white/10 transition-all ${
          isVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
        } hover:scale-110`}
      >
        <ArrowUpIcon className="w-6 h-6 text-cyan-400" />
        <div className="absolute inset-0 rounded-full border-2 border-cyan-400 animate-ping" />
      </button>
    </>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function UltraModernFooter() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 100,
        y: (e.clientY / window.innerHeight) * 100,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const services = [
    { label: 'Water Damage', href: '/services/water-damage' },
    { label: 'Fire & Smoke', href: '/services/fire-damage' },
    { label: 'Mould Remediation', href: '/services/mould-remediation' },
    { label: 'Commercial Services', href: '/services/commercial' },
  ];

  const company = [
    { label: 'About Us', href: '/about' },
    { label: 'Technology', href: '/technology' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Certifications', href: '/certifications' },
    { label: 'Clean Claims Partner', href: '/partners/clean-claims' },
  ];

  const support = [
    { label: 'Contact', href: '/contact' },
    { label: 'Emergency Guide', href: '/emergency-guide' },
    { label: 'Insurance Claims', href: '/insurance' },
    { label: 'FAQ', href: '/faq' },
  ];

  const socialLinks = [
    { image: '/images/logos/3D Facebook.png', href: '#', label: 'Facebook' },
    { image: '/images/logos/3D Instagram.png', href: '#', label: 'Instagram' },
    { image: '/images/logos/3D LinkedIn.png', href: '#', label: 'LinkedIn' },
    { image: '/images/logos/3D YouTube.png', href: '#', label: 'YouTube' },
  ];

  return (
    <footer 
      className="relative overflow-hidden"
      style={{
        background: `
          radial-gradient(
            circle at ${mousePosition.x}% ${mousePosition.y}%,
            rgba(99, 91, 255, 0.05) 0%,
            transparent 50%
          ),
          linear-gradient(180deg, #0a0a0a 0%, #1a1a2e 100%)
        `
      }}
    >
      {/* Animated gradient border */}
      <div 
        className="absolute top-0 left-0 right-0 h-[1px]"
        style={{
          background: 'linear-gradient(90deg, transparent, #635bff, #00d4ff, transparent)',
          backgroundSize: '200% 100%',
          animation: 'gradient-x 3s ease infinite',
        }}
      />

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(rgba(99, 91, 255, 0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(99, 91, 255, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Top section with CTA */}
        <div 
          className="mb-16 p-8 rounded-3xl text-center"
          style={{
            background: 'rgba(99, 91, 255, 0.05)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(99, 91, 255, 0.2)',
          }}
        >
          <h3 
            className="text-3xl font-bold mb-4"
            style={{
              background: 'linear-gradient(135deg, #635bff 0%, #00d4ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            24/7 Emergency Response
          </h3>
          <p className="text-gray-400 mb-6">
            Disaster doesn't wait. Neither do we. Call now for immediate assistance.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-white transition-all hover:scale-105"
            style={{
              background: 'linear-gradient(135deg, #ff4545 0%, #ff8845 100%)',
              boxShadow: '0 10px 40px rgba(255, 69, 69, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(255, 69, 69, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = '0 10px 40px rgba(255, 69, 69, 0.3)';
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Contact Us
          </Link>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Brand section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              {/* Logo with modern glass effect */}
              <div className="relative">
                <div 
                  className="absolute inset-0 rounded-xl"
                  style={{
                    background: 'linear-gradient(135deg, rgba(99, 91, 255, 0.15) 0%, rgba(0, 212, 255, 0.1) 100%)',
                    filter: 'blur(10px)',
                    transform: 'scale(1.3)',
                  }}
                />
                <Image
                  src="/logos/3D Disaster Recovery Round Borders.png"
                  alt="Disaster Recovery"
                  width={48}
                  height={48}
                  className="relative z-10"
                  style={{
                    filter: 'drop-shadow(0 2px 6px rgba(0, 0, 0, 0.4))',
                    backgroundColor: 'transparent',
                    borderRadius: '50%',
                    objectFit: 'contain',
                    mixBlendMode: 'normal',
                  }}
                />
              </div>
              <div>
                <div 
                  className="text-xl font-bold tracking-tight"
                  style={{
                    background: 'linear-gradient(135deg, #ffffff 0%, #c0c0c0 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  Disaster Recovery
                </div>
                <div 
                  className="text-xs uppercase tracking-[0.2em] mt-0.5"
                  style={{
                    color: 'rgba(99, 91, 255, 0.7)',
                    fontWeight: '500',
                  }}
                >
                  Premier Restoration
                </div>
              </div>
            </div>
            
            <p className="text-gray-400 text-sm mb-6 max-w-sm">
              Leading the industry with cutting-edge restoration technology and unmatched expertise. 
              Available 24/7 for emergency response nationwide.
            </p>

            {/* Trust badges */}
            <div className="flex flex-wrap gap-3">
              {['IICRC Certified', 'Licensed & Insured', 'Award Winning'].map((badge) => (
                <div
                  key={badge}
                  className="px-3 py-1.5 rounded-full text-xs font-medium text-purple-300"
                  style={{
                    background: 'rgba(99, 91, 255, 0.1)',
                    border: '1px solid rgba(99, 91, 255, 0.3)',
                  }}
                >
                  ✓ {badge}
                </div>
              ))}
            </div>
          </div>

          {/* Services column */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="w-8 h-[1px] bg-gradient-to-r from-purple-500 to-transparent" />
              Services
            </h4>
            <ul className="space-y-3">
              {services.map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-white text-sm transition-colours relative group inline-flex items-center"
                  >
                    <span className="absolute left-0 w-0 h-[1px] bg-purple-500 transition-all group-hover:w-full" />
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company column */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="w-8 h-[1px] bg-gradient-to-r from-cyan-500 to-transparent" />
              Company
            </h4>
            <ul className="space-y-3">
              {company.map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-white text-sm transition-colours relative group inline-flex items-center"
                  >
                    <span className="absolute left-0 w-0 h-[1px] bg-cyan-500 transition-all group-hover:w-full" />
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support column */}
          <div>
            <h4 className="text-white font-semibold mb-4 flex items-center gap-2">
              <div className="w-8 h-[1px] bg-gradient-to-r from-emerald-500 to-transparent" />
              Support
            </h4>
            <ul className="space-y-3">
              {support.map((item) => (
                <li key={item.label}>
                  <Link 
                    href={item.href}
                    className="text-gray-400 hover:text-white text-sm transition-colours relative group inline-flex items-center"
                  >
                    <span className="absolute left-0 w-0 h-[1px] bg-emerald-500 transition-all group-hover:w-full" />
                    <span className="relative">{item.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Strategic Partners Section */}
        <div className="mb-12 pt-8" style={{ borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <h4 className="text-white font-semibold mb-6 text-center">Strategic Partners</h4>
          <div className="flex justify-center items-center gap-8">
            <Link 
              href="/partners/clean-claims"
              className="group relative bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all hover:scale-105"
            >
              <Image
                src="/images/logos/3D Clean Claims Logo.png"
                alt="Clean Claims - Strategic Technology Partner"
                width={150}
                height={60}
                className="h-12 w-auto object-contain"
              />
              <span className="sr-only">Clean Claims Partnership</span>
            </Link>
          </div>
        </div>

        {/* Bottom section */}
        <div 
          className="pt-8 mt-8"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            {/* Copyright */}
            <div className="text-sm text-gray-500">
              © {new Date().getFullYear()} Disaster Recovery. All rights reserved.
            </div>

            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="relative w-12 h-12 rounded-lg flex items-center justify-center transition-all hover:scale-110 group overflow-hidden"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(99, 91, 255, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(99, 91, 255, 0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
                  }}
                >
                  <Image
                    src={social.image}
                    alt={social.label}
                    width={32}
                    height={32}
                    className="object-contain transition-transform group-hover:scale-110"
                  />
                </a>
              ))}
            </div>

            {/* Legal links */}
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-white transition-colours">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-white transition-colours">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Floating gradient orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-20"
           style={{
             background: 'radial-gradient(circle, #635bff 0%, transparent 70%)',
             filter: 'blur(40px)',
             animation: 'float 20s ease-in-out infinite',
           }} />
      <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full opacity-20"
           style={{
             background: 'radial-gradient(circle, #00d4ff 0%, transparent 70%)',
             filter: 'blur(40px)',
             animation: 'float 15s ease-in-out infinite reverse',
           }} />
    </footer>
  );
}
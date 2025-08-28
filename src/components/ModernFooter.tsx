'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  PhoneIcon, 
  EnvelopeIcon, 
  MapPinIcon,
  ClockIcon,
  ShieldCheckIcon,
  ArrowUpIcon,
  SparklesIcon,
  ChevronRightIcon,
  GlobeAltIcon,
  BoltIcon
} from '@heroicons/react/24/outline';

export default function UltraModernFooter() {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);

  // Mouse tracking for interactive effects
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      setIsVisible(scrollPosition > windowHeight && scrollPosition < documentHeight - windowHeight * 2);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

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
          <motion.div
            className="h-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent"
            animate={{ x: ['-100%', '100%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </div>

        {/* Main Footer Content */}
        <div className="glass border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Top Section with Emergency CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <div className="inline-flex items-center gap-3 mb-6">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                >
                  <ShieldCheckIcon className="w-16 h-16 text-cyan-400" />
                </motion.div>
                <div className="text-left">
                  <h2 className="text-3xl font-bold gradient-text">Disaster Recovery Pro</h2>
                  <p className="text-gray-400">Australia's #1 Emergency Response Team</p>
                </div>
              </div>

              {/* Emergency Hotline Banner */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="relative inline-block"
              >
                <div className="glow-border rounded-full">
                  <div className="glass rounded-full px-8 py-4 flex items-center gap-4 bg-gradient-to-r from-red-900/20 to-orange-900/20">
                    <div className="relative">
                      <BoltIcon className="w-8 h-8 text-yellow-400 animate-pulse" />
                      <motion.div
                        className="absolute inset-0 w-8 h-8"
                        animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <BoltIcon className="w-8 h-8 text-yellow-400" />
                      </motion.div>
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
              </motion.div>
            </motion.div>

            {/* Footer Links Grid */}
            <div className="grid md:grid-cols-4 gap-8 mb-12">
              {footerSections.map((section, sectionIndex) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: sectionIndex * 0.1 }}
                >
                  <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                    <div className={`w-1 h-6 bg-gradient-to-b ${section.gradient} rounded-full`} />
                    <span className="gradient-text">{section.title}</span>
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <motion.li
                        key={link.label}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: sectionIndex * 0.1 + linkIndex * 0.05 }}
                      >
                        <Link
                          href={link.href}
                          onMouseEnter={() => setHoveredLink(`${section.title}-${link.label}`)}
                          onMouseLeave={() => setHoveredLink(null)}
                          className="group flex items-center gap-2 text-gray-400 hover:text-white transition-all"
                        >
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ 
                              scale: hoveredLink === `${section.title}-${link.label}` ? 1 : 0 
                            }}
                            className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
                          />
                          <span className="relative">
                            {link.label}
                            <motion.div
                              className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-cyan-400 to-blue-400"
                              initial={{ scaleX: 0 }}
                              animate={{ 
                                scaleX: hoveredLink === `${section.title}-${link.label}` ? 1 : 0 
                              }}
                              transition={{ duration: 0.3 }}
                            />
                          </span>
                        </Link>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="border-t border-white/10 pt-8 mb-8"
            >
              <div className="flex flex-wrap justify-center items-center gap-8">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={cert}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="glass px-4 py-2 rounded-lg flex items-center gap-2"
                  >
                    <ShieldCheckIcon className="w-5 h-5 text-green-400" />
                    <span className="text-sm font-medium text-gray-300">{cert}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

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
              ].map((item, index) => (
                <motion.a
                  key={item.label}
                  href={item.href}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="glass-card !p-4 flex items-center gap-4 group"
                >
                  <item.icon className={`w-8 h-8 ${item.color} group-hover:scale-110 transition-transform`} />
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">{item.label}</p>
                    <p className="text-white font-semibold">{item.value}</p>
                  </div>
                </motion.a>
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
                    <motion.a
                      key={social}
                      href="#"
                      whileHover={{ scale: 1.2, rotate: 5 }}
                      whileTap={{ scale: 0.9 }}
                      className="w-10 h-10 glass rounded-lg flex items-center justify-center hover:bg-white/10 transition-colors"
                    >
                      <span className="text-xs font-bold gradient-text">
                        {social.charAt(0)}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>

            {/* Animated Bottom Gradient Line */}
            <div className="mt-8 h-[2px] overflow-hidden rounded-full">
              <motion.div
                className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                animate={{ 
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                style={{ backgroundSize: '200% 100%' }}
              />
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-6 left-6 z-50 glass rounded-full p-4 hover:bg-white/10 transition-all"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <ArrowUpIcon className="w-6 h-6 text-cyan-400" />
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-cyan-400"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.button>
    </>
  );
}

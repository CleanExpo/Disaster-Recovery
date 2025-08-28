'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import { 
  ShieldCheckIcon, 
  Bars3Icon, 
  XMarkIcon,
  ChevronDownIcon,
  PhoneIcon,
  BoltIcon,
  SparklesIcon,
  HomeIcon,
  UserGroupIcon,
  MapPinIcon,
  ChatBubbleLeftRightIcon
} from '@heroicons/react/24/outline';

export default function UltraModernHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  // Magnetic button effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothMouseX = useSpring(mouseX, { stiffness: 300, damping: 30 });
  const smoothMouseY = useSpring(mouseY, { stiffness: 300, damping: 30 });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
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

  const navItems = [
    { 
      label: 'Services', 
      href: '/services',
      icon: HomeIcon,
      dropdown: [
        { label: 'Water Damage', href: '/services/water-damage', color: 'from-blue-500 to-cyan-500' },
        { label: 'Fire & Smoke', href: '/services/fire-damage', color: 'from-orange-500 to-red-500' },
        { label: 'Mold Remediation', href: '/services/mold-remediation', color: 'from-green-500 to-teal-500' },
        { label: 'Biohazard Cleanup', href: '/services/biohazard', color: 'from-purple-500 to-pink-500' },
      ]
    },
    { 
      label: 'About', 
      href: '/about',
      icon: UserGroupIcon,
      dropdown: [
        { label: 'Our Team', href: '/about/team', color: 'from-indigo-500 to-purple-500' },
        { label: 'Technology', href: '/about/technology', color: 'from-cyan-500 to-blue-500' },
        { label: 'Certifications', href: '/certifications', color: 'from-green-500 to-emerald-500' },
        { label: 'Case Studies', href: '/case-studies', color: 'from-rose-500 to-pink-500' },
      ]
    },
    { 
      label: 'Locations', 
      href: '/locations',
      icon: MapPinIcon
    },
    { 
      label: 'Contact', 
      href: '/contact',
      icon: ChatBubbleLeftRightIcon
    }
  ];

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'glass' 
            : 'bg-gradient-to-b from-black/50 to-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, type: "spring" }}
      >
        {/* Animated border gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Logo with animated effects */}
            <Link href="/" className="relative group">
              <motion.div
                className="flex items-center space-x-3"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {/* Animated Logo Icon */}
                <div className="relative">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-md opacity-50"
                  />
                  <motion.div
                    whileHover={{ rotate: 180 }}
                    transition={{ duration: 0.5 }}
                    className="relative"
                  >
                    <ShieldCheckIcon className="h-12 w-12 text-cyan-400" />
                  </motion.div>
                </div>
                
                {/* Logo Text with Gradient */}
                <div>
                  <div className="text-2xl font-bold gradient-text">
                    Disaster Pro
                  </div>
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest">
                    Next-Gen Recovery
                  </div>
                </div>
              </motion.div>
              
              {/* Logo hover effect */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-cyan-600/20 rounded-lg blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </Link>

            {/* Desktop Navigation with Glass Effects */}
            <nav className="hidden md:flex items-center space-x-2">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => {
                    setActiveDropdown(item.label);
                    setHoveredItem(item.label);
                  }}
                  onMouseLeave={() => {
                    setActiveDropdown(null);
                    setHoveredItem(null);
                  }}
                >
                  <Link
                    href={item.href}
                    className="relative px-4 py-2 flex items-center gap-2 text-gray-300 hover:text-white transition-all group"
                  >
                    {/* Hover background */}
                    <AnimatePresence>
                      {hoveredItem === item.label && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.95 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="absolute inset-0 glass rounded-lg"
                          layoutId="navbar-hover"
                        />
                      )}
                    </AnimatePresence>
                    
                    <span className="relative z-10 font-medium">{item.label}</span>
                    
                    {item.dropdown && (
                      <ChevronDownIcon className={`relative z-10 w-4 h-4 transition-transform ${
                        activeDropdown === item.label ? 'rotate-180' : ''
                      }`} />
                    )}
                    
                    {/* Animated underline */}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-400"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>

                  {/* Ultra-modern Dropdown */}
                  <AnimatePresence>
                    {item.dropdown && activeDropdown === item.label && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, type: "spring" }}
                        className="absolute top-full left-0 mt-2 w-64"
                      >
                        <div className="glass rounded-2xl border border-white/10 overflow-hidden">
                          {item.dropdown.map((subItem, index) => (
                            <motion.div
                              key={subItem.label}
                              initial={{ opacity: 0, x: -20 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: index * 0.05 }}
                            >
                              <Link
                                href={subItem.href}
                                className="relative block px-5 py-4 text-gray-300 hover:text-white transition-all group/item overflow-hidden"
                              >
                                {/* Hover gradient background */}
                                <motion.div
                                  className={`absolute inset-0 bg-gradient-to-r ${subItem.color} opacity-0 group-hover/item:opacity-20 transition-opacity`}
                                />
                                
                                {/* Content */}
                                <div className="relative z-10 flex items-center justify-between">
                                  <span className="font-medium">{subItem.label}</span>
                                  <motion.div
                                    initial={{ x: -10, opacity: 0 }}
                                    whileHover={{ x: 0, opacity: 1 }}
                                    className="text-cyan-400"
                                  >
                                    →
                                  </motion.div>
                                </div>
                              </Link>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </nav>

            {/* CTA Section with Advanced Effects */}
            <div className="hidden md:flex items-center gap-4">
              {/* Live Pulse Indicator */}
              <motion.div
                className="relative"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="glass px-4 py-2 rounded-full flex items-center gap-2">
                  <div className="relative">
                    <motion.div
                      className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full"
                      animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                      transition={{ duration: 1.5, repeat: Infinity }}
                    />
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </div>
                  <span className="text-xs font-medium text-green-400">LIVE</span>
                </div>
              </motion.div>

              {/* Emergency Button with Magnetic Effect */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur-lg opacity-50 group-hover:opacity-80 transition-opacity" />
                <div className="relative px-6 py-3 flex items-center gap-2 text-white font-bold">
                  <BoltIcon className="w-5 h-5 animate-pulse" />
                  <span>Emergency</span>
                  <PhoneIcon className="w-5 h-5" />
                </div>
                
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: 'conic-gradient(from 0deg, transparent, rgba(255,255,255,0.3), transparent)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                />
              </motion.button>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden relative p-3 glass rounded-lg"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <XMarkIcon className="h-6 w-6 text-white" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Bars3Icon className="h-6 w-6 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu with Glass Morphism */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden glass border-t border-white/10"
            >
              <div className="px-4 py-6 space-y-2">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5 text-cyan-400" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                    
                    {item.dropdown && (
                      <div className="ml-8 mt-2 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {subItem.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
                
                {/* Mobile Emergency CTA */}
                <motion.button
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-4 relative overflow-hidden rounded-2xl"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600" />
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 blur-xl opacity-50" />
                  <div className="relative px-6 py-4 flex items-center justify-center gap-3 text-white font-bold">
                    <BoltIcon className="w-6 h-6 animate-pulse" />
                    <span>24/7 Emergency Hotline</span>
                    <PhoneIcon className="w-6 h-6" />
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Floating Action Button (Mobile) */}
      <AnimatePresence>
        {!mobileMenuOpen && (
          <motion.div
            className="md:hidden fixed bottom-6 right-6 z-50"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <motion.a
              href="tel:1-800-DISASTER"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="relative block"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-600 rounded-full blur-lg animate-pulse" />
              <div className="relative w-16 h-16 bg-gradient-to-r from-red-600 to-orange-600 rounded-full flex items-center justify-center shadow-2xl">
                <PhoneIcon className="w-8 h-8 text-white" />
              </div>
              
              {/* Ripple effect */}
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-red-500"
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

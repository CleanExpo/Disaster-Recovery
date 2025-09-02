'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus,
  X,
  FileText,
  Calendar,
  MapPin,
  HelpCircle,
  Home,
  ArrowUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useEffect } from 'react';

interface FABItem {
  icon: React.ElementType;
  label: string;
  href?: string;
  action?: () => void;
  color: string;
}

export default function MobileFAB() {
  const [isOpen, setIsOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fabItems: FABItem[] = [
    {
      icon: FileText,
      label: 'Submit Claim',
      href: '/book-service',
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      icon: Calendar,
      label: 'Schedule',
      href: '/schedule',
      color: 'bg-purple-600 hover:bg-purple-700'
    },
    {
      icon: MapPin,
      label: 'Service Areas',
      href: '/services',
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      icon: HelpCircle,
      label: 'Help',
      href: '/resources/faq',
      color: 'bg-orange-600 hover:bg-orange-700'
    }
  ];

  return (
    <>
      {/* Main FAB Container - Positioned above bottom nav on mobile */}
      <div className="fixed bottom-20 right-4 z-40 lg:bottom-6 lg:right-6">
        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute bottom-16 right-0 lg:bottom-20"
            >
              <Button
                size="icon"
                variant="secondary"
                className="rounded-full h-10 w-10 shadow-lg"
                onClick={scrollToTop}
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAB Menu Items */}
        <AnimatePresence>
          {isOpen && (
            <div className="absolute bottom-16 right-0 space-y-3">
              {fabItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, scale: 0, y: 20 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: {
                      delay: index * 0.05,
                      type: "spring",
                      stiffness: 300,
                      damping: 25
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0, 
                    y: 20,
                    transition: {
                      delay: (fabItems.length - index - 1) * 0.05
                    }
                  }}
                  className="flex items-center justify-end gap-3"
                >
                  {/* Label */}
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-gray-900 text-white px-3 py-1 rounded-full text-sm whitespace-nowrap shadow-lg"
                  >
                    {item.label}
                  </motion.span>

                  {/* Button */}
                  {item.href ? (
                    <Link href={item.href}>
                      <Button
                        size="icon"
                        className={cn(
                          "rounded-full h-12 w-12 shadow-lg",
                          item.color
                        )}
                        onClick={() => setIsOpen(false)}
                      >
                        <item.icon className="h-5 w-5" />
                      </Button>
                    </Link>
                  ) : (
                    <Button
                      size="icon"
                      className={cn(
                        "rounded-full h-12 w-12 shadow-lg",
                        item.color
                      )}
                      onClick={() => {
                        item.action?.();
                        setIsOpen(false);
                      }}
                    >
                      <item.icon className="h-5 w-5" />
                    </Button>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </AnimatePresence>

        {/* Main Toggle Button */}
        <motion.div
          whileTap={{ scale: 0.95 }}
          className="relative"
        >
          <Button
            size="icon"
            className={cn(
              "rounded-full h-14 w-14 shadow-xl transition-all duration-300",
              isOpen 
                ? "bg-gray-900 hover:bg-gray-800" 
                : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            )}
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.div
              animate={{ rotate: isOpen ? 45 : 0 }}
              transition={{ duration: 0.2 }}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Plus className="h-6 w-6" />}
            </motion.div>
          </Button>

          {/* Pulse Animation when closed */}
          {!isOpen && (
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-600 to-purple-600"
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.5, 0, 0.5]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          )}
        </motion.div>
      </div>

      {/* Backdrop when menu is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30 lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
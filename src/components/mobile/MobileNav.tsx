'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Menu,
  X,
  Home,
  Briefcase,
  Users,
  FileText,
  Settings,
  LogIn,
  ChevronDown,
  Shield,
  Droplets,
  Flame,
  Wind,
  Building2,
  AlertTriangle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface NavItem {
  title: string;
  href?: string;
  icon?: React.ElementType;
  children?: NavItem[];
}

const navigation: NavItem[] = [
  {
    title: 'Home',
    href: '/',
    icon: Home
  },
  {
    title: 'Services',
    icon: Briefcase,
    children: [
      { title: 'Water Damage', href: '/services/water-damage', icon: Droplets },
      { title: 'Fire & Smoke', href: '/services/fire-damage', icon: Flame },
      { title: 'Storm Damage', href: '/services/storm-damage', icon: Wind },
      { title: 'Commercial', href: '/services/commercial', icon: Building2 },
      { title: 'Emergency', href: '/services/emergency-services', icon: AlertTriangle }
    ]
  },
  {
    title: 'Resources',
    icon: FileText,
    children: [
      { title: 'Insurance Claims', href: '/resources/insurance' },
      { title: 'Emergency Guide', href: '/resources/emergency-guide' },
      { title: 'FAQ', href: '/resources/faq' },
      { title: 'Blog', href: '/resources/blog' }
    ]
  },
  {
    title: 'Company',
    icon: Users,
    children: [
      { title: 'About Us', href: '/about' },
      { title: 'Certifications', href: '/certifications' },
      { title: 'Case Studies', href: '/case-studies' },
      { title: 'Careers', href: '/careers' }
    ]
  },
  {
    title: 'Portal',
    icon: Shield,
    children: [
      { title: 'Client Portal', href: '/portal/client' },
      { title: 'Contractor Portal', href: '/portal/contractor' },
      { title: 'Partner Portal', href: '/portal/partner' }
    ]
  }
];

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href;

  return (
    <>
      {/* Mobile Header Bar */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-lg border-b">
        <div className="flex items-center justify-between px-4 h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">DR</span>
            </div>
            <span className="font-bold text-lg">Disaster Recovery</span>
          </Link>

          {/* Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] sm:w-[400px] p-0">
              <SheetHeader className="px-6 py-4 border-b">
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>
                  Access all services and resources
                </SheetDescription>
              </SheetHeader>

              {/* Navigation Items */}
              <div className="h-[calc(100vh-8rem)] overflow-y-auto">
                <nav className="px-3 py-4">
                  <Accordion type="single" collapsible className="w-full">
                    {navigation.map((item, index) => (
                      <div key={item.title}>
                        {item.children ? (
                          <AccordionItem value={`item-${index}`} className="border-none">
                            <AccordionTrigger className="hover:no-underline px-3 py-3 rounded-lg hover:bg-accent">
                              <div className="flex items-center gap-3">
                                {item.icon && <item.icon className="h-5 w-5" />}
                                <span className="font-medium">{item.title}</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="ml-8 space-y-1">
                                {item.children.map((child) => (
                                  <Link
                                    key={child.title}
                                    href={child.href || '#'}
                                    onClick={() => setIsOpen(false)}
                                    className={cn(
                                      "flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors",
                                      isActive(child.href || '') 
                                        ? "bg-primary text-primary-foreground" 
                                        : "hover:bg-accent"
                                    )}
                                  >
                                    {child.icon && <child.icon className="h-4 w-4" />}
                                    {child.title}
                                  </Link>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ) : (
                          <Link
                            href={item.href || '#'}
                            onClick={() => setIsOpen(false)}
                            className={cn(
                              "flex items-center gap-3 px-3 py-3 rounded-lg transition-colors",
                              isActive(item.href || '') 
                                ? "bg-primary text-primary-foreground" 
                                : "hover:bg-accent"
                            )}
                          >
                            {item.icon && <item.icon className="h-5 w-5" />}
                            <span className="font-medium">{item.title}</span>
                          </Link>
                        )}
                      </div>
                    ))}
                  </Accordion>
                </nav>

                {/* CTA Buttons */}
                <div className="px-6 py-4 border-t space-y-3">
                  <Button className="w-full" size="lg" asChild>
                    <Link href="/book-service">
                      Submit Claim
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" size="lg" asChild>
                    <Link href="/portal/login">
                      <LogIn className="mr-2 h-4 w-4" />
                      Sign In
                    </Link>
                  </Button>
                </div>

                {/* Quick Contact */}
                <div className="px-6 py-4 border-t bg-muted/50">
                  <p className="text-sm font-medium mb-2">24/7 Emergency Support</p>
                  <p className="text-xs text-muted-foreground">
                    Submit emergency claims online for immediate processing
                  </p>
                  <Button variant="destructive" size="sm" className="mt-3 w-full" asChild>
                    <Link href="/emergency">
                      Emergency Claim
                    </Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-lg border-t">
        <div className="grid grid-cols-4 h-16">
          <Link
            href="/"
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs",
              isActive('/') ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </Link>
          <Link
            href="/services"
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs",
              pathname?.startsWith('/services') ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Briefcase className="h-5 w-5" />
            <span>Services</span>
          </Link>
          <Link
            href="/book-service"
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs",
              isActive('/book-service') ? "text-primary" : "text-muted-foreground"
            )}
          >
            <FileText className="h-5 w-5" />
            <span>Claim</span>
          </Link>
          <Link
            href="/portal/client"
            className={cn(
              "flex flex-col items-center justify-center gap-1 text-xs",
              pathname?.startsWith('/portal') ? "text-primary" : "text-muted-foreground"
            )}
          >
            <Shield className="h-5 w-5" />
            <span>Portal</span>
          </Link>
        </div>
      </div>

      {/* Spacer for fixed header and bottom nav */}
      <div className="lg:hidden h-16" />
    </>
  );
}
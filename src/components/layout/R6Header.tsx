'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Phone, 
  Menu, 
  X, 
  ChevronDown,
  Shield,
  Clock,
  Award,
  MapPin,
  ArrowRight,
  MessageCircle,
  Zap,
  Users,
  AlertTriangle,
  Headphones
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { R6Button } from '@/components/ui/r6-button';

interface NavItem {
  label: string;
  href?: string;
  items?: { label: string; href: string; description?: string; icon?: React.ReactNode }[];
}

const navigation: NavItem[] = [
  {
    label: 'Services',
    items: [
      { 
        label: 'Water Damage Restoration', 
        href: '/services/water-damage', 
        description: 'Emergency water extraction & drying',
        icon: '💧'
      },
      { 
        label: 'Fire & Smoke Damage', 
        href: '/services/fire-damage-restoration', 
        description: 'Complete fire damage recovery',
        icon: '🔥'
      },
      { 
        label: 'Mould Remediation', 
        href: '/services/mould-remediation', 
        description: 'Safe mould removal & prevention',
        icon: '🦠'
      },
      { 
        label: 'Sewage Cleanup', 
        href: '/services/sewage-cleanup', 
        description: 'Biohazard sanitisation services',
        icon: '⚠️'
      },
      { 
        label: 'Storm Damage', 
        href: '/services/storm-damage', 
        description: 'Emergency storm recovery',
        icon: '⛈️'
      },
      { 
        label: 'Commercial Services', 
        href: '/services/commercial-services', 
        description: 'Large-scale disaster recovery',
        icon: '🏢'
      }
    ]
  },
  {
    label: 'Emergency',
    items: [
      { 
        label: '24/7 Emergency Response', 
        href: '/services/emergency-services', 
        description: 'Immediate disaster response',
        icon: '🚨'
      },
      { 
        label: 'Insurance Claims', 
        href: '/insurance-claims', 
        description: 'We work with all insurers',
        icon: '📋'
      },
      { 
        label: 'Free Assessment', 
        href: '/free-assessment', 
        description: 'No-obligation damage assessment',
        icon: '🔍'
      }
    ]
  },
  {
    label: 'About',
    items: [
      { 
        label: 'Our Company', 
        href: '/about', 
        description: 'Queensland\'s trusted recovery experts',
        icon: '🏆'
      },
      { 
        label: 'Our Process', 
        href: '/process', 
        description: 'How we restore your property',
        icon: '⚙️'
      },
      { 
        label: 'Certifications', 
        href: '/certifications', 
        description: 'IICRC certified technicians',
        icon: '🎓'
      },
      { 
        label: 'Coverage Areas', 
        href: '/areas', 
        description: 'Servicing all of Queensland',
        icon: '📍'
      }
    ]
  },
  { label: 'Contact', href: '/contact' }
];

export default function R6Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showLiveChat, setShowLiveChat] = useState(false);
  const [emergencyMode, setEmergencyMode] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Simulate emergency mode activation
  useEffect(() => {
    const emergencyKeywords = ['emergency', 'urgent', 'flood', 'fire', 'damage'];
    const isEmergencyPage = emergencyKeywords.some(keyword => 
      pathname.toLowerCase().includes(keyword)
    );
    setEmergencyMode(isEmergencyPage);
  }, [pathname]);

  return (
    <>
      {/* Emergency Alert Banner - Conditional */}
      {emergencyMode && (
        <div className="bg-gradient-to-r from-red-600 via-red-500 to-red-600 text-white relative overflow-hidden animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          <div className="container mx-auto px-6 relative">
            <div className="flex items-center justify-center py-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 animate-bounce" />
                <span className="text-sm font-bold">🚨 EMERGENCY RESPONSE ACTIVE • TEAMS DISPATCHED WITHIN 60 MINUTES • CALL NOW 🚨</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Bar - Enhanced Emergency Focus */}
      <div className={cn(
        "hidden lg:block text-white relative overflow-hidden transition-all duration-500",
        emergencyMode 
          ? "bg-gradient-to-r from-red-600 to-red-700" 
          : "bg-gradient-to-r from-[#131cff] to-[#00a0d2]"
      )}>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <div className="container mx-auto px-6 relative">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2 group">
                <Shield className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">IICRC Certified</span>
              </div>
              <div className="flex items-center gap-2 group">
                <Award className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">Insurance Approved</span>
              </div>
              <div className="flex items-center gap-2 group">
                <Users className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span className="text-sm font-medium">
                  <span className="inline-block w-2 h-2 bg-green-400 rounded-full animate-pulse mr-1"></span>
                  Teams Available Now
                </span>
              </div>
              <div className="flex items-center gap-2 group">
                <Zap className="w-4 h-4 group-hover:scale-110 transition-transform animate-pulse" />
                <span className="text-sm font-medium">60-Min Response Guarantee</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowLiveChat(true)}
                className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full hover:bg-white/20 transition-all duration-300 group text-sm font-medium"
              >
                <Headphones className="w-4 h-4 group-hover:bounce transition-all" />
                <span>Live Chat</span>
              </button>
              <a 
                href="tel:1300566166" 
                className={cn(
                  "flex items-center gap-2 backdrop-blur-sm px-4 py-2 rounded-full transition-all duration-300 group font-bold",
                  emergencyMode 
                    ? "bg-white text-red-600 hover:bg-red-50 animate-pulse" 
                    : "bg-white/20 text-white hover:bg-white/30"
                )}
              >
                <Phone className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>1300 566 166</span>
                {emergencyMode && (
                  <span className="text-xs bg-red-600 text-white px-2 py-0.5 rounded-full ml-1">
                    EMERGENCY
                  </span>
                )}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header - Enhanced Emergency Style */}
      <header 
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-500",
          isScrolled 
            ? "bg-white/95 backdrop-blur-xl shadow-[0_8px_30px_rgba(19,28,255,0.08)]" 
            : "bg-white shadow-sm",
          emergencyMode && "ring-2 ring-red-500/20"
        )}
      >
        <nav className="container mx-auto px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="relative group">
              <Image
                src="/logo.svg"
                alt="Disaster Recovery"
                width={200}
                height={50}
                priority
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute -inset-2 bg-gradient-to-r from-[#131cff]/20 to-[#00a0d2]/20 rounded-lg opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300 -z-10" />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <div key={item.label} className="relative group">
                  {item.items ? (
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.label ? null : item.label)}
                      onMouseEnter={() => setActiveDropdown(item.label)}
                      className={cn(
                        "flex items-center gap-1.5 px-5 py-2.5 rounded-lg font-semibold text-[15px] transition-all duration-300",
                        "hover:bg-[#131cff]/5 hover:text-[#131cff]",
                        activeDropdown === item.label && "bg-[#131cff]/5 text-[#131cff]"
                      )}
                    >
                      <span>{item.label}</span>
                      <ChevronDown className={cn(
                        "w-4 h-4 transition-transform duration-300",
                        activeDropdown === item.label && "rotate-180"
                      )} />
                    </button>
                  ) : (
                    <Link
                      href={item.href!}
                      className={cn(
                        "flex items-center px-5 py-2.5 rounded-lg font-semibold text-[15px] transition-all duration-300",
                        "hover:bg-[#131cff]/5 hover:text-[#131cff]",
                        pathname === item.href && "bg-[#131cff]/5 text-[#131cff]"
                      )}
                    >
                      {item.label}
                    </Link>
                  )}

                  {/* Mega Dropdown - R6 Style */}
                  {item.items && (
                    <div 
                      className={cn(
                        "absolute top-full left-0 mt-2 w-[400px] opacity-0 invisible transition-all duration-300",
                        "group-hover:opacity-100 group-hover:visible",
                        activeDropdown === item.label && "opacity-100 visible"
                      )}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <div className="bg-white rounded-2xl shadow-[0_20px_60px_rgba(19,28,255,0.15)] border border-[#eeeeee] overflow-hidden">
                        <div className="p-2">
                          {item.items.map((subItem, idx) => (
                            <Link
                              key={subItem.label}
                              href={subItem.href}
                              className="flex items-start gap-4 p-4 rounded-xl hover:bg-gradient-to-r hover:from-[#131cff]/5 hover:to-[#00a0d2]/5 transition-all duration-300 group/item"
                            >
                              {subItem.icon && (
                                <span className="text-2xl group-hover/item:scale-110 transition-transform">
                                  {subItem.icon}
                                </span>
                              )}
                              <div className="flex-1">
                                <div className="font-semibold text-[#000000] group-hover/item:text-[#131cff] transition-colors">
                                  {subItem.label}
                                </div>
                                {subItem.description && (
                                  <div className="text-sm text-[#6a6d72] mt-0.5">
                                    {subItem.description}
                                  </div>
                                )}
                              </div>
                              <ArrowRight className="w-4 h-4 text-[#c7cfdb] group-hover/item:text-[#131cff] opacity-0 group-hover/item:opacity-100 -translate-x-2 group-hover/item:translate-x-0 transition-all duration-300" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Enhanced Emergency CTA Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Emergency Quick Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowLiveChat(true)}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-[#6a6d72] hover:text-[#131cff] hover:bg-[#131cff]/5 rounded-lg transition-all duration-300 group"
                >
                  <MessageCircle className="w-4 h-4 group-hover:scale-110 transition-transform" />
                  <span className="hidden xl:inline">Live Chat</span>
                </button>
                
                {/* Response Time Indicator */}
                <div className="flex items-center gap-2 px-3 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs font-semibold hidden xl:inline">Teams Ready</span>
                  <Clock className="w-4 h-4" />
                  <span className="text-xs font-bold">60min</span>
                </div>
              </div>

              {/* Main CTA Buttons */}
              <div className="flex items-center gap-2 pl-2 border-l border-gray-200">
                <R6Button
                  variant="outline"
                  size="sm"
                  className="hidden xl:inline-flex group hover:border-[#131cff] hover:bg-[#131cff]/5"
                >
                  <span className="group-hover:scale-105 transition-transform">Free Assessment</span>
                </R6Button>
                
                <a href="tel:1300566166">
                  <R6Button
                    variant={emergencyMode ? "danger" : "gradient"}
                    size="sm"
                    rightIcon={<Phone className="w-4 h-4" />}
                    className={cn(
                      "relative overflow-hidden group",
                      emergencyMode && "animate-pulse shadow-lg shadow-red-500/25"
                    )}
                  >
                    <span className="relative z-10">
                      {emergencyMode ? "EMERGENCY CALL" : "Call Now"}
                    </span>
                    {emergencyMode && (
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 opacity-90 group-hover:opacity-100 transition-opacity" />
                    )}
                  </R6Button>
                </a>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-[#131cff]/5 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-[#131cff]" />
              ) : (
                <Menu className="w-6 h-6 text-[#131cff]" />
              )}
            </button>
          </div>
        </nav>

        {/* Mobile Menu - R6 Style */}
        <div className={cn(
          "lg:hidden fixed inset-x-0 top-[120px] bg-white shadow-2xl transition-all duration-500 overflow-y-auto",
          isMobileMenuOpen ? "max-h-[calc(100vh-120px)] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="p-6 space-y-4">
            {navigation.map((item) => (
              <div key={item.label}>
                {item.items ? (
                  <div>
                    <div className="font-semibold text-[#131cff] mb-3">{item.label}</div>
                    <div className="space-y-2 pl-4">
                      {item.items.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          onClick={() => setIsMobileMenuOpen(false)}
                          className="block py-2 text-[#6a6d72] hover:text-[#131cff] transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <Link
                    href={item.href!}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-3 font-semibold text-[#000000] hover:text-[#131cff] transition-colors"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
            
            {/* Mobile Emergency Actions */}
            <div className="pt-4 space-y-3 border-t border-[#eeeeee]">
              {/* Emergency Response Indicator */}
              <div className={cn(
                "flex items-center justify-center gap-2 py-3 px-4 rounded-lg font-semibold text-sm",
                emergencyMode 
                  ? "bg-red-50 text-red-700 border border-red-200" 
                  : "bg-green-50 text-green-700 border border-green-200"
              )}>
                <div className={cn(
                  "w-2 h-2 rounded-full animate-pulse",
                  emergencyMode ? "bg-red-500" : "bg-green-500"
                )} />
                <span>
                  {emergencyMode ? "Emergency Response Active" : "Teams Available Now"}
                </span>
                <Clock className="w-4 h-4" />
                <span className="font-bold">60min</span>
              </div>

              {/* Live Chat Button */}
              <button
                onClick={() => setShowLiveChat(true)}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 bg-[#00a0d2]/10 text-[#00a0d2] rounded-lg font-semibold hover:bg-[#00a0d2]/20 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
                Start Live Chat
              </button>

              {/* Emergency Call Button */}
              <a href="tel:1300566166" className="block">
                <R6Button 
                  variant={emergencyMode ? "danger" : "gradient"}
                  fullWidth
                  leftIcon={<Phone className="w-4 h-4" />}
                  className={cn(
                    "relative overflow-hidden",
                    emergencyMode && "animate-pulse shadow-lg shadow-red-500/25"
                  )}
                >
                  <span className="relative z-10">
                    {emergencyMode ? "🚨 EMERGENCY CALL NOW" : "Call 1300 566 166"}
                  </span>
                </R6Button>
              </a>

              {/* Free Assessment */}
              <R6Button variant="outline" fullWidth className="group">
                <span className="group-hover:scale-105 transition-transform">
                  Get Free Assessment
                </span>
              </R6Button>
            </div>
          </div>
        </div>
      </header>

      {/* Live Chat Modal */}
      {showLiveChat && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            {/* Chat Header */}
            <div className="bg-gradient-to-r from-[#131cff] to-[#00a0d2] text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                  <Headphones className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold">Emergency Support</h3>
                  <p className="text-sm opacity-90 flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    Available now • Avg response: 30 seconds
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLiveChat(false)}
                className="p-2 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Content */}
            <div className="p-6 space-y-4">
              <div className="bg-gray-50 rounded-lg p-4">
                <p className="text-sm text-gray-600 mb-3">
                  👋 Hi! I'm here to help with your emergency restoration needs.
                </p>
                <p className="text-sm font-semibold text-gray-900 mb-2">
                  Quick questions to get started:
                </p>
                <div className="space-y-2">
                  <button className="w-full text-left p-2 bg-white rounded border hover:border-[#131cff] hover:bg-[#131cff]/5 transition-colors text-sm">
                    💧 Water damage emergency
                  </button>
                  <button className="w-full text-left p-2 bg-white rounded border hover:border-[#131cff] hover:bg-[#131cff]/5 transition-colors text-sm">
                    🔥 Fire/smoke damage
                  </button>
                  <button className="w-full text-left p-2 bg-white rounded border hover:border-[#131cff] hover:bg-[#131cff]/5 transition-colors text-sm">
                    ⚠️ Sewage/biohazard cleanup
                  </button>
                  <button className="w-full text-left p-2 bg-white rounded border hover:border-[#131cff] hover:bg-[#131cff]/5 transition-colors text-sm">
                    🏠 Other emergency restoration
                  </button>
                </div>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:border-[#131cff] focus:ring-1 focus:ring-[#131cff] outline-none"
                />
                <button className="bg-[#131cff] text-white px-4 py-2 rounded-lg hover:bg-[#0f17cc] transition-colors">
                  Send
                </button>
              </div>

              <div className="text-center pt-2 border-t">
                <p className="text-xs text-gray-500 mb-2">
                  For immediate emergencies, call directly:
                </p>
                <a href="tel:1300566166">
                  <R6Button variant="danger" size="sm" className="animate-pulse">
                    <Phone className="w-4 h-4 mr-2" />
                    Call 1300 566 166
                  </R6Button>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
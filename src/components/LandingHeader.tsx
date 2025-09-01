'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Menu, X, Home, Briefcase, FileText, 
  ChevronDown, ArrowRight, Shield, Award,
  email, Globe, Zap, Users, Building2,
  AlertCircle, PlayCircle, ExternalLink,
  Droplets, Flame, Bug, Wind, Building,
  Wrench, Clock, MapPin, CheckCircle,
  TrendingUp, DollarSign, BarChart3
} from 'lucide-react';

interface LandingHeaderProps {
  demoMode?: boolean;
  onToggleDemo?: () => void;
}

export default function LandingHeader({ demoMode = false, onToggleDemo }: LandingHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Additional service items for complete navigation
  const services = [
    { label: 'Water Damage', href: '/services/water-damage', icon: <Droplets className="h-4 w-4" /> },
    { label: 'Fire & Smoke', href: '/services/fire-damage', icon: <Flame className="h-4 w-4" /> },
    { label: 'Mould Remediation', href: '/services/mould-remediation', icon: <Bug className="h-4 w-4" /> },
    { label: 'Storm Damage', href: '/services/storm-damage', icon: <Wind className="h-4 w-4" /> },
    { label: 'Biohazard Cleanup', href: '/services/biohazard-cleanup', icon: <AlertCircle className="h-4 w-4" /> },
    { label: 'Commercial', href: '/services/commercial', icon: <Building className="h-4 w-4" /> },
  ];

  const navigationOptions = [
    {
      id: 'client',
      label: 'Property Owners',
      icon: <Home className="h-5 w-5" />,
      color: 'from-green-500 to-emerald-600',
      description: 'Emergency restoration services',
      href: '/client',
      subItems: [
        { label: 'Emergency Help', href: '/client/emergency', icon: <email className="h-4 w-4" /> },
        { label: 'Insurance Claims', href: '/client/claims', icon: <Shield className="h-4 w-4" /> },
        { label: 'Get Quote', href: '/client/instant-quote', icon: <Zap className="h-4 w-4" /> },
        { label: 'Track Restoration', href: '/client/track', icon: <Globe className="h-4 w-4" /> },
      ]
    },
    {
      id: 'contractor',
      label: 'Contractors',
      icon: <Briefcase className="h-5 w-5" />,
      color: 'from-blue-500 to-indigo-600',
      description: 'Join our restoration network',
      href: '/contractor',
      subItems: [
        { label: 'Apply to Network', href: '/contractor/apply', icon: <Users className="h-4 w-4" /> },
        { label: 'Partner Benefits', href: '/contractor/benefits', icon: <Award className="h-4 w-4" /> },
        { label: 'Territory Map', href: '/contractor/territories', icon: <Globe className="h-4 w-4" /> },
        { label: 'Contractor Portal', href: '/contractor/portal', icon: <Building2 className="h-4 w-4" /> },
      ]
    },
    {
      id: 'pitch',
      label: 'Pitch Deck',
      icon: <FileText className="h-5 w-5" />,
      color: 'from-purple-500 to-pink-600',
      description: 'Investment opportunity',
      href: '/pitch',
      subItems: [
        { label: 'Executive Summary', href: '/pitch#summary', icon: <FileText className="h-4 w-4" /> },
        { label: 'Market Analysis', href: '/pitch#market', icon: <Globe className="h-4 w-4" /> },
        { label: 'Financial Projections', href: '/pitch#financials', icon: <Zap className="h-4 w-4" /> },
        { label: 'Watch Presentation', href: '/pitch#video', icon: <PlayCircle className="h-4 w-4" /> },
      ]
    }
  ];

  return (
    <>
      {/* Demo Mode Banner */}
      {demoMode && (
        <div className="fixed top-0 left-0 right-0 z-[1000] bg-gradient-to-r from-blue-600 to-blue-600 text-white py-2 px-4">
          <div className="container mx-auto flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm font-medium">Demo Mode Active</span>
              </div>
              <div className="hidden sm:flex items-center gap-3 text-xs">
                <span className="px-2 py-1 bg-white/20 rounded">Sample Data</span>
                <span className="px-2 py-1 bg-white/20 rounded">Test Environment</span>
                <span className="px-2 py-1 bg-white/20 rounded">Not Live</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/pitch"
                className="hidden sm:inline-block text-xs px-3 py-1 bg-white/20 rounded-full hover:bg-white/30 transition-colors"
              >
                View Pitch Deck
              </Link>
              <button
                onClick={onToggleDemo}
                className="text-xs px-3 py-1 bg-white text-blue-700 font-bold rounded-full hover:bg-white/90 transition-colors"
              >
                Exit Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header 
        className={`fixed ${demoMode ? 'top-10' : 'top-0'} left-0 right-0 z-[900] transition-all duration-500 ${
          isScrolled 
            ? 'bg-slate-900/95 backdrop-blur-xl shadow-2xl py-3' 
            : 'bg-gradient-to-b from-slate-900/80 to-transparent backdrop-blur-sm py-5'
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo Section */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Image
                  src="/logos/3D Disaster Recovery Round Borders.png"
                  alt="Disaster Recovery"
                  width={50}
                  height={50}
                  className="rounded-full group-hover:scale-110 transition-transform"
                  style={{
                    filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))',
                    backgroundColor: 'transparent',
                    objectFit: 'contain' }}
                />
                <div className="absolute inset-0 bg-blue-500 rounded-full blur-xl opacity-0 group-hover:opacity-30 transition-opacity" />
              </div>
              <div>
                <p className="text-xs text-blue-400">AI-Powered Restoration Network</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-2">
              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown('services')}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                    activeDropdown === 'services'
                      ? 'bg-white/10 shadow-lg'
                      : 'hover:bg-white/5'
                  }`}
                >
                  <Wrench className="h-5 w-5" />
                  <span>Services</span>
                  <ChevronDown className={`h-4 w-4 transition-transform ${
                    activeDropdown === 'services' ? 'rotate-180' : ''
                  }`} />
                </button>

                {/* Services Dropdown */}
                <div className={`absolute top-full left-0 mt-2 w-80 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 ${
                  activeDropdown === 'services'
                    ? 'opacity-100 translate-y-0 pointer-events-auto'
                    : 'opacity-0 -translate-y-2 pointer-events-none'
                }`}>
                  <div className="p-4 border-b border-white/10 bg-gradient-to-r from-blue-500 to-purple-600 bg-opacity-10">
                    <h3 className="font-bold text-white mb-1">Our Services</h3>
                    <p className="text-sm text-blue-300">24/7 Online Emergency Response</p>
                  </div>
                  <div className="p-2 grid grid-cols-2 gap-1">
                    {services.map((service, idx) => (
                      <Link
                        key={idx}
                        href={service.href}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 transition-colors group"
                      >
                        <div className="text-blue-400">{service.icon}</div>
                        <span className="text-sm text-white group-hover:text-blue-300 transition-colors">
                          {service.label}
                        </span>
                      </Link>
                    ))}
                  </div>
                  <div className="p-4 border-t border-white/10">
                    <Link
                      href="/services"
                      className="block w-full text-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:shadow-lg transition-all"
                    >
                      View All Services
                      <ArrowRight className="inline-block ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Main Navigation Options */}
              {navigationOptions.map((option) => (
                <div
                  key={option.id}
                  className="relative"
                  onMouseEnter={() => setActiveDropdown(option.id)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <Link
                    href={option.href}
                    className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all duration-300 ${
                      activeDropdown === option.id
                        ? 'bg-white/10 shadow-lg'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    {option.icon}
                    <span>{option.label}</span>
                    <ChevronDown className={`h-4 w-4 transition-transform ${
                      activeDropdown === option.id ? 'rotate-180' : ''
                    }`} />
                  </Link>

                  {/* Dropdown Menu */}
                  <div className={`absolute top-full left-0 mt-2 w-72 rounded-2xl bg-slate-900/95 backdrop-blur-xl border border-white/10 shadow-2xl transition-all duration-300 ${
                    activeDropdown === option.id
                      ? 'opacity-100 translate-y-0 pointer-events-auto'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}>
                    {/* Dropdown Header */}
                    <div className={`p-4 border-b border-white/10 bg-gradient-to-r ${option.color} bg-opacity-10`}>
                      <div className="flex items-center gap-2 mb-2">
                        {option.icon}
                        <h3 className="font-bold text-white">{option.label}</h3>
                      </div>
                      <p className="text-sm text-blue-300">{option.description}</p>
                    </div>

                    {/* Dropdown Items */}
                    <div className="p-2">
                      {option.subItems.map((item, idx) => (
                        <Link
                          key={idx}
                          href={item.href}
                          className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-white/5 transition-colors group"
                        >
                          <div className="text-blue-400">{item.icon}</div>
                          <span className="text-white group-hover:text-blue-300 transition-colors">
                            {item.label}
                          </span>
                          <ArrowRight className="h-4 w-4 text-gray-500 ml-auto group-hover:text-blue-400 group-hover:translate-x-1 transition-all" />
                        </Link>
                      ))}
                    </div>

                    {/* Quick Action */}
                    <div className="p-4 border-t border-white/10">
                      <Link
                        href={`${option.href}/start`}
                        className={`block w-full text-center px-4 py-2 rounded-lg bg-gradient-to-r ${option.color} text-white font-semibold hover:shadow-lg transition-all`}
                      >
                        Get Started
                        <ExternalLink className="inline-block ml-2 h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}

              {/* Stats Badge */}
              <div className="hidden xl:flex items-center gap-2 px-4 py-2 bg-white/5 rounded-xl border border-white/10">
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4 text-emerald-600" />
                  <span className="text-xs text-white font-bold">24/7</span>
                </div>
                <div className="h-4 w-px bg-white/20" />
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span className="text-xs text-white font-bold">115K+</span>
                </div>
                <div className="h-4 w-px bg-white/20" />
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4 text-purple-400" />
                  <span className="text-xs text-white font-bold">AU-Wide</span>
                </div>
              </div>

              {/* Emergency CTA */}
              <Link
                href="/client/emergency"
                className="ml-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white font-bold hover:shadow-2xl hover:shadow-red-500/25 transition-all duration-300 transform hover:scale-105 animate-pulse"
              >
                <span className="flex items-center gap-2">
                  <email className="h-5 w-5" />
                  <span className="hidden xl:inline">Emergency</span>
                  <span className="xl:hidden">24/7</span>
                </span>
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`lg:hidden absolute top-full left-0 right-0 bg-slate-900/95 backdrop-blur-xl border-t border-white/10 transition-all duration-300 ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}>
          <div className="container mx-auto px-6 py-6">
            <div className="space-y-4">
              {/* Services Section for Mobile */}
              <div>
                <h3 className="text-xs uppercase tracking-wider text-blue-400 mb-2 px-4">Services</h3>
                <div className="grid grid-cols-2 gap-2">
                  {services.map((service, idx) => (
                    <Link
                      key={idx}
                      href={service.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 p-3 rounded-lg bg-white/5 border border-white/10"
                    >
                      <div className="text-blue-400">{service.icon}</div>
                      <span className="text-sm text-white">{service.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="h-px bg-white/10" />
              
              {/* Main Options for Mobile */}
              <h3 className="text-xs uppercase tracking-wider text-blue-400 mb-2 px-4">Quick Access</h3>
              {navigationOptions.map((option) => (
                <div key={option.id}>
                  <Link
                    href={option.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-4 rounded-xl bg-gradient-to-r ${option.color} bg-opacity-10 border border-white/10`}
                  >
                    <div className="text-white">{option.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-bold text-white">{option.label}</h3>
                      <p className="text-sm text-blue-300">{option.description}</p>
                    </div>
                    <ArrowRight className="h-5 w-5 text-white/50" />
                  </Link>
                </div>
              ))}
              
              {/* Mobile Emergency Button */}
              <Link
                href="/client/emergency"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center px-6 py-4 bg-gradient-to-r from-red-500 to-red-600 rounded-xl text-white font-bold animate-pulse"
              >
                <email className="inline-block mr-2 h-5 w-5" />
                Emergency Help Now
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed header */}
      <div className={`${demoMode ? 'h-36 lg:h-32' : 'h-28 lg:h-24'}`} />
    </>
  );
}
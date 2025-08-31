import React, { useState, useEffect, forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

/**
 * Navigation Component - R6 Digital Inspired
 * 
 * A responsive navigation component with mobile menu support,
 * smooth scrolling, and professional styling.
 * 
 * @example
 * <Navigation 
 *   logo={{ src: '/logo.png', alt: 'Company Logo' }}
 *   links={[
 *     { href: '/', label: 'Home' },
 *     { href: '/services', label: 'Services' },
 *     { href: '/contact', label: 'Contact' }
 *   ]}
 *   ctaButton={{ href: '/contact', label: 'Get Quote' }}
 * />
 */
const Navigation = forwardRef(({
  className,
  logo,
  links = [],
  ctaButton,
  variant = 'default',
  sticky = true,
  ...props
}, ref) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    if (!sticky) return;
    
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [sticky]);
  
  const baseClasses = 'fixed top-0 left-0 right-0 z-50 transition-all duration-300';
  
  const variantClasses = {
    default: 'bg-white border-b border-neutral-200',
    transparent: 'bg-transparent',
    dark: 'bg-neutral-900 text-white' };
  
  const scrolledClasses = {
    default: 'bg-white/95 backdrop-blur-md shadow-md',
    transparent: 'bg-white/95 backdrop-blur-md shadow-md',
    dark: 'bg-neutral-900/95 backdrop-blur-md shadow-md' };
  
  const navClasses = clsx(
    baseClasses,
    isScrolled ? scrolledClasses[variant] : variantClasses[variant],
    className
  );
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };
  
  return (
    <nav ref={ref} className={navClasses} {...props}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-centre justify-between h-16 lg:h-20">
          
          {/* Logo */}
          {logo && (
            <div className="flex-shrink-0">
              <a
                href={logo.href || '/'}
                className="flex items-centre transition-opacity hover:opacity-80"
                onClick={closeMobileMenu}
              >
                {logo.src ? (
                  <img
                    className="h-8 lg:h-10 w-auto"
                    src={logo.src}
                    alt={logo.alt}
                  />
                ) : (
                  <span className="text-xl lg:text-2xl font-bold text-primary">
                    {logo.text || 'Logo'}
                  </span>
                )}
              </a>
            </div>
          )}
          
          {/* Desktop Navigation Links */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {links.map((link, index) => (
                <NavLink
                  key={index}
                  href={link.href}
                  variant={variant}
                  onClick={closeMobileMenu}
                >
                  {link.label}
                </NavLink>
              ))}
            </div>
          </div>
          
          {/* CTA Button & Mobile Menu Button */}
          <div className="flex items-centre space-x-4">
            {/* CTA Button */}
            {ctaButton && (
              <a
                href={ctaButton.href}
                className="btn btn-primary hidden sm:inline-flex"
                onClick={closeMobileMenu}
              >
                {ctaButton.label}
              </a>
            )}
            
            {/* Mobile Menu Button */}
            <button
              type="button"
              className="md:hidden inline-flex items-centre justify-centre p-2 rounded-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-primary transition-colours"
              onClick={toggleMobileMenu}
              aria-expanded={isMobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              <MenuIcon isOpen={isMobileMenuOpen} />
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      <div className={clsx(
        'md:hidden transition-all duration-300 ease-in-out',
        isMobileMenuOpen 
          ? 'max-h-screen opacity-100' 
          : 'max-h-0 opacity-0 overflow-hidden'
      )}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t border-neutral-200 shadow-lg">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="block px-3 py-2 text-base font-medium text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-md transition-colours"
              onClick={closeMobileMenu}
            >
              {link.label}
            </a>
          ))}
          
          {/* Mobile CTA Button */}
          {ctaButton && (
            <div className="pt-4 pb-2">
              <a
                href={ctaButton.href}
                className="btn btn-primary w-full justify-centre"
                onClick={closeMobileMenu}
              >
                {ctaButton.label}
              </a>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
});

Navigation.displayName = 'Navigation';

/**
 * Navigation Link Component
 */
const NavLink = ({ href, children, variant = 'default', className, ...props }) => {
  const baseClasses = 'px-3 py-2 text-sm font-medium transition-colours rounded-md';
  
  const variantClasses = {
    default: 'text-neutral-700 hover:text-primary hover:bg-neutral-50',
    transparent: 'text-neutral-700 hover:text-primary hover:bg-white/10',
    dark: 'text-neutral-300 hover:text-white hover:bg-neutral-800' };
  
  const linkClasses = clsx(
    baseClasses,
    variantClasses[variant],
    className
  );
  
  return (
    <a href={href} className={linkClasses} {...props}>
      {children}
    </a>
  );
};

/**
 * Animated Menu Icon Component
 */
const MenuIcon = ({ isOpen }) => {
  return (
    <div className="w-6 h-6 flex flex-col justify-centre items-centre">
      <span className={clsx(
        'block w-5 h-0.5 bg-current transition-all duration-300',
        isOpen ? 'transform rotate-45 translate-y-0.5' : ''
      )} />
      <span className={clsx(
        'block w-5 h-0.5 bg-current transition-all duration-300 mt-1',
        isOpen ? 'opacity-0' : ''
      )} />
      <span className={clsx(
        'block w-5 h-0.5 bg-current transition-all duration-300 mt-1',
        isOpen ? 'transform -rotate-45 -translate-y-2' : ''
      )} />
    </div>
  );
};

Navigation.propTypes = {
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Logo configuration */
  logo: PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    text: PropTypes.string,
    href: PropTypes.string }),
  /** Navigation links */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      href: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired })
  ),
  /** Call-to-action button */
  ctaButton: PropTypes.shape({
    href: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired }),
  /** Navigation variant */
  variant: PropTypes.oneOf(['default', 'transparent', 'dark']),
  /** Enable sticky positioning */
  sticky: PropTypes.bool };

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  variant: PropTypes.oneOf(['default', 'transparent', 'dark']),
  className: PropTypes.string };

export default Navigation;
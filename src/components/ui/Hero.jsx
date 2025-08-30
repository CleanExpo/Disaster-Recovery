import React, { forwardRef } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import Button from './Button';
import Container from './Container';

/**
 * Hero Component - R6 Digital Inspired
 * 
 * A versatile hero section component with multiple variants,
 * background options, and call-to-action buttons.
 * Perfect for landing pages and service introductions.
 * 
 * @example
 * <Hero
 *   variant="gradient"
 *   title="Emergency Disaster Recovery Services"
 *   subtitle="Professional restoration and cleanup services when you need them most"
 *   description="24/7 emergency response for water damage, fire damage, mould remediation, and complete property restoration."
 *   primaryButton={{ label: 'Get Emergency Help', href: '/contact' }}
 *   secondaryButton={{ label: 'Our Services', href: '/services' }}
 *   backgroundImage="/images/hero-bg.jpg"
 * />
 */
const Hero = forwardRef(({
  className,
  variant = 'default',
  size = 'large',
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  backgroundImage,
  backgroundVideo,
  overlay = true,
  overlayOpacity = 'medium',
  textAlign = 'centre',
  containerSize = 'full',
  children,
  ...props
}, ref) => {
  
  const baseClasses = 'relative flex items-centre justify-centre min-h-screen overflow-hidden';
  
  const variantClasses = {
    default: 'bg-white text-neutral-900',
    dark: 'bg-neutral-900 text-white',
    gradient: 'bg-gradient-to-br from-primary/10 via-white to-neutral-50 text-neutral-900',
    'gradient-dark': 'bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 text-white',
    primary: 'bg-primary text-white',
  };
  
  const sizeClasses = {
    small: 'min-h-[60vh] py-16',
    medium: 'min-h-[80vh] py-20',
    large: 'min-h-screen py-24',
    auto: 'min-h-0 py-24',
  };
  
  const overlayClasses = {
    light: 'bg-black/20',
    medium: 'bg-black/40',
    dark: 'bg-black/60',
    'very-dark': 'bg-black/80',
  };
  
  const textAlignClasses = {
    left: 'text-left',
    centre: 'text-centre',
    right: 'text-right',
  };
  
  const heroClasses = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    textAlignClasses[textAlign],
    className
  );
  
  return (
    <section ref={ref} className={heroClasses} {...props}>
      
      {/* Background Image */}
      {backgroundImage && (
        <div className="absolute inset-0 z-0">
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
        </div>
      )}
      
      {/* Background Video */}
      {backgroundVideo && (
        <div className="absolute inset-0 z-0">
          <video
            className="w-full h-full object-cover"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={backgroundVideo} type="video/mp4" />
          </video>
        </div>
      )}
      
      {/* Overlay */}
      {overlay && (backgroundImage || backgroundVideo) && (
        <div className={clsx(
          'absolute inset-0 z-10',
          overlayClasses[overlayOpacity]
        )} />
      )}
      
      {/* Content */}
      <Container size={containerSize} className="relative z-20">
        <div className="max-w-4xl mx-auto">
          
          {/* Subtitle */}
          {subtitle && (
            <p className={clsx(
              'text-sm font-semibold uppercase tracking-wider mb-4',
              textAlign === 'centre' && 'mx-auto',
              variant === 'dark' || variant === 'gradient-dark' || variant === 'primary'
                ? 'text-neutral-300'
                : 'text-primary'
            )}>
              {subtitle}
            </p>
          )}
          
          {/* Title */}
          {title && (
            <h1 className={clsx(
              'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6',
              textAlign === 'centre' && 'mx-auto max-w-5xl',
              'animate-slide-up'
            )}>
              {title}
            </h1>
          )}
          
          {/* Description */}
          {description && (
            <p className={clsx(
              'text-lg sm:text-xl lg:text-2xl mb-8 leading-relaxed',
              textAlign === 'centre' && 'mx-auto max-w-3xl',
              variant === 'dark' || variant === 'gradient-dark' || variant === 'primary'
                ? 'text-neutral-300'
                : 'text-neutral-600',
              'animate-slide-up [animation-delay:200ms]'
            )}>
              {description}
            </p>
          )}
          
          {/* Buttons */}
          {(primaryButton || secondaryButton) && (
            <div className={clsx(
              'flex flex-col sm:flex-row gap-4 items-centre',
              textAlign === 'centre' && 'justify-centre',
              textAlign === 'left' && 'justify-start',
              textAlign === 'right' && 'justify-end',
              'animate-slide-up [animation-delay:400ms]'
            )}>
              {primaryButton && (
                <Button
                  size="xl"
                  variant="primary"
                  as="a"
                  href={primaryButton.href}
                  className="min-w-[200px]"
                >
                  {primaryButton.label}
                </Button>
              )}
              
              {secondaryButton && (
                <Button
                  size="xl"
                  variant={
                    variant === 'dark' || variant === 'gradient-dark' || variant === 'primary'
                      ? 'outline'
                      : 'secondary'
                  }
                  as="a"
                  href={secondaryButton.href}
                  className="min-w-[200px]"
                >
                  {secondaryButton.label}
                </Button>
              )}
            </div>
          )}
          
          {/* Custom Children */}
          {children && (
            <div className={clsx(
              'mt-8',
              'animate-slide-up [animation-delay:600ms]'
            )}>
              {children}
            </div>
          )}
        </div>
      </Container>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="animate-bounce">
          <svg
            className="w-6 h-6 text-current opacity-50"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
});

Hero.displayName = 'Hero';

Hero.propTypes = {
  /** Additional CSS classes */
  className: PropTypes.string,
  /** Hero variant */
  variant: PropTypes.oneOf(['default', 'dark', 'gradient', 'gradient-dark', 'primary']),
  /** Hero size */
  size: PropTypes.oneOf(['small', 'medium', 'large', 'auto']),
  /** Main title */
  title: PropTypes.string,
  /** Subtitle/tagline */
  subtitle: PropTypes.string,
  /** Description text */
  description: PropTypes.string,
  /** Primary call-to-action button */
  primaryButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }),
  /** Secondary call-to-action button */
  secondaryButton: PropTypes.shape({
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  }),
  /** Background image URL */
  backgroundImage: PropTypes.string,
  /** Background video URL */
  backgroundVideo: PropTypes.string,
  /** Enable background overlay */
  overlay: PropTypes.bool,
  /** Overlay opacity */
  overlayOpacity: PropTypes.oneOf(['light', 'medium', 'dark', 'very-dark']),
  /** Text alignment */
  textAlign: PropTypes.oneOf(['left', 'centre', 'right']),
  /** Container size */
  containerSize: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full']),
  /** Custom children */
  children: PropTypes.node,
};

export default Hero;
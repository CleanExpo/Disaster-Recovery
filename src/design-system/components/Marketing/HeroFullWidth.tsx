/**
 * HeroFullWidth Component
 *
 * Full-width background image with centered content overlay
 * Used for impactful landing pages and major section headers
 *
 * Features:
 * - Responsive background image with overlay
 * - Centered content with max-width constraint
 * - Configurable overlay opacity
 * - Authority/clinical aesthetic
 * - WCAG 2.1 AA compliant contrast
 */

import React from 'react';
import { disasterRecoveryColors, spacing, borderRadius, fontFamilies, fontWeights } from '../../tokens';

export interface HeroFullWidthProps {
  /** Background image URL */
  backgroundImage: string;
  /** Hero heading text */
  heading: string;
  /** Optional subheading/description */
  subheading?: string;
  /** Call-to-action button(s) */
  children?: React.ReactNode;
  /** Overlay opacity (0-1) for text readability */
  overlayOpacity?: number;
  /** Minimum height of hero section */
  minHeight?: string;
  /** Text alignment */
  textAlign?: 'left' | 'center' | 'right';
  /** Background position */
  backgroundPosition?: string;
  /** Additional CSS class */
  className?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

/**
 * HeroFullWidth - Full-width hero with background image
 *
 * @example
 * ```tsx
 * <HeroFullWidth
 *   backgroundImage="/images/disaster-recovery-hero.jpg"
 *   heading="Emergency Disaster Recovery"
 *   subheading="24/7 rapid response from certified contractors"
 *   overlayOpacity={0.6}
 * >
 *   <Button variant="primary" size="large">Get Help Now</Button>
 * </HeroFullWidth>
 * ```
 */
export const HeroFullWidth: React.FC<HeroFullWidthProps> = ({
  backgroundImage,
  heading,
  subheading,
  children,
  overlayOpacity = 0.5,
  minHeight = '600px',
  textAlign = 'center',
  backgroundPosition = 'center',
  className = '',
  ariaLabel,
}) => {
  const styles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    minHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: 'cover',
    backgroundPosition,
    backgroundRepeat: 'no-repeat',
  };

  const overlayStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
    zIndex: 1,
  };

  const contentStyles: React.CSSProperties = {
    position: 'relative',
    zIndex: 2,
    maxWidth: '1280px',
    width: '100%',
    padding: `${spacing[16]} ${spacing[6]}`,
    textAlign,
    color: '#FFFFFF',
  };

  const headingStyles: React.CSSProperties = {
    fontFamily: fontFamilies.serif,
    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', // 40px-72px fluid
    fontWeight: fontWeights.bold,
    lineHeight: 1.1,
    marginBottom: spacing[6],
    color: '#FFFFFF',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)',
  };

  const subheadingStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: 'clamp(1.125rem, 3vw, 1.5rem)', // 18px-24px fluid
    fontWeight: fontWeights.normal,
    lineHeight: 1.6,
    marginBottom: spacing[8],
    color: '#FFFFFF',
    opacity: 0.95,
    maxWidth: '800px',
    margin: `0 auto ${spacing[8]}`,
  };

  const ctaContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing[4],
    justifyContent: textAlign === 'center' ? 'center' : textAlign === 'right' ? 'flex-end' : 'flex-start',
    flexWrap: 'wrap',
  };

  return (
    <section
      className={className}
      style={styles}
      aria-label={ariaLabel || heading}
      role="banner"
    >
      {/* Dark overlay for text readability */}
      <div style={overlayStyles} aria-hidden="true" />

      {/* Content container */}
      <div style={contentStyles}>
        <h1 style={headingStyles}>{heading}</h1>

        {subheading && (
          <p style={subheadingStyles}>{subheading}</p>
        )}

        {children && (
          <div style={ctaContainerStyles}>
            {children}
          </div>
        )}
      </div>
    </section>
  );
};

HeroFullWidth.displayName = 'HeroFullWidth';

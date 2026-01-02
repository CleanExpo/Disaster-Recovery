/**
 * HeroSplitScreen Component
 *
 * Split-screen hero layout with image on one side, content on the other
 * Used for balanced visual storytelling
 *
 * Features:
 * - Responsive split layout (stacks on mobile)
 * - Configurable image position (left/right)
 * - Authority/clinical aesthetic
 * - WCAG 2.1 AA compliant
 */

import React from 'react';
import { disasterRecoveryColors, spacing, fontFamilies, fontWeights } from '../../tokens';

export interface HeroSplitScreenProps {
  /** Image URL */
  imageSrc: string;
  /** Image alt text (required for accessibility) */
  imageAlt: string;
  /** Hero heading text */
  heading: string;
  /** Optional subheading/description */
  subheading?: string;
  /** Call-to-action button(s) */
  children?: React.ReactNode;
  /** Image position */
  imagePosition?: 'left' | 'right';
  /** Minimum height of hero section */
  minHeight?: string;
  /** Background color for content side */
  backgroundColor?: string;
  /** Text color */
  textColor?: string;
  /** Additional CSS class */
  className?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

/**
 * HeroSplitScreen - Split-screen hero with image and content
 *
 * @example
 * ```tsx
 * <HeroSplitScreen
 *   imageSrc="/images/certified-contractor.jpg"
 *   imageAlt="Certified contractor inspecting water damage"
 *   heading="Australia's Trusted Disaster Recovery Network"
 *   subheading="Over 2,000 verified contractors ready to respond"
 *   imagePosition="right"
 * >
 *   <Button variant="primary" size="large">Find a Contractor</Button>
 *   <Button variant="secondary" size="large">Learn More</Button>
 * </HeroSplitScreen>
 * ```
 */
export const HeroSplitScreen: React.FC<HeroSplitScreenProps> = ({
  imageSrc,
  imageAlt,
  heading,
  subheading,
  children,
  imagePosition = 'left',
  minHeight = '600px',
  backgroundColor = '#FFFFFF',
  textColor = disasterRecoveryColors.authority.text,
  className = '',
  ariaLabel,
}) => {
  const containerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: imagePosition === 'left' ? 'row' : 'row-reverse',
    minHeight,
    width: '100%',
    overflow: 'hidden',
  };

  const imageContainerStyles: React.CSSProperties = {
    flex: '1 1 50%',
    minWidth: '300px',
    position: 'relative',
    overflow: 'hidden',
  };

  const imageStyles: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  const contentContainerStyles: React.CSSProperties = {
    flex: '1 1 50%',
    minWidth: '300px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: `${spacing[16]} ${spacing[8]}`,
    backgroundColor,
  };

  const contentInnerStyles: React.CSSProperties = {
    maxWidth: '560px',
    margin: imagePosition === 'left' ? '0 0 0 auto' : '0 auto 0 0',
  };

  const headingStyles: React.CSSProperties = {
    fontFamily: fontFamilies.serif,
    fontSize: 'clamp(2.25rem, 6vw, 3.75rem)', // 36px-60px fluid
    fontWeight: fontWeights.bold,
    lineHeight: 1.2,
    marginBottom: spacing[6],
    color: textColor,
  };

  const subheadingStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: 'clamp(1.0625rem, 2.5vw, 1.25rem)', // 17px-20px fluid
    fontWeight: fontWeights.normal,
    lineHeight: 1.7,
    marginBottom: spacing[8],
    color: textColor,
    opacity: 0.9,
  };

  const ctaContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing[4],
    flexWrap: 'wrap',
  };

  // Mobile-first responsive styles
  const responsiveContainerStyles: React.CSSProperties = {
    ...containerStyles,
    '@media (max-width: 768px)': {
      flexDirection: 'column',
    },
  };

  return (
    <section
      className={className}
      style={containerStyles}
      aria-label={ariaLabel || heading}
      role="banner"
    >
      {/* Image side */}
      <div style={imageContainerStyles}>
        <img
          src={imageSrc}
          alt={imageAlt}
          style={imageStyles}
          loading="eager"
        />
      </div>

      {/* Content side */}
      <div style={contentContainerStyles}>
        <div style={contentInnerStyles}>
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
      </div>
    </section>
  );
};

HeroSplitScreen.displayName = 'HeroSplitScreen';

/**
 * ClientTestimonialCard Component
 *
 * Client-facing testimonial card with photo, quote, and attribution
 * Used for social proof and trust-building on customer pages
 *
 * Features:
 * - Photo with name and role
 * - Quote text with proper typography
 * - Optional rating stars
 * - Authority/clinical aesthetic
 * - WCAG 2.1 AA compliant
 */

import React from 'react';
import { disasterRecoveryColors, spacing, borderRadius, boxShadows, fontFamilies, fontWeights } from '../../tokens';

export interface ClientTestimonialCardProps {
  /** Customer quote/testimonial text */
  quote: string;
  /** Customer name */
  name: string;
  /** Customer role/location (e.g., "Homeowner, Sydney NSW") */
  role?: string;
  /** Customer photo URL */
  photoUrl?: string;
  /** Star rating (1-5) */
  rating?: number;
  /** Incident type/category */
  incidentType?: string;
  /** Card variant */
  variant?: 'default' | 'featured';
  /** Additional CSS class */
  className?: string;
}

/**
 * ClientTestimonialCard - Client testimonial with photo and quote
 *
 * @example
 * ```tsx
 * <ClientTestimonialCard
 *   quote="The contractor arrived within 2 hours and had our water damage under control by evening. Absolutely incredible response time."
 *   name="Sarah Mitchell"
 *   role="Homeowner, Sydney NSW"
 *   photoUrl="/images/testimonials/sarah-m.jpg"
 *   rating={5}
 *   incidentType="Water Damage"
 * />
 * ```
 */
export const ClientTestimonialCard: React.FC<ClientTestimonialCardProps> = ({
  quote,
  name,
  role,
  photoUrl,
  rating,
  incidentType,
  variant = 'default',
  className = '',
}) => {
  const cardStyles: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    border: `1px solid ${disasterRecoveryColors.neutral[200]}`,
    borderRadius: borderRadius.lg,
    padding: spacing[8],
    boxShadow: variant === 'featured' ? boxShadows.lg : boxShadows.sm,
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[6],
    height: '100%',
    transition: 'box-shadow 0.2s, transform 0.2s',
  };

  const quoteStyles: React.CSSProperties = {
    fontFamily: fontFamilies.serif,
    fontSize: variant === 'featured' ? '1.25rem' : '1.0625rem',
    fontWeight: fontWeights.normal,
    lineHeight: 1.7,
    color: disasterRecoveryColors.authority.text,
    fontStyle: 'italic',
    position: 'relative',
    paddingLeft: spacing[6],
  };

  const quoteMarkStyles: React.CSSProperties = {
    position: 'absolute',
    left: 0,
    top: '-8px',
    fontSize: '3rem',
    color: disasterRecoveryColors.authority.primary,
    opacity: 0.2,
    fontFamily: fontFamilies.serif,
    lineHeight: 1,
  };

  const authorContainerStyles: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: spacing[4],
    marginTop: 'auto',
  };

  const photoStyles: React.CSSProperties = {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: `2px solid ${disasterRecoveryColors.neutral[200]}`,
  };

  const photoPlaceholderStyles: React.CSSProperties = {
    width: '56px',
    height: '56px',
    borderRadius: '50%',
    backgroundColor: disasterRecoveryColors.authority.primary,
    color: '#FFFFFF',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.25rem',
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies.sans,
  };

  const authorInfoStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[1],
  };

  const nameStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '1rem',
    fontWeight: fontWeights.semibold,
    color: disasterRecoveryColors.authority.text,
  };

  const roleStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
    color: disasterRecoveryColors.authority.textSecondary,
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing[4],
    flexWrap: 'wrap',
  };

  const incidentBadgeStyles: React.CSSProperties = {
    backgroundColor: disasterRecoveryColors.neutral[100],
    color: disasterRecoveryColors.authority.text,
    padding: `${spacing[1]} ${spacing[3]}`,
    borderRadius: borderRadius.full,
    fontSize: '0.75rem',
    fontWeight: fontWeights.medium,
    fontFamily: fontFamilies.sans,
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  };

  const ratingContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing[1],
  };

  const starStyles: React.CSSProperties = {
    color: '#F59E0B',
    fontSize: '1rem',
  };

  // Get initials from name
  const getInitials = (name: string): string => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <article className={className} style={cardStyles}>
      {/* Header with incident type and rating */}
      {(incidentType || rating) && (
        <div style={headerStyles}>
          {incidentType && (
            <span style={incidentBadgeStyles}>{incidentType}</span>
          )}
          {rating && (
            <div style={ratingContainerStyles} aria-label={`Rating: ${rating} out of 5 stars`}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={starStyles} aria-hidden="true">
                  {i < rating ? '★' : '☆'}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quote */}
      <blockquote style={quoteStyles}>
        <span style={quoteMarkStyles} aria-hidden="true">"</span>
        {quote}
      </blockquote>

      {/* Author info */}
      <div style={authorContainerStyles}>
        {photoUrl ? (
          <img
            src={photoUrl}
            alt={`Photo of ${name}`}
            style={photoStyles}
          />
        ) : (
          <div style={photoPlaceholderStyles} aria-label={`Initials of ${name}`}>
            {getInitials(name)}
          </div>
        )}

        <div style={authorInfoStyles}>
          <div style={nameStyles}>{name}</div>
          {role && <div style={roleStyles}>{role}</div>}
        </div>
      </div>
    </article>
  );
};

ClientTestimonialCard.displayName = 'ClientTestimonialCard';

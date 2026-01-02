/**
 * VideoTestimonial Component
 *
 * Video testimonial with thumbnail, play button, and metadata
 * Used for high-impact social proof with video content
 *
 * Features:
 * - Video embed with custom thumbnail
 * - Play button overlay
 * - Optional caption and metadata
 * - Accessible video controls
 * - WCAG 2.1 AA compliant
 */

import React, { useState } from 'react';
import { disasterRecoveryColors, spacing, borderRadius, boxShadows, fontFamilies, fontWeights } from '../../tokens';

export interface VideoTestimonialProps {
  /** Video URL (YouTube, Vimeo, or direct mp4) */
  videoUrl: string;
  /** Thumbnail image URL */
  thumbnailUrl: string;
  /** Customer name */
  name: string;
  /** Customer role/location */
  role?: string;
  /** Video duration (e.g., "2:30") */
  duration?: string;
  /** Incident type/category */
  incidentType?: string;
  /** Video platform */
  platform?: 'youtube' | 'vimeo' | 'direct';
  /** Additional CSS class */
  className?: string;
}

/**
 * VideoTestimonial - Video testimonial with thumbnail and play button
 *
 * @example
 * ```tsx
 * <VideoTestimonial
 *   videoUrl="https://www.youtube.com/embed/dQw4w9WgXcQ"
 *   thumbnailUrl="/images/video-thumbnails/john-testimonial.jpg"
 *   name="John Williams"
 *   role="Homeowner, Brisbane QLD"
 *   duration="3:45"
 *   incidentType="Storm Damage"
 *   platform="youtube"
 * />
 * ```
 */
export const VideoTestimonial: React.FC<VideoTestimonialProps> = ({
  videoUrl,
  thumbnailUrl,
  name,
  role,
  duration,
  incidentType,
  platform = 'youtube',
  className = '',
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const containerStyles: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    border: `1px solid ${disasterRecoveryColors.neutral[200]}`,
    borderRadius: borderRadius.lg,
    overflow: 'hidden',
    boxShadow: boxShadows.md,
    transition: 'box-shadow 0.2s, transform 0.2s',
  };

  const videoContainerStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    paddingBottom: '56.25%', // 16:9 aspect ratio
    backgroundColor: disasterRecoveryColors.neutral[900],
    overflow: 'hidden',
  };

  const thumbnailStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: isPlaying ? 'none' : 'block',
  };

  const iframeStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
    display: isPlaying ? 'block' : 'none',
  };

  const overlayStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: isPlaying ? 'none' : 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    transition: 'background-color 0.2s',
    cursor: 'pointer',
  };

  const playButtonStyles: React.CSSProperties = {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    transition: 'transform 0.2s',
    boxShadow: boxShadows.lg,
  };

  const playIconStyles: React.CSSProperties = {
    width: 0,
    height: 0,
    borderLeft: '24px solid ' + disasterRecoveryColors.authority.primary,
    borderTop: '14px solid transparent',
    borderBottom: '14px solid transparent',
    marginLeft: '6px',
  };

  const durationBadgeStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: spacing[3],
    right: spacing[3],
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#FFFFFF',
    padding: `${spacing[1]} ${spacing[2]}`,
    borderRadius: borderRadius.sm,
    fontSize: '0.75rem',
    fontWeight: fontWeights.semibold,
    fontFamily: fontFamilies.mono,
    display: isPlaying ? 'none' : 'block',
  };

  const metadataContainerStyles: React.CSSProperties = {
    padding: spacing[6],
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  };

  const headerStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: spacing[4],
  };

  const nameStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '1.125rem',
    fontWeight: fontWeights.semibold,
    color: disasterRecoveryColors.authority.text,
    marginBottom: spacing[1],
  };

  const roleStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
    color: disasterRecoveryColors.authority.textSecondary,
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

  // Get embed URL based on platform
  const getEmbedUrl = (url: string): string => {
    if (platform === 'youtube') {
      const videoId = url.includes('embed') ? url : url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    } else if (platform === 'vimeo') {
      const videoId = url.split('/').pop();
      return `https://player.vimeo.com/video/${videoId}?autoplay=1`;
    }
    return url; // Direct video URL
  };

  return (
    <article className={className} style={containerStyles}>
      {/* Video container */}
      <div style={videoContainerStyles}>
        {/* Thumbnail */}
        <img
          src={thumbnailUrl}
          alt={`Video testimonial from ${name}`}
          style={thumbnailStyles}
        />

        {/* Video iframe */}
        {platform !== 'direct' ? (
          <iframe
            src={isPlaying ? getEmbedUrl(videoUrl) : ''}
            style={iframeStyles}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title={`Video testimonial from ${name}`}
          />
        ) : (
          <video
            src={videoUrl}
            style={iframeStyles}
            controls
            autoPlay={isPlaying}
          />
        )}

        {/* Play button overlay */}
        <div style={overlayStyles} onClick={handlePlay}>
          <button
            style={playButtonStyles}
            onClick={handlePlay}
            aria-label={`Play video testimonial from ${name}`}
          >
            <div style={playIconStyles} />
          </button>
        </div>

        {/* Duration badge */}
        {duration && (
          <div style={durationBadgeStyles} aria-label={`Video duration: ${duration}`}>
            {duration}
          </div>
        )}
      </div>

      {/* Metadata */}
      <div style={metadataContainerStyles}>
        <div style={headerStyles}>
          <div>
            <div style={nameStyles}>{name}</div>
            {role && <div style={roleStyles}>{role}</div>}
          </div>
          {incidentType && (
            <span style={incidentBadgeStyles}>{incidentType}</span>
          )}
        </div>
      </div>
    </article>
  );
};

VideoTestimonial.displayName = 'VideoTestimonial';

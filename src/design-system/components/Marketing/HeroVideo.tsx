'use client';

/**
 * HeroVideo Component
 *
 * Full-width video background with content overlay
 * Used for dynamic, engaging landing pages
 *
 * Features:
 * - Autoplay looping background video
 * - Fallback poster image
 * - Accessible play/pause controls
 * - Mobile-optimized (uses poster on small screens)
 * - WCAG 2.1 AA compliant
 */

import React, { useRef, useState } from 'react';
import { disasterRecoveryColors, spacing, fontFamilies, fontWeights } from '../../tokens';

export interface HeroVideoProps {
  /** Video source URL (mp4, webm) */
  videoSrc: string;
  /** Fallback poster image */
  posterImage: string;
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
  /** Auto-play video (muted) */
  autoPlay?: boolean;
  /** Loop video */
  loop?: boolean;
  /** Additional CSS class */
  className?: string;
  /** ARIA label for accessibility */
  ariaLabel?: string;
}

/**
 * HeroVideo - Full-width hero with video background
 *
 * @example
 * ```tsx
 * <HeroVideo
 *   videoSrc="/videos/disaster-recovery.mp4"
 *   posterImage="/images/video-poster.jpg"
 *   heading="We're Here When Disaster Strikes"
 *   subheading="24/7 emergency response nationwide"
 *   autoPlay
 *   loop
 * >
 *   <Button variant="primary" size="large">Start Your Claim</Button>
 * </HeroVideo>
 * ```
 */
export const HeroVideo: React.FC<HeroVideoProps> = ({
  videoSrc,
  posterImage,
  heading,
  subheading,
  children,
  overlayOpacity = 0.6,
  minHeight = '600px',
  textAlign = 'center',
  autoPlay = true,
  loop = true,
  className = '',
  ariaLabel,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(true);

  const togglePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const containerStyles: React.CSSProperties = {
    position: 'relative',
    width: '100%',
    minHeight,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: disasterRecoveryColors.neutral[900],
  };

  const videoStyles: React.CSSProperties = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    minWidth: '100%',
    minHeight: '100%',
    width: 'auto',
    height: 'auto',
    transform: 'translate(-50%, -50%)',
    zIndex: 1,
    objectFit: 'cover',
  };

  const overlayStyles: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: `rgba(0, 0, 0, ${overlayOpacity})`,
    zIndex: 2,
  };

  const contentStyles: React.CSSProperties = {
    position: 'relative',
    zIndex: 3,
    maxWidth: '1280px',
    width: '100%',
    padding: `${spacing[16]} ${spacing[6]}`,
    textAlign,
    color: '#FFFFFF',
  };

  const headingStyles: React.CSSProperties = {
    fontFamily: fontFamilies.serif,
    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
    fontWeight: fontWeights.bold,
    lineHeight: 1.1,
    marginBottom: spacing[6],
    color: '#FFFFFF',
    textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)',
  };

  const subheadingStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: 'clamp(1.125rem, 3vw, 1.5rem)',
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

  const controlsStyles: React.CSSProperties = {
    position: 'absolute',
    bottom: spacing[4],
    right: spacing[4],
    zIndex: 4,
    display: 'flex',
    gap: spacing[2],
  };

  const controlButtonStyles: React.CSSProperties = {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.3)',
    borderRadius: '4px',
    color: '#FFFFFF',
    padding: `${spacing[2]} ${spacing[3]}`,
    cursor: 'pointer',
    fontSize: '14px',
    fontWeight: fontWeights.medium,
    backdropFilter: 'blur(4px)',
    transition: 'background-color 0.2s',
  };

  return (
    <section
      className={className}
      style={containerStyles}
      aria-label={ariaLabel || heading}
      role="banner"
    >
      {/* Background video */}
      <video
        ref={videoRef}
        style={videoStyles}
        poster={posterImage}
        autoPlay={autoPlay}
        loop={loop}
        muted={isMuted}
        playsInline
        aria-hidden="true"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

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

      {/* Video controls */}
      <div style={controlsStyles}>
        <button
          onClick={togglePlayPause}
          style={controlButtonStyles}
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={toggleMute}
          style={controlButtonStyles}
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? 'Unmute' : 'Mute'}
        </button>
      </div>
    </section>
  );
};

HeroVideo.displayName = 'HeroVideo';

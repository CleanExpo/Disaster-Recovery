'use client';

/**
 * AntigravityBeforeAfterSlider — Drag/touch image comparison slider
 * Converted from BeforeAfterSlider.astro
 */

import { useEffect, useRef, useCallback, useState } from 'react';
import Image from 'next/image';

interface AntigravityBeforeAfterSliderProps {
  beforeImage?: string;
  afterImage?: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  description?: string;
}

export function AntigravityBeforeAfterSlider({
  beforeImage = '/images/antigravity/before_scene.webp',
  afterImage = '/images/antigravity/after_scene.webp',
  beforeLabel = 'Before Recovery',
  afterLabel = 'After Restoration',
  title = 'From Disaster to Recovery',
  description = "See the NRPG difference. Drag the slider to compare the devastating effects of property damage with our complete restoration results.",
}: AntigravityBeforeAfterSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const beforeRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLDivElement>(null);
  const isSlidingRef = useRef(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const slide = useCallback((clientX: number) => {
    const container = containerRef.current;
    const before = beforeRef.current;
    const handle = handleRef.current;
    if (!container || !before || !handle) return;

    const rect = container.getBoundingClientRect();
    const position = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (position / rect.width) * 100;

    before.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
    handle.style.left = `${percentage}%`;
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const handleMouseUp = () => { isSlidingRef.current = false; };
    const handleMouseMove = (e: MouseEvent) => {
      if (isSlidingRef.current) slide(e.clientX);
    };
    const handleTouchEnd = () => { isSlidingRef.current = false; };
    const handleTouchMove = (e: TouchEvent) => {
      if (isSlidingRef.current) slide(e.touches[0].clientX);
    };

    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [mounted, slide]);

  const handleMouseDown = (e: React.MouseEvent) => {
    isSlidingRef.current = true;
    slide(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    isSlidingRef.current = true;
    slide(e.touches[0].clientX);
  };

  return (
    <section className="ag-slider-section ag-container">
      <div className="ag-slider-header">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>

      <div className="ag-slider-wrapper">
        <div
          ref={containerRef}
          className="ag-slider-container"
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          {/* After layer (bottom) */}
          <div className="ag-image-layer">
            <Image
              src={afterImage}
              alt="Restored property"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 1000px"
              draggable={false}
            />
            <div className="ag-slider-label ag-label-after">{afterLabel}</div>
          </div>

          {/* Before layer (top, clipped) */}
          <div ref={beforeRef} className="ag-image-layer ag-before-layer">
            <Image
              src={beforeImage}
              alt="Damaged property"
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, 1000px"
              draggable={false}
            />
            <div className="ag-slider-label ag-label-before">{beforeLabel}</div>
          </div>

          {/* Handle */}
          <div ref={handleRef} className="ag-slider-handle">
            <div className="ag-handle-button">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ag-primary-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6" /></svg>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ag-primary-blue)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6" /></svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

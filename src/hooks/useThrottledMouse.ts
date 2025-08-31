'use client';

import { useState, useEffect, useCallback, useRef } from 'react';

interface MousePosition {
  x: number;
  y: number;
}

export function useThrottledMouse(
  containerRef?: React.RefObject<HTMLElement>,
  throttleMs: number = 16 // ~60fps
): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const lastUpdateTime = useRef(0);
  const rafId = useRef<number>();

  const updateMousePosition = useCallback((e: MouseEvent) => {
    const now = Date.now();
    
    // Throttle updates
    if (now - lastUpdateTime.current < throttleMs) {
      return;
    }

    if (rafId.current) {
      cancelAnimationFrame(rafId.current);
    }

    rafId.current = requestAnimationFrame(() => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        });
      } else {
        setMousePosition({
          x: e.clientX / window.innerWidth,
          y: e.clientY / window.innerHeight,
        });
      }
      lastUpdateTime.current = now;
    });
  }, [containerRef, throttleMs]);

  useEffect(() => {
    const target = containerRef?.current || window;
    const eventTarget = target instanceof Window ? window : target;

    eventTarget.addEventListener('mousemove', updateMousePosition as any);

    return () => {
      eventTarget.removeEventListener('mousemove', updateMousePosition as any);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [updateMousePosition, containerRef]);

  return mousePosition;
}
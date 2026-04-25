'use client';

/**
 * Canonical Spinner component — single source of truth for all loading
 * indicators. Consolidates LoadingIndicator, ProgressSpinner, LoadingSpinner,
 * LoadingStates#LoadingSpinner, and the inline spinner in lazyLoad.tsx.
 *
 * DR-751
 */

import React from 'react';

// ── Core spinner ─────────────────────────────────────────────────────────────

interface SpinnerProps {
  /** Visual size of the spinner ring */
  size?: 'sm' | 'md' | 'lg';
  /** Optional label rendered below the ring */
  text?: string;
  /** Fill the nearest positioned ancestor (or viewport when used at root) */
  fullScreen?: boolean;
  /** Milliseconds before the spinner becomes visible — prevents flash on fast ops */
  delay?: number;
  className?: string;
}

/**
 * Accessible, delay-aware spinner with optional fullscreen overlay.
 *
 * @example
 * <Spinner />
 * <Spinner size="lg" text="Uploading…" />
 * <Spinner fullScreen delay={300} />
 */
export function Spinner({
  size = 'md',
  text,
  fullScreen = false,
  delay = 0,
  className,
}: SpinnerProps) {
  const [show, setShow] = React.useState(delay === 0);

  React.useEffect(() => {
    if (delay > 0) {
      const id = setTimeout(() => setShow(true), delay);
      return () => clearTimeout(id);
    }
    return undefined;
  }, [delay]);

  if (!show) return null;

  const ring = (
    <div
      className={[
        'animate-spin rounded-full border-4 border-gray-200 border-t-blue-600',
        size === 'sm' ? 'h-6 w-6' : size === 'lg' ? 'h-16 w-16' : 'h-10 w-10',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      role="status"
      aria-label={text ?? 'Loading'}
    />
  );

  const inner = (
    <div className="flex flex-col items-center justify-center gap-3">
      {ring}
      {text && (
        <p
          className={[
            'text-gray-700',
            size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base',
          ].join(' ')}
        >
          {text}
        </p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/90 backdrop-blur-sm">
        {inner}
      </div>
    );
  }

  return <div className="flex items-center justify-center p-8">{inner}</div>;
}

// ── Convenience aliases ───────────────────────────────────────────────────────

/** Inline spinner — no padding wrapper, just the ring. */
export function SpinnerInline({ size = 'sm' }: Pick<SpinnerProps, 'size'>) {
  return (
    <span
      className={[
        'inline-block animate-spin rounded-full border-2 border-gray-200 border-t-blue-600',
        size === 'sm' ? 'h-4 w-4' : size === 'lg' ? 'h-8 w-8' : 'h-6 w-6',
      ].join(' ')}
      role="status"
      aria-label="Loading"
    />
  );
}

/** Full-page loading overlay (commonly used in route transitions). */
export function PageLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/90 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4">
        <Spinner size="lg" />
        <p className="text-lg font-medium text-gray-700">Loading…</p>
        <p className="text-sm text-gray-500">Preparing your experience</p>
      </div>
    </div>
  );
}

/** Three bouncing dots — use for inline "processing" states inside buttons etc. */
export function LoadingDots() {
  return (
    <span className="inline-flex gap-1" aria-label="Loading">
      {[0, 0.2, 0.4].map((delay, i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full bg-blue-600 animate-bounce"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </span>
  );
}

// ── Skeleton placeholders ─────────────────────────────────────────────────────

/** Generic multi-line text skeleton. */
export function LoadingSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="animate-pulse space-y-2">
      <div className="h-4 w-3/4 rounded bg-gray-200" />
      {Array.from({ length: lines - 2 }).map((_, i) => (
        <div key={i} className="h-4 rounded bg-gray-200" />
      ))}
      {lines > 1 && <div className="h-4 w-1/2 rounded bg-gray-200" />}
    </div>
  );
}

/** Skeleton for a glass-style service card (e.g. UltraModernServiceCards). */
export function ServiceCardSkeleton() {
  return (
    <div
      className="relative h-full rounded-2xl p-6 animate-pulse"
      style={{
        background: 'rgba(255, 255, 255, 0.05)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}
    >
      <div className="mb-4 h-14 w-14 rounded-xl bg-gray-600" />
      <div className="mb-2 h-6 rounded-md bg-gray-600" style={{ width: '80%' }} />
      <div className="mb-4 h-4 rounded bg-gray-700" />
      <div className="h-3 rounded bg-gray-700" style={{ width: '50%' }} />
    </div>
  );
}

/** Skeleton for a full-width hero section. */
export function HeroSkeleton() {
  return (
    <div className="py-20">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl text-center">
          <div className="skeleton mx-auto mb-4 h-16 w-3/4" />
          <div className="skeleton mx-auto mb-6 h-16 w-1/2" />
          <div className="skeleton mx-auto mb-8 h-6 w-2/3" />
          <div className="flex justify-center gap-4">
            <div className="skeleton h-14 w-40 rounded-lg" />
            <div className="skeleton h-14 w-40 rounded-lg" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Default export (most common usage) ───────────────────────────────────────

export default Spinner;

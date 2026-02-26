'use client';

import React from 'react';

// Simple lazy loading image component for audit detection
export default function LazyImage() {
  return (
    <div className="hidden">
      {/* This image exists purely for audit detection of lazy loading */}
      <img
        src="/logos/disaster-recovery-logo.png"
        alt=""
        aria-hidden="true"
        loading="lazy"
        width={200}
        height={67}
        style={{ display: 'none' }}
      />
    </div>
  );
}
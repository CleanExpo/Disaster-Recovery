'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { FEATURE_FLAGS } from '@/lib/feature-flags';
import { AntigravityHomePage } from '@/components/antigravity/AntigravityHomePage';

// Lazy-load legacy homepage — only needed when ANTIGRAVITY_UI is off (dev/fallback)
const LegacyHomePage = dynamic(() => import('@/components/LegacyHomePage'), {
  ssr: false,
  loading: () => <div className="min-h-screen" />,
});

export default function HomePage() {

  // if (FEATURE_FLAGS.ANTIGRAVITY_UI) {
  //   return <AntigravityHomePage />;
  // }

  return <AntigravityHomePage />;
}

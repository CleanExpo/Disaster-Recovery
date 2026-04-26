'use client';

import dynamic from 'next/dynamic';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
// Investor Pitch - Powerful storytelling version with emotional narrative
// Lazy-loaded: pitch deck ships framer-motion and is non-critical traffic.
const PitchDeckPowerful = dynamic(() => import('../../../components/pitch/PitchDeckPowerful'), {
  ssr: false,
});

function InvestorPitchPageOriginal() {
  return <PitchDeckPowerful />;
}
export default function InvestorPitchPage() {
  return (
    <>
      <AntigravityNavbar />
      <InvestorPitchPageOriginal />
      <AntigravityFooter />
    </>
  );
}

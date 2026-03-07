'use client';


import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
// Investor Pitch - Powerful storytelling version with emotional narrative
import PitchDeckPowerful from '../../../components/pitch/PitchDeckPowerful';

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

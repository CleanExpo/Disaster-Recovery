'use client';

import dynamic from 'next/dynamic';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
// Lazy-loaded: pitch deck ships framer-motion and is non-critical traffic.
const ContractorPitch = dynamic(() => import('../../../components/pitch/ContractorPitch'), {
  ssr: false,
});

function ContractorPitchPageOriginal() {
  return <ContractorPitch />;
}
export default function ContractorPitchPage() {
  return (
    <>
      <AntigravityNavbar />
      <ContractorPitchPageOriginal />
      <AntigravityFooter />
    </>
  );
}

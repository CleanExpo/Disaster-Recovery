'use client';

import dynamic from 'next/dynamic';
import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
// Lazy-loaded: pitch deck ships framer-motion and is non-critical traffic.
const ClientPitch = dynamic(() => import('../../../components/pitch/ClientPitch'), { ssr: false });

function ClientPitchPageOriginal() {
  return <ClientPitch />;
}
export default function ClientPitchPage() {
  return (
    <>
      <AntigravityNavbar />
      <ClientPitchPageOriginal />
      <AntigravityFooter />
    </>
  );
}

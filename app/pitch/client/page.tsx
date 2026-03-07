'use client';


import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import ClientPitch from '../../../components/pitch/ClientPitch';

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

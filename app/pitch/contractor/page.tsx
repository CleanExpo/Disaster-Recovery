'use client';


import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import ContractorPitch from '../../../components/pitch/ContractorPitch';

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

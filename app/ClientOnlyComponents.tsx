'use client';

// DR-722: Client component wrapper so next/dynamic with { ssr: false } is valid
// (ssr: false is not permitted in Server Components — must live in a 'use client' file)
import dynamic from 'next/dynamic';

const ConsentBanner = dynamic(
  () => import('@/components/privacy/ConsentBanner').then((m) => ({ default: m.ConsentBanner })),
  { ssr: false },
);

export function ClientOnlyComponents() {
  return (
    <>
      <ConsentBanner />
    </>
  );
}

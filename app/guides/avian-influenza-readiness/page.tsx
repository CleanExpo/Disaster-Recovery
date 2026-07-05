import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'H5 Bird Flu Readiness for Australian Properties | Disaster Recovery',
  description:
    'Calm, official-source guidance for Australian property owners and facility managers, with links to CARSI, RestoreAssist and NRPG professional support.',
  alternates: { canonical: '/guides/avian-influenza-readiness' },
};

export default function AvianInfluenzaReadinessGuide() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <section className="mx-auto max-w-5xl px-6 py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-sky-300">Disaster Recovery public guide</p>
        <h1 className="mt-3 text-4xl font-bold md:text-5xl">What property owners should know about Australian H5 bird flu readiness</h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Australia has confirmed H5 bird flu in migratory seabirds. The official public message remains measured: no evidence of mass mortality, no evidence of infection in poultry or the wider agriculture industry, and low current human-health risk.
        </p>
        <div className="mt-8 rounded-2xl border border-amber-300/30 bg-amber-300/10 p-6">
          <h2 className="text-2xl font-semibold text-amber-100">First action</h2>
          <p className="mt-3 text-amber-50">Avoid contact, record what you see and report to the Emergency Animal Disease Hotline on <strong>1800 675 888</strong>.</p>
        </div>
      </section>

      <section className="mx-auto grid max-w-5xl gap-6 px-6 pb-16 md:grid-cols-2">
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold">Where professional restoration helps</h2>
          <p className="mt-3 leading-7 text-slate-300">
            Professional contractors can assist with documentation, access control, cleaning records, PPE records, field photos, exclusions and recovery reporting. They do not replace government, veterinary, wildlife or public-health authorities.
          </p>
        </article>
        <article className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold">Campaign contact</h2>
          <p className="mt-3 leading-7 text-slate-300">Ivi Sims is the CARSI readiness point of contact.</p>
          <p className="mt-3"><a href="tel:1300654684" className="text-sky-200 underline">1300 654 684</a></p>
          <p><a href="https://www.linkedin.com/in/ivi-sims-4940b833/" className="text-sky-200 underline">Ivi Sims LinkedIn</a></p>
        </article>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold">Useful links</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/" className="rounded-full bg-sky-300 px-5 py-3 font-semibold text-slate-950">Disaster Recovery</Link>
            <a href="https://carsi.com.au/avian-influenza-readiness" className="rounded-full border border-white/20 px-5 py-3 font-semibold text-white">CARSI readiness training</a>
            <a href="https://restoreassist.app/" className="rounded-full border border-white/20 px-5 py-3 font-semibold text-white">RestoreAssist field records</a>
            <a href="https://disasterrecovery.com.au/operational-excellence/executive-partners" className="rounded-full border border-white/20 px-5 py-3 font-semibold text-white">NRPG network</a>
          </div>
        </div>
      </section>
    </main>
  );
}

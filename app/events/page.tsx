import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Disaster Events — Emergency Recovery | Disaster Recovery Australia',
  description: 'Active and recent disaster events across Australia. Access recovery information, government assistance programs, and IICRC-certified restoration contractors for cyclones, bushfires, floods, and storms.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events',
  },
}

const events = [
  {
    slug: 'victoria-bushfires-2026',
    title: 'Victoria Bushfires 2026',
    type: 'Bushfire',
    phase: 'Recovery',
    state: 'VIC',
    lgas: '23 declared LGAs',
    description: 'Victorian Bushfires commencing January 2026. 23 declared LGAs including East Gippsland, Alpine, Greater Bendigo, and Wodonga.',
    badgeColour: 'bg-orange-600',
  },
  {
    slug: 'cyclone-narelle-western-australia-2026',
    title: 'Cyclone Narelle WA 2026',
    type: 'Cyclone',
    phase: 'Recovery',
    state: 'WA',
    lgas: '6 declared shires',
    description: 'Cyclone Narelle struck Western Australia. DRFA declared for Exmouth, Carnarvon, Shark Bay, Ashburton, Upper Gascoyne, and Yalgoo.',
    badgeColour: 'bg-blue-700',
  },
  {
    slug: 'cyclone-maila-queensland-2026',
    title: 'TC Maila — Category 4',
    type: 'Cyclone',
    phase: 'Pre-Landfall',
    state: 'QLD',
    lgas: 'Cairns, Townsville, Cape York',
    description: 'Tropical Cyclone Maila (Category 4, 165 km/h) is forecast to make landfall on the Far North Queensland coast 11–12 April 2026. BOM Watch/Warning window open.',
    badgeColour: 'bg-red-600',
  },
  {
    slug: 'victoria-bushfires-2025',
    title: 'Victoria Bushfires 2025',
    type: 'Bushfire',
    phase: 'Recovery',
    state: 'VIC',
    lgas: '5 declared LGAs',
    description: 'Victorian Bushfires 2025 affecting East Gippsland, Alpine Shire, Indigo Shire, Wodonga and Greater Bendigo.',
    badgeColour: 'bg-orange-600',
  },
  {
    slug: 'cyclone-alfred-queensland-2025',
    title: 'Ex-Cyclone Alfred QLD 2025',
    type: 'Cyclone',
    phase: 'Recovery',
    state: 'QLD',
    lgas: '16 declared LGAs',
    description: 'Ex-Tropical Cyclone Alfred impacted SE Queensland and northern NSW in February 2025. ICA Insurance Catastrophe declared.',
    badgeColour: 'bg-blue-700',
  },
]

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      <section className="bg-slate-900 text-white py-16 md:py-24">
        <div className="container mx-auto px-6 max-w-5xl">
          <h1 className="text-4xl md:text-6xl font-black text-white mb-4">
            Disaster Events
          </h1>
          <p className="text-xl text-slate-300 max-w-2xl">
            Active and recent declared disaster events across Australia. Find recovery information, government assistance programs, and certified restoration contractors.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="space-y-4">
            {events.map(event => (
              <Link
                key={event.slug}
                href={`/events/${event.slug}`}
                className="block bg-white border border-slate-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:border-blue-300 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold text-white ${event.badgeColour}`}>
                        {event.phase}
                      </span>
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{event.type}</span>
                      <span className="text-xs text-slate-500 bg-slate-100 px-2 py-0.5 rounded">{event.state}</span>
                      <span className="text-xs text-slate-500">{event.lgas}</span>
                    </div>
                    <h2 className="text-xl font-bold text-slate-900 mb-1">{event.title}</h2>
                    <p className="text-slate-600 text-sm">{event.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className="inline-flex items-center gap-1 text-blue-600 font-semibold text-sm">
                      View Recovery Info
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6 text-center">
            <h2 className="text-xl font-bold text-slate-900 mb-2">Property Damaged in a Disaster?</h2>
            <p className="text-slate-600 mb-4">Lodge your claim online — no waiting, no queues. We&apos;ll match you with a certified contractor in your area.</p>
            <Link
              href="/claim"
              className="inline-flex items-center gap-2 px-8 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition-colors"
            >
              Lodge Emergency Claim
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

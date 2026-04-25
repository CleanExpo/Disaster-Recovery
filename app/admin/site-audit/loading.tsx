import { Skeleton } from '@/components/ui/skeleton';

/** Skeleton shown while the site audit page loads */
export default function SiteAuditLoading() {
  return (
    <div className="mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-14 w-14 rounded-2xl" />
          <div className="space-y-2">
            <Skeleton className="h-8 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
        <Skeleton className="h-9 w-28 rounded-lg" />
      </div>

      {/* Score cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm text-center">
            <Skeleton className="h-16 w-16 rounded-full mx-auto mb-3" />
            <Skeleton className="h-4 w-20 mx-auto mb-1" />
            <Skeleton className="h-3 w-14 mx-auto" />
          </div>
        ))}
      </div>

      {/* Issues list */}
      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <Skeleton className="h-5 w-28" />
          <Skeleton className="h-4 w-20" />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-start gap-4 px-6 py-4 border-b border-gray-100 last:border-b-0">
            <Skeleton className="h-6 w-6 rounded-full shrink-0 mt-0.5" />
            <div className="flex-1 space-y-1">
              <Skeleton className="h-4 w-64" />
              <Skeleton className="h-3 w-48" />
            </div>
            <Skeleton className="h-5 w-16 rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
